# Next selected boundary: equal radii with distinct endpoint positions

## Why this is the next question

The current [C report](overnight2-c-followup-and-research-2026-10-07.md) records separation and root-regularity results for the bounded subfield class. These do not exclude equal-radius limits with distinct simultaneous positions. The new phase-sector criterion added no exclusions on the frozen thirty-two-leaf pilot, so repeating that test or expanding the old subdivision tree is not selected. The next useful authorized mathematical branch is the equal-radius boundary with arbitrary phases, rather than only the previously excluded regular alternating hexagon.

This note defines a proposed reduction for that boundary. Its formulas are parent-derived and await independent reconstruction before use as a consequential exclusion. It supplies no exact reference or stability claim. Preserve the original allocation's exploration stop at 13:55:15 UTC and hard deadline at 15:25:15 UTC on October 7.

## A single monotone angle equation for each partner

Take three neutral antipodal pairs on a common circle of radius $a$, with all six present positions distinct, positive angular rate $u$ and speed $v=ua\le1$. The selected law remains the logarithmic equation with $K_{\log}=c_f=1$ and unchanged transmitter factor. For a receiver and a distinct source, let $\beta\in(0,2\pi)$ be their present clockwise angular separation. Let $\alpha\in(0,2\pi)$ be the clockwise angular separation between the receiver and the source at emission.

The chord length and circular delay give

$$
\tau=2a\sin(\alpha/2),\qquad
\beta=H_v(\alpha):=\alpha-2v\sin(\alpha/2).
$$

The derivative is

$$
H_v'(\alpha)=1-v\cos(\alpha/2)=D.
$$

For $v<1$ it is strictly positive everywhere; for $v=1$ it is positive for every $\alpha>0$. With $H_v(0)=0$ and $H_v(2\pi)=2\pi$, each distinct present separation therefore determines exactly one positive-delay root. This is the complete same-circle partner chart, not a selected nearest root. There are no positive self roots for $v\le1$.

In the receiver's outward radial and positive-rotation tangential frame, the unsigned chord direction is

$$
n_r=\sin(\alpha/2),\qquad n_t=\cos(\alpha/2).
$$

Thus, for source-receiver polarity product $q_iq_j$, the exact row becomes

$$
A_{ij,r}=\frac{q_iq_j}{2a[1-v\cos(\alpha_{ij}/2)]},\qquad
A_{ij,t}=\frac{q_iq_j\cot(\alpha_{ij}/2)}{2a[1-v\cos(\alpha_{ij}/2)]}.
$$

At each receiver exact balance requires

$$
\sum_{j\ne i}\frac{q_iq_j}{1-v\cos(\alpha_{ij}/2)}=-2v^2,
\qquad
\sum_{j\ne i}\frac{q_iq_j\cot(\alpha_{ij}/2)}{1-v\cos(\alpha_{ij}/2)}=0.
$$

The three positive receivers suffice by antipodal symmetry. The angles must remain linked to the same three pair phases through $H_v(\alpha_{ij})=\beta_{ij}$; treating them as independent variables would enlarge the problem and lose the geometric correlations that motivate this route.

As a hand-known control, $v=0$ gives $\alpha=\beta$, $D=1$, the static logarithmic chord row, and radial sum $\sum_{j\ne i}q_iq_j=-1$. The radial balance would demand zero, so the static neutral circle is not an equilibrium. This control does not prove the finite-speed formulas independently.

## Deciding work and alternatives

The first task is independent reconstruction of this complete angle chart, then a joint radial and signed-tangential necessary identity retaining its common phase variables. A phase-wide exclusion, an admitted exact full-vector reference or an explicit analytic obstruction would advance the boundary question. The all-equal-radius configuration is a boundary of the ordered class, so even a boundary exclusion needs a uniform neighborhood argument before excluding nearby unequal radii.

If the angle formulation does not yield a deciding estimate, record where the sign or correlation fails and pivot to a restricted closed-speed boundary with separated radii, within the same selected ordinary histories. No universal total-tangential sign is assumed: the earlier finite proposal study contains both signs in the unequal-radius domain. No root truncation, coupling change, receiver response, superfield continuation or new family is authorized by this note.
