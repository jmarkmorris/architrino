# Independent adjudication of the first smooth two-particle response

## Verdict and scope

Accept the [subject](smooth-two-particle-first-response.md) as a conditional theorem for the exact smooth-compatible input already fixed in the [release adjudication](finite-perturbation-release-independent-adjudication.md#6-concrete-control-assessment). The complete population remains stationary through the exact onset

$$
T_*=(\sqrt2-11/8)\ell.
$$

On one common positive interval immediately afterward, exactly 24 environmental labels move: sixteen have a nonzero fifth-order displacement and eight have a nonzero sixth-order displacement. The argument establishes actual receiver motion by controlling its feedback in the full acceleration field and proving a positive displacement projection. Fixed-anchor arithmetic alone would not establish this conclusion.

The appended history is globally $C^3$, preserves the original quantitative class bounds on a sufficiently short response interval, has one root in every distinct-label channel and no positive-delay self root, and receives only emissions from before the original release at zero. The two targets and every other environmental label remain stationary on that interval. All claims retain the fixed complete-block summation prescription; neither that prescription nor the proposed initial class is physically adopted here.

| Claim | Verdict | Accepted boundary |
| --- | --- | --- |
| The profile, amplitude, target labels, and directions are unchanged. | Accept — measured by direct formula comparison and verified reference hashes. | The smooth-compatible first specialization of the earlier review, not its separate mismatch example. |
| Waiting is exact through $T_*$. | Accept — derived. | Acceleration is zero at the onset itself; $T_*$ is the infimum of times of nonzero response. |
| The first receiving shell has 24 labels, split 16/8. | Accept — derived. | Two disjoint squared-distance-two shells, classified by their third coordinate relative to the changed source. |
| Receiver feedback preserves the computed leading response and yields actual nonzero motion. | Accept — derived. | The common regular field, weighted integral estimate, and positive projection below are required. |
| Global $C^3$ joining and original class bounds hold through a positive response duration. | Accept — derived conditional on the established local theorem and fixed summation. | Duration depends on the fixed coupling and finite uniform field bounds; no numerical duration is certified. |
| The complete root census and absence of received postrelease emissions hold. | Accept — derived. | Whole-past speed and displacement estimates supply all-channel inequalities, not a finite root search. |
| Finite sampled row checks prove an interval bound or EOM trajectory. | Reject as an inference; the subject does not make it. | They are arithmetic checks only. The analytical estimates carry acceptance. |
| The entire pulse, later coupled evolution, contact, or physical class selection follows. | Reject as an inference. | The proved response is an initial positive segment only. |

No mathematical correction to the subject is required at this scope. This review independently reconstructs the timing, geometry, expansions, interval estimates, and feedback argument. The subject's numerical samples and checker results are provenance, not independent theorem evidence.

## 1. Identity of the input and the endpoint polynomial

The lattice has labels $j\in\mathbb Z^3$, anchors $\mathbf z_j=\ell j$, alternating polarity signs $\sigma_j=(-1)^{j_1+j_2+j_3}$, and coefficient $G=\kappa q_0^2>0$. Set $c_f=1$. The only changed complete pasts belong to $E=\{0,e_1\}$, both displaced along $\mathbf e=(0,0,1)$:

$$
\mathbf X_j(s)=\mathbf z_j+\varepsilon\ell\mathbf e\phi(s/\ell)
\quad(j\in E),\qquad
\varepsilon=2^{-16},\qquad
\phi(t)=\psi\big(8(t+5/4)\big),
$$

$$
\psi(v)=
\begin{cases}
v(1-v^2)^4,&|v|<1,\\
0,&|v|\ge1.
\end{cases}
$$

Every other complete past is stationary. Direct comparison with Section 6 of the frozen release review confirms these exact labels, directions, amplitude, and profile. Its SHA-256 matches the subject's input manifest, as do all five other reference hashes. The input is not changed by translating the later analysis to a new time cut.

The fourth-order endpoint zeros give $C^3$ joining of the prescribed bump to zero, with support $[s_a,s_b]=[-11\ell/8,-9\ell/8]$. The established complete-past bounds are displacement $\varepsilon\ell$, speed $\nu=5/512$, acceleration $3/(8\ell)$, and jerk $27/(2\ell^2)$, strictly below the original [class](population-history-class.md) bounds. These are bounds on prescribed pasts; they do not assert that those pasts solve the EOM.

Put $u=(s-s_a)/\ell$. Then $8(s/\ell+5/4)=-1+8u$ and

$$
1-(-1+8u)^2=16u(1-4u).
$$

Multiplication by $\varepsilon=16^{-4}$ therefore gives the exact scaled displacement

$$
p(u)=(-1+8u)u^4(1-4u)^4
=-u^4+24u^5-224u^6+1024u^7-2304u^8+2048u^9.
$$

The target velocity is $p'(u)\mathbf e$ and its acceleration is $p''(u)\mathbf e/\ell$. For $0<u\le1/64$,

$$
\tfrac12u^4\le-p(u)\le u^4,\qquad
2u^3\le-p'(u)\le4u^3,\qquad |p''(u)|\le14u^2.
$$

For the first inequality, $(1-8u)(1-4u)^4\ge(7/8)(15/16)^4>1/2$. Direct differentiation yields $p'=-4u^3AB$, with $A=(1-4u)^3$ and $B=1-18u+72u^2$. Both decrease from one on the stated interval, and $AB\ge(15/16)^3(1-18/64+72/64^2)>1/2$. Finally $|A'|\le12$ and $|B'|\le18$, so $|p''|\le12u^2+120u^3<14u^2$. These are whole-interval polynomial inequalities, independent of sampled evaluations.

**Grade: derived, with measured identity of the referenced input.** A changed formula or reference digest falsifies the identity claim; a coefficient or factor error in these exact polynomial identities falsifies the endpoint estimates. No profile parameter is adjusted to obtain a response.

## 2. Exact waiting and the first receiving set

At a fixed receiver anchor, a changed source's arrival map is

$$
\mathcal T_{ij}(s)=s+\|\mathbf z_i-\mathbf X_j(s)\|.
$$

Its derivative is $D_t=1-\mathbf n\cdot\dot{\mathbf X}_j(s)\ge1-\nu>0$. Thus it is strictly increasing. Source displacement vanishes at both support endpoints, so the image of that support has exact endpoints

$$
\left[\ell\|i-j\|-11\ell/8,\ \ell\|i-j\|-9\ell/8\right].
$$

This does not approximate the moving source by its anchor inside the support. Monotonicity establishes that no interior emission arrives before its first endpoint or after its second endpoint.

Distance-$\ell$ receptions end at $-\ell/8$, before release. The next distinct lattice distance is $\sqrt2\ell$, whose first support arrival is $T_*$. Larger distances are at least $\sqrt3\ell$. The two targets are nearest neighbors, so their mutual perturbed receptions are already over at zero. In a stationary appended future every received row on $[0,T_*]$ consequently equals its stationary row. At $T_*$ the just-arriving endpoint still has zero displacement, velocity, and acceleration. The prescribed stationary block sum vanishes at each anchor by the accepted mixed-difference and symmetric-cube boundary argument in the [admissibility adjudication](population-admissibility-independent-adjudication.md#2-stationary-cancellation-and-its-summation-scope). Hence the stationary future solves the full equations on this entire closed waiting interval.

Completeness follows globally. The appended history has speed below one and bounded displacement. For a distinct source, the residual $f_{ij,T}(\tau)=\tau-\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|$ increases at least $(1-\nu)$ times elapsed delay, starts negative, and becomes positive in the distant past. It has exactly one root. For the same-label channel it is at least $(1-\nu)\tau$, excluding every positive self root. There is no omitted branch capable of producing an earlier response.

The first [release theorem](finite-perturbation-release-compatibility.md#4-a-common-first-interval-of-coupled-evolution) is not presumed to have a lifespan as long as $T_*$. The stationary extension is verified directly first. At each cut along it, only two pasts are changed and the same uniform class margins hold. The local theorem can therefore be restarted with common bounds, and finitely many overlapping uniqueness intervals cover the waiting interval in its bounded classical comparison class. This does not extend uniqueness to arbitrary singular or nonuniform continuations.

For each changed source define $\mathcal S_j=\{i:\|i-j\|^2=2\}$. A squared-norm-two vector is a permutation of $(\pm1,\pm1,0)$, so each shell has twelve labels. The two shells cannot intersect: subtracting the two squared-distance equations would require $2i_1-1=0$. Their union contains 24 labels and neither target. In one shell there are four vectors with third component zero and eight with third component nonzero. Across the two shells there are therefore eight transverse receivers and sixteen with third component $\pm1$ relative to their arriving source.

**Grade: derived for exact timing, complete waiting census, and the 24-label split.** A second root despite residual monotonicity, a nonstationary received row during the waiting interval, or an integer solution of the intersection equation would falsify the relevant step. The earlier 32-label cut test involved two distance shells and does not count this first response.

## 3. Restart at onset and a complete census afterward

At $T_*$, all receiver positions are their anchors and their velocities, accelerations, and jerks are zero. The only incoming source histories differing from stationary remain the same two old bumps. Range is at least $\ell(1-2\varepsilon)$, source speed is at most $\nu$, every cross channel has one root, and every self residual has normalized gap at least $1-\nu$. Width-$w$ tubes with $w=\ell/256$ have their original range, transmitter, and complement margins with strict slack. Both exact cut matches hold: the newly sampled source endpoint has zero position perturbation, velocity, and acceleration; every other cut row also samples stationary jets. These statements check the local theorem's hypotheses at the translated cut before invoking it.

Its fixed old-emission field has uniform magnitude $K_0$ and receiver derivative bound $L$. The stationary background and its first two derivatives converge by the third finite-difference bound, while each receiver has only two finite changed-source sums. The retained range and transmitter floors and the supplied source jets make those sums uniformly $C^2$. With $K=\max(K_0,\ell^{-1})$, the theorem provides a common positive $h$ satisfying its position-box, separation, speed, and contraction inequalities. In particular it can be chosen so that

$$
h\le\rho=\ell/262144,\qquad
Kh\le1/32,\qquad
5h\le\rho/2,\qquad h/\ell\le1/128.
$$

The right future is $C^3$ and matches the zero left acceleration and jerk at $T_*$. It also matches the already verified smooth join at zero. Thus the complete appended history is globally $C^3$ through the first response.

For $t=T-T_*\in[0,h]$, the construction gives

$$
\|\dot{\mathbf X}_i(T)\|\le Kt\le1/32,
\qquad
\|\mathbf X_i(T)-\mathbf z_i\|\le Kt^2/2\le\rho/2<\varepsilon\ell.
$$

Together with the old input, this gives a whole-history speed bound $\widehat\nu=1/32$ and displacement bound $\varepsilon\ell$. Hence every distinct-label range, at every earlier emission, is at least $\ell\|i-j\|-2\varepsilon\ell$. The residual is globally increasing at rate at least $31/32$. There is exactly one cross root, with

$$
r\ge\ell(1-2\varepsilon),\qquad D_t\ge31/32.
$$

The range bound holds throughout every original width-$w$ tube, and the outside residual magnitude is at least $31w/32>\gamma=w/4$. Each self residual is at least $31\tau/32$, satisfying both the normalized and ordinary self complements. The original complete root constants are therefore preserved, not just relaxed. The zero-delay diagonal is never evaluated.

Moreover,

$$
T\le T_*+h<9\ell/128<\ell(1-2\varepsilon)\le r,
\qquad s=T-r<0.
$$

No emission generated after the original release is received anywhere in this interval. The first-response problem still has a fixed incoming field for each receiver, although every environmental future is solved from its own EOM.

**Grade: derived conditional continuation and all-channel certification.** Falsifiers include a cut mismatch, failure of the global speed or displacement bounds, or a positive causal root violating their monotonicity or range inequalities. A later appearance of received new emissions is outside this interval, not a counterexample to it.

## 4. The anchor calculation and actual receiver feedback

Write $\theta=(T-T_*)/\ell$, $g=G/\ell>0$, and $\mathbf y_i=(\mathbf X_i-\mathbf z_i)/\ell$. For $i\in\mathcal S_j$, put $\mathbf k=i-j$ and $\mathbf n=\mathbf k/\sqrt2$. The anchor's exact old source time is determined by

$$
\sqrt2+\theta-u=R(u)=\|\mathbf k-p(u)\mathbf e\|,
\qquad
D(u)=1-\frac{k_3-p(u)}{R(u)}p'(u).
$$

Here $d\theta/du=D(u)\ge1-\nu$. Thus $u\le(32/31)\theta$ on the interval in use. Range expansion gives $\theta=u-n_3p(u)+O(p(u)^2)$ and $u=\theta+O(\theta^4)$. The source and receiver have equal polarity on squared-distance-two channels. The anchor's complete acceleration, after stationary cancellation, is $G\mathbf Q_i/\ell^2$, where

$$
\mathbf Q_i(\theta)=
\frac{\mathbf k-p(u)\mathbf e}{R(u)^3D(u)}
-\frac{\mathbf k}{(\sqrt2)^3}.
$$

The other changed source's row is stationary at that anchor over the short interval: its nearest-neighbor support receptions are already over, or its next admissible support arrival is no earlier than the squared-distance-three shell.

For $n_3\ne0$, $D^{-1}=1+n_3p'(u)+O(u^6)$, while the direction/range change is $O(u^4)$. Since $\mathbf K(\mathbf k)=\mathbf n/2$,

$$
\mathbf Q_i=-2\mathbf n n_3\theta^3+O(\theta^4).
$$

For $n_3=0$, the current emission direction has third component $-p/R=O(u^4)$, so $D-1=O(u^7)$. The kernel's linear displacement term is $-\mathbf e p/(2\sqrt2)$, giving

$$
\mathbf Q_i=\frac{\mathbf e}{2\sqrt2}\theta^4+O(\theta^5).
$$

These formulas retain the moving source time and canonical transmitter weight. They are not yet statements about a moving receiver.

Define the full scaled receiver field by $\mathbf f_i(\theta,\mathbf y)=\ell\mathscr F_i(T_*+\ell\theta,\mathbf z_i+\ell\mathbf y)$. The actual equation is $\mathbf y_i''=\mathbf f_i(\theta,\mathbf y_i)$, with zero initial displacement and velocity. Its uniformly bounded receiver derivative supplies

$$
\|\mathbf f_i(\theta,\mathbf y)-g\mathbf Q_i(\theta)\|
\le\Lambda\|\mathbf y\|.
$$

If $\|\mathbf Q_i(\theta)\|\le C_m\theta^m$, iterate the integral equation in the weighted bound $\|\mathbf y_i(\theta)\|\le A\theta^{m+2}$. The anchor integral contributes $gC_m/((m+1)(m+2))$ to its coefficient. The feedback contributes at most $\Lambda\Theta^2A/((m+3)(m+4))$ on $[0,\Theta]$. Taking $A=2gC_m/((m+1)(m+2))$ and $\Lambda\Theta^2\le1$ makes this bound invariant. Iteration begins at zero, and convergence to the already unique receiver solution proves the improved order; it is not assumed of that solution.

Feedback in acceleration is consequently $O_g(\theta^{m+2})$ and cannot change the leading order-$m$ anchor term. Integrating the actual equation twice gives

| Receivers | Actual displacement |
| --- | --- |
| Sixteen with $n_3=\pm1/\sqrt2$ | $\mathbf y_i=-(g/10)\mathbf n n_3\theta^5+O_g(\theta^6)$ |
| Eight with $n_3=0$ | $\mathbf y_i=(g/(60\sqrt2))\mathbf e\theta^6+O_g(\theta^7)$ |

The factors are exact integrals: $\int_0^\theta(\theta-v)v^m\,dv=\theta^{m+2}/((m+1)(m+2))$. The corresponding third-coordinate leading displacements are $-g\theta^5/20$ and $g\theta^6/(60\sqrt2)$.

Every label outside $\mathcal S$, including both targets, has identically zero anchor field on this interval. Its constant path solves its receiver equation; bounded classical uniqueness makes it the actual solution. This proves exact stationary support outside the 24 labels, without prescribing the environmental future.

**Grade: derived nonlinear response.** A lower-order feedback term despite the uniform Lipschitz estimate, an erroneous canonical expansion, or a second bounded solution with zero anchor field would falsify the respective conclusion. No sampled trajectory is used.

## 5. Uniform estimates, positive projection, and original bounds

The subject's constants can be checked throughout the interval rather than at sampled offsets. Put $c=32/31$ and use $u\le c\theta<1/64$. On the short displacement segments, $R\ge1$, $\|D\mathbf K\|\le2$, and $D\ge31/32$. Kernel subtraction and $|p|\le u^4$, $|p'|\le4u^3$ give

$$
\|\mathbf Q_i\|\le C_m\theta^m,
\qquad (m,C_m)=(3,8)\ \text{or}\ (4,4).
$$

For the cubic case a bound $6u^3$ suffices before conversion to $\theta$; for the transverse case the weight change is only $O(u^7)$ and $3u^4$ suffices. Indeed $6c^3<8$ and $3c^4<4$.

Differentiating the exact row along a fixed receiver gives $s'=1/D$, $\mathbf n'=-P\mathbf W/(rD)$, and $D'=(\|P\mathbf W\|^2/r-\mathbf n\cdot\mathbf A)/D$. Bounds $4u^3$ and $14u^2$ on scaled source velocity and acceleration yield $\|\mathbf Q_i'\|<20u^2$ in general. In the transverse case $|n_3(u)|\le u^4$ gives $\|\mathbf Q_i'\|<8u^3$. Conversion to $\theta$ is covered in both cases by $32\theta^{m-1}$.

For completeness, the claimed uniform remainder can be reconstructed with explicit coefficient bounds. From the exact polynomial on $[0,1/64]$,

$$
|p(u)+u^4|<28u^5,\qquad |p'(u)+4u^3|<143u^4.
$$

The first coefficient bound is $24+224/64+1024/64^2+2304/64^3+2048/64^4<28$; the derivative bound is $120+1344/64+7168/64^2+18432/64^3+18432/64^4<143$. Since $|u-\theta|\le|p(u)|\le u^4$ and $\max(u,\theta)\le(33/32)u$, these imply

$$
|p(u)+\theta^4|\le40\theta^5,\qquad
|p'(u)+4\theta^3|\le192\theta^4
\quad(0\le\theta\le1/128).
$$

For the cubic case, subtract $\mathbf K(\mathbf k)n_3p'$ from the exact row. The remainder is below $4u^4$, using kernel change at most $2u^4$, direction change at most $2u^4$, and $|D^{-1}-1|\le5u^3$. Conversion costs below $5\theta^4$, and the $p'$ approximation costs at most $96\theta^4$. Their sum is below $128\theta^4$.

For the transverse case, differentiating the kernel twice gives $\|D^2\mathbf K\|\le24$ at range at least one. After subtracting $-\mathbf e p/(2\sqrt2)$, Taylor and weight remainders are bounded by

$$
13u^8+10u^{11}+(64/31)u^7<4u^7.
$$

Together with the bound on $p(u)+\theta^4$, this is below $128\theta^5$. Hence, with $\mathbf b_i=-2\mathbf n n_3$ or $\mathbf e/(2\sqrt2)$,

$$
\|\mathbf Q_i-\mathbf b_i\theta^m\|\le128\theta^{m+1}.
$$

Let $M=\sup\|D_{\mathbf y}\partial_\theta\mathbf f_i\|<\infty$, supplied by the same uniformly bounded second field derivatives. Weighted iteration, the equation, and its derivative give

$$
\|\mathbf y_i\|\le\frac{2gC_m\theta^{m+2}}{(m+1)(m+2)},\quad
\|\mathbf y_i'\|\le\frac{2gC_m\theta^{m+1}}{m+1},\quad
\|\mathbf y_i''\|\le2gC_m\theta^m,
$$

$$
\|\mathbf y_i'''\|
\le32g\theta^{m-1}+M\|\mathbf y_i\|+\Lambda\|\mathbf y_i'\|
\le64g\theta^{m-1},
$$

provided $\Lambda\Theta^2\le1$ and $M\Theta^3\le1$. For $m=3$, the two feedback coefficients after these bounds are at most $0.8g$ and $4g$; for $m=4$, they are at most $4g/15$ and $8g/5$. Both totals fit below the unused allowance of $32g$.

In physical time the common new acceleration and jerk are bounded by $16g\theta^3/\ell$ and $64g\theta^2/\ell^2$. Requiring $g\Theta^3\le16$ and $g\Theta^2\le1024$ therefore preserves the original ceilings $256/\ell$ and $65536/\ell^2$. Old jets already satisfy those ceilings; displacement, speed, separation, and original root certificates have the strict bounds in Section 3. The original environmental envelope and its density consequence also persist. This is preservation for this explicit input, not a claim about arbitrary saturated data.

Finally let $\beta_i=\|\mathbf b_i\|$, equal to $\sqrt2$ or $1/(2\sqrt2)$. Choose additionally

$$
\Theta\le1/(1024\sqrt2),\qquad \Lambda\Theta^2\le1/4.
$$

The exact anchor remainder is then at most $g\beta_i\theta^m/4$. The receiver feedback bound is also at most that amount because $1/4<\beta_i(m+1)(m+2)/(8C_m)$ in both cases. Therefore the actual acceleration's projection on $\mathbf b_i/\beta_i$ is at least $g\beta_i\theta^m/2$. Twice integrating from zero gives

$$
\frac{\mathbf b_i}{\beta_i}\cdot\mathbf y_i(\theta)
\ge\frac{g\beta_i}{2(m+1)(m+2)}\theta^{m+2}>0
\quad(0<\theta\le\Theta).
$$

This proves motion of every one of the 24 receivers on a common interval. All constraints on $\Theta$ are upper bounds with positive solutions for each fixed $g>0$ and finite $K_0,L,\Lambda,M$. Together with the local theorem's bounds, they define one positive duration $\ell\Theta$; they do not claim a duration uniform over unbounded coupling values or a measured numerical lifespan.

**Grade: derived whole-interval estimates and positive-response certificate.** A violation of a polynomial or kernel estimate within its declared interval, a feedback term exceeding its common derivative bound, or failure of the positive projection under all displayed inequalities would falsify this quantitative argument. Agreement at finitely many reception offsets neither proves nor replaces it.

## 6. The exact remaining frontier

The accepted future is $[0,T_*+\ell\Theta]$ with the restrictions above. It includes exact waiting and a positive segment of nonstationary motion, while every arriving emission remains before zero. Thus the earlier concern about unknown arriving source futures does not block this first response.

The immediate mathematical frontier is extension through more of the same first received pulse with moving receivers, retaining root completeness and uniform class bounds. This theorem does not finish that pulse. At a fixed anchor its far support endpoint would arrive at $(\sqrt2-9/8)\ell$, but an actual receiver has already moved; the actual endpoint reception must satisfy the moving-receiver causal equation and is not assigned that fixed-anchor time here.

Later, when received source times become nonnegative, the fixed incoming-field reduction must be replaced by a coupled history estimate. Under a proved later displacement bound $b_{\rm later}$ and horizon $H$, postrelease emissions can come only from anchor distance at most $H+2b_{\rm later}$, a uniformly finite geometric set per receiver. That conditional count does not establish a later self-map or lifespan. The full root derivative still contains the source-acceleration term from shifting the emission time. No later continuation, contact, new law, regulator, or physical class adoption is inferred.

## 7. Evidence and verification

The subject and six mathematical references were frozen before writing this review. The subject SHA-256 is `426294335ebf3eb2b06b813467a8a6868e26fec76ee8d091492256ae8f0e52fe`. The six reference hashes, measured with `shasum -a 256` on the exact listed live files, agree with the subject's frozen manifest. Paths, hashes, and frozen copies are retained under `.tmp/smooth-two-particle-first-response-review/`. Only this adjudication and that assigned scratch directory are authored; all subjects, references, manuscript, and shared trackers remain read-only.

The independent evidence is the exact endpoint substitution, monotone arrival mapping, all-channel residual inequalities, shell geometry, uniform receiver-field reconstruction, weighted integral estimate, kernel and polynomial remainder bounds, and positive projection. No EOM simulation or interval claim from finite samples is used.

Before target validation, `node .tmp/smooth-two-particle-first-response-review/check.mjs known` passed two known formulas and one file link, a fenced-dollar exclusion, invalid-macro and whitespace rejections, the six unit lattice neighbors, a known polynomial product, and a known polynomial derivative. The receipt is `known-check.txt` in the assigned scratch directory. These controls precede the new shell, polynomial, and scalar-constant checks on the review target.

Measured validation: `node .tmp/smooth-two-particle-first-response-review/check.mjs target` passed 208 KaTeX expressions, five relative file targets, delimiter and whitespace checks, the 24-label shell and 16/8 split, the exact onset polynomial and derivative, and the scalar coefficient comparisons used above. Its receipt is `validation.txt` in the assigned scratch directory. File-target checks do not resolve anchors or inspect browser layout. The script evaluates no EOM trajectory or sampled nonlinear receiver response.

Measured input preservation: `shasum -a 256 -c .tmp/smooth-two-particle-first-response-review/input-digests.sha256` returned `OK` for all seven live inputs. `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings, and 30 notes; its output is retained in `content-validation.txt`. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/smooth-two-particle-first-response-independent-adjudication.md` emitted no whitespace diagnostic and returned 1 for the new-file difference. A failed corresponding rerun in these exact scopes would falsify the respective measured claim. The independent analytical reconstruction, rather than these structural checks, carries the acceptance verdict.

Recommended integration: accept the exact waiting interval and the initial positive response interval for this unchanged input, including actual motion of exactly 24 environmental labels, smooth joining, original-class bounds, and complete old-emission census. Keep completion of the received pulse and the later coupled-history frontier separate. This review performs no integration into the manuscript or shared trackers.
