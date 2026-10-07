# Finite refinement of certified actual-source support

Claim grade: derived under the same fixed receiving trial and completed-history assumptions as the [frozen source-split theorem](../analysis/maxwell-e-onehour-source-split-2026-10-05.md). After a complete comparison-clock enclosure has been certified, its intersection with the actual-source support is a valid smaller physical source interval. Recomputing physical source errors there and certifying a fresh comparison-clock family gives another valid instance of the same error theorem. This is a finite proof refinement for the unchanged original Section 7 E preparation. It changes neither the physical history nor the coordinate $p=u+q$.

The refinement is useful because the initial mirror estimate can admit physical source times that no comparison root family can reach. Taking maxima over those unnecessary completed bins can inflate physical X/V/A errors and source-to-receiver angular error. The intersection removes such bins by a proved actual-root inclusion, not by discarding an inconvenient nominal root or using an unaccepted receiving output.

## 1. Preserve the receiving problem throughout the chain

Fix a receiving cell $I=[L,U]$, its prescribed radius and physical-velocity trials, its prescribed angular-rate bound, the complete certified physical history through $L$, and the immutable prescribed comparison history. The original actual stopping/root premise also remains fixed. At this stage an actual solution is considered only while it lies in that receiving trial. No accepted endpoint or smaller output cylinder is assumed.

Let $\mathcal S$ denote the set of all actual partner emission times attained over this receiving trial under those conditional premises. This notation records a set to be enclosed; computing its exact elements is unnecessary. The original positive lower-residual and mirror upper-face certificates establish

$$
\mathcal S\subseteq P_0\subset(-6,L).
$$

Here $P_0$ is a closed interval and the completed physical-history boundary is $L$. Its original strict lower residual and strict upper lag proof remain part of the final certificate, even after the interval is narrowed.

## 2. One refinement step

Suppose a closed interval $P_k$ has already been proved to contain $\mathcal S$. Build the complete physical source inventory on $P_k$, including both adjacent closed seam bins and every required negative-time and angular segment. Compute frozen physical source error bounds

$$
e_{X,k}=s_{r,k}+R_k\Psi_k,
\qquad
e_{V,k}=s_{v,k}+V_k\Psi_k,
\qquad
e_{A,k}=s_{a,k}+A_k\Psi_k.
$$

The symbols have the same meanings as in the source-split theorem: intrinsic physical source error bounds, prescribed source norms, and complete source-to-receiver angular discrepancy. They are established entirely on already completed physical support before any new nominal replacement.

Certify a fresh initial comparison bracket $J_k$ that contains $P_k$, has every-parameter opposite residual signs, and has a positive nominal denominator and range on the entire bracket. The prescribed comparison must cover every query. Enclose all translated nominal roots and every required intermediate root in $C_k$ using that bracket and the newly frozen offsets. The actual-root linkage in the source-split theorem then gives

$$
\mathcal S\subseteq C_k.
$$

Define

$$
P_{k+1}=P_k\cap C_k.
$$

Both sets on the right enclose the same actual emission times, so $\mathcal S\subseteq P_{k+1}$. Because $P_{k+1}\subseteq P_k\subseteq P_0$, the physical interval remains strictly earlier than $L$ and within the original finite supported past. Its physical X/V/A inventory can therefore be rebuilt from completed data. This proves one refinement step and, by induction, any finite sequence of such steps.

Every interval and proof in this construction is conditional on the same fixed receiving trial. If the trial is enlarged, reception time changes, physical source rows change, or the comparison history changes, an earlier inclusion cannot be reused without a new containment proof. The simple implementation contract is to restart from $P_0$ whenever any of those inputs changes.

## 3. Why the refinement is not circular

The proof order is essential:

1. Prove actual inclusion in $P_k$ using the already frozen outer bracket or a completed preceding refinement.
2. Compute physical source bounds only on that proved interval.
3. Freeze those bounds and certify a new complete nominal clock family.
4. Deduce actual inclusion in the intersection.

No step uses an error bound computed from an unproved smaller physical interval to justify that interval. In particular, an implementation may not guess a narrow source window, calculate small source errors there, and accept the window because a nominal root enclosure based on those errors fits it. The outer actual-root certificate and the finite inclusion chain supply the missing direction of implication.

The new lower face need not have a strictly positive actual residual. It is an enclosure boundary inherited by set inclusion and can coincide exactly with an actual root. Reapplying the original strict lower-face test to every refined support would impose an unnecessary restriction and would reject valid exact singleton enclosures.

The new nominal family need not satisfy $C_{k+1}\subseteq C_k$. Its frozen numerical error bounds need not decrease either: a different interval representation, outward rounding or box decomposition can enlarge an overestimate. What matters is that each new family separately encloses its required nominal roots and that each physical support remains proved. Only the physical supports are necessarily nested, by the intersection definition. If a new nominal proof fails, the preceding valid stage remains usable; a failed refinement does not invalidate its parent.

An empty intersection cannot be accepted as a completed source interval or treated as a new physical event. Given the conditional existence premise, every preceding valid enclosure contains an actual root, so an empty intersection exposes an inconsistent application, a failed premise or an arithmetic error that needs independent resolution. A singleton intersection is legitimate if all arithmetic enclosures and seam inventories include it.

## 4. Final coefficients and physical reconstruction

At any finite stage $k$, the source-split error inequalities can be applied with the physical inventory on $P_k$ and the complete nominal coefficient family on $C_k$. If the producer chooses the narrowed support $P_{k+1}$ for physical error magnitudes, the preferred simple implementation recertifies $J_{k+1},C_{k+1}$ with those newly frozen errors before using the resulting coefficients. This retains one complete, self-contained final stage and avoids silently combining offsets from different stages.

The final q/H/E calculation continues to retain the full independent source-position offset, physical source velocity and physical source acceleration. Prescribed spatial derivatives use comparison acceleration and jerk. Source component axes come from a proved interval containing the actual source time; the final physical source support is one such interval. The same original comparison residual, signed current recurrence, physical velocity conversion, physical E acceleration reconstruction, strict receiving trials and angular-density update remain mandatory.

A bounded implementation can use a fixed finite number of refinements or stop when the physical interval no longer changes. No convergence theorem for an infinite iteration is needed or claimed. An earlier successful stage is a valid fallback if a later nominal bracket fails, provided the saved stage includes its own source bounds and coefficient family.

## 5. Exact controls and falsifiers

For a stationary root-geometry control, take both mirror members at $\pm(2,0)$, reception time $100.1$ and physical cursor $100$. The actual partner root is exactly $96.1$. The actual support $P_0=[96,98.1]$ is valid because its lower residual is $0.1>0$ and the mirror upper bound is $98.1<100$. With an exact identical prescribed comparison and zero source offsets, the comparison clock is the singleton $C_0=\{96.1\}$. Hence $P_1=\{96.1\}$ is valid even though the actual residual at its lower face is zero. All physical source data are still completed.

For an exact interval overestimate, take $C_0=[96,97]$ and then a separately valid but broader $C_1=[95,98]$ for the same root. The physical supports satisfy $P_1=[96,97]$ and $P_2=[96,97]$, although $C_1$ is not a subset of $C_0$. Thus nested nominal clock intervals are not a theorem requirement. These intervals are deliberate conservative root enclosures, not claims about the output of a particular numerical root instrument.

Changing the reception to $100.2$ changes the same stationary root to $96.2$. Reusing the old singleton physical support $\{96.1\}$ would omit it. This is a direct control for the fixed-input restriction. A closed-bin control places the root exactly at a retained source seam and requires the maxima from both adjacent bins; a narrow interval is not permission to omit either side.

Claim grade: derived. Finite support refinement follows from ordinary set intersection and separately certified root inclusion at every stage. Falsifiers are a stage whose nominal family was built from unproved physical support, a missing original bracket or intermediate inclusion certificate, changed receiving/history inputs, omitted seam data, an empty accepted intersection, use of the actual mirror bound to clip a nominal clock family, or a final q/H/E computation using unbound source offsets. These controls establish the refinement's logic, not its numerical usefulness on the original E target.

## 6. Required finite-chain receipt

Record the immutable receiving/history/trial context, the original $P_0$ lower-residual and mirror upper-face proof, and every used tuple $(P_k,e_{X,k},e_{V,k},e_{A,k},J_k,C_k)$. Each tuple retains physical source bins, geometry and angle; every-parameter nominal face signs; nominal and replacement denominator floors; range floors; complete prescribed comparison coverage; and the exact intersection producing the next physical interval. The final source, coefficient and recurrence records identify which stage they use.

This theorem is a separately frozen addendum to the original split proof. It grants no target authority and reports no coupled outcome. The producer and independent reviewer must retain separate implementation and audit records.
