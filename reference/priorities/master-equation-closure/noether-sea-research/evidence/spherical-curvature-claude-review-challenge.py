#!/usr/bin/env python
"""Review-role reference instrument for the four challenge cells D1-D4 (symmetry wave 7, section c).  R = c_f = K = 1 (g = 1).
Authored by the review role alone from the cell DEFINITIONS; the designer's expected numbers were seen (exposure disclosed in the
reference) but nothing here is copied from them.  Roots by bisection on the monotone residual tau - chord(tau) on (0, 2] (sphere
certificate: all histories sub-wake), D_t from the actual emission velocity, weights 1/|D_t|, five-hit sums, tangent projections.
Controls before targets: K1 static limits (D4 at beta=0 -> six-pole static values; D2 at omega=0 -> stationary hexagon; D1's S(60deg)=0;
D3 release = F(pi/3) of the frozen reference); K2 rotation about z at omega=1/2 reproduces the frozen moving reference's B_phi(1/2)=0.807163
and the control (ii') pair value tau=1.8007344, D_t=1.2175654 for the antipodal rotating pair; N1 super-wake history refused; N2 non-tangent
velocity rejected.  Foreground, numpy, single thread, well under 120 s."""
import json, math, os, sys, time
import numpy as np
OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d, default=str)[:280])
class Refused(Exception): pass
def unit(v): return v / np.linalg.norm(v)
def rot(axis, ang):
    a = unit(np.asarray(axis, float)); c, s = math.cos(ang), math.sin(ang); K = np.array([[0, -a[2], a[1]], [a[2], 0, -a[0]], [-a[1], a[0], 0]])
    return np.eye(3) * c + s * K + (1 - c) * np.outer(a, a)

def root_delay(Xi, pos_fn, vmax):
    """Unique root of tau - |Xi - pos_fn(-tau)| on (0, 2]; refuses if vmax > 1 (no certificate)."""
    if vmax > 1 + 1e-12: raise Refused(f"history speed {vmax} > c_f: no uniqueness certificate")
    f = lambda t: t - np.linalg.norm(Xi - pos_fn(-t))
    a, b = 1e-12, 2.0 + 1e-9
    if f(a) >= 0 or f(b) < 0: raise RuntimeError("no bracket")
    for _ in range(200):
        m = 0.5 * (a + b)
        if f(m) < 0: a = m
        else: b = m
        if b - a < 1e-15: break
    return 0.5 * (a + b)

def receiver(Xi, qi, sources, vmax):
    """sources: list of (pos_fn(s), vel_fn(s), q). Returns A, roots list."""
    A = np.zeros(3); roots = []
    for pos_fn, vel_fn, qj in sources:
        tau = root_delay(Xi, pos_fn, vmax); Xt = pos_fn(-tau); Vt = vel_fn(-tau)
        r = Xi - Xt; rn = np.linalg.norm(r); rh = r / rn; Dt = 1.0 - float(Vt @ rh); sig = 1.0 if qi * qj > 0 else -1.0
        A += sig * rh / (rn * rn) / abs(Dt); roots.append({"tau": tau, "chord": rn, "Dt": Dt, "W": 1 / abs(Dt), "sigma": sig, "speed_at_emission": float(np.linalg.norm(Vt))})
    return A, roots

def split(Xi, A, v=None):
    n = unit(Xi); PA = A - (A @ n) * n
    out = {"A": A.tolist(), "radial_discarded": float(A @ n), "PA": PA.tolist(), "abs_PA": float(np.linalg.norm(PA))}
    if v is not None:
        if abs(v @ n) > 1e-12: raise Refused("non-tangent velocity")
        out["tangent_work"] = float(v @ PA); out["dspeed"] = float(v @ PA / np.linalg.norm(v)) if np.linalg.norm(v) > 0 else None
    return out

# ---------- D1 helpers: twisted planar hexagon at rest ----------
def G(delta): return math.cos(delta / 2) / (4 * math.sin(delta / 2) ** 2)
def S(phi): return sum(G(phi + 2 * math.pi * j / 3) for j in range(3))
def d1_config(phi):
    P = [np.array([math.cos(2 * math.pi * k / 3), math.sin(2 * math.pi * k / 3), 0.0]) for k in range(3)]
    E = [np.array([math.cos(phi + 2 * math.pi * k / 3), math.sin(phi + 2 * math.pi * k / 3), 0.0]) for k in range(3)]
    return P, E
def static_sources(members, i):
    return [((lambda s, X=X: X), (lambda s: np.zeros(3)), q) for j, (X, q) in enumerate(members) if j != i]

# ---------- D2 helpers: rigid rotation about tilted axis ----------
def d2_sources(axis, omega, i, X0, Q):
    srcs = []
    for j in range(6):
        if j == i: continue
        Xj = X0[j]
        pos = (lambda s, Xj=Xj: rot(axis, omega * s) @ Xj)
        vel = (lambda s, Xj=Xj: omega * np.cross(unit(axis), rot(axis, omega * s) @ Xj))
        srcs.append((pos, vel, Q[j]))
    return srcs

# ---------- D3 helpers: antiprism with long preparation ----------
def theta_prep(s, beta, L=1.0):
    if s <= -L: return 0.0, 0.0
    return beta * s * (1 + s / L) ** 3, beta * (1 + s / L) ** 2 * (1 + 4 * s / L)
def d3_members(beta, L=1.0, lat=math.pi / 6):
    mem = []
    for k in range(3):
        ph = 2 * math.pi * k / 3; n0 = np.array([math.cos(lat) * math.cos(ph), math.cos(lat) * math.sin(ph), math.sin(lat)])
        t0 = np.array([-math.sin(lat) * math.cos(ph), -math.sin(lat) * math.sin(ph), math.cos(lat)])  # toward +z pole
        mem.append((n0, t0, +1)); mem.append((-n0, -t0, -1))
    def mk(n0, t0):
        return ((lambda s, n0=n0, t0=t0: (lambda th: math.cos(th) * n0 + math.sin(th) * t0)(theta_prep(s, beta, L)[0])),
                (lambda s, n0=n0, t0=t0: (lambda th, dth: dth * (-math.sin(th) * n0 + math.cos(th) * t0))(*theta_prep(s, beta, L))))
    return mem, mk

# ---------- D4 helpers: six poles with uniform moving preparation ----------
W = unit(np.array([1.0, 1.0, 1.0]))
def d4_members(beta):
    E = np.eye(3); mem = []
    for a in range(3):
        d = unit(np.cross(W, E[a]))
        mem.append((E[a], d, +1)); mem.append((-E[a], -d, -1))  # electrino at -e_a with velocity -beta d_a (common rotation)
    def mk(n0, t0):
        return ((lambda s, n0=n0, t0=t0: math.cos(beta * s) * n0 + math.sin(beta * s) * t0),
                (lambda s, n0=n0, t0=t0: beta * (-math.sin(beta * s) * n0 + math.cos(beta * s) * t0)))
    return mem, mk

t0 = time.time()
# ================= CONTROLS =================
# K1a: D4 at beta = 0 reproduces the six-pole static release: |PA| = 1, radial -1/4 at P_x.
mem, mk = d4_members(0.0); srcs = [(*mk(n0, t0_), q) for (n0, t0_, q) in mem[1:]]
A, roots = receiver(mem[0][0], +1, srcs, 0.0); sp = split(mem[0][0], A)
ok = abs(sp["abs_PA"] - 1) < 1e-12 and abs(sp["radial_discarded"] + 0.25) < 1e-12 and all(abs(r["Dt"] - 1) < 1e-12 for r in roots)
rec("control_K1a_D4_static_limit", {"abs_PA": sp["abs_PA"], "radial": sp["radial_discarded"], "taus": sorted(round(r["tau"], 9) for r in roots), "pass": bool(ok)})
if not ok: sys.exit("K1a")
# K1b: D2 at omega = 0 reproduces the stationary hexagon: PA = 0, radial -5/4 + sqrt3/3.
X0 = [np.array([math.cos(k * math.pi / 3), math.sin(k * math.pi / 3), 0.0]) for k in range(6)]; Q = [(-1) ** k for k in range(6)]
A, roots = receiver(X0[0], Q[0], d2_sources([0, 0, 1], 0.0, 0, X0, Q), 0.0); sp = split(X0[0], A)
ok = sp["abs_PA"] < 1e-12 and abs(sp["radial_discarded"] - (-1.25 + math.sqrt(3) / 3)) < 1e-12
rec("control_K1b_D2_static_limit", {"abs_PA": sp["abs_PA"], "radial": sp["radial_discarded"], "pass": bool(ok)})
if not ok: sys.exit("K1b")
# K1c: S(60 deg) = 0 and the direct static five-hit sum at the alternating hexagon agrees (azimuthal 0).
ok = abs(S(math.pi / 3)) < 1e-12
P, E = d1_config(math.pi / 3); members = [(P[0], +1), (E[0], -1), (P[1], +1), (E[1], -1), (P[2], +1), (E[2], -1)]
A, _ = receiver(P[0], +1, static_sources(members, 0), 0.0); sp = split(P[0], A)
ok = ok and sp["abs_PA"] < 1e-12
rec("control_K1c_D1_S60_zero", {"S60": S(math.pi / 3), "abs_PA_direct": sp["abs_PA"], "pass": bool(ok)})
if not ok: sys.exit("K1c")
# K1d: D3 release (stationary past) reproduces F(pi/3) = 0.946031897... pole-ward magnitude, radial -0.339262.
mem, mk = d3_members(0.75); srcs = [(*mk(n0, t0_), q) for (n0, t0_, q) in mem[1:]]
A, roots = receiver(mem[0][0], +1, srcs, 0.75); sp = split(mem[0][0], A, v=0.75 * mem[0][1])
Fpi3 = math.cos(math.pi / 3) / (math.sqrt(3) * math.sin(math.pi / 3) ** 2) + 3 * math.sin(math.pi / 3) * math.cos(math.pi / 3) / (4 - 3 * math.sin(math.pi / 3) ** 2) ** 1.5
ok = abs(sp["abs_PA"] - Fpi3) < 1e-9 and all(abs(r["Dt"] - 1) < 1e-12 for r in roots)
rec("control_K1d_D3_release_equals_F_pi3", {"abs_PA": sp["abs_PA"], "F_pi3": Fpi3, "taus": sorted(round(r["tau"], 6) for r in roots), "pass": bool(ok)})
if not ok: sys.exit("K1d")
# K2: rotation about z at omega = 1/2 reproduces the frozen moving reference B_phi(1/2) = 0.807163 and control (ii') values.
A, roots = receiver(X0[0], Q[0], d2_sources([0, 0, 1], 0.5, 0, X0, Q), 0.5); sp = split(X0[0], A, v=0.5 * np.array([0, 1.0, 0]))
Bphi = float(A @ np.array([0, 1.0, 0])); anti = [r for r in roots if abs(r["chord"] - 1.8007344451794944) < 1e-6]
ok = abs(Bphi - 0.8071633399330955) < 1e-9 and anti and abs(anti[0]["Dt"] - 1.2175654295183547) < 1e-9
rec("control_K2_untilted_rotation_matches_frozen_moving_reference", {"B_phi": Bphi, "expected": 0.8071633399330955, "antipodal_root": anti[0] if anti else None, "pass": bool(ok)})
if not ok: sys.exit("K2")
# N1: super-wake history refused.
try:
    receiver(X0[0], Q[0], d2_sources([0, 0, 1], 1.5, 0, X0, Q), 1.5); rec("control_N1_superwake_refused", {"pass": False}); sys.exit("N1")
except Refused as e: rec("control_N1_superwake_refused", {"pass": True, "message": str(e)})
# N2: non-tangent velocity rejected.
try:
    split(X0[0], A, v=np.array([1.0, 0, 0])); rec("control_N2_nontangent_rejected", {"pass": False}); sys.exit("N2")
except Refused as e: rec("control_N2_nontangent_rejected", {"pass": True, "message": str(e)})
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})

# ================= TARGETS =================
# ---- D1: twist 50 deg, rest
phi = math.radians(50); P, E = d1_config(phi)
members = [(P[0], +1), (P[1], +1), (P[2], +1), (E[0], -1), (E[1], -1), (E[2], -1)]
d1 = {"S_50": S(phi), "G_terms": {"50": G(phi), "170": G(phi + 2 * math.pi / 3), "290": G(phi + 4 * math.pi / 3)}, "members": []}
for i, (X, q) in enumerate(members):
    A, roots = receiver(X, q, static_sources(members, i), 0.0); sp = split(X, A)
    phihat = np.array([-X[1], X[0], 0.0]); d1["members"].append({"i": i, "q": q, "azimuthal": float(A @ phihat), "z": float(A[2]), "radial": sp["radial_discarded"], "abs_PA": sp["abs_PA"], "chords": sorted(round(r["chord"], 6) for r in roots)})
# bootstrap window: twist >= 40 deg while psi <= 5 deg; a_m = S(40 deg); T_s = sqrt(2*psi_max/a_m); chord check d_min - 2 psi >= T_s
a_m = S(math.radians(40)); psi_max = math.radians(5); T_s = math.sqrt(2 * psi_max / a_m); dmin = 2 * math.sin(phi / 2)
d1["window"] = {"a_m_S40": a_m, "psi_max_rad": psi_max, "T_s": T_s, "d_min": dmin, "chord_margin": dmin - 2 * psi_max - T_s, "max_speed_on_window": a_m * T_s}
d1["S_values"] = {str(d): S(math.radians(d)) for d in (20, 30, 40, 50, 60, 70, 80)}
rec("target_D1", d1)
# ---- D2: tilted axis 30 deg, omega = 1/2
axis = np.array([math.sin(math.radians(30)), 0.0, math.cos(math.radians(30))]); omega = 0.5
d2 = {"members": []}
for i in range(6):
    Xi = X0[i]; vi = omega * np.cross(axis, Xi); speed = float(np.linalg.norm(vi))
    A, roots = receiver(Xi, Q[i], d2_sources(axis, omega, i, X0, Q), max(omega * math.sqrt(1 - (axis @ Xj) ** 2) for Xj in X0)); sp = split(Xi, A, v=vi)
    cosrho = float(axis @ Xi); rho = math.acos(cosrho); sinrho = math.sin(rho)
    e_pole = unit(axis - cosrho * Xi) if abs(sinrho) > 1e-12 else np.zeros(3)   # meridional direction toward the nearer... toward the axis's +n pole
    kin_mag = omega ** 2 * sinrho * abs(cosrho); kin_vec = omega ** 2 * sinrho * cosrho * e_pole  # tangent part of -omega^2 rho_vec: toward the pole on the member's side
    PA = np.array(sp["PA"]); resid = PA - kin_vec
    d2["members"].append({"k": i, "q": Q[i], "speed": speed, "rho_deg": math.degrees(rho), "kinematic_tangent_needed": kin_mag, "PA": PA.tolist(), "abs_PA": sp["abs_PA"],
                          "PA_along_pole_dir": float(PA @ e_pole), "PA_along_velocity": float(PA @ unit(vi)), "residual_vector": resid.tolist(), "residual_abs": float(np.linalg.norm(resid)),
                          "tangent_work": sp["tangent_work"], "dspeed": sp["dspeed"], "radial": sp["radial_discarded"], "roots": [{k_: round(v_, 7) for k_, v_ in r.items()} for r in roots]})
d2["Dt_range"] = [min(r["Dt"] for m in d2["members"] for r in m["roots"]), max(r["Dt"] for m in d2["members"] for r in m["roots"])]
d2["speed_max"] = max(m["speed"] for m in d2["members"])
rec("target_D2", d2)
# ---- D3: antiprism, long preparation, beta = 3/4
beta = 0.75; mem, mk = d3_members(beta)
d3 = {"members": []}
for i, (n0, t0_, q) in enumerate(mem):
    srcs = [(*mk(nn, tt), qq) for j, (nn, tt, qq) in enumerate(mem) if j != i]
    A, roots = receiver(n0, q, srcs, beta); sp = split(n0, A, v=beta * t0_)
    d3["members"].append({"i": i, "q": q, "abs_PA": sp["abs_PA"], "dspeed": sp["dspeed"], "tangent_work": sp["tangent_work"], "radial": sp["radial_discarded"], "taus": sorted(round(r["tau"], 6) for r in roots), "Dt": sorted(round(r["Dt"], 9) for r in roots)})
dnear = 2 * math.sin(math.pi / 3) * math.sin(math.pi / 3) * 0 + math.sqrt(4 - 3 * math.cos(math.pi / 6) ** 2)  # chord to nearest electrino: R*sqrt(4 - 3 sin^2(alpha)) with alpha = pi/3 colatitude
d3["window"] = {"d_nearest": dnear, "T_s_stationary": (dnear - 1.0) / (1 + beta), "Dt_bound_after_window": [1 - beta * math.sqrt(1 - dnear ** 2 / 4), 1 + beta * math.sqrt(1 - dnear ** 2 / 4)]}
Jaa_minus_Bn = 67 * math.sqrt(7) / 343 - 61 / 216
d3["second_derivative_release"] = {"beta2": beta * Jaa_minus_Bn, "coefficient_Jaa_minus_Bn": Jaa_minus_Bn}
rec("target_D3", d3)
# ---- D4: six poles, uniform moving preparation beta = 1/4
beta = 0.25; mem, mk = d4_members(beta)
d4 = {"members": []}
for i, (n0, t0_, q) in enumerate(mem):
    srcs = [(*mk(nn, tt), qq) for j, (nn, tt, qq) in enumerate(mem) if j != i]
    A, roots = receiver(n0, q, srcs, beta); sp = split(n0, A, v=beta * t0_)
    d4["members"].append({"i": i, "q": q, "abs_PA": sp["abs_PA"], "PA": sp["PA"], "dspeed": sp["dspeed"], "tangent_work": sp["tangent_work"], "radial": sp["radial_discarded"],
                          "roots": [{k_: round(v_, 9) for k_, v_ in r.items()} for r in roots]})
# one-variable root equations checked independently (receiver P_x): tau^2 = 2 - sqrt2 sin(beta tau), 2 + sqrt2 sin(beta tau), 2 + 2 cos(beta tau)
def solve(fn):
    a, b = 1e-9, 2.0
    for _ in range(200):
        m = 0.5 * (a + b)
        if fn(m) < 0: a = m
        else: b = m
    return 0.5 * (a + b)
d4["one_variable_roots_Px"] = {"near_(Py,Ez)": solve(lambda t: t * t - (2 - math.sqrt(2) * math.sin(beta * t))), "far_(Pz,Ey)": solve(lambda t: t * t - (2 + math.sqrt(2) * math.sin(beta * t))), "antipode_Ex": solve(lambda t: t * t - (2 + 2 * math.cos(beta * t)))}
rec("target_D4", d4)
OUT["_elapsed_s"] = time.time() - t0; OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
json.dump(OUT, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "spherical-curvature-claude-review-challenge-output.json"), "w"), indent=1, default=str)
print("elapsed", OUT["_elapsed_s"])
