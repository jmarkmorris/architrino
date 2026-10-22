"""Float cross-check of units between the history-flow note's matrices and the spectral
certificate receipt: evaluates, with the frozen class_spectrum_float.py (imported, unmodified),
det of the in-plane q=pi block at lambda_lo and lambda_hi and b0, b1 at mu0 = 2 lambda_lo, at the
float balance point, and prints them beside the receipt's enclosures.  Float measurement only.
Usage: python unit_crosscheck_float.py <stage2-certificates.json> <out.json>
"""
import json, sys, os
from fractions import Fraction
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import class_spectrum_float as C

cert = json.load(open(sys.argv[1]))
delta, eps, g = 3.345035293, 1.384081428e-5 * 1000.0, 1e-3
# known case first: zero-speed delays and static L_u (already C's controls), rerun here
mm = np.arange(-20, 21).astype(float)
kc = float(np.max(np.abs(C.causal_delay(-1, mm, 3.3, 0.0) - np.sqrt(mm**2 * 3.3**2 + 4))))
assert kc < 1e-12
recs = C.rows(delta, eps, g, 20000)
lo, hi = float(Fraction(cert['lam_lo'])), float(Fraction(cert['lam_hi']))
out = {'known_case_zero_speed_delay_err': kc}
for name, mu in (('lam_lo', lo), ('lam_hi', hi)):
    D = C.Delta(mu, -1, recs, eps).real[:2, :2]
    out['det_' + name] = float(np.linalg.det(D))
    out['receipt_det_' + name] = [cert['B1']['lo' if name == 'lam_lo' else 'hi']['det_note_units']['lo_float'],
                                  cert['B1']['lo' if name == 'lam_lo' else 'hi']['det_note_units']['hi_float']]
b0, b1 = C.bounds_b(2 * lo, recs, eps)
out['b0_float'] = b0; out['b0_upper_receipt'] = cert['B3']['b0_upper_float']
out['b1_float'] = b1; out['b1_upper_receipt'] = cert['B3']['b1_upper_float']
json.dump(out, open(sys.argv[2], 'w'), indent=1); print(json.dumps(out, indent=1))
