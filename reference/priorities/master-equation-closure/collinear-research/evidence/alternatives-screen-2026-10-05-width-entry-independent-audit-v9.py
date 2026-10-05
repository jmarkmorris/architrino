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
SUBJECT = Path('reference/priorities/master-equation-closure/collinear-research/evidence/alternatives-screen-2026-10-05-width-entry-directed-v9.mjs')
EXPECTED = 'c5bffcf9968c4b64395af6aa3e18fceccb553d3fb968ad4250f933b09691dc55'

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

def width_check(w):
    for name,value in [('initialWidth',Q(3,1000)),('capWidth',Q(1,10)),('earlyWidthSeam',Q(1,125)),('widthSeam',Q(93,1000))]:
        inside(w[name],value)
    assert list(map(Q,w['slopes'])) == [Q(3,2),Q(1),Q(0)]
    # Each branch meets the next at its declared exact seam and is nondecreasing.
    assert Q(3,1000)+Q(3,2)*Q(1,125) == Q(7,1000)+Q(1,125)
    assert Q(7,1000)+Q(93,1000) == Q(1,10)

def endpoint_energy(template,rows):
    a=template['completePast']['A']; delta=template['completePast']['delta']
    left=Q(a*delta*delta/6); u=Q(a*delta/2); E=u*u/2; F=Q(a)
    for row in rows[1:]:
        right=Q(.5-row[1]); E1=Q(row[2]*row[2]/2); F1=Q(-row[3]); span=right-left
        assert span>0
        if right>=Q(1,2):
            z=(Q(1,2)-left)/span
            assert 0<=z<=1
            b=[E,E+span*F/3,E1-span*F1/3,E1]
            while len(b)>1: b=[(1-z)*x+z*y for x,y in zip(b,b[1:])]
            return b[0]
        left,E,F=right,E1,F1
    raise AssertionError('profile does not reach contact')

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
    width_check(dict(initialWidth=[.002,.004],capWidth=[.09,.11],earlyWidthSeam=[.007,.009],widthSeam=[.092,.094],slopes=[1.5,1,0]))
    try: width_check(dict(initialWidth=[.002,.004],capWidth=[.09,.11],earlyWidthSeam=[.007,.009],widthSeam=[.092,.094],slopes=[1,1,0]))
    except AssertionError: pass
    else: raise AssertionError('incorrect width slope accepted')
    # Exact constant kinetic profile: A=0.5, delta=2 gives d0=1/3, u0=1/2, E0=1/8.
    # Hermite endpoint at d=1/2 fixes E=1/2 from the stored unit speed.
    assert endpoint_energy(dict(completePast=dict(A=.5,delta=2)),[[0],[0,0,1,-.5]]) == Q(1,2)
    return ['exact contiguous coverage', 'gap rejection', 'unfinished interval rejection',
            'nonpositive-margin rejection', 'rational coefficient encoding', 'exact squared escape threshold', 'growing-width exact seams and slope rejection', 'independent exact Hermite contact value']

def audit(path):
    d = json.loads(path.read_text())
    assert sha(SUBJECT) == EXPECTED == d['scriptHash']
    assert not d['failure'] and not d['unresolved']
    assert d['completedSegments'] == d['totalSegments'] > 0
    assert d['travelN'] == 256 and d['maxDepth'] == 9 and d['maxSource'] == 8
    assert Q(d['h']) == Q(1,32) and Q(d['rho']) == Q(1,32)
    width_check(d['widthSpecification'])
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
        assert 0 <= panel['depth'] <= 9 and panel['sourceN'] in (1,2,4,8)
    speed = Q(d['contactLower'][0]); rho = Q(d['rho'])
    assert speed > 0 and speed**2 > 2/rho+1
    exactE = endpoint_energy(template, rows)
    assert speed**2 <= Q(9,10)**2 * 2 * exactE
    faces = {Q(z['l']) for z in d['panels']} | {Q(d['panels'][-1]['r'])}
    for key in ('earlyWidthSeam','widthSeam'):
        assert all(Q(z) in faces for z in d['widthSpecification'][key]), 'missing exact seam bracket face'
    return dict(receipt=str(path),receiptSHA=sha(path),subjectSHA=EXPECTED,
                historySHA=sha(hp),preparationSHA=sha(prep_path),h=str(Q(d['h'])),rho=str(rho),
                panels=len(d['panels']),segments=d['totalSegments'],
                exactCoverage=[str(Q(nominal)),'1/2'],minimumMargins=list(map(str,minimum)),
                contactLower=str(speed),exactContactProfileEnergy=str(exactE),squaredThresholdSlack=str(speed**2-2/rho),permanentSuperfieldSlack=str(speed**2-2/rho-1),
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
