# EPR--Bell Closure Discussion Record

## Authority And Scope

This file preserves the detailed Bell discussion completed on 2026-07-28 and
the live-corpus status rechecked when this lane was created on 2026-08-05. It
is an evidence and reasoning record, not a theory decision. The source search
for experimental successors was current through 2026-07-28; later claims must
be refreshed before being described as current.

No route described below is established canon. In particular, the live
finite-$c_f$ route is a provisional working proposal with an unresolved
Bancal burden, not an approved or irrevocable solution.

## Tim Maudlin Video Source Intake — 2026-08-05

The focused [source-mining packet](../source-mining/tim-maudlin-epr-bell-video-source-mining.md)
captures Tim Maudlin's July 27, 2026 EPR lecture. The source is useful for the
EPR setup and measurement-ontology distinctions, but it explicitly stops
before deriving Bell's theorem. Bell 1964, CHSH 1969, and primary experiments
remain the authority for the theorem and experimental constraints.

Three retained insights sharpen this lane without selecting a route:

1. A single particle's screen location may be decided before its local click
   without creating a two-wing Bell problem. “Decided at entanglement” is a
   stronger claim because it must supply one joint response law across later,
   independently selected setting pairs.
2. Definite substrate states can explain why a detector produces one real
   record, but ontic definiteness alone does not derive the two-wing
   setting-indexed distribution.
3. A source conservation ledger constrains the pair but does not specify the
   local setting responses or change the Bell bound. Conservation, local
   response, live coordination, and trial selection must remain separate
   rows.

The lecture's information language also yields a compact comparison map. For
a complete declared state $\lambda$, Bell factorization combines outcome
independence and remote-setting independence:

$$
I(A:B\mid X,Y,\lambda)=0,
$$

$$
I(A:Y\mid X,\lambda)=0,
\qquad
I(B:X\mid Y,\lambda)=0.
$$

Plainly: after the complete state and settings are fixed, the outcomes do not
carry unexplained residual dependence and neither local response uses the
remote setting.

Measurement independence and operational no-signaling are different rows:

$$
I(\lambda:X,Y)=0,
$$

$$
I(A:Y\mid X)=0,
\qquad
I(B:X\mid Y)=0.
$$

Plainly: the settings are independent of the complete past, while the
averaged local records reveal no remote setting. A model can preserve
no-signaling while rejecting Bell factorization.

No new gate is created. These diagnostics sharpen EPRB-001 and EPRB-004.

## Tim Maudlin Bell-Foundations Interview Intake — 2026-08-05

The focused
[source-mining packet](../source-mining/tim-maudlin-bell-foundations-2022-video-source-mining.md)
captures Maudlin's October 10, 2022 interview. His central position is that
Bell rules out locality, not reality or determinism, once statistical
independence is retained. He treats Bohmian mechanics as proof of concept for
a deterministic, definite, explicitly nonlocal completion.

The operator's garden-path metaphor has a strong historical core. Bell's
early hidden-variable paper supports EPR's deeper-completion program by
rejecting the older impossibility proofs, then identifies distant-system
independence as the serious condition to test. His 1964 paper follows that
path and finds that a Bell-local, measurement-independent completion cannot
recover the quantum predictions. Bell therefore “backed into” the theorem in
the discovery-history sense, but the theorem as published was a deliberate
mathematical closure of the local branch. Nonlocal dynamics, measurement
dependence, retrocausal dependence, and defects in the experiment-to-trial
map remain logically distinct routes with different burdens.

The interview also sharpens the apparatus audit. If $D_A$ and $D_B$ declare
which local records are included, then the analyzed distribution is

$$
P_{\mathrm{obs}}(a,b\mid x,y)
=
P(a,b\mid x,y,D_A=1,D_B=1).
$$

Plainly: setting-, outcome-, or hidden-state-dependent losses can select a
different subensemble for each setting pair. A substrate detector objection
must therefore expose its inclusion law and predict an efficiency, threshold,
or timing-window signature.

Maudlin's strongest superdeterminism rhetoric is not promoted. Determinism
does not imply measurement dependence, but Bell also does not prove that
measurement-dependent models are impossible. A shared Noether sea would have
to derive a quantitatively adequate pair--setting dependence and an
independent experimental discriminator.

The interview's PBR summary is also narrowed to the theorem's actual
preparation-independence and ontic-overlap assumptions. No new gate or Bell
route is created.

## Central Result

A complete passive record made when a pair becomes entangled cannot reproduce
the observed Bell violations when all three of the following remain true:

1. each wing responds only to its own later setting and the complete past
   state;
2. the later setting pair is statistically independent of that complete past
   state; and
3. the experimental trials are validly identified and sampled.

This excludes the Bell-local, measurement-independent version of “decided at
entanglement.” It does not exclude every possible meaning of the phrase. The
phrase can survive only by changing a named assumption: remote-setting
dependence through a live channel, measurement dependence, retrocausal
dependence, a new global nonseparable primitive, or a defect in trial
selection/detection. Each choice has a different ontology and experimental
burden.

Plainly: adding more detail to the pair's past does not help if both detectors
still act locally and their later settings are independent of that past.

## Bell Trial And CHSH Arithmetic

One trial records two selected settings and two binary outcomes:

$$
(x_i,y_i,a_i,b_i),
\qquad a_i,b_i\in\{-1,+1\}.
$$

Plainly: the record says which test each station selected and which of two
answers each detector returned.

For a fixed setting pair, the recorded correlation is

$$
E_{xy}
=
\frac{N_{++}+N_{--}-N_{+-}-N_{-+}}
{N_{++}+N_{--}+N_{+-}+N_{-+}}.
$$

Plainly: equal outcomes count positively, unequal outcomes count negatively,
and the average lies between $-1$ and $+1$.

The CHSH quantity used in the discussion was

$$
S=E_{00}+E_{01}+E_{10}-E_{11}.
$$

Plainly: CHSH combines the four correlations produced by the four possible
pairs of detector settings.

Bell factorization is

$$
P(a,b\mid x,y,\lambda)
=
P(a\mid x,\lambda)P(b\mid y,\lambda).
$$

Plainly: after the complete relevant past state is specified, Alice's result
does not depend on Bob's setting and Bob's result does not depend on Alice's
setting.

Measurement independence is

$$
\rho(\lambda\mid x,y)=\rho(\lambda).
$$

Plainly: selecting later detector settings does not select a different
distribution of complete past states.

For deterministic local responses, let $A_x,B_y\in\{-1,+1\}$. For every
fixed $\lambda$,

$$
s(\lambda)
=A_0B_0+A_0B_1+A_1B_0-A_1B_1
=A_0(B_0+B_1)+A_1(B_0-B_1).
$$

Plainly: $B_0$ and $B_1$ are either equal or opposite. One bracket is then
zero and the other is $+2$ or $-2$.

Therefore $|s(\lambda)|=2$, and measurement independence permits the same
distribution to average all four setting pairs:

$$
S=\int d\lambda\,\rho(\lambda)s(\lambda),
\qquad |S|\le2.
$$

Plainly: averaging numbers that are never outside $[-2,2]$ cannot leave that
interval. Stochastic local models also obey the bound because their local
randomness can be added to a larger $\lambda$.

Quantum mechanics predicts for a spin singlet

$$
E(\hat x,\hat y)=-\hat x\cdot\hat y=-\cos\theta_{xy},
$$

and optimal axes give

$$
|S|=2\sqrt2\approx2.828.
$$

Plainly: the quantum angular correlation cannot be reproduced by one
measurement-independent mixture of local answer tables, although it remains
below the quantum Tsirelson ceiling.

The historical theorem sources are
[Bell (1964)](https://journals.aps.org/ppf/abstract/10.1103/PhysicsPhysiqueFizika.1.195)
and
[Clauser, Horne, Shimony, and Holt (1969)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.23.880).

## Why Bell Violation Is Not A Messaging Protocol

Quantum no-signaling requires

$$
P(a\mid x,y)=\sum_bP(a,b\mid x,y)=P(a\mid x),
$$

with the analogous equality for Bob.

Plainly: Bob's local outcome statistics do not reveal Alice's selected
setting. The correlation becomes visible only when ordinary communication is
used to compare the two records.

The calculation of counts, correlations, $S$, and a declared test statistic
is arithmetic once the trial table is fixed. Mapping hardware into that table
requires physical judgments about trial boundaries, pairing, no-click events,
heralding, setting and outcome event times, spacelike separation, setting
predictability, memory, nonstationarity, and stopping rules.

Plainly: the inequality is exact mathematics; the force of an experiment also
depends on whether its records really satisfy the declared trial model.

## Assumption And Mechanism Ledger

| Assumption | Exact content | Mechanism that would alter it |
| --- | --- | --- |
| Local response / Bell factorization | The complete $\lambda$ screens the wings into $P(a\mid x,\lambda)P(b\mid y,\lambda)$. | A live remote-setting influence, failure of causal screening outside a finite-speed cone, or a new global nonseparable response law. |
| Measurement independence | $\rho(\lambda\mid x,y)=\rho(\lambda)$. | A common-past source/RNG correlation, deterministic setting leakage, or later settings changing the past state. |
| Trial identification | Each tuple is one declared physical trial. | Ambiguous pairing, overlapping emissions, setting-dependent boundaries, or invalid heralding. |
| Detection validity | All declared trials are represented, or no-click is retained as an outcome. | Setting- or outcome-dependent loss and unfair sampling. |
| No outcome-dependent postselection | Inclusion is fixed without using the tested outcomes. | Coincidence or acceptance rules correlated with outcomes or settings. |
| Spacelike event mapping | The relevant remote setting cannot reach the outcome at or below the tested speed. | Misidentified setting/outcome events, timing error, cable leakage, or insufficient baseline. |
| Statistical validity | The null test covers allowed memory, setting bias, stopping, and nonstationarity. | An IID-only analysis of adaptive devices, optional stopping, or underestimated setting predictability. |

Plainly: the phrase “local realism” is too compressed for this work. Every
candidate mechanism must say which row it changes.

## “Decided At Entanglement” Scope

Let $\lambda$ include the complete source state, architrino identities and
polarities, framed pair-braid and linking data, path histories, Noether sea
state, hidden variables, and device histories already present before the
settings are selected. If

$$
a=A(x,\lambda),
\qquad b=B(y,\lambda),
\qquad a,b\in\{-1,+1\},
$$

then the CHSH proof above applies for every distribution of $\lambda$ when
$A$ has no $y$ dependence, $B$ has no $x$ dependence, and $\lambda$ is
independent of $(x,y)$.

Plainly: $q\mathbf V$, braid complexity, richer source memory, or a more
elaborate Noether-sea history enlarges the past record but does not change the
inequality while factorization and independence remain intact.

The defensible closure statement is:

> The Bell-local, measurement-independent, valid-sampling version of
> “decided at entanglement” is mathematically excluded and experimentally
> rejected.

The unqualified claim that “decided at entanglement is mathematically closed”
is overstated. Measurement dependence and live remote-setting dependence can
preserve a broader use of the phrase, while retrocausality, a new global law,
or a trial-selection mechanism changes still other premises.

Under the current absolute-time, forward-causal ontology, a live finite-$c_f$
channel and a common-past measurement-dependence mechanism are structurally
compatible possibilities. Retrocausality conflicts with the prohibition on
advanced support. An instantaneous or global constraint would require a new
or changed primitive. Strictly wing-local detector dynamics already belongs
inside $A(x,\lambda)$ and $B(y,\lambda)$ and cannot help.

## Experimental Chronology

The chronology correction is categorical: the 2015 loophole-free experiments
used laboratory setting generators, not stars or quasars. Stellar setting
control arrived in 2017 and high-redshift quasar control in 2018.

### 2015 loophole-controlled tests

- **Hensen et al.** used event-ready electron spins in nitrogen-vacancy
  centres separated by $1.3$ km. A middle photon-detection event heralded the
  remote spin entanglement before random bases and high-efficiency spin
  readout. The 245 heralded trials gave $S=2.42\pm0.20$ and $p\le0.039$
  against the stated Bell-local null with device memory allowed. The small
  event-ready sample was the principal statistical limitation.
  [Nature 526, 682--686 (2015)](https://www.nature.com/articles/nature15759)
- **Giustina et al.** used polarization-entangled photons, physical random
  generators, electro-optic setting selection, and superconducting
  transition-edge sensors across an approximately $58$ m arrangement. Arm
  efficiencies were about $78.6\%$ and $76.2\%$. A CH/Eberhard analysis
  retained singles and locally defined trial slots. The $3510$ s run gave
  $J=7.27\times10^{-6}$ in its positive-violation convention and
  $p\le3.74\times10^{-31}$ after accounting for device memory and measured
  setting predictability.
  [PRL 115, 250401 (2015)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.115.250401)
- **Shalm et al.** used $1550$ nm polarization-entangled photons,
  fast XOR-combined random setting streams, Pockels cells, and superconducting
  nanowire detectors. Alice and Bob were $184.9$ m apart; detector efficiency
  was $91\pm2\%$, and total system efficiencies were $74.7\pm0.3\%$ and
  $75.6\pm0.3\%$. The five-pulse analysis covered $177{,}358{,}351$ trials,
  with raw $p=5.9\times10^{-9}$ and adjusted $p=2.3\times10^{-7}$. Its
  martingale analysis did not assume IID trials.
  [PRL 115, 250402 (2015)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.115.250402)

Plainly: these experiments jointly attacked locality, detection, coincidence,
and memory loopholes with different apparatus tradeoffs. They exclude the
declared Bell-local, measurement-independent null under their trial mappings;
they do not exclude measurement dependence, nonlocal models, or
retrocausality.

### 2017 stellar settings and 2018 quasar settings

- **Handsteiner et al. (2017)** used red/blue photons from Milky Way stars to
  drive analyzer settings for separate laboratory entangled photons. Two
  $179$ s runs gave $S=2.425$ and $S=2.502$, with adversarially adjusted
  significances of at least $7.31\sigma$ and $11.93\sigma$ and reported
  $p\le1.8\times10^{-13}$ and $p\le4.0\times10^{-33}$. The construction moved
  an ordinary common cause roughly $600$ years into the past but assumed fair
  sampling and astrophysical integrity of the color bits.
  [PRL 118, 060401 (2017)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.118.060401)
- **Rauch et al. (2018)** split high-redshift quasar light at a $630$ nm color
  boundary; the detected red/blue channel selected the local analyzer setting
  for separate entangled photons. Quasar lookback times included $7.78$ Gyr,
  $3.22$ Gyr, and $12.21$ Gyr; one quasar pair's past light cones last
  intersected $13.15$ Gyr ago. Runs gave $S=2.65$ and $S=2.63$, with
  $p\le7.4\times10^{-21}$ and $p\le7.0\times10^{-13}$. The stronger run
  excluded candidate common causes from about $96\%$ of the relevant
  past-light-cone four-volume under the paper's cosmological model. It assumed
  fair sampling, fair coincidences, astrophysical setting integrity, and a
  $2.66$ ns coincidence window.
  [PRL 121, 080403 (2018)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.121.080403)

Plainly: cosmic photons controlled the setting choices, not the laboratory
Bell carriers or outcomes. These tests constrain where a source-setting
common cause could have been arranged; they do not logically eliminate
superdeterminism.

### Category leaders identified through 2026-07-28

| Category | Example identified in the discussion | Result and limitation |
| --- | --- | --- |
| Simultaneous locality and detection closure in CHSH | Storz et al. (2023), superconducting qubits across a cryogenic link | More than $10^6$ trials; $S=2.0747\pm0.0033$; $p<10^{-108}$; measured causal distance $32.824$ m, light time $109.489\pm0.015$ ns, and trial duration $107.40\pm0.26$ ns. Laboratory RNGs, not cosmic settings. [Nature 617](https://www.nature.com/articles/s41586-023-05885-0) |
| Statistical strength | Zhao et al. (2024), loophole-free photonic Hardy test | Detection efficiency $82.2\%$, state fidelity $99.10\%$, $4.32$ billion trials over $6$ h, Hardy value $4.646\times10^{-4}$, and PBR bound $p\le10^{-16348}$. It is a Hardy test, so its statistic is not directly comparable to CHSH $S$. [PRL 133, 060201](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.133.060201) |
| Cosmic setting provenance | Rauch et al. (2018) | Long astronomical lookback among the audited cosmic tests, with fair-sampling and astrophysical assumptions. |
| Baseline | Micius satellite test (2017) | Ground stations separated by $1203$ km and $S=2.37\pm0.09$; high loss left detection/fair-sampling and coincidence limitations. [Science 356, 1140--1144](https://doi.org/10.1126/science.aan3211) |
| Finite-influence-speed bound | Yin et al. (2013) | A conditional $v_{\mathrm{influence}}/c_0\ge1.38\times10^4$ bound for a specified preferred-frame model; fair sampling remained. [PRL 110, 260407](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.110.260407) |
| Multipartite relevance | Huang et al. (2022), genuine tripartite network nonlocality | $7.57\sigma$ under strict locality timing, with postselection and fair sampling; not a loophole-free implementation of Bancal's four-party spacetime construction. [PRL 129, 060401](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.129.060401) |

Plainly: no experiment is strongest in every dimension. Improving baseline,
setting provenance, efficiency, null probability, or multipartite structure
can weaken another category.

## Bulk Assemblies And Apparatus Audit

Treating photons, detectors, clocks, cables, random-number generators, and the
surrounding Noether sea as assemblies does not automatically invalidate Bell
statistics. A strictly wing-local apparatus response is already part of
$A(x,\lambda)$ or $B(y,\lambda)$ and remains inside the CHSH proof when
measurement independence and valid sampling hold.

Legitimate substrate audits include detector response, setting generation,
event-ready heralding, time tagging, coincidence windows, missed detections,
channel-dependent delays, memory, postselection, and shared-sea correlations.
Each proposal must name the altered Bell assumption and predict a dependence
on setting rate, efficiency, timing window, baseline, orientation, or sea
state.

Plainly: apparatus skepticism is legitimate, but “the apparatus is an
assembly” is not itself a mechanism or an assumption failure.

## Noether-Sea Route Map

Within the current forward-causal absolute-time ontology, a complete shared
medium can play three roles:

1. a passive common-past record, which merely enlarges $\lambda$;
2. a live cross-wing channel during measurement, which changes Bell
   factorization; or
3. a source of statistical dependence between settings and $\lambda$, which
   changes measurement independence.

This trichotomy is conditionally exhaustive only after $\lambda$ is complete,
trials are valid, and the present ontology is retained. Retrocausality is an
additional causal-model route but violates the current ban on advanced
support. A global or infinite-speed nonseparable law would add or change a
substrate primitive. Apparatus/trial effects alter the experimental mapping
rather than the ideal causal trichotomy.

## Finite-Influence-Speed Bounds

Salart et al. used an approximately east--west $18$ km baseline, more than
$24$ h of data, $360$ s analysis periods, and an inferred relative timing
uncertainty of $323$ ps. Under a preferred frame in which Earth moves below
$10^{-3}c_0$, they reported a lower bound above $10^4c_0$.
[Nature 454, 861--864 (2008)](https://www.nature.com/articles/nature07121)

Yin et al. used random electro-optic settings, a $15.3$ km east--west receiver
separation, a midpoint source, $350$ ps timing uncertainty, and $12$ h of
continuous spacelike Bell violation. For the worst directional case with the
Earth-centred frame moving at $\beta=10^{-3}$ relative to the hypothesized
preferred inertial frame, they reported

$$
\frac{v_{\mathrm{influence}}}{c_0}\ge1.38\times10^4.
$$

Plainly: this is a conditional lower bound inside a finite-influence,
preferred-frame model. It depends on the baseline, simultaneity uncertainty,
Earth velocity, directional model, and fair-sampling assumption; it is not a
universal measured speed.

The source is
[PRL 110, 260407 (2013)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.110.260407).
Identifying that hypothetical influence with primitive wakes, and therefore
with $c_f$, is an additional model-dependent inference.

## Bancal Obstruction

Bancal et al. arrange four parties $A,B,C,D$ in a preferred frame. $A$ and
$D$ act earlier; $B$ and $C$ act later but remain outside each other's
finite-$v$ influence cones. Conditional finite-speed screening then requires
the disconnected late pair to be Bell-local after the earlier data are fixed:

$$
P(b,c\mid y,z,a,x,d,w)
=
\sum_\lambda q(\lambda\mid a,x,d,w)
P(b\mid y,\lambda)P(c\mid z,\lambda).
$$

Plainly: once the earlier events are supplied, no finite-$v$ message can pass
between the two late wings, so the model says their remaining response is
local.

Together with operational no-signaling, the paper derives

$$
S_{\mathrm{HI}}\le7,
$$

while specified measurements on a four-party entangled state yield
approximately

$$
S_{\mathrm{HI}}\simeq7.2.
$$

Plainly: finite-speed screening, the required quantum marginals, measurement
independence, and exact no-signaling cannot all hold in that construction.
The resulting failure can appear as observer-accessible superluminal
signaling in a three-party marginal.

The theorem does not ban every conceivable medium. A model may instead use
infinite/discontinuous influence, fail to reproduce a required marginal,
change measurement independence, permit operational signaling, deny
conditional locality outside the declared cones, or introduce a different
global causal structure. An $\mathbb{A}\mathbb{A}\mathbb{A}$ shielding claim
must identify the changed premise and derive the replacement distribution.

The primary source is
[Bancal et al., Nature Physics 8, 867--870 (2012)](https://www.nature.com/articles/nphys2460).

## Finite-$c_f$ Falsifier And Dressing Hierarchy

If Alice's setting becomes physically available at absolute time
$T_A^{\mathrm{set}}$ and Bob's result closes at $T_B^{\mathrm{out}}$, a
speed-$c_f$ channel can connect them only when

$$
T_B^{\mathrm{out}}-T_A^{\mathrm{set}}
\ge\frac{L_{AB}}{c_f}.
$$

Plainly: the relevant setting information must cross the baseline before the
remote outcome becomes irreversible.

For a setting-independent reachable fraction $r$, with reachable and
unreachable laws $P_1$ and $P_0$,

$$
P=rP_1+(1-r)P_0,
\qquad S=rS_1+(1-r)S_0.
$$

Plainly: this linear mixture follows only under the stated mixing assumption.
Timing jitter or setting-dependent reach can give distinct fractions for each
setting pair.

If the live channel is the sole source of nonfactorizability, the unreachable
law must be Bell-local under measurement independence, so $|S_0|\le2$.
Nothing forces $S_0=2$. A usable falsifier must specify baseline,
preferred-frame ordering, setting-availability intervals, outcome-registration
intervals, propagation and detector latencies, $c_f$, directional reach,
setting-specific reach fractions, the complete fallback law, missed
detections, and trial acceptance.

Identifying the Yin bound with primitive wakes would conditionally imply

$$
\frac{c_f}{c_0}\ge1.38\times10^4.
$$

Plainly: the inequality is not a measurement of $c_f$; it results only after
the hypothetical Bell influence is identified with the primitive wake
channel.

The hierarchy alone does not imply photon dispersion. A frequency-dependent
crossover requires an additional constitutive law such as
$c_\gamma(\omega)$ or a frequency-dependent dressing factor.

## Scorecard Of The Nine Discussion Points

| Point | Grade | Surviving conclusion |
| --- | --- | --- |
| Shared-source exclusion | Derived and experimentally engaged | Correct with local response, measurement independence, and valid trials. |
| Measurement ontology | Correct but incomplete | Definite substrate states do not supply the two-wing correlation law. |
| Interpretation-independent apparatus statistics | Derived with mapping qualifications | Bell arithmetic does not assume a fundamental wavefunction; physical application still depends on trials, timing, detectors, and statistics. |
| Noether-sea trichotomy | Inferred and conditionally exhaustive | Passive record, live forward channel, and setting/source correlation cover present forward-causal options once the state and trial model are complete. |
| Finite-speed live channel | Speculative and constrained | It can break factorization in bipartite logic but inherits timing bounds and Bancal. |
| Bancal obstruction | Derived theorem, scope-limited | It excludes finite-speed models satisfying the theorem's screening, free-setting, quantum-reproduction, and no-signaling premises. |
| Finite-$c_f$ falsifier | Legitimate but under-specified | Reach failure invokes a declared fallback law; it does not by itself imply $S\to2$. |
| Dressing hierarchy | Conditional bound plus inference; dispersion speculative | Equating influence speed with $c_f$ is model-dependent, and dispersion needs an extra constitutive profile. |
| Detector-and-photon audit | Legitimate open derivation | It can discover concrete assumption failures or signatures, but cannot overturn Bell without naming the failed assumption. |

Plainly: the shared-source no-go, the interpretation-independent arithmetic,
and the apparatus audit survive with precise scope. The live-channel,
crossover, and dispersion claims remain proposals, while Bancal is the major
unclosed theorem obstruction.

## Live Corpus Decision Reconstruction

The live corpus recheck on 2026-08-05 found:

- the [ontology hub](../../../content/markdown/aaa/foundations/ontology.md)
  calls live finite-$c_f$ coordination the “working selection,” but in the
  same sentence calls it provisional until the Bell derivation closes;
- the [Bell bridge](../../../content/markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md)
  calls itself a bridge rather than the final mechanism and also prohibits
  usable signal, energy, or causal-wake transfer between spacelike detectors;
- the
  [entanglement bridge](../../../content/markdown/aaa/philosophy-history/theory-bridges/entanglement-nonlocality.md)
  calls pair-provenance gating plus live response a proof route, not a
  completed Bell derivation;
- the
  [quantum-causality page](../../../content/markdown/aaa/quantum/reality-quantum-causality.md)
  calls outside-effective-cone wake channels a candidate mechanism class that
  does not close Bell by itself;
- the [absolute-time owner](../../../content/markdown/aaa/foundations/absolute-time.md)
  establishes forward finite-$c_f$ propagation and excludes advanced and
  instantaneous interaction, but does not derive Bell coordination;
- the [Noether-sea page](../../../content/markdown/aaa/spacetime/noether-sea.md)
  supplies no Bell-route decision, and its $c_{\mathrm{eff}}<c_f$ row is a
  constitutive hypothesis;
- the [Quantum Closure queue](../quantum-closure/work-queue.md) marks detector
  kernels, invariant and pair-provenance measures, the Bell gate, and the Bell
  rewrite deferred/blocked, with nothing verified;
- the [scoped pair-provenance decision](../quantum-closure/pair-provenance-local-compliance-scope-decision.md)
  rejects ER=EPR and expressly does not modify the Bell program or establish a
  mechanism.

Plainly: discussion of a route is not a decision record. The corpus contains a
provisional ontology-hub preference, but no scoped decision validly settles a
live finite-speed Bell mechanism.

There is also a direct tension: the ontology hub says the live channel carries
the nonfactorizability, while the Bell bridge and Quantum Closure gate prohibit
detector-to-detector causal-wake transfer. These cannot all describe one
mechanism. If remote-setting-dependent wake input reaches the other detector,
the live channel changes Bell factorization. If no such transfer occurs, a
passive record returns to the Bell-local no-go unless another nonlocal
primitive or measurement dependence is declared.

## Available $\mathbb{A}\mathbb{A}\mathbb{A}$ Routes

| Route | Assumption changed | Current status |
| --- | --- | --- |
| Bell-local shared record | None | Excluded as an explanation under measurement independence and valid sampling; retain as negative control. |
| Live finite-speed coordination | Bell factorization | Compatible with forward absolute time in form, but underived, timing-constrained, and Bancal-obstructed. |
| Measurement dependence | Statistical independence of $(x,y)$ and $\lambda$ | Mathematically viable and forward-causal; contrary to the ontology hub's present declared policy and constrained by cosmic-setting tests. |
| Retrocausal dependence | Forward-only causal support, usually measurement independence | Requires changing the existing no-advanced-interaction ontology. |
| Global or infinite-speed nonseparable law | Finite-$c_f$ causal screening | Could evade finite-speed Bancal reasoning only by adding or changing a substrate primitive. |
| Apparatus or trial-model effect | Sampling, pairing, detection, postselection, spacelike mapping, or statistics | Legitimate audit route only when a concrete mechanism survives modern controls. |
| Ontic randomness alone | None relevant | Does not help; stochastic Bell-local, measurement-independent models still obey CHSH. |

Plainly: no route is presently established. Each surviving route must name a
different assumption or ontology change.

## Independent Recommendation Preserved From The Discussion

Retain the Bell-local shared-record model as a required negative control, not
as a candidate explanation of Bell violations. Keep live finite-$c_f$
coordination under investigation only as a conditional comparison model, with
a four-party Bancal-premise audit before any two-wing curve fitting. Keep
measurement dependence visible as the other forward-causal comparator rather
than importing it silently. Do not treat retrocausality or a global law as
compatible with the existing ontology without an explicit ontology decision.

The honest claim status is: Bell closure is unresolved; passive predecision is
excluded under named conditions; finite-speed coordination is provisional and
theorem-obstructed; all remaining routes require an explicit Bell-assumption
or ontology change.

## Pending Central Question

Do you intend “decided at entanglement” to preserve both local response and
statistical independence of the later detector settings from the pair's
complete past state?
