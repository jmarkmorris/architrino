#!/usr/bin/env python
"""Symmetry wave-6 instrument: the wave-5 computation split into runs each measured under 120 s wall.

Usage: ../.venv/bin/python <this file> PART   with PART in
  census     - Part A census (400 recorded seeds) plus chord statistics of every nonconverged endpoint
               (measured 129.9 s on 2026-10-11 01:05 UTC: a breach of the 120 s limit, output retained
               as *-census-breached-130s.json and not used as evidence; use census1/census2 instead)
  census1 / census2 - the same census on the first / second 200 seeds of the same recorded list
  planar     - planar-restricted census of all six-member polarity bracelets on the equator
  rootsZ01   - certified roots, out-of-plane m=0,1 (right strip from Re = -0.1 where the zero root sits)
  rootsZ23   - certified roots, out-of-plane m=2,3
  rootsP01   - certified roots, in-plane m=0,1 re-certification (right strip from Re = -0.1 for m=0)
  rootsP23   - certified roots, in-plane m=2,3 re-certification
Each run executes its own controls first and exits before targets on any failure. Functions are
imported unchanged from the frozen wave-5 instrument (read only). Wall time is measured by the caller
with `time` and recorded in the report.
"""
import importlib.util
import itertools
import json
import math
import os
import sys

import numpy as np
from scipy.optimize import least_squares

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("w5", os.path.join(HERE, "spherical-curvature-claude-symmetry-wave5-instrument.py"))
w5 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w5)
_jd = w5._jd


# ------------------------------------------------------------------ census with nonconverged statistics
def census_with_stats(seed_count=400, master_seed=20261011, half=None):
    Q = np.array([1, 1, 1, -1, -1, -1])
    rng = np.random.default_rng(master_seed)
    seeds = [int(s) for s in rng.integers(0, 2**31 - 1, size=seed_count)]
    if half == 1:
        seeds = seeds[:seed_count // 2]
    elif half == 2:
        seeds = seeds[seed_count // 2:]
    found, nonconv = [], []
    stats = {"seeds": seed_count, "converged": 0, "singular_rejected": 0, "nonconverged": 0, "skipped_initial_chord": 0}
    for sd in seeds:
        r = np.random.default_rng(sd)
        X0 = r.standard_normal((6, 3))
        X0 /= np.linalg.norm(X0, axis=1)[:, None]
        if w5.min_chord(X0) < 0.2:
            stats["skipped_initial_chord"] += 1
            continue
        X, res = w5.solve_from_seed(X0, Q)
        if res > 1e-9:
            stats["nonconverged"] += 1
            unlike = min(np.linalg.norm(X[i] - X[j]) for i in range(6) for j in range(6) if Q[i] != Q[j])
            like = min(np.linalg.norm(X[i] - X[j]) for i in range(6) for j in range(i + 1, 6) if Q[i] == Q[j])
            nonconv.append({"seed": sd, "residual": res, "min_unlike_chord": unlike, "min_like_chord": like})
            continue
        if w5.min_chord(X) < 0.05:
            stats["singular_rejected"] += 1
            continue
        stats["converged"] += 1
        inv = w5.invariant(X, Q)
        for f in found:
            if np.max(np.abs(np.array(f["invariant"]) - inv)) < 1e-3:
                f["hits"] += 1
                break
        else:
            order, _ = w5.symmetry_order(X, Q)
            sv = w5.tangent_jacobian_svals(X, Q)
            found.append({"invariant": inv.tolist(), "hits": 1, "seed": sd, "positions": X.tolist(), "residual": res,
                          "min_chord": w5.min_chord(X), "symmetry_order": order, "near_zero_svals": int(np.sum(sv < 1e-6))})
    # statistics of nonconverged endpoints
    u = np.array([n["min_unlike_chord"] for n in nonconv]) if nonconv else np.array([])
    rres = np.array([n["residual"] for n in nonconv]) if nonconv else np.array([])
    summary = {
        "count": len(nonconv),
        "min_unlike_chord_quantiles_0_10_25_50_75_90_100": np.quantile(u, [0, .1, .25, .5, .75, .9, 1]).tolist() if len(u) else None,
        "fraction_min_unlike_below_0.1": float(np.mean(u < 0.1)) if len(u) else None,
        "fraction_min_unlike_below_0.3": float(np.mean(u < 0.3)) if len(u) else None,
        "residual_quantiles_0_50_100": np.quantile(rres, [0, .5, 1]).tolist() if len(rres) else None,
        "fraction_residual_above_1": float(np.mean(rres > 1)) if len(rres) else None,
    }
    return {"seed_list": seeds, "stats": stats, "distinct_equilibria": found, "nonconverged_summary": summary, "nonconverged_endpoints": nonconv}


# ------------------------------------------------------------------ planar census
def bracelets():
    """Polarity sequences of three + and three - around a hexagon up to rotation, reflection and global swap."""
    seqs = set()
    reps = []
    for bits in itertools.product([1, -1], repeat=6):
        if sum(bits) != 0:
            continue
        canon = None
        for k in range(6):
            for refl in (1, -1):
                for sw in (1, -1):
                    s = tuple(sw * bits[(refl * (i) + k) % 6] for i in range(6))
                    if canon is None or s < canon:
                        canon = s
        if canon not in seqs:
            seqs.add(canon)
            reps.append(canon)
    return sorted(reps)


def planar_residual(angles, Q):
    th = np.concatenate([[0.0], angles])  # member 0 fixed at angle 0
    X = np.array([[math.cos(t), math.sin(t), 0.0] for t in th])
    A = w5.static_field(X, Q)
    out = []
    for i in range(6):
        e = np.array([-math.sin(th[i]), math.cos(th[i]), 0.0])
        out.append(float(np.dot(A[i], e)))
    return np.array(out)


def planar_census(seeds_per_seq=60, master_seed=20261012):
    rng = np.random.default_rng(master_seed)
    results = {}
    for seq in bracelets():
        Q = np.array(seq)
        found = []
        stats = {"converged": 0, "singular": 0, "nonconverged": 0}
        seedlist = [int(s) for s in rng.integers(0, 2**31 - 1, size=seeds_per_seq)]
        for sd in seedlist:
            r = np.random.default_rng(sd)
            a0 = np.sort(r.uniform(0.2, 2 * math.pi - 0.2, size=5))
            sol = least_squares(planar_residual, a0, args=(Q,), method="lm", xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=4000)
            th = np.concatenate([[0.0], np.mod(sol.x, 2 * math.pi)])
            X = np.array([[math.cos(t), math.sin(t), 0.0] for t in th])
            res = float(np.linalg.norm(planar_residual(sol.x, Q)))
            if res > 1e-9:
                stats["nonconverged"] += 1
                continue
            if w5.min_chord(X) < 0.05:
                stats["singular"] += 1
                continue
            stats["converged"] += 1
            inv = w5.invariant(X, Q)
            for f in found:
                if np.max(np.abs(np.array(f["invariant"]) - inv)) < 1e-3:
                    f["hits"] += 1
                    break
            else:
                full = w5.tangent_residuals(X, Q)  # full tangent residual on the sphere (includes the z components, zero by planarity)
                order, _ = w5.symmetry_order(X, Q)
                sv = w5.tangent_jacobian_svals(X, Q)
                found.append({"invariant": inv.tolist(), "hits": 1, "seed": sd, "angles_deg": (np.degrees(th)).tolist(),
                              "residual_planar": res, "residual_full_sphere": float(np.linalg.norm(full)),
                              "min_chord": w5.min_chord(X), "symmetry_order": order, "near_zero_svals_full": int(np.sum(sv < 1e-6))})
        results["".join("+" if q > 0 else "-" for q in seq)] = {"seeds": seedlist, "stats": stats, "distinct": found}
    return results


# ------------------------------------------------------------------ certified roots
def certify(g, co, label, right_lo):
    Rb = w5.modulus_bound(g, co)
    re_hi = max(4.0, math.ceil(Rb) + 1.0)
    im_hi = 40.0
    cnt, raw, rec, just = w5.certified_winding(g, co, -4.0, re_hi, -im_hi, im_hi)
    rc, rraw, rrec, rjust = w5.certified_winding(g, co, right_lo, re_hi, -im_hi, im_hi)
    roots = w5.newton_roots(g, co, re_lo=-4.0, re_hi=re_hi, im_lo=-im_hi, im_hi=im_hi, nre=int(8 * (re_hi + 4)) + 1, nim=int(4 * im_hi) + 1)
    if cnt != len(roots):
        roots2 = w5.newton_roots(g, co, re_lo=-4.0, re_hi=re_hi, im_lo=-im_hi, im_hi=im_hi, nre=int(16 * (re_hi + 4)) + 1, nim=int(8 * im_hi) + 1)
        if len(roots2) > len(roots):
            roots = roots2
    nr = len([z for z in roots if z.real > right_lo])
    dom = roots[0]
    return {"label": label, "g": g, "rectangle": [[-4.0, re_hi], [-im_hi, im_hi]], "right_strip_from": right_lo, "modulus_bound_Re>=0": Rb,
            "full_count": cnt, "full_justified": just, "newton_full": len(roots), "full_match": cnt == len(roots),
            "right_count": rc, "right_justified": rjust, "newton_right": nr, "dominant_certified": (rc == nr) and rjust,
            "dominant": [dom.real, dom.imag], "roots_right": [[z.real, z.imag] for z in roots if z.real > right_lo],
            "max_samples": max(s["samples"] for s in rec + rrec), "segments": rec + rrec}


def roots_part(which):
    gs = [4.0, 2.0, 1.0, 0.5, 0.25, 0.1]
    out = {"controls": [], "results": {}}
    # controls (cheap): no-delay count and the mode zero/known root
    cnt, _, _, just = w5.certified_winding(1.0, w5.FAM_A, -4, 4, -40, 40, delays=False)
    out["controls"].append({"name": "known: no-delay Family A g=1 counts 2 (justified)", "count": cnt, "justified": just, "pass": cnt == 2 and just})
    if which in ("rootsZ01", "rootsZ23"):
        co1 = w5.coeffs_out_of_plane(1)
        r1 = w5.newton_roots(1e-3, co1, re_lo=-0.5, re_hi=0.5, im_lo=-0.5, im_hi=0.5, nre=21, nim=21)
        neg = [z for z in r1 if abs(z.imag) < 1e-9 and z.real < -1e-6]
        out["controls"].append({"name": "known: out-of-plane m=1 h(0)=0 and real root near -(13/12)g at g=1e-3", "root": neg[0].real if neg else None,
                                "pass": abs(w5.h(0.0, 1.0, co1)) < 1e-14 and bool(neg) and abs(neg[0].real + 13 / 12 * 1e-3) < 0.02 * 13 / 12 * 1e-3})
        modes = {"rootsZ01": [0, 1], "rootsZ23": [2, 3]}[which]
        cf = w5.coeffs_out_of_plane
        tag = "z"
    else:
        co0 = w5.coeffs_in_plane(0)
        r0 = w5.newton_roots(1e-3, co0, re_lo=-0.5, re_hi=0.5, im_lo=-0.5, im_hi=0.5, nre=21, nim=21)
        pos = [z for z in r0 if abs(z.imag) < 1e-9 and z.real > 1e-6]
        out["controls"].append({"name": "known: in-plane m=0 h(0)=0 and real root near (19/12)g at g=1e-3", "root": pos[0].real if pos else None,
                                "pass": abs(w5.h(0.0, 1.0, co0)) < 1e-14 and bool(pos) and abs(pos[0].real - 19 / 12 * 1e-3) < 0.02 * 19 / 12 * 1e-3})
        modes = {"rootsP01": [0, 1], "rootsP23": [2, 3]}[which]
        cf = w5.coeffs_in_plane
        tag = "phi"
    cfull, _, _, jf = w5.certified_winding(1.0, w5.FAM_A, -4, 4, -40, 40)
    cs, _, _, js = w5.certified_winding(1.0, w5.FAM_A, -4, 0.4, -40, 40)
    out["controls"].append({"name": "negative: shifted contour Re<=0.4 (Family A, g=1) counts 2 fewer", "full": cfull, "shifted": cs, "pass": cfull - cs == 2 and jf and js})
    if not all(c["pass"] for c in out["controls"]):
        print(json.dumps(out, indent=1, default=_jd))
        print("CONTROL FAILURE", file=sys.stderr)
        sys.exit(2)
    out["controls_all_pass_before_targets"] = True
    for m in modes:
        right_lo = -0.1 if ((tag == "z" and m == 1) or (tag == "phi" and m == 0)) else -0.01
        out["results"][f"{tag} m={m}"] = [certify(g, cf(m), f"{tag} m={m}", right_lo) for g in gs]
    return out


def main():
    part = sys.argv[1]
    if part in ("census", "census1", "census2"):
        Xh, Qh = w5.hexagon()
        rng = np.random.default_rng(1)
        Xs, res = w5.solve_from_seed(Xh + 0.05 * rng.standard_normal((6, 3)), Qh)
        c1 = {"name": "known: hexagon recovered from nearby seed", "residual": res, "pass": res < 1e-12}
        rflip = np.linalg.norm(w5.tangent_residuals(Xh, np.array([1, 1, -1, -1, 1, -1])))
        c2 = {"name": "negative: hexagon positions with ++--+- not an equilibrium", "residual": rflip, "pass": rflip > 1e-3}
        out = {"controls": [c1, c2]}
        if not (c1["pass"] and c2["pass"]):
            print(json.dumps(out, indent=1, default=_jd))
            sys.exit(2)
        out["controls_all_pass_before_targets"] = True
        out["census"] = census_with_stats(half={"census": None, "census1": 1, "census2": 2}[part])
        print(json.dumps(out, indent=1, default=_jd))
    elif part == "planar":
        Q = np.array([(-1) ** k for k in range(6)])
        a0 = np.array([k * math.pi / 3 for k in range(1, 6)]) + 0.05 * np.random.default_rng(2).standard_normal(5)
        sol = least_squares(planar_residual, a0, args=(Q,), method="lm", xtol=1e-15, ftol=1e-15, gtol=1e-15)
        res = float(np.linalg.norm(planar_residual(sol.x, Q)))
        angs = np.sort(np.mod(sol.x, 2 * math.pi))
        c1 = {"name": "known: planar solver recovers the regular alternating hexagon from a perturbed seed", "residual": res,
              "angles_deg": np.degrees(angs).tolist(), "pass": res < 1e-12 and np.max(np.abs(np.degrees(angs) - np.array([60, 120, 180, 240, 300]))) < 1e-6}
        Xh, _ = w5.hexagon()
        rflip = float(np.linalg.norm(planar_residual(np.array([k * math.pi / 3 for k in range(1, 6)]), np.array([1, 1, -1, -1, 1, -1]))))
        c2 = {"name": "negative: regular hexagon angles with ++--+- have nonzero planar residual", "residual": rflip, "pass": rflip > 1e-3}
        out = {"controls": [c1, c2], "bracelets": ["".join("+" if q > 0 else "-" for q in b) for b in bracelets()]}
        if not (c1["pass"] and c2["pass"]):
            print(json.dumps(out, indent=1, default=_jd))
            sys.exit(2)
        out["controls_all_pass_before_targets"] = True
        out["planar_census"] = planar_census()
        print(json.dumps(out, indent=1, default=_jd))
    else:
        print(json.dumps(roots_part(part), indent=1, default=_jd))


if __name__ == "__main__":
    main()
