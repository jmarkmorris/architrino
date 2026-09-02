# PHO-003 Moving-Apparatus Delta-X Mapping

## Status And Claim Boundary

This packet closes the Photon app's $\Delta x$ diagnostic contract. `absolute_history` is the sole authoritative app diagnostic for how pair separation enters the moving-apparatus causal-root calculation; `co_moving` remains an explicitly labeled comparison. The runtime result is `measured` at `display-only-visualization` grade. It does not establish a retained photon branch, a physical photon separation, photon stability, or a Noether sea constitutive law.

The implementation lives in [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js), with visible summaries in [PhotonDiagnosticsRuntime.js](../../../src/apps/photon/PhotonDiagnosticsRuntime.js) and focused checks in [photon-runtime.test.js](../../../tests/photon-runtime.test.js).

Plainly: the app now has one answer to “which calculation counts for separation?” The moving-history calculation counts; the stationary-frame picture is retained only to show the difference.

## Authoritative Geometry

Let the declared pair separation be $\Delta x\ge0$. The two braid-center offsets in the moving photon chart are

$$
\chi_{\mathrm{trailing}}=-\frac{\Delta x}{2},
\qquad
\chi_{\mathrm{leading}}=+\frac{\Delta x}{2}.
$$

In absolute-history mode, transmitter centers and the Virtual Observer translate along $+\hat{\mathbf x}$ at $c_\gamma$. For source $i$ and reception time $t$, the root equation remains

$$
\left\|\mathbf X_{\mathrm{VO}}(t)-\mathbf r_i(\tau)\right\|
=
c_{\mathrm{sig}}(t-\tau),
\qquad
\tau<t.
$$

The `photon-moving-apparatus-delta-x.v1` record declares the absolute separation, reference radius, dimensionless separation ratio, both center offsets, exact history mode, and exact transmitter path. Its `authority` is `authoritative_delta_x_diagnostic` only in `absolute_history`; the same record says `comparison_only` in `co_moving`.

Plainly: changing $\Delta x$ moves the two source histories before the causal roots are solved. The result is not obtained by solving a stationary picture and adding a motion correction afterward.

## Root-Age Threshold Contract

For a retained root with delay $u=t-\tau$, define its age in reference cycles by

$$
N_{\mathrm{age}}=u f_{\mathrm{ref}},
$$

where $f_{\mathrm{ref}}$ is the app's declared cycle-reference frequency. The diagnostic bands are:

| Status | Exact interval |
| --- | --- |
| `fresh` | $0\le N_{\mathrm{age}}\le1$ |
| `aging` | $1<N_{\mathrm{age}}\le2$ |
| `stale` | $N_{\mathrm{age}}>2$ |

One and two reference cycles are display-review thresholds, not physical decay times. One cycle separates the immediately preceding repetition of the selected channel; two cycles match the default bounded absolute-history review horizon. The record emits all three counts and the oldest retained-root age, so a threshold change would be visible and testable.

Plainly: “stale” now has a number behind it. A root more than two selected cycles old is marked stale, but the label says only that the app is relying on older prescribed history.

`stale_history_window` remains a separate no-root classification from prescribed-path analysis. It means the entire scanned history window lies on the already-passed side of the arrival equation. It is not the same as a retained root classified `stale`. Likewise, `no_catch_up_root` means the source influence did not catch the moving Virtual Observer inside the declared scan window; it does not prove that no root exists outside that bounded window.

Plainly: an old root, a scan window that is too old, and a root that was not reached before the scan ended are three different conditions. The UI no longer asks one vague “stale” count to cover all three.

## Acceptance And Falsifiers

| Claim | Acceptance condition | Falsifier |
| --- | --- | --- |
| Absolute history owns $\Delta x$ | absolute-history result says `authoritative_delta_x_diagnostic`; co-moving result says `comparison_only` | either label is reversed, absent, or computed from the other mode's roots |
| Separation is geometrically explicit | record emits $\Delta x$, $r_{\mathrm{ref}}$, $\Delta x/r_{\mathrm{ref}}$, and offsets $(-\Delta x/2,+\Delta x/2)$ | emitted offsets or ratio disagree with the normalized app state |
| Root ages use one contract | every retained contribution carries $N_{\mathrm{age}}$, thresholds 1 and 2, and one of the three exact bands | a boundary value is misclassified, counts disagree with contribution rows, or thresholds vary by mode |
| Bounded no-root claims remain bounded | no-catch-up and stale-window counts remain separate from retained-root age | a bounded scan miss is reported as proof that no causal root exists globally |
| Evidence grade remains honest | record says `display-only-visualization` | the diagnostic is cited as retention, stability, physical separation, or constitutive-law evidence |

Focused validation on 2026-09-02 passed 60 of 60 Photon tests. The threshold fixture uses $f_{\mathrm{ref}}=2$ and delays $0.4$, $0.75$, and $1.25$, producing ages $0.8$, $1.5$, and $2.5$ reference cycles and therefore one fresh, one aging, and one stale row. Existing tests also verify that co-moving and absolute-history paths remain distinct and that $\Delta x$ changes the side-view separation without changing face-on spacing.

Plainly: PHO-003 is complete because the authoritative path, separation geometry, age bands, and bounded-claim limits are all explicit and covered by tests.
