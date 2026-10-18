"""Input/selection adapter for the frozen exact publication checker.

The numerical rules and known controls are read unchanged. The O1 fixture
has no aliasing rows; those old targets are omitted explicitly. Frozen
three-path states are selected from the ordinary entry, including grouped
and finer-step runs, instead of the fixture's direct-driver control.
"""
from pathlib import Path
import json
import sys

source = Path('reference/priorities/app-solver/evidence/matched-pair-review-stage3-increment1-check.py')
code = source.read_text()
before = """root = Path.cwd()
directory = root/'reference/priorities/app-solver/evidence/matched-pair-stage-3-increment-1'
rows = []
for name in ('known','controller','refusals','cancellation','aliasing'):
    rows += [json.loads(s) for s in (directory/f'scratch-{name}.jsonl').read_text().splitlines()]
"""
after = """root = Path.cwd()
directory = root/'reference/priorities/app-solver/evidence/matched-pair-stage-3-increment-1'
rows = [json.loads(s) for s in Path(sys.argv[1]).read_text().splitlines() if s.strip()]
"""
assert code.count(before) == 1
code = code.replace(before, after)
alias = """for case in ('A-control-fine','A-control-from-aliased-step'):
    r = next(r for r in accepted if r['case']==case)
    p = next(p for p in r['paths'] if p['id']=='receiver')
    x,v = tube(p,Q(r['h']))
    assert x[0]<=Q('-0.000017689')<Q('-0.000017645')<=x[1]
    assert v[0]<=Q('-0.000019634725')<Q('-0.000019582719')<=v[1]
print({'frozen_three_path_states':state_count,'both_aliasing_brackets_contained':True},flush=True)
"""
assert code.count(alias) == 1
code = code.replace(alias, "print({'frozen_three_path_states':state_count,'aliasing_targets':'not emitted by O1 fixture'},flush=True)\nassert not violations\n")
predicate = "r['case']=='K2-three-path'"
assert code.count(predicate) == 1
for label in ('O-K2-three-path','O-three-path-grouped','O-three-path-grouped-fine'):
    selected = code.replace(predicate, "r['case']==" + repr(label))
    print('Input selection:', label, flush=True)
    exec(compile(selected, str(source), 'exec'), {'__file__':str(source.resolve()), 'sys':sys})
