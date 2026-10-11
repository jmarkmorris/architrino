"""Exact check of the hypotheses of the first-exit argument for the frozen six-path row.
Reads the decimal tokens of the six anchors from request-h.json as exact rationals and tests, in exact
arithmetic, that every squared pair distance lies strictly between 0.28^2 and 1.  Then evaluates the three
constants of the argument (R = 0.001, H = 0.01, kappa = 0.05) as exact rationals.
Known case first: the squared distance of (0,0,0) and (3,4,0) must be exactly 25."""
import json, sys
from fractions import Fraction as F
def d2(a, b):
    return sum((x - y) ** 2 for x, y in zip(a, b))
if d2([F(0)] * 3, [F(3), F(4), F(0)]) != 25:
    print("KNOWN CASE FAILED"); sys.exit(1)
print("known case: squared distance of (0,0,0) and (3,4,0) is exactly 25")
req = json.load(open("request-h.json"))["request"]
A = []
for h in req["histories"]:
    seg = h["segments"]
    assert len(seg) == 1 and seg[0]["startTime"] == "-1.05" and seg[0]["endTime"] == "0"
    assert all(c[1] == "0" and c[2] == "0" and c[3] == "0" for c in seg[0]["coefficients"])
    assert seg[0]["positionErrors"] == ["0", "0", "0"] and seg[0]["velocityErrors"] == ["0", "0", "0"]
    A.append((h["pathId"], int(h["charge"]), [F(c[0]) for c in seg[0]["coefficients"]]))
assert req["modelControls"]["fieldSpeed"] == "1" and req["modelControls"]["coupling"] == "0.05"
lo, hi = F(28, 100) ** 2, F(1)
vals = []
for i in range(6):
    for j in range(i):
        v = d2(A[i][2], A[j][2]); vals.append(v)
        assert lo < v < hi, (A[i][0], A[j][0], float(v))
print("six paths, charges", [a[1] for a in A], "; past exactly at rest on [-1.05, 0] with zero error radii; field speed 1; coupling 0.05")
print("15 squared pair distances, exact: all strictly between 0.28^2 and 1:", True, "; smallest and largest distance (float display only):", float(min(vals)) ** 0.5, float(max(vals)) ** 0.5)
R, H, kappa = F(1, 1000), F(1, 100), F(5, 100)
acc = 5 * kappa / (F(28, 100) - R) ** 2
print("acceleration bound 5 kappa/(0.28-R)^2 =", float(acc), "< 3.22:", acc < F(322, 100))
print("speed bound 3.22 H =", float(F(322, 100) * H), "; displacement bound 3.22 H^2/2 =", float(F(322, 100) * H * H / 2), "< R:", F(322, 100) * H * H / 2 < R)
print("separation margin 0.28 - 2R =", float(F(28, 100) - 2 * R), "> H:", F(28, 100) - 2 * R > H, "; earliest emission later than -(1+R) =", float(-(1 + R)), "> -1.05:", -(1 + R) > F(-105, 100))
