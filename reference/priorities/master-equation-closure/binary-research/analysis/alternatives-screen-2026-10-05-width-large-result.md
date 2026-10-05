# Complete radial certificate on the remaining large-circle rectangle

Status: numerical subject complete, 2026-10-05, pending the coordinator's final independent assessment and combination with the analytical tail theorem. The coordinator inspected the frozen mathematical reduction, specification and new driver before authorizing this target. No shared owner or prior subject was edited.

## Certified numerical domain

Claim grade: derived by the frozen outward-enclosure theorem and complete finite cover, conditional on its documented machine arithmetic assumptions. For each fixed pair $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$, with $K_{ij}=c_f=1$, the complete antipodal uniform-circle radial-balance residual satisfies

$$
F_2(\beta,R)=RA_r+\beta^2>0
\quad\text{throughout}\quad
\frac{11}{4}\le\beta\le\frac72,\qquad2\le R\le4.
$$

A circle requires $A_r=-\beta^2/R$, so no simultaneous radial and tangential balance is possible in this numerical domain. The certificate does not require a tangential sign. Its positive margins are lower enclosures, not physical extrema sampled from a grid.

The full selected acceleration integral includes self sign $+1$ and partner sign $-1$, with displacements $R(1-\cos\theta,\sin\theta)$ and $R(1+\cos\theta,-\sin\theta)$ at receiver $(R,0)$, where $\theta=\beta\tau/R$. The window is $\delta_h(z)=h^{-1}(1-|z|/h)_+$ and the core denominator is $(r^2+\rho^2)^{3/2}$. All ages $0\le\tau\le2R+h$ are included. Older ages vanish identically because both ranges are at most $2R$. No root is discarded and no sharp-window approximation is made.

For $q_s^2=2(1-\cos\theta)$, $q_p^2=2(1+\cos\theta)$, $u=\rho/R$, $v=R/h$, $G(z,u)=z/(z+u^2)^{3/2}$ and $W(x)=(1-|x|)_+$, the exact residual is

$$
F_2=\beta^2+\frac1{2\beta h}\int_0^\Theta\left[
G(q_s^2,u)W\!\left(v\left(q_s-\frac\theta\beta\right)\right)
-G(q_p^2,u)W\!\left(v\left(q_p-\frac\theta\beta\right)\right)
\right]d\theta.
$$

The common endpoint $\Theta\ge\beta_+(2+h/R_-)$ covers every point in a parameter rectangle; its extra tail is exactly zero for each actual circle. Outward ranges on exact dyadic phase cells include all triangular support and central corners and all chord cusps. Full signed interval arithmetic handles the common prefactor after subtracting channel integrals.

## Independent references and known-first chronology

The [mathematical interval protocol](alternatives-screen-2026-10-05-width-circle-exclusion-protocol.md) owns the enclosure proof and assumptions. The unchanged [interval reference](../evidence/alternatives-screen-2026-10-05-width-circle-exclusion-interval.py) uses outward binary64 basic operations and square root, rational Machin bounds for $\pi$, a checked degree-40 Taylor cosine enclosure, and the full $\gamma_{n-1}$ reduction bound for nonnegative sums. Correctly rounded IEEE basic operations and square root, gradual underflow, finite values and the declared reduction model are explicit assumptions. No pointwise quadrature estimate supplies a certificate.

The new [cover driver](../evidence/alternatives-screen-2026-10-05-width-large-cover.py) imports the immutable [earlier cover implementation](../evidence/alternatives-screen-2026-10-05-width-circle-exclusion-cover.py) for exact midpoint splitting and rational leaf auditing, without modifying its code or arithmetic. The new [execution protocol](alternatives-screen-2026-10-05-width-large-cover-protocol.md) fixes the enlarged assignment, analytical masks, remaining domain, initial partition and runtime caps before the target.

Claim grade: measured. The new known-control receipt completed at 18:27:27.774211 UTC in 0.0818 seconds. It reran the interval reference's rational arithmetic, signed division, square-root, cosine, long-sum and independently known stationary softened-integral controls. It also reran the complete-partition and rejected missing-child, ancestor-overlap and incorrect-endpoint controls. An additional exact rational check verified all initial endpoint and adjacency identities. The known receipt preceded the target, and the coordinator inspected the full frozen source before authorizing it. These closed-form and rational controls, plus the explicit mathematical proofs, provide independent references; replay of an imported implementation is described only as reproducibility.

## Complete coverage and measured certificate

For each law, speed endpoints are $(88+3j)/32$, $j=0,\ldots,8$, and radius endpoints are $2+j/4$, $j=0,\ldots,8$. Their Cartesian product contains 64 rectangles per law and exactly covers the stated numerical domain. All endpoints are dyadic. The rational coverage audit reconstructs every final leaf from its root and split path, requires complete siblings at every subdivision, checks exact endpoints and law identity, and rejects any nonpositive or nonfinite exclusion lower bound.

Claim grade: measured by the retained target receipt and `jq` grouping of its leaves. The target completed at 18:32:14.405172 UTC in 1.0475 seconds. All 256 initial rectangles were certified directly at phase density $N=256$; no subdivision or higher phase density was needed. The complete rational coverage audit passed. There were zero unresolved boxes, zero pending boxes and no reached runtime, depth or processed-box cap. The process exited normally.

| $h$ | $\rho$ | Excluded rectangles | Minimum certified lower $F_2$ |
| --- | --- | ---: | ---: |
| $1/16$ | $1/32$ | 64 | 7.052416128982814 |
| $1/16$ | $1/64$ | 64 | 7.052265842219673 |
| $1/32$ | $1/32$ | 64 | 5.772589447900041 |
| $1/32$ | $1/64$ | 64 | 5.772334163254443 |

The weakest rectangle has $h=1/32$, $\rho=1/64$, $\beta\in[2.9375,3.03125]$ and $R\in[2,2.25]$. Its 1,565 phase cells produce $F_2\in[5.772334163254443,30.0385369829138]$. Outward expansion can give a channel-integral lower endpoint of the smallest negative subnormal float when its mathematical lower bound is zero; this is a conservative enclosure, not a negative physical self contribution.

## Analytical regions and the original assignment

The original diagnostic assignment was $\beta\in[\pi/2,32]$, $R\in[2,128]$. The independently reconstructed [analytical bounds](alternatives-screen-2026-10-05-width-large-bounds.md) address its complementary regions through full-age inequalities. Their domains are $R\ge2$, $\pi/2\le\beta\le11/4$; $R\ge2$, $\beta\ge7/2$; and $R\ge4$, $\beta\ge\pi/2$. These unbounded tail domains are analytical conclusions, not an extension of numerical coverage. The new target receipt records the original domain and these masks explicitly.

The coordinator selected the complete interval target after reviewing that reduction. Accordingly, the earlier [enlarged diagnostic specification](alternatives-screen-2026-10-05-width-large-protocol.md) is preserved as unexecuted: no diagnostic driver was authored and no enlarged floating grid or root search was run. Final assessment and combination of the analytical and numerical subjects remain with the coordinator. The previous smaller-radius certificate and the positive-tangent theorem below $\pi/2$ remain separate frozen evidence.

## Reproduction and exact identities

All SHA-256 identities below were measured with `shasum -a 256`. The two new receipts are local provenance under `.local-data/master-equation-closure/binary-research/`; the tracked protocols and reproducers carry the reusable proof and implementation. Existing receipt files are never overwritten.

| Source or receipt | SHA-256 |
| --- | --- |
| Analytical bounds source | `f4db3fa3af575e5ab8ce76b8ab945eecb4229cce816ed42262c5e8b8ee8e4806` |
| Enlarged diagnostic specification, unexecuted | `58d8359b746e5a34217b3501cf1b0e23d9861a042e7f1df5f37449e22d2b2a94` |
| New cover protocol | `87ca56027a4bd639a2b3093b4e22f7b1d529c6285fbc6f06877b54e4b8b2cfdb` |
| New cover driver | `c11c768092335bcf2b4d36540d1caa915623c50bcb995634933b6af735dc15ee` |
| Imported interval reference | `fc6a985d0b1e9e71fb6b03fb932296ec6d2173ec962833630108e67f49186145` |
| Imported coverage reference | `a5dee699e74b863db8d5f262a1fe5e89167e150e2183339c7e1375315f967c78` |
| `alternatives-screen-2026-10-05-width-large-cover-known.json` | `a4481ad021ca9f73936ef1227ee334e6844c914eab0cb9504779cf3ec8aead56` |
| `alternatives-screen-2026-10-05-width-large-cover-target.json` | `21103ed938bf43dc4fd3e9b2bafe813f779bd5236c2edff972ab9080932ffcd9` |

With the original interval known receipt already present, the new sequence from the repository root is:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-large-cover.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/binary-research/evidence/alternatives-screen-2026-10-05-width-large-cover.py target
```

A fresh receipt owner must first run the original interval reference's `known` mode. All sources retain their frozen assignment cutoff at 21:47:16 UTC. A later reproduction requires separately named successor outputs and an explicitly updated execution bound, preserving all frozen sources and receipts. Known-first order remains mandatory; timestamps and wall times naturally differ between runs.

## Limits and falsifiers

This is a complete boundary-circle radial exclusion on the exact numerical rectangle, with separate analytical subjects for the tails. It is not a statement about release from a chosen history, orbital capture, stability, noncircular dynamics, other polarity arrangements or other window/core laws. No spectrum was calculated. Smaller-radius higher-speed cases outside earlier certificates require separate accounting; they are not silently covered by the present rectangle.

Falsifiers include a balanced complete antipodal circle inside a certified box; an incorrect phase prefactor or channel sign; a nonzero age beyond the asserted support; failure of a documented outward arithmetic bound; omission of a corner-containing phase cell; or a gap in the exact root/leaf audit. No unresolved box exists in this target receipt. The final combined claim is deferred only to the coordinator's independent assessment, not to further numerical sampling.
