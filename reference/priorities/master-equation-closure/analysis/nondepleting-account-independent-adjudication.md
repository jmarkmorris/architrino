# Independent Adjudication of Nondepleting Observation and Account Channels

## Verdict and scope

**Accept the finite-transmitter-derivative scalar impossibility theorem at its explicitly universal supplied-history scope. Accept the complete-past total-variation theorem and the underdetermination of freely transported account weightings. Do not interpret any of these results as impossibility of conserved accounts on coupled EOM histories, or as a derivation of the proposed separate account state.** The central proof can be reconstructed from the causal-root equation and ordinary differentiation without assuming a kinetic formula or importing primitive mass.

The read-only subject is [Nondepleting observation and independent account channels](nondepleting-account-proposal.md). This review supplies a local source-derivative variation argument, independently derives the stationary scalar candidate, verifies the moving-source contradiction, and completes the global constancy step without relying solely on connected derivative fibers. It also states the integrability conditions needed to interpret the proposed reception currents as measures. The proposal's existing implementation tests are not the mathematical reference for acceptance.

The theorem tests an unusually strong account requirement: a receiver driven by one supplied source contribution must conserve its proposed local scalar for every independently variable source input, with no supplied-source account or transfer term. That is the class ruled out. An isolated coupled system's total account is a different object and has a different quantifier. The subject itself makes this distinction; it must remain explicit in integration.

| Statement under review | Verdict | Exact boundary |
| --- | --- | --- |
| Finite source-derivative dependence can be eliminated successively from the local scalar. | **Accept — derived conditional result.** | Requires independently variable next source derivatives at each stage, with the lower data fixed. Smoothness of one EOM trajectory alone does not provide this freedom. |
| The stationary-source test forces a quadratic speed scalar plus an inverse-distance scalar. | **Accept — derived.** | Uses independent positive speed/range intervals and the isotropic, separable ansatz. Its account scale remains unselected. |
| Small radial source motion makes that scale vanish. | **Accept — derived.** | Applies to the same universal supplied-history identity on $D_t>0$. It is not a measured failure of physical energy conservation. |
| The scalar is constant on the whole connected declared domain. | **Accept with explicit domain reading.** | The identity permits receiver vector variations at fixed root and source data; local derivative freedom holds throughout the tested domain. Section 4 supplies the remaining global argument. |
| Nonzero time-homogeneous signed/vector emission admits finite complete-past total variation while its finite cohorts are preserved. | **Reject; accept the corresponding impossibility theorem.** | Original emission labels and all surviving sectors are retained. Local finite variation and conditional totals are different requirements. |
| Kinematic transport and covariance select a unique account weighting. | **Reject; accept underdetermination.** | Many weightings satisfy those premises; they have not been shown to satisfy motion-plus-wake conservation. |
| Reception-time signed measures provide a derived joint account law or prove that new independent state is necessary. | **Reject as an inference.** | The display is an unadopted representation with unprovided currents, motion maps, supply, and global convention. Full-history constructions remain open. |

The [allocation adjudication](allocation-independent-adjudication.md), [wake-state analysis](analysis-independent-causal-wake-state.md), and canonical [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) are prior references. The [Energy chapter](../../../../content/markdown/aaa/dynamics/energy.md) preserves the distinction between an arbitrary motion-account scalar and a proved physical invariant. The frozen [quintic mirror assessment](quintic-mirror-boundary-assessment.md) is not used to infer any account or conservation result.

## 1. Independent root calculus

Work in normalized wake-speed units with $c_f=1$. Let $T$ be reception time and $s<T$ a source emission time. The source trajectory is $\mathbf X_t(s)$, and the receiver's present position and velocity are $\mathbf X_r(T)$ and $\mathbf V$. Define

$$
\mathbf R=\mathbf X_r(T)-\mathbf X_t(s),\qquad
R=\|\mathbf R\|>0,\qquad
\mathbf n=\frac{\mathbf R}{R},\qquad
\mathbf W=\mathbf X_t'(s)
$$

Here $t,r$ in trajectory subscripts are persistent labels, not time variables. For a simple causal root, the residual and its derivatives with the other argument fixed are

$$
F(T,s)=R-(T-s)=0,\qquad
F_s=1-\mathbf n\cdot\mathbf W=D_t,\qquad
F_T=\mathbf n\cdot\mathbf V-1=-D_r
$$

This review needs only the open chart $D_t>0$. Implicit differentiation gives the playback rate $\gamma=ds/dT=D_r/D_t$ and

$$
\dot{\mathbf R}=\mathbf V-\gamma\mathbf W,\qquad
\dot R=\mathbf n\cdot(\mathbf V-\gamma\mathbf W)
=\frac{\mathbf n\cdot(\mathbf V-\mathbf W)}{D_t}
$$

The last equality uses $D_t+\mathbf n\cdot\mathbf W=1$. The canonical receiver acceleration contributed by this single channel is

$$
\dot{\mathbf V}=\frac{C}{R^2D_t}\mathbf n,\qquad
C=\kappa\sigma_{tr}|q_tq_r|\ne0
$$

The fixed coefficient $C$ may have either polarity sign. Playback is not an acceleration multiplier. In particular, $D_r=0$ neither destroys source-root simplicity nor forces this acceleration to vanish.

For the source derivative list $\mathbf Z_k=\mathbf X_t^{(k)}(s)$, differentiation along the root gives $\dot{\mathbf Z}_k=\gamma\mathbf Z_{k+1}$. For any proposed account of the subject's form,

$$
\mathscr E=K(v)+U(\mathbf R,\mathbf Z_1,\ldots,\mathbf Z_m),\qquad
v=\|\mathbf V\|>0
$$

the full derivative is therefore

$$
\boxed{
\dot{\mathscr E}
=\frac{C K'(v)}{vR^2D_t}\,\mathbf n\cdot\mathbf V
+\nabla_{\mathbf R}U\cdot(\mathbf V-\gamma\mathbf W)
+\gamma\sum_{k=1}^m\nabla_{\mathbf Z_k}U\cdot\mathbf Z_{k+1}
}
$$

An empty sum is understood when $m=0$. This identity includes every derivative allowed by the ansatz: present receiver velocity enters $K$, source derivatives enter $U$, and no explicit epoch or other evolving account is present. It is the independent reference for the scalar adjudication.

Claim grade: **derived** from the displayed causal residual and canonical acceleration. A differentiation error in $F_s$, $F_T$, $\dot{\mathbf R}$, or the complete chain rule would falsify the reference. No physical meaning or conservation property is assigned to $K$ merely by differentiating it.

## 2. What independently variable supplied histories mean

The highest-derivative argument is legitimate for a rich class of supplied smooth source histories. It is not an automatic property of arbitrary constrained histories, and it is not a conclusion about source derivatives on a coupled EOM solution.

At a fixed root $(T_0,s_0)$, take a smooth cutoff $\chi$ equal to one near zero and supported in a small interval about zero, chosen so its translated support stays strictly before $T_0$. For an integer $k\ge1$ and a small vector $\mathbf h$, the source perturbation

$$
\delta\mathbf X_t(s)
=\mathbf h\frac{(s-s_0)^{k+1}}{(k+1)!}\chi(s-s_0)
$$

has zero derivatives through order $k$ at $s_0$ and changes only the next derivative there by $\mathbf h$. It leaves the emission position, the given causal equality, the source velocity, and $D_t$ at the root unchanged. The present receiver position and velocity can be held fixed as initial data for the local driven receiver equation. An open set of $\mathbf h$ gives precisely the finite-derivative freedom used by the subject.

This is a local variation of the theorem's supplied inputs, not a proposed physical trajectory or a new regularizer. It is possible to verify that the variation need not create an omitted root in the strictly subfield controls actually used for the contradiction. Start with a complete stationary or small-velocity affine source and take the perturbation sufficiently small in first derivative that the whole source remains below speed one. Then

$$
F_s=1-\mathbf n\cdot\mathbf X_t'(s)
\ge1-\|\mathbf X_t'(s)\|>0
$$

at every positive-range candidate emission. More generally, a global speed bound $v_{\max}<1$ and the triangle inequality give $F(T_0,s_2)-F(T_0,s_1)\ge(1-v_{\max})(s_2-s_1)>0$ for $s_2>s_1$, including any zero-separation nondifferentiability away from the root. The stationary or affine tail supplies a negative residual sufficiently far in the past, and $F(T,T)>0$ when present source and receiver positions differ. There is exactly one past root. The compact perturbation preserves this tail and the strict monotonicity. The source and receiver remain separated in a sufficiently short reception neighborhood, where the driven single-root receiver equation has a smooth local right side.

The construction demonstrates that the needed local freedom is consistent with regular supplied-history controls near stationary and small radial source motion. It does not prove that all points in an arbitrarily constrained source-history domain have this freedom. For the theorem's conclusion on the whole declared domain, its explicit assumption 3 remains necessary at each point: the next derivative must vary in an open set with the lower data fixed, and the same property must remain available at every descending elimination step.

The domain also needs independent receiver-velocity variations at fixed root and source data, as intended by the subject's universal present-velocity test. An open speed interval with all receiver directions supplies this. The phrase “all directions” must not be weakened to directions only along one dynamically selected receiver path. Section 4 uses this freedom to complete global constancy even if derivative fibers are not individually connected.

For a coupled EOM history, the source's acceleration and higher derivatives may instead be determined by its own complete causal-root sum and by the rest of the population. A local perturbation of the source alone need not preserve those equations, common past data, or source accounts. No source-derivative surjectivity theorem on such coupled histories is supplied here. The present universal input assumption is a mathematical test class, not an adopted population or history law.

Claim grade: **derived** for local realizability of the stated supplied-history variations and for the theorem conditional on that freedom throughout the tested domain. A source perturbation that changes a supposedly fixed lower derivative would falsify the construction. A domain constraint that forbids the perturbation defeats the freedom hypothesis and limits the theorem's applicability; it does not establish a counterexample within that hypothesis. No coupled EOM conclusion may be based on this argument without a separate realizability proof.

## 3. Independent elimination of every finite source derivative

Assume first that $m\ge1$ and $D_r\ne0$. In the boxed chain rule the only occurrence of $\mathbf Z_{m+1}$ is

$$
\gamma\nabla_{\mathbf Z_m}U\cdot\mathbf Z_{m+1}
$$

All remaining quantities are fixed when the next derivative varies. Conservation for an open set of $\mathbf Z_{m+1}$ requires its vector coefficient to vanish. Since $\gamma\ne0$, this yields $\nabla_{\mathbf Z_m}U=\mathbf0$.

On any open coordinate neighborhood, the vanishing partial derivative makes $U$ independent of $\mathbf Z_m$ there. The remaining partial derivatives in the chain rule consequently have the same local independence. The next variable $\mathbf Z_m$ is then the freely variable highest derivative, whose coefficient is $\gamma\nabla_{\mathbf Z_{m-1}}U$. Repetition gives

$$
\nabla_{\mathbf Z_k}U=\mathbf0,\qquad 1\le k\le m
$$

The argument needs only continuously differentiable $U$, using local coordinate neighborhoods at each step; it does not secretly differentiate $U$ twice. At fixed $U$ arguments, $D_r=0$ can be avoided by changing the independently supplied receiver velocity, because $U$ has no such velocity argument. Alternatively, $D_r\ne0$ is dense in the open receiver-velocity domain and the derivative identity extends continuously. The playback-zero section supplies no escape from elimination.

For $m=0$ no elimination is needed. In either case $U$ is locally a function of $\mathbf R$ alone. In the neighborhood of stationary source data, rotation invariance then makes it radial: $U=u(R)$. The derivative result is pointwise throughout the tested open domain; final global constancy will be proved separately in Section 4 rather than assumed from connectedness alone.

Claim grade: **derived conditional derivative elimination**. A nonzero $\nabla_{\mathbf Z_k}U$ compatible with the complete chain-rule identity under the corresponding independent next-derivative variation would falsify the proof. A transmitter constrained by its own EOM, an interaction scalar depending on receiver velocity, an infinite history functional, or explicit source transfer changes the hypotheses.

## 4. Stationary reduction, moving-source contradiction, and global constancy

At stationary source data $\mathbf W=\mathbf0$, the root formulas reduce to $D_t=1$ and $\dot R=\mathbf n\cdot\mathbf V$. The universal account identity becomes

$$
\left(\frac{C K'(v)}{vR^2}+u'(R)\right)\mathbf n\cdot\mathbf V=0
$$

Choose a receiver direction with $\mathbf n\cdot\mathbf V\ne0$. At one fixed admissible range, varying speed over its connected positive interval shows that $K'(v)/v$ is a single constant $a$. Varying range independently then gives $u'(R)=-aC/R^2$. Hence

$$
K(v)=\frac a2v^2+K_0,\qquad
u(R)=\frac{aC}{R}+u_0
$$

The plus sign in the inverse-distance scalar is necessary: its derivative is negative and cancels the radial acceleration contribution in the stationary test. Both functions have been derived from the tested separability and universal input assumptions. The parameter $a$ is an arbitrary scalar-account scale; it is neither selected nor identified as primitive mass.

Within the same open derivative neighborhood, change the source velocity to a small nonzero radial value. Local derivative elimination preserves the same expression for $U$ there. Substitution into the independently derived range rate gives

$$
\dot{\mathscr E}
=\frac{aC\,\mathbf n\cdot\mathbf V}{R^2D_t}
-\frac{aC\,\mathbf n\cdot(\mathbf V-\mathbf W)}{R^2D_t}
=\frac{aC\,\mathbf n\cdot\mathbf W}{R^2D_t}
$$

The domain permits $\mathbf n\cdot\mathbf W\ne0$ while $D_t>0$. Since $C\ne0$, universal zero rate therefore forces $a=0$. Thus $K$ is constant on its entire connected speed interval. This accepts the subject's stationary reduction and moving-source contradiction.

### Completing constancy on the whole domain

Connectedness of a total domain does not, by itself, imply that all its fibers at fixed $\mathbf R$ are connected. That topological shortcut is unnecessary. Once $K'=0$ and all source-derivative partials vanish, set $\mathbf g=\nabla_{\mathbf R}U$ at any tested point. Multiplying the remaining identity by $D_t$ gives

$$
0=D_t\,\mathbf g\cdot\mathbf V-(1-\mathbf n\cdot\mathbf V)\mathbf g\cdot\mathbf W
=\left[D_t\mathbf g+(\mathbf g\cdot\mathbf W)\mathbf n\right]\cdot\mathbf V-\mathbf g\cdot\mathbf W
$$

The same affine function of $\mathbf V$ vanishes on an open receiver-velocity set. Its linear and constant coefficients must separately vanish. The constant gives $\mathbf g\cdot\mathbf W=0$; the linear coefficient then gives $D_t\mathbf g=\mathbf0$. Since $D_t>0$, $\nabla_{\mathbf R}U=\mathbf0$ at every point. Together with the eliminated source partials, the entire gradient of $U$ is zero. A continuously differentiable function with zero gradient is locally constant, and connectedness of the declared open domain then makes $U$ one constant globally.

This supplies the claimed global theorem under the intended independent receiver-vector domain. It requires no unproved ability to move every source derivative point all the way to stationary data at fixed separation. If the tested domain provides only one receiver velocity at each state, this completion and the subject's universal-input theorem cannot be used as written.

### Exact arithmetic on the inherited controls

For the subject's existing moving-source input $C=a=1$, $R=2$, $\mathbf n=(1,0,0)$, $\mathbf W=(1/4,0,0)$, and $\mathbf V=(2/5,0,0)$, direct rational arithmetic yields

$$
D_t=\frac34,\quad D_r=\frac35,\quad
\gamma=\frac45,\quad \dot R=\frac15,\quad
\dot K=\frac2{15},\quad \dot u=-\frac1{20},\quad
\dot{\mathscr E}=\frac1{12}
$$

At the inherited playback-zero diagnostic $\mathbf V=\mathbf n$, the same calculation gives $\gamma=0$, $\dot R=1$, $\dot K=1/3$, $\dot u=-1/4$, and again $\dot{\mathscr E}=1/12$. This verifies that the contradiction comes from source motion and survives zero playback. Neither control is offered as an isolated coupled EOM trajectory or a measured physical energy defect.

Claim grade: **derived conditional impossibility, independently accepted**. A nonconstant $K,U$ satisfying the complete universal identity and all the declared freedoms would falsify it. The source-motion rate, the positive $D_t$ denominator, or the affine-in-velocity coefficient argument provide direct places to check a proposed counterexample. A conserved total involving source motion, other receivers, full history, or a separate account is outside this ansatz.

## 5. Carrier-to-account underdetermination

The carrier identifies source labels and transports points as $\mathbf Y(T;s,\boldsymbol\omega)=\mathbf C(s)+(T-s)\boldsymbol\omega$. On a finite cohort $I\times S^2$, retain the measure $d\lambda=ds\,d\boldsymbol\omega/(4\pi)$. For any bounded scalar functions $f,g$ of the source polarity and squared emission speed, attach

$$
e=f(q_t,\|\mathbf W\|^2),\qquad
\boldsymbol\pi=g(q_t,\|\mathbf W\|^2)\boldsymbol\omega
$$

Neither function occurs in the carrier's acceleration readout. Choosing two distinct such functions therefore leaves the same canonical acceleration at identical root geometry while changing the proposed scalar or vector measures. The weights are additive over disjoint label sets, unchanged during free transport, and covariant under translations and proper rotations. Their orbital moment about $\mathbf O$ on a measurable cohort subset $\mathcal A$ has derivative

$$
\frac{d}{dT}\int_{\mathcal A}(\mathbf Y-\mathbf O)\times\boldsymbol\pi\,d\lambda
=\int_{\mathcal A}\boldsymbol\omega\times\boldsymbol\pi\,d\lambda=\mathbf0
$$

for the radial family displayed above. Even fixing an account unit does not select the functions of source invariants. The family proves that the listed kinematic and covariance premises do not identify a unique account weighting. It does not prove that any nonzero family member supplies a conserved motion-plus-wake account, nor that there are two successful physical completions.

For the stationary receiver multiplicity control, the observation variation per ordered channel is $L|C|/R^2$, while a cohort of emission duration $L$ has label measure $L$ independently of receiver count. Repeated reading does not change a source-label measure. A sum of actual reception currents would depend on their independently specified values; the acceleration formula does not fix those values. The receiver configurations are supplied-history controls, just as in the accepted allocation adjudication. This result contains no assertion that arbitrary receiver multiplicity occurs in one admitted coupled evolution.

Claim grade: **derived underdetermination from the stated carrier premises**, independently accepted. A term in the frozen acceleration readout that distinguishes the displayed weightings, or a derivation from those same premises selecting one and rejecting the others, would falsify it. Adding a joint constitutive or conservation requirement changes the tested premise set.

## 6. Complete-past total variation

Let $b(\boldsymbol\omega)$ be an integrable scalar or finite-dimensional vector density on the sphere, constant in source emission time. Preserve its value and original emission labels during free transport. For a fixed present time $T$, a past window of length $H$ carries the measure, evaluated on a measurable label set $\mathcal A$,

$$
\mu_H(\mathcal A)=\int_{\mathcal A\cap((T-H,T]\times S^2)}
b(\boldsymbol\omega)\,ds\,\frac{d\boldsymbol\omega}{4\pi}
$$

Total variation is the supremum, over finite measurable partitions, of the sum of the absolute scalar values or vector norms on the pieces. For a density relative to a positive measure, it equals the integral of the density norm. The upper bound follows by the triangle inequality on every partition. For the reverse bound, approximate the integrable density in norm by simple functions, for which a partition into their constant-value sets gives equality; the approximation error bounds the possible variation difference. Thus

$$
\|\mu_H\|_{\mathrm{TV}}=HB,\qquad
B=\int_{S^2}\|b(\boldsymbol\omega)\|\,\frac{d\boldsymbol\omega}{4\pi}
$$

Here $B$ is finite and is positive exactly when $b$ is nonzero on a set of positive angular measure. Any complete-past measure agreeing with every finite-window restriction has variation at least $HB$ for every $H$. It cannot have finite total variation when $B>0$. If $B=0$, the specified density is zero almost everywhere and the zero measure is the corresponding finite-variation extension. This proves the subject's signed/vector extension without relying on cancellation-sensitive net totals.

For the inherited radial example $b=p_0\boldsymbol\omega$, reflection of each direction to its opposite makes the spherical vector integral zero, while $\|b\|=|p_0|$. Consequently

$$
\mu_H((T-H,T]\times S^2)=\mathbf0,\qquad
\|\mu_H\|_{\mathrm{TV}}=|p_0|H
$$

The vanishing net vector does not bound the absolute content on the retained label space. A pushforward that identifies and cancels distinct labels can have smaller variation, but then it no longer preserves the finite-cohort restrictions assumed by this theorem.

A retention horizon $h_0<H$ partitions the same variation into $h_0B$ and $(H-h_0)B$. Export cannot reduce their sum. If a nonnegative age factor $w(a)$ describes the amount still present anywhere in the counted system, the complete variation becomes $B\int_0^\infty w(a)\,da$. A transfer to another counted sector is not disappearance from $w$. No such decay rule, finite past, or sink is selected here.

The theorem rules out finite global total variation under time-homogeneous undiminished emission. It permits measures that have finite variation on each finite time window but infinite variation on the full past. It also does not settle deliberately chosen conditional summations, which must state their label quotient or order and have their own conservation argument. The statement for eternal constant-velocity sources is conditional on their emission rule actually producing a time-independent density.

Claim grade: **derived conditional complete-past impossibility**, independently accepted. A finite-total-variation measure with these exact nonzero finite-window restrictions would falsify the proof. A locally finite measure with infinite global variation is permitted and is not a counterexample. No zero-emission physical law, acceleration tail estimate, or population restriction follows.

## 7. What the separate-channel display does and does not define

The subject proposes scalar and vector measures on existing source labels, with transfer rates in reception time. This is a possible representation of a law to be supplied. It does not specify one. To give its display a precise mathematical meaning, let $\ell_h(T)$ be a measurable label path for each channel and let $j_h(T)$ be a measurable scalar or vector current. On a bounded reception interval $J$, the proposed transfer measure evaluated on a measurable label set $\mathcal A$ is

$$
\nu_J(\mathcal A)=\sum_h\int_J j_h(T)\,\mathbf1_{\mathcal A}(\ell_h(T))\,dT
$$

For a finite collection of channels, integrable currents give a finite-variation measure. More generally, a sufficient local condition is absolute summability of the current variations for the labels being counted:

$$
\|\nu_J\|_{\mathrm{TV},\mathcal A}
\le\sum_h\int_J\|j_h(T)\|\,\mathbf1_{\mathcal A}(\ell_h(T))\,dT<\infty
$$

The source terms must satisfy their analogous measure requirements. This is a well-defined signed or vector pushforward under those assumptions. The equation has no obligatory $D_r/D_t$ multiplier because its integration variable is reception time. If an emission label is momentarily stationary, a supplied reception-time current need not vanish. This mathematical possibility supplies neither a current value nor its physical funding and cannot be taken as a realized coupled playback-zero transfer.

Local finite variation of the proposed account is therefore a constraint that a future law must satisfy, not a guarantee supplied by writing delta symbols. For an infinite channel family, unproved summability cannot be concealed by formal cancellation. Signed reception atoms also need not remain bounded by a pre-existing nonnegative source capacity; that is why this proposal is outside the accepted funded-observation assumptions. The changed account interpretation remains unadopted.

### Angular and causal conditions

At a reception point $\mathbf X_r=\mathbf C+R\boldsymbol\omega$, opposite momentum-account increments booked at that same point have cancelling orbital increments about every origin. Booking the wake increment at the old center instead leaves

$$
(\mathbf X_r-\mathbf C)\times\Delta\mathbf p
=R\boldsymbol\omega\times\Delta\mathbf p
$$

Free transport of a fixed stored momentum vector gives orbital rate $\boldsymbol\omega\times\boldsymbol\pi$. If every measurable source sector is to have unchanged orbital account during such transport without another angular contribution, this integrand must vanish almost everywhere, which requires radial $\boldsymbol\pi$. Cancellation of the rate on one complete sphere would be weaker. These conditions constrain an account once its momentum map and update have been given; radial acceleration alone does not select them.

On compact label sets of a continuous source history, locally finite momentum variation is enough to define the local orbital moment. For a global orbital integral, write $d\boldsymbol{\mathsf P}_T=\mathbf e_P\,d|\boldsymbol{\mathsf P}_T|$, where $\mathbf e_P$ is the unit vector density giving the direction of the momentum measure almost everywhere with respect to its variation. Absolute integrability of the orbital moment requires the exact condition

$$
\int\|(\mathbf Y(T)-\mathbf O)\times\mathbf e_P\|\,d|\boldsymbol{\mathsf P}_T|<\infty
$$

The stronger spatial first-moment bound $\int\|\mathbf Y(T)-\mathbf O\|\,d|\boldsymbol{\mathsf P}_T|<\infty$ is sufficient, not necessary. In particular, for radial momentum density $\boldsymbol\pi\parallel\boldsymbol\omega$, the identity $(\mathbf Y-\mathbf O)\times\boldsymbol\pi=(\mathbf C-\mathbf O)\times\boldsymbol\pi$ cancels the expanding-radius contribution separately at each label. Generic finite unweighted momentum variation alone does not establish the exact global moment condition when emission centers and directions are unrestricted. A conditional orbital sum would need a separately declared convergence convention. The proposal's local measure notation supplies none of these global properties by itself.

The original outgoing ray after reception has radius $R+u$ at later elapsed absolute time $u\ge0$. Since $R>0$, it cannot return to its fixed emission center. A simultaneous debit at a spatially separate source or a return signal therefore needs additional causal support; neither follows from the original source label. This does not exclude a later moving source intersecting another surface.

### Independent currents remain unprovided

If a candidate motion scalar $K(\|\mathbf V_r\|)$ and momentum map $\mathbf p(\mathbf V_r)$ have been specified independently, reception-only balance would test

$$
j_{E,h}=\nabla_{\mathbf V_r}K\cdot\mathbf A_h,\qquad
\mathbf j_{P,h}=D\mathbf p(\mathbf V_r)\,\mathbf A_h
$$

These equalities are compatibility tests for separately derived maps, with every other simultaneous transfer included when present. Defining the currents by their required right sides would force the desired cancellation and would not independently derive conservation. The subject properly leaves the currents, motion maps, source supply, initial accounts, and global finiteness convention unprovided.

The proposed scalar/vector representation is therefore **not accepted as a physical account law or a mathematically minimal extension**. It is coherent notation under the stated measurability and variation conditions, and it names where an independent law must enter. The scalar impossibility theorem does not prove new state is necessary: a nonlocal functional of complete coupled history, or a different receiver-dependent account, remains outside its hypotheses. Even within additive sphere-carried representations, a claim of minimality would need a specified equivalence relation and comparison class; two displayed measure symbols do not prove it.

Claim grade: **derived conditional measure and orbital identities; guessed constitutive proposal with unresolved existence and physical interpretation**. A failure of the measure bound or common-origin moment arithmetic under its exact conditions would falsify the mathematical claims. A specified law with divergent local variation, future dependence, inconsistent source ownership, or residual-defined currents would fail the proposed architecture's own requirements. A successful full-history account without added state would contradict any stronger necessity claim, which is not accepted here.

## 8. Integration and decision boundary

The coordinator can integrate this bounded adjudication:

> Independent reconstruction accepts the finite-transmitter-derivative scalar impossibility theorem for universal regular supplied-history channel identities. Open next-derivative freedom eliminates every finite source derivative. Independent speed and range variation at a stationary source forces a quadratic-plus-inverse-distance family, and small radial source motion forces its account scale to zero. Receiver-vector variation completes constancy over the connected domain. These freedoms are hypotheses of the supplied-input test and are not proved for coupled EOM histories. The result excludes that local additive scalar ansatz, not full-history or source-inclusive conserved accounts.

> The complete-past signed/vector result is also accepted: unchanged nonzero time-homogeneous density has variation proportional to the past-window length on the original label space, regardless of a zero net vector. Kinematic propagation and covariance leave account weightings undetermined. The proposed reception-time signed measures express a possible channel only when measurability and local current-variation bounds hold; they do not determine currents, supply, motion maps, global moments, or physical conservation. Separate state is neither adopted nor proved necessary.

No decision is needed to complete this review. The immediate recommendation is to integrate the conditional impossibility and variation results with their quantifiers intact. The representation proposal may be discussed as an explicit account-architecture choice, but this review supplies no basis to adopt its physical interpretation, free initial data, or global convention. The frozen characteristic-tail action's negative scope remains independent of this scalar theorem; neither result excludes every action or full-history account.

| Review work | Disposition |
| --- | --- |
| Independent causal-root and complete account differentiation | ✓ Done — derived reference in Section 1. |
| Source freedom and supplied-history versus coupled-input audit | ✓ Done — Section 2 makes the applicable quantifier explicit. |
| Finite derivative elimination, stationary reduction, and moving contradiction | ✓ Done — accepted with the global domain completion in Sections 3–4. |
| Complete-past signed/vector variation and carrier underdetermination | ✓ Done — accepted at the stated scope in Sections 5–6. |
| Separate-channel representation and missing law audit | ✓ Done — conditional measure meaning and unresolved constitutive content identified in Section 7. |
| Shared synthesis and lifecycle integration | ○ Not done — coordinator-owned; proposed text supplied. |
| Physical account law, full-history conservation, or adoption | ○ Not done — unestablished and outside this review. |

## 9. Validation and frozen references

The mathematical acceptance rests on the independent chain rule, local source-derivative variation, stationary separation argument, moving-source residual, global affine-in-velocity argument, and density-norm measure proof shown above. No equality of implementation outputs is used as proof of the universal theorem or of physical conservation.

Measured by `test ! -e` on the assigned report and scratch paths, neither existed before this review created them. The subject and the mathematical references were copied under `.tmp/nondepleting-account-review/frozen/`, including the previous quintic assessment, and their live source identities were recorded with `shasum -a 256` in `.tmp/nondepleting-account-review/input-sha256.txt`. All subject documents, reference proofs, source code, acceptance tests, and shared trackers remain read-only in this task.

The existing document checker was copied unchanged from the quintic assessment's scratch directory; `cmp` confirmed identical bytes. Before any target run, `node .tmp/nondepleting-account-review/check-document.mjs --known` recorded the expected three expressions, one display, and one real file link, while rejecting bad TeX, unmatched delimiters, missing targets, and trailing whitespace. The receipt is `known-controls.json` in this review's scratch directory.

Measured by `"${AAA_VENV:-../.venv}/bin/python" .tmp/nondepleting-account-review/check-mathematics.py --known`, the task-local instrument first passed an elementary exact derivative and the inherited stationary inverse-square control, obtaining opposite account rates $1/10$ and $-1/10$ with zero sum and rejecting an incorrect nonzero answer. This pass was stored in `mathematics-known.json` before the target run. The project venv, with SymPy 1.14.0, performed all Python work.

Measured by the subsequent `check-mathematics.py` target run, exact symbolic and rational checks accepted the generic moving-source residual, the inherited moving and playback-zero values $1/12$, the local derivative perturbations at orders $k=1,2,3,5$, the invertible velocity-coefficient matrix, and the radial angular integral's zero vector mean versus unit norm integral. The receipt is `mathematics-check.json`. The finite derivative checks test the instrument and displayed algebra; the general finite-order proof and history quantifiers are established in Sections 2–4, not by those examples. No subject implementation was imported as the reference for these checks.

Measured by `node .tmp/nondepleting-account-review/check-document.mjs reference/priorities/master-equation-closure/analysis/nondepleting-account-independent-adjudication.md`, the report passes dollar balance, KaTeX syntax, local file-link existence, terminology, and whitespace checks; `document-check.json` records its limited scope. No fragment links need a separate heading check. A mathematical readback checked the root chain rule, local-versus-global derivative argument, scalar signs, affine velocity identity, complete-past extension, and the exact orbital integrability boundary.

Measured by `node scripts/validate-content.mjs --check --strict`, repository content validation completed with zero errors and zero warnings; the receipt is `strict-content-check.txt`. The command `git diff --no-index --check -- /dev/null reference/priorities/master-equation-closure/analysis/nondepleting-account-independent-adjudication.md` supplies the new-file whitespace check. Measured by `shasum -a 256 -c .tmp/nondepleting-account-review/input-sha256.txt`, every listed frozen subject, proof, source, and acceptance test retains its initial bytes; the receipt is `input-preservation.txt`. These checks support syntax and scoped preservation, not physical account acceptance. A failed corresponding rerun or mismatched listed digest would falsify the measured claims.
