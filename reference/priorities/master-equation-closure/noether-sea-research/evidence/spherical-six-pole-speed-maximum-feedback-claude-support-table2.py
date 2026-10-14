# Support role reporting helper (not an instrument): markdown rows from the end-instant record with OUTWARD-rounded decimals (exact decimal arithmetic).
import os, sys, json
from decimal import Decimal, ROUND_FLOOR, ROUND_CEILING
print("PID", os.getpid(), flush=True)
def o(p, n=7):
    q = Decimal(1).scaleb(-n); return "[%s, %s]" % (Decimal(p[0]).quantize(q, rounding=ROUND_FLOOR), Decimal(p[1]).quantize(q, rounding=ROUND_CEILING))
d = json.load(open(sys.argv[1])); rows = {r["step"]: r for r in d["target"] if "qddot_end" in r}
print("| step end | own end-instant $\\ddot q$ | sign | own width | subject's stored end value | subject width | subject inside own | largest endpoint difference |"); print("|---|---|---|---|---|---|---|---|")
for k in (224, 225, 234, 236, 237, 238, 239, 240, 241, 242, 243, 254, 256, 257, 269, 270, 274):
    r = rows[k]; print("| %d | %s | %s | %s | %s | %s | %s | %s |" % (k, o(r["qddot_end"]), r["sign"], r["width"], o(r["subject_tangent_sum_end"]), r["subject_width"], "yes" if r["subject_inside_mine"] else "no", r["max_endpoint_diff_vs_subject"]))
print("CLASS")
print("| step end | unlike tangent (x2) | like tangent (x2) | antipode tangent (x1) | unlike source time at the end | unlike source time minus $L$ | unlike $\\rho^L$ | records touched (unlike) |"); print("|---|---|---|---|---|---|---|---|")
for k in (224, 225, 238, 239, 240, 241, 256, 257, 269, 270):
    r = rows[k]; c = r["cls"]; print("| %d | %s %s | %s %s | %s | %s | %s %s | %s %s | %s |" % (k, o(c["unlike"]["tan_end"]), c["unlike"]["tan_sign"], o(c["like"]["tan_end"]), c["like"]["tan_sign"], o(c["antipode"]["tan_end"]), o(c["unlike"]["source_time_end"]), o(c["unlike"]["source_minus_L"]), c["unlike"]["source_vs_L"], o(c["unlike"]["rho_L_end"]), c["unlike"]["rho_L_sign"], ", ".join(c["unlike"]["touched"])))
print("LIKE2.8067 like source time at ends 269, 270:", o(rows[269]["cls"]["like"]["source_time_end"]), o(rows[270]["cls"]["like"]["source_time_end"]), "touched", rows[269]["cls"]["like"]["touched"], rows[270]["cls"]["like"]["touched"])
print("WIDTHS source", {k: (rows[k]["cls"]["unlike"]["source_width"], rows[k]["cls"]["unlike"]["q_width"], rows[k]["cls"]["unlike"]["iterations"]) for k in (239, 257)})
print("lambda/a_rad at 239:", o(rows[239]["a_rad_end"]), o(rows[239]["lambda_hat_end"]))
