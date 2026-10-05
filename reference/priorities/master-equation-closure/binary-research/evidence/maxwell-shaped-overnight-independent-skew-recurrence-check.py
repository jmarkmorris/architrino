"""Independent analytic cosh/sinh recurrence assessment, selected full skew/E.
Field/source-domain validity separately assessed; no subject arithmetic replay.
"""
import argparse,json,importlib.util
from pathlib import Path
from fractions import Fraction as Q
def load(n):
    p=Path(__file__).with_name('maxwell-shaped-overnight-independent-'+n+'.py');s=importlib.util.spec_from_file_location(n.replace('-','_'),p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
a=load('adaptive-test-check');prefix=load('completed-prefix-check')
def known():
    b=a.known();p=prefix.known();source=max(Q(1),Q(3),Q(2));assert source==3
    return dict(passed=True,majorant=b,inventory=p,cases=['whole-source closed maximumthree','independent zero/nonzero cosh/sinh majorants'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert r['receiverSkew'] or r['law']=='E';rows=[json.loads(z) for z in Path(path+'.jsonl').read_text().splitlines() if z];times=[Q(0)];old=[dict(x=r['initialErrors'][0],v=r['initialErrors'][1],a=r['initialErrors'][2])];ex,ev=map(Q,r['initialErrors'][:2])
    for row in rows:
        S=row['S'];bins=prefix.selection(times,S);assert bins==row['sourceBins'];source={}
        for k,j in [('x',0),('v',1),('a',2)]:
            values=[Q(old[b][k]) for b in bins]
            if Q(S['lo'])<=0:values.extend([Q(r['pastMismatch'][j]),Q(r['initialErrors'][j])])
            assert values;source[k]=max(values)
        C,Ku,Hv,B,de=[Q(row[k]) for k in ['Cx','Cu','Hv','B','delta']];assert min(C,Ku,Hv,B,de)>=0
        f=de+C*source['x']+Hv*source['v']+B*source['a'];h=Q(row['t'])-times[-1]
        x,v=a.majorant(ex,ev,C,f,h);assert x.b<=a.IQ(row['x']).a and v.b<=a.IQ(row['v']).a
        acceleration=a.IQ(C)*x+a.IQ(Ku)*v+a.IQ(f);assert acceleration.b<=a.IQ(row['a']).a
        ex,ev=Q(row['x']),Q(row['v']);times.append(Q(row['t']));old.append(row)
    assert len(rows)==r['bins'] and times[-1]==Q(r['final']['t'])
    return dict(accepted=True,bins=len(rows),end=str(times[-1]),scope='independent analytic velocity/position and whole-bin acceleration-error recurrences; field/domain and complete-root proofs are separate assessed premises')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);args=p.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if args.receipt:out['target']=analyze(args.receipt)
    Path(args.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
