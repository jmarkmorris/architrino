IW4 is resolved. I found no new chunk-2 mathematical error.

**(a) What I read and verified**

I read the complete [subject](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20-inverse-weight.md), shared README, round-2 reply, author response, frozen first instrument and retained run records. I compared both documents with the specified retained round-2 files using `diff -u`.

I also read the seven accepted analysis sources named in the original request, the curved-window strength-difference note, the low-J, actual-correlation and signed-breathing reviews, manuscript §§9.4–9.7, and the canonical Master Equation passages covering emission-time transmitter weighting, per-hit acceleration, the all-root sum, partner/self contributions and zero-delay exclusion. Repository physics and review instructions were followed.

Opening and closing `wc -c` and `shasum -a 256` checks matched both supplied identities: **25,298 bytes** for the subject and **10,416 bytes** for the README. The retained baselines match the identities recorded in the response.

The complete subject diff contains **only the two IW4 prose replacements**, at lines 19 and 159. No equation, proof, constant, table or other claim changed. The README’s chunk-2 technical account is unchanged by the complete diff; its additions concern review records and chunk 3. I exclude the second instrument’s scientific claims from this disposition.

I independently reconstructed the derivations and checked the numbers using separately authored BigInt interval arithmetic with directed rounding and squared-bracket square roots. Exact known controls passed before targets. I neither imported nor executed the author’s instrument. No file was edited.

**(b) Claim-by-claim assessment**

| Claim | Assessment | Reason and scope |
|---|---|---|
| **IW4: input failure versus conclusion failure** | **Supported; resolved** | Both corrected passages distinguish invalidating an input and withdrawing dependent proof support from refuting a conclusion. Refutation additionally requires violation of that conclusion. |
| **Inverse-separation weight** | **Supported, derived** | Setting \(g=rG\) produces the explicit correlation term \(-\tfrac14\int\dot gQ\). Algebraically removing it for unrestricted positive separation requires \(G=C/r\). Particular-history cancellations remain possible. |
| **Theorem R** | **Supported, conditional derivation** | The gain, turning, straight-strength and curvature estimates reconstruct with the stated signs and factors. The endpoint allowance is \(w^2+2\Phi(w)\), independent of the number of periods, and vanishes after division by that number. Common-velocity recurrence is unnecessary. |
| **Corollary R.1** | **Supported, derived** | Constant separation makes the left side zero. Positive \(G\) at the speed-\(0.1\) floor excludes it at every separation; class nesting covers slower histories and every sign pattern of \(J\). |
| **Corollary R.2** | **Supported, derived** | Centering \(J^2\) gives the stated oscillation–variation inequality and \(\operatorname{osc}(J^2)\ge2G/w\). This concerns relative-periodic histories, not the nonperiodic half-line proposition M1. |
| **Corollary R.3** | **Supported, derived** | Centering \(1/r\), bounding \(|J\dot J|\), and applying the two bounds on \(L_d\) give both amplitude inequalities. The \(\kappa_b\) bound requires \(D>0\); positive amplitude information requires \(G>0\). |
| **Tables and worked numbers** | **Supported by independent interval arithmetic** | All **45 numeric cells** are conservative, including evaluation at the rounded heading \(36.63\). The worked amplitude bounds and negative floor value at \(w=0.11\) also pass. |
| **Remaining correlation and frozen ellipse** | **Supported at the stated scope** | The remaining scalar integral contains relative quantities only; this establishes no autonomous relative dynamics or existence result. Constant \(J\) makes the ellipse’s integral zero, contradicting the positive-\(G\) necessary condition. |
| **README’s chunk-2 arithmetic account** | **Supported; unchanged** | Inspection of the first instrument and retained records supports the distinction between internal rational bounds and nearest-rounded display strings. Those strings remain unsuitable as certified endpoints. |

Representative independent values, displayed approximately, are

\[
G(0.1,\mathrm{floor})=0.243772293254634,\qquad
G(0.1,10^4)=0.997124592328233,
\]

\[
\kappa_aG(0.1,10^4)=4.52293283268465,\qquad
\kappa_bG(0.1,10^4)=140.937931816224.
\]

The README’s serialization example also checks: `0.243772293255` exceeds the enclosed floor value by approximately \(3.6584\times10^{-13}\).

**(c) Numbered actionable corrections**

1. **IW4 — ✓ Resolved.** No further correction required.
2. **NEW — None within the requested chunk-2 scope.**

**(d) Overall disposition**

**ACCEPT.**

Acceptance covers the supplied corrected bytes and the conditional derivations and conservative numerical bounds. No solution history was sampled or evolved. Existence, general periodicity and wide eccentric recurrence remain unresolved. An admitted solution violating a necessary inequality, or an exact evaluation disproving a conservative bound, would reopen the affected result.

Next possible actions:

1. No further chunk-2 correction is recommended; the corrected-byte verification is complete.