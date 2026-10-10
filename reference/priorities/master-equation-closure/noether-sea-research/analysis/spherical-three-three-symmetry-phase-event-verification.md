# Independent verification of the orthogonal-circle phase-event exclusion

## Subject, method and verdict

This separately authored verification concerns only [Two exact event controls exclude all relative phases below wake speed](spherical-three-three-review.md#two-exact-event-controls-exclude-all-relative-phases-below-wake-speed) and its necessary geometry/root hypotheses. The review file was read as the subject claim; its phase pilot, numerical outputs and dynamics implementation were not inspected. The verification derives the five partner contributions from cyclic Cartesian basis vectors and the canonical transmitter-weight law. It does not replay a numerical result or modify either subject or reference instrument.

**Verdict: the stated collision-free relative-phase exclusion is correct on its declared ordinary sub-wake-speed domain.** The event delays, transmitter factors, signs, cyclic contradiction and radius/coupling factors all agree with the independent reconstruction below. The result excludes this precise prescribed common-speed, common-winding, orthogonal-great-circle family with antipodal opposite polarities under normal-only support. It supplies no exclusion of arbitrary six-member spherical motion, opposite windings, nonuniform speeds, singular continuation or free physical assembly. Coordinator acceptance and integration remain separate actions.

## Basis construction and root census

Take cyclic orthonormal basis vectors $\mathbf e_0=\mathbf e_x$, $\mathbf e_1=\mathbf e_y$, $\mathbf e_2=\mathbf e_z$, with indices interpreted modulo three. At numerical $c_f=1$, let the complete prescribed positive-polarity histories be

$$
\mathbf X_i(T)=R[\mathbf e_i\cos a_i(T)+\mathbf e_{i+1}\sin a_i(T)],
\qquad
a_i(T)=\Omega T+\phi_i,
\qquad
\Omega=\frac\beta R,
$$

and let their three negative-polarity partners be $-\mathbf X_i(T)$. Here $R>0$, $0<\beta<1$, and $K_{\mathrm{int}}>0$. Each member has speed $\beta$ and a complete bounded past. The positive oriented unit tangent is $\mathbf t_i=-\mathbf e_i\sin a_i+\mathbf e_{i+1}\cos a_i$; it is the velocity direction because $\Omega>0$.

For a fixed receiver event and a partner source $j$, put $H(u)=u-|\mathbf X_i(T)-\mathbf X_j(T-u)|$, with $u>0$ the physical delay. Away from zero separation, $H'(u)=1-\hat{\mathbf r}\cdot\mathbf V_j(T-u)\ge1-\beta>0$. More generally the global Lipschitz speed bound gives the same strict monotonicity across any zero-distance point without differentiating its norm. When the simultaneous partner separation is positive, $H(0)<0$, while $H(2R)\ge0$. Thus there is exactly one positive-delay root for every partner, including a possible endpoint root at $2R$. Its transmitter factor is at least $1-\beta$, so every such root is simple.

The same speed bound gives $|\mathbf X_i(T)-\mathbf X_i(T-u)|\le\beta u<u$ for every $u>0$. There are no positive-delay self roots. Their exclusion is derived, not imposed. Consequently a collision-free event has exactly five directed partner roots for each receiver and no self contribution.

The exact collision domain follows independently from

$$
\frac{\mathbf X_i\cdot\mathbf X_{i+1}}{R^2}
=\sin a_i\cos a_{i+1}
=\frac12\left[\sin(a_i+a_{i+1})+\sin(a_i-a_{i+1})\right].
$$

As time traverses a period, the first sine covers $[-1,1]$ and the second is constant. Including antipodes means the largest possible absolute scalar product is $[1+|\sin(\phi_{i+1}-\phi_i)|]/2$. Taking the nearest of the inter-plane pairs gives

$$
\frac{d_{\min}^2}{R^2}=1-\max_i|\sin(\phi_{i+1}-\phi_i)|.
$$

The own-circle antipodes have distance $2R$. Thus collision freedom over the complete period requires and is equivalent to no cyclic phase difference being $\pi/2$ modulo $\pi$. The root lower bound is $u\ge d_{\min}/(1+\beta)$ by triangle inequality. At a partner coincidence $H(0)=0$ and strict monotonicity leaves no positive root for that ordered pair; the positive-root count therefore cannot be extended through that event unchanged. This verification does not supply a coincidence or event-continuation law.

## The shared own-circle contribution

Rotate coordinates with the receiver's event phase so its position is $R\mathbf e_i$ and its tangent is $\mathbf e_{i+1}$. Its negative-polarity own-circle source, evaluated a delay $u$ earlier, is

$$
-R\mathbf e_i\cos(\Omega u)+R\mathbf e_{i+1}\sin(\Omega u).
$$

Let $\xi=\Omega u/2$. Since $u\le2R$ and $\beta<1$, one has $0<\xi\le\beta<1$ and $\cos\xi>0$. The causal chord length is $2R\cos\xi$, so

$$
u=2R\cos\xi,
\qquad \xi=\beta\cos\xi.
$$

The latter equation has exactly one positive root: $\xi-\beta\cos\xi$ has positive derivative on $[0,\beta]$, is negative at zero and positive at $\beta$. At that root, the transmitter velocity has scalar product $-\beta\sin\xi$ with the chord's unit direction, giving $D_t=1+\beta\sin\xi$. The chord's tangent projection is $-R\sin(2\xi)$, and the negative polarity product reverses it. Hence the canonical own-circle tangent contribution is

$$
\frac{K_{\mathrm{int}}}{R^2}C(\beta),
\qquad
C(\beta)=\frac{\sin\xi}{4\cos^2\xi(1+\beta\sin\xi)}>0.
$$

This value is independent of the receiving circle and its event phase. Its shared value, rather than a particular numerical magnitude, is what the cyclic contradiction needs.

## Two event projections, with all sources accounted for

### Receiver phase zero

At $a_i=0$, the receiver is $R\mathbf e_i$ and $\mathbf t_i=\mathbf e_{i+1}$. The next-plane positive source lies in the perpendicular plane spanned by $\mathbf e_{i+1},\mathbf e_{i+2}$. Both members of that antipodal pair have constant distance $\sqrt2R$ from the fixed reception point for every emission time. Therefore both exact roots have delay $\sqrt2R$ and both transmitter factors are one: the source velocity is orthogonal both to the receiver axis and to its own radius vector.

Let $\Delta_i=\phi_{i+1}-\phi_i$ and $b=\sqrt2\beta$. The next-plane positive emission phase is $\Delta_i-b$. Its positive-source chord projects as $-R\cos(\Delta_i-b)$ on the tangent. The negative source has the opposite chord projection but also the opposite polarity product, so its signed tangent contribution is the same. Adding the two gives $-(K_{\mathrm{int}}/R^2)\cos(\Delta_i-b)/\sqrt2$.

The previous-plane pair has source coordinates only in $\mathbf e_{i+2},\mathbf e_i$. Both projected chord numerators along $\mathbf e_{i+1}$ vanish identically, regardless of their individual root times and weights. They still contribute to the other vector components and retain their ordinary roots. Together with the own antipode and the empty self-root set, this accounts for every source. The complete tangent value is

$$
a_i^{(0)}=\frac{K_{\mathrm{int}}}{R^2}\left[C(\beta)-\frac{\cos(\Delta_i-b)}{\sqrt2}\right].
$$

### Receiver phase one quarter turn

At $a_i=\pi/2$, the receiver is $R\mathbf e_{i+1}$ and its positive tangent is $-\mathbf e_i$. Now the previous-plane pair is perpendicular to the receiver position, so both delays are $\sqrt2R$ and both transmitter factors are one. Its positive emission phase is $\pi/2+\phi_{i-1}-\phi_i-b$. The same signed-pair summation gives a tangent contribution proportional to the sine of that emission phase; therefore it equals $+(K_{\mathrm{int}}/R^2)\cos(\phi_{i-1}-\phi_i-b)/\sqrt2$. The next-plane pair has zero tangent projection because neither its sources nor the receiver have any $\mathbf e_i$ component. The own antipode again contributes the same positive $C$, and self roots are again absent. Thus

$$
a_i^{(\pi/2)}=\frac{K_{\mathrm{int}}}{R^2}\left[C(\beta)+\frac{\cos(\phi_{i-1}-\phi_i-b)}{\sqrt2}\right].
$$

The reversal of the tangent coordinate at the quarter-turn event is essential to this plus sign. Omitting it would destroy the correct paired equations. All zero-projection terms are zero because their numerators vanish, not because their roots were dropped or their denominators were approximated.

## Incompatible cyclic conditions

Each prescribed member follows a constant-speed great circle. Its prescribed acceleration is entirely normal to the sphere, and the authorized support is also normal. Therefore an exact solution requires every displayed along-path acceleration to vanish; possible failure of the other tangent component is an additional obstruction and cannot repair these necessary conditions.

Pair the zero-phase event for member $i$ with the quarter-turn event for member $i+1$. Since $K_{\mathrm{int}}/R^2>0$, the pair requires

$$
\cos(\Delta_i-b)=\sqrt2C,
\qquad
\cos(\Delta_i+b)=-\sqrt2C.
$$

Adding gives $2\cos\Delta_i\cos b=0$. The interval $0<\beta<1$ gives $0<b<\sqrt2<\pi/2$, so $\cos b>0$ and $\cos\Delta_i=0$. Each cyclic difference must therefore be an odd multiple of $\pi/2$. This already lies on the complete-history collision boundary above. Independently, the three exact differences telescope to zero, while a sum of three odd multiples of $\pi/2$ cannot be zero modulo $2\pi$. Thus no three relative phases satisfy all six necessary event conditions. This is an algebraic inconsistency; no magnitude bound, root-search tolerance or phase grid is needed.

The contradiction uses events at different absolute times for different receivers. That is legitimate because the candidate is an all-time prescribed solution and must satisfy the equation at every event. It would not by itself exclude a finite piece of history that does not contain the required events. Positive $\beta$ ensures every receiver reaches both event phases. At $\beta=0$, the trajectories are stationary and the two-event argument cannot be asserted by substituting zero into its formulas without separately supplying those events. At or above wake speed, this verification does not carry over the root census or no-self proof. Reversing one circle's winding changes the emission phases and the shared-event argument and is outside the theorem.

## Radius, coupling and claim boundary

The full reconstruction kept $R$ explicit. Each special cross-plane delay is $\sqrt2R$ at $c_f=1$, the delay phase is $\Omega\sqrt2R=\sqrt2\beta$, and each acceleration projection has the common positive factor $K_{\mathrm{int}}/R^2$. Neither radius nor positive coupling can change the cyclic sign equations. This parameter independence is an exclusion property, not a claim that exact moving solutions generally rescale at fixed constants. Restoring symbolic $c_f$ makes the delay $\sqrt2R/c_f$ and defines $\beta=s/c_f$; no numerical wake speed other than one is used.

The result is **derived and independently reconstructed** for the named collision-free, uniformly rotating, common-positive-winding orthogonal-circle family. It does not require a simultaneous transitive symmetry after arbitrary phase shifts. It cannot be used as a general spherical existence, stability, energy quantization, confinement or Noether sea result. A global flip of all polarities leaves the products unchanged; a half-turn phase change on one circle alone changes that circle's polarity placement and is not silently quotiented out. The proof permits all phase values before deriving their impossibility, so it needs no such identification.

An explicit falsifier is a corrected signed source contribution that changes one event equation under these exact assumptions, an admitted positive self root despite the strict global speed bound, or a phase triple satisfying all six equations. The displayed basis, root and projection formulas identify where to check each possibility. No discrepancy was found in this verification.

## Preservation and checks

At subject inspection, `shasum -a 256` measured `spherical-three-three-review.md` as `11744f27ead009da21032443b591c2bb6f67c906e39c6fed3b3ec24d36b1b438`. This is the inspected snapshot identity, not a promise that its author will not append later review. The only write in this slice is this new symmetry-prefixed companion. The subject review, dynamics files, earlier frozen symmetry reports, numerical instruments and shared synthesis were not edited. No numerical computation, parser, oracle modification, external lookup or heavy job was used.

The durable evidence is the complete second-side derivation above. There is no bulky evidence or owned job to retain or close. The assigned theorem verification is complete; the next dependency is coordinator integration of this verdict with the reviewer-authored theorem. The remaining all-time spherical existence questions are outside this bounded check.

Document checks: `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics, with exit 1 recording its difference from the empty file. Scoped `rg` confirmed the linked theorem heading in the subject. `shasum -a 256` confirmed that the two earlier frozen symmetry reports retained their previously reported identities, respectively `ef75a6c34bba1e802433a5155e154d249959cb55f966bc7ebea99a538a6a3a51` and `22d79fc49b614085b71022376433eac229cca4aca2046dbfceb3554ae1fc3a6e`. These checks establish document hygiene and preservation, not the theorem; the separate derivation supplies the mathematical check.
