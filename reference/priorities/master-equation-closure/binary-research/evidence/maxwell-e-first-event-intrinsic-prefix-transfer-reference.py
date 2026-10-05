"""Separate exact rational audit of triangle transfer and complete history state.
The triangle theorem is independently assessed by the integrator; parity checks
its implementation. Immutable exact polynomial/source references retain authority.
"""
import argparse,hashlib,importlib.util,json,time
from fractions import Fraction as F
from math import isqrt
from pathlib import Path
p=Path(__file__).with_name('maxwell-e-first-event-independent-source-geometry.py');s=importlib.util.spec_from_file_location('frozen_geometry',p);g=importlib.util.module_from_spec(s);s.loader.exec_module(g)
def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def root(q):
    q=F(q);n=10**40;i=isqrt(q.numerator*n*n//q.denominator);return F(i+(F(i*i,n*n)<q),n)
def rounded(q):q=F(q);s=10**24;return F((q.numerator*s+q.denominator-1)//q.denominator,s)
def expected(old,d,geometry):
    x,v,a=d;r0,r1,R0,V0,A0,R1,V1,A1,h1=geometry;n=F(old['nu']);assert min(r0,r1,n)>0
    vv=v+F(2)*V0*x/r1;aa=a+F(2)*A0*x/r1;hh=R0*v+V0*x+x*v;ww=vv/r1+V0*x/(r1*r0)
    z=rounded(F(old['Z'])+root((n*x)**2+vv**2));h=rounded(F(old['H'])+hh);r=rounded(z/n);ra=r1-r;assert ra>0
    ut=rounded(F(old['ut'])+vv);ar=rounded(F(old['ar'])+aa);at=rounded(F(old['at'])+aa)
    radial=rounded(ar+3*(h1+h)**2*r/ra**4+(2*h1+h)*h/r1**3);hd=rounded((R1+r)*at+r*A1)
    return dict(nu=n,Z=z,H=h,Hend=h,r=r,ur=z,ut=ut,u=rounded(root(z*z+ut*ut)),ar=ar,at=at,a=rounded(root(ar*ar+at*at)),omega=rounded(F(old['omega'])+ww),radialDerivativeError=radial,hDerivativeError=hd)
def known():
    prior=g.known();old=dict(nu=1,Z='1/10',H='1/5',ut='3/10',ar='2/5',at='1/2',omega='1/4');geo=list(map(F,[2,2,2,1,1,2,1,1,1]));z=expected(old,list(map(F,['1/100','1/50','1/25'])),geo);assert z['H']==F('1251/5000') and z['omega']==F('107/400') and z['ar']==F('9/20');assert root(25)==5 and rounded(F(1,3))>=F(1,3)
    return dict(passed=True,geometry=prior,cases=['independent nonzero scalar triangle h1251/5000 omega107/400','independent squared norm and outward rational ceiling','physical derivative densities without source jerk'])
def analyze(path):
    r=json.loads(Path(path).read_text());assert r['failure'] is None and r['physicalPastIdentical'];old=json.loads(Path(r['oldPrefix']).read_text());oldrows=list(map(json.loads,Path(r['oldPrefix']+'.jsonl').read_text().splitlines()));rows=list(map(json.loads,Path(path+'.jsonl').read_text().splitlines()));assert sha(r['oldPrefix'])==r['oldPrefixSHA'] and sha(r['oldPrefix']+'.jsonl')==r['oldPrefixRowsSHA'] and sha(path+'.jsonl')==r['rowsSHA'] and len(rows)==len(oldrows)==r['bins']
    D=json.loads(Path(r['differences']).read_text());assert sha(r['differences'])==r['differencesSHA'] and sha(r['differences']+'.jsonl')==D['rowsSHA']==r['differencesRowsSHA'] and D['firstFailure'] is None
    A=json.loads(Path(old['input']).read_text());B=json.loads(Path(r['input']).read_text());assert sha(r['input'])==r['inputSHA']==D['inputBSHA'] and sha(old['input'])==old['inputSHA']==D['inputASHA'];assert A['specification']==B['specification'] and A['knots'][0]==B['knots'][0]
    for key,item in r['oldAudits'].items():
        j=json.loads(Path(item['path']).read_text());assert sha(item['path'])==item['sha'] and j['knownFirst']['passed'] and j['target']['subjectSHA']==r['oldPrefixSHA'] and j['target']['rowsSHA']==r['oldPrefixRowsSHA'] and (j['target'].get('passed') or j['target'].get('acceptedRecurrence'))
    d=list(map(F,D['maximumXVA']));diffrows=list(map(json.loads,Path(r['differences']+'.jsonl').read_text().splitlines()));clock=F(0)
    for cell in diffrows:
        assert F(cell['left'])==clock<F(cell['right']);clock=F(cell['right'])
        for n,boxes in enumerate(cell['componentBoxes']):
            bound=root(sum(max(abs(F(lo)),abs(F(hi)))**2 for lo,hi in boxes));assert F(cell['normUpper'][n])>=bound and F(cell['normUpper'][n])<=d[n]
    assert clock==F(old['final']['t']) and len(diffrows)==D['cells']
    ca=g.SourceCurve(A['knots'],A['specification']);cb=g.SourceCurve(B['knots'],B['specification']);left=F(0);angle=F(0);started=time.monotonic();last=started;minRadius=None;maxV=maxA=F(0)
    for j,(a,b) in enumerate(zip(oldrows,rows)):
        right=F(a['t']);assert F(b['t'])==right>left and b['oldIndex']==j;x0,v0,a0=[ca.box(left,right,n) for n in range(3)];x1,v1,a1=[cb.box(left,right,n) for n in range(3)]
        geo=list(map(F,[g.radius_lower(x0),g.radius_lower(x1),g.exact.upper_norm(x0),g.exact.upper_norm(v0),g.exact.upper_norm(a0),g.exact.upper_norm(x1),g.exact.upper_norm(v1),g.exact.upper_norm(a1),g.h_upper(x1,v1)]));assert list(map(F,b['transferGeometry']))==geo
        e=expected(a,d,geo)
        for k,v in e.items():assert F(b[k])==v,k
        angle+=e['omega']*(right-left);assert F(b['angularPrefix'])==angle;radius=geo[1]-e['r'];speed=geo[6]+e['u'];assert radius>0 and speed<1;minRadius=radius if minRadius is None else min(minRadius,radius);maxV=max(maxV,speed);maxA=max(maxA,geo[7]+e['a']);left=right
        if time.monotonic()-last>=30:last=time.monotonic();print(json.dumps(dict(event='independent-transfer-heartbeat',cells=j+1,t=float(right))),flush=True)
    assert left==F(r['final']['t'])==F(r['horizon']);assert r['final']==rows[-1]
    return dict(passed=True,cells=len(rows),end=str(left),subjectSHA=sha(path),rowsSHA=r['rowsSHA'],actualRadiusLower=str(minRadius),actualSpeedUpper=str(maxV),actualPhysicalAccelerationUpper=str(maxA),wallSeconds=time.monotonic()-started,scope='complete inherited physical certificate, raw difference coverage/norms, independently recomputed fine/old closed geometry, scalar/component/Z/H/omega triangle, physical derivative densities, complete angular primitive and subunit positive-radius prefix; future new coefficients/root domain and own residual require separate assessment')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--out',required=True);a=p.parse_args();result=dict(knownFirst=known());print(json.dumps(result),flush=True)
    if a.receipt:result['target']=analyze(a.receipt)
    with Path(a.out).open('x') as f:f.write(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result),flush=True)
