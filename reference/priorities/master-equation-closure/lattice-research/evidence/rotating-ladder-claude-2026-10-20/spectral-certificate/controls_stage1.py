"""Stage-1 known-case controls for ladder_spectral_iv (run before any target use).
Writes controls-stage1.json next to this file.  Usage: python controls_stage1.py [part ...]
Parts: newton statics symmetry zerodelay realroot krawczyk"""
import json
import math
import os
import sys
import time

import numpy as np
import mpmath
from mpmath import iv

import ladder_spectral_iv as L

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "controls-stage1.json")

# recorded R = 1000 float balance (adjudication 2026-10-03, control "Balance"); NOT a certified box.
FB_DELTA = "3.345035293"
FB_EPS = "0.01384081428"
# box = printed value +- half a unit of the last printed digit (an assumption, not a certificate)
FB_DELTA_BOX = [str(mpmath.mpf(FB_DELTA) - mpmath.mpf("5e-10")), str(mpmath.mpf(FB_DELTA) + mpmath.mpf("5e-10"))]
FB_EPS_BOX = [str(mpmath.mpf(FB_EPS) - mpmath.mpf("5e-12")), str(mpmath.mpf(FB_EPS) + mpmath.mpf("5e-12"))]


def iv2(x):
    return [float(x.a), float(x.b)]


def cont(x, val):
    """interval x contains the real number val (val as iv point/tiny interval)."""
    v = iv.mpf(val)
    return bool(x.a <= v.a and v.b <= x.b)


def load():
    if os.path.exists(OUT):
        return json.load(open(OUT))
    return {}


def save(d):
    json.dump(d, open(OUT, "w"), indent=1, default=float)


# ------------------------------------------------------------------ C1 causal roots / Newton
def part_newton(res):
    out = {}
    d = iv.mpf("3.3")
    rows = []
    for eps0 in ("0",):
        e = iv.mpf(eps0)
        for nu in (1, -1):
            for k in (1, 2, 5, 100, 20000):
                tau, it = L.causal_root(nu, k, d, e)
                exact = k * d if nu == 1 else iv.sqrt((k * d) ** 2 + 4)
                rows.append({"nu": nu, "k": k, "tau": iv2(tau), "exact": iv2(exact),
                             "contains_exact": bool(tau.a <= exact.a and exact.b <= tau.b),
                             "overlaps_exact": bool(tau.a <= exact.b and exact.a <= tau.b),
                             "width": float(tau.delta)})
    out["eps0_exact_roots"] = rows
    # eps = 0.5: independent inclusion test Phi(tau_lo) < 0 < Phi(tau_hi) (sign change, no Newton)
    rows = []
    e = iv.mpf("0.5")
    for nu in (1, -1):
        for k in (0, 1, 3, 50):
            if nu == 1 and k == 0:
                continue
            tau, it = L.causal_root(nu, k, d, e)
            z = k * d

            def Phi(t):
                t = iv.mpf(t)
                return t * t - z * z - 2 + 2 * nu * iv.cos(e * t)
            off = 1e-10 * float(tau.mid)
            lo = Phi(iv.mpf(tau.a) - off)
            hi = Phi(iv.mpf(tau.b) + off)
            rows.append({"nu": nu, "k": k, "tau": iv2(tau), "offset": off, "Phi_lo": iv2(lo), "Phi_hi": iv2(hi),
                         "sign_change": bool(lo.b < 0 < hi.a)})
    out["eps05_sign_check"] = rows
    # generic interval Newton known case: x^2 - 2 (sqrt 2), via the causal-root routine's scheme
    X = iv.mpf([1.4, 1.5])
    for _ in range(6):
        m = iv.mpf(X.mid)
        X = L.isect(m - (m * m - 2) / (2 * X), X)
    out["sqrt2"] = {"enclosure": iv2(X), "contains": bool(X.a <= iv.sqrt(2).a and iv.sqrt(2).b <= X.b)}
    res["C1_newton"] = out
    print(json.dumps(out, indent=1, default=float)[:3000])


# ------------------------------------------------------------------ C2 static sums at eps = 0
def part_statics(res):
    d = iv.mpf("3.3")
    e = iv.mpf(0)
    K = 4000
    own_zz = iv.mpf(0)
    own_xx = iv.mpf(0)
    own_wzz = iv.mpf(0)
    oth_wtr = iv.mpf(0)
    for k in range(1, K + 1):
        s = L.source_rows(1, k, d, e, need_PW=False)
        own_zz += 2 * s["Lu"][2][2]
        own_xx += 2 * s["Lu"][0][0]
        own_wzz += 2 * s["Lw"][2][2]
    for k in range(-K, K + 1):
        s = L.source_rows(-1, k, d, e, need_PW=False)
        oth_wtr += s["Lw"][0][0] + s["Lw"][1][1] + s["Lw"][2][2]
    # tails: per rail two sources per |k| -> half of the four-source bound
    Tu = L.inst_tail(K, d, e) / 2
    Tw = L.tail_bounds(K, 0.0, d, e, 0.0) / 2  # includes C_u/(k d)^3 + C_w eps/(k d)^2 with eps=0
    Cu, Cw = L.tail_constants(e)
    Tw2 = float((2 * Cw / (iv.mpf(d.a) ** 2 * K)).b)  # sum_{|k|>K} |Lw| <= 2 C_w/(delta^2 K) per rail
    mp = mpmath.mp
    mp.dps = 40
    dd = mpmath.mpf("3.3")
    exact = {
        "own_Lu_zz": 3 * mpmath.zeta(3) / dd ** 3,
        "own_Lu_xx": -mpmath.mpf(3) / 2 * mpmath.zeta(3) / dd ** 3,
        "own_Lw_zz": -mpmath.pi ** 2 / (6 * dd ** 2),
        "other_Lw_trace": -mpmath.pi / (2 * dd * mpmath.sinh(2 * mpmath.pi / dd)),
    }
    enc = {
        "own_Lu_zz": own_zz + iv.mpf([-Tu, Tu]),
        "own_Lu_xx": own_xx + iv.mpf([-Tu, Tu]),
        "own_Lw_zz": own_wzz + iv.mpf([-Tw2, Tw2]),
        "other_Lw_trace": oth_wtr + iv.mpf([-3 * Tw2, 3 * Tw2]),
    }
    out = {"K": K, "delta": "3.3", "eps": 0}
    for key in exact:
        x = enc[key]
        v = exact[key]
        out[key] = {"enclosure": iv2(x), "closed_form": float(v), "contains": bool(x.a <= v <= x.b),
                    "width": float(x.delta), "tail_used": (Tw2 if "Lw" in key else Tu)}
    res["C2_statics"] = out
    print(json.dumps(out, indent=1, default=float))


# ------------------------------------------------------------------ C3 symmetry roots
def part_symmetry(res, Ns=10000):
    out = {}
    for label, dl, el in (("float_point", FB_DELTA, FB_EPS), ("float_box", FB_DELTA_BOX, FB_EPS_BOX)):
        t0 = time.time()
        lad = L.Ladder(iv.mpf(dl), iv.mpf(el), R=1000, N=Ns, Ns=Ns, verbose=True)
        pre = time.time() - t0
        sc = 1 / (lad.R * lad.eps * lad.eps)  # residual in units of R eps^2 (i.e. omega^2 in Delta_phys/omega^2 units)
        rec = {"precompute_s": pre, "N": Ns, "Ns": Ns}
        zero = (iv.mpf(0), iv.mpf(0))
        one = (iv.mpf(1), iv.mpf(0))
        cases = [
            ("axial_translation", 0, 0, 0, 1, [zero, zero, one]),
            ("rigid_rotation", 0, 0, 0, 1, [zero, one, zero]),
            ("radial_at_0_wrong", 0, 0, 0, 1, [one, zero, zero]),
            ("inplane_translation_Lam=-i", 0, -1, math.pi, -1, [one, (iv.mpf(0), iv.mpf(-1)), zero]),
            ("inplane_translation_Lam=+i", 0, 1, math.pi, -1, [one, (iv.mpf(0), iv.mpf(1)), zero]),
            ("inplane_wrong_sector_p=+1", 0, -1, math.pi, 1, [one, (iv.mpf(0), iv.mpf(-1)), zero]),
            ("axial_wrong_sector_q=pi", 0, 0, math.pi, 1, [zero, zero, one]),
        ]
        for (name, lr, li, q, p, vec) in cases:
            t1 = time.time()
            M, info = lad.matrix(lr, li, q, p)
            r = L.matvec(M, vec)
            comp = []
            contains0 = True
            for (a, b) in r:
                a2, b2 = a * sc, b * sc
                comp.append([iv2(a2), iv2(b2)])
                contains0 = contains0 and L.has0(a2) and L.has0(b2)
            mx = max(max(abs(x[0][0]), abs(x[0][1]), abs(x[1][0]), abs(x[1][1])) for x in comp)
            rec[name] = {"residual_over_Reps2": comp, "contains_zero": contains0, "max_abs": mx,
                         "tail": info["tail"], "eval_s": time.time() - t1}
            print(label, name, contains0, "%.3g" % mx)
        out[label] = rec
    res["C3_symmetry"] = out


# ------------------------------------------------------------------ C4 zero-delay limit
def static_accel(x, sources):
    """instantaneous (zero-delay comparison) acceleration at x: sum sigma r/|r|^3."""
    a = np.zeros(3)
    for (X, sg) in sources:
        r = x - X
        rr = np.sqrt(np.sum(r * r, axis=1))
        a += np.sum((sg / rr ** 3)[:, None] * r, axis=0)
    return a


def zero_delay_Z0_fd(delta, q, p, K=20000, eta=1e-5):
    """Independent float construction of the zero-delay interaction matrix Z0 (Delta0 minus the
    kinetic term) by central differences of the static law, |k| <= K.  No first-variation formula."""
    ks = np.arange(-K, K + 1)
    # sources: rail nu at angle 0 (nu=+1) or pi (nu=-1), rung k, z = k delta.
    srcs = []
    for nu in (1, -1):
        kk = ks if nu == -1 else ks[ks != 0]
        X = np.stack([nu * np.ones_like(kk, dtype=float), np.zeros_like(kk, dtype=float), kk * delta], axis=1)
        sg = nu * np.where(kk % 2 == 0, 1.0, -1.0)
        pos = sg > 0
        coef = np.exp(1j * q * kk) * np.where(pos, 1.0, p)
        Q = np.diag([nu, nu, 1.0])
        srcs.append((X, sg, coef, Q))
    x0 = np.array([1.0, 0.0, 0.0])
    Z0 = np.zeros((3, 3), dtype=complex)
    for m in range(3):
        em = np.zeros(3)
        em[m] = 1.0
        for part in ("re", "im"):
            def acc(h):
                xs = x0 + (h * em if part == "re" else 0 * em)
                lst = []
                for (X, sg, coef, Q) in srcs:
                    disp = (Q @ em)[None, :] * (coef.real if part == "re" else coef.imag)[:, None]
                    lst.append((X + h * disp, sg))
                return static_accel(xs, lst)
            da = (acc(eta) - acc(-eta)) / (2 * eta)
            if part == "re":
                Z0[:, m] += -da
            else:
                Z0[:, m] += -1j * da
    return Z0


def S0(delta, K=200000):
    k = np.arange(-K, K + 1)
    return float(np.sum(2 * np.where(k % 2 == 0, 1.0, -1.0) / (4 + (k * delta) ** 2) ** 1.5))


def part_zerodelay(res):
    out = {}
    dstar = "3.3452801575"
    dS = float(dstar)
    J = np.array([[0, -1, 0], [1, 0, 0], [0, 0, 0]], dtype=float)
    s0 = S0(dS)
    out["S0"] = s0
    sectors = (("q=pi,p=+1", math.pi, 1), ("q=0.85pi,p=+1", 0.85 * math.pi, 1), ("q=0,p=-1", 0.0, -1))
    for (qname, q, p) in sectors:
        t0 = time.time()
        Z0 = zero_delay_Z0_fd(dS, q, p)
        rec = {"Z0_fd_seconds": time.time() - t0, "Z0": [[[z.real, z.imag] for z in row] for row in Z0]}

        def det0(Lam):
            K = (Lam * np.eye(3) + J)
            return np.linalg.det(s0 * K @ K + Z0)
        x0, x1 = 0.95 + 0j, 1.0 + 0j
        f0, f1 = det0(x0), det0(x1)
        for _ in range(60):
            x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
            x0, f0, x1, f1 = x1, f1, x2, det0(x2)
            if abs(x1 - x0) < 1e-14:
                break
        rec["zero_delay_root_float"] = [x1.real, x1.imag]
        rec["_Z0"] = Z0
        rec["delayed_minus_Z0"] = []
        out[qname] = rec
        print(qname, rec["zero_delay_root_float"])
    # delayed interaction part -> Z0 as eps -> 0 (Lam fixed at the zero-delay root's real part)
    for eps0 in ("1e-2", "1e-3", "1e-4"):
        e = iv.mpf(eps0)
        R = s0 / float(eps0) ** 2
        lad = L.Ladder(iv.mpf(dstar), e, R=R, N=400, Ns=5000)
        for (qname, q, p) in sectors:
            rec = out[qname]
            Z0 = rec["_Z0"]
            Lam = rec["zero_delay_root_float"][0]
            M, info = lad.matrix(Lam, 0, q, p)
            lt = Lam * float(eps0)
            Kin = R * (lt * np.eye(3) + float(eps0) * J) @ (lt * np.eye(3) + float(eps0) * J)
            Mm = np.array([[complex(float(M[0][i][j].mid), float(M[1][i][j].mid)) for j in range(3)] for i in range(3)])
            W = max(float(M[0][i][j].delta) + float(M[1][i][j].delta) for i in range(3) for j in range(3))
            D = Mm - Kin - Z0
            rec["delayed_minus_Z0"].append({"eps": float(eps0), "max_abs_diff": float(np.max(np.abs(D))),
                                            "max_abs_Z0": float(np.max(np.abs(Z0))),
                                            "max_entry_width": W, "precompute_s": lad.precompute_seconds})
            print(qname, eps0, rec["delayed_minus_Z0"][-1])
    for (qname, q, p) in sectors:
        out[qname].pop("_Z0")
    res["C4_zerodelay"] = out


# ------------------------------------------------------------------ C5 real root (exercise)
def part_realroot(res):
    out = {}
    lad = L.Ladder(iv.mpf(FB_DELTA_BOX), iv.mpf(FB_EPS_BOX), R=1000, N=400, Ns=20000, verbose=True)
    out["precompute_s"] = lad.precompute_seconds
    out["inst_tail"] = lad.inst_tail

    def f(x):
        M, _ = lad.matrix(x, 0, math.pi, 1)
        return L.det3(M)[0]
    # coarse scan
    scan = []
    for x in np.linspace(0.90, 1.05, 16):
        v = f(float(x))
        scan.append([float(x), iv2(v)])
    out["scan"] = scan
    # float bisection on midpoints to locate, then sign-change + monotonicity test
    lo, hi = 0.95, 1.02
    flo = float(f(lo).mid)
    for _ in range(40):
        m = 0.5 * (lo + hi)
        fm = float(f(m).mid)
        if (fm > 0) == (flo > 0):
            lo, flo = m, fm
        else:
            hi = m
    xr = 0.5 * (lo + hi)
    out["float_location"] = xr
    t0 = time.time()
    certs = []
    for hw in (1e-4, 1e-5, 1e-6, 1e-7):
        c = L.real_root_certificate(lad, xr - hw, xr + hw, q=math.pi, p=1)
        c["half_width"] = hw
        certs.append(c)
        print(hw, c["certified"], c["det_lo"], c["det_hi"], c["ddet"])
    out["sign_change_tests"] = certs
    out["test_seconds"] = time.time() - t0
    # which block: planar 2x2 determinant and zz entry at xr
    M, _ = lad.matrix(xr, 0, math.pi, 1)
    pl = M[0][0][0] * M[0][1][1] - M[0][0][1] * M[0][1][0]
    out["planar_det_at_root"] = iv2(pl)
    out["zz_at_root"] = iv2(M[0][2][2])
    res["C5_realroot_exercise"] = out


# ------------------------------------------------------------------ C6 Krawczyk
def part_krawczyk(res):
    out = {}

    # known case: f(z) = z - 20 e^{-z}; roots are W_k(20) (Lambert function).
    def fz(re, im):
        re, im = iv.mpf(re), iv.mpf(im)
        ex = iv.exp(-re)
        er, ei = ex * iv.cos(im), -ex * iv.sin(im)
        f = (re - 20 * er, im - 20 * ei)
        df = (1 + 20 * er, 20 * ei)
        return f, df
    rows = []
    mpmath.mp.dps = 30
    for br in (0, 1, 2, -1):
        w = mpmath.lambertw(20, br)
        x, y = float(w.real), float(w.imag)
        # float-perturbed centre to avoid centering on the reference value
        cx, cy = x + 3e-5, y - 2e-5
        h = 1e-3
        ok, K, fm, dB = L.krawczyk_complex(fz, iv.mpf([cx - h, cx + h]), iv.mpf([cy - h, cy + h]))
        inK = bool(K[0].a <= w.real <= K[0].b and K[1].a <= w.imag <= K[1].b)
        rows.append({"branch": br, "W": [x, y], "contracts": ok, "K": [iv2(K[0]), iv2(K[1])],
                     "K_contains_W": inK})
        print("lambert", br, ok, inK)
    out["lambert_known_case"] = rows
    # exercise on the ladder at the float balance box: in-step pair q=0, p=+1 (no certificate).
    # Re Lam ~ 0.069 gives weak exponential decay (sigma0 delta ~ 3.2e-3 per rung): N = 4000 needed
    # (a first run with N = 400 failed to contract because the delayed tail bound was ~4e-6).
    lad = L.Ladder(iv.mpf(FB_DELTA_BOX), iv.mpf(FB_EPS_BOX), R=1000, N=4000, Ns=20000, verbose=True)

    def fl_(re, im):
        d, dd, _ = L.det_and_deriv(lad, re, im, 0, 1)
        return d, dd
    # float Newton from the adjudication's value 0.0689 + 0.6064 i
    z = complex(0.0689, 0.6064)
    for _ in range(30):
        d, dd = fl_(z.real, z.imag)
        fz_ = complex(float(d[0].mid), float(d[1].mid))
        dz = complex(float(dd[0].mid), float(dd[1].mid))
        zn = z - fz_ / dz
        if abs(zn - z) < 1e-13:
            z = zn
            break
        z = zn
    out["inplane_pair_float_location"] = [z.real, z.imag]
    t0 = time.time()
    tests = []
    for h in (1e-4, 1e-5, 1e-6):
        ok, K, fm, dB = L.krawczyk_complex(fl_, iv.mpf([z.real - h, z.real + h]), iv.mpf([z.imag - h, z.imag + h]))
        tests.append({"half_width": h, "contracts": ok, "K": [iv2(K[0]), iv2(K[1])],
                      "f_mid": [iv2(fm[0]), iv2(fm[1])], "df_box": [iv2(dB[0]), iv2(dB[1])]})
        print("ladder in-step", h, ok)
    out["ladder_inplane_pair_exercise"] = tests
    out["seconds"] = time.time() - t0
    res["C6_krawczyk"] = out


# ------------------------------------------------------------------ C7 direct evaluation
def direct_accel(delta, eps, K, Lam, q, p, c, eta):
    """Receiver (positive member, rung 0, time 0) acceleration from the unchanged law, float,
    with every member moved by eta*Re[F_j(t) c_j e^{lt t}] (lt = Lam*eps, c_j = p_j e^{iqk} c),
    every causal root re-solved on the perturbed paths (vectorised Newton), |k| <= K.
    Uses no first-variation formula."""
    lt = Lam * eps
    J = np.array([[0, -1, 0], [1, 0, 0], [0, 0, 0]], dtype=float)
    x = np.array([1.0, 0.0, 0.0]) + eta * np.real(c)
    a = np.zeros(3)
    for nu in (1, -1):
        ks = np.arange(-K, K + 1)
        if nu == 1:
            ks = ks[ks != 0]
        sg = nu * np.where(ks % 2 == 0, 1.0, -1.0)
        coef = np.exp(1j * q * ks) * np.where(sg > 0, 1.0, p)
        phi0 = 0.0 if nu == 1 else math.pi
        z = ks * delta

        def path(t):
            ang = eps * t + phi0
            ca, sa = np.cos(ang), np.sin(ang)
            X = np.stack([ca, sa, z], axis=1)
            V = eps * np.stack([-sa, ca, 0 * z], axis=1)
            # F(t) c_j e^{lt t}: F columns e_r=(ca,sa,0), e_t=(-sa,ca,0), e_z
            cj = coef[:, None] * c[None, :] * np.exp(lt * t)[:, None]
            dcj = coef[:, None] * ((lt * np.eye(3) + eps * J) @ c)[None, :] * np.exp(lt * t)[:, None]

            def F(v):
                return np.stack([ca * v[:, 0] - sa * v[:, 1], sa * v[:, 0] + ca * v[:, 1], v[:, 2]], axis=1)
            X = X + eta * np.real(F(cj))
            V = V + eta * np.real(F(dcj))
            return X, V
        tau = np.sqrt(z * z + (4.0 if nu == -1 else 0.0)) + 0.5
        for _ in range(60):
            X, V = path(-tau)
            r = x[None, :] - X
            rr = np.sqrt(np.sum(r * r, axis=1))
            g = tau - rr
            dg = 1 - np.sum(r * V, axis=1) / rr
            tau = tau - g / dg
        X, V = path(-tau)
        r = x[None, :] - X
        tau = np.sqrt(np.sum(r * r, axis=1))
        n = r / tau[:, None]
        D = 1 - np.sum(n * V, axis=1)
        a += np.sum((sg / (tau ** 3 * D))[:, None] * r, axis=0)
    return a


def part_direct(res):
    out = {"cases": []}
    K = 1500
    rng = np.random.default_rng(20261020)
    delta, eps = 3.345035293, 0.01384081428
    lad = L.Ladder(iv.mpf(FB_DELTA), iv.mpf(FB_EPS), R=1000, N=K, Ns=K, verbose=True)
    J = np.array([[0, -1, 0], [1, 0, 0], [0, 0, 0]], dtype=float)
    cases = [(0.98743, 0.0, math.pi, 1), (0.5, 0.7, 0.3 * math.pi, -1), (1.2, -1.3, 0.0, 1),
             (0.3, 2.0, 0.77 * math.pi, 1), (2.0, 0.4, math.pi, -1)]
    for (lr, li, q, p) in cases:
        c = rng.normal(size=3) + 1j * rng.normal(size=3)
        M, info = lad.matrix(lr, li, q, p)
        lt = complex(lr, li) * eps
        Kin = 1000 * (lt * np.eye(3) + eps * J) @ (lt * np.eye(3) + eps * J)
        Mm = np.array([[complex(float(M[0][i][j].mid), float(M[1][i][j].mid)) for j in range(3)] for i in range(3)])
        W = max(float(M[0][i][j].delta) + float(M[1][i][j].delta) for i in range(3) for j in range(3))
        pred = -(Mm - Kin) @ c  # complex linear response delta a(c)
        rows = []
        for eta in (1e-4, 1e-5):
            fd_re = (direct_accel(delta, eps, K, complex(lr, li), q, p, c, eta) -
                     direct_accel(delta, eps, K, complex(lr, li), q, p, c, -eta)) / (2 * eta)
            fd_im = (direct_accel(delta, eps, K, complex(lr, li), q, p, -1j * c, eta) -
                     direct_accel(delta, eps, K, complex(lr, li), q, p, -1j * c, -eta)) / (2 * eta)
            fd = fd_re + 1j * fd_im
            rows.append({"eta": eta, "max_abs_diff": float(np.max(np.abs(fd - pred))),
                         "max_abs_pred": float(np.max(np.abs(pred)))})
        # same matrix through the units="lt" entry (lt = Lam * eps, eps a point here)
        Mlt, _ = lad.matrix(iv.mpf(lr) * lad.eps, iv.mpf(li) * lad.eps, q, p, units="lt")
        Mlm = np.array([[complex(float(Mlt[0][i][j].mid), float(Mlt[1][i][j].mid)) for j in range(3)] for i in range(3)])
        rows.append({"units_lt_max_abs_diff_vs_fd_eta1e-5": float(np.max(np.abs(fd - (-(Mlm - Kin) @ c))))})
        rec = {"Lam": [lr, li], "q_over_pi": q / math.pi, "p": p, "fd": rows,
               "interval_entry_width_max": W, "tail": info["tail"],
               "allowed_by_widths": 3 * W * float(np.max(np.abs(c)))}
        out["cases"].append(rec)
        print(rec)
    out["K"] = K
    res["C7_direct"] = out


if __name__ == "__main__":
    parts = sys.argv[1:] or ["newton", "statics", "symmetry", "zerodelay", "realroot", "krawczyk"]
    res = load()
    res["_meta"] = {"mpmath": mpmath.__version__, "iv_prec": iv.prec, "numpy": np.__version__}
    for ptn in parts:
        t0 = time.time()
        globals()["part_" + ptn](res)
        res.setdefault("_timing", {})[ptn] = time.time() - t0
        save(res)
        print("== part", ptn, "%.1f s" % (time.time() - t0))
