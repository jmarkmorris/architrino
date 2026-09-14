# Bell-Family Record-Measure Harness

This protocol gives the Bell-family residuals in [No-Go Theorems](../no-go-theorems.md) an executable scaffold. It is not a closure proof. It is a probability-table harness: it takes a proposed table of outcome probabilities for a Bell-type experiment and checks whether that table keeps the standard benchmark shape, before any claim is made that the table follows from [architrino](../../foundations/architrino.md) dynamics, in which the two polarities of architrino, electrino and positrino, accelerate one another along the line of action through delayed causal wakes. The objects a derivation would have to supply to this harness are pair provenance, apparatus kernels, and a finite-window record-basin measure; each is defined below where the harness first consumes it.

The immediate target is discipline, and the reason is that one Bell number is not enough. A candidate table may match a single CHSH average while failing GHZ parity, Hardy zero and positive-event structure, no-signaling, or measurement-independence accounting. The harness therefore evaluates CHSH, GHZ, Hardy, no-signaling, measurement-independence, and observed-factorization residuals in one packet, so that the deeper dynamics cannot claim success on one number.

Several terms below are owned by other chapters and are used here only as the labels of declared inputs. A Bell-type experiment sends two or more assemblies from one source to separated apparatus wings; each wing chooses a setting and records a binary outcome, and the harness works only with the resulting table of outcome probabilities per setting context. Bell's theorem, developed in [Bell's Theorem](../../philosophy-history/theory-bridges/bell-theorem.md), shows that any model in which each wing's outcome law depends only on its own setting and a shared complete hidden state (Bell factorizability), with settings statistically independent of that state (measurement independence), obeys the CHSH bound $|S|\le 2$ defined below; quantum theory reaches $2\sqrt{2}$, the Tsirelson bound, and loophole-free experiments exceed $2$. Such a model is called Bell-local, and a table it produces is said to be product-screened by the shared state, because conditioning on that state factors the table into a product of one local response per wing. No-signaling is the observer-level requirement that every proper subset of wings has outcome statistics independent of settings at the complementary wings. For two wings this is a condition on each single-wing marginal; the current harness tests only those single-wing marginals, also in its three-wing examples. GHZ and Hardy are strengthened Bell tests that replace the CHSH correlator average by perfect-correlation signs and by zero-probability events respectively. On the $\mathbb{A}\mathbb{A}\mathbb{A}$ side, where $\mathbb{A}\mathbb{A}\mathbb{A}$ abbreviates Architrino Assembly Architecture, a [record](../../quantum/measurement-ontology.md#what-makes-an-interaction-a-record) is a durable apparatus outcome produced by the same delayed dynamics that moves every architrino; pair provenance is the retained shared history of the two assemblies from their common source; an apparatus kernel is the declared physical coupling between a wing's apparatus and its target; a record basin is the set of admissible retained histories that resolve to one outcome; and the [finite-window basin measure](../../quantum/measurement-ontology.md#transfer-operator-measure-contract) $\mu_{*,T_W}$ over a record window $T_W$ assigns those basins their weights. A candidate record $\theta$, in the sense of the [shared closure record](../failure-criteria.md#shared-closure-record), is the bundle of declared substrate histories and response maps from which a table $P_\theta$ is predicted.

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
| `description` | one-sentence statement of what the scenario exercises |
| `classification` | `benchmark` or `negative_control` for built-in scenarios; a candidate fixture may declare its own or defaults to `candidate` |
| `source_protocol` | declared source construction for candidate fixtures, when supplied |
| `source_record_count` | number of retained source records in a candidate fixture |
| `metrics.chsh` | CHSH expectations, $S$, local-bound excess, and Tsirelson excess |
| `metrics.ghz` | GHZ product-context expectations and $\Delta_{\mathrm{GHZ}}$ residual |
| `metrics.hardy` | Hardy zero-term probabilities and positive-event margin |
| `metrics.no_signaling` | maximum one-party marginal drift under remote setting changes |
| `metrics.measurement_independence` | total-variation drift of declared provenance labels across settings |
| `metrics.observed_factorization` | total-variation distance between the observed joint table and the product of its observed marginals |
| `metrics.product_screening` | total-variation distance between the emitted table and a declared Bell-local product-screening reconstruction |
| `metrics.complete_record_parity` | for records whose four context-product signs can be inferred from supplied deterministic screening responses or joint threshold intervals, the checked weight $\Delta_{\mathrm{par}}$ of records whose four CHSH context products multiply to $-1$; a deterministic local response always has parity $+1$, so nonzero weight marks records that no local deterministic response can realize; incomplete records are reported separately; `null` when no applicable record audit is available |
| `gates` | pass/fail records for the residuals that apply to the scenario: `no_signaling`, `measurement_independence`, `tsirelson` for CHSH tables, `ghz`, `hardy_margin`, and `product_screening_escape` where screening records are supplied and `complete_record_parity` where at least one record is checked |
| `witness_tags` | non-failure tags such as `bell.chsh_local_bound_violated`, `bell.ghz_products_matched`, `bell.hardy_positive_margin`, and `bell.superquantum` |
| `failure_codes` | stable failure codes: `bell.signal_transfer`, `bell.measurement_independence_blur`, `bell.tsirelson_open`, `bell.ghz_parity_open`, `bell.hardy_margin_open`, `bell.product_screening_collapse`, and `bell.complete_record_parity_obstruction` |

The parity diagnostic tests a proposed local deterministic representation. Odd context-product parity rejects that representation, not a general joint probability law under the selected nonfactorizable route. The runtime reports incomplete records, but its parity gate is emitted whenever at least one record is checked and uses only the obstructed weight; a passing gate does not certify the unexamined weight. The packet must report checked and incomplete coverage when interpreting that result.

## Residual Object

For a two-party CHSH table with setting $x$ on the first wing, setting $y$ on the second, and binary outcomes $a,b\in\{-1,+1\}$, the harness computes the correlation

$$
E(x,y)=\sum_{a,b=\pm1}ab\,P(a,b|x,y)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-71254ad87038302b)

which is the expectation of the outcome product in the context $(x,y)$, and the CHSH combination over the two calibrated settings $A_0,A_1$ of the first wing and $B_0,B_1$ of the second,

$$
S=E(A_0,B_0)-E(A_0,B_1)+E(A_1,B_0)+E(A_1,B_1)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2146fac9d103d6dd)

where $E(A_i,B_j)$ abbreviates $E(x{=}A_i,y{=}B_j)$. Every deterministic assignment of the four local outcomes gives $|S|=2$ exactly: writing $a_i$ and $b_j$ for the outcomes fixed under settings $A_i$ and $B_j$, $S=a_0(b_0-b_1)+a_1(b_0+b_1)$, and one of the two brackets vanishes while the other is $\pm2$; a Bell-local table is a mixture of such assignments, so it obeys $|S|\le2$. The singlet table at the built-in settings gives $|S|=2\sqrt{2}$. The gate reports both the local-bound excess

$$
\Delta_{\mathrm{CHSH}}
=
\left[|S|-2\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1546459b8c9dbe9e)

and the Tsirelson excess

$$
\Delta_{\mathrm{Ts}}
=
\left[|S|-2\sqrt{2}\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-787cfba82c912754)

where $[x]_+\equiv\max(x,0)$ is the positive part, so each excess is zero exactly when the corresponding bound holds.

For GHZ, a three-wing test in which each wing measures one of two binary settings $X$ and $Y$, the script uses the context set and the sign product fixed in [Bell's Theorem](../../philosophy-history/theory-bridges/bell-theorem.md#bell-family-strengthenings-ghz-and-hardy):

$$
\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\},
\qquad
\prod_{C\in\mathcal{C}_{\mathrm{GHZ}}}\chi_C=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5a08dfcbc8537c99)

Here $\chi_C\in\{-1,+1\}$ is the perfectly correlated product of the three outcomes in context $C$. Bell's Theorem fixes only the product of the four signs. The built-in benchmark fixes the individual signs as $\chi_{XXX}=-1$ and $\chi_{XYY}=\chi_{YXY}=\chi_{YYX}=+1$, the perfect-correlation signs of the three-party GHZ state formed with a relative minus sign between its two product components; a candidate fixture that carries GHZ contexts declares its own four signs with the same product. With $E(C)$ the product expectation of the three outcomes in context $C$, the script computes

$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E(C)
\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c2658ae1bc60a210)

The residual vanishes exactly when every context reproduces its perfect correlation. A context-independent deterministic local value table has context products whose four-fold product is $+1$, because each wing's $X$ value and $Y$ value each appear twice, so at least one context has $\chi_C E(C)=-1$ and the residual is $2$.

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

[View →](../../../../../equation-mapping.html#corpus-equation-e7d367805a1941b2)

where each probability is read from its own setting context, $(D_1,D_2)$, $(U_1,U_2)$, $(D_1,U_2)$, or $(U_1,D_2)$, with outcomes $0$ and $1$. Under Bell factorizability every local value assignment with $D_1=D_2=1$ either has $U_1=U_2=1$ or falls into one of the two mixed events, so the first probability never exceeds the sum of the other three and the margin is zero for every Bell-local table; a positive margin certifies a departure from that class without using the CHSH correlator average; the positive margin is itself an inequality test.

No-signaling is evaluated for each wing $i$ as the maximum drift of that wing's outcome marginal between contexts that keep its own setting fixed. Write $\mathbf{s}=(s_1,\dots,s_n)$ for the settings of the $n$ wings, $\mathbf{s}_{-i}$ for the settings of every wing other than $i$, and $r_i$ for wing $i$'s outcome:

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

[View →](../../../../../equation-mapping.html#corpus-equation-054fa35178229131)

The reported residual is $\Delta_{\mathrm{NS}}=\max_i\Delta_{\mathrm{NS}}^{i}$ over the supplied contexts. This tests single-wing marginals only. For more than two wings, full no-signaling requires every relevant proper-subset marginal to be independent of complementary settings, with enough contexts to compare those settings. For example, if $a,c$ are independent fair bits and $b=a\mathbin{\oplus}z$, where $z$ is the third wing’s setting and $\oplus$ is addition modulo two, all single-wing marginals are fair but the joint parity $a\oplus b$ reveals $z$. The current harness does not check that subset condition; a missing context comparison is untested, not a demonstrated invariance. Each term sums the absolute differences of two marginals, which is twice their total-variation distance; this is the definition [Bell's Theorem](../../philosophy-history/theory-bridges/bell-theorem.md#bell-closure-diagnostics) writes for two wings as $\Delta_{\mathrm{NS}}^{A}$ and $\Delta_{\mathrm{NS}}^{B}$, and the residual [No-Go Theorems](../no-go-theorems.md#applicability-map) consumes.

Measurement-independence leakage is represented by a declared provenance-label distribution $\rho_{\mathrm{prov}}(\Pi|\mathbf{s})$ in each context, where $\Pi$ labels the retained source record, the pair provenance, and $D_{\mathrm{TV}}$ is the total-variation distance, half the sum of absolute probability differences:

$$
\Delta_{\mathrm{MI}}
=
\sup_{\mathbf{s}}
D_{\mathrm{TV}}\!\left(
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}),
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}_0)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f884ee6c0c0f4ee6)

where $\mathbf{s}_0$ is the packet baseline, the first context in the scenario that carries a provenance distribution. The runtime compares only contexts carrying provenance data; zero therefore establishes agreement only on that supplied family. With complete coverage, the residual vanishes exactly when the label distribution is the same in every declared context. For the same retained variable and context family, this is also the zero condition of the unconditional form $\sup_{\mathbf{s}}D_{\mathrm{TV}}(\rho(\lambda|\mathbf{s}),\rho(\lambda))$ used in Bell's Theorem; when either form is nonzero, each is at most twice the other by the triangle inequality, so a tolerance stated in one convention transfers to the other with at most a factor of two. Independence of a coarse provenance label does not establish independence of the complete hidden state: a constant label can hide setting-dependent distributions within its fibers. A real closure packet must specify its relation to the complete pre-setting record and supply the context coverage required by its measurement-independence claim.

For generated pair-provenance cases, the harness also checks whether the emitted table is exactly reconstructed by a Bell-local product-screening form. Here $\mathbf{r}=(r_1,\dots,r_n)$ is the outcome vector, $K_i(r_i|s_i,\Pi)$ is wing $i$'s local apparatus kernel, the probability of outcome $r_i$ given only that wing's own setting and the shared record $\Pi$, and $P_\theta(\mathbf{r}|\mathbf{s})$ is the candidate table:

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

[View →](../../../../../equation-mapping.html#corpus-equation-3b844a3d59fa9d1a)

The runtime computes this distance only for contexts carrying screening records, and returns no screening metric if none are supplied. A zero residual therefore certifies only reconstruction on that supplied subset. With complete context coverage and one consistent setting-independent record measure and local kernels, $\Delta_{\mathrm{screen}}=0$ places the proposed table in the screened common-cause class excluded by Bell closure. Conversely, a nonzero distance from one supplied reconstruction does not exclude every other Bell-local representation. A closure candidate must avoid that collapse while still keeping $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ within tolerance.

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

[View →](../../../../../equation-mapping.html#corpus-equation-f02225be9fbe350f)

and two local deterministic apparatus kernels:

$$
K_A(a|A_i,\Pi_k)
=
\mathbf{1}\!\left[
a=\operatorname{sgn}\cos(A_i-\phi_k)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e2f163fcaadd409)

$$
K_B(b|B_j,\Pi_k)
=
\mathbf{1}\!\left[
b=\operatorname{sgn}\cos(B_j-\phi_k-\pi)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-99e20024a6549477)

The generated table is then

$$
P_{\mathrm{gen}}(a,b|A_i,B_j)
=
\sum_k
w_k
K_A(a|A_i,\Pi_k)
K_B(b|B_j,\Pi_k)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-974c75a4bc0c2af8)

Here $\mathbf{1}[\cdot]$ is the indicator of the bracketed condition and $\operatorname{sgn}$ the sign, so each kernel is deterministic: wing $A$ answers $+1$ when its setting angle lies within a quarter turn of the record's axis $\phi_k$, and wing $B$ answers the same question against the opposite axis $\phi_k+\pi$. The built-in instantiation uses $N=720$ midpoint angles $\phi_k=(k-\tfrac12)\,2\pi/N$, the settings $A_0=0$, $A_1=\pi/2$, $B_0=\pi/4$, and $B_1=3\pi/4$, and the convention $\operatorname{sgn}0=+1$; on this grid no setting makes the cosine vanish, so the convention is never invoked. Counting grid points with equal and with opposite signs gives $E(A_i,B_j)=-1+2|A_i-B_j|/\pi$ for separations up to $\pi$, so each of the four expectations has magnitude $\tfrac12$ and $|S|=2$ exactly; the harness reports that value to within floating-point summation error.

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

These scenarios are deliberately small. The singlet and GHZ benchmark tables are the state-vector predictions at the built-in settings. The Hardy benchmark is a hand-written no-signaling table that carries the Hardy pattern with positive term $0.09$; it is not the prediction of a particular quantum state of the pair, so it checks the margin arithmetic rather than agreement with quantum theory. The goal is to catch wiring errors, sign errors, and invalid escape routes before a larger Master Equation packet consumes the residuals.

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

[View →](../../../../../equation-mapping.html#corpus-equation-7c60ad066ae4fbef)

is still a Bell-local product form when $d\rho_{\mathrm{prov}}(\Pi)$ is independent of the settings and $\Pi$ is a complete common-past screen. Such a model fails each Bell-family benchmark separately: it cannot exceed the CHSH local bound, cannot reproduce the four GHZ perfect-correlation signs, and cannot produce a positive Hardy margin, because in each case the product form is a mixture of deterministic local value assignments and the enumeration of those assignments closes the bound. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ closure must therefore derive a stronger object:

$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\mu_{*,T_W}^{(n)}
\left(
B_{\mathbf{r}}^{\mathbf{s}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a64d345d5c74e75e)

where $B_{\mathbf{r}}^{\mathbf{s}}$ is the record-basin subset that resolves to the outcome vector $\mathbf{r}$ under the setting vector $\mathbf{s}$ for the declared preparation, pair or multiplet provenance, local apparatus kernels, coarse-graining, and record window, and the superscript $(n)$ marks the measure on the joint retained record of the $n$ wings, two for a pair and three for a GHZ triplet. This is the same measurement discipline used in [Measurement Ontology](../../quantum/measurement-ontology.md#born-rule-interface), but lifted from single-assembly basin weights to a Bell-family joint record measure.

The hypothesis this object must fail is fixed by the owners this harness serves, and the harness gates follow from it. [Ontology](../../foundations/ontology.md#bell-nonlocality-placement) selects, provisionally until the Bell derivation closes, the substrate-nonseparability route: measurement independence and observer-level no-signaling are retained, and Bell factorizability, the product form above, is the replaced hypothesis. [No-Go Theorems](../no-go-theorems.md#applicability-map) records the same route: the nonfactorizable joint response is carried by a live $c_f$-mediated coordination channel between the two apparatus couplings, gated by pair provenance and operating outside the effective photon cone, which requires the causal-wake speed $c_f$ to exceed the calibrated low-energy photon speed $c_0$. That is why $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ are gates rather than adjustable residuals, and why $\Delta_{\mathrm{screen}}=0$ is a failure. The route carries an obstruction this harness cannot test: Bancal and collaborators showed that a model reproducing the quantum correlations through hidden influences of any finite speed above the light speed permits controllable faster-than-light signaling in suitable arrangements of more than two parties, under their stated causal and no-signaling assumptions. The no-signaling residual here checks only single-wing marginals on the declared two- or three-wing contexts, so a candidate packet must separately state which hypothesis of that theorem its coordination channel fails and supply the multipartite probability law on which observer no-signaling is then re-evaluated.

The native proof packet must supply:

1. a pair-provenance ledger $\Pi_{AB}$ or multiplet ledger $\Pi_{ABC}$;
2. local apparatus kernels derived from the Stern-Gerlach-like or photon-analyzer channel;
3. one finite-window measure $\mu_{*,T_W}^{(n)}$ on the retained joint record manifold;
4. a compression audit showing why the completed record law does not reduce to Bell-local product screening;
5. no-signaling and measurement-independence residuals evaluated on the same packet, including all proper-subset marginals for a multipartite claim and complete coverage of the required contexts and provenance variables;
6. a premise audit against the finite-speed signaling obstruction: the hypothesis of that theorem the coordination channel fails, and the multipartite probability law on which observer no-signaling is re-evaluated.

The single-assembly Stern-Gerlach response in [Angular Momentum and Spin](../../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) is a prerequisite, not the Bell proof itself. Bell-family closure starts only after the pair-provenance measure and the joint record basins are explicit.

## Acceptance Boundary

Passing this harness means only that the residual calculations and negative controls behave as expected. It does not validate $\mathbb{A}\mathbb{A}\mathbb{A}$ quantum closure.

A future closure packet becomes promotable only if:

1. the probability tables are generated from declared substrate variables rather than written by hand;
2. $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ remain within tolerance, because measurement independence and observer no-signaling are accepted rather than replaced;
3. CHSH, GHZ, and Hardy benchmarks are evaluated together;
4. the same $\mu_{*,T_W}^{(n)}$ also agrees with the record and repeated-frequency discipline in [Quantum Operator Mapping](../../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence);
5. the product-screening audit does not collapse the completed substrate record, which plays the role of Bell's complete hidden state $\lambda$, into $\int_{\Pi}\prod_iK_i\,d\rho_{\mathrm{prov}}$;
6. failure cases are reported when the model reduces to classical-axis response, separable pair measure, product-screened pair provenance, context-independent GHZ values, forbidden Hardy events, setting-dependent provenance, or signaling marginals, or when its coordination channel's multipartite predictions permit signaling.

## Sources

The finite-speed obstruction named in the proof scaffold boundary is J.-D. Bancal, S. Pironio, A. Acín, Y.-C. Liang, V. Scarani, and N. Gisin, *Quantum non-locality based on finite-speed causal influences leads to superluminal signalling*, Nature Physics 8, 867–870 (2012), [DOI 10.1038/nphys2460](https://doi.org/10.1038/nphys2460). It is the same source the Bell entry of [No-Go Theorems](../no-go-theorems.md#sources) cites, and it enters this chapter only as an observer-level constraint on the selected route, never as a premise of an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation. The CHSH local bound and the Tsirelson bound used by the gates are standard results whose statements belong to [Bell's Theorem](../../philosophy-history/theory-bridges/bell-theorem.md); this chapter verifies the local bound by the enumeration stated beside the CHSH combination and uses the Tsirelson value as a benchmark constant.
