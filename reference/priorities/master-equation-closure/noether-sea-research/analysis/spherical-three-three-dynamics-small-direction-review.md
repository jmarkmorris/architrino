# Independent review of the small-direction perturbation

## Verdict and frozen scope

**Accepted at derived grade, with one nonblocking proof clarification below.** The [small-direction perturbation](spherical-three-three-symmetry-small-direction-perturbation.md) establishes an actual finite-window solution of the normal-constrained delayed law for the declared prepared histories. The perturbed member retains nonzero transverse velocity through the reference event interval, the other five members follow their reference motions exactly, and the resulting simultaneous speed spread at the reference stop is bounded above and below at first order in the direction angle. This is not a stability verdict or a numerical evolution result.

The subject was inspected at SHA-256 `d51513ad71d0404e567ba49913d8cf72ce8a8bfb5f247782ca1826b7fde3c4d2`. The independently accepted [first-turn release](spherical-three-three-symmetry-first-turn.md) is a premise, as assigned by the coordinator; this review does not count rereading that proof as a new independent verification of it. The live Jack K. Hale lens was reread. `shasum -a 256 AGENTS.md` reproduced the startup identity `77640341a63916489efd86e96e4283adeea3af09017eff653df52ce1056df231`, confirming that the fully read startup authority was unchanged. The subject and every earlier instrument/reference remain unedited.

The parameters are $R=K_{\mathrm{int}}=c_f=1$, initial speed $1/4$, and $0<|\eta|\le1/100$. Only one tangent direction changes. The complete prepared past is constant before $T=-1/4$, with the stated smooth interpolation on $[-1/4,0]$. The law is imposed after release, not retroactively on the prepared input. The verified reference supplies $T_*<2/7$, $T_e=T_*+1/32<1/3$, base displacement at most $1/28$, base speed at most $1/4$, and a base meridional acceleration less than $-7/8$ through the post-stop interval.

## Independent fixed-site and projection estimates

Let $\mathbf a_j$ be one receiver's five old stationary partner sites, with signed products $\sigma_j$. The exact fixed-site field is $\mathbf A(\mathbf x)=\sum_j\sigma_j(\mathbf x-\mathbf a_j)/|\mathbf x-\mathbf a_j|^3$. No diagonal source is added. The smallest initial partner separation is $\sqrt7/2$. In the open ball $|\mathbf x-\mathbf x_0|<1/8$, every source distance exceeds $r_0=9/8$; line segments between points in that ball retain the same floor.

For $\mathbf K(\mathbf r)=\mathbf r/|\mathbf r|^3$, differentiation gives

$$
D\mathbf K=|\mathbf r|^{-3}(I-3\hat{\mathbf r}\hat{\mathbf r}^{\mathsf T}).
$$

Its radial eigenvalue is $-2/|\mathbf r|^3$ and its two orthogonal eigenvalues are $1/|\mathbf r|^3$. Hence the five-source derivative norm is bounded by $10r_0^{-3}=5120/729<8$, independently of polarity cancellation.

For two unit-sphere endpoints, radial projection has the exact scalar representation

$$
A_n(\mathbf x)=\frac12\sum_j\frac{\sigma_j}{|\mathbf x-\mathbf a_j|}.
$$

Its magnitude is below $5/(2r_0)=20/9$, and the reciprocal-distance extension has derivative norm below $5/(2r_0^2)=160/81<2$ throughout the ball. Applying that extension along the line segment is legitimate even though the radial identity is only asserted at the two unit endpoints. This avoids implicitly using a sphere identity at interior chord points.

On the tangent bundle of the sphere the equation is

$$
\dot{\mathbf x}=\mathbf v,\qquad
\dot{\mathbf v}=\mathbf A(\mathbf x)-A_n(\mathbf x)\mathbf x-|\mathbf v|^2\mathbf x.
$$

The unit-radius and tangency constraints are preserved: at a unit tangent state, the derivative of $\mathbf x\cdot\mathbf v$ is $|\mathbf v|^2+\mathbf x\cdot\dot{\mathbf v}=0$. The smooth vector field therefore gives local existence and uniqueness on the sphere's tangent bundle away from old sites.

For a perturbed velocity of norm below $1/2$ and the reference velocity of norm at most $1/4$, independent product estimates give field contribution less than $8|\Delta\mathbf x|$, normal-field product contribution less than $5|\Delta\mathbf x|$, and squared-speed product contribution at most $|\Delta\mathbf x|/4+3|\Delta\mathbf v|/4$. Thus the subject's deliberately looser inequality $|\Delta\dot{\mathbf v}|\le14|\Delta\mathbf x|+|\Delta\mathbf v|$ is valid.

## Bootstrap and actual continuation

For $W=4|\Delta\mathbf x|+|\Delta\mathbf v|$, the upper right derivative satisfies

$$
D^+W\le14|\Delta\mathbf x|+5|\Delta\mathbf v|\le5W.
$$

This use of a one-sided norm derivative remains valid when either difference vanishes, including the release event. The initial difference is $W(0)=\tfrac12|\sin(\eta/2)|\le|\eta|/4$. Therefore $W(T)\le|\eta|e^{5T}/4$. The elementary bound $e^{5/3}\le139/24<6$ yields

$$
|\Delta\mathbf x|<3|\eta|/8,\qquad
|\Delta\mathbf v|<3|\eta|/2.
$$

At the largest allowed angle these imply displacement from the original site below $1/28+3/800<1/8$ and speed below $1/4+3/200<1/2$. The state stays strictly inside the bootstrap neighborhood. Its closure is compact and separated from every old source singularity, so the smooth equation continues through $T_e$; these estimates are not conditional on an unproved long-time continuation.

To avoid circular use of the delayed equation, first construct the six fixed-site ordinary solutions: five are the accepted reference solutions, while the sixth is the perturbed solution just bounded. Their fields depend on old source sites, not on the other five current positions. The complete-root argument below then proves that this constructed collection is exactly a solution of the selected delayed law on $[0,T_e]$.

## Nonvanishing transverse velocity

The old five-source arrangement and polarity labels are invariant under reflection in the representative's $xz$ plane. The two like sites exchange, the two non-antipodal opposite sites exchange, and the own opposite site is fixed. Hence $A_y(x,0,z)=0$. Integration of the field derivative along the transverse segment gives $A_y(x,y,z)=c(T)y$ with $|c|<5120/729$; that segment remains in the same ball. The normal multiplier obeys $|\lambda|<1/4+20/9<5/2$, so $|c+\lambda|<10$.

Thus the actual transverse coordinate, not a linearized perturbation approximation, satisfies

$$
y''=q(T)y,\qquad |q(T)|<10,\qquad y(0)=0,\quad y'(0)=\tfrac14\sin\eta.
$$

For $\eta>0$, let $v_0=\sin\eta/4$. The exact integral equation and successive positive-kernel majorization give $|y(T)|\le v_0\sinh(\sqrt{10}T)/\sqrt{10}$. Integrating $y''=qy$ once then gives

$$
y'(T)\ge v_0-10\int_0^T|y(u)|\,du
\ge v_0[2-\cosh(\sqrt{10}T)].
$$

On $T\le1/3$, the hyperbolic-cosine tail after its quadratic term has term ratio at most $5/54$. Consequently $\cosh(\sqrt{10}T)\le79/49$ and $2-\cosh(\sqrt{10}T)\ge19/49>3/8$. Reflection handles negative $\eta$. This independently recovers

$$
|v_y(T)|\ge\frac3{32}|\sin\eta|>0,
\qquad 0\le T\le T_e.
$$

The coefficient $q$ may depend on the actual perturbed solution; neither the majorant nor the lower bound requires it to be a fixed external coefficient. The perturbed member therefore cannot reach zero total speed anywhere in the controlled interval.

## Latitude reversal and the one proof clarification

Initially the perturbed vertical velocity is positive. At $T_e$, the reference signed meridional velocity is below $-7/256$. The subject's sentence deriving $\cos\alpha>3/4$ merely from $\alpha<\pi/4$ is insufficient as stated: that weaker premise only gives $\cos\alpha>1/\sqrt2$. The stronger bound already supplied by the reference repairs the argument without changing assumptions or constants:

$$
\alpha\le\pi/6+1/28
\quad\Longrightarrow\quad
\cos\alpha\ge\sqrt3/2-1/28>3/4.
$$

The first implication uses the unit Lipschitz bound for cosine. The last inequality follows from $\sqrt3/2>11/14$, verified by $147>121$ after squaring. Thus the reference vertical velocity is below $-21/1024$, and the perturbation bound gives $(v_\eta)_z(T_e)<-21/1024+3/200<0$. A vertical sign change occurs before the endpoint. The entire bootstrap ball is separated from the poles, so vertical-velocity reversal is also latitude reversal. Transverse velocity remains nonzero there. No unique latitude-turn time or unique latitude extremum is proved.

This clarification strengthens the written justification of an already valid inequality; it does not alter the claimed event, the constants, or the acceptance verdict. The subject was not edited.

## Complete delayed history and the five unchanged motions

The perturbed prepared curve has the same old stationary site and release position as the reference. Its speed is $\tfrac14|f'(T)|$, where $f'(T)=v^2(4v-3)$ for $v=1+4T\in[0,1]$. This cubic factor ranges between $-1/4$ and $1$, so the full prepared speed is at most $1/4$. The released speed is below $1/2$ by the bootstrap; the other five prepared and released histories have speed at most $1/4$.

For every receiver, each of its five old stationary partner sites remains farther than $9/8$. Its explicit root is $S=T-d_j$, and

$$
-1/4-S=d_j-T-1/4>9/8-1/3-1/4=13/24.
$$

Every arriving source is therefore in its unchanged stationary past, with $D_t=1$. On the complete prepared-and-evolved history through the event, each transmitter has speed strictly below $1/2$. Its delay residual $u-|\mathbf X_i(T)-\mathbf X_j(T-u)|$ increases strictly, with a Lipschitz lower slope greater than $1/2$. Hence the displayed old-source root is the unique partner root. The chord-versus-path-length estimate excludes every positive-delay self root. The sphere diameter bounds all roots by $u\le2$, including a valid antipodal endpoint; the histories are defined for the entire earlier past, so no unsupported history truncation is used.

This closes the decoupled construction as the exact normal-constrained delayed solution. In particular, the changed recent preparation cannot influence the other five during this interval because none of their arriving roots samples it. Their ordinary equations and initial data remain exactly those of the reference, so uniqueness keeps their motions unchanged throughout $[0,T_e]$, not just at release.

## What the speed splitting establishes

At release the perturbation changes the speed derivative from $f(\alpha_0)$ to $f(\alpha_0)\cos\eta$. The difference is positive and $O(\eta^2)$ because $f(\alpha_0)<0$. At $T_*$ the five reference velocities are zero while the perturbed velocity is nonzero, giving the actual simultaneous spread

$$
\frac3{32}|\sin\eta|\le s_{\mathrm{pert}}(T_*)\le\frac32|\eta|.
$$

This is a two-sided first-order bound in $|\eta|$ on the stated small-angle interval, not merely an upper-order estimate. The different orders are consistent: the Euclidean speed norm is nonsmooth at the reference zero velocity. Neither statement establishes exponential separation, instability of an equilibrium, long-time behavior, an unconstrained assembly, or a physical normal-support provider. The perturbed normal support remains bounded by $5/2$ in magnitude; its sign is not inferred from the reference's stronger outward-sign result.

## Scope, falsifiers and preservation

The accepted claim is finite-window sensitivity of an actual constrained release with externally specified prepared histories and a complete ordinary root ledger. It ends at $T_e$ and does not extend beyond the old-source domain. Falsifiers are a violation of the fixed-site derivative bounds inside the stated ball, failure of the reference event premises, an additional partner/self root despite the proved complete-history speed bound, or a permitted trajectory whose transverse velocity vanishes before $T_e$.

This independent reconstruction uses the exact field derivative, a tangent-bundle bootstrap, a scalar Volterra comparison and a separate complete-history argument. No numerical evolution instrument, parameter search, new equation, tangential controller, job or lease was introduced. Only this new dynamics-prefixed companion was authored. The subject's exact bytes and previous references are preserved; the coordinator owns integration into the shared synthesis. This completes the assigned bounded proof adjudication. The only clarification to carry into that synthesis is the stronger cosine-bound justification above.

Measured preservation receipt: `shasum -a 256` after adjudication returned the same subject hash `d51513ad71d0404e567ba49913d8cf72ce8a8bfb5f247782ca1826b7fde3c4d2` and first-turn reference hash `82e30c3da469c692944115074292b3f5a244d7551e11318d972af1276b225b2e` as before adjudication. Measured hygiene: `git diff --no-index --check /dev/null` on this new companion emitted no whitespace diagnostics (status 1 denotes the new-file difference). No mathematical or root-admission blocker remains within the stated interval; integration into the shared synthesis is the next dependency.
