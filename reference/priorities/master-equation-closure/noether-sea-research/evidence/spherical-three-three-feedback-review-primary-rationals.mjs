// Exact rational checks of separately reconstructed inequalities; no dynamics solver.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;};
const q=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}assert(d!==0n);const g=gcd(n,d);return [n/g,d/g];};
const add=(a,b)=>q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const sub=(a,b)=>add(a,q(-b[0],b[1]));
const mul=(a,b)=>q(a[0]*b[0],a[1]*b[1]);
const sq=a=>mul(a,a), cube=a=>mul(sq(a),a);
const positive=a=>a[0]>0n;
if(process.argv[2]==='controls'){
 assert.deepEqual(add(q(1,2),q(1,3)),q(5,6));
 assert.deepEqual(mul(q(-2,3),q(9,4)),q(-3,2));
 assert.equal(positive(sub(q(3,8),q(1,3))),true);
 assert.equal(positive(sub(q(3,8),q(2,5))),false);
 console.log(JSON.stringify({mode:'controls',pass:true,cases:4}));
}else if(process.argv[2]==='target'){
 const H=q(49,256), cm=sub(q(1),mul(q(1,2),sq(H))), cp=add(cm,mul(q(1,24),sq(sq(H))));
 const L=sub(mul(q(1,2),cm),mul(q(13,15),H));
 const U=add(mul(q(13,15),cp),mul(q(1,2),H));
 const C=sub(mul(q(6,7),cm),mul(q(1,2),H));
 const V=add(mul(q(1,2),cp),mul(q(13,15),H));
 const P=q(321,1280), x=q(93,1280);
 const tests={L_positive:L,U_positive:U,C_positive:C,V_positive:V,
  h_margin:sub(H,q(1563,8192)),
  leading_upper:sub(mul(q(9),sq(L)),U),
  trailing_lower:sub(mul(q(10),C),mul(q(17),sq(V))),
  second_upper:sub(mul(q(5),sq(C)),mul(q(4),V)),
  middle_upper:sub(mul(mul(q(4),sq(cm)),sub(q(1),mul(H,q(1,16)))),mul(q(19),H)),
  F_upper:sub(q(9,4),q(895,399)),F_lower:sub(q(3,2),q(109,75)),
  event_lower:sub(sub(sub(q(1),mul(q(7,8),P)),mul(q(1,8),sq(P))),q(3,4)),
  stationary_gap:sub(mul(q(38,11),sub(x,mul(q(1,6),cube(x)))),q(501,2000)),
  stationary_continuation:sub(q(1,2000),q(3,10000)),
  speed_bootstrap:sub(q(1,2),add(q(19,40),q(1,4900))),
  phase_bootstrap:sub(q(3,8),add(q(29,80),q(1,20000))),
  delay_bootstrap:sub(sub(q(3,4),q(1,5000)),q(7,10))};
 const results=Object.entries(tests).map(([name,r])=>({name,positive:positive(r),exactMargin:`${r[0]}/${r[1]}`}));
 const pass=results.every(r=>r.positive);
 console.log(JSON.stringify({mode:'target',arithmetic:'exact BigInt rational',pass,results}));
 if(!pass)process.exitCode=1;
}else throw new Error('select controls or target');
