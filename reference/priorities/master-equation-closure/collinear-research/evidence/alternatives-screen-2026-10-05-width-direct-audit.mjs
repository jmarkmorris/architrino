#!/usr/bin/env node
// Independent original-integral audit, not an evolution instrument.
// Visits every historical segment; no clock sectors, inverse roots or support pruning.
import fs from 'node:fs';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const args=Object.fromEntries(process.argv.slice(2).map(x=>{const [k,...v]=x.replace(/^--/,'').split('=');return[k,v.join('=')||true];}));
const hash=crypto.createHash('sha256').update(fs.readFileSync(new URL(import.meta.url))).digest('hex');
const start=performance.now(),cpu=process.cpuUsage();
const z1=Math.sqrt((3-2*Math.sqrt(6/5))/7),z2=Math.sqrt((3+2*Math.sqrt(6/5))/7);
const points=[-z2,-z1,z1,z2],weights=[(18-Math.sqrt(30))/36,(18+Math.sqrt(30))/36,(18+Math.sqrt(30))/36,(18-Math.sqrt(30))/36];
function gauss(f,a,b,n=1){let sum=0;for(let j=0;j<n;j++){const l=a+(b-a)*j/n,r=a+(b-a)*(j+1)/n,m=(l+r)/2,d=(r-l)/2;for(let k=0;k<4;k++)sum+=d*weights[k]*f(m+d*points[k]);}return sum;}
function kernel(z,age,h,rho){const gap=Math.abs(z)-age;if(Math.abs(gap)>=h)return 0;return z/Math.pow(z*z+rho*rho,1.5)*(h-Math.abs(gap))/(h*h);}
function tail(z,minAge,h,rho){const lower=Math.max(minAge,Math.abs(z)-h),middle=Math.abs(z),upper=middle+h;if(lower>=upper)return 0;let area=0;if(lower<middle){const end=middle;area+=(end-lower)*(lower+end-2*(middle-h))/(2*h*h);}const from=Math.max(lower,middle);if(from<upper)area+=(upper-from)*(upper-from)/(2*h*h);return z/Math.pow(z*z+rho*rho,1.5)*area;}
function hermite(s,left,right){const d=right[0]-left[0],q=(s-left[0])/d;return (2*q*q*q-3*q*q+1)*left[1]+(q*q*q-2*q*q+q)*d*left[2]+(-2*q*q*q+3*q*q)*right[1]+(q*q*q-q*q)*d*right[2];}
function audit(rows,index,A,delta,h,rho,subdiv){const [t,x]=rows[index];let self=tail(x-.5,t+delta,h,rho),partner=-tail(x+.5,t+delta,h,rho);const prep=s=>.5-A*Math.pow(s+delta,3)/(6*delta);self+=gauss(s=>kernel(x-prep(s),t-s,h,rho),-delta,0,32*subdiv);partner-=gauss(s=>kernel(x+prep(s),t-s,h,rho),-delta,0,32*subdiv);for(let j=0;j<index;j++){const l=rows[j],r=rows[j+1];self+=gauss(s=>kernel(x-hermite(s,l,r),t-s,h,rho),l[0],r[0],subdiv);partner-=gauss(s=>kernel(x+hermite(s,l,r),t-s,h,rho),l[0],r[0],subdiv);}return{self,partner,total:self+partner};}
let record;
if(!args.receipt){const checks=[];function check(name,got,want,tol){assert(Math.abs(got-want)<=tol,`${name}: ${got} vs ${want}`);checks.push({name,got,want,tol});}
check('Gauss constant',gauss(()=>1,-2,3),5,1e-14);check('Gauss degree seven',gauss(x=>x**7,0,1),1/8,1e-14);
check('Hermite independent basis cubic',hermite(.3,[-1,-1,3],[1,1,3]),.3**3,1e-14);
for(const h of[1/16,1/32])for(const rho of[1/32,1/64]){for(const r of[0,h/3,2*h,1]){const expected=r/Math.pow(r*r+rho*rho,1.5)*(r>=h?1:.5+r/h-r*r/(2*h*h));check(`stationary tail ${h},${rho},${r}`,tail(r,0,h,rho),expected,1e-11);check(`direct stationary ${h},${rho},${r}`,gauss(w=>kernel(r,w,h,rho),0,r+h,4096),expected,2e-4);}
for(const b of[-2,-1,-.3,.3,1,2]){const q=Math.abs(b),limit=q===1?4:h/Math.abs(q-1);let got=gauss(w=>kernel(b*w,w,h,rho),0,limit,8192);if(q===1)got+=b/(h*Math.sqrt(limit*limit+rho*rho));const zz=q===1?Infinity:q*h/(rho*Math.abs(q-1)),want=q===1?b/(h*rho):Math.sign(b)/(h*q*rho)*(1-Math.asinh(zz)/zz);check(`affine self ${h},${rho},${b}`,got,want,2e-8);}}
record={mode:'known-controls',status:'pass',checks};
}else{assert(args.controls,'Pass a prior controls receipt');const known=JSON.parse(fs.readFileSync(args.controls));assert.equal(known.status,'pass');assert.equal(known.scriptHash,hash);const r=JSON.parse(fs.readFileSync(args.receipt));const hist=JSON.parse(zlib.gunzipSync(fs.readFileSync(r.historyPath)));assert.deepEqual(hist.columns,['t','x','v','a','self','partner']);const rows=hist.rows;const wanted=[0,.5,1,2,...r.events.flatMap(e=>e.bracket)];const indexes=[...new Set(wanted.map(t=>Math.min(rows.length-1,Math.max(0,Math.round(t/r.dt)))))].sort((a,b)=>a-b);const samples=[];for(const index of indexes){const values=[1,2,4,8].map(n=>({subdiv:n,...audit(rows,index,r.completePast.A,r.completePast.delta,r.h,r.rho,n)}));samples.push({index,t:rows[index][0],recorded:{total:rows[index][3],self:rows[index][4],partner:rows[index][5]},values});}record={mode:'original-integral-audit',status:'measured-functional-check-only',target:args.receipt,targetScriptHash:r.scriptHash,historySha256:crypto.createHash('sha256').update(fs.readFileSync(r.historyPath)).digest('hex'),samples};}
record={...record,scriptHash:hash,finished:new Date().toISOString(),wallSeconds:(performance.now()-start)/1000,cpu:process.cpuUsage(cpu),rss:process.memoryUsage().rss};if(args.out){fs.mkdirSync(args.out,{recursive:true});fs.writeFileSync(args.out+'/receipt.json',JSON.stringify(record,null,2)+'\n');}console.log(JSON.stringify(record,null,2));
