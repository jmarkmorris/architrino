"""Mutation controls on a real fixture record (Saturday quantitative round, task 2).

Takes a v5 record that the frozen checker passes, applies one defect at a time to a
copy, and requires the frozen checker to fail each mutated copy with the expected
message.  It shows the checker is sensitive on the actual record, not only on its
synthetic known case.  It does not test the fixture or the solver.
Known case first: the unmutated record must pass.
Usage: python record_mutation_controls.py record.json
"""
import copy, importlib.util, json, os, sys
from decimal import Decimal as Dc

here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("frc", os.path.join(here, "fixture_record_check.py"))
frc = importlib.util.module_from_spec(spec); spec.loader.exec_module(frc)
frc.known_cases()
rec = json.loads(open(sys.argv[1]).read(), parse_float=Dc)
assert frc.check(rec) == [], "known case: the unmutated record must pass"
print("known case passed: unmutated record accepted")

def cross(rows): return [r for r in rows if r["receiver"] != r["transmitter"]]
def m_reach(r): r["positive"]["prefix_accepted_end"] = "1.2349999999999994"
def m_selfpair(r): r["positive"]["recertification_pair_rows"] = cross(r["positive"]["recertification_pair_rows"])
def m_root(r):
    row = cross(r["positive"]["recertification_pair_rows"])[0]; root = row["roots"][0]
    shifted = str(Dc(root["lower"]) + Dc("0.001")); root["lower"] = root["upper"] = shifted
    for h in r["positive"]["transmitter_hulls_over_root_brackets"]:
        if (h["receiver"], h["transmitter"]) == (row["receiver"], row["transmitter"]): h["root_lower"] = h["root_upper"] = shifted
def m_acc(r):
    t = r["positive"]["acceleration"]["recertification_receiver_totals"][0]
    t["acceleration"][0] = [t["acceleration"][0][0] * Dc("1.01"), t["acceleration"][0][1] * Dc("1.01")]
def m_parity(r): cross(r["positive"]["direct_pair_rows"])[0]["roots"][0]["precision_bits"] += 1
def m_joint(r): r["negative_control"]["joint_invariance"]["returned_digest"] = "fnv1a64:0000000000000000"
def m_vacuous(r): r["negative_control"]["ordinary_invariance"]["leaves_compared"] = 0
def m_tol(r): r["negative_control"]["request_controls"]["root_tolerance"] = "1e-5"
def m_other(r): r["negative_control"]["request_controls"]["position_tolerance"] = "2e-5"
def m_accepted(r): r["negative_control"]["status"] = "accepted"
def m_time(r): r["negative_control"]["accepted_time"] = r["negative_control"]["attempted_end"]
def m_route(r):
    for row in cross(r["negative_control"]["pair_rows"]): row["diagnostic"] = "search_cell_limit"
CASES = [(m_reach, "accepted end differs"), (m_selfpair, "exactly the four ordered pairs"), (m_root, "causal equation inconsistent"),
         (m_acc, "independently recomputed interval"), (m_parity, "direct and traversal rows differ"), (m_joint, "joint_invariance digests"),
         (m_vacuous, "ordinary_invariance vacuous"), (m_tol, "below the smaller receiver radius"), (m_other, "negative request differs"),
         (m_accepted, "was not rejected"), (m_time, "accepted time changed"), (m_route, "refused by another route")]
for mutate, expect in CASES:
    r = copy.deepcopy(rec); mutate(r); fails = frc.check(r)
    assert any(expect in m for m in fails), (mutate.__name__, expect, fails)
    print("detected", mutate.__name__, "->", [m for m in fails if expect in m][0])
print("ALL %d MUTATIONS DETECTED" % len(CASES))
