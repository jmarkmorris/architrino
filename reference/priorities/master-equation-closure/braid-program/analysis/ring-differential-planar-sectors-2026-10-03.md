# Differential planar sectors of the exact T02 and T04 rings

## Result and boundary

Every planar spatial Fourier sector of T02 and T04 has a certified growing formal characteristic mode. The common sector has its already certified two positive real witnesses. A new sector instrument certifies thirteen additional roots across sectors $k=1,2,3$ at T02 and fourteen at T04. Conjugate-sector symmetry supplies the partners in $k=5,4$. Counting within independent sector blocks gives lower bounds of 23 growing planar characteristic roots at T02 and 25 at T04, with multiplicity across the blocks. These are lower bounds, not complete counts. Weak oscillatory growth exists in addition to the very fast common-radius mode.

Claim grade: computer-assisted derived existence, uniqueness and simplicity inside each certified complex rectangle, conditional on the frozen exact balance and row derivative; the displayed centers are measured by [the new comparison instrument](../../../../../scripts/braid-program/ring_differential_planar_sectors_20261003.py). A separately constructed Cartesian adjudication remains required before this instrument is called independently checked. Falsifier: an invalid reference census, missing row, failed spatial phase convention, failed interval derivative or Krawczyk inclusion, overlapping allegedly distinct rectangles, or a nonpositive real-part box overturns the corresponding witness or count. No nonlinear fate, complete spectrum or absence of further modes is asserted.

## Geometry and retained equation

Six alternating members follow $X_j(T)=Q(\Omega T+\alpha_j)Re_1$ with $\alpha_j=j\pi/3$, $q_j=(-1)^j$, $\beta=\Omega R$, and $K=c_f=1$ in all numbers. Every ordinary positive-delay self root is included. The equation is the unchanged Master Equation: no response factor, cap, excluded root or event law is introduced.

The exact T02 and T04 references use the frozen speed brackets and complete lattice census reconstructed by the [common-sector analysis](ring-family-symmetric-stability-2026-10-03.md). Their counts are 48 and 72 ordered hits. Before any spectral target, the new instrument recomputes outward-rounded $C_t$ endpoint signs, $C_t'>0$, $C_r<0$, topology inequalities, root endpoint brackets and nonzero signed $D$. Defining $R=-C_r/\beta^2$ at the enclosed exact zero supplies radial balance; circular covariance perpetuates the full equation at every phase. New reference receipts preserve this full uncertainty and every positive-delay self hit. Linearization is about exact solutions, not about geometries carrying a nonzero residual.

## Spatial patterns and characteristic matrices

A spatial Fourier sector assigns a rotating-frame displacement $u(T)$ a phase around the six members:

$$
\delta X_j(T)=Q(\Omega T+\alpha_j)e^{ik\alpha_j}u(T),\qquad k\in\{0,1,2,3,4,5\}.
$$

Complex notation diagonalizes the cyclic spatial symmetry; combining a mode with its conjugate gives real physical positions. Sector zero is the common radius and phase perturbation. Sectors two and four contain the differential-radius and phase-shear patterns preserving the three antipodal partners. Sectors one and five include rigid Cartesian translation as a neutral direction, together with nonrigid planar patterns. Sector three alternates rotating-frame perturbation sign between adjacent members and displaces antipodal-pair midpoints; it need not preserve a common center.

For a root at lattice level $m$, its source is $j=m\bmod6$. The source perturbation gains $e^{ikm\pi/3}$ while the receiver-position tensor remains unchanged. With frozen separation and source-velocity tensors $C,F,H$ and positive delay $\ell$, the sector matrix is

$$
A_k(z)=z^2I+2\Omega zJ-\Omega^2I-\sum_m\left[C_m+e^{ikm\pi/3-z\ell_m}(F_m+zH_m)\right].
$$

The receiver term has no spatial phase because its perturbation is evaluated at the receiver. The delayed term has its source's spatial phase and temporal delay. Multiplying the entire row by the spatial phase would incorrectly phase the present receiver term and fail the Cartesian-translation control. For $k=3$, the phase is exactly $(-1)^m$, so the matrix has real coefficients at real $z$. The paired sectors obey

$$
A_{6-k}(\overline z)=\overline{A_k(z)}.
$$

Every root in sector one has its conjugate in sector five; every root in sector two has its conjugate in sector four. The invertible Fourier transformation exhausts the planar first variation's sectors. Exhausting sectors does not exhaust roots within each sector.

Claim grade: derived cyclic decomposition on the exact alternating ring and persistent simple-root chart. Falsifier: a source index inconsistent with $m\bmod6$, missing receiver term, phase applied to the wrong tensor, or failure of the Fourier inverse or conjugacy invalidates the decomposition.

## Known controls before targets

The new instrument freezes and imports the new common-sector tensor construction. This is code reuse and supplies no independent check by itself. Independent analytical controls precede every target:

- The static source at distance two has derivative $\operatorname{diag}(-2,1)/8$, returned exactly.
- Complex Krawczyk inclusion accepts the known simple root $2+3i$ of $f(z)=z-(2+3i)$ with zero contraction norm.
- The same routine accepts the known simple root $i$ of $f(z)=z^2+1$, including a varying interval derivative.
- Rigid Cartesian translation has sector-one null vector $(1,i)^{\mathsf T}$ at $z=i\Omega$, and sector-five null vector $(1,-i)^{\mathsf T}$ at $z=-i\Omega$. Both identities pass at T02 and T04 before targets.
- The common phase shift obeys $A_0(0)e_2=0$ at both references. Zero-sector matrix parity with the frozen common matrix is reproduction, not independence.
- Conjugate-sector symmetry and the analytically differentiated determinant pass on the accepted T02 control.

The highest analytical-identity discrepancy is below $1.1\times10^{-97}$. Successful `known.json` and `controls.json` receipts must match the current script identity before a target can run. Preliminary known controls exposed two serialization/coercion defects before any target: an exact interval zero was coerced into a point scalar, and an interval-real compatibility property was misclassified as complex. Both were repaired in the new instrument and all controls rerun; neither failed attempt produced a target finding.

## Complex inclusion and its scope

Double-precision solves propose locations only. Each proposal is refined at 100 decimal digits; proof uses 85-decimal outward-rounded intervals including the entire reference uncertainty. For $f(z)=\det A_k(z)$ on a real/imaginary rectangle $X$, the real Jacobian is

$$
J_f(X)=\begin{pmatrix}\Re f'(X)&-\Im f'(X)\\\Im f'(X)&\Re f'(X)\end{pmatrix}.
$$

A fixed real preconditioner $Y$ approximates the inverse at center $c$. The enclosure is

$$
\mathcal K(X)=c-Yf(c)+(I-YJ_f(X))(X-c).
$$

Each successful witness has $\mathcal K(X)$ strictly inside $X$, induced infinity norm $\|I-YJ_f(X)\|_\infty<1$, and a strictly positive real-coordinate interval. Therefore $x\mapsto x-Yf(x)$ maps the rectangle into itself and is a contraction. Its unique fixed point is the unique zero because $Y$ is invertible. The contraction also makes the Jacobian nonsingular, so the root is simple. This is inclusion, not a winding count over the remaining right half-plane.

Rectangle half-width is $10^{-12}\max(1,|c|)$. The largest contraction norm is below $2.6\times10^{-9}$. Exact binary bounds are retained in receipts. The three real roots in each $k=3$ sector also have opposite outward-rounded real determinant endpoint signs, establishing that the root in their complex rectangle is real. The nonzero-imaginary pair is separately isolated.

Common coefficient-norm confinement applies to every sector because $|e^{ikm\pi/3}|=1$. All right-half-plane roots remain inside radius 43 at T02 and radius 263 at T04. Proposals do not cover those disks; no complete count follows from successful solves or empty proposal regions.

## Certified centers

The centers below are measured diagnostic displays. Containing rectangles, strict Krawczyk images, derivative enclosures and fixed preconditioners live under `.local-data/ring-exploration/differential-planar/`.

| Cell | Sector | Real part | Imaginary part |
| --- | ---: | ---: | ---: |
| T02 | 1 | 0.166995011654169 | -1.70794386600573 |
| T02 | 1 | 1.48763763023359 | -0.38305573772077 |
| T02 | 1 | 10.6581318039553 | 0.000452530858641104 |
| T02 | 2 | 0.0122055704397392 | 2.67846183133051 |
| T02 | 2 | 0.0134668427169489 | -4.22529421707982 |
| T02 | 2 | 0.605735351423201 | -0.893026149776306 |
| T02 | 2 | 1.77145237699919 | -0.243140809431786 |
| T02 | 2 | 10.6576403593254 | 0.000397369780375295 |
| T02 | 3 | 0.00182619033365777 | -3.44838929310159 |
| T02 | 3 | 0.00182619033365777 | 3.44838929310159 |
| T02 | 3 | 0.798428301631355 | 0 (real endpoint signs certified) |
| T02 | 3 | 1.85634834969101 | 0 (real endpoint signs certified) |
| T02 | 3 | 10.6574435465823 | 0 (real endpoint signs certified) |
| T04 | 1 | 0.322221653350794 | -6.07474819781734 |
| T04 | 1 | 0.860581590294138 | -0.828152998747782 |
| T04 | 1 | 2.59728187662326 | -1.29043974667091 |
| T04 | 1 | 89.6449208704495 | 3.0053979325175e-7 |
| T04 | 2 | 0.137017565325042 | -8.57796785622957 |
| T04 | 2 | 0.616760518884591 | 2.45233551839152 |
| T04 | 2 | 0.850573437059386 | -2.90939854711859 |
| T04 | 2 | 4.28787026138932 | -1.28375143476141 |
| T04 | 2 | 89.6449205234161 | 3.00539851063395e-7 |
| T04 | 3 | 0.319151858523685 | 5.46539362348165 |
| T04 | 3 | 0.319151858523685 | -5.46539362348165 |
| T04 | 3 | 0.953830902725547 | 0 (real endpoint signs certified) |
| T04 | 3 | 4.96439399957904 | 0 (real endpoint signs certified) |
| T04 | 3 | 89.6449203498993 | 0 (real endpoint signs certified) |

These cells give lower bounds of three, five and five roots in sectors one, two and three at T02, and four, five and five at T04. Conjugate sectors add three/five and four/five roots respectively. Adding the two common-sector witnesses gives 23 and 25 growing roots counted across independent blocks. A complete count requires certified complement exclusion or an argument-principle computation, including neutral roots and every boundary zero.

Weak rates matter to a finite evolution test: T02 sector three contains $z\approx0.00182619033\pm3.44838929310i$, so its amplitude grows on a time scale of about 548 normalized time units while oscillating much faster. A short successful unperturbed cycle can miss that disturbance. The common fast mode and weak oscillatory mode are distinct features of the same exact ring.

Claim grade: computer-assisted derived rectangular inclusions and block-count lower bounds; measured centers by the new instrument. Falsifier: a failed strict inclusion or contraction norm, nonpositive real-coordinate interval, incorrect conjugacy or overlap within a block invalidates the corresponding inclusion or count. These formal witnesses specify no nonlinear basin or later geometry.

## Reproduction and disposition

Run the verified shared venv in order with stages known, controls, then target and rungs 2 4 on the linked instrument. Its control gate freezes the imported common-row source at its recorded SHA-256. It imports no original frozen oracle or original T02 evaluator and alters none of those sources or receipts.

All final stages returned exit zero. Both reference/census prerequisites pass; all 27 directly attempted complex witnesses have strict interval inclusion, and no proposal failed inclusion. A preliminary supervised target completed with exit zero and processGroupClosed true. After adding the quadratic control, real endpoint signs and T04 neutral controls, the final 4.402-second target also completed with exit zero under the shared venv. Repeated runs establish repeatability, not independent evidence. The coordinator owns independently constructed Cartesian adjudication.

Status: bounded all-planar-sector witness work complete and frozen for separate adjudication. The complete complex count remains open. No production evolution, shared queue, manuscript, index, rank, score or qualification method was changed by this worker.
