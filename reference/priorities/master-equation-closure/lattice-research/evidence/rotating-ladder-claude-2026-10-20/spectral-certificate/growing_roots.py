"""Certified growing characteristic roots of the delayed linearisation about certified balances
(formal modes only).  Uses ladder_spectral_iv.py and controls_stage1.direct_accel unchanged.
Units: unit ladder (lengths and times in R, c_f = 1, K = 1); Lam = lambda/omega, mu = lambda R = Lam eps.
Usage: python growing_roots.py PART [args]
  PART = controls04 | locate04 | cert_a | cert_b | cert_c
Each part writes growing-roots-<PART>.json."""
import json
import math
import sys
import time

import numpy as np
import mpmath
from mpmath import iv

import ladder_spectral_iv as L
from controls_stage1 import direct_accel

# admitted boxes relayed by the PI (untwisted-certificate worker)
BOX04 = {"R": "0.4", "delta": ["2.214455363", "2.214456923"], "eps": ["0.8722131646", "0.8722132227"]}
BOXB0 = {"R": "1000", "delta": ["3.34503529238", "3.34503529306"], "eps": ["0.0138408142416", "0.0138408143198"]}
# adjudication float values (targets' starting points; corroboration only)
SEED_A = complex(0.54653445, 1.05200555)  # R = 0.4, q = 0, p = +1
SEED_B = complex(0.0689, 0.6064)          # R = 1000, q = 0, p = +1


def iv2(x):
    return [float(x.a), float(x.b)]


def ladder(box, N, Ns):
    return L.Ladder(iv.mpf(box["delta"]), iv.mpf(box["eps"]), R=iv.mpf(box["R"]), N=N, Ns=Ns, verbose=True)


def fdet(lad, z, q, p):
    d, dd, _ = L.det_and_deriv(lad, z.real, z.imag, q, p)
    return complex(float(d[0].mid), float(d[1].mid)), complex(float(dd[0].mid), float(dd[1].mid))


def newton(lad, z, q, p, it=40):
    for _ in range(it):
        f, df = fdet(lad, z, q, p)
        zn = z - f / df
        if abs(zn - z) < 1e-14:
            return zn
        z = zn
    return z


def krawczyk(lad, z, q, p, hws):
    def fd(re, im):
        d, dd, _ = L.det_and_deriv(lad, re, im, q, p)
        return d, dd
    tries = []
    for h in hws:
        t0 = time.time()
        ok, K, fm, dB = L.krawczyk_complex(fd, iv.mpf([z.real - h, z.real + h]), iv.mpf([z.imag - h, z.imag + h]))
        rec = {"half_width": h, "contracts": ok, "K_re": iv2(K[0]), "K_im": iv2(K[1]),
               "f_mid_re": iv2(fm[0]), "f_mid_im": iv2(fm[1]), "df_box_re": iv2(dB[0]), "df_box_im": iv2(dB[1]),
               "seconds": time.time() - t0}
        tries.append(rec)
        print("krawczyk h=%g ok=%s K=%s + i%s (%.1fs)" % (h, ok, rec["K_re"], rec["K_im"], rec["seconds"]), flush=True)
        if ok:
            return True, K, tries
    return False, None, tries


def certify(lad, seed, q, p, hws, label):
    out = {"label": label, "q": q, "p": p, "N": lad.N, "Ns": lad.Ns, "precompute_s": lad.precompute_seconds,
           "inst_tail": lad.inst_tail, "seed": [seed.real, seed.imag]}
    t0 = time.time()
    z = newton(lad, seed, q, p)
    out["float_location"] = [z.real, z.imag]
    out["newton_s"] = time.time() - t0
    print(label, "float root", z, flush=True)
    ok, K, tries = krawczyk(lad, z, q, p, hws)
    out["attempts"] = tries
    out["certified"] = ok
    if ok:
        eps = lad.eps
        Kre, Kim = K
        out["Lam_re"] = iv2(Kre)
        out["Lam_im"] = iv2(Kim)
        out["Re_Lam_positive"] = bool(Kre.a > 0)
        mu_re = Kre * eps
        out["Re_mu_unitR"] = iv2(mu_re)  # Re(lambda R)
        out["Re_lambda_physical"] = iv2(mu_re / lad.R)  # units c_f/(K/c_f^2) with K = c_f = 1
        out["Im_mu_unitR"] = iv2(Kim * eps)
    return out


def dump(name, obj):
    obj["module_sha256"] = __import__("hashlib").sha256(open(L.__file__, "rb").read()).hexdigest()
    obj["driver_sha256"] = __import__("hashlib").sha256(open(__file__, "rb").read()).hexdigest()
    json.dump(obj, open("growing-roots-%s.json" % name, "w"), indent=1, default=float)


# ------------------------------------------------------------------ controls at R = 0.4
def part_controls04():
    res = {"box": BOX04}
    d = iv.mpf(BOX04["delta"])
    e = iv.mpf(BOX04["eps"])
    # tail constants at this speed
    Cu, Cw = L.tail_constants(e)
    res["tail_constants"] = {"C_u": iv2(Cu), "C_w": iv2(Cw), "D_m": iv2(1 - iv.mpf(e.b) ** 2)}
    # C1: causal-root enclosures checked by strict sign change of Phi across a slightly widened enclosure
    rows = []
    for nu in (1, -1):
        for k in (0, 1, 2, 7, 60):
            if nu == 1 and k == 0:
                continue
            tau, _ = L.causal_root(nu, k, d, e)
            z = k * d
            off = 1e-8 * float(tau.mid) + float(tau.delta)

            def Phi(t):
                return t * t - z * z - 2 + 2 * nu * iv.cos(e * t)
            lo, hi = Phi(iv.mpf(tau.a) - off), Phi(iv.mpf(tau.b) + off)
            rows.append({"nu": nu, "k": k, "tau": iv2(tau), "width": float(tau.delta),
                         "sign_change": bool(lo.b < 0 < hi.a)})
    res["C1_roots_sign_change"] = rows
    print("C1", all(r["sign_change"] for r in rows), flush=True)
    # Lambert known case for the Krawczyk routine (z = 20 e^{-z})
    def fz(re, im):
        re, im = iv.mpf(re), iv.mpf(im)
        ex = iv.exp(-re)
        er, ei = ex * iv.cos(im), -ex * iv.sin(im)
        return (re - 20 * er, im - 20 * ei), (1 + 20 * er, 20 * ei)
    lam = []
    for br in (0, 1, -1):
        w = mpmath.lambertw(20, br)
        ok, K, _, _ = L.krawczyk_complex(fz, iv.mpf([float(w.real) + 3e-5 - 1e-3, float(w.real) + 3e-5 + 1e-3]),
                                         iv.mpf([float(w.imag) - 2e-5 - 1e-3, float(w.imag) - 2e-5 + 1e-3]))
        lam.append({"branch": br, "contracts": ok,
                    "contains_W": bool(K[0].a <= w.real <= K[0].b and K[1].a <= w.imag <= K[1].b)})
    res["lambert"] = lam
    print("Lambert", lam, flush=True)
    # C7: direct finite-difference evaluation of the law at the box midpoint (float), K = 600
    Kr = 600
    dm, em = float(d.mid), float(e.mid)
    lad = L.Ladder(iv.mpf(dm), iv.mpf(em), R=iv.mpf("0.4"), N=Kr, Ns=Kr, verbose=True)
    J = np.array([[0, -1, 0], [1, 0, 0], [0, 0, 0]], dtype=float)
    rng = np.random.default_rng(4)
    cases = []
    for (lr, li, q, p) in ((0.5465, 1.052, 0.0, 1), (0.51, 0.8, 0.0, -1), (0.9, -0.3, 0.6 * math.pi, 1),
                           (0.2, 2.0, math.pi, -1)):
        c = rng.normal(size=3) + 1j * rng.normal(size=3)
        M, info = lad.matrix(lr, li, q, p)
        lt = complex(lr, li) * em
        Kin = 0.4 * (lt * np.eye(3) + em * J) @ (lt * np.eye(3) + em * J)
        Mm = np.array([[complex(float(M[0][i][j].mid), float(M[1][i][j].mid)) for j in range(3)] for i in range(3)])
        pred = -(Mm - Kin) @ c
        rows = []
        for eta in (1e-4, 1e-5):
            fr = (direct_accel(dm, em, Kr, complex(lr, li), q, p, c, eta) - direct_accel(dm, em, Kr, complex(lr, li), q, p, c, -eta)) / (2 * eta)
            fi = (direct_accel(dm, em, Kr, complex(lr, li), q, p, -1j * c, eta) - direct_accel(dm, em, Kr, complex(lr, li), q, p, -1j * c, -eta)) / (2 * eta)
            rows.append({"eta": eta, "max_abs_diff": float(np.max(np.abs(fr + 1j * fi - pred))),
                         "max_abs_pred": float(np.max(np.abs(pred)))})
        cases.append({"Lam": [lr, li], "q_over_pi": q / math.pi, "p": p, "fd": rows})
        print("C7", cases[-1], flush=True)
    res["C7_direct_R0.4"] = cases
    # C3: symmetry roots on the admitted R = 0.4 box (N = Ns = 20000, sigma0 = 0 tails ~ eps/N)
    t0 = time.time()
    lad = ladder(BOX04, 20000, 20000)
    sc = 1 / (lad.R * lad.eps * lad.eps)
    zero, one = (iv.mpf(0), iv.mpf(0)), (iv.mpf(1), iv.mpf(0))
    sym = {"precompute_s": lad.precompute_seconds}
    for (name, lr, li, q, p, vec) in (
            ("axial_translation", 0, 0, 0, 1, [zero, zero, one]),
            ("rigid_rotation", 0, 0, 0, 1, [zero, one, zero]),
            ("radial_at_0_wrong", 0, 0, 0, 1, [one, zero, zero]),
            ("inplane_translation_Lam=-i", 0, -1, math.pi, -1, [one, (iv.mpf(0), iv.mpf(-1)), zero]),
            ("inplane_wrong_sector_p=+1", 0, -1, math.pi, 1, [one, (iv.mpf(0), iv.mpf(-1)), zero])):
        M, info = lad.matrix(lr, li, q, p)
        r = L.matvec(M, vec)
        comp = [[iv2(a * sc), iv2(b * sc)] for (a, b) in r]
        c0 = all(L.has0(a * sc) and L.has0(b * sc) for (a, b) in r)
        mx = max(max(abs(x[0][0]), abs(x[0][1]), abs(x[1][0]), abs(x[1][1])) for x in comp)
        sym[name] = {"contains_zero": c0, "max_abs_over_Reps2": mx, "tail": info["tail"]}
        print("C3", name, c0, "%.3g" % mx, flush=True)
    sym["seconds"] = time.time() - t0
    res["C3_symmetry_R0.4_box"] = sym
    dump("controls04", res)


def part_locate04():
    """float location (non-certified) of growing roots at R = 0.4, q = 0, both sectors."""
    lad = ladder(BOX04, 80, 20000)
    res = {"roots": []}
    for p in (1, -1):
        found = []
        for re0 in (0.3, 0.5, 0.7):
            for im0 in (0.0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8):
                try:
                    z = newton(lad, complex(re0, im0 + 1e-3), 0, p, it=30)
                except Exception:
                    continue
                f, _ = fdet(lad, z, 0, p)
                if z.real > 0.02 and abs(f) < 1e-10 and all(abs(z - w) > 1e-6 for w in found):
                    found.append(z)
        found.sort(key=lambda w: -w.real)
        res["roots"].append({"p": p, "roots": [[w.real, w.imag] for w in found]})
        print("p", p, found, flush=True)
    dump("locate04", res)


def part_cert_a():
    lad = ladder(BOX04, 80, 20000)
    out = certify(lad, SEED_A, 0, 1, [1e-6, 1e-5, 1e-4, 1e-3, 3e-3], "R=0.4 in-step q=0 p=+1")
    out["box"] = BOX04
    dump("cert_a", out)


def part_cert_b():
    lad = ladder(BOXB0, 4000, 50000)
    out = certify(lad, SEED_B, 0, 1, [1e-6, 1e-5, 1e-4, 1e-3], "R=1000 in-step q=0 p=+1")
    out["box"] = BOXB0
    dump("cert_b", out)


def part_cert_c():
    seed = complex(float(sys.argv[2]), float(sys.argv[3]))
    lad = ladder(BOX04, 80, 20000)
    out = certify(lad, seed, 0, -1, [1e-6, 1e-5, 1e-4, 1e-3, 3e-3], "R=0.4 alternating-rung q=0 p=-1")
    out["box"] = BOX04
    dump("cert_c", out)


if __name__ == "__main__":
    globals()["part_" + sys.argv[1]]()
