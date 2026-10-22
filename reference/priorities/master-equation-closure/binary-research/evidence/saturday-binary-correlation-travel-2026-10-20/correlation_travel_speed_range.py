"""Exact-rational speed-range evaluation of G(w, rho) for chunk 3 (2026-10-20).

Usage: correlation_travel_speed_range.py OUT.json

G(w, rho) = alpha c_- - (w^2 c1 + k1) - kA'/(4 rho) - (1+w) z0 c1 - e min{2w, sqrt(c+/rho)}
G_inf(w)  = alpha c_- - (w^2 c1 + k1) - (1+w) z0 c1
Lower bounds use the conservative bracket ends (as in correlation_travel_constants.py).
Upper bounds (for certifying G_inf < 0) use the opposite ends.
Targets:
  (1) for each w in a list, the smallest power-of-two multiple rho_hi of the floor
      lower bound such that G_lo(w, rho_hi) > 0, refined by bisection to a
      certified rho_cert with G_lo(w, rho_cert) > 0 (upper bound on the threshold);
  (2) a rational w1 with G_inf_lo(w1) > 0 and a rational w2 with G_inf_up(w2) < 0.
Known cases run first; a failure exits 2 before any target.
"""
import json
import sys
from fractions import Fraction as F
from math import isqrt

SCALE = 10 ** 40


def sqrt_lo(x):
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


def consts(w, lower=True):
    """Return the pieces of G. lower=True: bracket ends that make G small (lower bound of G).
    lower=False: bracket ends that make G large (upper bound of G)."""
    w = F(w)
    sL, sU = sqrt_lo(1 - w * w), sqrt_up(1 - w * w)
    s_small, s_big = (sL, sU)
    alpha = (1 - w) ** 2 / (1 + w)
    c1 = (1 + w) ** 2 / (1 - w)
    cp = 2 * c1
    c2 = (3 * w + w ** 3) / (1 - w * w)
    c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
    if lower:
        cm = 2 * (1 - w) ** 2 * s_small / (1 + w)          # c_- lower
        c = (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / s_small)  # c upper
        z0 = 2 * w * (1 / s_small - 1)                     # z0 upper
    else:
        cm = 2 * (1 - w) ** 2 * s_big / (1 + w)            # c_- upper
        c = (1 + w) ** 3 / ((1 - w) * (1 - 3 * w) ** 2) * (1 + (3 + 2 * w) / s_big)    # c lower
        z0 = 2 * w * (1 / s_big - 1)                       # z0 lower
    e = c3 + w * c
    k1 = (2 * w * z0 + 2 * w ** 3 * c1 + w * w * c2) / 4
    kAp = 2 * w * (c + c3)
    return dict(w=w, alpha=alpha, c1=c1, cp=cp, cm=cm, c=c, z0=z0, e=e, k1=k1, kAp=kAp)


def G_inf(w, lower=True):
    k = consts(w, lower)
    return k["alpha"] * k["cm"] - (k["w"] ** 2 * k["c1"] + k["k1"]) - (1 + k["w"]) * k["z0"] * k["c1"]


def G_lo(w, rho):
    k = consts(w, True)
    rho = F(rho)
    curv = min(2 * k["w"], sqrt_up(k["cp"] / rho))
    return G_inf(w, True) - k["kAp"] / (4 * rho) - k["e"] * curv


def floor_lo(w):
    k = consts(w, True)
    return k["cm"] / (4 * k["w"] ** 2)


def certify_rho(w, max_doublings=200):
    """Return a rational rho_cert >= floor_lo(w) with G_lo(w, rho_cert) > 0, refined by
    bisection between the last failing and first passing doubling; None if G_inf_lo <= 0."""
    if G_inf(w, True) <= 0:
        return None
    lo = floor_lo(w)
    if G_lo(w, lo) > 0:
        return lo
    hi = lo
    for _ in range(max_doublings):
        hi = hi * 2
        if G_lo(w, hi) > 0:
            break
        lo = hi
    else:
        return None
    # bisection on integers-ish: keep G_lo(hi) > 0, G_lo(lo) <= 0
    for _ in range(60):
        mid = (lo + hi) / 2
        mid = F(mid.numerator // mid.denominator + 1)  # round up to an integer
        if mid >= hi:
            break
        if G_lo(w, mid) > 0:
            hi = mid
        else:
            lo = mid
    return hi


def dec(x, n=12):
    return None if x is None else f"{float(x):.{n}g}"


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

    known("K0 sqrt(9/4)=3/2 exactly; sqrt(2) bracket",
          sqrt_lo(F(9, 4)) == F(3, 2) and sqrt_up(F(9, 4)) == F(3, 2)
          and sqrt_lo(2) ** 2 < 2 < sqrt_up(2) ** 2, f"{float(sqrt_up(2))}")
    known("K1 zero-speed limit: G_inf lower = upper = 2",
          G_inf(0, True) == 2 and G_inf(0, False) == 2, f"{G_inf(0, True)}, {G_inf(0, False)}")
    k = consts(F(1, 10), True)
    known("K2 hand values at 1/10: alpha=81/110, c1=121/90",
          k["alpha"] == F(81, 110) and k["c1"] == F(121, 90), f"{k['alpha']}, {k['c1']}")
    known("K3 lower <= upper bracket ordering of G_inf at w=1/10, 1/5, 3/10",
          all(G_inf(F(x), True) <= G_inf(F(x), False) for x in ("1/10", "1/5", "3/10")),
          ", ".join(f"{dec(G_inf(F(x), True))}<={dec(G_inf(F(x), False))}" for x in ("1/10", "1/5", "3/10")))
    known("K4 accepted value via chunk-2 instrument run1: G(1/10, floor) >= 0.24377 and G_inf(1/10) >= 1.0626",
          G_lo(F(1, 10), floor_lo(F(1, 10))) >= F(24377, 10 ** 5) and G_inf(F(1, 10), True) >= F(10626, 10 ** 4),
          f"{dec(G_lo(F(1, 10), floor_lo(F(1, 10))))}, {dec(G_inf(F(1, 10), True))}")

    k10 = consts(F(1, 10), True)
    D10 = k10["alpha"] - 2 * F(1, 10) * k10["e"] / k10["cm"]
    kz10 = (F(1, 100) + F(1, 10) * k10["z0"]) / D10
    ka10 = 2 / (F(1, 10) * k10["cp"] * sqrt_up(k10["cp"]))
    kb10 = 2 / (F(1, 10) * k10["cp"] * kz10)
    known("K5 run1 regression at 1/10: kappa_a >= 4.5359, kappa_b >= 141.34, k <= 0.052624",
          ka10 >= F(45359, 10 ** 4) and kb10 >= F(14134, 100) and kz10 <= F(52624, 10 ** 6),
          f"{dec(ka10)}, {dec(kb10)}, {dec(kz10)}")

    g105 = G_lo(F(21, 200), floor_lo(F(21, 200)))
    g110 = G_lo(F(11, 100), floor_lo(F(11, 100)))
    known("K6 independent chunk-2 reviewer values: G(0.105,floor)~0.096862325442, G(0.11,floor)~-0.062972214241",
          abs(g105 - F(96862325442, 10 ** 12)) < F(1, 10 ** 6) and abs(g110 - F(-62972214241, 10 ** 12)) < F(1, 10 ** 6),
          f"{dec(g105)}, {dec(g110)}")

    for wv in ("1/10", "21/200", "11/100", "1/8", "3/20", "1/5", "1/4", "27/100"):
        w = F(wv)
        r = certify_rho(w)
        row = {"floor_lo": dec(floor_lo(w)), "G_inf_lo": dec(G_inf(w, True)),
               "rho_cert": dec(r), "G_at_rho_cert": dec(G_lo(w, r)) if r is not None else None,
               "G_at_floor": dec(G_lo(w, floor_lo(w)))}
        rec["targets"][wv] = row
        print(f"TARGET w={wv}: {row}")
    # sharper amplitude coefficients where D > 0 (Theorem Z available)
    for wv in ("1/10", "1/20", "1/100"):
        w = F(wv)
        k = consts(w, True)
        D_lo = k["alpha"] - 2 * w * k["e"] / k["cm"]
        kz = (w * w + w * k["z0"]) / D_lo
        c2 = (3 * w + w ** 3) / (1 - w * w)
        c3 = (1 + w) ** 3 / (1 - 3 * w) ** 2
        beta = k["c1"] * kz + 2 * w * c2 + 2 * w * c3 * kz / k["cm"]
        kap_a2 = 2 / (beta * sqrt_up(k["cp"]))
        kap_b2 = 2 / (beta * kz)
        kap_a = 2 / (w * k["cp"] * sqrt_up(k["cp"]))
        kap_b = 2 / (w * k["cp"] * kz)
        row = {"D_lo": dec(D_lo), "k_up": dec(kz), "beta_up": dec(beta), "w_cplus": dec(w * k["cp"]),
               "kappa_a_lo": dec(kap_a), "kappa_a_sharp_lo": dec(kap_a2),
               "kappa_b_lo": dec(kap_b), "kappa_b_sharp_lo": dec(kap_b2)}
        rec["targets"]["sharp_" + wv] = row
        print(f"TARGET sharp w={wv}: {row}")
    # transition of G_inf sign
    w1, w2 = F(27, 100), F(28, 100)
    rec["targets"]["G_inf_sign"] = {"w1": str(w1), "G_inf_lo_w1": dec(G_inf(w1, True)),
                                    "w2": str(w2), "G_inf_up_w2": dec(G_inf(w2, False))}
    print("TARGET G_inf sign:", rec["targets"]["G_inf_sign"])
    with open(out_path, "w") as fh:
        json.dump(rec, fh, indent=2, default=str)


if __name__ == "__main__":
    main()
