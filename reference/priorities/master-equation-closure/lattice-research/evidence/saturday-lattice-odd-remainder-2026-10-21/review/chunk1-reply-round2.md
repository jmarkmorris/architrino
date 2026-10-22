**ACCEPT AFTER CORRECTIONS.** The mathematical corrections are sound, and the declared constants remain supported. Five round-1 findings are resolved; **HISTORY is partially resolved** because two unqualified historical assertions remain in the README.

No files were edited. I did not import or execute the author’s instruments.

**What I read and compared**

I read the complete corrected [subject](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/analysis/saturday-lattice-odd-remainder-2026-10-21.md), README, `odd_cubic.py`, round-1 reply and author response, `oc_run1.json`, `oc_run1.out`, and supervisor receipt. README adjudication is limited to its introduction and chunk-1 material.

I also read:

- `AGENTS.md`, the startup router and review procedures.
- The canonical Master Equation passages “Per-Hit Acceleration,” “Total Acceleration,” and “Conventions and Exclusions.”
- Accepted dependencies L.1–L.4, the complete October 18 review, S.3–S.4, B.1–B.3, T.1–T.2, G.2, H.1–H.2 and Q1.
- Supporting declared constants, imported-helper initialization, and the three exploration scripts and their supervisor receipts.

Byte counts and SHA-256 values computed with `hashlib` match every supplied identity, including both retained comparison files, the unchanged instrument and outputs, and the matching execution-source copy.

**Claim adjudication**

| Claim | Finding | Reason and scope |
|---|---|---|
| **SIGN** | **Supported; resolved** | The expanded linear bookkeeping cancels correctly and produces precisely the stated delay brackets. |
| **SYM** | **Supported; resolved** | The replacement distinguishes enclosure overlap from exact symmetry, retains the asymmetric allowances, and gives the correct body-diagonal length. |
| **TAIL** | **Supported; resolved** | The shell-ratio argument bounds the infinite remainder; the extraction allowances are correct and included in the printed boxes. |
| **ORDER** | **Supported; resolved** | Code inspection confirms KC1–KC4 precede shell accumulation; KC5 checks accumulated shells before interval evaluation. |
| **COUNT** | **Supported; resolved** | Independent reconstruction of the seeded draw sequence gives 299 evaluated configurations and one skipped zero offset. |
| **HISTORY** | **Needs correction; partially resolved** | “No nonlinear solution history” is accurate. The new provenance limitation is accurate, but the README retains unqualified claims about edit history and exhaustive run counts. |
| No other mathematical statement, constant, table entry or claim grade changed | **Supported** | `diff -u` against the retained subject shows changes only in the six requested correction areas. The displayed cubic, reduction, majorant, component table and declared norms are unchanged. |
| README introduction and chunk-1 mathematics | **Supported** | They accurately describe the computation, samples, extraction allowances and limited `all_targets_pass` flag. Historical qualifications need the correction below. |

The author response’s statement that every finding has been applied is therefore **not fully supported**.

**Independent mathematical reconstruction**

For SIGN, the linear differential of the original row is
\[
D\Psi(\ell,0)[h,k]=-T_\ell h+B_\ell k.
\]
Its contribution at the sampled argument is
\[
-\lambda T_\ell\alpha
+\lambda T_\ell\bar\Phi(T-r-\delta)
+\lambda B_\ell\bar\Phi'(T-r-\delta).
\]
The receiver subtraction contributes \(+\lambda T_\ell\alpha\), and the anchor subtractions contribute \(-\lambda T_\ell P_0-\lambda B_\ell P_1\). Their sum is exactly the two displayed delay brackets.

Expanding the implicit range equation independently gives
\[
\delta_1=n\cdot(\alpha-P_0),\qquad
\delta_2=(n\cdot P_1)\delta_1+
\frac{|(\alpha-P_0)_\perp|^2}{2r}.
\]
The sampled separation and velocity through cubic order then reproduce \(C_\ell\), including both delay contributions. Taylor’s integral remainder has the stated sign and coefficient.

I independently reconstructed O.2’s envelope and deviation estimates. The pair-average factor follows from
\[
|\cos(q\cdot\ell)-1|\le r^2/800.
\]
The rate-spread argument remains valid for noncommuting positive-semidefinite residues: splitting the scalar weights into positive and negative parts bounds their combined contribution by the oscillation over the band. The signed source-degree decomposition and positive-monomial majorant give the stated deviation bound and absolute convergence.

The rest-derivative constants used in Section 3.1 are valid. Reconstructing the multilinear groups reproduces its majorant; the deviation argument uses its nonnegative coefficients, rather than relying merely on a magnitude bound.

For O.3, signed permutations preserve lattice parity and the summation domain. The component patterns and asymmetric remainder bounds follow. For the symmetric comparison form,
\[
S[x,x,x,x]
=k_1\sum_i x_i^4+3k_2\left(1-\sum_i x_i^4\right),
\]
with \(\sum_i x_i^4\in[1/3,1]\), yielding the displayed \(\nu\).

At a unit body diagonal,
\[
K_{21}[w,w,w]
=\frac{\kappa_1+4\kappa_2+2\kappa_4}{3}\,w.
\]
Thus its length is exactly
\[
\frac{|\kappa_1+4\kappa_2+2\kappa_4|}{3},
\]
approximately \(3.74737\). No exact vanishing of either asymmetric difference is established.

**Independent numerical checks**

I wrote a separate truncated-series evaluator of the original rational row, solving the delay coefficient by coefficient. Before target calculations, both its high-precision and interval versions returned the analytically known axial cubic \(36e_1\). A separate bisection-based causal-root evaluator passed an analytic stationary-source check before use.

The independent 35-digit interval calculation reproduces these finite-cube values:

| Component | Cube half-width 5 |
|---|---:|
| \(\kappa_1\) | \(10.9257237739046995\) |
| \(\kappa_2\) | \(-3.69464071712211338\) |
| \(\kappa_4\) | \(-3.69464071712211338\) |
| \(\kappa'_1\) | \(1.98301613316760487\) |
| \(\kappa'_A\) | \(-0.566332740593797255\) |
| \(\kappa'_B\) | \(-0.566332740593797255\) |
| \(\kappa''_1\) | \(0.096072481451434028\) |
| \(\kappa''\) | \(-0.056347118904597306\) |

Independent enumeration gives **1,330 nonzero sites and 44 shells**.

For TAIL, expanding the positive majorant gives shell terms proportional to
\[
(24m^2+2)m^{-p}e^{-j\Lambda m},\qquad p\ge2,\quad j\ge1.
\]
The algebraic factor decreases with \(m\), so each successive term is at most \(e^{-\Lambda}\) times its predecessor. Independent interval evaluation gives
\[
T_{6:400}<0.000061295117753598329,
\]
and the remaining geometric tail is bounded by
\[
1.289\times10^{-484}<10^{-480}.
\]
The instrument’s safety multiplier covers that remainder.

The extraction allowances are \(T_{\rm tail}/2\) for the two polarizations, \(2T_{\rm tail}\) for \(\kappa''\), and \(T_{\rm tail}\) otherwise. They support every printed enclosure. Even using the rounded printed boxes, O.3 gives
\[
10.925879,\qquad1.983171,\qquad0.096134,
\]
supporting all three declared norm ceilings.

Other independently reconstructed numerical claims are:

- KC1 maximum relative difference: \(4.9968280284\times10^{-10}\), supporting \(5.0\times10^{-10}\).
- KC3 maximum ratio over the 299 configurations: \(0.376153625764534759\), supporting \(0.3762\).
- KC4 sampled maximum: \(2.9998917476680083\), below the hand norm \(3\).
- Reduced-form comparison: \(7.32797932524\times10^{-7}\).
- Exploration absolute and signed sums: \(14.0807137726\) and \(13.0048128396\).
- Orientation main term: \(0.001146129752704771\).
- Accepted half-odd comparison: \(0.006114768552858506\), approximately **56.65%** of the assembled estimate.

The sample checks remain samples. The tensor enclosures combine finite interval calculations with an analytic infinite-tail bound and retain interval-library conditionality. Accepted primitive enclosures remain dependencies; this review does not newly certify them.

Chunk 1 establishes cubic identities, reduction estimates and tensor bounds under its stated hypotheses. It does not establish a complete barrier, new continuation, order-one motion or physical acceptance. Chunk-2 conclusions remain outside this disposition.

**Actionable correction**

1. **HISTORY-2 — Finish qualifying the historical assertions.** At [README line 25](/Users/markmorris/vibe/architrino/reference/priorities/master-equation-closure/lattice-research/evidence/saturday-lattice-odd-remainder-2026-10-21/README.md:25), remove “The source was edited only before its first run,” or explicitly attribute it as an author report unverified by the retained records. At line 34, replace “ran once each” with “one disclosed completed supervisor run is retained for each.” The receipts and hashes establish those recorded runs and matching bytes; they cannot establish absence of other runs or edits. A complete execution/edit audit would supply the missing evidence. This wording correction requires no mathematical change or instrument rerun.