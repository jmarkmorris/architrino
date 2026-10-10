#!/usr/bin/env python
"""Adjudication of two claims in the Maxwell yardstick documents (2026-10-07), written separately from the
author's scripts (which were scratch files under .tmp/maxwell-variation and were not read).

Part A: ledger Section 3.6, the cycle-average identity for a probe at rest near a periodic subfield host.
Part B: assessment Section 6, behaviour of the rows carrying 1/D^3 at an ordinary transmitter fold.

Units c_f = K = 1. Rows per hit (assessment Section 2), with R = |x - X(S)| = T - S, n = (x - X)/R,
v = X'(S), a = X''(S), D = 1 - n.v:
  canonical  n / (R^2 D)
  G          [(1-|v|^2) n - D v + R n (n.a)] / (R^2 D^3)
  E          [(1-|v|^2)(n - v) + R((n - v)(n.a) - D a)] / (R^2 D^3)
Known cases run first; the script stops if one fails. Run with the shared venv:
  ../.venv/bin/python reference/priorities/master-equation-closure/evidence/maxwell-yardstick-adjudication-2026-10-07.py
"""
import json, os, sys, datetime
import numpy as np
import mpmath as mp

OUT = {'utc_start': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'known': {}, 'partA': [], 'partB': {}}
dot = np.dot

# ----------------------------------------------------------------------------- rows (float64)
def rows(x, X, v, a):
    d = x - X; R = np.linalg.norm(d); n = d / R; D = 1 - dot(n, v); v2 = dot(v, v); na = dot(n, a)
    can = n / (R * R * D)
    G = ((1 - v2) * n - D * v + R * n * na) / (R * R * D ** 3)
    E = ((1 - v2) * (n - v) + R * ((n - v) * na - D * a)) / (R * R * D ** 3)
    return can, G, E, R, D

def root(x, T, path, S0):
    """Solve T - S = |x - X(S)| by Newton from S0 (subfield path: unique root, derivative D > 0)."""
    S = S0
    for _ in range(60):
        X, v, a = path(S); d = x - X; R = np.linalg.norm(d); f = S + R - T; D = 1 - dot(d / R, v)
        dS = f / D; S -= dS
        if abs(dS) < 1e-15 * (1 + abs(S)): break
    return S

def psi(x, T, path, S0):
    S = root(x, T, path, S0); X, v, a = path(S); d = x - X; R = np.linalg.norm(d); D = 1 - dot(d / R, v)
    return 1 / (R * D), v

# ----------------------------------------------------------------------------- paths
def circle(a0, w, ph, z=0.0):
    def p(S):
        c, s = np.cos(w * S + ph), np.sin(w * S + ph)
        return (np.array([a0 * c, a0 * s, z]), np.array([-a0 * w * s, a0 * w * c, 0.0]), np.array([-a0 * w * w * c, -a0 * w * w * s, 0.0]))
    return p
def lissajous(ax, by, cz, w):
    def p(S):
        return (np.array([ax * np.cos(w * S), by * np.sin(w * S), cz * np.sin(2 * w * S)]),
                np.array([-ax * w * np.sin(w * S), by * w * np.cos(w * S), 2 * cz * w * np.cos(2 * w * S)]),
                np.array([-ax * w * w * np.cos(w * S), -by * w * w * np.sin(w * S), -4 * cz * w * w * np.sin(2 * w * S)]))
    return p

# ----------------------------------------------------------------------------- known cases
# K1 static source: all rows equal n/R^2
x = np.array([1.3, -0.4, 0.7]); can, G, E, R, D = rows(x, np.zeros(3), np.zeros(3), np.zeros(3))
k1 = max(np.linalg.norm(G - can), np.linalg.norm(E - can), np.linalg.norm(can - x / np.linalg.norm(x) ** 3))
# K2 closed-form G and E against finite differences of the wake scalar and vector on an accelerated path
pth = lissajous(0.5, 0.35, 0.2, 0.9); x = np.array([1.7, 0.6, -0.5]); T = 2.3
S = root(x, T, pth, T - 1.5); X, v, a = pth(S); can, G, E, R, D = rows(x, X, v, a)
h = 1e-5; Gfd = np.zeros(3)
for k in range(3):
    e = np.zeros(3); e[k] = h
    Gfd[k] = -(psi(x + e, T, pth, S)[0] - psi(x - e, T, pth, S)[0]) / (2 * h)
pp, vp = psi(x, T + h, pth, S); pm, vm = psi(x, T - h, pth, S); Wfd = -(pp * vp - pm * vm) / (2 * h)
k2G = np.linalg.norm(G - Gfd); k2E = np.linalg.norm(E - (Gfd + Wfd))
# K3 uniformly moving source: E equals the closed form about the present position,
#    E = (1 - v^2) r / (|r|^3 (1 - v^2 sin^2 theta)^(3/2)),  r from present position to the receiver
vv = np.array([0.45, 0.2, -0.1]); X0 = np.array([0.1, -0.2, 0.3])
lin = lambda S: (X0 + vv * S, vv, np.zeros(3)); x = np.array([1.1, 0.9, 0.4]); T = 0.8
S = root(x, T, lin, T - 1.0); X, v, a = lin(S); can, G, E, R, D = rows(x, X, v, a)
r = x - (X0 + vv * T); rn = np.linalg.norm(r); v2 = dot(vv, vv); sin2 = 1 - (dot(r, vv) ** 2) / (rn * rn * v2)
Eref = (1 - v2) * r / (rn ** 3 * (1 - v2 * sin2) ** 1.5); k3 = np.linalg.norm(E - Eref)
OUT['known'] = {'K1_static_rows_equal': k1, 'K2_G_vs_finite_difference': k2G, 'K2_E_vs_finite_difference': k2E, 'K3_uniform_motion_closed_form': k3,
                'pass': bool(k1 < 1e-14 and k2G < 1e-7 and k2E < 1e-7 and k3 < 1e-13)}
print('known cases', json.dumps(OUT['known']))
if not OUT['known']['pass']: sys.exit('known case failed')

# ----------------------------------------------------------------------------- Part A
def averages(x, members, P, N):
    """T-averages of the three rows over one host period, and the emission-time integral of the static pull."""
    accT = np.zeros((3, 3)); maxdiff = 0.0; minD = 9.0; minR = 9.0
    S_prev = [None] * len(members)
    for k in range(N):
        T = P * k / N
        for m, (sig, pth) in enumerate(members):
            S0 = S_prev[m] + P / N if S_prev[m] is not None else T - np.linalg.norm(x - pth(T)[0])
            S = root(x, T, pth, S0); S_prev[m] = S; X, v, a = pth(S); can, G, E, R, D = rows(x, X, v, a)
            accT[0] += sig * can; accT[1] += sig * G; accT[2] += sig * E; minD = min(minD, D); minR = min(minR, R)
            maxdiff = max(maxdiff, np.linalg.norm(can - E))
    accT /= N
    stat = np.zeros(3)
    for k in range(N):
        S = P * k / N
        for sig, pth in members:
            d = x - pth(S)[0]; stat += sig * d / np.linalg.norm(d) ** 3
    stat /= N
    return accT, stat, maxdiff, minD, minR

hosts = {
    'two members on circles of radii 0.5 and 0.3, rates 0.8 and 1.6 (speeds 0.40, 0.48), opposite polarity': ([(1, circle(0.5, 0.8, 0.0)), (-1, circle(0.3, 1.6, 1.1, 0.15))], 2 * np.pi / 0.8),
    'one member on a non-circular accelerated path (max speed about 0.62)': ([(1, lissajous(0.5, 0.35, 0.2, 0.9))], 2 * np.pi / 0.9),
    'three members: two circles and the non-circular path, mixed polarity, common period': ([(1, circle(0.45, 1.8, 0.3)), (-1, circle(0.25, 0.9, 2.0, -0.2)), (-1, lissajous(0.5, 0.35, 0.2, 0.9))], 2 * np.pi / 0.9),
}
probes = [np.array([1.6, 0.3, 0.2]), np.array([0.2, -1.1, 0.9]), np.array([0.05, 0.02, 0.75])]
worstA = 0.0
for name, (members, P) in hosts.items():
    for x in probes:
        res = {}
        for N in (256, 512, 2048):
            accT, stat, maxdiff, minD, minR = averages(x, members, P, N)
            res[N] = {'avg_canonical': accT[0].tolist(), 'avg_G': accT[1].tolist(), 'avg_E': accT[2].tolist(), 'static_integral': stat.tolist(),
                      'max_abs_difference_among_the_four': float(max(np.linalg.norm(accT[i] - stat) for i in range(3))),
                      'largest_instantaneous_canonical_minus_E': float(maxdiff), 'min_D': float(minD), 'min_R': float(minR)}
        worstA = max(worstA, res[2048]['max_abs_difference_among_the_four'])
        OUT['partA'].append({'host': name, 'probe': x.tolist(), 'N256': res[256], 'N512': res[512], 'N2048': res[2048]})
        print('A', name[:38].ljust(38), 'probe', x, 'diff(N=256)', '%.2e' % res[256]['max_abs_difference_among_the_four'], 'diff(N=512)', '%.2e' % res[512]['max_abs_difference_among_the_four'], 'diff(N=2048)', '%.2e' % res[2048]['max_abs_difference_among_the_four'],
              'inst |can-E| up to', '%.3f' % res[512]['largest_instantaneous_canonical_minus_E'], 'min D', '%.3f' % res[512]['min_D'], '|avg|', '%.4f' % np.linalg.norm(res[512]['static_integral']))
OUT['partA_worst_difference_N2048'] = worstA
# negative control: a probe that moves the averaging window to half a period must NOT agree
members, P = hosts['one member on a non-circular accelerated path (max speed about 0.62)']
accT, stat, *_ = averages(probes[0], members, P / 2, 256)
OUT['partA_negative_control_half_period'] = float(np.linalg.norm(accT[2] - accT[0]))
print('A negative control (half-period window): |<E> - <canonical>| =', '%.3e' % OUT['partA_negative_control_half_period'])

# ----------------------------------------------------------------------------- Part B (mpmath, 40 digits)
mp.mp.dps = 40
def mrows(x, X, v, a):
    d = [x[i] - X[i] for i in range(3)]; R = mp.sqrt(sum(c * c for c in d)); n = [c / R for c in d]
    nv = sum(n[i] * v[i] for i in range(3)); D = 1 - nv; v2 = sum(c * c for c in v); na = sum(n[i] * a[i] for i in range(3))
    can = [n[i] / (R * R * abs(D)) for i in range(3)] if D != 0 else [mp.mpf(0)] * 3   # not used at the fold itself
    Gb = [((1 - v2) * n[i] - D * v[i] + R * n[i] * na) / (R * R) for i in range(3)]          # bracket / R^2
    Eb = [((1 - v2) * (n[i] - v[i]) + R * ((n[i] - v[i]) * na - D * a[i])) / (R * R) for i in range(3)]
    return can, Gb, Eb, R, D, n
def nrm(u): return mp.sqrt(sum(c * c for c in u))

def fold_study(path, x, Sstar_guess, label, birth):
    Tfun = lambda S: S + nrm([x[i] - path(S)[0][i] for i in range(3)])
    Dfun = lambda S: mrows(x, *path(S))[4]
    Ss = mp.findroot(Dfun, Sstar_guess); Dp = mp.diff(Dfun, Ss); Ts = Tfun(Ss)
    X, v, a = path(Ss); can, Gb, Eb, R, D, n = mrows(x, X, v, a)
    nmv = nrm([n[i] - v[i] for i in range(3)])
    rec = {'label': label, 'S_fold': float(Ss), 'D_prime': float(Dp), 'R_fold': float(R), 'speed_at_fold': float(nrm(v)), 'n_minus_v_norm': float(nmv), 'rows': []}
    sgn = 1 if birth else -1
    for e in (2, 3, 4, 5, 6, 7, 8):
        tau = mp.mpf(10) ** (-e); T = Ts + sgn * tau; eps = mp.sqrt(2 * tau / abs(Dp))
        roots_ = []
        for s in (+1, -1):   # one root on each side of the fold; retry the starting offset until the root is on the requested side
            for fac in (1, 0.7, 1.5, 0.4, 2.5):
                r_ = mp.findroot(lambda S: Tfun(S) - T, Ss + s * fac * eps)
                if mp.sign(r_ - Ss) == s and abs(r_ - Ss) < 6 * eps: break
            else: raise RuntimeError('root on the requested side not found')
            roots_.append(r_)
        assert abs(roots_[0] - roots_[1]) > eps
        tot_mag_G = [mp.mpf(0)] * 3; tot_sig_G = [mp.mpf(0)] * 3; tot_mag_E = [mp.mpf(0)] * 3; tot_sig_E = [mp.mpf(0)] * 3; tot_can = [mp.mpf(0)] * 3
        single_G = []; single_E = []; single_can = []
        for S in roots_:
            can, Gb, Eb, R_, D_, n_ = mrows(x, *path(S))
            G = [c / D_ ** 3 for c in Gb]; E = [c / D_ ** 3 for c in Eb]; s = mp.sign(D_)
            single_G.append(nrm(G)); single_E.append(nrm(E)); single_can.append(nrm(can))
            tot_sig_G = [tot_sig_G[i] + G[i] for i in range(3)]; tot_mag_G = [tot_mag_G[i] + s * G[i] for i in range(3)]
            tot_sig_E = [tot_sig_E[i] + E[i] for i in range(3)]; tot_mag_E = [tot_mag_E[i] + s * E[i] for i in range(3)]
            tot_can = [tot_can[i] + can[i] for i in range(3)]
        t32 = tau ** mp.mpf('1.5'); predG = 1 / (R * mp.mpf(2) ** mp.mpf('1.5') * mp.sqrt(abs(Dp))); predE = nmv * predG
        rec['rows'].append({'tau': float(tau),
            'single_branch_G_times_tau32_over_prediction': [float(g * t32 / predG) for g in single_G],
            'single_branch_E_times_tau32_over_prediction': [float(g * t32 / predE) for g in single_E] if nmv > mp.mpf('1e-20') else None,
            'single_branch_E_times_tau12': [float(g * mp.sqrt(tau)) for g in single_E],
            'single_branch_canonical_times_tau12': [float(g * mp.sqrt(tau)) for g in single_can],
            'two_branch_G_magnitude_weight_times_tau32_over_twice_prediction': float(nrm(tot_mag_G) * t32 / (2 * predG)),
            'two_branch_E_magnitude_weight_times_tau32': float(nrm(tot_mag_E) * t32),
            'two_branch_G_signed_weight_norm': float(nrm(tot_sig_G)), 'two_branch_E_signed_weight_norm': float(nrm(tot_sig_E)),
            'two_branch_G_signed_weight_vector': [float(c) for c in tot_sig_G]})
    return rec

# B1 generic fold: uniform circle above the field speed, receiver at a fixed off-plane point
def mcircle(a0, w):
    def p(S):
        c, s = mp.cos(w * S), mp.sin(w * S)
        return ([a0 * c, a0 * s, mp.mpf(0)], [-a0 * w * s, a0 * w * c, mp.mpf(0)], [-a0 * w * w * c, -a0 * w * w * s, mp.mpf(0)])
    return p
xB = [mp.mpf(3), mp.mpf('0.4'), mp.mpf('0.2')]; pathB = mcircle(mp.mpf(1), mp.mpf('1.5'))
Dgrid = [(S, mrows(xB, *pathB(mp.mpf(S)))[4]) for S in np.linspace(0, 2 * np.pi / 1.5, 2001)]
folds = [float(Dgrid[k][0]) for k in range(len(Dgrid) - 1) if Dgrid[k][1] * Dgrid[k + 1][1] < 0]
recs = []
for Sg in folds:
    Dp = mp.diff(lambda S: mrows(xB, *pathB(S))[4], mp.findroot(lambda S: mrows(xB, *pathB(S))[4], Sg))
    recs.append(fold_study(pathB, xB, Sg, 'uniform circle, speed 1.5, fixed off-plane receiver; ' + ('birth fold (two roots after)' if Dp > 0 else 'annihilation fold (two roots before)'), Dp > 0))
OUT['partB']['generic_circle_folds'] = recs
# B2 collinear fold: uniformly accelerated transmitter moving straight at the receiver
g = mp.mpf('0.5'); pathC = lambda S: ([g * S * S / 2, mp.mpf(0), mp.mpf(0)], [g * S, mp.mpf(0), mp.mpf(0)], [g, mp.mpf(0), mp.mpf(0)])
xC = [mp.mpf(5), mp.mpf(0), mp.mpf(0)]
OUT['partB']['collinear_fold'] = fold_study(pathC, xC, mp.mpf(2), 'uniformly accelerated transmitter moving straight at the receiver; annihilation fold at speed 1', False)
for rec in recs + [OUT['partB']['collinear_fold']]:
    print('B', rec['label']); print('   D\' = %.4f, R = %.4f, speed %.3f, |n - v| = %.4f' % (rec['D_prime'], rec['R_fold'], rec['speed_at_fold'], rec['n_minus_v_norm']))
    for r in rec['rows']:
        print('   tau %.0e  single G*tau^1.5/pred %s  single E*tau^1.5/pred %s  E*tau^.5 %s  can*tau^.5 %s | mag-sum G/(2 pred) %.6f | signed-sum |G| %.6f |E| %.6f' % (
            r['tau'], ['%.5f' % c for c in r['single_branch_G_times_tau32_over_prediction']],
            ['%.5f' % c for c in r['single_branch_E_times_tau32_over_prediction']] if r['single_branch_E_times_tau32_over_prediction'] else 'n/a',
            ['%.5f' % c for c in r['single_branch_E_times_tau12']], ['%.5f' % c for c in r['single_branch_canonical_times_tau12']],
            r['two_branch_G_magnitude_weight_times_tau32_over_twice_prediction'], r['two_branch_G_signed_weight_norm'], r['two_branch_E_signed_weight_norm']))
OUT['utc_end'] = datetime.datetime.now(datetime.timezone.utc).isoformat()
with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'maxwell-yardstick-adjudication-2026-10-07.json'), 'w') as f: json.dump(OUT, f, indent=1)
