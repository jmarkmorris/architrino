"""Independent exact-point arbitrary-phase root censuses and metadata audit."""
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
INPUT=ROOT/'.local-data/master-equation-closure/overnight2-b/fast-height-point-census/target.json'
INPUT_SHA='d93e3431a1bdcc4fde3b7daf33e0b28c3a39a93b8eb3b83ff34a074efed9763e'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-fast-height-root-topology'
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
if sha(HELPER)!=HELPER_SHA: raise RuntimeError('frozen helper identity changed')
spec=importlib.util.spec_from_file_location('independent_intervals',HELPER)
c=importlib.util.module_from_spec(spec); spec.loader.exec_module(c)
signal.alarm(0); iv=c.iv; START=time.monotonic()
def timeout(*args): raise TimeoutError('120-second internal cap')
signal.signal(signal.SIGALRM,timeout); signal.alarm(120)
BETA=F(365287,200000); HEIGHT=F(1,10)
SPECS=[(k,F(0)) for k in [193,194,195,238,239,240,241]]+[(k,F(1,2)) for k in [194,239,240]]
PILOT=[(194,F(0)),(194,F(1,2))]
FLAT_HINTS=[[F(39,20)],[F(3,8),F(37,25),F(9,5)],
            [F(737,1000)],[F(109,100)],[F(143,100)],[F(173,100)]]

def frequency(index): return F(8)+F(3*(2*index+1),64)

def profile(phase):
    return iv.cos(phase)-iv.sin(3*phase)/8, -iv.sin(phase)-3*iv.cos(3*phase)/8

def geometry(source,beta,height,kappa,phase,d):
    sigma=(-1)**source
    receiver_height=profile(phase)[0]
    source_height,source_derivative=profile(phase-kappa*d)
    factor=receiver_height-sigma*source_height
    factor_delay=sigma*kappa*source_derivative
    angle=source*iv.pi/3-beta*d
    qr=1-iv.cos(angle); qt=-iv.sin(angle)
    gap=2*qr+height**2*factor**2-d**2
    slope=2*(beta*qt+height**2*factor*factor_delay-d)
    return gap,slope,(qr,qt,height*factor),height*factor_delay

def evaluate(b,h,k,p,hints,static=False):
    beta,height,kappa=c.rat(b),c.rat(h),c.rat(k); phase=c.rat(p)*iv.pi
    recent,end=F(1,4),F(3)
    secant=b*(1-(b*recent/2)**2/6); partner=1-(1+b)*recent
    diameter=2*iv.sqrt(c.rat(1+(9*h/8)**2))
    if partner<=0 or c.ends(diameter)[1]>=end: raise ArithmeticError('complete past guard failed')
    if not static and not (0<b*recent/2<1 and secant>1): raise ArithmeticError('recent self guard failed')
    sources=list(range(1,6)) if static else list(range(6))
    channels=[]; acc=[c.I(0),c.I(0),c.I(0)]; failure=None
    for j in sources:
        try:
            fun=lambda d:geometry(j,beta,height,kappa,phase,d)[:2]
            guides=[F(str(x)) if isinstance(x,float) else F(x) for x in hints[j]]
            result=c.census(fun,guides,recent,end)
            for root in result['roots']:
                d=c.I(*map(F,root['delay'])); divisor=c.I(*map(F,root['divisor']))
                if not c.sg(divisor): raise ArithmeticError('source divisor unresolved')
                _,slope,q,_=geometry(j,beta,height,kappa,phase,d)
                rows=[c.meet((-1)**j*x/(d**3*abs(divisor)),2*(-1)**j*x/(d**2*abs(slope))) for x in q]
                root['acceleration']=[c.enc(x) for x in rows]
                acc=[old+new for old,new in zip(acc,rows)]
            channels.append({'source':j,**result})
        except ArithmeticError as error:
            failure=repr(error); break
    complete=failure is None and len(channels)==len(sources)
    return {'completeChart':complete,'counts':[len(row['roots']) for row in channels] if complete else None,
            'channels':channels,'pendingSources':sources[len(channels):],'failure':failure,
            'acceleration':[c.enc(x) for x in acc] if complete else None,
            'complementLeaves':sum(len(row['complement']) for row in channels),
            'beta':str(b),'height':str(h),'frequency':str(k),'phaseOverPi':str(p),
            'guards':{'recent':str(recent),'end':str(end),'selfSecantFloor':str(secant),
                      'partnerPlanarGap':str(partner),'diameter':c.enc(diameter)}}

def audit_rows(rows,specs):
    found=[(row['index'],F(row['phaseOverPi'])) for row in rows]
    if found!=specs or len(set(found))!=len(found): raise ValueError('exact point/phase inventory')
    for row,(index,phase) in zip(rows,specs):
        if F(row['beta'])!=BETA or F(row['height'])!=HEIGHT or F(row['frequency'])!=frequency(index):
            raise ValueError('point parameter mismatch')
    return {'exact':True,'count':len(rows),'specs':[[k,str(p)] for k,p in specs]}

def known():
    toy=[{'index':0,'phaseOverPi':'0','beta':'365287/200000','height':'1/10','frequency':'515/64'}]
    metadata=audit_rows(toy,[(0,F(0))]); rejected=[]
    wrong=[dict(toy[0],frequency='516/64')]
    for label,rows in [('missing',[]),('duplicate',toy+toy),('wrong-frequency',wrong)]:
        try: audit_rows(rows,[(0,F(0))])
        except ValueError: rejected.append(label)
        else: raise AssertionError('incorrect metadata accepted')
    guides=[[],[F(1)],[F(173,100)],[F(2)],[F(173,100)],[F(1)]]
    static=evaluate(F(0),F(0),F(1),F(1,2),guides,True)
    if not static['completeChart']: raise AssertionError('nonzero-phase static chart')
    for row,square in zip(static['channels'],[1,3,4,3,1]):
        a,b=map(F,row['roots'][0]['delay'])
        if not a*a<=square<=b*b: raise AssertionError('static chord')
    exact=-c.rat(F(5,4))+1/iv.sqrt(c.I(3))
    c.contains(c.I(*map(F,static['acceleration'][0]))-exact,F(0))
    c.contains(c.I(*map(F,static['acceleration'][1])),F(0))
    c.contains(c.I(*map(F,static['acceleration'][2])),F(0))
    _,_,q0,v0=geometry(0,c.I(0),c.rat(F(1,10)),c.I(2),iv.pi/2,iv.pi/4)
    _,_,q1,v1=geometry(1,c.I(0),c.rat(F(1,10)),c.I(2),iv.pi/2,iv.pi/4)
    c.contains(q0[2],F(-7,80)); c.contains(v0,F(-3,40))
    c.contains(q1[2],F(9,80)); c.contains(v1,F(3,40))
    flat=[evaluate(BETA,F(0),F(8),phase,FLAT_HINTS) for phase in [F(0),F(1,2)]]
    if not all(row['completeChart'] and row['counts']==[1,3,1,1,1,1] for row in flat):
        raise AssertionError('accepted flat chart at two phases')
    try: c.census(lambda d:geometry(3,c.I(0),c.I(0),c.I(1),iv.pi/2,d)[:2],[],F(1,4),F(3))
    except ArithmeticError: pass
    else: raise AssertionError('omitted root accepted')
    return {'passed':True,'metadataKnown':metadata,'corruptMetadataRejected':rejected,'static':static,
            'nonzeroPhase':{'selfZ':c.enc(q0[2]),'selfSourceVelocity':c.enc(v0),
                            'partnerZ':c.enc(q1[2]),'partnerSourceVelocity':c.enc(v1)},
            'flat':flat,'omittedRootRejected':True}

def prior(stage):
    p=OUT/(stage+'.json'); data=json.loads(p.read_text())
    if not data['completed'] or not data['passed'] or data['sourceSha256']!=sha(P):
        raise RuntimeError('matching prior pass required')
    return sha(p)

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    for name in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(name)!='1': raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True); destination=OUT/(stage+'.json')
    if destination.exists(): raise FileExistsError('preserve prior receipt')
    data={'stage':stage,'sourceSha256':sha(P),'helperSha256':HELPER_SHA,'inputHintsSha256':INPUT_SHA,
          'K':1,'c_f':1,'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,
          'completed':False,'passed':False,'results':[],
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,
                    'receiptBytes':4*1024**2,'complementLeaves':50000,'threads':1}}
    try:
        if stage=='known': data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target': data['pilotSha256']=prior('pilot')
            if sha(INPUT)!=INPUT_SHA: raise RuntimeError('subject hint identity changed')
            subject=json.loads(INPUT.read_text())['results']
            data['metadataAudit']=audit_rows(subject,SPECS)
            hints={(r['index'],F(r['phaseOverPi'])):r['rootHints'] for r in subject}
            specs=PILOT if stage=='pilot' else SPECS
            data['requestedSpecs']=[[k,str(p)] for k,p in specs]
            for k,p in specs:
                if time.monotonic()-START>110: raise TimeoutError('pre-reception guard')
                row=evaluate(BETA,HEIGHT,frequency(k),p,hints[k,p]); row['index']=k
                data['results'].append(row)
                print(json.dumps({'progress':'independent exact point census','index':k,'phaseOverPi':str(p),
                                  'counts':row['counts'],'failure':row['failure'],'wallSeconds':time.monotonic()-START}),flush=True)
            data['passed']=all(r['completeChart'] for r in data['results'])
            data['unresolvedSpecs']=[[r['index'],r['phaseOverPi']] for r in data['results'] if not r['completeChart']]
        data['completed']=True
    except Exception as error: data['failure']=repr(error)
    signal.alarm(0); data['wallSeconds']=time.monotonic()-START; data['maxResidentBytes']=c.rss()
    raw=json.dumps(data,indent=2)+'\n'
    if len(raw.encode())>4*1024**2: raise RuntimeError('receipt byte cap')
    with destination.open('x') as stream: stream.write(raw)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'bytes':len(raw.encode()),
                      'completed':data['completed'],'passed':data['passed'],'wallSeconds':data['wallSeconds'],
                      'maxResidentBytesAfterSerialization':c.rss(),'unresolvedSpecs':data.get('unresolvedSpecs'),
                      'failure':data.get('failure')}),flush=True)
    if not data['completed']: raise SystemExit(1)

if __name__=='__main__': main()
