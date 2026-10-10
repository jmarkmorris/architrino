// Independent rational-cell enclosure, not the subject's fixed-point node method.
// Trigonometry: exact rational alternating series at cell midpoint, then
// a derivative-one Lipschitz enclosure over the entire argument cell.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;while(b){const r=a%b;a=b;b=r;}return a;};
function q(n,d=1n){n=BigInt(n);d=BigInt(d);assert.ok(d!==0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];}
const plus=(a,b)=>q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const minus=(a,b)=>plus(a,[-b[0],b[1]]);
const times=(a,b)=>q(a[0]*b[0],a[1]*b[1]);
const over=(a,b)=>q(a[0]*b[1],a[1]*b[0]);
const cmp=(a,b)=>a[0]*b[1]<b[0]*a[1]?-1:a[0]*b[1]>b[0]*a[1]?1:0;
const low=(a,b)=>cmp(a,b)<0?a:b,high=(a,b)=>cmp(a,b)>0?a:b;
const zero=q(0),one=q(1),two=q(2),point=a=>[a,a];
const sum=(a,b)=>[plus(a[0],b[0]),plus(a[1],b[1])];
const diff=(a,b)=>[minus(a[0],b[1]),minus(a[1],b[0])];
function product(a,b){const p=[times(a[0],b[0]),times(a[0],b[1]),times(a[1],b[0]),times(a[1],b[1])];return[p.reduce(low),p.reduce(high)];}
function sq(a){const x=times(a[0],a[0]),y=times(a[1],a[1]);return[cmp(a[0],zero)<=0&&cmp(a[1],zero)>=0?zero:low(x,y),high(x,y)];}
function trigPoint(x,sine){
  assert.ok(cmp(x,zero)>=0&&cmp(x,q(6))<=0);
  let p=sine?1:0,term=sine?x:one,total=term;
  const x2=times(x,x),last=sine?25:24;
  while(p<last){term=over(times(q(-1),times(term,x2)),q((p+1)*(p+2)));p+=2;total=plus(total,term);}
  const next=over(times(q(-1),times(term,x2)),q((p+1)*(p+2)));
  // Both last included terms are positive; subsequent tails alternate and
  // decrease since x^2 <= 36 < (p+1)(p+2), and later denominators grow.
  assert.ok(cmp(next,zero)<=0);
  return[plus(total,next),total];
}
function trigCell(u,beta,sine){
  const middle=over(plus(u[0],u[1]),two),radius=times(beta,over(minus(u[1],u[0]),two));
  const t=trigPoint(times(beta,middle),sine);
  return[minus(t[0],radius),plus(t[1],radius)];
}
function H(u,beta,epsilon){
  const a=diff(point(two),sq(u));
  const z=product(point(over(two,beta)),u);
  const cross=diff(product(z,trigCell(u,beta,false)),product(a,trigCell(u,beta,true)));
  return sum(sum(sq(a),sq(z)),product(point(q(2*epsilon)),cross));
}
const exact=a=>`${a[0]}/${a[1]}`;
const approx=a=>Number(a[0]*10n**15n/a[1])/1e15;
const show=a=>({exact:a.map(exact),approx:a.map(approx)});
// Uses the independently authored rational library above, not subject arithmetic.
const beta=q(3),sign=a=>cmp(a[0],zero)>0?1:cmp(a[1],zero)<0?-1:0;
function derivative(u){return product(point(two),product(diff(sq(u),point(q(16,9))),sum(product(point(two),u),product(point(beta),trigCell(u,beta,false)))));}
function isolate(a,b,fn=x=>H(point(x),beta,1)){let sa=sign(fn(a)),sb=sign(fn(b));assert.ok(sa*sb===-1);for(let i=0;i<24;i++){const m=over(plus(a,b),two),s=sign(fn(m));assert.ok(s!==0,'precision unresolved');if(s===sa){a=m;sa=s;}else{b=m;sb=s;}}return[a,b];}
const quotient=(a,b)=>{assert.ok(cmp(b[0],zero)>0);return product(a,[over(one,b[1]),over(one,b[0])]);};
const magnitude=a=>sign(a)>0?a:[times(q(-1),a[1]),times(q(-1),a[0])];
const within=(a,l,h)=>{assert.ok(cmp(a[0],l)>0&&cmp(a[1],h)<0);};
const mode=process.argv[2];
assert.deepEqual(H(point(zero),beta,1),[q(4),q(4)]);
assert.deepEqual(derivative(point(zero)),[q(-32,3),q(-32,3)]);
assert.equal(cmp(plus(q(1,2),q(1,3)),q(5,6)),0);
assert.deepEqual(trigPoint(zero,true),[zero,zero]);
const known=isolate(q(1),q(2),x=>point(minus(times(x,x),two)));assert.ok(cmp(times(known[0],known[0]),two)<0&&cmp(times(known[1],known[1]),two)>0);
console.log(JSON.stringify({knownSquareRootBracket:known.map(exact),mode:'controls',status:'passed',HZero:4,derivativeZero:'-32/3',rationalAddition:'5/6'}));
if(mode!=='target')process.exit(0);
const windows=[[q(2,5),q(1,2)],[q(11,10),q(6,5)]];
for(const w of windows)assert.notEqual(sign(derivative(w)),0);
let excluded=0;
for(let k=0;k<4000;k++){if(k>=800&&k<1000||k>=2200&&k<2400)continue;const u=[q(k,2000),q(k+1,2000)];assert.notEqual(sign(H(u,beta,1)),0,`unresolved ${k}`);excluded++;}
const results=windows.map(w=>{const u=isolate(...w),sn=trigCell(u,beta,true),cs=trigCell(u,beta,false),sv=diff(diff(point(two),sq(u)),sn),cv=sum(cs,product(point(q(2,3)),u));const ft=product(point(two),cv),fu=diff(product(point(q(9)),sq(u)),point(q(16)));
const c2=quotient(product(point(two),magnitude(ft)),magnitude(fu)),B2=quotient(point(q(8)),product(sq(u),product(magnitude(fu),magnitude(ft))));
const dr=quotient(product(point(beta),ft),product(point(two),u)),pt=product(point(q(1,3)),diff(point(one),dr)),pb2=diff(diff(point(one),product(point(q(1,4)),sq(u))),sq(pt));
const first=cmp(u[0],one)<0;
within(c2,times(q(first?390:421,1000),q(first?390:421,1000)),times(q(first?391:422,1000),q(first?391:422,1000)));
within(B2,times(q(first?163:206,100),q(first?163:206,100)),times(q(first?164:207,100),q(first?164:207,100)));
within(pt,q(first?-91:48,100),q(first?-90:49,100));assert.ok(cmp(pb2[0],q(first?12:42,100))>0);
const ss=sum(product(sv,cs),product(cv,sn)),cc=diff(product(cv,cs),product(sv,sn));
within(ss,q(first?73696859:-87575188,100000000),q(first?73696902:-87575148,100000000));
within(cc,q(first?-67592702:48276166,100000000),q(first?-67592657:48276200,100000000));
return {cSquared:show(c2),BSquared:show(B2),Dr:show(dr),pt:show(pt),pbSquared:show(pb2),u:show(u),derivative:show(derivative(w)),Ftheta:show(product(point(two),cv)),Fuu:show(diff(product(point(q(9)),sq(u)),point(q(16)))),sin2theta:show(sum(product(sv,cs),product(cv,sn))),cos2theta:show(diff(product(cv,cs),product(sv,sn)))};});
console.log(JSON.stringify({mode,status:'passed',method:'exact rational whole-cell exclusion outside two monotone windows; rational bisection and midpoint Taylor/Lipschitz bounds',excludedCells:excluded,windows:windows.map(w=>w.map(exact)),unresolved:0,results}));
