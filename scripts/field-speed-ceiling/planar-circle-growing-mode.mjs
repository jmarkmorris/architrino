// Sharp capped-circle linear-mode arithmetic; not nonlinear trajectory evidence.
import assert from 'node:assert/strict';
function bisect(f,lo,hi){assert.ok(f(lo)*f(hi)<0);for(let i=0;i<80;i++){const mid=(lo+hi)/2;if(mid===lo||mid===hi)break;if(f(lo)*f(mid)<=0)hi=mid;else lo=mid;}return {lo,hi,value:(lo+hi)/2};}
const known=bisect(x=>x*x-2,1,2);
assert.ok(Math.abs(known.value-Math.SQRT2)<1e-15);
console.log(JSON.stringify({knownCase:'sqrt(2) bracket',passed:true,result:known}));
const D=bisect(x=>x-Math.cos(x),.7,.8).value,C=Math.cos(D),S=Math.sin(D),J=1+S;
function F(z){const E=Math.exp(-2*D*z),q=-1-z*z,N=-C*z-S+E*(-C*z+S),M=-S*z+C+E*(S*z+C);const radial=(1-2*S)/(2*C*C)*M+3/(2*C*J)*N+E*C*q/J;return -z*(1+z*z)-radial+q*S/C;}
assert.ok(Math.abs(F(0))<1e-14);
console.log(JSON.stringify({knownCase:'phase neutral mode',passed:true,residual:F(0)}));
const bracket=bisect(F,.2,.5),z=bracket.value;
console.log(JSON.stringify({grade:'floating-point arithmetic witness; analytic existence proved separately',cf:1,D,dimensionlessGrowth:z,bracket,residual:F(z),periodGrowthExponent:2*Math.PI*z,amplitudeFactorPerPeriod:Math.exp(2*Math.PI*z),F_at_point2:F(.2),F_at_point5:F(.5)}));
