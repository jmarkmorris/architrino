"""Derives the O2 version 3 checker from the O2 version 1 checker by exact
replacement. The version 1 checker is not modified."""
import pathlib, sys
src = pathlib.Path(".tmp/eom-ordinary-integration-2026-10-14/o2-check/matched_pair_ordinary_o2_check.py")
dst = pathlib.Path(".tmp/eom-ordinary-integration-2026-10-14/o2-check/matched_pair_ordinary_o2_v3_check.py")
t = src.read_text()
def once(a, b):
    global t
    if t.count(a) != 1: sys.exit(f"expected one occurrence of: {a[:70]}")
    t = t.replace(a, b)
once('''"""Checker for gate O2 of the ordinary integration: typed v9 persistence of
the validated method.''',
'''"""Checker for gate O2, version 3, after review findings O2-R1 and O2-R2 and
the per-leg replay resource amendment. Every row of the version 1 checker
is kept. Added: a genuine record of another origin, charge, coupling, pair
policy or prehistory, with its own consistent claims, inside the caller's
resealed envelope, is refused at the expectation stage both when the caller
names its complete identity and under the default; ten short legs, each
ending at a clipped step, exceed the whole-span count floor(span/minimum)+1,
and the reported per-leg replay step bound equals an independent exact
recomputation from the record's leg ends and enforced limits and covers the
replayed steps; and the bound charges the admitted worker override. The
O2-R1 replay-seal probe is reviewed from its own output by the packet.

Version 1 description follows.

Checker for gate O2 of the ordinary integration: typed v9 persistence of
the validated method.''')
once('''    ok &= row("storage failure is reported, never durable",''',
'''    print("\\nVersion 3 additions")
    r2 = {k: v for k, v in notes.items() if k.startswith("N-R2-")}
    ok &= row("O2-R2: a genuine foreign record (origin, charge, coupling,"
              " pair policy, prehistory) in the caller's resealed envelope is"
              " refused before replay, also when its complete identity is"
              " named", len(r2) == 10 and all(
                  v["outcome"] == "refused:checkpoint_replay_refused"
                  and "expectation:" in v["detail"] for v in r2.values()),
              f"{len(r2)} requests")
    short = persist["P-short-resumed"]
    minimum = Q(short["minimum_step"])
    origin = Q(short["origin_time"])
    derived = sum(min(int(limit), int((Q(end) - origin) / minimum) + 1)
                  for end, limit in short["legs"])
    whole_span = int((Q(short["legs"][-1][0]) - origin) / minimum) + 1
    ok &= row("many short legs: the replayed steps exceed the whole-span count,"
              " and the reported per-leg bound equals an exact recomputation"
              " from the record's leg ends and limits and covers them",
              short["replayed_steps"] > whole_span
              and short["replay_step_bound"] == derived
              and short["replayed_steps"] <= derived
              and ordinary["P-short-resumed"]["accepted_end"] == "0.011"
              and ordinary["P-short-resumed"]["accepted_steps"] == 11,
              f"{short['replayed_steps']} replayed in {len(short['legs'])} legs;"
              f" whole-span count {whole_span}; per-leg bound {derived}")
    stacks = 2 * 3 * 8 * 1024 * 1024
    ok &= row("the replay bound charges the admitted worker override: one"
              " versus four workers differ by three 8 MiB stacks in the"
              " replayed and the new leg",
              abs(persist["P-from-two-workers"]["replay_bound_bytes"]
                  - persist["P-from-two"]["replay_bound_bytes"]) == stacks,
              f"{persist['P-from-two']['replay_bound_bytes']} and"
              f" {persist['P-from-two-workers']['replay_bound_bytes']}")
    ok &= row("storage failure is reported, never durable",''')
once('''"schema": "ordinary_integration_o2_check/v1"''', '''"schema": "ordinary_integration_o2_check/v3"''')
once('''(directory / "o2-check.json")''', '''(directory / "o2-v3-check.json")''')
dst.write_text(t)
print("written", dst)
# Version 3 resume rows also report the replay bound, which charges the
# runtime worker count's stacks by design; the worker-agreement row excludes
# it beside the reported worker count. The bound's worker term is checked by
# its own row.
t = dst.read_text()
a = '''        if r.get("persist") == "resume":
            r.pop("worker_count")
'''
b = '''        if r.get("persist") == "resume":
            r.pop("worker_count")
            r.pop("replay_bound_bytes")
'''
if t.count(a) != 1: sys.exit("worker row anchor missing")
dst.write_text(t.replace(a, b))
print("patched worker row")
# The working-set bound charges 8 MiB per helper thread, so every reported
# memory estimate, and a budget set from one, depends on the worker count by
# design; the worker-agreement row excludes exactly those fields, and the
# stack term is checked by its own row.
t = dst.read_text()
a = '''            r.pop("replay_bound_bytes")
'''
b = '''            r.pop("replay_bound_bytes")
        if r.get("ordinary"):
            r.pop("memory_estimate")
            r.pop("memory_budget")
'''
if t.count(a) != 1: sys.exit("memory anchor missing")
dst.write_text(t.replace(a, b))
print("patched memory fields")
# The tight-budget case sets its budget from its own worker-dependent
# estimate: its checkpoint size and the two refusals that quote its bound
# follow. Their codes and every other field are still compared.
t = dst.read_text()
a = '''        if r.get("ordinary"):
            r.pop("memory_estimate")
            r.pop("memory_budget")
'''
b = '''        if r.get("ordinary"):
            r.pop("memory_estimate")
            r.pop("memory_budget")
        if r.get("case") == "P-tight-v9":
            r.pop("bytes")
        if r.get("case") in ("N-resume-replay-bound-over-budget",
                             "N-resume-resource-before-false-record"):
            r.pop("detail")
'''
if t.count(a) != 1: sys.exit("tight anchor missing")
dst.write_text(t.replace(a, b))
print("patched tight fields")
