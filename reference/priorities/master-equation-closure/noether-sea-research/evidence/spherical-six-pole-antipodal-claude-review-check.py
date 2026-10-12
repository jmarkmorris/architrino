# Six-pole antipodal continuation, review check instrument (ramon-e-moore lens). Written 2026-10-11 18:1x UTC before any exposure to
# new campaign files. Closed forms of the review reference (sections 0, 2, 4) against direct vector computation; controls K1, K2, W1, W2
# before targets; a-priori envelope for the antipodal reading time from the accepted endpoint (section 1); endpoint support enclosure.
# mpmath 30 digits; iv (directed rounding) for the envelope and the support; mpf for the random-point comparisons. No integrator.
import os, sys, json, random, time
print("PID", os.getpid(), flush=True)
from mpmath import mp, mpf, iv, sqrt, sin, cos, matrix
mp.dps = 30; iv.dps = 30
T0 = time.time()
g = mpf(1)/10
S2 = sqrt(mpf(2))
e1 = matrix([1,0,0]); e2 = matrix([0,1,0]); e3 = matrix([0,0,1])
def dot(a,b): return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
def norm(a): return sqrt(dot(a,a))
def X1(q): return cos(q)*e1 - sin(q)*(e2+e3)/S2
def T1(q): return -sin(q)*e1 - cos(q)*(e2+e3)/S2
def X2(q): return cos(q)*e2 - sin(q)*(e3+e1)/S2
def T2(q): return -sin(q)*e2 - cos(q)*(e3+e1)/S2
def X3(q): return cos(q)*e3 - sin(q)*(e1+e2)/S2
def T3(q): return -sin(q)*e3 - cos(q)*(e1+e2)/S2
# direct vector hit from a source at Y with velocity V on receiver X1(q): returns (tangential, radial, D_t, r)
def vec_hit(q, Y, V, sig_hit):
    X = X1(q); r = X - Y; rn = norm(r); rh = r/rn
    Dt = 1 - dot(V, rh)
    A = sig_hit*rh/(rn**2*Dt)
    return dot(T1(q),A), dot(X,A), Dt, rn
# closed forms (reference sections 0,2; wave-17 forms for the meridional classes with class sign sg: +1 unlike, -1 like)
def Nf(q,qp): return cos(q+qp)/S2 - cos(q)*sin(qp)/2
def Mf(q,qp): return cos(q+qp)/S2 - sin(q)*cos(qp)/2
def merid_closed(q,qp,vp,sg):
    r = sqrt(2 - sg*S2*sin(q+qp) + sg*sin(q)*sin(qp)); D = 1 - sg*vp*Mf(q,qp)/r
    return Nf(q,qp)/(r**3*D), (-sg)/(2*r*D), D, r     # sigma_hit = -sg
def anti_closed(q,qp,vp):
    r = 2*cos((q-qp)/2); D = 1 + vp*sin((q-qp)/2)
    return sin(q-qp)/(r**3*D), -1/(2*r*D), D, r
def F_closed(q): return S2*cos(q)*((2+S2*sin(q))**mpf(-1.5)+(2-S2*sin(q))**mpf(-1.5)) + sin(q)/(8*cos(q/2)**3)
zero = matrix([0,0,0])
out = {"controls": {}, "targets": {}}
# K1: F(0) = 1 and a_rad(0) = -g/4 from the vector sum over the five fixed images at release
q = mpf(0); tot_t = mpf(0); tot_r = mpf(0)
for Y, sh in [(e2,1),(e3,1),(-e2,-1),(-e3,-1),(-e1,-1)]:
    a_t, a_r, D, r = vec_hit(q, Y, zero, sh); tot_t += a_t; tot_r += a_r
out["controls"]["K1"] = {"F0_vector": str(tot_t), "F0_closed": str(F_closed(q)), "arad0_vector_times_g": str(g*tot_r), "expected": str(-g/4),
                         "pass": abs(tot_t-1) < mpf(10)**-25 and abs(g*tot_r + g/4) < mpf(10)**-25}
# K2: antipode moving hit at q'=v'=0 equals the fixed antipode term; D_t = 1
q = mpf("0.1750540"); a_t, a_r, D, r = anti_closed(q, mpf(0), mpf(0)); fixed = sin(q)/(8*cos(q/2)**3)
vt, vr, vD, vr_ = vec_hit(q, -X1(mpf(0)), zero, -1)
out["controls"]["K2"] = {"moving_at_rest": str(a_t), "fixed_term": str(fixed), "vector": str(vt), "Dt": str(D), "pass": abs(a_t-fixed) < mpf(10)**-25 and abs(vt-fixed) < mpf(10)**-25 and D == 1}
# W1: wrong velocity sign for the antipode gives D_t < 1 (correct: > 1) at a sample point
q, qp, vp = mpf("0.19"), mpf("0.02"), mpf("0.05")
_,_,Dc,_ = vec_hit(q, -X1(qp), -vp*T1(qp), -1); _,_,Dw,_ = vec_hit(q, -X1(qp), +vp*T1(qp), -1)
out["controls"]["W1"] = {"Dt_correct": str(Dc), "Dt_wrong_sign": str(Dw), "pass": Dc > 1 and Dw < 1}
# W2: the sum-of-angles chord differs from the direct chord at q' != 0
rd = norm(X1(q) + X1(qp)); r_sum = 2*cos((q+qp)/2); r_diff = 2*cos((q-qp)/2)
out["controls"]["W2"] = {"direct": str(rd), "sum_form": str(r_sum), "diff_form": str(r_diff), "pass": abs(rd-r_diff) < mpf(10)**-25 and abs(rd-r_sum) > mpf(10)**-6}
print("controls", {k: v["pass"] for k, v in out["controls"].items()}, flush=True)
assert all(v["pass"] for v in out["controls"].values()), "control failure"
# Target 1: closed forms versus vectors at 200 random points for all three classes (tangential and radial parts, D_t, r)
random.seed(20261011)
mx = {"unlike": mpf(0), "like": mpf(0), "anti": mpf(0)}
for _ in range(200):
    q = mpf(random.uniform(0.0, 0.3)); qp = mpf(random.uniform(0.0, 0.3)); vp = mpf(random.uniform(0.0, 0.3))
    # unlike E2 at -X2(q') velocity -v' T2(q'); like P2 at +X2(q') velocity +v' T2(q'); antipode E1 at -X1(q') velocity -v' T1(q')
    for name, Y, V, sh, closed in [("unlike", -X2(qp), -vp*T2(qp), -1, lambda: merid_closed(q,qp,vp,1)),
                                   ("like", X2(qp), vp*T2(qp), 1, lambda: merid_closed(q,qp,vp,-1)),
                                   ("anti", -X1(qp), -vp*T1(qp), -1, lambda: anti_closed(q,qp,vp))]:
        v = vec_hit(q, Y, V, sh); c = closed()
        for i in range(4): mx[name] = max(mx[name], abs(v[i]-c[i]))
    # E3 mirror check for the antipode class is not needed (single source); check P3/E3 equal P2/E2 by the mirror
    vt2 = vec_hit(q, X3(qp), vp*T3(qp), 1); vt1 = vec_hit(q, X2(qp), vp*T2(qp), 1)
    mx["like"] = max(mx["like"], abs(vt2[0]-vt1[0]), abs(vt2[1]-vt1[1]))
out["targets"]["closed_vs_vector_max_abs"] = {k: str(v) for k, v in mx.items()}
print("closed vs vector", {k: mp.nstr(v, 3) for k, v in mx.items()}, flush=True)
# Target 2: a-priori envelope for the antipodal reading (reference section 1), outward rounded
def I(a, b=None): return iv.mpf(a) if b is None else iv.mpf([a, b])
gI = I(1)/10; S2I = iv.sqrt(2)
t0 = I("1.866684593623", "1.866684709182"); q0 = I("0.1750516801", "0.1750567637"); v0 = I("0.1887244343", "0.1887427709")
box_q = I("0.17", "0.21"); box_qp = I("0", "0.21"); box_vp = I("0", "0.21")
def NfI(q,qp): return iv.cos(q+qp)/S2I - iv.cos(q)*iv.sin(qp)/2
def MfI(q,qp): return iv.cos(q+qp)/S2I - iv.sin(q)*iv.cos(qp)/2
def meridI(q,qp,vp,sg):
    r = iv.sqrt(2 - sg*S2I*iv.sin(q+qp) + sg*iv.sin(q)*iv.sin(qp)); D = 1 - sg*vp*MfI(q,qp)/r
    return NfI(q,qp)/(r**3*D), D, r
def antiI(q,qp,vp):
    d = q - qp; r = 2*iv.cos(d/2); D = 1 + vp*iv.sin(d/2)
    return iv.sin(d)/(r**3*D), D, r
hU, DU, rU = meridI(box_q, box_qp, box_vp, 1); hL, DL, rL = meridI(box_q, box_qp, box_vp, -1)
# antipode: before reading its term is the fixed one (q'=v'=0); after, the moving one with 0 <= q' <= q; hull of both
hAfix = iv.sin(box_q)/(8*iv.cos(box_q/2)**3)
hAmov, DA, rA = antiI(box_q, I("0", "0.21"), box_vp)
hA = I(min(hAfix.a, hAmov.a), max(hAfix.b, hAmov.b))
rhs = 2*hU + 2*hL + hA     # the total acceleration (all five images; the fixed-image subtraction and addition collapse to the moving terms)
B_lo, B_hi = rhs.a, rhs.b
out["targets"]["envelope_box"] = {"q": [str(box_q.a), str(box_q.b)], "qp": [str(box_qp.a), str(box_qp.b)], "vp": [str(box_vp.a), str(box_vp.b)],
    "hit_unlike": [str(hU.a), str(hU.b)], "hit_like": [str(hL.a), str(hL.b)], "hit_anti_hull": [str(hA.a), str(hA.b)],
    "DU": [str(DU.a), str(DU.b)], "DL": [str(DL.a), str(DL.b)], "DA": [str(DA.a), str(DA.b)],
    "rhs_total_qddot_over_g": [str(B_lo), str(B_hi)]}
print("rhs/g over box", mp.nstr(B_lo, 8), mp.nstr(B_hi, 8), flush=True)
assert B_lo > 0
def q_env(Delta, hi):
    if hi: return q0.b + v0.b*Delta + gI.b*B_hi*Delta**2/2
    return q0.a + v0.a*Delta + gI.a*B_lo*Delta**2/2
def v_env(Delta, hi):
    return v0.b + gI.b*B_hi*Delta if hi else v0.a + gI.a*B_lo*Delta
# rho_env(Delta) = 2cos(q_env/2) - (t0 + Delta); lower t_anti from (q hi, t0 lo), upper t_anti from (q lo, t0 hi)
def bisect(f, a, b, n=80):
    fa = f(a); fb = f(b); assert fa > 0 and fb < 0
    for _ in range(n):
        m = (a+b)/2
        if f(m) > 0: a = m
        else: b = m
    return a, b
Dlo_a, Dlo_b = bisect(lambda D: (2*iv.cos(q_env(I(D), True)/2) - (t0.a + I(D))).a, mpf(0), mpf("0.2"))   # proved positive below Dlo_a
Dhi_a, Dhi_b = bisect(lambda D: (2*iv.cos(q_env(I(D), False)/2) - (t0.b + I(D))).b, mpf(0), mpf("0.2"))  # proved negative above Dhi_b
t_lo = (t0.a + I(Dlo_a)).a; t_hi = (t0.b + I(Dhi_b)).b
Dmax = I(Dhi_b)
q_at = I(q_env(I(Dlo_a), False).a, q_env(Dmax, True).b); v_at = I(v_env(I(Dlo_a), False).a, v_env(Dmax, True).b)
box_ok = q_env(Dmax, True).b <= box_q.b and v_env(Dmax, True).b <= box_vp.b
rho0 = 2*iv.cos(q0/2) - t0
out["targets"]["reading_bracket"] = {"rho_t0": [str(rho0.a), str(rho0.b)], "Delta": [str(Dlo_a), str(Dhi_b)], "t_anti": [str(t_lo), str(t_hi)],
    "q_at_reading": [str(q_at.a), str(q_at.b)], "qdot_at_reading": [str(v_at.a), str(v_at.b)], "box_assumption_verified": bool(box_ok)}
print("rho(t0)", mp.nstr(rho0.a, 10), mp.nstr(rho0.b, 10)); print("t_anti in", mp.nstr(t_lo, 12), mp.nstr(t_hi, 12), "box ok", box_ok, flush=True)
# Target 3: endpoint support enclosure from the wave-17 step-40 start values (tau, D at step start; chords = delays by the root condition)
tauU = I("1.3185839054", "1.3185866245"); tauL = I("1.5004724647", "1.5004747430")
DU0 = I("0.97515022", "0.97515058"); DL0 = I("1.01447539", "1.01447564")
rA0 = 2*iv.cos(q0/2)
arad = gI*(1/(tauL*DL0) - 1/(tauU*DU0) - 1/(2*rA0))
lam = -v0**2 - arad
sign = "outward (positive)" if lam.a > 0 else ("inward (negative)" if lam.b < 0 else "UNDECIDED (contains zero)")
out["targets"]["endpoint_support"] = {"note": "step-40 START values of tau and D with the step-END q, qdot: an estimate at the endpoint, not an enclosure over the step; the continuation must enclose per step",
    "arad": [str(arad.a), str(arad.b)], "minus_qdot2": [str((-v0**2).a), str((-v0**2).b)], "lambda_hat": [str(lam.a), str(lam.b)], "sign": sign,
    "lambda_physical_cf2_over_R_0.1": [str((lam/10).a), str((lam/10).b)]}
print("endpoint a_rad", mp.nstr(arad.a, 8), mp.nstr(arad.b, 8), "lambda_hat", mp.nstr(lam.a, 8), mp.nstr(lam.b, 8), sign, flush=True)
out["wall_s"] = time.time() - T0
p = sys.argv[1] if len(sys.argv) > 1 else "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-six-pole-antipodal-claude-review-check-output.json"
assert not os.path.exists(p), "output exists; refusing to overwrite"
with open(p, "w") as f: json.dump(out, f, indent=1)
print("saved", p, "wall", round(out["wall_s"], 2), flush=True)
