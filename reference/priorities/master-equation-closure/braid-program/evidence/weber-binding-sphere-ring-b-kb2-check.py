"""Lane B known case KB2: independent check of the enclosure property.

Reads the boxes' interior points and interval enclosures written by the Node instrument and
re-evaluates every function at the point with mpmath at 40 significant digits, from the
complex form of the balance law (not from the half-gap formulas the instrument uses).
A point value outside its enclosure is a failure. Also checks the enclosure of pi and the
interval Jacobian against mpmath's own numerical differentiation-free analytic formulas.
"""
import json, sys, time
from mpmath import mp, mpf, sin, cos, pi, sqrt, mpc, exp, fabs
mp.dps = 40
path = sys.argv[1]
limit = int(sys.argv[2]) if len(sys.argv) > 2 else 10**9
t0 = time.time(); last = t0
n_pts = n_vals = n_fail = n_jac = 0
worst_slack = None
def accel_components(word, alpha):
    q = [1 if ch == '+' else -1 for ch in word]; N = len(q)
    th = [mpf(0)]
    for a in alpha: th.append(th[-1] + 2 * a)
    z = [exp(mpc(0, t)) for t in th]
    T = []; U = []
    for i in range(N):
        acc = mpc(0)
        for j in range(N):
            if j == i: continue
            d = z[i] - z[j]
            acc += q[i] * q[j] * d / abs(d) ** 3
        w = acc / z[i]          # radial = Re, tangential = Im
        T.append(w.imag); U.append(w.real)
    return T, U
def f(x): return cos(x) / (4 * sin(x) ** 2)
def df(x): return -(1 + cos(x) ** 2) / (4 * sin(x) ** 3)
def jac_T(word, alpha):
    q = [1 if ch == '+' else -1 for ch in word]; N = len(q); n = N - 1
    J = [[mpf(0)] * n for _ in range(n)]; JU = [mpf(0)] * n
    for i in range(1, N + 1):
        for j in range(1, N + 1):
            if j == i: continue
            a, b = min(i, j), max(i, j); S = sum(alpha[a - 1:b - 1]); s = q[i - 1] * q[j - 1]
            for m in range(a, b):
                if i <= n: J[i - 1][m - 1] += (-s if j > i else s) * df(S)
                if i == 1: JU[m - 1] += s * (-f(S))
    return J, JU
with open(path) as fh:
    for line in fh:
        if n_pts >= limit: break
        r = json.loads(line); word = r['word']; x = [mpf(v) for v in r['x']]
        T, U = accel_components(word, x)
        D = [U[i] - U[i + 1] for i in range(len(U) - 1)]
        vals = T + U + D
        for key in ('nat', 'mv'):
            enc = r[key]
            if enc is None: continue
            for v, (lo, hi) in zip(vals, enc):
                n_vals += 1
                if not (mpf(lo) <= v <= mpf(hi)): n_fail += 1
                else:
                    s = min(v - mpf(lo), mpf(hi) - v)
                    if worst_slack is None or s < worst_slack: worst_slack = s
        if 'jac' in r:
            J, JU = jac_T(word, x)
            for rowv, rowe in zip(J, r['jac']):
                for v, (lo, hi) in zip(rowv, rowe):
                    n_jac += 1
                    if not (mpf(lo) <= v <= mpf(hi)): n_fail += 1
            for v, (lo, hi) in zip(JU, r['jacU']):
                n_jac += 1
                if not (mpf(lo) <= v <= mpf(hi)): n_fail += 1
        n_pts += 1
        if time.time() - last > 10:
            last = time.time(); print(f"[heartbeat] points={n_pts} values={n_vals} jac={n_jac} failures={n_fail} elapsed_s={last - t0:.0f}", flush=True)
import math
pi_ok = mpf(math.pi) < pi < mpf(math.pi + abs(math.pi) * 2.0 ** -52 + 5e-324)
print(json.dumps({"case": "KB2-enclosure", "points": n_pts, "function_values_checked": n_vals, "jacobian_entries_checked": n_jac, "failures": n_fail, "smallest_slack": float(worst_slack), "pi_enclosure_ok": bool(pi_ok), "elapsed_s": round(time.time() - t0, 1), "pass": n_fail == 0 and bool(pi_ok) and n_pts >= 100000}))
