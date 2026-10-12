"""Direct evaluation of the frozen characteristic-tail cross action and its mixed coefficient.

Subject: analysis/characteristic-tail.md, Sections 16.1 to 16.4 (frozen candidate CT-FH-1), regular
cross-worldline sector only. Numerical c_f = 1, R = 1, Lambda = 1, h = 3, ordered-pair factor 1/2,
strict causal window 0 < t - s < h. No self term is evaluated; none is defined by the candidate.

What is evaluated. The interaction part of the frozen action for the two distinct worldlines
    transmitter a:  X_a(s) = p * phi(s) e_y            (present probe, phi a unit-height compact bump)
    receiver   b:  X_b(t) = R e_x + eps * psi(t) e_y   (future profile, psi a smooth plateau)
namely, summing both ordered pairs (b receives from a, and a receives from b),
    S(eps, p) = -(1/2) Lambda * integral over I x I of chi_h(t, s) [K(r_ba, g_ba) + K(r_ab, g_ab)],
    K(r, g) = integral from -h to g of delta_eta(z)/(u - z)^2 dz,   u = g + r,   g = (t - s) - r.
The kernel K is integrated in z by composite Gauss-Legendre quadrature and the action by the
two-dimensional trapezoid rule on a uniform time grid over the whole interval I. The mixed coefficient
is the central second difference of the ACTION,
    M = [S(eps, p) - S(eps, -p) - S(-eps, p) + S(-eps, -p)] / (4 eps p integral(phi)),
which estimates d/d(eps) of the phi-averaged present transverse Euler coefficient of worldline a.
The Euler formula is not used anywhere in the evaluation.

Controls (mode `known`, run and recorded before any target):
  1. regulator: normalisation to one, exact zero outside |z| < eta, zero at the endpoint -h;
  2. kernel: for g >= eta and large u, K equals 1/u^2 times (1 + 3 m2/u^2 + ...) with m2 the second
     moment of the regulator, and K = 0 for g <= -eta;
  3. separable action: with K replaced by r^2 the same quadrature and the same second difference must
     return +integral(psi) (derivation: r^2 = R^2 + (eps psi - p phi)^2, so the mixed derivative of
     -(1/2) r^2 is +psi(t) phi(s));
  4. negative: a future profile whose support misses the regulator shell must give zero;
  5. negative: Lambda = 0 must give zero.
Mode `target` then runs the base setting and four one-at-a-time refinements.
Float instrument: measured. Run with the shared project venv.
"""
import json
import sys
import time
import mpmath
import numpy as np

mpmath.mp.dps = 30


def quad1(f, a, b, pieces=8):
    """Reference one-dimensional integral by mpmath tanh-sinh quadrature on equal pieces (scipy is not
    used: its compiled modules fail to load in the shared venv on this host)."""
    edges = [a + (b - a) * i / pieces for i in range(pieces + 1)]
    return float(mpmath.quad(lambda x: mpmath.mpf(float(f(float(x)))), edges))

R, LAM, H = 1.0, 1.0, 3.0
T_MINUS, T_PLUS = -3.2, 4.8          # variations are supported inside [T_MINUS + H, T_PLUS - H] = [-0.2, 1.8]
PHI_HALF = 0.1                        # present probe support [-0.1, 0.1]
PSI = (0.35, 0.65, 1.35, 1.65)        # future profile: rises on [0.35,0.65], one on [0.65,1.35], falls on [1.35,1.65]
Z_BUMP = float(mpmath.quad(lambda y: mpmath.exp(-1 / (1 - y * y)), [-1, -0.5, 0, 0.5, 1]))
GL_X, GL_W = np.polynomial.legendre.leggauss(16)
PANELS = 16


def bump(y):
    """exp(-1/(1-y^2)) on |y| < 1, zero outside."""
    y = np.asarray(y, dtype=float)
    out = np.zeros_like(y)
    m = np.abs(y) < 1.0
    out[m] = np.exp(-1.0 / (1.0 - y[m] ** 2))
    return out


def delta_eta(z, eta):
    return bump(np.asarray(z) / eta) / (eta * Z_BUMP)


def smooth_step(x):
    """C-infinity step: 0 for x <= 0, 1 for x >= 1."""
    x = np.asarray(x, dtype=float)
    a = np.where(x > 0, np.exp(-1.0 / np.where(x > 0, x, 1.0)), 0.0)
    b = np.where(x < 1, np.exp(-1.0 / np.where(x < 1, 1.0 - x, 1.0)), 0.0)
    return a / (a + b)


def phi(s):
    """Unit-height present probe profile supported on |s| < PHI_HALF."""
    return np.e * bump(np.asarray(s) / PHI_HALF)


def psi(t, shape=PSI):
    a, b, c, d = shape
    t = np.asarray(t, dtype=float)
    return smooth_step((t - a) / (b - a)) * (1.0 - smooth_step((t - c) / (d - c)))


def kernel(r, g, eta):
    """K(r, g) = int_{-h}^{g} delta_eta(z)/(u - z)^2 dz with u = g + r, by composite Gauss-Legendre."""
    r, g = np.asarray(r, dtype=float), np.asarray(g, dtype=float)
    u = g + r
    out = np.zeros_like(g)
    m = g > -eta
    if not np.any(m):
        return out
    top = np.minimum(g[m], eta)
    um = u[m]
    acc = np.zeros_like(top)
    width = (top + eta) / PANELS
    for k in range(PANELS):
        lo = -eta + k * width
        z = lo[:, None] + 0.5 * width[:, None] * (GL_X[None, :] + 1.0)
        acc += 0.5 * width * np.sum(GL_W[None, :] * delta_eta(z, eta) / (um[:, None] - z) ** 2, axis=1)
    out[m] = acc
    return out


def action(eps, p, dt, eta, lam=LAM, kern="frozen", shape=PSI):
    """Interaction part of the cross action on the whole interval, both ordered pairs."""
    n = int(round((T_PLUS - T_MINUS) / dt))
    grid = T_MINUS + dt * np.arange(n + 1)
    w = np.full(n + 1, dt)
    w[0] = w[-1] = 0.5 * dt
    band = int(round(H / dt))
    ya = p * phi(grid)                    # transverse position of worldline a
    yb = eps * psi(grid, shape)           # transverse position of worldline b
    total = 0.0
    for k in range(1, band + 1):          # k*dt = t - s; k = 0 is excluded by the strict window
        u = k * dt
        edge = 0.5 if k == band else 1.0  # trapezoid half weight on the boundary t - s = h
        wt = w[k:] * w[:-k] * edge
        for rec, tra in ((yb, ya), (ya, yb)):          # (b receives from a), then (a receives from b)
            dy = rec[k:] - tra[:-k]
            r = np.sqrt(R * R + dy * dy)
            if kern == "frozen":
                val = kernel(r, u - r, eta)
            else:                          # separable control kernel
                val = r * r
            total += float(np.sum(wt * val))
    return -0.5 * lam * total


def mixed(eps, p, dt, eta, **kw):
    spp, spm = action(eps, p, dt, eta, **kw), action(eps, -p, dt, eta, **kw)
    smp, smm = action(-eps, p, dt, eta, **kw), action(-eps, -p, dt, eta, **kw)
    phi_int = quad1(lambda s: phi(np.array([s]))[0], -PHI_HALF, PHI_HALF)
    diff = spp - spm - smp + smm
    n = int(round((T_PLUS - T_MINUS) / dt))
    phi_trap = float(dt * np.sum(phi(T_MINUS + dt * np.arange(n + 1))))   # the grid's own value of integral(phi)
    return dict(M=diff / (4.0 * eps * p * phi_int), M_grid_normalised=diff / (4.0 * eps * p * phi_trap), phi_integral=phi_int, phi_trapezoid=phi_trap, S_pp=spp, S_pm=spm, S_mp=smp, S_mm=smm, second_difference=diff,
                cancellation_digits=float(np.log10(abs(spp) / abs(diff))) if diff != 0 and spp != 0 else None,
                symmetry_defect=max(abs(spp - smm), abs(spm - smp)))


def known():
    out = {}
    for eta in (0.2, 0.1, 0.05):
        norm = quad1(lambda z: delta_eta(np.array([z]), eta)[0], -eta, eta)
        out["regulator eta=%g: integral is one" % eta] = abs(norm - 1.0) < 1e-12
        out["regulator eta=%g: zero at and beyond the support edge and at -h" % eta] = bool(
            delta_eta(np.array([eta, -eta, 1.5 * eta, -H]), eta).max() == 0.0)
    eta = 0.1
    m2 = quad1(lambda z: z * z * delta_eta(np.array([z]), eta)[0], -eta, eta)
    u = 40.0
    k_far = float(kernel(np.array([1.0]), np.array([u - 1.0]), eta)[0])
    out["kernel: far value equals (1 + 3 m2/u^2)/u^2"] = abs(k_far * u * u - (1.0 + 3.0 * m2 / u ** 2)) < 1e-9
    out["kernel: zero for g <= -eta"] = float(kernel(np.array([1.0]), np.array([-eta]), eta)[0]) == 0.0
    out["kernel: constant-limit value does not depend on r at fixed u"] = abs(
        float(kernel(np.array([1.0]), np.array([1.0]), eta)[0]) - float(kernel(np.array([0.7]), np.array([1.3]), eta)[0])) < 1e-13
    # Upper-limit derivative of the kernel at fixed u: dK/dr = -delta_eta(g)/r^2, by a finite difference of K itself.
    r0, u0, d = 1.0, 1.03, 1e-5
    fd = (float(kernel(np.array([r0 + d]), np.array([u0 - r0 - d]), eta)[0]) - float(kernel(np.array([r0 - d]), np.array([u0 - r0 + d]), eta)[0])) / (2 * d)
    out["kernel: finite difference in r at fixed u equals -delta_eta(g)/r^2"] = abs(fd + float(delta_eta(np.array([u0 - r0]), eta)[0]) / r0 ** 2) < 1e-6
    psi_int = quad1(lambda t: psi(np.array([t]))[0], PSI[0], PSI[3], pieces=26)
    sep = mixed(0.02, 5e-4, 0.01, eta, kern="separable")
    # For the separable kernel the discrete action is exactly bilinear in the two profiles, so its second
    # difference must equal +trapezoid(phi)*trapezoid(psi) to rounding. (The first two runs of this script
    # compared with the continuum value integral(psi) at 1e-6, which ignores the trapezoid error of the
    # probe profile at this spacing, 1.6e-4; that expectation was this script's error. Both runs are retained.)
    n_sep = int(round((T_PLUS - T_MINUS) / 0.01))
    psi_trap = float(0.01 * np.sum(psi(T_MINUS + 0.01 * np.arange(n_sep + 1))))
    # Tolerance 1e-7: the second difference loses about 6.4 digits to cancellation against |S| of order ten, so
    # double-precision rounding alone is of order 1e-9 here (the third run measured 1.6e-9 and failed a 1e-9 test).
    out["separable action: mixed second difference equals +trapezoid(phi)*trapezoid(psi) to rounding"] = abs(sep["M_grid_normalised"] - psi_trap) < 1e-7
    out["separable action: and is within the trapezoid error of the continuum value +integral(psi)"] = abs(sep["M"] - psi_int) < 5e-4
    far_shape = (1.6, 1.7, 1.75, 1.8)   # future support misses the regulator shell [0.8, 1.2] and stays inside the admitted support
    neg = mixed(0.02, 5e-4, 0.01, eta, shape=far_shape)
    out["negative: future support missing the regulator shell gives zero"] = abs(neg["M"]) < 1e-9
    zero = mixed(0.02, 5e-4, 0.01, eta, lam=0.0)
    out["negative: zero coupling gives zero"] = zero["M"] == 0.0
    detail = dict(separable_cancellation_digits=sep["cancellation_digits"], Z_bump=Z_BUMP, second_moment_eta_0p1=m2, psi_integral=psi_int, psi_trapezoid_dt_0p01=psi_trap, separable_M=sep["M"], separable_M_grid_normalised=sep["M_grid_normalised"], kernel_far_residual=k_far * u * u - (1.0 + 3.0 * m2 / u ** 2), negative_M=neg["M"], zero_coupling_M=zero["M"])
    return out, detail


def target():
    base = dict(eps=0.02, p=5e-4, dt=0.005, eta=0.1)
    rows = {"base": [dict(base, **mixed(**base))]}
    for name, key, vals in (("time_spacing", "dt", (0.04, 0.02, 0.01, 0.005, 0.0025)), ("regulator_width", "eta", (0.2, 0.1, 0.05)),
                            ("action_probe", "p", (1e-3, 5e-4, 2.5e-4, 1.25e-4)), ("future_amplitude", "eps", (0.04, 0.02, 0.01, 0.005))):
        rows[name] = []
        for v in vals:
            s = dict(base)
            s[key] = v
            rows[name].append(dict(s, **mixed(**s)))
    return rows


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode not in ("known", "target"):
        raise SystemExit("usage: known | target")
    t0 = time.time()
    k, detail = known()
    res = {"mode": mode, "settings": dict(R=R, Lambda=LAM, h=H, c_f=1.0, interval=[T_MINUS, T_PLUS], phi_half_width=PHI_HALF, psi_shape=PSI, gauss_nodes=16, panels=PANELS),
           "known": {a: bool(b) for a, b in k.items()}, "known_detail": detail, "known_result": "PASS" if all(k.values()) else "FAIL"}
    if mode == "target" and res["known_result"] == "PASS":
        res["target"] = target()
        res["exact_mixed_coefficient"] = -LAM / (2 * R ** 3)
    res["seconds"] = round(time.time() - t0, 1)
    print(json.dumps(res, indent=1))
    raise SystemExit(0 if res["known_result"] == "PASS" else 1)
