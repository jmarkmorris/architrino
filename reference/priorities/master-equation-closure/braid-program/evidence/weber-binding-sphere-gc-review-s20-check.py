# weber-binding-sphere-gc-review-s20-check.py
# Reviewer's construction check for Lemma 20.1 (finite-harmonic equal-speed spherical curves are circles), 2026-10-06.
# Not a test of the lemma's content (that is the paper proof); it checks the frame identities (20.1) and the degree
# bookkeeping of the proof on curves where the answer is known:
#   (a) a tilted small circle traversed M times per period, M = 2, 3: k constant, D constant, |D| = M omega, harmonics 0, +-M only;
#   (b) a spherical curve of degree 3 that is NOT equal-speed (unit-normalised by construction is not polynomial, so use the
#       classical degree-3 spherical "seam" X = (a cos t + b cos 3t, a sin t - b sin 3t, 2 sqrt(ab) sin 2t), a + b = 1):
#       it lies on the unit sphere, its speed is not constant, and the frame built from it has non-constant k -- the degree
#       count of the proof is then not available, as it must not be.
import json, os, datetime
import numpy as np
def harmonics(f, K=64):
    c = np.fft.fft(f, axis=0)/K; return np.abs(c)
def frame_data(X, om, K=64):
    # X: (K,3) samples at T_j = 2 pi j / (om K); spectral derivative
    n = np.fft.fftfreq(K, 1.0/K); d = lambda F: np.real(np.fft.ifft(1j*n[:, None]*om*np.fft.fft(F, axis=0), axis=0))
    Xd = d(X); R = np.linalg.norm(X, axis=1); v = np.linalg.norm(Xd, axis=1)
    e1 = X/R[:, None]; e2 = Xd/v[:, None]; e3 = np.cross(e1, e2); e2d = d(e2); k = (e2d*e3).sum(1); D = k[:, None]*e1 + (v/R)[:, None]*e3
    return R, v, k, D, Xd
out = dict(test='review-s20-check', utc=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')); K = 64; om = 1.3; T = 2*np.pi*np.arange(K)/(om*K)
rng = np.random.default_rng(5)
for M in (2, 3):
    nax = rng.normal(size=3); nax /= np.linalg.norm(nax); u = np.cross(nax, [0.3, 0.1, 0.9]); u /= np.linalg.norm(u); up = np.cross(nax, u); c, a = 0.6, 0.8
    X = c*nax[None] + a*(np.cos(M*om*T)[:, None]*u[None] + np.sin(M*om*T)[:, None]*up[None]); R, v, k, D, Xd = frame_data(X, om)
    H = harmonics(X).max(1); other = max(H[n] for n in range(1, K//2) if n != M)
    out['circle_M%d' % M] = dict(sphereDefect=float(abs(R - 1).max()), speedSpread=float(v.max() - v.min()), kSpread=float(k.max() - k.min()), k=float(k.mean()), expected_k=float(c*M*om/1.0),
                                 DSpread=float(abs(D - D.mean(0)).max()), normD_over_M_omega=float(np.linalg.norm(D.mean(0))/(M*om)), D_parallel_axis=float(abs(D.mean(0) @ nax)/np.linalg.norm(D.mean(0))),
                                 maxOtherHarmonic=float(other), XdotMinusDxX=float(abs(Xd - np.cross(D, X)).max()))
a_, b_ = 0.7, 0.3; t = om*T; X = np.stack([a_*np.cos(t) + b_*np.cos(3*t), a_*np.sin(t) - b_*np.sin(3*t), 2*np.sqrt(a_*b_)*np.sin(2*t)], 1); R, v, k, D, Xd = frame_data(X, om)
out['seamCurve_degree3_notEqualSpeed'] = dict(sphereDefect=float(abs(R - 1).max()), speedSpread=float(v.max() - v.min()), kSpread=float(k.max() - k.min()), DSpread=float(abs(D - D.mean(0)).max()))
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'weber-binding-sphere-gc-review-s20-check.json'), 'w'), indent=1); print(json.dumps(out))
