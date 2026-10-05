"""Frozen full Cartesian certificate→fine intrinsic prefix, no field recurrence."""
import argparse,hashlib,importlib.util,json,time,os
from fractions import Fraction as Q
from pathlib import Path
p=Path(__file__).with_name('maxwell-e-first-event-independent-source-geometry.py');s=importlib.util.spec_from_file_location('immutable_geometry',p);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def ceil(q):q=Q(q);n=10**24;return Q(-(-q.numerator*n//q.denominator),n)
def norm(*v):return g.exact.upper_norm([(Q(x),Q(x)) for x in v])
def convert(x,v,a,dx,dv,da,m,R,B,C,h):
    ex=Q(x)+dx;ev=Q(v)+dv;ea=Q(a)+da;assert 0<=ex<m
    r=ceil(ex);assert r<m;u=ceil(ev+2*B*ex/m);ac=ceil(ea+2*C*ex/m);H=ceil(R*ev+B*ex+ex*ev);nu=h/m**2 if h>0 else Q(1);Z=ceil(norm(nu*r,u));omega=ceil(u/(m-r)+B*r/((m-r)*m))
    return dict(r=r,u=u,a=ac,ur=u,ut=u,ar=ac,at=ac,H=H,Hend=H,nu=nu,Z=Z,omega=omega)
def known():
    prior=g.known();z=convert(Q('1/100'),Q('1/50'),Q('1/25'),Q(0),Q(0),Q(0),Q(2),Q(2),Q(1),Q(1),Q(1));assert z['r']==Q('1/100') and z['u']==Q('3/100') and z['a']==Q('1/20') and z['H']==Q('251/5000') and z['nu']==Q(1,4);assert z['omega']>=Q(7,398)
    assert ceil(Q(1,3))>=Q(1,3);return dict(passed=True,geometry=prior,cases=['exact component u3/100,a1/20,h251/5000','positive radius with independent weighted metadata','whole vector normalization and rational upward grid'])
def run(a):
    old=json.loads(Path(a.prefix).read_text());allrows=list(map(json.loads,Path(a.prefix+'.jsonl').read_text().splitlines()));rows=[z for z in allrows if Q(z['t'])<=54];assert len(rows)==15678 and Q(rows[-1]['t'])==Q(1899956092796567,35184372088832);assert sha(a.prefix)=='f8434f413018ea7915641aedfeac75001973c3ba6b23c2361f2559699103269f' and sha(a.prefix+'.jsonl')=='c1daec244121579ad7803561e06adc84eea51277a2d17f2405c23d354dd251bd'
    D=json.loads(Path(a.differences).read_text());B=json.loads(Path(a.input).read_text());metadata=json.loads(Path(a.metadata).read_text());assert sha(a.metadata)=='884e473852d4ff0851880dfd4f84785b47b578cc0ee99ee0b50029859ae3334b';assert old['initialErrors']==metadata['initialCartesian'] and old['pastMismatch']==metadata['pastCartesian'];assert metadata['inputSHA']==sha(a.input)==D['inputBSHA'];assert D['inputASHA']==old['inputSHA'] and D['firstFailure'] is None and Q(D['lastCompleted'])==Q(rows[-1]['t']) and D['start']=='0';assert sha(a.differences+'.jsonl')==D['rowsSHA']
    audits={k:dict(path=v,sha=sha(v)) for k,v in [('prefix',a.admitted),('recurrence',a.recurrence),('strict',a.strict)]};dx,dv,da=map(Q,D['maximumXVA']);curve=g.SourceCurve(B['knots'],B['specification']);spec=dict(input=a.input,inputSHA=sha(a.input),oldPrefix=a.prefix,oldPrefixSHA=sha(a.prefix),oldPrefixRowsSHA=sha(a.prefix+'.jsonl'),oldAudits=audits,differences=a.differences,differencesSHA=sha(a.differences),differencesRowsSHA=D['rowsSHA'],metadata=a.metadata,metadataSHA=sha(a.metadata),sourceSHA=sha(__file__),theoremSHA=sha(Path(__file__).with_name('maxwell-e-first-event-Cartesian-T54-transfer-theorem.md')),geometrySHA=sha(p),knownFirst=known(),horizon=rows[-1]['t'],start='0',physicalPastIdentical=True,oldCapsPolicy='none; independently admitted old certificate plus same-history triangle only',grade='inherited complete Cartesian actual certificate converted to intrinsic fine comparison; not new response recurrence')
    for k in ['initialIntrinsic','initialZ','initialH','initialNu','pastIntrinsic','pastOmega','initialCartesian','pastCartesian']:spec[k]=metadata[k]
    Path(a.out+'.specification.json').write_text(json.dumps(spec,indent=2)+'\n');started=time.monotonic();last=started;left=Q(0);angle=Q(0)
    with Path(a.out+'.jsonl').open('x') as out:
        for j,z in enumerate(rows):
            right=Q(z['t']);x,v,ac=[curve.box(left,right,n) for n in range(3)];geo=list(map(Q,[g.radius_lower(x),g.exact.upper_norm(x),g.exact.upper_norm(v),g.exact.upper_norm(ac),g.h_upper(x,v)]));state=convert(Q(z['x']),Q(z['v']),Q(z['a']),dx,dv,da,*geo);angle+=state['omega']*(right-left);state.update(t=right,angularPrefix=angle);row={k:str(v) for k,v in state.items()};row.update(oldIndex=j,transferGeometry=list(map(str,geo)));out.write(json.dumps(row)+'\n');left=right
            if time.monotonic()-last>=30:last=time.monotonic();out.flush();print(json.dumps(dict(event='transfer-heartbeat',pid=os.getpid(),cells=j+1,t=float(right),wallSeconds=last-started)),flush=True)
    result=dict(spec,bins=len(rows),final=row,rowsSHA=sha(a.out+'.jsonl'),failure=None,wallSeconds=time.monotonic()-started);Path(a.out).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(dict(event='transfer-complete',bins=len(rows),t=str(left),sourceSHA=spec['sourceSHA'],rowsSHA=result['rowsSHA'])),flush=True)
if __name__=='__main__':
    q=argparse.ArgumentParser();q.add_argument('--prefix');q.add_argument('--input');q.add_argument('--differences');q.add_argument('--metadata');q.add_argument('--admitted');q.add_argument('--recurrence');q.add_argument('--strict');q.add_argument('--out',required=True);a=q.parse_args()
    if a.prefix:run(a)
    else:Path(a.out).write_text(json.dumps(dict(knownFirst=known()),indent=2)+'\n')
