# Stage B, support role (emmy-noether): the three-class support-derivative closed forms of support-dlambda3-iv.py v2 (sha256 14b4660b...) with the
# coupling g = 1/GDEN as a PARAMETER (K = c_f = 1, R = GDEN), and the exact known control (prescribed quadratic common history, delays solved to 40
# digits, Richardson central differences vs closed form) re-derived and run at GDEN = 8, 10, 12, with the velocity-flip negative control at each.
# Run: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -l perl -e 'alarm 30; exec @ARGV' -- ../.venv/bin/python -I <this file> <out.json>
import os, sys, json, time
print("PID", os.getpid(), flush=True)
GDEN = 10
print("PID", os.getpid(), flush=True)
W14 = "reference/priorities/master-equation-closure/noether-sea-research/evidence/spherical-curvature-claude-coverage-wave14-rest-iv.py"
exec(open(W14).read().split('if __name__ == "__main__":')[0])   # Family, I, lo, up, pt, s45, S2, ONE, ZERO (frozen wave 14)
fam = Family("sixpole")
def J(x): return [s45(x.a), s45(x.b)]
def iv_of(p): return I(mp.mpf(p[0]), mp.mpf(p[1]))
MULT = {1: 2, -1: 2, 0: 1}; SIG = {1: -1, -1: 1, 0: -1}; NAME = {1: "unlike", -1: "like", 0: "antipode"}
def geom(q, qp, vp, c, dsign=1, lib=iv):
    """returns r, D, r_q, r_qp, D_q, D_qp, D_vp, N (tangential numerator); works for iv (boxes) or mp (points) via lib."""
    one = lib.mpf(1); s2 = lib.sqrt(lib.mpf(2))
    if c == 0:
        d = q - qp; sd2 = lib.sin(d/2); cd2 = lib.cos(d/2)
        r = 2*cd2; r_q = -sd2; r_qp = sd2
        D = one + dsign*vp*sd2; D_q = dsign*vp*cd2/2; D_qp = -dsign*vp*cd2/2; D_vp = dsign*sd2
        return r, D, r_q, r_qp, D_q, D_qp, D_vp, lib.sin(d)
    sg = c; cc = lib.cos(q + qp); s_ = lib.sin(q + qp)
    r2 = 2 - sg*s2*s_ + sg*lib.sin(q)*lib.sin(qp); r = lib.sqrt(r2)
    r_q = sg*(-s2*cc + lib.cos(q)*lib.sin(qp))/(2*r); r_qp = sg*(-s2*cc + lib.sin(q)*lib.cos(qp))/(2*r)
    M = cc/s2 - lib.sin(q)*lib.cos(qp)/2; M_q = -s_/s2 - lib.cos(q)*lib.cos(qp)/2; M_qp = -s_/s2 + lib.sin(q)*lib.sin(qp)/2
    k = dsign*sg; D = one - k*vp*M/r; D_q = -k*vp*(M_q*r - M*r_q)/r2; D_qp = -k*vp*(M_qp*r - M*r_qp)/r2; D_vp = -k*M/r
    return r, D, r_q, r_qp, D_q, D_qp, D_vp, cc/s2 - lib.cos(q)*lib.sin(qp)/2
def contributions(q, qdot, qdd, states, dsign=1, lib=iv, gg=None):
    """states: {c: (qp, vp, qddp)} for the moving classes (fixed classes: (0, 0, 0)). Returns dict of per-class tangent/radial (with multiplicity),
    a_rad, lambda_hat, d lambda_hat/dt, d a_rad/dt."""
    gg = lib.mpf(1)/GDEN if gg is None else gg; out = {}; arad = 0; darad = 0; tan = 0
    for c in (1, -1, 0):
        qp, vp, qddp = states[c]; r, D, r_q, r_qp, D_q, D_qp, D_vp, N = geom(q, qp, vp, c, dsign, lib)
        hit = N/(r**3*D); rad = SIG[c]/(2*r*D)
        taudot = (r_q*qdot + r_qp*vp)/(1 + r_qp*vp); om = 1 - taudot
        rdot = r_q*qdot + r_qp*vp*om; Ddot = D_q*qdot + D_qp*vp*om + D_vp*qddp*om
        d_inv = -(rdot*D + r*Ddot)/((r*D)**2)
        out[NAME[c]] = {"tan_x_mult": MULT[c]*gg*hit, "rad_x_mult": MULT[c]*gg*rad, "r": r, "D_t": D, "taudot": taudot, "one_plus_rqp_vp_minus_D": (1 + r_qp*vp) - D}
        tan += MULT[c]*gg*hit; arad += MULT[c]*gg*rad; darad += MULT[c]*gg*SIG[c]/2*d_inv
    out["tan_sum"] = tan; out["a_rad"] = arad; out["lambda_hat"] = -qdot*qdot - arad; out["d_arad_dt"] = darad; out["dlambda_dt"] = -2*qdot*qdd - darad
    return out

t_begin = time.time(); out = {"controls": []}
for GDEN in (8, 10, 12):
    mp.dps = 40
    c0, c1, c2 = mp.mpf("0.1"), mp.mpf("0.2"), mp.mpf("0.05")
    def qh(s): return c0 + c1*s + c2*s*s
    def tau_of(t, c):
        def h(tau):
            r, *_ = geom(qh(t), qh(t - tau), 0, c, 1, mp); return tau - r
        a, b = mp.mpf("1.0"), mp.mpf("2.2")
        for _ in range(200):
            m = (a + b)/2
            if h(m) < 0: a = m
            else: b = m
        return (a + b)/2
    def lam_model(t, dsign=1):
        states = {}
        for c in (1, -1, 0):
            tau = tau_of(t, c); s = t - tau; states[c] = (qh(s), c1 + 2*c2*s, 2*c2)
        return contributions(qh(t), c1 + 2*c2*t, 2*c2, states, dsign, mp, mp.mpf(1)/GDEN)
    tK = mp.mpf("1.3"); h = mp.mpf("1e-7")
    cf = lam_model(tK); fd = (lam_model(tK + h)["lambda_hat"] - lam_model(tK - h)["lambda_hat"])/(2*h); fd2 = (lam_model(tK + 2*h)["lambda_hat"] - lam_model(tK - 2*h)["lambda_hat"])/(4*h); rich = (4*fd - fd2)/3
    fdA = (lam_model(tK + h)["a_rad"] - lam_model(tK - h)["a_rad"])/(2*h); fdA2 = (lam_model(tK + 2*h)["a_rad"] - lam_model(tK - 2*h)["a_rad"])/(4*h); richA = (4*fdA - fdA2)/3
    errK = abs(cf["dlambda_dt"] - rich); errA = abs(cf["d_arad_dt"] - richA); idD = max(abs(cf[NAME[c]]["one_plus_rqp_vp_minus_D"]) for c in (1, -1, 0))
    cw = lam_model(tK, -1)
    # g-scaling identity of the model: a_rad and d a_rad/dt are exactly proportional to g at fixed history (states are g-independent in the model)
    rec = {"GDEN": GDEN, "g": mp.nstr(mp.mpf(1)/GDEN, 20), "closed_dlambda": mp.nstr(cf["dlambda_dt"], 25), "fd_dlambda": mp.nstr(rich, 25), "abs_err_dlambda": mp.nstr(errK, 5), "closed_darad": mp.nstr(cf["d_arad_dt"], 25), "abs_err_darad": mp.nstr(errA, 5),
           "a_rad_times_GDEN": mp.nstr(cf["a_rad"]*GDEN, 25), "darad_times_GDEN": mp.nstr(cf["d_arad_dt"]*GDEN, 25), "identity_dev": mp.nstr(idD, 5), "wrong_sign_dlambda": mp.nstr(cw["dlambda_dt"], 20),
           "pass_K": bool(errK < mp.mpf("1e-12") and errA < mp.mpf("1e-12") and idD < mp.mpf("1e-30")), "pass_W": bool(abs(cw["dlambda_dt"] - rich) > mp.mpf("1e-6"))}
    out["controls"].append(rec); print(json.dumps(rec), flush=True)
out["g_scaling_check"] = {"a_rad_times_GDEN_equal_across_g": len(set(c["a_rad_times_GDEN"] for c in out["controls"])) == 1, "darad_times_GDEN_equal_across_g": len(set(c["darad_times_GDEN"] for c in out["controls"])) == 1}
out["controls_all_pass"] = all(c["pass_K"] and c["pass_W"] for c in out["controls"]); print(json.dumps(out["g_scaling_check"]), "all pass", out["controls_all_pass"], flush=True)
out["wall_s"] = time.time() - t_begin; json.dump(out, open(sys.argv[1], "w"), indent=1)
