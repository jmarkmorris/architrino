"""Separately written high-precision diagnostic of the literal phase quantities I_0 and Gamma.

Subject: binary-research/analysis/overnight2-a-literal-phase-enclosure.md, expression (1), with the
account polynomials J_0..J_6 as displayed in overnight2-a-reference-adiabatic.md (8) and (14) and the
exact decimal tokens displayed in the binary manuscript. This script imports no project code and does
not read the subject instrument or its receipts. It evaluates the expression in 80-digit mpmath
arithmetic. It is a diagnostic reproduction, not an interval enclosure: it rounds, and it proves no
bound. It says nothing about whether the expression is the phase of a coupled solution.

Known cases run first and are recorded before the target values are computed.
"""
import json
import sys
from mpmath import mp, mpf, sin, sqrt, atan2, pi, floor, cos

mp.dps = 80


def J(x):
    """Account polynomials at y = 0, copied from the displayed coefficients."""
    j0 = x ** 2
    j2 = x ** 3 + mpf(11) / 3 * x ** 2 + 9 * x + 4
    j4 = (45 * x ** 5 - 177 * x ** 4 - 2370 * x ** 3 - 5929 * x ** 2 - 13035 * x - 4035) / 180
    j6 = (4725 * x ** 7 + 128385 * x ** 6 + 1190511 * x ** 5 + 3828330 * x ** 4 + 9007565 * x ** 3
          + 15895345 * x ** 2 + 57000195 * x + 13598235) / 37800
    return j0, j2, j4, j6


def account(alpha, x, h):
    j0, j2, j4, j6 = J(x)
    return (j0 + alpha ** 2 * j2 + alpha ** 4 * j4 + alpha ** 6 * j6) / h ** 2


def wrap(a):
    """Wrap to [-pi, pi)."""
    return a - 2 * pi * floor((a + pi) / (2 * pi))


def known():
    out = {}
    # Wrap: an angle with a known winding and remainder.
    out["wrap(2*pi*7 - 0.25) = -0.25"] = abs(wrap(2 * pi * 7 - mpf("0.25")) + mpf("0.25")) < mpf(10) ** -70
    out["wrap(pi + 0.5) = -pi + 0.5"] = abs(wrap(pi + mpf("0.5")) - (-pi + mpf("0.5"))) < mpf(10) ** -70
    # Polynomials at x = 0, y = 0: J_2 = 4, J_4 = -4035/180, J_6 = 13598235/37800 (hand values).
    j0, j2, j4, j6 = J(mpf(0))
    out["J(0) hand values"] = j0 == 0 and j2 == 4 and abs(j4 + mpf(4035) / 180) < mpf(10) ** -70 and abs(j6 - mpf(13598235) / 37800) < mpf(10) ** -70
    # Polynomial J_2 at x = 1: 1 + 11/3 + 9 + 4 = 53/3.
    out["J_2(1) = 53/3"] = abs(J(mpf(1))[1] - mpf(53) / 3) < mpf(10) ** -70
    # Circular member exactly on the leading balance: x = 0 gives account = 4 alpha^2/h^2 to leading order.
    a = mpf("1e-6")
    out["account(alpha, 0, 1) = 4 alpha^2 + O(alpha^4)"] = abs(account(a, mpf(0), mpf(1)) - 4 * a ** 2) < 30 * a ** 4
    # Direction branch: a vector with negative normal and positive tangential component lies in the second quadrant.
    out["atan2 branch in the second quadrant"] = pi / 2 < atan2(mpf(2), mpf(-1)) < pi
    # sin(pi/2 - v) = cos v for a small v, the form the subject uses for r_0.
    v = mpf("1e-9")
    out["sin(pi/2 + v) = cos v"] = abs(sin(pi / 2 + v) - cos(v)) < mpf(10) ** -70
    return out


def target():
    w = mpf("0.00033356409519815205")
    Delta = mpf("3.1415926535897931")
    q = mpf("0.1666666666666666666666666666666667")
    kappa = mpf("0.000016022161698524887")
    eps = q * sqrt(kappa) / 2
    r0 = sin(Delta / 2)
    h0 = (w / eps) * r0 ** 2
    Q0 = h0 ** 2 / r0
    alpha0 = eps / h0
    I0 = account(alpha0, Q0 - 1, h0)
    rho0 = sqrt(I0)
    # c_* = (Q0 - 1) n0/h0 + (2 eps/h0^2) t0, in axes with n0 along the first axis.
    phi = atan2(2 * eps / h0 ** 2, (Q0 - 1) / h0)
    theta = (1 / rho0 - h0) / eps - (eps / h0) * (Q0 - mpf(2) / 3)
    winding = floor((theta - phi) / (2 * pi))
    Gamma = wrap(theta - phi - pi)
    checks = {
        "epsilon in (.00033356410, .00033356411)": mpf("0.00033356410") < eps < mpf("0.00033356411"),
        "I_0 in (4.4505976657061e-7, 4.4505976657062e-7)": mpf("4.4505976657061e-7") < I0 < mpf("4.4505976657062e-7"),
        "rho_0 in (.0006671279986408, .0006671279986410)": mpf("0.0006671279986408") < rho0 < mpf("0.0006671279986410"),
        "Gamma in (-.328064, -.328061)": mpf("-0.328064") < Gamma < mpf("-0.328061"),
        "winding integer 714729": winding == 714729,
        "Q_0 - 1 < 0": Q0 - 1 < 0,
    }
    vals = {k: mp.nstr(v, 30) for k, v in dict(epsilon=eps, r0=r0, h0=h0, Q0_minus_1=Q0 - 1, alpha0=alpha0, I0=I0, rho0=rho0, phi_star=phi, theta_star=theta, Gamma=Gamma).items()}
    vals["winding"] = int(winding)
    # Sensitivity diagnostic: how much Gamma moves if the highest account term is dropped.
    j0, j2, j4, j6 = J(Q0 - 1)
    I_no6 = (j0 + alpha0 ** 2 * j2 + alpha0 ** 4 * j4) / h0 ** 2
    theta_no6 = (1 / sqrt(I_no6) - h0) / eps - (eps / h0) * (Q0 - mpf(2) / 3)
    vals["Gamma_shift_if_J6_dropped"] = mp.nstr(theta_no6 - theta, 10)
    I_no4 = (j0 + alpha0 ** 2 * j2) / h0 ** 2
    theta_no4 = (1 / sqrt(I_no4) - h0) / eps - (eps / h0) * (Q0 - mpf(2) / 3)
    vals["Gamma_shift_if_J4_and_J6_dropped"] = mp.nstr(theta_no4 - theta, 10)
    return checks, vals


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else ""
    if mode == "known":
        k = known()
        print(json.dumps({"mode": "known", "result": "PASS" if all(k.values()) else "FAIL", "controls": {a: bool(b) for a, b in k.items()}}, indent=1))
        raise SystemExit(0 if all(k.values()) else 1)
    if mode == "target":
        k = known()
        if not all(k.values()):
            raise SystemExit("known cases failed; target not run")
        c, v = target()
        print(json.dumps({"mode": "target", "result": "PASS" if all(c.values()) else "FAIL", "checks": {a: bool(b) for a, b in c.items()}, "values": v}, indent=1))
        raise SystemExit(0 if all(c.values()) else 1)
    raise SystemExit("usage: known | target")
