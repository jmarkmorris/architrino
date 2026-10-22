"""Certified count in the sector q = 0, p = +1 at R = 1000 over B0 with a low left edge sigma0
(slow, delay-induced roots included).  Uses certified_count.Counter and ladder_spectral_iv unchanged;
same root bound and upper contour as certified_count.py, larger row truncation for small Re Lam.
Usage: python certified_count_slow.py pilot S0 NMAX
       python certified_count_slow.py run S0 H0 NMAX"""
import hashlib
import json
import math
import os
import sys
import time

from mpmath import iv

import ladder_spectral_iv as L
from certified_count import B0, HB_DIR, Counter


def _bg_heartbeat(path, label, stop):
    import threading
    t0 = time.time()

    def loop():
        while not stop.is_set():
            json.dump({"label": label, "phase": "precompute", "utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                       "elapsed_s": time.time() - t0}, open(path, "w"))
            stop.wait(30)
    th = threading.Thread(target=loop, daemon=True)
    th.start()
    return th


def build(Nmax):
    import threading
    os.makedirs(HB_DIR, exist_ok=True)
    stop = threading.Event()
    _bg_heartbeat(os.path.join(HB_DIR, "heartbeat-count-slow-q0-p+1.json"), "precompute N=%d" % Nmax, stop)
    t0 = time.time()
    lad = L.Ladder(iv.mpf(B0["delta"]), iv.mpf(B0["eps"]), R=iv.mpf(B0["R"]), N=Nmax, Ns=50000, verbose=True)
    stop.set()
    return lad, time.time() - t0


def make_f(lad, Nmax):
    eps_lo, dl = float(lad.eps.a), float(lad.delta.a)

    def f(re, im):
        relo = float(re.a)
        nseg = int(min(Nmax, max(150, math.ceil(14.0 / max(relo * eps_lo * dl, 1e-12)))))
        M, info = lad.matrix(re, im, 0, 1, N=nseg)
        f.last_tail = info["tail"]
        return L.det3(M)
    f.last_tail = None
    return f


def pilot(s0, Nmax):
    lad, pre = build(Nmax)
    f = make_f(lad, Nmax)
    rows = []
    for (x, y, h) in ((s0, 0.0, 0.0), (s0, 0.3, 0.05), (s0, 0.6, 0.05), (s0, 0.6, 0.01), (s0, 1.5, 0.05),
                      (s0, 3.0, 0.05)):
        t = time.time()
        r = f(iv.mpf(x), iv.mpf([y, y + h]) if h else iv.mpf(y))
        rows.append({"x": x, "y": [y, y + h], "re": [float(r[0].a), float(r[0].b)], "im": [float(r[1].a), float(r[1].b)],
                     "excludes_0": not (L.has0(r[0]) and L.has0(r[1])), "tail": f.last_tail, "seconds": time.time() - t})
        print(rows[-1], flush=True)
    json.dump({"s0": s0, "Nmax": Nmax, "precompute_s": pre, "rows": rows}, open("certified-count-slow-pilot-s0%g.json" % s0, "w"), indent=1)


def run(s0, h0, Nmax):
    lad, pre = build(Nmax)
    b0, b1, bound_at, Mstar = L.far_line_bound(lad, 0.0)
    Lb = math.ceil(Mstar * 100) / 100
    assert bound_at(Lb) is not None
    X = Y = 1.05 * Lb
    os.makedirs(HB_DIR, exist_ok=True)
    hb = os.path.join(HB_DIR, "heartbeat-count-slow-q0-p+1.json")
    c = Counter(make_f(lad, Nmax), hb=hb, label="slow q=0 p=+1 s0=%g" % s0)
    c.last_hb = -1e9
    r = c.count_symmetric(s0, X, Y, h0, 1e-5)
    r.update({"q": "0", "p": 1, "box": B0, "N_max": Nmax, "Ns": 50000, "precompute_s": pre,
              "root_bound": {"b0": b0, "b1": b1, "Mstar_Lam": Mstar, "Lambda_bound": Lb},
              "module_sha256": hashlib.sha256(open(L.__file__, "rb").read()).hexdigest(),
              "driver_sha256": hashlib.sha256(open(__file__, "rb").read()).hexdigest()})
    json.dump(r, open("certified-count-slow-q0-p+1-s0%g.json" % s0, "w"), indent=1, default=float)
    print("count", r["count"], "certified", r["certified"], "segments", r["segments"], "bisections", r["bisections"],
          "failed", len(r["failed_segments"]), "%.0fs" % r["seconds"], flush=True)


if __name__ == "__main__":
    if sys.argv[1] == "pilot":
        pilot(float(sys.argv[2]), int(sys.argv[3]))
    else:
        run(float(sys.argv[2]), float(sys.argv[3]), int(sys.argv[4]))
