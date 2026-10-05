# Independent adjudication of the orthogonal polarity screen

Date: 2026-10-03. Frozen subject: [orthogonal polarity screen](ring-orthogonal-polarity-screen-2026-10-03.md), SHA-256 `58ccd7cd36e484c1e7792d7f7315f3cfc524482d8e06738832d9bf82b568027a`; frozen subject instrument SHA-256 `58baf35f6bba2d39784eb00ebd278f49a7ca9f23d1acab4b1168c292ef434c7a`. Scenario: unchanged Master Equation, $K=c_f=1$ in all numbers, every positive-delay self root retained. The subject and its lobe oracle were not modified.

## Verdict

Accepted: every one of the twenty neutral polarity words fails exact balance for every positive common radius on each of the two inherited T02/T04 speed brackets, within the declared phase-compensated orthogonal geometry. This is a computer-assisted derived two-box negative with independently reconstructed complete Cartesian root partitions and signed acceleration sums. A nonzero transverse residual at reception phase zero suffices; no stability calculation is admissible or asserted.

The ten global-conjugacy classes, including the old alternating-pair order and nine newly screened orders, are correct. The independently reconstructed directed root counts are 36 at T02 and 60 at T04, with six positive-delay self hits in either geometry. These differ from the planar ring's own inventory because the orthogonal paths differ. Every receiver/source count agrees with the frozen screen, and every one of its selected transverse witness intervals has the same strict sign as the independently calculated interval. All eighteen acceleration components and all eighteen comparison-radius residual components overlap their separately constructed counterparts for each representative.

No repair is required for the frozen two-box finding. Neither this adjudication nor the subject excludes the new orders over a whole speed continuum, at another relative phase, with unequal radii or displaced centers, or on a breathing/precessing path. The old order's separate broader exclusion remains an inherited result with its own scope. The new negative does not establish a general obstruction to three-dimensional structures.

Falsifiers: an unresolved Cartesian complement, a missing positive-delay root, a zero-containing divisor, an incorrect polarity product or frame, or an outward witness interval containing zero overturns the corresponding rejection. A balanced history at another speed or another geometry does not contradict this bounded verdict.

## Geometry and polarity reconstructed separately

The phase-compensated frame algebra in the subject simplifies exactly to three explicit circles. At unit radius and common phase $\theta$, their positive endpoints are

$$
P_0(\theta)=(0,\cos\theta,\sin\theta),\quad
P_1(\theta)=(\sin\theta,0,\cos\theta),\quad
P_2(\theta)=(\cos\theta,\sin\theta,0).
$$

Member $i$ follows $e_iP_{\lfloor i/2\rfloor}$, with $e_i=(-1)^i$ a geometric endpoint sign. Its polarity $q_i$ is a separate variable. Differentiation gives source velocities $e_i\beta P_a'(\theta)$; no additional delay derivative multiplies the source's own velocity. The independent checker encodes these Cartesian formulas directly rather than importing the subject's cyclic permutation or compensated frames.

At reception phase zero the radial axes are respectively $e_i(0,1,0)$, $e_i(0,0,1)$ and $e_i(1,0,0)$; the tangents are respectively $e_i(0,0,1)$, $e_i(1,0,0)$ and $e_i(0,1,0)$. The plane normals are $(1,0,0)$, $(0,1,0)$ and $(0,0,1)$, matching the subject's signed projections.

A neutral word has three $+1$ and three $-1$ entries, hence $\binom63=20$ possibilities. The independent instrument enumerates all $2^6$ sign words and filters by zero sum; it does not reuse the subject's combination generator. Every acceleration row is multiplied by $q_iq_j$, including $q_i^2=1$ for self hits. Global conjugation consequently preserves the whole acceleration exactly. The twenty words form ten conjugate pairs, each with one representative having $q_0=+1$. Four representatives have opposite polarities within each geometric pair; the other six remain globally neutral through compensating same-polarity pairs. **Grade: derived finite combinatorics and equation symmetry.** Incorrect enumeration or a contribution depending on an individual polarity rather than its product would falsify this classification.

## Complete Cartesian causal partition

The new [independent instrument](../../../../../scripts/braid-program/ring_orthogonal_polarity_independent_adjudication_20261003.py) imports neither the frozen screen nor its lobe oracle. It works in physical normalized delay $d=\Delta/R$, with the source sampled at phase $-\beta d$:

$$
F_{ij}(d,\beta)=|P_i(0)-P_j(-\beta d)|^2-d^2,
\qquad
\partial_dF_{ij}=2(P_i-P_j)\cdot v_j-2d=-2dD_{ij}.
$$

Every member lies on the same unit sphere, so every retained causal root has $0<d\le2$. This is an exact geometric domain bound, not a delay cap or root exclusion. Point proposals from a 512-segment sign scan merely propose candidate root boxes. Each admitted root then has outward endpoint opposition throughout the whole speed interval, an outward derivative excluding zero and a strictly contained parametric interval-Newton image. The proof does not infer completeness from the point scan.

The remainder of $[0,2]$ is recursively partitioned. Each leaf excludes roots either by a strictly signed outward $F$ enclosure, or by a fixed derivative sign with equal strict endpoint signs. Thus any missed proposal would leave an unresolved complement and fail the checker before acceptance. The receiver/source count matrices independently match the frozen screen, without reusing the scalar `self`, `partner`, `plus`, `minus` lobe classifications.

For a self channel, the coincident root at $d=0$ is excluded analytically on $0<d\le1/8$. The sine inequality gives

$$
2\sin(\beta d/2)\ge\beta d\left(1-\frac{\beta^2d^2}{24}\right),
$$

and the outward bound $\beta[1-\beta^2(1/8)^2/24]>1$ makes the squared causal residual strictly positive throughout that interval on both target speed boxes. Every positive-delay self root outside it is handled by the same ordinary root and complement partition as cross roots. No self contribution is removed by a numerical cutoff.

The independently calculated source divisor $D=1-n\cdot v_j$ is strictly signed at every retained root. Its agreement with $-F_d/(2d)$ is checked outward, directly from Cartesian vectors. This confirms the source factor without relying on the subject's $-\beta^2H_x/(2x)$ formula. The geometric squared causal residual encloses zero at every admitted hit.

## Why a transverse witness excludes every positive radius

For an admitted hit, the independent acceleration coefficient is

$$
B_{ijr}=\frac{P_i-P_j}{d_{ijr}^3|D_{ijr}|},\qquad
A_i=\sum_{j,r}q_iq_jB_{ijr}.
$$

Restoring an arbitrary positive radius and symbolic baseline coupling, the actual interaction acceleration is $KA_i/R^2$. The prescribed circular acceleration is $-\beta^2c_f^2P_i/R$. Multiplication of their difference by $R^2/K$ gives the full residual

$$
A_i+\frac{\beta^2c_f^2R}{K}P_i.
$$

The second term is radial. A strictly nonzero tangent or plane-normal component of $A_i$ therefore survives every positive radius choice at that fixed $\beta$. This is a necessary-equation rejection of the entire prescribed periodic history: a history that fails at one phase cannot satisfy the equation forever. It is not an equilibrium linearization, a stability statement, a mean-acceleration argument or a sum of individually balanced pairs.

The checker calculates all six full acceleration vectors and all six full residual vectors at the inherited comparison radius for each of the twenty words. The nine new representative classes retain the subject's strict witness margins: greater than $1.39909$ on T02 and greater than $1.63883$ on T04, with the same receiver/component sign for every frozen selected witness. Its exact binary interval endpoints, rather than rounded centers, determine the verdict. **Grade: computer-assisted derived within the two full speed brackets.** A direct outward recomputation that includes zero in one of these necessary witness intervals is the numerical falsifier.

## Controls, bindings and receipts

Before the final targets, the independent checker passed and recorded: the static source at separation two with acceleration $(1/4,0,0)$ and $D=1$ using the same vector kernel; the analytically exact self circle $\beta=\pi/2$, $d=2$, $D=1$ and radial acceleration $1/4$; the fixed orthogonal delay $d=\sqrt2$, $D=1$, including a finite width speed interval; unit-radius/tangent/antipode Cartesian identities; and the twenty-word/ten-class enumeration. The known self-circle test includes a root at the physical upper domain boundary, while its coincident origin is analytically excluded.

An early point-sized proposal box was too narrow for the inherited speed uncertainty and failed endpoint opposition. The new checker increased only its proposal enclosure radius to depend on that uncertainty, without changing the scientific domain or a frozen subject. A separate integer-zero typing error was likewise repaired in the new checker. Fresh analytical controls preceded both final targets after all repairs. Neither failure was interpreted as a root absence or a balance finding.

Frozen independent instrument SHA-256: `fe5975559d0b3e1722d6024259a7810a0c80cbc51fed7de55d88b275d8c721d1`. Receipts under `.local-data/ring-exploration/orthogonal-adjudication/`:

| Receipt | SHA-256 |
| --- | --- |
| `known.json` | `cbfa9a79dd9a51050f26157f9e869c5971d0c086d186c7d865d9448db8831dbd` |
| `T02.json` | `420da5f6ddb08c1f950bfdef4810a92fd9267efdd5d059f302d3e2aa032db300` |
| `T04.json` | `6f1967a74fc3f6378816f71322f848c95139e7f73ea7ffd5e1a9cf942fcc1679` |

The target receipts bind the inherited speed/reference receipts and the frozen screen receipts (`1e8067c63c7c4724492e56fdf6ecff1d702a347ceeb90f515b116396dfd31909` for T02 and `f23a1d53fea630b9c1ea5fe059ee27fc5b2691ce0e01eabb0ef3b17257058ab9` for T04). They store all directed Cartesian partition leaves, root images, unsigned contributions, twenty signed sums and full residuals. Their interval binary endpoints are authoritative; printed decimal endpoints are diagnostics.

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_orthogonal_polarity_independent_adjudication_20261003.py known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_orthogonal_polarity_independent_adjudication_20261003.py target --cell 2
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_orthogonal_polarity_independent_adjudication_20261003.py target --cell 4
```

Recommended next action: integrate the two-box negative at its precise geometry and root-domain scope. A speed-continuum or changed-phase search needs a new complete causal partition and fold treatment. Require an exact full residual balance before attempting any stability spectrum. No shared queue, tracker, index, registry, manuscript, rank, score or scenario was edited by this adjudication.
