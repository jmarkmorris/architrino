// Exact arithmetic for displayed analytical radial bounds, never trajectory evolution.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){const r=a%b;a=b;b=r;}return a;};
const Q=(n,d=1)=>{n=BigInt(n);d=BigInt(d);assert(d!==0n);if(d<0n){n=-n;d=-d;}const c=gcd(n,d);return [n/c,d/c];};
const A=(a,b)=>Q(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const M=(a,b)=>Q(a[0]*b[0],a[1]*b[1]);
const S=(a,b)=>A(a,Q(-b[0],b[1]));
const D=(a,b)=>Q(a[0]*b[1],a[1]*b[0]);
const gt=(a,b)=>S(a,b)[0]>0n;
function trig(h,odd,degree){let sum=Q(0),power=Q(1),factorial=1n;for(let j=0;j<=degree;j++){if(j){power=M(power,h);factorial*=BigInt(j);}if(j%2===odd){const term=D(power,Q(factorial));sum=((j-odd)/2)%2?S(sum,term):A(sum,term);}}return sum;}
const addI=(a,b)=>[A(a[0],b[0]),A(a[1],b[1])];
const subI=(a,b)=>[S(a[0],b[1]),S(a[1],b[0])];
const mulI=(a,b)=>{assert(a[0][0]>=0n&&b[0][0]>=0n);return [M(a[0],b[0]),M(a[1],b[1])];};
const scale=(a,q)=>mulI(a,[q,q]);
function geometry(q){const h=M(q,Q(1,2));const sn=[trig(h,1,7),trig(h,1,5)],cs=[trig(h,0,6),trig(h,0,4)],rho=[Q(173205,200000),Q(173206,200000)];return {
 leadS:subI(scale(cs,Q(1,2)),mulI(rho,sn)),leadC:addI(mulI(rho,cs),scale(sn,Q(1,2))),
 trailS:addI(scale(cs,Q(1,2)),mulI(rho,sn)),secondS:subI(mulI(rho,cs),scale(sn,Q(1,2))),
 fourthS:addI(mulI(rho,cs),scale(sn,Q(1,2))),middleS:cs};}
function terms(lo,hi){const l=geometry(lo),h=geometry(hi),inv4=a=>D(Q(1),M(Q(4),a));return {
 lead:inv4(M(h.leadS[0],A(Q(1),M(Q(1,4),h.leadC[0])))),
 trail:inv4(l.trailS[0]),middle:inv4(h.middleS[0]),second:inv4(l.secondS[1]),fourth:inv4(h.fourthS[1])};}
if(process.argv[2]==='controls'){
 assert.deepEqual(A(Q(1,2),Q(1,3)),Q(5,6));
 assert.deepEqual(D(Q(2,3),Q(4,5)),Q(5,6));
 assert.deepEqual([trig(Q(0),1,7),trig(Q(0),0,6)],[Q(0),Q(1)]);
 assert.equal(gt(Q(3,8),Q(1,3)),true);assert.equal(gt(Q(3,8),Q(2,5)),false);
 assert.throws(()=>Q(1,0));
 console.log(JSON.stringify({mode:'controls',pass:true,cases:6,scope:'arithmetic, zero trigonometric identity, true/false ordering, rejected zero denominator'}));
}else if(process.argv[2]==='target'){
 const a=terms(Q(3,16),Q(27,100)),b=terms(Q(27,100),Q(3,8));
 const tests={rho_lower:S(Q(3,4),M(Q(173205,200000),Q(173205,200000))),rho_upper:S(M(Q(173206,200000),Q(173206,200000)),Q(3,4)),
 A_lead:S(Q(537,1000),a.lead),A_trail:S(Q(433,1000),a.trail),A_middle:S(Q(253,1000),a.middle),A_second:S(a.second,Q(306,1000)),A_fourth:S(a.fourth,Q(270,1000)),
 B_lead:S(Q(614,1000),b.lead),B_trail:S(Q(410,1000),b.trail),B_middle:S(Q(255,1000),b.middle),B_second:S(b.second,Q(316,1000)),B_fourth:S(b.fourth,Q(264,1000)),
 tangent_positive:S(S(S(Q(9,16),Q(243,508)),Q(27,500)),Q(3,100))};
 const results=Object.entries(tests).map(([name,m])=>({name,pass:m[0]>0n,margin:`${m[0]}/${m[1]}`}));
 const pass=results.every(r=>r.pass);console.log(JSON.stringify({mode:'target',pass,arithmetic:'BigInt exact rationals; sine degrees 7/5 and cosine degrees 6/4',results}));if(!pass)process.exitCode=1;
}else throw new Error('controls or target required');
