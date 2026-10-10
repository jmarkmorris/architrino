// Separately authored exact polynomial identities; x is c (or z), y is beta.
import assert from 'node:assert/strict';
const poly=terms=>new Map(terms.map(([i,j,v])=>[`${i},${j}`,BigInt(v)]));
const one=poly([[0,0,1]]),x=poly([[1,0,1]]),y=poly([[0,1,1]]);
function add(...ps){const r=new Map();for(const p of ps)for(const [k,v]of p)r.set(k,(r.get(k)??0n)+v);for(const [k,v]of r)if(v===0n)r.delete(k);return r;}
const scale=(p,n)=>new Map([...p].map(([k,v])=>[k,v*BigInt(n)]).filter(([,v])=>v!==0n));
function mul(a,b){let r=new Map();for(const [ka,va]of a)for(const [kb,vb]of b){const ea=ka.split(',').map(Number),eb=kb.split(',').map(Number),k=`${ea[0]+eb[0]},${ea[1]+eb[1]}`;r=add(r,new Map([[k,va*vb]]));}return r;}
const pow=(p,n)=>{let r=one;while(n-->0)r=mul(r,p);return r;};
const dx=p=>new Map([...p].filter(([k])=>+k.split(',')[0]>0).map(([k,v])=>{const [i,j]=k.split(',').map(Number);return[`${i-1},${j}`,BigInt(i)*v];}));
const eq=(a,b)=>assert.equal(add(a,scale(b,-1)).size,0);
const flip=p=>new Map([...p].map(([k,v])=>[k,+k.split(',')[0]%2?-v:v]));
const show=p=>[...p].sort(([a],[b])=>a.localeCompare(b)).map(([powers,coefficient])=>({powers,coefficient:String(coefficient)}));
eq(pow(add(x,y),2),poly([[2,0,1],[1,1,2],[0,2,1]]));
eq(dx(pow(x,3)),scale(pow(x,2),3));
eq(flip(add(one,x)),add(one,scale(x,-1)));
console.log(JSON.stringify({kind:'controls',status:'passed',known:['(x+y)^2','derivative x^3','sign substitution']}));
if(process.argv[2]!=='target')process.exit(0);
const S=add(one,scale(pow(x,2),-1)),D=add(one,mul(y,x)),N=add(one,mul(y,pow(x,3)));
// Derive numerator from quotient rule; no symbolic subject expression imported.
const P=add(mul(mul(dx(N),S),D),scale(mul(N,add(mul(dx(S),D),scale(mul(S,y),3))),-1));
const E=add(mul(mul(dx(P),S),D),scale(mul(mul(x,P),D),3),scale(mul(mul(y,P),S),-5));
const claimedP=poly([[1,0,2],[2,1,8],[0,1,-3],[4,1,-1],[5,2,2]]);
const claimedE=poly([[0,0,2],[2,0,4],[1,1,-1],[3,1,18],[5,1,1],[0,2,15],[2,2,-48],[4,2,59],[6,2,-8],[7,3,6]]);
eq(P,claimedP);eq(E,claimedE);
const A=add(scale(x,7),pow(x,3)),B=add(scale(one,15),scale(pow(x,2),-39),scale(pow(x,4),8)),C=add(scale(pow(x,3),2),scale(pow(x,5),6));
const negativeDecomposition=add(mul(add(scale(one,2),scale(pow(x,2),4)),pow(add(one,scale(mul(y,x),-1)),3)),mul(mul(y,S),add(A,mul(B,y),mul(C,pow(y,2)))));
eq(flip(E),negativeDecomposition);
const discriminant=add(scale(mul(A,C),4),scale(pow(B,2),-1));
eq(discriminant,mul(pow(S,2),add(scale(pow(x,4),-40),scale(pow(x,2),720),scale(one,-225))));
console.log(JSON.stringify({kind:'target',status:'passed',P:show(P),E:show(E),negativeDomainIdentity:true,discriminantIdentity:true,scope:'exact integer polynomial identities only; analytical positivity and causal roots are proved separately'}));
