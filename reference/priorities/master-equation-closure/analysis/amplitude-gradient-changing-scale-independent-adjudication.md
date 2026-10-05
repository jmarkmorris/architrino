# Independent changing-scale reference for the amplitude-gradient pair

As a near-circular amplitude-gradient pair grows, its wake delay becomes shorter relative to its orbital period and its delayed-acceleration coefficient becomes smaller. Those improvements do not by themselves control its relative radial oscillation. The leading centered radial calculation has positive, not negative, averaged growth of that oscillation. This reference separates the favorable operator scaling from the additional late-time dynamical question.

**Claim grade: derived for the scale identities and conditional weighted estimates; derived for the explicitly truncated cycle calculation; inferred for its implications for the exact late-time motion.** This reference is constructed before reading the separately authored changing-scale subject. The [regular-pair law](amplitude-gradient-regular-pair-investigation.md), [accepted finite secular subject](amplitude-gradient-controlled-secular-comparison.md) and [independent finite adjudication](amplitude-gradient-secular-independent-adjudication.md#8-independent-adjudication-of-the-frozen-secular-subject) remain fixed inputs. The candidate is the ordinary partner-branch amplitude gradient. No global self-diagonal scalar, cap, physical account, singular rule or new preparation is introduced.

**Final adjudication: accepted at the finite, preparation-specific boundary stated in Section 7.** The separately authored [changing-scale continuation](amplitude-gradient-changing-scale-continuation.md) proves continuation to $H/H_0=\epsilon^{-\nu}$ for some fixed $\nu>0$, with actual radius multiplier $\epsilon^{-2\nu}[1+O(\epsilon^{1/2})]$. It does not prove unlimited expansion at fixed $\epsilon$, an eventual eccentric first exit or exact radial instability. The independently reconstructed positive leading averaged radial coefficient agrees with the subject's explicitly inferred diagnostic and is not needed as a premise of its finite theorem.

## 1. Known controls and retained preparation

Set $c_f=1$ and retain the existing physical scaling $X_\pm=\pm R_0y(s)$, $s=v_0T/R_0$, $v_0^2=K/(4R_0)$ and $\epsilon=v_0/c_f$. The complete supplied past is the same compatible $C^{5,1}$ preparation as in the finite theorem, with matched terminal jets through fifth order and bounded sixth derivative almost everywhere. The past is not replaced by a new circle at a later scale. Complete subfield speed controls the entire ordinary-root census, including the absence of positive-delay self roots.

The analytical controls precede the new scaling: a stationary source gives the radial inverse-square row; an affine source has an even velocity dependence and no linear correction; transverse quadratic and cubic source controls give the present acceleration coefficient $P a/(2r)$ and jerk coefficient $-j/3$; the prescribed circle gives a positive cubic tangent. These are the independent controls already reconstructed in the fixed adjudication. They are not measurements of late coupled motion.

Use $r=|y|$, $h=(y\times y')\cdot\hat z$ and the corrected determinant $H=h e^{-\epsilon^2/r}$. The changing-scale chart under consideration has $H\ge H_*>0$ and $r/H^2$ near one. It must also control radial velocity and actual derivative norms; closeness of radius alone supplies no derivative estimate.

## 2. Frozen-scale covariance of the exact delayed operator

At a reception with scale $A=H(s_0)$, freeze $A$ while making the coordinate change

$$
y(s)=A^2Z(\tau),\qquad \tau=\frac{s-s_0}{A^3},\qquad
\eta=\frac\epsilon A.
$$

This is a coordinate change applied to the actual retained history, not a claim that $A$ is constant during evolution. It gives $y^{(m)}=A^{2-3m}Z^{(m)}$. If $\ell=|Z(\tau)+Z(\tau_d)|$, then the global delay is $s-s_d=\epsilon A^2\ell$, and the local delay is $\tau-\tau_d=\eta\ell$.

The exact finite-pair equation becomes

$$
Z''=-\frac4{\ell^2D^3}
\left[(1-\eta^2|Z'(\tau_d)|^2)n
+\eta D Z'(\tau_d)-\eta^2\ell n(n\cdot Z''(\tau_d))\right],
\qquad D=1+\eta n\cdot Z'(\tau_d).
$$

Its form is identical to the accepted local equation, with parameter $\eta$ replacing $\epsilon$. In particular the coefficient of its delayed acceleration is $4\eta^2nn^{\mathsf T}/(\ell D^3)$. The coefficient of the highest delayed derivative after $k$ time differentiations is this matrix multiplied by $(\tau_d')^k$, exactly as in the finite proof. On a fixed normalized geometry and speed box it is bounded by $C\eta^2$ for $0\le k\le4$.

Thus the expected weighted actual jet bounds are

$$
|y^{(m)}(s)|\le M_m H(s)^{2-3m},\qquad 1\le m\le6.
$$

They correspond respectively to speed $O(H^{-1})$, acceleration $O(H^{-4})$, jerk $O(H^{-7})$, and subsequent derivatives decreasing by three additional powers of $H$. These are hypotheses or bootstrap bounds on actual histories, not consequences of the formal radius law alone.

The complete source past remains essential. If the global physical speed has a strict subfield bound, root time increases monotonically with reception time. Its initial root therefore marks the oldest supplied time ever sampled. The older complete past excludes extra roots, while the initial finite recent segment supplies the only pre-release derivative data used. Every later derivative value is generated by the same coupled equation.

## 3. Conditional weighted row and angular remainders

Suppose the weighted jet bounds hold on each actual causal interval and its source scales are comparable with the current $H$. Applying the independently justified finite weighted Taylor argument in the frozen coordinates gives

$$
|Q|\le C\frac{\epsilon^4}{H^8},\qquad
|Q'|\le C\frac{\epsilon^4}{H^{11}}.
$$

The first exponent follows from the acceleration scale $H^{-4}$ times the local fourth-order error $(\epsilon/H)^4$. One time derivative contributes $H^{-3}$. The mixed estimate still needs sixth actual source jets, including its seam conditions; a fourth derivative of the whole accelerated row followed by time differentiation remains an invalid shortcut.

The corrected determinant then satisfies

$$
H'=\frac43\frac{\epsilon^3H}{r^3}+q_H,
\qquad
|q_H|\le C\frac{\epsilon^4}{H^6},\qquad
|q_H'|\le C\frac{\epsilon^4}{H^9}.
$$

The torque multiplies the acceleration error by $r\asymp H^2$, accounting for the exponent $-6$. Differentiating that torque uses $|y'|=O(H^{-1})$ and the row derivative bound, accounting for exponent $-9$. The exponential correction contributes only smaller terms under the same chart bounds.

For sufficiently small $\epsilon/H_*$, this gives $H'>0$ and $H'=O(\epsilon^3H^{-5})$. Across an actual delay $O(\epsilon H^2)$, it follows that

$$
\frac{|H(s)-H(s_d)|}{H(s)}\le C\left(\frac\epsilon H\right)^4.
$$

Hence source/current weight ratios in the highest-derivative recursion are $1+O(\eta^4)$. This permits the small $C\eta^2$ coefficient to absorb the highest delayed derivative in a weighted induction, once the normalized lower-jet and geometry bounds are preserved. The argument is conditional on that preservation: it cannot close a radial first exit by assuming $r/H^2$ stays near one. The initial finite theorem provides a starting interval but does not establish the indefinitely renewed normalized radial bounds.

The prescribed circle supplies a coefficient control at every frozen scale: $r=A^2$, speed $A^{-1}$ and physical speed ratio $\epsilon/A$ give tangent acceleration $4\epsilon^3/(3A^7)$ in original orbital units, hence $H'=4\epsilon^3/(3A^5)$ at leading order. Its inverse-square radial correction is $-\epsilon^2/(2A^6)$. These agree with the frozen-coordinate transformation.

## 4. Centered radial motion and its leading growth sign

Retain the exact radial reference of the finite proof, with minimum $r=\mathcal R(H,\epsilon)=H^2+3\epsilon^2/2+O(\epsilon^4/H^2)$. Write $w=r-\mathcal R$ and $p=r'-\mathcal R_HH'$. Its curvature scales as $H^{-6}$. Therefore the centered scalar $E_c=p^2/2+V(H,w)$ is comparable to $p^2+w^2/H^6$, and the relative radial amplitude is measured by $H\sqrt{E_c}$, not by $\sqrt{E_c}$ alone.

Let $\alpha=H'/H$ and $\omega=H^{-3}$ at leading circular order. The corrected angular rate gives $\alpha=4\epsilon^3/(3H^6)$. The radial cubic term supplies $-8\epsilon^3r'/(3H^6)=-2\alpha r'$. However differentiating the moving center produces another term:

$$
H''=-4\epsilon^3\frac{H r'}{r^4}
+\text{higher-order terms},
\qquad
-\mathcal R_HH''=8\epsilon^3\frac{r'}{H^6}
+\text{higher-order terms}.
$$

Their sum is $16\epsilon^3p/(3H^6)=4\alpha p$ in the leading centered equation. It has a positive sign. Ignoring the center's second derivative would incorrectly retain only the negative radial term and infer damping.

For the linearized centered comparison, set $z=w/H^2$ and $P=Hp$. Up to higher-order and nonlinear terms,

$$
z'=\omega P-2\alpha z,
\qquad P'=-\omega z+5\alpha P.
$$

The leading relative oscillation norm $I=z^2+P^2$ therefore has derivative

$$
I'=3\alpha I+7\alpha(P^2-z^2).
$$

The last term oscillates over a radial cycle. For example, $(zP)'=\omega(P^2-z^2)+3\alpha zP$ in this comparison, so subtracting $7\alpha zP/\omega$ from $I$ removes the leading oscillatory derivative. Since $\alpha/\omega=O((\epsilon/H)^3)$, this correction is smaller than $I$. The leading averaged equation is consequently

$$
\frac{d\log I}{d\log H}=3,
\qquad
\sqrt I\propto H^{3/2}.
$$

This is a coefficient calculation for the leading centered comparison, not yet a controlled exact-history instability theorem. It shows why the finite proof's inequality cannot establish unlimited near-circular persistence. The normalized radial mode has an amplifying term, and its coefficient integrates like $\log H$ as $H$ grows without bound.

## 5. Separate cycle calculation from central inverse-square algebra

A second derivation checks this sign without moving-center variables. Use only the cubic perturbation of the central comparison,

$$
y''=-\frac y{r^3}
+\frac43\frac{\epsilon^3}{r^3}(y'-3r'e_r).
$$

Define the algebraic proxy $E_0=|y'|^2/2-1/r$ and $e^2=1+2E_0h^2$. These definitions and differentiation of the central inverse-square equation give, on a frozen ellipse,

$$
r=\frac{h^2}{1+e\cos\theta},\qquad
r'=\frac{e\sin\theta}{h},\qquad
\frac{ds}{d\theta}=\frac{r^2}h.
$$

Here $0<e<1$ and $h$ are held fixed only while computing the leading cycle coefficient. The identities are algebraic coordinates for this central comparison, not imported physical energy or angular-momentum laws.

The perturbation gives

$$
\frac{h'}h=\frac43\frac{\epsilon^3}{r^3},
\qquad
(e^2)'=\frac83\frac{\epsilon^3h^2}{r^3}
\left[-(r')^2+2\left(\frac hr\right)^2-\frac2r\right].
$$

Integrating these leading terms over $0\le\theta\le2\pi$, the constant and squared-cosine integrals yield

$$
\Delta\log h=\frac{8\pi}{3}\frac{\epsilon^3}{h^3},
\qquad
\Delta e^2=8\pi\frac{\epsilon^3e^2}{h^3}.
$$

Indeed the numerator for the second integral is $2e\cos\theta+e^2(5\cos^2\theta-1)+e^3\cos\theta(3\cos^2\theta-1)$; only its even quadratic part survives, with integral $3\pi e^2$. Thus the same ratio $d\log(e^2)/d\log h=3$ follows. The reversible second-order correction changes the radial reference and precession at relative order $(\epsilon/H)^2$; it does not reverse this leading cubic cycle sign. A controlled theorem must bound those correction and delayed remainder effects, not identify this truncated calculation with the exact orbit.

## 6. What can and cannot be concluded before target review

The operator's delay, denominator and highest-delayed-derivative bounds improve at larger $H$ within the near-circular chart. The angular fourth-order relative error is $O(\epsilon/H)$ and decreases. Those are useful actual-history estimates if their weighted preparation and radial hypotheses are proved.

The radial issue is different. Even the leading comparison has a homogeneous mode with relative amplitude growing like $H^{3/2}$. A crude norm inequality has the form $a'\le C(H'/H)a+C\epsilon^4/H^7$ for $a$ comparable to relative radial amplitude. Dividing by $H'\asymp\epsilon^3/H^5$ gives $da/dH\le Ca/H+C\epsilon/H^2$, whose bound grows algebraically rather than remaining uniformly small. The leading signed calculation identifies the homogeneous exponent as $3/2$. A fourth-order error integrated against its growing factor can also leave a nonzero free mode. Small error on every single rescaled box therefore does not prove small relative radial error on infinitely many boxes.

The supplied finite-theorem preparation has $r'(0)=0$ while its moving reference has derivative $\mathcal R_HH'=O(\epsilon^3)$. Its centered initial $p$ is consequently nonzero at that scale. The exact accumulated remainder might modify or cancel the free mode; a lower bound or noncancellation theorem is needed before inferring an exact eventual eccentric departure. Likewise an exceptional globally selected near-circular path would need its own full-history or future asymptotic condition. It is not supplied by matching finitely many release jets.

At this first stage no all-future fate is accepted. A successful actual changing-scale theorem must either control the signed radial mode for the same retained past, or continue into a wider eccentric chart after a rigorously identified first exit. It must separately establish complete ordinary-root coverage, finite-time continuation margins, the sixth-jet induction and the accumulation of its weighted remainder. Infinite cube-root expansion does not follow by iterating the accepted finite near-circular theorem.

Falsifiers are a frozen-scale substitution that changes the exact local parameter from $\epsilon/H$; a highest delayed coefficient not scaling as $O((\epsilon/H)^2)$; violation of the weighted fourth-order row bounds under their declared source hypotheses; or a direct centered or cycle differentiation with the opposite signed homogeneous coefficient. A failure of the exact history to follow the truncated averaged radial growth would falsify an additional late-time inference, not these coefficient calculations.

## Pre-comparison construction and preservation record

At the reference freeze the new author subject had not been read. The accepted sources were inventoried locally using `shasum -a 256` in `.tmp/amplitude-changing-review/observed-inputs.sha256`. Only this new report and the assignment's unique scratch directory are written. No earlier proof, input reference, instrument, shared queue, log, canonical law or production solver is changed. The full first-stage reference was frozen in `.tmp/amplitude-changing-review/reference-before-subject.md` before any coordinator-authorized target comparison. Mathematical controls are analytical; document checks do not promote the conditional weighted estimates or truncated cycle calculation into an exact global fate.

## 7. Independent adjudication of the revised frozen subject

The coordinator authorized comparison only after the reference snapshot above was fixed. The subject was read in its revised frozen form. A Node SHA-256 check passed the known `abc` control before measuring that subject and comparing its bytes with the coordinator's frozen observation. The observed subject identity is retained locally in `.tmp/amplitude-changing-review/frozen-subject-identity.json`. No subject or earlier reference was edited.

### 7.1 Exact equation, source clock and derivative bootstrap

The subject's coordinate rescaling agrees exactly with Section 2. In particular the delayed-acceleration coefficient in global time is $4\epsilon^2nn^{\mathsf T}/(LD^3)$; it becomes $4(\epsilon/H)^2nn^{\mathsf T}/(\ell D^3)$ in frozen orbital time. This eliminates the possibility of estimating a global-radius box by a fixed-box constant. The actual coefficient decreases in the weighted orbital norm.

The source clock is reconstructed by differentiating $s-s_d=\epsilon|y(s)+y(s_d)|$. It gives

$$
s_d'=\frac{1-\epsilon n\cdot y'(s)}{1+\epsilon n\cdot y'(s_d)}.
$$

The shared complete-past speed margin $\epsilon V\le1/8$ therefore gives $7/9\le s_d'\le9/7$. At all future receptions $s_d\ge s_d(0)$. The fixed recent supplied interval suffices for all negative-time derivative samples; the older complete past is still required for the full root census. No replacement past or artificial delay cutoff is used.

For $k\le4$, differentiating the acceleration equation $k$ times produces exactly one highest source derivative, $y^{(k+2)}(s_d)$, with coefficient $B(s)(s_d')^k$. Root derivatives through this order use at most position derivatives of order $k$; all other differentiated coefficients use at most $k+1$ derivatives. Thus the recursion is triangular in derivative order. In the temporary scale-comparison box, $L/H^2\ge1$, $D\ge7/8$ and $H/H_d\le2$. The largest weight exponent is sixteen, so the subject's constant $64\,2^{16}$ safely dominates $4(8/7)^3(9/7)^4 2^{16}$. It is a conservative bound, not a computed practical threshold.

At each order, the remaining normalized lower-jet expression has a finite supremum $N_k$ on the fixed compact box. Choose the next jet bound to exceed both the supplied value and $2N_k$, and only then choose $\epsilon$ sufficiently small to make the highest-source coefficient at most $1/2$. A delay-step first exit would satisfy $M\le N_k+M/2$; the strict enlarged bound prevents that exit. The positive minimum delay on every fixed terminal-scale interval ensures earlier source values are already supplied or constructed. Through fifth order the compatibility conditions give continuous seams; bounded sixth jets and the strictly increasing bounded source clock preserve the almost-everywhere sixth-order bound. This proves the weighted inventory on the state bootstrap interval, rather than postulating it as an all-time property.

The temporary source-scale comparison is not circular. It supplies loose derivative constants at the start. Those constants give the row error and angular estimate. The angular estimate then bounds relative scale change across the actual delay by $O((\epsilon/H)^4)$, strictly improving the temporary factor-two comparison. This is a simultaneous strict bootstrap of state, scale comparison and derivative inventory.

### 7.2 Mixed remainder and actual angular rate

The source-coordinate Taylor construction from the accepted finite adjudication applies to the normalized equation. Position is expanded through third degree, velocity through second degree with one propagation factor and acceleration through first degree with two factors. Differentiating the corresponding integral remainders twice reaches sixth source jets, including bounded propagated seams. It does not take four parameter derivatives of the full sampled-acceleration row. On the fixed weighted inventory it consequently yields a normalized $O((\epsilon/H)^4)$ row remainder and its first orbital-time derivative. Returning to global time gives precisely $|Q|\le C\epsilon^4H^{-8}$ and $|Q'|\le C\epsilon^4H^{-11}$.

Replacing actual acceleration by its leading central row in the quadratic term costs $O(\epsilon^4H^{-8})$. Replacing actual jerk by the derivative of that central row in the cubic term costs $O(\epsilon^5H^{-9})$, which is smaller. These substitutions use the actual differentiated equation and the triangular inventory; they do not use a prescribed circle as the coupled jerk. The resulting row is therefore the same scale-weighted expansion independently reconstructed in Sections 2–3.

Taking its determinant with $y$ gives

$$
h'=-\epsilon^2\frac{r'h}{r^2}+\frac43\frac{\epsilon^3h}{r^3}+y\times Q.
$$

The first term cancels upon differentiating $H=h\exp(-\epsilon^2/r)$. Hence $H'=(4/3)\epsilon^3H/r^3+q_H$, with $q_H=e^{-\epsilon^2/r}(y\times Q)$. Multiplication by $y=O(H^2)$ and one differentiation give $q_H=O(\epsilon^4H^{-6})$ and $q_H'=O(\epsilon^4H^{-9})$. Relative to the positive leading rate the error is $O(\epsilon/H)$, so sufficiently small initial $\epsilon$ gives two strictly positive constants bounding $H'$ by multiples of $\epsilon^3H^{-5}$. These constants are uniform in terminal scale. Integrating $H'/H$ across the actual delay closes the comparison used above.

### 7.3 Centered radial inequality and its growing factor

The radial projection of the quadratic term is $-\epsilon^2h^2/(2r^4)$ because $|y'|^2-(r')^2=h^2/r^2$. The cubic radial projection is $-(8/3)\epsilon^3r'/r^3$. Thus the subject's radial equation and comparison minimum agree with the independent construction. At release, $H_0^2 e^{2\epsilon^2}=1/(1-\epsilon^2/2)$; substitution into the minimum equation gives $\mathcal R(H_0,\epsilon)=1$ exactly. The initial centered displacement vanishes, while the centered velocity is $p_0=-\mathcal R_H H'_0=O(\epsilon^3)$.

I reconstruct the error inequality directly from the centered potential, retaining the changing center. Let $V=U_H(\mathcal R+w)-U_H(\mathcal R)$ and $E=p^2/2+V$. Smooth normalized curvature gives $E\asymp p^2+H^{-6}w^2$, $|V_H|\le CE/H$. In $p'$, the derivative of the center contributes $-\mathcal R_H H''-\mathcal R_{HH}(H')^2$, and

$$
H''=\frac43\epsilon^3\left(\frac{H'}{r^3}-\frac{3Hr'}{r^4}\right)+q_H'.
$$

Using $r'=p+\mathcal R_HH'$ gives the remainder bound $|B|\le C\epsilon^3H^{-6}|p|+C\epsilon^4H^{-8}$ in $p'=-V_w+B$. The important positive centered cubic coefficient found independently in Section 4 is included in this absolute bound; it is not silently replaced by damping.

Now $E'=pB+V_HH'$. It follows that $E'\le C\epsilon^3H^{-6}E+C\epsilon^4H^{-8}\sqrt E$. For $a=H\sqrt E$, the derivative of the prefactor adds another bounded $H'/H$ contribution. The result is $a'\le A_0\epsilon^3H^{-6}a+B_0\epsilon^4H^{-7}$, including its upper-Dini interpretation at zeros. Division by the positive angular rate gives $da/dH\le Aa/H+B\epsilon/H^2$ with fixed finite $A\ge1$ and $B$. Solving this scalar inequality independently gives

$$
a(H)\le (H/H_0)^A\left[a_0+\frac{B\epsilon}{(A+1)H_0}\left(1-(H_0/H)^{A+1}\right)\right].
$$

Thus $a\le C\epsilon(H/H_0)^A$. This matches the subject. It is an upper bound with an amplifying factor; it proves neither actual homogeneous growth nor its cancellation. The independently obtained leading exponent $3/2$ is consistent with such a sufficiently large $A$ and supplies no additional theorem about the exact delayed motion.

### 7.4 Finite endpoint, cumulative error and physical conversion

All constants are fixed from the normalized margins and the supplied finite jet inventory before the small-parameter choice. In particular $A$ does not depend on terminal scale or on $\epsilon$. Choose $\nu=1/[4(A+1)]$ and stop at $H_*=H_0\epsilon^{-\nu}$. Then $a\le C\epsilon^{1-A\nu}$ and $1-A\nu>3/4$. For sufficiently small $\epsilon$, this strictly closes the radial neighborhood and yields the weaker uniform $O(\epsilon^{1/2})$ estimate advertised in the theorem. The radial minimum correction is only $O(\epsilon^2/H^2)$ in relative radius. The decomposition of velocity into $r'$ and $h/r$ then improves its normalized speed margin. This completes the joint bootstrap, with no hidden use of unlimited near-circular persistence.

For each fixed $\epsilon>0$ the stopped scale interval is finite and bounded, with positive separation, fixed strict root margins and bounded compatible actual jets. Local candidate continuation therefore prevents an endpoint before $H_*$. The lower angular rate forces the scale to be reached in finite time. The source clock and positive minimum delay prevent finite accumulation of method steps. Combining the angular rate with $r/H^2=1+O(\epsilon^{1/2})$ gives

$$
\frac{dH^6}{ds}=8\epsilon^3[1+O(\epsilon^{1/2})].
$$

The reciprocal of this positive rate integrates uniformly, so $s_*=(H_*^6-H_0^6)/(8\epsilon^3)[1+O(\epsilon^{1/2})]$. Actual terminal radius is $r(s_*)=H_*^2[1+O(\epsilon^{1/2})]=\epsilon^{-2\nu}[1+O(\epsilon^{1/2})]$. These are actual same-history finite conclusions.

Independently changing integration variable from $s$ to $H$ gives $\int |Q|\,ds\le C\epsilon\int H^{-3}\,dH$ and $\int |q_H|\,ds\le C\epsilon\int H^{-1}\,dH$. The first is bounded by $C\epsilon$ and the second by $C\epsilon\log(H_*/H_0)$. The centered integrating factor, rather than these raw integrals alone, controls solution amplification. The subject correctly keeps that distinction.

Finally, for the corrected physical radius $\rho_{\rm slow}=R_0H^2$, conversion from $s$ to $T$ gives $d\rho_{\rm slow}^3/dT=8R_0^2v_0^4/c_f^3[1+O(\epsilon^{1/2})]=K^2/(2c_f^3)[1+O(\epsilon^{1/2})]$. This is a cube-radius rate for a corrected radius on the enlarged finite interval. The actual radius has relative error $O(\epsilon^{1/2})$, without pointwise monotonicity being established.

### 7.5 Accepted boundary, unresolved question and falsifiers

**Accepted, derived:** the frozen subject's finite changing-scale theorem for the declared compatible $C^{5,1}$ complete-past family, sufficiently small unquantified $\epsilon>0$, fixed $\nu>0$, the same candidate ordinary-root law and terminal scale $H_0\epsilon^{-\nu}$. The growing radius multiplier, sixth-jet bounds, exact source coverage, reciprocal-rate hitting estimate and cumulative row-error estimates are supported by a separate reconstruction. No failed lemma or coefficient correction was found in this boundary.

**Accepted, conditional derived statement:** if an independent proof supplies a uniform small centered-amplitude bound at every scale on that same actual history, the weighted continuation and rate estimates give all-future continuation with increasing unbounded $H$, radius tending to infinity and speed tending to zero. This is a continuation criterion whose dynamical hypothesis remains open.

**Unresolved:** an exact signed radial-mode estimate, noncancellation of its small initially excited mode, continuation through a wider eccentric chart, a practical numerical threshold, arbitrary compatible-past fate and all-future escape at fixed $\epsilon$. The positive averaged exponent in the pre-subject reference and subject's cubic diagnostic are not an exact instability verdict. No physical account or variant-selection inference is adopted.

The accepted finite theorem is falsified by an admitted compatible history that violates the exact rescaling or monotone source clock; a nontriangular differentiated row containing an extra sixth-order term; failure of the weighted mixed Taylor estimate on its sixth-jet class; an actual centered error exceeding its proved integrating-factor estimate; or a finite endpoint before the stopped scale despite all continuation margins. A practical failure at a speed outside an as-yet-unquantified sufficiently small regime does not directly refute this qualitative theorem. Opposite signed formal cycle coefficients would instead refute the pre-subject diagnostic and must be distinguished from these actual-history statements.

### 7.6 Scoped verification record

The reference snapshot and the three earlier accepted inputs remain byte-preserved by `shasum -a 256 -c` on their separate local inventories. The revised subject remains byte-preserved by the known-first Node SHA-256 comparison against the locally observed freeze. The scoped Markdown/math/link checker is run with its known controls before this report; it checks syntax and relative links, without being claimed as a mathematical instrument. `git diff --no-index --check /dev/null` on this new report establishes the absence of whitespace-error diagnostics only. No numerical target, production solver, Python, Git mutation, generated writer, queue or shared synthesis was used or changed. The mathematical acceptance is the separate analytic reconstruction in Section 7, not a replay of the author's inequalities or a document-check result.
