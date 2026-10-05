"""Restrict strict witness audit to completed rows of a failed requested horizon.

The frozen strict witness reference is imported unchanged. Failed candidate
coefficients are never admitted as accepted rows; this audit alone establishes
neither the response nor the trajectory induction.
"""
import argparse, hashlib, importlib.util, json
from fractions import Fraction as Q
from pathlib import Path
p = Path(__file__).with_name('maxwell-shaped-overnight-independent-strict-trial-check.py')
s = importlib.util.spec_from_file_location('frozen_strict', p)
b = importlib.util.module_from_spec(s); s.loader.exec_module(b)
def audit(rows):
    mins = {k: None for k in ['X', 'V']}
    for row in rows:
        for tag, key in [('X', 'x'), ('V', 'v')]:
            b.strict(row['trial'+tag], row[key], row['improvement'+tag])
            z = Q(row['trial'+tag])-Q(row[key])
            mins[tag] = z if mins[tag] is None else min(mins[tag], z)
    return {k: str(v) for k, v in mins.items()}
def known():
    prior = b.known()
    rows = [dict(trialX='1', trialV='2', x='1/2', v='1', improvementX='1/2', improvementV='1')]
    assert audit(rows) == dict(X='1/2', V='1')
    try: audit([dict(rows[0], x='1', improvementX='0')])
    except AssertionError: pass
    else: raise AssertionError('failed candidate accepted')
    return dict(passed=True, prior=prior, cases=['completed strict row', 'failed candidate rejected'])
def analyze(path):
    d = json.loads(Path(path).read_text())
    rows = [json.loads(z) for z in Path(path+'.jsonl').read_text().splitlines() if z]
    assert d['firstFailure'] is not None and len(rows) == d['bins']
    margins = audit(rows)
    return dict(accepted=True, bins=len(rows), receiptSHA=hashlib.sha256(Path(path).read_bytes()).hexdigest(), rowsSHA=hashlib.sha256(Path(path+'.jsonl').read_bytes()).hexdigest(), minimumStrictMargins=margins, inheritedFailure=d['firstFailure'], scope='completed strict error-cylinder witnesses only; actual prefix and recurrence require separate admission')
if __name__ == '__main__':
    ap=argparse.ArgumentParser(); ap.add_argument('--receipt'); ap.add_argument('--output', required=True); a=ap.parse_args()
    out=dict(known=known()); print(json.dumps(out), flush=True)
    if a.receipt: out['target']=analyze(a.receipt)
    Path(a.output).write_text(json.dumps(out, indent=2)+'\n'); print(json.dumps(out), flush=True)
