# Exploring a bounded portion-of-emission reception functional

**Date:** 2026-09-15. **Status:** exploratory mathematical comparison only; no decision or rule adopted. **Authority:** the cap-only Master Equation remains the baseline. The bounded functional below changes its small-range kernel and is not a result of the speed cap. **Claim grades:** derived conditional algebra for the stated functional; guessed physical interpretation and selection of its scale.

## The question

Can “a receiver feels at most the whole emitted amount” be made mathematically precise while recovering the ordinary inverse-square response? Yes, as a bounded response-weighting model, provided a transition scale and conversion factor are supplied. It cannot be identical to the inverse-square response at every positive radius and simultaneously have a bounded continuous zero-radius limit.

The [canonical source and reception definitions](../../../../content/markdown/aaa/dynamics/master-equation.md#autonomous-emission-labeled-wake-transport) distinguish emitted measure from its local receiver response. The [continuous crossover calculation](cap-only-continuous-emission-crossover.md) identifies the zero-range divergence this comparison tests. No source depletion, finite physical architrino radius, event rule, self-family rule, or continuation is inferred here.

## A precise portion functional

Use $c_f=1$. For a positive-radius sphere of one emission-time label $s$, the signed emitted measure is

$$
d\mu_s(\omega)=\frac{q_t\,ds}{4\pi}\,d\Omega,
\qquad \omega\in S^2.
$$

Choose a nonnegative response weighting $w_r(\omega)\le1$. Define the sampled signed source weight by

$$
dQ_{\mathrm{sample}}(r)
=\int_{S^2}w_r(\omega)\,d\mu_s(\omega)
=q_t\,ds\,F(r),
$$

where

$$
F(r)=\frac1{4\pi}\int_{S^2}w_r(\omega)\,d\Omega,
\qquad 0\le F(r)\le1.
$$

Thus the magnitude sampled from each source-time interval is no greater than its total emitted magnitude. This is a mathematical weighting operation, not a derived literal collection geometry for a point receiver. If $w_r$ were the indicator of only a geometric point, its surface integral would be zero. A nonzero functional therefore needs a response interpretation beyond literal point area. It also does not partition the emission among several receivers: independent weights may overlap, consistent with transparent sampling but not a consumable budget. A depletion interpretation would require further rules.

The scalar sampled amount does not define acceleration. Retaining the current line-of-action direction and causal support requires an additional response calibration. Write the trial acceleration as

$$
\mathbf A^{(b)}_{r\leftarrow t}(t)
=\kappa\sigma_{tr}|q_rq_t|
\int_{s<t}G_b(r(t,s))\,\hat{\mathbf r}(t,s)
\delta\bigl(r(t,s)-(t-s)\bigr)\,ds.
$$

This explicitly declares the radial vector response rather than pretending that integrating scalar source weight over a whole sphere derives a vector. At exact zero range that direction still needs a treatment.

## One bounded example and its calibration

For an exploratory response length $b>0$, let

$$
F_b(r)=\min\left(1,\frac{b^2}{r^2}\right),
\qquad
G_b(r)=\frac{F_b(r)}{b^2}
=\begin{cases}
b^{-2},&0<r\le b,\\
r^{-2},&r\ge b.
\end{cases}
$$

A weight with angular average $F_b$ exists, for example the constant weight $w_r=F_b(r)$. Such a weight establishes mathematical realizability of the scalar functional, not a physical sampling mechanism. A literal area interpretation would correspond to total response area $4\pi b^2$ in the unsaturated regime, but no physical radius is assigned to an architrino here.

The factor $b^{-2}$ converts the bounded fraction into the kernel normalization. For $r\ge b$, $G_b=1/r^2$ exactly, so every simple root in that range retains its canonical contribution, including the original transmitter factor $1/|D_t|$. For $0<r<b$, the model changes the law: the fraction approaches one and the radial kernel remains $1/b^2$ rather than diverging. Boundedness of this radial factor does not bound all root-Jacobian effects.

The choice of $b$ is not supplied by total emission normalization. It might eventually be expressed using existing dimensional data; it need not be a new independent primitive constant. Even a choice proportional to an available length, however, needs a derived relation and coefficient, and the saturation shape remains a separate assumption. No value or relationship is selected here.

## What happens to the accumulated partner family

On the prescribed incoming mirror geometry, integrating the canonical causal delta in reception time gives the factor $1/2$, as in the continuous crossover calculation. Replacing only the radial kernel by $G_b$ gives the raw forward event coefficient

$$
J_b=\frac K2\int_0^L G_b(\tau)\,d\tau
=\begin{cases}
\dfrac{KL}{2b^2},&L\le b,\\[4pt]
\dfrac Kb-\dfrac{K}{2L},&L\ge b.
\end{cases}
$$

Both cases agree at $L=b$. The coefficient is finite for fixed $b>0$. It is forward, not braking, and it remains a delta measure at crossover on this trial path. This calculation is not the actual velocity change under a capped event evolution. Its divergence as $b\downarrow0$ recovers the absence of a finite cap-family coefficient for the unmodified sharp kernel; thus this comparison does not hide the original singular limit.

## What happens to the outgoing crossover front

For the velocity-preserving straight outgoing diagnostic, $D_t=2$ and $r=t$. The backward contribution becomes

$$
\mathbf A^{(b)}_{\mathrm{partner}}(t)
=-\frac K2G_b(t)\mathbf e.
$$

It has finite right-limit magnitude $K/(2b^2)$, and its integrated magnitude through a positive time $T$ is

$$
B_b(T)=\begin{cases}
\dfrac{KT}{2b^2},&T\le b,\\[4pt]
\dfrac Kb-\dfrac{K}{2T},&T\ge b.
\end{cases}
$$

This illustrates a finite initial braking response once a bounded small-range kernel is hypothesized. The receiver would then depart from the straight test path, changing the selected emission times; these formulas are diagnostics, not a solved trajectory or a proved rebound. The matching algebraic forms of $J_b$ and $B_b$ do not authorize cancelling them: they represent different time supports and the cap treats their directions differently.

## What is and is not resolved

This example makes three requirements compatible: bounded sampled fraction, exact ordinary inverse-square radial response beyond a declared scale, and finite integrated partner response for the specified cap-family diagnostic. It does not derive the weighting, calibration, scale, or saturation profile from the primitives. It does not resolve a full nonisolated self family, select a zero-range vector, define a constrained response to an atom, establish joint existence or uniqueness, or provide a conservation law. Those gaps persist even though this particular small-radius integral becomes finite.

If exact canonical inverse-square response is required for every $r>0$, no bounded continuous radial extension exists: take any sequence $r_n\downarrow0$ and $G(r_n)=1/r_n^2\to\infty$. Assigning a finite value only at $r=0$ changes neither that limit nor the divergent integral. Therefore a bounded continuous density-response route necessarily affects a neighborhood of zero range. A different distributional or cancellation route would require a separate argument; this elementary observation excludes neither every event treatment nor every cap-only motion.

## Verification and exploratory next question

### Alternative raised by the operator: constrain velocity rather than bound the kernel

The operator notes that the speed ceiling may keep motion finite even when the driving acceleration is very large. This is a separate route from the bounded reception functional above. Divergence of an unprojected trial-path acceleration integral alone does not prove divergence of a constrained velocity or require a small-range kernel change.

For a one-dimensional supplied-ledger illustration with $c_f=1$, let $v(0)=1$ and apply constant backward acceleration $-a$ for a duration $\epsilon$, with $a>0$. Under the ordinary one-dimensional boundary projection,

$$
v(t)=\max(-1,1-at),\qquad 0\le t\le\epsilon.
$$

For $a\epsilon\ge2$, the receiver reverses and reaches $v=-1$; subsequent negative driving acceleration is forward relative to its new velocity and is suppressed. The net velocity change is $-2$, regardless of how much larger $a\epsilon$ becomes. A sequence of such pulses with $\epsilon\downarrow0$ and $a\epsilon\ge2$ has a bounded-velocity reversal limit with a velocity jump. This is a derived supplied-ledger example, not a partner-wake calculation, and introduces no claim that the crossover ledger is such a pulse.

The relevant cap-only research question is therefore whether the actual coupled causal-root ledger and constrained motion admit a unique finite limit of this kind, without selecting an arbitrary pulse, smoothing, or event update. A velocity jump is outside the older FSC assumption of continuous velocity at the zero-impulse event, but that historical assumption must not be used to dismiss the operator's exploratory alternative under cap-only authority. Conversely, the inequality $|v|\le1$ alone does not select a jump, reversal, or unique solution. In more general motion a speed bound also does not bound total variation of velocity or guarantee a limiting direction.

For the actual mirror geometry, immediate rebound changes the root census: the old partner cap becomes a full characteristic interval on the rebound ray, as proved in the [inherited-family analysis](inherited-partner-characteristic-family-disposition.md#general-right-trace-dichotomy-for-the-retained-partner-cap). The straight-trial backward expression cannot be carried unchanged into that rebound. A complete calculation must update the geometry while the cap acts. The possibility remains open; no rebound rule, pulse approximation, bounded kernel, or event law is adopted.

All checks here are analytic: source normalization gives $|dQ_{\mathrm{sample}}|\le|q_t|ds$; substitution gives exact kernel recovery for $r\ge b$; direct integration gives both piecewise coefficients; their values match at the transition. No numerical instrument, simulation, or physical inference was used.

The next explanatory task is to identify what receiver property, if any, could supply the weighting and conversion without a primitive physical size or an arbitrarily fitted cutoff. This is a research question, not an adopted change. A derivation must also decide whether sampling is transparent or consumptive and must recover the regular Master Equation in its claimed comparison domain. Failure of either recovery or normalization falsifies the proposed comparison. A finite crossover trajectory requires additional complete-ledger analysis and is not established by the bounded kernel alone.
