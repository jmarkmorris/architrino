#!/usr/bin/env python3
"""Bounded BP-011 comparison instrument, not an evolution solver.

Separately constructs the implicit emission variation from vector geometry.
No production, frozen oracle, or original first-variation implementation imports.
Run --stage known, controls, target in that order; receipts gate target use.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/bp-011-t02-characteristic'
SOURCE = ROOT / '.local-data/braid-analysis/b13-velocity-search/2026-08-29-b13-equal-radius-interval-zero-count.v1.json'
FROZEN = 'fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af'
BRANCHES = [(m, 'descending') for m in range(-5, 1)] + [(1, 'rising'), (1, 'descending')]
mp.mp.dps = 110
mp.iv.dps = 90

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def enc(x):
    if isinstance(x, dict): return {k: enc(v) for k,v in x.items()}
    if isinstance(x, (tuple,list)): return [enc(v) for v in x]
    if isinstance(x, (int,str,bool)) or x is None: return x
    if hasattr(x, '_mpi_'): return [mp.nstr(mp.mpf(x.a), 75), mp.nstr(mp.mpf(x.b), 75)]
    if isinstance(x, mp.mpc): return [mp.nstr(x.real,75),mp.nstr(x.imag,75)]
    return mp.nstr(x,75)

def receipt(stage, data):
    exact={}
    def inventory(value,path):
        if hasattr(value,'_mpi_'):
            exact[path]=[list(t) for t in value._mpi_]
        elif isinstance(value,dict):
            for k,v in value.items():inventory(v,path+'/'+k)
        elif isinstance(value,(list,tuple)):
            for k,v in enumerate(value):inventory(v,path+'/'+str(k))
    inventory(data,'')
    payload = {'stage':stage,'instrumentSha256':digest(Path(__file__)),
               'pointDps':mp.mp.dps,'intervalDps':mp.iv.dps,'c_f':1,
               'intervalDecimalDisplay':'rounded display only; exactIntervalBinaryBounds are authoritative',
               'exactIntervalBinaryBounds':exact,**data}
    OUT.mkdir(parents=True,exist_ok=True)
    path = OUT / (stage+'.json')
    path.write_text(json.dumps(enc(payload),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'path':str(path.relative_to(ROOT)),'sha256':digest(path)}))

def prerequisite(stage):
    p = json.loads((OUT/(stage+'.json')).read_text())
    assert p['instrumentSha256'] == digest(Path(__file__)) and p['passed']

def dot(a,b): return sum(x*y for x,y in zip(a,b))
def add(a,b): return [x+y for x,y in zip(a,b)]
def scale(k,a): return [k*x for x in a]
def rotate(c,s,u): return [c*u[0]-s*u[1],s*u[0]+c*u[1]]

def hit_variation(n,ell,v,acc,D,polarity,dreceiver,dsource,dsource_velocity):
    # Differentiate g=|Xr-Xs(s)|+s at reception T=0. g_s=D.
    fixed = add(dreceiver,scale(-1,dsource))
    ds = -dot(n,fixed)/D
    dr = add(fixed,scale(-ds,v))
    dl = dot(n,dr)
    dn = scale(1/ell,add(dr,scale(-dl,n)))
    dv = add(dsource_velocity,scale(ds,acc))
    dD = -dot(dn,v)-dot(n,dv)
    # On either sign chart d log |D| = dD / D.
    return scale(polarity/(ell*ell*abs(D)),add(dn,scale(-(2*dl/ell+dD/D),n)))

def root_point(beta,m,side):
    turn = mp.acos(1/beta)
    lo,hi = (mp.mpf(0),turn) if side=='rising' else (turn,mp.pi)
    f=lambda x: beta*mp.sin(x)-x-m*mp.pi/6
    # Concavity supplies this complete monotone chart, no scanning.
    if m<0: lo=mp.mpf(0)
    fl=f(lo)
    assert fl*f(hi)<0
    for _ in range(370):
        mid=(lo+hi)/2
        fm=f(mid)
        if fm==0: return mid
        if fm*fl>0: lo,fl=mid,fm
        else: hi=mid
    return (lo+hi)/2

def scalar_ledger(beta):
    cr=ct=mp.mpf(0)
    for m,side in BRANCHES:
        x=root_point(beta,m,side)
        s,c=mp.sin(x),mp.cos(x)
        d=1-beta*c
        cr+=(-1)**m/(4*s*abs(d))
        ct+=(-1)**m*c/(4*s*s*abs(d))
    return cr,ct

def scalar_derivative(beta):
    # Independently differentiate the scalar lattice roots, F_v=-D.
    crp=ctp=mp.mpf(0)
    for m,side in BRANCHES:
        x=root_point(beta,m,side)
        s,c=mp.sin(x),mp.cos(x); D=1-beta*c
        xp=s/D; Dp=-c+beta*s*xp; sigma=(-1)**m
        crp-=sigma/(4*s*abs(D))*(c*xp/s+Dp/D)
        ctp+=sigma/(4*abs(D))*(-(1+c*c)*xp/s**3-c*Dp/(s*s*D))
    return crp,ctp

def reference():
    assert digest(SOURCE)==FROZEN
    packet=json.loads(SOURCE.read_text())
    row=next(x for x in packet['intervals'] if x['topologyIntervalId']=='T02')
    bracket=list(map(mp.mpf,row['zeros'][0]['betaBracket']))
    beta=mp.findroot(lambda b:scalar_ledger(b)[1],bracket,tol=mp.mpf('1e-95'))
    assert bracket[0]<beta<bracket[1]
    cr,ct=scalar_ledger(beta)
    radius=-cr/beta**2  # K=R_*=1. Balance: -Omega^2 R = Cr/R^2.
    return beta,radius,beta/radius

def coefficients(beta,R,root_values=None,ctx=mp):
    omega=beta/R
    coeff=[]
    for k,(m,side) in enumerate(BRANCHES):
        x=root_point(beta,m,side) if root_values is None else root_values[k]
        s,c=ctx.sin(x),ctx.cos(x)
        ell=2*R*s
        bc,bs=ctx.cos(2*x),-ctx.sin(2*x)
        n=[s,c]
        vel=scale(beta,rotate(bc,bs,[0,1]))
        acc=scale(-omega**2*R,rotate(bc,bs,[1,0]))
        D=1-dot(n,vel)
        def column(u,z,E):
            us=scale(E,rotate(bc,bs,u))
            vs=scale(E,rotate(bc,bs,add(scale(z,u),scale(omega,[-u[1],u[0]]))))
            return hit_variation(n,ell,vel,acc,D,(-1)**m,u,us,vs)
        matrices=[]
        for z,E in [(0,0),(0,1),(1,1)]:
            cols=[column(u,z,E) for u in ([1,0],[0,1])]
            matrices.append([[cols[j][i] for j in range(2)] for i in range(2)])
        C=matrices[0]
        F=[[matrices[1][i][j]-C[i][j] for j in range(2)] for i in range(2)]
        H=[[matrices[2][i][j]-matrices[1][i][j] for j in range(2)] for i in range(2)]
        coeff.append({'m':m,'side':side,'v':x,'delay':ell,'D':D,'C':C,'F':F,'H':H})
    return coeff

def matrix(z,coef,omega,ctx=mp):
    A=[[z*z-omega*omega,-2*omega*z],[2*omega*z,z*z-omega*omega]]
    for row in coef:
        E=ctx.exp(-z*row['delay'])
        for i in range(2):
            for j in range(2): A[i][j]-=row['C'][i][j]+E*(row['F'][i][j]+z*row['H'][i][j])
    return A

def determinant(A): return A[0][0]*A[1][1]-A[0][1]*A[1][0]
def characteristic(z,coef,R,omega,ctx=mp): return R*determinant(matrix(z,coef,omega,ctx))/z

def lower(x): return mp.mpf(x.a)
def upper(x): return mp.mpf(x.b)
def sign(x):
    return 1 if lower(x)>0 else -1 if upper(x)<0 else 0

def interval_root_at(beta,m,side):
    x=root_point(beta,m,side)
    lo,hi=x-mp.mpf('1e-75'),x+mp.mpf('1e-75')
    f=lambda v:mp.iv.mpf(beta)*mp.iv.sin(mp.iv.mpf(v))-mp.iv.mpf(v)-m*mp.iv.pi/6
    X=mp.iv.mpf([lo,hi]); slope=mp.iv.mpf(beta)*mp.iv.cos(X)-1
    left=-1 if side=='rising' else 1
    assert sign(f(lo))==left and sign(f(hi))==-left and sign(slope)==-left
    return X,{'beta':beta,'m':m,'side':side,'v':X,'leftResidual':f(lo),'rightResidual':f(hi),'rootJacobian':slope}

def interval_ledger(beta,xs):
    cr=ct=crp=ctp=mp.iv.mpf(0)
    for (m,side),x in zip(BRANCHES,xs):
        s,c=mp.iv.sin(x),mp.iv.cos(x); D=1-beta*c
        assert sign(D)==(-1 if side=='rising' else 1)
        xp=s/D;Dp=-c+beta*s*xp; sigma=(-1)**m
        ar=sigma/(4*s*abs(D));at=sigma*c/(4*s*s*abs(D))
        cr+=ar;ct+=at
        crp-=ar*(c*xp/s+Dp/D)
        ctp+=sigma/(4*abs(D))*(-(1+c*c)*xp/s**3-c*Dp/(s*s*D))
    return cr,ct,crp,ctp

def certificate():
    prerequisite('known');prerequisite('controls');prerequisite('target')
    source=json.loads(SOURCE.read_text())
    original=next(x for x in source['intervals'] if x['topologyIntervalId']=='T02')['zeros'][0]['betaBracket']
    blo,bhi=map(mp.mpf,original);B=mp.iv.mpf([blo,bhi])
    roots=[];boxes=[];ends=[[],[]]
    for m,side in BRANCHES:
        xl,cl=interval_root_at(blo,m,side);xh,ch=interval_root_at(bhi,m,side)
        ends[0].append(xl);ends[1].append(xh);boxes.extend([cl,ch])
        roots.append(mp.iv.mpf([min(lower(xl),lower(xh)),max(upper(xl),upper(xh))]))
    left=interval_ledger(mp.iv.mpf(blo),ends[0]);right=interval_ledger(mp.iv.mpf(bhi),ends[1])
    cr,ct,crp,ctp=interval_ledger(B,roots)
    assert sign(left[1])==-1 and sign(right[1])==1 and sign(ctp)==1 and sign(cr)==-1
    R=-cr/B**2;omega=B/R
    coef=coefficients(B,R,roots,mp.iv)
    # In Re(z)>=0, |exp(-z delay)|<=1. The induced infinity norm
    # gives |z|^2 <= B1 |z| + B0 for every determinant zero.
    norm=lambda M:max(upper(sum(abs(M[i][j]) for j in range(2))) for i in range(2))
    Csum=[[sum(row['C'][i][j] for row in coef) for j in range(2)] for i in range(2)]
    b1=2*mp.ceil(upper(omega))+sum(mp.ceil(norm(row['H'])) for row in coef)
    b0=mp.ceil(upper(omega**2))+mp.ceil(norm(Csum))+sum(mp.ceil(norm(row['F'])) for row in coef)
    confinement=mp.ceil((b1+mp.sqrt(b1*b1+4*b0))/2)+1
    assert confinement**2>b1*confinement+b0
    beta,r,w=reference();pointcoef=coefficients(beta,r)
    witnesses=[]
    for lo,hi in [('0.85','0.9'),('10.65','10.7')]:
        proposal=mp.findroot(lambda z:characteristic(z,pointcoef,r,w),(mp.mpf(lo),mp.mpf(hi)))
        endpoints=[proposal-mp.mpf('1e-20'),proposal+mp.mpf('1e-20')]
        vals=[characteristic(mp.iv.mpf(z),coef,R,omega,mp.iv) for z in endpoints]
        assert sign(vals[0])*sign(vals[1])==-1
        witnesses.append({'zBracket':endpoints,'endpointG':vals,'endpointSigns':[sign(v) for v in vals],
                          'verdict':'at least one positive real characteristic root by continuity; multiplicity/count not claimed'})
    receipt('certificate',{'passed':True,'controlsReceiptSha256':digest(OUT/'controls.json'),
        'targetReceiptSha256':digest(OUT/'target.json'),'sourceSha256':digest(SOURCE),
        'betaBracket':B,'balanceEndpointCt':[left[1],right[1]],'Cr':cr,'Ct':ct,'CtPrime':ctp,'R':R,'Omega':omega,
        'rootEndpointCertificates':boxes,'rootEnclosures':coef,'rootsPerReceiver':8,'directedRootCount':48,
        'ordinarySelfRootsPerReceiver':1,'minimumAbsoluteD':min(lower(abs(row['D'])) for row in coef),
        'rootCompletenessBasis':'strict concavity F_beta(v); m=-5..-1 descending, m=0 positive descending self, m=1 rising and descending; all endpoint signs and D sign certified',
        'positiveRealWitnesses':witnesses,'complexCount':'not performed; unnecessary for existence of a growing symmetric characteristic mode',
        'rightHalfPlaneConfinement':{'B1':b1,'B0':b0,'radius':confinement,'strictSlack':confinement**2-b1*confinement-b0},
        'arithmetic':'mpmath 1.3.0 libmpi outward-rounded interval arithmetic at 90 decimal digits'})

def known():
    # A stationary transmitter at the origin and receiver at (2,0):
    # d[n/ell^2]/dXr = diag(-2,1)/2^3, since D=1 and v=0.
    got=[hit_variation([1,0],mp.mpf(2),[0,0],[0,0],mp.mpf(1),1,u,[0,0],[0,0]) for u in ([1,0],[0,1])]
    expected=[[mp.mpf('-0.25'),0],[0,mp.mpf('0.125')]]
    err=max(abs(got[j][i]-expected[j][i]) for i in range(2) for j in range(2))
    assert err==0
    receipt('known',{'passed':True,'knownInput':'static source, ell=2, D=1, K=1','expectedColumns':expected,'returnedColumns':got,'maximumError':err})

def controls():
    prerequisite('known')
    beta,R,omega=reference()
    coef=coefficients(beta,R)
    A0=matrix(0,coef,omega)
    phase=max(abs(A0[i][1]) for i in range(2))
    crp,ctp=scalar_derivative(beta)
    radial=[-3*omega**2-beta*crp/R**3,-beta*ctp/R**3]
    freq=[-2*omega-crp/R**2,-ctp/R**2]
    deriv=[mp.diff(lambda z:matrix(z,coef,omega)[i][1],0) for i in range(2)]
    radial_err=max(abs(A0[i][0]-radial[i]) for i in range(2))
    freq_err=max(abs(deriv[i]-freq[i]) for i in range(2))
    g0=R*(A0[0][0]*deriv[1]-A0[1][0]*deriv[0])
    g_expected=omega**2*ctp/R
    gerr=abs(g0-g_expected)
    # Independent nonlinear single-row check on the negative-D rising root.
    row=next(r for r in coef if r['D']<0)
    m,x=row['m'],row['v']
    z=mp.mpf('0.7'); u=[mp.mpf('0.3'),mp.mpf('-0.2')]
    source_phase=(m%6)*mp.pi/3
    def nonlinear(eps):
        xr=[R+eps*u[0],eps*u[1]]
        def source(t): return rotate(mp.cos(omega*t+source_phase),mp.sin(omega*t+source_phase),[R+eps*mp.exp(z*t)*u[0],eps*mp.exp(z*t)*u[1]])
        def velocity(t):
            w=mp.exp(z*t)
            return rotate(mp.cos(omega*t+source_phase),mp.sin(omega*t+source_phase),[eps*w*(z*u[0]-omega*u[1]),omega*R+eps*w*(z*u[1]+omega*u[0])])
        t=mp.findroot(lambda t:mp.sqrt(dot(add(xr,scale(-1,source(t))),add(xr,scale(-1,source(t)))))+t,-row['delay'])
        r=add(xr,scale(-1,source(t))); ell=mp.sqrt(dot(r,r)); n=scale(1/ell,r)
        D=1-dot(n,velocity(t))
        return scale((-1)**m/(ell**2*abs(D)),n)
    h=mp.mpf('1e-35')
    plus,minus=nonlinear(h),nonlinear(-h)
    finite=scale(1/(2*h),add(plus,scale(-1,minus)))
    analytic=[sum((row['C'][i][j]+mp.exp(-z*row['delay'])*(row['F'][i][j]+z*row['H'][i][j]))*u[j] for j in range(2)) for i in range(2)]
    nonlinear_err=max(abs(finite[i]-analytic[i]) for i in range(2))
    tail=[{'z':z,'G_over_R_z3':characteristic(mp.mpf(z),coef,R,omega)/(R*mp.mpf(z)**3)} for z in [100,1000,10000]]
    passed=max(phase,radial_err,freq_err,gerr)<mp.mpf('1e-75') and nonlinear_err<mp.mpf('1e-60') and abs(tail[-1]['G_over_R_z3']-1)<mp.mpf('1e-5')
    assert passed
    receipt('controls',{'passed':passed,'knownReceiptSha256':digest(OUT/'known.json'),'sourceSha256':digest(SOURCE),'beta':beta,'R':R,'Omega':omega,'rootRows':coef,'directedRootCount':48,'phaseError':phase,'radialFamilyError':radial_err,'frequencyFamilyError':freq_err,'G0':g0,'G0Expected':g_expected,'G0Error':gerr,'CrPrime':crp,'CtPrime':ctp,'negativeDRowFiniteDifferenceError':nonlinear_err,'largeRealControl':tail})

def target():
    prerequisite('known'); prerequisite('controls')
    beta,R,omega=reference(); coef=coefficients(beta,R)
    grid=[mp.mpf('1e-8')]+[mp.mpf(i)/20 for i in range(1,2001)]
    vals=[characteristic(z,coef,R,omega) for z in grid]
    changes=[(grid[i-1],grid[i]) for i in range(1,len(grid)) if vals[i-1]*vals[i]<0]
    receipt('target',{'passed':True,'controlsReceiptSha256':digest(OUT/'controls.json'),'grade':'measured point diagnostic only','domain':['1e-8','100'],'step':'0.05 after first endpoint','minimumSample':min(vals),'sampleAtMinimum':grid[vals.index(min(vals))],'signChangeBrackets':changes,'firstValue':vals[0],'lastValue':vals[-1],'complexDomain':'unresolved entire Re(z)>0; no contour count performed'})

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--stage',choices=['known','controls','target','certificate'],required=True)
    args=parser.parse_args(); {'known':known,'controls':controls,'target':target,'certificate':certificate}[args.stage]()
