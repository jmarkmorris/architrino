# Recoil Pullback Lemma for the Pure Scalar Action

## Result and verdict

**PASS — derived on the declared regularized branch neighborhood.** The
nonzero constraint residual of the pure scalar action is a legitimate
same-action recoil row on a branch-preserving neighborhood of the principal
circular partner chart. The proof is an exact kernel decomposition, not a
work-integral reconstruction: the regularized pure scalar kernel splits into
an inverse-square component and a residual component whose receiver gradient
is exactly the derivative-of-constraint row. The residual component is an
invariant nonlocal action component and therefore supplies explicit cross-cut
energy, momentum, and angular-momentum increments.

The canonical scale-only acceleration law is still not derived by the pure
scalar scaffold. What passes is the different second-order law containing the
nonzero recoil row.

**Claim grade: derived for the regularized pure scalar action, the endpoint-clear
characteristic split, compact-interior or period-matched cuts, and the retained
single-root branch neighborhood defined below.**

**Falsifier:** The pass fails if the residual-kernel identity in Section 5 has
an extra inverse-square term, if its cross-cut Noether derivatives contain an
uncancelled interior term, or if the perturbation loses its retained root,
positive separation floor, source-normal floor, receiver-normal floor, or
inactive-gap condition. Each item is displayed explicitly below.

No numerical runs were used.

## 1. Circular datum and notation

Let
$$
\mathbf e(T)=(\cos\omega T,\sin\omega T,0),
\qquad
\mathbf t(T)=(-\sin\omega T,\cos\omega T,0).
$$
The undeformed history, with arbitrary fixed center $\mathbf C$, is
$$
\mathbf X_1^{(0)}(T)=\mathbf C+R\mathbf e(T),
\qquad
\mathbf X_2^{(0)}(T)=\mathbf C-R\mathbf e(T).
$$
Write
$$
\beta=\frac{R\omega}{c_f}\in(0,1),
\qquad
c=\cos\xi,
\qquad
s=\sin\xi,
\qquad
J_p=1+\beta s,
$$
where the principal positive-delay root obeys
$$
\cos\xi=\frac{\xi}{\beta},
\qquad
\Delta=\frac{2\xi}{\omega},
\qquad
r_p=2Rc.
$$
For opposite polarities set $Q=|q_1q_2|$. The sharp residual magnitude from
[P4](analysis-action-residual-second-order.md) is
$$
\Phi_0
=
\frac{\omega\beta c}{4c_fR J_p^3}>0,
$$
so, at the cut $T_*=0$ with $\mathbf e=\mathbf e(0)$,
$$
\mathbf R_{C,1}^{(0)}=-\kappa Q\Phi_0\mathbf e,
\qquad
\mathbf R_{C,2}^{(0)}=+\kappa Q\Phi_0\mathbf e.
$$

**Claim grade: derived in P4 and restated here as the datum for this lemma.**

**Falsifier:** A corrected full ordered-pair variation of the same scalar
kernel that changes $\Phi_0$ or adds a tangential term on the exact circular
chart would require the perturbative calculation below to be redone.

## 2. Branch-preserving perturbation family

Choose a smooth bump $\chi$ with
$$
\chi(0)=1,
\qquad
\operatorname{supp}\chi\subset(-\tau,\tau),
\qquad
0<\tau<\frac{\Delta}{3},
$$
and with its support and every mollifier support tube separated from the
action endpoints. For fixed dimensionless radius-split amplitude $a$ and
fixed radial-speed amplitude $v_r$, define
$$
\mathbf X_1^{(\epsilon)}(T)
=
\mathbf C
+R(1+\epsilon a)\mathbf e(T)
+\epsilon v_r T\chi(T)\mathbf e(T),
$$
$$
\mathbf X_2^{(\epsilon)}(T)
=
\mathbf C
-R(1-\epsilon a)\mathbf e(T)
-\epsilon v_r T\chi(T)\mathbf e(T).
$$
The radius split exposes the global momentum projection. The compact radial
velocity bump exposes the energy projection without changing the three event
positions at $T=-\Delta,0,+\Delta$ used by the central-cut residual. The fixed
center $\mathbf C$ keeps the dependence of angular momentum on the chosen
origin explicit.

At $T=0$ the circular part has radii
$$
R_+=R(1+\epsilon a),
\qquad
R_-=R(1-\epsilon a).
$$
If $\delta_\epsilon=\omega\Delta_\epsilon$ denotes the retained partner delay
angle at the central cut, its constraint is
$$
\frac{\delta_\epsilon}{\beta}
=
2\sqrt{
\cos^2\frac{\delta_\epsilon}{2}
+\epsilon^2a^2\sin^2\frac{\delta_\epsilon}{2}
}.
$$
The linear radius terms cancel, so the implicit-function theorem gives
$$
\delta_\epsilon=2\xi+O(\epsilon^2),
\qquad
r_\epsilon=2Rc+O(\epsilon^2),
\qquad
J_\epsilon=J_p+O(\epsilon^2).
$$
The derivative with respect to $\delta$ is nonzero because it reduces at
$\epsilon=0$ to the strictly monotone principal-root equation used in P4.

The bump vanishes at the source and future-receiver events $\mp\Delta$, and
its value vanishes at the cut. It therefore changes only the central-cut
velocities to first order:
$$
\mathbf V_1^{(\epsilon)}(0)
=
R(1+\epsilon a)\omega\mathbf t(0)
+\epsilon v_r\mathbf e(0),
$$
$$
\mathbf V_2^{(\epsilon)}(0)
=
-R(1-\epsilon a)\omega\mathbf t(0)
-\epsilon v_r\mathbf e(0).
$$
At the central cut the source-normal and receiver-normal rows are therefore
$$
\frac{D_s}{c_f}=J_p+O(\epsilon^2),
\qquad
\frac{D_T}{c_f}
=
J_p-\epsilon\frac{v_rc}{c_f}+O(\epsilon^2),
$$
and
$$
W^{\mathrm{rec}}
=
1-\epsilon\frac{v_rc}{c_fJ_p}+O(\epsilon^2).
$$
Thus the velocity bump changes the receiver-normal strength but cannot remove
its positive floor for sufficiently small $|\epsilon|$.

Because $\beta<1$, choose $|\epsilon|$ small enough that both source-speed
suprema retain a strict margin below $c_f$. Then the source-time causal
function remains strictly monotone, hence has exactly one partner root. On a
compact cut neighborhood, continuity also preserves positive $r$, $J$, and
$W^{\mathrm{rec}}$ floors and the inherited inactive-gap and endpoint-clearance
conditions. Thus the chart is branch preserving, not merely root preserving
at one cut.

**Claim grade: derived.**

**Falsifier:** A first-order term in $\delta_\epsilon$, a source speed reaching
$c_f$, or a zero of any retained floor would invalidate the family. The
displayed constraint has no linear $\epsilon$ term, while the strict baseline
floors make the remaining conditions open under sufficiently small
$\epsilon$.

## 3. Perturbed residual coefficient

The radius-split circular part can be evaluated before the compact velocity
bump is applied. Put $\delta=\delta_\epsilon$ and
$$
r^2=R_+^2+R_-^2+2R_+R_-\cos\delta,
$$
$$
u_r=\frac{R_+R_-\omega\sin\delta}{r},
\qquad
J=1+\frac{u_r}{c_f},
$$
$$
w_r
=
-\frac{R_+R_-\omega^2\cos\delta}{r}
-\frac{(R_+R_-\omega\sin\delta)^2}{r^3},
\qquad
L=\frac{2u_r}{r}+\frac{w_r}{c_fJ}.
$$
For worldline $1$, the incoming chord at the cut has radial component
$$
A=R_++R_-\cos\delta
$$
and its source-phase derivative has radial component
$$
D=R_-\omega\sin\delta.
$$
Adding the receiver and transposed-source constraint terms gives the exact
radial coefficient
$$
\boldsymbol{\mathscr C}_{1,p}^{(0)}(\epsilon)
=
\Phi(\epsilon a)\mathbf e(0),
\qquad
\Phi(\epsilon a)
=
\frac{D-AL}{c_f r^2J^2}.
$$
The reflected calculation gives
$$
\boldsymbol{\mathscr C}_{2,p}^{(0)}(\epsilon)
=
-\Phi(-\epsilon a)\mathbf e(0).
$$
At equal radii,
$$
L_0
=
\omega\left(\tan\xi-\frac{\beta c}{2J_p}\right),
$$
and direct expansion gives
$$
\Phi(\epsilon a)
=
\Phi_0
-\epsilon a\,
\frac{
\omega s\left[2+\beta s(1+s^2)\right]
}
{4c_fR c^3J_p^3}
+O(\epsilon^2).
$$
Define the positive coefficient
$$
\Pi_1
\equiv
\kappa Q\,
\frac{
\omega s\left[2+\beta s(1+s^2)\right]
}
{2c_fR c^3J_p^3}
>0.
$$

**Claim grade: derived from the full receiver-plus-transposed-source
coefficient, not from a fitted acceleration row.**

**Falsifier:** Substitution of $R_+=R_-=R$ must reproduce $\Phi_0$, and
interchanging $R_+$ and $R_-$ must send $\Phi(\epsilon a)$ to
$\Phi(-\epsilon a)$. Failure of either algebraic check overturns this
expansion. Both identities are manifest in the displayed formula.

## 4. The three leading residual projections

Restoring the opposite-polarity factor $\sigma_{12}=-1$, the total linear
projection at the central cut is
$$
\boxed{
\sum_i\mathbf R_{C,i}^{(\epsilon)}(0)
=
\epsilon a\Pi_1\mathbf e(0)
+O(\epsilon^2).
}
$$
The exact antipodal cancellation is therefore lifted at first order by an
unequal-radius deformation even though the retained root and its $r$ and $J$
values do not move at first order.

The compact radial velocity bump does not change the residual coefficient at
the central cut, but it changes the work projection. Therefore
$$
\boxed{
\sum_i
\mathbf V_i^{(\epsilon)}(0)\cdot
\mathbf R_{C,i}^{(\epsilon)}(0)
=
-2\epsilon\kappa Q v_r\Phi_0
+O(\epsilon^2)
=
-\epsilon\kappa Qv_r
\frac{\omega\beta c}{2c_fR J_p^3}
+O(\epsilon^2).
}
$$
This is nonzero for $v_r\ne0$. Its sign reverses when the radial bump reverses,
as a recoil work row must.

Every central-cut residual remains radial about $\mathbf C$, so the angular
projection about the chosen origin is
$$
\boxed{
\sum_i
\mathbf X_i^{(\epsilon)}(0)\times
\mathbf R_{C,i}^{(\epsilon)}(0)
=
\mathbf C\times
\sum_i\mathbf R_{C,i}^{(\epsilon)}(0)
=
\epsilon a\Pi_1\,\mathbf C\times\mathbf e(0)
+O(\epsilon^2).
}
$$
For the center-origin convention $\mathbf C=\mathbf0$, this angular projection
remains zero at the displayed order. For a translated origin it has exactly
the required origin dependence, $\mathbf J\mapsto\mathbf J+\mathbf C\times
\mathbf P$; it is not an independent symmetry zero once the momentum
projection is nonzero.

**Claim grade: derived to leading order in $\epsilon$.**

**Falsifier:** The energy row is overturned if the constraint coefficient at
the cut depends on the locally changed receiver velocity despite all three
kernel event positions and the source and future-receiver jets being fixed.
The pre-integration double-time kernel depends on endpoint positions, while
the required source and future-receiver derivatives occur at $\mp\Delta$;
the central velocity is absent from this residual coefficient. The momentum
and angular rows are overturned by an error in the radius-split expansion in
Section 3.

## 5. Exact residual-action decomposition

Let
$$
g=T_1-T_{\mathrm{em}}-\frac{r}{c_f},
\qquad
u=g+\frac{r}{c_f},
\qquad
D=\partial_r-\frac{1}{c_f}\partial_g.
$$
The reduced regularized pure scalar kernel is
$$
K_0^{(\eta)}(r,g)=\frac{\delta_\eta(g)}{r}.
$$
Choose the same outgoing characteristic clearance $h_+>0$ throughout the
branch tube, with $\delta_\eta(-h_+)=0$, and define
$$
K_{\mathrm{scale}}^{(\eta)}(r,g)
=
\int_{-h_+}^{g}
\frac{\delta_\eta(s)}{c_f(u-s)^2}\,ds,
$$
$$
K_C^{(\eta)}(r,g)
\equiv
K_0^{(\eta)}(r,g)-K_{\mathrm{scale}}^{(\eta)}(r,g).
$$
This is an exact additive decomposition of the original kernel:
$$
K_0^{(\eta)}=K_{\mathrm{scale}}^{(\eta)}+K_C^{(\eta)}.
$$
No counterterm has been added to the action. The two characteristic tails
appear with opposite signs and cancel in their sum.

Direct differentiation gives
$$
DK_{\mathrm{scale}}^{(\eta)}
=
-\frac{\delta_\eta(g)}{r^2},
$$
and hence
$$
\boxed{
DK_C^{(\eta)}
=
-\frac{\delta_\eta'(g)}{c_fr}.
}
$$
Therefore $K_C^{(\eta)}$ generates exactly the derivative-of-constraint
residual and no inverse-square scale row. Because it depends only on $r$, $g$,
$u$, and the declared scalar endpoint $h_+$, it separately preserves absolute
time translation, Euclidean spatial translation, and Euclidean rotation.

This resolves the apparent same-support obstruction. No same-support scalar
or finite delta-jet kernel can isolate the residual without changing the
inverse-square row. The needed residual component is necessarily nonlocal
along the $(r,g)$ characteristic, but it is already available as one side of
an exact decomposition of the same pure scalar action.

**Claim grade: derived.**

**Falsifier:** Apply $D$ to the two displayed kernels. Any surviving
$\delta_\eta(g)/r^2$ term in $DK_C^{(\eta)}$, or any noncancelling tail in
$K_{\mathrm{scale}}^{(\eta)}+K_C^{(\eta)}$, would turn this into an action
repair rather than a same-action decomposition.

## 6. Explicit wake-history increments

Restore the coupling and causal ordering:
$$
\mathcal K_{C,ij}^{(\eta)}(T_1,T_{\mathrm{em}})
=
\frac{\kappa\sigma_{ij}|q_iq_j|}{c_f}
\Theta(T_1-T_{\mathrm{em}})
K_C^{(\eta)}
\left(r_{ij},\widetilde g_{ij}\right).
$$
Let $X_{ij}^{\mathfrak B}(T_*)$ be the cross-cut part of the retained branch
tube:
$$
X_{ij}^{\mathfrak B}(T_*)
=
\left\{
(T_1,T_{\mathrm{em}}):
T_{\mathrm{em}}\le T_*<T_1,
\ (i,j,T_1,T_{\mathrm{em}})\in\mathfrak B
\right\}.
$$
Define the residual wake-history increments
$$
E_{\mathrm{wake},C}^{(\eta)}(T_*)
=
\frac12\sum_{i,j}
\int_{X_{ij}^{\mathfrak B}(T_*)}
\partial_{T_1}\mathcal K_{C,ij}^{(\eta)}
\,dT_{\mathrm{em}}\,dT_1,
$$
$$
\mathbf P_{\mathrm{wake},C}^{(\eta)}(T_*)
=
-\frac12\sum_{i,j}
\int_{X_{ij}^{\mathfrak B}(T_*)}
\nabla_{\mathbf X_i(T_1)}
\mathcal K_{C,ij}^{(\eta)}
\,dT_{\mathrm{em}}\,dT_1,
$$
$$
\mathbf J_{\mathrm{wake},C}^{(\eta)}(T_*)
=
-\frac12\sum_{i,j}
\int_{X_{ij}^{\mathfrak B}(T_*)}
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\mathcal K_{C,ij}^{(\eta)}
\,dT_{\mathrm{em}}\,dT_1.
$$
These are action-cut functionals. They are not defined by integrating an
observed acceleration deficit.

A step time translation, step spatial translation, and step rotation across
$T_*$ give, respectively,
$$
\boxed{
\frac{dE_{\mathrm{wake},C}^{(\eta)}}{dT_*}
=
-\sum_i
\mathbf V_i(T_*)\cdot\mathbf R_{C,i}^{(\eta)}(T_*)
+\mathcal B_E^{(\eta)}(T_*),
}
$$
$$
\boxed{
\frac{d\mathbf P_{\mathrm{wake},C}^{(\eta)}}{dT_*}
=
-\sum_i\mathbf R_{C,i}^{(\eta)}(T_*)
+\boldsymbol{\mathcal B}_P^{(\eta)}(T_*),
}
$$
$$
\boxed{
\frac{d\mathbf J_{\mathrm{wake},C}^{(\eta)}}{dT_*}
=
-\sum_i
\mathbf X_i(T_*)\times\mathbf R_{C,i}^{(\eta)}(T_*)
+\boldsymbol{\mathcal B}_J^{(\eta)}(T_*).
}
$$
Under the compact-interior convention the three $\mathcal B$ terms vanish.
Under a period-matched convention they cancel across the matched cut. The
identities hold for every sufficiently small member of the perturbation
family because the branch tube, endpoint $h_+$, and retained row set are held
fixed while the floors remain positive.

The regularized coefficients are smooth on that tube. The simple-root
approximate-identity limit and the uniform floors therefore give
$$
\left\lVert
\frac{d}{dT_*}(E,\mathbf P,\mathbf J)_{\mathrm{wake},C}^{(\eta)}
+
\left(
\sum_i\mathbf V_i\cdot\mathbf R_{C,i},
\sum_i\mathbf R_{C,i},
\sum_i\mathbf X_i\times\mathbf R_{C,i}
\right)
\right\rVert_{L^1(W_0)}
\longrightarrow0
$$
as $\eta\to0^+$, with the declared endpoint leakage included when it is not
identically zero.

**Claim grade: derived from the three symmetries of the explicit residual
action component and the branch-preserving regularized pullback.**

**Falsifier:** Differentiate the cross-cut domains. An uncancelled term away
from their two cut faces would be an interior leakage and would fail the
lemma. A tail endpoint that moves off a characteristic or enters the
mollifier support would instead produce a declared $\mathcal B$ term and must
not be hidden as recoil.

## 7. Consequence for the second-order law

The pure scalar action has the exact action-level split
$$
S_{\mathrm{scalar}}
=
S_{\mathrm{scale}}+S_C,
$$
so its Euler equation on this neighborhood is
$$
\mu_{\mathrm{arch}}\mathbf A_i
=
\mathbf R_{\mathrm{scale},i}
+\mathbf R_{C,i}.
$$
The increments in Section 6 close the energy, momentum, and angular-momentum
projections of $\mathbf R_C$ from the same action. Thus the nonzero P4
coefficient is supported as recoil in the recoil-inclusive action law.

This does not cancel $\mathbf R_C$, does not derive the canonical scale-only
Master EOM, and does not establish that the auxiliary split endpoint $h_+$ is
a unique physical partition of scale and recoil content. It establishes the
existence statement asked by the principal-circle recoil-pullback lemma.

**Claim grade: derived logical consequence of Sections 5 and 6.**

**Verdict:** **pass**. The pure scalar scaffold supports a conserved
recoil-inclusive second-order action law on this branch neighborhood. The
canonical scale-only second-order Master EOM remains an independent postulate
unless another invariant action mechanism cancels $\mathbf R_C$.

## 8. Smallest follow-on lemma

### Characteristic-split independence lemma

**Target statement:** For any two endpoint-clear characteristic choices
$h_+^{(1)}$ and $h_+^{(2)}$ on the same retained branch tube, prove that the
difference between their residual wake-history increments is a cut-constant
or a declared endpoint flux, while
$$
\frac{d}{dT_*}
\left[
(E,\mathbf P,\mathbf J)_{\mathrm{wake},C}^{(1)}
-(E,\mathbf P,\mathbf J)_{\mathrm{wake},C}^{(2)}
\right]
=
\mathbf0
$$
on compact-interior or period-matched cuts. Equivalently, the observable
recoil transfer must be independent of how the exact identity
$K_0=K_{\mathrm{scale}}+K_C$ partitions its cancelling characteristic tails.

This is the smallest follow-on because the present lemma proves existence but
not uniqueness of the scale/recoil split. If the derivative depends on
$h_+$, the pass above would be only a bookkeeping construction. If it does
not, the recoil pullback is split-gauge independent on the whole certified
neighborhood.

**Claim grade: derivation target.**

**Falsifier:** Exhibit two endpoint-clear values of $h_+$ whose residual
charges have different cut derivatives while all branch rows and endpoint
conventions remain fixed.
