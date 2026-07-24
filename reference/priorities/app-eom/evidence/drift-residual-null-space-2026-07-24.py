#!/usr/bin/env python3
"""
Rigid-translation residual of the canonical per-hit acceleration law.

Companion to:
  reference/priorities/app-eom/analysis-master-equation-review-open-items-2026-07-24.md

PROVENANCE WARNING -- READ BEFORE CITING
----------------------------------------
This script contains BOTH the AAA evaluator and the observer-level comparison
instrument, authored together, in one change, by one author.  Under the
Evidence Independence rule in AGENTS.md that is NOT independent agreement.
Every number this script prints is graded `measured, non-independent`.

It is a lead generator.  It does not certify anything.  The closed forms it
supports are separately checkable by hand and are graded `derived`; the
comparison rows are present only to locate discrepancies, never to establish
that the canonical law is right or wrong.

Layer discipline: the observer-level comparison enters in role (b)/(c) only --
recovery target and comparison instrument.  It is never a premise and never
justifies the form of W^acc.  Everything below is acceleration-first; no mass,
no momentum, no force.

Normalized units: c_f = 1 throughout, per AGENTS.md.

Requires: numpy, scipy.  Run with the shared venv:
  "${AAA_VENV:-../.venv}/bin/python" drift-residual-null-space-2026-07-24.py
"""

import numpy as np
from scipy.optimize import brentq

CF = 1.0


# ---------------------------------------------------------------- causal root

def causal_root(x_r, traj_j, t_r, horizon=1e5):
    """Solve || X_r(T_r) - X_j(T_t) || - c_f (T_r - T_t) = 0 for T_t < T_r.

    Returns the emission time of the single active root for the
    inertial-transmitter configurations used here.
    """
    g = lambda t_t: np.linalg.norm(x_r - traj_j(t_t)) - CF * (t_r - t_t)
    return brentq(g, t_r - horizon, t_r - 1e-13, xtol=1e-15, rtol=1e-15)


def root_residual(x_r, traj_j, t_r, t_t):
    """Independent check on the root finder: the constraint it claims to solve.

    Deliberately NOT expressed via the acceleration evaluator, so the two are
    not validating each other.
    """
    return np.linalg.norm(x_r - traj_j(t_t)) - CF * (t_r - t_t)


# ------------------------------------------------------- canonical AAA kernel

def per_hit_acceleration(x_r, traj_j, vel_j, t_r, sigma):
    """Canonical per-hit acceleration, kappa = |q_i q_j| = 1.

        A = kappa sigma (|q_i q_j| / r^2) W^acc rhat,   W^acc = c_f / |D_t|

    Transmitter-side weight only.  Receiver velocity does not appear, per the
    stated axiom.
    """
    t_t = causal_root(x_r, traj_j, t_r)
    assert abs(root_residual(x_r, traj_j, t_r, t_t)) < 1e-10, "root residual"
    r_vec = x_r - traj_j(t_t)
    r = np.linalg.norm(r_vec)
    n_hat = r_vec / r
    d_t = CF - np.dot(n_hat, vel_j(t_t))
    w_acc = CF / abs(d_t)
    return sigma / r**2 * w_acc * n_hat


# --------------------------------------- alternative lines of action (Item 3)

def per_hit_extrapolated(x_r, traj_j, vel_j, t_r, sigma):
    """Transmitter-side-only variant: line of action from the INERTIALLY
    EXTRAPOLATED emission point X_j(T_t) + V_j(T_t)(T_r - T_t).

    Uses only data the wake already carries (emission point and emission
    velocity).  Not the transmitter's actual present position, so no acausal
    information is used.  Present to exhibit the three-way tension, not as a
    proposed replacement law.
    """
    t_t = causal_root(x_r, traj_j, t_r)
    r_vec = x_r - traj_j(t_t)
    r = np.linalg.norm(r_vec)
    n_hat = r_vec / r
    beta = vel_j(t_t) / CF
    k = 1.0 - np.dot(n_hat, beta)
    return sigma * (1.0 - np.dot(beta, beta)) * (n_hat - beta) / (k**3 * r**2)


def comparison_instrument(x_r, traj_j, vel_j, t_r, v_receiver):
    """Observer-level comparison target, INCLUDING a receiver-velocity term.

    Role (b)/(c) only.  Present solely to locate where the canonical law and
    the recovery target diverge.  Not a premise anywhere in the theory.
    """
    t_t = causal_root(x_r, traj_j, t_r)
    r_vec = x_r - traj_j(t_t)
    r = np.linalg.norm(r_vec)
    n_hat = r_vec / r
    beta = vel_j(t_t) / CF
    k = 1.0 - np.dot(n_hat, beta)
    e_field = (1.0 - np.dot(beta, beta)) * (n_hat - beta) / (k**3 * r**2)
    b_field = np.cross(n_hat, e_field) / CF
    return e_field + np.cross(v_receiver, b_field)


# ------------------------------------------------------------- configurations

def rigid_pair(psi_deg, beta, d=1.0, sigma=1.0, kernel=per_hit_acceleration):
    """Two architrinos, fixed separation d at angle psi to the drift direction,
    both translating rigidly at beta * c_f.  Returns (A_1, A_2, sum)."""
    psi = np.radians(psi_deg)
    v = np.array([beta, 0.0, 0.0])
    vel = lambda t: v
    offset = d * np.array([np.cos(psi), np.sin(psi), 0.0])
    x1 = lambda t: v * t
    x2 = lambda t: offset + v * t
    a1 = kernel(x1(0.0), x2, vel, 0.0, sigma)
    a2 = kernel(x2(0.0), x1, vel, 0.0, sigma)
    return a1, a2, a1 + a2


def rigid_assembly(offsets, charges, beta):
    """Sum of accelerations over an arbitrary rigidly translating assembly."""
    v = np.array([beta, 0.0, 0.0])
    vel = lambda t: v
    total = np.zeros(3)
    for i, off_i in enumerate(offsets):
        for j, off_j in enumerate(offsets):
            if i == j:
                continue
            traj_j = (lambda o: (lambda t: o + v * t))(off_j)
            total += per_hit_acceleration(
                off_i, traj_j, vel, 0.0, np.sign(charges[i] * charges[j])
            )
    return total


# -------------------------------------------------------------------- reports

def report_orientation_sweep():
    print("=" * 74)
    print("ORIENTATION SWEEP -- pair sum vs angle psi to drift direction")
    print("predicted closed form: (2 beta) * (-cos 2psi, -sin 2psi, 0)")
    print("=" * 74)
    for beta in (0.1, 0.3, 0.6):
        print(f"\n  beta_f = {beta}")
        print(f"  {'psi(deg)':>9} {'measured sum':>34} {'closed form':>26}")
        for psi in (0, 30, 45, 60, 90):
            _, _, s = rigid_pair(psi, beta)
            p = np.radians(psi)
            pred = 2 * beta * np.array([-np.cos(2 * p), -np.sin(2 * p), 0.0])
            print(f"  {psi:9.1f} [{s[0]:+.6f},{s[1]:+.6f},{s[2]:+.6f}]"
                  f"   [{pred[0]:+.6f},{pred[1]:+.6f}]")


def report_null_space():
    print("\n" + "=" * 74)
    print("SYMMETRY NULL SPACE -- sum of accelerations, rigid drift, beta=0.3")
    print("second-harmonic residual should cancel under >=3-fold symmetry")
    print("=" * 74)
    b = 0.3
    o = lambda *xs: [np.array(x, dtype=float) for x in xs]
    cases = [
        ("pair, psi=45",
         o((0, 0, 0), (np.cos(np.pi / 4), np.sin(np.pi / 4), 0)), [1, 1]),
        ("collinear 3, along drift",
         o((0, 0, 0), (1, 0, 0), (2, 0, 0)), [1, 1, 1]),
        ("equilateral triangle, drift plane",
         o((0, 0, 0), (1, 0, 0), (0.5, np.sqrt(3) / 2, 0)), [1, 1, 1]),
        ("square, all like polarity",
         o((0, 0, 0), (1, 0, 0), (1, 1, 0), (0, 1, 0)), [1, 1, 1, 1]),
        ("square, alternating (neutral)",
         o((0, 0, 0), (1, 0, 0), (1, 1, 0), (0, 1, 0)), [1, -1, 1, -1]),
        ("regular tetrahedron, generic",
         o((1, 1, 1), (1, -1, -1), (-1, 1, -1), (-1, -1, 1)), [1, 1, 1, 1]),
    ]
    for name, offs, qs in cases:
        s = rigid_assembly(offs, qs, b)
        flag = "NULL" if np.allclose(s, 0, atol=1e-9) else "residual"
        print(f"  {name:36s} [{s[0]:+.6f},{s[1]:+.6f},{s[2]:+.6f}]  {flag}")


def report_three_way_tension():
    print("\n" + "=" * 74)
    print("THREE-WAY TENSION -- perpendicular pair, transverse binding vs sum")
    print("comparison rows are recovery-target only, never premises")
    print("=" * 74)
    for beta in (0.1, 0.3, 0.6):
        g = 1 / np.sqrt(1 - beta**2)
        print(f"\n  beta_f={beta}   gamma_f={g:.5f}   1/gamma_f={1/g:.5f}")
        a1, _, s = rigid_pair(90, beta, kernel=per_hit_acceleration)
        print(f"    emission point (canonical)  |transverse|={abs(a1[1]):.5f}"
              f"   pair sum={np.round(s, 9)}")
        a1, _, s = rigid_pair(90, beta, kernel=per_hit_extrapolated)
        print(f"    extrapolated emission point |transverse|={abs(a1[1]):.5f}"
              f"   pair sum={np.round(s, 9)}")
        v = np.array([beta, 0.0, 0.0])
        vel = lambda t: v
        x1 = lambda t: v * t
        x2 = lambda t: np.array([0, 1.0, 0]) + v * t
        f1 = comparison_instrument(x1(0), x2, vel, 0.0, v)
        f2 = comparison_instrument(x2(0), x1, vel, 0.0, v)
        print(f"    with receiver-velocity term |transverse|={abs(f1[1]):.5f}"
              f"   pair sum={np.round(f1 + f2, 9)}")


def report_wake_energy_dimensions():
    print("\n" + "=" * 74)
    print("ITEM 1 -- wake-energy dimensions (symbolic; no numerics required)")
    print("=" * 74)
    print("""
  [kappa] = L^3 / (T^2 Q^2),  [q] = Q,  [c_f] = L/T,  [W^acc] = 1

  kinetic proxy      K_mu = (1/2) mu |V|^2                -> [mu] L^2 T^-2

  action kernel      K_ij = (kappa sigma |q q| / c_f) Theta delta(g~) / r
                     [K_ij] = (L^3 T^-2)(T L^-1)(T^-1)(L^-1) = L T^-2
                     E_wake = INT dT_t INT dT_1 d/dT_1 K_ij
                            = L T^-2 * T^-1 * T^2         -> L T^-1     MISMATCH

  diagnostic         INT dT_t (W/r^2) delta_eta(g) -> (W/r^2)(1/|D_t|)
                     and 1/|D_t| = W/c_f, so the collapse yields W^2
                     E_wake^eta = (1/2) SUM kappa sigma |q q| W^2/(c_f r^2)
                                = (L^3 T^-2)(L^-1 T)(L^-2) -> T^-1      MISMATCH

  correct form       E_wake = -(1/2) SUM mu kappa sigma |q q| W^acc / r
                            = [mu](L^3 T^-2)(L^-1)          -> [mu] L^2 T^-2  OK

  repair             action prefactor  kappa sigma |q q| / c_f
                                   ->  mu_arch kappa sigma |q q|

  static-pair falsifier: with W^acc = 1 the corrected form must reduce to
                         mu_arch kappa |q_i q_j| / r.
""")


if __name__ == "__main__":
    report_orientation_sweep()
    report_null_space()
    report_three_way_tension()
    report_wake_energy_dimensions()
    print("=" * 74)
    print("All numeric rows above: grade `measured, non-independent`.")
    print("Evaluator and comparison instrument share one author and one change.")
    print("=" * 74)
