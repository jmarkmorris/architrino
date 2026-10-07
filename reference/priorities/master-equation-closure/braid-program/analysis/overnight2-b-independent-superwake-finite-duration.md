# Independent review of the finite-duration residual bound

## Disposition and precise scope

**Derived and accepted without repair.** The [frozen finite-duration subject](overnight2-b-superwake-finite-duration.md) correctly proves, for its declared complete-past neighborhood and any fixed $R>0$,

$$
\sup_{\tau\in[a,b]}|R\ddot x_0(\tau)-A_0(\tau)|>\frac1{400},
\qquad b-a=\frac{2\pi}{\kappa}.
$$

This is a normalized full-vector residual bound over one reference deformation cycle. Actual profiles may be aperiodic. Exactness is not assumed to derive the bound; its failure on the cycle is a consequence. No norm or exactness assumption after $b$ is needed. The physical acceleration residual is divided by $R^2$, and the physical interval length is $2\pi R/\kappa$. There is no scale-independent physical acceleration-error claim.

The fixed reference triple is

$$
H\in[1/20,1/9],\qquad \beta\in[73/40,457/250],\qquad \kappa\in[1/2,3].
$$

The complete $C^2$ actual profiles have the selected six-member common-radius/common-phase/alternating-height geometry, with a globally real phase correction $p$. The nine scalar differences and derivatives in the subject are bounded by $0\le\eta\le1/30000000000$ for every $\tau\le b$. The canonical law remains $K=c_f=1$, all positive-delay self and partner roots, positive self polarity and absolute source divisors. The Ramon E. Moore lens does not itself supply mathematical authority.

## Causal restriction of the accepted estimates

The unchanged dependencies are the [independent functional chart](overnight2-b-independent-superwake-norm-chart.md), [independent torque cover](overnight2-b-independent-superwake-torque-cover.md) and [independent smooth transfer](overnight2-b-independent-superwake-functional-transfer.md). Their relevant inequalities can be restricted to receptions at or before $b$ without an assumption on later norms.

At any such reception, every positive-delay source time is $\tau-d<\tau\le b$. The recent partner guard uses simultaneous separation and source velocities on a past segment. The recent self guard uses the reference chord and the error derivative on that past segment. The remote guard uses a position bound on the entire earlier history. All are available under the stated one-sided norm domain. In the finite root cover, only the receiver and earlier source values occur. Thus the complete chart still has exactly eight roots with counts $(1,3,1,1,1,1)$ and

$$
7/20<d<2,\qquad |D|>1/20.
$$

The Cartesian interpolation used for sensitivity is performed at fixed source and reception times, preserving the same bounds for every time at or before $b$. Root interpolation derivatives use the direct position error and source velocity; source-velocity derivatives along a moving root use direct velocity error and source acceleration at the delayed time. Those delayed times remain strictly earlier than the reception throughout the admitted interpolation. Therefore the accepted row comparison requires no future data beyond $b$.

The actual paths are complete $C^2$ histories, but their unrestricted future cannot affect a causal sum on $[a,b]$. At $b$, continuity of the root branches and sums on the reception domain can be read one-sided. Fixed protected labels, ordinary divisors and continuous source data give a continuous finite sum on the closed interval. The residual is continuous there and has a finite supremum. No future interval of norm admission is silently used to establish that supremum.

Consequently, throughout $J=[a,b]$, the accepted bounds are

$$
|A_0|\le M=\frac{64000}{49},\qquad
|A_t-A_t^0|\le73000000\eta,\qquad
|L_t|\le5\eta.
$$

For positive $\eta$, the first comparison of tangential sums can be made strict as in the accepted transfer; the weak form suffices here and is valid also at $\eta=0$. At zero tolerance the actual/reference difference and tangential kinematic demand vanish identically. The tangential comparison already includes the change from the reference basis to the actual basis. The negative-divisor partner root and positive self root remain in every sum.

## Exact planar boundary identity

For member zero, write $Y=\rho e^{i\theta}$ with $\theta=\beta\tau+p$. In real planar coordinates,

$$
\dot Y=\dot\rho\,e_r+\rho\dot\theta\,e_t,
\qquad Y\cdot\dot Y=\rho\dot\rho,
$$

because $e_r\cdot e_t=0$. This identity is exact even when both $\rho$ and $p$ are aperiodic. The phase rate contributes no boundary product. The admitted bounds imply

$$
|Y|\le B=\frac{1001}{1000},\qquad
|\dot Y|\ge v_*:=\frac{363}{200},\qquad
|Y\cdot\dot Y|\le B\eta.
$$

The planar speed floor follows from comparison with reference speed $\beta$: $|\dot Y|\ge\beta-1/100\ge73/40-1/100=363/200$. These deliberately loose admitted-chart bounds hold under the much smaller actual tolerance.

Let $E=R\ddot x_0-A_0$ and $\epsilon=\sup_J|E|$. Then the exact identity, whether or not the trajectory solves the equation, is $R\ddot Y=A_p+E_p$. Taking the scalar product with $Y$ and integrating by parts gives

$$
\frac R T\int_a^b|\dot Y|^2\,d\tau
=-\frac1T\int_a^bY\cdot(A_p+E_p)\,d\tau
+\frac R T[Y\cdot\dot Y]_a^b.
$$

The residual has a plus sign in $A_p+E_p$, and both integral terms have a minus sign after the rearrangement. Bounding their absolute values and bounding the two endpoints separately yields

$$
R v_*^2\le B(M+\epsilon)+\frac{2RB\eta}{T},
$$

or

$$
R\left(v_*^2-\frac{2B\eta}{T}\right)\le B(M+\epsilon).
$$

No equation of conservation, long-time limit, periodic actual path or convergent average is involved. The small boundary product, rather than merely bounded velocity, is what permits a finite-interval argument.

## Exact residual-aware scale estimate

Since $\kappa\le3$, $T=2\pi/\kappa\ge2\pi/3>1$. The actual tolerance is below $1/2000$. Thus

$$
v_*^2-\frac{2B\eta}{T}
>v_*^2-\frac{B}{1000}
=\frac{131769}{40000}-\frac{1001}{1000000}
=\frac{411653}{125000}=:C>0.
$$

The strict comparison remains true at $\eta=0$, where the subtracted term is zero. The ratio is

$$
\frac BC=\frac{125125}{411653}<\frac{61}{200},
$$

since $125125\cdot200=25025000<25110833=411653\cdot61$. The preceding integral bound, $R>0$ and $M+\epsilon>0$ therefore imply

$$
R<\frac{61}{200}(M+\epsilon)
=\frac{19520}{49}+\frac{61}{200}\epsilon
<400+\frac\epsilon3.
$$

The last comparison follows from $400-19520/49=80/49>0$ and $1/3-61/200=17/600>0$, with $\epsilon\ge0$. This is a bound on each proposed scale in terms of that history's actual residual. It does not assume the residual is already small and is not circular when used in the next step. An arbitrarily large proposed scale must have a correspondingly large normalized residual.

## Deciding phase in an arbitrary closed cycle

The independent torque cover supplies a fixed positive margin $m>1/200$ and, for each reference parameter triple, at least one deciding phase $\vartheta\in\{0,\pi/2,\pi/4,3\pi/4\}$ with $|A_t^0|\ge m$. For any real $a$, choose an integer $q$ such that

$$
\kappa a\le\vartheta+2\pi q\le\kappa a+2\pi.
$$

For example, the least integer not smaller than $(\kappa a-\vartheta)/(2\pi)$ works. Since $\kappa>0$, the reception $\tau_*=(\vartheta+2\pi q)/\kappa$ lies in the closed interval $[a,b]$. Endpoint occurrence is allowed; no open-interval claim is needed.

The reference height is $2\pi/\kappa$-periodic. The reference planar paths rotate by a common fixed angle $\beta T$ after this time shift; they need not close individually. Their delayed relative geometry, source contractions and tangential components in their respective receiving bases repeat. Equivalently, planar relative azimuth is $j\pi/3-\beta d$ and the height terms depend on $\kappa\tau$ modulo $2\pi$. Therefore the same reference margin applies at $\tau_*$. Actual perturbations need not repeat, because their uniform causal comparison bound holds separately at each reception.

## Uniform residual lower bound

Project $E(\tau_*)$ onto the actual unit tangential direction. The projected residual is $RL_t-A_t$, so

$$
\epsilon\ge|RL_t-A_t|
\ge|A_t^0|-|A_t-A_t^0|-R|L_t|
\ge m-73000000\eta-5R\eta.
$$

Using the residual-aware scale estimate and $\eta\ge0$ gives the valid weak bound

$$
\epsilon\ge m-73002000\eta-\frac53\eta\epsilon,
\qquad
\epsilon\ge\frac{m-73002000\eta}{1+5\eta/3}.
$$

At zero tolerance this is simply $\epsilon\ge m>1/200$. For all allowed positive tolerances, set $Q=30000000000$. The exact endpoint comparison is

$$
\frac1{200}-\frac{73002000}{Q}
>\frac1{400}\left(1+\frac5{3Q}\right).
$$

Subtracting $1/400$, multiplying by $400Q$ and then by three reduces it to

$$
3Q>1200\cdot73002000+5,
\quad\text{that is}\quad
90000000000>87602400005.
$$

The positive integer difference is $2397599995$. To avoid any hidden monotonicity assumption about a potentially negative numerator, the same conclusion for all $\eta\le1/Q$ follows directly from

$$
m-73002000\eta
>\frac1{200}-\frac{73002000}{Q}
>\frac1{400}\left(1+\frac5{3Q}\right)
\ge\frac1{400}\left(1+\frac{5\eta}{3}\right)>0.
$$

Division by the positive denominator proves $\epsilon>1/400$. In particular, an exact canonical profile on the whole cycle would have $\epsilon=0$ and is impossible within the stated neighborhood. Only member zero was needed, so this already excludes simultaneous exact balance of the full six-member family.

## Qualifications, falsifiers and retained evidence

The result depends on the complete-past norm assumptions through the cycle endpoint. Replacing them by bounds only during the cycle could allow older source excursions or roots outside the accepted chart and would not support this proof. No constraint after the endpoint is required. A shorter interval need not contain a deciding phase; the present argument does not give the same conclusion there. The waveform reference, parameter domain, common scale and chosen scalar norm remain fixed. The bound does not specify a solution's later fate, which norm it would violate, an existence theorem, stability, or continuation through singular roots.

An admitted history with supremum normalized residual at most $1/400$ would directly falsify the conclusion. Potential earlier falsifiers are an incorrect causal restriction of the complete chart, loss of a root under Cartesian interpolation, an invalid accepted row-sensitivity bound, an error in the exact radial boundary identity, a wrong sign in the residual integration, or absence of the claimed reference phase on a full closed cycle. The explicit integer comparisons above expose the new constant checks. The independent chart and torque margin retain their documented shared interval-library boundary; no new numerical evidence is claimed here.

Scoped verification is the independent analytical reconstruction of every new identity, constant, inequality and causal/phase argument above after a full read of the frozen subject. Native `shasum -a 256` identifies that subject as `5239a47458ff126aafa188fd33efbb18256c563e8d0f0e6b9f1a643548dff53a`; final hashing confirms the source identity and identifies this report. Native `git diff --no-index --check /dev/null` is the scoped new-file whitespace check; exit one with no diagnostics denotes the new-file difference. No numerical target, companion or runtime receipt was necessary, and the parent's numerical slot was not used.

Only this new report was authored. All frozen subjects, prior independent reports and instruments, receipts, parent account and shared owners remain unchanged by this review. No Git mutation, generator, delegation, other-chat message, evidence deletion or relocation occurred. Existing local evidence is retained without an archive-recovery or remote-backup assertion. Parent integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md) remains the receiving action. This bounded review is complete.
