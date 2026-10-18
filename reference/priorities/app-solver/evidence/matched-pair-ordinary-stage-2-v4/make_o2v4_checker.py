"""Derives the O2 version 4 checker from the version 3 checker by exact
replacement. Neither earlier checker is modified."""
import pathlib, sys
src = pathlib.Path(".tmp/eom-ordinary-integration-2026-10-14/o2-check/matched_pair_ordinary_o2_v3_check.py")
dst = pathlib.Path(".tmp/eom-ordinary-integration-2026-10-14/o2-check/matched_pair_ordinary_o2_v4_check.py")
t = src.read_text()
def once(a, b):
    global t
    if t.count(a) != 1: sys.exit(f"expected one occurrence of: {a[:70]}")
    t = t.replace(a, b)
once('''"""Checker for gate O2, version 3,''',
'''"""Checker for gate O2, version 4, after review finding O2-R3. Every row of
the version 3 checker is kept. Added: a genuine certificate of another
origin, charge, coupling, pair policy or prehistory cannot be checkpointed
under the caller's original request; a genuine certificate whose public
histories or count were changed cannot be checkpointed; and creation after
a worker-changed resume still works, with the original preparation.

Version 3 description follows.

Checker for gate O2, version 3,''')
once('''    ok &= row("storage failure is reported, never durable",''',
'''    print("\\nVersion 4 additions")
    r3 = {k: v for k, v in notes.items() if k.startswith("N-R3-")}
    expected_r3 = {
        "N-R3-changed-origin-certificate": "checkpoint_origin_mismatch",
        "N-R3-changed-charge-certificate": "checkpoint_origin_mismatch",
        "N-R3-changed-scalar-certificate": "checkpoint_origin_mismatch",
        "N-R3-changed-policy-certificate": "checkpoint_origin_mismatch",
        "N-R3-changed-ancestry-certificate": "checkpoint_origin_mismatch",
        "N-R3-changed-public-histories": "checkpoint_claim_mismatch",
        "N-R3-changed-public-count": "checkpoint_controller_mismatch"}
    ok &= row("O2-R3: creation binds the original request's controls and exact"
              " origin to the generating record, and the persisted claims to"
              " the sealed boundary", set(r3) == set(expected_r3) and all(
                  r3[k]["outcome"] == "refused:" + v for k, v in expected_r3.items()),
              f"{len(r3)} creation requests")
    after = persist["P-after-worker-resume-v9"]
    ok &= row("creation after a worker-changed resume works and keeps the"
              " original preparation's run",
              after["accepted_count"] == 8 and after["rejected_count"] == 0
              and after["resealed_equals_written"], "")
    ok &= row("storage failure is reported, never durable",''')
once('''"schema": "ordinary_integration_o2_check/v3"''', '''"schema": "ordinary_integration_o2_check/v4"''')
once('''(directory / "o2-v3-check.json")''', '''(directory / "o2-v4-check.json")''')
dst.write_text(t)
print("written", dst)
