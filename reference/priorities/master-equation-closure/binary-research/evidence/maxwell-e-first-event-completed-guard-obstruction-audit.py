"""Independent exact stopping-inequality audit only; no field or fate verdict."""
import argparse,hashlib,json
from fractions import Fraction as F
from pathlib import Path

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def margin(left,lo,hi):
    left,lo,hi=map(F,[left,lo,hi]);assert lo<=hi;return dict(past=lo+6,completed=left-hi)
def known():
    a=margin(5,1,4);assert a==dict(past=F(7),completed=F(1));b=margin(5,1,6);assert b['completed']==-1;c=margin(5,-6,5);assert c['past']==c['completed']==0
    return dict(passed=True,cases=['known strict completed margin1','known ahead margin−1','both strict equality faces rejected'])
def target(path):
    r=json.loads(Path(path).read_text());assert r['failure']['message']=='entire transformed source guard completed';c=r['failure']['candidate'];assert c['left']==r['failure']['lastCompleted']==r['final']['t'];v=margin(c['left'],c['proposed']['lo'],c['proposed']['hi']);assert v['past']>0 and v['completed']<0;rows=Path(path+'.jsonl').read_text().splitlines();assert len(rows)==r['bins'] and json.loads(rows[-1])['t']==c['left'];return dict(passed=True,subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),sourceSHA=r['sourceSHA'],cells=r['bins'],left=c['left'],right=c['right'],proposed=c['proposed'],guardPastMargin=str(v['past']),guardCompletedMargin=str(v['completed']),excessAfterCompleted=str(-v['completed']),trialR=c['trialR'],trialW=c['trialW'],trialU=c['trialU'],attempts=c['attempts'],classification='non-authoritative completed-source search guard crosses receiving face before field/root/cylinder acceptance',scope='exact stored stopping inequality and completed-row binding only; full prefix recurrence/domain separate; no actual root loss, collision, capture, event or universal guard impossibility established')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=target(a.receipt)
    with Path(a.output).open('x') as f:f.write(json.dumps(out,indent=2)+'\n')
    print(json.dumps(out),flush=True)
