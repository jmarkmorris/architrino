# Independent evaluation of the T02 symmetric characteristic function

The T02 common-radius/phase characteristic function has at least two positive real zeros. Outward-rounded interval evaluation gives opposite signs at the endpoints of two disjoint brackets of width $2\times10^{-20}$, centered near $0.8596290682133805113563$ and $10.6584241740493694043085$. This is a computer-assisted existence result for growing formal modes of the symmetric first variation. It establishes neither the total number of growing modes nor full-ring stability, nonlinear escape, retention, or qualification.

## Scenario and normalization

Six paths form a regular hexagon with alternating polarities. In the unchanged acceleration-first Master Equation of $\mathbb{A}\mathbb{A}\mathbb{A}$, every ordinary positive-delay hit contributes $\sigma K n/(\ell^2|D|)$, including same-transmitter hits. Here $\sigma$ is the receiver/source polarity product, $\ell$ is the emission-to-reception separation, $n$ points from the emission site to the receiver, and $D=1-n\cdot v$ uses the source velocity at emission. The wake-speed normalization is $c_f=1$. There is no cap, receiver response multiplier, root exclusion, or event prescription.

Write the reference paths as $X_j(T)=R Q(\Omega T+j\pi/3)e_1$ with $q_j=(-1)^j$, where $Q$ rotates a planar vector, $e_1=(1,0)$, $e_2=(0,1)$, and $J e_1=e_2$. Positive circulation is selected. Set the coupling length $K=R_*=1$, so all quoted times, lengths, and growth rates use this normalization; rescaling $K$ rescales $R$ and time together. Define $\beta=\Omega R$. The perturbation is $Q(\Omega T+j\pi/3)u(T)$, with $u=(a,b)$, radial displacement $a$ and tangential displacement $b=R\varphi$. Thus $\varphi$ is a dimensionless phase angle.

For an exponential perturbation $u(T)=e^{zT}u_0$, the spectral parameter $z$ has inverse-time units. The matrix in displacement coordinates is $A(z)=z^2I+2\Omega zJ-\Omega^2I-L(z)$, where $L$ is the sum of all first-variation hit maps. In radius/phase coordinates the matrix is $M(z)=A(z)\operatorname{diag}(1,R)$. Consequently $\det M(z)=R\det A(z)=zG(z)$; the factor $R$ is retained throughout this evaluation.

Claim grade: derived formal chart variation under the stated simple-root assumptions. Falsifier: a different radius/phase normalization, omitted ordinary hit, or independently differentiated emission row that disagrees with the maps below overturns the corresponding determinant statement. A history-space differentiability theorem is an additional obligation.

## Exact balance and complete root census

For one receiver, every circular causal root is represented by $0<v<\pi$ and an integer level $m$ satisfying

$$
F_\beta(v)=\beta\sin v-v=m\pi/6.
$$

The source index is $j=m\bmod6$. Its rotation into the receiver frame is $B=Q(-2v)$; the delay is $\Delta=\ell=2R\sin v$ and the polarity is $\sigma=(-1)^m$. Since $F_\beta''=-\beta\sin v<0$, each level has at most one rising root and one descending root. In T02, $\pi/6<\max F_\beta<\pi/3$, while $F_\beta(0)=0$ and $F_\beta(\pi)=-\pi$. There is exactly one descending root for each $m=-5,-4,-3,-2,-1,0$, and both roots for $m=1$. The $m=0$ descending root is an ordinary positive-delay self hit; the zero-delay endpoint is excluded. Levels $m\leq-6$ and $m\geq2$ cannot contribute. Sixfold covariance produces 48 ordered hits across the six receivers.

The new instrument independently brackets each scalar root at both endpoints of the frozen T02 speed bracket, certifies opposite outward-rounded residual signs and a fixed Jacobian sign, and encloses its continuation across the bracket using $dv/d\beta=\sin v/D$. Strict concavity and the admissible-level inequalities give completeness; successful root solves or a dense delay scan are not the completeness argument.

The frozen speed bracket is

$$
\begin{aligned}
\beta_-&=1.826430964654678725003434188109835808086261211781729409,\\
\beta_+&=1.826430964654678725003434188109843152231474648533778347.
\end{aligned}
$$

The scalar projections are $C_r=\sum_m(-1)^m/(4\sin v|D|)$ and $C_t=\sum_m(-1)^m\cos v/(4\sin^2v|D|)$, with $D=1-\beta\cos v$. The new interval evaluation certifies $C_t(\beta_-)<0$, $C_t(\beta_+)>0$, $58.65561298809445113402140533363<C_t'<58.65561298809445113402140533370$, and $C_r<0$ across this bracket. Hence a unique scalar balance lies inside. Defining $R=-C_r/\beta^2$ imposes radial balance exactly, $C_r/R^2=-\Omega^2R$, while the selected zero imposes tangential balance. Rotation covariance supplies all six complete receiver vectors. The speed is about $1.826430964654678725003434188109838$, the radius about $0.975976431801690696803573313538935$, and $\Omega$ about $1.871388391298564116240600289092640$.

The table displays representative rounded root values. Its authoritative enclosures are the exact binary interval endpoints in the certificate receipt; the rounded table is not a replay certificate.

| Level $m$ | Source $j$ | Branch | Delay $\Delta$ | Signed $D$ |
| ---: | ---: | --- | ---: | ---: |
| -5 | 1 | descending | 0.360862263473257 | 2.794947911352318 |
| -4 | 2 | descending | 0.717117110849586 | 2.698707142973482 |
| -3 | 3 | descending | 1.063169259800118 | 2.531737716271399 |
| -2 | 4 | descending | 1.390771414329595 | 2.281550919055416 |
| -1 | 5 | descending | 1.684846018776428 | 1.922223291661251 |
| 0 | 0 | descending self | 1.907435609241619 | 1.387844260235501 |
| 1 | 1 | rising | 1.475659752963848 | -0.195547819380821 |
| 1 | 1 | descending | 1.758490635233663 | 0.207234139132325 |

Claim grade: computer-assisted derived balance enclosure and complete ordinary-root census, using the frozen unique-balance bracket, exact concavity argument, and new outward-rounded endpoint certificates. The minimum $|D|$ exceeds $0.1955478193808212$. Falsifier: a root outside the declared lattice list, a failed endpoint sign or Jacobian sign, a zero-containing $D$, or a nonzero complete acceleration residual at the exact scalar zero overturns this result.

## Independently reconstructed first variation

At reception $T=0$, define the causal function $g(s)=|X_r(0)-X_s(s)|+s$; an ordinary root has $g_s=D\ne0$. The source rotates by $B$ relative to the receiver, and the perturbation at emission is $BEu$, with $E=e^{-z\Delta}$. The fixed-emission separation change is $(I-BE)u$. Differentiating $g=0$ therefore gives

$$
\delta s=-\frac{n\cdot(I-BE)u}{D}.
$$

The emission shift changes both the source position and its emission velocity. With source acceleration $a_s=-\Omega^2RBe_1$ and source velocity $v=\Omega RBe_2$, the resulting variations are

$$
\begin{aligned}
\delta r&=(I-BE)u-v\delta s,&\delta\ell&=n\cdot\delta r,\\
\delta n&=(\delta r-n\delta\ell)/\ell,&
\delta v&=BE(zI+\Omega J)u+a_s\delta s,\\
\delta D&=-\delta n\cdot v-n\cdot\delta v.
\end{aligned}
$$

For either fixed sign of $D$, $d\log|D|=dD/D$. Applying this identity to the per-hit acceleration gives

$$
\delta A_{rs}=\frac{\sigma K}{\ell^2|D|}\left[\delta n-n\left(2\delta\ell/\ell+\delta D/D\right)\right].
$$

Replacing the signed divisor $D$ in the last term with $|D|$ would reverse that part of the negative-$D$ rising row. The comparison instrument implements this differentiation directly from vector geometry and sums all eight rows. It also checks that row against an independent nonlinear calculation: perturb the source and receiver paths, solve the changed causal equation again, evaluate the complete changed acceleration, and take a centered difference. That control does not reuse the first-variation row map.

Each row is an exponential polynomial $C+e^{-z\Delta}(F+zH)$, where the three constant $2\times2$ matrices are obtained by isolating receiver-only, delayed-position, and delayed-velocity contributions. There is no approximation of $e^{-z\Delta}$ in the spectral evaluation.

## Analytical controls admitted before spectral use

The initial static-source control, and all subsequent T02 controls, were recorded before the target scan. The final instrument replays those stages in the strict order `known`, `controls`, `target`, `certificate` and requires prior receipts carrying its current source identity. The identities below follow independently by rotating the whole rigid family, varying its radius at fixed $\Omega$, and varying its angular rate. Explicit scalar-root differentiation supplies $C_r'$ and $C_t'$; it does not numerically differentiate a fixed-accuracy root solver.

At balance, the exact controls are

$$
\begin{aligned}
A(0)e_2&=0,\\
A(0)e_1&=(-3\Omega^2-K\beta C_r'/R^3,\;-K\beta C_t'/R^3)^\mathsf T,\\
A'(0)e_2&=(-2\Omega-KC_r'/R^2,\;-KC_t'/R^2)^\mathsf T.
\end{aligned}
$$

The last identity corresponds to tangential displacement $b(T)=T$, which varies angular rate by $1/R$. Since the second column of $A(0)$ vanishes, $\det M=zG$ analytically, and

$$
G(0)=R\det[A(0)e_1,A'(0)e_2]=(K/R)\Omega^2 C_t'(\beta)>0.
$$

Terms involving $C_r'C_t'$ cancel algebraically. This upward crossing supplies the correct positive sign at zero; it is not an instability argument.

| Control | Independent reference | Recorded point error at 110 decimal digits |
| --- | --- | ---: |
| Stationary source at separation 2 | Exact $\operatorname{diag}(-2,1)/8$ | 0 |
| Constant phase | Rotational covariance | $2.0\times10^{-110}$ |
| Rigid-radius derivative | Scalar ledger differentiated implicitly | $3.0\times10^{-108}$ |
| Rigid-frequency derivative | Scalar ledger differentiated implicitly | $1.6\times10^{-108}$ |
| $G(0)$ coefficient | Determinant cancellation above | $5.2\times10^{-108}$ |
| Negative-$D$ root-row derivative | Nonlinear perturbed-path root solve, difference step $10^{-35}$ | $2.9\times10^{-67}$ |

The measured zero-frequency coefficient is $G(0)=210.473832765450907158288676711507\ldots$. Every delay is strictly positive, so $ze^{-z\Delta}\to0$ along the positive real axis. Receiver-only terms remain bounded. Therefore $A(z)=z^2I+2\Omega zJ+O(1)$ and $G(z)\sim Rz^3$. The corresponding point controls give $G/(Rz^3)=0.9883982537\ldots$ at $z=100$, $0.9998839549\ldots$ at $z=1000$, and $0.9999988395\ldots$ at $z=10000$.

Claim grade: derived control identities with measured evaluator agreement. The point errors are numerical diagnostics, not outward-rounded proofs of every identity. Falsifier: a rigid-family or independently perturbed-row derivative disagreeing beyond the recorded numerical errors, or failure of positive-delay decay, blocks target use.

## Certified positive real roots

The admitted point scan evaluates $z=10^{-8}$ followed by $z=0.05,0.10,\ldots,100$. It finds sign changes on $[0.85,0.90]$ and $[10.65,10.70]$ and a sampled minimum near $-434.1312855$ at $z=6.3$. Those measurements select brackets only; they do not count roots or certify a negative result on unsampled points.

The certificate then encloses the exact speed using the frozen bracket, every scalar root using outward-rounded interval arithmetic, and $R=-C_r/\beta^2$ and $\Omega=\beta/R$ over that same bracket. Dependency expansion is retained: computing $R$ from an interval $C_r$ cannot make the enclosure too small. Each endpoint evaluation of $G$ includes this complete reference uncertainty and all eight root-row uncertainties. No equation, source root, or sign rule changes between point selection and interval certification.

The endpoint locations below are displayed with fewer digits than the receipt; the receipt stores the exact binary endpoint intervals. Rounded decimal sign bounds are widened here so that they remain valid.

| Positive interval | Left $G$ enclosure | Right $G$ enclosure | Consequence |
| --- | --- | --- | --- |
| $0.8596290682133805113463\ldots<z<0.8596290682133805113663\ldots$ | $[1.75182252,1.75182280]\times10^{-18}$ | $[-1.75182280,-1.75182252]\times10^{-18}$ | at least one zero |
| $10.6584241740493694042984\ldots<z<10.6584241740493694043184\ldots$ | $[-2.17418178,-2.17418175]\times10^{-18}$ | $[2.17418175,2.17418178]\times10^{-18}$ | at least one zero |

The intervals have width $2\times10^{-20}$ and are disjoint. On the admitted ordinary chart $G$ is real and continuous for real $z$. The intermediate value theorem therefore proves at least one zero in each interval. These zeros are positive and do not belong to the neutral phase factor at $z=0$. There is no claim of uniqueness or multiplicity in either interval.

Claim grade: computer-assisted derived existence of at least two positive real characteristic zeros of the exact T02 symmetric sector, conditional on the declared Master Equation and admitted first variation. Instrument: `--stage certificate`, mpmath 1.3.0 outward-rounded `libmpi` arithmetic at 90 decimal digits, with 110-decimal point proposals. Falsifier: a failed authoritative binary endpoint enclosure, omission of a root row, non-outward arithmetic, a wrong signed $D$ derivative, or a changed source identity overturns the corresponding positive-root verdict.

## Tail confinement and remaining spectrum

The positive-root verdict does not require a complex root count. A useful independent bound still confines every right-half-plane determinant zero. Use the induced infinity matrix norm, the maximum absolute row sum. For $\operatorname{Re}z\geq0$, $|e^{-z\Delta}|\leq1$. If $A(z)u=0$ for $u\ne0$, the exponential-polynomial decomposition gives

$$
|z|^2\leq B_1|z|+B_0,
\quad B_1\geq2\Omega+\sum\|H\|_\infty,
\quad B_0\geq\Omega^2+\|\sum C\|_\infty+\sum\|F\|_\infty.
$$

Outward-rounded coefficient enclosures, rounded upward to integer norm bounds, give $B_1=34$ and $B_0=318$. At $|z|=43$, $43^2-34\cdot43-318=69>0$, and the left-minus-right polynomial increases thereafter. Hence no determinant zero occurs in $\operatorname{Re}z\geq0$, $|z|\geq43$. This includes every delayed term; it assumes no delay truncation or numerical exponential tail cutoff.

Claim grade: computer-assisted derived confinement bound for this matrix. Falsifier: an omitted coefficient, an understated interval norm, or a right-half-plane determinant zero with $|z|\geq43$ overturns the bound. The exact unresolved total-count domain is the half disk $\operatorname{Re}z>0$, $|z|<43$: two disjoint real-root witness intervals are included, but further real or complex zeros and witness multiplicities have not been counted. A total count would require a zero-free enclosing contour, interval control between every contour node, and a certified winding number for the phase-deflated determinant, with any contour-touching zero treated separately.

## Scope of completion

The queued symmetric-sector question has a positive-root verdict and is complete at that boundary. The two witnesses invalidate a claim that this symmetric first variation has no growing characteristic modes. They do not prove a nonlinear fate for perturbed T02, a differentiable nearby-history flow, admissibility of an exponentially growing history perturbation in a selected function space, or any full-ring qualification change. Differential-member and out-of-plane sectors remain distinct. History-space well-posedness and the connection from a characteristic root to nonlinear instability need their own theorem before the formal roots acquire that stronger meaning.

The next useful mathematical step is to prove that connection for the unchanged simple-root chart and the selected admissible retained-history space; counting additional roots does not repair a missing solution-map theorem. A request for the total symmetric spectrum can instead use the confined half disk above.

## Operational record

The bounded comparison instrument is `scripts/braid-program/t02_symmetric_characteristic_independent.py`; it imports no production solver, frozen circular oracle, or first-variation implementation. The unchanged Master Equation uses $c_f=1$, $K=1$, all positive-delay ordinary roots including self roots, and common in-plane radius and phase perturbations only. Original first-variation material, frozen receipts, qualification, and shared queues remain outside this write scope.

On 2026-10-03, before any T02 evaluator use, `--stage known` returned exactly the independently known derivative $\operatorname{diag}(-2,1)/2^3$ for a stationary transmitter at the origin and receiver at $(2,0)$, with $D=1$. The maximum error was zero. Its receipt is `.local-data/bp-011-t02-characteristic/known.json`. This records the known-case pass before the T02 analytical controls and spectral targets.

The first T02 control attempt stopped before spectral use. Its phase and independently perturbed negative-$D$ root-row checks agreed, but automatic numerical differentiation of a fixed-iteration bisection returned an incorrect scalar-family derivative. The root solve had a fixed accuracy while `mp.diff` took smaller differences. The scalar-family reference was replaced with explicit implicit-root differentiation, $dv/d\beta=\sin v/D$, without changing the acceleration law or the vector first variation. All controls, including the static known case, must be rerun with the resulting instrument identity.

The revised instrument passed `--stage known` and then `--stage controls`, in that order. The controls receipt records phase neutrality, the rigid-radius and rigid-frequency derivative identities, the signed negative-$D$ row checked against an independently re-solved nonlinear emission root, the identity $G(0)=(K/R)\Omega^2C_t'(\beta)$, and convergence of $G(z)/(Rz^3)$ to one along large positive real $z$. The successful receipts were written before invoking any spectral target.

Status: bounded task complete with two certified positive-root witness intervals; no complex total count or nonlinear conclusion claimed.

### Sources and receipts

The authority inspected is the live [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md), the [balance-ladder evidence](../evidence/2026-08-29-planar-three-binary-circular-balance-ladder.md), the [first-variation reference](six-ring-symmetric-first-variation.md), and the [queued task](../campaigns/planar-three-binary-work-queue.md#evaluate-the-t02-symmetric-characteristic-function). The frozen scalar interval oracle, separately authored six-phase point oracle, and its frozen bracket checker were read but neither imported nor edited. Their methods separate root proposal from inclusion and use an analytical completeness argument.

| Identity | SHA-256 |
| --- | --- |
| Comparison instrument | `17359fc08633daace44838fb578151a178c59f994f6d603c58e9ed3a3680dabb` |
| Master Equation source | `4389354e42ff3b72d9f3002057491755c25b7558c50ddd2e4bcecd5759dfb8da` |
| Original first-variation reference | `8f5bbb249390af35a0d07eee0b880f86a3b4d19a12e25626d631154f4f8659ab` |
| Frozen scalar zero-count receipt | `fd83e4ea68aace450fc945e410182177c048be05a592608a865e14bc93e463af` |
| Frozen scalar interval oracle | `b16ea1f0137ccbf5349012fb341a461c4af89b5ad968fe1d4151212ebfa582f4` |
| Frozen six-phase point oracle | `f6d592b5682c8e8e5001504d6201b9caa5eef8994cecddb948a86844d1b7f4a3` |
| Existing independent bracket checker | `b841a749a5905a7c9508105caad069c46891858065f3aa5e3ee5fe696a66894e` |
| mpmath `libmpi.py` | `bb4239122c24a9afb8f9d5c44e2e64eccb9ac417996ef0803c5b65f7753d605d` |
| mpmath `libelefun.py` | `8e80593f814e7713df89e5aca352cfb52afa747c9da46fcb42217f6d841858c8` |
| `known.json` | `70e7c1989d4d07cc0c3496fa2276562948c399e3d965c1921fb07a9efda3da38` |
| `controls.json` | `982e95cfd33571c26dc4e36443c37abf1811f72993193864c0951e5644e58087` |
| `target.json` | `3ffdd4e8db3aeb7e08bb94e4a49ffeed23fe15a4b5f35ff6d4ddc4c30317b315` |
| `certificate.json` | `ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6` |

All four new receipts live under `.local-data/bp-011-t02-characteristic/`. Each receipt carries the final comparison-instrument identity. `exactIntervalBinaryBounds` records authoritative mpmath endpoint tuples `(sign, mantissa, exponent, bitcount)` by JSON path; decimal interval displays are rounded diagnostics. The roots' endpoint residuals and Jacobians, all coefficient matrices, and complete reference enclosures are retained. The instrument verifies the frozen scalar receipt identity before obtaining its reference.

Reproduction uses the verified shared venv, in order:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/t02_symmetric_characteristic_independent.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/t02_symmetric_characteristic_independent.py --stage controls
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/t02_symmetric_characteristic_independent.py --stage target
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/t02_symmetric_characteristic_independent.py --stage certificate
```

Only this new analysis and the new comparison instrument are authored durable changes. New receipts are local evidence; no production code, frozen oracle, standing tests, shared queue, qualification, or generated source was changed. The coordinator owns integration into shared records.

### Scoped validation

The four-stage scientific evaluation returned exit zero for each stage under `/Users/markmorris/vibe/.venv/bin/python`. `python -m py_compile` under that same venv accepted the new instrument. `git diff --no-index --check /dev/null` emitted no whitespace diagnostics for either authored file; its exit one records that each new file differs from the empty baseline. Explicit `test -f` checks confirmed all four Markdown file-link targets above resolve. `shasum -a 256` measured the instrument, frozen owners, new receipts, and arithmetic-library identities listed above. `git --no-optional-locks status --short --` scoped to the two authored files reported both as untracked new files. No standing test suite or full-repository publication check was run for this bounded calculation.
