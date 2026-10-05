# Coordinator reconstruction of nonmirror sublinear contact

## Fixed law, history class and independence

**Grade: derived candidate, frozen before receiving the independently assigned nonmirror derivation.** Fix $0<p<1$, $K=R_*=c_f=1$, opposite polarities and the sharp ordinary-root radial response. The particles remain on one fixed line, with ordered positions $x_R(T)>x_L(T)$ before first contact. Their complete locally $C^{2,1}$ pasts are separated, acceleration-compatible at release and have individual speeds at most $1/4$. At release assume

$$
|v_R(0)|,|v_L(0)|\le\frac18,\qquad
w_0=v_L(0)-v_R(0)\ge0,\qquad
d_0=x_R(0)-x_L(0)>0,
$$

$$
d_0^{1-p}\le\frac{1-p}{768}.
$$

These are sufficient conditions. Strict versions define a relative open set within the complete separated compatible collinear history class. The construction below gives nonmirror examples with nonzero common drift. No Galilean invariance is assumed. The new proof is independent of the worker's forthcoming nonmirror source; the already assessed mirror-contact theorem is contextual antecedent only.

## Complete root directions and delayed acceleration bounds

On a provisional complete speed bound $b=1/2$, the right receiver can have only a positive-oriented partner ray. Indeed a negative ray would require $R=-d-[x_L(T)-x_L(S)]\le-d+bR$, which is impossible. The right ray therefore satisfies $R_+=x_R(T)-x_L(S_+)$ and has transmitter factor $D_+=1-v_L(S_+)$. The left ray has $R_-=x_R(S_-)-x_L(T)$ and $D_-=1+v_R(S_-)$. Each receiver's delay residual is strictly increasing with derivative at least $1-b$, starts negative, and tends to positive infinity by the complete speed bound. Thus each has exactly one positive simple partner root, and no positive-delay self root by the strict chord inequality.

For either ray,

$$
\frac d{1+b}\le R_\pm\le\frac d{1-b},\qquad
1-b\le D_\pm\le1+b.
$$

The actual accelerations are $v_R'=-Q_+$ and $v_L'=Q_-$, where $Q_\pm=R_\pm^{-p}D_\pm^{-1}$. At $b=1/2$,

$$
L_pd^{-p}\le Q_\pm\le3d^{-p},\qquad L_p=\frac{2^{1-p}}3>0.
$$

The upper constant follows from $2(3/2)^p\le3$. All old sources are retained in these inequalities. In particular the constant-center identity of an instantaneous central law is not used; generally $Q_+\ne Q_-$.

## Finite contact with a strict speed margin

Put $w=v_L-v_R$. Then $d'=-w$ and $w'=Q_++Q_->0$. For positive time $w>0$, so exact radius-coordinate integration gives

$$
w_0^2+\frac{4L_p}{1-p}(d_0^{1-p}-d^{1-p})
\le w^2\le
w_0^2+\frac{12}{1-p}(d_0^{1-p}-d^{1-p}).
$$

Since each individual velocity increment has magnitude at most $w-w_0$,

$$
|v_i(T)-v_i(0)|\le w-w_0
\le\sqrt{\frac{12d_0^{1-p}}{1-p}}\le\frac18.
$$

Thus individual future speeds remain at most $1/4$, closing the provisional half-speed bound. The complete past also satisfies that stronger bound. The transmitter factors remain at least $3/4$. At a finite endpoint with positive separation, root ranges and completed source regularity stay strict, giving ordinary continuation. But $w'\ge2L_pd_0^{-p}$ implies $d(T)\le d_0-w_0T-L_pd_0^{-p}T^2$, excluding infinite positive-separation persistence. The first endpoint is finite contact, not a speed or denominator event.

Both individual velocities are monotone and bounded, with limits $v_R^*,v_L^*\in[-1/4,1/4]$. The closing limit $w_*=v_L^*-v_R^*>0$ obeys the displayed integrated lower and upper bounds. Their positions converge to one finite contact point $x_*$. This proof supplies a relative-open contact class when the size, release-speed and incoming inequalities are strict; the history topology must control the complete speed bound and release data while retaining separation and compatibility.

## A complete nonmirror preparation

For a concrete family choose $x_R(0)=a$, $x_L(0)=-a$, $v_R(0)=3/64$ and $v_L(0)=5/64$. The common drift is $1/16$ and $w_0=1/32$. Complete affine tails with these endpoint positions and velocities have separation $2a-S/32>0$ for every $S\le0$. Let $d_0=2a$, patch width $\delta=d_0/64$, and

$$
\phi_\delta(S)=\frac{\delta^2}{2}z^3(1-z)^2,\qquad z=\frac{S+\delta}{\delta},\qquad -\delta\le S\le0.
$$

Outside the patch $\phi=0$. Add $A_R\phi$ and $A_L\phi$ to the respective affine positions, with

$$
A_R=-\frac{(1-5/64)^{p-1}}{(2a)^p},\qquad
A_L=\frac{(1+3/64)^{p-1}}{(2a)^p}.
$$

The endpoint position and velocity jets are unchanged, the old-end acceleration vanishes, and $\phi''(0)=1$. The release delays $2a/(1-5/64)$ and $2a/(1+3/64)$ exceed the patch width, so they sample the exact affine tails. The stated accelerations are therefore exactly compatible. For fixed $p$ and sufficiently small $a$, patch position changes are $O_p(a^{2-p})=o(a)$ and velocity changes are $O_p(a^{1-p})=o(1)$, preserving complete separation and speed below $1/4$. Choose $a$ additionally small enough to satisfy the explicit theorem inequality strictly. This is a frozen formula family, not a numerically tuned launch or a boost of a mirror solution.

## Nonmirror incoming asymptotics

Let $\Delta=T_*-T$. Finite velocity limits give $x_i(T)=x_*-v_i^*\Delta+o(\Delta)$ and $d\sim w_*\Delta$. The complete range bounds imply both sources approach contact. Their exact equations then yield

$$
R_+\sim\frac{w_*}{1-v_L^*}\Delta,\qquad
R_-\sim\frac{w_*}{1+v_R^*}\Delta,
$$

$$
\frac{T_*-S_+}{\Delta}\to\frac{1-v_R^*}{1-v_L^*},\qquad
\frac{T_*-S_-}{\Delta}\to\frac{1+v_L^*}{1+v_R^*}.
$$

These different source clocks retain the moving-center effect. Set

$$
C_+=(1-v_L^*)^{p-1}w_*^{-p},\qquad
C_-=(1+v_R^*)^{p-1}w_*^{-p}.
$$

Then $Q_\pm\sim C_\pm\Delta^{-p}$ and two integrations give

$$
v_R=v_R^*+\frac{C_+}{1-p}\Delta^{1-p}+o(\Delta^{1-p}),\qquad
v_L=v_L^*-\frac{C_-}{1-p}\Delta^{1-p}+o(\Delta^{1-p}),
$$

$$
x_R=x_*-v_R^*\Delta-\frac{C_+}{(1-p)(2-p)}\Delta^{2-p}+o(\Delta^{2-p}),
$$

$$
x_L=x_*-v_L^*\Delta+\frac{C_-}{(1-p)(2-p)}\Delta^{2-p}+o(\Delta^{2-p}).
$$

The mirror case $v_R^*=-w_c$, $v_L^*=w_c$, $w_*=2w_c$ recovers the earlier coefficient. The limits are inferred from exact root equations and integrated bounds, never from differentiated little-oh errors.

At contact the incoming accelerations diverge integrably, the ordinary positive-range chart ends, and no $C^2$ continuation exists through the inherited trace. A weaker outgoing extension is not selected. This theorem proves no robustness to perturbations off the line; transverse offsets can remove coincidence. An extra ordinary root under the complete speed bound, a reversed delayed ray, failure of the individual-increment estimate, or an incorrect limiting source ratio falsifies a load-bearing step. No numerical instrument was used.
