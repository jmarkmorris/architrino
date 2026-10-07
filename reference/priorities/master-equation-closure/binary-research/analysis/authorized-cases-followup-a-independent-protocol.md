# Independent signed-residual reference for the original Maxwell E prefix

Status: method and instrument frozen after known controls, before target admission. This is a Germund Dahlquist Specialist numerical-reference assignment. The lens supplies no acceptance authority. The original E pair, coefficient $K=c_f=1$, speed $3/10$, radius $25/9$, angular rate $27/250$, complete compatible past and separately bounded comparison-past mismatch remain unchanged. No physical evolution or new endpoint is computed.

## Independence and exact derivative

The [subject method](authorized-cases-followup-a-signed-defect.md) is already mathematically admitted by the [separate assessment](authorized-cases-followup-reference-a-signed-defect-admission.md). This reference independently implements its numerical residual primitives using direct scalar/vector product differentiation and centered quadrature. It imports neither the subject instrument nor its `moments` or `signedPiece` functions and does not call a sensitivity matrix for target evaluation. Accepted exact rational/grid arithmetic, the cached exact history evaluator and `rootBox` are shared. This is therefore not an independent root-completeness or history-construction audit. The original v9 coefficient/domain proof and complete preparation mismatch are inherited premises.

For actual negative-member source velocity $v$, acceleration $a$ and jerk $j$, receiving velocity $u$, and receiver-minus-source displacement $r$, define

$$
R=|r|,\quad n=r/R,\quad D=1-n\cdot v,\quad c=\frac{1-n\cdot u}{D},
\quad w=n-v,\quad q=1-v\cdot v,
$$

$$
J=(n\cdot a)w-Da,\qquad N=qw+RJ,\qquad F=-\frac{N}{R^2D^3}.
\tag{1}
$$

Here $c=dS/dT$ is the actual comparison root rate. The signs for a mirror comparison are $r=y(T)+y(S)$ and $(v,a,j)=-(y'(S),y''(S),y'''(S))$. Both source acceleration and source jerk are retained. The independent derivative uses

$$
r'=u-vc,\quad R'=n\cdot r',\quad n'=\frac{r'-nR'}R,
\quad v'=ac,\quad a'=jc,\quad D'=-n'\cdot v-n\cdot v',
$$

$$
w'=n'-v',\quad q'=-2v\cdot v',\quad
J'=(n'\cdot a+n\cdot a')w+(n\cdot a)w'-D'a-Da',
$$

$$
N'=q'w+qw'+R'J+RJ',\qquad
F'=\frac{N(2R'/R+3D'/D)-N'}{R^2D^3}.
\tag{2}
$$

These are ordinary product and quotient rules applied to the full E kernel. On a receiving interval the accepted history evaluator encloses every sampled piece and both one-sided jerks at a seam. Thus (2) encloses the almost-everywhere derivative without asserting continuous jerk. Positive $R$ and $D$ are separately checked.

## Independent centered integral rule

Let a receiving piece be $[m-\ell,m+\ell]$, and let $w_T=T-m\ge\ell$. Let $d=y''-F[y]$. Enclose its midpoint value by $D_m$ and its derivative componentwise by $[c_j-\rho_j,c_j+\rho_j]$ on the whole piece. Then

$$
\int d(t)\,dt\in2\ell D_m+[-\ell^2\rho,\ell^2\rho],
\tag{3}
$$

$$
\int(T-t)d(t)\,dt
\in2\ell w_TD_m-\frac{2\ell^3}3c
+[-w_T\ell^2\rho,w_T\ell^2\rho].
\tag{4}
$$

To derive these, write $d(m+s)=d(m)+cs+\epsilon(s)$, with $|\epsilon_j(s)|\le\rho_j|s|$, from the fundamental theorem for Lipschitz functions. The odd linear term integrates to zero in (3). In (4), $\int_{-\ell}^{\ell}(w_T-s)s\,ds=-2\ell^3/3$, while $\int_{-\ell}^{\ell}(w_T-s)|s|\,ds=w_T\ell^2$. This argument explicitly requires a nonnegative final weight, checked by $T\ge m+\ell$. It differs from the subject's left-endpoint moment rule and preserves exact affine cancellation.

The old whole-cell allowances provide the separately derived remainder

$$
G_j=C_{x,j}(X_j+s_X)+H_{v,j}s_V+B_js_A.
$$

Summing (3)–(4) yields independent componentwise enclosures of $I_1,I_2$. The endpoint radii remain $V_0+\sum h_jG_j$ and $X_0+TV_0+\sum h_j[T-(L_j+R_j)/2]G_j$. Euclidean interval norms are computed directly by interval sums of squares and an outward square root, without the subject norm helper. No endpoint improvement is used as a whole-cell source bound.

## Known controls completed before target

The [independent instrument](../evidence/authorized-cases-followup-a-independent-signed.mjs) passed its known controls at `2026-10-06T13:07:17.628Z`, under Node with a 1024 MiB heap cap. The foreground run completed in approximately 0.40 seconds by `exec_command`; no target input was evaluated. Exact controls were independently derived before implementation:

- Stationary source at $R=2$, $n=e_1$, receiving velocity $(3/10,2/5)$: $F=(-1/4,0)$ and $F'=(3/40,-1/20)$, directly from $F=-r/|r|^3$.
- At source time zero, $v=0$, $a=(0,1/5)$, $j=(0,1/7)$, and $u=(1/4,0)$ with $R=2$, $n=e_1$: $c=3/4$, $F=(-1/4,1/10)$ and $F'=(1/16,11/140)$. Independently reducing the transverse derivative gives $a_y(1-2u_x)/R^2+j_y(1-u_x)/R$. This checks the nonzero acceleration and source-clock jerk contribution. Such jets can be realized by a smooth local cubic source and a complete strict-speed extension; the control is a kernel derivative, not a coupled solution.
- For $d(t)=2t-1$ on $[0,1]$, the exact two integrals are $0,-1/6$. For the continuous triangular residual with its derivative seam at $1/2$, they are $1/4,1/8$. For $d=t^2$, the rule encloses the exact $1/3,1/12$.
- An invalid final weight is rejected. The shared exact quadratic comparison gives the independently checked midpoint residual $-1/4+(2-t^2/8)^{-2}$ and whole-piece derivative $(t/2)(2-t^2/8)^{-3}$.

The shared modules also run their previously accepted `--known` controls as import side effects. Those printed sensitivity controls are inherited infrastructure checks, not the independent reference derivation. The new target uses only `rootBox` from that module and computes (1)–(2) itself.

Measured identities by scoped `shasum -a 256`: instrument `2b2bafac334605370c28365eac247e33c328fe7ffbee085cf1b544b2e921f35b`; known receipt `257f3efddb2c513abb5292939d0b0a6b02eca2074d98a2a90820cc42ab1c430a`. The known receipt is local provenance at `.local-data/master-equation-closure/binary-research/authorized-cases-followup/a-independent/known-v1.json`. It contains all seven transitive shared-module SHA-256 identities. Target startup and completion assert unchanged import identities; the known receipt must match the entry source. This binds the shared infrastructure without claiming independent implementation of it.

## Fixed target and owned resource envelope

The exact input is `.local-data/master-equation-closure/binary-research/maxwell-shaped-overnight/b03-E-checked-event999-h0.00125.history.json`. Its identity is checked against the original v9 summary's `inputSHA`. The summary is `b03-E-actual-T59p5-v9-frame-strict-v1.json` in that directory, SHA-256 `f8434f413018ea7915641aedfeac75001973c3ba6b23c2361f2559699103269f`; its `.jsonl` stream is `c1daec244121579ad7803561e06adc84eea51277a2d17f2405c23d354dd251bd`. Exactly the first 128 complete rows are used, each with eight exact equal pieces. The final endpoint is the exact right face of row 127. Every row and newly enclosed source window must remain negative-time; positive-source input is rejected. Original initial errors and all three preparation mismatch components are retained.

The requested exclusive output is `.local-data/master-equation-closure/binary-research/authorized-cases-followup/a-independent/target-v1.json`, capped at 2 MiB. It retains every piece's midpoint residual, derivative enclosure, root brackets, domain margins and signed integral enclosures. There is no parameter adaptation, cell extension or trajectory evolution. The target's scientific outcome is a valid independent endpoint allowance and whether it improves the old allowance. Failure to improve is a method outcome, not a physical event or a theorem obstruction.

Launch is held pending root pretarget assessment. Once admitted, use the live owned supervisor with `--deadline-seconds 1260 --heartbeat-seconds 10`, Node `--max-old-space-size=1024`, and the instrument's 1200-second cooperative cutoff. The instrument emits processed-cell/piece progress at least at the first piece boundary after each ten-second interval; the supervisor supplies the independent ten-second lifecycle heartbeat and hard wall deadline. A piece is not an unbounded solver loop: its root iterations and two-dimensional arithmetic are fixed. If an observed piece exceeds the cadence materially, report that fact rather than treating a supervisor liveness tick as scientific progress.

The current host exports owner task `01a10ebb-fea3-7150-a18f-f0c33c30a2fb` and thread `01a10fb5-04b8-7e51-aee5-45262fbd314a`. The exact returned lease will identify this reference job. Other root-owned jobs are outside this worker's stop scope. After completion record its terminal state, output hash and process-group closure. No target is launched by this freeze.

## Falsifiers and comparison boundary

An incorrect sign or omitted source acceleration/jerk in (1)–(2), incorrect centered moment weight, a missing source seam, an unbounded original source mismatch, changed imported bytes, or mismatched original rows defeats the certificate. Agreement between the two outputs is numerical evidence only for their independently implemented derivative/quadrature paths. It does not independently establish shared root or original-domain correctness. The subject's target output remains unopened until this reference is frozen; subsequent comparison will preserve both outputs. No shared or frozen source is modified.
