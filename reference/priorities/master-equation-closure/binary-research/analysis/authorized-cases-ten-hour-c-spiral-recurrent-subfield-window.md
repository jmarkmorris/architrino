# Infinite trajectories repeatedly return a fixed distance below unit speed

## Derived candidate

For every actual infinite strict continuation of the admitted logarithmic family, there are $\beta<1$ and a finite late cutoff such that every later time $t$ has a subsequent time $t_1$ satisfying

$$
t\le t_1\le s_0+1600(t-s_0),
\qquad |v(t_1)|\le\beta.
\tag{1}
$$

Here $s_0$ is the same fixed old source-time origin used in the accepted radius and clock estimates. The factor 1600 is explicit; the gap $1-\beta$ is existential and branch-dependent. This statement assumes the branch is infinite but does not assume a uniform total-speed margin or convergence of its speed. It proves repeated finite-length visits to a subfield speed region, not the absence of near-unit peaks.

Claim grade: derived candidate awaiting independent assessment. Keep only the coefficient-one logarithmic law, $c_f=1$, complete ordinary roots, and the actual family in the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The proof uses the accepted [compact infinite regime](authorized-cases-ten-hour-c-spiral-compact-infinite-regime.md) and exact constant-speed algebra. It does not depend on a numerical trajectory, new amplitude, or prescribed replacement past.

## 1. A unit plateau cannot contain two causal generations

Consider one complete normalized limiting trajectory supplied by the compact-regime theorem. Its speed is at most one, its angular momentum is positive, its partner lag is acute, and all partner roots are ordinary. Suppose its speed were identically one on an open interval $I=(A,B)$.

At every point of $I$, the unchanged acceleration and constant speed give $n\cdot v=0$. Positive angular momentum selects

$$
v=Jn,\qquad
v'=-\frac n{RD},\qquad
n'=\frac v{RD},\qquad s'=\frac1D.
\tag{2}
$$

Thus the continuously unwrapped velocity heading increases strictly on $I$. When both $t$ and $s(t)$ belong to $I$, differentiate the exact chord $Q(t)+Q(s)=Rn$ and use (2):

$$
v+\frac{v_s}{D}
=R'n+\frac vD,
\qquad
v_s=(D-1)(n-v).
\tag{3}
$$

Both velocities have unit magnitude, so

$$
D=1\pm\frac1{\sqrt2}.
\tag{4}
$$

The negative choice would put the source velocity heading $\pi/4$ ahead of the receiving velocity heading. It is incompatible with the strictly increasing heading on the whole interval from source to receiver. There is no hidden extra full turn: at a unit point the velocity has positive radial and tangential components, since $v=Jn$ and the chord lies strictly behind the current radial ray by an angle less than $\pi/2$. The velocity angle relative to its radial ray lies in $(0,\pi/2)$. Together with the acute position lag, the unwrapped source-to-receiver velocity-heading increment lies in $(-\pi/2,\pi)$, and strict increase makes it positive. The negative branch of (4) has no positive representative in that interval.

Therefore, wherever the current and first source events lie in $I$,

$$
D=1+\frac1{\sqrt2},\qquad
\lambda=\frac1D=2-\sqrt2,\qquad
R'=1-\lambda,
$$

and the velocity-heading increment from source to receiver is exactly $3\pi/4$.

Suppose now that $t,s(t),s(s(t))$ all lie in $I$. Source time increases on $I$ by (2). Hence the entire interval $[s(t),t]$ has its own source in $I$, so the preceding constant-$D$ and affine-$R$ identities hold throughout it. In particular

$$
R(s(t))=R(t)-(1-\lambda)(t-s(t))=\lambda R(t).
$$

Integrating the actual heading rate in (2) then gives

$$
\frac{3\pi}{4}
=\int_{s(t)}^t\frac{du}{D R(u)}
=\frac{\lambda}{1-\lambda}\log\frac1\lambda
=\sqrt2\log\left(1+\frac1{\sqrt2}\right)<1.
\tag{5}
$$

The last inequality is the elementary $\log(1+x)<x$ for $x>0$, whereas $3\pi/4>1$. This contradiction excludes a unit plateau containing two complete causal generations. No entire constant-speed tail was assumed.

## 2. A universal finite logarithmic window is enough

Every complete normalized limit retains

$$
s(u)\ge u/39.
\tag{6}
$$

If its speed were identically one on $[1,1600]$, choose an interior $u$ with $39^2<u<1600$. Then $s(u)>1$ and $s(s(u))>1$, while both are below $u$. Section 1 gives a contradiction. Therefore every such limiting curve has

$$
\min_{1\le u\le1600}|Q'(u)|<1.
\tag{7}
$$

Consider the set of all subsequential limits of normalized actual future arcs on this fixed interval as the receiving time tends to infinity. The accepted precompactness theorem makes this limit set compact in $C^2$. Every element extends to a complete limiting trajectory by diagonal extraction, so every element satisfies (7). The minimum-speed functional is continuous in $C^1$. Its maximum over this compact limit set is therefore a number $\beta_*<1$.

Equivalently, if no fixed $\beta<1$ worked eventually, one could choose later and later actual windows whose speeds stayed above $1-1/j$ throughout. A convergent subsequence would have speed exactly one on the entire interval, contradicting (5). Taking a slightly larger $\beta$ than $\beta_*$ proves (1) for the actual branch.

This compactness argument bounds how long a trajectory can stay uniformly close to unit speed. It does not bound the spacing of near-unit peaks, assert that such peaks occur, or imply $\sup_{t\ge t_0}|v(t)|<1$.

## 3. The visits occupy positive logarithmic-time intervals

The accepted linear radius floor and denominator margin give a uniform late bound

$$
\left|\frac{dv}{d\tau}\right|
=(t-s_0)|v'|
\le C_A,
\qquad \tau=\log(t-s_0),
\tag{8}
$$

for a finite branch-dependent $C_A$. The scalar speed has the same Lipschitz bound. Let $\epsilon=1-\beta>0$ from (1), put $L=\log1600$, and choose

$$
\delta=\frac{\epsilon}{4C_A}>0.
$$

Every sufficiently late logarithmic interval of length $L+2\delta$ contains a central subinterval of length $L$. Apply (1) at its left endpoint to find a point with speed at most $1-\epsilon$ inside that central interval. The full logarithmic interval of radius $\delta$ around this point lies inside the original block and has speed at most $1-3\epsilon/4$, hence at most $1-\epsilon/2$.

Thus every such block contains a subfield visit of length $2\delta$. In particular, the lower long-time fraction of logarithmic time spent at speed at most $1-\epsilon/2$ is at least

$$
\frac{2\delta}{L+2\delta}>0.
\tag{9}
$$

This is an analytical time-fraction bound with existential constants, not a measured duty cycle. It is compatible with the exact spiral, which stays uniformly below one, and with an unselected infinite branch having intermittent regular outward near-unit peaks.

## Interpretation, controls, and falsifiers

The accepted scalar-limit rigidity already excludes convergence of speed to one. The additional content here is finite-window control: the branch must repeatedly leave a fixed near-unit band within a factor 1600 in elapsed physical time, and the departures persist for positive logarithmic duration.

The unit-plateau algebra reduces to the accepted exact-unit-tail obstruction when the interval is a tail. Its new use keeps only two nested source events inside a finite interval. The ordinary admitted spiral is a control for the compactness and subfield-return conclusion, and no unit-plateau hypothesis applies to its subunit speed.

Falsifiers are an incorrect branch or unwrapped-heading choice in (4); failure of source-clock increase on a unit interval; use of the affine delay outside the double-sampled interval in (5); failure of the retained source ratio (6); lack of compactness on the full future window; or a speed minimum functional that is not continuous in the retained topology. None of these statements selects an actual infinite member or supplies a new boundary rule.

Only this new analytical subject is written. All previous subjects and independent references remain frozen, and no owned computation is active. Shared integration remains with the parent coordinator; independent assessment is required before acceptance.
