"""Saturday follow-up task 2, second instrument (added after review finding S6).

Rebuilds the inputs of the root-time budget at the first rejected step from the retained COEFFICIENTS of the
rejected-candidate dump, instead of taking P and N from the solver's diagnostic string as frontier_budget.py does:
  * shared-symbol coefficients and independent remainder of the receiver's joint segment, evaluated at reception;
  * the same for the transmitter's joint segment at the reported emission point;
  * nominal separation r0 from the ordinary cubic coefficients of both paths;
  * P = sum_j |a_j| + rho_receiver + rho_transmitter on the axis of motion (the line of sight is that axis),
    B = P on that axis (the transverse entries are of order 1e-21), N = B^2 / (2 (r0 - B)), domain B < r0;
  * the ordinary-box budget from the ordinary position radii;
  * a transmitter-factor floor from the source segment's nominal velocity over the reported difficult cell and its
    ordinary velocity radius.
Exact rational arithmetic on the decimal tokens of the dump.  It reads only solver OUTPUT; no solver code.

argv: fixture no-argument stdout, rejected-candidate dump, output json.
Known case first: the theorem document's tabulated row (same as frontier_budget.py K1).
"""
import json, sys
from fractions import Fraction as Fr
F = lambda x: Fr(x)

Wg = F("2.3358335487121392e-4") + F("5.8451014205730445e-7"); ws = Wg/F("1.0416561786956829")
print("K1 theorem row: root-time width %.16e (tabulated 2.2480341383515460e-4)" % float(ws))
assert abs(float(ws) - 2.2480341383515460e-4) < 1e-18, "KNOWN CASE FAILED"
print("known case passed\n")

fx = json.load(open(sys.argv[1])); row = fx["cross_roots"][0]
parts = dict(p.split("=") for p in row["diagnostic"].split("/") if "=" in p)
cand = json.load(open(sys.argv[2]))
rid, tid = row["receiver"], row["transmitter"]
T = F(row["reception_time"]); s = F(row["difficult_point"]); cell = (F(row["difficult_cell_lower"]), F(row["difficult_cell_upper"]))
assert cand["end_time"] == row["reception_time"]
path = {p["path_id"]: p["segments"] for p in cand["paths"]}; joint = {j["map_path_id"]: j["segments"] for j in cand["joint_histories"]}
def seg_at(segs, t, key_s="start_time", key_e="end_time", last=False):
    if last: return len(segs) - 1
    for i, g in enumerate(segs):
        if F(g[key_s]) <= t < F(g[key_e]): return i
ir = seg_at(path[rid], T, last=True); it = seg_at(path[tid], s)
print("receiver %s: candidate segment %d [%s, %s]; transmitter %s: segment %d [%s, %s] (reported source segment index %s)" %
      (rid, ir, path[rid][ir]["start_time"], path[rid][ir]["end_time"], tid, it, path[tid][it]["start_time"], path[tid][it]["end_time"], row["difficult_source_segment_index"]))
assert it == int(row["difficult_source_segment_index"])
def poly(c, u): return sum(F(ck)*u**k for k, ck in enumerate(c))
def dpoly(c, u): return sum(k*F(ck)*u**(k-1) for k, ck in enumerate(c) if k)
def joint_eval(seg, t):
    u = t - F(seg["start_time"]); pc = seg["position_coefficients"][0]              # axis 0: [power][symbol]
    nsym = len(pc[0]); a = [sum(F(pc[p][j])*u**p for p in range(len(pc))) for j in range(nsym)]
    return a, F(seg["position_remainder_radii"][0])
ar, rr = joint_eval(joint[rid][ir], T); at, rt = joint_eval(joint[tid][it], s)
diff = [x - y for x, y in zip(ar, at)]
Paff = sum(abs(d) for d in diff); Prem = rr + rt; P = Paff + Prem
trans = max(F(joint[rid][ir]["position_remainder_radii"][k]) + F(joint[tid][it]["position_remainder_radii"][k]) for k in (1, 2))
xr = poly(path[rid][ir]["coefficients"][0], T - F(path[rid][ir]["start_time"])); xt = poly(path[tid][it]["coefficients"][0], s - F(path[tid][it]["start_time"]))
r0 = abs(xr - xt); B = P; assert B < r0
N = B*B/(2*(r0 - B))
m_rep = F(row["difficult_transmitter_factor_lower"])
print("\nJOINT route, from coefficients:")
print("   nonzero shared symbols at reception on the receiver: %d, sum of |coefficients| = %.13e ; on the transmitter at emission: %d" %
      (sum(1 for x in ar if x), float(sum(abs(x) for x in ar)), sum(1 for x in at if x)))
print("   independent remainders: receiver %.10e, transmitter %.10e ; largest transverse remainder %.1e" % (float(rr), float(rt), float(trans)))
print("   projected radius P = shared %.13e + remainder %.13e = %.13e" % (float(Paff), float(Prem), float(P)))
print("   solver diagnostic: affine_radius %s + remainder_radius %s = %.13e   -> relative difference of totals %.2e" %
      (parts["affine_radius"], parts["remainder_radius"], float(F(parts["affine_radius"]) + F(parts["remainder_radius"])),
       float((P - F(parts["affine_radius"]) - F(parts["remainder_radius"]))/P)))
print("   (the solver's split differs from this one: it reports the shared part as zero and the whole as remainder; only the total enters the budget)")
print("   nominal separation r0 = %.13f (reception minus emission = %.13f, nominal causal residual %.3e) ; domain B < r0 holds with B/r0 = %.2e" %
      (float(r0), float(T - s), float(r0 - (T - s)), float(B/r0)))
print("   nonlinear term N = B^2/(2(r0-B)) = %.13e ; solver diagnostic %s ; relative difference %.2e" % (float(N), parts["nonlinear_radius"], float((N - F(parts["nonlinear_radius"]))/N)))
W = 2*(P + N)/m_rep
print("   width with the REPORTED factor floor %.16f: %.16e ; solver %s ; relative difference %.2e" % (float(m_rep), float(W), parts["joint_width"], float((W - F(parts["joint_width"]))/W)))

print("\nORDINARY route, from the ordinary position radii:")
orr, ort = F(path[rid][ir]["position_errors"][0]), F(path[tid][it]["position_errors"][0]); Po = orr + ort; No = Po*Po/(2*(r0 - Po)); Wo = 2*(Po + No)/m_rep
print("   radii %.10e + %.10e = %.10e ; N = %.4e ; width %.16e ; solver ordinary_width %s ; relative difference %.2e" %
      (float(orr), float(ort), float(Po), float(No), float(Wo), parts["ordinary_width"], float((Wo - F(parts["ordinary_width"]))/Wo)))
print("   joint total is %.2f %% below the ordinary sum; receiver joint projection %.10e against its ordinary radius %.10e (dominated: %s); transmitter %.10e against %.10e (dominated: %s)" %
      (float((1 - P/Po)*100), float(sum(abs(x) for x in ar) + rr), float(orr), sum(abs(x) for x in ar) + rr <= orr, float(rt), float(ort), rt <= ort))

print("\nTRANSMITTER FACTOR over the reported difficult cell [%.10f, %.10f], from the source segment's nominal velocity and ordinary velocity radius:" % (float(cell[0]), float(cell[1])))
ct = path[tid][it]["coefficients"][0]; t0 = F(path[tid][it]["start_time"]); rv = F(path[tid][it]["velocity_errors"][0])
sgn = 1 if xr > xt else -1                                   # unit vector from emission point to receiver along x
vs = [dpoly(ct, c - t0) for c in (cell[0], s, cell[1])]
Ds = [1 - sgn*v for v in vs]
mine_lo, mine_hi = min(Ds) - rv, max(Ds) + rv
print("   nominal D at cell ends and point: %.10f, %.10f, %.10f ; velocity radius %.4e" % (float(Ds[0]), float(Ds[1]), float(Ds[2]), float(rv)))
print("   floor and ceiling from these: [%.10f, %.10f] ; solver enclosure [%s, %s]" % (float(mine_lo), float(mine_hi), row["difficult_transmitter_factor_lower"][:12], row["difficult_transmitter_factor_upper"][:12]))
print("   the solver's enclosure is wider by %.3e below and %.3e above (= %.2f and %.2f velocity radii): NOT reproduced; the solver's floor is the more conservative" %
      (float(mine_lo - m_rep), float(F(row["difficult_transmitter_factor_upper"]) - mine_hi), float((mine_lo - m_rep)/rv), float((F(row["difficult_transmitter_factor_upper"]) - mine_hi)/rv)))
for name, mm in (("this instrument's floor", mine_lo), ("the nominal factor at the point, no uncertainty", Ds[1])):
    w = 2*(P + N)/mm
    print("   width with %s (%.10f): %.10e -> %s the tolerance %s" % (name, float(mm), float(w), "exceeds" if w > F(fx["root_tolerance"]) else "within", fx["root_tolerance"]))
json.dump(dict(P_shared=float(Paff), P_remainder=float(Prem), P=float(P), r0=float(r0), N=float(N), width_reported_floor=float(W), ordinary_width=float(Wo),
               floor_this_instrument=float(mine_lo), floor_reported=float(m_rep)), open(sys.argv[3], "w"), indent=1)
