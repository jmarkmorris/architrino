"""Saturday initiative 4, instrument A.  Planar population released from supplied
uniform-motion pasts, evolved by the unchanged row law below wake speed (c_f = 1).

Row received by label i from label j at reception (t, x):  K * sigma_ij * n / (r^2 * D),
  s  : emission time, the root of (t - s) = |x - X_j(s)|   (unique while |X_j'| < 1)
  n  : unit vector from the emission point X_j(s) to the receiver, r = t - s
  D  : 1 - n . X_j'(s)
sigma_ij = +1 for like polarity (repulsion), -1 for unlike.  No own-path row exists
below wake speed, so none is coded.  The integration stops at the first time a speed
reaches one.  Beyond that time the same code is the cross-row comparison system; it is
used only inside the window in which every emission precedes the first event, and it is
NOT the Master Equation there (the own-path row is missing).

Method: classical RK4 with fixed step h; history kept at the nodes with position,
velocity and acceleration and read by quintic Hermite interpolation; emission roots by
Newton iteration.  Known case first (run with no arguments): the stationary mirror
release with K = 0.2862286103053385 and half-separation 0.5, compared with the
separately authored 90-digit oracle record of MEC-007.
"""
import math, sys, json

K = 0.2862286103053385

class Path:
    def __init__(self, p, w, h):
        self.p, self.w, self.h = p, w, h
        self.X, self.V, self.A = [], [], []          # nodes at t = k h, k >= 0
    def push(self, x, v, a):
        self.X.append(x); self.V.append(v); self.A.append(a)
    def eval(self, s):
        """position and velocity at time s (s <= last node)"""
        if s <= 0.0:
            return (self.p[0] + self.w[0]*s, self.p[1] + self.w[1]*s), self.w
        h = self.h; k = int(s/h)
        if k >= len(self.X) - 1: k = len(self.X) - 2
        if k < 0: raise RuntimeError("history not available")
        u = (s - k*h)/h
        if u > 1.0 + 1e-9: raise RuntimeError("emission beyond stored history")
        u2, u3, u4, u5 = u*u, u**3, u**4, u**5
        # quintic Hermite basis (value, first, second derivative at both ends)
        h0 = 1 - 10*u3 + 15*u4 - 6*u5; h1 = u - 6*u3 + 8*u4 - 3*u5; h2 = 0.5*u2 - 1.5*u3 + 1.5*u4 - 0.5*u5
        g0 = 10*u3 - 15*u4 + 6*u5;     g1 = -4*u3 + 7*u4 - 3*u5;    g2 = 0.5*u3 - u4 + 0.5*u5
        d0 = -30*u2 + 60*u3 - 30*u4;   d1 = 1 - 18*u2 + 32*u3 - 15*u4; d2 = u - 4.5*u2 + 6*u3 - 2.5*u4
        e0 = 30*u2 - 60*u3 + 30*u4;    e1 = -12*u2 + 28*u3 - 15*u4;  e2 = 1.5*u2 - 4*u3 + 2.5*u4
        x0, v0, a0, x1, v1, a1 = self.X[k], self.V[k], self.A[k], self.X[k+1], self.V[k+1], self.A[k+1]
        pos = tuple(h0*x0[c] + h*h1*v0[c] + h*h*h2*a0[c] + g0*x1[c] + h*g1*v1[c] + h*h*g2*a1[c] for c in (0, 1))
        vel = tuple((d0*x0[c] + e0*x1[c])/h + d1*v0[c] + e1*v1[c] + h*(d2*a0[c] + e2*a1[c]) for c in (0, 1))
        return pos, vel

def root(t, x, path, s0):
    s = s0
    for _ in range(60):
        (px, py), (vx, vy) = path.eval(s)
        dx, dy = x[0] - px, x[1] - py
        r = math.hypot(dx, dy); G = (t - s) - r
        nx, ny = dx/r, dy/r
        D = 1.0 - (nx*vx + ny*vy)
        if abs(G) < 4e-15: break
        s += G/D                                  # dG/ds = -D
    else:
        raise RuntimeError("emission root not converged")
    return s, r, (nx, ny), D

def accel(i, t, x, paths, pol, guess):
    ax = ay = 0.0; info = []
    for j, pj in enumerate(paths):
        if j == i: continue
        s, r, n, D = root(t, x, pj, guess[j])
        if D <= 0: raise RuntimeError("non-positive transmitter factor below wake speed")
        c = K*pol[i]*pol[j]/(r*r*D)
        ax += c*n[0]; ay += c*n[1]; info.append((j, s, r, D))
        guess[j] = s
    return (ax, ay), info

def run(P, W, pol, h, t_max, aux_window=True, verbose=False):
    N = len(P); paths = [Path(P[i], W[i], h) for i in range(N)]
    x = [tuple(p) for p in P]; v = [tuple(w) for w in W]
    g = [[-math.hypot(P[i][0]-P[j][0], P[i][1]-P[j][1]) for j in range(N)] for i in range(N)]
    a = []
    for i in range(N):
        ai, _ = accel(i, 0.0, x[i], paths, pol, g[i]); a.append(ai)
    for i in range(N): paths[i].push(x[i], v[i], a[i])
    t = 0.0; events = {}; first = None; n = 0
    def stage(tt, xs, shift):
        out = []
        for i in range(N):
            gi = [gg + shift for gg in g[i]]
            ai, _ = accel(i, tt, xs[i], paths, pol, gi); out.append(ai)
        return out
    def step(x, v, a, t, hh):
        xa = [(x[i][0]+0.5*hh*v[i][0], x[i][1]+0.5*hh*v[i][1]) for i in range(N)]
        va = [(v[i][0]+0.5*hh*a[i][0], v[i][1]+0.5*hh*a[i][1]) for i in range(N)]
        k2 = stage(t+0.5*hh, xa, 0.5*hh)
        xb = [(x[i][0]+0.5*hh*va[i][0], x[i][1]+0.5*hh*va[i][1]) for i in range(N)]
        vb = [(v[i][0]+0.5*hh*k2[i][0], v[i][1]+0.5*hh*k2[i][1]) for i in range(N)]
        k3 = stage(t+0.5*hh, xb, 0.5*hh)
        xc = [(x[i][0]+hh*vb[i][0], x[i][1]+hh*vb[i][1]) for i in range(N)]
        vc = [(v[i][0]+hh*k3[i][0], v[i][1]+hh*k3[i][1]) for i in range(N)]
        k4 = stage(t+hh, xc, hh)
        xn = [tuple(x[i][c] + hh*(v[i][c]+2*va[i][c]+2*vb[i][c]+vc[i][c])/6 for c in (0, 1)) for i in range(N)]
        vn = [tuple(v[i][c] + hh*(a[i][c]+2*k2[i][c]+2*k3[i][c]+k4[i][c])/6 for c in (0, 1)) for i in range(N)]
        return xn, vn
    def full(tt, xs, shift):
        acc = []; inf = []
        for i in range(N):
            gi = [gg + shift for gg in g[i]]
            ai, fi = accel(i, tt, xs[i], paths, pol, gi); acc.append(ai); inf.append((fi, gi))
        return acc, inf
    def locate(i, x, v, a, t):
        """time in (t, t+h] at which label i reaches speed one: secant on a partial step"""
        lo, hi = 0.0, h
        f = lambda hh: math.hypot(*step(x, v, a, t, hh)[1][i]) - 1.0
        flo, fhi = math.hypot(*v[i]) - 1.0, f(h)
        for _ in range(80):
            mid = lo - flo*(hi - lo)/(fhi - flo)
            if not (lo < mid < hi): mid = 0.5*(lo + hi)
            fm = f(mid)
            if abs(fm) < 1e-15: break
            if fm > 0: hi, fhi = mid, fm
            else: lo, flo = mid, fm
        xe, ve = step(x, v, a, t, mid)
        ae, inf = full(t + mid, xe, mid)
        sp = math.hypot(*ve[i]); beta = (ve[i][0]*ae[i][0] + ve[i][1]*ae[i][1])/sp
        sep = min(math.hypot(xe[i][0]-xe[j][0], xe[i][1]-xe[j][1]) for j in range(N) if j != i)
        return dict(label=i, T=t+mid, x=xe[i], v=ve[i], a=ae[i], beta=beta, separation=sep,
                    partner=[dict(source=j, emission=s, range=r, D=D) for (j, s, r, D) in inf[i][0]],
                    speeds=[math.hypot(*ve[j]) for j in range(N)], positions=xe)
    while t < t_max:
        xn, vn = step(x, v, a, t, h)
        for i in range(N):
            if i not in events and math.hypot(*vn[i]) >= 1.0:
                events[i] = locate(i, x, v, a, t)
                if first is None or events[i]["T"] < events[first]["T"]: first = i
        an, inf = full(t + h, xn, h)
        for i in range(N): g[i] = inf[i][1]
        x, v, a = xn, vn, an; t += h; n += 1
        for i in range(N): paths[i].push(x[i], v[i], a[i])
        if first is not None:
            d = events[first]["separation"]
            if (not aux_window) or len(events) == N or t > events[first]["T"] + d/4: break
        if min(math.hypot(x[i][0]-x[j][0], x[i][1]-x[j][1]) for i in range(N) for j in range(i)) < 1e-3:
            raise RuntimeError("separation collapsed before a speed-one event")
    return events, first, t

if __name__ == "__main__":
    ref = dict(T=1.57263966427542494723320, q=0.0515067031419049260433244, R=0.291264614512075967194770,
               D=0.528042415793909316213859, Tt=1.28137504976334898003843, acc=6.38952805201604388639681)
    out = {"known_case": [], "target": []}
    print("known case: stationary mirror release, K = %.16f, half-separation 0.5" % K)
    for h in (4e-4, 2e-4, 1e-4):
        ev, first, _ = run([(-0.5, 0.0), (0.5, 0.0)], [(0.0, 0.0), (0.0, 0.0)], [1, -1], h, 3.0, aux_window=False)
        e = ev[0]; p = e["partner"][0]
        err = dict(T=e["T"]-ref["T"], q=-e["x"][0]-ref["q"], R=p["range"]-ref["R"], D=p["D"]-ref["D"],
                   Tt=p["emission"]-ref["Tt"], acc=e["beta"]-ref["acc"])
        out["known_case"].append(dict(h=h, **{k: err[k] for k in err}))
        print("  h=%.0e  differences from the oracle record: T* %+.2e  q %+.2e  range %+.2e  D %+.2e  emission %+.2e  acceleration %+.2e"
              % (h, err["T"], err["q"], err["R"], err["D"], err["Tt"], err["acc"]))
    worst = max(abs(vv) for k, vv in out["known_case"][-1].items() if k != "h")
    print("  largest difference at the finest step: %.2e" % worst)
    if worst > 5e-8:
        print("KNOWN CASE FAILED"); sys.exit(1)
    if len(sys.argv) > 1 and sys.argv[1] == "target":
        h = 1e-4
        fams = {"A: uniform pre-release drifts eps*(0.3,0.7) and eps*(-0.5,0.2)": lambda e: ([(-0.5, 0.0), (0.5, 0.0)], [(0.3*e, 0.7*e), (-0.5*e, 0.2*e)]),
                "B: one label drifting eps*(0,1), the other at rest": lambda e: ([(-0.5, 0.0), (0.5, 0.0)], [(0.0, e), (0.0, 0.0)])}
        for name, fam in fams.items():
            print("\ntarget family", name)
            print("  eps      first  T*(first)      T*-T*(0)     separation   beta(first)  beta(other) T*(other)-T*(first)  window d/4  offline angle(deg)  |x1+x2|")
            T0 = None
            for eps in (0.0, 1e-3, 3e-3, 1e-2, 3e-2, 1e-1):
                P, W = fam(eps)
                ev, first, tend = run(P, W, [1, -1], h, 3.0)
                e = ev[first]; other = 1 - first
                if T0 is None: T0 = e["T"]
                xs = e["positions"]; line = (xs[1][0]-xs[0][0], xs[1][1]-xs[0][1])
                ang = math.degrees(math.acos(min(1.0, abs(e["v"][0]*line[0] + e["v"][1]*line[1])/(math.hypot(*e["v"])*math.hypot(*line)))))
                oth = ev.get(other)
                row = dict(family=name[0], eps=eps, first=first, T=e["T"], dT=e["T"]-T0, separation=e["separation"], beta=e["beta"],
                           beta_other=(oth["beta"] if oth else None), lag=(oth["T"]-e["T"] if oth else None),
                           window=e["separation"]/4, angle_deg=ang, asym=math.hypot(xs[0][0]+xs[1][0], xs[0][1]+xs[1][1]),
                           emission=e["partner"][0]["emission"], D=e["partner"][0]["D"], range=e["partner"][0]["range"],
                           other_speed_at_first=e["speeds"][other])
                out["target"].append(row)
                print("  %-7g  %d      %.10f  %+.3e   %.8f   %.6f     %s    %s        %.5f     %.4f            %.2e"
                      % (eps, first, e["T"], e["T"]-T0, e["separation"], e["beta"],
                         ("%.6f" % oth["beta"]) if oth else "  --    ", ("%+.3e" % (oth["T"]-e["T"])) if oth else "outside window",
                         e["separation"]/4, ang, row["asym"]))
        json.dump(out, open("release_population_target.json", "w"), indent=1)
    else:
        json.dump(out, open("release_population_known.json", "w"), indent=1)
