"""PI interval certificate for the non-rotating translating untwisted ladder (c_f = K = 1, lengths in R).
A_r(u) = -sqrt(1-u^2)/4 - 4 sum_{k>=1} (-1)^k T_k(u),
T_k = (a(1+u^2) + 4(1-u^2)) / (sqrt(a + 4(1-u^2)) (a+4)^2),  a = (k delta)^2.
Tail |sum_{k>N}(-1)^k T_k| <= sum 2/(k delta)^3 <= 1/(delta^3 N^2)  (times 4 in A_r: 4/(delta^3 N^2)).
dT_k/du = u [2(a-4) S^2 + 4 Nn] / (S^3 (a+4)^2), |dT_k/du| <= 3|u|/(k delta)^3 for a >= 4.
"""
import sys, json, time
from mpmath import iv, mp
iv.dps = 30
def Ar(u, delta, N):
    s = -iv.sqrt(1-u*u)/4
    acc = iv.mpf(0)
    for k in range(1, N+1):
        a = (k*delta)**2
        T = (a*(1+u*u) + 4*(1-u*u)) / (iv.sqrt(a + 4*(1-u*u)) * (a+4)**2)
        acc += T if k % 2 == 0 else -T
    tail = 4/(delta**3 * N**2)          # bound on 4*|tail of sum|
    return s - 4*acc + iv.mpf([-1,1])*tail
def dAr(u, delta, N):
    s = u/(4*iv.sqrt(1-u*u))
    acc = iv.mpf(0)
    for k in range(1, N+1):
        a = (k*delta)**2
        S2 = a + 4*(1-u*u); S = iv.sqrt(S2); Nn = a*(1+u*u) + 4*(1-u*u)
        dT = u*(2*(a-4)*S2 + 4*Nn)/(S2*S*(a+4)**2)
        acc += dT if k % 2 == 0 else -dT
    tail = 4*3*abs(u).b/(delta**3 * N**2) if hasattr(abs(u),'b') else None
    tail = 4*3*iv.mpf(max(abs(u.a),abs(u.b)))/(delta**3*N**2)
    return s - 4*acc + iv.mpf([-1,1])*tail
if __name__ == "__main__":
    out = {}
    t0 = time.time()
    # Known case 1: u = 0 equals minus the static inward sum S0(delta) = sum_k 2(-1)^k/(4+k^2 delta^2)^{3/2} (direct 30-digit nsum)
    mp.dps = 30
    d3 = iv.mpf(3)
    S0 = mp.nsum(lambda k: 2*(-1)**int(k)/(4+k**2*9)**mp.mpf(1.5), [-mp.inf, mp.inf])
    A0 = Ar(iv.mpf(0), d3, 2000)
    out['KC1_u0_static'] = dict(Ar=str(A0), minus_S0=str(-S0), contains=bool(A0.a <= -S0 <= A0.b))
    # Known case 2: compare with the PI raw-law float evaluator at u = 0.5, delta = 3 (radial component)
    sys.path.insert(0, '/Users/markmorris/vibe/architrino/.tmp/rotating-ladder/pi')
    import numpy as np
    from helix_pi_check import helix_accel
    araw = helix_accel(1.0, 3.0, 0.0, 0.5, np.pi, 4000)
    A05 = Ar(iv.mpf('0.5'), d3, 4000)
    out['KC2_raw_law_u05'] = dict(Ar_interval=str(A05), raw_float=float(araw[0]), raw_axial=float(araw[2]), raw_tangential=float(araw[1]),
                                  diff=float(araw[0]) - float(A05.mid))
    ok = out['KC1_u0_static']['contains'] and abs(out['KC2_raw_law_u05']['diff']) < 1e-9
    out['controls_pass'] = bool(ok)
    print(json.dumps(out, indent=1)); sys.stdout.flush()
    if not ok: sys.exit(1)
    # Target: delta* = 2 pi / arccosh(3 + sqrt 10)
    c = 3 + iv.sqrt(10)
    y = iv.log(c + iv.sqrt(c*c - 1))
    dstar = 2*iv.pi/y
    N = int(sys.argv[1]) if len(sys.argv) > 1 else 20000
    ulo, uhi = iv.mpf(sys.argv[2]), iv.mpf(sys.argv[3])
    Alo, Ahi = Ar(ulo, dstar, N), Ar(uhi, dstar, N)
    U = iv.mpf([ulo.a, uhi.b])
    dA = dAr(U, dstar, N)
    res = dict(delta_star=str(dstar), N=N, u_lo=str(ulo), u_hi=str(uhi), Ar_lo=str(Alo), Ar_hi=str(Ahi), dAr_over_U=str(dA),
               sign_change=bool((Alo.b < 0 and Ahi.a > 0) or (Alo.a > 0 and Ahi.b < 0)),
               derivative_excludes_zero=bool(dA.a > 0 or dA.b < 0),
               speed_below_one=bool(uhi.b < 1), wall_s=time.time()-t0)
    res['certified'] = res['sign_change'] and res['derivative_excludes_zero'] and res['speed_below_one']
    out['target'] = res
    print(json.dumps(res, indent=1))
    json.dump(out, open(sys.argv[4], 'w'), indent=1)
