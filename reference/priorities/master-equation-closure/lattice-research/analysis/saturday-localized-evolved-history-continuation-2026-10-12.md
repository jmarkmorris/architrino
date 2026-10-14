# The localized lattice family followed along its own evolved history: a continuation beyond $T_B$ without a fixed-point ball (2026-10-12)

## Result

**In words.** The [extension note](saturday-localized-forward-extension-2026-10-12.md) followed the localized disturbance of the alternating lattice up to a time $T_B(\varepsilon)$, and stopped there because its method builds the solution by a contraction, which needs the seed's size below about $5.4\times10^{-3}$ of a lattice spacing. Beyond $T_B$ the solution still exists, by the step-by-step continuation of the forward note, but nothing was known about its size. This note controls it there by a different kind of argument. It does not construct anything: it takes the solution that already exists, measures how far it is from the linear seed, and shows that this distance cannot cross an explicit barrier. The estimate uses the evolved history itself. In particular it uses the fact that the nonlinear correction dies away into the past twice as fast as the seed, so that distant members, which are seen as they were long ago, feel the correction far less than the earlier bound allowed.

1. **A bound for the remainder that separates seed and correction (derived).** If, on the whole past of some instant, the seed is at most $d\,e^{aT}$ and the correction at most $y\,e^{2aT}$ (with their derivatives), the nonlinear remainder is at most an explicit polynomial $F(d,y)$ (Lemma E.2). For $y=0$ it is the accepted product bound. Its terms in $y$ are much smaller than those of the accepted bound $C_N(d+4y)^2$: the correction acting as a source enters through lattice sums at rate $2a$, which are about seventeen times smaller than those at rate $a$.
2. **The same solution continues to seed size $0.018$ (derived; numbers by exact arithmetic on declared values).** For every amplitude $0<\varepsilon\le6.46\times10^{-3}$ the continued history exists at least to
   $$
   T_E(\varepsilon)=\frac1{2.8953}\ln\frac{0.018}{0.1144\,\varepsilon}\ \ge\ T_B(\varepsilon)+0.428 ,
   $$
   and for $T_B\le T\le T_E$ it differs from the linear seed by less than $28\,\Delta(T)^2$, where $\Delta(T)=0.1144\,\varepsilon\,e^{2.8953T}\le0.018$ bounds the seed. Over the whole of $(-\infty,T_E]$ every displacement is below $0.02708$ of a spacing, every speed below $0.0975$, every separation above $0.9458$, each ordered pair of members has exactly one causal root and no member has one on its own path (Theorem E.3). For $\varepsilon=10^{-4}$: $T_E\ge2.542$, against $T_B\le2.114$.
3. **Sharper correction bounds at earlier times (derived).** The same argument with smaller barriers gives $\lvert u-\varepsilon\phi\rvert<K\,\Delta^2$ with $K=18.5$ while $\Delta\le0.0052$ (the extension note had $31.9$), $20$ while $\Delta\le0.008$, $22.5$ while $\Delta\le0.012$, $24.5$ while $\Delta\le0.015$ (Corollary E.4). For $\varepsilon=10^{-4}$ the central member's displacement is thereby at least $1.77\times10^{-3}$ at $T_B$ (previously $1.40\times10^{-3}$) and at least $2.11\times10^{-3}$ at the time when $\Delta=0.008$.
4. **What is not obtained.** At $T_E$ the correction allowance, $28\times0.018=0.504$ of the seed bound, exceeds the fraction of the seed bound that the central member is guaranteed to carry, so the lower bound on growth is empty at the end of the interval: the solution is shown to exist and to stay small there, not to keep growing. The declared pair meets the barrier condition with a margin under half a percent, and no pair with a larger seed size is proved here; an exploratory float search over five chart radii found none above about $0.019$, which is a record of that search and not a ceiling of the method (Section 5). Where the proof stops is the reach of one sufficient estimate as carried out, not an event in the solution. Displacements of order one, the manner in which regular evolution ends, arrival at wake speed and its rate remain open, as does growth uniform in $\varepsilon$.

**Claim grade.** Items 1 to 3 are hand derivations of one session. The [Codex review](saturday-localized-evolved-history-continuation-codex-review-2026-10-12.md) reconstructs Lemmas E.1 and E.2 and the start, scaling and first-crossing argument of Theorem E.3 separately, checks the five barrier pairs with its own exact-fraction reference, and supports them at derived grade conditional on the accepted declared lattice, contour and seed bounds; it requested the four corrections EHR1 to EHR4 incorporated here. The numbers were checked by a session instrument that passed known cases first; it evaluates $F$ in exact rational arithmetic from the declared constants of the accepted extension note. No lattice sum was recomputed, and nothing is measured on solutions: no history, correction or evolution is computed.

Everything is for the unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, the full alternating population with every member dynamical, every causal root retained, the original eight-source block summation, the contour of radius $1/10$, the accepted seed class, and the complete-past family $u^\varepsilon=\varepsilon\phi+v^\varepsilon$. A run started at a finite time from the linear seed, a fixed exterior, a finite population or a copied coherent trajectory is a different preparation.

## 1. Setting, sources and reading

This is the lattice task of the [evolved-history round](../../../../op/agent-chats/2026-10-12-saturday-evolved-history-and-geometry/chat.md).

**Reading, with times (2026-10-12).** Before any derivation or run in this round, from 21:19Z to 21:21Z: the round's header and release in full; the digests of AGENTS.md, the router, the protocol and the collaboration skill, all equal to those of their full readings earlier the same day; the digests of the eight accepted files. Six of them, the [preparation](saturday-localized-nonlinear-preparation-2026-10-10.md), [forward-evolution](saturday-localized-forward-evolution-2026-10-11.md) and [quantification](saturday-localized-forward-quantification-2026-10-11.md) notes and their three reviews, are unchanged since they were read in full between 18:03Z and 18:33Z the same day; they were not reread in this round. The extension note (`826aac13…d593`) was not reread from the file in this round; its final bytes were written by this author between 18:14Z and 18:34Z the same day. Of its [review](saturday-localized-forward-extension-codex-review-2026-10-12.md), the sections before the final disposition were read in full at 18:31Z and the final disposition at 21:20Z. Read in full at 21:20Z to 21:21Z, in their current, newly integrated form: the lattice manuscript's Section 1.30; the queue entries "Continue the localized family with evolved-history bounds" and "Continue the localized nonlinear family beyond its guaranteed interval"; the README's paragraph on this family. Of the priorities, the two paragraphs on this family were read, the longer one to 1,600 characters. The Master Equation source is unchanged since the readings of the same day; the row and the two resting-lattice cancellations are used as stated in the accepted notes. This coverage is partial where it says so.

**Additional reading after the review (2026-10-12, 21:36Z to 21:39Z; finding EHR1).** The paragraph above records the coverage when the note was first returned, at 21:29Z, and is left as it was. The release asked for the eight accepted files, the current owners and the actual equation, summation and history passages to be read before deriving. That was not done in full then. It was completed afterwards, and therefore *after* the derivation, the instrument run of 21:25Z and the first return; none of the following preceded them. Read in full from the file: the extension note (`826aac13…d593`, 43,299 bytes, 243 lines, none longer than 3,200 characters), begun at 21:36Z and finished at 21:39Z; its review (`fd8c26ec…`), at 21:36Z, including the sections read at 18:31Z and the disposition read at 21:20Z; the Codex review of the present note, at 21:36Z. Read without truncation at 21:36Z: the priorities' paragraph on this family, which had been seen only to 1,600 characters. Read at 21:36Z from the canonical sources and not from the notes' summaries: of the Master Equation source (`a3fa7047…`, unchanged), the transmitter-side factor, the weight, the per-hit acceleration, the boxed total equation with its sum over every causal emission of every source, and the Heaviside convention that excludes the emission at zero delay; of the lattice manuscript, Section 1.1 in full, with the eight-site block prescription and the resting cancellation. The other six accepted files were *not* reread: their SHA-256 digests at 21:36:37Z equal those of the bytes read in full between 18:03Z and 18:33Z, which shows that what was read then is what stands now and is not a second reading. *Consequence:* none found for the mathematics. The row bound used in Lemma E.2 is the nine-product bound as the extension note's Lemma X3 states it for a general chart radius at most $1/16$; the receiver bound is its cubic form $4Z_5\lvert\alpha\rvert^3/(1-\rho)^5$; $F(d,0)$ is its $C_{\rm src}$; the start of the barrier uses the history-norm bound $\lVert\tilde v^t\rVert_{2a}\le K_1\Delta(t)^2$ that the proof of its Theorem X5 establishes, which is stronger in form than that theorem's pointwise item 2; and the row, the block prescription and the exclusion of the zero-delay emission are those of the canonical sources.

**Notation** is that of the accepted notes. $a\in(2.6952,2.6953)$ is the contour's left edge and $\bar a=2.6953$; $\lambda_+<2.8953$; $\lVert\cdot\rVert_\nu$ is the history norm on $T\le0$ at rate $\nu$ without spatial weight, $\lVert f\rVert_\nu=\sup_{T\le0,j}e^{-\nu T}\max\{\lvert f_j\rvert,\lvert f_j'\rvert/\nu,\lvert f_j''\rvert/\nu^2\}$; $\mathcal N$, $\mathcal K$, $\mathcal J$, $\Psi$, $E$, $S_p(x)$ as defined there. Declared values taken from the extension note: $C_L\le0.03927$ (linear inverse at rate $2a$, no weight); $S_2,S_3,S_4(a)\le0.5897,\ 0.52522,\ 0.4851$ and $S_2,S_3,S_4(2a)\le0.030598,\ 0.029603,\ 0.028921$; $Z_5\le10.3824$; $\delta_1=0.0052$, $\varrho_1=0.00086$, $K_1=31.9$; $\bar\Lambda_0=0.1144$, $p_0=0.0763$, $\theta=0.9308$. $T_B(\varepsilon)=\ln(\delta_1/(\bar\Lambda_0\varepsilon))/2.8953$ and $\Delta(T)=\bar\Lambda_0\,\varepsilon\,e^{2.8953T}$, so that $\Delta(T_B)=\delta_1$ exactly and the translated seed satisfies $\lVert\varepsilon\phi^t\rVert_a\le\Delta(t)$ for $t\ge0$ (quantification note, Proposition Q6).

Throughout, $u$ denotes the unique charted continuation of $u^\varepsilon$ (forward note, Theorem 1), defined on $(-\infty,T_{\max})$. For $t<T_{\max}$ put

$$
c=u-\varepsilon\phi,\qquad\tilde u^t(T)=u(T+t),\quad\tilde v^t(T)=c(T+t)\quad(T\le0),\qquad y(t)=\lVert\tilde v^t\rVert_{2a}.
$$

Here $c$ is defined as a difference, on the solution that exists; it is not constructed.

## 2. The correction of the continued solution

**Lemma E.1 (derived).** Let $0\le t<T_{\max}$, and suppose that on $(-\infty,t]$ the solution has displacements at most $1/16$ and speeds at most $3/16$. Then: (i) $y(t)$ is finite; (ii) $y$ is continuous on the interval where this holds; (iii) $\tilde v^t=(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\,\mathcal N[\tilde u^t]$, and therefore $y(t)\le C_L\,\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}$.

*Proof.* (i) For $T\le-t$, $\tilde v^t(T)=v^\varepsilon(T+t)$, the accepted correction, and $e^{-2aT}\lvert v^\varepsilon(T+t)\rvert\le e^{2at}\lVert v^\varepsilon\rVert_{2a}$, likewise for two derivatives. For $-t\le T\le0$ the functions $u$, $\phi$ and their first two derivatives are bounded uniformly in the member on the compact time interval $[0,t]$: the solution is in a chart there, with accelerations bounded by the forward note's Lemma 1, and the seed by its contour formula. (ii) With $m(s)=\sup_j\max\{\lvert c_j(s)\rvert,\lvert c_j'(s)\rvert/(2a),\lvert c_j''(s)\rvert/(2a)^2\}$, $y(t)=e^{2at}\sup_{s\le t}e^{-2as}m(s)$. The supremum over $s\le t$ is nondecreasing in $t$, and it is continuous because $m$ is: $c_j''=u_j''-\varepsilon\phi_j''$ is Lipschitz in time uniformly in $j$ on bounded intervals, since $u_j''=\mathcal G_j(T,u_j(T))$ with $\mathcal G_j$ jointly Lipschitz uniformly in $j$ (forward note, Lemma 1) and $\phi_j'''$ is bounded by the contour formula. (iii) Under the stated pointwise chart every row is regular and the equation is exactly $\tilde u^{t\prime\prime}=g\mathcal K\tilde u^t+\mathcal N[\tilde u^t]$ on $T\le0$ (preparation note; the sums converge absolutely because $\tilde u^t=\varepsilon\phi^t+\tilde v^t$ decays into the past at least like $e^{aT}$). Subtract $\varepsilon\phi^{t\prime\prime}=g\mathcal K\varepsilon\phi^t$: $\tilde v^{t\prime\prime}=g\mathcal K\tilde v^t+\mathcal N[\tilde u^t]$ with $\tilde v^t$ of finite norm at rate $2a$. By the preparation note's Lemma 1 at $\nu=2a$ with the trivial weight, the only solution of that linear equation in the space at rate $2a$ is the series inverse applied to $\mathcal J\mathcal N[\tilde u^t]$, and its norm is at most $C_L$ times $\lVert\mathcal N[\tilde u^t]\rVert_{0,2a}$. $\qquad\blacksquare$

No fixed point is sought and no contraction is used. The identity (iii) is a property of the solution; the Lipschitz constant $C_N'$ of the remainder does not appear anywhere in this note.

## 3. The remainder with seed and correction kept apart

**Lemma E.2 (refined product bound; derived).** Let $0<\rho\le1/16$, and let $\psi$, $v$ be histories on $T\le0$ with, for $n=0,1,2$ and all members,

$$
\lvert\psi_j^{(n)}(T)\rvert\le a^n\,d\,e^{aT},\qquad\lvert v_j^{(n)}(T)\rvert\le(2a)^n\,y\,e^{2aT},\qquad d+2y\le\rho .
$$

Put $\varpi=\bar a\rho$, $\kappa=1-2\rho$, $\eta=e^{2\bar a\rho}$, $\mathsf s_1=\eta e^{-a}$, $c_{20},c_{11},c_{02}$ the row constants of Lemma Q1 for speeds at most $\varpi$, and $c_{E3}=4Z_5/(1-\rho)^5$. Then $\lVert\mathcal N[\psi+v]\rVert_{0,2a}\le F(d,y)$ with

$$
\begin{aligned}
\frac{F(d,y)}{g}={}&c_{E3}A^3
+\frac{c_{20}}{\kappa^4}\Bigl[A\bigl(d\,\eta S_4(a)+y\,\eta^2S_4(2a)\bigr)+\tfrac12\bar p^{\,2}\eta^2S_4(2a)\Bigr]\\
&+\Bigl(\frac{\bar a\,c_{11}}{\kappa^3}+2\bar a\Bigr)\Bigl[A\bigl(d\,\eta S_3(a)+2y\,\eta^2S_3(2a)\bigr)+\bar p\,\bar v\,\eta^2S_3(2a)\Bigr]\\
&+\frac{\bar a^2c_{02}}{2\kappa^2}\,\bar v^{\,2}\eta^2S_2(2a)
+\bar a^2\Bigl[A\bigl(d\,\eta S_2(a)+4y\,\eta^2S_2(2a)\bigr)+\bar p\,\bar w\,\eta^2S_2(2a)\Bigr],
\end{aligned}
$$

$$
A=d+y,\qquad\bar p=d+y\,\mathsf s_1,\qquad\bar v=d+2y\,\mathsf s_1,\qquad\bar w=d+4y\,\mathsf s_1 .
$$

$F$ is a polynomial in $(d,y)$ with nonnegative coefficients and no term of degree below two; $F(d,0)=g\,(c_{E3}d^3+C_{\rm src}d^2)$ with $C_{\rm src}$ the expression of the extension note's Lemma X3.

*Proof.* Write $u=\psi+v$, fix a receiver $i$, a reception time $T\le0$ and a source at lattice offset $\ell\ne0$ with $r=\lvert\ell\rvert$, and let $X=e^{aT}\le1$ and $\mathsf s=\eta e^{-ar}\le\mathsf s_1$. *Chart.* $\lvert u_j\rvert\le dX+yX^2\le d+y\le\rho$ and $\lvert u_j'\rvert\le a(d+2y)\le\varpi$ at all times, so the chart facts of the forward note hold with radius $\rho$: one root, range at least $\kappa r$, delay within $2\rho$ of $r$. *Receiver.* $\lvert\alpha\rvert=\lvert u_i(T)\rvert\le X\,(d+yX)\le XA$. *Source.* At every time $s'$ within $2\rho$ of $T-r$, $e^{as'}\le X\mathsf s$ and $e^{2as'}\le X^2\mathsf s^2$, so the source's displacement, velocity and acceleration are at most

$$
\mathfrak p=X\,(d\,\mathsf s+y\,X\mathsf s^2),\qquad\mathfrak v=aX\,(d\,\mathsf s+2y\,X\mathsf s^2),\qquad\mathfrak w=a^2X\,(d\,\mathsf s+4y\,X\mathsf s^2).
$$

*One row.* The quantification note's Proposition Q3 bounds the row remainder, for any history in the chart, by

$$
\lvert\mathcal R_\ell\rvert\le\frac{c_{20}}{(\kappa r)^4}\bigl(\lvert\alpha\rvert+\tfrac12\lvert p\rvert\bigr)\lvert p\rvert+\frac{c_{11}}{(\kappa r)^3}\bigl(\lvert\alpha\rvert+\lvert p\rvert\bigr)\lvert v\rvert+\frac{c_{02}}{2(\kappa r)^2}\lvert v\rvert^2+\frac2{r^3}\sup\lvert y'\rvert\,(\lvert\alpha\rvert+\lvert p\rvert)+\frac1{r^2}\sup\lvert y''\rvert\,(\lvert\alpha\rvert+\lvert p\rvert),
$$

with the chart substitutions of the extension note's Lemma X3; the right side is increasing in each of the five quantities, so $\mathfrak p$, $\mathfrak v$, $\mathfrak w$ and $XA$ may be inserted. Divide by $X^2$ and use $X\le1$: the receiver factor becomes $A$, and the source factors $d\,\mathsf s+y\,\mathsf s^2$, $a(d\,\mathsf s+2y\,\mathsf s^2)$, $a^2(d\,\mathsf s+4y\,\mathsf s^2)$. *Sum over sources.* In the products of the receiver factor with one source factor keep both powers of $\mathsf s$: $\sum_{\ell\ne0}\mathsf s/r^p=\eta S_p(a)$ and $\sum_{\ell\ne0}\mathsf s^2/r^p=\eta^2S_p(2a)$. In the products of two source factors use $\mathsf s\le\mathsf s_1$ in one power: $d\,\mathsf s+ky\,\mathsf s^2\le\mathsf s\,(d+ky\,\mathsf s_1)$ for $k=1,2,4$, so each such product is at most $\mathsf s^2$ times $\bar p^{\,2}$, $\bar p\,\bar v$, $\bar v^{\,2}$ or $\bar p\,\bar w$, and sums to $\eta^2S_p(2a)$ times it. The two terms with $1/r^3$ combine with coefficient $\bar a\,c_{11}/\kappa^3+2\bar a$. *Receiver term.* By Lemma Q2 with the chart radius $\rho$, $\lvert E(\alpha)\rvert\le4Z_5\lvert\alpha\rvert^3/(1-\rho)^5\le c_{E3}X^3A^3$, and $X^3\le X^2$. Multiply by $g$. The rate $a$ is replaced by $\bar a$ where it multiplies and by its lower bound in the sums' arguments. $\qquad\blacksquare$

*What changed against the accepted bound.* The accepted estimate treated the correction as one more history at rate $a$, of norm at most $4y$: the factor $4$ pays for its second derivative, and its decay at rate $2a$ was not used. Here the correction as a receiver counts as $y$, and as a source it enters only through the sums at $2a$, with $S_p(2a)/S_p(a)$ about $0.052$ to $0.060$. The bound still sums absolute values over all sources.

## 4. The barrier

**Theorem E.3 (derived, relying on the accepted notes).** Let $\rho_c=1/25$, $\delta_2=0.018$, $K_2=28$ and $y_2=K_2\delta_2^2=0.009072$, and let $F$ be the function of Lemma E.2 for the chart $\rho_c$, with $\varpi=0.107812$, $\kappa=0.92$, $\eta\le1.24064$, $\mathsf s_1\le0.08378$, $c_{20}\le8.0209$, $c_{11}\le3.7836$, $c_{02}\le2.8162$, $c_{E3}\le50.934$. Then, in exact arithmetic on these declared values,

$$
\text{(a)}\ \ \delta_2+2y_2=0.036144\le\rho_c,\qquad
\text{(b)}\ \ C_LF(\delta_2,y_2)\le0.0090318<y_2,\qquad
\text{(c)}\ \ C_LF(\delta_1,Y)<Y\ \text{ for }Y=K_2\delta_1^2\text{ and }Y=K_1\delta_1^2 .
$$

Consequently, for every $0<\varepsilon\le6.46\times10^{-3}$, with $T_E(\varepsilon)=\ln(\delta_2/(\bar\Lambda_0\varepsilon))/2.8953\ge T_B(\varepsilon)+0.428$:

1. $T_{\max}>T_E(\varepsilon)$: the unique charted continuation of $u^\varepsilon$ exists on $(-\infty,T_E]$. It is the same solution as in the accepted notes, with the same past; every emission it receives, old or generated after time zero, lies on it.
2. For $T_B\le T\le T_E$ and every member, $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert<28\,\Delta(T)^2$, and the first two derivatives of the difference are below $2a$ and $(2a)^2$ times that.
3. On the whole of $(-\infty,T_E]$: displacements are at most $0.027072$, speeds at most $0.09742$, accelerations at most $0.39439$, transmitter factors at least $0.90258$, separations at least $0.945856$, and each delay is within $0.0542$ of the anchor distance. Each ordered pair of distinct members has exactly one causal root at every reception time, and no member has a root on its own path.
4. The disturbance has finite spatially weighted size, for every weight exponent, at each time up to $T_E$: it still decays in space faster than any power (forward note, Proposition 4; no constant is evaluated).

*Proof.* (a), (b) and (c) are exact evaluations, recorded in the evidence. *Scaling.* For fixed $K$, $F(d,Kd^2)/d^2$ is nondecreasing in $d$: each monomial $d^iy^j$ of $F$ has $i+j\ge2$ and becomes $K^jd^{\,i+2j-2}$ with a nonnegative exponent. So (b) gives $C_LF(d,K_2d^2)<K_2d^2$ for every $0<d\le\delta_2$. Also $F$ is nondecreasing in $d$ and $y$.

*The inequality along the solution.* Let $t\ge0$ be a time up to which the solution exists with $\Delta(t)+2y(t)\le\rho_c$. Then $\psi=\varepsilon\phi^t$ and $v=\tilde v^t$ satisfy the hypotheses of Lemma E.2 with $d=\Delta(t)$ and $y=y(t)$: the seed bound is Proposition Q6, and the correction bound is the definition of $y(t)$. The pointwise chart of Lemma E.1 holds, since $\rho_c\le1/16$ and $\bar a\rho_c\le3/16$. So

$$
y(t)\le C_L\,F(\Delta(t),y(t)).\tag{$*$}
$$

*Start.* At $t=T_B$, $\Delta=\delta_1$ and $y(T_B)\le K_1\delta_1^2$ by the extension note's Theorem X5, so $\Delta+2y\le\rho_c$ and $(*)$ holds. The function $Y\mapsto Y-C_LF(\delta_1,Y)$ is concave, because $F$ is a polynomial in $Y$ with nonnegative coefficients, and by (c) it is positive at both ends of $[K_2\delta_1^2,K_1\delta_1^2]$, hence on the whole interval. Since it is not positive at $Y=y(T_B)\le K_1\delta_1^2$, $y(T_B)<K_2\delta_1^2$.

*Barrier.* Let $\mathcal T$ be the set of $t\in[T_B,T_E]$ with $t<T_{\max}$ and $y(s)<K_2\Delta(s)^2$ for all $s\in[T_B,t]$. It contains $T_B$. On $\mathcal T$ the solution lies in the chart of radius $\delta_2+y_2$ with speeds at most $\bar a(\delta_2+2y_2)$ and bounded accelerations, uniformly; so by the forward note's remark on maximal continuation, $T_{\max}$ is not the supremum of $\mathcal T$ unless that supremum is $T_E$ with $T_{\max}>T_E$. Let $t_0=\sup\mathcal T$; the solution exists at $t_0$ and, by continuity (Lemma E.1), $y(t_0)\le K_2\Delta(t_0)^2$, so $\Delta(t_0)+2y(t_0)\le\delta_2+2y_2\le\rho_c$ and $(*)$ holds at $t_0$. If $y(t_0)=K_2\Delta(t_0)^2$, then $(*)$ and the scaling give $K_2\Delta^2\le C_LF(\Delta,K_2\Delta^2)<K_2\Delta^2$, which is impossible. So $y(t_0)<K_2\Delta(t_0)^2$, and by continuity the strict inequality persists beyond $t_0$ unless $t_0=T_E$. Hence $\mathcal T=[T_B,T_E]$ and $T_{\max}>T_E$.

*Items.* Item 2: $\lvert c_j(T)\rvert=\lvert\tilde v^T_j(0)\rvert\le y(T)$, and likewise for the derivatives with their normalizations. Item 3 for times in $[T_B,T_E]$: displacement at most $\Delta+y\le\delta_2+y_2$, speed at most $\bar a(\Delta+2y)$, acceleration at most $\bar a^2(\Delta+4y)$, and the chart facts with radius $\delta_2+y_2$; for earlier times the extension note's smaller bounds hold. Item 1's identification is the forward note's Theorem 1: there is one charted continuation, so no matching is needed beyond the one already proved. Item 4 is the forward note's Proposition 4 in the chart just established, applied to the solution, whose weighted norms on $T\le0$ are finite by the accepted notes. The gain is $\ln(\delta_2/\delta_1)/2.8953=\ln(3.4615\ldots)/2.8953\ge0.428$. $\qquad\blacksquare$

**What kind of result this is.** It is a continuation of the same solution using its evolved history: the quantity bounded, $y(t)$, is a norm of the actual correction over the actual past up to $t$, including what the solution generated after time zero. It is not a constant-only refinement of the fixed-point theorem, for two reasons. No contraction is needed, so the Lipschitz constant is absent and the solution is not rebuilt. And the estimate that replaces the product bound is a different one, in which the seed and the correction keep their own rates of decay. $T_E$ is again a guaranteed time, not a survival time.

**Corollary E.4 (smaller barriers at smaller seed size; derived).** The proof of Theorem E.3 uses $(\delta_2,K_2)$ only through (a), (b), (c). The following pairs $(\delta,K)$ satisfy the same three conditions on the same chart, so $\lvert u_j(T)-\varepsilon\phi_j(T)\rvert<K\Delta(T)^2$ whenever $0\le T$ and $\Delta(T)\le\delta$:

| $\delta$ | $0.0052$ | $0.008$ | $0.012$ | $0.015$ | $0.018$ |
| --- | --- | --- | --- | --- | --- |
| $K$ | $18.5$ | $20$ | $22.5$ | $24.5$ | $28$ |
| correction at $\Delta=\delta$, at most | $5.01\times10^{-4}$ | $1.28\times10^{-3}$ | $3.24\times10^{-3}$ | $5.52\times10^{-3}$ | $9.08\times10^{-3}$ |
| as a fraction of $\delta$ | $0.0962$ | $0.16$ | $0.27$ | $0.368$ | $0.504$ |

For times before $T_B$ the start of the argument is replaced by the accepted bound $y(t)\le K_1\Delta(t)^2$ at each such time, with the same concavity step; the scaling of $F$ carries condition (c) from $\delta_1$ to every smaller seed size. Each $K$ is the smallest multiple of $\tfrac12$ for which the instrument's exact check passed; none is claimed to be the smallest possible.

**Growth (derived).** For $0\le T\le T_E$ with $\Delta(T)\le\delta$, the central member satisfies $\lvert u_0(T)\rvert\ge\varepsilon\,p_0\,e^{aT}-K\,\Delta(T)^2$ (Proposition Q8(3) and Corollary E.4). Evaluated at the times at which $\Delta$ equals the tabulated values, with $aT\ge\theta\ln(\Delta/(\varepsilon\bar\Lambda_0))$:

| $\varepsilon$ | $T_B$ in | $T_E\ge$ | $\Delta=0.0052$ | $\Delta=0.008$ | $\Delta=0.012$ | $\Delta=0.015$ | $\Delta=0.018$ |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $10^{-3}$ | $[1.318,1.319]$ | $1.747$ | $2.16\times10^{-3}$ | $2.69\times10^{-3}$ | $2.56\times10^{-3}$ | $1.62\times10^{-3}$ | not positive |
| $10^{-4}$ | $[2.113,2.114]$ | $2.542$ | $1.77\times10^{-3}$ | $2.11\times10^{-3}$ | $1.70\times10^{-3}$ | $5.75\times10^{-4}$ | not positive |
| $10^{-5}$ | $[2.908,2.909]$ | $3.337$ | $1.43\times10^{-3}$ | $1.61\times10^{-3}$ | $9.77\times10^{-4}$ | not positive | not positive |
| $10^{-6}$ | $[3.704,3.705]$ | $4.132$ | $1.15\times10^{-3}$ | $1.18\times10^{-3}$ | $3.56\times10^{-4}$ | not positive | not positive |

The entries are lower bounds for the central displacement. The lower bound first rises and then falls, and is empty at $T_E$: there the allowance $K_2\delta_2^2$ exceeds the guaranteed linear contribution. This says that the *bound* stops certifying growth; it says nothing about whether the solution keeps growing. The upper bounds of Theorem E.3 hold throughout.

## 5. Where this argument stops

On the chart $\rho_c=1/25$ condition (b) holds at $\delta_2=0.018$ with $C_LF(\delta_2,y_2)/y_2\le0.9956$, a margin of less than half a percent. That margin is the only exact statement made here about how much further the declared chart and pair could be pushed.

*An exploratory search, with its scope.* Before the instrument was written, a scratch float script, which is not an instrument output and is not evidence, tried five chart radii, $0.02$, $0.03$, $0.04$, $0.05$ and $0.0625$. On each it raised $\delta$ from $0.0052$ by factors of $1.02$ and, for each $\delta$, looked for a $K$ on the grid of one half from $5$ to $199.5$ with $\delta+2K\delta^2\le\rho$ and $C_LF(\delta,K\delta^2)<K\delta^2$ in floating point, stopping at the first $\delta$ for which it found none. The last passing values were about $0.0137$, $0.0171$, $0.0188$, $0.0192$ and $0.0185$. These are what that search found on those five charts. They establish no ceiling for the estimate, on these charts or on others: no chart between or beyond the five was examined, the grids are coarse, the arithmetic is floating point, the search stops at the first failure, and nothing was proved about how the constants vary with the chart radius. The earlier wording of this section, that the conditions can be met "no further with larger charts", claimed more than the search supports and is withdrawn.

*The term that limits the barrier, and its parts.* Collecting the polynomial of Lemma E.2 by degree, $F=A_2d^2+B_2\,dy+C_2y^2+D_3(d+y)^3$ with $D_3=g\,c_{E3}$ and

$$
\begin{aligned}
\frac{B_2}{g}={}&\eta\Bigl[\frac{c_{20}}{\kappa^4}S_4(a)+\Bigl(\frac{\bar a\,c_{11}}{\kappa^3}+2\bar a\Bigr)S_3(a)+\bar a^2S_2(a)\Bigr]\\
&+\eta^2\Bigl[\frac{c_{20}}{\kappa^4}(1+\mathsf s_1)S_4(2a)+\Bigl(\frac{\bar a\,c_{11}}{\kappa^3}+2\bar a\Bigr)(2+3\mathsf s_1)S_3(2a)+\frac{2\bar a^2c_{02}}{\kappa^2}\,\mathsf s_1S_2(2a)+\bar a^2(4+5\mathsf s_1)S_2(2a)\Bigr].
\end{aligned}
$$

So the part of $C_LF$ that is linear in $y$ is $C_L\,[B_2\,d+3D_3\,d^2]\,y$. The first line of $B_2$ is the correction at the *receiver* multiplied by the seed at the *sources*; the second line is the correction at the *sources*, through the sums at rate $2a$, multiplied by the seed at the receiver or at the sources; and $3D_3d^2$ comes from the receiver's cubic term. On the chart $1/25$ the Codex review's exact expansion gives $C_LB_2\,d=17.7428\ldots d$ for the whole leading coefficient, of which the first line is $15.1421\ldots d$ (a hand float evaluation made for this correction agrees with both to four figures; these decimals are orientation, not declared bounds), and $3C_LD_3\approx96$. At $d=0.018$ the three contributions to the coefficient of $y$ are about $0.273$, $0.047$ and $0.031$, in total about $0.35$. The first returned version of this section quoted the first line alone, as "about $15\,d$", and called it the linearization of the remainder about the seed; it is the largest part of that linearization as bounded here, not the whole. The bound takes every part in absolute value, source by source. None of this changes a barrier calculation: the conditions of Theorem E.3 were evaluated with the complete $F$.

*A candidate next estimate (inferred; not shown to suffice).* The coefficient of $y$ above is a bound for the whole seed-dependent linear part of the remainder acting on the correction: all three contributions, together with the linear delayed operator already inverted in $C_L$. A bound for that whole operator which keeps its signs, for instance a spectral or resolvent bound in the norm at rate $2a$ for the delayed linear operator with the seed-dependent, and therefore time-dependent, coefficient included, is a candidate route to a larger barrier. I have not derived one, and I have not proved that any stated improvement of the constant would give a barrier at a declared larger seed size; so this is a direction, not a smallest sufficient estimate.

*What the stop does not mean.* Beyond $T_E$ the forward note's step continuation and its continuation alternative still apply. Nothing proved here limits the solution at $T_E$. That this note proves no barrier above $\delta_2=0.018$ is a statement about what was carried out with this sufficient estimate, and says nothing about the solution's fate.

## 6. Instrument, evidence and the reference boundary

[`evolved_history_bootstrap.py`](../evidence/saturday-evolved-history-continuation-2026-10-12/evolved_history_bootstrap.py), described in the [evidence README](../evidence/saturday-evolved-history-continuation-2026-10-12/README.md), evaluates $F$ in exact rational arithmetic. It imports the frozen instrument of the extension note, unchanged, for its rounding helpers, its row-constant routine and its interval exponential and logarithm (`mpmath.iv`, 50 digits), and takes the six lattice-sum bounds, $C_L$, $Z_5$ and the rate interval as declared decimals from the extension note; it encloses no lattice sum itself. It ran once, through the owned-compute supervisor, in $0.123$ seconds with exit code $0$; every known case passed at the first attempt.

**Known cases, run first; a failure stops the run.** The polynomial with unit constants at $d=y=1$, worked by hand: $\tfrac{41}8+27+2+\tfrac{29}2=\tfrac{389}8$, and the receiver term adding $c_{E3}A^3=16$ for $c_{E3}=2$. With $y=0$ on the accepted chart $1/100$: $F(\rho,0)/\rho^2$ rounds up to the accepted $C_N\le289.9$, and the chart parameters equal the accepted declared ones. The refined $F$ does not exceed the accepted $289.9\,(d+4y)^2$ at four points of that chart. The accepted invariance value $11.39\times(0.00864)^2=8.50258944\times10^{-4}$. Rounding helpers. Monotone scaling of $F(d,28d^2)/d^2$ on five points.

**Targets.** Conditions (a), (b), (c) for $(\delta_2,K_2)$; for each $\delta$ of Corollary E.4 a search upward in steps of $\tfrac12$ for the first $K$ passing (a), (b), (c), each check exact; and the tables, with interval logarithm and exponential and outward rounding.

**What this can and cannot establish.** It establishes that the displayed inequalities hold exactly for the declared constants. It does not establish Lemma E.2, which is a hand derivation, nor the declared lattice sums, which rest on the extension note's interval enclosures and on the interval library's outward rounding, assumed there and here. Its comparison values are of three kinds: a hand-worked polynomial value and exact arithmetic, which are independent of earlier work; accepted regression values from the extension note, by the same author, which check the code at the accepted parameters and are not independent references; and none that tests the solution. Nothing is computed on a history.

## 7. Limits

The unchanged Master Equation at $g=16$, unit spacing, $c_f=1$, all members dynamical, the eight-source block prescription, the contour of radius $1/10$ and the accepted seed class, for $0<\varepsilon\le6.46\times10^{-3}$. The statements are for the complete-past solution $u^\varepsilon$ and its unique charted continuation; they say nothing about a finite-onset run. Theorem E.3 gives upper bounds and existence up to $T_E$; it gives no lower bound on growth at $T_E$. The weighted (spatial-decay) statement is qualitative. The lattice-sum bounds are conditional on the interval library. The constants are not shown to be the best possible, and no largest seed size reachable by this estimate is established: the float search of Section 5 is exploratory, covers five chart radii on coarse grids, and supports no ceiling and no statement about other charts. The signed bound named in Section 5 is an inferred candidate, not shown to suffice for any declared larger barrier. No solution was integrated, no accepted file was changed, and nothing here concerns order-one displacement, the ending of regular evolution, or arrival at wake speed.

## 8. Falsifiers

- Lemma E.1: a charted continued solution of the family for which $y$ is infinite or discontinuous, or for which $\tilde v^t\ne(I-\mathcal Jg\mathcal K)^{-1}\mathcal J\mathcal N[\tilde u^t]$.
- Lemma E.2: histories $\psi$, $v$ with the stated bounds and $d+2y\le\rho$ for which $\lVert\mathcal N[\psi+v]\rVert_{0,2a}>F(d,y)$; a step of Proposition Q3's row bound that does not survive the substitution; an arithmetic error in the assembly of $F$.
- Theorem E.3: an exact evaluation in which (a), (b) or (c) fails with the declared constants; a seed of the class and an $\varepsilon\le6.46\times10^{-3}$ whose constructed history, with its complete past and unique charted continuation, ceases to exist before $T_E(\varepsilon)$, violates a bound of items 2 or 3, or has two roots for one ordered pair or a root on a member's own path, at some $T\le T_E$. A run started at a finite time from the seed alone does not test this.
- Corollary E.4 and the growth table: an exact evaluation contradicting a tabulated entry with the declared constants.
- A correct enclosure showing one of the six declared lattice sums, or $C_L$, above its declared value withdraws the numbers without affecting the lemmas.

## 9. Proposed propagation (not applied)

No shared tracker, manuscript or queue was edited. Suggested text for the coordinator, for the queue entry "Continue the localized family with evolved-history bounds": "Evolved-history continuation (Saturday round, 2026-10-12, derived): the continued solution's correction satisfies $y\le C_LF(\Delta,y)$ with a refined product bound in which the correction, decaying at rate $2a$, enters as a source only through lattice sums at $2a$; a barrier argument without contraction gives existence to $T_E=\ln(0.018/(0.1144\varepsilon))/2.8953\ge T_B+0.428$ with $\lvert u-\varepsilon\phi\rvert<28\Delta^2$, displacements below $0.02708$, speeds below $0.0975$, separations above $0.9458$, one root per ordered pair and spatial decay retained qualitatively; for $\varepsilon=10^{-4}$, $T_E\ge2.542$. Correction coefficient $18.5$ up to $T_B$. The growth lower bound is empty at $T_E$. No barrier is proved above seed size $0.018$, where the declared pair has a margin under half a percent; no ceiling of the estimate is established (an exploratory float search over five chart radii found no passing pair above about $0.019$, which is not a bound). The limiting quantity is the whole seed-dependent linear part of the remainder acting on the correction, bounded in absolute value: its coefficient is about $17.7$ times the seed size at leading order, of which about $15.1$ is the correction at the receiver times the seed at the sources, plus a cubic receiver part. Open: a signed bound for that whole operator, as an inferred candidate route not shown to suffice; order-one evolution, endings, arrival."
