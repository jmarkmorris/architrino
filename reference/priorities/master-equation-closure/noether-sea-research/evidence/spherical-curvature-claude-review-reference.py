#!/usr/bin/env python
"""Independent review instrument for the spherical-curvature investigation (review role, ramon-e-moore lens).

Authored separately from every subject script. Evaluates closed-form release-state accelerations of the
canonical Master Equation on a sphere (stationary sources, D_t = c_f, exact roots tau = distance / c_f),
the tangent projection, tangent work for declared velocity patterns, and the sub-wake monotonicity
certificate. Controls (known cases and negative controls) run BEFORE any target and the output records
that order. c_f = 1, K = 1 throughout. Exact arithmetic (sympy) for closed forms, binary64 otherwise.

Run: ../.venv/bin/python <this file>   (foreground, single-threaded, well under 120 s)
"""
import json, math, sys, time, hashlib, os
import sympy as sp

CF = sp.Integer(1)
K = sp.Integer(1)
OUT = {}
ORDER = []

class NonTangentVelocity(Exception):
    pass

class CertificateRefused(Exception):
    pass

def vec(*a):
    return sp.Matrix([sp.nsimplify(x) if not isinstance(x, sp.Basic) else x for x in a])

def per_hit(Xr, Xt, Vt, sigma, K=K, cf=CF):
    """Canonical per-hit acceleration at receiver position Xr from transmitter emission at Xt with velocity Vt."""
    r = Xr - Xt
    d = sp.sqrt(r.dot(r))
    if d == 0:
        raise ValueError("zero separation: law undefined")
    rhat = r / d
    Dt = cf - Vt.dot(rhat)
    if Dt == 0:
        raise ValueError("D_t = 0: fold, weight unbounded")
    return K * sigma * (1 / d**2) * (cf / sp.Abs(Dt)) * rhat, d, Dt

def stationary_total(i, positions, pol, R, K=K, cf=CF):
    """Total acceleration at receiver i from stationary partners (self root excluded: no self root for
    stationary or sub-wake history). Returns A, radial scalar, tangent vector, root list."""
    Xr = positions[i]
    n = Xr / R
    A = sp.zeros(3, 1)
    roots = []
    for j, Xt in enumerate(positions):
        if j == i:
            continue
        sigma = sp.Integer(1) if pol[i] == pol[j] else sp.Integer(-1)
        a, d, Dt = per_hit(Xr, Xt, sp.zeros(3, 1), sigma, K, cf)
        A += a
        roots.append({"j": j, "tau": str(sp.nsimplify(d / cf)), "tau_f": float(d / cf), "Dt": str(Dt), "sigma": int(sigma)})
    rad = sp.simplify(n.dot(A))
    tan = sp.simplify(A - rad * n)
    return sp.simplify(A), rad, tan, roots

def tangent_work(X, v, A, R):
    n = X / R
    nv = sp.simplify(n.dot(v))
    if nv != 0:
        raise NonTangentVelocity(f"velocity has normal component {nv}")
    P_A = A - (n.dot(A)) * n
    return sp.simplify(v.dot(P_A)), sp.simplify(v.dot(A))

def monotone_certificate(vmax, cf=1.0):
    """Sub-wake certificate: returns lower bound on f'. Refuses at or above wake speed."""
    lb = 1.0 - vmax / cf
    if lb <= 0:
        raise CertificateRefused(f"v_max={vmax} >= c_f: monotonicity bound {lb} not positive; all-root accounting required")
    return lb

def fl(m):
    return [float(x) for x in m]

def rec(name, data):
    ORDER.append(name)
    OUT[name] = data
    print(name, "->", json.dumps(data)[:300])

t0 = time.time()
R1 = sp.Integer(1)

# ---------------- CONTROLS FIRST ----------------
# K1 known case: receiver (+) at (1,0,0); one stationary unlike source at (-1,0,0).
# Expected: A = -K/(4R^2) xhat = (-1/4,0,0); tangent part 0; root tau = 2; D_t = 1.
pos = [vec(1, 0, 0), vec(-1, 0, 0)]
A, rad, tan, roots = stationary_total(0, pos, ["+", "-"], R1)
ok = (A == vec(sp.Rational(-1, 4), 0, 0)) and (tan == sp.zeros(3, 1)) and roots[0]["tau_f"] == 2.0 and roots[0]["Dt"] == "1"
rec("control_K1_two_opposite_unlike", {"A": fl(A), "radial": str(rad), "tangent": fl(tan), "roots": roots, "expected_A": [-0.25, 0, 0], "pass": bool(ok)})
if not ok:
    sys.exit("K1 failed")
# K1b: like source at (-1,0,0): expected (+1/4,0,0)
A, rad, tan, roots = stationary_total(0, pos, ["+", "+"], R1)
ok = (A == vec(sp.Rational(1, 4), 0, 0))
rec("control_K1b_two_opposite_like", {"A": fl(A), "expected_A": [0.25, 0, 0], "pass": bool(ok)})
if not ok:
    sys.exit("K1b failed")
# K2 known case: receiver (+) at (1,0,0), two unlike sources at (0,+-1,0): expected A = (-1/sqrt2, 0, 0), tangent 0.
pos = [vec(1, 0, 0), vec(0, 1, 0), vec(0, -1, 0)]
A, rad, tan, roots = stationary_total(0, pos, ["+", "-", "-"], R1)
ok = sp.simplify(A[0] + 1 / sp.sqrt(2)) == 0 and A[1] == 0 and A[2] == 0 and tan == sp.zeros(3, 1)
rec("control_K2_two_unlike_sides", {"A": fl(A), "expected_A": [-1 / math.sqrt(2), 0, 0], "roots": roots, "pass": bool(ok)})
if not ok:
    sys.exit("K2 failed")
# K3 known case: tangent work with a tangent velocity against a known acceleration: X=(1,0,0), v=(0,1,0), A=(5,2,0) -> work 2.
w_pa, w_a = tangent_work(vec(1, 0, 0), vec(0, 1, 0), vec(5, 2, 0), R1)
ok = (w_pa == 2) and (w_a == 2)
rec("control_K3_tangent_work", {"work_PA": str(w_pa), "work_A": str(w_a), "expected": 2, "pass": bool(ok)})
if not ok:
    sys.exit("K3 failed")
# N1 negative control: a velocity with a normal component must be rejected.
try:
    tangent_work(vec(1, 0, 0), vec(1, 1, 0), vec(5, 2, 0), R1)
    rec("control_N1_nontangent_velocity_rejected", {"pass": False, "note": "instrument accepted a non-tangent velocity"})
    sys.exit("N1 failed")
except NonTangentVelocity as e:
    rec("control_N1_nontangent_velocity_rejected", {"pass": True, "message": str(e)})
# N2 negative control: certificate must refuse at and above wake speed and accept below.
try:
    monotone_certificate(1.0)
    rec("control_N2_certificate_refuses_at_cf", {"pass": False})
    sys.exit("N2 failed")
except CertificateRefused as e:
    lb = monotone_certificate(0.5)
    rec("control_N2_certificate_refuses_at_cf", {"pass": True, "message": str(e), "accepted_lower_bound_at_v_half": lb})
# N3 negative control: zero separation must be rejected by per_hit.
try:
    per_hit(vec(1, 0, 0), vec(1, 0, 0), sp.zeros(3, 1), 1)
    rec("control_N3_zero_separation_rejected", {"pass": False})
    sys.exit("N3 failed")
except ValueError as e:
    rec("control_N3_zero_separation_rejected", {"pass": True, "message": str(e)})

rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "all_pass": True})

# ---------------- TARGETS ----------------
# (a) Six stationary poles, R=1: positrinos at +x,+y,+z; electrinos at -x,-y,-z.
six_pos = [vec(1, 0, 0), vec(0, 1, 0), vec(0, 0, 1), vec(-1, 0, 0), vec(0, -1, 0), vec(0, 0, -1)]
six_pol = ["+", "+", "+", "-", "-", "-"]
six = []
for i in range(6):
    A, rad, tan, roots = stationary_total(i, six_pos, six_pol, R1)
    six.append({"i": i, "X": fl(six_pos[i]), "pol": six_pol[i], "A_exact": [str(x) for x in A], "A": fl(A),
                "radial_exact": str(rad), "radial": float(rad), "tangent_exact": [str(x) for x in tan], "tangent": fl(tan),
                "tangent_norm_exact": str(sp.simplify(sp.sqrt(tan.dot(tan)))), "roots": roots})
rec("target_six_poles_R1_K1", {"members": six})

# Velocity patterns for the six poles at speed v (symbolic), axis a=(1,1,1)/sqrt3.
v = sp.symbols('v', positive=True)
a_axis = vec(1, 1, 1) / sp.sqrt(3)
def unit(m):
    return m / sp.sqrt(m.dot(m))
patterns = {}
for i in range(6):
    X = six_pos[i]
    n = X / R1
    A = sp.Matrix([sp.nsimplify(s) for s in six[i]["A_exact"]])
    zonal = unit(a_axis.cross(X))                       # V1 direction (common rotation about a)
    meridional_to_opposite_cap = unit((-a_axis if six_pol[i] == "+" else a_axis) - ((-a_axis if six_pol[i] == "+" else a_axis).dot(n)) * n)
    V1 = v * zonal
    V2 = v * meridional_to_opposite_cap
    # V3 copied antipodal with V2 base: electrino at -X copies the positrino velocity at X (V2 of the antipode)
    if six_pol[i] == "+":
        V3 = V2
    else:
        ip = six_pos.index(-X)
        Xp = six_pos[ip]; npp = Xp / R1
        V3 = v * unit((-a_axis) - ((-a_axis).dot(npp)) * npp)
    # V4 balanced counter-motion: s_i * omega a x X, s=+1 positrinos, -1 electrinos
    V4 = v * unit((1 if six_pol[i] == "+" else -1) * a_axis.cross(X))
    # V5: member 0 only, rotate V1 by +10 degrees toward the meridional (A_tan) direction; others V1
    th = sp.pi / 18
    V5 = v * (sp.cos(th) * zonal + sp.sin(th) * meridional_to_opposite_cap) if i == 0 else V1
    row = {}
    for name, V in [("V1", V1), ("V2", V2), ("V3_copied_V2base", V3), ("V4", V4), ("V5_member0_plus10deg", V5)]:
        w, _ = tangent_work(X, V, A, R1)
        row[name] = {"v_dir": [str(sp.nsimplify(x / v)) for x in V], "work_exact": str(w), "work_over_v": str(sp.simplify(w / v)),
                     "work_over_v_f": float(sp.simplify(w / v))}
    # coincidence check V3(V1 base) == V4
    V3b = V1 if six_pol[i] == "+" else v * unit(a_axis.cross(-X))
    row["V3_copied_V1base_equals_V4"] = bool(sp.simplify(V3b - V4) == sp.zeros(3, 1))
    patterns[i] = row
rec("target_six_poles_velocity_patterns_tangent_work", patterns)

# (b) Alternating equatorial hexagon at rest, R=1.
hex_pos = [vec(sp.cos(k * sp.pi / 3), sp.sin(k * sp.pi / 3), 0) for k in range(6)]
hex_pol = ["+", "-", "+", "-", "+", "-"]
hexr = []
for i in range(6):
    A, rad, tan, roots = stationary_total(i, hex_pos, hex_pol, R1)
    hexr.append({"i": i, "pol": hex_pol[i], "A_exact": [str(sp.simplify(x)) for x in A], "A": fl(A), "radial_exact": str(rad),
                 "radial": float(rad), "tangent": fl(tan), "tangent_is_zero": bool(sp.simplify(tan) == sp.zeros(3, 1)), "roots": roots})
rec("target_hexagon_rest_R1_K1", {"members": hexr, "radial_closed_form": "-5/4 + sqrt(3)/3", "radial_closed_form_f": -5 / 4 + math.sqrt(3) / 3})

# (c) Three meridional antipodal pairs at colatitude alpha about +z; positrinos at longitudes 0, 120, 240 deg.
alpha = sp.symbols('alpha', positive=True)
F_closed = sp.cos(alpha) / (sp.sqrt(3) * sp.sin(alpha)**2) + 3 * sp.sin(alpha) * sp.cos(alpha) / (4 - 3 * sp.sin(alpha)**2)**sp.Rational(3, 2)
g3 = []
for al in [sp.pi / 6, sp.pi / 4, sp.acos(1 / sp.sqrt(3)), sp.pi / 3, sp.pi / 2]:
    P = []
    for k in range(3):
        ph = 2 * sp.pi * k / 3
        P.append(vec(sp.sin(al) * sp.cos(ph), sp.sin(al) * sp.sin(ph), sp.cos(al)))
    pos3 = P + [-p for p in P]
    pol3 = ["+"] * 3 + ["-"] * 3
    A, rad, tan, roots = stationary_total(0, pos3, pol3, R1)
    thetahat = vec(sp.cos(al), 0, -sp.sin(al))
    phihat = vec(0, 1, 0)
    direct = sp.simplify(tan.dot(thetahat))
    zonal_part = sp.simplify(tan.dot(phihat))
    Fval = sp.simplify(F_closed.subs(alpha, al))
    g3.append({"alpha": str(al), "alpha_deg": float(al * 180 / sp.pi), "A_tan_meridional_direct": str(direct), "direct_f": float(direct),
               "F_closed_form": str(Fval), "F_closed_f": float(Fval), "zonal_part": str(zonal_part),
               "match": bool(sp.simplify(direct - Fval) == 0) or abs(float(direct) - float(Fval)) < 1e-12,
               "radial": float(rad), "roots": roots})
rec("target_three_meridional_pairs_colatitude_family", {"F_alpha": str(F_closed), "cases": g3,
    "note": "alpha=acos(1/sqrt3) is the six-pole configuration about axis (1,1,1)/sqrt3; alpha=pi/2 is the alternating hexagon"})

# (d) Preparation history theta(s) = u s (1+4s)^3 on [-1/4,0], 0 before: seam regularity, release speed, max speed.
s, u = sp.symbols('s u', real=True)
theta = u * s * (1 + 4 * s)**3
d1, d2, d3 = [sp.diff(theta, s, k) for k in (1, 2, 3)]
prep = {"theta": str(theta), "theta_0": str(theta.subs(s, 0)), "theta_prime_0": str(d1.subs(s, 0)),
        "seam_minus_quarter": {"theta": str(theta.subs(s, -sp.Rational(1, 4))), "d1": str(d1.subs(s, -sp.Rational(1, 4))),
                               "d2": str(d2.subs(s, -sp.Rational(1, 4))), "d3": str(sp.simplify(d3.subs(s, -sp.Rational(1, 4))))},
        "theta_prime_factored": str(sp.factor(d1)), "max_abs_speed_on_window_over_u": "1 (attained only at s=0)",
        "theta_extreme_at_s_minus_1_16": str(theta.subs(s, -sp.Rational(1, 16)) / u), "theta_prime_at_s_minus_1_8_over_u": str(d1.subs(s, -sp.Rational(1, 8)) / u)}
# numerical self-root check: member on great circle angle theta(s) at R=1, u in {1/2, 1}: f_self(tau) = tau - |X(0)-X(-tau)| > 0 on (0,2]
def Xgc(sv, uv):
    th = float(theta.subs({s: sv, u: uv})) if sv > -0.25 else 0.0
    return (math.cos(th), math.sin(th), 0.0)
selfcheck = {}
for uv in (0.5, 1.0):
    mn = float('inf'); arg = None
    for k in range(1, 20001):
        tau = 2.0 * k / 20000
        X0 = Xgc(0.0, uv); Xt = Xgc(-tau, uv)
        dist = math.dist(X0, Xt)
        fval = tau - dist
        if fval < mn:
            mn = fval; arg = tau
    selfcheck[str(uv)] = {"min_f_self_on_grid": mn, "at_tau": arg, "positive": mn > 0, "grid": 20000,
                          "note": "grid evidence only; the derived argument (chord < arc, speed <= u) is the certificate"}
prep["self_root_grid_check_R1"] = selfcheck
rec("target_preparation_history_regularity", prep)

# (e) Numerical table of tangent work at R=1,K=1 for v in {1/4,1/2,3/4,1}: six poles.
tab = {}
for vv in (sp.Rational(1, 4), sp.Rational(1, 2), sp.Rational(3, 4), sp.Integer(1)):
    tab[str(vv)] = {name: {str(i): float(sp.nsimplify(patterns[i][name]["work_over_v"]) * vv) for i in range(6)}
                    for name in ("V1", "V2", "V3_copied_V2base", "V4", "V5_member0_plus10deg")}
rec("target_six_poles_tangent_work_table", tab)

OUT["_order"] = ORDER
OUT["_elapsed_s"] = time.time() - t0
OUT["_python"] = sys.version
OUT["_sympy"] = sp.__version__
OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
here = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(here, "spherical-curvature-claude-review-reference-output.json"), "w") as fh:
    json.dump(OUT, fh, indent=1, sort_keys=True)
print("elapsed", OUT["_elapsed_s"])
