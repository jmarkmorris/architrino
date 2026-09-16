# Necessary Geometry for Opposing Acceleration at a Wake-Speed Crossing

## Question, scope and result

Architrino velocity is unrestricted in this investigation. The normalized value $c_f=1$ specifies wake propagation, not a velocity ceiling. The operator confirmed on 2026-09-16 that the separate field-speed-ceiling investigation is outside this task's model. Crossing feasibility must follow from the unchanged equation and complete history; neither a velocity cap nor an assumed successful crossing is supplied as an extra rule.

A smooth transverse first crossing of wake speed creates a positive, cubic same-transmitter acceleration contribution. This analysis asks what other admitted causal interactions would have to do to oppose it without changing the Master Equation. It derives necessary conditions, computes the complete nonintegrable part of an explicit four-root geometry, and constructs a reflected two-source extension whose selected outgoing acceleration sum has a finite limit. These are results about prescribed histories; they do not construct an EOM solution through the event.

Here a transverse speed crossing means that speed passes through $c_f$ with nonzero speed derivative. It does not mean sideways motion in space.

Two meanings of first crossing must be distinguished. An individual receiver can reach wake speed for the first time while another source already has superfield motion in its retained past. A global first crossing means that every source velocity is strictly subfield throughout the complete retained past. The constructive example below belongs to the first class. In the second class, a possible opposing contribution requires another label at the same position and velocity at the event.

| History and geometry | Derived finding | Remaining limitation |
| --- | --- | --- |
| Global first crossing, all other endpoint positions separated | Partner contributions stay bounded. | Cannot cancel the newborn cubic self contribution. |
| Global first crossing, coincident endpoint but different velocity | One local partner root gives a quadratic contribution. | A finite collection is too weak to cancel the cubic self contribution. |
| Global first crossing, coincident endpoint and matching velocity | Cubic and stronger partner contributions can occur. | Complete incoming and outgoing cancellation remains to be established. |
| Earlier source already at or above wake speed, positive limiting range | Singular opposition requires joint reception and emission tangency. | Ordinary contacts do not supply the required cubic coefficient. |
| Explicit analytic higher contact with one earlier superfield source | Four local roots supply a tunable opposite cubic coefficient, but an unavoidable transverse quadratic remainder survives. | This source family and the local self row alone do not give an integrable acceleration. |
| Two reflected earlier superfield sources with the derived parameter relations | Eight local partner roots cancel every negative-power term of the selected self-plus-partner sum, which has a finite outgoing limit. | The finite value, complete histories, coupled EOM evolution and the event limit still require compatibility checks. |

The purpose is mathematical exploration of the unchanged equation. The [stationary release](stationary-binary-first-interval.md#existing-sharp-law-obstruction-at-this-boundary) retains its original obstruction. Its partner range is positive and its earlier source velocity is subfield, so neither of the candidate singular geometries supplies an escape for that history.

## Equation and solution class

Normalize $c_f=1$ and place the event at absolute time $T=0$. Receiver $i$ has position $\mathbf X_i(0)=0$, velocity $\mathbf V_i(0)=\mathbf e$ with $\|\mathbf e\|=1$, and positive speed derivative

$$
a=\mathbf e\cdot\mathbf X_i''(0)>0.
$$

For source $j$ and emission time $S<T$, write

$$
F_{ij}(T,S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-(T-S).
$$

A causal root satisfies $F_{ij}=0$. Its range is $r=T-S$, its direction from emission to reception is $\mathbf n$, and its two derivatives are

$$
D_t=1-\mathbf n\cdot\mathbf V_j(S)=\partial_SF_{ij},
\qquad
D_r=1-\mathbf n\cdot\mathbf V_i(T)=-\partial_TF_{ij}.
$$

The [canonical per-root law](../../app-solver/contracts/evolution-contract-v1.md#canonical-per-root-calculation), using signed charges, is

$$
\mathbf A_{ij,S}
=\frac{\kappa q_iq_j}{r^2|D_t|}\mathbf n.
$$

The absolute transmitter factor is essential: reversed root playback does not reverse the acceleration. Every admitted root must be included.

For a $C^2$ transverse crossing, the newborn self root has $S=-T+o(T)$, $r=2T+o(T)$ and $D_t=aT+o(T)$. Hence

$$
\mathbf A_{ii}(T)
=\frac{\kappa q_i^2}{4aT^3}\bigl(\mathbf e+o(1)\bigr).
$$

The coefficient is positive and its time integral diverges. A bounded acceleration continuation therefore needs the complete remaining vector sum to cancel this leading term and every further unbounded term. In a Carathéodory continuation, whose velocity is obtained from a locally integrable acceleration, every nonintegrable remainder must instead be removed. More general weak classes require separate criteria; finite continuous velocity alone does not imply finite total variation.

Claim grade: derived from the declared root equation and smooth transverse crossing. Falsifier: a simple newborn self root under these hypotheses with a different leading range, transmitter factor or acceleration coefficient.

## Positive-range arrivals

### Reception transversality makes the local measure finite

Consider a limiting source time $S_0<0$ and positive range $R=-S_0$. If $r\ge r_{\min}>0$ and $|D_r|\ge d_r>0$, the implicit-function theorem writes the local incidence curve as $T=\phi(S)$. On its simple pieces,

$$
|\phi'(S)|=\frac{|D_t|}{|D_r|},
\qquad
\|\mathbf A_{ij,S}\|\,|dT|
=\frac{\kappa|q_iq_j|}{r^2|D_r|}\,|dS|.
$$

Counting all local pieces over a finite emission interval therefore bounds their total integrated magnitude by that interval's length times $\kappa|q_iq_j|/(r_{\min}^2d_r)$. This is the same geometric change of variables underlying the [accepted transverse-fold measure](../../master-equation-closure/analysis/mec-008-self-complement-independent-adjudication.md). It explains why a diverging pointwise density need not supply a divergent velocity increment. Such a contribution cannot cancel a nonzero cubic density throughout an outgoing neighborhood.

For example, a nondegenerate local balance $F=AT+Bs^m+\cdots$, where $s=S-S_0$, $AB\ne0$ and $m\ge2$, gives $|D_t|\asymp |T|^{(m-1)/m}$. Its inverse-factor exponent is less than one.

### Necessary tangencies and sign

At the receiver's unit-speed endpoint, $D_r=0$ requires $\mathbf n_0=\mathbf e$. An opposing nonintegrable positive-range contribution must therefore come from an emission directly behind the receiver along its crossing direction. Its singular transmitter factor also requires

$$
D_t(0,S_0)=0
\quad\Longrightarrow\quad
\mathbf e\cdot\mathbf V_j(S_0)=1,
\qquad
\|\mathbf V_j(S_0)\|\ge1.
$$

Each such limiting channel has forward chord direction. Opposite polarity is necessary for that channel's leading vector to oppose the self contribution. At positive range, an individual branch with a finite nonzero cubic acceleration coefficient must have $|D_t|\sim dT^3$ for some $d>0$. These requirements concern the actual source history, not a selectable acceleration multiplier.

Joint tangency alone is insufficient. Direct differentiation at $D_t=D_r=0$ gives

$$
F_{TT}=a,\qquad F_{TS}=0,\qquad
F_{SS}=b=
\frac{\|\mathbf V_j(S_0)\|^2-1}{R}
-\mathbf e\cdot\mathbf X_j''(S_0).
$$

When $b<0$, the nondegenerate quadratic balance gives two branches $s\sim\pm\sqrt{a/(-b)}\,T$ with acceleration of order $|T|^{-1}$. When $b>0$, the positive definite quadratic form excludes nearby roots other than the event. The case $b=0$ requires higher terms. It cannot be discarded: the next construction gives a cubic contribution in that class.

Claim grade: derived local measure and tangency conditions. Falsifier: an unbounded local acceleration measure with positive range and a uniform nonzero reception derivative on a complete finite emission neighborhood, or a singular positive-range transmitter factor with strictly subfield limiting source velocity.

## An explicit positive-range cubic geometry

### This construction uses a noncollinear source history

The original stationary binary has its entire retained history on one fixed line. For any defined positive-range causal root in such a history, $\mathbf X_i(T)-\mathbf X_j(S)$ is parallel to that line. Hence $\mathbf n=\pm\mathbf e$ and the canonical acceleration contribution has zero transverse component:

$$
(\mathbf I-\mathbf e\mathbf e^{\mathsf T})
\frac{\kappa q_iq_j}{r^2|D_t|}\mathbf n=0.
$$

This is a per-root geometric identity, without cancellation between roots. Singular magnitudes do not supply a new transverse direction. It does not establish existence or uniqueness of continuation at an undefined event.

The prescribed construction below changes the source history to a planar, noncollinear path while keeping the receiver on the $\mathbf e$ axis. In its notation, the source's transverse position is

$$
\mathbf Y_\mu(s)\cdot\mathbf f
=-[L(s)-\mu s^{10}]
\frac{s\sqrt{2a\lambda+a^2\lambda^2s^2}}
{1+a\lambda s^2}.
$$

This is nonzero for sufficiently small $s\ne0$. The earlier source position and reception position lie on the axis at the limiting event, but nearby admitted emission positions do not. Their wake chords are oblique and can contribute sideways acceleration. The transverse remainder computed below belongs to this prescribed off-axis history; it is not sideways motion generated from the stationary collinear binary.

Adding a reflected second source cancels the transverse resultant at the receiver, but both source histories remain noncollinear. The reflected example also adds a third particle. Both constructions retain the same per-root equation while exploring different geometries from the original two-particle release.

Claim grade: derived geometric distinction from the canonical chord direction and explicit source formula. Falsifier: a nonzero transverse canonical row with both endpoints on the fixed line and finite defined weight, or an identically zero transverse source coordinate in the stated positive-parameter construction.

### Prescribed paths and exact residual

Choose orthonormal directions $\mathbf e,\mathbf f$ and positive constants $a,\lambda,R,\mu$. Prescribe the receiver locally as

$$
\mathbf X_i(T)=\left(T+\frac a2T^2\right)\mathbf e.
$$

This path crosses unit speed at zero. Its acceleration $a\mathbf e$ is prescribed for the geometric test; it has not been obtained from the complete EOM.

For the actual earlier emission time $S=-R+s$, define

$$
t(s)=\lambda s^2,\qquad L(s)=R+\lambda s^2-s,
$$

$$
\mathbf n(s)=
\frac{\mathbf e+s\sqrt{2a\lambda+a^2\lambda^2s^2}\,\mathbf f}
{1+a\lambda s^2}.
$$

The displayed vector has unit norm and is analytic near zero. Define the source history in this small earlier emission neighborhood by

$$
\mathbf X_j(-R+s)=\mathbf Y_\mu(s)
=\mathbf X_i(t(s))-L(s)\mathbf n(s)+\mu s^{10}\mathbf n(s).
$$

At reception $T=t(s)$, the delayed range is $L(s)-\mu s^{10}>0$ for a sufficiently small neighborhood. Consequently its causal residual obeys the exact identities

$$
F_\mu(t(s),s)=-\mu s^{10},
\qquad
\partial_TF_\mu(t(s),s)=0.
$$

The derivative vanishes because $\mathbf n(s)\cdot\mathbf V_i(t(s))=1$. Taylor factorization in reception time gives

$$
\boxed{
F_\mu(T,s)
=H_\mu(T,s)(T-\lambda s^2)^2-\mu s^{10},
\qquad H_\mu(0,0)=\frac a2>0.
}
$$

There is an independently checked exact expression for this factor. Put $u=T-\lambda s^2$, $A=1+a\lambda s^2$, $b=A+au/2$ and $\ell=L-\mu s^{10}$. Rationalizing the range difference gives

$$
H_\mu(T,s)
=\frac{a\ell/A+b^2-1}
{\|\ell\mathbf n+ub\mathbf e\|+\ell+u}.
$$

Its denominator is positive near the event. Thus the factorization is an identity of the actual Euclidean causal residual, rather than a freely chosen normal form.

### All four local roots

Since $H_\mu>0$, the root set consists of two reception graphs,

$$
T_\pm(s)=\lambda s^2
\pm\sqrt{\frac{2\mu}{a}}\,s^5+O(s^6).
$$

Each graph has one positive-$s$ and one negative-$s$ solution for every sufficiently small $T>0$, because its derivative is $2\lambda s+O(s^4)$. The graphs are distinct away from $s=0$. There are therefore exactly four roots in the declared local emission neighborhood, all with $s\sim\pm\sqrt{T/\lambda}$. There are no roots in that neighborhood for small $T<0$. All four emissions are causal because their absolute times remain close to $-R<0$.

Differentiating the factorized residual at fixed reception yields

$$
D_t
=H_{\mu,s}(T-\lambda s^2)^2
-4\lambda sH_\mu(T-\lambda s^2)
-10\mu s^9.
$$

On the root graphs, the middle term has leading magnitude $4\lambda\sqrt{a\mu/2}\,|s|^6$. Therefore

$$
\boxed{
|D_t|\sim
\frac{4\sqrt{a\mu/2}}{\lambda^2}T^3.
}
$$

Two roots have positive transmitter factors and two have negative factors. All four magnitudes enter the acceleration sum. Their ranges tend to $R$ and their actual chord directions tend to $\mathbf e$.

### Leading cancellation and its limit

For opposite charges, the complete four-root cluster contributes

$$
\mathbf A_{ij,\mathrm{local}}(T)
=-\frac{\kappa|q_iq_j|\lambda^2}
{R^2\sqrt{a\mu/2}}\,
\frac{\mathbf e}{T^3}
+o(T^{-3}).
$$

The prescribed receiver parabola has the exact local self root $S=-T$ and self acceleration $\kappa q_i^2\mathbf e/(4aT^3)$. Their cubic coefficients agree in magnitude when

$$
\boxed{
\mu=
32a\left(\frac{q_j}{q_i}\right)^2
\frac{\lambda^4}{R^4}.
}
$$

This choice changes a source path parameter, while every contribution retains its original EOM weight. It proves that the required opposite cubic coefficient is geometrically possible. The leading calculation alone bounds the combined remainder only by $o(T^{-3})$. The complete expansion below shows that this particular one-source family retains a nonintegrable transverse term.

The source velocity at the earlier emission is

$$
\mathbf V_j(-R)=\mathbf e-R\sqrt{2a\lambda}\,\mathbf f,
\qquad
\|\mathbf V_j(-R)\|=\sqrt{1+2a\lambda R^2}>1.
$$

The example therefore requires an already-superfield source. It cannot explain the first superfield motion of a population whose whole admitted past is subfield.

Claim grade: derived prescribed-history geometry, independently checked by exact rationalization, differentiation and local root inversion. Falsifier: failure of the factorization, four-root census within its declared neighborhood, transmitter-factor coefficient or tuning relation. The construction does not establish an EOM crossing: the source's own equation, the receiver's complete acceleration, contributions from all other emission times and a justified event limit remain unresolved. The [singular-event contract](../../app-solver/contracts/master-eom-binding-v1.md#singular-event-contract) supplies no automatic continuation at this higher contact.

## Complete nonintegrable expansion

### Reduction to an analytic vector

Keep the prescribed receiver and source exactly as above. Put

$$
x=\sqrt{T/\lambda},\qquad
A(s)=1+a\lambda s^2,\qquad L(s)=R-s+\lambda s^2,
$$

$$
H_0(s)=\frac{a}{2A(s)}+\frac{A(s)^2-1}{2L(s)},
\qquad
\mathbf C(s)=\frac{\mathbf n(s)}{L(s)^2\sqrt{H_0(s)}}.
$$

The subscript on $H_0(s)$ denotes the unperturbed central value $H_{\mu=0}(\lambda s^2,s)$. The complete four-root geometric sum satisfies

$$
\boxed{
\sum_{\text{four roots}}\frac{\mathbf n_{\mathrm{actual}}}{r^2|D_t|}
=\frac{\mathbf C(x)+\mathbf C(-x)}
{2\lambda\sqrt\mu\,x^6}+O(1).
}
$$

This reduction includes both splitting branches near each signed center $s=\pm x$. To check that their displacement hides no other nonintegrable term, write $s=xy$ and $G(x,y)=H_\mu(\lambda x^2,xy)$. Introduce an independent auxiliary parameter $z$ in

$$
1-y^2=\frac{zy^5}{\sqrt{G(x,y)}}.
$$

The physical roots correspond to $z=\pm(\sqrt\mu/\lambda)x^3$. For either center $\sigma=\pm1$, the implicit-function theorem gives an analytic branch $y_\sigma(x,z)$ near $y=\sigma$. On the physical roots, direct substitution in the transmitter derivative gives

$$
D_t=\lambda^2x^3z
\left[
-4\sqrt G\,y^6
+z\left(\frac{G_y}{G}y^{10}-10y^9\right)
\right].
$$

The bracket is negative near either center. After its sign is handled by the canonical absolute value and the common factor $x^{-6}$ is extracted, each row is analytic in $(x,z)$. Summing the two split signs removes terms odd in $z$. Their first remaining correction is therefore $x^{-6}O(z^2)=O(1)$.

At zero auxiliary parameter the Euclidean range is $\ell(s)=L(s)-\mu s^{10}$. This auxiliary central point is not itself a causal root; its reception–emission time difference is $L(s)$. The central factor is

$$
H_\mu(\lambda s^2,s)
=\frac{a}{2A(s)}+\frac{A(s)^2-1}{2\ell(s)}
=H_0(s)+O(s^{12}).
$$

Replacing $\ell^{-2}$ by $L^{-2}$ changes the analytic row amplitude by $O(s^{10})$, and replacing the central factor by $H_0$ changes it by $O(s^{12})$. Both changes remain bounded after multiplication by $x^{-6}$. This proves the displayed reduction. Finally, the complete sum is unchanged under $x\mapsto-x$, which permutes the signed centers and splitting branches. It is an even Laurent function of $x$. Its only negative powers of $T$ are consequently $T^{-3}$, $T^{-2}$ and $T^{-1}$; no negative fractional powers remain.

### Every divergent coefficient

Normalize $\mathbf C(0)=\sqrt{2/a}\,\mathbf e/R^2$. Its even Taylor part is

$$
\frac{\mathbf C(x)+\mathbf C(-x)}2
=\frac{\sqrt{2/a}}{R^2}
\left[
\mathbf e+
(E_2\mathbf e+F_2\mathbf f)x^2+
(E_4\mathbf e+F_4\mathbf f)x^4+O(x^6)
\right],
$$

where

$$
E_2=\frac3{R^2}-\frac{3\lambda}{R}-\frac{a\lambda}{2},
\qquad
F_2=\frac{2\sqrt{2a\lambda}}R,
$$

$$
E_4=
\frac5{R^4}-\frac{18\lambda}{R^3}
+\frac{15\lambda^2-3a\lambda}{2R^2}
+\frac{3a^2\lambda^2}{8},
$$

$$
F_4=
\sqrt{2a\lambda}
\left(\frac4{R^3}-\frac{9\lambda}{R^2}-\frac{a\lambda}{2R}\right).
$$

Define $\boldsymbol\alpha=(E_2\mathbf e+F_2\mathbf f)/\lambda$ and $\boldsymbol\beta=(E_4\mathbf e+F_4\mathbf f)/\lambda^2$. With the signed coupling restored, the full result is

$$
\mathbf A_{ij,\mathrm{local}}(T)
=\frac{\kappa q_iq_j\lambda^2}{R^2\sqrt{a\mu/2}}
\left[
\frac{\mathbf e}{T^3}
+\frac{\boldsymbol\alpha}{T^2}
+\frac{\boldsymbol\beta}{T}
\right]+O(1).
$$

For opposite polarities and the one-source leading match $\mu=32a(q_j/q_i)^2\lambda^4/R^4$, put $B=\kappa q_i^2/(4a)>0$. The exact local self row then gives

$$
\boxed{
\mathbf A_{ii}+\mathbf A_{ij,\mathrm{local}}
=-B\left[
\frac{\boldsymbol\alpha}{T^2}
+\frac{\boldsymbol\beta}{T}
\right]+O(1).
}
$$

In particular, its transverse quadratic coefficient is

$$
-\frac{BF_2}{\lambda}
=-\frac{\kappa q_i^2}{R\sqrt{2a\lambda}}\ne0.
$$

The two signed emission neighborhoods have nearly opposite transverse chord components, but their ranges differ because $L(s)$ contains $-s$. Unequal canonical weights leave the displayed residual. It has a fixed transverse sign and a divergent improper time integral. No finite positive choice of $a,\lambda,R$ removes it within this one-source family. Additional singular interactions could supply opposition; bounded contributions from the rest of the history could not.

Claim grade: derived complete local asymptotics. Independent hand expansions and separate symbolic checks agree on $E_2,F_2,E_4,F_4$; the analytic root-pair argument establishes completeness of the orders. Falsifier: a failure of the exact normalized-root derivative, a surviving negative fractional power in the full four-root sum, a different displayed even coefficient, or a positive finite parameter choice with $F_2=0$.

## A reflected pair with a finite outgoing acceleration sum

### Exact transverse cancellation

The transverse remainder suggests a concrete extension of the prescribed geometry. Use two source labels $j_+$ and $j_-$ with equal charges $q_s$ opposite in sign to $q_i$. Keep the same $a,\lambda,R,\mu$ for both. Define $\mathbf Y_\mu^+$ by the source formula above and obtain $\mathbf Y_\mu^-$ by replacing $\mathbf f$ with $-\mathbf f$.

Reflection across the receiver axis leaves the receiver path fixed. It preserves the exact causal residual, all four local emission times, ranges and absolute transmitter factors. It reverses every transverse chord component. The two sources therefore give eight local partner roots, and their transverse acceleration contributions cancel exactly for every sufficiently small $T>0$.

Each source must now provide half the magnitude of the cubic self coefficient. Their combined leading match is

$$
\boxed{
\mu=128a\left(\frac{q_s}{q_i}\right)^2
\frac{\lambda^4}{R^4}.
}
$$

With this value the remaining local acceleration is longitudinal:

$$
\mathbf A_{\mathrm{selected}}(T)
:=\mathbf A_{ii}(T)
+\mathbf A_{ij_+,\mathrm{local}}(T)
+\mathbf A_{ij_-,\mathrm{local}}(T)
=-B\left[
\frac{E_2}{\lambda T^2}
+\frac{E_4}{\lambda^2T}
\right]\mathbf e+O(1).
$$

### Removing the remaining negative powers

The first coefficient vanishes precisely when

$$
\lambda=\frac6{R(6+aR)}.
$$

Under this relation, the second coefficient reduces to

$$
E_4=
\frac{19(aR)^2-204aR-396}
{2R^4(aR+6)^2}.
$$

It vanishes at the positive value

$$
\boxed{
aR=\frac{102+6\sqrt{498}}{19},
\qquad
\lambda=\frac6{R(6+aR)},
\qquad
\mu=128a\left(\frac{q_s}{q_i}\right)^2\frac{\lambda^4}{R^4}.
}
$$

All constants are positive. These relations cancel every negative-power term:

$$
\boxed{
\mathbf A_{\mathrm{selected}}(T)
=\Lambda\mathbf e+O(T),
\qquad T\downarrow0,
}
$$

for some finite coefficient $\Lambda$ fixed by the prescribed geometry and charges. Existence of the limit follows from the even analytic expansion of the complete root sum after its finite Laurent factor is removed. It is stronger than a leading cancellation or a bounded estimate. The selected outgoing acceleration now has a finite ordinary time integral, with contribution tending to zero as the integration interval shrinks to the event.

The construction changes the source geometry and the number of source labels. Every row still uses exactly $\kappa q_iq_j\mathbf n/(r^2|D_t|)$. No multiplier or altered singular weight has been introduced.

### Retained numerical comparison

The [independent direct geometric evaluation](../work-log.md#2026-09-15--complete-outgoing-cancellation-in-reflected-prescribed-geometry) checks original Euclidean chords, causal residuals and the absolute transmitter derivative against the derived expansion. Its stationary, affine-source and four-root absolute-weight controls passed before target use. For $a=1$, $\kappa=36$, $q_i=1/6$, each $q_s=-1/6$, $c_f=1$ and the exact tuning relations above, the retained 100-decimal-digit mpmath diagnostic gives:

| Reception time $T$ | Selected longitudinal acceleration |
| --- | --- |
| $10^{-4}$ | $-0.0454918409626520$ |
| $10^{-5}$ | $-0.0454622380171383$ |

The transverse sum is zero by reflection. These measured finite-time values differ from the prescribed receiver acceleration $+1$ and support the finite-limit asymptotics, but do not certify a value of $\Lambda$. The evaluator includes only the declared local self row and eight local partner rows; other history contributions and the source equations have not been supplied. The raw records and control receipt remain at the literal local paths `.tmp/2-braid/four-root-subleading/root/direct-results.json` and `.tmp/2-braid/four-root-subleading/root/direct-controls.json`. The work log retains the full parameter values, additional receptions and instrument details. This is numerical comparison of prescribed geometry, not EOM evolution.

### What remains to make these paths dynamical

The receiver parabola requires acceleration $a\mathbf e$. Boundedness of the calculated local sum does not establish $\Lambda=a$, equality at positive times, or equality after all other retained emission times are included. The finite coefficient contains both the sixth central Taylor coefficient and the first even split correction; dropping the latter would give an incomplete value.

The two sources also meet at their earlier event:

$$
\mathbf Y_\mu^\pm(0)=-R\mathbf e,\qquad
\mathbf V_{j_\pm}(-R)
=\mathbf e\mp R\sqrt{2a\lambda}\,\mathbf f.
$$

Their speeds are already $\sqrt{1+2a\lambda R^2}>1$. If these neighborhoods are supplied as initial history, the outgoing local calculation uses them as prescribed data. If they must arise through earlier coupled evolution, their common encounter and both source equations require a separate analysis. In either interpretation, the result does not initiate a global first crossing from an entirely subfield history.

Finally, a finite one-sided sum of ordinary-root values does not by itself establish a common causal-surface limit at $T=0$. A common regularization of all terms could reveal an additional event contribution not determined by their pointwise sum on $T>0$. The incoming acceleration, complete root census, source evolution and justified event limit remain part of the crossing question.

Claim grade: derived prescribed-history cancellation with a finite outgoing limit for exactly the selected self row and eight local partner rows. An independent calculation confirms the reflection identity and both vanishing longitudinal coefficients. Falsifier: unequal reflected root weights, an incorrect tuning identity, an omitted negative-power term in the complete local sum, or failure of its analytic remainder. This result establishes a geometric cancellation mechanism; it does not establish a coupled EOM solution.

## Global first crossing in a finite retained history

### Assumptions

Take finitely many labels with complete compact retained emission intervals and $C^1$ paths throughout those intervals. Require $\|\mathbf V_j(S)\|<1$ for every retained $S<0$, endpoint speeds at most one, and $C^2$ paths near zero. The crossing receiver has the positive speed derivative $a$ defined above. The complete equation must hold on its punctured simple-root domain. The lower retained-history boundary must be certified clear or separately included by its declared boundary rule; unrepresented earlier emissions are not assigned zero.

These assumptions refer to the supplied complete record. They make no claim about an unspecified older universe.

### Separated endpoints give bounded contributions

If $\mathbf X_j(0)\ne\mathbf X_i(0)$, continuity excludes partner roots with both reception and emission arbitrarily close to zero. For small positive receptions every partner root therefore emits at $S\le-\eta$ for some $\eta>0$. On this compact historical part,

$$
m_j=\max_{S\le-\eta}\|\mathbf V_j(S)\|<1,
\qquad r\ge\eta,
\qquad D_t\ge1-m_j>0.
$$

There is at most one negative-emission root per source. Indeed, for $S_1<S_2<0$ the reverse triangle inequality gives

$$
F_{ij}(T,S_2)-F_{ij}(T,S_1)
\ge S_2-S_1-\|\mathbf X_j(S_2)-\mathbf X_j(S_1)\|>0.
$$

Thus each separated source contribution is bounded by $\kappa|q_iq_j|/[\eta^2(1-m_j)]$. This establishes the bound from the history assumptions; finite population size alone would not establish it.

Older self roots are absent near the event. For every fixed $S<0$, the strictly subfield chord satisfies $F_{ii}(0,S)<0$, and compactness makes this deficit uniform away from zero. The remaining short self roots point into a common forward cone.

### Coincidence with a different velocity is only quadratic

Suppose $\mathbf X_j(0)=\mathbf X_i(0)$ but $\mathbf w=\mathbf V_j(0)\ne\mathbf e$. Put $d=1-\mathbf e\cdot\mathbf w>0$. The receiver expansion gives $F_{ij}(T,0)=aT^2/2+o(T^2)>0$. For every fixed small $c>0$,

$$
F_{ij}(T,-cT)
=T\bigl(\|\mathbf e+c\mathbf w\|-(1+c)\bigr)+o(T)<0.
$$

The source residual is strictly increasing on negative emissions, so exactly one root occurs there. The bounds for arbitrarily small $c$ show $S/T\to0$. In this region $F_S\to d$, yielding

$$
S=-\frac{a}{2d}T^2+o(T^2),\qquad
r=T+O(T^2),\qquad
\mathbf A_{ij}(T)
=\frac{\kappa q_iq_j}{dT^2}\bigl(\mathbf e+o(1)\bigr).
$$

The emission is $O(T^2)$ before the event, but its delay from reception is $O(T)$. No extra positive-emission root is hidden in this calculation. A candidate with $S/T\to k\in(0,1]$ would require

$$
\|\mathbf e-k\mathbf w\|=1-k,
\qquad
k[2d-(1-\|\mathbf w\|^2)k]=0.
$$

The nonzero solution, when it exists, exceeds one because $2d-(1-\|\mathbf w\|^2)=\|\mathbf e-\mathbf w\|^2>0$. The remaining possibility $S/T\to0$ is excluded by $F(T,0)>0$ and $F_S\to d>0$.

### Necessary endpoint condition

If every partner is either separated or coincident with a different velocity, all partner contributions are bounded or quadratic. A finite sum cannot cancel the positive cubic self contribution. Hence a smooth transverse global first crossing requires

$$
\boxed{
\exists j\ne i:\quad
\mathbf X_j(0)=\mathbf X_i(0),
\qquad
\mathbf V_j(0)=\mathbf V_i(0).
}
$$

This is a necessary geometry condition, not a sufficient one. Polarity cannot yet be inferred from it: coincident matching-velocity histories can generate additional short roots with different chord directions.

Claim grade: derived and independently corroborated by separate local expansions. Falsifier: a complete history satisfying these assumptions with a cubic partner contribution despite neither matching endpoint position and velocity nor a failed hypothesis. Infinite populations, noncompact histories, earlier field-speed emissions, nonsmooth endpoints and unsupported non-simple domains lie outside this theorem.

## Matching endpoint velocities do not close the problem

### A missing branch can dominate the cubic terms

Assume $C^3$ local paths with matching endpoint position and velocity and

$$
\mathbf X_k(t)=\mathbf e t+\tfrac12\mathbf A_k t^2+O(t^3),
\qquad a_k=\mathbf e\cdot\mathbf A_k>0.
$$

Writing $h=\sqrt{a_i/a_j}$ gives a negative-emission forward root $S=-hT+O(T^2)$. If $a_i<a_j$, a positive-emission forward root $S=hT+O(T^2)$ also exists. Both give cubic contributions. They do not exhaust the local census in that case.

Let $\Delta\mathbf A=\mathbf A_i-\mathbf A_j$ and $\Delta a=a_i-a_j<0$. A third branch satisfies

$$
r=\rho T^2+O(T^3),\qquad
\rho=-\frac{\|\Delta\mathbf A\|^2}{4\Delta a}>0,
\qquad
\mathbf n_0=\mathbf e-\frac{2\Delta a}{\|\Delta\mathbf A\|^2}\Delta\mathbf A.
$$

To derive it, substitute $r=\rho T^2$ into the leading causal equation $\|\mathbf e r+\Delta\mathbf A\,T^2/2\|=r$ and square. The factor tends to $D_t=2(\Delta a)^2/\|\Delta\mathbf A\|^2>0$, so this branch contributes

$$
\mathbf A_{ij,\mathrm{short}}(T)
\sim\frac{8\kappa q_iq_j}{\|\Delta\mathbf A\|^2T^4}\mathbf n_0.
$$

In the collinear case $\mathbf n_0=-\mathbf e$. An opposite-polarity source then accelerates the receiver with smaller $a_i$ forward at quartic order. Matching selected cubic terms would miss this stronger contribution. Equal longitudinal accelerations, vanishing source speed derivative and higher-order matching require their own expansions; none is assigned a continuation here.

### An isolated opposite-polarity pair fails already on approach

Suppose the pair approaches a common endpoint with $C^2$ paths, strictly subfield incoming histories, and a bounded complete remainder from any other channels. At any noncoincident reception $T<0$, its partner residual has $F(T,T)>0$. For a fixed sufficiently recent $S_0<0$, endpoint coincidence and the strict source chord deficit give

$$
\lim_{T\uparrow0}F(T,S_0)
=\|\mathbf X_j(0)-\mathbf X_j(S_0)\|+S_0<0.
$$

Strict increase in emission time gives exactly one partner root. Along noncoincident receptions approaching zero, that root and its range tend to zero. Since $0<D_t<2$,

$$
\|\mathbf A_{ij}\|
\ge\frac{\kappa|q_iq_j|}{2r^2}\longrightarrow\infty.
$$

There are no self roots in the strictly subfield incoming record. A bounded remainder cannot cancel the diverging partner magnitude, contradicting bounded $C^2$ acceleration.

If the positions instead coincide identically on a terminal incoming interval, their positive-delay root sets at the common receiver position give accelerations proportional to the receiver charges. Opposite charges therefore have opposite accelerations and cannot share a nonzero common acceleration on that interval. Continuity of acceleration excludes a positive common speed derivative at its endpoint. This covers the qualification that the preceding argument used noncoincident receptions.

Claim grade: derived conditional incoming obstruction and short-root example. Falsifier: an omitted root under the displayed nondegenerate jet assumptions, a failed quartic coefficient, or an isolated-pair incoming history satisfying the stated regularity and bounded-remainder assumptions despite the divergence. Larger coincident clusters with unbounded opposing incoming contributions remain unresolved.

## Assessment and next mathematical question

The explicit positive-range family now has a complete local asymptotic assessment. One earlier superfield source can cancel the leading self coefficient but leaves a nonintegrable transverse quadratic term. Two reflected sources cancel the transverse contributions exactly. With the derived parameter relations, their eight local partner roots and the receiver's local self root have a finite outgoing acceleration sum. Thus the unchanged per-root equation permits prescribed geometries whose local sum cancels all the divergent terms, rather than only their leading coefficient.

The finite-time numerical comparison above already shows a mismatch between the selected local sum and the prescribed receiver acceleration. The remaining mathematical question for this separate geometry is full dynamical compatibility: derive an exact or rigorous enclosure for $\Lambda$, include every other retained contribution, and test the equations for both the receiver and sources. The reflected sources' earlier encounter and the common event limit remain separate conditions. For the global-first question, a larger coincident cluster would have to resolve the incoming obstruction as well as the outgoing self birth. These questions do not constitute an outgoing solution for the original collinear binary.

These calculations explore the existing equation. They provide neither a completed crossing nor a new outcome for the stationary binary.
