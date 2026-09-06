# Geometry Panel Collation: Six Specialist Reviews of Sections 1–11

**Collation identifier:** `FSC-001-PANEL-2026-08-02` **Date:** 2026-08-02 **Scope reviewed:** [mathematics packet](../analysis/mathematics-geometry-dynamical-system.md), Sections 1–11 only **Claim level:** collation of review findings; nothing adopted or advanced **Panel (each review captured in its own file):**

| Reviewer | File | Findings |
| --- | --- | --- |
| Bill Thurston (2nd) | [bill-thurston-second-review-2026-08-02.md](bill-thurston-second-review-2026-08-02.md) | BT2-1…10 |
| Germund Dahlquist | [germund-dahlquist-review-2026-08-02.md](germund-dahlquist-review-2026-08-02.md) | GD-1…20 |
| Hassler Whitney | [hassler-whitney-review-2026-08-02.md](hassler-whitney-review-2026-08-02.md) | HW-1…18 |
| Jack K. Hale (2nd) | [jack-k-hale-second-review-2026-08-02.md](jack-k-hale-second-review-2026-08-02.md) | JKH2-1…15 |
| Lars Hörmander (2nd) | [lars-hormander-second-review-2026-08-02.md](lars-hormander-second-review-2026-08-02.md) | LH2-1…13 |
| Ramon E. Moore | [ramon-e-moore-review-2026-08-02.md](ramon-e-moore-review-2026-08-02.md) | REM-1…14 |

Each reviewer worked independently from the current document text and (for second reviews) their own prior disposed response only. All six independently re-verified the load-bearing computations; none found an error in the core analytic content of Sections 4–11 (Dottie constants, root factors, ledger components, λ-family, helix negative result, transfer identities, collinear transport). Every error found is a rule-consistency, statement, census, or final-digit defect, not a derivation failure.

Plainly: six different kinds of mathematician re-derived the numbers and the formulas and got the same answers the document displays. What they caught instead are places where two stated rules disagree, where a claimed list of cases was never proved complete, and where the supporting definitions have not kept up with the newest sections.

## A. Convergent findings (multiple independent reviewers)

### A1. The frozen-root contradiction (HW-1, JKH2-1, LH2-1; refined by BT2-2) — top priority

Four reviewers independently flagged the same internal inconsistency: the Section 9 isolated-crossing rule and catalogue row 1 (isolated, positive delay, $D_t\ne0$) admit the frozen root ($D_r=0$) as an ordinary row, while the swept-source law of 10.9 classifies it inactive. Two co-stated laws give opposite dispositions on the decisive stratum. Repairs supplied: add a receiver-side clause to the admission rule and retype the catalogue so strata are disjoint (HW-1 shows row 1 currently overlaps the frozen case). **Nuance (BT2-2):** the repair must distinguish an isolated receiver-tangency instant (harmless, finite density) from a frozen *interval*; a blanket $D_r\ne0$ exclusion overshoots. BT2-3's frozen-interval rigidity theorem (riding one front forces a straight exact-recede ceiling ray) supplies the geometric characterization the corrected rule should quote.

### A2. Monotone-clock staircase unification (BT2-9, HW-11, JKH2-13, LH2-12/13)

Four reviewers independently converged on the same structural reformulation: per ordered channel, the received-history clock $S(T)$ is monotone under the ceiling, and the event catalogue is exactly the Lebesgue decomposition of its Stieltjes measure — absolutely continuous part = ordinary rows, flat parts = frozen/co-moving silence, jumps = event atoms (the FSC-006 endpoint object is one staircase corner). Consequences claimed independently: frozen-branch inactivity becomes a theorem in the pushforward formulation (JKH2-12); the mirror divergence localizes to the single staircase corner abutting the zero-delay diagonal (HW-11, LH2-13); the singular-continuous clock component is presently untyped and unowned (BT2-9, HW-14 via analyticity clause, JKH2-13). This is the panel's highest-leverage adoption candidate.

Plainly: one monotone bookkeeping function per channel already contains the whole taxonomy of receptions, silences, and events. Writing the law in terms of that function turns three separate conventions into one object and pins the only real singularity to one corner of one staircase.

### A3. FSC-006 weak-* target is provably unattainable as typed (LH2-8, LH2-9; supported by HW-11)

LH2-8 proves the endpoint weak-* limit target, as typed in finite vector-Radon spaces, is empty and should be retargeted to local convergence plus a parameterization-independent **endpoint variation residue** $K/(2c_f^2)$ (LH2-9, numerically verified), which doubles as an operator-checkable family-independence test. The queue item should be rewritten, not attempted as stated.

### A4. Free-data status of the frozen-branch disposition (LH2-11 vs JKH2-12 — complementary, not contradictory)

JKH2-12: in the source-time pushforward form of the sweep law, frozen-branch nullity is a theorem. LH2-11: a second, regular-consistent conormal extension with nonzero frozen marginal also exists, so the *choice of formulation* is genuinely free foundational data. Read together: the postulate content is the selection of the pushforward form itself; given that selection, nullity is derived. The document should state the freedom at exactly that level.

### A5. Helix negative result: census gap, proofs supplied (BT2-5, JKH2-4, LH2-4)

Three reviewers independently found the same gap — the two-row ledger census behind the Section 11 helix exclusion is asserted, not proved — and all three supplied short proofs (strict chord inequality; four-line census; one-line versions). JKH2-4 also catches a dropped absolute value in the $\xi=\lambda\cos\xi$ reduction. Mechanical to close; should be closed with one of the supplied proofs.

### A6. Section 5 obligations and topology lag the new sections (JKH2-3, LH2-2, LH2-3, HW-4, HW-5, GD-6)

The declared history class and candidate topology have not been updated for the sweep law: missing clock-regularity and frozen-boundary-continuity obligations (JKH2-3); the topology on $U$ ignores delayed emission data outside $U$ — a delay window must be declared (LH2-2); BV velocities need declared left-continuous representatives before any pointwise factor or trace is well defined (LH2-3); local finiteness fails in the declared Lipschitz/BV class (Cantor-contact clocks) without a finite-switching or analyticity clause (HW-4); "generic" is used with no framework, and the declared weak topology cannot see the transversality floor (HW-5); the root-stability lemma is position-only while velocity atoms can break ledger continuity (GD-6).

### A7. Stale renumbering debris and mechanical defects (BT2-1, JKH2-2, LH2-6, HW-7, HW-8, HW-10, JKH2-9)

"Section 3"/"Section 7" cross-references in 10.3/10.7 predate renumbering; the split "define" sentence in Section 4 persists; $H$ in "$H(0)=0$" is undefined; the catalogue lacks codimension/closure columns; 11.1 forward- references an equality chart defined later; the λ-family provenance row is missing from Section 3's status map.

### A8. Certification and the numerical contract (REM-1/2/3/10, GD-1/3/4/5/7)

Two outright decimal errors: the Dottie decimal's last digit (…607 → …606) and $R_\ast$ off by two ulps — the latter recurring in Section 12 (out of panel scope but flagged for the next pass). REM-10 delivers certified interval-Newton enclosures with outward rounding for $D$, $\theta$, $\sin D$, $R_\ast$, $\omega_\ast$, and the λ-family values; REM-3 asks every displayed decimal to carry method/precision/rounding provenance. GD-1 (graded ERROR) shows the reorder-invariance falsifier is unsatisfiable by any floating-point implementation as worded and supplies the tolerance/exact-accumulation clause. GD-3/4/5/7 specify the missing numerical contract: convergence order, quadrature clause, range/delay floors, and boundary-contact conditioning.

## B. Notable single-reviewer advances

- **BT2-3/BT2-4:** frozen-interval rigidity theorem and the monotone staircase root portrait (exactly $N-1$ simple roots with slope bounds in the strict-gap regime).
- **BT2-7/JKH2-15:** no interior uniform circle exists — the ceiling is the *mechanism* that permits circular binaries; the boundary-speed family is derived, not stipulated.
- **BT2-8:** lower-ceiling radius expansion $R_{\ast,\lambda}=(K/4c_a^2)(1-\lambda^2/2+7\lambda^4/8+\cdots)$, closing the family onto delay-free inverse-square balance as $\lambda\to0$.
- **HW-2 (ERROR):** the root-stability lemma asserts a $D_t$ floor at roots but the proof needs a segment/homotopy floor; two repairs supplied.
- **HW-13/HW-14:** odd-order normal form for degenerate roots and a conditional Whitney (a),(b) stratification theorem on analytic charts, which also kills the singular-continuous clock case.
- **JKH2-10/JKH2-11:** the pieces for a local existence-uniqueness theorem near the circular binary now all exist (census stability via rigidity + Lipschitz ledger + Section 7 contraction), after which orbital stability reduces to a co-rotating-frame delayed characteristic equation.
- **GD-12/GD-13/GD-15/GD-16:** discrete contraction lemma (complete), order-one convergence theorem (one lemma from closure), emission-time substepping that removes $D_t$ stiffness exactly via the document's own transfer identity, and an explicit candidate history-to-ledger Lipschitz constant.
- **LH2-10:** degenerate-root local-finiteness lemma; corollary — the $c_a<c_f$ nonordinary catalogue collapses entirely.
- **REM-11/REM-13:** an executable All-Root Certificate plan for the two-label binary chart (ingredients delivered) and a radii-polynomial plan for the braid chart with delays as explicit unknowns.
- **REM-12/JKH2-14:** the helix exclusion is uniformly conditioned — row magnitude exactly $u$-invariant ($r^2D_t=4D^2R^2c_f(1+\sin D)$), verified to 25 digits.
- **GD-17/REM-14:** the certification frontier coincides exactly with the event-domain frontier; every structural advantage (root uniqueness, certified bracketing, forward-only tracking) is bought by the ceiling and lost for $c_a>c_f$.

Plainly: beyond the repairs, the panel's message is an opportunity — the equal-speed circular binary is now surrounded on three sides (existence theorem skeleton from Hale, numerical contract from Dahlquist, machine certificate from Moore), and one coordinated push could turn it from a prescribed-chart compatibility result into a certified solution of the delayed system.

## C. Ranked action list

1. **P1 — Resolve the frozen-root contradiction** (A1): add the receiver-side clause with the BT2-2 instant/interval distinction, retype catalogue rows to be disjoint (HW-1), and quote BT2-3 rigidity as the geometric characterization.
2. **P2 — Repair the root-stability lemma** (HW-2) and add the endpoint degeneracy caveat (JKH2-7); these gate every downstream contraction argument.
3. **P3 — Close the helix census gap** with a supplied proof and fix the absolute-value slip (A5).
4. **P4 — Correct the two decimals** (REM-1/2, including the Section 12 recurrence) and adopt the certified enclosures with provenance lines (REM-10, REM-3); reword the reorder-invariance falsifier (GD-1).
5. **P5 — Update Section 5** for the sweep law: obligations, delay window, left-continuous representatives, finite-switching or analyticity clause, genericity framework (A6).
6. **P6 — Adopt or dispose the staircase reformulation** (A2) and state the free-data level of the frozen disposition per A4; retarget FSC-006 per A3 (LH2-8/9), replacing the unattainable weak-* endpoint target with the local statement plus the $K/(2c_f^2)$ residue invariant.
7. **P7 — Mechanical sweep** (A7): stale cross-references, split sentence, undefined $H$, catalogue columns, forward reference, provenance row.
8. **P8 — Launch the binary existence-and-certificate program**: JKH2-10 existence theorem, GD-13 convergence lemma, REM-11 All-Root Certificate, then JKH2-11 orbital-stability formulation.

## D. Disposition status

All findings are undisposed review claims at the grades stated in their source files. Nothing here is integrated into the mathematics packet; the operator (or a subsequent integration pass) owns acceptance, narrowing, or rejection of each item, following the pattern of the earlier review-response captures.
