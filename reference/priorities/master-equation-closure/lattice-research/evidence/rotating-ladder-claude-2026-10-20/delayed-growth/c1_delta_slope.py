"""Slope of the in-step first-order coefficient c_1(delta) = m_r(Om^2-2)/(2 Om^2) + m_t/Om^2 in the spacing,
by central difference of the closed-form sums (needed only to convert c_1(delta(eps)) to c_1(delta_*)).
Writes c1-delta-slope.json (refuses to overwrite)."""
import json, os, sys, math
import numpy as np
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from first_order import FirstOrder, neutral_root
from ladder_char import J3
OUT = __file__.rsplit('/', 1)[0] + '/c1-delta-slope.json'
assert not os.path.exists(OUT)
ys = 1.8782239487; dstar = 2 * math.pi / ys
def c1(delta):
    F = FirstOrder(delta, 50000)
    Om = neutral_root(F, 0.5912818j, 0.0, 1.0).imag
    P = F.pieces(0.0, 0.0, 1.0)
    Ab = sum(P[k] for k in P if k.startswith('P1') or k.startswith('P2'))
    Mv = (Ab - F.Delta1(0.0, 0.0, 1.0))[:2, :2] @ np.linalg.inv(J3[:2, :2])
    mr, mt = Mv[0, 0].real, Mv[1, 1].real
    B = math.pi / (2 * delta * math.sinh(2 * math.pi / delta)) - math.pi ** 2 / (6 * delta ** 2)
    return dict(delta=delta, Omega0=Om, m_r=mr, m_t=mt, m_t_closed=B / F.S0, c1=mr * (Om ** 2 - 2) / (2 * Om ** 2) + mt / Om ** 2)
h = 1e-3
r = [c1(dstar - h), c1(dstar), c1(dstar + h)]
out = dict(rows=r, dc1_ddelta=(r[2]['c1'] - r[0]['c1']) / (2 * h), dOmega_ddelta=(r[2]['Omega0'] - r[0]['Omega0']) / (2 * h))
print(json.dumps(out, indent=1))
json.dump(out, open(OUT, 'w'), indent=1)
