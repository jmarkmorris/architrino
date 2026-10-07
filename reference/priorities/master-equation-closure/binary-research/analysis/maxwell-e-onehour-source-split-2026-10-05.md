# Separate actual-source support from the prescribed comparison clock

Claim grade: derived, conditional on the hypotheses below. The physical source errors in the original Maxwell E comparison can be confined to an independently certified interval of actual emission times. The prescribed comparison and all intermediate translated roots can use a different interval, including comparison times later than the completed physical-history cursor. This removes one sufficient restriction in the existing method without changing the acceleration equation, its original preparation, or its physical source history. It does not prove that the next recorded receiving cell satisfies the remaining coefficient and strict enclosure inequalities.

The selected equation is [Section 7](../../equation-variants/manuscript.md#7-complete-maxwell-shaped-transmitter-response), with opposite polarities, equal coupling, and $K=c_f=1$. The physical preparation is exactly the original compatible complete $C^{2,1}$ mirror history with $\beta=3/10$, radius $25/9$, and angular rate $27/250$. The [exact preparation source](../evidence/maxwell-shaped-overnight-exact-circular-preparation.mjs) retains its circle tail and compatibility patch. No derivative, coefficient, physical history, root prescription, boundary rule, or receiving-velocity transformation is replaced here.

## 1. The two intervals answer different questions

Write the actual positive-label position as $x(t)$ and its negative-label partner as $-x(t)$. The prescribed positive-label comparison is $\bar x(t)$. A receiving cell is $I=[L,U]$, and actual physical history is already certified through $L$. The proof is conditional on the original no-prior-unit-speed stopping premise: the complete incoming actual history has speed below one, there is exactly one ordinary positive-delay partner root, and there are no positive-delay self roots. These are the original complete-history conclusions, not root exclusions introduced by this refinement.

At each fixed receiving time $t\in I$, apply one constant orthogonal rotation to align the actual receiving radial ray with the comparison ray. All physical source positions, velocities, and accelerations are rotated by that same constant matrix. The resulting receiving difference is $\delta X=\delta r\,n_c(t)$, where $n_c(t)$ is the comparison radial unit vector and $|\delta r|\le e_r$. The rotation is held fixed during each source evaluation and mean-value argument. Its dependence on reception is handled by the existing intrinsic-frame transport equations; it is not differentiated as though a rotated source velocity were the derivative of a time-dependent surrogate path.

Use two explicitly named intervals:

| Interval | Required coverage | Data obtained from it |
| --- | --- | --- |
| $P=[a,b]$, actual-source support | Every actual partner emission time for the complete receiving trial, with $b<L$ | Completed physical radius, velocity and acceleration errors; source component frames; complete source-to-receiver angular error |
| $C$, comparison-clock support | The nominal partner root and every intermediate root needed by the sequential translated-source comparison | Prescribed comparison position, velocity, acceleration and jerk; positive range and denominator bounds; all coefficient families |

The word “actual” in the first row is decisive. An arbitrary intermediate translated comparison source is generally not the mirror partner of its receiver. Its emission time therefore has no entitlement to the mirror estimate proved next. Conversely, evaluating the prescribed comparison at a time in $C$ does not assert that the actual physical history has been constructed to that time.

## 2. A complete actual-root interval without a shared guard

Let $s_a<t$ be the actual partner root. The root equation and the incoming speed bound give

$$
R=t-s_a=|x(t)+x(s_a)|,
\qquad
|x(t)-x(s_a)|\le t-s_a=R.
$$

Adding the two vectors on the right before applying the triangle inequality yields

$$
2|x(t)|\le |x(t)+x(s_a)|+|x(t)-x(s_a)|\le 2R.
$$

Thus $s_a\le t-|x(t)|$. If a prescribed receiving cylinder gives the positive whole-cell radius floor

$$
r_{\min}=\inf_{t\in I}|\bar x(t)|-e_r>0,
\qquad b=U-r_{\min}<L,
$$

then every actual partner root lies at or below $b$. The radius floor belongs to the independently prescribed receiving trial; it cannot be replaced by an unaccepted output bound from that same step. The conditional incoming speed premise applies to the actual path only and does not clip the receiving-velocity box used in comparison coefficients.

A lower face must be certified separately. Choose $a<b$ in completed source history and enclose the actual root residual

$$
F_a(t)=t-a-|x(t)+x(a)|.
$$

If its whole-cell lower bound is strictly positive, monotonicity of the actual partner-root residual and the original root-existence premise imply $s_a>a$. One convenient sufficient test uses radius bounds alone:

$$
L-a-M_I-M_a>0,
\qquad
M_I=\sup_{t\in I}|\bar x(t)|+e_r,
\qquad
M_a\ge |x(a)|.
$$

The endpoint bound $M_a$ can be the prescribed comparison norm at $a$ plus the completed intrinsic radius-error bound at $a$, including both adjacent closed bins when $a$ is a seam. This test needs no alignment angle, actual acceleration, or future source value. A tighter full-vector residual enclosure is also admissible if every input to it is already certified. In either case, retain the actual numerical lower bound rather than only a pass flag.

It follows that every actual root belongs to $P=[a,b]\subset(-6,L)$ when the finite-history lower limit $-6$ used by the present instrument is retained. The all-past physical preparation is still unchanged; the root theorem and this positive lower face justify why earlier emissions do not occur in this receiving cell. Failure of a candidate lower face is a failed sufficient bracket, not evidence that the actual root crosses that face.

Claim grade: derived. The two displayed inequalities establish complete actual-source coverage under the original root census and prescribed radius premise. Falsifiers are a nonpositive lower residual bound, $b\ge L$, a receiving trial without a positive radius floor, or an incoming actual history that does not satisfy the original speed/root premise.

## 3. Freeze the physical source errors before comparing clocks

At the fixed reception, denote the rotated actual negative-label source by $Y_a(s)$ and its prescribed comparison by $Y_c(s)=-\bar x(s)$. Complete closed-bin physical inventories over $P$ supply intrinsic radius, velocity-norm, and acceleration-norm errors $s_r,s_v,s_a$. Let $R_P,V_P,A_P$ bound the comparison source position, physical velocity, and physical acceleration norms on $P$. Let $\Psi_P$ bound the source-to-receiver angular discrepancy for every $s\in P$ and $t\in I$.

The angular discrepancy includes every intervening completed bin, both sides of every closed seam, any negative-time segment, and the current receiving trial's angular-rate contribution. It is not an endpoint angle sample. The existing fixed-reception alignment estimate then gives

$$
e_X=s_r+R_P\Psi_P,
\qquad
e_V=s_v+V_P\Psi_P,
\qquad
e_A=s_a+A_P\Psi_P.
$$

These are physical source position, velocity and acceleration errors. They are frozen after certifying $P$. In particular, extending a comparison-clock search interval must not ask for new physical source bins or enlarge these errors using times outside $P$.

At the actual root define the fixed vectors

$$
c=Y_a(s_a)-Y_c(s_a),
\quad d_v=Y_a'(s_a)-Y_c'(s_a),
\quad d_a=Y_a''(s_a)-Y_c''(s_a).
$$

Their norms are bounded by $e_X,e_V,e_A$. Source replacement changes $d_v,d_a$ at the fixed actual root first; it does not shift the argument of the actual acceleration. Subsequent clock comparison changes the argument only of the prescribed comparison. This order is why no bound on actual jerk is needed. The vectors depend on the fixed reception, but no derivative of them is taken in this pointwise field comparison.

## 4. The sequential mean-value identity

Use physical negative-label source variables. For a relative displacement $r=X-Y(s)$ define $R=|r|$, $n=r/R$, $v=Y'(s)$, $a_s=Y''(s)$ and $D=1-n\cdot v$. The actual opposite-polarity acceleration is

$$
E=G+B a_s,
\qquad
G=-\frac{(1-|v|^2)(n-v)}{R^2D^3},
\qquad
B=\frac{DI-(n-v)n^{\mathsf T}}{RD^3}.
$$

The implemented coordinate remains $p=u+q$, where $u$ is the physical receiving velocity and $q=(n-v)/(RD)$. Its [exact transformed response](../evidence/maxwell-e-first-event-neutral-velocity-transform-theorem.md) is $H=G+L_0+(n\cdot u)Ba_s$. Here $L_0$ is the geometric part of $q'$ at fixed source velocity, as explicitly defined in that theorem. Delayed physical acceleration remains present in $H$ and in original E reconstruction. The alternative receiver-dependent transformation in the earlier Hale reference is not used.

Let $F$ stand for $q$, $H$, or $E$, with $u$ included as an independent argument when needed. At the actual root, replace the actual source velocity and acceleration by their comparison values at the same root. The difference is exactly

$$
\Delta_{VA}F
=\int_0^1\left[F_v\,d_v+F_{a_s}\,d_a\right]_{\eta}\,d\eta,
$$

where the integrand uses $v=Y_c'(s_a)+\eta d_v$, $a_s=Y_c''(s_a)+\eta d_a$, the actual relative position, and actual receiving velocity. For $q$, $F_{a_s}=0$. Every member of this replacement family needs positive $R,D$; checking only its endpoints is insufficient.

After this replacement the position at the actual root equals that of the translated prescribed source $Y_c(s)+c$. Absorb that translation into an effective receiving argument and define

$$
z_\lambda=X_c+\lambda(\delta X-c),
\qquad
t-s_\lambda=|z_\lambda-Y_c(s_\lambda)|,
\qquad 0\le\lambda\le1.
$$

At $\lambda=1$, $s_\lambda=s_a$; at $\lambda=0$, it is the nominal comparison partner root. Equivalently, use receiving arguments $X_c+\lambda\delta X$ and source translations $\lambda c$. Thus a radial receiving segment together with the entire independent source-offset ball encloses all intermediate relative arguments. The source offset, including its transverse part, is never reduced to a radial interval.

At fixed receiving time, implicit differentiation of the prescribed root gives

$$
\frac{\partial s}{\partial z}=-\frac{n^{\mathsf T}}D,
\qquad
\frac{\partial r}{\partial z}=I+\frac{v n^{\mathsf T}}D.
$$

Consequently its complete spatial derivative is

$$
\mathcal D F
=F_r\left(I+\frac{v n^{\mathsf T}}D\right)
-\left(F_v a_s+F_{a_s}j_s\right)\frac{n^{\mathsf T}}D,
\qquad j_s=Y_c'''(s).
$$

The derivative $F_r$ includes the change of the unit direction with $r$. Only prescribed jerk $j_s$ occurs. On piecewise polynomial comparison histories, complete closed-cell derivative bounds and compatible position/velocity/acceleration values justify the corresponding Lipschitz estimate across jerk seams. A single sampled jerk value does not.

The spatial difference is the exact integral

$$
\Delta_XF=\int_0^1\mathcal D F(z_\lambda,u_a)\,(\delta X-c)\,d\lambda.
$$

For $H$, finish by replacing receiving velocity at the nominal receiving position and nominal clock. Its difference is $\int_0^1H_u(X_c,u_c+\eta\delta u)\,\delta u\,d\eta$. The [nominal receiving derivative identity](../evidence/maxwell-e-first-event-neutral-nominal-receiver-theorem.md) $H_u=q_X$ therefore retains exactly its original scope. For $E$ and $q$, this final difference vanishes. The three displayed differences telescope to the complete actual-minus-comparison field difference.

## 5. What the comparison-clock certificate must contain

A closed initial comparison bracket $J$ must contain every translated nominal root needed above and must be linked to the known actual root. One simple implementation is to require $P\subseteq J$, verify strict opposite residual signs at the two faces for every prescribed receiving/source-offset parameter, and verify positive nominal $D$ throughout $J$. The actual root belongs to this bracket because it is a root of the translated nominal equation with the frozen true $c$ and is already known to lie in $P$. Interval root contraction can then produce $C\subseteq J$ containing all the same roots. There is no requirement that the contracted $C$ contain all of the overestimated interval $P$.

An implementation with $P\nsubseteq J$ needs an additional uniqueness/linking proof on a connected domain containing both $P$ and $J$. Two separate brackets, each containing a root, do not by themselves identify those roots. Requiring $P\subseteq J$ is the preferred simple contract for this bounded attempt.

Every query on $J$ or $C$ must stay within the immutable prescribed comparison's available domain. The root equation itself, with positive root range, gives $s_\lambda<t$ for each root. The interval box $C$ may overlap a receiving-time face because different roots correspond to different receiving times; a blanket requirement $\sup C<L$ is unnecessary. A positive whole-family range floor and denominator floor remain mandatory, as do existence, uniqueness and coverage of every intermediate root. Neither $J$ nor $C$ is clipped by the actual mirror bound.

There are two admissible coefficient constructions. The simplest retains the existing complete coefficient helpers over $C$, using the unchanged radial receiving box, the full frozen source-position offset ball, prescribed source V/A/J on $C$, and the frozen $e_V,e_A$ in fixed-root replacement families. Those replacement boxes over $C$ contain the actual replacement family at $s_a\in P\cap C$, even though physical errors have been established only on $P$. They are conservative algebraic boxes, not claims of physical error bounds outside $P$. A more selective construction may evaluate replacement coefficients on $P\cap C$ and spatial coefficients on $C$, but that extra refinement is not needed for this theorem.

For component projections, the actual source-frame directions must enclose the prescribed source direction at $s_a$. They may be enclosed on $P$, on $C$, or their intersection, provided the actual-root inclusion has been established. The source error magnitudes and comparison norm multipliers $R_P,V_P,A_P$ still come from $P$. Receiver-frame and root-ray matrices must enclose their entire respective coefficient families. If an implementation combines matrices and axes from separate boxes, their Cartesian product is a valid conservative enclosure; their centers alone are not.

## 6. The unchanged error and reconstruction inequalities

Let $C_q,C_H,C_E$ bound the prescribed-clock spatial derivative norms of $q,H,E$ over the full comparison family. Let $V_q,V_H,A_H,V_E,A_E$ bound the corresponding fixed-root physical source V/A replacement derivatives. Let $U_H$ bound the nominal receiving-velocity derivative of $H$. The sequential identity gives

$$
f_q=C_qe_X+V_qe_V,
\qquad
|\delta q|\le C_qe_r+f_q,
\qquad
e_u\le e_p+C_qe_r+f_q.
$$

Here $e_p$ bounds the transformed intrinsic velocity error and $e_u$ is the reconstructed physical velocity error. With the unchanged same-comparison residual bound $\delta$, the transformed source forcing and physical acceleration error obey

$$
f_H=\delta+C_He_X+V_He_V+A_He_A,
\qquad
|\delta H|\le C_He_r+U_He_u+f_H,
$$

$$
e_{\mathrm{acc}}\le \delta+C_E(e_r+e_X)+V_Ee_V+A_Ee_A.
$$

The last inequality is original physical E reconstruction. It must not substitute transformed acceleration, transformed velocity, or an acceleration error sampled only at a nominal root for the completed physical source acceleration. Its coefficient family uses the same frozen offsets and complete comparison-clock coverage as the transformed construction.

The signed current block, logarithmic-norm transport, integrated-radius closure, component refinements, and angular-density formulas can retain their previously proved forms: their proofs consume these complete derivative families and frozen source forcing, rather than the unnecessary equality of the two source intervals. Strict improvement of prescribed radius, transformed-state and physical-velocity trials remains necessary. The initial transformed error at a restart must likewise be recomputed with the split source/clock contract and the unchanged completed physical history.

Claim grade: derived. The shared old-history inequality on $C$ is removable under Sections 2–5, because all actual data occur at $s_a\in P$ and every shifted argument belongs to the prescribed comparison. Falsifiers are a physical source query outside $P$, a nominal intermediate root missing from $C$, an actual-root identification gap, a missing transverse offset, a nonpositive $R$ or $D$ family, an omitted actual acceleration error, or a mismatched comparison residual/history identity.

## 7. Exact controls and bounded interpretation

A stationary geometric control separates the interval roles without claiming a new physical solution. Let actual mirror paths be $x(s)=(2,0)$ for root geometry, receiving time $t=41/10$, and completed cursor $L=4$. The actual partner root is $s_a=1/10$ and the actual mirror upper bound is $b=21/10<L$. The lower face $a=0$ gives exact residual $1/10>0$. Thus $P=[0,21/10]$ is a valid actual root enclosure. These stationary paths are a root-geometry control, not an E solution.

Take the identical stationary prescribed comparison and deliberately conservative frozen source-position error box with each component bounded by $79/20$. The translated relative vectors lie in $[1/20,159/20]\times[-79/20,79/20]$, so their complete range remains positive and the nominal source denominator is exactly one. The offset giving relative vector $(1/20,0)$ has prescribed root $s=81/20=4.05>L$. That root is harmless for evaluating a complete prescribed stationary comparison, even though physical source support remains earlier than $L$. Applying the mirror upper bound $21/10$ to that translated root would delete a required family member. The norm error bound can conservatively contain this box by using $79\sqrt2/20$; alternatively the box is an over-enclosure of a Euclidean error ball of radius $79/20$, whose axial endpoint still gives the exhibited root. The example's purpose is logical separation, not coefficient sharpness.

Additional known-first controls for an implementation are a failed actual lower residual; a nonpositive trial radius; an actual interval crossing the physical cursor; omission of an adjacent closed source bin; a comparison root or jerk query beyond prescribed coverage; a denominator-zero family; a retained transverse source offset; and a physical delayed-acceleration perturbation with nonzero tangential E response. They test distinct mathematical obligations and precede any target replay.

The recorded failure of the old shared guard is diagnosed in the [independent assessment](maxwell-e-first-event-independent-assessment.md#static-diagnosis-of-the-shared-source-guard). Removing that guard alone is not sufficient: a valid replacement must supply the actual lower face, the mirror upper face, frozen completed physical errors, a linked complete comparison root family, all coefficient floors, and the strict receiving enclosure. Only a fresh failed-cell application can establish which of those conditions holds numerically. Even a successful next cell establishes a finite conditional interval, not binding, an actual first event, or all-future fate.

## 8. Frozen implementation contract and review boundary

The subject mathematical contract consists of Sections 1–7 and this interface inventory. It is frozen before disclosure to the independent reviewer. A later independent review may identify a correction, which must be recorded explicitly rather than silently rewriting the frozen proposition.

| Interface or record | Required content |
| --- | --- |
| Actual bracket | $P$, the prescribed whole-trial $r_{\min}$, strict $b<L$, and a positive lower-face actual residual certificate |
| Source inventory | Every closed physical source bin intersecting $P$, initial/negative history treatment, physical X/V/A errors and components, source norms, and complete angular support |
| Frozen offsets | $e_X,e_V,e_A$ computed from that inventory before nominal root replacement |
| Comparison bracket | $J$, complete comparison-domain bounds, actual-root linkage, every-parameter face signs and positive nominal denominator throughout the bracket |
| Contracted clock | $C$, whole-family positive range and denominator, prescribed X/V/A/J coverage, and no mirror clipping |
| Coefficients | The existing q/H/E mathematical functions on their complete families, with independent full source offsets and physical source A retained |
| Recurrence | Original residual and immutable history bindings, strict radius/transformed/physical-velocity acceptance, physical A reconstruction and angular-density update |
| Failure receipt | The first failed obligation with all inputs needed to reproduce it, distinguished from an actual physical event |

No target outcome is asserted in this frozen subject. The original physical prefix, comparison defect certificates, source-transfer identities, and original source files remain untouched. This document owns only the mathematical refinement; new implementation and independent review retain separate ownership.
