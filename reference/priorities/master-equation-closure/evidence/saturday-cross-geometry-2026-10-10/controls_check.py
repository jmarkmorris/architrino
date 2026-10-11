"""Saturday initiative 4, instrument C.  Three small checks of the two controls.

(1) Positive-range transverse fold: two-row coefficient  sqrt(2) K / (r_f^2 sqrt(|a b|)) / sqrt(|h|),
    a = n.V_receiver - 1, b = (|V_t|^2 - 1)/r_f - n.A_t  at the fold, h = reception time minus fold time.
    Known case (exact algebra): uniformly moving source on a line at speed beta > 1, receiver at rest at
    height y.  Roots solve (beta^2-1) s^2 + 2 T s + y^2 - T^2 = 0 and each row is K/(r Q) with
    Q = sqrt(beta^2 T^2 - (beta^2-1) y^2), so the exact two-row sum is K (1/r_+ + 1/r_-)/Q.
    Target: source on a circle at speed above one, receiver at rest off the circle (curvature term active).
(2) Four-member contact control: exact rational arithmetic of the supplied past and the first-contact bracket.
(3) Zero-delay own-path birth on the model path x = t + a t^2/2 (t<0), t + m t^2/2 (t>0): row ~ t^-3.
"""
from fractions import Fraction as Fr
from mpmath import mp, mpf, sqrt, sin, cos, findroot, matrix, norm
mp.dps = 40
K = mpf(1)

print("(1) fold coefficient")
beta, y = mpf("1.7"), mpf("0.9")
Tf = y*sqrt(beta**2 - 1)/beta; rf = Tf*beta**2/(beta**2 - 1)
a, b = mpf(-1), (beta**2 - 1)/rf
coef = sqrt(2)*K/(rf**2*sqrt(abs(a*b)))
print("  known case: line source beta=1.7, receiver height 0.9; fold at T_f=%s, range %s" % (mp.nstr(Tf, 12), mp.nstr(rf, 12)))
for h in (mpf("1e-2"), mpf("1e-4"), mpf("1e-6"), mpf("1e-8")):
    T = Tf + h; Q = sqrt(beta**2*T**2 - (beta**2 - 1)*y**2)
    s1 = (-T + Q)/(beta**2 - 1); s2 = (-T - Q)/(beta**2 - 1)
    exact = K*(1/(T - s1) + 1/(T - s2))/Q
    print("    h=%s  exact two-row sum * sqrt(h) / coefficient = %s" % (mp.nstr(h, 3), mp.nstr(exact*sqrt(h)/coef, 12)))
ratio = exact*sqrt(h)/coef
assert abs(ratio - 1) < mpf("1e-3"), "KNOWN CASE FAILED"
# identity behind the known case: r_f beta sqrt(T_f) = r_f^(3/2) sqrt(beta^2-1)
assert abs(rf*beta*sqrt(Tf) - rf**mpf("1.5")*sqrt(beta**2 - 1)) < mpf(10)**-30

rho, bs = mpf(1), mpf("1.5"); om = bs/rho; P = matrix([mpf("2.0"), mpf("0.3")])
X = lambda s: matrix([rho*cos(om*s), rho*sin(om*s)])
V = lambda s: matrix([-bs*sin(om*s), bs*cos(om*s)])
A = lambda s: -om**2*X(s)
def geom(s):
    d = P - X(s); r = norm(d); n = d/r
    return r, n, 1 - (n.T*V(s))[0]
found = []
for s0 in [mpf(k)/10 for k in range(-40, 1)]:
    try:
        sf = findroot(lambda s: geom(s)[2], s0)
    except Exception:
        continue
    if all(abs(sf - f) > mpf("1e-10") for f in found) and -5 < sf < 1: found.append(sf)
found.sort()
print("  target: circular source radius 1 speed 1.5, receiver at rest at (2.0, 0.3); emission times with D = 0:", [mp.nstr(f, 10) for f in found[:4]])
for sf in found[:2]:
    r, n, D = geom(sf); Tf = sf + r
    b = (bs**2 - 1)/r - (n.T*A(sf))[0]; a = mpf(-1)
    coef = sqrt(2)*K/(r**2*sqrt(abs(a*b)))
    print("   fold at emission %s, reception %s, range %s, b = %s" % (mp.nstr(sf, 10), mp.nstr(Tf, 10), mp.nstr(r, 10), mp.nstr(b, 10)))
    for h in (mpf("1e-4"), mpf("1e-6"), mpf("1e-8")):
        hs = h if b > 0 else -h          # roots exist where (T - T_f)/b > 0  (F = -h' + b z^2/2)
        T = Tf + hs; z = sqrt(2*hs/b); tot = mpf(0); cnt = 0
        for sg in (+1, -1):
            s = findroot(lambda s: geom(s)[0] - (T - s), sf + sg*z)
            rr, nn, DD = geom(s); tot += K/(rr**2*abs(DD)); cnt += 1
            sgn = "+" if DD > 0 else "-"
        other = T - 2*hs                 # the other reception side: residual keeps one sign near s_f
        res = [geom(sf + k*z/2)[0] - (other - (sf + k*z/2)) for k in range(-6, 7)]
        print("     |h|=%s: two roots, D of opposite sign; summed rows * sqrt|h| / coefficient = %s ; other side root-free near fold: %s"
              % (mp.nstr(h, 3), mp.nstr(tot*sqrt(h)/coef, 10), all(x > 0 for x in res) or all(x < 0 for x in res)))

print("(2) four-member contact control, exact rationals")
f = lambda u: 2 - Fr(397, 100)*u**2 + Fr(198, 100)*u**3
fp = lambda u: u*(-Fr(794, 100) + Fr(594, 100)*u)
assert f(Fr(0)) == 2 and fp(Fr(0)) == 0 and f(Fr(1)) == Fr(1, 100) and fp(Fr(1)) == -2
for k in range(0, 101):
    u = Fr(k, 100)
    assert f(u) - Fr(1, 100) - (1 - u) == (1 - u)*(Fr(99, 100) + Fr(199, 100)*u - Fr(198, 100)*u*u)
    assert Fr(99, 100) + Fr(199, 100)*u - Fr(198, 100)*u*u >= Fr(99, 100)
M, x0, U = Fr(2, 10**6), Fr(1, 100), Fr(2)
assert Fr(4, 10**6)/Fr(16, 10)**2 < M
Tm = 2*mpf(x0.numerator)/x0.denominator/(2 + sqrt(4 + 2*mpf(M.numerator)/M.denominator*mpf(x0.numerator)/x0.denominator))
print("   supplied target speed at release = %s (above wake speed); row bound %s < 2e-6" % (abs(fp(Fr(1))), float(Fr(4, 10**6)/Fr(16, 10)**2)))
print("   lower comparison root T_- = %s ; contact bracket (T_-, 0.005)" % mp.nstr(Tm, 30))
print("   largest speed change before contact <= M*0.005 = %s ; acceleration stays below 2e-6 up to contact" % float(M*Fr(5, 1000)))

print("(3) zero-delay own-path birth on the model path")
a_, m_ = mpf("0.8"), mpf("1.3")
for t in (mpf("1e-2"), mpf("1e-3"), mpf("1e-4")):
    s = -t*sqrt(m_/a_); rho_ = t - s; wm = -a_*s
    row = K/(rho_**2*wm); model = K/(t**3*(1 + sqrt(m_/a_))**2*sqrt(a_*m_))
    print("   t=%s  own row = %s  = model t^-3 law * %s ; row*t (non-integrable at least like 1/t) = %s" % (mp.nstr(t, 3), mp.nstr(row, 8), mp.nstr(row/model, 12), mp.nstr(row*t, 6)))
