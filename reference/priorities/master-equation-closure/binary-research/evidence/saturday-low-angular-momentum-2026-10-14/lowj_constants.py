"""Exact-rational evaluation of the constants of the low-angular-momentum note (2026-10-14).

Usage: lowj_constants.py OUT.json

Every quantity is a Fraction. The one irrational input, s = sqrt(1 - w^2), is
enclosed by a rational bracket [sL, sU] proved by squaring (sL^2 <= 1-w^2 <= sU^2).
Each derived constant is evaluated with the bracket end that makes it
conservative in the direction the note uses: upper bounds for c(w), z0, c3+w*c,
k(w) and r_cross; lower bounds for c_-, D(w), R*(w), the separation floor and
the closest-approach angular-momentum bound. Known cases run first; a failure
exits with code 2 before any target is printed.
"""
import json
import sys
from fractions import Fraction as F


def sqrt_bracket(x, digits=30):
    """Rational lo <= sqrt(x) <= hi, hi - lo <= 10**-digits, proved by squaring."""
    lo, hi = F(0), max(F(1), x)
    tol = F(1, 10 ** digits)
    while hi - lo > tol:
        mid = (lo + hi) / 2
        if mid * mid <= x:
            lo = mid
        else:
            hi = mid
    assert lo * lo <= x <= hi * hi
    return lo, hi


def constants(w):
    sL, sU = sqrt_bracket(1 - w * w)
    alpha = (1 - w) ** 2 / (1 + w)
    c1 = (1 + w) ** 2 / (1 - w)
    c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
    pref = (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2)
    c_up = pref * (1 + (3 + 2 * w) / sL)
    cminus_lo = 2 * (1 - w) ** 2 * sL / (1 + w)
    z0_up = 2 * w * (1 / sL - 1)
    e_up = c3 + w * c_up                      # c3 + w c(w)
    D_lo = alpha - 2 * w * e_up / cminus_lo   # D(w) = alpha - 2w(c3 + w c)/c_-
    out = dict(w=w, sL=sL, sU=sU, alpha=alpha, c1=c1, c3=c3, c_up=c_up,
               cminus_lo=cminus_lo, z0_up=z0_up, e_up=e_up, D_lo=D_lo)
    if D_lo > 0:
        k_up = (w * w + w * z0_up) / D_lo
        out.update(
            k_up=k_up,
            Rstar_lo=cminus_lo / (2 * w * k_up),
            floor_lo=cminus_lo / (4 * w * w),
            Jstar_lo=cminus_lo / (2 * w),
            rcross_up=e_up / (2 * w * w),
        )
    return out


def dec(x, n=10):
    return f"{float(x):.{n}g}"


def main():
    out_path = sys.argv[1]
    record = {"known_cases": [], "targets": {}}

    def known(name, ok, detail):
        record["known_cases"].append({"name": name, "pass": bool(ok), "detail": detail})
        print(f"KNOWN {name}: {'pass' if ok else 'FAIL'} ({detail})")
        if not ok:
            with open(out_path, "w") as fh:
                json.dump(record, fh, indent=2, default=str)
            sys.exit(2)

    # K1: hand values at w = 1/10.
    t = constants(F(1, 10))
    known("K1 alpha(1/10) = 81/110 and c3(1/10) = 1331/490 exactly",
          t["alpha"] == F(81, 110) and t["c3"] == F(1331, 490),
          f"alpha={t['alpha']}, c3={t['c3']}")
    # K2: sqrt bracket proved and tight.
    known("K2 sqrt(99/100) bracket", t["sL"] ** 2 <= F(99, 100) <= t["sU"] ** 2 and t["sU"] - t["sL"] < F(1, 10 ** 29),
          f"width<1e-29")
    # K3: accepted upward-rounded coefficient e1 = c3 + w c(w) <= 3.989 (manuscript 9.3).
    known("K3 e1(1/10) = c3 + w c in (3.988, 3.989]", F(3988, 1000) < t["e_up"] <= F(3989, 1000),
          f"e_up={dec(t['e_up'], 12)}")
    # K4: accepted rho_Z + rho_e <= 5.4170 at w = 1/10 (manuscript Section 9).
    w = F(1, 10)
    rhoZ = w * t["c_up"] * (1 + w) / (1 - w) ** 2
    rhoe = (1 + w) ** 4 / ((1 - w) ** 2 * (1 - 3 * w) ** 2)
    known("K4 rho_Z + rho_e (1/10) <= 5.4170", rhoZ + rhoe <= F(54170, 10000), f"{dec(rhoZ + rhoe, 12)}")
    # K5: accepted closest-approach bound c_-/(2w) >= 7.32 at w = 1/10 (manuscript 9.4).
    known("K5 c_-/(2w) (1/10) >= 7.32", t["cminus_lo"] / (2 * w) >= F(732, 100), f"{dec(t['cminus_lo'] / (2 * w), 12)}")

    # Targets.
    for wv in (F(1, 10), F(1, 20), F(1, 100), F(1, 1000)):
        c = constants(wv)
        row = {k: dec(v, 12) for k, v in c.items() if k not in ("sL", "sU")}
        if "k_up" in c:
            row["k_over_w2"] = dec(c["k_up"] / (wv * wv), 12)
            row["Rstar_times_w3"] = dec(c["Rstar_lo"] * wv ** 3, 12)
            row["Rstar_over_floor"] = dec(c["Rstar_lo"] / c["floor_lo"], 12)
        record["targets"][str(wv)] = row
        print(f"TARGET w={wv}: " + ", ".join(f"{k}={v}" for k, v in row.items()))
    # Scan of the sign of D(w) on a grid, to locate where the theorem's denominator is positive.
    scan = []
    for n in range(1, 34):
        wv = F(n, 300)
        scan.append((str(wv), c := dec(constants(wv)["D_lo"], 8)))
    record["targets"]["D_scan_w_n_over_300"] = scan
    last_pos = max(F(s) for s, d in scan if float(d) > 0)
    print(f"TARGET largest grid point n/300 with D_lo>0: w={last_pos}; grid signs: "
          + " ".join(f"{s}:{'+' if float(d) > 0 else '-'}" for s, d in scan))
    record["targets"]["D_positive_grid_max"] = str(last_pos)
    with open(out_path, "w") as fh:
        json.dump(record, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
