"""Certified argument-principle count of characteristic roots of det Delta(Lam; q, p) in a rectangle
Omega = {s0 <= Re Lam <= X, |Im Lam| <= Y} (Lam = lambda/omega), uniformly over a balance box.
Uses ladder_spectral_iv.py unchanged.  For q in {0, pi} the coefficients are real, so
f(conj Lam) = conj f(Lam): the boundary winding is twice the argument change along the upper half
path (X,0) -> (X,Y) -> (s0,Y) -> (s0,0), and the count is n = (upper argument change)/pi.

Segment rule (derived): if the interval enclosure of f over a boundary segment S is a rectangle
not containing 0, it lies in an open half-plane through the origin, arg has a continuous branch on
it with range < pi, and the argument change along S equals the principal angle between the end
values, Arg(f(z1)/f(z0)) in (-pi, pi).  That angle is computed from the midpoints of the end-value
enclosures at 50 digits, with error at most asin(r0/|m0|) + asin(r1/|m1|) (r = enclosure
half-diagonal).  The count is certified when |sum - n pi| + sum(errors) < pi/2.
Usage: python certified_count.py known
       python certified_count.py ladder Q P S0 [H0] [NMAX]     (Q in {0, pi})"""
import json
import math
import os
import sys
import time

import mpmath
from mpmath import iv

import ladder_spectral_iv as L

mpmath.mp.dps = 50
HB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), *[".."] * 7,
                      ".local-data/master-equation-closure/rotating-ladder/claude-2026-10-20/spectral-certificate")
B0 = {"R": "1000", "delta": ["3.34503529238", "3.34503529306"], "eps": ["0.0138408142416", "0.0138408143198"]}


def half_diag_up(z):
    re, im = z
    a = iv.mpf(re.delta) / 2
    b = iv.mpf(im.delta) / 2
    return float(iv.sqrt(a * a + b * b).b) * (1 + 1e-15)


def mid(z):
    return (mpmath.mpf(z[0].mid), mpmath.mpf(z[1].mid))


class Counter:
    def __init__(self, f, hb=None, label=""):
        """f(re, im) -> (re, im) complex-interval enclosure of the function over the rectangle."""
        self.f = f
        self.cache = {}
        self.hb = hb
        self.label = label
        self.nevals = 0
        self.t0 = time.time()
        self.last_hb = 0

    def fp(self, x, y):
        key = (x, y)
        if key not in self.cache:
            self.cache[key] = self.f(iv.mpf(x), iv.mpf(y))
            self.nevals += 1
        return self.cache[key]

    def angle(self, A, B):
        ra, rb = half_diag_up(A), half_diag_up(B)
        ma, mb = mid(A), mid(B)
        na = mpmath.sqrt(ma[0] ** 2 + ma[1] ** 2)
        nb = mpmath.sqrt(mb[0] ** 2 + mb[1] ** 2)
        if ra >= 0.5 * na or rb >= 0.5 * nb:
            return None
        # angle of mb * conj(ma)
        re = mb[0] * ma[0] + mb[1] * ma[1]
        im = mb[1] * ma[0] - mb[0] * ma[1]
        th = mpmath.atan2(im, re)
        err = mpmath.asin(ra / na) + mpmath.asin(rb / nb) + mpmath.mpf("1e-40")
        return th, err

    def heartbeat(self, extra):
        if self.hb is None:
            return
        now = time.time()
        if now - self.last_hb >= 20:
            self.last_hb = now
            json.dump({"label": self.label, "utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                       "elapsed_s": now - self.t0, "evals": self.nevals, **extra}, open(self.hb, "w"))

    def path(self, corners, h0, hmin):
        """argument change along the polygonal path through corners (each (x, y) floats)."""
        segs = []
        for (a, b) in zip(corners[:-1], corners[1:]):
            n = max(1, int(math.ceil(math.hypot(b[0] - a[0], b[1] - a[1]) / h0)))
            pts = [(a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n) for i in range(n + 1)]
            pts[-1] = b
            segs.extend(zip(pts[:-1], pts[1:]))
        segs.reverse()
        total = mpmath.mpf(0)
        errsum = mpmath.mpf(0)
        done = 0
        bisections = 0
        failed = []
        minlen = h0
        while segs:
            (z0, z1) = segs.pop()
            box = (iv.mpf([min(z0[0], z1[0]), max(z0[0], z1[0])]), iv.mpf([min(z0[1], z1[1]), max(z0[1], z1[1])]))
            rect = self.f(*box)
            self.nevals += 1
            ok = not (L.has0(rect[0]) and L.has0(rect[1]))
            res = None
            if ok:
                res = self.angle(self.fp(*z0), self.fp(*z1))
                ok = res is not None and abs(res[0]) + res[1] < mpmath.pi
            if ok:
                total += res[0]
                errsum += res[1]
                done += 1
            else:
                ln = math.hypot(z1[0] - z0[0], z1[1] - z0[1])
                if ln < hmin:
                    failed.append([z0, z1])
                    continue
                zm = (0.5 * (z0[0] + z1[0]), 0.5 * (z0[1] + z1[1]))
                segs.append((zm, z1))
                segs.append((z0, zm))
                bisections += 1
                minlen = min(minlen, ln / 2)
            self.heartbeat({"segments_done": done, "remaining": len(segs), "bisections": bisections,
                            "at": list(z0), "partial_arg_over_pi": float(total / mpmath.pi)})
        return {"arg_change": total, "err": errsum, "segments": done, "bisections": bisections,
                "failed": failed, "min_segment": minlen}

    def count_symmetric(self, s0, X, Y, h0, hmin):
        """count zeros in [s0, X] x [-Y, Y] for f with f(conj z) = conj f(z)."""
        corners = [(X, 0.0), (X, Y), (s0, Y), (s0, 0.0)]
        r = self.path(corners, h0, hmin)
        tot, err = r["arg_change"], r["err"]
        n = int(mpmath.nint(tot / mpmath.pi))
        cert = (not r["failed"]) and (abs(tot - n * mpmath.pi) + err < mpmath.pi / 2)
        # consistency: end values real; sign(f(X)) * sign(f(s0)) = (-1)^n
        fX, fs = self.fp(X, 0.0), self.fp(s0, 0.0)
        sgn = (1 if fX[0].a > 0 else -1 if fX[0].b < 0 else 0) * (1 if fs[0].a > 0 else -1 if fs[0].b < 0 else 0)
        return {"region": {"s0": s0, "X": X, "Y": Y}, "count": n, "certified": bool(cert),
                "upper_arg_over_pi": float(tot / mpmath.pi), "err_over_pi": float(err / mpmath.pi),
                "segments": r["segments"], "bisections": r["bisections"], "failed_segments": r["failed"],
                "min_segment": r["min_segment"], "evaluations": self.nevals,
                "end_sign_product": sgn, "parity_consistent": bool(sgn == (-1) ** n),
                "seconds": time.time() - self.t0}


# ------------------------------------------------------------------ known cases
def known():
    out = {}
    # (1) real polynomial with known zeros
    zeros = [0.5, complex(1, 1), complex(1, -1), complex(2.5, 3), complex(2.5, -3), 2.0, 2.0, 4.0, 0.1,
             complex(1, 5), complex(1, -5)]

    def poly(re, im):
        acc = (iv.mpf(1), iv.mpf(0))
        for zk in zeros:
            zk = complex(zk)
            acc = L.cmul(acc, (re - zk.real, im - zk.imag))
        return acc
    s0, X, Y = 0.3, 3.5, 3.5
    expect = sum(1 for zk in zeros if s0 < complex(zk).real < X and abs(complex(zk).imag) < Y)
    c = Counter(poly)
    r = c.count_symmetric(s0, X, Y, 0.05, 1e-6)
    r["expected"] = expect
    out["polynomial"] = r
    print("polynomial", r["count"], "expected", expect, r["certified"], flush=True)

    # (2) z - 20 e^{-z}: zeros W_k(20)
    def lam(re, im):
        ex = iv.exp(-re)
        return (re - 20 * ex * iv.cos(im), im + 20 * ex * iv.sin(im))
    s0, X, Y = 0.3, 3.0, 12.0
    ws = [mpmath.lambertw(20, k) for k in range(-12, 13)]
    expect = sum(1 for w in ws if s0 < w.real < X and abs(w.imag) < Y)
    c = Counter(lam)
    r = c.count_symmetric(s0, X, Y, 0.05, 1e-6)
    r["expected"] = expect
    r["lambert_values_inside"] = [[float(w.real), float(w.imag)] for w in ws if s0 < w.real < X and abs(w.imag) < Y]
    out["lambert"] = r
    print("lambert", r["count"], "expected", expect, r["certified"], flush=True)
    # (3) the same with a zero placed on the contour edge must fail to certify (negative control)
    zeros2 = [0.3, 1.0]

    def poly2(re, im):
        acc = (iv.mpf(1), iv.mpf(0))
        for zk in zeros2:
            acc = L.cmul(acc, (re - zk, im))
        return acc
    c = Counter(poly2)
    r = c.count_symmetric(0.3, 2.0, 1.0, 0.05, 1e-4)
    out["negative_control_zero_on_edge"] = {"certified": r["certified"], "failed_segments": len(r["failed_segments"])}
    print("negative control certified:", r["certified"], flush=True)
    json.dump(out, open("certified-count-known.json", "w"), indent=1, default=float)


# ------------------------------------------------------------------ ladder
def ladder_count(qs, p, s0, h0=0.05, Nmax=1000):
    q = math.pi if qs == "pi" else float(qs)
    label = "q=%s,p=%+d,s0=%g" % (qs, p, s0)
    os.makedirs(HB_DIR, exist_ok=True)
    hb = os.path.join(HB_DIR, "heartbeat-count-q%s-p%+d.json" % (qs, p))
    t0 = time.time()
    lad = L.Ladder(iv.mpf(B0["delta"]), iv.mpf(B0["eps"]), R=iv.mpf(B0["R"]), N=Nmax, Ns=50000, verbose=True)
    pre = time.time() - t0
    # certified root bound for Re Lam >= 0, all q and p (stage-1 far_line_bound at sigma = 0)
    b0, b1, bound_at, Mstar = L.far_line_bound(lad, 0.0)
    Lb = math.ceil(Mstar * 100) / 100
    assert bound_at(Lb) is not None
    X = Y = 1.05 * Lb
    eps_lo = float(lad.eps.a)
    dl = float(lad.delta.a)

    def f(re, im):
        relo = float(re.a)
        nseg = int(min(Nmax, max(150, math.ceil(14.0 / max(relo * eps_lo * dl, 1e-9)))))
        M, _ = lad.matrix(re, im, q, p, N=nseg)
        return L.det3(M)
    c = Counter(f, hb=hb, label=label)
    r = c.count_symmetric(s0, X, Y, h0, 1e-4)
    r.update({"q": qs, "p": p, "box": B0, "N_max": Nmax, "Ns": 50000, "precompute_s": pre,
              "root_bound": {"b0": b0, "b1": b1, "Mstar_Lam": Mstar, "Lambda_bound": Lb,
                             "statement": "no root with Re Lam >= 0 and |Lam| >= Lambda_bound, any q, p (Frobenius bound)"}})
    r["module_sha256"] = __import__("hashlib").sha256(open(L.__file__, "rb").read()).hexdigest()
    r["driver_sha256"] = __import__("hashlib").sha256(open(__file__, "rb").read()).hexdigest()
    json.dump(r, open("certified-count-q%s-p%+d.json" % (qs, p), "w"), indent=1, default=float)
    print(label, "count", r["count"], "certified", r["certified"], "segments", r["segments"], "bisections",
          r["bisections"], "%.0fs" % r["seconds"], flush=True)


if __name__ == "__main__":
    if sys.argv[1] == "known":
        known()
    else:
        args = sys.argv[2:]
        ladder_count(args[0], int(args[1]), float(args[2]), float(args[3]) if len(args) > 3 else 0.05,
                     int(args[4]) if len(args) > 4 else 1000)
