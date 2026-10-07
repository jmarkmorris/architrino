# Independent first clock jet and a Wiener-norm limitation

**Independent reference before new subject or pilot disclosure.** This note derives the first complex source-clock coefficient of the admitted logarithmic unstable-manifold parameterization directly from the frozen Cartesian operator. It then tests what that coefficient alone implies for the same coefficient-sum Wiener source-contraction argument at parameter radius $r=1/100$. No degree-eight pilot, new coefficient subject or new target conclusion is read.

The case remains the coefficient-one inverse-distance opposite-polarity mirror-planar law, $p=1$, $K=R_*=c_f=1$, exact admitted spiral balance and exact growing root. The eigenvector normalization here is **first Cartesian component exactly one**, not unit Euclidean norm. The original complete preparation, completion, modal family and compatibility correction are unchanged. The clock germ is a mathematical object on the already admitted local manifold; it does not select another physical history.

## The exact normalized tangent

Use the notation of the [frozen Cartesian method](overnight2-a-reference-logarithmic-manifold-method.md):

$$
A=ae_1,\quad \Omega=\omega J,\quad P=e^{\Omega\log\lambda},\quad
c_0=A+\lambda PA,\quad d_0=1-\lambda,\quad n_0=c_0/d_0,
$$
$$
w_0=P(I+\Omega)A,\qquad D_0=1+n_0\cdot w_0.
$$

All these quantities refer to the exact balance zero admitted by the [spiral assessment](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md). At that zero $D_0=1/\lambda$. In interval evaluation over its surrounding rectangle, the direct expression $1+n_0\cdot w_0$ must be used rather than imposing the balance identity on off-balance points.

Let $k=\alpha+i\beta$ be the exact admitted growing root and $M=M_{\rm C}(k)$ the frozen Cartesian matrix. When $M_{01}\ne0$ in zero-based matrix indexing, the exact eigenvector with first component one is

$$
v=\begin{pmatrix}1\\-M_{00}/M_{01}\end{pmatrix}.
\tag{1}
$$

Its first row vanishes by construction; its second row equals $-\det(M)/M_{01}=0$ at the admitted root. Thus (1) uses the exact null vector, not a floating-point eigenvector fitted at the center of the root rectangle. The independently enclosed nonzero entry below justifies this chart.

Write the position parameterization and real-conjugate clock germ as

$$
U(z,w)=A+vz+\bar v w+O((|z|+|w|)^2),
\qquad
\ell(z,w)=\lambda+\rho z+\bar\rho w+O((|z|+|w|)^2).
\tag{2}
$$

The conjugate variables are independent in the complex bidisk; the physical real slice is $w=\bar z$. Complex Cartesian products in the functional equation are bilinear. Using a Hermitian product when differentiating the clock would not define the same holomorphic germ.

## Implicit clock differentiation

The exact chord and clock equation are

$$
C=U(z,w)+\ell e^{\Omega\log\ell}
U(z\ell^k,w\ell^{\bar k}),\qquad
G=1-\ell-\sqrt{C\cdot C}=0.
\tag{3}
$$

At fixed clock $\lambda$, the coefficient of $z$ in $C$ is

$$
q=v+\lambda^{k+1}Pv.
$$

Varying the clock also varies its factor, its rotation and the base source value. Their combined base derivative is

$$
\partial_\ell(\ell e^{\Omega\log\ell}A)\big|_{\ell=\lambda}
=P(I+\Omega)A=w_0.
$$

Hence the full linear chord coefficient is $q+w_0\rho$. The clock's linear equation is

$$
0=-\rho-n_0\cdot(q+w_0\rho)
=-D_0\rho-n_0\cdot q.
$$

This independently gives

$$
\boxed{\rho=-\frac{n_0\cdot(I+\lambda^{k+1}P)v}{D_0}.}
\tag{4}
$$

The clock dependence of the nonconstant source parameters first enters their own first-order position variation at degree two; it is not an additional linear term in (4). The base source-velocity derivative is already present through $w_0\rho$. The frozen Cartesian matrix used in (1) also retains the shifted source-velocity term in its response differential.

Analytical controls preceding the target are available without any manifold coefficient computation. For radial clock geometry $\omega=0$, $A=(1/5,0)$ and $\lambda=2/3$, one has $n_0=(1,0)$ and $D_0=6/5$. A radial frequency-zero variation $(1,0)$ gives $\rho=-25/18$. A rotation tangent $(0,1/5)$ gives zero. The time-origin tangent $(1/5,0)$ at frequency $-1$ gives $\rho=-1/3=-(1-\lambda)$. These check the sign, the extra factor $\lambda$ and the denominator directly. The radial geometry is a clock control; it is not asserted to solve the nonzero logarithmic acceleration equation.

## What the first two degrees force in the coefficient norm

For a scalar germ $f(z,w)=\sum f_{ij}z^iw^j$, use the radius-$r$ Wiener coefficient sum

$$
\|f\|_r=\sum_{i,j\ge0}|f_{ij}|r^{i+j}.
\tag{5}
$$

This is the same scalar algebra as in the [convergence reference](overnight2-a-reference-logarithmic-convergence.md) after setting $z=r\zeta$, $w=r\eta$. When the series is not summable at $r$, its extended coefficient sum is infinite; every finite partial sum is still a lower bound.

Using the analytic branch of the power near positive $\lambda$, (2) gives

$$
\ell^k=\lambda^k
+k\lambda^{k-1}\rho z
+k\lambda^{k-1}\bar\rho w
+O((|z|+|w|)^2).
$$

Taking absolute values of these three coefficients proves

$$
\boxed{\|\ell^k\|_r\ge
\lambda^\alpha+2r|k|\lambda^{\alpha-1}|\rho|.}
\tag{6}
$$

Exactly the same lower bound holds for $\|\ell^{\bar k}\|_r$. The two linear magnitudes agree because only $\rho$ is conjugated in the second coefficient while the fixed exponent is still $k$. There is no cancellation between distinct coefficients in (5), and no choice of higher-degree coefficients can decrease the right side of (6).

The previous sufficient source-composition proof requires both norms strictly below one, so that each degree-$N$ source contribution gains a geometric factor $q^N$ with $q<1$. A right side above one in (6) therefore excludes that specific contraction criterion at the stated radius, even if a better estimate of every higher term becomes available.

This statement is deliberately about the norm criterion. It does not disprove holomorphic continuation to the bidisk, physical continuation of any history, pointwise contraction on the real slice, or bounded composition obtained by a different functional estimate. Coefficient-sum norms can exceed a domain supremum because they ignore cancellations at a point. No actual amplitude or physical fate is selected by this calculation.

If the same tangent were instead normalized to Euclidean length one, $v_{\rm unit}=v/|v|_2$, its parameter would satisfy $z_{\rm unit}=|v|_2z$ and its first clock coefficient would be $\rho_{\rm unit}=\rho/|v|_2$. A numerical radius in these coordinates must therefore be rescaled. The unit-normalized small charts in the [quantitative assessment](overnight2-a-reference-logarithmic-quantitative-chart.md) are not contradicted by a failure at radius $1/100$ in (1)'s coordinates.

## Independent enclosure and evidence boundary

The [new clock-jet instrument](../evidence/overnight2-a-reference-logarithmic-clock-jet.py) imports only the previously frozen independent Cartesian matrix and its independently authored rational endpoint arithmetic. It does not import a new subject, pilot, coefficient list or root result. The matrix and arithmetic sources are reused unchanged; the new work is the normalized null-vector extraction, implicit-clock coefficient and coefficient-sum lower bound.

The target encloses the whole admitted balance rectangle and growing-root rectangle. It evaluates $\lambda$, the trigonometric factors and amplitude using outward rational endpoint Taylor bounds, then the complete Cartesian matrix, (1) and (4). A complex rectangle with real and imaginary component distances $d_r,d_i$ from zero has modulus at least $\max(d_r,d_i)$; this conservative floor avoids an unnecessary square-root approximation. The norm lower bound uses $|k|\ge\beta_-$ together with interval lower endpoints for $\lambda^\alpha$ and $\lambda^{\alpha-1}$. Every final comparison is rational.

The known run was read before target access. It passed the inherited arithmetic and Cartesian controls plus six new groups: exact normalized null vector, radial clock differential, zero rotation clock, time-origin clock differential, rectangle modulus floor and a fixed coefficient-sum polynomial. The fixed polynomial $2+3z+4w$ has norm $27/10$ at radius $1/10$, checking the radius weights separately from the target.

The coordinator recorded known completion at 08:14:28 UTC under lease 504b08ac-1c7a-4532-a811-18f4bcc6d8de with a closed process group; the retained receipt records instrument time 0.14707483304664493 seconds. The new source identity is 054a2873b51c9b2c369a0ddf018b0786cc8b58f66cba50a2f016f2f89c00821a.

The coordinator then ran target mode with that known receipt. It completed at 08:15:33 UTC under lease a28112c9-500f-48bd-aa81-8de6e2b962da with exit zero and a closed process group. Its recorded instrument time is 0.08154745912179351 seconds. I inspected the known receipt before opening the target receipt. Source identities in both equal the launch identities, and the target's recorded known-receipt digest agrees with the native SHA-256 read.

The exact rational output gives the conservative outward summaries

$$
-2.114<\operatorname{Re}M_{01}<-2.113,\qquad
-15.004<\operatorname{Im}M_{01}<-15.003,
$$
$$
.28110<\operatorname{Re}v_2<.28118,\qquad
1.40017<\operatorname{Im}v_2<1.40028,
$$
$$
-.83794<\operatorname{Re}\rho<-.83786,\qquad
.69731<\operatorname{Im}\rho<.69738.
\tag{7}
$$

In particular $M_{01}\ne0$ and $|\rho|>.83786$. The actual component floor retained in the receipt is the exact rational

$$
\frac{8378671541995388507737245720030417556647}{10^{40}}.
$$

This is a lower modulus bound, not an enclosure claiming that the full modulus equals its largest component. The interval lower values in (6) give a retained exact rational norm lower bound whose decimal diagnostic is $1.080571095104006\ldots$; direct comparison gives

$$
\|\ell^k\|_{1/100}>1.08,\qquad
\|\ell^{\bar k}\|_{1/100}>1.08.
\tag{8}
$$

A coarser hand check avoids reliance on the instrument's final product: its separate enclosures give $\lambda^\alpha>.993$, $|k|>3.22$, $\lambda^{\alpha-1}>1.61$ and $|\rho|>.83$, hence

$$
.993+.02(3.22)(1.61)(.83)=1.07905772>1.
$$

Thus even substantial rounding reserve leaves the same method limitation. It is determined already by the exact linear tangent and clock; higher formal coefficients are irrelevant to this lower bound.

**Disposition.** The first clock coefficient (4), its nonzero interval enclosure, and failure of the existing strict Wiener source-contraction criterion at radius $1/100$ in first-component-one coordinates are established. The conditional wording in (8) is that any extension with these coefficients has at least the stated coefficient sum, or an infinite sum; the calculation does not itself establish an extension to that radius. No pilot output or new subject conclusion was used before this reference freeze.

## Reproduction, falsifiers and retention

The coordinator ran known mode and then target mode using the shared venv. The corresponding reproduction commands, showing that venv's repository-adjacent path, are:

    ../.venv/bin/python -B reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-logarithmic-clock-jet.py --out .local-data/master-equation-closure/overnight2-a/reference-logarithmic-clock-jet-known.json

    ../.venv/bin/python -B reference/priorities/master-equation-closure/binary-research/evidence/overnight2-a-reference-logarithmic-clock-jet.py --target --known .local-data/master-equation-closure/overnight2-a/reference-logarithmic-clock-jet-known.json --out .local-data/master-equation-closure/overnight2-a/reference-logarithmic-clock-jet-target.json

These paths are exclusive-create outputs; a reproduction needs new output paths and must preserve the original known/target pair. The native measured known digest is 866b38ddea9a369049b4e895a8dbf9fdb58143ee1ddbbf77df4992c5417e53cd and target digest is 43b06120fe960ed7cc8dd2d6524138c31e68cc3f0572ce7e1b6e0c97d76751e0. Both remain under the existing local runtime owner, with the original supervisor records retained. No local evidence was replaced.

The independently received assignment was 998c96dd-199d-4382-acc5-7a7ae05cd492, with complete output, exit zero and payloadVerified true; its transportVerified false is not promoted here. Native shasum -a 256 independently matched its five frozen inputs before writing and additionally measured the inherited endpoint arithmetic.

| Frozen dependency | SHA-256 |
| --- | --- |
| Cartesian method reference | 5a3d1fe01c4e92365893747c375ac2f30e42498501e73a3d4f11cb725fdfadcc |
| Coefficient-space convergence reference | 50d7284fbeeb8fcf7ec4b66db818a22b4d26318ba4c9886d896f1996d1d20dcc |
| Quantitative chart reference | 8102bcd68b2a73a58ecd4ccd8687467e3d001c8203b42bddb158a8bacd29f842 |
| Frozen Cartesian inverse instrument | 8fbfec3846eac485bb233d6ab3049a9e8678086ef1b4549ce551387528ed6217 |
| Original spiral adjudication | 2b79194c849b7778d8fe0d20d9a055ec48d5d4a4f47bf8610177b2d3511f0729 |
| Frozen endpoint arithmetic | a9f806f220149bae96af13912a34f9e0a95c162106102e14554e9959782c134b |

The interval result inherits the previously assessed balance/root inclusions and Cartesian differential; it does not re-prove their existence, uniqueness or spectral completeness. Independence from the undisclosed pilot comes from the frozen differential plus a separately authored first-jet extraction, not from treating a same-producer replay as a second scientific reference.

Falsifiers are an omitted $w_0\rho$ in the implicit clock, an eigenvector normalization mismatch, a zero $M_{01}$ consistent with the enclosure, a failure of the endpoint arithmetic's outward containment, or use of a supremum norm in place of the coefficient sum (5). A successful proof using different composition estimates would not falsify this specifically bounded limitation. Only this new report and new reference instrument are authored; original subjects, references, histories, shared owners and production files remain untouched. No owned scientific process remains active. The coordinator owns integration into the main A account.

**Freeze receipt, 2026-10-07 08:20 UTC.** The established authorized-cases-followup-document-check.mjs command with this report's repository-relative path passed known controls first, then 80 mathematical spans, five local links and whitespace checks. This verifies document syntax and local destinations only. Closing native shasum -a 256 reproduced all six frozen dependency identities and the new instrument's launch identity; the known and target receipt digests are recorded above. The final document was checked again after this paragraph was added and is frozen before any separate domain argument or higher-order pilot disclosure.
