import {useEffect,useRef,useState} from 'react';
import {ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';

export const atlasYears=[2553,2554,2560,2565,2567,2568,2569];

export function AtlasPlayback({year,onYear}:{year:number;onYear:(year:number)=>void}){
 const root=useRef<HTMLDivElement>(null);
 const [playing,setPlaying]=useState(()=>!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
 const [visible,setVisible]=useState(false);
 const [pageVisible,setPageVisible]=useState(!document.hidden);
 const change=useRef(onYear);
 change.current=onYear;
 useEffect(()=>{
  const atlas=root.current!.closest('.atlas')!;
  const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting&&entries[0].intersectionRatio>=.35),{threshold:[0,.35]});
  observer.observe(atlas.querySelector('.map-visual')||atlas);
  const visibility=()=>setPageVisible(!document.hidden);
  const pause=(event:Event)=>{if(!root.current?.contains(event.target as Node))setPlaying(false)};
  const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const reduced=()=>{if(media?.matches)setPlaying(false)};
  document.addEventListener('visibilitychange',visibility);
  atlas.addEventListener('pointerdown',pause);
  atlas.addEventListener('keydown',pause);
  atlas.addEventListener('change',pause);
  media?.addEventListener('change',reduced);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);atlas.removeEventListener('pointerdown',pause);atlas.removeEventListener('keydown',pause);atlas.removeEventListener('change',pause);media?.removeEventListener('change',reduced)};
 },[]);
 useEffect(()=>{
  if(!playing||!visible||!pageVisible)return;
  const timer=window.setTimeout(()=>change.current(atlasYears[(atlasYears.indexOf(year)+1)%atlasYears.length]),8000);
  return()=>window.clearTimeout(timer);
 },[playing,visible,pageVisible,year]);
 const step=(direction:number)=>{setPlaying(false);change.current(atlasYears[(atlasYears.indexOf(year)+direction+atlasYears.length)%atlasYears.length])};
 return <div ref={root} className="atlas-playback">
  <div className="atlas-playback-buttons"><button onClick={()=>step(-1)} aria-label="ปีรายงานก่อนหน้า"><ChevronLeft size={18}/></button><button onClick={()=>setPlaying(!playing)} aria-pressed={playing}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?'หยุดอ่าน':'เล่นวนตามปี'}</button><button onClick={()=>step(1)} aria-label="ปีรายงานถัดไป"><ChevronRight size={18}/></button><span>{atlasYears.indexOf(year)+1} / {atlasYears.length}</span></div>
  <p>{playing?'วนตามลำดับปี · เปลี่ยนทุก 8 วินาที':'หยุดไว้ให้อ่าน · เลือกปีหรือพื้นที่ได้'}</p>
  <div className="atlas-countdown" aria-hidden="true"><i key={`${year}-${playing}-${visible}-${pageVisible}`} className={playing&&visible&&pageVisible?'running':''}/></div>
 </div>;
}

/** Anchors are layout positions within regional artwork, not geographic observations. */
export function AtlasMascot({region}:{region:string|null}){
 const root=useRef<SVGGElement>(null);
 const [point,setPoint]=useState({x:0,y:0});
 useEffect(()=>{
  const path=root.current?.ownerSVGElement?.querySelector<SVGGraphicsElement>('.map-region.selected');
  if(!path?.getBBox)return;
  const box=path.getBBox();
  setPoint({x:box.x+box.width*.5,y:box.y+box.height*(region==='south'?.65:.5)});
 },[region]);
 return <g ref={root} className="atlas-mascot" aria-hidden="true" style={{transform:`translate(${point.x}px, ${point.y}px)`,opacity:region?1:0}}>
  <circle className="atlas-marker" r="28"/>
  <circle r="8" fill="#f3eee3"/>
  <image className="atlas-fish" href="/media/fish-mascot.webp" x="-80" y="-125" width="160" height="160"/>
 </g>;
}
