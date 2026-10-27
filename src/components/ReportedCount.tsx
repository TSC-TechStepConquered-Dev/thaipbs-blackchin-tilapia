import {useEffect,useRef,useState} from 'react';

export function ReportedCount(){
 const root=useRef<HTMLDivElement>(null);
 const [count,setCount]=useState(0);
 useEffect(()=>{
  let frame=0,started=false;
  const media=window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const finish=()=>{cancelAnimationFrame(frame);setCount(440)};
  const reduced=()=>{if(media?.matches)finish()};
  const observer=new IntersectionObserver(entries=>{
   if(started||!entries.some(entry=>entry.isIntersecting&&entry.intersectionRatio>=.5))return;
   started=true;observer.disconnect();
   if(media?.matches){finish();return}
   const start=performance.now();
   const tick=(now:number)=>{
    const progress=Math.min(1,(now-start)/2200);
    setCount(Math.round(440*(1-Math.pow(1-progress,3))));
    if(progress<1)frame=requestAnimationFrame(tick);
   };
   frame=requestAnimationFrame(tick);
  },{threshold:.5});
  observer.observe(root.current!);media?.addEventListener('change',reduced);
  return()=>{observer.disconnect();cancelAnimationFrame(frame);media?.removeEventListener('change',reduced)};
 },[]);
 return <div ref={root} className="big-number" aria-label="ยอดพบสะสมตามรายงาน 440 ตัว"><b aria-hidden="true" style={{font:'inherit',fontVariantNumeric:'tabular-nums'}}>{count}</b><span aria-hidden="true">ตัว</span></div>;
}
