import {vi} from 'vitest';
class MockIntersectionObserver { observe(){} unobserve(){} disconnect(){} }
vi.stubGlobal('IntersectionObserver',MockIntersectionObserver);
Object.defineProperty(HTMLDialogElement.prototype,'showModal',{value:function(){this.setAttribute('open','')}});
Object.defineProperty(HTMLDialogElement.prototype,'close',{value:function(){this.removeAttribute('open')}});
vi.mock('gsap',()=>({default:{registerPlugin:vi.fn(),matchMedia:()=>({add:vi.fn(),revert:vi.fn()})}}));
vi.mock('gsap/ScrollTrigger',()=>({ScrollTrigger:{refresh:vi.fn()}}));
