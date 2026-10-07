# A lower-radius exclusion from reciprocal-ellipse membership

## Proposed continuous strip

**Derived result pending independent reconstruction.** In the fixed coefficient-one logarithmic circular class with $K_{\log}=c_f=1$, radii $r_1=r_2=1$, $b=r_3$, positive phases $0,-\beta,\chi$ and the unchanged complete histories, consider

$$
\sqrt3\le b\le\frac74,\qquad
0\le v=\omega\le\frac1{10000},\qquad
\left|\beta-\frac\pi2\right|\le\frac1{1000},\qquad\chi\in\mathbb T.
$$

Every configuration in this continuous strip has first-inner-receiver vector residual norm greater than $177/160000$, hence some scalar radial or tangential residual greater in magnitude than $177/240000$. It cannot satisfy exact full balance. This is a lower-radius strip with $b<2$, distinct from the earlier $b\ge2$ low-speed exclusions. All thirty partner roots and no positive self roots occur, since all distinct circular members have speeds strictly below one. No new coupling, response factor, trajectory, phase grid or numerical target is used.

## Static required response lies away from the outer-pair curve

Write complex radial-plus-$i$-tangential response and put

$$
u=\frac{b^2-1}{2b},\qquad w=\frac{b^2+1}{2b},\qquad
J(z)=|z|^4-\frac{(\operatorname{Re}z)^2}{u^2}-\frac{(\operatorname{Im}z)^2}{w^2}.
$$

The [checked reciprocal ellipse](overnight2-c-linked-response-independent-review.md) implies $J(G_b^{(0)}(s))=0$ at every static outer-pair phase. At zero rate, the required inner response is

$$
W_0=\frac12-i\csc\beta.
$$

Indeed $R_0=1$, $P_0=0$, $B_0(\pi)=0$ and $Q_0(\beta)=\cot(\beta/2)+\tan(\beta/2)=2\csc\beta$ in the complete linked equations. Since $b\ge\sqrt3$, $u^{-2}\le3$ and $w^{-2}\le3/4$. With $t=\csc^2\beta\ge1$,

$$
J(W_0)\ge\left(\frac14+t\right)^2-\frac34-\frac34t\ge\frac1{16}.
$$

The last polynomial increases for $t\ge1$, as its derivative is $2t-1/4>0$. Also $\sin\beta\ge1-1/2000000>1000/1001$, so

$$
|W_0|^2\le\frac14+\left(\frac{1001}{1000}\right)^2
=\frac{1252001}{1000000}<\frac{81}{64},\qquad |W_0|<\frac98.
$$

For $|z|\le5/4$, the real gradient obeys

$$
|\nabla J(z)|\le4|z|^3+6|z|\le\frac{245}{16}<16.
$$

Let $G=G_b^{(0)}(s)$. If $|G-W_0|\le1/8$, the segment between them lies in $|z|\le5/4$. The gradient bound and $J(G)=0$ give $|G-W_0|>1/256$. If $|G-W_0|>1/8$, that conclusion already holds. Thus the static required response is more than $1/256$ away from the entire static pair curve, uniformly in the declared radius and phase band.

## Bound the complete inner requirement at positive rate

The complete circle chart is $\alpha-2v\sin(\alpha/2)=\gamma$, $D=1-v\cos(\alpha/2)$, $R=1/D$ and $B=\cot(\alpha/2)/D$. For this estimate it suffices to use the larger range $0\le v\le1/8$. The relevant channels are $\gamma=\pi,\beta,\beta+\pi$, with $|\beta-\pi/2|\le1/1000$. Their half-angles lie between $\pi/4-1/2000$ and $3\pi/4+1/2000+1/8$. By the unit Lipschitz bound on sine and $1/\sqrt2>7/10$, every such half-angle has sine greater than $1/2$. Hence $|\cot(\alpha/2)|\le2$ and $D\ge7/8$.

Writing $x=\alpha/2$, differentiation at fixed $\gamma$ gives

$$
x_v=\frac{\sin x}{D},\qquad
D_v=-\cos x+v\sin x\,x_v.
$$

Consequently $|x_v|\le8/7$, $|D_v|\le8/7$, and

$$
|R_v|\le\frac{512}{343}<\frac32,\qquad
|B_v|\le\frac{256}{49}+\frac{1024}{343}
=\frac{2816}{343}<9.
$$

The required first-inner response is

$$
W(v)= -v^2+\frac{R_v(\pi)-P_v(\beta)}2
+\frac i2\left[B_v(\pi)-Q_v(\beta)\right],
$$

where subscripts on $R_v,B_v,P_v,Q_v$ here denote the rate parameter, while the preceding derivative estimates mean differentiation with respect to it. Since $P_v(\beta)=R_v(\beta)-R_v(\beta+\pi)$ and similarly for $Q_v$, the radial derivative magnitude is at most $2v+9/4\le5/2$, and the tangential derivative magnitude is at most $27/2$. The sum bounds the complex norm, so

$$
|W(v)-W_0|\le16v.
$$

This retains all three inner-source rows, including the own antipode and the required circular acceleration. It does not assume equilibrium along a comparison path.

## Restore the actual delayed outer pair

The [independently checked shifted comparison](overnight2-c-centered-response-independent-review.md) gives

$$
|G_{1,b}(\chi;v)-G_b^{(0)}(\chi-vb)|\le
\frac{2v(2b-1)}{(b-1)^2(1-v)}=E.
$$

Because $b\ge\sqrt3>17/10$, $b\le7/4$ and $v\le1/8$,

$$
E\le\frac{4000}{343}v<12v\quad(v>0),\qquad E=0\quad(v=0).
$$

Combining the three distances, the complete first-inner residual satisfies

$$
|G_{1,b}(\chi;v)-W(v)|>
\frac1{256}-28v
\ge\frac1{256}-\frac7{2500}
=\frac{177}{160000}>0.
$$

For a two-component vector, the largest absolute component is at least its norm divided by $\sqrt2$. Since $\sqrt2<3/2$, some component exceeds $177/240000$. Every outer phase is included through the whole static-curve distance bound; the negative receivers follow by antipodal symmetry. One nonzero required residual excludes full balance regardless of the remaining equations.

## Controls, limitations and falsifiers

At $b=\sqrt3$, $\beta=\pi/2$, $v=0$, direct substitution gives $W_0=1/2-i$ and $J(W_0)=1/16$. The static source axes satisfy $J(-1/u)=J(-i/w)=0$. The rate and delayed-comparison errors vanish at zero rate. These are exact hand controls. No computational instrument or target ran.

The result is a continuous exclusion only on the displayed closed radius/rate/phase strip. It does not decide other lower-radius phases, larger rates, the general unequal-radius interior, superfield configurations, stability or actual-time fate. The [phase-eliminated formulation](overnight2-c-phase-eliminated-response.md) motivated retaining ellipse membership, but this proof derives that membership and its distance consequence directly from the already checked static ellipse. A failed static margin, half-angle range, rate derivative, complete-root census or delayed error would invalidate the proof; an exact configuration in the declared strip would falsify its conclusion. Independent reconstruction is required before acceptance.
