"""Outward-rounded evaluation (mpmath 1.3.0 iv) of the explicit analytic constants of the
departure theorem in rotating-ladder-claude-2026-10-20-history-flow.md (Lemmas A3-A5 and the
fixed-point thresholds), for the unit ladder (R = 1, coupling g = K/R, c_f = 1).

Inputs: parameter boxes for delta, eps, lambda_lo and a lower bound h_lo for
h = (2 lambda_lo)^2 + eps^2 - b0(2 lambda_lo) - 2 lambda_lo b1(2 lambda_lo) (certificate B3).
In this receipt h_lo is a FLOAT MEASUREMENT (class_spectrum_float.py), so the resulting eta_0 is
illustrative until certificate B3 is supplied.  Everything else here is interval arithmetic on
the closed forms of the note.

Usage: python departure_constants.py <out.json>
"""
import json, sys
from mpmath import iv, mp

iv.dps = 30
mp.dps = 30


def lattice_Z(delta, eps):
    # sum over sources of 1/ell_j^2: own rail pi^2/(3 delta^2); other rail (1+eps^2)(pi/(2 delta)) coth(2 pi/delta)
    return iv.pi**2 / (3 * delta**2) + (1 + eps**2) * (iv.pi / (2 * delta)) * ((iv.exp(4 * iv.pi / delta) + 1) / (iv.exp(4 * iv.pi / delta) - 1))


def known_case():
    # sum_{m in Z} 1/(m^2 + c^2) = (pi/c) coth(pi c) with c = 2/delta, i.e. sum 1/(m^2 delta^2 + 4) = (pi/(2 delta)) coth(2 pi/delta)
    delta = mp.mpf('3.3')
    direct = mp.nsum(lambda m: 1 / (m**2 * delta**2 + 4), [-mp.inf, mp.inf])
    closed = (mp.pi / (2 * delta)) / mp.tanh(2 * mp.pi / delta)
    own = mp.nsum(lambda m: 1 / (m**2 * delta**2), [1, mp.inf]) * 2
    return {'other_rail_sum_direct': str(direct), 'closed': str(closed),
            'own_rail_direct': str(own), 'own_closed': str(mp.pi**2 / (3 * delta**2)),
            'pass': bool(abs(direct - closed) < mp.mpf(10)**-25 and abs(own - mp.pi**2 / (3 * delta**2)) < mp.mpf(10)**-25)}


def constants(delta, eps, lam, g, rp, ctheta, h_lo):
    one = iv.mpf(1)
    Dmin = 1 - eps**2
    tmin = 2 / iv.sqrt(1 + eps**2)            # lower bound for the shortest delay (rung partner), needs delta >= 2
    th = ctheta * rp                          # bound on the delay perturbation, ||theta|| <= th
    e1 = iv.exp(eps * th)
    sig = iv.mpf(max(float(lam.b), float((1 / (iv.e * (tmin - th))).b)))   # sigma_* upper bound
    bb = 1 + e1                               # ||b|| <= bb rp
    bv = e1 * (eps + sig)                     # ||beta|| <= bv rp, ||d_theta b|| <= bv rp
    den = 2 * tmin * Dmin
    K1 = (th**2 * (1 + eps**2 * e1) + 2 * (1 + e1) * bb * rp + bb**2 * rp**2) / den
    K2 = (2 * th * (1 + eps**2 * e1) + 2 * eps * e1 * bb * rp + 2 * (1 + e1) * bv * rp + 2 * bb * bv * rp**2) / den
    Kx = th + eps * (e1 - 1) + (1 + e1) * bv * rp + bb * rp * eps * e1 + bb * bv * rp**2
    X = Kx / (tmin * Dmin)
    Gam = tmin**2 * (tmin + e1 - 1 + bb * rp) / ((tmin - th)**2 * (tmin * Dmin - Kx))
    Z = lattice_Z(delta, eps)
    M = 2 * g * Gam * Z
    ok = (K1.b <= th.a) and (K2.b <= 0.5) and (X.b < 1) and (th.b < tmin.a) and (float(delta.a) >= 2)
    # eta_0 is a lower bound: take the lower endpoints (outward in the safe direction)
    cand = (h_lo * rp**2 / (256 * M)).a
    eta0 = iv.mpf(min((rp / 4).a, cand))
    return dict(ok=bool(ok), theta_bar=str(th), K1=str(K1), K2=str(K2), X=str(X), Gamma=str(Gam), Z=str(Z), M=str(M),
                M_over_eps2=str(M / eps**2), eta0=str(eta0), departure=str(lam * eta0 / (2 * eps)))


def main(out):
    rec = {'instrument': 'departure_constants.py', 'known_case': known_case()}
    assert rec['known_case']['pass']
    delta = iv.mpf(['3.345035292', '3.345035294'])
    eps = iv.mpf(['0.013840814', '0.013840815'])
    lam = iv.mpf('0.98740') * eps                                          # lambda_lo (placeholder for certificate B2)
    g = iv.mpf('0.001')
    h_lo = iv.mpf('2.05') * eps**2                                         # FLOAT-MEASURED placeholder for certificate B3
    best = None; table = []
    for rp_s in ['0.05', '0.1', '0.15', '0.2', '0.25', '0.3', '0.35', '0.4']:
        rp = iv.mpf(rp_s)
        for c_s in ['2.1', '2.2', '2.3', '2.4', '2.6', '2.8', '3.0', '3.5', '4.0']:
            c = constants(delta, eps, lam, g, rp, iv.mpf(c_s), h_lo)
            if c['ok']:
                table.append(dict(rp=rp_s, ctheta=c_s, **c))
                e = iv.mpf(c['eta0'])
                if best is None or e.a > iv.mpf(best['eta0']).a:
                    best = dict(rp=rp_s, ctheta=c_s, **c)
                break
    rec['inputs'] = dict(delta=str(delta), eps=str(eps), lambda_lo=str(lam), g=str(g), h_lo=str(h_lo),
                         h_lo_grade='float measurement placeholder (certificate B3 pending)',
                         lambda_lo_grade='placeholder (certificate B2 pending)')
    rec['feasible_rows'] = table
    rec['best'] = best
    json.dump(rec, open(out, 'w'), indent=1)
    print(json.dumps(rec['known_case'])); print(json.dumps(best, indent=1))


if __name__ == '__main__':
    main(sys.argv[1])
