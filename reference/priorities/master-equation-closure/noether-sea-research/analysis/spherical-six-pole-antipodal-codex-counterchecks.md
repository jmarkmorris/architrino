# Six-pole antipodal motion: scoped coordinator counterchecks

These algebraic counterchecks concern the selected canonical transmitter-weighted interaction with its tangent component retained on the sphere, at $K=1$, $R=10$, $c_f=1$, $g=1/10$. They were developed after reading the independently frozen peer references and review adjudications1–3; they are not blind references and do not establish a new reached state. The prior frozen coordinator reference is unchanged. Independent reviewer adjudication is requested before integration into the scientific account. No new computational instrument was used.

## 1. An inward radial component on the current small-angle domain

Write $q$ for the receiver coordinate and $p_L,p_U$ for the like and unlike source coordinates at their respective emission times. They generally differ. For any $q,p\in[0,0.3]$, define

$$
\Phi(q,p)=\sqrt2\sin(q+p)-\sin q\sin p=\sin q(\sqrt2\cos p-\sin p)+\sqrt2\cos q\sin p.
$$

Since $\cos p\ge1-p^2/2\ge0.955$ and $\sin p\le p\le0.3$, both summands are nonnegative, and $\Phi>0$ whenever $q+p>0$. Thus the respective chords satisfy $r_L(q,p_L)>\sqrt2>r_U(q,p_U)$ when $q>0$, even when the two source emission arguments differ. The transmitter coefficient

$$
M(q,p)=\frac{\cos(q+p)}{\sqrt2}-\frac{\sin q\cos p}{2}\ge\frac{0.82}{\sqrt2}-0.15>0
$$

uses $q+p\le0.6$, $\cos(q+p)\ge1-(q+p)^2/2$ and $\sin q\cos p\le0.3$. Nonnegative source speeds imply $D_L\ge1$ and $D_U\le1$. With the independently certified positive transmitter factors, $1/(r_LD_L)<1/(r_UD_U)$; the own-antipode contribution is also negative. Consequently the total canonical radial acceleration is strictly inward on this domain. At release the like and unlike radial terms cancel and the antipode alone gives $a_{\rm rad}=-g/4$.

Grade: derived under the stated coordinate/speed/domain premises, which must be checked against the actual retained history. This does not establish the sign of the additional normal support $\hat\lambda=-\dot q^2-a_{\rm rad}$. The stronger claim in review adjudication2 that $\Phi>0$ for all $q,p\in[0,\pi/2]$ is false: $q=p=\pi/2$ gives $\Phi=-1$. The narrower proof above protects the current result without extending its domain. Falsifier: an attained source or receiver state outside these bounds, a negative source speed, or a nonpositive transmitter factor removes the proof's applicability; a substitution satisfying the premises but contradicting any displayed inequality would overturn the derivation.

## 2. The moving own-antipode reduces its forward contribution relative to its fixed image

For the actual own-antipode map $Y=-X(p)$ let $\delta=q-p$. Its independently established tangential contribution is

$$
a_A^{\rm moving}=g\frac{H(\delta)}{D_A},\qquad H(z)=\frac{\sin(z/2)}{4\cos^2(z/2)},\qquad D_A=1+v_s\sin(\delta/2).
$$

The fixed-image contribution at the same receiver coordinate is $a_A^{\rm fixed}=gH(q)$. On $0\le p\le q<\pi$, with $v_s\ge0$, $0\le\delta\le q$ and $D_A\ge1$. Moreover,

$$
H'(z)=\frac18\left[\sec(z/2)+2\sin^2(z/2)\sec^3(z/2)\right]>0\qquad(0\le z<\pi).
$$

Therefore $0\le a_A^{\rm moving}\le a_A^{\rm fixed}$, strictly smaller when $p>0$. The contribution remains forward along the motion, but the emission point's motion makes this contribution smaller than the stationary antipodal image at the same receiver position. This is a comparison of acceleration contributions at an actual receiver state, not a comparison of two evolved trajectories. At the release seam $p=v_s=0$ the two contributions coincide. For $p=q$ the moving contribution is zero, consistent with the exact antipodal chord.

Grade: derived under the displayed phase and speed premises. This settles the sign of this one class's moving correction on that domain; it does not settle the sum of all feedback corrections, the speed difference between trajectories, or the support sign. Falsifier: an admitted history with $p>q$, negative $v_s$, $q\ge\pi$, or nonpositive $D_A$ leaves the theorem's domain; an algebraic error in the derivative or the established own-antipode kernel would overturn it. The reviewer should verify the derivative and domain independently, then compare with the reached history before applying the result.
