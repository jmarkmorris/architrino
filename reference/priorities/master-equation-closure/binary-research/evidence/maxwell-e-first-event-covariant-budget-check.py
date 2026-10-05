"""Frozen Section42 original E checkpoint/guard bridge, in one constant frame.

The independently assessed quotient proof and constant-rotation theorem are
premises. This adapter imports only separate reference arithmetic/history and
never runs an event criterion or appends an actual future.
"""
import argparse,hashlib,importlib.util,json
from fractions import Fraction as Q
from pathlib import Path

def load(name):
    p=Path(__file__).with_name(name+'.py');s=importlib.util.spec_from_file_location(name.replace('-','_'),p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
rec=load('maxwell-e-first-event-quotient-recurrence-reference')
hist=load('maxwell-e-first-event-domain-audit')
IQ,iv=rec.IQ,rec.iv
TC=Q('119/2');GUARD=(Q('58.95'),Q('59.35'))
INPUT_SHA='187bc2739487ff983b3b095451c9b961d1fa5212d70f96a1eb4ebf7721b0a495'

def guard_bounds(times,errors,guard,tc,nominal):
    lo,hi=guard;assert times[-1]==tc and lo>0 and hi<tc
    bins=rec.selected(times,lo,hi)
    intrinsic=[max(errors[j][k] for j in bins) for k in ['r','u','a']]
    # No prospective cell exists: the final receiving interval is completed.
    # The separate angular integrator gets a zero-length final trial face.
    psi=Q(0);coverage=Q(0)
    for j in range(1,len(times)):
        a=max(lo,times[j-1]);b=min(tc,times[j])
        if a<b:psi+=(b-a)*errors[j]['omega'];coverage+=b-a
    assert coverage==tc-lo
    budgets=[IQ(e)+n*IQ(psi) for e,n in zip(intrinsic,nominal)]
    return bins,intrinsic,psi,budgets

def known():
    prior=dict(recurrence=rec.known(),history=hist.known())
    times=list(map(Q,[0,1,2]));errors=[dict(r=Q(0),u=Q(0),a=Q(0),omega=Q(0)),dict(r=Q('.01'),u=Q('.02'),a=Q('.03'),omega=Q('.1')),dict(r=Q('.001'),u=Q('.002'),a=Q('.003'),omega=Q('.2'))]
    bins,e,p,b=guard_bounds(times,errors,(Q(1),Q('3/2')),Q(2),list(map(IQ,[2,3,4])))
    assert bins==[1,2] and e==list(map(Q,['.01','.02','.03'])) and p==Q('.2')
    for x,y in zip(b,['.41','.62','.83']):assert hist.m.k.contains(x,IQ(y))
    # The same nonzero physical tuple under a quarter turn preserves norms.
    q,v,a=[[IQ(2),IQ(0)],[IQ('.2'),IQ('.3')],[IQ('.4'),IQ('-.1')]]
    for z in [q,v,a]:assert hist.m.k.contains(hist.m.k.norm([-z[1],z[0],IQ(0)]),hist.m.k.norm(z+[IQ(0)]))
    return dict(passed=True,prior=prior,cases=['closed guard seam retains both bins','exact finite checkpoint angular increment1/5','nonzero source X/V/A budgets41/100,62/100,83/100','quarter-turn norm covariance for nonzero physical X/V/A'])

def sha(path):return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def analyze(path):
    result=json.loads(Path(path).read_text());assert result['failure'] is None and Q(result['final']['t'])==Q(result['horizon'])==TC
    assert result['law']=='E' and result['K']==result['cf']==1 and sha(result['input'])==result['inputSHA']==INPUT_SHA
    saved=json.loads(Path(result['input']).read_text());curve=hist.CompleteNominal(saved['knots'],saved['specification'])
    rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(rows)==result['bins']
    times=[Q(0)]+[Q(row['t']) for row in rows];errors=[{k:Q(v) for k,v in result['initialIntrinsic'].items()}]+[{k:Q(row[k]) for k in ['r','u','a','omega']} for row in rows]
    nominal=[hist.m.k.norm(curve.box(*GUARD,n)) for n in range(3)]
    bins,e,psi,budgets=guard_bounds(times,errors,GUARD,TC,nominal)
    receiver=list(map(Q,[result['final']['r'],result['final']['u']]))
    receiverPass=[x<=b for x,b in zip(receiver,map(Q,['.001','.005']))]
    sourcePass=[x.b<=IQ(b).a for x,b in zip(budgets,['.001','.001','.01'])]
    return dict(budgetsSupplied=all(receiverPass+sourcePass),subjectSHA=sha(path),rowsSHA=sha(path+'.jsonl'),checkpoint=str(TC),guard=list(map(str,GUARD)),guardClosedBins=bins,receivingXVinConstantFrame=list(map(str,receiver)),sourceIntrinsic=list(map(str,e)),checkpointRelativeAngle=str(psi),nominalGuardXVA=list(map(hist.m.k.encode,nominal)),sourceXVAinConstantFrame=list(map(hist.m.k.encode,budgets)),receivingBudgetPass=receiverPass,sourceBudgetPass=sourcePass,scope='same original E preparation; existential single constant comparison rotation; independently assessed prefix/root/response required; no event criterion run and no actual postcheckpoint future')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();out=dict(knownFirst=known());print(json.dumps(out),flush=True)
    if a.receipt:out['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out),flush=True)
