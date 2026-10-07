# Correlated phase stability from the finite normal form

**Status: conditional analytical candidate, before any terminal-phase target.** Keep the fixed original gradient member $\epsilon=2^{-200000}$ and its complete prepared past. The finite layer and degree-sixteen autonomous field have separate independent assessments. The normal-form output, its analytic remainder, initial coordinate evaluation and final signed section remain distinct admissions. This note quantifies the phase-stability step under explicit finite premises; it does not choose a terminal branch.

## Premises and low-order controls

Assume the exact finite normal form and forward map in the [construction protocol](authorized-cases-ten-hour-b-normal-form-protocol.md) have passed independent checking. Let $a=|q|$, $\psi=\arg q$, and let $\delta$ be its final parameter coordinate. Its retained scalar polynomials obey

$$
\Lambda=2\delta^3+O(\delta^4),\qquad
B=-\tfrac43\delta^3+O(\delta^4),\qquad
\Omega=1+\tfrac12\delta^2+O(\delta^4).
\tag{1}
$$

The full leading coefficients in (1) are independent of $I=a^2$, as established by the known polynomial controls. Require the coefficient one-norms of the three retained scalar families on $|I|\le4$ to be at most $2^{4096}$; finite derivatives on $|I|\le2$ are then covered by $M=2^{4120}$. This is an audit premise on emitted coefficients, not an empirical estimate.

Assume the separately proposed [actual transformed value bound](authorized-cases-ten-hour-b-normal-form-remainder.md) with $R=2^{175000}$. Before the actual solution leaves its admitted parabolic chart, its equations are

$$
a_\phi=a\Lambda+e_a,\qquad
(\log\delta)_\phi=B+e_b,\qquad
\psi_\phi=\Omega+e_\psi,
$$

$$
|e_a|\le R\delta^{17},\quad |e_b|\le R\delta^{17},\quad
|e_\psi|\le R\delta^{17}/a.
\tag{2}
$$

The comparison solves the same retained scalar equations with these errors zero, beginning at the actual prepared layer's independently enclosed normal coordinates. Require $\epsilon^3\le a_0\le4\epsilon^3$ and $\epsilon/2\le\delta_0\le2\epsilon$ for both the actual and central enclosure values. The independently bounded initial state error and inverse-coordinate Jacobian must supply amplitude/log-parameter differences at most $2^{50010}\epsilon^{11}$ in relative/logarithmic norm. These are concrete initial-coordinate conditions still to be checked, not a freely reset phase.

## Use amplitude as the common independent variable

For $0<\delta\le8\epsilon$ and $0<a\le9/8$, (1) and the finite norm give

$$
\delta^3\le\Lambda\le3\delta^3,\quad
\left|\frac B\Lambda+\frac23\right|\le M\delta,\quad
\left|\partial_{\log\delta}\frac B\Lambda\right|\le M\delta,
$$

$$
\left|\frac\Omega\Lambda\right|\le2\delta^{-3},\qquad
\left|\partial_{\log\delta}\frac\Omega\Lambda\right|\le8\delta^{-3}.
\tag{3}
$$

These follow by expanding the nonzero denominator $\Lambda/\delta^3=2+O(M\delta)$ and differentiating the finite polynomials. Their allowed parameter is so small that $M\delta<2^{-190000}$. Under the preliminary bound $\delta\le8\epsilon(a/a_*)^{-2/3}$ and $a_*\ge\epsilon^3$, one has

$$
\frac{|e_a|}{a\Lambda}\le R\delta^{14}/a
\le2^{175042}\epsilon^{11}<\frac14.
$$

Thus actual amplitude is strictly increasing. Put $v=\log a$. Dividing the first two equations in (2), and then the first and third, gives

$$
\frac{d\log\delta}{dv}=\frac B\Lambda+g,
\qquad |g|\le8R\frac{\delta^{14}}a,
$$

$$
\frac{d\psi}{dv}=\frac\Omega\Lambda+j,
\qquad |j|\le8R\frac{\delta^{11}}a.
\tag{4}
$$

The same comparison equations have $g=j=0$. This change of variable avoids a stability exponential in the number of fast turns.

If the two initial amplitudes differ, advance the smaller one to $a_*=$ their maximum, retaining its short actual/comparison phase increment. The initial relative amplitude error is at most $2^{50010}\epsilon^{11}$. Equations (3)–(4) therefore give log-parameter discrepancy below $2^{50020}\epsilon^{11}$ and phase discrepancy below $2^{50030}\epsilon^8$ at this common section. The initial parameter values there remain between $\epsilon/4$ and $4\epsilon$. This matching is a bounded forward comparison within the original prepared layer's outgoing chart, not a replacement input history.

## A closed slow envelope and its sensitivity

Write $b=a/a_*\ge1$. Integrating the first equation in (4) after adding $2/3$, and using (3), yields

$$
\frac12\delta_*b^{-2/3}\le\delta(a)\le2\delta_*b^{-2/3}
\tag{5}
$$

for both paths. To close this preliminary envelope, use its own upper side to bound $\int\delta\,dv\le12\epsilon$. Also

$$
\int_{\log a_*}^{\log(9/8)}8R\frac{\delta^{14}}a\,dv
<2^{175059}\epsilon^{11}.
\tag{6}
$$

Indeed the integrand is bounded by $8R(8\epsilon)^{14}\epsilon^{-3}b^{-31/3}$, whose integral with respect to $\log b$ is finite. The sum of $12M\epsilon$ and (6) is less than $1/4<\log2$, so a first exit of (5) is impossible. This proves (5), including the monotone-amplitude condition used in deriving (4).

For the two log-parameter solutions compared at the same $a$, the mean-value coefficient in (3) has integral below $24M\epsilon<1/2$. Integrating their difference and applying the elementary integral inequality therefore gives

$$
|\log\delta_{\rm actual}-\log\delta_{\rm map}|
<2^{175063}\epsilon^{11}.
\tag{7}
$$

This bound retains the preparation discrepancy and the actual value error. A norm on the two endpoint values alone, without the common amplitude equation, would not justify it.

## Accumulated phase error

The lower side of (5), $\delta\ge(\epsilon/8)b^{-2/3}$, gives

$$
\int_{\log a_*}^{\log(9/8)}8\delta^{-3}\,dv<2^{16}\epsilon^{-9}.
\tag{8}
$$

Combine (7)–(8) with the phase derivative in (3). Their contribution is below $2^{175079}\epsilon^2$. The direct phase-error integral in (4) is smaller:

$$
\int8R\frac{\delta^{11}}a\,dv<2^{175050}\epsilon^8.
$$

Together with the matched initial phase error this proves, with explicit spare margin,

$$
|\psi_{\rm actual}(a)-\psi_{\rm map}(a)|
<2^{175082}\epsilon^2<2^{190000}\epsilon^2,
\qquad a_*\le a\le9/8,
\tag{9}
$$

where the actual history is covered by its admitted chart. The phase is a continuous lifted angle fixed by the original state, not reset modulo a turn. Equation (9) does not assert that an actual path passes a prior infinite-radius boundary; the last-section comparison must stop at the first such boundary.

The known zero-error control sets $e_a=e_b=e_\psi=0$ and identical prepared inputs, giving exactly zero discrepancy. The leading central slow equations give $\delta a^{2/3}$ constant and total phase proportional to $\delta_0^{-3}a_0^{-2}$, which independently checks the $\epsilon^{-9}$ sensitivity in (8). The final consumer is a signed minimum on an implicitly matched physical section, as required by the [section audit](authorized-cases-ten-hour-b-section-matching-audit.md). No finite tail, uncorrected leading phase or unresolved zero-containing section chooses a terminal branch.

Falsifiers are a failed finite scalar norm, missing amplitude factor in the resonant field, failed initial-coordinate enclosure, an actual error outside (2), a bootstrap exit despite (6), or a phase discrepancy violating (9) within all stated hypotheses. The explicit finite input premises and both analytical candidates require independent assessment before target use.
