# Neutrino Conjugation — Dirac Rides on the $C$-Parity of the Handedness Invariant

**Date:** 2026-07-14
**Status:** staged insight; conditional entailment established, antecedent open. Gate promoted to `neutrinos.md`. Not a settled prediction.
**Owner lane:** braid-ideal (the χ-theorem's dependence on the polarity dipole was flagged open by the §99 dispatch packet, addition C).

---

Closure goal: Establish whether the $\mathbb{A}\mathbb{A}\mathbb{A}$ neutrino assembly is self-conjugate or conjugate-distinct, and state the neutrinoless double-beta outcome that falsifies the answer.

## Verdict

**Conditional, not settled.** If the neutrino's handedness invariant is $C$-odd, the assembly is conjugate-distinct and the branch is Dirac-like, entailed rather than chosen. Whether it is $C$-odd is open, and it is not decidable from anything currently exhibited. The corpus is *committed* to $C$-odd by a second route (exact $CP$), but commitment is not establishment.

The earlier reading of this result — that Dirac was forced outright — overweighted a specific geometric realization. It does not survive the constraint that the retained braid geometry is unknown.

## Two routes that cannot decide it (recorded so they are not retried)

**The §99 charge ledger.** Requirement 6 certifies the **monopole** only — net $0$ for the photon, net $-1e$ for the electron. Conjugation turns on a dipole-grade quantity that the §99 object does not carry: requirement 7 records no explicit cap degree of freedom, and the §99 spec states that the run "does not adjudicate the handedness relation $\chi=\operatorname{sign}(p\cdot S)$, because the cap dipole $p$ is absent from the modeled object." Addition C flagged the boundary before the run. A cap-free planar model is silent on this by construction.

**Observed maximal parity violation.** Both candidate invariants below are $P$-odd, so both reproduce maximal parity violation in the weak channel. The observation does not discriminate. This is the trap worth recording: the handedness data *feels* like it should settle conjugation and does not.

## The lemma, stated realization-free

The step is short and does not depend on the braid geometry:

**Lemma.** If the neutrino carries a $C$-odd handedness invariant $\chi\neq0$, then $C(\nu)\neq\nu$.
*Proof.* $C$-oddness gives $\chi\to-\chi$. Self-conjugacy requires $C(\nu)=\nu$ up to phase, hence $\chi=-\chi$, hence $\chi=0$, contradicting $\chi\neq0$. $\square$

**Corollary (state count).** The orbit under $\{1,C,P,CP\}$ has four members — $\nu$ and $\bar\nu=CP(\nu)$ at one sign of $\chi$, both weak-coupled; $C(\nu)$ and $P(\nu)$ at the other, both sterile. Four with two decoupled is the Dirac count; Majorana carries two.

The lemma needs only the *transformation character* of the invariant, not the structure realizing it. Any $C$-odd polar quantity locked to the spin forces the conclusion, whatever the assembly looks like. The spindle family's cap dipole $\mathbf p$ is one realization and is not privileged.

## The open joint — and it is the whole gate

A chiral object admits two pseudoscalars of **opposite $C$-parity**:

| invariant | $C$ | $P$ | $CP$ | entails Dirac? |
| --- | --- | --- | --- | --- |
| polarity type, $\operatorname{sign}(\mathbf p\cdot\mathbf S)$ | odd | odd | even | **yes** |
| helicity type, $\operatorname{sign}(\mathbf v\cdot\mathbf S)$ | **even** | odd | odd | no |

Only the $C$-odd branch entails Dirac. A $C$-even handedness invariant leaves the neutrino free to be self-conjugate.

**The near-photon geometry makes the $C$-even possibility live rather than remote.** The photon is the fully locked contra-rotating pro/anti pair and is a $C$-eigenstate — genuinely its own antiparticle. The neutrino is the same pair, just off the lock. Conjugation swaps pro $\leftrightarrow$ anti; on a symmetric pair that can map the assembly to itself. So the whole question reduces to: **is the residual internal-binary mismatch $\delta\Omega_{\mathrm{bin}}$ that keeps the neutrino off the photon lock $C$-odd or $C$-even?** The near-photon picture supplies no answer, and the closer the neutrino sits to the photon, the more the self-conjugate reading has going for it.

## Why $C$-odd is not a free choice

The structural origin of exact $CP$ at leading order is precisely that $C$ and $P$ each reverse $\chi$ while $CP$ preserves it. A $C$-even handedness invariant is $CP$-odd and forfeits that derivation. So the corpus is committed to $C$-odd by an independent route — but neither route rests on a retained geometry that has been exhibited, and the exact-$CP$ derivation carries the same conditional grade ("conditional on a retained chiral object").

This is the useful structure: **exact $CP$ and Dirac are the same bet.** They are not two predictions; they are one $C$-parity assumption read twice.

## Claim levels

| claim | grade |
| --- | --- |
| The pairwise causal-wake law is $C$-even and $P$-even | derived (already corpus; a theorem about the law, geometry-independent) |
| $C$-odd $\chi\neq0\Rightarrow C(\nu)\neq\nu\Rightarrow$ conjugate-distinct | **derived**, realization-free, this document |
| Four-state orbit = Dirac count, two sterile | **derived**, conditional on the same antecedent |
| The handedness invariant is $C$-odd rather than $C$-even | **assumed** — the gate; not established, not decidable from parity-violation data |
| $\mathbb{A}\mathbb{A}\mathbb{A}$ predicts no $0\nu\beta\beta$ | **conditional on the assumption above**, not free-standing |
| $\chi$ is cycle-invariant rather than cycle-averaging | **unchecked** |

## Falsifier

By the black-box argument, an observed $0\nu\beta\beta$ implies a Majorana mass component through any mechanism, forcing the handedness invariant to be $C$-even and removing the exact-$CP$ derivation with it. Those two fall together.

A null result does **not** establish the $C$-odd branch: the $C$-even alternative also predicts suppression whenever its self-conjugate coupling is small. This gate is therefore falsifiable but not confirmable from $0\nu\beta\beta$ alone — the decisive work is internal.

External state (measured): no signal. KamLAND-Zen full $800$ dataset, $2.1$ ton·yr of $^{136}$Xe, $T_{1/2}>3.8\times10^{26}$ yr at 90% C.L., $m_{\beta\beta}\lesssim28$–$122$ meV across nuclear matrix elements. LEGEND-200 + GERDA + Majorana Demonstrator in $^{76}$Ge, $T_{1/2}>2.8\times10^{26}$ yr. The matrix-element spread is a factor-of-four noise floor.

## Corpus inconsistency this exposed (resolved 2026-07-14)

The Dirac/Majorana gate in `neutrinos.md` read as agnostic-pending-data: revise "only by observable gates, not by importing a sterile-neutrino or Majorana interpretation as doctrine," and a null result "does not by itself prove the current Dirac-like geometry."

That under-claimed in one direction and over-claimed in another. The theory is not agnostic between Dirac and Majorana *given* a $C$-odd invariant — the algebra decides it. But it is also not entitled to Dirac, because the $C$-parity is assumed. Both halves are now stated: the gate carries the conditional entailment, the $C$-odd/$C$-even fork, the exact-$CP$ coupling, and the asymmetric falsifier. The surrounding benchmark paragraph no longer lists the suppressed $0\nu\beta\beta$ rate as a discriminator target alongside the mass sum, and the section preamble no longer bundles the decided-given-$C$-odd Majorana question with the still-open sterile-branch phenomenology.

## Next targets

1. **Determine the $C$-parity of $\delta\Omega_{\mathrm{bin}}$** — the residual internal-binary mismatch that holds the neutrino off the photon lock. This is the gate, it is realization-free enough to attack without the full geometry, and it decides Dirac, exact $CP$, and the sterile-branch count together. Candidate route: apply the polarity-conjugation map to the residual operator and ask whether the near-photon branch is an eigenstate, using only the $C$-evenness of the law rather than any assumed geometry.
2. **Cycle-invariance of the handedness invariant.** The lemma needs $\chi$ to be a cycle-invariant label, not an instantaneous one. Unchecked, and load-bearing for the handedness derivation and the parity-violation mechanism as well as for this gate.
3. Revisit the χ-theorem's realization as §99 addition C requires — whether *any* retained assembly family carries a $C$-odd polar quantity at all, given that the only family that ran is planar and cap-free.
