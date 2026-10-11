"""Derivation of the first correction to the root-birth arrival time for a straight source.

Setting: source on the straight path X(s) = (V s, 0), V > 1, unit coupling, c_f = 1; receiver at rest
at the birth, at height b. With xi = x - V t the two causal roots have tau|D| = sqrt(Delta),
Delta = xi^2 - (V^2-1) y^2, and the summed canonical row is sigma*S/sqrt(Delta) with
S = sum_i rho_i/tau_i^2. These closed forms are derived in the serial task-4 report and re-derived
here symbolically from the root quadratic.

Method: write the receiver's displacement as delta = -G n_b + (s t) m_b + (higher order), where
G = t - n_b.dr is the root-function maximum of the leading law, n_b is the birth direction, m_b its
normal and s = sqrt(V^2-1). Expand S.n_b and Delta to first order in the small quantity
lambda = kappa tau_b^3 = b^2 V^2. The leading law is y' = -sigma c/sqrt(G), G' = y. The first
correction multiplies the right side by 1 + (p t + r G)/tau_b. Parametrising by y, which is monotone
for both polarities, the arrival time is T = T_0 (1 + C_sigma(V) lambda + ...). The like-polarity
endpoint y_* = 0 is regular in this parametrisation.

This is symbolic algebra. No trajectory is integrated. The measured values quoted for comparison
are read from root-birth-impulse-law-independent-adjudication-2026-10-06.md.
Known cases run first.
"""
import json
import sys
import sympy as sp

V, b, xi, yv, t, G, y, lam = sp.symbols("V b xi y_r t G y lambda", positive=True)
s = sp.sqrt(V ** 2 - 1)


def rows():
    """S = sum over the two roots of rho_i/tau_i^2, from the root quadratic, as rational functions."""
    T = sp.symbols("T")
    quad = sp.Poly((V ** 2 - 1) * T ** 2 + 2 * V * xi * T + xi ** 2 + yv ** 2, T)
    a2, a1, a0 = quad.all_coeffs()
    e1, e2 = -a1 / a2, a0 / a2                      # tau_+ + tau_-, tau_+ tau_-
    sum_inv = e1 / e2                                # sum 1/tau
    sum_inv2 = (e1 ** 2 - 2 * e2) / e2 ** 2          # sum 1/tau^2
    Sx = sp.simplify(xi * sum_inv2 + V * sum_inv)    # rho_x = xi + V tau
    Sy = sp.simplify(yv * sum_inv2)
    return Sx, Sy


def setup():
    Sx, Sy = rows()
    xb, tau_b = -s * b, V * b / s
    nb = sp.Matrix([1 / V, s / V])
    mb = sp.Matrix([-s / V, 1 / V])
    at_b = {xi: xb, yv: b}
    Sb = sp.Matrix([Sx, Sy]).subs(at_b).applyfunc(sp.simplify)
    Sn = (Sx * nb[0] + Sy * nb[1])
    grad = sp.Matrix([sp.diff(Sn, xi), sp.diff(Sn, yv)]).subs(at_b).applyfunc(sp.simplify)
    dn = sp.simplify((grad.T * nb)[0])               # derivative of S.n_b along n_b
    dm = sp.simplify((grad.T * mb)[0])               # derivative of S.n_b along m_b
    Snb = sp.simplify((Sb.T * nb)[0])
    return dict(Sx=Sx, Sy=Sy, xb=xb, tau_b=tau_b, nb=nb, mb=mb, Sb=Sb, Snb=Snb, dn=dn, dm=dm)


def coefficients(c):
    tau_b = c["tau_b"]
    # Delta = G [2 V s b + 2 s^2 t + (2 - V^2) G]  (displacement -G n_b + s t m_b), so
    # Delta^{-1/2} = (2 V s b G)^{-1/2} [1 - t/(2 tau_b) - (2 - V^2) G/(4 s^2 tau_b)].
    p = sp.simplify(-sp.Rational(1, 2) + tau_b * s * c["dm"] / c["Snb"])
    r = sp.simplify(-(2 - V ** 2) / (4 * s ** 2) - tau_b * c["dn"] / c["Snb"])
    return p, r


def C(p, r, ystar):
    """Relative first correction per unit lambda, with 1/(c^2 tau_b) = lambda/2."""
    yy = sp.symbols("yy")
    eps1 = sp.Rational(1, 2) * (p * (y - 1) ** 2 * (y + 2) / 12 + r * (1 - y ** 2) ** 2 / 16)
    inner = sp.integrate(eps1.subs(y, yy) * yy, (yy, 1, y))
    dT = sp.integrate((1 - y ** 2) * eps1 / 4 - inner / 2, (y, 1, ystar))
    T0 = sp.Rational(1, 12) * (ystar - 1) ** 2 * (ystar + 2)
    return sp.simplify(dT / T0)


def known(c):
    out = {}
    out["S at the birth equals (2/tau_b) n_b"] = sp.simplify(c["Sb"] - 2 / c["tau_b"] * c["nb"]) == sp.zeros(2, 1)
    out["n_b.V = 1 and n_b, m_b orthonormal"] = sp.simplify(c["nb"][0] * V - 1) == 0 and sp.simplify(c["nb"].dot(c["mb"])) == 0 and sp.simplify(c["nb"].dot(c["nb"]) - 1) == 0
    # Delta factorisation for the displacement -G n_b + s t m_b.
    d = -G * c["nb"] + s * t * c["mb"]
    Delta = sp.expand((c["xb"] + d[0]) ** 2 - (V ** 2 - 1) * (b + d[1]) ** 2)
    out["Delta = G[2Vsb + 2s^2 t + (2-V^2)G]"] = sp.simplify(Delta - G * (2 * V * s * b + 2 * s ** 2 * t + (2 - V ** 2) * G)) == 0
    # Hand-derived closed forms of the summed row.
    rho2 = xi ** 2 + yv ** 2
    out["S_x = 2 xi [xi^2 - (2V^2-1) y^2]/rho^4"] = sp.simplify(c["Sx"] - 2 * xi * (xi ** 2 - (2 * V ** 2 - 1) * yv ** 2) / rho2 ** 2) == 0
    out["S_y = 2 y [(V^2+1) xi^2 - (V^2-1) y^2]/rho^4"] = sp.simplify(c["Sy"] - 2 * yv * ((V ** 2 + 1) * xi ** 2 - (V ** 2 - 1) * yv ** 2) / rho2 ** 2) == 0
    # With no correction the y-parametrised time integral is the leading law's t_* (both polarities).
    for ys in (2, 0):
        T0 = sp.integrate(-(1 - y ** 2) / 4, (y, 1, ys))
        out["leading time integral at y_* = %d equals (y_*-1)^2 (y_*+2)/12" % ys] = sp.simplify(T0 - sp.Rational(1, 12) * (ys - 1) ** 2 * (ys + 2)) == 0
    # A pure rescaling of the right side by (1 + e) replaces c by c(1 + e). The leading time is
    # proportional to 1/c^2, so the correction functional applied to a constant eps1 = e must give -2e.
    # (The first run of this script expected -e here; that expectation was this script's error, and the
    # first-run source and output are retained.)
    yy = sp.symbols("yy")
    e = sp.symbols("e")
    for ys in (2, 0):
        inner = sp.integrate(e * yy, (yy, 1, y))
        dT = sp.integrate((1 - y ** 2) * e / 4 - inner / 2, (y, 1, ys))
        out["constant rescaling control at y_* = %d gives -2e" % ys] = sp.simplify(dT / (sp.Rational(1, 12) * (ys - 1) ** 2 * (ys + 2)) + 2 * e) == 0
    return out


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode not in ("known", "target"):
        raise SystemExit("usage: known | target")
    c = setup()
    k = known(c)
    res = {"mode": mode, "known": {a: bool(v) for a, v in k.items()}, "known_result": "PASS" if all(k.values()) else "FAIL"}
    if mode == "target" and res["known_result"] == "PASS":
        p, r = coefficients(c)
        Copp, Clike = C(p, r, 2), C(p, r, 0)
        res["p"], res["r"] = str(sp.factor(p)), str(sp.factor(r))
        res["C_opposite"], res["C_like"] = str(sp.factor(Copp)), str(sp.factor(Clike))
        res["values"] = {str(v): {"opposite": float(Copp.subs(V, v)), "like": float(Clike.subs(V, v))} for v in (sp.Rational(3, 2), 3, 10, 30, 100)}
        res["limit_V_to_infinity"] = {"opposite": str(sp.limit(Copp, V, sp.oo)), "like": str(sp.limit(Clike, V, sp.oo))}
        res["limit_V_to_1"] = {"opposite": str(sp.limit(Copp, V, 1, "+")), "like": str(sp.limit(Clike, V, 1, "+"))}
        res["measured_for_comparison"] = {"V=3": {"opposite": "0.273 to 0.286", "like": "0.097 to 0.107"}, "V=10": {"opposite": "0.298 to 0.300", "like": "0.0995 to 0.100"}, "V=1.5": {"opposite": "0.195 to 0.197 (0.15 at the smallest b)", "like": "0.0825 to 0.0842 (0.111 at the smallest b)"}, "V=30 at lambda 0.0144": {"opposite": "0.302", "like": "0.0997"}}
    print(json.dumps(res, indent=1))
    raise SystemExit(0 if res["known_result"] == "PASS" else 1)
