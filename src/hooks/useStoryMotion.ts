import {useEffect} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** Progressive enhancements: all copy remains visible without motion or JavaScript animations. */
export function useStoryMotion(){
 useEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
   const headings=gsap.utils.toArray<HTMLElement>('.opening-grid h2, .chapter-heading h2, .action-heading h2, .closing');
   headings.forEach(heading=>gsap.fromTo(heading,{y:32,clipPath:'inset(0% 0% 100% 0%)'},{y:0,clipPath:'inset(0% 0% 0% 0%)',ease:'power2.out',scrollTrigger:{trigger:heading,start:'top 94%',end:'top 65%',scrub:.6}}));
   gsap.fromTo('.timeline-line path',{strokeDasharray:400,strokeDashoffset:400},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'.evidence-timeline',start:'top 85%',end:'bottom 55%',scrub:.7}});
   gsap.utils.toArray<SVGPathElement>('.river-divider path').forEach(path=>gsap.fromTo(path,{strokeDasharray:1600,strokeDashoffset:1600},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:path.closest('.river-divider'),start:'top 95%',end:'top 45%',scrub:.8}}));
   gsap.fromTo('.lam-cover>img',{scale:1.12},{scale:1,ease:'none',scrollTrigger:{trigger:'.lam-cover',start:'top bottom',end:'bottom top',scrub:1}});
   gsap.fromTo('.big-number',{y:45,opacity:.3},{y:0,opacity:1,scrollTrigger:{trigger:'.big-number',start:'top 90%',end:'top 55%',scrub:.6}});
  });
  mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)',()=>{
   gsap.to('.hero-photo',{y:90,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
   gsap.from('.lam-title span',{y:60,opacity:0,stagger:.15,scrollTrigger:{trigger:'.lam-title',start:'top 85%'}});
   gsap.utils.toArray<HTMLElement>('.field-strip .figure').forEach((figure,index)=>gsap.fromTo(figure,{y:index?45:-20},{y:index?-25:20,ease:'none',scrollTrigger:{trigger:'.field-strip',start:'top bottom',end:'bottom top',scrub:.9}}));
  });
  // Image/font layout changes must not leave animation boundaries at stale positions.
  const refresh=()=>ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh);
  const images=Array.from(document.images);images.forEach(image=>image.addEventListener('load',refresh,{once:true}));
  return()=>{images.forEach(image=>image.removeEventListener('load',refresh));mm.revert()};
 },[]);
}
