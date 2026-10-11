#!/usr/bin/env python
"""Symmetry wave-5 instrument (run with ../.venv/bin/python; numpy + scipy; foreground, < 120 s).

Part A: seeded census of stationary equilibria (tangent static field zero at every member) for
        three positrinos and three electrinos on the unit sphere. Least-squares on the 12 tangent
        residuals from random seeds (seed list recorded); solutions with any chord below 0.05 are
        rejected as singular (unlike collision), the rest are classified up to rotation and
        polarity-preserving permutation by the sorted like/unlike chord multisets, their symmetry
        group order is counted by exhaustive 3-point alignment, and isolation is tested by the
        singular values of the 12x12 tangent Jacobian (exactly three near-zero values = isolated
        up to rotation).
        Controls (before target): the alternating hexagon must be recovered from a nearby seed and
        reported with tangent residual < 1e-12; a negative control with one polarity flipped
        (polarity pattern + + - - + -) must NOT report the hexagon positions as an equilibrium;
        the six poles and the octahedral class B must evaluate to nonzero tangent residual.
Part B: characteristic roots with a JUSTIFIED argument-principle certificate. On every boundary
        sub-segment [L_j, L_{j+1}] the function satisfies |h(L) - h(L_j)| <= Lip * |L - L_j| with
        Lip = sup |h'| on the segment, bounded by
          |h'(L)| <= 2|L| + g sum_k (|b_k| + tau_k (|a_k| + |L| |b_k|)) exp(-tau_k Re L)
        evaluated with the segment's maximum |L| and minimum Re L. The spacing is refined until
        Lip * spacing < |h(L_j)| for every sample, so the image of each sub-segment lies in a disk
        around h(L_j) excluding zero; then the winding number equals the sum of principal phase
        steps. Rectangles contain the modulus bound for Re L >= 0 roots. Modes: out-of-plane
        m = 0, 1, 2, 3 (new) and re-certification of wave-4 in-plane m = 0..3 and Family A.
        Controls: no-delay Family A at g=1 counts 2; out-of-plane m=1 has h(0)=0 exactly and a
        real root near -(13/12) g at g=1e-3; negative control: a contour shifted to exclude the
        Family A dominant pair at g=1 counts 2 fewer.
"""
import cmath
import itertools
import json
import math
import sys

import numpy as np
from scipy.optimize import least_squares

S3 = math.sqrt(3.0)
TAU = (1.0, S3, 2.0)
C_HEX = 29.0 / 8.0 - 5.0 / (6.0 * S3)
A0_Z = -7.0 / 8.0 - S3 / 9.0


def _jd(o):
    if isinstance(o, (np.bool_,)):
        return bool(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.floating,)):
        return float(o)
    raise TypeError(str(type(o)))


# ============================================================ Part A: census
def static_field(X, Q):
    N = len(X)
    A = np.zeros((N, 3))
    for i in range(N):
        for j in range(N):
            if i != j:
                r = X[i] - X[j]
                A[i] += np.sign(Q[i] * Q[j]) * r / np.linalg.norm(r) ** 3
    return A


def tangent_residuals(X, Q):
    A = static_field(X, Q)
    out = []
    for i in range(len(X)):
        n = X[i] / np.linalg.norm(X[i])
        out.append(A[i] - np.dot(A[i], n) * n)
    return np.array(out)


def frames(X):
    F = []
    for x in X:
        n = x / np.linalg.norm(x)
        a = np.array([0.0, 0.0, 1.0]) if abs(n[2]) < 0.9 else np.array([1.0, 0.0, 0.0])
        e1 = np.cross(n, a)
        e1 /= np.linalg.norm(e1)
        e2 = np.cross(n, e1)
        F.append((e1, e2))
    return F


def residual_vec(params, Q):
    X = params.reshape(6, 3)
    X = X / np.linalg.norm(X, axis=1)[:, None]
    T = tangent_residuals(X, Q)
    return T.reshape(-1)


def solve_from_seed(X0, Q):
    sol = least_squares(residual_vec, X0.reshape(-1), args=(Q,), method="lm", xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=4000)
    X = sol.x.reshape(6, 3)
    X = X / np.linalg.norm(X, axis=1)[:, None]
    res = np.linalg.norm(tangent_residuals(X, Q))
    return X, res


def min_chord(X):
    return min(np.linalg.norm(X[i] - X[j]) for i in range(6) for j in range(i + 1, 6))


def invariant(X, Q):
    like, unlike = [], []
    for i in range(6):
        for j in range(i + 1, 6):
            d = np.linalg.norm(X[i] - X[j])
            (like if Q[i] == Q[j] else unlike).append(d)
    return np.round(np.array(sorted(like) + sorted(unlike)), 5)


def symmetry_order(X, Q, tol=1e-6):
    """Count orthogonal maps M (det +-1) with M X_i = X_pi(i), q_pi(i) = eps q_i.
    Frames are built from two non-parallel members (works for planar configurations too):
    P = [p0, p1perp, p0 x p1perp], Qf = [qa, qbperp, +-(qa x qbperp)], M = Qf P^T."""
    def frame(a, b, sgn):
        a = a / np.linalg.norm(a)
        bp = b - np.dot(b, a) * a
        bp /= np.linalg.norm(bp)
        return np.array([a, bp, sgn * np.cross(a, bp)]).T
    base = None
    for i in range(6):
        for j in range(6):
            if i != j and np.linalg.norm(np.cross(X[i], X[j])) > 1e-6:
                base = (i, j)
                break
        if base:
            break
    Pf = frame(X[base[0]], X[base[1]], 1)
    count = 0
    elements = []
    seen = []
    for eps in (1, -1):
        for a, b in itertools.permutations(range(6), 2):
            if Q[a] != eps * Q[base[0]] or Q[b] != eps * Q[base[1]]:
                continue
            if np.linalg.norm(np.cross(X[a], X[b])) < 1e-6:
                continue
            for sgn in (1, -1):
                M = frame(X[a], X[b], sgn) @ Pf.T
                if any(np.linalg.norm(M - S) < 1e-6 for S in seen):
                    continue
                pi = []
                ok = True
                for i in range(6):
                    y = M @ X[i]
                    m = [k for k in range(6) if np.linalg.norm(y - X[k]) < tol and Q[k] == eps * Q[i]]
                    if len(m) != 1:
                        ok = False
                        break
                    pi.append(m[0])
                if ok and len(set(pi)) == 6:
                    seen.append(M)
                    count += 1
                    elements.append({"det": int(round(np.linalg.det(M))), "swap": eps == -1, "perm": pi})
    return count, elements


def tangent_jacobian_svals(X, Q, h=1e-6):
    F = frames(X)
    J = np.zeros((12, 12))
    base = tangent_residuals(X, Q)
    for i in range(6):
        for c, e in enumerate(F[i]):
            Xp = X.copy()
            Xp[i] = X[i] + h * e
            Xp[i] /= np.linalg.norm(Xp[i])
            Xm = X.copy()
            Xm[i] = X[i] - h * e
            Xm[i] /= np.linalg.norm(Xm[i])
            Tp = tangent_residuals(Xp, Q)
            Tm = tangent_residuals(Xm, Q)
            col = []
            for k in range(6):
                dT = (Tp[k] - Tm[k]) / (2 * h)
                col += [np.dot(dT, F[k][0]), np.dot(dT, F[k][1])]
            J[:, 2 * i + c] = col
    return np.linalg.svd(J, compute_uv=False)


def hexagon():
    X = np.array([[math.cos(k * math.pi / 3), math.sin(k * math.pi / 3), 0.0] for k in range(6)])
    Q = np.array([(-1) ** k for k in range(6)])
    return X, Q


def census(seed_count=400, master_seed=20261011):
    Q = np.array([1, 1, 1, -1, -1, -1])
    rng = np.random.default_rng(master_seed)
    seeds = [int(s) for s in rng.integers(0, 2**31 - 1, size=seed_count)]
    found = []
    stats = {"seeds": seed_count, "converged": 0, "singular_rejected": 0, "nonconverged": 0}
    for sd in seeds:
        r = np.random.default_rng(sd)
        X0 = r.standard_normal((6, 3))
        X0 /= np.linalg.norm(X0, axis=1)[:, None]
        if min_chord(X0) < 0.2:
            stats["nonconverged"] += 1
            continue
        X, res = solve_from_seed(X0, Q)
        if res > 1e-9:
            stats["nonconverged"] += 1
            continue
        if min_chord(X) < 0.05:
            stats["singular_rejected"] += 1
            continue
        stats["converged"] += 1
        inv = invariant(X, Q)
        for f in found:
            if np.max(np.abs(f["invariant"] - inv)) < 1e-3:
                f["hits"] += 1
                break
        else:
            order, elems = symmetry_order(X, Q)
            sv = tangent_jacobian_svals(X, Q)
            nzero = int(np.sum(sv < 1e-6))
            found.append({"invariant": inv, "hits": 1, "seed": sd, "positions": X.tolist(), "polarities": Q.tolist(),
                          "residual": res, "min_chord": min_chord(X), "symmetry_order": order, "elements": elems[:48],
                          "jacobian_svals": sv.tolist(), "near_zero_svals": nzero, "isolated_up_to_rotation": nzero == 3,
                          "like_chords": sorted(inv[:6].tolist()), "unlike_chords": sorted(inv[6:].tolist())})
    for f in found:
        f["invariant"] = f["invariant"].tolist()
    return seeds, found, stats


# ============================================================ Part B: certified roots
def coeffs_out_of_plane(m):
    return {"a0": A0_Z, "a": (2 * math.cos(m * math.pi / 3), -2 / (3 * S3) * math.cos(2 * m * math.pi / 3), math.cos(m * math.pi) / 8), "b": (0.0, 0.0, 0.0)}


def coeffs_in_plane(m):
    c1, c2, c3 = math.cos(m * math.pi / 3), math.cos(2 * m * math.pi / 3), math.cos(m * math.pi)
    return {"a0": C_HEX, "a": (-3.5 * c1, (5.0 / (6.0 * S3)) * c2, -0.125 * c3), "b": (-1.5 * c1, c2 / 6.0, 0.0)}


FAM_A = coeffs_out_of_plane(3)


def h(L, g, co, delays=True):
    br = co["a0"]
    for a, b, tau in zip(co["a"], co["b"], TAU):
        br += (a + (L * b if delays else 0.0)) * (cmath.exp(-L * tau) if delays else 1.0)
    return L * L - g * br


def dh(L, g, co, delays=True):
    d = 2 * L
    if delays:
        for a, b, tau in zip(co["a"], co["b"], TAU):
            e = cmath.exp(-L * tau)
            d -= g * (b * e - tau * (a + L * b) * e)
    return d


def lip_bound(g, co, Lmax_abs, re_min, delays=True):
    val = 2 * Lmax_abs
    if delays:
        for a, b, tau in zip(co["a"], co["b"], TAU):
            val += g * (abs(b) + tau * (abs(a) + Lmax_abs * abs(b))) * math.exp(-tau * re_min)
    else:
        val += 0.0
    return val


def certified_winding(g, co, re_lo, re_hi, im_lo, im_hi, delays=True, n0=2000):
    corners = [complex(re_lo, im_lo), complex(re_hi, im_lo), complex(re_hi, im_hi), complex(re_lo, im_hi), complex(re_lo, im_lo)]
    total = 0.0
    record = []
    for A, B in zip(corners[:-1], corners[1:]):
        Lmax = max(abs(A), abs(B))
        remin = min(A.real, B.real)
        Lip = lip_bound(g, co, Lmax, remin, delays)
        n = n0
        while True:
            ts = np.linspace(0, 1, n + 1)
            pts = [A + (B - A) * t for t in ts]
            vals = [h(p, g, co, delays) for p in pts]
            spacing = abs(B - A) / n
            minabs = min(abs(v) for v in vals)
            if Lip * spacing < minabs or n > 600_000:
                break
            n *= 4
        justified = Lip * spacing < minabs
        phases = np.unwrap([cmath.phase(v) for v in vals])
        total += phases[-1] - phases[0]
        record.append({"segment": [[A.real, A.imag], [B.real, B.imag]], "Lip": Lip, "samples": n, "spacing": spacing,
                       "min_abs_h": minabs, "justified": justified})
    return int(round(total / (2 * math.pi))), total / (2 * math.pi), record, all(r["justified"] for r in record)


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
            if ok and abs(h(L, g, co, delays)) < 1e-11 and re_lo < L.real < re_hi and im_lo < L.imag < im_hi:
                if not any(abs(L - r) < 1e-7 for r in roots):
                    roots.append(L)
    roots.sort(key=lambda z: -z.real)
    return roots


def modulus_bound(g, co):
    A_ = abs(co["a0"]) + sum(abs(a) for a in co["a"])
    B_ = sum(abs(b) for b in co["b"])
    return (g * B_ + math.sqrt(g * g * B_ * B_ + 4 * g * A_)) / 2


def certify_mode(g, co, label):
    Rb = modulus_bound(g, co)
    re_hi = max(4.0, math.ceil(Rb) + 1.0)
    im_hi = max(40.0, math.ceil(Rb) + 1.0)
    cnt, raw, rec, just = certified_winding(g, co, -4.0, re_hi, -im_hi, im_hi)
    rc, rraw, rrec, rjust = certified_winding(g, co, -0.01, re_hi, -im_hi, im_hi)
    roots = newton_roots(g, co, re_lo=-4.0, re_hi=re_hi, im_lo=-im_hi, im_hi=im_hi, nre=int(8 * (re_hi + 4)) + 1, nim=int(4 * im_hi) + 1)
    nr = len([z for z in roots if z.real > -0.01])
    if cnt != len(roots):
        roots2 = newton_roots(g, co, re_lo=-4.0, re_hi=re_hi, im_lo=-im_hi, im_hi=im_hi, nre=int(16 * (re_hi + 4)) + 1, nim=int(8 * im_hi) + 1)
        if len(roots2) > len(roots):
            roots = roots2
            nr = len([z for z in roots if z.real > -0.01])
    dom = roots[0]
    return {"label": label, "g": g, "rectangle": [[-4.0, re_hi], [-im_hi, im_hi]], "modulus_bound_Re>=0": Rb,
            "full_count": cnt, "full_count_justified": just, "newton_full": len(roots), "full_match": cnt == len(roots),
            "right_count_Re>-0.01": rc, "right_justified": rjust, "newton_right": nr, "dominant_certified": (rc == nr) and rjust,
            "dominant": [dom.real, dom.imag], "roots_Re>-0.01": [[z.real, z.imag] for z in roots if z.real > -0.01],
            "segment_records": rec}


def main():
    out = {"controls": [], "part_A": {}, "part_B": {}}
    # ---- Part A controls
    Xh, Qh = hexagon()
    rng = np.random.default_rng(1)
    X0 = Xh + 0.05 * rng.standard_normal((6, 3))
    Xs, res = solve_from_seed(X0, Qh)
    inv_h = invariant(Xh, Qh)
    out["controls"].append({"name": "known: alternating hexagon recovered from a nearby seed (perturbation 0.05)", "residual": res,
                            "invariant_match": bool(np.max(np.abs(invariant(Xs, Qh) - inv_h)) < 1e-4), "pass": res < 1e-12 and np.max(np.abs(invariant(Xs, Qh) - inv_h)) < 1e-4})
    Qflip = np.array([1, 1, -1, -1, 1, -1])  # + + - - + -
    rflip = np.linalg.norm(tangent_residuals(Xh, Qflip))
    out["controls"].append({"name": "negative: hexagon positions with polarities + + - - + - are not an equilibrium", "residual": rflip, "pass": rflip > 1e-3})
    E = np.eye(3)
    X6 = np.array([E[0], E[1], E[2], -E[0], -E[1], -E[2]])
    Q6 = np.array([1, 1, 1, -1, -1, -1])
    XB = np.array([E[0], -E[0], E[1], -E[1], E[2], -E[2]])
    out["controls"].append({"name": "known: six poles and octahedral class B have nonzero tangent residual", "six_poles": float(np.linalg.norm(tangent_residuals(X6, Q6))),
                            "class_B": float(np.linalg.norm(tangent_residuals(XB, Q6))), "pass": np.linalg.norm(tangent_residuals(X6, Q6)) > 1 and np.linalg.norm(tangent_residuals(XB, Q6)) > 1})
    order_h, _ = symmetry_order(Xh, Qh)
    sv_h = tangent_jacobian_svals(Xh, Qh)
    out["controls"].append({"name": "known: hexagon symmetry order 24 and exactly three near-zero tangent-Jacobian singular values", "order": order_h,
                            "svals": sv_h.tolist(), "near_zero": int(np.sum(sv_h < 1e-6)), "pass": order_h == 24 and int(np.sum(sv_h < 1e-6)) == 3})
    # ---- Part B controls
    cnt, raw, rec, just = certified_winding(1.0, FAM_A, -4, 4, -40, 40, delays=False)
    out["controls"].append({"name": "known: no-delay Family A at g=1 counts exactly 2 with justified segments", "count": cnt, "justified": just, "pass": cnt == 2 and just})
    co1 = coeffs_out_of_plane(1)
    r1 = newton_roots(1e-3, co1, re_lo=-0.5, re_hi=0.5, im_lo=-0.5, im_hi=0.5, nre=21, nim=21)
    neg = [z for z in r1 if abs(z.imag) < 1e-9 and z.real < -1e-6]
    out["controls"].append({"name": "known: out-of-plane m=1 has h(0)=0 and a real root near -(13/12) g at g=1e-3", "h0": abs(h(0.0, 1.0, co1)),
                            "root": neg[0].real if neg else None, "predicted": -13.0 / 12.0 * 1e-3,
                            "pass": abs(h(0.0, 1.0, co1)) < 1e-14 and bool(neg) and abs(neg[0].real + 13.0 / 12.0 * 1e-3) < 0.02 * 13.0 / 12.0 * 1e-3})
    cf, _, _, jf = certified_winding(1.0, FAM_A, -4, 4, -40, 40)
    cs, _, _, js = certified_winding(1.0, FAM_A, -4, 0.4, -40, 40)
    out["controls"].append({"name": "negative: contour shifted to Re<=0.4 (Family A, g=1) counts 2 fewer", "full": cf, "shifted": cs, "justified": jf and js, "pass": cf - cs == 2 and jf and js})
    if not all(c["pass"] for c in out["controls"]):
        print(json.dumps(out, indent=1, default=_jd))
        print("CONTROL FAILURE", file=sys.stderr)
        sys.exit(2)
    out["controls_all_pass_before_targets"] = True

    # ---- Part A target
    seeds, found, stats = census()
    out["part_A"] = {"master_seed": 20261011, "seed_list": seeds, "stats": stats,
                     "distinct_equilibria": [{k: v for k, v in f.items() if k != "elements"} | {"n_elements_listed": len(f["elements"])} for f in found]}
    # ---- Part B targets
    gs = [4.0, 2.0, 1.0, 0.5, 0.25, 0.1]
    B = {}
    for m in range(4):
        B[f"out_of_plane_m={m}"] = [certify_mode(g, coeffs_out_of_plane(m), f"z m={m}") for g in gs]
    for m in range(4):
        B[f"in_plane_m={m}_recertified"] = [certify_mode(g, coeffs_in_plane(m), f"phi m={m}") for g in gs]
    out["part_B"] = B
    print(json.dumps(out, indent=1, default=_jd))


if __name__ == "__main__":
    main()
