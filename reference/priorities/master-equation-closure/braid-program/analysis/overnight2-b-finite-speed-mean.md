# Direct finite-speed tangential-mean enclosure

## Proposed certificate

This experiment targets the unchanged canonical six-member history family in the [independently admitted chart](overnight2-b-independent-chart.md). Use
$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad p=c\cos2\phi+d\sin2\phi,\quad
\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi,\quad
\phi=\kappa t/R,
$$
and common angle $\beta t/R+p(\phi)$. Let each of $a,b,c,d,e,f$ range independently in $[-1/1000,1/1000]$, $H\in[299/1000,301/1000]$, $\beta\in[249/1000,251/1000]$, and $\kappa\in[149/1000,151/1000]$. Every scale $R>0$ is included. This entire box lies inside the already proved complete chart: five partner roots, no positive self roots, delays in $(0.488,2.789)$ and divisors above $0.199$ for all phases and the entire past.

The target is a rigorous positive enclosure of the exact mean $\langle\rho A_t\rangle$ on this whole coefficient box. A positive lower endpoint would exclude full-vector balance because the geometric period identity requires this mean to vanish. This is a finite-speed question; no Taylor remainder in speed is used. Until the instrument has run and its proof/implementation has received separate review, no exclusion is asserted.

## Inclusion algorithm

Partition the exact reception phase interval $[0,2\pi]$ into $N$ equal cells and evaluate all profile variables using outward interval arithmetic. Every cell also contains the entire coefficient box. For every partner start its delay interval at the independently proved global bounds. At a midpoint $m$ of a current interval $I$, the causal gap is $g(\delta)=|Q(\delta)|-\delta$, with derivative $-D$. Every actual root obeys
$$
\delta_*\in m+\frac{g(m)}{D(I)}.
$$
Intersect this enclosure with $I$ repeatedly. The divisor interval may also be intersected with the analytically global interval $[0.199,1.801]$, since the all-time speed is below $0.801$. If interval separation contains zero away from a root, the global monotonic-slope bounds alone remain valid for root enclosure; they follow from the source Lipschitz estimate even across nondifferentiable zero separation. A failed contraction is unresolved, not exclusion of a root. The complete chart has already supplied existence and uniqueness for every phase and parameter point.

After refinement evaluate $Q,V_s$ over the root interval and use $D=1-Q\cdot V_s/\delta$ at a root, where $|Q|=\delta$ exactly. Bound each canonical tangential row $\sigma Q_y/(\delta^3D)$, sum all five, multiply by the receiver radius and retain a cell interval. The arithmetic may lose correlations, but every lost correlation enlarges the enclosure. Since all exact phase cells have equal width, the arithmetic mean of these cell intervals encloses the exact phase integral divided by $2\pi$. Interval enclosures for $\pi$ cover the endpoints of every exact cell; tiny outward endpoint overlaps do not invalidate the pointwise bounds or equal exact-cell weights.

All arithmetic uses the shared venv's mpmath interval context at 40 decimal digits. Report exact binary-rational endpoints of the final arithmetic intervals, not rounded display decimals as certificate bounds. Preserve every cell result and unresolved diagnostic. An independent review must check the arithmetic operations, inclusion argument, complete-root use and averaging before the output can establish a continuous exclusion.

## Known controls and resource declaration

Before any parameter target, test interval enclosure of known square roots and trigonometric values, exact linear-root Newton inclusion, static unit-hexagon delays and canonical vector $(-5/4+1/\sqrt3,0,0)$. The static expected vector is a closed form independent of the interval evaluator. Record the pass before a small eight-cell pilot. The target uses 256 phase cells, five partner channels each, at most 30 interval refinements per channel, one numerical thread, 512 MiB resident memory, 8 MiB output, a 900-second internal deadline and 960-second supervisor deadline. The pilot measures cost before target launch. A nonpositive lower endpoint means that this enclosure method has not decided the box, not that a balanced member exists.

This is a new subject, with no edits to the earlier floating evaluator or independent proof. The receiving owner is the second-allocation report. Falsifiers include an uncontained arithmetic operation, an interval Newton step that can discard an allowed root, an incorrect transmitter divisor, an omitted channel, or a phase/parameter member whose exact mean lies outside the retained enclosure. A completed independent certificate would cover only this explicit box and every $R>0$; it would not rule out other finite-speed waveforms.


### Known-first record

The shared-venv interval instrument passed its known stage before the pilot. It enclosed the exact static partner roots, unit linear root, canonical static vector and elementary square-root/trigonometric values; each static root interval had width below $10^{-35}$. Receipt `finite-speed-mean/known.json` has SHA-256 `6b2cae72a44e653f3b7635d6a7fde4d563d51f6549e89477adcf6e55213fe464`, with 0.01122 internal seconds. The command exited zero. This is a recorded known-case verification, not target acceptance.

The eight-cell pilot completed in 0.231168 internal seconds, 0.298 supervised seconds, with 26,820,608 bytes peak resident memory. Supervisor run `50acf5a9-7f45-4b53-9a7d-112a20340770` closed with exit zero and zero stderr. All cells completed, but the coarse mean enclosure straddled zero, so the pilot made no exclusion claim. It supports the predeclared 256-cell resource allocation. The subject instrument is frozen at SHA-256 `7acbd19f11b324ddf700db796ddb62f6409de466c340b0baac5c5488553c8f23`.
