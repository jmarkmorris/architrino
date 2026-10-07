# Independent slow-limit height-confinement review

## Scope and known-first record

This review adjudicates the frozen [height-confinement subject](overnight2-b-limit-height-confinement.md) from the [independently reconstructed normalized limiting equation](overnight2-b-independent-coupled-period.md#finite-positive-scale-limiting-equation-and-its-normalization), with $K=c_f=1$. It addresses regular periodic radial/axial solutions with positive radius and the consequence for appropriately convergent finite-positive-scale slow families. It does not import a physical energy premise or assert a result for arbitrary finite-speed delayed paths. The subject identity by native `shasum -a 256` is `f04fb97d5c16b2d17b694e12b52a4f790ddd304fb08fd0a7bda382aaec236337`.

Before target arithmetic, the [separately authored exact rational companion](overnight2-b-independent-height-confinement.py) passed its known stage under the executable shared venv at 2026-10-07 04:27:27 UTC, with one numerical thread. Controls established $(7/5)^2<2<(3/2)^2$, $2^2=4$ and $1/3-1/2=-1/6$. The command exited zero in 0.000100 internal seconds. The instrument imports no subject or earlier oracle; its identity is `3874ec5b70f8964bb90fb4101dedda21756b423fb720a48c0c1f20a53a2c5c3e`. Its original known receipt is retained under `.local-data/master-equation-closure/overnight2-b/independent-height-confinement/known.json`. This known pass is recorded before target use.

## Verdict and derivative reconstruction

**Derived and independently accepted.** Every regular $C^2$ periodic radial/axial orbit of the stated normalized limiting equation, with $r>0$ and fixed real $\ell$, has a strictly negative value of the displayed mathematical first integral. It obeys the strict height-ratio bound, the orbit-specific radius bounds and the necessary turning-preparation inequality. No correction to the frozen subject is needed. These conclusions are necessary restrictions; none establishes periodic-orbit existence or canonical finite-delay balance.

Let dots denote the normalized time derivative. Differentiating the primitive directly, with $a=r^2+4z^2$ and $b=r^2+z^2$, gives
$$
U_r=-\frac1{\sqrt3r^2}+\frac r{a^{3/2}}+\frac r{4b^{3/2}},\qquad
U_z=\frac{4z}{a^{3/2}}+\frac z{4b^{3/2}}.
$$
The negative gradient therefore equals the previously reconstructed sum of all five simultaneous partner contributions: the same-polarity pair contributes $1/(\sqrt3r^2)$ radially, the neighboring opposite-polarity pair contributes $(-r,-4z)/a^{3/2}$, and the diametric partner contributes $(-r,-z)/(4b^{3/2})$. This checks both signs and the axial factors independently of a conservation-law interpretation.

With the limiting equations $\ddot r=\ell^2/r^3-U_r$ and $\ddot z=-U_z$, define
$$
K_{\rm q}=\frac12(\dot r^2+\dot z^2+\ell^2/r^2),\qquad \mathcal I=K_{\rm q}+U.
$$
Since $\ell$ is constant,
$$
\dot{\mathcal I}=\dot r\ddot r+\dot z\ddot z-\frac{\ell^2\dot r}{r^3}+U_r\dot r+U_z\dot z=0.
$$
The negative sign from differentiating $\ell^2/(2r^2)$ cancels the radial centrifugal contribution exactly. This first integral is derived from the limiting equation alone.

The explicit derivatives also yield
$$
rU_r+zU_z=-\frac1{\sqrt3r}+\frac{r^2+4z^2}{a^{3/2}}+\frac{r^2+z^2}{4b^{3/2}}=-U.
$$
Therefore, for $J=(r^2+z^2)/2$,
$$
\ddot J=\dot r^2+\dot z^2+r\ddot r+z\ddot z
=\dot r^2+\dot z^2+\ell^2/r^2-rU_r-zU_z=2K_{\rm q}+U.
$$
For any positive full radial/axial period $T$, $\dot J(T)=\dot J(0)$, so $2\langle K_{\rm q}\rangle+\langle U\rangle=0$. Constancy of $\mathcal I$ gives
$$
\mathcal I=-\langle K_{\rm q}\rangle\le0.
$$
Strictness requires an argument beyond averaging. If the average of the continuous nonnegative $K_{\rm q}$ vanished, then $\ell=0$ and both velocities would vanish identically. The axial equation would then force $z=0$, since the coefficient multiplying $z$ in $U_z$ is strictly positive for $r>0$. At $z=0$, the radial acceleration is
$$
\ddot r=\frac{1/\sqrt3-5/4}{r^2}=-\frac{c_0}{r^2}<0,
\qquad c_0=\frac54-\frac1{\sqrt3}>0,
$$
contradicting a constant radius. Thus $\mathcal I<0$ for every orbit in scope, including constant radial/axial traces with nonzero rotation. Pointwise,
$$
U=\mathcal I-K_{\rm q}\le\mathcal I<0.
$$
No sign assertion about instantaneous $U$ was assumed to establish negativity of $\mathcal I$.

## Unique zero and exact endpoint validation

For $r>0$, $U=u(h)/r$ where $h=z/r$. The function $u$ is even and continuous, and
$$
u(0)=\frac1{\sqrt3}-\frac54<0,\qquad
\lim_{h\to\infty}u(h)=\frac1{\sqrt3}>0,
$$
$$
u'(h)=\frac{4h}{(1+4h^2)^{3/2}}+\frac{h}{4(1+h^2)^{3/2}}>0\quad(h>0).
$$
The intermediate value theorem and strict monotonicity give one positive zero $h_U$. Consequently $U<0$ is equivalent to $|h|<h_U$. Equality at either endpoint is impossible because it would give $U=0$ while $\mathcal I<0$ and $K_{\rm q}\ge0$.

The independently authored target confirms the following squared differences using exact fractions. Every endpoint is positive, so each sign determines the stated strict root comparison.

| Rational endpoint $q$ | Root argument $y$ | $q^2-y$ |
| --- | --- | --- |
| $433/250$ | $3$ | $-11/62500$ |
| $1733/1000$ | $3$ | $3289/1000000$ |
| $2417/1000$ | $146/25$ | $1889/1000000$ |
| $1487/1000$ | $221/100$ | $1169/1000000$ |
| $1231/500$ | $97/16$ | $-33/31250$ |
| $301/200$ | $145/64$ | $-3/5000$ |

At $h=11/10$, upper bounds on the two subtracted square roots give upper bounds on the negative reciprocal terms, while the lower bound on $\sqrt3$ gives an upper bound on its positive reciprocal. Thus
$$
u(11/10)<\frac{1000}{1732}-\frac{1000}{2417}-\frac{250}{1487}
=-\frac{6991500}{1556236207}<0.
$$
At $h=9/8$, all these comparison directions reverse:
$$
u(9/8)>\frac{1000}{1733}-\frac{1000}{2462}-\frac{250}{1505}
=\frac{3048350}{642130223}>0.
$$
These rational signs establish $11/10<h_U<9/8$ without any numerical root search. The companion checks endpoint arithmetic, while the analytical monotonicity proof supplies uniqueness and the continuous confinement statement. Neither claim is based on sampled orbit data.

## Radius and preparation consequences

Evenness and monotonicity imply $u(h)\ge u(0)=-c_0$. For $E=-\mathcal I>0$,
$$
-E=K_{\rm q}+U\ge-\frac{c_0}{r}.
$$
Multiplying by positive $r$ yields $Er\le c_0$, so
$$
r\le\frac{c_0}{|\mathcal I|}.
$$
Keeping the angular square gives
$$
-E\ge\frac{\ell^2}{2r^2}-\frac{c_0}{r}.
$$
The right-hand side is strictly negative because it is at most $-E<0$. Hence $\ell^2/2-c_0r<0$ and
$$
r>\frac{\ell^2}{2c_0}\quad(\ell\ne0).
$$
The subject's weak upper bound and strict lower bound are valid. These are orbit-specific bounds; they are not uniform as $\mathcal I\to0^-$ or $\ell\to0$. Each individual regular periodic orbit already has a positive radius minimum by continuity and compactness, but that observation does not supply a common radius floor for a family.

For the selected initial data $(r,z,\dot r,\dot z)=(1,H,0,0)$, direct evaluation gives $\mathcal I=\ell^2/2+u(H)$. Periodicity therefore requires
$$
\frac{\ell^2}{2}+u(H)<0.
$$
This is strictly stronger than $|H|<h_U$ when $\ell\ne0$, and is not sufficient for a periodic orbit. In particular, $H=5/4>9/8>h_U$ gives $u(H)>0$ and violates the condition for every real $\ell$. The exclusion of a periodic limiting orbit through $(r,z)=(1,5/4)$ actually follows from the pointwise height-ratio bound regardless of its initial radial/axial velocities. No numerical shot needs to be accepted to draw that conditional conclusion.

## Scope, falsifiers and preservation

Regularity here means a $C^2$ solution with positive radius throughout a positive full radial/axial period. The right-hand side is smooth on $r>0$. Radius, height and their derivatives are periodic; the azimuth itself may advance, so relative periodicity is sufficient. The normalized equation and its geometric constant $\ell$ must be the ones already reconstructed; a physical conservation law, mass parameter or finite-delay first integral has not been introduced.

The consequence for exact canonical slow families retains the previously stated uniform bounds, ordinary-root coverage, derivative convergence sufficient to pass to the limiting equation, convergent rates and finite positive $R\epsilon^2$ limit. Degenerate scale limits, nonperiodic motions, singular paths and arbitrary finite-speed trajectories remain outside scope. This theorem adds necessary constraints; it does not settle the separate zero-mean conditions, sufficiency, stability or continuation of a limiting orbit.

Operator-checkable falsifiers are a mismatch between $-\nabla U$ and the canonical simultaneous rows, a nonzero derivative of $\mathcal I$ along the stated equation, a missing periodic boundary term, an identically zero $K_{\rm q}$ solution at positive radius, a wrong endpoint square or rational comparison, or a regular periodic solution of the stated equation violating one of the proved inequalities. A finite-speed delayed trajectory outside the limiting hypotheses is not a counterexample. The report contains the explicit derivatives and endpoint fractions needed to check each obligation.

The target followed the recorded known pass and exited zero at 2026-10-07 04:27:40 UTC in 0.000141 internal seconds by `time.perf_counter()`. Both computations used the shared venv with `OPENBLAS_NUM_THREADS=OMP_NUM_THREADS=MKL_NUM_THREADS=1`, ran synchronously and launched no background job. No peak-memory measurement is claimed. The original known and target receipts remain under `.local-data/master-equation-closure/overnight2-b/independent-height-confinement/`; no evidence was removed, relocated or replaced, and no remote-backup or replay claim is made.

Only this new report and its companion were authored. The frozen subject, previous oracles, numerical evidence, parent report and shared owners were left unchanged. No recursive delegation, regular tests, generator or Git mutation was used. Parent integration is the remaining disposition step for this bounded review; broader research is outside this reviewer task.

Final scoped validation: shared-venv built-in `compile` accepted the new companion without writing bytecode. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for either new deliverable; exit one denotes the new-file difference. Native `shasum -a 256` reproduced the frozen subject and independent instrument identities given above. Receipt hashes are `2ec5840cd3d85bd5f22627b4d1c4471e2ea647a3461c12e7cea48b3da067b5c3` for known and `a33a38742df4986f107a5a55a52a2204237189e864288fb812ecf34f3fe92d71` for target. By `wc -lc`, known is 13 lines and 355 bytes, and target is 53 lines and 1,292 bytes. These are local retained evidence and a repository-authored reproducer, not a claim of remote availability.
