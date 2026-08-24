# Bell-Family Record-Measure Harness

This protocol gives the Bell-family residuals in [No-Go Theorems](../no-go-theorems.md) their first executable scaffold. It is not a closure proof. It is a probability-table harness that checks whether a proposed record table preserves the standard benchmark shape before any claim is made about deriving that table from architrino dynamics, pair provenance, detector kernels, and finite-time basin measures.

The simple point is that one Bell number is not enough. A candidate table may look good on a CHSH average while failing no-signaling, GHZ parity, Hardy structure, or measurement-independence accounting. This harness keeps those checks in one place before the deeper dynamics are allowed to claim success.

The immediate target is discipline. A model that fits one Bell average can still fail GHZ parity, Hardy zero/positive-event structure, no-signaling, or measurement independence. The harness therefore evaluates CHSH, GHZ, Hardy, no-signaling, measurement-independence, and observed factorization residuals in one packet.

## Runtime Artifact

Run:

```text
node scripts/quantum/bell-family-residual-harness.mjs --pretty
```

To inspect one case:

```text
node scripts/quantum/bell-family-residual-harness.mjs --scenario ghz_local_value_table --pretty
```

To inspect the candidate-fixture intake path:

```text
node scripts/quantum/bell-family-residual-harness.mjs \
  --candidate scripts/quantum/product-screened-axis-candidate.json \
  --pretty
```

The script emits JSON with one row per scenario:

| Field | Meaning |
| --- | --- |
| `metadata.source` | whether the run used built-in scenarios or a candidate JSON fixture |
| `metadata.candidate_path` | candidate fixture path when `metadata.source` is `candidate` |
| `id` | stable scenario identifier |
| `classification` | `benchmark` or `negative_control` |
| `source_protocol` | declared source construction for candidate fixtures, when supplied |
| `source_record_count` | number of retained source records in a candidate fixture |
| `metrics.chsh` | CHSH expectations, $S$, local-bound excess, and Tsirelson excess |
| `metrics.ghz` | GHZ product-context expectations and $\Delta_{\mathrm{GHZ}}$ residual |
| `metrics.hardy` | Hardy zero-term probabilities and positive-event margin |
| `metrics.no_signaling` | maximum one-party marginal drift under remote setting changes |
| `metrics.measurement_independence` | total-variation drift of declared provenance labels across settings |
| `metrics.observed_factorization` | total-variation distance between the observed joint table and the product of its observed marginals |
| `metrics.product_screening` | total-variation distance between the emitted table and a declared Bell-local product-screening reconstruction |
| `gates` | pass/fail records for the residuals that apply to the scenario |
| `witness_tags` | non-failure tags such as `bell.chsh_local_bound_violated` |
| `failure_codes` | stable failure codes such as `bell.signal_transfer` |

## Residual Object

For a two-party CHSH table with binary outcomes $a,b\in\{-1,+1\}$, the harness computes

$$
E(x,y)=\sum_{a,b=\pm1}ab\,P(a,b|x,y)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-71254ad87038302b)

and the convention

$$
S=E(A_0,B_0)-E(A_0,B_1)+E(A_1,B_0)+E(A_1,B_1)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-2146fac9d103d6dd)

The gate reports both the local-bound excess

$$
\Delta_{\mathrm{CHSH}}
=
\left[|S|-2\right]_+
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-1546459b8c9dbe9e)

and the Tsirelson excess

$$
\Delta_{\mathrm{Ts}}
=
\left[|S|-2\sqrt{2}\right]_+
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-787cfba82c912754)

For GHZ, the script uses the context signs in [Bell's Theorem](../../philosophy-history/theory-bridges/bell-theorem.md#bell-family-strengthenings-ghz-and-hardy):

$$
\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\},
\qquad
\prod_{C\in\mathcal{C}_{\mathrm{GHZ}}}\chi_C=-1
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-5a08dfcbc8537c99)

and computes

$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E(C)
\right]_+
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-c2658ae1bc60a210)

For Hardy, it consumes the setting and context convention owned by [No-Go Theorems](../no-go-theorems.md#applicability-map): $U_i$ and $D_i$ are the two calibrated binary settings on wing $i$, and the four terms below come from four distinct setting pairs. It computes the positive margin

$$
\Delta_{\mathrm{Hardy}}
=
\left[
P(D_1=1,D_2=1)
-
P(U_1=1,U_2=1)
-
P(D_1=1,U_2=0)
-
P(U_1=0,D_2=1)
\right]_+
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-e7d367805a1941b2)

No-signaling is evaluated as the maximum one-party marginal drift between contexts that keep that party's setting fixed:

$$
\Delta_{\mathrm{NS}}^{i}
=
\sup_{s_i,\mathbf{s}_{-i},\mathbf{s}'_{-i}}
\sum_{r_i}
\left|
P(r_i|s_i,\mathbf{s}_{-i})
-
P(r_i|s_i,\mathbf{s}'_{-i})
\right|
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-054fa35178229131)

Measurement-independence leakage is represented by a declared provenance label distribution in each context:

$$
\Delta_{\mathrm{MI}}
=
\sup_{\mathbf{s}}
D_{\mathrm{TV}}\!\left(
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}),
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}_0)
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f884ee6c0c0f4ee6)

where $\mathbf{s}_0$ is the packet baseline. A real closure packet should replace this toy provenance distribution with the pair-provenance ledger described below.

For generated pair-provenance cases, the harness also checks whether the emitted table is exactly reconstructed by a Bell-local product-screening form:

$$
\Delta_{\mathrm{screen}}
=
\sup_{\mathbf{s}}
D_{\mathrm{TV}}\!\left(
P_\theta(\mathbf{r}|\mathbf{s}),
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi)
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-3b844a3d59fa9d1a)

Here $\Delta_{\mathrm{screen}}=0$ is not a success for Bell closure. It means the proposed table has collapsed back into the screened common-cause model excluded by the Bell-family gate. A closure candidate must avoid that collapse while still keeping $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ within tolerance.

## Generated Pair-Provenance Path

The first generated path is a deliberately failing local-axis model. It declares a finite pair-provenance grid

$$
\Pi_{AB}^{(N)}
=
\left\{
(\phi_k,\phi_k+\pi,w_k)
\right\}_{k=1}^{N},
\qquad
w_k=\frac{1}{N}
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-f02225be9fbe350f)

and two local deterministic apparatus kernels:

$$
K_A(a|A_i,\Pi_k)
=
\mathbf{1}\!\left[
a=\operatorname{sgn}\cos(A_i-\phi_k)
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-0e2f163fcaadd409)

$$
K_B(b|B_j,\Pi_k)
=
\mathbf{1}\!\left[
b=\operatorname{sgn}\cos(B_j-\phi_k-\pi)
\right]
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-99e20024a6549477)

The generated table is then

$$
P_{\mathrm{gen}}(a,b|A_i,B_j)
=
\sum_k
w_k
K_A(a|A_i,\Pi_k)
K_B(b|B_j,\Pi_k)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-974c75a4bc0c2af8)

This is a useful negative control because it has explicit pair provenance, explicit local kernels, clean no-signaling, and clean measurement independence, but it still reaches only the classical-axis correlation. The product-screening residual is zero by construction, so the `product_screening_escape` gate must fail with `bell.product_screening_collapse`.

The candidate-reader path makes that obstruction inspectable from a declared source-record fixture rather than only from built-in tables. The fixture `scripts/quantum/product-screened-axis-candidate.json` supplies eight explicit source records, local deterministic response tables, normalized source weights, and four CHSH contexts. It is not a positive Bell candidate. It is a compact negative control showing that explicit provenance can still reduce to Bell-local product screening unless the completed record law supplies a stronger joint record-basin measure.

## Built-In Scenarios

| Scenario | Role | Expected signal |
| --- | --- | --- |
| `chsh_quantum_singlet` | benchmark | $|S|=2\sqrt{2}$, no-signaling passes, measurement independence passes |
| `local_classical_axis` | negative control | classical-axis response reaches only the local CHSH bound |
| `separable_pair_measure` | negative control | independent outcomes produce no Bell-family structure |
| `generated_pair_provenance_screened_axis` | negative control | generated pair provenance and local kernels collapse to Bell-local product screening |
| `setting_dependent_provenance` | negative control | CHSH table is present, but $\Delta_{\mathrm{MI}}>0$ |
| `signaling_box` | negative control | one-party marginals change under remote setting changes |
| `ghz_product_benchmark` | benchmark | GHZ product signs match with $\Delta_{\mathrm{GHZ}}=0$ |
| `ghz_local_value_table` | negative control | context-independent local values fail GHZ parity |
| `hardy_no_signaling_margin` | benchmark | Hardy margin is positive while no-signaling passes |
| `hardy_local_forbidden_event` | negative control | the positive Hardy event is cancelled by a forbidden event and no-signaling also fails |

These scenarios are deliberately small. The goal is to catch wiring errors, sign errors, and invalid escape routes before a larger Master-Equation packet consumes the residuals.

## Proof Scaffold Boundary

The harness encodes a useful obstruction:

$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-7c60ad066ae4fbef)

is still a Bell-local product form when $d\rho_{\mathrm{prov}}(\Pi)$ is independent of the settings and $\Pi$ is a complete common-past screen. Such a model cannot pass CHSH, GHZ, and Hardy as a family. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ closure must therefore derive a stronger object:

$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\mu_{*,T_W}^{(n)}
\left(
B_{\mathbf{r}}^{\mathbf{s}}
\right)
$$

[Explore this equation in Equation Mapping](../../../../../equation-mapping.html#corpus-equation-a64d345d5c74e75e)

where $B_{\mathbf{r}}^{\mathbf{s}}$ is the record-basin subset for the declared preparation, pair or multiplet provenance, local apparatus kernels, coarse-graining, and record window. This is the same measurement discipline used in [Measurement Ontology](../../quantum/measurement-ontology.md#born-rule-interface), but lifted from single-assembly basin weights to a Bell-family joint record measure.

The native proof packet must supply:

1. a pair-provenance ledger $\Pi_{AB}$ or multiplet ledger $\Pi_{ABC}$;
2. local apparatus kernels derived from the Stern-Gerlach-like or photon-analyzer channel;
3. one finite-window measure $\mu_{*,T_W}^{(n)}$ on the retained joint record manifold;
4. a compression audit showing why the completed record law does not reduce to Bell-local product screening;
5. no-signaling and measurement-independence residuals evaluated on the same packet.

The single-assembly Stern-Gerlach response in [Angular Momentum and Spin](../../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) is a prerequisite, not the Bell proof itself. Bell-family closure starts only after the pair-provenance measure and the joint record basins are explicit.

## Acceptance Boundary

Passing this harness means only that the residual calculations and negative controls behave as expected. It does not validate $\mathbb{A}\mathbb{A}\mathbb{A}$ quantum closure.

A future closure packet becomes promotable only if:

1. the probability tables are generated from declared substrate variables rather than written by hand;
2. $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ remain within tolerance;
3. CHSH, GHZ, and Hardy benchmarks are evaluated together;
4. the same $\mu_{*,T_W}^{(n)}$ also agrees with the record and repeated-frequency discipline in [Quantum Operator Mapping](../../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence);
5. the product-screening audit does not collapse the completed hidden-variable record into $\int_{\Pi}\prod_iK_i\,d\rho_{\mathrm{prov}}$;
6. failure cases are reported when the model reduces to classical-axis response, separable pair measure, product-screened pair provenance, context-independent GHZ values, forbidden Hardy events, setting-dependent provenance, or signaling marginals.
