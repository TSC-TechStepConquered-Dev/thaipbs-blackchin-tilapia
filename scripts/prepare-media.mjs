import fs from 'node:fs';
import sharp from 'sharp';
const files=JSON.parse(fs.readFileSync('scripts/image-files.json','utf8').replace(/^\uFEFF/,''));
const assets=[
['reporting-csite-banner',25,'แผนภาพประชาสัมพันธ์การแจ้งเบาะแสผ่าน C-SITE'],
['reporting-steps-poster',27,'ขั้นตอนแจ้งเบาะแสปลาหมอคางดำ'],
['fish-price-comparison',28,'อินโฟกราฟิกเปรียบเทียบราคาปลาในช่วงเวลาของผู้จัดทำ'],
['lam-pao-community-map',23,'แผนที่ชีวิตรอบเขื่อนลำปาว'],
['lam-pao-fish-diversity',24,'ปลาพื้นถิ่นและความหลากหลายของลำปาว'],
['blackchin-identification',26,'คู่มือสังเกตลักษณะปลาหมอคางดำ'],
['hero',37,'เรือประมงและผู้คนในแหล่งน้ำ ภาพภาคสนามที่ผู้จัดทำส่งให้'],
['field-net',6,'การคัดปลาจากอวน ภาพชุดสำรวจปลาที่ผู้จัดทำส่งให้'],
['field-people',15,'ผู้ร่วมกิจกรรมริมแหล่งน้ำ ภาพชุดสำรวจปลา'],
['field-map',21,'การร่วมอ่านแผนที่ชีวิตรอบเขื่อนลำปาว'],
['boat',12,'เรือประมงบนผืนน้ำ ภาพชุดสำรวจปลา'],
['fish-illustration',29,'ภาพประกอบลักษณะปลาเพื่อการศึกษา ไม่ใช่ภาพหลักฐานภาคสนาม']
];
const metadata=[];
for(const [id,index,alt] of assets){
const original='media/'+files[index];const meta=await sharp(original).metadata();
await sharp(original).rotate().resize({width:id==='hero'?2200:1600,withoutEnlargement:true}).webp({quality:86}).toFile('public/media/'+id+'.webp');
await sharp(original).rotate().resize({width:720,withoutEnlargement:true}).webp({quality:80}).toFile('public/media/'+id+'-small.webp');
if(index>=23&&index<=28) await sharp(original).rotate().resize({width:3600,withoutEnlargement:true}).webp({quality:95}).toFile('public/media/'+id+'-full.webp');
metadata.push({id,original,url:'/media/'+id+'.webp',fullUrl:index>=23&&index<=28?'/media/'+id+'-full.webp':'/media/'+id+'.webp',width:meta.width,height:meta.height,alt,caption:alt,sourceIds:[],mediaRightsStatus:'supplied-check-rights',evidenceType:id==='fish-illustration'?'conceptual':'context',publishedAt:null,eventDate:null,verifiedAsOf:'2026-10-27'});
}
fs.copyFileSync('media/thailand_regions_provinces.svg','public/media/thailand.svg');
fs.writeFileSync('src/content/media.ts','export const media = '+JSON.stringify(metadata,null,2)+';');
console.log('Prepared',metadata.length,'media assets');
