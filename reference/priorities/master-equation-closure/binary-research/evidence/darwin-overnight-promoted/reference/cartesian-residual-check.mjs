// Scratch: Cartesian Euler-Lagrange residual of the derived circle and the rest-acceleration formula,
// built directly from the Section 10 functional by finite differences of L (no ODE integration).
const sigma=-1;
function L(X,V){const r=[X[0]-X[3],X[1]-X[4],X[2]-X[5]];const rn=Math.hypot(...r);const e=r.map(x=>x/rn);
 const v1=V.slice(0,3),v2=V.slice(3);const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
 return 0.5*dot(v1,v1)+0.5*dot(v2,v2)-sigma/rn+sigma/(2*rn)*(dot(v1,v2)+dot(v1,e)*dot(v2,e));}
const hh=1e-4;
function grad(f,x){return x.map((_,i)=>{const xp=x.slice(),xm=x.slice();xp[i]+=hh;xm[i]-=hh;return (f(xp)-f(xm))/(2*hh);});}
function residual(r0,omega,t){ // mirror circle: X1 = (r0/2)(cos,sin,0), X2=-X1
 const X=(t)=>{const c=Math.cos(omega*t),s=Math.sin(omega*t);return [r0/2*c,r0/2*s,0,-r0/2*c,-r0/2*s,0];};
 const V=(t)=>{const c=Math.cos(omega*t),s=Math.sin(omega*t);const w=r0/2*omega;return [-w*s,w*c,0,w*s,-w*c,0];};
 const p=(t)=>grad(v=>L(X(t),v),V(t));
 const dt=1e-3;const pdot=p(t+dt).map((x,i)=>(x-p(t-dt)[i])/(2*dt));
 const dLdX=grad(x=>L(x,V(t)),X(t));
 return pdot.map((x,i)=>x-dLdX[i]);}
for(const r0 of [25,100]){const om=Math.sqrt(8/(r0*r0*(4*r0+1)));const omK=Math.sqrt(2/r0**3);
 console.log('r0',r0,'derived omega residual max',Math.max(...residual(r0,om,0.3).map(Math.abs)),' | Kepler omega residual max',Math.max(...residual(r0,omK,0.3).map(Math.abs)),' | scale sigma/r^2',1/r0**2);}
// rest acceleration: H A = b at V=0, compare A1 with sigma e/(r(r-sigma))
const r=10;const X=[r/2,0,0,-r/2,0,0];const V0=[0,0,0,0,0,0];
const b=grad(x=>L(x,V0),X);
// Hessian by finite differences of grad_V L
const H=[];for(let i=0;i<6;i++){const vp=V0.slice(),vm=V0.slice();vp[i]+=hh;vm[i]-=hh;const gp=grad(v=>L(X,v),vp),gm=grad(v=>L(X,v),vm);H.push(gp.map((x,k)=>(x-gm[k])/(2*hh)));}
// solve H A = b (Gaussian elimination)
const A=(()=>{const M=H.map((row,i)=>[...row,b[i]]);for(let i=0;i<6;i++){let p=i;for(let k=i+1;k<6;k++)if(Math.abs(M[k][i])>Math.abs(M[p][i]))p=k;[M[i],M[p]]=[M[p],M[i]];for(let k=0;k<6;k++){if(k===i)continue;const f=M[k][i]/M[i][i];for(let j=i;j<7;j++)M[k][j]-=f*M[i][j];}}return M.map((row,i)=>row[6]/row[i]);})();
console.log('rest A1x numeric',A[0],'formula sigma/(r(r-sigma))',sigma/(r*(r-sigma)),'inverse-square sigma/r^2',sigma/r**2);
console.log('Hessian eigen-check: H*(e,e) factor',(H[0][0]+H[0][3]),'expected 1+sigma/r',1+sigma/r,'; H*(e,-e) factor',(H[0][0]-H[0][3]),'expected 1-sigma/r',1-sigma/r,'; transverse sum',(H[1][1]+H[1][4]),'expected',1+sigma/(2*r));
