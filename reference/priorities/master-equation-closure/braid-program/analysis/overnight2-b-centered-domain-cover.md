# Complete subject crossing cover on the original cosine domain

## Mathematical claim under independent review

Claim grade: measured by the [same-domain centered instrument](overnight2-b-centered-domain-cover.py), pending independent numerical and partition verification. The histories have unit normalized radius, no periodic planar phase correction, and height $z=H\cos\phi$ in the canonical six-member alternating class. They use $K=c_f=1$, every ordinary positive-delay partner and self root, mean planar rate $\beta$ and deformation rate
$$
\kappa=\frac{\eta\sqrt{(19/20)^2-\beta^2}}H.
$$
The closed target domain is
$$
\frac1{10}\le H\le\frac56,\qquad \frac1{20}\le\beta\le\frac45,\qquad\frac1{10}\le\eta\le1.
$$
The speed is at most $19/20$, so there are exactly five ordinary partner roots, no positive self roots and source divisor at least $1/20$. At the descending height zero, prescribed tangential and axial accelerations both vanish. A strict sign of either complete canonical component there excludes exact balance at every $R>0$.

The completed subject cover assigns every point of this domain to an excluded closed leaf. Neighboring leaves may share boundaries, but the union is intended to be the entire domain. This is not yet an independently accepted whole-domain exclusion. In particular, acceptance of 473 leaves from the earlier incomplete cover does not verify the new traversal or its other signs.

## Enclosure methods and unchanged resource boundary

The [centered-crossing derivation](overnight2-b-centered-crossing.md) and its [independent reconstruction](overnight2-b-independent-centered-crossing.md) give the complete geometry, implicit derivatives and centered mean-value inclusion. The new subject wrapper imports its frozen centered instrument, which itself imports the frozen original direct root contractor. This dependency chain is subject reuse, not independent agreement.

For each rational parameter box, the wrapper first applies the accepted lobe-endpoint theorem: if $2\kappa<\pi$ everywhere in the box, the unit-radius cosine profile cannot satisfy its zero-height axial balance. Otherwise it tries the original direct root and component intervals. On boxes whose maximum normalized coordinate width is at most $1/4$, it additionally intersects direct complete-component ranges with their centered forms. A strict sign of either complete tangential or axial interval closes the box. An interval containing zero remains unresolved and is subdivided; numerical overestimation is never treated as a physical result.

Traversal is breadth-first. It bisects the largest width relative to the original domain width, with deterministic coordinate-order ties. The limits remain 12,000 visited boxes, depth 24, 900 internal seconds, 512 MiB resident memory, eight MiB per receipt and one numerical thread. No previous subdivision budget was increased. Each pending or failed active box is retained. Exact rational excluded, unresolved and pending volumes must sum to the input volume. This sum is a useful conservation check but is not, by itself, a proof that an arbitrary box collection has neither overlap nor gaps; independent verification must also inspect the actual partition.

## Known-first evidence and measured pilot

Before pilot or target execution, the independently prescribed toy traversal closed only boxes with every side at most one half. It returned exactly eight equal subcubes in fifteen visits and total rational volume one. The stage also checked the analytically known implicit derivatives $T_\beta=19/12$ and $Z_\eta=-133/48$, and a known endpoint-rate exclusion. Known receipt SHA-256 is `d4c413f5d683fde17da287ea8fd0219a9e051bc1fbbb6878ed9e102eccaaf415`.

The eighty-visit pilot used $H\in[1/5,3/10]$, $\beta\in[1/5,2/5]$ and $\eta\in[7/10,9/10]$. It retained four excluded leaves and 73 pending boxes; its incomplete status is preserved. It measured 2.794718 internal seconds, 2.862 supervised seconds and 26,869,760 bytes peak resident memory. Supervisor `a04bd21c-5579-4ce6-9e41-67134d3040a9` closed with exit zero, zero stderr and a closed process group. Receipt SHA-256 is `9bf5a1ed786d13ae6e0997886e2244ee81011131e2b8eb43ee7a30f68d1c0adb`. The measured average cost projected approximately 419 seconds for the full visit cap; this was planning evidence, not a promise of target cost or closure.

## Completed target

Native `jq` inspection of the original target receipt reports successful completion after 8,037 visits, with 4,019 excluded leaves, no unresolved leaves, no pending boxes and no recorded failure. The dispositions are:

| Exclusion method | Leaves |
| --- | ---: |
| Endpoint-rate theorem | 15 |
| Direct axial interval | 1,002 |
| Centered axial interval | 226 |
| Direct tangential interval | 1,084 |
| Centered tangential interval | 1,692 |

The exact excluded and total parameter volumes are both $99/200$. Volume refers to the declared coordinates $(H,\beta,\eta)$; it is neither a physical probability nor a computational-cost proxy. The full target measured 219.639506 internal seconds, 219.708 supervised seconds and 33,144,832 bytes peak resident memory. Supervisor `c0dbf396-543e-4855-b2d3-0eb7ca0ebf13` closed with exit zero, zero stderr and a closed process group. Its heartbeat advanced during the run, and its retained standard output records increasing visit and exclusion counts. No target process remains.

Target receipt SHA-256 is `5b9df247c7c6c1f3ce94c8da96a13657f21ad7bee51057f9539713520e645180`. The original known, incomplete pilot and successful subject target remain under `.local-data/master-equation-closure/overnight2-b/centered-domain-cover/`. Earlier incomplete covers, center probes and both 473-leaf verifications remain unchanged. Reproduction is not claimed to have occurred; successful receipt paths refuse overwrite.

## Frozen dependencies and independent obligations

| Item | SHA-256 |
| --- | --- |
| Same-domain wrapper | `c06df9541a302df3ccffbe99658a5dd0c9be5b0e844bd0921f6cfde3f2f87172` |
| Centered subject dependency | `f72acdc4025c8ee4e401ea1d7005e236e0776918ed9ce5e0ea07d85ec085265f` |
| Direct root dependency | `8f2716b7d0819970a63d5b5bbc67246503d147b66b766122c52dd4e4c52b244b` |

Independent acceptance must reconstruct the root and component bounds without importing these subject instruments, check every leaf or an independently complete cover of the same domain, and establish exact partition coverage separately from a volume total. A known partition with an intentionally missing leaf and a duplicate/overlapping leaf should be rejected before the real partition is audited. The already frozen independent centered instrument is available as a separate reference dependency; extending the verifier must not alter it or the subject. A measured pilot must precede any larger independent numerical target, and its actual enclosures may remain unresolved rather than borrowing the subject signs.

A missed domain point, invalid leaf sign, missing causal root, wrong divisor or derivative, changed bound, or exact admitted history in the certified domain would falsify the affected claim. Shared mpmath interval arithmetic remains an explicit common dependency even when roots, derivatives and traversal are separately authored. Full-waveform existence, stability and global nonlinear fate remain outside this result.
