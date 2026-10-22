"""Pilot of the vertical-line invertibility method at the R = 1000 float balance box (a control /
cost measurement, NOT a certificate: the balance box is not admitted).
Usage: python pilot_line.py SIGMA H0 MODE N out.json
  SIGMA: Re Lam (units of omega); H0: initial box height in Lam units; MODE: naive | centered.
Covers the four sectors q in {0, pi}, p = +-1 on Re Lam = SIGMA, 0 <= Im Lam <= M (conjugate
symmetry covers Im Lam < 0), M = 2 M*, with the far-field perturbation bound for |Lam| >= M."""
import json
import math
import sys
import time

from mpmath import iv

import ladder_spectral_iv as L
from controls_stage1 import FB_DELTA_BOX, FB_EPS_BOX

sigma = float(sys.argv[1])
h0 = float(sys.argv[2])
mode = sys.argv[3]
N = int(sys.argv[4])
out = sys.argv[5]

t0 = time.time()
lad = L.Ladder(iv.mpf(FB_DELTA_BOX), iv.mpf(FB_EPS_BOX), R=1000, N=N, Ns=20000, verbose=True)
pre = time.time() - t0
t1 = time.time()
b0, b1, bound_at, Mstar = L.far_line_bound(lad, sigma)
far_s = time.time() - t1
M = math.ceil(2 * Mstar * 10) / 10
far_bound = bound_at(M)
print("far: b0=%.4g b1=%.4g Mstar=%.4f M=%.2f bound(|Lam|>=M)=%.4g (%.1fs)" % (b0, b1, Mstar, M, far_bound, far_s), flush=True)
allres = {"sigma": sigma, "mode": mode, "N": N, "Ns": 20000, "R": 1000, "precompute_s": pre,
          "far_b0": b0, "far_b1": b1, "Mstar": Mstar, "M": M, "far_bound_at_M": far_bound,
          "far_seconds": far_s, "balance_box": {"delta": FB_DELTA_BOX, "eps": FB_EPS_BOX},
          "Reps2": float((lad.R * lad.eps * lad.eps).b),
          "note": "pilot at float balance box; NOT a certificate", "sectors": {}}
for (qn, q) in (("pi", math.pi), ("0", 0)):
    for p in (1, -1):
        t1 = time.time()
        res = L.cover_line(lad, sigma, q, p, M, h0, centered=(mode == "centered"))
        res["q"] = qn
        res["boxes"] = [[a, b, c, d] for (a, b, c, d) in res["boxes"]]
        allres["sectors"]["q=%s,p=%+d" % (qn, p)] = res
        print("q=%s p=%+d: proved %d boxes, evaluations %d, unresolved %d, worst near bound %.4g, %.1f s" %
              (qn, p, res["boxes_proved"], res["evaluations"], len(res["unresolved"]),
               res["max_resolvent_bound"], res["seconds"]), flush=True)
        json.dump(allres, open(out, "w"), indent=1)
allres["total_seconds"] = time.time() - t0
json.dump(allres, open(out, "w"), indent=1)
