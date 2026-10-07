# weber-binding-sphere-gc-review-ext-tests.py
# Reviewer's numerical tests for Sections 16 and 17 of the great-circle closure document
# (uniform-circle class U), 2026-10-06.  K = c_f = 1, R = 1 unless stated.  Written from the
# mathematics; does not read the deriving lane's scripts or receipts.
#   ../.venv/bin/python <this file> k1py|mirror|search|s17|ratio31|fals <args>
# Known-case order: `k1py` anchors this evaluator to the frozen library through the Node receipt
# weber-binding-sphere-gc-review-ext-k1.json and must pass before any other subcommand is read.
import sys, json, os, time, datetime
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
def utc(): return datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
def unit(x): x = np.asarray(x, float); return x/np.linalg.norm(x)
def basis(n):
    n = np.asarray(n, float); ref = np.array([0, 0, 1.0]) if abs(n[2]) < 0.9 else np.array([1.0, 0, 0])
    u = unit(np.cross(ref, n)); return u, np.cross(n, u)

# A member is (C, u, up, a, omega, phi): X = C + a (cos th u + sin th up), th = omega T + phi.
def kin(T, mem):
    T = np.atleast_1d(T); C = np.array([m[0] for m in mem]); u = np.array([m[1] for m in mem]); up = np.array([m[2] for m in mem])
    a = np.array([m[3] for m in mem]); om = np.array([m[4] for m in mem]); phi = np.array([m[5] for m in mem])
    th = om[None]*T[:, None] + phi[None]; cs, sn = np.cos(th)[..., None], np.sin(th)[..., None]
    e = cs*u[None] + sn*up[None]; t = -sn*u[None] + cs*up[None]
    X = C[None] + a[None, :, None]*e; V = (a*om)[None, :, None]*t; Acc = -(a*om*om)[None, :, None]*e
    return X, V, Acc
def pair_fields(X, V, Acc):
    dx = X[:, :, None] - X[:, None]; dv = V[:, :, None] - V[:, None]; da = Acc[:, :, None] - Acc[:, None]
    D = (dx*dx).sum(-1); Dd = 2*(dx*dv).sum(-1); Ddd = 2*(dv*dv).sum(-1) + 2*(dx*da).sum(-1)
    return dx, D, Dd, Ddd
def resid(T, mem, q):
    X, V, Acc = kin(T, mem); dx, D, Dd, Ddd = pair_fields(X, V, Acc); N = len(mem); eye = np.eye(N, dtype=bool)
    D1 = np.where(eye[None], 1.0, D)
    w = np.where(eye[None], 0.0, (q[:, None]*q[None])[None]*D1**-2.5*((1 + Ddd/2)*D1 - 3*Dd**2/8))
    return (w[..., None]*dx).sum(2) - Acc, D
def latitude_member(n, c, a, omega, phi):
    n = np.asarray(n, float); u, up = basis(n); return (c*n, u, up, a, omega, phi)

def k1py():
    rec = json.load(open(os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-k1.json'))); worst = 0.0
    for c in rec['cases']:
        mem = [latitude_member(m['n'], m['c'], m['a'], m['omega'], m['phi']) for m in c['mem']]
        G, _ = resid(np.array([c['T']]), mem, np.array(c['q'], float)); Gn = np.array(c['G'])
        worst = max(worst, abs(G[0] - Gn).max()/abs(Gn).max())
    n = unit([0.2, -0.3, 0.9]); a = 0.6; cc = 0.8; om = np.sqrt(1/(4*a**3)); q2 = np.array([1.0, -1.0])
    mem = [latitude_member(n, cc, a, om, 0.1), latitude_member(n, cc, a, om, 0.1 + np.pi)]
    T = np.linspace(0, 9, 13); G0, _ = resid(T, mem, q2)
    mem2 = [latitude_member(n, cc, a, 1.1*om, 0.1), latitude_member(n, cc, a, 1.1*om, 0.1 + np.pi)]; G1, _ = resid(T, mem2, q2)
    out = dict(test='ext-k1py', utc=utc(), worstRelVsNode=worst, diametralPair=abs(G0).max()/(om*om*a), diametralPairDetunedAbs=np.sqrt((G1**2).sum(-1)).max(), expectedDetunedAbs=0.21*a*om*om)
    out['pass'] = bool(worst < 1e-12 and out['diametralPair'] < 1e-12 and abs(out['diametralPairDetunedAbs'] - out['expectedDetunedAbs']) < 1e-12)
    return out

# ---------- Laurent coefficients of a periodic D by sampling ----------
def laurent(fun, deg, period):
    K = 4*deg + 4; T = np.arange(K)*period/K; f = fun(T); k = np.arange(-deg, deg + 1)
    co = np.array([(f*np.exp(-2j*np.pi*kk*np.arange(K)/K)).mean() for kk in k])
    extra = max(abs((f*np.exp(-2j*np.pi*kk*np.arange(K)/K)).mean()) for kk in (deg + 1, deg + 2))
    return co, extra          # co[m] multiplies zeta^(m-deg)
def roots_gap(co):
    # relative gap |r_a - r_b| / sqrt(|r_a||r_b|): scale-free, so that roots crowding toward 0 (small circles) do not mimic a double root
    r = np.roots(co[::-1]); d = abs(r[:, None] - r[None, :])/np.sqrt(abs(r[:, None])*abs(r[None, :])) + np.eye(len(r))*9; return r, d.min()

# ---------- mirror pairs (Lemmas 16.7, 16.8) ----------
def mirror(n=60, seed=21):
    rng = np.random.default_rng(seed); rows = []
    while len(rows) < n:
        ni = unit(rng.normal(size=3)); c = rng.uniform(0.3, 0.95)*rng.choice([-1, 1]); a = np.sqrt(1 - c*c); om = rng.uniform(0.3, 2); phi = rng.uniform(0, 2*np.pi)
        nu = unit(rng.normal(size=3)); nun = ni @ nu; nup = np.sqrt(1 - nun**2)
        if abs(c*nun) < 1.05*a*nup or nup < 0.05: continue      # plane must not meet the circle; not rigid
        M = np.eye(3) - 2*np.outer(nu, nu); u, up = basis(ni)
        mi = (c*ni, u, up, a, om, phi); mj = (M @ (c*ni), M @ u, M @ up, a, om, phi); mem = [mi, mj]
        T = rng.uniform(0, 20, 50); X, V, Acc = kin(T, mem)
        d = np.sqrt(((X[:, 0] - X[:, 1])**2).sum(-1)); dform = 2*abs(X[:, 0] @ nu)
        # Laurent polynomial in z = e^{i om T}: degree two, two double roots
        co, extra = laurent(lambda t: ((kin(t, mem)[0][:, 0] - kin(t, mem)[0][:, 1])**2).sum(-1), 2, 2*np.pi/om)
        r, gap = roots_gap(co); r = r[np.argsort(abs(r))]; dbl = max(abs(r[0] - r[1]), abs(r[2] - r[3]))/abs(r[2])
        # zero of eta = 2 X_i.nu :  2 c nun + 2 a (nu.u cos th + nu.up sin th) = 0
        az = np.arctan2(nu @ up, nu @ u); th0 = az + np.arccos(complex(-c*nun/(a*nup))); T0 = (th0 - phi)/om
        if abs(T0.imag) < 1e-9: continue
        sig = -1.0; sgn = np.sign(2*(kin(np.array([0.0]), mem)[0][0, 0] @ nu))
        def term(Tc):
            X, V, Acc = kin(Tc, mem); dx, D, Dd, Ddd = pair_fields(X, V, Acc); eta = 2*(X[:, 0] @ nu)
            s5 = (sgn*eta)**5                                   # continuation of D^{5/2} = |eta|^5 from the real axis
            return sig*(((1 + Ddd/2)*D - 3*Dd**2/8)[:, 0, 1]/s5)[:, None]*dx[:, 0, 1], eta, D[:, 0, 1]
        rr = np.logspace(-3, -6, 13); ang = rng.uniform(0, 2*np.pi); tm, eta, Dc = term(T0 + rr*np.exp(1j*ang))
        nrm = np.linalg.norm(tm, axis=1); slope = np.polyfit(np.log(rr), np.log(nrm), 1)[0]
        etad0 = 2*a*om*(-(nu @ u)*np.sin(th0) + (nu @ up)*np.cos(th0))
        num = 1 + 2*om**2*(c*c*nun**2 - a*a*nup**2)
        coefPred = sgn*sig*num/etad0**2*nu; coefMeas = tm[-1]*(rr[-1]*np.exp(1j*ang))**2
        # single-valuedness: sqrt(D) continued once around T0 returns to itself
        loop = T0 + 1e-3*np.exp(1j*np.linspace(0, 2*np.pi, 2001)); _, _, Dl = term(loop); s = np.sqrt(Dl.astype(complex))
        keep = np.where(abs(s[1:] - s[:-1]) <= abs(s[1:] + s[:-1]), 1.0, -1.0).prod()
        rows.append(dict(d_minus_2Xnu=float(abs(d - dform).max()), extraHarmonic=float(extra), doubleRootSplitRel=float(dbl), eta_at_T0=float(abs(2*(kin(np.array([T0]), mem)[0][0, 0] @ nu))),
                         poleExponent=float(slope), coefRel=float(np.linalg.norm(coefMeas - coefPred)/np.linalg.norm(coefPred)), numerator=float(num), numeratorFromEtaDot=float((1 - etad0**2/2).real), rootMonodromy=float(keep), minD=float((d**2).min())))
    S = lambda k: [r[k] for r in rows]
    return dict(test='ext-mirror', utc=utc(), n=n, max_d_minus_2Xnu=max(S('d_minus_2Xnu')), maxExtraHarmonic=max(S('extraHarmonic')), maxDoubleRootSplitRel=max(S('doubleRootSplitRel')),
                maxAbsEtaAtT0=max(S('eta_at_T0')), poleExponentRange=[min(S('poleExponent')), max(S('poleExponent'))], maxCoefRel=max(S('coefRel')),
                minNumerator=min(S('numerator')), maxNumeratorMismatch=max(abs(r['numerator'] - r['numeratorFromEtaDot']) for r in rows), rootMonodromyAllPlusOne=bool(all(r['rootMonodromy'] == 1.0 for r in rows)), rows=rows)

# ---------- direct search for square pairs (equal radii non-mirror; parallel axes) ----------
def equal_radius_pair(c, eps, gam, delta):
    a = np.sqrt(1 - c*c); ni = np.array([0, 0, 1.0]); nj = np.array([0, np.sin(gam), np.cos(gam)]); l = unit(np.cross(ni, nj))
    return [(c*ni, l, np.cross(ni, l), a, 1.0, -delta), (eps*c*nj, l, np.cross(nj, l), a, 1.0, delta)]
def pair_gap(mem, deg, period):
    f = lambda t: ((kin(t, mem)[0][:, 0] - kin(t, mem)[0][:, 1])**2).sum(-1)
    co, extra = laurent(f, deg, period); r, gap = roots_gap(co)
    Tt = np.linspace(0, period, 721); return gap, f(Tt).min(), extra
def search(seed=31, ns=20000):
    from scipy.optimize import minimize
    rng = np.random.default_rng(seed); out = dict(test='ext-search', utc=utc(), nsamples=ns)
    # known cases for the gap instrument: a mirror configuration (eps=-1, delta=0, no crossing) has gap ~ 0; a generic pair does not
    g0 = pair_gap(equal_radius_pair(0.8, -1, 0.7, 0.0), 2, 2*np.pi); g1 = pair_gap(equal_radius_pair(0.8, -1, 0.7, 0.4), 2, 2*np.pi)
    out['knownCase_mirror'] = dict(gap=float(g0[0]), minD=float(g0[1])); out['knownCase_nonMirror'] = dict(gap=float(g1[0]), minD=float(g1[1]))
    rec = {1: [], -1: []}
    for _ in range(ns):
        c = rng.uniform(0, 0.99); eps = int(rng.choice([-1, 1])); gam = rng.uniform(0.02, np.pi - 0.02); delta = rng.uniform(-np.pi/2, np.pi/2)
        gap, mD, extra = pair_gap(equal_radius_pair(c, eps, gam, delta), 2, 2*np.pi); rec[eps].append((gap, mD, abs(np.sin(delta)), c, gam, delta))
    P = np.array(rec[1]); Mi = np.array(rec[-1])
    out['sameSide_eps_plus'] = dict(n=len(P), minGap_minD_ge_0p01=float(P[P[:, 1] >= 0.01, 0].min()), minGap_all=float(P[:, 0].min()), min_gap_over_sqrt_minD=float((P[:, 0]/np.sqrt(np.maximum(P[:, 1], 1e-300))).min()))
    ok = Mi[:, 1] >= 0.01
    out['oppositeSide_eps_minus'] = dict(n=len(Mi), minGap_minD_ge_0p01_absSinDelta_ge_0p1=float(Mi[ok & (Mi[:, 2] >= 0.1), 0].min()), min_gap_over_sqrt_absSinDelta_minD_ge_0p01=float((Mi[ok, 0]/np.sqrt(Mi[ok, 2])).min()))
    # local minimisation of the gap with penalties keeping min D >= 0.02 (and |sin delta| >= 0.1 for eps=-1)
    best = []
    for eps, arr in ((1, P), (-1, Mi)):
        cand = arr[arr[:, 1] >= 0.02]
        if eps == -1: cand = cand[cand[:, 2] >= 0.1]
        cand = cand[np.argsort(cand[:, 0])][:12]
        for row in cand:
            def g(x):
                c = min(max(x[0], 0.0), 0.995); gam = min(max(x[1], 0.02), np.pi - 0.02)
                gap, mD, _ = pair_gap(equal_radius_pair(c, eps, gam, x[2]), 2, 2*np.pi)
                pen = 50*max(0.02 - mD, 0)**2 + (50*max(0.1 - abs(np.sin(x[2])), 0)**2 if eps == -1 else 0)
                return gap + pen
            o = minimize(g, row[3:6], method='Nelder-Mead', options=dict(maxiter=600, xatol=1e-9, fatol=1e-12))
            gap, mD, _ = pair_gap(equal_radius_pair(min(max(o.x[0], 0), 0.995), eps, min(max(o.x[1], 0.02), np.pi - 0.02), o.x[2]), 2, 2*np.pi)
            best.append((eps, float(gap), float(mD), float(abs(np.sin(o.x[2])))))
    out['refined_minGap_eps_plus'] = min(b[1:] for b in best if b[0] == 1); out['refined_minGap_eps_minus_absSinDelta_ge_0p1'] = min(b[1:] for b in best if b[0] == -1)
    # parallel axes, any radii and (signed) rates: D = p - q cos; in zeta = e^{i (om_i - om_j) T} two roots
    rows = []
    for _ in range(5000):
        ci, cj = rng.uniform(-0.99, 0.99, 2); ai, aj = np.sqrt(1 - ci*ci), np.sqrt(1 - cj*cj); oi, oj = rng.uniform(0.2, 3, 2)*rng.choice([-1, 1], 2)
        if abs(oi - oj) < 0.05: continue
        n = np.array([0, 0, 1.0]); mem = [latitude_member(n, ci, ai, oi, rng.uniform(0, 6.28)), latitude_member(n, cj, aj, oj, rng.uniform(0, 6.28))]
        gap, mD, extra = pair_gap(mem, 1, 2*np.pi/abs(oi - oj)); rows.append((gap, mD, extra))
    A = np.array(rows)
    out['parallelAxes'] = dict(n=len(A), maxHarmonicBeyondFirst=float(A[:, 2].max()), minGap_minD_ge_0p01=float(A[A[:, 1] >= 0.01, 0].min()), min_gap_over_sqrt_minD=float((A[:, 0]/np.sqrt(A[:, 1])).min()), minMinD=float(A[:, 1].min()))
    return out

# ---------- Section 17 ----------
def general_pair(rng, ratio=None, parallel=False):
    ni = np.array([0, 0, 1.0]); gam = rng.uniform(0.05, np.pi - 0.05); nj = np.array([0, np.sin(gam), np.cos(gam)]); l = unit(np.cross(ni, nj))
    while True:
        ai = rng.uniform(0.1, 0.99); aj = ai*ratio if ratio else rng.uniform(0.1, 0.99)
        if aj < 0.995: break
    ci = np.sqrt(1 - ai*ai)*rng.choice([-1, 1]); cj = np.sqrt(1 - aj*aj)*rng.choice([-1, 1]); v = 1.0
    mem = [(ci*ni, l, np.cross(ni, l), ai, v/ai, rng.uniform(0, 2*np.pi)), (cj*nj, l, np.cross(nj, l), aj, v/aj, rng.uniform(0, 2*np.pi))]
    return mem, dict(gam=gam, ai=ai, aj=aj, ci=ci, cj=cj)
def torus_coeffs(mem):
    # P(z1,z2) coefficients by a 4x4 discrete Fourier transform over the two angles (independent of the b formalism)
    K = 4; th = np.arange(K)*2*np.pi/K; vals = np.zeros((K, K))
    (Ci, ui, upi, ai, _, _), (Cj, uj, upj, aj, _, _) = mem
    for p in range(K):
        for q_ in range(K):
            Xi = Ci + ai*(np.cos(th[p])*ui + np.sin(th[p])*upi); Xj = Cj + aj*(np.cos(th[q_])*uj + np.sin(th[q_])*upj); vals[p, q_] = ((Xi - Xj)**2).sum()
    F = np.fft.fft2(vals)/K**2; return F      # F[p,q] multiplies z1^p z2^q (indices mod 4; index 2 must vanish)
def s17(seed=41):
    rng = np.random.default_rng(seed); out = dict(test='ext-s17', utc=utc())
    w = dict(mod=0.0, extra=0.0); minDefect = 9.0; rows = []
    for _ in range(400):
        mem, g = general_pair(rng); F = torus_coeffs(mem); cg, sg = np.cos(g['gam']), np.sin(g['gam']); ai, aj, ci, cj = g['ai'], g['aj'], g['ci'], g['cj']
        w['mod'] = max(w['mod'], abs(abs(F[1, 1]) - 0.5*ai*aj*(1 - cg)), abs(abs(F[1, 3]) - 0.5*ai*aj*(1 + cg)), abs(abs(F[1, 0]) - abs(cj)*ai*sg), abs(abs(F[0, 1]) - abs(ci)*aj*sg), abs(F[0, 0].real - (2 - 2*ci*cj*cg)))
        w['extra'] = max(w['extra'], abs(F[2, :]).max(), abs(F[:, 2]).max())
        d1 = abs(F[1, 0]**2 - 4*F[1, 1]*F[1, 3]); d2 = abs(F[0, 1]**2 - 4*F[1, 1]*F[3, 1]); slack = F[0, 0].real - 2*abs(F[1, 1]) - 2*abs(F[1, 3])
        minDefect = min(minDefect, max(d1, d2, max(-slack, 0))/sg**2); rows.append((d1, d2, slack))
    out['coefficientModuliMaxError'] = w['mod']; out['maxCoefficientOutsideNineTerms'] = w['extra']; out['minSquareObstruction_over_sin2gamma_400pairs'] = minDefect
    # the only place where both quadratic conditions can hold: a_i = a_j = |c_i| = |c_j| = 1/sqrt2; there p00 must exceed R^2
    mins = 9.0; maxd = 0.0
    for _ in range(200):
        gam = rng.uniform(0.02, np.pi - 0.02); ni = np.array([0, 0, 1.0]); nj = np.array([0, np.sin(gam), np.cos(gam)]); l = unit(np.cross(ni, nj)); s2 = np.sqrt(0.5)
        mem = [(s2*rng.choice([-1, 1])*ni, l, np.cross(ni, l), s2, 1.0, 0.0), (s2*rng.choice([-1, 1])*nj, l, np.cross(nj, l), s2, 1.0, 0.0)]; F = torus_coeffs(mem)
        maxd = max(maxd, abs(abs(F[1, 0])**2 - 4*abs(F[1, 1])*abs(F[1, 3])), abs(abs(F[0, 1])**2 - 4*abs(F[1, 1])*abs(F[3, 1])))
        mins = min(mins, (F[0, 0].real - 1.0)/(1 - abs(np.cos(gam))))
    out['forcedConfiguration'] = dict(maxModulusConditionDefect=maxd, min_p00_minus_R2_over_1_minus_abscos=mins)
    # irrational ratios: zeros of D(T) by Newton from random complex starts; all should be simple
    zs = []; ratios = [np.sqrt(2), (1 + np.sqrt(5))/2, np.pi/2, np.sqrt(3)/1.1]
    for k in range(40):
        ratio = ratios[k % 4]; ratio = ratio if rng.random() < 0.5 else 1/ratio
        mem, g = general_pair(rng, ratio=ratio)
        def Dfun(T):
            X, V, Acc = kin(T, mem); dx, D, Dd, Ddd = pair_fields(X, V, Acc); return D[:, 0, 1], Dd[:, 0, 1], Ddd[:, 0, 1]
        scale = 2*g['ai']*g['aj']; found = []
        for _ in range(30):
            T = np.array([rng.uniform(0, 60) + 1j*rng.uniform(-2.5, 2.5)])
            for it in range(60):
                D, Dd, Ddd = Dfun(T); step = D/Dd
                if abs(step[0]) > 1: step = step/abs(step[0])
                T = T - step
            D, Dd, Ddd = Dfun(T)
            if abs(D[0]) < 1e-11*scale and abs(T[0].imag) < 4 and all(abs(T[0] - f) > 1e-6 for f in found):
                found.append(T[0]); zs.append((abs(Dd[0])/(scale*(1/g['ai'] + 1/g['aj'])), abs(T[0].imag)))
    Z = np.array(zs)
    out['irrationalRatioZeros'] = dict(pairs=40, zerosFound=len(Z), min_absDdot_scaled=float(Z[:, 0].min()), median_absDdot_scaled=float(np.median(Z[:, 0])), minAbsImT=float(Z[:, 1].min()))
    return out

def sq_defect(d):          # d: Laurent coefficients d_{-m..m}; top-down square root; residual of the lower half
    m = (len(d) - 1)//2; h = m//2; top = d[::-1]                      # top[0] = d_m
    g = np.zeros(m + 1, complex); g[0] = np.sqrt(complex(top[0]))
    for k in range(1, m + 1): g[k] = (top[k] - sum(g[r]*g[k - r] for r in range(1, k)))/(2*g[0])
    sq = np.convolve(g, g); return float(np.linalg.norm(sq[m + 1:] - top[m + 1:])/abs(d[m])), g
def pair31(a, gam, phi, relsign):
    ni = np.array([0, 0, 1.0]); nj = np.array([0, np.sin(gam), np.cos(gam)]); l = unit(np.cross(ni, nj))
    ci = np.sqrt(1 - a*a); cj = relsign*np.sqrt(max(1 - 9*a*a, 0.0))
    return [(ci*ni, l, np.cross(ni, l), a, 3.0, phi), (cj*nj, l, np.cross(nj, l), 3*a, 1.0, 0.0)]
def d31(a, gam, phi, relsign, want_min=True):
    mem = pair31(a, gam, phi, relsign); f = lambda t: ((kin(t, mem)[0][:, 0] - kin(t, mem)[0][:, 1])**2).sum(-1)
    co, extra = laurent(f, 4, 2*np.pi); return co, extra, (f(np.linspace(0, 2*np.pi, 2881)).min() if want_min else None)
def ratio31(seed=51, nstart=150):
    from scipy.optimize import least_squares
    rng = np.random.default_rng(seed); out = dict(test='ext-ratio31', utc=utc())
    # known cases of the squareness instrument: an exact square of a random real Laurent polynomial, and a generic non-square
    gk = rng.normal(size=5) + 1j*rng.normal(size=5); gk[2] = gk[2].real; gk = np.array([gk[0], gk[1], gk[2], np.conj(gk[1]), np.conj(gk[0])])
    out['knownCase_exactSquare'] = sq_defect(np.convolve(gk, gk))[0]
    co, extra, mD = d31(0.2, 1.0, 0.7, 1); out['knownCase_generic31'] = dict(defect=sq_defect(co)[0], harmonicsBeyond4=float(extra), minD=float(mD))
    a0 = np.sqrt(2/27); g0 = np.arccos(7/9); res = {}
    for rel in (1, -1):
        for ph in (np.pi, 0.0):
            co, extra, mD = d31(a0, g0, ph, rel); res['relsign%+d_phi%.2f' % (rel, ph)] = dict(defect=sq_defect(co)[0], minD=float(mD))
    out['claimedConfiguration'] = res; out['tangency_arcsin_aj_minus_arcsin_ai_minus_gamma'] = float(np.arcsin(3*a0) - np.arcsin(a0) - g0)
    co, _, _ = d31(a0, g0, np.pi, 1); r = np.roots(co[::-1]); out['claimedConfiguration_rootModuli'] = sorted(float(abs(x)) for x in r)
    sols = []; floor = 9.0; nfloor = 0
    for rel in (1, -1):
        for s in range(nstart):
            x0 = np.array([rng.uniform(0.03, 0.33), rng.uniform(0.05, np.pi - 0.05), rng.uniform(0, 2*np.pi)])
            def fun(x):
                co, _, _ = d31(x[0], x[1], x[2], rel, want_min=False); m = 4; top = co[::-1]; g = np.zeros(5, complex); g[0] = np.sqrt(complex(top[0]))
                for k in range(1, 5): g[k] = (top[k] - sum(g[r]*g[k - r] for r in range(1, k)))/(2*g[0])
                e = (np.convolve(g, g)[5:] - top[5:])/abs(co[4]); return np.concatenate([e.real, e.imag])
            try: o = least_squares(fun, x0, bounds=([0.01, 0.02, -10], [1/3 - 1e-9, np.pi - 0.02, 10]), xtol=1e-15, ftol=1e-15, gtol=1e-15, max_nfev=300)
            except Exception: continue
            co, _, mD = d31(o.x[0], o.x[1], o.x[2], rel); de = sq_defect(co)[0]
            if de < 1e-9: sols.append((rel, float(o.x[0]**2), float(np.cos(o.x[1])), float(np.mod(o.x[2], 2*np.pi)), float(mD), de))
            elif mD >= 0.01: floor = min(floor, de); nfloor += 1
    out['solutionsFound'] = len(sols); out['solutions_relsign_counts'] = dict(plus=sum(1 for s in sols if s[0] == 1), minus=sum(1 for s in sols if s[0] == -1))
    if sols:
        S = np.array(sols); out['solutions_a2_range'] = [float(S[:, 1].min()), float(S[:, 1].max())]; out['solutions_cosgamma_range'] = [float(S[:, 2].min()), float(S[:, 2].max())]
        out['solutions_phi_range'] = [float(S[:, 3].min()), float(S[:, 3].max())]; out['solutions_maxMinD'] = float(S[:, 4].max())
    out['two27'] = 2/27; out['sevenNinths'] = 7/9
    out['nonSolutionEndStates_minD_ge_0p01'] = dict(count=nfloor, minDefect=float(floor))
    # random 3:1 pairs: defect and root gap
    df = []
    for _ in range(3000):
        a = rng.uniform(0.03, 0.33); co, _, mD = d31(a, rng.uniform(0.05, np.pi - 0.05), rng.uniform(0, 2*np.pi), int(rng.choice([-1, 1])))
        if mD >= 0.01: df.append((sq_defect(co)[0], roots_gap(co)[1]))
    df = np.array(df); out['random31_minD_ge_0p01'] = dict(n=len(df), minDefect=float(df[:, 0].min()), minRootGap=float(df[:, 1].min()))
    return out

# ---------- falsifier attempt: stacked latitudes (all axes parallel), unequal rates allowed ----------
def fals(mode='singles', nstart=100, seed=61):
    from scipy.optimize import least_squares
    rng = np.random.default_rng(seed); nz = np.array([0, 0, 1.0]); u0, up0 = np.array([1.0, 0, 0]), np.array([0, 1.0, 0]); Tt = np.linspace(0, 24, 72)
    def members(p, sense):
        if mode == 'singles': c = p[0:6]; phi = p[6:12]; v = p[12]; s = sense
        else: c = np.repeat(p[0:3], 2); phi = np.stack([p[3:6], p[3:6] + p[6:9]], 1).ravel(); v = p[9]; s = np.repeat(sense, 2)
        a = np.sqrt(np.maximum(1 - c*c, 1e-12)); return [(c[k]*nz, u0, up0, a[k], s[k]*v/a[k], phi[k]) for k in range(6)], s*v/a, v
    def run(p0, sense, q, lo, hi):
        f = lambda p: (resid(Tt, members(p, sense)[0], q)[0]/members(p, sense)[2]**2).ravel()
        o = least_squares(f, p0, bounds=(lo, hi), xtol=1e-14, ftol=1e-14, gtol=1e-14, max_nfev=300)
        mem, rates, v = members(o.x, sense); Tf = np.linspace(0, 40, 400); G, D = resid(Tf, mem, q)
        return dict(sup=float(np.sqrt((G**2).sum(-1)).max()/v**2), rms=float(np.sqrt(np.mean(o.fun**2))), rateSpread=float(rates.max() - rates.min()), v=float(v), minSep=float(np.sqrt(D[:, ~np.eye(6, dtype=bool)].min())), heights=[float(x) for x in (o.x[0:6] if mode == 'singles' else o.x[0:3])], nfev=int(o.nfev))
    npar = 13 if mode == 'singles' else 10; nh = 6 if mode == 'singles' else 3
    lo = np.full(npar, -np.inf); hi = np.full(npar, np.inf); lo[:nh], hi[:nh] = -0.97, 0.97; lo[-1], hi[-1] = 0.2, 3.0
    out = dict(test='ext-fals', mode=mode, utc=utc(), nstart=nstart, seed=seed, times='72 on [0,24] for the fit, 400 on [0,40] for the report', normalisation='v^2 / R with R = 1')
    # reach known case: rigid alternating hexagon on the equator, v = Omega R = sqrt(5/4 - 1/sqrt3), recovered from a perturbed start
    vh = np.sqrt(1.25 - 1/np.sqrt(3)); qh = np.array([1, -1, 1, -1, 1, -1.0])
    if mode == 'singles':
        ph = np.concatenate([np.zeros(6), np.arange(6)*np.pi/3, [vh]]); sense = np.ones(6)
    else:
        ph = np.concatenate([np.zeros(3), np.array([0, 2, 4])*np.pi/3, np.full(3, np.pi/3), [vh]]); sense = np.ones(3)
    exact = (resid(Tt, members(ph, sense)[0], qh)[0]/vh**2); out['knownCase_hexagonExact'] = float(abs(exact).max())
    reach = []
    for k in range(5):
        p0 = ph + np.concatenate([rng.normal(0, 0.02, npar - 1), [rng.normal(0, 0.02)]]); reach.append(run(p0, sense, qh, lo, hi))
    out['knownCase_reach'] = [dict(sup=r['sup'], rateSpread=r['rateSpread'], v=r['v'], maxAbsHeight=max(abs(h) for h in r['heights'])) for r in reach]
    rows = []; t0 = time.time()
    for s in range(nstart):
        q = rng.permutation([1, 1, 1, -1, -1, -1.0]) if mode == 'singles' else np.array([1, -1, 1, -1, 1, -1.0]) if s % 2 == 0 else np.array([1, 1, -1, -1, 1, -1.0])
        sense = rng.choice([-1.0, 1.0], nh); p0 = np.concatenate([rng.uniform(-0.9, 0.9, nh), rng.uniform(0, 2*np.pi, npar - nh - 1), [rng.uniform(0.3, 2.5)]])
        try: r = run(p0, sense, q, lo, hi)
        except Exception as e: rows.append(dict(start=s, error=str(e))); continue
        r.update(start=s, sense=sense.tolist(), q=q.tolist()); rows.append(r)
    ok = [r for r in rows if 'error' not in r]; rigid = [r for r in ok if r['rateSpread'] < 1e-6]; non = [r for r in ok if r['rateSpread'] >= 1e-6]
    out.update(seconds=time.time() - t0, nOk=len(ok), nRigidEndStates=len(rigid), nRigidBelow1em8=sum(r['sup'] < 1e-8 for r in rigid), bestRigid=min([r['sup'] for r in rigid], default=None),
               nNonRigid=len(non), nonRigidFloorSup=min([r['sup'] for r in non], default=None), nonRigidFloorRms=min([r['rms'] for r in non], default=None),
               nNonRigidBelow1em4=sum(r['sup'] < 1e-4 for r in non), bestNonRigid=min(non, key=lambda r: r['sup']) if non else None, rows=rows)
    return out

def ratio31grid(n=220):
    # With phi = pi (forced by the first three coefficient equations, checked on paper by the reviewer), scan the
    # squareness defect over (a, gamma) for both relative height signs, refine every local minimum, list the zeros.
    from scipy.optimize import minimize
    out = dict(test='ext-ratio31grid', utc=utc(), grid=n)
    A = np.linspace(0.004, 1/3 - 1e-4, n); G = np.linspace(0.01, np.pi - 0.01, n)
    for rel in (1, -1):
        Z = np.array([[sq_defect(d31(a, g, np.pi, rel, want_min=False)[0])[0] for g in G] for a in A]); L = np.log10(Z)
        mins = []
        for p in range(1, n - 1):
            for q_ in range(1, n - 1):
                if L[p, q_] <= L[p - 1:p + 2, q_ - 1:q_ + 2].min() and Z[p, q_] < 0.3: mins.append((p, q_))
        ref = []
        for p, q_ in mins:
            f = lambda x: sq_defect(d31(min(max(x[0], 1e-3), 1/3 - 1e-9), min(max(x[1], 1e-3), np.pi - 1e-3), np.pi, rel, want_min=False)[0])[0]
            o = minimize(f, [A[p], G[q_]], method='Nelder-Mead', options=dict(xatol=1e-13, fatol=1e-16, maxiter=3000))
            co, _, mD = d31(o.x[0], o.x[1], np.pi, rel); ref.append(dict(a2=float(o.x[0]**2), cosgamma=float(np.cos(o.x[1])), defect=float(o.fun), minD=float(mD), gridDefect=float(Z[p, q_])))
        out['relsign%+d' % rel] = dict(gridMinDefect=float(Z.min()), gridArgmin=dict(a2=float(A[np.unravel_index(Z.argmin(), Z.shape)[0]]**2), cosgamma=float(np.cos(G[np.unravel_index(Z.argmin(), Z.shape)[1]]))), nLocalMinimaBelow0p3=len(mins), refined=sorted(ref, key=lambda r: r['defect']))
    return out

def pair_rs(rng, r, s_):
    # member i has rate r (radius a), member j rate s_ (radius r a / s_); frame of Lemma 16.7; phi_j = 0
    gam = rng.uniform(0.05, np.pi - 0.05); ni = np.array([0, 0, 1.0]); nj = np.array([0, np.sin(gam), np.cos(gam)]); l = unit(np.cross(ni, nj))
    a = rng.uniform(0.05, 0.99*s_/r); aj = a*r/s_; ci = np.sqrt(1 - a*a)*rng.choice([-1, 1]); cj = np.sqrt(1 - aj*aj)*rng.choice([-1, 1]); phi = rng.uniform(0, 2*np.pi)
    return [(ci*ni, l, np.cross(ni, l), a, float(r), phi), (cj*nj, l, np.cross(nj, l), aj, float(s_), 0.0)], dict(gam=gam, a=a, aj=aj, ci=ci, cj=cj, phi=phi)
def s18(seed=71):
    rng = np.random.default_rng(seed); out = dict(test='ext-s18', utc=utc())
    for (r, s_) in ((5, 3), (7, 3), (7, 5), (5, 1), (7, 1), (9, 1)):
        m2 = r + s_; w = dict(outside=0.0, e=0.0, h=0.0, sparse=0.0); defects = []; gaps = []
        for _ in range(150):
            mem, g = pair_rs(rng, r, s_); f = lambda t: ((kin(t, mem)[0][:, 0] - kin(t, mem)[0][:, 1])**2).sum(-1)
            co, extra = laurent(f, m2, 2*np.pi); allowed = {0, s_, r - s_, r, r + s_}
            w['outside'] = max(w['outside'], max(abs(co[k + m2]) for k in range(-m2, m2 + 1) if abs(k) not in allowed), extra)
            e = co[::-1]/co[-1]                                   # e[k] multiplies x^k
            h = np.zeros(m2 + 1, complex); h[0] = 1
            for k in range(1, m2 + 1): h[k] = (e[k] - sum(h[i]*h[k - i] for i in range(1, k)))/2
            if s_ >= 3: w['sparse'] = max(w['sparse'], max(abs(h[k]) for k in range(1, r) if k % s_ != 0))
            else:
                kap = 1/np.tan(g['gam']/2); be = g['cj']/g['aj']; bi = g['ci']/g['a']
                w['e'] = max(w['e'], abs(e[1] - 2j*be*kap), abs(e[2] - kap**2), abs(e[r] + 2j*bi*kap*np.exp(-1j*g['phi']))/abs(e[r]))
                t = [1.0, -be*kap]
                for n in range(1, r - 1): t.append(((2*n - 1)*be*kap*t[n] + (n - 2)*kap**2*t[n - 1])/(n + 1))
                w['h'] = max(w['h'], max(abs(h[n] - (-1j)**n*t[n])/(1 + abs(t[n])) for n in range(r)))
            if f(np.linspace(0, 2*np.pi, 1441)).min() >= 0.01: defects.append(sq_defect(co)[0]); gaps.append(roots_gap(co)[1])
        res = dict(maxCoefficientOutsideStatedExponents=w['outside'], nWithMinD_ge_0p01=len(defects), minSquareDefect=float(min(defects)), minRelativeRootGap=float(min(gaps)))
        if s_ >= 3: res['max_h_k_off_multiples_of_s_below_r'] = w['sparse']
        else:
            res['max_e1_e2_er_formula_error'] = w['e']; res['max_h_vs_recurrence'] = w['h']
            # supremum of the left side of (P2) on the curve (P1), against 2 r (r+1)
            b2 = np.concatenate([np.linspace(0, 5, 200001), np.logspace(np.log10(5), 6, 20001)]); A_ = 0.25*(r - 4)*(1 + 5*b2); B_ = (2*r - 5)*b2; k2 = (-B_ + np.sqrt(B_**2 + 4*A_*(r - 1)))/(2*A_)
            lhs = (1 + b2)*k2*((2*r - 3) + (r - 3)*k2); res['P2_left_side_sup_on_P1'] = float(lhs.max()); res['P2_sup_at_beta2'] = float(b2[lhs.argmax()]); res['P2_required_excess_over'] = 2*r*(r + 1)
        out['%d:%d' % (r, s_)] = res
    return out

# ---------- falsifier attempt: equal radii about arbitrary axes (sub-class (a) of Theorem 16.9) ----------
def falseq(nstart=30, seed=81):
    from scipy.optimize import least_squares
    rng = np.random.default_rng(seed); nT = 24
    def members(p, hs):
        th, ph, phi, c, v = p[0:6], p[6:12], p[12:18], p[18], p[19]; a = np.sqrt(1 - c*c); mem = []; ns = []
        for k in range(6):
            n = np.array([np.sin(th[k])*np.cos(ph[k]), np.sin(th[k])*np.sin(ph[k]), np.cos(th[k])]); u = np.array([-np.sin(ph[k]), np.cos(ph[k]), 0.0])
            mem.append((hs[k]*c*n, u, np.cross(n, u), a, v/a, phi[k])); ns.append(n)
        return mem, np.array(ns), a, v
    def run(p0, hs, q):
        def f(p):
            mem, ns, a, v = members(p, hs); T = np.arange(nT)*2*np.pi*a/v/nT; return (resid(T, mem, q)[0]/v**2).ravel()
        lo = np.full(20, -np.inf); hi = np.full(20, np.inf); lo[18], hi[18] = 0.0, 0.95; lo[19], hi[19] = 0.2, 3.0
        o = least_squares(f, p0, bounds=(lo, hi), xtol=1e-14, ftol=1e-14, gtol=1e-14, max_nfev=250)
        mem, ns, a, v = members(o.x, hs); T = np.arange(96)*2*np.pi*a/v/96; G, D = resid(T, mem, q)
        return dict(sup=float(np.sqrt((G**2).sum(-1)).max()/v**2), rms=float(np.sqrt(np.mean(o.fun**2))), axisSpread=float((1 - ns @ ns.T).max()/2), c=float(o.x[18]), v=float(v), minSep=float(np.sqrt(D[:, ~np.eye(6, dtype=bool)].min())))
    out = dict(test='ext-falseq', utc=utc(), nstart=nstart, seed=seed, note='six members, one common radius a = sqrt(1-c^2), heights +-c, arbitrary axes, positive rates v/a; residual in units of v^2/R')
    # reach known case: alternating hexagon on the latitude circle c = 0.3 about a tilted axis
    c0 = 0.3; a0 = np.sqrt(1 - c0*c0); v0 = np.sqrt((1.25 - 1/np.sqrt(3))/a0); qh = np.array([1, -1, 1, -1, 1, -1.0]); hs1 = np.ones(6)
    p_exact = np.concatenate([np.full(6, 0.7), np.full(6, 1.1), np.arange(6)*np.pi/3, [c0, v0]])
    mem, ns, a, v = members(p_exact, hs1); out['knownCase_hexagonOnLatitudeExact'] = float(abs(resid(np.linspace(0, 5, 9), mem, qh)[0]).max()/v0**2)
    out['knownCase_reach'] = []
    for k in range(4):
        r = run(p_exact + np.concatenate([rng.normal(0, 0.02, 18), rng.normal(0, 0.01, 2)]), hs1, qh); out['knownCase_reach'].append(dict(sup=r['sup'], axisSpread=r['axisSpread'], c=r['c'], v=r['v']))
    rows = []; t0 = time.time()
    for s_ in range(nstart):
        q = rng.permutation([1, 1, 1, -1, -1, -1.0]); hs = rng.choice([-1.0, 1.0], 6)
        p0 = np.concatenate([np.arccos(rng.uniform(-1, 1, 6)), rng.uniform(0, 2*np.pi, 12), [rng.uniform(0, 0.9), rng.uniform(0.3, 2.5)]])
        try: r = run(p0, hs, q)
        except Exception as e: rows.append(dict(start=s_, error=str(e))); continue
        r.update(start=s_, heightSigns=hs.tolist(), q=q.tolist()); rows.append(r)
    ok = [r for r in rows if 'error' not in r]; rig = [r for r in ok if r['axisSpread'] < 1e-9]; non = [r for r in ok if r['axisSpread'] >= 1e-9]
    out.update(seconds=time.time() - t0, nOk=len(ok), nRigidEndStates=len(rig), nRigidBelow1em8=sum(r['sup'] < 1e-8 for r in rig), nNonRigid=len(non),
               nonRigidFloorSup=min([r['sup'] for r in non], default=None), nonRigidFloorRms=min([r['rms'] for r in non], default=None), nNonRigidBelow1em4=sum(r['sup'] < 1e-4 for r in non),
               bestNonRigid=min(non, key=lambda r: r['sup']) if non else None, rows=rows)
    return out

# ---------- loop mechanics of Lemmas 16.2/16.3 for unequal rates ----------
def terms_u(T, i, mem, q):
    X, V, Acc = kin(T, mem); js = [j for j in range(len(mem)) if j != i]
    dx = X[:, i, None] - X[:, js]; dv = V[:, i, None] - V[:, js]; da = Acc[:, i, None] - Acc[:, js]
    D = (dx*dx).sum(-1); Dd = 2*(dx*dv).sum(-1); Ddd = 2*(dv*dv).sum(-1) + 2*(dx*da).sum(-1)
    E = (q[i]*q[js])[None, :, None]*((1 + Ddd/2)*D - 3*Dd**2/8)[..., None]*dx
    return D, Dd, E, -Acc[:, i]
def track_u(path, i, mem, q, s0=None):
    D, Dd, E, lin = terms_u(path, i, mem, q); r = np.sqrt(D.astype(complex))
    keep = np.where(abs(r[1:] - r[:-1]) <= abs(r[1:] + r[:-1]), 1.0, -1.0)
    first = np.ones(r.shape[1]) if s0 is None else np.where(abs(r[0] - s0) <= abs(r[0] + s0), 1.0, -1.0)
    sroot = np.concatenate([first[None], keep], 0).cumprod(0)*r; terms = E/sroot[..., None]**5
    return sroot, terms, terms.sum(1) + lin, D
def loopu(nconf=30, seed=91):
    rng = np.random.default_rng(seed); rows = []
    while len(rows) < nconf:
        q = rng.permutation([1, 1, 1, -1, -1, -1.0]); mem = []
        for k in range(6):
            c = rng.uniform(-0.9, 0.9); a = np.sqrt(1 - c*c); mem.append(latitude_member(unit(rng.normal(size=3)), c, a, rng.choice([-1, 1])/a, rng.uniform(0, 2*np.pi)))
        i = int(rng.integers(6)); k = int(rng.integers(5))
        T = np.array([rng.uniform(0, 20) + 1j*rng.uniform(0.05, 1.5)*rng.choice([-1, 1])])
        for it in range(80):
            D, Dd, E, lin = terms_u(T, i, mem, q); st = D[0, k]/Dd[0, k]; st = st/max(1, abs(st)/0.3); T = T - st
        D, Dd, E, lin = terms_u(T, i, mem, q)
        if abs(D[0, k]) > 1e-12 or abs(T[0].imag) < 0.02 or abs(T[0].imag) > 3 or abs(Dd[0, k]) < 0.05: continue
        Ts = T[0]; r = 2e-3
        loop = Ts + r*np.exp(1j*np.linspace(0, 2*np.pi, 6001))
        vert = Ts.real + r + 1j*np.linspace(0, Ts.imag, 6000)
        s1, _, _, Dv = track_u(vert, i, mem, q)
        if abs(Dv).min() < 1e-4: continue                         # path passes too close to some zero; redraw
        s2, terms, Ftot, Dl = track_u(loop, i, mem, q, s0=s1[-1])
        wind = np.rint(np.unwrap(np.angle(Dl), axis=0)[-1]/(2*np.pi) - np.unwrap(np.angle(Dl), axis=0)[0]/(2*np.pi)).astype(int)
        ratio = s2[-1]/s2[0]; pred = (-1.0)**wind
        flipped = [kk for kk in range(5) if wind[kk] % 2 != 0]
        jump = (Ftot[0] - Ftot[-1])/2; flipsum = terms[0][flipped].sum(0)
        rad = Ts + r*np.logspace(0, np.log10(1e-6/r), 300); s3, t3, F3, _ = track_u(rad, i, mem, q, s0=s2[0]); rr = abs(rad - Ts)
        slope = np.polyfit(np.log(rr[rr < 1e-4]), np.log(np.linalg.norm(F3, axis=1)[rr < 1e-4]), 1)[0]
        rows.append(dict(windingOfTargetPair=int(wind[k]), otherWindings=[int(wind[kk]) for kk in range(5) if kk != k], monodromyMatchesWinding=bool(np.allclose(ratio, pred, atol=1e-6)),
                         halfJumpRel=float(np.linalg.norm(jump - flipsum)/np.linalg.norm(flipsum)), growthExponent=float(slope), absImT=float(abs(Ts.imag)),
                         ratesOfPair=[float(mem[i][4]), float(mem[[j for j in range(6) if j != i][k]][4])]))
    return dict(test='ext-loopu', utc=utc(), nconf=nconf, targetPairWindingOne=sum(r['windingOfTargetPair'] == 1 for r in rows), othersWindingZero=sum(all(w == 0 for w in r['otherWindings']) for r in rows),
                monodromyMatchesWinding=sum(r['monodromyMatchesWinding'] for r in rows), maxHalfJumpRel=max(r['halfJumpRel'] for r in rows),
                growthExponentRange=[min(r['growthExponent'] for r in rows), max(r['growthExponent'] for r in rows)], rows=rows)
def s166a(seed=95):
    rng = np.random.default_rng(seed); out = dict(test='ext-s166a', utc=utc(), note='odd-sum ratios: squareness defect of zeta^(r+s) D as a polynomial, random pairs')
    for (r, s_) in ((2, 1), (3, 2), (4, 1), (4, 3), (5, 2)):
        rec = []
        for _ in range(400):
            mem, g = pair_rs(rng, r, s_); f = lambda t: ((kin(t, mem)[0][:, 0] - kin(t, mem)[0][:, 1])**2).sum(-1)
            co, extra = laurent(f, r + s_, 2*np.pi); rec.append((sq_defect(co)[0], f(np.linspace(0, 2*np.pi, 1441)).min()))
        A = np.array(rec); ok = A[:, 1] >= 0.01
        out['%d:%d' % (r, s_)] = dict(n=int(ok.sum()), minDefect_minD_ge_0p01=float(A[ok, 0].min()), minDefect_all=float(A[:, 0].min()), minD_at_minDefect=float(A[A[:, 0].argmin(), 1]))
    return out

if __name__ == '__main__':
    cmd = sys.argv[1]; a = sys.argv[2:]
    if cmd == 'k1py': out = k1py()
    elif cmd == 'mirror': out = mirror()
    elif cmd == 'search': out = search()
    elif cmd == 's17': out = s17()
    elif cmd == 'ratio31': out = ratio31()
    elif cmd == 'loopu': out = loopu()
    elif cmd == 's166a': out = s166a()
    elif cmd == 's18': out = s18()
    elif cmd == 'ratio31grid': out = ratio31grid()
    elif cmd == 'falseq': out = falseq(int(a[0]), int(a[1])); cmd = 'falseq-%s' % a[1]
    elif cmd == 'fals': out = fals(a[0], int(a[1]), int(a[2])); cmd = 'fals-%s-%s' % (a[0], a[2])
    json.dump(out, open(os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-%s.json' % cmd), 'w'), indent=1, default=lambda o: o.tolist() if hasattr(o, 'tolist') else float(o))
    print(json.dumps({k: v for k, v in out.items() if k != 'rows'}, indent=1, default=lambda o: o.tolist() if hasattr(o, 'tolist') else float(o)))
