#!/usr/bin/env python
"""Symmetry wave-7 instrument. Usage: OMP_NUM_THREADS=1 ../.venv/bin/python <file> PART, PART in
  stall - identify the least-squares stall configuration that captured the nonconverged census seeds:
          rerun the solver from the first nonconverged seed of census1 (recorded), record the endpoint
          positions, chord set, symmetry group, and the residual tangent field (value and direction per
          member). Control first: the hexagon is recovered from a nearby seed.
  strip - close the last right strip: out-of-plane m=1 at g=1/10 with the strip starting at Re=-0.05.
          Controls first: no-delay Family A count 2 (justified); h(0)=0 for m=1.
Functions are imported unchanged from the frozen wave-5 instrument. Each part is measured under 30 s.
"""
import importlib.util
import json
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("w5", os.path.join(HERE, "spherical-curvature-claude-symmetry-wave5-instrument.py"))
w5 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(w5)


def main():
    part = sys.argv[1]
    out = {"pid": os.getpid(), "omp_threads": os.environ.get("OMP_NUM_THREADS"), "controls": []}
    if part == "stall":
        Xh, Qh = w5.hexagon()
        Xs, res = w5.solve_from_seed(Xh + 0.05 * np.random.default_rng(1).standard_normal((6, 3)), Qh)
        out["controls"].append({"name": "known: hexagon recovered from nearby seed", "residual": res, "pass": res < 1e-12})
        if not out["controls"][0]["pass"]:
            print(json.dumps(out, indent=1, default=w5._jd))
            sys.exit(2)
        c1 = json.load(open(os.path.join(HERE, "spherical-curvature-claude-symmetry-wave6-census1.json")))["census"]
        nonconv = c1["nonconverged_endpoints"]
        Q = np.array([1, 1, 1, -1, -1, -1])
        endpoints = []
        for entry in nonconv[:3]:
            sd = entry["seed"]
            r = np.random.default_rng(sd)
            X0 = r.standard_normal((6, 3))
            X0 /= np.linalg.norm(X0, axis=1)[:, None]
            X, res = w5.solve_from_seed(X0, Q)
            T = w5.tangent_residuals(X, Q)
            A = w5.static_field(X, Q)
            order, elems = w5.symmetry_order(X, Q)
            inv = w5.invariant(X, Q)
            # describe geometry: z-axis of best symmetry? record pairwise chords with polarity labels
            chords = [{"pair": [i, j], "like": bool(Q[i] == Q[j]), "chord": float(np.linalg.norm(X[i] - X[j]))} for i in range(6) for j in range(i + 1, 6)]
            per_member = []
            for i in range(6):
                n = X[i]
                t = T[i]
                per_member.append({"member": i, "polarity": int(Q[i]), "position": X[i].tolist(), "tangent_residual": t.tolist(),
                                   "tangent_norm": float(np.linalg.norm(t)), "radial_part": float(np.dot(A[i], n)),
                                   "direction_unit": (t / np.linalg.norm(t)).tolist() if np.linalg.norm(t) > 1e-12 else None})
            endpoints.append({"seed": sd, "residual_norm": res, "invariant": inv.tolist(), "symmetry_order": order, "elements": elems,
                              "chords": chords, "per_member": per_member, "min_chord": w5.min_chord(X),
                              "sum_of_tangent_vectors": np.sum(T, axis=0).tolist(),
                              "sum_of_x_cross_tangent": np.sum(np.cross(X, T), axis=0).tolist()})
        # are the three endpoints the same up to symmetry?
        same = all(np.max(np.abs(np.array(e["invariant"]) - np.array(endpoints[0]["invariant"]))) < 1e-3 for e in endpoints)
        out["stall"] = {"endpoints": endpoints, "three_endpoints_same_class": same}
    elif part == "strip":
        cnt, _, _, just = w5.certified_winding(1.0, w5.FAM_A, -4, 4, -40, 40, delays=False)
        out["controls"].append({"name": "known: no-delay Family A g=1 counts 2 (justified)", "count": cnt, "justified": just, "pass": cnt == 2 and just})
        co1 = w5.coeffs_out_of_plane(1)
        out["controls"].append({"name": "known: out-of-plane m=1 h(0)=0", "h0": abs(w5.h(0.0, 0.1, co1)), "pass": abs(w5.h(0.0, 0.1, co1)) < 1e-14})
        if not all(c["pass"] for c in out["controls"]):
            print(json.dumps(out, indent=1, default=w5._jd))
            sys.exit(2)
        g = 0.1
        Rb = w5.modulus_bound(g, co1)
        rc, rraw, rrec, rjust = w5.certified_winding(g, co1, -0.05, 4.0, -40.0, 40.0)
        roots = w5.newton_roots(g, co1, re_lo=-0.5, re_hi=4.0, im_lo=-40, im_hi=40, nre=37, nim=161)
        right = [z for z in roots if z.real > -0.05]
        out["strip"] = {"g": g, "mode": "out-of-plane m=1", "strip": [[-0.05, 4.0], [-40.0, 40.0]], "modulus_bound_Re>=0": Rb,
                        "right_count": rc, "raw": rraw, "right_justified": rjust, "newton_right": len(right),
                        "roots_right": [[z.real, z.imag] for z in right], "nearest_left_root": min(((z.real, z.imag) for z in roots if z.real <= -0.05), key=lambda p: -p[0]) if any(z.real <= -0.05 for z in roots) else None,
                        "certified": (rc == len(right)) and rjust, "segments": rrec}
    elif part == "strip2":
        # Revision 2 (01:16 UTC): the strip [-0.05,4]x[-40,40] could not be justified within the cap because |h|
        # is ~1e-3 on the left edge between the zero root and the root at -0.1147 while Lip ~ 80. Use instead the
        # modulus bound valid for Re L >= -0.05: |L|^2 <= g (|a0| + sum |a_k| e^{0.05 tau_k}) =: Rb2^2, so every
        # root with Re L >= -0.05 lies in |L| <= Rb2, and the strip [-0.05, Rb2+0.5] x [-(Rb2+0.5), Rb2+0.5] suffices.
        cnt, _, _, just = w5.certified_winding(1.0, w5.FAM_A, -4, 4, -40, 40, delays=False)
        out["controls"].append({"name": "known: no-delay Family A g=1 counts 2 (justified)", "count": cnt, "justified": just, "pass": cnt == 2 and just})
        co1 = w5.coeffs_out_of_plane(1)
        out["controls"].append({"name": "known: out-of-plane m=1 h(0)=0", "h0": abs(w5.h(0.0, 0.1, co1)), "pass": abs(w5.h(0.0, 0.1, co1)) < 1e-14})
        if not all(c["pass"] for c in out["controls"]):
            print(json.dumps(out, indent=1, default=w5._jd))
            sys.exit(2)
        g = 0.1
        import math as _m
        Rb2 = _m.sqrt(g * (abs(co1["a0"]) + sum(abs(a) * _m.exp(0.05 * tau) for a, tau in zip(co1["a"], w5.TAU))))
        box = Rb2 + 0.5
        rc, rraw, rrec, rjust = w5.certified_winding(g, co1, -0.05, box, -box, box)
        roots = w5.newton_roots(g, co1, re_lo=-0.5, re_hi=box, im_lo=-box, im_hi=box, nre=41, nim=41)
        right = [z for z in roots if z.real > -0.05]
        out["strip2"] = {"g": g, "mode": "out-of-plane m=1", "modulus_bound_Re>=-0.05": Rb2, "strip": [[-0.05, box], [-box, box]],
                         "right_count": rc, "raw": rraw, "right_justified": rjust, "newton_right": len(right),
                         "roots_right": [[z.real, z.imag] for z in right], "certified": (rc == len(right)) and rjust, "segments": rrec}
    elif part == "stall2":
        Xh, Qh = w5.hexagon()
        Xs, res = w5.solve_from_seed(Xh + 0.05 * np.random.default_rng(1).standard_normal((6, 3)), Qh)
        out["controls"].append({"name": "known: hexagon recovered from nearby seed", "residual": res, "pass": res < 1e-12})
        if not out["controls"][0]["pass"]:
            print(json.dumps(out, indent=1, default=w5._jd))
            sys.exit(2)
        c1 = json.load(open(os.path.join(HERE, "spherical-curvature-claude-symmetry-wave6-census1.json")))["census"]
        sd = c1["nonconverged_endpoints"][0]["seed"]
        Q = np.array([1, 1, 1, -1, -1, -1])
        r = np.random.default_rng(sd)
        X0 = r.standard_normal((6, 3)); X0 /= np.linalg.norm(X0, axis=1)[:, None]
        X, res = w5.solve_from_seed(X0, Q)
        # gradient of the objective F = 1/2 |T|^2 with respect to tangent displacements (central differences)
        F = w5.frames(X)
        def obj(Y):
            return 0.5 * float(np.sum(w5.tangent_residuals(Y, Q) ** 2))
        grad = []
        hh = 1e-6
        for i in range(6):
            for e in F[i]:
                Xp = X.copy(); Xp[i] = X[i] + hh * e; Xp[i] /= np.linalg.norm(Xp[i])
                Xm = X.copy(); Xm[i] = X[i] - hh * e; Xm[i] /= np.linalg.norm(Xm[i])
                grad.append((obj(Xp) - obj(Xm)) / (2 * hh))
        grad = np.array(grad)
        loose = {str(t): w5.symmetry_order(X, Q, tol=t)[0] for t in (1e-6, 1e-4, 1e-3, 1e-2, 5e-2)}
        out["stall2"] = {"seed": sd, "objective": obj(X), "residual_norm": res, "gradient_norm_tangent": float(np.linalg.norm(grad)),
                         "gradient_components": grad.tolist(), "symmetry_order_by_tolerance": loose,
                         "verdict": "critical point of the least-squares objective (gradient ~ 0) with nonzero residual" if np.linalg.norm(grad) < 1e-6 else "not a critical point: iteration budget or tolerance stop"}
    print(json.dumps(out, indent=1, default=w5._jd))


if __name__ == "__main__":
    main()
