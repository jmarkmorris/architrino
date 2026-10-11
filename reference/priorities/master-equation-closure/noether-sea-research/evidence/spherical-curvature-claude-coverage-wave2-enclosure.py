# Wave 2 (d): bounded analytical enclosure of the static-field first step for the sub-wake cell A3-v0.5
# (six poles, common rotation V1, H1, R = 1, v = 1/2, K = 1, c_f = 1), as a few explicit Taylor steps
# with a proven Cauchy-majorant remainder bound and Gronwall error propagation between steps.
# Not a stepping integrator: the number of steps is fixed and small (NSTEPS), each with its own bound.
# Run from the checkout root:
#   ../.venv/bin/python -I reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave2-enclosure.py
import json, math, sys
from mpmath import mp, mpf, sqrt, cos, sin, log, ceil, exp

mp.dps = 40
R = mpf(1); CF = mpf(1)
NSTEPS = 4
THETA = mpf("0.85")      # h = THETA * rho / M
TAIL_TARGET = mpf("1e-9")

# ---- configuration: six poles, polarities, release velocities (V1 about (1,1,1)/sqrt3), v = 1/2
E = [[mpf(1), 0, 0], [0, mpf(1), 0], [0, 0, mpf(1)]]
POS = [E[0], E[1], E[2], [-x for x in E[0]], [-x for x in E[1]], [-x for x in E[2]]]
POL = [1, 1, 1, -1, -1, -1]
w = [mpf(1) / sqrt(3)] * 3
def cross(a, b): return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
def dot(a, b): return sum(x*y for x, y in zip(a, b))
def norm(a): return sqrt(dot(a, a))
def unit(a): n = norm(a); return [x/n for x in a]

# ---- power-series machinery (lists of mpf, index = order)
def series_dot(a, b, k):          # coefficient k of (a . b) for vector series a, b (lists of 3 lists)
    return sum(sum(a[c][i]*b[c][k-i] for c in range(3)) for i in range(k+1))
def scal_vec_coeff(s, X, k):      # coefficient k of (scalar series s) * (vector series X)
    return [sum(s[i]*X[c][k-i] for i in range(k+1)) for c in range(3)]

def taylor_coefficients(X0, V0, sources, K, N):
    """Taylor coefficients X[c][k], k=0..N+1, of X'' = F(X) - (X.F)X - (V.V)X with static sources (pos, sigma)."""
    X = [[mpf(0)]*(N+3) for _ in range(3)]
    for c in range(3): X[c][0] = X0[c]; X[c][1] = V0[c]
    Fs = [[mpf(0)]*(N+1) for _ in range(3)]            # F coefficients
    per = []                                             # per-source series: d, s, w
    for (Xj, sig) in sources:
        d = [[mpf(0)]*(N+1) for _ in range(3)]
        for c in range(3): d[c][0] = X0[c] - Xj[c]
        per.append({"sig": sig, "d": d, "s": [mpf(0)]*(N+1), "w": [mpf(0)]*(N+1), "Xj": Xj})
    XF = [mpf(0)]*(N+1); VV = [mpf(0)]*(N+1)
    alpha = mpf(-3)/2
    for k in range(N+1):
        # F_k
        Fk = [mpf(0)]*3
        for p in per:
            d, s, wv = p["d"], p["s"], p["w"]
            if k > 0:
                for c in range(3): d[c][k] = X[c][k]
            s[k] = series_dot(d, d, k)
            if k == 0:
                wv[0] = s[0]**alpha
            else:
                wv[k] = sum((alpha*i - (k - i)) * s[i] * wv[k-i] for i in range(1, k+1)) / (k * s[0])
            for c in range(3):
                Fk[c] += K * p["sig"] * sum(d[c][i]*wv[k-i] for i in range(k+1))
        for c in range(3): Fs[c][k] = Fk[c]
        XF[k] = series_dot(X, Fs, k)                          # uses X[.][0..k], F[.][0..k]
        Vser = [[(i+1)*X[c][i+1] for i in range(k+1)] for c in range(3)]   # V_i for i <= k needs X up to k+1 (known)
        VV[k] = series_dot(Vser, Vser, k)
        t1 = scal_vec_coeff(XF, X, k); t2 = scal_vec_coeff(VV, X, k)
        for c in range(3):
            X[c][k+2] = (Fk[c] - t1[c] - t2[c]) / ((k+1)*(k+2))
    return X

def eval_poly(X, t, N):
    """(X(t), V(t)) from coefficients up to order N (position) and N-1 (velocity)."""
    pos = [sum(X[c][k]*t**k for k in range(N+1)) for c in range(3)]
    vel = [sum(k*X[c][k]*t**(k-1) for k in range(1, N+1)) for c in range(3)]
    return pos, vel

# ---- majorant bounds
def complex_ball_bound(Xc, Vc, sources, K, rho):
    """M >= sup |G(y)| over the complex ball |y - (Xc,Vc)| <= rho (Hermitian norm), G = (V, F - (X.F)X - (V.V)X)."""
    F = mpf(0)
    for (Xj, sig) in sources:
        r0 = norm([Xc[c]-Xj[c] for c in range(3)])
        sig2 = r0**2 - 2*r0*rho - rho**2
        if sig2 <= 0: return None
        F += K * (r0 + rho) / sig2**(mpf(3)/2)
    Xb = norm(Xc) + rho; Vb = norm(Vc) + rho
    GV = F + Xb**2 * F + Vb**2 * Xb
    return sqrt(Vb**2 + GV**2)

def real_ball_lipschitz(Xc, Vc, sources, K, rho):
    """L >= ||DG|| on the real ball of radius rho about (Xc, Vc)."""
    F = mpf(0); DF = mpf(0)
    for (Xj, sig) in sources:
        r0 = norm([Xc[c]-Xj[c] for c in range(3)]) - rho
        if r0 <= 0: return None
        F += K / r0**2; DF += 2*K / r0**3
    Xb = norm(Xc) + rho; Vb = norm(Vc) + rho
    a = DF*(1 + Xb**2) + 2*Xb*F + Vb**2
    b = 2*Xb*Vb
    return sqrt(1 + a**2 + b**2)

def best_rho(Xc, Vc, sources, K):
    best = None
    for i in range(1, 60):
        rho = mpf(i)/100
        M = complex_ball_bound(Xc, Vc, sources, K, rho)
        if M is None: break
        if best is None or rho/M > best[0]/best[1]: best = (rho, M)
    return best

def one_step(Xc, Vc, sources, K, eps_in, label, M_override=None):
    rho, M = best_rho(Xc, Vc, sources, K)
    if M_override is not None: M = M_override
    h = THETA * rho / M
    N = int(ceil(log(TAIL_TARGET * (1 - THETA) / rho) / log(THETA)))
    X = taylor_coefficients(Xc, Vc, sources, K, N)
    # necessary-condition self-check: Cauchy estimate must dominate every computed coefficient
    viol = []
    for k in range(1, N+1):
        ck = sqrt(sum(X[c][k]**2 for c in range(3)) + sum(((k+1)*X[c][k+1])**2 for c in range(3)))  # state coefficient (X_k, V_k)
        bound = rho * (M/rho)**k
        if ck > bound: viol.append((k, float(ck), float(bound)))
    tail_end = rho * THETA**(N+1) / (1 - THETA)
    L = real_ball_lipschitz(Xc, Vc, sources, K, rho)
    eps_end = eps_in * exp(L*h) + tail_end
    ok_ball = (THETA*rho + eps_in*exp(L*h) <= rho)
    posE, velE = eval_poly(X, h, N)
    return {"label": label, "rho": float(rho), "M": float(M), "h": float(h), "N": N, "theta": float(THETA), "tail_end": float(tail_end), "L": float(L),
            "eps_in": float(eps_in), "eps_end": float(eps_end), "ball_consistent": bool(ok_ball), "coefficient_domination_violations": viol,
            "X_end": [str(x) for x in posE], "V_end": [str(x) for x in velE], "speed_end": float(norm(velE)), "sphere_defect_end": float(abs(norm(posE)-1)),
            "_X": X, "_posE": posE, "_velE": velE, "_eps": eps_end}

out = {"cell": "A3-v0.5 (G1 six poles, V1 common rotation about (1,1,1)/sqrt3, H1, R=1, v=1/2, K=1, c_f=1)", "controls": [], "members": []}

# ---- controls BEFORE the target
# (i) known case: K = 0 great circle at v = 1/2: exact solution (cos(t/2), sin(t/2), 0); the enclosure must contain it.
X0 = [mpf(1), mpf(0), mpf(0)]; V0 = [mpf(0), mpf(1)/2, mpf(0)]
sources0 = [(POS[j], POL[j]) for j in range(1, 6)]
st = one_step(X0, V0, sources0, mpf(0), mpf(0), "control K=0")
maxdev = mpf(0); maxtail = mpf(0); contained = True
for i in range(1, 51):
    t = st["h"]*i/50
    p, vv = eval_poly(st["_X"], mpf(t), st["N"])
    exact = [cos(mpf(t)/2), sin(mpf(t)/2), mpf(0)]; exactv = [-sin(mpf(t)/2)/2, cos(mpf(t)/2)/2, mpf(0)]
    dev = sqrt(sum((p[c]-exact[c])**2 for c in range(3)) + sum((vv[c]-exactv[c])**2 for c in range(3)))
    tail = st["rho"] * (mpf(t)*st["M"]/st["rho"])**(st["N"]+1) / (1 - mpf(t)*st["M"]/st["rho"])
    maxdev = max(maxdev, dev); maxtail = max(maxtail, tail)
    if dev > tail + mpf('1e-30'): contained = False   # 1e-30 allowance for 40-digit rounding; the analytic tail is below rounding for tiny t
out["controls"].append({"name": "(i) known: K=0 great circle at v=1/2 lies inside the Taylor enclosure on the whole step", "pass": contained and not st["coefficient_domination_violations"],
                        "max_deviation": float(maxdev), "max_tail_bound": float(maxtail), "h": st["h"], "N": st["N"], "rho": st["rho"], "M": st["M"]})
# (ii) negative: a deliberately wrong (too small) majorant constant must be caught by the coefficient-domination check.
sources = [(POS[j], POL[j]) for j in range(1, 6)]
t0 = unit(cross(w, X0)); V0 = [x/2 for x in t0]
good = one_step(X0, V0, sources, mpf(1), mpf(0), "target probe")
bad = one_step(X0, V0, sources, mpf(1), mpf(0), "negative: M/20", M_override=mpf(good["M"])/20)
out["controls"].append({"name": "(ii) negative: majorant constant M/20 is caught (coefficient domination fails); true M passes", "pass": bool(bad["coefficient_domination_violations"]) and not good["coefficient_domination_violations"],
                        "violations_with_wrong_M": bad["coefficient_domination_violations"][:3], "violations_with_true_M": good["coefficient_domination_violations"]})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL");
for c in out["controls"]: print("  ", "pass" if c["pass"] else "FAIL", c["name"])
if not out["controls_all_pass"]: json.dump(out, open(sys.argv[1] if len(sys.argv) > 1 else "enclosure.json", "w"), indent=1); sys.exit(2)

# ---- target: all six members, NSTEPS explicit Taylor steps each with its own remainder bound
for i in range(6):
    Xc = POS[i]; src = [(POS[j], POL[j]) for j in range(6) if j != i]
    K = mpf(1)   # sigma = sign(q_i q_j) is carried by the source list below
    src = [(POS[j], POL[i]*POL[j]) for j in range(6) if j != i]
    Vc = [x/2 for x in unit(cross(w, Xc))]
    eps = mpf(0); t = mpf(0); steps = []
    for k in range(NSTEPS):
        st = one_step(Xc, Vc, src, K, eps, f"member {i} step {k+1}")
        st["t_start"] = float(t); t += mpf(st["h"]); st["t_end"] = float(t)
        st["speed_enclosure_end"] = [float(st["speed_end"] - st["_eps"]), float(st["speed_end"] + st["_eps"])]
        steps.append({k2: v2 for k2, v2 in st.items() if not k2.startswith("_")})
        Xc, Vc, eps = st["_posE"], st["_velE"], st["_eps"]
        if st["coefficient_domination_violations"] or not st["ball_consistent"]:
            print("step bound inconsistency at member", i, "step", k+1); break
    out["members"].append({"member": i, "polarity": POL[i], "release_position": [float(x) for x in POS[i]], "release_velocity": [float(x) for x in [x/2 for x in unit(cross(w, POS[i]))]], "steps": steps,
                           "certified_interval": [0.0, float(t)], "final_speed_enclosure": steps[-1]["speed_enclosure_end"], "final_state_error_bound": steps[-1]["eps_end"]})
    print(f"member {i} (q={POL[i]:+d}): certified [0, {float(t):.6f}]; steps h = {[round(s['h'],6) for s in steps]}; N = {[s['N'] for s in steps]}; rho = {[round(s['rho'],3) for s in steps]}; M = {[round(s['M'],3) for s in steps]}; L = {[round(s['L'],2) for s in steps]}")
    print(f"   speed at step ends: {[round(s['speed_end'],9) for s in steps]}; state error bound at step ends: {[s['eps_end'] for s in steps]}; sphere defect: {[s['sphere_defect_end'] for s in steps]}")
out["speed_enclosures_agree_across_members"] = bool(max(abs(out["members"][i]["steps"][-1]["speed_end"] - out["members"][0]["steps"][-1]["speed_end"]) for i in range(6)) < 1e-12)
json.dump(out, open(sys.argv[1] if len(sys.argv) > 1 else "enclosure.json", "w"), indent=1)
print("members agree on speed to 1e-12:", out["speed_enclosures_agree_across_members"])
