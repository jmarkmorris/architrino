# Symmetry Block Decomposition Theorem

Promotion status: `priority-only`. This packet makes the exact-antipodal obstruction and relaxation tests blockwise. It refines [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md), [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md), and [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md). Its purpose is to prevent a pair-even residual from being treated as one undifferentiated signal.

The theorem is local to one exact-antipodal or declared relaxed chart, one support-complete root ledger, one source-pair policy, one memory convention, one grid/weight convention, and one endpoint/action ledger.

---

## 1. Site Actions

Index the six neutral same-level sites by

$$
i=(a,\sigma),
\qquad
a\in\mathbb{Z}_3,
\qquad
\sigma\in\{+,-\}.
$$

The pair involution is

$$
\iota(a,\sigma)=(a,-\sigma).
$$

For any site-indexed row $Q_{a,\sigma}$, define the pair projectors

$$
\left(E_{\mathrm{pair}}Q\right)_{a,\sigma}
=
\frac{1}{2}
\left(Q_{a,\sigma}+Q_{a,-\sigma}\right),
\qquad
\left(O_{\mathrm{pair}}Q\right)_{a,\sigma}
=
\frac{1}{2}
\left(Q_{a,\sigma}-Q_{a,-\sigma}\right).
$$

Exact-antipodal geometry lies in the pair-odd coordinate block:

$$
\mathbf{Y}_{a,-}=-\mathbf{Y}_{a,+},
\qquad
\delta\mathbf{Y}_{a,-}=-\delta\mathbf{Y}_{a,+}.
$$

A relaxed midpoint chart splits the same coordinates as

$$
\mathbf{Y}_{a,\sigma}
=
\mathbf{m}_a+\sigma\mathbf{r}_a,
\qquad
\delta\mathbf{Y}_{a,\sigma}
=
\delta\mathbf{m}_a+\sigma\delta\mathbf{r}_a.
$$

The exact-antipodal chart keeps $\mathbf{m}_a=0$. Antipodal relaxation opens the pair-even midpoint variables $\mathbf{m}_a$.

---

## 2. Binary Fourier Blocks

Let $C$ be the cyclic binary-shift action

$$
C(a,\sigma)=(a+1,\sigma).
$$

For a binary-indexed row $Q_a$, set

$$
\omega=e^{2\pi i/3},
$$

and define

$$
\widehat{Q}_k
=
\frac{1}{\sqrt{3}}
\sum_{a=0}^{2}\omega^{-ka}Q_a,
\qquad
Q_a
=
\frac{1}{\sqrt{3}}
\sum_{k=0}^{2}\omega^{ka}\widehat{Q}_k.
$$

The projectors are

$$
P_k
=
\frac{1}{3}
\sum_{\ell=0}^{2}\omega^{-k\ell}C^\ell,
\qquad
k=0,1,2.
$$

The block $k=0$ is binary-uniform. The conjugate pair $k=1,2$ is the real two-dimensional standard binary block. If a full $S_3$ row is declared, the $k=1,2$ pair must be grouped as the standard representation rather than treated as two unrelated one-dimensional real blocks.

---

## 3. Row-Aware Equivariance

Let

$$
A
=
D\mathcal{F}_{\eta}^{\mathrm{anti}}(\alpha_0)
$$

be the gauge-reduced exact-antipodal support-complete derivative. The row space splits at least into

$$
\mathcal{E}_{\eta}
=
\mathcal{E}_{\mathrm{tan}}
\oplus
\mathcal{E}_{K}
\oplus
\mathcal{E}_{\mathrm{act}},
$$

where $\mathcal{E}_{\mathrm{act}}$ denotes action, curl, event, scale, or scalar constraint rows included in the certificate.

Under the hypotheses of [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md),

$$
\mathcal{R}_{\mathrm{tan}}
\in
E_{\mathrm{pair}}\mathcal{E}_{\mathrm{tan}},
\qquad
\mathcal{R}_{K}
\in
O_{\mathrm{pair}}\mathcal{E}_{K}.
$$

Thus exact-antipodal linearization is row-aware:

$$
A:X_{\mathrm{anti}}\to
\left(
E_{\mathrm{pair}}\mathcal{E}_{\mathrm{tan}}
\right)
\oplus
\left(
O_{\mathrm{pair}}\mathcal{E}_{K}
\right)
\oplus
\mathcal{E}_{\mathrm{act}}^{\mathrm{decl}}.
$$

It is not correct to say that the operator simply preserves the same pair parity from domain to residual. The domain is pair-odd geometry; the tangential scalar row is pair-even because both $\mathbf{T}$ and $\widetilde{\mathbf{F}}$ are pair-odd.

For the binary symmetry, if the curve chart, grid, weights, source-pair policy, root ledger, memory window, action row, and endpoint convention are invariant under the declared binary group $G\in\{C_3,S_3\}$, then each row block is equivariant:

$$
A_rP_k^X
=
P_k^{\mathcal{E}_r}A_r
\qquad
\text{for every row block }r.
$$

Therefore

$$
P_{\ell}^{\mathcal{E}_r}A_rP_k^X=0
\qquad
\text{when }k\ne\ell.
$$

This is the useful block diagonalization: binary Fourier mode is preserved row by row, while pair parity is determined by the row type.

---

## 4. Block Cokernel Projection

Let $P_{\mathrm{cok}}$ be the weighted cokernel projector from the support-complete obstruction certificate. For each row-aware binary block $\beta=(r,k)$ define

$$
P_{\beta}^{\mathcal{E}}
=
P_k^{\mathcal{E}_r}
\quad
\text{on the declared pair sector of row }r.
$$

The block cokernel projector is

$$
P_{\mathrm{cok}}^{\beta}
=
P_{\beta}^{\mathcal{E}}
P_{\mathrm{cok}}
P_{\beta}^{\mathcal{E}}.
$$

The obstructing residual decomposes as

$$
c_0^{\beta}
=
P_{\mathrm{cok}}^{\beta}
\mathcal{F}_{\eta}^{\mathrm{anti}}(\alpha_0),
\qquad
\|c_0\|_{\mathcal{E}}^2
=
\sum_{\beta}\|c_0^{\beta}\|_{\mathcal{E}}^2
$$

up to the declared block-leakage envelope.

A block obstruction requires

$$
\|c_0^{\beta}\|
>
\frac{1}{2}L_{\mathrm{cok}}^{\beta}\rho^2
+
\epsilon_{\mathcal{F},\beta}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc},\beta}
+
\epsilon_{\mathrm{adj},\beta}\rho
+
\epsilon_{\Gamma,\beta}
+
\epsilon_{\mathrm{act},\beta}.
$$

This is the blockwise version of the scalar adjoint test in [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md).

---

## 5. Relaxation Column Selection

Let

$$
B
=
D_m\mathcal{F}_{\eta}^{\mathrm{rel}}(\alpha_0,0)
$$

be the linear columns opened by pair-midpoint variables. The center gauge imposes

$$
\sum_{a=0}^{2}\mathbf{m}_a=\mathbf{0},
\qquad
\widehat{\mathbf{m}}_0=\mathbf{0}.
$$

Therefore pair-midpoint relaxation can act as an internal same-level branch correction only in the pair-even standard binary block:

$$
k=1,2.
$$

For a block $\beta$ in the obstruction row space, set

$$
B_C^{\beta}
=
P_{\mathrm{cok}}^{\beta}
B
P_{m,k}.
$$

The block cancellation equation is

$$
B_C^{\beta}m_{\beta}
=
-c_0^{\beta}.
$$

The block relaxation gate passes only if

$$
\operatorname{dist}
\left(
c_0^{\beta},
\operatorname{ran}B_C^{\beta}
\right)
\le
\epsilon_{\mathrm{rel,lin}}^{\beta},
\qquad
\|m_{\beta}^*\|\le\rho_m^{\beta}.
$$

A pair-even $k=0$ obstruction is not solved by midpoint motion under the center gauge. It points instead to a center-gauge convention, action/$\Gamma$ row, boundary exchange, medium-response row, or ledger mismatch.

---

## 6. Symmetry Leakage For Nearby Branches

When the branch is near but not exactly symmetric, emit the commutator leakage

$$
\delta_A
=
\max_{g\in G}
\frac{
\|\Pi_g^{\mathcal{E}}A-A\Pi_g^X\|
}{1+\|A\|},
$$

and the off-block leakage

$$
\delta_{\mathrm{off}}
=
\max_{\alpha\ne\beta}
\|P_{\beta}^{\mathcal{E}}AP_{\alpha}^{X}\|.
$$

Block obstruction or block relaxation claims are admissible only when their margin exceeds the leakage envelope:

$$
\mathrm{margin}_{\beta}
>
C_{\beta}
\left(
\delta_A+\delta_{\mathrm{off}}
\right)
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}.
$$

Otherwise the packet may report a useful diagnostic decomposition, but its decision status is

$$
\texttt{binary-fourier-block-leakage}.
$$

---

## 7. Theorem Target

**Theorem target: row-aware symmetry block decomposition.** Suppose an exact-antipodal support-complete dynamics/action packet has a root ledger, source-pair policy, memory convention, grid, residual weights, endpoint convention, and action row invariant under the declared binary symmetry group and closed under pair involution. Then the gauge-reduced derivative decomposes by binary Fourier block row by row. The tangential residual rows lie in the pair-even site sector, the curvature residual rows lie in the pair-odd site sector, and any action/event rows must declare their pair sector. Consequently the cokernel obstruction, adjoint basis, and relaxation-column range test decompose into row-aware binary blocks up to the emitted symmetry-leakage envelope.

The useful decision consequence is:

$$
\text{midpoint relaxation can be justified only by a certified obstructing pair-even standard block.}
$$

It cannot be justified by pair-even residual parity alone, by an active-window failure, by a $k=0$ center-gauge residual, or by a support-tail uncertainty.

---

## 8. Output Schema And Current Reading

Future exact-antipodal support-complete packets should emit:

| Field | Required content |
| --- | --- |
| `pair_projectors` | $E_{\mathrm{pair}}$, $O_{\mathrm{pair}}$, and declared row pair sectors |
| `binary_block_projectors` | $P_k$ or $S_3$ standard/trivial projectors |
| `row_block_equivariance` | commutator leakage for each residual row block |
| `block_cokernel_projection` | $P_{\mathrm{cok}}^{\beta}$, $c_0^{\beta}$, and block obstruction margins |
| `block_adjoint_basis` | adjoint cokernel vectors labeled by row and binary block |
| `relaxation_column_blocks` | $B_C^{\beta}$, singular floors, and block range distances |
| `block_decision` | first passing or failing block status |

Failure/status codes:

$$
\texttt{block-symmetry-ledger-mismatch},
\qquad
\texttt{binary-fourier-block-leakage},
\qquad
\texttt{pair-even-standard-obstruction-certified},
$$

$$
\texttt{pair-even-k0-center-gauge-fail},
\qquad
\texttt{relaxation-column-block-pass},
\qquad
\texttt{relaxation-column-block-defect},
$$

$$
\texttt{exact-antipodal-obstruction-required-first}.
$$

The current $M=3$ reading remains

$$
\texttt{continue-exact-antipodal},
\qquad
\texttt{exact-antipodal-obstruction-required-first},
\qquad
\texttt{antipodal-relaxation-column-certificate-open},
\qquad
\texttt{not-retained}.
$$

The next run should use this decomposition only after support-complete memory and adjoint cokernel rows exist.

