# Completed-history geometry for finite propagation

**Grade: derived caller construction and proposed implementation; no target use.** This extends the [accepted propagation interface](authorized-cases-ten-hour-e-propagation-interface.md) to generated source windows of the same retained four-member E+M case. It changes no physical history, source, response or root census. The [geometry helper](../evidence/authorized-cases-ten-hour-e-propagation-geometry.py), SHA-256 `bd12fbb0a60d7b6ca2d264f46570be9b8ce7cd7912c0e8f8bc194e5f05155c5c`, binds the admitted propagation helper and the E owner's seam-aware residual version three. Its [known receipt](../evidence/authorized-cases-ten-hour-e-propagation-geometry-known.json) records a 06:14:16 UTC pass under the shared venv for local completed-history maxima, supplied-history zero error, coverage-gap rejection and an exact C2 cubic source seam with a jerk jump. These controls do not evaluate the retained target.

Fix Euclidean position and velocity error caps $x_*,v_*$ and $b=0.6$. Every completed receiving cell must already have strict position and velocity bounds below those caps. The E owner must certify the complete trial prefix and supplied history have speed below $b$. For a receiving cell with half-width $h$ and nominal midpoint source root $S_m$, define

$$
W_c=S_m+[-4h-x_*/(1-b),\,4h+x_*/(1-b)],
$$

$$
W_s=S_m+[-4h-2x_*/(1-b),\,4h+2x_*/(1-b)].
$$

The first window contains the auxiliary trial-source clocks at every point of the actual-to-trial current receiver segment. The second additionally contains the actual-source clock and the full source interval between that clock and the auxiliary clock: changing the current receiver costs at most $x_*/(1-b)$, and changing the completed source costs at most another $x_*/(1-b)$. Both windows must lie strictly before the exact receiving left face. This fixed-cap construction avoids choosing a source-error window from an error bound that has not yet been evaluated on that window.

Completed errors are zero on supplied times $s\le0$. On positive times, take the componentwise maxima of the recorded position, velocity and acceleration error bounds over only those completed receiving cells intersecting $W_s$. The records must cover $[0,T_{\rm left}]$ without gaps using exact retained receiving faces; an outward decimal export is not silently treated as an exact shared face. Each record bounds its whole cell, including its endpoints. A window crossing zero therefore combines exact-past zero with the relevant generated records.

Evaluate the trial source position, velocity, acceleration and jerk separately on every clipped analytic or polynomial piece intersecting each window, then take interval hulls. Source acceleration and jerk bounds used here include the actual analytic patch; the E residual receipt's future-polynomial-only summary is insufficient for that purpose. A C2 seam admits the union of the two one-sided jerk bounds without assuming a single fourth-order expansion across it.

The current Jacobian uses the trial jets on $W_c$. The independent source-partial domain uses the trial jets on $W_s$, expanding the source position, velocity and acceleration boxes by the respective completed errors. The receiver boxes stay fixed. The resulting range and ray boxes contain both actual and auxiliary tuple endpoints and hence their full independent-input segment. The source-partial call uses only $F_R,F_n,F_v,F_a$; its unused current Jacobian is not evidence that an actual source jerk exists. Trial acceleration and jerk on $W_s$ supply the root-transport coefficients $A_0,J_0$.

Sum $P_x e_x+P_v e_v+P_a e_a$ over the three directed source contributions and add the current member's whole-cell residual. Feed this forcing into the accepted signed-block recurrence at a fixed positive weight. Preserve the per-cell residual; a local patch-seam residual is not replaced by its maximum over the entire preceding prefix. Record new uniform acceleration errors together with position and velocity errors for subsequent source windows.

The implementation checks positive range, denominator and pair separation, current actual speed below $0.6$, completed-source windows, and prior caps. A target caller must additionally check its propagated output lies strictly inside its proposed current caps, verify complete source/root coverage and supply the exact residual-row/receiving-segment correspondence. The fixed weight avoids any omitted norm-change factor. No full-prefix propagation controller or target launch is admitted by this note. The falsifiers are a missing source piece, a source window reaching the current block, a coverage gap, or an actual tuple outside the independently expanded partial domain.
