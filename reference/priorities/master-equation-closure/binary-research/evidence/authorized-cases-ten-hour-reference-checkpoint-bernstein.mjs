// Separately authored exact polynomial range oracle. No subject history import.
import assert from 'node:assert/strict';
import {History,Q,G,known as oldKnown} from './authorized-cases-ten-hour-reference-checkpoint-core.mjs';
const q=Q.of,min=(a,b)=>q(a).cmp(b)<0?q(a):q(b),max=(a,b)=>q(a).cmp(b)>0?q(a):q(b);
function choose(n,k){let z=1;for(let j=1;j<=k;j++)z=z*(n-j+1)/j;return z;}
const power=(x,n)=>{let z=q(1);for(let j=0;j<n;j++)z=z.mul(x);return z;};
function polynomialRange(c,l,u){
 const d=c.length-1,w=u.sub(l),a=[];
 for(let j=0;j<=d;j++){let z=q(0);for(let m=j;m<=d;m++)z=z.add(c[m].mul(choose(m,j)).mul(power(l,m-j)));a.push(z.mul(power(w,j)));}
 const b=[];for(let k=0;k<=d;k++){let z=q(0);for(let j=0;j<=k;j++)z=z.add(a[j].mul(choose(k,j)).div(choose(d,j)));b.push(z);}
 return [b.reduce(min),b.reduce(max)];
}
export class ExactHistory extends History{
 box(T,n){T=G.of(T);assert(T.lo.cmp(this.knots[0].t)>=0&&T.hi.cmp(this.knots.at(-1).t)<=0,'independent complete nominal coverage');let out=null;
  for(let j=0;j<this.knots.length-1;j++){if(q(this.knots[j+1].t).cmp(T.lo)<0)continue;if(q(this.knots[j].t).cmp(T.hi)>0)break;const s=this.segment(j),L=max(T.lo,s.left),U=min(T.hi,s.right),l=L.sub(s.left).div(s.h),u=U.sub(s.left).div(s.h);
   const jets=s.coeff.map(c=>{let d=c;for(let k=0;k<n;k++)d=d.slice(1).map((x,i)=>x.mul(i+1).div(s.h));return polynomialRange(d,l,u);});out=out?out.map((z,k)=>[min(z[0],jets[k][0]),max(z[1],jets[k][1])]):jets;
  }assert(out);return out.map(z=>new G(...z));
 }
}
export function known(){const old=oldKnown(),r=polynomialRange([q(0),q(1),q(-1)],q(0),q(1));assert(r[0].cmp(0)===0&&r[1].cmp('1/2')===0);const p=polynomialRange([q(1),q(2),q(3)],q('1/3'),q('1/3'));assert(p[0].cmp(2)===0&&p[1].cmp(2)===0);const H=new ExactHistory([{t:0,x:[0,0],v:[0,0],a:[0,0]},{t:1,x:[1,0],v:[5,0],a:[20,0]}]);for(const [n,v]of[[0,'1/32'],[1,'5/16'],[2,'5/2'],[3,15]]){const b=H.box(new G('1/2'),n)[0];assert(b.lo.cmp(v)<=0&&b.hi.cmp(v)>=0);}const seam=new ExactHistory([{t:0,x:[0,0],v:[0,0],a:[0,0]},{t:1,x:[0,0],v:[0,0],a:[0,0]},{t:2,x:['1/6',0],v:['1/2',0],a:[1,0]}]);const b=seam.box(new G(1),3)[0];assert(b.lo.cmp(0)<=0&&b.hi.cmp(1)>=0);return {passed:true,old,cases:['exact power-to-Bernstein quadratic hull','rational singleton avoids intermediate grid loss','t5 exact jets0..3','closed seam keeps both jerks']};}
if(process.argv.includes('--known'))console.log(JSON.stringify(known(),null,2));
