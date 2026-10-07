// Same-history whole-cell angular functional. New subject; no target side effects.
import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
import {angularWindow,completedIntegral} from './maxwell-e-first-event-angular-primitive.mjs';
const q=Q.of,max=(a,b)=>q(a).cmp(b)>=0?q(a):q(b),min=(a,b)=>q(a).cmp(b)<=0?q(a):q(b);
const interval=x=>x instanceof G?x:x&&typeof x==='object'&&'lo' in x?new G(x.lo,x.hi):new G(x);
const nonnegative=(x,name)=>{x=q(x);assert(x.cmp(0)>=0,`${name} nonnegative`);return x;};

export function support(W,nu,R,b){
 W=nonnegative(W,'W');R=nonnegative(R,'R');b=nonnegative(b,'b');nu=q(nu);assert(nu.cmp(0)>0,'positive metric');
 const a=min(R,W.div(nu));
 if(W.cmp(0)===0)return {bound:q(0),a,branch:'zero',radicand:q(0),additive:q(0)};
 const lhs=a.mul(a).mul(nu.mul(nu)).mul(nu.mul(nu).add(b.mul(b))),rhs=b.mul(b).mul(W.mul(W));
 if(lhs.cmp(rhs)>=0){
  const rad=q(1).add(b.div(nu).mul(b.div(nu)));
  return {bound:new G(rad).sqrt().hi.mul(W),a,branch:'ellipse',branchLhs:lhs,branchRhs:rhs,radicand:rad.mul(W.mul(W)),additive:q(0)};
 }
 const rad=W.mul(W).sub(nu.mul(nu).mul(a.mul(a)));assert(rad.cmp(0)>=0);
 return {bound:new G(rad).sqrt().hi.add(b.mul(a)),a,branch:'slab',branchLhs:lhs,branchRhs:rhs,radicand:rad,additive:b.mul(a)};
}

export function certify({W,nu,R,m,k,F},lambda){
 W=nonnegative(W,'W');R=nonnegative(R,'R');F=nonnegative(F,'F');nu=q(nu);m=q(m);lambda=nonnegative(lambda,'lambda');k=interval(k);
 assert(nu.cmp(0)>0&&m.cmp(R)>0,'positive metric and whole-cell radius');
 const B=k.absUpper(),h=support(W,nu,R,B.add(lambda)),leftUpper=h.bound.add(F),right=lambda.mul(m),available=right.sub(F).sub(h.additive),squaredSlack=available.mul(available).sub(h.radicand);
 return {passed:available.cmp(0)>=0&&squaredSlack.cmp(0)>=0,lambda,leftUpper,right,available,squaredSlack,B,...h};
}

export function density(input){
 const W=nonnegative(input.W,'W'),R=nonnegative(input.R,'R'),F=nonnegative(input.F,'F'),nu=q(input.nu),m=q(input.m),k=interval(input.k);
 assert(nu.cmp(0)>0&&m.cmp(R)>0,'positive metric and whole-cell radius');
 if(W.cmp(0)===0&&F.cmp(0)===0)return {...certify({...input,k},0),iterations:0};
 const a=min(R,W.div(nu)),B=k.absUpper();let upper=W.add(B.mul(a)).add(F).div(m.sub(a)).add('1/100000000000000000000'),lower=q(0),proof=certify({...input,k},upper);
 for(let j=0;!proof.passed&&j<8;j++){upper=upper.mul(2);proof=certify({...input,k},upper);}assert(proof.passed,'finite rational upper certificate');
 for(let j=0;j<70;j++){const mid=lower.add(upper).div(2),test=certify({...input,k},mid);if(test.passed)upper=mid;else lower=mid;}
 proof=certify({...input,k},upper);assert(proof.passed);return {...proof,iterations:70};
}

export function rowDensity(row){
 const hasJoint=row.W!==undefined&&row.nu!==undefined&&row.signedCurrent?.Qcol?.[1]!==undefined&&row.signedCurrent?.nomV?.[1]!==undefined&&row.projectedSource?.q?.components?.[1]!==undefined&&row.receiverGeometry?.rComparison!==undefined&&row.receiverGeometry?.rComparisonMax!==undefined;
 const old=nonnegative(row.omega,'old whole-cell density');
 if(!hasJoint)return {bound:old,old,mode:'unchanged no complete admitted joint inputs'};
 assert(row.flow?.W!==undefined&&q(row.W).cmp(row.flow.W)>=0,'whole-cell W must enclose stored flow W; Wend is insufficient');
 const rc=new G(row.receiverGeometry.rComparison,row.receiverGeometry.rComparisonMax),k=interval(row.signedCurrent.Qcol[1]).add(interval(row.signedCurrent.nomV[1]).div(rc));
 const input={W:q(row.W),nu:q(row.nu),R:q(row.r),m:rc.lo,k,F:q(row.projectedSource.q.components[1])},certificate=density(input);
 return {bound:min(old,certificate.lambda),old,mode:'admitted joint transformed-state functional',input,certificate};
}

export function rebuild(rows){
 assert(rows.length&&q(rows[0].t).cmp(0)===0,'zero initial face required');
 let previous=q(0),primitive=q(0);const output=[{...rows[0],t:q(0),omega:q(rows[0].omega),angularPrefix:q(0)}],records=[];
 for(let i=1;i<rows.length;i++){
  const row=rows[i],t=q(row.t);assert(t.cmp(previous)>0,'strict complete faces');const result=rowDensity(row);
  primitive=primitive.add(t.sub(previous).mul(result.bound));output.push({...row,t,omega:result.bound,angularPrefix:primitive});records.push({index:i,left:previous,right:t,...result});previous=t;
 }
 return {rows:output,records};
}

export function known(){
 const e=support(1,1,1,'3/4');assert(e.branch==='ellipse'&&e.bound.cmp('5/4')>=0&&e.bound.sub('5/4').cmp('1/100000000000000000000')<0);
 const s=support(1,1,'3/5',2);assert(s.branch==='slab'&&s.bound.cmp(2)>=0&&s.bound.sub(2).cmp('1/100000000000000000000')<0);
 const input={W:'3/5',nu:1,R:'3/5',m:1,k:0,F:0},z=density(input);assert(z.passed&&z.lambda.cmp('3/4')>=0&&z.lambda.sub('3/4').cmp('1/1000000000000000000')<0);
 assert(certify(input,'3/4').passed&&!certify(input,'74/100').passed);
 assert(q('12/25').div(q(1).sub('9/25')).cmp('3/4')===0);
 assert(density({W:0,nu:1,R:0,m:1,k:4,F:0}).lambda.cmp(0)===0);
 assert.throws(()=>density({...input,m:'3/5'}),/positive/);assert.throws(()=>support(-1,1,1,0),/nonnegative/);
 const fake={t:1,r:'3/5',W:'3/5',nu:1,omega:'3/2',flow:{W:'3/5'},signedCurrent:{Qcol:[0,0],nomV:[0,0]},projectedSource:{q:{components:[0,0]}},receiverGeometry:{rComparison:1,rComparisonMax:1}};
 const d=rowDensity(fake);assert(d.bound.cmp('3/4')>=0&&d.bound.cmp('750000000000000001/1000000000000000000')<0);
 assert.throws(()=>rowDensity({...fake,W:'1/2'}),/whole-cell/);
 const replay=rebuild([{t:0,omega:0},{t:'1/2',omega:'1/5'},{...fake,t:1}]);
 assert(replay.records[0].mode.startsWith('unchanged'));assert(replay.rows[2].angularPrefix.sub('19/40').abs().cmp('1/1000000000000000000')<0);
 const rr=replay.rows;
 assert(completedIntegral(rr,'1/4','3/4',q('2/5')).value.sub('19/80').abs().cmp('1/1000000000000000000')<0);
 assert(completedIntegral(rr,'1/10','1/5',q('2/5')).value.cmp('1/50')===0);
 assert(completedIntegral(rr,'1/2','1/2',q('2/5')).value.cmp(0)===0);
 assert(angularWindow(rr,new G('-1/2','-1/4'),{lo:q(1),hi:q('3/2')},q('1/10'),q('2/5')).psi.sub('29/40').abs().cmp('1/1000000000000000000')<0);
 assert.throws(()=>completedIntegral(rr,0,2,q(0)),/completed/);
 return {passed:true,cases:['unconstrained ellipse support 5/4 at radial coordinate 3/5','clipped ellipse support 2 at radial slab 3/5','linear fractional exact supremum 3/4 and strict 0.74 rejection','signed extremizer 12/25 divided by 16/25','zero data exact zero','nonpositive radius and negative magnitude rejection','Wend-size substituted norm rejected against whole-cell flow W','older cells retained and new primitive 19/40','two partial cells 19/80; same cell 1/50; zero seam; negative past plus trial 29/40; unfinished lookup rejected'],controls:{ellipse:e,slab:s,linearFractional:z}};
}

export function encode(value){return value instanceof Q?value.toString():value instanceof G?value.out():Array.isArray(value)?value.map(encode):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([k,v])=>[k,encode(v)])):value;}
if(process.argv.includes('--known-only'))console.log(JSON.stringify(encode(known()),null,2));
