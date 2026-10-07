# Independent assessment of the logarithmic spectral census and attained circle

**Disposition: accept at the stated local scope.** The frozen [two-hour logarithmic subject](logarithmic-actual-fate-two-hour-2026-10-06.md) establishes one simple growing conjugate pair, one simple axial-rotation zero, and no other mirror-planar exponent with real part at least $-.01$. Its nonlinear argument identifies the complete circle of limiting checkpoint histories reached as the original positive amplitude tends to zero. No equation correction or counterexample was found in the spectral mapping, eigenfunctional, cone, backward graph, compactness or phase-surjectivity arguments. The circle consists of limits of actual checkpoints; the proof does not place every finite-amplitude checkpoint exactly on the strong unstable manifold.

**Claim grade: derived**, computer-assisted for the spectral census and analytical for the nonlinear bridge. This is a separately reconstructed assessment after disclosure using the Ramon E. Moore lens, not a blind derivation. The recorded contour arithmetic is accepted through review of its formulas and implementation together with the independently authored receipt audit below. That audit does not independently recompute determinant enclosures or transcendental values. No numerical amplitude, trajectory, unit-speed event or all-future member is certified.

## Fixed problem and explicitly inherited premises

The law is the registered coefficient-one inverse-distance logarithmic row with $p=1$ and $K=R_*=c_f=1$, opposite polarities and the original mirror-planar complete preparation. The original held tail, polynomial completion, analytic segment, compactly supported modal variation and fixed release-compatibility patch remain unchanged. The [source admission](authorized-cases-ten-hour-cd-source-admission.md) and [method owner](authorized-cases-ten-hour-c-spiral-method-admission.md) bind this selection. The parameters are the exact admitted balance zero within the rational rectangle centered at $(2.2980147591220047,1.1160548442916221)$ with coordinate radius $10^{-10}$; neither decimal center replaces that zero.

The [Cartesian perturbation adjudication](alternatives-screen-2026-10-05-logarithmic-spiral-perturbation-adjudication.md) independently accepts the moving-clock/source-velocity differential, reduced determinant, complete compatible-history tangent and simple pair

$$
\alpha\in[.0138698363660541,.0138898363660541],\qquad
\beta\in[3.2269327188404713,3.2269527188404713],\qquad
k_*=\alpha+i\beta.
$$

The [nonlinear adjudication](alternatives-screen-2026-10-05-logarithmic-spiral-nonlinear-adjudication.md) accepts the regular compatible $C^1$ solution-manifold chart, derivative extension to continuous history directions, finite generated entry of the original family and compact derivative time maps. It did not exclude faster modes. The [attained-exit adjudication](authorized-cases-ten-hour-reference-c-spiral-exit-adjudication.md) separately accepts generated $C^1$ compactness and backward-limit extraction, without asserting a particular leading mode. These are the inherited premises used here; the new count and the resulting circle are reviewed below.

I checked the primary mathematical source's Theorem 3.2.1 and Section 3.4 against the stated regularity use: compatible histories have differentiable fixed-time maps, and the equilibrium variational equation acts on the compatible tangent space. The source does not itself prove phase coverage or a logarithmic-family fate statement. Those steps are derived here. [Hartung, Krisztin, Walther and Wu](https://aimath.org/WWN/variabletimelag/sur0b.pdf)

## The whole-half-plane certificate

Let $\Omega=\omega J$, with $J$ the planar quarter-turn, $P$ rotation through $-\delta$, $\lambda=e^{-\delta/\omega}$, $d=1-\lambda$, and $E=\operatorname{diag}(1,0)$. The admitted chord-basis matrix is

$$
M(k)=k^2I+k(I+2\Omega)+\Omega+\Omega^2
-K_c(I+\lambda^{k+1}P)
-\frac{\lambda^{k+2}}d EP[(k+1)I+\Omega].
$$

Here $K_c$ denotes the subject's real symmetric matrix called $K$ in its spectral section; it is distinct from the fixed physical coefficient one. Its entries and sign match the earlier independently adjudicated clock differential. The reviewed [reduced implementation](logarithmic-actual-fate-two-hour-spectrum.py) constructs this matrix directly, including the $\lambda^{k+2}$ velocity/clock term. The [Cartesian implementation](logarithmic-actual-fate-two-hour-cartesian.py) constructs the separately authored physical clock, chord, direction and sampled-velocity variations. Its ordinary denominator is evaluated directly; the reduced implementation's balance simplifications are used only as an analytic extension containing the actual balance zero. Agreement away from that zero is not required.

### Analytical tail exclusion

From the admitted rational parameter bounds, $2.29<\omega<2.30$, $.60<\lambda<.62$, $d>.38$, and $\|K_c\|_2\le\|K_c\|_\infty<8$. The norm comparison is valid because $K_c$ is real symmetric. For $\operatorname{Re}k\ge-.01$, $|\lambda^k|<1.007$: $\log(5/3)<.6$ and $e^{.006}\le(1-.006)^{-1}<1.007$ suffice. Thus $|\lambda^{k+1}|<.625$ and $|\lambda^{k+2}|/d<1.02$. Direct triangle inequalities give, with $s=|k|$,

$$
\|M(k)-k^2I\|_2
<(1+2(2.30)+1.02)s
+(2.30+2.30^2)+8(1+.625)+1.02(1+2.30)
<6.62s+23.966.
$$

At $s=10$, $s^2-6.62s-23.966=9.834>0$, and its derivative $2s-6.62$ is positive thereafter. The Neumann inverse of $I+k^{-2}(M-k^2I)$ therefore excludes every zero with $|k|\ge10$ in this half-plane. The subject's narrower positive-half-plane bound follows with the smaller factors it states. This proves that a bounded rectangular count plus the tail exclusion covers the entire relevant half-plane.

### Why the contour method certifies completeness

For each accepted boundary segment, the producer encloses the determinant image over the entire segment and full parameter rectangle in a complex rectangle. It explicitly enlarges that rectangle to contain both chosen rational endpoint representatives. At least one real or imaginary coordinate interval has a strict sign, so the rectangle excludes zero. Convexity keeps the straight deformation from the true image arc to the segment joining those representatives away from zero. Cached representatives agree at shared endpoints, so these local deformations join to a closed homotopy. The polygon therefore has the same winding as the actual determinant contour for every permitted fixed parameter pair.

The determinant is entire in $k$, with no poles: its entries are polynomials and constant-parameter exponentials. The argument principle counts zeros with multiplicity, and the tail estimate excludes every omitted exterior point. In particular this is not a count of sampled roots or merely a root search that stopped at radius ten.

I reviewed both arithmetic paths. The reduced path rounds every operation outward on its rational grid and evaluates bounded-argument exponential, sine and cosine Taylor polynomials with explicit remainder intervals. The scaled exponential first divides the argument until both components have magnitude at most one, then squares the enclosed value; interval dependency can widen the result but cannot invalidate containment. The Cartesian path uses its independently authored endpoint transcendental bounds and rational interval operations. Its squared scaling also preserves containment. Both use the shared new contour method, so their agreement alone would not validate that method; the convex homotopy proof above does.

### Fresh independent structural audit of the retained receipts

The new [receipt auditor](../evidence/overnight2-a-reference-logarithmic-receipt-audit.py) imports none of the subject instruments. Exact rational parametrization verifies each directed side is covered once, with no gaps, overlaps or reversed segments; checks adjacent domain and image endpoints; verifies both endpoint representatives lie in their recorded zero-excluding rectangle; and computes winding by signed intersections with the negative real ray. It also checks that retained known-control receipts precede their target receipts, share their producer identities, and match the current producer source hashes.

Its known cases passed before any target receipt access: a once-traversed square, a twice-traversed square, reverse orientation, an outside polygon, and deliberate coverage, zero-box, winding and image-seam defects. The [known receipt](../evidence/overnight2-a-reference-logarithmic-receipt-known.json) and [target audit](../evidence/overnight2-a-reference-logarithmic-receipt-target.json) preserve that order and the auditor identity. The measured target audit returns:

| Retained contour | Accepted segments checked | Independently counted winding |
| --- | ---: | ---: |
| Reduced, left edge $.01$ | 164 | 2 |
| Cartesian, left edge $.01$ | 216 | 2 |
| Reduced, left edge $-.01$ | 126 | 3 |
| Cartesian, left edge $-.01$ | 168 | 3 |

The audit does **not** reevaluate determinant images, transcendental enclosures, the parameter-balance certificate, simple-pair inclusion, or any physical trajectory. Those boundaries are explicit in its output. The numerical premise is therefore the retained enclosures from the reviewed, source-bound producers, with an independent structural and winding audit; it is not claimed as a wholly separate numerical rederivation of those enclosures. No original target calculation was rerun in this assessment.

The [full-spectrum extension](logarithmic-actual-fate-two-hour-full-spectrum.py) changes the left boundary to $-.01$ while retaining both admitted differentials. The two independently admitted simple roots and the exact axial-rotation root at zero account for all three multiplicities inside that contour. Therefore the zero is simple, there are no other roots on or to the right of $-.01$, and the only growing pair in the mirror-planar sector is the admitted pair. The rest lies strictly left of $-.01$. Common and normal sectors are not counted and are not needed for this exactly invariant original family.

## Compactness and spectral mapping to the compatible tangent space

Use similarity time $\tau=\log(1+T)$ and first-order state $Z=(U,U')$ in the mirror-planar sector. The equilibrium history is $\phi_*$, with perturbation $\xi=Z-\phi_*$. At equilibrium, source velocity is a state component and the clock differential has fixed coefficients. The linear equation is therefore

$$
\xi'(\tau)=A_0\xi(\tau)+A_1\xi(\tau-h_*),\qquad h_*=-\log\lambda.
$$

There is no delayed derivative input. The second-order characteristic determinant and this four-dimensional first-order determinant have the same roots and multiplicities: substitution of the first kinematic block $V=kU$ eliminates the velocity amplitude without division by $k$, leaving the displayed $M(k)$. In particular no spurious zero is lost through that reduction.

For $a>H>h_*$, bounded compatible $C^1$ input histories yield bounded values and first derivatives on a fixed finite interval. Differentiating this constant-coefficient equation for positive time bounds the second derivative as well. The time-$a$ segment is strictly generated, so its values and first derivatives are equicontinuous; Arzela–Ascoli gives compactness in $C^1$. The closed tangent compatibility condition is retained. This does not claim that an arbitrary $C^1$ ball is compact.

Every nonzero generalized eigenspace of this compact time map is finite dimensional and invariant under the commuting continuous semigroup. On it the semigroup is a matrix exponential. A generator eigenvector has history $e^{ks}v$ and satisfies the characteristic equation. Conversely every characteristic mode yields the multiplier $e^{ka}$. Generalized vectors have the corresponding characteristic multiplicity, so the independently simple pair has no hidden Jordan chain. If the conjugate multipliers happen to coincide for a chosen sampling time, their real spectral space still has dimension two; the continuous generator retains the conjugate pair. There is no omitted larger multiplier.

Consequently the leading real space $E_u$ is two-dimensional, and its invariant complement admits an equivalent norm with

$$
\|A_s\|\le b=e^{.011a}<\gamma=e^{.012a}<m=e^{\alpha a},
\qquad |A_u u|=m|u|.
$$

The constants are conservative: the stronger census even places the complement's largest real part at zero. The subject intentionally retains the earlier $.01$ spectral separation for its bridge. No stable inverse or backward inverse of the full delay time map is needed.

## Original-family entry, thin cones and the exact eigenfunctional

The original compatibility construction genuinely supplies a continuous positive-amplitude family, not merely a choice of a different history for each amplitude. The raw compactly supported modal perturbation is linear in its amplitude; its release mismatch is a $C^1$ function of that amplitude on the regular root chart. Multiplication by the same fixed patch, whose support avoids all nearby release sources, preserves continuity and changes the family by $o(\eta)$. Finite generated entry is $C^1$ in that history. Thus in a compatible chart with exact leading linear eigenfunctional coordinate,

$$
u_\eta=\eta c+o(\eta),\qquad s_\eta=o(\eta),\qquad c\ne0,
\qquad \eta>0.
$$

This transfer uses the original prescribed completion and the admitted modal tangent; it does not replace the supplied past by a constant similarity history.

Write the time-$a$ map as $(A_uu,A_ss)+R(u,s)$ with $R(0)=DR(0)=0$. On a small convex chart ball, $R$ has arbitrarily small Lipschitz constant $\varepsilon$. In the maximum norm and a cone $\|s\|\le\delta_c|u|$, direct estimates give

$$
|u_+|\ge[m-\varepsilon\max(1,\delta_c)]|u|,
\qquad
\|s_+\|\le[b\delta_c+\varepsilon\max(1,\delta_c)]|u|.
$$

For every desired positive cone width, $m>b$ permits the subject's strict invariant-cone inequality. The actual entry family starts in that cone for all sufficiently small positive amplitudes. Uniform finite-time differentiability between samples follows here from the explicit integral equation: subtract the variational solution, bound the initial chart remainder in $C^1$, and bound the nonlinear forcing by a small multiple of the finite-step history norm. Gronwall controls values, while the equation controls derivatives. Negative parts of the initial segment retain their initial $C^1$ remainder and create no compatibility seam. This gives the subject's continuous-time cone and $\|\xi_\tau\|_{C^1}\le C|u(\tau)|$.

For the exact projected differential, let $\Delta(k)=kI-A_0-A_1e^{-kh_*}$, choose right and left vectors $v,p$ at $k_*$, and normalize $p\Delta'(k_*)v=1$ using complex bilinear products. Define

$$
u(\tau)=p\xi(\tau)
+pA_1\int_{-h_*}^0e^{-k_*(s+h_*)}\xi(\tau+s)\,ds.
$$

Before applying it to the nonlinear family, on the known mode $\xi=e^{k_*\tau}v$ this gives $u=e^{k_*\tau}$, because the integral is $h_*e^{-k_*h_*}v$. On a distinct exponential mode the differential below forces its leading coefficient to vanish. These fix the normalization and integral sign.

If $\xi'=A_0\xi+A_1\xi_{-h_*}+g(\xi_\tau)$, differentiation of the integral gives its two boundary terms $e^{-k_*h_*}\xi(\tau)-\xi(\tau-h_*)$ plus $k_*$ times the integral. The delayed boundary cancels $pA_1\xi(\tau-h_*)$, and the left eigenvector equation then gives exactly

$$
u'=k_*u+p\,g(\xi_\tau).
$$

No conjugation, extra clock factor or omitted compatibility term is present. Since $g=o(\|\xi\|_{C^1})$ and the history norm is controlled by $|u|$, the relative error $pg/u$ tends uniformly to zero with the checkpoint radius. After choosing a fixed sufficiently small checkpoint, its magnitude is below $.001$. Therefore $d\log|u|/d\tau>\alpha-.001>.012$ and the continuously lifted phase has positive derivative greater than $\beta-.001$.

## Exit-time asymptotics and phase surjectivity

Fix a sufficiently small $r_u>0$. The radial inequality ensures a unique first crossing $|u|=r_u$. The cone and finite-step bounds keep the entire history inside the regular chart before that crossing, so another chart boundary cannot interrupt it. The original family is continuous and the crossing is transverse, making the crossing time and a lifted exit phase continuous functions of positive amplitude.

The sharper asymptotics use only the uniform small-error modulus, not a quadratic remainder. For any smaller radius $r_1$, the time between $r_1$ and $r_u$ is bounded uniformly in amplitude by the positive radial rate. Below $r_1$, the relative error in both rate equations is as small as desired. Integrating with respect to $\log|u|$, then taking $\eta\downarrow0$ followed by $r_1\downarrow0$, yields

$$
\frac{\widehat\tau_\eta}{\log(1/\eta)}\longrightarrow\frac1\alpha,
\qquad
\frac{\vartheta(\widehat\tau_\eta)}{\log(1/\eta)}\longrightarrow\frac\beta\alpha.
$$

The initial lifted phase is bounded because $u_\eta/\eta\to c\ne0$. The fixed finite entry time affects neither ratio. The proof does not supply a bounded additive phase error, which would require more than the stated $C^1$ remainder.

Thus the continuous lifted exit phase tends to positive infinity. For each fixed angle $\varphi$ and sufficiently large integer $j$, the intermediate-value theorem supplies an original positive amplitude with exit phase $\varphi+2\pi j$. These amplitudes must tend to zero, since a continuous phase is bounded on every compact amplitude interval away from zero. No monotonicity in amplitude and no independently chosen initial phase are required. This establishes phase coverage for the unchanged family.

## Weighted backward graph and the full attained limiting circle

In the weighted sequence space with norm $\sup_{n\le0}\gamma^{-n}\|z_n\|$, the backward recurrence for a prescribed leading endpoint $u_0$ is

$$
\begin{aligned}
u_n&=A_u^n u_0-\sum_{j=n}^{-1}A_u^{n-1-j}R_u(z_j),\\
s_n&=\sum_{j=-\infty}^{n-1}A_s^{n-1-j}R_s(z_j).
\end{aligned}
$$

As a control, $R=0$ gives $u_n=A_u^n u_0$ and $s_n=0$, the unique sufficiently fast backward orbit of the linear split. For general $R$, the unstable weighted sum has geometric bound $\varepsilon/(m-\gamma)$; the complementary sum has bound $\varepsilon/(\gamma-b)$. The latter uses only forward powers of $A_s$. Its homogeneous remainder from an earlier endpoint vanishes because $b<\gamma$. Choosing $\varepsilon$ and $u_0$ sufficiently small makes the map a contraction of a closed weighted ball into itself.

This constructs a unique sequence and continuous graph $s_0=G(u_0)$ with $G(u_0)=o(|u_0|)$. The $C^1$ claim is also justified: sequence entries tend uniformly to zero in the weighted tail, so continuity of $DR$ at zero controls that tail, while only finitely many remaining entries require local derivative continuity. Differentiation of the contraction gives the derivative of the graph. Continuity and uniqueness alone suffice for the circle result.

The original semiflow fills each interval between consecutive backward sample points. A sufficiently small time shift preserves the exponential bound and, after choosing the endpoint radius inside the contraction ball, the same local margins. The shifted sequence belongs to the same uniqueness class. Hence the graph is locally invariant under the continuous flow. This is a construction of a selected backward set, not an unjustified assertion that a delay semiflow is globally invertible.

For actual checkpoints, every fixed backward window is generated once the amplitude is small enough. Uniform chart bounds control current and sampled position/velocity derivatives and the source-clock derivative; differentiating the regular response bounds $Z''$ there. This supplies $C^1$ precompactness by Arzela–Ascoli, as in the explicitly adjudicated attained-exit argument. It does not use compactness of a norm ball. Backward integration of the radial lower rate gives

$$
\|\xi_{\widehat\tau_\eta+t}\|_{C^1}
\le C r_u e^{(\alpha-.001)t}\qquad(t\le0)
$$

on each fixed generated interval. A diagonal limit is therefore a complete backward solution with rate strictly faster than $e^{.012t}$, and its sampled sequence falls inside the weighted uniqueness class. Every checkpoint limit is on $G$ with $|u_0|=r_u$.

Conversely, the actual phase-surjectivity sequences have compact subsequences. Their limiting leading coordinate is $r_u e^{i\varphi}$, so uniqueness forces their entire history to be $\Psi(r_u e^{i\varphi},G(r_u e^{i\varphi}))$. Thus the cluster set is exactly

$$
\widehat K_{r_u}=
\{\Psi(r_u e^{i\varphi},G(r_u e^{i\varphi})):\ 0\le\varphi<2\pi\}.
$$

The leading coordinate distinguishes the phases, so this is a circle of histories, not merely a circular projection of a larger unspecified set. Its unique backward solution also fixes every longer sampled history window. Precompactness shows that every sufficiently small actual checkpoint approaches this circle; otherwise a sequence separated from it would have a contradictory cluster point.

The backward similarity limit does not replace any actual preparation. The held physical tail moves to minus infinity under checkpoint normalization, while every finite member retains it. Nor does the result replace the older frozen sampled exit threshold: it uses the smaller continuous checkpoint explicitly allowed by the original local construction.

## Accepted scope, falsifiers and unresolved fate

The accepted new results are the complete mirror-planar spectral census, dominance of the admitted pair, the two logarithmic rate limits, phase coverage by the unchanged positive-amplitude family, and the exact circle of limiting local checkpoint histories. No finite numerical amplitude or quantitative checkpoint radius is supplied; these remain existential constants of the admitted chart. No finite-amplitude history is asserted to lie exactly on the limiting circle.

The decisive falsifiers are an incorrect or nonenclosing determinant image on a retained whole edge; a missing zero outside the disk despite the explicit norm inequality; an omitted delayed-state derivative or characteristic multiplicity; failure of continuity of the fixed compatibility construction; a missing boundary term in the eigenfunctional; failure of the cone's continuous-time norm comparison; loss of generated derivative bounds needed for $C^1$ compactness; or failure of the two geometric-series bounds in the weighted recurrence. Each has a concrete formula, source owner or receipt location above. The independent receipt audit cannot itself rule out the first of these, because it does not reevaluate images.

No actual finite unit arrival, attained all-future invariant region or unconditional later fate follows. A phase label alone does not control the later signed speed integral. The remaining physical task is a regular complete-history transport from an actually attained limiting checkpoint into an accepted open event region, followed by the existing transfer argument, or an invariant-region proof for an actual member. Existence of a surviving limiting orbit alone would not certify a surviving original-family member.

## Commands, identity and preservation

The shared venv was checked directly: `"${AAA_VENV:-../.venv}/bin/python" -B -c 'import sys; print(sys.executable); print(sys.version.split()[0])'` returned `/Users/markmorris/vibe/.venv/bin/python` and `3.13.2`. No system Python was used. The independent audit commands actually run, in order, were:

```bash
"${AAA_VENV:-../.venv}/bin/python" -B reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-logarithmic-receipt-audit.py --out reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-logarithmic-receipt-known.json
"${AAA_VENV:-../.venv}/bin/python" -B reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-logarithmic-receipt-audit.py --target --known reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-logarithmic-receipt-known.json --out reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-logarithmic-receipt-target.json
```

Both returned exit zero and `passed: true`. The target audit contains the exact source and retained-receipt identities and explicitly lists what it did not evaluate. Its outputs are exclusive-create; a reproduction must use new output names. The new auditor's identity is `0f980822c7c016c7bbc9ed3d05357472d52c514105485ad49cf64beaaecf96d5`.

Native `shasum -a 256` measured the reviewed subject as `feabab2053bcaf765c5224c206bf59bd56b2d0a76137a960acc4192ab503e9eb`. The three assigned producer identities are `e56c6b447107e9ffdd14ecc94353d26f8813b19d083c990b1ac8d2434c0efef0`, `a20d285d7568676f658105b2e45f932e684d99059ebb83ee311623ea9fee6870`, and `de5a98bfc19095f988e93809fdfea77aa42373e2a79140512b87dc44cbc54bb1` for spectrum, Cartesian and full-spectrum respectively. They match the source-bound retained receipts by the fresh audit. These are measured byte identities, not scientific arguments.

Only this new assessment and its three named evidence companions are written. The unrelated concurrent `logarithmic-actual-fate-adjudication-instrument.py` was neither read nor used. Native `shasum -a 256` repeated at closeout returned the same identities above for the subject and all three assigned producers. This review made no edits to earlier subjects, references or receipts and introduced no scientific trajectory, long process, shared-owner edit, generator or Git mutation. The parent owns integration into [the main A report](overnight2-a-followup-and-research-2026-10-07.md), and the coordinator owns shared summaries. The small new evidence remains in the repository owner; the older local receipts remain local provenance with their tracked reproducing sources.

**Validation and freeze.** `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-logarithmic-circle.md` passed its known controls and checked 139 math spans and 13 local links; its scope is TeX syntax, whitespace and local destinations, not mathematical correctness. The substantive assessment is frozen at 2026-10-07 03:54 UTC, subject to the final identical validation pass recorded in the handoff. No outstanding dependency blocks the stated local acceptance; later physical fate remains open as specified above.
