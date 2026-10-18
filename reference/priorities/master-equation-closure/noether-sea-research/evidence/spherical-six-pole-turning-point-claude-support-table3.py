# Support role reporting helper (not an instrument): markdown account rows from this role's slice7 record (and optionally the d2l record) with OUTWARD-rounded
# decimals by exact decimal arithmetic (lower endpoints toward minus infinity, upper toward plus infinity). usage: <this> <slice7.json> <steps,...> [d2l.json]
import os, sys, json
from decimal import Decimal, ROUND_FLOOR, ROUND_CEILING
print("PID", os.getpid(), flush=True)
def o(p, n=6, scale=1):
    q = Decimal(1).scaleb(-n); return "[%s, %s]" % ((Decimal(p[0])*scale).quantize(q, rounding=ROUND_FLOOR), (Decimal(p[1])*scale).quantize(q, rounding=ROUND_CEILING))
d = json.load(open(sys.argv[1])); want = [int(x) for x in sys.argv[2].split(",")]; rows = {r["step"]: r for tg in d["targets"] for r in tg["rows"] if "qddot_range" in r}
d2 = {r["step"]: r for r in json.load(open(sys.argv[3]))["target"] if "d2l_over_step" in r} if len(sys.argv) > 3 else {}
want = [k for k in want if k in rows]
print("TABLE A")
print("| step end | $t$ at the end (dimensionless) | $q$ at the end (rad) | $w$ at the end (units of $c_f$) | $a$ at the end (dimensionless) | $da/dt$ over the step | $l$ at the end | $dl/dt$ at the end | $dl/dt$ over the step | $l''$ over the step (jet enclosure) |"); print("|---|---|---|---|---|---|---|---|---|---|")
for k in want:
    r = rows[k]; print("| %d | %s | %s | %s | %s %s | %s | %s | %s %s | %s | %s |" % (k, o(r["t_end"], 4), o(r["q_end"], 5), o(r["qdot_end"], 5), o(r["qddot_end"]), r["qddot_end_sign"][:3], o(r["dqddot_dt_range"], 5), o(r["lambda_hat_end"]), o(r["dlambda_end"]), r["dlambda_end_sign"][:3], o(r["dlambda_dt_range"]), o(d2[k]["d2l_over_step"]) if k in d2 else "-"))
print("TABLE B")
print("| step end | unlike tangent (x2), end | like tangent (x2), end | antipode tangent (x1), end | unlike radial (x2), end | like radial (x2), end | antipode radial (x1), end | $a_r$ at the end | $-w^2$ at the end |"); print("|---|---|---|---|---|---|---|---|---|")
for k in want:
    r = rows[k]; c = r["cls"]; v = r["qdot_end"]; v2 = [str(-max(Decimal(v[0])**2, Decimal(v[1])**2)), str(-min(Decimal(v[0])**2, Decimal(v[1])**2) if Decimal(v[0]) > 0 or Decimal(v[1]) < 0 else 0)]
    print("| %d | %s | %s | %s | %s | %s | %s | %s | %s |" % (k, o(c["unlike"]["tan_end"]), o(c["like"]["tan_end"]), o(c["antipode"]["tan_end"]), o(c["unlike"]["rad_end"]), o(c["like"]["rad_end"]), o(c["antipode"]["rad_end"]), o(r["a_rad_end"]), o(v2)))
print("TABLE C (physical)")
print("| step end | $T$ | tangent acceleration $a/10$ | $n \\cdot A = a_r/10$ | support $\\lambda = l/10$ | $d\\lambda/dT = l'/100$ at the end |"); print("|---|---|---|---|---|---|")
for k in want:
    r = rows[k]; print("| %d | %s | %s | %s | %s | %s |" % (k, o(r["t_end"], 3, 10), o(r["qddot_end"], 7, Decimal("0.1")), o(r["a_rad_end"], 7, Decimal("0.1")), o(r["lambda_hat_end"], 7, Decimal("0.1")), o(r["dlambda_end"], 8, Decimal("0.01"))))
print("TABLE D")
print("| step | class | source-time range over the step | records touched | history age over the step | $D_c$ at the end | side of one | $M$ sign over the step | $N$ sign at the end |"); print("|---|---|---|---|---|---|---|---|---|")
for k in want:
    for n in ("unlike", "like", "antipode"):
        e = rows[k]["cls"][n]; print("| %d | %s | %s | %s | %s | %s | %s | %s | %s |" % (k, n, o(e["delayed_arg"], 5), ", ".join(e["touched"]), o(e["age_range"], 4), o(e["D_end"], 5), e["D_end_side"], e["M_sign"], e["N_end_sign"]))
print("RATES class tangent rates on listed steps:", {k: {n: o(rows[k]["cls"][n]["dtan_dt"], 5) for n in ("unlike", "like", "antipode")} for k in want})
print("RESID unlike vs 4.0067 at listed ends:", {k: (o(rows[k]["residuals"]["unlike@s214_end_4.0067"]["rho"]), rows[k]["residuals"]["unlike@s214_end_4.0067"]["sign"]) for k in want})
print("MARGINS", {n: min(Decimal(r["cls"][n]["margin_to_guaranteed_coverage"]) for r in rows.values()) for n in ("unlike", "like", "antipode")})
