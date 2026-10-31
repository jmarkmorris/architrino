# Six-pole path continuation, review: adjudication 8 (cm471 controls record K2; the step-492 end; which bracket endpoints adjudication 7 uses)

Written 2026-10-20 by the review role. Record reading only; no Python run.

## 1. K2 (measured)

The record is the [cm471 controls](../evidence/spherical-six-pole-path-continuation-claude-continuation-steps10-cm471-controls.json), sha256 `8583831a3ecf75d62102fc76a86efb46d3842c2a67cd5d99ac3bf2d7639f9410`. Its out file is `d8c2d1fc…` and its out.time `7572ec11…` (37.72 s wall, peak RSS 127,221,760 B).

**68 of 68 controls pass**, with `controls_all_pass` true. That covers every inherited v4.4 control and B1–B8, and B6 now includes the completed step-492 end evaluation. The bracket ledger shows 32 calls: 30 on the frozen path and 2 like-class fallbacks on rung 1, with no refusal.

The conditions of [adjudication 6](spherical-six-pole-path-continuation-claude-review-adjudication-6.md) are met. **cm471 (`05abecc0…`) is ADMITTED for targets.**

## 2. The step-492 end (from B6; reported by the subject's controls, not an admitted slice record)

| quantity | step-492 end, $t\in[6.786684593623649597167969,\,6.786684709182828044891357]$ |
|---|---|
| $w$ | $[0.1975116311,\,0.1997870322]$, positive |
| $a$ | $[-0.2165397,\,-0.2087222]$ |
| $l$ | $[-0.1083133,\,-0.1049739]$ |
| $r'$ | $[0.0668202,\,0.0760884]$ |
| $l'$ | $[+0.0063617,\,+0.0197035]$, positive |
| like root | $[0.940580,\,0.948832]$; fallback rung 1, lower end $0.79194$, $D_t\approx0.744$–$0.749$ |
| unlike root | $[1.647256,\,1.649978]$, frozen path; about $0.03$ below the frozen upper end, as predicted in adjudication 2 |
| antipode | frozen path |

Physical values: $T\approx67.867$; $a/10\approx-0.021$; $l'/100\in[+6.4\times10^{-5},+1.97\times10^{-4}]$.

$l'$ is still positive at 492. Its opposing term $-2wa\approx+0.084$ is shrinking with $w$, while $r'\approx0.07$ is growing. By reference 3.6, if $r'>0$ persists, $l'$ turns negative before $w$ reaches zero. That is a second support turn, a maximum of $l$ (inferred direction, to be measured).

## 3. Which endpoints adjudication 7 uses (the PI's question)

The certified bracket in [adjudication 7](spherical-six-pole-path-continuation-claude-review-adjudication-7.md) is stated with the READER-PADDED end times:

$$(5.986684593623649597167959,\ 6.176684709182828044891367).$$

These are the lower end of the padded 412 end time and the upper end of the padded 431 end time. This is the fully derived form: it needs no premise about how the `t_int` strings were written.

The recorded-string form $(5.986684593623649597167969,\,6.176684709182828044891357)$ comes from the `t_int` strings. Those are written by `s45` without a write pad; only the $q$ and $w$ end strings carry the $10^{-23}$ write pad. The recorded-string form is exact only under the frozen exact-decimal origin premise, and the two forms differ by $10^{-23}$ at each end.

**Ruling:** cite the padded form as certified, and the recorded-string form as equal to it to 22 significant digits.
