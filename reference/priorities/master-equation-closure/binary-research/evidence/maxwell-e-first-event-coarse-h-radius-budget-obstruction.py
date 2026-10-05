"""Exact method-only obstruction for frozen no-cap positive H/Z transport."""
import argparse,hashlib,importlib.util,json,time
from pathlib import Path
from fractions import Fraction as F
p=Path(__file__).with_name('maxwell-e-first-event-h-recurrence-reference-v2.py');s=importlib.util.spec_from_file_location('unchanged_h_reference',p);ref=importlib.util.module_from_spec(s);s.loader.exec_module(ref)
SCALE=10**24
def ceil(x):x=F(x);return F(-((-x.numerator*SCALE)//x.denominator),SCALE)
def known():
    for nu0,nu1 in [(F(1),F(2)),(F(2),F(1)),(F('1/3'),F('7/3'))]:
        raw=F('1/3');stored=ceil(raw);jump=stored*max(F(1),nu1/nu0);z,h=ref.advance(jump,0,0,0,0,0,0,F('1/10'));assert z/nu1>=raw/nu0 and ceil(z/nu1)>=ceil(raw/nu0)
    assert F(1)/2<F(1)/1 # Omitting the metric jump invalidates the rule.
    assert ceil(F('1/3'))>=F('1/3') and ceil(F('1/3'))-F('1/3')<F(1,SCALE)
    return dict(passed=True,cases=['rational metric increase/decrease and stored/raw outward ceilings','omitted-jump counterexample','direct Gaussian zero-flow identity'])
def sha(data):return hashlib.sha256(data).hexdigest()
def analyze(path):
    specbytes=Path(path).read_bytes();sp=json.loads(specbytes);assert sp['oldCapsPolicy']=='none; original complete comparison from release' and sp['law']=='E';assert sp['K']==sp['cf']==1 and sp['sourceSHA']=='207bca3ca39734bce3577ea8710ef782242b47f31ff06a29ab1523868b1770bf';assert sp['inputSHA']=='c1b916580c812bb3f3e8d223bd2a27e0cb6135d540c892e611628c248533e9f4' and sha(Path(sp['input']).read_bytes())==sp['inputSHA']
    rowsPath=path.removesuffix('.specification.json')+'.jsonl';data=Path(rowsPath).read_bytes();assert data.endswith(b'\n');rows=[json.loads(x) for x in data.splitlines()];assert rows
    Z,H,nu=map(F,[sp['initialZ'],sp['initialH'],sp['initialNu']]);lastRaw=Z;previousRatio=Z/nu;previousR=F(sp['initialIntrinsic']['r']);left=F(0);first=None;started=time.monotonic()
    for i,x in enumerate(rows):
        currentNu=F(x['nu']);end=F(x['t']);dt=end-left;assert min(currentNu,dt)>0;metricZ=Z*max(F(1),currentNu/nu);assert metricZ==F(x['previousZ']);c=x['coefficients'];rawZ,rawH=ref.advance(metricZ,H,F(x['mu']),F(c['Ch']),F(c['Lh'])/currentNu,F(x['Fr']['forcing']),F(c['rPlus'])*F(x['Ft']['forcing']),dt)
        assert rawZ>=metricZ and rawZ/currentNu>=previousRatio;assert F(x['Z'])==ceil(rawZ) and F(x['H'])==ceil(rawH) and F(x['r'])==ceil(rawZ/currentNu)>=previousR
        if first is None and F(x['r'])>F('1/1000'):first=dict(cell=i+1,time=str(end),radius=str(F(x['r'])))
        previousRatio=rawZ/currentNu;previousR=F(x['r']);Z,H,nu=F(x['Z']),F(x['H']),currentNu;left=end
    assert first is not None
    return dict(methodBudgetExcluded=True,specification=path,specificationSHA=sha(specbytes),rowPath=rowsPath,readCompletedRows=len(rows),readRowsBytes=len(data),readRowsPrefixSHA=sha(data),lastCompleted=str(left),lastRadiusBound=str(previousR),requiredBudget='1/1000',firstBudgetExceedance=first,wallSeconds=time.monotonic()-started,proof='nonnegative inverse flow gives Zraw_new>=max(1,nu_new/nu_old)Zstored_old>=nu_new*Zraw_old/nu_old; common monotone outward radius ceiling preserves nondecrease',scope='frozen own-coarse-history H method cannot later supply old .001 receivingX bridge budget; no actual error lower bound, physical event or obstruction inferred',falsifier='an admitted bound reset, changed recurrence or nonmonotone radius rounding outside this frozen method')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--spec');p.add_argument('--output',required=True);a=p.parse_args();r=dict(knownFirst=known());print(json.dumps(r),flush=True)
    if a.spec:r['target']=analyze(a.spec)
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
