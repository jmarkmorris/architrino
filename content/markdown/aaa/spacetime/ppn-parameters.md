# PPN Parameters

### Mapping to PPN Constraints

1. **Shapiro Delay**: Must map the GR time-delay (longer path in curved space) to the Architrino time-delay (slower $c_{eff}$ in a dense medium).
2. **Light Bending**: Calculate the refraction of tri-binary signals through the Noether Sea density gradient around the Sun. Target accuracy: $10^{-5}$.
3. **Geodetic Precession**: Derived from the interaction of the assembly's angular momentum with the gradient of the Noether Sea's potential.


### Testing the Euclidean Anchor (Shapiro Delay)

1. **The Test**: Calculate travel time of a signal from Earth to a probe behind the Sun using the $\mathbb{U}_{\text{now}}$ universe-state grid.
2. **Architrino Model**: Signal follows a straight Euclidean line. Delay is caused by **increased density of the Noether core sea** near the Sun (Refractive Index change).
3. **Validation**: $\Delta t_{architrino}$ must match $\Delta t_{GR}$ to within $10^{-5}$.
4. **$\mathbb{U}_{\text{now}}$ Role**: $\mathbb{U}_{\text{now}}$ provides the "straight line" benchmark against which the "curved path" of GR is compared.

### Explicit Weak-Field Refractive Shapiro Map (PPN $\gamma$)

Adopt a weak-field refractive-index ansatz for signal propagation in the Noether-core medium:
$$
n(\mathbf{x}) \equiv \frac{c_f}{c_{\text{eff}}(\mathbf{x})}
= 1 - (1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_f^2}
+ \mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right),
$$
with $\Phi_N<0$ near a mass source. For a point mass $M$,
$$
\Phi_N(r)=-\frac{GM}{r}
\quad\Rightarrow\quad
n(r)=1+(1+\gamma_{\text{eff}})\frac{GM}{c_f^2 r}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_f^4 r^2}\right).
$$

For a one-way signal along a Euclidean straight path $\Gamma$ (the $\mathbb{U}_{\text{now}}$ anchor),
$$
t_{\text{arch}}=\frac{1}{c_f}\int_\Gamma n(\mathbf{x})\,ds
=\frac{R}{c_f}+\Delta t_{\text{arch}},
$$
where $R=\int_\Gamma ds$ is Euclidean path length and
$$
\Delta t_{\text{arch}}
=\frac{1}{c_f}\int_\Gamma (n-1)\,ds
=\frac{(1+\gamma_{\text{eff}})GM}{c_f^3}\int_\Gamma \frac{ds}{r(s)}
+\mathcal{O}\!\left(\frac{G^2M^2}{c_f^5}\right).
$$

Evaluating the line integral for endpoint radii $r_1,r_2$ and Euclidean endpoint separation $R$ gives
$$
\Delta t_{\text{arch}}
=\frac{(1+\gamma_{\text{eff}})GM}{c_f^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+\mathcal{O}\!\left(\frac{G^2M^2}{c_f^5}\right),
$$
which is the standard 1PN Shapiro form with $\gamma\to\gamma_{\text{eff}}$ and $c\to c_f$.

So the operational estimator is
$$
\gamma_{\text{eff}}
=
\frac{c_f^3\,\Delta t_{\text{obs}}}
{GM\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)}
-1,
$$
with $\Delta t_{\text{obs}}=t_{\text{obs}}-R/c_f$.

Validation target: in the weak-field solar-system regime, $\gamma_{\text{eff}}$ must match the Cassini-level bound in this framework's fitted convention.

### PPN Parameters and the Euclidean Anchor

#### Parameter $\gamma$ (Space Curvature / Refraction)
* **GR Context:** Measures the amount of space curvature produced by unit rest mass.
* **Architrino Interpretation:** Measures the "Refractive Index" of the Sea of Noether Cores. A massive body increases local assembly density, slowing the effective speed of light $c$ relative to the field speed $c_f$.
* **Observable:** Shapiro delay coefficient in the explicit refractive integral above. The inferred $\gamma_{\text{eff}}$ must satisfy the Cassini-level constraint around unity.

#### Parameter $\beta$ (Non-linearity of Gravity)
* **GR Context:** Measures the non-linearity in the superposition of gravitational fields.
* **Architrino Interpretation:** Captures second-order (in potential) clock/medium response from self-hit and Noether-Sea constitutive nonlinearity.
* **Explicit map from constitutive expansion:** Let $U\equiv-\Phi_N>0$ and expand the static clock law
$$
\frac{d\tau}{dt}\bigg|_{v=0}
=
1-\frac{U}{c_f^2}
+C_2(a,k)\frac{U^2}{c_f^4}
+\mathcal{O}\!\left(\frac{U^3}{c_f^6}\right).
$$
Since $-g_{00}=(d\tau/dt)^2$ for a static observer,
$$
g_{00}
=
-1
+2\frac{U}{c_f^2}
-\bigl[1+2C_2(a,k)\bigr]\frac{U^2}{c_f^4}
+\mathcal{O}\!\left(\frac{U^3}{c_f^6}\right).
$$
Match to the PPN form
$$
g_{00}^{\mathrm{PPN}}
=
-1+2\frac{U}{c_f^2}-2\beta_{\mathrm{eff}}\frac{U^2}{c_f^4}+\cdots
$$
to obtain
$$
\boxed{\beta_{\mathrm{eff}}(a,k)=\frac{1+2C_2(a,k)}{2}}.
$$
Equivalently, if $\alpha(\mathcal{I})=1+\lambda_t\mathcal{I}+\frac{1}{2}\lambda_{tt}\mathcal{I}^2$ and
$\mathcal{I}=\chi_1(a,k)\,U/c_f^2+\chi_2(a,k)\,U^2/c_f^4+\cdots$, then
$$
\beta_{\mathrm{eff}}(a,k)
=
\frac{1}{2}
+\lambda_t\chi_2(a,k)
+\frac{1}{2}\lambda_{tt}\chi_1(a,k)^2.
$$
* **Observable:** Perihelion precession and other 1PN nonlinear-potential tests.

#### Preferred Frame Parameters ($\alpha_1, \alpha_2, \alpha_3$)
* **Crucial test:** In the effective relativistic limit these must vanish (no measurable preferred-frame leakage).
* **Constitutive leakage ansatz:** Let $\mathbf{w}$ be the medium drift velocity relative to the barycentric frame. Write the lowest-order drift terms as
$$
g_{0i}^{\text{leak}}
=
-\frac{1}{2}\Xi_1(a,k)\frac{w_i U}{c_f^3}
-\Xi_2(a,k)\frac{w^j U_{ij}}{c_f^3},
$$
$$
g_{00}^{\text{leak}}
=
-\Xi_3(a,k)\frac{w^2 U}{c_f^4}
-\Xi_2(a,k)\frac{w^i w^j U_{ij}}{c_f^4}
+\Xi_4(a,k)\frac{w^i V_i}{c_f^3}.
$$
Matching to standard PPN preferred-frame structure gives
$$
\boxed{\alpha_1(a,k)=\Xi_1(a,k)},\qquad
\boxed{\alpha_2(a,k)=\Xi_2(a,k)},
$$
$$
\boxed{\alpha_3(a,k)=\Xi_1(a,k)-\Xi_2(a,k)-\Xi_3(a,k)},
$$
with consistency relation
$$
\Xi_4(a,k)=2\alpha_3-\alpha_1=\Xi_1-2\Xi_2-2\Xi_3.
$$

### Zero-Leakage Conditions (Preferred-Frame Closure)

The effective theory is preferred-frame safe iff all drift couplings vanish:
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0.
$$

Equivalent constitutive conditions:
$$
\left.\frac{\partial g_{\mu\nu}}{\partial w_i}\right|_{\mathbf{w}=0}=0,
\qquad
\left.\frac{\partial^2 g_{00}}{\partial w_i\partial w_j}\right|_{\mathbf{w}=0}
\propto \delta_{ij}
\ \text{with zero traceless part},
$$
and no momentum-density coupling term $w^iV_i$ at the retained PN order.

Operationally, extract $(\Xi_1,\Xi_2,\Xi_3,\Xi_4)$ from boosted weak-field simulations in orthogonal directions; passing requires consistency with the Tier-1 isotropy/leakage thresholds in `validation/constraint-ledger.md`.
