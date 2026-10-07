# weber-binding-sphere-gc-review-ext-falsu-mirrorcheck.py
# The field `startMirrorDefect` written by the mseed and mpin strata of ...-ext-falsu.py is wrong as a diagnostic: it sums the
# absolute components of the chord (an L1 norm) where the Euclidean norm was meant.  This script checks the seed construction
# itself, with the Euclidean norm, at 40 times: for members 0 and 1 of a mirror seed, d(T) = 2 |X_0(T).nu|, the plane is not
# crossed, and the pair is not rigid.  Same construction functions as the search (imported, not copied).
import os, json, importlib.util, datetime
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
sp = importlib.util.spec_from_file_location('fu', os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-falsu.py')); fu = importlib.util.module_from_spec(sp); sp.loader.exec_module(fu)
rng = np.random.default_rng(7); res = {}
for kind in ('mseed', 'mpin'):
    worst = 0.0; minplane = 9.0; minvar = 9.0
    for _ in range(200):
        mode = fu.FREE if kind == 'mseed' else {'kind': 'mirror'}; P = fu.random_P(rng, mode); P, nu = fu.mirror_seed(P, rng)
        if kind == 'mpin': P[1], P[7] = fu.angles(nu)
        mem, v = fu.build(P, mode); T = rng.uniform(0, 30, 40); X, V, A = fu.ext.kin(T, mem)
        d = np.linalg.norm(X[:, 0] - X[:, 1], axis=1); eta = 2*(X[:, 0] @ nu)
        worst = max(worst, abs(d - abs(eta)).max()); minplane = min(minplane, abs(eta).min()); minvar = min(minvar, d.max() - d.min())
        worst = max(worst, abs(mem[0][3] - mem[1][3]), abs(abs(mem[0][4]) - abs(mem[1][4])))
    res[kind] = dict(n=200, max_abs_d_minus_2Xnu=worst, minDistanceSampled=minplane, minVariationOfSeparation=minvar)
out = dict(test='ext-falsu-mirrorcheck', utc=datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'), **res)
json.dump(out, open(os.path.join(HERE, 'weber-binding-sphere-gc-review-ext-falsu-mirrorcheck.json'), 'w'), indent=1); print(json.dumps(out))
