"""Independent Gaussian receiving/source jets and potential Fa seam attribution.
Generic reference fixed before results; receipt adapter authored after supplied
arrival approximations. Those approximations are not used in root construction.
"""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
def load(n):
    s=importlib.util.spec_from_file_location(n.replace('-','_'),Path(__file__).with_name('maxwell-shaped-overnight-independent-'+n+'.py'));m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
p=load('seam-point-check');a=p.a;k=load('signed-potential-jacobian');iv=a.iv;sha=lambda f:hashlib.sha256(Path(f).read_bytes()).hexdigest()
def gap(curve,t,q0):return a.IQ(t)-a.k.norm([z+a.IQ(q) for z,q in zip(curve.box(t,t,0),q0)])
def arrival(curve,lo,hi,q0):
    lo,hi=Q(lo),Q(hi);assert gap(curve,lo,q0).b<0 and gap(curve,hi,q0).a>0
    r=[z+a.IQ(q) for z,q in zip(curve.box(lo,hi,0),q0)];R=a.k.norm(r);n=[z/R for z in r];der=1-a.k.dot(n,curve.box(lo,hi,1));assert der.a>0
    for _ in range(110):
        c=(lo+hi)/2;g=gap(curve,c,q0)
        if g.b<0:lo=c
        elif g.a>0:hi=c
        else:break
    return lo,hi,der

def known():
    old=p.known();jac=k.known();jet=lambda t:dict(t=t,x=[max(Q(t),0)**3/6,0],v=[max(Q(t),0)**2/2,0],a=[max(Q(t),0),0]);c=a.Curve([jet(-1),jet(1)],[0,0]);h,poly=a.poly.polynomial(jet(-1),jet(1),0);z=a.horner(a.derivative(poly,2,h),a.IQ('1/2'));assert a.k.contains(z,a.IQ('1/8'))
    q=lambda t:dict(t=t,x=[1,0],v=[0,0],a=[0,0]);curve=a.Curve([q(0),q(3)],[0,0]);l,r,d=arrival(curve,1,3,[1,0,0]);assert l<=2<=r and a.k.contains(d,1)
    m=k.matrices(['2','0','0'],['0']*3,['0']*3,['0']*3,'E');v=[sum(m['Fa'][i][j]*a.IQ([0,-1,0][j]) for j in range(3)) for i in range(3)];assert a.k.contains(a.k.norm(v),a.IQ('1/2'))
    return dict(passed=True,prior=old,potential=jac,cases=['Gaussian hinge h/8','independent static arrival at2','potential transverse Fa jump norm1/2'])
def analyze(path):
    d=json.loads(Path(path).read_text());assert sha(d['input'])==d['inputSHA'] and sha(d['point'])==d['pointSHA'];saved=json.loads(Path(d['input']).read_text());point=json.loads(Path(d['point']).read_text());assert point['law']==d['law'] and point['inputSHA']==d['inputSHA'];piece=d['receivingPiece'];j=piece['index'];lo,hi=map(Q,[saved['knots'][j]['t'],saved['knots'][j+1]['t']]);assert lo==Q(piece['left']) and hi==Q(piece['right']) and lo<=Q(point['t'])<=hi
    curve=a.Curve(saved['knots'],[0,0]);q0=list(saved['knots'][0]['x'])+[0];l,r,der=arrival(curve,lo,hi,q0);assert d['straddlesEmissionZero'] and lo<l<=r<hi
    futureJ=curve.box(0,0,3);past=p.Past(saved);left=[]
    for i,(h,c) in enumerate(past.polys):
        z=a.horner(a.derivative(c,3,h),a.IQ(1));circle=a.IQ(0) if i==0 else -a.IQ(past.r*past.w**3);left.append(circle+z)
    left.append(a.IQ(0));jump=[-(x-y) for x,y in zip(futureJ,left)]
    q,u=curve.box(l,r,0),curve.box(l,r,1);rvec=[x+a.IQ(z) for x,z in zip(q,q0)];v=[-a.IQ(z) for z in saved['knots'][0]['v']]+[a.IQ(0)];aa=[-a.IQ(z) for z in saved['knots'][0]['a']]+[a.IQ(0)];mat=k.matrices(rvec,v,aa,u,d['law']);normal=[x/mat['R'] for x in rvec];sigma=(1-a.k.dot(normal,u))/mat['D'];assert sigma.a>0
    response=[sum(mat['Fa'][i][j]*jump[j] for j in range(3))*sigma for i in range(3)];norm=a.k.norm(response);assert norm.a>0 and d['jump']['strictNonzero']
    return dict(accepted=True,receiptSHA=sha(path),piece=j,arrival={"lo":str(l),"hi":str(r)},derivative=a.k.encode(der),Sprime=a.k.encode(sigma),sourceJump=a.k.encode(jump),responseJumpNorm=a.k.encode(norm),scope='independent literal comparison seam reception and nonzero potential-response projected jump; no actual trajectory error floor')
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--receipt');ap.add_argument('--output',required=True);args=ap.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if args.receipt:out['target']=analyze(args.receipt)
    Path(args.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
