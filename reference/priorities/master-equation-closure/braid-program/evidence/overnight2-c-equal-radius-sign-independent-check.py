#!/usr/bin/env python
"""Independent outward-interval certificate; no subject or probe imports.

The analytical reference is the complete equal-radius causal-angle theorem.
Only mpmath's interval context evaluates transcendental functions. Root bracket
endpoints and every reported decimal enclosure are exact rational numbers.
Run --stage known and record its pass before --stage target.
"""
import argparse
import json
import resource
import signal
import sys
import time
from fractions import Fraction as Q

import mpmath
from mpmath import iv

iv.dps = 80
ROOT_WIDTH = Q(1, 10**26)


def interval(q):
    q = Q(q)
    return iv.mpf(q.numerator) / iv.mpf(q.denominator)


def binary_rational(t):
    sign, mantissa, exponent, bits = t
    if bits < 0:
        raise ValueError("non-finite interval endpoint")
    return Q((-1 if sign else 1) * mantissa) * Q(2) ** exponent


def ends(x):
    return tuple(binary_rational(t) for t in x._mpi_)


def hull(lo, hi):
    return iv.mpf([interval(lo).a, interval(hi).b])


def encloses(x, y):
    xl, xh = ends(x)
    yl, yh = ends(y)
    return xl <= yl and yh <= xh


def overlaps(x, y):
    xl, xh = ends(x)
    yl, yh = ends(y)
    return max(xl, yl) <= min(xh, yh)


def decimal_enclosure(x, digits=24):
    """Outward decimal endpoints by exact integer floor and ceiling."""
    lo, hi = ends(x)
    scale = 10**digits
    low = (lo.numerator * scale) // lo.denominator
    high = -((-hi.numerator * scale) // hi.denominator)

    def fmt(n):
        sign = "-" if n < 0 else ""
        n = abs(n)
        return f"{sign}{n // scale}.{n % scale:0{digits}d}"

    return [fmt(low), fmt(high)]


def angle(beta, v):
    """Strict sign bisection enclosing the unique chart root."""
    lo, hi = Q(0), Q(7)

    def gap(x):
        xx = interval(x)
        return xx - 2 * v * iv.sin(xx / 2) - beta

    assert ends(gap(lo))[1] < 0 < ends(gap(hi))[0]
    iterations = 0
    while hi - lo > ROOT_WIDTH:
        assert iterations < 120
        mid = (lo + hi) / 2
        lower, upper = ends(gap(mid))
        if upper < 0:
            lo = mid
        elif lower > 0:
            hi = mid
        else:
            raise ArithmeticError("interval sign unresolved before width target")
        iterations += 1
    assert ends(gap(lo))[1] < 0 < ends(gap(hi))[0]
    alpha = hull(lo, hi)
    assert ends(alpha)[0] > 0 and ends(alpha)[1] < ends(2 * iv.pi)[0]
    return alpha, iterations


def row(beta, v, polarity):
    alpha, iterations = angle(beta, v)
    half = alpha / 2
    sine, cosine = iv.sin(half), iv.cos(half)
    delay = 2 * sine  # Common radius a=1 in all requested controls and target.
    factor = 1 - v * cosine
    assert ends(delay)[0] > 0
    assert ends(factor)[0] > 0
    radial = polarity / (2 * factor)
    tangential = polarity * cosine / (2 * sine * factor)
    return dict(alpha=alpha, tau=delay, D=factor, Ar=radial,
                At=tangential, iterations=iterations)


def configuration(positive_phases_pi, speed):
    v = interval(speed)
    members = [(k, 1, phase) for k, phase in enumerate(positive_phases_pi)]
    members += [(k, -1, (phase + 1) % 2)
                for k, phase in enumerate(positive_phases_pi)]
    assert len({phase for _, _, phase in members}) == 6
    rows, radial_sums, tangent_sums = [], [], []
    for receiver, theta in enumerate(positive_phases_pi):
        ar, at = interval(0), interval(0)
        for source, polarity, source_theta in members:
            if source == receiver and polarity == 1:
                continue
            beta_pi = (theta - source_theta) % 2
            assert 0 < beta_pi < 2
            hit = row(interval(beta_pi) * iv.pi, v, polarity)
            ar += hit["Ar"]
            at += hit["At"]
            rows.append({"receiver_pair": receiver, "source_pair": source,
                         "source_polarity": polarity,
                         "beta_pi": str(beta_pi),
                         **{key: decimal_enclosure(value) if key != "iterations" else value
                            for key, value in hit.items()}})
        radial_sums.append(ar)
        tangent_sums.append(at)
    assert len(rows) == 15
    return rows, radial_sums, tangent_sums


def known():
    # Exact binary-to-rational and outward-decimal controls before root controls.
    assert ends(interval(Q(-3, 8))) == (Q(-3, 8), Q(-3, 8))
    assert decimal_enclosure(interval(Q(1, 3)), 3) == ["0.333", "0.334"]
    assert decimal_enclosure(interval(Q(-1, 3)), 3) == ["-0.334", "-0.333"]
    assert encloses(iv.sin(iv.pi / 2), interval(1))
    # Manufactured alpha=pi/2, v=1/2: H=pi/2-sqrt(2)/2, cot(alpha/2)=1.
    v = interval(Q(1, 2))
    manufactured_beta = iv.pi / 2 - iv.sqrt(2) / 2
    hit = row(manufactured_beta, v, -1)
    assert encloses(hit["alpha"], iv.pi / 2)
    expected = -1 / (2 * (1 - iv.sqrt(2) / 4))
    assert overlaps(hit["Ar"], expected) and overlaps(hit["At"], expected)
    assert ends(hit["At"])[1] - ends(hit["At"])[0] < Q(1, 10**23)
    # Independent static identity on the regular alternating hexagon:
    # every positive receiver has Ar=-1/2, At=0; total At=0.
    rows, ars, ats = configuration([Q(0), Q(2, 3), Q(4, 3)], Q(0))
    for ar, at in zip(ars, ats):
        assert encloses(ar, interval(Q(-1, 2)))
        assert encloses(at, interval(0))
        lo, hi = ends(at)
        assert -Q(1, 10**23) < lo <= hi < Q(1, 10**23)
    return {"passed": True, "controls": ["exact binary endpoint decoding",
            "positive and negative outward decimal rounding",
            "sin(pi/2)=1 interval enclosure", "manufactured alpha=pi/2 signed row",
            "static regular hexagon: 15 rows, each Ar=-1/2 and At=0"],
            "manufactured_alpha": decimal_enclosure(hit["alpha"]),
            "manufactured_At": decimal_enclosure(hit["At"]),
            "static_total_At": decimal_enclosure(sum(ats, interval(0)))}


def target():
    rows, ars, ats = configuration([Q(0), Q(1, 8), Q(1, 4)], Q(3, 4))
    total = sum(ats, interval(0))
    lo, hi = ends(total)
    assert Q(-365, 1000) < lo <= hi < Q(-364, 1000)
    return {"passed": True, "a": "1", "v": "3/4",
            "positive_phases_pi": ["0", "1/8", "1/4"],
            "positive_receiver_partner_rows": rows,
            "radial_sums": [decimal_enclosure(x) for x in ars],
            "tangential_sums": [decimal_enclosure(x) for x in ats],
            "total_positive_receiver_tangential": decimal_enclosure(total),
            "certified_coarse_total_bracket": ["-0.365", "-0.364"],
            "complete_census": "15 evaluated partner rows; 30 directed rows by independently proved antipodal symmetry; zero positive self roots",
            "factor_floor": "D >= 1-v = 1/4 analytically, with every computed interval also strictly positive"}


def timeout(signum, frame):
    raise TimeoutError("30-second instrument limit")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--stage", choices=["known", "target"], required=True)
    args = parser.parse_args()
    signal.signal(signal.SIGALRM, timeout)
    signal.alarm(30)
    started = time.perf_counter()
    result = known() if args.stage == "known" else target()
    elapsed = time.perf_counter() - started
    peak_rss = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
    if sys.platform != "darwin":
        peak_rss *= 1024
    assert elapsed < 30 and peak_rss < 400_000_000
    result.update(stage=args.stage, interval_library=f"mpmath {mpmath.__version__} iv",
                  decimal_precision=iv.dps, root_width_target=str(ROOT_WIDTH),
                  elapsed_seconds=elapsed, peak_rss_bytes=peak_rss)
    encoded = json.dumps(result, indent=2)
    assert len(encoded.encode()) < 100_000
    print(encoded)
