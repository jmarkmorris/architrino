// Separately authored comparison reference. No production solver.
// Frozen formulas: weber-delayed-ring-independent-reference.md.
import assert from 'node:assert/strict';
const TAU=2*Math.PI;
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const scale=(a,b)=>a.map(v=>v*b);
const mm=(a,b)=>[[a[0][0]*b[0][0]+a[0][1]*b[1][0],a[0][0]*b[0][1]+a[0][1]*b[1][1]],[a[1][0]*b[0][0]+a[1][1]*b[1][0],a[1][0]*b[0][1]+a[1][1]*b[1][1]]];
const ma=(a,b)=>a.map((row,i)=>row.map((v,j)=>v+b[i][j]));
const ms=(a,b)=>a.map(row=>row.map(v=>v*b));
const outer=(a,b)=>a.map(v=>b.map(w=>v*w));
const rowM=(a,b)=>[a[0]*b[0][0]+a[1]*b[1][0],a[0]*b[0][1]+a[1]*b[1][1]];
const I=[[1,0],[0,1]],J=[[0,-1],[1,0]];
const det=a=>a[0][0]*a[1][1]-a[0][1]*a[1][0];
function bisect(f,a,b){let fa=f(a);assert(fa*f(b)<=0);for(let n=0;n<85;n++){let m=(a+b)/2,fm=f(m);if(m===a||m===b)return m;if(fa*fm<=0)b=m;else{a=m;fa=fm;}}return(a+b)/2;}
function roots(beta,j){
 const phi=j*Math.PI/2,max=2*beta,f=d=>d-2*beta*Math.abs(Math.sin((phi-d)/2));
 const cuts=[0,max];
 const span=Math.ceil(max/TAU)+4;
 for(let m=-span;m<=span;m++){
  let d=phi-2*m*Math.PI;if(d>0&&d<max)cuts.push(d);
  if(beta>1){for(let s of [-1,1]){const theta0=Math.acos(-1/(beta*s));for(let theta of [theta0+TAU*m,-theta0+TAU*m]){
   d=phi-2*theta;if(d>0&&d<max&&Math.sign(Math.sin(theta))===s)cuts.push(d);
  }}}
 }
 cuts.sort((a,b)=>a-b);const cs=cuts.filter((x,i)=>i===0||Math.abs(x-cuts[i-1])>2e-14),rr=[];
 for(let i=0;i<cs.length-1;i++){
  let a=cs[i],b=cs[i+1],fa=f(a),fb=f(b);
  if(a>1e-12&&Math.abs(fa)<1e-12)rr.push(a);
  if(fa*fb<0)rr.push(bisect(f,a,b));
 }
 if(Math.abs(f(max))<1e-12&&max>0)rr.push(max);
 return rr.sort((a,b)=>a-b).filter((d,i,a)=>i===0||Math.abs(d-a[i-1])>1e-10).map(d=>{
  let alpha=phi-d,u=d/beta,n=[(1-Math.cos(alpha))/u,-Math.sin(alpha)/u],D=1+beta*Math.sin(alpha)/u;
  if(Math.abs(D)<1e-9)throw Error(`nonordinary root beta=${beta} j=${j} d=${d}`);
  return{j,phi,d,alpha,u,n,D,sigma:j%2?-1:1,arrivalResidual:f(d)};
 });
}
function circle(beta){let ledger=[0,1,2,3].flatMap(j=>roots(beta,j)),Cr=0,Ct=0;for(let r of ledger){Cr+=r.sigma/(2*r.u*Math.abs(r.D));Ct+=-r.sigma*Math.sin(r.alpha)/(r.u**3*Math.abs(r.D));}return{beta,Cr,Ct,rho:-Cr/beta**2,counts:[0,1,2,3].map(j=>ledger.filter(r=>r.j===j).length),ledger};}
function characteristic(c,z,k=2){
 let rho=c.rho,omega=c.beta/rho,H=ma(ms(I,z*z-omega*omega),ms(J,2*omega*z));
 for(let r of c.ledger){
  let R=rho*r.u,tau=R,cs=Math.cos(r.alpha),sn=Math.sin(r.alpha),Q=[[cs,-sn],[sn,cs]],E=(k===2?(r.j%2?-1:1):1)*Math.exp(-z*tau);
  let W=ma(I,ms(Q,-E)),v=[-c.beta*sn,c.beta*cs],a=[-omega*omega*rho*cs,-omega*omega*rho*sn];
  let L=scale(rowM(r.n,W),1/r.D),P=ma(I,ms(outer(r.n,r.n),-1));
  let N=ms(mm(P,ma(W,outer(v,L))),1/R);
  let V=ma(ms(mm(Q,ma(ms(I,z),ms(J,omega))),E),ms(outer(a,L),-1));
  let deltaD=scale(add(rowM(v,N),rowM(r.n,V)),-1);
  let B=ma(ma(N,ms(outer(r.n,L),-2/R+R*z*z)),ms(outer(r.n,deltaD),-1/r.D));
  H=ma(H,ms(B,-r.sigma/(R*R*Math.abs(r.D))));
 }
 return H;
}
function accelerationMatrix(c){let M=I.map(row=>row.slice());for(let r of c.ledger)M=ma(M,ms(outer(r.n,r.n),-r.sigma/(c.rho*r.u*Math.abs(r.D)*r.D)));return M;}
function known(){
 assert.deepEqual(roots(.5,0),[]);assert.deepEqual([1,2,3].map(j=>roots(.5,j).length),[1,1,1]);
 const d=2,v=.3,range=T=>(-v*v*(T+d)+Math.sqrt(v*v*(T+d)**2+(1-v*v)*d*d))/(1-v*v),eps=1e-4;
 const first=(range(eps)-range(-eps))/(2*eps),second=(range(eps)-2*range(0)+range(-eps))/(eps*eps);
 assert(Math.abs(range(0)-d)<1e-14);assert(Math.abs(first)<1e-8);assert(Math.abs(second-v*v/d)<1e-7);
 assert.equal(1+v*v,1.09);
 console.log(JSON.stringify({phase:'known',status:'PASS',controls:{stationary:{range:2,p:1,Rprime:0,Rsecond:0,bracket:1},affineTransverse:{d,v,closedRprime:0,finiteDifferenceFirst:first,closedRsecond:v*v/d,finiteDifferenceSecond:second,bracket:1+v*v},subfieldRootCensus:{beta:.5,counts:[0,1,1,1],basis:'strict monotonic arrival, no positive self root'}}},null,2));
}
function target(){
 const brackets=[];let previous=null;
 for(let beta=1.001;beta<8;beta+=.002){const c=circle(beta);if(previous&&c.Ct*previous.Ct<0&&JSON.stringify(c.counts)===JSON.stringify(previous.counts))brackets.push([previous.beta,beta]);previous=c;}
 const balances=brackets.map(b=>{const beta=bisect(x=>circle(x).Ct,...b),c=circle(beta);const omega=beta/c.rho,M=accelerationMatrix(c),vals=[];let last=null;const growing=[];
  if(c.rho>0){for(let s=0;s<=40;s+=.01){let z=s/c.rho,value=det(characteristic(c,z));if(last&&value*last.value<0)growing.push(bisect(x=>det(characteristic(c,x)),last.z,z));last={z,value};if([0,1,2,4,8,16,32,40].some(x=>Math.abs(x-s)<1e-8))vals.push({s,z,det:value});}}
  return{...c,omega,accelerationMatrix:M,accelerationMatrixDeterminant:det(M),pairingPositiveRealRoots:growing,pairingSamples:vals,bracket:b};});
 console.log(JSON.stringify({phase:'target',status:'measured reference only; no interval certification',balances},null,2));
}
if(process.argv[2]==='--known')known();else if(process.argv[2]==='--target')target();else throw Error('use --known or --target');
