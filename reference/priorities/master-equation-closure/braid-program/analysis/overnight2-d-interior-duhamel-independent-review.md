# Independent review of the strict-interior Duhamel comparison

## Disposition and scope

**Derived disposition:** the fixed-origin comparison in [the frozen subject](overnight2-d-interior-duhamel-comparison.md) is valid under its stated complete-history, ordinary-root, strict-interior, integrability and continuation hypotheses. No required mathematical correction was found. The bound removes free kinematic drift from the Grönwall coefficient by using its exact propagator, while retaining interaction coefficients and every acceleration defect. It is a conditional analytical component, not an implementation or actual-history extension. The Ramon E. Moore role supplied the review lens; the derivation and exact rational controls below supply the evidence.

The reviewed subject SHA-256 is `73456f29fc5ebfcafa7975a2da823afe10a0241ba834db594570b84cc78645ba`, unchanged at the closing check. Supporting live sources read were [the reciprocal-weight comparison](overnight2-d-reciprocal-weight-comparison.md), SHA-256 `94568c5d2ba81000d19de442f9c18c5bddb27fdcd27facd5516a8bdf680c6f1d`, and [the delayed-admission construction](overnight2-d-delayed-admission.md), SHA-256 `42f1876fcf1fedf7713aed26deeb165f441560e82f4ca1b5b19362103b2ea092`. They were not modified. The original preparation, inclusive ceiling, complete history and normalized wake speed one remain selected.

## Independent derivation

Let the positive position weight satisfy $\alpha'=-\alpha^2$ after the admitted switching time $a$, with its previous constant value retained on the earlier history. Exact reference kinematics give $\dot e^x=e^v$. Thus for $z=(\alpha e^x,e^v)$ and acceleration error $F$, the differential equation almost everywhere is

$$
\dot z=\begin{pmatrix}-\alpha I&\alpha I\\0&0\end{pmatrix}z+\begin{pmatrix}0\\F\end{pmatrix}.
$$

Solving the free equation in physical coordinates and then multiplying position by the current weight yields

$$
P(t,s)=\begin{pmatrix}\theta I&(1-\theta)I\\0&I\end{pmatrix},\qquad
\theta=\frac{\alpha(t)}{\alpha(s)},\qquad
\alpha(t)(t-s)=1-\theta.
$$

Composition gives $P(t,s)P(s,u)=P(t,u)$ because the two ratios multiply. Independently, the two-dimensional Gram calculation gives

$$
2I-P^\top P=
\begin{pmatrix}
2-\theta^2&-\theta(1-\theta)\\
-\theta(1-\theta)&2\theta-\theta^2
\end{pmatrix},\qquad
\det(2I-P^\top P)=\theta(4-3\theta)\ge0.
$$

Both diagonal entries are nonnegative for $0\le\theta\le1$, proving $\|P\|_2\le\sqrt2$. The uniform constant is sharp as $\theta\downarrow0$ on an initial pure velocity error. Acceleration injection satisfies $|P(0,f)|=\sqrt{1+(1-\theta)^2}|f|$. These identities justify the displayed variation-of-constants formula for absolutely continuous errors and integrable acceleration inputs. The corner in $\alpha'$ at $a$ causes no state jump.

The exact channel endpoint construction keeps the source errors evaluated at the actual source time $S_{ij}(s)$. Summing the receiver matrices with their signs first, the acceleration terms have the pointwise estimate

$$
|F_i(s)|\le
\frac{\|B_i(s)\|_2}{\alpha(s)}|z_i(s)|
+\sum_{j\ne i}\left\|\left[-\frac{\overline B_{ij}(s)}{\alpha(S_{ij}(s))}\quad\overline C_{ij}(s)\right]\right\|_2|z_j(S_{ij}(s))|
+|g_i(s)|.
$$

The denominator in each source block is the source-time weight. A source before $a$ is bounded by the complete-past $E_0$ at its unchanged old weight; a source after $a$ is bounded by the reception-time history supremum because $S_{ij}(s)<s$. No differentiation of the delay or unknown source error is used. Consequently $|F_i(s)|\le k(s)E(s)+|g_i(s)|$ under the subject's trial-wide coefficient bounds.

Apply the fixed-origin integral identity at every $u\in[a,t]$. Nonnegative integrands permit enlarging each upper limit to $t$, and every receiver's accumulated defect is bounded by the same $G(t)$. Since $c\ge\sqrt2\ge1$, the resulting right side also dominates the older-history $E_0$. Therefore

$$
E(t)\le c(E_0+G(t))+c\int_a^t k(s)E(s)\,ds.
$$

For a fixed terminal argument $t$, replace $G(u)$ by its nondecreasing upper value $G(t)$ throughout $a\le u\le t$. Ordinary integral Grönwall then gives

$$
E(t)\le c(E_0+G(t))\exp\left(c\int_a^t k(s)\,ds\right).
$$

This step needs neither differentiability nor absolute continuity of the bound function $G$. It does need a finite nondecreasing bound valid for every prefix, not merely the full-block integral. The use of one common $G$ is legitimate because receiver norms are bounded separately before taking the finite member maximum; the proof does not interchange a maximum with a signed vector integral.

## First exit, source traces and continuation

The proposed first-exit use is sufficient and conservative. On a finite block choose $R>E_0$, enclose the complete coefficient/root/defect trial domain and require $\Phi(b)<R$. With $k\ge0$ and $G$ nondecreasing, $\Phi$ is nondecreasing. Every hypothetical first weighted-error contact would then have error at most $\Phi(b)<R$, contradicting contact. The condition automatically pays the initial factor $c$: choosing only $R>E_0$ without the final strict test is insufficient.

The independent speed condition $L+R<1$ makes the actual ceiling reaction zero before that first contact. The propagator argument is not a new inequality for active ceiling reactions. Positive separation, complete root coverage, ordinary factors, complete source history and suitable local continuation must hold simultaneously. Allowing delayed arguments inside the block in this abstract supremum proof does not establish a local solution there and does not authorize changing the present implementation's source-before-cell construction.

At source zero, the reference's prescribed velocity jump is an earlier-history trace discontinuity; the reference is continuously differentiable on the positive comparison interval, not across that original join. Both earlier velocity traces must be covered by $E_0$. Receptions of this jump give finite changes of acceleration, and displaced homotopy crossings contribute an integrable remainder to $g_i$. They do not create a new physical velocity impulse. Ordinary acceleration knots need their trace enclosures but no finite velocity-jump budget. The sufficient regularity for the integral identity is local absolute continuity of the weighted errors with the acceleration equation holding almost everywhere; classical derivatives at every knot are unnecessary.

The source-time weight must remain bounded away from zero on each finite interval used in the coefficient enclosure. The reciprocal choice has that property. A bracket meeting the switching time must cover both branches of the weight. A complete negative-history bound is an explicit premise; a last saved endpoint alone cannot stand in for it. If a future reference uses $W\ne Q'$, its kinematic defect is a top-block input and is outside the theorem as displayed.

## Independent controls and adversarial checks

The separate exact-rational instrument `.tmp/overnight2-d-review-interior-duhamel/independent-controls.py` passed before any producer control receipt or target was inspected; neither was needed for this review. Its SHA-256 is `cff987bb46c53f32082ef400e2fa74e293f5d2c0617ddfaefbfc0c28cfa3422a`. It establishes the following known cases independently of the producer's control file:

- Reciprocal identity and semigroup composition, the exact Gram determinant above, and the half-ratio Gram matrix $\left(\begin{smallmatrix}1/4&1/4\\1/4&5/4\end{smallmatrix}\right)$. A pure velocity error at ratio $1/4$ has squared norm $25/16$, explicitly refuting a uniform propagator bound of one.
- Constant acceleration one from zero errors on $[0,2]$, with $\alpha(0)=1/2$: exact weighted endpoint $(1/2,2)$, squared norm $17/4$, and exact integrated position injection $1/2$. This checks the acceleration-injection factor and physical position conversion.
- Source time one and reception time three with the same reciprocal weight, errors $(e^x,e^v)=(3,4)$ and scalar matrices $(B,C)=(2,-1)$. The correct delayed contribution is $-10$; substituting the reception weight into the source block gives $-14$, so that substitution breaks the identity even when it happens to enlarge a particular scalar magnitude.
- For $c=3/2$, $k=2/3$, $E_0=1$ and constant defect magnitude $g=1/4$, the saturated scalar Volterra solution is $cE_0e^t+cg(e^t-1)$. The proposed bound $c(E_0+gt)e^t$ dominates coefficient by coefficient: at positive degree $n$ their difference is $cg(n-1)/n!\ge0$. The instrument checks nineteen positive degrees; the symbolic coefficient formula proves the complete statement.
- An end-loaded defect budget with zero incoming error and acceleration defect one has $G(u)=0$ before its booked endpoint, while the actual velocity error is $u>0$. It fails the required prefix bound. A reaction vector $(0,-1)$ paired with error $(-1,0)$ has instantaneous pairing zero but positive pairing $1/2$ after the half-ratio propagator. These are explicit counterexamples to the two excluded shortcuts, not counterexamples to the theorem.

The independently copied control and its small receipt are retained under the ignored evidence owner `independent-review-instruments/overnight2-d-review-interior-duhamel/`. The receipt SHA-256 is `f35a04c0bb0cec963daca4a6f57eadf17cd93af385102f32940d7450d07f88e2`. The copy was exclusive and verified byte-for-byte after a known SHA256(abc) control. No original script or mathematical subject was changed.

## Boundary and falsifiers

This review does not show that the original trajectory has a small interaction integral, that the physical radius $\Phi/\alpha$ fits a later tube, or that an infinite continuation exists. A bounded weighted error over a separately existing infinite interval still permits linear growth of its physical position allowance. No execution-time improvement is inferred. The active continuation's fixed-weight receipts are unchanged and no active partial or log was inspected.

An admissible exact error violating the fixed-origin integral identity, a trial coefficient not enclosed by $k$, a delayed value outside the complete weighted history bound, a source weight evaluated on the wrong branch, a missing jump/defect prefix, an active unaccounted ceiling reaction or a failed independent continuation premise overturns the corresponding application. The next justified step is a separately scoped interval application bounding the full coefficient integral and every prefix defect budget; the present note alone grants no new admission.
