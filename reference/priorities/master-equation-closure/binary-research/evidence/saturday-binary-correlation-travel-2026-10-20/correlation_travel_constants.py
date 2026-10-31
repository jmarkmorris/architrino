"""Exact-rational constants for the binary correlation and excursion notes (2026-10-20).

Usage: correlation_travel_constants.py OUT.json

Standard library only. Every quantity is a Fraction. Square roots of rationals are
enclosed by integer-square-root brackets at scale 10**40, each proved by squaring.
Each constant uses the bracket end that is conservative for its use:
  upper bounds: c(w), z0, e, k, k1, kA', M, m, w z0, w^2 + w z0, min(2w, sqrt(c+/rho)),
                sqrt(c+)
  lower bounds: c_-, D, D - m, G(w, rho), the floor c_-/(4w^2), every excursion
                requirement and every separation threshold.
Known cases run first; a failure writes the partial record and exits with code 2
before any target is evaluated.
"""
import json
import sys
from fractions import Fraction as F
from math import isqrt

SCALE = 10 ** 40


def sqrt_lo(x):
    """Largest n/SCALE with (n/SCALE)^2 <= x, for rational x >= 0."""
    x = F(x)
    n = isqrt((x.numerator * SCALE * SCALE) // x.denominator)
    lo = F(n, SCALE)
    assert lo * lo <= x
    return lo


def sqrt_up(x):
    x = F(x)
    lo = sqrt_lo(x)
    if lo * lo == x:
        return lo
    hi = lo + F(1, SCALE)
    assert hi * hi >= x
    return hi


def base(w):
    w = F(w)
    sL, sU = sqrt_lo(1 - w * w), sqrt_up(1 - w * w)
    alpha = (1 - w) ** 2 / (1 + w)
    c1 = (1 + w) ** 2 / (1 - w)
    cp = 2 * c1
    c2 = (3 * w + w ** 3) / (1 - w * w)
    c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
    c_up = (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / sL)
    cm_lo = 2 * (1 - w) ** 2 * sL / (1 + w)
    z0_up = 2 * w * (1 / sL - 1)
    e_up = c3 + w * c_up
    D_lo = alpha - 2 * w * e_up / cm_lo
    k1_up = (2 * w * z0_up + 2 * w ** 3 * c1 + w * w * c2) / 4
    kAp_up = 2 * w * (c_up + c3)
    M_up = w * w * c1 + k1_up + w * w * kAp_up / cm_lo
    m_up = M_up / cm_lo
    out = dict(w=w, sL=sL, sU=sU, alpha=alpha, c1=c1, cp=cp, c2=c2, c3=c3, c_up=c_up,
               cm_lo=cm_lo, z0_up=z0_up, e_up=e_up, D_lo=D_lo, k1_up=k1_up,
               kAp_up=kAp_up, M_up=M_up, m_up=m_up, Dm_lo=D_lo - m_up,
               floor_lo=cm_lo / (4 * w * w) if w > 0 else None)
    out["k_up"] = (w * w + w * z0_up) / D_lo if D_lo > 0 else None
    return out


def chunk1(b):
    """Centred-excursion necessary condition: w^2 Dr + w z0 r_max >= (D-m) sqrt(c_- r_min)."""
    w = b["w"]
    wz0 = w * b["z0_up"]
    den = w * w + wz0
    Dm = b["Dm_lo"]
    res = {"wz0_up": wz0, "den_up": den}
    if Dm <= 0:
        res["note"] = "D - m not positive; no statement"
        return res
    # r_min below which a positive excursion is forced: c_- (D-m)^2 / (w z0)^2
    res["rmin_cut_lo"] = b["cm_lo"] * Dm * Dm / (wz0 * wz0)
    # largest forced excursion over r_min and where it occurs
    res["dr_peak_lo"] = Dm * Dm * b["cm_lo"] / (4 * wz0 * den)
    res["rmin_at_peak"] = b["cm_lo"] * Dm * Dm / (4 * wz0 * wz0)
    rows = {}
    for rho in [b["floor_lo"], F(100), F(1000), F(10 ** 4), F(10 ** 5), F(10 ** 6), F(4 * 10 ** 6)]:
        if rho < b["floor_lo"]:
            continue
        num = Dm * sqrt_lo(b["cm_lo"] * rho) - wz0 * rho
        rows[str(rho)] = {"rho": rho, "dr_needed_lo": num / den if num > 0 else F(0)}
    res["rows"] = rows
    return res


def G_lo(b, rho):
    """Lower bound for G(w, rho) of the inverse-weight balance."""
    w = b["w"]
    rho = F(rho)
    curv = min(2 * w, sqrt_up(b["cp"] / rho))
    return (b["alpha"] * b["cm_lo"] - (w * w * b["c1"] + b["k1_up"])
            - b["kAp_up"] / (4 * rho) - b["z0_up"] * b["c1"] * (1 + w)
            - b["e_up"] * curv)


def G_inf_lo(b):
    w = b["w"]
    return b["alpha"] * b["cm_lo"] - (w * w * b["c1"] + b["k1_up"]) - b["z0_up"] * b["c1"] * (1 + w)


def chunk2(b):
    w = b["w"]
    res = {}
    sq_cp_up = sqrt_up(b["cp"])
    res["kappa_a_lo"] = 2 / (w * b["cp"] * sq_cp_up)
    if b["k_up"] is not None:
        res["kappa_b_lo"] = 2 / (w * b["cp"] * b["k_up"])
    rows = {}
    for rho in [b["floor_lo"], F(100), F(1000), F(10 ** 4), F(10 ** 6), F(10 ** 8)]:
        if rho < b["floor_lo"]:
            continue
        g = G_lo(b, rho)
        row = {"rho": rho, "G_lo": g, "oscJ2_lo": 2 * g / w,
               "kappa_a_G_lo": res["kappa_a_lo"] * g}
        if "kappa_b_lo" in res:
            row["kappa_b_G_lo"] = res["kappa_b_lo"] * g
        rows[str(rho)] = row
    res["rows"] = rows
    res["G_inf_lo"] = G_inf_lo(b)
    return res


def dec(x, n=12):
    if x is None:
        return None
    if isinstance(x, (dict, list)):
        return x
    return f"{float(x):.{n}g}"


def flat(d):
    if isinstance(d, dict):
        return {k: flat(v) for k, v in d.items()}
    return dec(d)


def main():
    out_path = sys.argv[1]
    rec = {"known_cases": [], "targets": {}}

    def known(name, ok, detail):
        rec["known_cases"].append({"name": name, "pass": bool(ok), "detail": detail})
        print(f"KNOWN {name}: {'pass' if ok else 'FAIL'} ({detail})")
        if not ok:
            with open(out_path, "w") as fh:
                json.dump(rec, fh, indent=2, default=str)
            sys.exit(2)

    # K0: square-root enclosures on exact and irrational inputs
    known("K0 sqrt(9/4)=3/2 exactly; sqrt(2) bracket squares around 2",
          sqrt_lo(F(9, 4)) == F(3, 2) and sqrt_up(F(9, 4)) == F(3, 2)
          and sqrt_lo(2) ** 2 < 2 < sqrt_up(2) ** 2 and sqrt_up(2) - sqrt_lo(2) == F(1, SCALE),
          f"{sqrt_lo(F(9, 4))}, {float(sqrt_lo(2))}")
    # K1: zero-speed algebraic limit (hand values): alpha=c1=c3=1, c=4, c_-=2, z0=0, k1=kA'=0, G=2
    b0 = base(F(0))
    g0 = (b0["alpha"] * b0["cm_lo"] - (b0["k1_up"]) - b0["z0_up"] * b0["c1"]
          - b0["e_up"] * 0)
    known("K1 zero-speed limit: c=4, c_-=2, z0=0, k1=0, kA'=0, e=1, G_inf=2",
          b0["c_up"] == 4 and b0["cm_lo"] == 2 and b0["z0_up"] == 0 and b0["k1_up"] == 0
          and b0["kAp_up"] == 0 and b0["e_up"] == 1 and g0 == 2 and G_inf_lo(b0) == 2,
          f"c={b0['c_up']}, c-={b0['cm_lo']}, e={b0['e_up']}, G_inf={G_inf_lo(b0)}")
    t = base(F(1, 10))
    known("K2 hand values at w=1/10: alpha=81/110, c1=121/90, c2=301/990, c3=1331/490",
          t["alpha"] == F(81, 110) and t["c1"] == F(121, 90) and t["c2"] == F(301, 990)
          and t["c3"] == F(1331, 490),
          f"{t['alpha']}, {t['c1']}, {t['c2']}, {t['c3']}")
    known("K3 accepted: c(1/10)<=12.725, e<=3.989, k1<=0.001483, kA'/4<=0.7721, c_-/(2w)>=7.32",
          t["c_up"] <= F(12725, 1000) and t["e_up"] <= F(3989, 1000) and t["k1_up"] <= F(1483, 10 ** 6)
          and t["kAp_up"] / 4 <= F(7721, 10 ** 4) and t["cm_lo"] * 5 >= F(732, 100),
          f"c={dec(t['c_up'])}, e={dec(t['e_up'])}, k1={dec(t['k1_up'])}, kA'/4={dec(t['kAp_up'] / 4)}")
    known("K4 accepted low-J: D(1/10)>=0.19194, k(1/10)<=0.052624",
          t["D_lo"] >= F(19194, 10 ** 5) and t["k_up"] <= F(52624, 10 ** 6),
          f"D={dec(t['D_lo'])}, k={dec(t['k_up'])}")
    wz0 = F(1, 10) * t["z0_up"]
    bprime = (wz0 / t["Dm_lo"]) ** 2
    known("K5 accepted Oct-17: D-m>=0.16737, b'<=3.6238e-7, c_-/b'>=4043686",
          t["Dm_lo"] >= F(16737, 10 ** 5) and bprime <= F(36238, 10 ** 11)
          and t["cm_lo"] / bprime >= 4043686,
          f"D-m={dec(t['Dm_lo'])}, b'={dec(bprime)}, c-/b'={dec(t['cm_lo'] / bprime)}")

    for wv in (F(1, 10), F(1, 20), F(1, 100)):
        b = base(wv)
        rec["targets"][str(wv)] = {
            "base": flat({k: v for k, v in b.items() if k not in ("sL", "sU")}),
            "chunk1": flat(chunk1(b)),
            "chunk2": flat(chunk2(b)),
        }
        print(f"TARGET w={wv}:")
        print(json.dumps(rec["targets"][str(wv)], indent=1))
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
