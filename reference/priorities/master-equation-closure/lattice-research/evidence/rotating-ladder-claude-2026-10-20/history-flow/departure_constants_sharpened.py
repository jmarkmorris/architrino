"""OPTIONAL sharpening (Lemma A5' of the certified-constants addendum): replaces the crude bound
M = 2 g Gamma Z of Lemma A5 by the difference bound M' = g Gamma' Z3, Z3 = sum_j ell_j^{-3},
using ||a_j(p) - a_j(0)|| <= g * E(tau_j) <= g Gamma' / tau_j^3 with
E(t) = Dr/((t-th)^2 (t Dmin - Kx)) + t((t-th)^-2 - t^-2)/(t Dmin - Kx) + Kx/(t Dmin (t Dmin - Kx)),
each term times t^3 decreasing in t when Dmin*th <= 2 Kx (checked).  Everything else as in
departure_constants_certified.py (imported).  Outward-rounded mpmath iv.
Usage: python departure_constants_sharpened.py <stage2-certificates.json> <out.json>
"""
import json, sys, os, hashlib
from mpmath import iv, mp
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import departure_constants_certified as DC

iv.dps = 30; mp.dps = 30


def zeta3_iv(K=2000):
    s = iv.mpf(0)
    for m in range(1, K + 1):
        s += 1 / iv.mpf(m)**3
    return s + iv.mpf([0, 1]) / (2 * iv.mpf(K)**2)      # tail in [0, 1/(2K^2)]


def Z3(delta, eps, K=2000):
    own = 2 * zeta3_iv(K) / delta**3
    c = (1 + eps**2)**iv.mpf(1.5)
    other = c / iv.mpf(8)
    for m in range(1, K + 1):
        other += 2 * c / (iv.mpf(m)**2 * delta**2 + 4)**iv.mpf(1.5)
    other += 2 * c * iv.mpf([0, 1]) / (2 * iv.mpf(K)**2 * delta**3)   # (m^2d^2+4)^{3/2} >= (m d)^3
    return own + other


def known_case():
    z = zeta3_iv()
    d = mp.mpf('3.3')
    direct = mp.nsum(lambda m: 1 / (m**2 * d**2 + 4)**1.5, [-mp.inf, mp.inf]) + 2 * mp.zeta(3) / d**3
    zz = Z3(iv.mpf('3.3'), iv.mpf(0))
    ok = (z.a <= mp.zeta(3) <= z.b) and (zz.a <= direct <= zz.b)
    return dict(zeta3_iv=str(z), zeta3=str(mp.zeta(3)), Z3_iv=str(zz), Z3_direct=str(direct), pass_=bool(ok))


def sharpened(delta, eps, g, rp, ct):
    ok, c = DC.constants(delta, eps, g, rp, ct)
    if not ok:
        return False, None
    Dmin = 1 - eps**2
    t = 2 / iv.sqrt(1 + eps**2)
    th = ct * rp
    e1 = iv.exp(eps * th)
    bb = 1 + e1
    sig = 1 / (iv.e * (t - th)); bv = e1 * (eps + sig)
    Kx = th + eps * (e1 - 1) + (1 + e1) * bv * rp + bb * rp * eps * e1 + bb * bv * rp**2
    Dr = (e1 - 1) + bb * rp
    mono = bool((Dmin * th).b <= (2 * Kx).a)
    E = Dr / ((t - th)**2 * (t * Dmin - Kx)) + t * ((t - th)**-2 - t**-2) / (t * Dmin - Kx) + Kx / (t * Dmin * (t * Dmin - Kx))
    Gp = t**3 * E
    Mp = g * Gp * Z3(delta, eps)
    return mono, dict(Gamma_prime=Gp, Z3=Z3(delta, eps), M_prime=Mp, M_crude=c['M'], K1=c['K1'], K2=c['K2'], X=c['X'], theta_bar=c['theta_bar'])


def main(cert_path, out):
    raw = open(cert_path, 'rb').read(); cert = json.loads(raw)
    rec = {'instrument': 'departure_constants_sharpened.py (OPTIONAL improvement)', 'certificate_receipt_sha256': hashlib.sha256(raw).hexdigest(),
           'known_case': known_case()}
    assert rec['known_case']['pass_']
    delta = iv.mpf(cert['box']['delta']); eps = iv.mpf(cert['box']['eps'])
    g = DC.q(cert['g']); lam_lo = DC.q(cert['lam_lo'])
    b0 = DC.q(cert['B3']['b0_upper']); b1 = DC.q(cert['B3']['b1_upper']); mu0 = DC.q(cert['B3']['mu0'])
    h0 = mu0**2 + eps**2 - b0 - b1 * mu0
    assert h0.a > 0
    h_lo = iv.mpf(h0.a)
    best = None; best_eta = None; rows = []
    for x in range(2, 31):
        rp = iv.mpf(x) / 100
        for y in range(40, 101):
            ct = iv.mpf(y) / 20
            mono, c = sharpened(delta, eps, g, rp, ct)
            if c is None:
                continue
            if not mono:
                rows.append(dict(rp=str(rp.a), ctheta=str(ct.a), monotonicity='failed')); break
            eta0 = min((rp / 4).a, (h_lo * rp**2 / (256 * c['M_prime'])).a)
            dstar = (lam_lo * eta0 / (2 * eps)).a
            row = dict(rp=str(rp.a), ctheta=str(ct.a), eta0_lower=str(eta0), dstar_lower=str(dstar), **{k: str(v) for k, v in c.items()})
            rows.append(row)
            if best is None or (eta0 - best_eta).a > 0:
                best = row; best_eta = eta0
            break
    rec['rows'] = rows; rec['best'] = best
    json.dump(rec, open(out, 'w'), indent=1)
    print(json.dumps(rec['known_case'])); print(json.dumps(best, indent=1))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
