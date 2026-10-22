"""Argument-principle census of characteristic roots of the translating ladder (provisionally admitted balance).

Blocks: 'xz' = det of the (radial, axial) 2x2 block, 'y' = tangential 1x1 block of Delta(lambda; q, p)
from translating_char.Ladder.  Batch evaluation (batch_delta) is checked against Ladder.Delta first.
Contour: rectangle  e0 <= Re <= 1.05 Lambda, |Im| <= 1.05 Lambda; e0 = 0 (left edge on the imaginary axis,
where the series still converges absolutely) or e0 = eps.  At q in {0, pi} the left edge is indented by a
half-circle of radius rho around lambda = 0 (simple symmetry roots on the axis).
Counter: adaptive refinement until every step changes arg by <= 0.35 rad, then every step halved and recounted.
Usage: python census.py N e0 out.json progress.txt"""
import json, math, sys, time
import numpy as np
from translating_char import Ladder, delta_star, U_STAR

LAM = 2.3966
H = 1.05 * LAM


class Batch:
    def __init__(self, L):
        self.L = L
        M = len(L.k)
        self.LuQ = L.LuQ.reshape(M, 9).astype(complex); self.LwQ = L.LwQ.reshape(M, 9).astype(complex)
        self.sumLu = L.sumLu

    def delta(self, lams, q, p, chunk=64):
        L = self.L; out = np.empty((len(lams), 3, 3), complex)
        w = L.pvec(p) * np.exp(1j * q * L.k)
        for i in range(0, len(lams), chunk):
            lm = np.asarray(lams[i:i + chunk])
            E = np.exp(-np.outer(lm, L.tau)) * w[None, :]
            S1 = (E @ self.LuQ).reshape(-1, 3, 3); S2 = (E @ self.LwQ).reshape(-1, 3, 3)
            out[i:i + chunk] = (lm ** 2)[:, None, None] * np.eye(3)[None] - self.sumLu[None] + S1 - lm[:, None, None] * S2
        return out


def blocks(D):
    xz = D[:, 0, 0] * D[:, 2, 2] - D[:, 0, 2] * D[:, 2, 0]
    return {'xz': xz, 'y': D[:, 1, 1]}


def contour(e0, h, indent):
    """Return a function t in [0,1) -> lambda, counterclockwise.  Segments: bottom, right, top, left (+ indent)."""
    W = h - e0
    segs = [('line', complex(e0, -h), complex(h, -h)), ('line', complex(h, -h), complex(h, h)), ('line', complex(h, h), complex(e0, h))]
    if indent:
        r = indent
        segs += [('line', complex(0, h), complex(0, r)), ('arc', r), ('line', complex(0, -r), complex(0, -h))]
    else:
        segs += [('line', complex(e0, h), complex(e0, -h))]
    n = len(segs)
    def f(t):
        t = np.asarray(t, float); z = np.empty(t.shape, complex)
        idx = np.minimum((t * n).astype(int), n - 1); s = t * n - idx
        for i, sg in enumerate(segs):
            m = idx == i
            if sg[0] == 'line':
                z[m] = sg[1] + (sg[2] - sg[1]) * s[m]
            else:  # arc from +i r to -i r through +r (clockwise around the origin => keeps origin outside)
                th = math.pi / 2 - math.pi * s[m]
                z[m] = sg[1] * np.exp(1j * th)
        return z
    return f


def count(func_vals, path, t0, tol=0.35, max_pts=60000):
    """func_vals(lams) -> dict name -> values.  Adaptive arg-principle count for every named function."""
    t = np.array(t0)
    vals = func_vals(path(t))
    names = list(vals)
    for it in range(40):
        tt = np.append(t, 1.0); vv = {k: np.append(vals[k], vals[k][0]) for k in names}
        bad = np.zeros(len(t), bool)
        for k in names:
            da = np.angle(vv[k][1:] / vv[k][:-1]); bad |= np.abs(da) > tol
        if not bad.any() or len(t) > max_pts:
            break
        mids = 0.5 * (tt[:-1] + tt[1:])[bad]
        nv = func_vals(path(mids))
        t = np.concatenate([t, mids]); order = np.argsort(t); t = t[order]
        vals = {k: np.concatenate([vals[k], nv[k]])[order] for k in names}
    def winding(t, vals):
        res = {}
        for k in names:
            v = np.append(vals[k], vals[k][0]); da = np.angle(v[1:] / v[:-1])
            res[k] = dict(winding=float(np.sum(da) / (2 * math.pi)), max_step=float(np.max(np.abs(da))), min_abs=float(np.min(np.abs(vals[k]))))
        return res
    r1 = winding(t, vals)
    tt = np.append(t, 1.0); mids = 0.5 * (tt[:-1] + tt[1:]); nv = func_vals(path(mids))
    t2 = np.concatenate([t, mids]); order = np.argsort(t2)
    v2 = {k: np.concatenate([vals[k], nv[k]])[order] for k in names}
    r2 = winding(t2[order], v2)
    return dict(points=int(len(t)), refine=r1, halved=r2)


if __name__ == '__main__':
    N = int(sys.argv[1]); e0 = float(sys.argv[2]); outp = sys.argv[3]; prog = open(sys.argv[4], 'w')
    t0 = time.time()
    L = Ladder(delta_star(), U_STAR, N); B = Batch(L)
    # batch vs reference evaluation
    lt = np.array([0.3 + 0.7j, 1.2 - 2.0j, 0.0 + 1.5j]); chk = 0.0
    for q, p in ((0.9, -1), (math.pi, 1)):
        Db = B.delta(lt, q, p)
        for i, l in enumerate(lt):
            chk = max(chk, float(np.max(np.abs(Db[i] - L.Delta(l, q, p)))))
    res = dict(N=N, e0=e0, Lambda=LAM, H=H, batch_vs_reference_maxabs=chk, runs=[])
    qs = [0.0, 0.02, 0.05, 0.1, 0.2, math.pi / 8, math.pi / 4, 3 * math.pi / 8, math.pi / 2, 5 * math.pi / 8, 3 * math.pi / 4, 7 * math.pi / 8,
          math.pi - 0.2, math.pi - 0.1, math.pi - 0.05, math.pi - 0.02, math.pi]
    for p in (1, -1):
        for q in qs:
            ind = 0.02 if (e0 == 0.0 and (q == 0.0 or q == math.pi)) else 0
            path = contour(e0, H, ind)
            fv = lambda lams: blocks(B.delta(lams, q, p))
            r = count(fv, path, np.linspace(0, 1, 800, endpoint=False))
            r.update(q=q, p=p, indent=ind, wall_s=time.time() - t0)
            res['runs'].append(r)
            prog.write(json.dumps(dict(q=q, p=p, xz=r['halved']['xz']['winding'], y=r['halved']['y']['winding'], pts=r['points'], wall_s=r['wall_s'])) + '\n'); prog.flush()
    res['runtime_s'] = time.time() - t0
    json.dump(res, open(outp, 'w'), indent=0)
