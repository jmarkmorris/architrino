# Six-pole correlated continuation review: adjudication 7 (the continuation's C14 record; the v4.4 E4 change)

Written 2026-10-14T12:27:43Z by the review role. Read: the C14 record [steps10-cm-v43-C14-controls.json](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v43-C14-controls.json) sha256 bc8963e5c3a56453f2a7e47e48f852170f6674a1d1dd0fde31c792852f221c88 (.out bf79321b…, .out.time 369572bc…); the continuation's receipt lines for C14 (PID 50002, 12:25:38 to 12:26:07 UTC, exit 2, script d844b52a797e15c3e020c4a622f43d4c2936c12c355ec55c07a717627ecdab3c); and a diff of that script against v4.4 [steps10-cm.py](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm.py) sha256 1bcc8a279934bc77b83e164ee4e7e8499d5fb44c173395b8178802fbd31e0540. No code was run.

1. **The script that ran as C14 (measured by diff).** C14 ran the v4.3 final, d844b52a…, retained as -v4.3.py. It differs from the v4.3a draft I adjudicated (51a2c8a6…, adjudication 6) only in E17's near-boundary point: half-width $10^{-25}$ in place of $10^{-35}$, plus its comment and label. That change removes the construction defect of adjudication 6, section 4, before any run. My inference there was therefore neither tested nor falsified, because the $10^{-35}$ version never ran. Adjudication 6's rulings on the routine apply unchanged to d844b52a…

2. **C14 ruling: NOT admitting (measured).** The record reports 59 of 60 controls passing and exit 2. E16 passes, as do all eight E17 cases, the near-boundary one included. E4 fails. Under adjudication 5's rule (full pass), C14 admits nothing.

3. **Why E4 failed: the corners cannot have been certified outside (derived).** In E4, $A(q) = -q^2$, the centre acceleration is $m_A = \mathrm{mid}(-\hat q^2)$, and $j = \mathrm{mid}(-2\,Q_d) = -2\hat q$, since $Q_d$ is the hull, symmetric about $\hat q$ with radius $d_q$.
   - The exact error is $e = A(q) - m_A - j(q - \hat q) = -(q - \hat q)^2$, up to the rounding of $m_A$. So $|e| \le d_q^2$.
   - The stored radius is $r_E \ge r_A + r_j\,d_q \ge 2\,d_q^2$.
   - The exact image of the latent point $x$ therefore has the latent representation: anchors $(x_1, x_2)$; $u_E = e/r_E \in [-\tfrac12, 0]$; and the rounding symbols $u_{R} = (\sum \delta\,x)/r_R \in [-1,1]$, because the stored $R_q$ and $R_w$ radii bound the column rounding $\delta$ (adjudication 5, section 1).
   - So every exact image, the corner images included, lies IN the stored zonotope.
   - A sound test (adjudication 6) cannot certify such a point outside. The only failure open to it is UNDECIDED, which agrees with the PI's report.
   - For a latent corner, the anchor symbols sit at $\pm 1$. In the zonotope without the rounding columns, the image then lies on the facet parallel to the $E$ column. With them, it lies inside by a margin of order the rounding radii, about $10^{-30}$ of the scale, which directed 30-digit intervals cannot resolve.
   - The record carries no per-point detail, so this cause is derived, not read from the record.
   - **Falsifier.** A rerun showing a corner certified OUTSIDE. That would mean an inclusion failure, or a fault in the routine.

4. **v4.4 (diff verified).** The diff of d844b52a… against 1bcc8a27… shows exactly three changes:
   - a new comment line 13;
   - E4's latent points: $x_1 \in \{-0.9, -0.5, 0, 0.5, 0.9\}$ and $x_2 \in \{-0.9, 0, 0.9\}$, as mp decimal strings, in place of $\{-1, -0.5, 0, 0.5, 1\}$ and $\{-1, 0, 1\}$;
   - E4's label.

   Nothing else changed: no routine, no other control, no chart and no mode code. Interior latent points keep a margin of at least $0.1$ times the smaller anchor projection on every facet normal. The $E$ symbol stays within $[-\tfrac12, 0]$ (the continuation's stated $\varepsilon \le 0.41$ is consistent with this). So their exact images are certifiable inside, and E4 still tests the correlated polynomial image on shared symbols. The weakening is only the exclusion of points that a sound test may rightly leave undecided. ADMITTED.

5. **Admission rule for C15.** The C15 record admits the matched comparison if all of the following hold:
   - (a) its script sha256 is 1bcc8a27…;
   - (b) every control passes, 60 of 60;
   - (c) E16's four results and E17's eight results are as expected;
   - (d) E2, E3, E4 and N-R are witnessed by the certified test;
   - (e) its receipt shows a granted single invocation with exit 0.

   Recommended, not required for this record: a later version should report the E4 corner statuses and require NOT OUTSIDE for them, which turns section 3's derivation into a measured check.
