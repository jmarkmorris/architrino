**Overall disposition: ACCEPT AFTER CORRECTIONS.** The core centred-excursion estimate and E.3’s necessary inequality are supported. Every Section 3 table entry is conservative by independent interval arithmetic. Corrections are needed to recurrence qualifications, explanatory scope, the alternative-centre statement, output serialization, and falsifier wording.

**(a) What I read and verified**

I read in full:

- The [subject](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20.md), evidence README, complete instrument, and all three supplied run records.
- The accepted October 17 actual-common-motion note and its October 18 final review.
- The accepted low-angular-momentum note and its final review.
- The accepted signed-breathing note, including its auxiliary ellipse calculation.
- Manuscript §§9.6–9.7.
- AGENTS.md, the startup router, applicable theorem-review owner, and required communication/style policies.
- Canonical Master Equation passages covering the emission-time transmitter factor, per-hit acceleration, all-root sum, partner/self split, and zero-delay exclusion.

`wc -c` and `shasum -a 256` matched all six supplied identities; a closing hash check found those same identities. The three accepted-source hashes also match the supplied accepted prefixes and suffixes.

I reconstructed the mathematics by hand. Separately authored BigInt interval arithmetic used directed rounding at scale \(10^{65}\) and binary-search square roots. Known controls passed **before target evaluation**: signed rounding, negative multiplication/division, rational addition, exact and irrational square roots, and zero-speed constants. I neither imported nor reran the author’s instrument. No file was edited.

**(b) Claim-by-claim findings**

**1. Lemma E.1 — supported, derived.**

Writing \(B=P_\parallel P_\perp\), the rotating-frame equations give
\[
\dot Q=2H+4\dot\vartheta B.
\]
Then \(d=r\dot\vartheta=r_*\dot\vartheta+(r-r_*)\dot\vartheta\) immediately gives
\[
-\frac12\int dB
=-\frac{r_*}{8}[Q]+\frac{r_*}{4}\int H
-\frac12\int(r-r_*)\dot\vartheta B.
\]
All signs and coefficients are correct. Only positive \(r\) is divided by; zeros and sign changes of \(J\) cause no singularity. The identity itself is kinematic; replacing \(H\) by I6 invokes the dynamics.

**2. Theorem E.2 — supported as formally stated; Result item 2 needs its recurrence qualification.**

The individual estimates reconstruct correctly:

- **Boundary:** \(|Q|\le4w^2\) implies \(|[Q]|\le8w^2\), hence the allowance is exactly \(w^2r_{\min}\).
- **Constant weight:**
  \[
  c_-I_2\le\int A_r=\int d^2/r\le Q_d/r_{\min},
  \]
  so \(r_{\min}I_2\le Q_d/c_-\). Furthermore,
  \[
  r_{\min}I_3\le I_2\le\frac{Q_d}{c_-r_{\min}}
  \le\frac{4w^2}{c_-^2}Q_d.
  \]
  Inserting I6 therefore gives precisely \(mQ_d\).
- **Turning:** \(|B|\le2w^2\) and \(0\le1-r_{\min}/r\le\varepsilon_r\) give \(w^2\varepsilon_r|d|\).
- **Multiple periods:** periodicity of the bounding functions of \(r,d\) suffices. Periodicity of \(H,B,Q\) is unnecessary. No limit of \(K_2^{(N)}/N\) must exist.

The rigid-recurrence correlation formula is also correct, and its principal term is nonpositive because both \(r-r_{\min}\) and the principal numerator are nonnegative.

However, **Result item 2 states that boundary-free correlation formula without naming rigid recurrence**. For a general starting phase under relative recurrence, the integration by parts additionally produces
\[
\frac{r(0)-r_{\min}}8[Q]_0^{NT}.
\]
It vanishes under rigid recurrence, or when the interval starts at closest approach; otherwise it needs a boundary allowance or averaging. The formal theorem handles this correctly, but the summary does not.

This proof avoids the prohibited circular argument: it obtains an independently bounded residual turning weight rather than merely returning to the original \(K_2\) identity.

**3. Corollary E.3 — main inequalities supported, derived; maximum needs a domain qualification.**

The \(N\)-period primitive balance and E.2 give
\[
(D-m)Q_d\le(w^2\varepsilon_r+wz_0)L_d.
\]
Cauchy–Schwarz, together with \(L_d>0\), gives both stated mean bounds. The radial identity then gives
\[
c_-\langle r^{-2}\rangle
\le\frac{\langle d^2\rangle}{r_{\min}}
\le\frac{k_\varepsilon^2}{r_{\min}},
\]
which proves the stated lower bound on \(r_{\max}\).

The excursion inequality, its solved form, and its positive-numerator cutoff all follow correctly. Both limiting comparisons are correct:

- \(\varepsilon_r=0\) gives \(c_-/b'\).
- As \(\varepsilon_r\to1\), the new coefficient tends to \((w^2+wz_0)/(D-m)>k\), so this bound supplies no improvement over Theorem Z in that limit.

The displayed maximum is the maximum of the **formal scalar function over all \(\rho>0\)**. Its maximizer is
\[
\rho_*=\frac{c_-(D-m)^2}{4(wz_0)^2}.
\]
For a maximum over admissible closest approaches, one must also impose \(\rho\ge c_-/(4w^2)\). The displayed maximizer belongs to that domain precisely when \(D-m\ge z_0\). This holds at all three tabulated speeds, but is not implied merely by \(D>m\).

**4. Section 3 decimals — supported by independent interval verification.**

All **33 table comparisons**, including the below-floor entry, passed. These comprise the five bound columns and floor display at each speed, plus the excursion table entries.

For orientation, the independent enclosures give the following approximate values; the actual comparisons used interval endpoints, not these rounded displays:

| Quantity | \(w=1/10\) | \(w=1/20\) | \(w=1/100\) |
|---|---:|---:|---:|
| \(D-m\) | 0.1673751536465 | 0.7435327806964 | 0.9585963131093 |
| Positive-requirement cutoff | 4,043,686.12356 | 24,207,731,402.27 | \(1.7830505540712\times10^{16}\) |
| Formal peak requirement | 10,084.0684802 | 15,120,387.7978 | \(4.4575149500904\times10^{11}\) |
| Requirement at the exact floor | 121.042497146 | 5,093.09150149 | 930,078.053762 |

At \(w=1/10\), the other independently reconstructed requirements are approximately \(624.342909099\), \(1906.138499726\), \(5345.667854843\), and \(10083.772635772\). Thus the subject’s strict lower displays and worked \(r_{\max}\) and \(\varepsilon_r\) comparisons are conservative.

The nesting argument for applying the \(w=1/10\) result to slower histories is valid.

**5. Section 4 comparisons — supported in bounded form; several sentences need correction.**

**Complementarity is supported as a comparison between necessary scalar conditions.** For example, take \(r_{\min}=10^4\), \(r_{\max}=11000\), and \(\rho_1=0.001\). Since \(u\le10^{-4}\),
\[
c_-u<0.000146535,
\]
whereas every accepted slope is at least \(0.2\), giving \(a_f\rho_1+b_f\ge0.0002\). All three older lines are satisfied, while \(\Delta r=1000<1906.1384\ldots\) violates E.3.

This establishes logical separation of the inequalities. It constructs no Master Equation solution. “Many oscillations per period” alone does not establish the needed mean speed: frequency must be quantified relative to elapsed time.

**Other centres:** with \(a=r_{\min}\), \(b=r_{\max}\),
\[
\sup_r\frac{|r-r_*|}{r}
=\max\{|1-r_*/a|,\ |1-r_*/b|\}.
\]
The stated lower bound for \(r_*\le2a\) is valid, and the \(r_*>2a\) conclusions are valid. But the supremum is **not generally attained at the farthest separation**. For \(r_*=2a\), it is one at closest approach when \(b>a\).

The exact minimum over centres is attained at \(r_*=2ab/(a+b)\), with value \((b-a)/(a+b)\). This still tends to one as \(b/a\to\infty\), supporting the asymptotic obstruction, while permitting finite-ratio improvement.

**Remaining scope:** eccentric wide histories remain uncontrolled, but they are not the entire remaining class. When \(r_{\min}\) exceeds E.3’s cutoff, this amplitude condition also leaves small-excursion histories uncontrolled. Moreover, the auxiliary ellipse’s scalar balance can be met at arbitrarily small positive eccentricity by increasing \(J\). The word “exactly” in the claimed association with order-one excursion is therefore unsupported.

The frozen ellipse is correctly identified as an auxiliary comparison, not a solution.

**6. Grading and prohibited premises — substantially supported, with scope and falsifier corrections.**

The derivations use acceleration-first actual-row inputs, \(c_f=1\), and no mass, force, energy-conservation, mirror-symmetry, constant-common-velocity, conserved-\(J\), or observer-level premise. No sign transfers between differently weighted integrals occur. The pointwise I6 argument extends through \(J=0\) without importing its older integrated inverse-\(J\) chart.

“Derived” is appropriate for the reconstructed inequalities, conditional on their accepted inputs. The continuous statements are mathematical derivations; numerical verification covers the three declared speeds. No history was sampled or evolved.

The falsifier sentence saying that a counterexample to an input “refutes every statement that uses it” is logically too strong. It invalidates that input and withdraws dependent proof support; a dependent conclusion is refuted only if a counterexample also violates that conclusion.

**7. Instrument and README — rational calculations supported; serialized bound labels need correction.**

The square-root brackets and chunk-1 endpoint choices are conservative before formatting. The excursion expression decreases with \(wz_0\) and increases with \(D-m,c_-\). Using the lower floor is also safe for these targets: each floor lies below the peak, on the increasing branch.

Code order and both outputs confirm K0–K5 precede the target calculations. K3–K5 are correctly described as regression checks.

However, [`dec()`](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/binary-research/evidence/saturday-binary-correlation-travel-2026-10-20/correlation_travel_constants.py:129) converts fractions to floating point and formats to nearest. Consequently the serialized `_lo`/`_up` strings are not certified endpoints. At \(w=1/10\):

- `Dm_lo = 0.167375153647` exceeds the true \(0.167375153646506938\ldots\).
- `wz0_up = 0.000100756305184` is below the true \(0.0001007563051842415\ldots\).

This does **not** invalidate the independently confirmed, coarser subject tables.

The supervisor record supports the stated command, times, exit zero and process-group closure. `wc -c` confirms the named error files are empty; `cmp` confirms `run1.out` equals the supervisor stdout log. The supplied records document one run, but contain no as-run source digest establishing independently that the instrument remained unchanged afterward.

**(c) Actionable corrections**

1. **○ Not done — E-RC:** Qualify Result item 2’s boundary-free correlation formula with rigid recurrence. Express the general averaged \(K_2\) statement using \(K_2^{(N)}\) or a limsup, without implying periodic common motion.
2. **○ Not done — E-SC:** Make the positive-amplitude claim conditional on \(D>m\) and closest approach below the cutoff. State rapid-breathing complementarity as scalar compatibility with the explicit mean-speed threshold; acknowledge sufficiently wide small-excursion histories as uncontrolled. Qualify the formal maximum by its admissible-floor condition.
3. **○ Not done — E-CT:** Replace “attained at the farthest separation” with the endpoint-maximum formula. Limit “no other centre rescues” to the large-\(r_{\max}/r_{\min}\) asymptotic statement.
4. **○ Not done — E-AR:** Explain in the README that the retained JSON/stdout contain nearest-rounded diagnostics, not outward-rounded endpoint certificates. Preserve the frozen instrument and original outputs; do not treat their `_lo`/`_up` strings as rigorous bounds.
5. **○ Not done — E-FL:** Replace “refutes every statement that uses it” with “invalidates the input and withdraws dependent proof support,” unless the counterexample also violates the dependent conclusion.

**(d) Overall disposition**

**ACCEPT AFTER CORRECTIONS**, at bounded derived scope: E.1, E.2, E.3’s principal necessary inequality, and all Section 3 table entries are supported. Acceptance establishes neither a repeating history nor general periodicity exclusion. The corrections concern qualifications and evidence presentation; they require no change to the principal inequalities or tabulated bounds.

Next possible actions:

1. **○ Not done — Recommendation: apply E-RC–E-FL, then request corrected-byte verification.** Preserve the frozen computation; the required work is confined to the identified statements and their evidence account.

