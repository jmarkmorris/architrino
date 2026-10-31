"""Known-case controls at the faster speeds, for the unchanged kernel and the new driver's regime.

F1  raw three-vector float rows of the canonical law (positions, causal root by bisection, D,
    acceleration vector; written separately from the kernel) against the kernel's reduction at
    (delta, eps) = (2.973283306, 0.4843985142) and (2.214456143, 0.8722131936), k in {0,1,2,7,40,1000}.
F2  kernel root enclosures started from the Lemma 1 bracket alone (no float seed) at those speeds:
    certified, and containing the raw bisection root.
F3  tail consistency at both points: enclosures of G and S at N = 300 and N = 3000 overlap.
On a pass writes controls_fast_receipt.json; on a failure writes controls_fast_receipt_FAILED_<utc>.json.
"""
import json, math, os, sys, time
import numpy as np
from mpmath import iv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ladder_interval_kernel as L

HERE = os.path.dirname(os.path.abspath(__file__))
rec = {"controls": {}}
t_all = time.time()
POINTS = [(2.973283306, 0.4843985142), (2.214456143, 0.8722131936)]


def s(x):
    return [str(x.a), str(x.b)]


def raw_row(nu, k, delta, eps):
    x = np.array([1.0, 0.0, 0.0])
    X = lambda t: np.array([nu * math.cos(eps * t), nu * math.sin(eps * t), k * delta])
    V = lambda t: np.array([-nu * eps * math.sin(eps * t), nu * eps * math.cos(eps * t), 0.0])
    f = lambda tau: tau - np.linalg.norm(x - X(-tau))
    a, b = 1e-12, 10.0 + abs(k) * delta * 4
    for _ in range(200):
        m = 0.5 * (a + b)
        if f(m) > 0:
            b = m
        else:
            a = m
    tau = 0.5 * (a + b)
    r = x - X(-tau)
    n = r / tau
    D = 1 - n.dot(V(-tau))
    acc = nu * (-1) ** k * r / (tau ** 3 * abs(D))
    return tau, D, acc


f1, f2 = [], []
ok1 = ok2 = True
for (dl, ef) in POINTS:
    for nu in (1, -1):
        for k in (0, 1, 2, 7, 40, 1000):
            if nu == 1 and k == 0:
                continue
            tau, D, acc = raw_row(nu, k, dl, ef)
            r = L.row(nu, k, L.I(dl), L.I(ef))
            sg = (-1) ** k
            tan_red = ef * sg * float(r["g"].v.mid)
            rad_red = nu * sg * float(r["h"].v.mid)
            dt = abs(acc[1] - tan_red) / max(abs(acc[1]), 1e-300)
            dr = abs(acc[0] - rad_red) / max(abs(acc[0]), 1e-300)
            dtau = abs(tau - float(r["tau"].mid)) / tau
            _, _, acc2 = raw_row(nu, -k, dl, ef)
            ax = abs(acc[2] + acc2[2])
            good = dt < 1e-11 and dr < 1e-11 and dtau < 1e-13 and ax <= 1e-15 * abs(acc[2]) + 1e-300
            ok1 = ok1 and good
            f1.append({"delta": dl, "eps": ef, "nu": nu, "k": k, "tau_raw": tau, "D_raw": D, "a_raw": acc.tolist(),
                       "rel_dev_tan": dt, "rel_dev_rad": dr, "rel_dev_tau": dtau, "axial_pair_sum": ax, "pass": bool(good)})
            T, rr = L.root_enclosure(nu, k * L.I(dl), L.I(ef))  # Lemma 1 bracket start
            good2 = bool(rr[1]) and rr[2] == "lemma" and bool(T.a - 1e-12 * (1 + tau) <= tau <= T.b + 1e-12 * (1 + tau))
            ok2 = ok2 and good2
            f2.append({"delta": dl, "eps": ef, "nu": nu, "k": k, "enclosure": s(T), "iterations": rr[0],
                       "raw_bisection_root": tau, "pass": good2})
rec["controls"]["F1_raw_row_vs_reduction"] = {"cases": f1, "pass": ok1}
rec["controls"]["F2_root_from_lemma_bracket"] = {"cases": f2, "pass": ok2,
                                                 "note": "float bisection root compared with 1e-12 relative slack (float error)"}

f3 = []
ok3 = True
for (dl, ef) in POINTS:
    res = {}
    for N in (300, 3000):
        res[N] = L.ladder_sums(L.I(dl), L.I(ef), N, seed=(dl, ef, lambda k: 1e-9 + 1e-12 * k))
    ovG = L.intersect(res[300]["G"], res[3000]["G"]) is not None
    ovS = L.intersect(res[300]["S"], res[3000]["S"]) is not None
    ok3 = ok3 and ovG and ovS
    f3.append({"delta": dl, "eps": ef, "G_N300": s(res[300]["G"]), "G_N3000": s(res[3000]["G"]),
               "S_N300": s(res[300]["S"]), "S_N3000": s(res[3000]["S"]),
               "G_width": [L.width(res[300]["G"]), L.width(res[3000]["G"])],
               "S_width": [L.width(res[300]["S"]), L.width(res[3000]["S"])], "pass": bool(ovG and ovS)})
rec["controls"]["F3_tail_consistency"] = {"cases": f3, "pass": ok3}

rec["all_pass"] = all(v["pass"] for v in rec["controls"].values())
rec["iv_dps"] = iv.dps
rec["runtime_s"] = time.time() - t_all
name = "controls_fast_receipt.json" if rec["all_pass"] else \
    "controls_fast_receipt_FAILED_%s.json" % time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
with open(os.path.join(HERE, name), "w") as fh:
    json.dump(rec, fh, indent=1, default=lambda o: o.item() if hasattr(o, "item") else str(o))
print({k: bool(v["pass"]) for k, v in rec["controls"].items()}, "all_pass", rec["all_pass"], "runtime", rec["runtime_s"], name)
