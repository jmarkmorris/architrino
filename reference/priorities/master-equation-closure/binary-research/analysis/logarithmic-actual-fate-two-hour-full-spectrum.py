"""Frozen-instrument extension to a contour containing the rotation zero.

Recounts both admitted differential formulations on Re(k) > -0.01.
The wider analytic tail bound is proved in the companion analysis.
"""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import resource

import importlib.util
HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('cartesian_reconstruction', HERE/'logarithmic-actual-fate-two-hour-cartesian.py')
cart = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cart)
subject = cart.subject


def identities():
    result = cart.identities()
    result[str(Path(__file__).resolve().relative_to(cart.ROOT))] = hashlib.sha256(Path(__file__).read_bytes()).hexdigest()
    return result


def known():
    result = cart.known()
    # On this wider rectangle k(k-1)(k+1) has exactly two zeros: 0 and 1.
    count = subject.contour(lambda k: k*(k-1)*(k+1), subject.square('-0.01', 10, -10, 10))
    assert count['winding'] == 2
    return {'inherited_controls': result, 'new_contour_known_polynomial': count}


def target():
    f, parameters = subject.characteristic()
    first = subject.contour(f, subject.square('-0.01', 10, -10, 10), retain=True)
    matrix = cart.matrix_builder()

    def determinant(k):
        z = cart.C((k.re.lo, k.re.hi), (k.im.lo, k.im.hi))
        M = matrix(z)
        value = M[0][0]*M[1][1]-M[0][1]*M[1][0]
        return subject.C(subject.I(*value.real), subject.I(*value.imag))

    second = subject.contour(determinant, subject.square('-0.01', 10, -10, 10), retain=True)
    assert first['winding'] == second['winding']
    return {'parameters': parameters, 'reduced_contour': first, 'cartesian_contour': second,
            'tail_radius': '10', 'left_boundary': '-0.01',
            'independence_boundary': 'separate frozen differential formulations and interval arithmetic; shared new contour method'}


def main():
    resource.setrlimit(resource.RLIMIT_CPU, (650, 650))
    parser = argparse.ArgumentParser()
    parser.add_argument('--target', action='store_true')
    parser.add_argument('--known')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    ids = identities()
    if args.target:
        previous = json.loads(Path(args.known).read_text())
        assert previous['passed'] and previous['mode'] == 'known' and previous['source_identities'] == ids
    result = target() if args.target else known()
    receipt = {'passed': True, 'mode': 'target' if args.target else 'known', 'source_identities': ids,
               'utc': datetime.now(timezone.utc).isoformat(), 'evaluations': subject.CALLS, 'result': result}
    payload = json.dumps(receipt, indent=2)
    assert len(payload.encode()) < 2*1024*1024
    with open(args.out, 'x') as stream:
        stream.write(payload+'\n')
    print(json.dumps({'passed': True, 'mode': receipt['mode'], 'evaluations': subject.CALLS,
                      'winding': result.get('reduced_contour', {}).get('winding'), 'out': args.out}), flush=True)


if __name__ == '__main__':
    main()
