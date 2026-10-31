"""Certificate with the balance-speed interval split into M equal sub-intervals (reduces interval dependency).
For every piece U_i: strict opposite signs of det at the bracket endpoints and a derivative enclosure over the
bracket excluding zero.  The bracket is certified if this holds for every piece.
Usage: python leadroot_cert_split.py N M out.json progress.txt"""
import json, sys, time
from mpmath import iv, mpf
from leadroot_iv import Rows, delta_star, det2, ddet2
N, M = int(sys.argv[1]), int(sys.argv[2]); outp = sys.argv[3]; prog = open(sys.argv[4], 'w'); t0 = time.time()
lo, hi = mpf('0.8433854'), mpf('0.8433856')
ds = delta_star()
brackets = (('0.7819', '0.78192'), ('0.781905', '0.781907'))
res = {b: dict(all_signs=True, all_excl=True, fa_hull=None, fb_hull=None, fp_hull=None) for b in brackets}
def hull(h, x):
    return x if h is None else iv.mpf([min(h.a, x.a), max(h.b, x.b)])
for i in range(M):
    a_ = lo + (hi - lo) * i / M; b_ = lo + (hi - lo) * (i + 1) / M
    U = iv.mpf([a_, b_]); U = iv.mpf([U.a, U.b])
    R = Rows(N, -U, ds, p=-1)
    for (a, b) in brackets:
        fa = det2(R.delta_xz(iv.mpf(a))[0]); fb = det2(R.delta_xz(iv.mpf(b))[0])
        Dm, dD, _ = R.delta_xz(iv.mpf([a, b]), deriv=True, lam_lo=iv.mpf(a).a)
        fp = ddet2(Dm, dD)
        r = res[(a, b)]
        r['all_signs'] &= bool(fa.b < 0 and fb.a > 0)
        r['all_excl'] &= bool(fp.a > 0)
        r['fa_hull'] = hull(r['fa_hull'], fa); r['fb_hull'] = hull(r['fb_hull'], fb); r['fp_hull'] = hull(r['fp_hull'], fp)
    prog.write(json.dumps(dict(piece=i, wall_s=time.time() - t0, status={'%s-%s' % k: [v['all_signs'], v['all_excl']] for k, v in res.items()})) + '\n'); prog.flush()
out = dict(N=N, M=M, u_abs_interval=['0.8433854', '0.8433856'], sign_convention='u negative (moving toward -z); +u is the mirror image',
           brackets=[dict(bracket=list(k), certified=bool(v['all_signs'] and v['all_excl']), f_a_hull=[str(v['fa_hull'].a), str(v['fa_hull'].b)],
                          f_b_hull=[str(v['fb_hull'].a), str(v['fb_hull'].b)], f_prime_hull=[str(v['fp_hull'].a), str(v['fp_hull'].b)]) for k, v in res.items()],
           tail=R.tail(mpf('0.7819'))[2], runtime_s=time.time() - t0)
json.dump(out, open(outp, 'w'), indent=1, default=str)
