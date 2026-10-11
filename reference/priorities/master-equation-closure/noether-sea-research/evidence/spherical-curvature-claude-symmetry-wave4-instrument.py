#!/usr/bin/env python
"""Symmetry wave-4 instrument (run with ../.venv/bin/python; numpy only; foreground, ~10 s).

(a) Argument-principle root counts for the Family A characteristic function and for the in-plane
    D6 mode functions on the rectangle Re in [-4,4], Im in [-40,40]: winding number of h along the
    contour with adaptive refinement (phase step < pi/2 between consecutive samples), compared with
    the number of distinct Newton roots found inside the rectangle.
(b) In-plane D6 modes m = 0, 1, 2, 3 about the stationary alternating hexagon:
    h_m(L) = L^2 - g [ c + sum_k (a_k^(m) + L b_k^(m)) e^{-L tau_k} ],  tau = (1, sqrt3, 2),
    with c = 29/8 - 5/(6 sqrt3) and (derivation in the report)
      a_1 = -(7/2) cos(m pi/3),   b_1 = -(3/2) cos(m pi/3),
      a_2 = (5/(6 sqrt3)) cos(2 m pi/3),  b_2 = (1/6) cos(2 m pi/3),
      a_3 = -(1/8) cos(m pi),      b_3 = 0.
Controls (run first; exit before targets on failure):
  known: no-delay Family A at g=1 has exactly 2 roots (+- i sqrt(gC)) in the rectangle;
  known: m=0 has the exact root L=0 (rigid rotation is a static zero mode) and a small real root
         near (19/12) g for small g (the frozen T'(0) = 19/12 identity);
  known: single-member static coefficient c reproduces 29/8 - 5/(6 sqrt3) = 3.1439;
  negative: a contour shifted to Re in [-4, 0.4] at g=1 (Family A) must count 2 fewer roots than
         the full rectangle (the dominant pair at Re = 0.5147 is excluded).
Revision 2 (00:49 UTC): adds a right-half count on Re in [-0.01, 4] compared with the Newton roots
there (this is the certification that nothing with Re > -0.01 inside the rectangle was missed), and a
one-time finer Newton grid when the full-rectangle count and the Newton count disagree. Run-1 output
(full-rectangle counts only; m=3, g=2 had count 21 against 19 Newton roots) is retained as *-run1.json.
"""
import cmath
import json
import math
import sys

import numpy as np

S3 = math.sqrt(3.0)
C_HEX = 29.0 / 8.0 - 5.0 / (6.0 * S3)
TAU = (1.0, S3, 2.0)
# Family A (latitude mode), from wave 3
FAM_A = {"a0": -7.0 / 8.0 - S3 / 9.0, "a": (-2.0, -2.0 / (3.0 * S3), -1.0 / 8.0), "b": (0.0, 0.0, 0.0)}


def inplane_coeffs(m):
    c1, c2, c3 = math.cos(m * math.pi / 3), math.cos(2 * m * math.pi / 3), math.cos(m * math.pi)
    return {"a0": C_HEX, "a": (-3.5 * c1, (5.0 / (6.0 * S3)) * c2, -0.125 * c3), "b": (-1.5 * c1, c2 / 6.0, 0.0)}


def h(L, g, co, delays=True):
    br = co["a0"]
    for a, b, tau in zip(co["a"], co["b"], TAU):
        e = cmath.exp(-L * tau) if delays else 1.0
        br += (a + (L * b if delays else 0.0)) * e
    return L * L - g * br


def dh(L, g, co, delays=True):
    d = 2 * L
    if delays:
        for a, b, tau in zip(co["a"], co["b"], TAU):
            e = cmath.exp(-L * tau)
            d -= g * (b * e - tau * (a + L * b) * e)
    return d


def newton_roots(g, co, delays=True, re_lo=-4, re_hi=4, im_lo=-40, im_hi=40, nre=33, nim=161):
    roots = []
    for re in np.linspace(re_lo, re_hi, nre):
        for im in np.linspace(im_lo, im_hi, nim):
            L = complex(re, im)
            ok = False
            for _ in range(100):
                if not cmath.isfinite(L) or abs(L.real) > 60:
                    break
                d = dh(L, g, co, delays)
                if d == 0 or not cmath.isfinite(d):
                    break
                step = h(L, g, co, delays) / d
                L -= step
                if abs(step) < 1e-14:
                    ok = True
                    break
            if ok and abs(h(L, g, co, delays)) < 1e-11:
                if re_lo < L.real < re_hi and im_lo < L.imag < im_hi:
                    if not any(abs(L - r) < 1e-7 for r in roots):
                        roots.append(L)
    roots.sort(key=lambda z: -z.real)
    return roots


def winding_count(g, co, delays=True, re_lo=-4, re_hi=4, im_lo=-40, im_hi=40, n0=4000):
    """Number of zeros inside the rectangle = (1/2pi) * total phase change of h along the boundary."""
    corners = [complex(re_lo, im_lo), complex(re_hi, im_lo), complex(re_hi, im_hi), complex(re_lo, im_hi), complex(re_lo, im_lo)]
    total = 0.0
    max_step = 0.0
    for A, B in zip(corners[:-1], corners[1:]):
        n = n0
        while True:
            ts = np.linspace(0, 1, n + 1)
            vals = [h(A + (B - A) * t, g, co, delays) for t in ts]
            phases = np.unwrap([cmath.phase(v) for v in vals])
            steps = np.abs(np.diff(phases))
            if steps.max() < math.pi / 2 or n > 2_000_000:
                break
            n *= 4
        total += phases[-1] - phases[0]
        max_step = max(max_step, float(steps.max()))
    return int(round(total / (2 * math.pi))), total / (2 * math.pi), max_step


def main():
    out = {"controls": [], "targets": {}}
    # known: no-delay Family A at g=1 -> exactly 2 roots
    cnt, raw, ms = winding_count(1.0, FAM_A, delays=False)
    out["controls"].append({"name": "known: no-delay Family A g=1, exactly 2 roots (+-i sqrt(gC)) in rectangle", "count": cnt, "raw": raw, "pass": cnt == 2})
    # known: m=0 exact zero root and small real root ~ (19/12) g
    co0 = inplane_coeffs(0)
    h0 = h(0.0, 1.0, co0)
    r0 = newton_roots(1e-3, co0, re_lo=-0.5, re_hi=0.5, im_lo=-0.5, im_hi=0.5, nre=21, nim=21)
    small_real = [z for z in r0 if abs(z.imag) < 1e-9 and z.real > 1e-6]
    out["controls"].append({"name": "known: m=0 has h(0)=0 exactly and a real root near (19/12) g at g=1e-3",
                            "h_at_0": [h0.real, h0.imag], "small_real_root": small_real[0].real if small_real else None,
                            "predicted": 19.0 / 12.0 * 1e-3,
                            "pass": abs(h0) < 1e-14 and bool(small_real) and abs(small_real[0].real - 19.0 / 12.0 * 1e-3) < 0.02 * 19.0 / 12.0 * 1e-3})
    # known: static single-member coefficient
    out["controls"].append({"name": "known: receiver coefficient c = 29/8 - 5/(6 sqrt3) = 3.1439", "c": C_HEX, "pass": abs(C_HEX - 3.143874775675312) < 1e-12})
    # known: in-plane static sums
    static = {m: inplane_coeffs(m)["a0"] + sum(inplane_coeffs(m)["a"]) for m in range(4)}
    out["controls"].append({"name": "known: m=0 static sum is exactly 0 (rigid rotation neutral)", "static_sums": static, "pass": abs(static[0]) < 1e-12})
    # negative: shifted contour
    cnt_full, _, _ = winding_count(1.0, FAM_A)
    cnt_shift, _, _ = winding_count(1.0, FAM_A, re_hi=0.4)
    out["controls"].append({"name": "negative: contour Re<=0.4 at g=1 (Family A) misses the dominant pair: count differs by 2",
                            "count_full": cnt_full, "count_shifted": cnt_shift, "pass": cnt_full - cnt_shift == 2})
    if not all(c["pass"] for c in out["controls"]):
        print(json.dumps(out, indent=1))
        print("CONTROL FAILURE", file=sys.stderr)
        sys.exit(2)
    out["controls_all_pass_before_targets"] = True

    gs = [4.0, 2.0, 1.0, 0.5, 0.25, 0.1]
    # (a) Family A counts
    famA = {}
    for g in gs:
        cnt, raw, ms = winding_count(g, FAM_A)
        roots = newton_roots(g, FAM_A)
        Abound = abs(FAM_A["a0"]) + sum(abs(a) for a in FAM_A["a"])
        rc, _, _ = winding_count(g, FAM_A, re_lo=-0.01)
        nr = len([z for z in roots if z.real > -0.01])
        famA[str(g)] = {"right_half_count_Re>-0.01": rc, "newton_roots_Re>-0.01": nr, "dominant_certified": rc == nr,
                        "argument_principle_count": cnt, "raw_winding": raw, "max_phase_step": ms,
                        "newton_roots_in_rectangle": len(roots), "match": cnt == len(roots),
                        "dominant": [roots[0].real, roots[0].imag],
                        "bound_on_|L|_for_Re>=0": math.sqrt(g * Abound),
                        "roots": [[z.real, z.imag] for z in roots]}
    out["targets"]["family_A_counts"] = famA
    # (b) in-plane modes
    modes = {}
    for m in range(4):
        co = inplane_coeffs(m)
        rows = {}
        for g in gs:
            cnt, raw, ms = winding_count(g, co)
            roots = newton_roots(g, co)
            A_ = abs(co["a0"]) + sum(abs(a) for a in co["a"])
            B_ = sum(abs(b) for b in co["b"])
            bound = (g * B_ + math.sqrt(g * g * B_ * B_ + 4 * g * A_)) / 2
            dom = roots[0] if roots else None
            rc, _, _ = winding_count(g, co, re_lo=-0.01)
            nr = len([z for z in roots if z.real > -0.01])
            if cnt != len(roots):  # retry with a finer grid once, keep both counts
                roots_fine = newton_roots(g, co, nre=65, nim=321)
                roots = roots_fine if len(roots_fine) > len(roots) else roots
                dom = roots[0]
                nr = len([z for z in roots if z.real > -0.01])
            rows[str(g)] = {"right_half_count_Re>-0.01": rc, "newton_roots_Re>-0.01": nr, "dominant_certified": rc == nr,
                            "argument_principle_count": cnt, "raw_winding": raw, "newton_roots_in_rectangle": len(roots),
                            "match": cnt == len(roots), "dominant": [dom.real, dom.imag] if dom else None,
                            "real_positive_roots": [z.real for z in roots if abs(z.imag) < 1e-9 and z.real > 1e-9],
                            "bound_on_|L|_for_Re>=0": bound, "roots_Re_ge_0": [[z.real, z.imag] for z in roots if z.real >= -1e-12],
                            "static_sum": co["a0"] + sum(co["a"]), "static_root": math.sqrt(g * (co["a0"] + sum(co["a"]))) if co["a0"] + sum(co["a"]) > 0 else None}
        modes[f"m={m}"] = {"coefficients": {"a0": co["a0"], "a": list(co["a"]), "b": list(co["b"])}, "rows": rows}
    out["targets"]["inplane_modes"] = modes
    print(json.dumps(out, indent=1))


if __name__ == "__main__":
    main()
