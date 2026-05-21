# Support-Complete $M=3$ Tail Frontier Shrinkage

Promotion status: `priority-only`. This packet extracts the strongest numerical consequence already present in [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md): the $\eta_{\max}=4.5$ and $\eta_{\max}=5.0$ rescoring rows agree to displayed precision. It does not certify the support tail. It turns that agreement into a controlled diagnostic split for the support-tail interval used by [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md).

The result is useful because the current first blocker is not the whole support-complete dynamics stack. It is the interval

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta].
$$

The root-frontier evidence suggests that the first part of that interval is empty at the sampled nodes, while the deeper support-only part remains unsearched by the displayed active-root table.

---

## 1. Observed Active Frontier

At the current $\rho=0.8$ exact-antipodal $M=3$ row,

$$
\eta_{\mathrm{mem}}=4.5,
\qquad
\eta_{\mathrm{act}}\approx4.4058154936.
$$

The active-window margin is therefore

$$
m_{\mathrm{act}}
=
4.5-4.4058154936
\approx0.0941845064.
$$

The support bound is

$$
B_{\mathrm{sup}}
=
2r_{\max}
\approx5.5211575250.
$$

Hence the raw support-tail interval is

$$
T_{\mathrm{tail}}^0=(4.5,\ 5.5211575250].
$$

The root-frontier packet states that the $\eta_{\max}=4.5$ and $\eta_{\max}=5.0$ rescoring rows agree to displayed precision. Under the same source-pair policy and root-enumeration convention, this is evidence that the sampled root set did not gain additional roots in

$$
T_{\mathrm{obs}}
=
(4.5,\ 5.0].
$$

This is only a sampled diagnostic until interval slabs and mesh lift are emitted.

---

## 2. Conditional Sampled-Empty Lemma

Let $\mathcal{A}_{4.5}^{\mathrm{sample}}$ and $\mathcal{A}_{5.0}^{\mathrm{sample}}$ be the sampled root ledgers produced by the same root enumerator, source-pair policy, endpoint convention, grid, and coefficient vector, with search depths $4.5$ and $5.0$. Suppose:

1. the enumerator is exhaustive on each sampled node up to $\eta_{\max}=5.0$;
2. the two ledgers have identical labels, delays to displayed tolerance, Jacobian sign strata, and force residuals to displayed tolerance;
3. the largest sampled delay satisfies $\eta_{\mathrm{act}}<4.5$.

Then at the sampled nodes no retained root exists in

$$
(4.5,\ 5.0].
$$

Proof. Exhaustiveness up to $5.0$ means any sampled root in $(4.5,5.0]$ would appear in $\mathcal{A}_{5.0}^{\mathrm{sample}}$. Identical ledgers between $4.5$ and $5.0$ mean no new label appears when the window is extended. Since the largest emitted delay is below $4.5$, no old label occupies the open tail. Therefore the sampled interval is empty.

The status is

$$
\texttt{sampled-tail-empty-to-5}.
$$

It is not

$$
\texttt{tail-exclusion-restored}.
$$

The latter requires interval cell certificates, endpoint ownership, coefficient-box persistence, and arclength-cell lift.

---

## 3. Tail Split For The Next Certificate

The support-tail interval should be split as

$$
T_{\mathrm{tail}}
=
T_{\mathrm{obs}}
\cup
T_{\mathrm{deep}},
$$

where

$$
T_{\mathrm{obs}}
=(4.5,\ 5.0],
\qquad
T_{\mathrm{deep}}
=(5.0,\ 5.5211575250+m_\eta].
$$

The certificate priority order is:

1. run interval cell exclusion on $T_{\mathrm{obs}}$ first, because the sampled evidence predicts empty cells and a positive exclusion margin should be easiest to recover there;
2. run interval cell exclusion on $T_{\mathrm{deep}}$ second, because no displayed active-root table reaches the support endpoint;
3. only if a slab in either interval brackets a root, switch that slab to tail-root-sheet assimilation and rebuild the force/action/Krawczyk ledger.

The hottest diagnostic source pair remains the same-sign binary-$3$ from binary-$2$ pair and its antipodal mate:

$$
+3\leftarrow+2,
\qquad
-3\leftarrow-2.
$$

Those labels caused the earlier $\eta_{\max}=4$ memory-window exit. They are not the only required pairs for support completeness, but they are the first subdivision priority.

---

## 4. Margin Interpretation

For a sampled node and pair, define

$$
g_{\mathrm{obs}}
=
\inf_{\eta\in(4.5,5.0]}
|G_{ij,n}(\eta)|.
$$

The sampled-empty diagnostic predicts

$$
g_{\mathrm{obs}}>0
$$

for every sampled node and required pair, but it does not supply a certified lower bound. The execution ledger must replace this prediction by an interval margin:

$$
m_{\emptyset}(c)>0
$$

for every atomic cell $c\subset I_n\times(4.5,5.0]$, or by a root-tube margin if the interval proof finds a root not visible in the sampled diagnostic.

The coefficient-box Krawczyk radius for the observed-empty subtail is then

$$
\rho_{\mathrm{tail,obs}}
=
\min_{c\subset T_{\mathrm{obs}}}
\frac{m_{\emptyset}(c)-e_{\emptyset}(c)}
{L_{\emptyset,c}^{\alpha}}.
$$

The deep-tail radius is

$$
\rho_{\mathrm{tail,deep}}
=
\min_{c\subset T_{\mathrm{deep}}}
\frac{m_{\emptyset}(c)-e_{\emptyset}(c)}
{L_{\emptyset,c}^{\alpha}},
$$

with tail-root terms added if roots are assimilated. The Krawczyk tail radius is

$$
\rho_{\mathrm{tail}}
=
\min\{
\rho_{\mathrm{tail,obs}},
\rho_{\mathrm{tail,deep}}
\}.
$$

Thus the sampled $5.0$ agreement is not a substitute for interval proof. It gives a natural slab split and a predicted first pass: prove the observed-empty subtail first, then close the deeper support-only subtail.

---

## 5. Current Status

The current exact-antipodal $M=3$ row may now carry the diagnostic status

$$
\texttt{sampled-tail-empty-to-5}
$$

for the displayed rescoring evidence, but the branch status remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{not-retained}.
$$

The next mathematical certificate is still the support-tail execution ledger. This packet only sharpens the first slab plan:

$$
(4.5,5.0]
\quad\text{before}\quad
(5.0,5.5211575250+m_\eta].
$$

If $(4.5,5.0]$ fails interval exclusion, the likely interpretation is not a new branch obstruction. It is a sampled-root-enumerator gap or an off-grid/mesh-lift effect that must be assimilated as a tail root sheet before any dynamics/action row is read.
