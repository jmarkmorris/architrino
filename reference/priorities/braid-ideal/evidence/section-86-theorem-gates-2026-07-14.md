# §86 Native-EOM Prerequisite-Gate Evidence — 2026-07-14

## Scope and disposition

This packet records a direct run against the current `src/eom` native coupled
history engine. It tests only the prerequisite physics cases for the §86
tilted-spindle rerun. It does not evolve the six-architrino spindle braid and
does not adjudicate §86 or §90.

Disposition: `priority-only`; `prerequisite_passed_direction_neutral`;
`section_86_direct_evolution_authorized_2026-07-14`; `no_score_increase`.

## Reproducible probe

Source:
[section-86-prerequisite-gates.cpp](../../../../scripts/eom/section-86-prerequisite-gates.cpp)

Build and run from the repository root:

```bash
cmake --build .tmp/eom-native-dev --target eom_native -j 4
c++ -std=c++20 -O2 -Isrc/eom/include \
  scripts/eom/section-86-prerequisite-gates.cpp \
  .tmp/eom-native-dev/libeom_native.a \
  /opt/homebrew/lib/libmpfr.dylib \
  /opt/homebrew/lib/libgmp.dylib \
  -pthread -o .tmp/section-86-prerequisite-gates
.tmp/section-86-prerequisite-gates
```

The probe links the current native library directly. It does not import or
rebuild the §86 linear pencil.

## Object and controls

### Sub-$c_f$ binary

- Worldlines: 2.
- Charges: $+|e|/6$ and $-|e|/6$; net charge $0$.
- Initial half-separation radius: $R=1$.
- Initial speed: $s=0.5c_f$.
- Angular frequency: $\omega=0.5$.
- Circular-arc prehistory: $[-4,0]$, 128 cubic-Hermite segments per path.
- Field speed: $c_f=1$.
- Coupling token: $32.4125179963575$. With per-site charge magnitude $1/6$,
  this fits the initial radial acceleration to the circular need
  $-\omega^2R=-0.25$.
- Evolution step: $\Delta T=0.01$; minimum step $0.0025$.
- Root tolerance: $10^{-5}$.
- Position/velocity tolerance: $10^{-6}$.
- Correction tolerance: $10^{-7}$.
- Evolution window: $T\in[0,2]$.
- Accepted steps: 200; rejected steps: 0; status: `completed`.

### Super-$c_f$ self-hit controls

- Curved worldline: one circular path, $R=1$, $s=2c_f$, $\omega=2$.
- Straight worldline: one inertial path at $s=2c_f$.
- Charge in each independent control: $+|e|/6$.
- Net charge in each independent control: $+|e|/6$.
- Prehistory: $[-4,0]$.
- Curved interpolation: 1,024 cubic-Hermite segments.
- Root tolerance: $10^{-7}$.
- Acceleration tolerance: $10^{-4}$.
- Field speed: $c_f=1$.
- Coupling token: $36$.

## Measured results

### Circular binary snapshot

Each receiver had one certified partner root and zero self-roots. For the
positive site at $(1,0,0)$ with velocity along $+y$:

$$
\mathbf a=(-0.2499946541,\ 0.1208179726,\ 0).
$$

The radial component matches the fitted circular need while the tangential
component is strictly positive. This is the local same-sheet theorem anchor.

### Binary direct evolution

At $T=0.5$:

| Step | Radius | Speed | Radial velocity | Tangential velocity |
| ---: | ---: | ---: | ---: | ---: |
| $0.01$ | $1.0024056561$ | $0.5600695859$ | $+0.0146234361$ | $0.5598786441$ |
| $0.005$ | $1.0024056427$ | $0.5600696647$ | $+0.0146233877$ | $0.5598787242$ |

The endpoint radius differs by $1.34\times10^{-8}$ and the endpoint speed by
$7.88\times10^{-8}$ under the 2× step refinement.

At $T=2$ with $\Delta T=0.01$:

$$
R(2)=1.1532465269,
\qquad
\|\mathbf v(2)\|=0.6886482862,
\qquad
v_r(2)=+0.2150273963.
$$

The native trajectory therefore leaves the held circle through anti-damped
outward motion. This agrees with the current Binary Dynamics claim boundary:
positive tangential work forbids the constant-speed circle but does not prove
inward tightening.

The initial period is $P=2\pi/\omega=4\pi\approx12.5664$, so this run covers
$T/P\approx0.159$. It establishes the converged local theorem anchor and the
direction of the departure. A longer binary run remains useful engine
coverage, but the theorem does not require inward motion or a completed radial
turn before the direction-neutral gate can pass.

### Super-$c_f$ self-hit

The curved control certified one self-root:

$$
T_{\rm em}\in[-1.8954942952,-1.8954942427],
\qquad
\delta_s=3.7909885379.
$$

At the bracket midpoint,

$$
\delta_s-2s\sin(\delta_s/2)=6.23\times10^{-9}.
$$

The reconstructed self-acceleration was finite:

$$
\mathbf a_{\rm self}=(0.2637834399,-0.0887925232,0).
$$

The straight super-$c_f$ control certified zero self-roots.

## Gate analysis

The curved/straight self-hit gate passes. The binary run confirms non-hold,
positive tangential work, and outward anti-damping over the completed window.
The original inward-direction reading was not a theorem prediction; the
current Binary Dynamics claim boundary explicitly leaves radial direction to
the evolved trajectory.

Operator adjudication on 2026-07-14 accepts this direction-neutral theorem
gate and authorizes the §86 six-body direct evolution. The required step,
memory-depth, sampling, and perturbation ladders now apply to the §86 verdict
itself. §86 and §90 remain quarantined until that direct-evolution evidence is
complete.
