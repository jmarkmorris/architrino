"""Independent analytic and reduced references for the three Darwin trajectory controls (serial task 6).

This script shares no code with the pair instrument. It is written from the selected instantaneous
functional with K = c_f = 1 for an opposite-polarity pair,
    L = (|V1|^2 + |V2|^2)/2 + K/r - (K/(2r)) [V1.V2 + (V1.e)(V2.e)],
using centre velocity Vc = (V1 + V2)/2 and half relative velocity v = (V1 - V2)/2, d = X1 - X2 = r e:
    L = |Vc|^2 + |v|^2 + K/r - (K/(2r)) [|Vc|^2 - |v|^2 + (Vc.e)^2 - (v.e)^2].
Consequences used (derived in the task report):
  1. Mirror circle (Vc = 0): r constant, member speed u, relative angle (2u/r) t.
  2. Zero velocity coupling, inverse-distance term kept: Vc constant and d'' = -2K d/r^3, a Kepler problem
     with mu = 2K, solved in closed form by Kepler's equation.
  3. Common normal velocity: total momentum P = 2 A Vc with A = (1 - K/(2r)) I - (K/(2r)) e e^T is
     conserved; for P normal to the relative plane that plane is invariant, Vc = P/(2 - K/r) along the
     normal, and the relative motion has the angular invariant l = (r^2 theta'/2)(1 + K/(2r)) and energy
         E = (r'^2/4)(1 + K/r) + W(r),   W(r) = l^2/(r^2 (1 + K/(2r))) - K/r + P^2/(4 (1 - K/(2r))).
     Turning points, radial period, angle advance and centre drift follow by quadrature.
All arithmetic is 50-digit mpmath. The preparations use the instrument's binary64 inputs exactly.

Known cases run first: the Kepler propagator at start, at one period, at half a period and its initial
velocity; the reduced quadrature applied to the Kepler effective potential, which must return the
closed-form period and an angle advance of 2 pi; the coupled circle balance W'(100) = 0 at P = 0 with
u^2 = 2/401; the slope -1/800000000 at the task's momentum and the balance at the separately balanced
speed u_c^2 = 79999/16040000, both exact constants of the reviewed confinement proof; and a planted
wrong case (the Kepler speed in the coupled balance must give a nonzero slope).
Usage: python <this> <directory with the wrapper's summary files>
"""
import json
import pathlib
import sys
import mpmath as mp

mp.mp.dps = 60
K = mp.mpf(1)
U_F = 0.07062245515464487
PERIOD_F = 4448.433075160754
u = mp.mpf(U_F)
vec = lambda a: [mp.mpf(x) for x in a]
dot = lambda a, b: sum(x * y for x, y in zip(a, b))
norm = lambda a: mp.sqrt(dot(a, a))
add = lambda a, b, s=1: [x + s * y for x, y in zip(a, b)]
scale = lambda a, s: [x * s for x in a]


def kepler_E(M, e):
    E = M
    for _ in range(200):
        dE = (E - e * mp.sin(E) - M) / (1 - e * mp.cos(E))
        E -= dE
        if abs(dE) < mp.mpf(10) ** -45:
            break
    return E


def kepler(d0, w0, mu):
    """Closed-form relative motion for d'' = -mu d/r^3 started at an apsis (d0 perpendicular to w0)."""
    r0, w2 = norm(d0), dot(w0, w0)
    assert abs(dot(d0, w0)) < mp.mpf(10) ** -40
    en = w2 / 2 - mu / r0
    a = -mu / (2 * en)
    h = r0 * mp.sqrt(w2)
    e = mp.sqrt(1 + 2 * en * h * h / mu ** 2)
    n = mp.sqrt(mu / a ** 3)
    apo = w2 < mu / r0
    xh, wh = scale(d0, 1 / r0), scale(w0, 1 / mp.sqrt(w2))
    ph, qh, M0 = (scale(xh, -1), scale(wh, -1), mp.pi) if apo else (xh, wh, mp.mpf(0))

    def at(t):
        E = kepler_E(M0 + n * t, e)
        return add(scale(ph, a * (mp.cos(E) - e)), scale(qh, a * mp.sqrt(1 - e * e) * mp.sin(E)))
    return at, dict(a=a, e=e, n=n, T=2 * mp.pi / n, rmin=a * (1 - e), rmax=a * (1 + e), start="apocentre" if apo else "pericentre")


def bisect(g, lo, hi, steps=190):
    glo = g(lo)
    assert glo * g(hi) < 0
    for _ in range(steps):
        mid = (lo + hi) / 2
        if g(mid) * glo > 0:
            lo = mid
        else:
            hi = mid
    return (lo + hi) / 2


class Reduced:
    """One-degree radial motion c(r) r'^2 + W(r) = E between turning points r_lo < r_hi, phi = 0 at r_lo."""

    def __init__(self, W, c, r_lo, r_hi, rates):
        self.W, self.c, self.lo, self.hi, self.rates = W, c, r_lo, r_hi, rates
        self.E = W(r_lo)
        self.mid, self.half = (r_lo + r_hi) / 2, (r_hi - r_lo) / 2
        self.cache = {}
        # limits of G at the turning points, where its definition is 0/0: G = -W'(r_lo)/(r_hi - r_lo) and W'(r_hi)/(r_hi - r_lo)
        self.G_lo = -mp.diff(W, r_lo) / (r_hi - r_lo)
        self.G_hi = mp.diff(W, r_hi) / (r_hi - r_lo)

    def r(self, phi):
        return self.mid - self.half * mp.cos(phi)

    def dt(self, phi):
        r = self.r(phi)
        s, co = mp.sin(phi / 2), mp.cos(phi / 2)
        # (r - r_lo)(r_hi - r) = (2 half s co)^2 exactly; within 1e-8 of a turning point use the limit of G
        # (relative error of order 1e-16 on an interval of width 2e-8; the second run divided by zero here).
        if abs(s) < mp.mpf(10) ** -8:
            G = self.G_lo
        elif abs(co) < mp.mpf(10) ** -8:
            G = self.G_hi
        else:
            G = (self.E - self.W(r)) / (2 * self.half * s * co) ** 2
        return mp.sqrt(self.c(r) / G)

    def integral(self, phi, weight=None):
        f = (lambda p: self.dt(p)) if weight is None else (lambda p: self.dt(p) * weight(self.r(p)))
        pieces = 8
        # Gauss-Legendre nodes are interior, so the removable 0/0 of G at a turning point is never evaluated
        # (the first run used tanh-sinh, which evaluates the endpoint phi = 0 and divided by zero; retained).
        return mp.quad(f, [phi * i / pieces for i in range(pieces + 1)], method="gauss-legendre")

    def at_time(self, t):
        if t in self.cache:
            return self.cache[t]
        Th = self.integral(mp.pi)
        Tr = 2 * Th
        n = int(mp.floor(t / Tr))
        tau = t - n * Tr
        back = tau > Th
        target = Tr - tau if back else tau
        phi = bisect(lambda p: self.integral(p) - target, mp.mpf(10) ** -20, mp.pi, steps=90) if target > mp.mpf(10) ** -25 else mp.mpf(0)
        out = dict(radial_period=Tr, whole_periods=n, r=self.r(phi), phase=(2 * mp.pi - phi) if back else phi)
        for name, w in self.rates.items():
            half = self.integral(mp.pi, w)
            part = self.integral(phi, w)
            out[name] = n * 2 * half + ((2 * half - part) if back else part)
            out[name + "_per_radial_period"] = 2 * half
        self.cache[t] = out
        return out


def W_coupled(l, P):
    return lambda r: l * l / (r * r * (1 + K / (2 * r))) - K / r + P * P / (4 * (1 - K / (2 * r)))


c_coupled = lambda r: (1 + K / r) / 4
f20 = lambda x: mp.nstr(x, 20)
known = {}
# Kepler propagator
d0, w0 = vec([100, 0, 0]), [mp.mpf(0), 2 * u, mp.mpf(0.002)]
kat, kel = kepler(d0, w0, 2 * K)
known["Kepler: state at t = 0 is the preparation"] = norm(add(kat(0), d0, -1)) < mp.mpf(10) ** -40
known["Kepler: state after one period is the preparation"] = norm(add(kat(kel["T"]), d0, -1)) < mp.mpf(10) ** -38
known["Kepler: separation at half a period is a(1 - e) = h^2/(mu (1 + e))"] = abs(norm(kat(kel["T"] / 2)) - (100 * mp.sqrt(dot(w0, w0))) ** 2 / (2 * (1 + kel["e"]))) < mp.mpf(10) ** -38
known["Kepler: initial velocity by differentiation is the prepared relative velocity"] = norm(add([mp.diff(lambda t, i=i: kat(t)[i], 0) for i in range(3)], w0, -1)) < mp.mpf(10) ** -30
known["Kepler: the start is the apocentre (speed below circular)"] = kel["start"] == "apocentre" and abs(kel["rmax"] - 100) < mp.mpf(10) ** -40
# Reduced quadrature on the Kepler effective potential: c = 1/4, W = l^2/r^2 - K/r, l = r^2 theta'/2
lk = 100 * mp.sqrt(dot(w0, w0)) / 2
Wk = lambda r: lk * lk / (r * r) - K / r
rk_lo = bisect(lambda r: Wk(mp.mpf(100)) - Wk(r), mp.mpf(98), mp.mpf("99.99"))
redk = Reduced(Wk, lambda r: mp.mpf(1) / 4, rk_lo, mp.mpf(100), dict(angle=lambda r: 2 * lk / (r * r)))
rk = redk.at_time(mp.mpf(1000))
known["reduced quadrature: Kepler pericentre equals the closed form"] = abs(rk_lo - kel["rmin"]) < mp.mpf(10) ** -35
known["reduced quadrature: Kepler radial period equals 2 pi sqrt(a^3/mu)"] = abs(rk["radial_period"] - kel["T"]) < mp.mpf(10) ** -25
known["reduced quadrature: Kepler angle advance per radial period is 2 pi"] = abs(rk["angle_per_radial_period"] - 2 * mp.pi) < mp.mpf(10) ** -28
# Coupled balance and the reviewed proof's exact constants
ue = mp.sqrt(mp.mpf(2) / 401)
dW = lambda l, P: mp.diff(W_coupled(l, P), mp.mpf(100))
Pz = (2 - K / 100) * mp.mpf(0.005)
known["coupled circle: W'(100) = 0 at P = 0 with u^2 = 2/401"] = abs(dW(mp.mpf("100.5") * ue, 0)) < mp.mpf(10) ** -30
known["binary64 u equals sqrt(2/401) to 1e-16"] = abs(u - ue) < mp.mpf(10) ** -16
known["slope at the task's momentum is -1/800000000 (proof equation 3)"] = abs(dW(mp.mpf("100.5") * ue, (2 - K / 100) / 200) + mp.mpf(1) / 800000000) < mp.mpf(10) ** -30
known["balance at the separately balanced speed u_c^2 = 79999/16040000 (proof equation 4)"] = abs(dW(mp.mpf("100.5") * mp.sqrt(mp.mpf(79999) / 16040000), (2 - K / 100) / 200)) < mp.mpf(10) ** -30
known["negative: the Kepler speed in the coupled balance leaves a nonzero slope"] = abs(dW(mp.mpf("100.5") * mp.sqrt(mp.mpf(1) / 200), 0)) > mp.mpf(10) ** -9
out = {"known": {a: bool(v) for a, v in known.items()}}
out["known_result"] = "PASS" if all(out["known"].values()) else "FAIL"
print(json.dumps({"known_result": out["known_result"]}), file=sys.stderr, flush=True)

if out["known_result"] == "PASS" and len(sys.argv) > 1:
    D = pathlib.Path(sys.argv[1])
    load = lambda key, s: json.load(open(D / ("%s-%s.summary.json" % (key, s))))
    res = {}

    def pair(summary):
        st = summary["final"]["state"]
        X1, X2 = vec(st["positions"][0]), vec(st["positions"][1])
        return add(X1, X2, -1), scale(add(X1, X2), mp.mpf(1) / 2)

    def settings_difference(key):
        f = {s: load(key, s)["final"]["state"]["positions"] for s in ("P", "C", "R5")}
        dist = lambda a, b: float(max(norm(add(vec(f[a][i]), vec(f[b][i]), -1)) for i in (0, 1)))
        return {"P_minus_C": dist("P", "C"), "R5_minus_C": dist("R5", "C")}

    # ---- case 1: exact mirror circle
    key = "DC-100-200p"
    res[key] = {"reference": "exact circle: separation 100, relative angle (2u/100) t, centre at rest", "settings_final_position_difference": settings_difference(key)}
    for s in ("P", "C", "R5"):
        S = load(key, s)
        t = mp.mpf(S["final"]["t"])
        d, c = pair(S)
        th = 2 * u * t / 100
        ref = [100 * mp.cos(th), 100 * mp.sin(th), mp.mpf(0)]
        ang = mp.atan2(d[1], d[0]) - mp.atan2(ref[1], ref[0])
        ang = ang - 2 * mp.pi * mp.nint(ang / (2 * mp.pi))
        tp = S["turningPoints"]
        res[key][s] = dict(t=float(t), stop=S["stopReason"], separation_minus_100=float(norm(d) - 100), relative_position_error=float(norm(add(d, ref, -1))), phase_error_rad=float(ang), centre_displacement=float(norm(c)),
                           sample_r_min_minus_100=S["sampleExtrema"]["rMin"] - 100, sample_r_max_minus_100=S["sampleExtrema"]["rMax"] - 100, turning_point_events=len(tp),
                           turning_point_r_range_minus_100=[min(x[1] for x in tp) - 100, max(x[1] for x in tp) - 100] if tp else None, exact_revolutions=f20(th / (2 * mp.pi)))
    # ---- case 2: zero velocity coupling (Kepler)
    key = "DG-100-zero-coupling-200p"
    Vc = [mp.mpf(0.005), mp.mpf(0), mp.mpf(0.002) / 2]
    E0 = (dot([mp.mpf(0.005), u, mp.mpf(0.002)], [mp.mpf(0.005), u, mp.mpf(0.002)]) + dot([mp.mpf(0.005), -u, 0], [mp.mpf(0.005), -u, 0])) / 2 - K / 100
    res[key] = {"reference": "closed-form Kepler relative motion with mu = 2K plus uniform centre motion", "elements": {k: (f20(v) if not isinstance(v, str) else v) for k, v in kel.items()}, "E_initial_derived": f20(E0), "settings_final_position_difference": settings_difference(key)}
    for s in ("P", "C", "R5"):
        S = load(key, s)
        t = mp.mpf(S["final"]["t"])
        d, c = pair(S)
        ref = kat(t)
        cref = scale(Vc, t)
        tp = S["turningPoints"]
        T = kel["T"]
        t_err = r_err = 0.0
        for (te, re, kind) in tp:
            j = mp.nint(mp.mpf(te) / (T / 2))
            t_err = max(t_err, abs(float(mp.mpf(te) - j * T / 2)))
            expect = kel["rmax"] if int(j) % 2 == 0 else kel["rmin"]
            ok_kind = (kind == "max") == (int(j) % 2 == 0)
            r_err = max(r_err, abs(float(mp.mpf(re) - expect))) if ok_kind else float("inf")
        res[key][s] = dict(t=float(t), stop=S["stopReason"], echoed_coupling=S["preparation"]["coupling"], echoed_pair_term=S["preparation"]["pairTerm"],
                           relative_position_error=float(norm(add(d, ref, -1))), separation_error=float(norm(d) - norm(ref)), centre_position_error=float(norm(add(c, cref, -1))),
                           E_initial_instrument_minus_derived=float(mp.mpf(S["initialInvariants"]["E"]) - E0), turning_point_events=len(tp), expected_turning_points=int(mp.floor(t / (T / 2))),
                           max_turning_time_error=t_err, max_turning_radius_error=r_err, sample_r_min=S["sampleExtrema"]["rMin"], sample_r_max=S["sampleExtrema"]["rMax"],
                           sample_r_min_minus_pericentre=float(mp.mpf(S["sampleExtrema"]["rMin"]) - kel["rmin"]), sample_r_max_minus_apocentre=float(mp.mpf(S["sampleExtrema"]["rMax"]) - kel["rmax"]))
    # ---- case 3: common normal velocity (reduced planar motion)
    key = "DC-100-normal-50p"
    l = (mp.mpf(100) ** 2 * (2 * u / 100) / 2) * (1 + K / 200)
    W3 = W_coupled(l, Pz)
    r_hi = bisect(lambda r: W3(mp.mpf(100)) - W3(r), mp.mpf(100) + mp.mpf(10) ** -5, mp.mpf("100.01"))
    red = Reduced(W3, c_coupled, mp.mpf(100), r_hi, dict(angle=lambda r: 2 * l / (r * r * (1 + K / (2 * r))), centre_z=lambda r: Pz / (2 - K / r)))
    res[key] = {"reference": "reduced planar motion at fixed normal momentum: turning points, radial period, angle and centre drift by quadrature",
                "P_derived": f20(Pz), "angular_invariant_derived": f20(l), "outer_turning_point": f20(r_hi), "outer_turning_point_minus_100": f20(r_hi - 100), "enclosure_upper_1_over_360": f20(mp.mpf(1) / 360),
                "outer_turning_point_inside_enclosure": bool(r_hi - 100 < mp.mpf(1) / 360), "settings_final_position_difference": settings_difference(key)}
    for s in ("P", "C", "R5"):
        S = load(key, s)
        t = mp.mpf(S["final"]["t"])
        d, c = pair(S)
        a = red.at_time(t)
        res[key]["radial_period"] = f20(a["radial_period"])
        res[key]["angle_per_radial_period_minus_2pi"] = f20(a["angle_per_radial_period"] - 2 * mp.pi)
        res[key]["centre_drift_per_radial_period"] = f20(a["centre_z_per_radial_period"])
        ang = mp.atan2(d[1], d[0]) - a["angle"]
        ang = ang - 2 * mp.pi * mp.nint(ang / (2 * mp.pi))
        tp = S["turningPoints"]
        Tr = a["radial_period"]
        t_err = r_err = 0.0
        for (te, re, kind) in tp:
            j = mp.nint(mp.mpf(te) / (Tr / 2))
            t_err = max(t_err, abs(float(mp.mpf(te) - j * Tr / 2)))
            expect = mp.mpf(100) if int(j) % 2 == 0 else r_hi
            ok_kind = (kind == "min") == (int(j) % 2 == 0)
            r_err = max(r_err, abs(float(mp.mpf(re) - expect))) if ok_kind else float("inf")
        inv = S["initialInvariants"]
        res[key][s] = dict(t=float(t), stop=S["stopReason"], separation_error=float(norm(d) - a["r"]), phase_error_rad=float(ang), relative_normal_component=float(d[2]), centre_z_error=float(c[2] - a["centre_z"]), centre_inplane_displacement=float(mp.sqrt(c[0] ** 2 + c[1] ** 2)),
                           P_instrument_minus_derived=[float(mp.mpf(inv["P"][0])), float(mp.mpf(inv["P"][1])), float(mp.mpf(inv["P"][2]) - Pz)], J_instrument_minus_derived=[float(mp.mpf(inv["J"][0])), float(mp.mpf(inv["J"][1])), float(mp.mpf(inv["J"][2]) - l)],
                           E_instrument_minus_derived=float(mp.mpf(inv["E"]) - (W3(mp.mpf(100)))), turning_point_events=len(tp), expected_turning_points=int(mp.floor(t / (Tr / 2))), max_turning_time_error=t_err, max_turning_radius_error=r_err,
                           sample_r_min_minus_100=S["sampleExtrema"]["rMin"] - 100, sample_r_max_minus_100=S["sampleExtrema"]["rMax"] - 100, sample_r_max_minus_outer_turning_point=float(mp.mpf(S["sampleExtrema"]["rMax"]) - r_hi),
                           sampled_inside_enclosure_100_to_100_plus_1_over_360=bool(S["sampleExtrema"]["rMax"] - 100 < 1 / 360 and S["sampleExtrema"]["rMin"] - 100 > -1e-6))
    for key in res:
        for s in ("P", "C", "R5"):
            S = load(key, s)
            res[key][s].update(dErel_final=S["final"]["dErel"], max_abs_dErel=S["sampleExtrema"]["maxAbsDErel"], max_abs_dP=S["sampleExtrema"]["maxAbsDP"], max_abs_dJ=S["sampleExtrema"]["maxAbsDJ"], detH_range=[S["suprema"]["detMin"], S["suprema"]["detMax"]], cond_max=S["suprema"]["condMax"],
                               sup_speed=S["suprema"]["speed"], sup_eps=S["suprema"]["eps"], event_kinds=S["eventKinds"], steps=S["integrator"]["steps"], rejected=S["integrator"]["rejected"], evaluations=S["integrator"]["evaluations"], wall_ms=S["wallMs"], sample_count=S["sampleCount"])
    out["results"] = res
print(json.dumps(out, indent=1))
raise SystemExit(0 if out["known_result"] == "PASS" else 1)
