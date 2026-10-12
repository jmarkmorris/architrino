"""Sampled consistency check of the second-derivative bounds of the row
Psi(R,v) = R / (|R|^2 (|R| - R.v)) used in the forward-quantification note.

It is a finite sample with central differences in double precision.  It can show a
violation of a bound; it cannot prove a bound.  Known cases run first.
Usage: python row_derivative_sample_check.py [out.json]
"""
import json, math, random, sys

def psi(R, v):
    rho = math.sqrt(sum(x * x for x in R)); w = sum(a * b for a, b in zip(R, v))
    f = 1.0 / (rho * rho * (rho - w))
    return [x * f for x in R]
def add(a, b, t): return [x + t * y for x, y in zip(a, b)]
def norm(a): return math.sqrt(sum(x * x for x in a))
def unit(rng):
    while True:
        x = [rng.gauss(0, 1) for _ in range(3)]; n = norm(x)
        if n > 1e-6: return [c / n for c in x]
H = 1e-3
def d2RR(R, v, h, k):   # mixed central difference in R along h and k
    f = lambda s, t: psi(add(add(R, h, s), k, t), v)
    pp, pm, mp_, mm = f(H, H), f(H, -H), f(-H, H), f(-H, -H)
    return [(a - b - c + d) / (4 * H * H) for a, b, c, d in zip(pp, pm, mp_, mm)]
def d2Rv(R, v, h, k):
    f = lambda s, t: psi(add(R, h, s), add(v, k, t))
    pp, pm, mp_, mm = f(H, H), f(H, -H), f(-H, H), f(-H, -H)
    return [(a - b - c + d) / (4 * H * H) for a, b, c, d in zip(pp, pm, mp_, mm)]
def d2vv(R, v, h, k):
    f = lambda s, t: psi(R, add(add(v, h, s), k, t))
    pp, pm, mp_, mm = f(H, H), f(H, -H), f(-H, H), f(-H, -H)
    return [(a - b - c + d) / (4 * H * H) for a, b, c, d in zip(pp, pm, mp_, mm)]

out = {"instrument": "row_derivative_sample_check.py", "step": H, "known": {}, "targets": {}}
# known cases at v = 0, |R| = 1, h = k = n: |d2_R (R/|R|^3)[n,n]| = 6 and |d2_v Psi[n,n]| = 2
n = [0.6, 0.0, 0.8]; z = [0.0, 0.0, 0.0]
k1 = norm(d2RR(n, z, n, n)); k2 = norm(d2vv(n, z, n, n))
assert abs(k1 - 6.0) < 1e-4 and abs(k2 - 2.0) < 1e-4, (k1, k2)
# known case: first v-derivative bound is attained along n: |d_v Psi[n]| = 1/D^2 at v = c n
c = 0.1; fv = [(a - b) / (2 * H) for a, b in zip(psi(n, add([c * x for x in n], n, H)), psi(n, add([c * x for x in n], n, -H)))]
assert abs(norm(fv) - 1.0 / (1 - c) ** 2) < 1e-5
out["known"] = {"d2R_radial_at_rest": k1, "d2v_radial_at_rest": k2, "dv_along_n": norm(fv)}
print("known cases passed", k1, k2, norm(fv))

C20, C11, C02 = 9.033544574, 4.59907975, 3.728720983     # upper endpoints from the constants instrument
VMAX = 3.0 / 16.0
rng = random.Random(20261011)
worst = {"RR": 0.0, "Rv": 0.0, "vv": 0.0}; arg = {}
for case in range(4000):
    R = unit(rng); rho = rng.uniform(0.9, 3.0); R = [rho * x for x in R]
    if case % 4 == 0:            # adversarial: source velocity along +n at the cap (smallest D)
        v = [VMAX * x / rho for x in R]
    else:
        sp = VMAX * rng.random() ** 0.3; u = unit(rng); v = [sp * x for x in u]
    D = 1 - sum(a * b for a, b in zip(R, v)) / rho
    for _ in range(12):
        h, k = unit(rng), unit(rng)
        if _ == 0: h = k = [x / rho for x in R]
        for name, fn, pw in (("RR", d2RR, 4), ("Rv", d2Rv, 3), ("vv", d2vv, 2)):
            val = norm(fn(R, v, h, k)) * rho ** pw
            if val > worst[name]: worst[name] = val; arg[name] = dict(rho=rho, D=D, speed=norm(v))
tol = 1e-3
assert worst["RR"] <= C20 + tol and worst["Rv"] <= C11 + tol and worst["vv"] <= C02 + tol, worst
out["targets"] = {"samples": 4000, "direction_pairs_per_sample": 12,
                  "largest_sampled_rho4_d2RR": worst["RR"], "bound_c20": C20,
                  "largest_sampled_rho3_d2Rv": worst["Rv"], "bound_c11": C11,
                  "largest_sampled_rho2_d2vv": worst["vv"], "bound_c02": C02, "where": arg}
print(out["targets"])
if len(sys.argv) > 1: json.dump(out, open(sys.argv[1], "w"), indent=1)
print("NO VIOLATION IN SAMPLE")
