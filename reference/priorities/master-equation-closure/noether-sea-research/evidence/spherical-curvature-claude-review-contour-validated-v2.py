#!/usr/bin/env python
"""Review-role validated certificate, revision 2 (first run at 01:36:07 UTC raised ComplexResult from squaring a zero-straddling interval, repaired with a sign-aware square; second run at 01:36:26 UTC failed converting interval endpoints, repaired by explicit mp.mpf conversion of endpoints; both recorded) (repairs Codex's findings on revision 1):
 (a) Kantorovich radius in the exact rationalized form r* = 2 beta / (1 + sqrt(1 - 2t)) >= beta, no cancellation;
 (b) beta, t, r*, r**, disjointness and imaginary-axis separation evaluated OUTWARD with mpmath interval arithmetic (iv) using
     interval coefficients and interval delays (positions from iv.cos/iv.sin of exact multiples of iv.pi), so every rounding of the
     disk test is enclosed; the complex evaluation is done component-wise with real intervals (e^{-x tau}(cos(y tau) - i sin(y tau)));
 (c) contour winding in binary64 with an ABSOLUTE a-priori error model: |delta coefficient| <= C_c eps (absolute, covers vanishing
     coefficients), |delta tau| <= 4 eps, propagated into exp(-lambda tau) as |lambda| |delta tau| |exp|, plus 64 eps S(lambda) arithmetic
     rounding and the sample-coordinate term; recorded minimum clearance ratio and integer margin.
Theorem (unchanged): if |h'(z0)| > 0, beta = |h(z0)|/|h'(z0)|, M2 >= sup_{D(z0,Rd)} |h''|, t = beta M2/|h'(z0)| <= 1/2 and r* <= Rd, then exactly one
zero in D(z0, r*), simple, and none other in D(z0, r**), r** = min(Rd, 2|h'(z0)|/M2 / (1 - sqrt(1-2t))^{-1} ... ) -- here r** = (1 + sqrt(1 - 2t)) |h'|/M2 capped at Rd.
Controls before targets: K1 no-delay quadratics (known roots; counts; disks with r* >= beta); N1 shifted contour excludes a known root;
N2 coarse sampling refused; N3 disk test fails at a non-root point (r* > Rd); N4 r* computed by the cancelling form would be 0 for a
root where the exact form is positive (demonstrates the repaired radius).  Single thread, foreground; targets ~60 s."""
import json, os, sys, time
import numpy as np
from mpmath import iv, mp
EPS = 2.0 ** -53; CC = 64.0   # absolute coefficient error bound (in units of eps): a few dozen operations on O(1) quantities
iv.dps = 30
OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d, default=str)[:280])

# ---------------- geometry: binary64 (contour) and interval (disks) ----------------
def geometry_f64():
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
    return tau, c, n, z, Dt, Dz
def geometry_iv():
    def vec(m):
        ph = iv.pi * m / 3; return [iv.cos(ph), iv.sin(ph), iv.mpf(0)]
    def tan(m):
        ph = iv.pi * m / 3; return [-iv.sin(ph), iv.cos(ph), iv.mpf(0)]
    dot = lambda a, b: a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    U = [vec(m) for m in range(6)]; Tn = [tan(m) for m in range(6)]; Z = [iv.mpf(0), iv.mpf(0), iv.mpf(1)]
    sig = [1 if m % 2 == 0 else -1 for m in range(6)]
    a0 = iv.mpf(0)
    for m in range(1, 6):
        r = [U[0][i] - U[m][i] for i in range(3)]; rn = iv.sqrt(dot(r, r)); a0 += sig[m] * dot(U[0], r) / rn ** 3
    tau = {}; c = {}; n = {}; z = {}; Dt = -a0; Dz = -a0
    for m in range(1, 6):
        r = [U[0][i] - U[m][i] for i in range(3)]; rn = iv.sqrt(dot(r, r)); rh = [x / rn for x in r]; tau[m] = rn
        Kf = lambda a, b: (dot(a, b) - 3 * dot(rh, a) * dot(rh, b)) / rn ** 3
        c[m] = sig[m] * Kf(Tn[0], Tn[m]); n[m] = sig[m] * dot(rh, Tn[0]) * dot(rh, Tn[m]) / rn ** 2; z[m] = sig[m] * Kf(Z, Z)
        Dt += sig[m] * Kf(Tn[0], Tn[0]); Dz += sig[m] * Kf(Z, Z)
    return tau, c, n, z, Dt, Dz
tau64, c64, n64, z64, Dt64, Dz64 = geometry_f64()
tauI, cI, nI, zI, DtI, DzI = geometry_iv()
w64 = np.exp(1j * np.pi / 3)
def coeffs64(k, pol, delays=True):
    if pol == "t": return Dt64, [(tau64[m] if delays else 0.0, w64 ** (k * m) * c64[m], w64 ** (k * m) * n64[m]) for m in range(1, 6)]
    return Dz64, [(tau64[m] if delays else 0.0, w64 ** (k * m) * z64[m], 0.0) for m in range(1, 6)]
def coeffsI(k, pol):
    """Interval coefficients as (tau, Are, Aim, Bre, Bim) with w^{km} = cos(km pi/3) + i sin(km pi/3) in iv."""
    out = []
    for m in range(1, 6):
        ang = iv.pi * (k * m) / 3; cw, sw = iv.cos(ang), iv.sin(ang)
        A = cI[m] if pol == "t" else zI[m]; B = nI[m] if pol == "t" else iv.mpf(0)
        out.append((tauI[m], A * cw, A * sw, B * cw, B * sw))
    return (DtI if pol == "t" else DzI), out

# ---------------- binary64 h, derivative, bounds, with absolute error model ----------------
def h_eval(L, g, D, terms):
    s = np.zeros_like(L, dtype=complex)
    for t_, A_, B_ in terms: s += (A_ - L * B_) * np.exp(-L * t_)
    return L * L - g * D + g * s
def dh_eval(L, g, D, terms):
    s = np.zeros_like(L, dtype=complex)
    for t_, A_, B_ in terms: s += (-t_ * (A_ - L * B_) - B_) * np.exp(-L * t_)
    return 2 * L + g * s
def E_h(L, g, D, terms, M):
    """Absolute a-priori bound on |h_eval - h|: arithmetic rounding + absolute coefficient errors + delay error + coordinate error."""
    S = np.abs(L) ** 2 + g * abs(D)
    E = CC * EPS * g * np.ones_like(np.abs(L))          # error of D (absolute)
    for t_, A_, B_ in terms:
        ex = np.exp(-t_ * L.real); mag = abs(A_) + np.abs(L) * abs(B_)
        S = S + g * ex * mag
        E = E + g * ex * (CC * EPS * (1 + np.abs(L))      # absolute errors of A and B
                          + mag * np.abs(L) * 4 * EPS)    # delay error propagated through exp(-L tau)
    return 1.01 * (64 * EPS * S + E + M * 4 * EPS * np.abs(L))
def M_bound(xmin, Lmax, g, terms):
    return 1.01 * (2 * Lmax + g * sum(np.exp(-xmin * t_) * (t_ * (abs(A_) + Lmax * abs(B_)) + abs(B_)) for t_, A_, B_ in terms))
def certified_winding(g, D, terms, rect, n0_per_unit=40, max_rounds=14, allow_refine=True):
    x0, x1, y0, y1 = rect; corners = [complex(x0, y0), complex(x1, y0), complex(x1, y1), complex(x0, y1), complex(x0, y0)]
    total = 0.0; nsamples = 0; uncert = []; min_clear = np.inf
    for e in range(4):
        a, b = corners[e], corners[e + 1]; length = abs(b - a); unit = (b - a) / length
        npieces = int(np.ceil(length)); edges = np.linspace(0, length, npieces + 1)
        for p in range(npieces):
            s0, s1 = edges[p], edges[p + 1]; pa, pb = a + unit * s0, a + unit * s1
            xmin = min(pa.real, pb.real); Lmax = max(abs(pa), abs(pb)); M = M_bound(xmin, Lmax, g, terms)
            s = np.linspace(s0, s1, max(2, int(np.ceil((s1 - s0) * n0_per_unit)) + 1))
            for rnd in range(max_rounds + 1):
                L = a + unit * s; hv = h_eval(L, g, D, terms); ah = np.abs(hv); Eh = E_h(L, g, D, terms, M)
                clear = np.minimum(ah[:-1] - Eh[:-1], ah[1:] - Eh[1:]); d = np.diff(s); ok = (d * M < 0.9 * clear) & (clear > 0)
                if ok.all(): break
                if not allow_refine or rnd == max_rounds: uncert.append({"edge": e, "piece": p, "failing": int((~ok).sum())}); break
                bad = np.where(~ok)[0]; mids = 0.5 * (s[bad] + s[bad + 1]); s = np.sort(np.concatenate([s, mids]))
            inc = np.angle(hv[1:] / hv[:-1]); total += inc.sum(); nsamples += len(s); min_clear = min(min_clear, float((ah / Eh).min()))
    if uncert: return None, {"uncertified_pieces": uncert}
    wn = total / (2 * np.pi); margin = abs(wn - round(wn)) + 8 * EPS * nsamples / (2 * np.pi)
    if margin >= 0.25: return None, {"integer_margin_failed": margin}
    return int(round(wn)), {"raw_winding": float(wn), "samples": nsamples, "integer_margin": float(margin), "min_clearance_ratio": min_clear}
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

# ---------------- interval Kantorovich ----------------
def h_iv(x, y, g, D, terms):
    """Interval enclosure of (Re h, Im h) and (Re h', Im h') at the exact point x + i y (x, y binary64 numbers)."""
    X = iv.mpf(x); Y = iv.mpf(y); gI = iv.mpf(g)
    hre = X * X - Y * Y - gI * D; him = 2 * X * Y; dre = 2 * X; dim = 2 * Y
    for (t_, Ar, Ai, Br, Bi) in terms:
        ex = iv.exp(-t_ * X); ce = iv.cos(t_ * Y); se = iv.sin(t_ * Y)   # e^{-L tau} = ex (ce - i se)
        Er, Ei = ex * ce, -ex * se
        # (A - L B): A - (X + iY)(Br + i Bi) = (Ar - X Br + Y Bi) + i(Ai - X Bi - Y Br)
        Cr = Ar - X * Br + Y * Bi; Ci = Ai - X * Bi - Y * Br
        hre += gI * (Cr * Er - Ci * Ei); him += gI * (Cr * Ei + Ci * Er)
        # derivative term: (-tau (A - L B) - B) e^{-L tau}
        Gr = -t_ * Cr - Br; Gi = -t_ * Ci - Bi
        dre += gI * (Gr * Er - Gi * Ei); dim += gI * (Gr * Ei + Gi * Er)
    return hre, him, dre, dim
def absI(x):
    """Absolute-value interval of a real interval (sign-aware; needed before squaring an interval that straddles zero)."""
    lo_ = mp.mpf(0) if (x.a <= 0 and x.b >= 0) else min(abs(x.a), abs(x.b)); hi_ = max(abs(x.a), abs(x.b))
    return iv.mpf([lo_, hi_])
def sqI(x):
    a = absI(x); return a * a
def absiv_up(a, b):   # upper bound of |a + i b| for intervals a, b
    return mp.mpf(iv.sqrt(sqI(a) + sqI(b)).b)
def absiv_lo(a, b):   # lower bound of |a + i b|
    return max(mp.mpf(0), mp.mpf(iv.sqrt(sqI(a) + sqI(b)).a))
def M2_iv_up(x, y, Rd, g, terms):
    X = iv.mpf(x); Y = iv.mpf(y); gI = iv.mpf(g); Lmax = iv.sqrt(sqI(X) + sqI(Y)) + Rd; xmin = X - Rd
    s = iv.mpf(2)
    for (t_, Ar, Ai, Br, Bi) in terms:
        Aabs = iv.sqrt(sqI(Ar) + sqI(Ai)); Babs = iv.sqrt(sqI(Br) + sqI(Bi))
        s += gI * iv.exp(-t_ * xmin) * (t_ * t_ * (Aabs + Lmax * Babs) + 2 * t_ * Babs)
    return mp.mpf(s.b)
def kantorovich_iv(z0, g, D, terms, Rd=0.2):
    hre, him, dre, dim = h_iv(z0.real, z0.imag, g, D, terms)
    habs_up = absiv_up(hre, him); hp_lo = absiv_lo(dre, dim)
    if hp_lo <= 0: return {"validated": False, "reason": "h' not bounded away from 0"}
    beta_up = habs_up / hp_lo; M2 = M2_iv_up(z0.real, z0.imag, iv.mpf(Rd), g, terms); t_up = beta_up * M2 / hp_lo
    if t_up > mp.mpf(1) / 2: return {"validated": False, "t_up": float(t_up)}
    rstar_up = 2 * beta_up / (1 + mp.sqrt(1 - 2 * t_up))          # exact rationalized form, >= beta; evaluated at upper beta, t
    rstar_up = rstar_up * (1 + mp.mpf(2) ** -40)                   # outward guard for the mp arithmetic of this line
    rdstar_lo = min(mp.mpf(Rd), (1 + mp.sqrt(1 - 2 * t_up)) * hp_lo / M2 * (1 - mp.mpf(2) ** -40))
    if rstar_up > Rd: return {"validated": False, "reason": "r* exceeds Rd", "rstar_up": float(rstar_up)}
    return {"validated": True, "beta_up": float(beta_up), "t_up": float(t_up), "rstar_up": float(rstar_up), "rdstar_lo": float(rdstar_lo), "h_abs_up": float(habs_up), "hprime_abs_lo": float(hp_lo), "M2_up": float(M2)}

RECT = (-0.01, 10.0, -10.0, 10.0); FULL = (-4.0, 10.0, -10.0, 10.0)
t0 = time.time()
# ---------------- controls ----------------
k1 = {}; okK1 = True
for k, pol in [(3, "t"), (3, "z"), (0, "t"), (2, "z")]:
    D, terms = coeffs64(k, pol, delays=False); A = sum(A_ for _, A_, _ in terms); B = sum(B_ for _, _, B_ in terms)
    rts = np.roots([1.0, -B, -(D - A)]); expected = sum(1 for r in rts if FULL[0] <= r.real <= FULL[1] and FULL[2] <= r.imag <= FULL[3])
    wn, info = certified_winding(1.0, D, terms, FULL)
    DI, termsI = coeffsI(k, pol); termsI0 = [(iv.mpf(0), Ar, Ai, Br, Bi) for (_, Ar, Ai, Br, Bi) in termsI]
    disks = [kantorovich_iv(complex(r), 1.0, DI, termsI0) for r in rts]
    k1[f"{k}{pol}"] = {"expected": expected, "certified": wn, "disks_ok": all(dk["validated"] for dk in disks), "rstar_ge_beta": all(dk["rstar_up"] >= dk["beta_up"] for dk in disks if dk["validated"]), "min_clearance": info.get("min_clearance_ratio")}
    okK1 = okK1 and wn == expected and k1[f"{k}{pol}"]["disks_ok"] and k1[f"{k}{pol}"]["rstar_ge_beta"]
rec("control_K1_no_delay_quadratics_interval_disks", {"blocks": k1, "pass": bool(okK1)})
if not okK1: sys.exit("K1")
D, terms = coeffs64(3, "t"); wn_full, _ = certified_winding(1.0, D, terms, FULL); wn_shift, _ = certified_winding(1.0, D, terms, (-4.0, 1.9, -10.0, 10.0))
rec("control_N1_shifted_contour", {"full": wn_full, "shifted": wn_shift, "pass": bool(wn_full is not None and wn_shift is not None and wn_full - wn_shift == 1)})
if not (wn_full is not None and wn_shift is not None and wn_full - wn_shift == 1): sys.exit("N1")
wn_c, _ = certified_winding(4.0, D, terms, FULL, n0_per_unit=2, allow_refine=False)
rec("control_N2_coarse_refused", {"result": wn_c, "pass": bool(wn_c is None)})
if wn_c is not None: sys.exit("N2")
DI, termsI = coeffsI(3, "t"); root = newton_roots(1.0, D, terms, RECT)[0]
kr = kantorovich_iv(root, 1.0, DI, termsI); ko = kantorovich_iv(root + 0.3, 1.0, DI, termsI)
rec("control_N3_disk_fails_off_root", {"at_root": kr, "off_root": ko, "pass": bool(kr["validated"] and not ko["validated"])})
if not (kr["validated"] and not ko["validated"]): sys.exit("N3")
# N4: the cancelling form (1 - sqrt(1 - 2t)) hp/M2 in binary64 at this root versus the exact form
t_ = kr["t_up"]; cancel = (1 - np.sqrt(1 - 2 * t_)) * kr["hprime_abs_lo"] / kr["M2_up"]; exact = kr["rstar_up"]
rec("control_N4_cancelling_radius_vs_exact", {"t": t_, "cancelling_form": float(cancel), "exact_form_up": exact, "beta_up": kr["beta_up"], "pass": bool(exact >= kr["beta_up"] and exact > 0)})
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "elapsed_s": time.time() - t0})
# ---------------- targets ----------------
res = {}
for gv in (4.0, 2.0, 1.0, 0.5, 0.25, 0.1):
    row = {}; allok = True; sep_all = True; best = None
    for k in range(6):
        for pol in "tz":
            D, terms = coeffs64(k, pol); DI, termsI = coeffsI(k, pol)
            wn, info = certified_winding(gv, D, terms, RECT); rts = newton_roots(gv, D, terms, RECT)
            disks = [kantorovich_iv(r, gv, DI, termsI) for r in rts]
            exact_zero = [(abs(r) < 1e-9 and (k, pol) in [(0, "t"), (1, "z"), (5, "z")]) for r in rts]
            seps = [(r.real - dk.get("rstar_up", 1e9) > 0) or ez for r, dk, ez in zip(rts, disks, exact_zero)]
            disjoint = all(abs(rts[i] - rts[j]) > disks[i].get("rstar_up", 1e9) + disks[j].get("rstar_up", 1e9) for i in range(len(rts)) for j in range(i + 1, len(rts)))
            complete = wn is not None and wn == len(rts) and all(dk["validated"] for dk in disks) and disjoint
            row[f"{k}{pol}"] = {"certified_count": wn, "validated_roots": len(rts), "complete_and_simple": bool(complete), "disjoint": bool(disjoint), "min_clearance_ratio": info.get("min_clearance_ratio"), "integer_margin": info.get("integer_margin"),
                                "roots": [f"{r.real:.9f}{r.imag:+.9f}i" for r in rts], "rstar_up": [dk.get("rstar_up") for dk in disks], "separated": seps}
            allok = allok and complete; sep_all = sep_all and all(seps)
            for r in rts:
                if best is None or r.real > best[1].real: best = (f"{k}{pol}", r)
    row["_all_complete_and_simple"] = bool(allok); row["_all_separated_from_imag_axis"] = bool(sep_all)
    row["_dominant"] = (best[0], f"{best[1].real:.9f}{best[1].imag:+.9f}i") if best else None
    row["_min_clearance_ratio_over_blocks"] = min(v["min_clearance_ratio"] for kk, v in row.items() if not kk.startswith("_") and v["min_clearance_ratio"] is not None)
    row["_max_rstar"] = max((x for kk, v in row.items() if not kk.startswith("_") for x in v["rstar_up"] if x is not None), default=None)
    res[str(gv)] = row
    print(gv, "complete+simple", allok, "separated", sep_all, "dominant", row["_dominant"], "min clearance", row["_min_clearance_ratio_over_blocks"], "max r*", row["_max_rstar"], "elapsed", round(time.time() - t0, 1))
rec("target_validated_right_strip_v2", res)
OUT["_elapsed_s"] = time.time() - t0; OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
json.dump(OUT, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "spherical-curvature-claude-review-contour-validated-v2-output.json"), "w"), indent=1, default=str)
print("elapsed", OUT["_elapsed_s"])
