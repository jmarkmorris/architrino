# Nondepleting observation and independent account channels

## Result and authority

The regular causal carrier determines emission labels, propagation, reception direction, and acceleration. Treating that acceleration as a nondepleting observation leaves the account values undetermined: identical carrier evolution admits different freely transported scalar and vector weightings. Even covariance, unique source ownership, and free-transport additivity do not select an energy or momentum weighting. This is a precise underdetermination of the carrier-to-account inference, not a theorem that every possible conserved functional of the complete dynamics is impossible.

The main new result is a conditional impossibility theorem: **no nonconstant additive receiver energy consisting of an isotropic function of present speed plus a scalar depending on the present causal separation and any finite number of transmitter derivatives is conserved for every regular one-source supplied-history input.** The proof removes the highest transmitter derivative successively, derives the only stationary-source candidate instead of assuming a conventional kinetic formula, and then rejects that candidate on the existing moving-transmitter algebraic control. Adding finitely many transmitter derivatives cannot repair the previously identified scalar-root energy deficit within this class.

A second sharpening concerns signed accounts. On a source with time-independent emission data, nonzero age-preserving emission has complete-past **infinite total variation**, even when angular or polarity cancellation makes its net vector total zero. Nondepleting observation does not remove that accumulation. Finite local accounts remain possible; finite global accounts require another premise.

The surviving proposal is an explicitly separate, causally updated account sector whose transfers are expressed in reception time and whose values come from an independent constitutive law. Section 7 gives its smallest representation within a declared additive measure class and identifies the additional assumptions. It is a proposal for operator decision, not an adopted state, a specified physical transfer law, or conservation evidence. The bounded result here is the impossibility and identifiability analysis. No population class, summation convention, kinetic account, boundary law, or singular continuation is selected.

The mathematical references are [the independent wake-state analysis](analysis-independent-causal-wake-state.md), [the allocation adjudication](allocation-independent-adjudication.md), [the regular carrier and closure summary](independent-causal-wake-state-closure.md), the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), and [Energy](../../../../content/markdown/aaa/dynamics/energy.md). Their existing results are inputs. In particular, the accepted funded-observation obstruction is not counted as a new result of this proposal.

## 1. What the regular carrier actually supplies

Work in normalized wake-speed units with $c_f=1$. Let $T$ be absolute reception time, $s<T$ emission time, $t$ a transmitter label, and $r$ a receiver label. A direction $\boldsymbol\omega\in S^2$ identifies a point on the emitted sphere. An emission retains its center $\mathbf C_t(s)=\mathbf X_t(s)$ and propagates according to

$$
\mathbf Y_t(T;s,\boldsymbol\omega)
=\mathbf C_t(s)+(T-s)\boldsymbol\omega,
\qquad
\partial_T\mathbf C_t(s)=\mathbf0,
\qquad
\partial_T\mathbf Y_t=\boldsymbol\omega
$$

The sphere expands about its fixed emission site. Its direction label and transmitter identity persist; a later reception does not change this kinematic propagation.

At a positive-range simple root, define the separation vector $\mathbf R=\mathbf X_r(T)-\mathbf X_t(s)$, its length $R=\|\mathbf R\|$, and its unit direction $\mathbf n=\mathbf R/R$. Put $\mathbf V=\mathbf V_r(T)$, $\mathbf W=\mathbf V_t(s)$, and $C=\kappa\sigma_{tr}|q_tq_r|\ne0$, where $\sigma_{tr}$ is the polarity sign. The root condition, transmitter factor, receiver factor, and acceleration are

$$
F(T,s)=R-(T-s)=0,
\qquad
D_t=1-\mathbf n\cdot\mathbf W\ne0,
\qquad
D_r=1-\mathbf n\cdot\mathbf V,
\qquad
\mathbf A_h=\frac{C}{R^2|D_t|}\mathbf n
$$

The subscript $h$ identifies this ordered reception channel and root. Differentiating the root condition gives

$$
\frac{ds}{dT}=\frac{D_r}{D_t},
\qquad
\frac{dR}{dT}=1-\frac{D_r}{D_t}
=\frac{\mathbf n\cdot(\mathbf V-\mathbf W)}{D_t}
$$

Thus present receiver velocity changes which emission label is being read. It does not change the acceleration value at fixed root geometry. At $D_r=0$, the root can remain simple in emission time and the acceleration can remain nonzero.

Let $\mathcal W_T^{\mathrm{kin}}$ denote this emitted-surface record and $\mathcal O_h$ its canonical acceleration readout. The investigated nondepleting architecture requires the reception read itself to satisfy

$$
\mathcal O_h(\mathcal W_T^{\mathrm{kin}})=\mathbf A_h,
\qquad
\Delta_h\mathcal W_T^{\mathrm{kin}}=0
$$

This is an observation rule. It does not assert $\Delta E=0$, $\Delta\mathbf P=\mathbf0$, or that nonzero acceleration costs any particular account amount. The trajectory still changes, and the receiver's later emissions reflect its changed trajectory under the existing kinematic rule.

**Claim grade: derived for the root identities and kinematic propagation; guessed for selecting nondepleting observation as the account architecture.** Falsifier: direct differentiation on an admitted positive-range simple root that contradicts the displayed identities. A proposed account update that changes the canonical readout at identical retained-history geometry fails this architecture's reduction requirement.

## 2. An explicit account-identification freedom

Consider one fixed finite emission cohort $I\times S^2$ from a single transmitter, with normalized label measure

$$
d\lambda=ds\,\frac{d\boldsymbol\omega}{4\pi}
$$

A cohort is the set of labels emitted during the finite interval $I$; it is counted once, independently of how many receivers read it. This measure is a geometric emission measure. Multiplying it by the polarity does not mean that new primitive charge is created at every emission.

Choose any integrable scalar weighting $e(s,\boldsymbol\omega)$ and vector weighting $\boldsymbol\pi(s,\boldsymbol\omega)$ at emission. Merely transport these weights unchanged on the existing spheres. Their candidate scalar, vector, and orbital accounts on a measurable label set $B$ are

$$
E_B=\int_B e\,d\lambda,
\qquad
\mathbf P_B=\int_B\boldsymbol\pi\,d\lambda,
\qquad
\mathbf L_B(T;\mathbf O)
=\int_B(\mathbf Y_t(T)-\mathbf O)\times\boldsymbol\pi\,d\lambda
$$

Here $\mathbf O$ is a fixed origin. These are candidate weightings, not physical energy and momentum definitions. They are additive over disjoint label sets, and the first two are constant during free transport of a fixed cohort. Because $\partial_T\mathbf Y_t=\boldsymbol\omega$,

$$
\frac{d\mathbf L_B}{dT}
=\int_B\boldsymbol\omega\times\boldsymbol\pi\,d\lambda
$$

In particular, every radial weighting $\boldsymbol\pi=g(s,\boldsymbol\omega)\boldsymbol\omega$ also preserves this orbital account during free propagation. That conclusion uses geometry only; it does not fix $g$ or relate it to $e$.

The freedom persists under proper-rotation and translation covariance. For example, take

$$
e=f\big(q_t,\|\mathbf V_t(s)\|^2\big),
\qquad
\boldsymbol\pi
=g\big(q_t,\|\mathbf V_t(s)\|^2\big)\boldsymbol\omega
$$

Any bounded choices of the scalar functions $f$ and $g$ on the cohort give the same canonical acceleration readout. Neither an account unit nor a relation between these functions occurs in $\mathcal O_h$. Setting $f=g=0$ and choosing a nonzero $f$ are distinct weightings of the same kinematic state. Even fixing one normalization leaves nonproportional functions of the source invariants. Restricting the map to labels already stored, instead of also reading source velocity from retained history, still leaves arbitrary functions of the fixed polarity and arbitrary scalar normalization.

This proves the following narrow identifiability statement. **The regular emission, transport, and observation equations, supplemented by additive cohort bookkeeping and Euclidean covariance, do not uniquely determine a scalar or vector account weighting.** The displayed family witnesses the freedom without defining any value from a motion residual. It does not prove that every member is compatible with conservation of motion plus wake, or that two inequivalent physical completions already exist. Conservation, coupling to motion, and complete-state finiteness are further conditions capable of eliminating these weightings.

A geometric invariant can therefore be derived: the measure of a fixed emission cohort is preserved by label transport, and its restrictions add. Calling that invariant energy would add an interpretation. The same caution applies to $\int\boldsymbol\omega\,d\lambda=\mathbf0$ on a complete sphere; cancellation alone is not a momentum-transfer mechanism.

**Claim grade: derived under the stated representation.** Falsifier: an occurrence of $f$ or $g$ in the frozen kinematic readout, or a theorem from the listed kinematic premises that selects one of these weightings while excluding the explicitly constructed alternatives. A separate conservation or constitutive axiom changes the premise set and is not a refutation.

## 3. A finite-derivative account cannot repair the local energy gap

The smallest algebraic completion worth testing uses no new evolving variable. It adds a scalar interaction account at the current root to a speed-only motion account. The existing scalar-root identity tests one such scalar. The theorem here covers arbitrary dependence on finitely many transmitter derivatives.

### Assumptions and theorem

Let $m$ be a finite nonnegative integer. Write $\mathbf Z_k=\mathbf X_t^{(k)}(s)$ for the transmitter's $k$th derivative at emission, for $1\leq k\leq m$; thus $\mathbf Z_1=\mathbf W$. Consider

$$
\mathscr E
=K(\|\mathbf V\|)
+U(\mathbf R,\mathbf Z_1,\ldots,\mathbf Z_m)
$$

For $m=0$, $U$ depends only on $\mathbf R$. The assumptions are:

1. $K$ and $U$ are continuously differentiable on their declared domains. $U$ is a translation-invariant and proper-rotation-invariant scalar with no independent present-receiver-velocity argument and no explicit absolute epoch. Dependence on root age is already dependence on $R$, since $T-s=R$.
2. The domain contains independently variable ranges in a connected open positive interval, all directions, receiver speeds in a connected open positive interval, and a connected transmitter-derivative domain containing stationary source data and small radial source velocities. Work on $D_t>0$; no singular or negative-transmitter-factor chart is needed for the contradiction.
3. The source is a smooth supplied-history input. At a given simple root, its next derivative $\mathbf Z_{m+1}$ can vary in an open set while the lower derivatives and present receiver state are fixed. The corresponding freedom is available at each lower derivative after elimination. This is a universal channel-identity test, not a claim about independent derivatives on an isolated coupled EOM solution.
4. Locally the receiver follows this single canonical contribution, $\dot{\mathbf V}=C\mathbf n/(R^2D_t)$. The proposed account satisfies $d\mathscr E/dT=0$ for every input in the domain, without a separate reception transfer, source supply, or boundary term.

**Theorem.** Under these assumptions, $K$ is constant on the speed interval and $U$ is constant on the connected domain. There is no nontrivial energy account of this form. In particular, finitely many extra transmitter derivatives cannot turn the regular scalar-root identity into a universally conserved one-receiver account.

### Eliminating the highest derivative

At a root where $D_r\ne0$, the chain rule gives

$$
\frac{d\mathbf Z_k}{dT}
=\mathbf Z_{k+1}\frac{D_r}{D_t}
$$

For $m\geq1$, the only term containing the freely variable highest derivative $\mathbf Z_{m+1}$ in $d\mathscr E/dT$ is

$$
\frac{D_r}{D_t}
\frac{\partial U}{\partial\mathbf Z_m}\cdot\mathbf Z_{m+1}
$$

The receiver acceleration contains $\mathbf Z_1$ but no higher source derivative. The derivative of $\mathbf R$ also contains only $\mathbf V$ and $\mathbf Z_1$. An identity for an open set of $\mathbf Z_{m+1}$ therefore requires $\partial U/\partial\mathbf Z_m=\mathbf0$. Repeat the argument for $m-1,m-2,\ldots,1$. The calculation is performed on the open set $D_r\ne0$; continuity extends the vanishing derivatives to included playback-zero points. Connectedness removes any remaining local constant dependence on the derivative variables.

After the elimination, $U$ depends only on $\mathbf R$. Rotation invariance makes it a radial function $u(R)$. This step explicitly rules out a scalar cure obtained merely by adding $D_t$, source acceleration, jerk, or any other finite derivative to the existing root scalar.

### Deriving the stationary-source candidate

On the existing stationary-source control, $\mathbf W=\mathbf0$, $D_t=1$, and $dR/dT=\mathbf n\cdot\mathbf V$. Let $v=\|\mathbf V\|>0$. The proposed conservation identity becomes

$$
0=\left(\frac{C K'(v)}{vR^2}+u'(R)\right)
\mathbf n\cdot\mathbf V
$$

The independent range and speed variables force $K'(v)/v$ to be one constant, denoted $a$. Integrating on the connected intervals gives

$$
K(v)=\frac a2v^2+K_0,
\qquad
u(R)=\frac{aC}{R}+u_0
$$

These expressions are conclusions of the tested separability and universal-input assumptions. No primitive mass, conventional kinetic formula, or work-power postulate entered their derivation. The coefficient $a$ is an undetermined account conversion scale; $K_0$ and $u_0$ are additive constants.

### The moving-source test forces triviality

Use the same expressions on a positive-transmitter-factor root with arbitrary present $\mathbf V$ and emission velocity $\mathbf W$. The root derivative in Section 1 gives

$$
\frac{d\mathscr E}{dT}
=\frac{aC\,\mathbf n\cdot\mathbf V}{R^2D_t}
-\frac{aC\,\mathbf n\cdot(\mathbf V-\mathbf W)}{R^2D_t}
=\frac{aC\,\mathbf n\cdot\mathbf W}{R^2D_t}
$$

The domain contains small nonzero radial source velocities. Since $C\ne0$ and $R,D_t>0$, the identity for every such input forces $a=0$. The stationary-source equations then force both $K$ and $u$ to be constant. This completes the proof.

For a concrete check using the existing regular receiver-velocity diagnostic, set $C=a=1$, $R=2$, $\mathbf n=(1,0,0)$, $\mathbf W=(1/4,0,0)$, and $\mathbf V=(2/5,0,0)$. Then $D_t=3/4$, $D_r=3/5$, $\mathbf A_h=(1/3,0,0)$, $dR/dT=1/5$, and

$$
\frac{dK}{dT}=\frac{2}{15},
\qquad
\frac{du}{dT}=-\frac1{20},
\qquad
\frac{d\mathscr E}{dT}=\frac1{12}
$$

These numbers evaluate one regular input jet; they are not a new prescribed trajectory or an isolated-population evolution. The result is a nonzero rate for the conditional account, not a measured physical energy defect.

**Claim grade: derived conditional impossibility.** Falsifier: a nonconstant pair $K,U$ meeting all four assumptions and yielding zero derivative for every admitted input. The highest-derivative coefficient and the displayed moving-source rate are direct places to check the proof. A full-history functional, a receiver-dependent interaction account, a separate account state, an explicit source/boundary transfer, or restriction to coupled EOM trajectories changes a hypothesis. None is excluded by this theorem.

### Why this narrows the surviving alternative

The theorem does not re-prove the funded-observation no-go. It tests a different proposed repair after observation has been made nondepleting. The obstruction is differential: a finite source-derivative correction cannot supply an independent transfer memory while remaining a universal local scalar. It also does not assert that an open driven receiver should physically conserve energy by itself. The assumption that it does is precisely the minimal local completion being tested and rejected.

The calculation permits an externally supplied transmitter contribution or a separately derived wake transfer. It does not authorize setting a new account derivative equal to minus the final expression. That choice would specify the missing account by the cancellation it was introduced to prove. The existing [characteristic-tail adjudication](characteristic-tail.md) also prevents promoting the local scalar into the rejected two-time whole action: its regular future-transmitter variation and self-domain divergence retain their independent negative scope.

## 4. Receiver multiplicity and source ownership

Reuse the stationary source at the origin and stationary receivers at distinct $R\boldsymbol\omega_k$. For an emission interval of length $L$, each supplied-history channel has $D_t=D_r=1$ and acceleration-observation variation $L|C|/R^2$. Nondepleting evaluation can reproduce every such observation while the cohort measure remains $L$. The source-label record is stored once; receiver observation records may refer to it many times.

This gives no account multiplication rule. If an account proposal assigns a nonzero signed reception current $j_k(T)$ to each channel, its total transfer is determined by the sum of those independently specified currents, not by the single label-measure value. If they have a common nonzero same-sign scalar rate, the scalar transfer grows with receiver count. If they have different directions, a small vector sum can coexist with large total variation. Neither rate is forced to be nonzero by the acceleration alone, since no motion-account map has yet been selected.

An emission label $(t,s,\boldsymbol\omega)$ and a reception record $(r,t,T,s,\boldsymbol\omega)$ have different ownership roles. The receiver label cannot turn a reused observation into a newly funded copy of a source account. Conversely, reserving the entire source-time cohort for the first reception would mutate unrelated directions and violate the nondepleting observation premise. Any independent account channel must state which measure is held once and which current actually crosses an event.

The arbitrary finite receiver control remains a supplied-history test. It does not establish that arbitrarily many receivers on this sphere occur in one accepted populated EOM solution. The accepted allocation theorem is applied only under its own finite-compatibility and funding assumptions; this proposal changes neither those quantifiers nor the population class.

**Claim grade: derived bookkeeping distinction and conditional transfer scaling.** Falsifier: a uniquely owned finite cohort whose value changes solely because its unchanged record is read twice, or a claimed same-sign uniform per-receiver current whose finite sum does not scale with receiver count. A receiver-dependent transfer law may alter the latter premise; it must be specified independently.

## 5. Complete-past accumulation also constrains signed accounts

The positive account accumulation theorem already excludes a stationary source emitting an undiminished positive amount forever into a finite global account. Signed momentum does not automatically evade the corresponding finite-total-variation requirement.

Let $b(\boldsymbol\omega)$ be a nonzero integrable scalar or vector emission density on a source whose emission data are constant in time. Assume free propagation preserves this density, retain the original emission labels, and include every surviving sector in the account. On ages $0\leq T-s<H$, define

$$
d\mu_H=b(\boldsymbol\omega)\,ds\,\frac{d\boldsymbol\omega}{4\pi}
$$

For a scalar density use its absolute value; for a vector density use its Euclidean norm. The total variation, which measures absolute account content before signed cancellation, is

$$
\|\mu_H\|_{\mathrm{TV}}
=H\int_{S^2}\|b(\boldsymbol\omega)\|\,\frac{d\boldsymbol\omega}{4\pi}
$$

The formula follows by integration of the density norm on the original label space. Its coefficient is positive unless $b=0$ almost everywhere. Therefore a finite-total-variation complete-past measure agreeing with all finite cohorts exists only for the zero time-homogeneous density. This applies to a stationary source and, conditionally, to every eternal constant-velocity source on which a proposed local emission rule produces a time-independent density.

For the radial vector weighting $b(\boldsymbol\omega)=p_0\boldsymbol\omega$, each spherical net vector is zero, but

$$
\mu_H(I_H\times S^2)=\mathbf0,
\qquad
\|\mu_H\|_{\mathrm{TV}}=|p_0|H
$$

Here $I_H=(T-H,T]$. A zero spherical net is compatible with arbitrarily large absolute stored content. Collapsing or canceling different provenance labels would replace the account representation and must not be hidden in the global sum. The theorem does not forbid locally finite measures or a carefully declared conditional summation; neither supplies the finite account assumed here.

A retention horizon $h_0<H$ divides the same variation into $h_0B$ retained and $(H-h_0)B$ exterior, where $B=\int\|b\|d\boldsymbol\omega/(4\pi)$. Export does not alter $HB$. A nonnegative age factor $w(a)$ applied to the total amount still present anywhere changes the condition to $B\int_0^\infty w(a)da<\infty$. Choosing that factor, its scale, a finite past, or a sink is an additional account assumption. Moving the account to another counted sector does not supply decay of $w$.

**Claim grade: derived conditional extension to finite-variation signed/vector accounts.** Falsifier: a finite-total-variation complete-past measure with a nonzero time-homogeneous density and the displayed finite-cohort restrictions. This does not establish a population tail estimate, absolute summability of acceleration, or a physically selected zero stationary-emission law.

## 6. Causal transfer and angular bookkeeping

A reception can use current receiver data; an earlier emission cannot use that receiver's later velocity. These statements distinguish provenance from causation. The transmitter label identifies which emitted surface was intercepted. It does not authorize a present reception to revise the account at the earlier emission event.

Suppose a proposal changes an account at reception by a scalar or vector amount determined from the current pre-event state. A contemporaneous opposite change at a spatially separated transmitter is not furnished by the existing outward-sphere propagation law. A return signal would need its own causal support, state, and update. In particular, the same outgoing ray from the reception point has position $\mathbf C+(T-s+u)\boldsymbol\omega$ after time $u\geq0$; it never returns to the fixed center $\mathbf C$ at positive age. This says nothing about a moving transmitter later intersecting some surface, but rules out calling the original ray an automatic return path.

The existing source-velocity dependence of an energy transfer also survives at playback zero. In the numerical input of Section 3, replace the receiver velocity by $\mathbf V=\mathbf n$. Then $D_r=0$, $ds/dT=0$, and the conditional account rates become $dK/dT=1/3$ and $du/dT=-1/4$, again leaving $1/12$. A current genuinely evolving in reception time can in principle continue while one emission label is stationary. A current funded only by bounded newly traversed source-clock capacity cannot. The accepted neighborhood throughput proof supplies the interval version; this arithmetic introduces no reachability claim.

Momentum and angular accounts further constrain a proposed channel. If a momentum increment $\Delta\mathbf p$ is transferred between receiver and wake at their common reception position, the opposite orbital increments cancel about every origin. If the same wake increment is booked instead at the old center, the angular discrepancy is

$$
(\mathbf X_r-\mathbf C)\times\Delta\mathbf p
=R\boldsymbol\omega\times\Delta\mathbf p
$$

Free propagation of a nonradial stored momentum also changes orbital angular account at rate $\boldsymbol\omega\times\boldsymbol\pi$. A proposal must therefore derive radial transported momentum or account explicitly for this torque. Neither radial acceleration nor source ownership establishes the required momentum map. The inherited angular identities constrain a channel after it is specified; they do not determine its values.

**Claim grade: derived causal-support and orbital-booking conditions under the stated propagation.** Falsifier: a positive-age point of the unchanged outgoing ray equal to its fixed center, or direct origin-aware moment arithmetic contradicting the displayed cross product. A newly proposed return channel or intrinsic angular account changes the architecture and requires its own derivation.

## 7. Smallest additional assumption in a declared proposal class

There is no mathematically ordered collection of all possible ontology extensions with a unique smallest member. A minimality claim must name the class being compared. Within **additive source-owned accounts transported on the existing labeled spheres**, the following is the smallest representation proposed for review. It adds account content and one reception-time transfer rule; it does not add a primitive mass, a point cross-section, a population restriction, or an alteration of the acceleration readout.

**Proposal, not adopted.** Augment the kinematic state by a scalar signed account measure $\mathsf E_T$ and a vector signed account measure $\boldsymbol{\mathsf P}_T$ on the original emission-label space, locally of finite total variation. Their physical interpretation, admissible initial data, lower bounds if any, and independent evolution must come from one Architrino-native constitutive law. Local finite variation is explicitly weaker than a finite global account. This proposal does not choose between those global alternatives. Under radial free transport and common-point reception booking, define the orbital account from position crossed with $\boldsymbol{\mathsf P}_T$; if those restrictions fail, an additional angular sector is required and the proposed minimal representation fails.

The account law is allowed to use the present receiver state and the existing source labels. It must leave the kinematic readout unchanged at identical history geometry. In original label coordinates, the reception part of a proposed measure evolution has the form

$$
d\mathsf E_T
=d\mathsf S_E(T)
-\sum_h j_{E,h}(T)\,\delta_{\ell_h(T)}\,dT,
\qquad
d\boldsymbol{\mathsf P}_T
=d\boldsymbol{\mathsf S}_P(T)
-\sum_h\mathbf j_{P,h}(T)\,\delta_{\ell_h(T)}\,dT
$$

The label $\ell_h(T)=(t,s_h(T),\boldsymbol\omega_h(T))$ identifies the existing source sector at reception. The symbol $\delta_\ell$ is a unit atom at that label. The source terms $\mathsf S_E,\boldsymbol{\mathsf S}_P$ represent independently specified emission or other declared supply; their provenance and compensating account, if required, must be in the full state. The sign convention calls $j_{E,h}$ and $\mathbf j_{P,h}$ transfer out of the wake. Rates are with respect to $T$, so they do not acquire a spurious $D_r/D_t$ multiplier. Integrating a moving label in time can create a measure on its traced curve; no finite instantaneous impulse is asserted by this display.

This display specifies a representation and its new freedom, **not a value for either current**. An independent law must produce the currents from the pre-event state before they are compared with motion. If candidate motion maps are $K(\|\mathbf V_r\|)$ and $\mathbf p(\mathbf V_r)$, reception-only local balance would require

$$
j_{E,h}
=\nabla_{\mathbf V_r}K\cdot\mathbf A_h,
\qquad
\mathbf j_{P,h}
=D\mathbf p(\mathbf V_r)\,\mathbf A_h
$$

These are tests of a separately supplied current and motion map, never definitions of the current. Other declared simultaneous transfers must be included before using a reception-only equation. Defining either current by the displayed right side is exactly the rejected residual construction, even if programmed before an experiment. At present there is no independently derived nontrivial pair to insert into these tests.

The proposal's additional assumptions and their concrete consequences are:

| Additional assumption | What it permits and what must still be decided |
| --- | --- |
| The account state is distinct from the acceleration carrier | A changed account can coexist with the same canonical readout. It does not derive a nontrivial account or prove that account changes remain invisible through every future update. |
| Scalar/vector signed measures with source labels and locally finite variation | Point reception can create a finite integrated transfer measure without inventing an angular patch. It abandons a nonnegative capacity interpretation unless another theorem supplies one. Initial data and global admissibility remain explicit decisions. |
| Transfer in reception time from current pre-event data | A finite current can continue through $D_r=0$. Its duration, total variation, source supply, and receiver multiplicity still need a law. |
| Radial free momentum and booking at the actual reception point | Orbital angular conservation is compatible with free transport and event bookkeeping. A law producing transverse transported momentum needs another angular account. |
| Independently specified source and reception currents on the same update | Balance becomes falsifiable. Assigning a current from the required motion residual fails this assumption by construction. |

This representation is intentionally no stronger than the result warrants. A measure class does not supply a constitutive generator. Allowing signed atoms does not solve source supply, complete-past finiteness, or conservation. Assuming positive undiminished source emission would restore the accepted accumulation obstruction; assuming a finite budget with a uniformly vanishing funded readout would restore the accepted allocation obstruction. No such assumption is hidden in the proposal.

The smallest tested no-new-state alternative is the finite-derivative scalar ansatz of Section 3, and it fails. The proposed relaxation adds genuine account memory or an independently derived full-history map. It must be obtained from a common causal construction; merely naming separate energy, momentum, and angular ledgers does not advance closure. A full-history invariant on a coupled EOM class remains a different possible route, outside the theorem. This work does not establish that extra independent state is necessary among all representations.

**Claim grade: guessed for the proposed representation and physical interpretation; derived for its displayed bookkeeping conditions.** Falsifier: a proposed evolution that changes the canonical readout at fixed history, cannot assign unique source ownership, violates local finite variation, depends on future reception, or closes a balance only by defining a current as the tested residual. A successful independently derived full-history account needing no added variables would refute any stronger minimal-state claim, which is not made here.

**Recommendation for operator decision:** retain nondepleting observation as a candidate architecture and reject the finite-derivative local-scalar completion. Discuss the reception-time signed-measure proposal only as an explicit representation choice for developing one independent joint account law. Do not accept its physical account meaning, initial-state freedom, or global finiteness convention merely because its notation can express a balance. The precision gained here is where the missing law must enter and which smaller local repair is unavailable.

## 8. Validation and preservation record

The task has one durable output, this document, and scratch under `.tmp/nondepleting-account-proposal/`. The coordinator owns shared priorities, queues, brainstorming, work logs, and the closure synthesis. Mathematical references, EOM code, and existing tests were read-only inputs. No new prescribed trajectory, Python calculation, EOM campaign, generated write, Git index write, publication action, or downstream task was required.

The mathematical reference for the new finite-derivative theorem is its chain-rule elimination followed by the independently checked canonical root identities in Section 1. The signed accumulation result uses the exact density-norm formula for total variation. Numerical controls check arithmetic and implementation behavior; they do not independently certify the universal quantifiers or a physical account law. The theorem is a derived candidate awaiting independent mathematical adjudication.

The ten input files were frozen at 2026-09-10T00:04:32Z after `freeze.mjs` passed the standard SHA-256 `abc` control. The complete path/hash/snapshot manifest is `.tmp/nondepleting-account-proposal/input-manifest.json`. Source bytes are retained in its `frozen/` sibling. The closure summary is marked coordinator-owned in the manifest so concurrent synthesis can be observed separately from the frozen mathematical inputs.

**Claim grade: measured.** `node .tmp/nondepleting-account-proposal/check-controls.mjs` first passed the exact stationary inverse-square control, then reproduced the moving-source and playback-zero conditional account rate $1/12$ within absolute tolerance $2\times10^{-13}$. The receipt is `control-results.txt` in that scratch directory. The acceleration instrument is the frozen regular-carrier module; the reference values come from the fractions derived in Section 3. This checks the arithmetic, not the universal finite-derivative theorem or a physical energy map.

**Claim grade: measured.** `node --test --test-concurrency=1 .tmp/nondepleting-account-proposal/frozen/tests/causal-wake-update-law.test.js .tmp/nondepleting-account-proposal/frozen/tests/causal-wake-birth-lineage-candidate.test.mjs` passed all 13 tests with zero failures, cancellations, or skips; its receipt is `existing-tests.tap`. These are the unchanged reference suites. Their lineage and shell-account diagnostics retain their original candidate scope, and the test's receiver-fold label denotes the playback-zero diagnostic rather than a transmitter-root singularity.

**Claim grade: measured.** `node .tmp/nondepleting-account-proposal/validate.mjs` passed a known two-expression Markdown control, fenced-code exclusion, invalid-TeX rejection, and the standard SHA-256 control before checking this document. It then accepted every mathematical expression under KaTeX 0.16.11, verified all six manually inventoried local link targets, rejected trailing whitespace, and confirmed the ten frozen snapshots against their manifest. At the recorded check, all ten live inputs also matched the frozen hashes. The receipt is `validation.txt`. This establishes syntax, link existence, and scoped byte identity; it does not certify rendering layout, prove the theorem, or establish that unrelated repository files were unchanged.

`git diff --check -- reference/priorities/master-equation-closure/analysis/nondepleting-account-proposal.md` returned no errors. Because this output is new and untracked, the direct whitespace assertion in `validate.mjs` supplies the substantive output-whitespace check. All account-law and conservation claims remain unestablished regardless of these results. Falsifiers for the measured claims are a failed corresponding rerun, a changed frozen input digest, an invalid expression or listed link, or a control value outside its recorded tolerance.

## 9. Proposed coordinator integration

“The nondepleting-account front derives a new conditional no-go for additive receiver energy: an isotropic speed account plus any scalar depending on current causal separation and finitely many transmitter derivatives cannot be a nontrivial conserved quantity for all regular one-source supplied-history inputs. Highest-derivative elimination reduces the scalar to a radial potential; the stationary control forces the quadratic-plus-inverse-distance family, and the moving-source root identity forces its scale to zero. This excludes a local account repair, not coupled-history conservation or independent account channels. The regular carrier retains arbitrary additive covariant account-weighting freedom. Complete-past finite total variation also excludes nonzero undiminished time-homogeneous signed/vector emission, even when the net angular integral vanishes. A reception-time, source-owned signed-measure account sector is stated only as an unadopted representation proposal; its independent joint constitutive law, motion maps, source supply, and global account convention are not derived. Existing allocation, action, population, and singular-boundary obstructions retain their accepted scopes. No account conservation or MEC closure is claimed.”

The coordinator can integrate this result at candidate grade and seek independent adjudication of the finite-derivative theorem. This document does not change shared execution status or select a new population or account class.
