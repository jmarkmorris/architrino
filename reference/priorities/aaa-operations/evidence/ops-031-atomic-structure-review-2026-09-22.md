# OPS-031 — Atomic Structure review, 2026-09-22

## Scope and disposition

✓ Full report-only review of [Atomic Structure](../../../../content/markdown/aaa/nuclear-atomic/atomic-structure.md). All 884 source lines were read in consecutive `sed` windows 1–220, 221–440, 441–660, and 661–884. `shasum -a 256` returned `211304166faf077387833dee25256f893619053e2b3b8034e3dd27c313925d27` before review; that is also the final source hash recorded by the [September 12 repair receipt](../../aaa-corpus-rewrite/evidence/crw-005-atomic-structure-review-2026-09-12.md). Scoped `git --no-optional-locks status --short` showed no target edits. The corpus source and shared records were not edited.

Two medium-severity findings and one low-severity dependent wording correction are proposed below. None authorizes implementation or reopens CRW-005. One accepted repair was rechecked against preserved before/after text and independent mathematical reasoning. The present reviewer is the existing Codex worker `ops_031_noether_sea`, reassigned as OPS-031 Atomic Structure reviewer; this is the same model lineage, with no new-model adoption or superiority claim. Review duration and operator burden were not measured.

AGENTS, generated router, review skill owner and corpus-reviewer were read live. The periodic-review procedure and the previously read academic, mathematical, terminology and source policies govern the pass. Nearby source checks were scoped to Braid Envelope Geometry's tolerance and membership definitions, Noether Sea's membership-versus-equilibrium distinction, Nucleon Structure's claim boundary, Atomic Spectra's opening recovery scope, and Condensed Matter's current iron-transfer comparison. These are dependency checks, not full coverage of the neighboring chapters.

## ASR-01 — Medium: the tolerance supremum does not protect every smaller perturbation

**Location:** lines 333–349. The chapter defines the squared admissible tolerance as the supremum of squared individual perturbations whose readout residual passes. A largest passing perturbation is not a guaranteed safe radius when the readout is nonmonotone or its acceptance set is disconnected. Using that radius in a normalized channel test can accept smaller perturbations whose actual readout fails.

**Independent counterexample:** let the dimensionless perturbation be $x$, the declared local chart be $[-3,3]$, and the readout residual be $\Delta(x)=|x(x-2)|$ with tolerance $1/4$. This is a smooth polynomial readout followed by the usual magnitude, with zero baseline residual. The perturbation $x=2$ passes, so the chapter's supremum gives $\epsilon\ge2$. But $x=1$ has residual one and fails the declared readout tolerance, despite lying strictly inside that radius. This construction uses no physical law, simulation or fitted medium model; it checks the general mathematical definition. Calling the chart local does not eliminate the problem unless an additional connectedness/monotonicity restriction is stated.

There is also a distinction between an infinite accepted supremum and insensitivity: a periodic residual such as $|\sin x|$ accepts arbitrarily large multiples of $\pi$ while rejecting many intermediate values. The text says the supremum *may* be infinite for an insensitive readout, which is true, but the resulting radius must not be used to identify an unconstrained direction without the stronger condition.

**Smallest proposed correction:** retain the declared chart and baseline, and define the safe tolerance as the largest radius for which every allowed perturbation in the symmetric interval passes. For perturbation domain $\mathcal D$ containing zero, a precise candidate is

$$
\epsilon=\sup\{r\ge0:[-r,r]\subseteq\mathcal D\ \text{and}\ \Delta(x)\le\Delta^{\mathrm{tol}}\ \text{for every}\ |x|\le r\}.
$$

An independently established star-shaped acceptance set with the required radial monotonicity is another valid route. If the intended object is merely the full accepted set, keep it as a set and do not compress it into a safe scalar radius. A zero radius and an unbounded safe radius need explicit handling before dividing by the resulting scale.

Coordinator adjudication: the polynomial witness gives residual zero at two and one at one, directly confirming the failure of the current implication. The proposed universal-radius definition is a sound route, but accepting perturbations exactly at its supremum also needs endpoint admissibility (for example, a closed chart and continuous residual), or a strictly smaller certified radius. For a symmetric scalar radius, acceptance must hold for both signs; a one-sided interval alone is insufficient. These are proposed definition conditions, not an accepted implementation.

**Claim grade:** derived mathematical counterexample; inferred implementation recommendation. **Falsifier:** a declared admissible chart and proof that every smaller perturbation passes whenever a larger one passes would make the existing supremum a valid radius on that domain. The chapter supplies no such premise.

**Shared definition:** scoped `rg` and direct reads find the same supremum in [Braid Envelope Geometry](../../../../content/markdown/aaa/noether-braid/braid-envelope-geometry.md), lines 565–593. Its prose expressly interprets the result as how far a retained entry can move before exceeding tolerance. Coordinate any accepted repair with that existing owner; this receipt does not claim a corpus-wide consumer inventory or authorize a family rewrite.

## ASR-02 — Medium: the phase-preference comparison needs the temperature and common-inventory contract already present in its downstream owner

**Location:** lines 752–786. The function arguments use bare $T$, which elsewhere in the chapter is absolute time, without defining the thermodynamic variable. The subtracted objects are described interchangeably as branch free energies or chemical potentials, but a physical phase-preference difference also needs a common extensive or per-particle normalization and a declared transferred inventory. That matters particularly when comparing iron with a silicate phase. The partial derivative is described as being along a planetary branch without stating which other independent variables remain fixed.

The directly linked [Condensed Matter comparison](../../../../content/markdown/aaa/nuclear-atomic/condensed-matter.md#earth-core-iron-as-a-boundary-case), lines 657–694, already supplies the relevant contract: $T_{\mathrm{temp}}$ denotes temperature; both potentials concern the same transferred iron inventory, common per-nucleus reference and specified hosts; pressure, temperature and composition remain fixed in the partial derivative. The general Atomic Structure handoff should preserve those conditions.

**Independent checks:** quantities per atom and per formula unit cannot be subtracted to express the same transfer without converting their inventory basis. Algebraically, dimensionless comparison functions $\mu_E(n)=-2n$ and $\mu_Y(n)=-n$ give a difference derivative of $-1$; arbitrarily tripling only the comparison inventory gives $+1$. A physical preference cannot change because one side was silently counted in three-unit batches. This is an illustration of missing normalization, not an iron/silicate model. Likewise, for $\Delta\mu(n,P)=P-2n$, the partial derivative at fixed $P$ is $-2$, whereas along $P=3n$ the total derivative is $+1$. The sign of one does not establish the sign of the other.

**Smallest proposed correction:** use the existing $T_{\mathrm{temp}}$ symbol for thermodynamic temperature and define it locally; state the common inventory and energy basis before subtraction; state the held-fixed variables for $\partial_n$. For a chemical preference, use potentials for the same transferred species, as the current Condensed Matter owner does. If absolute-time dependence is also intended, retain it as a separate argument rather than silently overloading temperature. Keep the inequality a constitutive target and preserve the distinction between decreasing relative cost and actual phase stability.

**Claim grade:** measured owner mismatch by direct source comparison, with derived normalization and chain-rule examples. **Falsifier:** an explicit same-inventory normalization, separate temperature definition and fixed-variable convention in this passage would remove the ambiguity; alternatively an explicitly time-dependent nonthermal functional would change the required symbol repair. No physical phase preference is derived by this review.

## ASR-03 — Low: the consumer calls an energy gap a stability gap

**Location:** the element-property table at line 699 and the definition at line 750 call the imported $C_{\mathrm{shell}}$ a “shell-stability gap.” The owning Atomic Spectra definition at lines 349–377 explicitly calls it a conditional energy-gap diagnostic and says it does not establish perturbative stability. The coordinator identified this direct-consumer mismatch during its independent Atomic Spectra review; this worker confirmed both live passages and the preserved AS-08 receipt.

**Independent distinction:** a list of branch energies contains no linearized evolution operator or compatible-history perturbation law. The same two labels with energies zero and one can be paired mathematically with a local perturbation equation $\dot x=-x$ or $\dot x=x$; the energy list is identical while perturbations respectively decay or grow. This is a counterexample to inferring dynamical stability from the listed gap alone, not a physical atom model. Any dynamics-to-energy stability theorem would be additional evidence.

**Smallest proposed correction:** use “conditional shell energy gap” in the table and in the $C_{\mathrm{shell}}$ definition, retaining the owner link and explicitly separating dynamical stability where the tensor response uses it. **Claim grade:** measured owner/consumer wording mismatch with a derived insufficiency argument. **Falsifier:** a separately established stability theorem on the same admitted branch and compatible-history class would support a stronger stability interpretation. This is a small propagation correction, not evidence that the existing energy definition is wrong or that any atom is unstable.

## Accepted-repair survival check

✓ AS-02 from September 12 survives. `git show 4a8e760ba:content/markdown/aaa/nuclear-atomic/atomic-structure.md`, lines 354–362, preserves the old assertion that the corridor is the “strictest hydrogen constraint.” The live line 360 instead calls it a “distinct hydrogen constraint,” while retaining the color, provenance, direction and matter-ledger inclusion tests. This matches the recorded accepted repair.

The independent reason is that channel acceptance sets need not be nested. For two dimensionless retained coordinates, a clock test can require $|x|\le1$ while a corridor test requires $|y|\le1$. The record $(2,0)$ passes only the corridor test; $(0,2)$ passes only the clock test. Neither test is inherently strictest without a common ordering theorem. The replacement therefore preserves the corridor's specific obligations while removing unsupported ranking. Mathematical correctness, intended meaning and explanatory usefulness survive this check. A proved shared normalization and nested acceptance ordering would support a future stronger statement; the present chapter explicitly disclaims that ordering at line 172.

This sampled repair remains distinct from ASR-01's scalar-radius issue. Neither finding is attributed to Claude, Codex or the last editor: no last-matching/first-mismatching history audit was performed for the newly proposed findings.

## No-change dispositions and remaining limits

- The opening explicitly treats the account as a provisional mapping, not a substrate derivation of chemistry. The nucleon stability qualifier agrees with the current Nucleon Structure owner; no primitive mass or retained-branch certification follows from it.
- Hydrogen's four charged-fermion assembly inventory is an expressly declared model resolution. The proton's strong-sector corridor is retained in the matter record, and the electron envelope remains distinct from the electron's internal braid boundary. No literal elementary-quark census beyond that scope is inferred.
- The transmitter acceleration weight remains $c_f/|D_t|$, while receiver motion is reserved for root playback and path-rate diagnostics. No numerical wake-speed instantiation was introduced.
- The atomic/proton coarse windows remain conditional on an actual scale separation. An unavailable proton window is explicitly rejected rather than used approximately. The later scan defines its chosen $I_X$ before quantifying over it.
- Resolution-readout agreement remains a proof target, not independent evidence of a physical atom. Geometry regularity, cadence/balance classification and dynamical persistence are different obligations. The linked Noether Sea text explicitly distinguishes membership from equilibrium; the chapter's “equilibrium test” language must be interpreted at that restricted diagnostic scope, never as a new stability proof.
- Orbital labels are observer recovery targets and are separated from internal spin. The final angular residual slots are explicitly unfinished. Periodicity alone does not establish the spectrum, and the chapter requires the angular-operator and label-domain checks as well.

No optional stylistic rewrite is proposed. No reference acquisition, new instrument, EOM run, full-repository test, generated write or publication was needed for these direct algebra and owner-contract checks. The full source review does not certify all linked chapters, all rendering surfaces, physically realized assembly branches, channel calibration or a completed atomic spectrum. Only this evidence receipt was written; the coordinator owns the follow-up routing and coverage records.
