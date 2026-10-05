// Exact rational interval comparison instrument. BigInt bounds; no floating endpoint arithmetic.
import assert from 'node:assert/strict';
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b){[a,b]=[b,a%b];}return a;};
export class Q{
 constructor(n,d=1n){n=BigInt(n);d=BigInt(d);assert(d!==0n);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);this.n=n/g;this.d=d/g;}
 static of(x){if(x instanceof Q)return x;if(typeof x==='bigint')return new Q(x);if(typeof x==='number'){assert(Number.isFinite(x));if(x===0)return new Q(0n);const z=new DataView(new ArrayBuffer(8));z.setFloat64(0,x);const bits=z.getBigUint64(0),sgn=bits>>63n?-1n:1n,ex=Number((bits>>52n)&2047n),fr=bits&((1n<<52n)-1n);let n=ex?fr+(1n<<52n):fr,e=(ex||1)-1023-52;return e>=0?new Q(sgn*(n<<BigInt(e))):new Q(sgn*n,1n<<BigInt(-e));}const s=String(x);if(s.includes('/')){const [n,d]=s.split('/');return new Q(n,d);}const [a,b='']=s.split('.');return new Q(BigInt(a+b),10n**BigInt(b.length));}
 add(x){x=Q.of(x);return new Q(this.n*x.d+x.n*this.d,this.d*x.d);} sub(x){return this.add(Q.of(x).neg());} neg(){return new Q(-this.n,this.d);} mul(x){x=Q.of(x);return new Q(this.n*x.n,this.d*x.d);} div(x){x=Q.of(x);return new Q(this.n*x.d,this.d*x.n);} cmp(x){x=Q.of(x);const n=this.n*x.d-x.n*this.d;return n<0n?-1:n>0n?1:0;} abs(){return this.n<0n?this.neg():this;} num(){const nn=Number(this.n),dd=Number(this.d);if(Number.isFinite(nn)&&Number.isFinite(dd))return nn/dd;const neg=this.n<0n,n=(neg?-this.n:this.n).toString(),d=this.d.toString();return (neg?-1:1)*Number(n.slice(0,16))/Number(d.slice(0,16))*10**(n.length-d.length);} toString(){return `${this.n}/${this.d}`;}}
const min=(a,b)=>a.cmp(b)<0?a:b,max=(a,b)=>a.cmp(b)>0?a:b;
export class I{
 constructor(lo,hi=lo){this.lo=Q.of(lo);this.hi=Q.of(hi);assert(this.lo.cmp(this.hi)<=0);}
 static of(x){return x instanceof I?x:new I(x);} add(x){x=I.of(x);return new I(this.lo.add(x.lo),this.hi.add(x.hi));} neg(){return new I(this.hi.neg(),this.lo.neg());} sub(x){return this.add(I.of(x).neg());} mul(x){x=I.of(x);const a=[this.lo.mul(x.lo),this.lo.mul(x.hi),this.hi.mul(x.lo),this.hi.mul(x.hi)];return new I(a.reduce(min),a.reduce(max));} div(x){x=I.of(x);assert(x.lo.cmp(0)>0||x.hi.cmp(0)<0,'interval division across zero');return this.mul(new I(new Q(1n).div(x.hi),new Q(1n).div(x.lo)));} sq(){if(this.lo.cmp(0)>=0)return new I(this.lo.mul(this.lo),this.hi.mul(this.hi));if(this.hi.cmp(0)<=0)return new I(this.hi.mul(this.hi),this.lo.mul(this.lo));return new I(0,max(this.lo.mul(this.lo),this.hi.mul(this.hi)));} absUpper(){return max(this.lo.abs(),this.hi.abs());} out(){return {lo:this.lo.num(),hi:this.hi.num()};}}
function isqrt(n){assert(n>=0n);if(n<2n)return n;let x=1n<<BigInt(Math.ceil(n.toString(2).length/2));for(;;){const y=(x+n/x)/2n;if(y>=x)return x;x=y;}}
export function sqrt(x){x=I.of(x);assert(x.lo.cmp(0)>=0);const scale=10n**30n;const lower=isqrt(x.lo.n*scale*scale/x.lo.d),upper=isqrt(x.hi.n*scale*scale/x.hi.d)+1n;return new I(new Q(lower,scale),new Q(upper,scale));}
export const vadd=(a,b)=>a.map((x,k)=>I.of(x).add(b[k]));
export const vsub=(a,b)=>a.map((x,k)=>I.of(x).sub(b[k]));
export const vmul=(a,b)=>a.map(x=>I.of(x).mul(b));
export const dot=(a,b)=>a.reduce((s,x,k)=>s.add(I.of(x).mul(b[k])),new I(0));
export const length=a=>sqrt(a.reduce((s,x)=>s.add(I.of(x).sq()),new I(0)));
const choose=(n,k)=>{let z=1n;for(let j=1;j<=k;j++)z=z*BigInt(n+1-j)/BigInt(j);return new Q(z);};
export function hermite(left,right){const t0=Q.of(left.t),h=Q.of(right.t).sub(t0);assert(h.cmp(0)>0);const coeff=left.x.map((_,k)=>{const c0=Q.of(left.x[k]),c1=h.mul(left.v[k]),c2=h.mul(h).mul(left.a[k]).div(2),d=Q.of(right.x[k]).sub(c0).sub(c1).sub(c2),e=h.mul(right.v[k]).sub(c1).sub(c2.mul(2)),f=h.mul(h).mul(right.a[k]).sub(c2.mul(2));return [c0,c1,c2,d.mul(10).sub(e.mul(4)).add(f.div(2)),d.mul(-15).add(e.mul(7)).sub(f),d.mul(6).sub(e.mul(3)).add(f.div(2))];});return {t0,h,coeff};}
export function derivative(c,n,h){let a=c.slice();for(let j=0;j<n;j++)a=a.slice(1).map((x,k)=>x.mul(k+1).div(h));return a;}
export function poly(c,t){t=I.of(t);return c.reduceRight((s,x)=>s.mul(t).add(x),new I(0));}
export function bernstein(c){const n=c.length-1;return c.map((_,j)=>c.slice(0,j+1).reduce((s,x,k)=>s.add(x.mul(choose(j,k)).div(choose(n,k))),new Q(0n)));}
export function restricted(c,a,b){a=Q.of(a);b=Q.of(b);const w=b.sub(a),n=c.length-1;return Array.from({length:n+1},(_,j)=>c.slice(j).reduce((s,x,z)=>s.add(x.mul(choose(z+j,j)).mul(aPower(a,z))),new Q(0n)).mul(aPower(w,j)));}
const aPower=(a,n)=>{let z=new Q(1n);for(let j=0;j<n;j++)z=z.mul(a);return z;};
export function jetBox(s,lo,hi,n){const a=Q.of(lo).sub(s.t0).div(s.h),b=Q.of(hi).sub(s.t0).div(s.h);return s.coeff.map(c=>{const z=bernstein(restricted(derivative(c,n,s.h),a,b));return new I(z.reduce(min),z.reduce(max));});}
export function controlsKnown(){
 const z=sqrt(new I(2));assert(z.lo.mul(z.lo).cmp(2)<=0&&z.hi.mul(z.hi).cmp(2)>=0);
 assert(Q.of(.1).add(Q.of(.2)).cmp(Q.of(.3))!==0,'binary literals exact');
 const exact=t=>({t,x:[t*t/2,0],v:[t,0],a:[1,0]});const s=hermite(exact(1),exact(2));assert(jetBox(s,1,2,1)[0].lo.cmp(1)===0&&jetBox(s,1,2,1)[0].hi.cmp(2)===0);assert(jetBox(s,1,2,2)[0].lo.cmp(1)===0&&jetBox(s,1,2,2)[0].hi.cmp(1)===0);
 return {passed:true,knownCases:['exact binary literal distinction','sqrt2 rational enclosure','Hermite quadratic velocity and acceleration Bernstein ranges'],sqrt2:z.out()};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(controlsKnown()));
