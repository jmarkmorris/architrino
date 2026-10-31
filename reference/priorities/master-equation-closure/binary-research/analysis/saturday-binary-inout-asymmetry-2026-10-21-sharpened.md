# Sharper curved-window allowances extend the balance-function obstruction to speed bound 59/500 (2026-10-21)

## Result

**With sharper allowances for the curvature of the two delay windows, the balance-function obstruction excludes repeating two-member histories, and forces every complete history to separate without limit, at every speed bound up to $59/500=0.118$, which includes the speed bound one tenth used by the accepted October 20 notes.** The [balance-function note](saturday-binary-inout-asymmetry-2026-10-21.md) and its [separation companion](saturday-binary-inout-asymmetry-2026-10-21-separation.md) reach $81/1000$; their certificate is limited by the accepted curved-window constant $c(w)$, which exceeds $12.7$ at $w=1/10$, and by the accepted aberration allowance. Both accepted allowances bound the effect of the transmitter's acceleration over its delay window by the size of that acceleration alone. This note uses two further facts about that acceleration. Its component along the separation axis enters the strength of the received row only through its *variation* over the window, because a constant acceleration produces two changes, of the delay and of the transmitter factor, that cancel exactly at leading order. And its component across the present axis is itself of first order in the speed bound, because each row points within a small angle of the separation axis.

The setting is the class $\mathcal C_w$ of the two companion notes: complete planar pairs of opposite unit polarity under the unchanged [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), unit reduced coupling, $c_f=1$, twice continuously differentiable paths, positive separation, both speeds at most $w<1/3$ over the whole history, one ordinary partner root per member and no positive-delay own root.

1. **An exact identity for the strength error (derived; kinematic).** For one received row, the difference between the actual strength and its straight comparison value has the exact numerator $TE^0-\tau E=\boldsymbol\rho\cdot\int m(u)\,\ddot{\mathbf x}_j(u)\,du+\tau\,\mathbf e\cdot\mathbf v+\tau^2\mathbf v\cdot\boldsymbol\sigma-|\mathbf e|^2-\tau\,\mathbf e\cdot\boldsymbol\sigma-(\tau-T)\,\boldsymbol\rho\cdot\mathbf v$, where the weight $m(u)=2(u-s)-\tau$ has zero integral over the window (Lemma Y.8).
2. **A strength allowance of first order in the speed bound (derived).** On solutions, $|a_i-a_i^0|\le(\kappa_1(w)+\kappa_2(w)/r)/r^3$ with $\kappa_1(w)=O(w)$ and $\kappa_2(0)=3/4$. On histories that respect the separation floor this gives $|a_i-a_i^0|\le c_{\rm new}(w)/(2r^3)$ with $c_{\rm new}(1/10)<3.8913$, against the accepted $c(1/10)\le12.725$ (Lemmas Y.9 and Y.11).
3. **An aberration allowance of first order in the speed bound (derived).** On solutions, $|\sin\beta_1+b_2|$ and $|\sin\beta_2-b_1|$ are at most $\hat\epsilon_{\rm new}(w)/r$ with $\hat\epsilon_{\rm new}=O(w)$; at $w=1/10$, $\hat\epsilon_{\rm new}<0.2411$ against the accepted $121/98\approx1.235$ (Lemma Y.10).
4. **The extended certificate (derived; evaluated exactly).** With these allowances the companions' Lemma Y.3 holds with sharper constants, and the certificate $\Gamma_{\rm new}$ is positive for every $w\le59/500$; at $w=1/10$, $\Gamma_{\rm new}>1.0155$. Hence no relative-periodic history exists in $\mathcal C_w$, and every complete history in $\mathcal C_w$ has separation tending to infinity at both ends of time, for every speed bound at or below $59/500$ (Theorem Y.12). The grid evaluation first fails at $119/1000$.

> Claim grade: derived for Lemmas Y.8–Y.11 and Theorem Y.12, by the hand proofs below from accepted pointwise inputs and the two companion notes; the constants and the certificate are exact-rational evaluations by a same-author instrument that passed four known cases first, one of them a regression against the first instrument's value; the identity of Lemma Y.8 was also compared in floating point on prescribed paths after two known cases, which checks algebra only. This is arithmetic and algebraic verification, not independent evidence. Nothing is measured on a history. Falsifier: a complete relative-periodic history in $\mathcal C_w$ with $w\le59/500$, or a complete history there whose separation stays bounded on a half-line, refutes Theorem Y.12; a pair of $C^2$ paths violating the identity of Lemma Y.8 refutes it; a solution in $\mathcal C_w$ violating the bound of Lemma Y.9 or Y.10 refutes that lemma, or one of the accepted inputs it uses; an exact evaluation with $\Gamma_{\rm new}(59/500)\le0$ withdraws the threshold.

## Setting, notation and inputs

The notation is that of the [curved-window note](saturday-curved-window-strength-difference-2026-10-11.md) and the [non-mirror note](saturday-nonmirror-periodicity-2026-10-11.md). Fix an instant $t$ and a receiver $i$ with transmitter $j$. The present separation seen from the transmitter is $\boldsymbol\rho=\mathbf x_i(t)-\mathbf x_j(t)$, of length $r$, and $\hat{\boldsymbol\rho}=\boldsymbol\rho/r$ (so $\boldsymbol\rho=\mathbf r$ for $i=1$ and $\boldsymbol\rho=-\mathbf r$ for $i=2$). The transmitter's present velocity is $\mathbf v=\mathbf v_j(t)$. The actual row has delay $\tau=t-s$, emission point $\mathbf x_j(s)$, displacement $\mathbf R=\mathbf x_i(t)-\mathbf x_j(s)$ with $|\mathbf R|=\tau$, transmitter velocity at emission $\mathbf v_j(s)$, factor $D=1-\hat{\mathbf R}\cdot\mathbf v_j(s)$, $E=\tau D$ and strength $a_i=1/(\tau E)$. The straight comparison row has delay $T$ with $T=|\boldsymbol\rho+T\mathbf v|$, $E^0=T-(\boldsymbol\rho+T\mathbf v)\cdot\mathbf v=rS_j$ and strength $a_i^0=1/(TE^0)$. Following Lemma S.2 of the curved-window note,

$$
\mathbf e=\mathbf x_j(s)-\mathbf x_j(t)+\tau\mathbf v=\int_s^t(u-s)\,\ddot{\mathbf x}_j(u)\,du,\qquad
\boldsymbol\sigma=\mathbf v_j(s)-\mathbf v=-\int_s^t\ddot{\mathbf x}_j(u)\,du,
$$

so that $\mathbf R=\boldsymbol\rho+\tau\mathbf v-\mathbf e$. Write $\bar a$ for the largest transmitter acceleration over the window. The speed-bound constants are $\alpha=(1-w)^2/(1+w)$, $c_1=(1+w)^2/(1-w)$, $S_w=\sqrt{1-w^2}$, $\hat t=w/S_w$ and $c_-=2(1-w)^2S_w/(1+w)$, and the dimensionless window constants are

$$
\hat\tau=\frac1{1-w},\qquad\hat a=\frac{(1+w)^2(1-w)}{(1-3w)^2}.
$$

The accepted inputs, all pointwise on histories in $\mathcal C_w$ and needing no recurrence, are: (B1) $r/(1+w)\le\tau\le\hat\tau r$; (B2) $\alpha/r(u)^2\le a_j(u)\le c_1/r(u)^2$ at every time $u$; (B3) for $u$ in the window, $r(u)\ge r-2w(t-u)\ge r(1-3w)/(1-w)=:r_{\rm lo}$, and likewise $r(u)\le r+2w(t-u)\le r(1+w)/(1-w)=:r_{\rm hi}$; (B4) $\bar a\le\hat a/r^2$; (B5) $|\sin\beta_k(u)|\le w$ with $\cos\beta_k(u)>0$ for both members at every time; and Lemmas S.1, S.3 of the curved-window note: the closed forms of the straight rows and $|\tau-T|\le|\mathbf e|/(1-|\mathbf v|)$. The denominator bounds of Proposition S.5 give $\tau ETE^0\ge r^4(1-w)S_w/(1+w)^3$. The transverse speed of the axis satisfies $|\dot\vartheta|=|d|/r\le2w/r$.

## 1. An exact identity for the strength error

**Lemma Y.8 (derived; kinematic).** For any twice continuously differentiable transmitter path and receiver position at which the partner root exists with $|\mathbf v|<1$, and with $m(u)=2(u-s)-\tau$, the numerator identity

$$
TE^0-\tau E=\boldsymbol\rho\cdot\int_s^tm(u)\,\ddot{\mathbf x}_j(u)\,du+\tau\,\mathbf e\cdot\mathbf v+\tau^2\,\mathbf v\cdot\boldsymbol\sigma-|\mathbf e|^2-\tau\,\mathbf e\cdot\boldsymbol\sigma-(\tau-T)\,\boldsymbol\rho\cdot\mathbf v,
$$

holds. If moreover the transmitter factor at the emission root is positive, $D>0$ (which holds whenever $|\mathbf v_j(s)|<1$, and so on every history in $\mathcal C_w$, where $D\ge1-w$), the canonical strength is $a_i=1/(\tau E)$ and $a_i-a_i^0=(TE^0-\tau E)/(\tau ETE^0)$. Without $D>0$ the canonical strength $1/(\tau^2|D|)$ differs from $1/(\tau E)$, and only the numerator identity is claimed.

*Proof.* Put $h(y)=(1-|\mathbf v|^2)y^2-(\boldsymbol\rho\cdot\mathbf v)\,y$. Since $E^0=T(1-|\mathbf v|^2)-\boldsymbol\rho\cdot\mathbf v$, $TE^0=h(T)$. Since $E=\tau-\mathbf R\cdot(\mathbf v+\boldsymbol\sigma)$ and $\mathbf R\cdot\mathbf v=\boldsymbol\rho\cdot\mathbf v+\tau|\mathbf v|^2-\mathbf e\cdot\mathbf v$, $\tau E=h(\tau)+\tau\,\mathbf e\cdot\mathbf v-\tau\,\mathbf R\cdot\boldsymbol\sigma$. Next put $q(y)=(1-|\mathbf v|^2)y^2-2(\boldsymbol\rho\cdot\mathbf v)y-r^2$, so $q(T)=0$, and squaring $\tau=|\boldsymbol\rho+\tau\mathbf v-\mathbf e|$ gives $q(\tau)=N:=-2\mathbf e\cdot(\boldsymbol\rho+\tau\mathbf v)+|\mathbf e|^2$. Since $q(\tau)-q(T)=(\tau-T)\,D_n$ with $D_n=(1-|\mathbf v|^2)(\tau+T)-2\boldsymbol\rho\cdot\mathbf v$, $(\tau-T)D_n=N$. Also $h(\tau)-h(T)=(\tau-T)\,[D_n+\boldsymbol\rho\cdot\mathbf v]=N+(\tau-T)\,\boldsymbol\rho\cdot\mathbf v$. Therefore

$$
TE^0-\tau E=-N-(\tau-T)\,\boldsymbol\rho\cdot\mathbf v-\tau\,\mathbf e\cdot\mathbf v+\tau\,(\boldsymbol\rho+\tau\mathbf v-\mathbf e)\cdot\boldsymbol\sigma ,
$$

and with $-N=2\mathbf e\cdot\boldsymbol\rho+2\tau\,\mathbf e\cdot\mathbf v-|\mathbf e|^2$ this is $\boldsymbol\rho\cdot(2\mathbf e+\tau\boldsymbol\sigma)+\tau\,\mathbf e\cdot\mathbf v+\tau^2\mathbf v\cdot\boldsymbol\sigma-|\mathbf e|^2-\tau\,\mathbf e\cdot\boldsymbol\sigma-(\tau-T)\boldsymbol\rho\cdot\mathbf v$. Finally $2\mathbf e+\tau\boldsymbol\sigma=\int_s^t[2(u-s)-\tau]\,\ddot{\mathbf x}_j(u)\,du$ by the two integral forms above, and $1/(\tau E)-1/(TE^0)=(TE^0-\tau E)/(\tau ETE^0)$. $\blacksquare$

**Reading.** The first term is the only one that is not of first order in the speed or of order one in absolute size. Its weight $m(u)$ runs from $-\tau$ at emission to $+\tau$ at reception and has zero integral, so a transmitter acceleration that is constant over the window contributes nothing to it: the shortening of the delay ($2\mathbf e$) and the change of the transmitter factor through the emission velocity ($\tau\boldsymbol\sigma$) cancel. Only the variation of the axial acceleration over the window survives. The accepted Proposition S.5 bounded the two pieces separately, which is why its constant does not vanish with the speed bound. For a transmitter at rest now with constant acceleration $g$ toward the receiver, the identity gives $TE^0-\tau E=\tfrac14g^2\tau^4$ exactly, the value behind the curved-window note's Sharpness example.

## 2. A sharper strength allowance

**Lemma Y.9 (derived).** On every history in $\mathcal C_w$, at every instant and for both members,

$$
|a_i-a_i^0|\le\frac{\kappa_1(w)}{r^3}+\frac{\kappa_2(w)}{r^4},\qquad
\kappa_1=\frac{\hat\tau^2\hat\Omega/4+2w\hat\tau^3\hat a}{\mathcal D},\qquad
\kappa_2=\frac{\tfrac34\hat\tau^4\hat a^2}{\mathcal D},\qquad
\mathcal D=\frac{(1-w)S_w}{(1+w)^3},
$$

where, with $\bar\psi=w/S_w+2w/(1-3w)$, $\gamma=1-\bar\psi^2/2$, $A_{\rm hi}=c_1(1-w)^2/(1-3w)^2$ and $A_{\rm lo}=\alpha(1-w)^2/(1+w)^2$,

$$
\hat\Omega=A_{\rm hi}-A_{\rm lo}\,\gamma\quad(\gamma\ge0),\qquad\hat\Omega=A_{\rm hi}(1-\gamma)\quad(\gamma<0).
$$

*Proof.* Bound the six terms of Lemma Y.8.

*First term.* Put $f(u)=\hat{\boldsymbol\rho}\cdot\ddot{\mathbf x}_j(u)$ for $u$ in the window. Since $\int_s^tm\,du=0$, for any constant $\bar f$, $\boldsymbol\rho\cdot\int m\,\ddot{\mathbf x}_j=r\int m\,(f-\bar f)\,du$, and with $\bar f$ the midpoint of the range of $f$ and $\int_s^t|m|\,du=\tau^2/2$, the term is at most $r\tau^2\operatorname{osc}(f)/4$. On a solution $\ddot{\mathbf x}_j(u)=-a_j(u)\mathbf n_j(u)$. For $j=2$, $\hat{\boldsymbol\rho}=\hat{\mathbf r}(t)$ and $-\mathbf n_2(u)$ makes the angle $\beta_2(u)$ with $\hat{\mathbf r}(u)$; for $j=1$, $\hat{\boldsymbol\rho}=-\hat{\mathbf r}(t)$ and $\mathbf n_1(u)$ makes the angle $\beta_1(u)$ with $\hat{\mathbf r}(u)$. In both cases $f(u)=a_j(u)\cos\phi(u)$, where $\phi(u)$ is the angle between that row direction and $\hat{\mathbf r}(t)$, and $|\phi(u)|\le|\beta_j(u)|+|\vartheta(t)-\vartheta(u)|$. By (B5) and $\arcsin w\le w/S_w$, $|\beta_j(u)|\le w/S_w$; by $|\dot\vartheta|\le2w/r(u')$ and (B3), $|\vartheta(t)-\vartheta(u)|\le2w\tau/r_{\rm lo}\le2w/(1-3w)$. So $|\phi(u)|\le\bar\psi$ and $\cos\phi(u)\ge\gamma$, using $\cos x\ge1-x^2/2$. By (B2) and (B3), $a_j(u)\in[A_{\rm lo},A_{\rm hi}]/r^2$. Hence $\sup f\le A_{\rm hi}/r^2$, $\inf f\ge A_{\rm lo}\gamma/r^2$ when $\gamma\ge0$ and $\inf f\ge A_{\rm hi}\gamma/r^2$ when $\gamma<0$, so $\operatorname{osc}(f)\le\hat\Omega/r^2$. With $\tau\le\hat\tau r$ the first term is at most $\hat\tau^2\hat\Omega\,r/4$.

*Terms of first order in the speed.* $|\mathbf e|\le\tfrac12\tau^2\bar a$, $|\boldsymbol\sigma|\le\tau\bar a$ and $|\mathbf v|\le w$ give $\tau|\mathbf e\cdot\mathbf v|+\tau^2|\mathbf v\cdot\boldsymbol\sigma|\le\tfrac32w\tau^3\bar a$. Lemma S.3 gives $|\tau-T|\,|\boldsymbol\rho\cdot\mathbf v|\le\frac{|\mathbf e|}{1-w}\,rw\le\frac{w\,r\,\tau^2\bar a}{2(1-w)}$. With (B1) and (B4) these total at most $2w\hat\tau^3\hat a\,r$.

*Terms of order one.* $|\mathbf e|^2+\tau|\mathbf e|\,|\boldsymbol\sigma|\le\tfrac14\tau^4\bar a^2+\tfrac12\tau^4\bar a^2\le\tfrac34\hat\tau^4\hat a^2$.

*Denominator.* $\tau ETE^0\ge\mathcal Dr^4$. Dividing gives the lemma. $\blacksquare$

The formal endpoint values at $w=0$ are $\kappa_1=0$ and $\kappa_2=3/4$, so the leading coefficient of the order-one allowance is $3/4$. For the Sharpness example the exact numerator is $\tfrac14g^2\tau^4$ and the exact strength error also carries the denominator $\tau ETE^0$; with $g=1/r^2$ its leading large-$r$ value is $1/(4r^4)$. The allowance's leading coefficient is therefore three times the example's. The coefficient $\kappa_1$ is of first order in $w$: $\hat\Omega$ comes from the spread of row strengths $c_1-\alpha=O(w)$, the variation of the separation over the window, of relative size $O(w)$, and the angle $\bar\psi=O(w)$.

## 3. A sharper aberration allowance

**Lemma Y.10 (derived).** On every history in $\mathcal C_w$, at every instant,

$$
|\sin\beta_1+b_2|\le\frac{\hat\epsilon_{\rm new}}r,\qquad|\sin\beta_2-b_1|\le\frac{\hat\epsilon_{\rm new}}r,\qquad
\hat\epsilon_{\rm new}=w\,\hat a\,\hat\tau\Bigl[\frac12+\frac1{3(1-3w)}\Bigr].
$$

*Proof.* Take the second inequality; the first is the same with the members exchanged. As in the proof of Lemma 3 of the non-mirror note, $\tau_2\sin\beta_2=\hat{\boldsymbol\theta}(t)\cdot\boldsymbol\Delta_1$ with $\boldsymbol\Delta_1=\mathbf x_1(t)-\mathbf x_1(s_2)=\tau_2\mathbf v_1(t)-\int_{s_2}^t(u-s_2)\ddot{\mathbf x}_1(u)\,du$, so $\sin\beta_2-b_1=-\tau_2^{-1}\int_{s_2}^t(u-s_2)\,\hat{\boldsymbol\theta}(t)\cdot\ddot{\mathbf x}_1(u)\,du$. On a solution $\ddot{\mathbf x}_1(u)=-a_1(u)\mathbf n_1(u)$, and $\mathbf n_1(u)$ makes the angle $\beta_1(u)$ with $\hat{\mathbf r}(u)$, which makes the angle $\vartheta(u)-\vartheta(t)$ with $\hat{\mathbf r}(t)$. Since $|\sin(x+y)|\le|\sin x|+|y|$, $|\hat{\boldsymbol\theta}(t)\cdot\mathbf n_1(u)|\le w+|\vartheta(t)-\vartheta(u)|\le w+2w(t-u)/r_{\rm lo}$. With $x=u-s_2$ and $|\ddot{\mathbf x}_1(u)|\le\bar a$,

$$
|\sin\beta_2-b_1|\le\frac{\bar a}{\tau_2}\int_0^{\tau_2}x\Bigl[w+\frac{2w(\tau_2-x)}{r_{\rm lo}}\Bigr]dx=\bar a\,w\,\tau_2\Bigl[\frac12+\frac{\tau_2}{3r_{\rm lo}}\Bigr].
$$

With (B1), (B4) and $\tau_2/r_{\rm lo}\le1/(1-3w)$ this is at most $\hat\epsilon_{\rm new}/r$. $\blacksquare$

The accepted allowance $\epsilon_i\le\hat\epsilon/r$ with $\hat\epsilon=(1+w)^2/(2(1-3w)^2)$ bounds the transverse displacement of the window by the full acceleration. The sharper allowance uses that the acceleration points within the small angle $\beta_1(u)$ of the axis at time $u$, and that the axis turns by at most $O(w)$ over the window, so only an $O(w)$ fraction of the acceleration lies across the present axis.

## 4. The extended certificate

**Lemma Y.11 (derived).** On every history in $\mathcal C_w$ whose separation satisfies $r\ge\rho_w=c_-/(4w^2)$ at the instant considered, the conclusion of the companion's Lemma Y.3 holds with $C_A$ and $e$ replaced by

$$
C_A^{\rm new}=c_{\rm new}+\frac{2(1+w)\,w\,\hat\epsilon_{\rm new}}{S_w},\qquad e^{\rm new}=2c_1\hat\epsilon_{\rm new}+w\,c_{\rm new},\qquad c_{\rm new}=2\kappa_1+\frac{2\kappa_2}{\rho_w}.
$$

This holds at every instant of every relative-periodic history in $\mathcal C_w$ (by the floor of the low-angular-momentum theorem's Lemma 0) and of every complete history in $\mathcal C_w$ (by the separation companion's Lemma Y.5).

*Proof.* The proof of Lemma Y.3 uses the curved-window input only through $|a_i-a_i^0|\le c/(2r^3)$ and the aberration input only through $\epsilon_i\le\hat\epsilon/r$ and $r^3(a_1\epsilon_2+a_2\epsilon_1)\le c_3$. By Lemma Y.9 and $r\ge\rho_w$, $|a_i-a_i^0|\le c_{\rm new}/(2r^3)$. By Lemma Y.10 the two aberration differences are at most $\hat\epsilon_{\rm new}/r$, and with $a_i\le c_1/r^2$ the transverse allowance $a_1|\sin\beta_1+b_2|+a_2|\sin\beta_2-b_1|$ is at most $2c_1\hat\epsilon_{\rm new}/r^3$. The radial part of Lemma Y.3's proof then gives $|\Delta A_r|\le C_A^{\rm new}/r^3$ and its transverse part $|\Delta q_1|+|\Delta q_2|\le e^{\rm new}/r^3$; the rest of the proof is unchanged. $\blacksquare$

**Theorem Y.12 (derived).** Define

$$
\Gamma_{\rm new}(w)=2S_w-2\hat t^{\,2}(1+w)-2w\sqrt{(C_A^{\rm new})^2+2(e^{\rm new})^2}-\frac{4w^2(C_A^{\rm new}+\hat t\,e^{\rm new})}{c_-}.
$$

If $\Gamma_{\rm new}(w)>0$, then no history in $\mathcal C_w$ is relative-periodic, and every complete history in $\mathcal C_w$ satisfies $\int_{-\infty}^\infty r^{-3}dt<\infty$ and $r(t)\to\infty$ as $t\to\pm\infty$. Exact rational evaluation gives $\Gamma_{\rm new}(59/500)>0$, so both conclusions hold for every speed bound at or below $59/500$.

*Proof.* The companion's Theorem Y and the separation companion's Theorem Y.6 and Corollary Y.7 use Lemma Y.3 only through its displayed inequality and use, besides it, only the floor, $|\dot r|\le2w$, $|d|\le2w$, $|b_i|\le w$ and $A_r>0$. By Lemma Y.11 that inequality holds with $(C_A^{\rm new},e^{\rm new})$ on both kinds of history considered. Repeating those proofs with the new constants replaces $\Gamma$ by $\Gamma_{\rm new}$ (and, in Theorem Y.6, $B_w$ by its value with the new constants). Class nesting covers every smaller speed bound. $\blacksquare$

The exact evaluation gives the following conservative values; lower bounds are rounded down and upper bounds up from the exact rational enclosures.

| speed bound $w$ | $c_{\rm new}<$ (accepted $c\le$) | $\hat\epsilon_{\rm new}<$ (accepted $\hat\epsilon$) | $C_A^{\rm new}<$ | $e^{\rm new}<$ | $\Gamma_{\rm new}>$ |
| --- | --- | --- | --- | --- | --- |
| $1/100$ | $0.12153$ ($4.447$) | $0.0091466$ ($0.54210$) | $0.12172$ | $0.020065$ | $1.9971$ |
| $1/20$ | $0.95107$ ($6.922$) | $0.068070$ ($0.7630$) | $0.95822$ | $0.20555$ | $1.8864$ |
| $1/10$ | $3.8913$ ($12.725$) | $0.24106$ ($1.2347$) | $3.9446$ | $1.0374$ | $1.0155$ |
| $59/500$ | | | | | positive (exact sign) |

The accepted values in parentheses are the accepted table's $c(w)$ and $\hat\epsilon=(1+w)^2/(2(1-3w)^2)$, the latter rounded up here. The lower enclosure of $\Gamma_{\rm new}$ is about $-0.52$ at $w=1/8$, and the upward grid scan in steps of $1/1000$ first fails at $119/1000$. Every piece of $\Gamma_{\rm new}$ is monotone in $w$ in the direction that makes $\Gamma_{\rm new}$ strictly decreasing ($\hat\Omega$, $\hat\tau$, $\hat a$, $\hat\epsilon_{\rm new}$, $1/\mathcal D$ and $1/\rho_w$ increase), so $\Gamma_{\rm new}$ is positive on all of $(0,59/500]$. The instrument computes only lower enclosures, and a non-positive lower enclosure does not by itself prove that $\Gamma_{\rm new}$ is negative; the chunk-3 round-1 review's two-sided enclosure gives $-0.01354<\Gamma_{\rm new}(119/1000)<-0.01353$, so with continuity and strict decrease the end of the positive range lies between $59/500$ and $119/1000$. A non-positive certificate says only that this proof gives nothing there.

**Worked reading at speed bound one tenth.** Over each period of a hypothetical repeating history whose speeds never exceed $0.1$, the accumulated change of $\mathcal L$ is at least $1.0155\oint r^{-3}dt$, while its change over any number of periods is at most $2(1-\sqrt{0.99})/r(0)<0.01003/r(0)$. So no such history exists, whatever its separation, eccentricity or common velocity. The accepted October 20 notes needed, at the same speed bound, a positive excess of transverse speed on the outward legs; that requirement now concerns an empty class. At $w=1/8$ the curvature term $2w\sqrt{(C_A^{\rm new})^2+2(e^{\rm new})^2}$ already exceeds the straight gain $2S_w-2\hat t^{\,2}(1+w)$ (about $2.10$ against $1.95$ in the instrument's output), with $C_A^{\rm new}$, essentially $c_{\rm new}$, the larger of its two constants.

## Relation to the open questions

The question set for this round asked for an upper bound on the relative-orbit correlation $\tfrac12\oint\dot r\,d^2\,dt$ below the inverse-weight note's requirement, or another estimate excluding strongly eccentric repeating histories. Neither the correlation nor the in-and-out asymmetry is bounded here. For speed bounds at or below $59/500$ the question is answered by a different balance: no relative-periodic history exists there at all, eccentric or not, and complete histories cannot stay bound. For speed bounds between the end of the positive range of $\Gamma_{\rm new}$ and $1/3$ the periodicity question remains open; sharper window estimates, for example of the order-one term $\tfrac34\hat\tau^4\hat a^2$ or of the axial variation $\hat\Omega$, would move the threshold, and the inverse-weight note's Theorem R with its asymmetry requirement still applies there above its own certified closest-approach thresholds.

## Limits

The class is that of the companion notes. Lemmas Y.9 and Y.10 need a solution with the speed bound over the whole past, because they identify the transmitter's acceleration over its window with the rows it receives (inputs B2, B4, B5). Lemma Y.11 additionally needs $r\ge\rho_w$, which holds on the two kinds of history to which Theorem Y.12 is applied. The constants are not claimed optimal; at the formal endpoint $w=0$ the leading coefficient $3/4$ of the order-one allowance is three times the leading large-$r$ coefficient of the Sharpness example's strength error, and the oscillation bound uses only the extreme values of the row strength over the window. No history was integrated, no prescribed path was used as a solution, and no repeating or bound solution is shown to exist; the classes considered may be empty. Mirror symmetry, constant common velocity, any conserved quantity and observer-level physics are not assumed. Nothing here changes BP-001, production gates or canonical scores.

## Instrument

The constants, the certificate and the identity check come from [`balance_function_sharpened.py`](../evidence/saturday-binary-inout-asymmetry-2026-10-21/balance_function_sharpened.py), a separate file from the frozen first instrument, described in the [evidence README](../evidence/saturday-binary-inout-asymmetry-2026-10-21/README.md). Part A, in floating point, first reproduces the exact value $\tfrac14g^2\tau^4$ for a transmitter at rest now with constant acceleration toward the receiver (three cases) and the value zero for straight transmitter paths, with delays found by its own bisection root solver; it then compares the two sides of Lemma Y.8 on 500 prescribed curved paths (largest scaled difference $2.0\times10^{-11}$) and the integral form of $2\mathbf e+\tau\boldsymbol\sigma$ by Simpson quadrature (largest scaled difference $4.2\times10^{-11}$). Prescribed paths do not obey the equation; these are algebra checks. Part B, in exact rational arithmetic with integer-square-root brackets, first reproduces the zero-speed values $\kappa_1=0$, $\kappa_2=3/4$, $\Gamma_{\rm new}=2$, four hand values at $w=1/10$, the first instrument's value of $\Gamma(1/10)$ as a regression, and the square-root controls, and then evaluates the targets. This is the author's arithmetic verification, not independent evidence.

## Falsifiers

- Two $C^2$ paths at which the two sides of Lemma Y.8 differ refute it; prescribed paths suffice.
- A solution in $\mathcal C_w$ at which $|a_i-a_i^0|$ exceeds the bound of Lemma Y.9, or an aberration difference exceeds $\hat\epsilon_{\rm new}/r$, refutes that lemma or an accepted input it uses.
- A complete relative-periodic history in $\mathcal C_w$ with $w\le59/500$, or a complete history there whose separation stays bounded on a half-line, refutes Theorem Y.12.
- A valid solution violating an accepted input invalidates it and withdraws the proof support of every statement using it; it refutes such a statement only if it also violates that statement's conclusion.
- An exact evaluation with $\Gamma_{\rm new}(59/500)\le0$ withdraws the threshold, and one showing a tabulated decimal non-conservative withdraws that entry.

## Reading record (operational)

The reading recorded in the balance-function note covers this note; the curved-window note's Lemmas S.2–S.4, Proposition S.5 and Sharpness section, used here, were part of its full reading at 02:36Z on 2026-10-21 by the clock. The sharpened route was first recorded in the working log at 02:56:18Z, the instrument ran at 03:01:27Z, and this note was written between 03:02Z and 03:06Z. This record is development provenance and not part of the academic treatment.
