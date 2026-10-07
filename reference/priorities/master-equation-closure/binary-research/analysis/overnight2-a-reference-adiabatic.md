# Independent corrected eccentricity and phase reference

**Blind analytical reference, frozen for separate assessment.** This reference reads the [method](overnight2-a-canonical-adiabatic-method.md), the frozen [seventh-order response reference](overnight2-a-reference-canonical-seventh-order.md) and the frozen [actual spatial remainder assessment](overnight2-a-reference-spatial-seventh-order.md). The coordinator's adiabatic account, instrument, target receipt and literal diagnostic remain unread. The Hale and Moore lenses organize the derivation and exact arithmetic; they supply no physical premise. The canonical nominal history, original equation, source clocks and $c_f=1$ remain unchanged. Only the nominal member is used for planar phase identities.

## Exact identities derived from the receiving variables

Write $p=r_s$, $q=r\theta_s$, $h=rq$, $A_r=p_s-q^2/r$ and $A_t=q_s+pq/r$. Then $h_s=rA_t$, $\theta_s=h/r^2$, and differentiation of $P=hp$, $Q=h^2/r$ gives

$$
h_\theta=\frac{hb}{Q},\qquad
P_\theta=\frac{Pb}{Q}+Q+a,\qquad
Q_\theta=2b-P,\qquad
a=r^2A_r,\quad b=r^2A_t.
\tag{1}
$$

These identities require $r>0$, $h>0$ and hence $Q>0$ for the angular clock. They use acceleration and geometry, without importing a physical energy law. For $e=(Q-1)n-Pt$, $n_\theta=t$ and $t_\theta=-n$ give

$$
e_\theta=2bn-\left(\frac{Pb}{Q}+1+a\right)t.
$$

Subtracting $e h_\theta/h$ before dividing by $h$ cancels the tangential $Pb/Q$ term exactly:

$$
\left(\frac eh\right)_\theta
=\frac{(Q+1)b}{hQ}n-\frac{1+a}{h}t.
\tag{2}
$$

This cancellation is independent of a response expansion. A spatial neighborhood requires the accepted normal-frame treatment separately.

Put $x=Q-1$, $y=P$, $E=x^2+y^2$, $\alpha=\epsilon/h$, and use the accepted polynomial $B=b_7/(\alpha Q)$. The polynomial auxiliary differential operator on $F(\alpha,x,y)$ is

$$
\mathcal D F
=(2\alpha QB-P)F_x+(\alpha PB+Q+a_7)F_y
-\alpha^2BF_\alpha-2\alpha BF.
\tag{3}
$$

Thus $(h^{-2}F)_\theta=h^{-2}\mathcal DF$ for this auxiliary row. The final multiplication term comes from $h^{-2}$; the preceding $\alpha$ derivative comes from $\alpha_\theta=-\alpha^2B$. These are distinct contributions. At $\alpha=0$, (3) is $\mathcal L_0=-y\partial_x+x\partial_y$.

## Real polynomial homological inversion and the mean

For $F=\sum_{j=0}^6\alpha^jJ_j$, the coefficient of order $n$ in (3) is

$$
\mathcal L_0J_n+
\sum_{\substack{i+j=n\\i\ge1}}
\left[(PB_{i-1}+a_i)(J_j)_P+2QB_{i-1}(J_j)_Q\right]
-\sum_{\substack{k+j+1=n\\k\ge0}}(j+2)B_kJ_j.
\tag{4}
$$

Absent coefficients vanish. In particular the weight is $j+2$, not $j$ or $2$. This agrees algebraically with the proposed recurrence.

The independent implementation uses real homogeneous monomials, not complex-frequency division. For the basis $m_k=x^{d-k}y^k$,

$$
\mathcal L_0m_k=k\,m_{k-1}-(d-k)m_{k+1}.
\tag{5}
$$

The circle mean is fixed analytically by

$$
\left\langle x^{2a}y^{2b}\right\rangle
=\frac{(2a)!(2b)!}{4^{a+b}a!b!(a+b)!}E^{a+b};
\qquad
\langle x^iy^j\rangle=0
\quad\hbox{if either exponent is odd}.
\tag{6}
$$

On odd homogeneous degree, (5) is invertible. On even degree its kernel consists of the one radial monomial $E^{d/2}$; appending the zero-mean constraint selects a unique solution for each zero-mean right side. One can also prove the range condition by integrating a derivative around the unit circle: the integral is zero, and every nonconstant trigonometric mode has a periodic primitive. This proof establishes the inverse independently of its real matrix implementation.

At order $n$, changing $J_{n-1}$ by $\phi(E)$ does not affect the previous order, because $\mathcal L_0\phi=0$. Since $V_1=(0,2Q)$ in $(P,Q)$ and $\langle Qx\rangle=E/2$, its mean effect is

$$
\left\langle 4Qx\phi'(E)-(n+1)\phi(E)\right\rangle
=2E\phi'(E)-(n+1)\phi(E).
\tag{7}
$$

Consequently a mean monomial $m_kE^k$ is removed with $-m_kE^k/[2k-(n+1)]$ only when that denominator is nonzero. The resonant monomial at $2k=n+1$ must remain. The implementation first adjusts the previous mean, then solves the zero-mean current equation. It applies the order-seven mean correction to $J_6$, but does not invent a $J_7$; the remaining order-seven oscillation belongs in the full residual.

The following low-order calculation was derived by hand before reading any reference target output:

$$
\begin{aligned}
J_0&=x^2+y^2,\\
J_1&=-2y(x+2),\\
J_2&=x^3+\frac{11}{3}x^2-\frac13y^2+9x+4,\\
J_3&=\frac y3(7x^2+2y^2+24x+45).
\end{aligned}
\tag{8}
$$

For detail, the uncorrected zero-mean $J_2$ is $x^3+2x^2-2y^2+9x$. Its order-three mean is $16+10E/3$, removed by adding $4+5E/3$. The remaining order-three residual is $-7x^3/3-8x^2+8y^2-15x+8xy^2/3$, whose negative is $\mathcal L_0J_3$. There is no division by the resonant $E^2$ denominator: its coefficient is zero at this order.

## Completed sixth-order corrected account

The separately authored exact arithmetic target reproduces (8) and gives the following remaining coefficients. These are derived polynomial identities, measured by the real-basis instrument with known controls first; they do not assert actual physical conservation.

$$
\begin{aligned}
180J_4={}&45x^5-177x^4-2370x^3-5929x^2-13035x-4035\\
&+(636x^2+480x+161)y^2+78y^4,\\
60J_5={}&-y\left[529x^4+2624x^3+5022x^2+5854x+13365\right.\\
&\left.\hspace{12mm}+(-196x^2-116x+516)y^2-8y^4\right],\\
37800J_6={}&4725x^7+128385x^6+1190511x^5+3828330x^4\\
&+9007565x^3+15895345x^2+57000195x+13598235\\
&+(-832950x^4-3278520x^3-5483250x^2-1716960x-18560)y^2\\
&+(28890x^2+173880x-127335)y^4-30690y^6.
\end{aligned}
\tag{14}
$$

All odd-order $J_j$ have zero rotational mean. The nonzero means added to the initially zero-mean even solutions are

$$
\begin{aligned}
\phi_2(E)&=4+\frac53E,\\
\phi_4(E)&=-\frac{269}{12}-\frac{721}{45}E+\frac{113}{480}E^2,\\
\phi_6(E)&=\frac{43169}{120}+\frac{3175357}{15120}E
+\frac{124883}{6720}E^2-\frac{7013}{13440}E^3.
\end{aligned}
\tag{15}
$$

The means before correction at orders three, five and seven are, respectively,

$$
\begin{aligned}
M_3&=16+\frac{10}{3}E,\\
M_5&=-\frac{269}{2}-\frac{2884}{45}E+\frac{113}{240}E^2,\\
M_7&=\frac{43169}{15}+\frac{3175357}{2520}E
+\frac{124883}{1680}E^2-\frac{7013}{6720}E^3.
\end{aligned}
\tag{16}
$$

Substitution in (7) cancels each coefficient in (16). The resonant monomials $E^2$, $E^3$, $E^4$ at those respective orders have zero coefficients. The means at even orders are zero. Thus no nonzero resonant mean is discarded through order seven.

Set $F=\sum_{j=0}^6\alpha^jJ_j$ with (8) and (14). The exact full finite residual is

$$
\mathcal DF=\sum_{n=7}^{13}\alpha^nR_n,\qquad
R_n=
\sum_{\substack{0\le j\le6\\1\le n-j\le7}}
\left[(PB_{n-j-1}+a_{n-j})(J_j)_P+2QB_{n-j-1}(J_j)_Q\right]
-\sum_{\substack{0\le j\le6\\0\le n-j-1\le6}}
(j+2)B_{n-j-1}J_j.
\tag{17}
$$

Equation (17), together with the frozen accepted $a_i,B_i$ and the displayed $J_j$, specifies every coefficient without truncating any product. The retained reference target prints all seven expanded polynomials. In particular, for the leading one,

$$
\begin{aligned}
-37800R_7={}&836865x^7+7126830x^6+23506983x^5+40480980x^4\\
&+47217305x^3+64582950x^2+310651215x\\
&-(9321480x^5+52676550x^4+117744300x^3\\
&\hspace{12mm}+134526420x^2+74550260x+64582950)y^2\\
&+(6397920x^3+19472400x^2+20712960x+4361160)y^4\\
&-(250560x+486000)y^6.
\end{aligned}
\tag{18}
$$

Its mean is zero, but it is not the zero polynomial. The direct derivative check verifies zero coefficients through order six, then retains every coefficient through degree thirteen. The word corrected therefore does not mean conserved.

## Direct phase differentiation

The exact proposed expression is

$$
\Theta_2=\theta-\alpha^{-1}-\alpha(Q-2/3)-\frac23\alpha^2P.
$$

Using (1), its derivative along the polynomial row is

$$
(\Theta_2)_\theta
=1-B+\alpha P-\alpha^2B(Q+2/3)
+\frac23\alpha^3PB-\frac23\alpha^2(Q+a_7).
\tag{9}
$$

Inserting $B_0=1$, $B_1=P$, $B_2=-5Q/3$, $B_3=PQ(3Q-38)/6$ and $a_1=-P$ cancels orders zero, one and two. The first retained term, independently found by direct differentiation, is

$$
(\Theta_2)_\theta
=\frac{P(-3Q^2+32Q+4)}6\alpha^3+O(\alpha^4).
\tag{10}
$$

The order symbol here denotes the finite polynomial's higher terms. It is not an actual accumulated phase-error estimate.

## Actual remainder transfer and the first missing estimate

Let $F$ be the constructed polynomial, and write the actual nominal response as $a=a_7+\delta a$, $b=b_7+\delta b$. Define

$$
C_b=2QF_Q+PF_P-\alpha F_\alpha-2F.
$$

The exact actual correction to (3) is

$$
(\mathcal I_6)_\theta
=h^{-2}\left[\mathcal DF+\delta a F_P+\frac{\delta b}{Q}C_b\right].
\tag{11}
$$

The accepted actual seventh-order certificate supplies the polynomial radial/transverse allowances $C_r=9\times10^{13}$ and $C_t=2.2\times10^{12}$, plus a separate isotropic $2\nu$ allowance. Within that certificate's actual source-window condition $\sigma^6(s)\ge20\epsilon$ and retained finite negative-branch domain, (11) therefore implies

$$
\left|(\mathcal I_6)_\theta-h^{-2}\mathcal DF\right|
\le h^{-2}\left[(C_r\alpha^8+2\nu)|F_P|
+\left(C_t\alpha^8+\frac{2\nu}{Q}\right)|C_b|\right].
\tag{12}
$$

The actual correction to (9) is exactly

$$
\delta(\Theta_2)_\theta
=-\frac23\alpha^2\delta a
+\frac{\delta b}{Q}
\left[-\alpha^{-1}-\alpha(Q+2/3)+\frac23\alpha^2P\right].
\tag{13}
$$

The $1/Q$ factors in (12)–(13) cannot be removed by polynomial divisibility of $b_7$: the separate isotropic actual remainder was not proved divisible by $Q$. For example $C_b$ at $\alpha=0$ equals $2(Q^2-1)$, which is nonzero at $Q=0$. This is a concrete boundary of a naive uniform angular estimate, not a physical obstruction to the actual path. A lower bound on $Q$, an integrable physical-clock bound, or sharper actual transverse forcing is needed for the intended range. The release contribution and the actual source coverage must also be included before initializing or integrating this account. No opening, phase location or physical fate follows from the formal construction alone.

There is no singularity on a certified compact interval: $r\le R$ and $h\ge h_{\min}>0$ already imply $1/Q\le R/h_{\min}^2$. Thus the missing transfer is an evaluated integrated bound useful for the nominal phase question, not the existence of a finite bound. Positivity or coercivity of the corrected account also requires a separate estimate; its signed polynomial definition alone does not establish either.

## Independent instrument and provenance

The [separately authored instrument](../evidence/overnight2-a-reference-adiabatic.py) implements (5)–(7), uses the frozen accepted seventh-order coefficients, and checks the completed residual by the direct operator (3), separately from its coefficient recurrence. It prints every nonzero coefficient through degree thirteen and every phase coefficient through degree nine. These are exact rational polynomial operations, not trajectory data or an interval proof for an actual history.

Before any execution, the coordinator inspected the new instrument and identified a generic symbolic serialization risk: reparsing a printed symbol named E could select Euler's constant. The correction removes reparsing entirely and retains symbolic polynomial objects for the final comparison. This is disclosed implementation assistance, without disclosure of the coordinator's adiabatic result. The frozen launch source SHA-256 is 6307a2a1f9877bd67f4f87da3ce93f78701dbc7ed8f3df60305f36b3377aa68d.

The coordinator was requested to run the shared venv interpreter with -B, the linked instrument path, and --mode known; only after its recorded pass may --mode target run. The declared limits are a 90-second internal alarm, 120-second outer supervisor deadline, 512 MiB resident memory and 1 MiB output. The target prints advancing progress after each homological order. The six predeclared known controls cover exact circle moments, central invariance, real rotational inversion and product differentiation, fixed first-order cancellation, the mean-shift rule at orders two through seven, and phase cancellation through order two.

**Measured known-first receipt.** I read .local-data/master-equation-closure/overnight2-a/reference-adiabatic-known.json before the target receipt. It reports all six controls PASS and internal elapsed time 0.10863366583362222 seconds. The coordinator reports completion at 06:38:46 UTC, supervisor lease f57bd363-f8ff-4ee6-9c61-a74db2a408f0, 0.41 seconds supervisor wall time and a closed process group. Its SHA-256 measured by native shasum is 89d27b5ae31876a7d5fa4aa1b37959d300db3032a537cf0d3f3feda905920ba5.

**Measured target receipt.** I subsequently read .local-data/master-equation-closure/overnight2-a/reference-adiabatic-target.json, which reports PASS, the launch source identity above, and 0.6962177497334778 seconds internal elapsed time. The coordinator reports completion at 06:42:49 UTC, supervisor lease 1bcc0460-7fe7-439b-b68b-179d58666f1e, 0.945 seconds supervisor wall time and a closed process group. Native shasum gives receipt SHA-256 4888c7b14e36e77bbea76024b77c5960ca97a017f024cccdb491d0921eccacb8. The matching progress logs and original supervisor records are retained by the coordinator. These receipts measure this reference's exact arithmetic run; they are not a same-producer verification of the undisclosed coordinator output.

### Source identities and falsifiers

Native shasum -a 256 measured the three read inputs before the construction:

| Input | SHA-256 |
| --- | --- |
| Method | 7e90f0347ef64623cd589c77e2af36666e19e6c44ade0dbc6c1327f8ad6c8b03 |
| Seventh-order reference | 3a61ef145ae3c9e893ffefeaac335b9508312180d37265291a3f4e913e61675b |
| Actual spatial seventh-order reference | ed0943d83705f188bd37cf36c4a2c53e0c9f1cae8170ce68ea4404d3e04ca256 |

The exact formal claim is overturned by a nonzero difference when substituting the printed $J_j$ in (3), a failed circle mean in (6), an omitted resonant coefficient in (7), or a discrepancy with the hand results (8) and (10). An actual-use claim additionally fails if the accepted source window is absent, if the isotropic error is assigned an unsupported $Q$ factor, or if the integrals in (12)–(13) are not bounded over the claimed actual interval. The algebraic extension to $Q=0$ does not by itself extend the angular physical clock.

**Disposition and preservation.** The polar identities, homological recurrence, stated normalization, coefficients through $J_6$, absence of resonant means through order seven, and the differentiated phase relation are accepted at exact formal grade. Exact conservation, actual uniform closeness, a first opening and fate are not asserted. Native shasum -a 256 before and after the derivation found the three named input identities unchanged and the launch instrument identity unchanged. Only this new report and its separately authored new evidence file were written by this reference; all frozen subjects and prior assessments were preserved.

The established document checker was run as node reference/priorities/master-equation-closure/binary-research/evidence/authorized-cases-followup-document-check.mjs followed by this report's repository-relative path. Its known controls passed before the document target; the final target passed TeX, whitespace and local-link checks. This is document validation, not mathematical acceptance.
