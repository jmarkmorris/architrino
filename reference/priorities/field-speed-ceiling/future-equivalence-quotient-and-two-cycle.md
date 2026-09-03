# FSC-006b / FSC-005 — Future-Equivalence Quotient and Prescribed-Onset Two-Cycle

**Date:** 2026-09-02 **Status:** conditional quotient theorem proved for the isolated exact-mirror continuation relation; equal prescribed onsets give a genuine two-cycle on the event-section quotient; no selector or canonical law is added. **Owner:** FSC-006b/FSC-005.

## Question and verdict

Can the growing literal all-past record be replaced by a smaller state without identifying histories that can later produce different ordinary roots, event guards, ownership decisions, or nonordinary strata?

Yes, but only under a narrower relation than “the current ledgers agree.” The quotient may retire a complete labeled record bundle only after a checkable strict-passage certificate proves that its front has passed every receiver in the isolated two-label class. A record on the zero-margin frontier remains live even when the present reception rule classifies it as frozen, characteristic, owned, or inactive. With that boundary retained, strict-passage status is permanent under every ceiling-admissible future, the proposed event update and the multivalued continuation relation descend to the quotient, and equal prescribed onsets produce a genuine two-cycle on the normalized event section.

Plainly: old records may be discarded only when the speed ceiling makes it impossible for their wakefronts ever to meet either architrino again. A front that is merely being ridden is still part of the current event geometry and is not discarded. This is enough to remove the harmless growth from earlier lobes without erasing the information that the next event actually uses.

## 1. Declared history state

Normalize $c_f=1$ and use the isolated labels $I=\{1,2\}$. At absolute time $T$, a history state is

$$
\mathfrak h_T
=
\left(
\{\mathbf X_j,\mathbf V_j\}_{j\in I},
\mathcal E_T,
\mathcal S_T,
\mathcal C_T,
\mathcal O_T,
\mathcal M_T
\right).
$$

Here $\mathbf X_j:(-\infty,T]\to\mathbb R^3$ is the labeled retained path, $\mathbf V_j$ is its regulated velocity with declared one-sided traces, $\mathcal E_T$ is the labeled emission record, $\mathcal S_T$ contains every received-source clock and its active, plateau, or jump record, $\mathcal C_T$ gives the ordinary or nonordinary classification of every frontier channel, $\mathcal O_T$ records ordinary-consumption and event-family ownership, and $\mathcal M_T$ keeps ordinary receiver measures and event-update measures as separate typed objects. On regular open pieces the paths lie in $W^{2,\infty}_{\mathrm{loc}}$; velocities may have a bounded-variation event trace only where a declared event owns the corresponding atom. The exact-mirror event used here has a zero velocity atom.

Plainly: the state contains the paths plus the bookkeeping needed to say which wake history has arrived, which family has already been counted, and whether a record is an ordinary crossing or a special event object. Keeping these components together prevents removal of a path point while accidentally retaining a clock or ownership entry that refers to it.

For receiver $i$, transmitter $j$, and emission time $s\le T$, define the causal gap

$$
g_{i\leftarrow j}(T,s)
=
\left\|\mathbf X_i(T)-\mathbf X_j(s)\right\|-(T-s).
$$

At positive range, an **ordinary record** is an isolated root $g=0$ with $D_t>0$ and $D_r>0$. A **nonordinary frontier record** is any zero-gap record that is frozen with $D_r=0$, belongs to a characteristic interval with $D_t=0$ or $D_r=0$, lies on the excluded zero-delay diagonal, is carried by a clock jump or singular-continuous component, or belongs to a declared event family. These types remain distinct in $\mathcal C_T$ and $\mathcal M_T$.

Plainly: $g$ compares the receiver’s distance from one emitted wakefront with that front’s radius. Zero means contact with the front. A clean isolated crossing is ordinary; a ridden front, a whole interval arriving together, or an event atom is recorded separately because the ordinary inverse-square row does not own it.

## 2. Live bundles and permanently inactive bundles

An emission-time **record bundle** contains the source label and emission time, the path and velocity traces used by that emission, all received-clock entries referring to it, its channel classifications, every ownership annotation, and its typed measure provenance. Partial retirement is forbidden.

For a compact emission set $B\subset(-\infty,T]$ belonging to transmitter $j$, define its passage margin

$$
\delta_T(B)
=
-\max_{i\in I}\sup_{s\in B}g_{i\leftarrow j}(T,s).
$$

The bundle over $B$ is **certified permanently inactive**, abbreviated CPI, when it is already owned or consumed, is disjoint from the current event carrier and zero-delay diagonal, and $\delta_T(B)>0$. Point records use the same definition with $B=\{s\}$. The live projection $\Pi_T\mathfrak h_T$ retains every bundle without a CPI certificate, including every $g=0$ frozen or characteristic record, the complete current exact-mirror event carrier, the most recent cap duration, current clock plateaus, current ownership entries, and all separately typed current-event measures. The complementary CPI archive is denoted $\mathcal A_T^{\mathrm{CPI}}$.

Plainly: a bundle is retired only when all of its linked records have been dealt with and its wakefront is already a definite distance behind both possible receivers. The latest cap remains live because it is exactly on the event boundary and supplies the event’s length, ownership, and cancellation record.

The strict inequality is essential. A zero-margin owned front is protected from double billing by the ownership rule, but it can still remain a frozen or characteristic frontier and can still be read by the declared event classification. It therefore cannot enter $\mathcal A_T^{\mathrm{CPI}}$ until it acquires strict negative gap for every receiver. A one-time equality of ordinary acceleration ledgers supplies no CPI certificate.

Plainly: “not contributing acceleration now” is not enough. A ridden wake may still decide which kind of event is present. Only a front that has definitely passed can be removed from the future-facing state.

## 3. Topology and quotient relation

Recenter time by $\theta=s-T\le0$. On each bounded live lookback window $[-n,0]$, use the $W^{2,\infty}$ norm on regular path pieces, the regulated $W^{1,\infty}$ or bounded-variation trace norm at declared events, total variation for the typed finite measures, the Hausdorff graph distance for received-source clocks, and the discrete metric for labels, channel types, and ownership. A concrete projective metric is

$$
d_{\mathrm{live}}(h,k)
=
\sum_{n=1}^{\infty}2^{-n}
\min\!\left\{1,
N_n\!\left(\Pi h-\Pi k\right)
\right\},
$$

where $N_n$ is the sum of those component norms on the common live records in $[-n,0]$ and is $+\infty$ when their labeled live censuses differ. Event-section states are additionally recentered to the coincidence position and absolute time; this is the ordinary autonomous time- and space-translation chart change, not retirement of a record.

Plainly: two states are close only when their future-relevant path pieces, clocks, types, ownership, and measures are close on every finite slice of the past. Different live root labels are never treated as a small perturbation. Very old certified-passed records carry no distance because the theorem below proves that the proposed continuation cannot read them again.

Define

$$
\mathfrak h_T\sim\widetilde{\mathfrak h}_T
\quad\Longleftrightarrow\quad
\Pi_T\mathfrak h_T=\Pi_T\widetilde{\mathfrak h}_T.
$$

Thus two equivalent states may differ only by complete CPI bundles. They may not differ in the current cap length, a clock plateau, a zero-margin ownership record, an event count that a declared rule reads, a nonordinary frontier type, or a typed measure supported at the current event. The quotient state space is $\mathfrak Q_T=\mathfrak H_T^{\mathrm{iso}}/\!\sim$ with the quotient topology induced by $d_{\mathrm{live}}$.

Plainly: equivalence means exact agreement on everything the current rules can still inspect. The discarded archive may contain different amounts of old history, but only after each difference has its own proof of permanent causal irrelevance.

## 4. Permanence lemma

For any ceiling-admissible future receiver path and fixed old emission $(j,s)$,

$$
\begin{aligned}
g_{i\leftarrow j}(T_2,s)-g_{i\leftarrow j}(T_1,s)
&\le
\left\|\mathbf X_i(T_2)-\mathbf X_i(T_1)\right\|-(T_2-T_1)
\\
&\le0
\end{aligned}
$$

whenever $T_2\ge T_1\ge T$. Consequently $\delta_{T_2}(B)\ge\delta_{T_1}(B)>0$ for every CPI bundle $B$. It can never again contain an ordinary root, touch a nonordinary zero-gap stratum, enter a later exact-mirror carrier, change a received-source clock, or supply a receiver-time atom.

Plainly: a wakefront expands at unit speed, while a receiver is not allowed to move faster than unit speed. Once the front is ahead of and has passed the receiver by a positive margin, the receiver can never catch it again. The same statement holds for every emission in a retired compact bundle.

> **Permanently inactive preservation lemma.** CPI status is preserved under every admissible isolated FSC future. New records may move from the live state into the CPI archive after they acquire a strict passage certificate, but no archived bundle can return to the live state.

**Claim grade:** `derived inside the proposed closed-speed FSC class`. The lemma is falsified by a ceiling-admissible future and a certified bundle for which some later gap reaches zero, or by a declared event rule that assigns a later update to a strictly negative-gap archived record.

Plainly: retirement is one-way. A counterexample would be a supposedly passed wakefront that later meets a receiver, or a rule already in the packet that deliberately reactivates such a front.

## 5. Equivalence, ledgers, and event update

Because $\sim$ is equality after applying one fixed projection, it is reflexive, symmetric, and transitive. The relation is therefore an equivalence relation.

Plainly: every state has the same live part as itself; if one state has the same live part as another, the reverse is true; and two successive live-part agreements imply the first and third agree.

Fix two equivalent states and any common admissible candidate future. Every old root used by a future ordinary ledger must come from a live record, because the permanence lemma excludes every archived emission. The live histories, labels, clock states, classifications, ownership records, and typed measures agree. New emissions also agree because the candidate future paths agree. Therefore the two candidate futures have identical ordinary root censuses, identical per-root acceleration rows, identical complete ordinary ledgers, and identical nonordinary frontier classifications at every common future time.

Plainly: the only differences lie in wakes that can never arrive again. All wakes that can arrive are identical, and a shared future emits identical new wakes, so the two root lists and acceleration sums stay identical.

This equality is a statement about the proposed multivalued continuation relation. It does not assert uniqueness. Let $\mathcal F_\tau(h)$ be the set of admissible future segments of duration $\tau$ satisfying the proposed complete-ledger restart and event rules. The preceding argument gives

$$
h\sim k
\quad\Longrightarrow\quad
\Pi\mathcal F_\tau(h)=\Pi\mathcal F_\tau(k),
$$

provided every transition clause is **live-extensional**: it may read the live projection but not the CPI archive. The presently declared crossing, ownership, ordinary-ledger, constrained-response, and exact-mirror event clauses are live-extensional. No positive-onset selector is presently declared.

Plainly: equivalent states have the same set of allowed futures, not one forced future. This conclusion uses exactly the current rules. A future alarm law that counts discarded events or reads an old cap would have to keep that datum live and would change the quotient.

At an exact-mirror event, equivalent incoming states have the same current carrier, matched labeled raw measures, remainder-atom status, velocity traces, clock plateaus, and event-family classifications. The proposed event update therefore aggregates the same matched pair, returns the same zero event impulse, splices the same live histories, and creates the same new ownership bundle. Archived CPI records remain strictly passed and do not contribute to the guard. Hence the event update respects equivalence classes.

Plainly: the event sees the same incoming cap and the same other arriving wakes in both representatives. Differences in already-passed archives neither change the guard nor change the zero-impulse update.

> **Future-equivalence quotient theorem.** On the isolated exact-mirror FSC history class above, restricted to the presently declared live-extensional multivalued continuation and event rules, $\sim$ is an equivalence relation, CPI status is future invariant, equivalent states generate identical future ordinary root censuses and acceleration ledgers along every common candidate future, the exact-mirror event update respects $\sim$, and the continuation relation descends to a well-defined multivalued relation on $\mathfrak Q$. This theorem does not make that relation single-valued and does not constrain a future selector that is allowed to read newly declared archive data.

**Claim grade:** `conditional derived theorem inside the proposed FSC model`. It is falsified by two states with identical live projections and different CPI archives for which a presently declared rule produces different root censuses, ledger rows, event guards, ownership updates, or quotient futures. A future non-live-extensional selector would not falsify the proof; it would change the state definition and require its chosen archive datum to be restored to the live projection.

Plainly: the quotient is valid for the model that is actually written today. It does not give permission to add a future history-reading selector while pretending the selector sees information that the quotient discarded.

## 6. Descent of the prescribed-onset return map

Let $\Sigma$ be the normalized exact-mirror event section. It recenters the current coincidence to time zero and the origin while retaining label 1's orientation $\epsilon\in\{+1,-1\}$, coupling $K$, the current live incoming-cap profile and duration $L$, both partner-clock plateaus, the current event ownership carrier, and the typed zero event atom. Let $G(K,u_*)$ be the cap duration produced by the independently reviewed complete-lobe theorem for a prescribed onset $u_*>0$ satisfying $K\ge7u_*/2$.

Plainly: $\Sigma$ is the state observed exactly at each coincidence, expressed in the same local coordinates every time. It keeps the cap that has just arrived and forgets only older wakes already certified never to return.

All pre-cap emissions of the completed lobe have strict negative gap at the return event; equality holds exactly on the final inward cap. The pre-cap bundles therefore enter the CPI archive, while the new cap remains live and is owned by the event. The induced prescribed-onset map is

$$
\overline{\mathcal R}_{u_*}
\left[
\epsilon,K,L,\mathcal S,\mathcal O,\mathcal M
\right]
=
\left[
-\epsilon,K,G(K,u_*),\mathcal S_*,\mathcal O_*,\mathcal M_*
\right].
$$

It is independent of the representative and of the incoming retired archive, so it is a well-defined map on $\Sigma/\!\sim$.

Plainly: one lobe reverses the outgoing direction and replaces the current cap by the cap made during that lobe. The map does not care how many older completed lobes remain in a representative’s archive because their wakefronts have permanently passed.

Set $L_*=G(K,u_*)$. Repeating the same prescribed onset gives

$$
\overline{\mathcal R}_{u_*}^2
\left[
\epsilon,K,L_*,\mathcal S_*,\mathcal O_*,\mathcal M_*
\right]
=
\left[
\epsilon,K,L_*,\mathcal S_*,\mathcal O_*,\mathcal M_*
\right].
$$

The orientation changes after one lobe and returns after two, so this is a genuine period-two state unless the orientation-reflection symmetry is itself further quotiented. It is a cycle of the prescribed-onset quotient map, not an autonomous orbit of an onset-selecting law.

Plainly: with the same external alarm after each event, two returns reproduce every future-relevant event record, not only the positions and velocities. The cycle is genuine in the smaller state space, but the alarm is still supplied rather than derived.

> **Prescribed-onset quotient-cycle corollary.** Under the complete-lobe hypotheses and equal prescribed onsets, the previously established spatial two-cycle is a genuine two-cycle on the normalized future-equivalence event quotient. Literal all-past representatives continue to grow by CPI archives and need not be equal.

**Claim grade:** `derived conditional corollary inside the proposed FSC model`. It is falsified by a pre-cap record with nonnegative gap at the return, a live event datum after the second lobe that differs from its initial value, dependence of $G(K,u_*)$ on the retired incoming archive, or failure of the quotient theorem's live-extensionality condition.

Plainly: the upgrade fails if any supposedly old wake remains able to arrive or if the second event carries a different live cap, clock, ownership, or measure record. Those are direct checks on the proof.

## 7. Exact boundary and selector consequence

The theorem does not quotient the current $g=0$ cap family, the current frozen endpoint, clock plateaus, event ownership carrier, current cap duration, or any record read by a declared guard. It also does not authorize a selector to read the CPI archive. If a future onset functional $\Phi$ depends on event count, an older cap duration, an accumulated source-history integral, or another retired quantity, that quantity becomes a legitimate future-state variable and must be restored to $\Pi\mathfrak h$ before the selector is evaluated.

Plainly: a new alarm clock may use old information, but then that information is not disposable. The law must name it, keep it in the state, and accept that the present quotient becomes too coarse.

The smallest record that would prevent this quotient is therefore not an already existing hidden variable. It is the first archive-dependent scalar or typed record appearing in a future selection law. At current authority no such law exists, so no retained CPI record constrains the missing positive-onset functional. Symmetry still permits the underdetermined family $u=K\Phi(L/K)$ when only the live scalars $K$ and $L$ are used.

**Claim grade:** `derived current-authority classification`. It is falsified by locating an already declared FSC transition, guard, ownership clause, or action/wake equation that reads a CPI archive field and changes the continuation.

Plainly: the completed quotient does not discover the missing alarm. It shows exactly what would have to happen for an old record to become one: a new rule would have to name and use it.

## 8. Nonclaims

No field-speed ceiling, constrained response, exact-mirror event law, swept-source law, continuation selector, breather, conservation account, stability result, physical realization, or canonical dynamics is adopted here. The result applies only to the isolated proposed FSC class and to the currently declared live-extensional continuation relation. It neither proves event-adjacent local finiteness nor advances the separate atom-free FSC-007 chart.

## Closure goal

Use the explicit live/archive split to classify the event-adjacent thin-cascade case, then advance FSC-007 only on its positive-floor regular chart and prepare the continuation-selection decision without allowing a new selector to read data omitted by this quotient.
