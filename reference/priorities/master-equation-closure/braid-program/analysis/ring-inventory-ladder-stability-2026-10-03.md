# Common-sector growth on the other inventory ladders

## Scope and prerequisite

This instrument evaluates the common radial and tangential first variation about the frozen [600 locally certified circular balances](ring-inventory-ladders-2026-10-03.md#completed-hundred-rung-extension), with 2, 4, 8, 10, 12 and 24 alternating members, T02 through T200. A successful target certifies distinct simple positive real characteristic witnesses and a nonzero common-tangential-kick numerator on their brackets. It does not count the complete complex spectrum, prove nonlinear history instability, classify later fate or retain an evolved assembly. No absence of additional sampled roots is interpreted as stability.

The equation is the unchanged Master Equation, every ordinary positive-delay self hit is retained, and all numerical values use $K=c_f=1$. The reference instrument is frozen; printed table digits are never substituted for its actual uncertainty. Claim grade: computer-assisted derived reference admission and formal witness existence/simplicity where a current receipt passes; numerical centers are measured. Independent Cartesian adjudication is pending. A failed root census, invalid balance enclosure, omitted self hit, incorrect tensor derivative, failed interval endpoint/derivative or zero-containing claimed kick numerator falsifies the corresponding target.

## Instrument and exact interval consumption

The new [ring_inventory_ladder_stability_20261003.py](../../../../../scripts/braid-program/ring_inventory_ladder_stability_20261003.py) imports the frozen new inventory instrument and its frozen tensor source. This reuse is explicitly not independent evidence. The original characteristic evaluator, original scalar oracle, previous family instruments and their receipts remain unchanged. Each new target records the source receipt's byte hash and reconstructs intervals from its exact binary endpoint tuples, with 100-decimal point arithmetic and 85-decimal outward-rounded interval arithmetic. A known interval $[1.25,1.5]$ first checks this binary decoder exactly.

Before any matrix is linearized, the instrument re-verifies every retained causal endpoint, the full concavity level inequalities, fixed signed $D$, tangential endpoint opposition, strictly positive tangential derivative and inward radial coefficient. It independently recomputes radius and frequency intervals within the stored reference bounds. The census is one descending root at $m=-M+1,\ldots,0$, and a pair at $m=1,\ldots,t-1$, giving $M(M+2t-2)$ directed hits. Self hits are the entries with $m\equiv0\pmod M$.

The characteristic matrix uses the [frozen tensor derivation](ring-family-symmetric-stability-2026-10-03.md#tensor-construction-of-the-first-variation):

$$
A(z)=z^2I+2\Omega zJ-\Omega^2I-\sum_r[C_r+e^{-z\ell_r}(F_r+zH_r)],\qquad G(z)=R\det A(z)/z.
$$

Here the subscript $r$ indexes a causal row rather than a radial projection. Each target first checks rigid phase neutrality, the radius derivative, the frequency derivative and $G(0)=\Omega^2C_t'/R$ before its spectral proposal. Errors are recorded relative to the explicit matrix/identity magnitude scale, with a required maximum below $10^{-65}$. Numerical centers are refined inside the admitted speed interval only for these point controls; interval witness calculations retain the full stored uncertainty.

## Controls and bounded proposals

The control order is fixed: exact static-source tensor $\operatorname{diag}(-2,1)/8$, exact binary interval decoding, analytic scalar root $M=4,m=1,\beta=3\pi/4,x=\pi/2$, then the sign-bracket solver on $z^2-2$ with known root $\sqrt2$. These are recorded in `known.json`. Accepted six-member T02 supplies rigid phase, radius and frequency checks in `controls.json`. Only then can new inventory targets run; both gates must match the current instrument hash.

Samples propose roots in two overlapping positive domains, scaled by $\beta/a$ and $\beta^4$, where $a=M^2/24$. An opposite point-sign pair is refined by 48 steps of sign-bracket bisection. This procedure is proposal-only. A relative half-width $10^{-12}\max(1,|z|)$ then supplies an interval witness test: opposite outward-rounded $G$ endpoint signs prove a root exists, and a strictly signed $G'$ on the entire bracket proves its uniqueness and simplicity there. The common-kick numerator $(-A_{12},A_{11})^{\mathsf T}$ is enclosed over that same bracket; a nonzero component proves the formal kick pole does not cancel. There is no argument-principle root count in this instrument.

An initial high-rung pilot using a secant proposal passed all six T200 references in 17.805 wall seconds. On the subsequent lower-rung extension, the unconstrained proposal failed to converge at twelve-member T02. The supervisor stopped all children and closed the process group; this proposal failure supplies no spectral negative. The new instrument alone was repaired to bracketed bisection, the independent $\sqrt2$ known control was added, and all analytical gates were rerun before any repaired target. Earlier new-stability receipt identities are stale under the changed hash and cannot be accepted by the final table. The frozen balance instrument and every frozen tensor/reference subject were untouched.

## Result disposition

The current high-rung pilot and complete-family extension are recorded below only after their current-hash interval certificates succeed. The [fixed-inventory fast-limit proof](ring-inventory-ladders-2026-10-03.md#fast-common-sector-growth-at-fixed-inventory) is a separate analytical argument pending adjudication; finite witness trends cannot prove it. The slow-growth limit remains an analytical research question.

## Certified high-rung pilot

The repaired pilot, owned run `0281e08e-6ece-4040-af01-abd6dacc4cd7`, completed all six T200 targets in 33.05 wall seconds, exit zero and closed process group. Each target has two simple positive real witnesses and a nonzero formal common-kick numerator at both. The table rounds centers; current outward-rounded brackets and derivative signs are in `.local-data/ring-exploration/inventory-ladder-stability/Nxx-T200-certificate.json`.

| Members | Slow witness at T200 | Fast witness at T200 | $a\lambda_{\rm slow}/\beta$ | $\lambda_{\rm fast}/\beta^4$ |
| ---: | ---: | ---: | ---: | ---: |
| 2 | 1351.54854501664 | 13692550412.4482 | 0.7170224047 | 1.4057032784 |
| 4 | 169.783281252541 | 872988803.409739 | 0.7170120231 | 1.4057230692 |
| 8 | 21.4318607819963 | 56752638.2732908 | 0.7169797044 | 1.4057207560 |
| 10 | 11.0263586190317 | 23702880.2472734 | 0.7169579919 | 1.4056994558 |
| 12 | 6.41171527168516 | 11653871.1729411 | 0.7169327203 | 1.4056652402 |
| 24 | 0.824269973144200 | 815615.156759997 | 0.7167118694 | 1.4052085720 |

Claim grade: computer-assisted derived formal witnesses on these six exact references and measured rounded centers/scaled comparisons. Falsifier: a source balance or root-census failure, determinant endpoint failure or zero-containing derivative/kick numerator invalidates its row. The nearly shared scaled ratios are a finite measurement, not an identified universal limit.

## An inferred slow-limit candidate

Let $\tau=az/\beta$ and eliminate the radial row by

$$
S(z)=A_{22}(z)-\frac{A_{21}(z)A_{12}(z)}{A_{11}(z)}.
$$

Controlled probes at T200 for two and twenty-four members suggest the limiting function

$$
\frac{a^2}{\beta^2}S(\tau\beta/a)\ \longrightarrow\ f(\tau)=\tau^2+\tau-2\tanh\tau.
$$

The identification of this function with the Master Equation's limit is **inferred and unchecked**. A known diagonal and a non-diagonal Schur-complement case passed before the probes; a separate least-squares control returned the known coefficients $(2,3)$ before fitting the finite data. A seven-function basis in $\tau$ and $\tanh\tau$ gave approximate coefficients $(1,0,0,1,-2,0,0)$, but fitting is not derivation. Receipts `slow-schur-probe.json`, `slow-row-probe.json` and `slow-limit-candidate.json` distinguish the finite data from this proposed limit. The dominant radial constraint separately suggests $u_r/u_t\sim-\tanh\tau/\beta$ in Cartesian radial/tangential coordinates.

For the scalar candidate alone, $f(0)=0$, $f'(0)=-1$, and $f''(\tau)=2+4\operatorname{sech}^2\tau\tanh\tau>2$ for $\tau>0$. Hence it has exactly one positive zero. An outward-rounded bracket, after the known $f(0)=0$ control, is

$$
0.71616422657180623<\tau_*<0.71616422657180625,
$$

with derivative enclosed in $(1.1876170732250293,1.1876170732250296)$. If the proposed uniform limit is established, it predicts $\lambda_{\rm slow}/\beta\to\tau_*/a$, or $0.47744281771453749\ldots$ for six members. The candidate scalar bracket is derived; its identification as a ring growth limit remains inferred. Falsifier: an independently derived surviving Schur term that differs from $f$, failure of uniform cancellation bounds for the old causal rows, or rigorously admitted high-rung data tending to another scaled root overturns the proposed identification.

## Completed finite family

The [complete growth table](ring-inventory-ladder-stability-table-2026-10-03.md) records two distinct simple positive real common-sector witnesses for every one of the 600 additional admitted balances. All 1200 witness brackets have opposite outward-rounded determinant signs, a strictly signed derivative and a nonzero common-kick transfer numerator. This establishes formal common-sector growth at each listed reference; none of these references is free of growing linear modes. The full-ring nonlinear history theorem still exists separately only where its own assumptions and adjudication are satisfied.

The extension retained the six current-hash T200 pilot receipts and ran only T02 through T198 afterward. Owned run `9d99076b-c6f0-4da6-a856-4effddd877f5` completed in 611.425 wall seconds, exit zero, all six children exited zero, stderr empty and `processGroupClosed: true`. Current stability receipts occupy 17 MiB by `du -sh` after completion. Each target recorded a successful full reference re-verification and rigid controls before any spectral proposal. The final table extractor first passed its known interval midpoint and beta-two growth-scaling controls, then required all 600 certificates to match the frozen current instrument digest. `all600-summary.json` binds each current certificate and its selected diagnostic rows by SHA-256.

The full table contains only two witnesses per reference, not a theorem that exactly two growing roots exist. Its witness count 1200 is a lower bound across the declared common sectors of 600 distinct histories. The finite proposal domains are retained in each certificate. The original proposal failure remains part of the record; it was resolved by the controlled bisection routine and supplies no absence or stability claim.

Claim grade: computer-assisted derived formal growth witnesses and measured centers for the complete enumerated family, independent adjudication pending. Falsifier: a current source or instrument digest mismatch, missing control-first receipt, failed full census or exact balance, failed interval endpoint/derivative, or an incorrect tensor derivative invalidates the corresponding entry. A finite-amplitude nonlinear escape or retained motion cannot be inferred from these witnesses alone.

1. Independently reconstruct selected causal chains and Cartesian first variations, including high rungs and the binary; recommendation: adjudicate the frozen finite subject before promoting its claim grade.
2. Derive the proposed uniform Schur limit with old-row remainder bounds; recommendation: test $\tau^2+\tau-2\tanh\tau$ rather than infer it from fitted coefficients.
3. Extend the admissible nonlinear-history theorem to a representative of each other inventory; recommendation: preserve exact balance and root-chart margins in the function-space construction.
