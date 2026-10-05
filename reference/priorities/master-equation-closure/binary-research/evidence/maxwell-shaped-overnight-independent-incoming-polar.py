"""Independent norm-ball polar corollary on admitted first-witness cells.

Uses the unchanged Gaussian receiving history and bilinear error theorem.
Only the actual incoming interval, ending at its unknown first event, is
asserted. Later receiving-test points remain auxiliary.
"""
import argparse,hashlib,importlib.util,json
from pathlib import Path
from fractions import Fraction as Q
p=Path(__file__).with_name('maxwell-shaped-overnight-independent-adaptive-test-check.py');s=importlib.util.spec_from_file_location('gaussian_polar',p);b=importlib.util.module_from_spec(s);s.loader.exec_module(b);iv=b.iv
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def polar(q,u,px,pv):
    px,pv=map(b.IQ,[px,pv]);rn=b.k.norm(q);vn=b.k.norm(u);radius=rn+iv.mpf([-px.b,px.b]);assert radius.a>0
    error=rn*pv+vn*px+px*pv;widen=lambda z:z+iv.mpf([-error.b,error.b])
    dot=widen(b.k.dot(q,u));det=widen(q[0]*u[1]-q[1]*u[0])
    return dict(radius=radius,radial=dot/radius,tangent=det/radius,rate=det/(radius**2),speedUpper=vn+pv)
def contains(z,x):return z.a<=b.IQ(x).a and z.b>=b.IQ(x).b
def known():
    prior=b.known();v=lambda z:list(map(b.IQ,z))
    circle=polar(v([5,0,0]),v([0,1,0]),0,0)
    assert contains(circle['radius'],5) and contains(circle['radial'],0) and contains(circle['tangent'],1) and contains(circle['rate'],'1/5')
    inward=polar(v([3,4,0]),v(['-3/5','-4/5',0]),0,0);assert contains(inward['radial'],-1) and contains(inward['tangent'],0)
    z=polar(v([3,4,0]),v(['-4/5','3/5',0]),'1/100','1/50');exact=polar(v(['301/100',4,0]),v(['-4/5','31/50',0]),0,0)
    for k in ['radius','radial','tangent','rate']:assert z[k].a<=exact[k].a and z[k].b>=exact[k].b
    try:polar(v([0,0,0]),v([0,0,0]),0,0)
    except AssertionError:pass
    else:raise AssertionError('zero radius accepted')
    return dict(passed=True,prior=prior,cases=['static circle polar r5/vt1/rate1/5','signed3-4-5 inward','nonzero Euclidean errors enclose displaced point','zero radius rejection'])
def analyze(receiving,induction,faces):
    r=json.loads(Path(receiving).read_text());i=json.loads(Path(induction).read_text())['target'];f=json.loads(Path(faces).read_text())['target'];digest=sha(receiving);assert i['acceptedInduction'] and i['receiptSHA']==digest==f['receiptSHA'] and f['first'] is not None
    c=r['case'];assert sha(c['input'])==c['inputSHA'];saved=json.loads(Path(c['input']).read_text());curve=b.Curve(saved['knots'],c['jetMid']);rows=r['rows'][:f['first']['cell']];t=Q(c['Tc']);hulls={};guard=t;guardLive=True;phaseLo=Q(0);phaseHi=Q(0);guardRadialDecrease=Q(0)
    for row in rows:
        l,h,rr=map(Q,[row['left'],row['dt'],row['right']]);assert l==t and rr-l==h and h>0
        z=polar(curve.box(l,rr,0),curve.box(l,rr,1),Q(row['errors']['x']),Q(row['errors']['v']));enc=b.k.encode(z)
        for k in ['radius','radial','tangent','rate']:
            lo,hi=map(Q,[enc[k]['lo'],enc[k]['hi']]);hulls[k]=[lo,hi] if k not in hulls else [min(hulls[k][0],lo),max(hulls[k][1],hi)]
        rateLo,rateHi=map(Q,[enc['rate']['lo'],enc['rate']['hi']]);assert rateLo>0 and Q(enc['radial']['hi'])<0
        phaseHi+=h*rateHi
        if guardLive and Q(enc['speedUpper']['hi'])<1:
            guard=rr;phaseLo+=h*rateLo;guardRadialDecrease-=h*Q(enc['radial']['hi'])
        else:guardLive=False
        t=rr
    assert t==Q(f['first']['t']) and guard>Q(c['Tc'])
    return dict(accepted=True,receiptSHA=digest,cells=len(rows),firstWitness=str(t),strictIncomingGuard=str(guard),uniformPolar={k:dict(lo=str(z[0]),hi=str(z[1])) for k,z in hulls.items()},phaseIncrement=dict(lo=str(phaseLo),hi=str(phaseHi)),radiusDecreaseLower=str(guardRadialDecrease),scope='actual incoming only to unknown firstunit between strict guard and witness; no actual outgoing test continuation or postevent phase integration')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receiving');p.add_argument('--induction');p.add_argument('--faces');p.add_argument('--output',required=True);a=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.receiving:out['target']=analyze(a.receiving,a.induction,a.faces)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
