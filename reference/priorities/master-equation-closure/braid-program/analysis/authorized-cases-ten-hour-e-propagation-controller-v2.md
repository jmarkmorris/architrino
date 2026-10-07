# Exact-terminal continuation and independent seed

**Grade: known-tested implementation successor, frozen before target.** The [version-two controller](../evidence/authorized-cases-ten-hour-e-propagation-controller-v2.py), SHA-256 `34f430d602502f6e54a9ebeb3d969a7c9b0b70d69dff15d3a413d528e7754f50`, preserves the [immutable stream contract](authorized-cases-ten-hour-e-propagation-stream-interface.md), source geometry and all-four-receiver atomic cap check. The original controller remains preserved. Two narrow changes are needed for the selected continuation.

First, a caller declares the exact terminal reception time independently of any exported decimal face. For the proposed bounded target this is the integer $15$. On segment $k$, the exact receiving right face is $\min(T_{k+1},15)$; the residual row must contain this face and the exact retained left face. The root midpoint in that residual row belongs to this same clipped receiving interval. The geometry, recurrence width and stored completed-history face all use that exact clipped interval. No cell after the terminal face is accepted, and no numerical knot is moved.

Second, the [independently accepted first three cells](authorized-cases-ten-hour-reference-e-propagation-output-assessment.md), assessment SHA-256 `1fe5355e223fd34a654cae1de67bd4f72bc011e10abd8f0923ce7fbcf2bea832`, initialize the continuation. Their conservative uniform bounds are

$$
e_x<1.308\,10^{-11},\qquad e_v<3.270\,10^{-12},\qquad e_a<3.352\,10^{-10}.
$$

At the unchanged weight $\gamma=1/16$, the weighted endpoint radius is bounded by

$$
\sqrt{\gamma e_x^2+e_v^2}<5\,10^{-12}.
$$

The `seed_accepted_pilot()` method stores those X/V/A bounds on all three exact retained cells and uses $5\,10^{-12}$ as each receiver's endpoint radius. It pins the independent assessment, not the producer's smaller unverified individual matrix intervals. The caller must bind the original physical case, source and exact trial reconstruction before invoking this case-specific seed. Subsequent propagation begins at original segment three. The first three incoming residual rows remain bound source evidence, not a reason to replace the accepted initialization with sharper subject-only values.

The [known receipt](../evidence/authorized-cases-ten-hour-e-propagation-controller-v2-known.json) records six controls passing under the shared venv at 06:23:03 UTC, before target: two contiguous static-source comparison cells, acceleration storage, gap rejection, cap-failure atomicity, an exact clipped final cell and the independent seed's norm conversion. An initial known assertion incorrectly demanded equality between a directed decimal upper endpoint and the exact decimal seed. It was corrected to interval containment before the successful freeze. No target was run under either assertion.

The coordinator's current continuation choice is a contiguous prefix no later than $T=15$, with an earlier $T=12$ sufficient test if its independently assessed observable and actual error bound close. Fixed $10^{-3}$ position and velocity caps are the candidate proof domain, and the weight remains $1/16$. These caps are not the departure tolerance. A separately frozen target wrapper must bind the producer stream and all dependencies, enforce the resource/scientific limits, and obtain independent admission before target use. This note launches no target and claims no departure.
