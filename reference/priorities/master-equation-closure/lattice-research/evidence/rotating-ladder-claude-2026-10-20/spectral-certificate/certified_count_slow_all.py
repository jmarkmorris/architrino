"""(i) Known cases run through exactly the mean-value-intersection enclosure path of
certified_count_slow2.make_f (frozen) and of this driver's make_f_qp (used for the sectors), by
wrapping each test function as a 3x3 matrix function with the Ladder.matrix call signature, so
that det3, ddet3, the centered form and the intersection are the same code.
(ii) Certified slow counts (sigma0 = 0.03) at R = 1000 over B0 in the sectors q = pi, p = +-1 and
q = 0, p = -1, pieces A-E of the upper contour, three worker processes.
Usage: python certified_count_slow_all.py known
       python certified_count_slow_all.py sectors"""
import hashlib
import json
import math
import multiprocessing as mp_
import os
import sys
import threading
import time

import mpmath
from mpmath import iv

import ladder_spectral_iv as L
from certified_count import B0, HB_DIR, Counter
import certified_count_slow2 as S2

NMAX = 6000
NS = 20000
X = 3.2865
S0 = 0.03
PIECES = {"A": [(X, 0.0), (X, X), (S0, X)], "B": [(S0, X), (S0, 2.2)], "C": [(S0, 2.2), (S0, 1.2)],
          "D": [(S0, 1.2), (S0, 0.5)], "E": [(S0, 0.5), (S0, 0.0)]}
SECTORS = {"pi+1": (math.pi, 1), "pi-1": (math.pi, -1), "0-1": (0, -1)}


def make_f_qp(lad, Nmax, q, p):
    """identical to certified_count_slow2.make_f except that (q, p) are parameters."""
    eps_lo, dl = float(lad.eps.a), float(lad.delta.a)

    def nseg(re):
        return int(min(Nmax, max(150, math.ceil(14.0 / max(float(re.a) * eps_lo * dl, 1e-12)))))

    def f(re, im):
        n = nseg(re)
        if re.a == re.b and im.a == im.b:
            M, _ = lad.matrix(re, im, q, p, N=n)
            return L.det3(M)
        M, D, _ = lad.matrix(re, im, q, p, N=n, deriv=True)
        naive = L.det3(M)
        dB = L.ddet3(M, D)
        mr, mi = iv.mpf(re.mid), iv.mpf(im.mid)
        Mm, _ = lad.matrix(mr, mi, q, p, N=n)
        fm = L.det3(Mm)
        cen = L.cadd(fm, L.cmul(dB, (re - mr, im - mi)))
        return S2.isect_c(naive, cen)
    return f


# ------------------------------------------------------------------ known cases as matrix functions
Z0 = iv.mpf(0)
O1 = iv.mpf(1)


class FakeLadder:
    """Ladder.matrix signature; M is upper-triangular with diagonal (g1, g2, g3) and a unit
    off-diagonal entry, so det M = g1 g2 g3 and ddet3 exercises every column; D = dM/dz."""

    def __init__(self, factors):
        self.factors = factors  # list of 3 callables z -> (value, derivative) complex intervals
        self.eps = iv.mpf(1)
        self.delta = iv.mpf(1)

    def matrix(self, re, im, q, p, N=None, deriv=False, **kw):
        z = (iv.mpf(re), iv.mpf(im))
        vals = [g(z) for g in self.factors]
        Mr = [[vals[0][0][0], O1, Z0], [Z0, vals[1][0][0], Z0], [Z0, Z0, vals[2][0][0]]]
        Mi = [[vals[0][0][1], Z0, Z0], [Z0, vals[1][0][1], Z0], [Z0, Z0, vals[2][0][1]]]
        info = {"tail": 0.0}
        if not deriv:
            return (Mr, Mi), info
        Dr = [[vals[0][1][0], Z0, Z0], [Z0, vals[1][1][0], Z0], [Z0, Z0, vals[2][1][0]]]
        Di = [[vals[0][1][1], Z0, Z0], [Z0, vals[1][1][1], Z0], [Z0, Z0, vals[2][1][1]]]
        return (Mr, Mi), (Dr, Di), info


def poly_factor(zeros):
    def g(z):
        val = (O1, Z0)
        der = (Z0, Z0)
        for zk in zeros:
            zk = complex(zk)
            lin = (z[0] - zk.real, z[1] - zk.imag)
            der = L.cadd(L.cmul(der, lin), val)
            val = L.cmul(val, lin)
        return val, der
    return g


def lambert_factor(z):
    ex = iv.exp(-z[0])
    er, ei = ex * iv.cos(z[1]), -ex * iv.sin(z[1])
    return (z[0] - 20 * er, z[1] - 20 * ei), (1 + 20 * er, 20 * ei)


def one(z):
    return (O1, Z0), (Z0, Z0)


def known():
    out = {}
    zeros = [0.5, complex(1, 1), complex(1, -1), complex(2.5, 3), complex(2.5, -3), 2.0, 2.0, 4.0, 0.1,
             complex(1, 5), complex(1, -5)]
    cases = [
        ("polynomial", FakeLadder([poly_factor(zeros[:4]), poly_factor(zeros[4:8]), poly_factor(zeros[8:])]),
         (0.3, 3.5, 3.5), sum(1 for z in zeros if 0.3 < complex(z).real < 3.5 and abs(complex(z).imag) < 3.5)),
        ("lambert", FakeLadder([lambert_factor, one, one]), (0.3, 3.0, 12.0),
         sum(1 for k in range(-12, 13) for w in [mpmath.lambertw(20, k)] if 0.3 < w.real < 3.0 and abs(w.imag) < 12)),
        ("zero_on_edge_refusal", FakeLadder([poly_factor([0.3, 1.0]), one, one]), (0.3, 2.0, 1.0), None),
    ]
    for (name, fake, (s0, Xr, Y), expect) in cases:
        for (path, fbuild) in (("slow2.make_f", lambda fk: S2.make_f(fk, 10)),
                               ("slow_all.make_f_qp", lambda fk: make_f_qp(fk, 10, 0, 1))):
            c = Counter(fbuild(fake))
            r = c.count_symmetric(s0, Xr, Y, 0.05, 1e-4 if expect is None else 1e-6)
            rec = {"count": r["count"], "certified": r["certified"], "expected": expect,
                   "upper_arg_over_pi": r["upper_arg_over_pi"], "err_over_pi": r["err_over_pi"],
                   "segments": r["segments"], "bisections": r["bisections"],
                   "failed_segments": len(r["failed_segments"]), "parity_consistent": r["parity_consistent"]}
            rec["pass"] = (not r["certified"]) if expect is None else (r["certified"] and r["count"] == expect)
            out["%s | %s" % (name, path)] = rec
            print(name, path, rec, flush=True)
    out["all_pass"] = all(v["pass"] for v in out.values() if isinstance(v, dict))
    out["driver_sha256"] = hashlib.sha256(open(__file__, "rb").read()).hexdigest()
    out["slow2_sha256"] = hashlib.sha256(open(S2.__file__, "rb").read()).hexdigest()
    json.dump(out, open("certified-count-slow-all-known.json", "w"), indent=1, default=float)
    print("ALL PASS" if out["all_pass"] else "FAILURE", flush=True)


# ------------------------------------------------------------------ sectors (3 workers)
_LAD = None


def _init():
    global _LAD
    _LAD = L.Ladder(iv.mpf(B0["delta"]), iv.mpf(B0["eps"]), R=iv.mpf(B0["R"]), N=NMAX, Ns=NS, verbose=True)


def _piece(task):
    sec, tag = task
    q, p = SECTORS[sec]
    hb = os.path.join(HB_DIR, "heartbeat-count-slowall-%s-%s.json" % (sec, tag))
    c = Counter(make_f_qp(_LAD, NMAX, q, p), hb=hb, label="slowall %s %s" % (sec, tag))
    c.last_hb = -1e9
    corners = PIECES[tag]
    r = c.path(corners, 0.05, 1e-5)
    ends = {}
    for z in (corners[0], corners[-1]):
        if z[1] == 0.0:
            v = c.fp(*z)
            ends["%g,%g" % z] = [float(v[0].a), float(v[0].b)]
    out = {"sector": sec, "tag": tag, "corners": corners, "arg_change": mpmath.nstr(r["arg_change"], 40),
           "err": mpmath.nstr(r["err"], 40), "arg_over_pi": float(r["arg_change"] / mpmath.pi),
           "segments": r["segments"], "bisections": r["bisections"], "failed": r["failed"],
           "min_segment": r["min_segment"], "evaluations": c.nevals, "real_axis_end_values": ends,
           "seconds": time.time() - c.t0}
    json.dump(out, open("certified-count-slowall-piece-%s-%s.json" % (sec, tag), "w"), indent=1, default=float)
    return out


def sectors():
    os.makedirs(HB_DIR, exist_ok=True)
    t0 = time.time()
    tasks = [(s, t) for t in ("E", "B", "C", "D", "A") for s in SECTORS]
    done = []
    stop = threading.Event()

    def beat():
        while not stop.is_set():
            json.dump({"phase": "sectors", "utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                       "elapsed_s": time.time() - t0, "pieces_done": [d["sector"] + d["tag"] for d in done],
                       "n_tasks": len(tasks)}, open(os.path.join(HB_DIR, "heartbeat-count-slowall-main.json"), "w"))
            stop.wait(30)
    threading.Thread(target=beat, daemon=True).start()
    with mp_.get_context("spawn").Pool(3, initializer=_init) as pool:
        for out in pool.imap_unordered(_piece, tasks):
            done.append(out)
            print(out["sector"], out["tag"], round(out["arg_over_pi"], 6), out["segments"], out["bisections"],
                  len(out["failed"]), "%.0fs" % out["seconds"], "t=%.0f" % (time.time() - t0), flush=True)
    stop.set()
    mpmath.mp.dps = 50
    summary = {"box": B0, "s0": S0, "X": X, "Y": X, "N_max": NMAX, "Ns": NS, "sectors": {},
               "module_sha256": hashlib.sha256(open(L.__file__, "rb").read()).hexdigest(),
               "driver_sha256": hashlib.sha256(open(__file__, "rb").read()).hexdigest(),
               "total_seconds": time.time() - t0}
    for sec in SECTORS:
        ps = sorted([d for d in done if d["sector"] == sec], key=lambda d: d["tag"])
        if len(ps) != 5:
            summary["sectors"][sec] = {"complete": False}
            continue
        tot = sum(mpmath.mpf(d["arg_change"]) for d in ps)
        err = sum(mpmath.mpf(d["err"]) for d in ps)
        failed = sum(len(d["failed"]) for d in ps)
        n = int(mpmath.nint(tot / mpmath.pi))
        ends = {}
        for d in ps:
            ends.update(d["real_axis_end_values"])
        sg = 1
        for v in ends.values():
            sg *= 1 if v[0] > 0 else (-1 if v[1] < 0 else 0)
        summary["sectors"][sec] = {"complete": True, "count": n,
                                   "certified": bool(failed == 0 and abs(tot - n * mpmath.pi) + err < mpmath.pi / 2),
                                   "upper_arg_over_pi": float(tot / mpmath.pi), "err_over_pi": float(err / mpmath.pi),
                                   "failed": failed, "segments": sum(d["segments"] for d in ps),
                                   "bisections": sum(d["bisections"] for d in ps), "real_axis_end_values": ends,
                                   "parity_consistent": bool(sg == (-1) ** n),
                                   "piece_seconds": {d["tag"]: d["seconds"] for d in ps}}
    json.dump(summary, open("certified-count-slowall-summary.json", "w"), indent=1, default=float)
    print(json.dumps(summary["sectors"], indent=1, default=float), flush=True)


if __name__ == "__main__":
    if sys.argv[1] == "known":
        known()
    else:
        sectors()
