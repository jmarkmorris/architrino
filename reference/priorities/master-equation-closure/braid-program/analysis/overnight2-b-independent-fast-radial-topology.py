"""Independent Cartesian partner-three census for two exact radial boxes."""
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
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-radial-topology/target.json'
INPUT_SHA='a46bb79b7ab64e3dd337c864f256254bbadb382019de52489d1fa1607a2f068b'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-fast-radial-topology'
CENTERS=[['0.3136968886638644','-0.010876187144810699','0.0008384905733558252','0.0010679727374362854','1.8461447020546873','16.125422731863043'],
 ['0.35002757224908015','-0.000003414150007291214','3.251348274927906e-7','1.256393741976146e-7','1.8264752780900957','23.99918856908369']]
SPECS=[(0,0),(0,5),(1,0),(1,21)]; EPS=F(1,2**24)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
if sha(HELPER)!=HELPER_SHA: raise RuntimeError('frozen helper changed')
sp=importlib.util.spec_from_file_location('independent_census',HELPER)
c=importlib.util.module_from_spec(sp); sp.loader.exec_module(c)
iv=c.iv; signal.alarm(0); START=time.monotonic()
def timeout(*_): raise TimeoutError('120 second internal cap')
signal.signal(signal.SIGALRM,timeout); signal.alarm(120)

def waves(phi,x,height):
    a,b,C,D,beta,k=x; co=iv.cos(2*phi); si=iv.sin(2*phi)
    radius=1+a*co+b*si; rp=2*(-a*si+b*co); rpp=-4*(a*co+b*si)
    phase=(C*co+D*si)/k; pp=2*(-C*si+D*co)/k; ppp=-4*(C*co+D*si)/k
    z=height*(iv.cos(phi)-iv.sin(3*phi)/8)
    zp=height*(-iv.sin(phi)-3*iv.cos(3*phi)/8)
    zpp=height*(-iv.cos(phi)+9*iv.sin(3*phi)/8)
    return radius,rp,rpp,phase,pp,ppp,z,zp,zpp

def geometry(delay,j,x,height,phi):
    beta,k=x[4:]; receiver=waves(phi,x,height); emitter=waves(phi-k*delay,x,height)
    r,_,_,p,_,_,z,_,_=receiver; s,sp,_,p0,pp,_,z0,zp,_=emitter
    angle=j*iv.pi/3-beta*delay+p0-p; co=iv.cos(angle); si=iv.sin(angle)
    radial_speed=k*sp; angular_speed=beta+k*pp; polarity=(-1)**j
    q=[r-s*co,-s*si,z-polarity*z0]
    v=[radial_speed*co-s*angular_speed*si,radial_speed*si+s*angular_speed*co,polarity*k*zp]
    return sum((u**2 for u in q),c.I(0))-delay**2,2*sum((u*w for u,w in zip(q,v)),c.I(0))-2*delay,q,v

def guards(bounds):
    magnitude=lambda pair:max(abs(pair[0]),abs(pair[1]))
    ra=magnitude(bounds[0])+magnitude(bounds[1]); modulation=magnitude(bounds[2])+magnitude(bounds[3])
    rlo,rhi=1-ra,1+ra; beta=bounds[4][1]; k=bounds[5][1]
    if bounds[4][0]<=0 or bounds[5][0]<=0: raise ArithmeticError('positive rates required')
    vmax=iv.sqrt(c.rat((2*k*ra)**2+(rhi*(beta+2*modulation))**2+(11*k/F(80))**2))
    gap=c.rat(rlo)-(1+vmax)/1000
    diameter=2*iv.sqrt(c.rat(rhi**2+F(9,80)**2))
    if c.ends(gap)[0]<=0 or c.ends(diameter)[1]>=3: raise ArithmeticError('global partner guards')
    return {'radiusLower':str(rlo),'radiusUpper':str(rhi),'speedUpper':c.enc(vmax),
            'recentGap':c.enc(gap),'diameter':c.enc(diameter),'recent':'1/1000','end':'3'}

def inventory(rows,centers,specs):
    keys=[(r['box'],r['phaseIndex']) for r in rows]
    if keys!=specs or len(keys)!=len(set(keys)): raise ValueError('reception inventory')
    for row,(box,phase) in zip(rows,specs):
        if row['source']!=3 or F(row['phaseOverPi'])!=F(phase,48): raise ValueError('source or phase mismatch')
        if F(row['height'])!=F(1,10) or F(row['halfwidth'])!=EPS: raise ValueError('height or halfwidth')
        if list(map(F,row['coefficientLiterals']))!=list(map(F,centers[box])): raise ValueError('exact center mismatch')
    return {'exact':True,'count':len(rows),'specs':[[b,p] for b,p in specs]}

def known():
    zero=[c.I(0)]*5+[c.I(1)]
    static=c.census(lambda d:geometry(d,3,zero,c.I(0),iv.pi/4)[:2],[F(2)],F(1,1000),F(3))
    if len(static['roots'])!=1: raise AssertionError('static count')
    a,b=map(F,static['roots'][0]['delay'])
    if not a<=2<=b: raise AssertionError('static root')
    g,gd,_,_=geometry(c.I(2),3,zero,c.I(0),iv.pi/4)
    c.contains(g,F(0)); c.contains(gd,F(-4))
    x=[c.rat(q) for q in [F(3,10),0,F(1,1000),0,0,2]]
    expected=[F(13,10),0,F(-6,5),F(1,2000),0,F(-1,500),F(1,10),F(-3,80),F(-1,10)]
    vals=waves(c.I(0),x,c.rat(F(1,10)))
    for val,exact in zip(vals,expected): c.contains(val,F(exact))
    x=[c.rat(q) for q in [F(3,10),0,0,0,0,2]]
    g,gd,q,v=geometry(iv.pi/4,3,x,c.rat(F(1,10)),iv.pi/2)
    for val,exact in zip(q,[2,0,F(9,80)]): c.contains(val,F(exact))
    for val,exact in zip(v,[0,0,F(3,40)]): c.contains(val,F(exact))
    c.contains(g-(4+c.rat(F(81,6400))-(iv.pi/4)**2),F(0))
    c.contains(gd-(c.rat(F(27,1600))-iv.pi/2),F(0))
    try: c.census(lambda d:geometry(d,3,zero,c.I(0),iv.pi/4)[:2],[],F(1,1000),F(3))
    except ArithmeticError: pass
    else: raise AssertionError('omitted root accepted')
    toy=[{'box':0,'phaseIndex':5,'phaseOverPi':'5/48','source':3,'height':'1/10','halfwidth':str(EPS),'coefficientLiterals':['1','2','3','4','5','6']}]
    inv=inventory(toy,[['1','2','3','4','5','6']],[(0,5)]); rejected=[]
    wrong=[dict(toy[0],coefficientLiterals=['1','2','3','4','5','7'])]
    for label,rows in [('missing',[]),('duplicate',toy+toy),('wrong-coordinate',wrong)]:
        try: inventory(rows,[['1','2','3','4','5','6']],[(0,5)])
        except ValueError: rejected.append(label)
        else: raise AssertionError('corrupt metadata accepted')
    return {'passed':True,'static':static,'waveformControl':list(map(c.enc,vals)),'nonzeroPhase':{'q':list(map(c.enc,q)),'v':list(map(c.enc,v)),'gap':c.enc(g),'derivative':c.enc(gd)},
            'omittedRootRejected':True,'inventoryKnown':inv,'corruptInventoriesRejected':rejected}

def evaluate(box,phase,hints):
    bounds=[(F(v)-EPS,F(v)+EPS) for v in CENTERS[box]]; x=[c.I(*pair) for pair in bounds]
    guard=guards(bounds); phi=c.rat(F(phase,48))*iv.pi
    guides=[F(str(v)) if isinstance(v,float) else F(v) for v in hints]
    row=c.census(lambda d:geometry(d,3,x,c.rat(F(1,10)),phi)[:2],guides,F(1,1000),F(3))
    return {'box':box,'phaseIndex':phase,'phaseOverPi':str(F(phase,48)),'source':3,'height':'1/10',
            'coefficientLiterals':CENTERS[box],'halfwidth':str(EPS),'bounds':[[str(v) for v in pair] for pair in bounds],
            'guards':guard,'complete':True,'rootCount':len(row['roots']),**row}

def prior(stage):
    p=OUT/(stage+'.json'); data=json.loads(p.read_text())
    if not data['completed'] or not data['passed'] or data['sourceSha256']!=sha(P): raise RuntimeError('matching prior pass required')
    return sha(p)

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    for key in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(key)!='1': raise RuntimeError('one numerical thread')
    OUT.mkdir(parents=True,exist_ok=True); path=OUT/(stage+'.json')
    if path.exists(): raise FileExistsError('preserve previous receipt')
    data={'stage':stage,'sourceSha256':sha(P),'helperSha256':HELPER_SHA,'inputSha256':INPUT_SHA,'K':1,'c_f':1,
          'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,'completed':False,'passed':False,'results':[],
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,'receiptBytes':4*1024**2,'leaves':30000,'threads':1}}
    try:
        if stage=='known': data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target': data['pilotSha256']=prior('pilot')
            if sha(INPUT)!=INPUT_SHA: raise RuntimeError('frozen hint input identity')
            rows=json.loads(INPUT.read_text())['results']; data['inventoryAudit']=inventory(rows,CENTERS,SPECS)
            hints={(r['box'],r['phaseIndex']):r['rootHints'] for r in rows}
            specs=SPECS[:2] if stage=='pilot' else SPECS
            for box,phase in specs:
                if time.monotonic()-START>110: raise TimeoutError('pre-reception wall guard')
                try: row=evaluate(box,phase,hints[box,phase])
                except ArithmeticError as error: row={'box':box,'phaseIndex':phase,'complete':False,'failure':repr(error)}
                data['results'].append(row)
                print(json.dumps({'progress':'independent radial census','box':box,'phaseIndex':phase,'count':row.get('rootCount'),'failure':row.get('failure'),'wallSeconds':time.monotonic()-START}),flush=True)
            data['passed']=all(r['complete'] for r in data['results'])
        data['completed']=True
    except Exception as error: data['failure']=repr(error)
    signal.alarm(0); data['wallSeconds']=time.monotonic()-START; data['maxResidentBytes']=c.rss()
    raw=json.dumps(data,indent=2)+'\n'
    if len(raw.encode())>4*1024**2: raise RuntimeError('receipt cap')
    with path.open('x') as stream: stream.write(raw)
    print(json.dumps({'receipt':str(path),'sha256':sha(path),'bytes':len(raw.encode()),'completed':data['completed'],'passed':data['passed'],
                      'wallSeconds':data['wallSeconds'],'maxResidentBytesAfterSerialization':c.rss(),'failure':data.get('failure')}),flush=True)
    if not data['completed']: raise SystemExit(1)

if __name__=='__main__': main()
