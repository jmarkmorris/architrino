# Signed delayed transport and the finite-history error obligation

## Purpose and claim boundary

The original eight-member seed-1 release needs a finite-history certificate before its checked tail neighborhood implies complete separation. The preceding comparison takes norms of each delayed source block. That guarantees positivity of its envelope, but destroys cancellation between correlated errors in different members. This note retains the signed delayed operator and states precisely what additional bound would turn its favorable numerical behavior into a certificate. All numerical units have $K=c_f=c_a=1$, and the original inclusive post-summation ceiling law, partner weights, zero self acceleration, literal histories and kick remain unchanged.

The formulas below are derived on their stated smooth interior domains and remain pending independent review. They concern error transport about a time-dependent approximate reference with nonzero residual, not stability of an assembly. A sampled signed correction is neither an enclosure nor a bound on its nonlinear remainder.

## Linear transport on a smooth strict-interior chart

Let $\mathbf x_i$ be a $C^1$, piecewise $C^2$ reference with $|\dot{\mathbf x}_i|<1$, complete negative history, and admitted ordinary partner roots $s_{ij}(t)$. On a chart avoiding the source-zero jump, put $\mathbf w_i=\dot{\mathbf x}_i$ and $\boldsymbol\rho_i=\ddot{\mathbf x}_i-\mathbf a_i[\mathbf x]$. Let $B_{ij},C_{ij}$ be the reference receiver-translation and source-velocity derivatives in the [reviewed geometry comparison](overnight-d-finite-geometry-enclosure.md). The nominal signed operator on errors $q_i=(\mathbf u_i,\mathbf v_i)$ is

$$
(\mathcal Lq)_i(t)=\left(\mathbf v_i(t),\ \sum_{j\ne i}\{B_{ij}(t)[\mathbf u_i(t)-\mathbf u_j(s_{ij}(t))]+C_{ij}(t)\mathbf v_j(s_{ij}(t))\}\right).
$$

Thus $\dot q=\mathcal Lq-(0,\boldsymbol\rho)$ is the first variation forced by the signed reference residual. Every delayed vector retains its sign until it contributes to the complete current vector. The current receiver matrix and delayed source matrices must both retain their correlations. Replacing delayed vectors by independent norm radii recovers the earlier conservative comparison and forfeits this property.

The actual source time $S_{ij}$ generally differs from $s_{ij}$. Therefore this nominal linear equation is not the exact error equation. On a smooth homotopy with root factor at least $\gamma_*>0$ and receiver translation bounded by $P$, implicit differentiation gives $|S_{ij}-s_{ij}|\le P/\gamma_*$. The exact remainder includes variation of the row derivative along the homotopy, and the terms

$$
-B_{ij}[\mathbf e_j^x(S_{ij})-\mathbf e_j^x(s_{ij})]
+C_{ij}[\mathbf e_j^v(S_{ij})-\mathbf e_j^v(s_{ij})].
$$

These terms cannot be dropped merely because the position error is small. For any absolutely continuous error component $e$ on the joining interval,

$$
|e(S)-e(s)|\le\operatorname*{ess\,sup}_{u\in[s,S]}|\dot e(u)|\,|S-s|.
$$

The interval between $s$ and $S$ is understood without orientation. An initialization trace jump requires its additional jump allowance. A quadratic remainder therefore requires derivative bounds as well as small position/velocity amplitudes. Continuity alone does not make delayed evaluation quadratically close. This is a concrete certification obligation for the signed method.

## First-order source-front timing

Consider one isolated source-zero reception at $t_*$ on a strict-interior reference. Put $\mathbf b_j=\mathbf x_j(0)$ and $\mathbf n=(\mathbf x_i(t_*)-\mathbf b_j)/t_*$. Let the reference receiver factor $\kappa=1-\mathbf n\cdot\dot{\mathbf x}_i(t_*)$ be positive. Under a differentiable variation of the receiver and source birth positions, differentiating $h(t)=t-|\mathbf x_i(t)-\mathbf b_j|=0$ gives

$$
\delta t_* = \frac{\mathbf n\cdot[\mathbf u_i(t_*)-\mathbf u_j(0)]}{\kappa}.
$$

If the ordinary total acceleration changes by the channel jump $\Delta\mathbf a_{ij}=\mathbf a^+_{ij}-\mathbf a^-_{ij}$ there, its first-order integrated velocity correction is

$$
\mathbf v_i(t_*+)-\mathbf v_i(t_*-)=-\Delta\mathbf a_{ij}\,\delta t_*.
$$

A later positive acceleration jump removes the jump height times the delay from the velocity, fixing the minus sign. The position correction is continuous. This discontinuity belongs to the derivative of a family with moving acceleration jumps: each individual physical velocity is continuous. Consequently it is inappropriate to substitute the discontinuous first variation directly as a finite-error reference velocity or to claim uniform convergence of the difference quotient through a moving event. A finite-error certificate must retain a continuous event-aligned reference or bound the event slab and every possible injection time. The earlier nonlinear two-crossing homotopy budget remains necessary when using that earlier finite-difference construction; the first variation does not supersede it.

The ordinary row jump itself is the previously checked expression

$$
\Delta\mathbf a_{ij}=\frac{\sigma_{ij}\mathbf n}{t_*^2}\frac{\mathbf n\cdot(\dot{\mathbf x}_j(0+)-\dot{\mathbf x}_j(0-))}{D_t^+D_t^-}.
$$

Multiple fronts require a separately valid joint event treatment. This note does not infer fixed event ordering from the nominal sequence or from overlapping interval brackets.

## A conditional resolvent certificate

On a smooth admitted prefix $[0,b]$, integrate the signed linear equation and absorb its fixed prescribed-history contribution into $g_b$. Write its causal linear integral operator as $K_b$ and its inverse as $R_b=(I-K_b)^{-1}$. For bounded coefficients and strictly positive delays on a compact chart, the ordinary method of steps constructs this inverse. Let the exact error satisfy

$$
e_b=g_b+K_be_b+N_b(e_b),\qquad z_b=R_bg_b.
$$

Here $N_b$ includes all nonlinear source-time and coefficient changes and any independently bounded residual-representation error. Choose compatible prefix norms and certify, for every $b\le T$, the uniform bounds

$$
\|z_b\|\le a,\quad \|R_b\|\le G,\quad
\|N_b(e_b)\|\le C\|e_b\|^2+\varepsilon
\quad\text{whenever }\|e_b\|\le r.
$$

If initialization and a local solution are admitted and

$$
a+G(Cr^2+\varepsilon)<r,
$$

then no first exit from the radius-$r$ region occurs on this chart: at a first exit the exact identity gives $\|e_b\|\le a+G(Cr^2+\varepsilon)<r$, a contradiction. This is an a posteriori error criterion conditional on the stated operator and remainder bounds, not a claim that they have been obtained for the selected release. Root completeness, positive ordinary margins, strict-interior feasibility and continuation remain simultaneous bootstrap conditions. A prefix norm containing derivative seminorms also needs continuity of its first-exit functional or a separately justified continuation argument; the elementary first-exit statement directly applies to continuous weighted supremum norms.

In particular, calculating only $z$ for the actual signed residual does not bound $G$. A cancellation in one forcing vector can coexist with strong amplification of a different error direction. An independently bounded family of impulse responses, a verified operator approximation with controlled remainder, or another rigorous inverse estimate is required. Nor may the quadratic estimate be asserted from formal linearization on a continuous-history space. The source-time derivative bounds above explain what must make that estimate true.

## Falsifiers and current use

The source-front formula fails if a differentiable isolated transverse event family violates the derived displacement or integrated jump sign. The resolvent implication fails if the exact prefix identity, all uniform bounds, first-exit continuity and local continuation hypotheses hold while a solution crosses the certified radius. A failed nominal screen, a large unvalidated inverse estimate, or a remainder not yet bounded establishes neither failure of the physical release nor impossibility of certification.

The [signed pilot](overnight2-d-coupled-variation.py) measures the nominal forced correction and records its root/speed samples only. Its local controls are independent analytic examples, but its target uses inherited history and derivative code, so it is not an independent target proof. The [current research account](overnight2-d-followup-and-research-2026-10-07.md) owns results, resources, remaining work and the unchanged twelve-hour deadline.
