# Common impulse-event measure and exact mirror cancellation

**Status:** common carrier and matched cancellation theorem formulated. **Claim grade:** proposed nonordinary-event aggregation law with a derived scalar-measure and vector-impulse cancellation theorem under exact mirror symmetry and a common linear event response. No outgoing history or right trace is adopted.

## Purpose

This note defines the impulse component produced when two exactly matched, equal-magnitude, opposite-polarity cap histories arrive at one event in absolute time and Euclidean position. Wakes do not interact with, modify, or consume one another. Superposition is the linear bookkeeping operation used to form the complete wake total before an architrino response is assigned.

The construction keeps the two labeled source records while separately forming the label-forgetting aggregate used for the event response.

## Common impulse-event carrier

Let

$$
E=(T_{\mathrm c},\mathbf x_{\mathrm c})
$$

be the common coincidence event. Write cap lookback time as $\tau=T_{\mathrm c}-s\in I=(0,L]$ and let $\Lambda=\{+,-\}$ be the two source labels. The common labeled carrier is

$$
\mathcal C_E=I\times\Lambda.
$$

Let $\nu$ be the common finite positive raw wake measure on $I$. For uniform emission-time measure, $d\nu=d\tau$ and $\nu(I)=L$. Exact mirror symmetry means that both cap histories have this same unsigned measure and common event support, while their polarities are opposite. Their labeled raw measures are

$$
d\mathsf M_+
=
+q\,d\nu\otimes\delta_+,
\qquad
d\mathsf M_-
=
-q\,d\nu\otimes\delta_-.
$$

These measures remain separate in the provenance record. Define the event aggregation map

$$
\pi_E:\mathcal C_E\longrightarrow\{E\}
$$

by sending every matched cap parameter and both source labels to the one shared event. The two event pushforwards are

$$
(\pi_E)_\#\mathsf M_+
=
+q\nu(I)\,\delta_E,
\qquad
(\pi_E)_\#\mathsf M_-
=
-q\nu(I)\,\delta_E.
$$

Therefore

$$
\boxed{
\mathsf M_E^{\mathrm{imp}}
:=
(\pi_E)_\#\bigl(\mathsf M_++\mathsf M_-\bigr)
=
0.
}
$$

This is a finite signed event-measure identity. It uses the raw source-history measure, not the inverse-square ordinary receiver kernel.

Plainly: each cap carries the same finite amount of wake history to the same event. One amount is positive and the other is negative. Adding their event contributions gives zero, while the record still remembers which source supplied each one.

## Matched vector-impulse identity

For receiver label $i$, let

$$
\mathcal L_{i,E}
$$

be the proposed common event-to-acceleration map. It is applied after event aggregation, is linear in the signed event measure, and does not use the source label to assign different maps to the two matched cap members. Define the two formal matched vector coefficients by

$$
\mathbf J_{i,+}\,\delta_E
=
\mathcal L_{i,E}
\!\left(+q\nu(I)\delta_E\right),
$$

$$
\mathbf J_{i,-}\,\delta_E
=
\mathcal L_{i,E}
\!\left(-q\nu(I)\delta_E\right).
$$

Linearity gives

$$
\boxed{
\mathbf J_{i,-}=-\mathbf J_{i,+}
}
$$

and hence

$$
\boxed{
\mathbf J_i^{\mathrm{imp}}
=
\mathbf J_{i,+}+\mathbf J_{i,-}
=
\mathbf0.
}
$$

Equivalently, the actual event operation may aggregate first and apply the map only once:

$$
\mathcal L_{i,E}
\!\left(\mathsf M_E^{\mathrm{imp}}\right)
=
\mathcal L_{i,E}(0)
=
\mathbf0.
$$

Plainly: the two displayed vectors are a proof device, not two successive kicks. The event rule adds the matched wake measures first. Because their sum is zero and the event-to-acceleration map is linear, neither architrino receives an impulse from this matched pair.

## The rest of the universe is unchanged

Let $\boldsymbol{\mathsf R}_i$ denote every other wake contribution reaching receiver $i$ at or near the event: ordinary continuous rows, unmatched event components, and any other already admitted wake record. The complete wake measure is

$$
\boldsymbol{\mathsf A}_i
=
\boldsymbol{\mathsf R}_i
+
\left(
\mathbf J_{i,+}+\mathbf J_{i,-}
\right)\delta_E
=
\boldsymbol{\mathsf R}_i.
$$

Thus the cancellation removes only the exactly matched impulse pair from the net acceleration bookkeeping. It does not set the universe-wide wake sum to zero, remove either retained source history, alter another wake, or prevent other wakes from accelerating either architrino.

Plainly: erase neither wake and change no background field. Their two impulse entries simply add to zero in the same way that equal and opposite terms disappear from a sum. Everything else in the sum remains.

## Why the ordinary radial kernel does not decide this event

The cap family has $D_t=0$ at coincidence, so the ordinary simple-root coarea row is undefined there. Applying the ordinary source-to-receiver radial vector kernel separately to the two cap members before event aggregation reverses the proposed order of operations and produces a direction-and-sign diagnostic, not the impulse-event measure.

The event theorem therefore does not alter any ordinary root or claim that the radial kernel cancels on its own domain. It supplies the separately typed nonordinary aggregation that the ordinary law lacks.

Plainly: the regular equation tells us how an isolated wake crossing contributes to acceleration. This coincidence is a whole collapsed family, not an isolated crossing. The special event rule first combines that family on its common carrier; it does not pretend the regular row formula remains valid there.

## Claim boundary

The common carrier, exact scalar cancellation, and the vector identity $\mathbf J_{i,-}=-\mathbf J_{i,+}$ are proved under exact mirror matching and the stated common linear event map. The event aggregation map and its use at this nonordinary stratum remain proposed foundational data. This note does not select an outgoing retained history or right trace and establishes no passage, rebound, breather, conservation law, stability result, or general cancellation for unequal or unmatched wakes.

## Closure goal

The [proposed exact-mirror restart](mirror-event-family-completion-and-right-trace.md) now consumes this aggregation inside its narrow event law, preserves both labeled histories, and restarts from the unchanged remainder wake measure. Review that construction before any broader adoption or uniqueness claim.
