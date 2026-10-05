"""Separate rational reconstruction of complete Cartesian-to-intrinsic transfer.
The integrator's independently reconstructed theorem is authority; this checks
implementation and immutable full history, not a new physical recurrence.
"""
import argparse,hashlib,importlib.util,json,time
from fractions import Fraction as F
from pathlib import Path
from math import isqrt
p=Path(__file__).with_name('maxwell-e-first-event-independent-source-geometry.py');s=importlib.util.spec_from_file_location('immutable_independent_geometry',p);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def upward(q):q=F(q);n=10**24;return F((q.numerator*n+q.denominator-1)//q.denominator,n)
def sqrt_upper(q):q=F(q);n=10**40;k=isqrt(q.numerator*n*n//q.denominator);return F(k+(F(k*k,n*n)<q),n)
def expected(old,d,geo):
    X=F(old['x'])+d[0];V=F(old['v'])+d[1];A=F(old['a'])+d[2];m,R,B,C,h=geo;assert X<m;rad=upward(X);speed=upward(V+2*B*X/m);acc=upward(A+2*C*X/m);cross=upward(R*V+B*X+X*V);weight=h/m**2 if h else F(1);assert m-rad>0
    return dict(r=rad,u=speed,a=acc,ur=speed,ut=speed,ar=acc,at=acc,H=cross,Hend=cross,nu=weight,Z=upward(sqrt_upper((weight*rad)**2+speed**2)),omega=upward(speed/(m-rad)+B*rad/((m-rad)*m)))
def known():
    prior=g.known();z=expected(dict(x='1/100',v='1/50',a='1/25'),[F(0)]*3,list(map(F,[2,2,1,1,1])));assert z['u']==F(3,100) and z['a']==F(1,20) and z['H']==F(251,5000) and z['omega']>=F(7,398);assert sqrt_upper(25)==5 and upward(F(1,3))>=F(1,3);return dict(passed=True,geometry=prior,cases=['exact independent component and cross product conversion','independent rational square-root/upward rounding','separate radius and positive actual margin'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert r['failure'] is None and r['physicalPastIdentical'];old=json.loads(Path(r['oldPrefix']).read_text());oldrows=list(map(json.loads,Path(r['oldPrefix']+'.jsonl').read_text().splitlines()));selected=[z for z in oldrows if F(z['t'])<=54];rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert len(selected)==len(rows)==r['bins']==15678 and F(selected[-1]['t'])==F(1899956092796567,35184372088832);assert sha(r['oldPrefix'])==r['oldPrefixSHA']=='f8434f413018ea7915641aedfeac75001973c3ba6b23c2361f2559699103269f';assert sha(r['oldPrefix']+'.jsonl')==r['oldPrefixRowsSHA']=='c1daec244121579ad7803561e06adc84eea51277a2d17f2405c23d354dd251bd';assert sha(path+'.jsonl')==r['rowsSHA']
    for key,item in r['oldAudits'].items():
        j=json.loads(Path(item['path']).read_text());assert sha(item['path'])==item['sha'];t=j.get('target',j);assert t.get('acceptedPrefix') or t.get('accepted') or t.get('passed');assert j['known']['passed'];assert t.get('bins',t.get('cells'))==len(oldrows);assert t.get('subjectSHA',t.get('receiptSHA',r['oldPrefixSHA']))==r['oldPrefixSHA'];assert t.get('rowsSHA',r['oldPrefixRowsSHA'])==r['oldPrefixRowsSHA'];assert F(t.get('end',t.get('lastCovered',old['final']['t'])))==F(old['final']['t'])
    metadata=json.loads(Path(r['metadata']).read_text());assert sha(r['metadata'])==r['metadataSHA']=='884e473852d4ff0851880dfd4f84785b47b578cc0ee99ee0b50029859ae3334b';assert old['initialErrors']==metadata['initialCartesian'] and old['pastMismatch']==metadata['pastCartesian']
    for k in ['initialIntrinsic','initialZ','initialH','initialNu','pastIntrinsic','pastOmega','initialCartesian','pastCartesian']:assert r[k]==metadata[k]
    D=json.loads(Path(r['differences']).read_text());dr=list(map(json.loads,Path(r['differences']+'.jsonl').read_text().splitlines()));assert sha(r['differences'])==r['differencesSHA'] and sha(r['differences']+'.jsonl')==D['rowsSHA']==r['differencesRowsSHA'];assert D['firstFailure'] is None;d=list(map(F,D['maximumXVA']));clock=F(0)
    for cell in dr:
        assert F(cell['left'])==clock<F(cell['right']);clock=F(cell['right'])
        for n,b in enumerate(cell['componentBoxes']):assert F(cell['normUpper'][n])>=sqrt_upper(sum(max(abs(F(a)),abs(F(b)))**2 for a,b in b)) and F(cell['normUpper'][n])<=d[n]
    assert len(dr)==D['cells'] and clock==F(r['horizon']) and [max(F(c['normUpper'][n]) for c in dr) for n in range(3)]==d
    B=json.loads(Path(r['input']).read_text());assert sha(r['input'])==r['inputSHA']==D['inputBSHA']==metadata['inputSHA'] and old['inputSHA']==D['inputASHA'];curve=g.SourceCurve(B['knots'],B['specification']);left=F(0);angle=F(0);started=time.monotonic();last=started;minR=None;maxV=maxA=F(0)
    for j,(a,b) in enumerate(zip(selected,rows)):
        right=F(a['t']);assert F(b['t'])==right>left and b['oldIndex']==j;x,v,acc=[curve.box(left,right,n) for n in range(3)];geo=list(map(F,[g.radius_lower(x),g.exact.upper_norm(x),g.exact.upper_norm(v),g.exact.upper_norm(acc),g.h_upper(x,v)]));assert list(map(F,b['transferGeometry']))==geo;e=expected(a,d,geo)
        for k,value in e.items():assert F(b[k])==value,k
        angle+=e['omega']*(right-left);assert F(b['angularPrefix'])==angle;actualR=geo[0]-e['r'];actualV=geo[2]+e['u'];assert actualR>0 and actualV<1;minR=actualR if minR is None else min(minR,actualR);maxV=max(maxV,actualV);maxA=max(maxA,geo[3]+e['a']);left=right
        if time.monotonic()-last>=30:last=time.monotonic();print(json.dumps(dict(event='independent-transfer-heartbeat',cells=j+1,t=float(right))),flush=True)
    assert r['final']==rows[-1] and left==F(r['horizon']);return dict(passed=True,cells=len(rows),end=str(left),subjectSHA=sha(path),rowsSHA=r['rowsSHA'],actualRadiusLower=str(minR),actualSpeedUpper=str(maxV),actualPhysicalAccelerationUpper=str(maxA),wallSeconds=time.monotonic()-started,scope='immutable admitted v9 full Cartesian prefix, complete union difference, physical vector/component and areal-rate bounds, complete closed-bin angular inventory, identical fine negative past/initial metadata; no new field recurrence')
if __name__=='__main__':
    q=argparse.ArgumentParser();q.add_argument('--receipt');q.add_argument('--out',required=True);a=q.parse_args();result=dict(knownFirst=known());print(json.dumps(result),flush=True)
    if a.receipt:result['target']=analyze(a.receipt)
    Path(a.out).write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result),flush=True)
