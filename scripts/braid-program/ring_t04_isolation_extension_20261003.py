#!/usr/bin/env python3
"""Fixed-center interval Krawczyk extension of the frozen T04 coupled chart.

The frozen causal/AD primitives are dependencies, not independent references.
This instrument adds a point-centered constant preconditioner and outward
contraction proof.  The accepted scalar theorem supplies the exact zero.
"""
from __future__ import annotations

import argparse
import hashlib
import itertools
import json
from pathlib import Path
import sys
import time

import mpmath as mp

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / 'scripts/equation-mapping'))
import certify_planar_three_binary_coupled_box as frozen

base = frozen.base
mp.mp.dps = 110
mp.iv.dps = 75
SCRIPT = Path(__file__).resolve()
INPUTS = [SCRIPT, Path(frozen.__file__).resolve(), Path(base.__file__).resolve(),
          base.SOURCE, base.PHASE_CERTIFICATE, base.SCALAR_THEOREM_EVIDENCE,
          ROOT / 'reference/priorities/master-equation-closure/braid-program/evidence/2026-09-02-planar-three-binary-coupled-box-certificate.md']


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def bindings():
    return {str(p.relative_to(ROOT)): digest(p) for p in INPUTS}


def enc(x):
    return {'binaryEndpoints': x._mpi_, 'decimalDiagnostics': base.interval_string(x, 80)}


def matmul(a, b):
    return [[sum((a[i][k] * b[k][j] for k in range(len(b))), base.I(0))
             for j in range(len(b[0]))] for i in range(len(a))]


def mv(a, v):
    return [sum((aij * vj for aij, vj in zip(row, v)), base.I(0)) for row in a]


def fixed_inverse(j):
    point = mp.matrix([[base.midpoint(x) for x in row] for row in j])
    inverse = point ** -1
    return [[base.I(inverse[i, k]) for k in range(5)] for i in range(5)]


def interval_hull(values):
    return base.I(min(base.lower(v) for v in values), max(base.upper(v) for v in values))


def defect_for(jacobian, y):
    yj = matmul(y, jacobian)
    return [[base.I(int(i == j)) - yj[i][j] for j in range(5)] for i in range(5)]


def defect_hull(jacobians, y):
    pieces = [defect_for(j, y) for j in jacobians]
    return [[interval_hull([piece[i][j] for piece in pieces]) for j in range(5)] for i in range(5)]


def krawczyk(center, fcenter, box, jacobian, y, covered_defect=None):
    defect = defect_for(jacobian, y) if covered_defect is None else covered_defect
    correction = mv(y, fcenter)
    spread = mv(defect, [xi - ci for xi, ci in zip(box, center)])
    image = [ci - ei + si for ci, ei, si in zip(center, correction, spread)]
    rows = [sum((abs(x) for x in row), base.I(0)) for row in defect]
    norm_index = max(range(5), key=lambda i: base.upper(rows[i]))
    raw_norm = rows[norm_index]
    # Positive point weights are proposals only.  Every resulting ratio and
    # row sum is then recomputed with directed interval arithmetic.  No
    # eigenvalue computed here bears the proof.
    bound = mp.matrix([[base.upper(abs(x)) for x in row] for row in defect])
    weights = mp.matrix([1]*5)
    if max(bound) > mp.mpf('1e-55'):
        for _ in range(100):
            proposal = bound * weights
            weights = proposal / max(proposal)
    weights = [base.I(w) for w in weights]
    assert all(base.lower(w) > 0 for w in weights)
    weighted_rows = [sum((abs(defect[i][j])*weights[j]/weights[i]
                          for j in range(5)), base.I(0)) for i in range(5)]
    norm = weighted_rows[max(range(5), key=lambda i: base.upper(weighted_rows[i]))]
    contraction = base.upper(norm) < 1
    inclusion = all(base.strict_subset(ki, xi) for ki, xi in zip(image, box))
    return {'image': image, 'defect': defect, 'rowNorms': rows, 'normBound': norm,
            'rawNormBound': raw_norm, 'weights': weights, 'weightedRowNorms': weighted_rows,
            'contraction': contraction, 'strictInclusion': inclusion,
            # The target's accepted exact-zero premise supplies existence.
            # Uniform contraction alone then proves injectivity on the box.
            'accepted': contraction}


def pack_k(k):
    return {**{key: value for key, value in k.items() if isinstance(value, bool)},
            'image': [enc(x) for x in k['image']],
            'defect': [[enc(x) for x in row] for row in k['defect']],
            'rowNorms': [enc(x) for x in k['rowNorms']],
            'rawNormBound': enc(k['rawNormBound']),
            'weights': [enc(x) for x in k['weights']],
            'weightedRowNorms': [enc(x) for x in k['weightedRowNorms']],
            'normBound': enc(k['normBound'])}


def geometry_pack(g):
    return {key: enc(base.I(value)) for key, value in g.items()}


def linear_control():
    a = [[base.I(v) for v in row] for row in
         [[4, 1, 0, 0, 1], [1, 5, 1, 0, 0], [0, 1, 6, 1, 0],
          [0, 0, 1, 7, 1], [1, 0, 0, 1, 8]]]
    expected = [base.I(str(v)) for v in ['0.1', '-0.2', '0.3', '-0.4', '0.5']]
    center = [base.I(0) for _ in range(5)]
    f = [-x for x in mv(a, expected)]
    box = [base.I(-1, 1) for _ in range(5)]
    y = fixed_inverse(a)
    k = krawczyk(center, f, box, a, y)
    covered = krawczyk(center, f, box, a, y, defect_hull([a, a], y))
    assert k['accepted'] and base.upper(k['normBound']) < mp.mpf('1e-65')
    assert covered['accepted'] and base.upper(covered['normBound']) < mp.mpf('1e-65')
    assert all(base.lower(ki) <= base.lower(e) <= base.upper(e) <= base.upper(ki)
               for ki, e in zip(k['image'], expected))
    return {'analyticalAnswer': ['0.1', '-0.2', '0.3', '-0.4', '0.5'],
            'krawczyk': pack_k(k), 'coveredKrawczyk': pack_k(covered), 'passed': True}


def static_hex_control():
    # At beta=0 every distinct source is stationary: delay angle zero,
    # causal G_theta=-1, D=1. No positive-delay self source exists.
    point = [base.I(0), base.I(0), base.I(1), base.I(1), base.I(0)]
    zero_root = base.RootCertificate(mp.mpf(0), base.I(0), base.I(0), base.I(-1))
    chart = {(i, j): ([] if i == j else [zero_root]) for i in range(6) for j in range(6)}
    residual, geometry = frozen.residual_ad(*point, chart)
    # Baseline alternating hexagon Cr=-5/4+1/sqrt(3), Ct=0.
    analytic_radial = -base.I(5)/4 + 1/mp.iv.sqrt(base.I(3))
    assert all(base.lower(r.value) <= 0 <= base.upper(r.value) for r in residual)
    assert max(base.upper(abs(r.value)) for r in residual) < mp.mpf('1e-65')
    # Independently sum direct static projection for receiver 0.
    phases = [base.I(0), mp.iv.pi, 2*mp.iv.pi/3, 5*mp.iv.pi/3, 4*mp.iv.pi/3, 7*mp.iv.pi/3]
    radial = base.I(0)
    for j in range(1, 6):
        theta = phases[j]
        squared = 2 - 2*mp.iv.cos(theta)
        radial += base.POLARITIES[0]*base.POLARITIES[j]*(1-mp.iv.cos(theta))/(squared*mp.iv.sqrt(squared))
    assert base.lower(radial - analytic_radial) <= 0 <= base.upper(radial - analytic_radial)
    origin_floor = base.I(3)*(1-base.I(1)/24)-1
    assert base.lower(origin_floor) <= mp.mpf('1.875') <= base.upper(origin_floor)
    return {'analyticalRadial': enc(analytic_radial), 'directRadial': enc(radial),
            'full12Compatibility': [enc(r.value) for r in residual],
            'selfOriginAnalyticalFloor': enc(origin_floor),
            'geometry': geometry_pack(geometry), 'passed': True}


def center_reference():
    center = [base.I(0), base.I(0), base.I(1), base.I(1), base.I(base.BETA_TOKEN)]
    chart, census = frozen.root_chart_for_box(*center, mp.mpf(base.POINT_ROOT_BOX_RADIUS_TOKEN), True)
    residual, geometry = frozen.residual_ad(*center, chart)
    selected = frozen.selected_rows(residual)
    jacobian = [list(row.derivative) for row in selected]
    y = fixed_inverse(jacobian)
    k = krawczyk(center, [r.value for r in selected], center, jacobian, y)
    assert base.upper(k['normBound']) < mp.mpf('1e-55')
    # The premise is the accepted exact scalar zero, not point balance.
    symmetric = [base.I(0), base.I(0), base.I(1), base.I(1), base.I(*base.SCALAR_T04_BRACKET)]
    exact_chart, exact_census = frozen.root_chart_for_box(*symmetric, mp.mpf(base.ROOT_BOX_RADIUS_TOKEN), True)
    exact_residual, exact_geometry = frozen.residual_ad(*symmetric, exact_chart)
    assert all(base.lower(r.value) <= 0 <= base.upper(r.value) for r in exact_residual)
    assert census['directedRootCount'] == exact_census['directedRootCount'] == 72
    return center, [r.value for r in selected], y, {
        'knownAnswer': 'accepted exact regular T04 zero inside its scalar bracket, with all12 compatibility rows discharged by covariance',
        'pointFull12Residual': [enc(r.value) for r in residual],
        'scalarBracketFull12Residual': [enc(r.value) for r in exact_residual],
        'pointCensus': census, 'scalarBracketCensus': exact_census,
        'pointGeometry': geometry_pack(geometry), 'scalarBracketGeometry': geometry_pack(exact_geometry),
        'centerJacobian': [[enc(x) for x in row] for row in jacobian],
        'fixedPreconditioner': [[enc(x) for x in row] for row in y],
        'centerDefectNorm': enc(k['normBound']), 'passed': True}


def known():
    base.validate_source(json.loads(base.SOURCE.read_text()))
    linear = linear_control()
    static = static_hex_control()
    _, _, _, reference = center_reference()
    return {'schema': 'braid-program/t04-isolation-extension-control.v1',
            'bindings': bindings(), 'controlOrder': ['known5DLinear', 'analyticalStaticHex', 'acceptedExactT04FullReference'],
            'known5DLinear': linear, 'analyticalStaticHex': static,
            'acceptedExactT04FullReference': reference, 'allPassed': True}


def decode(x):
    # Construct directly from stored binary endpoints without decimal parsing.
    value = mp.iv.mpf(0)
    value._mpi_ = tuple(tuple(v) for v in x['binaryEndpoints'])
    return value


def domain_guards(box):
    """Close the old oracle's point endpoint arithmetic with outward guards.

    The source/speed domain end in the frozen implementation is a point
    product.  No conclusion here depends on its last bit: every channel's
    missing endpoint sliver is enclosed by an outward interval and tested.
    The coincident self-origin inequality is likewise recomputed outward.
    """
    d2, d3, r2, r3, beta = box
    phases = frozen.phases_ad(frozen.AD.constant(d2), frozen.AD.constant(d3))
    radii = [base.I(1), base.I(1), r2, r2, r3, r3]
    receipts = []
    for i in range(6):
        for j in range(6):
            point_end = base.upper(beta)*(base.upper(radii[i])+base.upper(radii[j]))
            outward_end = base.upper(beta*(radii[i]+radii[j]))
            sliver = base.I(min(point_end, outward_end), max(point_end, outward_end))
            same = i == j
            phase = base.I(0) if same else phases[i].value-phases[j].value
            residual = base.interval_root_residual(beta, radii[i], radii[j], phase, sliver, same)
            assert base.upper(residual) < 0
            receipt = {'receiver': i, 'source': j, 'endSliver': enc(sliver),
                       'endSliverResidual': enc(residual)}
            if same:
                floor = beta*radii[i]*(1-base.I(1)/24)-1
                assert base.lower(floor) > 0
                receipt['selfOriginSineLowerCoefficientMinusOne'] = enc(floor)
            receipts.append(receipt)
    return receipts


def target(width, known_path, cover):
    known_path = known_path.resolve()
    control = json.loads(known_path.read_text())
    if not control['allPassed'] or control['bindings'] != bindings():
        raise RuntimeError('known-case binding changed: controls must precede this target')
    reference = control['acceptedExactT04FullReference']
    center = [base.I(0), base.I(0), base.I(1), base.I(1), base.I(base.BETA_TOKEN)]
    f = [decode(reference['pointFull12Residual'][i]) for i in (1, 5, 9)]
    full = [decode(v) for v in reference['pointFull12Residual']]
    f.extend([full[4] - full[0], full[8] - full[0]])
    y = [[decode(x) for x in row] for row in reference['fixedPreconditioner']]
    radius = mp.mpf(width)
    box = [ci + base.I(-radius, radius) for ci in center]
    assert base.strict_subset(base.I(*base.SCALAR_T04_BRACKET), box[4])
    started = time.monotonic()
    result = {'schema': 'braid-program/t04-isolation-extension-certificate.v1',
              'bindings': bindings(), 'knownControl': str(known_path.relative_to(ROOT)),
              'knownControlSHA256': digest(known_path), 'uniformCoordinateHalfWidth': width,
              'coordinateOrder': ['delta2', 'delta3', 'r2', 'r3', 'beta_f'],
              'box': [enc(x) for x in box], 'fieldSpeed': '1',
              'exactZeroPremise': 'accepted scalar T04 bracket and exact rotation/polarity covariance',
              'claimGrade': 'computer-assisted derived local candidate, pending separately constructed adjudication'}
    try:
        chart, census = frozen.root_chart_for_box(*box, mp.mpf(base.ROOT_BOX_RADIUS_TOKEN), True)
        guards = domain_guards(box)
        residual, geometry = frozen.residual_ad(*box, chart)
        selected = frozen.selected_rows(residual)
        jacobian = [list(row.derivative) for row in selected]
        cover_receipts = []
        covered_defect = None
        if cover:
            matrices = []
            for ordinal, halves in enumerate(itertools.product((0, 1), repeat=5)):
                piece = [base.I(base.lower(xi), base.midpoint(xi)) if half == 0
                         else base.I(base.midpoint(xi), base.upper(xi))
                         for xi, half in zip(box, halves)]
                subchart, subcensus = frozen.root_chart_for_box(*piece, mp.mpf(base.ROOT_BOX_RADIUS_TOKEN), False)
                assert subcensus['directedRootCount'] == census['directedRootCount']
                for pair, roots in subchart.items():
                    assert len(roots) == len(chart[pair])
                    assert all(base.strict_subset(sub.newton_image, parent.theta_box)
                               for sub, parent in zip(roots, chart[pair]))
                subresidual, subgeometry = frozen.residual_ad(*piece, subchart)
                subjacobian = [list(row.derivative) for row in frozen.selected_rows(subresidual)]
                matrices.append(subjacobian)
                cover_receipts.append({'ordinal': ordinal, 'halves': list(halves),
                                       'box': [enc(x) for x in piece],
                                       'jacobian': [[enc(x) for x in row] for row in subjacobian],
                                       'rootCensus': subcensus, 'geometry': geometry_pack(subgeometry),
                                       'allSubRootsInsideGlobalOwnedBoxes': True})
                print(json.dumps({'progress': 'JacobianCover', 'completed': ordinal+1, 'total':32}), flush=True)
            covered_defect = defect_hull(matrices, y)
        k = krawczyk(center, f, box, jacobian, y, covered_defect)
        result.update({'rootCensus': census, 'geometry': geometry_pack(geometry),
                       'outwardDomainGuards': guards,
                       'jacobian': [[enc(x) for x in row] for row in jacobian],
                       'jacobianCover': cover_receipts,
                       'krawczyk': pack_k(k),
                       'roots': [{'receiver': i, 'source': j, 'ordinal': n,
                                  'thetaBox': enc(r.theta_box), 'rootImage': enc(r.newton_image),
                                  'causalDerivative': enc(r.transversality)}
                                 for (i, j), roots in chart.items() for n, r in enumerate(roots)],
                       'accepted': k['accepted'],
                       'conclusion': ('the unique full12-compatibility zero throughout this coupled box is regular T04'
                                      if k['accepted'] else 'complete root chart certified, but constant-preconditioner contraction/inclusion not proved')})
    except (base.CertificateFailure, frozen.CertificateFailure) as exc:
        result.update({'accepted': False, 'blocker': str(exc),
                       'conclusion': 'root/geometry admission failed closed; no branch conclusion'})
    result['wallSeconds'] = time.monotonic() - started
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['known', 'target'])
    parser.add_argument('--width', default='2e-6')
    parser.add_argument('--known', type=Path)
    parser.add_argument('--cover32', action='store_true')
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    result = known() if args.mode == 'known' else target(args.width, args.known, args.cover32)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2, sort_keys=True) + '\n')
    print(json.dumps({'output': str(args.output), 'accepted': result.get('accepted'),
                      'allPassed': result.get('allPassed'), 'width': result.get('uniformCoordinateHalfWidth'),
                      'norm': result.get('krawczyk', {}).get('normBound', {}).get('decimalDiagnostics'),
                      'blocker': result.get('blocker'), 'wallSeconds': result.get('wallSeconds')}))


if __name__ == '__main__':
    main()
