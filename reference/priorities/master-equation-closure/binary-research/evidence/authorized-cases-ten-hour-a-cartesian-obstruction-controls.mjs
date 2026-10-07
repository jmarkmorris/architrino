import assert from 'node:assert/strict';
import {Q,G} from './maxwell-shaped-overnight-grid-interval.mjs';
import {frame} from './authorized-cases-ten-hour-a-transverse-physical-u-coefficients-v2.mjs';
import {block,lognorm4} from './authorized-cases-ten-hour-a-cartesian-lognorm.mjs';
import {scalarFactors} from './maxwell-e-first-event-source-tangential-damping-v2.mjs';
import {combine} from './authorized-cases-ten-hour-a-cartesian-companion.mjs';
import {ceiling} from './authorized-cases-ten-hour-a-continuation-storage.mjs';
const out=[];
for(const a of [[0,0],['3/100','-1/25']])for(const u of [['1/4','7/30'],['-1/5','1/3']]){
 const z=frame([2,0],['1/5','3/10'],a,u,['1/5','3/10']),alpha=z.q.Fu[1][0],b=block(z.q.AX,z.H.AX,z.H.Fu,alpha,[1,0],1),trace=b.M.reduce((s,row,k)=>s.add(row[k]),new G(0));assert(trace.lo.cmp(0)<=0&&trace.hi.cmp(0)>=0&&trace.hi.sub(trace.lo).cmp('1/1000000000000000000')<0,'analytically zero trace enclosed narrowly');const m=lognorm4(b.S);assert(m.mu.cmp(0)>=0);out.push({a,u,trace:trace.out(),mu:m.mu.toString()});
}
for(const mu of [0,'1/2',2]){const f=scalarFactors(mu,'1/10');assert(f.E.hi.cmp(1)>=0&&f.P.hi.cmp(0)>0);const z=combine({X0:'.06',V0:'.11',W0:'.2',h:'.1',Cx:'.1',sourceX:'.01',sourceV:'.02',sourceA:'.03',Hv:'.2',B:'.3',delta:'.001',E:f.E.hi,P:f.P.hi,f:'.01',nu:1,bx:'.1',bw:1,bf:'.01',trialX:'.2',trialV:'.3'});assert(z.Wend.cmp('.2')>=0&&z.X.cmp('.06')>=0&&z.V.cmp('.11')>=0);assert(ceiling(z.Wend).stored.cmp(z.Wend)>=0);}
const W=Q.of('40550679560268279107371/200000000000000000000000'),V=Q.of('22771060530077803400771/200000000000000000000000');assert(W.cmp(V)>0);
console.log(JSON.stringify({passed:true,cases:['four analytically trace-zero current Jacobians with nonzero source velocity and acceleration','valid physical nominal-family lognorm is nonnegative','positive scalar factors and every min cap retain initial lower floors','upward rounding preserves floor','exact accepted W0 greater than original V0'],controls:out,scope:'known mathematical controls only; no receiving target or independent theorem audit'},null,2));
