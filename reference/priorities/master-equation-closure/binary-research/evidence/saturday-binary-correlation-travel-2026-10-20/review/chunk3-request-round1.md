You are an independent reviewer (Codex, gpt-6.1-sol) for the Architrino repository at /Users/markmorris/vibe/architrino. Do not edit any file. Read AGENTS.md's physics rules and the canonical Master Equation passages you need. Read the files under review in full and the cited accepted sources. Reconstruct every derivation and every numerical claim independently; do not trust the author's statements or instruments. Report: (a) what you read; (b) for each claim, supported / not supported / needs correction, with the reason; (c) a numbered list of actionable corrections, each labelled with a short ID; (d) an overall disposition: ACCEPT, ACCEPT AFTER CORRECTIONS, or REJECT. Be specific about scope: what is derived, what is only sampled, what is conditional.

# Chunk 3, round 1: the inverse-weighted angular balance at higher speed bounds, and a sharper amplitude requirement

This is chunk 3 of the Saturday binary agent's round of 2026-10-20 (operator-approved; author Claude), on the binary periodicity question (opposite unit pair, complete C² planar histories, unchanged Master Equation, unit reduced coupling, c_f = 1, positive separation, whole-history speed bound w < 1/3, one ordinary partner root per member, no positive-delay own roots; relative-vector recurrence only, without rigid recurrence). Rules: no sign transfer between differently weighted integrals; no inverse-J chart across zeros of J; relative recurrence does not imply common-velocity recurrence; a prescribed path is no solution; no mirror symmetry, constant common velocity, conserved J, energy/mass/force premise or observer-level law.

The chunk builds on Theorem R and Corollaries R.1–R.3 of the chunk-2 note `reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20-inverse-weight.md` (current SHA-256 `27e7c3b952d90f034a90f95785a68121cde66ca39c0770064fcffa3992e14a4e`), whose mathematics you supported in its rounds 1–2 (replies `.../review/chunk2-reply-round1.md`, `chunk2-reply-round2.md`). Read it for the definitions and proofs used.

## Files under review

| Path | Bytes | SHA-256 |
| --- | --- | --- |
| `reference/priorities/master-equation-closure/binary-research/analysis/saturday-binary-correlation-travel-2026-10-20-speed-range.md` (the subject) | 13677 | `0f5685cdd4b3627c7c325eeaf091c17a8031d78e19f5b4ae5f65289efe6849f5` |
| `reference/priorities/master-equation-closure/binary-research/evidence/saturday-binary-correlation-travel-2026-10-20/README.md` (section "The second instrument (chunk 3)") | 10416 | `202917107649121a53434e4ba14d87691d13f9581a9a8e0c0ada8a699f38475c` |
| `reference/priorities/master-equation-closure/binary-research/evidence/saturday-binary-correlation-travel-2026-10-20/correlation_travel_speed_range.py` (frozen after its single run) | 7892 | `c0e4923f2e33751eab2d29126b131398e54ff7699e76f3c6d913d1e3be7ec978` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/binary/run2.out` | 3088 | `fae61fa090ae77b7522b4156b80613cfce011a357b124972c514bd1976f42613` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/binary/run2.json` | 3968 | `6a089e6d3fe5ee7b6b91ec2ed78b361eaa3cb0c480db0cf692a79c0a9b307105` |
| `.local-data/aaa-work-threads/saturday-agents-2026-10-20/binary/run2.supervisor.json` | 2339 | `ba1196610bced0d50a21980943e407927309a349bd992ee4b032f2f36f556ef0` |

## Accepted sources

The chunk-2 note above; `saturday-low-angular-momentum-2026-10-14.md` (Lemma 0, floor, Theorem Z, constants, the accepted monotonicity proof that D > 0 on (0, 8/75] and D < 0 on [0.11, 1/3)); `saturday-signed-breathing-radial-travel-2026-10-14.md` (the bound r²|δ| ≤ c₂ and constants k₁, k_A'); `saturday-curved-window-strength-difference-2026-10-11.md` (c(w)); `saturday-solution-weighted-geometry-comparison-2026-10-12.md` (|J̇| ≤ wc₊/r); all under `reference/priorities/master-equation-closure/binary-research/analysis/`; and the canonical Master Equation passages in `content/markdown/aaa/dynamics/master-equation.md`.

## Claims to check

1. Corollary S.1: Theorem R and the proofs of Corollaries R.1, R.2 and the κ_a bound of R.3 use neither D nor Theorem Z, so for any w < 1/3 they hold whenever G(w, r_min) > 0; the nesting statement for w' ≤ w.
2. The certified thresholds ρ_w at w = 1/10, 21/200, 11/100, 1/8, 3/20, 1/5, 1/4, 27/100 satisfy G(w, ρ) > 0 for all ρ ≥ ρ_w (monotonicity in ρ plus an exact sign at ρ_w). Please check the signs at the tabulated ρ_w with your own separately authored exact or interval arithmetic, and the displayed floors and G_∞ lower bounds.
3. Proposition S.2: G_∞ strictly decreasing on (0, 1/3); G_∞(27/100) > 0.0786 and G_∞(3/10) < −0.0970; hence one zero in (27/100, 3/10), and G < 0 at every ρ above it. Check that the statement is presented as a limit of constants only.
4. Proposition S.3: |J J̇| ≤ c₁d² + 2wc₂|d| + c₃|d|/r; with Theorem Z, ∮|J J̇| ≤ βL_d, β = c₁k + 2wc₂ + 2wc₃k/c₋; the consequences with κ_a' = 2/(β√c₊) and κ_b' = 2/(βk); the tabulated β, κ_a', κ_b' and the worked numbers (4.02√r_max, 125, 402, 40,200).
5. The reading that the accepted D-dependent results carry no conclusion for w ≥ 0.11, and the scope statements (thresholds of order 10⁷ near 27/100; strongly eccentric histories open).
6. The instrument: conservative ends, the bisection keeping G > 0 at the returned integer, known cases before targets (K6 uses your earlier independent values), and the README's account (including the unsuccessful 7/25 sign target).
7. Claim grades, falsifiers, absence of forbidden premises.

Return the four-part report (a)–(d).
