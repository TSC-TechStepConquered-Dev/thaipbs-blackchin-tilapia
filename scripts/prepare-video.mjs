import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
const input=fs.readdirSync('media').find(f=>f.startsWith('AVOICE2610201C2')&&f.endsWith('.mp4'));
if(!input)throw new Error('Missing supplied video');
const result=spawnSync(ffmpeg,['-y','-i','media/'+input,'-vf','scale=-2:720','-c:v','libx264','-preset','fast','-crf','28','-maxrate','850k','-bufsize','1700k','-c:a','aac','-b:a','80k','-movflags','+faststart','public/media/field-documentary.mp4'],{stdio:'inherit'});
if(result.status!==0)process.exit(result.status||1);
console.log('Video prepared',fs.statSync('public/media/field-documentary.mp4').size);
