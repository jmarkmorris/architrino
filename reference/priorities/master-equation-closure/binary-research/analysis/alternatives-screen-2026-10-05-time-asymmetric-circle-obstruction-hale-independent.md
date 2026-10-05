# Unequal past/future weights exclude nearby periodic binaries

**Derived local exclusion.** Fix any strictly subfield, positive-speed equal-past/future circle of the selected radial law, and fix its physical period or a positive integer multiple as the nominated period. There is one open neighborhood of its complete periodic profiles and nominated period in which no complete periodic full-Cartesian binary can solve the law at any fixed unequal past/future weighting. Mirror symmetry and planarity are not assumed for the perturbed profiles.

The selected convention is

$$
X_i''=(1-\alpha)A_i^-+\alpha A_i^+,
\tag{1}
$$

where $\alpha$ is the future weight, $A_i^-$ is the complete canonical past input, and $A_i^+$ is the complete future input. The equal-half case is $\alpha=1/2$. The coupling and propagation speed remain $K=c_f=1$, both labels use the same fixed $\alpha$, and the two polarities are opposite. This is sensitivity of an expressly selected comparison law; it is not a canonical-law selection or a stability claim.

This proof was independently reconstructed before reading any new coordinator unequal-weight reference. It uses a direct change of variable between complete ordinary source clocks. No action principle, energy conservation or primitive angular-momentum conservation is imported.

## 1. Complete periodic regular domain

Let $X_1,X_2:\mathbb R\to\mathbb R^3$ be $C^2$ and have a common labeled period $P>0$. Assume a positive instantaneous separation floor and a complete uniform speed margin

$$
|X_1(T)-X_2(T)|\ge r_0>0,\qquad
\sup_{i,T}|X_i'(T)|\le b<1.
$$

All histories, future as well as past, are supplied by these full periodic profiles. For a receiver at $t$, the past age equation for source label $j\ne i$ is

$$
\tau=|X_i(t)-X_j(t-\tau)|.
$$

Its left side minus right side increases by at least $(1-b)$ times every positive age increment, by the chord inequality. At zero it is negative and it tends to positive infinity because the profiles are bounded. Thus there is exactly one past partner root, and the same argument gives exactly one future partner root. This proof does not require differentiability of a zero chord away from the actual root.

The instantaneous separation floor and the source speed bound give each partner age at least $r_0/(1+b)>0$. At every root its chord is therefore nonzero, and its transmitter denominator is at least $1-b$. There is no nonzero-age self root, because $|X_i(t)-X_i(s)|\le b|t-s|<|t-s|$. Hence the two partner roots, one per direction for each receiver, are the complete ordinary-root census.

## 2. Exact reversal of a complete source event

Consider the past event with receiver $i$ at $t$ and source $j$ at $s=s_{ij}^-(t)<t$. Define

$$
r=X_i(t)-X_j(s),\quad \ell=|r|=t-s,\quad n=r/\ell,
\qquad
D_i=1-n\cdot V_i(t),\quad D_j=1-n\cdot V_j(s).
$$

Both denominators are at least $1-b$. Differentiating the root equation gives the exact source-clock derivative

$$
\frac{ds}{dt}=\frac{D_i}{D_j}>0.
\tag{2}
$$

At time $s$, receiver $j$ sees source $i$ at the future time $t$. This is its unique complete future root: the reversed chord is $-r$, and the future transmitter denominator is $1+(-n)\cdot V_i(t)=D_i$. The future source map is consequently the inverse of the past source map.

Periodicity and uniqueness imply $s(t+P)=s(t)+P$. Thus the map is a global increasing bijection of the real line and takes any interval of length $P$ to another interval of length $P$. All acceleration integrands below are periodic, so a shifted integration interval has the same period integral.

For the opposite-polarity pair, retain the signed radial coefficient $\sigma=-1$. The unweighted acceleration rows are

$$
A_{i\leftarrow j}^-(t)=\frac{\sigma n}{\ell^2D_j},
\qquad
A_{j\leftarrow i}^+(s)=\frac{-\sigma n}{\ell^2D_i}.
$$

Substituting (2) proves the pointwise paired identity

$$
X_i(t)\times A_{i\leftarrow j}^-(t)\,dt
+X_j(s)\times A_{j\leftarrow i}^+(s)\,ds
=\frac{\sigma [X_i(t)-X_j(s)]\times n}{\ell^2D_j}\,dt=0.
\tag{3}
$$

The source Jacobian is indispensable: the identity does not pair rows at the same coordinate time or discard their transmitter factors.

## 3. Necessary period-integrated condition

Define the two complete acceleration moments

$$
\mathcal M_\pm[X,P]
=\sum_{i=1}^2\int_0^P X_i(T)\times A_i^\pm(T)\,dT.
$$

Changing variables in (3), then summing the two ordered partner pairs, gives

$$
\mathcal M_+=-\mathcal M_-.
\tag{4}
$$

This is an identity of the complete evaluated input on any profile in the stated regular domain, before imposing its equation of motion.

For an actual periodic solution, elementary differentiation gives

$$
\sum_i\int_0^P X_i\times X_i''\,dT
=\sum_i[X_i\times X_i']_0^P=0.
$$

Insert (1) and (4):

$$
(1-2\alpha)\mathcal M_-[X,P]=0.
\tag{5}
$$

Thus every fixed $\alpha\ne1/2$ requires the vector condition $\mathcal M_-=0$. Equation (5) is derived from the acceleration law and closed periodic paths, not from an assumed conserved quantity. The analogous period-integrated acceleration condition can also be derived by the same event pairing, but it is the acceleration moment that gives the strict local obstruction below.

## 4. Nonzero moment at every positive-speed circle

For the selected balanced equal-half circle, write

$$
X_1(T)=R e_R(\omega T),\quad X_2=-X_1,\quad
\beta=R\omega\in(0,1),\quad
x=\beta\cos x,\quad c=\cos x,\quad D=1+\beta\sin x.
$$

The past source delay is $2x/\omega$, its chord length is $2Rc$, and its unit direction for receiver 1 is $e_R(\omega T-x)$. Therefore

$$
A_1^-(T)=-\frac{e_R(\omega T-x)}{4R^2c^2D}.
$$

Its tangential component is positive: $\sin x/(4R^2c^2D)$. Label 2 contributes the same axial acceleration moment. For any nominated circle period $P$ equal to a positive integer multiple of $2\pi/\omega$,

$$
\mathcal M_-[X_{\rm circ},P]
=\frac{P\sin x}{2Rc^2D}\,e_N\ne0,
\tag{6}
$$

where $e_N$ is the oriented unit normal to its rotation plane. Every factor in the scalar coefficient is positive. Reversing the orientation reverses the chosen normal and gives the same strict statement along the circle's own oriented normal.

## 5. Full-Cartesian and nearby-period openness

Use fixed phase $\theta\in[0,2\pi]$, profiles $Z_i(\theta)=X_i(P\theta/(2\pi))$, and period parameter $P$. Take a sufficiently small $C^1$ profile neighborhood and positive period neighborhood of the chosen circle profile. Instantaneous separation and physical speed retain uniform positive margins. The root proof in Section 1 therefore applies to every member, with no antipodality or planarity assumption.

In this chart the source phase-age equation is

$$
\delta_\varepsilon
=\frac{2\pi}{P}|Z_i(\theta)-Z_j(\theta+\varepsilon\delta_\varepsilon)|.
$$

Its complete root is continuous in $(Z_1,Z_2,P)$, uniformly in $\theta$, by the strict root slope or the implicit-function theorem on the regular chart. The source velocities, root directions, positive range denominators and acceleration rows then vary continuously in $C^0$. Hence the finite-period integral $\mathcal M_-$ is continuous in this $C^1$ profile/period topology.

Choose the neighborhood so that

$$
e_N\cdot\mathcal M_-[Z,P]
>\frac12\,e_N\cdot\mathcal M_-[X_{\rm circ},P_{\rm circ}]>0.
$$

This neighborhood is independent of $\alpha$, because $\mathcal M_-$ itself is the unweighted past input. Equation (5) now excludes every periodic solution there for every fixed $\alpha\ne1/2$, including arbitrarily small nonzero departures from equal weighting. In particular there is no sequence of unequal-weight periodic solutions converging in this topology, with their nominated periods, to the selected circle.

The result covers small nonmirror, nonplanar and center-displaced perturbations. It also applies to any equal-half noncircular branch segment that remains inside this neighborhood, although its derivation requires no nonlinear branch theorem.

## 6. Scope, provenance and falsifiers

The obstruction is local around each fixed positive-speed, strictly subfield circle and each fixed nominated integer multiple of its period. It supplies no uniform neighborhood as speed tends to zero or one, or as the period multiple grows. It does not exclude distant periodic profiles whose past acceleration moment vanishes. Relative-periodic histories with translational drift, nonperiodic histories, label-dependent or time-dependent weights, external sources, superfield roots, and nonregular weak continuations are outside the stated theorem.

Only the selected row law and circle geometry enter as inputs. The circle formula agrees with the frozen [small-speed/full-symbol source](alternatives-screen-2026-10-05-time-symmetric-planar-classification-independent.md), SHA-256 c6596505ad8b4acd6779205bf8beaf812c21f6bd59dd61388456abcbadaab00c; the root census and reciprocity needed here were derived directly above rather than inherited from a prior root proof. The canonical acceleration owner inspected in this investigation has SHA-256 8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f. Future weighting is the expressly selected comparison modification, not an assertion that the causal owner contains future input.

No numerical target was needed. Falsifiers are a missing complete root, failure of source-clock invertibility, a wrong past/future transmitter denominator or change-of-variable factor, a failure of the period-shift identity, zero value of (6) at a positive-speed circle, loss of continuity under the declared topology, or a nearby unequal-weight periodic solution satisfying the same complete law and margins. No frozen antecedent, coordinator reference or shared owner was modified.
