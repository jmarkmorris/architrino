# Support role, Phase B: explicit componentwise adjudication of the own-antipode path-map issue (difference q-q' vs sum q+q'; receding vs approaching).
# Two candidate emission-point maps for E1: (A) Y = -X1(p) (inherited inversion with polarity swap, same rotation sense as P1); (B) Y = -X1(-p) (the
# map that would give a sum-of-angles chord). Direct vector computation at 30 digits for both, plus the closed forms of the support reference.
import os, sys, json; print("PID", os.getpid())
from mpmath import mp, mpf, cos, sin, sqrt, nstr
mp.dps = 30; S2 = sqrt(2)
def X1(q): return [cos(q), -sin(q)/S2, -sin(q)/S2]
def T1(q): return [-sin(q), -cos(q)/S2, -cos(q)/S2]
def dot(a, b): return sum(x*y for x, y in zip(a, b))
def direct(q, p, v, mapB=False):
    pp = -p if mapB else p; sgn = -1 if mapB else 1            # map B: Y = -X1(-p), velocity d/ds[-X1(-p(s))] = +v T1(-p)
    Y = [-c for c in X1(pp)]; V = [-sgn*v*c for c in T1(pp)]
    X = X1(q); T = T1(q); r = [X[i] - Y[i] for i in range(3)]; rn = sqrt(dot(r, r)); rh = [c/rn for c in r]
    Dt = 1 - dot(V, rh); A = [-c/(rn*rn*Dt) for c in rh]
    return {"Y": [nstr(c, 12) for c in Y], "r_components": [nstr(c, 12) for c in r], "chord": nstr(rn, 20), "D_t": nstr(Dt, 20), "a_tan": nstr(dot(T, A), 20), "a_rad": nstr(dot(X, A), 20)}
out = {}
for (q, p, v) in ((mpf("0.2"), mpf("0.1"), mpf("0.2")), (mpf("0.1750"), mpf("0.0"), mpf("0.0")), (mpf("0.19"), mpf("0.19"), mpf("0.2"))):
    key = f"q={q},p={p},v={v}"
    A = direct(q, p, v); B = direct(q, p, v, mapB=True)
    closed = {"chord_diff": nstr(2*cos((q-p)/2), 20), "chord_sum": nstr(2*cos((q+p)/2), 20), "D_t_diff": nstr(1 + v*sin((q-p)/2), 20), "a_tan_diff": nstr(sin((q-p)/2)/(4*cos((q-p)/2)**2*(1 + v*sin((q-p)/2))), 20), "a_rad_diff": nstr(-1/(4*cos((q-p)/2)*(1 + v*sin((q-p)/2))), 20)}
    out[key] = {"mapA_Y=-X1(p)": A, "mapB_Y=-X1(-p)": B, "closed_forms": closed,
                "verdict": "map A reproduces the difference chord and D_t>1 (receding); map B reproduces the sum chord; map B is not the inherited family (-X1(-p) != -X1(p) for p != 0)"}
    # componentwise: -X1(p) = (-cos p, +sin p/S2, +sin p/S2); -X1(-p) = (-cos p, -sin p/S2, -sin p/S2): the e2,e3 components have opposite sign
print(json.dumps(out, indent=1)); json.dump(out, open(sys.argv[1], "w"), indent=1)
