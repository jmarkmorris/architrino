# History-Only Conservation Obstruction for the Transmitter-Side Equation

## Status

- Purpose: determine whether energy, momentum, and angular momentum follow from the same retained-history update as the current transmitter-factor acceleration
- Scope: the positive-width causal equation and its regular simple-root reduction with base factor $c_f/|D_t|$
- Standing: priority analysis; not canon and not an EOM solver specification
- Result: the retained-history update determines acceleration but does not determine the three conserved accounts from the current Architrino primitives

## Finding in plain language

The causal feedback loop is complete as an acceleration update: retained histories determine acceleration, acceleration changes the paths, and the changed paths extend the histories. That loop does not yet determine conserved energy, momentum, or angular momentum.

Two ingredients are missing. First, the current theory leaves the kinetic and momentum functions of one architrino unspecified. Second, a causal wake is fixed by transmitter history, but no independently derived rule assigns energy, momentum, or angular momentum to an emitted wake and updates those quantities when a receiver is accelerated.

One can always create accounts that balance by defining each wake change as the negative of whatever motion change was just computed. That construction would make every acceleration law appear conservative and therefore supplies no evidence. It is the post hoc cancellation forbidden by the promotion gate.

Claim classification: **derived underdetermination from the declared retained state and current kinematic definitions**. This is not a theorem that no future Architrino-native conservation construction can exist. It proves that the present primitives and acceleration equation do not yet supply one.

## 1. State actually advanced by the current equation

At absolute time $T$, let the retained state be

$$
\mathcal H_T
=
\left\{
\mathbf X_i(T+s),\mathbf V_i(T+s),q_i:
-h\le s\le0
\right\}_{i=1}^N.
$$

The positive-width equation determines

$$
\dot{\mathbf X}_i(T)=\mathbf V_i(T),
\qquad
\dot{\mathbf V}_i(T)
=
\mathcal A_i^{(\eta,\epsilon_c)}[\mathcal H_T].
$$

This is a causal update. It uses the present receiver event and retained transmitter histories only. Appending the newly accepted path segment produces $\mathcal H_{T+dT}$.

The state contains no separately specifiable wake amplitude, wake momentum density, or wake stress. Under the current point-transceiver ontology, the wake at $T$ is a deterministic record of transmitter identity, polarity, and transmitter path history.

Claim classification: **derived restatement of the causal retained-history theorem and current ontology**. A pair of admissible updates with the same complete $\mathcal H_T$ but different accelerations would falsify the state-sufficiency claim for acceleration.

## 2. Acceleration does not determine the motion accounts

Let one architrino have speed $s_i=\|\mathbf V_i\|$. The current energy chapter permits a primitive kinetic scalar

$$
E_{k,i}=K(s_i)
$$

and a radial momentum-like vector

$$
\mathbf p_i=P(s_i)\hat{\mathbf V}_i.
$$

Their changes under the same acceleration are

$$
\frac{dE_{k,i}}{dT}
=
\frac{K'(s_i)}{s_i}
\mathbf V_i\cdot\mathbf A_i,
$$

and, after decomposing $\mathbf A_i=A_{\parallel,i}\hat{\mathbf V}_i+\mathbf A_{\perp,i}$,

$$
\frac{d\mathbf p_i}{dT}
=
P'(s_i)A_{\parallel,i}\hat{\mathbf V}_i
+
\frac{P(s_i)}{s_i}\mathbf A_{\perp,i}.
$$

The corresponding angular-momentum change is

$$
\frac{d}{dT}
\left(\mathbf X_i\times\mathbf p_i\right)
=
\mathbf X_i\times\frac{d\mathbf p_i}{dT},
$$

because $\mathbf V_i$ is parallel to $\mathbf p_i$.

The transmitter-side acceleration fixes $\mathbf A_i$ but does not fix $K$ or $P$. Different allowed choices therefore give different energy, momentum, and angular-momentum changes on the same path history. The optional quadratic bookkeeping choice

$$
K(s)=\frac12\mu_{\mathrm{arch}}s^2,
\qquad
P(s)=\mu_{\mathrm{arch}}s
$$

is one consistent specialization, not a derivation from the Master Equation.

Claim classification: **derived kinematic underdetermination**. A unique $K$ and $P$ derived from existing Architrino primitives, with their compatibility proved for arbitrary acceleration direction, would falsify this obstruction.

## 3. The current wake record has no conservation update

The current ontology states that emitted wakes are transmitter-provenanced path-history structures. They superpose without scattering and have no freely specifiable state apart from transmitter histories. This determines where and when a wake is received. It does not yet assign three transported quantities

$$
E_{\mathrm{wake}}[\mathcal H_T],
\qquad
\mathbf P_{\mathrm{wake}}[\mathcal H_T],
\qquad
\mathbf J_{\mathrm{wake}}[\mathcal H_T]
$$

or a rule for their emission, propagation, reception, and boundary flux.

For any chosen $K$ and $P$, one could define

$$
\dot E_{\mathrm{wake}}
=
-\frac{d}{dT}\sum_iE_{k,i},
$$

$$
\dot{\mathbf P}_{\mathrm{wake}}
=
-\frac{d}{dT}\sum_i\mathbf p_i,
$$

and

$$
\dot{\mathbf J}_{\mathrm{wake}}
=
-\frac{d}{dT}
\sum_i\mathbf X_i\times\mathbf p_i.
$$

These definitions make all three totals constant by construction. They do not say what was emitted, what propagated at $c_f$, what crossed a boundary, or what changed at a reception. They provide no lower energy bound and no independent polarity or locality test. Because the definitions consume the residual they are supposed to explain, they are accounting identities rather than derived conservation laws.

Claim classification: **derived circularity test**. An account specified before the trajectory, computed from emitted and received wake data without using the balance residual as its definition, and closing on arbitrary nondegenerate test histories would pass this test.

## 4. Functional form of the missing theorem

A conserved total $\mathcal C[\mathcal H]$ must be a fixed function of the retained state whose first change along the complete history update vanishes. Let $\mathcal G(\mathcal H_T)$ denote the history-shift generator: it shifts every stored segment toward the old boundary and appends the endpoint values fixed by $\dot{\mathbf X}_i=\mathbf V_i$ and $\dot{\mathbf V}_i=\mathcal A_i[\mathcal H_T]$. The conservation condition is

$$
D\mathcal C[\mathcal H_T]
\left[\mathcal G(\mathcal H_T)\right]
=0.
$$

Here $D\mathcal C$ means the first-order change in the candidate account when the whole retained history is advanced. The acceleration law supplies the direction in which the state moves. It does not select a nontrivial solution $\mathcal C$, distinguish physical energy from another invariant, or prove a lower bound.

The current two-time action cannot supply this missing selection. Its complete variation depends on future receptions and does not reproduce the past-history acceleration. Therefore its symmetry accounts are not conservation laws for the transmitter-factor evolution.

Claim classification: **derived promotion obstruction**. A causal action or a direct history construction that produces the current acceleration and three fixed, bounded accounts on the same state would close it.

## 5. Conservation cannot regularize coincident same-transmitter birth

At coincident same-transmitter birth, the complete transmitter-side impulse on a fixed local window obeys the regulator-uniform lower bound

$$
J_{\eta,\epsilon_c}^{\mathrm{full}}(L,h)
\ge
C_\varphi K_i
\min\!\left(
\frac{c_f}{\alpha\epsilon_c^2},
\frac{L}{\eta\epsilon_c}
\right).
$$

Any nondegenerate momentum map converts this divergent velocity change into a divergent motion-account change. Assigning an equal opposite divergence to a wake account would balance a formal total but would not produce a finite outgoing velocity or a finite transition state.

The same-transmitter acceleration must therefore be made finite before conservation accounting can certify the transition. Conservation is a consistency condition on an admitted evolution, not a mechanism that removes a nonintegrable acceleration.

Claim classification: **derived ordering of the two promotion obligations**. A finite outgoing retained state from the unchanged point-kernel transition would falsify it.

## 6. Smallest missing structure

A non-circular conservation derivation needs all of the following from one Architrino-native construction:

1. a fixed kinetic scalar and momentum map, or a fixed universal conversion rule, with compatibility for arbitrary acceleration direction;
2. explicit wake account variables derived from transmitter-provenanced emission data;
3. a causal update for those variables through emission, propagation, reception, and finite-window boundary crossing;
4. energy bounded below on the admitted state family;
5. momentum and angular momentum transforming correctly under Euclidean translations and rotations;
6. balance proved on general non-circular histories without defining any account from the residual it is meant to cancel;
7. the same positive widths or near-origin rule used by the finite same-transmitter transition.

If all wake quantities remain deterministic functions of transmitter history, the construction must display those functions explicitly. If reception changes the wake state independently of the transmitter history, that is a change to the current wake ontology and requires an operator theory decision before canon or implementation work.

## 7. Disposition

The history-only acceleration loop has been attempted to the limit of the current primitives. It is causal, but the three conserved accounts are underdetermined and no non-circular update law follows from the present state.

Promotion classification: **closed negatively under the current primitive set**. Further algebra on the same acceleration functional cannot supply the missing kinematic and wake-account definitions. Promotion requires new derived structure or a deliberate restriction of the claimed equation domain.
