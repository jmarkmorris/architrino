"""Glue check for the certified branch: reads the covering receipts in order and verifies, from the
stored interval strings (re-parsed with outward rounding), that
  - consecutive pieces share their eps endpoint exactly and cover a single interval;
  - every piece has G_delta(Delta, E) > 0, K strictly inside Delta, S(Delta, E) > 0;
  - consecutive Delta intervals overlap (also across receipt boundaries);
and summarises the covered range, the delta and R ranges, and the pieces containing the three
certified points (R = 1000, 1, 0.4) and the PI's independent R = 1000 reference.
Usage: python branch_glue_check.py receiptA.json [receiptB.json ...] out_name.json
"""
import json, os, sys
from mpmath import iv

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ladder_interval_kernel as L

HERE = os.path.dirname(os.path.abspath(__file__))


def parse(pair):
    lo = iv.mpf(pair[0].strip("[]").split(",")[0])
    hi = iv.mpf(pair[1].strip("[]").split(",")[0])
    return iv.mpf([lo.a, hi.b])


names, out = sys.argv[1:-1], sys.argv[-1]
pieces, nfail, stops = [], 0, []
joins = []
for n in names:
    r = json.load(open(os.path.join(HERE, n)))
    new = r["pieces"]
    if pieces and new and float(new[0]["E"][0]) < float(pieces[-1]["E"][1]):
        # a later receipt starts inside the range already covered: keep earlier pieces only up to the
        # one whose speed interval contains the new start; that pair is glued by overlap (see note)
        s0 = float(new[0]["E"][0])
        while pieces and float(pieces[-1]["E"][0]) > s0:
            pieces.pop()
        if not pieces or float(pieces[-1]["E"][1]) < s0:
            raise SystemExit("receipt %s does not start inside the covered range" % n)
        new[0] = dict(new[0], overlap_join=True)
        joins.append({"receipt": n, "start": new[0]["E"][0], "joined_to_piece_E": pieces[-1]["E"]})
    elif pieces and new and float(new[0]["E"][0]) > float(pieces[-1]["E"][1]):
        raise SystemExit("gap before receipt %s" % n)
    pieces += new
    nfail += len(r["failures"])
    stops.append({"receipt": n, "covered_to": r["covered_to"], "complete": r["complete"], "stop": r["stop"],
                  "failures": len(r["failures"]), "runtime_s": r["runtime_s"]})
problems = []
prev = None
dmin = dmax = Rmin = Rmax = None
for i, p in enumerate(pieces):
    D = parse(p["Delta"])
    K = parse(p["K"])
    Gd = parse(p["Gdelta_box"])
    S = parse(p["S_box"])
    if not (Gd.a > 0):
        problems.append((i, "Gdelta not positive"))
    if not L.strictly_inside(K, D):
        problems.append((i, "K not inside Delta"))
    if not (S.a > 0):
        problems.append((i, "S not positive"))
    if prev is not None:
        if p.get("overlap_join"):
            if not (float(prev["E"][0]) <= float(p["E"][0]) <= float(prev["E"][1])):
                problems.append((i, "overlap join: start not inside previous speed interval"))
        elif p["E"][0] != prev["E"][1]:
            problems.append((i, "eps endpoints not shared: %s vs %s" % (prev["E"][1], p["E"][0])))
        if L.intersect(parse(prev["Delta"]), D) is None:
            problems.append((i, "Delta does not overlap previous"))
    de = parse(p["delta_enclosure"])
    R = parse(p["R_enclosure"])
    dmin = de.a if dmin is None or de.a < dmin else dmin
    dmax = de.b if dmax is None or de.b > dmax else dmax
    Rmin = R.a if Rmin is None or R.a < Rmin else Rmin
    Rmax = R.b if Rmax is None or R.b > Rmax else Rmax
    prev = p

checks = {}
pts = {"R1000_reference_PI": ("0.01384081428068128", "3.34503529272328827"),
       "R1000_certified_mid": ("0.0138408142807", "3.3450352927"),
       "R1_certified_mid": ("0.48439851424", "2.9732833057"),
       "R0p4_certified_mid": ("0.87221319366", "2.2144561427")}
for name, (e, d) in pts.items():
    ev, dv = iv.mpf(e), iv.mpf(d)
    hit = None
    for i, p in enumerate(pieces):
        if float(p["E"][0]) <= float(e) <= float(p["E"][1]):
            hit = (i, bool(L.intersect(parse(p["delta_enclosure"]), dv) is not None), p["E"], p["delta_enclosure"])
            break
    checks[name] = hit
res = {"receipts": stops, "joins": joins, "pieces": len(pieces), "failed_attempts_total": nfail,
       "eps_covered": [pieces[0]["E"][0], pieces[-1]["E"][1]] if pieces else None,
       "problems": problems, "glued": len(problems) == 0 and len(pieces) > 0,
       "delta_range": [str(dmin), str(dmax)], "R_range": [str(Rmin), str(Rmax)], "point_checks": checks,
       "max_piece_width": max(p["width"] for p in pieces) if pieces else None,
       "min_piece_width": min(p["width"] for p in pieces) if pieces else None}
json.dump(res, open(os.path.join(HERE, out), "w"), indent=1, default=str)
print(json.dumps({k: res[k] for k in ["pieces", "failed_attempts_total", "eps_covered", "glued", "delta_range", "R_range"]}, indent=1))
print("problems", problems[:10])
print(json.dumps(checks, indent=1))
print(json.dumps(stops, indent=1))
