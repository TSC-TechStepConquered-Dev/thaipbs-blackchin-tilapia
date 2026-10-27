import {it,expect,vi,afterEach} from 'vitest';
import {render,act,cleanup} from '@testing-library/react';
import {ReportedCount} from './ReportedCount';
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals()});
it('waits for visibility, counts up to 440, and does not restart',()=>{
 vi.useFakeTimers();
 let notify:IntersectionObserverCallback=()=>{};
 vi.stubGlobal('IntersectionObserver',class{constructor(callback:IntersectionObserverCallback){notify=callback} observe(){} disconnect(){}});
 const {container}=render(<ReportedCount/>);
 const value=()=>Number(container.querySelector('b')?.textContent);
 act(()=>vi.advanceTimersByTime(3000));expect(value()).toBe(0);
 act(()=>notify([{isIntersecting:true,intersectionRatio:1}] as IntersectionObserverEntry[],{} as IntersectionObserver));
 act(()=>vi.advanceTimersByTime(1000));expect(value()).toBeGreaterThan(0);expect(value()).toBeLessThan(440);
 act(()=>vi.advanceTimersByTime(1500));expect(value()).toBe(440);
 act(()=>notify([{isIntersecting:true,intersectionRatio:1}] as IntersectionObserverEntry[],{} as IntersectionObserver));expect(value()).toBe(440);
});
