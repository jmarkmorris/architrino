// Independent rational quadratic certificate; conservative recorded densities
// may exceed the proved minimum. Original v1 remains immutable.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){const t=a%b;a=b;b=t;}return a;};
class R {
 constructor(n,d=1n){n=BigInt(n);d=BigInt(d);assert(d!==0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);this.n=n/g;this.d=d/g;}
 static of(x){if(x instanceof R)return x;const s=String(x).replace(/^([+-]?)\./,'$10.');if(s.includes('/')){const [a,b]=s.split('/');return new R(a,b);}const m=s.match(/^([+-]?)(\d+)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/);assert(m,'rational token '+s);const digits=m[2]+(m[3]||''),power=Number(m[4]||0)-(m[3]||'').length,n=BigInt((m[1]==='-'?'-':'')+digits);return power>=0?new R(n*10n**BigInt(power)):new R(n,10n**BigInt(-power));}
 add(v){v=R.of(v);return new R(this.n*v.d+v.n*this.d,this.d*v.d);} sub(v){v=R.of(v);return new R(this.n*v.d-v.n*this.d,this.d*v.d);} mul(v){v=R.of(v);return new R(this.n*v.n,this.d*v.d);} div(v){v=R.of(v);return new R(this.n*v.d,this.d*v.n);} neg(){return new R(-this.n,this.d);} abs(){return this.n<0n?this.neg():this;} cmp(v){v=R.of(v);const z=this.n*v.d-v.n*this.d;return z<0n?-1:z>0n?1:0;} sq(){return this.mul(this);} toString(){return this.d===1n?String(this.n):`${this.n}/${this.d}`;}
}
const q=R.of,min=(a,b)=>q(a).cmp(b)<=0?q(a):q(b),max=(a,b)=>q(a).cmp(b)>=0?q(a):q(b);
const eq=(a,b,label)=>assert(q(a).cmp(b)===0,label);
const conservative=(recorded,proved,old)=>q(recorded).cmp(proved)>=0&&q(recorded).cmp(old)<=0;
const iv=x=>x&&typeof x==='object'&&'lo'in x?[q(x.lo),q(x.hi)]:[q(x),q(x)];
const division=(a,b)=>{assert(b[0].cmp(0)>0);const p=a.flatMap(x=>b.map(y=>x.div(y)));return [p.reduce(min),p.reduce(max)];};
function quadraticCertificate(i,lambda){
 const W=q(i.W),nu=q(i.nu),radius=q(i.R),m=q(i.m),F=q(i.F),l=q(lambda),k=iv(i.k);
 assert(W.cmp(0)>=0&&radius.cmp(0)>=0&&F.cmp(0)>=0&&l.cmp(0)>=0&&nu.cmp(0)>0&&m.cmp(radius)>0);
 const B=max(k[0].abs(),k[1].abs()),a=min(radius,W.div(nu)),b=B.add(l),C=l.mul(m).sub(F),A=nu.sq().add(b.sq());
 // H(b)<=C iff C-bs stays nonnegative and its square dominates
 // W^2-nu^2 s^2 for every 0<=s<=a. The quadratic minimum is exact.
 const endpoint=C.sub(b.mul(a));
 const vertex=min(a,max(0,C.mul(b).div(A)));
 const minimum=A.mul(vertex.sq()).sub(C.mul(b).mul(vertex).mul(2)).add(C.sq()).sub(W.sq());
 return {passed:endpoint.cmp(0)>=0&&minimum.cmp(0)>=0,endpoint,vertex,minimum};
}
function integrate(rows,left,right,past){
 left=q(left);right=q(right);assert(left.cmp(right)<=0&&right.cmp(rows.at(-1).t)<=0);
 let sum=q(0),cursor=left;
 if(cursor.cmp(0)<0){const stop=min(0,right);sum=sum.add(stop.sub(cursor).mul(past));cursor=stop;}
 let start=q(0);for(const row of rows){const end=q(row.t),lo=max(cursor,start),hi=min(end,right);if(hi.cmp(lo)>0){sum=sum.add(hi.sub(lo).mul(row.omega));cursor=hi;}start=end;if(cursor.cmp(right)>=0)break;}
 assert(cursor.cmp(right)===0);return sum;
}
function known(){
 assert(conservative('334/1000','1/3',1));assert(!conservative('333/1000','1/3',1));assert(conservative(1,1,1));
 eq(q('-.25').add('1/2'),'1/4','decimal fraction');eq(q('1e-3').mul(1000),1,'exponent');
 const i={W:'3/5',nu:1,R:'3/5',m:1,k:0,F:0};assert(quadraticCertificate(i,'3/4').passed);assert(!quadraticCertificate(i,'74/100').passed);eq(quadraticCertificate(i,'3/4').vertex,'9/25','independent exact extremizer');
 assert(quadraticCertificate({W:1,nu:1,R:'3/5',m:2,k:1,F:0},1).passed);eq(quadraticCertificate({W:1,nu:1,R:'3/5',m:2,k:1,F:0},1).minimum,0,'clipped equality');
 assert(quadraticCertificate({W:0,nu:1,R:0,m:1,k:4,F:0},0).passed);assert.throws(()=>quadraticCertificate({...i,m:'3/5'},1));
 const rows=[{t:1,omega:'1/10'},{t:2,omega:'1/5'},{t:3,omega:'1/20'}];
 eq(integrate(rows,'1/2','3/2','2/5'),'3/20','two partial cells');eq(integrate(rows,'1/5','7/10','2/5'),'1/20','same cell');eq(integrate(rows,1,1,'2/5'),0,'closed seam');eq(integrate(rows,'-1/2',2,'2/5').add(q('1/2').mul('3/10')),'13/20','negative past plus unchanged trial');
 return {passed:true,cases:['independent exact decimal/fraction arithmetic','3/4 fractional bound and 0.74 rejection','9/25 vertex','clipped slab equality','zero and bad radius','partial/same/seam/negative-history integration']};
}
const args=Object.fromEntries(process.argv.slice(2).filter((_,i)=>i%2===0).map((s,i)=>[s.replace(/^--/,''),process.argv[3+2*i]]));
const knownFirst=known();console.log(JSON.stringify({event:'known-first',...knownFirst}));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
if(!args.target){console.log(JSON.stringify({passed:true,knownFirst,sourceSHA:sha(new URL(import.meta.url))}));process.exit(0);}
assert(args.old&&args.out&&!fs.existsSync(args.out));
const target=JSON.parse(fs.readFileSync(args.target)),old=JSON.parse(fs.readFileSync(args.old));
assert(target.passed&&target.oldReceiptSHA===sha(args.old)&&target.oldRowsSHA===sha(args.old+'.jsonl')&&target.rowsSHA===sha(args.target+'.jsonl'));
const source=fs.readFileSync(args.old+'.jsonl','utf8').trim().split('\n').map(JSON.parse),replay=fs.readFileSync(args.target+'.jsonl','utf8').trim().split('\n').map(JSON.parse);
assert(source.length===replay.length&&source.length===old.bins);
const deadline=Date.parse(args.deadline);assert(Number.isFinite(deadline)&&deadline>Date.now());
let previous=q(0),oldPrefix=q(0),newPrefix=q(0),joint=0,improved=0,last=Date.now();
for(let j=0;j<source.length;j++){
 assert(Date.now()<deadline,'independent audit deadline');const s=source[j],r=replay[j],t=q(s.t);assert(t.cmp(previous)>0);eq(r.left,previous,'left');eq(r.right,t,'right');eq(r.index,j+1,'index');eq(r.oldOmega,s.omega,'old density');
 const eligible=s.W!==undefined&&s.nu!==undefined&&s.signedCurrent?.Qcol?.[1]!==undefined&&s.signedCurrent?.nomV?.[1]!==undefined&&s.projectedSource?.q?.components?.[1]!==undefined&&s.receiverGeometry?.rComparison!==undefined&&s.receiverGeometry?.rComparisonMax!==undefined;
 if(eligible){
  joint++;assert(q(s.W).cmp(s.flow.W)>=0);const i=r.input;
  for(const [key,val] of Object.entries({W:s.W,nu:s.nu,R:s.r,m:s.receiverGeometry.rComparison,F:s.projectedSource.q.components[1]}))eq(i[key],val,'source input '+key);
  const rc=[q(s.receiverGeometry.rComparison),q(s.receiverGeometry.rComparisonMax)],v=division(iv(s.signedCurrent.nomV[1]),rc),col=iv(s.signedCurrent.Qcol[1]),actualK=[col[0].add(v[0]),col[1].add(v[1])],ki=iv(i.k);
  assert(ki[0].cmp(actualK[0])<=0&&ki[1].cmp(actualK[1])>=0,'whole k enclosure');
  assert(quadraticCertificate(i,r.certificate.lambda).passed,'independent quadratic support');assert(conservative(r.omega,min(s.omega,r.certificate.lambda),s.omega),'conservative density');
 }else eq(r.omega,s.omega,'fallback');
 assert(q(r.omega).cmp(0)>=0&&q(r.omega).cmp(s.omega)<=0);if(q(r.omega).cmp(s.omega)<0)improved++;
 const dt=t.sub(previous);oldPrefix=oldPrefix.add(dt.mul(s.omega));newPrefix=newPrefix.add(dt.mul(r.omega));eq(s.angularPrefix,oldPrefix,'source primitive');eq(r.oldAngularPrefix,oldPrefix,'old replay primitive');eq(r.angularPrefix,newPrefix,'new primitive');previous=t;
 if(Date.now()-last>10000){last=Date.now();console.log(JSON.stringify({event:'heartbeat',processed:j+1,joint,improved}));}
}
eq(target.final.t,previous,'final t');eq(target.final.oldAngularPrefix,oldPrefix,'final old');eq(target.final.angularPrefix,newPrefix,'final new');eq(target.final.reduction,oldPrefix.sub(newPrefix),'reduction');
const result={passed:true,knownFirst,subjectSHA:sha(args.target),subjectRowsSHA:sha(args.target+'.jsonl'),oldSHA:sha(args.old),oldRowsSHA:sha(args.old+'.jsonl'),sourceSHA:sha(new URL(import.meta.url)),rows:source.length,joint,improved,scope:'Independent rational quadratic certificate, source-input coverage, and all-cell primitive arithmetic; inherited W/coefficient admissions remain premises. No receiving recurrence or physical extension.',final:{t:String(previous),old:String(oldPrefix),new:String(newPrefix)}};
fs.writeFileSync(args.out,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({passed:true,rows:source.length,joint,improved}));
