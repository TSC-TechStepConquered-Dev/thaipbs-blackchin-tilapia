import {useEffect,useRef} from 'react';
import gsap from 'gsap';

/** Decorative companion; never part of the reporting evidence or keyboard order. */
export function ScrollMascot(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const element=root.current!;
   const move=gsap.quickTo(element,'y',{duration:.8,ease:'power2.out'});
   const sway=gsap.quickTo(element,'x',{duration:.9,ease:'power2.out'});
   const turn=gsap.quickTo(element.querySelector('img'),'rotation',{duration:.6,ease:'power2.out'});
   let lastY=window.scrollY;
   const update=()=>{
    const start=document.getElementById('chapter-01')?.getBoundingClientRect();
    const end=document.getElementById('chapter-07')?.getBoundingClientRect();
    const modal=!!document.querySelector('dialog[open]');
    const atlas=document.querySelector('.atlas')?.getBoundingClientRect();
    const inAtlas=!!atlas&&atlas.top<innerHeight*.7&&atlas.bottom>innerHeight*.3;
    const visible=!!start&&!!end&&start.top<innerHeight*.65&&end.top>innerHeight*.3&&!modal&&!inAtlas;
    element.style.visibility=visible?'visible':'hidden';
    const progress=window.scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);
    const mobile=innerWidth<760;
    move(mobile?innerHeight-155:150+progress*Math.max(0,innerHeight-360));
    sway(Math.sin(progress*Math.PI*12)*(mobile?3:9));
    const delta=window.scrollY-lastY;if(Math.abs(delta)>1)turn(delta>0?-16:16);
    lastY=window.scrollY;
   };
   update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
   const observer=new MutationObserver(update);document.querySelectorAll('dialog').forEach(dialog=>observer.observe(dialog,{attributes:true,attributeFilter:['open']}));
   return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);observer.disconnect();gsap.killTweensOf([element,element.querySelector('img')])};
  });
  return()=>mm.revert();
 },[]);
 return <div ref={root} className="scroll-mascot" aria-hidden="true"><img src="/media/fish-mascot.webp" alt="" width="360" height="360"/><span className="mascot-bubble bubble-one"/><span className="mascot-bubble bubble-two"/></div>;
}
