# weber-binding-sphere-gc-review-tests.py
# Reviewer's numerical tests for the great-circle closure review, 2026-10-06 (K = c_f = 1).
# Written from the mathematics of the law and of the class; does not read the author's
# gc scripts or receipts.  Run with the shared venv:
#   ../.venv/bin/python <this file> k1py|t1|t3|t4|t5|t6|t2 [args]
# Known-case order: `k1py` (anchor of this evaluator to the frozen library through the
# Node receipt weber-binding-sphere-gc-review-k1.json, plus the alternating hexagon) must
# pass before any other subcommand is read as evidence.
import sys, json, os, time, datetime
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
def utc(): return datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')

# ---------- kinematics (valid for complex T) ----------
def basis_from_angles(th, ph):
    m = np.stack([np.sin(th)*np.cos(ph), np.sin(th)*np.sin(ph), np.cos(th)], -1)
    u = np.stack([-np.sin(ph), np.cos(ph), 0*ph], -1)
    up = np.cross(m, u)
    return m, u, up
def basis_from_normal(m):
    m = np.asarray(m, float); ref = np.array([0, 0, 1.0]) if abs(m[2]) < 0.9 else np.array([1.0, 0, 0])
    u = np.cross(ref, m); u /= np.linalg.norm(u); return u, np.cross(m, u)
def positions(T, u, up, phi, R, Om):
    # T: array (nT,), possibly complex.  returns X, V with shape (nT, N, 3)
    ang = Om*np.asarray(T)[:, None] + phi[None, :]
    c, s = np.cos(ang)[..., None], np.sin(ang)[..., None]
    return R*(c*u[None] + s*up[None]), R*Om*(-s*u[None] + c*up[None])
def pair_scalars(X, V, Om):
    dx = X[:, :, None, :] - X[:, None, :, :]; dv = V[:, :, None, :] - V[:, None, :, :]
    D = (dx*dx).sum(-1); Dd = 2*(dx*dv).sum(-1); Ddd = 2*(dv*dv).sum(-1) - 2*Om*Om*D
    return dx, D, Dd, Ddd
def closed_residual_real(T, u, up, phi, q, R, Om):
    X, V = positions(T, u, up, phi, R, Om)
    dx, D, Dd, Ddd = pair_scalars(X, V, Om)
    N = len(q); eye = np.eye(N, dtype=bool)
    D = np.where(eye[None], 1.0, D)
    w = (q[:, None]*q[None, :])[None]*D**-2.5*((1 + Ddd/2)*D - 3*Dd**2/8)
    w = np.where(eye[None], 0.0, w)
    return (w[..., None]*dx).sum(2) + Om*Om*X, D
def bvec(u, up, phi): return np.exp(1j*phi)[:, None]*(u - 1j*up)
def pair_constants(bi, bj):
    g = (bi*bj).sum(); A = abs(g)/2; al = np.angle(g); C = 0.5*((bi*np.conj(bj)).sum()).real
    return A, al, C
def pair_constants_fit(ui, upi, phii, uj, upj, phij, R, Om, K=16):
    # independent of the b formalism: discrete Fourier analysis of X_i.X_j over one period
    T = np.arange(K)*2*np.pi/Om/K
    X, _ = positions(T, np.stack([ui, uj]), np.stack([upi, upj]), np.array([phii, phij]), R, Om)
    g = (X[:, 0]*X[:, 1]).sum(-1)/R**2
    coef = np.array([(g*np.exp(-1j*k*Om*T)).mean() for k in range(K//2)])
    other = max(abs(coef[k]) for k in range(1, K//2) if k != 2)
    return 2*abs(coef[2]), np.angle(coef[2]), coef[0].real, other

def random_members(rng, N=6):
    m = rng.normal(size=(N, 3)); m /= np.linalg.norm(m, axis=1)[:, None]
    B = [basis_from_normal(x) for x in m]
    return m, np.array([b[0] for b in B]), np.array([b[1] for b in B]), rng.uniform(0, 2*np.pi, N)

# ---------- k1py ----------
def k1py():
    rec = json.load(open(os.path.join(HERE, 'weber-binding-sphere-gc-review-k1.json')))
    worst = 0.0
    for c in rec['cases']:
        u = np.array([x['u'] for x in c['mem']]); up = np.array([x['up'] for x in c['mem']]); phi = np.array([x['phi'] for x in c['mem']])
        F, _ = closed_residual_real(np.array([c['T']]), u, up, phi, np.array(c['q'], float), c['R'], c['Omega'])
        Fn = np.array(c['F']); worst = max(worst, abs(F[0] - Fn).max()/abs(Fn).max())
    R = 0.8; Om = np.sqrt((1.25 - 1/np.sqrt(3))/R**3); q = np.array([1, -1, 1, -1, 1, -1.0])
    uu, uup = basis_from_normal([0.2, 0.6, -0.4]/np.linalg.norm([0.2, 0.6, -0.4]))
    u = np.tile(uu, (6, 1)); up = np.tile(uup, (6, 1)); phi = np.arange(6)*np.pi/3 + 1.1
    T = np.linspace(0, 2*np.pi/Om, 24, endpoint=False)
    Fh, _ = closed_residual_real(T, u, up, phi, q, R, Om)
    Fd, _ = closed_residual_real(T, u, up, phi + np.array([0, 0.05, 0, 0, 0, 0]), q, R, Om)
    out = dict(test='k1py', utc=utc(), worstRelDiffVsNodeClosedResidual=worst, hexagonNormalized=abs(Fh).max()/(Om*Om*R), hexagonPerturbedNormalized=abs(Fd).max()/(Om*Om*R))
    out['pass'] = bool(worst < 1e-12 and out['hexagonNormalized'] < 1e-12 and out['hexagonPerturbedNormalized'] > 1e-3)
    return out

# ---------- t1: loop about a complex collision time ----------
def member_terms(T, i, u, up, phi, q, R, Om):
    # T: array of (complex) times.  Returns partner list, D[t,j], E[t,j,:] (entire numerator) and Omega^2 X_i[t,:].
    T = np.atleast_1d(T)
    X, V = positions(T, u, up, phi, R, Om); js = [j for j in range(len(q)) if j != i]
    dx = X[:, i, None, :] - X[:, js, :]; dv = V[:, i, None, :] - V[:, js, :]
    D = (dx*dx).sum(-1); Dd = 2*(dx*dv).sum(-1); Ddd = 2*(dv*dv).sum(-1) - 2*Om*Om*D
    E = (q[i]*q[js])[None, :, None]*((1 + Ddd/2)*D - 3*Dd**2/8)[..., None]*dx
    return js, D, E, Om*Om*X[:, i]
def track(path, i, u, up, phi, q, R, Om, s0=None):
    # continue every root sqrt(D_ij) along the path by continuity (vectorised sign bookkeeping).
    # returns list-like records (T, s[j], F_i, terms[j,:]) for each path point.
    js, D, E, lin = member_terms(path, i, u, up, phi, q, R, Om)
    r = np.sqrt(D.astype(complex))
    keep = np.where(abs(r[1:] - r[:-1]) <= abs(r[1:] + r[:-1]), 1.0, -1.0)
    first = np.ones(r.shape[1]) if s0 is None else np.where(abs(r[0] - s0) <= abs(r[0] + s0), 1.0, -1.0)
    sgn = np.concatenate([first[None], keep], 0).cumprod(0)
    s = sgn*r; terms = E/s[..., None]**5; Ftot = terms.sum(1) + lin
    return [(path[t], s[t], Ftot[t], terms[t]) for t in range(len(path))]
def t1(nconf=30, seed=11):
    rng = np.random.default_rng(seed); rows = []
    while len(rows) < nconf:
        m, u, up, phi = random_members(rng); q = rng.permutation([1, 1, 1, -1, -1, -1.0]); R = 1.0; Om = rng.uniform(0.2, 3)
        b = bvec(u, up, phi); i = int(rng.integers(6)); js = [j for j in range(6) if j != i]
        pc = [pair_constants(b[i], b[j]) for j in js]; kap = [(1 - C)/A for A, al, C in pc]
        if min(kap) < 1.02 or min(A for A, _, _ in pc) < 0.02: continue
        k = int(rng.integers(5)); A, al, C = pc[k]; sgn = rng.choice([1, -1])
        Ts = (-al + 1j*sgn*np.arccosh(kap[k]))/(2*Om)
        # all branch points of member i's partners near Ts
        others = []
        for kk, (A2, al2, C2) in enumerate(pc):
            for n in range(-3, 4):
                for sg in (1, -1):
                    t = (-al2 + 2*np.pi*n + 1j*sg*np.arccosh(kap[kk]))/(2*Om)
                    if abs(t - Ts) > 1e-12: others.append(t)
        dmin = min(abs(np.array(others) - Ts)); r = min(0.25*dmin, 0.05)
        # path: real axis -> vertical -> T* + r ; then loop ; steps small against distance to B
        start = Ts.real + r
        vert = start + 1j*np.linspace(0, Ts.imag, 3000)
        clearance = min(abs(vert[:, None] - np.array(others + [Ts])[None, :]).min(axis=1))
        h1 = track(vert, i, u, up, phi, q, R, Om, s0=None)   # starts on real axis with positive roots
        assert np.all(h1[0][1].real > 0) and np.all(abs(h1[0][1].imag) < 1e-12)
        loop = Ts + r*np.exp(1j*np.linspace(0, 2*np.pi, 4001))
        h2 = track(loop, i, u, up, phi, q, R, Om, s0=h1[-1][1])
        ratio = h2[-1][1]/h2[0][1]
        Fb, Fa = h2[0][2], h2[-1][2]; pairterm = h2[0][3][k]
        loopdefect = np.linalg.norm((Fb - Fa)/2 - pairterm)/np.linalg.norm(pairterm)
        otherReturn = max(np.linalg.norm(h2[-1][3][kk] - h2[0][3][kk])/np.linalg.norm(h2[0][3][kk]) for kk in range(5) if kk != k)
        # growth: radial approach, tracked from the loop start
        rad = Ts + r*np.logspace(0, np.log10(1e-6/r), 400)
        h3 = track(rad, i, u, up, phi, q, R, Om, s0=h2[0][1])
        rr = abs(rad - Ts); Fn = np.array([np.linalg.norm(h[2]) for h in h3])
        sel = rr < 1e-4; slope = np.polyfit(np.log(rr[sel]), np.log(Fn[sel]), 1)[0]
        # leading coefficient: s^5 F -> E(T*) = 6 sigma Om^2 R^4 A^2 (kappa^2-1) N (reviewer re-derivation)
        _, DvS, ES, _ = member_terms(Ts, i, u, up, phi, q, R, Om); DvS, ES = DvS[0], ES[0]
        lead = np.linalg.norm(h3[-1][1][k]**5*h3[-1][2] - ES[k])/np.linalg.norm(ES[k])
        XS, _ = positions(np.array([Ts]), u, up, phi, R, Om); Nc = XS[0, i] - XS[0, js[k]]
        Epred = 6*q[i]*q[js[k]]*Om**2*R**4*A**2*(kap[k]**2 - 1)*Nc
        rows.append(dict(i=i, partner=js[k], kappa=kap[k], Omega=Om, loopRadius=r, pathClearance=clearance, absD_at_Tstar=abs(DvS[k]),
                         pairRootRatio=[ratio[k].real, ratio[k].imag], otherRootRatioMaxDevFrom1=float(max(abs(ratio[kk] - 1) for kk in range(5) if kk != k)),
                         halfJumpEqualsPairTermRel=loopdefect, otherTermsReturnRel=otherReturn, growthExponent=slope,
                         leadCoefficientRel=lead, E_formula_5_3_rel=float(np.linalg.norm(ES[k] - Epred)/np.linalg.norm(ES[k]))))
    S = lambda key: [x[key] for x in rows]
    out = dict(test='t1', utc=utc(), nconf=nconf, seed=seed,
               pairRootFlipped=int(sum(abs(x['pairRootRatio'][0] + 1) < 1e-6 and abs(x['pairRootRatio'][1]) < 1e-6 for x in rows)),
               othersReturned=int(sum(x['otherRootRatioMaxDevFrom1'] < 1e-6 for x in rows)),
               maxHalfJumpDefect=max(S('halfJumpEqualsPairTermRel')), maxOtherTermsReturnRel=max(S('otherTermsReturnRel')),
               growthExponentMin=min(S('growthExponent')), growthExponentMax=max(S('growthExponent')),
               maxLeadCoefficientRel=max(S('leadCoefficientRel')), maxE53Rel=max(S('E_formula_5_3_rel')), maxAbsD=max(S('absD_at_Tstar')),
               minPathClearance=min(S('pathClearance')), rows=rows)
    return out

# ---------- t3: Lemma 8.2 / 4.2 ----------
def t3(n=200, seed=5):
    rng = np.random.default_rng(seed); worst = dict(alpha=0, A=0, single=0, Aform=0, antiC=0, bform=0); mindelta = 9
    for _ in range(n):
        m, u, up, phi = random_members(rng, 2); R = rng.uniform(0.5, 2); Om = rng.uniform(0.2, 3)
        delta = rng.uniform(0.05, 2*np.pi - 0.05)
        A1, a1, C1, o1 = pair_constants_fit(u[0], up[0], phi[0], u[1], up[1], phi[1], R, Om)
        # j' on j's oriented circle, leading j by delta: same basis, phase + delta
        A2, a2, C2, o2 = pair_constants_fit(u[0], up[0], phi[0], u[1], up[1], phi[1] + delta, R, Om)
        d = np.angle(np.exp(1j*(a2 - a1 - delta)))
        worst['alpha'] = max(worst['alpha'], abs(d)); worst['A'] = max(worst['A'], abs(A2 - A1)); worst['single'] = max(worst['single'], o1, o2)
        worst['Aform'] = max(worst['Aform'], abs(A1 - 0.5*(1 - m[0] @ m[1])))
        b = bvec(u, up, phi); Ab, ab, Cb = pair_constants(b[0], b[1])
        worst['bform'] = max(worst['bform'], abs(Ab - A1), abs(np.angle(np.exp(1j*(ab - a1)))), abs(Cb - C1))
        A3, a3, C3, _ = pair_constants_fit(u[0], up[0], phi[0], u[1], up[1], phi[1] + np.pi, R, Om)
        worst['antiC'] = max(worst['antiC'], abs(C3 + C1), abs(np.angle(np.exp(1j*(a3 - a1 - np.pi)))))
        mindelta = min(mindelta, abs(np.angle(np.exp(1j*delta))))
    # opposite sense on one geometric circle: kappa = 1 and a real collision
    m, u, up, phi = random_members(rng, 1); A, a, C, _ = pair_constants_fit(u[0], up[0], phi[0], u[0], -up[0], 0.7, 1.0, 1.3)
    T = np.linspace(0, 2*np.pi/1.3, 200001); X, _ = positions(T, np.stack([u[0], u[0]]), np.stack([up[0], -up[0]]), np.array([phi[0], 0.7]), 1.0, 1.3)
    dmin = np.sqrt(((X[:, 0] - X[:, 1])**2).sum(-1)).min()
    return dict(test='t3', utc=utc(), n=n, maxAlphaShiftMinusDelta=worst['alpha'], maxAdiff=worst['A'], maxOtherHarmonic=worst['single'],
                maxA_vs_half_1_minus_mm=worst['Aform'], max_b_formalism_vs_fit=worst['bform'], antipodeDefect=worst['antiC'], minAbsDelta=mindelta,
                oppositeSense=dict(A=A, C=C, kappa=(1 - C)/A, minSeparationSampled=dmin))

# ---------- explicit coincidence family (reviewer's derivation) ----------
# Member i: u=(1,0,0), u'=(0,1,0), phi=0 (b_i = (1,-i,0)).  Partner with normal angles (beta,gamma),
# basis from basis_from_angles, phase phi:  A=(1-cos beta)/2, alpha=phi-gamma-pi/2,
# C=-(1+cos beta) sin(phi+gamma)/2.  Coincidence with (alpha,kappa): sin(phi+gamma)=S(beta)=(kappa(1-cos beta)-2)/(1+cos beta).
def family_partner(alpha, kappa, beta, branch):
    S = (kappa*(1 - np.cos(beta)) - 2)/(1 + np.cos(beta))
    if abs(S) > 1: return None
    sm = np.arcsin(S) if branch == 0 else np.pi - np.arcsin(S)
    df = alpha + np.pi/2
    phi, gam = (sm + df)/2, (sm - df)/2
    m, u, up = basis_from_angles(np.array(beta), np.array(gam))
    return m, u, up, phi
def beta_range(kappa): return np.arccos(np.clip((kappa - 3)/(kappa + 1), -1, 1))   # beta in (0, this]

def t4(n=200, seed=7):
    rng = np.random.default_rng(seed); ui, upi = np.array([1.0, 0, 0]), np.array([0, 1.0, 0]); R, Om = 1.0, 1.0
    w = dict(fitAlpha=0, fitKappa=0, propSame=0, propKappaOnly=9, Aratio_min=9, Aratio_max=0, sharedZero=0, notShared=9)
    T = np.concatenate([rng.uniform(0, 7, 40), rng.uniform(0, 7, 40) + 1j*rng.uniform(-1, 1, 40)])
    cnt = 0
    while cnt < n:
        kappa = 1 + rng.exponential(1.0) + 0.02; alpha = rng.uniform(-np.pi, np.pi); bm = beta_range(kappa)
        P = [family_partner(alpha, kappa, rng.uniform(0.05, 1)*bm, int(rng.integers(2))) for _ in range(2)]
        if any(p is None for p in P): continue
        cnt += 1; res = []
        for (m, u, up, phi) in P:
            A, a, C, _ = pair_constants_fit(ui, upi, 0.0, u, up, phi, R, Om)
            w['fitAlpha'] = max(w['fitAlpha'], abs(np.angle(np.exp(1j*(a - alpha))))); w['fitKappa'] = max(w['fitKappa'], abs((1 - C)/A - kappa)/kappa)
            X, _ = positions(T, np.stack([ui, u]), np.stack([upi, up]), np.array([0.0, phi]), R, Om)
            res.append((A, ((X[:, 0] - X[:, 1])**2).sum(-1)))
        ratio = res[1][1]/res[0][1]; w['propSame'] = max(w['propSame'], abs(ratio - res[1][0]/res[0][0]).max()/abs(res[1][0]/res[0][0]))
        w['Aratio_min'] = min(w['Aratio_min'], res[1][0]/res[0][0]); w['Aratio_max'] = max(w['Aratio_max'], res[1][0]/res[0][0])
        Ts = (-alpha + 1j*np.arccosh(kappa))/(2*Om)
        for (m, u, up, phi) in P:
            X, _ = positions(np.array([Ts]), np.stack([ui, u]), np.stack([upi, up]), np.array([0.0, phi]), R, Om)
            w['sharedZero'] = max(w['sharedZero'], abs(((X[0, 0] - X[0, 1])**2).sum()))
        # equal kappa only: second partner built with alpha shifted
        da = rng.uniform(0.3, 2*np.pi - 0.3); p2 = family_partner(alpha + da, kappa, rng.uniform(0.05, 1)*bm, int(rng.integers(2)))
        A2, a2, C2, _ = pair_constants_fit(ui, upi, 0.0, p2[1], p2[2], p2[3], R, Om)
        assert abs((1 - C2)/A2 - kappa) < 1e-9*kappa
        X, _ = positions(T, np.stack([ui, p2[1]]), np.stack([upi, p2[2]]), np.array([0.0, p2[3]]), R, Om)
        r2 = ((X[:, 0] - X[:, 1])**2).sum(-1)/res[0][1]
        w['propKappaOnly'] = min(w['propKappaOnly'], (abs(r2 - r2.mean()).max()/abs(r2.mean())))
        X, _ = positions(np.array([Ts]), np.stack([ui, p2[1]]), np.stack([upi, p2[2]]), np.array([0.0, p2[3]]), R, Om)
        w['notShared'] = min(w['notShared'], abs(((X[0, 0] - X[0, 1])**2).sum())/(2*A2))
    return dict(test='t4', utc=utc(), n=n, familyAlphaError=w['fitAlpha'], familyKappaRelError=w['fitKappa'],
                maxProportionalityDefect_equalAlphaKappa=w['propSame'], A_ratio_range=[w['Aratio_min'], w['Aratio_max']],
                maxAbsD_bothPartners_at_common_Tstar=w['sharedZero'],
                minProportionalityDefect_equalKappaOnly=w['propKappaOnly'], min_absD_over_2A_at_other_Tstar_equalKappaOnly=w['notShared'])

# ---------- t5: can a class of k coincident partners satisfy identities (I) and (II)? ----------
def class_matrix(alpha, kappa, betas, branches):
    bi = np.array([1, -1j, 0]); cols = []; bs = []; As = []
    for be, br in zip(betas, branches):
        p = family_partner(alpha, kappa, be, br)
        if p is None: return None
        m, u, up, phi = p; bj = np.exp(1j*phi)*(u - 1j*up); A = (1 - np.cos(be))/2
        c1 = A**-0.5*(bi - bj); c2 = A**-1.5*(bi - bj)
        col = np.concatenate([c1.real, c1.imag, c2.real, c2.imag]); cols.append(col); bs.append(bj); As.append(A)
    Mx = np.stack(cols, 1)
    # collision measure: least closest approach among partner pairs and member-partner pairs, in units of R
    mins = [np.sqrt(2*A*(kappa - 1)) for A in As]
    for a in range(len(bs)):
        for b in range(a + 1, len(bs)):
            g = (bs[a]*bs[b]).sum(); Aab = abs(g)/2; Cab = 0.5*((bs[a]*np.conj(bs[b])).sum()).real
            mins.append(np.sqrt(max(2*(1 - Cab - Aab), 0)))
    return Mx, min(mins), As
def t5(seed=3, nsamp=8000):
    from scipy.optimize import minimize
    rng = np.random.default_rng(seed); out = dict(test='t5', utc=utc())
    # known case for the instrument: the mirror image pair (j and its reflection in i's plane) with opposite sigma
    # has identical A and D; (I),(II) reduce to X_j - X_j' whose defect must equal the chord between the two partners.
    r0 = class_matrix(0.0, 1.7, [0.9, 0.9], [1, 1]); M0 = r0[0]/np.linalg.norm(r0[0], axis=0)[None]
    r1 = class_matrix(0.0, 1.7, [0.9, 0.6], [1, 0]); M1 = r1[0]/np.linalg.norm(r1[0], axis=0)[None]
    out['knownCase_duplicatePartner'] = dict(sigmaMin=float(np.linalg.svd(M0)[1][-1]), minSeparation=float(r0[1]))   # must be 0, 0
    out['knownCase_twoDistinctPartners'] = dict(sigmaMin=float(np.linalg.svd(M1)[1][-1]), minSeparation=float(r1[1]))  # Lemma 8.1: must be > 0
    for k in (3, 4):
        best = []; stats = []
        def f(x, branches, full=False):
            kappa = 1 + np.exp(x[0]); bm = beta_range(kappa); betas = bm/(1 + np.exp(-x[1:]))
            r = class_matrix(0.0, kappa, betas, branches)
            if r is None: return (9, 0, None) if full else 9.0
            Mx, minsep, As = r
            if min(As) < 1e-8 or not np.all(np.isfinite(Mx)): return (9, 0, None) if full else 9.0
            Mn = Mx/np.linalg.norm(Mx, axis=0)[None]
            U, s, Vt = np.linalg.svd(Mn); null = Vt[-1]
            # require a null vector with every polarity product non-zero: weight by smallest component
            return (s[-1], minsep, null) if full else s[-1]
        for _ in range(nsamp):
            x = np.concatenate([[rng.normal(0, 1.5)], rng.normal(0, 2, k)]); br = tuple(int(b) for b in rng.integers(2, size=k))
            s, minsep, null = f(x, br, True)
            if null is None: continue
            stats.append((s, minsep, x, br))
        stats.sort(key=lambda t: t[0])
        sig = np.array([t[0] for t in stats]); sep = np.array([t[1] for t in stats])
        res = dict(k=k, nsamp=len(stats), minSigma_all=float(sig.min()),
                   minSigma_with_minsep_gt_0p3=float(sig[sep > 0.3].min()), minSigma_with_minsep_gt_0p1=float(sig[sep > 0.1].min()),
                   min_sigma_over_minsep=float((sig/np.maximum(sep, 1e-300)).min()),
                   minSigma_with_minsep_gt_0p3_kappa_lt_20=float(min(t[0] for t in stats if t[1] > 0.3 and t[2][0] < np.log(19.0))))
        # local refinement of sigma_min from the 40 best samples, and of sigma_min with a separation floor
        refined = []
        for s0, sep0, x0, br in stats[:20]:
            o = minimize(lambda x: f(x, br), x0, method='Nelder-Mead', options=dict(xatol=1e-10, fatol=1e-14, maxiter=4000))
            s, minsep, null = f(o.x, br, True); refined.append((float(s), float(minsep), [float(v) for v in null], br, [float(v) for v in o.x]))
        refined.sort(key=lambda t: t[0])
        res['refined_unconstrained_top5'] = [dict(sigmaMin=r[0], minSeparation=r[1], nullVector=r[2], branches=r[3]) for r in refined[:5]]
        pen = []
        cand = [t for t in stats if t[1] > 0.3 and t[2][0] < np.log(19.0)][:20]
        for s0, sep0, x0, br in cand:
            def g(x):
                s, minsep, null = f(x, br, True)
                if null is None: return 9.0
                # kappa is capped at 20: without the cap the search escapes to kappa -> infinity (all A -> 0), the planar limit
                return s + 10*max(0.3 - minsep, 0)**2 + 10*max(0.05 - abs(null).min(), 0)**2 + 10*max(x[0] - np.log(19.0), 0)**2
            o = minimize(g, x0, method='Nelder-Mead', options=dict(xatol=1e-10, fatol=1e-14, maxiter=6000))
            s, minsep, null = f(o.x, br, True); pen.append((float(s), float(minsep), [float(v) for v in null], br, float(1 + np.exp(o.x[0]))))
        pen.sort(key=lambda t: t[0])
        res['refined_with_separation_floor_0p3_kappa_cap_20_top5'] = [dict(sigmaMin=r[0], minSeparation=r[1], nullVector=r[2], branches=r[3], kappa=r[4]) for r in pen[:5]]
        out['class_of_%d' % k] = res
    return out

# ---------- t2: least-squares falsifier attempt ----------
def t2(mode='full', nstart=150, seed=1, pol=None):
    from scipy.optimize import least_squares
    rng = np.random.default_rng(seed); R = 1.0; nT = 24
    def unpack(p):
        if mode == 'full':
            th, ph, phi, Om = p[0:6], p[6:12], p[12:18], p[18]
        elif mode == '222':       # three oriented circles, two members each, free phase gaps
            th, ph = np.repeat(p[0:3], 2), np.repeat(p[3:6], 2); phi = np.stack([p[6:9], p[6:9] + p[9:12]], 1).ravel(); Om = p[12]
        elif mode == '222anti':   # three oriented circles, each an antipodal pair
            th, ph = np.repeat(p[0:3], 2), np.repeat(p[3:6], 2); phi = np.stack([p[6:9], p[6:9] + np.pi], 1).ravel(); Om = p[9]
        elif mode == '33':
            th, ph = np.repeat(p[0:2], 3), np.repeat(p[2:4], 3); phi = p[4:10]; Om = p[10]
        return th, ph, phi, Om
    npar = dict(full=19, **{'222': 13, '222anti': 10, '33': 11})[mode]
    q = np.array(pol if pol is not None else [1, 1, 1, -1, -1, -1], float)
    def resid(p, nT=nT, full=False):
        th, ph, phi, Om = unpack(p); m, u, up = basis_from_angles(th, ph)
        T = np.arange(nT)*2*np.pi/Om/nT
        F, D = closed_residual_real(T, u, up, phi, q, R, Om)
        if full: return np.sqrt((F**2).sum(-1)).max()/(Om*Om*R), m, np.sqrt(D[:, ~np.eye(6, dtype=bool)].min())
        return (F/(Om*Om*R)).ravel()
    lo = np.full(npar, -np.inf); hi = np.full(npar, np.inf); lo[-1], hi[-1] = 0.2, 3.0
    rows = []; t0 = time.time()
    for s in range(nstart):
        p0 = np.concatenate([np.arccos(rng.uniform(-1, 1, npar)), [0]])[:npar]
        p0 = rng.uniform(0, 2*np.pi, npar)
        nth = dict(full=6, **{'222': 3, '222anti': 3, '33': 2})[mode]
        p0[:nth] = np.arccos(rng.uniform(-1, 1, nth)); p0[-1] = rng.uniform(0.2, 3.0)
        try:
            o = least_squares(resid, p0, bounds=(lo, hi), method='trf', xtol=1e-14, ftol=1e-14, gtol=1e-14, max_nfev=250)
        except Exception as e:
            rows.append(dict(start=s, error=str(e))); continue
        sup, m, minsep = resid(o.x, nT=96, full=True)
        nu = float((1 - m @ m.T).max()/2)
        rows.append(dict(start=s, supResidual96=float(sup), rms=float(np.sqrt(2*o.cost/len(o.fun))), nonPlanarity_maxA=nu, minSeparation=float(minsep), Omega=float(o.x[-1]), nfev=int(o.nfev), status=int(o.status)))
    ok = [r for r in rows if 'error' not in r]
    nonpl = [r for r in ok if r['nonPlanarity_maxA'] > 1e-6]; pl = [r for r in ok if r['nonPlanarity_maxA'] <= 1e-6]
    out = dict(test='t2', mode=mode, polarities=q.tolist(), utc=utc(), nstart=nstart, seed=seed, collocationTimes=nT, reportTimes=96, seconds=time.time() - t0,
               nConvergedRuns=len(ok), nPlanar=len(pl), nPlanarBelow1em8=int(sum(r['supResidual96'] < 1e-8 for r in pl)),
               bestPlanar=min([r['supResidual96'] for r in pl], default=None),
               bestNonPlanar=min(nonpl, key=lambda r: r['supResidual96']) if nonpl else None,
               nNonPlanarBelow1em4=int(sum(r['supResidual96'] < 1e-4 for r in nonpl)),
               nonPlanarFloorQuantiles=[float(x) for x in np.quantile([r['supResidual96'] for r in nonpl], [0, 0.1, 0.5, 0.9])] if nonpl else None,
               smallNonPlanarityRuns=sorted([(r['nonPlanarity_maxA'], r['supResidual96']) for r in nonpl if r['nonPlanarity_maxA'] < 1e-2])[:10], rows=rows)
    return out

# ---------- t6: identity (7.1) and the contractions of Corollary 7.3 on constructed classes ----------
def t6(n=100, seed=9):
    rng = np.random.default_rng(seed); worst = dict(f71=0.0, c12=0.0, c32=0.0); cnt = 0
    while cnt < n:
        kappa = 1.05 + rng.exponential(1.0); alpha = rng.uniform(-np.pi, np.pi); k = int(rng.integers(2, 6)); bm = beta_range(kappa)
        P = [family_partner(alpha, kappa, rng.uniform(0.1, 1)*bm, int(rng.integers(2))) for _ in range(k)]
        if any(p is None for p in P): continue
        cnt += 1; R = rng.uniform(0.5, 2); Om = rng.uniform(0.2, 3); sig = rng.choice([-1.0, 1.0], k)*rng.uniform(0.3, 3, k)   # real polarity products
        u = np.array([[1.0, 0, 0]] + [p[1] for p in P]); up = np.array([[0, 1.0, 0]] + [p[2] for p in P]); phi = np.array([0.0] + [p[3] for p in P])
        A = np.array([(1 - p[0][2])/2 for p in P])   # A = (1 - m_i.m_j)/2 with m_i = z
        T = rng.uniform(0, 2*np.pi/Om, 12)
        # law evaluated directly for member 0 with polarity products sig (q_0 = 1, q_j = sig_j)
        js, D, E, lin = member_terms(T, 0, u, up, phi, np.concatenate([[1.0], sig]), R, Om)
        direct = (E/np.sqrt(D)[..., None]**5).sum(1)
        X, _ = positions(T, u, up, phi, R, Om); dx = X[:, 0, None, :] - X[:, 1:, :]
        tau = 2*Om*T + alpha; h = kappa - np.cos(tau); g = -6 + 8*kappa*np.cos(tau) - 2*np.cos(tau)**2
        Y32 = (sig*A**-1.5)[None, :, None]*dx; Y12 = (sig*A**-0.5)[None, :, None]*dx
        form = ((2*R*R*h)[:, None]*Y32.sum(1) + (Om**2*R**4*g)[:, None]*Y12.sum(1))/((2*R*R*h)**2.5)[:, None]
        worst['f71'] = max(worst['f71'], abs(direct - form).max()/abs(direct).max())
        b = bvec(u, up, phi); y12 = ((sig*A**-0.5)[:, None]*(b[0][None] - b[1:])).sum(0); y32 = ((sig*A**-1.5)[:, None]*(b[0][None] - b[1:])).sum(0)
        worst['c12'] = max(worst['c12'], abs((y12*b[0]).sum() + 2*np.exp(1j*alpha)*(sig*A**0.5).sum()))
        worst['c32'] = max(worst['c32'], abs((y32*b[0]).sum() + 2*np.exp(1j*alpha)*(sig*A**-0.5).sum()))
    return dict(test='t6', utc=utc(), n=n, maxRel_classSum_vs_7_1=worst['f71'], maxAbs_contraction_y12=worst['c12'], maxAbs_contraction_y32=worst['c32'])

if __name__ == '__main__':
    cmd = sys.argv[1]; args = sys.argv[2:]
    if cmd == 'k1py': out = k1py()
    elif cmd == 't1': out = t1()
    elif cmd == 't3': out = t3()
    elif cmd == 't4': out = t4()
    elif cmd == 't5': out = t5()
    elif cmd == 't6': out = t6()
    elif cmd == 't2':
        mode = args[0]; nstart = int(args[1]); seed = int(args[2]); pol = [float(x) for x in args[3].split(',')] if len(args) > 3 else None
        out = t2(mode, nstart, seed, pol); cmd = 't2-%s-%s' % (mode, args[4] if len(args) > 4 else 'a')
    path = os.path.join(HERE, 'weber-binding-sphere-gc-review-%s.json' % cmd)
    json.dump(out, open(path, 'w'), indent=1, default=lambda o: o.tolist() if hasattr(o, 'tolist') else float(o))
    print(json.dumps({k: v for k, v in out.items() if k != 'rows'}, indent=1, default=lambda o: o.tolist() if hasattr(o, 'tolist') else float(o)))
