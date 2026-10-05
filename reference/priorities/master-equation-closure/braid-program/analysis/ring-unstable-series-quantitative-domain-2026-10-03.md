# A quantitative local domain for the T02 ancient series

## Result and scope

The specified fast-mode ancient T02 branch has a conservative explicit series domain $|q|\leq10^{-13}$, with $K=c_f=1$ and radial leading coefficient $R$. Its complete past remains within $10^{-9}$ of the exact circular position, velocity and acceleration, and it retains exactly the eight ordinary causal hits per receiver, including the positive-delay self hit. At $|q|\leq5\times10^{-14}$ the physical position error of the exact degree-eight Taylor polynomial is less than $6.37\times10^{-17}$, its velocity error less than $9.06\times10^{-16}$ and its acceleration error less than $8.04\times10^{-14}$. **Grade: derived quantitative local existence and remainder bounds conditional on the inherited exact-ring and characteristic certificates, supported by new outward interval bounds; pending separate adjudication.** This is an explicit small-domain result. It supplies no event-level continuation or later fate.

The degree-eight polynomial in this statement means the polynomial of the exact coefficients determined by the recurrence. The previously printed point coefficients have no interval enclosures and remain measured values. A remainder for the exact polynomial does not certify their rounding error. In particular, the earlier evaluations at $|q|=0.001$ and $0.01$ remain outside this certified domain by factors of $10^{10}$ and $10^{11}$. This result does not validate those extrapolations.

The equation is the unchanged Master Equation, with every ordinary positive-delay self root included and no cap, multiplier, exclusion or event rule. This report treats the common planar radius and phase class. It extends the [specified-mode series construction](ring-unstable-series-evaluation-2026-10-03.md), whose nonresonance and inverse estimates received a [separate analytical adjudication](ring-unstable-series-independent-adjudication-2026-10-03.md). The earlier [admissible nonlinear-history proof](t02-admissible-nonlinear-history-connection.md) and [its adjudication](t02-nonlinear-history-independent-adjudication-2026-10-03.md) remain the owners of local nonlinear instability. Those subjects and their instruments are frozen.

## 1. Premises and coefficient norm

Take an exact T02 reference in the inherited interval enclosures, a real characteristic zero $\lambda$ in its fast bracket, and the real null vector

$$
\mathbf a=R\left(1,-A_{11}(\lambda)/A_{12}(\lambda)\right)^{\mathsf T}.
$$

The frozen certificate and specified-mode extension provide

$$
\begin{gathered}
0.975<R<1,\quad 1.826<\beta<2,\quad \Omega<2,\quad 10<\lambda<11,\\
\Delta_j>\ell_*=0.3608,\qquad |D_j|>D_*=0.1955,\qquad \|\mathbf a\|_\infty<1,\\
\sup_{n\geq2}\|A(n\lambda)^{-1}\|_\infty<B=0.0036,\qquad
\sup_{n\geq2}n^2\|A(n\lambda)^{-1}\|_\infty<B_2=0.036.
\end{gathered}
$$

The last two caps are rounded upward from the independently adjudicated bounds $0.003582870805$ and $0.035205414718$. They combine the three nonzero interval determinants at harmonics two through four and the inherited radius-43 confinement for all higher harmonics. This report does not select a largest root, count the full spectrum or require simplicity. The new instrument reconstructs the leading vector on a conservatively enlarged fast-root bracket; its tangential component is enclosed inside $[0.23313741081562079764,0.23313741081562079767]$.

Use the complex coefficient algebra

$$
\mathcal W_+=\left\{\mathbf p(w)=\sum_{n\geq1}\mathbf p_nw^n:\ \|\mathbf p\|=\sum_{n\geq1}\|\mathbf p_n\|_\infty<\infty\right\}.
$$

Scalar series include constants when multiplication, square roots and reciprocals require them. Scalar convolution is submultiplicative. A real planar rotation has induced infinity norm at most $\sqrt2$; multiplication by a rotation with a series-valued angle increment $\theta$ has norm at most $e^{\|\theta\|}$ because the matrix generator $J$ has induced infinity norm one. These norm choices and constants enter every estimate below.

The physical path has the form

$$
\mathbf X_i(T)=Q(\Omega T+\alpha_i)\left[R\mathbf e_1+\mathbf p(e^{\lambda T})\right],\qquad T\leq0.
$$

Construct its leading term as $\mathbf p(w)=\varepsilon w\mathbf a+\mathbf v(w)$, where $\mathbf v$ starts at order two. The dimensionless variable used by the earlier coefficient recurrence is $q=\varepsilon w$. Choosing either sign of the leading term supplies the two real local directions. No external input or arbitrary present-time kick is imposed.

## 2. Explicit analytic delay ball

The following estimates define an analytic extension of the eight selected reference rows. The larger complex ball is an auxiliary domain for the proof; complete physical root coverage is established separately for the resulting real history in Section 4. It is not asserted for every point of that auxiliary ball.

Choose

$$
\eta=10^{-5},\qquad s=10^{-3},\qquad \rho=0.03,
$$

and suppose $\|\mathbf p\|\leq\eta$ and $\|\delta\|\leq s$, where the row delay is $d=\Delta+\delta$. Its delayed series argument is $\varphi=w e^{-\lambda d}$. The scalar-algebra estimate gives

$$
\|\varphi\|\leq e^{-10\ell_*+11s}<0.027406<\rho<\tfrac12.
$$

Therefore $\|\mathbf p(\varphi)\|\leq\eta\rho$ and $\|\mathcal E\mathbf p(\varphi)\|\leq\eta\rho$, where $\mathcal E\mathbf p(w)=w\mathbf p'(w)$ denotes coefficientwise Euler differentiation before evaluation. The second estimate follows from $\sup_{n\geq1}n\rho^n\leq\rho$ for $\rho\leq1/2$. The source velocity uses this evaluated Euler series, not the derivative of the composed series with respect to the receiver's $w$.

Let $r=e^{2s}$ and define upper bounds

$$
\begin{aligned}
E&=\eta+\sqrt2r\eta\rho+\sqrt2(r-1),\\
t&=\frac{2\sqrt2E}{\ell_*}+\frac{2E^2}{\ell_*^2},\\
U&=\frac{E}{\ell_*\sqrt{1-t}}+(1-t)^{-1/2}-1,\\
V&=2\sqrt2(r-1)+13\sqrt2r\eta\rho,\\
d_D&=2\sqrt2U+\sqrt2V+2UV.
\end{aligned}
$$

Here $E$ bounds the infinity norm of the separation change, $t$ bounds the relative change of its bilinear square, $U$ bounds the unit-vector change, $V$ bounds the source-velocity change, and $d_D$ bounds the transmitter-factor change. The coefficient-algebra square root follows the positive reference branch. In detail, $|\mathbf r_0\cdot\delta\mathbf r|\leq\sqrt2\ell_0E$ and $|\delta\mathbf r\cdot\delta\mathbf r|\leq2E^2$ justify $t$. The binomial series bounds both $(1+t)^{-1/2}$ and its difference from one. The dot-product estimates then give the displayed $d_D$ for $D=1-\mathbf n\cdot\mathbf V_s$. No Hermitian norm or absolute value is substituted inside the analytic square root.

To solve the implicit range equation, use the preconditioned map

$$
\mathcal T_{\mathbf p}(\delta)=\delta+\frac{\ell(\mathbf p,\Delta+\delta)-(\Delta+\delta)}{D_0}.
$$

Differentiating the separation with respect to its delay gives the full delayed source velocity, hence $\partial_d(\ell-d)=-D$. Consequently $\mathcal T_{\mathbf p}'=1-D/D_0$ and its Lipschitz constant is at most $\kappa=d_D/D_*$. This calculation retains the negative-$D_0$ rising row and the positive-delay self row.

At $\delta=0$, take $E_0=(1+\sqrt2\rho)\eta$ and $t_0=2\sqrt2E_0/\ell_*+2E_0^2/\ell_*^2$. Since every reference range is at most two, the initial map norm is bounded by

$$
g_0=\frac{2[1-\sqrt{1-t_0}]}{D_*}.
$$

Outward interval arithmetic supplies the conservative upper bounds below. **Grade: measured interval inequalities**, from [ring_unstable_quantitative_domain_20261003.py](../../../../../scripts/braid-program/ring_unstable_quantitative_domain_20261003.py), target receipt `.local-data/ring-exploration/unstable-domain/target.json`.

| Quantity | Rounded upper bound |
| --- | ---: |
| $E$ | 0.002842 |
| $t$ | 0.022401 |
| $U$ | 0.019359 |
| $V$ | 0.005669 |
| $d_D$ | 0.062988 |
| $\kappa$ | 0.322190 |
| $g_0$ | 0.000419 |
| $g_0+\kappa s$ | 0.000741 |

Thus $\kappa<1$ and $g_0+\kappa s<s$. Uniform iteration on the delay ball produces a unique analytic delay map for each row, with $\|\delta\|<s$. Iteration starts with zero and its uniform contraction preserves holomorphic dependence on $\mathbf p$. Its constant series coefficient remains zero because the exact reference gap is zero. Since $t<1$ and $d_D<D_*$, the analytic range and transmitter factor never vanish. The continuation of the absolute denominator is the fixed signed reciprocal $[\operatorname{sgn}(D_0)D]^{-1}$; on real histories it equals $|D|^{-1}$.

## 3. Nonlinear map and closed contraction inequalities

The infinity norm of the selected-row acceleration map $\mathcal B(\mathbf p)$ is bounded throughout the preceding analytic ball by

$$
\|\mathcal B(\mathbf p)\|\leq
\frac{8(\ell_*+E)}{\ell_*^3(1-t)^{3/2}(D_*-d_D)}<483.580<M=1000.
$$

Each row has numerator norm at most its reference range plus $E$. The function $(\ell+E)/\ell^3$ decreases with positive $\ell$, justifying use of the minimum range in the sum. All eight rows, with their actual polarities and both signs of $D_0$, are included. Dropping their signs makes this an upper bound; it is not a balance approximation.

For any center $\|\mathbf p\|\leq\eta/4$ and unit coefficient-space directions $h,k$, the two-variable Cauchy circles of radii $\eta/4$ lie inside the analytic ball. Cauchy's coefficient bound yields

$$
\|D^2\mathcal B(\mathbf p)[h,k]\|\leq\frac{16M}{\eta^2}=C=1.6\times10^{14}.
$$

This applies to the Banach-valued function by scalar dual evaluation. With $\mathcal N(\mathbf p)=\mathcal B(\mathbf p)-\mathcal B(0)-D\mathcal B(0)\mathbf p$, integration along line segments gives the conservative estimates

$$
\begin{aligned}
\|\mathcal N(\mathbf p)\|&\leq C\|\mathbf p\|^2,\\
\|\mathcal N(\mathbf p)-\mathcal N(\widetilde{\mathbf p})\|
&\leq C(\|\mathbf p\|+\|\widetilde{\mathbf p}\|)\|\mathbf p-\widetilde{\mathbf p}\|.
\end{aligned}
$$

Because $\mathbf p$ has zero constant coefficient, $\mathcal N$ starts at series order two. The frozen first variation is exactly $D\mathcal B(0)$, so the order-$n$ linear equation is $A(n\lambda)\mathbf p_n$. Write $\mathcal R$ for coefficientwise multiplication by the inverse matrix at $n\geq2$. The nonlinear equation reduces to $\mathbf v=\mathcal R\mathcal N(\varepsilon w\mathbf a+\mathbf v)$.

Choose $\varepsilon=10^{-13}$. The explicit bounds become

$$
\begin{gathered}
4BC\varepsilon=0.2304<1,\\
\|\mathbf v\|\leq V_0=4BC\varepsilon^2=2.304\times10^{-14},\\
\|\mathbf p\|\leq\varepsilon+V_0=1.2304\times10^{-13}<\eta/4,\\
\sum_{n\geq2}n^2\|\mathbf v_n\|_\infty\leq V_2=4B_2C\varepsilon^2=2.304\times10^{-13}.
\end{gathered}
$$

The ball of radius $V_0$ is invariant because $\|\mathbf p\|<2\varepsilon$; its Lipschitz constant is at most $4BC\varepsilon$. Hence the fixed point exists. The weighted estimate follows by applying the weighted inverse bound to the same nonlinear right side. It proves convergence of the first two Euler derivatives on the closed unit disk, including its real endpoints. Since the coefficient recurrence is triangular and each required harmonic matrix is invertible, the two scaled constructions give the same exact coefficient sequence in $q=\varepsilon w$ with either real sign. **Grade: derived conditional quantitative existence.**

## 4. Complete real-history chart

The construction above must be shown to solve the complete canonical equation, rather than only eight selected analytic rows. Let $b=10^{-9}$. The coefficient bounds give

$$
\begin{aligned}
P_0&=\varepsilon+V_0,\\
P_1&=\varepsilon+V_2/2,\\
P_2&=\varepsilon+V_2.
\end{aligned}
$$

The factor one half in $P_1$ uses $n\leq n^2/2$ at $n\geq2$. Real rotations preserve Euclidean norm, bounded by $\sqrt2$ times the coefficient infinity norm. Therefore the physical position, velocity and acceleration deviations, uniformly throughout $T\leq0$, are bounded respectively by

$$
\begin{aligned}
\sqrt2P_0&<1.75\times10^{-13},\\
\sqrt2(11P_1+2P_0)&<3.70\times10^{-12},\\
\sqrt2(121P_2+44P_1+4P_0)&<7.07\times10^{-11}.
\end{aligned}
$$

All are below $b$. These are uniform complete-past bounds, rather than present-state closeness.

For each source index $j$ relative to receiver zero, the exact reference squared causal gap and delay derivative are

$$
\begin{aligned}
H_j(d)&=2R^2[1-\cos(j\pi/3-\Omega d)]-d^2,\\
H_j'(d)&=-2R^2\Omega\sin(j\pi/3-\Omega d)-2d.
\end{aligned}
$$

The new outward chart computation encloses each inherited active delay between its binary lower bound minus $0.001$ and its binary upper bound plus $0.001$. For each of the eight brackets it certifies opposite endpoint signs with $|H_j|>10^{-6}$, and a single derivative sign with $|H_j'|>0.05$ throughout the bracket. The remaining compact subset of $[0.1,3]$ is covered by 188 interval boxes with $|H_j|>10^{-6}$. Coverage endpoints and adjacent overlaps are checked, and no sampled sign is substituted for a box enclosure.

For a physical perturbation bounded by $b$ in position and velocity, the reference chord is shorter than two and reference source speed less than two. Thus

$$
|\delta H_j|\leq8b+4b^2<10^{-6},\qquad
|\delta H_j'|\leq12b+4b^2<0.05.
$$

These preserve every inactive sign, active endpoint sign and active monotonicity. Each protected bracket therefore contains exactly one ordinary real root. The analytic delay branch has $\|\delta\|<0.001$ and belongs to that bracket, so it is that root.

For recent self delays $0<d\leq0.1$, projection onto the reference reception tangent gives the same chord exclusion as the admitted nonlinear proof, now with explicit caps:

$$
\frac{\|\mathbf X_i(T)-\mathbf X_i(T-d)\|}{d}-1
\geq1.826\left(1-\frac{(2\times0.1)^2}{6}\right)-b-1>0.8138.
$$

This excludes positive-delay diagonal hits even arbitrarily near zero while keeping the separate ordinary self hit in its protected bracket. For recent partners,

$$
\|\mathbf X_i(T)-\mathbf X_j(T-d)\|-d
\geq0.975-2b-(3+b)0.1>0.6749.
$$

All positions stay within radius $R+b<1+b$. Every possible causal root therefore has delay at most $2(1+b)=2.000000002<3$. This excludes every older emission from the complete past without a finite-memory rule. The middle, recent and remote arguments cover all positive delays.

There are consequently exactly eight ordinary hits per receiver and 48 directed hits in total, including the six positive-delay self contributions. Their ranges remain positive, and their transmitter factors retain the reference signs. The selected analytic sum is now exactly the canonical complete acceleration. The constructed history solves the baseline equation throughout its own past and satisfies endpoint compatibility automatically. **Grade: derived complete-root conclusion supported by measured outward chart inequalities.**

## 5. Honest degree-eight tails and remaining reach

Let $P_8(q)=\sum_{n=1}^8\mathbf u_nq^n$ be the exact Taylor polynomial, with $\mathbf p(w)=\sum\mathbf u_n\varepsilon^nw^n$. At $|q|\leq\theta\varepsilon$, $0\leq\theta<1$, the weighted coefficient bounds give

$$
\begin{aligned}
\|\mathbf p-P_8\|_\infty&\leq\theta^9V_0,\\
\|\mathcal E(\mathbf p-P_8)\|_\infty&\leq\theta^9V_2/9,\\
\|\mathcal E^2(\mathbf p-P_8)\|_\infty&\leq\theta^9V_2.
\end{aligned}
$$

The middle inequality uses $n\leq n^2/9$ for omitted orders $n\geq9$. After applying the physical rotation and time derivatives, the conservatively rounded bounds are:

| $\theta$ | Domain $|q|$ | Position error | Velocity error | Acceleration error |
| ---: | ---: | ---: | ---: | ---: |
| 0.5 | $5\times10^{-14}$ | $6.37\times10^{-17}$ | $9.06\times10^{-16}$ | $8.04\times10^{-14}$ |
| 0.1 | $10^{-14}$ | $3.26\times10^{-23}$ | $4.64\times10^{-22}$ | $4.12\times10^{-20}$ |
| 0.01 | $10^{-15}$ | $3.26\times10^{-32}$ | $4.64\times10^{-31}$ | $4.12\times10^{-29}$ |
| 0.001 | $10^{-16}$ | $3.26\times10^{-41}$ | $4.64\times10^{-40}$ | $4.12\times10^{-38}$ |

The errors concern exact coefficients, and any use of measured printed coefficients must add their independently enclosed coefficient error. That missing rounding enclosure is separate from the convergence theorem. The unweighted estimate also bounds the entire nonlinear correction by $\theta^2V_0$ at these amplitudes, so the branch's leading radial direction survives on both signs; the domain is still too small to examine any subsequent ring, fold, wake-speed event or dispersal.

This closes the three numerical majorant obligations left open by the earlier finite-series report for one conservative tiny amplitude: a complete root tube, an analytic implicit-delay ball and a nonlinear contraction with derivative and Taylor-tail bounds. It does not claim an optimal convergence radius. Larger domains require sharper nonlinear and implicit-delay bounds, a validated series with interval coefficients or a validated continuation between overlapping regular charts. The present argument cannot be used to select a later outcome.

## 6. Controls, falsifiers and reproduction

Before the target, the new instrument passed an independently known stationary-source case with range two: $H(d)=4-d^2$ has its unique ordinary root at two, $D=1$, positive gap on $[0.1,1.999]$ and negative gap on $[2.001,3]$. The interval-cover routine certified those entire complements first. The stationary displaced-receiver analytic response $(2-p)^{-2}$ has absolute coefficient sum $\tfrac14(1-\eta/2)^{-2}=(2-\eta)^{-2}$, independently obtained from its binomial coefficients; the outward kernel bound agrees. Its preconditioned implicit delay equation is exactly $\delta=p$, with zero delay-map derivative. These controls are analytical references for the bound mechanisms. They are not independent ring adjudication. The target refuses to run without a passed control receipt bound to the current instrument digest.

The frozen characteristic certificate is `.local-data/bp-011-t02-characteristic/certificate.json`, SHA-256 `ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6`. Its authoritative binary intervals supply all reference values. New receipts store authoritative binary enclosures as well as decimal displays. The target receipt has SHA-256 `5d6cb221aa81d24cce7e4e2e2f3926a64a032fd35f193e50e142eb8558721f92`; the known receipt has SHA-256 `1ee85688a9c307a55a1e035d85e984c3e6e388f26f18092da6dad00ec6f5f6d9`.

Run the known controls before the target with the shared venv:

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_unstable_quantitative_domain_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_unstable_quantitative_domain_20261003.py --stage target
```

The falsifiers are explicit. A failed inherited exact balance, missing root or invalid characteristic enclosure defeats the premises. A separately derived analytic bound larger than one of the stated caps can invalidate its contraction step. A zero or reversed sign in any authoritative complement box or protected endpoint, or failure of a protected derivative enclosure, defeats complete coverage. Failure of a harmonic inverse cap defeats the coefficient contraction. A correctly normalized exact coefficient sequence whose weighted sum exceeds the stated bounds would contradict the construction and must be investigated at those bounds, rather than dismissed as rounding. Look first at the target receipt's binary fields, then the equations in Sections 2 through 4.

Scoped syntax/provenance checking uses `.tmp/ring-unstable-domain/validate.mjs`, with its known fenced-code, mathematical-link and malformed-TeX controls before the document target. It checks KaTeX spans, local links, whitespace and current control/target instrument digests. Those checks are measured file validation, not mathematical independence. This new derivation needs a separately constructed adjudication before being called independently checked. No existing subject, oracle, shared queue, index, manuscript, work log, rank, score, qualification, scenario or solver was edited.
