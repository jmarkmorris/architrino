# Independent adjudication of the second receiving-shell continuation

## Disposition

The [second-shell continuation theorem](smooth-two-particle-second-shell-continuation.md) is accepted at its stated conditional scope. Independent reconstruction found no required mathematical correction. The unchanged smooth two-target history continues through $T=79\ell/128$ for every $0<g=G/\ell\le16$. Exactly 32 environmental labels have nonconstant future histories, and every received emission remains strictly before release.

The reviewer did not author the subject and worked from a fresh-context, read-only assignment. The coordinator captured the returned reconstruction here. The accepted stationary cubic estimate and accepted first-response theorem are dependencies, not new independent reviews of those earlier results. The new evidence is the analytic reconstruction below, independently of the subject's arithmetic instrument. Mathematical conclusions have grade **derived** with their stated hypotheses; preservation checks have grade **measured**.

| Claim | Disposition |
| --- | --- |
| Unchanged pulse and speed at most $1/8192$ | Accepted |
| 40 ordered pulse pairs, eight double receivers, 32 environmental receivers | Accepted |
| Continuation through $79\ell/128$ for every $0<g\le16$ | Accepted |
| Stationary targets and stationary complementary environment | Accepted |
| Actual moving endpoints and complete pulse traversal | Accepted |
| Eight new fifth-order responses | Accepted |
| Complete cross-root uniqueness, empty positive self channels and original-class preservation | Accepted |
| Uniqueness among the stated bounded classical continuations sharing the full past | Accepted within that comparison scope |
| Arbitrary-history invariance, unrestricted uniqueness, physical-domain selection, contact or global existence | Not established |

## 1. The same input with a sharper speed bound

The supplied history uses $c_f=1$, $\varepsilon=2^{-16}$, $\mathbf e=(0,0,1)$ and changed labels $E=\{0,e_1\}$, where $e_1=(1,0,0)$. All anchors are $\mathbf z_i=\ell i$. The two changed pasts have common displacement $\varepsilon\ell\mathbf e\,\psi(8(s/\ell+5/4))$, with $\psi(v)=v(1-v^2)^4$ on $|v|<1$ and zero outside. All other pasts are stationary. Differentiation gives

$$
\psi'(v)=(1-v^2)^3(1-9v^2).
$$

For $z=v^2$, the derivative of $(1-z)^3(1-9z)$ is $12(1-z)^2(3z-1)$. Its relevant values are $1,-16/27,0$ at $z=0,1/3,1$. Thus $|\psi'|\le1$ and the physical input speed is at most $8\varepsilon=1/8192$. No amplitude, time scale or history changes.

With $u=s/\ell+11/8$, the identity $1-(-1+8u)^2=16u(1-4u)$ gives the exact dimensionless displacement

$$
p(u)=(-1+8u)u^4(1-4u)^4,
$$

supported on $[0,1/4]$. Its endpoint jets through order three vanish. The accepted input acceleration and jerk bounds remain $3/(8\ell)$ and $27/(2\ell^2)$. A different derivative polynomial or changed input formula would falsify this identification.

## 2. Signed source corrections and the finite census

Let $t=T/\ell$, $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\mathbf z_i)/\ell$, $\sigma_i=(-1)^{i_1+i_2+i_3}$, $G=\kappa q_0^2>0$ and $g=G/\ell$. The [canonical row](../../../../content/markdown/aaa/dynamics/master-equation.md) is $G\sigma_i\sigma_j\mathbf K(\mathbf R)/D$, with $\mathbf K(\mathbf R)=\mathbf R/\|\mathbf R\|^3$ and $D=1-\mathbf n\cdot\mathbf V_j$ on this positive-transmitter chart. Receiver playback is separate. The original stationary block sum and exact finite source corrections therefore yield

$$
\mathbf y_i''=g\left[\mathbf S(\mathbf y_i)
+\sum_{j\in E\setminus\{i\}}\sigma_i\sigma_j
\left(\frac{\mathbf K(\mathbf k+\mathbf y_i-p(u)\mathbf e)}D
-\mathbf K(\mathbf k+\mathbf y_i)\right)\right],
$$

where $\mathbf k=i-j$ and the actual root obeys $t+11/8-u=\|\mathbf k+\mathbf y_i-p(u)\mathbf e\|$. Each changed stationary row is subtracted exactly once. Integer-square parity gives $\sigma_i\sigma_j=(-1)^{\|\mathbf k\|^2}$, so distance-squared-two corrections have positive sign and distance-squared-three corrections have negative sign. Omitting the latter would reverse the new leading response.

At a fixed receiver with $\|\mathbf y\|\le b=1/1024$, the source-time residual has a positive delay slope and a negative value at emission zero because $H=79/128<1-b$. It has exactly one supplied-past root. This defines the receiver equations before any generated future is used.

Endpoint reception times lie within $b$ of their anchor values. The shell exclusions have exact margins

$$
-1/8+b=-127/1024<0,\qquad
(2-11/8-b)-H=7/1024>0.
$$

The final distance-$\sqrt3$ endpoint lies before $H$ because $\sqrt3<1783/1024$, with $1783^2-3(1024)^2=33361>0$. The earliest bracket is positive because $\sqrt2>1409/1024$. Thus distance-one pulses finish before release; distance-at-least-two pulses remain unreceived; only distances $\sqrt2$ and $\sqrt3$ contribute. Inactive corrections vanish because their complete roots sample stationary history, not because a root is deleted.

Each squared-distance-two shell has the twelve permutations of $(\pm1,\pm1,0)$; each squared-distance-three shell has eight vectors $(\pm1,\pm1,\pm1)$. Equal squared distances from the two centers would require $2i_1-1=0$, impossible for integer labels. The mixed intersections are

$$
\{(0,\pm1,\pm1)\},\qquad \{(1,\pm1,\pm1)\}.
$$

There are $2(12+8)=40$ ordered pulse pairs and $40-8=32$ receiving labels. The new eight are exactly $\{(-1,\pm1,\pm1),(2,\pm1,\pm1)\}$. Neither target belongs to this union. An additional integer solution or active pulse outside the timing exclusions would falsify the census.

## 3. Continuation and bounded-class uniqueness

The accepted [first-pulse adjudication](smooth-two-particle-pulse-independent-adjudication.md) supplies the stationary bounds

$$
\|\mathbf S(\mathbf y)\|\le C_b\|\mathbf y\|^3,
\quad \|D\mathbf S(\mathbf y)\|\le3C_b\|\mathbf y\|^2,
\quad C_b=1309/(1-b)^5.
$$

The particular block prescription remains essential. Bernoulli's inequality gives the exact specialization

$$
C_b\le\frac{1309\cdot1024}{1019}<\frac{4096}{3}<1400,
\qquad 3C_bb^2<1/256.
$$

Every potentially active row has anchor distance at least $\sqrt2$, so its subtraction segment has range greater than one. With $\nu=1/8192$, the kernel and denominator bounds give

$$
\|\mathbf Q_{\mathbf k}\|\le\frac{2\varepsilon+\nu}{1-\nu}
=\frac5{32764},
\qquad C_bb^3+\frac{10}{32764}<\frac1{3200}.
$$

For an independent rational check of the last inequality,

$$
\frac1{3200}-\frac{10}{32764}
=\frac{191}{26211200}>\frac{1400}{2^{30}}.
$$

Integrating from zero displacement and velocity up to a first exit gives

$$
\|\mathbf y_i''\|<g/3200,\quad
\|\mathbf y_i'\|\le gt/3200,\quad
\|\mathbf y_i\|\le gt^2/6400.
$$

For $g\le16$ and $t\le H<5/8$, these imply displacement strictly below $1/1024$, speed below $1/320$ and acceleration below $1/200$. A first exit contradicts the integrated estimate. The acceleration functions are at least $C^2$ on a slightly larger ball, with positive range and denominator margins. Bounded position and velocity therefore permit ordinary-differential-equation continuation through $H$, including at $g=16$.

An explicit uniform receiver Lipschitz bound also follows. Implicit differentiation gives $\|u_{\mathbf y}\|\le(1-\nu)^{-1}$ and hence

$$
\|D_{\mathbf y}\mathbf Q\|
\le\frac2{(1-\nu)^2}
+\frac{\nu+3/8}{(1-\nu)^3}+2<5.
$$

With at most two rows, the full acceleration has a receiver Lipschitz constant below $11g\le176$. Outside the receiving union the zero path solves its equation and is unique, including both targets. For competitors sharing the full prescribed past and satisfying displacement at most $b$ and speed at most $1/4$, the complete-root argument below reduces the full EOM to these same receiver equations. No larger uniqueness class is asserted.

## 4. Jerk, moving endpoints and new nonconstant histories

The actual root derivative retains source acceleration:

$$
u'=\frac{1-\mathbf n\cdot\mathbf v}{D},\quad
\mathbf R'=\mathbf v-\mathbf W u',\quad
\mathbf n'=\frac{(I-\mathbf n\mathbf n^{\mathsf T})\mathbf R'}r,
\quad D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,u'.
$$

Here $\mathbf v=\mathbf y_i'$, $\mathbf W=p'(u)\mathbf e$ and $\mathbf A=p''(u)\mathbf e$. The conservative bounds $|u'|<4/3$, $\|\mathbf R'\|<17/64$, $|D'|<33/64$ and $D>63/64$ follow from the accepted old-jet bounds, $r>1$ and $\|\mathbf v\|\le1/4$. Including the stationary subtraction derivative gives

$$
\|\mathbf Q'\|<34/63+2112/3969+1/2<2.
$$

Two corrections contribute less than four and the stationary derivative less than one, before multiplication by $g$. Thus $\|\mathbf y_i'''\|<5g\le80$. Endpoint flatness makes acceleration and jerk continuous at every reception boundary, and stationarity near release joins to the past. The complete histories are globally $C^3$. An omitted source-acceleration term or failed endpoint jet would falsify this step.

For every pulse pair, its actual endpoint residuals are

$$
F^a(t)=t+11/8-\|\mathbf k+\mathbf y_i(t)\|,
\qquad F^b(t)=t+9/8-\|\mathbf k+\mathbf y_i(t)\|.
$$

Their derivatives are at least $319/320$ and their deviations from the anchor residuals are at most $b$. Their unique zeros lie in the stated $b$-brackets, entirely within $[0,H]$. Since $u'>0$, every pulse is traversed once and in order. The double receivers generally have shifted second-pulse entry times; pulse completion does not imply rest.

Each new receiver remains stationary until $t_3=\sqrt3-11/8$, because its other changed source is at distance $\sqrt6$. For $\theta=t-t_3>0$, the exact profile and anchor root give

$$
p(u)=-u^4+O(u^5),\quad p'(u)=-4u^3+O(u^4),\quad
u=\theta+O(\theta^4).
$$

With $\|\mathbf k\|^2=3$,

$$
\mathbf Q_{\mathbf k}(t_3+\theta,0)
=-\frac{4\mathbf k k_3}{9}\theta^3+O(\theta^4).
$$

The Lipschitz feedback in the zero-data integral equation first gives $\mathbf y_i=O_g(\theta^5)$: iteration in the weighted fifth-order bound makes feedback gain an extra factor proportional to $\theta^2$. It cannot change the leading cubic acceleration. The negative polarity product and $\int_0^\theta(\theta-s)s^3\,ds=\theta^5/20$ yield

$$
\mathbf y_i(t_3+\theta)=\frac{g\mathbf k k_3}{45}\theta^5+O_g(\theta^6).
$$

This coefficient is nonzero for all eight labels and every $g>0$. Combined with the accepted nonconstant responses of the original 24 labels and the stationary complement, it proves exactly 32 nonconstant future histories.

## 5. Complete root domain and class preservation

The joined complete histories have displacement below $b\ell$ and speed at most $1/320$. Every cross range satisfies

$$
r_{ij}\ge\ell\|i-j\|-2b\ell\ge511\ell/512.
$$

The full delay residual increases at least $319/320$ times the delay increment, starts negative and eventually becomes positive. Every cross channel has exactly one root. Its original half-width $w=\ell/256$ tube lies in positive delay with the range and transmitter floors intact, and its complement gap is at least $319w/320>w/4$. Self residuals obey $f_{ii}(\tau)\ge319\tau/320$, excluding all positive self roots and preserving both original self margins. The exact diagonal remains unevaluated.

At every cross root,

$$
s=T-r\le(79/128-511/512)\ell=-195\ell/512<0.
$$

Thus the environmental futures are genuine solutions while their generated emissions have not yet arrived. This closes identification with the full EOM. The same displacement argument and speed at most $1/4$ establish that identification for the bounded uniqueness comparison class.

Complete acceleration is at most $3/(8\ell)$ and complete jerk at most $80/\ell^2$ over the stated coupling range, below the original ceilings $256/\ell$ and $65536/\ell^2$. Displacement, speed, separation and the unchanged cube-volume argument preserve the remaining [original class](population-history-class.md) conditions at every cut. A second root, received nonnegative emission or failed original ceiling under these inequalities would falsify the corresponding conclusion.

The result concerns one supplied finite disturbance and its EOM-generated response. It does not permit arbitrary coordinated changes to distant pasts, select a physical history domain, extend uniqueness through singular states or prove contact. The range $16<g<2^{48}$ and accepted obstruction at $g\ge2^{48}$ remain unchanged. Further shells and first reception of generated futures require further estimates.

## Preservation and capture record

The reviewer ran shasum -a 256 -c before and after reconstruction on .tmp/smooth-two-particle-second-shell/subject.sha256 and frozen-inputs.sha256; the subject and all seven scientific inputs returned OK. The reviewed subject digest is a9f8f371a10afda15fe9ac54d28c0a86ef1db4961cb34309558f387222a4fe2c. The coordinator repeats the same checks during integration. A changed manifest entry overturns its measured preservation claim.

The reviewer wrote no files, ran no simulation and did not use the subject's checker as proof. The original subject retains its submitted-review status as frozen provenance; this adjudication and the live strategy and queue carry the acceptance. Coordinator syntax, arithmetic and link checks are recorded separately in the work log and do not independently establish the theorem.
