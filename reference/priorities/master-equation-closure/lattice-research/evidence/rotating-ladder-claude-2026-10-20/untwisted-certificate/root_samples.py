"""Sample certified causal-root enclosures over the certificate's uniqueness box (for the note's table)."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ladder_interval_kernel as L

HERE = os.path.dirname(os.path.abspath(__file__))
rec = json.load(open(os.path.join(HERE, "certificate_receipt.json")))
X = [L.I(rec["uniqueness_box"]["delta"][0].strip("[]").split(",")[0]), None]
dlo, dhi = [L.I(v.strip("[]").split(",")[0]) for v in rec["uniqueness_box"]["delta"]]
elo, ehi = [L.I(v.strip("[]").split(",")[0]) for v in rec["uniqueness_box"]["eps"]]
D = L.hull(dlo, dhi)
E = L.hull(elo, ehi)
out = []
for nu in (1, -1):
    for k in (0, 1, 10, 100, 1000, 10000):
        if nu == 1 and k == 0:
            continue
        T, r = L.root_enclosure(nu, k * D, E)  # start from the Lemma 1 bracket (no float seed)
        wT = T - nu * E * L.iv.sin(E * T)
        Dnu = wT / T
        out.append({"nu": nu, "k": k, "tau": [str(T.a), str(T.b)], "width": L.width(T),
                    "newton_iterations": r[0], "certified": r[1], "start": r[2],
                    "D_nu": [str(Dnu.a), str(Dnu.b)], "theta": [str((E * T).a), str((E * T).b)]})
json.dump({"box": rec["uniqueness_box"], "samples": out}, open(os.path.join(HERE, "root_samples_receipt.json"), "w"), indent=1)
for o in out:
    print(o["nu"], o["k"], o["tau"], o["width"], o["newton_iterations"], o["start"], o["D_nu"])
