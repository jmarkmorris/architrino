# Appendix A1 (support role): extrapolate the first zero of lambda_hat from the frozen wave-17 step enclosures (support-geometry-iv.json).
# Not a certification: linear and quadratic fits of the midpoints and of the lower/upper bounds over the last 20 and 40 steps; brackets of the zero.
import os, sys, json; print("PID", os.getpid())
import numpy as np
d = json.load(open(sys.argv[1])); st = [r for r in d["steps"] if r["src"] == "wave17"]
t = np.array([(float(r["t_int"][0]) + float(r["t_int"][1]))/2 for r in st]); lo = np.array([float(r["lambda_hat"][0]) for r in st]); hi = np.array([float(r["lambda_hat"][1]) for r in st]); mid = (lo + hi)/2
out = {}
for n in (20, 40):
    for deg in (1, 2):
        for name, y in (("lo", lo), ("mid", mid), ("hi", hi)):
            c = np.polyfit(t[-n:], y[-n:], deg); roots = [x.real for x in np.roots(c) if abs(x.imag) < 1e-12 and x.real > t[-1]]
            out[f"last{n}_deg{deg}_{name}"] = {"zero_t": min(roots) if roots else None, "slope_at_end": float(np.polyval(np.polyder(c), t[-1]))}
print(json.dumps(out, indent=1)); json.dump(out, open(sys.argv[2], "w"), indent=1)
