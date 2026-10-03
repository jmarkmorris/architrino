# A conditional obstruction to downward wake-speed crossing

## Statement and meaning

Under the unchanged inverse-square Master Equation, a locally collinear architrino cannot cross continuously from above wake speed to below it while the negative projection of its actual remaining acceleration has a finite integral. The proof constructs a newborn positive-delay self root and shows that its accumulated forward acceleration is infinite. No assumption of nonzero endpoint acceleration or a power-law crossing rate is needed.

**Grade:** derived and self-reviewed; separate adjudication is not yet supplied by this author. The accepted [reciprocal-delay adjudication](mec-008-self-delay-independent-adjudication.md#independent-reciprocal-delay-derivation) supplies an independent analytical reference for the integration inequality, not independent review of every hypothesis and branch construction below. This result gives no continuation rule, universal speed barrier, population cancellation theorem or physical-energy account. It does not select the dormant speed ceiling. All numerical conventions are $c_f=1$; this proof uses only symbolic quantities in those units.

## Histories and the actual remainder

Fix one persistent label, a constant unit vector $\mathbf e$, a point $\mathbf X_0$ and $a>0$. Assume that its history on $[-a,a]$ is

$$
\mathbf X(T)=\mathbf X_0+x(T)\mathbf e,
\qquad x\in C^1([-a,a]),\qquad x(0)=0.
$$

Choose the spatial orientation so that $v(T)=x'(T)>0$ throughout this interval. The downward-crossing assumptions are

$$
v(0)=1,\qquad v(S)>1\quad(-a<S<0),\qquad
0<v(T)<1\quad(0<T<a).
$$

The sign conditions are strict on both sides, but their approach to one can be arbitrarily flat. The receiver velocity is locally absolutely continuous on $(0,a)$, and the unchanged equation holds almost everywhere there. Its endpoint velocity is finite and continuous by the $C^1$ history assumption. Complete source histories and all admitted ordinary roots are retained. Any infinite sum used for the remainder must already have an independently justified meaning; this theorem supplies no summation prescription.

For the self branch constructed below, let $A_s(T)>0$ denote its scalar acceleration along $\mathbf e$. Define the vector remainder by the actual complete equation,

$$
\dot{\mathbf V}(T)=A_s(T)\mathbf e+\mathbf R(T),
\qquad b(T)=\max\{0,-\mathbf e\cdot\mathbf R(T)\}.
$$

The remainder includes every other partner and self row, including remote roots. It is not an adjustable counterterm. The decisive hypothesis is

$$
\int_0^{a_1}b(T)\,dT<\infty
$$

for some sufficiently small $a_1>0$. No pointwise bound on $\mathbf R$ is required. Bounded opposing rows with finite count and nonzero range/transmitter margins are a sufficient special case. Other forward contributions cannot remove the obstruction. An uncontrolled negative integral, a discontinuous endpoint velocity or a different local geometry falls outside the theorem.

## Construction of the recent self root

Define positive incoming speed excess and outgoing speed deficit by

$$
w_-(\rho)=v(-\rho)-1,
\qquad w_+(T)=1-v(T),
\qquad 0<\rho,T<a,
$$

and their strictly increasing primitives

$$
F_-(\rho)=\int_0^\rho w_-(u)\,du,
\qquad F_+(T)=\int_0^T w_+(u)\,du.
$$

Both tend to zero at their left endpoints. After decreasing $a_1$ if needed, $F_+(T)<F_-(a/2)$ for $0<T\le a_1$. Thus there is a unique $\rho(T)\in(0,a/2)$ satisfying $F_-(\rho(T))=F_+(T)$. Continuity gives $\rho(T)\to0$ as $T\downarrow0$. Strict positivity of $w_-$ makes this inverse continuously differentiable at every positive argument, with

$$
\rho'(T)=\frac{w_+(T)}{w_-(\rho(T))}>0.
$$

The path satisfies

$$
x(T)=T-F_+(T),\qquad x(-\rho)=-\rho-F_-(\rho).
$$

Consequently the emission time $S(T)=-\rho(T)$ obeys

$$
x(T)-x(S(T))=T+\rho(T)=T-S(T).
$$

This is a positive-delay self root with forward direction $\mathbf n=\mathbf e$, delay and range $\delta(T)=T+\rho(T)>0$, and transmitter factor

$$
D_t=1-v(-\rho(T))=-w_-(\rho(T))<0.
$$

It is simple for every $T>0$. Its delay is strictly increasing and tends to zero at birth. Uniqueness here concerns the constructed emission interval $(-a/2,0)$, not an assertion that no remote self roots exist. The complete remainder retains those roots.

## Divergence and contradiction

Self polarity is repulsive under the unchanged law. With $K_i=\kappa|q_i|^2>0$, the ordinary self row and the delay derivative are

$$
A_s(T)=\frac{K_i}{\delta(T)^2w_-(\rho(T))},
\qquad
\delta'(T)=\frac{w_-(\rho(T))+w_+(T)}{w_-(\rho(T))}.
$$

Change variable from reception time to the strictly increasing delay. The exact acceleration measure is

$$
A_s(T)\,dT
=\frac{K_i\,d\delta}
{\delta^2[\,w_-(\rho(T))+w_+(T)\,]}.
$$

Continuity of the incoming and outgoing velocities gives a finite positive upper bound $B_0$ on the bracket over $(0,a_1]$. It even tends to zero at birth, but boundedness alone suffices. For $0<\varepsilon<t\le a_1$,

$$
\int_\varepsilon^t A_s(T)\,dT
\ge\frac{K_i}{B_0}
\left(\frac1{\delta(\varepsilon)}-\frac1{\delta(t)}\right)
\longrightarrow+\infty\quad(\varepsilon\downarrow0).
$$

On each compact interval, the actual receiver equation and local absolute continuity also give

$$
\int_\varepsilon^t A_s(T)\,dT
\le v(t)-v(\varepsilon)+\int_\varepsilon^t b(T)\,dT.
$$

The right side has a finite limit by endpoint continuity and the opposing-integral hypothesis. The two inequalities contradict each other. Therefore no unchanged-law solution has all the stated crossing, regularity and remainder properties. Equivalently, a downward history with this geometry and finite endpoint velocity would require the actual remaining rows to provide a nonintegrable negative projection. The theorem does not construct such a cancellation or establish that a canonical environment supplies it.

## Analytical controls and the existing delay theorem

For $x(T)=T-\alpha T^2/2$ with $\alpha>0$ and a sufficiently short interval, $w_-(\rho)=\alpha\rho$ and $w_+(T)=\alpha T$. The construction returns $\rho=T$, $\delta=2T$, $D_t=-\alpha T$ and $A_s=K_i/(4\alpha T^3)$, agreeing exactly with the [previous local control](research-alternatives-assessment-2026-10-03.md#downward-crossing-a-local-control-rather-than-a-universal-barrier). This is a direct algebraic known case, not a newly run trajectory or independent numerical certificate.

The accepted self-delay adjudication already derives a one-connected-graph reciprocal-delay inequality in either reception direction. That inequality can exclude a zero-delay birth when its velocity, common-direction and opposing-integral hypotheses hold. Its stronger *uniform floor across all root graphs* additionally needs regular entrance/cutoff provenance and a positive entrance minimum. The earlier discussion correctly denied applying that uniform entrance-floor theorem at this newborn branch, but was too broad if read as denying every application of the accepted one-graph estimate. Here the missing work is the explicit birth construction and hypothesis verification, supplied above; no positive initial delay is assumed at birth.

## Scope, falsifiers and independent review target

| Conclusion | Check that would overturn it |
| --- | --- |
| Recent branch and negative transmitter sign | A $C^1$ strictly downward collinear crossing for which the constructed $F_-^{-1}F_+$ branch fails the positive-delay chord equation or has $D_t\ge0$. |
| Acceleration-measure identity | Direct differentiation or substitution on a simple constructed root disagrees with the displayed change of variables, including its orientation or absolute transmitter factor. |
| Conditional exclusion | A complete canonical solution satisfying the finite endpoint velocity, local absolute continuity and finite negative remainder integral violates the integrated contradiction. A chosen cancellation outside these hypotheses is not a falsifier. |
| Relation to prior theorem | An independent reading shows that the one-graph reciprocal-delay estimate requires an entrance minimum in addition to its own explicitly stated hypotheses. |

Separate review should reconstruct the branch, integration and actual remainder decomposition without altering this subject or its independent reference. Noncollinear turning chords, speed touches without strict crossing, discontinuous velocities, singular root lineages and unbounded opposing integrals retain their own unresolved domains. This theorem does not withdraw corpus statements about every possible route from the superfield regime.
