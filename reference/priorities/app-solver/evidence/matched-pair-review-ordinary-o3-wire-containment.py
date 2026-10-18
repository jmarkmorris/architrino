"""Exact wire tube inclusion against the frozen independent three-path truth.

This checks serialization/coverage and selected true-state inclusion. It does
not reconstruct a whole-step producer proof from the abbreviated wire log.
Usage: shared-venv python this.py wire-output-directory
"""
from fractions import Fraction as Q
from pathlib import Path
import json
import sys

def tube(segment, time):
    h = time - Q(segment['start'])
    c = [Q(v) for v in segment['coefficients'][2]]
    x = sum(c[i] * h**i for i in range(4))
    v = sum(i * c[i] * h**(i-1) for i in range(1,4))
    rx = Q(segment['positionErrors'][2])
    rv = Q(segment['velocityErrors'][2])
    return (x-rx,x+rx), (v-rv,v+rv)

known = {'start':'0','coefficients':[[],[],['1','2','3','4']],
         'positionErrors':['0','0','1/8'],'velocityErrors':['0','0','1/4']}
assert tube(known,Q(1,2)) == ((Q(25,8),Q(27,8)),(Q(31,4),Q(33,4)))
def inclusion(inner, outer):
    return outer[0] <= inner[0] <= inner[1] <= outer[1]
assert inclusion((Q(0),Q(1)),(Q(-1),Q(2)))
assert not inclusion((Q(-2),Q(1)),(Q(-1),Q(2)))
print('KNOWN exact cubic/derivative/radii and positive/negative inclusion controls PASS before wire targets.',flush=True)

directory=Path(sys.argv[1])
reference=json.loads(Path('reference/priorities/app-solver/evidence/matched-pair-review-stage3-three-path-brackets.json').read_text())
assert reference['field_speed']=='1' and reference['coupling']=='0.001'
routes={
    'uninterrupted':['v3-evolve-whole.stdout'],
    'limit-prefix and resumed':['v3-evolve-limit-two.stdout','v3-resume-from-two-limit-six.stdout'],
    'limit-prefix and worker-resumed':['v3-evolve-limit-two.stdout','v3-resume-from-two-workers.stdout'],
}
for label,names in routes.items():
    docs=[json.loads((directory/n).read_text()) for n in names]
    segments={}
    for doc in docs:
        assert doc['schema']=='eom_evolution_response/v3'
        assert doc['evidence']['integrationMethod']=='canonical_validated_far_step_evolution/v1'
        assert doc['evidence']['scientificAcceptance'] is False
        for p in doc['publishedExtensions']:
            segments.setdefault(p['pathId'],[]).extend(p['segments'])
    count=0
    for case in reference['cases']:
        time=Q(case['time'])
        for path_id,truth in case['paths'].items():
            candidates=[s for s in segments[path_id] if Q(s['start']) <= time <= Q(s['end'])]
            assert candidates, (label,path_id,str(time),'missing wire coverage')
            # At an exact shared boundary check every supplied adjacent tube.
            for segment in candidates:
                position,velocity=tube(segment,time)
                assert inclusion(tuple(map(Q,truth['position_z'])),position), (label,path_id,str(time),'position')
                assert inclusion(tuple(map(Q,truth['velocity_z'])),velocity), (label,path_id,str(time),'velocity')
            count+=1
    print({'route':label,'selected_frozen_states':count,'all_adjacent_wire_tubes_contain_truth':True},flush=True)
