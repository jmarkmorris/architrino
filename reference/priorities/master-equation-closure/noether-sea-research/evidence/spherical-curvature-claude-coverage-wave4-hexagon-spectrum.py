# Wave 4 copy of the frozen wave-3 script (only the box and the Newton start grid changed). Wave 3 (C): linear spectrum of the delayed tangent dynamics about the stationary alternating equatorial hexagon
# (a lawful equilibrium of the selected law with its stationary past). Dimensionless units R = c_f = 1; g = K/(R c_f^2).
# Linear stability about an equilibrium only: not a periodic orbit, not a six-body frequency.
# Run from the checkout root:
#   ../.venv/bin/python -I reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave3-hexagon-spectrum.py <out.json>
import numpy as np, json, sys, itertools, warnings
warnings.filterwarnings("ignore")  # overflow in exp only occurs for diverging Newton iterates, which are discarded

# ---- configuration
phi = np.array([k*np.pi/3 for k in range(6)])
U = np.stack([np.cos(phi), np.sin(phi), np.zeros(6)], 1)          # unit positions
TAN = np.stack([-np.sin(phi), np.cos(phi), np.zeros(6)], 1)       # azimuthal tangents
Z = np.array([0.0, 0.0, 1.0])
Q = np.array([(-1)**k for k in range(6)], float)                   # polarities, positrino at k = 0
E = [np.stack([TAN[i], Z], 1) for i in range(6)]                   # 3x2 tangent bases

def static_field(i):
    A = np.zeros(3)
    for j in range(6):
        if j == i: continue
        r = U[i]-U[j]; A += np.sign(Q[i]*Q[j]) * r/np.linalg.norm(r)**3
    return A
a0 = np.array([U[i] @ static_field(i) for i in range(6)])          # radial part at equilibrium (dimensionless, units K/R^2)
PA0 = max(np.linalg.norm(static_field(i) - a0[i]*U[i]) for i in range(6))

# ---- linearized blocks (derived): delta a_i = P_i sum_j sigma_ij [ Kmat_ij (xi_i - xi_j(T - tau_ij)) + (rhat rhat^T / r^2) xi_j'(T - tau_ij) ] - a0 xi_i
blocks_M = {}; blocks_N = {}; blocks_D = {}; tau = {}
for i in range(6):
    D = -a0[i]*np.eye(2)
    for j in range(6):
        if j == i: continue
        r = U[i]-U[j]; rn = np.linalg.norm(r); rh = r/rn; sig = np.sign(Q[i]*Q[j])
        Kmat = (np.eye(3) - 3*np.outer(rh, rh))/rn**3
        D += E[i].T @ (sig*Kmat) @ E[i]
        blocks_M[(i, j)] = E[i].T @ (sig*Kmat) @ E[j]
        blocks_N[(i, j)] = E[i].T @ (sig*np.outer(rh, rh)/rn**2) @ E[j]
        tau[(i, j)] = rn
    blocks_D[i] = D

def Delta(lam, g):
    """12x12 characteristic matrix: lam^2 I - g Dloc + g sum_{j != i} e^{-lam tau}(M_ij - lam N_ij)."""
    Dm = np.zeros((12, 12), complex)
    for i in range(6):
        Dm[2*i:2*i+2, 2*i:2*i+2] = lam**2*np.eye(2) - g*blocks_D[i]
        for j in range(6):
            if j == i: continue
            Dm[2*i:2*i+2, 2*j:2*j+2] = g*np.exp(-lam*tau[(i, j)])*(blocks_M[(i, j)] - lam*blocks_N[(i, j)])
    return Dm

# ---- Fourier (circulant) scalar reduction, derived from the same blocks: mode k, polarization t or z
# check the block-circulant property first
circ_ok = all(np.allclose(blocks_M[(i, (i+m) % 6)], blocks_M[(0, m)]) and np.allclose(blocks_N[(i, (i+m) % 6)], blocks_N[(0, m)]) and abs(tau[(i, (i+m) % 6)]-tau[(0, m)]) < 1e-14 for i in range(6) for m in range(1, 6))
tz_decoupled = all(abs(blocks_M[(0, m)][0, 1]) < 1e-14 and abs(blocks_M[(0, m)][1, 0]) < 1e-14 and abs(blocks_N[(0, m)][0, 1]) < 1e-14 and abs(blocks_N[(0, m)][1, 1]) < 1e-14 for m in range(1, 6)) and abs(blocks_D[0][0, 1]) < 1e-14
cM_t = {m: blocks_M[(0, m)][0, 0] for m in range(1, 6)}; cN_t = {m: blocks_N[(0, m)][0, 0] for m in range(1, 6)}
cM_z = {m: blocks_M[(0, m)][1, 1] for m in range(1, 6)}
D_t = blocks_D[0][0, 0]; D_z = blocks_D[0][1, 1]; tau_m = {m: tau[(0, m)] for m in range(1, 6)}
def f_scalar(lam, g, k, pol):
    w = np.exp(1j*k*np.pi/3)
    if pol == "t":
        return lam**2 - g*D_t + g*sum(w**m*np.exp(-lam*tau_m[m])*(cM_t[m] - lam*cN_t[m]) for m in range(1, 6))
    return lam**2 - g*D_z + g*sum(w**m*np.exp(-lam*tau_m[m])*cM_z[m] for m in range(1, 6))
def df_scalar(lam, g, k, pol):
    w = np.exp(1j*k*np.pi/3)
    if pol == "t":
        return 2*lam + g*sum(w**m*np.exp(-lam*tau_m[m])*(-tau_m[m]*(cM_t[m] - lam*cN_t[m]) - cN_t[m]) for m in range(1, 6))
    return 2*lam + g*sum(w**m*np.exp(-lam*tau_m[m])*(-tau_m[m]*cM_z[m]) for m in range(1, 6))

# ---- root finding in a rectangle: winding number (argument principle by phase unwrapping) + Newton from a grid
BOX = (-4.0, 10.0, -10.0, 10.0)   # Re min, Re max, Im min, Im max (wave 4, Codex correction: box [-4, 6] requested; the right edge is set to 10 so that the derived outside bound below is covered at every g)
# Derived outside bound: for Re lambda >= 0, |e^{-lambda tau}| <= 1, so a root satisfies |lambda|^2 <= g(|D| + sum|a_m| + |lambda| sum|b_m|),
# i.e. |lambda| <= [g B + sqrt(g^2 B^2 + 4 g (|D| + A))]/2 with A = sum|cM|, B = sum|cN| (B = 0 for z blocks). Every root with Re >= 0 lies inside that disk.
def outside_bound(g, pol):
    if pol == "t": A = sum(abs(cM_t[m]) for m in range(1, 6)); B = sum(abs(cN_t[m]) for m in range(1, 6)); Dd = abs(D_t)
    else:          A = sum(abs(cM_z[m]) for m in range(1, 6)); B = 0.0; Dd = abs(D_z)
    return (g*B + np.sqrt(g*g*B*B + 4*g*(Dd + A)))/2
def winding(g, k, pol, box=BOX, n=4000):
    a, b, c, d = box
    pts = np.concatenate([a + 1j*np.linspace(c, d, n), np.linspace(a, b, n) + 1j*d, b + 1j*np.linspace(d, c, n), np.linspace(b, a, n) + 1j*c])
    vals = np.array([f_scalar(p, g, k, pol) for p in pts])
    ph = np.unwrap(np.angle(vals))
    # closed contour: add the step back to the start
    total = ph[-1] - ph[0] + np.angle(vals[0]/vals[-1])
    # the contour as built (left edge up, top left-to-right, right edge down, bottom right-to-left) is clockwise: negate
    return int(round(-total/(2*np.pi))), float(min(abs(vals)))
def newton_roots(g, k, pol, box=BOX):
    a, b, c, d = box; roots = []
    for re in np.linspace(a, b, 21):
        for im in np.linspace(c, d, 41):
            lam = complex(re, im)
            for it in range(60):
                fv = f_scalar(lam, g, k, pol); dv = df_scalar(lam, g, k, pol)
                if dv == 0: break
                step = fv/dv; lam -= step
                if abs(step) < 1e-14 or abs(lam) > 1e3 or not np.isfinite(lam): break
            if abs(f_scalar(lam, g, k, pol)) < 1e-10 and a-1e-9 <= lam.real <= b+1e-9 and c-1e-9 <= lam.imag <= d+1e-9:
                if not any(abs(lam-r) < 1e-7 for r in roots): roots.append(lam)
    return sorted(roots, key=lambda z: (-z.real, z.imag))
def multiplicity_at_zero(g, k, pol):
    f0 = abs(f_scalar(0.0, g, k, pol)); d0 = abs(df_scalar(0.0, g, k, pol))
    return 0 if f0 > 1e-12 else (1 if d0 > 1e-12 else 2)

out = {"units": "dimensionless, R = c_f = 1, g = K/(R c_f^2); lambda in c_f/R; omega_hat = Im lambda; f = g*omega_hat/(2 pi) at K = 1 (R = 1/g)",
       "equilibrium": {"radial_part_nA_each_member": a0.tolist(), "max_tangent_acceleration_at_equilibrium": float(PA0)},
       "scalar_coefficients": {"D_t": float(D_t), "D_z": float(D_z), "tau_m": {str(m): float(tau_m[m]) for m in tau_m}, "cM_t": {str(m): float(cM_t[m]) for m in cM_t}, "cN_t": {str(m): float(cN_t[m]) for m in cN_t}, "cM_z": {str(m): float(cM_z[m]) for m in cM_z}},
       "controls": [], "results": {}}

# ---- controls BEFORE target
# (1) g -> 0: Delta = lambda^2 I, det has a root at 0 of multiplicity 24 (12 degrees of freedom, second order); each scalar f = lambda^2.
ok1 = all(abs(f_scalar(0.37+0.2j, 0.0, k, pol) - (0.37+0.2j)**2) < 1e-14 for k in range(6) for pol in "tz") and np.allclose(Delta(0.37+0.2j, 0.0), (0.37+0.2j)**2*np.eye(12))
out["controls"].append({"name": "(1) g = 0: Delta(lambda) = lambda^2 I exactly (lambda = 0 with multiplicity 12 per degree of freedom, 24 for det); every scalar block reduces to lambda^2", "pass": bool(ok1)})
# (2) known case derived by hand: a rigidly rotated hexagon is again an equilibrium, so the three rigid rotations are null vectors of Delta(0) for every g:
#     rotation about z -> zeta_i^t = 1 (k = 0, t); rotation about x, y -> zeta_i^z = (e_x x u_i).z = sin(phi_i), (e_y x u_i).z = -cos(phi_i) (k = +/-1, z).
rots = []
for axis in np.eye(3):
    v = np.zeros(12)
    for i in range(6):
        xi = np.cross(axis, U[i]); v[2*i:2*i+2] = E[i].T @ xi
    rots.append(v/np.linalg.norm(v))
res2 = [float(np.linalg.norm(Delta(0.0, g) @ v)) for g in (4, 1, 0.1) for v in rots]
ok2 = max(res2) < 1e-12 and abs(f_scalar(0.0, 1.0, 0, "t")) < 1e-12 and abs(f_scalar(0.0, 1.0, 1, "z")) < 1e-12 and abs(f_scalar(0.0, 1.0, 5, "z")) < 1e-12
out["controls"].append({"name": "(2) known (hand-derived): the three rigid rotations of the hexagon are null vectors of Delta(0) at g = 4, 1, 1/10, and the scalar blocks (k=0,t), (k=+-1,z) vanish at lambda = 0; this tests the projection-variation term -a0 and the kernel assembly", "pass": bool(ok2), "max_residual": float(max(res2))})
# (3) negative: dropping the projection-variation term (a0 -> 0) must break control (2).
def Delta_noa0(lam, g):
    Dm = Delta(lam, g).copy()
    for i in range(6): Dm[2*i:2*i+2, 2*i:2*i+2] += g*(-a0[i])*np.eye(2)  # remove the -a0 term from Dloc (it entered as -g*(-a0))
    return Dm
res3 = max(float(np.linalg.norm(Delta_noa0(0.0, 1.0) @ v)) for v in rots)
out["controls"].append({"name": "(3) negative: without the projection-variation term the rotation null vectors fail (residual must be order a0 = 0.67)", "pass": bool(res3 > 0.1), "residual": res3})
# (4) structure: block-circulant and t/z decoupling (derived expectations), and full-matrix vs scalar determinant agreement at a random lambda
lam_test = 0.3+1.1j; g_test = 1.0
detfull = np.linalg.det(Delta(lam_test, g_test)); detscal = np.prod([f_scalar(lam_test, g_test, k, pol) for k in range(6) for pol in "tz"])
ok4 = circ_ok and tz_decoupled and abs(detfull-detscal)/abs(detscal) < 1e-9
out["controls"].append({"name": "(4) structure: blocks are circulant in the rotating tangent frames, t and z decouple, and det(full 12x12) equals the product of the 12 scalar blocks at a test point", "pass": bool(ok4), "rel_diff": float(abs(detfull-detscal)/abs(detscal))})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL")
for c in out["controls"]: print("  ", "pass" if c["pass"] else "FAIL", c["name"])
print("equilibrium radial part n.A (units K/R^2):", a0[0], " max |P A| at equilibrium:", PA0)
print("scalar coefficients: D_t", D_t, "D_z", D_z, "cM_t", cM_t, "cN_t", cN_t, "cM_z", cM_z)
if not out["controls_all_pass"]: json.dump(out, open(sys.argv[1], "w"), indent=1); sys.exit(2)

# ---- target: g in {4, 2, 1, 1/2, 1/4, 1/10}
for g in (4, 2, 1, 0.5, 0.25, 0.1):
    rec = {"g": g, "R_at_K1": 1/g, "modes": [], "all_roots": []}
    for k in range(6):
        for pol in "tz":
            wn, minabs = winding(g, k, pol)
            roots = newton_roots(g, k, pol)
            m0 = multiplicity_at_zero(g, k, pol)
            # verify each root against the full matrix: smallest singular value of Delta(lambda) must vanish
            sv = [float(np.linalg.svd(Delta(r, g), compute_uv=False)[-1]) for r in roots]
            rec["modes"].append({"k": k, "pol": pol, "winding_count": wn, "newton_count": len(roots), "count_match": wn == len(roots), "min_abs_on_boundary": minabs,
                                 "roots": [[r.real, r.imag] for r in roots], "full_matrix_min_singular_value": sv, "zero_root_multiplicity": m0})
            for r in roots: rec["all_roots"].append([k, pol, r.real, r.imag])
    allr = sorted(rec["all_roots"], key=lambda x: -x[2])
    rec["largest_real_part_roots"] = allr[:6]
    rec["unstable_count"] = sum(1 for x in allr if x[2] > 1e-8)
    rec["purely_imaginary"] = [x for x in allr if abs(x[2]) < 1e-8 and abs(x[3]) > 1e-8]
    rec["count_matches_all"] = all(m["count_match"] for m in rec["modes"])
    rec["omega_hat_of_dominant"] = [abs(x[3]) for x in allr[:3]]
    rec["physical_frequency_f_of_dominant_at_K1"] = [g*abs(x[3])/(2*np.pi) for x in allr[:3]]
    rec["physical_growth_rate_of_dominant_at_K1"] = [g*x[2] for x in allr[:3]]
    lat = [m for m in rec["modes"] if m["k"] == 0 and m["pol"] == "z"][0]
    rec["latitude_mode_k0_z_roots"] = lat["roots"]
    rec["outside_bound_Re_nonneg"] = {"t": float(outside_bound(g, "t")), "z": float(outside_bound(g, "z"))}
    rec["box_covers_bound"] = bool(max(outside_bound(g, "t"), outside_bound(g, "z")) <= min(BOX[1], BOX[3]))
    out["results"][str(g)] = rec
    print(f"   latitude mode (k=0, z) roots: {[(round(r[0],5), round(r[1],5)) for r in lat['roots']]}; per-mode counts (winding/newton): " + " ".join(f"{m['k']}{m['pol']}:{m['winding_count']}/{m['newton_count']}" for m in rec["modes"]))
    print(f"   outside bound for Re>=0 roots: t {outside_bound(g, 't'):.3f}, z {outside_bound(g, 'z'):.3f}; box covers it: {max(outside_bound(g, 't'), outside_bound(g, 'z')) <= min(BOX[1], BOX[3])}")
    print(f"g={g}: counts match {rec['count_matches_all']}; roots in box {len(allr)}; unstable (Re>0) {rec['unstable_count']}; largest Re roots: " + ", ".join(f"[k={x[0]},{x[1]}] {x[2]:+.5f}{x[3]:+.5f}i" for x in allr[:4]) + f"; purely imaginary: {len(rec['purely_imaginary'])}")
json.dump(out, open(sys.argv[1], "w"), indent=1)
