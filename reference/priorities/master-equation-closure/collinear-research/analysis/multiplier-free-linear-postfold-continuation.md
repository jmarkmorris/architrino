# Multiplier-free linear postfold continuation

## Equation and measured event

The [selected linear delayed law](multiplier-free-linear-delayed-comparison.md#preparation-and-complete-law) retains every positive-delay partner and self root, absolute transmitter weights, opposite partner polarity and same-law self reception. Its held preparation is $x(T)=0.5$, $v(T)=0$ for $T\le0$, with $c_f=1$ and $k=0.2862286103053385$. The earlier resolved histories and their [independent integral audit](multiplier-free-linear-birth-to-fold-integral-check.md) supply the numerical past through the first partner fold. No cap, multiplier, acceleration floor, impulse, root deletion or prescribed reversal is introduced.

The new subject instrument [linear-postfold-continuation.py](../../../../../scripts/collinear-research/linear-postfold-continuation.py) numerically continues that past until the next upward crossing of $v=-1$. The event is approximately

$$
T_c=16.16657432,\qquad x_c=-9.02233775,\qquad v_c=-1.
$$

The trajectory remains at negative position and negative velocity throughout this continuation. The saved velocity samples first become more negative, reaching approximately -3.457252, and subsequently approach -1 from below. This is a new speed event at negative separation, not an outer turn. It creates a new local self-root question; the computation stops there without selecting a right trace.

## Source-clock chart and complete census

Write $P=T+x$ and $Q=T-x$. On the h4096 supplied past, $P$ has one maximum, approximately 13.27367732617, and $Q$ is strictly increasing. The numerical seed is $T_0=13.10969966500$, $x_0=-0.19397766117$, $v_0=-2.10402749615$, with $P_0=12.91572200383$ and $Q_0=13.30367732617$. The seed lies beyond the reception of the inherited partner fold.

While $x<0$ and $v<-1$, $P$ decreases and $Q$ increases. Every recent source on the continued segment has $P(S)>P(T)$ for $S<T$; thus it supplies no additional negative-distance self root. Its $Q(S)$ exceeds the receiver $P(T)$, so it supplies no additional negative-distance partner root. The receiver $Q(T)$ exceeds the maximum of the old $P$ and every recent $P$, excluding positive-distance partner roots. The entire $Q$ history is increasing, excluding positive-distance self roots apart from the inadmissible exact diagonal. Consequently both admissible roots remain in the supplied older past: one solution of $Q(S)=P(T)$ and one of $P(S)=P(T)$ on its ascending sector.

The implementation nevertheless enumerates every polynomial monotone sector of both supplied source clocks, including the descending $P$ sector, and the complete analytical held tail. Polynomial derivative roots define sector boundaries, and scalar bracketing locates each earlier hit. No instrument from the independent audit is imported or modified. The minimum measured source-time gap below the supplied seed over the evaluated stages is approximately 0.1310814. This guard establishes the reach of the frozen-source computation within its declared chart; it does not grant validity past the new speed event.

At the fine h4096 event, the complete incoming census is:

| Channel | Source time | Delay | Absolute source Jacobian | Acceleration contribution |
| --- | ---: | ---: | ---: | ---: |
| Negative-distance partner | 7.80633029037 | 8.36024402875 | 0.26406259897 | +9.06202180666 |
| Negative-distance self | 7.05733095680 | 9.10924336232 | 1.78690299541 | -1.45913128761 |

The finite incoming total is approximately $B=7.60289051905$. Both roots are regular, substantially earlier than the speed event. The approaching local zero-delay self branch is excluded exactly at the event, but cannot be excluded from a proposed outgoing crossing merely because its limiting delay is zero.

An alternative target was the exact held-tail chart. If $P$ had decreased below $-0.5$ while these guards held, the two source times would have been $S_p=P+0.5$ and $S_s=P-0.5$, both in the held preparation. Their acceleration contributions sum to $-k$, preserving inward superfield motion indefinitely within that exact chart. The observed new speed event occurs instead at $P_c\approx7.14423657$, well before either held-tail threshold. The exact held-tail continuation therefore gives no conclusion about this trajectory.

## Necessary outgoing finite traces

The numerical arrival at the new event does not select its continuation. To expose the issue, suppose an exact incoming solution has curvature $B>0$ at this minimum of $P$, and suppose it crosses upward with a finite positive right acceleration $b$. Let $\tau=T-T_c>0$ and let $q=T_c-S>0$ parametrize the newborn incoming-source self root. Then

$$
P(T_c-q)=P_c+\frac12Bq^2+o(q^2),\qquad
P(T_c+\tau)=P_c+\frac12b\tau^2+o(\tau^2),\qquad
\frac\tau q\longrightarrow\sqrt{\frac B b}.
$$

The new self hit has negative displacement and limiting acceleration contribution

$$
-k\frac{\tau+q}{Bq}\longrightarrow
-\frac{k}{B}-\frac{k}{\sqrt{Bb}}.
$$

If $A$ denotes the regular older-root acceleration at the event, every such trace necessarily satisfies

$$
b=A-\frac{k}{B}-\frac{k}{\sqrt{Bb}}.
$$

Here the incoming equation gives $A=B$. Substituting the measured fine h4096 value produces two positive algebraic candidates, approximately $b=7.52740754925$ and $b=0.00018828823320$. This necessary relation is derived from the full signed law. It is not a numerical choice between them or a proof that each candidate is realized by an admissible continuation.

For the corresponding local source-coordinate equations, let $p(q)=-(1+v(T_c-q))>0$ and $w=1+v(T_c+\tau)>0$. Their leading system is

$$
\frac{d\tau}{dq}=\frac p w,\qquad
\frac{d(w^2)}{dq}=2A p-2k(\tau+q).
$$

With $z=\tau/q$, $W=w/q$, the finite-trace equilibrium has $z=B/W$ and $W=\sqrt{Bb}$. Its leading Jacobian is

$$
\begin{pmatrix}-1&-B/W^2\\-k/W&-2\end{pmatrix},
\qquad \det=2-\frac{kB}{W^3}.
$$

The large-trace candidate has negative-real-part eigenvalues; the small-trace candidate is a saddle. The [independent existence proof](multiplier-free-linear-postfold-independent-check.md#existence-of-both-upward-crossing-branches-and-uniqueness-obstruction) constructs both local branches under explicit smooth-history and regular old-root hypotheses, and constructs a local family in the smaller-trace branch. It works in the class of continuous position and velocity, finite one-sided acceleration traces and the punctured/integral equation; it does not require a two-sided classical second derivative at the event. Thus the conditional uniqueness obstruction is stronger than the necessary algebra alone. Numerical incoming-history convergence cannot choose among these continuations or establish a later turn. No branch selector has been supplied by the selected law.

The independent numerical application retains distinct interpolated left curvature $B_L$ and older-root acceleration $H$. On the fine supplied history they are approximately 7.602902579 and 7.602890157, with threshold $H_{\rm crit}\approx0.455077107$ and positive margin about 7.147813049. Generalized trace estimates are approximately 7.527407276 and 0.000188288. The earlier equal-curvature estimates above explain the exact incoming-equation relation; they do not identify the interpolated curvature with $H$. The exact release, hypotheses and whole-history error still require continuous enclosure before promoting this measured application to an exact selected-release theorem.

## Numerical method, controls and refinement

The research subject integrates the regular frozen-source chart with DOP853, cubic Hermite supplied position/velocity history, bracketed roots and event localization. It saves the complete upstream history and new position/velocity samples at spacing at most 0.001, including the speed-event endpoint. Trial Runge–Kutta stages can lie beyond the event to locate its zero; the receipt distinguishes those trial velocities from the saved incoming solution. The two-root regular vector field used for localization is not asserted to be the outgoing complete law.

Before any target, a separately specified affine source $x(S)=0.5+0.2S$ checks root locations and absolute weights exactly: $P=0.5+1.2S$, $Q=-0.5+0.8S$. At receiver $T=3$, $x=-0.5$, it has exactly the specified positive-distance partner and negative-distance self roots; the maximum root/weight error is zero at recorded precision. A held-static source then checks both negative-time roots and the exact total $-k$. Integrating its constant-acceleration receiver against the closed polynomial solution gives maximum endpoint error $1.78\times10^{-15}$. These controls precede every target invocation.

| Supplied history | Receiver tolerance | Maximum step | Speed-event time | Position at event | Incoming acceleration |
| --- | ---: | ---: | ---: | ---: | ---: |
| h4096 | $10^{-10}$ | 0.02 | 16.16657432016 | -9.02233775378 | 7.60289051057 |
| h4096 | $10^{-12}$ | 0.01 | 16.16657431912 | -9.02233775323 | 7.60289051905 |
| h8192 | $10^{-12}$ | 0.01 | 16.16657431667 | -9.02233774043 | 7.60289015654 |

The source-resolution change moves event time by about $2.5\times10^{-9}$ and event position by about $1.3\times10^{-8}$ between the fine receiver runs. These measured refinements support the quoted six-decimal event geometry; they are not an observed formal convergence order or a continuous enclosure. The [separate independent polynomial census and integral audit](multiplier-free-linear-postfold-integral-check.md) confirms one partner and one self root on the incoming postfold segment and checks every acceleration channel. From fold+0.002 to crossing-0.0001, the complete velocity-increment minus acceleration-integral residuals improve under receiver refinement to about $-9.65\times10^{-10}$ and $-9.83\times10^{-10}$ for the two source-history resolutions. The fold overlap and positive event cutoff are explicit; this audit supplies neither a uniform event error bound nor an executed outgoing branch. Neither subject refinement nor exact controls on different data replace this independent evidence.

## Reproduction, preservation and falsifiers

Run with the shared executable venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-postfold-continuation.py --known
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-postfold-continuation.py --history .local-data/collinear-research/linear-self-birth-to-fold/resolved-h4096-q1e-06.npz
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-postfold-continuation.py --history .local-data/collinear-research/linear-self-birth-to-fold/resolved-h4096-q1e-06.npz --tol 1e-12 --max-step .01
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-postfold-continuation.py --history .local-data/collinear-research/linear-self-birth-to-fold/resolved-h8192-q1e-06.npz --tol 1e-12 --max-step .01
```

Ignored outputs, bound input copies and receipts belong to `.local-data/collinear-research/linear-postfold-continuation/`. Each receipt names input and subject hashes, all source-clock arcs, the source guard, complete event census and dense-history output. Foreground runs completed with exit zero in 0.175, 0.304 and 0.310 seconds; no heartbeat interval was reached and no job remains active. The initial target attempt stopped with a deliberate exception on finding the new speed event; the final instrument instead saves and reports that same event as its completion boundary. No failed channel was substituted by zero.

Before creating these two owned files, basename `rg` searches under `scripts`, `tests` and `reference` found no named consumer or binder in that scope. Earlier subject instruments, independent oracles, reports and receipts are preserved. This work creates no standing test, tracker edit, physical shim, production path, generator write or Git publication.

The measured event claim is falsified by an earlier admissible root omitted by the complete polynomial census, an independent signed-integral mismatch beyond interpolation/refinement limits, a source-clock guard failure before the event, or a refinement that changes the stated event geometry beyond its quoted precision. A later outer turn requires an admissible outgoing event solution and new complete-root evolution. This prefix supports neither that turn nor global escape, recurrence or nonexistence.

## Scoped validation and current disposition

The accepted next-speed-event object is completed at independently checked numerical and conditional-theorem grade. Both target audits and all numerical subjects are finished; no outgoing branch has been selected. Continuous enclosure of the exact held release and branch-specific future motion remain open. The theorem's multiple continuations are a uniqueness obstruction within its stated class, not permission to import a cap, impulse or response selector.

During integration, `node scripts/validate-content.mjs --check --strict` completed with zero errors, zero warnings and 30 informational notes. Final scoped checkers passed known controls before checking 255 local links and 833 KaTeX spans across 11 affected documents, with no missing files, anchors or math syntax errors. Shared-venv `py_compile` passed for both new instruments, and scoped `git diff --check` passed. These document and code-syntax checks are separate from scientific evidence. Final source snapshots and byte identities are retained under `.local-data/collinear-research/linear-postfold-independent/`; no generated artifact was rewritten.
