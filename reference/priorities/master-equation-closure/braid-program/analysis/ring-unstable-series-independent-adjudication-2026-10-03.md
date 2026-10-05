# Independent adjudication of the fast T02 ancient series

Date: 2026-10-03. Frozen subject: [T02 ancient departure](ring-unstable-series-evaluation-2026-10-03.md), SHA-256 `541d2cf16ac196b26cdaf17f37414fdf46c28e468227bfc30d51ebc3e89da238`; instrument SHA-256 `e5baaffdeed2ac5817f070273f98a932412a74cf4393b5ee9deb137b16a367f8`; target receipt SHA-256 `28a64e16445c243f115317435976142595dd68f00ccdffd4e7a804d4450b3f06`. Scenario: unchanged Master Equation, $K=c_f=1$, complete positive-delay self reception, common planar symmetry class. Reviewer is separate from the subject author.

## Verdict and boundaries

Accepted, derived conditional: the existing ancient-history theorem can use any real characteristic zero in the certified fast T02 interval, without assuming it is the largest positive real root or proving its simplicity. Its higher harmonics are all nonresonant: separately reconstructed interval matrices exclude zero determinants at $2\lambda,3\lambda,4\lambda$, and the independently rechecked radius-43 confinement excludes every $n\lambda$, $n\ge5$. The inverse coefficient multiplier has the conservative quantitative bounds $B<0.003583$ and $B_2<0.035206$. The signed implicit-delay and nonlinear coefficient recurrences are mathematically correct on the admitted chart.

Accepted, derived infinitesimal direction: with radial normalization $u_{1,r}=R>0$, both the tangential leading coordinate and the first speed derivative are positive throughout the fast-root interval. Positive amplitude initially increases radius and speed; negative amplitude initially decreases them. This is a statement about the analytic branch sufficiently near its ancient limit, not a finite-amplitude event claim.

The degree-eight coefficients and polynomial evaluations remain the subject author's measured point results. This review inspects their recurrence and known-case checks but does not independently recompute the seven nonlinear coefficient solves or supply coefficient intervals. They are not promoted to validated finite-amplitude histories. No quantitative convergence radius, tail remainder, fold, wake-speed event, rung transfer or dispersal is established. No mathematical repair of the frozen subject is required within these boundaries.

Falsifiers: an omitted reference hit, a failed exact balance or characteristic witness, a required harmonic determinant containing zero, a failure of the geometric confinement norms, an analytic source argument escaping the strict delayed disk, or disagreement of a separately expanded nonlinear row with the signed recurrence invalidates the corresponding accepted result. A large polynomial term or negative polynomial delay cannot alone falsify the existence of the true local analytic branch.

## Independent geometry and harmonic checks

The authoritative [T02 characteristic owner](t02-symmetric-characteristic-independent-evaluation.md) supplies the exact balance, complete eight-hit representative ledger, binary intervals for $R,\beta$ and each half-angle, the fast witness, and the radius-43 confinement. Its frozen certificate SHA-256 is `ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6`. These root/balance premises are inherited; this review reconstructs coefficient maps directly from those geometric intervals rather than importing the subject's stored $C,F,H$ matrices.

At a reference row, let $n$ be the Cartesian unit chord, $\ell$ its range/delay, $V$ the emitted source velocity, $A_s$ its acceleration, and $D=1-n\cdot V$. A fixed-emission receiver-minus-source position perturbation $dq$ and source velocity perturbation $dv$ give

$$
\delta S=-n\cdot dq/D,\quad
\delta r=dq-V\delta S,\quad
\delta\ell=n\cdot\delta r,
$$

$$
\delta n=(\delta r-n\delta\ell)/\ell,\quad
\delta V=dv+A_s\delta S,\quad
\delta D=-\delta n\cdot V-n\cdot\delta V,
$$

$$
\delta a=\frac{\sigma}{\ell^2|D|}
\left[\delta n-n\left(2\delta\ell/\ell+\delta D/D\right)\right].
$$

The derivative denominator is signed $D$ even on the negative-$D$ rising row. For a harmonic perturbation at parameter $z$, the delayed source position and velocity have factors $e^{-z\ell}$ and $e^{-z\ell}(zI+\Omega J)$. Substituting them into this causal chain and subtracting all eight rows from the rotating inertial matrix reconstructs $A(z)$ independently. The positive-delay self row uses the same formula and is included.

The separate checker encloses the full fast witness interval, widening the published 75-digit trial endpoints by $10^{-70}$ before interval reuse. Its $\det A(n\lambda)$ intervals are strictly positive for $n=2,3,4$, and its $A_{12}(\lambda)$ interval is strictly negative. These certify invertibility of the three matrices for every possible characteristic root in that interval and permit the stated radial normalization. The subject's displayed determinant intervals remain inherited measured displays; the review's own binary matrix enclosures are retained in `.local-data/ring-exploration/unstable-series-adjudication/target.json`.

## Confinement and inverse bounds independently rechecked

Separating the causal chain into receiver position, delayed source position and delayed source velocity gives $C,F,H$ without reading the subject's coefficient maps. On $\operatorname{Re}z\ge0$, the delayed exponentials have modulus at most one. Thus

$$
\|A(z)-z^2I\|_\infty\le b_1|z|+b_0,
$$

$$
b_1=2|\Omega|+\sum\|H\|_\infty,
\qquad
b_0=\Omega^2+\left\|\sum C\right\|_\infty+\sum\|F\|_\infty.
$$

The instantaneous receiver matrices must be summed before taking their norm to preserve their legitimate cancellations; they do not carry different delay factors. The independent geometric interval calculation gives $b_1<34$ and $b_0<318$. Consequently a right-half-plane determinant zero must obey $|z|^2\le34|z|+318$, and none has $|z|\ge43$, because $43^2-34\cdot43-318=69>0$. This separately checks the confinement constants used in the subject.

Every fast-interval root has $5\lambda>53.29>43$. Hence $A(n\lambda)$ is invertible for all $n\ge5$. For these real harmonics the same norm bound gives the Neumann inverse estimate

$$
\|A(n\lambda)^{-1}\|_\infty
\le\frac1{n^2\lambda^2-34n\lambda-318}.
$$

The denominator is positive at $n=5$ and increases thereafter. Multiplication by $n^2$ rewrites the bound as $(\lambda^2-34\lambda/n-318/n^2)^{-1}$, which decreases with $n$. Thus both tail suprema are bounded at $n=5$. Independently computed adjugate/determinant inverse enclosures handle $n=2,3,4$, with row absolute sums performed outward. Combining the finite and tail bounds verifies

$$
B=\sup_{n\ge2}\|A(n\lambda)^{-1}\|_\infty<0.003583,
\qquad
B_2=\sup_{n\ge2}n^2\|A(n\lambda)^{-1}\|_\infty<0.035206.
$$

These are operator bounds in the infinity coefficient norm. They provide no nonlinear remainder constant and no numerical admissible amplitude. A bounded inverse is necessary but is not the full contraction certificate.

## Signed delay recurrence and source velocity reconstructed

Write $q=q_0e^{\lambda T}$ and $p(q)=\sum_{n\ge1}u_nq^n$. For a delay $d(q)$, the source argument is $q_s=qe^{-\lambda d(q)}$ and its receiver-frame phase is the reference phase minus $\Omega(d-\Delta)$. The separation is the present rotating position minus that emitted rotating position. Holding $q$ fixed and differentiating the separation with respect to delay gives $\partial_dr=V_s$, because increasing delay moves the source backward in absolute time. Therefore

$$
\partial_d(\ell-d)=n\cdot V_s-1=-D_0
$$

at the reference. If $d_n$ is temporarily zero and the degree-$n$ gap coefficient is $F_n$, insertion of $d_nq^n$ changes that coefficient by $-D_0d_n$. The correct update is $d_n=F_n/D_0$, including the negative-$D$ rising row and the self row. The static analytical check $\ell=2+q$ gives gap $2+q-d$, $D_0=1$ and delay $d=2+q$, fixing this sign independently.

The sampled emitted velocity is

$$
V_s=Q(\theta)\left[\Omega J(Re_1+p(q_s))+\lambda\sum_{n\ge1}nu_nq_s^n\right].
$$

It is the derivative with respect to the source's own absolute time. Multiplying by the reception-time factor $1-d'(T)$ would be an incorrect extra playback response; the subject does not do so. Source acceleration enters automatically through shifted velocity evaluation when the row is expanded. The selected acceleration is $\sigma r/(\ell^3\epsilon D)$ with the fixed reference sign $\epsilon=\operatorname{sgn}D_0$, which agrees with the unchanged real law while the chart persists.

The rotating residual is the Euler-derivative inertial term minus the complete nonlinear acceleration. At degree $n$, adding $u_nq^n$ contributes exactly $A(n\lambda)u_n$: its delayed source evaluation starts with $e^{-n\lambda\Delta}u_nq^n$, its velocity has factor $n\lambda$, and its first implicit-delay shift is included by the same causal derivative above. Every other contribution at that degree is determined by earlier coefficients. Hence setting $u_n=0$, calling the remaining residual $E_n$, and solving $A(n\lambda)u_n=-E_n$ is the correct triangular recurrence. This independently reconstructs the subject's mathematical recurrence without replaying its Taylor algebra.

## Why the specified fast branch exists, and what remains missing

The [adjudicated analytic construction](t02-nonlinear-history-independent-adjudication-2026-10-03.md) originally selected the largest positive real root to guarantee nonresonance at every integer multiple. Its actual coefficient-space argument requires only a positive real root, a real null vector, bounded inverse multipliers and strict delayed analytic evaluation. The separately certified harmonic checks above supply those requirements directly for any root in the fast interval. No maximality or simplicity premise is needed. Since $A_{12}$ is nonzero, determinant zero implies rank one, and

$$
u_1=R\bigl(1,-A_{11}(\lambda)/A_{12}(\lambda)\bigr)^{\mathsf T}
$$

is a real nonzero null vector. Rescaling the coefficient-space amplitude handles its normalization relative to the unit vector in the original proof.

The local analytic fixed point consequently exists for sufficiently small $|q_0|$, with the same complete-history chart complement and compatibility requirements. The separate interval calculation also encloses $u_{1,t}>0$ and the leading speed derivative $\Omega u_{1,r}+\lambda u_{1,t}>0$. Radius has first derivative $u_{1,r}=R>0$. This certifies the inward/outward infinitesimal direction for the true local analytic branch.

A displayed nonzero amplitude still requires quantitative constants absent from the subject: a complete-history chart tube including the compact inactive causal complement, an explicit analytic ball for the implicit delay map and its strict disk image, and quadratic/Lipschitz majorants of the nonlinear remainder. Only after those are combined with $B,B_2$ can one certify a polynomial tail and its first two time derivatives. The subject correctly lists these obligations and records `convergenceRadius: not quantitatively enclosed` and `nonlinearFate: not determined`.

The degree-eight coefficient residual is a finite numerical implementation diagnostic based on rounded point premises. Its small size neither bounds the omitted coefficients nor implies that the polynomial satisfies the equation at $q=\pm0.001$ or $\pm0.01$. The negative truncated delays at larger amplitudes describe failure of that polynomial representation; they do not establish an actual causal-root event. This review supplies no later endpoint for E18.

## Controls, provenance and reproduction

The new [independent checker](../../../../../scripts/braid-program/ring_unstable_series_independent_adjudication_20261003.py) imports no subject jet evaluator or characteristic implementation. Before its target it returned the exact static inverse-square Cartesian derivative $\operatorname{diag}(-1/4,1/8)$ at separation 2, for both polarities and both coordinate columns, and the independently known triangular-matrix determinant 8 and inverse infinity norm $5/8$. The known receipt binds the checker source identity before target admission. All signs and norm comparisons in the target use outward interval arithmetic.

The first target attempt exposed a reference field-name mismatch; the second exposed an overly loose review bound that summed norms of individual instantaneous receiver maps. Both were corrected in this new checker, preserving every subject and reference byte, and its analytical controls passed again before the final target. The final target's separate Cartesian geometry reconstructs the confinement, finite harmonic invertibility, inverse bounds and leading direction. These are independent checks of the new theorem ingredients, not replay of the subject target.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_unstable_series_independent_adjudication_20261003.py --stage control
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_unstable_series_independent_adjudication_20261003.py --stage target
```

Receipts live in `.local-data/ring-exploration/unstable-series-adjudication/`. The frozen exact balance, chart completeness and positive-root existence remain inherited at their original grades. The recurrence and specified-mode extension are independently reconstructed here; the finite order-eight coefficient values retain author-measured grade. No equation, score, rank, deferred task, shared queue or corpus claim is edited by this review.

Recommended next action: quantify the three missing analytic/chart bounds before extending the finite polynomial toward any proposed event. Increasing Taylor order alone is useful for a formal shape diagnostic but does not close the lawful-history or later-fate obligation.
