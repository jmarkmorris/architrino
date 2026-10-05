# An exact mirror circle contained in the historical source enclosures

The retained initial source evaluation enclosures contain a separately declared complete mirror circle to which the accepted slow-binary dispersal theorem applies. Every initial position and velocity enclosure in the digest-bound refined checkpoint contains that circle, and its analytic evaluation enclosures contain the same coordinates and derivatives. A finite candidate request-control reconstruction reproduces the stored model fingerprints. These results establish enclosure containment and control-fingerprint parity; they do not identify the declared circle with the saved functional source or certificate. Full request/source binding and the saved nominal trajectory’s fate remain unavailable.

The ideal circle is a newly declared mathematical preparation, whose evaluation lies in the product of the retained initial enclosures. The historical circular metadata fix nominal token parameters; their interval conversion bounds evaluation error and does not create selectable physical input uncertainty. Containment therefore supplies no authority to replace the nominal phase with an exact antipodal phase. The nominal paths are provably nonmirror about every fixed center, and no dispersal conclusion follows for them or every function lying in the enclosure product. The [earlier applicability boundary](historical-binary-preparation-independent-adjudication.md) remains the boundary for the saved source. Later checkpoint segments and the radial dip are not certified here.

**Claim grade: derived subject with measured source-containment arithmetic, awaiting independent adjudication.** The selected equation is the unchanged inverse-square Master Equation, numerical $c_f=1$, all positive-delay roots included, no cap, receiver multiplier, event rule, environment or mass premise. The acceptance input is the [wider dispersal theorem](slow-binary-wider-regime.md) with its [independent adjudication](slow-binary-wider-regime-independent-adjudication.md). The investigation's Germund Dahlquist lens supplies no acceptance authority.

## 1. The source records and the separately declared ideal circle

The [August 11 account](../evidence/2026-08-11-physical-binary-retained-history-radial-turn.md#reproduction-record) binds the refined checkpoint by SHA-256. A separately authored reader in `.tmp/binary-exact-binding-author/containment.mjs` verifies its whole-byte checksum, schema, payload exhaustion and digest, then extracts only the initial negative-time segments for the mathematical comparison. Both paths have 30 consecutive cubic segments partitioning $[-3,0]$, with circular speed and angular-speed token `0.00033356409519815205`, radius token `1`, zero height and tilt, and phase tokens `0` and `3.1415926535897931`. Joint history is disabled. Later segments are traversed for payload integrity but have no role in the containment or fate claim.

Define $w=0.00033356409519815205$ as an exact decimal rational, choose the exact charge magnitude $q=0.1666666666666666666666666666666667$, and choose the exact coupling $\kappa=0.000016022161698524887$. Set $K=\kappa q^2$. The separately declared ideal complete supplied past is

$$
\mathbf X_+(T)=(\cos(wT),\sin(wT),0),\qquad
\mathbf X_-(T)=-\mathbf X_+(T),\qquad T\le0.
$$

This definition supplies correlated positions and velocities for the ideal preparation at every time. Its correlation follows from the displayed equality. It is not recovered from the saved source metadata or independent enclosure overlap. The complete negative-time circles are prescribed preparation; they need not solve the future equation. Release permits an acceleration jump.

The source evaluation has two complementary forms. A cubic segment encloses its polynomial coordinate with a position error pad and its derivative with a velocity error pad. An optional analytic-circle evaluator encloses the states determined by nominal circular metadata using outward-rounded decimal evaluation. The inspected historical `History.cpp` methods `CubicHistorySegment::position`, `CubicHistorySegment::velocity` and `RetainedHistory::uniform_circular_analytic_state` supply these semantics; the historical implementation copied for the previous source audit is preserved. Containment in both evaluation forms is the comparison proved here. It is not sufficient for functional source or certificate identity.

The statement here is explicit containment: the displayed ideal paths lie in the product of the initial evaluation enclosures. They are not established as admissible replacements for the history function fixed by the saved circular certificate. No later accepted enclosure is checked against their evolution. Application of the dispersal theorem to the saved source still requires a nonmirror theorem or an exact functional source identification meeting its hypotheses.

## 2. Containment over every initial segment

Write one recorded coordinate polynomial in local time $x=T-a$ as

$$
P(x)=c_0+c_1x+c_2x^2+c_3x^3,\qquad 0\le x\le h,
$$

where $a$ and $a+h$ are the exact recorded decimal segment endpoints. The selected circular coordinate has Taylor coefficients $f^{(j)}(a)/j!$ through degree three, and fourth derivative bounded by $w^4$. Define the signed coefficient differences $d_j=f^{(j)}(a)/j!-c_j$. Its position discrepancy is bounded by the cubic polynomial $\sum d_jx^j$ plus $w^4h^4/24$, and its velocity discrepancy by $d_1+2d_2x+3d_3x^2$ plus $w^4h^3/6$.

Using the sum of absolute power coefficients loses the cancellation built into the stored Hermite interpolation. Instead write each discrepancy in Bernstein form on $[0,h]$. Bernstein basis functions are nonnegative and sum to one, so their coefficient hull bounds the polynomial on the whole interval. The position coefficients are

$$
\begin{aligned}
b_0&=d_0,\\
b_1&=d_0+d_1h/3,\\
b_2&=d_0+2d_1h/3+d_2h^2/3,\\
b_3&=d_0+d_1h+d_2h^2+d_3h^3,
\end{aligned}
$$

and the velocity coefficients are

$$
v_0=d_1,\qquad v_1=d_1+d_2h,\qquad
v_2=d_1+2d_2h+3d_3h^2.
$$

The checker encloses each sine and cosine at $wa$ by its rational Taylor series through degree 18 with remainder at most $|wa|^{19}/19!$. All rational operations, comparisons and remainder bounds use BigInt numerators and denominators. The selected negative coordinate is the exact negative of the positive coordinate; its recorded nominal coefficients are checked separately. The third coordinate is identically zero. Nonzero coordinate error bounds are below nine tenths of their exact recorded decimal pads, leaving much more margin than binary64 conversion of a pad can remove. Interval decimal coefficients contain their exact decimal values, so this smaller core-and-pad comparison is sufficient for the actual outward interval evaluator.

The exact-rational target check returns the following whole-segment bounds. Ratios in the table are rounded upward for reporting; acceptance is by rational cross multiplication against $0.9$, not by the displayed decimals.

| Path | Largest position discrepancy / pad | Largest velocity discrepancy / pad | Whole initial interval |
| --- | ---: | ---: | --- |
| Positive | $<0.00414$ | $<0.20481$ | All 30 segments pass |
| Negative | $<0.02423$ | $<0.87081$ | All 30 segments pass |

These cover every coordinate at every time in the exact partition, including segment joins and the release endpoint. They prove containment of the separately declared common smooth path, rather than treating independently overlapping joins as a regularity or source-identity proof.

For the analytic-circle representation, the exact phase $\pi$ lies between the two binary64 neighbors enclosing the negative phase token. An independent rational Machin calculation gives

$$
3.141592653589793238462643383279<\pi
<3.141592653589793238462643383280.
$$

Here $\pi=16\arctan(1/5)-4\arctan(1/239)$ follows by the tangent addition formula, and alternating-series bounds enclose the two arctangents. Exact IEEE-754 rational conversion of the neighboring phase values shows that they bracket this entire interval. The exact $w$ and zero height and tilt lie in their respective decimal evaluation enclosures, and using that same $w$ for speed and angular speed gives ideal radius one. Interval extension then contains the ideal circle’s evaluations as well. This is a property of the outward evaluation hull. Its containing $\pi$ does not change the exact nominal phase token or authorize a selectable physical phase parameter.

**Claim grade: measured exact arithmetic supporting a derived containment argument.** Instrument: `node .tmp/binary-exact-binding-author/containment.mjs target`, over the initial source segments of the digest-bound refined checkpoint. Falsifier: a selected-coordinate discrepancy exceeding any recorded pad on its full segment, or a phase enclosure failing to contain $\pi$. The detailed rational checks and rounded diagnostics are in `containment-target.json`; later trajectory containment is outside the instrument's claim.

## 3. Request binding and its exact limit

The source audit recovered a historical instrument blob whose SHA-256 matches the August 11 account. Its `make_evolution_request` fixes normalized field speed one, sharp chart, opposite finite charge tokens and the ordinary vector evolution interface, with defaults from the historical `NativeCoupledEvolutionRequest`. Its physical-target entry point records the calibrated raw coupling above. The checkpoint's model fingerprint hashes these request controls and the path labels and charges; it does not hash path-history bytes, start/end time, run label or the complete compiled build. The checkpoint SHA binds the actual initial history bytes separately.

A newly authored token-framing FNV-1a implementation reconstructs the exact control sequence read from the historical `Checkpoint.cpp`, header defaults and matched driver. The reconstruction finds these matches:

| Retained checkpoint | Reconstructed controls differing between runs | Stored and reconstructed model fingerprint |
| --- | --- | --- |
| Early checkpoint | Root tolerance `9.9999999999999995e-08`, acceleration tolerance `1e-10`, minimum step `0.01`, maximum step `1` | `fnv1a64:1ab374e47854e699` |
| Refined checkpoint | Root tolerance `0.01`, acceleration tolerance `5.0000000000000003e-10`, minimum and maximum step `0.25` | `fnv1a64:20e78c45fdd01598` |

Both reconstructions use the coupling token `1.6022161698524887e-05`, exact opposite charge strings, no adaptive growth, no joint histories and all four default pinned/circular controls enabled. The latter controls do not add a speed ceiling or change the ordinary strictly subfield equation. The full serialized token lists are retained in `fingerprint-target.json`.

The fingerprint result supplies a source-linked request candidate that meets the checkpoint contract's model identity test. It closes the earlier inability to recompute that test from the declared coupling and historical controls. It is not recovery of a separately retained original launch manifest: FNV-1a is a 64-bit noninjective fingerprint, and matching it cannot prove uniqueness among every possible request or identify an unrecorded build. The candidate control list is consistent with the recorded coupling, matched driver and stored model identity. It is not a recovered complete launch request or a binding of its nominal source to the ideal circle. The ideal theorem application uses the coupling and unchanged law separately declared in Section 1. A claim about every request sharing that fingerprint, the provenance-complete August 11 executable or saved functional source identity would exceed the evidence.

**Claim grade: measured request-contract parity with a declared exact reconstruction.** Instrument: `node .tmp/binary-exact-binding-author/fingerprint.mjs target`; it checked 1920 candidates varying documented step choices, optional flags and growth state and obtained the displayed matches. This finite search establishes matches, not global uniqueness or parameter recovery. Falsifier: an independent token-framing reconstruction of the listed candidate producing a different fingerprint, or a source-controlled field missing from the copied hash order. The checksum and history SHA are separate from model parity.

## 4. Completing the past without changing any causal row

A finite history can be completed without affecting its future ordinary solution when all omitted source times remain causally inaccessible. This is an exact statement about roots, not a history truncation prescription.

**Lemma.** Let two complete supplied histories agree on $[a,0]$, have global physical source speed bounded by $b_0<1$, and positive release separation $d_{ij}(0)>0$ for different labels $i\ne j$. Same-label release separation is zero; positive-delay self roots are excluded separately by the strict chord inequality. Suppose

$$
-a>|\mathbf X_i(0)-\mathbf X_j(a)|
$$

for every ordered source-receiver pair whose roots are sought, including the same label. On any unique ordinary continuation whose receiver speed is bounded by $b_1<1$, all roots have emission time greater than $a$, and the two completed histories generate the same continuation until those ordinary/subfield conditions cease to hold.

For fixed reception $T\ge0$, define

$$
G_{ij}(S;T)=T-S-|\mathbf X_i(T)-\mathbf X_j(S)|.
$$

As emission time increases, this function is strictly decreasing, with slope at most $-(1-b_0)$ in the supplied past. The derivative-free Lipschitz inequality gives the same assertion when a spatial separation vanishes. At the omitted-history boundary,

$$
G_{ij}(a;T)\ge-a-|\mathbf X_i(0)-\mathbf X_j(a)|+(1-b_1)T>0.
$$

Therefore $G_{ij}(S;T)>0$ for every $S\le a$, so there is no omitted root. All root geometry and velocities are evaluated on the common retained interval or common constructed future. Ordinary method-of-steps uniqueness makes the two solutions coincide step by step. Self roots are excluded by the strict chord inequality for the globally subfield constructed path. The lemma does not license omission of roots for unrestricted-speed completions.

For the selected circle, take $a=-3$. Every selected past coordinate has norm one, so $|\mathbf X_i(0)-\mathbf X_j(a)|\le2<3$ for both labels. The source past speed is $w<1$. The accepted theorem bounds every future member speed by $4.01v_0<1$, so the lemma applies throughout the selected solution's whole future. The newly specified remote circular extension supplies the theorem's complete past and recent $[-7,0]$ interval, while no future root ever queries the added times $T<-3$. This completion does not assert that the historical certificate itself declared an infinite past.

**Claim grade: derived causal-equivalence lemma.** Falsifier: an emission root at or before $-3$ for the selected solution while the displayed boundary inequality and subfield margins hold, or failure of ordinary uniqueness on its admitted chart. An arbitrary fast omitted past is not covered.

## 5. Application to the separately declared ideal preparation

For the complete selected circle, set $v_0^2=K/4$, $\epsilon=v_0$, $s=v_0T$ and $\mathbf Y=\mathbf X_+$. In scaled time its angular-motion coordinate is $h_0=w/\epsilon$, and its eccentricity coordinate has norm $|h_0^2-1|$. A new exact-rational check with the separately declared parameter tokens proves

$$
0.00033356410<\epsilon<0.00033356411<1/2000,
\qquad |h_0-1|<3\times10^{-8},
\qquad |\mathbf e_0|<6\times10^{-8}.
$$

The entire selected past is smooth, its radius is one, its scaled speed is $h_0<2$ and its scaled acceleration is $h_0^2<8$. It satisfies every recent and complete-history hypothesis of the accepted theorem, including exact mirror correlation by its definition. Consequently its unique exact ordinary continuation has radius tending to infinity, finite total angle and convergent outward radial velocity whose limiting speed can be zero.

The separately declared ideal circle disperses, and its entire finite prefix is contained in the retained initial evaluation enclosures. Completing that ideal preparation before time $-3$ is causally irrelevant to its own continuation by Section 4. These results do not remove functional source/certificate identity or complete-history binding obligations for the saved source. The exact nominal phase defect prevents its direct identification with this mirror preparation. Full request/source binding, nominal-source dispersal and the numerical trajectory encoded by later checkpoint segments remain unavailable. The retained solver trajectory is not a correctness oracle for the ideal theorem application.

## 6. Why nominal exact mirror identification remains impossible

Interpreting the two stored phase tokens as exact nominal parameters gives phase difference $\Delta=3.1415926535897931$. The exact phase defect obeys

$$
-1.38462643383280\times10^{-16}<\Delta-\pi
<-1.38462643383279\times10^{-16}.
$$

The midpoint of the nominal two circles is

$$
\mathbf C(T)=\cos(\Delta/2)
\big(\cos(wT+\Delta/2),\sin(wT+\Delta/2),0\big).
$$

Its radius is nonzero because $\Delta\ne\pi$, and $w\ne0$ makes it rotate. Thus no fixed spatial translation turns these nominal histories into exact negatives of one another. A time-dependent subtraction of $\mathbf C(T)$ adds acceleration and changes the delayed geometry; it is not a symmetry of the selected equation. Completing earlier times cannot repair a failure already present on $[-3,0]$.

**Claim grade: derived nominal obstruction.** Falsifier: exact evaluation showing $\Delta=\pi$ modulo $2\pi$ or a constant midpoint for these same exact tokens. The enclosure containment of the separately declared correlated ideal circle in Section 1 does not overturn this statement. Nonmirror robustness of dispersal remains open.

## 7. Verification and preservation record

The final retained target observations were preceded by passing known controls. The arithmetic/containment controls include a synthetic v6 checkpoint with explicitly prescribed circular metadata and cubic coefficients, rejection of its truncated payload, exact rational addition and decimal conversion, exact sine and cosine at zero, the Bernstein coefficients $1,0,0$ of $(1-x)^2$, a wrong truncated sine value excluded by a rational Taylor enclosure, and the published FNV-1a `hello` value. The fingerprint controls include that same independent hash control, literal framed bytes `1:a2:bc` and distinction of differently partitioned token lists. These establish the listed instrument operations; the independent reviewer must check the mathematical containment, representation interpretation and causal argument separately.

Initial checkpoint-decoder diagnostics preceded a synthetic byte-format fixture and are excluded as verification evidence. The first added fixture omitted a coefficient token; it was corrected, and the decoder control then passed before a separate final target invocation. The final checker requires the fixture-success receipt, preventing acceptance through an older arithmetic-only receipt. No mathematical result is based on the initial decoder diagnostics.

An initial absolute-coefficient comparison was insufficient to establish negative-path velocity containment; its overestimate was replaced by the displayed Bernstein bound before making the claim. Zero-coordinate comparisons admit exact equality. No scientific reference or subject instrument was modified. Scratch diagnostics are not historical evidence repairs.

The protected-input inventory was machine-written before this new report. Final validation compares its inputs again, checks relative links and mathematical rendering, and freezes this report's identity for handoff. Only this report and `.tmp/binary-exact-binding-author/` are authored. No source metadata, phase token, previous report, evidence account, checkpoint, CSV, production solver, Python execution, shared queue, Git state or generated target is changed. Acceptance of this report must preserve the separate ideal preparation, product-enclosure containment, finite control-fingerprint parity, saved functional source identity and later-trajectory distinctions. The source-admission interpretation is withdrawn: neither the initial evaluation pads nor decimal-token conversion intervals authorize changing the saved nominal phase. The earlier subject and its receipt are retained in the authorized scratch before this adjudication repair.
