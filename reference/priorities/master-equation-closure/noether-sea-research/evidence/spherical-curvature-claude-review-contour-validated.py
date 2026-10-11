#!/usr/bin/env python
"""Review-role VALIDATED contour certificate and root isolation for the twelve hexagon block functions (R = c_f = 1).
Supersedes the binary64 certificate's unrecorded slack with explicit a-priori error enclosures and Kantorovich disks.

Error model (binary64, unit roundoff eps = 2^-53). For h(L) = L^2 - gD + g sum_m (A_m - L B_m) e^{-L tau_m}:
  every evaluated quantity is a sum of at most 7 terms each produced by at most 8 floating operations from inputs whose own
  relative error (trig/sqrt coefficients, exp) is at most 4 eps; so |h_eval - h| <= E_h := 64 eps * S(L), with
  S(L) = |L|^2 + g|D| + g sum_m e^{-tau_m Re L} (|A_m| + |L||B_m|)  (sum of term magnitudes, evaluated with +1% outward factor).
  The sample coordinate error (linspace) is <= 4 eps |L| and contributes <= M * 4 eps |L| to h; it is added to E_h.
  The derivative bound M on a piece is computed in binary64 and used with a +1% outward factor; M_out = 1.01 M.
Certified step: d * M_out < 0.9 * (min(|h_j|, |h_{j+1}|) - E_h); then the true h stays in a zero-free disk on the sub-segment
and the principal increment is exact.  Each increment is computed in binary64 with error <= 8 eps; the summed winding error is
<= 8 eps * (number of samples), and the count is accepted only if |raw - round(raw)| + that error < 0.25.
Recorded per block and g: minimum clearance ratio (min|h| on the contour) / E_h, and the integer margin.
Root isolation (Kantorovich, scalar analytic): at a Newton root z0 with beta = |h(z0)/h'(z0)| (outward: numerator + E_h,
denominator - E_h'), and M2 >= sup |h''| on the disk D(z0, Rd), Rd = 0.2:  M2 = 2 + g sum e^{-tau (Re z0 - Rd)} [tau^2 (|A| + (|z0|+Rd)|B|) + 2 tau |B|];
if t = beta * M2 / |h'(z0)| <= 1/2, h has exactly one zero in D(z0, r*), r* = (1 - sqrt(1 - 2t)) |h'(z0)| / M2, it is simple, and it is the only
zero in D(z0, r**) with r** = min(Rd, (1 + sqrt(1 - 2t)) |h'(z0)| / M2).  Separation from the imaginary axis: Re z0 - r* > 0 (growing) or the root
is the exact rigid-rotation zero (h(0) = 0 identically, derived); disks of distinct roots must be disjoint (r* radii) for the count to be a count of
distinct simple zeros.  Controls before targets: K1 no-delay quadratics (known roots, counts and disks); N1 shifted contour excludes a known root;
N2 coarse sampling refused; N3 the Kantorovich test must fail at a non-root point.  Foreground, numpy, single thread.
"""
import json, os, sys, time
import numpy as np
EPS = 2.0 ** -53
OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d, default=str)[:300])

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
    if pol == "t": return Dt, [(tau[m] if delays else 0.0, w ** (k * m) * c[m], w ** (k * m) * n[m]) for m in range(1, 6)]
    return Dz, [(tau[m] if delays else 0.0, w ** (k * m) * z[m], 0.0) for m in range(1, 6)]
def h_eval(L, g, D, terms):
    s = np.zeros_like(L, dtype=complex)
    for t_, A_, B_ in terms: s += (A_ - L * B_) * np.exp(-L * t_)
    return L * L - g * D + g * s
def dh_eval(L, g, D, terms):
    s = np.zeros_like(L, dtype=complex)
    for t_, A_, B_ in terms: s += (-t_ * (A_ - L * B_) - B_) * np.exp(-L * t_)
    return 2 * L + g * s
def S_mag(L, g, D, terms):  # sum of term magnitudes (outward +1%)
    s = np.abs(L) ** 2 + g * abs(D)
    for t_, A_, B_ in terms: s = s + g * np.exp(-t_ * L.real) * (abs(A_) + np.abs(L) * abs(B_))
    return 1.01 * s
def M_bound(xmin, Lmax, g, terms):
    return 1.01 * (2 * Lmax + g * sum(np.exp(-xmin * t_) * (t_ * (abs(A_) + Lmax * abs(B_)) + abs(B_)) for t_, A_, B_ in terms))
def M2_bound(x0, R, g, terms):  # sup |h''| on D(z0, Rd) with Re >= x0.real - Rd, |L| <= |z0| + Rd
    xmin = x0.real - R; Lmax = abs(x0) + R
    return 1.01 * (2 + g * sum(np.exp(-xmin * t_) * (t_ * t_ * (abs(A_) + Lmax * abs(B_)) + 2 * t_ * abs(B_)) for t_, A_, B_ in terms))

def certified_winding(g, D, terms, rect, n0_per_unit=40, max_rounds=14, allow_refine=True):
    x0, x1, y0, y1 = rect
    corners = [complex(x0, y0), complex(x1, y0), complex(x1, y1), complex(x0, y1), complex(x0, y0)]
    total = 0.0; nsamples = 0; uncert = []; min_clear = np.inf; min_abs_h = np.inf
    for e in range(4):
        a, b = corners[e], corners[e + 1]; length = abs(b - a); unit = (b - a) / length
        npieces = int(np.ceil(length)); edges = np.linspace(0, length, npieces + 1)
        for p in range(npieces):
            s0, s1 = edges[p], edges[p + 1]; pa, pb = a + unit * s0, a + unit * s1
            xmin = min(pa.real, pb.real); Lmax = max(abs(pa), abs(pb)); M = M_bound(xmin, Lmax, g, terms)
            s = np.linspace(s0, s1, max(2, int(np.ceil((s1 - s0) * n0_per_unit)) + 1))
            for rnd in range(max_rounds + 1):
                L = a + unit * s; hv = h_eval(L, g, D, terms); ah = np.abs(hv)
                Eh = 64 * EPS * S_mag(L, g, D, terms) + M * 4 * EPS * np.abs(L)   # evaluation + coordinate error, outward
                clear = np.minimum(ah[:-1] - Eh[:-1], ah[1:] - Eh[1:])
                d = np.diff(s); ok = (d * M < 0.9 * clear) & (clear > 0)
                if ok.all(): break
                if not allow_refine or rnd == max_rounds:
                    uncert.append({"edge": e, "piece": p, "failing": int((~ok).sum()), "min_abs_h": float(ah.min())}); break
                bad = np.where(~ok)[0]; mids = 0.5 * (s[bad] + s[bad + 1]); s = np.sort(np.concatenate([s, mids]))
            inc = np.angle(hv[1:] / hv[:-1]); total += inc.sum(); nsamples += len(s)
            min_clear = min(min_clear, float((ah / Eh).min())); min_abs_h = min(min_abs_h, float(ah.min()))
    if uncert: return None, {"uncertified_pieces": uncert, "samples": nsamples}
    wn = total / (2 * np.pi); werr = 8 * EPS * nsamples / (2 * np.pi); margin = abs(wn - round(wn)) + werr
    if margin >= 0.25: return None, {"integer_margin_failed": margin, "samples": nsamples}
    return int(round(wn)), {"raw_winding": float(wn), "samples": nsamples, "integer_margin": float(margin), "min_clearance_ratio": min_clear, "min_abs_h_on_contour": min_abs_h}

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

def kantorovich(z0, g, D, terms, Rd=0.2):
    """Validated disk about z0: returns (ok, r_star, r_dstar, t, details)."""
    L = np.array([z0]); hv = h_eval(L, g, D, terms)[0]; dv = dh_eval(L, g, D, terms)[0]
    Eh = 64 * EPS * S_mag(L, g, D, terms)[0]; Edh = 64 * EPS * (2 * abs(z0) + g * sum(np.exp(-t_ * z0.real) * (t_ * (abs(A_) + abs(z0) * abs(B_)) + abs(B_)) for t_, A_, B_ in terms)) * 1.01
    hp = abs(dv) - Edh
    if hp <= 0: return False, None, None, None, {"reason": "derivative not bounded away from zero"}
    beta = (abs(hv) + Eh) / hp; M2 = M2_bound(z0, Rd, g, terms); t = beta * M2 / hp
    if t > 0.5: return False, None, None, t, {"beta": beta, "M2": M2}
    rs = (1 - np.sqrt(1 - 2 * t)) * hp / M2; rd = min(Rd, (1 + np.sqrt(1 - 2 * t)) * hp / M2)
    if rs > Rd: return False, float(rs), None, float(t), {"reason": "r_star exceeds the disk radius on which M2 is valid (first run at 01:12:07 UTC lacked this check and control N3 caught it)"}
    return True, float(rs), float(rd), float(t), {"beta": float(beta), "M2": float(M2), "abs_hprime": float(hp)}

RECT = (-0.01, 10.0, -10.0, 10.0); FULL = (-4.0, 10.0, -10.0, 10.0)
t0 = time.time()
# ---------------- controls ----------------
k1 = {}; okK1 = True
for k, pol in [(3, "t"), (3, "z"), (0, "t"), (2, "z")]:
    D, terms = coeffs(k, pol, delays=False)
    A = sum(A_ for _, A_, _ in terms); B = sum(B_ for _, _, B_ in terms)
    rts = np.roots([1.0, -B, -(D - A)]); expected = sum(1 for r in rts if FULL[0] <= r.real <= FULL[1] and FULL[2] <= r.imag <= FULL[3])
    wn, info = certified_winding(1.0, D, terms, FULL)
    disks = [kantorovich(complex(r), 1.0, D, terms) for r in rts]
    k1[f"{k}{pol}"] = {"expected_inside": expected, "certified": wn, "min_clearance_ratio": info.get("min_clearance_ratio"), "disks_ok": all(dk[0] for dk in disks), "r_star": [dk[1] for dk in disks]}
    okK1 = okK1 and (wn == expected) and all(dk[0] for dk in disks)
rec("control_K1_no_delay_quadratics_with_disks", {"blocks": k1, "pass": bool(okK1)})
if not okK1: sys.exit("K1 failed")
D, terms = coeffs(3, "t")
wn_full, _ = certified_winding(1.0, D, terms, FULL); wn_shift, _ = certified_winding(1.0, D, terms, (-4.0, 1.9, -10.0, 10.0))
okN1 = wn_full is not None and wn_shift is not None and wn_full - wn_shift == 1
rec("control_N1_shifted_contour", {"full": wn_full, "shifted": wn_shift, "pass": bool(okN1)})
if not okN1: sys.exit("N1 failed")
wn_c, _ = certified_winding(4.0, D, terms, FULL, n0_per_unit=2, allow_refine=False)
rec("control_N2_coarse_refused", {"result": wn_c, "pass": bool(wn_c is None)})
if wn_c is not None: sys.exit("N2 failed")
root = newton_roots(1.0, D, terms, RECT)[0]
okr, rs, rd, tt, det = kantorovich(root, 1.0, D, terms); okn, _, _, tn, _ = kantorovich(root + 0.3, 1.0, D, terms)
rec("control_N3_kantorovich_fails_off_root", {"at_root": {"ok": okr, "r_star": rs, "r_dstar": rd, "t": tt}, "off_root_t": tn, "off_root_ok": okn, "pass": bool(okr and not okn)})
if not (okr and not okn): sys.exit("N3 failed")
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "elapsed_s": time.time() - t0})
# ---------------- targets ----------------
res = {}
for gv in (4.0, 2.0, 1.0, 0.5, 0.25, 0.1):
    row = {}; allok = True; best = None; imag_sep = True
    for k in range(6):
        for pol in "tz":
            D, terms = coeffs(k, pol)
            wn, info = certified_winding(gv, D, terms, RECT)
            rts = newton_roots(gv, D, terms, RECT)
            disks = []
            for r in rts:
                ok, rs, rd, tt, det = kantorovich(r, gv, D, terms)
                exact_zero = abs(r) < 1e-9 and (k, pol) in [(0, "t"), (1, "z"), (5, "z")]
                sep = (r.real - (rs or 0) > 0) if not exact_zero else True
                disks.append({"root": f"{r.real:.9f}{r.imag:+.9f}i", "validated": bool(ok), "r_star": rs, "r_dstar": rd, "t": tt, "exact_rigid_zero": exact_zero, "separated_from_imag_axis": bool(sep)})
                imag_sep = imag_sep and sep
            disjoint = all(abs(rts[i] - rts[j]) > (disks[i]["r_star"] or 0) + (disks[j]["r_star"] or 0) for i in range(len(rts)) for j in range(i + 1, len(rts)))
            complete = (wn is not None) and (wn == len(rts)) and all(dk["validated"] for dk in disks) and disjoint
            row[f"{k}{pol}"] = {"certified_count": wn, "validated_roots": len(rts), "complete_and_simple": bool(complete), "disjoint": bool(disjoint), "min_clearance_ratio": info.get("min_clearance_ratio"), "integer_margin": info.get("integer_margin"), "disks": disks}
            allok = allok and complete
            for r in rts:
                if best is None or r.real > best[1].real: best = (f"{k}{pol}", r)
    row["_all_complete_and_simple"] = bool(allok); row["_all_growing_roots_separated_from_imag_axis"] = bool(imag_sep)
    row["_dominant"] = (best[0], f"{best[1].real:.9f}{best[1].imag:+.9f}i") if best else None
    row["_min_clearance_ratio_over_blocks"] = min(v["min_clearance_ratio"] for kk, v in row.items() if not kk.startswith("_") and v["min_clearance_ratio"] is not None)
    res[str(gv)] = row
    print(gv, "complete+simple", allok, "sep", imag_sep, "dominant", row["_dominant"], "min clearance", row["_min_clearance_ratio_over_blocks"], "elapsed", round(time.time() - t0, 1))
rec("target_validated_right_strip", res)
OUT["_elapsed_s"] = time.time() - t0; OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
json.dump(OUT, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "spherical-curvature-claude-review-contour-validated-output.json"), "w"), indent=1, default=str)
print("elapsed", OUT["_elapsed_s"])
