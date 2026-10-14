#!/usr/bin/env python3
"""Saturday continuation round 2026-10-12, task 1: the weighted product constant on the
chart of radius 1/100, for the spatial-decay (truncated-weight absorption) step.

Usage:  weighted_absorption_constants.py OUT.json

Imports the frozen forward_extension_constants.py (same folder) for its exact-rational
helpers and its general-parameter cascade; does not modify it.  All arithmetic here is
exact rational arithmetic on declared decimals, except two interval exponentials.

Known case first: the accepted contour cascade (quantification note) through the imported
formula must reproduce C_src <= 49.49, C_N <= 849.2, C_L <= 0.04099.  Then the target.
"""
import json
import os
import sys
from fractions import Fraction as Fr

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import forward_extension_constants as fx  # noqa: E402

D = fx.D
ACC_S = {(2, 1): D("0.79585"), (3, 1): D("0.69702"), (4, 1): D("0.63681"),
         (2, 2): D("0.03979"), (3, 2): D("0.03835"), (4, 2): D("0.03737")}


def main():
    out_path = sys.argv[1]
    res = {"instrument": "weighted_absorption_constants.py"}
    # ---- known case: accepted weighted cascade on the chart 1/16
    par = {"a": D("2.6953"), "eta": D("1.4007"), "kappa": Fr(7, 8),
           "c20": D("9.0336"), "c11": D("4.5991"), "c02": D("3.7288"),
           "one_minus_varpi": Fr(13, 16), "s1": D("0.09459"), "rho": Fr(1, 16),
           "cE": D("3.5842"), "cEp": D("5.3762"), "S": ACC_S,
           "nu_lo": D("5.3904"), "nu_hi": D("5.3906"), "S2nu": D("0.03979"), "S3nu": D("0.03835")}
    k = fx.cascade(par)
    csrc = fx.ceil_dec(k["C_src"], 2)
    known = {"C_src": [str(csrc), "49.49"],
             "C_N": [str(fx.ceil_dec(fx.G * (par["cE"] + csrc), 1)), "849.2"],
             "C_L": [str(fx.ceil_dec(k["C_L"], 5)), "0.04099"]}
    ok = (csrc == D("49.49") and fx.ceil_dec(fx.G * (par["cE"] + csrc), 1) == D("849.2")
          and fx.ceil_dec(k["C_L"], 5) == D("0.04099"))
    # absorption condition of the accepted note with its own numbers: 4*sqrt(2)*34.81*7.4e-4 = 0.14573
    lhs_v = 4 * D("1.4143") * D("34.81") * D("0.00074")
    known["accepted (v) with sqrt2<=1.4143"] = [str(fx.ceil_dec(lhs_v, 5)), "0.14573"]
    ok = ok and fx.ceil_dec(lhs_v, 5) == D("0.14573")
    res["known_case"] = known
    res["known_case_pass"] = bool(ok)
    print("KNOWN CASE", json.dumps(known), "PASS" if ok else "FAIL")
    if not ok:
        with open(out_path, "w") as fh:
            json.dump(res, fh, indent=1)
        print("KNOWN CASE FAILED - target not run")
        return 2
    # ---- target: weighted sums (accepted declared values at a-1/4, 2a-1/4), chart 1/100
    rho = Fr(1, 100)
    a_lo, a_hi = D("2.6952"), D("2.6953")
    varpi = a_hi * rho
    m, c20, c11, c02 = fx.row_constants(varpi)
    c20, c11, c02 = fx.ceil_dec(c20, 4), fx.ceil_dec(c11, 4), fx.ceil_dec(c02, 4)
    eta = fx.ceil_dec(fx.hi_fr(fx.iv.exp(fx.to_iv(2 * a_hi * rho))), 5)
    s1 = fx.ceil_dec(eta * fx.hi_fr(fx.iv.exp(-fx.to_iv(a_lo))), 5)
    cE = fx.ceil_dec(4 * D("10.3824") * rho / (1 - rho) ** 5, 4)
    cEp = fx.ceil_dec(6 * D("10.3824") * rho / (1 - rho) ** 5, 4)
    parw = {"a": a_hi, "eta": eta, "kappa": 1 - 2 * rho, "c20": c20, "c11": c11, "c02": c02,
            "one_minus_varpi": 1 - varpi, "s1": s1, "rho": rho, "cE": cE, "cEp": cEp, "S": ACC_S,
            "nu_lo": D("5.3904"), "nu_hi": D("5.3906"), "S2nu": D("0.03979"), "S3nu": D("0.03835")}
    w = fx.cascade(parw)
    CNw = fx.ceil_dec(w["C_N"], 1)
    CLw = fx.ceil_dec(w["C_L"], 5)
    cw = fx.ceil_dec(CLw * CNw, 2)
    A0 = D("0.0052") + 4 * D("0.00086")           # delta_1 + 4 rho_1
    absorb = 4 * cw * A0
    factor = fx.ceil_dec(cw * A0 / (1 - absorb), 4) if absorb < 1 else None
    rep = {"chart_radius": "1/100", "eta<=": str(eta), "c20<=": str(c20), "c11<=": str(c11),
           "c02<=": str(c02), "cE<=": str(cE),
           "C_src^omega<=": str(fx.ceil_dec(w["C_src"], 3)), "C_N^omega<=": str(CNw),
           "C_L^omega<=": str(CLw), "c^omega=C_L*C_N<=": str(cw),
           "A0=delta_1+4rho_1": str(A0), "4*c^omega*A0": fx.show(absorb),
           "absorption_ok(<1)": bool(absorb < 1),
           "weighted_correction_factor c^omega*A0/(1-4c^omega*A0)<=": None if factor is None else str(factor)}
    res["target"] = rep
    res["target_pass"] = bool(absorb < 1)
    print("TARGET", json.dumps(rep, indent=1))
    with open(out_path, "w") as fh:
        json.dump(res, fh, indent=1)
    print("TARGET PASS" if res["target_pass"] else "TARGET CONDITION NOT MET")
    return 0 if res["target_pass"] else 1


if __name__ == "__main__":
    sys.exit(main())
