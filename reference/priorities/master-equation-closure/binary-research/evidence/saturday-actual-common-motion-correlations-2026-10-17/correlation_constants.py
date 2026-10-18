"""Exact-rational constants of the actual common-motion correlation note (2026-10-17).

Usage: correlation_constants.py OUT.json

All quantities are Fractions. sqrt(1 - w^2) is enclosed by a rational bracket
[sL, sU] proved by squaring. Each constant is evaluated with the bracket end
that is conservative for its use in the note:
  upper bounds: c(w), z0, e, k, k1, kA', M, m, slopes a, a2, intercepts b, b2, k^2
  lower bounds: c_-, D, D - m, and every separation threshold c_-/intercept.
Known cases run first; a failure exits with code 2 before any target is printed.
"""
import json
import sys
from fractions import Fraction as F


def sqrt_bracket(x, digits=30):
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
    c2 = (3 * w + w ** 3) / (1 - w * w)
    c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
    c_up = (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / sL)
    cm_lo = 2 * (1 - w) ** 2 * sL / (1 + w)
    z0_up = 2 * w * (1 / sL - 1)
    e_up = c3 + w * c_up
    D_lo = alpha - 2 * w * e_up / cm_lo
    k_up = (w * w + w * z0_up) / D_lo
    k1_up = (2 * w * z0_up + 2 * w ** 3 * c1 + w * w * c2) / 4
    kAp_up = 2 * w * (c_up + c3)
    M_up = w * w * c1 + k1_up + w * w * kAp_up / cm_lo
    m_up = M_up / cm_lo
    Dm_lo = D_lo - m_up
    out = dict(w=w, alpha=alpha, c1=c1, c2=c2, c3=c3, c_up=c_up, cm_lo=cm_lo,
               z0_up=z0_up, e_up=e_up, D_lo=D_lo, k_up=k_up, k1_up=k1_up,
               kAp_up=kAp_up, M_up=M_up, m_up=m_up, Dm_lo=Dm_lo)
    if Dm_lo > 0:
        # Form A: c_- <1/r> <= a <|rdot|> + b
        # slope 2w + (2wm + w^2/2)/(D - m): decreasing in D, increasing in m
        out["a_up_formA"] = 2 * w + (2 * w * m_up + w * w / 2) / Dm_lo
        out["b_up_formA"] = w * z0_up * k_up / Dm_lo
        # Form B: c_- <1/r> <= a2 <|rdot|> + b2
        # slope 2w + (4wm + w^2)/(D - m)
        out["a2_up_formB"] = 2 * w + (4 * w * m_up + w * w) / Dm_lo
        out["b2_up_formB"] = (w * z0_up / Dm_lo) ** 2
        # Old-input form: c_- <1/r> <= 2w <|rdot|> + k^2
        out["k2_up_old"] = k_up ** 2
        out["thr_formA_lo"] = cm_lo / out["b_up_formA"]
        out["thr_formB_lo"] = cm_lo / out["b2_up_formB"]
        out["thr_old_lo"] = cm_lo / out["k2_up_old"]
    return out


def dec(x, n=10):
    return f"{float(x):.{n}g}"


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

    t = constants(F(1, 10))
    known("K1 hand: alpha=81/110, c3=1331/490, c2=301/990, c1=121/90",
          t["alpha"] == F(81, 110) and t["c3"] == F(1331, 490) and t["c2"] == F(301, 990) and t["c1"] == F(121, 90),
          f"{t['alpha']}, {t['c3']}, {t['c2']}, {t['c1']}")
    known("K2 accepted low-J: D(1/10) >= 0.19194 and k(1/10) <= 0.052624",
          t["D_lo"] >= F(19194, 100000) and t["k_up"] <= F(52624, 1000000),
          f"D_lo={dec(t['D_lo'], 12)}, k_up={dec(t['k_up'], 12)}")
    known("K3 accepted signed-breathing: k1(1/10) <= 0.001483", t["k1_up"] <= F(1483, 1000000),
          f"k1_up={dec(t['k1_up'], 12)}")
    known("K4 accepted e1(1/10) <= 3.989", t["e_up"] <= F(3989, 1000), f"e_up={dec(t['e_up'], 12)}")
    known("K5 accepted c_-/(2w) (1/10) >= 7.32", t["cm_lo"] / (2 * F(1, 10)) >= F(732, 100),
          f"{dec(t['cm_lo'] * 5, 12)}")

    for wv in (F(1, 10), F(1, 20), F(1, 100)):
        c = constants(wv)
        row = {k: dec(v, 12) for k, v in c.items()}
        rec["targets"][str(wv)] = row
        print(f"TARGET w={wv}: " + ", ".join(f"{k}={v}" for k, v in row.items()))
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
