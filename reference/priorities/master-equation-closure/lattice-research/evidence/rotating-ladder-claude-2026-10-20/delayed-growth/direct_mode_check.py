"""Direct check of the assembled characteristic matrix of ladder_char.py, without its first-variation
formulas: every member of rungs |k|<=K0 is moved along its exact circular path plus eta*Re[Q_j(t) w_j c e^{lam t}],
every causal root is re-solved on the perturbed paths, the receiver (also displaced by eta*Re c) gets the
summed acceleration sigma r/(tau^3 D), and a central difference in eta is compared with
Re[-S (Delta - (lam_hat I + J)^2) c] from ladder_char.py truncated at the same rungs.
Units: R = 1, c_f = 1, angular rate eps, lam = lam_hat*eps.
"""
import numpy as np, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from ladder_char import Ladder, J3, I3

def frame(nu, t, eps):
    c, s = np.cos(eps * t), np.sin(eps * t)
    return np.array([[nu * c, -nu * s, 0.0], [nu * s, nu * c, 0.0], [0.0, 0.0, 1.0]])

def accel(eta, delta, eps, lam, q, p, cvec, K0):
    x = np.array([1.0, 0, 0]) + eta * np.real(cvec)
    a = np.zeros(3)
    for nu in (1, -1):
        for k in range(-K0, K0 + 1):
            if nu == 1 and k == 0:
                continue
            sigma = nu * (-1) ** k
            wj = (1.0 if sigma > 0 else p) * np.exp(1j * q * k)
            amp = wj * cvec
            def P(t):
                base = np.array([nu * np.cos(eps * t), nu * np.sin(eps * t), k * delta])
                return base + eta * np.real(frame(nu, t, eps) @ amp * np.exp(lam * t))
            def Pd(t):
                base = np.array([-nu * eps * np.sin(eps * t), nu * eps * np.cos(eps * t), 0.0])
                Q = frame(nu, t, eps)
                return base + eta * np.real((Q @ (eps * J3) + lam * Q) @ amp * np.exp(lam * t))
            tau = np.linalg.norm(x - P(0.0))
            for _ in range(200):
                new = np.linalg.norm(x - P(-tau))
                if abs(new - tau) < 1e-16 * new:
                    tau = new; break
                tau = new
            r = x - P(-tau); n = r / tau
            D = 1 - n @ Pd(-tau)
            a += sigma * r / (tau ** 3 * D)
    return a

out = []
rng = np.random.default_rng(20261020)
delta = 3.3
for eps in (0.05, 0.3):
    for trial in range(3):
        lamh = complex(rng.uniform(0.0, 0.8), rng.uniform(-1.5, 1.5))
        q = rng.uniform(0, np.pi); p = rng.choice([1.0, -1.0])
        cvec = rng.normal(size=3) + 1j * rng.normal(size=3)
        K0 = 6
        L = Ladder(delta, eps, K0, S=1.0)
        B = lamh * I3 + J3
        M = L.Delta(lamh, q, p) - B @ B          # = (1/S)[...] with S = 1
        pred = np.real(-M @ cvec)
        rec = dict(eps=eps, lam_hat=[lamh.real, lamh.imag], q=q, p=p)
        for eta in (1e-3, 1e-4, 1e-5):
            fd = (accel(eta, delta, eps, lamh * eps, q, p, cvec, K0) - accel(-eta, delta, eps, lamh * eps, q, p, cvec, K0)) / (2 * eta)
            rec[f'rel_diff_eta{eta}'] = float(np.linalg.norm(fd - pred) / np.linalg.norm(pred))
        out.append(rec)
        print(json.dumps(rec))
json.dump(out, open(__file__.rsplit('/', 1)[0] + '/direct-mode-check.json', 'w'), indent=1)
