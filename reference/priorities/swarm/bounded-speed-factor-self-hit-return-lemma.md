# Bounded Speed Factor Self-Hit Return Lemma

Promotion status: `priority-only`. This packet sharpens the bounded speed factor self-hit row from [variable-speed-factor-extension.md](variable-speed-factor-extension.md), [bounded-speed-factor-event-normal-forms.md](bounded-speed-factor-event-normal-forms.md), [bounded-speed-factor-executable-solver-protocol.md](bounded-speed-factor-executable-solver-protocol.md), and [retained-branch-dynamics-protocol.md](retained-branch-dynamics-protocol.md). The associated exchange ledger is supplied by [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md).

It addresses the specific bounded speed factor concern: an architrino may briefly cross the same-source self-hit hinge because its speed factor changes the causal elapsed distance, but the crossed state is admissible only if it is forced to return to the ordinary partner/cross-binary ledger within a certified short time.

This does not retain a branch.

---

## 1. Self-Hit Scalar Surface

Fix one architrino $i$ and a same-source local pair

$$
q=(\lambda^-,\lambda),
\qquad
h=\lambda-\lambda^- >0,
$$

in one lifted arclength chart. The bounded speed factor causal delay is

$$
\eta_i(q)
=
\int_{\lambda^-}^{\lambda}
\frac{d\xi}{\nu_i(\xi)}.
$$

The overspeed excess and chord deficit are

$$
\mathcal{A}_i(q)
=
\int_{\lambda^-}^{\lambda}
\left(1-\frac{1}{\nu_i(\xi)}\right)d\xi,
$$

and

$$
\mathcal{D}_i(q)
=
h-
\left\|
\mathbf{Y}_i(\lambda)-\mathbf{Y}_i(\lambda^-)
\right\|.
$$

The self-hit scalar is

$$
\mathcal{Z}_i(q;X)
=
\mathcal{A}_i(q;X)-\mathcal{D}_i(q;X),
$$

where $X$ denotes the current bounded-speed branch state, including $\mathbf{Y}_i$, $\nu_i$, the active root ledger, and the declared endpoint convention. Since

$$
\eta_i=h-\mathcal{A}_i,
$$

the same scalar is the bounded-speed same-source root residual:

$$
\mathcal{Z}_i(q;X)
=
\left\|
\mathbf{Y}_i(\lambda)-\mathbf{Y}_i(\lambda^-)
\right\|
-
\eta_i(q)
=
G_{\mathrm{self},i}^{\nu}(q;X).
$$

The self-hit surface is

$$
\Sigma_{\mathrm{hit},i}
=
\{
(q,X):
\mathcal{Z}_i(q;X)=0,\
\eta_i(q)\ge\eta_{\min},\
J_{\mathrm{self}}^{\nu}(q;X)\ge J_{\mathrm{self},0}
\}.
$$

Here

$$
J_{\mathrm{self}}^{\nu}
=
1-\nu_i(\lambda^-)\mathbf{T}_i(\lambda^-)\cdot
\widehat{\mathbf{R}}_{\mathrm{self}},
$$

with

$$
\widehat{\mathbf{R}}_{\mathrm{self}}
=
\frac{
\mathbf{Y}_i(\lambda)-\mathbf{Y}_i(\lambda^-)
}{
\left\|
\mathbf{Y}_i(\lambda)-\mathbf{Y}_i(\lambda^-)
\right\|
}.
$$

The sign convention is:

| Sign | Meaning |
| --- | --- |
| $\mathcal{Z}_i<0$ | fixed-speed exclusion side, no ordinary same-source root from this pair |
| $\mathcal{Z}_i=0$ | self-hit hinge |
| $\mathcal{Z}_i>0$ | crossed side where an ordinary same-source root may exist if all ledger rows pass |

For a first local birth, use the local maximum over a pair chart $Q_i$:

$$
Z_i(X)
=
\max_{q\in Q_i}\mathcal{Z}_i(q;X).
$$

At a simple maximum $q_i(X)$,

$$
\nabla_q\mathcal{Z}_i(q_i;X)=0,
\qquad
-\nabla_q^2\mathcal{Z}_i(q_i;X)>0,
$$

so $Z_i(X)=\mathcal{Z}_i(q_i(X);X)$ is the scalar normal coordinate for the event.

---

## 2. Crossing Normal Velocity

Let $u$ be the bounded-speed causal-time coordinate, and let $X(u)$ be a continuation or dynamics trajectory on one ledger. For a tracked pair $q(u)$, define the crossing normal velocity by

$$
V_{\mathrm{hit},i}(u)
=
\frac{d}{du}\mathcal{Z}_i(q(u);X(u)).
$$

In expanded form,

$$
V_{\mathrm{hit},i}
=
\nabla_q\mathcal{Z}_i\cdot\dot q
+
D_X\mathcal{Z}_i[\dot X].
$$

For the local-maximum event coordinate $Z_i(X(u))$, the envelope identity gives

$$
\dot Z_i(u)
=
D_X\mathcal{Z}_i(q_i(X(u));X(u))[\dot X(u)],
$$

because $\nabla_q\mathcal{Z}_i(q_i;X)=0$. A transverse entry into the self-hit side at $u=u_-$ requires

$$
Z_i(u_-)=0,
\qquad
\dot Z_i(u_-)\ge v_{\mathrm{in},0}>0.
$$

A certified return crossing at $u=u_+$ requires

$$
Z_i(u_+)=0,
\qquad
\dot Z_i(u_+)\le -v_{\mathrm{out},0}<0.
$$

If $\dot Z_i=0$ at the hinge, the event is not a simple ordinary self-hit crossing. It must be handled as a fold-layer or multi-event boundary, not as a retained ordinary same-source row.

---

## 3. Local Dwell-Time Bound

On a self-hit interval, write the scalar normal coordinate as

$$
z(u)=Z_i(X(u)).
$$

The crossed interval is

$$
\mathcal{H}_i
=
\{u\in[u_-,u_+]:z(u)\ge0\},
$$

with the same-source root floor and speed-band rows kept active throughout. Suppose the normal dynamics obey the one-sided return inequality

$$
\ddot z(u)\le -a_{\mathrm{return}}
$$

whenever

$$
0\le z(u)\le z_{\mathrm{col}},
\qquad
J_{\mathrm{self}}^{\nu}\ge J_{\mathrm{self},0},
\qquad
\nu_-\le\nu_i\le\nu_+,
$$

for some $a_{\mathrm{return}}>0$. If the entry velocity satisfies

$$
0<\dot z(u_-)\le V_{\mathrm{hit},+},
$$

then the self-hit interval must recross:

$$
u_+-u_-
\le
\frac{2\dot z(u_-)}{a_{\mathrm{return}}}
\le
\frac{2V_{\mathrm{hit},+}}{a_{\mathrm{return}}}.
$$

The maximum penetration depth is bounded by

$$
\max_{\mathcal{H}_i}z
\le
\frac{\dot z(u_-)^2}{2a_{\mathrm{return}}}
\le
\frac{V_{\mathrm{hit},+}^2}{2a_{\mathrm{return}}}.
$$

Thus the ordinary self-hit row is admissible only if the declared collar satisfies

$$
\frac{V_{\mathrm{hit},+}^2}{2a_{\mathrm{return}}}
\le
z_{\mathrm{col}},
$$

and the declared hit duration satisfies

$$
\operatorname{dur}_u(\mathcal{H}_i)
\le
\tau_{\mathrm{hit}}^u.
$$

Here $\operatorname{dur}_u(\mathcal{H}_i)=u_+-u_-$ in the normalized causal-time chart. Physical duration is $\operatorname{dur}_t=(R_*/c_f)\operatorname{dur}_u$.

---

## 4. Nontrapping Condition

The local return inequality in Section 3 is the concrete nontrapping condition. It can be certified from the scalar normal force balance. Let

$$
m_{\mathrm{hit},i}(u)>0
$$

be the effective normal inertia in the $z$ coordinate, and write

$$
m_{\mathrm{hit},i}\ddot z
=
F_{\mathrm{drive},i}
-
\partial_zU_{\mathrm{hit},i}(z,u)
+
R_{\mathrm{hit},i}.
$$

Here $U_{\mathrm{hit},i}$ is the declared self-hit repulsive potential on $z\ge0$, $F_{\mathrm{drive},i}$ is the projected force from the ordinary partner/cross-binary ledger and speed-factor constraint rows, and $R_{\mathrm{hit},i}$ is the certified numerical or truncation remainder.

A strong nontrapping certificate is the inequality

$$
\partial_zU_{\mathrm{hit},i}(z,u)
-
|F_{\mathrm{drive},i}(u)|
-
|R_{\mathrm{hit},i}(u)|
\ge
m_{\mathrm{hit},i}(u)a_{\mathrm{return}}
$$

for all

$$
0\le z\le z_{\mathrm{col}},
\qquad
u\in\mathcal{H}_i.
$$

This says the projected repulsive potential points toward $z<0$ strongly enough to dominate all same-ledger driving terms. It rules out a positive-depth equilibrium inside the collar. If this inequality fails, the packet cannot claim quick return; the status is

$$
\texttt{self-hit-nontrapping-open}.
$$

---

## 5. Repulsive Potential And Speed-Band Certificate

The bounded speed factor rows give an a priori normal velocity cap. If the scalar surface has derivative envelope

$$
\left|
\frac{d}{du}Z_i(X(u))
\right|
\le
L_{Z,i}^{\nu}
$$

throughout the speed-band chart, then set

$$
V_{\mathrm{hit},+}=L_{Z,i}^{\nu}.
$$

The same bound can be assembled from coefficient derivatives:

$$
L_{Z,i}^{\nu}
\le
L_{Z,a}\|\dot a\|
+
L_{Z,b}\|\dot b\|
+
L_{Z,\gamma}|\dot\gamma|,
$$

with the speed rows constrained by

$$
0<\nu_-\le\nu_i(\lambda)\le\nu_+.
$$

Equivalently, define the scalar normal energy

$$
E_{\mathrm{hit},i}
=
\frac12m_{\mathrm{hit},i}\dot z^2
+
U_{\mathrm{hit},i}(z,u).
$$

At entry,

$$
E_{\mathrm{hit},i}(u_-)
\le
\frac12m_{\mathrm{hit},+}V_{\mathrm{hit},+}^2
+
U_{\mathrm{hit},i}(0,u_-).
$$

Let $W_{\mathrm{drive}}$ bound the positive work injected by non-self rows during the hit interval:

$$
W_{\mathrm{drive}}
\ge
\int_{\mathcal{H}_i}
\left(F_{\mathrm{drive},i}+R_{\mathrm{hit},i}\right)_+\dot z_+\,du.
$$

If the repulsive barrier satisfies

$$
U_{\mathrm{hit},i}(z_{\mathrm{col}},u)
-
U_{\mathrm{hit},i}(0,u_-)
>
\frac12m_{\mathrm{hit},+}V_{\mathrm{hit},+}^2
+
W_{\mathrm{drive}},
$$

then the trajectory cannot leave the declared collar on the crossed side. If, in addition, the strong nontrapping inequality holds on that collar, the trajectory must recross $z=0$ with

$$
u_+-u_-
\le
\frac{2V_{\mathrm{hit},+}}{a_{\mathrm{return}}}.
$$

For a smooth monotone barrier, an energy-only return bound may also be emitted:

$$
\tau_{\mathrm{energy}}
=
2\int_0^{z_*}
\frac{dz}{
\sqrt{
\frac{2}{m_{\mathrm{hit},-}}
\left(
E_{\mathrm{hit},+}+W_{\mathrm{drive}}-U_{\mathrm{hit},i}(z)
\right)
}
},
$$

where $z_*$ is the first turning depth and the denominator is interpreted with interval lower bounds. This row is admissible only when the turning point is simple:

$$
\partial_zU_{\mathrm{hit},i}(z_*)>
|F_{\mathrm{drive},i}|+|R_{\mathrm{hit},i}|.
$$

The solver may use either the acceleration bound or the energy integral, but it must state which one supplies $\tau_{\mathrm{return}}$.

---

## 6. Compatibility With Existing Self-Root Exclusion

When $\nu_i\equiv1$,

$$
\mathcal{A}_i=0,
\qquad
\mathcal{D}_i\ge0,
$$

and the only equality case is the zero-Jacobian fixed-speed case from [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md). Therefore this packet does not weaken the fixed-speed exclusion. It applies only after a bounded speed factor row has produced

$$
Z_i>0,
\qquad
J_{\mathrm{self}}^{\nu}\ge J_{\mathrm{self},0}>0.
$$

The return certificate also does not replace the action/event ledger. During the hit interval, the force row must still emit:

$$
\widetilde{\mathbf{F}}_i^{\nu}
=
\widetilde{\mathbf{F}}_{i,\mathrm{partner/cross}}^{\nu}
+
\widetilde{\mathbf{F}}_{i,\mathrm{self-hit}}^{\nu}
+
\widetilde{\mathbf{F}}_{i,\mathrm{med}}^{\nu},
$$

with source provenance, work, energy, momentum, angular momentum, charge, and event-exchange entries computed on the same bounded-speed ledger.

---

## 7. Lemma Target

**Lemma target: bounded speed factor self-hit return.** Fix one bounded-speed same-level branch ledger, one same-source pair chart, one self-hit scalar $Z_i$, one speed band $0<\nu_-\le\nu_i\le\nu_+$, one positive same-source Jacobian floor, and one declared self-hit collar $0\le z\le z_{\mathrm{col}}$. Suppose:

1. the self-hit entry is transverse, $Z_i(u_-)=0$ and $\dot Z_i(u_-)>0$;
2. the speed-band derivative envelope gives $|\dot Z_i|\le V_{\mathrm{hit},+}$;
3. the repulsive potential and ordinary ledger driving terms satisfy the strong nontrapping inequality with $a_{\mathrm{return}}>0$;
4. the collar depth satisfies $V_{\mathrm{hit},+}^2/(2a_{\mathrm{return}})\le z_{\mathrm{col}}$;
5. the same-source root, delay, support, and Jacobian floors remain positive until recrossing.

Then the self-hit interval is finite and satisfies

$$
\operatorname{dur}_u(\mathcal{H}_i)
\le
\tau_{\mathrm{return}}
\le
\frac{2V_{\mathrm{hit},+}}{a_{\mathrm{return}}},
$$

with physical time recovered by $\operatorname{dur}_t=(R_*/c_f)\operatorname{dur}_u$. If this upper bound is at most $\tau_{\mathrm{hit}}^u$ and the overspeed budget satisfies

$$
\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda
\le
B_{\mathrm{hit}},
$$

then the packet may mark the row

$$
\texttt{bounded-speed-self-hit-return-certified}.
$$

Proof route:

1. use $Z_i$ as a scalar normal coordinate for the self-hit surface;
2. use transversality to identify the entry side and initial normal velocity;
3. use the speed band to bound the entering normal kinetic budget;
4. use the repulsive potential inequality to obtain $\ddot z\le-a_{\mathrm{return}}$ on the crossed collar;
5. integrate the scalar inequality to bound penetration depth and return time;
6. combine this with the duration and overspeed-budget rows from the bounded speed factor ledger.

---

## 8. Required Output Fields

Future bounded speed factor self-hit packets should emit:

| Field | Required payload |
| --- | --- |
| `self_hit_scalar` | $Z_i$ or tracked $\mathcal{Z}_i(q;X)$, sign convention, pair chart, and collar |
| `crossing_normal_velocity` | $\dot Z_i$ or $\dot{\mathcal{Z}}_i$, entry and exit signs, and derivative envelope |
| `same_source_root_floor` | $\eta_{\min}$, $J_{\mathrm{self},0}$, support, gap, and noncollision margins |
| `speed_band_certificate` | $\nu_-$, $\nu_+$, speed derivative bounds, and $V_{\mathrm{hit},+}$ |
| `repulsive_potential` | $U_{\mathrm{hit},i}$, $\partial_zU_{\mathrm{hit},i}$, effective normal inertia, and force projection convention |
| `nontrapping_certificate` | $a_{\mathrm{return}}$, drive/remainder bounds, and no positive-depth equilibrium in the collar |
| `dwell_time_bound` | $\tau_{\mathrm{return}}$, $\tau_{\mathrm{hit}}^u$, and the causal-time to physical-time conversion |
| `overspeed_budget` | $\int_{\mathcal{H}_i}(\nu_i-1)_+\,d\lambda\le B_{\mathrm{hit}}$ |
| `action_event_rows` | work, source provenance, energy, momentum, angular momentum, charge, and event exchange from [bounded-speed-factor-self-hit-exchange-closure.md](bounded-speed-factor-self-hit-exchange-closure.md) |
| `self_hit_return_status` | first failed row or certified status |

Failure/status codes:

$$
\texttt{self-hit-scalar-open},
\qquad
\texttt{self-hit-crossing-not-transverse},
\qquad
\texttt{self-hit-speed-band-open},
$$

$$
\texttt{self-hit-nontrapping-open},
\qquad
\texttt{self-hit-return-time-open},
\qquad
\texttt{self-hit-overspeed-budget-open},
$$

$$
\texttt{self-hit-action-event-open},
\qquad
\texttt{bounded-speed-self-hit-return-certified},
\qquad
\texttt{not-retained}.
$$
