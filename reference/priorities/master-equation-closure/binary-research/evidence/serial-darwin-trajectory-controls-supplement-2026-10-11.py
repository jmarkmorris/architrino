"""Supplement for review comments R6-01, R6-02 and R6-04 on the Darwin trajectory controls (serial task 6).

Imports the reference script serial-darwin-trajectory-controls-reference-2026-10-11.py unchanged (its own
known cases run at import and must pass) and reads the retained raw records of control 3 (DC-100 plus
common normal velocity, 50 periods). No trajectory is integrated and no retained file is rewritten.

Part A (R6-01). Inner turning point as a function of the three invariants. With D = r^2 + r/2 and
q = 1 - 1/(2r), W(r; l, P) = l^2/D - 1/r + P^2/(4q). A simple turning root of E = W(r; l, P) moves by
    delta r = [delta E - (2l/D) delta l - (P/(2q)) delta P] / W'(r)
to first order (the coordinator's formula, re-derived by differentiating E = W). For every located inner
turning point of the raw records, the state's own E, l = J_z and P_z are recomputed here in 60-digit
arithmetic from its binary64 positions and velocities, with formulas written from the functional
(p_1 = V_1 + a M V_2, a = -K/(2r), M = I + e e^T; E = (V_1.p_1 + V_2.p_2)/2 - K/r; P = p_1 + p_2;
J = X_1 x p_1 + X_2 x p_2). The exact inner root of W at those invariants is then compared with the
state's separation. Agreement is an algebraic identity of the reduction at a state with dr/dT = 0 in the
invariant plane; it shows which invariant errors displace the turning point, not why they arose.

Part B (R6-02). Strict membership of every sampled and located separation in [100, 100 + 1/360], per
setting, with the measured extremes. (The reference output's field
sampled_inside_enclosure_100_to_100_plus_1_over_360 used a lower slack of 1e-6 and samples only.)

Part C (R6-04). The reference replaces the quotient G by its endpoint limit where |sin(phi/2)| or
|cos(phi/2)| is below 1e-8. Measured here: the relative difference between the quotient and the limit at
that threshold, and the change of the radial period, angle advance and centre travel when the number of
quadrature pieces is doubled from 8 to 16.

Known cases first: the inner root at the unperturbed invariants is 100; W'(100) at the binary64 data is
within 1e-18 of -1/800000000; lowering E alone moves the exact inner root outward and by delta E / W';
lowering l alone and lowering P alone each move it inward by the formula's amount; a planted wrong sign of
the l term misses the exact shift by more than half; and the 60-digit invariants of the prepared state
equal the derived P, l and W(100).
Usage: python <this> <directory with the wrapper's run records>
"""
import gzip
import importlib.util
import json
import pathlib
import sys
import mpmath as mp

here = pathlib.Path(__file__).resolve().parent
run_dir = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
spec = importlib.util.spec_from_file_location("ref", here / "serial-darwin-trajectory-controls-reference-2026-10-11.py")
ref = importlib.util.module_from_spec(spec)
sys.argv = [sys.argv[0]]
try:
    spec.loader.exec_module(ref)
except SystemExit:
    pass
assert mp.mp.dps == 60
K, u, P0 = ref.K, ref.u, ref.Pz
l0 = (mp.mpf(100) ** 2 * (2 * u / 100) / 2) * (1 + K / 200)
W = ref.W_coupled
E0 = W(l0, P0)(mp.mpf(100))
Dfun = lambda r: r * r + r / 2
qfun = lambda r: 1 - 1 / (2 * r)


def inner_root(E, l, P):
    Wf = W(l, P)
    return ref.bisect(lambda r: E - Wf(r), mp.mpf("99.9999"), mp.mpf("100.0001"))


def linear_terms(dE, dl, dP, r=mp.mpf(100), l=None, P=None):
    l = l0 if l is None else l
    P = P0 if P is None else P
    Wp = mp.diff(W(l, P), r)
    return dict(energy=dE / Wp, angular=-(2 * l / Dfun(r)) * dl / Wp, momentum=-(P / (2 * qfun(r))) * dP / Wp)


def invariants(pos, vel):
    X1, X2, V1, V2 = ref.vec(pos[0]), ref.vec(pos[1]), ref.vec(vel[0]), ref.vec(vel[1])
    d = ref.add(X1, X2, -1)
    r = ref.norm(d)
    e = ref.scale(d, 1 / r)
    a = -K / (2 * r)
    MV = lambda v: ref.add(v, ref.scale(e, ref.dot(e, v)))
    p1, p2 = ref.add(V1, ref.scale(MV(V2), a)), ref.add(V2, ref.scale(MV(V1), a))
    cross = lambda x, y: [x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]]
    E = (ref.dot(V1, p1) + ref.dot(V2, p2)) / 2 - K / r
    P = ref.add(p1, p2)
    J = ref.add(cross(X1, p1), cross(X2, p2))
    rdot = ref.dot(e, ref.add(V1, V2, -1))
    return dict(E=E, P=P, J=J, r=r, rdot=rdot, dz=d[2])


f = lambda x: float(x)
known = {}
known["reference script's own known cases pass at import"] = ref.out["known_result"] == "PASS"
known["inner root at the unperturbed invariants is 100"] = abs(inner_root(E0, l0, P0) - 100) < mp.mpf(10) ** -40
known["W'(100) at the binary64 data is within 1e-18 of -1/800000000"] = abs(mp.diff(W(l0, P0), mp.mpf(100)) + mp.mpf(1) / 800000000) < mp.mpf(10) ** -18
dE = -mp.mpf(10) ** -15
ex = inner_root(E0 + dE, l0, P0) - 100
known["lowering E alone moves the exact inner root outward, by delta E / W' within 1e-3"] = ex > 0 and abs(ex / linear_terms(dE, 0, 0)["energy"] - 1) < mp.mpf(10) ** -3
dl = -mp.mpf(10) ** -12
ex_l = inner_root(E0, l0 + dl, P0) - 100
known["lowering l alone moves it inward, by the formula within 2e-3"] = ex_l < 0 and abs(ex_l / linear_terms(0, dl, 0)["angular"] - 1) < mp.mpf(2) / 1000
dP = -mp.mpf(10) ** -13
ex_P = inner_root(E0, l0, P0 + dP) - 100
known["lowering P alone moves it inward, by the formula within 1e-3"] = ex_P < 0 and abs(ex_P / linear_terms(0, 0, dP)["momentum"] - 1) < mp.mpf(10) ** -3
known["negative: the wrong sign of the l term misses the exact shift by more than half"] = abs(-linear_terms(0, dl, 0)["angular"] / ex_l - 1) > mp.mpf(1) / 2
inv0 = invariants([[50, 0, 0], [-50, 0, 0]], [[0, ref.U_F, 0.005], [0, -ref.U_F, 0.005]])
known["60-digit invariants of the prepared state equal the derived P, l and W(100)"] = abs(inv0["P"][2] - P0) < mp.mpf(10) ** -50 and abs(inv0["J"][2] - l0) < mp.mpf(10) ** -50 and abs(inv0["E"] - E0) < mp.mpf(10) ** -50
out = {"known": {a: bool(v) for a, v in known.items()}}
out["known_result"] = "PASS" if all(out["known"].values()) else "FAIL"
print(json.dumps({"known_result": out["known_result"]}), file=sys.stderr, flush=True)

if out["known_result"] == "PASS" and run_dir is not None:
    A, B = {}, {}
    upper = mp.mpf(100) + mp.mpf(1) / 360
    for s in ("P", "C", "R5"):
        raw = json.load(gzip.open(run_dir / ("DC-100-normal-50p-%s.raw.json.gz" % s), "rt"))
        rows = []
        for ev in raw["events"]:
            if ev["kind"] != "turning-point" or not ev["direction"].startswith("minimum"):
                continue
            iv = invariants(ev["state"]["positions"], ev["state"]["velocities"])
            dE_, dl_, dP_ = iv["E"] - E0, iv["J"][2] - l0, iv["P"][2] - P0
            root = inner_root(iv["E"], iv["J"][2], iv["P"][2])
            lin = linear_terms(dE_, dl_, dP_)
            rows.append(dict(t=ev["t"], r_minus_100=f(iv["r"] - 100), exact_root_minus_100=f(root - 100), residual=f(iv["r"] - root), rdot=f(iv["rdot"]), dz=f(iv["dz"]),
                             dE=f(dE_), dl=f(dl_), dP=f(dP_), linear_energy_term=f(lin["energy"]), linear_angular_term=f(lin["angular"]), linear_momentum_term=f(lin["momentum"]), linear_sum=f(sum(lin.values())),
                             instrument_dE_minus_recomputed=f(mp.mpf(ev["dE"]) - dE_), instrument_dJz_minus_recomputed=f(mp.mpf(ev["dJ"][2]) - dl_)))
        A[s] = dict(inner_turning_points=len(rows), max_abs_residual_state_minus_exact_root=max(abs(x["residual"]) for x in rows), most_inward=min(rows, key=lambda x: x["r_minus_100"]), most_outward=max(rows, key=lambda x: x["r_minus_100"]), last=rows[-1],
                    max_abs_linear_sum_minus_exact=max(abs(x["linear_sum"] - x["exact_root_minus_100"]) for x in rows), energy_term_sign_all=sorted(set(mp.sign(x["linear_energy_term"]) and int(mp.sign(x["linear_energy_term"])) for x in rows)),
                    angular_term_sign_all=sorted(set(int(mp.sign(x["linear_angular_term"])) for x in rows)))
        rs = [mp.mpf(x["pairs"][0]["r"]) for x in raw["samples"]] + [mp.mpf(x["pairs"][0]["r"]) for x in raw["events"]]
        lo, hi = min(rs), max(rs)
        B[s] = dict(records=len(rs), min_minus_100=f(lo - 100), max_minus_100=f(hi - 100), upper_margin=f(upper - hi), strictly_at_or_above_100=bool(lo >= 100), strictly_at_or_below_100_plus_1_over_360=bool(hi <= upper),
                    strictly_inside_enclosure=bool(lo >= 100 and hi <= upper), records_below_100=sum(1 for x in rs if x < 100))
    out["A_inner_turning_points"] = A
    out["B_strict_enclosure_membership"] = B
    # Part C
    W3 = W(l0, P0)
    r_hi = ref.bisect(lambda r: E0 - W3(r), mp.mpf(100) + mp.mpf(10) ** -5, mp.mpf("100.01"))
    rates = dict(angle=lambda r: 2 * l0 / (r * r * (1 + K / (2 * r))), centre_z=lambda r: P0 / (2 - K / r))
    red = ref.Reduced(W3, ref.c_coupled, mp.mpf(100), r_hi, rates)
    C = {"threshold": "the limit of G is used where |sin(phi/2)| < 1e-8 (inner end) or |cos(phi/2)| < 1e-8 (outer end)"}
    for name, phi, G_lim in (("inner", 2 * mp.asin(mp.mpf(10) ** -8), red.G_lo), ("outer", 2 * mp.acos(mp.mpf(10) ** -8), red.G_hi)):
        r = red.r(phi)
        s_, c_ = mp.sin(phi / 2), mp.cos(phi / 2)
        G = (red.E - W3(r)) / (2 * red.half * s_ * c_) ** 2
        C[name + "_relative_difference_quotient_minus_limit_at_threshold"] = f(G / G_lim - 1)
        C[name + "_radial_distance_from_turning_point_at_threshold"] = f(abs(r - (red.lo if name == "inner" else red.hi)))
    C["phi_width_using_the_limit_at_each_end"] = f(2 * mp.asin(mp.mpf(10) ** -8))

    def totals(pieces):
        g = lambda w=None: mp.quad((lambda p: red.dt(p)) if w is None else (lambda p: red.dt(p) * w(red.r(p))), [mp.pi * i / pieces for i in range(pieces + 1)], method="gauss-legendre")
        return 2 * g(), 2 * g(rates["angle"]), 2 * g(rates["centre_z"])
    t8, t16 = totals(8), totals(16)
    C["radial_period_8_pieces"], C["radial_period_16_minus_8"] = mp.nstr(t8[0], 25), f(t16[0] - t8[0])
    C["angle_advance_16_minus_8"], C["centre_travel_16_minus_8"] = f(t16[1] - t8[1]), f(t16[2] - t8[2])
    C["outer_turning_point"] = mp.nstr(r_hi, 25)
    out["C_endpoint_limit_and_quadrature"] = C
print(json.dumps(out, indent=1, default=str))
raise SystemExit(0 if out["known_result"] == "PASS" else 1)
