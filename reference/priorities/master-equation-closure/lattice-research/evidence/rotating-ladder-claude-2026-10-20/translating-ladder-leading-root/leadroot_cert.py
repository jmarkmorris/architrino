"""Certificate: det of the (x,z) block of Delta(lam; q=0, p=-1) has exactly one zero in each bracket, for every
u in -[0.8433854, 0.8433856] and delta = delta* (enclosed).  At q = 0 and real lam every term is real.
Strict opposite signs at the bracket endpoints (intermediate value theorem; the determinant is continuous in lam)
and a derivative enclosure over the bracket that excludes zero (uniqueness).  Usage: python leadroot_cert.py N"""
import json, sys, time
from mpmath import iv
from leadroot_iv import Rows, delta_star, det2, ddet2, U_ABS
N = int(sys.argv[1]); t0 = time.time()
R = Rows(N, -U_ABS, delta_star(), p=-1); tb = time.time() - t0
out = dict(N=N, u_interval=['-0.8433856', '-0.8433854'], build_s=tb, brackets=[])
for a, b in (('0.7818', '0.7820'), ('0.7819', '0.78192'), ('0.781905', '0.781907'), ('0.7819059', '0.7819061'), ('0.78190600', '0.78190607')):
    Da, ia = R.delta_xz(iv.mpf(a)); Db, ib = R.delta_xz(iv.mpf(b))
    fa, fb = det2(Da), det2(Db)
    lam = iv.mpf([a, b])
    Dm, dD, idd = R.delta_xz(lam, deriv=True, lam_lo=iv.mpf(a).a)
    fp = ddet2(Dm, dD)
    signs = (fa.b < 0 and fb.a > 0) or (fa.a > 0 and fb.b < 0)
    excl = fp.a > 0 or fp.b < 0
    out['brackets'].append(dict(bracket=[a, b], f_a=[str(fa.a), str(fa.b)], f_b=[str(fb.a), str(fb.b)], f_prime=[str(fp.a), str(fp.b)],
                                opposite_strict_signs=bool(signs), derivative_excludes_zero=bool(excl), certified=bool(signs and excl),
                                tail_endpoint=ia, tail_bracket=idd))
    print(a, b, bool(signs), bool(excl), str(fa), str(fb), str(fp), flush=True)
out['runtime_s'] = time.time() - t0
json.dump(out, open('leadroot_cert_N%d.json' % N, 'w'), indent=1, default=str)
