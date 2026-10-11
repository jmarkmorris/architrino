#!/usr/bin/env python
"""Review-role moving-source reference instrument: a receiver and sources in uniform rigid rotation about z
on the equator of the unit sphere (alternating hexagon, azimuths k*pi/3, polarity (-1)^k), speed beta = v/c_f.
Root equation in the angular lag Delta = theta_i(T) - theta_j(T - tau):  Delta - phi_ij = 2 beta sin(Delta/2),
with phi_ij = phi_i - phi_j (mod 2 pi, taken in (0, 2 pi)); dimensionless delay tau' = 2 sin(Delta/2) = (Delta - phi_ij)/beta.
D_t / c_f = 1 - beta cos(Delta/2) (equatorial rigid rotation; sin(Delta/2) > 0 on (0, 2 pi)).
Per-hit azimuthal (along-velocity) component: sigma W cos(Delta/2) / (4 sin^2(Delta/2)); radial: sigma W / (4 sin(Delta/2)) ... see reference.
Authored by the review role alone; c_f = 1, K = 1, R = 1. Controls run before targets; order recorded.
"""
import json, math, os, sys, time

OUT = {"_order": []}
def rec(k, d):
    OUT["_order"].append(k); OUT[k] = d; print(k, json.dumps(d)[:260])

class Refused(Exception):
    pass

def lag_root(phi, beta, tol=1e-15):
    """Unique Delta in (phi, phi + 2 beta] with Delta - phi - 2 beta sin(Delta/2) = 0, for 0 <= beta <= 1, 0 < phi < 2 pi.
    g(Delta) = Delta - phi - 2 beta sin(Delta/2) is nondecreasing (g' = 1 - beta cos(Delta/2) >= 0) and strictly so except
    at Delta = 0 when beta = 1; g(phi) = -2 beta sin(phi/2) < 0, g(phi + 2 beta) = 2 beta (1 - sin(..)) >= 0."""
    if beta > 1:
        raise Refused(f"beta={beta} > 1: uniqueness certificate does not apply")
    if beta == 0:
        return phi
    a, b = phi, phi + 2 * beta
    g = lambda D: D - phi - 2 * beta * math.sin(D / 2)
    ga = g(a)
    if ga > 0:
        raise Refused("no bracket")
    for _ in range(300):
        m = 0.5 * (a + b); gm = g(m)
        if gm == 0: return m
        if (gm < 0) == (ga < 0): a, ga = m, gm
        else: b = m
        if b - a < tol: break
    return 0.5 * (a + b)

def hexagon_rotating(beta, K=1.0):
    """Receiver at azimuth 0 (positrino). Sources k=1..5 at azimuth k pi/3 behind/ahead; phi_ij = phi_i - phi_j = -k pi/3 mod 2pi = (6-k) pi/3."""
    hits = []
    Bphi = 0.0; Br = 0.0
    for k in range(1, 6):
        sigma = 1 if k % 2 == 0 else -1
        phi = (6 - k) * math.pi / 3          # receiver angle minus source angle, in (0, 2 pi)
        D = lag_root(phi, beta)
        s = math.sin(D / 2); c = math.cos(D / 2)
        tau = 2 * s                           # dimensionless delay (R = c_f = 1)
        Dt = 1 - beta * c
        W = 1 / abs(Dt)
        chord = 2 * s
        mag = K * W / chord**2
        az = sigma * mag * c                  # rhat . phihat = cos(Delta/2)
        rad = sigma * mag * s                 # rhat . n = sin(Delta/2)
        # residual of the root equation in physical form: tau - chord = 0 by construction; check the lag equation
        resid = D - phi - 2 * beta * s
        hits.append({"k": k, "sigma": sigma, "phi_ij": phi, "Delta": D, "tau": tau, "Dt": Dt, "W": W, "chord": chord,
                     "azimuthal": az, "radial": rad, "lag_residual": resid})
        Bphi += az; Br += rad
    return {"beta": beta, "B_phi": Bphi, "B_r": Br, "hits": hits}

# ---------------- controls ----------------
# K1: beta = 0 must reproduce the stationary hexagon: B_phi = 0, B_r = -5/4 + sqrt(3)/3 (reference 4.4), delays {1,1,sqrt3,sqrt3,2}.
h0 = hexagon_rotating(0.0)
ok = abs(h0["B_phi"]) < 1e-14 and abs(h0["B_r"] - (-5 / 4 + math.sqrt(3) / 3)) < 1e-14 and \
     sorted(round(h["tau"], 12) for h in h0["hits"]) == sorted([1.0, 1.0, round(math.sqrt(3), 12), round(math.sqrt(3), 12), 2.0])
rec("control_K1_stationary_hexagon_limit", {"B_phi": h0["B_phi"], "B_r": h0["B_r"], "expected_B_r": -5 / 4 + math.sqrt(3) / 3,
    "taus": [h["tau"] for h in h0["hits"]], "pass": bool(ok)})
if not ok: sys.exit("K1 failed")
# K2: single source directly behind by pi (antipode) at any beta: Delta = pi + 2 beta sin(Delta/2) has D_t = 1 - beta cos(Delta/2);
# known: at beta = 0.5, phi = pi, the chord-direction is radial at the source so the tangent velocity enters only through cos(Delta/2).
# Independent check of D_t by direct Cartesian evaluation of the rotating pair.
beta = 0.5; phi = math.pi
D = lag_root(phi, beta); tau = 2 * math.sin(D / 2)
# Cartesian: receiver at angle 0 at T=0; source angle at emission: theta_j = -phi - beta*tau... theta_i(T) - theta_j(T-tau) = Delta
theta_j = -D
Xi = (1.0, 0.0, 0.0); Xj = (math.cos(theta_j), math.sin(theta_j), 0.0); Vj = (-beta * math.sin(theta_j), beta * math.cos(theta_j), 0.0)
r = (Xi[0] - Xj[0], Xi[1] - Xj[1], 0.0); rn = math.hypot(r[0], r[1]); rhat = (r[0] / rn, r[1] / rn)
Dt_cart = 1 - (Vj[0] * rhat[0] + Vj[1] * rhat[1])
ok = abs(rn - tau) < 1e-12 and abs(Dt_cart - (1 - beta * math.cos(D / 2))) < 1e-12
rec("control_K2_cartesian_root_and_Dt", {"beta": beta, "phi": phi, "Delta": D, "tau": tau, "chord_cartesian": rn,
    "Dt_formula": 1 - beta * math.cos(D / 2), "Dt_cartesian": Dt_cart, "pass": bool(ok)})
if not ok: sys.exit("K2 failed")
# N1: beta > 1 must be refused (no uniqueness certificate).
try:
    lag_root(math.pi / 3, 1.5); rec("control_N1_superwake_refused", {"pass": False}); sys.exit("N1 failed")
except Refused as e:
    rec("control_N1_superwake_refused", {"pass": True, "message": str(e)})
rec("controls_complete_before_targets", {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())})

# ---------------- targets ----------------
tab = {}
for b in (0.25, 0.5, 0.75, 1.0):
    tab[str(b)] = hexagon_rotating(b)
rec("target_rotating_hexagon_B_phi_B_r", {k: {"B_phi": v["B_phi"], "B_r": v["B_r"], "min_Dt": min(h["Dt"] for h in v["hits"]),
    "max_Dt": max(h["Dt"] for h in v["hits"]), "taus": [h["tau"] for h in v["hits"]]} for k, v in tab.items()})
# scan for sign changes of B_phi on (0, 1]
scan = []; prev = None; changes = []
for n in range(1, 1001):
    b = n / 1000; val = hexagon_rotating(b)["B_phi"]
    if prev is not None and (prev < 0) != (val < 0): changes.append((n - 1) / 1000)
    prev = val
    if n % 100 == 0: scan.append((b, val))
rec("target_B_phi_scan_sign_changes", {"grid": 1000, "sign_changes_between": changes, "samples": scan,
    "small_beta_slope": hexagon_rotating(1e-3)["B_phi"] / 1e-3})
OUT["_utc"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
json.dump(OUT, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "spherical-curvature-claude-review-moving-output.json"), "w"), indent=1, sort_keys=True)
