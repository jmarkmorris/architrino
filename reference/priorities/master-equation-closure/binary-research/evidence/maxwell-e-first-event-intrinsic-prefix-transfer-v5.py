"""Complete same-physical-history intrinsic triangle certificate transfer.
No field/root response is evaluated on the inherited prefix. The independently
admitted old certificate and separately assessed triangle theorem are premises.
"""
import argparse,hashlib,importlib.util,json,time,os
from fractions import Fraction as Q
from pathlib import Path
from datetime import datetime
p=Path(__file__).with_name('maxwell-e-first-event-independent-source-geometry.py')
s=importlib.util.spec_from_file_location('immutable_geometry',p);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def ceil(q):q=Q(q);n=10**24;return Q(-(-q.numerator*n//q.denominator),n)
def norm(*q):return g.exact.upper_norm([(Q(x),Q(x)) for x in q])
def transfer(old,dx,dv,da,m0,m1,R0,B0,A0,R1,B1,A1,h1):
    assert min(m0,m1,Q(old['nu']))>0 and min(dx,dv,da)>=0
    du=dv+2*B0*dx/m1;dA=da+2*A0*dx/m1;dh=R0*dv+B0*dx+dx*dv;dw=du/m1+B0*dx/(m1*m0)
    nu=Q(old['nu']);Z=ceil(Q(old['Z'])+norm(nu*dx,du));H=ceil(Q(old['H'])+dh);r=ceil(Z/nu);assert m1-r>0
    ur=Z;ut=ceil(Q(old['ut'])+du);ar=ceil(Q(old['ar'])+dA);at=ceil(Q(old['at'])+dA);omega=ceil(Q(old['omega'])+dw)
    # Complete physical derivative densities, without actual jerk.
    ra=m1-r;ha=h1+H
    rd=ceil(ar+3*ha*ha*r/ra**4+(ha+h1)*H/m1**3)
    hd=ceil((R1+r)*at+r*A1)
    return dict(Z=Z,H=H,Hend=H,nu=nu,r=r,ur=ur,ut=ut,u=ceil(norm(ur,ut)),ar=ar,at=at,a=ceil(norm(ar,at)),omega=omega,radialDerivativeError=rd,hDerivativeError=hd)
def known():
    prior=g.known();old=dict(nu='1',Z='1/10',H='1/5',ut='3/10',ar='2/5',at='1/2',omega='1/4')
    z=transfer(old,Q(0),Q(0),Q(0),Q(2),Q(2),Q(2),Q(1),Q(1),Q(2),Q(1),Q(1),Q(1));assert z['Z']==Q('1/10') and z['H']==Q('1/5') and z['ut']==Q('3/10') and z['omega']==Q('1/4')
    b=transfer(old,Q('1/100'),Q('1/50'),Q('1/25'),Q(2),Q(2),Q(2),Q(1),Q(1),Q(2),Q(1),Q(1),Q(1));assert b['Z']>=Q('1/10')+norm(Q('1/100'),Q('3/100'));assert b['H']==Q('1251/5000') and b['ut']==Q('33/100') and b['ar']==Q('9/20') and b['omega']==Q('107/400')
    assert ceil(Q(1,3))>=Q(1,3) and ceil(Q(1,3))-Q(1,3)<Q(1,10**24)
    return dict(passed=True,geometry=prior,cases=['zero difference retains exact intrinsic state','nonzero complete triangle Z/H/components/omega','physical radial and h derivative densities; no jerk','outward common rational grid'])
def run(a):
    old=json.loads(Path(a.prefix).read_text());oldrows=list(map(json.loads,Path(a.prefix+'.jsonl').read_text().splitlines()));D=json.loads(Path(a.differences).read_text());A=json.loads(Path(old['input']).read_text());B=json.loads(Path(a.input).read_text());assert old['sourceSHA']=='2971901cb75796714a601a1197f1ae2326e553f065f849c17a041d966fa6cf54' and old['bins']==len(oldrows)==9029 and sha(a.prefix)=='5884ef285077fa61d232c5813fd52c1cf152fd1732d3266ac27e7cac993dd988'
    assert old['inputSHA']==sha(old['input'])==D['inputASHA'] and sha(a.input)==D['inputBSHA'] and D['firstFailure'] is None and Q(D['lastCompleted'])==Q(old['final']['t']) and Q(D['start'])==0
    assert A['specification']==B['specification'] and A['knots'][0]==B['knots'][0]
    audits={}
    for key,path in [('recurrence',a.recurrence),('domain',a.domain)]:
        j=json.loads(Path(path).read_text());t=j['target'];assert j['knownFirst']['passed'] and t['subjectSHA']==sha(a.prefix) and t['rowsSHA']==sha(a.prefix+'.jsonl') and (t.get('acceptedRecurrence') or t.get('passed'));audits[key]=dict(path=path,sha=sha(path))
    assert sha(a.differences+'.jsonl')==D['rowsSHA'];rows=list(map(json.loads,Path(a.differences+'.jsonl').read_text().splitlines()));next=Q(0)
    for z in rows:assert Q(z['left'])==next<Q(z['right']);next=Q(z['right'])
    assert next==Q(old['final']['t']) and len(rows)==D['cells'];dx,dv,da=map(Q,D['maximumXVA']);assert [max(Q(z['normUpper'][k]) for z in rows) for k in range(3)]==[dx,dv,da]
    ca=g.SourceCurve(A['knots'],A['specification']);cb=g.SourceCurve(B['knots'],B['specification']);assert not Path(a.out).exists() and not Path(a.out+'.jsonl').exists()
    spec=dict(input=a.input,inputSHA=sha(a.input),oldPrefix=a.prefix,oldPrefixSHA=sha(a.prefix),oldPrefixRowsSHA=sha(a.prefix+'.jsonl'),oldAudits=audits,differences=a.differences,differencesSHA=sha(a.differences),differencesRowsSHA=D['rowsSHA'],sourceSHA=sha(__file__),geometrySHA=sha(p),triangleTheoremSHA=sha(p.with_name('maxwell-e-first-event-intrinsic-curve-triangle-theorem.md')),knownFirst=known(),start='0',horizon=old['final']['t'],grade='same unchanged physical complete preparation; inherited actual certificate transferred by continuum intrinsic triangle, not new field/response recurrence',oldCapsPolicy='none; independently admitted old certificate plus same-history triangle only',physicalPastIdentical=True)
    for key in ['initialIntrinsic','initialZ','initialH','initialNu','pastIntrinsic','pastOmega','initialCartesian','pastCartesian']:spec[key]=old[key]
    Path(a.out+'.specification.json').write_text(json.dumps(spec,indent=2)+'\n');started=time.monotonic();last=started;left=Q(0);angle=Q(0);final=None
    with Path(a.out+'.jsonl').open('x') as out:
        for j,z in enumerate(oldrows):
            assert time.time()<datetime.fromisoformat(a.deadline.replace('Z','+00:00')).timestamp();right=Q(z['t']);x0,v0,a0=[ca.box(left,right,n) for n in range(3)];x1,v1,a1=[cb.box(left,right,n) for n in range(3)]
            geo=list(map(Q,[g.radius_lower(x0),g.radius_lower(x1),g.exact.upper_norm(x0),g.exact.upper_norm(v0),g.exact.upper_norm(a0),g.exact.upper_norm(x1),g.exact.upper_norm(v1),g.exact.upper_norm(a1),g.h_upper(x1,v1)]));state=transfer(z,dx,dv,da,*geo);angle+=state['omega']*(right-left);state.update(t=right,angularPrefix=angle)
            row={k:str(v) for k,v in state.items()};row['transferGeometry']=list(map(str,geo));row['oldIndex']=j;out.write(json.dumps(row)+'\n');out.flush();left=right;final=row
            if time.monotonic()-last>=30:last=time.monotonic();print(json.dumps(dict(event='transfer-heartbeat',pid=os.getpid(),cells=j+1,t=float(right),wallSeconds=last-started)),flush=True)
    result=dict(spec,bins=len(oldrows),final=final,rowsSHA=sha(a.out+'.jsonl'),failure=None,wallSeconds=time.monotonic()-started);Path(a.out).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--prefix');parser.add_argument('--input');parser.add_argument('--differences');parser.add_argument('--recurrence');parser.add_argument('--domain');parser.add_argument('--deadline',default='2026-10-05T21:47:16Z');parser.add_argument('--out',required=True);a=parser.parse_args()
    if a.prefix:run(a)
    else:
        with Path(a.out).open('x') as out:out.write(json.dumps(dict(knownFirst=known()),indent=2)+'\n')
