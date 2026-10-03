# Spatial axis symmetry and the proposed octet

## What must be declared first

The [color chapter](../../../../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md) distinguishes an exceptional-axis label, pole assignment and the complete indexed braid history. They are not interchangeable representations. The [vortex-coupling target](quark-vortex-coupling-target.md) has not supplied a branch-derived action on its $3\times3$ coupling space.

Grade: derived representation identities, self-reviewed without independent adjudication; application to a color-response map remains inferred and referent-pending. Spatial symmetry is a comparison, not a primitive color law. The original extracted simulation proposal is preserved.

## Oriented spatial components

Assume three oriented components transform by the proper octahedral rotation group $O$, represented by determinant-one signed permutation matrices $R$. A coupling matrix transforms as $C\mapsto RCR^{\mathsf T}$. Its real nine-dimensional space splits into invariant subspaces:

| Matrix subspace | Dimension | Conventional representation |
| --- | ---: | --- |
| Scalar identity | 1 | $A_1$ |
| Diagonal traceless | 2 | $E$ |
| Antisymmetric | 3 | $T_1$ |
| Symmetric off-diagonal | 3 | $T_2$ |

The projections are explicit:

$$
C_{A_1}=\frac{\operatorname{tr}C}{3}I,\qquad
C_E=\operatorname{diag}C-C_{A_1},\qquad
C_{T_1}=\frac{C-C^{\mathsf T}}2,\qquad
C_{T_2}=\frac{C+C^{\mathsf T}}2-\operatorname{diag}C.
$$

Thus $3\otimes3=A_1\oplus E\oplus T_1\oplus T_2$. For the class order $(1,8C_3,6C_4,3C_2,6C_2')$, the vector character is $(3,0,1,-1,-1)$, whose square is $(9,0,1,1,1)$. The four subspaces above give precisely that sum. This proves the review's decomposition under its oriented-component assumption.

For traceless Hermitian matrices, use real symmetric matrices and $i$ times real antisymmetric matrices. The same eight-real-dimensional decomposition applies. This is not a claim that a real tensor automatically carries the corpus's complex color state.

A linear response commuting with this full group acts separately on the three inequivalent traceless blocks, with independent scalar responses on each block. Spatial symmetry does not force their equality. This statement needs the actual history, environment, response and phase convention to preserve that group; an undecorated drawing is insufficient.

## Unsigned exceptional-axis labels

If the three coordinates instead record which unoriented axis is exceptional, pole reversals do not add vector signs. The action is a permutation matrix $P$, factoring through $S_3$. Its three-dimensional space is $W=A_1\oplus E$, and

$$
\operatorname{End}(W)\cong W\otimes W
=2A_1\oplus A_2\oplus3E.
$$

One derives this using the constant label vector, its two-dimensional zero-sum complement, and $E\otimes E=A_1\oplus A_2\oplus E$. Removing the identity leaves

$$
\operatorname{End}_0(W)=A_1\oplus A_2\oplus3E,
\qquad 8=1+1+2+2+2.
$$

The remaining invariant traceless scalar is proportional to $J-I$, where every entry of $J$ is one. Therefore removing the trace does not remove every spatially invariant channel. Equivalent $E$ copies can mix under a commuting response. In the octahedral class order above, the unsigned-label character is $(3,0,1,3,1)$; its square agrees with this decomposition. This representation is a candidate for the coarse exceptional-axis dictionary, not a selected physical color map.

## Actual host symmetry and recovery scope

The [F6c seed](../../braid-program/analysis/f6c-geometry.md#strongest-six-seat-seed-the-central-octahedral-axes) singles out an axial pair and a transverse quartet. Its octahedron is a track-center reference; the generic fixed-history stabilizer is smaller, and polarity decoration can reduce it further. Likewise the catalog's independently assigned radii and frequencies do not make every axis exchange a symmetry of one history. Neither candidate inherits the full group $O$ solely from its three axes.

The bounded diagnostic is therefore conditional: define the coupling coordinates and their transformation, identify the complete-history symmetry including any time shift, and project a branch-derived response into the justified invariant subspaces. At a color-invariant state where an isotropic common response is explicitly the target, unequal oriented $E,T_1,T_2$ coefficients would reject that particular response model. For unsigned labels, the invariant and repeated blocks require a different test.

Equality of block responses would not establish a continuous color action, generator closure, local transport, confinement or a coupling normalization. Conversely, a color-covariant theory can have unequal perturbation frequencies about a symmetry-breaking state: equality of every local mode is not a universal necessity for color recovery. The target is the actual transformation and observer-response law, not dimensional counting alone.

Analytical controls for a future evaluator are $I$, $\operatorname{diag}(1,-1,0)$, $E_{12}-E_{21}$ and $E_{12}+E_{21}$: they belong respectively to the four oriented subspaces. Under unsigned permutations, $J-I$ is invariant despite being traceless. A wrong projection, violated transformation rule or inappropriate history stabilizer overturns the corresponding decomposition or its application. No response evaluator, spectrum or group enumeration was run here.
