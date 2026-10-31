"""Root bound Lambda for Re lambda >= 0 at the translating ladder, truncation sensitivity, and Delta cost."""
import json, math, time
import numpy as np
from translating_char import Ladder, delta_star, U_STAR
out = {}
for N in (4000, 20000, 100000):
    t = time.time(); L = Ladder(delta_star(), U_STAR, N); tb = time.time() - t
    Lam, b0, b1 = L.root_bound()
    t = time.time()
    for _ in range(5): L.Delta(0.4 + 0.9j, 1.3, -1)
    out[str(N)] = dict(Lambda=Lam, b0=b0, b1=b1, build_s=tb, delta_eval_s=(time.time() - t) / 5,
                       tail_Lw_norm_last_rungs=float(np.max(np.linalg.norm(L.LwQ[np.abs(L.k) == N], 2, axis=(1, 2)))),
                       tail_Lu_norm_last_rungs=float(np.max(np.linalg.norm(L.LuQ[np.abs(L.k) == N], 2, axis=(1, 2)))),
                       Dmin=float(L.D.min()), Dmax=float(L.D.max()))
print(json.dumps(out, indent=1))
