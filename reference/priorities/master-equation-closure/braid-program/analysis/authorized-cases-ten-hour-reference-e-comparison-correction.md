# Correction of the weighted comparison and a higher-jet control

**Derived correction, identified by the E subject worker before any target.** The frozen [independent method](authorized-cases-ten-hour-reference-e-method.md), SHA-256 `b0e4c653975cb7add7cb4fbd26792acf87f7e55e47626029b214632bd773aede`, contains an algebraic error in the coefficient for $w=e_x+ce_v$. From $e_a\le\rho+L_xe_x+L_ve_v+f_p$, direct differentiation gives

$$
w'\le cL_xe_x+(1+cL_v)e_v+c(\rho+f_p)
\le\lambda w+c(\rho+f_p),
\qquad \lambda=\max\{cL_x,1/c+L_v\}.
$$

The frozen text's $1/c+cL_v$ must be replaced by $1/c+L_v$. The original expression is not generally sufficient when $c<1$. The [method assessment](authorized-cases-ten-hour-reference-e-method-adjudication.md) is read with this explicit correction. Its method-only admission remains valid with the corrected recurrence; no numerical output used the erroneous expression. The subject worker supplied the correction, so this is a checked repair rather than independent discovery.

## Independent nonzero-acceleration jet control

For a known local response control, choose $R=2$, $a=1/20$ and source $X_s(s)=(0,as^2/2,0)$ near $s=0$. Set the receiver test path $X_r(T)=(R,a(T-R)^2/2,0)$ and its actual derivative $u=(0,a(T-R),0)$. Let $\tau=T-R$. The clock is exactly $S=T-R=\tau$, with $n=e_1$, $D=1$, sampled velocity $a\tau e_2$ and nonzero acceleration $ae_2$. Direct substitution into the unchanged unsigned full row yields

$$
F_x=\frac{(1-a^2\tau^2)^2}{R^2}-\frac{a^2\tau}{R},
\qquad
F_y=-\frac{a\tau(1-a^2\tau^2)}{R^2}-\frac aR,
\qquad F_z=0.
$$

Thus a reception jet through order four has an exact rational polynomial reference, and all derivatives above order four vanish. Both the delayed acceleration and receiver term are active. The E-only components are $(1-a^2\tau^2)/R^2$ and the same displayed $F_y$; their difference from the full row checks the receiver factor independently.

The quadratic is needed only on the sampled interval. For a complete strict-speed control, extend its scalar velocity $as$ smoothly outside $[-1,1]$ to a bounded function of magnitude at most $1/5$, and integrate from zero. The chosen receiver path on $|\tau|<1/2$ then samples only the exact quadratic region. Complete strict speed and positive transverse separation make this the unique partner root; no positive-delay self root occurs for a complete strict-speed extension of the receiver either. This is a prescribed mathematical response control, not a coupled physical solution or a replacement of the selected four-member history.

No target computation is associated with this note. An implementation failing these exact polynomial coefficients fails its jet control; an implementation pass alone does not certify the selected trajectory.
