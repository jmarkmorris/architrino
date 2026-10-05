// Intrinsic source-V and physical source-A components; complete families retained.
import assert from 'node:assert/strict';
import {Q,G,dot} from './maxwell-shaped-overnight-grid-interval.mjs';
import {normUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
const row=(p,A)=>A[0].map((_,j)=>dot(p,A.map(r=>r[j]))),perp=n=>[G.of(n[1]).neg(),G.of(n[0])],min=(a,b)=>Q.of(a).cmp(b)<0?Q.of(a):Q.of(b);
export function columns(c,receiverDirection,sourceDirection){
 const out={};for(const [k,p] of [['r',receiverDirection],['t',perp(receiverDirection)]])for(const [name,A]of[['V',c.offset.Fv],['A',c.offset.Fa]]){const w=row(p,A);out[k+name]={norm:normUpper(w),radial:dot(w,sourceDirection).absUpper(),tangent:dot(w,perp(sourceDirection)).absUpper()};}return out;
}
export function forcing(delta,positionNorm,sourceColumn,vColumns,aColumns,sourceR,sourceUr,sourceUt,sourceAr,sourceAt,nominalR,nominalV,nominalA,psi){
 const vals=[delta,positionNorm,sourceColumn,sourceR,sourceUr,sourceUt,sourceAr,sourceAt,nominalR,nominalV,nominalA,psi].map(Q.of);assert(vals.every(x=>x.cmp(0)>=0));[delta,positionNorm,sourceColumn,sourceR,sourceUr,sourceUt,sourceAr,sourceAt,nominalR,nominalV,nominalA,psi]=vals;
 vColumns=Object.fromEntries(Object.entries(vColumns).map(([k,v])=>[k,Q.of(v)]));aColumns=Object.fromEntries(Object.entries(aColumns).map(([k,v])=>[k,Q.of(v)]));assert([...Object.values(vColumns),...Object.values(aColumns)].every(x=>x.cmp(0)>=0));
 const cap=(x,n)=>min(n,Q.of(x).add(Q.of(n).mul(psi))),sourceRadial=cap(sourceColumn,positionNorm),vr=cap(vColumns.radial,vColumns.norm),vt=cap(vColumns.tangent,vColumns.norm),ar=cap(aColumns.radial,aColumns.norm),at=cap(aColumns.tangent,aColumns.norm),f=delta.add(sourceRadial.mul(sourceR)).add(positionNorm.mul(nominalR).mul(psi)).add(vr.mul(sourceUr)).add(vt.mul(sourceUt)).add(vColumns.norm.mul(nominalV).mul(psi)).add(ar.mul(sourceAr)).add(at.mul(sourceAt)).add(aColumns.norm.mul(nominalA).mul(psi));return {sourceRadial,vr,vt,ar,at,forcing:f};
}
export function known(){
 const box=A=>A.map(r=>r.map(G.of)),c={offset:{Fv:box([[2,0],[0,3]]),Fa:box([[0,0],[0,'.5']])}},z=columns(c,[1,0],[1,0]);assert(z.rV.radial.cmp(2)>=0&&z.rV.tangent.cmp('.00000000000000000001')<0&&z.tA.radial.cmp('.00000000000000000001')<0&&z.tA.tangent.cmp('.5')>=0);
 const f=forcing(0,0,0,{norm:2,radial:2,tangent:0},{norm:0,radial:0,tangent:0},0,4,5,0,0,0,0,0,0);assert(f.forcing.cmp(8)===0);
 const a=forcing(0,0,0,{norm:0,radial:0,tangent:0},{norm:'.5',radial:0,tangent:'.5'},0,0,0,100,2,0,0,0,0);assert(a.forcing.cmp(1)===0,'rankone physical sourceA transmits transverse component');
 const q=forcing('.1',2,3,{norm:2,radial:2,tangent:0},{norm:'.5',radial:0,tangent:'.5'},1,4,5,100,2,3,4,5,'.1');assert(q.sourceRadial.cmp(2)===0&&q.vr.cmp(2)===0&&q.vt.cmp('.2')===0&&q.ar.cmp('.05')===0&&q.at.cmp('.5')===0&&q.forcing.cmp('18.75')===0);
 const turn={offset:{Fv:box([[3,0],[0,2]]),Fa:box([['.5',0],[0,0]])}},r=columns(turn,[0,1],[0,1]);for(const k of ['rV','rA','tV','tA'])for(const j of ['norm','radial','tangent'])assert(r[k][j].cmp(z[k][j])===0,'quarterturn complete row/column covariance');
 assert.throws(()=>forcing(-1,0,0,{norm:0,radial:0,tangent:0},{norm:0,radial:0,tangent:0},0,0,0,0,0,0,0,0,0));
 return {passed:true,cases:['signed full source-row and source-basis columns','radial sourceV exact8','rankone physical sourceA exact1 with arbitrary radial100','angular transport and row-norm caps exact75/4','quarterturn covariance','negative budget rejected']};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(known()));
