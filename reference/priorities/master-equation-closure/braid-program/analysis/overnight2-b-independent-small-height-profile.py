"""Comparison-chord audit at a zero of any admitted axial profile.

Imports the frozen independent bisection/kernel reference only. New target uses
axial chord ceiling 1/10 and source product ceiling 19/400 directly; no subject
code, subject output enclosure, waveform frequency, or effective-height rewrite.
"""
import argparse
from fractions import Fraction as F
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import resource
import signal
import sys
import time

SOURCE=Path(__file__).resolve()
ROOT=SOURCE.parents[5]
REFERENCE=SOURCE.with_name('overnight2-b-independent-thin-height.py')
REF_SHA='365a9d363ce32fc08b37b576aaaf51da57ac3913933e7913e0d42d8671def0c0'
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/independent-small-height-profile'
START=time.monotonic()
Z=F(1,10)
PRODUCT=F(19,400)
CELLS=16
MAX_BYTES=8*1024**2
MAX_RSS=512*1024**2

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()
if sha(REFERENCE)!=REF_SHA:
    raise RuntimeError('frozen independent reference mismatch')
spec=importlib.util.spec_from_file_location('independent_bisection',REFERENCE)
ref=importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)

def timeout(signum,frame):
    raise TimeoutError('120-second internal deadline')
signal.signal(signal.SIGALRM,timeout)
signal.alarm(120)

def rss():
    n=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    return n if sys.platform=='darwin' else n*1024

def budget():
    if time.monotonic()-START>120:
        raise TimeoutError('internal wall deadline')
    if rss()>MAX_RSS:
        raise MemoryError('512 MiB observed limit')

def cell(left,right):
    beta=ref.interval(left,right)
    total=ref.number(0)
    rows=[]
    for j in range(1,6):
        sine_global=ref.IV.sin(j*ref.IV.pi/3-beta*ref.interval(F(1,2),F(21,10)))
        a,b=ref.endpoints(sine_global)
        if a>0:
            lower_rate,upper_rate=right,left
        elif b<0:
            lower_rate,upper_rate=left,right
        else:
            raise ArithmeticError('comparison-rate monotonicity not proved')
        lower=ref.isolate(j,ref.number(lower_rate),F(0))
        upper=ref.isolate(j,ref.number(upper_rate),Z)
        delay=ref.interval(F(lower['lower']),F(upper['upper']))
        sine=ref.IV.sin(j*ref.IV.pi/3-beta*delay)
        projection=ref.interval(-PRODUCT,PRODUCT)
        term,denominator=ref.scalar_kernel(sine,delay,beta,projection,(-1)**j)
        total+=term
        rows.append({'partner':j,'globalSineSignInterval':ref.record(sine_global),
                     'lowerComparisonRate':str(lower_rate),'upperComparisonRate':str(upper_rate),
                     'lowerComparisonRoot':lower,'upperComparisonRoot':upper,
                     'actualDelay':ref.record(delay),'sine':ref.record(sine),
                     'sourceProduct':ref.record(projection),'factoredDenominator':ref.record(denominator),
                     'tangentialRow':ref.record(term)})
        budget()
    return {'beta':[str(left),str(right)],'rows':rows,'sum':ref.record(total)}

def known():
    old=ref.known_controls()
    static=[]
    for j,q2 in enumerate((1,3,4,3,1),1):
        bracket=ref.isolate(j,ref.number(0),Z)
        a,b=F(bracket['lower']),F(bracket['upper'])
        answer=F(q2)+Z**2
        if not a*a<=answer<=b*b or b-a>ref.TOLERANCE:
            raise AssertionError('new crossing-height static comparison control')
        static.append({'partner':j,'exactSquaredRoot':str(answer),**bracket})
    for projection,answer in ((PRODUCT,F(461,400)),(-PRODUCT,F(499,400))):
        value,den=ref.scalar_kernel(ref.number(1),ref.number(1),ref.number(F(1,5)),ref.number(projection),1)
        ref.assert_contains(den,answer)
        ref.assert_contains(value,-1/answer)
    projection=ref.number(Z)*ref.number(F(19,20))*ref.IV.sin(ref.IV.pi/4)*ref.IV.cos(ref.IV.pi/4)
    ref.assert_contains(projection,PRODUCT)
    if Z*F(19,20)/2!=PRODUCT or F(1,20)*F(19,20)!=PRODUCT:
        raise AssertionError('cosine and general-profile ceilings')
    if not F(21,100)**2+F(19,20)**2<F(49,50)**2:
        raise AssertionError('physical speed bound')
    if not 4+Z**2<F(21,10)**2 or not F(1)/(1+F(21,100))>F(1,2):
        raise AssertionError('comparison bracket proof')
    return {'passed':True,'referenceKnown':old,'newStaticComparisonRoots':static,
            'cosineProductAtPiOverFour':ref.record(projection),
            'controls':['new static axial chord 1/10','both signed source products 19/400',
                        'exact cosine half-product','arbitrary amplitude 1/20 product implication',
                        'speed and comparison bracket rational bounds']}

def prior(stage):
    path=OUT/(stage+'.json')
    saved=json.loads(path.read_text())
    if not saved['completed'] or not saved['passed'] or saved['sourceSha256']!=sha(SOURCE) or saved['referenceSha256']!=REF_SHA:
        raise RuntimeError('matching known/pilot pass required')
    return sha(path)

def run():
    p=argparse.ArgumentParser()
    p.add_argument('--stage',required=True,choices=('known','pilot','target'))
    stage=p.parse_args().stage
    for key in ('OPENBLAS_NUM_THREADS','OMP_NUM_THREADS','MKL_NUM_THREADS'):
        if os.environ.get(key)!='1':
            raise RuntimeError('one numerical thread required')
    OUT.mkdir(parents=True,exist_ok=True)
    destination=OUT/(stage+'.json')
    if destination.exists():
        raise FileExistsError('refusing to overwrite receipt')
    data={'stage':stage,'sourceSha256':sha(SOURCE),'referenceSha256':REF_SHA,'K':1,'c_f':1,
          'mpmathVersion':ref.mpmath.__version__,'intervalDecimalDigits':ref.IV.dps,
          'heightCeiling':str(Z),'sourceProductCeiling':str(PRODUCT),'plannedRateCells':CELLS,
          'limits':{'internalSeconds':120,'supervisorSeconds':180,'residentBytes':MAX_RSS,'receiptBytes':MAX_BYTES,'threads':1},
          'completed':False,'passed':False}
    failed=False
    cells=data['cells']=[]
    try:
        if stage=='known':
            data.update(known())
        else:
            data['knownSha256']=prior('known')
            if stage=='target':
                data['pilotSha256']=prior('pilot')
            count=1 if stage=='pilot' else CELLS
            for i in range(count):
                left=F(19,100)+F(i,800)
                cells.append(cell(left,left+F(1,800)))
            lower=min(F(x['sum'][0]) for x in cells)
            upper=max(F(x['sum'][1]) for x in cells)
            data['torqueHull']=[str(lower),str(upper)]
            data['marginOverOneTenth']=str(lower-F(1,10))
            data['certifiedGreaterThanOneTenth']=lower>F(1,10)
            data['passed']=True
        data['completed']=True
    except Exception as error:
        data['failure']=repr(error);failed=True
    signal.alarm(0)
    data['wallSeconds']=time.monotonic()-START
    data['maxResidentBytesBeforeSerialization']=rss()
    output=json.dumps(data,indent=2)+'\n'
    if len(output.encode())>MAX_BYTES:
        raise RuntimeError('8 MiB receipt ceiling exceeded')
    with destination.open('x') as stream:
        stream.write(output)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'completed':data['completed'],
                      'passed':data['passed'],'certified':data.get('certifiedGreaterThanOneTenth'),
                      'torqueHull':data.get('torqueHull'),'wallSeconds':data['wallSeconds'],
                      'maxResidentBytesAfterSerialization':rss(),'outputBytes':len(output.encode()),
                      'failure':data.get('failure')}),flush=True)
    if failed:
        raise SystemExit(1)

if __name__=='__main__':
    run()
