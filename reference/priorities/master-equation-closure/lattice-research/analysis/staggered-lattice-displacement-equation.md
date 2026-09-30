# The displacement equation of the staggered lattice

The alternating cubic population has an exact family of motions in which each polarity sublattice translates along one coordinate axis. One displacement function determines every position, but its acceleration depends on the full earlier displacement history. This reduction retains the three-dimensional population and every causal source.

The equation is regular along the accepted incoming motion. The first arrival at wake speed introduces a different issue: a hypothetical smooth continuation would begin to receive its own recent path history with an unbounded acceleration contribution. This is an obstruction to the proposed continuation. It supplies neither a finite jump nor an outgoing trajectory.

## 1. Geometry, history and claim scope

Use unit cubic anchors $i=(i_1,i_2,i_3)\in\mathbb Z^3$, polarity $\sigma_i=(-1)^{i_1+i_2+i_3}$, positive coupling $g=16$, and normalized wake speed $c_f=1$. Let $e_3=(0,0,1)$. The motion is

$$
\mathbf X_i(t)=i+\sigma_i q(t)e_3.
\tag{1}
$$

Here $q(t)$ is the upward displacement of the positive-polarity group; the negative-polarity group has displacement $-q(t)$. Their velocities and accelerations are $\sigma_i q'(t)e_3$ and $\sigma_i q''(t)e_3$. Equal-polarity labels retain their simultaneous anchor separation. This common acceleration is obtained from symmetry of the Master Equation; no rigid-body constraint is added.

The accepted incoming branch has a complete, self-consistent past with

$$
q(t)=a e^{\lambda t}+O(a^2e^{2\lambda t}),\qquad
a=2^{-40},\qquad t\le0,
\tag{2}
$$

including corresponding bounds for the first two derivatives. The positive number $\lambda$ is the growing-mode rate derived below. The [incoming-history construction](smooth-two-particle-incoming-reachability.md) proves this nonlinear history; the [first-event certificate](staggered-lattice-first-event.md) follows it to its first wake-speed arrival.

**Claim grade: derived.** The scalar equations below follow from the [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), the exact symmetry (1), and the stated convergence and simple-root conditions. The local outgoing expansion is conditional on a hypothetical smooth extension and is used to contradict that extension. The numerical event bounds are imported from the independently accepted first-event certificate, not obtained by a new simulation here. Checkable falsifiers appear in Section 8.

## 2. The exact equation includes a sum over causal roots

Fix a positive-polarity receiver. For source offset $d=i-j$, define

$$
\begin{aligned}
\sigma_d&=(-1)^{d_1+d_2+d_3},&
p_d&=d_1^2+d_2^2,\\
z_d(t,s)&=d_3+q(t)-\sigma_dq(s),&
r_d(t,s)&=\sqrt{p_d+z_d(t,s)^2}.
\end{aligned}
\tag{3}
$$

The source was at height shifted by $\sigma_dq(s)$ when it emitted. A received wake must have traveled the actual source-to-receiver range in the elapsed time. Its admissible emission set is therefore

$$
\mathcal R_d[q;t]
=\{s<t:\ r_d(t,s)=t-s>0\}.
\tag{4}
$$

For every such root define its vertical direction and transmitter denominator by

$$
n_d(t,s)=\frac{z_d(t,s)}{r_d(t,s)},\qquad
D_d(t,s)=1-\sigma_dn_d(t,s)q'(s).
\tag{5}
$$

The root is simple when $D_d\ne0$. The denominator measures how rapidly the source crosses the causal condition as its emission time varies. The vertical acceleration contributed by this root is

$$
a_d(t;s)=
\frac{g\sigma_d\,n_d(t,s)}
{r_d(t,s)^2|D_d(t,s)|}.
\tag{6}
$$

The absolute value is part of the unchanged law. It cannot be removed on an arbitrary chart merely because it was positive on the incoming one.

Where all retained roots are simple and the complete sums converge with the original spatial prescription, the scalar equation is

$$
\boxed{
q''(t)=
g\sum_{d\ne0}^{\mathrm{blocks}}\sigma_d
\sum_{s\in\mathcal R_d[q;t]}
\frac{n_d(t,s)}{r_d(t,s)^2|D_d(t,s)|}
+
g\sum_{s\in\mathcal R_0[q;t]}
\frac{n_0(t,s)}{r_0(t,s)^2|D_0(t,s)|}.
}
\tag{7}
$$

The first sum includes every distinct-label source. The second includes every positive-delay own-history root, with polarity product $+1$. The exact diagonal $s=t$, $r_0=0$ is excluded. Transverse reflection pairs the complete source and root sets, canceling their horizontal components. Negative-polarity receivers obtain the opposite acceleration by the accepted inversion symmetry.

Equation (7) is a simple-root expression of the law. It does not extend that expression through a multiple root, an undefined infinite sum, or a zero-range boundary by notation alone. A disappearance or creation of roots must be analyzed through (4); one may not retain only the root that continued from an earlier chart.

### 2.1 The regular incoming equation

On the certified incoming branch, $0<q<1/2$ and $0<q'<1$. Every distinct-label channel has exactly one positive-delay root $s_d(t)$, its transmitter denominator is positive, and the entire positive-delay own-root set is empty. The [domain argument](smooth-two-particle-incoming-reachability-domain.md#1-an-exact-two-sublattice-history-family) proves these facts from the complete history, rather than from a finite memory window.

The acceleration can then be written as

$$
q''(t)=gS(q(t))+C_+[q](t)+C_-[q](t).
\tag{8}
$$

The stationary receiver field $S$ is retained with its original eight-source block prescription:

$$
S(u)=
\sum_{d\ne0}^{\mathrm{blocks}}
\sigma_d\,
\frac{d_3+u}
{[p_d+(d_3+u)^2]^{3/2}}.
\tag{9}
$$

The two changing-source corrections are

$$
C_\varepsilon[q](t)=
g\sum_{\substack{d\ne0\\\sigma_d=\varepsilon}}
\sigma_d
\left[
\frac{n_d(t,s_d)}
{r_d(t,s_d)^2D_d(t,s_d)}
-
\frac{d_3+q(t)}
{[p_d+(d_3+q(t))^2]^{3/2}}
\right],
\qquad \varepsilon\in\{+1,-1\}.
\tag{10}
$$

Thus $C_+$ measures the change caused by same-polarity source histories relative to stationary sources at their anchors; $C_-$ measures the corresponding opposite-polarity change. Each is an absolute sum because distant sources are sampled exponentially far into the small ancient history. Equation (8) retains the full stationary term and does not separately reorder its nonabsolute individual rows.

The distinction matters when interpreting an allocation. The three terms $gS$, $C_+$ and $C_-$ add to the acceleration exactly in this reference decomposition. The correction $C_+$ alone is not the entire acceleration from same-polarity sources, and $C_-$ alone is not the entire opposite-polarity acceleration.

## 3. Why displacement alone does not determine acceleration

Equations (3)–(10) use $q(t)$, many earlier values $q(s_d)$ and the source velocities $q'(s_d)$. The emission times themselves are solutions of equations containing that history. Therefore the scalar evolution is a state-dependent delay differential equation, meaning that both the delayed inputs and their delays depend on the evolving path. It is not generally an ordinary equation $q''=A(q)$.

Along the one accepted monotone branch, $q$ can be used as a parameter: write $t=T(u)$ and plot $q''(T(u))$ against $u=q(t)$. That graph describes this branch only. It carries its already selected history implicitly and does not supply the acceleration for another history passing through the same displacement. Even the pair $(q(t),q'(t))$ does not replace the required earlier source record.

There is nevertheless a local method of continuation on the regular chart. Positive cross ranges place the emissions a definite time earlier than the receiver. Over a sufficiently short new reception interval, all those emissions belong to the already constructed past. The receiver then solves an ordinary second-order equation with that earlier history held as known data. Advancing the history repeats this local construction; it does not remove history dependence from the full problem.

### 3.1 Root sensitivity and the receiver playback factor

Put

$$
H_d(t,s)=t-s-r_d(t,s).
$$

At a positive simple root, differentiation gives

$$
\partial_s H_d=-D_d,\qquad
\partial_t H_d=1-n_dq'(t),
\qquad
\frac{ds_d}{dt}
=\frac{1-n_dq'(t)}{D_d}.
\tag{11}
$$

The numerator is the receiver playback factor: it controls the rate and orientation with which reception follows the sequence of earlier emissions. The denominator is the transmitter factor already present in the acceleration weight. These two roles are different.

For a history variation $h$, differentiation at fixed reception time gives

$$
\delta s_d
=-\frac{n_d\,[h(t)-\sigma_dh(s_d)]}{D_d}.
\tag{12}
$$

This formula includes the shift of the delayed source evaluation itself and is one reason a current-displacement derivative cannot stand in for a variation of the full history.

When $|q'(t)|<1$ and all source speeds are also below one, both factors in (11) are positive. The roots move continuously and smoothly with the path; they do not jump between branches. A zero receiver numerator with $D_d\ne0$ makes $ds_d/dt=0$, but it neither sets the instantaneous acceleration to zero nor makes its canonical weight infinite. In contrast, $D_d=0$ destroys the simple-source-root chart.

## 4. Same-polarity geometry and the initial growth allocation

The fixed simultaneous spacing within a sublattice does not cancel its delayed acceleration. For instance, the positive receiver at anchor zero receives from same-polarity anchors $(1,1,0)$ and $(-1,-1,0)$ at the same emission time $s$. Let $z=q(t)-q(s)>0$, $r=t-s=\sqrt{2+z^2}$, and $D=1-(z/r)q'(s)>0$. Their horizontal contributions cancel, while their vertical contributions add to $2gz/(r^3D)>0$. This finite pair establishes the failure of pairwise cancellation from present geometry alone; it does not determine the complete nonlinear same-polarity sum.

For the initial growth, the full linear calculation gives a precise allocation. Let $\rho_d=|d|$ denote the fixed anchor distance and $\nu_d=d_3/\rho_d$ its vertical directional component. Linearizing one signed changing-source correction at the stationary history gives

$$
g\left[
-\frac{1-3\nu_d^2}{\rho_d^3}h(t-\rho_d)
+\frac{\nu_d^2}{\rho_d^2}h'(t-\rho_d)
\right].
\tag{13}
$$

The sign of the source displacement and velocity cancels the explicit source polarity, giving the same formula in either parity class. Each fixed-distance shell has one parity because $|d|^2$ and $d_1+d_2+d_3$ have the same parity. Cubic symmetry gives $\sum\nu_d^2=N_\rho/3$ on a shell of $N_\rho$ offsets. The position terms cancel on that shell. Exponential ancient decay permits this regrouping of the absolute changing-source derivatives, so

$$
DC_\varepsilon[0]h(t)=
\frac g3\sum_{\substack{d\ne0\\\sigma_d=\varepsilon}}
\frac{h'(t-\rho_d)}{\rho_d^2}.
\tag{14}
$$

The full stationary derivative satisfies $S'(0)=0$. Define the two positive, convergent series

$$
B_\varepsilon(\lambda)=
\sum_{\substack{d\ne0\\\sigma_d=\varepsilon}}
\frac{e^{-\lambda\rho_d}}{\rho_d^2},
\qquad \lambda>0.
\tag{15}
$$

For $h(t)=a e^{\lambda t}$, the linear equation becomes

$$
\lambda=\frac g3\,[B_+(\lambda)+B_-(\lambda)],
\qquad
f_\varepsilon=
\frac{B_\varepsilon(\lambda)}
{B_+(\lambda)+B_-(\lambda)}.
\tag{16}
$$

The number $f_\varepsilon$ is the fraction of the linear growing-mode acceleration supplied by the corresponding changing-source correction. Both fractions are positive and sum to one. The nearest opposite-polarity shell contributes $6e^{-\lambda}$ to $B_-$; the nearest same-polarity shell contributes $6e^{-\lambda\sqrt2}$ to $B_+$. All farther shells remain in (15). The fractions describe the small-amplitude growing mode; nonlinear allocation near wake-speed arrival requires evaluating (10) on its certified history.

## 5. An optional complete polarity allocation with a specified cutoff

A complete same-polarity versus opposite-polarity allocation can also be defined, provided its stationary convention is stated. The accepted mixed stationary sum equals its centered-cube limit. Use that same common cube for both subsets:

$$
S_\varepsilon(u)=
\lim_{M\to\infty}
\sum_{\substack{0<|d|_\infty\le M\\\sigma_d=\varepsilon}}
\varepsilon\, e_3\cdot K(d+ue_3),
\qquad
K(x)=\frac{x}{|x|^3}.
\tag{17}
$$

These separate limits exist for $|u|<1$. The proof is useful because the bare individual rows are not absolutely summable. Each parity subset in a centered cube is invariant under inversion and coordinate permutations. Inversion gives $\sum K(d)=0$ and $\sum D^2K(d)=0$. The matrix

$$
DK(d)=\frac{I-3\widehat d\,\widehat d^{\mathsf T}}{|d|^3},
\qquad \widehat d=\frac d{|d|},
$$

has zero trace. Cubic symmetry makes its sum a scalar multiple of the identity, so the trace makes that sum zero as well.

Subtract the quadratic Taylor polynomial in $u$ before summing:

$$
\begin{aligned}
T_d(u)={}&K(d+ue_3)-K(d)-uDK(d)e_3\\
&-\frac{u^2}{2}D^2K(d)[e_3,e_3].
\end{aligned}
\tag{18}
$$

All three subtracted sums vanish in every finite centered cube. For any fixed $B<1$ and $|u|\le B$, the third derivative of $K$ is bounded on the intervening segments by a constant times $|d|^{-5}$. Consequently

$$
|T_d(u)|\le C_B|u|^3|d|^{-5},
\qquad
S_\varepsilon(u)=
\varepsilon\sum_{\substack{d\ne0\\\sigma_d=\varepsilon}}
e_3\cdot T_d(u).
\tag{19}
$$

The last sum is absolute because $\sum_{d\ne0}|d|^{-5}<\infty$ in three dimensions. This proves the centered-cube limits, their local uniformity and $S_\varepsilon(u)=O(u^3)$. Adding the two finite cube sums and taking the limits gives $S_+(u)+S_-(u)=S(u)$ by the accepted cube/block equality.

The complete sector accelerations in this common centered-cube convention are therefore

$$
A_\varepsilon[q](t)=gS_\varepsilon(q(t))+C_\varepsilon[q](t),
\qquad
q''=A_++A_-.
\tag{20}
$$

Equation (20) follows from a specified common cutoff compatible with the original total law. It does not establish cutoff independence for either nonneutral sublattice by itself. Equation (8) needs no such separate stationary allocation and remains the reference decomposition for the contribution study. Since $S_\varepsilon=O(q^3)$, (20) has the same first-order fractions (16).

### 5.1 An explicit finite-cube tail bound

The centered-cube allocation admits a simple enclosure useful for evaluating (20). For integer $N\ge1$, retain the finite sum

$$
S_{\varepsilon,N}(u)=
\varepsilon\sum_{\substack{0<|d|_\infty\le N\\\sigma_d=\varepsilon}}
\frac{d_3+u}{|d+ue_3|^3}.
\tag{20a}
$$

Fix $|u|\le B<1$ and put $x=B/(N+1)<1$. Then

$$
\boxed{
\left|S_\varepsilon(u)-S_{\varepsilon,N}(u)\right|
\le
\frac{13|u|^3}{N^2}
\left[
\frac4{1-x^2}
+\frac{2x^2}{(1-x^2)^2}
\right].
}
\tag{20b}
$$

To prove the bound, set $r=|d|$ and $c=d_3/r$. The generating function for the Legendre polynomials $P_k$ is $(1-2ct+t^2)^{-1/2}=\sum_{k\ge0}P_k(c)t^k$. Differentiating the expansion of $|d+ue_3|^{-1}$ gives

$$
\frac{d_3+u}{|d+ue_3|^3}
=\sum_{k\ge0}
(-1)^k(k+1)P_{k+1}(c)\frac{u^k}{r^{k+2}}.
\tag{20c}
$$

For $-1\le c\le1$, $|P_k(c)|\le1$. One elementary verification uses the integral representation $P_k(c)=\pi^{-1}\int_0^\pi(c+\mathrm i\sqrt{1-c^2}\cos\theta)^k\,d\theta$: the modulus of the expression in parentheses is at most one. The parity identity $P_k(-c)=(-1)^kP_k(c)$ shows that inversion cancels every even $k$ in (20c). The $k=1$ term cancels by the cubic Hessian identity already proved. These cancellations hold separately in each parity subset of every complete sup-norm shell, including the omitted shells.

The remaining terms have $k=3,5,7,\ldots$. Their per-row absolute majorant is

$$
\frac{|u|^3}{r^5}
\sum_{j\ge0}(4+2j)\left(\frac{|u|}{r}\right)^{2j}
\le
\frac{|u|^3}{r^5}
\left[
\frac4{1-x^2}+\frac{2x^2}{(1-x^2)^2}
\right]
$$

outside the cube, where $r\ge N+1$. The full shell $|d|_\infty=m$ has $24m^2+2\le26m^2$ points and $r\ge m$. Bounding either parity subset by that full shell gives

$$
\sum_{|d|_\infty>N}|d|^{-5}
\le26\sum_{m=N+1}^\infty m^{-3}
\le\frac{13}{N^2}.
$$

This proves (20b). A finite evaluation must still enclose the terms in (20a) and the uncertainty in $u$; the tail bound alone does not establish their numerical accuracy. When computing the opposite sector as $S-S_+$, use the accepted enclosure of $S$ and the enclosed same-polarity sum with their dependence accounted for or conservatively bounded.

## 6. Regular motion, chart boundaries and the own-history obstruction

The scalar history equation has several distinct possible boundaries. Their meanings should remain separate.

| Condition | Mathematical meaning | Consequence established here |
| --- | --- | --- |
| $r_d\downarrow0$ | A causal range collapses toward zero delay | The inverse-square factor becomes singular; the particular geometry must be analyzed. |
| $D_d\to0$ at positive range | A transmitter root loses simplicity | The simple-root formula and implicit source-time chart fail; root multiplicity and summation require separate analysis. |
| $1-n_dq'(t)=0$ with $D_d\ne0$ | Receiver playback has a turning point | The source-time derivative vanishes; this alone is not a divergent acceleration weight. |
| A positive-delay own root emerges from the excluded diagonal | The self-root set changes | The transverse arrival considered below obstructs the proposed smooth continuation. |
| The prescribed infinite sum ceases to converge | The complete population acceleration is undefined in that domain | No finite truncation establishes an extension of the infinite law. |

The stationary reference introduces a separate limit of its representation. For example, $S(u)$ has a pole at the frozen anchor $u=1$, outside the present $|u|<1$ decomposition domain. Such a reference pole need not be a singularity of the actual received interaction: the compensating subtraction in the changed-source term may remove it. Actual causal ranges, transmitter factors, root sets and convergence of their prescribed total determine the law's boundaries. No continuation beyond the certified incoming range $0<q<1/2$ is inferred from this observation.

The accepted branch reaches none of the first two cross-channel boundaries before its wake-speed arrival. Its event time, with the time origin (2), obeys

$$
\frac{1191}{128}<t_*\le\frac{1193}{128}.
\tag{21}
$$

At the event, $q$ and $q'$ have continuous incoming limits, $q'(t_*)=1$, and the incoming acceleration has a finite positive trace

$$
\alpha=q''(t_*^-)>5.9711295686.
\tag{22}
$$

All labels reach unit speed simultaneously by (1). Distinct labels remain separated by more than $0.5088917028$. The incoming cross ranges and transmitter factors have positive bounds. In particular, the event is not a jump of the displacement, a collision, or an incoming cross-root fold.

### 6.1 Local expansion under a hypothetical smooth continuation

Assume for contradiction that $q$ has a $C^3$ continuation satisfying the same law. Set $h=t-t_*$ for the small positive time elapsed since the event, and use $\delta=t-s$ for the own-root delay. These are different quantities. Near the event the velocity is positive, so the own-root direction of the positive receiver is exactly $+e_3$. Its positive-delay causal equation is

$$
q(t_*+h)-q(t_*+h-\delta)=\delta.
\tag{23}
$$

Divide by $\delta>0$ and expand the average velocity using $q'(t_*)=1$ and $q''(t_*)=\alpha$:

$$
\frac{q(t_*+h)-q(t_*+h-\delta)}{\delta}-1
=\alpha\left(h-\frac{\delta}{2}\right)
+O((|h|+|\delta|)^2).
\tag{24}
$$

The derivative with respect to $\delta$ at the origin is $-\alpha/2\ne0$. The implicit function theorem gives one local branch through the excluded diagonal:

$$
\delta(h)=2h+O(h^2),\qquad
s(h)=t_*-h+O(h^2).
\tag{25}
$$

It has positive delay for $h>0$ and negative delay for $h<0$. The latter is inadmissible. Extending the divided equation to $\delta=0$ locates the emerging root; it does not insert a zero-delay self term into the law.

At its source time,

$$
q'(s(h))=1-\alpha h+O(h^2),\qquad
D_{\mathrm{own}}(h)=1-q'(s(h))
=\alpha h+O(h^2)>0.
\tag{26}
$$

The receiver playback numerator is $1-q'(t_*+h)=-\alpha h+O(h^2)$, so (11) gives $ds/dt=-1+O(h)$ on this hypothetical branch. Receptions just after the event would sample emissions just before it in reverse temporal order. The acceleration is still weighted by $1/|D_{\mathrm{own}}|$ without multiplying by that negative receiver factor.

The scalar self acceleration of the positive receiver would therefore be

$$
\boxed{
A_{\mathrm{own}}(t_*+h)
=\frac{g}{\delta(h)^2|D_{\mathrm{own}}(h)|}
=\frac{g}{4\alpha h^3}+O(h^{-2}).
}
\tag{27}
$$

Equivalently, its leading expression in the delay variable is $2g/(\alpha\delta^3)$, since $\delta\sim2h$. The polarity product is positive. The negative-polarity receiver has the same positive projection along its own downward velocity.

An elementary local control checks the factor and sign without using a trajectory solver. For the prescribed polynomial $q(t_*+u)=q_*+u+\alpha u^2/2$, the local root is exactly $\delta=2h$, its emission is $s=t_*-h$, its denominator is exactly $\alpha h$, and its own contribution is exactly $g/(4\alpha h^3)$. This polynomial checks the root algebra; it is not a full-population solution or an admissible complete ancient history.

### 6.2 Why the singular term cannot be canceled here

At the event itself, all earlier speeds are strictly below one. Every positive-length own chord is therefore shorter than its elapsed time, so $\mathcal R_0[q;t_*]$ is empty. The divergent expression (27) belongs to the hypothetical outgoing smooth extension, not to an omitted self contribution at the incoming endpoint.

The [accepted continuation assessment](staggered-lattice-first-event-independent-adjudication.md#14-consequence-for-unchanged-law-continuation) supplies the required bounded cross remainder. A proposed outgoing population in the uniform position neighborhood $|\mathbf X_i-i|\le1/3$ has every distinct-label causal range at least $1/3$. For $0<h<1/6$, its cross emissions precede $t_*-1/6$. They belong to a fixed subunit incoming prefix, with an exponentially decaying remote tail. The stationary field remains regular, and the changing-source sum and its derivatives converge uniformly. Thus the complete cross acceleration remains bounded near the event.

The same uniform position neighborhood bounds own chords from a near outgoing point to the entire incoming history by $1/3+0.24556<2/3$. Sufficiently old emissions therefore cannot produce additional self roots. Strict incoming chord inequalities on the remaining compact old-source interval exclude other roots away from the event. The local root (25) is consequently the only emerging own root under the stated smooth-extension hypotheses.

The positive $h^{-3}$ self contribution cannot be canceled by this bounded cross remainder. It also cannot equal the bounded acceleration of a $C^3$ extension. Equation (27) proves a continuation obstruction by contradiction. It is not a prediction that an actual solution proceeds with infinite acceleration.

### 6.3 No prescribed discontinuity follows

The incoming branch has continuous position and velocity and a finite incoming acceleration. The event calculation does not supply a displacement jump, velocity jump, finite impulse, reflection, or damping rule. A positive contribution proportional to $h^{-3}$ is not locally integrable and cannot be replaced by a finite instantaneous impulse without specifying a different interpretation.

The accepted assessment additionally excludes continuous-velocity continuations with locally absolutely continuous velocity on each compact punctured outgoing interval, and the stated locally finite direct positive-history measure interpretation with bounded-variation velocity. These exclusions retain its uniform population neighborhood and precise measure assumptions. They do not classify every possible distributional extension or every limit involving changed histories or kernels. No such extension is adopted in this derivation.

## 7. What remains three-dimensional

One collective coordinate is enough to describe this symmetry family because every label has a known fixed horizontal anchor. Those horizontal separations remain inside every range in (3). Sources in different columns have $p_d>0$, and their delays and axial acceleration contributions depend on $p_d$. Reflection cancels their total transverse acceleration while preserving their axial contribution.

The [collinear binary](../../collinear-research/analysis/stationary-binary-first-interval.md#scope-and-model) places its two labels and all their received chords on one common line. Removing off-axis lattice sources would change (7), the linear shell cancellation, the characteristic equation and the event history. Thus neither a binary nor one isolated column supplies the full lattice displacement equation.

The own-history calculation (23)–(27) is locally collinear because each identity follows its own straight line. Its mechanism also belongs to the more general curved-path theorem in [the root-birth analysis](../../analysis/smooth-two-particle-next-event-root-birth.md). The shared local obstruction does not identify the global interaction geometry, source count, preparation or event time of the two problems.

## 8. Evidence boundary and falsifiers

The derivation uses the canonical source-weight formula, the accepted stationary cube/block equality and ancient-history convergence, exact coordinate symmetries, differentiation of the causal equation, Taylor expansion, and the implicit function theorem. The polynomial control in Section 6.1 checks the own-root coefficient independently of the saved lattice trajectory. No new numerical evolution is used.

The scalar reduction would fail if reflection did not pair the complete source-root set, if a positive-delay root were omitted from (7), or if an asserted infinite sum did not converge under its declared prescription. The decomposition (8)–(10) is checkable by adding its terms before summation. A different derivative of (4) would falsify (11)–(12); inserting the receiver numerator into (6) would instead change the law.

The parity linear formulas can be checked shell by shell against (13). A shell with mixed parity, a nonzero sum of $1-3\nu_d^2$, or a missing exponential tail would defeat the corresponding step. The optional complete sector allocation requires the common cube in (17); it claims no independent arbitrary-exhaustion limit. A failure of one of its finite-cube Taylor cancellations or the $|d|^{-5}$ remainder bound would falsify that allocation.

The outgoing contradiction depends on the positive finite incoming acceleration, the local root calculation, the exclusion of older self roots and the bounded cross remainder in the declared uniform neighborhood. Failure of one of those premises would prevent that application. An unspecified finite jump or regulator is not a counterexample to the ordinary equation with its fixed complete incoming history. Quantitative acceleration allocations along the incoming branch require their own interval evaluation and actual-history uncertainty; the formulas alone do not supply those measurements.
