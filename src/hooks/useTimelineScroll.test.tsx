import {it,expect} from 'vitest';
import {timelineStep} from './useTimelineScroll';
it('advances all four years with scroll and reverses without leaving bounds',()=>{
 expect([200,-200,-600,-1000].map(top=>timelineStep(top,2120,800))).toEqual([0,1,2,3]);
 expect([-1000,-600,-200,200].map(top=>timelineStep(top,2120,800))).toEqual([3,2,1,0]);
 expect(timelineStep(2000,2120,800)).toBe(0);
 expect(timelineStep(-4000,2120,800)).toBe(3);
});
