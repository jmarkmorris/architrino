# Explicit slow-speed exclusion for a finite-height coupled family

## Result and scope

Claim grade: derived, pending independent review. This theorem quantifies the remainder in [the slow-motion tangential condition](overnight2-b-slow-motion-conditions.md). Use its complete six-member histories, unchanged canonical $K=c_f=1$, every ordinary partner and positive-delay self root, and arbitrary $R>0$. To avoid confusion with Fourier coefficient names, write the base rates as $b_0=1/4$, $k_0=3/20$, so $\beta=\epsilon b_0$, $\kappa=\epsilon k_0$. Take

$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad
p=c\cos2\phi+d\sin2\phi,\quad
\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi,
$$

$$
|a|,|b|\le3/50,\quad |c|,|d|\le1/10,\quad
|e|,|f|\le1/50,\quad 1/4\le H\le3/10.
$$

For every such coefficient vector and every $0<\epsilon\le1/20000$, the averaged tangential acceleration obeys

$$
\langle\rho A_t\rangle>\frac{97}{50000}\epsilon>0.
$$

Exact balance requires this average to vanish. Consequently no member of this entire family at these speeds, at any positive scale, is an exact canonical history. The theorem excludes a continuous family of nonzero sign-changing spatial paths, not all slow spatial paths and not the faster numerical proposals. It makes no stability or actual-evolution claim.

## Geometry and profile bounds

The radius lies in $[22/25,28/25]$ and $|\zeta|\le17/50$. Height at phase zero is at least $23/100$ and reverses sign at phase $\pi$. The largest simultaneous separation and every causal delay are less than $12/5$, because every dimensionless path lies in the ball of squared radius at most $137/100$ and $2\sqrt{137/100}<12/5$. Present partner separation is at least $m=22/25$.

The base slow-time velocity, meaning physical velocity divided by $\epsilon$, has cylindrical component bounds

$$
k_0|\rho'|\le0.036,\quad
\rho|b_0+k_0p'|\le0.3472,\quad
k_0|\zeta'|\le0.063.
$$

Their squared norm is $0.12581284<(2/5)^2$, so use $B=2/5$. The base second slow-time derivative has component bounds $0.118432$, $0.04248$, and $0.01485$, whose squared norm is less than $(1/4)^2$. Thus the source physical velocity is bounded by $\epsilon B$, and its derivative with respect to dimensionless time $\tau=t/R$ by $\epsilon^2 C$, with $C=1/4$. These are bounds on prescribed trajectories, not equation balance assumptions.

For the wider Taylor interval $0\le\epsilon\le\bar\epsilon=1/100$, all source speeds are at most $q=1/250$. Strict monotonicity of the unsquared causal gap proves exactly one partner root in each channel, no positive self root and divisor at least $1-q$. This covers the complete past. Put $d_*=12/5$. The complete line segment joining a simultaneous separation $Q_0$ to the delayed separation $Q$ has norm at least

$$
m-\bar\epsilon B d_* =0.8704>\ell=87/100.
$$

## Explicit first-order remainder

Let $V_1$ be the source base velocity at reception, $s=|Q_0|$, $n_0=Q_0/s$, and $\delta$ its dimensionless causal delay. Source Taylor expansion with the above second derivative bound gives

$$
|Q-Q_0-\epsilon\delta V_1|\le\tfrac12\epsilon^2C d_*^2,\quad
|\delta-s|\le|Q-Q_0|\le\epsilon B d_*.
$$

Consequently

$$
|Q-Q_0-\epsilon sV_1|\le\epsilon^2 E,\qquad
E=B^2d_*+\tfrac12Cd_*^2.
$$

Define $G(Q)=Q/|Q|^3$. Direct differentiation gives $\|DG(Q)\|\le2/|Q|^3$ and $\|D^2G(Q)\|\le24/|Q|^4$: the latter follows by bounding the three terms with coefficient three and the term with coefficient fifteen in the bilinear second derivative. Taylor expansion on the separation segment therefore implies

$$
|G(Q)-G(Q_0)-\epsilon DG(Q_0)sV_1|
\le\epsilon^2\left(\frac{2E}{m^3}+\frac{12B^2d_*^2}{\ell^4}\right).
$$

Write $w=\widehat Q\cdot V_s$ and $w_1=n_0\cdot V_1$, so the ordinary divisor is $1-w$. The delayed velocity differs from $\epsilon V_1$ by at most $\epsilon^2Cd_*$. The elementary unit-vector estimate $|\widehat Q-n_0|\le2|Q-Q_0|/s$ yields

$$
|w-\epsilon w_1|\le\epsilon^2J,\quad J=Cd_*+\frac{2B^2d_*}{m},\qquad
\left|\frac{w}{1-w}-\epsilon w_1\right|
\le\epsilon^2\left(J+\frac{B^2}{1-q}\right).
$$

Now decompose the canonical row as $G(Q)/(1-w)=G(Q)+G(Q)w/(1-w)$. The product remainder is bounded using $|G(Q)|\le\ell^{-2}$ and $|G(Q)-G(Q_0)|\le2\epsilon Bd_*/\ell^3$. This gives the explicit row estimate

$$
\left|\frac{Q}{\delta^3D}-\frac{Q_0}{s^3}
-\frac{\epsilon}{s^2}\{V_1-2n_0(n_0\cdot V_1)\}\right|
\le\epsilon^2 K_*,
$$

$$
K_*=\frac{2E}{m^3}+\frac{12B^2d_*^2}{\ell^4}
+\frac{2B^2d_*}{\ell^3}
+\frac{J+B^2/(1-q)}{\ell^2}<27.
$$

Only two derivatives of the trajectories are used. In particular, no second epsilon derivative of the delayed velocity or of the full divisor is assumed. This explicit decomposition also supplies a direct proof of the unquantified $C^2$ remainder in the earlier subject.

## Positive leading mean and contradiction

Throughout the coefficient box, $|\zeta/\rho|\le17/44<2/5$. The even function

$$
C_0(h)=\frac{2-4h^2}{(1+4h^2)^2}-\frac23+\frac{1}{4(1+h^2)}
$$

decreases on $0\le h\le2/5$, because

$$
C_0'(h)=-\frac{8h(5-4h^2)}{(1+4h^2)^3}
-\frac{h}{2(1+h^2)^2}<0\quad(h>0).
$$

Exact rational arithmetic gives $C_0(2/5)>1/20$. Also $b_0+k_0p'\ge19/100$. The independently derived partner sum in the earlier subject therefore has leading average $M\ge19/2000$. There are five partner rows, each polarity of magnitude one, and $\rho\le28/25$. Their full averaged remainder has absolute value less than

$$
5\frac{28}{25}\,27\,\epsilon^2=\frac{756}{5}\epsilon^2.
$$

For $0<\epsilon\le1/20000$,

$$
\langle\rho A_t\rangle
>\epsilon\left(\frac{19}{2000}-\frac{756}{100000}\right)
=\frac{97}{50000}\epsilon.
$$

This contradicts the exact geometric period identity $\langle\rho A_t\rangle=0$ for every $R>0$. The configuration can be relatively periodic or genuinely periodic; with these selected rational base rates it closes after three deformation cycles.

## Verification and falsifiers

This is a new subject and has not yet been independently adjudicated. The accompanying exact-arithmetic calculation must pass known controls before checking its bounds. It does not replace the analytical derivation or independent review. A violated trajectory bound, root outside the complete chart, incorrect row remainder, wrong paired tangential coefficient, or an exact member inside the stated coefficient/speed box overturns the corresponding result. Larger $\epsilon$, other coefficients, other waveforms and the unique zero of the pure-sinusoidal leading mean remain outside this exclusion. Original prior subjects, references and numerical receipts remain unchanged.


### Known-first arithmetic record

The first known-case run failed before any target evaluation because its handwritten expected remainder was incorrect. At the known input $m=\ell=2$, $B=d_*=1$, $C=q=0$, the four terms are $1/4+3/4+1/4+1/2=7/4$, not the originally typed $25/8$. The failed instrument is preserved under `.local-data/master-equation-closure/overnight2-b/explicit-slow/failed-known-instrument.py`. Only the expected known value and its receipt label were corrected; the remainder function and target were unchanged. The corrected shared-venv command `overnight2-b-explicit-slow-exclusion.py --stage known --output .local-data/master-equation-closure/overnight2-b/explicit-slow/known.json` then exited zero and checked $C_0(0)=19/12$, $C_0(1/2)=-13/60$ and that $7/4$ remainder. This pass was recorded before target use. The subject instrument is now frozen at SHA-256 `33982d3c779b8548c613b687d938f8107413e90ec332f0bf71aa540a1a8d47a5`.

The subsequent target command exited zero in 0.000224 internal seconds. It verified the exact row constant $109146379206625/4219314511302<27$, the coefficient value $31883/584988>1/20$, and all displayed rational trajectory and final-margin bounds. Known and target receipt SHA-256 values are respectively `7d884c9be3ff3743f3e6fbcd0dcecf423f2a603c2a09e24782bfff56371dd6cb` and `3b02c6ba52d9f3fa8ddf444a90f72dd9b23ca75b7b500d99374a22a44a02affd`. Both originals remain under the explicit-slow evidence directory. This is an arithmetic verification of the subject's inequalities, not independent validation of the proof. The command was synchronous, used the shared venv and standard library, and left no background calculation. No practical replay or remote-backup claim is made. Scoped `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for this document.
