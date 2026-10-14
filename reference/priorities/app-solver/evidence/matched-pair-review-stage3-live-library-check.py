"""Retarget the frozen exact reviewer without changing its arithmetic."""
import pathlib
import json
from fractions import Fraction as Q

root = pathlib.Path.cwd()
source = root / 'reference/priorities/app-solver/evidence/matched-pair-review-stage3-cpp-v2-check.py'
code = source.read_text()
old_out = '.local-data/eom-matched-pair/2026-10-11/reviewer-targets'
old_target = 'reference/priorities/app-solver/evidence/matched-pair-stage-3-cpp-candidate-v2'
assert code.count(old_out) == code.count(old_target) == 1
code = code.replace(old_out, '.local-data/eom-matched-pair/2026-10-12/reviewer-targets')
code = code.replace(old_target, '.local-data/eom-matched-pair/2026-10-12/live-gate/live-outputs')
exec(compile(code, str(source), 'exec'), {'__file__': str(source)})

def end_tube(p, h):
    c = list(map(Q, p['coefficients'][2]))
    x = sum(c[k] * h**k for k in range(4))
    v = c[1] + 2*c[2]*h + 3*c[3]*h*h
    rx, rv = Q(p['position_error'][2]), Q(p['velocity_error'][2])
    return (x-rx, x+rx), (v-rv, v+rv)

known = {'coefficients': [[], [], ['1', '2', '3', '4']],
         'position_error': ['0', '0', '1/8'],
         'velocity_error': ['0', '0', '1/4']}
assert end_tube(known, Q(1, 2)) == ((Q(25, 8), Q(27, 8)), (Q(31, 4), Q(33, 4)))
print('Known cubic endpoint and radii reconstruction passed BEFORE three-path targets.', flush=True)
ref = json.loads((source.parent / 'matched-pair-review-stage3-three-path-brackets.json').read_text())
rows = [json.loads(s) for s in (root / '.local-data/eom-matched-pair/2026-10-12/live-gate/live-outputs/three-path-four-steps.jsonl').read_text().splitlines()]
count = 0
for case in ref['cases']:
    t = Q(case['time'])
    r = next(r for r in rows if r['case'] == 'K2-three-path' and Q(r['end']) == t)
    assert r['status'] == 'certified'
    for name, truth in case['paths'].items():
        p = next(p for p in r['paths'] if p['id'] == name)
        x, v = end_tube(p, Q(r['h']))
        bx, bv = map(Q, truth['position_z']), map(Q, truth['velocity_z'])
        bx, bv = tuple(bx), tuple(bv)
        assert x[0] <= bx[0] <= bx[1] <= x[1]
        assert v[0] <= bv[0] <= bv[1] <= v[1]
        count += 1
print({'independent_three_path_state_checks': count, 'all_contained': True}, flush=True)
