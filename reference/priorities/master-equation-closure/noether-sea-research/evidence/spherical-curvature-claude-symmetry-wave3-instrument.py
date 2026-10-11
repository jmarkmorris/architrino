#!/usr/bin/env python
"""Symmetry wave-3 instrument: roots of the Family A delayed characteristic equation
   h(L) = L^2 - g [a0 + a1 e^{-L} + a2 e^{-sqrt3 L} + a3 e^{-2L}] = 0
about the stationary alternating hexagon (unit sphere, c_f = 1, g the only parameter).
Run with ../.venv/bin/python (numpy, scipy); foreground, a few seconds.

Order enforced: CONTROLS first, exit before targets on any failure.
  known (g -> 0): the rightmost root pair must approach (35/24) g +- i sqrt(g C), C = 3 + sqrt3/3.
  known (static): h(0) = -g (a0+a1+a2+a3) = g (3 + sqrt3/3), i.e. the bracket at L=0 equals the
                  measured static slope -3.57735 of wave 2.
  known (no delay): with e^{-L tau} -> 1 the roots are +- i sqrt(g C) exactly.
  negative: omitting the tau = 1 term changes h at a test point and changes the small-g growth
            rate from (35/24) g to (11/24) g.
Root search: Newton iterations from a grid of starting points in Re in [-6, 6], Im in [0, 60],
deduplicated; residual |h| < 1e-12 required. Roots are reported with the largest real parts.
The search can miss roots far from the grid; the rightmost roots at the listed g are well inside it
(checked by widening the grid once, see 'grid_widen_check').
"""
import cmath
import json
import math
import sys

import numpy as np


def _json_default(o):
    if isinstance(o, (np.bool_,)):
        return bool(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.floating,)):
        return float(o)
    raise TypeError(str(type(o)))

S3 = math.sqrt(3.0)
A0 = -7.0 / 8.0 - S3 / 9.0
A = [(-2.0, 1.0), (-2.0 / (3.0 * S3), S3), (-1.0 / 8.0, 2.0)]  # (a_k, tau_k)
C_STATIC = 3.0 + S3 / 3.0
MU = 35.0 / 12.0


def h(L, g, terms=None, delays=True):
    terms = A if terms is None else terms
    br = A0
    for a, tau in terms:
        br += a * (cmath.exp(-L * tau) if delays else 1.0)
    return L * L - g * br


def dh(L, g, terms=None, delays=True):
    terms = A if terms is None else terms
    d = 2 * L
    for a, tau in terms:
        if delays:
            d += g * a * tau * cmath.exp(-L * tau)
    return d


def newton_roots(g, terms=None, delays=True, re_lo=-6, re_hi=6, im_hi=60, nre=25, nim=121):
    roots = []
    for re in np.linspace(re_lo, re_hi, nre):
        for im in np.linspace(0, im_hi, nim):
            L = complex(re, im)
            ok = False
            for _ in range(100):
                if abs(L.real) > 50 or abs(L.imag) > 1e4 or not cmath.isfinite(L):
                    break
                d = dh(L, g, terms, delays)
                if d == 0 or not cmath.isfinite(d):
                    break
                step = h(L, g, terms, delays) / d
                L = L - step
                if abs(step) < 1e-14:
                    ok = True
                    break
            if ok and abs(h(L, g, terms, delays)) < 1e-12 and L.imag >= -1e-9:
                if not any(abs(L - r) < 1e-7 for r in roots):
                    roots.append(L)
    roots.sort(key=lambda z: -z.real)
    return roots


def main():
    out = {"controls": [], "targets": {}}
    # known: small g asymptotics
    g = 1e-4
    r = newton_roots(g, re_lo=-1, re_hi=1, im_hi=1, nre=21, nim=41)
    top = r[0]
    pred = complex(MU / 2 * g, math.sqrt(g * C_STATIC))
    out["controls"].append({"name": "known: g=1e-4 rightmost root ~ (35/24) g + i sqrt(g C)", "root": [top.real, top.imag],
                            "predicted": [pred.real, pred.imag],
                            "pass": abs(top.real - pred.real) < 0.05 * pred.real and abs(top.imag - pred.imag) < 1e-3 * pred.imag})
    # known: static bracket
    br0 = A0 + sum(a for a, _ in A)
    out["controls"].append({"name": "known: static bracket a0+sum a_k = -(3+sqrt3/3) = measured wave-2 slope", "bracket": br0,
                            "expected": -C_STATIC, "wave2_measured": -3.57735, "pass": abs(br0 + C_STATIC) < 1e-12 and abs(br0 + 3.57735) < 1e-4})
    # known: no-delay limit
    r_nd = newton_roots(1.0, delays=False, re_lo=-2, re_hi=2, im_hi=5, nre=9, nim=51)
    out["controls"].append({"name": "known: no-delay limit at g=1 gives +- i sqrt(C)", "roots": [[z.real, z.imag] for z in r_nd],
                            "expected_imag": math.sqrt(C_STATIC),
                            "pass": len(r_nd) >= 1 and all(abs(z.real) < 1e-9 for z in r_nd) and any(abs(z.imag - math.sqrt(C_STATIC)) < 1e-9 for z in r_nd)})
    # negative: omit tau=1 term
    terms_omit = A[1:]
    Lt = complex(0.3, 1.5)
    hv, hv_om = h(Lt, 1.0), h(Lt, 1.0, terms_omit)
    mu_om = -sum(a * tau for a, tau in terms_omit)
    r_om = newton_roots(1e-4, terms=terms_omit, re_lo=-1, re_hi=1, im_hi=1, nre=21, nim=41)
    out["controls"].append({"name": "negative: omitting the tau=1 delay term changes h and the small-g growth rate (35/24 -> 11/24)",
                            "h_full": [hv.real, hv.imag], "h_omitted": [hv_om.real, hv_om.imag], "mu_omitted": mu_om,
                            "growth_omitted_g1e-4": r_om[0].real if r_om else None, "predicted_omitted": mu_om / 2 * 1e-4,
                            "pass": abs(hv - hv_om) > 1e-6 and abs(mu_om - 11.0 / 12.0) < 1e-12 and r_om and abs(r_om[0].real - mu_om / 2 * 1e-4) < 0.05 * mu_om / 2 * 1e-4})
    if not all(c["pass"] for c in out["controls"]):
        print(json.dumps(out, indent=1, default=_json_default))
        print("CONTROL FAILURE", file=sys.stderr)
        sys.exit(2)
    out["controls_all_pass_before_targets"] = True

    # targets
    res = {}
    for g in [4.0, 2.0, 1.0, 0.5, 0.25, 0.1]:
        roots = newton_roots(g)
        wide = newton_roots(g, re_lo=-12, re_hi=12, im_hi=120, nre=25, nim=121)
        right = roots[:6]
        R = 1.0 / g  # K = 1, c_f = 1
        dom = right[0]
        res[str(g)] = {
            "g": g, "R_at_K1": R,
            "rightmost_roots": [[z.real, z.imag] for z in right],
            "dominant": {"growth_rate_dimensionless": dom.real, "omega_hat": dom.imag,
                         "growth_rate_physical_per_T": dom.real / R, "physical_frequency_f": dom.imag / (2 * math.pi * R),
                         "e_folding_time_T": (R / dom.real if dom.real > 0 else None)},
            "imaginary_axis_pairs": [[z.real, z.imag] for z in roots if abs(z.real) < 1e-8],
            "n_roots_found_grid": len(roots), "grid_widen_check": {"n_roots_wide": len(wide),
                                                                   "same_rightmost": abs(wide[0] - roots[0]) < 1e-9},
            "small_g_asymptote": [MU / 2 * g, math.sqrt(g * C_STATIC)],
            "instantaneous_omega": math.sqrt(g * C_STATIC),
        }
    out["targets"]["family_A_mode_roots"] = res
    # imaginary-axis crossing search: is there a g at which the dominant root has zero real part? scan g
    scan = []
    for g in np.geomspace(1e-3, 10, 60):
        r = newton_roots(float(g), re_lo=-4, re_hi=4, im_hi=30, nre=17, nim=61)
        scan.append([float(g), r[0].real, r[0].imag])
    out["targets"]["dominant_root_scan"] = {"columns": ["g", "Re", "Im"], "rows": scan,
                                            "min_growth_rate": min(s[1] for s in scan),
                                            "all_growing": all(s[1] > 0 for s in scan)}
    print(json.dumps(out, indent=1, default=_json_default))


if __name__ == "__main__":
    main()
