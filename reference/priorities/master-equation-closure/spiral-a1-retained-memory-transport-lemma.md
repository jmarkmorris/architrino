# Spiral A1 Receiver-Normal Transport Target

Status. Current-law restart target for A1 retained-memory transport. This packet
does not supply an A1 orbit certificate, force-balance collar, radial residual,
tangential residual, or no-go.

Claim level. Priority-only restart target.

## What Survives

The retained-memory transport lane may still use:

| Surviving row | Role |
| --- | --- |
| active-root windows | retained topology |
| inactive gaps | branch-chart exclusion |
| finite-memory depth | memory-horizon control |
| source-normal Jacobian floor | root transversality |
| root-transport identity | branch-continuation diagnostic |

These rows are not force/action evidence.

## Current-Law Burden

Any finite-collar A1 transport packet must emit same-record receiver-normal rows:
$$
W_{\alpha}^{\mathrm{rec}}
=
\left|D_{t,\alpha}/D_{s,\alpha}\right|
$$
for each retained branch $\alpha\in\{P_1,P_2,P_3,S_1\}$ and for every box used
in the collar.

The collar can be evaluated only after the radial and tangential sums are
rebuilt from those $W^{\mathrm{rec}}$ intervals.

## Promotion Rule

A future transport lemma may pass or fail only if its force/action rows are
computed from the same retained records as the root topology rows. Root
transport alone remains a diagnostic dependency.
