#!/usr/bin/env python
"""Symmetry wave-8 instrument. Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> PART, PART in
  twist  - D1 twisted hexagon released from rest: exact one-degree-of-freedom reduction on the
           stationary-source window. Receiver P_0 at azimuth psi(t) (psi(0)=0), fixed source images at
           their initial azimuths (electrinos 50, 170, 290 deg; positrinos 120, 240 deg).
           psi'' = g f(psi), f(psi) = sum_e G(d_e - psi) - sum_p G(d_p - psi), G(d) = cos(d/2)/(4 sin^2(d/2)).
           First integral: psi'^2/2 = g [W(psi) - W(0)], W(psi) = sum_e 1/chord_e(psi) - sum_p 1/chord_p(psi)
           (chord(d) = 2 sin(d/2)), an identity of the static reduction. Time to psi1 by quadrature
           t = int_0^psi1 dpsi / sqrt(2 g (W - W(0))). Window end T_w: T_w = 2 sin((50 deg - psi(T_w))/2).
           Controls first: initial twist 60 deg gives f(0) = 0 (stationary hexagon); G(Phi) Phi^2 -> 1 as
           Phi -> 0; the quadrature reproduces the direct ODE integration (scipy solve_ivp) to 1e-8.
  polish - Newton polish of the census stall point: minimize F = |T|^2/2 over the twelve tangent
           coordinates with scipy (BFGS then Newton-CG using finite-difference gradients), then the
           Hessian of F by central differences of the gradient; eigenvalues decide local minimum vs saddle;
           symmetry order at tolerance 1e-6 after polish. Control first: hexagon polish keeps F = 0.
Functions imported unchanged from the frozen wave-5 instrument.
Revision 2 (01:24 UTC): run 1 of `polish` failed its hexagon control (F = 8.53 at the hexagon) because the
objective used the census polarity vector (+,+,+,-,-,-) instead of the hexagon's alternating pattern; the
control did its job and no target ran; run-1 output retained as *-polish-run1-control-failed.json.
"""
import importlib.util
import json
import math
import os
import sys

import numpy as np
from scipy.integrate import quad, solve_ivp
from scipy.optimize import brentq, minimize

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("w5", os.path.join(HERE, "spherical-curvature-claude-symmetry-wave5-instrument.py"))
w5 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w5)

DEG = math.pi / 180.0


def G(d):
    return math.cos(d / 2) / (4 * math.sin(d / 2) ** 2)


def chord(d):
    return 2 * math.sin(d / 2)


def make_f(twist_deg):
    e_az = [twist_deg * DEG + k * 2 * math.pi / 3 for k in range(3)]
    p_az = [2 * math.pi / 3, 4 * math.pi / 3]

    def f(psi):
        return sum(G((a - psi) % (2 * math.pi)) for a in e_az) - sum(G((a - psi) % (2 * math.pi)) for a in p_az)

    def W(psi):
        return sum(1 / chord((a - psi) % (2 * math.pi)) for a in e_az) - sum(1 / chord((a - psi) % (2 * math.pi)) for a in p_az)

    return f, W, e_az, p_az


def main():
    part = sys.argv[1]
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": []}
    if part == "twist":
        f60, _, _, _ = make_f(60.0)
        out["controls"].append({"name": "known: initial twist 60 deg (alternating hexagon) gives f(0)=0", "f0": f60(0.0), "pass": abs(f60(0.0)) < 1e-12})
        out["controls"].append({"name": "known: small-twist limit G(Phi) Phi^2 -> 1", "values": {str(p): G(p) * p * p for p in (1e-2, 1e-3, 1e-4)},
                                "pass": abs(G(1e-4) * 1e-8 - 1) < 1e-6})
        f, W, e_az, p_az = make_f(50.0)
        # derivative identity check: f = dW/dpsi numerically
        hh = 1e-6
        dW = (W(0.3 + hh) - W(0.3 - hh)) / (2 * hh)
        out["controls"].append({"name": "known: f equals dW/dpsi (first-integral identity) at psi=0.3", "f": f(0.3), "dW": dW, "pass": abs(f(0.3) - dW) < 1e-7})
        g = 1.0
        # quadrature vs direct integration to psi = 15 deg
        W0 = W(0.0)
        tq = quad(lambda p: 1 / math.sqrt(2 * g * (W(p) - W0)), 0, 15 * DEG, limit=200)[0]
        sol = solve_ivp(lambda t, y: [y[1], g * f(y[0])], [0, 5], [0.0, 0.0], rtol=1e-11, atol=1e-13, dense_output=True,
                        events=lambda t, y: y[0] - 15 * DEG)
        t_ode = sol.t_events[0][0]
        out["controls"].append({"name": "known: quadrature time to psi=15 deg equals direct ODE integration", "t_quad": tq, "t_ode": t_ode, "pass": abs(tq - t_ode) < 1e-8})
        if not all(c["pass"] for c in out["controls"]):
            print(json.dumps(out, indent=1, default=w5._jd))
            sys.exit(2)
        out["controls_all_pass_before_targets"] = True
        res = {"f_at_release": f(0.0), "W_minus_W0_at_psi": {}, "f_positive_on_0_to_25deg": all(f(p) > 0 for p in np.linspace(0, 25 * DEG, 2001)),
               "no_turning_point_before_psi_25deg": None, "results_by_g": {}}
        res["no_turning_point_before_psi_25deg"] = res["f_positive_on_0_to_25deg"]
        for p in (5, 10, 15, 20, 25):
            res["W_minus_W0_at_psi"][str(p)] = W(p * DEG) - W0
        for g in (1.0, 0.1):
            rows = {}
            for twist in (40, 30, 20, 10, 0):
                psi1 = (50 - twist) / 2 * DEG
                if twist == 0:
                    # singular endpoint of the static reduction? W finite at psi=25 (receiver 25 deg from the fixed image): yes
                    t1 = quad(lambda p: 1 / math.sqrt(2 * g * (W(p) - W0)), 0, psi1, limit=400)[0]
                else:
                    t1 = quad(lambda p: 1 / math.sqrt(2 * g * (W(p) - W0)), 0, psi1, limit=400)[0]
                speed = math.sqrt(2 * g * (W(psi1) - W0))
                rows[str(twist)] = {"psi_deg": (50 - twist) / 2, "time": t1, "speed_at_arrival": speed, "nearest_fixed_image_chord": chord(50 * DEG - psi1)}
            # window end: T_w = chord(50 deg - psi(T_w)), psi from the ODE
            sol = solve_ivp(lambda t, y: [y[1], g * f(y[0])], [0, 20], [0.0, 0.0], rtol=1e-11, atol=1e-13, dense_output=True,
                            events=lambda t, y: y[0] - 25 * DEG)
            t25 = sol.t_events[0][0] if len(sol.t_events[0]) else None
            tw = brentq(lambda t: t - chord(50 * DEG - sol.sol(t)[0]), 1e-6, min(t25 if t25 else 20, 20) - 1e-9)
            psi_w = sol.sol(tw)[0]
            rows["window_end"] = {"T_w": tw, "psi_deg_at_window_end": psi_w / DEG, "twist_deg_at_window_end": 50 - 2 * psi_w / DEG,
                                  "speed_at_window_end": sol.sol(tw)[1], "reaches_twist_zero_within_window": bool(t25 is not None and t25 <= tw),
                                  "t_twist_zero_ode": t25}
            res["results_by_g"][str(g)] = rows
        out["twist"] = res
    elif part == "polish":
        Q = np.array([1, 1, 1, -1, -1, -1])

        def unpack(X0, F, y):
            X = X0.copy()
            for i in range(6):
                X[i] = X0[i] + y[2 * i] * F[i][0] + y[2 * i + 1] * F[i][1]
                X[i] /= np.linalg.norm(X[i])
            return X

        def objective(X0, F, Qv):
            return lambda y: 0.5 * float(np.sum(w5.tangent_residuals(unpack(X0, F, y), Qv) ** 2))

        def grad(obj, y, h=1e-6):
            g = np.zeros(len(y))
            for k in range(len(y)):
                e = np.zeros(len(y)); e[k] = h
                g[k] = (obj(y + e) - obj(y - e)) / (2 * h)
            return g

        def hess(obj, y, h=1e-4):
            n = len(y); H = np.zeros((n, n))
            for k in range(n):
                e = np.zeros(n); e[k] = h
                H[:, k] = (grad(obj, y + e) - grad(obj, y - e)) / (2 * h)
            return 0.5 * (H + H.T)

        # control: hexagon stays at F=0 under the polish
        Xh, Qh = w5.hexagon()
        Fh = w5.frames(Xh)
        objh = objective(Xh, Fh, Qh)  # revision 2: run 1 passed the census polarity vector here, a defect caught by this control
        r = minimize(objh, np.zeros(12), method="BFGS", options={"gtol": 1e-12})
        out["controls"].append({"name": "known: hexagon polish keeps F=0 and position", "F": r.fun, "pass": r.fun < 1e-20 and np.linalg.norm(r.x) < 1e-6})
        if not out["controls"][0]["pass"]:
            print(json.dumps(out, indent=1, default=w5._jd))
            sys.exit(2)
        c1 = json.load(open(os.path.join(HERE, "spherical-curvature-claude-symmetry-wave6-census1.json")))["census"]
        sd = c1["nonconverged_endpoints"][0]["seed"]
        rr = np.random.default_rng(sd)
        X0 = rr.standard_normal((6, 3)); X0 /= np.linalg.norm(X0, axis=1)[:, None]
        X, res = w5.solve_from_seed(X0, Q)
        F = w5.frames(X)
        obj = objective(X, F, Q)
        g0 = grad(obj, np.zeros(12))
        r1 = minimize(obj, np.zeros(12), method="BFGS", options={"gtol": 1e-13, "maxiter": 500})
        y = r1.x
        X1 = unpack(X, F, y)
        F1 = w5.frames(X1)
        obj1 = objective(X1, F1, Q)
        g1 = grad(obj1, np.zeros(12))
        H = hess(obj1, np.zeros(12))
        ev = np.sort(np.linalg.eigvalsh(H))
        order = {str(t): w5.symmetry_order(X1, Q, tol=t)[0] for t in (1e-8, 1e-6, 1e-4, 1e-3)}
        _, elems = w5.symmetry_order(X1, Q, tol=1e-3)
        out["polish"] = {"seed": sd, "F_before": obj(np.zeros(12)), "grad_norm_before": float(np.linalg.norm(g0)),
                         "F_after": r1.fun, "grad_norm_after": float(np.linalg.norm(g1)), "displacement_norm": float(np.linalg.norm(y)),
                         "residual_norm_after": math.sqrt(2 * r1.fun), "hessian_eigenvalues": ev.tolist(),
                         "n_negative_eigs": int(np.sum(ev < -1e-6)), "n_near_zero_eigs": int(np.sum(np.abs(ev) <= 1e-6)), "n_positive_eigs": int(np.sum(ev > 1e-6)),
                         "verdict": ("local minimum of the least-squares objective (nonzero residual)" if int(np.sum(ev < -1e-6)) == 0 else "saddle of the least-squares objective"),
                         "symmetry_order_by_tolerance": order, "elements_tol_1e-3": elems,
                         "positions_after": X1.tolist(), "invariant_after": w5.invariant(X1, Q).tolist(),
                         "tangent_norms_after": [float(np.linalg.norm(t)) for t in w5.tangent_residuals(X1, Q)]}
    print(json.dumps(out, indent=1, default=w5._jd))


if __name__ == "__main__":
    main()
