import assert from 'node:assert/strict';
import {Q} from './maxwell-shaped-overnight-grid-interval.mjs';
export function ceiling(q){q=Q.of(q);assert(q.cmp(0)>=0);const scale=10n**24n,z=new Q((q.n*scale+q.d-1n)/q.d,scale);assert(z.cmp(q)>=0&&z.sub(q).cmp(new Q(1n,scale))<0);return {raw:q,stored:z,gap:z.sub(q)};}
export function storage(c,bc,T,P){
 const r=c.recurrence,rounding=Object.fromEntries(['X','V','A','Wend','Wwhole'].map(k=>[k,ceiling(r[k])])),speed=ceiling(Q.of(bc).add(rounding.V.stored));
 const slack={X:Q.of(r.trialX).sub(rounding.X.stored),V:Q.of(r.trialV).sub(rounding.V.stored)};assert(slack.X.cmp(0)>0&&slack.V.cmp(0)>0,'rounded strict X/V containment');assert(speed.stored.cmp(1)<0,'rounded whole physical speed strictly subfield');
 return {t:Q.of(T.hi),x:rounding.X.stored,v:rounding.V.stored,a:rounding.A.stored,speed:speed.stored,W:rounding.Wend.stored,Wwhole:rounding.Wwhole.stored,S:P,rounding:{...rounding,speed},slack};
}
export function known(){
 assert(ceiling('3/4').stored.cmp('3/4')===0);const q=new Q(10n**24n+1n,10n**48n),z=ceiling(q);assert(z.stored.cmp(new Q(2n,10n**24n))===0);assert.throws(()=>ceiling('-1/3'));
 const rec={X:'.1',V:'.2',A:'.3',Wend:'.4',Wwhole:'.5',trialX:'.11',trialV:'.21'},v=storage({recurrence:rec},'.3',{hi:1},{lo:0,hi:'.5'});assert(v.speed.cmp('.5')===0&&v.W.cmp('.4')===0&&v.Wwhole.cmp('.5')===0);
 assert.throws(()=>storage({recurrence:{...rec,X:q,trialX:new Q(2n,10n**24n)}},'.3',{hi:1},{lo:0,hi:'.5'}),/rounded strict/);assert.throws(()=>storage({recurrence:rec},'.8',{hi:1},{lo:0,hi:'.5'}),/subfield/);
 return {passed:true,cases:['exact grid point preserved','positive value just above grid point outward','negative bound rejected','endpoint and whole W remain distinct','strict trial lost after outward rounding rejected','unit rounded whole speed rejected']};
}
if(process.argv.includes('--known-storage'))console.log(JSON.stringify(known(),null,2));
