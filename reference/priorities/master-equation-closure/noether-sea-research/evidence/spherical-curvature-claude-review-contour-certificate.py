#!/usr/bin/env python
"""Review-role contour certificate for the twelve D6 block characteristic functions of the linearized delayed dynamics
about the stationary alternating hexagon (R = c_f = 1, coupling g).  Independent of every subject instrument.

Block functions (review hexspectrum reference, coefficients recomputed from the geometry):
  h_k^t(L) = L^2 - g D_t + g sum_m w^{km} e^{-L tau_m} (c_m - L n_m),   h_k^z(L) = L^2 - g D_z + g sum_m w^{km} e^{-L tau_m} z_m,
  w = e^{i pi/3}, c_m = sigma_m c^M_m, n_m = sigma_m c^N_m, z_m = sigma_m r_m^{-3}.
Certificate: along each boundary segment of a rectangle, |h'(L)| <= M_seg (explicit bound from |L| <= Lmax and Re L >= xmin on the
segment).  Samples L_j with spacing d satisfy the certified-step condition  d * M_seg < 0.9 * min(|h(L_j)|, |h(L_{j+1})|).  Then on the
whole sub-segment |h(L) - h(L_j)| <= d M_seg < |h(L_j)|, so h stays in a disk excluding 0 and its argument moves by less than pi/2
relative to h(L_j): the principal-value increment between consecutive samples is the true increment, and the winding number is the
exact sum.  Rounding: binary64 evaluation; the 10 % margin dominates rounding by many orders.  Adaptive refinement halves failing
sub-segments (up to 14 rounds); any sub-segment still failing (e.g. |h| tiny: a root on the contour) makes the block UNCERTIFIED.
Controls before targets: K1 no-delay t and z blocks (polynomials) with known root counts; N1 a contour shifted to exclude the known
(k=3,t) root at g=1 counts exactly one fewer than the full rectangle; N2 refinement disabled with coarse sampling must be refused.
Targets: certified counts on the right strip Re in [-0.01, 10], Im in [-10, 10] (contains every root with Re >= 0 by the outside
bound) for all 12 blocks at g in {4, 2, 1, 1/2, 1/4, 1/10}, compared with Newton roots found in the strip.  Foreground, numpy, single thread.
"""
import json, os, sys, time
import numpy as np

OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d, default=str)[:300])

# ---------------- geometry and coefficients (recomputed) ----------------
phi = np.array([m * np.pi / 3 for m in range(6)])
U = np.stack([np.cos(phi), np.sin(phi), np.zeros(6)], 1); T = np.stack([-np.sin(phi), np.cos(phi), np.zeros(6)], 1); Z = np.array([0.0, 0.0, 1.0])
sig = np.array([(-1) ** m for m in range(6)], float)
a0 = sum(sig[m] * U[0] @ (U[0] - U[m]) / np.linalg.norm(U[0] - U[m]) ** 3 for m in range(1, 6))
tau = np.zeros(6); c = np.zeros(6); n = np.zeros(6); z = np.zeros(6); Dt = -a0; Dz = -a0
for m in range(1, 6):
    r = U[0] - U[m]; rn = np.linalg.norm(r); rh = r / rn; tau[m] = rn
    Kf = lambda a, b: (a @ b - 3 * (rh @ a) * (rh @ b)) / rn ** 3
    c[m] = sig[m] * Kf(T[0], T[m]); n[m] = sig[m] * (rh @ T[0]) * (rh @ T[m]) / rn ** 2; z[m] = sig[m] * Kf(Z, Z)
    Dt += sig[m] * Kf(T[0], T[0]); Dz += sig[m] * Kf(Z, Z)
w = np.exp(1j * np.pi / 3)

def coeffs(k, pol, delays=True):
    """Return (D, list of (tau, A_m, B_m)) with h(L) = L^2 - g D + g sum (A_m - L B_m) e^{-L tau}."""
    if pol == "t":
        return Dt, [(tau[m] if delays else 0.0, w ** (k * m) * c[m], w ** (k * m) * n[m]) for m in range(1, 6)]
    return Dz, [(tau[m] if delays else 0.0, w ** (k * m) * z[m], 0.0) for m in range(1, 6)]

def h_eval(L, g, D, terms):
    s = np.zeros_like(L, dtype=complex)
    for t_, A_, B_ in terms:
        s += (A_ - L * B_) * np.exp(-L * t_)
    return L * L - g * D + g * s

def dh_eval(L, g, D, terms):
    s = np.zeros_like(L, dtype=complex)
    for t_, A_, B_ in terms:
        s += (-t_ * (A_ - L * B_) - B_) * np.exp(-L * t_)
    return 2 * L + g * s

def M_bound(xmin, Lmax, g, terms):
    """|h'(L)| <= 2 Lmax + g sum e^{-xmin tau} [tau (|A| + Lmax |B|) + |B|]  for Re L >= xmin, |L| <= Lmax."""
    return 2 * Lmax + g * sum(np.exp(-xmin * t_) * (t_ * (abs(A_) + Lmax * abs(B_)) + abs(B_)) for t_, A_, B_ in terms)

def certified_winding(g, D, terms, rect, n0_per_unit=40, max_rounds=14, allow_refine=True):
    """Exact winding number of h around the rectangle rect = (x0, x1, y0, y1), or None if uncertified."""
    x0, x1, y0, y1 = rect
    corners = [complex(x0, y0), complex(x1, y0), complex(x1, y1), complex(x0, y1), complex(x0, y0)]  # counterclockwise
    total = 0.0; worst = 0.0; nsamples = 0; uncert = []
    for e in range(4):
        a, b = corners[e], corners[e + 1]; length = abs(b - a); unit = (b - a) / length
        # split the edge into pieces of length <= 1 so that the derivative bound uses the piece's own xmin and Lmax
        npieces = int(np.ceil(length)); edges = np.linspace(0, length, npieces + 1)
        for p in range(npieces):
            s0, s1 = edges[p], edges[p + 1]
            pa, pb = a + unit * s0, a + unit * s1
            xmin = min(pa.real, pb.real); Lmax = max(abs(pa), abs(pb))
            M = M_bound(xmin, Lmax, g, terms)
            nseg = max(2, int(np.ceil((s1 - s0) * n0_per_unit)) + 1)
            s = np.linspace(s0, s1, nseg)
            for rnd in range(max_rounds + 1):
                L = a + unit * s; hv = h_eval(L, g, D, terms); ah = np.abs(hv)
                d = np.diff(s); ok = d * M < 0.9 * np.minimum(ah[:-1], ah[1:])
                if ok.all(): break
                if not allow_refine or rnd == max_rounds:
                    uncert.append({"edge": e, "piece": p, "failing": int((~ok).sum()), "min_abs_h": float(ah.min())}); break
                bad = np.where(~ok)[0]; mids = 0.5 * (s[bad] + s[bad + 1]); s = np.sort(np.concatenate([s, mids]))
            inc = np.angle(hv[1:] / hv[:-1])  # principal values, each certified < pi/2 in modulus when ok
            total += inc.sum(); nsamples += len(s); worst = max(worst, float(np.abs(inc).max()) if len(inc) else 0.0)
    if uncert:
        return None, {"uncertified_pieces": uncert, "samples": nsamples}
    wn = total / (2 * np.pi)
    return int(round(wn)), {"raw_winding": float(wn), "samples": nsamples, "max_abs_step": worst}

def newton_roots(g, D, terms, rect, nre=29, nim=41):
    x0, x1, y0, y1 = rect; roots = []
    for re in np.linspace(x0, x1, nre):
        for im in np.linspace(y0, y1, nim):
            L = complex(re, im)
            for _ in range(80):
                hv = h_eval(np.array([L]), g, D, terms)[0]; dv = dh_eval(np.array([L]), g, D, terms)[0]
                if dv == 0 or not np.isfinite(dv): break
                step = hv / dv; L -= step
                if abs(step) < 1e-15 or abs(L) > 1e3 or not np.isfinite(L): break
            if abs(h_eval(np.array([L]), g, D, terms)[0]) < 1e-11 and x0 <= L.real <= x1 and y0 <= L.imag <= y1:
                if not any(abs(L - r) < 1e-8 for r in roots): roots.append(L)
    return sorted(roots, key=lambda q: -q.real)

RECT = (-0.01, 10.0, -10.0, 10.0)
FULL = (-4.0, 10.0, -10.0, 10.0)
t0 = time.time()
# ---------------- controls ----------------
# K1: no-delay blocks are quadratics L^2 - gD + g sum(A_m - L B_m); known root count inside FULL from the quadratic formula.
k1 = {}
okK1 = True
for k, pol in [(3, "t"), (3, "z"), (0, "t"), (2, "z")]:
    D, terms = coeffs(k, pol, delays=False)
    A = sum(A_ for _, A_, _ in terms); B = sum(B_ for _, _, B_ in terms)
    # h = L^2 - g B L - g (D - A)
    rts = np.roots([1.0, -1.0 * B, -(D - A)]) if True else None  # g = 1
    expected = sum(1 for r in rts if FULL[0] <= r.real <= FULL[1] and FULL[2] <= r.imag <= FULL[3])
    wn, info = certified_winding(1.0, D, terms, FULL)
    k1[f"{k}{pol}"] = {"quadratic_roots": [str(r) for r in rts], "expected_inside": expected, "certified": wn, "info": info}
    okK1 = okK1 and (wn == expected)
rec("control_K1_no_delay_quadratics", {"blocks": k1, "pass": bool(okK1)})
if not okK1: sys.exit("K1 failed")
# N1: (k=3,t) at g=1: full rectangle vs a rectangle excluding the known root near 2.0109.
D, terms = coeffs(3, "t")
wn_full, inf_full = certified_winding(1.0, D, terms, FULL)
wn_shift, inf_shift = certified_winding(1.0, D, terms, (-4.0, 1.9, -10.0, 10.0))
okN1 = (wn_full is not None) and (wn_shift is not None) and (wn_full - wn_shift == 1)
rec("control_N1_shifted_contour_excludes_known_root", {"full": wn_full, "shifted_Re_le_1.9": wn_shift, "pass": bool(okN1)})
if not okN1: sys.exit("N1 failed")
# N2: refinement disabled with coarse sampling must be refused (uncertified), not silently counted.
wn_c, inf_c = certified_winding(4.0, D, terms, FULL, n0_per_unit=2, allow_refine=False)
rec("control_N2_coarse_sampling_refused", {"result": wn_c, "pass": bool(wn_c is None)})
if wn_c is not None: sys.exit("N2 failed")
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "elapsed_s": time.time() - t0})
# ---------------- targets ----------------
res = {}
for gv in (4.0, 2.0, 1.0, 0.5, 0.25, 0.1):
    row = {}
    A_t = sum(abs(c[m]) for m in range(1, 6)); B_t = sum(abs(n[m]) for m in range(1, 6)); A_z = sum(abs(z[m]) for m in range(1, 6))
    bound_t = (gv * B_t + np.sqrt(gv * gv * B_t * B_t + 4 * gv * (abs(Dt) + A_t))) / 2; bound_z = np.sqrt(gv * (abs(Dz) + A_z))
    for k in range(6):
        for pol in "tz":
            D, terms = coeffs(k, pol)
            wn, info = certified_winding(gv, D, terms, RECT)
            rts = newton_roots(gv, D, terms, RECT)
            imag = [str(r) for r in rts if abs(r.real) < 1e-9 and abs(r.imag) > 1e-9]
            row[f"{k}{pol}"] = {"certified_count": wn, "newton_count": len(rts), "complete": (wn is not None and wn == len(rts)),
                                "roots": [f"{r.real:.6f}{r.imag:+.6f}i" for r in rts], "purely_imaginary": imag, "info": info}
    row["_outside_bound"] = {"t": float(bound_t), "z": float(bound_z), "inside_rect": bool(max(bound_t, bound_z) <= 10.0)}
    row["_all_complete"] = all(v["complete"] for kk, v in row.items() if not kk.startswith("_"))
    best = None
    for k in range(6):
        for pol in "tz":
            D, terms = coeffs(k, pol)
            for r in newton_roots(gv, D, terms, RECT):
                if best is None or r.real > best[1].real: best = (f"{k}{pol}", r)
    dom = (best[0], f"{best[1].real:.6f}{best[1].imag:+.6f}i") if best else None
    row["_dominant"] = dom
    res[str(gv)] = row
    print(gv, "all complete", row["_all_complete"], "bound", row["_outside_bound"], "dominant", dom, "elapsed", round(time.time() - t0, 1))
rec("target_right_strip_certified_counts", res)
OUT["_elapsed_s"] = time.time() - t0; OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
json.dump(OUT, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "spherical-curvature-claude-review-contour-certificate-output.json"), "w"), indent=1, default=str)
print("elapsed", OUT["_elapsed_s"])
