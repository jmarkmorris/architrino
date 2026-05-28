# Topology And Framed-Wake Rows

Promotion status: `priority-only`. This packet separates topological classification and framed-wake parity from branch retention. It refines [topological-carrier-and-spin-targets.md](topological-carrier-and-spin-targets.md), [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md), [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md), and [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md).

The governing rule is:

$$
\text{topology or framed-wake data}
\not\Longrightarrow
\text{dynamics, action, spinor, or observer-export closure}.
$$

Topology becomes useful only as a row attached to a branch that already has noncollision, root, support, action, and event status on one live ledger.

---

## 1. Tubular Noncollision Prerequisite

Let

$$
\Gamma_B=\bigcup_{i\in I}\operatorname{im}\mathbf{Y}_i
$$

be the labeled path union of a neutral swarm or shell swarm branch. A topological invariant may be assigned only if the branch has a tubular floor

$$
d_{\min}^{\Gamma}
=
\inf_{i\ne j,\lambda,\lambda'}
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda')\|
>
2\epsilon_{\mathrm{tube}}.
$$

If this floor is absent, link, braid, and framing claims have status

$$
\texttt{topology-unresolved-by-collision-floor}.
$$

The topological row must also declare whether the curve union is considered in the arclength chart, center-time chart, event-window chart, or a continuation family. Mixing charts invalidates the invariant comparison.

---

## 2. Link And Braid Ledger

When the tubular floor is present, the branch may emit

$$
\mathcal{T}_{\mathrm{link}}
=
\left(
\operatorname{Link}_{ij},
\operatorname{Wr}_i,
\operatorname{Tw}_i,
\operatorname{Braid}_{\Pi},
\mathsf{Orientation},
\mathsf{Provenance}
\right).
$$

This row classifies the branch family. It does not replace the force residual

$$
\nu_i\nu_i'\mathbf{T}_i+\nu_i^2\mathbf{K}_i
-
\Gamma_B^\nu \widetilde{\mathbf{F}}_i^\nu
$$

or the action/Noether residual. A topology-only improvement has status

$$
\texttt{classifier-only-not-retained}.
$$

---

## 3. Framed-Wake Record

A framed-wake row attaches a transported frame to each path:

$$
\mathcal{W}_i
=
\left(
\mathbf{Y}_i,
\mathbf{T}_i,
\mathbf{e}_{1,i},
\mathbf{e}_{2,i},
\mathsf{TransportPolicy},
\mathsf{GaugePolicy}
\right),
$$

with

$$
\mathbf{e}_{1,i}\cdot\mathbf{T}_i=0,
\qquad
\mathbf{e}_{2,i}=\mathbf{T}_i\times\mathbf{e}_{1,i}.
$$

The gauge-control residual is

$$
\Delta_{\mathrm{gc}}
=
\sup_{u\in W}
\max_i
\left\|
D_u\mathbf{e}_{1,i}
-
\mathcal{G}_i(\mathbf{Y},\nu,\mathcal{A}^{\nu},\mathcal{E})
\right\|,
$$

where $\mathcal{G}_i$ is the declared frame-transport law. No spinor statement is meaningful until $\mathcal{G}_i$ is declared and $\Delta_{\mathrm{gc}}$ is bounded on the same event ledger.

---

## 4. Parity Target

The framed-wake parity target is a theorem target:

$$
\Pi_{\mathcal{W}}^{2\pi}=1,
\qquad
\Pi_{\mathcal{W}}^{4\pi}=0,
\qquad
\Delta_{\mathrm{gc}}\le\epsilon_{\mathrm{gc}}.
$$

Here $\Pi_{\mathcal{W}}^{2\pi}$ records whether a $2\pi$ branch rotation returns the framed-wake state to the same gauge class, and $\Pi_{\mathcal{W}}^{4\pi}$ records whether a $4\pi$ rotation closes the lifted record. The exact convention must be declared by the angular-momentum ledger before this row can be compared with spinor behavior.

Allowed statuses:

| Status | Meaning |
| --- | --- |
| `framed-wake-not-computed` | no frame record was emitted |
| `framed-wake-gauge-open` | frame exists but gauge-control residual is open |
| `parity-target-passed` | parity and gauge-control rows pass on one branch ledger |
| `parity-target-failed` | parity row fails under the declared frame transport |
| `spinor-export-deferred` | parity row exists but angular-momentum or observer-export rows remain open |

---

## 5. Event Compatibility

Topology may change only through a ledgered event. The topology event residual is

$$
\mathcal{R}_{\mathrm{top\text{-}event}}
=
\left(
\mathcal{R}_{\mathrm{tube}},
\mathcal{R}_{\mathrm{self\text{-}hit}},
\mathcal{R}_{\mathrm{root\text{-}fold}},
\mathcal{R}_{\mathrm{support\text{-}contact}},
\mathcal{R}_{\mathrm{frame\text{-}jump}},
\mathcal{R}_{E\mathbf{p}\mathbf{J}Q}
\right).
$$

If a link, braid, or framing invariant changes while the event ledger is open, the branch status is

$$
\texttt{topology-change-event-open}.
$$

Only a closed event row may allow the topology classifier to pass through a transition.

---

## 6. Closure Block

The topology and framed-wake block is

$$
\mathcal{R}_{\mathrm{top/frame}}
=
\left(
d_{\min}^{\Gamma},
\mathcal{T}_{\mathrm{link}},
\Delta_{\mathrm{gc}},
\Pi_{\mathcal{W}}^{2\pi},
\Pi_{\mathcal{W}}^{4\pi},
\mathcal{R}_{\mathrm{top\text{-}event}},
\mathcal{R}_{\mathbf{J}},
\mathcal{R}_{\mathrm{export}}
\right).
$$

The branch may use this block as:

| Use | Required status |
| --- | --- |
| branch classifier | tubular floor plus emitted link/braid/framing row |
| spinor-holonomy theorem target | framed-wake gauge-control, parity, and angular-momentum rows |
| generation-family parameter | topology row plus mass-map evidence that the invariant changes $E_{\mathrm{internal}}$, exposure, or Noether sea response |
| observer export | all upstream dynamics, action, event, stability, and export rows statused |

Thus topology has high upside, but it remains downstream of the retained-branch certificate.
