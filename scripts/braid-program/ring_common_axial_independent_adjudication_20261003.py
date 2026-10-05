"""Independent Cartesian weights and full-rectangle disk homotopy root count.
No subject contour, axial weight, or binary-reader code is imported.
Analytical static and rational root-count controls precede ring targets.
"""
import argparse,hashlib,json
from pathlib import Path
import mpmath as mp
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.local-data/ring-exploration/common-axial-adjudication'
SOURCE=ROOT/'.local-data/ring-exploration/stability'
HASHES={2:'3f44600259557b9736b860a904dc986193b7ca21f33cdbbaeb45f8bc0a440c50',
4:'17b41d073a1aeec059e292b6696ad2fe54c60b27c46d54976848d29062debc4a',
6:'1d01bee2714f3cddc4c65bdfa21b9216ec768edcded5bd5ab6bfe62efcef2e9e'}
mp.mp.dps=120;mp.iv.dps=90
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def low(x):return mp.mpf(x._mpi_[0])
def high(x):return mp.mpf(x._mpi_[1])
def sign(x):return 1 if low(x)>0 else -1 if high(x)<0 else 0
def I(a,b=None):return mp.iv.mpf([a,a if b is None else b])
def read(p,k):return mp.iv.mpf([mp.mpf(tuple(v)) for v in p['exactIntervalBinaryBounds'][k]])
def C(z):return mp.iv.mpc(I(z.real),I(z.imag))
def encode(v):
    if isinstance(v,dict):return {k:encode(x) for k,x in v.items()}
    if isinstance(v,(tuple,list)):return [encode(x) for x in v]
    if hasattr(v,'_mpi_'):return {'binary':[list(t) for t in v._mpi_],'display':[mp.nstr(low(v),45),mp.nstr(high(v),45)]}
    if hasattr(v,'_mpci_'):return {'real':encode(v.real),'imag':encode(v.imag)}
    if hasattr(v,'_mpc_'):return {'real':encode(v.real),'imag':encode(v.imag)}
    if hasattr(v,'_mpf_'):return {'binaryPoint':list(v._mpf_),'display':mp.nstr(v,55)}
    return v
def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    p.write_text(json.dumps(encode({'passed':True,'instrumentSha256':sha(Path(__file__)),'K':1,'c_f':1,**data}),indent=2,sort_keys=True)+'\n')
    print(json.dumps({'stage':stage,'sha256':sha(p)}),flush=True)
def midpoint(v):return mp.mpc((low(v.real)+high(v.real))/2,(low(v.imag)+high(v.imag))/2)
def axial_weight(receiver,source,velocity,polarity):
    separation=[receiver[k]-source[k] for k in range(2)]
    ell=mp.iv.sqrt(sum(v*v for v in separation))
    D=1-sum(separation[k]*velocity[k] for k in range(2))/ell
    assert sign(D)
    return polarity/(ell**3*abs(D)),ell,D,separation
def complete_count(fun,derivative,gamma,L):
    # The entire rectangle is traversed counterclockwise, without symmetry
    # reduction or the subject's negative-ray endpoint-turn formula.
    vertices=[mp.mpc(-gamma,-L),mp.mpc(L,-L),mp.mpc(L,L),mp.mpc(-gamma,L)]
    panels=[]
    def panel(a,b,depth):
        mid=(a+b)/2
        box=mp.iv.mpc(I(min(a.real,b.real),max(a.real,b.real)),I(min(a.imag,b.imag),max(a.imag,b.imag)))
        value=fun(C(mid));center=midpoint(value)
        derivativeCap=high(abs(derivative(box)))
        centerError=high(abs(value-C(center)))
        radius=high(I(abs(b-a)/2)*I(derivativeCap)+I(centerError)+I('1e-75')*(1+abs(C(center))))
        pa,pb=midpoint(fun(C(a))),midpoint(fun(C(b)))
        # A convex zero-free disk contains the full analytic image and both
        # selected point vertices; this is a continuous homotopy certificate.
        if high(abs(C(center)))>radius and low(abs(C(center)))>radius and high(abs(C(pa)-C(center)))<=radius and high(abs(C(pb)-C(center)))<=radius:
            panels.append({'from':a,'to':b,'center':center,'diskRadius':radius,'derivativeCap':derivativeCap,'vertexStart':pa,'vertexEnd':pb});return
        assert depth<27,('unresolved disk',a,b)
        panel(a,mid,depth+1);panel(mid,b,depth+1)
    for a,b in zip(vertices,vertices[1:]+vertices[:1]):panel(a,b,0)
    assert all(panels[k]['vertexEnd']==panels[(k+1)%len(panels)]['vertexStart'] for k in range(len(panels)))
    winding=0;crossings=[]
    for p in panels:
        a,b=p['vertexStart'],p['vertexEnd']
        assert a!=0 and b!=0
        # Half-open ray convention counts a shared real-axis vertex once.
        if (a.imag<=0<b.imag) or (b.imag<=0<a.imag):
            cross=(I(a.real)*I(b.imag)-I(b.real)*I(a.imag))/(I(b.imag)-I(a.imag))
            assert sign(cross)
            if sign(cross)>0:
                change=1 if b.imag>a.imag else -1;winding+=change
                crossings.append({'crossReal':cross,'change':change})
    assert winding>=0
    return {'orientation':'counterclockwise full rectangle','panels':panels,'positiveRayCrossings':crossings,'zeroCount':winding}
def known():
    w,ell,D,_=axial_weight([I(2),I(0)],[I(0),I(0)],[I(0),I(0)],1)
    assert low(w)==high(w)==mp.mpf(1)/8 and low(ell)==high(ell)==2 and low(D)==high(D)==1
    stable=complete_count(lambda z:z+1,lambda z:mp.iv.mpc(1),mp.mpf('.1'),mp.mpf(20));assert stable['zeroCount']==0
    def growing(z):return ((z-I('.5'))**2+1)/(z+3)
    def derivative(z):return (2*(z-I('.5'))*(z+3)-((z-I('.5'))**2+1))/(z+3)**2
    unstable=complete_count(growing,derivative,mp.mpf('.1'),mp.mpf(20));assert unstable['zeroCount']==2
    r=I('19.9');outer=(4*r+I('1.25'))/(r-3);assert high(outer)<low(r)
    save('known',{'staticAxialDerivative':w,'stable':stable,'growing':unstable,'rationalOuterPerturbation':outer,'rationalOuterRadiusFloor':r,'rationalCorrection':'G-z=(-4z+1.25)/(z+3)'})
def target():
    p=json.loads((OUT/'known.json').read_text());assert p['passed'] and p['instrumentSha256']==sha(Path(__file__))
    reports=[]
    for t,g,L in [(2,'.4',7),(4,'1',20),(6,'.5',38)]:
        path=SOURCE/f'T{t:02d}-certificate.json';assert sha(path)==HASHES[t]
        packet=json.loads(path.read_text());assert packet['passed']
        beta,R,Omega=read(packet,'/beta'),read(packet,'/R'),read(packet,'/Omega')
        expected=[(m,1) for m in range(-5,1)]+[(m,k) for m in range(1,t) for k in (-1,1)]
        assert [(row['m'],row['branch']) for row in packet['rootRows']]==expected
        rows=[];sumAx=I(0);sumAy=I(0)
        for n,row in enumerate(packet['rootRows']):
            x=read(packet,f'/rootRows/{n}/v');angle=-2*x
            source=[R*mp.iv.cos(angle),R*mp.iv.sin(angle)]
            velocity=[-Omega*source[1],Omega*source[0]]
            w,d,D,sep=axial_weight([R,I(0)],source,velocity,(-1)**row['m'])
            gap=beta*mp.iv.sin(x)-x-row['m']*mp.iv.pi/6;assert low(gap)<=0<=high(gap)
            assert low(d)>0 and low(d)<=high(read(packet,f'/rootRows/{n}/delay')) and high(d)>=low(read(packet,f'/rootRows/{n}/delay'))
            sumAx+=w*sep[0];sumAy+=w*sep[1]
            rows.append((w,d))
        radial=sumAx+Omega*Omega*R;assert low(radial)<=0<=high(radial) and low(sumAy)<=0<=high(sumAy)
        # The actual vertical line is at least as far left as the exact
        # decimal-rational gamma. This closes the printed strip literally.
        gamma=high(mp.iv.mpf(g));gammaIv=I(gamma)
        cap=sum((abs(w)*(1+mp.iv.exp(gammaIv*d)) for w,d in rows),I(0));assert high(cap)<(L-gamma)**2
        def G(z):return z-sum((w*(1-mp.iv.exp(-z*d))/z for w,d in rows),mp.iv.mpc(0))
        def derivative(z):return 1-sum((w*(d*z*mp.iv.exp(-z*d)-(1-mp.iv.exp(-z*d)))/(z*z) for w,d in rows),mp.iv.mpc(0))
        report=complete_count(G,derivative,gamma,mp.mpf(L));assert report['zeroCount']==0
        minusB=-sum((w*d for w,d in rows),I(0));assert low(minusB)>0
        reports.append({'rung':t,'referenceSha256':sha(path),'weightsDelays':rows,'radialBalanceResidual':radial,'tangentialBalanceResidual':sumAy,'requestedDecimalGamma':g,'certifiedGammaBinary':gamma,'L':L,'outerCap':cap,'neutralDerivative':minusB,'eventualDisplacementPerU':1/minusB,**report})
        print(json.dumps({'rung':t,'diskPanels':len(report['panels']),'zeroCount':0}),flush=True)
    save('target',{'reports':reports,'scope':'all nonneutral common axial roots excluded in exact requested decimal strips; linear sector only'})
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','target'],required=True);a=p.parse_args()
    {'known':known,'target':target}[a.stage]()
