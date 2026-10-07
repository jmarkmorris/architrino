# The formal cubic canonical row and its missing uniform remainder

**Status: exact formal calculation, awaiting independent derivation.** The [bounded method](overnight2-a-canonical-cubic-method.md) gives a cubic delayed-acceleration contribution that is absent from the affine-source control. The calculation retains the actual source acceleration and leading jerk in its formal jets. It does not yet bound the remainder on actual generated histories and cannot be used as a replacement equation or a fate certificate.

The law is the unchanged canonical inverse-square equation with $c_f=1$. This reference calculation uses the scaled mirror variables of the accepted slow-binary theorem. The actual final target remains the original nominal complete-history pair and its admitted spatial neighborhood; transfer from the mirror reference is a separate obligation. Frozen equations and preparations are unchanged.

## Direct coefficient reconstruction

Let $u=2\epsilon rL$ be the source delay. The receiving-frame Taylor jets in the method give, through cubic degree,

$$
\frac{S_r}{2r}=1-\epsilon Lp-\frac{\epsilon^2L^2}{r}
-\frac{7\epsilon^3p}{3r}+O(\epsilon^4),
$$
$$
\frac{S_t}{2r}=-\epsilon Lq+\frac{5\epsilon^3q}{3r}+O(\epsilon^4).
\tag{1}
$$

The coefficients $7/3$ and $5/3$ include both the first-order current acceleration and the leading source jerk. They would be lost by using a constant-velocity source or by suppressing delayed acceleration. In this section all remainders are formal at fixed $r,p,q$.

Since $N_t=S_t/(2rL)$ and $N_r^2+N_t^2=1$ on the positive radial branch,

$$
N_t=-\epsilon q+\frac{5\epsilon^3q}{3r}+O(\epsilon^4),
\qquad N_r=1-\frac{\epsilon^2q^2}{2}+O(\epsilon^4).
\tag{2}
$$

The radial chord equation $S_r=2rLN_r$ now determines the delay:

$$
L=1-\epsilon p+\epsilon^2\left(p^2+\frac{q^2}{2}-\frac1r\right)
+\epsilon^3\left(-p^3-pq^2+\frac{2p}{3r}\right)+O(\epsilon^4).
\tag{3}
$$

The source velocity expansion is

$$
V_{\sigma,r}=p+\frac{2\epsilon}{r}+\frac{4\epsilon^2p}{r}+O(\epsilon^3),
\qquad
V_{\sigma,t}=q-\frac{4\epsilon^2q}{r}+O(\epsilon^3).
$$

Thus the transmitter factor and scalar amplitude are

$$
D=1+\epsilon p+\epsilon^2(2/r-q^2)
+\epsilon^3(4p/r-pq^2/2)+O(\epsilon^4),
$$
$$
L^{-2}D^{-1}=1+\epsilon p
+\epsilon^3\left(\frac{pq^2}{2}-\frac{4p}{3r}\right)+O(\epsilon^4).
\tag{4}
$$

The quadratic amplitude cancellation survives. Multiplication by the direction yields

$$
\boxed{
A_r=-\frac{1+\epsilon p-\epsilon^2q^2/2}{r^2}
+\frac{4\epsilon^3p}{3r^3}+O(\epsilon^4),
\qquad
A_t=\frac{\epsilon q+\epsilon^2pq}{r^2}
-\frac{5\epsilon^3q}{3r^3}+O(\epsilon^4).
}
\tag{5}
$$

Inserting zero acceleration/jerk jets instead gives the exact affine-source control through the same order, with zero cubic coefficient in both components. The generated coefficients in (5) are therefore explicitly a source-acceleration correction, not a coefficient of the affine approximation. At $p=0$ the radial cubic coefficient vanishes, whereas the transverse coefficient retains its factor $q$.

## Consequence for the formal angular equations

With $h=rq$, $e_n=hq-1$ and $e_t=-hp$, the exact geometric identities are

$$
h_\theta=\frac{r^2A_t}{q},\qquad
\boldsymbol e_\theta=2r^2A_t\,\boldsymbol n
+\left(-r^2A_r-1-\frac{r^2pA_t}{q}\right)\boldsymbol t.
$$

The displayed $h_\theta$ formula must be interpreted carefully: since $h'=rA_t$ and $\theta'=q/r$, it is $r^2A_t/q$ as written. Using (5), the formal equations become

$$
h_\theta=\epsilon+\epsilon^2p-\frac{5\epsilon^3}{3r}+O(\epsilon^4),
\tag{6}
$$
$$
\boldsymbol e_\theta=
2\epsilon q\,\boldsymbol n
+\epsilon^2\left[2pq\,\boldsymbol n-(p^2+q^2/2)\boldsymbol t\right]
+\frac{\epsilon^3}{3r}\left[-10q\,\boldsymbol n+p\,\boldsymbol t\right]
+O(\epsilon^4).
\tag{7}
$$

In particular the third-order polar term is an explicit polynomial in the eccentricity components after substituting $p=-e_t/h$, $q=(1+e_n)/h$ and $1/r=(1+e_n)/h^2$. This may improve the early corrected-seed calculation. Equations (6)–(7) remain formal because an undifferentiated isotropic acceleration remainder would not justify division by $q$ as elongated motion develops. A uniform transverse factor is essential.

## The first actual-history obligation

The exact generated jerk can be differentiated without importing a physical law. With $V=Y'$, $V_\sigma=Y'(\sigma)$, $A_\sigma=Y''(\sigma)$, one has

$$
\sigma'=\frac{1-\epsilon N\cdot V}{D},\quad
S'=V+V_\sigma\sigma',\quad R'=N\cdot S',\quad
N'=\frac{S'-NR'}R,
$$
$$
D'=\epsilon(N'\cdot V_\sigma+N\cdot A_\sigma\sigma'),
\qquad
A'=-\frac4{R^3D}\left[S'-3NR'-\frac{NRD'}D\right].
\tag{8}
$$

At leading order, $S'=2V$, $R=2r$ and $D=1$, so (8) gives $J_0=(2p/r^3,-q/r^3)$, including the frame rotation. A credible uniform proof would bound (8) on every complete generated source window, retain a factor $q$ in its transverse error, and integrate it in the Taylor remainder rather than differentiate an existing big-O assertion. Source generation must be checked before the first use of $A_\sigma$. The original release seam cannot simply be assigned an extra derivative.

A sufficient new row would have constants and explicit domain such that

$$
\left|A_r+\frac{1+\epsilon p-\epsilon^2q^2/2}{r^2}
-\frac{4\epsilon^3p}{3r^3}\right|
\le C_r\frac{\epsilon^4}{r^2h^4},
$$
$$
\left|A_t-\frac{\epsilon q+\epsilon^2pq}{r^2}
+\frac{5\epsilon^3q}{3r^3}\right|
\le C_t\frac{\epsilon^4q}{r^2h^3}.
\tag{9}
$$

Neither (9) nor a useful value of its constants has been established here. Even after it, the actual preparation-to-entry phase would need a corrected-seed integration, explicit release-layer handling and the already admitted nominal/spatial perturbation transfer. The formal coefficient alone does not provide that chain or determine the late entry sign.

## Calculation, independence and preservation

The [exact-symbolic instrument](../evidence/overnight2-a-canonical-cubic-row.py), frozen after its known pass, independently assembles the truncated Cartesian chord, solves its squared norm coefficient by coefficient and reconstructs both acceleration components. It returned (3)–(5) with exact symbolic expressions in the local receipt `.local-data/master-equation-closure/overnight2-a/canonical-cubic-target.json`. This agrees with the hand expansion above but both are coordinator-authored; the separately deriving reviewer has not yet been shown the result. Its future assessment, not this internal parity, is the independent evidence required before use.

The known pass occurred at 05:13:43 UTC before the target at 05:14:08 UTC on October 7. The target reports 0.11982 seconds, peak resident size 63,864,832 bytes on Darwin, and unchanged producer identity `4597fc61ac72297a5ece734b529346404e8a0760ae19ea7882979e62a2fb4019`. Supervisor lease `0833b1a9-abff-43a9-a14a-17ccd20ff0e3` completed with exit zero and closed group. Commands use `OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1`, the shared venv, the owned supervisor with a 120-second deadline and 15-second heartbeat, then the instrument's `known` or `target` mode and the corresponding exclusive-create output path. Reproduction needs a fresh output path to preserve these original receipts. No evolved trajectory, production solver, generated rewrite or publication was run.

Falsifiers include a missing implicit-clock coefficient, a wrong receiving-frame jerk, loss of the actual delayed acceleration contribution, failure of the affine control, or a transverse remainder that loses its $q$ factor. The unresolved actual-history estimate (9) is a method obligation rather than an observed physical obstruction. The [main A report](overnight2-a-followup-and-research-2026-10-07.md) owns integration; all prior sources and independent references remain unchanged.
