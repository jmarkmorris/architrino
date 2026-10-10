// Independent exact support inequalities; no trajectory or approximate event integration.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;};
const Q=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);assert(d!==0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>add(a,Q(-b[0],b[1]));
const mul=(a,b)=>Q(a[0]*b[0],a[1]*b[1]), div=(a,b)=>Q(a[0]*b[1],a[1]*b[0]);
const sq=a=>mul(a,a),pow=(a,n)=>{let p=Q(1);while(n--)p=mul(p,a);return p;};
const positive=a=>a[0]>0n;
const fac=n=>{let a=1n;for(let k=2;k<=n;k++)a*=BigInt(k);return a;};
const poly=(x,degree,odd)=>{let a=Q(0);for(let k=odd?1:0;k<=degree;k+=2){let t=div(pow(x,k),Q(fac(k)));a=((k-(odd?1:0))/2)%2?sub(a,t):add(a,t);}return a;};
const sin=x=>[poly(x,7,true),poly(x,5,true)],cos=x=>[poly(x,6,false),poly(x,4,false)];
const ai=(a,b)=>[add(a[0],b[0]),add(a[1],b[1])],si=(a,b)=>[sub(a[0],b[1]),sub(a[1],b[0])];
const mi=(a,b)=>{assert(a[0][0]>=0n&&b[0][0]>=0n);return [mul(a[0],b[0]),mul(a[1],b[1])];};
const scale=(a,n,d=1)=>mi(a,[Q(n,d),Q(n,d)]);
const rho=[Q(173205,200000),Q(173206,200000)];
function angles(q){const h=mul(q,Q(1,2)),s=sin(h),c=cos(h);return {
 leadS:si(scale(c,1,2),mi(rho,s)),leadC:ai(mi(rho,c),scale(s,1,2)),
 trailS:ai(scale(c,1,2),mi(rho,s)),secondS:si(mi(rho,c),scale(s,1,2)),
 fourthS:ai(mi(rho,c),scale(s,1,2)),middleS:c};}
function radialLower(l,h){const a=angles(l),b=angles(h);
 const lead=div(Q(1),mul(Q(4),mul(b.leadS[0],add(Q(1),mul(Q(1,4),b.leadC[0])))));
 const trail=div(Q(1),mul(Q(4),a.trailS[0]));
 const middle=div(Q(1),mul(Q(4),b.middleS[0]));
 const second=div(Q(1),mul(Q(4),a.secondS[1]));
 const fourth=div(Q(1),mul(Q(4),b.fourthS[1]));
 return sub(add(second,fourth),add(add(lead,trail),middle));}
if(process.argv[2]==='controls'){
 assert.deepEqual(add(Q(1,2),Q(1,3)),Q(5,6));
 assert.deepEqual(sin(Q(0)),[Q(0),Q(0)]);assert.deepEqual(cos(Q(0)),[Q(1),Q(1)]);
 assert.equal(positive(sub(Q(3,8),Q(1,3))),true);assert.equal(positive(sub(Q(3,8),Q(2,5))),false);
 console.log(JSON.stringify({mode:'controls',pass:true,cases:5}));
}else if(process.argv[2]==='target'){
 const h=Q(3,16),cm=sub(Q(1),mul(Q(1,2),sq(h))),sl=sub(h,mul(Q(1,6),pow(h,3)));
 const t=Q(29,48),phase=sub(mul(t,Q(1,4)),mul(Q(3,40),sq(t)));
 const tests={
  J_pair_sine_minus:sub(sub(mul(Q(19,22),cm),mul(Q(1,2),h)),Q(3,4)),
  J_pair_sine_plus:sub(add(mul(Q(19,22),cm),mul(Q(1,2),sl)),Q(15,16)),
  J_pair_upper:sub(Q(5),add(Q(92,27),Q(4592,3375))),
  positive_source_phase:sub(phase,Q(3,25)),
  leading_sine_short:sub(sub(mul(Q(1,2),sub(Q(1),Q(1,200))),Q(13,150)),Q(2,5)),
  F_positive_short:sub(Q(9,25),Q(5,16)),F_positive_long:sub(Q(3,5),Q(9,20)),
  release_support_lower:sub(Q(7,1520),Q(99,655360)),
  stationary_negative_margin:sub(Q(3,52),Q(919,16000)),
  radial_first: add(radialLower(Q(3,16),Q(1,4)),Q(13,20)),
  radial_second:add(radialLower(Q(1,4),Q(29,80)),Q(7,10)),
  speed_first_margin:sub(Q(881,12800),Q(13,200)),
  speed_second_margin:sub(Q(287,4000),Q(7,100)),
  derivative_margin:sub(Q(11),Q(510,49)),
  final_negative_margin:sub(Q(7,4000),Q(11,10000))};
 const results=Object.entries(tests).map(([name,x])=>({name,positive:positive(x),exactMargin:`${x[0]}/${x[1]}`}));
 const pass=results.every(x=>x.positive);console.log(JSON.stringify({mode:'target',arithmetic:'exact rational; alternating trigonometric bounds',pass,results}));if(!pass)process.exitCode=1;
}else throw new Error('select controls or target');
