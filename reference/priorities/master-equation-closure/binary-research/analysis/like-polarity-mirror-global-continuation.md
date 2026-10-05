# A slow like-polarity mirror pair continues for all time

## Result and standing

Two architrinos of the same polarity, moving slowly as a mirror pair, never reach wake speed and never meet. Under the unchanged Master Equation their motion exists and is unique for all future time, their separation stays above a stated floor, and they leave each other with a definite limiting velocity. This is the first motion in the Master-Equation Closure record, other than rest and exact circles, that is proved to continue forever. It is a scattering motion, not an assembly: the pair separates.

The comparison quantity $E=\tfrac12\lvert V\rvert^2+K/(4\lvert X\rvert)$ is not conserved. In a head-on encounter it increases by the fraction $\tfrac43\,v/c_f$, so the pair leaves faster than it arrived.

**Claim grade:** derived for the theorem and for the head-on coefficient with its stated remainder; inferred for the off-axis formulas and the second-order head-on coefficient; measured for the numerical illustrations. All values use $c_f=1$. The equation is unchanged: one partner root, no speed cap, no event rule. No physical mass or energy premise enters; $E$ is bookkeeping.

**Provenance and review.** The proof below was constructed on 2026-10-03 by a delegated reviewer working only from a problem statement and a list of suggested ingredients written by the coordinating Claude session, without access to any repository analysis. The coordinating session then read the theorem's proof line by line, sections 3 and 4, and found no error; it did not recheck the numerical constants of Proposition H in section 5 beyond its leading coefficient, which it had obtained separately from the [first-order encounter map](slow-mirror-encounter-first-order-map.md). The proof is therefore self-reviewed within one session. The [independent adjudication](like-polarity-mirror-independent-adjudication-2026-10-03.md), constructed separately with its own reference derivation and its own integrator, accepts the theorem and Proposition H as stated and lists six corrections outside those statements. Those corrections are applied below and marked where they change the text. The adjudication also derives that the two-body law preserves the mirror symmetry from exactly symmetric data, a corollary that has had no second reader. The original record is retained at `.local-data/master-equation-closure/geometry-session-20261003/independent/like-polarity-global.md`.

Claim grades used below: **derived** (complete proof in this file), **measured** (numerical instrument named, with its reach), **inferred** (formal expansion supported by measurement, remainder not bounded).

## 1. Setting and notation

Dimension $d \ge 1$ (line $d=1$, plane $d=2$; the proof never uses the dimension). $K>0$. The receiver is at $X(T)$, its partner at $-X(s)$ with velocity $-V(s)$, where $V = X'$. Both have the same polarity, so $\sigma = +1$.

For a time $T$ with $X(T) \ne 0$, a **partner root** is an $s \le T$ with

$$
T - s = \lvert X(T) + X(s) \rvert .
$$

Write $\tau = T-s$, $n = (X(T)+X(s))/\tau$ (a unit vector), $r = \lvert X(T)\rvert$, $e = X(T)/r$. The partner's velocity is $W(s) = -V(s)$, so $1 - n\cdot W(s) = 1 + n\cdot V(s)$, and the law reads

$$
X''(T) = a(T) = \frac{K\,(X(T)+X(s))}{\tau^{3}\,\lvert 1 + n\cdot V(s)\rvert} = \frac{K}{\tau^{2}\,\lvert 1+n\cdot V(s)\rvert}\; n .
$$

The **comparison acceleration** is $a_0 = K X/(4 r^{3}) = \dfrac{K}{4r^{2}}\,e$ (what the law gives when the partner has always been at rest at $-X(T)$), and the **comparison quantity** is

$$
E(T) = \tfrac12 \lvert V(T)\rvert^{2} + \frac{K}{4\lvert X(T)\rvert}, \qquad E_0 = E(0).
$$

$E$ is only a bookkeeping function of the state. Nothing in the argument assumes it is conserved, and section 5 shows it is not.

**Supplied past (hypothesis P).** $X:(-\infty,0]\to\mathbb R^{d}$ is $C^{1}$, $\lvert V(s)\rvert \le v_p < 1$ for all $s\le 0$, $V$ is locally Lipschitz on $(-\infty,0]$, and $X(0)\neq 0$. The past need not satisfy the law.

**Solution class.** A solution on $[0,T_1)$ is an extension of $X$ to $(-\infty,T_1)$ that is $C^{1}$ on $(-\infty,T_1)$, $C^{2}$ on $[0,T_1)$ (one-sided at $0$), has $\lvert V\rvert<1$ and $X\neq 0$ on $[0,T_1)$, and satisfies $X''(T)=a(T)$ on $[0,T_1)$ with $a$ evaluated at a partner root.

**Constants.** For $0\le\beta<1$ define

$$
C_1(\beta) = \frac{3+\beta}{1-\beta} + 2, \qquad \kappa(\beta) = \frac{(1-\beta)^{2}(1-2\beta^{2})}{1+\beta}, \qquad C_2(\beta) = \frac{2(2+\sqrt2)\,C_1(\beta)}{\kappa(\beta)} .
$$

$C_1$ and $C_2$ increase and $\kappa$ decreases with $\beta$ on $[0,1/5]$. Values: $C_1(0.01)=5.0404$, $\kappa(0.01)=0.970202$, $C_2(0.01)=35.4751$.

## 2. Theorem

**Theorem (derived).** Assume hypothesis P and put

$$
\beta := \max\{\,v_p,\; 2\sqrt{E_0}\,\} .
$$

Assume $\beta \le 1/100$. This holds whenever $v_p\le\varepsilon_*$ and $E_0\le\varepsilon_*^{2}$ with

$$
\varepsilon_* = \frac{1}{200}.
$$

$K>0$ is arbitrary. Then:

1. **Existence and uniqueness.** There is exactly one solution on $[0,\infty)$ in the solution class. Any $C^{1}$ continuation obeying the law, whatever rule it uses once a speed reaches $1$ or $X$ reaches $0$, coincides with it for all $T\ge 0$, because neither event occurs.
2. **Speed bound and root census.** $\lvert V(T)\rvert \le \sqrt{2(1+35.5\beta)E_0} \le 1.65\sqrt{E_0} \le 0.00825$ for all $T\ge0$. Every speed on $(-\infty,\infty)$ is at most $\beta\le 0.01$. At every $T\ge 0$ there is exactly one partner root and no own root, and $\dfrac{2r}{1+\beta}\le\tau\le\dfrac{2r}{1-\beta}$.
3. **Separation floor.** $\lvert X(T)\rvert \ge \dfrac{K}{4(1+35.5\beta)E_0} \ge \dfrac{K}{5.42\,E_0} > \dfrac{K}{8E_0}$ for all $T\ge 0$. The distance between the two architrinos is $2\lvert X\rvert \ge K/(2.71E_0)$.
4. **Comparison quantity.** $\lvert E(T)-E_0\rvert \le 35.5\,\beta\,E_0 \le 0.355\,E_0$ for all $T\ge0$, so $0.645E_0\le E(T)\le 1.355E_0$. $E'$ is absolutely integrable on $[0,\infty)$ and $E(T)\to E_\infty$ with $\lvert E_\infty-E_0\rvert\le 35.5\beta E_0$.
5. **Escape.** $\lvert X(T)\rvert^{2} \ge \lvert X(0)\rvert^{2} + 2\,X(0)\cdot V(0)\,T + \tfrac58 E_0 T^{2}$, so $\lvert X(T)\rvert\to\infty$. $V(T)\to V_\infty$ with $\lvert V_\infty\rvert = \sqrt{2E_\infty}\ \ge \sqrt{1.29\,E_0} > 0$, and $X(T)/T\to V_\infty$.
6. **Where the minimum of $\lvert X\rvert$ is.** $r'(T) = e\cdot V$ is strictly increasing on $[0,\infty)$ with $r''\ge \kappa(\beta)K/(4r^{2})>0$. If $X(0)\cdot V(0)\ge 0$ the minimum of $\lvert X\rvert$ over $T\ge0$ is at $T=0$. If $X(0)\cdot V(0)<0$ it is at the unique $T_*>0$ with $X\cdot V=0$, and $r(T_*) = K/\bigl(4E(T_*)-2\lvert V(T_*)\rvert^{2}\bigr)\ge K/(4E(T_*))$.
7. **What of the past is used.** The partner root time $s(T)$ is strictly increasing in $T$ and $s(0)\ge -2\lvert X(0)\rvert/(1-v_p)$. The solution therefore depends on the supplied past only through its restriction to $[-2\lvert X(0)\rvert/(1-v_p),\,0]$. The speed bound on the whole past is used only for the root census.

No hypothesis on the past beyond P is needed. In particular there is no bound on the past's acceleration, no requirement that the past obey the law, and no lower bound on past separation. The constants in items 2 to 6 do not depend on the Lipschitz constant of $V$.

**Remark on the range of the method.** The proof needs only $C_2(\beta)\,\beta<1$, which holds for $\beta\le 0.0264$ ($C_2\beta = 0.9986$ there), that is $\varepsilon_*\le 0.0132$. With that weaker choice the factor-two statement still holds but the stated numerical constants change. $\varepsilon_*=1/200$ is chosen for margin and round constants; it is not optimal.

## 3. Lemmas

Throughout, "speed at most $\beta$ on $I$" means $\lvert X(t)-X(t')\rvert\le\beta\lvert t-t'\rvert$ for $t,t'\in I$.

### Lemma 1 (partner root: existence, uniqueness, size, monotonicity)

Let $X$ have speed at most $\beta<1$ on $(-\infty,T]$ and $r=\lvert X(T)\rvert>0$. Then $g(s) = T-s-\lvert X(T)+X(s)\rvert$ has exactly one zero in $(-\infty,T]$, and $\tau=T-s$ satisfies $2r/(1+\beta)\le\tau\le 2r/(1-\beta)$. If the same holds at $T_1<T_2$, the roots satisfy $s_1<s_2$.

*Proof.* For $s_1<s_2\le T$, $g(s_1)-g(s_2) = (s_2-s_1) - \bigl(\lvert X(T)+X(s_1)\rvert-\lvert X(T)+X(s_2)\rvert\bigr) \ge (1-\beta)(s_2-s_1) > 0$, so $g$ is strictly decreasing. $g(T) = -2r<0$. With $\delta = X(T)-X(s)$, $\lvert\delta\rvert\le\beta(T-s)$ and $X(T)+X(s) = 2X(T)-\delta$. At $s = T-2r/(1-\beta)$, $g(s) \ge \frac{2r}{1-\beta} - 2r - \beta\frac{2r}{1-\beta} = 0$. So there is exactly one zero, and it lies in $[T-2r/(1-\beta),T)$. At the zero $\tau = \lvert 2X(T)-\delta\rvert\ge 2r-\beta\tau$, which gives the lower bound. For monotonicity suppose $s_2\le s_1$. Then $T_2-s_2 = \lvert X(T_2)+X(s_2)\rvert \le \lvert X(T_1)+X(s_1)\rvert + \beta(T_2-T_1)+\beta(s_1-s_2) = T_1-s_1+\beta[(T_2-T_1)+(s_1-s_2)]$, that is $(T_2-T_1)+(s_1-s_2)\le\beta[(T_2-T_1)+(s_1-s_2)]$ with a positive left side, which is impossible. $\square$

### Lemma 2 (no own root)

If $X$ has speed at most $\beta<1$ on $(-\infty,T]$ there is no $s<T$ with $T-s = \lvert X(T)-X(s)\rvert$.

*Proof.* $\lvert X(T)-X(s)\rvert\le\beta(T-s)<T-s$. $\square$

### Lemma 3 (comparison bound)

Let $X$ have speed at most $\beta<1$ on $(-\infty,T]$, $r>0$, and let $V$ exist at the partner root $s$ with $\lvert V(s)\rvert\le\beta$. Put $D = 1+n\cdot V(s)$ and $\lambda = 4r^{2}/(\tau^{2}D)$. Then

$$
a = \frac{K}{4r^{2}}\,\lambda\, n,\qquad \frac{(1-\beta)^{2}}{1+\beta}\le\lambda\le\frac{(1+\beta)^{2}}{1-\beta},\qquad \lvert n-e\rvert\le 2\beta,\qquad e\cdot n\ge 1-2\beta^{2},
$$

$$
\lvert a-a_0\rvert \le C_1(\beta)\,\beta\,\frac{K}{4r^{2}}, \qquad e\cdot a \ge \kappa(\beta)\,\frac{K}{4r^{2}}, \qquad \lvert a\rvert\le\frac{(1+\beta)^{2}}{1-\beta}\,\frac{K}{4r^{2}} .
$$

For $\beta\le 1/5$, $C_1(\beta)\le 6$.

*Proof.* $D\in[1-\beta,1+\beta]$, so $D>0$ and the absolute value in the law is $D$; with $a = K n/(\tau^{2}D)$ this is the first identity. By Lemma 1, $4r^{2}/\tau^{2}\in[(1-\beta)^{2},(1+\beta)^{2}]$, which with the range of $D$ gives the range of $\lambda$. For the direction, with $u = 2X(T)-\delta$ and $w = 2X(T)$: $\dfrac{u}{\lvert u\rvert}-\dfrac{w}{\lvert w\rvert} = \dfrac{u-w}{\lvert u\rvert} + w\Bigl(\dfrac1{\lvert u\rvert}-\dfrac1{\lvert w\rvert}\Bigr)$, and the second term has norm $\bigl\lvert\lvert w\rvert-\lvert u\rvert\bigr\rvert/\lvert u\rvert\le\lvert u-w\rvert/\lvert u\rvert$. So $\lvert n-e\rvert\le 2\lvert\delta\rvert/\tau\le2\beta$, and $e\cdot n = 1-\tfrac12\lvert n-e\rvert^{2}\ge 1-2\beta^{2}$. Next $\lvert\lambda-1\rvert\le\max\Bigl\{\dfrac{(1+\beta)^{2}}{1-\beta}-1,\;1-\dfrac{(1-\beta)^{2}}{1+\beta}\Bigr\} = \dfrac{3\beta+\beta^{2}}{1-\beta}$, since the first entry is $(3\beta+\beta^{2})/(1-\beta)$ and the second is $(3\beta-\beta^{2})/(1+\beta)$. Hence $\lvert\lambda n-e\rvert\le\lvert\lambda-1\rvert+\lvert n-e\rvert\le\bigl(\tfrac{3+\beta}{1-\beta}+2\bigr)\beta$. The radial bound is $e\cdot a = \frac{K}{4r^{2}}\lambda\,(e\cdot n)$ with both factors bounded below. $C_1\le 6$ is equivalent to $3+\beta\le4-4\beta$. $\square$

*Sharpness note (measured).* A Monte Carlo over 20000 random polyline histories per value of $\beta\in\{0.01,0.1,0.2\}$ found $\max\lvert a-a_0\rvert/(\beta K/4r^{2}) = 2.92,\,3.38,\,3.86$ against $C_1 = 5.04,\,5.44,\,6$, and $\min e\cdot a/(K/4r^{2}) = 0.9709,\,0.742,\,0.545$ against $\kappa = 0.9702,\,0.722,\,0.491$; the $\tau$ bounds of Lemma 1 were attained to rounding. The script used for this sampling was not retained, so the note is illustrative only. Sampling can only fail to find a violation; the proof above is the evidence.

### Lemma 4 (two derivative identities)

On any interval of $[0,\infty)$ where a solution exists,

$$
E' = V\cdot(a-a_0), \qquad r'' = \frac{\lvert V\rvert^{2}-(e\cdot V)^{2}}{r} + e\cdot a \;\ge\; e\cdot a, \qquad \bigl(r^{2}\bigr)'' = 2\lvert V\rvert^{2}+2X\cdot a .
$$

*Proof.* $E' = V\cdot a - \frac{K}{4r^{2}}\,e\cdot V = V\cdot(a-a_0)$. $r' = X\cdot V/r$, so $r'' = (\lvert V\rvert^{2}+X\cdot a)/r-(X\cdot V)^{2}/r^{3}$. The inequality is Cauchy–Schwarz. The last identity is direct. All are valid at $T=0$ as one-sided derivatives because $X\in C^{2}([0,T_1))$ and $X\ne0$. $\square$

### Lemma 5 (local well-posedness; the step that removes the delay)

Let $T_0\ge0$ and let $X:(-\infty,T_0]\to\mathbb R^{d}$ be $C^{1}$ with speed at most $\beta_0<1$, $V$ locally Lipschitz, and $r_0 = \lvert X(T_0)\rvert>0$. Put

$$
M = \frac{16K(1+\beta_0)^{2}}{49\,r_0^{2}(1-\beta_0)}, \qquad h = \min\Bigl\{\frac{r_0}{8},\ \sqrt{\frac{r_0}{4M}},\ \frac{1-\beta_0}{2M}\Bigr\}.
$$

Then there is exactly one solution on $[T_0,T_0+h]$ in the solution class, and its speed is at most $(1+\beta_0)/2$. $h$ depends only on $(r_0,\beta_0,K)$, is nondecreasing in $r_0$ and nonincreasing in $\beta_0$.

*Proof.* Let $\Omega = \{(T,x): T_0\le T\le T_0+h,\ \lvert x-X(T_0)\rvert\le r_0/4\}$. For $(T,x)\in\Omega$ consider $G(s) = T-s-\lvert x+X(s)\rvert$ on $s\le T_0$, using the history only. As in Lemma 1, $G(s_1)-G(s_2)\ge(1-\beta_0)(s_2-s_1)$ for $s_1<s_2$, $G\to+\infty$ as $s\to-\infty$, and $G(T_0) = (T-T_0)-\lvert x+X(T_0)\rvert\le \tfrac{r_0}{8}-\tfrac{7r_0}{4}<0$. So $G$ has a unique zero $\sigma(T,x)<T_0$. Put $\tau = T-\sigma = \lvert x+X(\sigma)\rvert$. Since $T_0-\sigma\le\tau$: $\tau\ge\lvert x+X(T_0)\rvert-\beta_0\tau$ gives $\tau\ge\dfrac{7r_0}{4(1+\beta_0)}$, and $\tau\le\tfrac{9r_0}{4}+\beta_0\tau$ gives $\tau\le\dfrac{9r_0}{4(1-\beta_0)}$. So $\sigma$ ranges in the compact interval $I = [T_0-\tfrac{9r_0}{4(1-\beta_0)},T_0]$, on which $V$ is Lipschitz.

$\sigma$ is Lipschitz: for $(T,x),(T',x')\in\Omega$ with zeros $\sigma,\sigma'$, $\lvert G_{T,x}(\sigma')\rvert = \lvert G_{T,x}(\sigma')-G_{T',x'}(\sigma')\rvert\le\lvert T-T'\rvert+\lvert x-x'\rvert$ and $\lvert G_{T,x}(\sigma')-G_{T,x}(\sigma)\rvert\ge(1-\beta_0)\lvert\sigma-\sigma'\rvert$, so $\lvert\sigma-\sigma'\rvert\le(\lvert T-T'\rvert+\lvert x-x'\rvert)/(1-\beta_0)$.

Define $F(T,x) = \dfrac{K\,(x+X(\sigma))}{\tau^{3}\,(1+n\cdot V(\sigma))}$ with $n = (x+X(\sigma))/\tau$. It is a composition of Lipschitz maps ($\sigma$; $X$ and $V$ on $I$) with $u\mapsto u/\lvert u\rvert^{3}$ and $u\mapsto u/\lvert u\rvert$ on $\lvert u\rvert\ge 7r_0/(4(1+\beta_0))$ and division by $1+n\cdot V(\sigma)\ge1-\beta_0$. So $F$ is Lipschitz on $\Omega$ and $\lvert F\rvert = K/(\tau^{2}(1+n\cdot V(\sigma)))\le M$.

The ordinary (non-delay) system $x' = y$, $y' = F(T,x)$, $x(T_0) = X(T_0)$, $y(T_0) = V(T_0)$ has a unique solution while $(T,x)\in\Omega$ (Picard–Lindelöf). It stays in $\Omega$ on all of $[T_0,T_0+h]$ because $\lvert x(T)-X(T_0)\rvert\le\beta_0h+\tfrac12Mh^{2}\le\tfrac{r_0}{8}+\tfrac{r_0}{8}$, and $\lvert y\rvert\le\beta_0+Mh\le(1+\beta_0)/2<1$.

*It solves the delayed law.* The extended path has speed below $1$ on $(-\infty,T]$ and $\lvert x(T)\rvert\ge 3r_0/4>0$, so by Lemma 1 its partner root is unique among all $s\le T$. $\sigma(T,x(T))$ is such a root. Hence $a(T) = F(T,x(T))$.

*Uniqueness in the class.* Let $Z$ be any solution on $[T_0,T_0+h']$, $h'\le h$. Because $\lvert Z'\rvert<1$, $\lvert Z(T)-X(T_0)\rvert\le T-T_0\le r_0/8$, so $(T,Z(T))\in\Omega$. $\sigma(T,Z(T))$ is a partner root of $Z$'s path and by Lemma 1 the only one, so $Z'' = F(T,Z)$ and $Z = x$ by ODE uniqueness. $\square$

*Regularity actually used.* Existence needs only continuity of $V$ on the past window (then $F$ is continuous and Peano's theorem applies). Uniqueness uses the Lipschitz property of $V$ there, because $x\mapsto V(\sigma(T,x))$ must be Lipschitz. On later steps the root lies in $[0,T]$, where $V$ is $C^{1}$ with bounded derivative, including across $s=0$ where the acceleration jumps but $V$ stays Lipschitz.

## 4. Proof of the theorem

**Step 0: maximal solution.** By Lemma 5 at $T_0=0$ (with $\beta_0 = v_p$) a solution exists on some $[0,h]$. Two solutions on a common interval coincide: if not, let $T'$ be the supremum of times up to which they agree; both have speed below $1$ and are nonzero at $T'$, and Lemma 5 at $T_0 = T'$ forces agreement beyond $T'$. So there is a unique maximal solution on $[0,T_{\max})$.

**Step 1: bootstrap set.** $E$ is continuous on $[0,T_{\max})$ and $E_0>0$. Let $\mathcal A = \{T\in[0,T_{\max}):\ E\le 2E_0\text{ on }[0,T]\}$. It contains $0$ and is relatively closed. Fix $T\in\mathcal A$. On $[0,T]$:

- $\lvert V\rvert\le\sqrt{2E}\le 2\sqrt{E_0}\le\beta$ and $\dfrac{K}{4r}\le E\le2E_0$, so $r\ge K/(8E_0)>0$.
- With $\lvert V\rvert\le v_p\le\beta$ on the past, the path has speed at most $\beta\le 1/100$ on $(-\infty,T]$. Lemmas 1 to 3 apply at every $T'\in[0,T]$.

**Step 2: the time integral of $K/(4r^{2})$ without convexity.** By Lemmas 3 and 4, $r''\ge\kappa(\beta)\,K/(4r^{2})$ on $[0,T]$. $r'$ is $C^{1}$ there, so

$$
\int_0^{T}\frac{K}{4r^{2}}\,dT' \;\le\;\frac{r'(T)-r'(0)}{\kappa(\beta)}\;\le\;\frac{\lvert V(T)\rvert+\lvert V(0)\rvert}{\kappa(\beta)}\;\le\;\frac{(2+\sqrt2)\sqrt{E_0}}{\kappa(\beta)} ,
$$

using $\lvert V(T)\rvert\le2\sqrt{E_0}$ and $\lvert V(0)\rvert\le\sqrt{2E_0}$. This bound does not depend on $T$ or on the past.

**Step 3: closing the bootstrap.** By Lemmas 3 and 4, $\lvert E'\rvert\le\lvert V\rvert\,C_1(\beta)\,\beta\,K/(4r^{2})$, so

$$
\lvert E(T)-E_0\rvert\le 2\sqrt{E_0}\;C_1(\beta)\,\beta\;\frac{(2+\sqrt2)\sqrt{E_0}}{\kappa(\beta)} = C_2(\beta)\,\beta\,E_0\le 35.48\,\beta\,E_0\le 0.355\,E_0 .
$$

So $E\le1.355E_0<2E_0$ on $\mathcal A$; by continuity $\mathcal A$ is relatively open in $[0,T_{\max})$, hence $\mathcal A = [0,T_{\max})$.

**Step 4: $T_{\max}=\infty$.** On $[0,T_{\max})$, $r\ge\rho := K/(8E_0)$ and the speed is at most $\beta$ on $(-\infty,T_{\max})$; $V$ is locally Lipschitz on the whole history because $\lvert X''\rvert = \lvert a\rvert$ is bounded on $[0,T_{\max})$ by Lemma 3. Let $h_*$ be the $h$ of Lemma 5 for $(r_0,\beta_0) = (\rho,\beta)$. If $T_{\max}<\infty$, apply Lemma 5 at $T_0 = \max\{0,T_{\max}-h_*/2\}$; since $r(T_0)\ge\rho$ and $h$ is nondecreasing in $r_0$, the solution extends to $T_0+h_*>T_{\max}$, a contradiction. This proves item 1 within the class. For the last sentence of item 1: a $C^{1}$ continuation $Z$ under any rule agrees with ours up to the supremum $T'$ of agreement times; at $T'$ its speed is at most $\beta<1$ and $Z\ne0$, so by continuity it is in the solution class on a neighbourhood, where Lemma 5 gives agreement; hence $T'=\infty$.

**Items 2, 3, 4.** $\lvert V\rvert\le\sqrt{2E}\le\sqrt{2\cdot1.355E_0}\le1.65\sqrt{E_0}$, and $\sqrt{E_0}\le\beta/2\le1/200$. The census is Lemmas 1 and 2. $K/(4r)\le E\le(1+35.5\beta)E_0$ gives item 3. Steps 2 and 3 hold for every $T$, so $\int_0^\infty\lvert E'\rvert\le C_2\beta E_0<\infty$ and $E$ converges.

**Item 5.** By Lemma 4 and $X\cdot a = r\,e\cdot a\ge\kappa K/(4r)$,

$$
(r^{2})''\ge 4\cdot\tfrac12\lvert V\rvert^{2}+2\kappa\frac{K}{4r}\ge2\kappa E\ge 2(0.9702)(0.645)E_0\ge\tfrac54E_0 ,
$$

and integrating twice from $0$ gives the quadratic lower bound, so $r\to\infty$. By Lemma 3 and Step 2, $\int_0^\infty\lvert a\rvert\le\frac{(1+\beta)^{2}}{1-\beta}\cdot\frac{(2+\sqrt2)\sqrt{E_0}}{\kappa}<\infty$, so $V(T)\to V_\infty$. Since $K/(4r)\to0$, $\tfrac12\lvert V_\infty\rvert^{2} = E_\infty\ge0.645E_0>0$. $X(T)/T\to V_\infty$ because $X(T) = X(0)+\int_0^{T}V$.

**Item 6.** $r''\ge\kappa K/(4r^{2})>0$ makes $r'$ strictly increasing. If $r'(0)\ge0$ then $r'>0$ on $(0,\infty)$. If $r'(0)<0$, $r'$ has exactly one zero $T_*$ because $r\to\infty$; there $X\cdot V=0$ and $K/(4r) = E-\tfrac12\lvert V\rvert^{2}$.

**Item 7.** Monotonicity of $s(T)$ is Lemma 1. $s(0)\ge-2r(0)/(1-v_p)$ is the upper bound on $\tau$ in Lemma 1 at $T=0$ with speed bound $v_p$. $\blacksquare$

**The jump at $T=0$.** $a(0^{+})$ is fixed by the past through the root $s(0)$; the past's own left acceleration is unconstrained, so $X''$ generally jumps at $0$ while $V$ is continuous. Nothing above uses more. A second, weaker kink occurs at the time $T_c$ with $s(T_c)=0$: $a$ is continuous there but $a'$ jumps.

## 5. Head-on encounter: the coefficient

### Proposition H (derived, explicit remainder)

Let $d=1$, $X = x>0$, hypotheses of the theorem, and $V(0) = v_0\le0$ (incoming or at rest). Put $v := \sqrt{2E_0}$ (the speed the pair would have at infinite separation in the comparison motion), $u_0 := K/(4x(0))$, $\eta := u_0/E_0\in(0,1]$, $v_{\rm out} := \lvert V_\infty\rvert = \sqrt{2E_\infty}$. Then

$$
E_\infty-E_0 = (1+\theta)\,\frac{\lvert v_0\rvert^{3}+v_{\rm out}^{3}}{3}+R,\qquad\lvert\theta\rvert\le3.1\,\beta,\qquad\lvert R\rvert\le8.3\,E_0^{2}+17.5\,\beta\sqrt{E_0}\,u_0 ,
$$

and consequently

$$
\Bigl\lvert\frac{E_\infty-E_0}{E_0}-\frac43\,v\Bigr\rvert\le4.2\,\beta v+6.3\,v^{2}+1.2\,v\,\eta .
$$

So for an encounter started from large separation ($\eta\to0$) with a past no faster than the encounter itself ($v_p\le\sqrt2\,v$, so $\beta = \sqrt2 v$):

$$
\boxed{\ \frac{\Delta E}{E_0} = +\frac43\,v+O(v^{2})\ },\qquad v_{\rm out} = v\bigl(1+\tfrac23v+O(v^{2})\bigr).
$$

The comparison quantity **increases**: the pair leaves faster than it arrived. At finite start distance the leading term is $\tfrac23v\,[\,1+(1-\eta)^{3/2}\,]$.

*Proof.* In one dimension $n=e=1$ exactly and $a = a_0\Lambda$ with $a_0 = K/(4x^{2})$ and $\Lambda = 4x^{2}/\bigl((x+x_s)^{2}(1+x'_s)\bigr)$, where $x_s = x(s)$, $x'_s = x'(s)$. By Lemma 4, $E' = x'a_0(\Lambda-1)$. Write $y = x'(T)$ and $\omega := \Lambda-1-y$, so

$$
E_\infty-E_0 = \underbrace{\int_0^\infty a_0\,x'^{2}\,dT}_{M}+\underbrace{\int_0^\infty a_0\,x'\,\omega\,dT}_{R}.
$$

*Main term.* Exactly, $\dfrac{d}{dT}\dfrac{x'^{3}}{3} = x'^{2}a$, so $\int_0^\infty a\,x'^{2}\,dT = \dfrac{v_{\rm out}^{3}-v_0^{3}}{3} = \dfrac{v_{\rm out}^{3}+\lvert v_0\rvert^{3}}{3}$. Since $a_0 = a/\Lambda$ and $1/\Lambda\in\bigl[\tfrac{1-\beta}{(1+\beta)^{2}},\tfrac{1+\beta}{(1-\beta)^{2}}\bigr]$, $M = (1+\theta)(v_{\rm out}^{3}+\lvert v_0\rvert^{3})/3$ with $\lvert\theta\rvert\le\frac{1+\beta}{(1-\beta)^{2}}-1 = \frac{3\beta-\beta^{2}}{(1-\beta)^{2}}\le3.06\beta$.

*Why $\omega$ is second order.* Define $R_1 := x_s-(x-y\tau)$ and $R_2 := y-x'_s$. Then $\tau = x+x_s = 2x-y\tau+R_1$, so $\tau = (2x+R_1)/(1+y)$, and $1+x'_s = 1+y-R_2$. Hence, exactly,

$$
\Lambda = (1+y)\cdot\frac{1}{(1+\rho_1)^{2}(1-\rho_2)},\qquad\rho_1 = \frac{R_1}{2x},\quad\rho_2 = \frac{R_2}{1+y}.
$$

For a uniformly moving window $R_1=R_2=0$ and $\Lambda = 1+y$ exactly. In general $\lvert\omega\rvert\le(1+\beta)\Bigl\lvert\dfrac{1}{(1+\rho_1)^{2}(1-\rho_2)}-1\Bigr\rvert$.

*Late times, $s(T)\ge0$.* The window $[s,T]$ lies in $[0,\infty)$ where $\lvert x''\rvert = a\le\lambda_{\max}a_0$ with $\lambda_{\max} = (1+\beta)^{2}/(1-\beta)\le1.0305$. On the window $x\ge x(T)-\beta\tau\ge x(T)(1-\tfrac{2\beta}{1-\beta})\ge0.9797\,x(T)$, so $\lvert x''\rvert\le A := 1.0736\,K/(4x(T)^{2})$. With $\tau\le2.0203\,x$ and $u := K/(4x)$: $\lvert R_1\rvert\le A\tau^{2}/2$ gives $\lvert\rho_1\rvert\le1.0954\,u$; $\lvert R_2\rvert\le A\tau$ gives $\lvert\rho_2\rvert\le2.1908\,u$. Since $u\le E\le1.355E_0\le1.355\beta^{2}/4<3.4\times10^{-5}$, the bracket is at most $(2\lvert\rho_1\rvert+\lvert\rho_2\rvert)(1.0004)$, so $\lvert\omega\rvert\le1.01\cdot1.0004\cdot4.3816\,u\le4.5\,u$. On each monotone leg $a_0\lvert x'\rvert\,dT = \lvert du\rvert$, so $\int a_0\lvert x'\rvert\,4.5u\,dT\le4.5\,u_*^{2}$ with $u_* = \max u = E(T_*)\le1.355E_0$. Contribution at most $8.3E_0^{2}$.

*Early times, $s(T)<0$.* Here the window reaches into the unconstrained past, and only $\lvert\omega\rvert\le\lvert\Lambda-1\rvert+\lvert y\rvert\le\frac{3\beta+\beta^{2}}{1-\beta}+\beta\le4.05\beta$ is used. $s(T)<0$ means $T<\tau\le2x(T)/(1-\beta)\le2(x(0)+\beta T)/(1-\beta)$, so $T<T_c\le2x(0)/(1-3\beta)\le2.062\,x(0)$, on which $x\ge0.979\,x(0)$. So $\int_0^{T_c}a_0\lvert x'\rvert\,dT\le1.0434\,\frac{K}{4x(0)^{2}}\cdot2\sqrt{E_0}\cdot2.062\,x(0)\le4.31\sqrt{E_0}\,u_0$ and the contribution is at most $17.5\,\beta\sqrt{E_0}\,u_0$.

*The final inequality.* Put $\delta = (E_\infty-E_0)/E_0$. $\lvert v_0\rvert^{3} = v^{3}(1-\eta)^{3/2}$ and $v_{\rm out}^{3} = v^{3}(1+\delta)^{3/2}$, so $\delta = \tfrac{2v}{3}(1+\theta)\bigl[(1-\eta)^{3/2}+(1+\delta)^{3/2}\bigr]+R/E_0$. With $E_0 = v^{2}/2$: $\lvert R\rvert/E_0\le4.15v^{2}+12.4\,\beta v\eta$. First, from $\lvert\delta\rvert\le0.355$ and $v\le\beta/\sqrt2$: $\lvert\delta\rvert\le\tfrac{2v}{3}(1.031)(1+1.355^{3/2})+0.16v\le2v$. Then $\lvert(1-\eta)^{3/2}-1\rvert\le1.5\eta$ and $\lvert(1+\delta)^{3/2}-1\rvert\le1.5\sqrt{1+2v}\,(2v)\le3.1v$, so the bracket is $2+e_1$ with $\lvert e_1\rvert\le1.5\eta+3.1v$ and

$$
\Bigl\lvert\delta-\tfrac43v\Bigr\rvert\le\tfrac{2v}{3}\bigl[2\lvert\theta\rvert+1.031\lvert e_1\rvert\bigr]+\frac{\lvert R\rvert}{E_0}\le4.14\beta v+(2.14+4.15)v^{2}+(1.04+12.4\beta)v\eta .\qquad\square
$$

### Second-order coefficient (inferred, not proved)

Formally $1/\Lambda = 1-x'+\dots$, so $M = [x'^{3}/3]-[x'^{4}/4]+\dots$ and the quartic bracket is $O(v^{5})$; and $\omega$ is to leading order even under reversal of the leg while $x'$ is odd, so $R$ cancels to leading order. This suggests $\Delta E = (\lvert v_0\rvert^{3}+v_{\rm out}^{3})/3$ up to relative $O(v^{2})$, hence $\Delta E/E_0 = \tfrac43v+\tfrac43v^{2}+O(v^{3})$. Measured support is in section 6 (relative residual of the cubic formula $-5\times10^{-5}$ at $v=0.02$). The rigorous statement is only the proposition above.

### Off-axis first-order formulas (inferred: formal first-order expansion, measured agreement)

To first order in the speed, Lemma 3's quantities expand as $n = e-V_\perp$, $\lambda = 1+e\cdot V$, with $V_\perp = V-(e\cdot V)e$, so

$$
a-a_0\approx\frac{K}{4r^{2}}\bigl[(e\cdot V)\,e-V_\perp\bigr],\qquad E'\approx\frac{K}{4r^{2}}\bigl(v_r^{2}-v_t^{2}\bigr),\qquad\ell'\approx-\frac{K}{4r^{2}}\,\ell ,
$$

with $v_r = e\cdot V$, $v_t = \lvert V_\perp\rvert$ and $\ell = \lvert X\wedge V\rvert$. Radial motion raises $E$, tangential motion lowers it. Integrating along the comparison orbit $1/r = (k/\ell^{2})(\epsilon\cos\vartheta-1)$, $k = K/4$, $\epsilon^{2} = 1+2E\ell^{2}/k^{2}$, with $q := \ell v/k = 4bv^{2}/K$ ($b$ the distance of each incoming asymptote from the centre):

$$
\frac{\Delta E}{E_0}\approx4v\,\frac{q-\arctan q}{q^{3}},\qquad\frac{\Delta\ell}{\ell}\approx-\frac{2v}{q}\arctan q .
$$

$q\to0$ recovers $\tfrac43v$. The first is positive for every $q$ and decays like $4v/q^{2}$.

## 6. Numerical illustration (measured)

**Instrument.** A fixed-step fourth-order Runge–Kutta integrator for $X'' = a$ written for this review (`likepair.py`, reproduced in the appendix), run under `/Users/markmorris/vibe/.venv/bin/python` (Python 3.13.2), $K=1$, $c_f=1$. The partner root is found by Newton iteration on $T-s-\lvert X+X(s)\rvert$; history is interpolated by cubic Hermite polynomials (position from stored position and velocity, velocity from stored velocity and acceleration). **Reach:** it extrapolates the stored history beyond its last node within a step and uses a placeholder zero acceleration there when the delay is shorter than the step, which occurs only for $v<1/60$ at the step sizes used; the adjudication reran the cases with an instrumented copy and with its own integrator and the reported numbers stand. It integrates the mirror-symmetric single-root law only; it cannot detect a second root or a symmetry-breaking mode. It is authored by the same reviewer as the proof, so its agreement with the theorem's bounds is an illustration, not independent evidence. Its agreement with the closed forms $\tfrac43$ and $4(q-\arctan q)/q^{3}$ is a check of those forms, because the integrator contains neither.

**Known-case checks.** (a) Uniformly moving line history: exact $a(0^{+}) = K(1+v_0)/(4x_0^{2})$; integrator one-step value agreed to relative $4\times10^{-7}$, $2\times10^{-7}$, $2\times10^{-7}$ for $(x_0,v_0) = (1000,-0.3),(1000,0.2),(50,-0.01)$ with $dt = 10^{-3}$. (b) Planar uniform history $X_0 = (300,40)$, $V_0 = (-0.2,0.1)$: integrator $(2.2201893\times10^{-6},\,1.47954\times10^{-8})$ against a separately coded bisection evaluation $(2.2201879\times10^{-6},\,1.47950\times10^{-8})$. (c) Step refinement at $v=0.02$, start distance $N=400$: coefficient $1.3555227,\ 1.3555240,\ 1.3555240$ for $20,40,80$ steps per $x_{\min}/v$. Order of events, for the record: one head-on run at $v=0.02$ was made before checks (a) to (c); the checks then passed, and every number reported here comes from runs made afterwards.

**Head-on, start at $x_0 = 1600\,K/(4E_0)$, uniformly incoming past.**

| $v$ | $\Delta E/(E_0 v)$ measured | $(\lvert v_0\rvert^{3}+v_{\rm out}^{3})/(3E_0v)$ | $r_{\min}\cdot4E_0/K$ |
| --- | --- | --- | --- |
| 0.0025 | 1.335423 | 1.335424 | 0.99835 |
| 0.005 | 1.338782 | 1.338787 | 0.99667 |
| 0.01 | 1.345561 | 1.345580 | 0.99339 |
| 0.02 | 1.359373 | 1.359447 | 0.98671 |
| 0.04 | 1.388048 | 1.388352 | 0.97330 |
| 0.08 | 1.450038 | 1.451353 | 0.94629 |

The first column tends to $\tfrac43$ as $v\to0$; the values match $\tfrac43(1+v)-2/N$ with $N=1600$ ($1.33542$ at $v=0.0025$). $E$ was nondecreasing in every head-on run. $v = 0.01, 0.02, 0.04, 0.08$ lie outside the theorem's hypothesis and are shown only for the trend.

**Off-axis, $v=0.01$, same start distance.** These runs lie outside the theorem's hypothesis, which needs $v\le0.00707$; they illustrate the formulas, not the theorem.

| $q$ | $\Delta E/(E_0v)$ measured | $4(q-\arctan q)/q^{3}$ | $\Delta\ell/(\ell v)$ measured | $-2\arctan(q)/q$ | $\int\frac{K}{4r^{2}}(v_r^{2}-v_t^{2})dT\,/\,\Delta E$ |
| --- | --- | --- | --- | --- | --- |
| 0.25 | 1.29734 | 1.28546 | $-1.94695$ | $-1.95983$ | 0.999975 |
| 1 | 0.86603 | 0.85841 | $-1.56452$ | $-1.57080$ | 0.999979 |
| 4 | 0.16687 | 0.16714 | $-0.66195$ | $-0.66291$ | 0.999990 |

Differences of order $1\%$ from the asymptotic closed forms are the expected $O(v)$ and finite-start corrections.

**Threshold cases for the theorem ($\varepsilon_* = 1/200$).** (A) $E_0 = \varepsilon_*^{2}$, $V(0) = (-0.003,0)$, past velocity $V(s) = V(0)\cos\omega s+W\sin\omega s$ with $\lvert W\rvert = 0.004$ (speed at most $0.005$), periods $3000$ and $500$ against a causal window of about $24400$, steps $dt = 50$ and $25$: $E/E_0\in[0.9999995,\,1.00397]$ up to $r = 5r(0)$; $r_{\min}\cdot8E_0/K = 1.9993$ and $2.045$; $\max\lvert V\rvert/(2\sqrt{E_0}) = 0.648$. (B) Past-dominated: $V(0)=0$, $E_0 = 10^{-8}$, radial oscillating past of speed amplitude $0.005$ with period $r_0/20$, $r_0/2$, $2r_0$, integrated through $0\le T\le6r_0$: $\lvert E/E_0-1\rvert\le3\times10^{-11}$ against the theorem's bound $0.1775$. The theorem's bound is very loose when $\lvert V(0)\rvert\ll v_p$.

## 7. What the theorem does not show

1. **Nothing beyond small speeds.** The method stops at $\beta\approx0.026$. It says nothing about encounters at speeds comparable to $1$, where the denominator $1+n\cdot V(s)$ can approach $0$ and further roots can appear.
2. **Symmetry is imposed in this proof.** $X_2 = -X_1$ is part of the configuration here. The adjudication's Corollary A derives, from the argument of Lemma 5, that from an exactly mirror-symmetric past the mirror motion is the only two-body continuation; that corollary is not yet reviewed. Stability of the symmetric motion against asymmetric perturbations of the data or of the past remains open.
3. **Like polarity only.** For $\sigma = -1$ the sign of $e\cdot a$ flips, Step 2 fails, and the separation floor is false in general.
4. **Uniqueness needs a Lipschitz past velocity on the causal window.** With a merely continuous $V$, existence and items 2 to 6 hold for every solution, but uniqueness is neither proved nor refuted here.
5. **No admissibility claim about the past.** The supplied past is data. The theorem does not say such a past can arise from the law.
6. **No conservation.** $E$ is not conserved; it changes at first order in the speed, with sign depending on the geometry (section 5). The limit $E_\infty$ is not computed in general; only $\lvert E_\infty-E_0\rvert\le35.5\beta E_0$ and, head-on, Proposition H.
7. **Constants are not sharp.** The bound $35.5\beta$ exceeds the head-on value $\tfrac43v$ by a factor of at least $37$ (with $\beta = \sqrt2v$). The measured runs suggest the conclusions persist far outside the stated range; that is not proved.
8. **The off-axis formulas and the second-order head-on coefficient are inferred**, not derived with a remainder bound.
9. **Only two architrinos.** No statement about any third body, or about what the escaping pair meets later.

## 8. Falsifiers

1. **Lemma 3.** Any path with speed at most $\beta\le1/5$ on $(-\infty,T]$ and a point $T$ where $\lvert a-a_0\rvert>C_1(\beta)\beta K/(4r^{2})$, or $\tau\notin[2r/(1+\beta),2r/(1-\beta)]$, or $e\cdot a<\kappa(\beta)K/(4r^{2})$. Check by direct root solve on any test history.
2. **Radial monotonicity.** Any solution under the hypotheses with $r''(T)<0$ at some $T\ge0$, equivalently $e\cdot V$ decreasing anywhere.
3. **Theorem items 2 to 4.** Any solution with $v_p\le1/200$, $E_0\le1/40000$ in which $E$ leaves $[0.645E_0,1.355E_0]$, or $\lvert X\rvert<K/(5.42E_0)$, or $\lvert V\rvert>1.65\sqrt{E_0}$, or a second partner root appears. An independent integrator (one not sharing code with `likepair.py`) is the right instrument.
4. **Uniqueness.** Two distinct $C^{1}$ continuations from one past satisfying P.
5. **Exact head-on identity.** $\int_0^{T}a\,x'^{2}\,dT' = (x'(T)^{3}-x'(0)^{3})/3$ must hold to integrator accuracy; failure indicates an integrator defect, not a theory defect.
6. **Head-on coefficient.** With a uniformly incoming past, $x_0\to\infty$ and $v\to0$, the ratio $\Delta E/(E_0v)$ must tend to $\tfrac43$, and must satisfy $\lvert\Delta E/E_0-\tfrac43v\rvert\le4.2\beta v+6.3v^{2}+1.2v\eta$ for $\beta\le0.01$. A limit other than $\tfrac43$, or a decrease of $E$ in a head-on run inside the hypothesis range by more than the stated remainder, overturns Proposition H.
7. **Off-axis formula (inferred claim).** $\Delta E/(E_0v)\to4(q-\arctan q)/q^{3}$ as $v\to0$ at fixed $q$; a different limit overturns it.

## Appendix: integrator used in section 6

```python
# likepair.py -- mirror-symmetric like-polarity pair, delayed acceleration law, c_f = 1.
# Receiver X(T), partner at -X(s); root T - s = |X(T) + X(s)|;
# a = K (X(T)+X(s)) / (tau^3 (1 + n.V(s))).  Fixed-step RK4; cubic Hermite history.
import math

def simulate(K, X0, V0, past, dt, r_stop, max_steps=4000000, T_stop=None):
    hx=[X0[0]]; hy=[X0[1]]; hvx=[V0[0]]; hvy=[V0[1]]; hax=[0.0]; hay=[0.0]
    def hist(s):
        if s <= 0.0:
            return past(s)                      # supplied past: (x, y, vx, vy)
        i = int(s/dt)
        if i >= len(hx)-1: i = len(hx)-2
        th = s/dt - i
        h00=(1+2*th)*(1-th)**2; h10=th*(1-th)**2; h01=th*th*(3-2*th); h11=th*th*(th-1)
        x = h00*hx[i]+h10*dt*hvx[i]+h01*hx[i+1]+h11*dt*hvx[i+1]
        y = h00*hy[i]+h10*dt*hvy[i]+h01*hy[i+1]+h11*dt*hvy[i+1]
        vx= h00*hvx[i]+h10*dt*hax[i]+h01*hvx[i+1]+h11*dt*hax[i+1]
        vy= h00*hvy[i]+h10*dt*hay[i]+h01*hvy[i+1]+h11*dt*hay[i+1]
        return x,y,vx,vy
    sg=[-2.0*math.hypot(*X0)]
    def acc(T,x,y):
        s=sg[0]
        for _ in range(60):                     # Newton on f(s) = T - s - |X + X(s)|
            px,py,pvx,pvy=hist(s)
            ux=x+px; uy=y+py; d=math.hypot(ux,uy)
            f=T-s-d; fp=-1.0-(ux*pvx+uy*pvy)/d
            s_new=s-f/fp
            if abs(s_new-s) <= 1e-15*max(1.0,abs(T-s)): s=s_new; break
            s=s_new
        px,py,pvx,pvy=hist(s)
        ux=x+px; uy=y+py; tau=T-s
        D=1.0+(ux*pvx+uy*pvy)/tau
        g=K/(tau**3*D); sg[0]=s
        return g*ux,g*uy
    T=0.0; x,y=X0; vx,vy=V0
    ax,ay=acc(T,x,y); hax[0]=ax; hay[0]=ay
    r=math.hypot(x,y); E0=0.5*(vx*vx+vy*vy)+K/(4*r)
    rmin=r; Tmin=0.0; Emax=E0; Emin=E0; vmax=math.hypot(vx,vy); n=0
    while n<max_steps:
        a1x,a1y=ax,ay
        a2x,a2y=acc(T+dt/2,x+dt/2*vx,y+dt/2*vy)
        a3x,a3y=acc(T+dt/2,x+dt/2*vx+dt*dt/4*a1x,y+dt/2*vy+dt*dt/4*a1y)
        a4x,a4y=acc(T+dt,x+dt*vx+dt*dt/2*a2x,y+dt*vy+dt*dt/2*a2y)
        x+=dt*vx+dt*dt/6*(a1x+a2x+a3x); y+=dt*vy+dt*dt/6*(a1y+a2y+a3y)
        vx+=dt/6*(a1x+2*a2x+2*a3x+a4x); vy+=dt/6*(a1y+2*a2y+2*a3y+a4y)
        T+=dt; n+=1
        hx.append(x); hy.append(y); hvx.append(vx); hvy.append(vy); hax.append(0.0); hay.append(0.0)
        ax,ay=acc(T,x,y); hax[-1]=ax; hay[-1]=ay
        r=math.hypot(x,y); sp=math.hypot(vx,vy); E=0.5*sp*sp+K/(4*r)
        if r<rmin: rmin=r; Tmin=T
        Emax=max(Emax,E); Emin=min(Emin,E); vmax=max(vmax,sp)
        if (x*vx+y*vy)>0 and r>=r_stop: break
        if T_stop is not None and T>=T_stop: break
    return dict(T=T,steps=n,E0=E0,E=E,rmin=rmin,Tmin=Tmin,Emax=Emax,Emin=Emin,vmax=vmax,
                r=r,speed=sp,X=(x,y),V=(vx,vy))

def headon(v, N=1600, m=30, K=1.0):
    E0=v*v/2; xmin=K/(4*E0); x0=N*xmin; v0=-math.sqrt(2*(E0-K/(4*x0)))
    past=lambda s:(x0+v0*s,0.0,v0,0.0)          # uniformly incoming past
    res=simulate(K,(x0,0.0),(v0,0.0),past,(xmin/v)/m,x0)
    res['coef']=(res['E']-E0)/E0/v              # compare with 4/3
    res['cubic']=(abs(v0)**3+res['speed']**3)/3/E0/v
    return res
```
