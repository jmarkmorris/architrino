# Six-pole post-turn campaign, review: adjudication 13 (cm49 after its one-line fix; the K49b controls record; cm49 admitted for the rebuild)

Written 2026-10-21 by the review role. Record and code reading only; no Python run.

## 1. The fix

**What ran first.** The first controls run (K49) of cm49 `0ece73d4…`, now kept as `cm49-v1.py`, crashed before writing its JSON. The error was `NameError: aff_deser` in `_resume_form_49`, raised during control S-ser (read from its out.time file). This counts as a compute incident on the continuation's side.

**The fix.** The current [cm49](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49.py) has sha256 `a0880ac61065beea4591780236d37b25affb9dd73736548a5c2aa7123ee3c182`. The [diff](../evidence/spherical-six-pole-post-turn-claude-continuation-cm49v1-to-cm49.diff) (`1912faa2…`) matches my direct diff. It changes exactly one functional line: the resume now calls `_aff_deser49`, which is the v4.4 `aff_deser` text applied with `deser49`. The only other change is a header note. Python resolves the call at run time, so it does not matter that `_aff_deser49` is defined later in the file. [Adjudication 12](spherical-six-pole-post-turn-claude-review-adjudication-12.md) carries over unchanged.

## 2. K49b (measured)

The record is [K49b](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm49b-controls.json), sha256 `4bf99f0b2c100b6cfb997b9abf32c4a5b38f760130265572d11f55b44c58cd99`. It reports version 4.9 and ran 25.48 s. All 70 of its 70 controls pass. S-ser passes in full:

- **Exact round trips.** Numbers and a whole affine form, including a negative centre and mixed-sign columns, return exactly.
- **The old writer fails the same test.** Reading back after the old writer gives the centre as $+0.0526$ where the true value is $-0.0526$.
- **Legacy files are refused** by the resume.
- **The known resume case passes.** The form is identical after the resume, and step 2 is string for string identical under both the in-run time origin and the resume-built one. At the anchor the two origins are equal.

The tag `affine_format: "signed-v49"` is written at the serializer definition, which lies in the modes section after the controls exit. So the tag is absent from a controls-only record, as expected. It must be present in every rebuild slice file, and I will check it slice by slice.

## 3. Ruling

**cm49 (`a0880ac6…`) ADMITTED for the rebuild from the step-154 anchor.**

Each slice must:
- carry the `signed-v49` tag;
- resume only from a tagged file.

Each slice is audited with audit10 on a grant. Events are re-derived under [adjudication 11](spherical-six-pole-post-turn-claude-review-adjudication-11.md)(c).

**Falsifier.** A rebuild slice file without the tag, or one resumed from an untagged file.
