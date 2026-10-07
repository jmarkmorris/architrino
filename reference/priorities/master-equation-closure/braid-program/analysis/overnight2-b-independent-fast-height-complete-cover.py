"""Independent remaining-cell geometry and exact union of 512 original cells."""
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
DEP=P.with_name('overnight2-b-independent-fast-height-centered.py')
DEP_SHA='5ade95039bcf26df3820d2ad4b8a36dfc0280141c7832d39bd96c94aaa08e85f'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-fast-height-complete-cover'
BASE=ROOT/'.local-data/master-equation-closure/overnight2-b'
INPUTS={
 'first':('independent-fast-height-determinant/target-rational-metadata.json','d640717574a04246cdda6f2b9363d0cdee00c9ce466184c31eb0a238b93f825e'),
 'centered':('independent-fast-height-centered/target.json','4eaa3834755a677bf0a358a300360743ae8a6c77f59e2ba3cadfe25c39e55835'),
 'second':('fast-height-second-phase/target.json','7ff9ecb08d0a5dc9d8e7647acf9bc308bf03a92ddb24b5377a7659a15c79e06f'),
 'final':('fast-height-final-phase/target.json','88411dce15d61d3b2fb004269cede8275309dbeffe598517a69e535b2595403e')}
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
if sha(DEP)!=DEP_SHA: raise RuntimeError('frozen independent dependency identity')
sp=importlib.util.spec_from_file_location('frozen_independent_centered',DEP)
old=importlib.util.module_from_spec(sp); sp.loader.exec_module(old)
c=old.c; iv=c.iv; signal.alarm(0); START=time.monotonic()
def timeout(*_): raise TimeoutError('120 second internal cap')
signal.signal(signal.SIGALRM,timeout); signal.alarm(120)
BETA=old.BETA; SLABS=old.SLABS; REMAIN=old.OUTSIDE
PILOT=[58,149,239,200]
def freq(k): return F(8)+F(3*k,32),F(8)+F(3*(k+1),32)
def profile(x): return iv.cos(x)-iv.sin(3*x)/8
def derivative(x): return -iv.sin(x)-3*iv.cos(3*x)/8
def curvature(x): return -iv.cos(x)+9*iv.sin(3*x)/8

def geometry(j,b,h,k,phi,d):
    sigma=(-1)**j; alpha=j*iv.pi/3-b*d; psi=phi-k*d
    radial=1-iv.cos(alpha); factor=profile(phi)-sigma*profile(psi)
    vz=sigma*h*k*derivative(psi)
    gap=2*radial+h*h*factor*factor-d*d
    slope=2*(-b*iv.sin(alpha)+h*factor*vz-d)
    return gap,slope,radial,factor,vz

def numerator(j,b,k,ell,radial,factor):
    return (-1)**j*(ell*k*k*radial+b*b*factor)

def evaluate(b,h,k,phase,hints,static=False):
    phi=c.rat(phase)*iv.pi; ell=curvature(phi)
    lo,hi=c.ends(b); recent,end=F(1,4),F(3)
    secant=lo*(1-(hi*recent/2)**2/6); partner=1-(1+hi)*recent
    diameter=2*iv.sqrt(1+(9*h/8)**2)
    if partner<=0 or c.ends(diameter)[1]>=end: raise ArithmeticError('past guard')
    if not static and not (0<hi*recent/2<1 and secant>1): raise ArithmeticError('recent self guard')
    sources=list(range(1,6)) if static else list(range(6))
    total=c.I(0); ar=c.I(0); az=c.I(0); channels=[]; failure=None
    for j in sources:
        try:
            guides=[F(str(x)) if isinstance(x,float) else F(x) for x in hints[j]]
            result=c.census(lambda d:geometry(j,b,h,k,phi,d)[:2],guides,recent,end)
            for root in result['roots']:
                d=c.I(*map(F,root['delay'])); D=c.I(*map(F,root['divisor']))
                _,slope,radial,factor,_=geometry(j,b,h,k,phi,d)
                n=numerator(j,b,k,ell,radial,factor)
                term=c.meet(n/(d**3*abs(D)),2*n/(d*d*abs(slope)))
                root['normalizedDeterminantContribution']=c.enc(term); total+=term
                ar+=(-1)**j*radial/(d**3*abs(D)); az+=(-1)**j*h*factor/(d**3*abs(D))
            channels.append({'source':j,**result})
        except ArithmeticError as error: failure=repr(error); break
    complete=failure is None and len(channels)==len(sources)
    return {'completeChart':complete,'disposition':'excluded' if complete and c.ends(h)[0]>0 and c.sg(total) else 'unresolved',
            'channels':channels,'rootCounts':[len(x['roots']) for x in channels],
            'pendingSources':sources[len(channels):],'failure':failure,
            'normalizedDeterminant':c.enc(total) if complete else None,
            'radialAcceleration':c.enc(ar) if complete else None,'axialAcceleration':c.enc(az) if complete else None,
            'phaseOverPi':str(phase),'heightSecondDerivativeFactor':c.enc(ell),
            'complementLeaves':sum(len(x['complement']) for x in channels),
            'guards':{'recent':str(recent),'end':str(end),'selfSecantFloor':str(secant),
                      'partnerPlanarGap':str(partner),'diameter':c.enc(diameter)}}

def partition(rows,slabs,lo,hi,n):
    expected={(s,k) for s in range(len(slabs)) for k in range(n)}
    keys=[(r['slab'],r['index']) for r in rows]
    if len(keys)!=len(expected) or len(set(keys))!=len(keys) or set(keys)!=expected:
        raise ValueError('missing or duplicate slab/index')
    audits=[]
    for s,h in enumerate(slabs):
        ordered=sorted((r for r in rows if r['slab']==s),key=lambda r:r['index'])
        if any(tuple(map(F,r['height']))!=h for r in ordered): raise ValueError('height mismatch')
        audits.append(old.interval_partition([tuple(map(F,r['frequency'])) for r in ordered],lo,hi,n))
    return {'complete':True,'cells':len(keys),'slabs':audits}

def known():
    toy=[{'slab':s,'index':k,'height':[str(s+1),str(s+2)],'frequency':[str(F(k,4)),str(F(k+1,4))]}
         for s in range(2) for k in range(4)]
    slabs=[(F(1),F(2)),(F(2),F(3))]; good=partition(toy,slabs,F(0),F(1),4); rejected=[]
    duplicate=toy.copy(); duplicate[1]=dict(toy[0])
    overlap=[dict(r) for r in toy]; overlap[1]['frequency']=['1/8','1/2']
    for label,rows in [('missing',toy[:-1]),('duplicate',duplicate),('overlap',overlap)]:
        try: partition(rows,slabs,F(0),F(1),4)
        except ValueError: rejected.append(label)
        else: raise AssertionError('bad toy partition accepted')
    hints=[[],[F(1)],[F(173,100)],[F(2)],[F(173,100)],[F(1)]]
    statics=[]; flats=[]
    for phase in [F(1,2),F(1,4)]:
        row=evaluate(c.I(0),c.I(0),c.I(1),phase,hints,True)
        if not row['completeChart']: raise AssertionError('static chart')
        for channel,square in zip(row['channels'],[1,3,4,3,1]):
            a,b=map(F,channel['roots'][0]['delay'])
            if not a*a<=square<=b*b: raise AssertionError('static chord square')
        c.contains(c.I(*map(F,row['radialAcceleration']))-(-c.rat(F(5,4))+1/iv.sqrt(c.I(3))),F(0))
        c.contains(c.I(*map(F,row['axialAcceleration'])),F(0)); statics.append(row)
        flat=evaluate(c.I(*BETA),c.I(0),c.I(8),phase,old.FLAT_HINTS)
        if not flat['completeChart'] or flat['rootCounts']!=[1,3,1,1,1,1]: raise AssertionError('flat roots')
        if [c.sg(c.I(*map(F,r['divisor']))) for r in flat['channels'][1]['roots']]!=[1,-1,1]:
            raise AssertionError('negative divisor control')
        flats.append(flat)
    c.contains(curvature(iv.pi/2),F(-9,8)); c.contains(curvature(iv.pi/4)-iv.sqrt(2)/16,F(0))
    _,_,_,f,v=geometry(0,c.I(0),c.rat(F(1,10)),c.I(2),iv.pi/2,iv.pi/4)
    c.contains(f,F(-7,8)); c.contains(v,F(-3,40))
    c.contains(numerator(0,c.rat(F(3,2)),c.I(2),curvature(iv.pi/2),c.I(2),f),F(-351,32))
    _,_,_,f,v=geometry(0,c.I(0),c.rat(F(1,10)),c.I(2),iv.pi/4,iv.pi/8)
    c.contains(f-(7*iv.sqrt(2)/16-1),F(0)); c.contains(v,F(-3,40))
    try: c.census(lambda d:geometry(3,c.I(0),c.I(0),c.I(1),iv.pi/4,d)[:2],[],F(1,4),F(3))
    except ArithmeticError: pass
    else: raise AssertionError('omitted root accepted')
    return {'passed':True,'toyPartition':good,'badPartitionsRejected':rejected,'static':statics,'flat':flats,
            'phaseCurvaturesChecked':True,'sourceGeometryChecked':True,'numeratorKnown':'-351/32','omittedRootRejected':True}

def metadata():
    inputs={}
    for name,(relative,digest) in INPUTS.items():
        path=BASE/relative
        if sha(path)!=digest: raise RuntimeError('frozen input changed: '+name)
        inputs[name]=json.loads(path.read_text())
    inherited=[]
    for name,count in [('first',428),('centered',66)]:
        data=inputs[name]
        if not data['completed'] or not data['passed'] or tuple(map(F,data['beta']))!=BETA: raise ValueError('prior admission')
        if len(data['results'])!=count: raise ValueError('prior count')
        for row in data['results']:
            if row['disposition']!='excluded' or not row['completeChart']: raise ValueError('prior unresolved')
            determinant=row['determinant'] if name=='first' else row['normalizedDeterminant']
            a,b=map(F,determinant)
            if not (a>0 or b<0): raise ValueError('prior sign absent')
            inherited.append({**{key:row[key] for key in ['slab','index','height','frequency']},'admission':name,'phaseOverPi':'0'})
    second=inputs['second']
    if tuple(map(F,second['beta']))!=BETA or F(second['phaseOverPi'])!=F(1,2): raise ValueError('second beta/phase')
    if [r['index'] for r in second['results']]!=REMAIN: raise ValueError('second remainder inventory')
    selected=[]; proposals={}
    for row in second['results']:
        k=row['index']
        if row['slab']!=1 or tuple(map(F,row['height']))!=SLABS[1] or tuple(map(F,row['frequency']))!=freq(k):
            raise ValueError('second changed box')
        if row['excluded'] is not (k!=200): raise ValueError('second selection')
        if k!=200:
            selected.append({'slab':1,'index':k,'height':list(map(str,SLABS[1])),'frequency':list(map(str,freq(k))),
                             'phaseOverPi':'1/2','admission':'new-second'})
            proposals[k]=row['rootHints']
    final=inputs['final']; r=final['result']
    if final['index']!=200 or final['slab']!=1 or F(r['phaseOverPi'])!=F(1,4) or tuple(map(F,r['frequency']))!=freq(200):
        raise ValueError('final index/phase/frequency')
    # Subject binary outward boxes need only contain the exact box; the new run
    # reconstructs the exact rational box directly, never replays those endpoints.
    for key,exact in [('beta',BETA),('height',SLABS[1])]:
        a,b=map(F,r[key])
        if not a<=exact[0]<=exact[1]<=b: raise ValueError('final box missing exact domain')
    selected.append({'slab':1,'index':200,'height':list(map(str,SLABS[1])),'frequency':list(map(str,freq(200))),
                     'phaseOverPi':'1/4','admission':'new-final'}); proposals[200]=r['rootHints']
    union=inherited+selected
    audit=partition(union,SLABS,F(8),F(32),256)
    if sorted(r['index'] for r in selected)!=REMAIN: raise ValueError('18-cell completion')
    return audit,union,selected,proposals

def prior(stage):
    path=OUT/(stage+'.json'); data=json.loads(path.read_text())
    if not data['completed'] or not data['passed'] or data['sourceSha256']!=sha(P): raise RuntimeError('matching prior pass required')
    return sha(path)

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--stage',choices=['known','pilot','target'],required=True)
    stage=parser.parse_args().stage
    for key in ['OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS']:
        if os.environ.get(key)!='1': raise RuntimeError('one numerical thread')
    OUT.mkdir(parents=True,exist_ok=True); path=OUT/(stage+'.json')
    if path.exists(): raise FileExistsError('preserve existing receipt')
    data={'stage':stage,'sourceSha256':sha(P),'dependencySha256':DEP_SHA,'inputs':INPUTS,'K':1,'c_f':1,
          'mpmathVersion':c.mpmath.__version__,'intervalDigits':iv.dps,'completed':False,'passed':False,'results':[],
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':512*1024**2,'receiptBytes':4*1024**2,'leaves':50000,'threads':1}}
    try:
        if stage=='known': data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target': data['pilotSha256']=prior('pilot')
            audit,union,selected,proposals=metadata()
            data.update(partitionAudit=audit,exactInventory=union,beta=list(map(str,BETA)),newSelected=selected)
            rows=[r for k in PILOT for r in selected if r['index']==k] if stage=='pilot' else selected
            for box in rows:
                if time.monotonic()-START>110: raise TimeoutError('pre-cell time cap')
                k=box['index']; phase=F(box['phaseOverPi'])
                result=evaluate(c.I(*BETA),c.I(*SLABS[1]),c.I(*freq(k)),phase,proposals[k]); result.update(box)
                data['results'].append(result)
                print(json.dumps({'progress':'independent remaining cell','index':k,'phaseOverPi':str(phase),
                                  'disposition':result['disposition'],'wallSeconds':time.monotonic()-START}),flush=True)
            data['unresolvedIndices']=[r['index'] for r in data['results'] if r['disposition']!='excluded']
            data['passed']=not data['unresolvedIndices']
            data['full512Accepted']=stage=='target' and data['passed']
        data['completed']=True
    except Exception as error: data['failure']=repr(error)
    signal.alarm(0); data['wallSeconds']=time.monotonic()-START; data['maxResidentBytes']=c.rss()
    raw=json.dumps(data,indent=2)+'\n'
    if len(raw.encode())>4*1024**2: raise RuntimeError('receipt cap')
    with path.open('x') as stream: stream.write(raw)
    print(json.dumps({'receipt':str(path),'sha256':sha(path),'bytes':len(raw.encode()),'completed':data['completed'],
                      'passed':data['passed'],'wallSeconds':data['wallSeconds'],'maxResidentBytesAfterSerialization':c.rss(),
                      'failure':data.get('failure'),'unresolvedIndices':data.get('unresolvedIndices')}),flush=True)
    if not data['completed']: raise SystemExit(1)

if __name__=='__main__': main()
