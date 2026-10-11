"""Fourth-order run of the separately written account re-derivation.

Uses only the functions of serial-root-birth-nonmirror-account-rederivation-2026-10-10.py, with the
expansion stopped at fourth order. It was written as a faster companion to the fifth-order run. At this
order it reaches the response coefficients B_2 and B_3, the corrected J_2 (whose constant 4 comes from
the order-three mean), J_3, and the vanishing of the order-two and order-four means. It does not reach
the order-five mean, so it does not fix the mean part of J_4 or the constant J_4(0,0) = -269/12.
The module's own known cases run first and must pass.
"""
import importlib.util
import json
import pathlib
import time
import sympy as sp

here = pathlib.Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location("rederivation", here / "serial-root-birth-nonmirror-account-rederivation-2026-10-10.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

t0 = time.time()
known = m.run("known")
out = {"known_result": known["known_result"], "known": known["known"]}
if known["known_result"] == "PASS":
    N = 4
    x, y, E, P, Q = m.x, m.y, m.E, m.P, m.Q
    a_c, B_c = m.to_PQ(m.response(N), N)
    out["a"] = [str(c) for c in a_c]
    out["B"] = [str(c) for c in B_c]
    out["response_seconds"] = round(time.time() - t0, 2)
    Js, means, shifts = m.build(N, a_c, B_c)
    doc_J2 = x ** 3 + sp.Rational(11, 3) * x ** 2 - y ** 2 / 3 + 9 * x + 4
    doc_J3 = y / 3 * (7 * x ** 2 + 2 * y ** 2 + 24 * x + 45)
    target = {
        "B_2 = -5Q/3": sp.simplify(B_c[2] + 5 * Q / 3) == 0,
        "B_3 = PQ(3Q-38)/6": sp.simplify(B_c[3] - P * Q * (3 * Q - 38) / 6) == 0,
        "J_2 equals the displayed polynomial": sp.expand(Js[2] - doc_J2) == 0,
        "J_3 equals the displayed polynomial": sp.expand(Js[3] - doc_J3) == 0,
        "M_3 = 16 + 10E/3": sp.expand(means[3] - (16 + sp.Rational(10, 3) * E)) == 0,
        "order-two and order-four means vanish": means[2] == 0 and means[4] == 0,
        "J_2(0,0) = 4": Js[2].subs({x: 0, y: 0}) == 4,
    }
    out["target"] = {k: bool(v) for k, v in target.items()}
    out["target_result"] = "PASS" if all(target.values()) else "FAIL"
    out["J"] = [str(j) for j in Js]
    out["means"] = {str(k): str(v) for k, v in means.items()}
out["seconds"] = round(time.time() - t0, 2)
print(json.dumps(out, indent=1))
raise SystemExit(0 if out.get("target_result") == "PASS" else 1)
