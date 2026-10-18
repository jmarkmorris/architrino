"""Derives the O1 version 2 checker from the version 1 checker by exact
replacement. The version 1 checker is not modified."""
import pathlib, sys
src = pathlib.Path(".tmp/eom-ordinary-integration-2026-10-14/o1-check/matched_pair_ordinary_o1_check.py")
dst = pathlib.Path(".tmp/eom-ordinary-integration-2026-10-14/o1-check/matched_pair_ordinary_o1_v2_check.py")
t = src.read_text()
def once(a, b):
    global t
    if t.count(a) != 1: sys.exit(f"expected one occurrence of: {a[:70]}")
    t = t.replace(a, b)
once('''"""Checker for gate O1 of the ordinary integration:''',
'''"""Checker for gate O1, version 2, after review finding O1-R1. Every row of
version 1 is kept except the four above-wake-speed rows, which version 1
wrote for behaviour O1-R1 rejects. Added: every unsupported origin (source
or receiver above wake speed, coincident paths, an increment budget that
admits no step) is refused unsupported_validated_domain, naming the
producer's code, normally, cancelled, under a one-byte memory budget and
under the diagnostic limit; a request with no finite working-set bound is
refused; the reviewer's unchanged admission probe, run on this build,
passes its two supported known cases before its six targets and every
target is an explicit domain refusal; and the working-set estimates are
recorded.

Version 1 description follows.

Checker for gate O1 of the ordinary integration:''')
start = t.index('''    fast = o["N-above-wake-speed"]''')
end = t.index('''    for name, halt in (
            ("N-evidence-for-another-population"''')
t = t[:start] + t[end:]
once('''    entries = [name for name in n if name.startswith("N-entry-")]''',
'''    origins = {name: r for name, r in n.items() if name.startswith("N-origin-")}
    expected_code = {"source-above-wake-speed": "VFS-H1-01",
                     "receiver-above-wake-speed": "VFS-H1-01",
                     "coincident-paths": "VFS-H2-01",
                     "budget-admits-no-step": "VFS-BUDGET-0"}
    origin_ok = len(origins) == 16
    for name, r in origins.items():
        kind = next(k for k in expected_code if name.startswith("N-origin-" + k))
        origin_ok &= (r["outcome"] == "refused:unsupported_validated_domain"
                      and expected_code[kind] in r["detail"])
    ok &= row("O1-R1: every unsupported origin is refused by the producer's own"
              " hypothesis, normally, cancelled, at one byte and under the"
              " diagnostic limit", origin_ok,
              f"{len(origins)} requests: {sorted(set(expected_code.values()))}")
    nb = n["N-no-finite-resource-bound"]
    ok &= row("a request with no finite working-set bound is refused",
              nb["outcome"] == "refused:validated_resource_bound_unavailable",
              nb["detail"][:80])
    entries = [name for name in n if name.startswith("N-entry-")]'''),
once('''    ok &= row("one and four workers produce byte-identical output", w1 == w4,
              f"{len(w1)} bytes")''',
'''    ok &= row("one and four workers produce byte-identical output", w1 == w4,
              f"{len(w1)} bytes")
    probe = (directory / "reviewer-o1-admission-probe.stdout").read_text(
        encoding="utf-8").splitlines()
    ok &= row("the reviewer's unchanged admission probe: two supported known"
              " cases pass first, then all six targets are explicit domain"
              " refusals",
              len(probe) == 8
              and probe[0] == "KNOWN static exact origin completed one step PASS"
              and probe[1] == "KNOWN supported cancellation issued its"
              " admitted origin PASS"
              and all(line.startswith("TARGET ")
                      and "exception=unsupported_validated_domain" in line
                      for line in probe[2:]),
              f"{len(probe)} lines")
    o = ordinary_rows(rows)
    for name in ("O-K2-three-path", "O-three-path-grouped",
                 "O-adaptive-uninterrupted"):
        ROWS.append({"kind": "recorded", "check": f"working-set estimate {name}",
                     "detail": str(o[name]["memory_estimate"])})
        print(f"RECORDED  working-set estimate {name}:"
              f" {o[name]['memory_estimate']} bytes")'''),
once('''"schema": "ordinary_integration_o1_check/v1"''', '''"schema": "ordinary_integration_o1_check/v2"'''),
once('''(directory / "o1-check.json")''', '''(directory / "o1-v2-check.json")'''),
dst.write_text(t)
print("written", dst)
