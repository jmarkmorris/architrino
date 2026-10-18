"""Input/selection adapter for the unchanged frozen publication rules.

Selects uninterrupted and restored ordinary O2 trajectories. Mathematical
rules and known controls stay unchanged; old alias targets are not emitted.
"""
from pathlib import Path
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
code = code.replace(alias, "print({'frozen_three_path_states':state_count,'aliasing_targets':'not emitted by O2 fixture'},flush=True)\nassert not violations\n")
predicate = "r['case']=='K2-three-path'"
assert code.count(predicate) == 1
selections = {
    'uninterrupted': "r['case']=='P-uninterrupted'",
    'accepted-prefix then replay-resume': "r['case'] in ('P-cancelled-after-two','P-from-two')",
    'finer accepted-prefix then replay-resume': "r['case'] in ('P-fine-cut','P-fine-resumed')",
}
for label, selection in selections.items():
    print('Input selection:', label, flush=True)
    selected = code.replace(predicate, selection)
    exec(compile(selected, str(source), 'exec'), {'__file__':str(source.resolve()), 'sys':sys})
