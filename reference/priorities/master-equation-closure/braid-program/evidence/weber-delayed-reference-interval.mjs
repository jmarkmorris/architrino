// Outward interval reference verification, separately written after the analytical reference froze.
// IEEE elementary operations are rounded outward to the adjacent representable float.
// Transcendentals use polynomial remainder enclosures, not platform trig/exp as evidence.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const buf=new ArrayBuffer(8),dv=new DataView(buf);
function next(x,up){if(Number.isNaN(x)||x===(up?Infinity:-Infinity))return x;if(x===0)return up?Number.MIN_VALUE:-Number.MIN_VALUE;dv.setFloat64(0,x);let b=dv.getBigUint64(0);b+=(x>0)===up?1n:-1n;dv.setBigUint64(0,b);return dv.getFloat64(0);}
const P=x=>[x,x], add=(a,b)=>[next(a[0]+b[0],false),next(a[1]+b[1],true)],neg=a=>[-a[1],-a[0]],sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>{let p=[a[0]*b[0],a[0]*b[1],a[1]*b[0],a[1]*b[1]];return[next(Math.min(...p),false),next(Math.max(...p),true)];};
const div=(a,b)=>{assert(b[0]>0||b[1]<0,`division through zero ${b}`);return mul(a,[next(1/b[1],false),next(1/b[0],true)]);};
const abs=a=>a[0]>=0?a:a[1]<=0?neg(a):[0,Math.max(-a[0],a[1])];
const PI=[3.141592653589793,3.1415926535897936];
function sin(a){let q=Math.round((a[0]+a[1])/2/(2*Math.PI)),x=sub(a,mul(P(2*q),PI));assert(Math.max(Math.abs(x[0]),Math.abs(x[1]))<3.142);let term=x,s=x;const x2=mul(x,x);for(let n=1;n<=20;n++){term=neg(div(mul(term,x2),P((2*n)*(2*n+1))));s=add(s,term);}return add(s,[-1e-23,1e-23]);}
function cos(a){let q=Math.round((a[0]+a[1])/2/(2*Math.PI)),x=sub(a,mul(P(2*q),PI));assert(Math.max(Math.abs(x[0]),Math.abs(x[1]))<3.142);let term=P(1),s=term;const x2=mul(x,x);for(let n=1;n<=20;n++){term=neg(div(mul(term,x2),P((2*n-1)*(2*n))));s=add(s,term);}return add(s,[-1e-23,1e-23]);}
function exp(a){let x=div(a,P(16));assert(Math.max(Math.abs(x[0]),Math.abs(x[1]))<.6);let term=P(1),s=term;for(let n=1;n<=32;n++){term=div(mul(term,x),P(n));s=add(s,term);}s=add(s,[-1e-30,1e-30]);for(let n=0;n<4;n++)s=mul(s,s);return s;}
const sign=a=>a[0]>0?1:a[1]<0?-1:0;
const mm=(a,b)=>a.map((row,i)=>b[0].map((_,j)=>add(mul(row[0],b[0][j]),mul(row[1],b[1][j]))));
const ma=(a,b)=>a.map((row,i)=>row.map((v,j)=>add(v,b[i][j])));
const ms=(a,b)=>a.map(row=>row.map(v=>mul(v,b)));
const outer=(a,b)=>a.map(v=>b.map(w=>mul(v,w)));
const rowM=(a,b)=>[add(mul(a[0],b[0][0]),mul(a[1],b[1][0])),add(mul(a[0],b[0][1]),mul(a[1],b[1][1]))];
const va=(a,b)=>a.map((v,i)=>add(v,b[i]));
const vs=(a,b)=>a.map(v=>mul(v,b));
const I=[[P(1),P(0)],[P(0),P(1)]],J=[[P(0),P(-1)],[P(1),P(0)]];
const determinant=a=>sub(mul(a[0][0],a[1][1]),mul(a[0][1],a[1][0]));
function hf(d,beta,phi){return sub(d,mul(mul(P(2),beta),abs(sin(div(sub(phi,d),P(2))))));}
function recordKnown(){
 const s=sin(P(0)),c=cos(P(0)),e=exp(P(0));assert(s[0]<=0&&s[1]>=0);assert(c[0]<=1&&c[1]>=1);assert(e[0]<=1&&e[1]>=1);assert(sign(sub(sin(div(PI,P(2))),P(.999999999999)))===1);assert(sign(sub(P(1.000000000001),sin(div(PI,P(2)))))===1);
 assert.deepEqual(determinant([[P(2),P(0)],[P(0),P(3)]]).map(x=>Math.abs(x-6)<1e-13),[true,true]);
 return{status:'PASS',sin0:s,cos0:c,exp0:e,sinPiOver2:sin(div(PI,P(2))),diagonalDeterminant:determinant([[P(2),P(0)],[P(0),P(3)]])};
}
function census(beta,seeds,width=1e-6){
 let ledger=[],counts=[];const midpoint=(beta[0]+beta[1])/2;
 for(let j=0;j<4;j++){
  const phi=mul(P(j/2),PI),max=mul(P(2),beta),cuts=[{d:P(0),sign:j===0?-1:sign(hf(P(0),beta,phi))},{d:max,sign:sign(hf(max,beta,phi))}];
  const span=Math.ceil(beta[1]/Math.PI)+4;
  for(let m=-span;m<=span;m++){
   const zero=sub(phi,mul(P(2*m),PI));if(zero[0]>0&&zero[1]<max[0]){const value=hf(zero,beta,phi);assert(sign(value));cuts.push({d:zero,sign:sign(value)});}
   for(let sg of [-1,1]){
    const th0=Math.acos(-1/(midpoint*sg));for(let th of [th0+2*Math.PI*m,-th0+2*Math.PI*m]){
     const dd=(j*Math.PI/2)-2*th;if(dd<=0||dd>=2*midpoint||Math.sign(Math.sin(th))!==sg)continue;
     const theta=[th-1e-7,th+1e-7],target=div(P(-1),mul(beta,P(sg)));
     const lo=sub(cos(P(theta[0])),target),hi=sub(cos(P(theta[1])),target);assert(sign(lo)*sign(hi)===-1);assert(sign(sin(theta))===sg);
     const d=sub(phi,mul(P(2),theta)),value=hf(d,beta,phi);assert(sign(value),`fold possibility ${j} ${d} ${value}`);cuts.push({d,sign:sign(value)});
    }
   }
  }
  cuts.sort((a,b)=>a.d[0]-b.d[0]);for(let n=1;n<cuts.length;n++)assert(cuts[n-1].d[1]<cuts[n].d[0]);
  const expected=cuts.slice(1).filter((c,n)=>c.sign!==cuts[n].sign).length;
  const mine=seeds.filter(r=>r.j===j);assert.equal(expected,mine.length,`complete census j=${j}`);
  for(let seed of mine){const d=[seed.d-width,seed.d+width],lo=hf(P(d[0]),beta,phi),hi=hf(P(d[1]),beta,phi);assert(sign(lo)*sign(hi)===-1);
   const alpha=sub(phi,d),u=div(d,beta),n=[div(sub(P(1),cos(alpha)),u),div(neg(sin(alpha)),u)],D=add(P(1),div(mul(beta,sin(alpha)),u));assert(sign(D));
   ledger.push({j,phi,d,alpha,u,n,D,sigma:j%2?-1:1,endpointSigns:[lo,hi]});
  }
  counts.push(expected);
 }
 let Cr=P(0),Ct=P(0);
 for(let r of ledger){Cr=add(Cr,div(P(r.sigma),mul(mul(P(2),r.u),abs(r.D))));Ct=add(Ct,div(mul(P(-r.sigma),sin(r.alpha)),mul(mul(mul(r.u,r.u),r.u),abs(r.D))));}
 return{beta,Cr,Ct,rho:div(neg(Cr),mul(beta,beta)),counts,ledger};
}
function matrices(c,z){let rho=c.rho,omega=div(c.beta,rho),z2=mul(z,z),o2=mul(omega,omega),H=ma(ms(I,sub(z2,o2)),ms(J,mul(mul(P(2),omega),z))),M=I;
 for(let r of c.ledger){const R=mul(rho,r.u),cs=cos(r.alpha),sn=sin(r.alpha),Q=[[cs,neg(sn)],[sn,cs]],E=mul(P(r.j%2?-1:1),exp(neg(mul(z,R))));
  const W=ma(I,ms(Q,neg(E))),v=[neg(mul(c.beta,sn)),mul(c.beta,cs)],a=vs([cs,sn],neg(mul(o2,rho))),L=vs(rowM(r.n,W),div(P(1),r.D)),Pj=ma(I,ms(outer(r.n,r.n),P(-1))),N=ms(mm(Pj,ma(W,outer(v,L))),div(P(1),R)),V=ma(ms(mm(Q,ma(ms(I,z),ms(J,omega))),E),ms(outer(a,L),P(-1))),deltaD=vs(va(rowM(v,N),rowM(r.n,V)),P(-1));
  const B=ma(ma(N,ms(outer(r.n,L),add(div(P(-2),R),mul(R,z2)))),ms(outer(r.n,deltaD),div(P(-1),r.D)));
  H=ma(H,ms(B,div(P(-r.sigma),mul(mul(R,R),abs(r.D)))));
  M=ma(M,ms(outer(r.n,r.n),div(P(-r.sigma),mul(mul(R,abs(r.D)),r.D))));
 }
 return{H,M,Hdet:determinant(H),Mdet:determinant(M)};
}
if(process.argv[2]==='--known'){console.log(JSON.stringify({phase:'known',...recordKnown()},null,2));}
else if(process.argv[2]==='--target'){
 const seeds=JSON.parse(fs.readFileSync(new URL('./weber-delayed-reference-target.json',import.meta.url))).balances[0];
 // The circle is enclosed by endpoint signs; wider root boxes permit certification over the entire beta interval.
 const beta=[2.14724560,2.14724572],c=census(beta,seeds.ledger);
 // Refine endpoint root boxes with the independent measured seeds computed at each endpoint by full monotone census.
 // Seeds are hints only: every root endpoint sign and full root count are checked by interval operations above.
 const leftSeeds=JSON.parse(fs.readFileSync(new URL('./weber-delayed-reference-endpoint-seeds.json',import.meta.url))).left;
 const rightSeeds=JSON.parse(fs.readFileSync(new URL('./weber-delayed-reference-endpoint-seeds.json',import.meta.url))).right;
 const left=census(P(beta[0]),leftSeeds,1e-11),right=census(P(beta[1]),rightSeeds,1e-11);
 assert(sign(left.Ct)*sign(right.Ct)===-1);assert(c.Cr[1]<0);
 const M=matrices(c,P(0));assert(sign(M.Mdet));
 const pairing=[[1.02,1.04],[3.60,3.70]].map(b=>{const dl=matrices(c,P(b[0])).Hdet,dr=matrices(c,P(b[1])).Hdet;assert(sign(dl)*sign(dr)===-1,JSON.stringify({b,dl,dr}));return{bracket:b,detLeft:dl,detRight:dr};});
 console.log(JSON.stringify({phase:'target',status:'PASS',method:'outward IEEE arithmetic with Taylor transcendental remainder enclosures; monotone complete root census and intermediate value theorem',beta,Cr:c.Cr,rho:c.rho,CtLeft:left.Ct,CtRight:right.Ct,counts:c.counts,rootBoxes:c.ledger.map(r=>({j:r.j,d:r.d,D:r.D,endpointSigns:r.endpointSigns})),M:M.M,Mdet:M.Mdet,pairing},null,2));
}else throw Error('use --known or --target');
