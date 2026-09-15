# Independent adjudication of the signed error through the returned pulse

## Verdict and exact scope

**Accepted as a derived, computer-assisted result at the fixed-input scope of the [frozen signed-error subject](smooth-two-particle-signed-error.md).** The source and target coefficient equations, their continuation through the pulse endpoint, the complete residual bounds, the propagation inequalities, and the resulting signs pass independent reconstruction. No subject claim fails within the scope stated below.

The accepted scope retains the supplied complete past, the unit-spaced alternating infinite lattice, the original stationary block sum, $c_f=1$, and every $0<g\le16$. It establishes the uniform target first-velocity error below $10^{-11}$ on $0\le u\le17/64$, the signed integral enclosure of radius $2\times10^{-11}$ on $u_H\le u\le17/64$, and the sharper radius $8\times10^{-13}$ on $u_H\le u\le3/25$ at $g=16$. At $g=16$ it proves actual approach at $T=(\sqrt2-51/200)\ell$, followed by renewed separation by the latest first-pulse endpoint reception.

This acceptance does not classify the sign for every coupling, locate a first or unique transition, prove transversality, prove contact or a decrease below the initial separation, or supply an unforced all-past preparation. The absolute uniform error band is insufficient to decide the small-coupling sign. The [accepted next-feedback continuation](smooth-two-particle-next-feedback-independent-adjudication.md) and its root, class, reception, and population statements are consumed at their previously accepted scope. The [independent preparation assessment](smooth-two-particle-preparation-independent-adjudication.md) remains separate and unchanged.

## 1. Independence and frozen inputs

The reviewed subject has SHA-256 `c0cbba7e4335b064c4823ccbf8b62c63ebb6af5805cc0c57bda8e2b69305391e`. Five frozen coefficient JSON files were treated as subjects to check: `source-polynomials.json`, `target-polynomials.json`, `source-polynomials-after.json`, `target-polynomials-after.json`, and `target-polynomials-general.json` under `.tmp/mec-008-signed-error/`. Their exact digests and the subject digest are recorded in [signed-all-inputs.sha256](../../../../.tmp/mec-008-signed-error/independent-review/signed-all-inputs.sha256).

The reviewer did not read or execute the author's or contributors' arithmetic implementations. The permitted source-response and after-pulse mathematical notes supplied definitions; they did not serve as numerical or coefficient oracles. The independent instruments reconstruct the canonical implicit row, differentiate the supplied position polynomials themselves, and compare every relevant coupling coefficient. Earlier accepted history results were not recertified as part of this review.

All new instruments passed known cases before target use, with the passes recorded and inspected. The symbolic controls include exact convolution, reciprocal and square-root jets, twice integration, matching a second primitive at an endpoint, affine continuation, and the exact constant-source correction

$$
(1-\lambda/10)^{-2}-1
=\lambda/5+3\lambda^2/100+\lambda^3/250+O(\lambda^4).
$$

The interval controls additionally include zero-containing denominator rejection, a piecewise $C^3$ polynomial and its crossing derivative hull, exact pulse values, and complete interval partitions. Rational propagation controls include zero-Lipschitz and nonzero-Lipschitz resolvent examples and a stationary-source history-error example. The Python interpreter was the repository's shared venv, with SymPy 1.14.0 and mpmath 1.3.0; interval precision was 60 decimal digits.

## 2. Independent coefficient reconstruction

The reconstruction starts from $K(R)=R/\|R\|^3$ and the canonical correction $K(R)/D-K(R_0)$, including $D=1-n\cdot V$ and the implicit causal root. With normalized Taylor coefficients about zero amplitude, the zeroth root is $u$ and $D_0=1$. Setting the unknown root coefficient temporarily to zero gives $v_n=-r_n^*$ for the exact first and second coefficients. The independent symbolic instrument computes the environmental first displacement by twice integrating $gq_1$, then computes the second displacement from the row with that first receiver motion present. It uses these independently derived source polynomials to reconstruct all four target rows with their outer factor $-g$.

This directly gives the first source coefficient

$$
U^{[1]}=g\{A(k)J+B(k)F\},\qquad
A(k)=3kk_3/d_0^5-e_3/d_0^3,\qquad B(k)=kk_3/d_0^4.
$$

Differentiating the shifted pulse and receiver-dependent coefficients gives

$$
D_yq_1=DA\,p+DB\,p'-(Ap'+Bp'')n^{\mathsf T}.
$$

The separately computed fixed-receiver second coefficient supplies the $gA_x,gA_z,gA_t$ terms; receiver motion supplies the $g^2V_x,g^2V_z,g^2V_t$ terms. Every displayed source equation in the subject agrees exactly with this reconstruction, including both vertical signs and the transverse reflection.

For the target, the same row reconstruction gives $y^{[1]}=g^2Ze_3$ and $y^{[2]}=Xe_1$. It independently verifies

$$
X''=g^2A_2+g^3\{C_s-2[(C'+3C)D+CD']\}+2g^4(C'+3C)Z.
$$

In particular, the two reception terms have the stated signs and factors. All source coefficients proportional to $g$ and $g^2$, and all target coefficients proportional to $g^2,g^3,g^4$, were compared separately. Agreement only after substituting $g=16$ was not used to justify the full coupling range.

After $L=1/4$, each environmental coefficient is its independently reconstructed affine continuation. The target coefficient equations were reconstructed again from those continued source rows and matched to their independently computed values and velocities at $L$. They give the displayed $X_+''$ equation. The exact comparison also checked every provided source position, velocity, and acceleration array at $g=16$, every general target position, velocity, and acceleration array in both phases, and both specialized target position files. This verifies the subject's formulas as well as its frozen numerical inputs.

These are coefficient statements about the comparison family. The affine continuation is not an assertion that actual environmental acceleration vanishes after an anchor-time endpoint.

## 3. Domains, roots and endpoint regularity

The accepted causal census supplies exactly the four generated corrections at the targets throughout the new interval. The offset bounds in the subject place the actual sampled sources below $277/1024<9/32$, and $\beta+17/64<21/16$ keeps the whole argument in the accepted continuation. The environmental source horizon remains before the next old-history event. No additional family is assumed absent on numerical evidence.

Independent interval polynomial bounds give the following conservative Euclidean bounds by enclosing component absolute sums, uniformly for $g\in[0,16]$ and $\lambda\in[0,1]$:

| Comparison | Position | Speed | Acceleration |
| --- | ---: | ---: | ---: |
| Every relevant environmental source | $<1.629\times10^{-6}$ | $<2.664\times10^{-5}$ | $<0.000978$ |
| Target | $<3.180\times10^{-6}$ | $<2.772\times10^{-5}$ | $<0.000446$ |

The same instrument bounds each displacement divided by its positive reception offset below $1/1000$. The first cell uses the zero initial position and velocity and an acceleration bound, rather than division by zero. For the pulse, write $z=(8v-1)^2\in[0,1]$; then

$$
p'(v)=(1-z)^3(1-9z)/8192.
$$

Its positive part is at most $1/8192$ and the absolute negative part at most $(16/27)/8192$, proving the stated speed ceiling. Independent centered interval polynomial evaluation gives $|p|<1/262144$ and $|p''|<1/200$.

The triangle inequality therefore bounds $|v-u|$ by $u/1000+v/1000$ for generated comparisons and by $u/1000+v/8192$ for old-pulse comparisons. Exact rational checks put both roots inside $[0.998u,1.003u]$. The latter bracket at target midpoint is below $13/100$, and at the full target horizon below $9/32$. Positive transmitter denominators give uniqueness. No numerical root finder or extrapolation across an unknown root was used.

Across $L$, the interval evaluator intersects the root interval with each polynomial piece and takes derivative hulls. It does not extend the pulse polynomial into the zero-pulse region. The pulse is $C^3$ with piecewise bounded fourth derivative; the row's second amplitude derivative is absolutely continuous across endpoint crossings, so the third-coefficient integral remainder is valid. The source coefficient joins have sufficient matching regularity for the same construction.

## 4. Independently enclosed residuals

At an arbitrary base amplitude, the interval jet instrument reconstructs $v_n=-r_n^*/D_0$ through order three, using the enclosed implicit root and full transmitter factor. Exact coefficient matching removes orders zero through two. The third normalized coefficient bounds the Taylor remainder at amplitude one; the unchanged stationary field contributes the additional $1400g\|y\|^3$ bound. Component absolute sums bound the full Euclidean residual norm. Each time cell is integrated with its outward upper bound, and its weighted integral uses the exact integral of the linear weight.

The following are independently measured upper bounds, rounded outward to the displayed conservative values:

| Domain | Residual norm integral | Weighted norm integral | First-component residual integral |
| --- | ---: | ---: | ---: |
| One environmental source, $0\le u\le9/32$, all $g$ | $<1.340\times10^{-12}$ | $<1.956\times10^{-13}$ | Not required |
| Target, $0\le u\le17/64$, all $g$ | $<7.276\times10^{-13}$ | $<7.498\times10^{-14}$ | $<6.706\times10^{-14}$ |
| One source, $0\le u\le13/100$, $g=16$ | $<6.324\times10^{-13}$ | $<2.421\times10^{-14}$ | Not required |
| Target, $0\le u\le3/25$, $g=16$ | $<6.016\times10^{-14}$ | $<1.103\times10^{-15}$ | $<3.987\times10^{-16}$ |

Every bound is below the corresponding conservative constant used in the frozen subject. Full-domain calculations used time cells of width $1/1024$, with the whole $g\in[0,16]$ and $\lambda\in[0,1]$ enclosed. The independent midpoint calculations used 256 cells in each domain; matching the author's smaller cell count was unnecessary.

A first direct interval evaluation was too wide to establish some thresholds. Centering the unchanged polynomials before evaluation controlled dependency. The final full source calculation passes without partitioning the coupling or amplitude interval. Those earlier wide enclosures are instrument overestimates, not observed residual violations; the retained receipts distinguish them from the successful certificates.

## 5. Propagation and signed conclusions

The receiver derivative estimate follows by differentiating $K(R)/D$ through the implicit root and subtracting $DK(R_0)$. The $DK$ difference gives the $24\rho^{-4}P$ term, root motion and the weight give $2\rho^{-3}W(D_*^{-1}+D_*^{-2})$, and the derivative of the sampled velocity gives $\rho^{-2}(\rho^{-1}W+A)D_*^{-3}$. The stationary derivative contributes $4200B^2$. Exact independent rational arithmetic gives

$$
L_s<0.045774<1/20,\qquad
L_t=\frac{433804636525371871850525}{521150125842101174796288}<1.
$$

The accepted actual-source bounds and the independently checked comparison bounds place the interpolating curves in the stated range-safe balls. In the history comparison, root displacement is at most $\epsilon_P/D_*$. Integrating the direction derivative along the safe segment gives the stated $e_D$ bound. The target row's first numerator has no anchor first component, so its weight error is multiplied by at most $2B$; replacing this by the full vector size would lose the needed margin.

Exact rational substitution independently gives full-history row errors below $2.613\times10^{-12}$ in norm and $3.023\times10^{-13}$ in the first component, and midpoint row errors below $7.633\times10^{-13}$ and $3.035\times10^{-14}$. These imply the subject's conservative row constants. The Volterra supremum estimate and the first-component integration then give

$$
\sup\|y-\widehat y\|<8\times10^{-12},\qquad
\sup|x'-X'|<10^{-11}
$$

on the full domain, and $6\times10^{-13}$ and $4\times10^{-13}$ respectively on the midpoint domain. Comparison position plus error lies strictly inside $B=1/8192$, closing the conditional estimate by the first-exit argument. The exact rational computations check these strict margins, not rounded decimal approximations.

Subtracting two target velocity errors proves the signed-integral band centered on

$$
\mathcal C(u,g)=X'(u;g)-X'(u_H;g)-g^2\int_{u_H}^u\mathcal Z(v)\,dv.
$$

The exact accepted anchor integral is retained in this identity. The approximation does not replace its moving endpoint terms. This establishes the radius $2\times10^{-11}$ uniformly and the radius $8\times10^{-13}$ on the shorter $g=16$ interval.

Independent exact coefficient evaluation gives

$$
X'(3/25;16)=-3.8107327324604702248967195264\ldots\times10^{-12}.
$$

Combining its outward enclosure with the midpoint error gives the subject's strict negative actual-velocity interval. Since $d(t)$ is the normalized separation and $t=T/\ell$, the physical separation derivative at $T_*$ is $\frac{d}{dT}[\ell d(T/\ell)]\big|_{T=T_*}=2x'(3/25;16)<-6.8\times10^{-12}$. Continuity supplies an open interval of approach and, with the earlier accepted positive velocity, an intervening zero; uniqueness and transversality do not follow.

A separate independent 64-cell piecewise polynomial enclosure on $[125/512,131/512]$ gives

$$
2.0986\times10^{-10}<X'(u;16)<2.2439\times10^{-10}.
$$

This is stronger than the subject's required lower bound $1.9\times10^{-10}$. The full error therefore gives $x'(u_{\rm end};16)>1.8\times10^{-10}$ and renewed separation by the latest endpoint reception. The positive endpoint does not erase the earlier approach.

## 6. Reproduction, preservation and falsifiers

All independent scripts and receipts are in the repository-local scratch directory `.tmp/mec-008-signed-error/independent-review/`. From the repository root, use the shared venv and run each instrument's `known` mode before its target mode:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-coefficients.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-coefficients.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-whole-coefficients.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-whole-coefficients.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-interval.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-interval.py bounds
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-interval.py source 256
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-interval.py target 256
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-whole-interval.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-whole-interval.py bounds
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-whole-interval.py source
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-whole-interval.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-whole-interval.py endpoint
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-propagation.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-signed-error/independent-review/signed-propagation.py target
```

The principal target receipts are `signed-whole-formulas-target.txt`, `signed-centered-source.txt`, `signed-centered-target.txt`, `signed-centered-bounds.txt`, `signed-whole-source-centered-pulse.txt`, `signed-whole-target.txt`, `signed-whole-bounds.txt`, `signed-whole-endpoint.txt`, and `signed-propagation-target.txt`. Known-case receipts include `signed-coefficients-known.txt`, `signed-whole-formulas-known.txt`, `signed-interval-centered-known.txt`, `signed-whole-interval-known.txt`, `signed-whole-interval-centered-pulse-known.txt`, and `signed-propagation-known.txt`. The independent instrument manifest is `signed-instruments.sha256`.

Preservation is measured by `shasum -a 256 -c` against the frozen subject manifest and the independent six-file signed-input manifest: all entries pass. The same command against `preparation-inputs.sha256` confirms unchanged bytes for the six earlier accepted dependency files it names. This statement has that explicit file scope; it makes no claim about the concurrently edited manuscript or the rest of the checkout. This review did not edit the subject, numerical inputs, previous accepted references, manuscript, or trackers, and invoked no Git publication or generation operation. Its durable write is this adjudication.

Operator-checkable falsifiers are an exact coefficient mismatch in the independent symbolic reconstruction; a root outside the displayed brackets; a missing channel in the accepted census; failure of a piecewise derivative hull or outward arithmetic bound; failure of a strict rational propagation inequality; a comparison leaving its derivative ball; or modification of a frozen input without renewed assessment. Any such observation reopens the affected conclusion. A sign classification for another coupling needs additional evidence; it is not part of this pass.
