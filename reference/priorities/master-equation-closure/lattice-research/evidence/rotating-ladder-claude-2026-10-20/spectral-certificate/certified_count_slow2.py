"""Slow-root certified count, q = 0, p = +1, R = 1000, B0, low sigma0 -- centered-form version.
The first version (certified_count_slow.py, naive enclosure) was piloted and found too wide near
the left edge (enclosure width floor ~5e-4 against |det| ~1e-4; see certified-count-slow-pilot-s00.03.json).
Here the segment enclosure is the intersection of the naive enclosure det(Delta(B)) with the mean-value
form det(Delta(m)) + det'(B)(B - m) (det' = d det/dLam enclosed over B), both valid.
The upper contour is split into pieces run as separate processes; `combine` adds their argument
changes and error bounds and certifies the count.  Uses certified_count.Counter (unchanged).
Usage: python certified_count_slow2.py pilot S0 NMAX
       python certified_count_slow2.py piece S0 TAG NMAX x0 y0 x1 y1 [x2 y2 ...]   (corners in Lam units)
       python certified_count_slow2.py combine S0 TAG1 TAG2 ..."""
import hashlib
import json
import math
import os
import sys
import threading
import time

import mpmath
from mpmath import iv

import ladder_spectral_iv as L
from certified_count import B0, HB_DIR, Counter

NS = 20000


def build(Nmax, hbpath):
    os.makedirs(HB_DIR, exist_ok=True)
    stop = threading.Event()
    t0 = time.time()

    def loop():
        while not stop.is_set():
            json.dump({"phase": "precompute", "utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                       "elapsed_s": time.time() - t0}, open(hbpath, "w"))
            stop.wait(30)
    threading.Thread(target=loop, daemon=True).start()
    lad = L.Ladder(iv.mpf(B0["delta"]), iv.mpf(B0["eps"]), R=iv.mpf(B0["R"]), N=Nmax, Ns=NS, verbose=True)
    stop.set()
    return lad, time.time() - t0


def isect_c(a, b):
    return (L.isect(a[0], b[0]), L.isect(a[1], b[1]))


def make_f(lad, Nmax):
    eps_lo, dl = float(lad.eps.a), float(lad.delta.a)

    def nseg(re):
        return int(min(Nmax, max(150, math.ceil(14.0 / max(float(re.a) * eps_lo * dl, 1e-12)))))

    def f(re, im):
        n = nseg(re)
        if re.a == re.b and im.a == im.b:
            M, _ = lad.matrix(re, im, 0, 1, N=n)
            return L.det3(M)
        M, D, _ = lad.matrix(re, im, 0, 1, N=n, deriv=True)
        naive = L.det3(M)
        dB = L.ddet3(M, D)
        mr, mi = iv.mpf(re.mid), iv.mpf(im.mid)
        Mm, _ = lad.matrix(mr, mi, 0, 1, N=n)
        fm = L.det3(Mm)
        cen = L.cadd(fm, L.cmul(dB, (re - mr, im - mi)))
        return isect_c(naive, cen)
    return f


def pilot(s0, Nmax):
    lad, pre = build(Nmax, os.path.join(HB_DIR, "heartbeat-count-slow2-pilot.json"))
    f = make_f(lad, Nmax)
    rows = []
    for (y, h) in ((0.0, 0.05), (0.3, 0.05), (0.6, 0.05), (0.6, 0.01), (1.5, 0.05)):
        t = time.time()
        r = f(iv.mpf(s0), iv.mpf([y, y + h]))
        rows.append({"x": s0, "y": [y, y + h], "re": [float(r[0].a), float(r[0].b)], "im": [float(r[1].a), float(r[1].b)],
                     "excludes_0": not (L.has0(r[0]) and L.has0(r[1])), "seconds": time.time() - t})
        print(rows[-1], flush=True)
    json.dump({"s0": s0, "Nmax": Nmax, "Ns": NS, "precompute_s": pre, "rows": rows},
              open("certified-count-slow2-pilot-s0%g.json" % s0, "w"), indent=1)


def piece(s0, tag, Nmax, corners):
    hb = os.path.join(HB_DIR, "heartbeat-count-slow2-%s.json" % tag)
    lad, pre = build(Nmax, hb)
    c = Counter(make_f(lad, Nmax), hb=hb, label="slow2 %s" % tag)
    c.last_hb = -1e9
    r = c.path(corners, 0.05, 1e-5)
    ends = {}
    for z in (corners[0], corners[-1]):
        if z[1] == 0.0:
            v = c.fp(*z)
            ends["%g,%g" % z] = [float(v[0].a), float(v[0].b)]
    out = {"tag": tag, "s0": s0, "corners": corners, "N_max": Nmax, "Ns": NS, "precompute_s": pre,
           "arg_change": mpmath.nstr(r["arg_change"], 40), "err": mpmath.nstr(r["err"], 40),
           "arg_over_pi": float(r["arg_change"] / mpmath.pi), "segments": r["segments"],
           "bisections": r["bisections"], "failed": r["failed"], "min_segment": r["min_segment"],
           "evaluations": c.nevals, "real_axis_end_values": ends, "seconds": time.time() - c.t0,
           "module_sha256": hashlib.sha256(open(L.__file__, "rb").read()).hexdigest(),
           "driver_sha256": hashlib.sha256(open(__file__, "rb").read()).hexdigest()}
    json.dump(out, open("certified-count-slow2-piece-%s.json" % tag, "w"), indent=1, default=float)
    print(tag, out["arg_over_pi"], out["segments"], out["bisections"], len(out["failed"]), "%.0fs" % out["seconds"], flush=True)


def combine(s0, tags):
    mpmath.mp.dps = 50
    pieces = [json.load(open("certified-count-slow2-piece-%s.json" % t)) for t in tags]
    # pieces must chain: each piece's last corner is the next piece's first corner
    chain = all(pieces[i]["corners"][-1] == pieces[i + 1]["corners"][0] for i in range(len(pieces) - 1))
    tot = sum(mpmath.mpf(p["arg_change"]) for p in pieces)
    err = sum(mpmath.mpf(p["err"]) for p in pieces)
    failed = sum(len(p["failed"]) for p in pieces)
    n = int(mpmath.nint(tot / mpmath.pi))
    cert = chain and failed == 0 and abs(tot - n * mpmath.pi) + err < mpmath.pi / 2
    ends = {}
    for p in pieces:
        ends.update(p["real_axis_end_values"])
    sg = 1
    for v in ends.values():
        sg *= 1 if v[0] > 0 else (-1 if v[1] < 0 else 0)
    out = {"s0": s0, "pieces": tags, "chain_ok": chain, "count": n, "certified": bool(cert),
           "upper_arg_over_pi": float(tot / mpmath.pi), "err_over_pi": float(err / mpmath.pi), "failed": failed,
           "real_axis_end_values": ends, "parity_consistent": bool(sg == (-1) ** n),
           "segments": sum(p["segments"] for p in pieces), "bisections": sum(p["bisections"] for p in pieces),
           "box": B0, "q": "0", "p": 1}
    json.dump(out, open("certified-count-slow2-q0-p+1-s0%g.json" % s0, "w"), indent=1, default=float)
    print(out)


if __name__ == "__main__":
    mode = sys.argv[1]
    if mode == "pilot":
        pilot(float(sys.argv[2]), int(sys.argv[3]))
    elif mode == "piece":
        s0, tag, Nmax = float(sys.argv[2]), sys.argv[3], int(sys.argv[4])
        v = [float(x) for x in sys.argv[5:]]
        piece(s0, tag, Nmax, [(v[i], v[i + 1]) for i in range(0, len(v), 2)])
    else:
        combine(float(sys.argv[2]), sys.argv[3:])
