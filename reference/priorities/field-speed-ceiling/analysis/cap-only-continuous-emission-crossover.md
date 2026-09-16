# Cap-only continuous-emission crossover calculation

**Date:** 2026-09-15. **Authority:** the operator permits only the field-speed cap as a deviation from the canonical Master Equation. **Claim grade:** derived distributional calculation for one prescribed mirror partner channel on positive-range truncations. No actual crossover trajectory, event update, self-family disposition, or finite velocity jump is established.

## Question and result

Does the continuous emission integral define the simultaneous reception of the partner fronts emitted during the incoming field-speed segment? On any source interval bounded away from the crossover emission, it defines a finite receiver-time acceleration measure concentrated at crossover. Its coefficient diverges when the source interval extends to zero range. Thus the failure of the ordinary emission-time root sum is not, by itself, the end of the calculation: reception time provides a regular integration variable for the positive-range part. The remaining endpoint prevents this construction from yielding a locally finite acceleration measure for the complete family.

The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) supplies the continuous source-time integral and the transmitter-side acceleration weight. The [retained-family geometry](inherited-partner-characteristic-family-disposition.md) supplies the incoming cap and prescribed straight continuation. The existing [FSC-006a theorem](coincidence-open-interval-convergence-and-endpoint-residue.md) obtains the same coefficient as a limit of resolving simple branches under its stated hypotheses. Here the calculation directly integrates the canonical delta in reception time on a fixed prescribed geometry; it does not assume a source-swept reception postulate.

## Geometry and channel

Set $c_f=1$, put crossover at $t=0$, and let the incoming cap last $L>0$. With $\mathbf e$ pointing along receiver 1's incoming motion, prescribe

$$
\mathbf X_1(t)=t\mathbf e,
\qquad
\mathbf X_2(s)=-s\mathbf e,
\qquad -L\le s\le0.
$$

The receiver path is continued straight through zero only as a diagnostic test path. This is not an evolved solution claim. Use $K=\kappa|q_1q_2|>0$ for opposite polarities. Select $0<\varepsilon<L$ and retain partner emissions $s\in[-L,-\varepsilon]$. The cutoff selects a positive-range part of the existing history; it is not a new physical length or a proposed modification of the kernel.

The causal residual and range are

$$
g(t,s)=|t+s|-(t-s),
\qquad r(t,s)=|t+s|.
$$

Near crossover, for $|t|<\varepsilon/2$ and every selected $s$, one has $t+s<0$. Consequently,

$$
g(t,s)=-2t,
\qquad
\hat{\mathbf r}=-\mathbf e,
\qquad
r=-(t+s)>0.
$$

All selected emission times satisfy the causal equality at $t=0$. The derivative in source time vanishes, but the derivative in reception time is $-2$. The causal surface in the two variables $(t,s)$ is regular here even though its fixed-$t=0$ source-time slice is degenerate.

## Evaluate the continuous integral as a measure in reception time

The canonical opposite-polarity partner expression on this truncation is formally

$$
\mathbf A_\varepsilon(t)
=-K\int_{-L}^{-\varepsilon}
\frac{\hat{\mathbf r}(t,s)}{r(t,s)^2}
\delta\bigl(g(t,s)\bigr)\,ds.
$$

It must not be interpreted by assigning a numerical value to $\delta(0)$. Instead, pair it with a smooth test function $\varphi(t)$ supported in the neighborhood above. The distribution identity $\delta(-2t)=\delta(t)/2$ gives

$$
\begin{aligned}
\langle\mathbf A_\varepsilon,\varphi\rangle
&=K\mathbf e\int_{-L}^{-\varepsilon}\int
\frac{\varphi(t)}{(t+s)^2}\delta(-2t)\,dt\,ds\\
&=\frac K2\mathbf e\,\varphi(0)
\int_{-L}^{-\varepsilon}\frac{ds}{s^2}\\
&=\frac K2\left(\frac1\varepsilon-\frac1L\right)
\mathbf e\,\varphi(0).
\end{aligned}
$$

Equivalently, the unprojected channel measure is

$$
d\boldsymbol\mu_\varepsilon(t)
=\frac K2\left(\frac1\varepsilon-\frac1L\right)
\mathbf e\,\delta_0(dt).
$$

This is a finite atom for each fixed positive cutoff. Its direction is forward: the old partner emission centers lie ahead of receiver 1 at crossover. This coefficient is an integrated raw acceleration measure on a prescribed path, not an actual velocity change after application of the ceiling response.

The factor $1/2$ comes directly from the reception-time derivative of the causal residual. It is not an inserted receiver-velocity multiplier in the instantaneous canonical acceleration law. Integrating a distribution in reception time and evaluating an ordinary acceleration at fixed reception time are different operations.

## Remove the positive-range cutoff

For every nonnegative test function equal to one near crossover, the positive component of the measure has pairing

$$
\frac K2\left(\frac1\varepsilon-\frac1L\right)
\longrightarrow+\infty.
$$

Although the local calculation used a neighborhood depending on $\varepsilon$, the resulting atom is at $t=0$ for every selected source time. Indeed, for each fixed $s<0$, the only reception root on the straight path is $t=0$: on the other absolute-value branch, $g=2s\ne0$. Hence the atom formula holds on a fixed small receiver-time neighborhood after restricting the integral to its causal support; the zero-range point $t=-s$ is off that support for each fixed $s<0$. A fixed test function may therefore be used for the divergence statement.

There is no locally finite signed/vector acceleration-measure limit for this partner family as $\varepsilon\downarrow0$. The failure occurs already among positive-delay, positive-range emissions approaching $s=0$; excluding the single exact diagonal point does not remove it. A finite-part subtraction or separately assigned event coefficient would be additional mathematics and requires justification from the authorized law. This calculation supplies neither.

The finite emitted source weight does not contradict the divergence. Uniform emission contributes $q\,ds$, whereas reception includes the inverse-square kernel. Surface integration over an entire sphere cancels its inverse-square density with its area; a point receiver is not performing that whole-sphere integral.

## Distinguish the outgoing partner root

On the prescribed straight outgoing trace, the old cap emissions $s<0$ are no longer causal. The crossover emission $s=0$ is instead a simple positive-range source-time root for each $t>0$, assuming the velocity-preserving source continuation. It has

$$
r=t,\qquad D_t=2,\qquad D_r=0,
\qquad
\mathbf A_{1\leftarrow2}(t)=-\frac{K}{2t^2}\mathbf e.
$$

This contribution is backward and is not removed by a speed-increase cap. It is not the old forward atom continuing after the event. Its positive-time integral diverges toward zero as well. Adding a forward singular event to a backward nonintegrable tail is not an ordinary finite-measure cancellation or a proved velocity history; their time supports differ.

## Cap and self-family boundaries

### Joint incidence and outgoing-endpoint test

The operator asks whether the partner's emission at incidence has been omitted. It has not been assigned zero response: its exact zero-delay value is outside the ordinary formula, while its subsequent positive-delay root is retained. Continuous emission uses source measure $q_t\,ds$, not a separate finite source-time atom $q_t\delta_0(ds)$. Adding such an atom would change the source measure. This observation must not be used to discard the received $s=0$ root for $t>0$: the causal delta selects the source density there and yields the ordinary nonzero row.

One can test the old family and outgoing crossover root jointly, without assigning an extra zero-range kick. Extend the diagnostic straight source path as $X_2(s)=-s$ through positive source times. In the $(t,s)$ plane with $s<t$, the positive-range causal support comprises two pieces:

- $t=0$, $-L\le s<0$: the older cap family, with forward vector sign;
- $s=0$, $t>0$: the crossover-emission branch, with backward vector sign.

They meet at $(0,0)$, where the ordinary direction and inverse-square coefficient are undefined. Impose the same diagnostic range cutoff $r\ge\varepsilon$ on both pieces. For a fixed positive upper time $T$ and a smooth receiver-time test function $\varphi$ supported inside the chosen time window, the joint unprojected partner pairing is

$$
\langle\boldsymbol\mu_\varepsilon,\varphi\rangle
=\frac K2\mathbf e\left[
\left(\frac1\varepsilon-\frac1L\right)\varphi(0)
-\int_\varepsilon^T\frac{\varphi(t)}{t^2}\,dt
\right].
$$

Separate the constant part of the test function:

$$
\langle\boldsymbol\mu_\varepsilon,\varphi\rangle
=\frac K2\mathbf e\left[
\left(\frac1T-\frac1L\right)\varphi(0)
-\int_\varepsilon^T\frac{\varphi(t)-\varphi(0)}{t^2}\,dt
\right].
$$

The $1/\varepsilon$ terms cancel, but for a $C^2$ test function,

$$
\langle\boldsymbol\mu_\varepsilon,\varphi\rangle
=-\frac K2\mathbf e\,\varphi'(0)\log(T/\varepsilon)+O(1).
$$

In particular, choose a fixed smooth test function that equals $t$ near zero and is cut off away from zero. The forward atom has zero pairing because $\varphi(0)=0$, while the backward tail gives a logarithmic divergence. Thus this matched-range-cutoff family has no distributional limit, not merely no finite-measure limit. A signed-total calculation with constant weight can conceal this failure because it ignores the first time moment. The total variation also diverges, since the atom and tail have disjoint time supports.

Adding any finite impulse $J\delta_0$ changes a pairing by $J\varphi(0)$ and cannot cure the divergence for the chosen test with $\varphi(0)=0$. Assigning a finite acceleration only at the isolated time zero likewise cannot repair the neighboring singular tail. A subtraction involving derivatives of test functions would be extra distributional extension data, not a derived finite velocity impulse or a consequence of the cap.

**Grade and scope:** derived for this prescribed straight partner history and this common range cutoff. Verification uses exact delta identities and the Taylor expansion with bounded second derivative. The result does not establish failure of all possible constrained paths, all regularizations, or the complete partner-plus-self ledger. The nonlinear cap response has not been applied to these singular measures. A full constrained limit may change the path and root census and must be evaluated separately; the divergent raw diagnostic alone does not rule it out.

**Falsifier:** a bounded value of the displayed pairing as $\varepsilon\downarrow0$ for a fixed smooth test with $\varphi'(0)\ne0$ would refute the logarithmic conclusion. No numerical approximation was used. No event law, extra source atom, finite-part prescription, or canonical amendment is adopted.

The forward direction of every truncated old-family atom suggests a constrained-response question, but the regular rule projects a complete finite ordinary ledger. Applying it to an atom requires a measure-driven evolution or limiting construction consistent with the cap. This note does not assume that projecting each truncated or smoothed channel before taking a limit is equivalent to forming the complete ledger and applying the authorized cap. In particular, the complete self-family has not been evaluated here. On the straight self trace, the residual vanishes on a two-dimensional region of $(t,s)$, so the reception-time transversality used for the partner family is unavailable.

The historical FSC frozen-family suppression and zero-impulse event convention are not used. A cap-only conclusion must derive any required event treatment rather than borrow those extra rules.

## Verification, falsifiers, and next target

### Exploratory reception audit: source weight is not a transfer budget

The operator clarified that this discussion makes no adoption decisions. The following distinction audits the current law and identifies possible questions; it changes no kernel, event response, or self-reception rule.

The [constant-time emission postulate](../../../../content/markdown/aaa/foundations/architrino.md#constant-time-emission-measure-postulate) fixes continuous source weight $q_t\,ds$ in normalized units. Uniform distribution over a sphere gives surface density $q_t\,ds/(4\pi r^2)$. This is an integrated source normalization, not an acceleration prescription. The [transparent reception rule](../../../../content/markdown/aaa/dynamics/master-equation.md#autonomous-emission-labeled-wake-transport) supplies the further dynamical assumption: multiply the local inverse-square kernel by receiver polarity, coupling, and the causal support delta, then integrate over emission history. On simple roots, the delta change of variables derives $1/|D_t|$. The root Jacobian is therefore derived within the assumed kernel scaffold; neither the kernel's linear response at arbitrary density nor a bounded response follows from total source weight alone.

Under the current law the sphere is left unchanged by reception. Consequently $q_t\,ds$ is not a consumable allowance partitioned among receivers. The theory does not currently calculate acceleration by measuring the fraction of a sphere absorbed by one receiver. In particular, a point has zero area under the ordinary uniform surface measure, so literally integrating over a point would yield zero, not the canonical finite ordinary response. The Master Equation instead evaluates a local density functional with its stated coupling. This does not prove that every physically possible point interaction vanishes; it identifies the difference between the current law and a literal finite-area collection model.

For a stationary source and receiver at separation $R>0$, direct evaluation of the same causal delta gives $|\mathbf A|=\kappa|q_rq_t|/R^2$. This is an instantaneous diagnostic on prescribed positions, not an equilibrium or an evolved static pair. The surface emission integral is fixed while the response grows as $R\downarrow0$. Hence bounded total source weight and unbounded local response already coexist in the ordinary positive-range law, without any speed ceiling or simultaneous-arrival complication.

There are two distinct possible meanings of the operator's bounded-emission intuition. A bound on the fraction of emitted measure assigned to one reception needs a reception functional specifying what part is sampled and whether reception changes the wake. A bound on the resulting acceleration or velocity increment additionally needs a conversion law with the correct units. Neither can be inferred by writing $|\mathbf A|\le q$, since the quantities are different types. A finite-area sampling rule could have a bounded fraction, but its area and small-radius geometry would be additional input; a saturation law could bound response without literal collection, but its scale and composition rule would likewise need derivation. These are exploratory distinctions, not proposals adopted by this note or consequences of the cap-only model.

The concrete next mathematical object is a receiver functional acting on the labeled emitted measure that recovers the canonical regular row on its declared domain. One can then ask whether it has a uniquely determined finite extension at zero range and characteristic families. Agreement with the ordinary law at all positive radii alone cannot give a bounded continuous extension of its inverse-square static response at zero. An extension affecting a neighborhood, a distributional event account, or a different solution class must expose its additional assumptions. Falsifiers are disagreement with the canonical regular row, loss of source normalization, an implicit size or timescale, or a finite-response assertion unsupported by a bounded measure-to-response map.

Verification is analytic: substitute the prescribed paths into $g$, differentiate in reception time, apply the exact delta scaling identity, and integrate $s^{-2}$ on a positive-range interval. No numerical instrument or simulation is used. The existing FSC-006a coefficient is a consistency comparison, not an independent numerical validation.

The positive-range theorem is falsified by an error in the causal residual, polarity direction, canonical kernel normalization, or distributional change of variables on the declared smooth positive-range support. The divergence claim is falsified by a bounded pairing with the stated nonnegative fixed test function as the cutoff vanishes. Neither claim asserts that every possible outgoing solution fails.

The next target is a complete cap-only near-event evolution, including the self-family, with a declared notion of solution and a finite velocity history. The present result establishes exactly why the continuous integral alone does not supply a finite first braking impulse or a complete crossover rule.
