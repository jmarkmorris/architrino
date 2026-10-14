# Stage 3 Validated Evolution Design, Addendum 3: The Whole-Step Pair Bound, Stated for Implementation

Section 2 of the [evolution design](matched-pair-stage-3-evolution-design.md) derives the pair bound that can be used inside a validated step. This addendum states it in the form increment 2 would implement, shows that it is the accepted [Stage 2 tube-form theorem](matched-pair-stage-2-design.md) with one hypothesis supplied differently, and fixes the truth references and cases before any runtime is written. Nothing here is implemented or measured. Every instance uses $c_f=1$.

The reason it must be a whole-step bound is in the design, section 1: a validated step needs an enclosure of a receiver's acceleration at every reception time in the step and every receiver position in its step box. A bound at one reception time, however accurate, says nothing about the times between.

## 1. Setting

The notation is that of the far-step theorem in [addendum 1 of the generated-history record](matched-pair-stage-3-addendum-1.md): a step $[T,T+h]$, a common history start $S_{\min}$, step position boxes $\mathcal X_i$, and hypotheses H0 to H5. Fix a receiver $i$ and two other paths, written $+$ and $-$, whose charges are exact opposites, $q_\pm=\pm\epsilon$ in either order.

A *receiver event* is a pair $(t,\mathbf x)$ with $t\in[T,T+h]$ and $\mathbf x\in\mathcal X_i$. For each member the causal residual at that event is

$$g_\pm(S)=\|\mathbf x-\mathbf X_\pm(S)\|-(t-S),$$

whose root is the emission time of the one hit that member delivers to the event.

A *slab* is an interval $I=[S_0,T]$ of the validated past with $S_{\min}\le S_0<T$.

## 2. Statement

Assume H0, H1 and H2 of the far-step theorem. Assume also:

- **P1, both present.** Both members are uniformly present for receiver $i$ in the sense of H3.
- **P2, roots in the slab.** For every receiver event, the root of each member lies in $I$.

Over the slab, define exactly the quantities of the Stage 2 theorem with the receiver set $\mathcal R=\mathcal X_i$: a convex set $\Omega$ containing both members' position tubes on $I$, at distance at least $r^->0$ from every point of $\mathcal X_i$; a speed bound $v^+<1$ on both velocity tubes on $I$; the nominal equal-time separation bound $\ell_0$; the nominal equal-time relative velocity bound $w_0$; the nominal acceleration bound $a_0$ inside segments; the sum $J$ of nominal velocity jumps across the joins of either member inside $I$; and the largest position and velocity radius norms $\varepsilon^x_\pm$, $\varepsilon^v_\pm$ of the segments $I$ meets. With any $0<\nu\le1-v^+$ put

$$\ell^+=\ell_0+\varepsilon^x_++\varepsilon^x_-,\qquad\omega^+=w_0+\frac{a_0\,\ell^+}{\nu}+J+\varepsilon^v_++\varepsilon^v_-,$$

$$B=C\left[\frac{(2\nu+v^+)\,\ell^+}{(r^-)^3\nu^3}+\frac{\omega^+}{(r^-)^2\nu^2}\right],\qquad C=|\kappa q_i|\,\epsilon.$$

**Claim.** For every receiver event, the sum of the two members' contributions to the canonical acceleration of a receiver of charge $q_i$ has every component in $[-B,B]$.

If instead both members are uniformly absent in the sense of H3, the pair contributes exactly zero at every receiver event.

**Claim grade: derived**, by the reduction in section 3; not implemented and not checked by an instrument.

## 3. Why this is the accepted theorem

The Stage 2 theorem has one reception time $T_r$ and a window ending at it. Its proof uses the reception time in exactly one place: the *upper sign*, that the residual at the end of the window is positive, which there is the distance from receiver to source. Everything after that is a statement about two roots inside a window on which the bounds hold.

For a receiver event of the step:

- **Monotone residual.** On $I$, H0 gives a continuously differentiable path with velocity in its tube, and H1 gives speed at most $v^+$, so $g_\pm'\ge1-v^+\ge\nu$ wherever the distance is positive. The distance is positive on $I$ because the path lies in $\Omega$ and $r^->0$. This is the Stage 2 step unchanged.
- **Upper sign, from H2.** At $S=T$ the member lies in its section, which is inside its step box, so $\|\mathbf x-\mathbf X_\pm(T)\|>h\ge t-T$ and $g_\pm(T)>0$. This replaces "the residual at the reception time is the distance". It is Lemma 1 (ii) and (iii) of the far-step addendum.
- **Exactly one root, inside the slab.** P1 with Lemma 1 gives exactly one root in $(S_{\min},T)$; P2 places it in $I$.
- **Root-time difference, delayed position difference, delayed velocity difference, kernel difference.** These four steps of the Stage 2 proof use only that both roots lie in a common window on which $g'\ge\nu$, on which the true equal-time separation is at most $\ell^+$, on which the nominal velocity changes at rate at most $a_0$ with jumps summing to at most $J$, and that both delayed events lie in $\Omega$ times the speed ball at distance at least $r^-$ from the receiver point. Both residuals in the root-time step are taken at the same event, so the same $t$ appears in each. Every constant is uniform over $\mathcal X_i$, and none depends on $t$.

So the bound holds at each receiver event with constants that do not depend on the event. That is the claim. The absent case is Lemma 1 (iii): no root in $[S_{\min},t]$ for either member.

No statement about the true acceleration of a source is used, as in Stage 2.

**Falsifier.** A configuration satisfying H0 to H2, P1 and P2, and a receiver event of the step at which some component of the pair's contribution lies outside $[-B,B]$.

## 4. Choosing the slab

The producer already computes, for each present source, a root window: an interval of emission times that contains that source's root for every receiver event. Its lower end comes from the bound $t-S=r\le r^+$ at a root, and it is the same window the individual whole-step kernel box is evaluated on. P2 is therefore satisfied by any slab whose lower end $S_0$ is at or before the lower ends of both members' root windows.

The Stage 2 construction works on cells whose ends are exact segment boundary tokens. So $S_0$ is taken as a segment start token of a member that is at or before both root-window lower ends, compared outward, and $S_{\min}$ if there is none later. The upper end is the step start token $T$, which is every history's end token by H0.

A shorter slab gives a larger $r^-$ and smaller $\ell_0$, $w_0$, $a_0$ and $J$ when the members were elsewhere or moving differently in the far past, and it bounds the work per step by the segments the slab meets and not by the whole history.

## 5. How it enters the step

Inside H4 the receiver's acceleration box is, at present, the sum over present sources of the individual whole-step kernel boxes. With grouping:

- Groups are declared in the request as pairs of path identifiers. Nothing is inferred. A declared group is used for a receiver only if the receiver is neither member, the two charges are exact opposites, and the tests below pass.
- Both members present, and the bound's construction succeeds with finite $B$: the two individual kernel boxes are replaced by the one zero-centred box $[-B,B]^3$.
- Both members absent: the pair contributes zero, as it already does individually.
- One present and one absent: the pair is not grouped for this receiver; the present member is treated individually.
- Either lower sign undecided: the step declines with the existing H3 refusal. Grouping never rescues a step the individual route would refuse on H3.
- Construction fails, for example $r^-$ not positive over the slab: the pair is not grouped for this receiver and both members are treated individually, each then subject to the existing H4 tests.

The step's record lists, per receiver and group, the two member identifiers, the disposition, the slab, the bounds and $B$: two identities and one interval. The rest of the step is unchanged: H5, the tube, publication, the debit, the evidence.

Grouping changes the acceleration box, so it changes the published radii, though not the published centres' meaning. A run with declared groups is a different run from the ungrouped one, and the declared groups are a bound control of the continuation.

## 6. What to expect, stated before measuring

- **The grouped box is usually wider.** An individual kernel box is centred on the source's actual contribution and is as narrow as the step boxes make it. The grouped box is centred on zero with radius $B$, which is at least the size of the pair's net contribution. Replacing two narrow centred boxes by one zero-centred box widens the acceleration box whenever the pair's net contribution is larger than the widths of the individual boxes, which is the ordinary case for small steps. Wider acceleration boxes mean wider published tubes and a larger debit.
- **No root search is saved.** Inside a validated step no root is ever solved, so the snapshot route's main saving does not exist here. What is saved is two interval kernel evaluations and two root-window iterations per receiver, against one slab construction.
- **The step is still limited by the pair's own separation**, by H2.

Increment 2 can therefore answer one question honestly: how much wider the tubes become and what the step costs, with and without grouping, on the same population. It is reported as a measurement. A negative result is a result.

## 7. Truth references, fixed in advance

For a population whose retained past before the first step is exact and prescribed, every delayed event of a reception time $t$ lies in that prescribed past for as long as no post-start emission can have arrived, that is, while $t$ is less than the smallest distance between a receiver's box and a source. In that range the true pair contribution at a receiver event is a closed-form function of the receiver point and the prescribed source motion, with no dependence on the generated segments.

- **Static pair, collinear.** Receiver box on the axis around $0$, members at $10$ and $11$ with charges $+1,-1$, coupling $\kappa$. The true contribution along the axis at receiver point $x$ is $\kappa q_i\left[(10-x)^{-2}-(11-x)^{-2}\right]$ in magnitude with a fixed sign, independent of $t$, and monotone in $x$ on the box. Its exact range over the box is given by the two ends of the box, in rational arithmetic. This is a continuous statement, not a sample.
- **Moving pair, prescribed uniform motion.** The delayed time solves a quadratic; the contribution is evaluated at chosen receiver events with the square root bracketed by rationals. This is a sampled check and is reported as sampled.
- **State truth.** The reviewer's frozen three-path position and velocity brackets and the frozen aliasing bracket, read unchanged, must be contained by the tubes of the grouped run as they are by the ungrouped run.

Cases: the three-path population with the pair grouped and ungrouped; a pair with one member absent, left ungrouped; a declared group whose charges are not opposite, left ungrouped; a declared group containing the receiver; a group whose slab construction fails, left ungrouped; resumption with the same and with a changed group declaration; and the default request with no groups, whose outputs must be byte-identical to increment 1.

## 8. Limits

The bound is first order in the pair's separation over its distance, like the snapshot bound. It is not a multipole expansion. It applies to exactly two members. It does not enlarge the validated domain. And it inherits the open obligations of increment 1: in-process seals only, and no binding into the ordinary request or the checkpoint identity.

## 9. As built in the scratch candidate, and what it measured

Added after the scratch qualification of increment 2. Sections 1 to 8 were written before any runtime existed and are left as they were. The measurements are in the [increment 2 scratch receipt](../evidence/matched-pair-stage-3-increment-2-scratch-receipt-2026-10-12.md).

**The slab is the whole retained past.** The reviewer directed the full slab $[S_{\min},T]$, and that is what the candidate uses. P2 then holds with nothing more to check: Lemma 1 already places each present member's root in $(S_{\min},T)$. The shorter slab of section 4 is not implemented. Its two costs are now visible: the work per step grows with the number of retained segments, and the bounds see the whole past, so one fast or sharply accelerating episode anywhere in the retained history enlarges $B$ for every later step.

**The bounds are those of the snapshot piecewise route, copied.** The slab is cut at every segment boundary of either member, and on each cell the position, velocity and acceleration bounds are the Bernstein control boxes of that cell. A control box of a quadratic velocity can overshoot the true range. On the first design of the between-node case the true peak speed was $0.48$ and the control bound $0.96$, which left $\nu=0.04$ and gave $B\approx9.9$, so large that the receiver's own step velocity box reached field speed and the step was refused on H1. That outcome is retained. It is a sound refusal and a real limit of the construction: the bound is evaluated per whole segment, without subdivision.

**Predicted widening, measured.** For the static three-path population the individual route's receiver acceleration box has width about $3\times10^{-16}$ about the true value $-1.74\times10^{-6}$, and the grouped box is $[-2.0\times10^{-6},2.0\times10^{-6}]$. At $t=1/32$ the receiver's declared position radius is $2.3\times10^{-19}$ ungrouped and $9.8\times10^{-10}$ grouped, a factor of $4\times10^{9}$. Halving the step does not narrow the grouped tube: it is $9.80\times10^{-10}$ with eight steps of $1/256$. The reason is structural. A zero-centred interval of radius $B$ says only that the pair's contribution is somewhere within $\pm B$, so the tube must cover every motion between no contribution and twice the true one, and its radius is about $Bt^2/2$ whatever the step.

**Consequence.** Under the default increment budget of $10^{-8}$ the grouped run is refused at every step and publishes nothing; it needs a budget of about $10^{-6}$ to run at all. On this evidence grouping inside a validated step buys nothing in accuracy and costs nine orders of magnitude in tube width. It remains correct, and it is a faithful two-identity, one-interval accounting. Whether it is ever worth selecting is a cost question for populations much larger than these, where one bound might replace many kernel evaluations, and nothing here measures that.

**Claim grade: measured**, on one static population at two step sizes and one prescribed between-node case.
