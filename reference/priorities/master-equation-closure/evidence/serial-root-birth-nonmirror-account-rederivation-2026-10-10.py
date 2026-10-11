"""Separately written re-derivation of the corrected account's decisive constants.

What it does. For two opposite-polarity architrinos in exact mirror motion X_+ = Y, X_- = -Y under the
unchanged canonical row  X_i'' = -K n/(R^2 (1 - n.V_j)),  K = 4 eps^2, c_f = 1, it expands the delayed
row in the slow time s = eps*T as a power series in eps, replacing every higher derivative of the
source path by the equation itself. From that series it builds the corrected account polynomials
J_0..J_4 by solving the homological equations directly, and reports the two numbers the literal phase
depends on, J_2(0,0) and J_4(0,0).

Independence. It imports no project code and was written without reading the response engine, the
subject or reference instruments, or their receipts. The displayed formulas of
overnight2-a-reference-adiabatic.md (its B_2, B_3, J_2, J_3, J_4, M_3, M_5) are used only as the
comparison targets at the end.

Scope. Exact mirror motion only (midpoint velocity zero), planar. It is symbolic algebra, not a
trajectory, and it proves nothing about remainders, the release, or the spatial neighbourhood.

Known cases run first: values derived by hand in the serial task-4 report (a_1 = -P, a_2 = Q^2/2,
B_0 = 1, B_1 = P, J_1 = -2y(x+2), uncorrected J_2 = x^3 + 2x^2 - 2y^2 + 9x) and circle means.
"""
import json
import sys
import time
import sympy as sp

r, p, q, e = sp.symbols("r p q e", positive=True)
al, P, Q, h, x, y, E = sp.symbols("alpha P Q h x y E")


def trunc(expr, n):
    expr = sp.expand(expr)
    return sum(expr.coeff(e, k) * e ** k for k in range(n + 1))


def dstate(f, A):
    return sp.diff(f, r) * p + sp.diff(f, p) * (A[0] + q ** 2 / r) + sp.diff(f, q) * (A[1] - p * q / r)


def dvec(c, A, n):
    return (trunc(dstate(c[0], A) - q / r * c[1], n), trunc(dstate(c[1], A) + q / r * c[0], n))


def response(N):
    """Radial and transverse parts of Y_ss through order eps^N, as functions of (r, p, q)."""
    A = (-1 / r ** 2, sp.Integer(0))
    for _ in range(N + 1):
        ders = [(r, sp.Integer(0)), (p, q), A]
        for _k in range(3, N + 3):
            ders.append(dvec(ders[-1], A, N))
        R = 2 * r
        for _it in range(N + 1):
            s = -e * R
            rho = [2 * ders[0][i] + sum(s ** k * ders[k][i] / sp.factorial(k) for k in range(1, N + 2)) for i in (0, 1)]
            rho = [trunc(c, N) for c in rho]
            u = trunc((rho[0] ** 2 + rho[1] ** 2) / (4 * r ** 2) - 1, N)
            root, term = sp.Integer(1), sp.Integer(1)
            for k in range(1, N + 1):
                term = trunc(term * u, N)
                root += sp.binomial(sp.Rational(1, 2), k) * term
            R = trunc(2 * r * root, N)
        s = -e * R
        rho = [trunc(2 * ders[0][i] + sum(s ** k * ders[k][i] / sp.factorial(k) for k in range(1, N + 2)), N) for i in (0, 1)]
        G = [trunc(sum(s ** k * ders[k + 1][i] / sp.factorial(k) for k in range(0, N + 1)), N) for i in (0, 1)]
        S = trunc(R + e * (rho[0] * G[0] + rho[1] * G[1]), N)   # R - rho.V_src, with V_src = -eps*G
        w = trunc(R ** 2 * S / (8 * r ** 3) - 1, N)
        inv, term = sp.Integer(1), sp.Integer(1)
        for k in range(1, N + 1):
            term = trunc(-term * w, N)
            inv += term
        A = tuple(trunc(-4 * rho[i] * inv / (8 * r ** 3), N) for i in (0, 1))
    return A


def to_PQ(A, N):
    """a = r^2 A_r and B = r^2 A_t/(alpha Q) as lists of coefficients in alpha, polynomials in P, Q."""
    sub = {r: h ** 2 / Q, p: P / h, q: Q / h, e: al * h}
    a = sp.expand(sp.simplify((r ** 2 * A[0]).subs(sub)))
    b = sp.expand(sp.simplify((r ** 2 * A[1]).subs(sub)))
    a_c = [sp.factor(sp.simplify(a.coeff(al, k))) for k in range(N + 1)]
    B_c = [sp.factor(sp.simplify(b.coeff(al, k + 1) / Q)) for k in range(N)]
    assert sp.simplify(b.coeff(al, 0)) == 0
    for c in a_c + B_c:
        assert h not in c.free_symbols, "scaling variable did not cancel"
    return a_c, B_c


def mean(poly):
    """Circle mean of a polynomial in x, y at fixed E = x^2 + y^2, as a polynomial in E."""
    out = sp.Integer(0)
    for (i, j), c in sp.Poly(sp.expand(poly), x, y).terms():
        if i % 2 or j % 2:
            continue
        a_, b_ = i // 2, j // 2
        out += c * sp.factorial(2 * a_) * sp.factorial(2 * b_) / (4 ** (a_ + b_) * sp.factorial(a_) * sp.factorial(b_) * sp.factorial(a_ + b_)) * E ** (a_ + b_)
    return sp.expand(out)


def order_coeff(n, Js, a_c, B_c):
    """Coefficient of alpha^n in (2 a Q B - P)F_x + (a P B + Q + a)F_y - a^2 B F_alpha - 2 a B F, with the
    unknown J_n left out (its contribution is L_0 J_n)."""
    F = sum(al ** j * Js[j] for j in range(len(Js)))
    Bs = sum(al ** k * B_c[k].subs({P: y, Q: x + 1}) for k in range(len(B_c)))
    a_s = sum(al ** k * a_c[k].subs({P: y, Q: x + 1}) for k in range(len(a_c)))
    Qx, Py = x + 1, y
    D = (2 * al * Qx * Bs - Py) * sp.diff(F, x) + (al * Py * Bs + Qx + a_s) * sp.diff(F, y) - al ** 2 * Bs * sp.diff(F, al) - 2 * al * Bs * F
    return sp.expand(sp.expand(D).coeff(al, n))


def solve_L0(S, deg):
    """Zero-mean polynomial J with -y J_x + x J_y = -S."""
    mons = [(i, j) for i in range(deg + 1) for j in range(deg + 1 - i) if i + j >= 1]
    cs = sp.symbols("c0:%d" % len(mons))
    Jn = sum(c * x ** i * y ** j for c, (i, j) in zip(cs, mons))
    eqs = sp.Poly(sp.expand(-y * sp.diff(Jn, x) + x * sp.diff(Jn, y) + S), x, y).coeffs()
    eqs += sp.Poly(mean(Jn) + E * 0, E).coeffs() if mean(Jn) != 0 else []
    sol = sp.solve(eqs, cs, dict=True)
    assert sol, "homological equation has no solution: a nonzero mean was left in"
    return sp.expand(Jn.subs(sol[0]).subs({c: 0 for c in cs}))


def build(N, a_c, B_c):
    Js, means, shifts = [x ** 2 + y ** 2], {}, {}
    for n in range(1, N + 1):
        S = order_coeff(n, Js, a_c, B_c)
        M = mean(S)
        means[n] = M
        if M != 0:
            phi = sp.Integer(0)
            for (k,), m in sp.Poly(M, E).terms():
                assert 2 * k - (n + 1) != 0, "resonant mean"
                phi += -m / (2 * k - (n + 1)) * E ** k
            shifts[n - 1] = phi
            Js[n - 1] = sp.expand(Js[n - 1] + phi.subs(E, x ** 2 + y ** 2))
            S = order_coeff(n, Js, a_c, B_c)
            assert mean(S) == 0
        if n < N:
            Js.append(solve_L0(S, sp.Poly(S, x, y).total_degree() + 1))
    return Js, means, shifts


def run(mode):
    t0 = time.time()
    out = {"mode": mode}
    # Known cases: orders through two, against values derived by hand.
    A2 = response(2)
    a_c, B_c = to_PQ(A2, 2)
    known = {
        "a_0 = -1": sp.simplify(a_c[0] + 1) == 0,
        "a_1 = -P": sp.simplify(a_c[1] + P) == 0,
        "a_2 = Q^2/2": sp.simplify(a_c[2] - Q ** 2 / 2) == 0,
        "B_0 = 1": sp.simplify(B_c[0] - 1) == 0,
        "B_1 = P": sp.simplify(B_c[1] - P) == 0,
        "mean x^2 = E/2": mean(x ** 2) == E / 2,
        "mean x^4 = 3E^2/8": mean(x ** 4) == 3 * E ** 2 / 8,
        "mean x^2 y^2 = E^2/8": mean(x ** 2 * y ** 2) == E ** 2 / 8,
        "mean of an odd monomial is zero": mean(x ** 3 * y ** 2) == 0,
    }
    Js2 = [x ** 2 + y ** 2]
    S1 = order_coeff(1, Js2, a_c, B_c)
    J1 = solve_L0(S1, 3)
    known["J_1 = -2y(x+2)"] = sp.expand(J1 + 2 * y * (x + 2)) == 0
    S2 = order_coeff(2, [Js2[0], J1], a_c, B_c)
    known["order-two mean is zero"] = mean(S2) == 0
    J2u = solve_L0(S2, 4)
    known["uncorrected J_2 = x^3 + 2x^2 - 2y^2 + 9x"] = sp.expand(J2u - (x ** 3 + 2 * x ** 2 - 2 * y ** 2 + 9 * x)) == 0
    out["known"] = {k: bool(v) for k, v in known.items()}
    out["known_result"] = "PASS" if all(known.values()) else "FAIL"
    out["known_seconds"] = round(time.time() - t0, 2)
    if mode == "known" or out["known_result"] != "PASS":
        return out
    N = 5
    A5 = response(N)
    a_c, B_c = to_PQ(A5, N)
    out["a"] = [str(c) for c in a_c]
    out["B"] = [str(c) for c in B_c]
    Js, means, shifts = build(N, a_c, B_c)
    doc_J2 = x ** 3 + sp.Rational(11, 3) * x ** 2 - y ** 2 / 3 + 9 * x + 4
    doc_J3 = y / 3 * (7 * x ** 2 + 2 * y ** 2 + 24 * x + 45)
    doc_J4 = (45 * x ** 5 - 177 * x ** 4 - 2370 * x ** 3 - 5929 * x ** 2 - 13035 * x - 4035 + (636 * x ** 2 + 480 * x + 161) * y ** 2 + 78 * y ** 4) / 180
    target = {
        "B_2 = -5Q/3": sp.simplify(B_c[2] + 5 * Q / 3) == 0,
        "B_3 = PQ(3Q-38)/6": sp.simplify(B_c[3] - P * Q * (3 * Q - 38) / 6) == 0,
        "J_2 equals the displayed polynomial": sp.expand(Js[2] - doc_J2) == 0,
        "J_3 equals the displayed polynomial": sp.expand(Js[3] - doc_J3) == 0,
        "J_4 equals the displayed polynomial": sp.expand(Js[4] - doc_J4) == 0,
        "M_3 = 16 + 10E/3": sp.expand(means[3] - (16 + sp.Rational(10, 3) * E)) == 0,
        "M_5 = -269/2 - 2884E/45 + 113E^2/240": sp.expand(means[5] - (-sp.Rational(269, 2) - sp.Rational(2884, 45) * E + sp.Rational(113, 240) * E ** 2)) == 0,
        "even-order means vanish": means[2] == 0 and means[4] == 0,
        "J_2(0,0) = 4": Js[2].subs({x: 0, y: 0}) == 4,
        "J_4(0,0) = -269/12": Js[4].subs({x: 0, y: 0}) == -sp.Rational(269, 12),
    }
    out["target"] = {k: bool(v) for k, v in target.items()}
    out["target_result"] = "PASS" if all(target.values()) else "FAIL"
    out["J"] = [str(j) for j in Js]
    out["means"] = {str(k): str(v) for k, v in means.items()}
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
