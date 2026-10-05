// Prospective source-window guesses only. Final complete root/field and angular
// enclosures must fit the guard before any response comparison is accepted.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
const max=(a,b)=>Q.of(a).cmp(b)>0?Q.of(a):Q.of(b),up=x=>new G(x).hi;
export function initialGuess(dt,r,prefixR){[dt,r,prefixR]=[dt,r,prefixR].map(Q.of);assert([dt,r,prefixR].every(z=>z.cmp(0)>=0));return up(dt.mul(4).add('.01').add(r.add(prefixR).mul(2)));}
export function expandGuess(width,required,seed){width=Q.of(width);seed=Q.of(seed);required=G.of(required);assert(width.cmp(0)>0);const needed=max(required.lo.sub(seed).abs(),required.hi.sub(seed).abs());return up(max(width,needed).mul('1.05'));}
export function known(){assert(initialGuess('1/4','1/10','1/5').cmp('1.61')===0);assert(expandGuess(1,new G(-3,2),0).cmp('3.15')===0);assert(expandGuess(5,new G(-3,2),0).cmp('5.25')===0);assert(expandGuess(1,new G(7,12),10).cmp('3.15')===0);return {passed:true,cases:['exact initial1.61 and required3.15','monotone oldwidth5.25','translated receiving seed interval'],scope:'non-authoritative search proposals only; complete closed guard and response families still independently required'};}
if(process.argv.includes('--known'))console.log(JSON.stringify(known()));
