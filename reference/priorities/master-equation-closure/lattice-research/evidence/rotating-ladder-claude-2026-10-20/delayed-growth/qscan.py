"""First-order growth coefficients Re lambda_1 for every neutral zero-delay root, nine wavenumbers,
both sectors, at the balanced spacing delta_*.  Delta_0(i Omega) is Hermitian at every q, so the
left null vector equals the right one; lambda_1 = -c^H Delta_1 c / (c^H 2(lambda_0 + J) c).
"""
import numpy as np, sys, json
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from first_order import FirstOrder, neutral_root, shift
from ladder_char import I3, J3

ys = 1.8782239487
dstar = 2 * np.pi / ys
F = FirstOrder(dstar, int(sys.argv[1]) if len(sys.argv) > 1 else 50000)
res = []
for p in (1.0, -1.0):
    for j in range(9):
        q = j * np.pi / 8
        lams = np.exp(2j * np.pi * (np.arange(14) + 0.5) / 14) * 2.5
        dets = np.array([np.linalg.det(F.Delta0(l, q, p)) for l in lams])
        roots = np.roots(np.polyfit(lams, dets, 6))
        for r0 in roots:
            if abs(r0) < 1e-3:
                continue
            r = neutral_root(F, r0, q, p)
            M = F.Delta0(r, q, p)
            herm = float(np.max(np.abs(M - M.conj().T))) if abs(r.real) < 1e-9 else None
            rec = dict(p=p, q_over_pi=j / 8, lam0=[r.real, r.imag])
            if abs(r.real) < 1e-9:
                lam1, contrib, c, w, s = shift(F, r, q, p)
                den = c.conj() @ (2 * (r * I3 + J3)) @ c
                rec.update(lam1=[lam1.real, lam1.imag], krein=float((den / 1j).real), hermitian_defect=herm,
                           second_singular=float(s[-2]),
                           velocity_part=float(sum(v.real for k, v in contrib.items() if k in ('P3_frame', 'P4_exp', 'P5_Lw'))),
                           aberration_part=float(sum(v.real for k, v in contrib.items() if k.startswith('P1') or k.startswith('P2'))))
            res.append(rec)
neutral = [r for r in res if 'lam1' in r]
summary = dict(n_neutral=len(neutral), n_growing_first_order=sum(1 for r in neutral if r['lam1'][0] > 1e-9),
               n_decaying_first_order=sum(1 for r in neutral if r['lam1'][0] < -1e-9),
               max_c1=max(r['lam1'][0] for r in neutral))
print(json.dumps(summary))
for r in neutral:
    print('p=%+d q/pi=%.3f Omega0=%+.6f  c1=%+.5f  dOmega1=%+.2e  krein=%+.4f  vel=%+.4f ab=%+.4f' % (
        r['p'], r['q_over_pi'], r['lam0'][1], r['lam1'][0], r['lam1'][1], r['krein'], r['velocity_part'], r['aberration_part']))
json.dump(dict(summary=summary, roots=res), open(__file__.rsplit('/', 1)[0] + '/qscan.json', 'w'), indent=1)
