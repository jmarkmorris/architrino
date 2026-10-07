# Independent finite-speed work-mean review

## Scope, preparation and execution gate

This review targets the entire exact parameter box of the [frozen finite-speed work subject](overnight2-b-finite-speed-work.md): six harmonic coefficients in $[-1/10000,1/10000]$, $H\in[4/5,17/20]$, $\beta\in[1999/10000,2001/10000]$, $\kappa\in[1499/10000,1501/10000]$, and every $R>0$. The canonical equation remains $K=c_f=1$ with all ordinary roots. **Computer-assisted derived and independently accepted:** the completed independent stages prove a positive full-box work mean and opposite strict central endpoint torque signs. Exact bounds and final disposition appear below; the preparation and execution records preserve their original ordering.

The [independent instrument](overnight2-b-independent-finite-speed-work.py) imports no subject or prior instrument. It uses scalar chord distance, direct scalar work and torque numerators, 45-decimal mpmath intervals, and global secant contraction. Its source was prepared while the parent used the single numerical slot; no stage was run then. The parent subsequently confirmed both of its stages closed and explicitly authorized the independent known controls, supervised pilot, and sequential full target/endpoints if measured pilot cost supports them.

The predeclared independent pilot uses the first height interval $[4/5,4/5+1/320]$ and 128 equal phase cells. The full target uses 16 height intervals of width $1/320$ and 1,024 phase cells per interval. Central endpoints use 2,048 cells each at $H=4/5$ and $17/20$, with the six other coefficients zero, $\beta=1/5$ and $\kappa=3/20$. Every stage has a 900-second internal cap, 960-second supervisor deadline, 512 MiB resident cap, 8 MiB receipt cap and one numerical thread. Five-second progress reports identify advancing phase/bin counts. A completed inconclusive mean is not an exclusion.

Prepared controls include exact interval square versus generic-product ranges, $\sqrt4=2$, an exact linear root at two, five static unit-hexagon chord roots through their rational squared values, static work/torque cancellation, the static radial acceleration $-5/4+1/\sqrt3$, and two non-root axial configurations distinguishing delayed source velocity from current receiver velocity. All controls must pass and be recorded before the pilot. Exact rational chart comparisons and dyadic endpoint serialization are also checked. Full scientific sign checks remain pending until execution.

## Independent complete ordinary chart

The paths have $\tau=t/R$, $\phi=\kappa\tau$, radius $\rho=1+a\cos2\phi+b\sin2\phi$, correction $p=c\cos2\phi+d\sin2\phi$, height $\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi$, angular offsets $j\pi/3$ and height signs $(-1)^j$. Direct coefficient bounds give
$$
0.9998\le\rho\le1.0002,\quad |\rho'|,|p'|\le0.0004,\quad |\zeta|\le0.8502,\quad |\zeta'|\le0.8506.
$$
The physical velocity components are $\kappa\rho'$, $\rho(\beta+\kappa p')$ and $(-1)^j\kappa\zeta'$. Their absolute values are respectively below $0.0001$, $0.201$ and $0.128$. The sum of these squared bounds is $0.05678501<1/16$. Thus every physical speed is strictly below $1/4$, independently of $R$ and of the complete past. The exact coefficient-based squared-speed bound is additionally checked in the known stage.

All dimensionless positions lie in a ball with squared radius at most $1.0002^2+0.8502^2$. Four times this number is $6.89296032<2.63^2=6.9169$. Present-time partner separation is at least $0.9998$. With normalized delay $\delta=d/R$, the source Lipschitz bound gives gap $g(\delta)=|Q(\delta)|-\delta$ with every nonzero secant slope in $[-1.25,-0.75]$. It is positive at zero and negative beyond the enclosing diameter, so each partner has exactly one positive root. Self displacement is strictly smaller than its positive delay, so no positive self root exists. At a root,
$$
D=1-\widehat Q\cdot V_s\in(0.75,1.25),\qquad 0.79<\delta<2.63,
$$
because $0.79\cdot1.25=0.9875<0.9998$. This proves complete-past inclusion for all five partner channels and the absent positive-self complement, without sampled root counting.

## Scalar geometry and the source/receiver distinction

Write reception profiles as $(r,r',p_r,p_r',z,z')$ and source profiles at $\phi-\kappa\delta$ as $(s,s',p_s,p_s',z_s,z_s')$. For source $j$ let $\sigma=(-1)^j$ and $\gamma=j\pi/3-\beta\delta+p_s-p_r$. In the receiver's current cylindrical frame,
$$
Q=(r-s\cos\gamma,-s\sin\gamma,z-\sigma z_s),
$$
$$
|Q|^2=(r-s)^2+4rs\sin^2(\gamma/2)+(z-\sigma z_s)^2.
$$
Expanding the scalar dot products independently gives
$$
Q\cdot V_s=\kappa s'(r\cos\gamma-s)-rs(\beta+\kappa p_s')\sin\gamma+\kappa z_s'(\sigma z-z_s),
$$
$$
Q\cdot V_r=\kappa r'(r-s\cos\gamma)-rs(\beta+\kappa p_r')\sin\gamma+\kappa z'(z-\sigma z_s).
$$
Only the first belongs in the transmitter divisor; only the second belongs in the work numerator. At a root $|Q|=\delta$, so the per-channel intervals enclose
$$
D=1-\frac{Q\cdot V_s}{\delta},\qquad
W_j=\frac{\sigma Q\cdot V_r}{\delta^3D},\qquad
M_j=-\frac{\sigma rs\sin\gamma}{\delta^3D}.
$$
The last expression is the channel contribution to $rA_t$. These formulas never substitute delayed source velocity for current receiver velocity in the work mean.

The distinguishing controls use $r=1$, $\zeta=\cos\phi$, zero angle rate and correction, $\kappa=1$, $j=3$ and $\delta=\pi/2$. At reception phase zero, $Q\cdot V_s=-1$ and $Q\cdot V_r=0$. At phase $\pi/2$, those values become $0$ and $-1$. These are direct geometric controls, not asserted causal roots or members of the target's slow-speed box.

## Root inclusion, interval averaging and retention design

If a root lies in interval $I$, choose its exact midpoint $m$. The global secant inequality gives $\delta_*=m+g(m)/s$ for some $s\in[0.75,1.25]$. Thus intersection with the interval image $m+g(m)/[0.75,1.25]$ preserves the root for every parameter/phase point. The rounded interval midpoint contains the exact midpoint, so its outward evaluation is still inclusive. Finite stopping, including stagnation, cannot invalidate inclusion. The independent algorithm starts at $[0.79,2.63]$ and uses at most 40 contractions per target root. The final root-specific divisor is intersected with the independently proved global interval. This intersection removes only analytically impossible values.

All squares use explicit even interval powers. Input rationals enter through integer numerator/denominator arithmetic. Transcendentals and interval $\pi$ use the mpmath interval context. Exact mathematical phase cells are $[2\pi i/N,2\pi(i+1)/N]$; outward interval endpoints contain them. Equal integration weights are exactly $1/N$ despite outward endpoint overlaps. Summing cell enclosures and dividing by $N$ therefore encloses the continuous full-period mean over every parameter in that height bin. Covering all 16 adjacent closed height bins covers the full box.

Each receipt retains every completed cell's work and torque intervals, including partial cells in an interrupted bin. Endpoints are encoded exactly as signed integer times two to an integer exponent. Mean signs use exact endpoint comparisons, not display floats. Per-bin root counts, widest root enclosure and divisor extrema are retained; individual transient root intervals are recomputable from the standalone source rather than all being serialized, to respect the output cap. Operational completion and positive-work/opposite-torque certification are separate flags. A failure or inconclusive result remains retained and is not a successful certificate.

## Exact necessary means and continuity implication

Let $\Omega=\beta+\kappa p'$, $V=(\kappa\rho',\rho\Omega,\kappa\zeta')$, and
$$
L=(\kappa^2\rho''-\rho\Omega^2,\;2\kappa\rho'\Omega+\rho\kappa^2p'',\;\kappa^2\zeta'').
$$
Physical canonical acceleration is $A/R^2$, while prescribed acceleration is $L/R$, so exact balance requires $A=RL$. Direct multiplication gives
$$
V\cdot L=\frac\kappa2\big[(\kappa\rho')^2+(\rho\Omega)^2+(\kappa\zeta')^2\big]',\qquad
\rho L_t=\kappa(\rho^2\Omega)'.
$$
The rotating-frame terms cancel in the scalar derivative. The real profiles make both squared speed and $\rho^2\Omega$ periodic, including relative-periodic paths whose absolute angles do not close. Consequently exact balance forces $\langle V\cdot A\rangle=0$ and $\langle\rho A_t\rangle=0$. The physical velocity–acceleration mean equals $\langle V\cdot A\rangle/R^2$; multiplication by positive scale does not change its sign. This is a kinematic necessary identity, not an imported physical energy law.

On the central height path, ordinary roots depend continuously on height and phase because the gap is smooth near each positive root and its delay derivative is $-D$, uniformly bounded away from zero. The acceleration and both integrands are continuous on the compact parameter/phase domain. Their period means are therefore continuous in height. Verified strict torque signs at $H=0.8$ and $0.85$ would imply at least one zero-torque member between them by the intermediate value theorem. Neither uniqueness nor exact balance follows; a verified positive work mean over the whole box would exclude that member too. Endpoint signs and whole-box work positivity must each be established by their own completed independent stages.

## Current status and falsifiers

At source preparation, every numerical conclusion remains pending. The mathematical chart, normalization, scalar geometry and conditional continuity argument above are independently reconstructed. A discarded root, wrong source/receiver dot product, invalid outward primitive, uncovered phase or height interval, nonpositive work lower bound, or failure of either endpoint sign defeats the corresponding certificate. A complete but inconclusive enclosure establishes no exclusion. An exact canonical history in an independently certified positive-work box would falsify the accepted result.

The original subject source and all prior proofs/oracles/receipts remain frozen. The only authored files are this report and its independent companion; fresh runtime evidence belongs under `independent-finite-speed-work`. No recursive agent, production solver, regular tests, generator or Git mutation is authorized. Numerical execution is sequential under the owned-compute supervisor after the parent's explicit release of the computational slot. Every resulting receipt will be preserved, including failures. No replay or remote-backup claim is made.

## Known-first execution record

The authorized independent known stage passed every declared control at 2026-10-07 05:36:47 UTC under the shared venv and one numerical thread, before any pilot or target. It exited zero in 0.044964 internal seconds with 27,901,952 bytes peak resident memory by macOS `getrusage`. Its exact squared-speed bound is `880953021606462268001/15625000000000000000000`, below $1/16$, and its diameter squared is `21540501/3125000`, below $2.63^2$. Both source/receiver distinction controls passed. The instrument identity is `c3bf45b813288b816708f28f996f1327ba96f7a9f1e6579860d706605333addc`; original known receipt SHA-256 is `cee5ec68c5aa9af7c45d42a5976015c02e3ccff853de5b78adf176997c3d5545`. This recorded pass permits the predeclared supervised pilot; it establishes no dynamic mean sign.

The supervised pilot completed all 128 cells with exit zero, zero stderr and a closed process group under run `bb3bdbf4-0d35-4a98-9d87-27ae240a7f94`. Its internal wall time was 1.475327 seconds (1.535 supervised seconds), peak resident memory 28,000,256 bytes, and receipt size 32,486 bytes by `wc -c`. Work display bounds were approximately $[-0.00194608,0.02640123]$; this is inconclusive and remains preserved. Pilot SHA-256 is `16bc5eb6766f37a808169edc71ab266d38c50c9fdfacacd2b842abef35cb09ee`. The predeclared target has 128 times as many cells: a linear pilot-cost projection is about 189 seconds and 4.2 MB of output, with substantial room under the 900-second/8-MiB limits. This is a planning estimate, not a measured target cost or promised sign. The pilot therefore supports running the unchanged predeclared full target sequentially.

## Subject audit and shared arithmetic boundary

The frozen subject's new work layer uses the receiver's current cylindrical velocity and the complete Cartesian acceleration sum; its divisor uses the delayed source velocity supplied by its frozen dependency. Its in-memory replacement of the global divisor clamp by $[0.7,1.3]$ is licensed by the subject's speed bound below $0.3$. Its original delay bracket and all-five-source loop remain inclusive. The separately reconstructed scalar formulas here verify the source/receiver distinction and normalization independently; no subject function, root enclosure or cell result is imported.

Both instruments use mpmath 1.3.0 interval primitives, which is an explicit shared arithmetic dependency rather than an independent second rounding library. Read-only inspection of the installed `libmp/libmpi.py` confirmed floor/ceiling endpoint directions for addition, subtraction, multiplication, positive-denominator division, square, integer powers, square root and interval pi, together with sine/cosine quadrant extrema and outward finalization. The known controls test signed products, actual square ranges and exact endpoint serialization. This audit supports the declared library use but is not formal verification of its complete transcendental implementation. Exact endpoint signs, not floating displays, determine the scientific flags.

The independent full target completed all 16 height bins and 16,384 phase cells with `all_work_positive: true`, `work_exclusion_certified: true` and no failure. Supervisor run `ad019b4f-9233-4a0b-83a2-391dd62afe45` closed with exit zero, zero stderr and `processGroupClosed: true`. Internal time was 216.634060 seconds (216.735 supervised), peak resident memory 47,202,304 bytes, and original receipt size 3,888,667 bytes. Target SHA-256 is `e8c012b0fb1c3dcf45ec5e0927735162db4ce9d0ad7c2a51ae142aeb8f161d05`. These measured values support the separately predeclared 4,096-cell endpoint stage within the same per-stage limits; it begins only after full-target closure.

The first endpoint launch had a mistyped output directory outside the instrument's assigned runtime owner. Its path guard rejected the command before any numerical stage or receipt write. Supervisor run `7529a233-e6a1-4966-9a59-4ed6609e4d8f` retained the original command and 67-byte stderr, exited one in 0.078 supervised seconds and closed its process group. This is a launch-path error, not a mathematical or endpoint-sign result. The unchanged instrument is rerun with the declared `independent-finite-speed-work` output owner; the failed lease and log are preserved.

Before reading target dyadic endpoints into rational summary bounds, a separate tiny readback control under the shared venv verified the decoder $m2^e$ on the independently specified values $3\cdot2^{-3}=3/8$ and $-1\cdot2^2=-4$, exiting zero. This pass is recorded before that decoder is used on the target receipt. It is a serialization/readback control, not another trajectory calculation or independent sign instrument.

## Completed independent acceptance

The full-box target encloses the work mean at every allowed parameter vector between the smallest retained lower endpoint and largest retained upper endpoint:
$$
L_W=\frac{6112076616001339152983904850766297093277157053}{730750818665451459101842416358141509827966271488},
\qquad
U_W=\frac{2774187232115206953200979255253711737811863771}{182687704666362864775460604089535377456991567872}.
$$
These come respectively from height bins 15 and 0. Exact rational readback after its recorded control verifies
$$
\frac1{125}<L_W\le\langle V\cdot A\rangle\le U_W<\frac2{125}.
$$
The hull display is approximately $[0.008364105054529591,0.015185407453564665]$. The exact positive lower bound excludes canonical full-vector balance for every member of the entire nine-parameter box and every $R>0$. This is a continuous interval enclosure over all reception phases and all parameters, not sampled quadrature or a limiting-speed argument.

The independent endpoint stage completed both central cases, each with 2,048 phase cells and `endpoint_signs_certified: true`. At $H=4/5$ its torque enclosure is
$$
\frac{3673136493627526719776200316297390411795113955}{1461501637330902918203684832716283019655932542976}
\le M(4/5)\le
\frac{2507181997782009980618793850228451179187837733}{365375409332725729550921208179070754913983135744},
$$
strictly positive. At $H=17/20$ it is
$$
-\frac{9238079227266011496665040642351788173892035541}{1461501637330902918203684832716283019655932542976}
\le M(17/20)\le
-\frac{10848871084418769686277193897535081181936640025}{5846006549323611672814739330865132078623730171904},
$$
strictly negative. Their decimal displays are approximately $[0.002513262,0.006861934]$ and $[-0.006320950,-0.001855775]$. The root-continuity proof above therefore gives at least one prescribed central member with zero torque mean at an interior height. No uniqueness or exact height is claimed. The independently positive work mean covers that member too, so its torque compatibility does not imply a solution.

The endpoint command took 48.117661 internal seconds (48.203 supervised), used 32,800,768 bytes peak resident memory and wrote 970,201 bytes. Supervisor run `e23e8048-dc2b-4749-97e5-a79728a34371` closed with exit zero, zero stderr and `processGroupClosed: true`. The pilot, target, rejected precomputation path attempt and completed endpoint runs are all terminal with closed groups. No reviewer-owned job remains running. The numerical slot has been released to the parent.

This independently supports the subject's finite-speed exclusion and its distinct continuity statement without importing any subject functions or enclosures. The scalar-chord geometry, direct receiver dot product, secant contraction, tighter global chart, precision, height subdivision and phase partitions differ from the subject. The explicit common dependency is mpmath's interval arithmetic, whose relevant primitive paths were inspected. The result is locally reproducible computer-assisted evidence, not formal verification of every library routine and not a claim about other waveform families or parameters outside the box.

## Final provenance, retention and scoped validation

All original evidence remains under its declared local owner. By native `wc -c`, independent known, pilot, target and endpoint receipts are respectively 1,029, 32,486, 3,888,667 and 970,201 bytes, totaling 4,892,383 bytes. The inconclusive pilot and precomputation path-guard failure remain separate retained outcomes. No retry overwrote a receipt, and the successful source was unchanged from the known pass through both full stages. Operational leases/logs remain under the supervisor owner; no broader closeout or signal was applied to unrelated jobs.

| Item | SHA-256 by native `shasum -a 256` |
| --- | --- |
| Frozen subject Markdown | `c37b7898235e1d6d6adeabf36745cba121aaa6d969544da36d412afed8218a02` |
| Frozen subject instrument | `e9203d6f43e367e112a4e00371120629a0cc70fbf1f87d6ccd4ba7fa6bed333e` |
| Subject target receipt | `14309a2bd1aba6040d7f1290bb4bb0e140de62adb94832185febf093f782679c` |
| Subject endpoint receipt | `f5397f92fc884ebe376a002c0459ab60b3f8d7842513a5ec938b8a55d3422d61` |
| Independent instrument | `c3bf45b813288b816708f28f996f1327ba96f7a9f1e6579860d706605333addc` |
| Independent known receipt | `cee5ec68c5aa9af7c45d42a5976015c02e3ccff853de5b78adf176997c3d5545` |
| Independent pilot receipt | `16bc5eb6766f37a808169edc71ab266d38c50c9fdfacacd2b842abef35cb09ee` |
| Independent target receipt | `e8c012b0fb1c3dcf45ec5e0927735162db4ce9d0ad7c2a51ae142aeb8f161d05` |
| Independent endpoint receipt | `e9593c00269310b442a0fc4ed148e9ae476a0a7cc1eda9423405c64c58e4db2c` |

The shared-venv built-in `compile` accepted the independent source before execution without creating bytecode. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for either reviewer-authored file; exit one denotes new-file differences. Hash reads reproduced the frozen subject identities and the independent source identity after the numerical work. Every reported scientific sign comes from a complete interval stage whose known pass preceded target use; none follows from an optimizer result or matching saved bytes.

Reproduction must use a fresh child directory under `independent-finite-speed-work`, first run and record its own matching known pass, then the predeclared supervised pilot and full stages in sequence. The instrument refuses existing output paths and requires matching source identities in prior known/pilot receipts. Preserve the original run files. No historical-byte replay, remote backup, actual evolved trajectory, stability conclusion or global theorem outside this box is asserted. Parent integration is the remaining disposition step; no mathematical blocker remains for this bounded review.
