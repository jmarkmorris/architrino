// Independent review: Newton scalar equations and direct radius/moment identities.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const prefix='reference/priorities/master-equation-closure/noether-sea-research/evidence/';
const near=(a,b,t=2e-12)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);
function newton(f,df,x){for(let i=0;i<30;i++){const y=x-f(x)/df(x);if(Math.abs(y-x)<2e-15){assert.ok(Math.abs(f(y))<1e-13);return y;}x=y;}throw Error('Newton did not converge');}
function moments(a){let m=0,q=0;for(const x of a){m+=x/a.length;q+=x*x/a.length;}return {min:Math.min(...a),max:Math.max(...a),mean:m,rms:Math.sqrt(q)};}
function affineMoments(a,s,b){const p=moments(a);return {min:s*p.min+b,max:s*p.max+b,mean:s*p.mean+b,rms:Math.sqrt(s*s*p.rms*p.rms+2*s*b*p.mean+b*b)};}
function self(b){const x=newton(x=>x-b*Math.sin(x),x=>1-b*Math.cos(x),b);const d=4*Math.sin(x)**2*(1-b*Math.cos(x));return {x,A:[Math.sin(x)/d,Math.cos(x)/d,0]};}
near(newton(x=>3*x-6,()=>3,0),2);
near(self(Math.PI/2).A[0],.25);near(self(Math.PI/2).A[1],0);
const b0=Math.PI/(3*Math.sqrt(3));near(newton(x=>x-b0*Math.cos(x),x=>1+b0*Math.sin(x),.5),Math.PI/6);
near(moments([-3,3]).rms,3);near(affineMoments([-1,1],2,3).rms,Math.sqrt(13));
console.log(JSON.stringify({kind:'controls',status:'passed',reference:'linear Newton, circular self endpoint, antipodal pi/6, affine second moment'}));
if(process.argv[2]!=='target')process.exit(0);
const b=1.5,x=self(b).x,a=newton(x=>x-b*Math.cos(x),x=>1+b*Math.sin(x),.9);
const p=newton(u=>u*u-2-2*Math.sin(b*u),u=>2*u-2*b*Math.cos(b*u),1.8);
const m=newton(u=>u*u-2+2*Math.sin(b*u),u=>2*u+2*b*Math.cos(b*u),.6);
const da=4*Math.cos(a)**2*(1+b*Math.sin(a)),dp=p**3*(1-b*Math.cos(b*p)/p),dm=m**3*(1+b*Math.cos(b*m)/m);
const parts=[self(b).A,[-Math.cos(a)/da,Math.sin(a)/da,0],[0,-Math.cos(b*Math.SQRT2)/Math.SQRT2,Math.sin(b*Math.SQRT2)/Math.SQRT2],[(1+Math.sin(b*p))/dp,0,-Math.cos(b*p)/dp],[-(1-Math.sin(b*m))/dm,0,-Math.cos(b*m)/dm]];
const A=[0,1,2].map(k=>parts.reduce((s,v)=>s+v[k],0));
const own={lambda:-b*b-A[0],mu:-A[1],side:-A[2],residual:Math.hypot(A[1],A[2])};
const map=JSON.parse(readFileSync(prefix+'spherical-three-three-dynamics-radius-map.json'));
for(const input of map.inputs)assert.equal(createHash('sha256').update(readFileSync(input.path)).digest('hex'),input.sha256);
const sub=JSON.parse(readFileSync(map.inputs[0].path));
const event=readFileSync(map.inputs[1].path,'utf8').trim().split('\n').map(JSON.parse).find(x=>x.beta===b);
let eventError=Math.max(...A.map((v,k)=>Math.abs(v-event.A[k])));for(const k of Object.keys(own)){near(own[k],event[k]);eventError=Math.max(eventError,Math.abs(own[k]-event[k]));}
let mapError=0,checks=0;
for(const c of map.cells){if(c.beta===3){assert.equal(c.normal,undefined);continue;}
 const source=c.beta===b?[own]:sub.cases.find(s=>s.summary.beta===c.beta).rows;
 if(c.beta!==b){assert.equal(source.length,768*6);assert.equal(new Set(source.map(r=>r.theta)).size,768);for(let i=0;i<6;i++)assert.equal(source.filter(r=>r.i===i).length,768);}
 const R=c.R;
 // Recover radial interaction from unit support, then transform moments directly.
 const ns=source.map(r=>-c.beta*c.beta-r.lambda);
 const neg=ns.map(x=>-x);const normal=affineMoments(neg,1/(R*R),-c.beta*c.beta/R);
 const expected={normal,along:affineMoments(source.map(r=>r.mu),1/(R*R),0),sideways:affineMoments(source.map(r=>r.side),1/(R*R),0),fullResidual:affineMoments(source.map(r=>r.residualNorm??r.residual),1/(R*R),0)};
 for(const [key,stats] of Object.entries(expected))for(const [stat,v]of Object.entries(stats)){near(v,c[key][stat],2e-10);mapError=Math.max(mapError,Math.abs(v-c[key][stat]));checks++;if(key!=='fullResidual'){near(R*v,c.dimensionless[key][stat],2e-10);checks++;}}
}
console.log(JSON.stringify({kind:'target',cf:1,roots:{x,a,p,m},parts,A,support:own,eventMaxAbsError:eventError,mapMaxAbsError:mapError,statisticChecks:checks,inputs:map.inputs,scope:'independent event scalar/vector evaluation and moment-transform audit; retained sub-wake root samples not regenerated'}));
