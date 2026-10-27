import {useEffect,useRef,useState,type ReactNode} from 'react';
import {ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';

const slides=['field-people','field-net','boat','field-map'];
export function FieldGallery({renderFigure}:{renderFigure:(id:string)=>ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 const [index,setIndex]=useState(0);
 const [playing,setPlaying]=useState(()=>!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
 const [visible,setVisible]=useState(false);
 const [hover,setHover]=useState(false);
 const [pageVisible,setPageVisible]=useState(!document.hidden);
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting),{threshold:.2});
  observer.observe(root.current!);
  const visibility=()=>setPageVisible(!document.hidden);
  const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const reduce=()=>{if(media?.matches)setPlaying(false)};
  document.addEventListener('visibilitychange',visibility);media?.addEventListener('change',reduce);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);media?.removeEventListener('change',reduce)};
 },[]);
 useEffect(()=>{
  if(!playing||!visible||hover||!pageVisible)return;
  const timer=window.setTimeout(()=>setIndex(i=>(i+1)%slides.length),5000);
  return()=>clearTimeout(timer);
 },[index,playing,visible,hover,pageVisible]);
 const step=(direction:number)=>{setPlaying(false);setIndex(i=>(i+direction+slides.length)%slides.length)};
 return <div ref={root} className="field-gallery" role="region" aria-roledescription="carousel" aria-label="ภาพชุดสำรวจปลา" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={event=>{if(!(event.target as HTMLElement).closest(".gallery-play"))setPlaying(false)}}>
  <div className="gallery-slide" aria-live={playing?'off':'polite'} onClickCapture={()=>setPlaying(false)}>{renderFigure(slides[index])}</div>
  <div className="gallery-controls">
   <button onClick={()=>step(-1)} aria-label="ภาพก่อนหน้า"><ChevronLeft size={20}/></button>
   <span className="gallery-count">{String(index+1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span>
   <button onClick={()=>step(1)} aria-label="ภาพถัดไป"><ChevronRight size={20}/></button>
   <button className="gallery-play" onClick={()=>setPlaying(p=>!p)} aria-label={playing?'หยุดแกลเลอรี':'เล่นแกลเลอรีอัตโนมัติ'}>{playing?<Pause size={16}/>:<Play size={16}/>}<span>{playing?'หยุดภาพ':'เล่นอัตโนมัติ'}</span></button>
  </div>
 </div>;
}

