# `src/eom` Root-Completeness Wall — $D_s$ Transversality Diagnostic

**Date:** 2026-07-14
**Run by:** adjudicator, on the independent pure-Python oracle (no native import)
**Disposition:** `verdict_defect`; `caustic_hypothesis_excluded`;
`section_97_void_disposition_independently_confirmed`; `no_score_increase`;
`priority-only`.

## Verdict

The wall is a **defect**, not a genuine caustic. Two independent arguments
agree, and either alone is sufficient.

Instrument:
[section-97-ds-transversality-diagnostic.py](../../../../scripts/eom/section-97-ds-transversality-diagnostic.py)
(system `python3`; imports only `scripts/eom/oracle/*`, which import only
`decimal`/`mpmath`/`dataclasses`/siblings — no `ctypes`, no native, no
subprocess). Run: `python3 scripts/eom/section-97-ds-transversality-diagnostic.py`.
Object: the exact §97 finalist as recorded in the
horizon blocker packet,
$60$-digit interval arithmetic, circular Hermite prehistory over $[-8,0]$ at
segment width $0.02$.

## Argument 1 — $D_s$ cannot vanish at the failing row

$D_s = c_f - \hat r\cdot v_{\rm src}$, and $|\hat r\cdot v_{\rm src}|\le|v_{\rm src}|$
by Cauchy–Schwarz, so

$$
D_s \;\ge\; c_f - |v_{\rm src}|
$$

holds identically, for any geometry, at any root. This is an identity, not a
numerical observation.

The reported first loss of certification on the control is `I+<-I-` and
`I-<-I+` — the antipodal pair **within ring I, the slowest ring**:

| Ring | $|v|$ at $t=0$ | $\min D_s \ge c_f-|v|$ |
|---|---:|---:|
| I | $0.3823030545$ | $0.6176969455$ |
| M | $0.7811697030$ | $0.2188302970$ |
| O | $0.2522266692$ | $0.7477733308$ |

The oracle independently certifies the start: **all 36 ordered pairs
`certified_complete`, 30 root rows** (the 6 self-pairs correctly return zero
roots — every site is sub-$c_f$, so no self-hit exists), with

$$
\min_{\rm all\ roots} D_s = 0.6824085219 \quad\text{(on \texttt{I+<-M-})}.
$$

Measured per-worldline accelerations at $t=0$ give $\max|a| = 0.5779935577$.
For ring I to reach $c_f$ — the only way its $D_s$ can approach zero — it must
sustain

$$
|a| \;\ge\; \frac{c_f-|v_I(0)|}{t_{\rm wall}} = \frac{0.6176969455}{0.335}
= 1.843871,
$$

a factor $3.2$ above the measured acceleration. Propagating the measured bound,
$|v(t)|\le|v(0)|+\max|a|\cdot t$ gives $|v_I(0.335)|\le0.5759$ and therefore

$$
D_s\big|_{\texttt{I+<-I-}} \;\ge\; 0.424 \quad\text{over the entire evolved window.}
$$

The wall row is manifestly transversal. **Precision exhaustion at 1024 bits
where $D_s\ge0.42$ is not a precision problem and not a caustic.**

*Scope of this bound.* $\max|a|$ is measured at $t=0$ and propagated; a fully
rigorous statement needs an interval enclosure of $|a|$ over $[0,0.335]$. The
margin is not close: separations change by only $\sim12\%$ over the window
($|v|t\approx0.13$ against separations $\approx1.1$), so accelerations cannot
plausibly triple. Treat this as a strong argument, not a certificate — it is
decisive enough to direct the fix, and Argument 2 does not depend on it.

## Argument 2 — the wall moves under refinement

A physical caustic occurs at a **definite time**, invariant under
discretization. This wall does not:

| Config | Wall $t$ | Steps to wall | Prehistory segments |
|---|---:|---:|---:|
| step $0.01$, seg $0.02$, $h=8$ | $0.3300$ | $33.0$ | $400$ |
| step $0.01$, seg $0.02$, $h=10$ | $0.3300$ | $33.0$ | $400$ |
| step $0.01$, seg $0.01$, $h=8$ | $0.1275$ | $12.8$ | $800$ |
| step $0.005$, seg $0.02$, $h=8$ | $0.1200$ | $24.0$ | $400$ |

(Source: the horizon blocker packet's own ladder table.) Halving the step moves
the wall by $2.75\times$; halving the prehistory segment width moves it by
$2.59\times$; deepening memory $h$ from $8$ to $10$ does not move it at all.
The wall tracks **discretization**, not physical time. That is the signature of
a numerical artifact.

The ladder non-convergence Codex reported as a coverage failure is therefore the
diagnostic signal itself.

## Leading mechanism hypothesis — precision-independent interval width

The signature to explain is: clean certification on **factory** circular
history, failure only on **evolved** history, unmoved by $512\to1024$ MPFR bits,
moving with segment/step count.

Published cubic segments carry a reconstruction **error token** (the start-hull
radius) that inflates the position interval. An interval whose width is
dominated by a stored error radius **does not narrow when arithmetic precision
rises** — which is exactly the observed precision-independence. If those tokens
compose across published steps, the enclosure of
$g(\tau)=|x_r(t)-x_s(\tau)|-c_f(t-\tau)$ eventually exceeds the root tolerance
($10^{-5}$ at position/velocity tolerances $2\times10^{-6}$), the sign change
can no longer be bracketed, and the cell fails closed regardless of bit depth.
At step $0.01$ the wall arrives after $33$ steps, consistent with tokens of
order $10^{-6}$ accumulating past a $10^{-5}$ tolerance.

This is **residual-risk item 4** of the
[engine inspection](../eom-engine-independent-inspection-2026-07-13.md) —
per-segment error-token accumulation across many steps — which was flagged and
never checked. Residual-risk item 2 (even-crossing multi-root completeness
within a single cell) remains the second candidate.

The hypothesis is stated to be tested, not adopted. The measurement that decides
it: report the position/velocity error radius of each published segment versus
step index, and the width of the $g$ enclosure at the failing cell, against the
root tolerance.

## Independent confirmation of the §97 void disposition

Measured $t=0$ accelerations against the circular need $a_{\rm req}=\rho\omega^2$:

| Site | $|a|$ | $a_{\rm req}$ | ratio |
|---|---:|---:|---:|
| I$\pm$ | $0.4465384026$ | $0.2986435636$ | $1.4952$ |
| M$\pm$ | $0.5779935577$ | $0.6102261048$ | $0.9472$ |
| O$\pm$ | $0.2756218907$ | $0.1970318323$ | $1.3989$ |

The delivered force misses the circular need by $50\%$ on ring I and $40\%$ on
ring O. The object is not an equilibrium — independently confirming, on a
60-digit oracle, both the T1 non-bind negative and the
void disposition
of the §97/§98 flutter row. (The recorded $\epsilon_{\rm bind}=0.1185$ is a
norm dominated by ring M, which is the ring nearest balance; the per-ring
imbalance is considerably worse than that single figure suggests.)

## Consequences

1. **The defect takes priority over every re-run.** It is in the evolved-history
   root path — the code the whole claims-triage program runs on.
2. **The §86 fold-cost finding is re-opened.** A root-scan defect at the pin
   would present exactly as expensive-but-correct fold handling. §86's cost
   diagnosis cannot be trusted until this is fixed, and the recent analytic
   pinned-fold work — $100.3\times$ fewer fold cells for only $1.25\times$
   whole-step wall time, with the residual cost in temporal step error — is
   consistent with the bottleneck being step acceptance rather than fold
   geometry.
3. **Caustics are not shown to be generic.** The architectural claim conditional
   on the caustic branch is withdrawn; a tangency-capable root certificate is
   not currently justified by this evidence.
4. The oracle certifies this object's start cleanly where the native path walls
   at $t=0.335$. **Native ↔ oracle parity on evolved history at these horizons
   is now itself an open question**, and is the natural regression to add.
