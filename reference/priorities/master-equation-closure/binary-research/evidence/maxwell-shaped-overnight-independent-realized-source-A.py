"""Actual realized delayed-source acceleration term, not its input norm.

Frozen physical operator/null-direction derivation precedes targets. Uses the
unchanged independent Gaussian history, actual endpoint norm-ball budgets,
and closed intersecting completed source bins; no trajectory extension.
"""
import argparse,json,hashlib,importlib.util
from pathlib import Path
from fractions import Fraction as Q
def load(n):
    s=importlib.util.spec_from_file_location(n,Path(__file__).with_name('maxwell-shaped-overnight-independent-'+n+'.py'));m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
b=load('adaptive-test-check');inv=load('source-guard-check-v2');iv=b.iv
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
def cross(x,y):return x[0]*y[1]-x[1]*y[0]
def absolute(z):
    if z.a>=0:return z
    if z.b<=0:return -z
    return iv.mpf([0,max(-z.a,z.b)])
def term(r,v,nominalA,u,pa,law):
    R=b.k.norm(r);assert R.a>0;n=[x/R for x in r];vn=b.k.dot(n,v);vt=cross(n,v);an=b.k.dot(n,nominalA);at=cross(n,nominalA);D=1-vn;assert D.a>0
    nominal=vt*an+D*at;cov=b.k.norm([vt,D]);slack=cov*b.IQ(pa);q=nominal+iv.mpf([-slack.b,slack.b]);base=absolute(q)/(R*D**3)
    if law=='full':
        un=b.k.dot(n,u);ut=cross(n,u);base*=b.k.norm([ut,1-un])
    else:assert law=='E'
    return dict(norm=base,projected=q,nominalProjected=nominal,projectionError=slack,R=R,D=D)
def known():
    prior=b.known();inventory=inv.known();vec=lambda a:list(map(b.IQ,a));r=vec([2,0,0]);v=vec([0,0,0]);a=vec([0,'.03',0]);u=vec(['.2','.3',0])
    z=term(r,v,a,u,0,'E');assert b.k.contains(z['norm'],'.015')
    f=term(r,v,a,u,0,'full');assert f['norm'].a<=(b.IQ('.015')*iv.sqrt(b.IQ('.73'))).b and f['norm'].b>=(b.IQ('.015')*iv.sqrt(b.IQ('.73'))).a
    null=term(r,vec(['.2','.3',0]),vec(['.08','-.03',0]),u,0,'E');assert null['norm'].a<=0 and null['norm'].b<b.IQ('1e-50').a
    e=term(r,v,a,u,'.001','E');assert e['norm'].a<b.IQ('.015').a<e['norm'].b
    return dict(passed=True,prior=prior,inventory=inventory,cases=['stationary transverse realizedE .015','full turning .015sqrt(.73)','affine acceleration null direction','nonzero acceleration error widens projected term'])
def analyze(path):
    meta=json.loads(Path(path).read_text());assert meta['firstFailure'] is None and not meta.get('completedPrefix');rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(rows)==meta['bins'] and sha(meta['input'])==meta['inputSHA']
    row=rows[-1];T=Q(meta['horizon']);assert Q(row['t'])==T;Slo,Shi=map(Q,[row['S']['lo'],row['S']['hi']]);assert 0<Slo<=Shi<T
    ids,errors=inv.inventory(rows,Slo,Shi);errors['x']=max(errors['x'],Q(meta['pastMismatch'][0]));errors['v']=max(errors['v'],Q(meta['pastMismatch'][1]))
    saved=json.loads(Path(meta['input']).read_text());curve=b.Curve(saved['knots'],[0,0]);spread=lambda z,e:[a+iv.mpf([-b.IQ(e).b,b.IQ(e).b]) if k<2 else a for k,a in enumerate(z)]
    receiverX=spread(curve.box(T,T,0),Q(row['x']));receiverU=spread(curve.box(T,T,1),Q(row['v']));sourceQ=spread(curve.box(Slo,Shi,0),errors['x']);v=spread([-x for x in curve.box(Slo,Shi,1)],errors['v']);a=[-x for x in curve.box(Slo,Shi,2)];r=[x+y for x,y in zip(receiverX,sourceQ)];out=term(r,v,a,receiverU,errors['a'],meta['law'])
    return dict(passed=True,law=meta['law'],horizon=str(T),tubeSHA=sha(path),rowsSHA=sha(path+'.jsonl'),inputSHA=meta['inputSHA'],sourceBins=ids,sourceErrors={k:str(v) for k,v in errors.items()},enclosure=b.k.encode(out),realizedNonzero=out['norm'].a>0,scope='derived actual endpoint delayed-source acceleration contribution under already admitted original prefix; full root/current/source uncertainty and whole closed source-bin A error; no new fate')
if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--tube');ap.add_argument('--output',required=True);a=ap.parse_args();out=dict(known=known());print(json.dumps(out),flush=True)
    if a.tube:out['target']=analyze(a.tube)
    Path(a.output).write_text(json.dumps(out,indent=2)+'\n');print(json.dumps(out),flush=True)
