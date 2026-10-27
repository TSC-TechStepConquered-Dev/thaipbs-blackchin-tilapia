import {afterEach,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,act,cleanup} from '@testing-library/react';
import {useState} from 'react';
import {AtlasPlayback} from './AtlasPlayback';

afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals()});
it('starts only when the map is visible and pauses after leaving',()=>{
 vi.useFakeTimers();let notify:IntersectionObserverCallback=()=>{};
 vi.stubGlobal('IntersectionObserver',class{constructor(callback:IntersectionObserverCallback){notify=callback} observe(){} disconnect(){}});
 const change=vi.fn();render(<div className="atlas"><AtlasPlayback year={2553} onYear={change}/></div>);
 act(()=>vi.advanceTimersByTime(16000));expect(change).not.toHaveBeenCalled();
 act(()=>notify([{isIntersecting:true,intersectionRatio:.5}] as IntersectionObserverEntry[],{} as IntersectionObserver));
 act(()=>vi.advanceTimersByTime(8000));expect(change).toHaveBeenCalledWith(2554);
 change.mockClear();act(()=>notify([{isIntersecting:false,intersectionRatio:0}] as IntersectionObserverEntry[],{} as IntersectionObserver));
 act(()=>vi.advanceTimersByTime(16000));expect(change).not.toHaveBeenCalled();
});
it('loops from the last year, pauses on map interaction, and resumes on request',()=>{
 vi.useFakeTimers();
 vi.stubGlobal('IntersectionObserver',class{constructor(private callback:IntersectionObserverCallback){} observe(){this.callback([{isIntersecting:true,intersectionRatio:1}] as IntersectionObserverEntry[],this as unknown as IntersectionObserver)} disconnect(){}});
 function Demo(){const [year,setYear]=useState(2569);return <div className="atlas"><AtlasPlayback year={year} onYear={setYear}/><output>{year}</output><button>พื้นที่</button></div>}
 render(<Demo/>);
 act(()=>vi.advanceTimersByTime(8000));
 expect(screen.getByRole('status').textContent).toBe('2553');
 fireEvent.pointerDown(screen.getByRole('button',{name:'พื้นที่'}));
 act(()=>vi.advanceTimersByTime(16000));
 expect(screen.getByRole('status').textContent).toBe('2553');
 fireEvent.click(screen.getByRole('button',{name:'เล่นวนตามปี'}));
 act(()=>vi.advanceTimersByTime(8000));
 expect(screen.getByRole('status').textContent).toBe('2554');
 fireEvent.click(screen.getByRole('button',{name:'ปีรายงานก่อนหน้า'}));
 expect(screen.getByRole('status').textContent).toBe('2553');
 expect(screen.getByRole('button',{name:'เล่นวนตามปี'})).toBeTruthy();
});

