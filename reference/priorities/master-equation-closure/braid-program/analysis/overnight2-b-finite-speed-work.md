# A direct finite-speed work-mean exclusion around torque-compatible height

## Declared target and unchanged law

Claim grade: proposed interval exclusion, pending target calculation and independent reconstruction. Retain the original complete six-member histories with second-harmonic radius and phase corrections and first/third-harmonic height. The exact parameter box is
$$
|a|,|b|,|c|,|d|,|e|,|f|\le10^{-4},\quad
H\in[0.8,0.85],\quad \beta\in[0.1999,0.2001],\quad
\kappa\in[0.1499,0.1501].
$$
Every decimal is an exact rational. The canonical equation has $K=c_f=1$, all ordinary positive-delay roots and no response factor. Radius scale $R$ is arbitrary positive. This is a finite-speed domain, not an application of a limiting theorem or an unspecified small-speed threshold.

The proposed exclusion uses the exact necessary work mean $\langle V\cdot A\rangle=0$. Here $V$ is physical velocity, while $A$ is the dimensionless complete canonical acceleration sum whose physical value is $A/R^2$. The original dimensionless demand is $L$, with physical acceleration $L/R$. Exact balance requires $A=RL$. Since physical speed is periodic even when absolute angle closes only relatively, its squared-speed derivative averages to zero and exact balance forces the displayed work mean. Thus a strictly positive full-box enclosure excludes every exact member at every $R>0$.

A separate endpoint calculation on the central one-parameter height path seeks positive torque at $H=0.8$ and negative torque at $H=0.85$. If proved, continuity gives at least one torque-zero member inside the box. This is not a solution: the positive work mean would exclude it. The endpoint statement makes explicit why the work condition supplies information beyond requiring torque zero.

## Complete ordinary chart

For the original polynomial profiles,
$$
0.9998\le\rho\le1.0002,\quad |\rho'|,|p'|\le0.0004,\quad
|\zeta|\le0.8502,\quad |\zeta'|\le0.8506.
$$
Therefore the squared physical speed is bounded above by
$$
(0.1501\cdot0.0004)^2+
[1.0002(0.2001+0.1501\cdot0.0004)]^2+
(0.1501\cdot0.8506)^2<0.3^2.
$$
The diameter squared is at most $4(1.0002^2+0.8502^2)<2.789^2$. The complete-past Lipschitz gap argument gives exactly five partner roots and no positive self root. Every transmitter divisor lies strictly between 0.7 and 1.3. Present-time partner separation is at least 0.9998, so each normalized delay is at least $0.9998/1.3>0.488$, and bounded diameter gives delay below 2.789. These bounds hold throughout the whole parameter box and all phases, not merely at numerical samples.

The sign-changing height is uniform because $\zeta(0)=H+e\ge0.7999$ and $\zeta(\pi)=-H-e\le-0.7999$. All paths remain spatial during part of the period. Absolute labeled positional closure is not assumed for the necessary work identity.

## Interval instrument and known-first controls

The [new work-mean companion](overnight2-b-finite-speed-work.py) authenticates and imports the unchanged prior Cartesian interval geometry/root implementation, replacing its divisor enclosure only in memory with the proved tighter interval $[0.7,1.3]$. Its subject dependency identity is 7acbd19f11b324ddf700db796ddb62f6409de466c340b0baac5c5488553c8f23. This reuse is implementation reuse, not independent evidence; acceptance requires a separately authored reference instrument.

For each phase interval it computes current cylindrical velocity
$$
V=(\kappa\rho',\rho(\beta+\kappa p'),\kappa\zeta')
$$
and the complete three-component canonical sum
$$
A=\sum_{j=1}^5\frac{(-1)^jQ_j}{\Delta_j^3D_j}.
$$
It encloses both $V\cdot A$ and $\rho A_t$. Positive divisor allows the absolute value to be omitted within this admitted chart. Scalar interval root contraction preserves the unique root for every parameter and phase within the current cell; its initial delay and divisor bounds cover the complete domain. Equal phase cells cover the full $2\pi$ period and their interval contributions are averaged, yielding continuous mean enclosures. No point quadrature is treated as a sign proof.

Before any pilot or target use, known controls passed under the shared venv: the five exact static chord roots, zero static work, the exact current axial velocity $-0.12$ at phase $\pi/2$ for $H=0.8$, $\kappa=0.15$, and exact rational speed/diameter/root-bracket inequalities. The original known receipt identity is 9e821ed3071bd8cb6319309d6f2fe37f5b7e672fc3b29d7b03f73ba878fede44. The static control verifies roots against an independent closed form; it does not certify dynamic work positivity.

## Declared calculation and limits

The pilot encloses the first height interval $[0.8,0.80625]$ over 128 phase cells. Subject to measured pilot cost, the target partitions the full height interval into eight intervals of width $1/160$, using 768 phase cells per height interval. Every other parameter spans its full stated interval. Each height interval must have a strictly positive mean-work lower endpoint for the full-box conclusion. All per-cell work and torque intervals, mean endpoints and original failures are retained. A complete but inconclusive enclosure remains inconclusive.

The additional endpoint stage uses the central path $a=b=c=d=e=f=0$, $\beta=0.2$, $\kappa=0.15$, with fixed heights 0.8 and 0.85 and 1,536 phase cells each. It seeks opposite strict torque signs. Each stage has 900 seconds internal wall limit, 512 MiB measured resident limit, 8 MiB receipt limit, one numerical thread and a 960-second supervisor deadline. A measured pilot precedes the target. This is a small research instrument, not a production evolution path or regular test addition.

## Verification boundary and falsifiers

A failed work lower bound, wrong velocity or acceleration normalization, invalid root contraction, lost phase/parameter coverage, incorrect interval endpoint arithmetic or a missing positive-delay root defeats the respective claim. Endpoint torque signs and the continuity argument are separate from the work exclusion. Any exact canonical history inside the full box would contradict an accepted positive work enclosure. Arbitrary shapes or parameters outside the box are not excluded.

The current record is a declared subject. Numerical target, independent proof and separately authored interval verification remain before acceptance. Frozen previous instruments, source evidence and shared owners remain unchanged. The receiving account is the second overnight B report; all runtime evidence belongs to finite-speed-work under its assigned local owner.
