# Assessment of the frame-free correction and transition obstruction

**Derived assessment, 2026-10-07.** Ramon E. Moore lens. The reviewed frozen subject is [the frame-free attempt](authorized-cases-two-hour-d-secondary-frame-free-attempt.md), SHA-256 `1101120a599c3b34fd02865c9f7d7d440a1904408cd8451dd6905aaec822f11b`. My [midpoint obligation reference](authorized-cases-two-hour-d-reference-midpoint-obligation.md), SHA-256 `23f053c19503da87e8889da03114040fb9ac45cdc24f2a0ef4efab3534c4952d`, was frozen before access to this result. The new correction and sector constants were reconstructed after disclosure; this is not a blind derivation of those same constants.

**Accept at the stated partial scope:** the exact nonsingular correction, the one-pass radial impulse bound, the full-spatial angular-sector estimate without assuming $H'>0$, and the exact account conversion at $\Lambda=1$. They do not establish global midpoint control or settle the remaining negative-account actual branch.

## 1. Exact correction and controls

The subject uses $B=(1-u/2)I+NU^{\mathsf T}$ and $P_c=BY$. The bound $\|B-I\|\le(3/2)|U|\le.03$ proves uniform invertibility, including at $H=0$. Substituting the exact relative equation and the already accepted corrected midpoint equation into $B'Y+BY'$ gives

$$
P_c'=\left[\frac{vU^{\mathsf T}-|v|^2I/2}{d}
+ku\Pi_N+NF_*^{\mathsf T}-\frac{N\cdot F_*}{2}I\right]Y+B\mathcal R.
$$

In particular, the leading reflection cancels. The two displayed matrix-product identities in the subject sum to $u\Pi_N$, with the stated sign. This also follows by writing $P_c=(1-u/2)Y+N(Y\cdot U)$ and using the independently derived scalar identity for $(Y\cdot U)'$. The radial affine control conserves $(1+u/2)Y$ in its declared radial direction, so it checks the factor one-half rather than merely the existence of some correction.

The centrifugal matrix is not sign-definite. With $u=0$ and $U=|v|T$ its two planar diagonal entries have opposite signs, as stated. The estimate $|F_*|\le2.1kM^2+11k\chi$ follows from the exact anisotropic term, the retained bound on $Q$, and the actual relative remainder. Thus replacing these terms by absolute values would still require an unweighted $\int k$ contribution. The reference's comparison control satisfies the scalar budget and the homogeneous midpoint equation but fails the actual relative equation by an order-$k$ term; it neither refutes this improved correction nor supplies an actual counterexample.

The rotating matrix control is exactly constant only for vectors in its specified rotating plane. If a normal component is included, it decays and contributes $-2k|Y_\perp|^2$ to the quadratic-form derivative, so the form is nonincreasing rather than constant. The actual three-dimensional calculation below retains that component. This is a scope clarification to the control, not a change to the claimed physical domain.

## 2. The radial and angular estimates

For $\Lambda\le1$, the exact radial equation gives

$$
\frac{u'}k\le1-2(.9999)+.02+\frac{6.26}{15000}<-.97.
$$

The bound on $Q_r$ uses $|v|^2\le\chi$, and the actual error is retained. Hence the stated integral of $k$ over any connected radial-sector interval is bounded by its actual decrement in $u$. Repeated intervals cannot be summed using a current bound on $|u|$ alone; intervening positive resets are a genuine additional quantity.

For $\Lambda\ge1$, $\mu=K/H\le\sqrt\chi<.009$, so the angular quadratic form is coercive. Reconstructing its exact derivative separates the angular terms as a linear expression in $AB_t$ minus the stated positive multiple of $(AB_t)^2$. The ratio of the tangential affine/error correction to $kH$ is below $.07$. Completing the square therefore gives

$$
\frac14 k\chi g\alpha(1+.07)^2<.3k\chi.
$$

This operation does not assume $H'>0$: the anisotropic part of $H'$ is precisely the retained negative square. The spatial normal coefficient is strictly negative under $\Lambda\ge1$, $M\le.01$ and $g,\alpha>.99$. The unfactored normal delayed term is at most $6k\chi M^2/\Lambda$, and the corrected-midpoint remainder is at most $198k\chi M^2$. Their sum is at most $.0204k\chi$, so the subject's looser $S_a'<k\chi$ bound is valid in three dimensions. No independent angular floor was inserted.

Both sector results are local statements on the original negative-account chart, with complete strict histories and the adopted $t>4d$ source condition. Their use does not prove that the actual solution stays on that chart forever. The historical midpoint supremum is retained in every remainder.

## 3. Exact conversion and the missing signed sum

At $\Lambda=1$, multiplying the displayed triangular matrix $B$ by its transpose gives

$$
|P_c|^2-S_a
=u\,Y^{\mathsf T}A_NY
+\frac{u^2}{4}|Y|^2+\chi(Y\cdot T)^2
+u\sqrt\chi(Y\cdot N)(Y\cdot T).
$$

The remainder coefficient is below $1.01+1+\sqrt{4.04}/2<3.1$. Including the leading term, $\chi\le1/15000$ gives an unsigned conversion cost below $2.1\sqrt\chi|Y|^2$. Thus the quoted order is correct. Account conversion at opposite crossings does not automatically cancel it: both the orientation and the transported midpoint vector change, and the conversion direction reverses.

The scalar sequence $\chi_n=\chi_0/(n+1)^2$ does prove the stated distinction between summable $\chi_n^{3/2}$ and nonsummable $\sqrt{\chi_n}$. It is only an information/majorant control. The subject supplies no actual cycle timing or trajectory realizing that sequence, and this assessment accepts none. The concrete remaining obligation is a signed bound on the conversion terms and radial resets, or a single coercive account that cancels them through actual evolution. Finite account budget alone does not supply that bound.

## 4. Provenance, scope and closure

The coordinator and author clarify that the nonsingular $P_c$ correction was derived and reported before the coordinator suggested the radial/angular partition. The later partition work was coordinator-assisted. The subject's broad sentence saying the equations were then derived should be read with that narrower chronology. No source is altered to erase the distinction.

This final attempt adds exact identities and usable sector estimates. It does not prove global midpoint boundedness, first account crossing, a signed radial-entry witness, a unit-speed event or failure of the actual physical solution. The previously accepted first-zero branch and positive-terminal theorem remain separate from the unselected negative-first-$L$ branch.

Falsifiers are a missing term in the matrix differentiation, loss of the normal delayed contribution in the angular estimate, a transition matrix with a different leading sign, or a proven actual signed pairing that removes the present obstruction. The latter would supply new mathematical input rather than follow from the sequence control. Known-first document checks cover only syntax and local files. No scientific process, new physical preparation, numerical target or frozen-source mutation was used. This closes the final assigned mathematical assessment.
