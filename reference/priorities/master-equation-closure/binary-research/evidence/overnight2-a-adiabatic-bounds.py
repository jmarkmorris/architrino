"""Exact polynomial majorants for a finite negative canonical branch.

These are subject arithmetic, pending independent mathematical assessment.
No trajectory or alternative physical equation is evolved.
"""
import argparse
import hashlib
import importlib.util
import json
import pathlib
import resource
import signal
import time

import sympy as sp

START = time.monotonic()
signal.signal(signal.SIGALRM, lambda *_: (_ for _ in ()).throw(TimeoutError("90-second budget")))
signal.alarm(90)
SOURCE = pathlib.Path(__file__).with_name("overnight2-a-canonical-adiabatic.py")
EXPECTED = "69bff0a0ca954f10c373848311543e1b2ea6bc75ccc942579fcc36db750f05e8"
assert hashlib.sha256(SOURCE.read_bytes()).hexdigest() == EXPECTED
spec = importlib.util.spec_from_file_location("frozen_account_subject", SOURCE)
engine = importlib.util.module_from_spec(spec)
spec.loader.exec_module(engine)
P, Q, alpha = engine.P, engine.Q, engine.alpha
x, y = sp.symbols("x y", real=True)
eps = sp.Rational("0.00033356411")
hlo, hhi, slope, seed = sp.Rational(".999"), sp.Integer(5000), sp.Rational(".98"), sp.Integer(6)


def h_integral(power):
    if power == -1:
        return sp.Integer(9)
    return (hhi**(power + 1) - hlo**(power + 1)) / (power + 1)


def bound_polynomial(poly, epower, hpower):
    """Integral bound for eps^epower h^hpower poly, dtheta<=dh/(.98 eps)."""
    shifted = sp.Poly(sp.expand(poly.subs({P: y, Q: x + 1})), x, y)
    total = sp.Integer(0)
    for (a, b), coefficient in shifted.terms():
        if coefficient == 0:
            continue
        d = a + b
        assert epower + d - 1 >= 0
        total += abs(coefficient) * seed**d * eps**(epower + d - 1) * h_integral(hpower + d) / slope
    return sp.factor(total)


def display(rational):
    return {"exact": str(rational), "decimal_diagnostic": str(sp.N(rational, 24))}


def known():
    assert h_integral(0) == hhi - hlo
    assert h_integral(-2) == 1 / hlo - 1 / hhi
    assert sum(sp.Rational(9)**k / sp.factorial(k) for k in range(21)) > hhi / hlo
    fixed = 1 - 2 * (Q - 1) + 3 * (Q - 1)**2 * P
    expected = (eps * h_integral(-4) + 2 * seed * eps**2 * h_integral(-3) + 3 * seed**3 * eps**4 * h_integral(-1)) / slope
    assert sp.expand(bound_polynomial(fixed, 2, -4) - expected) == 0
    assert engine.rotation(P**2 + (Q - 1)**2) == 0
    return {"mode": "known", "status": "PASS", "controls": ["constant integral", "inverse-square integral", "log upper bound by exponential series", "fixed signed polynomial majorant", "central account"]}


def target():
    js, resonances = engine.construct(6)
    J = sum(alpha**j * z for j, z in enumerate(js))
    B = sum(alpha**j * z for j, z in enumerate(engine.B))
    A = sum(alpha**j * z for j, z in enumerate(engine.R))
    Pd, Qd = alpha * P * B + Q + A, 2 * alpha * Q * B - P
    # h*z in the fixed receiving n,t components.
    zn = Q - 1 + sp.Rational(5, 2) * alpha**2 + alpha * (-P + 2 * alpha) / 2
    zt = -P + 2 * alpha + alpha * (Q - 1 + sp.Rational(5, 2) * alpha**2) / 2
    def moving_derivative(z):
        return sp.diff(z, P) * Pd + sp.diff(z, Q) * Qd - alpha**2 * B * sp.diff(z, alpha) - alpha * B * z
    Fn = sp.expand(moving_derivative(zn) - zt)
    Ft = sp.expand(moving_derivative(zt) + zn)
    assert all(sp.expand(z.coeff(alpha, j)) == 0 for z in (Fn, Ft) for j in (0, 1))
    assert Fn.coeff(alpha, 2).subs({P: 0, Q: 1}) == 0
    assert Ft.coeff(alpha, 2).subs({P: 0, Q: 1}) == 0
    phase = sp.expand(1 - B - alpha * Qd + alpha**2 * B * (Q - 1 + sp.Rational(1, 3)) - sp.Rational(2, 3) * alpha**2 * Pd + sp.Rational(4, 3) * alpha**3 * B * P)
    assert all(phase.coeff(alpha, j) == 0 for j in (0, 1, 2))
    residual_bounds = {}
    for n in range(7, 14):
        residual_bounds[str(n)] = bound_polynomial(engine.coefficient(js, n), n, -n - 2)
    orientation_bounds = {}
    for n in range(2, 12):
        value = bound_polynomial(Fn.coeff(alpha, n), n, -n - 1) + bound_polynomial(Ft.coeff(alpha, n), n, -n - 1)
        if value:
            orientation_bounds[str(n)] = value
    phase_bounds = {}
    for n in range(3, 11):
        value = bound_polynomial(phase.coeff(alpha, n), n, -n)
        if value:
            phase_bounds[str(n)] = value
    Cr, Ct = sp.Integer(90000000000000), sp.Integer(2200000000000)
    G = sp.expand(P * sp.diff(J, P) + 2 * Q * sp.diff(J, Q) - 2 * J - alpha * sp.diff(J, alpha))
    error_bounds = {}
    for j in range(7):
        value = Cr * bound_polynomial(sp.diff(js[j], P), j + 8, -j - 10) + Ct * bound_polynomial(G.coeff(alpha, j), j + 8, -j - 10)
        error_bounds[str(j)] = value
    engine.progress("majorants-complete")
    return {
        "mode": "target", "grade": "exact conditional subject majorants; independent assessment pending",
        "domain": {"epsilon_upper": str(eps), "h_lower": str(hlo), "h_upper": str(hhi), "eccentricity_norm_upper": "6 epsilon h", "h_slope_lower": ".98 epsilon"},
        "account_polynomial_residual": {k: display(v) for k, v in residual_bounds.items()},
        "account_polynomial_residual_total": display(sum(residual_bounds.values())),
        "account_actual_row_error": {k: display(v) for k, v in error_bounds.items()},
        "account_actual_row_error_total": display(sum(error_bounds.values())),
        "corrected_vector_total_variation_polynomial": display(sum(orientation_bounds.values())),
        "corrected_vector_by_order": {k: display(v) for k, v in orientation_bounds.items()},
        "phase_polynomial_total_variation": display(sum(phase_bounds.values())),
        "phase_by_order": {k: display(v) for k, v in phase_bounds.items()},
        "corrected_vector_derivative_coefficients": {str(n): [str(Fn.coeff(alpha, n)), str(Ft.coeff(alpha, n))] for n in range(2, 12) if Fn.coeff(alpha, n) != 0 or Ft.coeff(alpha, n) != 0},
        "phase_derivative_coefficients": {str(n): str(phase.coeff(alpha, n)) for n in range(3, 11) if phase.coeff(alpha, n) != 0},
        "excluded": ["release", "separate nu forcing", "actual row contribution to corrected vector and phase", "literal interval arithmetic", "physical fate"],
    }


parser = argparse.ArgumentParser()
parser.add_argument("mode", choices=["known", "target"])
args = parser.parse_args()
result = known() if args.mode == "known" else target()
result["source_sha256"] = hashlib.sha256(pathlib.Path(__file__).read_bytes()).hexdigest()
result["reused_producer_sha256"] = EXPECTED
result["elapsed_seconds"] = time.monotonic() - START
result["peak_rss_bytes"] = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss
assert result["peak_rss_bytes"] < 512 * 1024 * 1024
output = json.dumps(result, indent=2)
assert len(output.encode()) < 1048576
print(output, flush=True)
