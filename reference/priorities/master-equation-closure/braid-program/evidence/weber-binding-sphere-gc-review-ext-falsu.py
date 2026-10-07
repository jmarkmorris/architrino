# weber-binding-sphere-gc-review-ext-falsu.py
# Reviewer's falsifier search for the unconditional uniform-circle statement (six members, class U:
# uniform motion on circles of the unit sphere about arbitrary axes, unequal radii, one common speed v).
# K = c_f = 1, R = 1.  Residual: the prescribed-history form of Lemma 16.1, taken from the reviewer's own
# evaluator in weber-binding-sphere-gc-review-ext-tests.py (anchored to the frozen library by EK1 / k1py).
#   ../.venv/bin/python <this file> reach|random|r31|r51|r53|mseed|mpin|cont <nstart> <seed>
# Member k: axis n(th,ph), height c (radius a = sqrt(1-c^2)), phase phi, rate +v/a about n.  Axes range over the
# whole sphere and heights over both signs, so both senses of rotation are covered by positive rates.
import sys, os, json, time, datetime, importlib.util
import numpy as np
from scipy.optimize import least_squares
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('ext', os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-tests.py')); ext = importlib.util.module_from_spec(spec); spec.loader.exec_module(ext)
def utc(): return datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
NFIT, NREP = 400, 1200
_r = np.random.default_rng(12345); FIT = (np.arange(NFIT) + _r.uniform(0, 1, NFIT))/NFIT; REP = (np.arange(NREP) + _r.uniform(0, 1, NREP))/NREP
CMAX = np.sqrt(1 - 0.25**2)          # radii a in [0.25, 1]

def frame(th, ph):
    n = np.array([np.sin(th)*np.cos(ph), np.sin(th)*np.sin(ph), np.cos(th)]); u = np.array([-np.sin(ph), np.cos(ph), 0.0]); return n, u, np.cross(n, u)
def angles(n): return float(np.arccos(np.clip(n[2], -1, 1))), float(np.arctan2(n[1], n[0]))
# full parameter vector P = [th(6), ph(6), phi(6), h(6), v]; `mode` says how member radii are obtained
def build(P, mode):
    th, ph, phi, h, v = P[0:6], P[6:12], P[12:18], P[18:24], P[24]; mem = []
    for k in range(6):
        n, u, up = frame(th[k], ph[k])
        if mode['kind'] == 'ratio' and k in (0, 1):
            a = mode['k'][k]*h[0]; c = mode['sg'][k]*np.sqrt(max(1 - a*a, 0.0))
        else:
            c = h[k]; a = np.sqrt(max(1 - c*c, 1e-12))
        if mode['kind'] == 'mirror' and k == 1:
            C0, u0, up0, a0, w0, f0 = mem[0]; nu, _, _ = frame(th[1], ph[1]); M = np.eye(3) - 2*np.outer(nu, nu); mem.append((M @ C0, M @ u0, M @ up0, a0, w0, f0)); continue
        mem.append((c*n, u, up, a, v/a, phi[k]))
    return mem, v
def omegas(mem): return np.array([m[4]*np.cross(m[1], m[2]) for m in mem])
def fast_resid(T, mem, q):
    # same residual as ext.resid (Lemma 16.1 form), computed through Gram matrices; checked against ext.resid in `check`
    C = np.array([m[0] for m in mem]); u = np.array([m[1] for m in mem]); up = np.array([m[2] for m in mem]); a = np.array([m[3] for m in mem]); om = np.array([m[4] for m in mem]); phi = np.array([m[5] for m in mem])
    th = om[None]*T[:, None] + phi[None]; cs, sn = np.cos(th)[..., None], np.sin(th)[..., None]; e = cs*u[None] + sn*up[None]
    X = C[None] + a[None, :, None]*e; V = (a*om)[None, :, None]*(-sn*u[None] + cs*up[None]); A = -(a*om*om)[None, :, None]*e
    Xt, Vt, At = X.transpose(0, 2, 1), V.transpose(0, 2, 1), A.transpose(0, 2, 1)
    XX = X @ Xt; XV = X @ Vt; VV = V @ Vt; XA = X @ At; dg = lambda Mx: np.einsum('tii->ti', Mx)
    xx, xv, vv, xa = dg(XX), dg(XV), dg(VV), dg(XA)
    D = xx[:, :, None] + xx[:, None, :] - 2*XX
    Dd = 2*(xv[:, :, None] + xv[:, None, :] - XV - XV.transpose(0, 2, 1))
    Ddd = 2*(vv[:, :, None] + vv[:, None, :] - 2*VV) + 2*(xa[:, :, None] + xa[:, None, :] - XA - XA.transpose(0, 2, 1))
    eye = np.eye(len(mem), dtype=bool)[None]; D1 = np.where(eye, 1.0, D); s = np.sqrt(D1)
    w = np.where(eye, 0.0, (q[:, None]*q[None])[None]*((1 + Ddd/2)*D1 - 3*Dd**2/8)/(D1*D1*s))
    return w.sum(2)[..., None]*X - w @ X - A, D
def evaluate(P, mode, q, frac, periods):
    mem, v = build(P, mode); amax = max(m[3] for m in mem); T = frac*periods*2*np.pi*amax/v
    G, D = fast_resid(T, mem, q); return G/v**2, D, mem, v
# Window continuation.  A single fit on 20 periods failed the reach known case (0 of 20 perturbed hexagons recovered,
# receipts ...-falsu-reach-101/102 of 23:35Z, kept under the names ...-reach-v1-*): members on nearby circles at slightly
# different rates pass close to one another somewhere in a long window, and the least squares is trapped by those spikes.
# The fit is therefore staged: 0.5, 2 and 6 periods of the slowest member (200 times, at most 100 evaluations each),
# then the required 20 periods at 400 times (at most 400 evaluations).  The report always uses 30 periods at 1200 times.
STAGES = ((0.5, FIT[::2], 100), (2.0, FIT[::2], 100), (6.0, FIT[::2], 100), (20.0, FIT, 400))
def minimise(P0, mode, q, free, lo, hi, stages=STAGES):
    P = np.array(P0, float); x = np.clip(P[free], lo + 1e-12, hi - 1e-12); nfev = 0
    for periods, frac, budget in stages:
        def f(x):
            P[free] = x; return evaluate(P, mode, q, frac, periods)[0].ravel()
        o = least_squares(f, x, bounds=(lo, hi), xtol=1e-14, ftol=1e-14, gtol=1e-14, max_nfev=budget); x = np.clip(o.x, lo + 1e-12, hi - 1e-12); nfev += o.nfev
    o.nfev = nfev
    P[free] = o.x; G, D, mem, v = evaluate(P, mode, q, REP, 30.0); W = omegas(mem)
    spread = float(max(np.linalg.norm(W[i] - W[j]) for i in range(6) for j in range(6))/v)
    pairmin = np.sqrt(D.min(axis=0) + np.eye(6)*1e9)
    return dict(sup=float(np.sqrt((G**2).sum(-1)).max()), rms=float(np.sqrt(np.mean(o.fun**2))), rigiditySpread=spread, v=float(v), radii=[float(m[3]) for m in mem],
                minSeparation=float(pairmin.min()), nfev=int(o.nfev), status=int(o.status)), P.copy()
def bounds_for(mode, free):
    lo = np.full(25, -np.inf); hi = np.full(25, np.inf); lo[18:24], hi[18:24] = -CMAX, CMAX; lo[24], hi[24] = 0.2, 1.5
    if mode['kind'] == 'ratio': lo[18], hi[18] = mode['t']
    return lo[free], hi[free]
def free_index(mode, fixed=()):
    idx = list(range(25))
    if mode['kind'] == 'ratio': idx.remove(19)
    if mode['kind'] == 'mirror': idx.remove(13); idx.remove(19)
    return np.array([i for i in idx if i not in fixed])
def random_P(rng, mode):
    P = np.zeros(25); P[0:6] = np.arccos(rng.uniform(-1, 1, 6)); P[6:12] = rng.uniform(0, 2*np.pi, 6); P[12:18] = rng.uniform(0, 2*np.pi, 6)
    a = rng.uniform(0.25, 1, 6); P[18:24] = rng.choice([-1, 1], 6)*np.sqrt(1 - a*a); P[24] = rng.uniform(0.2, 1.5)
    if mode['kind'] == 'ratio': P[18] = rng.uniform(*mode['t'])
    return P
def hexagon_P(tilted):
    P = np.zeros(25); a = 0.8 if tilted else 1.0
    if tilted: P[0:6] = 0.7; P[6:12] = 1.1
    P[12:18] = np.arange(6)*np.pi/3; P[18:24] = np.sqrt(1 - a*a); P[24] = np.sqrt((1.25 - 1/np.sqrt(3))/a); return P
QH = np.array([1, -1, 1, -1, 1, -1.0]); FREE = {'kind': 'free'}

def run_reach(nstart, seed):
    rng = np.random.default_rng(seed); out = dict(test='ext-falsu-reach', utc=utc(), seed=seed, cases={})
    for name, tilted in (('hexagonEquator', False), ('hexagonTiltedLatitude', True)):
        P0 = hexagon_P(tilted); exact = float(abs(evaluate(P0, FREE, QH, FIT, 20.0)[0]).max()); rows = []
        detune = P0.copy(); detune[24] *= 1.05; ctrl = float(abs(evaluate(detune, FREE, QH, FIT, 20.0)[0]).max())
        for s in range(nstart):
            P = P0.copy(); mem, v = build(P0, FREE)
            for k in range(6):
                n, u, up = frame(P0[k], P0[6 + k]); e0 = np.cos(P0[12 + k])*u + np.sin(P0[12 + k])*up
                d = np.cross(n, ext.unit(rng.normal(size=3))); d = d/np.linalg.norm(d); ang = rng.uniform(0, 0.3); n2 = np.cos(ang)*n + np.sin(ang)*d
                P[k], P[6 + k] = angles(n2); n2, u2, up2 = frame(P[k], P[6 + k]); P[12 + k] = np.arctan2(e0 @ up2, e0 @ u2) + rng.normal(0, 0.03)
                a0 = mem[k][3]; a = min(a0*(1 + 0.1*rng.uniform(-1, 1)), 1.0) if tilted else a0*(1 - 0.1*rng.uniform(0, 1)); P[18 + k] = (1 if tilted else rng.choice([-1, 1]))*np.sqrt(1 - a*a)
            P[24] = P0[24]*(1 + 0.02*rng.uniform(-1, 1)); free = free_index(FREE); lo, hi = bounds_for(FREE, free)
            startSup = float(np.sqrt((evaluate(P, FREE, QH, FIT, 20.0)[0]**2).sum(-1)).max())
            r, _ = minimise(P, FREE, QH, free, lo, hi); r['startSup'] = startSup; rows.append(r)
        out['cases'][name] = dict(exactResidual=exact, detunedControl=ctrl, nstart=nstart, recovered=sum(r['sup'] < 1e-8 and r['rigiditySpread'] < 1e-6 for r in rows), rows=rows)
    return out

def mirror_seed(P, rng):
    # make member 1 the mirror image of member 0 in a plane that member 0's circle does not cross (start only)
    n, u, up = frame(P[0], P[6]); c = P[18]; a = np.sqrt(1 - c*c)
    if abs(c) < 0.3: c = np.sign(c if c != 0 else 1)*rng.uniform(0.4, 0.9); P[18] = c; a = np.sqrt(1 - c*c)
    while True:
        nu = ext.unit(rng.normal(size=3)); nun = n @ nu; nup = np.sqrt(1 - nun*nun)
        if abs(c*nun) > 1.1*a*nup and nup > 0.1: break
    M = np.eye(3) - 2*np.outer(nu, nu); n1 = -(M @ n); P[1], P[7] = angles(n1); n1, u1, up1 = frame(P[1], P[7]); P[19] = -c
    e0 = M @ (np.cos(P[12])*u + np.sin(P[12])*up); P[13] = np.arctan2(e0 @ up1, e0 @ u1); return P, nu

def run_stratum(kind, nstart, seed):
    rng = np.random.default_rng(seed); t0 = time.time()
    modes = dict(random=FREE, mseed=FREE, mpin={'kind': 'mirror'},
                 r31={'kind': 'ratio', 'k': (1.0, 3.0), 't': (0.25, 1/3 - 1e-6)}, r51={'kind': 'ratio', 'k': (1.0, 5.0), 't': (0.10, 0.2 - 1e-6)}, r53={'kind': 'ratio', 'k': (3.0, 5.0), 't': (0.25/3, 0.2 - 1e-6)})
    out = dict(test='ext-falsu-' + kind, utc=utc(), seed=seed, nstart=nstart, fitTimes='400 jittered times over 20 periods of the slowest member', reportTimes='1200 jittered times over 30 periods', units='v^2/R', stages='0.5, 2, 6 periods (200 times, 100 evaluations each) then 20 periods (400 times, 400 evaluations)', rows=[], partial=True)
    path = os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-falsu-%s-%d.json' % (kind, seed))
    for s in range(nstart):
        mode = dict(modes[kind]); q = rng.permutation([1, 1, 1, -1, -1, -1.0])
        if mode['kind'] == 'ratio': mode['sg'] = tuple(rng.choice([-1.0, 1.0], 2))
        P = random_P(rng, mode); extra = {}
        if kind == 'mseed': P, nu = mirror_seed(P, rng)
        if kind == 'mpin':
            P, nu = mirror_seed(P, rng); P[1], P[7] = angles(nu)
        free = free_index(mode); lo, hi = bounds_for(mode, free)
        if kind in ('mseed', 'mpin'):
            mem, v = build(P, mode); extra['startMirrorDefect'] = float(abs(np.sqrt(((mem[0][0] + mem[0][3]*mem[0][1]) - (mem[1][0] + mem[1][3]*mem[1][1]))**2).sum() - 2*abs((mem[0][0] + mem[0][3]*mem[0][1]) @ nu)))
        try: r, Pf = minimise(P, mode, q, free, lo, hi)
        except Exception as e: out['rows'].append(dict(start=s, error=str(e))); continue
        r.update(start=s, q=q.tolist(), **extra)
        if mode['kind'] == 'ratio': r['pinnedRadii'] = [r['radii'][0], r['radii'][1]]; r['pinnedAxesAngle'] = float(np.arccos(np.clip(frame(Pf[0], Pf[6])[0] @ frame(Pf[1], Pf[7])[0], -1, 1)))
        out['rows'].append(r)
        if s % 5 == 4: out['seconds'] = time.time() - t0; json.dump(out, open(path, 'w'))
    out['partial'] = False; out['seconds'] = time.time() - t0; return out

def run_cont(nchain, seed):
    # from the rigid equatorial hexagon: tilt the common axis of one pair by t, hold that axis and the axis of one other member, re-minimise everything else
    rng = np.random.default_rng(seed); out = dict(test='ext-falsu-cont', utc=utc(), seed=seed, tilts=[0.05, 0.1, 0.2, 0.3, 0.4, 0.5], chains=[]); P0 = hexagon_P(False)
    pairs = [((0, 1), 'adjacent unlike'), ((0, 3), 'diametral unlike'), ((0, 2), 'next-nearest like')]
    path = os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-falsu-cont-%d.json' % seed); direct = seed < 300   # seeds >= 300: no direct starts, pair type = seed % 3
    for c in range(nchain):
        (i, j), label = pairs[(c + (seed if seed >= 300 else 0)) % 3]; anchor = [k for k in range(6) if k not in (i, j)][int(rng.integers(4))]; az = rng.uniform(0, 2*np.pi)
        fixed = (i, 6 + i, j, 6 + j, anchor, 6 + anchor); free = free_index(FREE, fixed); lo, hi = bounds_for(FREE, free); P = P0.copy(); chain = dict(pair=[i, j], label=label, anchor=anchor, azimuth=az, steps=[])
        for t in out['tilts']:
            for k in (i, j):
                # tilted axis n(t, az); keep the member's position direction at T=0 as close as possible by recomputing its phase
                n, u, up = frame(P[k], P[6 + k]); e0 = np.cos(P[12 + k])*u + np.sin(P[12 + k])*up
                P[k], P[6 + k] = t, az; n2, u2, up2 = frame(t, az); P[12 + k] = np.arctan2(e0 @ up2, e0 @ u2)
            held = float(np.sqrt((evaluate(P, FREE, QH, FIT, 20.0)[0]**2).sum(-1)).max())
            r, P = minimise(P, FREE, QH, free, lo, hi); r.update(tilt=t, supBeforeMinimisation=held); chain['steps'].append(r)
            if not direct:
                chain['steps'][-1]['directStart'] = None; out['chains'] = out['chains'][:c] + [chain]; out['partial'] = True; json.dump(out, open(path, 'w')); continue
            # a direct start at this tilt from the untilted hexagon as well
            Pd = P0.copy()
            for k in (i, j):
                n, u, up = frame(Pd[k], Pd[6 + k]); e0 = np.cos(Pd[12 + k])*u + np.sin(Pd[12 + k])*up; Pd[k], Pd[6 + k] = t, az; n2, u2, up2 = frame(t, az); Pd[12 + k] = np.arctan2(e0 @ up2, e0 @ u2)
            rd, _ = minimise(Pd, FREE, QH, free, lo, hi); chain['steps'][-1]['directStart'] = dict(sup=rd['sup'], rms=rd['rms'], rigiditySpread=rd['rigiditySpread'], minSeparation=rd['minSeparation'])
        out['chains'] = out['chains'][:c] + [chain]
    out['partial'] = False; return out

if __name__ == '__main__':
    kind, nstart, seed = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    if kind == 'check':
        rng = np.random.default_rng(seed); worst = 0.0; worstD = 0.0
        for kk in range(20):
            mode = FREE if kk % 2 == 0 else {'kind': 'mirror'}; P = random_P(rng, mode); q = rng.permutation([1, 1, 1, -1, -1, -1.0])
            if kk % 2 == 1:
                P, nu = mirror_seed(P, rng); P[1], P[7] = angles(nu)
            mem, v = build(P, mode); T = rng.uniform(0, 50, 40); G1, D1 = ext.resid(T, mem, q); G2, D2 = fast_resid(T, mem, q)
            worst = max(worst, abs(G1 - G2).max()/abs(G1).max()); worstD = max(worstD, abs(D1 - D2).max())
        P0 = hexagon_P(True); hexr = float(abs(evaluate(P0, FREE, QH, FIT, 20.0)[0]).max())
        res = dict(test='ext-falsu-check', utc=utc(), maxRel_fast_vs_anchored_residual=worst, maxAbs_D_difference=worstD, tiltedHexagonResidual=hexr, **{'pass': bool(worst < 1e-11 and hexr < 1e-12)})
        json.dump(res, open(os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-falsu-check.json'), 'w'), indent=1); print(json.dumps(res)); sys.exit(0)
    if kind == 'time':
        P = random_P(np.random.default_rng(1), FREE); t0 = time.time()
        for _ in range(200): evaluate(P, FREE, QH, FIT, 20.0)
        print('seconds per residual evaluation', (time.time() - t0)/200); sys.exit(0)
    out = run_reach(nstart, seed) if kind == 'reach' else run_cont(nstart, seed) if kind == 'cont' else run_stratum(kind, nstart, seed)
    json.dump(out, open(os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-falsu-%s-%d.json' % (kind, seed)), 'w'), indent=1)
    if kind == 'reach': print(json.dumps({k: {x: v[x] for x in v if x != 'rows'} for k, v in out['cases'].items()}))
    else: print(kind, seed, 'done', out.get('seconds'))
