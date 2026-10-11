"""Formal coefficient diagnostic of the canonical mirror response beyond seventh order (version 2).

This file is a corrected companion of serial-root-birth-nonmirror-response-growth-2026-10-10.py. Its
computational body is byte-for-byte the body of that file; only this explanation differs. The original
file, its outputs and their manifests are unchanged and remain the record of what was run.

What the computation is. It expands the full canonical delayed mirror row with this review's ring
arithmetic through ninth order and bounds each coefficient a_n(P,Q), B_n(P,Q) on |P| <= 3, 0 < Q <= 4
by the sum of absolute monomial values at |P| = 3, Q = 4.

What it is not. The original explanation called it a consistency test that could falsify the
actual-response certificate. That was wrong, for three reasons. (1) A sum of absolute monomial values
is an upper bound, so exceeding an allowance would not exhibit a violating value. (2) The certificate
bounds the response Phi_5 of the auxiliary fifth-field comparison; this computation expands the full
canonical response, and the two Taylor polynomials are identified only through degree seven, not at
degrees eight and nine. (3) The comparison threshold 2.2 used in one check below differs from the
cited radial circle bound 2.1. The numbers are formal coefficient diagnostics of the canonical series
and bear on the certificate in neither direction. The check names in the body are kept verbatim so
that the retained outputs still correspond to it; read them with this explanation.
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
