# Wave 7 copy of the frozen wave-6 interval-enclosure script: identical except that cells may be read from a JSON definition file (D1, E1). Wave 6 (1)-(2): outward-rounded four-step Taylor enclosure of the static-field first step for sub-wake cells
# (R = 1, v = 1/2, K = 1, c_f = 1), using mpmath interval arithmetic (iv) for every coefficient and bound.
# Same method as the frozen wave-2 enclosure (Cauchy-majorant remainder, Gronwall propagation, four fixed steps);
# the difference is that every arithmetic operation is directed-rounded, so the result is an outward enclosure.
# Not a stepping integrator: NSTEPS is fixed at 4. Run from the checkout root, one thread, timed:
#   OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 ../.venv/bin/python -I <this file> <cell> <members> <out.json>
#   <cell> in {sixpole-V1, sixpole-V2, hexagon-V1, antiprism-V2}; <members> e.g. 0,3 or all
import json, sys, time
from mpmath import iv, mp

iv.dps = 40
NSTEPS = 4
THETA = iv.mpf("0.85")
TAIL_TARGET = iv.mpf("1e-9")
ONE = iv.mpf(1); ZERO = iv.mpf(0); HALF = iv.mpf(1)/2

def up(x): return mp.mpf(x.b)   # upper end of an interval as a plain (non-interval) number
def lo(x): return mp.mpf(x.a)
def absiv(x): return iv.mpf([min(abs(x.a), abs(x.b)) if (x.a <= 0 <= x.b) is False else 0, max(abs(x.a), abs(x.b))])
def dot(a, b): return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
def norm_up(a): return up(iv.sqrt(dot(a, a)))      # upper bound of the Euclidean norm
def norm_iv(a): return iv.sqrt(dot(a, a))
def cross(a, b): return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
def unit(a): n = norm_iv(a); return [x/n for x in a]
def mag(x): return max(abs(x.a), abs(x.b))        # magnitude bound of an interval

# ---- cell definitions (positions, polarities, release unit tangents); all exact except sqrt/trig evaluated in iv
S3 = iv.sqrt(iv.mpf(3))
def sixpole():
    E = [[ONE, ZERO, ZERO], [ZERO, ONE, ZERO], [ZERO, ZERO, ONE]]
    pos = E + [[-x for x in e] for e in E]; pol = [1, 1, 1, -1, -1, -1]
    return pos, pol
def hexagon():
    pos = []; pol = []
    for k in range(6):
        c, s = {0: (ONE, ZERO), 1: (HALF, S3/2), 2: (-HALF, S3/2), 3: (-ONE, ZERO), 4: (-HALF, -S3/2), 5: (HALF, -S3/2)}[k]
        pos.append([c, s, ZERO]); pol.append(1 if k % 2 == 0 else -1)
    return pos, pol
def antiprism():
    # positrinos at azimuth 0, 120, 240 degrees and latitude +30 degrees; electrinos at the antipodes
    u = [S3/2, ZERO, HALF]
    def rotz(c, s, v): return [c*v[0] - s*v[1], s*v[0] + c*v[1], v[2]]
    P = [u, rotz(-HALF, S3/2, u), rotz(-HALF, -S3/2, u)]
    pos = P + [[-x for x in p] for p in P]; pol = [1, 1, 1, -1, -1, -1]
    return pos, pol
W = [ONE/S3, ONE/S3, ONE/S3]
def tangent(cell, i, pos, pol):
    n = pos[i]
    if cell == "sixpole-V1": return unit(cross(W, n))
    if cell == "sixpole-V2": sg = 1 if pol[i] > 0 else -1; d = [sg*w for w in W]; p = [d[c] - n[c]*dot(n, d) for c in range(3)]; return unit(p)
    if cell == "hexagon-V1": return unit(cross([ZERO, ZERO, ONE], n))
    if cell == "antiprism-V2": sg = 1 if pol[i] > 0 else -1; d = [ZERO, ZERO, iv.mpf(sg)]; p = [d[c] - n[c]*dot(n, d) for c in range(3)]; return unit(p)
    if cell in JSON_CELLS: return JSON_CELLS[cell][1][i]
    raise ValueError(cell)
CELLS = {"sixpole-V1": sixpole, "sixpole-V2": sixpole, "hexagon-V1": hexagon, "antiprism-V2": antiprism}
# JSON-defined cells: {"members": [{"q": +1, "n0": [..], "t0": [..]}, ...]} with double-precision vectors taken literally as the input definition;
# positions are re-normalized and tangents re-projected and normalized in interval arithmetic so that the data lie exactly on the sphere.
JSON_CELLS = {}
def load_json_cell(name, path):
    d = json.load(open(path)); mem = d["members"]
    def pos_pol():
        pos = []; pol = []
        for m in mem:
            x = [iv.mpf(repr(v)) for v in m["n0"]]; pos.append(unit(x)); pol.append(1 if m["q"] > 0 else -1)
        return pos, pol
    tans = []
    for m in mem:
        n = unit([iv.mpf(repr(v)) for v in m["n0"]]); t = [iv.mpf(repr(v)) for v in m["t0"]]; p = [t[c] - n[c]*dot(n, t) for c in range(3)]; tans.append(unit(p))
    JSON_CELLS[name] = (pos_pol, tans)

# ---- interval power series
def series_dot(a, b, k): return sum((sum((a[c][i]*b[c][k-i] for c in range(3)), ZERO) for i in range(k+1)), ZERO)
def scal_vec_coeff(s, X, k): return [sum((s[i]*X[c][k-i] for i in range(k+1)), ZERO) for c in range(3)]
def taylor_coefficients(X0, V0, sources, K, N):
    X = [[ZERO]*(N+3) for _ in range(3)]
    for c in range(3): X[c][0] = X0[c]; X[c][1] = V0[c]
    Fs = [[ZERO]*(N+1) for _ in range(3)]; per = []
    for (Xj, sig) in sources:
        d = [[ZERO]*(N+1) for _ in range(3)]
        for c in range(3): d[c][0] = X0[c] - Xj[c]
        per.append({"sig": sig, "d": d, "s": [ZERO]*(N+1), "w": [ZERO]*(N+1)})
    XF = [ZERO]*(N+1); VV = [ZERO]*(N+1); alpha = iv.mpf(-3)/2
    for k in range(N+1):
        Fk = [ZERO]*3
        for p in per:
            d, s, wv = p["d"], p["s"], p["w"]
            if k > 0:
                for c in range(3): d[c][k] = X[c][k]
            s[k] = series_dot(d, d, k)
            if k == 0: wv[0] = s[0]**alpha
            else: wv[k] = sum(((alpha*i - (k - i))*s[i]*wv[k-i] for i in range(1, k+1)), ZERO)/(k*s[0])
            for c in range(3): Fk[c] += K*p["sig"]*sum((d[c][i]*wv[k-i] for i in range(k+1)), ZERO)
        for c in range(3): Fs[c][k] = Fk[c]
        XF[k] = series_dot(X, Fs, k)
        Vser = [[(i+1)*X[c][i+1] for i in range(k+1)] for c in range(3)]
        VV[k] = series_dot(Vser, Vser, k)
        t1 = scal_vec_coeff(XF, X, k); t2 = scal_vec_coeff(VV, X, k)
        for c in range(3): X[c][k+2] = (Fk[c] - t1[c] - t2[c])/((k+1)*(k+2))
    return X
def eval_poly(X, t, N):
    pos = [sum((X[c][k]*t**k for k in range(N+1)), ZERO) for c in range(3)]
    vel = [sum((k*X[c][k]*t**(k-1) for k in range(1, N+1)), ZERO) for c in range(3)]
    return pos, vel

# ---- majorant bounds (all evaluated in iv, upper ends taken)
def complex_ball_bound(Xc, Vc, sources, K, rho):
    F = ZERO
    for (Xj, sig) in sources:
        r0 = norm_iv([Xc[c]-Xj[c] for c in range(3)])
        sig2 = r0**2 - 2*r0*rho - rho**2
        if lo(sig2) <= 0: return None
        F += K*(r0 + rho)/sig2**(iv.mpf(3)/2)
    Xb = norm_iv(Xc) + rho; Vb = norm_iv(Vc) + rho
    GV = F + Xb**2*F + Vb**2*Xb
    return iv.mpf(up(iv.sqrt(Vb**2 + GV**2)))
def real_ball_lipschitz(Xc, Vc, sources, K, rho):
    F = ZERO; DF = ZERO
    for (Xj, sig) in sources:
        r0 = norm_iv([Xc[c]-Xj[c] for c in range(3)]) - rho
        if lo(r0) <= 0: return None
        F += K/r0**2; DF += 2*K/r0**3
    Xb = norm_iv(Xc) + rho; Vb = norm_iv(Vc) + rho
    a = DF*(1 + Xb**2) + 2*Xb*F + Vb**2; b = 2*Xb*Vb
    return iv.mpf(up(iv.sqrt(1 + a**2 + b**2)))
def best_rho(Xc, Vc, sources, K):
    best = None
    for i in range(1, 60):
        rho = iv.mpf(i)/100; M = complex_ball_bound(Xc, Vc, sources, K, rho)
        if M is None: break
        if best is None or lo(rho/M) > lo(best[0]/best[1]): best = (rho, M)
    return best
def one_step(Xc, Vc, sources, K, eps_in, M_override=None):
    rho, M = best_rho(Xc, Vc, sources, K)
    if M_override is not None: M = M_override
    h = iv.mpf(lo(THETA*rho/M))                                   # step length rounded down
    N = int(mp.ceil(mp.log(mp.mpf(up(TAIL_TARGET*(1 - THETA)/rho)))/mp.log(mp.mpf(up(THETA)))))
    X = taylor_coefficients(Xc, Vc, sources, K, N)
    viol = []
    for k in range(1, N+1):
        ck = up(iv.sqrt(sum((X[c][k]**2 for c in range(3)), ZERO) + sum((((k+1)*X[c][k+1])**2 for c in range(3)), ZERO)))
        bound = lo(rho*(M/rho)**k)
        if ck > bound: viol.append((k, float(ck), float(bound)))
    tail_end = iv.mpf(up(rho*THETA**(N+1)/(1 - THETA)))
    L = real_ball_lipschitz(Xc, Vc, sources, K, rho)
    eps_end = iv.mpf(up(eps_in*iv.exp(L*h) + tail_end))
    ok_ball = up(THETA*rho + eps_in*iv.exp(L*h)) <= lo(rho)
    posE, velE = eval_poly(X, h, N)                               # interval-valued polynomial values at t = h
    speed = norm_iv(velE)
    return {"rho": float(lo(rho)), "M": float(up(M)), "h": float(lo(h)), "N": N, "tail_end": float(up(tail_end)), "L": float(up(L)), "eps_in": float(up(eps_in)), "eps_end": float(up(eps_end)),
            "ball_consistent": bool(ok_ball), "coefficient_domination_violations": viol, "max_coefficient_width": float(max(up(X[c][k]) - lo(X[c][k]) for c in range(3) for k in range(N+1))),
            "X_end_interval": [[float(lo(x)), float(up(x))] for x in posE], "V_end_interval": [[float(lo(x)), float(up(x))] for x in velE],
            "speed_poly_interval": [float(lo(speed)), float(up(speed))], "speed_enclosure": [float(lo(speed - eps_end)), float(up(speed + eps_end))],
            "sphere_defect_interval": [float(lo(norm_iv(posE) - 1)), float(up(norm_iv(posE) - 1))], "_X": X, "_posE": posE, "_velE": velE, "_eps": eps_end, "_h": h}

cell = sys.argv[1]; members = list(range(6)) if sys.argv[2] == "all" else [int(x) for x in sys.argv[2].split(",")]; outfile = sys.argv[3]
if len(sys.argv) > 4: load_json_cell(cell, sys.argv[4]); pos, pol = JSON_CELLS[cell][0]()
else: pos, pol = CELLS[cell]()
out = {"cell": cell, "arithmetic": "mpmath iv (directed rounding), 40 digits", "controls": [], "members": [], "wall_s": {}}
t0 = time.time()
# ---- controls before target
# (i) K = 0 great circle at v = 1/2 from (1,0,0): exact solution (cos(t/2), sin(t/2), 0) must lie inside the interval enclosure at 50 points of the step.
X0 = [ONE, ZERO, ZERO]; V0 = [ZERO, HALF, ZERO]; src0 = [(pos[j], 1) for j in range(1, 6)]
st = one_step(X0, V0, src0, ZERO, ZERO)
contained = True; worst = 0.0
for i in range(1, 51):
    t = st["_h"]*i/50
    p, vv = eval_poly(st["_X"], t, st["N"])
    ex = [iv.cos(t/2), iv.sin(t/2), ZERO]; exv = [-iv.sin(t/2)/2, iv.cos(t/2)/2, ZERO]
    tail = up(iv.mpf(st["rho"])*(t*iv.mpf(st["M"])/iv.mpf(st["rho"]))**(st["N"]+1)/(1 - t*iv.mpf(st["M"])/iv.mpf(st["rho"])))
    # containment: every exact component must lie within the interval component widened by the tail bound
    tail_iv = iv.mpf(tail)
    for c in range(3):
        if not (lo(p[c] - tail_iv) <= lo(ex[c]) and up(ex[c]) <= up(p[c] + tail_iv) and lo(vv[c] - tail_iv) <= lo(exv[c]) and up(exv[c]) <= up(vv[c] + tail_iv)): contained = False
    worst = max(worst, float(tail))
out["controls"].append({"name": "(i) known: K=0 great circle at v=1/2 lies inside the outward-rounded Taylor enclosure (interval components widened by the tail bound) at 50 points", "pass": contained and not st["coefficient_domination_violations"], "max_tail_bound": worst, "h": st["h"], "N": st["N"], "max_coefficient_width": st["max_coefficient_width"]})
# (ii) negative: a wrong majorant constant M/20 must be rejected by the coefficient-domination check; the true M passes.
src = [(pos[j], pol[0]*pol[j]) for j in range(1, 6)]
t00 = tangent(cell, 0, pos, pol); V00 = [x/2 for x in t00]
good = one_step(pos[0], V00, src, ONE, ZERO)
# The wrong constant is taken below the size of the first state coefficient (V, a), which any valid M must dominate (k = 1 of the Cauchy estimate), so it is
# provably invalid for every cell; M/20 alone is not provably invalid for cells whose coefficients are small (the hexagon, whose release tangent acceleration vanishes).
c1 = iv.sqrt(sum((iv.mpf(v)**2 for v in good["V_end_interval"][0:0]), ZERO)) if False else None
Xg = taylor_coefficients(pos[0], V00, src, ONE, 1)
c1 = up(iv.sqrt(sum((Xg[c][1]**2 for c in range(3)), ZERO) + sum(((2*Xg[c][2])**2 for c in range(3)), ZERO)))
M_wrong = iv.mpf(min(mp.mpf(good["M"])/20, mp.mpf("0.9")*c1))
bad = one_step(pos[0], V00, src, ONE, ZERO, M_override=M_wrong)
out["controls"].append({"name": "(ii) negative: a provably invalid majorant constant min(M/20, 0.9 |c_1|) is caught by the coefficient-domination check; the true M passes", "pass": bool(bad["coefficient_domination_violations"]) and not good["coefficient_domination_violations"], "M_true": good["M"], "M_wrong": float(up(M_wrong)), "c1": float(c1), "violations_with_wrong_M": bad["coefficient_domination_violations"][:3]})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"]); out["wall_s"]["controls"] = time.time() - t0
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL", f"({out['wall_s']['controls']:.1f} s)")
for c in out["controls"]: print("  ", "pass" if c["pass"] else "FAIL", c["name"])
if not out["controls_all_pass"]: json.dump(out, open(outfile, "w"), indent=1); sys.exit(2)
# ---- targets
for i in members:
    t1 = time.time(); Xc = pos[i]; src = [(pos[j], pol[i]*pol[j]) for j in range(6) if j != i]
    Vc = [x/2 for x in tangent(cell, i, pos, pol)]; eps = ZERO; t = ZERO; steps = []
    for k in range(NSTEPS):
        st = one_step(Xc, Vc, src, ONE, eps)
        st["t_start"] = float(up(t)); t = t + st["_h"]; st["t_end"] = float(lo(t))
        steps.append({k2: v2 for k2, v2 in st.items() if not k2.startswith("_")})
        Xc, Vc, eps = st["_posE"], st["_velE"], st["_eps"]
        if st["coefficient_domination_violations"] or not st["ball_consistent"]: print("bound inconsistency", i, k); break
    rec = {"member": i, "polarity": pol[i], "release_position": [[float(lo(x)), float(up(x))] for x in pos[i]], "release_velocity": [[float(lo(x)), float(up(x))] for x in [x/2 for x in tangent(cell, i, pos, pol)]], "steps": steps,
           "enclosed_interval": [0.0, float(lo(t))], "final_speed_enclosure": steps[-1]["speed_enclosure"], "final_state_error_bound": steps[-1]["eps_end"], "wall_s": time.time() - t1}
    out["members"].append(rec)
    print(f"{cell} member {i} (q={pol[i]:+d}): interval [0, {float(lo(t)):.6f}] (lower-rounded); speed enclosure at end [{rec['final_speed_enclosure'][0]:.10f}, {rec['final_speed_enclosure'][1]:.10f}]; eps_end {rec['final_state_error_bound']:.3e}; max coefficient width {max(s['max_coefficient_width'] for s in steps):.2e}; {rec['wall_s']:.1f} s")
out["wall_s"]["total"] = time.time() - t0
json.dump(out, open(outfile, "w"), indent=1)
print(f"total wall {out['wall_s']['total']:.1f} s")
