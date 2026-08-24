# Borg Receiver-Factor Contract Migration Validation — 2026-07-19

## Disposition

- Scope: Borg live request binding and certified-budget identity after the receiver-factor correction
- Result: `scoped-migration-passed`
- Claim grade: `measured-current-tree`
- Mathematical authority: unchanged `master_eom_binding/v1`
- Global Master Equation closure: not claimed

This validation closes the Borg-specific migration gap. It does not add a term to the acceleration, alter the transmitter-side factor, or weaken any singular-event route for a Verification incomplete outcome.

## Live Request Identity

| Contract field | Accepted value |
| --- | --- |
| request schema | `eom_borg_shadow_request/v1` |
| evolution contract | `eom_evolution_contract/v1` |
| contract amendments | none |
| model binding | `master_eom_binding/v1` |
| Master Equation source snapshot SHA-256 | `4c3824e0e2f1741d9ba4e493478db9dbe2515731efd4f2923e0e1ee24da2a649` |

`BorgEomShadowRunner.js` emits this identity. The process bridge rejects a request before native encoding if its schema, evolution contract, amendment list, or model binding differs.

## Current Certified-Budget Identities

| Preset | Canonical allocation SHA-256 |
| --- | --- |
| `interactive-certified-v1` | `bb4b8b72e01b2d038e2b760a3677a67e92e35d12c5d587f0a98d2079bce8d319` |
| `research-certified-v1` | `74919ee63dc27d0aa7c43453e1762f380da886a63377912905f8f8070d3b9b3d` |

The process bridge independently canonicalizes the supplied allocation object, recomputes its SHA-256, and requires both the canonical JSON and hash to match the request. A deliberately corrupted hash is rejected. The live numerical allocations are unchanged from their ratified values; the hashes changed when the serialized key `sourceNormalFloor` was migrated to the canonical `transmitterFactorFloor` name.

The older V7 hashes remain attached to the historical measurements that used them. They are not accepted as current live identities.

## Validation

Commands executed from the repository root:

```text
node --test tests/borg-*.test.js
VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_borg_native_process.py
node scripts/check-transmitter-factor-clean-slate.mjs
```

Measured result:

- complete Borg JavaScript suite: `89/89` passed;
- native Borg process suite: `13/13` passed;
- combined Borg migration validation: `102/102` passed;
- transmitter-factor clean-slate check: passed.

The JavaScript suite includes positive checks for the live request identity, both current allocation hashes, the binding's canonical-source snapshot, and the agreement between the runtime identities and their priority records. It also includes negative checks that reject the v0 model binding and a corrupted allocation hash. The native process suite checks the encoded request and response boundary independently of browser rendering.

Falsifier: any live Borg request carries another schema, amendment list, model binding, or allocation hash; either current allocation canonicalizes to another hash; a stale binding or corrupt hash reaches native execution; or any stated validation command fails on the recorded tree.
