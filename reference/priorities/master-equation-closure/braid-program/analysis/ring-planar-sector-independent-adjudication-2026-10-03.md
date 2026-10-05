# Independent Cartesian adjudication of differential planar ring sectors

## Disposition

Accepted at the stated formal first-variation scope. A separately constructed Cartesian emission-shift derivative and complex interval inclusion independently certify all 27 rectangles in the [differential-sector subject](ring-differential-planar-sectors-2026-10-03.md). Together with its conjugate-sector decomposition and the separately checked common sector, these give lower bounds of 23 growing planar characteristic roots at T02 and 25 at T04, counted with multiplicity across spatial blocks. They are not complete spectral counts or nonlinear escape theorems.

Claim grade: computer-assisted derived strict rectangular inclusions, independently checked; displayed centers remain measured. Domain: the exact six-member alternating T02 and T04 circles, unchanged Master Equation, every ordinary positive-delay self root, persistent simple-root chart, $K=c_f=1$. Falsifier: a missing reference hit, invalid Cartesian emission derivative or spatial phase, failed interval inclusion or contraction norm, overlapping rectangles within a block, or nonpositive real-part enclosure overturns the corresponding witness.

## Construction independent of the subject

The [checker](../../../../../scripts/braid-program/ring_planar_sector_independent_adjudication_20261003.py) does not import the subject's coefficient tensors, characteristic evaluator, determinant or inclusion routine. It imports only the independently authored Cartesian chain rule from the [common-sector adjudication](ring-symmetric-independent-adjudication-2026-10-03.md). It reconstructs emission-site position, velocity, acceleration, separation, normal and signed transmitter factor from each frozen reference root; differentiates the delayed source displacement directly; and supplies the source-only phase $e^{ikm\pi/3}$. The receiver term is unphased. The characteristic determinant and its complex derivative are then built from these rows.

The subject supplies exact binary reference/root intervals and proposed rectangles. Those shared inputs delimit the claim; they are not a second independent census. The reference census and full balance have already been separately checked in the common-sector adjudication. Independent re-evaluation of the characteristic on each rectangle tests the derivative and inclusion rather than replaying stored determinant output.

## Known controls before targets

The checker returned the analytical static radial derivative $-1/4$ at distance two, certified the known linear zero $2+3i$ with zero contraction norm, and certified the known quadratic zero $i$ using a varying interval derivative. It then checked both Cartesian translation identities at T02 and T04: sector one at $z=i\Omega$ with vector $(1,i)$ and sector five at $z=-i\Omega$ with vector $(1,-i)$. These passes were recorded in `.local-data/ring-exploration/planar-sector-adjudication/known.json` before the target, and the target gates on the checker and Cartesian-helper identities.

The target uses 100-decimal outward interval arithmetic, a fixed real inverse-Jacobian preconditioner, a strict image inclusion and an outward induced-infinity contraction norm below one. It independently differentiates the Cartesian determinant on the full complex rectangle. Disjointness is checked within each sector. All 27 directly supplied rectangles passed in the target receipt; each entire real-coordinate interval is positive. The existing scalar real-root signs distinguish the subject's real sector-three witnesses from its nonreal pair. Conjugacy adds the sector-five and sector-four partners without asserting a search of their complements.

## Receipt and limits

The shared-venv target completed in 3.861 seconds with exit zero under the owned-compute supervisor. Its receipt is `.local-data/ring-exploration/planar-sector-adjudication/target.json`; exact binary boxes, images and contraction bounds are retained there. Checker SHA-256 is `b4c79a060bdd891532158b1df2bb5e26eaecf2b7cb734a326183380330de83b0`; Cartesian helper SHA-256 is `bc455932de311f6d8ca8fed91fbf58a06852e8ee42f37aeb094b61561eaef2b9`. Repetition is not the basis of independence.

The lower bounds exhaust spatial sectors but do not exhaust characteristic roots in their bounded right-half-plane disks. A full count still requires complement exclusion or a certified argument-principle count, including neutral directions and boundary zeros. Weak oscillatory growth and the common fast growth coexist; no finite released history or later three-dimensional structure follows from their formal existence.
