# Assessment of nonmirror sublinear contact

**Accepted derived result:** each fixed $0<p<1$ admits a relative-open class of complete compatible nonmirror collinear histories whose first finite endpoint is contact below unit speed. The class includes a pair moving in the same direction with unequal positive velocities and a moving center. Acceleration diverges integrably at contact; the ordinary positive-range law supplies no classical continuation there. Robustness is within the line, not under transverse perturbations.

The [independent subject](alternatives-screen-2026-10-05-radial-sublinear-nonmirror-contact.md), SHA-256 `ab6c62e4a3eb6f442df6464b92081dad9ee4cebdc136422bd30b8a2966e2bef5`, was read after the coordinator froze its [separate direct reference](alternatives-screen-2026-10-05-radial-sublinear-nonmirror-coordinator-reference.md), SHA-256 `d816da53148e6d932a7d6f7b03b8b17ab3ba0cc3416535e84cd851e036744b91`. The two sources use different explicit preparations; their agreement concerns the general full-root inequalities and contact mechanism, not identical case data. The subject's [specification](alternatives-screen-2026-10-05-radial-sublinear-nonmirror-protocol.md) has SHA-256 `580b2fe2be3ebe89398d0c2dc9dec178c7828bb69c0186a3835733eee93a0ae6`.

## General criterion and full-history proof

Fix the sharp radial row, $K=R_*=c_f=1$, with ordered coordinates $x_1>x_2$. Put $q=1-p$, gap $g=x_1-x_2$, approach speed $w=v_2-v_1$, $g_0=g(0)>0$, $w_0>0$, and $B_0=\max_i|v_i(0)|$. The complete compatible separated locally $C^{2,1}$ supplied past has speed bound $B_{past}<1/2$. A sufficient strict release inequality is

$$
L=B_0+\sqrt{w_0^2+12g_0^q/q}-w_0<1/2.
$$

Under a provisional complete half-speed bound, full residual monotonicity yields one partner root for each receiver and no positive-delay self root. Source directions cannot reverse: the wrong direction together with complete speed chords would contradict the positive current gap. The exact ranges and denominators are

$$
R_1=g+\int_{s_1}^t v_2,\quad D_1=1-v_2(s_1),\qquad
R_2=g-\int_{s_2}^t v_1,\quad D_2=1+v_1(s_2).
$$

Consequently $g/(1+b)\le R_i\le g/(1-b)$ for a complete speed bound $b$, including every old source. At $b=1/2$, the actual acceleration magnitudes $Q_i=R_i^{-p}/D_i$ satisfy

$$
c_pg^{-p}\le Q_i\le C_pg^{-p}<3g^{-p},\qquad
c_p=2^{1-p}/3,\quad C_p=2(3/2)^p.
$$

Since $v_1'=-Q_1$, $v_2'=Q_2$, one has $w'>0$, $g'=-w$ and $d(w^2)/dg=-2(Q_1+Q_2)$. Integration gives $w^2\le w_0^2+12g_0^q/q$. Each individual velocity change is at most $w-w_0$, so $|v_i|\le L<1/2$, closing the strict margin. All complete speeds stay below $\max(B_{past},L)<1/2$. Also $w\ge w_0$, so contact occurs no later than $g_0/w_0$. Positive-gap ordinary continuation excludes any earlier finite endpoint.

## A fixed moving-center case

The subject supplies affine tails $x_1=a+V_1S$, $x_2=-a+V_2S$ for $S\le-d$, with

$$
V_1=3/32,\quad V_2=5/32,\quad d=a/16,\qquad
0<a\le\frac14\left(\frac q{1024}\right)^{1/q}.
$$

On the patch put $z=(S+d)/d$ and $v_1=V_1+A_1dz^2(1-z)$, $v_2=V_2-A_2dz^2(1-z)$, integrating positions from the affine seam. The unique positive coefficients satisfy

$$
A_1=(1-V_2)^{p-1}(2a+A_1d^2/12)^{-p},\qquad
A_2=(1+V_1)^{p-1}(2a+A_2d^2/12)^{-p}.
$$

At release the velocities remain $V_i$ and accelerations are $-A_1,+A_2$. The full release roots precede the patch, with ranges $(2a+A_1d^2/12)/(1-V_2)$ and $(2a+A_2d^2/12)/(1+V_1)$. These equations therefore prove compatibility directly from the complete affine sources. They do not approximate the delayed acceleration by an instantaneous input.

The subject bounds the entire patch, gives $g_0<3a$ and $L<7/32$, and obtains $1/32<v_1\le3/32$ and $5/32\le v_2<7/32$ through the incoming future. A concrete sufficient case is $p=1/2$, $a=2^{-26}$, $d=2^{-30}$. Both labels move rightward, and the center is moving. The coordinator's different endpoint-preserving patch checks the same general mechanism but is not substituted for this specification.

## Endpoint and relative openness

Let $T_*$ be contact, $\Delta=T_*-t$, $v_1\to U$, $v_2\to V$ and $w_*=V-U>0$. Then $g\sim w_*\Delta$, and the complete source limits give

$$
R_1\sim\frac{w_*\Delta}{1-V},\quad
R_2\sim\frac{w_*\Delta}{1+U},\quad
C_1=(1-V)^{p-1}w_*^{-p},\quad C_2=(1+U)^{p-1}w_*^{-p}.
$$

Thus

$$
v_1=U+\frac{C_1}{q}\Delta^q+o(\Delta^q),\qquad
v_2=V-\frac{C_2}{q}\Delta^q+o(\Delta^q),
$$

$$
x_1=X_*-U\Delta-\frac{C_1}{q(2-p)}\Delta^{2-p}+o(\Delta^{2-p}),\qquad
x_2=X_*-V\Delta+\frac{C_2}{q(2-p)}\Delta^{2-p}+o(\Delta^{2-p}).
$$

The ranges tend to zero and the incoming acceleration has order $\Delta^{-p}$. It is integrable precisely in this exponent range. At contact, complete strict chords exclude other positive-delay roots; the ordinary zero-range incidence is undefined. A finite incoming $C^1$ trace does not select a collision rule.

The strict criterion is open relative to compatible histories in a weighted complete-past position norm $\sup_{S\le0}|\delta x_i(S)|/(a+|S|)$ and uniform velocity norm, with local $C^{2,1}$ regularity. Small compatible perturbations preserve the complete gap and speed margins. Smooth bumps avoiding the release and both release source events give nontrivial exactly compatible variations. On regular finite prefixes the root map and solution depend continuously on these histories. With a common positive approach-speed lower bound, remaining time is at most $g/w_{min}$ and remaining velocity change at most $6g^q/(q w_{min})$. These uniform vanishing tails prove continuity of contact time, contact position, limiting velocities and the displayed coefficients. The result is not a claim of robust collision in three dimensions.

Falsifiers are a missing complete root, an incorrect source direction, failure of the integrated velocity bound under the strict release inequality, incompatible patch jets, or an endpoint source coefficient different from the displayed limit. No numerical target or fitted contact law supports this admission; the evidence is the two separately constructed analytic arguments and direct assessment of the exact preparation.
