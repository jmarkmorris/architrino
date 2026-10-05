"""Independent exact original-knot preservation and matching cubic-jet audit."""
import argparse,json,hashlib
from pathlib import Path
from fractions import Fraction as F

def sha(p):return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def cubic(p,t,j):
    t=F(t);s=t-F(p['t'])
    return dict(t=t,x=[F(x)+F(v)*s+F(a)*s*s/2+F(z)*s*s*s/6 for x,v,a,z in zip(p['x'],p['v'],p['a'],j)],v=[F(v)+F(a)*s+F(z)*s*s/2 for v,a,z in zip(p['v'],p['a'],j)],a=[F(a)+F(z)*s for a,z in zip(p['a'],j)])
def known():
    p=dict(t=0,x=[2,3],v=['1/10','1/5'],a=['2/5','-3/10']);z=cubic(p,1,['3/5','6/5']);assert z==dict(t=F(1),x=[F('12/5'),F('13/4')],v=[F('4/5'),F('1/2')],a=[F(1),F('9/10')]);assert cubic(p,0,['3/5','6/5'])['x']==list(map(F,p['x']))
    return dict(passed=True,cases=['independently exact rational cubic endpoint jets','matching C2 origin'])
def analyze(path):
    r=json.loads(Path(path).read_text());old=json.loads(Path(r['input']).read_text());new=json.loads(Path(r['output']).read_text());assert sha(r['input'])==r['inputSHA'] and sha(r['output'])==r['outputSHA'];assert r['inputSHA']=='52d394ddf627c6823a72a702e0b307752807f591ede7f87685aae99ca339c367'
    n=len(old['knots']);assert n==r['preservedOriginalKnots'] and len(new['knots'])==r['knots'];assert old['specification']==new['specification'] and old['knots']==new['knots'][:n]
    p=old['knots'][-1];assert F(p['t'])==F(r['T0'])>F('59.5');previous=F(p['t']);J=list(map(F,r['J']))
    for x in new['knots'][n:]:
        t=F(x['t']);assert previous<t<=F(r['end']);assert t-previous==F(r['step']) or t==F(r['end']);expected=cubic(p,t,J)
        for key in ['x','v','a']:assert list(map(F,x[key]))==expected[key]
        previous=t
    assert previous==F(r['end'])>F(r['Tf'])==F('59.57');assert F(r['jetSource']['hi'])<F('59.5')
    for x,box in zip(J,r['jetBox']):assert F(box['lo'])<=x<=F(box['hi']) and x==(F(box['lo'])+F(box['hi']))/2
    return dict(passed=True,preservedOriginalKnots=n,extensionKnots=len(new['knots'])-n,end=str(previous),inputSHA=r['inputSHA'],outputSHA=r['outputSHA'],scope='exact numerical past/original-knot identity and chosen matching C2 cubic jets; selected J is arbitrary test coefficient, not actual J or solution evidence')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--receipt');p.add_argument('--output',required=True);a=p.parse_args();r=dict(knownFirst=known());print(json.dumps(r),flush=True)
    if a.receipt:r['target']=analyze(a.receipt)
    with Path(a.output).open('x') as f:f.write(json.dumps(r,indent=2)+'\n')
    print(json.dumps(r),flush=True)
