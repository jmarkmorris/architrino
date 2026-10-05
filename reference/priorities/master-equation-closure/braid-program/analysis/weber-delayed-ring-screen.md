# Delayed Weber alternating-square first analytical screen

## Frozen specification

Frozen before subject target calculation at 2026-10-05T19:28:45.124Z. The [Section 9a specification](../../equation-variants/manuscript.md#9a-selected-delayed-weber-adaptation) is the sole selected law. No instantaneous invariant, denominator, coefficient fit, boundary response or root exclusion is used. Full histories are rigid circles for all absolute time; every ordinary positive-delay self root is included. This is a comparison screen, not adoption or evolved evidence.


## Subject known controls, recorded before target

The separately authored Cartesian subject passed nine named controls with node reference/priorities/master-equation-closure/braid-program/evidence/weber-delayed-subject-screen.mjs --known at 2026-10-05T19:30Z, before --target: stationary separated acceleration 1/4, transverse affine causal-range second derivative 0.09 by a direct quadratic root, a complete subfield three-partner/no-self census, and zero first/second range derivatives on all three rigid subfield circle branches. The [receipt](../evidence/weber-delayed-subject-known.json) records actual arithmetic and tolerances. Stationary and affine controls evaluate prescribed paths and do not assert held sources evolve under the comparison.


## Exact circular geometry and complete root support

Four equal members have polarities $(+,-,+,-)$ and complete circular histories $\mathbf X_j(T)=\rho(\cos(\Omega T+j\pi/2),\sin(\Omega T+j\pi/2),0)$ for all $T$. Define the dimensionless member speed $\beta=\Omega\rho$ and reception-to-emission phase $d=\Omega(T-S)>0$. With $\phi_j=j\pi/2$, every root solves

$$
d=2\beta\left|\sin\frac{\phi_j-d}{2}\right|,\qquad 0<d\le2\beta.
$$

The upper bound follows from the maximum chord $2\rho$; it turns the all-past census into a finite interval. Partition that interval at chord zeros and all derivative zeros of the chord-minus-phase function. On every remaining interval the function is strictly monotone, so a sign change gives exactly one root; inspect endpoints once, excluding $d=0$. The subject independently implements this trigonometric partition, while the reference interval verifier encloses the full branch ledger over the certified speed box. No root is dropped when $D_t$ is negative.

At reception $T=0$ for member zero, set $\alpha=\phi_j-d$, $u=d/\beta=\mathscr R/\rho$. The hit direction and weight are

$$
\mathbf n=\frac{(1-\cos\alpha,-\sin\alpha,0)}u,\qquad D_t=1+\frac{\beta\sin\alpha}u.
$$

Every root lag remains constant under rigid rotation. Its scalar range is therefore constant, so $\dot{\mathscr R}=\ddot{\mathscr R}=0$, including all ordinary self hits. The bracket is exactly one on the prescribed whole circle. This is a derived identity, independently confirmed; it does not say the first variation of the bracket vanishes.

## Exact balance conditions and existence

Define the complete receiver acceleration coefficients

$$
C_r(\beta)=\sum_{j,d}\frac{(-1)^j}{2u|D_t|},\qquad
C_t(\beta)=-\sum_{j,d}\frac{(-1)^j\sin\alpha}{u^3|D_t|}.
$$

Then $\mathbf A_{\rm received}=\rho^{-2}(C_r\mathbf e_r+C_t\mathbf e_t)$, whereas required circular acceleration is $-\beta^2\mathbf e_r/\rho$. Exact balance requires

$$
C_t(\beta)=0,\quad C_r(\beta)<0,\quad \rho=-C_r(\beta)/\beta^2,\quad \Omega=\beta/\rho.
$$

These equations give $\Omega(\rho)$ implicitly at the isolated admitted circular references; the fixed coupling does not imply a free continuous radius family. The bracket-one identity makes this balance identical to the canonical complete-root circle balance, but the selected dynamics and spectrum remain different. No canonical circle or instantaneous denominator was used as a substitute for this calculation.

The independently frozen [reference](weber-delayed-ring-independent-reference.md) and its [interval certificate](../evidence/weber-delayed-reference-interval-target.json) prove at least one ordinary balanced circle in the following enclosure. The tangential coefficient has strictly opposite endpoint signs throughout the same complete-root topology, the radial coefficient is strictly inward, and the present matrix determinant excludes zero:

| Quantity | Certified interval or exact census | Meaning |
| --- | --- | --- |
| $\beta$ | $[2.14724560,2.14724572]$ | Tangential zero exists by continuity and endpoint signs; uniqueness in the box is not claimed |
| $C_r$ | $[-1.91891355315,-1.91884456092]$ | Strict inward balance |
| $\rho$ | $[0.416175302550,0.416190312686]$ | Positive radius with exact radial balance |
| Hits per receiver by source $j=0,1,2,3$ | $(1,3,1,1)$ | One self and five partner roots; 24 directed hits total |
| $D_t$ | All six interval boxes exclude zero, one is negative | Ordinary roots, absolute transmitter weight retained |
| $\det M_i$ | $[-21.07726505,-21.05725141]$ | Present solve invertible; axial eigenvalue is exactly one |

To select exactly one balanced reference without assuming uniqueness, define $\beta_*:=\min\{\beta\in[2.14724560,2.14724572]:C_t(\beta)=0\}$, $\rho_*=-C_r(\beta_*)/\beta_*^2$ and $\Omega_*=\beta_*/\rho_*$. The zero set is nonempty, closed and compact on this ordinary chart, so this exact selector exists. The pairing screen refers to this radius.

Grade: computer-assisted derived existence and root census, independently checked against a separately authored Cartesian residual. The interval certificate is conditional on the verifier's explicitly stated adjacent-float arithmetic and Taylor remainder bounds. It is not a complete global search. The member speed exceeds $c_f=1$; both ceiling labels exclude this history. No subfield balance or subfield exclusion is inferred. Falsifier: a missing root in the compact monotone partition, a root box with $D_t=0$, a failed tangential sign enclosure or a singular present matrix inside the certified box.

## Pairing-sector first variation at the certified reference

A local-frame pairing perturbation alternates sign between neighbouring members. Write

$$
\delta\mathbf X_j(T)=(-1)^j e^{zT}Q(\Omega T+\phi_j)U,
$$

where $Q$ is the plane rotation, $U\in\mathbb R^2$ contains radial and tangential shape amplitudes, and $z$ is the absolute-time exponent. Differentiate this whole history twice to obtain its velocity and acceleration perturbations. The causal emission time also moves. If $\tau$ is a base lag and $W=I-(-1)^j e^{-z\tau}Q(\alpha)$, arrival differentiation yields the range variation row $L=\mathbf n^{\mathsf T}W/D_t$, so $\delta\mathscr R=e^{zT}LU$ in the receiver frame. Crucially, $\delta\ddot{\mathscr R}=z^2\delta\mathscr R$ because the base scalar range is constant. Hence the new bracket contributes $Rz^2\mathbf nL$ per hit to the first variation. This term retains delayed transmitter acceleration as well as present receiver acceleration and has no instantaneous scalar denominator.

The subject evaluates the full nonlinear residual on the trial histories at $\pm\epsilon$ and differences it in two independent basis directions, re-solving every ordinary causal root on each displaced history. Step values $10^{-5},3\times10^{-6},10^{-6},3\times10^{-7}$ test numerical differentiation. This floating Cartesian check is independent of the reference's analytically assembled characteristic matrix and separate outward-interval determinant verifier. The reference freezes the complete first-variation formula before subject comparison; no reference formula is changed to match the subject.

The interval reference proves determinant sign changes on $z\in[1.02,1.04]$ and $[3.60,3.70]$ uniformly over its balanced-reference enclosure. Therefore at least two positive real characteristic roots exist in the pairing sector. The independently authored Cartesian subject returns $z\approx1.027567104$ and $3.653686693$, within those boxes, with step-refined first-variation matrices. Grade: computer-assisted derived formal linear instability at at least one certified balanced superfield circle, with an independent measured first-variation check. Root simplicity, total root count, all other sectors and nonlinear delayed-equation fate remain open. Falsifier: a direct independently checked first variation including root-time shifts and delayed acceleration that has no positive determinant zero in either box, or a failed outward interval sign certificate.

## Measured subject values and screen verdict

The subject command was node reference/priorities/master-equation-closure/braid-program/evidence/weber-delayed-subject-screen.mjs --target after its recorded known pass. Its [target receipt](../evidence/weber-delayed-subject-target.json) gives $\beta=2.1472456589006272$, $\rho=0.4161828083093128$, $\Omega=5.1593809643976565$, $\det M_i=-21.067257355161043$ and balance residual components below $4\times10^{-14}$. Those decimals are floating measurements, not tighter interval certificates. The [subject instrument](../evidence/weber-delayed-subject-screen.mjs) imports neither reference implementation nor reference output.

The first screen finds balance and a growing pairing sector for this selected delayed adaptation. Delay therefore has not stabilized the pairing sector at this certified reference. It does not settle the sign at every balanced radius or below unit speed. This is a bounded negative stability result, not a general NO GO for delayed Weber dynamics, and no evolved history, conserved account or canon adoption follows. Only the requested analytical screen was run.


### Specification typesetting correction

The final byte check found a text-insertion defect: JavaScript replacement collapsed display delimiters and the freeze text mistyped two squared-range exponents. The source now renders the explicitly selected squared ranges and intact display delimiters. The original freeze receipt is preserved, and [the typography correction receipt](../evidence/weber-delayed-specification-typography-correction.json) records the repaired source bytes. The selected law, coefficients, range derivative meaning and all instrument arithmetic are unchanged.
