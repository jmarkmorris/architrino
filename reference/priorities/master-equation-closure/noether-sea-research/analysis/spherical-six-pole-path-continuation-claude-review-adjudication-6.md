# Six-pole path continuation, review: adjudication 6 (the cm47 controls record K1 and the harness fix cm471)

Written 2026-10-20 by the review role. Code and record reading only; no Python run. Follows [adjudication 4](spherical-six-pole-path-continuation-claude-review-adjudication-4.md) (`5201ad62…`).

**Subjects.**

| file | sha256 |
|---|---|
| [cm47 K1 controls record](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm47-controls.json) | `634d6f3dd07cd78c3f2d9b89ce2fef7e6e5427bceecf93e3012267122360df4b` |
| [cm471](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471.py) | `05abecc028a2cf4f3875ab7adc4c4df9f12339d2401abdb0a1aff0125e7d3e5c` |
| cm47 (kept as run) | `a85c2648…` |

I diffed cm47 against cm471 in full.

## 1. K1 (measured)

The record has 68 controls, of which 67 pass and one, B6, fails. `controls_all_pass` is false.

B6 fails only in its last clause: the step-492 end evaluation raised `KeyError('steps')`. The bracket parts of B6 pass:

- **The frozen like bracket refuses.** $h$ at its lower end $0.941939530$ is $[-0.00515,+0.00101]$, which is not proved negative.
- **The fallback encloses the like root on rung 1.** The lower end is $a_1=0.791939530$ and the upper end $b=2.742240325$, which is chord $+0.90$ because $2.05-\mathrm{chord}_L<0.90$. The enclosure is $\tau_L\in[0.940580042,\,0.948832315]$, with margins 0.1486 and 1.7934, so it lies strictly inside the bracket.
- **Uniqueness is proved.** The bound is $\sup|w'|\le0.38964$ over the read range, a margin of 0.6104.
- **The delayed source is in the chart.** $q'\in[1.484803,1.490425]$ and $w'\in[0.320043,0.322110]$, both within $q'\le1.80$ and $w'\in[-0.10,0.45]$.
- **The other classes are unchanged.** Unlike and antipode are identical to the frozen roots.

**Consequence (derived).** cm47 must not be used for targets. Its B1–B4, B7 and B8 run in EVERY mode at module level. They assign a module-global `b3` that shadows the frozen steps6 global of the same name, which the frozen end evaluation reads. A recon run of cm47 would therefore carry the same corruption into every end evaluation. In the observed case it raised an error rather than giving a value, but that is not guaranteed in general.

## 2. cm471 (derived from the diff)

**What changed.**
- B1–B4, B7 and B8 are moved verbatim into the function `_controls_known_47()`, and B5–B6 into `_controls_records_47()`, which declares `global RECORDS` exactly where the module code assigned it.
- The version label is now "4.7.1".
- A header note is added.

PART1 differs from cm47 only in the version string inside the `out["v46"]` dictionary. The bracket rule itself (`_upper47`, `_ladder46`, `tau_point46` and the rebinding) is byte-identical. The continuation reports the PART1 hash without the version line as `65e0edd0…` in both files; that agrees with my diff reading.

**Module-level names left.** I listed every module-level assignment and definition that cm471 adds. Each carries a `46`/`47` suffix or is an intentional rebinding: `tau_point`, `corr_step` and `end_eval9`, the last two as recording wrappers that call the saved originals. No unsuffixed short name such as `b1`–`b8`, `rA`, `cx`, `Qn` or `a3` remains global. A collision of the same kind is therefore excluded, as far as this listing reaches. The continuation's [name-grep record](../evidence/spherical-six-pole-path-continuation-claude-continuation-cm471-name-grep.txt) (`d31d66365a854ffc4aa573805d97c66219d61faba280ab78f06071174cdb4660`) reports zero occurrences of every suffixed name in the eight-file executed chain. It also reports the expected hits for the intended names: `RECORDS`, `history` (rebound and restored only inside the control helper `_with_history46`), `tau_point`, `corr_step`, `end_eval9`, `os`, `sys` and `hashlib`. Diff cm47 → cm471: `58b92ca11efedb053a9d9790dbcc274e13dbcffcf1ee308b51fb94d3233793c1`.

**Ruling.** The design admission of adjudication 4 carries over to cm471 unchanged. Conditions:
- (a) a NEW controls record from cm471 with every inherited v4.4 control and B1–B8 passing, including B6's completed step-492 end evaluation;
- (b) targets only from cm471.

The cm47 K1 record is kept as a failed controls record. It is not evidence for targets, but its bracket readings at the 492 end (above) are consistent with the design.

**Process note.** A control harness that writes module globals inside an `exec`'d frozen namespace can corrupt the subject it controls. Future harness code should run inside functions.

**Falsifiers.** A cm471 controls record with any failure; a cm471 slice whose end evaluations differ from a cm471 controls-mode B6 evaluation at the same state.
