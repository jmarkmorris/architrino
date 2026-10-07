"""Independent phase-zero Cartesian geometry, demand and all-root determinant."""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import signal
import time

P=Path(__file__).resolve(); ROOT=P.parents[5]
HELPER=P.with_name('overnight2-b-independent-superwake-norm-chart.py')
HELPER_SHA='f9a9bcbfb5fa9771356ac6b9428e0a49e02ee4a5db1825f8665759e7ad2b9d39'
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/moderate-radial-determinant/target.json'
INPUT_SHA='fe43598a047b2af39a2cf2334bd778c191feef1741ea0591df0d73244df4fe36'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-moderate-radial-determinant'
LITERALS=['0.0002191395109809334','0.0002346909943333512','-0.001118865929608746','0.0019226003081620029','1.8999999999999997','8.000000000000002']
EPS=F(1,2**20); HEIGHT=F(1,20)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
if sha(HELPER)!=HELPER_SHA: raise RuntimeError('frozen helper identity')
sp=importlib.util.spec_from_file_location('independent_intervals',HELPER)
c=importlib.util.module_from_spec(sp); sp.loader.exec_module(c)
iv=c.iv; signal.alarm(0); START=time.monotonic()
def timeout(*_): raise TimeoutError('120 second internal cap')
signal.signal(signal.SIGALRM,timeout); signal.alarm(120)

def geometry(s,j,x,h):
    a,b,C,D,beta,k=x; co=iv.cos(2*k*s); si=iv.sin(2*k*s)
    radius=1+a*co-b*si; radial_speed=2*k*(a*si+b*co)
    angular_speed=beta+2*(C*si+D*co)
    alpha=j*iv.pi/3-beta*s+(C*(co-1)-D*si)/k
    ca,sa=iv.cos(alpha),iv.sin(alpha); sigma=(-1)**j
    emitter_z=h*(iv.cos(k*s)+iv.sin(3*k*s)/8)
    emitter_vz=sigma*h*k*(iv.sin(k*s)-3*iv.cos(3*k*s)/8)
    q=[1+a-radius*ca,-radius*sa,h-sigma*emitter_z]
    v=[radial_speed*ca-radius*angular_speed*sa,radial_speed*sa+radius*angular_speed*ca,emitter_vz]
    return sum((u**2 for u in q),c.I(0))-s**2,2*sum((u*w for u,w in zip(q,v)),c.I(0))-2*s,q,v

def demand(x,h):
    a,b,C,D,beta,k=x; w=beta+2*D
    return [-4*k*k*a-(1+a)*w*w,4*k*b*w-4*k*C*(1+a),-h*k*k]

def determinant(acc,need): return acc[0]*need[2]-acc[2]*need[0]

def guards(bounds,h):
    mag=lambda pair:max(abs(pair[0]),abs(pair[1]))
    radial=mag(bounds[0])+mag(bounds[1]); modulation=mag(bounds[2])+mag(bounds[3])
    rlo,rhi=1-radial,1+radial; blo,bhi=bounds[4]; klo,khi=bounds[5]
    wlo,whi=blo-2*modulation,bhi+2*modulation
    if rlo<=0 or wlo<=0 or klo<=0: raise ArithmeticError('positive guard quantities')
    vmin=rlo*wlo
    vmax=iv.sqrt(c.rat((2*khi*radial)**2+(rhi*whi)**2+(11*h*khi/8)**2))
    amax=4*khi*khi*radial+rhi*whi*whi+4*khi*radial*whi+4*rhi*khi*modulation+17*h*khi*khi/8
    recent=F(1,100); self_floor=vmin-amax*recent/2
    partner=c.rat(rlo)-(1+vmax)*c.rat(recent)
    remote=2*iv.sqrt(c.rat(rhi*rhi+(9*h/8)**2))
    if self_floor<=1 or c.ends(partner)[0]<=0 or c.ends(remote)[1]>=3: raise ArithmeticError('complete past guard failed')
    return {'recent':str(recent),'end':'3','radiusLower':str(rlo),'radiusUpper':str(rhi),
            'speedLower':str(vmin),'speedUpper':c.enc(vmax),'accelerationUpper':str(amax),
            'selfSecantFloor':str(self_floor),'partnerGap':c.enc(partner),'diameter':c.enc(remote)}

def audit(data,literals=LITERALS):
    if list(map(F,data['coefficientLiterals']))!=list(map(F,literals)): raise ValueError('exact center mismatch')
    if F(data['halfwidth'])!=EPS or F(data['height'])!=HEIGHT: raise ValueError('domain mismatch')
    if [r['source'] for r in data['channels']]!=list(range(6)): raise ValueError('source inventory')
    return {'exact':True,'coordinateOrder':['a','b','c','d','beta','kappa'],'coefficientLiterals':literals,
            'halfwidth':str(EPS),'height':str(HEIGHT),'phaseOverPi':'0'}

def known():
    x=[c.rat(v) for v in [F(1,10),0,0,0,2,1]]; L=demand(x,c.rat(HEIGHT))
    for value,exact in zip(L,[F(-24,5),0,F(-1,20)]): c.contains(value,F(exact))
    c.contains(determinant([c.I(2),c.I(0),c.I(3)],L),F(143,10))
    x=[c.I(0)]*5+[c.I(1)]
    static=c.census(lambda s:geometry(s,3,x,c.I(0))[:2],[F(2)],F(1,100),F(3))
    if len(static['roots'])!=1: raise AssertionError('static count')
    a,b=map(F,static['roots'][0]['delay'])
    if not a<=2<=b: raise AssertionError('static root')
    g,gd,_,_=geometry(c.I(2),3,x,c.I(0)); c.contains(g,F(0)); c.contains(gd,F(-4))
    try: c.census(lambda s:geometry(s,3,x,c.I(0))[:2],[],F(1,100),F(3))
    except ArithmeticError: pass
    else: raise AssertionError('omitted root accepted')
    y=[c.rat(v) for v in [F(3,10),0,0,0,0,2]]
    g,gd,q,v=geometry(iv.pi/4,3,y,c.rat(HEIGHT))
    for value,exact in zip(q,[2,0,F(7,160)]): c.contains(value,F(exact))
    for value,exact in zip(v,[0,0,F(-1,10)]): c.contains(value,F(exact))
    c.contains(g-(4+c.rat(F(49,25600))-(iv.pi/4)**2),F(0))
    c.contains(gd-(-c.rat(F(7,800))-iv.pi/2),F(0))
    # Constant radius circular source with an exact nonstatic negative divisor.
    x=[c.I(0)]*4+[5*iv.pi/(6*iv.sqrt(2)),c.I(1)]
    g,gd,_,_=geometry(iv.sqrt(2),1,x,c.I(0))
    c.contains(g,F(0)); c.contains(-gd/(2*iv.sqrt(2))-(1-5*iv.pi/12),F(0))
    if c.sg(gd)!=1: raise AssertionError('negative divisor sign')
    toy={'coefficientLiterals':['1','2','3','4','5','6'],'halfwidth':str(EPS),'height':str(HEIGHT),'channels':[{'source':j} for j in range(6)]}
    inv=audit(toy,toy['coefficientLiterals']); rejected=[]
    for label,broken in [('missing',dict(toy,channels=toy['channels'][:-1])),('duplicate',dict(toy,channels=toy['channels']+[toy['channels'][0]])),('width',dict(toy,halfwidth='1/100'))]:
        try: audit(broken,toy['coefficientLiterals'])
        except ValueError: rejected.append(label)
        else: raise AssertionError('corrupt inventory accepted')
    return {'passed':True,'exactDemand':list(map(c.enc,L)),'determinantKnown':'143/10','static':static,
            'nonzeroSourcePhase':{'q':list(map(c.enc,q)),'v':list(map(c.enc,v))},'negativeDivisorKnown':c.enc(-gd/(2*iv.sqrt(2))),
            'inventoryKnown':inv,'corruptInventoryRejected':rejected,'omittedRootRejected':True}

def evaluate(eps,hints):
    bounds=[(F(v)-eps,F(v)+eps) for v in LITERALS]; x=[c.I(*pair) for pair in bounds]
    guard=guards(bounds,HEIGHT); acc=[c.I(0)]*3; channels=[]; failure=None
    for j in range(6):
        try:
            row=c.census(lambda s:geometry(s,j,x,c.rat(HEIGHT))[:2],hints[j],F(1,100),F(3))
            for root in row['roots']:
                s=c.I(*map(F,root['delay'])); D=c.I(*map(F,root['divisor']))
                _,gs,q,_=geometry(s,j,x,c.rat(HEIGHT))
                terms=[c.meet((-1)**j*u/(s**3*abs(D)),2*(-1)**j*u/(s*s*abs(gs))) for u in q]
                root['acceleration']=list(map(c.enc,terms)); acc=[a+b for a,b in zip(acc,terms)]
            channels.append({'source':j,**row})
        except ArithmeticError as error: failure=repr(error); break
    complete=failure is None and len(channels)==6; L=demand(x,c.rat(HEIGHT)); det=determinant(acc,L)
    component_limits=[F(37,10),F(1,10),F(33,10)]
    small=all(max(map(abs,c.ends(v)))<limit for v,limit in zip(L,component_limits))
    passed=complete and c.ends(det)[0]>F(24,5) and small
    return {'complete':complete,'passed':passed,'channels':channels,'rootCounts':[len(r['roots']) for r in channels],
            'pendingSources':list(range(len(channels),6)),'failure':failure,'guards':guard,
            'coefficientLiterals':LITERALS,'bounds':[[str(v) for v in pair] for pair in bounds],'height':str(HEIGHT),'halfwidth':str(eps),'phaseOverPi':'0',
            'acceleration':list(map(c.enc,acc)) if complete else None,'demand':list(map(c.enc,L)),
            'determinant':c.enc(det) if complete else None,'determinantAbove24over5':complete and c.ends(det)[0]>F(24,5),
            'demandComponentBoundsPassed':small,'demandSquaredUpper':'2459/100','normalizedResidualLower':'24/25',
            'complementLeaves':sum(len(r['complement']) for r in channels)}

def prior(stage):
    path=OUT/(stage+'.json'); data=json.loads(path.read_text())
    if not data['completed'] or not data['passed'] or data['sourceSha256']!=sha(P): raise RuntimeError('matching prior pass required')
    return sha(path)

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    for key in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(key)!='1': raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True); path=OUT/(stage+'.json')
    if path.exists(): raise FileExistsError('preserve prior receipt')
    data={'stage':stage,'sourceSha256':sha(P),'helperSha256':HELPER_SHA,'inputSha256':INPUT_SHA,'K':1,'c_f':1,
          'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,'completed':False,'passed':False,
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,'receiptBytes':4*1024**2,'leaves':30000,'threads':1}}
    try:
        if stage=='known': data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target': data['pilotSha256']=prior('pilot')
            if sha(INPUT)!=INPUT_SHA: raise RuntimeError('frozen input changed')
            subject=json.loads(INPUT.read_text()); data['inventoryAudit']=audit(subject)
            hints=[[sum(map(F,r['bracket']))/2 for r in row['roots']] for row in subject['channels']]
            result=evaluate(F(0) if stage=='pilot' else EPS,hints)
            data.update(result=result,passed=result['passed'])
        data['completed']=True
    except Exception as error: data['failure']=repr(error)
    signal.alarm(0); data['wallSeconds']=time.monotonic()-START; data['maxResidentBytes']=c.rss()
    raw=json.dumps(data,indent=2)+'\n'
    if len(raw.encode())>4*1024**2: raise RuntimeError('receipt byte cap')
    with path.open('x') as stream: stream.write(raw)
    print(json.dumps({'receipt':str(path),'sha256':sha(path),'bytes':len(raw.encode()),'completed':data['completed'],'passed':data['passed'],
                      'wallSeconds':data['wallSeconds'],'maxResidentBytesAfterSerialization':c.rss(),'failure':data.get('failure')}),flush=True)
    if not data['completed']: raise SystemExit(1)

if __name__=='__main__': main()
