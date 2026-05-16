# Dynamic Pair-Provenance Source-Measure Packet

This packet turns `pair_provenance_measure` into a source-measure proof target. It does not claim Bell closure. Its purpose is to define the exact mathematical object that must sit between the angular-momentum ledger and the Bell-family residual harness before [bell-theorem](../../../content/markdown/aaa/theory-bridges/bell-theorem.md) can be rewritten as a passed or failed $\mathbb{A}\mathbb{A}\mathbb{A}$ account.

The immediate trigger is the executable negative control in `scripts/quantum/bell-family-residual-harness.mjs`: a finite pair-provenance grid plus local axis kernels can preserve no-signaling and measurement independence while still collapsing to Bell-local product screening. That result is valuable because it rules out a tempting shortcut. Explicit pair provenance is not enough; the source measure and apparatus response must show why the completed record law does not reduce to

$$
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi).
$$

## Incremental Value Over Existing Gates

This packet adds no new validation gate. It sharpens the existing Bell gate by giving `pair_provenance_measure` a source-side contract before any future scenario is added to the harness.

| Existing artifact | What it already protects | Increment supplied here |
| --- | --- | --- |
| [transfer-operator-basin-measure](transfer-operator-basin-measure.md) | Basin measures, invariant or metastable measures, detector-kernel discipline. | Specializes the measure grammar to a two-wing source event and joint record basins. |
| `scripts/quantum/bell-family-residual-harness.mjs` | CHSH, GHZ, Hardy, no-signaling, measurement-independence, product-screening diagnostics. | Identifies the source and apparatus variables that a future generated scenario must supply. |
| [photon-measurement-bell-gates](../angular-momentum-spin/photon-measurement-bell-gates.md) | Angular-momentum, Stern-Gerlach, photon Gate B, and Bell placement. | Supplies the quantum-closure side of the pair-provenance source-measure contract. |

The value is live because it protects contact with tested Bell-family data and prevents a proof from passing by naming shared provenance while silently re-entering the Bell-local class.

## Claim Map

| Bucket | Claim |
| --- | --- |
| Ontology | A pair-creation event leaves a definite pair-provenance ledger in the substrate history. The ledger is part of the same absolute-time causal-wake evolution as the daughter assemblies and apparatus records. |
| Derivation / closure target | Derive a source measure $\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})$ and joint record basins $B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}$ from the angular-momentum ledger, detector kernels, and finite record window. |
| Effective summary | The observer-level singlet ket and Bell probability table are target summaries. They may be used as benchmarks, not as source-measure definitions. |
| Speculation | Any claim that pair provenance has a second Noether-Sea compliance coarse-graining remains discussion-scoped until a local statistic is derived and passes the no-signaling guardrail. |

## Source Measure Object

Let $P_{\mathrm{src}}$ denote a declared spin-pair or photon-pair preparation protocol. The source packet must identify a source return section $\Sigma_{\mathrm{src}}$ in the full regularized history space and a source occupation measure $\mu_{\mathrm{src}}$ on that section. The pair-provenance map is

$$
C_{\mathrm{pair}}
:
\Sigma_{\mathrm{src}}
\longrightarrow
\Pi_{AB},
$$

where each retained pair-provenance record has the form

$$
\Pi_{AB}
=
\left(
\Gamma_{\mathrm{parent}}(t_0^-),
\Gamma_A(t_0^+),
\Gamma_B(t_0^+),
\mathcal{L}_{\mathrm{root}}^{AB},
\mathcal{W}_{AB}[t_0,t_{\mathrm{sep}}],
\mathbf{J}_{AB}^{\mathrm{bal}},
\Theta_{AB}^{\mathrm{rel}},
\mathcal{Q}_{AB}^{\mathrm{cons}}
\right).
$$

Here $\mathcal{L}_{\mathrm{root}}^{AB}$ retains active causal-root branches through source separation, $\mathcal{W}_{AB}$ retains the pair wake and path-history record, $\mathbf{J}_{AB}^{\mathrm{bal}}$ records the angular-momentum balance such as $\mathbf{J}_A+\mathbf{J}_B=\mathbf{0}$, $\Theta_{AB}^{\mathrm{rel}}$ records relative orientation and phase data, and $\mathcal{Q}_{AB}^{\mathrm{cons}}$ records conserved energy, momentum, polarity inventory, and admissible reaction provenance.

The source measure is the pushforward

$$
\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})
=
C_{\mathrm{pair}*}\mu_{\mathrm{src}}.
$$

This is the first object a future Bell simulation must emit. It is invalid if $\rho_{\mathrm{src}}$ is tuned against detector settings or chosen directly to reproduce the quantum table.

## Joint Record Measure

For local detector settings $\hat{\mathbf{m}}_A$ and $\hat{\mathbf{m}}_B$, unresolved apparatus and local Noether-Sea variables live in spaces $\Theta_A(\hat{\mathbf{m}}_A)$ and $\Theta_B(\hat{\mathbf{m}}_B)$ with local measures $d\nu_A$ and $d\nu_B$. The finite-window joint state space for one record trial is

$$
\Gamma_{AB}^{\mathrm{rec}}
=
\Pi_{AB}
\times
\Theta_A(\hat{\mathbf{m}}_A)
\times
\Theta_B(\hat{\mathbf{m}}_B).
$$

The record basins are measurable sets

$$
B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}
\subset
\Gamma_{AB}^{\mathrm{rec}},
\qquad
a,b\in\{-1,+1\}.
$$

The candidate joint record law is

$$
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\int
\mathbf{1}_{B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}}
(\Pi_{AB},\zeta_A,\zeta_B)
\,d\nu_A(\zeta_A|\hat{\mathbf{m}}_A,\Pi_{AB})
\,d\nu_B(\zeta_B|\hat{\mathbf{m}}_B,\Pi_{AB})
\,d\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}}).
$$

This equation is a closure target, not a proof. If the basin indicator decomposes into independent local indicators after conditioning on the complete retained $\Pi_{AB}$,

$$
\mathbf{1}_{B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}}
(\Pi_{AB},\zeta_A,\zeta_B)
=
K_A(a|\hat{\mathbf{m}}_A,\Pi_{AB},\zeta_A)
K_B(b|\hat{\mathbf{m}}_B,\Pi_{AB},\zeta_B),
$$

then the candidate has product-screened itself. In that case the Bell-family gate must fail unless some declared incompleteness in $\Pi_{AB}$ is repaired by a stronger retained record.

## Obstruction Lemmas

**Lemma 1: product-screening obstruction.** If $\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})$ is independent of detector settings and every context admits the product-screening form

$$
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
=
\int
K_A(a|\hat{\mathbf{m}}_A,\Pi_{AB})
K_B(b|\hat{\mathbf{m}}_B,\Pi_{AB})
d\rho_{\mathrm{src}}(\Pi_{AB}),
$$

then the induced two-wing table lies in the Bell-local polytope for the corresponding measurement family. Therefore it cannot pass CHSH beyond the local bound, cannot pass the GHZ perfect-correlation parity obstruction, and cannot pass Hardy with the required zero/positive-event pattern.

Proof route: stochastic local kernels are convex combinations of deterministic one-wing response tables. Integrating over $\Pi_{AB}$ forms a convex mixture of local deterministic vertices. The CHSH, GHZ, and Hardy contradictions apply to that convex hull.

**Lemma 2: setting-provenance guard.** If

$$
\rho_{\mathrm{src}}(\Pi_{AB}|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B,P_{\mathrm{src}})
\ne
\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}}),
$$

then the candidate must report a nonzero measurement-independence residual. A correlation fit obtained this way is a measurement-independence failure, not the intended pair-provenance route.

**Lemma 3: no-signaling guard.** If the one-wing marginal depends on the distant setting before causal-wake contact,

$$
\sum_b
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B)
\ne
\sum_b
P_\theta(a,b|\hat{\mathbf{m}}_A,\hat{\mathbf{m}}'_B),
$$

then the candidate has introduced a signal-transfer failure. The failure cannot be repaired by saying the source ledger is shared; it must be routed to an apparatus, timing, or causal-window defect.

**Lemma 4: classical-axis obstruction.** If $\Pi_{AB}$ reduces to one unresolved opposite axis $\hat{\mathbf{n}}_A=-\hat{\mathbf{n}}_B$ and each detector returns a hemisphere sign, then

$$
E_{\mathrm{axis}}(\theta)
=
-1+\frac{2\theta}{\pi},
$$

so the generated table reaches only the local CHSH bound. This is exactly the failure mode represented by the current generated pair-provenance negative control.

## Simulation Target

The next simulation should not add another hand-written probability table. It should emit a source-measure candidate with the following fields:

| Field | Required content |
| --- | --- |
| `source_protocol` | Preparation label and source-section assumptions. |
| `source_records` | Finite or sampled records representing $\Pi_{AB}$, each with a weight from $C_{\mathrm{pair}*}\mu_{\mathrm{src}}$. |
| `source_balance` | Energy, momentum, angular-momentum, polarity-inventory, and causal-wake provenance diagnostics for each record or record class. |
| `local_apparatus_records` | Detector-side unresolved variables $\zeta_A,\zeta_B$ and local measures $d\nu_A,d\nu_B$. |
| `record_basins` | Generated membership or transition rule for $B_{ab}^{\hat{\mathbf{m}}_A,\hat{\mathbf{m}}_B}$. |
| `contexts` | Emitted two-wing probability tables for CHSH, GHZ, Hardy, and any photon-polarization variant being tested. |
| `compression_audit` | Product-screening residual against the declared complete $\Pi_{AB}$ and apparatus variables. |
| `guardrails` | $\Delta_{\mathrm{MI}}$, $\Delta_{\mathrm{NS}}^A$, $\Delta_{\mathrm{NS}}^B$, Tsirelson, GHZ, and Hardy diagnostics. |

The minimal executable target is to produce a JSON scenario that can be read by the Bell-family harness:

```text
node scripts/quantum/bell-family-residual-harness.mjs \
  --candidate scripts/quantum/product-screened-axis-candidate.json \
  --pretty
```

The `--candidate` reader is an intake path, not a new gate. The included `product-screened-axis-candidate.json` fixture is a success marker for the existing failure mode: it reproduces a no-signaling, measurement-independent, product-screened negative control from explicit source records. Candidate scenarios must supply `source_protocol`, `source_records`, `source_balance`, `local_apparatus_records`, `record_basins`, `compression_audit`, `guardrails`, and `contexts`. If a context omits provenance, the reader uses the normalized `source_records` weights. If a context omits screening records and every source record supplies a `local_response`, the reader builds the product-screening audit from those local responses. A positive candidate may be added only after its probability tables are generated from the source records and record basins above.

The first generated joint-basin target is emitted by

```text
node scripts/quantum/source-measure-joint-basin-emitter.mjs \
  --pretty \
  --out scripts/quantum/source-measure-joint-basin-candidate.json
```

and checked by

```text
node scripts/quantum/bell-family-residual-harness.mjs \
  --candidate scripts/quantum/source-measure-joint-basin-candidate.json \
  --pretty
```

This target uses a setting-independent six-cell source measure over a uniform threshold coordinate and an unbiased marginal branch. Its context-indexed joint basin recovers the singlet CHSH benchmark, preserves zero measurement-independence and no-signaling residuals, and does not reduce to the declared product-screening baseline. It is not a Bell closure proof: the threshold rule is a reduced target object whose substrate origin must still be derived from the pair-provenance ledger, the local apparatus record-window measures, and the joint record basins.

## Promotion Gates

1. $\rho_{\mathrm{src}}(\Pi_{AB}|P_{\mathrm{src}})$ is a pushforward of a declared source measure, not a fitted Bell table.
2. The source measure is independent of later detector settings within the declared causal-window tolerance.
3. The local apparatus measures are derived from detector or material return maps, not from inserted Born-rule weights.
4. The joint record basins are measurable and cover the retained trial space up to a declared escape tolerance.
5. The product-screening audit is explicit. If the completed retained record product-screens, Bell closure fails rather than being reworded.
6. The emitted tables pass or fail the harness with named residuals for CHSH, GHZ, Hardy, no-signaling, measurement independence, and Tsirelson.
7. Photon-polarization variants use the photon Gate B angle law and analyzer measure; spin-singlet variants use the spin-$\tfrac{1}{2}$ Stern-Gerlach response route.

## Remaining Blockers

- The delayed total-angular-momentum functional still needs a source-event evaluation for a changing-frequency Noether core.
- The effective spinor coordinate and the conditions under which the record-cycle measure flattens to the ideal chart remain lower-level proof obligations.
- The current product-screened generated axis model is a correct failure control, not a partial success.
- The generated joint-basin target now shows the intended nonfactorizing success shape at the harness level, but it leaves the central derivation open: explain why the joint basin exists in the substrate record law rather than inserting the singlet threshold as an effective target.
- Any future source-measure scenario must decide whether nonfactorization comes from an incomplete retained record, a genuinely joint record-basin construction, or a failed premise in the attempted $\Pi_{AB}$ compression. Vague nonlocality language is not an acceptable output.

## Handoff

This packet upgrades `pair_provenance_measure` from a deferred label to a scaffolded source-measure target. It leaves `bell_gate` blocked until a source-measure candidate emits tables into the harness and the compression audit reports whether the result is Bell-local, subquantum, quantum-compatible, signaling, measurement-dependent, or superquantum.
