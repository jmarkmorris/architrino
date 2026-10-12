# Why member 2's orbit radius falls while it climbs (ceiling-contact open research, problem 8)

**The equation in this record is the field-speed ceiling variant, not the Master Equation.** It is an authorized research variation with the canonical equation retained as baseline. Nothing here adopts it, and nothing here selects a contact rule, event map or continuation.

This record closes obligation 6 of the [contact study](ceiling-contact-two-hour-2026-10-06.md#10-validation-files-remaining-obligations-and-review-status) (the operator's problem 8 under the [launch brief](ceiling-contact-open-research-launch-brief.md)). The study measured that between $0.46$ and $0.75$ periods of release C1, while member 2 rides the ceiling and climbs from the mid-plane to the height of member 0, its distance from the original rotation axis falls from $0.1727$ to $0.1425$, and recorded the fall without a derivation. Values use $K=c_f=c_a=1$; $P=1.282228$; sizes are $0.196735$.

## 1. Result

**The radius falls because riding the ceiling fixes member 2's speed at one, so climbing takes speed away from its rotation, and the centripetal support of its orbit collapses while the inward pull toward member 0 grows (derived decomposition, measured terms).** In cylindrical coordinates about the original axis the exact identity $\ddot\rho=a_\rho+\rho\dot\varphi^2$ holds for any motion, where $a_\rho$ is the radial component of the acceleration actually applied. Under the frozen specification that acceleration is the summed rows with the forward part removed, so $a_\rho$ splits into the radial parts of the row from member 0, of the row from member 1, and of the removed forward part. The table of Section 3 follows the four terms. Between $0.46$ and $0.55\,P$ the azimuthal speed $v_\varphi=\rho\dot\varphi$ drops from $0.88$ to $0.63$ as the velocity, held at unit length, turns toward the climb; the centripetal term $\rho\dot\varphi^2$ falls from $4.5$ to $2.3$ while the inward row from member 0 grows from $-3.0$ to $-9.6$ as member 2 closes on it (the row's size grows from $31$ to $48$ and its inward tilt increases). The unbalanced inward acceleration gives member 2 an inward radial velocity of $-0.19$ by $0.55\,P$. From $0.60\,P$ the climb is nearly complete, $v_\varphi$ returns to one, the centripetal term rises to $7.0$ and arrests the fall at $\rho=0.1414$ at $0.70\,P$; thereafter $\rho$ oscillates slightly about $0.142$, where the now larger inward rows of the nearer member 0 and of member 1 balance $v_\varphi^2/\rho$ at $v_\varphi\approx1$.

**Accounting (measured, both stored trajectories).** The fall $\rho(0.78P)-\rho(0.40P)=-0.02986$ is the sum of double time integrals of the four terms from $0.40\,P$: row from member 0 $-0.6995$, row from member 1 $-0.1609$, removed forward part $+0.3369$, centripetal term $+0.4938$, free flight $-0.0001$. The fall is a small residual of large opposing terms, which is why it has no single cause; the sequence above is what the time series shows. The subject integrator's stored trajectory gives $-0.6992$, $-0.1609$, $+0.3368$, $+0.4935$.

**Why the new radius is below member 0's original radius $0.1567$ (derived from the same balance).** At the ceiling $v_\varphi$ cannot exceed one and tends to one as the climb ends, so the centripetal requirement is about $1/\rho$; the inward pull is the sum of the two rows' radial parts, which at $0.70$ to $0.78\,P$ is $-5.9$ to $-11.2$, far larger than the $-4.2$ that held the member at $0.1727$ with speed $0.846$. A larger inward pull at a speed capped at one is balanced at a smaller radius, and the overshoot of the fall to $0.141$ is the inward momentum gained while the support was weak.

## 2. The decomposition identity

Let $\rho=\sqrt{x^2+y^2}$ and $\mathbf e_\rho$, $\mathbf e_\varphi$, $\mathbf e_z$ be the cylindrical unit vectors at member 2's position. For any twice differentiable motion, $\ddot\rho=\mathbf e_\rho\cdot\dot{\mathbf V}+\rho\dot\varphi^2$ with $\rho\dot\varphi=\mathbf e_\varphi\cdot\mathbf V$: the first term is the radial component of the acceleration and the second the kinematic centripetal term. Under the frozen specification, for a member riding the ceiling with unit velocity $\mathbf u$, $\dot{\mathbf V}=\mathbf A^{\mathrm{ord}}-f\mathbf u$ with $f=(\mathbf u\cdot\mathbf A^{\mathrm{ord}})_+$ and $\mathbf A^{\mathrm{ord}}=\mathbf A_{2\leftarrow0}+\mathbf A_{2\leftarrow1}$, so

$$
\ddot\rho=\mathbf e_\rho\cdot\mathbf A_{2\leftarrow0}+\mathbf e_\rho\cdot\mathbf A_{2\leftarrow1}-f\,(\mathbf e_\rho\cdot\mathbf u)+\rho\dot\varphi^2
$$

Integrating twice from $t_0$, $\rho(t)-\rho(t_0)-\dot\rho(t_0)(t-t_0)$ equals the sum of the double integrals of the four terms, which is the accounting of Section 1. The removed forward part contributes outward while $\mathbf u$ points inward ($\dot\rho<0$), because removing a forward push along an inward-tilted velocity is an outward correction; it changes sign at $0.70\,P$ when $\dot\rho$ changes sign.

## 3. Measurements

Instrument `ccor_radius.py` (new) reads a stored trajectory, evaluates every row on member 2 by its own causal-root solve on the study's stored history through the study's `Hist` interpolant (`ccth_diag.py`, imported unchanged), applies the response and tabulates the terms. Controls, asserted before the target, on the fine blind-reference trajectory: at the first node the axial rows from members 0 and 1 are $+25.5844$ and $-25.5844$ (record: $\pm25.584$) and the summed row minus the centripetal acceleration is $2\times10^{-15}$; over the climb the summed effective acceleration agrees with the finite-difference derivative of the stored velocity with median relative difference $3\times10^{-6}$ (so the rows evaluated here are the rows the integrator applied); the double integral of $a_\rho+\rho\dot\varphi^2$ reproduces the stored $\rho$ to $2.6\times10^{-6}$ sizes over the 1,524 nodes of the climb.

| Time ($P$) | $\rho$ | $\dot\rho$ | $v_\varphi$ | $v_z$ | height (sizes) | $a_\rho$ from member 0 | $a_\rho$ from member 1 | $a_\rho$ removed forward part | $\rho\dot\varphi^2$ | size of row from 0 | delayed range to 0 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $0.400$ | $0.1727$ | $-0.000$ | $0.848$ | $+0.115$ | $0.031$ | $-2.24$ | $-1.94$ | $0.00$ | $+4.16$ | $26.8$ | $0.191$ |
| $0.460$ | $0.1725$ | $-0.005$ | $0.876$ | $+0.482$ | $0.131$ | $-3.00$ | $-1.66$ | $+0.03$ | $+4.45$ | $30.8$ | $0.173$ |
| $0.500$ | $0.1708$ | $-0.086$ | $0.625$ | $+0.776$ | $0.299$ | $-5.16$ | $-1.35$ | $+1.74$ | $+2.29$ | $37.9$ | $0.146$ |
| $0.550$ | $0.1610$ | $-0.194$ | $0.657$ | $+0.729$ | $0.556$ | $-9.59$ | $-0.83$ | $+7.35$ | $+2.68$ | $48.3$ | $0.117$ |
| $0.600$ | $0.1495$ | $-0.147$ | $0.878$ | $+0.455$ | $0.750$ | $-11.03$ | $-0.79$ | $+8.05$ | $+5.16$ | $61.5$ | $0.100$ |
| $0.650$ | $0.1430$ | $-0.059$ | $0.964$ | $+0.258$ | $0.863$ | $-8.63$ | $-1.11$ | $+4.46$ | $+6.50$ | $80.8$ | $0.086$ |
| $0.700$ | $0.1414$ | $+0.003$ | $0.989$ | $+0.146$ | $0.927$ | $-4.37$ | $-1.54$ | $-0.34$ | $+6.92$ | $109.9$ | $0.074$ |
| $0.750$ | $0.1425$ | $+0.021$ | $0.997$ | $+0.073$ | $0.962$ | $-2.07$ | $-1.94$ | $-3.20$ | $+6.98$ | $156.6$ | $0.062$ |
| $0.780$ | $0.1428$ | $-0.012$ | $1.000$ | $+0.029$ | $0.972$ | $-9.07$ | $-2.13$ | $+2.41$ | $+7.00$ | $203.7$ | $0.054$ |

Member 2 is at the ceiling from $0.4598\,P$ on. Each row is the stored node nearest the stated time on the fine blind-reference trajectory; the subject integrator's trajectory gives the same table to three digits (`ccor-radius-subject-coarse.json`). The radial parts of both rows are negative throughout: both positives sit at radius $0.1567$, inside member 2's orbit, so attraction toward either has an inward component, and the row from member 0 grows eightfold as its delayed range falls from $0.19$ to $0.05$. The row from member 1 weakens as member 2 climbs away from it. After $0.78\,P$ member 0 reaches the ceiling and the pair associates in the spiral, in which $\rho$ keeps falling toward the meeting point's radius $0.1018$; that later fall is the spiral and not the subject of this record.

## 4. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The decomposition identity and the attribution of the fall to the loss of centripetal support against a growing inward row | Derived identity; the sizes of the terms measured on two stored trajectories of separately written integrators of one model family | A trajectory of the same specification from an integrator outside that family on which the centripetal term does not fall below the inward rows between $0.46$ and $0.55\,P$, or on which the double-integral accounting does not close; `ccor-radius-*.json` |
| The settled radius is where the larger inward pull of the nearer member 0 balances $v_\varphi^2/\rho$ at $v_\varphi\approx1$ | Derived from the identity at the measured values | A node after $0.70\,P$ with $\dot\rho\approx0$ at which $a_\rho+\rho\dot\varphi^2$ differs from zero by more than the terms' sizes |

## 5. Validation, files and review status

Commands, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, under the shared venv `../.venv/bin/python` relative to the repository root:

```
python ccor_radius.py
python ccor_radius.py <study dir>/ccth-C1-subject-coarse-traj.npz subject-coarse
```

Files: `ccor_radius.py`, `ccor-radius-fine.json`, `ccor-radius-subject-coarse.json` and logs. The frozen trajectories and `ccth_diag.py` were read and not edited. Review status: self-review only.
