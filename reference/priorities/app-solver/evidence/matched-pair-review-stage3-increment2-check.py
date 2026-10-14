"""Independent rational controls for increment 2; no author truth imported."""
from fractions import Fraction as Q
from pathlib import Path
import json

def endpoint(c,h,rx,rv):
    x=sum(Q(a)*h**i for i,a in enumerate(c))
    v=sum(i*Q(c[i])*h**(i-1) for i in range(1,len(c)))
    return (x-rx,x+rx),(v-rv,v+rv)

def static(x):
    return Q('0.001')*(-1/(10-x)**2+1/(11-x)**2)

assert endpoint(['1','2','3','4'],Q(1),Q('0.1'),Q('0.2')) == ((Q('9.9'),Q('10.1')),(Q('19.8'),Q('20.2')))
assert static(Q(0)) == -Q(21,12100000)
assert static(Q(1,8)) < static(Q(-1,8))
# These checks and their receipt precede parsing the target output.
print('Known exact cubic endpoint and monotone static-pair truth passed BEFORE targets.',flush=True)

root=Path.cwd()
lines=(root/'.local-data/eom-matched-pair/2026-10-12/reviewer-targets/increment2-probe-v2.stdout').read_text().splitlines()
values={}
for line in lines:
    if ' B=' in line:
        label,rest=line.split(' B=')
        b,separation=rest.split(' separation=')
        values[label]=(Q(b),Q(separation))
assert -values['known_static_full_box'][0] <= static(Q(1,8)) <= static(Q(-1,8)) <= values['known_static_full_box'][0]
# Follower X(S)=13+S/10, root S=(t-(13-x))/(11/10), so
# its signed kernel is +(11/10)/(13+t/10-x)^2. Independent term-wise
# extrema enclose all t in [0,1/8], x in [-1/8,1/8].
lo=Q('0.001')*(-1/Q('9.875')**2+Q('1.1')/Q('13.1375')**2)
hi=Q('0.001')*(-1/Q('10.125')**2+Q('1.1')/Q('12.875')**2)
assert -values['moving_affine_full_box'][0]<=lo<=hi<=values['moving_affine_full_box'][0]
assert values['interior_cubic'][1]>=Q(3,64)
print('Exact static and affine full-axis-box truths enclosed; interior separation >=3/64.',flush=True)

rows=[json.loads(s) for s in (root/'.local-data/eom-matched-pair/2026-10-12/increment-2/scratch-outputs/grouping.jsonl').read_text().splitlines()]
cert=[r for r in rows if r.get('status')=='certified' and not r.get('summary') and 'ledger' in r]
reference=json.loads((root/'reference/priorities/app-solver/evidence/matched-pair-review-stage3-three-path-brackets.json').read_text())
count=0
for name in ('G-three-path-grouped','G-three-path-grouped-fine'):
    for case in reference['cases']:
        r=next(r for r in cert if r['case']==name and Q(r['end'])==Q(case['time']))
        for path,truth in case['paths'].items():
            p=next(p for p in r['paths'] if p['id']==path)
            x,v=endpoint(p['coefficients'][2],Q(r['h']),Q(p['position_error'][2]),Q(p['velocity_error'][2]))
            for outer,k in ((x,'position_z'),(v,'velocity_z')):
                a,b=map(Q,truth[k]);assert outer[0]<=a<=b<=outer[1]
            count+=1

intervals=0
for r in cert:
    a=r['accounting'];n=a['paths']
    assert a['self_excluded']==n and a['off_diagonal']==n*(n-1)
    assert a['individual_present']+a['individual_absent']+a['grouped_members']==n*(n-1)
    assert a['grouped_members']==2*a['group_intervals']
    for g in r['groups']:
        if g['disposition']!='grouped':continue
        intervals+=1
        nu,v,d,ell,w,acc,j,c,b=map(Q,(g[k] for k in ('factor_floor','speed_upper','distance_floor','separation_upper','relative_speed_upper','acceleration_upper','join_jump_upper','prefactor_upper','radius_upper')))
        assert d>0 and 0<nu<=1-v
        theoretical=c*((2*nu+v)*ell/(d**3*nu**3)+(w+acc*ell/nu+j)/(d**2*nu**2))
        assert theoretical<=b and Q(g['interval_width'])>=2*b
        assert sum(p['receiver']==g['receiver'] and p['source'] in (g['leader'],g['follower']) and p['state']=='grouped' for p in r['pairs'])==2
print({'independent_grouped_true_states':count,'checked_group_intervals':intervals,'all_accounting_and_radius_checks_passed':True},flush=True)
for suffix in ('','-fine'):
    pair=[]
    for kind in ('ungrouped','grouped'):
        r=next(r for r in cert if r['case']=='G-three-path-'+kind+suffix and Q(r['end'])==Q(1,32))
        p=next(p for p in r['paths'] if p['id']=='receiver')
        pair.append(Q(p['position_error'][2]))
    print({'width_case':suffix or 'coarse','ungrouped_radius':str(pair[0]),'grouped_radius':str(pair[1]),'ratio':float(pair[1]/pair[0])},flush=True)
