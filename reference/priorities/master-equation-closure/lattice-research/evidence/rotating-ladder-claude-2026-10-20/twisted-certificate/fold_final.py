#!/usr/bin/env python3
"""Final assembly of the fold certificate: contiguous chain of spacing pieces joined by certified
gap patches; sign sub-pieces on the chain; alpha_min enclosure over the chain.
usage: fold_final.py cover_all.json patches.json out.json sign_below.json sign_above.json"""
import json, sys
from mpmath import mp, mpf, iv
import twisted_certificate as tc
from fold_check import _f, delta_iv, strict_in, MARG
mp.prec = 100
P = json.load(open(sys.argv[1]))['pieces']; P.sort(key=lambda p: _f(p['delta_centre']))
ok = {p['pair'] for p in json.load(open(sys.argv[2]))['patches'] if p.get('ok')}
runs, cur = [], [0]
for i in range(len(P) - 1):
    if i in ok:
        cur.append(i + 1)
    else:
        runs.append(cur); cur = [i + 1]
runs.append(cur)
best = max(runs, key=len)
chain = [P[i] for i in best]
out = {'pieces': len(P), 'patches_ok': len(ok), 'chain_pieces': [best[0], best[-1]],
       'chain_delta': [mp.nstr(tc.lo(delta_iv(chain[0])), 20), mp.nstr(tc.hi(delta_iv(chain[-1])), 20)]}
for name in sys.argv[4:6]:
    s = json.load(open(name)); D = [mpf(s['Delta'][0]), mpf(s['Delta'][1])]
    hits = [p['delta_centre'] for p in chain if tc.lo(delta_iv(p)) < D[1] - MARG and tc.hi(delta_iv(p)) > D[0] + MARG
            and strict_in(s['Y'], p['Y'])]
    out[name] = {'certified': s['certified'], 'Delta': s['Delta'], 'dalpha_ddelta': s['dalpha_ddelta'],
                 'sign': s['dalpha_ddelta_sign'], 'overlapping_chain_pieces_with_Y_inside': hits}
lo_b = min(mpf(p['K'][2][0]) for p in chain) - MARG
hi_b = min(mpf(p['K'][2][1]) for p in chain) + MARG
out['alpha_min_enclosure_rad'] = [mp.nstr(lo_b, 18), mp.nstr(hi_b, 18)]
out['alpha_min_over_pi_outward'] = [mp.nstr(lo_b / mp.pi - mpf('1e-15'), 15), mp.nstr(hi_b / mp.pi + mpf('1e-15'), 15)]
imin = min(range(len(chain)), key=lambda i: mpf(chain[i]['K'][2][0]))
out['piece_with_lowest_alpha'] = {'Delta': chain[imin]['Delta'], 'K': chain[imin]['K']}
json.dump(out, open(sys.argv[3], 'w'), indent=1)
print(json.dumps(out, indent=1))
