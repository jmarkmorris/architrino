# A short analytical preparation-seam enclosure

The [directed protocol](alternatives-screen-2026-10-05-width-entry-directed-protocol.md) distinguishes the exact compatible release displacement $D=A\delta^2/6$ from the candidate's dyadic seam $d_*$. The tiny interval between them can be handled directly from the complete law rather than by identifying the two. This is a proposed sufficient enclosure awaiting the exact finite checks below; it is not yet a completed target certificate.

Let $I$ contain both $D$ and $d_*$, and suppose the finite candidate checks establish throughout $I$:

$$
0<d<10^{-7},\qquad 0<l(d)<m(d)<10^{-3},\qquad
(\tfrac12l^2)'<\tfrac{99}{100},\qquad
(\tfrac12m^2)'>\tfrac{103}{100}.
$$

The one-sided candidate derivatives suffice at its seam. Suppose also that its preparation coefficient inequalities are strict on the shared power-law portion, its speed bounds cover the exact preparation on any remaining prepared collar, and

$$
\frac{|I|}{\inf_I l}<10^{-6}.
$$

Then the candidate barriers cannot be first crossed on the generated part of the collar. Until a hypothetical first crossing, the whole recent source history has $0\le u_s<10^{-3}$. Its age since the held-tail endpoint is at most $\delta+10^{-6}<10^{-3}$, because $dt=dd/u$ and $u\ge l$. The entire partner window is therefore in the stationary tail: its range is $1-d>1-10^{-7}$ and its earliest admissible age is greater than $1-d-h>9/10$. The partner contribution is exactly $f_\rho(1-d)$.

For the self channel, $0\le R=d-d(s)\le d$. Its reception gap $g=R-(t-s)$ increases with source time at rate $1-u_s\ge999/1000$, reaches zero at the source diagonal, and tends to minus infinity along the complete held tail. Thus its full window mass is at most $1/[2(1-10^{-3})]$, including the held part. Since $f_\rho(R)\le R/\rho^3$, the exact total inward acceleration satisfies

$$
f_\rho(1-d)\le u'\le f_\rho(1-d)+\frac{10^{-7}}{2(1-10^{-3})\rho^3}.
$$

For all four selected cores, $\rho\in\{1/32,1/64\}$, elementary rational bounds give

$$
\frac{99}{100}<f_\rho(1-d),\qquad
f_\rho(1-d)+\frac{10^{-7}}{2(1-10^{-3})\rho^3}<\frac{103}{100}.
$$

For example the lower bound follows from $(1-d)/( (1-d)^2+\rho^2)^{3/2}\ge(1-10^{-7})/(1+1/1024)^2>99/100$, using $\sqrt{1+1/1024}<1+1/1024$. The upper follows from $f_\rho(1-d)\le(1-10^{-7})^{-2}$ and $\rho^{-3}\le64^3$. These are rational checks. The strict derivative signs contradict either first crossing, completing collar coverage when the finite candidate conditions hold.

The proof uses the true complete functional only on this short interval. Beyond the collar the separately derived displacement-functional bounds still require every receiver interval to pass. It neither assumes the candidate is an exact evolution nor inserts a zero self term.

> Grade: derived conditional collar lemma. Falsifiers are a failed candidate derivative/speed/time-width check, failed exact prepared overlap, or a source band reaching beyond the stated held region. Completing those checks is part of the proposed certificate, not supplied by this lemma alone.
