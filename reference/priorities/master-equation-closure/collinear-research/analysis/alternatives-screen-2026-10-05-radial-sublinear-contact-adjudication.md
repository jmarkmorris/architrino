# Assessment of subfield contact for the sublinear radial family

**Accepted derived result:** for each fixed $0<p<1$, the explicit complete compatible held-and-ramped mirror family in the [independent source](alternatives-screen-2026-10-05-radial-sublinear-contact-independent.md) reaches finite contact with strictly subfield speed and a positive transmitter margin. A sufficient physical half-separation is

$$
0<a\le\frac12\left(\frac{1-p}{64}\right)^{1/(1-p)}.
$$

The concrete selection $p=1/2$, $a=2^{-16}$, $d=2^{-20}$ satisfies this inequality. Coupling, range normalization and wake speed are all one. This is an incoming evolved-fate theorem ending at coincidence; it supplies no outgoing collision rule.

The coordinator constructed and froze the [separate contact reference](alternatives-screen-2026-10-05-radial-sublinear-contact-coordinator-reference.md), SHA-256 `89aa56b8d28812f14a811b8d4bbfc997daf8516fc2b056a74172904a2cf23dcc`, before reading the full independent source, SHA-256 `dfdb846843296e36eb8c5476cd424e044bc4406d088dd036ceb509390005159f`. The full coordinator derivation preceded the worker's short contact outline. Its more conservative denominator 256 gives speed at most $1/8$; inspection of the worker's identical complete-root inequality validates denominator 64 and speed at most $1/4$. The different constants are sufficient bounds, not conflicting terminal predictions.

## Compatibility, roots and first endpoint

Set $d=a/16$, hold $x=a$ for every $S\le-d$, and on the patch put $v=Adq^2(1-q)$, $q=(S+d)/d$. The unique positive $A$ solves $A=(2a+Ad^2/12)^{-p}$. The patch has zero old-end velocity and acceleration, and at release $x_0=a+Ad^2/12$, $v=0$, $v'=-A$. The partner source $S_0=-(x_0+a)<-d$ lies in the held tail and gives exactly that acceleration. This reconstructs compatibility without requiring the supplied past to solve the future equation.

For every separated complete strict-subfield segment, $R=x(T)+x(S)=T-S$, $D=1+v(S)>0$ and $v'=-1/(R^pD)$. The root residual increases strictly from a negative value at zero delay to positive infinity in the old held tail. There is exactly one partner root; complete strict chord length excludes positive-delay self roots.

Under a provisional complete speed bound $1/2$, the range lies between $4x/3$ and $4x$, while $D$ lies between $1/2$ and $3/2$. Hence, for $w=-v$ and $c_p=2/(3\,4^p)$,

$$
c_px^{-p}\le w'\le2x^{-p},\qquad
\frac{2c_p}{1-p}(x_0^{1-p}-x^{1-p})
\le w^2\le\frac4{1-p}(x_0^{1-p}-x^{1-p}).
$$

These bounds come from the actual chain rule $d(w^2)/dx=-2w'$, not a conserved instantaneous energy. The selected size forces $w<1/4$, closing the speed bootstrap and giving $D\ge3/4$. A finite endpoint at positive radius has strict ordinary continuation margins. Since $w'\ge c_px_0^{-p}>0$, the solution cannot persist at positive radius forever. Its first endpoint is therefore finite contact, with $x\to0$ and $w\to w_*>0$. Both proofs retain the old ramp and held tail in their range bounds.

## Exact incoming coefficient and the exponent boundary

With $\delta=T_*-T$, monotone finite speed gives $x\sim w_*\delta$. The complete range relation then yields

$$
R\sim\frac{2w_*}{1-w_*}\delta,\qquad
T_*-S\sim\frac{1+w_*}{1-w_*}\delta,\qquad D\to1-w_*.
$$

The acceleration is $Q\sim C_*\delta^{-p}$ with $C_*=2^{-p}(1-w_*)^{p-1}w_*^{-p}$. Two integrations of controlled asymptotic bounds give

$$
v=-w_*+\frac{C_*}{1-p}\delta^{1-p}+o(\delta^{1-p}),\qquad
x=w_*\delta-\frac{C_*}{(1-p)(2-p)}\delta^{2-p}+o(\delta^{2-p}).
$$

Both references independently retain the nonzero delayed source velocity in this coefficient. The acceleration diverges but is integrable; the position has a $C^1$ incoming endpoint and the velocity is absolutely continuous. The ordinary positive-range equation provides no $C^2$ continuation at contact. A weaker continuation or selection is a separate unproved problem.

Both derivations also obtain the fixed-$p$ small-$a$ family limits

$$
w_*\sim\sqrt{\frac{2^{1-p}}{1-p}}a^{(1-p)/2},\qquad
T_*\sim\sqrt{\frac{1-p}{2^{1-p}}}a^{(p+1)/2}
\int_0^1\frac{dy}{\sqrt{1-y^{1-p}}}.
$$

Uniform relative bounds on the entire incoming acceleration justify the time integral even at its integrable release-end singularity. No actual remainder is differentiated. For the same compatible preparation formula at $p=1$, the source-clock impulse instead diverges at hypothetical contact. That excludes contact before unit speed and forces a finite inward unit event at positive separation. The comparison identifies an exponent boundary for this incoming mechanism, without supplying a post-unit obstruction for the outward-ramped past.

The claim is preparation-scoped, not a classification of all sublinear histories or a binary result. Falsifiers are failures of the patch fixed point, release source placement, complete-root census, integrated speed bound, positive-radius continuation, contact source ratio or either asymptotic integration. No numerical trajectory was required. Formatting checks remain separate from the mathematical assessment.
