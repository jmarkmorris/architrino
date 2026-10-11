# Barnes-Hut Lane Open Ideas

Developed explanation lives in [the manuscript](manuscript.md); accepted work lives in [the queue](work-queue.md). The items below are provisional and not yet developed enough to earn a manuscript section.

## Eulerian wake transport as a mesh rival

**Claim grade: guessed.** The Master Equation chapter shows that emitted wake surfaces obey an autonomous transport law: each surface's center is fixed and its radius grows at $c_f$. A mesh method could discretize that transport directly, in the way particle-mesh methods discretize an instantaneous field, and read accelerations from the local wake density and normal. The attraction is that delay is built in rather than solved for. The obstacle is that the sharp causal-root structure, the transmitter-velocity weight $c_f/|D_t|$, and the self-hit term all live below any practical mesh resolution, and the repository's certification discipline has no mesh analog. Falsifier for usefulness: a mesh discretization whose acceleration error cannot be bounded outward for a resolved binary.

## Integer net-polarity bookkeeping per cell

**Claim grade: inferred.** Because every architrino carries polarity exactly $\pm\epsilon$, a cell's net polarity is $\epsilon$ times an integer and can be stored exactly. A cell with integer net zero has an exactly vanishing monopole with no rounding residue, so the leading far-field term is the dipole by construction rather than by cancellation of floating sums. The inference is that this removes one source of width in a certified expansion; it is not yet shown how much width that saves.

## Binary as the leaf unit

**Claim grade: guessed.** If the ambient population is composed mostly of bound electrino–positrino binaries, the natural leaf of a hierarchy is the binary rather than the architrino. A binary's leading far moment is a rotating dipole whose magnitude is the pair separation times $\epsilon$. Whether cycle-averaging that dipole is legitimate depends on the receiver's reception interval compared with the binary period and on the delayed root structure, and no such averaging is admitted by the current solver contracts.
