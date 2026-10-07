# The actual nonlinear family has a compact attained exit set

## Purpose and precise claim

Claim grade: derived candidate pending independent assessment. The existing compatible family and its accepted nonlinear cone construction determine a nonempty compact set of limiting exit histories as the actual amplitude tends to zero. Every member of this set has a complete backward similarity-time trajectory approaching the admitted spiral, and its exit remains a fixed distance from the local symmetry family. No dominant-mode assumption or new preparation is needed.

This gives a concrete transfer statement. If one attained exit limit has a regular strict-subfield forward segment entering the open inward unit-event criterion, then arbitrarily small actual family members reach a finite unit endpoint. If every attained exit limit enters such a region, all sufficiently small members do so. Conversely, a sequence of actual infinite members with amplitudes tending to zero produces an attained exit limit with a complete, compact, regular normalized future, allowing unit grazing only as a limiting event.

No visit to the event region, asymptotic return, or other invariant set is proved here. The construction identifies the actual family-dependent object on which that remaining decision must be made. A free choice of a departure state or a trajectory launched from a convenient eigenvector is not substituted for it.

The fixed law and histories are those of the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The nonlinear input is the independently accepted [finite-departure theorem](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-departure.md) and its [assessment](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-adjudication.md). The later-fate input is the independently assessed [compact infinite regime](authorized-cases-ten-hour-c-spiral-compact-infinite-regime.md). All constants remain existential unless already specified in those sources.

## Keep the exact existing exit construction

Use the accepted similarity coordinates

$$
\tau=\log(1+T),\qquad
x(T)=e^\tau e^{\Omega\tau}U(\tau),\qquad
Z=(U,U'),
$$

where $\Omega$ uses the exact admitted angular frequency. The equilibrium history is $\phi_*$. The accepted construction fixes a finite entry time $\tau_e$, a time step $a>0$, a compatible solution-manifold chart, a finite-dimensional expanding block $E_u$, its invariant complement, an adapted norm, and constants $\gamma>1$, $M>1$, $d_0>0$.

For every sufficiently small actual amplitude $\eta>0$, its entry state is the certified modal tangent plus $o(\eta)$, and its first sampled exit index $N_\eta$ satisfies

$$
d_0\le\|u_{N_\eta}\|\le Md_0,
\qquad
\|s_n\|\le\|u_n\|,
\qquad
\|u_{n+1}\|\ge\gamma\|u_n\|
\quad(n<N_\eta).
\tag{1}
$$

Here the symbols $u_n,s_n$ denote the two chart components, not physical source times. The exit time is $\tau_\eta=\tau_e+aN_\eta\to\infty$. The complete physical histories remain regular and strict-subfield through exit, and their distance from the actual local symmetry family is at least the fixed $\varepsilon_d>0$ in the admitted history norm.

The expanding block may contain uncomputed modes. Nothing below replaces it with the certified pair or asserts an asymptotic exit direction from that pair alone. The fixed old held tail, polynomial patch, analytic segment and smaller compatibility correction remain exactly the accepted ones.

## Generated exit histories are compact in the required norm

Choose one fixed finite similarity-history width $H_c$ larger than both the original local width and $\log40+1$. At sufficiently small amplitude, the interval $[\tau_\eta-H_c-1,\tau_\eta]$ lies after the fixed entry time. The cone and finite-step bounds keep this entire interval in a fixed regular neighborhood of the equilibrium. Its complete source intervals are generated.

On this neighborhood the actual normalized position, velocity and their first derivatives are uniformly bounded, as are the source-clock derivative and inverse ordinary denominator. Differentiate the normalized response along a physical solution. The derivative uses only current and delayed position/velocity derivatives, the bounded clock derivative and smooth coefficients on a range/denominator set separated from zero. It therefore gives a uniform bound on the second derivative of the first-order state $Z$ on the exit window. No derivative of a perturbation direction is used, and no compactness of an arbitrary $C^1$ ball is assumed.

Arzela–Ascoli then gives precompactness of the attained exit states

$$
\Phi_\eta=Z^\eta_{\tau_\eta}\big|_{[-H_c,0]}
$$

in $C^1([-H_c,0])$. The kinematic and compatibility identities pass to this limit. The original shorter history restriction retains the fixed departure distance. Thus the cluster set

$$
K_{\rm exit}:=
\{\lim_{j\to\infty}\Phi_{\eta_j}:\ \eta_j\downarrow0\}
\tag{2}
$$

is nonempty and compact, and none of its members is a local symmetry representative within the admitted departure distance. Compactness here is of a set reached by the actual family; it does not declare arbitrary histories in the local chart attainable.

The whole family of exit states approaches this cluster set: for every neighborhood of $K_{\rm exit}$, all sufficiently small amplitudes have their exit state in that neighborhood. Otherwise a sequence outside the neighborhood would have a convergent subsequence defining a member of (2), a contradiction. The sampled first-exit index may jump with amplitude; no continuity of that index or connectedness of $K_{\rm exit}$ is presumed.

## Every attained exit limit has a complete backward orbit

Fix a sequence attaining a point of (2), and shift its similarity time so that exit is at zero. For every fixed backward time interval, the corresponding actual intervals are generated and stay in the local regular neighborhood once the amplitude is sufficiently small. The same generated derivative bounds give subsequential compactness there. A diagonal extraction defines a solution on every finite negative similarity-time interval, with its value at zero equal to the chosen exit state.

The cone growth bound in (1) gives, at $k$ sampled steps before exit,

$$
\|u_{N_\eta-k}\|\le Md_0\gamma^{-k},
\qquad
\|s_{N_\eta-k}\|\le Md_0\gamma^{-k}.
$$

The accepted finite-step flow bound and local chart equivalence extend this estimate between samples. Passing to the limit gives constants $C,c>0$ with

$$
\|Z_\sigma-\phi_*\|_{C^1([-H_c,0])}
\le Ce^{c\sigma}\qquad(\sigma\le0),
\tag{3}
$$

after adjusting $C$ for the longer window. The limit is nontrivial at zero because its distance from the local symmetry family is at least $\varepsilon_d$. Thus it is a complete backward trajectory tending to the spiral, obtained from the actual finite-amplitude family.

The limit is a mathematical similarity-time object. Its backward endpoint corresponds to scaled physical time zero, not to an extension of the prescribed physical spiral through $T=-1$. The original held preparation has moved to similarity time minus infinity under this scaling. It is never replaced in any actual member, and the limiting object is used only through the demonstrated compactness and transfer statements.

## An open later event transfers to actual members

Use the strict open event region defined by an actual ordinary history with $p<0$ and

$$
1-|v|^2<\frac{p^2}{128}\left(\frac rR\right)^2.
\tag{4}
$$

The [delay-based inward budget](authorized-cases-ten-hour-c-spiral-causal-collapse.md) proves finite unit arrival within $(-p)r/8$ after entry. The expression in (4) is invariant under simultaneous scaling of position and time and under planar rotation. It is continuous in a regular compatible $C^1$ history because the ordinary source root is continuous and $R>0$.

Suppose $\Phi\in K_{\rm exit}$ has a finite forward segment that remains in the regular strict-subfield full-root domain and ends in (4). Finite-time continuous dependence of the admitted ordinary history equation gives a neighborhood of $\Phi$ whose actual generated trajectories also enter (4). The complete-history subfield and root margins on this finite segment are positive; no continuation across a limiting equality is used in this argument. Along the sequence of actual amplitudes attaining $\Phi$, sufficiently small members therefore enter (4) and reach a finite unit endpoint. This proves the arbitrarily-small-member statement.

If every point of the compact set $K_{\rm exit}$ has such a strict forward segment into (4), finitely many of these neighborhoods cover the set. Every sufficiently small actual exit state lies in their union, proving finite unit arrival for all sufficiently small members. The finite subcover also bounds the required additional similarity time. Combined with the accepted upper departure-time bound, this would preserve an existential polynomial upper bound in $1/\eta$ for unit arrival. Neither the cover nor its times have been established; this paragraph is a precise sufficient bridge, not an event claim.

A path that touches unit speed before entering (4) does not meet the stated strict-prefix hypothesis. It requires its own finite-event or grazing analysis and is not silently passed through by a smooth full-root flow.

## Infinite members have uniform compact future bounds as amplitude vanishes

The constants in the compact infinite-regime proof can be chosen uniformly across all sufficiently small members that actually continue forever. Here is the needed uniformity check.

The compatible family converges in complete-past $C^2$ to one fixed preparation. Hence its old positions and jets are uniformly bounded, its initial sampled angular momentum has a common positive floor, and its initial source time stays in a fixed negative compact interval. The accepted early-radius and source-ratio estimates consequently have common constants. In particular radius diverges uniformly along times tending to infinity, and late sources are uniformly generated.

If no uniform eventual radial margin existed on the infinite members, one could choose such members and later and later times with $p\to-1$. The full-arc projection and logarithmic range contradiction in the radial-margin proof use only the common acute sector, the local inward budget and those uniformly generated intervals. They give the same contradiction for this cross-family sequence. Thus its radial margin and denominator lower bound are uniform. The outward near-unit arc proof of source-radius comparison likewise uses only that common radial margin and fixed inequalities, so its source-radius constant and cutoff are uniform.

If tangential speed had no uniform positive floor, a sequence of members and times with $h/r\to0$ would have $r\to\infty$ because the initial angular-momentum floor is common. The complete rescaling proof then applies with common range, denominator and whole-arc bounds. The uniformly bounded old preparation collapses to zero, so no old physical source is treated as generated in the limit. The same forbidden radial continuation gives a contradiction. Hence the tangential floor is uniform as well. The torque lower bound now gives common eventual linear radius and angular-momentum floors, and the normalized derivative bounds are uniform on each fixed finite history window.

This argument is only over the subset of actual members that remain strict for all future time. It does not assume that subset is nonempty or identify its amplitudes.

Suppose that subset contains a sequence $\eta_j\downarrow0$. Shift each trajectory to its actual departure time as above. Since $\tau_{\eta_j}\to\infty$, every fixed shifted forward window lies beyond the common physical cutoff for all sufficiently large $j$. The common compactness bounds give a further subsequence defining a complete normalized future. Joined to (3), it gives a nontrivial trajectory with spiral backward limit and compact forward histories. The limiting speed is at most one, the denominator and radius remain separated from zero, and the complete limiting root census is the one proved in the compact infinite-regime theorem. Unit grazing may occur in this limit; no new equality response is selected.

Therefore the actual family has the following rigorous reduction: either all sufficiently small members have finite unit endpoints, or a sequence of infinite members produces a nontrivial attained backward-spiral connection with a compact forward continuation. The alternatives need not exclude other behavior at amplitudes outside the chosen sequence. The second conclusion describes a limit forced by actual infinite members; its converse is not asserted.

## The remaining mathematical obstruction

The accepted local growing mode and cone exit do not identify $K_{\rm exit}$ beyond its attained compactness, backward approach and nontrivial symmetry distance. Additional growing modes and nonlinear transfer remain inside the admitted expanding block. The later compact regime does not identify its invariant set. A return toward the spiral would be a global connection; a different recurrent set or regular unit-grazing limit is not excluded by the present estimates.

The unresolved task is thus an actual attained-set question: establish that some or all histories in (2) enter an open finite-event region, or establish and identify their surviving invariant behavior. A spectral census, a freely chosen departure state, or a convenient replacement history does not settle that question.

## Falsifiers and ownership

Load-bearing falsifiers are lack of a uniform generated second-derivative bound at exit; loss of compatibility or the admitted departure distance under $C^1$ convergence; failure of the backward cone estimate on the longer history window; a nonuniform old preparation or initial angular-momentum floor in the claimed cross-family argument; or use of continuous dependence across a unit-speed equality where the full root domain changes. No such crossing is used in the strict-prefix transfer theorem.

All arguments are analytical. The exact base supplies the fixed equilibrium and regularity control, while the accepted cone theorem supplies the nontrivial actual departures. No numerical member, amplitude, source preparation, spectral target or computational instrument is introduced. Only this new subject is written; prior frozen evidence and shared owners remain unchanged, and no owned computation is active. Independent assessment is required before integration.
