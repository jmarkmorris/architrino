# Transverse transformed error for the same Maxwell E history

**Status: ◐ Derived subject candidate, not independently assessed in this investigation and not implemented.** This is a same-history mathematical error representation for the exact Package A case fixed in the [joint-phase theorem](authorized-cases-ten-hour-a-joint-phase-theorem.md). It uses the transverse option in Section 2 of the older, frozen [independent neutral-history reference](maxwell-e-first-event-final-neutral-hale-reference.md). No new equation or preparation is selected. The current joint-phase target remains the primary subject; this note supplies a possible stronger method if the small measured gain is insufficient for physical continuation.

## Why a second representation can matter

The existing unscaled transformed velocity retains a delayed-acceleration term multiplied by a receiving-ray projection. Its error recurrence must therefore repeatedly transport physical source-acceleration uncertainty. An exact receiver-dependent transverse correction cancels that term from the transformed right-hand side. It can also avoid adding the radial $1/R$ correction to the initial physical-velocity error. These algebraic differences suggest a better conditioned comparison, but no target evidence here establishes an improvement. The original delayed source acceleration is still needed to reconstruct physical acceleration and to establish classical compatibility.

## Exact physical and transformed equations

Use the positive mirror member $x(t)$, receiving velocity $u=x'(t)$, source-member velocity $v=x'(s)$ and source-member acceleration $a=x''(s)$ at the unique partner emission $s<t$. The actual negative-label source has velocity $-v$ and acceleration $-a$. Set $R=t-s=|x(t)+x(s)|$, $n=(x(t)+x(s))/R$, $D=1+n\cdot v$, $w=1-n\cdot u$, and $P=I-nn^{\mathsf T}$. On the admitted incoming chart $R,D,w>0$, the original opposite-polarity E equation is

$$
u'=-C+B a,\qquad C=\frac{(1-|v|^2)(n+v)}{R^2D^3},\qquad B=\frac{(n+v)n^{\mathsf T}-DI}{RD^3}.
$$

The matrix $B$ is transverse: $n^{\mathsf T}B=0$. Therefore $n\cdot u'=-h$, where $h=(1-|v|^2)/(R^2D^2)$. Differentiating the causal-root equation gives $s'=w/D$, $R'=1-w/D$ and $n'=P(u+v w/D)/R$. These are consequences of the chosen equation and its geometry, without an additional physical premise.

Define the transverse correction $q$ and transformed velocity $p$ by

$$
q=\frac{Pv}{RDw},\qquad p=u+q.
$$

Since $n\cdot q=0$, the denominator is also $w=1-n\cdot p$. Thus the inverse velocity map is explicit:

$$
u=\mathcal U(x,p;\text{history})=p-\frac{Pv}{RD(1-n\cdot p)}.
$$

The source root is independent of both receiving velocity coordinates. At fixed $R,n,u$, the partial derivatives are $q_v=-DB/w$, $q_u=q n^{\mathsf T}/w$, and $q_R=-q/R$. For a direction $\eta$ of $n$ at fixed $R,v,u$,

$$
q_n\eta=\frac{-(n\cdot v)\eta-n(v\cdot\eta)}{RDw}-\frac{q(v\cdot\eta)}D+\frac{q(u\cdot\eta)}w.
$$

Applying the full chain rule, including the receiver-dependent term $q_u u'$, yields

$$
p'=\mathcal H:=-C-\frac{q h}{w}+q_n n'-\frac{qR'}R.
$$

The cancellation is exact: $Ba+q_v a s'=Ba-Ba=0$, and $q_uBa=0$ by transversality. The equation for $(x,p)$ therefore evaluates delayed source position and velocity but no delayed source acceleration. Conversely $(I+q_u)^{-1}=I-q_u$, because $n\cdot q=0$ makes $q_u^2=0$. Differentiating the inverse relation for a transformed solution with a $C^2$ delayed history recovers the displayed original E equation including $Ba$. Neither the source acceleration nor its uncertainty is set to zero.

## Comparison residual and required chart

Let a prescribed comparison have original E residual $d=u_c'-[-C_c+B_c a_c]$. The same chain rule gives its transformed residual

$$
d_p=(I+q_{u,c})d.
$$

This differs from the unscaled transformation's unchanged residual. Reusing the old residual magnitude without the multiplier is invalid. A sufficient norm bound is $(1+|q_c|/w_c)|d|$, evaluated on complete comparison/root cells. A directional residual enclosure could be sharper but is not assumed here.

The inverse map and transformed right-hand side are smooth rational functions of their chart variables when $R,D,w$ are bounded away from zero. To compare actual and prescribed sources, freeze the actual source-position offset at its actual root, replace actual source velocity by prescribed velocity there, and vary the receiving position through the complete translated nominal-root family. This is the same geometric composition as the admitted source-support split, now applied to $\mathcal U$ and $\mathcal H$. Its spatial derivative along the nominal clock uses prescribed source acceleration through $v_c'(s)$. It does not use prescribed jerk because neither transformed field contains source acceleration. Fixed-root source-velocity derivatives need only the complete velocity-offset family. Every intermediate inverse-map $w$ remains a separate required positive chart margin; a sampled receiving speed does not establish it.

## Intrinsic joint error system

Align actual and comparison receiving radial rays exactly as in the admitted intrinsic comparison. Write $\rho=r_a-r_c$, $z=p_a-p_c$ for intrinsic transformed-velocity difference, and $J=\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ for clockwise rotation of intrinsic components. Suppose whole mean-value families supply a two-component column $L_x$, a $2\times2$ matrix $L_p$, another column $H_x$, another matrix $H_p$, and complete source errors $f_U,f_H$ such that

$$
\delta u=L_x\rho+L_p z+f_U,\qquad \delta\mathcal H=H_x\rho+H_pz+f_H.
$$

Here the first decomposition is of the exact inverse velocity map, while the second is of the acceleration-free transformed right-hand side. The $f_H$ term includes the transformed comparison residual above. Distinct averaged coefficients may occur in these decompositions, so a certificate must enclose their independent combinations. Neither matrix may be replaced by its nominal-point value.

The signed current system is

$$
\begin{pmatrix}\rho\\z\end{pmatrix}'=
\begin{pmatrix}
e_r^{\mathsf T}L_x&e_r^{\mathsf T}L_p\\
H_x+(Jp_c)(e_t^{\mathsf T}L_x/r_a-u_{c,t}/(r_ar_c))&H_p+(Jp_c)e_t^{\mathsf T}L_p/r_a+\omega_aJ
\end{pmatrix}
\begin{pmatrix}\rho\\z\end{pmatrix}
+\begin{pmatrix}f_{U,r}\\f_H+(Jp_c)f_{U,t}/r_a\end{pmatrix}.
$$

The first row is the radial kinematic identity $\rho'=\delta u_r$. The lower rows follow by subtracting intrinsic p equations and using $\omega_a-\omega_c=\delta u_t/r_a-u_{c,t}\rho/(r_ar_c)$. This accounts for the rotating-frame derivative without differentiating a rotating surrogate as physical history. A metric $y=(\nu\rho,z_r,z_t)$ with equal p-component weights cancels the current $\omega_aJ$ from its symmetric part exactly. The same rational symmetric-matrix certificate and scalar propagation theorem can then be used with newly derived coefficient families and forcing bounds.

The physical velocity error must be reconstructed from $\mathcal U$, not identified with $|z|$. The original E formula must reconstruct the acceleration error, retaining all delayed physical source-A bounds. Complete physical X/V/A inventories, source-to-receiver phase integrals, compatibility at old and evolved seams, and the incoming root census remain necessary for every step and any first-event claim.

## Present obstruction and admissible next step

This derivation supplies no numerical coefficient bound, source replacement estimate, transformed initialization, complete $w$ chart, residual multiplier enclosure or target receiving certificate. Those are the exact outstanding inequalities. The old $p=u+q_{\rm unscaled}$ endpoint cannot be reused as this new $p$ without a proved coordinate transfer. A valid transfer would bound the difference of the two exact corrections over the same actual and prescribed receiving/source families, or initialize from independently admitted physical X/V bounds and the complete new correction error. It may not reset the physical state or its past.

Stationary source velocity gives $q=0$ and reduces the transformed motion to $p=u$, $p'=-n/R^2$; this is an exact analytical control. A transverse rational accelerated-source tuple must separately check the cancellation and reconstruction. An arbitrary comparison with nonzero original residual must verify the multiplier $(I+q_u)$, and a rotating-axis control must retain the displayed intrinsic terms. These controls must precede any new instrument's target. Falsifiers include a lost mirror sign, omitted $q_u u'$ term, nonpositive intermediate $w$, unchanged-residual reuse, incomplete source-root support or an unproved coordinate transfer. No physical event, new actual interval or performance advantage is asserted.
