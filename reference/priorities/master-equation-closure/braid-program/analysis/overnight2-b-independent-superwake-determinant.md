# Independent single-reception all-root determinant exclusion

## Verdict and exact domain

**Computer-assisted derived and independently accepted:** both closed fifteen-parameter boxes in the [frozen determinant subject](overnight2-b-superwake-determinant.md) have complete ordinary positive-delay source counts $(1,3,1,1,1,1)$ at reception phase zero, including the positive self root. The independent complete canonical sums satisfy $A_rL_z-A_zL_r<0$ throughout both boxes. Neither box contains an exact member at any common scale $R>0$.

This accepts a single-reception chart and two continuous-box exclusions. It establishes no complete-period ordinary chart, no exclusion of the whole waveform family, no exact spatial reference, and no stability or nonlinear-fate result. The canonical law has $K=c_f=1$, every ordinary positive-delay self and partner root, and the absolute source divisor. No speed ceiling, receiver response factor or event rule is introduced.

The exact center heights are the decimal literals `0.1` and `0.25`. Each of the fifteen coordinates independently ranges over its exact decimal center plus or minus $2^{-20}$; height varies too. The fourteen remaining coordinates, in order, are
$$
(a_2,b_2,C_2,D_2,e_3,f_3,\beta,\kappa,a_4,b_4,C_4,D_4,e_5,f_5).
$$
All defining decimal strings and their rational interval endpoints are reproduced in the new target receipt. They are authenticated against the frozen subject target SHA-256 `7b99be2a4e9338e705b40c53c87da3a433306251470b151a0d478682f19bef7f`; binary floating-point approximations do not define the boxes.

The [new standalone independent source](overnight2-b-independent-superwake-determinant.py) imports neither subject nor proposal code. It reads the defining literals and the midpoints of stored protected brackets as root-location hints only. Every hinted root is re-proved using new uniform endpoint and derivative enclosures, and every unprotected delay interval is independently excluded. The source does not use subject guards, root intervals, gap bounds, divisor intervals, acceleration intervals or determinant bounds as proof premises. An omitted root hint is explicitly tested in the known stage and is rejected by the complementary coverage check.

## Independent time derivatives and cylindrical demand

With $\tau=t/R$, $\phi=\kappa\tau$, define
$$
\rho=1+a_2\cos2\phi+b_2\sin2\phi+a_4\cos4\phi+b_4\sin4\phi,
$$
$$
S=C_2\cos2\phi+D_2\sin2\phi+C_4\cos4\phi+D_4\sin4\phi,\qquad p=S/\kappa,
$$
$$
z=H\cos\phi+e_3\cos3\phi+f_3\sin3\phi+e_5\cos5\phi+f_5\sin5\phi.
$$
A dot below denotes differentiation with respect to $\tau$, and a prime denotes differentiation with respect to $\phi$. The source angular velocity and acceleration are
$$
\omega=\beta+S',\qquad \dot\omega=\kappa S''.
$$
Thus the phase-normalization factor cancels before interval evaluation. The radial and axial derivatives are $\dot\rho=\kappa\rho'$, $\ddot\rho=\kappa^2\rho''$, $\dot z=\kappa z'$ and $\ddot z=\kappa^2z''$. Direct Cartesian differentiation in the instantaneous cylindrical basis gives
$$
\boxed{\mathbf L=(\ddot\rho-\rho\omega^2,\ 2\dot\rho\omega+\rho\dot\omega,\ \ddot z).}
$$
The new implementation evaluates these time derivatives by summing Fourier modes with their exact integer frequency factors. It does not reuse the subject's phase-derivative routine.

The physical prescribed acceleration is $\mathbf L/R$. A normalized causal separation $\mathbf Q$ and normalized delay $d$ correspond to physical separation $R\mathbf Q$ and delay $Rd$, so the canonical acceleration is $\mathbf A/R^2$. Exact balance therefore requires
$$
R\mathbf L=\mathbf A.
$$
Eliminating $R$ between the radial and axial equations gives the necessary identity
$$
\boxed{A_rL_z-A_zL_r=0.}
$$
No division by a demand component occurs, so the identity remains necessary when either component vanishes. A strict interval sign at one reception is sufficient to exclude all $R>0$ for the parameter box.

## Independent relative geometry and source contraction

At reception $\phi=0$, rotate coordinates into the receiver's planar radial/tangential basis. Put $r_0=1+a_2+a_4$, $z_0=H+e_3+e_5$, $\phi_s=-\kappa d$ and $\sigma_j=(-1)^j$. Let $r_s=\rho(\phi_s)$, $z_s=z(\phi_s)$, with their time derivatives evaluated at the source phase. The relative source angle is
$$
\alpha_j=\frac{j\pi}{3}-\beta d+\frac{S(-\kappa d)-S(0)}\kappa.
$$
The independent implementation forms the phase difference directly as terms $C_n(\cos n\phi_s-1)+D_n\sin n\phi_s$, divided by $\kappa$. The separation is
$$
\mathbf Q_j=(r_0-r_s\cos\alpha_j,\ -r_s\sin\alpha_j,\ z_0-\sigma_jz_s).
$$
Its squared norm is evaluated using the polar chord identity
$$
\boxed{q_j^2=(r_0-r_s)^2+4r_0r_s\sin^2(\alpha_j/2)+(z_0-\sigma_jz_s)^2.}
$$
This is algebraically equal to the squared Cartesian separation. Positive radius is independently guaranteed throughout the boxes. The polar form reduces repeated interval occurrences without altering the geometry.

The delayed source velocity in the fixed receiving frame is
$$
\mathbf V_s=(\dot r_s\cos\alpha_j-r_s\omega_s\sin\alpha_j,\ \dot r_s\sin\alpha_j+r_s\omega_s\cos\alpha_j,\ \sigma_j\dot z_s).
$$
Reducing its contraction analytically gives
$$
\boxed{C_j:=\mathbf Q_j\cdot\mathbf V_s
=\dot r_s(r_0\cos\alpha_j-r_s)-r_0r_s\omega_s\sin\alpha_j
+\sigma_j\dot z_s(z_0-\sigma_jz_s).}
$$
For the squared causal gap $G_j=q_j^2-d^2$, differentiation with respect to delay gives
$$
G_{j,d}=2(C_j-d).
$$
Indeed increasing delay moves the source backward, so $d\mathbf Q_j/dd=\mathbf V_s$. At a positive root $q_j=d$,
$$
D_j=1-\frac{C_j}{d},\qquad G_{j,d}=-2dD_j,
$$
$$
\boxed{\mathbf A_j=\frac{\sigma_j\mathbf Q_j}{d^3|D_j|}.}
$$
The absolute value is required for every ordinary source row. Both target boxes contain a source-one root whose signed divisor is strictly negative. Discarding that root or using its signed divisor as a weight would change the canonical acceleration and invalidate the determinant test.

## Complete recent and remote guards

The independent guard uses $d_{\rm recent}=1/128$, different from the subject's recent cutoff. All coefficient maxima below are exact rational upper bounds on the absolute values over the closed boxes, obtained from outward interval endpoints. Let $r_-$ and $r_+$ bound the radius by the sum of radial coefficient magnitudes, and let $Z_+$ bound height by the sum of all height coefficient magnitudes. The derivative amplitude bounds are
$$
R_1=2(|a_2|_++|b_2|_+)+4(|a_4|_++|b_4|_+),
$$
$$
R_2=4(|a_2|_++|b_2|_+)+16(|a_4|_++|b_4|_+),
$$
$$
P_1=2(|C_2|_++|D_2|_+)+4(|C_4|_++|D_4|_+),
$$
$$
P_2=4(|C_2|_++|D_2|_+)+16(|C_4|_++|D_4|_+),
$$
$$
Z_1=|H|_++3(|e_3|_++|f_3|_+)+5(|e_5|_++|f_5|_+),
$$
$$
Z_2=|H|_++9(|e_3|_++|f_3|_+)+25(|e_5|_++|f_5|_+).
$$
Write $k_+=|\kappa|_+$ and $w_+=|\beta|_++P_1$. The following are all-history upper bounds on normalized speed and acceleration:
$$
V_+=\sqrt{(k_+R_1)^2+(r_+w_+)^2+(k_+Z_1)^2},
$$
$$
M=\sqrt{(k_+^2R_2+r_+w_+^2)^2+(2k_+R_1w_++r_+k_+P_2)^2+(k_+^2Z_2)^2}.
$$
They follow by bounding each cylindrical component; rotating the planar basis preserves its norm. No acceleration law or energy premise is imported in constructing these kinematic bounds.

For self, the implementation also encloses the reception speed $V_0=\sqrt{\dot r_0^2+(r_0\omega_0)^2+\dot z_0^2}$. Integration of the velocity difference gives
$$
\frac{|\mathbf X_0(0)-\mathbf X_0(-Rd)|}{Rd}
\ge |V_0|-\frac{Md}{2}.
$$
The exact interval lower bound for $|V_0|-M d_{\rm recent}/2$ exceeds one in both target boxes. Therefore the whole interval $(0,d_{\rm recent}]$ contains no positive self root. This uses a reception-speed lower bound and a complete-history acceleration upper bound; it does not assume speed stays above one pointwise throughout that interval. The known static control separately exercises the valid speed-upper-below-one branch.

For a partner, the present planar chord is at least $r_-$. The reverse triangle inequality and source-speed bound imply
$$
q_j(d)-d\ge r_--(V_++1)d>0\qquad(0<d\le d_{\rm recent}).
$$
Both target guard margins are strictly positive in the receipt. Hence the recent partner complement is certified too.

Every complete path lies within normalized radius $\sqrt{r_+^2+Z_+^2}$ of the origin. Every positive causal root therefore satisfies $d\le2\sqrt{r_+^2+Z_+^2}$. The independent finite-domain endpoint is the outward upper bound on this diameter plus $1/50$. Beyond that endpoint the gap cannot vanish, covering the entire remote complement. The reception, near interval, finite-domain proof and remote guard together exhaust every positive delay; delay zero itself is not included as a self contribution.

## Protected roots and exact complementary coverage

Stored bracket midpoints provide guesses only. The independent source starts with new half-width $1/1024$ and, if needed, widens it within its declared bounded procedure. Every protected bracket must independently have opposite strict endpoint signs for all parameters in the box and a uniformly nonzero $G_{j,d}$ throughout the bracket. Continuity and strict monotonicity then give exactly one root for every parameter vector. A duplicated or unusable hint fails the bracket/nonoverlap conditions.

For each protected root, interval Newton contraction uses an exact rational midpoint and the whole current interval derivative. The mean-value theorem proves inclusion of every root for every parameter vector. Contraction is intersected with the previous enclosure; an empty intersection or lost derivative sign fails the certificate. The protected endpoint signs and derivative, final root interval and contraction count are retained. Since $d>0$, a squared-gap root is exactly a causal-distance root.

Every interval between guards and protected brackets is recursively partitioned. A complementary leaf is accepted only if its complete gap interval omits zero, or if its complete derivative interval omits zero and its two endpoint gap intervals have the same strict sign. Both tests exclude every root of that leaf for every parameter vector. Depth or resource exhaustion is an unresolved error, never an inactive-root conclusion.

The instrument separately checks exact rational adjacency of all complementary leaves in each segment. It then sorts protected brackets together with every complementary leaf and checks exact adjacency from the recent endpoint to the finite-domain endpoint. Thus the proof has no unverified finite-delay gap or interior overlap. Boundary gaps are nonzero where protected and inactive pieces meet. The two target boxes required respectively 41 and 45 complementary leaves, 86 in total. These are independently constructed covers, not copies of the subject's 61 and 66 leaves.

Each resulting root interval independently proves $D_j\ne0$ before its acceleration row is included. The source-count vector is $(1,3,1,1,1,1)$ throughout either box, totaling eight roots per receiver at this reception. The middle root of source channel one has negative $D_j$; its other roots and the other channels have positive $D_j$. All eight rows, including self, enter the complete acceleration.

## Known-first controls and measured execution

The known stage ran before target input evaluation. It proved the complete static census $(0,1,1,1,1,1)$, including an empty self channel and every complementary interval, and checked
$$
A_r=-\frac54+\frac1{\sqrt3},\qquad A_t=A_z=0.
$$
For the static alternating unit ring, each radial row is $\sigma_j/(2d_j)$ with $d_j=1,\sqrt3,2,\sqrt3,1$, giving this exact sum. The diametric squared gap at $d=2$ is zero with derivative $-4$.

A separate higher-harmonic control uses exact rational coefficients and evaluates the independently implemented time derivatives at phases zero and $\pi/2$. In the order $(r,\dot r,\ddot r,\omega,\dot\omega,z,\dot z,\ddot z)$, its hand-derived expected values are
$$
(1.03,0.24,-0.96,2.2,-0.96,0.29,0.77,-5.96)
$$
and
$$
(0.99,0,-0.32,2,-0.32,-0.035,-0.34,-0.98).
$$
These decimals are exact rationals, not measured tolerances. The source records their defining coefficients and requires narrow interval containment.

For a nonstatic negative-divisor control, take unit radius, zero height and corrections, source $j=1$, $\beta=5\pi/(6\sqrt2)$ and $d=\sqrt2$. Then $\alpha=-\pi/2$, $\mathbf Q=(1,1,0)$, the root is exact, and
$$
D=1-\frac{5\pi}{12}<0,\qquad G_d=-2dD>0,
\qquad A_r=-\frac1{2\sqrt2(5\pi/12-1)}.
$$
The known stage checks the root, signed divisor, derivative sign and absolute-divisor row. Finally it intentionally omits a known static partner root from the hint list; the complementary cover rejects this omission. This directly checks that hint completeness is not silently assumed.

The known stage passed synchronously in 0.114685 seconds, produced 22,647 bytes and reported 28,164,096 peak resident bytes after serialization. Successful known status and identical source hash gate both later stages. The one-box pilot passed its complete census and determinant in 0.320535 internal seconds, produced 81,766 bytes and reported 28,704,768 peak resident bytes after serialization. Its measured cost projected about 0.65 seconds and 0.17 MB for both boxes, supporting the unchanged target. Pilot supervisor `c1bc6f39-2bf3-4cf3-990a-e6705265876d` closed with exit zero, zero stderr and a closed process group in 0.381 supervised seconds.

The two-box target completed with both strict determinant exclusions, 86 complementary leaves and no failure in 0.661817 internal seconds. It produced 165,138 bytes and reported 28,983,296 peak resident bytes after serialization. Target supervisor `e806f982-9764-44a4-935d-d9734770ed2a` closed with exit zero, zero stderr and `processGroupClosed: true` in 0.721 supervised seconds. Both box completions were emitted as progress records before the final receipt. The three receipts total 269,551 bytes. The declared limits were 300 internal seconds, 360 supervisor seconds, 512 MiB resident memory, 16 MiB per receipt and one numerical thread. The numerical slot was released after target closure.

## Exact determinant evidence

The independent target encloses the determinant for the height-`0.1` box in
$$
\left[
-\frac{100173316382690650230952896044560286986439003624703334231398729717}{210624583337114373395836055367340864637790190801098222508621955072},
-\frac{49404906189998902452084337686481240960678896055241409317964306983}{105312291668557186697918027683670432318895095400549111254310977536}
\right]
$$
and for the height-`0.25` box in
$$
\left[
-\frac{102044753774638687679937739470763488483668762198170989748345618609}{210624583337114373395836055367340864637790190801098222508621955072},
-\frac{100363366635150036310544013245841841100560923196041836450575889151}{210624583337114373395836055367340864637790190801098222508621955072}
\right].
$$
Both upper endpoints are strictly negative rational numbers. They enclose the continuous fifteen-dimensional boxes, not merely their centers. The complete source sums and all three kinematic-demand intervals are also retained. Nonzero determinant contradicts the necessary scale identity at phase zero and establishes the claimed all-$R$ exclusion of these boxes.

## Provenance, qualifications and preservation

The arithmetic is mpmath 1.3.0 outward interval arithmetic at 65 decimal digits. Subject and independent code share this primitive library. The new polar chord identity, reduced source contraction, direct time derivatives, reception-speed self guard and independently constructed complements provide implementation independence above that shared layer. This is not a proof-assistant verification of interval transcendental primitives. The Moore role supplies a review lens, not acceptance authority.

Native `shasum -a 256` identifies the artifacts:

| Item | SHA-256 |
| --- | --- |
| Frozen subject report | `06225f2c424d2237201c91ffb3ae7a23a33713e68699b46d9b0615a7f85c6211` |
| Frozen subject source, not imported | `2050ae06ece7a6e0ba5172c83ab2354be9ddf68fa3e5870f233e00c47ed4f4a3` |
| Frozen subject target supplying literals and hints | `7b99be2a4e9338e705b40c53c87da3a433306251470b151a0d478682f19bef7f` |
| New independent source | `f8b6ddc86d0967da9495968a2a365ec2ba5202d4239499edd8afecd0eac753db` |
| New known receipt | `cb3220522109775dae700336872923d00e6647ce8c25983c1112b4c22085fe15` |
| New pilot receipt | `a3fd795d9af2d9006580ba47a2230b43a27f4e0d5b457969385a38d64cb3d2b4` |
| New target receipt | `ac404a1ecc671843b2e951ecbf8dcf8854c14415be5783d1653197b9304b56c6` |

Fresh independent receipts are under `.local-data/master-equation-closure/overnight2-b/independent-superwake-determinant/` as `known.json`, `pilot.json` and `target.json`. The source identity was unchanged from known success through target. Every successful path refuses overwrite. The frozen subject's known-stage failed preparation and every earlier failed, unresolved or successful artifact remain preserved; this review neither repairs nor replaces them.

A coefficient literal or box-endpoint mismatch would defeat the claimed domain. A self chord violating the recent lower bound, a partner violating its recent gap margin, or a root beyond the diameter would refute the corresponding guard. A root outside the protected intervals and certified complementary cover would falsify completeness. A zero signed divisor, incorrect time derivative or source contraction, omission of the self or negative-divisor root, or actual acceleration/determinant outside its interval would falsify the affected certificate. Any exact member inside either retained box would directly refute the determinant obstruction. A root bifurcation at another reception outside the proved chart does not contradict this single-reception result and is not settled here.

Only this report, its new standalone source, assigned fresh runtime receipts and supervisor-managed operational records were written. All frozen subjects, proposal code and outputs, prior reports, oracles and receipts, parent receiving account and shared owners stayed read-only. No subject/proposal code was imported, and no Git mutation, generator, delegation, sidebar action or broader numerical search was performed. All Python ran under the shared executable venv with bytecode writes disabled and one numerical thread. Final native whitespace checks apply only to the new authored files; final hashes and byte counts verify the stated evidence. Both numerical groups are closed. Parent integration is the remaining disposition step, and this bounded review is complete.
