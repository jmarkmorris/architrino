#!/usr/bin/env python3
"""Assembly after the remaining patches: contiguous joined chain from both patch receipts, the
0.878 pi balances located on chain pieces, sign sub-pieces on the chain.
usage: fold_final2.py cover_all.json out.json patches1.json patches2.json"""
import json, sys
from mpmath import mp, mpf, iv
import twisted_certificate as tc
from fold_check import _f, delta_iv, strict_in, MARG
mp.prec = 100


def main():
    P = json.load(open(sys.argv[1]))['pieces']; P.sort(key=lambda p: _f(p['delta_centre']))
    ok = set()
    for f in sys.argv[3:]:
        ok |= {p['pair'] for p in json.load(open(f))['patches'] if p.get('ok')}
    runs, cur = [], [0]
    for i in range(len(P) - 1):
        if i in ok:
            cur.append(i + 1)
        else:
            runs.append(cur); cur = [i + 1]
    runs.append(cur)
    best = max(runs, key=len)
    chain = [P[i] for i in best]
    out = {'pieces': len(P), 'pairs': len(P) - 1, 'pairs_joined': len(ok),
           'unjoined_pairs': [i for i in range(len(P) - 1) if i not in ok],
           'chain_pieces': [best[0], best[-1]],
           'chain_delta': [mp.nstr(tc.lo(delta_iv(chain[0])), 20), mp.nstr(tc.hi(delta_iv(chain[-1])), 20)]}
    A = iv.mpf('0.878') * iv.pi
    for name in ('krawczyk-alpha-0.878pi-lower.json', 'krawczyk-alpha-0.878pi-upper.json'):
        k = json.load(open(name))
        yb = [k['K'][1], k['K'][2], [mp.nstr(tc.lo(A) - MARG, 25), mp.nstr(tc.hi(A) + MARG, 25)]]
        dl, dh = mpf(k['K'][0][0]) - MARG, mpf(k['K'][0][1]) + MARG
        hits = [p['delta_centre'] for p in chain if tc.lo(delta_iv(p)) <= dl and dh <= tc.hi(delta_iv(p))
                and strict_in(yb, p['Y'])]
        out[name] = {'on_chain_piece': hits}
    for name in ('fold-sign-below.json', 'fold-sign-above.json', 'fold-sign-below-inner.json', 'fold-sign-above-inner.json'):
        s = json.load(open(name)); D = [mpf(s['Delta'][0]), mpf(s['Delta'][1])]
        hits = [p['delta_centre'] for p in chain if tc.lo(delta_iv(p)) < D[1] - MARG and tc.hi(delta_iv(p)) > D[0] + MARG
                and strict_in(s['Y'], p['Y'])]
        out[name] = {'dalpha_ddelta': s['dalpha_ddelta'], 'sign': s['dalpha_ddelta_sign'], 'on_chain_overlaps': hits}
    json.dump(out, open(sys.argv[2], 'w'), indent=1)
    print(json.dumps(out, indent=1))


if __name__ == '__main__':
    main()
