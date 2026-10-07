# Quantified admissible neighborhoods for N02 local orbital departure

**Grade: derived candidate, awaiting independent assessment.** Conditional on the already accepted exact N02 reference and local flow application, each sufficiently small prepared nonmirror history has a relatively open neighborhood of radius proportional to the square of its preparation amplitude whose members all undergo finite local orbital departure. Explicit formulas below give a logarithmic time upper bound and isolate the constants that still need numerical bounds. This is local departure under the unchanged canonical law, not a later-fate result or a new nonmirror spectral witness.

The [frozen method and source identities](authorized-cases-ten-hour-d-followup-n02-method.md) fix $K=c_f=1$, the exact retained circle, all eight directed ordinary hits, and the complete remote past. The [accepted Cartesian application](authorized-cases-ten-hour-reference-d-circle-adjudication.md) is the mathematical premise. No balance or spectrum is recomputed here.

## History space and the prepared curve

Use the rotating variables and delay horizon $H=1$ from that application. Let $\mathcal B=C^1([-1,0],\mathbb R^{12})$, with

$$
\|h\|_{\mathcal B}=\max\left\{\sup_{-1\le s\le0}|h(s)|,\ \sup_{-1\le s\le0}|h'(s)|\right\}.
\tag{1}
$$

The Euclidean norm includes both labels' positions and velocities. Let $\mathcal M$ be the local endpoint-compatible solution manifold. Its admissible physical subset $\mathcal P$ consists of histories satisfying $z'=w-\Omega Jz$ throughout, matching the exact remote reference in a fixed neighborhood of $s=-1$, and extended by that exact circle for all older times. Endpoint compatibility and physical kinematics are imposed on every member; an arbitrary ambient ball is not an admissible preparation.

Let $h_0$ be the exact rotating circle. The accepted construction gives a smooth preparation curve $h_\eta\in\mathcal P$, with its cutoff characteristic tangent, exact endpoint repair and common endpoint velocity

$$
\frac{w_{+,\eta}(0)+w_{-,\eta}(0)}2=\eta^2d_0,
\qquad d_0\ne0.
\tag{2}
$$

The repair leaves this velocity unchanged. The leading tangent is the previously certified mirror-sector mode, not a new nonmirror eigenvector. There are constants $C_{\rm prep},\eta_{\rm prep}>0$ such that $\|h_\eta-h_0\|_{\mathcal B}\le C_{\rm prep}|\eta|$ for $|\eta|\le\eta_{\rm prep}$.

Choose

$$
c=\min\{1,|d_0|/4\},\qquad
\mathcal U_\eta=\{h\in\mathcal P:\ \|h-h_\eta\|_{\mathcal B}<c\eta^2\}.
\tag{3}
$$

This is a nonempty relatively open set in the admissible physical class. The norm of the common endpoint-velocity functional is at most one in (1), so every member obeys

$$
\left|\frac{w_+(0)+w_-(0)}2\right|
\ge\frac34|d_0|\eta^2>0.
\tag{4}
$$

Thus every member is outside mirror symmetry about any fixed spatial center. No uniform boost is treated as a symmetry. Equation (4) is an initial-history assertion, not a claim that the asymmetry persists forever.

## A quantitative cone lemma

Take a fixed time step $\tau>1$. In a solution-manifold chart $\chi$ centered at $h_0$, write the time map as

$$
F(z)=Lz+R(z),\qquad L=D F(0).
\tag{5}
$$

The accepted compact linear time map admits an outer spectral splitting $E=E_u\oplus E_c$ containing the certified growing mode and every multiplier beyond a chosen modulus cut. Equivalent norms can be chosen so that, for some $a>1$ and $0\le b<a$,

$$
|L_u u|\ge a|u|,\qquad |L_c v|\le b|v|,
\qquad |(u,v)|_*=\max\{|u|,|v|\}.
\tag{6}
$$

All constants below refer to this particular chart and adapted norm. The complement may contain other growing multipliers below the cut; it is not asserted stable. The existing positive root supplies existence of a cut, not numerical values of its projection or norm constants.

Set

$$
\delta=\frac14\min\{a-1,a-b\},\qquad q=a-\delta>1.
\tag{7}
$$

Choose $r>0$ such that $|R(z)|_*\le\delta|z|_*$ on $|z|_*\le r$. Differentiability supplies some such radius. On the cone $|v|\le|u|$,

$$
|u_{\rm next}|\ge q|u|,\qquad
|v_{\rm next}|\le(b+\delta)|u|<q|u|.
\tag{8}
$$

Thus the cone is invariant while iterates remain in the radius-$r$ chart, and its outer component grows by at least $q$. The strict comparison follows from $2\delta<a-b$.

The known analytical control is $R=0$ with diagonal blocks of moduli $a$ and $b$. Its unstable amplitude is exactly $a^n|u_0|$, and direct logarithms give its first-exit count. Equations (7)–(8) are its explicit remainder-tolerant extension. This control concerns a mathematical time map, not an alternative physical model or a numerical N02 target.

## Uniform first-step entry for the whole neighborhood

Define $\Psi(h)=\chi(\Phi_\tau(h))$. The accepted first-step argument removes the old cutoff part of the characteristic tangent, giving

$$
\Psi(h_\eta)=\eta v_*+r_1(\eta),\qquad
v_*\in E_u,\qquad m:=|v_*|_*>0,
\qquad |r_1(\eta)|_*\le\omega_1(|\eta|)|\eta|,
\tag{9}
$$

where $\omega_1(s)\to0$. Only this $o(\eta)$ flow remainder is used. The smooth quadratic preparation and endpoint repair do not imply a quadratic remainder for the general $C^1$ flow.

Choose a physical initial radius $r_{\rm init}>0$ and a local Lipschitz bound $L_1$ for $\Psi$ on the corresponding solution-manifold neighborhood, measured from the ambient norm (1) to the adapted chart norm. Such bounds exist by the local $C^1$ chart and time-map regularity; they are unevaluated quantitative inputs. For $h\in\mathcal U_\eta$ within this neighborhood,

$$
|\Psi(h)-\Psi(h_\eta)|_*\le L_1c\eta^2.
\tag{10}
$$

Take $\eta_1>0$ such that $\omega_1(s)\le m/8$ for $0<s\le\eta_1$, and impose

$$
0<|\eta|\le\eta_0,\qquad
\eta_0\le\min\left\{1,\eta_{\rm prep},\eta_1,
\frac{m}{8L_1c},\frac r{4m},\frac{r_{\rm init}}{C_{\rm prep}+c}\right\}.
\tag{11}
$$

Then (9)–(10) give

$$
|P_u\Psi(h)|\ge\frac34m|\eta|,
\qquad |P_c\Psi(h)|\le\frac14m|\eta|,
\qquad |\Psi(h)|_*\le\frac54m|\eta|<r.
\tag{12}
$$

Every member enters the same strict cone after the first time step. The fixed complete older source remains part of each history throughout this argument.

## Root chart and orbital-distance constants

The smallness conditions on $r$ and $\eta_0$ must also enforce the following finite-time and orbit bounds. These are explicit quantitative obligations, not assumptions hidden in the word small.

Let $\rho_{\rm root}>0$ be a physical $C^1$ radius on which the full accepted ordinary-root chart persists, including its near-zero exclusion, compact root-free complement, signed geometric-clock and field-velocity denominators, and complete remote exclusion. Let $\Theta_\tau(s)$ bound the largest physical-history deviation over $0\le t\le\tau$ from a chart initial state $|z|_*\le s$. Let $\Theta^0_\tau(s)$ be the corresponding bound for an admissible initial history with physical norm deviation at most $s$. Both tend to zero with $s$ by local flow continuity, uniformly over this finite time interval. Require

$$
\Theta_\tau(r)<\rho_{\rm root},\qquad
\Theta^0_\tau((C_{\rm prep}+c)\eta_0)<\rho_{\rm root}.
\tag{13}
$$

No Lipschitz-in-time or uniform operator-norm differentiability premise is substituted for these finite-time moduli. A proved linear bound on either modulus would be sufficient, but is not needed for the qualitative existence statement.

Put $A=\max\{2,\|L\|_*+\delta\}$. A first discrete exit from radius $r$ lies at norm between $r$ and $Ar$. Require the chart and its inverse to be valid on the radius-$2Ar$ neighborhood. Let $C_\chi$ bound the Lipschitz norm of $\chi$ measured against physical history distance, and $C_{\rm inv}$ bound the inverse chart. The nearby rigid translations and rotations form a local orbit $\Sigma$ whose tangent has zero outer projection. Choose its local radius so that

$$
|P_u\sigma|\le\frac18|\sigma|_*,\qquad \sigma\in\chi(\Sigma),\quad |\sigma|_*\le2Ar.
\tag{14}
$$

The accepted tangent statement and differentiability suffice for (14); a quadratic orbit remainder is not needed. Let $\rho_{\rm orb}>0$ separate $h_0$ from orbit representatives outside that local orbit chart, and require

$$
C_{\rm inv}Ar<\rho_{\rm orb}/2.
\tag{15}
$$

The finite-dimensional rigid orbit and its local embedding provide some such constants, as in the accepted orbital argument. They have not been numerically evaluated.

For an exit point $z$ in the cone, $|P_uz|=|z|_*\ge r$. If a local orbit point had $|z-\sigma|_*<|z|_*/4$, then $|\sigma|_*<5|z|_*/4<2Ar$, while (14) would give $|P_u(z-\sigma)|>27|z|_*/32$, a contradiction. Hence local chart-orbit distance is at least $r/4$. The chart Lipschitz bound converts this to physical distance; farther orbit representatives are controlled by (15). Therefore the fixed orbital departure size can be taken as

$$
\Delta_{\rm orb}=\min\left\{\frac r{4C_\chi},\frac{\rho_{\rm orb}}2\right\}>0.
\tag{16}
$$

## Departure-time bound and scope

Start the cone iteration at $z_0=\Psi(h)$. Its outer component is at least $m|\eta|/2$ by (12). If it remained below $r$ through $n$ further steps, (8) would give $|P_uz_n|\ge q^nm|\eta|/2$. Consequently a first discrete exit occurs by

$$
n_\eta=\left\lceil\frac{\log(2r/(m|\eta|))}{\log q}\right\rceil,
\qquad
T_{\rm dep}(h)\le\tau(1+n_\eta),\qquad h\in\mathcal U_\eta.
\tag{17}
$$

The parameter restriction (11) makes the logarithm positive. Conditions (13) keep every intervening continuous segment in the complete root chart, including the final step. At the discrete exit, (16) gives distance at least $\Delta_{\rm orb}$ from the entire rigid orbit. Thus some orbital departure occurs no later than (17), with every ordinary branch retained until that event.

This supplies a family of relatively open departing nonmirror preparations, not merely a single parameter curve. The history-ball radius is explicitly $c\eta^2$, the departure size is fixed independently of $\eta$, and the upper time bound is logarithmic. The scale $\eta^2$ protects the constructed nonmirror component; it is not claimed optimal. No conclusion is made about every nonmirror perturbation, an additional transverse eigenvalue, persistence of asymmetry, an attracting state or later fate.

## What prevents numerical applicability now

The retained certificates fix the exact reference and its accepted positive witnesses. They do not supply numerical values for all of the following: the complete root-chart radius $\rho_{\rm root}$; a time-map spectral cut with projection and adapted-norm constants $a,b,\|L\|_*$; a usable remainder radius for (7)–(8); the first-step constants $m,L_1,r_{\rm init},\eta_1,C_{\rm prep}$; the two finite-time moduli in (13); and the orbit/chart constants in (14)–(16). These precise inequalities are the remaining quantitative flow-bound obligation. Substituting the printed circle speed or one growing eigenvalue for them would not certify a numerical history radius or departure time.

All constants exist under the accepted local application, so the parameterized neighborhood theorem is stronger than a bare unstable-root restatement. Its formulas are not a numerical N02 certificate until the listed bounds are supplied for the exact retained reference. Falsifiers are a failed cone inequality, a loss of the common endpoint-velocity margin, an unjustified first-step regularity upgrade, a missing ordinary root during an intervening step, or an orbital representative contradicting (14)–(16). No target computation was run.
