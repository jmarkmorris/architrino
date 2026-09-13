# Independent adjudication of first received environmental feedback

## Disposition

The [generated-feedback continuation](smooth-two-particle-generated-feedback-continuation.md) is accepted for the identical supplied complete past, fixed block prescription and $0<g=G/\ell\le16$. It continues the EOM population through $T=17\ell/16$, receives nonstationary environmental histories generated on the accepted prefix, and proves actual motion of both targets. Their common leading displacement is sixth order after onset; their separation has a positive tenth-order change and positive ninth-order separation velocity on a sufficiently short interval.

Claim grade: derived, conditional on the accepted prefix and its stationary-sum estimates. The full reviewer independently reconstructed the estimates and coefficients without using the author's checker or the separate geometry worker's report. The coordinator captured the reconstruction and accepted the scoped theorem here. The [distance-two adjudication](smooth-two-particle-distance-two-independent-adjudication.md) and [first-response adjudication](smooth-two-particle-first-response-independent-adjudication.md) remain accepted dependencies, not newly recertified findings.

| Claim | Disposition |
| --- | --- |
| Continuation through $17\ell/16$ without reducing $0<g\le16$ | Accepted |
| All received generated source segments belong to the accepted prefix | Accepted |
| Displacement, speed, Lipschitz and jerk estimates | Accepted |
| 144 generated channels, 76 receiving labels and 78 nonconstant histories | Accepted |
| Moving global onset enclosure and exact target onset | Accepted |
| Common sixth-order target motion | Accepted |
| Positive tenth-order separation change and initial separation velocity | Accepted locally after target onset |
| Reflection identities under the fixed summation prescription | Accepted |
| Complete roots, original history class, smooth joins and bounded uniqueness | Accepted within the declared continuation class |
| Arbitrary-history invariance, unrestricted uniqueness, global evolution or physical-domain selection | Not established |

No mathematical correction was required. The reviewer identified one missing TeX backslash in the supplied-past formula; the coordinator repaired it and the reviewer verified the exact one-character change and final subject hash. Both versions are retained as development provenance.

## 1. Independent method-of-steps estimate

Use $c_f=1$, lattice anchors $\ell i$, alternating polarities $\sigma_i=(-1)^{i_1+i_2+i_3}$, targets $E=\{0,e_1\}$ and dimensionless displacements $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$. The fixed supplied pulse is $2^{-16}\ell e_3\psi(8(s/\ell+5/4))$ on each target, where $\psi(v)=v(1-v^2)^4$ for $|v|<1$ and zero outside; all environmental supplied pasts are stationary. The accepted prefix through $h=113/128$ has displacement below $1/1024$ and speed below $1/400$. Its first environmental onset is $\alpha=\sqrt2-11/8$ at the 24 labels $\mathcal S=\bigcup_{c\in E}\{j:\|j-c\|^2=2\}$.

Let $B=1/512$ and $H=17/16$. Cross ranges exceed $r_0=1-2B=255/256$ in lattice units, giving

$$
s\le H-r_0=17/256<h.
$$

Source time here is dimensionless. The source-cut residual is already negative at $h$, because $H-h=23/128<1-B-1/1024$. Its strict monotonicity toward the remote past defines the root using only known prefix histories. No unknown source extension is needed.

The cutoff $17/256<\sqrt3-11/8$ excludes all later environmental responders as nonstationary received sources. Also $H+2B=273/256<\sqrt2$, so only nearest-neighbor generated channels can act. Stationary postrelease emissions still contribute their stationary reference rows; they are not removed from the EOM.

For the old target pulses, the exact correction bound and stationary cubic coefficient satisfy

$$
Q_o=\frac{825}{11238052}<\frac1{13500},
\qquad
C_BB^3<\frac{1400}{512^3}<\frac1{95000},
\qquad
C_BB^3+2Q_o<\frac1{6000}.
$$

Here $C_B=1309/(1-B)^5$ is the accepted stationary-sum coefficient, and the range used for each old subtraction segment exceeds $7/5$. Distance-one old pulses have ended before release.

Because $\alpha>9/256$, each received first-response source offset is less than $1/32$. Its accepted acceleration $g/6400$ and resting onset give

$$
P=\frac{16(1/32)^2}{12800}=\frac1{819200},
\qquad
V=\frac{16(1/32)}{6400}=\frac1{12800}.
$$

These bound received generated displacement and velocity. Using segment range greater than $7/8$, the generated correction simplifies exactly to

$$
Q_g=\frac{2P(8/7)^3+V(8/7)^2}{1-V}
=\frac{1/274400+1/9800}{1-1/12800}
=\frac{464}{4390057}<\frac1{9000}.
$$

Before $L=33/32$, all sampled source times are below $9/256<\alpha$. At most six generated rows therefore imply

$$
\|\mathbf y_i''(t)\|\le \frac g{6000}
+\frac g{1500}\mathbf1_{\{t>L\}}.
$$

Twice integrating from release, including the accepted prefix, yields at the largest admitted coupling and horizon

$$
\|\mathbf y_i\|\le\frac{29}{19200}<\frac1{512},
\qquad
\|\mathbf y_i'\|\le\frac{19}{6000}<\frac1{256}.
$$

These strict comparisons exclude the first displacement exit. The regular source-root chart and bounded velocity give continuation through $H$. The source paths sampled on this interval are already EOM-evolved paths, so this is a method-of-steps construction of delayed coupling, not a prescribed-environment replacement.

The receiver derivative bound in the subject is below $11$ per correction. Eight corrections and $3C_BB^2<1/32$ permit the uniform acceleration Lipschitz constant $89g$. Time differentiation retains

$$
D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,s',
$$

where $\mathbf W$ and $\mathbf A$ are sampled source velocity and acceleration. The bounds $|s'|\le5/3$, $\|\mathbf R'\|\le2/3$, $\|\mathbf n'\|\le16/21$ give $|D'|\le137/168$. Including the stationary subtraction, the differentiated correction obeys

$$
\|\mathbf Q'\|<
\frac{8192}{3087}+\frac{1024}{441}+\frac{256}{343}
<\frac83+\frac73+\frac34<6.
$$

Thus dimensionless jerk is below $49g\le784$. The indicator in the bound does not change the smooth equation. Endpoint flatness and agreement with the accepted equation near the step cut preserve the joined $C^3$ histories.

## 2. Receiving geometry and actual onset

For each exciting center, nearest neighbors of its squared-distance-two shell have squared distances $1,3,5$, with respectively $6,8,24$ receiver labels and $4,3,1$ source neighbors. A unit vector admits four squared-distance-two neighbors, a signed $(1,1,1)$ three, and a signed permutation of $(2,1,0)$ one. This exhausts the possible neighbors.

Each center therefore supplies 72 channels to 38 receivers. The two receiver sets have opposite lattice parity and are disjoint, proving 144 generated channels and 76 receiving labels. If $\mathcal A$ is the accepted 76-label environmental set and $\mathcal R$ is the new receiving set, then

$$
\mathcal R\setminus\mathcal A=E,
\qquad
\mathcal A\setminus\mathcal R=\{-2e_1,3e_1\}.
$$

The two environmental labels on the right already moved in the prefix. Generated feedback adds the two targets and no new environmental label outside $\mathcal A$. The original old-pulse census remains 52 completed and 48 entered but unfinished pairs, because $H<\sqrt6-11/8-B$ and $H<\sqrt5-9/8-B$.

The generated onset emission occurs at $\alpha$ while its source is at its anchor. Every generated channel boundary is the unique zero of

$$
F_{ij}(t)=t-\alpha-\|i-j+\mathbf y_i(t)\|,
\qquad
F'_{ij}\ge255/256.
$$

With $\beta=\alpha+1=\sqrt2-3/8$, $|F_{ij}-(t-\beta)|\le B$. All 144 boundaries lie within $[\beta-B,\beta+B]\subset(0,H)$. Positive source-time playback prevents an interior emitted point from preceding its boundary.

The targets' zero paths solve their equations until $\beta$, so regular uniqueness fixes their onset boundary exactly at $\beta$. The global minimum of the moving-receiver boundaries is proved only to lie in $[\beta-B,\beta]$. Neither the minimizing environmental label nor a strict earlier global onset is determined. Reception counts are not proofs of nonzero summed acceleration.

## 3. Independent target expansion

Target 0 receives generated motion from $\pm e_2,\pm e_3$, excited originally by target $e_1$. Target $e_1$ receives from $e_1\pm e_2,e_1\pm e_3$, excited originally by target 0. Each receiving target/source polarity product is negative. For a vertical source with exciting offset $\mathbf k=(a,0,z)$, $z=\pm1$, the accepted first response gives

$$
\mathbf U=-\frac g{20}\mathbf k z\,u^5+O_g(u^6),
\qquad
\mathbf V=-\frac g4\mathbf k z\,u^4+O_g(u^5).
$$

The negative polarity product makes the vertical velocity contributions sum to $+(g^2/2)e_3\delta^4$ in target acceleration, where $\delta=t-\beta$. The transverse neighbors begin at higher order. Two integrations yield the same leading displacement at both targets:

$$
\mathbf y_0=\frac{g^2}{60}e_3\delta^6+O_g(\delta^7),
\qquad
\mathbf y_{e_1}=\frac{g^2}{60}e_3\delta^6+O_g(\delta^7).
$$

The coefficient proves target motion for every fixed $g>0$, but cancels in relative displacement. Its vanishing at $\delta=0$ means that $\beta$ is the onset boundary, not an attained earliest positive displacement.

For the relative coefficient, let $d=\sqrt2$ and use the exact original pulse $p(u)=(-1+8u)u^4(1-4u)^4$. Expansion of the original vertical-source row gives

$$
\frac{Q_x}{k_x}
=d^{-3}\left[
\frac z d p'(u)+\frac{3z}{d^2}p(u)
+\frac{z^2}{d^2}p'(u)^2
\right]+O(u^7).
$$

The actual original source root satisfies $u=\theta+(z/d)p(\theta)+O(\theta^7)$, where $\theta$ is reception offset from the source's own onset. Substituting into $p'$ supplies $p''p=12\theta^6+O(\theta^7)$, while the reciprocal denominator supplies $(p')^2=16\theta^6+O(\theta^7)$. All lower first-component terms are odd in $z$ and cancel in the vertical pair. The first even term is

$$
Q_x^{\rm even}=\frac{28k_xz^2}{d^5}\theta^6+O(\theta^7).
$$

The original receiver correction derivative is $O(\theta^2)$ and its displacement is $O_g(\theta^5)$, so receiver feedback changes acceleration only at order seven. Integrating and summing the vertical pair gives

$$
U_{+,x}+U_{-,x}=\frac{ga}{4\sqrt2}u^8+O_g(u^9).
$$

No lower target first component is missed. The vertical linear velocity term has zero first component. Vertical displacement-velocity products start at order nine. Generated-root shifts change fifth-order source displacement only at order nine. At a transverse source, the original $Q_x$ begins at order seven because its denominator correction is $O(\theta^7)$ and the first-component kernel displacement is $O(\theta^8)$; therefore its first displacement starts at order nine. Target receiver feedback also starts at ninth order in acceleration. The target first-component acceleration is consequently $g$ times the displayed vertical pair sum, giving

$$
y_{0,x}=-\frac{g^2}{360\sqrt2}\delta^{10}+O_g(\delta^{11}),
\qquad
y_{e_1,x}=+\frac{g^2}{360\sqrt2}\delta^{10}+O_g(\delta^{11}).
$$

Reflection across $x_1=1/2$ preserves the original blocks, exchanges targets and reverses all polarities while preserving polarity products. Reflection across $x_2=0$ need not preserve the blocks. Its validity follows instead from the absolutely convergent individual-source third-derivative series of the stationary sum. Reflected and original functions have identical third derivatives; their difference is a polynomial of degree at most two, which vanishes because the accepted anchor value and first two derivatives vanish. This proves the needed reflection without arbitrary partition independence.

Equivariance and bounded uniqueness give identical target third components, zero second components and opposite first displacements. Thus

$$
\|\mathbf X_{e_1}-\mathbf X_0\|
=\ell\left[1+\frac{g^2}{180\sqrt2}\delta^{10}
+O_g(\delta^{11})\right].
$$

The underlying acceleration expansion also gives physical separation velocity

$$
\frac{d}{dT}\|\mathbf X_{e_1}-\mathbf X_0\|
=\frac{g^2}{18\sqrt2}\delta^9+O_g(\delta^{10}).
$$

It is positive on a sufficiently short positive interval for each fixed $g>0$. Strict initial increase therefore follows from a velocity estimate, without differentiating an arbitrary uncontrolled remainder. No sign is asserted throughout the full horizon from this local expansion.

## 4. Complete roots, class and bounded uniqueness

Complete speed below $1/256$ makes the delay residual increase at least $255/256$ times any delay increment. Each cross residual starts negative, becomes positive toward the remote past, and has exactly one root. Cross range is at least $255\ell/256$. The original half-width $w=\ell/256$ root tubes retain positive delay, range and transmitter floors, with complement gap at least $255w/256>w/4$. Self residuals obey $f_{ii}(\tau)\ge255\tau/256$, excluding all positive self roots and preserving both required self complements. The exact diagonal remains unevaluated.

For a competitor with the identical original past and block sum, displacement at most $B\ell$ and speed at most $1/4$, first consider $t\le h$. Since $h<1-2B$, every cross emission is negative and every label satisfies the same locally Lipschitz fixed-past equation. The competitor matches the accepted prefix even though the new proof ball exceeds the predecessor's ball. On the new interval, all emitted times are below $17/256<h$, so the sampled source histories already agree. Receiver ODE uniqueness completes the comparison. This explicitly closes the enlarged-ball uniqueness question.

Complete acceleration at most $3/(8\ell)$, jerk at most $784/\ell^2$, displacement below $\ell/512$, speed below $1/256$ and separation above $255\ell/256$ retain the [original class](population-history-class.md). Its density constants follow from the same anchor-cube volume argument, and the joined histories remain $C^3$. Both targets are newly nonconstant by the sixth-order coefficient, all 76 earlier environmental histories remain nonconstant, and the complement stays stationary. This establishes exactly 78 nonconstant future histories on the full interval.

Falsifiers include a violated rational estimate, source time outside the accepted prefix, a nonnearest generated channel, missing neighbor, uncancelled lower target first component, incorrect $12+16$ coefficient, failed fixed-sum reflection, contradictory root or original-class ceiling violation. The theorem does not decide long-time separation, eventual contact, arbitrary-history invariance or formal MEC-008 closure.

## Preservation and capture record

The reviewer ran shasum -a 256 -c on the initial subject and eleven references before reconstruction and again before the presentation correction, with all entries passing. After correction, the final subject and all eleven reference entries passed. The initial subject digest is 4430df10fc212af492b4e3ba32efc6be3472d0c23c66e242c6be69fe00ab783c; its exact bytes remain in .tmp/smooth-two-particle-generated-feedback/subject-initial.md. The final subject digest is 16fd24bd4bd3ccde72a4d5cefbf574f8920b7ba7dac2cd32ca70e876c1532aad. The reviewer's diff -u check verified that the sole change adds the missing backslash before quad on source line 17. These are measured preservation and delta checks, overturned by a changed manifest entry or a different scoped diff.

The reviewer wrote no files and ran no generator, simulation, Git mutation or subject checker. The subject retains its submitted-review wording as provenance; this adjudication and the live strategy carry acceptance. The coordinator integrated the transverse-source order argument and separation-velocity formula into the manuscript. Document validation and capture-fidelity checks are recorded separately in the work log.
