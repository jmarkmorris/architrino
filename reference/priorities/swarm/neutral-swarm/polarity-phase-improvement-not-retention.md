# Polarity-Phase Improvement Does Not Imply Neutral Swarm Retention

Promotion status: `priority-only`. Closure status: `closed-rejected:polarity-phase-improvement-implies-retention`. This packet rejects only the narrow overread that neutral polarity reassignment plus rigid phase-offset improvement identifies or implies a retained neutral swarm branch. It consumes [../shell-swarm/polarity-phase-rigid-screen-results.md](../shell-swarm/polarity-phase-rigid-screen-results.md) and preserves the retention requirements stated in [neutral-swarm-master-retention-theorem.md](neutral-swarm-master-retention-theorem.md).

Executable witness command path:

```bash
node scripts/neutral-swarm/octahedral-polarity-phase-retention-witness.mjs --out /tmp/neutral-swarm-octahedral-polarity-phase-retention-witness.json --pretty
node scripts/neutral-swarm/octahedral-polarity-phase-retention-witness.mjs --validate /tmp/neutral-swarm-octahedral-polarity-phase-retention-witness.json --pretty
```

The witness artifact schema is

$$
\texttt{neutral-swarm-octahedral-polarity-phase-retention-witness/v1}.
$$

---

## 1. Narrow Overread

The rejected implication is

$$
\left(
\text{a neutral polarity row with rigid phase offsets improves the tangential residual}
\right)
\Longrightarrow
\left(
\text{the row is a retained branch}
\right).
$$

The antecedent is a rigid-screen improvement statement. It varies the neutral polarity assignment and the rigid phase offsets

$$
\phi_1=0,
\qquad
\phi_2,\phi_3\in[0,2\pi),
$$

on the fixed octahedral carrier. The consequent is much stronger: a retained branch must close the required root, support, dynamics, action, Noether, event, stability, convergence, and observer-facing rows on one declared ledger identity.

This packet rejects that implication only. It does not reject polarity reassignment or phase offsets as useful search coordinates.

---

## 2. Consumed Best Row

The consumed screen reports the best rigid polarity-phase row as:

| Field | Consumed value |
| --- | --- |
| Polarity row | $+---++$ |
| $\phi_2$ | $0.006683$ |
| $\phi_3$ | $3.148086$ |
| Tangential RMS | $0.829635$ |
| Tangential max | $1.787420$ |
| $J_{\min}$ | $0.727176$ |
| $d_{\min}/R$ | $0.996664$ |
| Root count | $5$-$5$ |

The row has a usable root floor and noncollision floor for screening, but its tangential residual remains order one:

$$
\operatorname{rms}
\left(
\widetilde{\mathcal{R}}_{\mathrm{tan}}
\right)
=
0.829635,
\qquad
\max
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan}}
\right|
=
1.787420.
$$

Therefore the row is residual-improved relative to weaker rigid baselines, not force-closed.

---

## 3. Rejection Certificate

Retention is not an optimizer score. The consumed row fails the retained-branch standard because the fixed-speed tangential force row remains open:

$$
\max
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan}}
\right|
=
1.787420
\ne 0.
$$

The consumed screen also does not supply a support-complete interval-certified root ledger, action-derived scale, Noether/event exchange ledger, stability certificate, convergence certificate, or observer-export row on the same branch identity. Thus the implication

$$
\text{polarity-phase residual improvement}
\nRightarrow
\text{retained neutral swarm branch}
$$

is rejected.

The closure status is

$$
\texttt{closed-rejected:polarity-phase-improvement-implies-retention}.
$$

The retained-branch status for the consumed row remains

$$
\texttt{not\_retained}.
$$

---

## 4. Boundary Of The Rejection

This packet makes no claim against all polarity choices or all phase offsets. It rejects only the narrow inference from the consumed rigid polarity-phase improvement row to retained-branch status.

It also makes no claim against:

1. deformed support-band routes;
2. bounded-speed routes;
3. controlled self-hit rows with declared action and event accounting;
4. fold-layer rows;
5. medium-response rows;
6. shell swarm routes;
7. nested shell swarm routes;
8. general neutral swarm routes outside this rigid polarity-phase screen.

Any later branch in those classes must be evaluated on its own declared ledger identity and retained only if the required rows close.
