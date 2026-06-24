# Bounded Speed Factor Self-Hit Exchange Closure

Promotion status: `priority-only`. This packet closes the exchange gap left after finite self-hit return. It refines [bounded-speed-factor-self-hit-return-lemma.md](bounded-speed-factor-self-hit-return-lemma.md), [bounded-speed-factor-speed-ode-solvability.md](bounded-speed-factor-speed-ode-solvability.md), [bounded-speed-factor-action-stability-closure.md](bounded-speed-factor-action-stability-closure.md), [bounded-speed-factor-event-normal-forms.md](bounded-speed-factor-event-normal-forms.md), and [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md).

It does not retain a branch. It states when a bounded-speed same-source self-hit excursion is a finite, ledgered exchange event rather than an untracked energy, momentum, angular-momentum, charge, or source-provenance leak.

---

## 1. Self-Hit Window And Force Split

Fix one architrino $i$, one bounded-speed ledger, and one certified self-hit scalar

$$
z(u)=Z_i(X(u)).
$$

The self-hit window is

$$
W=[u_-,u_+],
$$

with

$$
z(u_-)=0,
\qquad
\dot z(u_-)\ge v_{\mathrm{in},0}>0,
\qquad
z(u)\ge0\ \text{on }W,
$$

and exit row

$$
z(u_+)=0,
\qquad
\dot z(u_+)\le -v_{\mathrm{out},0}<0.
$$

The same window must carry the same speed band, root ledger, endpoint convention, support descriptor, source-pair policy, and event convention as the ordinary bounded-speed rows. On $W$, split the force used by the speed ODE as

$$
F_{i,\mathrm{hit}}^{\nu}
=
F_{i,\mathrm{pc}}^{\nu}
+
F_{i,\mathrm{self}}^{\nu}
+
F_{i,\mathrm{supp}}^{\nu}
+
F_{i,\mathrm{constr}}^{\nu}
+
F_{i,\mathrm{med/event}}^{\nu}.
$$

Here `pc` means ordinary partner/cross-binary roots, `self` is the declared self-hit potential row, `supp` is support multiplier work when active, `constr` is speed-band, period, gauge, or same-source constraint work not already counted as support, and `med/event` is coherent Noether sea or event exchange.

The speed forcing on the hit ledger is

$$
f_{i,\mathrm{hit}}^{\nu}(u)
=
T_i(u)\cdot F_{i,\mathrm{hit}}^{\nu}(u),
\qquad
T_i(u)=\mathbf{T}_i(\Lambda_i(u)).
$$

The speed excursion row is

$$
\nu_i(u)
=
\nu_i(u_-)
+
\Gamma_B^{\nu}
\int_{u_-}^{u}
f_{i,\mathrm{hit}}^{\nu}(s)\,ds
$$

with

$$
\nu_-\le\nu_i(u)\le\nu_+
\qquad
\text{for every }u\in W.
$$

---

## 2. Speed Energy And Self-Hit Potential

The speed-factor storage energy is

$$
E_{\mathrm{spd},i}^{\nu}(u)
=
\frac12m_{\mathrm{car}}c_f^2
\left(\nu_i(u)^2-1\right).
$$

Its hit-window change is

$$
\Delta E_{\mathrm{spd},i}^{\nu}(W)
=
\left[
E_{\mathrm{spd},i}^{\nu}
\right]_{u_-}^{u_+}
=
\frac12m_{\mathrm{car}}c_f^2
\left(
\nu_i(u_+)^2-\nu_i(u_-)^2
\right).
$$

Equivalently,

$$
\Delta E_{\mathrm{spd},i}^{\nu}(W)
=
\int_{u_-}^{u_+}
m_{\mathrm{car}}c_f^2
\nu_i(u)
\frac{d\nu_i}{du}
\,du.
$$

The self-hit potential row declares a collar potential

$$
U_{\mathrm{hit},i}^{\nu}(z,u)
$$

on $0\le z\le z_{\mathrm{col}}$. Its endpoint change is

$$
\Delta U_{\mathrm{hit},i}^{\nu}(W)
=
U_{\mathrm{hit},i}^{\nu}(z(u_+),u_+)
-
U_{\mathrm{hit},i}^{\nu}(z(u_-),u_-).
$$

Since $z(u_-)=z(u_+)=0$, this term vanishes only when the potential row has the same endpoint parameters:

$$
U_{\mathrm{hit},i}^{\nu}(0,u_+)
=
U_{\mathrm{hit},i}^{\nu}(0,u_-).
$$

If the self-hit potential changes because an event variable, support descriptor, medium-response variable, or normalization row changes across $W$, the endpoint difference is not discarded. It must be assigned to the Noether sea/event exchange row.

---

## 3. Work Rows On The Hit Window

Use causal-time work with the same normalization as the bounded-speed action packet:

$$
\mathcal{W}_{\mathrm{pc},i}^{\nu}(W)
=
E_\epsilon(R_*)
\int_{u_-}^{u_+}
\nu_i
T_i\cdot F_{i,\mathrm{pc}}^{\nu}
\,du,
$$

$$
\mathcal{W}_{\mathrm{supp},i}^{\nu}(W)
=
E_\epsilon(R_*)
\int_{u_-}^{u_+}
\nu_i
T_i\cdot F_{i,\mathrm{supp}}^{\nu}
\,du,
$$

$$
\mathcal{W}_{\mathrm{constr},i}^{\nu}(W)
=
\int_{u_-}^{u_+}
\mathcal{P}_{\mathrm{constr},i}^{\nu}
\,du,
$$

and

$$
\mathcal{W}_{\mathrm{med/event},i}^{\nu}(W)
=
\int_{u_-}^{u_+}
\mathcal{P}_{\mathrm{sea/event},i}^{\nu}
\,du
+
\mathcal{W}_{U,\mathrm{event},i}^{\nu}(W).
$$

The final term records explicit endpoint or parameter work in the self-hit potential. In the simplest fixed-potential convention,

$$
\mathcal{W}_{U,\mathrm{event},i}^{\nu}(W)=0.
$$

In a free-support branch, $\mathcal{W}_{\mathrm{supp},i}^{\nu}$ may be zero, exact over $W$, or assigned to $\mathcal{W}_{\mathrm{med/event},i}^{\nu}$. It may not be silently absorbed into the partner/cross row.

The self-hit force itself is internal to the speed-plus-potential subsystem. Its power must satisfy

$$
E_\epsilon(R_*)
\int_{u_-}^{u_+}
\nu_i
T_i\cdot F_{i,\mathrm{self}}^{\nu}
\,du
=
-
\Delta U_{\mathrm{hit},i}^{\nu}(W)
+
\mathcal{W}_{U,\mathrm{event},i}^{\nu}(W)
+
r_{U,i}^{\nu}(W),
$$

where $r_{U,i}^{\nu}(W)$ is the certified potential-row remainder. If this identity is not emitted, the self-hit potential is not an exchange ledger.

---

## 4. Exchange Residual

The hit-window energy exchange residual is

$$
\boxed{
\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)
=
\sum_{i\in I_W}
\left(
\Delta E_{\mathrm{spd},i}^{\nu}(W)
+
\Delta U_{\mathrm{hit},i}^{\nu}(W)
-
\mathcal{W}_{\mathrm{pc},i}^{\nu}(W)
-
\mathcal{W}_{\mathrm{supp},i}^{\nu}(W)
-
\mathcal{W}_{\mathrm{constr},i}^{\nu}(W)
-
\mathcal{W}_{\mathrm{med/event},i}^{\nu}(W)
\right).
}
$$

Here $I_W$ is the set of architrinos whose speed, self-hit potential, or event row changes on $W$. The self-hit exchange row closes only if

$$
\left|
\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)
\right|
\le
\tau_{\mathrm{exch,hit}}.
$$

This row is stricter than finite return. A packet may prove

$$
u_+-u_-\le\tau_{\mathrm{return}}
$$

and still fail exchange closure if any speed-energy jump, self-hit potential endpoint term, support work, constraint work, or medium/event update is missing.

---

## 5. Endpoint Alternatives

There are two admissible exit conventions.

**Same-speed exit.** The self-hit window returns to the ordinary ledger with the same speed:

$$
\nu_i(u_+)=\nu_i(u_-)
$$

for every affected $i$. Then

$$
\Delta E_{\mathrm{spd},i}^{\nu}(W)=0,
\qquad
\Gamma_B^{\nu}
\int_{u_-}^{u_+}
f_{i,\mathrm{hit}}^{\nu}(s)\,ds
=0,
$$

up to the declared speed-ODE tolerance. The exit status is

$$
\texttt{same-speed-self-hit-exit}.
$$

**Endpoint-jump exchange.** The self-hit window exits with a new ordinary-ledger speed:

$$
\Delta\nu_i(W)
=
\nu_i(u_+)-\nu_i(u_-)
\ne0.
$$

Then

$$
\Delta\nu_i(W)
=
\Gamma_B^{\nu}
\int_{u_-}^{u_+}
f_{i,\mathrm{hit}}^{\nu}(s)\,ds
$$

must be carried by $\Delta E_{\mathrm{spd},i}^{\nu}(W)$ and by the exchange residual above. The ordinary post-hit ledger starts from $\nu_i(u_+)$, not from the pre-hit speed. The exit status is

$$
\texttt{endpoint-jump-exchange-carried}.
$$

If $\Delta\nu_i(W)\ne0$ and no exchange row carries it, the status is

$$
\texttt{self-hit-speed-exchange-open}.
$$

---

## 6. Event Ledgers

The exchange row also has momentum, angular momentum, charge, and source-provenance ledgers. Define the out-minus-in branch changes

$$
\Delta X_{\mathrm{branch}}^{\nu}(W)
=
X_{\mathrm{branch}}^{\nu}(u_+)
-
X_{\mathrm{branch}}^{\nu}(u_-).
$$

For momentum and angular momentum, the residuals are

$$
\mathcal{R}_{\mathbf{p},\mathrm{hit}}^{\nu}(W)
=
\Delta\mathbf{p}_{\mathrm{branch}}^{\nu}
+
\Delta\mathbf{p}_{\mathrm{coh}}^{\nu}
+
\Delta\mathbf{p}_{\mathrm{recoil}}^{\nu}
+
\Delta\mathbf{p}_{\mathrm{boundary}}^{\nu}
+
\Delta\mathbf{p}_{\mathrm{sea}}^{\nu},
$$

and

$$
\mathcal{R}_{\mathbf{J},\mathrm{hit}}^{\nu}(W)
=
\Delta\mathbf{J}_{\mathrm{branch}}^{\nu}
+
\Delta\mathbf{J}_{\mathrm{coh}}^{\nu}
+
\Delta\mathbf{J}_{\mathrm{recoil}}^{\nu}
+
\Delta\mathbf{J}_{\mathrm{boundary}}^{\nu}
+
\Delta\mathbf{J}_{\mathrm{sea}}^{\nu}.
$$

The support row contributes to boundary exchange unless the support descriptor transforms with the branch and its work is exact. A support band fixed to an external center is external structure; its momentum and angular-momentum exchange must be named.

The charge residual is

$$
\mathcal{R}_{Q,\mathrm{hit}}^{\nu}(W)
=
\Delta Q_{\mathrm{branch}}^{\nu}
+
\epsilon
\left(
\Delta N_{+,\mathrm{sea}}
-
\Delta N_{-,\mathrm{sea}}
\right)
+
\Delta Q_{\mathrm{coh}}^{\nu}
+
\Delta Q_{\mathrm{boundary}}^{\nu}.
$$

For an ordinary same-source self-hit with no inventory transfer, this reduces to

$$
\mathcal{R}_{Q,\mathrm{hit}}^{\nu}(W)=0
$$

only after the packet explicitly states

$$
\Delta Q_{\mathrm{branch}}^{\nu}
=
\Delta N_{+,\mathrm{sea}}
=
\Delta N_{-,\mathrm{sea}}
=
\Delta Q_{\mathrm{coh}}^{\nu}
=
\Delta Q_{\mathrm{boundary}}^{\nu}
=0.
$$

For each architrino label $a$, source provenance uses

$$
\mathcal{R}_{\mathrm{src},a}^{\nu}(W)
=
\mu_a^{\mathrm{out}}(W)
-
\mu_a^{\mathrm{in}}(W)
-
s_a^{\mathrm{sea}\to\mathrm{branch}}(W)
+
s_a^{\mathrm{branch}\to\mathrm{sea}}(W).
$$

An ordinary self-hit does not duplicate the source label. It preserves the same labeled architrino while adding a same-source causal root over $W$:

$$
\mu_i^{\mathrm{out}}(W)=\mu_i^{\mathrm{in}}(W),
\qquad
s_i^{\mathrm{sea}\to\mathrm{branch}}(W)
=
s_i^{\mathrm{branch}\to\mathrm{sea}}(W)=0.
$$

All event ledgers must pass with the same endpoint convention as $\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)$:

$$
\|\mathcal{R}_{\mathbf{p},\mathrm{hit}}^{\nu}\|
\le\tau_{\mathbf{p},\mathrm{hit}},
\qquad
\|\mathcal{R}_{\mathbf{J},\mathrm{hit}}^{\nu}\|
\le\tau_{\mathbf{J},\mathrm{hit}},
$$

$$
|\mathcal{R}_{Q,\mathrm{hit}}^{\nu}|
\le\tau_{Q,\mathrm{hit}},
\qquad
\sup_a|\mathcal{R}_{\mathrm{src},a}^{\nu}|
\le\tau_{\mathrm{src},\mathrm{hit}}.
$$

---

## 7. Finite Return Plus Exchange Closure

A self-hit event is closed only when these rows hold on the same bounded-speed ledger:

1. $W=[u_-,u_+]$ is certified by the self-hit return lemma, including positive delay, positive $J_{\mathrm{self}}^{\nu}$ floor, speed band, collar bound, and nontrapping inequality.
2. The hit-ledger speed ODE is solved on $W$ and satisfies the speed-band excursion row.
3. The endpoint convention is one of `same-speed-self-hit-exit` or `endpoint-jump-exchange-carried`.
4. The potential row emits $\Delta U_{\mathrm{hit}}^{\nu}(W)$ and its potential-work remainder.
5. Partner/cross, support, constraint, and Noether sea/event work rows are evaluated in the same causal-time variable.
6. The exchange residual satisfies $|\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)|\le\tau_{\mathrm{exch,hit}}$.
7. Momentum, angular momentum, charge, and source-provenance residuals pass their declared tolerances.
8. The exit ordinary ledger reopens with the emitted post-hit speed, root count, same-source policy, support descriptor, and endpoint convention.

When these rows pass, the self-hit excursion is a finite event exchange rather than a retained ordinary same-source branch. When any row fails, the master packet must report the first failed status and remain

$$
\texttt{not-retained}.
$$

---

## 8. Theorem Target

**Theorem target: bounded speed factor self-hit exchange closure.** Fix one bounded-speed same-level branch ledger, one same-source self-hit scalar $Z_i$, one certified self-hit window $W=[u_-,u_+]$, one speed band, one support descriptor, one action scale convention, and one event endpoint convention. Suppose:

1. the finite-return hypotheses of [bounded-speed-factor-self-hit-return-lemma.md](bounded-speed-factor-self-hit-return-lemma.md) hold on $W$;
2. the speed excursion on $W$ solves the hit-ledger speed ODE with the same force split used by the action row;
3. either the same-speed exit row holds or the endpoint speed jump is carried by speed-factor storage exchange;
4. the self-hit potential work identity holds with certified remainder;
5. partner/cross, support, constraint, and Noether sea/event work rows are evaluated on the same causal-time window;
6. $\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)$ and the momentum, angular-momentum, charge, and source-provenance residuals pass their tolerances;
7. the post-hit ordinary ledger is reopened with the emitted endpoint data.

Then the self-hit interval may be treated as a finite bounded-speed event exchange. It discharges the `bounded-speed-self-hit-unledgered` row in the master retention packet, but it does not by itself prove root persistence, coupled fixed-point closure, action curl closure, stability, observer export, or retained-branch status.

Proof route:

1. Use the self-hit return lemma to make $W$ finite and to bound the collar penetration.
2. Integrate the hit-ledger speed ODE over $W$ to compute $\Delta\nu_i(W)$ and $\Delta E_{\mathrm{spd},i}^{\nu}(W)$.
3. Use the self-hit potential identity to move the self-hit force work into $\Delta U_{\mathrm{hit},i}^{\nu}(W)$ plus a certified event remainder.
4. Split all remaining work into partner/cross, support, constraint, and Noether sea/event rows in causal time.
5. Form $\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)$ and require the declared tolerance.
6. Apply the same out-minus-in convention to momentum, angular momentum, charge, and source provenance.
7. Use the endpoint convention to either return to the same ordinary speed or create a ledgered endpoint-speed jump.

---

## 9. Output Schema

| Field | Required payload |
| --- | --- |
| `self_hit_window` | $W=[u_-,u_+]$, $z(u_\pm)$, entry/exit signs, collar, duration, and finite-return certificate |
| `hit_ledger_identity` | source-pair policy, same-source policy, root ledger, support descriptor, speed band, endpoint convention, and event convention |
| `speed_excursion` | $f_{i,\mathrm{hit}}^{\nu}$, primitive, speed-band row, $\Delta\nu_i(W)$, and same-speed or endpoint-jump status |
| `delta_E_spd` | $\Delta E_{\mathrm{spd},i}^{\nu}(W)$ for every affected architrino |
| `delta_U_hit` | $\Delta U_{\mathrm{hit},i}^{\nu}(W)$, endpoint parameters, and potential-work remainder |
| `partner_cross_work` | $\mathcal{W}_{\mathrm{pc},i}^{\nu}(W)$ in causal time |
| `support_work` | $\mathcal{W}_{\mathrm{supp},i}^{\nu}(W)$, support descriptor, multiplier or variational-inequality convention, and exchange assignment |
| `constraint_work` | $\mathcal{W}_{\mathrm{constr},i}^{\nu}(W)$ for speed-band, period, gauge, or same-source constraints not counted as support |
| `medium_event_work` | $\mathcal{W}_{\mathrm{med/event},i}^{\nu}(W)$, Noether sea/event update, and explicit self-hit potential endpoint exchange |
| `exchange_residual` | $\mathcal{R}_{\mathrm{exch,hit}}^{\nu}(W)$ and $\tau_{\mathrm{exch,hit}}$ |
| `endpoint_exit` | `same-speed-self-hit-exit`, `endpoint-jump-exchange-carried`, or first failed endpoint status |
| `momentum_ledger` | $\mathcal{R}_{\mathbf{p},\mathrm{hit}}^{\nu}$, recoil, boundary/support, coherent, and Noether sea terms |
| `angular_momentum_ledger` | $\mathcal{R}_{\mathbf{J},\mathrm{hit}}^{\nu}$, torque/support, recoil, boundary, coherent, and Noether sea terms |
| `charge_ledger` | $\mathcal{R}_{Q,\mathrm{hit}}^{\nu}$ and explicit zero-inventory-transfer row when applicable |
| `source_provenance` | $\mathcal{R}_{\mathrm{src},a}^{\nu}$ for every labeled architrino and no-duplication row for same-source self-hit |
| `post_hit_ledger` | ordinary ledger reopened at $u_+$ with post-hit speed, root count, support descriptor, endpoint convention, and event reset status |
| `status` | first failed status or `bounded-speed-self-hit-exchange-closed` |

---

## 10. First-Failure Status Ordering

A self-hit exchange packet must report the first failed row in this order:

1. `self-hit-window-open`
2. `self-hit-return-open`
3. `self-hit-ledger-mismatch`
4. `self-hit-speed-excursion-open`
5. `self-hit-endpoint-convention-open`
6. `self-hit-potential-energy-open`
7. `self-hit-partner-cross-work-open`
8. `self-hit-support-work-open`
9. `self-hit-constraint-work-open`
10. `self-hit-medium-event-work-open`
11. `self-hit-exchange-residual-open`
12. `self-hit-momentum-ledger-open`
13. `self-hit-angular-momentum-ledger-open`
14. `self-hit-charge-ledger-open`
15. `self-hit-source-provenance-open`
16. `self-hit-exit-ledger-open`
17. `bounded-speed-self-hit-exchange-closed`

If the calculation deliberately remains in the fixed-speed subspace, the status is

$$
\texttt{fixed-speed-special-case}.
$$

If the packet proves finite return but omits the exchange residual, the status is

$$
\texttt{self-hit-exchange-residual-open}.
$$

If the packet closes the energy residual but omits momentum, angular momentum, charge, or source provenance, the first missing ledger row above is the status. A closed self-hit exchange row remains a priority theorem target until it is consumed by the coupled fixed-point, action, Noether, stability, and master retention packets.
