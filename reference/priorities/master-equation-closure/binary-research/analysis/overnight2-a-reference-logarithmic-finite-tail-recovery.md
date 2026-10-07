# Independent assessment of finite-tail recovery for the logarithmic pair

**Derived assessment; accept the recovery lemma and the sufficiently small original-family consequence, with the local-rotation bridge made explicit below.** Under the unchanged ordinary coefficient-one inverse-distance law, eventual exact equality of both labeled positions with one fixed rotation of the original spiral implies equality on the entire generated future. Consequently the sufficiently small positive-amplitude members covered by the accepted departure theorem cannot merge exactly into that rotated spiral after a finite time.

The [frozen subject](overnight2-a-logarithmic-finite-tail-recovery.md) does not establish a general inverse of the history semiflow, full-past injectivity, or exclusion of asymptotic return. This review preserves those limits. It is an after-disclosure Hale-lens reconstruction of the receiving-trajectory identity and its propagation. The [exact spiral admission](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md), [nonlinear departure assessment](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-adjudication.md), and [attained-circle reference](overnight2-a-reference-logarithmic-circle.md) are inherited at their stated scopes. No new history, balance, interaction, boundary restart or numerical target is introduced.

## Recovering the ordinary source clock

Let $T$ denote physical receiving time. For one labeled partner row, with $c_f=1$ and the registered coefficient one, write

$$
S_i=X_i(T)-X_j(s_i(T)),\quad
R_i=|S_i|=T-s_i>0,\quad
N_i=S_i/R_i,\quad
D_i=1-N_i\cdot V_j(s_i)>0.
$$

The exact inverse-distance acceleration is

$$
A_i=-\frac{N_i}{R_iD_i}.
\tag{1}
$$

The complete strict-speed root census leaves exactly this single partner contribution and no positive-delay self contribution. This is essential: the direction of a sum of multiple unrelated contributions would not identify a single chord. Here the ordinary separated row is nonzero, so its receiving trajectory determines

$$
a_i=|A_i|=\frac1{R_iD_i},\qquad N_i=-A_i/a_i.
$$

Differentiate the actual causal distance before substituting the acceleration:

$$
R_i'=N_i\cdot V_i-N_i\cdot V_j(s_i)s_i',
\qquad s_i'=1-R_i'.
$$

Therefore $D_iR_i'=N_i\cdot V_i-N_i\cdot V_j(s_i)$, and subtraction from $D_i$ gives

$$
D_i(1-R_i')=1-N_i\cdot V_i.
$$

Using $D_i^{-1}=a_iR_i$ yields

$$
R_i'+c_i(T)R_i=1,\qquad
c_i(T)=a_i(T)[1-N_i(T)\cdot V_i(T)]>0.
\tag{2}
$$

This independently fixes the sign, coefficient and first power of range. In particular $s_i'=c_iR_i>0$. No source acceleration is omitted: only source position was differentiated once in obtaining (2). Acceleration enters as known receiving data, and no derivative of it is taken.

On every compact regular generated interval, the complete roots depend continuously on time, source velocity is continuous, and the row has positive range and transmitter margins. Thus the actual acceleration and $c_i$ are continuous there. Local Lipschitz source velocity and the permitted source acceleration seams suffice. If a seam is described only through almost-everywhere derivatives, the integral version of (2) still holds, and an integrable coefficient is enough for the uniqueness argument.

Given one matching range at $T_b$, two clocks driven by the same receiving trajectory have difference $\rho$ satisfying $\rho'=-c_i\rho$. Explicitly,

$$
\rho(T)=\rho(T_b)\exp\!\left(-\int_{T_b}^T c_i(t)\,dt\right).
\tag{3}
$$

Hence one matching value implies equality in either direction on each finite common receiving interval. This is exact comparison uniqueness, not a numerically stable inversion claim. Having recovered $R_i$, one recovers precisely the sampled partner positions:

$$
X_j(s_i(T))=X_i(T)-R_i(T)N_i(T).
\tag{4}
$$

The canonical inverse-square expression is only a separate algebraic control. For $A_i=-K N_i/(R_i^2D_i)$ the same calculation gives $R_i'=1-(a_i/K)(1-N_i\cdot V_i)R_i^2$, a locally Lipschitz scalar equation for finite positive range. It does not change the first power or coefficient in the logarithmic result.

## The late anchor and complete sampled coverage

Suppose an actual regular logarithmic solution and a fixed common rotation of the admitted exact pair have identical labeled positions for all $T\ge T_*\ge0$. Equality of separation, speed magnitude, unparameterized orbit shape or normalized limiting histories would be insufficient. Equality of the positions on an interval implies equality of their velocities and actual accelerations on its interior, hence identical coefficients in (2).

The spiral has constant member speed $\nu_*<1$. At a late receiving time the causal gap evaluated at the fixed source time $T_*$ is bounded below by

$$
T-T_*-|X_i(T)-X_j(T_*)|
\ge(1-\nu_*)(T-T_*)-d(T_*).
\tag{5}
$$

It is positive for all sufficiently large $T$. The gap at source time $T$ is $-d(T)<0$. Its derivative with respect to source time is $-D_i<0$, so the unique root lies strictly after $T_*$. Both paths there belong to the common tail; their unique roots and ranges coincide at such a receiving time $T_b$.

No small recent speed bound is assigned to the remote past in this step. Complete strict speed provides uniqueness. The common-tail speed in (5) merely shows that a root can be found in that tail. An alleged eventual matching solution has a uniform strict complete-speed bound: the original old history has its own margin, every finite intervening regular segment has a strict maximum, and the eventual spiral has its fixed margin.

Equation (3) now propagates the matching range from $T_b$ back across the entire common receiving interval down to $T_*$. If derivatives at its endpoint are specified one-sided, take the limit from $T>T_*$. For the exact spiral, independently admitted in the balance reference,

$$
s_i(T)=\lambda(1+T)-1,\qquad 0<\lambda<1.
\tag{6}
$$

A fixed rotation preserves this clock. The clock is strictly increasing and unbounded. Its image of $[T_*,\infty)$ is exactly $[\lambda(1+T_*)-1,\infty)$. Applying (4) for both receivers therefore recovers equality of both labeled partner positions on that full interval, with no gaps or need to invert the full history time map.

The common interval also gives equality of source velocities in its interior by differentiation, and at endpoints by continuity. That is sufficient to repeat the receiving-trajectory argument on any newly recovered generated interval.

## Finite descent to generated time zero

Starting from $T_0=T_*$, successive lower endpoints satisfy

$$
T_{n+1}=\lambda(1+T_n)-1,\qquad
1+T_n=\lambda^n(1+T_*).
\tag{7}
$$

Because $\lambda<1$, some finite $n$ has $T_n\le0$. Every repetition before that point uses the equation only at receiving times at least $T_{n-1}>0$. The final reconstruction may identify supplied source values, but it never asserts that the supplied past obeys the future equation.

More precisely, if $n$ is the first such integer and $T_*>0$, then

$$
\lambda-1<T_n\le0.
$$

Thus even the final recovered source interval stays later than the original analytic source cutoff $S_c=\lambda-1>-1$. There is no extension through the formal spiral singularity. If $T_*=0$, the generated-future conclusion already holds and no iteration is needed.

The conclusion is equality for all generated $T\ge0$, and for the additional sampled supplied interval recovered by the argument. It is not equality of the complete old histories. The admitted unperturbed preparation itself supplies the decisive control: its inaccessible held tail differs from the analytic spiral, yet every generated future root lies at or after $S_c$ and its future is exactly the admitted spiral. Any claim of recovery earlier than all sampled clocks would fail this control.

This is beyond simply citing local ordinary evolution uniqueness. That older result gives one forward continuation from prescribed complete data; it does not generally recover unknown delayed data from a later segment. The new content is the special row-dependent scalar identity (2), the late anchor, and the explicit finite sampled-source descent (7). The weighted backward graph in the attained-circle reference likewise concerns selected exponentially decaying local trajectories and does not already imply this global sampled-tail recovery. Conversely, the present proof does not establish a general backward semiflow.

## What the departure premise actually excludes

The nonlinear adjudication proves finite departure from a fixed neighborhood of the **local** symmetry family, with existential sufficiently small positive amplitudes. It expressly does not assert distance from every remote symmetry parameter. Therefore one cannot replace its local orbit by the full rotation group without an additional argument.

That bridge is available for the original small family. Let $R$ be a fixed proper spatial rotation for which eventual equality is proposed. The recovery above first makes the entire generated future equal to $Rq_*$, without any assumption that $R$ is small. The original compatible family converges in $C^2$ to the base preparation as its amplitude $\eta$ tends to zero, so at release this equality gives

$$
(R-I)q_*(0)=O(\eta),\qquad
(R-I)q_*'(0)=O(\eta).
\tag{8}
$$

In fixed base axes, the admitted spiral has $q_*(0)=a e_1$ and $q_*'(0)=a(e_1+\omega e_2)$, with $a>0$, $\omega>0$. Thus

$$
|(R-I)e_1|=\frac{|(R-I)q_*(0)|}{a},
\qquad
|(R-I)e_2|\le
\frac{|(R-I)q_*'(0)|+|(R-I)q_*(0)|}{a\omega}.
\tag{9}
$$

For a proper rotation, $Re_3=Re_1\times Re_2$, so the remaining basis error is bounded by the sum of these two. Hence $\|R-I\|=O(\eta)$: after reducing the already existential amplitude threshold if necessary, the alleged rotation lies inside the accepted local symmetry chart.

In the unchanged mirror-planar family, the same conclusion is even more direct. Its release position and velocity are independent and remain in the fixed plane. Equations (8)–(9) force $R$ to preserve that plane and be near the identity. It is therefore a small axial rotation, whose normalized generated history is exactly a nearby rotated equilibrium at every similarity time. At the already proved departure checkpoint its distance to the admitted local symmetry family would be zero, contradicting the fixed positive departure distance.

Thus the family consequence is accepted for all sufficiently small positive amplitudes covered by the original departure construction, with the harmless further existential shrinking just described. No numerical amplitude threshold is claimed. If only departure from one unrotated point had been proved, or if the preparation were not close at release in both position and velocity, that conclusion would require a new premise. Those are not the present inherited hypotheses.

## Limits, controls and preservation

The recovery proof compares exact solutions using later mathematical data. It does not add a future-supported term to physical evolution, restart a trajectory after a boundary event, or select a continuation outside the ordinary strict-speed domain. Any hypothetical matching branch must itself be an ordinary continuation on all compared generated times.

The [conditional asymptotic-phase reference](overnight2-a-reference-logarithmic-asymptotic-phase.md) remains unchanged. This result does not exclude convergence to the spiral only as time tends to infinity, a later return to the local stable set, a homoclinic possibility, a different balance, a time-shifted or rescaled spiral, or a different future regime. Nor does it prove that any such alternative occurs. A finite interval of matching without the late common-tail anchor is not the theorem stated here.

Analytical controls are the exact unperturbed clock $R=(1-\lambda)(1+T)$ in (2), the zero-difference solution in (3), the separately labeled inverse-square distance power, the strictly monotone affine source map in (6), and the inaccessible held-tail example. For the first control, constant spiral speed implies $A\cdot V=0$ and hence $N\cdot V=0$; the admitted $D=1/\lambda$ gives $a=\lambda/R$. Thus $cR=\lambda$ and (2) returns $R'=1-\lambda$ exactly. A failure of the row direction recovery, missing partner contribution, wrong clock sign, absent late anchor, gap in the sampled source image, use of the equation before generated time zero, or failure of the local-rotation bridge would falsify the corresponding claim. No such missing inequality remains in this bounded reconstruction.

The initially notified 0843 bundle failed admission: the supplied receiver filename did not exist, and the corrected retry reported dispatch already finalized. No brief from it was read or acted on. Fresh assignment 990be65b-22a3-45c6-a7a2-8d38ba53a74f was then received from the 0845 bundle with complete output, exit zero and payloadVerified true. Its transportVerified false is preserved as reported.

Native shasum -a 256 matched all five frozen input identities before editing:

| Frozen input | SHA-256 |
| --- | --- |
| Finite-tail recovery subject | 613e11ee59c91340e637303982d9b3f61d5f29e2ca2b3ffcd30f4b6462580a80 |
| Attained-circle reference | ed90fe91852b82b0b688894df4b88da08f5edd8906aa251ec2012efa93543f24 |
| Nonlinear departure adjudication | 3ca193e88550477fffda2515bb5db8351702d66e056898389723f88aef55405e |
| Exact spiral adjudication | 2b79194c849b7778d8fe0d20d9a055ec48d5d4a4f47bf8610177b2d3511f0729 |
| Conditional asymptotic-phase reference | d382a587333a4b38b8300e16583fb66031bd0bc0b2ee9ce3f14b403f572fc4e0 |

Only this new reference report is authored. All frozen sources, earlier evidence, actual preparations, shared owners, production and generated files are retained. No scientific instrument, target or process was launched. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) is the coordinator-owned integration destination.

**Validation and freeze, 08:48 UTC.** The established authorized-cases-followup-document-check.mjs command with this report's repository-relative path passed known controls first, then all 71 mathematical spans, six local links and whitespace checks. Its scope is document syntax and destinations. A closing native shasum -a 256 reproduced all five frozen input identities above. The report is frozen after the final repeated document check, with the explicit local-rotation qualification governing the accepted family consequence and no active scientific process.
