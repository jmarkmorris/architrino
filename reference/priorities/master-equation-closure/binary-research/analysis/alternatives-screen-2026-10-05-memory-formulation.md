# A compatible near-circular preparation for the fixed uniform-memory law

## Frozen law, family and claim boundary

This source fixes a complete near-circular mirror-planar family for the selected law before any evolution target. The law is [equation-variants §12](../../equation-variants/manuscript.md#12-history-based-self-response-and-emission-recoil), with canonical complete ordinary self/partner reception and $K=c_f=\lambda=\tau=1$:

$$
q''(T)=F_{\rm can}[q](T)-\int_0^1[q'(T)-q'(T-\theta)]\,d\theta.
$$

The partner is $-q$. The added response has the exact equivalent forms

$$
H(T)=-q'(T)+q(T)-q(T-1)
=-\int_0^1(1-\theta)q''(T-\theta)\,d\theta.
$$

These identities do not change or suppress the canonical self channel. Constant velocity makes $H=0$, while constant acceleration gives $H=-q''/2$; these are algebraic controls of the exact fixed kernel. The latter determines a natural leading near-circular radius scale, but does not replace the memory by a local law in any claimed evolution.

Choose the family parameter $0<\epsilon\le1/16$ and set

$$
r_0=\frac1{6\epsilon^2},\qquad \omega=\frac\epsilon{r_0}=6\epsilon^3,
\qquad s=\omega T,\qquad Y=q/r_0,\qquad \mu=\omega.
$$

The factor six follows by balancing the leading canonical inward magnitude $1/(4r_0^2)$ against the acceleration plus its fixed one-half memory contribution: $(3/2)\epsilon^2/r_0=1/(4r_0^2)$. No coefficient of the selected law is tuned. This scaling supplies a family, not an exact uniform circle; the [existing circle exclusion](alternatives-screen-2026-10-05-binary.md#9-uniform-memory-does-not-balance-a-subfield-antipodal-circle) remains a separate control.

## Exact compatible complete past

Let $Y_c(s)=(\cos s,\sin s)$ and let $\xi\in(0,\epsilon)$ solve $\xi=\epsilon\cos\xi$. The exact scaled canonical response at zero on this supplied circle is

$$
F_c=-\frac32\frac{(\cos\xi,-\sin\xi)}{\cos^2\xi\,(1+\epsilon\sin\xi)}.
$$

The exact scaled uniform-memory response is

$$
H_c=\left(\frac{1-\cos\mu}{\mu^2},\frac{\sin\mu-\mu}{\mu^2}\right).
$$

Define $B=F_c+H_c+(1,0)$ and $d=\mu/2$. Supply the complete history

$$
Y(s)=\begin{cases}
Y_c(s),&s\le-d,\\
Y_c(s)+\phi(s)B,&-d\le s\le0,
\end{cases}
\qquad
\phi(s)=\frac{d^2}{2}z_p^3(1-z_p)^2,\quad z_p=1+s/d.
$$

The physical patch width is exactly one-half, shorter than the fixed unit memory window. The second member is the exact negative. The supplied past is prescribed data and is not claimed to satisfy the future equation.

The polynomial and its first two derivatives vanish at the old seam. At zero it has $\phi=\phi'=0$ and $\phi''=1$, so the patch preserves position and velocity while setting the endpoint acceleration to $F_c+H_c$. Its acceleration is locally Lipschitz, including the seam, and the complete past is $C^{2,1}$.

The inequalities $\xi<\epsilon$, $\cos\xi\ge1-\epsilon^2/2$, $1\le1+\epsilon\sin\xi\le1+\epsilon^2$, and the elementary sine/cosine remainders give $|B|\le4\epsilon$ on the declared range. For $f(z)=z^3(1-z)^2$, coefficient bounds give $|f|\le1$, $|f'|\le16$ and $|f''|\le50$. Thus

$$
|Y-Y_c|\le18\epsilon^7,\qquad
|Y'-Y_c'|\le96\epsilon^4,\qquad
|Y''-Y_c''|\le100\epsilon.
$$

The complete scaled speed is below two and scaled acceleration below eight. Radius is bounded away from zero, and physical speed is at most $\epsilon(1+96\epsilon^4)<2\epsilon<1$. The signed geometric areal rate differs from one by at most the position perturbation, velocity perturbation and their product, which is less than $1/100$ at $\epsilon\le1/16$. It is therefore positive throughout the supplied past.

The complete subfield partner gap is strictly increasing in delay, negative at zero and positive for sufficiently old sources, giving exactly one partner root. The strict speed chord inequality excludes every positive-delay self root. At release the unpatched-circle source $s=-2\epsilon\cos\xi<-\epsilon<-d$ lies in the unchanged tail, so it remains the unique actual root. The memory endpoint $s=-\mu$ also lies before the patch, while the endpoint position and velocity are unchanged. Therefore both the canonical and memory inputs at zero equal the displayed $F_c,H_c$. The preparation is exactly compatible; no endpoint fixed point or approximate memory integral is used.

## Exact scaled memory equation and its bounded inverse

Write $A=Y''$ and retain the actual complete causal root in

$$
F[Y](s)=-\frac{4N}{R_d^2D},\qquad
R_d=|Y(s)+Y(\sigma)|,\quad s-\sigma=\epsilon R_d,\quad
D=1+\epsilon N\cdot Y'(\sigma).
$$

The exact selected scaled equation is

$$
A+K_\mu A=\frac32F[Y],\qquad
(K_\mu f)(s)=\int_0^1(1-\theta)f(s-\mu\theta)\,d\theta.
$$

The kernel norm is exactly $1/2$. The equation also retains the explicit position/velocity form of $H$, so local continuation is an ordinary causal equation on a separated subfield chart; the acceleration representation introduces no extra free initial variable.

Here is a useful bounded-domain estimate, with its hypotheses explicit. On a declared compact radius/velocity region and a bounded preceding source history, the canonical row and root slopes are bounded. The integral equation with kernel norm $1/2$ then bounds actual acceleration by its forcing and supplied acceleration. The root derivative and those acceleration bounds make $F[Y]$ Lipschitz with a uniform constant $C$ in scaled time. The compatible supplied circular patch also has bounded acceleration, so this Lipschitz estimate does not require a bound on its larger jerk.

Let $E=A-F[Y]$ and define the same expression on the supplied past. Its complete supplied value is $O(\epsilon)$, because both the canonical tangential discrepancy and the patch acceleration are $O(\epsilon)$. For future times the exact identity gives

$$
E+K_\mu E=\frac12F-K_\mu F
=\int_0^1(1-\theta)[F(s)-F(s-\mu\theta)]\,d\theta.
$$

The right side is bounded by $C\mu$. On consecutive intervals of length $\mu$, taking the supremum and using the kernel mass gives the elementary recurrence $M_n\le C\mu+\tfrac12\max(M_{n-1},M_n)$. Consequently

$$
|A(s)-F[Y](s)|\le C\mu+C\epsilon\,2^{-\lfloor s/\mu\rfloor},\qquad s\ge0,
$$

while the declared compact domain holds. This is a bound from the exact finite-memory equation, including its initial layer. It is not a memory truncation. The transient's integrated scaled impulse is $O(\epsilon\mu)=O(\epsilon^4)$. An arbitrarily long or changing-scale conclusion requires renewed weighted bounds; this compact estimate alone does not supply it.

## Analytical route and unresolved transfer

The frozen family now permits an actual secular analysis. The inverse estimate suggests that, after the short initial layer, the canonical first-order delayed correction acts on the natural scale above, with memory deviations starting at $\mu=6\epsilon^3$. On a canonical changing circular scale $a=h^2$, the physical unit memory length corresponds to local angular duration $\mu a^{-3/2}=6(\epsilon/\sqrt a)^3$. This is an algebraic scaling identity, not a proof that an evolving history remains in the needed class.

The required continuation proof must control this exact filter on changing source windows, retain the transverse factor near elongated excursions, and prove the sign or persistence of the relevant geometric rotation. Canonical or three-halves dispersal theorems cannot be imported: the memory acceleration is not generally aligned with the delayed chord, so their exact torque arguments do not automatically survive. The negative coefficient of $H$ supplies no physical dissipation premise.

**Falsifiers and status:** the compatible family and bounded-domain filter estimate are derived; actual long-time fate remains open at this formulation checkpoint. A changed endpoint memory sample, a second ordinary partner root under the proved complete speed bound, a nonzero positive-delay self root there, failure of the displayed polynomial jets, or failure of the exact kernel recurrence would refute the corresponding claim. A failure of later changing-scale estimates would limit that continuation route, not alter this frozen law or preparation.

Only this new memory formulation is written. Earlier subjects and independent references remain unchanged. No numerical instrument or target was run, no production solver or regular test was added, and no owned process is active. Shared owners, Git publication and generators are outside this write scope.
