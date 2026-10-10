// Exact rational inequalities for the analytical confinement proof.
// No imported subject code, integration, finite differences, or float assertions.
import assert from 'node:assert/strict';
const gcd = (a,b) => { a=a<0n?-a:a; b=b<0n?-b:b; while(b){[a,b]=[b,a%b];} return a; };
const Q = (n,d=1n) => {n=BigInt(n);d=BigInt(d);assert.notEqual(d,0n);if(d<0n){n=-n;d=-d;}const z=gcd(n,d);return {n:n/z,d:d/z};};
const add=(a,b)=>Q(a.n*b.d+b.n*a.d,a.d*b.d);
const neg=a=>Q(-a.n,a.d), sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>Q(a.n*b.n,a.d*b.d), div=(a,b)=>Q(a.n*b.d,a.d*b.n);
const pow=(a,k)=>Q(a.n**BigInt(k),a.d**BigInt(k));
const cmp=(a,b)=>a.n*b.d-b.n*a.d;
const eq=(a,b)=>assert.equal(cmp(a,b),0n);
const gt=(a,b,label)=>assert.ok(cmp(a,b)>0n,label);
const ge=(a,b,label)=>assert.ok(cmp(a,b)>=0n,label);
const str=a=>`${a.n}/${a.d}`;
const one=Q(1),two=Q(2),four=Q(4),zero=Q(0),half=Q(1,2);
const D=r=>add(pow(r,2),mul(half,r));
const dp=r=>add(mul(two,r),half);
const fp=r=>neg(div(dp(r),pow(D(r),2)));
const fpp=r=>div(add(add(mul(Q(6),pow(r,2)),mul(Q(3),r)),half),pow(D(r),3));
const b2=r=>div(mul(two,r),sub(mul(two,r),one));
const b2p=r=>neg(div(two,pow(sub(mul(two,r),one),2)));
const b2pp=r=>div(Q(8),pow(sub(mul(two,r),one),3));
const g=r=>div(pow(add(mul(two,r),one),2),mul(two,add(mul(four,r),one)));
const v=(r,J,q)=>add(sub(div(J,D(r)),div(one,r)),mul(div(q,four),b2(r)));
const vp=(r,J,q)=>add(add(mul(J,fp(r)),div(one,pow(r,2))),mul(div(q,four),b2p(r)));
const vpp=(r,J,q)=>add(sub(mul(J,fpp(r)),div(two,pow(r,3))),mul(div(q,four),b2pp(r)));

// Known answers precede every drift target.
eq(add(Q(1,3),Q(1,6)),half);
eq(div(Q(-2,3),Q(4,9)),Q(-3,2));
gt(Q(1,7),Q(1,8),'known comparison');
for(const r of [Q(2),Q(20),Q(100)]){
  eq(vp(r,g(r),zero),zero);
  eq(vpp(r,g(r),zero),div(Q(8),mul(mul(r,add(mul(four,r),one)),add(mul(two,r),one))));
}
console.log('PASS: exact rational arithmetic and zero-momentum circle controls, before targets.');

const r0=Q(100), lo=Q(9999,100), hi=Q(10001,100), h=Q(1,100), eta=Q(1,10000);
const q=Q(39601,400000000), Jm=g(r0), Jc=mul(Jm,Q(79999,80000));
const A=Q(1,800000000), m=Q(9,10000000), B=Q(1,100000000000);
eq(Jm,Q(40401,802));
eq(vp(r0,Jm,q),neg(A));
eq(vp(r0,Jc,q),zero);
// f'' numerator increases and D increases: this lower bound applies on [lo,hi].
const fppLower=div(add(add(mul(Q(6),pow(lo,2)),mul(Q(3),lo)),half),pow(D(hi),3));
const curvatureLower=sub(mul(Jc,fppLower),div(two,pow(lo,3))); // omit positive q beta2''/4
gt(curvatureLower,m,'uniform radial curvature > m for every J in [Jc,Jm]');
const fppUpper=div(add(add(mul(Q(6),pow(hi,2)),mul(Q(3),hi)),half),pow(D(lo),3));
const curvatureUpper=add(sub(mul(Jm,fppUpper),div(two,pow(hi,3))),mul(div(q,four),b2pp(lo)));
const M=Q(11,10000000);
gt(M,curvatureUpper,'uniform radial curvature < M');
const epsilon=div(pow(A,2),mul(two,m));
eq(epsilon,Q(1,1152000000000));
const radialBarrier=sub(div(mul(m,pow(h,2)),two),mul(A,h));
eq(radialBarrier,Q(13,400000000000));
gt(radialBarrier,B,'radial boundary clears the admission energy');
const angularBarrier=sub(mul(div(Jc,D(hi)),pow(eta,2)),epsilon);
gt(angularBarrier,Q(49,1000000000000),'latitude boundary clears 4.9e-11');
gt(angularBarrier,B,'latitude boundary clears the admission energy');
// A sufficient finite initial-data box within each selected invariant fiber.
const hx=Q(1,1000),xi=Q(1,100000),vr=Q(1,1000000),vc=Q(1,100000000);
const cosXiLower=sub(one,div(pow(xi,2),two));
const radialBox=add(mul(A,hx),div(mul(M,pow(hx,2)),two));
const angularBox=add(mul(div(Jm,D(lo)),div(pow(xi,2),pow(cosXiLower,2))),mul(mul(div(q,four),div(lo,sub(lo,one))),pow(xi,2)));
const kineticBox=div(add(mul(add(one,div(one,lo)),pow(vr,2)),mul(D(hi),pow(vc,2))),four);
const boxEnergyUpper=add(add(radialBox,angularBox),kineticBox);
gt(Q(3,1000000000000),boxEnergyUpper,'initial box energy excess < 3e-12');
gt(B,boxEnergyUpper,'initial box is admitted');
eq(div(A,m),Q(1,720));
eq(mul(two,div(A,m)),Q(1,360));
gt(pow(Q(1,75000),2),div(epsilon,div(Jm,D(hi))),'original latitude bound < 1/75000');
gt(pow(Q(1,500000),2),mul(Q(4),epsilon),'original radial speed bound < 1/500000');
gt(pow(Q(1,50000000),2),div(mul(Q(4),epsilon),D(lo)),'original latitude rate bound < 1/50000000');
// The original zero-latitude radial well: critical point and second turning point brackets.
const criticalLo=add(r0,Q(125,100000)),criticalHi=add(r0,Q(127,100000));
gt(zero,vp(criticalLo,Jm,q),'critical point lower bracket');
gt(vp(criticalHi,Jm,q),zero,'critical point upper bracket');
const turnLo=add(r0,Q(250,100000)),turnHi=add(r0,Q(254,100000));
gt(v(r0,Jm,q),v(turnLo,Jm,q),'outer turning point lower bracket');
gt(v(turnHi,Jm,q),v(r0,Jm,q),'outer turning point upper bracket');
// Exact speed preparation at r=100; tangential square and momentum square.
const uc2=Q(79999,16040000),um2=Q(2,401),U=Q(1,200),P=Q(199,20000);
eq(mul(pow(add(r0,half),2),uc2),Jc);
eq(mul(pow(add(r0,half),2),um2),Jm);
eq(mul(mul(two,sub(one,div(one,mul(two,r0)))),U),P);
eq(pow(P,2),q);
// Elementary cos bound cos(eta) >= 1 - eta^2/2, used in reconstruction.
const cosLower=sub(one,div(pow(eta,2),two));
const tangentUpperSquared=div(Jm,mul(pow(add(lo,half),2),pow(cosLower,2)));
gt(pow(Q(72,1000),2),tangentUpperSquared,'each relative tangential half-speed < .072');
const kineticUpper=add(B,epsilon);
gt(pow(Q(1,200000),2),kineticUpper,'each relative radial half-speed < .000005');
gt(pow(Q(1,200000),2),mul(kineticUpper,div(pow(hi,2),D(lo))),'each relative latitude half-speed < .000005');
const commonUpper=mul(div(P,two),div(lo,sub(lo,one)));
gt(Q(6,1000),commonUpper,'common speed < .006');
gt(Q(1,10),add(add(add(Q(72,1000),Q(6,1000)),Q(1,200000)),Q(1,200000)),'member speed < .07801 < .1');
gt(sub(one,div(one,lo)),Q(98,100),'Hessian eigenvalue floor > .98');
gt(Q(102,100),add(one,div(one,lo)),'Hessian eigenvalue ceiling < 1.02');
gt(Q(104,100),div(add(one,div(one,lo)),sub(one,div(one,lo))),'Hessian condition number < 1.04');

console.log(JSON.stringify({
  grade:'exact rational evaluation of proof inequalities; no evolution',
  q:str(q),Jmirror:str(Jm),Jaligned:str(Jc),curvatureLower:str(curvatureLower),
  admittedCurvature:str(m),energyAllowance:str(B),minimumAllowance:str(epsilon),
  curvatureUpper:str(curvatureUpper),initialBoxEnergyUpper:str(boxEnergyUpper),
  radialBarrier:str(radialBarrier),latitudeBarrier:str(angularBarrier),
  radiusExcessBound:str(mul(two,div(A,m))),
  criticalBracket:[str(criticalLo),str(criticalHi)],turningBracket:[str(turnLo),str(turnHi)],
  exactCircleTangentialSquare:str(uc2),commonSpeedBound:str(commonUpper),
  controls:'PASS before target',targets:'PASS'
},null,2));
