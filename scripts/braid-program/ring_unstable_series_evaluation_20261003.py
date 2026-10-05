#!/usr/bin/env python3
"""Finite ancient-history Taylor jets, not an EOM continuation instrument.

Known analytical controls precede the target. Frozen interval characteristic
coefficients are consumed as inherited premises, never edited or imported.
No numerical convergence radius or nonlinear remainder bound is claimed.
"""
import argparse
import hashlib
import json
from pathlib import Path
import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.local-data/ring-exploration/unstable-series'
CERT = ROOT / '.local-data/bp-011-t02-characteristic/certificate.json'
CONTROL = ROOT / '.local-data/bp-011-t02-characteristic/controls.json'
CERT_SHA = 'ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6'
mp.mp.dps = 110
mp.iv.dps = 90
ORDER = 8

def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def encode(v):
    if isinstance(v, dict): return {k:encode(x) for k,x in v.items()}
    if isinstance(v, (tuple,list)): return [encode(x) for x in v]
    if isinstance(v, (str,int,bool)) or v is None: return v
    if hasattr(v,'_mpi_'):
        return {'display':[mp.nstr(mp.mpf(t),75) for t in v._mpi_],
                'binary':[list(t) for t in v._mpi_]}
    return mp.nstr(v,80)
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True)
    p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'stage':stage,'instrumentSha256':sha(Path(__file__)),
                                  'K':1,'c_f':1,'order':ORDER,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'sha256':sha(p),'path':str(p.relative_to(ROOT))}))
def prerequisite():
    known=json.loads((OUT/'known.json').read_text())
    assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))

class Jet:
    def __init__(self, value=0):
        self.c = list(value)+[mp.mpf(0)]*(ORDER+1-len(value)) if isinstance(value,list) else [mp.mpf(value)]+[mp.mpf(0)]*ORDER
    def __add__(self, other):
        other=J(other); return Jet([a+b for a,b in zip(self.c,other.c)])
    __radd__=__add__
    def __neg__(self): return Jet([-a for a in self.c])
    def __sub__(self, other): return self+-J(other)
    def __rsub__(self, other): return J(other)+-self
    def __mul__(self,other):
        other=J(other)
        return Jet([sum(self.c[k]*other.c[n-k] for k in range(n+1)) for n in range(ORDER+1)])
    __rmul__=__mul__
    def inv(self):
        b=[1/self.c[0]]
        for n in range(1,ORDER+1): b.append(-sum(self.c[k]*b[n-k] for k in range(1,n+1))/self.c[0])
        return Jet(b)
    def __truediv__(self,other): return self*J(other).inv()
    def __rtruediv__(self,other): return J(other)*self.inv()
    def exp(self):
        b=[mp.exp(self.c[0])]
        for n in range(1,ORDER+1): b.append(sum(k*self.c[k]*b[n-k] for k in range(1,n+1))/n)
        return Jet(b)
    def sincos(self):
        s=[mp.sin(self.c[0])];c=[mp.cos(self.c[0])]
        for n in range(1,ORDER+1):
            s.append(sum(k*self.c[k]*c[n-k] for k in range(1,n+1))/n)
            c.append(-sum(k*self.c[k]*s[n-k] for k in range(1,n+1))/n)
        return Jet(s),Jet(c)
    def sqrt(self):
        b=[mp.sqrt(self.c[0])]
        for n in range(1,ORDER+1): b.append((self.c[n]-sum(b[k]*b[n-k] for k in range(1,n)))/(2*b[0]))
        return Jet(b)
    def compose(self,arg):
        out=Jet(0)
        for a in reversed(self.c): out=out*arg+a
        return out
    def euler(self): return Jet([n*a for n,a in enumerate(self.c)])
def J(x):return x if isinstance(x,Jet) else Jet(x)
Q=Jet([0,1])
def rotate(angle,vec):
    s,c=angle.sincos();return [c*vec[0]-s*vec[1],s*vec[0]+c*vec[1]]
def dot(a,b):return sum(x*y for x,y in zip(a,b))

def known():
    shifted=2+Q
    delay=dot([shifted,J(0)],[shifted,J(0)]).sqrt()
    acceleration=1/(shifted*shifted)
    exact=[mp.mpf((-1)**n*(n+1))/2**(n+2) for n in range(ORDER+1)]
    assert delay.c==shifted.c and acceleration.c==exact
    exponential=(Q*mp.mpf('0.7')).exp()
    s,c=Q.sincos()
    errors=[max(abs(exponential.c[n]-mp.mpf('0.7')**n/mp.factorial(n)) for n in range(ORDER+1)),
            max(abs((s*s+c*c).c[n]-(1 if n==0 else 0)) for n in range(ORDER+1)),
            max(abs((1+Q).compose(Q/(1+Q)).c[n]-(J(1)+Q/(1+Q)).c[n]) for n in range(ORDER+1))]
    assert max(errors)<mp.mpf('1e-105')
    save('known',{'passed':True,'staticDelay':delay.c,'staticAcceleration':acceleration.c,
                  'analyticalStaticCoefficients':exact,'expTrigCompositionErrors':errors})

def binary_interval(packet,key):
    # Authoritative binary endpoints; decimal displays are never reused.
    bounds=packet['exactIntervalBinaryBounds'][key]
    return mp.iv.mpf([mp.mpf(tuple(v)) for v in bounds])
def det(a):return a[0][0]*a[1][1]-a[0][1]*a[1][0]
def certificate_matrix(z,packet):
    w=binary_interval(packet,'/Omega')
    a=[[z*z-w*w,-2*w*z],[2*w*z,z*z-w*w]]
    for n in range(8):
        ell=binary_interval(packet,f'/rootEnclosures/{n}/delay'); e=mp.iv.exp(-z*ell)
        for i in range(2):
            for j in range(2):
                a[i][j]-=binary_interval(packet,f'/rootEnclosures/{n}/C/{i}/{j}')+e*(binary_interval(packet,f'/rootEnclosures/{n}/F/{i}/{j}')+z*binary_interval(packet,f'/rootEnclosures/{n}/H/{i}/{j}'))
    return a
def point_matrix(z,rows,w):
    a=mp.matrix([[z*z-w*w,-2*w*z],[2*w*z,z*z-w*w]])
    for row in rows:
        e=mp.exp(-z*mp.mpf(row['delay']))
        for i in range(2):
            for j in range(2): a[i,j]-=mp.mpf(row['C'][i][j])+e*(mp.mpf(row['F'][i][j])+z*mp.mpf(row['H'][i][j]))
    return a

def geometry(u,d,row,lam,R,w):
    ell0=mp.mpf(row['delay']);x=mp.mpf(row['v'])
    arg=Q*(-lam*d).exp()
    src=[R+u[0].compose(arg),u[1].compose(arg)]
    angle=-2*x-w*(d-ell0)
    pos=rotate(angle,src)
    sep=[R+u[0]-pos[0],u[1]-pos[1]]
    ell=dot(sep,sep).sqrt()
    vel=rotate(angle,[lam*u[0].euler().compose(arg)-w*src[1],
                      lam*u[1].euler().compose(arg)+w*src[0]])
    D=1-dot([sep[0]/ell,sep[1]/ell],vel)
    return sep,ell,D
def acceleration(u,rows,lam,R,w):
    acc=[J(0),J(0)];delays=[];factors=[]
    for row in rows:
        d=J(mp.mpf(row['delay']));D0=mp.mpf(row['D'])
        for n in range(1,ORDER+1):
            _,ell,_=geometry(u,d,row,lam,R,w)
            # Gap derivative is -D0: F_n-D0*d_n=0.
            d.c[n]=(ell-d).c[n]/D0
        sep,ell,D=geometry(u,d,row,lam,R,w)
        eps=1 if D0>0 else -1;sig=(-1)**int(row['m'])
        acc=[acc[i]+sig*sep[i]/(ell*ell*ell*eps*D) for i in range(2)]
        delays.append(d.c);factors.append(D.c)
    return acc,delays,factors
def residual(u,rows,lam,R,w):
    acc,d,D=acceleration(u,rows,lam,R,w)
    left=[lam*lam*u[0].euler().euler()-2*w*lam*u[1].euler()-w*w*(R+u[0]),
          lam*lam*u[1].euler().euler()+2*w*lam*u[0].euler()-w*w*u[1]]
    return [left[i]-acc[i] for i in range(2)],d,D
def target():
    prerequisite();assert sha(CERT)==CERT_SHA
    cert=json.loads(CERT.read_text());control=json.loads(CONTROL.read_text())
    # Point trial endpoints were printed to 75 significant figures. A
    # 1e-70 widening encloses their decimal roundoff before interval reuse.
    trial=list(map(mp.mpf,cert['positiveRealWitnesses'][1]['zBracket']))
    lam_box=mp.iv.mpf([trial[0]-mp.mpf('1e-70'),trial[1]+mp.mpf('1e-70')])
    normalization_entry=certificate_matrix(lam_box,cert)[0][1]
    assert mp.mpf(normalization_entry.a)>0 or mp.mpf(normalization_entry.b)<0
    nonres=[]
    for n in (2,3,4):
        mat=certificate_matrix(n*lam_box,cert);determinant=det(mat)
        assert mp.mpf(determinant.a)>0 or mp.mpf(determinant.b)<0
        inv=[[mat[1][1]/determinant,-mat[0][1]/determinant],
             [-mat[1][0]/determinant,mat[0][0]/determinant]]
        inv_bound=max(mp.mpf(sum(abs(v) for v in r).b) for r in inv)
        nonres.append({'n':n,'determinant':determinant,'inverseInfinityNormUpper':inv_bound})
    assert mp.mpf(lam_box.a)*5>43
    # ||A(z)^-1|| <= 1/(z^2-B1*z-B0) beyond inherited confinement.
    tail_inverse=1/((5*lam_box)**2-34*(5*lam_box)-318)
    B=max([r['inverseInfinityNormUpper'] for r in nonres]+[mp.mpf(tail_inverse.b)])
    B2=max([r['n']**2*r['inverseInfinityNormUpper'] for r in nonres]+[25*mp.mpf(tail_inverse.b)])
    R,w=mp.mpf(control['R']),mp.mpf(control['Omega']);rows=control['rootRows']
    linear_checks=[]
    for z in (mp.mpf('0.7'),mp.mpf('20')):
        matrix=point_matrix(z,rows,w)
        errors=[]
        for j in range(2):
            trial=[J(0),J(0)];trial[j].c[1]=1
            E,_,_=residual(trial,rows,z,R,w)
            errors.extend(abs(E[i].c[1]-matrix[i,j]) for i in range(2))
        assert max(errors)<mp.mpf('1e-65')
        linear_checks.append({'z':z,'maximumErrorAgainstFrozenVariation':max(errors)})
    lam=mp.findroot(lambda z:mp.det(point_matrix(z,rows,w)),tuple(map(mp.mpf,cert['positiveRealWitnesses'][1]['zBracket'])),tol=mp.mpf('1e-100'))
    assert mp.mpf(lam_box.a)<lam<mp.mpf(lam_box.b)
    a=point_matrix(lam,rows,w);ratio=-a[0,0]/a[0,1]
    u=[J([0,R]),J([0,R*ratio])]
    coefs=[]
    for n in range(2,ORDER+1):
        E,_,_=residual(u,rows,lam,R,w)
        forcing=mp.matrix([-E[i].c[n] for i in range(2)])
        coeff=mp.lu_solve(point_matrix(n*lam,rows,w),forcing)
        for i in range(2):u[i].c[n]=coeff[i]
        coefs.append({'n':n,'coefficient':list(coeff),'forcing':list(forcing)})
    E,d,D=residual(u,rows,lam,R,w)
    errors=[max(abs(E[i].c[n]) for i in range(2)) for n in range(ORDER+1)]
    # Inputs are rounded point copies of an inherited exact reference. Their
    # finite precision explains residuals; this is not interval jet evidence.
    assert max(errors)<mp.mpf('1e-55'), [mp.nstr(x,10) for x in errors]
    evaluations=[]
    for q in map(mp.mpf,['-0.001','0.001','-0.01','0.01','-0.05','0.05','-0.1','0.1']):
        val=lambda c:sum(v*q**n for n,v in enumerate(c))
        ur=[val(v.c) for v in u];du=[lam*val(v.euler().c) for v in u]
        radius=mp.sqrt((R+ur[0])**2+ur[1]**2)
        velocity=[du[0]-w*ur[1],du[1]+w*(R+ur[0])]
        evaluations.append({'q':q,'uTruncation':ur,'rotatingDerivativeTruncation':du,
          'radiusTruncation':radius,'speedTruncation':mp.sqrt(dot(velocity,velocity)),
          'minimumTruncatedDelay':min(val(c) for c in d),
          'minimumAbsoluteTruncatedD':min(abs(val(c)) for c in D),
          'highestCoefficientContributionNorm':mp.sqrt(sum((v.c[ORDER]*q**ORDER)**2 for v in u))})
    save('target',{'passed':True,'grade':'finite formal coefficients measured; no nonlinear remainder enclosure',
      'certificateSha256':sha(CERT),'controlSha256':sha(CONTROL),'lambdaInterval':lam_box,
      'normalizationA12':normalization_entry,
      'nonresonanceDeterminants':nonres,'nAtLeast5Boundary':'n*lambda > 43; inherited RHP confinement',
      'inverseCoefficientNormUpper':B,'twiceWeightedInverseCoefficientNormUpper':B2,
      'nAtLeast5InverseUpper':tail_inverse,
      'lambdaPoint':lam,'R':R,'Omega':w,'u1':[R,R*ratio],'coefficients':coefs,
      'jetLinearCrossChecks':linear_checks,
      'allResidualCoefficients':errors,'delayCoefficients':d,'factorCoefficients':D,
      'formalEvaluations':evaluations,'rootsPerReceiver':8,'directedRootCount':48,
      'ordinarySelfRootsPerReceiver':1,'convergenceRadius':'not quantitatively enclosed',
      'nonlinearFate':'not determined'})

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True)
    args=p.parse_args();{'known':known,'target':target}[args.stage]()
