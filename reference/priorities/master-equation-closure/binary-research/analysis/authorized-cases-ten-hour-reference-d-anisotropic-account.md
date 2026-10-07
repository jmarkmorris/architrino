# Blind reference for the anisotropic pair account

Frozen before the new D account subject. Use only the canonical coefficient $K$, $c_f=1$, the actual complete strict-subfield pair, simultaneous separation $Z=dN$, relative velocity $U$, and center velocity $W$. Put $u=N\cdot U$, $U_\perp=U-uN$, $a=N\cdot W$, $b=W-aN$, $g=(1-|b|^2)^{1/2}$, and actual rows $A_r=U'$, $A_c=W'$. The scalar below is an auxiliary mathematical account, not physical energy:

$$
 J=\frac{|U|^2}{2}-\frac{2Kg}{d}-\frac{Ku}{d}.
$$

## Exact derivative and cancellation

Claim grade: derived identity. Since $N'=U_\perp/d$,

$$
 g'=\frac{-b\cdot A_c+a\,b\cdot U_\perp/d}{g}.
$$

Direct differentiation gives

$$
 J'=(U-KN/d)\cdot A_r
 +\frac K{d^2}\left(u^2-|U_\perp|^2+2gu\right)
 +\frac{2K}{dg}b\cdot A_c
 -\frac{2Ka}{d^2g}b\cdot U_\perp. \tag{1}
$$

The exact simultaneous affine rows must use the two current source velocities $W-U/2$ and $W+U/2$ separately. For direction $N$ and source velocity $v$, write $a_v=N\cdot v$, $b_v=v-a_vN$, $g_v=(1-|b_v|^2)^{1/2}$. Its positive-direction kernel is

$$
 F(N,v)=(g_v-a_v)N+(1-a_v/g_v)b_v.
$$

The two affine rows are $-KF(N,W-U/2)/d^2$ and $+KF(-N,W+U/2)/d^2$ with the sign convention checked against the original opposite receiver direction. Equivalently one can use the physical vector formula for each receiver separately; its direction reversal must be retained when forming their sum and difference.

At $W=0$, direct expansion of the exact affine relative row gives

$$
 A_r=-\frac{2K}{d^2}\left[
 (g_U+u/2)N-\frac12(1+u/(2g_U))U_\perp\right],
 \qquad g_U=(1-|U_\perp|^2/4)^{1/2}.
$$

Its terms linear in $U$ cancel the explicit $K(u^2-|U_\perp|^2)/d^2$ in (1). This cancellation is necessary for a uniform slow-tube sign: a generic norm estimate of the affine relative row loses it. At $U=0$ and arbitrary small $W$, the affine rows give

$$
 A_r=-\frac{2K}{d^2}(gN-ab/g),\qquad
 A_c=\frac K{d^2}(aN-b),
$$

so (1) becomes $2K^2(1-2|b|^2)/(gd^3)>0$ for sufficiently small center speed.

For small nonzero $U$, the remaining affine terms must be organized using $|U_\perp|^2d/K\le L$. Their relative size is then of the form $O((1+L)\beta+\beta^2)$, rather than an uncontrolled $O(\beta^3d/K)$. Pure radial powers cancel more strongly; treating all components of $U$ as one norm obscures the useful bound.

## Actual clocks and the sign burden

The current-affine comparison is a local Taylor comparison of the original source segment, not a replacement source or coupled affine solution. Its error requires an acceleration bound on each complete sampled interval, and both source roots must remain ordinary. With range comparable to $d$ and source acceleration bounded by $C_AK/d^2$, integrated position and velocity defects imply per-row error $O(C_AK^2/d^3)$ under the strict speed margin. In (1) this costs at most $O(C_A(\beta+K/d)K^2/d^3)$. A proposed positive constant must combine these errors with the exact anisotropic affine cancellations, and must verify supplied-source coverage separately.

Thus a strict positive inequality is structurally plausible on a sufficiently small tube with bounded $L$, but this blind reference does not certify a numerical coefficient at $\beta=K/d=1/100$, $L=8$. Its exact derivative, cancellation requirements and first missing quantitative bound are explicit. Even a proved positive $J'$ would not by itself show that the unchanged actual source enters or remains in that tube, nor that it reaches a positive terminal-speed branch.

Falsifiers are a sign error under receiver reversal, omission of $g'$, a norm bound that destroys the radial cancellation, or an acceleration estimate applied outside its covered source windows. No subject or numerical target was used.
