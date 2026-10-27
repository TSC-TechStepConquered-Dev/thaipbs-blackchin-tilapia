import {useEffect} from 'react';

export function timelineStep(top:number,height:number,viewport:number){
 const distance=Math.max(1,height-viewport*.65);
 return Math.min(3,Math.max(0,Math.floor(((viewport*.25-top)/distance)*4)));
}

export function useTimelineScroll(select:(index:number)=>void){
 useEffect(()=>{
  const track=document.querySelector<HTMLElement>('#chapter-02 .split');
  if(!track)return;
  let frame=0;
  const update=()=>{
   frame=0;
   const rect=track.getBoundingClientRect();
   if(rect.height>0&&rect.top<innerHeight&&rect.bottom>0)select(timelineStep(rect.top,rect.height,innerHeight));
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(schedule):null;
  observer?.observe(track);
  schedule();
  return()=>{cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule)};
 },[select]);
}
