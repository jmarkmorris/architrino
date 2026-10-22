**ACCEPT AFTER CORRECTIONS.** The principal mathematics and all Section 3 table entries remain supported. E-RC, E-CT, E-AR and E-FL are resolved. E-SC is partially resolved: the opening still overstates the amplitude conclusion, and the revised example introduces an unsupported oscillation-count claim.

**(a) What I read and verified**

I read in full the corrected subject, shared README, frozen instrument, retained round-1 subject and README, round-1 request/reply, author’s response, and the three run records.

I also read the accepted actual-common-motion, low-angular-momentum and signed-breathing notes, the first two notes’ final reviews, manuscript §§9.6–9.7, and the canonical Master Equation passages covering emission-time transmitter weighting, per-hit acceleration, the all-root sum, partner/self separation and zero-delay exclusion. Repository startup, physics and review instructions were followed.

`wc -c` and `shasum -a 256` matched every supplied current identity; SHA-256 checks matched both retained originals and the accepted-source identities. A closing hash check confirmed unchanged review targets.

Full `diff -u` comparisons show that **the principal inequalities, constant definitions and tables did not change**. The subject changes concern the requested qualifications and explanations; the README adds the serialization paragraph and review rows. The instrument and retained outputs match their round-1 hashes.

I reconstructed the derivations by hand and independently evaluated the numerical claims using separately authored BigInt interval arithmetic with directed rounding at scale \(10^{70}\). Arithmetic, square-root and zero-speed controls passed before target evaluation. I did not run the author’s instrument or edit any file.

**(b) Claim-by-claim findings**

| Claim or correction | Finding | Reason |
|---|---|---|
| Lemma E.1 | **Supported — derived** | Substituting \(\dot Q=2H+4\dot\vartheta P_\parallel P_\perp\) into \(d=r_*\dot\vartheta+(r-r_*)\dot\vartheta\) reproduces every sign and coefficient. No division by \(J\) occurs. |
| Theorem E.2 | **Supported — derived** | The boundary allowance, constant-weight estimate and turning estimate reconstruct independently, as detailed below. |
| E-RC | **Resolved** | Result item 2 now declares rigid recurrence for the boundary-free formula and uses \(K_2^{(N)}\) for relative recurrence. The added general-phase boundary term has the correct sign and bound. |
| Corollary E.3 | **Supported — conditional derivation** | The primitive balance, averaging and Cauchy–Schwarz yield the stated mean bounds and excursion inequality when \(D>m\). |
| E-SC | **Partially resolved** | The numbered results and formal maximum now have the necessary qualifications. The opening remains unconditional, and the worked example adds an unjustified oscillation-count assertion. |
| Section 3 decimals | **Supported — independently checked arithmetic** | All 33 comparisons pass, including the below-floor entry. No history is sampled or evolved. |
| E-CT | **Resolved** | The endpoint maximum and optimal centre are correct; the obstruction is appropriately limited to the large separation-ratio asymptotic. |
| E-AR | **Resolved for chunk 1** | The README correctly distinguishes exact internal rational bounds from nearest-rounded serialized displays. The coarser subject tables remain conservative. |
| E-FL | **Resolved** | Both corrected passages distinguish withdrawing dependent proof support from refuting a dependent conclusion. |
| Physics premises and grading | **Supported at the declared scope** | The argument uses the accepted acceleration-first inputs, \(c_f=1\), and no imported conservation law, mass premise, mirror symmetry, conserved \(J\), or periodic common velocity. |

For **E.2**, the independently reconstructed estimates are
\[
r_{\min}I_2\le \frac{Q_d}{c_-},
\qquad
r_{\min}I_3\le \frac{4w^2}{c_-^2}Q_d.
\]
They give exactly \(mQ_d\). Also,
\[
\frac12\left|(r-r_{\min})\dot\vartheta
P_\parallel P_\perp\right|
\le w^2\varepsilon_r|d|.
\]
Only the bounding functions of \(r,d\) must recur. The common-motion integrands need not recur.

For **E-RC**, integration by parts over \(N\) periods contributes
\[
\frac{r(0)-r_{\min}}8[Q]_0^{NT}.
\]
Its magnitude is at most \(w^2(r(0)-r_{\min})\), so its contribution per period tends to zero. It vanishes exactly when the interval begins at closest approach. The correction introduces no mathematical error.

For **E.3**, averaging gives
\[
(D-m)Q_d\le (w^2\varepsilon_r+wz_0)L_d.
\]
The radial identity then yields
\[
r_{\max}\ge \frac{\sqrt{c_-r_{\min}}}{k_\varepsilon},
\]
and hence the displayed excursion inequality. The positivity cutoff, formal maximizer and both limiting comparisons are correct. The maximizer lies **at or above** the floor precisely when \(D-m\ge z_0\); independent intervals confirm this at all three tabulated speeds.

Representative independent values are:

| Quantity | \(w=1/10\) | \(w=1/20\) | \(w=1/100\) |
|---|---:|---:|---:|
| \(D-m\) | 0.1673751536465 | 0.7435327806964 | 0.9585963131093 |
| Positive-requirement cutoff | 4,043,686.12356 | 24,207,731,402.27 | \(1.7830505540712\times10^{16}\) |
| Formal peak requirement | 10,084.0684802 | 15,120,387.7978 | \(4.4575149500904\times10^{11}\) |
| Requirement at exact floor | 121.042497146 | 5,093.09150149 | 930,078.053762 |

The actual comparisons used interval endpoints, not these rounded displays.

For **E-SC**, the scalar complementarity example is now valid:
\[
c_-\langle1/r\rangle
\le \frac{c_-}{10^4}
<1.4654\times10^{-4},
\]
whereas every accepted right side is at least \(0.2(0.001)=2\times10^{-4}\). An excursion no larger than \(1000\) violates the new requirement exceeding \(1906\).

However, [the worked reading, line 119](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20.md:119) says this mean speed “needs many radial oscillations per period.” That does not follow. For \(n\) full monotone out-and-back excursions,
\[
\langle|\dot r|\rangle=\frac{2n\Delta r}{T}.
\]
With \(\Delta r=1000\), one oscillation over \(T=2{,}000{,}000\) already gives \(0.001\). This is a kinematic counterexample to the explanatory assertion, not a Master Equation solution.

Separately, [the unchanged opening, line 5](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20.md:5) still says every repeating history in the subwake class must breathe with a minimum amplitude. The proved positive requirement needs both \(D>m\) and closest approach below the cutoff. The corrected body does not support that unconditional opening.

For **E-CT**, direct minimization confirms
\[
\min_{r_*}\max\{|1-r_*/a|,\ |1-r_*/b|\}
=\frac{b-a}{a+b},
\qquad r_*=\frac{2ab}{a+b}.
\]
The auxiliary ellipse statement is also correctly broadened: its scalar balance can hold at small positive eccentricity with sufficiently large \(J\). It remains an auxiliary comparison with no demonstrated solution.

For **E-AR**, independent evaluation confirms the README’s example:
\[
G_{\mathrm{floor}}=0.243772293254634\ldots,
\]
so the serialized `0.243772293255` lies approximately \(3.66\times10^{-13}\) above it. The serialization warning is accurate. The supervisor record supports the recorded command, timing and exit status; `wc -c` confirms empty error files, and `cmp` confirms the stdout copy. The supervisor still contains no embedded source digest, so execution-time source identity remains a provenance limitation rather than an independently authenticated fact.

**(c) Actionable corrections**

1. **○ Not done — E-SC-LEAD:** Qualify the opening’s amplitude claim with \(D>m\) and \(r_{\min}<c_-(D-m)^2/(wz_0)^2\). Make the exclusion statement refer to amplitudes below the derived requirement. The opening must agree with Result item 3 and the Limits section.
2. **○ Not done — E-SC-OSC:** Delete “which needs many radial oscillations per period” from line 119, or supply a declared period and a quantitative count. The scalar comparison needs no oscillation-count assertion.

**(d) Overall disposition**

**ACCEPT AFTER CORRECTIONS.** The mathematical core and conservative tables retain bounded support. No new error was found in the principal derivations; the revised example introduces one explanatory error, and the opening retains one scope overstatement.

The inequalities are derived conditional on the accepted inputs and stated recurrence class. Numerical verification covers the three declared speeds. Nothing establishes an actual repeating history, general periodicity exclusion, or control of every wide or strongly eccentric history.

Next possible actions:

1. **○ Not done — Recommended:** Apply the two prose corrections and request corrected-byte verification; preserve the principal mathematics, tables, instrument and outputs.