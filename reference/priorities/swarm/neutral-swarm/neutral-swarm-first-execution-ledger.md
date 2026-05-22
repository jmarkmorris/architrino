# Neutral Swarm First Execution Ledger

Promotion status: `partially-promoted`. The fixed-speed octahedral diagnostic boundary and narrow overread rejections were promoted into [Noether Swarm](../../../../content/markdown/aaa/noether-swarm/noether-swarm.md) as scoped negative-result language. This packet still defines the first executable ledger that should be emitted after the neutral swarm finite-mode search spec is implemented. It refines [neutral-swarm-finite-mode-search.md](neutral-swarm-finite-mode-search.md), [all-pairs-root-ledger.md](all-pairs-root-ledger.md), and [neutral-swarm-master-retention-theorem.md](neutral-swarm-master-retention-theorem.md).

Promoted claim level: `theorem-target` plus scoped negative result. Remaining blocker: `support-complete-root-ledger-open` for the sampled rigid octahedral root diagnostic and `not-retained` for every current first-execution row. It does not define a solver and does not retain a branch. Its purpose is to make the first run produce a useful mathematical verdict rather than another unstructured diagnostic.

The first audit-emitter surface is implemented at:

```bash
node scripts/neutral-swarm/finite-mode-artifact.mjs --out /tmp/neutral-swarm-finite-mode-artifact.json --pretty
node scripts/neutral-swarm/finite-mode-artifact.mjs --validate /tmp/neutral-swarm-finite-mode-artifact.json --pretty
```

This executable artifact verifies the neutral six-site inventory, emits all 30 ordered distinct source pairs, records hollow-support and root-ledger placeholders, and returns `search_open` / `not_retained`. It is an audit surface, not a dynamics solve.

The first sampled octahedral root-ledger diagnostic is implemented at:

```bash
node scripts/neutral-swarm/octahedral-root-ledger.mjs --out /tmp/neutral-swarm-octahedral-root-ledger.json --pretty
node scripts/neutral-swarm/octahedral-root-ledger.mjs --validate /tmp/neutral-swarm-octahedral-root-ledger.json --pretty
```

This second artifact instantiates the rigid octahedral carrier from [../shell-swarm/octahedral-carrier-worked-example.md](../shell-swarm/octahedral-carrier-worked-example.md), samples every ordered distinct source pair on the declared phase mesh, and reports one positive-delay root with positive Jacobian in every sampled pair/node. Its useful verdict is still:

$$
\mathrm{root\_ledger\_diagnostic}
=
\texttt{sampled\_passed},
\qquad
\mathrm{retention}
=
\texttt{not\_retained}.
$$

The first failure remains

$$
\texttt{support-complete-root-ledger-open},
$$

because sampled roots do not replace an interval-certified all-pairs root ledger, inactive-gap proof, tail assimilation or exclusion row, or force/action/event closure.

The first sampled octahedral force-residual diagnostic is implemented at:

```bash
node scripts/neutral-swarm/octahedral-force-residual.mjs --out /tmp/neutral-swarm-octahedral-force-residual.json --pretty
node scripts/neutral-swarm/octahedral-force-residual.mjs --validate /tmp/neutral-swarm-octahedral-force-residual.json --pretty
```

This third artifact provisionally consumes the sampled octahedral roots to evaluate the fixed-speed tangential force row. It returns

$$
\mathrm{force\_residual\_diagnostic}
=
\texttt{sampled\_failed},
\qquad
\mathrm{rigid\_carrier\_status}
=
\texttt{rejected\_by\_sampled\_tangential\_residual},
$$

with

$$
\max_{i,\theta}
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
\right|
\approx2.0637.
$$

This is a useful negative result for the rigid zero-offset seed, not a general neutral swarm rejection. The master first failure remains `support-complete-root-ledger-open` because the sampled root dependency is not yet a certified all-pairs ledger.

---

## 1. Execution Input

The first execution input is

$$
\mathsf{Input}_{\mathrm{NS},0}
=
\left(
\mathsf{Chart},
\mathsf{Polarity},
\mathsf{Support},
\mathsf{RootPolicy},
\mathsf{TailPolicy},
\mathsf{ResidualWeights},
\mathsf{Tolerance}
\right).
$$

The required minimum is:

| Field | Required content |
| --- | --- |
| $\mathsf{Chart}$ | six-site finite-mode chart, collocation count, period convention, and gauge convention |
| $\mathsf{Polarity}$ | exactly three positive and three negative sites |
| $\mathsf{Support}$ | hollow support descriptor with $R_{\mathrm{in}}<R_{\mathrm{out}}$ |
| $\mathsf{RootPolicy}$ | all 30 ordered distinct source pairs $i\ne j$ |
| $\mathsf{TailPolicy}$ | finite memory depth and declared exclusion or assimilation policy |
| $\mathsf{ResidualWeights}$ | row weights for inventory, roots, support, dynamics, action, events, and optional occupancy |
| $\mathsf{Tolerance}$ | row tolerances and first-failure ordering |

If any field is missing, the execution result is not a dynamics verdict. It is

$$
\texttt{input-contract-failed}.
$$

---

## 2. Mandatory Ledger Output

The first execution ledger is

$$
\mathsf{Exec}_{\mathrm{NS},0}
=
\left(
\mathsf{RunID},
\mathsf{LedgerID},
\mathsf{Inventory},
\mathsf{Pairs},
\mathsf{Support},
\mathsf{Root},
\mathsf{Tail},
\mathsf{Dynamics},
\mathsf{ActionNoether},
\mathsf{Event},
\mathsf{CaseReduction},
\mathsf{ObserverExport},
\mathsf{FirstFailure},
\mathsf{Status}
\right).
$$

The first run may leave most mathematical rows as `not_computed`, but it must still emit them explicitly. A missing row is a failed artifact, not an open theorem target. The current executable audit artifact emits this row with the schema:

$$
\texttt{neutral-swarm-finite-mode-artifact/v1}.
$$

The sampled octahedral root diagnostic emits the companion schema:

$$
\texttt{neutral-swarm-octahedral-root-ledger/v1}.
$$

The sampled octahedral fixed-speed force diagnostic emits:

$$
\texttt{neutral-swarm-octahedral-force-residual/v1}.
$$

The deterministic fixed-speed no-go witness emits:

$$
\texttt{neutral-swarm-octahedral-fixed-speed-witness/v1}.
$$

It closes one narrow hypothesis by rejection:

$$
\texttt{closed-rejected:rigid-octahedral-fixed-speed-neutral-row}.
$$

The closure row is the interval witness

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232],
$$

so the fixed-speed tangential row cannot vanish for every required receiver and phase. This rejection does not consume or close the broader neutral swarm master certificate; it only removes the rigid zero-offset fixed-speed octahedral seed from the retained-branch candidate set.

The ordinary same-source positive-delay exclusion witness is implemented at:

```bash
node scripts/neutral-swarm/octahedral-same-source-witness.mjs --out /tmp/neutral-swarm-octahedral-same-source-witness.json --pretty
node scripts/neutral-swarm/octahedral-same-source-witness.mjs --validate /tmp/neutral-swarm-octahedral-same-source-witness.json --pretty
```

Its schema is

$$
\texttt{neutral-swarm-octahedral-same-source-witness/v1}.
$$

It closes the ordinary fixed-speed same-source rescue hypothesis by rejection:

$$
\texttt{closed-rejected:ordinary-same-source-positive-delay}.
$$

The certificate is the strict inequality

$$
2\left|\sin\frac{y}{2}\right|<y
\qquad
(0<y\le2),
$$

plus the bounded-separation exclusion for $y>2$. This proves that the ordinary same-source row contributes no retained positive-delay force term under the rigid exact-$c_f$ circular convention. Controlled self-hit, bounded-speed, and fold-layer policies remain separate event/action hypotheses.

The inventory-bias closure witness is implemented at:

```bash
node scripts/neutral-swarm/octahedral-inventory-closure-witness.mjs --out /tmp/neutral-swarm-octahedral-inventory-closure-witness.json --pretty
node scripts/neutral-swarm/octahedral-inventory-closure-witness.mjs --validate /tmp/neutral-swarm-octahedral-inventory-closure-witness.json --pretty
```

Its schema is

$$
\texttt{neutral-swarm-octahedral-inventory-closure-witness/v1}.
$$

It closes the count-only force-closure overread by rejection:

$$
\texttt{closed-rejected:inventory-bias-implies-force-closure}.
$$

The certificate is a direct counterexample: the rigid octahedral all-pairs ledger has $N_{\mathrm{attr}}=3$ and $N_{\mathrm{rep}}=2$ for every receiver, while the same fixed-speed interval witness gives

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232].
$$

Thus structural attraction bias remains a required inventory row, but it is not a sufficient proof of fixed-speed force closure.

The resolved-root force-closure overread witness is implemented at:

```bash
node scripts/neutral-swarm/octahedral-root-force-closure-witness.mjs --out /tmp/neutral-swarm-octahedral-root-force-closure-witness.json --pretty
node scripts/neutral-swarm/octahedral-root-force-closure-witness.mjs --validate /tmp/neutral-swarm-octahedral-root-force-closure-witness.json --pretty
```

Its schema is

$$
\texttt{neutral-swarm-octahedral-root-force-closure-witness/v1}.
$$

It closes the resolved-root-implies-force-closure overread by rejection:

$$
\texttt{closed-rejected:resolved-root-rows-imply-fixed-speed-force-closure}.
$$

The certificate is again a direct counterexample: at the same rigid octahedral witness node all five ordered distinct-source rows have one positive-delay root and positive Jacobian data, while the fixed-speed tangential row still has

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},(1,+)}(0)
\in
[0.07393815228,0.07393815232].
$$

Thus resolved root rows are necessary force-ledger inputs, but they do not by themselves make the fixed-speed tangential residual vanish.

The phase-offset retention overread witness is implemented at:

```bash
node scripts/neutral-swarm/octahedral-phase-offset-retention-witness.mjs --out /tmp/neutral-swarm-phase-offset-retention-witness.json --pretty
node scripts/neutral-swarm/octahedral-phase-offset-retention-witness.mjs --validate /tmp/neutral-swarm-phase-offset-retention-witness.json --pretty
```

Its schema is

$$
\texttt{neutral-swarm-octahedral-phase-offset-retention-witness/v1}.
$$

It closes the sampled-improvement-implies-retention overread by rejection:

$$
\texttt{closed-rejected:sampled-phase-offset-improvement-implies-retention}.
$$

The certificate is the sampled phase-offset scan itself: a phase row may lower RMS relative to the zero-offset row, but the best sampled row remains `not_retained`, keeps a positive maximum tangential residual, and leaves support-complete root certification, action, event, Noether, stability, and convergence rows open. This rejects only the retention overread, not the broader usefulness of phase offsets as search coordinates.

The polarity-phase retention overread witness is implemented at:

```bash
node scripts/neutral-swarm/octahedral-polarity-phase-retention-witness.mjs --out /tmp/neutral-swarm-octahedral-polarity-phase-retention-witness.json --pretty
node scripts/neutral-swarm/octahedral-polarity-phase-retention-witness.mjs --validate /tmp/neutral-swarm-octahedral-polarity-phase-retention-witness.json --pretty
```

Its schema is

$$
\texttt{neutral-swarm-octahedral-polarity-phase-retention-witness/v1}.
$$

It closes the neutral-polarity-plus-rigid-phase retention overread by rejection:

$$
\texttt{closed-rejected:polarity-phase-improvement-implies-retention}.
$$

The certificate is [../shell-swarm/polarity-phase-rigid-screen-results.md](../shell-swarm/polarity-phase-rigid-screen-results.md): neutral polarity reassignment plus rigid phase offsets improve the RMS tangential residual to about $0.8296$, but the best row remains `not_retained`, keeps positive pointwise tangential residual with maximum about $1.7874$, and leaves the master retention rows open. This rejects only the retention overread, not polarity reassignment or phase offsets as search coordinates.

---

## 3. Pair And Inventory Audit

The pair audit must verify

$$
|I|=6,
\qquad
\#\{i:\sigma_i=+1\}=3,
\qquad
\#\{i:\sigma_i=-1\}=3,
$$

and

$$
\Pi_{\mathrm{all}}
=
\{(i,j)\in I\times I:i\ne j\},
\qquad
|\Pi_{\mathrm{all}}|=30.
$$

The pair-check residual is

$$
\mathcal{R}_{\mathrm{pair-count}}
=
\left||\Pi_{\mathrm{all}}|-30\right|
+
\left|
\sum_{i\in I}\sigma_i
\right|.
$$

The run cannot proceed to root rows unless

$$
\mathcal{R}_{\mathrm{pair-count}}=0.
$$

---

## 4. Root Ledger Placeholders

For every ordered pair $(i,j)\in\Pi_{\mathrm{all}}$ and collocation node $u_n$, the first execution ledger must report one root status:

| Status | Meaning |
| --- | --- |
| `not_searched` | no root search was attempted for this pair/node |
| `bracketed` | at least one candidate root bracket is stored |
| `excluded` | an interval proof excludes roots in the searched cell |
| `assimilated` | a root sheet was accepted into the active ledger |
| `failed` | search failed with a concrete reason |

The first minimal artifact may set every pair/node to `not_searched` or to an open placeholder, but then the master first failure must be

$$
\texttt{all-pairs-root-ledger-open}.
$$

This is still progress because it proves the artifact has the right source-pair surface. The current audit artifact reports the first failure as

$$
\texttt{all-pairs-root-ledger-open}.
$$

For the rigid octahedral carrier, the sampled diagnostic upgrades the placeholder to a sampled row:

$$
\texttt{sampled-root-ledger-diagnostic-passed}.
$$

This is not certification. It only lowers the next blocker to the support-complete root-ledger proof:

$$
\texttt{support-complete-root-ledger-open}.
$$

---

## 5. First-Failure Payload

The execution must emit

$$
\mathsf{F}_{\mathrm{NS},0}
=
\left(
\mathrm{first\_failed\_row},
\mathrm{failed\_predicate},
\mathrm{ledger\_id},
\mathrm{blocking\_margin},
\mathrm{next\_certificate},
\mathrm{retention\_status}
\right).
$$

The first-failure ladder is inherited from [neutral-swarm-master-retention-theorem.md](neutral-swarm-master-retention-theorem.md). For the first minimal audit artifact, the expected result is usually:

$$
\mathrm{first\_failed\_row}
=
\texttt{all-pairs-root-ledger-open},
\qquad
\mathrm{retention\_status}
=
\texttt{not-retained}.
$$

If the artifact cannot even verify polarity and pair count, the first failed row is:

$$
\texttt{inventory-or-pair-surface-failed}.
$$

---

## 6. Success Criteria For This Ledger

The first execution ledger succeeds as an artifact if:

1. it verifies the six-site neutral inventory;
2. it enumerates all 30 ordered distinct source pairs;
3. it emits hollow support fields;
4. it emits root-ledger statuses for every required pair/node surface;
5. it emits the master first-failure payload;
6. it marks retention as `not-retained` unless every required master predicate passes.

The artifact does not need to find a retained branch. A clean `not-retained` first-failure payload is the expected first useful closure step.
