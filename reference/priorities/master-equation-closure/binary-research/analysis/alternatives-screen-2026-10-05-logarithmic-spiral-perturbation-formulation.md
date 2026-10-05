# Full Cartesian perturbations of the admitted expanding spiral

## Frozen case and claim boundary

This subject fixes the inverse-distance law $p=1$, $K=R_*=c_f=1$, all ordinary self and partner roots, and the exact spiral admitted in [the independent assessment](alternatives-screen-2026-10-05-logarithmic-spiral-adjudication.md). Its complete compatible history is the [frozen preparation](alternatives-screen-2026-10-05-logarithmic-spiral-formulation.md). Its exact parameters are the unique common zero in the certified rectangle centered at $(\omega,\delta)=(2.2980147591220047,1.1160548442916221)$ with coordinate radius $10^{-10}$. Write $\lambda=e^{-\delta/\omega}$, $P=\exp(\Omega\log\lambda)$, $\Omega=\omega J$, where $J(x,y,z)=(-y,x,0)$, and $A=(a,0,0)$ with $a=(1-\lambda)/\sqrt{1+\lambda^2+2\lambda\cos\delta}$.

The target is growth relative to this spiral's own expansion, with every member and all three Cartesian coordinates allowed to vary. This is a new perturbation subject. The existing exact balance is checked below before a characteristic equation is used. A positive relative exponent would establish a growing linearized mode, not by itself a nonlinear alternative fate. A finite root search cannot establish attraction or exclude unsampled unstable roots. All root and smoothness claims are restricted to a neighborhood retaining the complete speed margin below one and positive separation.

## Exact autonomous coordinates and equilibrium check

Put $t=1+T$, $\tau=\log t$ and

$$
q_i(T)=t\exp(\Omega\tau)U_i(\tau).
$$

The exact transformed velocity and acceleration are

$$
q_i'=\exp(\Omega\tau)[U_i'+(I+\Omega)U_i],\qquad
q_i''=t^{-1}\exp(\Omega\tau)[U_i''+(I+2\Omega)U_i'+(\Omega+\Omega^2)U_i].
$$

For the partner source, write $1+S=\ell t$ and $\sigma=\tau+\log\ell$. With

$$
C_i=U_i(\tau)-\ell\exp(\Omega\log\ell)U_j(\sigma),\quad
W_j=\exp(\Omega\log\ell)[U_j'(\sigma)+(I+\Omega)U_j(\sigma)],
$$

its exact implicit clock, unit chord and transmitter factor are

$$
1-\ell=|C_i|=d_i,\qquad n_i=C_i/d_i,\qquad D_i=1-n_i\cdot W_j.
$$

The autonomous equation is

$$
U_i''+(I+2\Omega)U_i'+(\Omega+\Omega^2)U_i=-\frac{C_i}{d_i^2D_i}.
$$

On the complete subfield chart the self census is empty and there is exactly one partner root; these facts follow from the full speed chord bound, not a root selection convention. Near the equilibrium the source ratio is positive and close to $\lambda$. The earlier held preparation need not be represented through the formal singular time $T=-1$: every base future source lies on its retained analytic segment, and the local similarity history requires only a bounded interval about $\log\lambda$.

At $U_+=A$, $U_-=-A$, the plus-member quantities are

$$
c=A+\lambda PA,\quad d=1-\lambda=|c|,\quad n=c/d,\quad w=P(I+\Omega)A,\quad W_-=-w,\quad D=1+n\cdot w.
$$

The admitted directional balance gives $D=1/\lambda$, while its magnitude balance gives

$$
(\Omega+\Omega^2)A=-\frac{n}{dD}.
$$

This is the complete Cartesian transformed equilibrium equation. The minus equation is its negative. Thus linearization has an actual equilibrium as its referent; neither a circle nor a prescribed unbalanced path is substituted.

## Full clock and acceleration variations

Let $U_i=U_i^*+u_i$ and write the modal amplitudes as $u_i(\tau)=x_i e^{k\tau}$. At the base delay define

$$
B_i=x_i-\lambda^{k+1}P x_j.
$$

The source-clock amplitude, chord amplitude and direction amplitude are

$$
\ell_i^{(1)}=-\frac{n_i\cdot B_i}{D},\qquad
C_i^{(1)}=B_i-W_j^*\ell_i^{(1)},\qquad
d_i^{(1)}=-\ell_i^{(1)},\qquad
n_i^{(1)}=\frac{(I-n_in_i^{\mathsf T})C_i^{(1)}}d.
$$

These formulas follow by differentiating $1-\ell=|C|$ and using $\partial_\ell[\ell\exp(\Omega\log\ell)U_j^*]=W_j^*$. The source-velocity variation contains a separate clock contribution:

$$
W_j^{(1)}=\lambda^kP[kI+I+\Omega]x_j+
\frac{\ell_i^{(1)}}\lambda\Omega W_j^*.
$$

The latter term is the change in the base source velocity at its shifted physical source time. It must be retained even though the nonlinear equation contains no delayed source acceleration as an independent input. The transmitter and acceleration variations are

$$
D_i^{(1)}=-n_i^{(1)}\cdot W_j^*-n_i\cdot W_j^{(1)},
$$

$$
F_i^{(1)}=-\frac{C_i^{(1)}}{d^2D}
+\frac{2c_i d_i^{(1)}}{d^3D}
+\frac{c_iD_i^{(1)}}{d^2D^2}.
$$

Consequently the full characteristic equation is

$$
[k^2I+k(I+2\Omega)+\Omega+\Omega^2]x_i=F_i^{(1)}.
$$

All products here are bilinear Cartesian products, without complex conjugation; complex modal amplitudes merely represent real oscillatory solutions.

## Exchange and normal sectors; analytic controls

Exchange symmetry splits $x_j=\rho x_i$ into the common sector $\rho=+1$ and relative sector $\rho=-1$. Reflection in the spiral plane independently splits normal and planar coordinates. The two planar $2\times2$ characteristic matrices are obtained directly from the preceding formulas. The normal scalar characteristic is exactly

$$
f_\rho(k)=k(k+1)+\frac{\lambda}{(1-\lambda)^2}[1-\rho\lambda^{k+1}].
$$

The following genuine symmetry modes are controls, not spectral discoveries:

- Common translations: $k=-1$ in the normal sector and $k=-1\pm i\omega$ in the planar sector. In physical coordinates these are constant displacements.
- Relative rotation about the spiral axis: $k=0$, planar amplitude $\Omega A$ (equivalently $JA$).
- Relative time-origin shift: $k=-1$, planar amplitude $(I+\Omega)A$.
- Relative tilts of the spiral plane: $k=\pm i\omega$ in the normal sector.

The two balance equations make the tilt identities $f_-(\pm i\omega)=0$ exact. Spatial/time dilation $q(T)\mapsto bq(T/b)$ is a symmetry of this fixed inverse-distance law, but on the exact spiral its infinitesimal mode is a combination of the time-origin and axial-rotation modes; it introduces no additional independent exponent. A common constant physical velocity is not assumed to be a symmetry of this wake law.

For any modal exponent $k$, relative similarity amplitude grows like $t^{\Re k}$, while physical positional amplitude grows like $t^{1+\Re k}$. The rotational factor changes frequency but not these norms. Thus a mode with $-1<\Re k<0$ can grow in absolute displacement while decaying relative to the expanding binary. Purely imaginary tilt modes and the zero axial-rotation mode must be separated from genuine deformation before discussing attraction modulo symmetry.

## Frozen numerical protocol and proof boundary

A separately authored diagnostic will implement the displayed full variation, without importing any earlier numerical subject or reference code. Before target root location it must pass: the full admitted Cartesian balance; the explicit normal scalar formula for both exchange signs at several real and complex arguments; all listed planar and normal symmetry residuals; and a derivative control against an independently evaluated exact implicit-source response on a simple analytically known geometry. The response control freezes a radial similarity pair with $a=1/5$, $\omega=0$, and $\lambda=2/3$; that geometry is used to check differentiation and is not claimed to solve the acceleration equation.

After controls pass and are recorded, root scouting may search planar determinants and normal scalar functions. Target roots are measured locators only. A claimed growing mode then needs a separately checked analytic sign argument, interval enclosure or equivalent certificate at the exact admitted parameter zero. A spectral completeness or nonlinear stability claim requires further proof and cannot follow from that scout. No production solver is added or changed.

Falsifiers are a failure of full equilibrium balance, an omitted root-clock term, failure of a symmetry identity, disagreement of the differential with the independently evaluated source response, or a purported positive exponent that is only an absolute-growth or coordinate-symmetry artifact. All earlier sources are preserved. This formulation is frozen before target perturbation computation; no numerical spectral result is claimed here.
