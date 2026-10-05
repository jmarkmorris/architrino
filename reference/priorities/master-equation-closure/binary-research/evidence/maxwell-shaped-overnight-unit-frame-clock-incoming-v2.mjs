// Section60 incoming actual-unit enclosure successor; comparison/test field remains unclipped. K=cf=1, opposite polarity.
import assert from 'node:assert/strict';
import {Q,G,dot,length} from './maxwell-shaped-overnight-grid-interval.mjs';
import {matrixNormUpper} from './maxwell-shaped-overnight-directed-sensitivity.mjs';
const expand=(a,e)=>a.map(z=>G.of(z).add(new G(Q.of(e).neg(),e))),mv=(m,z)=>m.map(row=>dot(row,z)),cross=(a,b)=>G.of(a[0]).mul(b[1]).sub(G.of(a[1]).mul(b[0]));
function selected(law){assert(law==='E'||law==='full','selected Maxwell law');}
export function unitFrameField(r,v,a,j,u,law,incomingReceiver=false){
  selected(law);assert([r,v,a,j,u].every(z=>Array.isArray(z)&&z.length===2),'planar physical inputs');
  const R=length(r);assert(R.lo.cmp(0)>0);const n=r.map(z=>G.of(z).div(R)),vn=dot(n,v),vt=cross(n,v),an=dot(n,a),at=cross(n,a),jn=dot(n,j),jt=cross(n,j),unRaw=dot(n,u),utRaw=cross(n,u),restrict=z=>{const lo=z.lo.cmp(-1)<0?Q.of(-1):z.lo,hi=z.hi.cmp(1)>0?Q.of(1):z.hi;assert(lo.cmp(hi)<=0,'nonempty actual incoming frame component');return new G(lo,hi);},un=incomingReceiver?restrict(unRaw):unRaw,ut=incomingReceiver?restrict(utRaw):utRaw,D=new G(1).sub(vn);assert(D.lo.cmp(0)>0,'positive source clock');
  const D2=D.sq(),D3=D2.mul(D),D4=D3.mul(D),R2=R.sq(),R3=R2.mul(R),w=new G(1).sub(G.of(v[0]).sq()).sub(G.of(v[1]).sq()),N=vt.mul(an).add(D.mul(at)),Dr=new G(1).sub(un),
    en=w.div(R2.mul(D2)).neg(),et=w.mul(vt).div(R2.mul(D3)).add(N.div(R.mul(D3))),
    er=[w.mul(-2).div(R3.mul(D2)).neg(),w.mul(vt).mul(2).div(R3.mul(D3)).add(N.div(R2.mul(D3))).neg()],
    eth=[w.mul(vt).mul(3).div(R2.mul(D3)).add(N.div(R.mul(D3))).neg(),w.div(R2.mul(D3)).sub(w.mul(vt.sq()).mul(3).div(R2.mul(D4))).add(an.div(R.mul(D3))).sub(N.mul(vt).mul(3).div(R.mul(D4))).neg()],
    EV=[[w.sub(vn.mul(D)).mul(2).div(R2.mul(D3)).neg(),vt.mul(-2).div(R2.mul(D2)).neg()],
      [vn.mul(vt).mul(2).div(R2.mul(D3)).sub(w.mul(vt).mul(3).div(R2.mul(D4))).add(at.div(R.mul(D3))).sub(N.mul(3).div(R.mul(D4))).neg(),vt.sq().mul(2).sub(w).div(R2.mul(D3)).sub(an.div(R.mul(D3))).neg()]],
    EA=[[new G(0),new G(0)],[vt.div(R.mul(D3)),D.div(R.mul(D3))]],
    L=x=>law==='E'?x:[G.of(x[0]).add(ut.mul(x[1])),Dr.mul(x[1])],
    LM=m=>law==='E'?m:[m[0].map((z,k)=>z.add(ut.mul(m[1][k]))),m[1].map(z=>Dr.mul(z))],
    FR=L(er),Ftheta=law==='E'?eth:[eth[0].add(ut.mul(eth[1])).sub(ut.mul(en)),Dr.mul(eth[1]).add(un.mul(en))],Fv=LM(EV),Fa=LM(EA),Va=mv(Fv,[an,at]),Aj=mv(Fa,[jn,jt]),
    colN=FR.map((z,k)=>z.add(vt.mul(Ftheta[k]).div(R)).sub(Va[k]).sub(Aj[k]).div(D)),colT=Ftheta.map(z=>z.div(R)),AX=[[colN[0],colT[0]],[colN[1],colT[1]]],K=law==='E'?[[new G(0),new G(0)],[new G(0),new G(0)]]:[[new G(0),et],[et.neg(),new G(0)]];
  return {R,D,n,components:{vn,vt,an,at,jn,jt,un,ut},F:L([en,et]),AX,Fv,Fa,K,FR,Ftheta};
}
// Caller must prove actual receiving |u|<=1 on all coefficient families; no test/defect clipping.
export function frameClockInputs(r,v,a,j,u,pv,pa,law){
  for(const x of [pv,pa])assert(Q.of(x).cmp(0)>=0,'nonnegative source error');
  const clock=unitFrameField(r,v,a,j,u,law,true),offset=unitFrameField(r,expand(v,pv),expand(a,pa),j,u,law,true);
  return {Cx:matrixNormUpper(clock.AX),Hv:matrixNormUpper(offset.Fv),B:matrixNormUpper(offset.Fa),Cu:law==='E'?Q.of(0):offset.K[0][1].absUpper(),D:offset.D,Dclock:clock.D,R:clock.R,clock,offset};
}
export function frameClockKnown(){
  const contains=(m,e)=>m.forEach((row,i)=>row.forEach((z,k)=>assert(z.lo.cmp(e[i][k])<=0&&z.hi.cmp(e[i][k])>=0,'analytical frame matrix'))),s=unitFrameField([2,0],[0,0],[0,0],[0,0],[0,0],'E');contains(s.AX,[['.25',0],[0,'-.125']]);
  const f=unitFrameField(['2.5',0],['.2',0],[0,0],[0,0],[0,0],'full');contains(f.AX,[['.24',0],[0,'-.12']]);
  const p=[2,0],v=[0,0],a=[0,'.03'],j=[0,'.05'],u=['.2','.3'];contains(unitFrameField(p,v,a,j,u,'E').AX,[['.25','-.0075'],['-.04','-.125']]);const z=unitFrameField(p,v,a,j,u,'full');contains(z.AX,[['.238','-.0075'],['-.032','-.125']]);contains(z.K,[[0,'.015'],['-.015',0]]);
  const rot=unitFrameField([0,2],[0,0],['-.03',0],['-.05',0],['-.3','.2'],'full');contains(rot.AX,[['.238','-.0075'],['-.032','-.125']]);
  const incoming=unitFrameField([2,0],[0,0],[0,0],[0,0],[new G('-1.2','-.8'),new G(0,'.3')],'full',true);assert(incoming.components.un.lo.cmp(-1)===0&&incoming.components.un.hi.cmp('-.8')>=0&&incoming.components.un.hi.cmp('-.79999999999')<0);const comparison=unitFrameField([2,0],[0,0],[0,0],[0,0],[-2,0],'full');assert(comparison.components.un.lo.cmp(-2)<=0);const unclipped=unitFrameField(p,v,a,j,[-2,0],'full');assert(unclipped.F[1].lo.cmp('.045')<=0&&unclipped.F[1].hi.cmp('.045')>=0,'nominal superunit defect field remains unclipped');let empty=false;try{unitFrameField([2,0],[0,0],[0,0],[0,0],[-2,0],'full',true);}catch{empty=true;}assert(empty);
  const off=frameClockInputs(p,v,a,j,u,'.001','.01','full');assert(off.Cx.cmp(0)>0&&off.Hv.cmp(0)>0&&off.B.cmp(0)>0&&off.Cu.cmp(0)>0);
  for(const call of [()=>unitFrameField([2,0],[1,0],[0,0],[0,0],[0,0],'E'),()=>frameClockInputs(p,v,a,j,u,0,'-.1','full')]){let bad=false;try{call();}catch{bad=true;}assert(bad);}
  return {passed:true,cases:['static AX diag1/4,-1/8','affine AX diag6/25,-3/25','nonzero sourceA/J/U E/full AX and receiver skew','quarter-turn physical covariance','convex actual VA offsets retained','actual incoming frame intersection','comparison superunit defect field remains unclipped','empty incoming frame intersection rejected','zeroD/negative error rejection']};
}
if(process.argv.includes('--known'))console.log(JSON.stringify(frameClockKnown()));
