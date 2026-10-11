"""Growth of the formal response coefficients against the actual-response certificate's allowances.

The accepted actual seventh-order certificate (overnight2-a-reference-spatial-seventh-order.md, (8))
allows a polynomial response error of 9e13 alpha^8 radially and 2.2e12 Q alpha^8 transversely on the
domain |P| <= 3, 0 < Q <= 4. Its Taylor-tail part comes from a Cauchy estimate on a circle of radius
0.02 in alpha. A necessary condition for such an estimate is that every Taylor coefficient of the
response is bounded by (bound on the circle)/0.02^n.

This script computes the formal mirror-row coefficients a_n(P,Q) and B_n(P,Q) beyond seventh order
with this review's own ring expansion and bounds each on the domain by the sum of absolute monomial
values at |P| = 3, Q = 4. It then compares the first neglected radial coefficient a_8 with 9e13 and the
first neglected transverse coefficient Q*B_7/Q = B_7 with 2.2e12, and reports each coefficient's
majorant times 0.02^n.

This is a consistency test that could falsify the certificate's constants. Passing it does not prove
them: it concerns the formal mirror series, not the actual history, and a majorant of coefficients is
not a bound on a remainder. Known cases run first.
"""
import importlib.util
import json
import pathlib
import sys
import time
import sympy as sp

here = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ring", here / "serial-root-birth-nonmirror-account-rederivation-ring-2026-10-10.py")
ring = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ring)
P, Q = ring.m.P, ring.m.Q


def box_majorant(expr):
    total = sp.Integer(0)
    for (i, j), c in sp.Poly(sp.expand(expr), P, Q).terms():
        total += abs(c) * 3 ** i * 4 ** j
    return total


t0 = time.time()
k = ring.run("known")
known = dict(k["known"])
known["box majorant of 2 P Q - Q^2 at |P|=3, Q=4 is 40"] = box_majorant(2 * P * Q - Q ** 2) == 40
known["box majorant of the hand value a_2 = Q^2/2 is 8"] = box_majorant(Q ** 2 / 2) == 8
out = {"known": {a: bool(v) for a, v in known.items()}, "known_result": "PASS" if all(known.values()) else "FAIL"}
if out["known_result"] == "PASS" and len(sys.argv) > 1 and sys.argv[1] == "target":
    N = 9
    a_c, B_c = ring.to_PQ(ring.response(N), N)
    rows = {}
    for n in range(1, N + 1):
        ma = box_majorant(a_c[n])
        rows["a_%d" % n] = {"majorant": float(ma), "times_0.02^n": float(ma * sp.Rational(2, 100) ** n)}
    for n in range(0, N):
        mb = box_majorant(B_c[n])
        rows["B_%d" % n] = {"majorant": float(mb), "times_0.02^(n+1)": float(mb * sp.Rational(2, 100) ** (n + 1))}
    out["rows"] = rows
    out["a_8"], out["B_7"] = str(a_c[8]), str(B_c[7])
    target = {
        "first neglected radial coefficient: majorant of a_8 is below 9e13": box_majorant(a_c[8]) < 9 * 10 ** 13,
        "first neglected transverse coefficient: majorant of B_7 is below 2.2e12": box_majorant(B_c[7]) < sp.Rational(22, 10) * 10 ** 12,
        "a_8 times 0.02^8 is below 2.2 and a_9 times 0.02^9 is below 2.2": box_majorant(a_c[8]) * sp.Rational(2, 100) ** 8 < sp.Rational(22, 10) and box_majorant(a_c[9]) * sp.Rational(2, 100) ** 9 < sp.Rational(22, 10),
    }
    out["target"] = {a: bool(v) for a, v in target.items()}
    out["target_result"] = "PASS" if all(target.values()) else "FAIL"
out["seconds"] = round(time.time() - t0, 2)
print(json.dumps(out, indent=1))
raise SystemExit(0 if out["known_result"] == "PASS" else 1)
