# Independent assessment of the corrected-account integral budgets

**After-disclosure analytical and arithmetic assessment, frozen for integration.** The [blind corrected-account reference](overnight2-a-reference-adiabatic.md) was frozen before disclosure of the [subject account](overnight2-a-canonical-adiabatic-account.md), [integrated-budget subject](overnight2-a-adiabatic-error-budget.md) and [subject bounds instrument](../evidence/overnight2-a-adiabatic-bounds.py). This assessment preserves those files and the frozen reference. It considers the original nominal planar member on an already admitted actual branch; it changes no physical equation or complete history. The receiving integration owner is the [main A report](overnight2-a-followup-and-research-2026-10-07.md).

## Domain and integration rule

The conditional domain is

$$
.999\le h\le5000,\qquad
|e|\le6\epsilon h,\qquad
h_\theta\ge.98\epsilon,\qquad
.00033356410<\epsilon<.00033356411.
\tag{1}
$$

For use of the actual response allowance, retain all its inherited hypotheses as well: finite negative branch, $Q>0$, $|P|\le3$, $Q\le4$, the six-generation generated-source condition and the certified source windows. The coarse polynomial box (1) is convenient for integration; it is not an independent replacement for those actual-history premises.

The upper bound $h\le5000$ is conservative under the retained $H<6$ and $H=4\epsilon h$. To check the eccentricity allowance, write the accepted corrected vector as $z=h^{-1}(Z_n n+Z_t t)$, with

$$
Z_n=x-\frac12\alpha y+\frac72\alpha^2,\qquad
Z_t=-y+2\alpha+\frac12\alpha x+\frac54\alpha^3,
\quad x=Q-1,\ y=P.
\tag{2}
$$

The linear correction to $c=e/h$ has norm $\alpha|c|/2$. The remaining correction has norm at most $2\epsilon/h^2+(7/2)\epsilon^2/h^3+(5/4)\epsilon^3/h^4$. Thus the inherited $|z|<3.2\epsilon$, together with (1)'s lower $h$ bound, implies $|c|<6\epsilon$. For example, the weaker $h>.99$, $\epsilon<.000334$ already yield $|c|<5.25\epsilon$ by moving the $\alpha|c|/2$ term to the left. This checks the conversion; admission of the original release and the lower $h$ bound remains with their owners.

Set $\epsilon_+=33356411/10^{11}$. For a monomial $c\epsilon^j h^k x^a y^b$, put $d=a+b$. The two independent steps are

$$
|x^ay^b|\le6^d\epsilon^dh^d,\qquad
d\theta\le\frac{dh}{.98\epsilon}.
$$

Hence, provided $j+d-1\ge0$, its integral is bounded by

$$
\frac{|c|6^d\epsilon_+^{j+d-1}}{.98}
\int_{.999}^{5000}h^{k+d}\,dh.
\tag{3}
$$

The use of $\epsilon_+$ occurs only after combining the power from the angular-clock conversion with the monomial power; replacing a negative power of $\epsilon$ by its upper endpoint would be invalid. All target terms satisfy the displayed nonnegative-exponent condition.

The power integral is exact rational arithmetic except at exponent $-1$. At that exponent the upper bound $9$ follows because the positive partial exponential series $\sum_{m=0}^{20}9^m/m!$ exceeds $5000/.999$, while the full exponential is larger still. Since $h_\theta>0$, a possibly shorter actual interval is covered by the full integration range. No quadrature, oscillatory cancellation, or uniform distribution of the actual angle is assumed.

## Four chain-rule constructions checked independently

Let $F=\sum_{j=0}^6\alpha^jJ_j$ be the frozen independent account polynomial and $B=b_7/(\alpha Q)$. Its derivative under the finite row is

$$
\mathcal D_2F
=(2\alpha QB-P)F_x+(\alpha PB+Q+a_7)F_y
-\alpha^2BF_\alpha-2\alpha BF.
\tag{4}
$$

The frozen reference gives $\mathcal D_2F=\sum_{n=7}^{13}\alpha^nR_n$. Thus the physical account derivative contains $\epsilon^n h^{-n-2}R_n$. Its majorant uses $(j,k)=(n,-n-2)$ in (3).

For a perturbed actual response, the exact additional derivative is

$$
\delta(\mathcal I_6)_\theta
=h^{-2}\left[F_P\delta a+\frac{G}{Q}\delta b\right],
\qquad
G=PF_P+2QF_Q-\alpha F_\alpha-2F.
\tag{5}
$$

The accepted polynomial response allowance is $|\delta a_{\rm pol}|\le C_r\alpha^8$ and $|\delta b_{\rm pol}|\le C_tQ\alpha^8$, where $C_r=9\times10^{13}$ and $C_t=2.2\times10^{12}$. Applying (5) coefficient by coefficient therefore uses $(j,k)=(j_0+8,-j_0-10)$ for the coefficient of $\alpha^{j_0}$ in $F_P$ or $G$. This verifies the sensitivity weights, the factor of two from $h^{-2}$ and the cancellation of $Q$ for this allowance.

For the corrected vector define $\mathcal D_1$ by replacing the last term of (4) with $-\alpha BF$. Its fixed-coordinate derivative is

$$
z_\theta=h^{-1}\left[(\mathcal D_1Z_n-Z_t)n
+(\mathcal D_1Z_t+Z_n)t\right].
\tag{6}
$$

The basis-rotation terms in (6) are essential. A direct hand calculation gives zero coefficients at orders zero and one and the order-two pair

$$
(V_{n,2},V_{t,2})=(y(x+3),-x-x^2/2).
\tag{7}
$$

Both coefficients vanish at $x=y=0$, but the entire order-two row does not vanish. A coefficient at order $n$ contributes $\epsilon^nh^{-n-1}$ and therefore uses $(n,-n-1)$ in (3). Summing the two component absolute bounds dominates the Euclidean vector variation. The complete row has degree ten; the subject's range through order eleven omits nothing.

For the phase relation, the independently derived derivative is

$$
(\Theta_2)_\theta
=1-B+\alpha P-\alpha^2B(Q+2/3)
+\frac23\alpha^3PB-\frac23\alpha^2(Q+a_7).
\tag{8}
$$

Its coefficients through order two vanish; its first coefficient is $P(-3Q^2+32Q+4)/6$ at order three. Each order $n$ uses $(n,-n)$ in (3). The finite expression ends at degree nine, so the subject's range through degree ten is complete.

## Separate actual-row contributions to vector and phase

These contributions were excluded from the subject's vector and phase totals. They must not be silently absorbed into those numbers. For either component $Z$ of (2), define

$$
K_Z=PZ_P+2QZ_Q-\alpha Z_\alpha-Z.
$$

The extra component derivative is exactly

$$
\delta z_\theta=h^{-1}\left[Z_P\delta a+\frac{K_Z}{Q}\delta b\right].
\tag{9}
$$

The rotation terms in (6) have no additional response dependence in the angular clock. The polynomial allowance in (9) can be bounded using $(j_0+8,-j_0-9)$ for the coefficient of $\alpha^{j_0}$ in $Z_P$ and $K_Z$, with component absolute values summed. This estimate is valid for the nominal planar member; it does not suppress a spatial normal term.

The phase sensitivity is

$$
\delta(\Theta_2)_\theta
=-\frac23\alpha^2\delta a+
\frac{\delta b}{Q}
\left[-\alpha^{-1}-\alpha(Q+2/3)+\frac23\alpha^2P\right].
\tag{10}
$$

Accordingly the polynomial allowance is bounded by the sum of four positive integrals: $(2C_r/3)\alpha^{10}$, $C_t\alpha^7$, $C_t\alpha^9|Q+2/3|$, and $(2C_t/3)\alpha^{10}|P|$. No cancellation between independent radial and transverse errors is used.

In (5), (9) and (10), the additional isotropic $2\nu$ remainder retains $1/Q$. Neither the subject numbers nor the independent polynomial-row additions include it. The finite-radius bound can control that factor, but it needs its own evaluated integral. Release, a rigorous literal-token enclosure, and conversion of vector variation to an angle also remain distinct. In particular a bound on vector variation is not itself an angle bound without a lower bound on $|z|$.

## Arithmetic independence and execution record

The [new reference instrument](../evidence/overnight2-a-reference-adiabatic-budget.py) imports only the frozen independent response engine. It declares the already frozen real-coordinate $J_j$, matches them against the newly disclosed subject coefficients, differentiates (4), (6) and (8) directly, and integrates individual monomials with Python Fraction arithmetic. It does not import the subject homological engine or bounds code. Only after computing fresh rational totals does it compare with the disclosed receipt. Equality at that final step is independent implementation evidence because the second producer and its coefficients were authored separately; the analytical validity of the majorant is supplied by (3).

Known mode checks three power integrals, the positive exponential-series logarithmic enclosure, signed monomial and parameter-convolution bounds, and the hand-derived vector row (7) with lower-order cancellation. These controls are requested before any target. The launch source SHA-256 is 7efb434b498ec5073d69728c70ed276a695c7774d205d2a1ee1e623bb4264634. The shared venv command uses -B, the linked instrument path, and --mode known, followed only after a recorded pass by --mode target. The coordinator supervises the sole CPU group with the declared 90-second internal, 120-second outer, 512 MiB and 1 MiB bounds.

I read the retained known receipt before the target receipt. Known mode passed all four groups at 07:01:11 UTC under coordinator lease 44f730da-4cfb-47d7-af3e-b1ee44f83701, with a closed process group, 0.09917583269998431 seconds instrument time and 0.336 seconds supervisor time. Target mode passed at 07:01:52 UTC under lease e9d72ca5-7ade-4eaf-b369-076ca6fa86d1, with a closed process group, 0.4796358342282474 seconds instrument time and 0.681 seconds supervisor time. The receipts and progress logs are retained under .local-data/master-equation-closure/overnight2-a/reference-adiabatic-budget-known.json and reference-adiabatic-budget-target.json. The source identity matches the launch identity.

The target's exact coefficient comparisons establish that all seven printed subject polynomials equal the frozen independent ones after $x=Q-1$, $y=P$. Its four independently computed rational totals equal the four subject receipt rationals exactly and satisfy the advertised caps by exact Fraction comparisons:

| Contribution | Decimal diagnostic of exact rational majorant | Accepted upper bound |
| --- | --- | --- |
| Account finite-polynomial residual | $3.3294216245294359\times10^{-21}$ | $3.33\times10^{-21}$ |
| Account polynomial response allowance | $2.8017237817192899\times10^{-14}$ | $2.802\times10^{-14}$ |
| Corrected-vector polynomial variation | $3.3286205032015276\times10^{-6}$ | $3.329\times10^{-6}$ |
| Phase-relation polynomial variation | $1.2988501125235295\times10^{-9}$ | $1.299\times10^{-9}$ |

The separately derived polynomial-row additions in (9) and (10) give exact rational majorants with decimal diagnostics $5.5780297607500293\times10^{-12}$ for vector variation and $5.1847567341653100\times10^{-10}$ for phase variation. Conservative upper bounds are $5.579\times10^{-12}$ and $5.185\times10^{-10}$, respectively. The receipt retains their full rational numerators and denominators. These additions were independently constructed here; the subject had explicitly excluded them. The remaining isotropic and release terms remain excluded.

## Preservation, limits and falsifiers

Native shasum -a 256 measured the following read-only inputs before assessment:

| Input | SHA-256 |
| --- | --- |
| Account subject | 13e3f870539f4e1cc068eaa035e85e46871af9619082c226577be7c221a40d88 |
| Budget subject | a536bec96dd9dee68371f5bef99e08a2c72306e246ab50fa2064b2bf8fb414c7 |
| Subject bounds instrument | a0b96c42349c3621c93edada3dfe08ad6ea8f7c13dc60690a21d5596c9157cbd |
| Frozen blind reference | aa8c8f77abd7a4d277c44e827f3c0277cda8a48c95641d65212c1ada0fe2bb12 |
| Frozen reference engine | 6307a2a1f9877bd67f4f87da3ce93f78701dbc7ed8f3df60305f36b3377aa68d |

Operator-checkable falsifiers are a nonzero coefficient difference in the new reference's subject comparison, a missing term in the direct derivatives, a failed exact rational cap comparison, a negative combined epsilon exponent treated with its upper endpoint, or loss of an actual source/domain premise. Failure of the separately excluded release or isotropic-forcing estimate blocks an actual total budget even if every polynomial majorant passes. This report makes no opening or fate claim.

**Disposition.** Accept the four subject caps as conditional bounds on their explicitly named contributions. No numerical correction is required. Preserve the complete inherited actual-response domain in addition to the convenient majorant box. The new vector and phase polynomial-row additions can be integrated separately using the bounds above; they do not settle the excluded isotropic forcing, release, actual angle conversion or literal phase enclosure.

**Validation and preservation.** Native shasum -a 256 after assessment reproduced all five input identities in the table and the new launch instrument identity. The established node document checker, invoked with this report's repository-relative path, passed its known controls first and then all 92 mathematical expressions and six local links, with no trailing-whitespace failure. Its scope is document syntax and destinations, not scientific acceptance. This assessment wrote only this new report and its new reference arithmetic source; no frozen subject, prior reference or shared report was edited.
