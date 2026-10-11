"""Seventh-order account and the four polynomial integral budgets, from the separately written expansion.

Part 1 extends the separately written re-derivation (ring arithmetic for the delayed mirror row, direct
homological construction) from fifth to seventh order, and compares J_5, J_6, the order-seven mean and
the leading residual R_7 with the formulas displayed in overnight2-a-reference-adiabatic.md.

Part 2 applies the integration rule displayed in overnight2-a-reference-adiabatic-budget.md, its (3),
to the polynomials produced in Part 1: a monomial c eps^j h^k x^a y^b with d = a + b is bounded by
|c| 6^d eps_+^(j+d-1)/0.98 * integral_{.999}^{5000} h^(k+d) dh, with the value 9 for the logarithmic
case. It evaluates the four budgets that document tabulates and compares them with its displayed
decimal diagnostics. The response allowances 9e13 and 2.2e12 are that document's inputs and are not
derived here.

It imports only this review's own two re-derivation scripts. It reads no subject or reference
instrument and no receipt. Symbolic and exact-rational arithmetic only. Known cases run first.
"""
import importlib.util
import json
import pathlib
import sys
import time
import sympy as sp

here = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("ring", here / "serial-root-birth-nonmirror-account-rederivation-ring-2026-10-10.py")
ring = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ring)
m = ring.m
al, P, Q, x, y, E = m.al, m.P, m.Q, m.x, m.y, m.E

EPS_PLUS = sp.Rational(33356411, 10 ** 11)
H_LO, H_HI = sp.Rational(999, 1000), sp.Integer(5000)


def power_integral(n):
    if n == -1:
        return sp.Integer(9)
    return (H_HI ** (n + 1) - H_LO ** (n + 1)) / (n + 1)


def majorant(poly, k_of_j, j_shift=0, scale=1):
    """Sum of the rule's bounds over the monomials of a polynomial in (alpha, x, y)."""
    total = sp.Integer(0)
    for (j, a, b), c in sp.Poly(sp.expand(poly), al, x, y).terms():
        d, jj = a + b, j + j_shift
        assert jj + d - 1 >= 0, "negative combined epsilon exponent"
        total += scale * abs(c) * 6 ** d * EPS_PLUS ** (jj + d - 1) / sp.Rational(98, 100) * power_integral(k_of_j(jj) + d)
    return total


def known():
    out = {}
    out["power integral of h^2"] = power_integral(2) == (H_HI ** 3 - H_LO ** 3) / 3
    out["power integral of h^-3"] = power_integral(-3) == (H_HI ** -2 - H_LO ** -2) / -2
    out["logarithmic case bounded by 9, and exp(9) exceeds 5000/.999"] = power_integral(-1) == 9 and sum(sp.Integer(9) ** k / sp.factorial(k) for k in range(21)) > H_HI / H_LO
    # One monomial by hand: 3 alpha^7 x y^2 with k = -j-2: |c| 6^3 eps^(7+3-1)/0.98 * integral h^(-9+3).
    hand = 3 * 216 * EPS_PLUS ** 9 / sp.Rational(98, 100) * power_integral(-6)
    out["one monomial by hand"] = majorant(3 * al ** 7 * x * y ** 2, lambda j: -j - 2) == hand
    # Sign of the coefficient must not matter.
    out["absolute value of the coefficient"] = majorant(-3 * al ** 7 * x * y ** 2, lambda j: -j - 2) == hand
    r = ring.run("known")
    out["ring re-derivation known cases"] = r["known_result"] == "PASS"
    return out


def run(mode):
    t0 = time.time()
    k = known()
    out = {"mode": mode, "known": {a: bool(v) for a, v in k.items()}, "known_result": "PASS" if all(k.values()) else "FAIL"}
    if mode == "known" or out["known_result"] != "PASS":
        return out
    N = 7
    a_c, B_c = ring.to_PQ(ring.response(N), N)
    out["a"], out["B"] = [str(c) for c in a_c], [str(c) for c in B_c]
    out["response_seconds"] = round(time.time() - t0, 2)
    Js, means, shifts = m.build(N, a_c, B_c)
    out["build_seconds"] = round(time.time() - t0, 2)
    doc_J5 = -y * (529 * x ** 4 + 2624 * x ** 3 + 5022 * x ** 2 + 5854 * x + 13365 + (-196 * x ** 2 - 116 * x + 516) * y ** 2 - 8 * y ** 4) / 60
    doc_J6 = (4725 * x ** 7 + 128385 * x ** 6 + 1190511 * x ** 5 + 3828330 * x ** 4 + 9007565 * x ** 3 + 15895345 * x ** 2 + 57000195 * x + 13598235
              + (-832950 * x ** 4 - 3278520 * x ** 3 - 5483250 * x ** 2 - 1716960 * x - 18560) * y ** 2
              + (28890 * x ** 2 + 173880 * x - 127335) * y ** 4 - 30690 * y ** 6) / 37800
    doc_M7 = sp.Rational(43169, 15) + sp.Rational(3175357, 2520) * E + sp.Rational(124883, 1680) * E ** 2 - sp.Rational(7013, 6720) * E ** 3
    doc_R7 = -(836865 * x ** 7 + 7126830 * x ** 6 + 23506983 * x ** 5 + 40480980 * x ** 4 + 47217305 * x ** 3 + 64582950 * x ** 2 + 310651215 * x
               - (9321480 * x ** 5 + 52676550 * x ** 4 + 117744300 * x ** 3 + 134526420 * x ** 2 + 74550260 * x + 64582950) * y ** 2
               + (6397920 * x ** 3 + 19472400 * x ** 2 + 20712960 * x + 4361160) * y ** 4 - (250560 * x + 486000) * y ** 6) / 37800
    sub = {P: y, Q: x + 1}
    F = sum(al ** j * Js[j] for j in range(7))
    Bs = sum(al ** i * B_c[i].subs(sub) for i in range(7))
    a7 = sum(al ** i * a_c[i].subs(sub) for i in range(8))
    Qx, Py = x + 1, y

    def D(G, last):
        return sp.expand((2 * al * Qx * Bs - Py) * sp.diff(G, x) + (al * Py * Bs + Qx + a7) * sp.diff(G, y) - al ** 2 * Bs * sp.diff(G, al) - last * al * Bs * G)

    DF = D(F, 2)
    low = [sp.expand(DF.coeff(al, n)) for n in range(7)]
    target = {
        "J_5 equals the displayed polynomial": sp.expand(Js[5] - doc_J5) == 0,
        "J_6 equals the displayed polynomial": sp.expand(Js[6] - doc_J6) == 0,
        "M_7 equals the displayed order-seven mean": sp.expand(means[7] - doc_M7) == 0,
        "order-six mean vanishes": means[6] == 0,
        "the residual has no term below order seven": all(c == 0 for c in low),
        "the residual ends at order thirteen": sp.Poly(DF, al).degree() == 13,
        "R_7 equals the displayed polynomial": sp.expand(DF.coeff(al, 7) - doc_R7) == 0,
    }
    # Budgets.
    account_residual = majorant(DF, lambda j: -j - 2)
    FP = sp.expand(sp.diff(F, y))
    G = sp.expand(Py * sp.diff(F, y) + 2 * Qx * sp.diff(F, x) - al * sp.diff(F, al) - 2 * F)
    Cr, Ct = sp.Integer(9) * 10 ** 13, sp.Rational(22, 10) * 10 ** 12
    response = majorant(FP, lambda j: -j - 2, j_shift=8, scale=Cr) + majorant(G, lambda j: -j - 2, j_shift=8, scale=Ct)
    Zn = x - al * y / 2 + sp.Rational(7, 2) * al ** 2
    Zt = -y + 2 * al + al * x / 2 + sp.Rational(5, 4) * al ** 3
    Vn, Vt = sp.expand(D(Zn, 1) - Zt), sp.expand(D(Zt, 1) + Zn)
    vector = majorant(Vn, lambda j: -j - 1) + majorant(Vt, lambda j: -j - 1)
    phase_poly = sp.expand(1 - Bs + al * Py - al ** 2 * Bs * (Qx + sp.Rational(2, 3)) + sp.Rational(2, 3) * al ** 3 * Py * Bs - sp.Rational(2, 3) * al ** 2 * (Qx + a7))
    phase = majorant(phase_poly, lambda j: -j)
    target.update({
        "vector row: orders zero and one vanish; order two is (y(x+3), -x - x^2/2)": Vn.coeff(al, 0) == 0 and Vt.coeff(al, 0) == 0 and Vn.coeff(al, 1) == 0 and Vt.coeff(al, 1) == 0 and sp.expand(Vn.coeff(al, 2) - y * (x + 3)) == 0 and sp.expand(Vt.coeff(al, 2) + x + x ** 2 / 2) == 0,
        "phase row: orders zero to two vanish": all(sp.expand(phase_poly.coeff(al, n)) == 0 for n in range(3)),
        "account residual budget equals 3.3294216245294359e-21 to the displayed digits and is below 3.33e-21": abs(sp.Float(account_residual, 25) - sp.Float("3.3294216245294359e-21", 25)) < sp.Float("1e-37") and account_residual < sp.Rational(333, 100) * sp.Rational(1, 10 ** 21),
        "response allowance budget equals 2.8017237817192899e-14 to the displayed digits and is below 2.802e-14": abs(sp.Float(response, 25) - sp.Float("2.8017237817192899e-14", 25)) < sp.Float("1e-30") and response < sp.Rational(2802, 1000) * sp.Rational(1, 10 ** 14),
        "vector variation budget equals 3.3286205032015276e-6 to the displayed digits and is below 3.329e-6": abs(sp.Float(vector, 25) - sp.Float("3.3286205032015276e-6", 25)) < sp.Float("1e-22") and vector < sp.Rational(3329, 1000) * sp.Rational(1, 10 ** 6),
        "phase variation budget equals 1.2988501125235295e-9 to the displayed digits and is below 1.299e-9": abs(sp.Float(phase, 25) - sp.Float("1.2988501125235295e-9", 25)) < sp.Float("1e-25") and phase < sp.Rational(1299, 1000) * sp.Rational(1, 10 ** 9),
    })
    out["budgets"] = {"account_residual": str(sp.Float(account_residual, 20)), "response_allowance": str(sp.Float(response, 20)), "vector_variation": str(sp.Float(vector, 20)), "phase_variation": str(sp.Float(phase, 20))}
    out["target"] = {a: bool(v) for a, v in target.items()}
    out["target_result"] = "PASS" if all(target.values()) else "FAIL"
    out["J5"], out["J6"] = str(Js[5]), str(Js[6])
    out["means"] = {str(a): str(v) for a, v in means.items()}
    out["seconds"] = round(time.time() - t0, 2)
    return out


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode not in ("known", "target"):
        raise SystemExit("usage: known | target")
    res = run(mode)
    print(json.dumps(res, indent=1))
    ok = res["known_result"] == "PASS" and (mode == "known" or res.get("target_result") == "PASS")
    raise SystemExit(0 if ok else 1)
