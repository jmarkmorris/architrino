"""Faster arithmetic for the separately written account re-derivation.

Same mathematics as serial-root-birth-nonmirror-account-rederivation-2026-10-10.py: the delayed
canonical row of two opposite-polarity architrinos in exact mirror motion, expanded in the slow time,
followed by the direct homological construction of the corrected account. The only difference is that
the delay expansion is carried out in exact rational polynomial-ring arithmetic in (u = 1/r, p, q, eps)
instead of general symbolic expressions, so the fifth-order expansion finishes quickly. The homological
steps are the functions of the first script, imported unchanged.

With rho = 2r*rt, R = 2r*Rt and s = -eps*R, every term is a polynomial:
  rt = (1,0) + sum_k (-2 eps Rt)^k [Y^(k)/u^(k-1)]/(2 k!),   G = sum_k (-2 eps Rt)^k [Y^(k+1)/u^k]/k!,
  Rt = |rt|,   Y_ss = -u^2 rt/(Rt^2 (Rt + eps rt.G)).

Known cases run first: hand-derived second-order values, and equality with the first script's
expression-based expansion at second order. It imports no other project code and reads no receipt.
"""
import importlib.util
import json
import pathlib
import sys
import time
import sympy as sp

here = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("rederivation", here / "serial-root-birth-nonmirror-account-rederivation-2026-10-10.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

RING, u, p, q, e = sp.ring("u,p,q,e", sp.QQ)
ONE, ZERO = RING.one, RING.zero


def qq(value):
    """Exact rational of the ring's coefficient domain."""
    r = sp.Rational(value)
    return sp.QQ(int(r.p), int(r.q))


def trunc(f, n):
    return RING.from_dict({mon: c for mon, c in f.items() if mon[3] <= n})


def dstate(f, A):
    return -u ** 2 * f.diff(u) * p + f.diff(p) * (A[0] + q ** 2 * u) + f.diff(q) * (A[1] - p * q * u)


def dvec(c, A, n):
    return (trunc(dstate(c[0], A) - q * u * c[1], n), trunc(dstate(c[1], A) + q * u * c[0], n))


def series_pow(base_minus_one, power, n):
    """(1 + U)^power truncated in eps, for U of order eps."""
    out, term = ONE, ONE
    for k in range(1, n + 1):
        term = trunc(term * base_minus_one, n)
        out = out + term * qq(sp.binomial(power, k))
    return out


def chord(ders, Rt, n):
    f = trunc(-2 * e * Rt, n)
    rt, pw = [ONE, ZERO], ONE
    for k in range(1, n + 2):
        pw = trunc(pw * f, n)
        for i in (0, 1):
            rt[i] = rt[i] + trunc(pw * ders[k][i].exquo(u ** (k - 1)), n) * qq(sp.Rational(1, 2 * sp.factorial(k)))
    return [trunc(c, n) for c in rt]


def response(N):
    A = (-u ** 2, ZERO)
    for _ in range(N + 1):
        ders = [None, (p, q), A]
        for _k in range(3, N + 3):
            ders.append(dvec(ders[-1], A, N))
        Rt = ONE
        for _it in range(N + 1):
            rt = chord(ders, Rt, N)
            Rt = series_pow(trunc(rt[0] ** 2 + rt[1] ** 2 - ONE, N), sp.Rational(1, 2), N)
        rt = chord(ders, Rt, N)
        f = trunc(-2 * e * Rt, N)
        G, pw = [ders[1][0], ders[1][1]], ONE
        for k in range(1, N + 1):
            pw = trunc(pw * f, N)
            for i in (0, 1):
                G[i] = G[i] + trunc(pw * ders[k + 1][i].exquo(u ** k), N) * qq(sp.Rational(1, sp.factorial(k)))
        den = trunc(Rt * Rt * (Rt + e * (rt[0] * G[0] + rt[1] * G[1])), N)
        inv = series_pow(trunc(den - ONE, N), -1, N)
        A = tuple(trunc(-u ** 2 * rt[i] * inv, N) for i in (0, 1))
    return A


def to_PQ(A, N):
    al, P, Q, h = m.al, m.P, m.Q, m.h
    a_c, B_c = [sp.Integer(0)] * (N + 1), [sp.Integer(0)] * N
    for mon, c in A[0].exquo(u ** 2).items():
        ku, kp, kq, ke = mon
        assert -2 * ku - kp - kq + ke == 0, "scaling variable did not cancel"
        a_c[ke] += sp.Rational(int(c.numerator), int(c.denominator)) * Q ** (ku + kq) * P ** kp
    for mon, c in A[1].exquo(u ** 2).items():
        ku, kp, kq, ke = mon
        assert -2 * ku - kp - kq + ke == 0 and ke >= 1, "scaling variable did not cancel"
        B_c[ke - 1] += sp.Rational(int(c.numerator), int(c.denominator)) * Q ** (ku + kq - 1) * P ** kp
    return [sp.factor(c) for c in a_c], [sp.factor(c) for c in B_c]


def run(mode):
    t0 = time.time()
    P, Q, x, y, E = m.P, m.Q, m.x, m.y, m.E
    a2, B2 = to_PQ(response(2), 2)
    a2m, B2m = m.to_PQ(m.response(2), 2)
    known = {
        "a_0 = -1, a_1 = -P, a_2 = Q^2/2 (hand values)": sp.simplify(a2[0] + 1) == 0 and sp.simplify(a2[1] + P) == 0 and sp.simplify(a2[2] - Q ** 2 / 2) == 0,
        "B_0 = 1, B_1 = P (hand values)": sp.simplify(B2[0] - 1) == 0 and sp.simplify(B2[1] - P) == 0,
        "ring expansion equals the expression expansion at second order": all(sp.simplify(c1 - c2) == 0 for c1, c2 in zip(a2 + B2, a2m + B2m)),
        "series_pow reproduces (1+eps)^(1/2) through eps^2": series_pow(e, sp.Rational(1, 2), 2) == ONE + e * qq(sp.Rational(1, 2)) - e ** 2 * qq(sp.Rational(1, 8)),
        "series_pow reproduces 1/(1+eps) through eps^3": series_pow(e, -1, 3) == ONE - e + e ** 2 - e ** 3,
    }
    out = {"mode": mode, "known": {k: bool(v) for k, v in known.items()}, "known_result": "PASS" if all(known.values()) else "FAIL", "known_seconds": round(time.time() - t0, 2)}
    if mode == "known" or out["known_result"] != "PASS":
        return out
    N = 5
    a_c, B_c = to_PQ(response(N), N)
    out["a"] = [str(c) for c in a_c]
    out["B"] = [str(c) for c in B_c]
    out["response_seconds"] = round(time.time() - t0, 2)
    Js, means, shifts = m.build(N, a_c, B_c)
    doc_J2 = x ** 3 + sp.Rational(11, 3) * x ** 2 - y ** 2 / 3 + 9 * x + 4
    doc_J3 = y / 3 * (7 * x ** 2 + 2 * y ** 2 + 24 * x + 45)
    doc_J4 = (45 * x ** 5 - 177 * x ** 4 - 2370 * x ** 3 - 5929 * x ** 2 - 13035 * x - 4035 + (636 * x ** 2 + 480 * x + 161) * y ** 2 + 78 * y ** 4) / 180
    Om = sp.symbols("Omega")
    circ = {P: 0, Q: Om ** 2}   # circular state r = 1, p = 0, q = Omega: h = Omega, Q = Omega^2, alpha = eps/Omega
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
        "release (6) radial eps^4 coefficient on the circle: Omega^4/8 - 8 Omega^2/3 + 1": sp.simplify((a_c[4] / Om ** 4).subs(circ) - (Om ** 4 / 8 - sp.Rational(8, 3) * Om ** 2 + 1)) == 0,
        "release (6) transverse eps^5 coefficient on the circle: Omega(121 Omega^2/30 + 3/5)": sp.simplify((Om ** 2 * B_c[4] / Om ** 5).subs(circ) - Om * (sp.Rational(121, 30) * Om ** 2 + sp.Rational(3, 5))) == 0,
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
