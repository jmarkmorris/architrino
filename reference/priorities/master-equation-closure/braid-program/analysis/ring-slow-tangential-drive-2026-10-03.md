# A smooth tangential preparation still excites the ring's growing modes

## Result and scenario

A smooth positive tangential input of arbitrarily long but finite duration excites every retained positive growth witness whose tangential numerator has been certified nonzero. Making this particular pulse slower does not remove those growing components or turn the linear post-pulse response into pure ring-down. **Grade: derived conditional linear response**, using the exact ring balances, complete causal ledgers and simple positive-root/numerator certificates of the [family stability owner](ring-family-symmetric-stability-2026-10-03.md). A separate adjudication of the pulse argument remains required.

The pulse's temporal transform has no zeros anywhere in the open right half-plane. For an unknown complex growing root, excitation nevertheless also requires a nonzero spatial response numerator. No complete complex root count or numerator census is assumed here. A generic nonnegative pulse guarantees non-cancellation at real positive roots; it need not do so at complex roots.

An external acceleration is expressly applied during the preparation interval only. The unchanged Master Equation supplies the remaining acceleration throughout and supplies all acceleration after the pulse ends. All ordinary positive-delay self hits are included, $K=c_f=1$ in numerical values, and no cap, receiver factor, event rule, root deletion or primitive mass is added. No forced nonlinear evolution is run.

## 1. Concrete pulse and endpoint compatibility

In each member's common reference-rotating tangential direction $e_2$, prescribe

$$
f(T)=\frac{\delta V}{L}\left[1-\cos\left(\frac{2\pi T}{L}\right)\right],
\qquad 0\leq T\leq L,
$$

and zero outside that interval, with $L>0$. The physical added acceleration on member $i$ is $Q(\Omega T+\alpha_i)e_2 f(T)$. The full driven equation is the baseline received acceleration plus this declared external term. The parameter $\delta V$ is the time-integral of the imposed acceleration, not the actual net member-velocity change in the presence of delayed feedback.

The pulse satisfies $f=f'=0$ at both endpoints and $\int_0^L f\,dT=\delta V$. It is globally continuously differentiable; its second derivative has an endpoint jump. There is no velocity impulse. Start from the exact circular past and its compatible endpoint. At $T=0$, the extra acceleration vanishes, so the baseline compatibility condition holds. At $T=L$, the extra acceleration again vanishes, so the driven history's endpoint acceleration agrees with the baseline functional and permits the baseline continuation. The history during the pulse solves the driven equation, not the autonomous baseline equation; declaring that preparation is essential.

For each fixed finite $L$, sufficiently small $|\delta V|$ gives a local ordinary-chart driven response by the same finite-delay method of steps. This existence statement does not provide a numerical admissible amplitude. Source arguments remain on the existing chart only while its delay, range, signed-factor and complement margins hold.

**Grade: derived pulse and compatibility properties. Falsifier:** a nonzero endpoint value or derivative, an incorrect input area, or a purported post-pulse history violating its actual baseline compatibility condition defeats the corresponding statement.

## 2. Exact temporal transform and non-cancellation

Put $a=2\pi/L$. Direct integration of the exponential and cosine terms yields

$$
\widehat f(z)=\int_0^L e^{-zT}f(T)\,dT
=\frac{\delta V}{L}\frac{(1-e^{-zL})a^2}{z(z^2+a^2)}.
$$

At $z=0$ and $z=\pm ia$ the displayed singularities are removable, because the finite-duration integral is entire. In the open right half-plane none of these three points occurs, $a^2\ne0$, and $|e^{-zL}|<1$. Hence $1-e^{-zL}\ne0$, and this specific transform has no right-half-plane zero whenever $\delta V\ne0$.

For a real $\lambda>0$ and $\delta V>0$, the same result is also the direct positive integral $\widehat f(\lambda)=\int_0^L e^{-\lambda T}f(T)dT>0$. More generally any nonzero nonnegative integrable pulse has a strictly positive transform at each real $\lambda>0$. The positivity proof uses no particular cosine shape. It does not extend to complex $z$: oscillatory phases can cancel a generic nonnegative pulse there.

With zero displacement past and zero initial displacement and velocity, the common ordinary-chart linear response obeys

$$
\widehat u(z)=A(z)^{-1}e_2\widehat f(z).
$$

At a simple positive characteristic root $\lambda$, its pole residue is

$$
r_\lambda\widehat f(\lambda),\qquad
r_\lambda=\frac{\operatorname{adj}A(\lambda)e_2}{\partial_z\det A(\lambda)}
=\frac{(-A_{12}(\lambda),A_{11}(\lambda))^{\mathsf T}}{\partial_z\det A(\lambda)}.
$$

The family owner separately encloses a nonzero numerator and nonzero derivative on its retained simple positive witnesses. Therefore neither the spatial factor nor the pulse factor cancels those poles. The formal post-pulse motion retains their growing exponential components. An amplitude of either sign changes the component's sign but does not remove it.

This is stronger than observing positive roots alone, and weaker than a nonlinear fate theorem. The response cannot consist solely of decaying modes or a neutral shift once its certified growing residues are nonzero. It also cannot be interpreted as merely changing to an adjacent rigid speed rung: those rungs are discrete, and the [T04 coupled deformation certificate](../evidence/2026-09-02-planar-three-binary-coupled-box-certificate.md) excludes a local rigid radius-and-phase bridge in its declared box. Breathing or more general shape branches outside that box remain a different question.

**Grade: derived linear pole-excitation conclusion conditional on the numerator and simple-root certificates. Falsifier:** a zero numerator at the root, a failed characteristic certificate, a pulse-transform zero in the claimed domain, or a different Laplace first variation invalidates the corresponding conclusion. A nonlinear trajectory need not follow the linear exponential after leaving the chart.

## 3. Impulse and long-pulse limits

For $T\geq L$, the contribution of this simple pole can be written as

$$
u_\lambda(T)=r_\lambda\widehat f(\lambda)e^{\lambda T}
=\delta V\,r_\lambda\Gamma_L(\lambda)e^{\lambda(T-L)},
$$

where the actual end-of-pulse modal factor is

$$
\Gamma_L(\lambda)
=\frac{e^{\lambda L}-1}{\lambda L}
\frac{1}{1+(\lambda L/2\pi)^2}.
$$

This is the coefficient of a characteristic component; it is not the entire vector displacement at $T=L$, where other modes and transient terms can also contribute.

As $L\to0$ at fixed $\lambda$,

$$
\frac{\widehat f(\lambda)}{\delta V}
=1-\frac{\lambda L}{2}
+\left(\frac16-\frac{1}{4\pi^2}\right)(\lambda L)^2+O((\lambda L)^3),
$$

and $\Gamma_L(\lambda)\to1$. This recovers the linear externally prepared velocity impulse's residue. The smooth preparations have no jump individually; the impulse is their limiting preparation, with the regularity distinction stated in the [angular response owner](ring-source-and-angular-response-2026-10-03.md#4-angular-momentum-per-member-and-an-external-tangential-kick).

As $L\to\infty$ at fixed positive $\lambda$,

$$
\frac{\widehat f(\lambda)}{\delta V}
=\frac{4\pi^2}{\lambda^3L^3}
\left[1+O(L^{-2})+O(e^{-\lambda L})\right],
\qquad
\Gamma_L(\lambda)
\sim\frac{4\pi^2e^{\lambda L}}{\lambda^3L^3}.
$$

The transform referenced to pulse onset decreases algebraically, but the growing response accumulated by pulse end increases exponentially. Calling the preparation gentle solely because its instantaneous magnitude is $O(\delta V/L)$ would miss that amplification. The result holds for the linear response operator. For a finite physical amplitude, a sufficiently long pulse can leave the local chart well before it ends. Taking the infinitesimal-amplitude limit at fixed $L$, or reducing $\delta V$ sufficiently as $L$ increases, is necessary for a local linear interpretation. No retained nonlinear duration is inferred from this asymptotic formula.

**Grade: derived limits. Falsifier:** a different exact transform expansion or end-of-pulse residue with the same normalization defeats the respective asymptotic statement.

## 4. Numerical modal factors and their controls

The new [drive instrument](../../../../../scripts/braid-program/ring_slow_tangential_drive_20261003.py) passed analytical controls before its targets. Direct antiderivatives of $e^{-zT}$ and $e^{(-z+ia)T}$ at $z=1,L=2$ independently reproduce the factored transform below $10^{-105}$, the cosine pulse has unit integrated input, and the independent positive polynomial pulse $6T(1-T)$ on $[0,1]$ gives transform $6(3/e-1)$ at $z=1$. These precede the ring interval computations in `.local-data/ring-exploration/slow-drive/known.json`.

The target consumes frozen authoritative binary T02/T04 numerator and $G'$ intervals. With $G(z)=R\det A(z)/z$, the simple-root residue is $r_\lambda=R\operatorname{adj}A(\lambda)e_2/[\lambda G'(\lambda)]$. It encloses both residue components and the strictly positive transform and end-of-pulse factors for $L=0.01,0.1,1,10$; all remain non-cancelling. Printed trial brackets are widened before numerical reuse, while the true root and its numerator/derivative enclosures retain their inherited certificate premises.

| Exact reference and witness | $L$ | $\widehat f(\lambda)/\delta V$ | $\Gamma_L(\lambda)$ |
| --- | ---: | ---: | ---: |
| T02, $\lambda\approx0.859629$ | 1 | 0.658522257125 | 1.55561677922 |
| T02, $\lambda\approx0.859629$ | 10 | 0.0404997643663 | 219.166465855 |
| T02, $\lambda\approx10.658424$ | 0.01 | 0.948278977619 | 1.05493346850 |
| T02, $\lambda\approx10.658424$ | 0.1 | 0.597861169301 | 1.73576060618 |
| T02, $\lambda\approx10.658424$ | 1 | 0.0241956266727 | 1029.51263145 |
| T02, $\lambda\approx10.658424$ | 10 | $3.24918\times10^{-5}$ | $6.32007\times10^{41}$ |
| T04, $\lambda\approx1.425455$ | 1 | 0.506798544395 | 2.10815610330 |
| T04, $\lambda\approx89.644921$ | 0.1 | 0.0367430130295 | 287.345381288 |

**Grade: measured outward linear factors**, `.local-data/ring-exploration/slow-drive/target.json`; display entries are rounded and the receipt carries their exact binary interval endpoints. They are per unit external input parameter, not finite nonlinear displacement predictions. The very large factors expose the failure of a fixed-amplitude long-pulse linear approximation rather than establishing a particular ring breakup.

## 5. Angular momentum accounting and remaining work

The kinematic per-member quantity is $h=X\times V$ along the ring axis, without a mass factor. During the drive it satisfies $h'=X\times(A^{\rm ME}+A^{\rm external})$. At first order the integrated external contribution is $R\delta V$, but the delayed-equation contribution is generally nonzero. Therefore neither the net angular-momentum change nor the net velocity change equals the pulse's specified input area by a conservation premise. Rotational covariance alone does not supply a particle-only conserved account.

This preparation establishes a concrete growing linear response instead of an unspecified slow torque. It does not select another rung, calculate a transition threshold, identify an invariant action, supply a nonlinear driven history to a causal event, or prove that all unknown complex modes are excited. A subsequent nonlinear attempt needs the complete forced history and explicit chart/remainder control.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_slow_tangential_drive_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_slow_tangential_drive_20261003.py --stage target
```

Only this new analysis, its new instrument and unique local evidence are authored. The frozen ring certificates and their evaluators remain unchanged; no shared queue, manuscript, log, registry, ledger, rank, score, scenario selection, production solver or Git publication is changed. The coordinator owns integration and independent adjudication.
