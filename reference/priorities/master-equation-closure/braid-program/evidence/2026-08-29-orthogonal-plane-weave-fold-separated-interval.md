# Fixed-$120^\circ$ Orthogonal-Plane Weave Interval Certificate

**Disposition: every ordinary $\beta_f\in[0.25,12]$ fails the necessary acceleration-balance condition, with fourteen explicit $D_t=0$ fold boxes left unresolved.** A separately authored Python oracle proves the complete phase-zero causal-root inventory by trigonometric lobes and encloses the tangent and plane-normal acceleration sums with directed interval arithmetic. Its $497$ certified ordinary cells cover width $11.749999944$; fourteen fold boxes of half-width $2\times10^{-9}$ cover the remaining width $5.6\times10^{-8}$. No ordinary candidate box survives.

Plainly: away from the declared root folds, at least one sideways acceleration component is definitely nonzero at reception phase $\phi=0$. Since a balanced orbit must agree at every phase, failure at this one phase rejects the entire complete-cycle balance requirement for that speed. The calculation does not invent a value for the canonical acceleration at a fold, so those fourteen tiny parameter boxes remain open.

## Scope and Logical Reduction

The certified target is the already frozen equal-radius, common-frequency, common-circulation, zero-offset A1.2/A2-compatible history with relative binary phases $0$, $2\pi/3$, and $4\pi/3$. The continuum variable $\phi\in[0,2\pi]$ is the common reception phase of this fixed relative-phasing history; the calculation does not vary the three relative phase offsets. It uses $c_f=1$ and the default uncapped canonical Master Equation. The frozen six-worldline evaluator and its prior evidence were not changed and are bound into the protocol by SHA-256.

At $\phi=0$, choose receiver $a1+$ with radial, tangent, and plane-normal basis

$$
\mathbf e_r=(0,1,0),
\qquad
\mathbf e_t=(0,0,1),
\qquad
\mathbf e_n=(1,0,0).
$$

Its prescribed circular acceleration has zero $\mathbf e_t$ and $\mathbf e_n$ components. Therefore complete-phase balance implies the necessary condition

$$
A_t(\beta_f,0)=A_n(\beta_f,0)=0.
$$

The interval certificate rejects an ordinary $\beta_f$ cell when either component excludes zero. Radial acceleration need not be enclosed after a transverse component has already falsified vector balance.

Plainly: this is a one-phase no-balance witness, not a sampled approximation to the whole phase cycle. Requiring balance for all $\phi$ makes one rigorously nonzero component at $\phi=0$ sufficient to reject that $\beta_f$.

## Independent Root and Acceleration Oracle

Set $x=\beta_f\Delta$, where $\Delta$ is the causal delay. The oracle derives four scalar root equations without importing the frozen JavaScript evaluator or the circular-binary helper:

$$
\begin{aligned}
H_s&=2-2\cos x-\frac{x^2}{\beta_f^2},
&H_p&=2+2\cos x-\frac{x^2}{\beta_f^2},\\
H_+&=2+2\sin x-\frac{x^2}{\beta_f^2},
&H_-&=2-2\sin x-\frac{x^2}{\beta_f^2}.
\end{aligned}
$$

The coincident $x=0$ self root is excluded. The other orthogonal binary contributes two fixed roots at $\Delta=\sqrt2$ with $D_t=1$. For $H=C(x)-x^2/\beta_f^2$, a fold obeys

$$
K(x)=xC'(x)-2C(x)=0,
\qquad
\beta_f=\frac{x}{\sqrt{C(x)}}.
$$

Factorization into cotangent or tangent forms proves that every complete post-first trigonometric lobe has exactly one fold and that each first lobe is monotone. Hence every ordinary root sheet is accounted for: one root on an eligible first lobe and two roots above each later lobe minimum. Directed root tubes require opposite uniform signs of $H$ on their boundaries and exclude zero from $H_x$ throughout. The largest absolute point-control root residual is $1.35\times10^{-53}$.

The independently derived transverse sums are

$$
A_t=-\frac{\cos(\sqrt2\beta_f)}{\sqrt2}
+\sum_{s,p}\frac{2\beta_f\sin x}{x^2|H_x|},
$$

$$
A_n=\frac{\sin(\sqrt2\beta_f)}{\sqrt2}
+\sum_{+,-}\frac{-2\beta_f\cos x}{x^2|H_x|}.
$$

Plainly: the roots are not obtained by replaying the original evaluator. The oracle first proves how many roots each trigonometric lobe can contain, then brackets every simple root and encloses its canonical acceleration contribution. The $1/\sqrt2$ terms are the exact projections of the two fixed orthogonal-binary contributions.

At the diagnostic seed $\beta_f=3.070356625390253$, the independent oracle obtains ten roots and

$$
(A_t,A_n)=
(0.2558648703163662,-1.330183210037710).
$$

The frozen evaluator records $(0.2558648703177136,-1.330183210052174)$ with a maximum root-equation residual of about $3\times10^{-12}$. This agreement is independent at the implementation level because the subject was frozen before the Python oracle and analytical reduction were authored.

Plainly: the separate instruments agree within the older evaluator's recorded numerical root error. Both decisively reject the binary seed, while the interval oracle extends the ordinary no-balance result across the declared bounded speed continuum.

## Fold-Separated Result

Each interval below is the listed center plus or minus $2\times10^{-9}$; the high-precision machine record contains the certified fold brackets inside these boxes.

| root kind | fold centers in $\beta_f$ |
| --- | --- |
| coincident-self boundary | $1$ |
| cross-minus | $2.115062141886678$, $5.405013815230986$, $8.581045626875286$, $11.738351213413054$ |
| partner | $2.971693870713802$, $6.202395285573132$, $9.371373186453026$ |
| cross-plus | $3.794439976085764$, $6.997001907674047$, $10.160928187221710$ |
| self | $4.603338848751700$, $7.789705767492725$, $10.949879869826265$ |

The complement consists of fifteen ordinary charts. Adaptive subdivision produced $497$ certified cells and no ordinary survivor. The machine record gives positive lower bounds for both $|H_x|$ and $|D_t|$ on every admitted root tube and separately excludes a root at the terminal $x=24$, $\beta_f=12$ history boundary. Width accounting closes to $2.58\times10^{-110}$:

$$
11.749999944+0.000000056=11.75.
$$

Plainly: the result is not a bounded no-balance theorem at the fourteen folds, because the uncapped simple-root kernel contains $1/|D_t|$ and does not define an ordinary finite contribution at $D_t=0$. Everywhere else in the declared interval, balance is excluded.

## Claim Grade, Falsifiers, and Next Artifact

The phase-zero reduction and lobe uniqueness are derived. Fold locations and ordinary transverse exclusions are interval-certified analytical measurements. The bounded fixed-phasing locus remains unresolved only in the fourteen declared fold boxes. This result establishes neither acceleration balance, retention, stability, binding, nor physical realization. It says nothing about other relative phase offsets, variable-speed or breathing histories, precessing planes, other three-dimensional $3{:}3$ histories, $\beta_f>12$, or any $N>3$ family.

The certificate is falsified by an independently checked ordinary root outside its declared tubes, a directed-rounding recomputation that places zero in both transverse components of a certified cell, a change in either frozen-subject hash, or an admitted canonical fold-event law that supplies finite contributions and closes one of the unresolved boxes.

Plainly: the next mathematical artifact is not a perturbation calculation. It is a canonical fold-event rule or a separately proved limiting exclusion for $D_t=0$, applied to these fourteen boxes. Until that exists, the fixed-$120^\circ$ history is rejected on every ordinary speed in the bounded domain but is not globally closed at its caustics.

## Reproduction

- Protocol: `src/prescribed-path-analysis/protocols/orthogonal-plane-weave-fold-separated-interval-protocol.v1.json`
- Independent oracle: `scripts/prescribed-path-analysis/oracle/orthogonal_plane_weave_interval_oracle.py`
- Targeted tests: `tests/test_orthogonal_plane_weave_interval_oracle.py`
- Machine record: [2026-08-29-orthogonal-plane-weave-fold-separated-interval.v1.json](2026-08-29-orthogonal-plane-weave-fold-separated-interval.v1.json)
- Reproduction: `VIRTUAL_ENV="${AAA_VENV:-../.venv}" "${AAA_VENV:-../.venv}/bin/python" scripts/prescribed-path-analysis/oracle/orthogonal_plane_weave_interval_oracle.py --write-receipt reference/priorities/braid-program/evidence/2026-08-29-orthogonal-plane-weave-fold-separated-interval.v1.json`
