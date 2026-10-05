"""Fixed-law circle screen. Research instrument, not a production solver.

The root census and the known control were frozen in subject Sections 1/12.
Run --known first and preserve that receipt before --target.
"""
import argparse
import json
import math
import time
from pathlib import Path

import numpy as np
from scipy.optimize import brentq

K_LINEAR = 0.2862286103053385
OUT = Path('.local-data/master-equation-closure/binary-research/alternatives-screen-2026-10-05')


def roots(b):
    if 0 < b <= 1:
        return [], [brentq(lambda x: x-b*math.cos(x), 0, math.pi/2, xtol=1e-14)]
    if not 3 <= b <= 4:
        raise ValueError('Unfrozen speed interval')
    self_roots = [brentq(lambda x: x-b*math.sin(x), math.acos(1/b), math.pi, xtol=1e-14)]
    partner_roots = [brentq(lambda x: x-b*math.cos(x), 0, math.pi/2, xtol=1e-14)]
    for a, c in [(math.pi/2, 9*math.pi/10), (9*math.pi/10, 3*math.pi/2)]:
        partner_roots.append(brentq(lambda x: x+b*math.cos(x), a, c, xtol=1e-14))
    return self_roots, partner_roots


def coefficients(p, b):
    ss, pp = roots(b)
    cr = ct = 0.0
    rows = []
    for channel, xx in [('self', ss), ('partner', pp)]:
        for x in xx:
            sn, co = math.sin(x), math.cos(x)
            if channel == 'self':
                a = abs(sn)
                n = np.array([a, math.copysign(1.0, sn)*co, 0.0])
                denominator = 1-b*math.copysign(1.0, sn)*co
                sigma = 1
            else:
                a = abs(co)
                n = np.array([a, -math.copysign(1.0, co)*sn, 0.0])
                denominator = 1+b*math.copysign(1.0, co)*sn
                sigma = -1
            acc = sigma*n/((2*a)**p*abs(denominator))
            cr += acc[0]
            ct += acc[1]
            rows.append(dict(channel=channel, x=x, denominator=denominator,
                             normalized_range=2*a, normalized_acceleration=acc.tolist(),
                             root_residual=x-b*a))
    return float(cr), float(ct), rows


def known():
    x, radius = .5, 2.0
    b = x/math.cos(x)
    reports = []
    for p in [1.0, 1.5, 2.0, -1.0]:
        cr, ct, rows = coefficients(p, b)
        actual = np.array([cr, ct, 0.0])/radius**p
        displacement = np.array([2*radius*math.cos(x)**2, -2*radius*math.cos(x)*math.sin(x), 0.0])
        r = np.linalg.norm(displacement)
        source_velocity = np.array([-b*math.sin(2*x), -b*math.cos(2*x), 0.0])
        den = 1-np.dot(displacement/r, source_velocity)
        expected = -displacement/r**(p+1)/den
        error = float(np.max(np.abs(actual-expected)))
        assert len(rows) == 1 and rows[0]['channel'] == 'partner'
        assert abs(rows[0]['x']-.5) < 1e-13 and error < 1e-12
        reports.append(dict(p=p, error=error, root_error=abs(rows[0]['x']-.5)))
    record = dict(mode='known', passed=True, control='x=.5,b=x/cos(x),R=2 analytic complete circle input',
                  cf=1, reports=reports, utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()))
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/'circle-known.json').write_text(json.dumps(record, indent=2)+'\n')
    return record


def target():
    receipt = json.loads((OUT/'circle-known.json').read_text())
    assert receipt['passed'] and receipt['mode'] == 'known'
    start = time.monotonic()
    findings = []
    for p in [1.0, 1.5, 2.0, -1.0]:
        grid = np.linspace(3.0, 4.0, 2001)
        vals = [coefficients(p, float(b))[1] for b in grid]
        crossings = []
        for a, b, va, vb in zip(grid[:-1], grid[1:], vals[:-1], vals[1:]):
            if va*vb < 0:
                speed = brentq(lambda q: coefficients(p, q)[1], float(a), float(b), xtol=1e-14)
                cr, ct, rows = coefficients(p, speed)
                item = dict(speed=speed, cr=cr, ct=ct, rows=rows,
                            min_abs_denominator=min(abs(r['denominator']) for r in rows))
                if p == -1:
                    item['omega_squared'] = -K_LINEAR*cr
                    if cr < 0:
                        item['omega'] = math.sqrt(-K_LINEAR*cr)
                        item['radius'] = speed/item['omega']
                elif p == 1:
                    item['dimensionless_radial_residual'] = speed*speed+cr
                elif cr < 0:
                    item['radius'] = (-cr/(speed*speed))**(1/(p-1))
                    item['omega'] = speed/item['radius']
                crossings.append(item)
        findings.append(dict(p=p, observed_sign_crossings=crossings, sampled_ct_min=min(vals),
                             sampled_ct_max=max(vals), sample_count=len(grid)))
    record = dict(mode='target', cf=1, speed_interval=[3,4], laws_p=[1,1.5,2,-1],
                  findings=findings, wall_seconds=time.monotonic()-start,
                  evidence_grade='floating-point balance candidates; no whole-interval uniqueness or error enclosure',
                  known_receipt='circle-known.json', utc=time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()))
    (OUT/'circle-target.json').write_text(json.dumps(record, indent=2)+'\n')
    return record


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument('--known', action='store_true')
    group.add_argument('--target', action='store_true')
    args = parser.parse_args()
    print(json.dumps(known() if args.known else target(), indent=2))
