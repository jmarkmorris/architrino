# Growing directions of the rigid balance of release C1 (ceiling-contact open research, problem 9)

**The equation in this record is the field-speed ceiling variant, not the Master Equation.** It is an authorized research variation with the canonical equation retained as baseline. Before any member reaches wake speed the variant and the unchanged Master Equation coincide on these histories, because a member below wake speed on a curved path has no own-path causal root and the response at the ceiling is never invoked; the linearization below is therefore the linearization of the unchanged equation about its exact rigid balance, and it is what governs the first stage of the release under either equation. Nothing here adopts the variant, and nothing here selects a contact rule, event map or continuation.

This record closes obligation 9 of the [contact study](ceiling-contact-two-hour-2026-10-06.md#10-validation-files-remaining-obligations-and-review-status) under the [launch brief](ceiling-contact-open-research-launch-brief.md). Values use $K=c_f=c_a=1$; $w=4.900208$ is the balance's angular rate and $P=2\pi/w=1.282228$ its period; lengths are in the same units unless marked as sizes ($0.196735$).

## 1. Result

**The balance gives way along a single real growing direction that is, to four decimal places, a pure axial displacement of member 2 (derived).** The linearization of the delayed equation about the exact rigid balance has six characteristic roots in the right half plane, and the largest is real, $\mu_1=3.802479$ in units of $w$. Its null vector, expressed in each member's co-rotating frame, is $(0,0,1)$ on member 2 to within $3\times10^{-4}$ on every other component, and it is odd under the balance's mirror symmetry. The record's inference of 2026-10-06, that "member 2's mid-plane position is where the balance gives way", is therefore replaced by a derived statement, and its conjectured mechanism, that a displacement of the negative toward one positive shortens that delayed range and lengthens the other so the nearer row grows, is the content of the mode.

**The stored kicked trajectory confirms the rate and the shape (measured).** The height of member 2 grows by the factor $3.296$ per twentieth of a period between $0.30$ and $0.40\,P$ against the predicted $e^{\mu_1 w\,0.05P}=3.302$, and the ratio of every other displacement component to member 2's height falls from $0.82$ at $0.15\,P$ to $0.0092$ at $0.40\,P$, by the factor $2.5$ to $2.9$ per twentieth of a period, which is the ratio $3.30/1.21=2.73$ of the fastest growth factor to the next. The record's measured $3.21$ to $3.29$ was fitted over $0.20$ to $0.40\,P$, where the slower modes seeded by the kick still contribute; the same window here gives $3.274$.

**The stored count is confirmed and its largest rate sharpened.** The balance search's own instrument, written separately, recorded six growing roots and a largest real part of $3.788$ located by bisection to $2\%$; the exact value is $3.802$, inside that resolution. The two determinants vanish at the same six points (Section 4, control K4).

| Root $\mu$ (units of $w$) | Growth per twentieth of a period | Parity under the mirror | Share of member 2's axial displacement in the null vector | Character |
| --- | --- | --- | --- | --- |
| $3.802479$ | $3.302$ | odd | $0.99999982$ | member 2 leaves the mid-plane |
| $0.598698\pm0.806501\,i$ | $1.207$ | even | $0$ | all three members, mostly in-plane, oscillatory |
| $0.402706\pm0.939630\,i$ | $1.135$ | odd | $0.015$ | positives in-plane and axial, oscillatory |
| $0.251052$ | $1.082$ | odd | $0.088$ | all three members displaced axially the same way, with small azimuthal parts |

The mirror is the reflection $z\mapsto-z$ composed with the exchange of members 0 and 1; it maps the balance to itself. Odd modes move member 2 out of the mid-plane; even modes keep it there.

## 2. The balance

C1 is the first entry of `blind-ceiling.json` in `.local-data/master-equation-closure/geometry-session-20261006/ceiling/`, identical digit for digit to balance 0 of `results2/0063.json` of that session. Members 0 and 1, of positive polarity, sit at radius $0.156728$ and heights $\pm0.196735$ at the same azimuth; member 2, negative, sits in the mid-plane at radius $0.172669$ and trails them by $55.4165^\circ$. The rows at $T=0$ read from the exact rigid past sum, on each member, to its centripetal acceleration to $2\times10^{-15}$ (control, Section 4). The balance is an exact rigid solution of the unchanged equation with speeds $(0.7680,0.7680,0.8461)$.

## 3. Linearization of the delayed equation about a rigid rotation

**The first variation of one row.** For receiver $i$ at reception time $T$ and source $j$ at the ordinary emission instant $S=T-\tau$, with $\mathbf r=\mathbf X_i(T)-\mathbf X_j(S)$, $\tau=\lVert\mathbf r\rVert$, $\mathbf n=\mathbf r/\tau$ and $D=1-\mathbf n\cdot\mathbf V_j(S)>0$, the row is $\mathbf A=\sigma\,\mathbf n/(\tau^2D)$. Let the receiver's position be displaced by $\boldsymbol\xi_i$ and the source's path by a function $\boldsymbol\xi_j(s)$, so that its velocity is displaced by $\boldsymbol\xi_j'(s)$. The emission instant moves because the causal equation moves: differentiating $\tau=\lVert\mathbf r\rVert$ with $\delta\mathbf r=\boldsymbol\xi_i-\boldsymbol\xi_j(S)+\mathbf V_j(S)\,\delta\tau$ (the last term because the unperturbed emission point slides along the path when $S$ changes by $-\delta\tau$) gives

$$
\delta\tau=\frac{\mathbf n\cdot(\boldsymbol\xi_i-\boldsymbol\xi_j(S))}{D},\qquad
\delta\mathbf n=\frac{\delta\mathbf r-\mathbf n\,\delta\tau}{\tau},\qquad
\delta D=-\delta\mathbf n\cdot\mathbf V_j+(\mathbf n\cdot\mathbf A_j(S))\,\delta\tau-\mathbf n\cdot\boldsymbol\xi_j'(S)
$$

where $\mathbf A_j(S)$ is the source's unperturbed acceleration at emission, and then

$$
\delta\mathbf A=\sigma\left[\frac{\delta\mathbf n}{\tau^2D}-\frac{2\mathbf n\,\delta\tau}{\tau^3D}-\frac{\mathbf n\,\delta D}{\tau^2D^2}\right]
$$

This is linear in $(\boldsymbol\xi_i,\boldsymbol\xi_j(S),\boldsymbol\xi_j'(S))$ and defines three $3\times3$ matrices per row. It was checked against a central finite difference of the exact row on a perturbed history (Section 4, K1).

**The ansatz.** For a rigid rotation at rate $w$ about the $z$ axis, write the perturbation of member $j$ as $\boldsymbol\xi_j(t)=e^{\lambda t}\,\mathrm{Rot}(wt)\,\boldsymbol\eta_j$, so that $\boldsymbol\eta_j$ is a fixed vector in the frame that rotates with the balance. Then $\boldsymbol\xi_j'(t)=e^{\lambda t}\mathrm{Rot}(wt)(\lambda+wJ)\boldsymbol\eta_j$ with $J$ the generator of rotation about $z$, and the receiver's acceleration perturbation is $(\lambda+wJ)^2\boldsymbol\eta_i$. Evaluating every row at $T=0$, where the rotating frame coincides with the lab frame, and using $\boldsymbol\xi_j(S)=e^{-\lambda\tau}\mathrm{Rot}(-w\tau)\boldsymbol\eta_j$, the linearized equation of motion becomes $M(\lambda)\boldsymbol\eta=0$ with

$$
M(\lambda)=\operatorname{diag}\bigl((\lambda+wJ)^2\bigr)-\sum_{\text{rows}}\Bigl[P_{ij}\ \text{on block }(i,i)\;+\;e^{-\lambda\tau_{ij}}\bigl(Q_{ij}+W_{ij}(\lambda+wJ)\bigr)\mathrm{Rot}(-w\tau_{ij})\ \text{on block }(i,j)\Bigr]
$$

where $P_{ij}$, $Q_{ij}$ and $W_{ij}$ are the matrices of the first variation with respect to $\boldsymbol\xi_i$, $\boldsymbol\xi_j(S)$ and $\boldsymbol\xi_j'(S)$. A perturbation grows when $\operatorname{Re}\lambda>0$; $\mu=\lambda/w$ is reported. Four symmetries of the balance must be null vectors and are (K2, K3): rotation of the whole configuration and axial translation at $\lambda=0$, and translation in the plane at $\lambda=\pm iw$ with $\boldsymbol\eta_j=(1,\pm i,0)$ on every member.

The balance search's module `rigid.py` (geometry-session-20261004) builds the same object from a differently organized formula; it was read only after the formula above was written and coded, and only its determinant was used, as a comparison.

## 4. Instruments, controls and measurements

**`ccor_balance_modes.py`** (new, in `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`) computes the rows, the three variation matrices per row, $M(\lambda)$, its determinant, root counts by the argument principle on rectangles, roots by Newton iteration seeded on a grid, and null vectors by singular value decomposition. Controls, asserted before the root search, all pass (receipt `ccor-balance-modes.json`):

| Control | Result |
| --- | --- |
| K1 linear map of a row against a central finite difference of the exact row on a quadratic-in-time perturbation of the source path, three rows | relative differences $3\times10^{-9}$, $9\times10^{-8}$, $1\times10^{-8}$ (the difference scales as the square of the finite-difference step: $8.4\times10^{-5}$, $8.4\times10^{-7}$ at steps $10^{-3}$, $10^{-4}$) |
| K1 unperturbed row from the exact-row evaluator equals the rigid row | $\le5\times10^{-11}$ (its emission velocity is a finite difference of step $10^{-6}$) |
| balance: summed rows minus centripetal acceleration, each member | $\le2\times10^{-15}$ |
| K2 rotation and axial translation null at $\lambda=0$ | $\lVert M\boldsymbol\eta\rVert/(\lVert M\rVert\lVert\boldsymbol\eta\rVert)\le4\times10^{-17}$ |
| K3 in-plane translation null at $\lambda=\pm iw$ | $4\times10^{-17}$ |
| negative control: a random vector at $\lambda=0$ | $0.19$ |
| K4 the balance search's determinant vanishes at each of the six roots found here | ratio to its value $0.3$ away at most $6\times10^{-16}$ |

Root count by the argument principle, adaptive contour, largest phase step $0.30$: $6.000$ zeros with $\operatorname{Re}\mu>0.004$ in $|\operatorname{Im}\mu|\le30$ and again $6.000$ in $|\operatorname{Im}\mu|\le100$. Smallest singular value of $M$ at each root relative to the largest: below $10^{-16}$.

**`ccor_balance_measured.py`** reads the study's stored fine blind-reference trajectory (`ccth-C1-fine-c1e-05-traj.npz`, frozen) and expresses each member's displacement from the unkicked rigid motion in its co-rotating frame. Control: at the first node the position displacement is zero and the velocity displacement equals the stored kick to $5\times10^{-17}$. Measurements (receipt `ccor-balance-measured-fine.json`):

| Fit window ($P$) | Growth of member 2's height per twentieth of a period | Height at the end of the window (sizes) |
| --- | --- | --- |
| $0.10$ to $0.20$ | $3.271$ | $2.7\times10^{-4}$ |
| $0.15$ to $0.25$ | $3.196$ | $8.8\times10^{-4}$ |
| $0.20$ to $0.30$ | $3.243$ | $2.9\times10^{-3}$ |
| $0.25$ to $0.35$ | $3.281$ | $9.4\times10^{-3}$ |
| $0.30$ to $0.40$ | $3.296$ | $3.1\times10^{-2}$ |
| $0.20$ to $0.40$ (the record's window) | $3.274$ | $3.1\times10^{-2}$ |
| predicted, $e^{\mu_1w\cdot0.05P}$ | $3.302$ | |

The largest displacement component other than member 2's height, divided by that height, is $0.82$, $0.32$, $0.133$, $0.053$, $0.019$, $0.0092$ at $0.15$, $0.20$, $0.25$, $0.30$, $0.35$, $0.40\,P$. Member 2 moves upward, toward member 0; the sign is the kick's.

**Interpretation of the small discrepancy.** The kick of size $10^{-4}$ excites every mode. The fastest mode outgrows the next by the factor $2.73$ per twentieth of a period, so the measured growth of the height approaches $3.302$ from below as the slower modes become negligible, which is what the windows show; by $0.40\,P$ the height is $0.03$ sizes and the first nonlinear corrections are expected. The agreement of the rate to $0.2\%$ in the last linear window and of the shape to $1\%$ is the measured confirmation of the derived mode.

## 5. Claim grades and falsifiers

| Claim | Grade | Falsifier, and where to look |
| --- | --- | --- |
| The first variation of a row and the characteristic matrix $M(\lambda)$ | Derived; checked by finite differences and by the four symmetry null vectors | A perturbed history on which the exact row's finite difference departs from the linear map by more than the finite-difference truncation; `ccor_balance_modes.py` control K1 |
| Exactly six roots with $\operatorname{Re}\mu>0.004$ and $|\operatorname{Im}\mu|\le100$, at the values tabulated | Derived characteristic function; roots counted and located numerically in double precision | A root of $\det M$ in that region not in the table, or a phase step above $0.30$ on a refined contour; `ccor-balance-modes.json` |
| The fastest root is real and its null vector is member 2's axial displacement to $3\times10^{-4}$ | Derived | A null vector of $M(3.802479\,w)$ with a larger component elsewhere |
| The stored trajectory grows at that rate and with that shape | Measured on one stored trajectory of one integrator of the same model family | A fit over $0.30$ to $0.40\,P$ on a trajectory of a separately written integrator giving a factor outside $3.25$ to $3.35$, or a shape ratio that does not fall |
| Which positive member 2 approaches is set by the sign of the kick's projection on this mode | Derived from the mode's parity and the mirror symmetry; the reflected run was not made | A run with the reflected kick in which member 2 still rises |

## 6. Validation, files and review status

Commands, from `.local-data/master-equation-closure/ceiling-contact-open-research-20261011/`, all under the shared venv `../.venv/bin/python` relative to the repository root (`AAA_VENV` unset):

```
python ccor_balance_modes.py
python ccor_balance_measured.py
```

**Environment deviation, recorded.** On this machine on 2026-10-11 (macOS 27.0.1) the shared venv's compiled `scipy` subpackages cannot be loaded (the dynamic loader rejects `scipy/sparse/linalg/_propack/_spropack.cpython-313-darwin.so`), so `from scipy.optimize import brentq` fails although `numpy` and `mpmath` load. The balance search's `rigid.py`, used here only for control K4, imports that function. The module `ccor_scipy_stub.py` tries the real import and, only when it fails, installs a stand-in `brentq` written in this thread and validated on two known roots to $10^{-14}$ before use; `rigid.py` itself was not edited. Everything else in this record is numpy-only. The study's frozen subject integrator `release_cap.py` has the same import and was not used. **Update, 2026-10-20:** the operator installed scipy 1.16.3 into the shared venv, which repaired the import. `ccor_balance_modes.py` was rerun with the real `scipy.optimize`, the stand-in reporting itself inactive. All controls passed, including K4, and every root agreed exactly with the earlier run; the earlier receipt is kept as `ccor-balance-modes-stub.json`. On 2026-10-21 the frozen subject integrator `release_cap.py`, imported unchanged under scipy 1.16.3, repeated its circular-pair controls at the study's two settings and replayed release C1 to just past member 2's arrival at the ceiling. The position deviation, smallest transmitter factor and removed forward part agree with the study's receipts of 2026-10-06 in every printed digit, and member 2's arrival time agrees to all twelve digits printed ($0.459820284890\,P$ coarse, $0.459833969464\,P$ fine); receipts `ccor-subject-recheck-*.json`.

Files written: the two scripts, `ccor_scipy_stub.py`, receipts `ccor-balance-modes.json`, `ccor-balance-measured-fine.json` and logs, all in the new local directory. Nothing in the frozen directories was edited; their hashes were not needed because no frozen file was executed.

Review status: self-review only. No reader of another model family and no human has reviewed it.
