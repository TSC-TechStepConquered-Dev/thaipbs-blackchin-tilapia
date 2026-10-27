import {Fragment} from 'react';
import {highlights} from '../content/highlights';

export function HighlightedText({text,chapter}:{text:string;chapter:number}){
 const phrases=highlights[chapter]||[];
 const parts:{text:string;emphasis:boolean}[]=[];
 let remaining=text;
 while(remaining){
  const match=phrases.map(phrase=>({phrase,index:remaining.indexOf(phrase)})).filter(item=>item.index>=0).sort((a,b)=>a.index-b.index)[0];
  if(!match){parts.push({text:remaining,emphasis:false});break}
  if(match.index)parts.push({text:remaining.slice(0,match.index),emphasis:false});
  parts.push({text:match.phrase,emphasis:true});
  remaining=remaining.slice(match.index+match.phrase.length);
 }
 return <>{parts.map((part,i)=>part.emphasis?<strong className="story-highlight" key={i}>{part.text}</strong>:<Fragment key={i}>{part.text}</Fragment>)}</>;
}
