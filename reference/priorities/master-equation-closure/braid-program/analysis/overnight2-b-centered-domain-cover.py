"""Same-domain/same-budget cover with centered sums and the endpoint theorem."""
import argparse,hashlib,importlib.util,json,resource,time
from collections import deque
from fractions import Fraction as F
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[4]
SOURCE=HERE/'overnight2-b-centered-crossing.py';EXPECTED='f72acdc4025c8ee4e401ea1d7005e236e0776918ed9ce5e0ea07d85ec085265f'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
assert sha(SOURCE)==EXPECTED
spec=importlib.util.spec_from_file_location('frozen_centered',SOURCE);subject=importlib.util.module_from_spec(spec);spec.loader.exec_module(subject)
base=subject.base;iv=subject.iv
OUT=ROOT/'.local-data/master-equation-closure/overnight2-b/centered-domain-cover'
START=time.monotonic();LAST=START
DOMAIN=[(F(1,10),F(5,6)),(F(1,20),F(4,5)),(F(1,10),F(1))]
CAPS=dict(cells=12000,wallSeconds=900,rssBytes=512*1024**2,receiptBytes=8*1024**2,depth=24)
def volume(box):
    v=F(1)
    for a,b in box:v*=b-a
    return v

def classify(box):
    H,beta,eta=map(base.interval,box);kappa=eta*iv.sqrt(iv.mpf('.95')**2-beta**2)/H
    if (2*kappa).b<iv.pi.a:return dict(kind='analytic-endpoint',twiceRateUpper=base.encoded(2*kappa)[1])
    direct=base.cell(box)
    if direct['kind']!='unresolved':return direct
    widths=[(b-a)/(DOMAIN[i][1]-DOMAIN[i][0]) for i,(a,b) in enumerate(box)]
    if max(widths)>F(1,4):return direct
    T,Z=subject.centered(box);tl,tu=base.ends(T);zl,zu=base.ends(Z)
    kind='centered-torque' if tl>0 or tu<0 else 'centered-axial' if zl>0 or zu<0 else 'unresolved'
    return dict(kind=kind,torque=base.encoded(T),axial=base.encoded(Z))

def cover(domain,classifier,limit,maxdepth,monitor):
    global LAST
    pending=deque([(domain,0)]);leaves=[];unresolved=[];calls=0;failure=None;active=None
    try:
        while pending and calls<limit:
            if monitor:
                if time.monotonic()-START>CAPS['wallSeconds']:raise TimeoutError('wall cap')
                if resource.getrusage(resource.RUSAGE_SELF).ru_maxrss>CAPS['rssBytes']:raise MemoryError('resident cap')
            box,depth=pending.popleft();active=(box,depth);calls+=1;result=classifier(box)
            row=dict(box=[[str(a),str(b)] for a,b in box],depth=depth,**result)
            if result['kind']!='unresolved':leaves.append(row)
            elif depth>=maxdepth:unresolved.append(row)
            else:
                widths=[(b-a)/(DOMAIN[i][1]-DOMAIN[i][0]) for i,(a,b) in enumerate(box)]
                axis=max(range(3),key=lambda i:widths[i]);a,b=box[axis];m=(a+b)/2
                left=list(box);right=list(box);left[axis]=(a,m);right[axis]=(m,b)
                pending.extend([(left,depth+1),(right,depth+1)])
            active=None
            if monitor and time.monotonic()-LAST>10:
                print(json.dumps(dict(progress='centered domain',calls=calls,excluded=len(leaves),unresolved=len(unresolved),pending=len(pending))),flush=True);LAST=time.monotonic()
    except (ArithmeticError,TimeoutError,MemoryError) as exc:failure=str(exc)
    if active is not None:pending.appendleft(active)
    pending_rows=[dict(box=[[str(a),str(b)] for a,b in box],depth=depth) for box,depth in pending]
    excluded_volume=sum((volume([(F(a),F(b)) for a,b in row['box']]) for row in leaves),F(0))
    remainder_volume=sum((volume([(F(a),F(b)) for a,b in row['box']]) for row in unresolved+pending_rows),F(0))
    assert excluded_volume+remainder_volume==volume(domain)
    return dict(passed=failure is None and not unresolved and not pending_rows,calls=calls,excluded=leaves,unresolved=unresolved,pending=pending_rows,
        failure=failure,excludedParameterVolume=str(excluded_volume),totalParameterVolume=str(volume(domain)))

def save(stage,data):
    OUT.mkdir(parents=True,exist_ok=True);p=OUT/(stage+'.json')
    payload=dict(instrumentSha256=sha(Path(__file__)),dependencySha256=EXPECTED,K=1,c_f=1,wallSeconds=time.monotonic()-START,
        maxRssBytes=resource.getrusage(resource.RUSAGE_SELF).ru_maxrss,caps=CAPS,**data)
    text=json.dumps(payload,indent=2)
    if len(text)>CAPS['receiptBytes']:raise RuntimeError('receipt cap')
    with p.open('x') as f:f.write(text+'\n')
    print(json.dumps(dict(receipt=str(p),sha256=sha(p))),flush=True)

def known():
    toy=[(F(0),F(1))]*3
    # Every leaf closes only after each coordinate width is at most 1/2: exactly eight equal cubes.
    result=cover(toy,lambda b:dict(kind='known-positive' if max(c-a for a,c in b)<=F(1,2) else 'unresolved'),100,10,False)
    assert result['passed'] and len(result['excluded'])==8 and result['calls']==15
    assert result['excludedParameterVolume']==result['totalParameterVolume']=='1'
    T,Z=subject.field([(F(1),F(1)),(F(0),F(0)),(F(0),F(0))])
    subject.encloses(T.g[1],F(19,12));subject.encloses(Z.g[2],F(-133,48))
    assert classify([(F(1),F(3,2)),(F(1,10),F(1,5)),(F(1,10),F(1,5))])['kind']=='analytic-endpoint'
    save('known',dict(passed=True,controls=['eight-cube exact traversal and volume conservation','known static implicit derivatives','known short endpoint-rate box']))

def run(stage):
    kp=OUT/'known.json';known=json.loads(kp.read_text());assert known['passed'] and known['instrumentSha256']==sha(Path(__file__))
    domain=DOMAIN if stage=='target' else [(F(1,5),F(3,10)),(F(1,5),F(2,5)),(F(7,10),F(9,10))]
    result=cover(domain,classify,12000 if stage=='target' else 80,24,True)
    save(stage,dict(knownSha256=sha(kp),domain=[[str(a),str(b)] for a,b in domain],**result,
        claim='Subject same-domain improved enclosure; exact volume is parameter coverage, not physical probability or cost evidence; independent review required'))
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--stage',choices=['known','pilot','target'],required=True);a=p.parse_args();known() if a.stage=='known' else run(a.stage)
