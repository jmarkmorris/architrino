"""Independent exact-rational audit of retained contour receipt structure.

Does not import the subject, evaluate a determinant, or recompute image boxes.
Known controls must pass in a separate invocation before target receipt access.
"""
import argparse
import copy
from datetime import datetime, timezone
from fractions import Fraction
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[5]
BASE = ROOT / '.local-data/master-equation-closure/binary-research/logarithmic-actual-fate'
F = Fraction


def point(raw):
    assert len(raw) == 2
    return tuple(F(x) for x in raw)


def winding(points):
    """Signed intersections with the negative real ray, exact half-open rule."""
    count = 0
    assert all(p != (0, 0) for p in points)
    for a, b in zip(points, points[1:] + points[:1]):
        if a[1] <= 0 < b[1] or b[1] <= 0 < a[1]:
            parameter = -a[1] / (b[1] - a[1])
            real = a[0] + parameter * (b[0] - a[0])
            assert real != 0, 'polygon crosses zero'
            if real < 0:
                count += 1 if b[1] < a[1] else -1
        elif a[1] == b[1] == 0:
            assert a[0] * b[0] > 0, 'axis edge crosses zero'
    return count


def audit_contour(data, expected_vertices):
    vertices = [point(x) for x in data['vertices']]
    assert vertices == expected_vertices
    edges = data['edge_certificates']
    assert len(edges) == data['accepted_edges'] and len(edges) >= 4
    expected_a = vertices[0]
    expected_fa = point(edges[0]['fa'])
    first_image = expected_fa
    side = 0
    image_points = []
    for edge in edges:
        assert side < 4
        a, b, fa, fb = (point(edge[key]) for key in ('a', 'b', 'fa', 'fb'))
        assert (a, fa) == (expected_a, expected_fa), 'coverage or image seam'
        start, end = vertices[side], vertices[(side + 1) % 4]
        direction = (end[0] - start[0], end[1] - start[1])
        axis = 0 if direction[0] else 1
        assert direction[axis] != 0 and direction[1 - axis] == 0
        ta = (a[axis] - start[axis]) / direction[axis]
        tb = (b[axis] - start[axis]) / direction[axis]
        assert 0 <= ta < tb <= 1
        assert a[1 - axis] == b[1 - axis] == start[1 - axis]
        lohi = [point(edge['image'][key]) for key in ('real', 'imag')]
        assert all(lo <= hi for lo, hi in lohi)
        assert any(lo > 0 or hi < 0 for lo, hi in lohi), 'box contains zero'
        for value in (fa, fb):
            assert all(lohi[j][0] <= value[j] <= lohi[j][1] for j in (0, 1))
        image_points.append(fa)
        expected_a, expected_fa = b, fb
        if tb == 1:
            side += 1
    assert side == 4 and expected_a == vertices[0] and expected_fa == first_image
    count = winding(image_points)
    assert count == data['winding'], 'wrong reported winding'
    return {'edges': len(edges), 'exact_directed_cover': True,
            'endpoint_containment_and_seams': True, 'all_boxes_exclude_zero': True,
            'independent_negative_ray_winding': count}


def known():
    assert hashlib.sha256(b'abc').hexdigest() == 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    assert F(1, 2) + F(1, 3) == F(5, 6)
    square = [point(p) for p in [(-2, -2), (2, -2), (2, 2), (-2, 2)]]
    assert winding(square) == 1 and winding(square * 2) == 2
    assert winding(list(reversed(square))) == -1
    assert winding([(x + 5, y) for x, y in square]) == 0
    edges = []
    for a, b in zip(square, square[1:] + square[:1]):
        edges.append({'a': list(map(str, a)), 'b': list(map(str, b)),
                      'fa': list(map(str, a)), 'fb': list(map(str, b)),
                      'image': {'real': [str(min(a[0], b[0])), str(max(a[0], b[0]))],
                                'imag': [str(min(a[1], b[1])), str(max(a[1], b[1]))]}})
    valid = {'vertices': [list(map(str, p)) for p in square],
             'edge_certificates': edges, 'accepted_edges': 4, 'winding': 1}
    audit_contour(valid, square)
    mutations = []
    bad = copy.deepcopy(valid); bad['edge_certificates'][1]['a'][0] = '1'; mutations.append(bad)
    bad = copy.deepcopy(valid); bad['edge_certificates'][0]['image']['imag'] = ['-2', '2']; mutations.append(bad)
    bad = copy.deepcopy(valid); bad['winding'] = -1; mutations.append(bad)
    bad = copy.deepcopy(valid); bad['edge_certificates'][1]['fa'][0] = '3'; mutations.append(bad)
    for bad in mutations:
        try:
            audit_contour(bad, square)
        except AssertionError:
            continue
        raise AssertionError('corrupt known receipt was accepted')
    return {'fraction_and_sha_controls': True, 'winding_1_2_reverse_outside': True,
            'valid_contour': True, 'rejected_gap_zero_box_wrong_winding_image_seam': True}


def target():
    result = []
    hashes = {}
    for stem, entries in [('spectrum', [('contour', '0.01')]),
                          ('cartesian', [('cartesian_contour', '0.01')]),
                          ('full-spectrum', [('reduced_contour', '-0.01'),
                                             ('cartesian_contour', '-0.01')])]:
        known_path, target_path = (BASE / (stem + suffix) for suffix in ('-known.json', '-target.json'))
        before, record = (json.loads(p.read_text()) for p in (known_path, target_path))
        assert before['passed'] is True and before['mode'] == 'known'
        assert record['passed'] is True and record['mode'] == 'target'
        assert datetime.fromisoformat(before['utc']) < datetime.fromisoformat(record['utc'])
        assert before['source_identities'] == record['source_identities']
        for name, digest in record['source_identities'].items():
            path = (ROOT / name).resolve()
            assert path.is_relative_to(ROOT)
            assert hashlib.sha256(path.read_bytes()).hexdigest() == digest
            hashes[name] = digest
        for p in (known_path, target_path):
            hashes[str(p.relative_to(ROOT))] = hashlib.sha256(p.read_bytes()).hexdigest()
        for key, left in entries:
            vertices = [point(v) for v in [(left, '-10'), ('10', '-10'), ('10', '10'), (left, '10')]]
            result.append({'receipt': str(target_path.relative_to(ROOT)), 'contour': key,
                           **audit_contour(record['result'][key], vertices)})
    return {'contours': result, 'source_and_receipt_identities': hashes,
            'retained_known_receipts_precede_and_bind_targets': True,
            'not_evaluated': ['determinant image enclosure arithmetic',
                              'transcendental functions', 'parameter balance',
                              'simple-pair inclusion', 'physical trajectory']}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--known')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    digest = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    if args.target:
        previous = json.loads(Path(args.known).read_text())
        assert previous['mode'] == 'known' and previous['passed'] is True
        assert previous['source_sha256'] == digest
    receipt = {'mode': 'target' if args.target else 'known', 'passed': True,
               'source_sha256': digest, 'utc': datetime.now(timezone.utc).isoformat(),
               'result': target() if args.target else known()}
    with open(args.out, 'x') as stream:
        json.dump(receipt, stream, indent=2)
        stream.write('\n')
    print(json.dumps({'mode': receipt['mode'], 'passed': True, 'output': args.out}))


if __name__ == '__main__':
    main()
