# Support role reporting helper (not an instrument): prints markdown table rows from this role's slice5 output JSON with OUTWARD-rounded short decimals
# (lower endpoints rounded toward minus infinity, upper endpoints toward plus infinity, by exact decimal arithmetic on the stored strings).
# usage: <this> <slice5 out.json> <step,step,...>
import os, sys, json
from decimal import Decimal, ROUND_FLOOR, ROUND_CEILING
print("PID", os.getpid(), flush=True)
def o(p, n=6, scale=1):
    q = Decimal(1).scaleb(-n); a = (Decimal(p[0])*scale).quantize(q, rounding=ROUND_FLOOR); b = (Decimal(p[1])*scale).quantize(q, rounding=ROUND_CEILING); return "[%s, %s]" % (a, b)
d = json.load(open(sys.argv[1])); want = [int(x) for x in sys.argv[2].split(",")]; rows = {r["step"]: r for tg in d["targets"] for r in tg["rows"] if "qddot_range" in r}
print("TABLE A (dimensionless; step-end values unless marked step-range)")
print("| step end | $t$ (upper endpoint, outward) | $q$ | $\\dot q$ | $\\ddot q$ end | unlike tangent (x2) | like tangent (x2) | antipode tangent (x1) | $d\\ddot q/dt$ on the step |"); print("|---|---|---|---|---|---|---|---|---|")
for k in want:
    r = rows[k]; c = r["cls"]; print("| %d | %s | %s | %s | %s %s | %s | %s | %s | %s |" % (k, o(r["t_end"], 4), o(r["q_end"], 5), o(r["qdot_end"], 5), o(r["qddot_end"]), r["qddot_end_sign"][:3], o(c["unlike"]["tan_end"]), o(c["like"]["tan_end"]), o(c["antipode"]["tan_end"]), o(r["dqddot_dt_range"], 5)))
print("TABLE B (dimensionless radial account at the step end)")
print("| step end | unlike radial (x2) | like radial (x2) | antipode radial (x1) | $a_{rad}$ | $-\\dot q^2$ | $\\hat\\lambda$ | $d\\hat\\lambda/dt$ on the step |"); print("|---|---|---|---|---|---|---|---|")
for k in want:
    r = rows[k]; c = r["cls"]; v = r["qdot_end"]; v2 = [str(-Decimal(v[1])**2), str(-Decimal(v[0])**2)]
    print("| %d | %s | %s | %s | %s | %s | %s | %s |" % (k, o(c["unlike"]["rad_end"]), o(c["like"]["rad_end"]), o(c["antipode"]["rad_end"]), o(r["a_rad_end"]), o(v2), o(r["lambda_hat_end"]), o(r["dlambda_dt_range"], 5)))
print("TABLE C (physical units: acceleration = dimensionless/10, in units of $c_f^2$ per unit length with $R = 10$; $T = 10t$)")
print("| step end | $T$ | tangent acceleration | unlike tangent | like tangent | antipode tangent | $n\\cdot A$ | support $\\lambda$ |"); print("|---|---|---|---|---|---|---|---|")
for k in want:
    r = rows[k]; c = r["cls"]; s = Decimal("0.1"); print("| %d | %s | %s | %s | %s | %s | %s | %s |" % (k, o(r["t_end"], 3, 10), o(r["qddot_end"], 7, s), o(c["unlike"]["tan_end"], 7, s), o(c["like"]["tan_end"], 7, s), o(c["antipode"]["tan_end"], 7, s), o(r["a_rad_end"], 7, s), o(r["lambda_hat_end"], 7, s)))
print("TABLE D (sources over the step: source-time range, record family, history age, $D_c$ at the end, residual against $L$ at the end)")
print("| step | class | source-time range | records touched | history age $t - s$ | $D_c$ end | side | $\\rho^L$ at the end | sign |"); print("|---|---|---|---|---|---|---|---|---|")
for k in want:
    r = rows[k]
    for n in ("unlike", "like", "antipode"):
        e = r["cls"][n]; rr = r["residuals"][n + "@s154_end_3.4067"]; print("| %d | %s | %s | %s | %s | %s | %s | %s | %s |" % (k, n, o(e["delayed_arg"], 5), ", ".join(e["touched"]), o(e["age_range"], 4), o(e["D_end"], 5), e["D_end_side"], o(rr["rho"], 6), rr["sign"]))
print("TABLE E (unlike residual against L and against the other boundaries, every step end 250-260; like against 2.8067 at 266-272)")
for k in sorted(rows):
    r = rows[k]
    if 252 <= k <= 260: print("| %d | %s | %s %s | %s |" % (k, o(r["t_end"], 4), o(r["residuals"]["unlike@s154_end_3.4067"]["rho"], 7), r["residuals"]["unlike@s154_end_3.4067"]["sign"], r["cls"]["unlike"]["source_vs_L"]))
for k in sorted(rows):
    r = rows[k]
    if 266 <= k <= 272: print("| %d | like rho(2.8067) %s %s | like tan end %s %s | like dtan %s |" % (k, o(r["residuals"]["like@s94_end_2.8067"]["rho"], 7), r["residuals"]["like@s94_end_2.8067"]["sign"], o(r["cls"]["like"]["tan_end"], 7), r["cls"]["like"]["tan_end_sign"], o(r["cls"]["like"]["dtan_dt"], 5)))
print("MARGINS min margin to guaranteed coverage per class:", {n: str(min(Decimal(r["cls"][n]["margin_to_guaranteed_coverage"]) for r in rows.values())) for n in ("unlike", "like", "antipode")})
print("WIDTH check subject vs mine at ends 238-241:", [(k, rows[k]["qddot_end"]) for k in (238, 239, 240, 241)])
