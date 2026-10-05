# Changing-scale continuation and the eccentricity boundary

The finite slow-binary theorem cannot be turned into an infinite-future near-circular theorem by resetting its radius scale. The free eccentricity grows rather than following the decreasing local speed scale in the exact first-order comparison. A different coordinate, eccentricity divided by angular motion, remains controlled. That coordinate gives a genuine delayed-equation continuation alternative: either the pair remains in a moderate-eccentricity class and expands without bound, or it reaches a regular eccentricity boundary after a controlled large expansion. The latter event is a boundary of this comparison argument, not a singularity of the Master Equation or an escape certificate.

**Grade:** derived results below, self-reviewed and awaiting independent adjudication. The unchanged inverse-square Master Equation is used throughout the delayed results, with complete supplied histories and every positive-delay root. No cap, event rule, mass or physical-energy premise is added. An exact first-order ordinary equation is used separately as a mathematical control; conclusions from that equation are not substituted for the delayed solution. All numerical constants use $c_f=1$.

The inputs are the frozen [local kernel](slow-binary-first-order-drift.md), its [independent reconstruction](slow-binary-independent-adjudication-2026-10-03.md), the [finite secular theorem](slow-binary-controlled-secular-comparison.md) and its [independent adjudication](slow-binary-secular-independent-adjudication-2026-10-03.md). The result addresses the [changing-scale queue](../work-queue.md#extend-the-finite-secular-comparison-to-a-controlled-fate-statement); it does not alter BP-001's frozen campaign or declare the remaining ultimate fate resolved.

## Preparation and coordinates

Retain exactly the finite theorem's preparation: a complete supplied planar mirror opposite-polarity past, member speed at most $2v_0$, continuous position and velocity, and the stated recent $W^{2,\infty}$ bounds. Let $K=\kappa|q_+q_-|$, $v_0^2=K/(4R_0)$, $\epsilon=v_0/c_f$, $s=v_0T/R_0$ and $\mathbf Y=\mathbf X_+/R_0$. Require $0<\epsilon\le10^{-9}$. At release $|h_0-1|\le\epsilon$ and $\|\mathbf e_0\|\le\epsilon$.

Here $r=\|\mathbf Y\|$, $\mathbf n=\mathbf Y/r$, $\mathbf t=\hat{\mathbf z}\times\mathbf n$, $h=(\mathbf Y\times\mathbf Y')\cdot\hat{\mathbf z}$ and $\mathbf e=\mathbf Y'\times(h\hat{\mathbf z})-\mathbf n$. The fixed normal is $\hat{\mathbf z}$, and the prime denotes $d/ds$. Choose the initial radial direction as the first planar coordinate, so the continuous orbital angle $\theta$ satisfies $\theta(0)=0$, $\mathbf n=(\cos\theta,\sin\theta)$ and $d\theta/ds=h/r^2$ while $h>0$.

The identities

$$
r=\frac{h^2}{1+\mathbf e\cdot\mathbf n},\qquad
v_r=-\frac{\mathbf e\cdot\mathbf t}{h},\qquad
v_t=\frac{1+\mathbf e\cdot\mathbf n}{h}
$$

are algebraic, not physical conservation laws. They show why $\mathbf c=\mathbf e/h$ is a useful changing-scale coordinate: bounded $\mathbf c$ controls the velocity even when the unnormalized eccentricity becomes larger. The circular speed ratio on the current geometric scale is $\epsilon/h$.

## A delayed-equation continuation alternative

**Theorem.** Under the stated preparation, there is a unique ordinary-root continuation to the first event $\|\mathbf e\|=1/2$, if that event occurs. If it never occurs, the continuation exists for all future time, its member radius tends to infinity and its speed tends to zero. Throughout the moderate-eccentricity interval,

$$
\left\|\frac{\mathbf e}{h}\right\|\le C\epsilon,\qquad
C=15000000
$$

and

$$
\frac\epsilon2\le\frac{dh}{d\theta}\le\frac{3\epsilon}{2},\qquad
\frac\epsilon2\le\frac{d(h^4)}{ds}\le\frac{27\epsilon}{2}
$$

Every member has exactly one ordinary partner root and no positive-delay self root. Both root factors remain positive, the actual source history is retained, and all future speeds are at most $4v_0$ before the boundary. If a first boundary occurs at $s_b$, then

$$
h(s_b)\ge\frac1{2C\epsilon},\qquad
r(s_b)\ge\frac1{6C^2\epsilon^2}
$$

It is therefore a regular event at a quantitatively enlarged radius. This statement gives a controlled alternative, not a proof that the boundary occurs or that its future escapes.

### Root coverage on the changing scale

Work temporarily in $h\ge1/2$, $\|\mathbf e\|\le1/2$. Algebra gives

$$
\frac{2h^2}{3}\le r\le2h^2,\qquad
\|\mathbf Y'\|\le\frac2h\le4
$$

Together with the complete supplied past, the global speed ratio is at most $4\epsilon<1$. The strict chord-speed inequality excludes every positive-delay self root. The partner causal gap is strictly increasing with delay, negative at zero delay and positive at sufficiently large delay; its unique root has scaled delay $u$ satisfying

$$
\frac{2\epsilon r}{1+4\epsilon}\le u\le\frac{2\epsilon r}{1-4\epsilon}<3\epsilon r
$$

The root factors are at least $1-4\epsilon$. The window grows with radius; it is never replaced by a fixed old memory horizon. On the actual causal interval, $|r(q)-r(s)|\le4u\le12\epsilon r(s)$.

For future source times, the exact scaled row implies $\|\mathbf Y''(q)\|\le2/r(q)^2$. At release the algebraic preparation gives $r(0)\le(1+\epsilon)^2/(1-\epsilon)\le1+4\epsilon$. If the root interval crosses release, $s\le u$ and $r(s)\le r(0)+4s\le1+4\epsilon+12\epsilon r(s)$, so $r(s)<1.1$ and the negative-time portion lies within the prescribed recent interval. Its acceleration bound is $8$. Thus the whole source interval has the conservative bound

$$
\sup_{q\in[s-u,s]}\|\mathbf Y''(q)\|\le\frac{64}{r(s)^2}
$$

Continuous velocity at history seams lets this bound be integrated across bounded acceleration steps. Source speed on the same interval is at most

$$
\frac2h+\frac{192\epsilon}{r}\le\frac3h
$$

The last inequality uses $r\ge2h^2/3$ and the smallness restriction. This is a bound on the actual retained source, not a renewed circular-past assumption.

### A scale-dependent defect

Apply the independently accepted local row estimate with source speed ratio at most $3\epsilon/h$ and source acceleration ratio at most $128\epsilon^2/r\le192\epsilon^2/h^2$. It gives

$$
\mathbf Y''=-\frac{\mathbf n}{r^2}
+\frac\epsilon{r^2}(\mathbf Y'-2v_r\mathbf n)+\mathbf Q,
\qquad
\|\mathbf Q\|\le L\frac{\epsilon^2}{r^2h^2},\qquad L=60000
$$

The displayed $L$ exceeds $256(9+192)=51456$. The acceleration term has been closed on the changing causal window, so the defect gets smaller as $h$ grows while eccentricity stays moderate.

Let $\delta_h=(\mathbf Y\times\mathbf Q)\cdot\hat{\mathbf z}$. Dividing the angular equation by $d\theta/ds$ gives

$$
\frac{dh}{d\theta}=\epsilon+\zeta,\qquad
\zeta=\frac{r^2\delta_h}{h},\qquad
|\zeta|\le\frac{2L\epsilon^2}{h}\le\frac\epsilon2
$$

The final smallness inequality holds at $h\ge1/2$. Thus $h$ increases and cannot reach the temporary lower boundary. Differentiation of the eccentricity, as in the accepted finite theorem, gives

$$
\frac{d\mathbf e}{d\theta}
=\frac{2\epsilon}{h}(1+\mathbf e\cdot\mathbf n)\mathbf n+\mathbf E,
\qquad
\|\mathbf E\|\le\frac{5L\epsilon^2}{h^2}
$$

The error uses $h+r\|\mathbf Y'\|\le5h$. These two estimates are uniform on the changing scale.

### Removing the rotating coefficient

Set $A(\theta)=2\mathbf n\mathbf n^{\mathsf T}-I$ and

$$
\mathbf a=\frac{\mathbf e}{h}+\frac{2\epsilon}{h^2}\mathbf t
$$

The subscript-free $A$ is a planar matrix, not an acceleration. Direct differentiation using $d\mathbf t/d\theta=-\mathbf n$ yields

$$
\frac{d\mathbf a}{d\theta}
=\frac\epsilon h A(\theta)\mathbf a+\mathbf F,
\qquad
\|\mathbf F\|
\le\frac{2L\epsilon^2}{h^2}\|\mathbf a\|
+\frac{(5L+3)\epsilon^2}{h^3}
$$

The term $-(\zeta/h)\mathbf a$ and the source error $\mathbf E/h$ are included in $\mathbf F$. Bounding $A$ by its norm and integrating would produce an artificial logarithmic growth. Its mean over a revolution is zero, and it has a bounded primitive

$$
B(\theta)=\frac12
\begin{pmatrix}
\sin2\theta&-\cos2\theta\\
-\cos2\theta&-\sin2\theta
\end{pmatrix},\qquad B'=A,\qquad\|B\|=\frac12
$$

Define $\mathbf z=(I-\epsilon B/h)\mathbf a$. The matrix and its inverse have norms at most $1.1$ and $2$. Product differentiation cancels the entire order-$\epsilon/h$ coefficient. The remaining coefficient is bounded by $\epsilon^2/h^2$ times a fixed constant because $dh/d\theta\le3\epsilon/2$. A sufficient explicit inequality is

$$
\left\|\frac{d\mathbf z}{d\theta}\right\|
\le C_*\frac{\epsilon^2}{h^2}\|\mathbf z\|
+C_*\frac{\epsilon^2}{h^3},\qquad C_*=10L+10=600010
$$

For example, the unforced coefficient before converting $\mathbf a$ to $\mathbf z$ is bounded by $5\epsilon^2/(4h^2)$; adding $1.1\cdot2L\epsilon^2/h^2$ and the inverse norm gives a coefficient smaller than $C_*$. The forcing coefficient $1.1(5L+3)$ is also smaller than $C_*$.

Since $dh/d\theta\ge\epsilon/2$, both error integrals converge uniformly as the angular interval grows:

$$
\int\frac{\epsilon^2}{h^2}\,d\theta\le\frac{2\epsilon}{h_0}\le4\epsilon,
\qquad
\int\frac{\epsilon^2}{h^3}\,d\theta\le\frac{\epsilon}{h_0^2}\le4\epsilon
$$

Initially $\|\mathbf a_0\|\le10\epsilon$ and $\|\mathbf z_0\|\le11\epsilon$. Grönwall's elementary integrating-factor estimate gives

$$
\|\mathbf z\|\le e^{4C_*\epsilon}(11+4C_*)\epsilon
$$

Here $4C_*\epsilon<1$, so the right side is smaller than $3(11+4C_*)\epsilon$. Multiplying by the inverse norm and subtracting the bounded $2\epsilon\mathbf t/h^2$ corrector proves $\|\mathbf e/h\|\le15000000\epsilon$. Unlike the fixed-radius estimate, this bound does not acquire a factor growing with the number of changing-scale windows.

### Continuation and the boundary alternative

On any finite time interval inside this class, radius, speed and acceleration are bounded, present separation has a positive floor, root factors have a positive floor, and the delay is bounded away from zero. The ordinary method-of-steps construction from the accepted theorem therefore continues uniquely with its growing retained history. The preceding estimates exclude a lower-$h$ exit. They do not exclude $\|\mathbf e\|=1/2$; that is the explicitly named stopping event.

If no such event occurs, every finite time admits continuation. Also

$$
\frac{d(h^4)}{ds}
=4(1+\mathbf e\cdot\mathbf n)^2(\epsilon+\zeta)
$$

lies between $\epsilon/2$ and $27\epsilon/2$. Thus $h\to\infty$, $r\ge2h^2/3\to\infty$ and $\|\mathbf Y'\|\le2/h\to0$. This proves the stated all-future expanding branch of the alternative, including slow rather than ballistic asymptotic motion. In dimensional variables, its broad radius-squared bounds include

$$
\rho(T)^2\ge\frac49 R_0^2h_0^4+\frac{K}{18c_f}T,
\qquad
\rho(T)^2\le4R_0^2h_0^4+\frac{27K}{2c_f}T
$$

These are conditional bounds on the branch remaining moderate, not the precise circular drift coefficient.

If a first eccentricity boundary occurs, $1/2=\|\mathbf e\|\le C\epsilon h$ implies the displayed lower bounds on $h$ and $r$. The current speed is at most $2/h$, acceleration is bounded and root slopes exceed $1-4\epsilon$. The state therefore has an ordinary continuation beyond the comparison boundary. Nothing in this theorem selects its ultimate fate. This completes the delayed-equation alternative.

## An exact control showing why near-circular resets fail

Suppress $\mathbf Q$ only to define the mathematical first-order comparison equation. Its angle equations are exact:

$$
\frac{dh}{d\theta}=\epsilon,\qquad
\frac{d\mathbf e}{d\theta}
=\frac{2\epsilon}{h}(1+\mathbf e\cdot\mathbf n)\mathbf n
$$

Hence $h=h_0+\epsilon\theta$. This equation is not an adopted alternative response law. It is a reference for the consequences and limitations of the retained first-order expansion.

For this comparison, $\mathbf a$ obeys

$$
\frac{d\mathbf a}{d\theta}
=\frac\epsilon h A\mathbf a-\frac{2\epsilon^2}{h^3}\mathbf t
$$

Remove its remaining oscillatory forcing with $\mathbf u=\mathbf a+2\epsilon^2\mathbf n/h^3$. Since $A\mathbf n=\mathbf n$,

$$
\frac{d\mathbf u}{d\theta}
=\frac\epsilon h A\mathbf u-\frac{8\epsilon^3}{h^4}\mathbf n
$$

Set $\mathbf w=(I-\epsilon B/h)\mathbf u$. Its coefficient is bounded by a constant times $\epsilon^2/h^2$, and its forcing by a constant times $\epsilon^3/h^4$. Their integrals are respectively $O(\epsilon/h_0)$ and $O(\epsilon^2/h_0^3)$. Thus $\mathbf w$ is bounded and has an absolutely integrable derivative. It converges. The removed correctors tend to zero, so

$$
\frac{\mathbf e}{h}\longrightarrow\mathbf c_\infty,
\qquad
\left\|\mathbf c_\infty-
\left(\frac{\mathbf e_0}{h_0}+
\frac{2\epsilon}{h_0^2}\mathbf t_0\right)\right\|
\le100\epsilon^2
$$

One conservative verification is to bound the transformed coefficient by $2\epsilon^2/h^2$ and forcing by $9\epsilon^3/h^4$. Their total integrals are at most $4\epsilon$ and $24\epsilon^2$ for the allowed $h_0$; the initial vector has norm below $5\epsilon$. The accumulated change is then at most $70\epsilon^2$ for $\epsilon\le10^{-9}$. The initial matrix and $\mathbf n$ correctors cost less than $20\epsilon^2$. The stated constant $100$ covers both. This proof is analytical; no orbit integration or numerical target is needed.

For every allowed $\|\mathbf e_0\|\le\epsilon$, $|h_0-1|\le\epsilon$, the leading vector has norm at least $\epsilon(2-h_0)/h_0^2$. Therefore $\|\mathbf c_\infty\|\ge\epsilon/2>0$. A circular release gives $\mathbf c_\infty=2\epsilon\mathbf t_0+O(\epsilon^2)$.

The eccentricity of the comparison consequently grows in norm like $h\|\mathbf c_\infty\|$. It reaches $1/2$ at a finite angular time, while the local circular speed ratio $\epsilon/h$ decreases. Up to that event the reconstructed radius is positive and the physical comparison time is finite. An indefinite assumption $\|\mathbf e\|=O(\epsilon/h)$ is therefore false even for the exact first-order control. It is not a consequence of small speed or positive ordinary root margins. This is the demonstrated obstruction to repeating the finite theorem's original near-circle preparation.

The parameterized control eventually has a zero of $1+\mathbf e\cdot\mathbf n$, because $h\to\infty$, $\mathbf c\to\mathbf c_\infty\ne0$ and the radial direction continues turning. At its first zero the geometric comparison radius becomes unbounded. This does not prove that the delayed solution reaches the same event: its accumulated higher-order contribution must be controlled separately.

## Exact torque improves the bound but does not close the fate gap

The absolute defect bound wastes the radial structure of higher-order terms near an elongated orbit. The exact delayed torque contains no such artificial radial error. If $r_s=r(\sigma)$ and $\delta=\theta(s)-\theta(\sigma)$, the exact row gives

$$
\frac{dh}{ds}
=\frac{4r r_s\sin\delta}{R_d^3D},\qquad
R_d=\|\mathbf Y(s)+\mathbf Y(\sigma)\|,\qquad
D=1+\epsilon\mathbf n_d\cdot\mathbf Y'(\sigma)
$$

This identity is derived from $\mathbf Y\times\mathbf Y''$, with the sign fixed by attraction. It is positive when the earlier member direction is behind the current one by an angle between zero and $\pi$.

For a source interval entirely after release, define

$$
J=\frac1u\int_{s-u}^s
\frac{h(q)}{h(s)}\frac{r(s)^2}{r(q)^2}\,dq
$$

Then $\delta=u hJ/r^2$ and $u=\epsilon R_d$, so the exact relative torque is

$$
\frac{h'}{\epsilon h/r^2}
=\frac{4r^2}{R_d^2}\frac{r_s}{r}
J\frac{\sin\delta}{\delta}\frac1D
$$

The moderate-eccentricity theorem's causal-window estimates give $r(q)/r=1+O(\epsilon/h)$, $h(q)/h=1+O(\epsilon^2/r)$, $R_d/(2r)=1+O(\epsilon/h)$, $D=1+O(\epsilon/h)$ and $\delta=O(\epsilon/h)$. Thus its exact relative torque error is $O(\epsilon/h)$, with no factor from the size of apocenter. This is a separately derived structural improvement over the isotropic defect estimate.

More generally the same product identity remains valid on any declared causal window with those radius, angular and velocity comparison bounds, even if the instantaneous eccentricity is closer to one. Those renewed bounds are hypotheses to prove in that regime; this paragraph does not assume that the moderate-domain theorem already established them beyond its boundary. The formula identifies how to improve angular control without a new equation.

The eccentricity error is harder. Using the isotropic local defect and only $\|\mathbf e\|\le E<1$ gives $r\le h^2/(1-E)$ and an angle-error factor $h+r\|\mathbf Y'\|$. That estimate loses uniformity as $E\to1$. Torque positivity alone does not control the radial part, the outgoing projection or the accumulated eccentricity correction. An independent bound on the polar components of the exact delayed remainder, exploiting their rotating directions, is the missing estimate. The primitive root slopes do not fail at $E=1/2$.

## What is and is not determined by the remainder enclosure

The accepted local norm estimate allows normalized-eccentricity forcing of order $\epsilon^2/h^3$. Its integral over changing scale is of order $\epsilon$, exactly the scale of the initial free vector. Thus the norm estimate does not determine whether the genuine delayed trajectory retains, cancels or changes that free vector.

This limitation can be made concrete at the level of the admitted normal-form enclosure. A vector $\mathbf z(\theta)=h_0^2\mathbf z_0/h(\theta)^2$, with $\|\mathbf z_0\|=O(\epsilon)$ and $h_\theta=\epsilon$, has derivative $-2\epsilon h_0^2\mathbf z_0/h^3$. That is an allowed order-$\epsilon^2/h^3$ forcing and tends to zero. A vector remaining close to $\mathbf z_0$ also satisfies the same norm enclosure and tends to a nonzero value. These witnesses are not two Master Equation solutions. They demonstrate that the existing error inequality, without its actual signed and oscillatory structure, cannot choose between those conclusions.

The [independently reviewed escape criteria](sharp-circle-escape-independent-review.md#24-a-sharpened-criterion) provide a possible final bridge. On a strictly subfield outgoing history they require a fixed positive outward projection, complete old-source exclusion and a total acceleration-impulse bound smaller than the outward and speed margins. For criterion B that bound is

$$
I_B=\frac K{(1-\beta)u_{\rm out}(x_0+m)}
<\min\{w_0-u_{\rm out},\ \beta-q_0,\ 1-\|\mathbf V_0\|\}
$$

The symbols are those of the cited criterion: $x_0,m$ are directional position bounds, $w_0$ is the outward endpoint speed, $u_{\rm out}>0$ is its maintained lower bound, and $q_0,\beta$ control transverse speed. No such directional certificate follows from reaching $\|\mathbf e\|=1/2$. At that event the radial velocity can have either sign. This analysis has not established an episode satisfying the escape criterion.

## Disposition, falsifiers and preservation

The changing-scale normalized coordinate gives a new uniform delayed theorem and an explicit boundary alternative. The exact first-order control proves that indefinitely renewed near-circular preparation is an invalid inference. Exact torque geometry removes one artificial error loss and identifies a more suitable polar remainder estimate. The unresolved case is the actual delayed eccentric continuation, especially its signed radial response near the elongated or parabolic regime. Neither another endpoint nor the regular eccentricity boundary is booked as escape.

**Falsifiers:** a preparation satisfying the frozen finite theorem's assumptions that violates the normalized-eccentricity bound, loses a root before the stated comparison boundary or fails the all-future expanding branch while remaining moderate refutes the delayed theorem. Independent differentiation of the $A,B,\mathbf a,\mathbf z$ transformations or the exact torque product can identify a specific algebraic failure. A norm estimate that actually forces the same nonzero limiting free vector for the signed delayed remainder would remove the demonstrated enclosure limitation; it must use more than the present absolute bound. A verified outgoing episode satisfying the cited escape inequalities would close a fate route, but has not been supplied here.

Only this new subject and `.tmp/binary-changing-scale/` scratch are written by this investigation. The four live scientific inputs were inventoried locally before drafting and remain read-only. No numerical trajectory, production solver, historical receipt, queue, log, corpus file or equation variant is changed. The subject is to be frozen after document validation for a separate mathematical adjudication.

The document checker `.tmp/binary-changing-scale/check.mjs` passed known SHA-256, fenced-link, math-link and valid/invalid TeX controls before this target. Its final pass checked 183 mathematical spans, six local links and two fragments, with no syntax, missing-link or trailing-whitespace finding. SHA-256 comparison confirmed all four scientific inputs unchanged from the locally captured inventory. These checks establish preservation and document syntax only; the displayed derivations carry the mathematical claims. The exact final subject identity is recorded in `.tmp/binary-changing-scale/check-result.json` for the separate reviewer.
