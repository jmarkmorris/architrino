# Known-first numerical diagnostic of the hand-derived closed form 2/(V b) for the
# held-receiver total of the straight-source rows. A diagnostic, not a proof.
import json
import mpmath as mp
mp.mp.dps = 30
controls = {
    "integral of 1/(1+x^2) on [0,inf) equals pi/2": bool(abs(mp.quad(lambda x: 1 / (1 + x * x), [0, mp.inf]) - mp.pi / 2) < mp.mpf(10) ** -20),
    "integral of sinh(s)/cosh(s)^2 on [0,inf) equals 1": bool(abs(mp.quad(lambda s: mp.sinh(s) / mp.cosh(s) ** 2, [0, 5, 40]) - 1) < mp.mpf(10) ** -15),
}
assert all(controls.values())
rows = []
for V, b in [("1.5", "0.1"), ("3", "0.02"), ("10", "0.3"), ("100", "0.019")]:
    V, b = mp.mpf(V), mp.mpf(b)
    g = mp.sqrt(V * V - 1)
    def f(s):
        xi = g * b * mp.cosh(s)           # substitution xi = gamma*b*cosh(s) removes the endpoint singularity
        root = g * b * mp.sinh(s)         # sqrt(xi^2 - gamma^2 b^2)
        ay = 2 * b * (V * V * xi * xi + root * root) / ((xi * xi + b * b) ** 2 * root)
        return ay * (g * b * mp.sinh(s)) / V   # dt = dxi / V
    val = mp.quad(f, [0, 1, 5, 20, 60])
    rows.append({"V": str(V), "b": str(b), "quadrature": mp.nstr(val, 20), "closed_form_2_over_Vb": mp.nstr(2 / (V * b), 20), "difference": mp.nstr(abs(val - 2 / (V * b)), 5)})
print(json.dumps({"known_controls": controls, "rows": rows}, indent=1))
