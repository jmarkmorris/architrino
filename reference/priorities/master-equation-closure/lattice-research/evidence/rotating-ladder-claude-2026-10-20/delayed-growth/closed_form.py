"""Closed forms for the first-order growth coefficients at q = 0, with an interval enclosure of c_1
for the in-step pair.

In-step pair (p = +1, q = 0), y = y_* root of y sinh y = 6, delta = 2 pi / y:
  S_0   = sum_k 2(-1)^k (4 + k^2 delta^2)^(-3/2) = (y^2/pi) sum_{m>=0} (2m+1) K_1((2m+1) y)
  T_5   = sum_k (-1)^k (4 + k^2 delta^2)^(-5/2)
  Omega_0^2 = 4 - 24 T_5 / S_0
  m_r S_0 = -(y^2/24 + y^4 cosh y / 144) = -beta_* delta_*,   m_t S_0 = B(delta_*) = 0
  c_1   = beta_* delta_* (2 - Omega_0^2) / (2 S_0 Omega_0^2)
p = -1, q = 0:
  k_t S_0 = (7/2) zeta(3)/delta^3 - 2 U_3,  k_r S_0 = k_t S_0 + 24 U_5,  U_m = sum_{k odd} (4+k^2 delta^2)^(-m/2)
  m_r S_0 = y^2/12 + y^4/144,  m_t S_0 = y^2/12 - (y/4) coth y
  modes: (Omega^2 + 1 - k_r)(Omega^2 + 1 - k_t) = 4 Omega^2, c = (a, i b), b = (Omega^2 + 1 - k_r) a / (2 Omega)
  c_1 = [m_r a(Omega a - b) + m_t b(Omega b - a)] / (2 [a(Omega a - b) + b(Omega b - a)])
"""
import json, sys
import mpmath as mp
from mpmath import iv

mp.mp.dps = 40
out = {}

# ---------- known cases for the alternating-sum enclosure (Leibniz bracket in interval arithmetic)
def alt_sum_enclosure(term, K):
    """sum_{k in Z} (-1)^k term(k) for term even, positive, decreasing in |k|>=0:
    partial sums P_K = term(0) + 2 sum_{k=1}^K (-1)^k term(k); the limit lies between P_K and P_{K+1}."""
    s = term(0)
    for k in range(1, K + 1):
        s = s + 2 * (-1) ** k * term(k)
    s2 = s + 2 * (-1) ** (K + 1) * term(K + 1)
    return iv.mpf([min(s.a, s2.a), max(s.b, s2.b)])

iv.dps = 45
isinh = lambda x: (iv.exp(x) - iv.exp(-x)) / 2
icosh = lambda x: (iv.exp(x) + iv.exp(-x)) / 2
c = iv.mpf('0.7')
enc = alt_sum_enclosure(lambda k: 1 / (iv.mpf(k) ** 2 + c ** 2), 400)
exact = mp.pi / (mp.mpf('0.7') * mp.sinh(mp.pi * mp.mpf('0.7')))
out['known_case_1'] = dict(enclosure=[str(enc.a), str(enc.b)], closed_form=str(exact), contains=bool(enc.a <= exact <= enc.b))
enc2 = alt_sum_enclosure(lambda k: (1 / iv.mpf(k) ** 2) if k else iv.mpf(0), 400)
out['known_case_2'] = dict(enclosure=[str(enc2.a), str(enc2.b)], closed_form=str(-mp.pi ** 2 / 6),
                           contains=bool(enc2.a <= -mp.pi ** 2 / 6 <= enc2.b))

# ---------- y_* enclosure by sign change of y sinh y - 6
ys = mp.findroot(lambda y: y * mp.sinh(y) - 6, 1.878)
lo, hi = ys - mp.mpf('1e-30'), ys + mp.mpf('1e-30')
f = lambda y: iv.mpf(y) * isinh(iv.mpf(y)) - 6
assert f(lo).b < 0 and f(hi).a > 0
Y = iv.mpf([lo, hi])
out['y_star'] = str(ys)
D = 2 * iv.pi / Y

K = 3000
S0 = alt_sum_enclosure(lambda k: 2 / (4 + iv.mpf(k) ** 2 * D ** 2) ** iv.mpf(1.5), K)
T5 = alt_sum_enclosure(lambda k: 1 / (4 + iv.mpf(k) ** 2 * D ** 2) ** iv.mpf(2.5), K)
Om2 = 4 - 24 * T5 / S0
bd = Y ** 2 / 24 + Y ** 4 * icosh(Y) / 144
c1 = bd * (2 - Om2) / (2 * S0 * Om2)
out['in_step'] = dict(S0=[str(S0.a), str(S0.b)], T5=[str(T5.a), str(T5.b)],
                      Omega0=[str(iv.sqrt(Om2).a), str(iv.sqrt(Om2).b)],
                      beta_delta=[str(bd.a), str(bd.b)], m_r=[str((-bd / S0).a), str((-bd / S0).b)],
                      c1=[str(c1.a), str(c1.b)])
# Bessel form of S_0 (exponentially convergent), float check
y = ys
S0_bessel = (y ** 2 / mp.pi) * mp.nsum(lambda m: (2 * m + 1) * mp.besselk(1, (2 * m + 1) * y), [0, mp.inf])
out['S0_bessel'] = str(S0_bessel)
# beta_* delta_* / 8 = sum (-1)^k/(4+k^2 delta^2)^2 (identity used for m_r)
d = 2 * mp.pi / y
alt4 = mp.nsum(lambda k: (-1) ** int(k) / (4 + k ** 2 * d ** 2) ** 2, [-mp.inf, mp.inf])
out['identity_alt4_vs_beta_delta_over_8'] = [str(alt4), str((y ** 2 / 24 + y ** 4 * mp.cosh(y) / 144) / 8)]

# ---------- p = -1, q = 0 (40-digit float; positive sums over odd k with integral tail bound)
S0f = (y ** 2 / mp.pi) * mp.nsum(lambda m: (2 * m + 1) * mp.besselk(1, (2 * m + 1) * y), [0, mp.inf])
U = {}
for m in (3, 5):
    U[m] = 2 * mp.nsum(lambda j: (4 + (2 * j + 1) ** 2 * d ** 2) ** (-mp.mpf(m) / 2), [0, mp.inf])
kt = (mp.mpf(7) / 2 * mp.zeta(3) / d ** 3 - 2 * U[3]) / S0f
kr = kt + 24 * U[5] / S0f
mr = (y ** 2 / 12 + y ** 4 / 144) / S0f
mt = (y ** 2 / 12 - (y / 4) * mp.coth(y)) / S0f
# Omega^2 roots of (x + 1 - kr)(x + 1 - kt) = 4x
A1 = 1 - kr; A2 = 1 - kt
# x^2 + (A1 + A2 - 4) x + A1 A2 = 0
bq = A1 + A2 - 4; cq = A1 * A2
modes = []
for sgn in (+1, -1):
    x = (-bq + sgn * mp.sqrt(bq ** 2 - 4 * cq)) / 2
    Om = mp.sqrt(x)
    a = mp.mpf(1); b = (x + 1 - kr) * a / (2 * Om)
    wr = a * (Om * a - b); wt = b * (Om * b - a)
    c1m = (mr * wr + mt * wt) / (2 * (wr + wt))
    modes.append(dict(Omega0=str(Om), b_over_a=str(b), c1=str(c1m), weight_r=str(wr / (wr + wt)), weight_t=str(wt / (wr + wt))))
out['p_minus'] = dict(k_r=str(kr), k_t=str(kt), m_r=str(mr), m_t=str(mt), modes=modes)
print(json.dumps(out, indent=1))
json.dump(out, open(__file__.rsplit('/', 1)[0] + '/closed-form.json', 'w'), indent=1)
