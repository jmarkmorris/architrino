#!/usr/bin/env python
"""Review-role independent check of the D6 scalar blocks of the linearized delayed dynamics about the stationary
alternating hexagon (R = c_f = 1, coupling g). Derivation (review): per-hit linear kernel sigma[(I - 3 rhat rhat^T)/r^3](xi_i - xi_j(T-tau))
+ sigma (rhat rhat^T / r^2) xi_j'(T-tau) (transmitter-factor variation, 1/|D_t| ~ 1 + rhat.V_j), projection variation -a0 xi_i with
a0 = n.A0 = -5/4 + sqrt3/3, root-time shift second order (unperturbed velocities vanish). Fourier mode k with polarity sign absorbed:
  Delta_k^t(L) = L^2 - g D_t + g sum_m sigma_m e^{i k m pi/3 - L tau_m} (cM_m - L cN_m),   Delta_k^z(L) = L^2 - g D_z + g sum_m sigma_m e^{...} / r_m^3.
Coefficients computed here from the geometry (not copied). Controls before targets: K1 the (k=3,z) block equals the frozen hexmode
equation (same roots at g=1); K2 the rigid rotation about z is a zero of Delta_0^t at L=0 and about x,y a zero of Delta_1^z at L=0;
N1 dropping the projection-variation term breaks K2. Targets: largest-real-part roots of each block at g in {4,2,1,0.5,0.25,0.1}."""
import json, os, sys, time
from mpmath import mp, mpf, mpc, sqrt, exp, findroot, pi, cos, sin, matrix

mp.dps = 25
OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d, default=str)[:260])

phi = [m * pi / 3 for m in range(6)]
U = [matrix([cos(p), sin(p), 0]) for p in phi]
T = [matrix([-sin(p), cos(p), 0]) for p in phi]
Z = matrix([0, 0, 1])
sig = [1 if m % 2 == 0 else -1 for m in range(6)]  # sigma_0m = (-1)^m
def dot(a, b): return (a.T * b)[0]
a0 = sum(sig[m] * dot(U[0], U[0] - U[m]) / sqrt(dot(U[0] - U[m], U[0] - U[m]))**3 for m in range(1, 6))  # n.A0
cM_t = {}; cN_t = {}; cM_z = {}; tau = {}
Dt = -a0; Dz = -a0
for m in range(1, 6):
    r = U[0] - U[m]; rn = sqrt(dot(r, r)); rh = r / rn; tau[m] = rn
    K = lambda a, b: (dot(a, b) - 3 * dot(rh, a) * dot(rh, b)) / rn**3
    cM_t[m] = sig[m] * K(T[0], T[m]); cN_t[m] = sig[m] * dot(rh, T[0]) * dot(rh, T[m]) / rn**2
    cM_z[m] = sig[m] * K(Z, Z)
    Dt += sig[m] * K(T[0], T[0]); Dz += sig[m] * K(Z, Z)
def Delta(L, g, k, pol, proj=True):
    w = exp(1j * k * pi / 3)
    D = Dt if pol == "t" else Dz
    if not proj: D = D + a0
    s = 0
    for m in range(1, 6):
        if pol == "t": s += w**m * exp(-L * tau[m]) * (cM_t[m] - L * cN_t[m])
        else: s += w**m * exp(-L * tau[m]) * cM_z[m]
    return L**2 - g * D + g * s
def roots(g, k, pol, re_range=(-2, 2), im_range=(0, 10), n_re=9, n_im=21):
    rs = []
    for i in range(n_re):
        for j in range(n_im):
            z0 = mpc(re_range[0] + (re_range[1] - re_range[0]) * i / (n_re - 1), im_range[0] + (im_range[1] - im_range[0]) * j / (n_im - 1))
            try: z = findroot(lambda L: Delta(L, g, k, pol), z0, tol=1e-20, maxsteps=50)
            except Exception: continue
            if abs(Delta(z, g, k, pol)) > 1e-14: continue
            if z.imag < -1e-10: z = z.conjugate()
            if abs(z.imag) < 1e-10: z = mpc(z.real, 0)
            if not any(abs(z - r) < 1e-8 for r in rs): rs.append(z)
    rs.sort(key=lambda r: -r.real)
    return rs
rec("coefficients", {"a0": str(a0), "D_t": str(Dt), "D_z": str(Dz), "cM_t": {m: str(cM_t[m]) for m in cM_t}, "cN_t": {m: str(cN_t[m]) for m in cN_t}, "cM_z": {m: str(cM_z[m]) for m in cM_z}})
# K1: (k=3,z) equals the frozen hexmode equation: a0_hex = D_z, a1 = -2, a2 = -2/(3 sqrt3), a3 = -1/8
A0 = -mpf(7) / 8 - sqrt(3) / 9
k3 = [cM_z[1] * (-1) ** 1 * -1, ]  # placeholder
coef_k3 = {m: (exp(1j * 3 * pi / 3)**m * cM_z[m]).real for m in range(1, 6)}
ok = abs(Dz - A0) < 1e-20 and abs(coef_k3[1] + coef_k3[5] - 2) < 1e-20 and abs(coef_k3[2] + coef_k3[4] - 2 / (3 * sqrt(3))) < 1e-20 and abs(coef_k3[3] - mpf(1) / 8) < 1e-20
z1 = roots(1, 3, "z")
rec("control_K1_k3z_equals_frozen_hexmode_equation", {"D_z_minus_a0hex": str(Dz - A0), "coef_k3": {m: str(coef_k3[m]) for m in coef_k3}, "root_g1": str(z1[0]) if z1 else None, "expected_frozen": "0.514706 + 1.255779i", "pass": bool(ok and z1 and abs(z1[0] - mpc("0.514706107867543", "1.25577924267077")) < 1e-9)})
if not ok: sys.exit("K1 failed")
# K2: rigid rotations are zeros at L=0: (k=0,t) and (k=1,z)
v0 = abs(Delta(mpf(0), 1, 0, "t")); v1 = abs(Delta(mpf(0), 1, 1, "z"))
rec("control_K2_rigid_rotation_zeros", {"Delta_0t(0)": str(v0), "Delta_1z(0)": str(v1), "pass": bool(v0 < 1e-20 and v1 < 1e-20)})
if not (v0 < 1e-20 and v1 < 1e-20): sys.exit("K2 failed")
# N1: without projection variation K2 fails
w0 = abs(Delta(mpf(0), 1, 0, "t", proj=False))
rec("control_N1_projection_term_needed", {"Delta_0t(0)_without_proj": str(w0), "pass": bool(w0 > 0.1)})
if not w0 > 0.1: sys.exit("N1 failed")
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})
t0 = time.time()
res = {}
for gv in ("4", "2", "1", "0.5", "0.25", "0.1"):
    g = mpf(gv); allr = []
    for k in range(6):
        for pol in "tz":
            rs = roots(g, k, pol)
            for r in rs[:3]: allr.append((k, pol, r))
    allr.sort(key=lambda x: -x[2].real)
    res[gv] = {"largest": [(k, pol, str(r)) for k, pol, r in allr[:4]],
               "k3z": [str(r) for k, pol, r in allr if k == 3 and pol == "z"][:2],
               "k0z": [str(r) for k, pol, r in allr if k == 0 and pol == "z"][:2],
               "purely_imaginary": [(k, pol, str(r)) for k, pol, r in allr if abs(r.real) < 1e-9 and abs(r.imag) > 1e-9],
               "zero_roots": [(k, pol) for k, pol, r in allr if abs(r) < 1e-9]}
    print(gv, res[gv]["largest"][:2], "k3z", res[gv]["k3z"], "k0z", res[gv]["k0z"][:1], "imag", res[gv]["purely_imaginary"], "zeros", res[gv]["zero_roots"])
rec("target_blocks", res)
OUT["_elapsed_s"] = time.time() - t0; OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
json.dump(OUT, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "spherical-curvature-claude-review-hexspectrum-check-output.json"), "w"), indent=1, sort_keys=True, default=str)
print("elapsed", OUT["_elapsed_s"])
