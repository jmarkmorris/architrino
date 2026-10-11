# Wave 9 (2): the twisted planar hexagon at rest (challenge cell D1, twist 50 degrees) on its stationary-source window.
# Derivation (coverage, independent of the symmetry files): on the window every root reads a partner at its initial site (emission before
# release), so each member moves in the static field of the FIXED initial images. By the order-12 history symmetry the motion is
# psi(t): positrinos at azimuth 120k + psi, electrinos at 50 + 120k - psi (degrees), twist = 50 - 2 psi. For a receiver at azimuth psi on the
# equator and a fixed source at relative azimuth delta (chord 2 sin(delta/2)), the azimuthal acceleration is sigma_rel * G(delta) with
# G(delta) = cos(delta/2) / (4 sin^2(delta/2)) (positive toward increasing azimuth for an attracting source ahead), so
#   psi'' = g F(psi),  F(psi) = sum_j G(50+120j - psi) - sum_{j=1,2} G(120j - psi)       (angles in degrees, G odd about 180)
# First integral (energy in the fixed field): psi'^2 / 2 = g [Phi(0) - Phi(psi)],  Phi(psi) = sum_sources sigma / chord(psi) = sum_E (-1/chord) + sum_P (+1/chord),
# and the time to reach psi is the quadrature t(psi) = int_0^psi dpsi' / sqrt(2 g [Phi(0) - Phi(psi')]).
# Window end (self-consistent): the first post-release emission is read when T = chord from the receiver to its nearest fixed image,
# T* = 2 sin((50 - psi(T*))/2 degrees). No ODE integrator is used anywhere; the quadrature is checked by two rules and a series.
# Run from the checkout root: OMP_NUM_THREADS=1 OPENBLAS_NUM_THREADS=1 MKL_NUM_THREADS=1 /usr/bin/time -p ../.venv/bin/python -I <this file> <out.json>
import numpy as np, json, sys, time
from scipy.integrate import quad
from scipy.optimize import brentq
D = np.pi/180
def G(delta): return np.cos(delta/2)/(4*np.sin(delta/2)**2)
def chord(delta): return 2*np.abs(np.sin(delta/2))
def F(psi, twist=50*D):   # azimuthal acceleration of a positrino at azimuth psi in the fixed field (per unit g); delta measured from receiver to source
    return sum(G(twist + 2*np.pi*j/3 - psi) for j in range(3)) - sum(G(2*np.pi*j/3 - psi) for j in (1, 2))
def Phi(psi, twist=50*D):  # sum sigma/chord over the fixed sources (per unit g): electrinos attract (sigma = -1), positrinos repel (+1)
    return sum(-1/chord(twist + 2*np.pi*j/3 - psi) for j in range(3)) + sum(1/chord(2*np.pi*j/3 - psi) for j in (1, 2))
def U(psi, twist=50*D):
    # cancellation-free form of Phi(0) - Phi(psi): 1/chord(d) - 1/chord(d - psi) = (chord(d - psi) - chord(d)) / (chord(d) chord(d - psi)) with
    # chord(d - psi) - chord(d) = 2 [sin((d - psi)/2) - sin(d/2)] = -4 cos((2d - psi)/4) sin(psi/4)   (exact identity; no subtraction of near-equal numbers)
    tot = 0.0
    for sig, d in [(-1, twist + 2*np.pi*j/3) for j in range(3)] + [(+1, 2*np.pi*j/3) for j in (1, 2)]:
        diff = -4*np.cos((2*d - psi)/4)*np.sin(psi/4)              # chord(d - psi) - chord(d)
        tot += sig*diff/(chord(d)*chord(d - psi))                      # sigma [1/chord(d) - 1/chord(d - psi)] = -(Phi(psi) - Phi(0)) contribution
    return tot                                                         # psi'^2 = 2 g U(psi)
# --- controls
out = {"controls": [], "results": {}}
out["controls"].append({"name": "60-degree twist (regular alternating hexagon) is stationary: F(0; twist 60) = 0", "pass": bool(abs(F(0.0, 60*D)) < 1e-12), "value": float(F(0.0, 60*D))})
out["controls"].append({"name": "first integral is consistent with the force: dU/dpsi = F(psi) (finite difference at three points, 1e-7 relative) and the cancellation-free U equals Phi(0) - Phi(psi) to 1e-12", "pass": bool(all(abs((U(p+1e-6)-U(p-1e-6))/2e-6 - F(p)) < 1e-7*abs(F(p)) for p in (0.02, 0.1, 0.2)) and all(abs(U(p) - (Phi(0) - Phi(p))) < 1e-12 for p in (0.02, 0.1, 0.2))), "value": [float((U(p+1e-6)-U(p-1e-6))/2e-6 - F(p)) for p in (0.02, 0.1, 0.2)]})
out["controls"].append({"name": "release azimuthal acceleration F(0) at twist 50 (my derivation)", "value": float(F(0.0)), "pass": True})
out["controls"].append({"name": "negative: a flipped sign convention (G -> -G) gives F(0) of the wrong sign and must be rejected (positrinos must accelerate toward the nearer electrino, +)", "pass": bool(F(0.0) > 0 and -F(0.0) < 0), "value": float(-F(0.0))})
F0 = F(0.0); F1 = (F(1e-6) - F(-1e-6))/2e-6
# --- quadrature t(psi) with the substitution psi = u^2 (removes the 1/sqrt singularity at 0): t = int_0^sqrt(psi) 2u du / sqrt(2 g U(u^2))
def t_of_psi(psi, g, rule="quad", n=200):
    def f(u):   # smooth integrand after psi = u^2; analytic limit 2/sqrt(2 g F0) at u = 0 (vectorized for the Gauss nodes)
        u = np.asarray(u, float); out = np.full_like(u, 2/np.sqrt(2*g*F0)); m = u > 1e-8; out[m] = 2*u[m]/np.sqrt(2*g*np.array([U(x*x) for x in u[m]])); return out if out.ndim else float(out)
    if rule == "quad": val, err = quad(f, 0.0, np.sqrt(psi), epsabs=1e-14, epsrel=1e-14, limit=400); return val, err
    x, w = np.polynomial.legendre.leggauss(n); a, b = 0.0, np.sqrt(psi); u = 0.5*(b-a)*x + 0.5*(b+a)
    return 0.5*(b-a)*np.sum(w*f(u)), None
# series control: for small psi, U ~ F0 psi + F1 psi^2/2 ..., t ~ sqrt(2 psi / (g F0)) (1 - F1 psi/(6 F0) + ...): leading term check as psi -> 0
ratios = []
for p in (1e-3, 1e-4, 1e-5):
    tq, _ = t_of_psi(p, 1.0); tl = np.sqrt(2*p/F0)*(1 - F1*p/(12*F0)); ratios.append(tq/tl)   # two-term series: t = sqrt(2 psi/(g F0)) (1 - F1 psi/(12 F0) + O(psi^2))
out["controls"].append({"name": "series control: quadrature / two-term small-psi series -> 1 as psi -> 0 (psi = 1e-3, 1e-4, 1e-5)", "pass": bool(abs(ratios[0]-1) < 5e-6 and abs(ratios[1]-1) < 5e-8 and abs(ratios[2]-1) < 5e-10), "value": [float(r) for r in ratios]})
# two-rule agreement at the target angles
agree = []
for psi_deg in (5, 10, 15):
    tq, eq = t_of_psi(psi_deg*D, 1.0); tg = t_of_psi(psi_deg*D, 1.0, "gauss", 200)[0]; tg2 = t_of_psi(psi_deg*D, 1.0, "gauss", 400)[0]
    agree.append({"psi_deg": psi_deg, "adaptive": float(tq), "adaptive_err_est": float(eq), "gauss200": float(tg), "gauss400": float(tg2), "diff_max": float(max(abs(tq-tg), abs(tq-tg2), abs(tg-tg2)))})
out["controls"].append({"name": "two quadrature rules (adaptive Gauss-Kronrod vs Gauss-Legendre 200 and 400 nodes) agree to 1e-10 at psi = 5, 10, 15 degrees", "pass": bool(all(a["diff_max"] < 1e-10 for a in agree)), "value": agree})
out["controls_all_pass"] = all(c["pass"] for c in out["controls"])
print("controls:", "ALL PASS" if out["controls_all_pass"] else "FAIL"); [print("  ", "pass" if c["pass"] else "FAIL", c["name"], c.get("value")) for c in out["controls"]]
# --- targets: times to twists 40, 30, 20 (psi = 5, 10, 15 degrees) at g = 1 and 1/10; self-consistent window end
for g in (1.0, 0.1):
    res = {"g": g, "F0": float(F0), "times": {}}
    for twist_deg in (40, 30, 20):
        psi = (50 - twist_deg)/2*D; tq, eq = t_of_psi(psi, g); res["times"][str(twist_deg)] = {"psi_deg": (50-twist_deg)/2, "t": float(tq), "quad_err_est": float(eq), "speed_at_psi": float(np.sqrt(2*g*U(psi)))}
    # window end: T* = t(psi*) = 2 sin((50 deg - psi*)/2); solve for psi*
    h = lambda psi: t_of_psi(psi, g)[0] - chord(50*D - psi)
    psi_star = brentq(h, 1e-6, 24.9*D, xtol=1e-13); T_star = chord(50*D - psi_star)
    res["window_end"] = {"psi_star_deg": float(psi_star/D), "twist_at_end_deg": float(50 - 2*psi_star/D), "T_star": float(T_star), "speed_at_end": float(np.sqrt(2*g*U(psi_star))), "nearest_fixed_chord_at_end": float(chord(50*D - psi_star))}
    for twist_deg in (40, 30, 20): res["times"][str(twist_deg)]["inside_window"] = bool(res["times"][str(twist_deg)]["t"] <= T_star)
    out["results"][str(g)] = res
    print(f"g={g}: F0={F0:.6f}; t(40deg)={res['times']['40']['t']:.6f} t(30deg)={res['times']['30']['t']:.6f} t(20deg)={res['times']['20']['t']:.6f}; window end T*={T_star:.6f} at psi*={psi_star/D:.4f} deg (twist {50-2*psi_star/D:.3f} deg), speed {np.sqrt(2*g*U(psi_star)):.6f}; inside window: {[res['times'][k]['inside_window'] for k in ('40','30','20')]}")
# early-time table for the enclosure consistency check (g = 1): psi and speed at small t by inverting t(psi)
early = []
for T in (0.015, 0.03, 0.0355848897551, 0.045, 0.06):
    psi_T = brentq(lambda p: t_of_psi(p, 1.0)[0] - T, 1e-12, 0.5, xtol=1e-14)
    early.append({"T": T, "psi_rad": float(psi_T), "speed": float(np.sqrt(2*U(psi_T)))})
out["early_g1"] = early; print("early (g=1):", [(e["T"], round(e["psi_rad"], 8), round(e["speed"], 9)) for e in early])
json.dump(out, open(sys.argv[1], "w"), indent=1)
