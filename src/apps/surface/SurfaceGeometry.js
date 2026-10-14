// Exact decimal preparation geometry. EOM owns certificates and future motion.
export function decimalRational(token) {
  if(typeof token!=='string' || token.length>256) throw new Error('Use bounded decimal values.');
  const m=token.match(/^([+-]?)(\d*)(?:\.(\d*))?(?:e([+-]?\d+))?$/i);
  if(!m || !(m[2].length || m[3]?.length)) throw new Error('Use decimal values without surrounding spaces.');
  const scale=(m[3]?.length??0)-Number(m[4]??0);
  if(!Number.isSafeInteger(scale)||Math.abs(scale)>512) throw new Error('Decimal scale exceeds this viewer.');
  const n=BigInt((m[2]||'0')+(m[3]??''))*(m[1]==='-'?-1n:1n);
  return scale>=0?[n,10n**BigInt(scale)]:[n*10n**BigInt(-scale),1n];
}
export function sameDecimal(a,b) {
  try {const [an,ad]=decimalRational(a),[bn,bd]=decimalRational(b);return an*bd===bn*ad;} catch {return false;}
}
function decimalQuotient(n,d) {
  if(d===0n) throw new Error('A positive nonzero denominator is required.');
  const negative=n*d<0n;n=n<0n?-n:n;d=d<0n?-d:d;
  let out=String(n/d),r=n%d;
  if(r){out+='.';for(let i=0;r && i<128;i++){r*=10n;out+=String(r/d);r%=d;}if(r)throw new Error('Choose values giving a finite decimal angular speed for circular preparation.');}
  return (negative?'-':'')+out;
}
export function decimalProduct(a,b) {const [an,ad]=decimalRational(a),[bn,bd]=decimalRational(b);return decimalQuotient(an*bn,ad*bd);}
export function decimalRatio(a,b) {const [an,ad]=decimalRational(a),[bn,bd]=decimalRational(b);return decimalQuotient(an*bd,ad*bn);}
export function decimalSum(a,b) {const [an,ad]=decimalRational(a),[bn,bd]=decimalRational(b);return decimalQuotient(an*bd+bn*ad,ad*bd);}
export function decimalScale(value,numerator,denominator) {const [vn,vd]=decimalRational(value),[nn,nd]=decimalRational(numerator),[dn,dd]=decimalRational(denominator);return decimalQuotient(vn*nn*dd,vd*nd*dn);}
export function validateSurfaceGeometry(g) {
  if(!['sphere','oblate'].includes(g?.kind) || !Number.isFinite(Number(g.radius)) || !(Number(g.radius)>0)) throw new Error('Choose a sphere or oblate spheroid with a positive equatorial radius.');
  decimalRational(g.radius);
  if(g.kind==='oblate' && (!Number.isFinite(Number(g.flattening)) || !(Number(g.flattening)>0) || Number(g.flattening)>1 || decimalRational(g.flattening)[0]>decimalRational(g.flattening)[1])) throw new Error('Polar/equatorial ratio must be greater than zero and at most one.');
  if(g.center && (!Array.isArray(g.center)||g.center.length!==3||g.center.some(v=>!sameDecimal(v,'0'))) || g.orientation && (!Array.isArray(g.orientation)||g.orientation.length!==3||g.orientation.some((row,i)=>!Array.isArray(row)||row.length!==3||row.some((v,j)=>!sameDecimal(v,i===j?'1':'0'))))) throw new Error('This viewer supports centered, unrotated surfaces.');
  return g;
}
export function circleOnSurface(g,radius,height) {
  // rho²/a² + z²/(qa)² = 1 on the exact supplied decimal rationals.
  const [rn,rd]=decimalRational(radius),[hn,hd]=decimalRational(height),[an,ad]=decimalRational(g.radius),[qn,qd]=decimalRational(g.kind==='oblate'?g.flattening:'1');
  if(rn<=0n || an<=0n || qn<=0n) return false;
  const xN=rn*rn*ad*ad,xD=rd*rd*an*an,yN=hn*hn*qd*qd*ad*ad,yD=hd*hd*qn*qn*an*an;
  return xN*yD+yN*xD===xD*yD;
}
export function matchingSurfaceGeometry(g,resolved) {
  return resolved?.kind===g.kind && sameDecimal(resolved.radius,g.radius) && (g.kind!=='oblate'||sameDecimal(resolved.flattening,g.flattening)) && Array.isArray(resolved.center) && resolved.center.every(v=>sameDecimal(v,'0')) && resolved.center.length===3 && Array.isArray(resolved.orientation) && resolved.orientation.length===3 && resolved.orientation.every((row,i)=>Array.isArray(row)&&row.length===3&&row.every((v,j)=>sameDecimal(v,i===j?'1':'0')));
}
