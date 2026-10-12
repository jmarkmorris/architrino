"""Saturday follow-up task 2, instrument: independent reconstruction of the root-time budget at the
first rejected step of the stationary frontier fixture, and of where its inputs come from.

It reads the fixture's own diagnostic outputs (no solver code is imported or linked):
  argv[1]  no-argument fixture stdout              (schema eom_stationary_joint_frontier_fixture/v4)
  argv[2]  rejected-candidate dump of the frozen source      (--candidate-out, schema eom_rejected_candidate_diagnostic/v1)
  argv[3]  --trajectory output of the private variant without the recentering block (schema eom_stationary_controller_continuation/v1)
  argv[4]  MEC-007 oracle record (independent 90-digit terminal values and checkpoints; read only)
  argv[5]  output JSON to write
  argv[6]  --trajectory output of the frozen source

Known cases, run first, exit 1 on failure:
  K1  the root-time budget theorem's tabulated row (borg-current-root-time-budget-theorem-2026-07-20):
      residual width 2.3358335487121392e-4 + 5.8451014205730445e-7 over factor 1.0416561786956829
      must give the tabulated 2.2480341383515460e-4.
  K2  a separately written scalar integration of the stationary mirror release (unchanged row law, c_f = 1,
      K = 0.2862286103053385, half-separation 0.5) must reproduce the oracle's terminal time and half-position.
Exact rational arithmetic is used for the budget; the mirror reference is double-precision RK4 with a
quintic-Hermite history and Newton roots (fixed step; no error enclosure; a sensitivity control only).
"""
import json, math, sys
from fractions import Fraction as Fr

def F(x): return Fr(str(x)) if not isinstance(x, str) else Fr(x)

# ---------------- K1
Wg = F("2.3358335487121392e-4") + F("5.8451014205730445e-7"); ws = Wg / F("1.0416561786956829")
print("K1 theorem row: residual width %.16e (tabulated 2.3416786501327129e-4), root-time width %.16e (tabulated 2.2480341383515460e-4)" % (float(Wg), float(ws)))
assert abs(float(Wg) - 2.3416786501327129e-4) < 1e-18 and abs(float(ws) - 2.2480341383515460e-4) < 1e-18

# ---------------- K2: scalar mirror reference
K = 0.2862286103053385
def mirror(h, t_stop):
    """q'' = -K/((T-s)^2 (1-u(s))), u = -q', root q(T)+q(s) = T-s; returns node lists (t,q,v,a) with v=q'."""
    Q, V, A = [0.5], [0.0], [-K/1.0]            # at T=0: partner at rest seen at distance 1, D=1
    def ev(s):
        if s <= 0: return 0.5, 0.0
        k = min(int(s/h), len(Q)-2); u = (s-k*h)/h; u2,u3,u4,u5 = u*u,u**3,u**4,u**5
        h0=1-10*u3+15*u4-6*u5; h1=u-6*u3+8*u4-3*u5; h2=.5*u2-1.5*u3+1.5*u4-.5*u5; g0=10*u3-15*u4+6*u5; g1=-4*u3+7*u4-3*u5; g2=.5*u3-u4+.5*u5
        d0=-30*u2+60*u3-30*u4; d1=1-18*u2+32*u3-15*u4; d2=u-4.5*u2+6*u3-2.5*u4; e0=-d0; e1=-12*u2+28*u3-15*u4; e2=1.5*u2-4*u3+2.5*u4
        q=h0*Q[k]+h*h1*V[k]+h*h*h2*A[k]+g0*Q[k+1]+h*g1*V[k+1]+h*h*g2*A[k+1]
        v=(d0*Q[k]+e0*Q[k+1])/h+d1*V[k]+e1*V[k+1]+h*(d2*A[k]+e2*A[k+1]); return q, v
    def acc(T, q, s0):
        s = s0
        for _ in range(60):
            qs, vs = ev(s); G = (T - s) - (q + qs); D = 1.0 + vs          # dG/ds = -(1 - u(s)) = -(1 + q'(s))
            if abs(G) < 4e-15: break
            s += G/D
        qs, vs = ev(s); return -K/((T - s)**2*(1.0 + vs)), s
    t, q, v, s = 0.0, 0.5, 0.0, -1.0; a = A[0]; out = [(0.0, q, v, a, s)]
    n = int(round(t_stop/h))
    for i in range(n):
        k2, s2 = acc(t+.5*h, q+.5*h*v, s+.5*h); va = v+.5*h*a
        k3, s3 = acc(t+.5*h, q+.5*h*va, s2); vb = v+.5*h*k2
        k4, s4 = acc(t+h, q+h*vb, s3+.5*h); vc = v+h*k3
        qn = q + h*(v+2*va+2*vb+vc)/6; vn = v + h*(a+2*k2+2*k3+k4)/6; t += h
        an, s = acc(t, qn, s4); q, v, a = qn, vn, an; Q.append(q); V.append(v); A.append(a); out.append((t, q, v, a, s))
        if -v >= 1.0: break
    return out, ev
orc = json.load(open(sys.argv[4]))
term = orc["runs"][-1]["terminal"]
kT, oT = "reception", float(term["reception"]); kq, oq = "q", float(term["q"])
ref, ev = mirror(1e-4, 1.6)
# terminal: locate u = 1 by linear interpolation of the last two nodes (adequate for a control at 1e-7)
(t0, q0, v0, a0, _), (t1, q1, v1, a1, _) = ref[-2], ref[-1]
th = (1.0 + v0)/(v0 - v1); Tstar = t0 + th*(t1 - t0); qstar = q0 + th*(q1 - q0)
print("K2 mirror reference: T* %.9f (oracle %s %.9f), q* %.9f (oracle %s %.9f)" % (Tstar, kT, oT, qstar, kq, oq))
assert abs(Tstar - oT) < 2e-7 and abs(qstar - oq) < 2e-7, "KNOWN CASE FAILED"
c124 = orc["runs"][-1]["time_checkpoints"]["1.24"]; q124 = [r for r in ref if abs(r[0] - 1.24) < 1e-9][0][1]
print("K2 at T = 1.24: reference q %.12f, oracle checkpoint q %.12f, difference %.1e" % (q124, float(c124["q"]), q124 - float(c124["q"])))
assert abs(q124 - float(c124["q"])) < 1e-8, "KNOWN CASE FAILED"
print("known cases passed\n")

# ---------------- targets
fx = json.load(open(sys.argv[1])); row = fx["cross_roots"][0]
parts = dict(p.split("=") for p in row["diagnostic"].split("/") if "=" in p)
m = F(row["difficult_transmitter_factor_lower"][:40]); tau = F(fx["root_tolerance"])
aff, rem, nl = F(parts["affine_radius"]), F(parts["remainder_radius"]), F(parts["nonlinear_radius"])
width = 2*(aff + rem + nl)/m
print("T1 budget at reception %s (receiver %s, transmitter %s):" % (row["reception_time"], row["receiver"], row["transmitter"]))
print("   reported joint width      %s" % parts["joint_width"])
print("   reconstructed 2(P+N)/m    %.16e   (P affine %.3e, P remainder %.10e, nonlinear %.4e, m = %.16f)" % (float(width), float(aff), float(rem), float(nl), float(m)))
print("   relative difference       %.2e  (the solver rounds outward)" % float((F(parts["joint_width"]) - width)/width))
print("   tolerance                 %s ; excess %.4f %% ; allowed projected radius m*tau/2 - N = %.10e ; present %.10e ; needed reduction %.3e" %
      (fx["root_tolerance"], float((width/tau - 1)*100), float(m*tau/2 - nl), float(aff + rem), float(aff + rem - (m*tau/2 - nl))))
print("   other terms: bracket half-width %s, centre residual %s, source cell width %s" % (parts["bracket_half_width"], parts["center_residual"], parts["cell_width"]))

def hist(path):
    c = json.load(open(path)); p = [q for q in c["paths"] if q["path_id"] == "positive"][0]
    segs = [(float(s["start_time"]), float(s["end_time"]), float(s["coefficients"][0][0]), float(s["position_errors"][0]), float(s["velocity_errors"][0])) for s in p["segments"]]
    return c, [s for s in segs if s[1] > 1e-12]
def frames(path):
    """published position enclosure of the positive member at each accepted time, from the fixture's --trajectory frames;
    returned in the same tuple layout as hist(): (previous time, time, nominal x, radius x, 0)"""
    d = json.load(open(path)); out = []; prev = 0.0
    for fr in d["trajectory"]:
        p = [q for q in fr["paths"] if q["path_id"] == "positive"][0]; t = float(fr["time"])
        if t <= 0: prev = t; continue
        lo, hi = p["position"][0]; out.append((prev, t, p["nominal_position"][0], (hi - lo)/2, 0.0)); prev = t
    return d, out
cW, hW = hist(sys.argv[2]); dWt, fW = frames(sys.argv[6]); dVt, fV = frames(sys.argv[3])
recv = hW[-1]; src = [s for s in hW if s[0] <= float(row["difficult_point"][:20]) < s[1]][0]
print("\nT2 where the projected radius comes from (published history error radii, x axis):")
print("   receiver candidate segment [%.4f, %.4f]: %.10e" % (recv[0], recv[1], recv[3]))
print("   source segment containing the emission %.6f, [%.4f, %.4f]: %.10e" % (float(row["difficult_point"][:20]), src[0], src[1], src[3]))
osum = F(str(recv[3])) + F(str(src[3]))
print("   sum %.10e ; 2*sum/m = %.10e ; reported ordinary width %s ; joint remainder %.10e (%.2f %% below the sum)" %
      (float(osum), float(2*osum/m), parts["ordinary_width"], float(rem), float((1 - rem/osum)*100)))
print("   shares: receiver %.1f %%, source %.1f %%" % (100*recv[3]/float(osum), 100*src[3]/float(osum)))

def radius_at(h, t):
    best = h[0]
    for s in h:
        if s[1] <= t + 1e-12: best = s
    return best[3], best[4]
def steps_to(h, t): return sum(1 for s in h if s[1] <= t + 1e-12)
print("\nT3 published position radius of one member against time; frozen source (W) and private variant without recentering (V)")
print("   time    steps W  radius W      steps V  radius V      ratio W/V   |nominal W - reference|   radius W / actual error")
refmap = {round(r[0], 4): r[1] for r in ref}
for t in (0.2, 0.4, 0.6, 0.8, 1.0, 1.1, 1.2, 1.24):
    rw, _ = radius_at(fW, t); rv, _ = radius_at(fV, t)
    seg = [s for s in fW if s[1] <= t + 1e-12][-1]
    qs, _ = ev(seg[1]); err = abs(seg[2] - qs)
    print("   %.3f   %5d   %.4e   %5d   %.4e   %.3f       %.3e                %.1f" % (t, steps_to(fW, t), rw, steps_to(fV, t), rv, rw/rv, err, rw/max(err, 1e-300)))
def stats(h, t_end):
    d = sorted(s[1] - s[0] for s in h if s[1] <= t_end + 1e-12); inc = [b[3] - a[3] for a, b in zip(h, h[1:]) if b[1] <= t_end + 1e-12]
    return len(d), d[0], d[len(d)//2], d[-1], max(inc), sum(1 for x in d if x < 0.004)
for name, h in (("W", fW), ("V", fV)):
    n, mn, md, mx, minc, nsmall = stats(h, 1.24)
    print("   %s prefix to 1.24: %d accepted steps, step min %.5f median %.5f max %.5f, steps shorter than 0.004: %d, largest single-step radius increment %.3e" % (name, n, mn, md, mx, nsmall, minc))
lim = 0.125*2e-6
print("   per-step acceptance limit on the full-step/half-step difference: 0.125 * position tolerance = %.3e" % lim)
segW = [x for x in fW if abs(x[1] - 1.2399999999999993) < 1e-9][0]; segV = [x for x in fV if abs(x[1] - 1.2399999999999993) < 1e-9][0]
print("   at T = 1.24 against the oracle checkpoint q = %s: nominal W differs by %.3e (published radius %.3e); nominal V differs by %.3e (radius %.3e)" %
      (c124["q"][:14], segW[2] - float(c124["q"]), segW[3], segV[2] - float(c124["q"]), segV[3]))
print("\nT4 if the receiver radius grew no faster than in V: V radius at 1.24 is %.4e; W is %.4e" % (radius_at(fV, 1.24)[0], radius_at(fW, 1.24)[0]))
json.dump(dict(width_reconstructed=float(width), width_reported=float(parts["joint_width"]), m=float(m), remainder=float(rem), nonlinear=float(nl),
               receiver_radius=recv[3], source_radius=src[3], reference_T=Tstar, reference_q=qstar,
               W_steps=stats(fW, 1.24)[0], V_steps=stats(fV, 1.24)[0]), open(sys.argv[5], "w"), indent=1)
