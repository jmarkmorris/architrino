"""Certified evaluation of the departure-theorem constants of
analysis/rotating-ladder-claude-2026-10-20-history-flow.md (Lemmas A4, A5, A8 and Section 3),
using the certified B0 box and the certified B1/B3 rationals read from
spectral-certificate/stage2-certificates.json.  Outward-rounded mpmath 1.3.0 iv arithmetic.

Formulas are those of the frozen departure_constants.py (copied, not imported, so the frozen file
is untouched); the only changes are: inputs are read from the certificate receipt as exact
rationals; h0 is recomputed here from b0_upper, b1_upper, mu0 = 2 lambda_lo and the eps box (a unit
check against the receipt); eta0 and d* use lambda_lo and eps_hi; a finer (r_p, c_theta) grid.

Usage: python departure_constants_certified.py <stage2-certificates.json> <out.json>
"""
import json, sys, hashlib
from fractions import Fraction
from mpmath import iv, mp

iv.dps = 30
mp.dps = 30


def q(s):
    f = Fraction(s)
    return iv.mpf(f.numerator) / iv.mpf(f.denominator)


def lattice_Z(delta, eps):
    return iv.pi**2 / (3 * delta**2) + (1 + eps**2) * (iv.pi / (2 * delta)) * ((iv.exp(4 * iv.pi / delta) + 1) / (iv.exp(4 * iv.pi / delta) - 1))


def known_case():
    delta = mp.mpf('3.3')
    direct = mp.nsum(lambda m: 1 / (m**2 * delta**2 + 4), [-mp.inf, mp.inf])
    closed = (mp.pi / (2 * delta)) / mp.tanh(2 * mp.pi / delta)
    own = mp.nsum(lambda m: 1 / (m**2 * delta**2), [1, mp.inf]) * 2
    ivZ = lattice_Z(iv.mpf('3.3'), iv.mpf(0))
    ok = abs(direct - closed) < mp.mpf(10)**-25 and abs(own - mp.pi**2 / (3 * delta**2)) < mp.mpf(10)**-25
    ok = ok and (ivZ.a <= direct + own <= ivZ.b)
    # Fraction -> interval parser known case: 1/3 must be enclosed
    t = q('1/3'); ok = ok and (t.a <= mp.mpf(1) / 3 <= t.b) and (t.b - t.a) < mp.mpf(10)**-28
    return {'direct_other': str(direct), 'closed_other': str(closed), 'own_direct': str(own),
            'own_closed': str(mp.pi**2 / (3 * delta**2)), 'iv_Z_at_eps0': str(ivZ), 'pass': bool(ok)}


def constants(delta, eps, g, rp, ctheta):
    Dmin = 1 - eps**2
    tmin = 2 / iv.sqrt(1 + eps**2)
    th = ctheta * rp
    e1 = iv.exp(eps * th)
    sig = 1 / (iv.e * (tmin - th))
    bb = 1 + e1
    bv = e1 * (eps + sig)
    den = 2 * tmin * Dmin
    K1 = (th**2 * (1 + eps**2 * e1) + 2 * (1 + e1) * bb * rp + bb**2 * rp**2) / den
    K2 = (2 * th * (1 + eps**2 * e1) + 2 * eps * e1 * bb * rp + 2 * (1 + e1) * bv * rp + 2 * bb * bv * rp**2) / den
    Kx = th + eps * (e1 - 1) + (1 + e1) * bv * rp + bb * rp * eps * e1 + bb * bv * rp**2
    X = Kx / (tmin * Dmin)
    Gam = tmin**2 * (tmin + e1 - 1 + bb * rp) / ((tmin - th)**2 * (tmin * Dmin - Kx))
    Z = lattice_Z(delta, eps)
    M = 2 * g * Gam * Z
    ok = (K1.b <= th.a) and (K2.b <= 0.5) and (X.b < 1) and (th.b < tmin.a)
    return ok, dict(theta_bar=th, K1=K1, K2=K2, X=X, Gamma=Gam, Z=Z, M=M)


def main(cert_path, out):
    raw = open(cert_path, 'rb').read()
    cert = json.loads(raw)
    rec = {'instrument': 'departure_constants_certified.py', 'certificate_receipt': cert_path,
           'certificate_receipt_sha256': hashlib.sha256(raw).hexdigest(), 'known_case': known_case()}
    assert rec['known_case']['pass']
    delta = iv.mpf([cert['box']['delta'][0], cert['box']['delta'][1]])
    eps = iv.mpf([cert['box']['eps'][0], cert['box']['eps'][1]])
    g = q(cert['g'])
    lam_lo = q(cert['lam_lo']); lam_hi = q(cert['lam_hi'])
    b0 = q(cert['B3']['b0_upper']); b1 = q(cert['B3']['b1_upper'])
    mu0 = q(cert['B3']['mu0'])
    checks = {}
    checks['mu0_equals_2_lam_lo'] = bool(Fraction(cert['B3']['mu0']) == 2 * Fraction(cert['lam_lo']))
    checks['B1_certified'] = bool(cert['B1']['certified_B1'] and cert['B1']['opposite_strict_signs'])
    checks['lam_lo_positive'] = bool(lam_lo.a > 0)
    checks['lam_hi_lt_eps_lo'] = bool(lam_hi.b < eps.a)
    checks['delta_ge_2'] = bool(delta.a >= 2)
    checks['eps_le_half'] = bool(eps.b <= 0.5)
    checks['b0_gt_eps2'] = bool(b0.a > (eps**2).b)
    h0 = mu0**2 + eps**2 - b0 - b1 * mu0
    checks['h0_positive'] = bool(h0.a > 0)
    h0_rep = q(cert['B3']['h0_lower'])
    checks['h0_recomputed_vs_receipt_lower_reldiff'] = float(mp.mpf((abs(h0.a - h0_rep.a) / h0_rep.a).b))
    checks['h0_units_check_pass'] = bool((abs(h0.a - h0_rep.a) / h0_rep.a).b < 1e-6)
    assert all(v for k, v in checks.items() if k.endswith(('certified', 'positive', 'eps_lo', 'ge_2', 'half', 'eps2', 'pass', 'lam_lo')))
    h_lo = iv.mpf(h0.a)   # lower endpoint only
    rows = []; best = None; best_eta = None
    rps = [iv.mpf(x) / 100 for x in range(2, 31)]
    cts = [iv.mpf(x) / 20 for x in range(40, 101)]
    for rp in rps:
        for ct in cts:
            ok, c = constants(delta, eps, g, rp, ct)
            if not ok:
                continue
            eta0 = min((rp / 4).a, (h_lo * rp**2 / (256 * c['M'])).a)
            dstar = (lam_lo * iv.mpf(eta0) / (2 * eps)).a
            row = dict(rp=str(rp.a), ctheta=str(ct.a), eta0_lower=str(eta0), dstar_lower=str(dstar),
                       **{k: str(v) for k, v in c.items()})
            rows.append(row)
            if best is None or (eta0 - best_eta).a > 0:
                best = row; best_eta = eta0
            break   # smallest feasible c_theta for this r_p
    rec['inputs'] = dict(delta=str(delta), eps=str(eps), g=str(g), lambda_lo=str(lam_lo), lambda_hi=str(lam_hi),
                         b0_upper=str(b0), b1_upper=str(b1), mu0=str(mu0), h0_recomputed=str(h0))
    rec['checks'] = checks
    rec['feasible_rows'] = rows
    rec['best'] = best
    json.dump(rec, open(out, 'w'), indent=1)
    print(json.dumps(rec['known_case'])); print(json.dumps(checks, indent=1)); print(json.dumps(best, indent=1))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
