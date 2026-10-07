# Independent review of the height-lobe endpoint restriction

## Verdict and scenario

**Derived and independently accepted:** the [frozen lobe-endpoint subject](overnight2-b-lobe-endpoint-restriction.md) is valid without mathematical repair. Its monotone-gap equivalence, exact planar chord, sufficient exclusion, cosine rate and aspect-ratio restrictions, and constant-unit-radius corollary follow with the stated inequality directions and strictness. They are necessary restrictions on exact histories, not existence criteria for histories that pass them.

The canonical scenario is $K=c_f=1$ with complete six-member paths
$$
X_j(t)=R\bigl(\rho(\phi)\cos[\beta t/R+j\pi/3+p(\phi)],\rho(\phi)\sin[\beta t/R+j\pi/3+p(\phi)],(-1)^jz(\phi)\bigr),
\qquad \phi=\kappa t/R,
$$
where $R,\kappa>0$, profiles are real $C^2$, radius is positive, and alternating interaction polarities are retained. Every physical path speed has one common upper bound $v_*<1$ on the complete history. No radius or phase reflection condition is imposed. The [accepted independent zero-crossing review](overnight2-b-independent-zero-crossing.md) is the analytical dependency for the pointwise sign identity; the additional root-position argument is derived below.

At the reception phase under study assume
$$
z(\phi_0)=z(\phi_0-L)=0,\qquad z''(\phi_0)\ge0,\qquad
z(\phi)>0\quad(\phi_0-L<\phi<\phi_0),\qquad L>0.
$$
Primes on profiles denote phase derivatives. The preceding lobe endpoints are actual zeros here, which is essential for removing height from the endpoint chord. The proof does not require a transverse crossing or that the positive interval be the longest possible one.

## Complete ordinary chart from the speed bound

Fix reception time $t_0$ and a partner $j\in\{1,\ldots,5\}$. The normalized causal gap is
$$
G_j(\Delta)=\frac{|X_0(t_0)-X_j(t_0-R\Delta)|}{R}-\Delta.
$$
For $\Delta_2>\Delta_1\ge0$, the complete source speed bound gives
$$
-(1+v_*)(\Delta_2-\Delta_1)
\le G_j(\Delta_2)-G_j(\Delta_1)
\le-(1-v_*)(\Delta_2-\Delta_1)<0.
$$
This follows from the reverse triangle inequality and does not require the separation norm to be differentiable away from roots. At zero delay the planar partner chord has length $2\rho(\phi_0)|\sin(j\pi/6)|>0$, so $G_j(0)>0$. The upper secant bound gives $G_j(\Delta)\le G_j(0)-(1-v_*)\Delta$, which is negative for sufficiently large delay. Thus every partner has exactly one positive root on the complete past. This existence proof needs no additional global diameter assumption.

At a positive root the separation is nonzero and the gap derivative is
$$
G_j'(\Delta)=-D_{s,j},\qquad D_{s,j}=1-\widehat Q_j\cdot V_{s,j}\ge1-v_*>0.
$$
The root is ordinary. A positive self delay cannot satisfy the causal constraint because self displacement is at most $v_*R\Delta<R\Delta$. Consequently the complete chart consists of exactly five ordinary partner roots and no positive self roots, with no truncated history interval.

At a zero height the accepted canonical identity reduces to
$$
A_z(\phi_0)=-\sum_{j=1}^5\frac{z(\phi_0-\kappa\Delta_j)}{\Delta_j^3D_{s,j}}.
$$
If all roots lie strictly inside the preceding positive lobe, this nonempty sum is strictly negative. Exact balance would instead require $A_z=R\kappa^2z''(\phi_0)\ge0$. Therefore at least one partner root must satisfy $\kappa\Delta_j\ge L$. The zero-crossing argument originally retains all self roots; their absence here is proved from the speed bound, not imposed by a rule.

## Exact endpoint chord and gap-position equivalence

Set $d_L=L/\kappa$, $r_0=\rho(\phi_0)$ and $r_L=\rho(\phi_0-L)$. At trial delay $d_L$, the emitted phase is exactly $\phi_0-L$, since $\phi(t_0-Rd_L)=\phi_0-\kappa d_L$. Both endpoint heights vanish, independently of source parity. The relative planar angle is
$$
\alpha_{j,L}=\frac{j\pi}{3}-\frac{\beta L}{\kappa}+p(\phi_0-L)-p(\phi_0).
$$
Thus the trial separation is the planar chord
$$
c_{j,L}=\sqrt{r_0^2+r_L^2-2r_0r_L\cos\alpha_{j,L}},\qquad G_j(d_L)=c_{j,L}-d_L.
$$
Since $G_j$ is strictly decreasing and has its unique zero at $\Delta_j$,
$$
\begin{aligned}
\Delta_j>d_L&\iff G_j(d_L)>0,\\
\Delta_j=d_L&\iff G_j(d_L)=0,\\
\Delta_j<d_L&\iff G_j(d_L)<0.
\end{aligned}
$$
In particular the claimed equivalence, including equality, is exact:
$$
\boxed{\Delta_j\ge L/\kappa\quad\Longleftrightarrow\quad c_{j,L}\ge L/\kappa.}
$$
Combining it with the necessary causal reach gives
$$
\boxed{\max_{1\le j\le5}c_{j,L}\ge\frac L\kappa.}
$$
This is a necessary condition only. An endpoint chord exactly equal to $d_L$ places that channel's emission at zero height; it does not cancel positive samples in the other channels or establish full acceleration balance. The displayed necessary condition is not claimed sharp in every equality configuration.

The planar triangle inequality gives $c_{j,L}\le r_0+r_L$. Hence if
$$
\kappa(r_0+r_L)<L,
$$
all five trial gaps are negative, all roots lie strictly inside the positive lobe, and exact balance is impossible. A global radius ceiling $\rho\le r_+$ yields the simpler sufficient condition $2\kappa r_+<L$.

The height maximum never enters this endpoint criterion because the two sampled endpoint heights are zero. This improvement depends on global gap monotonicity from below-wake-speed motion. At higher speed a negative gap at one delay can coexist with a later root, so the sign/root-position equivalence is not licensed. The earlier velocity-independent diameter theorem and this endpoint theorem therefore have distinct hypotheses.

## Cosine rate and aspect ratio

For $z(\phi)=H\cos\phi$ with $H>0$, choose $\phi_0=\pi/2$ and $L=\pi$. Height and curvature both vanish at the reception, the preceding endpoint is $-\pi/2$, and height is strictly positive between them. An exact history must therefore obey
$$
\frac\pi\kappa\le\max_jc_{j,\pi}\le r_0+r_L\le2r_+,
$$
which is equivalent to the stated necessary bounds
$$
\boxed{\kappa\ge\frac\pi{r_0+r_L}\ge\frac\pi{2r_+}.}
$$
At a height crossing, physical axial velocity has magnitude $\kappa H$. The Euclidean norm of physical velocity is at least the magnitude of this component, even when radius and phase modulation are arbitrary. The common speed bound therefore gives $\kappa H\le v_*$. Multiplication of the necessary rate bound by $H$ now yields
$$
\frac{\pi H}{2r_+}\le\kappa H\le v_*<1,
\qquad
\boxed{\frac H{r_+}\le\frac{2v_*}{\pi}<\frac2\pi.}
$$
The first inequality may be nonstrict because the declared bound is $|V|\le v_*$. The final inequality is strict because $v_*<1$. Thus $H\ge2r_+/\pi$ is impossible for any exact member satisfying the complete below-wake-speed hypotheses. This conclusion does not require a chosen small frequency or a radius/phase reflection center, and all scale factors have canceled.

Since $\pi>3$, one has $2/\pi<2/3$. The rational sufficient exclusion $H\ge(2/3)r_+$ is therefore valid but weaker: it excludes a subset of the aspect ratios already excluded by the exact threshold. It does not replace the sharper bound when the exact constant is used.

## Constant unit radius and zero phase modulation

In the special subfamily $\rho\equiv1$ and $p\equiv0$, the planar physical speed is $|\beta|$ and the radial speed is zero. At a cosine height crossing,
$$
|V|^2=\beta^2+\kappa^2H^2.
$$
The endpoint condition has $r_0+r_L=2$, giving $\kappa\ge\pi/2$. Since complete motion is strictly below wake speed,
$$
\beta^2+\kappa^2H^2<1.
$$
With $H>0$ and $\kappa>0$, this requires $|\beta|<1$ and gives
$$
\frac\pi2H\le\kappa H<\sqrt{1-\beta^2},
\qquad
\boxed{\kappa\ge\pi/2,\quad H<\frac2\pi\sqrt{1-\beta^2}.}
$$
The strict inequality is supplied by the speed bound, independently of whether the lower rate inequality is sharp. The formula is for constant unit radius and zero phase modulation, as stated in the subject; it is not asserted for an arbitrary constant radius with the same unscaled $\beta$.

If the declared budget is the stronger $\beta^2+\kappa^2H^2\le v_*^2<1$, the corresponding necessary condition is
$$
\boxed{H\le\frac2\pi\sqrt{v_*^2-\beta^2}.}
$$
For the positive-height subfamily the budget also implies $|\beta|<v_*$, so the radicand is strictly positive. The nonstrict final inequality correctly preserves the possibility of attaining the declared speed budget; it still does not certify exact balance.

## Shape scope and falsifiers

The general endpoint argument needs the nonnegative curvature at the end of a positive preceding lobe. If every root remains inside that lobe, exact balance instead demands negative curvature, so an asymmetric descending zero with such curvature is not excluded by this theorem. An even anti-periodic height positive on $(-\pi/2,\pi/2)$ has $z(\pi/2)=z''(\pi/2)=0$ by twice differentiating $z(\pi-\phi)=-z(\phi)$; hence the endpoint theorem applies with $L=\pi$ without first-quarter concavity.

The aspect-ratio step is specifically cosine-based: it uses the exact maximal axial speed $\kappa H$. A general height amplitude does not supply that identity. Other waveforms require their own derivative estimate before an amplitude corollary can be inferred.

Operator-checkable falsifiers include a complete permitted source whose gap violates the proved secant bounds; a positive self root despite the strict speed ceiling; a failure of the displayed planar chord or root-position equivalence; or an exact history meeting the lobe hypotheses with all endpoint chords below $L/\kappa$. An exact cosine member violating either the necessary rate or aspect bound would refute its corollary. Above-wake-speed histories and profiles with the opposite zero curvature are outside the corresponding hypotheses, not counterexamples. Passing the necessary chord or aspect condition is not evidence of a solution.

## Validation and preservation

Native `shasum -a 256` identifies the frozen subject as `880571f2ee98562fdabc15157a8c864da6757ece025396b163d1b99676a7fbfd`. The accepted independent zero-crossing report is the analytical dependency, with identity `67df2834e8cb6b496e57513c3c684022fff2e786399da5345d96f06dd0c2c1a0`. This review reconstructs the new estimates analytically and uses no numerical target, saved search output or library computation.

Only this new independent Markdown report was authored. All subjects, accepted dependencies, previous reports and instruments, receipts, parent account and shared owners remained read-only. Native final hashing verifies the frozen identities; `git diff --no-index --check /dev/null` supplies the new report's whitespace check, with exit one and no diagnostics representing its new-file difference. No numerical job, runtime evidence write, delegation, Git mutation or generator was used. No mathematical blocker remains within this bounded scope. Parent integration is the remaining disposition step; the queued thin-height interval review has not been performed here.
