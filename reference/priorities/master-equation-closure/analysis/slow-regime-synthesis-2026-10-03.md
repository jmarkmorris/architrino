# What the unchanged equation does below wake speed: a synthesis of the slow-motion results

## Purpose and standing

On 2026-10-03 a separate analytical session examined several geometries away from the exact rings: two pairs at a distance, two-architrino encounters of both polarities, slow rigid rotors, a pair with a drift or a stationary neighbour, an infinite rotating ladder of pairs, and the class-level form of the collinear first-exit obstruction. Each result is owned by its geometry directory. This note connects them into one account of what the unchanged Master Equation does when every architrino moves slower than the wake speed $c_f$.

The note adds no result. Every statement below restates an owner, with its grade, and the owner governs. Grades follow repository practice: *derived* for a proof, *measured* for an instrument result, *inferred* for a conclusion drawn from derived or measured inputs without its own proof. "Checked" means a separately constructed derivation or adjudication exists; all of those were produced within the same working session by delegated reviewers working from problem statements, so they are separate constructions and not reviews by a different author. No equation variation, rank, score or task status is selected or changed.

## The organizing fact

At small speed the delayed equation is the zero-delay comparison plus corrections of relative size $v/c_f$. In the zero-delay comparison each architrino receives the static inverse-square acceleration of every other, with the same response for all, attracting for opposite polarity and repelling for like polarity. The corrections come from the source's displacement during the delay and from the transmitter factor. To first order, the acceleration of receiver $i$ due to source $j$ is

$$
\mathbf a_{ij}=\frac{\sigma_{ij}K}{r^2}\Bigl[\mathbf n+\frac{\mathbf u_j}{c_f}-\frac{2(\mathbf n\cdot\mathbf u_j)}{c_f}\,\mathbf n\Bigr],
$$

with $r$ and $\mathbf n$ the present separation and direction, $\mathbf u_j$ the source's velocity, and $\sigma_{ij}$ the product of polarities. This kernel is [independently adjudicated](../binary-research/analysis/slow-binary-independent-adjudication-2026-10-03.md). Everything in the slow regime follows from two questions: what does the zero-delay comparison do, and what do the first-order terms add.

## Two architrinos

**The comparison motion is a closed orbit or a flyby, and the pair is neutral to disturbance.** Among all slow rigid rotors found, the two-member pair is the only one whose zero-delay spectrum has no growing mode (measured, [rotor analysis](../braid-program/analysis/slow-rigid-rotor-first-order-torque.md)).

**The first-order terms raise the comparison quantity on every passage.** For a mirror pair of either polarity, on every comparison orbit, the quantity $\tfrac12v^2+\sigma K/(4\rho)$ increases over one passage, and angular momentum per member changes by exactly $K/(4c_f)$ per radian, growing for opposite polarity and falling for like polarity (derived, checked; the delayed equation agrees to one part in $10^4$ or better on eight float runs; [encounter map](../binary-research/analysis/slow-mirror-encounter-first-order-map.md)).

**So an opposite pair does not capture and does not last.** A flyby leaves less bound than it arrived. A bound pair expands, which the [controlled secular theorem](../binary-research/analysis/slow-binary-controlled-secular-comparison.md) proves for the near-circular class, and its eccentricity grows in proportion to its angular momentum until it unbinds (inferred from the averaged first-order map; two float runs of the delayed equation show the unbinding, uncertified).

**A like pair is fully understood at small speed.** It exists for all time, never reaches wake speed, keeps a stated minimum separation and leaves with a limiting velocity (derived, [theorem](../binary-research/analysis/like-polarity-mirror-global-continuation.md), accepted by its [adjudication](../binary-research/analysis/like-polarity-mirror-independent-adjudication-2026-10-03.md)). Head-on, it leaves faster than it arrived by the fraction $\tfrac43v/c_f$.

**A drifting pair keeps its in-plane drift and slowly loses its axial drift** (derived, measured; [drift note](../binary-research/analysis/slow-pair-drift-and-static-neighbour.md)).

## More than two

**Every slow rigid rotor with three to six members is unstable in the zero-delay comparison.** A census by random search found sixteen such rotors; each has a growth rate above $1.5$ times its angular rate (measured, rotor analysis). The first-order corrections are far too small to offset that.

**Released, they break into pairs.** A trimer left a pair and a free member; an alternating square left two pairs; an alternating hexagon left three (measured, three float runs, rotor analysis).

**Neighbouring pairs destabilize each other.** Two prescribed pairs exchange angular momentum reciprocally and push each other along their motion by a small non-reciprocal amount (derived, checked; [two-pair analysis](../braid-program/analysis/slow-pair-far-field-and-two-pair-coupling.md)). Released, pairs that attract drive each other's eccentricity to one or collide, and pairs that repel separate; no bound four-member motion appeared in six float runs (measured).

**A stationary neighbour cannot help.** Its row is exactly static and does no net work around a closed orbit, so it cannot cancel the outward drift, and in the zero-delay comparison it turns a circular pair into a head-on one (derived for the first statement; inferred for the second; drift note).

**The transmitter factor never changes a cluster's mean inverse-square field.** A neutral cluster has no steady inverse-square field at any speed below wake speed; what it has at that range oscillates (derived, two-pair analysis). A steady long-range interaction between neutral clusters needs correlated internal motion.

## A moving balance exists, and is unstable

An infinite line of stacked opposite pairs, each turned half a revolution from the next, rotates rigidly and satisfies the delayed equation exactly at one spacing for each speed, from the smallest speeds up to wake speed (first-order condition derived; exact balance measured and reproduced by a separate construction; [rotating ladder](../lattice-research/analysis/rotating-alternating-ladder.md)). The forward push of each partner is cancelled by the braking of like-polarity neighbours on the same rail. This is the first recorded configuration below wake speed that moves and balances exactly.

It is unstable at every speed examined. In the delayed linearization its largest growth rate is $0.99$ of the angular rate at small speed, about $0.52$ near $0.76$ of wake speed and $0.57$ near wake speed, and the number of growing roots rises with speed, from 23 to 70 in an independent census (measured; formal modes). Twisted versions are driven along their axis and balance while translating at a fixed fraction of their rotation speed (measured).

A finite balance exists as well. Three concentric like pairs, two of one polarity and one of the other, turn together at speeds $0.53$, $0.56$ and $0.97$ of wake speed and satisfy the equation exactly, with no member receiving its own wake (measured, three evaluators; [six-member balance](../braid-program/analysis/six-member-balance-below-wake-speed.md)). It has thirteen growing characteristic roots. It is not a slow structure: its outer pair is close to wake speed and its delays are a sizeable fraction of a period. Six larger balances of the same kind, of nine to eighteen members, were found afterwards. The slowest, three concentric hexagons, has no member above $0.13$ of wake speed. The larger and slower the balance, the more growing roots it has, from thirteen for six members to fifty-one for eighteen.

So existence is not what is missing below wake speed. Stability is.

## Follow-up of 2026-10-04: how common balances are, and how unstable

A follow-up on 2026-10-04 enclosed two of the balances above and widened the search. Its results are owned by the documents linked here.

**The six-member balance and the charged trimer are now proved to exist.** Each is enclosed in interval arithmetic with a derived root census, and a separately constructed certificate accepts both (computer-assisted derived; [six-member enclosure](../braid-program/analysis/six-member-balance-below-wake-speed.md#interval-enclosure), [trimer enclosure](../braid-program/analysis/charged-trimer-above-wake-speed.md#interval-enclosure-of-the-trimer), [adjudication](../braid-program/analysis/exact-balance-enclosures-independent-adjudication-2026-10-04.md)).

**Balances are common.** A random search over 211 families found 93 distinct rigid balances with two to twenty members; 65 lie entirely below wake speed and all 65 are enclosed (computer-assisted derived, one instrument; [search analysis](../braid-program/analysis/rigid-balance-search-2026-10-04.md)). They include three-dimensional arrangements, sixteen with no net polarity, and pairs of nested alternating rings, each ring of the kind that cannot balance alone below wake speed.

**Finite arrangements can travel.** Four balances rotate and move steadily along their axis with every member below wake speed. The smallest has three members and is the smallest exact assembly on record below wake speed (computer-assisted derived; the six-member one separately certified).

**Two members balance in closed form, and only with one of them above wake speed.** An opposite pair on unequal circles, one member at $\pi c_f/2$ and the other at $0.49\,c_f$, is an exact solution whose radii follow from a quintic. No two-member rigid balance exists with both members below wake speed, and none with like polarity (derived; [closed-form pair](../binary-research/analysis/asymmetric-opposite-pair-closed-form.md)).

**None is stable.** Every one of the 93 has growing characteristic roots: never fewer than five, never fewer than two per member, typically three per member (measured, formal modes, each count closed by a derived bound). Having fewer members is the only thing that lowers the count.

## Just above wake speed

One result of the session lies above wake speed. Two like-polarity members circling a central opposite member at rest balance exactly at $v/c_f=1.2757$ and $R=0.1720\,K/c_f^2$: each circling member's own wake pushes it forward by the amount its like partner brakes it (measured; [charged trimer](../braid-program/analysis/charged-trimer-above-wake-speed.md)). It is the first exact assembly on record with a net polarity. The slow version of the same shape contracts and is unstable; the exact one has fifteen growing characteristic roots (measured, formal modes).

## Reaching wake speed

A collinear attracting history that reaches wake speed at positive separation has no continuation of bounded-variation velocity under the measure form of the equation, whatever the velocity does at the event (derived, checked; [class-level adjudication](../collinear-research/analysis/class-level-first-exit-independent-adjudication-2026-10-03.md)). With the [downward-crossing obstruction](downward-wake-speed-crossing-obstruction.md), regular collinear passage through wake speed is excluded in both directions under each theorem's hypotheses.

In the zero-delay comparison a slow opposite pair is carried to wake speed when its impact parameter is below about $K/(2c_fv_\infty)$ (inferred, encounter map). Curved approach to wake speed has no theorem.

## The picture

Below wake speed and at small speed, the record now reads as a cascade. Slow shapes with more than two members come apart into pairs within a few revolutions. Pairs disturb one another, expand, grow eccentric and unbind. Free architrinos of like polarity scatter and gain speed; those of opposite polarity pass without capturing unless they approach closely, in which case they are driven toward wake speed, where no continuation is known. Each mirror passage adds to the comparison quantity, so slow motion does not settle.

Three things would change this picture, and none has been excluded.

- **A motion that is not a rigid rotation.** The census and the wider search cover rigid motion only. Periodic motions in which members exchange places or breathe were not examined. After 93 rigid balances with growing modes, this is where an unexamined possibility is largest.
- **Speeds that are not small.** The ladder's fastest zero-delay mode weakens as speed rises, although the delay makes other modes grow, and the six-member balance shows that finite exact assemblies exist once the delay is of order one. Such structures are outside the zero-delay argument. The follow-up search found and tested about ninety of them, at speeds from $0.08$ to $3.4$ of wake speed, and none is free of growing roots. The exact rings live there, and their stability is being examined by the ring research.
- **A population.** Every multi-member result here is for an isolated structure or an idealized infinite line. A correlated population could supply the moving neighbours that a stationary one cannot.

## Limits

The statements about cascades and about slow motion not settling are inferences across several measured and derived results; they are not theorems. Mirror symmetry is imposed in the two-architrino results. The released runs are float trajectories from a handful of starts. The rotor census is a random search and may be incomplete. No interval enclosure exists for the ladder balance.

A slow rigid rotor with more than two members and no growing zero-delay mode, a slow two-architrino passage that lowers the comparison quantity at first order, a certified bound four-member motion below wake speed, or a ladder spectrum without growing roots at some speed would each overturn part of this account.
