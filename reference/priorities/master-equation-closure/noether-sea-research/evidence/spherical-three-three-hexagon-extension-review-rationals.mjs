// Reviewer-owned exact endpoint inequalities, independently authored; no trajectory solver.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;};
const Q=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);assert(d!==0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>add(a,Q(-b[0],b[1]));
const mul=(a,b)=>Q(a[0]*b[0],a[1]*b[1]),div=(a,b)=>Q(a[0]*b[1],a[1]*b[0]);
const pow=(a,n)=>{let p=Q(1);while(n--)p=mul(p,a);return p;};
const fac=n=>{let p=1n;for(let k=2;k<=n;k++)p*=BigInt(k);return p;};
const poly=(x,degree,odd)=>{let p=Q(0);for(let k=odd?1:0;k<=degree;k+=2){const t=div(pow(x,k),Q(fac(k)));p=((k-(odd?1:0))/2)%2?sub(p,t):add(p,t);}return p;};
const sin=x=>[poly(x,7,true),poly(x,5,true)],cos=x=>[poly(x,6,false),poly(x,4,false)];
const ai=(a,b)=>[add(a[0],b[0]),add(a[1],b[1])],si=(a,b)=>[sub(a[0],b[1]),sub(a[1],b[0])];
const mi=(a,b)=>{assert(a[0][0]>=0n&&b[0][0]>=0n);return [mul(a[0],b[0]),mul(a[1],b[1])];};
const sc=(a,n,d=1)=>mi(a,[Q(n,d),Q(n,d)]),rho=[Q(173205,200000),Q(173206,200000)];
const positive=a=>a[0]>0n;
function tr(q){const h=mul(q,Q(1,2)),s=sin(h),c=cos(h);return {ls:si(sc(c,1,2),mi(rho,s)),lc:ai(mi(rho,c),sc(s,1,2)),ts:ai(sc(c,1,2),mi(rho,s)),cs:c,ss:si(mi(rho,c),sc(s,1,2)),fs:ai(mi(rho,c),sc(s,1,2))};}
if(process.argv[2]==='controls'){
 assert.deepEqual(add(Q(1,2),Q(1,3)),Q(5,6));assert.deepEqual(div(Q(3,4),Q(9,8)),Q(2,3));
 assert.deepEqual(sin(Q(0)),[Q(0),Q(0)]);assert.deepEqual(cos(Q(0)),[Q(1),Q(1)]);
 assert(positive(sub(Q(3,8),Q(1,3))));assert(!positive(sub(Q(3,8),Q(2,5))));assert.throws(()=>div(Q(1),Q(0)));
 console.log(JSON.stringify({mode:'controls',pass:true,cases:7}));
}else if(process.argv[2]==='target'){
 const results=[];const check=(name,r)=>results.push({name,positive:positive(r),exactMargin:`${r[0]}/${r[1]}`});
 const bins=[[Q(3,16),Q(27,100),[537,433,253,306,270]],[Q(27,100),Q(3,8),[614,410,255,316,264]]];
 bins.forEach(([lo,hi,limits],i)=>{const a=tr(lo),b=tr(hi);
  const upperLead=div(Q(1),mul(Q(4),mul(b.ls[0],add(Q(1),mul(Q(1,4),b.lc[0])))));
  const upperTrail=div(Q(1),mul(Q(4),a.ts[0])),upperCentral=div(Q(1),mul(Q(4),b.cs[0]));
  const lowerSecond=div(Q(1),mul(Q(4),a.ss[1])),lowerFourth=div(Q(1),mul(Q(4),b.fs[1]));
  check(`bin${i+1}_leading`,sub(Q(limits[0],1000),upperLead));
  check(`bin${i+1}_trailing`,sub(Q(limits[1],1000),upperTrail));
  check(`bin${i+1}_central`,sub(Q(limits[2],1000),upperCentral));
  check(`bin${i+1}_second`,sub(lowerSecond,Q(limits[3],1000)));
  check(`bin${i+1}_fourth`,sub(lowerFourth,Q(limits[4],1000)));
 });
 const x=Q(3,32);check('stationary_gap',sub(mul(Q(38,11),sub(x,mul(Q(1,6),pow(x,3)))),Q(8,25)));
 check('tangent_margin',sub(sub(sub(Q(9,16),Q(243,508)),Q(27,500)),Q(3,100)));
 check('source_speed',sub(pow(Q(27,100),2),add(Q(1,16),mul(Q(33,40),pow(Q(3,100),2)))));
 check('source_time',sub(Q(1,40),Q(21,850)));
 check('J_sine',sub(Q(335,1024),Q(8,25)));check('J_upper',sub(Q(64),Q(14825,256)));
 check('rho_lower',sub(Q(3,4),pow(rho[0],2)));check('rho_upper',sub(pow(rho[1],2),Q(3,4)));
 const pass=results.every(r=>r.positive);console.log(JSON.stringify({mode:'target',arithmetic:'exact BigInt rational and alternating polynomial enclosures',pass,results}));if(!pass)process.exitCode=1;
}else throw new Error('select controls or target');
