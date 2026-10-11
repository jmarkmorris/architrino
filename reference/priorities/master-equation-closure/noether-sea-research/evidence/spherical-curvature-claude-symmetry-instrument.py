#!/usr/bin/env python
"""Symmetry-role instrument for the surface-only spherical 3:3 investigation (wave 1).

Run with ../.venv/bin/python only. Single-threaded, foreground, well under 120 s.

What it does, in this fixed order:
  1. CONTROLS (recorded before any target): (a) zero-interaction great circle,
     (b) fixed-K dilation check against the derived scaling law, (c) negative
     control for the preparation validator (radial velocity rejected), plus
     two known cases for the sub-instruments: two stationary opposite sources
     at distance d give |A| = K/d^2 (release-field evaluator), and the
     stationary six-pole configuration has whole-state symmetry group of order
     12, the stationary alternating hexagon order 24, while a one-member
     perturbed state has order 1 (symmetry finder). The finder enumerates the
     48 signed permutation matrices united with the 24 elements of D_6h about
     the z axis (66 distinct candidates); a symmetry outside that candidate set
     would be missed, so analytic derivation remains the authority.
Revision 2 (00:12 UTC): run 1 used signed permutations only and a wrong
physical conversion factor on one symbolic comparison line (c_f^5/R^3 instead
of c_f^4/R^2); run-1 output is retained as *-results-run1.json.
  2. TARGETS: release-state stationary-source field, tangent part, tangent
     work and speed derivative for the geometry/velocity patterns; symmetry
     group of each complete release state (signed permutation matrices x
     global polarity swap x label permutation); dimensionless table; the
     six-pole V1 second-order speed series checked against the symbolic
     closed form; hexagon tangent-sum and f'(0).

Release-field convention: at the release instant T=0 of an H1 history every
partner root samples the stationary past provided every chord exceeds R/4
(preparation duration R/(4 c_f)); the script checks that condition and refuses
to call the field "stationary-source" otherwise. c_f = 1, K = 1 throughout the
fixed-coupling comparison. Acceleration language only.
"""
import itertools
import json
import math
import sys

import numpy as np

TOL = 1e-10
RNG_SEED = 20261010
E = np.eye(3)
W_DIAG = np.array([1.0, 1.0, 1.0]) / math.sqrt(3.0)


def _json_default(o):
    if isinstance(o, (np.bool_,)):
        return bool(o)
    if isinstance(o, (np.integer,)):
        return int(o)
    if isinstance(o, (np.floating,)):
        return float(o)
    raise TypeError(f"not serializable: {type(o)}")


def unit(v):
    n = np.linalg.norm(v)
    if n == 0:
        raise ValueError("zero vector cannot be normalized")
    return v / n


# ---------------------------------------------------------------- validator
def validate_release_state(X, V, R, speed, tol=1e-12):
    """Accept only tangent velocities of the declared magnitude on the sphere."""
    problems = []
    for i, (x, v) in enumerate(zip(X, V)):
        if abs(np.linalg.norm(x) - R) > tol * max(1.0, R):
            problems.append(f"member {i} off sphere by {np.linalg.norm(x) - R:.3e}")
        n = x / R
        if abs(float(np.dot(v, n))) > tol:
            problems.append(f"member {i} velocity not tangent: v.n = {float(np.dot(v, n)):.3e}")
        if abs(np.linalg.norm(v) - speed) > tol:
            problems.append(f"member {i} speed {np.linalg.norm(v):.6f} != {speed}")
    return (len(problems) == 0), problems


# ---------------------------------------------------------- release field
def stationary_source_field(X, Q, K=1.0):
    """Canonical acceleration when every admitted root samples a stationary source.

    A_i = sum_{j != i} K sigma_ij (X_i - X_j)/|X_i - X_j|^3, sigma = sign(q_i q_j),
    transmitter factor D_t = c_f exactly (source at rest), weight 1.
    """
    N = len(X)
    A = np.zeros((N, 3))
    for i in range(N):
        for j in range(N):
            if i == j:
                continue
            r = X[i] - X[j]
            d = np.linalg.norm(r)
            A[i] += K * np.sign(Q[i] * Q[j]) * r / d**3
    return A


def stationary_source_jacobian(X, Q, i, K=1.0):
    """d A_i / d X_i for stationary sources (receiver moves, sources fixed)."""
    J = np.zeros((3, 3))
    for j in range(len(X)):
        if i == j:
            continue
        r = X[i] - X[j]
        d = np.linalg.norm(r)
        J += K * np.sign(Q[i] * Q[j]) * (np.eye(3) / d**3 - 3.0 * np.outer(r, r) / d**5)
    return J


def min_chord(X):
    N = len(X)
    return min(np.linalg.norm(X[i] - X[j]) for i in range(N) for j in range(i + 1, N))


def release_diagnostics(X, Q, V, R, K=1.0):
    """Tangent part, discarded radial part (diagnostic only), tangent work, speed derivative."""
    ok_station = min_chord(X) > R / 4.0 + 1e-12
    A = stationary_source_field(X, Q, K)
    rows = []
    for i in range(len(X)):
        n = X[i] / R
        An = float(np.dot(n, A[i]))
        PA = A[i] - An * n
        work = float(np.dot(V[i], A[i]))
        sp = float(np.linalg.norm(V[i]))
        rows.append({
            "member": i, "polarity": int(Q[i]),
            "A_tangent": PA.tolist(), "A_tangent_norm": float(np.linalg.norm(PA)),
            "A_radial_discarded": An, "tangent_work": work,
            "speed": sp, "dspeed_dT": (work / sp if sp > 0 else None),
        })
    return ok_station, rows


# -------------------------------------------------------- symmetry finder
def signed_permutation_matrices():
    mats = []
    for perm in itertools.permutations(range(3)):
        for signs in itertools.product([1, -1], repeat=3):
            M = np.zeros((3, 3))
            for col, (row, s) in enumerate(zip(perm, signs)):
                M[row, col] = s
            mats.append(M)
    return mats


def d6h_matrices():
    """The 24 elements of D_6h about the z axis: rotations by k pi/3, vertical reflections, z flip."""
    mats = []
    for k in range(6):
        th = k * math.pi / 3
        Rz = np.array([[math.cos(th), -math.sin(th), 0], [math.sin(th), math.cos(th), 0], [0, 0, 1]])
        for refl in (np.eye(3), np.diag([1.0, -1.0, 1.0])):
            for zf in (np.eye(3), np.diag([1.0, 1.0, -1.0])):
                mats.append(Rz @ refl @ zf)
    return mats


def candidate_matrices():
    """Signed permutations (full octahedral group, order 48) united with D_6h (order 24), duplicates removed."""
    mats = signed_permutation_matrices() + d6h_matrices()
    uniq = []
    for M in mats:
        if not any(np.linalg.norm(M - U) < 1e-9 for U in uniq):
            uniq.append(M)
    return uniq


def whole_state_symmetries(X, Q, V, tol=1e-9):
    """Elements (Qmat, eps, label permutation) with Q X_i = X_pi(i), Q V_i = V_pi(i), q_pi(i) = eps q_i."""
    N = len(X)
    found = []
    for M in candidate_matrices():
        for eps in (1, -1):
            pi = []
            good = True
            for i in range(N):
                xi = M @ X[i]
                vi = M @ V[i]
                match = None
                for j in range(N):
                    if (np.linalg.norm(xi - X[j]) < tol and np.linalg.norm(vi - V[j]) < tol
                            and Q[j] == eps * Q[i]):
                        match = j
                        break
                if match is None:
                    good = False
                    break
                pi.append(match)
            if good and len(set(pi)) == N:
                found.append((M, eps, tuple(pi)))
    # orbits of labels
    parent = list(range(N))

    def find(a):
        while parent[a] != a:
            parent[a] = parent[parent[a]]
            a = parent[a]
        return a

    for _, _, pi in found:
        for i in range(N):
            ra, rb = find(i), find(pi[i])
            if ra != rb:
                parent[ra] = rb
    orbits = {}
    for i in range(N):
        orbits.setdefault(find(i), []).append(i)
    orbit_list = sorted(orbits.values())
    descr = []
    for M, eps, pi in found:
        descr.append({"matrix": M.astype(int).tolist(), "det": int(round(np.linalg.det(M))),
                      "polarity_swap": eps == -1, "label_perm": list(pi)})
    return {"order": len(found), "orbits": orbit_list, "transitive": len(orbit_list) == 1,
            "elements": descr}


# ------------------------------------------------------------- geometries
def six_poles(R):
    X = np.array([R * E[0], R * E[1], R * E[2], -R * E[0], -R * E[1], -R * E[2]])
    Q = np.array([1, 1, 1, -1, -1, -1])
    return X, Q


def rot_dir(a):
    return unit(np.cross(W_DIAG, E[a]))


def cap_dir(a):
    return unit(W_DIAG - np.dot(W_DIAG, E[a]) * E[a])


def pattern_six_poles(name, R, v, rng=None):
    X, Q = six_poles(R)
    V = np.zeros((6, 3))
    if name == "V1_common_rotation":
        for a in range(3):
            V[a] = v * rot_dir(a)
            V[a + 3] = -v * rot_dir(a)
    elif name == "V2_opposite_caps":
        for a in range(3):
            V[a] = v * cap_dir(a)
            V[a + 3] = -v * cap_dir(a)
    elif name == "V3_copied_antipodal":
        for a in range(3):
            V[a] = v * rot_dir(a)
            V[a + 3] = v * rot_dir(a)
    elif name == "V4_counter_rotation":
        # positrino triangle rotates about +w with rate Omega, electrino triangle with -Omega
        omega = v / np.linalg.norm(np.cross(W_DIAG, X[0]))
        for a in range(3):
            V[a] = omega * np.cross(W_DIAG, X[a])
            V[a + 3] = -omega * np.cross(W_DIAG, X[a + 3])
    elif name == "V4prime_copied_caps":
        for a in range(3):
            V[a] = v * cap_dir(a)
            V[a + 3] = v * cap_dir(a)
    elif name == "V5_one_member_10deg":
        for a in range(3):
            V[a] = v * rot_dir(a)
            V[a + 3] = -v * rot_dir(a)
        # rotate member 0's direction by 10 degrees within its tangent plane
        n = X[0] / R
        d = rot_dir(0)
        e2 = np.cross(n, d)
        th = math.radians(10.0)
        V[0] = v * (math.cos(th) * d + math.sin(th) * e2)
    elif name == "V6_seeded_random":
        rng = np.random.default_rng(RNG_SEED) if rng is None else rng
        for i in range(6):
            n = X[i] / R
            while True:
                g = rng.standard_normal(3)
                t = g - np.dot(g, n) * n
                if np.linalg.norm(t) > 1e-3:  # recorded rule: zero tangent projection rejected
                    break
            V[i] = v * unit(t)
    else:
        raise ValueError(name)
    return X, Q, V


def hexagon(R, v, rotating=True):
    X = np.array([[R * math.cos(k * math.pi / 3), R * math.sin(k * math.pi / 3), 0.0] for k in range(6)])
    Q = np.array([(-1) ** k for k in range(6)])
    V = np.zeros((6, 3))
    if rotating:
        for k in range(6):
            V[k] = v * unit(np.cross(E[2], X[k]))
    return X, Q, V


def antiprism(R, v, alpha=math.pi / 6):
    X = np.zeros((6, 3))
    V = np.zeros((6, 3))
    Q = np.array([1, 1, 1, -1, -1, -1])
    for k in range(3):
        ph = 2 * math.pi * k / 3
        X[k] = R * np.array([math.cos(alpha) * math.cos(ph), math.cos(alpha) * math.sin(ph), math.sin(alpha)])
        e_alpha = np.array([-math.sin(alpha) * math.cos(ph), -math.sin(alpha) * math.sin(ph), math.cos(alpha)])
        V[k] = v * e_alpha
        X[k + 3] = -X[k]
        V[k + 3] = -V[k]
    return X, Q, V


def perturbed_poles(R, v, deg=5.0):
    X, Q = six_poles(R)
    th = math.radians(deg)
    Rz = np.array([[math.cos(th), -math.sin(th), 0], [math.sin(th), math.cos(th), 0], [0, 0, 1]])
    X[0] = Rz @ X[0]
    V = np.zeros((6, 3))
    for i in range(6):
        V[i] = v * unit(np.cross(W_DIAG, X[i]))  # rigid-rotation field about w, tangent by construction
    return X, Q, V


def seeded_placement(R, v, seed=RNG_SEED, min_sep=0.3):
    rng = np.random.default_rng(seed)
    Q = np.array([1, 1, 1, -1, -1, -1])
    tries = 0
    while True:
        tries += 1
        X = np.array([R * unit(rng.standard_normal(3)) for _ in range(6)])
        if min_chord(X) >= min_sep * R:
            break
    V = np.zeros((6, 3))
    for i in range(6):
        n = X[i] / R
        while True:
            g = rng.standard_normal(3)
            t = g - np.dot(g, n) * n
            if np.linalg.norm(t) > 1e-3:
                break
        V[i] = v * unit(t)
    return X, Q, V, tries


# ------------------------------------------------------------------ main
def main():
    out = {"controls": [], "known_cases": [], "targets": {}}
    R, v, K = 1.0, 0.5, 1.0

    # ---- CONTROL (a): zero-interaction great circle on unit sphere, speed 1/2
    T = 0.7
    Xc = np.array([math.cos(T / 2), math.sin(T / 2), 0.0])
    Vc = np.array([-0.5 * math.sin(T / 2), 0.5 * math.cos(T / 2), 0.0])
    A0 = np.zeros(3)  # K = 0
    n = Xc / 1.0
    acc_law = (A0 - np.dot(n, A0) * n) - np.dot(Vc, Vc) / 1.0 * n
    acc_exact = -Xc / 4.0
    ca = {"name": "(a) zero-interaction great circle, speed 1/2, unit sphere",
          "max_abs_diff": float(np.max(np.abs(acc_law - acc_exact))),
          "tangent_work": float(np.dot(Vc, A0)),
          "pass": bool(np.max(np.abs(acc_law - acc_exact)) < 1e-14 and abs(np.dot(Vc, A0)) < 1e-14)}
    out["controls"].append(ca)

    # ---- KNOWN CASE for the release-field evaluator: two opposite stationary sources at distance d
    d = 1.7
    Xk = np.array([[0.0, 0, 0], [d, 0, 0]])
    Qk = np.array([1, -1])
    Ak = stationary_source_field(Xk, Qk, K)
    kc = {"name": "two stationary opposite sources at distance d: |A| = K/d^2, attractive along chord",
          "d": d, "A_0": Ak[0].tolist(), "expected_norm": K / d**2,
          "pass": bool(abs(np.linalg.norm(Ak[0]) - K / d**2) < 1e-14 and Ak[0][0] > 0)}
    out["known_cases"].append(kc)

    # ---- CONTROL (b): fixed-K dilation R -> 2R for the six-pole V1 release state
    X1, Q1, V1 = pattern_six_poles("V1_common_rotation", 1.0, v)
    X2, Q2, V2 = pattern_six_poles("V1_common_rotation", 2.0, v)
    _, r1 = release_diagnostics(X1, Q1, V1, 1.0, K)
    _, r2 = release_diagnostics(X2, Q2, V2, 2.0, K)
    ratio = r2[0]["A_tangent_norm"] / r1[0]["A_tangent_norm"]
    g1, g2 = K / 1.0, K / 2.0
    cb = {"name": "(b) dilation R->2R at fixed K: |P A| ratio must be 1/4 = (g2/g1)*(R1/R2), delays double",
          "PA_norm_R1": r1[0]["A_tangent_norm"], "PA_norm_R2": r2[0]["A_tangent_norm"],
          "ratio": ratio, "expected": 0.25, "g_R1": g1, "g_R2": g2,
          "delay_range_R1": [0, 2.0], "delay_range_R2": [0, 4.0],
          "pass": bool(abs(ratio - 0.25) < 1e-12 and abs((g2 / g1) * (1.0 / 2.0) - 0.25) < 1e-15)}
    out["controls"].append(cb)

    # ---- CONTROL (c): negative control for the validator
    Xn = np.array([[1.0, 0, 0]])
    Vn = np.array([[1.0, 0, 0]])
    okn, probs = validate_release_state(Xn, Vn, 1.0, 1.0)
    cc = {"name": "(c) radial velocity (1,0,0) at (1,0,0) must be rejected", "accepted": okn,
          "problems": probs, "pass": (not okn)}
    out["controls"].append(cc)
    # and a positive known case for the validator
    okp, probsp = validate_release_state(X1, V1, 1.0, v)
    out["known_cases"].append({"name": "validator accepts six-pole V1 release state", "accepted": okp,
                               "problems": probsp, "pass": okp})

    # ---- KNOWN CASES for the symmetry finder: stationary six poles (order 12), one-member perturbed (order 1)
    Xs, Qs = six_poles(1.0)
    sym_stat = whole_state_symmetries(Xs, Qs, np.zeros((6, 3)))
    out["known_cases"].append({"name": "stationary six poles: whole-state group order 12 (S3 x Z2), transitive",
                               "order": sym_stat["order"], "transitive": sym_stat["transitive"],
                               "pass": sym_stat["order"] == 12 and sym_stat["transitive"]})
    X5, Q5, V5 = pattern_six_poles("V5_one_member_10deg", 1.0, v)
    sym5 = whole_state_symmetries(X5, Q5, V5)
    out["known_cases"].append({"name": "negative: one-member 10-degree perturbation has only the identity",
                               "order": sym5["order"], "orbits": sym5["orbits"], "pass": sym5["order"] == 1})

    Xh0, Qh0, Vh00 = hexagon(1.0, 1.0, rotating=False)
    symh00 = whole_state_symmetries(Xh0, Qh0, Vh00)
    out["known_cases"].append({"name": "stationary alternating hexagon: whole-state group order 24 (D_6h with swap on odd elements), transitive",
                               "order": symh00["order"], "transitive": symh00["transitive"],
                               "pass": symh00["order"] == 24 and symh00["transitive"]})
    out["candidate_matrix_count"] = len(candidate_matrices())

    all_pass = all(c["pass"] for c in out["controls"]) and all(k["pass"] for k in out["known_cases"])
    out["controls_all_pass_before_targets"] = all_pass
    if not all_pass:
        print(json.dumps(out, indent=1, default=_json_default))
        print("CONTROL FAILURE: targets not run", file=sys.stderr)
        sys.exit(2)

    # ================================================================ TARGETS
    # ---- dimensionless table
    table = []
    for Rr in [0.25, 0.5, 1.0, 2.0, 4.0, 10.0]:
        row = {"R": Rr, "curvature": 1.0 / Rr, "g": K / Rr, "delay_range": [0.0, 2.0 * Rr], "f0": {}, "ratio_interaction_to_centripetal": {}}
        for vv in [0.25, 0.5, 0.75, 1.0]:
            row["f0"][str(vv)] = vv / (2 * math.pi * Rr)
            row["ratio_interaction_to_centripetal"][str(vv)] = (K / Rr**2) / (vv**2 / Rr)
        table.append(row)
    out["targets"]["dimensionless_table"] = table

    # ---- six-pole patterns at reference radius: release field, symmetry, speed split
    patterns = ["V1_common_rotation", "V2_opposite_caps", "V3_copied_antipodal", "V4_counter_rotation",
                "V4prime_copied_caps", "V5_one_member_10deg", "V6_seeded_random"]
    six = {}
    for name in patterns:
        X, Q, V = pattern_six_poles(name, 1.0, 1.0)
        okv, pv = validate_release_state(X, V, 1.0, 1.0)
        st, rows = release_diagnostics(X, Q, V, 1.0, K)
        sym = whole_state_symmetries(X, Q, V)
        six[name] = {"validator_ok": okv, "validator_problems": pv, "stationary_source_release_ok": st,
                     "min_chord": min_chord(X), "velocities": V.tolist(),
                     "release_rows": rows,
                     "dspeed_values": [r["dspeed_dT"] for r in rows],
                     "symmetry_order": sym["order"], "orbits": sym["orbits"], "transitive": sym["transitive"],
                     "elements": sym["elements"]}
    # V3 == V4 as release states?
    _, _, V3 = pattern_six_poles("V3_copied_antipodal", 1.0, 1.0)
    _, _, V4 = pattern_six_poles("V4_counter_rotation", 1.0, 1.0)
    six["V3_equals_V4_release_state_max_diff"] = float(np.max(np.abs(V3 - V4)))
    out["targets"]["six_poles_R1_v1"] = six

    # ---- six-pole V1 second-order speed series, numeric vs symbolic, at (g,beta) = (1,1) and (1/10,1/2)
    series = []
    for (Rr, vv) in [(1.0, 1.0), (10.0, 0.5)]:
        X, Q, V = pattern_six_poles("V1_common_rotation", Rr, vv)
        A = stationary_source_field(X, Q, K)
        i = 0
        n = X[i] / Rr
        An = float(np.dot(n, A[i]))
        PA = A[i] - An * n
        J = stationary_source_jacobian(X, Q, i, K)
        vel = V[i]
        work0 = float(np.dot(vel, A[i]))
        # d/dT (v.A) at release on the stationary-source interval: xdd . A + v . J v
        xdd = PA - np.dot(vel, vel) / Rr * n
        dwork = float(np.dot(xdd, A[i]) + vel @ J @ vel)
        sp = float(np.linalg.norm(vel))
        # v'' = (|PA|^2 + v.J v - An v^2/R - v'^2)/v with v' = work0/v
        vprime = work0 / sp
        vsecond = (np.dot(PA, PA) + vel @ J @ vel - An * sp**2 / Rr - vprime**2) / sp
        g = K / (Rr * 1.0)
        beta = vv
        # symbolic (dimensionless): beta'' = g^2/beta + g beta/8 ; physical v'' = beta'' c_f^3 / R^2
        sym_vsecond = (g**2 / beta + g * beta / 8.0) / Rr**2
        sym_dwork = (g**2 + g * beta**2 / 8.0) / Rr**2  # physical d/dT(v.A) = (c_f^4/R^2) * (g^2 + g beta^2/8)
        series.append({"R": Rr, "v": vv, "g": g, "beta": beta,
                       "A_tangent_norm": float(np.linalg.norm(PA)), "A_radial_discarded": An,
                       "tangent_work_at_release": work0, "d_tangent_work_dT": dwork,
                       "symbolic_d_tangent_work_dT": sym_dwork,
                       "v_prime_at_release": vprime, "v_second_at_release": float(vsecond),
                       "symbolic_v_second": sym_vsecond,
                       "vJv": float(vel @ J @ vel), "symbolic_vJv": -K * sp**2 / (8 * Rr**3),
                       "match": bool(abs(vsecond - sym_vsecond) < 1e-12 and abs(dwork - sym_dwork) < 1e-12)})
    out["targets"]["six_pole_V1_second_order_series"] = series

    # ---- hexagon: stationary tangent sum, rotating V1 symmetry, f'(0)
    Xh, Qh, Vh0 = hexagon(1.0, 1.0, rotating=False)
    _, rows_h0 = release_diagnostics(Xh, Qh, Vh0, 1.0, K)
    symh0 = whole_state_symmetries(Xh, Qh, Vh0)
    Xh, Qh, Vh = hexagon(1.0, 1.0, rotating=True)
    _, rows_h = release_diagnostics(Xh, Qh, Vh, 1.0, K)
    symh = whole_state_symmetries(Xh, Qh, Vh)
    # f'(0): derivative of tangent (azimuthal) acceleration of member 0 with respect to its own angle, sources fixed
    J0 = stationary_source_jacobian(Xh, Qh, 0, K)
    t0 = unit(np.cross(E[2], Xh[0]))
    x0 = Xh[0]
    # f(Phi) = t(Phi) . A(x(Phi)); df/dPhi at 0 = t'.A + t.(J x') with x' = t, t' = -x
    fprime = float(np.dot(-x0, stationary_source_field(Xh, Qh, K)[0]) + t0 @ J0 @ t0)
    c_closed = 29.0 / 8.0 - 5.0 / (6 * math.sqrt(3.0))
    out["targets"]["hexagon_R1"] = {
        "stationary": {"max_tangent_norm": max(r["A_tangent_norm"] for r in rows_h0),
                       "radial_discarded_member0": rows_h0[0]["A_radial_discarded"],
                       "closed_form_radial": -5.0 / 4 + 1 / math.sqrt(3.0),
                       "symmetry_order": symh0["order"], "transitive": symh0["transitive"]},
        "rotating_V1_v1": {"release_rows": rows_h, "dspeed_values": [r["dspeed_dT"] for r in rows_h],
                           "symmetry_order": symh["order"], "orbits": symh["orbits"], "transitive": symh["transitive"],
                           "f_prime_0_numeric": fprime, "f_prime_0_closed_form": c_closed,
                           "match": abs(fprime - c_closed) < 1e-12},
    }

    # ---- antiprism G3 with meridional V2
    Xa, Qa, Va = antiprism(1.0, 1.0)
    oka, pa = validate_release_state(Xa, Va, 1.0, 1.0)
    sta, rows_a = release_diagnostics(Xa, Qa, Va, 1.0, K)
    syma = whole_state_symmetries(Xa, Qa, Va)
    out["targets"]["antiprism_G3_V2_R1_v1"] = {"validator_ok": oka, "stationary_source_release_ok": sta,
                                              "min_chord": min_chord(Xa), "release_rows": rows_a,
                                              "dspeed_values": [r["dspeed_dT"] for r in rows_a],
                                              "symmetry_order": syma["order"], "orbits": syma["orbits"],
                                              "transitive": syma["transitive"]}

    # ---- G4 perturbed poles with rigid-rotation field; G5 seeded placement with V6
    Xp, Qp, Vp = perturbed_poles(1.0, 1.0)
    okp4, pp4 = validate_release_state(Xp, Vp, 1.0, 1.0)
    stp, rows_p = release_diagnostics(Xp, Qp, Vp, 1.0, K)
    symp = whole_state_symmetries(Xp, Qp, Vp)
    out["targets"]["perturbed_poles_G4_V1_R1_v1"] = {"validator_ok": okp4, "stationary_source_release_ok": stp,
                                                    "min_chord": min_chord(Xp),
                                                    "dspeed_values": [r["dspeed_dT"] for r in rows_p],
                                                    "symmetry_order": symp["order"], "orbits": symp["orbits"]}
    # the naive choice (keep d_x at the rotated pole) must be rejected by the validator
    Xq, Qq = six_poles(1.0)
    th = math.radians(5.0)
    Rz = np.array([[math.cos(th), -math.sin(th), 0], [math.sin(th), math.cos(th), 0], [0, 0, 1]])
    Xq[0] = Rz @ Xq[0]
    Vq = np.zeros((6, 3))
    for a in range(3):
        Vq[a] = rot_dir(a)
        Vq[a + 3] = -rot_dir(a)
    okq, pq = validate_release_state(Xq, Vq, 1.0, 1.0)
    out["targets"]["perturbed_poles_G4_V1_R1_v1"]["naive_unrotated_direction_rejected"] = (not okq)
    out["targets"]["perturbed_poles_G4_V1_R1_v1"]["naive_problems"] = pq

    Xg, Qg, Vg, tries = seeded_placement(1.0, 1.0)
    okg, pg = validate_release_state(Xg, Vg, 1.0, 1.0)
    stg, rows_g = release_diagnostics(Xg, Qg, Vg, 1.0, K)
    symg = whole_state_symmetries(Xg, Qg, Vg)
    out["targets"]["seeded_G5_V6_R1_v1"] = {"seed": RNG_SEED, "placement_tries": tries, "validator_ok": okg,
                                           "stationary_source_release_ok": stg, "min_chord": min_chord(Xg),
                                           "positions": Xg.tolist(), "polarities": Qg.tolist(), "velocities": Vg.tolist(),
                                           "dspeed_values": [r["dspeed_dT"] for r in rows_g],
                                           "symmetry_order": symg["order"], "orbits": symg["orbits"]}

    print(json.dumps(out, indent=1, default=_json_default))


if __name__ == "__main__":
    main()
