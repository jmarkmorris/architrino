"""Independent exact per-leg count and worker allowance checks; c_f=1.

The proof counts one possible clipped final step per invocation and uses
each driver-enforced accepted-step limit. This is not an RSS measurement.
"""
import json
import sys
from fractions import Fraction as F
from pathlib import Path

def cover(origin, minimum, legs):
    return sum(min(int(limit), (F(end)-F(origin)) // F(minimum) + 1)
               for end, limit in legs)

known = [(str(F(j,100)),100) for j in range(1,11)]
assert cover('0','0.1',known)==11
assert F('0.1')//F('0.1')+1==2
assert cover('0','0.1',[('0.2',1),('0.3',2)])==3
assert 2*3*8*1024*1024==50331648
print('KNOWN ten clipped endpoints: per-leg cover 11, whole-span 2; enforced limits 3; worker allowance 50331648 PASS',flush=True)
rows=[json.loads(s) for s in Path(sys.argv[1]).read_text().splitlines() if s.strip()]
resumes={r['case']:r for r in rows if r.get('persist')=='resume'}
short=resumes['P-short-resumed']
total=cover(short['origin_time'],short['minimum_step'],short['legs'])
whole=(F(short['legs'][-1][0])-F(short['origin_time']))//F(short['minimum_step'])+1
assert total==short['replay_step_bound'] and total>=short['replayed_steps']
assert short['replayed_steps']>whole
delta=abs(resumes['P-from-two-workers']['replay_bound_bytes']-resumes['P-from-two']['replay_bound_bytes'])
assert delta==50331648
print({'per_leg_cover':total,'actual_replayed_steps':short['replayed_steps'],
       'whole_span_cover':whole,'worker_allowance_difference':delta},flush=True)
