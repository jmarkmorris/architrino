"""Instance check of the validated far step on the aliasing control.

Checks hypotheses H1 to H5 of addendum 1, section 5, in exact rational
arithmetic for the on-axis control (c_f = 1), builds the theorem's tube at the
step end, and compares it with the exact true-state bracket computed by the
frozen bracket instrument. No solver code is imported. This is one instance of
the theorem's statement, not an implementation of a validated step.

Setting: receiver at rest at the origin up to T = 0; source past
z_s(S) = R + A p(S) on [S_min, 0]; charges 1; coupling kappa; step h.
Everything lies on the z axis, so boxes are intervals of z.

Two acceleration enclosures for the receiver are evaluated.
  "far-field": the zero-centred individual bound kappa / ((r-)^2 nu), with
      nu = 1 - (source speed bound) and r- the distance floor. General.
  "range": [-kappa / ((r-)^2 D_min), -kappa / ((r+)^2 D_max)], valid for this
      on-axis instance because the source stays above the receiver, the
      distance lies in [r-, r+] and D = 1 + z_s' lies in [1 - 3A, 1 + 3A].

Usage: python <this file>     (exits 2 if the known static case fails)
"""
import importlib.util
import pathlib
import sys
from fractions import Fraction as Q

HERE = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location(
    "bound", HERE / "matched-pair-stage-3-aliasing-control-bound.py")
bound = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bound)


def check(name, condition, detail):
    print(f"  {'PASS' if condition else 'FAIL'}  {name}: {detail}")
    return condition


def show(x):
    return f"{float(x):.9e}"


def instance(A, kappa, h, rho, label):
    R, T, S_min = Q(10), Q(0), Q(-20)
    print(f"\n{label}: A = {A}, kappa = {kappa}, h = {h}, trial radius {rho}")
    ok = True
    source_speed = 3 * A                      # sup |z_s'| on the past
    nu = 1 - source_speed
    # Step position boxes (trial): receiver [-rho, rho], source [R-rho, R+rho].
    r_minus = R - rho                         # receiver box to source past hull [R, R+A]
    r_plus = R + A + rho
    B_receiver = kappa / (r_minus ** 2 * nu)  # far-field bound, receiver <- source
    B_source = kappa / (R - rho) ** 2         # source <- static receiver past, nu = 1
    v_plus = max(source_speed, h * B_receiver, h * B_source)
    ok &= check("H1 sub-wake speed", v_plus < 1, f"v+ = {show(v_plus)}")
    ok &= check("H2 isolation", R - 2 * rho > h,
                f"box separation {show(R - 2 * rho)} > h")
    # Position tubes at S_min are the exact points 0 and R (p(S_min) = 0).
    ok &= check("H3 present, receiver <- source", R + rho < T - S_min,
                f"sup distance {show(R + rho)} < T - S_min = {T - S_min}")
    ok &= check("H3 present, source <- receiver", R + rho < T - S_min,
                f"sup distance {show(R + rho)} < T - S_min = {T - S_min}")
    ok &= check("H5 receiver position box", h * h / 2 * B_receiver <= rho,
                f"{show(h * h / 2 * B_receiver)} <= {show(rho)}")
    ok &= check("H5 source position box", h * h / 2 * B_source <= rho,
                f"{show(h * h / 2 * B_source)} <= {show(rho)}")
    # H4 for the two enclosures: |a| = kappa / (r^2 D) with r >= r-, D >= nu
    # gives the far-field box; the sign and the two-sided ranges give "range".
    enclosures = {
        "far-field": (-B_receiver, B_receiver),
        "range": (-kappa / (r_minus ** 2 * (1 - 3 * A)),
                  -kappa / (r_plus ** 2 * (1 + 3 * A))),
    }
    record = {"amplitude": str(A), "coupling": str(kappa), "step": str(h)}
    truth = bound.bracket(record)
    for name, (a_low, a_high) in enclosures.items():
        v_tube = (h * a_low, h * a_high)
        z_tube = (h * h / 2 * a_low, h * h / 2 * a_high)
        print(f"  {name}: A = [{show(a_low)}, {show(a_high)}]")
        print(f"    velocity tube at T+h [{show(v_tube[0])}, {show(v_tube[1])}],"
              f" half-width {show((v_tube[1] - v_tube[0]) / 2)}")
        ok &= check(f"{name} velocity tube contains true bracket",
                    v_tube[0] <= truth["v_true"][0]
                    and truth["v_true"][1] <= v_tube[1],
                    f"true in [{show(truth['v_true'][0])},"
                    f" {show(truth['v_true'][1])}]")
        if "z_true" in truth:
            ok &= check(f"{name} position tube contains true bracket",
                        z_tube[0] <= truth["z_true"][0]
                        and truth["z_true"][1] <= z_tube[1],
                        f"tube [{show(z_tube[0])}, {show(z_tube[1])}], true in"
                        f" [{show(truth['z_true'][0])},"
                        f" {show(truth['z_true'][1])}]")
    return ok


def main():
    bound.known_checks()
    kappa, h, rho = Q(1, 1000), Q(2), Q(1, 1000)
    if not instance(Q(0), kappa, h, rho, "Known static case"):
        print("KNOWN CASE FAILED")
        raise SystemExit(2)
    ok = instance(Q(1, 5), kappa, h, rho, "Target")
    print("\nAll checks passed." if ok else "\nA CHECK FAILED.")
    raise SystemExit(0 if ok else 1)


if __name__ == "__main__":
    main()
