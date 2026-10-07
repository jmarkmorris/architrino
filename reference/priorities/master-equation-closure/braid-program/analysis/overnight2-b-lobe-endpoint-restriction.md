# Height-lobe duration restricts an ordinary below-wake-speed zero crossing

## A sharper necessary causal reach

Claim grade: derived, pending independent reconstruction. Retain the canonical complete six-member radius/phase/height histories, $K=c_f=1$, positive radius and a common physical speed bound $v_*<1$. Assume a phase $\phi_0$ has $z(\phi_0)=0$, $z''(\phi_0)\ge0$, and the previous height lobe is positive:
$$
z(\phi_0-L)=0,\qquad z(\phi)>0\quad(\phi_0-L<\phi<\phi_0),\qquad L>0.
$$
The accepted [zero-crossing identity](overnight2-b-zero-crossing-obstruction.md) implies that exact balance requires some causal root with $\kappa\Delta\ge L$. Below-wake-speed motion makes every partner gap strictly decreasing and excludes positive self roots. At the candidate delay $d_L=L/\kappa$, both receiver and emitted heights vanish, so the source distance is purely planar.

Let $r_0=\rho(\phi_0)$, $r_L=\rho(\phi_0-L)$ and
$$
\alpha_{j,L}=j\pi/3-\beta L/\kappa+p(\phi_0-L)-p(\phi_0).
$$
Its exact planar chord is
$$
c_{j,L}=\sqrt{r_0^2+r_L^2-2r_0r_L\cos\alpha_{j,L}}.
$$
For the unique root in channel $j$, strict gap decrease gives the equivalence
$$
\Delta_j\ge d_L\quad\Longleftrightarrow\quad c_{j,L}\ge d_L.
$$
Consequently a necessary condition for exact balance is
$$
\boxed{\max_{1\le j\le5}c_{j,L}\ge\frac L\kappa.}
$$
This condition uses only the positions at the endpoints of the previous sign lobe, not a global diameter that includes the height maximum. It does not assert that satisfying the chord condition suffices for balance.

A simple sufficient exclusion is therefore
$$
\boxed{\kappa(r_0+r_L)<L,}
$$
since every planar chord is at most $r_0+r_L$. With a common radius ceiling $r_+$, the stronger but easier-to-check hypothesis $2\kappa r_+<L$ also excludes exact balance. No parity condition on radius or phase is used. In contrast to the velocity-independent diameter theorem, this sharper endpoint argument does use monotonicity of the causal gap over the entire delay interval; it cannot be transferred to above-wake-speed histories with multiple roots.

## The cosine-height restriction

For $z=H\cos\phi$ with $H>0$, take the descending zero $\phi_0=\pi/2$ and $L=\pi$. Every exact below-wake-speed member must satisfy
$$
\kappa\ge\frac{\pi}{r_0+r_L}\ge\frac{\pi}{2r_+}.
$$
At phases where axial speed is maximal, its magnitude is $\kappa H$. The common physical speed bound therefore gives $\kappa H\le v_*<1$. Combining these inequalities yields the necessary aspect-ratio condition
$$
\boxed{\frac H{r_+}\le\frac{2v_*}{\pi}<\frac2\pi.}
$$
Thus all cosine-height members with $H\ge2r_+/\pi$ are excluded at every scale, regardless of radius and phase reflection symmetry or the mean angular rate, provided their complete motion stays strictly below wake speed. This conclusion has no small-rate expansion. A convenient weaker rational corollary excludes $H\ge(2/3)r_+$, using $\pi>3$.

For constant unit radius and zero phase modulation, speed at a height crossing is exactly $\sqrt{\beta^2+\kappa^2H^2}$. Therefore any exact cosine member in that subfamily must obey
$$
\boxed{\kappa\ge\pi/2,\qquad H<\frac2\pi\sqrt{1-\beta^2}.}
$$
The right side presupposes $|\beta|<1$, already necessary for below-wake-speed rotation. Under the stricter declared budget $\beta^2+\kappa^2H^2\le v_*^2<1$, replace the last numerator by $\sqrt{v_*^2-\beta^2}$ and the strict inequality by the corresponding nonstrict bound. These inequalities constrain exact candidates; they do not make a sampled optimizer proposal exact or certify every remaining parameter.

## Curvature and height-shape scope

The general endpoint result requires the zero curvature to be nonnegative after a positive preceding lobe. At a descending zero, exact balance with all roots inside that lobe instead forces negative curvature. Arbitrary asymmetric height profiles can meet that sign and are not excluded. For even anti-periodic height positive on its principal half-cycle, the descending zero is an inflection, so the endpoint argument applies with $L=\pi$ even when the waveform has additional curvature changes inside the lobe.

The cosine aspect-ratio conclusion uses its exact maximum axial speed $\kappa H$; a general height amplitude alone does not give that derivative identity. Applying it to a non-sinusoidal height without a separate derivative estimate would be invalid.

## Verification and falsifiers

Independent reconstruction must check the gap-sign/root-position equivalence, the emitted endpoint phase, the planar chord, the direction of each necessary inequality and the distinction between the general curvature condition and the special cosine derivative relation. An exact complete below-wake-speed history meeting the lobe conditions but having every endpoint chord shorter than $L/\kappa$ would falsify the theorem. A cosine counterexample violating either stated necessary rate/aspect inequality would likewise refute its corollary. A high-speed history with a nonmonotone gap lies outside this sharper theorem rather than falsifying it.

No numerical instrument or target is used. All prior subjects and evidence remain frozen. This new analytical result is queued for independent adjudication and parent integration in the second overnight B account.
