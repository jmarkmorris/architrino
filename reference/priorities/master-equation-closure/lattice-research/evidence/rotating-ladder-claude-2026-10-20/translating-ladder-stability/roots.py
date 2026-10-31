"""Locate the counted roots: batched Newton (complex finite-difference derivative) from a seed grid at N_find,
polish at N_polish, keep distinct roots with Re lambda > 0 inside the census rectangle.
Usage: python roots.py N_find N_polish out.json progress.txt"""
import json, math, sys, time
import numpy as np
from translating_char import Ladder, delta_star, U_STAR
from census import Batch, blocks, H

Nf, Np = int(sys.argv[1]), int(sys.argv[2]); outp = sys.argv[3]; prog = open(sys.argv[4], 'w')
t0 = time.time()
Bf = Batch(Ladder(delta_star(), U_STAR, Nf)); Bp = Batch(Ladder(delta_star(), U_STAR, Np))
re = np.linspace(0.004, H, 9); im = np.linspace(-H, H, 17)
seeds = (re[:, None] + 1j * im[None, :]).ravel()

def newton(B, lam, q, p, blk, iters, h=1e-6):
    lam = lam.copy()
    for _ in range(iters):
        f0 = blocks(B.delta(lam, q, p))[blk]; f1 = blocks(B.delta(lam + h, q, p))[blk]
        d = (f1 - f0) / h
        step = f0 / d
        step = np.where(np.abs(step) > 0.3, 0.3 * step / np.abs(step), step)
        lam = lam - step
        lam = np.where(lam.real < 1e-4, 1e-4 + 1j * lam.imag, lam)   # stay in the domain Re >= 0
    return lam, np.abs(blocks(B.delta(lam, q, p))[blk])

qs = [0.0, 0.02, 0.05, 0.1, 0.2, math.pi / 8, math.pi / 4, 3 * math.pi / 8, math.pi / 2, 5 * math.pi / 8, 3 * math.pi / 4, 7 * math.pi / 8,
      math.pi - 0.2, math.pi - 0.1, math.pi - 0.05, math.pi - 0.02, math.pi]
res = []
for p in (1, -1):
    for q in qs:
        for blk in ('xz', 'y'):
            lam, r = newton(Bf, seeds, q, p, blk, 25)
            ok = (r < 1e-9) & (lam.real > 2e-4) & (np.abs(lam.real) <= H) & (np.abs(lam.imag) <= H)
            cand = lam[ok]
            if len(cand):
                lp, rp = newton(Bp, cand, q, p, blk, 6)
                keep = []
                for z, rr in zip(lp, rp):
                    if rr < 1e-10 and z.real > 0 and all(abs(z - y) > 1e-6 for y in keep):
                        keep.append(z)
            else:
                keep = []
            if q in (0.0, math.pi):  # drop the symmetry root at the origin
                keep = [z for z in keep if abs(z) > 1e-5]
            rec = dict(q=q, p=p, block=blk, roots=[[z.real, z.imag] for z in sorted(keep, key=lambda z: -z.real)], wall_s=time.time() - t0)
            res.append(rec)
            prog.write(json.dumps(dict(q=q, p=p, block=blk, n=len(keep), maxre=max([z.real for z in keep], default=None), wall_s=rec['wall_s'])) + '\n'); prog.flush()
json.dump(dict(N_find=Nf, N_polish=Np, runs=res, runtime_s=time.time() - t0), open(outp, 'w'), indent=0)
