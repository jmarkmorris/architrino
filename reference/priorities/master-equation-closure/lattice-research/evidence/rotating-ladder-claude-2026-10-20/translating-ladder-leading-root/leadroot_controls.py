"""Known-case controls for leadroot_iv.py, run before the certificate."""
import json, math, sys, time
import numpy as np
from mpmath import iv, mpf
sys.path.insert(0, '../translating-ladder-stability')
from translating_char import Ladder, U_STAR
from leadroot_iv import Rows, delta_star, det2, U_ABS
t0 = time.time(); out = {}
ds = delta_star(); out['delta_star_enclosure'] = [str(ds.a), str(ds.b)]
fl_ds = 2 * math.pi / math.acosh(3 + math.sqrt(10))
out['C0_float_delta_in_enclosure'] = bool(ds.a <= fl_ds <= ds.b)
uI = -U_ABS
# C1 closed-form row: root residual encloses 0; float rows (Ladder, point u = U_STAR) inside the interval rows
R = Rows(6, uI, ds, p=-1)
L = Ladder(fl_ds, U_STAR, 6)
ok_root = True; ok_rows = True; maxw = 0.0
idx = 0
for k in range(-6, 7):
    for nu in (1, -1):
        if nu == 1 and k == 0: continue
        tau, LuQ, LwQ, _, _ = R.src[idx]; idx += 1
        x0 = 1 - nu * (1 if k % 2 == 0 else -1); z0 = -k * ds
        rz = z0 + uI * tau
        res = tau - iv.sqrt(x0 * x0 + rz * rz)
        ok_root &= bool(res.a <= 0 <= res.b)
        j = np.where((L.k == k) & (L.nu == nu))[0][0]
        sm = L.qsign[j]; w = 1 if nu == 1 else -1
        for (a, b, M) in ((0, 0, 'u'), (0, 1, 'u'), (1, 0, 'u'), (1, 1, 'u'), (0, 0, 'w'), (1, 1, 'w')):
            ia, ib = [0, 2][a], [0, 2][b]
            fval = (L.Lu if M == 'u' else L.Lw)[j][ia, ib] * w * (sm if b == 0 else 1)
            I = (LuQ if M == 'u' else LwQ)[a][b]
            ok_rows &= bool(I.a - 1e-15 <= fval <= I.b + 1e-15)
            maxw = max(maxw, float(I.delta))
        tf = L.tau[j]; ok_rows &= bool(tau.a - 1e-13 <= tf <= tau.b + 1e-13)
out['C1_rows'] = dict(root_residual_encloses_zero=ok_root, float_rows_inside_intervals=ok_rows, max_interval_width=maxw)
# C2 static limit u = 0: L_u equals sigma (I - 3 n n^T)/tau^3 (interval containment of the difference 0)
R0 = Rows(4, iv.mpf(0), ds, p=-1); ok2 = True; idx = 0
for k in range(-4, 5):
    for nu in (1, -1):
        if nu == 1 and k == 0: continue
        tau, LuQ, LwQ, _, _ = R0.src[idx]; idx += 1
        x0 = 1 - nu * (1 if k % 2 == 0 else -1); r = [iv.mpf(x0), -k * ds]; n = [r[0] / tau, r[1] / tau]
        sm = 1 if (k + (1 if nu == -1 else 0)) % 2 == 0 else -1; w = 1 if nu == 1 else -1; Q = [sm, 1]
        for a in range(2):
            for b in range(2):
                st = w * nu * ((1 if a == b else 0) - 3 * n[a] * n[b]) / tau ** 3 * Q[b]
                dlt = LuQ[a][b] - st
                ok2 &= bool(dlt.a <= 0 <= dlt.b)
out['C2_static_limit_contains'] = ok2
# C3 symmetry roots, N = 300 with tail intervals
Rp = Rows(300, uI, ds, p=1)
Dz, info = Rp.delta_xz(iv.mpf(0), lam_lo=0)
dz = det2(Dz); yy = Rp.delta_yy0()
Rpi = Rows(300, uI, ds, p=-1, q_is_pi=True)
Dpi, info2 = Rpi.delta_xz(iv.mpf(0), lam_lo=0)
out['C3_symmetry'] = dict(axial_translation_det_xz_q0_p1=[str(dz.a), str(dz.b)], contains0=bool(dz.a <= 0 <= dz.b),
                          rotation_yy_q0_p1=[str(yy.a), str(yy.b)], yy_contains0=bool(yy.a <= 0 <= yy.b),
                          Delta_xz_e_z_entries=[[str(Dz[0][1].a), str(Dz[0][1].b)], [str(Dz[1][1].a), str(Dz[1][1].b)]],
                          x_translation_det_xz_qpi_pm1=[str(det2(Dpi).a), str(det2(Dpi).b)], qpi_contains0=bool(det2(Dpi).a <= 0 <= det2(Dpi).b), tail=info)
# C4 float determinant (translating_char, N = 300) inside the interval determinant at two real lambda
R3 = Rows(300, uI, ds, p=-1); L3 = Ladder(fl_ds, U_STAR, 300); c4 = []
for lam in ('0.5', '0.7819'):
    Dm, info = R3.delta_xz(iv.mpf(lam))
    d = det2(Dm); Df = L3.Delta(float(lam), 0.0, -1).real
    df = Df[0, 0] * Df[2, 2] - Df[0, 2] * Df[2, 0]
    c4.append(dict(lam=lam, interval=[str(d.a), str(d.b)], float=df, inside=bool(d.a <= df <= d.b), tail=info))
out['C4_float_inside_interval'] = c4
out['runtime_s'] = time.time() - t0
print(json.dumps(out, indent=1, default=str))
