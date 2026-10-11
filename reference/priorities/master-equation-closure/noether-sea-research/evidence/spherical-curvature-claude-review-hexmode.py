#!/usr/bin/env python
"""Review-role instrument for the symmetric latitude mode of the stationary alternating hexagon (R = c_f = 1, K = g).
Linearized delayed equation (review derivation, frozen reference): lam'' = g [a0 lam(t) + a1 lam(t-1) + a2 lam(t-sqrt3) + a3 lam(t-2)]
with a0 = -7/8 - sqrt3/9, a1 = -2, a2 = -2/(3 sqrt3), a3 = -1/8. Characteristic function
  H(L) = L^2 - g (a0 + a1 e^{-L} + a2 e^{-sqrt3 L} + a3 e^{-2L}).
Controls before targets: K1 no-delay limit (all tau = 0) gives purely imaginary roots +- i sqrt(g (3 + 1/sqrt3));
K2 small-g root agrees with the asymptote (35/24) g +- i sqrt(g(3+1/sqrt3)) to O(g^2); N1 a wrong coefficient set changes the root.
Targets: dominant root (largest real part found by a Newton sweep from a grid) at g = 0.1, 1, 4, and sign of max real part on a g grid.
Authored by the review role alone; mpmath 30 digits; single-threaded, foreground."""
import json, os, sys, time
from mpmath import mp, mpf, mpc, sqrt, exp, findroot, pi

mp.dps = 30
A0 = -mpf(7) / 8 - sqrt(3) / 9; A1 = -mpf(2); A2 = -mpf(2) / (3 * sqrt(3)); A3 = -mpf(1) / 8
TAUS = (mpf(0), mpf(1), sqrt(3), mpf(2))
OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d, default=str)[:300])

def H(L, g, coeffs=(A0, A1, A2, A3), taus=TAUS):
    return L**2 - g * sum(c * exp(-L * t) for c, t in zip(coeffs, taus))

def newton_roots(g, coeffs=(A0, A1, A2, A3), taus=TAUS, re_range=(-3, 3), im_range=(0, 12), n_re=13, n_im=25):
    roots = []
    for i in range(n_re):
        for j in range(n_im):
            z0 = mpc(re_range[0] + (re_range[1] - re_range[0]) * i / (n_re - 1), im_range[0] + (im_range[1] - im_range[0]) * j / (n_im - 1))
            try:
                z = findroot(lambda L: H(L, g, coeffs, taus), z0, tol=1e-24, maxsteps=60)
            except Exception:
                continue
            if abs(H(z, g, coeffs, taus)) > 1e-18:
                continue
            if z.imag < -1e-12:
                z = z.conjugate()
            if not any(abs(z - r) < 1e-10 for r in roots):
                roots.append(z)
    roots.sort(key=lambda r: -r.real)
    return roots

# ---------------- controls ----------------
S = A0 + A1 + A2 + A3
g = mpf(1)
r0 = newton_roots(g, taus=(mpf(0),) * 4)
expect = sqrt(-g * S)
ok = all(abs(r.real) < 1e-20 for r in r0) and any(abs(r.imag - expect) < 1e-20 for r in r0) and abs(S + 3 + 1 / sqrt(3)) < 1e-25
rec("control_K1_no_delay_limit", {"S": str(S), "expected_S": "-3 - 1/sqrt3", "roots": [str(r) for r in r0], "expected_imag": str(expect), "pass": bool(ok)})
if not ok: sys.exit("K1 failed")
g = mpf("1e-3")
asym = mpc(mpf(35) / 24 * g, sqrt(g * (3 + 1 / sqrt(3))))
z = findroot(lambda L: H(L, g), asym, tol=1e-24)
# asymptote accuracy: real part O(g^2), imaginary part O(g^(3/2)) (first run at 00:47:23 UTC failed with a single over-tight tolerance 50 g^2 on the modulus; corrected here)
ok = abs(z.real - asym.real) < 50 * g**2 and abs(z.imag - asym.imag) < 5 * g**mpf("1.5") and abs(H(z, g)) < 1e-20
rec("control_K2_small_g_asymptote", {"g": str(g), "asymptote": str(asym), "root": str(z), "diff_real": str(abs(z.real - asym.real)), "diff_imag": str(abs(z.imag - asym.imag)), "tol_real": str(50 * g**2), "tol_imag": str(5 * g**mpf("1.5")), "pass": bool(ok)})
if not ok: sys.exit("K2 failed")
g = mpf(1)
zt = findroot(lambda L: H(L, g), mpc("0.5", "1.25"), tol=1e-24)
zw = findroot(lambda L: H(L, g, coeffs=(A0, -A1, A2, A3)), mpc("0.5", "1.25"), tol=1e-24)
ok = abs(zt - zw) > 1e-3 and abs(H(zt, g)) < 1e-20
rec("control_N1_wrong_coefficient_changes_root", {"root_true": str(zt), "root_with_a1_sign_flipped": str(zw), "pass": bool(ok)})
if not ok: sys.exit("N1 failed")
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})

# ---------------- targets ----------------
t0 = time.time()
res = {}
for gv in ("0.1", "1", "4"):
    g = mpf(gv); rs = newton_roots(g)
    res[gv] = {"dominant": str(rs[0]) if rs else None, "max_real_part": str(rs[0].real) if rs else None,
               "roots_found": [str(r) for r in rs[:8]], "n_found": len(rs), "residual_dominant": str(abs(H(rs[0], g))) if rs else None}
rec("target_dominant_roots", res)
sweep = []
for gv in ("0.001", "0.003", "0.01", "0.03", "0.1", "0.3", "1", "3", "10"):
    g = mpf(gv); rs = newton_roots(g, n_re=9, n_im=17)
    sweep.append({"g": gv, "max_real_part": str(rs[0].real) if rs else None, "dominant": str(rs[0]) if rs else None,
                  "asymptote_real": str(mpf(35) / 24 * g)})
rec("target_sign_sweep", {"rows": sweep, "all_positive": all(mpf(r["max_real_part"]) > 0 for r in sweep if r["max_real_part"] is not None)})
OUT["_elapsed_s"] = time.time() - t0
OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
json.dump(OUT, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "spherical-curvature-claude-review-hexmode-output.json"), "w"), indent=1, sort_keys=True, default=str)
print("elapsed", OUT["_elapsed_s"])
