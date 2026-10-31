# A regrouped strength allowance extends the balance-function obstruction to speed bound 129/1000 (2026-10-21)

## Result

**Grouping the remaining terms of the strength-error identity around the single vector $\mathbf e+\tau\boldsymbol\sigma=-\int(t-u)\,\ddot{\mathbf x}_j(u)\,du$ halves the part of the curved-window strength allowance that is proportional to the transmitter's speed, and divides its order-one part by three. With the smaller allowance, the balance-function obstruction excludes relative-periodic histories, and forces every complete history to separate without limit, at every speed bound up to $129/1000$.** The [sharpened-allowance note](saturday-binary-inout-asymmetry-2026-10-21-sharpened.md) bounds the five non-leading terms of its exact identity (Lemma Y.8) one at a time and reaches $59/500$. Two pairs of those terms share a factor: $\tau\,\mathbf e\cdot\mathbf v+\tau^2\mathbf v\cdot\boldsymbol\sigma=\tau\,\mathbf v\cdot(\mathbf e+\tau\boldsymbol\sigma)$ and $|\mathbf e|^2+\tau\,\mathbf e\cdot\boldsymbol\sigma=\mathbf e\cdot(\mathbf e+\tau\boldsymbol\sigma)$, and the bound on the shared vector is one third of the bound that the separate estimates give for it; since the delay-error term is unchanged, the total speed-dependent allowance is halved. The class $\mathcal C_w$ and the notation are those of the sharpened note and of the companion [balance-function](saturday-binary-inout-asymmetry-2026-10-21.md) and [separation](saturday-binary-inout-asymmetry-2026-10-21-separation.md) notes.

1. **A regrouped strength allowance (derived).** On every history in $\mathcal C_w$, $|a_i-a_i^0|\le(\kappa_1^{\rm reg}+\kappa_2^{\rm reg}/r)/r^3$ with $\kappa_1^{\rm reg}=(\hat\tau^2\hat\Omega/4+w\hat\tau^3\hat a)/\mathcal D$ and $\kappa_2^{\rm reg}=\tfrac14\hat\tau^4\hat a^2/\mathcal D$, against $2w\hat\tau^3\hat a$ and $\tfrac34\hat\tau^4\hat a^2$ in the sharpened note (Lemma Y.13). At the formal endpoint $w=0$ the allowance's leading coefficient is $1/4$, equal to the leading large-$r$ coefficient of the strength error in the curved-window note's constant-acceleration example, and the numerator bound's order-one term is attained exactly by that example.
2. **The extended certificate (derived; evaluated exactly).** With this allowance the certificate is positive for every $w\le129/1000$; at $w=1/10$ it exceeds $1.2857$ and at $w=1/8$ it exceeds $0.2916$. Hence no relative-periodic history exists in $\mathcal C_w$, and every complete history in $\mathcal C_w$ has separation tending to infinity at both ends of time, for every speed bound at or below $129/1000$ (Theorem Y.14). The grid evaluation first fails at $13/100$.

> Claim grade: derived for Lemma Y.13 and Theorem Y.14, by the hand proofs below from the sharpened note's Lemmas Y.8–Y.11 and the companion theorems; the constants and the certificate are exact-rational evaluations by a same-author instrument that passed four known cases first, two of them regressions against the sharpened note's instrument; the regrouping identity was also compared in floating point on prescribed paths after two known cases, which checks algebra only. This is arithmetic and algebraic verification, not independent evidence. Nothing is measured on a history. Falsifier: a complete relative-periodic history in $\mathcal C_w$ with $w\le129/1000$, or a complete history there whose separation stays bounded on a half-line, refutes Theorem Y.14; a solution violating the bound of Lemma Y.13 refutes it or an input it uses; an exact evaluation with $\Gamma_{\rm reg}(129/1000)\le0$ withdraws the threshold.

## 1. The regrouping

With $\mathbf e=\int_s^t(u-s)\,\ddot{\mathbf x}_j(u)\,du$ and $\boldsymbol\sigma=-\int_s^t\ddot{\mathbf x}_j(u)\,du$ as in the sharpened note,

$$
\mathbf e+\tau\boldsymbol\sigma=\int_s^t\bigl[(u-s)-\tau\bigr]\ddot{\mathbf x}_j(u)\,du=-\int_s^t(t-u)\,\ddot{\mathbf x}_j(u)\,du,
\qquad
|\mathbf e+\tau\boldsymbol\sigma|\le\tfrac12\tau^2\bar a .
$$

This is the transmitter's displacement over the window measured from the backward tangent line at the emission time, with the sign reversed. The separate bounds $|\mathbf e|\le\tfrac12\tau^2\bar a$ and $\tau|\boldsymbol\sigma|\le\tau^2\bar a$ allow up to $\tfrac32\tau^2\bar a$ for it.

**Lemma Y.13 (derived).** On every history in $\mathcal C_w$, at every instant and for both members,

$$
|a_i-a_i^0|\le\frac{\kappa_1^{\rm reg}}{r^3}+\frac{\kappa_2^{\rm reg}}{r^4},\qquad
\kappa_1^{\rm reg}=\frac{\hat\tau^2\hat\Omega/4+w\hat\tau^3\hat a}{\mathcal D},\qquad
\kappa_2^{\rm reg}=\frac{\tfrac14\hat\tau^4\hat a^2}{\mathcal D},
$$

with $\hat\tau$, $\hat a$, $\hat\Omega$ and $\mathcal D$ as in the sharpened note's Lemma Y.9.

*Proof.* By the sharpened note's Lemma Y.8, whose strength relation applies because $D\ge1-w>0$ on $\mathcal C_w$,

$$
TE^0-\tau E=\boldsymbol\rho\cdot\int_s^tm\,\ddot{\mathbf x}_j\,du+\tau\,\mathbf v\cdot(\mathbf e+\tau\boldsymbol\sigma)-\mathbf e\cdot(\mathbf e+\tau\boldsymbol\sigma)-(\tau-T)\,\boldsymbol\rho\cdot\mathbf v .
$$

The first term is at most $\hat\tau^2\hat\Omega\,r/4$, exactly as in the proof of Lemma Y.9. The second is at most $\tau\,w\,\tfrac12\tau^2\bar a\le\tfrac12w\hat\tau^3\hat a\,r$. The fourth is at most $\frac{|\mathbf e|}{1-w}\,rw\le\frac{wr\tau^2\bar a}{2(1-w)}\le\tfrac12w\hat\tau^3\hat a\,r$, as in Lemma Y.9. The third is at most $\tfrac12\tau^2\bar a\cdot\tfrac12\tau^2\bar a\le\tfrac14\hat\tau^4\hat a^2$. Dividing by $\tau ETE^0\ge\mathcal Dr^4$ gives the lemma. $\blacksquare$

**Sharpness at the formal endpoint $w=0$.** At $w=0$, $\hat\tau=\hat a=\mathcal D=1$ and $\hat\Omega=0$, so the allowance is $1/(4r^4)$. For the curved-window note's example, a transmitter at rest now with constant acceleration $g$ toward the receiver, the first and the velocity terms of Lemma Y.8 vanish and $TE^0-\tau E=-\mathbf e\cdot(\mathbf e+\tau\boldsymbol\sigma)=\tfrac14g^2\tau^4$ exactly, which is the numerator bound $\tfrac14\tau^4\bar a^2$ with equality. No smaller multiple of $\tau^4\bar a^2$ can therefore bound the numerator for every window acceleration of size at most $\bar a$. The exact strength error also carries the denominator $\tau ETE^0$; with $g=1/r^2$ and $\tau,E,T,E^0$ all equal to $r$ at leading order, its leading large-$r$ value is $1/(4r^4)$, the allowance's leading coefficient.

## 2. The extended certificate

**Theorem Y.14 (derived).** Let $c_{\rm reg}=2\kappa_1^{\rm reg}+2\kappa_2^{\rm reg}/\rho_w$ with $\rho_w=c_-/(4w^2)$, and define $C_A^{\rm reg}$, $e^{\rm reg}$ and $\Gamma_{\rm reg}(w)$ by the sharpened note's formulas for $C_A^{\rm new}$, $e^{\rm new}$ and $\Gamma_{\rm new}$ with $c_{\rm reg}$ in place of $c_{\rm new}$ and the same $\hat\epsilon_{\rm new}$. If $\Gamma_{\rm reg}(w)>0$, no history in $\mathcal C_w$ is relative-periodic, and every complete history in $\mathcal C_w$ satisfies $\int_{-\infty}^\infty r^{-3}dt<\infty$ and $r(t)\to\infty$ as $t\to\pm\infty$. Exact rational evaluation gives $\Gamma_{\rm reg}(129/1000)>0$, so both conclusions hold for every speed bound at or below $129/1000$.

*Proof.* Lemma Y.13 and the separation floor give $|a_i-a_i^0|\le c_{\rm reg}/(2r^3)$ on relative-periodic and on complete histories in $\mathcal C_w$. The proof of the sharpened note's Lemma Y.11 uses the strength allowance only through this inequality, so the companion's Lemma Y.3 holds with $(C_A^{\rm reg},e^{\rm reg})$, and the proof of Theorem Y.12 then applies with $\Gamma_{\rm reg}$ in place of $\Gamma_{\rm new}$. Class nesting covers every smaller speed bound. $\blacksquare$

The exact evaluation gives the following conservative values; lower bounds are rounded down and upper bounds up.

| speed bound $w$ | $c_{\rm reg}<$ ($c_{\rm new}<$) | $C_A^{\rm reg}<$ | $e^{\rm reg}<$ | $\Gamma_{\rm reg}>$ ($\Gamma_{\rm new}>$) |
| --- | --- | --- | --- | --- |
| $1/100$ | $0.098244$ ($0.12153$) | $0.098428$ | $0.019832$ | $1.9976$ ($1.9971$) |
| $1/20$ | $0.72644$ ($0.95107$) | $0.73360$ | $0.19432$ | $1.9095$ ($1.8864$) |
| $1/10$ | $2.6796$ ($3.8913$) | $2.7329$ | $0.91614$ | $1.2857$ ($1.0155$) |
| $1/8$ | $4.9121$ | $5.0308$ | $1.8247$ | $0.29164$ (lower enclosure negative) |
| $129/1000$ | | | | $0.038868$ |

The lower enclosure of $\Gamma_{\rm reg}$ is about $-0.278$ at $w=2/15$, and the upward grid scan in steps of $1/1000$ first fails at $13/100$, where the lower enclosure is about $-0.030$. Each piece of $\Gamma_{\rm reg}$ changes with $w$ in the direction that makes it strictly decreasing, as for $\Gamma_{\rm new}$, so $\Gamma_{\rm reg}$ is positive on all of $(0,129/1000]$. The instrument computes only lower enclosures, and the negative lower enclosure at $13/100$ does not by itself prove $\Gamma_{\rm reg}(13/100)<0$; the chunk-4 round-1 review's two-sided enclosure gives $-0.03003<\Gamma_{\rm reg}(13/100)<-0.03002$, so with continuity and strict decrease the end of the positive range lies between $129/1000$ and $13/100$. A non-positive certificate says only that this proof gives nothing there.

**Worked reading at speed bound one eighth.** A pair whose speeds never exceed $0.125$ cannot repeat and cannot stay bound: over each relative period of a hypothetical repeating history the accumulated change of the balance function would be at least $0.2916\oint r^{-3}dt$, while over any number of periods it changes by at most $2(1-\sqrt{1-1/64})/r(0)<0.0158/r(0)$. At this speed bound the curvature term already uses most of the straight gain ($1.4135$ of $1.9486$ in the instrument's output), so further improvement may come from tighter window or averaging estimates; controlling the variation of the window acceleration is one possible route.

## Limits

The class, inputs and recurrence notions are those of the sharpened note; the regrouping is an exact identity and changes no input. The constants are not claimed optimal beyond the zero-speed sharpness remark, which concerns only the order-one coefficient within this decomposition. No history was integrated, no prescribed path was used as a solution, and no repeating or bound solution is shown to exist; the classes considered may be empty. Mirror symmetry, constant common velocity, any conserved quantity and observer-level physics are not assumed. Nothing here changes BP-001, production gates or canonical scores.

## Instrument

The constants, the certificate and the regrouping check come from [`balance_function_regrouped.py`](../evidence/saturday-binary-inout-asymmetry-2026-10-21/balance_function_regrouped.py), a third separate file, described in the [evidence README](../evidence/saturday-binary-inout-asymmetry-2026-10-21/README.md). Part A, in floating point, first reproduces the exact value $\mathbf e+\tau\boldsymbol\sigma=-\tfrac12\tau^2\mathbf g$ for a constant acceleration $\mathbf g$ (three delays) and the value zero for a straight path, then compares $\mathbf e+\tau\boldsymbol\sigma$ with Simpson quadrature of $-\int(t-u)\ddot{\mathbf x}_j\,du$ on 300 prescribed paths (largest scaled difference $2.8\times10^{-11}$). Part B, in exact rational arithmetic, first reproduces the zero-speed values $\kappa_1^{\rm reg}=0$, $\kappa_2^{\rm reg}=1/4$, $\Gamma_{\rm reg}=2$, the sharpened note's value $\Gamma_{\rm new}(1/10)>1.0155$ and its sign pattern at $59/500$ and $119/1000$ as regressions, and the square-root controls, and then evaluates the targets. This is the author's arithmetic verification, not independent evidence.

## Falsifiers

- A transmitter path for which $\mathbf e+\tau\boldsymbol\sigma\ne-\int_s^t(t-u)\ddot{\mathbf x}_j\,du$ refutes the regrouping; prescribed paths suffice.
- A solution in $\mathcal C_w$ at which $|a_i-a_i^0|$ exceeds the bound of Lemma Y.13 refutes it, or an accepted input it uses.
- A complete relative-periodic history in $\mathcal C_w$ with $w\le129/1000$, or a complete history there whose separation stays bounded on a half-line, refutes Theorem Y.14.
- A valid solution violating an accepted input invalidates it and withdraws the proof support of every statement using it; it refutes such a statement only if it also violates that statement's conclusion.
- An exact evaluation with $\Gamma_{\rm reg}(129/1000)\le0$ withdraws the threshold, and one showing a tabulated decimal non-conservative withdraws that entry.

## Reading record (operational)

The reading recorded in the balance-function note covers this note. The regrouping was first recorded in the working log at 03:07:56Z on 2026-10-21, after the sharpened note had been submitted for review; the instrument ran at 03:08:52Z and this note was written between 03:09Z and 03:10Z by the clock. This record is development provenance and not part of the academic treatment.
