// Independently authored exact rational inequality certificate. No trajectory solver.
// Usage: node <this-file> controls | target. Run controls before target.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;while(b){[a,b]=[b,a%b];}return a;};
const Q=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return {n:n/g,d:d/g};};
const add=(a,b)=>Q(a.n*b.d+b.n*a.d,a.d*b.d);
const neg=a=>Q(-a.n,a.d), sub=(a,b)=>add(a,neg(b));
const mul=(a,b)=>Q(a.n*b.n,a.d*b.d), div=(a,b)=>Q(a.n*b.d,a.d*b.n);
const lt=(a,b)=>a.n*b.d<b.n*a.d;
const pow=(a,n)=>{let v=Q(1);while(n--)v=mul(v,a);return v;};
const fac=n=>{let v=1n;for(let k=2;k<=n;k++)v*=BigInt(k);return v;};
const dec=s=>{const [a,b='']=s.split('.');return Q(BigInt(a+b),10n**BigInt(b.length));};
const poly=(x,degree,odd)=>{let y=Q(0);for(let k=odd?1:0;k<=degree;k+=2){const t=div(pow(x,k),Q(fac(k)));y=add(y,((k-(odd?1:0))/2)%2?neg(t):t);}return y;};
// All target angles are nonnegative and below one. Alternating decreasing terms apply.
const sinI=([l,h])=>[poly(l,7,true),poly(h,5,true)];
const cosI=([l,h])=>[poly(h,6,false),poly(l,4,false)];
const I=q=>[q,q], ai=(a,b)=>[add(a[0],b[0]),add(a[1],b[1])];
const si=(a,b)=>[sub(a[0],b[1]),sub(a[1],b[0])];
const mi=(a,b)=>{assert(!lt(a[0],Q(0))&&!lt(b[0],Q(0)));return [mul(a[0],b[0]),mul(a[1],b[1])];};
const scale=(a,n,d=1)=>mi(a,I(Q(n,d)));
const pi=[Q(314159,100000),Q(22,7)], rho=[Q(173205,200000),Q(173206,200000)];
const a0=scale(pi,1,6), bRange=si(a0,[Q(0),Q(27,4096)]);
const trigPoint=a=>({s:sinI(I(a)),c:cosI(I(a))});
const trigRange=a=>({s:sinI(a),c:cosI(a)});
function expressions(a,b){
 const A=trigPoint(a),B=trigRange(b);
 return {num:ai(mi(A.s,B.c),scale(mi(A.c,B.s),2)),
  d2:ai(si(I(Q(2)),mi(A.c,B.c)),scale(mi(A.s,B.s),2)),
  j:ai(scale(mi(A.c,B.s),1,2),mi(A.s,B.c)),
  ln:ai(mi(rho,A.s),A.c), ld2:si(ai(I(Q(2)),mi(rho,A.c)),A.s),
  zn:sinI(si(a0,I(a))), zd2:ai(I(Q(2)),scale(cosI(si(a0,I(a))),2))};
}
function ratioCubePass(n,d2,l,h){
 return [lt(mul(pow(l,2),pow(d2[1],3)),pow(n[0],2)),
         lt(pow(n[1],2),mul(pow(h,2),pow(d2[0],3)))];
}
if(process.argv[2]==='controls'){
 assert.deepEqual(add(Q(1,2),Q(1,3)),Q(5,6));
 assert.deepEqual(mul(Q(-2,3),Q(9,4)),Q(-3,2));
 assert.deepEqual(sinI(I(Q(0))),I(Q(0)));assert.deepEqual(cosI(I(Q(0))),I(Q(1)));
 // Known exact ratio 3/(4^(3/2))=3/8 lies strictly between 1/3 and 2/5.
 assert.deepEqual(ratioCubePass(I(Q(3)),I(Q(4)),Q(1,3),Q(2,5)),[true,true]);
 assert.deepEqual(ratioCubePass(I(Q(3)),I(Q(4)),Q(2,5),Q(1,2)),[false,true]);
 console.log(JSON.stringify({mode:'controls',pass:true,cases:6}));
} else if(process.argv[2]==='target'){
 const rows=[['0.10','0.15','0.234','0.253','0.725','0.820','0.978','1.086','0.047','0.057'],
 ['0.15','0.20','0.250','0.269','0.700','0.790','0.976','1.093','0.040','0.049'],
 ['0.20','0.25','0.265','0.286','0.680','0.763','0.975','1.100','0.034','0.043'],
 ['0.25','0.30','0.282','0.303','0.657','0.733','0.973','1.106','0.027','0.036'],
 ['0.30',null,'0.299','0.315','0.646','0.698','0.972','1.109','0.023','0.030']];
 const results=rows.map((r,index)=>{
  const [al,ah,ll,lh,ol,oh,dl,dh,zl,zh]=r.map((v,i)=>v===null?Q(1,3):dec(v));
  const lo=expressions(al,I(bRange[0])),hi=expressions(ah,I(bRange[1]));
  const Llo=ratioCubePass(lo.ln,lo.ld2,ll,Q(100))[0], Lhi=ratioCubePass(hi.ln,hi.ld2,Q(0),lh)[1];
  const O=ratioCubePass([lo.num[0],hi.num[1]],[lo.d2[0],hi.d2[1]],ol,oh);
  const jmax=hi.j[1],dmin=lo.d2[0];
  const Dlo=lt(pow(jmax,2),mul(pow(mul(Q(16),sub(Q(1),dl)),2),dmin));
  const Dhi=lt(pow(jmax,2),mul(pow(mul(Q(4),sub(dh,Q(1))),2),dmin));
  const Zlo=ratioCubePass(hi.zn,hi.zd2,zl,Q(100))[0], Zhi=ratioCubePass(lo.zn,lo.zd2,Q(0),zh)[1];
  const totalLo=lt(Q(9,10),add(add(ll,div(ol,dh)),zl));
  const totalHi=lt(add(add(lh,div(oh,dl)),zh),Q(7,6));
  return {row:index+1, L:[Llo,Lhi],O,D:[Dlo,Dhi],Z:[Zlo,Zhi],acceleration:[totalLo,totalHi]};
 });
 const oldD2=a=>{const A=trigPoint(a);return ai(si(I(Q(2)),mi(rho,A.c)),A.s);};
 const eventUpper=lt(oldD2(Q(1,5))[1],Q(49,36));
 const eventLower=lt(Q(81,64),oldD2(Q(4,25))[0]);
 const lowerLatitude=u=>sub(sub(a0[0],div(u,Q(4))),mul(Q(7,12),pow(u,2)));
 const upperLatitude=u=>sub(sub(a0[1],div(u,Q(4))),mul(Q(9,20),pow(u,2)));
 const events={eventUpper,eventLower,
  horizonLatitude:lt(Q(1,10),lowerLatitude(Q(73,114))),
  earlyLatitude:lt(Q(4,25),lowerLatitude(Q(91,152))),
  lateLatitude:lt(upperLatitude(Q(139,222)),Q(1,5))};
 const flat=results.flatMap(r=>[...r.L,...r.O,...r.D,...r.Z,...r.acceleration]).concat(Object.values(events));
 console.log(JSON.stringify({mode:'target',arithmetic:'exact BigInt rational; alternating polynomial enclosures; squared positive ratios',rows:results,events,pass:flat.every(Boolean)}));
 if(!flat.every(Boolean))process.exitCode=1;
} else throw new Error('select controls or target');
