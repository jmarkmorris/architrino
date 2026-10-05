# Independently recomputed T02 departure observables

Date: 2026-10-03; completed 2026-10-04 UTC. Scenario: unchanged Master Equation, $K=c_f=1$. **Verdict: derived kinematics with independently computed outward bounds, conditional on the separately accepted exact ancient history through $|q|\le0.006$.** No later event or destination is claimed.

## Premises and independent reference

The [centered-domain adjudication](ring-departure-followup-centered-independent-adjudication-2026-10-03.md), SHA-256 `fd247c7f05deb78c75499680638938e04643983e27f7540c09ca065a94da8174`, independently accepts the same T02 fast ancient branch, its complete eight-hit past and conservative exact-polynomial tail caps $7\times10^{-7}$, first Euler $0.00025/21$, second Euler $0.00025$. The branch satisfies $q'=\lambda q$, with the inherited exact fast root. The [degree-twenty coefficient adjudication](ring-departure-followup-coefficient20-independent-adjudication-2026-10-03.md) supplies the exact coefficient enclosures. This calculation uses these admitted caps rather than the subject's tighter provisional endpoint displays.

The separately authored [observable instrument](../../../../../scripts/braid-program/ring_departure_followup_observables_independent_20261003.py), SHA-256 `cf4eb228a3ca13c2a762a86f64fdf856c94de07b79e101bea4aca6f475a7f6c4`, imports no primary observable implementation. For rotating coordinates $x=R+p_x$, $y=p_y$, it uses

$$
r=\sqrt{x^2+y^2},\qquad
V=(\lambda\mathcal Ep_x-\Omega y,\lambda\mathcal Ep_y+\Omega x),\qquad
\dot r=\frac{\lambda(x\mathcal Ep_x+y\mathcal Ep_y)}{r}.
$$

The rotational terms cancel in radial velocity. These identities follow by differentiating the complete rotating history, without an angular-momentum conservation premise or mass factor. A known path $X(T)=S(2T)(2+q(T),0)$, $q'=3q$, at $q=0.01$ returns radius 2.01, radial velocity 0.03 and speed $\sqrt{0.03^2+4.02^2}$; a separate polynomial Horner control returns 17. These analytical controls passed before the target. Known receipt `.local-data/ring-followup/departure/observables-independent/known.json` has SHA-256 `45f5daf6e2b92a813c90107f2de84939d163483d3da2d2366fd401f578d2545c`.

## Accepted endpoint and whole-window bounds

The deliberately widened outward endpoint bounds are:

| Quantity | $q=-0.006$ | $q=0.006$ |
| --- | --- | --- |
| Radius | $[0.9693301,0.9693316]$ | $[0.9813170,0.9813185]$ |
| Speed | $[1.7916944,1.7919619]$ | $[1.8477123,1.8479756]$ |
| Radial velocity | $[-0.0820952,-0.0818406]$ | $[0.0521612,0.0524155]$ |

At the endpoints the negative branch is smaller and slower than exact T02, and the positive branch is larger and faster. The stronger whole-window directional statement is

$$
7.0116<\dot r/q<13.8848,\qquad 0<|q|\le0.006.
$$

To prove it, the instrument evaluates the exact polynomial quotient $\mathcal EP_{20}(q)/q$ by Horner evaluation on the entire closed amplitude interval, including its removable limit at zero. For a tail starting at degree 21, the quotient's coefficient norm is bounded by its admitted first-Euler norm divided by 0.006. Interval evaluation then bounds the radial-velocity identity. Thus radial motion is strictly inward on the negative branch and outward on the positive branch, with no radial turn or return inside this window. This does not prove speed monotonicity at every intervening time or rule out later turns.

The normalized elapsed time from $|q|=10^{-13}$ to $|q|=0.006$ is enclosed in $[2.3284502468566848,2.3284502468566850]$ by $\log(0.006/10^{-13})/\lambda$. Multiply time by $K/c_f^3$, radius by $K/c_f^2$, speeds by $c_f$ and angular rates by $c_f^3/K$ to restore dimensions. No physical value of $K$ is supplied.

The target receipt `.local-data/ring-followup/departure/observables-independent/target.json` has SHA-256 `b307f2f36968c5e7ff022815c41852fbf980b1dc4af898a5f56b5e377ed71adf`. It binds the accepted review, coverage receipt `9802617167afa04e75c6f42b60c34d0657b1aa552f66471b7391d1d71d8ac243`, exact coefficient receipt `1b637b65fc1a4bcf9e442390a5f8fb8f8a413ee25be7ea97b4af06dbe8a7ec18` and frozen characteristic reference. Owned run `9e3e8661-a77c-441a-89b6-e7715e4905f7` completed in 0.071 supervised seconds, exit zero, zero stderr, process group closed by the supervisor receipt.

## Limit and falsifier

The [primary bounded outcome](ring-departure-followup-2026-10-03.md#3-quantified-sufficient-bound-obstruction) records insufficient sufficient estimates at 0.007 and 0.008. Those are proof limitations, not physical stops. The accepted endpoint remains ordinary, without a fold, wake-speed event or collision. Neighboring-rung transfer, dispersal and final fate remain open.

Failed domain or coefficient premises, a missing rotation/Euler term, incorrect tail quotient scaling or a separately enclosed history violating these bounds would overturn the affected observable. Check the frozen target's exact binary endpoints and the cited independent domain before using a rounded table. The primary's tighter endpoint bounds are not independently promoted by this recomputation.
