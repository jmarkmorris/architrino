# A zero-height criterion for arbitrary periodic axial profiles

## Domain and pending numerical dependency

Claim grade: derived conditional extension, pending independent reconstruction of its numerical premise. Consider complete canonical six-member histories
$$
X_j(t)=R\bigl(\cos[\beta t/R+j\pi/3],\sin[\beta t/R+j\pi/3],(-1)^j z(t/R)\bigr),
$$
with $R>0$, $\beta\in[19/100,21/100]$, and a real $C^2$ periodic profile $z(\tau)$, where $\tau=t/R$. Derivatives below are with respect to $\tau$, so $|z'|$ is the actual axial-speed bound. Assume
$$
|z|\le1/10,\qquad |z'|\le19/20,\qquad |zz'|\le19/400.
$$
The proposed conclusion is that no such complete history satisfies exact canonical balance for any $R>0$. This includes the identically zero height and arbitrary nonzero profiles, without an assumed reflection symmetry, Fourier cutoff or frequency bound.

The required numerical premise is the comparison-root torque enclosure developed in [the cosine small-height subject](overnight2-b-cosine-small-height.md). That subject has not yet received independent numerical acceptance. This document proves why the very same enclosed algebra applies to a larger waveform class; it does not turn the pending numerical premise into accepted evidence.

In particular, the simpler norms
$$
|z|\le1/20,\qquad |z'|\le19/20
$$
imply all three displayed bounds. Thus a successful independent enclosure would exclude every periodic height with amplitude at most $1/20$ and that speed ceiling, at every temporal frequency. The earlier accepted thin-height theorem covered amplitude $1/50$ pointwise at all receptions. The present argument uses a necessary zero reception and a larger allowed amplitude.

## Why an exact periodic profile has a zero

The complete speed is below $49/50<1$. The monotone-gap argument gives exactly five ordinary partner roots, no positive self root, and source divisors bounded away from zero. Every row weight
$$
w_j(\tau)=\frac1{\Delta_j(\tau)^3D_{s,j}(\tau)}
$$
is positive and uniformly bounded because the equal-time planar partner chord is nonzero, $\Delta_j$ is bounded below by that chord divided by $1+49/50$, and $D_s>1/50$.

Suppose an exact profile never vanishes. By continuity it has one sign; change the global axial orientation if needed so $z>0$. Periodicity gives a global minimum $m>0$ at $\tau_0$. At that reception, each same-polarity row has numerator $z(\tau_0)-z(\tau_0-\Delta_j)\le0$, while every opposite-polarity row has numerator $-z(\tau_0)-z(\tau_0-\Delta_j)\le-2m<0$. There are three opposite-polarity partners. Thus the complete axial acceleration is strictly negative.

Exact balance is $A_z=Rz''$, since the phase rate is already absorbed into the arbitrary profile's time argument. But a $C^2$ minimum has $z''(\tau_0)\ge0$, a contradiction. Therefore every exact periodic profile has at least one zero. The identically zero profile already supplies such a reception, so no separate sign-change theorem or zero-propagation argument is necessary for the present exclusion.

This proof only needs a zero, not that every nonzero exact profile changes sign. A profile that touches zero without changing sign is covered by the next step as well.

## The same canonical enclosure at any zero

At any reception $\tau_0$ with $z(\tau_0)=0$, put $\alpha_j=j\pi/3-\beta\Delta_j$. The distance and the source axial projection satisfy
$$
\Delta_j^2=4\sin^2(\alpha_j/2)+z(\tau_0-\Delta_j)^2,
$$
$$
Q_{j,z}V_{s,j,z}=-z(\tau_0-\Delta_j)z'(\tau_0-\Delta_j).
$$
The parity factors cancel in the second product. Consequently
$$
q_0(d)\le q(d)\le\sqrt{4\sin^2[(j\pi/3-\beta d)/2]+(1/10)^2},
\qquad |Q_zV_{s,z}|\le19/400.
$$
These are exactly the comparison-distance and source-product ranges enclosed by the small-height cosine target: its ceiling $H=1/10$ and speed ceiling $v=19/20$ give $Hv/2=19/400$. The comparison bounds therefore contain the full arbitrary-profile geometry at this zero, even though the profile need not be sinusoidal.

The actual source divisor remains
$$
D_{s,j}=1+\frac{\beta\sin\alpha_j}{\Delta_j}-\frac{Q_zV_{s,z}}{\Delta_j},
$$
and the tangential row remains $-\sigma_j\sin\alpha_j/(\Delta_j^3D_{s,j})$. No sign of the source product is prescribed; its entire symmetric range is enclosed. The comparison-root ordering is independent of the waveform derivative, and the complete speed bound guarantees the actual chart.

If the pending independent enclosure confirms $A_t>1/10$ throughout these ranges, then the actual acceleration at every zero has the same strict sign. Constant unit radius and constant planar rate prescribe tangential acceleration identically zero. This contradicts exact balance at the necessary zero reception, proving the conditional claim for every periodic profile in the displayed class.

## Boundaries and falsifiers

The product ceiling is a substantive condition, not an automatic consequence of the larger height and speed bounds separately. It is automatic for amplitude at most $1/20$, or for cosine profiles because their height and derivative attain their extrema at different phases. A general profile with amplitude $1/10$ and speed $19/20$ may violate the product ceiling and lies outside the theorem.

The constant-radius and constant-planar-rate assumptions are essential for zero prescribed tangential acceleration. A variable radius or phase correction can supply a nonzero tangential demand and is not excluded by this argument. Complete periodicity supplies the global minimum for the no-zero case; an unbounded or nonperiodic profile needs separate analysis.

A missed root, wrong source-product sign or ceiling, an exact positive periodic height at its minimum with nonnegative canonical axial sum, or a true torque value outside the accepted enclosure would refute the corresponding step. This analytical extension has no separate numerical experiment, and independent acceptance remains conditional on the named enclosure and review of the minimum argument. Prior subjects, independent references and receipts remain unchanged; the receiving account is the second overnight B report.
