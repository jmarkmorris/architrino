"""Accuracy supplement for the direct cross-action evaluator (review comments R5-03 and R5-04).

Imports serial-characteristic-tail-cross-action-2026-10-10.py unchanged. Three parts.

1. Kernel audit. The evaluator's sixteen-panel Gauss-Legendre kernel K(r, g) is compared, at upper
   limits g inside the regulator shell (partial limits) and outside it, with a reference computed
   entirely in 30-digit mpmath arithmetic: abscissae, regulator and integrand are mpmath numbers, so no
   binary64 value enters the reference except the two inputs r and g themselves.
2. Finite-probe coefficient. With m1 = integral(phi), m3 = integral(phi^3) in 30-digit arithmetic, the
   derived leading probe coefficient is (m3/(4 m1)) (3 - 2 eps^2) (1 + eps^2)^(-7/2) for R = Lambda = 1.
3. Fine-grid refinement. The evaluator's mixed coefficient at time spacing 0.0025 and probe 2.5e-4 for
   future amplitudes 0.01 and 0.005, and at spacing 0.00125, probe 5e-4, amplitude 0.01. Combined with
   the retained limit rows (spacing 0.0025, probe 5e-4; path given as the first argument) these give a
   measured probe slope on the same grid and amplitudes, a probe extrapolation (4 M(p/2) - M(p))/3
   justified by M being even in p, an amplitude extrapolation justified by M being even in eps, and one
   measured time-refinement difference. Nothing is fitted to or subtracted because of the value -1/2.

Known cases run first and must pass: the bump integral against its tabulated value and a second
quadrature rule; a rational integral with closed form; the closed form of h'' against numerical
differentiation; the probe expansion against the exact closed form for a constant profile; the
reference kernel's far value against its moment series; and the evaluator's own fourteen controls.
Float instrument with a 30-digit reference: measured.
"""
import importlib.util
import json
import pathlib
import sys
import time
import mpmath as mp
import numpy as np

mp.mp.dps = 30
here = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ca", here / "serial-characteristic-tail-cross-action-2026-10-10.py")
ca = importlib.util.module_from_spec(spec)
limit_path = sys.argv[1] if len(sys.argv) > 1 else None
sys.argv = [sys.argv[0], "import-only"]
try:
    spec.loader.exec_module(ca)
except SystemExit:
    pass


def bump_mp(y):
    return mp.exp(-1 / (1 - y * y)) if abs(y) < 1 else mp.mpf(0)


Z = mp.quad(bump_mp, [-1, -0.5, 0, 0.5, 1])


def delta_mp(z, eta):
    return bump_mp(z / eta) / (eta * Z)


def kernel_mp(r, g, eta):
    r, g, eta = mp.mpf(r), mp.mpf(g), mp.mpf(eta)
    u, top = g + r, min(g, eta)
    if top <= -eta:
        return mp.mpf(0)
    edges = [-eta + (top + eta) * i / 8 for i in range(9)]
    return mp.quad(lambda z: delta_mp(z, eta) / (u - z) ** 2, edges)


def h(x):
    return x * (1 + x * x) ** mp.mpf(-1.5)


def h2(x):
    return 3 * x * (2 * x * x - 3) * (1 + x * x) ** mp.mpf(-3.5)


def coeff(eps, ratio):
    eps = mp.mpf(eps)
    return ratio / 4 * (3 - 2 * eps * eps) * (1 + eps * eps) ** mp.mpf(-3.5)


t0 = time.time()
known = {}
known["bump integral equals tabulated 0.4439938161680"] = abs(Z - mp.mpf("0.4439938161680")) < mp.mpf("1e-12")
known["bump integral agrees between tanh-sinh and Gauss-Legendre rules to 1e-18"] = abs(Z - mp.quad(bump_mp, [-1, -0.5, 0, 0.5, 1], method="gauss-legendre")) < mp.mpf("1e-18")
u0, a0, b0 = mp.mpf("1.03"), mp.mpf("-0.1"), mp.mpf("0.02")
known["rational integral of 1/(u-z)^2 equals 1/(u-b) - 1/(u-a)"] = abs(mp.quad(lambda z: 1 / (u0 - z) ** 2, [a0, b0]) - (1 / (u0 - b0) - 1 / (u0 - a0))) < mp.mpf("1e-25")
known["closed form of h'' equals numerical second derivative at 0.3"] = abs(h2(mp.mpf("0.3")) - mp.diff(h, mp.mpf("0.3"), 2)) < mp.mpf("1e-15")
# Constant profile phi = c on a length L: m3/m1 = c^2 and the antisymmetrised difference quotient is exactly
# [A(eps - p c) - A(eps + p c)]/(4 eps p c) with A(x) = -(1 + x^2)^(-1/2), A' = h.
e1, c1, p1 = mp.mpf("0.02"), mp.mpf("0.8"), mp.mpf("0.001")
A = lambda x: -(1 + x * x) ** mp.mpf(-0.5)
exact_const = (A(e1 - p1 * c1) - A(e1 + p1 * c1)) / (4 * e1 * p1 * c1)
expan_const = -h(e1) / (2 * e1) + coeff(e1, c1 * c1) * p1 * p1
known["probe expansion matches the exact constant-profile quotient to its p^4 remainder"] = abs(exact_const - expan_const) < mp.mpf("1e-12")
known["and the p^2 term is needed: dropping it leaves more than 1e-7"] = abs(exact_const + h(e1) / (2 * e1)) > mp.mpf("1e-7")
eta = mp.mpf("0.1")
m2 = mp.quad(lambda z: z * z * delta_mp(z, eta), [-eta, -eta / 2, 0, eta / 2, eta])
m4 = mp.quad(lambda z: z ** 4 * delta_mp(z, eta), [-eta, -eta / 2, 0, eta / 2, eta])
uf = mp.mpf(40)
known["reference kernel far value equals its moment series through u^-6"] = abs(kernel_mp(1, 39, "0.1") * uf * uf - (1 + 3 * m2 / uf ** 2 + 5 * m4 / uf ** 4)) < mp.mpf("1e-13")
known["reference kernel is zero at and below g = -eta"] = kernel_mp(1, "-0.1", "0.1") == 0
k, _ = ca.known()
known["evaluator's own fourteen controls pass"] = all(k.values()) and len(k) == 14
out = {"known": {a: bool(v) for a, v in known.items()}}
out["known_result"] = "PASS" if all(out["known"].values()) else "FAIL"
print(json.dumps({"known_result": out["known_result"], "seconds": round(time.time() - t0, 1)}), file=sys.stderr, flush=True)

if out["known_result"] == "PASS":
    # Part 1: kernel audit. Inputs are binary64 values passed exactly to both evaluations.
    audit = []
    for r in (1.0, float(np.sqrt(1.0 + 0.01 ** 2)), float(np.sqrt(1.0 + 0.04 ** 2))):
        for g in (-0.0999, -0.09, -0.05, -0.0137, 0.0, 0.0271, 0.06, 0.095, 0.0999, 0.1, 0.5, 1.9):
            ref = kernel_mp(r, g, 0.1)
            val = float(ca.kernel(np.array([r]), np.array([g]), 0.1)[0])
            audit.append(dict(r=r, g=g, evaluator=val, reference=mp.nstr(ref, 20), absolute_error=float(val - ref), relative_error=float((val - ref) / ref)))
    out["kernel_audit"] = audit
    out["kernel_audit_max_relative_error_partial_limit"] = max(abs(a["relative_error"]) for a in audit if a["g"] < 0.1)
    out["kernel_audit_max_absolute_error_partial_limit"] = max(abs(a["absolute_error"]) for a in audit if a["g"] < 0.1)
    out["kernel_audit_max_relative_error_full_limit"] = max(abs(a["relative_error"]) for a in audit if a["g"] >= 0.1)
    # Part 2: moments of the evaluator's present profile phi(s) = e * bump(s/0.1), in mpmath.
    hw = mp.mpf("0.1")
    phi_mp = lambda s: mp.e * bump_mp(s / hw)
    m1 = mp.quad(phi_mp, [-hw, -hw / 2, 0, hw / 2, hw])
    m3 = mp.quad(lambda s: phi_mp(s) ** 3, [-hw, -hw / 2, 0, hw / 2, hw])
    out["m1"], out["m3"], out["m3_over_m1"] = mp.nstr(m1, 20), mp.nstr(m3, 20), mp.nstr(m3 / m1, 20)
    out["derived_probe_coefficient"] = {str(e): float(coeff(e, m3 / m1)) for e in ("0", "0.005", "0.01", "0.02")}
    # Part 3: fine-grid refinement rows.
    rows = []
    for s in (dict(eps=0.01, p=2.5e-4, dt=0.0025, eta=0.1), dict(eps=0.005, p=2.5e-4, dt=0.0025, eta=0.1), dict(eps=0.01, p=5e-4, dt=0.00125, eta=0.1)):
        r = ca.mixed(**s)
        rows.append(dict(s, **r, derived_finite_amplitude=-0.5 * (1 + s["eps"] ** 2) ** -1.5))
        print(json.dumps(rows[-1]), file=sys.stderr, flush=True)
    out["rows"] = rows
    if limit_path:
        lim = {r["eps"]: r for r in json.load(open(limit_path))["rows"]}
        new = {r["eps"]: r for r in rows[:2]}
        comb = {}
        for e in (0.01, 0.005):
            L, N = lim[e]["M"], new[e]["M"]
            law = -0.5 * (1 + e * e) ** -1.5
            comb[str(e)] = dict(M_p_5e4=L, M_p_2p5e4=N, measured_probe_slope=(L - N) / (5e-4 ** 2 - 2.5e-4 ** 2), derived_probe_slope=float(coeff(e, m3 / m1)),
                                probe_extrapolated=(4 * N - L) / 3, derived_subtraction=L - float(coeff(e, m3 / m1)) * 5e-4 ** 2, law=law)
            comb[str(e)]["probe_extrapolated_minus_law"] = comb[str(e)]["probe_extrapolated"] - law
            comb[str(e)]["derived_subtraction_minus_law"] = comb[str(e)]["derived_subtraction"] - law
        out["combinations"] = comb
        out["amplitude_extrapolation_of_probe_extrapolated"] = (4 * comb["0.005"]["probe_extrapolated"] - comb["0.01"]["probe_extrapolated"]) / 3
        out["amplitude_extrapolation_of_derived_subtraction"] = (4 * comb["0.005"]["derived_subtraction"] - comb["0.01"]["derived_subtraction"]) / 3
        out["raw_amplitude_extrapolation_p_5e4"] = (4 * lim[0.005]["M"] - lim[0.01]["M"]) / 3
        out["time_refinement_difference_eps_0p01_p_5e4"] = rows[2]["M"] - lim[0.01]["M"]
        out["time_refinement_difference_grid_normalised"] = rows[2]["M_grid_normalised"] - lim[0.01]["M_grid_normalised"]
out["seconds"] = round(time.time() - t0, 1)
print(json.dumps(out, indent=1))
raise SystemExit(0 if out["known_result"] == "PASS" else 1)
