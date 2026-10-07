# Independent fifth-order canonical mirror response

**Blind formal reference, frozen for separate assessment.** This separately authored calculation derives the degree-four and degree-five source response from the [declared cubic comparison field](overnight2-a-canonical-fifth-order-method.md). The [cubic assessment](overnight2-a-canonical-cubic-assessment.md) and [earlier independent cubic reference](overnight2-a-reference-canonical-cubic-row.md) are inherited inputs. The coordinator's fifth-order producer, target receipt and result subject remain unread. No physical history, acceleration law, production evolution or actual fate is introduced.

The analytical lens is Jack K. Hale, with exact coefficient arithmetic. The [reference instrument](../evidence/overnight2-a-reference-canonical-fifth-order.py) differentiates the Cartesian comparison field by Lie derivatives and then eliminates the implicit clock coefficient by coefficient. It does not use the coordinator's described recursion in stretched-time path coefficients. Both computations necessarily evaluate the same mathematical source functional; independence lies in the separately authored algebra and implementation, not different physics.

## Cartesian jets derived before the new response coefficients

Let $\alpha=\epsilon/h$, $P=hp$, $Q=hq=h^2/r$. The fixed reception data are $y(0)=(1,0)$ and $w(0)=(P,Q)$. In this section $A_j$ denotes the coefficient of $\alpha^j$ in the comparison acceleration, and $J_j,B_j,C_j$ denote successive time derivatives with the same coefficient convention. Write $F_3=\sum_{j=0}^3\alpha^j A_j(y,w)$, with precisely the field in the method. Define

$$
\mathcal L_0=w\cdot\partial_y+A_0\cdot\partial_w,
\qquad \mathcal L_j=A_j\cdot\partial_w\quad(j\ge1).
$$

Then $J_j=\sum_{k=0}^j\mathcal L_k A_{j-k}$, $B_j=\sum_{k=0}^j\mathcal L_kJ_{j-k}$ and $C_0=\mathcal L_0B_0$. The needed reception jets, independently differentiated by hand before reading any new response output, are

$$
\begin{aligned}
A_0&=(-Q,0),& A_1&=(-QP,Q^2),\\
A_2&=(Q^3/2,PQ^2),& A_3&=(4PQ^2/3,-5Q^3/3),\\
J_0&=(2QP,-Q^2),\\
J_1&=(2QP^2-2Q^3+Q^2,-4PQ^2),\\
J_2&=(PQ^2-3PQ^3,-3P^2Q^2+3Q^4/2),\\
B_0&=(-6QP^2+3Q^3-2Q^2,6PQ^2),\\
B_1&=(-6QP^3+18PQ^3-10PQ^2,18P^2Q^2-6Q^4+4Q^3),\\
C_0&=(24QP^3-36PQ^3+22PQ^2,-36P^2Q^2+9Q^4-8Q^3).
\end{aligned}
\tag{1}
$$

For example the general first-order jerk before evaluating at reception is

$$
J_1=\frac Q{\rho^3}[(8p^2-2|w|^2)n-4pw]+\frac{Q^2}{\rho^4}n,
\quad \rho=|y|,\quad n=y/\rho,\quad p=n\cdot w.
$$

Taking $\mathcal L_0J_1+\mathcal L_1J_0$ gives $B_1$ in (1). The term $\mathcal L_1J_0$ contributes $(-2PQ^2,-Q^3)$ and must not be dropped. For $C_0$, direct differentiation of $A_0$ gives $D^3A_0[w,w,w]+3D^2A_0[w,A_0]+DA_0(DA_0w)$. Its radial $Q^2P$ coefficient is $18+4=22$. The radial zero-transverse analytical control, holding the central coefficient fixed independently of the transverse initial velocity for this control only, also gives $x^{(5)}=24QP^3+22Q^2P$ directly from $x''=-Q/x^2$.

The source path is evaluated using

$$
y(\tau)=n+w_0\tau+\frac{A\tau^2}{2}+\frac{J\tau^3}{6}
+\frac{B\tau^4}{24}+\frac{C\tau^5}{120}+O(\alpha^6),
$$
$$
w(\tau)=w_0+A\tau+\frac{J\tau^2}{2}+\frac{B\tau^3}{6}+\frac{C\tau^4}{24}+O(\alpha^5),
\qquad \tau=-2\alpha L.
\tag{2}
$$

In (2), $A$ is retained through degree three, $J$ through degree two, $B$ through degree one and $C$ through degree zero. The orders shown are formal along $\tau=O(\alpha)$; no uniform actual-history remainder is yet claimed. Every retained velocity jet is the derivative of the same source-position jet. A missing acceleration or jerk term therefore cannot be repaired by choosing an independent source velocity.

## Known controls before target use

The reference instrument first checks exact convolution and reciprocal identities, the constant-acceleration Taylor factors, a constant-acceleration sampled response, the full affine response through degree five, and the independently known generated cubic response in a degree-three-only call. For the constant radial acceleration control with zero initial velocity, the exact scalar equations are $S=2+c\alpha^2S^2/2$ and $D=1-c\alpha^2S$. They imply the radial response $-1-c^2\alpha^4+O(\alpha^6)$, with zero transverse response. This exercises the sampled source and implicit root, rather than merely inspecting a derivative formula.

The affine control is

$$
\mathcal R_r^{\rm aff}=-\sqrt{1-\alpha^2Q^2}-\alpha P,
\qquad
\mathcal R_t^{\rm aff}=\alpha Q+\frac{\alpha^2PQ}{\sqrt{1-\alpha^2Q^2}}.
$$

Its degree-five coefficient lists are $(-1,-P,Q^2/2,0,Q^4/8,0)$ and $(0,Q,PQ,0,PQ^3/2,0)$. The generated cubic control is the independently proved addition $4PQ\alpha^3/3$ radially and $-5Q^2\alpha^3/3$ transversely. All are fixed analytical references before the new target coefficients.

Measured by the supervisor-run reference instrument, known mode returned `PASS` at 05:46:47 UTC, with source SHA-256 `fe8a6b3a1fd48843549829448cf7a4ca0215cff3a32ac4474c023febc091bfa2`, internal elapsed time 0.33143370784819126 seconds and closed process group. The coordinator retains the receipt at `.local-data/master-equation-closure/overnight2-a/reference-canonical-fifth-known.json`, the progress log beside it, and original supervisor logs under lease `25cd58ac-18b6-46f0-92a4-68747428bdc3`. I read the successful receipt before reading any target output. Instrument execution uses the shared venv with `-B`, one CPU job, a 90-second internal alarm, 512 MiB cooperative RSS ceiling, 1 MiB output ceiling and the coordinator's supervisor. This is exact formal arithmetic, not a physical trajectory.

## Independent response coefficients

Set $S=n+y(-2\alpha L)$ and $D=1+\alpha S\cdot w(-2\alpha L)/(2L)$. The instrument solves $S\cdot S-4L^2=0$ sequentially with $L(0)=1$. At degree $j\ge1$, a new coefficient $L_j$ first appears as $-8L_j$; its appearance inside the source path has at least one extra factor of $\alpha$. Thus the coefficient at $L_j=0$, divided by eight, is the next clock coefficient. Substitution verifies the entire implicit polynomial residual through degree five. The response is then evaluated as $-S/(2L^3D)$, using the same $L$ and sampled velocity.

The result, in units of the physical slow acceleration multiplied by $r^2$, is

$$
\begin{aligned}
\mathcal R_r={}&-1-\alpha P+\frac{\alpha^2Q^2}{2}
+\frac43\alpha^3PQ\\
&+\frac{\alpha^4Q}{24}(64P^2+3Q^3-64Q^2+24Q)\\
&+\frac{\alpha^5PQ}{15}(44P^2-196Q^2+57Q)+O(\alpha^6),\\
\mathcal R_t={}&\alpha Q+\alpha^2PQ-\frac53\alpha^3Q^2\\
&+\frac{\alpha^4PQ^2}{6}(3Q-38)\\
&-\frac{\alpha^5Q^2}{30}(284P^2-121Q^2-18Q)+O(\alpha^6).
\end{aligned}
\tag{3}
$$

These are derived formal comparison-response coefficients, measured by a separately authored exact arithmetic instrument with the analytical controls above. They have not yet been checked against the coordinator's undisclosed output. No coefficient is fitted from a trajectory.

For independent reconstruction of the implicit-source steps, the new clock coefficients are

$$
\begin{aligned}
L_4&=\frac{24P^4+36P^2Q^2-24P^2Q+9Q^4-8Q^3+16Q^2}{24},\\
L_5&=-\frac P{15}(15P^4+30P^2Q^2-12P^2Q+15Q^4-42Q^3-16Q^2),
\end{aligned}
$$

and the new transmitter coefficients are

$$
D_4=\frac{2Q}{3}(6P^2-5Q^2+4Q),\qquad
D_5=\frac{PQ}{24}(96P^2-3Q^3-360Q^2+160Q).
\tag{4}
$$

The lower coefficients agree with the frozen cubic identities. Every transverse coefficient in (3) contains $Q$. At $P=0$, the displayed radial odd-degree terms and transverse even-degree terms vanish. These algebraic controls are consistent with the reversal structure but are not substitutes for the root calculation.

The target receipt reports internal elapsed time 0.5899302093312144 seconds; the coordinator's supervisor reports 0.659 seconds and closed process group under lease `a04e0a20-cd68-4e78-8262-14dc4533e47a`, completed at 05:47:12 UTC. Output and progress are retained at `.local-data/master-equation-closure/overnight2-a/reference-canonical-fifth-target.json` and its matching progress log. The instrument remained unchanged after the known pass. Comparison of (1) with the output exposed one slip in the provisional hand notes: the radial coefficient of $QP^3$ in $B_1$ was written as $-12$ instead of $-6$. Re-expansion of $J_{1,r}=Q(2P^2-2Q^2)+Q^2$ resolves it before this reference is frozen. The correction changes no instrument or inherited input; all remaining hand jets agree.

## A conservative analytic Taylor remainder for this comparison

A bounded comparison remainder can be proved without any analytic history-flow premise. Fix real $P,Q$ with $0<Q\le4$, $P^2+Q^2\le16$, and let $\alpha$ be complex with $|\alpha|\le a_0=1/200$. The extra velocity condition includes the accepted mirror regime; the coefficients in (3) themselves do not require this restriction. Continue the field analytically using the branch $\rho=(y\cdot y)^{1/2}$ near $y=n$. Dots here are complex bilinear products, while all bounds use Euclidean absolute-value norms.

On the complex tube $|y-n|\le0.1$, $|w|\le5$, one has $|y\cdot y-1|\le0.21$, $|\rho|\ge\sqrt{0.79}$, $|n_y|\le1.1/\sqrt{0.79}$, $|p|\le5.5/\sqrt{0.79}$ and $|v|\le5+|p||n_y|$. The four terms of $F_3$ are bounded respectively by $6.28$, $0.52$, $0.023$ and $0.0001$, hence $|F_3|<7$. Direct differentiation gives conservative bounds $\|D_yF_3\|<100$ and $\|D_wF_3\|<2$: the four position-derivative contributions are below $32,4,1,0.01$, and the three nonzero velocity-derivative contributions are below $0.11,0.01,0.001$.

The holomorphic integral map on $|\tau|\le0.012$ retains the tube because

$$
|w-w_0|\le7(0.012)=0.084,
\qquad |y-n|\le4(0.012)+\tfrac72(0.012)^2=0.048504.
$$

The coupled difference estimate has contraction factor at most $100(0.012)^2/2+2(0.012)=0.0312<1$. Equivalently one may use the corresponding weighted product norm. This proves a unique holomorphic comparison solution on that time disc, jointly holomorphic in $\alpha$. It is an auxiliary ODE assertion only.

For $|L-1|\le0.05$, the sampled time satisfies $|\tau|\le2a_0(1.05)=0.0105$. Thus $|S-2n|<0.043$, $|S|<2.043$, $|\sqrt{S\cdot S}|>1.956$ and $|w|<4.074$. The clock map $G(L)=\sqrt{S\cdot S}/2$ has $|G(L)-1|<0.022$ and derivative norm below

$$
\frac{a_0(2.043)(4.074)}{1.956}<0.022.
$$

It therefore has a unique holomorphic fixed point in this disc. The transmitter factor obeys $|D|>0.978$, and the comparison response satisfies $|\mathcal R|<1.2$ throughout the complex $\alpha$ disc. This proves the missing complex-clock margin rather than extrapolating a real root bound.

The transverse estimate is stronger. Expanding the field's transverse component as a function of $y_t,w_t$ on the same complex tube gives

$$
|F_{3,t}|\le6.2|y_t|+0.03|w_t|.
$$

For example the central contribution to the $y_t$ coefficient is below $5.70$; the first-, second- and third-order contributions are below $0.353$, $0.011$ and $0.000061$. The respective $w_t$ coefficients are below $0.0254$, $0.00079$ and $0.000005$. Since $y_t(0)=0$ and $w_t(0)=Q$, integration gives $|w_t|\le Q/[1-6.2(0.012)^2-0.03(0.012)]<1.002Q$. At the source, $|S_t|<2.105|\alpha|Q$, so

$$
|\mathcal R_t|<1.2|\alpha|Q.
$$

The holomorphic quotient $\mathcal R_t/(\alpha Q)$ has a removable value at zero and is uniformly bounded by 1.2. Cauchy's coefficient estimate, followed by the geometric tail sum, now yields for real $0\le\alpha\le10^{-3}$

$$
|\mathcal R-\mathcal R_{[5]}|
\le\frac{1.2(\alpha/a_0)^6}{1-\alpha/a_0}
\le9.6\times10^{13}\alpha^6,
$$
$$
|\mathcal R_t-\mathcal R_{t,[5]}|
\le\frac{1.2\alpha Q(\alpha/a_0)^5}{1-\alpha/a_0}
\le4.8\times10^{11}Q\alpha^6.
\tag{5}
$$

This is a deliberately loose, explicit analytic comparison remainder. The constants can outweigh the benefit of two extra powers near the largest inherited speed; no practical improvement over the accepted cubic enclosure is asserted. The transverse factor is proved before division, and the bound remains uniform as $Q$ tends to zero. Nothing here differentiates an actual-history residual.

## Scope, first transfer obligation and falsifiers

Accept (3) as this reference's independently produced formal coefficient claim, ready for separate comparison and assessment. Equation (5) is a new analytical comparison theorem, also awaiting the coordinator's independent reconstruction. Neither is an actual sixth-order mirror theorem by itself. The next needed estimate is an actual-to-cubic-comparison discrepancy of order $\alpha^6$, including a transverse $Q$ factor, on a full generated common window where the accepted cubic error is valid at every receiver. That requires its additional nested-source coverage. The accepted source-comparison mechanism explains how to obtain it, but the first-order field constants cannot be silently reused for $F_3$.

For the original nonmirror nominal/spatial family, both original source clocks, normal components, additional centered-history forcing and the supplied seam remain separate obligations. They need not have the mirror transverse factor. No positive terminal speed, entry sign, all-future event, or replacement history follows from (3)–(5).

A falsifier is a missing Lie-derivative term in (1), a source-velocity jet incompatible with (2), a nonzero coefficient in $S\cdot S-4L^2$ after substitution, a changed transmitter factor, or failure of a stated complex-tube derivative/clock bound. Inspect the explicit jets and (4) to localize coefficient failures; inspect the complex bilinear square-root branch and the transverse component inequality to test (5). Independent agreement with an undisclosed subject, if later obtained, tests exact algebra only until both sides' actual remainder and history coverage have been assessed.

## Provenance and document validation

The only authored files are this new analysis and its separately linked reference instrument. The coordinator owns all supervisor launches and runtime receipts. No earlier subject, assessment, canonical owner, shared report, physical preparation, Git metadata or generated artifact is edited. The source identities measured by `shasum -a 256` before target use and again at closeout are:

| Source | SHA-256 |
| --- | --- |
| Fifth-order method | `98bb2516e6e2dbe4b49550946b30b7353a040f2420b0f125e049dda3080eacfb` |
| Accepted cubic assessment | `ef18c18f49cb82264efa03ed51c2c1fdefad508f36d90255acb29f9b474d4013` |
| Independent cubic reference | `d051660d4a64f03acc778abc8f68ae3ecbd8df3966c081954aee763b74d6340c` |
| New reference instrument | `fe8a6b3a1fd48843549829448cf7a4ca0215cff3a32ac4474c023febc091bfa2` |

The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration. The established known-first document checker is used only for TeX, whitespace and local links; it does not adjudicate (1)–(5). Source preservation and exact target provenance are measured separately from mathematical acceptance.

**Freeze receipt, 2026-10-07 05:52 UTC.** `node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs reference/priorities/master-equation-closure/binary-research/analysis/overnight2-a-reference-canonical-fifth-order.md` passed known controls first and then 128 mathematical spans and five local links, with no whitespace diagnostics. The closeout `shasum -a 256` command matched all four identities in the table. The coordinator's coefficient result, producer, target receipt, evaluated-comparison companion and new complex-radius material remain unread at this freeze. The two reference subprocesses are closed according to the coordinator's supervisor receipts; no further computation is running or requested.
