"""Subject Cartesian Maxwell ring characteristic, distinct from independent reference.
Known static/neutral hit controls precede any ring target. --screen requires --controls.
Frozen screen: vertical m=0,1,2,3, dimensionless p=lambda/omega with
0<Re(p)<8, |Im(p)|<12, seed Re .1,.5,1,2,4,7 and Im -11..11.
This finite screen is not a census of the neutral characteristic roots.
"""
import argparse, hashlib, json
from pathlib import Path
import mpmath as mp
mp.mp.dps=60
I=mp.eye(3); J=mp.matrix([[0,-1,0],[1,0,0],[0,0,0]])
vec=lambda *x: mp.matrix(x)
dot=lambda x,y: sum(x[k]*y[k] for k in range(3))
norm=lambda x: mp.sqrt(dot(x,x))
mag=lambda x: mp.sqrt(sum(abs(x[k])**2 for k in range(3)))
rot=lambda t: mp.matrix([[mp.cos(t),-mp.sin(t),0],[mp.sin(t),mp.cos(t),0],[0,0,1]])
def hit(R,n,v,a,u):
    D=1-dot(n,v); B=n-v; H=dot(n,a)
    N=(1-dot(v,v))*B+R*(B*H-D*a)
    return dict(R=R,n=n,v=v,a=a,u=u,D=D,B=B,H=H,E=N/(R**2*D**3))
def variation(h,dx,dvs,das,du,jerk=None,full=False):
    R,n,v,a,u,D,B,H,E=[h[k] for k in ['R','n','v','a','u','D','B','H','E']]
    if jerk is None: jerk=vec(0,0,0)
    ds=-dot(n,dx)/D; dr=dx-v*ds; dR=-ds
    dn=(dr-n*dot(n,dr))/R; dv=dvs+a*ds; da=das+jerk*ds
    dD=-dot(dn,v)-dot(n,dv)
    dN=-2*dot(v,dv)*B+(1-dot(v,v))*(dn-dv)+dR*(B*H-D*a)
    dN+=R*((dn-dv)*H+B*(dot(dn,a)+dot(n,da))-dD*a-D*da)
    dE=dN/(R**2*D**3)-E*(2*dR/R+3*dD/D)
    if not full:return dE
    dM=dn*dot(u,E)+n*(dot(du,E)+dot(u,dE))-(dot(du,n)+dot(u,dn))*E-dot(u,n)*dE
    return dE+dM
def controls():
    n=vec(mp.mpf(3)/5,mp.mpf(4)/5,0); z=vec(0,0,0); R=mp.mpf(7)/3
    h=hit(R,n,z,z,z); dx=vec(mp.mpf(2)/7,-mp.mpf(3)/8,mp.mpf(5)/11)
    expected=(dx-3*n*dot(n,dx))/R**3
    for full in [False,True]:
        assert norm(variation(h,dx,z,z,z,full=full)-expected)<mp.mpf('1e-55')
    a=vec(1,2,3); zero=variation(h,z,z,a,z)
    expected=(n*dot(n,a)-a)/R
    assert norm(zero-expected)<mp.mpf('1e-55')
    assert abs(variation(h,z,z,vec(0,0,1),z)[2]+1/R)<mp.mpf('1e-55')
    return dict(static_cartesian=True,neutral_delayed_acceleration=True,precision=mp.mp.dps)
def chord(beta,j):
    alpha=j*mp.pi/2; lo=mp.mpf(0); hi=mp.mpf(2)
    for k in range(220):
        z=(lo+hi)/2
        if norm(vec(1,0,0)-vec(mp.cos(alpha-beta*z),mp.sin(alpha-beta*z),0))-z>0:lo=z
        else:hi=z
    return (lo+hi)/2

def unit_hits(beta):
    out=[]
    for j in [1,2,3]:
        zz=chord(beta,j); theta=j*mp.pi/2-beta*zz; e=vec(mp.cos(theta),mp.sin(theta),0)
        h=hit(zz,(vec(1,0,0)-e)/zz,beta*J*e,-beta**2*e,beta*vec(0,1,0))
        out.append(h)
    return out

def coefficient(beta,full=False):
    out=vec(0,0,0)
    for j,h in enumerate(unit_hits(beta),1):
        E=h['E']; row=E if not full else (1-dot(h['u'],h['n']))*E+h['n']*dot(h['u'],E)
        out+=(-1)**j*row
    return out

def ring(beta,full):
    r=-coefficient(beta,full)[0]/beta**2; om=beta/r; rows=[]
    for h in unit_hits(beta):
        rows.append(hit(r*h['R'],h['n'],h['v'],h['a']/r,h['u']))
    return dict(beta=beta,r=r,omega=om,rows=rows,full=full)

def vertical_coeffs(case):
    out=[]
    for h in case['rows']:
        R,D=h['R'],h['D']; H=1-dot(h['v'],h['v'])+R*dot(h['n'],h['a'])
        a=H/(R**3*D**3); b=-H/(R**2*D**3); c=-1/(R*D**2)
        if case['full']:a=D*a+dot(h['u'],h['E'])/R; b*=D; c*=D
        out.append((R,a,b,c))
    return out

def chi(case,m,lam,derivative=False):
    ans=2*lam if derivative else lam**2
    for j,(tau,a,b,c) in enumerate(vertical_coeffs(case),1):
        s=(-1)**j; phase=mp.exp(1j*m*j*mp.pi/2-lam*tau); pol=a-b*lam-c*lam**2
        if derivative: ans+=s*phase*(-tau*pol-b-2*c*lam)
        else:ans+=s*(-a+phase*pol)
    return ans

def cart_action(case,lam,z):
    om=case['omega']; Lop=lam*I+om*J; result=[]
    for i in range(4):
        lhs=Lop**2*z[i]; rhs=vec(0,0,0); Qi=rot(i*mp.pi/2)
        for j,h0 in enumerate(case['rows'],1):
            k=(i+j)%4; h=hit(h0['R'],Qi*h0['n'],Qi*h0['v'],Qi*h0['a'],Qi*h0['u'])
            f=mp.exp(-lam*h['R']); Qd=rot(-om*h['R'])
            dx=z[i]-f*Qd*z[k]; dvs=f*Qd*Lop*z[k]; das=f*Qd*(Lop**2)*z[k]
            rhs+=(-1)**j*variation(h,dx,dvs,das,Lop*z[i],jerk=-om**2*h['v'],full=case['full'])
        result.append(lhs-rhs)
    return result

def cart_matrix(case,lam):
    mat=mp.matrix(12,12)
    for col in range(12):
        z=[vec(0,0,0) for k in range(4)]; z[col//3][col%3]=1
        out=cart_action(case,lam,z)
        for row in range(12):mat[row,col]=out[row//3][row%3]
    return mat

def ring_controls(case):
    om=case['omega']; tol=mp.mpf('1e-24')
    tests=[abs(chi(case,0,0)),abs(chi(case,0,0,True)),abs(chi(case,1,1j*om)),abs(chi(case,3,-1j*om))]
    for t in tests:assert t<tol,str(t)
    lam=om*(mp.mpf('.31')+mp.mpf('.72')*1j)
    for m in range(4):
        z=[vec(0,0,mp.exp(1j*m*i*mp.pi/2)) for i in range(4)]
        out=cart_action(case,lam,z)
        for i in range(4):assert abs(out[i][2]-chi(case,m,lam)*z[i][2])<mp.mpf('1e-50')
        assert max(abs(out[i][k]) for i in range(4) for k in [0,1])<mp.mpf('1e-50')
    # Tilt mode residual in full Cartesian operator and vertical block are independent code paths.
    z=[vec(0,0,mp.exp(1j*i*mp.pi/2)) for i in range(4)]
    assert max(mag(x) for x in cart_action(case,1j*om,z))<tol
    # Time translation and in-plane rigid rotation: stationary rotating-frame tangent.
    z=[J*(case['r']*vec(mp.cos(i*mp.pi/2),mp.sin(i*mp.pi/2),0)) for i in range(4)]
    assert max(mag(x) for x in cart_action(case,0,z))<tol
    return dict(symmetry_residuals=[mp.nstr(t,30) for t in tests],vertical_equals_cartesian=True,rotation_mode=True)

def screen(case):
    om=case['omega']; roots=[]
    f=lambda p:chi(case,screen.m,p*om)/om**2
    df=lambda p:chi(case,screen.m,p*om,True)/om
    for m in range(4):
        screen.m=m
        for re in ['.1','.5','1','2','4','7']:
            for im in range(-11,12):
                try:p=mp.findroot(f,mp.mpc(re,im),df=df,solver='newton',tol=mp.mpf('1e-42'),maxsteps=60)
                except (ValueError,ZeroDivisionError,OverflowError):continue
                if not (mp.mpf('1e-15')<p.real<8 and abs(p.imag)<12):continue
                if any(m==q['m'] and abs(p-q['p'])<mp.mpf('1e-20') for q in roots):continue
                residual=abs(f(p)); z=[vec(0,0,mp.exp(1j*m*i*mp.pi/2)) for i in range(4)]
                cartres=max(mag(x) for x in cart_action(case,p*om,z))
                roots.append(dict(m=m,p=p,lambda_=p*om,residual=residual,cartesian_residual=cartres))
    return [dict(m=q['m'],p=[mp.nstr(q['p'].real,45),mp.nstr(q['p'].imag,45)],lambda_=[mp.nstr(q['lambda_'].real,45),mp.nstr(q['lambda_'].imag,45)],residual=mp.nstr(q['residual'],10),cartesian_residual=mp.nstr(q['cartesian_residual'],10)) for q in roots]

if __name__=='__main__':
    parser=argparse.ArgumentParser(); parser.add_argument('--controls',action='store_true'); parser.add_argument('--screen',action='store_true'); args=parser.parse_args()
    assert args.controls,'Known controls are mandatory.'
    known=controls(); print(json.dumps({'known_case_before_target':known}),flush=True)
    cert=json.loads(Path('.local-data/master-equation-closure/braid-program/maxwell-shaped-overnight-independent/ring-outward-balance-certificate.json').read_text())['certificate']
    blo,bhi=map(mp.mpf,cert['beta']); beta=mp.findroot(lambda b:coefficient(b)[1],(blo,bhi),tol=mp.mpf('1e-55'))
    assert blo<beta<bhi
    cases=[ring(beta,False),ring(beta,True)]
    for c in cases:print(json.dumps({'law':'E+M' if c['full'] else 'E','beta':mp.nstr(beta,50),'radius':mp.nstr(c['r'],50),'controls':ring_controls(c)}),flush=True)
    if args.screen:
        assert hashlib.sha256(b'abc').hexdigest()=='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
        digest=hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
        print(json.dumps({'pre_target_screen_source_sha256':digest,'screen_box':'0<Re(lambda/omega)<8, |Im(lambda/omega)|<12','complete_root_census':False}),flush=True)
        for c in cases:print(json.dumps({'law':'E+M' if c['full'] else 'E','growing_vertical_roots':screen(c)}),flush=True)
