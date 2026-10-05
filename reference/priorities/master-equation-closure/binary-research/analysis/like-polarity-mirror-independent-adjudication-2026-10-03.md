# Independent adjudication of the like-polarity mirror global continuation theorem

**Verdict: accept with corrections.** The theorem of the [subject](like-polarity-mirror-global-continuation.md), sections 2 to 4, is correct as stated: all seven items, every lemma, every numbered step and every numerical constant were rechecked and hold. Proposition H of section 5 is correct as stated, including the leading coefficient $\tfrac43$, the bounds $\lvert\theta\rvert\le3.1\beta$ and $\lvert R\rvert\le8.3E_0^{2}+17.5\beta\sqrt{E_0}\,u_0$, and the final inequality. No correction touches a theorem statement or a proposition statement. The corrections are six, all outside those statements: two intermediate constants in the proof of Proposition H are rounded the wrong way (harmless); section 6 labels its $v=0.01$ rows as inside the hypothesis range when they are outside it; one known-case check omits its start distance; the instrument description omits two step-size features of the appendix integrator; section 7 item 2 understates what the subject's own Lemma 5 gives, because preservation of the mirror symmetry by the two-body law is derivable; and the constant $35.5$ can be lowered to $28.5$ by a one-line sharpening. Scope of the acceptance: a mirror pair of like polarity ($\sigma=+1$) whose supplied past is itself mirror symmetric and satisfies hypothesis P, with $\beta=\max\{v_p,2\sqrt{E_0}\}\le1/100$, under the unchanged delayed acceleration law with $c_f=1$, one partner root and no added rule.

**Claim grade.** Derived, for the theorem and for Proposition H: each inequality was verified against a reference derivation written before the subject's proofs were read, and each constant was recomputed. Derived here and not yet reviewed by anyone else, for the two-body symmetry corollary and the sharpened constants below. Measured, for the numerical checks, with the instrument and its reach named in the last section. The subject's off-axis formulas and second-order head-on coefficient are graded inferred by the subject and were not adjudicated beyond one measured consistency remark.

## Pre-target reference

This section was written before sections 3 to 5 of the subject were read. At the time of writing I had read only the subject's opening section and its sections 1 and 2, that is the law, hypothesis P, the definitions of $C_1$, $\kappa$, $C_2$ and the theorem statement, with no proof. The working record is `.local-data/master-equation-closure/geometry-session-20261003/adjudication-like-polarity/pre-target-reference.txt`, saved 2026-10-03 17:01 EDT, before the first read of the proofs. Because the constant formulas were visible in section 1, agreement of my constants with the subject's is a check that those formulas follow from the law, not a blind rediscovery of them; where my first route gave a different constant I say so.

**Notation.** The receiver is at $X(T)$ with velocity $V=X'$, the partner at $-X(s)$ with velocity $-V(s)$, $r=\lvert X(T)\rvert$, $e=X(T)/r$. A partner root is $s\le T$ with $\tau:=T-s=\lvert X(T)+X(s)\rvert$, $n:=(X(T)+X(s))/\tau$, and the law is $X''(T)=a=K\,n/(\tau^{2}\lvert1+n\cdot V(s)\rvert)$. The comparison acceleration is $a_0=K e/(4r^{2})$ and the comparison quantity is $E=\tfrac12\lvert V\rvert^{2}+K/(4r)$. "Speed at most $\beta$" means $\lvert X(t)-X(t')\rvert\le\beta\lvert t-t'\rvert$.

**(a) The delayed root.** Let the path have speed at most $\beta<1$ on $(-\infty,T]$ and $r>0$. Put $g(s)=(T-s)-\lvert X(T)+X(s)\rvert$. Then $g(T)=-2r<0$. For $s_1<s_2\le T$ the reverse triangle inequality gives $g(s_1)-g(s_2)\ge(1-\beta)(s_2-s_1)>0$, so $g$ is strictly decreasing, and $g(s)\ge(1-\beta)(T-s)-2r\to+\infty$ as $s\to-\infty$. So there is exactly one root, and it is earlier than $T$. With $\delta:=X(T)-X(s)$, $\lvert\delta\rvert\le\beta\tau$ and $\tau n=2X(T)-\delta$, hence $\lvert\tau-2r\rvert\le\beta\tau$ and

$$
\frac{2r}{1+\beta}\le\tau\le\frac{2r}{1-\beta}.
$$

There is no own root, because $\lvert X(T)-X(s)\rvert<T-s$ for $s<T$. Differentiating the root condition gives $ds/dT=(1-n\cdot V(T))/(1+n\cdot V(s))\in[\tfrac{1-\beta}{1+\beta},\tfrac{1+\beta}{1-\beta}]$, so the root time increases. Two remarks recorded at this stage: uniqueness of the root needs only speed below $1$, while its size needs the bound $\beta$ only on the window $[s,T]$; and a past that is anywhere at or above speed $1$ can produce further roots, so a speed bound below $1$ on the whole past is load-bearing for the root census.

**(b) Closeness of $a$ to $a_0$ and the radial component.** From $\tau(n-e)=(2r-\tau)e-\delta$, $\lvert n-e\rvert\le2\beta$. With $D:=1+n\cdot V(s)\in[1-\beta,1+\beta]$ the absolute value is $D$, and $\lambda:=4r^{2}/(\tau^{2}D)\in[\tfrac{(1-\beta)^{2}}{1+\beta},\tfrac{(1+\beta)^{2}}{1-\beta}]$, so $\lvert\lambda-1\rvert\le\beta(3+\beta)/(1-\beta)$. Writing $a-a_0=\tfrac{K}{4r^{2}}\bigl[(\lambda-1)n+(n-e)\bigr]$,

$$
\lvert a-a_0\rvert\le\Bigl(\frac{3+\beta}{1-\beta}+2\Bigr)\beta\,\frac{K}{4r^{2}} ,
\qquad
e\cdot a=\frac{K}{4r^{2}}\,\lambda\,(e\cdot n)\ge\frac{(1-\beta)^{2}(1-2\beta^{2})}{1+\beta}\,\frac{K}{4r^{2}},
$$

using $e\cdot n=1-\tfrac12\lvert n-e\rvert^{2}\ge1-2\beta^{2}$. These are the subject's $C_1(\beta)$ and $\kappa(\beta)$. My first split, $(n-e)/(\tau^{2}D)+e\,(1/(\tau^{2}D)-1/(4r^{2}))$, gave the slightly larger constant $\tfrac{3+\beta}{1-\beta}+\tfrac{2(1+\beta)^{2}}{1-\beta}$ ($5.101$ at $\beta=0.01$); the split above is the better one. I also noted that the angle $\vartheta$ between $n$ and $e$ obeys $\sin\vartheta\le\beta$, which sharpens $\lvert n-e\rvert\le2\beta$ to about $\beta$; this is used in correction 6.

**(c) The time integral of $K/(4r^{2})$.** With $r'=e\cdot V$, $r''=e\cdot a+(\lvert V\rvert^{2}-(e\cdot V)^{2})/r\ge e\cdot a\ge\kappa K/(4r^{2})$. Integrating,

$$
\int_0^{T}\frac{K}{4r^{2}}\,dT'\le\frac{r'(T)-r'(0)}{\kappa}\le\frac{\lvert V(T)\rvert+\lvert V(0)\rvert}{\kappa}.
$$

Since $E'=V\cdot(a-a_0)$, $\lvert E(T)-E_0\rvert\le\sup\lvert V\rvert\cdot C_1\beta\cdot(\lvert V(T)\rvert+\lvert V(0)\rvert)/\kappa$. Under the bootstrap assumption $E\le2E_0$ one has $\lvert V\rvert\le2\sqrt{E_0}\le\beta$, and $\lvert V(0)\rvert\le\sqrt{2E_0}$ always, so $\lvert E-E_0\rvert\le2(2+\sqrt2)C_1\beta E_0/\kappa=C_2(\beta)\beta E_0$, which closes when $C_2\beta<1$. At $\beta=0.01$: $C_1=5.040404$, $\kappa=0.970202$, $C_2=35.47512$. Consequences computed at this stage: $\lvert V\rvert\le\sqrt{2\cdot1.355E_0}=1.6462\sqrt{E_0}$; $r\ge K/(5.42E_0)$; $(r^{2})''=2\lvert V\rvert^{2}+2X\cdot a\ge2\kappa E\ge1.2516E_0$, so the escape coefficient is $0.6258\ge\tfrac58$ with a margin of $0.13\%$; $\int\lvert a\rvert<\infty$, so $V$ converges and $\lvert V_\infty\rvert^{2}=2E_\infty\ge1.29E_0$.

**Local theory.** Because $\tau\ge2r/(1+\beta)>0$, on a short enough step every root lies in the already known history and the law is an ordinary differential equation $X''=F(T,X(T))$. $F$ depends on $X(T)$ through the root time and through $V$ at the root, so $F$ is Lipschitz in $X$ exactly when the history velocity is Lipschitz in time; a merely continuous history velocity gives existence only. The acceleration is continuous on $[0,T_1)$; relative to the supplied past it jumps at $T=0$, and its derivative jumps when the root time passes through $0$.

**Head-on coefficient, formal.** On a line $n=e=1$. To first order $\tau\approx2r/(1+V)$ and $V(s)\approx V$, so $a\approx K(1+V)/(4r^{2})$ and $E'\approx V^{2}K/(4r^{2})$. Along the comparison motion from and to infinite separation with $v=\sqrt{2E_0}$, substituting $u=K/(4r)$, $\Delta E=2\int_0^{v^{2}/2}\sqrt{v^{2}-2u}\,du=\tfrac23v^{3}$, so $\Delta E/E_0=\tfrac43v$.

## Itemised checks of the theorem

**Consistency of the law with the Master Equation (measured, by reading lines 61 to 146 of the [Master Equation chapter](../../../../../content/markdown/aaa/dynamics/master-equation.md)).** The per-hit acceleration there is $\kappa\sigma_{tr}\lvert q_tq_r\rvert\,\hat r_t/r_t^{2}$ weighted by $c_f/\lvert D_t\rvert$ with $D_t=c_f-\hat r_t\cdot V_t$. For the emitter at $-X(s)$ with velocity $-V(s)$ this is the subject's law with $K=\kappa\lvert q_tq_r\rvert$ and $D_t=1+n\cdot V(s)$. The self-hit term is absent because there is no own root.

1. **Lemma 1.** Correct, and identical in substance to reference (a). The explicit evaluation $g(T-2r/(1-\beta))\ge0$ and the monotonicity argument for two reception times were checked line by line.
2. **Lemma 2.** Correct.
3. **Lemma 3.** Correct. The direction estimate $\lvert n-e\rvert\le2\lvert\delta\rvert/\tau$, the range of $\lambda$, the maximum $\lvert\lambda-1\rvert=(3\beta+\beta^{2})/(1-\beta)$, $C_1\le6$ for $\beta\le1/5$ and the monotonicity claims for $C_1$, $\kappa$, $C_2$ all hold. The sharpness note's values $\kappa(0.1)=0.722$, $\kappa(0.2)=0.491$, $C_1(0.1)=5.44$ are right.
4. **Lemma 4.** Correct; the cross term in $r''$ is nonnegative in every dimension, including $d=1$ where it vanishes.
5. **Lemma 5.** Correct. On $\Omega$, $\lvert x+X(T_0)\rvert\in[\tfrac74r_0,\tfrac94r_0]$, so $G(T_0)\le\tfrac18r_0-\tfrac74r_0<0$, $\tau\in[\tfrac{7r_0}{4(1+\beta_0)},\tfrac{9r_0}{4(1-\beta_0)}]$, and $\lvert F\rvert\le K/(\tau^{2}(1-\beta_0))\le M$ with the stated $M=16K(1+\beta_0)^{2}/(49r_0^{2}(1-\beta_0))$. The three entries of $h$ do what is claimed: $h\le r_0/8$ gives $G(T_0)<0$ and $\beta_0h\le r_0/8$; $h\le\sqrt{r_0/(4M)}$ gives $\tfrac12Mh^{2}\le r_0/8$, so the trajectory stays in $\Omega$; $h\le(1-\beta_0)/(2M)$ gives speed at most $(1+\beta_0)/2$. $h$ is nondecreasing in $r_0$ and nonincreasing in $\beta_0$. The Lipschitz estimate for the root time, the identification of the ordinary solution with a solution of the delayed law, and uniqueness in the class are sound.
6. **Step 0.** Correct. At the supremum of agreement both solutions have a common speed bound below $1$ on $(-\infty,T']$ (the past by P, the compact interval $[0,T']$ by continuity) and a velocity that is Lipschitz there, so Lemma 5 applies.
7. **Steps 1 to 3 (bootstrap).** Correct. The set $\mathcal A$ contains $0$, is relatively closed by continuity of $E$, and is relatively open because $E\le(1+C_2\beta)E_0<2E_0$ on it; $[0,T_{\max})$ is connected. The use of $\lvert V(0)\rvert\le\sqrt{2E_0}$ rather than $2\sqrt{E_0}$ is what gives $2(2+\sqrt2)$ instead of $8$. $C_2(\beta)\le C_2(0.01)=35.4751\le35.48$.
8. **Step 4 (continuation).** Correct. The step $h_*$ depends only on the floor $\rho=K/(8E_0)$, on $\beta$ and on $K$, so a finite $T_{\max}$ is contradicted. The last sentence of item 1 is justified: a continuation agreeing up to $T'$ has speed at most $\beta$ and nonzero $X$ there, so it is in the solution class nearby.
9. **Items 2 to 7.** Correct, with the constants in the table below. Item 7's window $[-2\lvert X(0)\rvert/(1-v_p),0]$ is right, and the dependence claim follows from uniqueness together with monotonicity of the root time.
10. **Remark on the range of the method.** Correct: $C_2(0.0264)\cdot0.0264=0.998565$ and $C_2(0.0265)\cdot0.0265=1.00274$; the root of $C_2(\beta)\beta=1$ is $\beta=0.026434$.

| Quantity at $\beta=0.01$ | Subject | Recomputed |
| --- | --- | --- |
| $C_1$ | $5.0404$ | $5.040404$ |
| $\kappa$ | $0.970202$ | $0.970202$ |
| $C_2$ | $35.4751$ | $35.47512$ |
| $\sqrt{2(1+35.5\beta)}$ | $\le1.65$ | $1.646208$ |
| $4(1+35.5\beta)$ | $5.42$ | $5.42$ |
| $2\kappa(1-35.5\beta)$ | $\ge\tfrac54$ | $1.251561$ |
| $1.65\cdot\tfrac1{200}$ | $0.00825$ | $0.00825$ |
| $35.5\sqrt2/\tfrac43$ (section 7 item 7) | at least $37$ | $37.65$ |

**The role of the Lipschitz velocity and of the jump at $T=0$.** The subject's account is right. Uniqueness uses the Lipschitz property of $V$ on the causal window because $x\mapsto V(\sigma(T,x))$ must be Lipschitz; existence and items 2 to 6 do not. The acceleration of the supplied past is unconstrained, so $X''$ jumps at $0$; $V$ stays Lipschitz across $0$, which is all the later steps use.

## Itemised checks of Proposition H

1. **Exact identity.** $\tfrac{d}{dT}(x'^{3}/3)=x'^{2}a$ and $V_\infty>0$, $v_0\le0$ give $\int_0^\infty a\,x'^{2}\,dT=(v_{\rm out}^{3}+\lvert v_0\rvert^{3})/3$ exactly. Correct.
2. **Decomposition.** $E'=x'a_0(\Lambda-1)$ with $\Lambda=a/a_0$, and $\Lambda-1=y+\omega$, so $E_\infty-E_0=M+R$; both integrals converge absolutely. Correct. That $n=e=1$ follows from $x+x_s\ge2x(1-2\beta)/(1-\beta)>0$.
3. **Main term.** $1/\Lambda\in[\tfrac{1-\beta}{(1+\beta)^{2}},\tfrac{1+\beta}{(1-\beta)^{2}}]$ and the integrand $a\,x'^{2}$ is nonnegative, so $\lvert\theta\rvert\le(3\beta-\beta^{2})/(1-\beta)^{2}=3.0507\beta\le3.1\beta$ at $\beta=0.01$, and the expression increases with $\beta$. Correct.
4. **Exact form of $\Lambda$.** $\tau(1+y)=2x+R_1$ and $1+x_s'=1+y-R_2$ give $\Lambda=(1+y)/((1+\rho_1)^{2}(1-\rho_2))$. Correct.
5. **Late times.** Recomputed: $\lambda_{\max}=1.030404$; window floor $1-2\beta/(1-\beta)=0.979798$; exact $A$-constant $1.073333\le1.0736$; $\tau\le2.020202\,x$; $\lvert\rho_1\rvert\le1.095398\,u\le1.0954\,u$ and $\lvert\rho_2\rvert\le2.190797\,u\le2.1908\,u$ using the subject's $A=1.0736$; bracket factor $1.0001\le1.0004$; $\lvert\omega\rvert\le4.4272\,u\le4.5\,u$; $4.5\cdot1.355^{2}=8.2621\le8.3$. The use of $a_0\lvert x'\rvert\,dT=\lvert du\rvert$ on each monotone leg and $u_*=E(T_*)$ is correct. See correction 1 for two rounding slips that do not propagate.
6. **Early times.** Recomputed: $(3\beta+\beta^{2})/(1-\beta)+\beta=4.0404\beta\le4.05\beta$; $T_c\le2x(0)/(1-3\beta)=2.061856\,x(0)\le2.062\,x(0)$; floor $0.979381\ge0.979$; $1/0.979^{2}=1.043361\le1.0434$; $1.0434\cdot2\cdot2.062=4.302982\le4.31$; $4.05\cdot4.31=17.4555\le17.5$. Correct.
7. **Final inequality.** Recomputed: $\lvert R\rvert/E_0\le4.15v^{2}+12.3744\beta v\eta$; crude bound $\lvert\delta\rvert\le1.7715v+0.1533v\le2v$; $1.5\sqrt{1+2v}\cdot2\le3.0211\le3.1$; coefficients $\tfrac43\cdot3.1=4.1333\le4.14\le4.2$, $\tfrac23\cdot1.031\cdot3.1=2.1307\le2.14$, $2.14+4.15=6.29\le6.3$, $\tfrac23\cdot1.031\cdot1.5=1.031\le1.04$, $1.04+12.4\beta=1.164\le1.2$. Correct. With $\beta=\sqrt2v$ and $\eta\to0$ the remainder is at most $12.24v^{2}$, and $v_{\rm out}=v(1+\tfrac23v+O(v^{2}))$ follows.

## Corrections

1. **Proof of Proposition H, late times (cosmetic).** "$\lambda_{\max}=(1+\beta)^{2}/(1-\beta)\le1.0304$" is false at $\beta=0.01$ by $4\times10^{-6}$: the value is $1.030404$; write $\le1.0305$. "$\tau\le2.0202\,x$" is false by $2\times10^{-6}$: the value is $2.020202\,x$; write $\le2.0203\,x$. The downstream constants $A=1.0736$, $1.0954$, $2.1908$, $4.5$, $8.3$ are valid with the exact values, so nothing else changes.
2. **Section 6, head-on table.** The sentence "$v=0.02,0.04,0.08$ lie outside the theorem's hypothesis" should read "$v=0.01,0.02,0.04,0.08$". The hypothesis $\beta=\max\{v_p,2\sqrt{E_0}\}\le1/100$ with $E_0=v^{2}/2$ requires $v\le1/(100\sqrt2)=0.00707$, and at $v=0.01$, $\beta=0.01414$. That row is inside the range of the method ($\beta\le0.0264$) but outside the stated theorem. The off-axis table is at $v=0.01$ and is therefore also outside the stated hypothesis; it should say so. Falsifier 6 of the subject is unaffected.
3. **Section 6, known-case check (c).** The coefficient $1.355524$ at $v=0.02$ belongs to a start distance of $400\,K/(4E_0)$, not the $1600\,K/(4E_0)$ of the table, where the same $v$ gives $1.359373$. My instrument returns $1.3555237$ at $N=400$ and $1.3593733$ at $N=1600$. State $N=400$ in check (c).
4. **Section 6, instrument reach.** The appendix integrator takes steps $dt=(x_{\min}/v)/30$, and the delay near closest approach is about $2x_{\min}$, so $\tau/dt\approx60v$. For $v<1/60$ two things then happen that the description does not mention: stage evaluations query the history beyond the last stored node, which the code serves by extrapolating the last cubic segment; and the node evaluation interpolates the velocity in a segment whose end acceleration is still the placeholder $0.0$. Measured on an instrumented verbatim copy of the appendix code: at $v=0.005$, $1479$ of $1463750$ history queries extrapolated, by up to $0.70$ of a step, and $728$ used the placeholder; at $v=0.02$, none. The reported coefficients are nevertheless reproduced by my instrument, which has neither feature, to about $10^{-6}$ (table in the last section), so the subject's numbers stand. Add both features to the reach statement, or cap the step below the delay.
5. **Section 7 item 2 can be strengthened.** "The theorem does not show that the full two-body law preserves the mirror symmetry" is true of the theorem as written, but preservation follows from the subject's own Lemma 5 argument. See Corollary A below. The second half of item 2, stability against asymmetric perturbations of the data or the past, remains open.
6. **Optional sharpening of the constants (derived here).** The component of $\tau n=2re-\delta$ perpendicular to $e$ is $-\delta_\perp$ and its component along $e$ is positive, so the angle $\vartheta$ between $n$ and $e$ is acute with $\sin\vartheta\le\beta$. Hence $\lvert n-e\rvert=\sin\vartheta/\cos(\vartheta/2)\le\beta/\sqrt{1-\beta^{2}}$ and $e\cdot n\ge\sqrt{1-\beta^{2}}$. Lemma 3 then holds with $C_1'=\tfrac{3+\beta}{1-\beta}+\tfrac1{\sqrt{1-\beta^{2}}}$ and $\kappa'=\tfrac{(1-\beta)^{2}\sqrt{1-\beta^{2}}}{1+\beta}$; at $\beta=0.01$, $C_1'=4.040454$, $\kappa'=0.970348$, $C_2'=28.4331$, so $35.5$ may be replaced by $28.5$ throughout, with the dependent constants $1.65$, $5.42$ and $\tfrac58$ recomputed, and the method's range grows to $\beta\le0.03214$. The first term of $C_1'$ cannot be improved: $\lambda-1$ approaches $(3\beta+\beta^{2})/(1-\beta)$ with $n=e$ along paths that move outward at speed $\beta$ over the window and turn to move inward at speed $\beta$ just at the root, and sampling at $\beta=0.01$ gives $3.013$ against that limit of $3.040$. The subject's constants are valid as they stand; this is an improvement, not a repair.

## Hidden assumptions and counterexample attempts

**Corollary A: the two-body law preserves the mirror symmetry (derived here).** Consider the unreduced two-body law, in which receiver $i$ at $X_i(T)$ is accelerated by emitter $j\ne i$ through roots of $T-s=\lvert X_i(T)-X_j(s)\rvert$, with $X_i''=K\,n_{ij}/(\tau^{2}\lvert1-n_{ij}\cdot V_j(s)\rvert)$ and $n_{ij}=(X_i(T)-X_j(s))/\tau$. Take as solution class pairs that are $C^{1}$, $C^{2}$ on $[0,T_1)$, have both speeds below $1$ and $X_1\ne X_2$ on $[0,T_1)$, with past speeds at most $v_p<1$ and locally Lipschitz past velocities. First, the pair $(X,-X)$ built from the subject's solution solves this law for all $T\ge0$: for receiver $2$ at $-X(T)$ and emitter $1$ at $X(s)$ the root condition is the same, $n_{21}=-n$, the denominator is $1+n\cdot V(s)$, and the acceleration is $-a$. Second, two solutions in this class with the same past coincide. Let $T'$ be the supremum of agreement, $\rho=\lvert X_1(T')-X_2(T')\rvert>0$ and $\beta_0<1$ a common speed bound on $(-\infty,T']$. For $T\in[T',T'+h]$ with $h\le\rho/8$ and $\lvert x-X_i(T')\rvert\le\rho/4$, the function $G(s)=T-s-\lvert x-X_j(s)\rvert$ on $s\le T'$ is strictly decreasing with slope at most $-(1-\beta_0)$, tends to $+\infty$, and has $G(T')\le\rho/8-3\rho/4<0$; so its root lies in the common history, is Lipschitz in $(T,x)$, and is the unique root of either solution because the emitter's speed is below $1$ and each receiver, moving slower than $1$, stays within $h\le\rho/4$ of $X_i(T')$. On the step each receiver therefore obeys an ordinary equation $X_i''=F_i(T,X_i)$ with Lipschitz $F_i$ built from the common history alone, and the two solutions agree beyond $T'$, a contradiction. Third, a two-body continuation cannot leave the class before it departs from $(X,-X)$, because up to the supremum of agreement its speeds are at most $\beta$ and its separation is at least $K/(2.71E_0)$. Hence from a mirror-symmetric past satisfying P with $\beta\le1/100$, the mirror motion of the theorem is the only two-body continuation. This is uniqueness at exactly symmetric data; it says nothing about nearby asymmetric data.

**Past separation.** No lower bound is needed, as the subject says. The past enters only through $\lvert X(T)-X(s)\rvert\le\beta\tau$ and $\lvert V(s)\rvert\le\beta$. A past in which $X(s)=0$, so that the two architrinos coincide, is admitted by P and causes no difficulty, because $n$ is defined from $X(T)+X(s)$ at a root where $\tau>0$.

**A past faster than $\beta$ but slower than $1$ before the causal window (derived, by inspection of every use of $\beta$).** In Lemmas 1 and 3 the bound $\beta$ enters only on the window $[s(T),T]$ and at the root; existence, uniqueness and monotonicity of the root need only some uniform bound below $1$. The theorem therefore holds with $\beta:=\max\{\sup_{[s(0),0]}\lvert V\rvert,\,2\sqrt{E_0}\}\le1/100$ and an arbitrary $v_p<1$ on the rest of the past, where $s(0)\ge-2\lvert X(0)\rvert/(1-v_p)$. The subject's item 7 says as much informally; the stated theorem is the special case $v_p\le\beta$.

**A past at or above speed $1$ (counterexample to the census, outside P).** On a line take $X(s)=x_0$ for $-3x_0\le s\le0$ and $X(s)=x_0+2(-3x_0-s)$ for $s<-3x_0$, smoothed at the corner. At $T=0$, $g(s)=-s-2x_0$ on the first piece and $g(s)=s+4x_0$ on the second, so there are two partner roots, $s=-2x_0$ and $s=-4x_0$. The statement "exactly one partner root" therefore genuinely depends on the speed bound over the whole past, and with a pointwise bound $\lvert V\rvert<1$ whose supremum is $1$ a root can fail to exist. Hypothesis P excludes both.

**Dimension.** Nothing depends on $d$. In $d=1$ the configuration is a mirror; in $d\ge2$ the map $X\mapsto-X$ is a point reflection, which in the plane is a half-turn. The law is equivariant under it in every dimension.

**Search for a violating solution (measured).** None found: see the sampling and integration results below.

## What is not established

1. Stability of the mirror motion against asymmetric perturbations of the data or the past. Corollary A is uniqueness at symmetric data only.
2. Anything for $\beta>0.0264$ by the subject's constants, or $\beta>0.0321$ by the sharpened ones, and anything for opposite polarity.
3. Uniqueness when the past velocity is continuous but not Lipschitz on the causal window.
4. That any supplied past satisfying P can arise from the law.
5. The off-axis formulas and the second-order head-on coefficient. I did not adjudicate them. One measured remark: my head-on runs give $\Delta E/(E_0v)-\tfrac43-\tfrac43v+\eta=1.61v^{2},\,1.63v^{2},\,1.64v^{2}$ at $v=0.005,\,0.0025,\,0.00125$, which is consistent with the subject's inferred second-order coefficient $\tfrac43$ and indicates a third-order coefficient near $1.6$; this is a fit to three runs, not a derivation.
6. The subject's statement that this is the first motion in the record, other than rest and exact circles, proved to continue forever. I did not survey the record.
7. Corollary A and correction 6 are my own derivations and have had no second reader.

## Falsifiers

1. **Lemma 3 and its sharpening.** A path of speed at most $\beta\le1/5$ on $(-\infty,T]$ with $\lvert a-a_0\rvert>C_1'(\beta)\beta K/(4r^{2})$, or $e\cdot a<\kappa(\beta)K/(4r^{2})$, or $\tau\notin[2r/(1+\beta),2r/(1-\beta)]$. Check by an exact root solve on a polyline history; `lemma3_sampling` in the script below is one such check and can be rerun with other seeds.
2. **Theorem items 2 to 5.** A solution from data with $v_p\le1/200$, $E_0\le1/40000$ in which $E$ leaves $[0.645E_0,1.355E_0]$, $\lvert X\rvert<K/(5.42E_0)$, $\lvert V\rvert>1.65\sqrt{E_0}$, $r''<\kappa K/(4r^{2})$, $\lvert X\rvert^{2}$ falls below the quadratic of item 5, or a second partner root appears, found with an integrator that shares no code with either instrument used so far.
3. **Proposition H.** A head-on run with $\beta\le0.01$ in which $\lvert\Delta E/E_0-\tfrac43v\rvert>4.2\beta v+6.3v^{2}+1.2v\eta$, or a limit of $\Delta E/(E_0v)$ other than $\tfrac43$ as $v\to0$ and $\eta\to0$.
4. **Corollary A.** Two distinct two-body continuations, in the stated class, from one mirror-symmetric past with Lipschitz velocity.
5. **Arithmetic.** Any recomputed constant exceeding the value stated in the subject; `adjudicate_like_polarity.py constants` prints them.
6. **Correction 4.** A run of the appendix code at $v\le0.01$, $m=30$ in which no history query exceeds the last stored node.

## What was run

**Instrument (measured).** `adjudicate_like_polarity.py`, with `reproduce_table.py`, under `.local-data/master-equation-closure/geometry-session-20261003/adjudication-like-polarity/`, run with `/Users/markmorris/vibe/.venv/bin/python` (Python 3.13.2), $K=1$, $c_f=1$. It was written for this adjudication and shares no code with the subject's appendix integrator. It integrates the unreduced two-body law for both architrinos, without imposing the mirror symmetry; finds each root by the contraction iteration $s\leftarrow T-\lvert x-X_j(s)\rvert$; stores the history as quintic Hermite segments on a nonuniform grid; and advances by classical fourth-order Runge–Kutta with step $dt=c\,r$, $c\le\tfrac12$, which is shorter than the delay, so every stage root lies in stored history and the code raises an error otherwise. **Reach:** it evaluates one partner root per receiver and so cannot by itself detect a second root (a separate scan of $g$ does that at two times per planar run); from exactly symmetric data its arithmetic stays exactly symmetric, so it gives no evidence about stability of the symmetry; and it tests finitely many data.

**Known case, passed and recorded before any target run.** Uniformly moving line history, exact $a(0^{+})=K(1+v_0)/(4x_0^{2})$: relative errors $2\times10^{-16}$, $4\times10^{-16}$, $0$, $-1\times10^{-16}$ at $(x_0,v_0)=(1000,-0.3),(1000,0.2),(50,-0.01),(20000,-0.005)$. Uniformly moving planar history, against the closed-form root of $(1-\lvert V_0\rvert^{2})\tau^{2}+4X_0\cdot V_0\,\tau-4\lvert X_0\rvert^{2}=0$: relative errors $6\times10^{-16}$ and $5\times10^{-16}$ at $(X_0,V_0)=((300,40),(-0.2,0.1))$ and $((5000,-700),(0.004,0.003))$. The root tolerance was changed twice after target runs failed to converge at rounding level; the known cases were rerun and passed unchanged after each change.

**Lemma 3 sampling.** $40000$ polyline histories per $\beta$, half of them at full speed along coordinate directions, exact polyline root: no violation. $\max\lvert a-a_0\rvert/(\beta K/4r^{2})=3.013,\,3.416,\,3.933$ against $C_1=5.040,\,5.444,\,6$ at $\beta=0.01,\,0.1,\,0.2$; $\min e\cdot a/(K/4r^{2})=0.97047,\,0.7372,\,0.5334$ against $\kappa=0.97020,\,0.7216,\,0.4907$; both $\tau$ bounds attained to rounding. This agrees with the subject's unretained sampling note. Sampling can only fail to find a violation.

**Head-on, inside the hypothesis.** Uniformly incoming past, start at $10^{6}K/(4E_0)$ so $\eta=10^{-6}$, stop at $10^{8}K/(4E_0)$ with a first-order tail correction of relative size $7.5\times10^{-9}$, $c=\tfrac14$; here $\beta=\sqrt2v$.

| $v$ | $\beta$ | $(E_\infty-E_0)/(E_0v)$ | $\lvert\delta-\tfrac43v\rvert$ | Proposition H bound | measured $\theta$ | $3.1\beta$ |
| --- | --- | --- | --- | --- | --- | --- |
| 0.005 | 0.00707 | 1.34003926 | $3.353\times10^{-5}$ | $3.060\times10^{-4}$ | $-1.0\times10^{-5}$ | $2.2\times10^{-2}$ |
| 0.0025 | 0.00354 | 1.33667584 | $8.356\times10^{-6}$ | $7.650\times10^{-5}$ | $-2.5\times10^{-6}$ | $1.1\times10^{-2}$ |
| 0.00125 | 0.00177 | 1.33500156 | $2.085\times10^{-6}$ | $1.913\times10^{-5}$ | $-6.3\times10^{-7}$ | $5.5\times10^{-3}$ |

The ratio tends to $\tfrac43$; removing the term $\tfrac43v$ leaves $1.333373$, $1.333343$, $1.333335$. Step refinement at $v=0.005$ with $c=\tfrac12,\tfrac14,\tfrac18$ gives $1.34003929$, $1.34003926$, $1.34003925$. The measured remainder is $R=5.6\times10^{-13}$ against the bound $1.30\times10^{-9}$ at $v=0.005$. With a finite start $\eta=\tfrac14$ at $v=0.005$ the ratio is $1.10411$ against the leading term $\tfrac23[1+(1-\eta)^{3/2}]=1.09968$, and $\lvert\delta-\tfrac43v\rvert=1.146\times10^{-3}$ against the bound $1.806\times10^{-3}$. In every head-on run $E$ never fell below $E_0$, $\max\lvert V\rvert\le1.419\sqrt{E_0}$, $r_{\min}\cdot4E_0/K\ge0.99666$, $\min r''/(K/4r^{2})\ge0.9950$ against $\kappa(\beta)=0.9789$, and the root time advanced at every step.

**Planar, at the threshold $E_0=\varepsilon_*^{2}$.** $\lvert V(0)\rvert=0.004$ at $120^\circ$, $175^\circ$ and $30^\circ$ to $X(0)$; past velocity $V(0)\cos\omega s+W\sin\omega s$ with $W\perp V(0)$, $\lvert W\rvert=0.005$, so past speed at most $0.005$ and $\beta=0.01$; periods $3000$, $500$, $40000$ against a causal window of about $29400$; seven runs to $r=5r(0)$. Across them $E/E_0\in[0.99881,1.00455]$ against $[0.645,1.355]$; $r_{\min}\cdot5.42E_0/K\ge1.3609$ against $1$; $\max\lvert V\rvert/\sqrt{E_0}\le1.3181$ against $1.65$; $\min r''/(K/4r^{2})=0.99571$ against $0.97020$; $\max\lvert a-a_0\rvert/(\beta K/4r^{2})=1.150$ against $5.040$; $\tau$ inside the Lemma 1 interval with relative margin at least $0.0033$; $ds/dT\ge0.9869$; the item 5 quadratic bound held at every step; and a $4001$-point scan of $g$ at $T=0$ and at the end found one sign change and strict decrease. Halving both the step factor and the early step cap moved $E_{\rm end}/E_0$ from $1.0007998$ to $1.0007993$ and from $1.0045456$ to $1.0045455$.

**Reproduction of the subject's head-on table (two separately authored instruments).** Start and stop at $1600\,K/(4E_0)$; my values use step factor $c=\tfrac14$, except $c=\tfrac18$ at $v=0.02$ and $v=0.08$, where halving the step changed the coefficient by $10^{-7}$ and $7\times10^{-7}$. The coefficient columns agree to about $10^{-6}$ and the cubic columns to $4\times10^{-6}$.

| $v$ | subject $\Delta E/(E_0v)$ | this instrument | subject cubic column | this instrument |
| --- | --- | --- | --- | --- |
| 0.0025 | 1.335423 | 1.3354227 | 1.335424 | 1.3354238 |
| 0.005 | 1.338782 | 1.3387821 | 1.338787 | 1.3387866 |
| 0.01 | 1.345561 | 1.3455621 | 1.345580 | 1.3455802 |
| 0.02 | 1.359373 | 1.3593733 | 1.359447 | 1.3594467 |
| 0.04 | 1.388048 | 1.3880481 | 1.388352 | 1.3883543 |
| 0.08 | 1.450038 | 1.4500380 | 1.451353 | 1.4513570 |

The subject's $r_{\min}\cdot4E_0/K$ column is higher than mine by $2\times10^{-5}$ to $6\times10^{-5}$ (mine: $0.998335$, $0.996668$, $0.993334$, $0.986655$, $0.973262$, $0.946257$); this is inferred to come from the subject sampling $r$ only at its step nodes, for which the largest possible excess is $7\times10^{-5}$.

**Probe of the subject's instrument.** `subject_appendix_instrumented_copy.py` is a verbatim copy of the appendix code with two counters added; it was run only to confirm correction 4 and supplies no other evidence here. Its coefficient at $v=0.005$, $1.3387818$, matches the subject's table.

**Not run.** No off-axis encounter, no asymmetric data, and nothing outside $c_f=1$.
