"""Audit an immutable rational leaf partition and independently enclose each leaf.

Only the previously accepted independent scalar/explicit-gradient reference is
imported. Subject code and subject enclosures are never evaluated or imported.
"""
import argparse
from collections import Counter
from fractions import Fraction as F
import hashlib
import importlib.util
import itertools
import json
import os
from pathlib import Path
import resource
import signal
import sys
import time

SOURCE = Path(__file__).resolve()
ROOT = SOURCE.parents[5]
REFERENCE = SOURCE.with_name('overnight2-b-independent-centered-crossing.py')
REF_SHA = 'f15fe190bb85be4b8a7f1b8140c1748db04f540e5f5fa510a6705f180b56156a'
INPUT = ROOT / '.local-data/master-equation-closure/overnight2-b/centered-domain-cover/target.json'
INPUT_SHA = '5b9df247c7c6c1f3ce94c8da96a13657f21ad7bee51057f9539713520e645180'
OUT = ROOT / '.local-data/master-equation-closure/overnight2-b/independent-domain-cover'
DOMAIN = ((F(1, 10), F(5, 6)), (F(1, 20), F(4, 5)), (F(1, 10), F(1)))
START = time.monotonic()
MAX_SECONDS = 900
MAX_BYTES = 64 * 1024**2
MAX_RSS = 512 * 1024**2

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

if sha(REFERENCE) != REF_SHA:
    raise RuntimeError('frozen independent reference identity mismatch')
spec = importlib.util.spec_from_file_location('independent_reference', REFERENCE)
ref = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ref)
# Only the operational deadline changes; mathematical reference is immutable.
ref.MAX_SECONDS = MAX_SECONDS
signal.alarm(MAX_SECONDS)

def volume(box):
    result = F(1)
    for a, b in box:
        result *= b - a
    return result

def partition(boxes, domain):
    """Verify an exact binary tiling, including interiors and closed boundaries."""
    widths = tuple(b-a for a, b in domain)
    canonical = []
    for raw in boxes:
        if len(raw) != 3 or any(len(pair) != 2 for pair in raw):
            raise ValueError('not a three-dimensional box')
        box = tuple(tuple(map(F, pair)) for pair in raw)
        if any(not d[0] <= p[0] < p[1] <= d[1] for p, d in zip(box, domain)):
            raise ValueError('nonpositive or outside-domain box')
        canonical.append(box)
    if len(set(canonical)) != len(canonical):
        raise ValueError('duplicate box')
    visits = 0
    max_depth = 0
    def descend(node, indices, depth):
        nonlocal visits, max_depth
        visits += 1
        max_depth = max(max_depth, depth)
        if not indices:
            raise ValueError('uncovered binary cell')
        exact = [i for i in indices if canonical[i] == node]
        if exact:
            if len(indices) != 1:
                raise ValueError('overlapping node and descendant')
            return
        if depth >= 30:
            raise ValueError('no admitted finite partition node')
        axis = max(range(3), key=lambda i: (node[i][1]-node[i][0])/widths[i])
        mid = sum(node[axis])/2
        left, right = [], []
        for i in indices:
            a, b = canonical[i][axis]
            if b <= mid:
                left.append(i)
            elif a >= mid:
                right.append(i)
            else:
                raise ValueError('box straddles required partition plane')
        child_left, child_right = list(node), list(node)
        child_left[axis] = (node[axis][0], mid)
        child_right[axis] = (mid, node[axis][1])
        descend(tuple(child_left), left, depth+1)
        descend(tuple(child_right), right, depth+1)
    descend(tuple(domain), list(range(len(canonical))), 0)
    total = sum(map(volume, canonical), F(0))
    if total != volume(domain):
        raise AssertionError('partition volume cross-check disagrees')
    return {'passed': True, 'leaves': len(canonical), 'nodes': visits,
            'maximumDepth': max_depth, 'exactVolume': str(total),
            'method': 'exact recursive binary tiling, unique leaves, no straddlers, both children required'}

def endpoint(raw):
    box = ref.parse_box(raw)
    hlow = ref.rational(box[0][0])
    blow = ref.rational(box[1][0])
    ehigh = ref.rational(box[2][1])
    upper = 2 * ehigh * ref.iv.sqrt(ref.rational(F(19,20))**2-blow**2) / hlow
    pi = ref.iv.pi
    success = ref.bounds(upper)[1] < ref.bounds(pi)[0]
    return success, {'twiceRateAtMaximumCorner': ref.encode(upper), 'pi': ref.encode(pi)}

def numerical(raw):
    box = ref.parse_box(raw)
    direct, _, roots = ref.evaluate(box, False)
    for channel, name in enumerate(('torque', 'axial')):
        a, b = ref.bounds(direct[channel])
        if a > 0 or b < 0:
            return {'box': raw, 'kind': 'direct-'+name,
                    'torque': ref.encode(direct[0]), 'axial': ref.encode(direct[1]),
                    'wholeBoxRoots': roots}
    result = ref.centered_leaf(raw)
    result['kind'] = 'centered-'+result['kind'] if result['kind'] != 'unresolved' else 'unresolved'
    return result

def prior(stage):
    path = OUT / (stage+'.json')
    data = json.loads(path.read_text())
    if not data['completed'] or not data['passed'] or data['sourceSha256'] != sha(SOURCE) or data['referenceSha256'] != REF_SHA:
        raise RuntimeError('successful identical-source prior stage required')
    return {'path': str(path.relative_to(ROOT)), 'sha256': sha(path)}

def known():
    unit = ((F(0), F(1)),)*3
    eight = [tuple((F(bit,2), F(bit+1,2)) for bit in bits) for bits in itertools.product((0,1), repeat=3)]
    good = partition(eight, unit)
    if good['leaves'] != 8 or good['nodes'] != 15 or good['exactVolume'] != '1':
        raise AssertionError('eight-cube exact tiling control failed')
    failures = {}
    enlarged = list(eight[0]); enlarged[0] = (F(0), F(3,4))
    same_volume_bad = list(eight)
    same_volume_bad[1] = tuple(enlarged)
    same_volume_bad[0] = ((F(0),F(1,4)),*eight[0][1:])
    cases = {'missing': eight[:-1], 'duplicate': eight+[eight[0]],
             'overlap': eight+[tuple(enlarged)], 'same-volume-gap-and-overlap': same_volume_bad}
    for name, boxes in cases.items():
        try:
            partition(boxes, unit)
        except ValueError as error:
            failures[name] = str(error)
        else:
            raise AssertionError('bad partition accepted: '+name)
    if sum(map(volume,same_volume_bad),F(0)) != 1:
        raise AssertionError('same-volume adversarial control not volume one')
    numerical_known = ref.known()
    yes, record = endpoint([['1/2','1/2'],['1/20','1/20'],['1/10','1/10']])
    no, record_no = endpoint([['1/10','1/10'],['1/20','1/20'],['1','1']])
    if not yes or no:
        raise AssertionError('known endpoint comparison wrong')
    return {'passed': True, 'partitionControl': good, 'rejectedControls': failures,
            'numericalKnown': numerical_known, 'endpointKnownTrue': record,
            'endpointKnownFalse': record_no}

def run():
    parser = argparse.ArgumentParser()
    parser.add_argument('--stage', required=True, choices=('known','pilot','target'))
    stage = parser.parse_args().stage
    for key in ('OMP_NUM_THREADS','OPENBLAS_NUM_THREADS','MKL_NUM_THREADS'):
        if os.environ.get(key) != '1':
            raise RuntimeError('one thread required')
    OUT.mkdir(parents=True, exist_ok=True)
    destination = OUT / (stage+'.json')
    if destination.exists():
        raise FileExistsError('retained receipt will not be overwritten')
    data = {'stage': stage, 'sourceSha256': sha(SOURCE), 'referenceSha256': REF_SHA,
            'inputSha256': INPUT_SHA, 'K': 1, 'c_f': 1,
            'mpmathVersion': ref.mpmath.__version__, 'intervalDecimalDigits': ref.iv.dps,
            'completed': False, 'passed': False, 'startedUnixSeconds': time.time(),
            'limits': {'internalSeconds':900,'supervisorSeconds':960,'residentBytes':MAX_RSS,'receiptBytes':MAX_BYTES,'threads':1}}
    rows = data['rows'] = []
    indices = []
    failed = False
    last = time.monotonic()
    try:
        if stage == 'known':
            data.update(known())
        else:
            data['knownReceipt'] = prior('known')
            if stage == 'target':
                data['pilotReceipt'] = prior('pilot')
            if sha(INPUT) != INPUT_SHA:
                raise RuntimeError('subject target identity mismatch')
            subject = json.loads(INPUT.read_text())
            leaves = subject['excluded']
            if len(leaves) != 4019 or subject['pending'] or subject['unresolved'] or subject['failure']:
                raise ValueError('not assigned complete leaf list')
            data['partition'] = partition([x['box'] for x in leaves], DOMAIN)
            indices = [i*(len(leaves)-1)//15 for i in range(16)] if stage=='pilot' else list(range(len(leaves)))
            for index in indices:
                ref.budget()
                raw = leaves[index]['box']
                success, certificate = endpoint(raw)
                if success:
                    result = {'box':raw,'kind':'analytic-endpoint',**certificate}
                else:
                    result = numerical(raw)
                    result['endpointTest'] = certificate
                rows.append({'subjectLeafIndex':index,'subjectMethod':leaves[index]['kind'],**result})
                if time.monotonic()-last >= 5:
                    print(json.dumps({'progress':'independent domain audit','completedLeaves':len(rows),
                                      'assignedLeaves':len(indices),'unresolved':sum(x['kind']=='unresolved' for x in rows),
                                      'rootCalls':ref.ROOT_CALLS}),flush=True)
                    last = time.monotonic()
            data['allAssignedLeavesExcluded'] = all(x['kind']!='unresolved' for x in rows)
            data['dispositions'] = dict(Counter(x['kind'] for x in rows))
            data['passed'] = True
        data['completed'] = True
    except Exception as error:
        failed = True
        data['failure'] = repr(error)
    signal.alarm(0)
    data['pendingIndices'] = indices[len(rows):]
    data['wallSeconds'] = time.monotonic()-START
    rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    data['maxResidentBytes'] = rss if sys.platform=='darwin' else rss*1024
    data['rootCalls'] = ref.ROOT_CALLS
    output = json.dumps(data,indent=2)+'\n'
    if len(output.encode()) > MAX_BYTES:
        raise RuntimeError('receipt exceeds authorized 64 MiB')
    with destination.open('x') as stream:
        stream.write(output)
    print(json.dumps({'receipt':str(destination),'sha256':sha(destination),'completed':data['completed'],
                      'passed':data['passed'],'allAssignedLeavesExcluded':data.get('allAssignedLeavesExcluded'),
                      'rows':len(rows),'pending':len(data['pendingIndices']),'wallSeconds':data['wallSeconds'],
                      'maxResidentBytes':data['maxResidentBytes'],'outputBytes':len(output.encode()),
                      'dispositions':data.get('dispositions'),'failure':data.get('failure')}),flush=True)
    if failed:
        raise SystemExit(1)

if __name__=='__main__':
    run()
