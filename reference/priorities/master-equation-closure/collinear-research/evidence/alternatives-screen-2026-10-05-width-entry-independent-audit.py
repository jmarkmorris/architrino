"""Independent exact coverage, provenance and endpoint audit, not a kernel replay.

The root coordinator authored this without importing the directed subject. The
functional inequalities themselves require the separate mathematical/source
assessment; this checks every retained receiver face and strict rational margin.
"""
import argparse, gzip, hashlib, json
from datetime import datetime, timezone
from fractions import Fraction as Q
from pathlib import Path

BASE = Path('.local-data/master-equation-closure/collinear-research/alternatives-screen-2026-10-05')
SUBJECT = Path('reference/priorities/master-equation-closure/collinear-research/evidence/alternatives-screen-2026-10-05-width-entry-directed-v4.mjs')
EXPECTED = 'cf9ee758bc79abfeda0d4e4e183a11492857e9f3bd39dd2526a1c3a57d37fe95'

def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def rat(obj):
    return Q(int(obj['numerator']), int(obj['denominator']))

def iv(values):
    a, b = map(Q, values)
    assert a <= b
    return a, b

def inside(values, exact):
    a, b = iv(values)
    assert a <= exact <= b

def cover(panels, left, right):
    face = Q(left)
    minimum = [None, None]
    for panel in panels:
        l, r = Q(panel['l']), Q(panel['r'])
        assert l == face and r > l, 'missing, overlapping or reversed receiver interval'
        for j, key in enumerate(('lower', 'upper')):
            a, b = iv(panel[key])
            assert a > 0, 'nonpositive directed margin'
            minimum[j] = a if minimum[j] is None else min(a, minimum[j])
        face = r
    assert face == Q(right), 'incomplete terminal coverage'
    return minimum

def known():
    good = [dict(l=0, r=.25, lower=[.1,.2], upper=[.2,.3]),
            dict(l=.25, r=.5, lower=[.05,.1], upper=[.3,.4])]
    assert cover(good, 0, .5) == [Q(.05), Q(.2)]
    bad = [dict(good[0]), dict(good[1], l=.3)]
    for rows, endpoint in ((bad,.5), (good,1), ([dict(good[0],lower=[0,.1])],.25)):
        try:
            cover(rows,0,endpoint)
        except AssertionError:
            pass
        else:
            raise AssertionError('negative coverage control accepted')
    assert rat({'numerator':'3','denominator':'8'}) == Q(3,8)
    inside([.125,.25],Q(1,6))
    assert Q(8)**2 == 2/Q(1,32)
    return ['exact contiguous coverage', 'gap rejection', 'unfinished interval rejection',
            'nonpositive-margin rejection', 'rational coefficient encoding', 'exact squared escape threshold']

def audit(path):
    d = json.loads(path.read_text())
    assert sha(SUBJECT) == EXPECTED == d['scriptHash']
    assert not d['failure'] and not d['unresolved']
    assert d['completedSegments'] == d['totalSegments'] > 0
    assert d['travelN'] == 64 and d['maxDepth'] == 5 and d['maxSource'] == 8
    controls = json.loads(Path(d['controls']).read_text())
    assert controls['status'] == 'known-controls-pass' and controls['scriptHash'] == EXPECTED
    assert controls['finished'] < d['finished']
    template = json.loads(Path(d['target']).read_text())
    assert template['h'] == d['h'] and template['rho'] == d['rho']
    assert template['completePast']['kind'] == 'compatible-cubic-ramp-stationary-tail'
    assert Q(template['completePast']['delta']) == Q(1,2048)
    hp = Path(template['historyPath'])
    assert sha(hp) == d['historyHash']
    rows = json.loads(gzip.decompress(hp.read_bytes()))['rows']
    pc = d['prepCoverage']; prep_path = Path(d['preparation'])
    assert sha(prep_path) == pc['coefficientReceiptHash']
    prep = json.loads(prep_path.read_text()); exact = pc['exactCase']
    assert exact in prep['cases'] and prep['status'] == 'exact-rational-endpoint-signs'
    assert rat(exact['h']) == Q(d['h']) and rat(exact['rho']) == Q(d['rho'])
    assert rat(exact['leftResidualStrictLower']) > 0 > rat(exact['rightResidualStrictUpper'])
    alo, ahi = map(rat, exact['AInterval']); assert 0 < alo < ahi < 2
    delta = Q(1,2048)
    for aa in (alo,ahi):
        inside(pc['A'],aa); inside(pc['Drelease'],aa*delta**2/6)
        inside(pc['actualCoeff'],Q(9,2)*aa/delta)
    assert Q(pc['lowerCoeff'][1]) < Q(pc['actualCoeff'][0])
    assert Q(pc['upperCoeff'][0]) > Q(pc['actualCoeff'][1])
    assert Q(pc['lowerU'][1]) < Q(pc['actualU'][0])
    assert Q(pc['upperU'][0]) > Q(pc['actualU'][1])
    clo, chi = iv(pc['collar']); assert 0 < clo < chi < Q(1,10**7)
    assert clo <= Q(pc['nominalD']) <= chi
    assert Q(pc['upperU'][1]) < Q(1,1000)
    assert Q(pc['elapsed'][1]) < Q(1,10**6)
    assert Q(pc['lowerDerivative'][1]) < Q(pc['accLower'][0])
    assert Q(pc['upperDerivative'][0]) > Q(pc['accUpper'][1])
    assert Q(pc['accLower'][0]) > Q(99,100)
    assert Q(pc['accUpper'][1]) < Q(103,100)
    # Independently check profile seam clocks and that every original segment is covered.
    aa = template['completePast']['A']; dd = template['completePast']['delta']
    nominal = aa*dd*dd/6
    assert nominal == pc['nominalD']
    boundaries = [Q(nominal)]
    for row in rows[1:]:
        boundaries.append(Q(.5-row[1]))
        if boundaries[-1] >= Q(1,2):
            break
    assert len(boundaries)-1 == d['totalSegments']
    assert all(a < b for a,b in zip(boundaries,boundaries[1:]))
    minimum = cover(d['panels'],nominal,Q(1,2))
    j = 0
    for panel in d['panels']:
        l,r = Q(panel['l']),Q(panel['r'])
        while boundaries[j+1] <= l: j += 1
        assert boundaries[j] <= l < r <= boundaries[j+1]
        assert 0 <= panel['depth'] <= 5 and panel['sourceN'] in (1,2,4,8)
    speed = Q(d['contactLower'][0]); rho = Q(d['rho'])
    assert speed > 0 and speed**2 > 2/rho
    return dict(receipt=str(path),receiptSHA=sha(path),subjectSHA=EXPECTED,
                historySHA=sha(hp),preparationSHA=sha(prep_path),h=str(Q(d['h'])),rho=str(rho),
                panels=len(d['panels']),segments=d['totalSegments'],
                exactCoverage=[str(Q(nominal)),'1/2'],minimumMargins=list(map(str,minimum)),
                contactLower=str(speed),squaredThresholdSlack=str(speed**2-2/rho),
                status='coverage-provenance-and-recorded-strict-inequalities-pass',
                scope='independent receipt audit; kernel enclosure requires separate mathematical and implementation assessment')

if __name__ == '__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--target',action='append',default=[])
    ap.add_argument('--known-receipt');ap.add_argument('--out',required=True);args=ap.parse_args()
    controls=known(); now=datetime.now(timezone.utc).isoformat()
    out=dict(sourceSHA=sha(__file__),knownControls=controls,started=now,targets=[])
    if args.target:
        assert args.known_receipt
        prior=json.loads(Path(args.known_receipt).read_text())
        assert prior['sourceSHA']==out['sourceSHA'] and prior['knownControls']==controls and not prior['targets']
        for target in args.target: out['targets'].append(audit(Path(target)))
    out['finished']=datetime.now(timezone.utc).isoformat()
    with Path(args.out).open('x') as f: json.dump(out,f,indent=2);f.write('\n')
    print(json.dumps(out,indent=2))
