"""Independent exact publication, true-state and declared-radius ledger review."""
import json
import hashlib
from pathlib import Path
from fractions import Fraction as Q

def minimum(c, h):
    values = [c[0], c[0]+c[1]*h+c[2]*h*h]
    if c[2] > 0:
        t = -c[1]/(2*c[2])
        if 0 < t < h:
            values.append(c[0]+c[1]*t+c[2]*t*t)
    return min(values)

def tube(p, h):
    c = list(map(Q, p['coefficients'][2]))
    x = sum(c[k]*h**k for k in range(4))
    v = c[1]+2*c[2]*h+3*c[3]*h*h
    rx, rv = Q(p['position_error'][2]), Q(p['velocity_error'][2])
    return (x-rx, x+rx), (v-rv, v+rv)

def growth_covers(a, d, b):
    return Q(a)+Q(d) >= Q(b)

assert minimum([Q(1), Q(-2), Q(1)], Q(2)) == 0
assert minimum([Q(1,8), Q(-1), Q(1)], Q(1)) == -Q(1,8)
assert growth_covers(Q(1,8), Q(1,4), Q(3,8))
assert not growth_covers(Q(1,8), Q(1,8), Q(3,8))
assert hashlib.sha256(b'abc').hexdigest() == 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
known = {'coefficients':[[],[],['1','2','3','4']], 'position_error':['0','0','1/8'], 'velocity_error':['0','0','1/4']}
assert tube(known, Q(1,2)) == ((Q(25,8), Q(27,8)), (Q(31,4), Q(33,4)))
print('Known exact quadratic minima, ledger positive/negative cases, SHA abc and cubic tube reconstruction passed BEFORE targets.', flush=True)

root = Path.cwd()
directory = root/'reference/priorities/app-solver/evidence/matched-pair-stage-3-increment-1'
rows = []
for name in ('known','controller','refusals','cancellation','aliasing'):
    rows += [json.loads(s) for s in (directory/f'scratch-{name}.jsonl').read_text().splitlines()]
accepted = [r for r in rows if r.get('status') == 'certified' and not r.get('summary')]
axis_count = 0
violations = []
for r in accepted:
    assert Q(r['end'])-Q(r['start']) == Q(r['h'])
    h = Q(r['duration_cover'])
    assert h >= Q(r['h'])
    for p in r['paths']:
        m = next(m for m in r['evidence']['members'] if m['id'] == p['id'])
        text = m['digest_before']+'|'+r['start']+'|'+r['end']
        text += ''.join('|'+v for axis in p['coefficients'] for v in axis)
        text += ''.join('|x'+v for v in p['position_error'])+''.join('|v'+v for v in p['velocity_error'])
        assert hashlib.sha256(text.encode()).hexdigest() == m['digest_after']
        ledger = next(l for l in r['ledger'] if l['path'] == p['id'])
        for axis in range(3):
            c = list(map(Q, p['coefficients'][axis]))
            assert c[3] == 0
            x, v, a = ([Q(t) for t in p[k][axis]] for k in ('inherited_position','inherited_velocity','acceleration'))
            rx, rv = Q(p['position_error'][axis]), Q(p['velocity_error'][axis])
            for side in (0,1):
                s = 1 if side == 0 else -1
                assert minimum([rx+s*(x[side]-c[0]), s*(v[side]-c[1]), s*(a[side]/2-c[2])], h) >= 0
                assert minimum([rv+s*(v[side]-c[1]), s*(a[side]-2*c[2]), Q(0)], h) >= 0
            for kind, radius in [('position',rx),('velocity',rv)]:
                part = ledger[kind]
                assert Q(part['total'][axis]) == radius
                if not growth_covers(part['inherited'][axis], part['increment'][axis], part['total'][axis]):
                    violations.append({'case':r['case'], 'step':r['step'], 'path':p['id'], 'axis':axis, 'kind':kind, 'inherited':part['inherited'][axis], 'increment':part['increment'][axis], 'total':part['total'][axis]})
            axis_count += 1
print({'certified_attempts':len(accepted),'publication_axes':axis_count,'exact_slack_extent_and_chains_passed':True},flush=True)
ref = json.loads((directory.parent/'matched-pair-review-stage3-three-path-brackets.json').read_text())
state_count = 0
for case in ref['cases']:
    r = next(r for r in accepted if r['case']=='K2-three-path' and Q(r['end'])==Q(case['time']))
    for name, bracket in case['paths'].items():
        p = next(p for p in r['paths'] if p['id']==name)
        x,v = tube(p,Q(r['h']))
        for outer,k in [(x,'position_z'),(v,'velocity_z')]:
            lo,hi = map(Q,bracket[k])
            assert outer[0]<=lo<=hi<=outer[1]
        state_count += 1
for case in ('A-control-fine','A-control-from-aliased-step'):
    r = next(r for r in accepted if r['case']==case)
    p = next(p for p in r['paths'] if p['id']=='receiver')
    x,v = tube(p,Q(r['h']))
    assert x[0]<=Q('-0.000017689')<Q('-0.000017645')<=x[1]
    assert v[0]<=Q('-0.000019634725')<Q('-0.000019582719')<=v[1]
print({'frozen_three_path_states':state_count,'both_aliasing_brackets_contained':True},flush=True)
print({'declared_radius_growth_ledger_violations':len(violations),'first':violations[:3]},flush=True)
