const assert=require('node:assert/strict');
function quantities(r,q){
 const D=r*r+r/2, dp=2*r+0.5, dpp=2;
 const fp=-dp/(D*D), fpp=2*dp*dp/(D*D*D)-dpp/(D*D);
 const bp=-2/(2*r-1)**2, bpp=8/(2*r-1)**3;
 const L2=-(1/(r*r)+q*bp/4)/fp;
 return {r,q,L2,criticalResidual:L2*fp+1/(r*r)+q*bp/4,
 curvature:L2*fpp-2/(r**3)+q*bpp/4,
 unshiftedCurvature:8/(r*(4*r+1)*(2*r+1))+q*bpp/4,
 latitudeCurvature:2*L2/D+q*(r/(r-1)-2*r/(2*r-1))/2};
}
for(const r of [2,20,100]){const z=quantities(r,0);const expected=8/(r*(4*r+1)*(2*r+1));assert.ok(Math.abs(z.curvature-expected)<=1e-13*expected);assert.ok(Math.abs(z.L2-(2*r+1)**2/(2*(4*r+1)))<1e-12);}
console.log('Known mirror-circle control PASS before drift targets.');
for(const [r,q] of [[100,0.0099**2+0.00199**2],[100,0.1**2],[20,0.1**2],[100,0.00995**2],[100,9]]) console.log(JSON.stringify(quantities(r,q)));
