#!/usr/bin/env python3
"""Containment checks for the fold certificate (exact binary piece intervals recomputed with the
instrument's box_iv; displayed 22-digit boxes compared with a 1e-20 margin).
usage: fold_check.py cover_all.json out.json joins1.json [joins2.json ...]"""
import json, math, sys
from mpmath import iv, mp, mpf
import twisted_certificate as tc
mp.prec = 100
MARG = mpf('1e-20')


def _f(s):
    return float(s.replace('np.float64(', '').rstrip(')'))


def delta_iv(p):
    return tc.box_iv(_f(p['delta_centre']), _f(p['delta_radius']))


def strict_in(inner, outer):
    return all(mpf(a[0]) - MARG > mpf(b[0]) and mpf(a[1]) + MARG < mpf(b[1]) for a, b in zip(inner, outer))


def main():
    P = json.load(open(sys.argv[1]))['pieces']
    byid = {}
    for p in P:
        byid.setdefault(p['piece'], []).append(p)
    P.sort(key=lambda p: _f(p['delta_centre']))
    joins = []
    for f in sys.argv[3:]:
        joins += [j for j in json.load(open(f))['joins'] if 'Z' in j]
    res = []
    for a, b in zip(P, P[1:]):
        ca, cb = _f(a['delta_centre']), _f(b['delta_centre'])
        cand = [j for j in joins if abs(float(j['delta_s']) - 0.5 * (ca + cb)) < 1e-12]
        ok = False
        for j in cand:
            ds = mpf(float(j['delta_s']))
            Da, Db = delta_iv(a), delta_iv(b)
            inD = tc.lo(Da) <= ds <= tc.hi(Da) and tc.lo(Db) <= ds <= tc.hi(Db)
            ok = ok or (j['certified'] and inD and strict_in(j['Z'], a['Y']) and strict_in(j['Z'], b['Y']))
        res.append({'delta_s': repr(0.5 * (ca + cb)), 'joined': bool(ok), 'n_records': len(cand)})
    out = {'pieces': len(P), 'all_pieces_certified': all(p['certified'] for p in P),
           'delta_cover': [mp.nstr(tc.lo(delta_iv(P[0])), 20), mp.nstr(tc.hi(delta_iv(P[-1])), 20)],
           'joins': len(res), 'joins_ok': sum(r['joined'] for r in res),
           'unjoined': [r['delta_s'] for r in res if not r['joined']]}
    # alpha range along the curve: min of K_alpha lower ends, min of K_alpha upper ends
    out['alpha_min_lower_bound'] = mp.nstr(min(mpf(p['K'][2][0]) for p in P) - MARG, 20)
    out['alpha_min_upper_bound'] = mp.nstr(min(mpf(p['K'][2][1]) for p in P) + MARG, 20)
    A = iv.mpf('0.878') * iv.pi
    out['alpha_min_over_pi'] = [mp.nstr((mpf(out['alpha_min_lower_bound'])) / mp.pi, 15),
                                mp.nstr((mpf(out['alpha_min_upper_bound'])) / mp.pi, 15)]
    # sub-pieces (sign certificates) and the alpha = 0.878 pi balances on the curve
    def locate(delta_lo, delta_hi, yb):
        for p in P:
            D = delta_iv(p)
            if tc.lo(D) <= delta_lo and delta_hi <= tc.hi(D) and strict_in(yb, p['Y']):
                return p['delta_centre']
        return None
    for name in ('fold-sign-below.json', 'fold-sign-above.json'):
        s = json.load(open(name))
        D = s['Delta']
        out[name] = {'certified': s['certified'], 'dalpha_ddelta': s['dalpha_ddelta'], 'sign': s['dalpha_ddelta_sign'],
                     'Y_inside_piece_with_centre': locate(mpf(D[0]) - MARG, mpf(D[1]) + MARG, s['Y'])}
    for name in ('krawczyk-alpha-0.878pi-lower.json', 'krawczyk-alpha-0.878pi-upper.json'):
        k = json.load(open(name))
        yb = [k['K'][1], k['K'][2], [mp.nstr(tc.lo(A), 25), mp.nstr(tc.hi(A), 25)]]
        out[name] = {'on_curve_piece_centre': locate(mpf(k['K'][0][0]) - MARG, mpf(k['K'][0][1]) + MARG, yb)}
    json.dump(out, open(sys.argv[2], 'w'), indent=1)
    print(json.dumps(out, indent=1))


if __name__ == '__main__':
    main()
