# Weber binding sphere, great-circle closure: second independent reading of Lemmas 17.1, 17.2, 18.1, 18.2 and 16.6a

Status: second referee reading, launch name "weber-binding-sphere great-circle second reading". Document read: [weber-binding-sphere-great-circle-closure.md](weber-binding-sphere-great-circle-closure.md), SHA-256 `e134723e81b68aeef574b82b8401642563323b4e8d76508d0e2174a262a785cf` (by `shasum -a 256`, equal to the expected value). Started 2026-10-07T00:08:54Z, verdict written 2026-10-07T00:15:00Z, deadline 2026-10-07T00:38Z. This file edits no existing file and makes no Git write.

## 1. Verdict table

| Item | Statement refereed | Verdict |
| --- | --- | --- |
| Lemma 17.1 | for non-parallel axes $z_1z_2P$ is never $c\,Q^2$ | confirmed |
| Lemma 17.2, Corollary 17.3 | irrational ratio: all zeros of even order would force $z_1z_2P=c\,Q^2$; hence an odd-order zero exists | confirmed |
| Lemma 18.1 | coprime odd $r:s$ with $s\ge3$ is never a square | confirmed, with one correction of presentation (phases in the last step) |
| Lemma 18.2 | $r:1$ with odd $r\ge5$ is never a square | confirmed |
| Lemma 16.6a | ratio $r/s$ with $r+s$ odd is never a square pair without collision | confirmed |

No defect was found. All five verdicts are graded derived: each proof was re-derived by hand, line by line, from $\mathbf X_i=c_i\mathbf n_i+a_i\mathbf e_i$ and the definitions of Section 16.2. The numerical checks of Section 7 below are measured spot checks by an instrument written for this reading, and they establish only that the closed forms and index conventions agree with the geometry on the sampled pairs; they are not part of any proof.

## 2. Lemma 17.1: confirmed

I re-derived (17.1) from $D=2R^2-2\mathbf X_i\cdot\mathbf X_j$ with $\mathbf e_i=\tfrac12(z_i\mathbf b_i+\bar{\mathbf b}_i/z_i)$: the five coefficients $p_{11}$, $p_{1,-1}$, $p_{10}$, $p_{01}$, $p_{00}$ and the reality relation $p_{-p,-q}=\bar p_{pq}$ are as printed. In the frame $\mathbf u_i=\mathbf u_j=\boldsymbol\ell$ one finds $\mathbf b_i\cdot\mathbf b_j=1-\cos\gamma$, $\mathbf b_i\cdot\bar{\mathbf b}_j=1+\cos\gamma$ and $\lvert\mathbf n_j\cdot\mathbf b_i\rvert=\sin\gamma$, and a change of phase origin multiplies each by a unit, so the four moduli are as printed.

The expansion of $Q^2$ gives exactly the seven coefficient equations stated, hence $p_{10}^2=4p_{11}p_{1,-1}$ and $p_{01}^2=4p_{11}p_{-1,1}$. Their moduli give $c_j^2=a_j^2$ and $c_i^2=a_i^2$ after division by $a_i^2\sin^2\gamma$ and $a_j^2\sin^2\gamma$, which are non-zero; the case $c_j=0$ needs no separate treatment because it would force $a_j=0$. With $c^2+a^2=R^2$ this is $a_i=a_j=R/\sqrt2$.

The final inequality is correct: $\lvert cq_{11}q_{00}\rvert=\sqrt{\lvert p_{11}\rvert\lvert p_{-1,-1}\rvert}=\lvert p_{11}\rvert$ and likewise $\lvert cq_{10}q_{01}\rvert=\lvert p_{1,-1}\rvert$, so $\lvert p_{00}\rvert\le a_ia_j(1-\cos\gamma)+a_ia_j(1+\cos\gamma)=R^2$, while $p_{00}\ge2R^2-R^2\lvert\cos\gamma\rvert>R^2$ because $\lvert\cos\gamma\rvert<1$.

Remark on scope. The lemma is stated for $z_1z_2P=c\,Q^2$ with $Q$ a polynomial, which is the form used in Lemmas 17.2 and 18.1. The broader form (a monomial times the square of a Laurent polynomial in $z_1^{1/2}$, $z_2^{1/2}$) reduces to it: after $z_k=w_k^2$ the polynomial $F(w_1^2,w_2^2)$ is not divisible by $w_k$, so the root is a polynomial $S$ in $w_1,w_2$ with $S(-w_1,w_2)=\pm S(w_1,w_2)$, and the odd sign would make $w_1$ divide $S$; hence $S$ is a polynomial in $z_1,z_2$. The proof uses only the moduli of the $p_{pq}$ and the value of $p_{00}$, so it is unchanged when $z_1,z_2$ are multiplied by unit constants.

## 3. Lemma 17.2 and Corollary 17.3: confirmed

Divisibility: $z_1$ divides $F$ only if $p_{-1,q}=0$ for all $q$, and $p_{-1,1}\ne0$; likewise for $z_2$ with $p_{1,-1}\ne0$. An irreducible polynomial with one monomial is a multiple of $z_1$ or $z_2$, so each $F_k$ has at least two monomials. Injectivity of $\varphi$ on the complex $T$ plane holds because $\varphi(T)=\varphi(T')$ forces $\omega_i(T-T')$ and $\omega_j(T-T')$ into $2\pi\mathbb Z$.

The vector-field step is correct. $V$ is diagonal on monomials, so $VF_k$ has degree at most that of $F_k$ in each variable, and a quotient $VF_k/F_k$ is a constant $\lambda$ (zero included). Then every monomial of $F_k$ has multiplier $\lambda$, and by irrationality the multipliers $i(a\omega_i+b\omega_j)$ are pairwise different, so $F_k$ would be a single monomial. Since $F_k$ is irreducible and does not divide $VF_k$, the two have no common component.

The three standard facts are used correctly and, together with unique factorization in $\mathbb C[z_1,z_2]$ and the injectivity of $\varphi$, they are sufficient. Hadamard applies because an exponential sum has order at most one; a function $p(T)e^{aT+b}$ cannot equal a sum of two or more exponentials with distinct frequencies and non-zero coefficients, by the linear independence of the $T^ne^{\lambda T}$; finiteness of common zeros is applied twice, to the pair $F_k,F_l$ and to the pair $F_k,VF_k$, each without common component. Infinitely many zeros, less finitely many multiple ones and finitely many shared ones, leaves a simple unshared zero $T_0$ of each $f_k$, where the order of $D_{ij}$ is $m_k$. The degree bound on $Q$ follows from the degree of $F$.

The corollary follows by contraposition with Lemma 17.1, and the equivalence of "square of an entire function" with "every zero of even order" is the standard one on the simply connected plane. The rate ratio is the inverse radius ratio by $\lvert\omega_i\rvert a_i=v$, so "irrational radius ratio" is the hypothesis of the lemma.

## 4. Lemma 18.1: confirmed, with one correction of presentation

Setting. The assertion that an entire root is $g=\sum_{\lvert k\rvert\le m}g_k\zeta^k$ is not argued in the text but is correct by the argument of Lemma 16.6a: $\zeta^{r+s}D$ is a polynomial of degree $2(r+s)$ with non-zero end coefficients, all its roots have even multiplicity, and $r+s=2m$ is even. Since $g^2=D\ge0$ on the real axis, $g$ is real there with or without collision, which gives $g_{-k}=\bar g_k$; then $h_{r+s-k}=g_{k-m}/g_m=\bar h_ku$ as in (18.2), and $u=h_{r+s}$. The exponents of $E$ are $r(1-p)+s(1-q)$, that is $ra+sb$ with $a,b\in\{0,1,2\}$.

Index bookkeeping. For $0<k<r$ with $s\nmid k$, $e_k=0$ and every product $h_ih_{k-i}$ has a factor with index not divisible by $s$, so $h_k=0$ by induction. Applying (18.2), $h_k=0$ for $s<k<r+s$ unless $k\equiv r$ modulo $s$. I checked each range: $0<k<s$ gives zero; $k=s$ is free; $s<k<r$ would need $s\mid k$ and $s\mid(k-r)$, hence $s\mid r$, impossible for coprime $r,s$ with $s\ge3$; $k=r$ is free; $r<k<r+s$ gives zero; $k=r+s$ is $u$. So $H=1+h_sx^s+h_rx^r+ux^{r+s}$.

Distinctness. $ra+sb=ra'+sb'$ gives $(a-a')r=(b'-b)s$ with $\lvert a-a'\rvert\le2$ and $\lvert b-b'\rvert\le2$; coprimality gives $s\mid(a-a')$, so $a=a'$ and $b=b'$ when $s\ge3$. The nine exponents are distinct and the one-variable identity lifts to $\tilde Q^2=\tilde E$ in the two variables $X,Y$. (They are also distinct for $s=1$, $r\ge3$; the hypothesis $s\ge3$ is needed for the vanishing step, not for distinctness.)

Correction of presentation. The last step writes $X=1/z_1$, $Y=1/z_2$, while $z_1,z_2$ of Section 17.2 carry the phases $e^{i\phi_i}$, $e^{i\phi_j}$; with phases $X=e^{i\phi_i}/z_1$, $Y=e^{i\phi_j}/z_2$ and $d_{r+s}=p_{11}e^{i(\phi_i+\phi_j)}$. The conclusion is unaffected, because Lemma 17.1 is invariant under multiplication of $z_1,z_2$ by unit constants (Section 2 above). One sentence saying so, or the choice $\phi_i=\phi_j=0$ absorbed into $\mathbf b_i,\mathbf b_j$, would close the gap.

## 5. Lemma 18.2: confirmed

Coefficients. With member $j$ on the larger circle (rate $\omega_0$) and member $i$ at rate $r\omega_0$, in the frame of Lemma 16.7 I obtain $p_{10}=-ic_ja_i\sin\gamma$ and $p_{01}=ic_ia_j\sin\gamma$, hence $e_1=p_{10}/p_{11}=2i\beta\kappa$, $e_2=p_{1,-1}/p_{11}=\kappa^2$, $e_r=p_{01}e^{-i\phi}/p_{11}=-2i\beta_i\kappa e^{-i\phi}$, as printed. From $a_j=ra_i$ and the common sphere, $\beta_i^2=r^2(1+\beta^2)-1$, so $\lvert\beta_i\rvert>r\lvert\beta\rvert$ and $\beta_i\ne0$.

Recurrence. For $S=\sqrt q$, $q=1-2\beta y-y^2$, the equation $qS'=\tfrac12q'S$ gives at order $y^n$ the relation $(n+1)\tau_{n+1}-2n\beta\tau_n-(n-1)\tau_{n-1}=-\beta\tau_n-\tau_{n-1}$, which is the printed recurrence; $\tau_2,\tau_3,\tau_4$ are as printed. With $x=iy/\kappa$ one has $2i\beta\kappa x=-2\beta y$ and $\kappa^2x^2=-y^2$, so $h_n=(-i)^nt_n$ for $n\le r-1$.

(P1). For $2\le k\le r-1$ both indices $k$ and $r+1-k$ lie in the Taylor range, and (18.2) gives $t_{r+1-k}=i^{r+1}u\,t_k=(-1)^mu\,t_k$; $\epsilon$ is real because $t_2\ne0$. The recurrence at $n=r-2$ with $t_{r-1}=\epsilon t_2$, $t_{r-2}=\epsilon t_3$, $t_{r-3}=\epsilon t_4$ (the last needs $r\ge5$), divided by $\epsilon\tau_2\kappa^2$, is (P1).

(P2). $e_r=2(h_r-\sigma_r)$ is correct because the full square root has no $x^r$ term and agrees with $H$ below degree $r$; $h_r=\bar h_1u=-i\beta\kappa u$; the recurrence at $n=r-1$ gives the printed $rt_r$; $(-i)^r=(-1)^mi$ for $r=2m-1$; hence $\sigma_r=-i\beta\kappa uW$ and $e_r=-2i\beta\kappa u(1-W)$ with the printed $W>0$. Then $\lvert\beta\rvert\lvert1-W\rvert=\lvert\beta_i\rvert$, the case $\beta=0$ is impossible, and otherwise $W>r+1$, which is (P2) with strict inequality.

Bounds. For $r=5$: $t_4=\epsilon t_2$ gives $\epsilon=1$ and $\kappa^2(1+5\beta^2)=4$, consistent with (P1); for $\beta\ne0$ the left side of (P2) is strictly below $4(7+8)=60$. For $r\ge7$: the three bounds from (P1) are correct and each is largest at $r=7$; the left side of (P2) is at most $(2r-3)(2\sqrt2+\tfrac23)+9.6(r-3)=16.5902\,r-39.2853$, which is below $16.6\,r-39.3$ for $r>1.5$, and $2r^2-14.6r+39.3$ has discriminant $213.16-314.4<0$. In both cases (P2) fails.

## 6. Lemma 16.6a: confirmed

The exponent $r+s$ arises only from $z_1z_2$, so the end coefficients are non-zero for non-parallel axes (in the description with both rates positive). Even multiplicity of all roots gives $D=\alpha w^{-(r+s)}Q(w)^2$; every entire root is $\pm g$, and $g(T+2\pi/\omega_0)=-g(T)$ for $r+s$ odd. Without collision $g$ is real and non-zero on the real axis, which contradicts the sign change. The proof does not use that $r/s$ is in lowest terms beyond fixing the parity of $r+s$.

## 7. What was computed

Instrument: [weber-binding-sphere-gc-second-reading-check.mjs](../evidence/weber-binding-sphere-gc-second-reading-check.mjs), written for this reading in plain Node 26 with no dependency, independent of the author's scripts and of the first review; receipt [weber-binding-sphere-gc-second-reading-check.json](../evidence/weber-binding-sphere-gc-second-reading-check.json). Commands, run in the evidence directory: `node weber-binding-sphere-gc-second-reading-check.mjs --known-only`, then `node weber-binding-sphere-gc-second-reading-check.mjs`.

Known cases, run first and passed: the Taylor coefficients of $\sqrt{1-y^2}$ from the recurrence at $\beta=0$ (exact); the recurrence against series squaring for $200$ random $\beta$ through order $20$ ($7.2\times10^{-16}$); two great circles about perpendicular axes, where $D=2-2\cos\theta_i\cos\theta_j$ by hand, pointwise and through the torus transform ($9.7\times10^{-16}$). Disclosure: two earlier invocations of a first draft of the script, before the geometric known case was added, ran the target checks in the same invocation as the first two known cases; the gated order was run afterwards and gave the same conclusions.

Targets, all measured by this instrument on the sampled pairs only. Moduli of (17.1) and absence of other torus coefficients on $300$ random pairs: $1.8\times10^{-15}$ and $2.0\times10^{-15}$. For $r=5,7,9$ on $150$ random pairs each: $e_1,e_2,e_r$ against the closed forms and $e_3,\dots,e_{r-1}=0$, relative error at most $4.0\times10^{-11}$; bottom-up $h_n$ against $(-i)^nt_n$ for $n<r$, at most $3.2\times10^{-10}$. On the curve (P1), over $\beta^2\in[0,400]$, the supremum of the left side of (P2) is $60.0$, $63.11$, $76.35$ at $\beta=0$ against the required excess over $60$, $112$, $180$. For $5:3$, $7:3$, $7:5$ on $200$ random pairs each: no coefficient of $D$ off the stated exponents ($2.9\times10^{-15}$) and $h_k=0$ below $r$ off the multiples of $s$ ($4.4\times10^{-11}$); the nine exponents $ra+sb$ are distinct for every coprime odd pair with $s\le41$, $r\le61$. Agreement of these numbers with those printed in the document is agreement between two separately written instruments on the same closed forms; it does not test the logical steps of the proofs, which rest on the hand derivation.

## 8. What was not read and what this reading does not establish

Not read: the first review file (weber-binding-sphere-great-circle-closure-review.md), every script and receipt named weber-binding-sphere-gc-* other than my own, and Sections 1 to 15, 16.1, 16.5 to 16.8, 17.4 to 17.6, 18.1, 18.3, 19 and 20 of the document. Section 16.3 and Lemmas 16.5 to 16.8 of Section 16.4 were read for context only and are not refereed here; the claim-grade blocks of Sections 17.3 and 18.2 were read, so the author's reported numbers were visible to me before my own run.

This reading confirms five local statements about when $D_{ij}$ can be a square. It does not confirm Theorem 18.3 or the six-member statement: those also rest on Lemmas 16.2 to 16.4, 16.7, 16.8 and 17.4 and on the steps of Theorem 16.9, none of which I refereed. The case list in the proof of Theorem 18.3 (parallel axes; irrational; odd sum; $1:1$; $3:1$; $s\ge3$; $r:1$ with $r\ge5$) is exhaustive as arithmetic, which is all I checked of that proof. Falsifier for this reading: a pair about non-parallel axes, with irrational ratio or with coprime odd ratio other than $1:1$ and $3:1$, whose $D$ has only zeros of even order; or an error located in any line of Sections 2 to 6 above.
