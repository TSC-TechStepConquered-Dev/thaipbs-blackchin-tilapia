import fs from 'node:fs';
const md=fs.readFileSync('BLACKCHIN_DOCUMENTARY_CONTENT_AND_DESIGN.md','utf8');
const clean=s=>s.replace(/\*\*/g,'').replace(/(?<!\w)\*|\*(?!\w)/g,'').replace(/`/g,'').trim();
const chapters=[...md.matchAll(/### CHAPTER (\d\d) — ([^\r\n]+)([\s\S]*?)(?=\n### |\n---)/g)].map(m=>{
const b=m[3], narrative=b.match(/\*\*On-site narrative(?: \(longer climax\))?:\*\*\s*([\s\S]*?)(?=\n\*\*[A-Z])/)[1];
return {id:m[1],title:clean(m[2]),eyebrow:clean(b.match(/\*\*Eyebrow:\*\* ([^\r\n]+)/)[1]),headline:clean(b.match(/\*\*Headline:\*\* ([^\r\n]+)/)[1]),paragraphs:narrative.trim().split(/\r?\n\s*\r?\n/).map(clean),sourceIds:[...new Set([...narrative.matchAll(/S\d\d/g)].map(x=>x[0]))]};
});
fs.writeFileSync('src/content/chapters.ts','export const chapters = '+JSON.stringify(chapters,null,2)+' as const;\n');
const sources=[...md.matchAll(/^\| (S\d\d) \| (.*?) \| (https:\/\/\S+) \| (.*?) \|/gm)].map(m=>({id:m[1],title:m[2],url:m[3],scope:m[4],verifiedAsOf:'2026-10-27',verificationStatus:['S04','S05','S06'].includes(m[1])?'checked-live':'editorial-brief'}));
fs.writeFileSync('src/content/sources.ts','export const REPORT_URL="https://legacy.csitereport.com/blackchintilapia";\nexport const sources = '+JSON.stringify(sources,null,2)+';');
const events=[...md.matchAll(/^\| ([^|\n]+) \| ([^|\n]+) \| ([^|\n]+) \| ([^|\n]+) \| ((?:S|V)\d\d[^|]*) \|/gm)].map((m,i)=>({id:i,date:m[1].trim(),place:m[2].trim(),title:m[3].trim(),evidence:/agency|official/.test(m[4])?'official':/citizen|community/.test(m[4])?'context':'reported',sourceIds:m[5].match(/[SV]\d\d/g),year:Number(m[1].match(/25\d\d/)?.[0]||2569)}));
fs.writeFileSync('src/content/timeline.ts','export const timeline = '+JSON.stringify(events,null,2)+';');
console.log({chapters:chapters.length,paragraphs:chapters.map(c=>c.paragraphs.length),sources:sources.length,events:events.length});
