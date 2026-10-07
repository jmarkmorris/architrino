# weber-binding-sphere-gc-review-ext-ratio31-1d.py
# Reviewer's independent reduction of the 3:1 square condition (Lemma 17.4), by the route of Section 18.2
# rather than the author's equations (A), (B).  R = 1, rates 3 and 1, frame of Lemma 16.7, phi_j = 0.
#   H(x) = 1 + h1 x + h2 x^2 + h3 x^3 + h4 x^4,  H^2 = E = D/(d_4 zeta^4),  x = 1/zeta,
#   e1 = 2 i beta kappa, e2 = kappa^2, e3 = -2 i beta_i kappa e^{-i phi}, e4 = -(2 - 2 c_i c_j C) e^{-i phi} / ((3/2) a^2 (1 - C)).
#   Bottom-up: h1 = i beta kappa, h2 = (1 + beta^2) kappa^2 / 2 (real, positive).
#   Symmetry h_{4-k} = conj(h_k) u with u = h4, |u| = 1: k = 2 gives u = 1; so h3 = -i beta kappa, h4 = 1.
#   x^3: e3 = 2 h3 + 2 h1 h2 = -2 i beta kappa (1 - h2)   =>  beta (1 - h2) = beta_i e^{-i phi}.
#   x^4: e4 = 2 h4 + 2 h1 h3 + h2^2 = 2 + 2 beta^2 kappa^2 + h2^2 > 0  =>  e^{i phi} = -1, hence beta (h2 - 1) = beta_i.
# With q = c_j^2 in (0,1): a^2 = (1-q)/9, beta^2 = q/(1-q), beta_i^2 = (8+q)/(1-q); |beta_i| > |beta| forces h2 = 1 + sqrt((8+q)/q)
# (the other root is negative), so beta and beta_i have the same sign (heights of equal sign), kappa^2 = 2 (1-q) h2, and the x^4
# equation is one real equation F(q) = 0.  q = 0 (c_j = 0, beta = 0) is impossible because beta_i != 0.
import json, os, datetime
import numpy as np, sympy as sp
def F(q):
    h2 = 1 + np.sqrt((8 + q)/q); k2 = 2*(1 - q)*h2; C = (k2 - 1)/(k2 + 1); cicj = np.sqrt(q*(8 + q))/3
    return 2 + 2*q/(1 - q)*k2 + h2**2 - (2 - 2*cicj*C)*6/((1 - q)*(1 - C))
q = np.concatenate([np.logspace(-9, -3, 4001), np.linspace(1e-3, 1 - 1e-3, 2000001), 1 - np.logspace(-3, -9, 4001)]); f = F(q)
sign_changes = [(float(q[k]), float(q[k + 1])) for k in range(len(q) - 1) if f[k]*f[k + 1] < 0]
loc = [k for k in range(1, len(q) - 1) if abs(f[k]) < abs(f[k - 1]) and abs(f[k]) <= abs(f[k + 1]) and abs(f[k]) < 1e-6]
# exact check at q = 1/3 and local order of the zero
Q = sp.symbols('q', positive=True); h2 = 1 + sp.sqrt((8 + Q)/Q); k2 = 2*(1 - Q)*h2; Cs = (k2 - 1)/(k2 + 1)
Fs = 2 + 2*Q/(1 - Q)*k2 + h2**2 - (2 - 2*sp.sqrt(Q*(8 + Q))/3*Cs)*6/((1 - Q)*(1 - Cs))
val = sp.simplify(Fs.subs(Q, sp.Rational(1, 3))); d1 = sp.simplify(sp.diff(Fs, Q).subs(Q, sp.Rational(1, 3))); d2 = sp.simplify(sp.diff(Fs, Q, 2).subs(Q, sp.Rational(1, 3))); d3 = sp.simplify(sp.diff(Fs, Q, 3).subs(Q, sp.Rational(1, 3)))
ident = sp.factor(sp.expand(Q*(8 + Q)*(4*Q**2 - 8*Q + 5)**2 - (4 + 5*Q - 8*Q**2 - 4*Q**3)**2))
out = dict(test='ext-ratio31-1d', utc=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'), gridPoints=len(q), signChangesOfF=sign_changes,
           nearZeros_q=[float(q[k]) for k in loc], F_at_one_third=str(val), dF=str(d1), d2F=str(d2), d3F=str(d3), minAbsF_away=float(abs(f[abs(q - 1/3) > 0.02]).min()),
           F_sign_below=float(np.sign(F(np.array([0.2]))[0])), F_sign_above=float(np.sign(F(np.array([0.5]))[0])),
           at_solution=dict(q=1/3, a2=float((1 - 1/3)/9), kappa2=float(2*(2/3)*(1 + np.sqrt(25.0))), cosgamma=float((8 - 1)/(8 + 1))),
           author_factorisation_checked=str(ident))
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'weber-binding-sphere-gc-review-ext-ratio31-1d.json'), 'w'), indent=1); print(json.dumps(out, indent=1))
