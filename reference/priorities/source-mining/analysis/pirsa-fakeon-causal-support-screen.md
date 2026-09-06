# PIRSA Fakeon Causal-Support Screen

## Status and claim boundary

This priority-only packet completes one bounded PIRSA source batch. It extracts a causal-support test from an external quantum-gravity toy model; it does not import fakeon ontology, higher-derivative dynamics, standard-model fields, intrinsic mass, or a quantum-gravity mechanism into $\mathbb{A}\mathbb{A}\mathbb{A}$.

Claim grades:

- The source equations and their stated distributional limit are **external-source results**.
- The support calculation below is a **derived negative comparison**.
- The conclusion is limited to the displayed finite-width kernel. It establishes no retained $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics, stability result, recovery result, or physical theorem.

Plainly: the source is useful here because it supplies a precise example that fails the causal-history requirement. The failure helps rule out an attractive shortcut; it does not validate the source theory or advance an $\mathbb{A}\mathbb{A}\mathbb{A}$ physical claim.

## Source batch

- Damiano Anselmi, [*Quantum gravity from fakeons*](https://pirsa.org/19090010), Perimeter Institute Recorded Seminar Archive `19090010`, September 5, 2019, DOI [`10.48660/19090010`](https://doi.org/10.48660/19090010). The seminar and slides are the PIRSA-family entry point.
- Damiano Anselmi, [*Fakeons, Microcausality And The Classical Limit Of Quantum Gravity*](https://arxiv.org/abs/1809.05037), arXiv:`1809.05037v2` `[hep-th]`, February 25, 2019, 27 pages. Local review copy: `/tmp/anselmi-fakeons-classical-limit.pdf`, SHA-256 `fd27c0714b4dedb50c2294c9683f5eb56e501049086bfe11b136c5f3808b89be`.

The paper is the equation-bearing technical source for the seminar's classical-limit discussion. Section 4, pages 17–18 in the PDF pagination, contains the retained mathematical signal; the source-map references below use the printed page numbers 17–18 and equation numbers (4.1)–(4.5).

## Technical source map

| Source location | Source content | $\mathbb{A}\mathbb{A}\mathbb{A}$ disposition |
| --- | --- | --- |
| Abstract and Sections 1–3 | Fakeon quantization, higher-derivative gravity, unitarity, and a proposed finite-scale loss of microcausality | Reject as substrate input; these are framework-specific assumptions and interpretations. |
| Equation (3.8), printed page 16 | A principal-value prescription expressed as an equal combination of past-supported and future-supported Green-function parts | Retain only as the origin of the two-sided support problem. |
| Equations (4.1)–(4.4), printed page 17 | A nonrelativistic toy model and the kernel $G_F(u,\tau)=\sin(|u|/\tau)/(2\tau)$ | Retain the explicit kernel for the causal-support screen below; do not import the toy model's mass or source interpretation. |
| Equation (4.5), printed page 17 | Distributional limit $G_F(\cdot,\tau)\to\delta$ as $\tau\to0$ | Retain as a limiting statement only; it does not make any finite-$\tau$ response past-supported. |
| Later gravitational and phenomenological sections | Framework-specific field equations and proposed observational consequences | Defer as unrelated to the current native geometry and causal-wake proof routes. |

## Derived causal-support screen

Write the source response in neutral notation as

$$
R(t)=\int_{-\infty}^{\infty}G_F(u,\tau)J(t-u)\,du,
\qquad
G_F(u,\tau)=\frac{\sin(|u|/\tau)}{2\tau}.
$$

Changing variables to $s=t-u$ gives

$$
R(t)=\int_{-\infty}^{\infty}G_F(t-s,\tau)J(s)\,ds,
\qquad
\frac{\delta R(t)}{\delta J(s)}=G_F(t-s,\tau).
$$

A past-supported causal update must satisfy

$$
\frac{\delta R(t)}{\delta J(s)}=0
\qquad\text{for every }s>t.
$$

The displayed kernel is even, $G_F(-u,\tau)=G_F(u,\tau)$, and is nonzero whenever $\sin(|u|/\tau)\ne0$. Choose any $s_0>t$ away from the discrete zeros $|t-s_0|=n\pi\tau$. A sufficiently narrow smooth perturbation of $J$ supported near $s_0$ changes $R(t)$ because its leading response is proportional to $G_F(t-s_0,\tau)$. Therefore the finite-width kernel fails the past-support condition.

Plainly: later source data can change the response assigned to an earlier time. That is exactly the behavior a causal wake-state update is not allowed to have.

The source also states the distributional limit

$$
\lim_{\tau\to0}G_F(u,\tau)=\delta(u).
$$

This limit recovers a local response only after the averaging width collapses to zero. It does not supply a finite-width causal regulator, a one-sided kernel, or a value for a singular self-diagonal term.

Plainly: shrinking the two-sided window all the way to a point removes the visible future dependence, but that limiting fact cannot justify using the finite window as causal history.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ routing

The kernel is rejected for three current uses:

1. It cannot define the independently evolving causal wake update because it has future support.
2. It cannot cancel or reinterpret a future-dependent term in the Master Equation without preserving the same forbidden dependence under another name.
3. It cannot regularize a self-diagonal or singular derivative term because its zero-width limit supplies no finite boundary prescription.

The retained artifact is the support predicate itself:

$$
K(t,s)=0\quad\text{for }s>t.
$$

Any proposed causal-history kernel can be tested against that predicate before its detailed dynamics are considered. This is a proof obligation already implicit in causal-history dependence, not a new validation gate.

Plainly: the useful result is a quick rejection test. If a proposed update listens to later times, it is not the causal wake update, whatever name or derivation produced it.

## Falsifier and limits

This negative result would be overturned for a different proposed kernel if its distributional support were proven to lie entirely in $s\le t$, or if the $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation established an additional native cancellation that removes every $s>t$ contribution in the complete response. Neither condition is present in equations (4.3)–(4.5).

No reader-facing corpus edit is warranted. The source's broader claims are neither needed to state the causal-support predicate nor admissible as architrino-level premises.
