# Weber binding sphere: closure of the great-circle class (derivation lane, 2026-10-06)

Status: derivation lane of the [second continuation](weber-binding-sphere-preregistration.md#113-item-2-great-circle-closure) of the Weber binding-sphere study. Target statement (i) of the preregistration is reached: under the instantaneous Weber comparison law, six members moving on great circles of one sphere at a common rate without collision satisfy the law only if they all lie on one oriented circle. The proof is complete in this file and every identity it uses has been spot-checked numerically by this lane (Section 13). The preregistered proof standard also requires re-examination by the reviewing lane with separately authored code; that review has not yet happened when this file is frozen, so the grade "derived" below is this lane's and the review is pending. The frozen starting point is Sections 15, 17 and 18 of the [independent reference](weber-binding-sphere-independent-reference.md), which this file does not change.

## Contents

1. Result in brief
2. Notation
3. The class and the closed system
4. Pair kinematics through isotropic vectors
5. Analytic structure in complex time
6. The class cancellation lemma
7. The class identities in closed form
8. Coincidence geometry
9. The rigid part: every oriented circle is a balanced ring
10. Counting and the main theorem
11. Consequences for F2, F5 and Theorem 18.3
12. What is not proved
13. Validation record
14. Claims, grades and falsifiers
15. Run record (append-only)

## 1. Result in brief

The question is whether six members, three of each polarity, can move on great circles of one sphere at a common angular rate, obey the instantaneous Weber comparison law at every instant, and yet not all lie on one planar ring. The answer derived here is no. Every collision-free solution of the law in this class has all six oriented normals equal, so the six members share one great circle and one sense of rotation and turn as a rigid planar ring; the law then reduces to the inverse-square balance of that ring, which the alternating hexagon satisfies.

The mechanism is easiest to see before the symbols. Two members on different great circles approach and recede twice per period, and the squared separation of the pair is a constant minus a single cosine of time. Such a pair never collides at a real time, but its squared separation does vanish at complex times, which this file calls the complex collision times of the pair. The acceleration that the law assigns to the pair contains half-integer powers of the squared separation, so it has a square-root branch point there and grows like the $-5/2$ power of the distance to the complex collision time. A member's equation of motion is an identity in time, so it continues to complex time, and near a complex collision time of one of its pairs every other pair's contribution stays bounded unless it has the same complex collision time. Circling the complex collision time once reverses the sign of the singular contributions and returns the bounded ones to their starting values, so the singular contributions must cancel among themselves, not only in their leading growth but identically in time. That splits each member's equation into independent pieces: one piece for each group of partners that share complex collision times, and one piece for the partners on the member's own oriented circle.

The pieces are then easy to analyse. The piece belonging to a member's own circle is the inverse-square balance of the members on that circle alone, which a lone member cannot satisfy, so every oriented circle carries at least two members. A group of partners sharing complex collision times must cancel as a fixed real combination of chords from the member to those partners, and a line meets a sphere in at most two points, so a group needs at least three partners. Two members of one oriented circle never share complex collision times with a third member, because their closest approaches to it occur at different times, so the three partners of a group lie on three different oriented circles. A solution that is not a planar ring therefore needs at least four oriented circles with at least two members each, which is eight members. Six is too few.

The statement concerns the instantaneous law of [Section 9 of the equation-variants manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) and the great-circle class only. It says nothing about spherical paths that are not great circles, about members with different rates, or about any delayed law.

> Claim grade: derived (complete proof in Sections 3 to 10; numerical spot checks of every identity in Section 13; independent review pending). Falsifier: a collision-free great-circle state of six members whose oriented normals are not all equal and whose closed-system residual over a period is below $10^{-8}$ by an independent evaluation.

## 2. Notation

| Symbol | Meaning |
| --- | --- |
| $T$ | absolute time; real on the motion, complex in Sections 5 and 6 |
| $N$ | number of members; $N=6$ in the target statement |
| $q_i$ | polarity of member $i$, $+1$ or $-1$; three of each sign in the target statement |
| $\sigma_{ij}=q_iq_j$ | polarity product of a pair, $+1$ for like and $-1$ for unlike polarities |
| $K$, $c_f$ | coupling constant and wake speed of the law, both positive; both equal to $1$ in every number in this file |
| $R$, $\Omega$ | radius of the sphere and the common angular rate, both positive |
| $\mathbf u_i,\mathbf u_i'$ | orthonormal vectors spanning the plane of member $i$'s great circle |
| $\mathbf m_i=\mathbf u_i\times\mathbf u_i'$ | oriented normal of member $i$: the unit normal about which the member turns in the right-handed sense |
| $\phi_i$ | phase of member $i$ |
| $\mathbf X_i(T)$ | position of member $i$; $\mathbf V_i$ its velocity |
| $d_{ij}$, $D_{ij}=d_{ij}^2$ | separation of a pair and its square |
| $w_{ij}$ | pair weight: the law's contribution of partner $j$ to the acceleration of $i$ is $w_{ij}(\mathbf X_i-\mathbf X_j)$ |
| $\mathbf F_i$ | residual of member $i$ in the closed system, equation (3.4) |
| $\mathbf b_i$ | complex isotropic vector of member $i$, equation (4.1); $\bar{\mathbf b}_i$ its complex conjugate |
| $z=e^{i\Omega T}$ | complex time variable on which every position is a Laurent polynomial of degree one |
| $A_{ij}$, $\alpha_{ij}$, $C_{ij}$ | pair constants defined by $\mathbf b_i\cdot\mathbf b_j=2A_{ij}e^{i\alpha_{ij}}$ and $C_{ij}=\tfrac12\operatorname{Re}(\mathbf b_i\cdot\bar{\mathbf b}_j)$ |
| $\tau_{ij}=2\Omega T+\alpha_{ij}$ | pair angle |
| $\kappa_{ij}=(1-C_{ij})/A_{ij}$ | closeness index of a non-rigid pair; larger than $1$ exactly when the pair never collides |
| $\rho_{ij}=\kappa_{ij}-\sqrt{\kappa_{ij}^2-1}$ | the root in $(0,1)$ of $\rho+1/\rho=2\kappa_{ij}$ |
| rigid pair | a pair with $A_{ij}=0$, that is $\mathbf m_i=\mathbf m_j$: both members on one oriented circle, at constant separation |
| oriented circle | a great circle together with a sense of rotation; members with equal $\mathbf m$ share one |
| $T_\ast$ | a complex collision time of a pair: a complex time at which $D_{ij}=0$ |
| $\mathbf N_{ij}=\mathbf X_i(T_\ast)-\mathbf X_j(T_\ast)$ | complex chord at a complex collision time |
| coincidence class | for a fixed member $i$, a maximal set of its non-rigid partners with one common $\alpha_{ij}$ modulo $2\pi$ and one common $\kappa_{ij}$ (Definition 6.1) |
| $h(\tau)=\kappa-\cos\tau$, $g(\tau)=-6+8\kappa\cos\tau-2\cos^2\tau$ | the two scalar functions of a class, Section 7 |
| $\mathbf Y_a(T)=\sum_{j\in S}\sigma_{ij}A_{ij}^{-a}(\mathbf X_i-\mathbf X_j)$ | weighted chord sums of a class $S$, for $a=\tfrac12$ and $a=\tfrac32$ |

The dot between complex vectors is always the bilinear product $\mathbf a\cdot\mathbf b=\sum_ka_kb_k$ with no complex conjugation. A complex vector is called isotropic when $\mathbf a\cdot\mathbf a=0$.

## 3. The class and the closed system

**The law.** For members $i=1,\dots,N$ with polarities $q_i$, the instantaneous Weber comparison law assigns the acceleration

$$
\mathbf A_i=\sum_{j\ne i}\frac{\sigma_{ij}K}{d_{ij}^{2}}\left[1-\frac{\dot d_{ij}^{2}}{2c_f^{2}}+\frac{d_{ij}\ddot d_{ij}}{c_f^{2}}\right]\mathbf e_{ij},\qquad \mathbf e_{ij}=\frac{\mathbf X_i-\mathbf X_j}{d_{ij}},
\tag{3.1}
$$

with distinct present-time partners, no self term, and dots denoting derivatives with respect to absolute time. The law gives accelerations directly; architrinos carry no mass and nothing in this file uses one.

**The class.** Every member moves on a great circle of the sphere of radius $R$ about the origin at one common rate,

$$
\mathbf X_i(T)=R\big[\cos(\Omega T+\phi_i)\,\mathbf u_i+\sin(\Omega T+\phi_i)\,\mathbf u_i'\big],\qquad \mathbf m_i=\mathbf u_i\times\mathbf u_i',
\tag{3.2}
$$

and no pair collides: $d_{ij}(T)>0$ for every pair and every real $T$. A common rate is forced by equal speed on paths of equal length. A member that turns in the opposite sense on the same geometric circle is described by the opposite normal, so the sense of rotation is carried by $\mathbf m_i$ and $\Omega$ is positive for everyone.

**The closed system.** On a history of the form (3.2) the acceleration of every member is known from kinematics, $\ddot{\mathbf X}_i=-\Omega^2\mathbf X_i$, and so is every separation as a function of time. The history satisfies the law exactly when (3.1), evaluated on the history, returns $-\Omega^2\mathbf X_i$ for every member and time. No linear solve is involved, because $\ddot d_{ij}$ is the second derivative of a known function. With $D=d^2$ one has $d\dot d=\dot D/2$ and $\dot d^2+d\ddot d=\ddot D/2$, so the bracket of (3.1) is $1+\ddot D/(2c_f^2)-3\dot D^2/(8Dc_f^2)$ and the contribution of partner $j$ is $w_{ij}(\mathbf X_i-\mathbf X_j)$ with

$$
w_{ij}=\sigma_{ij}K\,D_{ij}^{-3/2}\left[1+\frac{\ddot D_{ij}}{2c_f^2}-\frac{3\dot D_{ij}^2}{8D_{ij}c_f^2}\right]=\sigma_{ij}K\,D_{ij}^{-5/2}\left[\Big(1+\frac{\ddot D_{ij}}{2c_f^2}\Big)D_{ij}-\frac{3\dot D_{ij}^2}{8c_f^2}\right].
\tag{3.3}
$$

The law on the class is therefore the closed system

$$
\mathbf F_i(T):=\sum_{j\ne i}w_{ij}(T)\big(\mathbf X_i(T)-\mathbf X_j(T)\big)+\Omega^2\mathbf X_i(T)=\mathbf 0\qquad\text{for every member }i\text{ and every real }T.
\tag{3.4}
$$

This is equation (15.3) of the independent reference, reached here without its solve-elimination step because the class prescribes the rate as well as the path. The residual $\mathbf F_i$ is the law's right-hand side minus the kinematic acceleration.

> Claim grade: derived. Checked numerically in Section 13, check 1: on ten random great-circle states the evaluator of (3.4) written for this file agrees with the frozen reference library's matrix-free law residual and with its assembled $\mathbf b-M\mathbf a$ to $1.1\times10^{-15}$ and $7.1\times10^{-16}$ relative. Falsifier: a great-circle state on which the two evaluations differ beyond rounding.

## 4. Pair kinematics through isotropic vectors

**Isotropic vectors.** Put $z=e^{i\Omega T}$ and

$$
\mathbf b_i=e^{i\phi_i}(\mathbf u_i-i\mathbf u_i'),\qquad \mathbf X_i=\frac R2\Big(z\,\mathbf b_i+\frac{\bar{\mathbf b}_i}{z}\Big).
\tag{4.1}
$$

For real $T$ the second expression is $R\operatorname{Re}(z\mathbf b_i)$, which is (3.2); for complex $T$ it is the analytic continuation of (3.2), an entire function of $T$. The vector $\mathbf b_i$ is isotropic, $\mathbf b_i\cdot\mathbf b_i=0$, and $\mathbf b_i\cdot\bar{\mathbf b}_i=2$. It encodes the member completely: its direction class fixes the oriented circle and its phase fixes where the member is on it.

**Lemma 4.1 (same oriented circle).** Members $i$ and $j$ have $\mathbf m_i=\mathbf m_j$ if and only if $\mathbf b_j=e^{i\delta}\mathbf b_i$ for a real $\delta$, and then $\mathbf X_j(T)$ is $\mathbf X_i(T)$ advanced by the angle $\delta$ along the circle, for every $T$. The two members coincide exactly when $\delta\equiv0$ modulo $2\pi$, and they are antipodal, $\mathbf X_j=-\mathbf X_i$, exactly when $\delta\equiv\pi$.

*Proof.* Two positively oriented orthonormal bases of one oriented plane differ by a rotation, $\mathbf u_j=\cos\psi\,\mathbf u_i+\sin\psi\,\mathbf u_i'$ and $\mathbf u_j'=-\sin\psi\,\mathbf u_i+\cos\psi\,\mathbf u_i'$, which gives $\mathbf u_j-i\mathbf u_j'=e^{i\psi}(\mathbf u_i-i\mathbf u_i')$ and so $\mathbf b_j=e^{i\delta}\mathbf b_i$ with $\delta=\phi_j-\phi_i+\psi$. Then $z\mathbf b_j=(ze^{i\delta})\mathbf b_i$, which is $\mathbf X_i$ with $\Omega T$ replaced by $\Omega T+\delta$. Conversely, if $\mathbf b_j=e^{i\delta}\mathbf b_i$ the real and imaginary parts of the two vectors span the same plane with the same orientation. $\square$

**Pair constants.** From (4.1),

$$
\mathbf X_i\cdot\mathbf X_j=\frac{R^2}{4}\Big[z^2\,\mathbf b_i\cdot\mathbf b_j+z^{-2}\,\bar{\mathbf b}_i\cdot\bar{\mathbf b}_j+\mathbf b_i\cdot\bar{\mathbf b}_j+\bar{\mathbf b}_i\cdot\mathbf b_j\Big]=R^2\big(C_{ij}+A_{ij}\cos\tau_{ij}\big),
\tag{4.2}
$$

where $\mathbf b_i\cdot\mathbf b_j=2A_{ij}e^{i\alpha_{ij}}$ with $A_{ij}\ge0$, $C_{ij}=\tfrac12\operatorname{Re}(\mathbf b_i\cdot\bar{\mathbf b}_j)$ and $\tau_{ij}=2\Omega T+\alpha_{ij}$. Choosing both in-plane bases with first vector along the line where the two planes meet (any line of the plane if the two planes coincide) shows $|\mathbf b_i\cdot\mathbf b_j|=1-\mathbf m_i\cdot\mathbf m_j$, since then $\mathbf u_i\cdot\mathbf u_j=1$, $\mathbf u_i'\cdot\mathbf u_j'=\mathbf m_i\cdot\mathbf m_j$ and the mixed products vanish, while a change of basis or phase only multiplies $\mathbf b$ by a unit complex number. Hence

$$
A_{ij}=\tfrac12(1-\mathbf m_i\cdot\mathbf m_j),\qquad D_{ij}=2R^2\big(1-C_{ij}-A_{ij}\cos\tau_{ij}\big),\qquad \dot D_{ij}=4\Omega R^2A_{ij}\sin\tau_{ij},\qquad \ddot D_{ij}=8\Omega^2R^2A_{ij}\cos\tau_{ij},
\tag{4.3}
$$

which is (18.1) and (18.2) of the independent reference with the radius restored. Inserting (4.3) in (3.3) gives the bracket with its dependence on $R$ and $c_f$ explicit,

$$
1-\frac{\dot d^2}{2c_f^2}+\frac{d\ddot d}{c_f^2}=1+\frac{4\Omega^2R^2A\cos\tau}{c_f^2}-\frac{6\Omega^2R^4A^2\sin^2\tau}{c_f^2\,D},
\tag{4.4}
$$

so the reference's (18.3), written there for $R=1$, acquires $R^2$ in its cosine term and $R^4/D$ in its last term.

**Rigid and non-rigid pairs.** $A_{ij}=0$ exactly when $\mathbf m_i=\mathbf m_j$. Such a pair is called rigid: its separation is the constant $d_{ij}=R\sqrt{2(1-C_{ij})}$, the bracket (4.4) equals $1$, and $w_{ij}=\sigma_{ij}K/d_{ij}^3$ is constant. A pair with $A_{ij}>0$ is called non-rigid; its squared separation oscillates between $2R^2(1-C-A)$ and $2R^2(1-C+A)$, so it never collides exactly when $1-C_{ij}>A_{ij}$, that is $\kappa_{ij}>1$. Two members on one geometric circle turning in opposite senses have $\mathbf m_j=-\mathbf m_i$, $A=1$, $C=0$ and $\kappa=1$: they collide twice per period and are outside the class. In the class, then, every pair is either rigid or non-rigid with $\kappa_{ij}>1$, and for a non-rigid pair

$$
D_{ij}=2R^2A_{ij}\,\big(\kappa_{ij}-\cos\tau_{ij}\big).
\tag{4.5}
$$

**Lemma 4.2 (two members of one oriented circle seen from a third).** Let $j$ and $j'$ be distinct members on one oriented circle, $\mathbf b_{j'}=e^{i\delta}\mathbf b_j$ with $\delta\not\equiv0$, and let $i$ be a member on a different oriented circle. Then $A_{ij'}=A_{ij}$ and $\alpha_{ij'}\equiv\alpha_{ij}+\delta$ modulo $2\pi$. In particular $\alpha_{ij'}\not\equiv\alpha_{ij}$. If $j'$ is the antipode of $j$, then in addition $C_{ij'}=-C_{ij}$.

*Proof.* $\mathbf b_i\cdot\mathbf b_{j'}=e^{i\delta}\,\mathbf b_i\cdot\mathbf b_j=2A_{ij}e^{i(\alpha_{ij}+\delta)}$. For the antipode $\mathbf b_{j'}=-\mathbf b_j$, so $\mathbf b_i\cdot\bar{\mathbf b}_{j'}=-\mathbf b_i\cdot\bar{\mathbf b}_j$. $\square$

In words: the pair angle $\tau_{ij}$ vanishes when the pair is at its closest, so $\alpha_{ij}$ records when member $i$ is closest to member $j$, and two members that follow one another around the same circle are closest to $i$ at different times.

> Claim grade: derived. Checked numerically in Section 13, check 4(a): (4.2) to (4.4) with random $R\in[0.5,2]$, the antipodal relations and Lemma 4.2 on $200$ random pairs, all to $3.3\times10^{-14}$ or better. Falsifier: a great-circle pair on which any of these relations fails beyond rounding.

## 5. Analytic structure in complex time

Fix a non-rigid pair and drop its indices. Everything in (3.3) is an entire function of $T$ except the half-integer power of $D$. By (4.5), $D$ vanishes exactly where $\cos\tau=\kappa$. Since $\kappa>1$ this has no real solution, and its complex solutions are

$$
\tau_\ast=\pm i\operatorname{arccosh}\kappa+2\pi n,\qquad T_\ast=\frac{-\alpha+2\pi n\pm i\operatorname{arccosh}\kappa}{2\Omega},\qquad n\in\mathbb Z .
\tag{5.1}
$$

These are the complex collision times of the pair. In the variable $z$ they are the four points $z_\ast^2=\rho^{\pm1}e^{-i\alpha}$, so $|z_\ast|^2=\rho$ or $1/\rho$, never $1$.

**Simple zeros.** At a complex collision time $\sin\tau_\ast=\pm i\sqrt{\kappa^2-1}$, which is not zero because $\kappa>1$. Hence $\dot D(T_\ast)=4\Omega R^2A\sin\tau_\ast\ne0$: every zero of $D$ is simple, $D=\dot D(T_\ast)(T-T_\ast)+O((T-T_\ast)^2)$, and $\sqrt D$ has a square-root branch point at each $T_\ast$ and no other singularity. This answers the question whether $\sin\tau_\ast$ can vanish: it cannot in the collision-free class, and it does exactly in the excluded limit $\kappa=1$ of a real collision.

**The entire numerator and the exponents.** Write $s=\sqrt D$ and

$$
\mathbf E_{ij}(T)=\sigma_{ij}K\left[\Big(1+\frac{\ddot D_{ij}}{2c_f^2}\Big)D_{ij}-\frac{3\dot D_{ij}^2}{8c_f^2}\right]\big(\mathbf X_i-\mathbf X_j\big),\qquad w_{ij}\,(\mathbf X_i-\mathbf X_j)=s_{ij}^{-5}\,\mathbf E_{ij}.
\tag{5.2}
$$

$\mathbf E_{ij}$ is an entire function of $T$ (a Laurent polynomial in $z$ with powers $z^{\pm1},z^{\pm3},z^{\pm5}$). At a complex collision time its value is

$$
\mathbf E_{ij}(T_\ast)=-\frac{3\sigma_{ij}K}{8c_f^2}\dot D_{ij}(T_\ast)^2\,\mathbf N_{ij}=-\frac{6\sigma_{ij}K\,\Omega^2R^4A_{ij}^2\sin^2\tau_\ast}{c_f^2}\,\mathbf N_{ij}=\frac{6\sigma_{ij}K\,\Omega^2R^4A_{ij}^2(\kappa_{ij}^2-1)}{c_f^2}\,\mathbf N_{ij},
\tag{5.3}
$$

so the pair's contribution to $\mathbf F_i$ behaves like $\big(\dot D(T_\ast)(T-T_\ast)\big)^{-5/2}\mathbf E_{ij}(T_\ast)$: it grows like the $-5/2$ power of the distance to $T_\ast$, with a vector coefficient along the complex chord $\mathbf N_{ij}$. The part of (3.3) that comes from the static inverse-square term alone, $\sigma K D^{-3/2}(\mathbf X_i-\mathbf X_j)$, grows only like the $-3/2$ power; the stronger growth is the velocity-dependent part of the law, through $\dot d^2$.

**The complex chord is isotropic and not zero.** $\mathbf N_{ij}\cdot\mathbf N_{ij}=D_{ij}(T_\ast)=0$. Suppose $\mathbf N_{ij}=\mathbf 0$, so that $\mathbf X_i(T_\ast)=\mathbf X_j(T_\ast)=:\mathbf Y$. The two planes are different, because the pair is non-rigid and $\mathbf m_j=-\mathbf m_i$ is excluded, so they meet in a real line with unit vector $\boldsymbol\ell$ and their complexifications meet in the complex multiples of $\boldsymbol\ell$. Then $\mathbf Y=c\,\boldsymbol\ell$ with $c^2=\mathbf Y\cdot\mathbf Y=R^2$, so $\mathbf Y$ is real, both $\cos(\Omega T_\ast+\phi_i)$ and $\sin(\Omega T_\ast+\phi_i)$ are real, their combination $e^{i(\Omega T_\ast+\phi_i)}$ has modulus one, and $T_\ast$ is real, which contradicts (5.1). So $\mathbf N_{ij}$ is a non-zero isotropic vector and the leading coefficient (5.3) never vanishes for a single pair.

> Claim grade: derived. Checked numerically in Section 13, check 2, on $50$ random configurations: $|D(T_\ast)|\le2.0\times10^{-14}$; $\dot D(T_\ast)=4\Omega R^2A\sin\tau_\ast$ to $3.1\times10^{-15}$; $|\mathbf N\cdot\mathbf N|/\|\mathbf N\|^2\le2.6\times10^{-15}$ with $\|\mathbf N\|\ge0.45$; growth exponent of $\|\mathbf F_i\|$ equal to $-5/2$ within $5.5\times10^{-8}$; $s^5\mathbf F_i\to\mathbf E_{ij}(T_\ast)$ with relative error proportional to the distance $r$ from $T_\ast$, $6.8\times10^{-6}$ at $r=10^{-6}$. Falsifier: a collision-free non-rigid pair for which $\|\mathbf F_i\|$ near $T_\ast$ does not scale as $r^{-5/2}$ or whose scaled limit differs from (5.3).

## 6. The class cancellation lemma

**Definition 6.1 (coincidence class).** Fix a member $i$. Two of its non-rigid partners $j$ and $j'$ are called coincident for $i$ when $\alpha_{ij'}\equiv\alpha_{ij}$ modulo $2\pi$ and $\kappa_{ij'}=\kappa_{ij}$. This is an equivalence relation on the non-rigid partners of $i$; its classes are the coincidence classes of $i$. A class $S$ has a common pair angle $\tau_S=2\Omega T+\alpha_S$ up to multiples of $2\pi$ and a common $\kappa_S$.

**Lemma 6.2 (what coincidence means).** For two non-rigid partners $j,j'$ of $i$ the following are equivalent: (a) the pairs $(i,j)$ and $(i,j')$ have a complex collision time in common; (b) they have all their complex collision times in common; (c) $j$ and $j'$ are coincident for $i$; (d) $D_{ij'}(T)=(A_{ij'}/A_{ij})\,D_{ij}(T)$ for all $T$.

*Proof.* (c) gives (d) by (4.5), since the two pair angles differ by a multiple of $2\pi$; (d) gives (b), and (b) gives (a). For (a) to (c), let $T_\ast$ be common. By (5.1), $2\Omega T_\ast=-\alpha_{ij}+2\pi n\pm i\operatorname{arccosh}\kappa_{ij}=-\alpha_{ij'}+2\pi n'\pm' i\operatorname{arccosh}\kappa_{ij'}$. Both inverse hyperbolic cosines are positive, so comparing imaginary parts gives equal signs and $\kappa_{ij}=\kappa_{ij'}$, and comparing real parts gives $\alpha_{ij}\equiv\alpha_{ij'}$. $\square$

Geometrically, (d) says that the two partners are at proportional distances from $i$ at every instant: they are closest to $i$ at the same times, and the ratio of closest to farthest distance is the same for both.

**Lemma 6.3 (class cancellation).** Let (3.4) hold for member $i$. Then for every coincidence class $S$ of $i$,

$$
\sum_{j\in S}w_{ij}(T)\big(\mathbf X_i(T)-\mathbf X_j(T)\big)=\mathbf 0\qquad\text{for every real }T,
\tag{6.1}
$$

and the partners on $i$'s own oriented circle satisfy by themselves

$$
\sum_{j\ne i,\ \mathbf m_j=\mathbf m_i}\frac{\sigma_{ij}K}{d_{ij}^3}\big(\mathbf X_i(T)-\mathbf X_j(T)\big)+\Omega^2\mathbf X_i(T)=\mathbf 0\qquad\text{for every real }T.
\tag{6.2}
$$

Conversely (6.1) for every class together with (6.2) is (3.4). So the member's equation splits into one independent identity per coincidence class and one for its own circle.

*Proof.* Let $B$ be the set of all complex collision times of all non-rigid pairs $(i,j)$ containing $i$; by (5.1) it is a discrete closed subset of the complex $T$ plane, and it does not meet the real axis. For each non-rigid partner $j$, $D_{ij}$ is entire and has no zero outside $B$, so the germ of $s_{ij}=\sqrt{D_{ij}}$ that is positive on the real axis continues analytically along every path in $\mathbb C\setminus B$. The functions $\mathbf E_{ij}$, $\mathbf X_i$ and the rigid weights are entire or constant. Therefore the expression

$$
\mathbf F_i=\sum_{j\ \text{non-rigid}}s_{ij}^{-5}\,\mathbf E_{ij}+\sum_{j\ \text{rigid}}\frac{\sigma_{ij}K}{d_{ij}^3}(\mathbf X_i-\mathbf X_j)+\Omega^2\mathbf X_i
$$

continues analytically along every path in $\mathbb C\setminus B$ that starts on the real axis, as the same expression in the continued roots. On the real axis it is identically zero by hypothesis; being analytic near the real axis, it is then zero on a complex neighbourhood of the real axis by the identity theorem; the continuation of the zero germ is the zero germ; and so the continued expression vanishes at every point of every such path. This is the only use of analytic continuation in the argument, and it needs no strip of joint analyticity: the path may pass above the complex collision times of other pairs, where their roots may have changed sign relative to a straight continuation, and the conclusion is unaffected because the identity is carried along the path whatever those signs are.

Now fix a class $S$, one of its complex collision times $T_\ast$, and a closed disc $\Delta$ about $T_\ast$ containing no other point of $B$. Choose a path $\gamma$ in $\mathbb C\setminus B$ from the real axis to a point $T_1\in\Delta\setminus\{T_\ast\}$; one exists because $B$ is discrete. Let $\ell$ be the loop from $T_1$ once around $T_\ast$ inside $\Delta\setminus\{T_\ast\}$.

For a non-rigid partner $j\notin S$, Lemma 6.2 shows that $T_\ast$ is not a zero of $D_{ij}$, so $D_{ij}$ has no zero in $\Delta$, the continued $s_{ij}$ extends to a holomorphic function on all of $\Delta$, and it returns to itself along $\ell$. For $j\in S$, choose a reference member $j_1\in S$ and write $s=s_{ij_1}$. By Lemma 6.2(d), $s_{ij}=\sqrt{A_{ij}/A_{ij_1}}\;s$ on the real axis, both sides are continuations of analytic germs, and so the relation holds along $\gamma$ and $\ell$: the roots of the members of one class are locked together on every sheet. Since $D_{ij_1}$ has a simple zero at $T_\ast$ (Section 5), $s$ changes sign along $\ell$. Collect

$$
\mathbf Q_S(T)=\sum_{j\in S}\Big(\frac{A_{ij_1}}{A_{ij}}\Big)^{5/2}\mathbf E_{ij}(T),\qquad \mathbf G(T)=\sum_{j\ \text{non-rigid},\ j\notin S}s_{ij}^{-5}\mathbf E_{ij}+\sum_{j\ \text{rigid}}\frac{\sigma_{ij}K}{d_{ij}^3}(\mathbf X_i-\mathbf X_j)+\Omega^2\mathbf X_i ,
$$

where $\mathbf Q_S$ is entire and $\mathbf G$, with the roots continued along $\gamma$, is holomorphic on $\Delta$. The continued identity at $T_1$ reads $s^{-5}\mathbf Q_S+\mathbf G=\mathbf 0$ as germs, and after the loop it reads $-s^{-5}\mathbf Q_S+\mathbf G=\mathbf 0$. Subtracting, $s^{-5}\mathbf Q_S=\mathbf 0$ near $T_1$; since $s\ne0$ there, $\mathbf Q_S$ vanishes on an open set and, being entire, vanishes identically. On the real axis $\sum_{j\in S}w_{ij}(\mathbf X_i-\mathbf X_j)=s^{-5}\mathbf Q_S$ with the positive root, which is (6.1). The classes partition the non-rigid partners, so subtracting (6.1) for every class from (3.4) leaves (6.2), with the rigid weights of Section 4. The converse is the same sum read backwards. $\square$

The lemma does not use the number of members, the values of the polarities, or the sign of any polarity product; it holds for any number of members with any non-zero real $q_i$.

**Remarks on the argument.** First, a rigid partner contributes a constant weight and has no singularity, so it can never cancel a singular term; this is why the rigid partners separate into (6.2). Second, the lemma is stronger than cancellation of leading singular parts: one loop removes the whole class contribution at every order. Third, a statement equivalent to the lemma is that the functions $h_S^{-1/2}$ of distinct classes, together with the constant $1$, are linearly independent over the field of rational functions of $z$; the loop argument is a proof of that independence.

> Claim grade: derived. Checked numerically in Section 13: check 2, that one loop about $T_\ast$ reverses the root of the singular pair and returns the roots of the other four partners, in $50$ of $50$ random configurations, and that the other partners' contributions stay bounded near $T_\ast$ (the remainder $s^5\mathbf F_i-\mathbf E_{ij}$ scales as $r^{5/2}$, measured exponent between $2.496$ and $2.517$ with median $2.50001$); check 3(b), that the roots of coincident partners stay locked in the ratio $\sqrt{A_{ij'}/A_{ij}}$ along the continuation path, to $5.4\times10^{-9}$. Falsifier: a great-circle state, of any number of members, on which (3.4) holds for a member to rounding while one of its class sums (6.1) does not.

## 7. The class identities in closed form

**Lemma 7.1 (two chord identities).** For a class $S$ of member $i$, with $h(\tau)=\kappa_S-\cos\tau$, $g(\tau)=-6+8\kappa_S\cos\tau-2\cos^2\tau$ and the weighted chord sums $\mathbf Y_a(T)=\sum_{j\in S}\sigma_{ij}A_{ij}^{-a}\,(\mathbf X_i-\mathbf X_j)$,

$$
\sum_{j\in S}w_{ij}\,(\mathbf X_i-\mathbf X_j)=\frac{K}{\big(2R^2h(\tau_S)\big)^{5/2}}\left[2R^2\,h(\tau_S)\,\mathbf Y_{3/2}(T)+\frac{\Omega^2R^4}{c_f^2}\,g(\tau_S)\,\mathbf Y_{1/2}(T)\right],
\tag{7.1}
$$

and (6.1) holds if and only if both

$$
\textbf{(I)}\quad\sum_{j\in S}\sigma_{ij}A_{ij}^{-1/2}\big(\mathbf X_i(T)-\mathbf X_j(T)\big)=\mathbf 0\qquad\text{and}\qquad\textbf{(II)}\quad\sum_{j\in S}\sigma_{ij}A_{ij}^{-3/2}\big(\mathbf X_i(T)-\mathbf X_j(T)\big)=\mathbf 0
\tag{7.2}
$$

hold for every $T$. Equivalently, in terms of the isotropic vectors, $\sum_{j\in S}\sigma_{ij}A_{ij}^{-1/2}(\mathbf b_i-\mathbf b_j)=\mathbf 0$ and $\sum_{j\in S}\sigma_{ij}A_{ij}^{-3/2}(\mathbf b_i-\mathbf b_j)=\mathbf 0$. The two identities do not contain $K$, $c_f$, $\Omega$ or $R$.

*Proof.* Insert $D_{ij}=2R^2A_{ij}h$, $\dot D_{ij}=4\Omega R^2A_{ij}\sin\tau$ and $\ddot D_{ij}=8\Omega^2R^2A_{ij}\cos\tau$ in (3.3): the square bracket of its second form is $2R^2A_{ij}h+(\Omega^2R^4A_{ij}^2/c_f^2)\,[8\cos\tau\,(\kappa-\cos\tau)-6\sin^2\tau]$, and the last bracket is $g(\tau)$. Dividing by $D_{ij}^{5/2}=(2R^2h)^{5/2}A_{ij}^{5/2}$ and summing gives (7.1). For the equivalence, each $\mathbf Y_a$ is a first harmonic, $\mathbf Y_a=\tfrac R2(z\,\mathbf y_a+\bar{\mathbf y}_a/z)$ with $\mathbf y_a=\sum_{j\in S}\sigma_{ij}A_{ij}^{-a}(\mathbf b_i-\mathbf b_j)$, while $h$ contains $z^{\pm2}$ and $g$ contains $z^{\pm4}$ with the coefficient $-\tfrac12e^{2i\alpha_S}$ of $z^4$. If the bracket of (7.1) vanishes identically, its coefficient of $z^5$, which is $-(\Omega^2R^5/4c_f^2)\,e^{2i\alpha_S}\,\mathbf y_{1/2}$ and comes from $g\,\mathbf Y_{1/2}$ alone, must vanish; so $\mathbf y_{1/2}=\mathbf 0$ and $\mathbf Y_{1/2}\equiv\mathbf 0$. Then $h\,\mathbf Y_{3/2}\equiv\mathbf 0$ with $h>0$ on the real axis, so $\mathbf Y_{3/2}\equiv\mathbf 0$. The converse is immediate. $\square$

Identity (II) is the cancellation of the static inverse-square parts of the class, and identity (I) is the cancellation of its velocity-dependent parts; the law's coefficients enter only through the fact that the coefficient $-2$ of $\cos^2\tau$ in $g$ is not zero.

**Lemma 7.2 (order by order).** For a class $S$ and one of its complex collision times $T_\ast$, the coefficient of the leading singular order $(T-T_\ast)^{-5/2}$ of the class sum is a non-zero multiple of $\mathbf Y_{1/2}(T_\ast)=\sum_{j\in S}\sigma_{ij}A_{ij}^{-1/2}\mathbf N_{ij}$, and it vanishes if and only if identity (I) holds for all $T$. When (I) holds the class sum is $K(2R^2h)^{-3/2}\mathbf Y_{3/2}$, whose leading order $(T-T_\ast)^{-3/2}$ has a coefficient proportional to $\mathbf Y_{3/2}(T_\ast)$, and that vanishes if and only if (II) holds for all $T$. So cancellation at the two leading orders at a single complex collision time already forces the class sum to vanish identically.

*Proof.* By (7.1) and $h(\tau_\ast)=0$, $g(\tau_\ast)=6(\kappa^2-1)\ne0$, the leading coefficient is a non-zero multiple of $\mathbf Y_{1/2}(T_\ast)=\tfrac R2(z_\ast\mathbf y_{1/2}+\bar{\mathbf y}_{1/2}/z_\ast)$. If this is zero then $\mathbf y_{1/2}=-z_\ast^{-2}\bar{\mathbf y}_{1/2}$; taking Hermitian norms, $\|\mathbf y_{1/2}\|=|z_\ast|^{-2}\|\mathbf y_{1/2}\|$, and $|z_\ast|^2=\rho^{\pm1}\ne1$ by Section 5, so $\mathbf y_{1/2}=\mathbf 0$. The same argument applies to $\mathbf Y_{3/2}(T_\ast)$. $\square$

**Corollary 7.3 (scalar and vector consequences).** If (I) and (II) hold for a class $S$ of member $i$, then

$$
\sum_{j\in S}\sigma_{ij}A_{ij}^{1/2}=0,\qquad\sum_{j\in S}\sigma_{ij}A_{ij}^{-1/2}=0,\qquad\sum_{j\in S}\sigma_{ij}A_{ij}^{-1/2}\,\mathbf X_j(T)=\mathbf 0\ \text{ for all }T .
\tag{7.3}
$$

In particular every class contains partners of both polarities.

*Proof.* Contract $\mathbf y_{1/2}=\mathbf 0$ and $\mathbf y_{3/2}=\mathbf 0$ with $\mathbf b_i$, using $\mathbf b_i\cdot\mathbf b_i=0$ and $\mathbf b_i\cdot\mathbf b_j=2A_{ij}e^{i\alpha_S}$ for $j\in S$: this gives the two scalar sums. The second scalar sum removes the $\mathbf X_i$ term from (I), leaving the vector statement. $\square$

> Claim grade: derived. Checked numerically in Section 13, check 4: (7.1) against the law evaluated directly on $34$ constructed classes at random $R$, $\Omega$ and times, to $7.6\times10^{-13}$; the Fourier coefficients of the class numerator computed from the law, $z^5$ and $z^3$ against their closed forms to $7.6\times10^{-16}$ and $1.3\times10^{-15}$, with every other tested harmonic below $1.6\times10^{-15}$; $\mathbf N_{ij}=\tfrac R2(z_\ast\boldsymbol\beta+\bar{\boldsymbol\beta}/z_\ast)$ with $\boldsymbol\beta=\mathbf b_i-\mathbf b_j$ and $|z_\ast|^2=\rho$ to $6.4\times10^{-14}$; the contractions with $\mathbf b_i$ to $4.3\times10^{-14}$. Check 3(b) confirms on $678$ constructed coincident partners that the leading-order defect at $T_\ast$ and the defect of identity (I) agree, as Lemma 7.2 requires. Falsifier: a set of partners with common $\alpha$ and $\kappa$ on which (7.1) fails beyond rounding.

## 8. Coincidence geometry

**Coincidence is not generic.** Sharing complex collision times imposes two real conditions on a partner, $\alpha_{ij'}\equiv\alpha_{ij}$ and $\kappa_{ij'}=\kappa_{ij}$, so among random configurations it does not occur: in $3000$ pairs of partners of a common member the smallest distance between their branch points in the $\tau$ plane was $0.045$ and the median $2.1$ (Section 13, check 3(a)). For a generic configuration every class is a single partner, and a single partner cannot cancel (Lemma 8.1).

**Coincident partners exist.** For a given member $i$ and partner $j$, the partners $j'$ coincident with $j$ form a one-parameter family, since a member has three parameters (two for the normal, one for the phase) and coincidence imposes two conditions. One member of the family is explicit: the mirror image of $j$ in the plane of $i$'s circle. The reflection fixes $\mathbf X_i(T)$ for all $T$, so $\mathbf X_i\cdot\mathbf X_{j'}=\mathbf X_i\cdot\mathbf X_j$ identically and $D_{ij'}=D_{ij}$, with $A_{ij'}=A_{ij}$. The mirror image serves only as an explicit instance of coincidence and as an algebraic test case for (7.1): it collides with $j$ itself whenever $j$ crosses the plane of $i$'s circle, so it cannot occur together with $j$ in a collision-free configuration (check 6 confirms $\kappa_{jj'}=1$ to rounding). Along the rest of the family the ratio $A_{ij'}/A_{ij}$ varies and the partners do not collide in general; the $678$ coincident partners constructed numerically in check 3(b) have ratios between $0.08$ and $3.2$.

**Lemma 8.1 (a class has at least three members).** In a solution, no coincidence class has one member or two members.

*Proof.* Let (I) hold for $S$ (Lemma 7.1). If $S=\{j\}$, then $\mathbf X_i\equiv\mathbf X_j$, a collision. If $S=\{j,j'\}$, write (I) as $c\,(\mathbf X_i-\mathbf X_j)+c'(\mathbf X_i-\mathbf X_{j'})=\mathbf 0$ with $c=\sigma_{ij}A_{ij}^{-1/2}$ and $c'=\sigma_{ij'}A_{ij'}^{-1/2}$, both non-zero real numbers. If $c+c'=0$, then $\mathbf X_j\equiv\mathbf X_{j'}$, a collision. If $c+c'\ne0$, then at each real time $\mathbf X_i=(c\,\mathbf X_j+c'\mathbf X_{j'})/(c+c')$ is a point of the straight line through $\mathbf X_j$ and $\mathbf X_{j'}$, and it lies on the sphere, as they do. A line meets a sphere in at most two points, so $\mathbf X_i$ equals $\mathbf X_j$ or $\mathbf X_{j'}$, a collision. $\square$

The proof uses identity (I) alone, and identity (II) alone would serve equally, so the conclusion does not depend on which of the two parts of the law is considered. It also settles the question of signs for a pair of coincident partners: neither equal nor opposite polarity products allow two partners to cancel. The case of equal $A$ shows the two alternatives most plainly: with opposite products the two chords would have to be equal, which is a collision of the partners; with equal products the member would have to sit at the midpoint of its two partners, which is inside the sphere. With unequal $A$ the member would have to sit elsewhere on the line through its two partners, which meets the sphere nowhere else. The numerical construction shows the same thing quantitatively: over the constructed family the normalized cancellation defect is at least $0.54$ for equal polarity products, and for opposite products it falls only as the two partners approach one another, staying above $0.186$ times their separation (check 3(b)).

**What vector proportionality at a complex collision time means.** At leading order alone, cancellation between two partners reads $\mathbf N_{ij'}=\lambda\,\mathbf N_{ij}$ with $\lambda=-\sigma_{ij}\sigma_{ij'}\sqrt{A_{ij'}/A_{ij}}$ real. Then $\mathbf X_j(T_\ast)-\mathbf X_{j'}(T_\ast)=(\lambda-1)\,\mathbf N_{ij}$ is again isotropic, so unless $\lambda=1$ the pair $(j,j')$ would itself have a complex collision at $T_\ast$, and the three complex points $\mathbf X_i(T_\ast)$, $\mathbf X_j(T_\ast)$, $\mathbf X_{j'}(T_\ast)$ would lie on one isotropic complex line of the complex sphere $\mathbf X\cdot\mathbf X=R^2$. At a single complex time this is not contradictory, because the complex sphere does contain lines. The contradiction comes from Lemma 7.2: cancellation at one complex collision time forces identity (I) at all times, in particular at real times, where the sphere contains no line. This is why the analysis is carried out on the identities (7.2) and not on the complex chords.

**Lemma 8.2 (one member per oriented circle).** Two distinct members of one oriented circle never belong to the same coincidence class of a third member.

*Proof.* Lemma 4.2: their $\alpha$ values with respect to the third member differ by their angular separation $\delta\not\equiv0$. $\square$

**Lemma 8.3 (polarities $\pm1$: at least four partners, two of each polarity product).** If every polarity is $+1$ or $-1$, every coincidence class of a solution contains at least two partners with $\sigma_{ij}=+1$ and at least two with $\sigma_{ij}=-1$.

*Proof.* Put $x_j=A_{ij}^{1/2}>0$. The two scalar relations of (7.3) say that the sum of $x_j$ over the like partners of the class equals the sum over the unlike partners, and that the same holds for the sums of $1/x_j$. Every such sum over a non-empty set is positive, so both kinds of partner occur. Suppose one kind occurs exactly once, with value $x_0$, and the other kind $n\ge1$ times. Then $\sum x_j=x_0$ and $\sum1/x_j=1/x_0$ over the other kind, so $(\sum x_j)(\sum1/x_j)=1$. By the Cauchy–Schwarz inequality this product is at least $n^2$, so $n=1$: a class of two, which Lemma 8.1 excludes. $\square$

For a class of exactly four the two relations give $x_1+x_2=x_3+x_4$ and $x_1x_2=x_3x_4$, so the two like partners have the same pair of $A$ values as the two unlike partners. Lemma 8.3 is not needed for the six-member theorem; it sharpens the count for larger systems (Remark 10.3).

**The points of care raised with the proposal.** (a) Continuation past the nearest singularity is legitimate because the identity is continued along a path as an identity between continued germs (proof of Lemma 6.3); other pairs' roots may change sign on the way, but they are holomorphic near $T_\ast$ on whichever sheet is reached, hence bounded and single-valued around the loop. (b) $\sin\tau_\ast=\pm i\sqrt{\kappa^2-1}\ne0$ in the collision-free class (Section 5). (c) Antipodal partners on one great circle traversed in the same sense are a rigid pair, $A=0$, and contribute a constant weight; two members on one circle in opposite senses collide and are excluded; and if a member $j$ and its antipode both occur as non-rigid partners of $i$, they have equal $A$, opposite $C$ and $\alpha$ differing by $\pi$, so they are never coincident (Lemma 4.2). (d) If two members share an oriented circle and a third lies elsewhere, the two are rigid partners of each other, so each contributes only a constant weight to the other's equation, and they fall into different classes of the third (Lemma 8.2); each of the two, for its part, needs the third to belong to a class of at least three of its own non-rigid partners. (e) The sign and proportionality questions are answered above: no pair of coincident partners can cancel, and proportional complex chords would put three complex positions on an isotropic line.

> Claim grade: derived (Lemmas 8.1 and 8.2); measured for the non-genericity statistics and the constructed family (check 3, same-lane instrument, the stated counts). Falsifier for Lemma 8.1: a collision-free member with exactly two coincident partners on which identity (I) holds to rounding.

## 9. The rigid part: every oriented circle is a balanced ring

**Lemma 9.1.** In a solution, the members of each oriented circle satisfy among themselves the inverse-square balance (6.2) at the common rate $\Omega$. Consequently: (a) no oriented circle carries exactly one member; (b) an oriented circle with exactly two members carries an antipodal pair of opposite polarities, and then $\Omega^2=K/(4R^3)$.

*Proof.* (6.2) is the statement. (a) For a lone member (6.2) reads $\Omega^2\mathbf X_i=\mathbf 0$, impossible for $\Omega,R>0$. (b) For two members, $\sigma_{ij}K(\mathbf X_i-\mathbf X_j)=-\Omega^2d_{ij}^3\mathbf X_i$ makes $\mathbf X_j$ a real multiple of $\mathbf X_i$; both have length $R$ and they are distinct, so $\mathbf X_j=-\mathbf X_i$, $d_{ij}=2R$, and $2\sigma_{ij}K=-8\Omega^2R^3$, which requires $\sigma_{ij}=-1$ and gives the rate. $\square$

Equation (6.2) is the balance of the rigid reduction of Section 3 of the independent reference, now holding separately on each oriented circle with only that circle's members: in a solution the members of different oriented circles exert no net influence on one another's equations at all, because their contributions cancel class by class.

**Remark 9.2 (three members on one circle).** A circle with three members cannot satisfy (6.2) for polarities $\pm1$, which gives an independent exclusion of the two-triples partition used as a cross-check in Section 10. Taking the component of (6.2) along the tangent at member $i$ gives $\sum_j\sigma_{ij}\,\gamma(\Delta_{ij})=0$, where $\Delta_{ij}\in(0,2\pi)$ is the angular lead of $j$ over $i$ and $\gamma(\Delta)=\cos(\Delta/2)/\sin^2(\Delta/2)$ is strictly decreasing from $+\infty$ to $-\infty$ with $\gamma(2\pi-\Delta)=-\gamma(\Delta)$. For two like members $a,b$ and one unlike member $c$: at $c$ the condition $\gamma(\Delta_{ca})+\gamma(\Delta_{cb})=0$ places $a$ and $b$ symmetrically about $c$; at $a$ the condition $\gamma(\Delta_{ab})-\gamma(\Delta_{ac})=0$ forces $\Delta_{ab}=\Delta_{ac}$, that is $b=c$, a collision. For three like members the contraction of the left side of (6.2) with $\mathbf X_i$, which is $\sum_jK/(2d_{ij})+\Omega^2R^2$ because $\mathbf X_i\cdot(\mathbf X_i-\mathbf X_j)=d_{ij}^2/2$ on a sphere, is positive. Numerically (check 4(d)) the tangential imbalance of a mixed three-member ring, scaled by the square of its smallest chord, never falls below $0.69$ on a grid, and the hexagon passes the same evaluator as a positive control to $1.4\times10^{-15}$.

> Claim grade: derived. Falsifier: a solution with a lone member on an oriented circle, or with a two-member circle that is not an antipodal unlike pair at $\Omega^2=K/(4R^3)$.

## 10. Counting and the main theorem

**Theorem 10.1 (structure of solutions, any number of members).** A collision-free history of the class (3.2), with any number of members and any non-zero real polarities, satisfies the law (3.4) if and only if: (R1) the members of each oriented circle satisfy the inverse-square balance (6.2) at the rate $\Omega$ among themselves; and (R2) for each member, its partners on other oriented circles fall into coincidence classes, each with at least three members lying on three or more different oriented circles, and each satisfying the chord identities (I) and (II) of (7.2).

*Proof.* Lemma 6.3 gives the splitting, Lemma 7.1 the identities, Lemmas 8.1 and 8.2 the size and the distribution over circles, and the converse statements of Lemmas 6.3 and 7.1 give sufficiency. $\square$

**Theorem 10.2 (main theorem: the great-circle class closes on the planar ring).** Let six members with polarities $q_i\in\{+1,-1\}$, three of each sign, move on great circles of one sphere of radius $R>0$ about the origin at one common rate $\Omega>0$, as in (3.2), with no collision at any real time, and let $K>0$ and $c_f>0$. If the instantaneous Weber comparison law (3.1) holds for every member at every time, then all six oriented normals are equal: the members lie on one great circle, turn in the same sense, keep constant mutual separations, and satisfy the planar inverse-square ring balance $\sum_{j\ne i}\sigma_{ij}K(\mathbf X_i-\mathbf X_j)/d_{ij}^3=-\Omega^2\mathbf X_i$. Conversely every such balanced ring satisfies the law. The same conclusion holds for any number of members $N\le7$ and any non-zero real polarities; the three-and-three split is not used.

*Proof.* Suppose the oriented normals are not all equal. Then some member $i$ has a partner on a different oriented circle, that is a non-rigid partner. By Theorem 10.1 (R2) the class of that partner contains at least three members on three different oriented circles, none of which is $i$'s own, so the configuration has at least four distinct oriented circles. By Lemma 9.1(a) each of them carries at least two members. Hence $N\ge8$, contradicting $N\le7$. So all oriented normals are equal, every pair is rigid, every bracket (4.4) equals $1$, and (3.4) is (6.2) with all members, the ring balance. Conversely on such a ring (3.4) and (6.2) are the same equation. $\square$

**Cross-check of the count for six, partition by partition.** The partitions of six members among oriented circles are eleven. Lemma 9.1(a) removes every partition with a part of size one, and Lemma 8.1 removes every partition in which some member has one or two non-rigid partners, that is every part of size five or four; an enumeration (check 4(e)) leaves $\{6\}$, $\{3,3\}$ and $\{2,2,2\}$. Each of the two non-planar survivors falls to an argument independent of Lemma 8.2. For $\{3,3\}$: Remark 9.2 excludes a three-member circle; separately, a member's three partners on the other circle have equal $A$, so identity (I) for them as one class reads $\mathbf X_i\sum_j\sigma_{ij}=\sum_j\sigma_{ij}\mathbf X_j$, whose right side lies in the other plane at all times while $\sum_j\sigma_{ij}$ is odd and so not zero, which would confine $\mathbf X_i$ to the other plane at all times; that is impossible because the two planes are different. For $\{2,2,2\}$: by Lemma 9.1(b) the three circles carry antipodal unlike pairs, a member's four non-rigid partners are two antipodal pairs, antipodes are never coincident (Lemma 4.2), so no class has more than two members. The three routes agree.

**Remark 10.3 (up to nine members with polarities $\pm1$; a by-product outside the preregistered target).** With polarities $\pm1$, Lemma 8.3 raises the count. A member with a non-rigid partner then has a class of at least four partners, which by Lemma 8.2 lie on four different oriented circles, none of them its own; a non-planar solution therefore has at least five oriented circles and, by Lemma 9.1(a), at least ten members. So for polarities $\pm1$ the conclusion of Theorem 10.2 holds for every $N\le9$. This remark is a derivation by the lemmas above; it was not part of the launch target and has no numerical check of its own beyond those of the lemmas and of the inequality (check 6). For ten or more members with polarities $\pm1$, or eight or more with other non-zero real polarity values, the residual set is described by Theorem 10.1 and has not been analysed; the smallest case left open is five oriented circles each carrying an antipodal unlike pair.

> Claim grade: derived (Theorems 10.1 and 10.2), independent review pending; Remark 10.3 derived as a by-product, not submitted as a result of this launch. Falsifier of Theorem 10.2: a collision-free great-circle state of at most seven members, in particular of six with three of each polarity, whose oriented normals are not all equal and whose closed-system residual (3.4), maximized over members and over at least $96$ times of a period and divided by $\Omega^2R$, is below $10^{-8}$ by an independent evaluation.

## 11. Consequences for F2, F5 and Theorem 18.3

**F5 (six members on independent great circles, Section 17 of the reference).** The first run's result was a measured bounded negative: at $R=1$ and $\Omega\in[0.2,3]$, $400$ seeded starts in four strata reached the threshold $10^{-8}$ only at planar rings, with the best non-planar residual between $0.55$ and $1.05$. Theorem 10.2 replaces the bounded negative by a derived statement for the whole family: at every radius and every rate, the only collision-free solutions of F5 are balanced planar rings. The measurement and the theorem agree, and the theorem removes the dependence on the box, the starts and the collocation times. The measured recovery of the hexagon from random starts is the planar solution the theorem leaves.

**F2 (three antipodal pairs on great circles, Section 7 and Section 15.4 of the reference).** An F2 state with its three pairs on three distinct oriented circles is the partition $\{2,2,2\}$ and is excluded for every radius, rate and choice of phases; so is an F2 state with two pairs on one oriented circle and the third elsewhere, the partition $\{4,2\}$. The cross-pair cancellation condition that Section 15.4 left open is therefore impossible: at the isolated-pair rate $\Omega^2=K/(4R^3)$, which Lemma 9.1(b) shows is the only rate such a state could have, the accelerations contributed by the other two pairs cannot cancel at all times, because the four cross partners of a member form classes of at most two. F2 states with all three pairs on one oriented circle are planar rings and are outside the question. The first run's bounded negative for F2 becomes a derived exclusion.

**The shared-circle stratum (stratum B of Section 17).** Three oriented circles with two members each can solve the law only if the three circles coincide; the hexagon found there, with pair phase differences $(60^\circ,180^\circ,60^\circ)$, has all normals equal, as the reference recorded.

**Theorem 18.3 is now a corollary.** Theorem 18.3 states that in a solution with a non-rigid pair, the pairs of minimal $\kappa$, grouped by phase, satisfy $\sum\sigma_{ij}\sqrt{a_{ij}}=0$ in each group, globally and for each member, with $a_{ij}=2(1-C_{ij})=2\kappa_{ij}A_{ij}$ at $R=1$. For one member, a phase group of minimal-$\kappa$ partners is one coincidence class, and the first relation of (7.3) gives $\sum_{j\in S}\sigma_{ij}\sqrt{A_{ij}}=0$, which is the per-member statement after multiplying by $\sqrt{2\kappa_S}$. Summing the per-member statement over members, with each pair counted twice, gives the global one. So Theorem 18.3 follows from Lemma 6.3 and Corollary 7.3, which strengthen it in three ways: the cancellation holds for every class at every level of $\kappa$ and not only at the minimum; it holds as two vector identities and not only as one scalar; and a class needs at least three members on three different circles (four, two of each polarity product, for polarities $\pm1$), where Theorem 18.3 required two pairs of both polarity products. Corollary 18.2 (a member has no non-rigid partner or at least two) becomes: no non-rigid partner or at least three. For six members the hypothesis of Theorem 18.3 is never met by a solution, since Theorem 10.2 shows that a solution has no non-rigid pair. The tied-closest-pair stratum at which Section 18.4 stopped is closed by Lemma 8.1 and Lemma 8.2: a tie of two cannot cancel, and a tie of three needs more circles than six members can populate.

**Relation to the odd-harmonic route.** The route outlined in Section 18 reads the same information from the real-time Fourier coefficients: the $k$-th coefficient of $\mathbf F_i$ in $z$ is governed for large odd $k$ by the nearest branch points, with the Darboux form $2\,(4R^2A\sqrt{\kappa^2-1})^{-5/2}\,\mathbf E_{ij}(T_o)\,z_o^{-k}\,\Gamma(k+\tfrac52)/(\Gamma(\tfrac52)\,k!)$ for a single closest partner, where $T_o$ is the complex collision time in the lower half plane and $z_o=e^{i\Omega T_o}$. This was verified from real-time samples alone on $20$ configurations (check 5): the relative difference halves with each doubling of $k$, and extrapolation in $1/k$ recovers $\mathbf E_{ij}(T_o)$ to $3.0\times10^{-5}$. The harmonic route would establish identity (I) for the closest class by its leading asymptotics and would then need every order of the asymptotic expansion to continue; the loop argument of Lemma 6.3 delivers all orders and all classes at once, so the harmonic analysis was used here only as this independent confirmation.

> Claim grade: derived for the F2 and F5 exclusions and for the corollary relation to Theorem 18.3, as consequences of Theorem 10.2 and Corollary 7.3; measured (check 5, same-lane instrument, $20$ configurations with $\kappa_{\min}\in[1.010,1.029]$ and all other $\kappa\ge1.6$) for the Fourier confirmation. Falsifier: an F2 or F5 state with unequal normals and independently evaluated closed residual below $10^{-8}$.

## 12. What is not proved

The theorem is a statement about one law and one class, and its boundary is as follows.

1. **Only great circles at a common rate.** Histories on a sphere that are not great circles, including latitude circles and the stacked-circle families of the first run, are not covered: the reduction to (3.4) and the single-cosine form (4.3) both use the great-circle form (3.2). Members at different rates are not covered either; with unequal rates the pair angle is not a function of one cosine and the class structure changes.
2. **Only the instantaneous law.** Nothing here applies to a delayed law. The argument uses the present-time separations and their time derivatives as the only pair quantities.
3. **Collisions are excluded by hypothesis.** A history with a real collision is outside the regular domain of the law, and the borderline $\kappa=1$ is exactly where the simple-zero property of Section 5 fails.
4. **The planar rings themselves are not classified.** Theorem 10.2 reduces the problem to the planar inverse-square ring balance on one circle. The alternating hexagon is a solution of it; whether six members with three of each polarity admit other balanced arrangements on one circle is a separate planar question that this file does not address.
5. **Larger systems.** For $N\ge10$ with polarities $\pm1$, and for $N\ge8$ with other non-zero real polarity values, the non-planar residual set is characterized by Theorem 10.1 and Lemma 8.3 (balanced sub-rings on at least five, respectively four, oriented circles, and classes satisfying (I) and (II) with the scalar conditions (7.3)), but whether it is empty has not been examined. The first open case is ten members on five oriented circles, each circle carrying an antipodal unlike pair, with each member's eight partners in two classes of four.
6. **Other coefficient choices of the comparison law.** The proof uses the selected coefficients only through the non-vanishing of the $\cos^2\tau$ coefficient of $g$. No claim is made here for other coefficient choices.
7. **Independent review.** The preregistered proof standard requires the reviewing lane to re-examine every identity with separately authored code. Until that review is recorded, the grade "derived" is that of the deriving lane alone.

No gap is known inside the stated class for $N\le7$: targets (ii) and (iii) of the preregistration are superseded by (i).

## 13. Validation record

All numbers use $K=c_f=1$. Instruments, written for this file: the evaluator [weber-binding-sphere-gc-lib.mjs](../evidence/weber-binding-sphere-gc-lib.mjs), which evaluates (3.4) at real and complex times directly from $D$, $\dot D$, $\ddot D$ of the prescribed history and continues each $\sqrt{D_{ij}}$ along a path by continuity with step halving; and the check script [weber-binding-sphere-gc-checks.mjs](../evidence/weber-binding-sphere-gc-checks.mjs) with its receipt [weber-binding-sphere-gc-checks.json](../evidence/weber-binding-sphere-gc-checks.json). The frozen reference library `weber-binding-sphere-reference-lib.mjs` and its law module are imported unmodified for the known-case comparison only. These are spot checks of derived identities on random instances, not searches; agreement between two routines of this lane is not offered as independent evidence, and the independent comparisons are the frozen reference (check 1), the closed forms (checks 2 to 4) and the real-time Fourier route against the complex-time data (check 5).

Command: `node weber-binding-sphere-gc-checks.mjs`, run in `braid-program/evidence/`. Runs (UTC, 2026-10-06): 22:07:58 first invocation stopped on a syntax error with no output; 22:08:02 first complete run (checks 1 to 4); 22:08:46 rerun after adding the remainder-exponent, defect-per-separation and class-numerator Fourier checks; 22:10:32 and 22:10:56 reruns after adding check 5 and its extrapolation; 22:12:08 rerun after adding the same-circle phase-shift check; 22:13:54 rerun after adding the contraction check; about 22:19 a run with a first version of check 6 did not terminate, because that version tried to draw collision-free configurations containing a partner and its mirror image, which always collide with each other (it was stopped, nothing was written, and the construction was replaced by coincident partners from the Gauss–Newton iteration of check 3); 22:22:39 an invocation through a `timeout` wrapper that does not exist on this machine (exit 127, no run); 22:22:43 complete run with check 6, $3$ s; 22:27:11 final run after adding the next-order defect of identity (II) to check 3(b), $87$ s of wall time on a machine shared with the other lane, which produced the receipt (`startedUTC` 22:27:20, `finishedUTC` 22:28:37). Check 1 ran first in every run and the script refuses to continue if it fails. The seeded random stream was the same in the last three complete runs and the numbers common to them did not change; all numbers below are those of the final run.

**Check 1, known cases, before any target.** Ten random great-circle states (random normals, phases, $\Omega\in[0.3,2]$, $R=1$): the maximum over members of $\|\mathbf F_i\|$ from this file's evaluator against the frozen `lawResidual` with the candidate accelerations $-\Omega^2\mathbf X_i$, relative difference $1.1\times10^{-15}$; the residual vector against the frozen assembly's $\mathbf b-M\mathbf a$, $7.1\times10^{-16}$; the closed form (4.4) against the direct evaluation, $1.6\times10^{-14}$ (mean residual of these non-solutions $14.3$). Alternating hexagon at $\Omega_{\mathrm{hex}}=\sqrt{5/4-1/\sqrt3}$: $\max\|\mathbf F_i\|=5.8\times10^{-15}$ over $16$ times, and $0.141$ at $1.1\,\Omega_{\mathrm{hex}}$. Complex-time evaluator: on the hexagon at a complex time, $3.7\times10^{-15}$ (every pair is rigid, so the residual vanishes for complex $T$ too); at a real time on a random state, equal to the real evaluator to $8.9\times10^{-16}$. All pass.

**Check 2, singular behaviour at complex times, $50$ random configurations.** Configurations are redrawn until every pair has $A\ge0.05$ and $\kappa\ge1.05$; $\Omega\in[0.3,2]$, $R=1$; a random member and partner; path from the real axis vertically to the height of $T_\ast$ and then along the ray $T=T_\ast-r$, $r=10^{-2},\dots,10^{-6}$. Growth exponent of $\|\mathbf F_i\|$ between $r=10^{-4}$ and $10^{-6}$: within $5.5\times10^{-8}$ of $-5/2$ in every case. Leading vector coefficient, $s^5\mathbf F_i$ against (5.3): worst relative error $6.9\times10^{-2}$, $6.8\times10^{-3}$, $6.8\times10^{-4}$, $6.8\times10^{-5}$, $6.8\times10^{-6}$ at the five radii, linear in $r$ as expected of the next order. Boundedness of the other partners: $s^5\mathbf F_i-\mathbf E_{ij}(T)$ scales as $r^{5/2}$, exponent between $2.496$ and $2.517$ (median $2.50001$) from $r=10^{-3}$ to $10^{-4}$, and the sum of the other terms changes by at most $4.3\%$ between $r=10^{-3}$ and $10^{-6}$. Branch-point data: $|D(T_\ast)|\le2.0\times10^{-14}$, $\dot D(T_\ast)$ against $4\Omega R^2A\sin\tau_\ast$ to $3.1\times10^{-15}$, $|\sin\tau_\ast|\ge0.36$, isotropy $2.6\times10^{-15}$, $\|\mathbf N\|\ge0.45$. Monodromy on a loop of radius $10^{-3}$: the singular pair's root reverses in $50$ of $50$ and the other four roots return in $50$ of $50$.

**Check 3, coincidence.** (a) Among $3000$ pairs of partners of a common member in $50$ random configurations, the smallest distance between branch points in the $\tau$ plane is $0.045$, the median $2.13$, none below $10^{-3}$. (b) From $12$ random base pairs $(i,j)$, a least-norm Gauss–Newton iteration on the two coincidence conditions from random starts constructed $678$ coincident partners $j'$ (conditions met to $9.6\times10^{-14}$; partners closer than $10^{-3}$ to $j$ in $\|\mathbf b_j-\mathbf b_{j'}\|$ or with $A<0.02$ discarded), with $A_{ij'}/A_{ij}$ between $0.084$ and $3.20$; the mirror image is coincident with equal $A$ in $12$ of $12$. Normalized leading-order defect $\|c\,\mathbf N_{ij}\pm c'\mathbf N_{ij'}\|/(\|c\,\mathbf N_{ij}\|+\|c'\mathbf N_{ij'}\|)$ with $c=A_{ij}^{-1/2}$, $c'=A_{ij'}^{-1/2}$: at least $0.542$ for equal polarity products; for opposite products the minimum $1.1\times10^{-3}$ occurs at partner separation $5.8\times10^{-3}$ and the defect is at least $0.186$ times the separation, so it vanishes only in the collision limit. The defect of identity (I) on the $\mathbf b$ vectors agrees with the leading-order defect to the printed digits. The next order was tested on the same family: the corresponding defect of identity (II), with weights $A^{-3/2}$, is at least $0.544$ for equal polarity products and has minimum $1.3\times10^{-3}$ for opposite products at the same near-collision sample, and the larger of the two defects is at least $0.189$ times the partner separation; so neither order cancels on any constructed coincident pair away from the collision limit. On $198$ six-member configurations containing $i$, $j$ and a coincident $j'$, in three polarity patterns, the residual still grows with exponent $-5/2$ within $1.0\times10^{-4}$, its scaled limit equals the sum of the two predicted coefficients to $6.5\times10^{-6}$ at $r=10^{-6}$, and the two roots stay in the ratio $\sqrt{A_{ij'}/A_{ij}}$ to $5.4\times10^{-9}$.

**Check 4, closed forms and counting.** (a) $200$ random pairs with $R\in[0.5,2]$: $A=\tfrac12(1-\mathbf m_i\cdot\mathbf m_j)$ to $6.7\times10^{-16}$, (4.2) to $1.9\times10^{-15}$, $D$ to $9.3\times10^{-15}$, the bracket (4.4) with its $R$ dependence to $2.8\times10^{-14}$, the antipodal relations to $3.3\times10^{-14}$, Lemma 4.1 and Lemma 4.2 for a second member built with an independently drawn in-plane basis to $1.9\times10^{-14}$. (b) (7.1) against the direct law on $34$ mirror classes, relative error $7.6\times10^{-13}$. (c) $\mathbf N_{ij}$ from the $\mathbf b$ vectors to $1.2\times10^{-15}$ and $|z_\ast|^2=\rho$ to $6.4\times10^{-14}$. (f) Fourier coefficients of the class numerator from the law at $32$ times on $35$ classes: $z^5$ coefficient against $-(\Omega^2R^5/4)e^{2i\alpha}\mathbf y_{1/2}$ to $7.6\times10^{-16}$; $z^3$ coefficient against $-(R^3/2)e^{i\alpha}\mathbf y_{3/2}+\Omega^2R^5[2\kappa e^{i\alpha}\mathbf y_{1/2}-\tfrac14e^{2i\alpha}\bar{\mathbf y}_{1/2}]$ to $1.3\times10^{-15}$; harmonics $0,2,4,6,7,9$ below $1.6\times10^{-15}$; contractions with $\mathbf b_i$ to $4.3\times10^{-14}$. (d) $\gamma$ strictly decreasing on a grid of $2000$ points; mixed three-member ring, smallest scaled tangential imbalance $0.69$ on a $120\times120$ grid; like three-member ring, radial component outward by at least $0.50$; hexagon control $1.4\times10^{-15}$ tangential and $5.6\times10^{-16}$ radial. (e) Of the $11$ partitions of six, those passing the size rules are $\{6\}$, $\{3,3\}$, $\{2,2,2\}$; for four and five members only the single circle passes; for seven, $\{7\}$, $\{4,3\}$, $\{3,2,2\}$, each non-planar one with fewer than four circles.

The classes used in (b) and (f) are a partner and its mirror image in the plane of the member's circle; they test the algebra of (7.1), which does not depend on whether the two partners collide with each other.

**Check 5, real-time Fourier cross-check.** $20$ random configurations selected so that member $0$ has one partner with $\kappa\in[1.010,1.029]$ and $A\ge0.2$ and all others with $\kappa\ge1.6$ ($5580$ draws); $8192$ real-time samples of $\mathbf F_0$ per period. Worst relative difference between the odd Fourier coefficient and the Darboux form of Section 11: $3.74$, $1.90$, $0.956$, $0.479$ at $k=21,41,81,161$, halving with each doubling of $k$ as an $O(1/k)$ correction should; Neville extrapolation in $1/k$ over $k=41,61,81,121,161$ recovers $\mathbf E_{ij}(T_o)$ to $3.0\times10^{-5}$; even harmonics are absent to $8.9\times10^{-15}$. The large size of the $1/k$ correction reflects the small $\kappa-1$ needed to keep high harmonics above rounding.

**Check 6, real-time linear independence and the polarity inequality.** A consequence of Lemmas 6.3 and 8.1 that can be tested on real time alone: unless a member has a coincidence class of three or more, no real combination $\sum_jc_j\,\mathbf t_j(T)+\lambda\,\mathbf X_i(T)$ of its five unsigned pair terms $\mathbf t_j=d_{ij}^{-3}[\,\cdot\,](\mathbf X_i-\mathbf X_j)$ and its own position vanishes identically, whatever real values replace the polarity products. Measured as the ratio of smallest to largest singular value of the $192\times6$ matrix of samples at $64$ times with unit columns (computed from the Gram matrix, so ratios below about $10^{-8}$ read as zero): at least $0.065$ on $50$ random configurations and at least $0.058$ on $30$ collision-free configurations containing a coincident class of two; on the hexagon, where the combination $c_j=\sigma_{ij}$, $\lambda=\Omega_{\mathrm{hex}}^2$ vanishes, the ratio reads $0$ (positive control). The mirror image of a partner collides with the partner, $|\kappa_{jj'}-1|\le1.8\times10^{-15}$ on $20$ cases. For Lemma 8.3: the smallest value of $(\sum x)(\sum1/x)/n^2$ over $20000$ random positive tuples with $n$ between $2$ and $5$ is $1.0000000003$.

## 14. Claims, grades and falsifiers

| Claim | Grade | Falsifier |
| --- | --- | --- |
| The law on the class is the closed system (3.4) with weights (3.3), and the bracket is (4.4) with $R$ and $c_f$ explicit | derived; checked against the frozen reference (check 1) and on random $R$ (check 4a) | a great-circle state where the two evaluations differ beyond rounding |
| Complex collision times (5.1) are simple zeros of $D$; the pair term grows as the $-5/2$ power with coefficient (5.3) along a non-zero isotropic chord | derived; check 2 | a collision-free non-rigid pair with a different growth exponent or scaled limit |
| Class cancellation (Lemma 6.3): the member equation splits into one identity per coincidence class and one for the member's own circle | derived; ingredients checked in checks 2 and 3(b) | a state where (3.4) holds for a member while a class sum (6.1) does not |
| Chord identities (Lemma 7.1), order-by-order form (Lemma 7.2) and consequences (7.3) | derived; check 4(b), 4(c), 4(f) | a set of partners with common $\alpha$, $\kappa$ on which (7.1) fails |
| A class has at least three members, on different oriented circles (Lemmas 8.1, 8.2); with polarities $\pm1$, at least two of each polarity product (Lemma 8.3) | derived; checks 3(b), 4(a), 6 | a collision-free member with a class of two satisfying (I), or two members of one oriented circle with equal $\alpha$ relative to a third, or a class with a single partner of one polarity product satisfying (7.3) |
| Every oriented circle is a balanced ring with at least two members; two-member circles are antipodal unlike pairs at $\Omega^2=K/(4R^3)$ (Lemma 9.1) | derived | a solution with a lone member on an oriented circle |
| Main theorem 10.2: six members (indeed $N\le7$), collision-free, great circles, common rate, instantaneous law: all oriented normals equal | derived, review by the second lane pending | a collision-free great-circle state with unequal normals and independently evaluated closed residual below $10^{-8}$ over a period |
| F2 and F5 exclusions at every radius and rate; Theorem 18.3 as a corollary | derived from the above | an F2 or F5 state with unequal normals and closed residual below $10^{-8}$ |
| Coincidence is non-generic; constructed coincident partners never cancel except in the collision limit | measured (check 3, this lane's instrument, the stated counts) | a constructed coincident pair, away from collision, with vanishing leading-order defect |
| Fourier coefficients of $\mathbf F_i$ follow the Darboux form fixed by the branch point | measured (check 5, $20$ configurations, extrapolated agreement $3.0\times10^{-5}$) | a configuration of the stated kind whose extrapolated coefficient differs from $\mathbf E_{ij}(T_o)$ |
| Remark 10.3, up to nine members with polarities $\pm1$ | derived as a by-product; not a submitted result of this launch | a non-planar collision-free great-circle solution with at most nine members |
| No real combination of one member's pair terms and position vanishes without a class of three or more | measured (check 6, $80$ configurations, hexagon control) | a random configuration of the stated kind with singular-value ratio at rounding level |
| Whether balanced planar six-member rings other than the hexagon exist; $N\ge10$; other laws; non-great-circle paths | open | — |

## Extension (after the 22:29:05Z freeze)

Everything from this marker to the run record was added after the freeze of 2026-10-06T22:29:05Z at the Principal Investigator's assignment. Sections 1 to 14 above are unchanged.

## 16. The uniform-circle class: square classes, mirror pairs and the six-member statement

Status: derivations by this lane with its own spot checks ([weber-binding-sphere-gc-ext-checks.mjs](../evidence/weber-binding-sphere-gc-ext-checks.mjs), receipt [weber-binding-sphere-gc-ext-checks.json](../evidence/weber-binding-sphere-gc-ext-checks.json)); not yet reviewed by anyone. The result is conditional on one stated hypothesis and unconditional on three named sub-classes; the exact remaining gap is stated in Section 16.8.

### 16.1 Result in brief

The class $U$ consists of histories in which every member moves uniformly on some circle of the sphere of radius $R$, great or small, about its own axis, all at one common speed $v$. Rates then differ when radii differ. The class contains the great-circle class of Sections 1 to 14, the rigid two-circle arrangements, the stacked latitude circles with unequal rates, and circles of different radii about different axes.

The method of Section 6 carries over with one change of bookkeeping. A pair's squared separation $D_{ij}$ is still an entire function of time, and the pair's contribution to a member's equation is still an entire vector divided by $D_{ij}^{5/2}$. Partners are now grouped by whether the ratio of their squared separations is the square of a meromorphic function; this replaces the grouping by common $\alpha$ and $\kappa$. Each group whose squared separation is not itself a perfect square must cancel by itself, and the group of partners whose squared separation is a perfect square carries the member's whole acceleration. On a sphere a cancelling group needs at least three partners.

The new feature is that a squared separation can be a perfect square without being constant and without a real collision. For two circles of equal radius this happens exactly when the two members are mirror images of each other in a fixed plane through the centre that neither path crosses; the separation is then twice the distance of a member from the plane, the pair's contribution is single-valued with a double pole at complex times, and that pole can be cancelled by nothing else, so a solution contains no such pair. For two circles of different radii about non-parallel axes this file does not decide whether a perfect square can occur without a collision; that is the one gap.

What is derived: a collision-free six-member history of class $U$ that satisfies the law and in which no pair on circles of different radii about non-parallel axes has a perfect-square squared separation is a rigid rotation about one axis. The hypothesis is empty, and the statement unconditional, when all circles have equal radius (any axes, any senses, any heights), when all axes are parallel (the stacked-latitude family, any radii and rates), and whenever every pair is of one of these two kinds or has radii in a ratio of two integers whose sum is odd in lowest terms.

### 16.2 Notation added for this section

| Symbol | Meaning |
| --- | --- |
| $\mathbf n_i$, $c_i$, $a_i$ | unit axis, signed height of the circle's centre along the axis, and circle radius of member $i$; $c_i^2+a_i^2=R^2$, $a_i>0$ |
| $\omega_i$ | signed angular rate about $\mathbf n_i$; $\lvert\omega_i\rvert a_i=v$, the common speed |
| $\mathbf e_i(T)=\cos(\omega_iT+\phi_i)\mathbf u_i+\sin(\omega_iT+\phi_i)\mathbf u_i'$ | unit radial vector of the circle, with $\mathbf u_i\times\mathbf u_i'=\mathbf n_i$; $\mathbf X_i=c_i\mathbf n_i+a_i\mathbf e_i$ |
| $\boldsymbol\omega_i=\omega_i\mathbf n_i$ | angular velocity vector; the description $(\mathbf n_i,c_i,\omega_i)$ and $(-\mathbf n_i,-c_i,-\omega_i)$ give the same motion and the same $\boldsymbol\omega_i$ |
| $\mathcal M$ | field of meromorphic functions on the complex $T$ plane |
| square class | the class of a function in $\mathcal M^\ast/(\mathcal M^\ast)^2$; two functions are in one class when their ratio is the square of a meromorphic function |
| trivial class | the class of perfect squares; for member $i$, the partners $j$ whose $D_{ij}$ is the square of an entire function |
| square pair | a non-rigid pair whose $D_{ij}$ is the square of an entire function, equivalently whose every complex zero has even order |
| mirror pair | a pair with $\mathbf X_j(T)=M\mathbf X_i(T)$ for all $T$, $M$ the reflection in a fixed plane through the origin with unit normal $\boldsymbol\nu$ |

### 16.3 The general lemma for prescribed entire histories

**Lemma 16.1 (closed form of the law on a prescribed history).** Let $\mathbf X_1(T),\dots,\mathbf X_N(T)$ be any twice differentiable histories without collision. Since $d\dot d=\dot D/2$ and $\dot d^2+d\ddot d=\ddot D/2$ for $D=d^2$, the bracket of the law (3.1) is $1+\ddot D/(2c_f^2)-3\dot D^2/(8Dc_f^2)$, and the histories satisfy the law if and only if, for every member and time,

$$
\sum_{j\ne i}w_{ij}\,(\mathbf X_i-\mathbf X_j)=\ddot{\mathbf X}_i,\qquad w_{ij}=\sigma_{ij}K\,D_{ij}^{-5/2}\left[\Big(1+\frac{\ddot D_{ij}}{2c_f^2}\Big)D_{ij}-\frac{3\dot D_{ij}^2}{8c_f^2}\right].
\tag{16.1}
$$

No linear solve is involved, because every acceleration that enters $\ddot d_{ij}$ is the prescribed one. This is (3.3) and (3.4) without the great-circle assumption.

**Lemma 16.2 (independence of square roots).** Let $f_1,\dots,f_m$ be meromorphic functions on $\mathbb C$, not identically zero, lying in pairwise different square classes, none of them the trivial class. Fix a point $T_0$ at which all are finite and non-zero and a germ of $\sqrt{f_k}$ there for each $k$. If meromorphic functions $a_0,a_1,\dots,a_m$ satisfy $a_0+\sum_ka_k\sqrt{f_k}=0$ near $T_0$, then every $a_k$ is identically zero.

*Proof.* Put $f_0=1$, so the relation reads $\sum_{k=0}^ma_k\sqrt{f_k}=0$ with the $f_k$ in pairwise different classes. A meromorphic function on $\mathbb C$ is the square of a meromorphic function exactly when all its zeros and poles have even order, because $\mathbb C$ is simply connected. Suppose a non-trivial relation exists and take one with the fewest non-zero coefficients. It has at least two, since a single term $a_k\sqrt{f_k}=0$ forces $a_k=0$. Let $k\ne l$ be two indices with non-zero coefficients. The ratio $f_k/f_l$ is not a square, so it has a zero or pole of odd order at some point $T_\ast$: exactly one of $f_k,f_l$ has odd order there. The relation continues analytically along any path that avoids the discrete set of zeros and poles of the $f$'s and poles of the $a$'s. Continue it from $T_0$ to a point near $T_\ast$ and then once around $T_\ast$ on a small loop that encloses no other such point: each $\sqrt{f_r}$ is multiplied by $\epsilon_r=(-1)^{\operatorname{ord}_{T_\ast}f_r}$ and the $a_r$ return. So $\sum_r\epsilon_ra_r\sqrt{f_r}=0$ as well, with $\epsilon_k\ne\epsilon_l$. Adding $-\epsilon_k$ times the first relation gives a relation in which the coefficient of $\sqrt{f_k}$ is zero and that of $\sqrt{f_l}$ is $(\epsilon_l-\epsilon_k)a_l\ne0$: a non-trivial relation with fewer terms, a contradiction. $\square$

**Lemma 16.3 (square-class splitting).** Let the histories be entire functions of $T$, real and collision-free on the real axis, and let (16.1) hold for member $i$. Group the partners of $i$ by the square class of $D_{ij}$. Then for every non-trivial class $S$,

$$
\sum_{j\in S}w_{ij}\,(\mathbf X_i-\mathbf X_j)=\mathbf 0\quad\text{for all real }T,\qquad\text{and}\qquad\sum_{j\ \text{in the trivial class}}w_{ij}\,(\mathbf X_i-\mathbf X_j)=\ddot{\mathbf X}_i .
\tag{16.2}
$$

*Proof.* For each class choose a representative $D_S$, one of its $D_{ij}$. For $j\in S$, $D_{ij}=D_Sm_j^2$ with $m_j$ meromorphic, real and of constant sign on the real axis, taken positive, so $\sqrt{D_{ij}}=m_j\sqrt{D_S}$ there and $D_{ij}^{-5/2}=m_j^{-5}D_S^{-3}\sqrt{D_S}$. Each component of the left side of (16.1) is then $\sum_S\sqrt{D_S}\,Q_S$ with $Q_S$ meromorphic, and for the trivial class $\sqrt{D_S}$ is itself meromorphic. Apply Lemma 16.2 to each component, with $a_0$ the trivial-class sum minus the component of $\ddot{\mathbf X}_i$. $\square$

**Lemma 16.4 (on a sphere a cancelling class has at least three partners).** In addition let every history lie on one sphere. Then no non-trivial class has one or two partners, and if $\ddot{\mathbf X}_i\not\equiv\mathbf 0$ the trivial class of $i$ is not empty.

*Proof.* Write the class sum as $\sum_{j\in S}\gamma_j(T)(\mathbf X_i-\mathbf X_j)$ with $\gamma_j=\sigma_{ij}Km_j^{-5}[(1+\ddot D_{ij}/2c_f^2)D_{ij}-3\dot D_{ij}^2/8c_f^2]$, meromorphic and real on the real axis. No $\gamma_j$ vanishes identically: $D_{ij}$ has a zero $T_\ast$ of odd order $m$, $D_{ij}\approx g(T-T_\ast)^m$, and the bracket is then $-\tfrac38g^2/c_f^2+\dots$ for $m=1$ and $g(T-T_\ast)^m+\dots$ for $m\ge3$, in both cases not identically zero. Hence at all real times outside a discrete set every $\gamma_j$ is finite and non-zero. A class of one would give $\mathbf X_i=\mathbf X_j$ at such a time. A class of two would give $\gamma_j(\mathbf X_i-\mathbf X_j)+\gamma_{j'}(\mathbf X_i-\mathbf X_{j'})=\mathbf 0$: if $\gamma_j+\gamma_{j'}=0$ then $\mathbf X_j=\mathbf X_{j'}$, and otherwise $\mathbf X_i$ is a point of the line through $\mathbf X_j$ and $\mathbf X_{j'}$, three points of a sphere on one line; either way two members coincide, a collision. The last statement is the second equation of (16.2). $\square$

**Why this does not apply to an arbitrary solution of the law.** Lemmas 16.2 to 16.4 need the positions to be entire functions of $T$, so that the only singularities of each pair term are the zeros of its own $D_{ij}$. A history prescribed as a finite trigonometric sum has that property by construction. A true solution of the law is real-analytic in $T$ wherever the solve is regular, but nothing makes it entire: its continuation to complex time generally has singularities of its own, at complex times where the solved accelerations blow up or the acceleration matrix degenerates, and these are neither located nor classified by anything in this file. The splitting therefore tests whether a prescribed entire history can be a solution; it is not a property of solutions in general.

> Claim grade: derived. Checked numerically (check E1): the evaluator of (16.1) against the frozen reference on ten random class-$U$ states, $2.6\times10^{-16}$ relative against the matrix-free residual, $6.7\times10^{-16}$ against the assembled $\mathbf b-M\mathbf a$, and $7.5\times10^{-16}$ against $M$ times the full-solve residual; zero on the hexagon ($3.4\times10^{-15}$) and on a diametral unlike pair on a small circle at $\omega^2=K/(4a^3)$ ($9.9\times10^{-16}$, and $0.146$ at $1.1\,\omega$). Check E2: on $40$ random class-$U$ configurations with unequal rates, at a simple complex zero of one $D_{ij}$ found by Newton iteration, $\|\mathbf F_i\|$ grows with exponent $-5/2$ within $4.3\times10^{-4}$, the scaled limit equals $-\tfrac38\sigma_{ij}\dot D_{ij}(T_\ast)^2\mathbf N_{ij}$ to $4.0\times10^{-5}$ at distance $10^{-6}$, and one loop reverses that pair's root and returns the other four in $40$ of $40$. Falsifier: an entire prescribed history satisfying (16.1) for a member while one of its non-trivial class sums is not zero.

### 16.4 Pair structure in the class $U$

Write $\mathbf b_i=\mathbf u_i-i\mathbf u_i'$ and $z_i=e^{i(\omega_iT+\phi_i)}$, so $\mathbf e_i=\tfrac12(z_i\mathbf b_i+\bar{\mathbf b}_i/z_i)$, with $|\mathbf b_i\cdot\mathbf b_j|=1-\mathbf n_i\cdot\mathbf n_j$ and $|\mathbf b_i\cdot\bar{\mathbf b}_j|=1+\mathbf n_i\cdot\mathbf n_j$ as in Section 4. Then

$$
\tfrac12D_{ij}=R^2-c_ic_j\,\mathbf n_i\cdot\mathbf n_j-c_ia_j\,\mathbf n_i\cdot\mathbf e_j-c_ja_i\,\mathbf n_j\cdot\mathbf e_i-a_ia_j\,\mathbf e_i\cdot\mathbf e_j ,
\tag{16.3}
$$

a trigonometric sum with the frequencies $\omega_j$, $\omega_i$, $\omega_i+\omega_j$ and $\omega_i-\omega_j$, the last two with amplitudes $\tfrac12a_ia_j(1-\mathbf n_i\cdot\mathbf n_j)$ and $\tfrac12a_ia_j(1+\mathbf n_i\cdot\mathbf n_j)$.

**Lemma 16.5 (rigid pairs).** $D_{ij}$ is constant if and only if $\boldsymbol\omega_i=\boldsymbol\omega_j$. Rigidity is therefore an equivalence relation; a rigid group is a set of members turning about one axis at one rate, and at equal speed its members lie on one latitude circle or on a mirror pair of latitude circles $c$ and $-c$ of that axis.

*Proof.* If $\boldsymbol\omega_i=\boldsymbol\omega_j$, describe both members with the same axis and rate; then $\mathbf n_i\cdot\mathbf e_j=\mathbf n_j\cdot\mathbf e_i=0$ and $\mathbf e_i\cdot\mathbf e_j$ is the cosine of a constant angle. Conversely let $D_{ij}$ be constant. If the axes are parallel, describe both with the same $\mathbf n$; the only time-dependent term is $a_ia_j\cos((\omega_i-\omega_j)T+\text{const})$, so $\omega_i=\omega_j$. If the axes are not parallel, both amplitudes above are non-zero, so each of the frequencies $\omega_i+\omega_j$ and $\omega_i-\omega_j$ must either vanish or coincide in absolute value with another frequency of the sum. They do not both vanish. If $\omega_i+\omega_j=0$ the other is $2\omega_i$, which coincides with neither $\omega_i$ nor $\omega_j$; likewise if $\omega_i-\omega_j=0$. If neither vanishes, $\omega_i+\omega_j$ can coincide only with $\omega_i$ or $\omega_j$, which requires $\omega_j=-2\omega_i$ or $\omega_i=-2\omega_j$, and $\omega_i-\omega_j$ requires $\omega_j=2\omega_i$ or $\omega_i=2\omega_j$; no two of these four relations hold together. So $D_{ij}$ is not constant. Equal speed gives $a_i=a_j$, hence $c_j=\pm c_i$. $\square$

**Lemma 16.6 (pairs with parallel axes are never square pairs).** If $\mathbf n_j=\pm\mathbf n_i$ and the pair is not rigid, then $D_{ij}=p-q\cos((\omega_i-\omega_j)T+\text{const})$ in a common description, with $p=2R^2-2c_ic_j$ and $q=2a_ia_j$; absence of collision gives $p>q$, and every complex zero of $D_{ij}$ is simple.

*Proof.* (16.3) with a common axis; the cosine reaches $1$ at a real time, so $p-q>0$, and at a zero $\cos=p/q>1$ makes the sine non-zero. $\square$

**Lemma 16.6a (commensurate rates with odd sum are never square pairs).** Let the axes be non-parallel and $|\omega_i|/|\omega_j|=r/s$ in lowest terms with $r+s$ odd. Then the pair is not a square pair unless it collides. *Proof.* Describe both members with positive rates $r\omega_0$ and $s\omega_0$. Then $D_{ij}$ is a Laurent polynomial in $w=e^{i\omega_0T}$ whose extreme powers are $w^{\pm(r+s)}$, with coefficient of modulus $\tfrac12a_ia_j(1-\mathbf n_i\cdot\mathbf n_j)\ne0$ by (16.3). If every root has even multiplicity, $D_{ij}=\alpha\,w^{-(r+s)}Q(w)^2$ with a polynomial $Q$, and an entire square root is $g=\pm\sqrt\alpha\,e^{-i(r+s)\omega_0T/2}Q(e^{i\omega_0T})$, which satisfies $g(T+2\pi/\omega_0)=-g(T)$ because $r+s$ is odd. Since $g^2=D_{ij}>0$ on the real axis, $g$ is real there, changes sign over one period, and has a real zero: a collision. $\square$

**Lemma 16.7 (pairs of equal radius: square pairs are mirror pairs).** Let a non-rigid pair have $|\omega_i|=|\omega_j|$, hence $a_i=a_j=a$, and non-parallel axes at angle $\gamma\in(0,\pi)$. Describe both members with a positive common rate $\omega$, so that $c_i=c$ and $c_j=\varepsilon c$ with $\varepsilon=\pm1$, and choose $\mathbf u_i=\mathbf u_j=\boldsymbol\ell$ along $\mathbf n_i\times\mathbf n_j$. With $\psi=\omega T+\tfrac12(\phi_i+\phi_j)$ and $\delta=\tfrac12(\phi_j-\phi_i)$,

$$
\tfrac12D_{ij}=P_0-2ca\sin\gamma\cdot\begin{cases}\sin\delta\cos\psi&(\varepsilon=+1)\\ \cos\delta\sin\psi&(\varepsilon=-1)\end{cases}\;-\;P_2\cos2\psi,\qquad P_2=a^2\sin^2\tfrac\gamma2>0,
\tag{16.4}
$$

with $P_0=R^2-\varepsilon c^2\cos\gamma-a^2\cos^2\tfrac\gamma2\cos2\delta$. As a function of $z=e^{i\omega T}$, $D_{ij}$ is a Laurent polynomial of degree exactly two, with four roots in $z\ne0$; without collision none lies on the unit circle, they are exchanged in pairs by $z\mapsto1/\bar z$, and so either all four are simple or they form two double roots, in which case $D_{ij}$ is a perfect square. The pair is a square pair without collision if and only if $\varepsilon=-1$, $\sin\delta=0$ and $|c|\cos\tfrac\gamma2>a\sin\tfrac\gamma2$; equivalently, if and only if it is a mirror pair, $\mathbf X_j=M\mathbf X_i$ with $M$ the reflection in the plane through the origin with normal $\boldsymbol\nu$ parallel to $\mathbf n_i+\mathbf n_j$ (in this description), whose plane the circle of $i$ does not meet. Then $d_{ij}=2|\mathbf X_i\cdot\boldsymbol\nu|$.

*Proof.* (16.4) follows from (16.3) with $\mathbf n_i\cdot(\mathbf n_j\times\boldsymbol\ell)=\sin\gamma=-\mathbf n_j\cdot(\mathbf n_i\times\boldsymbol\ell)$ and $(\mathbf n_i\times\boldsymbol\ell)\cdot(\mathbf n_j\times\boldsymbol\ell)=\cos\gamma$. A perfect square that is positive on the real axis is $(p+q\cos(\psi'+\beta))^2$ with real $p,q$, whose second harmonic is $\tfrac12q^2\cos(2\psi'+2\beta)$ and first harmonic $2pq\cos(\psi'+\beta)$. For $\varepsilon=+1$ the second harmonic $-P_2\cos2\psi$ forces $\beta=\pm\tfrac\pi2$, the first harmonic would then be a multiple of $\sin\psi$ while (16.4) has $\cos\psi$, so $pq=0$, $p=0$, and $D$ has real zeros: a collision. For $\varepsilon=-1$ put $\psi=\chi+\tfrac\pi2$: $\tfrac12D=P_0-P_1'\cos\chi+P_2\cos2\chi$ with $P_1'=2ca\sin\gamma\cos\delta$, a perfect square exactly when $P_0=P_1'^2/(8P_2)+P_2$, and a direct computation gives $P_0-P_1'^2/(8P_2)-P_2=2R^2\cos^2\tfrac\gamma2\sin^2\delta$. So the condition is $\sin\delta=0$; no real zero means $|p|>|q|$, that is $|P_1'|>4P_2$, which is the stated inequality. With $\varepsilon=-1$ and equal phases, $\mathbf X_j$ is obtained from $\mathbf X_i$ by the linear map sending the right-handed frame $(\boldsymbol\ell,\mathbf n_i\times\boldsymbol\ell,\mathbf n_i)$ to the left-handed frame $(\boldsymbol\ell,\mathbf n_j\times\boldsymbol\ell,-\mathbf n_j)$, an improper orthogonal map with a fixed vector, hence a reflection in a plane containing $\boldsymbol\ell$; it sends $\mathbf n_i$ to $-\mathbf n_j$, so its normal is along $\mathbf n_i+\mathbf n_j$. Conversely a mirror pair has $\mathbf X_i-\mathbf X_j=2(\mathbf X_i\cdot\boldsymbol\nu)\boldsymbol\nu$. $\square$

**Lemma 16.8 (a mirror partner contributes an uncancellable double pole).** For a non-rigid mirror pair that does not collide, the contribution of $j$ to the equation of $i$ is single-valued and equals

$$
w_{ij}\,(\mathbf X_i-\mathbf X_j)=\pm\,\sigma_{ij}K\,\frac{1-\dot\eta^2/(2c_f^2)+\eta\ddot\eta/c_f^2}{\eta^2}\;\boldsymbol\nu,\qquad\eta=2\,\mathbf X_i\cdot\boldsymbol\nu ,
\tag{16.5}
$$

a meromorphic function with a double pole at each complex zero of $\eta$, where the numerator equals $1+2\omega^2(c^2\nu_n^2-a^2\nu_\perp^2)/c_f^2\ge1$, with $\nu_n=\mathbf n_i\cdot\boldsymbol\nu$ and $\nu_\perp^2=1-\nu_n^2$. Two different mirror partners of $i$ have no pole in common. Consequently, if the trivial class of member $i$ consists of rigid partners and mirror partners only, a solution has no mirror partner of $i$ at all.

*Proof.* Insert $D=\eta^2$ in (16.1): the bracket is $\eta^2[1-\dot\eta^2/2c_f^2+\eta\ddot\eta/c_f^2]$, $D^{5/2}=\pm\eta^5$ and $\mathbf X_i-\mathbf X_j=\eta\boldsymbol\nu$. Now $\eta=2c\nu_n+2a\nu_\perp\cos(\omega T+\text{const})$ with $\nu_\perp>0$ (otherwise the pair is rigid) and $|c\nu_n|>a\nu_\perp$ (no crossing of the plane); its zeros are simple, and there $\dot\eta^2=4\omega^2(a^2\nu_\perp^2-c^2\nu_n^2)<0$, which gives the numerator. In the second equation of (16.2) the rigid partners contribute entire functions and the right side is entire, so the poles of the mirror partners must cancel among themselves. A zero $T_0$ of $\eta$ determines $\boldsymbol\nu$ up to sign: its real part fixes the azimuth of the in-plane part of $\boldsymbol\nu$ about $\mathbf n_i$ together with the sign of $c\nu_n$, and its imaginary part fixes $|c\nu_n|/(a\nu_\perp)$. Mirror planes of different partners are different, so no two mirror partners share a pole, each double-pole coefficient would have to vanish by itself, and none does. $\square$

> Claim grade: derived. Checked numerically (checks E3, E4): constancy of $D$ exactly for equal angular velocity vectors (relative variation $2.7\times10^{-13}$ against at least $0.056$ otherwise, $100$ cases each); the single-cosine form for parallel axes on $100$ pairs; (16.4) on $400$ pairs to $2.0\times10^{-15}$ and the identity $P_0-P_1'^2/(8P_2)-P_2=2R^2\cos^2\tfrac\gamma2\sin^2\delta$ to $8.0\times10^{-16}$; on $50$ constructed mirror pairs the four roots pair up to $1.4\times10^{-7}$ (double roots, at the accuracy a root finder reaches for them) and $d=2|\mathbf X_i\cdot\boldsymbol\nu|$ to $1.0\times10^{-15}$, $28$ of them without crossing the plane, so collision-free square pairs exist; for same-side heights ($\varepsilon=+1$) the smallest root gap over $200$ pairs is $0.048$; for $20$ mirror pairs the pair term grows with exponent $-2$ within $5.0\times10^{-6}$ near a zero of $\eta$, with coefficient as in (16.5) to $1.2\times10^{-8}$ and numerator at least $1.34$. Falsifier: an equal-radius non-rigid pair that is not a mirror pair and whose $D$ has a double complex root; or a mirror pair whose pair term stays bounded at a zero of $\eta$.

### 16.5 The complex chords and the two rulings

At a simple complex zero $T_\ast$ of $D_{ij}$ the chord $\mathbf N_{ij}=\mathbf X_i(T_\ast)-\mathbf X_j(T_\ast)$ satisfies $\mathbf N\cdot\mathbf N=0$ and, because both complex positions have square $R^2$, also $\mathbf X_i(T_\ast)\cdot\mathbf N=0$. It is not zero, since $\mathbf N(T_\ast)=\mathbf 0$ would make the zero of $D=\mathbf N\cdot\mathbf N$ at least double. So $\mathbf N_{ij}$ lies on one of the two isotropic lines of the tangent plane of the complex sphere at $\mathbf X_i(T_\ast)$, its two rulings, and the leading coefficient of the pair term, $-\tfrac38\sigma_{ij}K\dot D_{ij}(T_\ast)^2\mathbf N_{ij}/c_f^2$, does not vanish. The members of one non-trivial class share all their odd-order zeros. At a zero that is simple for all of them, the leading coefficients must cancel, the two rulings are linearly independent lines, so the cancellation holds on each ruling separately and each ruling carries no partner or at least two; two partners $j,j'$ on one ruling have $\mathbf X_j(T_\ast)-\mathbf X_{j'}(T_\ast)$ isotropic, so $D_{jj'}(T_\ast)=0$ and the pair $(j,j')$ is not rigid. The proposal is therefore confirmed at simple zeros. At a zero of higher odd order the chord may vanish and the statement needs modification; it is not used below, where the count rests on Lemma 16.4.

> Claim grade: derived for simple zeros; check E2 confirms isotropy of the chord to $3.9\times10^{-14}$ and the leading coefficient. Not examined: zeros of odd order three or more.

### 16.6 The six-member statement

**Hypothesis (H).** No pair of members on circles of different radii about non-parallel axes is a square pair. By Lemma 16.6a this can fail only for a pair whose radius ratio is irrational or is a ratio of two odd integers in lowest terms.

**Theorem 16.9.** Let six members with polarities $\pm1$ move in the class $U$ on a sphere of radius $R$ at common speed $v>0$ without collision, with $K>0$ and $c_f>0$, and let (H) hold. If the instantaneous Weber comparison law holds for every member at every time, the history is a rigid rotation: all six angular velocity vectors are equal, the members lie on one latitude circle or on a mirror pair of latitude circles of one axis, every separation is constant, and the law reduces to the rigid inverse-square balance of Section 3 of the independent reference. (H) holds automatically, and the conclusion is unconditional, in each of the following: (a) all six circles have the same radius, about any axes, at any heights and in any senses, which includes every great-circle family; (b) all six axes are parallel, with any radii, heights and senses, which is the stacked-latitude family with unequal rates; (c) every pair has equal radii, or parallel axes, or radii in a ratio $r/s$ in lowest terms with $r+s$ odd.

*Proof.* Step 1, no square pairs. By Lemmas 16.6, 16.6a and 16.7 and (H), every square pair is a mirror pair of equal radius, so every member's trivial class consists of rigid and mirror partners, and Lemma 16.8 removes the mirror partners. Hence for every member the trivial class is exactly its rigid partners, and every non-rigid pair has all its square-class information in odd-order zeros.

Step 2, sizes. By Lemma 16.4 the trivial class is not empty, since $\ddot{\mathbf X}_i=-\omega_i^2a_i\mathbf e_i\ne\mathbf 0$, and the non-rigid partners fall into classes of at least three. If member $i$ lies in a rigid group of $n_i$ members, then $n_i\ge2$ and $6-n_i\in\{0,3,4\}$, so the rigid groups have sizes $\{6\}$, $\{3,3\}$ or $\{2,2,2\}$. By (16.2) and Lemma 16.5 each rigid group satisfies by itself $\sum_j\sigma_{ij}K(\mathbf X_i-\mathbf X_j)/d_{ij}^3=-\omega^2a\,\mathbf e_i$, the brackets of rigid pairs being $1$.

Step 3, no rigid group of three. If the three lie on one latitude circle, the argument of Remark 9.2 applies in the plane of that circle with $a$ in place of $R$. If two lie at height $c\ne0$ and one at $-c$, the component along the axis of the equation of one of the two is $2c\,\sigma K/d^3\ne0$ from the lone member, with nothing to balance it. So $\{3,3\}$ is excluded.

Step 4, groups of two. The same axial component excludes a group of two on mirror latitudes with $c\ne0$. On one latitude circle, $\mathbf e_i-\mathbf e_j$ must be parallel to $\mathbf e_i$, so $\mathbf e_j=-\mathbf e_i$: the two are diametrically opposite on their circle, unlike, and $\omega^2=K/(4a^3)$. With $|\omega|a=v$ this gives $a=K/(4v^2)$ for every group: in $\{2,2,2\}$ all six circles have the same radius and the same absolute rate.

Step 5, no $\{2,2,2\}$. Describe all three groups with the positive rate $\omega$; their axes $\mathbf n_1,\mathbf n_2,\mathbf n_3$ are then pairwise different unit vectors. A member $i$ of group $1$ has four non-rigid partners, which must form one class. For the two members of group $2$, $\mathbf X_\pm=c_2\mathbf n_2\pm a\mathbf e_2$, the coefficients of $z^2$ in $D_{i\pm}$ are $\mp\tfrac12a^2\,\mathbf b_1\cdot\mathbf b_2$ times a common unit phase, opposite and non-zero. By Step 1 each $D_{i\pm}$ has four simple roots in $z$ (Lemma 16.7, or Lemma 16.6 if the two axes are opposite), and membership in one class makes the root sets equal, so $D_{i-}=\lambda D_{i+}$ with a constant $\lambda$, which is positive because both are positive at real times. The $z^2$ coefficients give $\lambda=-1$, a contradiction. So the two members of a group are never in one class of an outside member, no class has more than two partners, and $\{2,2,2\}$ is excluded. Only $\{6\}$ remains. $\square$

**Consequences.** (i) Stacked latitude circles about one axis with unequal rates: no six-member solution exists; the only solutions on coaxial circles at common speed are rigid rotations on one latitude or a mirror pair of latitudes. This is a derived statement for the stacked-latitude family that the first run studied numerically, and it answers the integer-rate question for coaxial circles at common speed in the negative for every rate ratio. (ii) Equal-radius families about different axes, including three diametral pairs on small circles and the great-circle families: only rigid rotations, which for great circles is Theorem 10.2. (iii) Together with the first run's results on the rigid class, the uniform-circle class reduces to the rigid one wherever (H) holds.

> Claim grade: derived for Theorem 16.9 as stated, by this lane, with the spot checks of Section 16.7 and no independent review yet. Falsifier: a collision-free six-member class-$U$ state that is not a rigid rotation, in which every pair has equal radii or parallel axes, with closed residual (16.1) below $10^{-8}$ over a common period by an independent evaluation; for the conditional form, the same with any radii and axes together with a verification that no pair's $D$ has only even-order zeros.

### 16.7 Validation record of the extension

Command `node weber-binding-sphere-gc-ext-checks.mjs` in `braid-program/evidence/`, $K=c_f=1$, $R=1$, seed in the receipt. Runs (UTC, 2026-10-06): 22:40:46, first complete run, known cases E1 passed first; its check E4 tested the mirror pair for a pole of order three and measured order two, which exposed that the chord of a mirror pair vanishes with $\eta$ and led to (16.5); 22:42:34, final run with E4 corrected to order two with its coefficient and with the square-condition identity added to E3, which produced the receipt. A further run added check E5 for Lemma 16.6a and changed no earlier number; its time and results are in the run record. The numbers are quoted in the claim blocks of Sections 16.3 and 16.4. Check E3(d) also confirms the opposite $z^2$ coefficients used in Step 5, to $9.6\times10^{-14}$ relative on $200$ cases, with modulus $a^2\sin^2\tfrac\gamma2$.

### 16.8 What is not proved in the extension

1. **The gap (H).** Whether a pair on circles of different radii about non-parallel axes, at common speed and without collision, can have $D_{ij}$ equal to the square of an entire function. Lemma 16.6a settles every commensurate radius ratio $r/s$ with $r+s$ odd. Two cases remain. For an irrational ratio, if the entire square root were again a trigonometric sum it would have the frequencies $\tfrac12(\pm\omega_i\pm\omega_j)$, none of them zero, hence zero mean and a real zero; what is missing is the statement that the square root must be a trigonometric sum, which a classical theorem of Ritt on algebraic combinations of exponentials is expected to supply and which has not been verified here. For a ratio of two odd integers other than $1:1$, such as $3:1$, the square root may have a constant term and the question is a finite algebraic one that was not examined. In the $40$ random unequal-rate configurations of check E2 every zero found was simple, which is evidence about generic pairs only. If a square pair of this kind exists, Theorem 16.9 says nothing about histories containing it: its term is single-valued with poles, and a pole analysis like Lemma 16.8 would be needed.
2. **Zeros of higher odd order** in the ruling statement of Section 16.5.
3. **Other numbers of members.** Lemmas 16.1 to 16.8 hold for any number of members; the count of Theorem 16.9 was done for six only.
4. **Everything in Section 12** that concerns histories outside the class, the delayed law, collisions and the classification of rigid solutions applies here unchanged; rigid solutions are the subject of the first run.
5. **Review.** Nothing in Section 16 has been examined by a second party.

## 17. The residual set of Theorem 16.9: irrational ratios and the ratio 3:1 closed (added after the 22:48:48Z extension freeze)

Status: added at the Principal Investigator's assignment after the extension freeze of 2026-10-06T22:48:48Z; Sections 1 to 16 are unchanged. Derivations by this lane with its own spot checks ([weber-binding-sphere-gc-res-checks.py](../evidence/weber-binding-sphere-gc-res-checks.py), receipt [weber-binding-sphere-gc-res-checks.json](../evidence/weber-binding-sphere-gc-res-checks.json)); not reviewed by anyone.

### 17.1 What closes and what remains

Hypothesis (H) of Theorem 16.9 concerned pairs on circles of different radii about non-parallel axes, and Lemma 16.6a left two kinds of radius ratio open: irrational ratios, and ratios of two odd integers other than $1:1$. This section closes the irrational ratios completely and the ratio $3:1$. For an irrational ratio the squared separation always has a complex zero of odd order, so such a pair is never a square pair; the proof needs no theorem from outside this file and no positive lower bound on separations. For the ratio $3:1$ the squared separation is a perfect square in exactly one configuration, in which the two circles are internally tangent and the members meet at the point of tangency: a collision. What remains open is the family of ratios $r:s$ with $r$ and $s$ odd, coprime and $\max(r,s)\ge5$, the smallest being $5:1$ and $5:3$.

The key observation, which the proposal anticipated as the stronger alternative, is that the two-variable polynomial behind $D_{ij}$ is never a square when the axes are not parallel, for any radii. A mirror pair is a square only on the particular line of the torus on which the two phases are locked together.

### 17.2 The two-variable polynomial is never a square

Write $z_1=e^{i(\omega_iT+\phi_i)}$, $z_2=e^{i(\omega_jT+\phi_j)}$ and $\mathbf b_i=\mathbf u_i-i\mathbf u_i'$ as in Section 16.4. Then $D_{ij}(T)=P(z_1,z_2)$ with the Laurent polynomial

$$
P=\sum_{p,q\in\{-1,0,1\}}p_{pq}\,z_1^pz_2^q,\qquad p_{11}=-\tfrac12a_ia_j\,\mathbf b_i\cdot\mathbf b_j,\quad p_{1,-1}=-\tfrac12a_ia_j\,\mathbf b_i\cdot\bar{\mathbf b}_j,\quad p_{10}=-c_ja_i\,\mathbf n_j\cdot\mathbf b_i,\quad p_{01}=-c_ia_j\,\mathbf n_i\cdot\mathbf b_j,\quad p_{00}=2R^2-2c_ic_j\cos\gamma ,
\tag{17.1}
$$

and $p_{-p,-q}=\bar p_{pq}$, where $\gamma$ is the angle between the axes. The moduli are $|p_{11}|=\tfrac12a_ia_j(1-\cos\gamma)$, $|p_{1,-1}|=\tfrac12a_ia_j(1+\cos\gamma)$, $|p_{10}|=|c_j|a_i\sin\gamma$ and $|p_{01}|=|c_i|a_j\sin\gamma$.

**Lemma 17.1.** If the axes are not parallel, there are no constant $c$ and polynomial $Q=q_{11}z_1z_2+q_{10}z_1+q_{01}z_2+q_{00}$ with $z_1z_2P=c\,Q^2$.

*Proof.* Comparing coefficients, $p_{11}=cq_{11}^2$, $p_{1,-1}=cq_{10}^2$, $p_{-1,1}=cq_{01}^2$, $p_{-1,-1}=cq_{00}^2$, $p_{10}=2cq_{11}q_{10}$, $p_{01}=2cq_{11}q_{01}$ and $p_{00}=2c(q_{11}q_{00}+q_{10}q_{01})$. Hence $p_{10}^2=4p_{11}p_{1,-1}$ and $p_{01}^2=4p_{11}p_{-1,1}$. Taking moduli, $c_j^2a_i^2\sin^2\gamma=a_i^2a_j^2\sin^2\gamma$ and the same with $i$ and $j$ exchanged, so $c_j^2=a_j^2$ and $c_i^2=a_i^2$ because $\sin\gamma\ne0$; with $c^2+a^2=R^2$ this gives $a_i=a_j=|c_i|=|c_j|=R/\sqrt2$. Also $|cq_{11}q_{00}|=|p_{11}|$ and $|cq_{10}q_{01}|=|p_{1,-1}|$, so $|p_{00}|\le2|p_{11}|+2|p_{1,-1}|=2a_ia_j=R^2$. But $p_{00}=2R^2-2c_ic_j\cos\gamma\ge2R^2-R^2|\cos\gamma|>R^2$. $\square$

### 17.3 Irrational radius ratio

**Lemma 17.2.** Let the axes be non-parallel and $\omega_i/\omega_j$ irrational. If every complex zero of $D_{ij}(T)$ has even order, then $z_1z_2P=c\,Q^2$ for a constant $c$ and a polynomial $Q$ of degree at most one in each variable.

*Proof.* $F=z_1z_2P$ is a polynomial of degree two in each variable. It is divisible by neither $z_1$ nor $z_2$, because $p_{-1,\pm1}$ and $p_{\pm1,-1}$ are not zero. Factor $F=c\prod_kF_k^{m_k}$ with pairwise non-proportional irreducible polynomials $F_k$; none is a multiple of $z_1$ or $z_2$, so each has at least two monomials. Put $\varphi(T)=(z_1(T),z_2(T))$, which is injective because the ratio is irrational, and $f_k=F_k\circ\varphi$. A monomial $z_1^az_2^b$ becomes a constant times $e^{i(a\omega_i+b\omega_j)T}$, and different monomials give different frequencies, again by irrationality. So each $f_k$ is an exponential sum with at least two distinct frequencies. Three facts follow.

First, $f_k$ has infinitely many zeros: an entire function of order at most one with finitely many zeros is a polynomial times a single exponential (Hadamard's factorization), and the functions $T^ne^{\lambda T}$ for different pairs $(n,\lambda)$ are linearly independent, so a sum of two or more distinct exponentials is not of that form.

Second, for $k\ne l$ the functions $f_k$ and $f_l$ have finitely many common zeros: two non-proportional irreducible polynomials have finitely many common zeros in the plane, and $\varphi$ is injective.

Third, $f_k$ has finitely many multiple zeros. Its derivative is $f_k'=(VF_k)\circ\varphi$ with $V=i\omega_iz_1\partial_{z_1}+i\omega_jz_2\partial_{z_2}$, and $V$ multiplies the monomial $z_1^az_2^b$ by $i(a\omega_i+b\omega_j)$. If $F_k$ divided $VF_k$, the quotient would be a constant $\lambda$ for reasons of degree, every monomial of $F_k$ would have the same multiplier $\lambda$, and $F_k$ would be a single monomial. So $F_k$ does not divide $VF_k$, the irreducible $F_k$ and $VF_k$ have finitely many common zeros, and by injectivity $f_k$ and $f_k'$ have finitely many common zeros.

Therefore, for each $k$ there is a zero $T_0$ of $f_k$ that is simple and is not a zero of any other $f_l$. Since $D_{ij}=F\circ\varphi/(z_1z_2)$ and $z_1z_2$ has no zero, the order of $D_{ij}$ at $T_0$ is $m_k$. If all zeros of $D_{ij}$ have even order, every $m_k$ is even and $F=c\,Q^2$ with $Q=\prod_kF_k^{m_k/2}$. $\square$

**Corollary 17.3 (irrational ratios are closed).** A pair on circles about non-parallel axes whose radius ratio is irrational is never a square pair: $D_{ij}$ has a complex zero of odd order. No hypothesis on collisions enters this statement.

*Proof.* Lemmas 17.2 and 17.1. $\square$

**On the margin hypothesis.** The proposal's second step would have shown that a square of the half-degree form vanishes somewhere on the torus and would then have needed the trajectory's density and a positive lower bound on separations to conclude. Lemma 17.1 makes that step unnecessary, so the distinction between "no collision at any real time" and "separations bounded below by a positive margin" does not enter. The distinction is real for quasi-periodic histories, where the infimum of a separation over all time can be zero without any collision; Theorem 17.5 below is stated, and proved, under the weaker hypothesis that no pair collides at any real time, and it therefore also holds under the stronger one.

> Claim grade: derived. The proof of Lemma 17.2 uses three standard facts stated where used (Hadamard's factorization for entire functions of order one, linear independence of the functions $T^ne^{\lambda T}$, finiteness of the common zeros of two plane curves without common component). Checked numerically (check R1): the moduli of (17.1) and the absence of other terms on $300$ random pairs by a two-dimensional Fourier transform on the torus, to $2.7\times10^{-15}$; the identities $|p_{10}|^2-4|p_{11}||p_{1,-1}|=a_i^2\sin^2\gamma\,(c_j^2-a_j^2)$ and its exchange to $7.8\times10^{-16}$; over the $300$ pairs the largest of the three square defects, divided by $\sin^2\gamma$, is at least $0.39$. Known case, run first: a mirror pair is a square on the phase-locked line to $2.2\times10^{-15}$ and is not a square on the torus (defect $5.3\times10^{-3}$). Check E2 of Section 16 found only simple zeros on $40$ random unequal-rate pairs. Falsifier: a pair with non-parallel axes and irrational radius ratio all of whose complex zeros of $D$ have even order.

### 17.4 The ratio 3:1

**Lemma 17.4.** Let the axes be non-parallel and the radii be $a_i=a$ and $a_j=3a$, so that $|\omega_i|=3|\omega_j|$. Then $D_{ij}$ is the square of an entire function if and only if, in the description with positive rates and with $R=1$: $a^2=2/27$, $\cos\gamma=7/9$, the heights $c_i,c_j$ have the same sign, and $\phi_i-3\phi_j\equiv\pi$ in the frame $\mathbf u_i=\mathbf u_j=\boldsymbol\ell$ of Lemma 16.7. In that configuration the two circles are internally tangent, since $\arcsin a_j-\arcsin a_i=\gamma$, the members meet at the point of tangency once per period, and $D_{ij}$ has a real zero of order four. So no pair with radius ratio $3:1$ is a square pair without collision.

*Proof.* Put $\zeta=e^{i\omega_0T}$ with $\omega_j=\omega_0$, $\omega_i=3\omega_0$, shift time so that $\phi_j=0$ and write $\phi=\phi_i$, $C=\cos\gamma$, $S=\sin\gamma$. From (17.1) in the frame of Lemma 16.7, $D=\sum_{k=-4}^4d_k\zeta^k$ with $d_4=-\tfrac32a^2(1-C)e^{i\phi}$, $d_3=-ic_jaSe^{i\phi}$, $d_2=-\tfrac32a^2(1+C)e^{i\phi}$, $d_1=3ic_iaS$, $d_0=2-2c_ic_jC$ and $d_{-k}=\bar d_k$. An entire square root is $g=\sum_{k=-2}^2g_k\zeta^k$, real on the unit circle, so $g_{-k}=\bar g_k$, and $g^2=D$ is the five equations $g_2^2=d_4$, $2g_2g_1=d_3$, $2g_2g_0+g_1^2=d_2$, $2(g_2\bar g_1+g_1g_0)=d_1$, $2|g_2|^2+2|g_1|^2+g_0^2=d_0$. The first two give $g_1^2=d_3^2/(4d_4)=\tfrac16c_j^2(1+C)e^{i\phi}$, and the third, with $c_j^2=1-9a^2$, gives $2g_2g_0=-\tfrac16(1+C)e^{i\phi}$. Squaring and dividing by $g_2^2=d_4$: $g_0^2=-e^{i\phi}(1+C)^2/(216a^2(1-C))$. Since $g_0$ is real and not zero, $e^{i\phi}=-1$. Then $g_2=s$ is real with $s^2=\tfrac32a^2(1-C)$, $g_0=(1+C)/(12s)$ and $g_1=ic_jaS/(2s)$. The fourth equation becomes $c_j(g_0-s)=3c_is$, that is

$$
c_j(1+C)=18a^2(1-C)(3c_i+c_j),
\tag{A}
$$

and the fifth becomes

$$
2-2c_ic_jC=3a^2(1-C)+\frac{(1+C)^2}{216a^2(1-C)}+\frac{(1-9a^2)(1+C)}{3}.
\tag{B}
$$

Equation (A) excludes $c_j=0$, since it would then require $c_i=0$ while $c_i^2=1-a^2>0$. Put $q=c_j^2=1-9a^2\in(0,1)$ and $u=c_i/c_j$, so $9u^2q=8+q$ and $|u|\ge1$. Equation (A) reads $(1+C)/(1-C)=2(1-q)(3u+1)$, whose left side is positive, so $u>0$: the heights have the same sign. Substituting this value $t$ of $(1+C)/(1-C)$ in (B) and multiplying by $3q(1+t)$ gives $\sqrt{q(8+q)}\,(4q^2-8q+5)=4+5q-8q^2-4q^3$, and the difference of the squares of the two sides is $16(1-q)(3q-1)^3$. Hence $q=\tfrac13$, $a^2=\tfrac2{27}$, $u=\tfrac53$, $(1+C)/(1-C)=8$ and $C=\tfrac79$, and conversely these values satisfy all five equations. With them $g=\tfrac{4\sqrt2}9(1\mp\sin x)(2\pm\sin x)$, $x=\omega_0T$, which has a double real zero, so $D$ has a real zero of order four. Finally $\cos(\arcsin a_j-\arcsin a_i)=\tfrac1{\sqrt3}\cdot\tfrac5{\sqrt{27}}+\sqrt{\tfrac23}\sqrt{\tfrac2{27}}=\tfrac79$, which is the tangency. $\square$

> Claim grade: derived, with one step done by computer algebra: the factorization $q(8+q)(4q^2-8q+5)^2-(4+5q-8q^2-4q^3)^2=-16(q-1)(3q-1)^3$ (sympy, exact; real roots $\tfrac13$ three times and $1$). Checked numerically (checks R2, R3): at the stated configuration $\min D=1.3\times10^{-32}$ and the eight roots in $\zeta$ form two double roots at moduli $3.732$ and $0.268$ and a fourfold root on the unit circle; the reduction of (B) to the one-variable condition holds to $1.4\times10^{-14}$ on $197$ values of $q$, and that condition changes sign only at $q=\tfrac13$; solving (A) and (B) numerically from $300$ random starts per sign gives only $a^2\in[0.07401,0.07413]$ around $2/27$ for heights of equal sign and no solution for opposite signs; $293$ random collision-free $3:1$ pairs have eight simple roots, smallest gap $0.050$; a direct squareness defect that does not use the reduction (top-down square root of the Laurent polynomial) is $6.7\times10^{-14}$ at the tangent configuration, at least $0.41$ on $18866$ random pairs with $\min D\ge0.01$, and when minimized under that margin it descends only to $8.7\times10^{-3}$ with the margin active and $\phi=\pi$, that is toward the colliding configuration. Falsifier: a $3:1$ pair with non-parallel axes, without real collision, whose $D$ has four double roots in $\zeta$.

### 17.5 Final form of the six-member statement

**Hypothesis (H′).** No pair of members on circles about non-parallel axes whose radii are in a ratio $r:s$ with $r$ and $s$ odd, coprime and $\max(r,s)\ge5$ is a square pair.

**Theorem 17.5 (final form of Theorem 16.9).** Let six members with polarities $\pm1$ move uniformly on circles of one sphere of radius $R$, each about its own axis, at one common speed $v>0$, with no collision at any real time, and let $K>0$ and $c_f>0$. Assume (H′). If the instantaneous Weber comparison law holds for every member at every time, then the history is a rigid rotation: the six angular velocity vectors are equal, the members lie on one latitude circle or on a mirror pair of latitude circles of one axis, all separations are constant, and the law reduces to the rigid inverse-square balance. The conclusion is unconditional whenever no pair has non-parallel axes together with a radius ratio $r:s$ of coprime odd integers with $\max(r,s)\ge5$; in particular when all axes are parallel, when all radii are equal, and when every ratio of two different radii is irrational, or rational with numerator plus denominator odd in lowest terms, or equal to $3:1$.

*Proof.* The proof of Theorem 16.9 uses (H) only in its Step 1, to know that every square pair is a mirror pair of equal radius. Pairs with parallel axes are covered by Lemma 16.6, equal radii by Lemma 16.7, ratios with odd sum by Lemma 16.6a, irrational ratios by Corollary 17.3, the ratio $3:1$ by Lemma 17.4, and the remaining ratios by (H′). Steps 2 to 5 are unchanged. $\square$

**The exact residual set.** Six-member histories of the class that contain at least one pair on circles about non-parallel axes with radii in a ratio $r:s$, $r,s$ odd and coprime, $\max(r,s)\ge5$, whose squared separation is the square of an entire function without real zero. Whether any such pair exists is not known. For such a ratio the root, if it exists, is a Laurent polynomial in $\zeta$ of degree $(r+s)/2$, and $g^2=D$ is a finite algebraic system; for $3:1$ it has only the tangent-circle solution, and the analogous reduction for $5:1$ and $5:3$ was not attempted for lack of time. The internally tangent configuration suggests the conjecture that for every odd ratio the only square is a tangential collision; this is a guess, not a result.

**Dated note to Section 16.8 (2026-10-06T23:04Z; Section 16 is not edited).** Item 1 of Section 16.8 is superseded as follows. The irrational case is closed by Corollary 17.3 without Ritt's theorem, which is therefore not used anywhere in this file. Of the ratios of two odd integers, $3:1$ is closed by Lemma 17.4. The gap is now exactly hypothesis (H′). Items 2 to 5 of Section 16.8 stand.

> Claim grade: derived for Theorem 17.5 as stated, by this lane, unreviewed. Open: (H′). Falsifier: a collision-free six-member history of the class, not a rigid rotation, containing no pair with non-parallel axes and radius ratio of coprime odd integers with larger term at least five, whose residual (16.1) is below $10^{-8}$ over a long interval by an independent evaluation.

### 17.6 Validation record of this section

Command `../../../../../../.venv/bin/python weber-binding-sphere-gc-res-checks.py` in `braid-program/evidence/` (shared venv; numpy, scipy, sympy), $R=1$. Runs (UTC, 2026-10-06): 22:56:14, stopped in the symbolic step because the numerical root finder does not converge on a triple root (known case and R1 had passed and printed); 22:56:30, complete run with exact real-root isolation; 22:58:14, run with the direct defect R3 added; 23:02:15, final run with the check of the algebraic reduction of (B) added, which produced the receipt. The known case ran first in every run. A preliminary solve of the unreduced five equations for $3:1$ (scratch script, 22:53Z) found the same single solution and showed that it has $\min g=0$; it is superseded by checks R2 and R3. The numbers are quoted in the claim blocks of Sections 17.3 and 17.4.

## 18. Response to the review of Sections 1 to 14, and closure of the remaining residual set (added after the 23:03:48Z freeze)

Status: added at the Principal Investigator's assignment after the freeze of Section 17 at 2026-10-06T23:03:48Z; Sections 1 to 17 are unchanged. Part A answers the independent review of Sections 1 to 14 by dated notes. Part B is new derivation by this lane with its own spot checks ([weber-binding-sphere-gc-res2-checks.py](../evidence/weber-binding-sphere-gc-res2-checks.py), receipt [weber-binding-sphere-gc-res2-checks.json](../evidence/weber-binding-sphere-gc-res2-checks.json)) and has not been reviewed.

### 18.1 Part A: notes on Sections 1 to 14 after independent review (2026-10-06T23:12Z)

The independent review confirmed Theorem 10.2 for six members and asked for four corrections and offered one strengthening. All five are accepted. The frozen text is not edited; the notes below govern where they differ from it.

**Note C1 (Lemma 9.1(b)).** As stated, with "opposite polarities" and $\Omega^2=K/(4R^3)$, part (b) holds for polarities $\pm1$. For general non-zero real polarities the same computation, $2\sigma_{ij}K=-8\Omega^2R^3$, gives $\sigma_{ij}<0$ and $\Omega^2=|\sigma_{ij}|K/(4R^3)$. Part (a), which is the only part used in the proof of Theorem 10.2, is unaffected. Accepted.

**Note C2 and the strengthening (Lemma 8.1 becomes "at least four").** A coincidence class of three is impossible for any non-zero real polarities. Verified here: the second relation of (7.3), which is the contraction of identity (II) with $\mathbf b_i$ (equivalently with $\mathbf X_i$, since $\mathbf X_i\cdot(\mathbf X_i-\mathbf X_j)=\tfrac12D_{ij}=R^2A_{ij}h$), gives $\sum_Sc_j=0$ for $c_j=\sigma_{ij}A_{ij}^{-1/2}$; identity (I) then gives $\sum_Sc_j\mathbf X_j=\mathbf 0$, the third relation of (7.3). For three partners with non-zero $c_1,c_2,c_3$ summing to zero, $\mathbf X_3=(c_1\mathbf X_1+c_2\mathbf X_2)/(c_1+c_2)$ is a point of the line through $\mathbf X_1$ and $\mathbf X_2$ and of the sphere, hence equal to one of them: a collision. Both relations were already in Corollary 7.3; this lane had drawn the conclusion only for polarities $\pm1$ (Lemma 8.3) and missed that it holds in general. So every coincidence class has at least four partners, on four different oriented circles by Lemma 8.2, and wherever Sections 8, 10 and 11 say "at least three" they may be read as "at least four". Accepted.

**Note C3 (Section 3).** Uniform motion at a common speed on great circles is the definition of the class studied, not a consequence of the law; what follows from equal speed on great circles of one sphere is only that the angular rate is common. The sentence in Section 3 is to be read in that sense. Accepted.

**Note C4 (Section 10, cross-check of $\{3,3\}$).** The cross-check treats a member's three partners on the other circle as one class; the missing clause is that they must form a single class because classes of one and of two are excluded by Lemma 8.1. Accepted.

**Final range of the great-circle theorem.** With classes of at least four on four different oriented circles, a solution that is not a planar ring needs at least five oriented circles, each with at least two members by Lemma 9.1(a), hence at least ten members. The conclusion of Theorem 10.2 therefore holds for every $N\le9$ and any non-zero real polarities, which supersedes the range $N\le7$ stated in Theorem 10.2 and the restriction to polarities $\pm1$ in Remark 10.3. The first case not excluded is ten members on five oriented circles of two.

> Claim grade: derived (the strengthening and the range $N\le9$), with the reviewer and the Principal Investigator as first readers and this lane as a further reader; the relations used are those of Corollary 7.3, whose contraction identities were spot-checked in check 4(f). Falsifier: a collision-free great-circle solution with at most nine members, any non-zero real polarities, and unequal oriented normals.

### 18.2 Part B: every remaining odd ratio is closed

Section 17 left hypothesis (H′): pairs about non-parallel axes with radii in a ratio of coprime odd integers, the larger at least five. Both sub-families are closed here, so (H′) always holds.

**Setting.** Let the rates be $r\omega_0$ and $s\omega_0$ with $r>s\ge1$ coprime and odd, $m=(r+s)/2$, $\zeta=e^{i\omega_0T}$ and $x=1/\zeta$. By (17.1), $D=\sum_kd_k\zeta^k$ has the exponents $0,\pm s,\pm(r-s),\pm r,\pm(r+s)$ only. Suppose $D=g^2$ with $g$ entire; then $g=\sum_{|k|\le m}g_k\zeta^k$ with $g_{-k}=\bar g_k$, and with $h_k=g_{m-k}/g_m$,

$$
H(x)^2=E(x),\qquad H=\sum_{k=0}^{r+s}h_kx^k,\quad h_0=1,\qquad E=\frac{D}{d_{r+s}\zeta^{r+s}}=1+e_sx^s+e_{2s}x^{2s}+e_rx^r+e_{r+s}x^{r+s}+\dots,
\tag{18.1}
$$

where the exponents of $E$ are $ra+sb$ with $a,b\in\{0,1,2\}$, and the reality of $g$ on the unit circle gives the symmetry

$$
h_{r+s-k}=\bar h_k\,u,\qquad u=h_{r+s}=\bar g_m/g_m,\quad|u|=1 .
\tag{18.2}
$$

The coefficients $h_k$ are determined from the bottom by $2h_k=e_k-\sum_{0<i<k}h_ih_{k-i}$.

**Lemma 18.1 (smaller term at least three).** If $s\ge3$, $D$ is not the square of an entire function, with or without collision.

*Proof.* Every exponent of $E$ below $r$ is a multiple of $s$, so by induction on the recursion $h_k=0$ for $0<k<r$ unless $s$ divides $k$. By (18.2) the same holds for $r+s-k$ in place of $k$: for $s<k<r+s$, $h_k=0$ unless $k\equiv r$ modulo $s$. For $s<k<r$ both conditions apply and are incompatible, because $r$ is not divisible by $s$. Hence $H=1+h_sx^s+h_rx^r+ux^{r+s}$, which is $\tilde Q(x^r,x^s)$ for $\tilde Q(X,Y)=1+h_sY+h_rX+uXY$. Because $s\ge3$ and $r,s$ are coprime, the nine exponents $ra+sb$ with $a,b\in\{0,1,2\}$ are pairwise different, so $H^2=E$ is an identity between two-variable polynomials, and with $X=1/z_1$, $Y=1/z_2$ it reads $z_1z_2P=d_{r+s}Q^2$ for $Q=z_1z_2+h_sz_1+h_rz_2+u$. Lemma 17.1 excludes this. $\square$

**Lemma 18.2 (ratios $r:1$ with $r\ge5$ odd).** If $s=1$ and $r\ge5$, $D$ is not the square of an entire function, with or without collision.

*Proof.* Use the frame of Lemma 16.7 with $\phi_j=0$, $\phi_i=\phi$, and put $\kappa=\cot\tfrac\gamma2>0$, $\beta=c_j/a_j$, $\beta_i=c_i/a_i$; here $a_j=ra_i$, so $|\beta_i|>r|\beta|$ when $\beta\ne0$, and $\beta_i\ne0$. From (17.1), $e_1=2i\beta\kappa$, $e_2=\kappa^2$ and $e_r=-2i\beta_i\kappa e^{-i\phi}$. Since $E$ has no exponent between $2$ and $r$, the $h_k$ with $k\le r-1$ are the Taylor coefficients of $\sqrt{1+2i\beta\kappa x+\kappa^2x^2}$. With $y=-i\kappa x$ this is $\sqrt{1-2\beta y-y^2}=\sum_n\tau_ny^n$ with real $\tau_n$ obeying $(n+1)\tau_{n+1}=(2n-1)\beta\tau_n+(n-2)\tau_{n-1}$, $\tau_0=1$, $\tau_1=-\beta$, so $\tau_2=-\tfrac12(1+\beta^2)$, $\tau_3=\beta\tau_2$, $\tau_4=\tfrac14(1+5\beta^2)\tau_2$. Put $t_n=\tau_n\kappa^n$, so $h_n=(-i)^nt_n$ for $n\le r-1$ and $(n+1)t_{n+1}=(2n-1)\beta\kappa\,t_n+(n-2)\kappa^2t_{n-1}$.

For $2\le k\le r-1$ both $h_k$ and $h_{r+1-k}$ are of this form, and (18.2) becomes $t_{r+1-k}=\epsilon\,t_k$ with $\epsilon=(-1)^mu$, which is real, hence $\pm1$, because $t_2\ne0$. Insert $k=2,3,4$ in the recurrence at $n=r-2$: $(r-1)t_2=(2r-5)\beta\kappa\,t_3+(r-4)\kappa^2t_4$, that is

$$
r-1=(2r-5)\,\beta^2\kappa^2+\tfrac14(r-4)(1+5\beta^2)\,\kappa^4 .
\tag{P1}
$$

Next, the coefficient of $x^r$: $e_r=2h_r+\sum_{0<i<r}h_ih_{r-i}=2(h_r-\sigma_r)$, where $\sigma_r=(-i)^rt_r$ is the $r$-th Taylor coefficient of the same square root, since that square has no term $x^r$. By (18.2), $h_r=\bar h_1u=-i\beta\kappa u$, and the recurrence at $n=r-1$ with $t_{r-1}=\epsilon t_2$, $t_{r-2}=\epsilon t_3$ gives $rt_r=\epsilon\tau_2\beta\kappa^3[(2r-3)+(r-3)\kappa^2]$. With $(-i)^r=(-1)^mi$ this yields $e_r=-2i\beta\kappa u\,(1-W)$, where $W=(1+\beta^2)\kappa^2[(2r-3)+(r-3)\kappa^2]/(2r)>0$. Comparing with $e_r=-2i\beta_i\kappa e^{-i\phi}$: $|\beta|\,|1-W|=|\beta_i|$. If $\beta=0$ this is impossible. Otherwise $|1-W|>r$, and since $W>0$,

$$
(1+\beta^2)\,\kappa^2\big[(2r-3)+(r-3)\kappa^2\big]>2r(r+1).
\tag{P2}
$$

For $r=5$ the symmetry relation with $k=2$ is $t_4=\epsilon t_2$, that is $\tfrac14(1+5\beta^2)\kappa^2=\epsilon$, so $\epsilon=1$ and $\kappa^2(1+5\beta^2)=4$ (with which (P1) agrees); then $(1+\beta^2)\kappa^2<4$ and $\kappa^2<4$ for $\beta\ne0$, and the left side of (P2) is below $4\cdot(7+2\cdot4)=60=2r(r+1)$. For $r\ge7$, every term of (P1) is non-negative, so $\kappa^4\le4(r-1)/(r-4)\le8$, $\beta^2\kappa^2\le(r-1)/(2r-5)\le\tfrac23$ and $\beta^2\kappa^4\le4(r-1)/(5(r-4))\le\tfrac85$; the left side of (P2) is then at most $(2r-3)(2\sqrt2+\tfrac23)+(r-3)(8+\tfrac85)<16.6\,r-39.3$, and $16.6r-39.3<2r^2+2r$ for every $r$ because the quadratic $2r^2-14.6r+39.3$ has negative discriminant. In both cases (P2) fails. $\square$

**Theorem 18.3 (the uniform-circle class, unconditional).** Hypothesis (H′) of Theorem 17.5 always holds. Consequently: let six members with polarities $\pm1$ move uniformly on circles of one sphere, each about its own axis, at one common speed, with no collision at any real time, and let $K>0$, $c_f>0$. If the instantaneous Weber comparison law holds for every member at every time, the history is a rigid rotation: one angular velocity vector, one latitude circle or a mirror pair of latitude circles of one axis, constant separations, and the rigid inverse-square balance. No hypothesis on radius ratios remains.

*Proof.* A square pair has radius ratio $1:1$ and is a mirror pair (Lemma 16.7), excluded from solutions by Lemma 16.8, or would have: parallel axes (Lemma 16.6, none); a rational ratio with odd sum (Lemma 16.6a, none without collision); an irrational ratio (Corollary 17.3, none); the ratio $3:1$ (Lemma 17.4, none without collision); a ratio of coprime odd integers with smaller term at least three (Lemma 18.1, none); or a ratio $r:1$ with $r\ge5$ odd (Lemma 18.2, none). These exhaust all cases, so Step 1 of the proof of Theorem 16.9 holds without hypothesis, and Steps 2 to 5 follow. $\square$

**Dated note to Sections 16.8 and 17.5 (2026-10-06T23:12Z; those sections are not edited).** The residual set described there is empty: item 1 of Section 16.8 and hypothesis (H′) are discharged by Lemmas 18.1 and 18.2. The conjecture recorded in Section 17.5, that squares at odd ratios occur only as tangential collisions, is settled differently: apart from $1:1$ (mirror pairs) and $3:1$ (the tangent configuration), no odd ratio admits a square at all. What remains unproved in the uniform-circle class is listed in items 2 to 5 of Section 16.8: zeros of higher odd order in the ruling statement, which the theorem does not use; other numbers of members; and independent review, which Sections 16 to 18 have not had.

> Claim grade: derived (Lemmas 18.1, 18.2, Theorem 18.3), by this lane, unreviewed, written under time pressure; the chain for Theorem 18.3 runs through Sections 16 and 17, which are with the reviewer. Checked numerically: known case first (the tangent $3:1$ configuration has square defect $3.9\times10^{-14}$, a generic $3:1$ pair $11.8$); for $5:3$, $7:3$, $7:5$ on $200$ random pairs each, $D$ has no coefficient outside the stated exponents ($5.5\times10^{-16}$), the bottom-up $h_k$ vanish below $r$ off the multiples of $s$ ($1.0\times10^{-12}$), and the direct square defect is at least $0.30$; for $5:1$, $7:1$, $9:1$, $11:1$ on $150$ random pairs each, $h_k=(-i)^nt_n$ from the recurrence to $6.3\times10^{-13}$, $e_r=-2i\beta_i\kappa e^{-i\phi}$ to $1.1\times10^{-13}$, the direct square defect at least $1.8$, and on the curve (P1) the largest value of the left side of (P2) is $60.0$, $63.1$, $76.3$, $91.1$ against the required excess over $60$, $112$, $180$, $264$ (for $r=5$ the value $60$ is attained only at $\beta=0$, which is excluded); for $5:1$ the closed forms of $e_1,e_2,h_1,\dots,h_4,e_5,e_6$ agree with the Fourier coefficients to $2.4\times10^{-10}$ or better. Falsifier: a pair about non-parallel axes with coprime odd radius ratio other than $1:1$ and $3:1$ whose $D$, as a polynomial in $\zeta$, has only roots of even multiplicity; or a collision-free six-member uniform-circle history that is not a rigid rotation with residual (16.1) below $10^{-8}$ by an independent evaluation.

### 18.3 Validation record of this section

Command `../../../../../../.venv/bin/python weber-binding-sphere-gc-res2-checks.py` in `braid-program/evidence/`, $R=1$. Runs (UTC, 2026-10-06): 23:08:24, first complete run (known case, the three ratios with $s\ge3$, and $5:1$); 23:10:42, final run with the $r:1$ checks for $r=5,7,9,11$ added, which produced the receipt. The known case ran first in both.

## 19. Notes after the independent review of Sections 16 to 18 (2026-10-06T23:30Z)

Status: dated notes by this lane in reply to the independent review of Sections 16, 17 and 18.2, relayed by the Principal Investigator. Sections 1 to 18 are unchanged. The review found no defect; it confirmed Theorem 16.9 independently on the sub-classes "all radii equal, any axes" and "all axes parallel, any radii", and read every step of the unconditional statement once. Its five remarks are all accepted.

**Naming.** To avoid confusion with Theorem 18.3 of the [independent reference](weber-binding-sphere-independent-reference.md) (the closest-approach lemma), Theorem 18.3 of this document is to be called **the uniform-circle theorem**. Theorem 10.2, with the range of Section 18.1, remains the great-circle theorem.

**Note E1 (Lemma 16.2).** Accepted. The relation obtained after the loop is a relation between germs at the point near $T_\ast$. Before it is compared with the minimal relation it is to be continued back to $T_0$ along the reversed path; there each $\sqrt{f_r}$ arrives as $\epsilon_r$ times its original germ, so the shorter relation is a relation between the original germs at $T_0$, as minimality requires.

**Note E2 (Lemma 16.5).** Accepted. The proof should say that the frequencies $\omega_i+\omega_j$ and $\omega_i-\omega_j$ cannot coincide with each other in absolute value, because that would need $\omega_i=0$ or $\omega_j=0$ and no rate is zero. The remaining coincidences are the four listed there.

**Note E3 (Lemma 18.1).** Accepted. In Section 17 the variables are $z_1=e^{i(\omega_iT+\phi_i)}$ and $z_2=e^{i(\omega_jT+\phi_j)}$, so $z_1=e^{i\phi_i}\zeta^r$ and $z_2=e^{i\phi_j}\zeta^s$: the substitution $X=1/z_1$, $Y=1/z_2$ in the proof of Lemma 18.1 holds up to constant unit phases, which multiply the coefficients of $Q$ by unit factors. Lemma 17.1 compares moduli of coefficients only and is unaffected.

**Note E4 (Lemma 16.8).** Accepted. The numerator at a pole is strictly greater than $1$, since $|c\nu_n|>a\nu_\perp$ strictly for a pair that does not collide; the statement "$\ge1$" is true and weaker than what holds.

**Note E5 (Lemma 17.4).** Accepted as an accompanying route; equations (A) and (B) stand. Checked here: with $r=3$, $s=1$ in the setting of Section 18.2, $h_1=i\beta\kappa$ and $h_2=\tfrac12\kappa^2(1+\beta^2)$, and the symmetry (18.2) at $k=2$ gives $u=1$ because $h_2$ is real and not zero, so $h_3=-i\beta\kappa$ and $h_4=1$. Then $e_4=2+2\beta^2\kappa^2+h_2^2>0$ against $e_4=d_0/d_4$, a negative multiple of $e^{-i\phi}$, gives $e^{i\phi}=-1$; and $e_3=2i\beta\kappa(h_2-1)$ against $e_3=-2i\beta_i\kappa e^{-i\phi}$ gives $\beta(h_2-1)=\beta_i$. These two relations are (A) and (B) in other variables and reduce to one equation in $q=c_j^2$, whose only root in $(0,1)$ is $q=\tfrac13$, as the reviewer found independently. The route has the advantage of being the $r=3$ instance of the argument of Lemma 18.2.

> Claim grade after review: Theorem 16.9 on its two named unconditional sub-classes is derived and independently confirmed; the uniform-circle theorem in full is derived, with one independent reading of every step. Falsifiers are those of Sections 16.6 and 18.2.

## 20. Equal-speed spherical curves with finitely many harmonics are circles (added 2026-10-06T23:43Z, claim block corrected 23:50Z)

Status: added at the Principal Investigator's assignment; Sections 1 to 19 are unchanged. The lemma was proposed by the Principal Investigator; this lane checked the proof, completed two of its steps, and tested it numerically ([weber-binding-sphere-gc-fh-checks.py](../evidence/weber-binding-sphere-gc-fh-checks.py), receipt [weber-binding-sphere-gc-fh-checks.json](../evidence/weber-binding-sphere-gc-fh-checks.json)). Verdict: the proof holds. It has had two readers, its proposer and this lane, and no independent review.

### 20.1 The lemma

A closed curve whose coordinates are finite trigonometric sums, which stays on a sphere and is traversed at constant speed, turns out to be a circle. The reason is a degree count. The curve, its unit tangent and their cross product form a moving orthonormal frame whose members are again finite trigonometric sums, and the frame's rate of turning out of the tangent plane is measured by one scalar finite sum $k$. The frame equations relate the highest harmonics of these objects, and the only way the highest harmonics can balance is for $k$ to have no harmonics at all, that is to be constant; a spherical curve of constant speed and constant $k$ is a uniformly traversed circle.

**Lemma 20.1 (finite-harmonic curves).** Let $\mathbf X(T)=\sum_{n=-M}^{M}\mathbf x_ne^{in\omega T}$ be a real vector trigonometric polynomial, $\mathbf x_{-n}=\bar{\mathbf x}_n$, of degree $M\ge1$ (so $\mathbf x_M\ne\mathbf 0$), with $\lVert\mathbf X(T)\rVert=R>0$ and $\lVert\dot{\mathbf X}(T)\rVert=v>0$ for all real $T$. Then $\mathbf X$ is a uniformly traversed circle of the sphere: there is a constant vector $\mathbf D$ with $\dot{\mathbf X}=\mathbf D\times\mathbf X$, $\lVert\mathbf D\rVert=M\omega$, and $\mathbf X$ contains only the harmonics $0$ and $\pm M$; the circle is traversed $M$ times per period $2\pi/\omega$.

*Proof.* Write $z=e^{i\omega T}$. Vector and scalar trigonometric polynomials are Laurent polynomials in $z$; the scalar ones form an integral domain. Call the degree of a non-zero Laurent polynomial its largest exponent with non-zero coefficient; for a real one the exponents are symmetric, so the degree is at least $0$, and it is $0$ exactly for constants. Two facts are used: the degree of a scalar times a vector is the sum of the degrees, because the leading coefficient of the product is the product of a non-zero number and a non-zero vector; and differentiation in $T$ multiplies the coefficient of $z^n$ by $in\omega$, so it preserves the degree of anything of positive degree.

Put $\mathbf e_1=\mathbf X/R$, $\mathbf e_2=\dot{\mathbf X}/v$ and $\mathbf e_3=\mathbf e_1\times\mathbf e_2$. These are trigonometric polynomials, orthonormal at every real time because $\mathbf X\cdot\dot{\mathbf X}=\tfrac12\tfrac{d}{dT}\lVert\mathbf X\rVert^2=0$. The degree of $\mathbf e_2$ is $M$, since its leading coefficient is $iM\omega\,\mathbf x_M/v\ne\mathbf 0$. Differentiating the orthonormality relations gives the frame equations

$$
\dot{\mathbf e}_1=\frac vR\,\mathbf e_2,\qquad\dot{\mathbf e}_2=-\frac vR\,\mathbf e_1+k\,\mathbf e_3,\qquad\dot{\mathbf e}_3=-k\,\mathbf e_2,\qquad k=\dot{\mathbf e}_2\cdot\mathbf e_3 ,
\tag{20.1}
$$

where $k$ is a real scalar trigonometric polynomial: $\dot{\mathbf e}_2\cdot\mathbf e_2=0$, $\dot{\mathbf e}_2\cdot\mathbf e_1=-\mathbf e_2\cdot\dot{\mathbf e}_1=-v/R$, and $\dot{\mathbf e}_3=\mathbf e_1\times\dot{\mathbf e}_2=k\,\mathbf e_1\times\mathbf e_3=-k\,\mathbf e_2$. These hold as identities between Laurent polynomials because they hold for all real $T$.

Suppose $\mathbf e_3$ is not constant. Then $\dot{\mathbf e}_3\ne\mathbf 0$, so $k\ne0$, and $\deg\mathbf e_3=\deg\dot{\mathbf e}_3=\deg k+M$. In the second equation the left side $\dot{\mathbf e}_2+(v/R)\mathbf e_1$ has degree at most $M$, and the right side has degree $\deg k+\deg\mathbf e_3=2\deg k+M$. Hence $\deg k\le0$, so $\deg k=0$: $k$ is constant. If $\mathbf e_3$ is constant, the third equation gives $k\,\mathbf e_2=\mathbf 0$ and so $k=0$, again constant.

With $k$ constant, put $\mathbf D=k\,\mathbf e_1+(v/R)\,\mathbf e_3$. By (20.1), $\dot{\mathbf D}=k(v/R)\mathbf e_2-(v/R)k\,\mathbf e_2=\mathbf 0$, and $\mathbf D\times\mathbf e_1=(v/R)\mathbf e_2=\dot{\mathbf e}_1$. So $\dot{\mathbf X}=\mathbf D\times\mathbf X$ with a constant non-zero $\mathbf D$: the point turns uniformly about the fixed axis $\mathbf D$ at the rate $\lVert\mathbf D\rVert=\sqrt{k^2+v^2/R^2}$, on the circle of the sphere at axial distance $v/\lVert\mathbf D\rVert$. Such a motion has only the frequencies $0$ and $\pm\lVert\mathbf D\rVert$, and since the degree is $M$, $\lVert\mathbf D\rVert=M\omega$. $\square$

**What was checked and completed.** The proposal's steps hold as stated. Two points were made explicit: the degree of $\mathbf e_2$ is exactly $M$ because $M\ge1$; and "constant $k$ at constant speed on a sphere means a circle" is proved here by the constant vector $\mathbf D$ instead of being quoted. The leading coefficient of $\mathbf e_1\times\mathbf e_2$ vanishes, being proportional to $\mathbf x_M\times\mathbf x_M$, so $\deg\mathbf e_3\le2M-1$; the proof does not need this. The hypothesis $v>0$ excludes the constant curve, which satisfies the sphere and speed conditions trivially with $v=0$.

> Claim grade: derived (two readers; not independently reviewed). Numerical test, known case first: a doubly traversed tilted small circle at degree three has defect $8\times10^{-17}$, constant $k$ to $1.3\times10^{-15}$ and constant $\mathbf D$ to $1.9\times10^{-14}$, and is recovered from a $5\,\%$ perturbed start with $k$ constant to $1.3\times10^{-9}$; the tennis-ball seam curve, which lies on the sphere with three harmonics but is not equal-speed, has speed spread $0.24$ and $k$ variation $4.1$, so the test can tell a non-circle; the analytic Jacobian agrees with central differences to $2.7\times10^{-10}$. Targets: least-squares minimization of the sphere and speed defects from $120$ random coefficient sets at each of $M=2,3,4$. The finals are: the degenerate constant curve ($29$, $26$, $38$ starts); finals with defect below $10^{-12}$ ($91$, $94$, $46$ starts); and, for $M=4$ only, $10$ finals with defects between $10^{-12}$ and $10^{-9}$ that were still descending at the evaluation cap and $26$ finals with defects above $10^{-7}$. The finals with defect below $10^{-12}$ are all circles, traversed one to $M$ times, great and small, with the amplitude of every harmonic other than the dominant one at most $5.2\times10^{-8}$, $1.8\times10^{-6}$ and $4.5\times10^{-5}$ and relative variation of $k$ at most $7.8\times10^{-8}$, $1.8\times10^{-3}$ and $1.2\times10^{-3}$. These deviations are not at rounding level, for a reason that matters below: the defect is quadratically flat in some directions (for a great circle, a small out-of-plane harmonic of amplitude $\delta$ changes $\lVert\mathbf X\rVert^2$ and $\lVert\dot{\mathbf X}\rVert^2$ only at order $\delta^2$), so the minimizer approaches the circles slowly and a defect of $10^{-12}$ still allows $\delta$ near $10^{-6}$. For $M=2$ and $M=3$ every non-degenerate final is such a circle. For $M=4$ the statement rests on the $46$ converged finals: the $10$ still-descending finals include curves whose non-dominant harmonics are as large as $0.10$ at defects near $10^{-9}$, and they were not followed to convergence (an attempt to follow them was stopped for time at 23:49Z with nothing written), so they are neither confirmations nor counterexamples; where they end is not measured. Falsifier: a real vector trigonometric polynomial of finite degree with constant norm and constant non-zero speed that is not a uniformly traversed circle.

### 20.2 Corollary for six members and for the collocation instrument

**Corollary 20.2.** Let six members with polarities $\pm1$ move on one sphere of radius $R$ about the origin, each at the same constant speed $v>0$, with no collision at any real time, and let every member's position be a real vector trigonometric polynomial in $e^{i\omega T}$ for one fundamental rate $\omega$, of any finite non-zero degree, the degrees possibly different. If the history satisfies the instantaneous Weber comparison law with $K>0$, $c_f>0$ at every time, it is a rigid rotation: one angular velocity vector, the members on one latitude circle or a mirror pair of latitude circles, and the rigid inverse-square balance.

*Proof.* By Lemma 20.1 every member moves uniformly on a circle of the sphere, member $i$ at the rate $M_i\omega$ with $M_i$ its degree; the speeds are equal by hypothesis. This is a history of the uniform-circle class of Section 16, and the uniform-circle theorem (Theorem 18.3 of this document) applies. $\square$

**Which parts of Sections 16 to 18 the corollary uses.** The rates are integer multiples of one fundamental, so every radius ratio is rational, $a_i/a_j=M_j/M_i$, and the irrational case (Lemma 17.2 and Corollary 17.3) is not needed. What is needed: the general lemmas 16.1 to 16.5; parallel axes (Lemma 16.6); equal radii (Lemmas 16.7 and 16.8); ratios with odd sum (Lemma 16.6a); the ratio $3:1$ (Lemma 17.4); and, only when two degrees are in a ratio of coprime odd integers with larger term at least five, Lemma 17.1 with Lemmas 18.1 and 18.2. For degrees up to four, the only ratios are $1:1$, $2:1$, $3:1$, $3:2$, $4:1$ and $4:3$, so the corollary then rests on Section 16 and Lemma 17.4 alone. The grade is inherited accordingly: derived and independently confirmed where all members have equal degree or parallel axes; derived, with one independent reading of each step (and an independent re-derivation of the $3:1$ case), otherwise.

**Consequence for the multi-curve collocation instrument.** That instrument represents each member by finitely many harmonics of one fundamental rate and, in its second stage, asks for the law together with the sphere and equal-speed conditions. By Corollary 20.2, at every finite number of harmonics the exact solution set of that second stage contains only rigid rotations at equal speed on the sphere. A non-rigid equal-speed spherical solution of the law, if one exists, is not a trigonometric polynomial: in that instrument it can appear only as a residual that decreases as the number of harmonics grows, never as an exact zero. Two practical points follow. First, a floor that does not fall when harmonics are added is the meaningful numerical signal of absence, and a floor measured at one fixed number of harmonics, such as three, bounds only the neighbourhood of the uniform-circle class. Second, because the sphere and speed defects are quadratically flat near circles, acceptance tolerances of $10^{-8}$ on those two residuals admit curves that differ from circles at the level of $10^{-4}$; near a candidate the motion residual, not the sphere and speed residuals, carries the information. This turns the observation recorded as "inferred" in Section 7 of the [collocation adjudication](weber-binding-sphere-multicurve-adjudication.md) into a derived statement for every number of harmonics; that file is not edited.

> Claim grade: Corollary 20.2 inherits the grade of the uniform-circle theorem as stated above; the consequence for the instrument is derived from the corollary. Falsifier: an exact second-stage solution of the collocation system, at any number of harmonics, that is collision-free and is not a rigid rotation, confirmed on a fine grid by an independent evaluation.

### 20.3 Validation record of this section

Command `../../../../../../.venv/bin/python -u weber-binding-sphere-gc-fh-checks.py` in `braid-program/evidence/`. Runs (UTC, 2026-10-06): 23:33:29, stopped at the known case because the recovery tolerance assumed fast convergence, which the flat directions prevent; 23:33:54, a version with repeated restarts per start that was too slow, moved to the background by the tool's time limit and killed at 23:38 with nothing written; 23:38:57, complete run with a capped solver; 23:40:19, final run with one polishing solve for near-zeros, $112$ s, which produced the receipt. Known case first in every run.

## 21. Notes after the falsifier search, the review of Section 20 and the second reading (Principal Investigator, 2026-10-07T23:44:46Z)

Status: dated notes by the Principal Investigator, written at the operator's request after the deriving lane had closed. Sections 1 to 20 are unchanged. They answer the three points left pending in the [continuation synthesis](weber-binding-sphere-continuation-2026-10-06.md), Section 9: remarks E6 and E7 of the [independent review](weber-binding-sphere-great-circle-closure-review.md) and the correction of presentation requested by the [second reading](weber-binding-sphere-great-circle-closure-second-reading.md). None changes a statement or a proof.

**Note E6 (scope of the uniform-circle theorem; the reviewer's estimate corrected).** Accepted as to scope. The uniform-circle theorem concerns exact solutions: histories in which every member moves uniformly on a circle of positive radius and the law holds at every time. It says nothing about how small a residual a non-rigid history of the class can have. A reader running a search will meet one family of non-rigid states with moderate residual: a coaxial composite of two rigid rings that are each balanced by themselves at the common speed $v$, a diametrically opposite unlike pair on a circle of radius $K/(4v^2)$ and an alternating square on a circle of radius $(2\sqrt2-1)K/(4v^2)$. The reviewer's falsifier search ended on such a state 94 times, at residual $0.230$ in units of $v^2/R$ on its lower radius bound, and estimated without measuring that the residual falls to zero as the circles shrink. That estimate does not hold for this law. A check by the Principal Investigator ([script](../evidence/weber-binding-sphere-pi-composite-check.mjs), full solve by the validated overnight instrument imported unmodified, known cases recorded first: hexagon $5.6\times10^{-16}$, the pair alone on a small circle $4.4\times10^{-16}$, the square alone $7.0\times10^{-16}$, the pair at $1.1$ times its rate $0.048$) evaluated the composite with the two rings on opposite caps of the unit sphere at speeds from $1.0057$ to $8$, over three cycles of their relative phase. The largest acceleration mismatch divided by $v^2/R$ is $0.2735$, $0.2116$, $0.1969$, $0.1899$, $0.1880$, $0.1877$ and $0.1877$ at $v=1.0057$, $1.25$, $1.5$, $2$, $3$, $5$ and $8$: it falls to a plateau near $0.188$ and not to zero, while the mismatch itself grows like $v^2$. The reason is in the law: the relative-motion terms of the bracket grow like $v^2/c_f^2$, so the influence of one ring on the other, at fixed separation $2R$, grows as fast as the normalizing acceleration. With both rings on one cap the residual is larger still and grows as they approach (from $5.0$ at $v=1.0057$ to $206$ at $v=8$). So the composite is not a near-solution at any scale, and the search floor of $0.23$ is of the size this family has everywhere, not an artefact of the radius bound.

> Claim grade: the scope statement is derived (it restates the hypotheses of the theorem). The plateau is measured, by the script above on the seven speeds and two placements listed, for exactly self-balanced rings with equally spaced members; the explanation by the growth of the bracket is inferred. Falsifier: a rerun of the script whose opposite-cap value at $v=8$ is below $0.1$.

**Note E7 (the finite-harmonic lemma holds for arbitrary real frequencies).** Accepted, and checked by the Principal Investigator as a second reader. The proof of Lemma 20.1 uses two properties of the largest exponent only: for a scalar and a vector sum, neither zero, the largest frequency of the product is the sum of the largest frequencies, because the product of the two leading coefficients is a non-zero vector; and differentiation keeps a non-zero largest frequency. Both hold for finite sums $\sum_\lambda\mathbf x_\lambda e^{i\lambda T}$ over arbitrary real $\lambda$, and a real-valued sum has a symmetric spectrum, so a largest frequency of zero means a constant. Hence a finite real trigonometric sum with any frequencies, of constant norm and constant non-zero speed, is a uniformly traversed circle. Corollary 20.2 is stated for one fundamental and is unchanged; the same statement for members with incommensurate finite spectra would rest in addition on Corollary 17.3, the irrational-ratio case.

> Claim grade: derived, with two readers (the reviewer and the Principal Investigator). Falsifier: a non-circular finite real trigonometric sum of constant norm and constant non-zero speed.

**Note on Lemma 18.1 (the second reading's correction of presentation).** This is the point already accepted as Note E3 in Section 19, now in the explicit form the second reader gave. With the phases of Section 17.2, $z_1=e^{i\phi_i}\zeta^r$ and $z_2=e^{i\phi_j}\zeta^s$, the substitution in the last step of the proof reads $X=e^{i\phi_i}/z_1$, $Y=e^{i\phi_j}/z_2$, and the leading coefficient is $d_{r+s}=p_{11}e^{i(\phi_i+\phi_j)}$. The conclusion is unaffected, because Lemma 17.1 is invariant under multiplication of $z_1$ and $z_2$ by constants of modulus one: its proof compares only the moduli of the coefficients and the value of $p_{00}$. Equivalently the phases may be absorbed into $\mathbf b_i$ and $\mathbf b_j$ from the start.

## 15. Run record (append-only)

- 2026-10-06T21:59:11Z: lane started; read AGENTS.md, the operator explanation standard, the preregistration Sections 1, 8 and 11, and the independent reference Sections 1, 3, 15, 17 and 18 with the post-freeze note. No file of the other lane was read.
- 2026-10-06T22:04Z: derivation on paper. Route A examined first. Finding: the loop about a complex collision time removes the whole class contribution, not only its leading part (Lemma 6.3); the class identity reduces to two chord identities (Lemma 7.1); a class of two is excluded by the line-and-sphere argument (Lemma 8.1). An intermediate version of the chord identities with exponents $+\tfrac12$ and $-\tfrac12$ was a slip in collecting powers of $A$ and was corrected to $-\tfrac12$ and $-\tfrac32$ before any numerical check; the check of (7.1) and of the Fourier coefficients confirms the corrected form.
- 2026-10-06T22:06:08Z: evaluator library written. 22:07:58Z to 22:13:55Z: check script written, extended and invoked seven times (six complete runs) as listed in Section 13; known cases passed first in every run.
- 2026-10-06T22:12Z: Lemma 8.2 (one member per oriented circle) noticed while preparing the same-circle check; it shortens the count to "four circles of two need eight members" and makes the partition-by-partition arguments a cross-check.
- 2026-10-06T22:18:16Z: first complete draft of this file written.
- 2026-10-06T22:19Z to 22:22:46Z: Lemma 8.3 added (for polarities $\pm1$ a class needs two partners of each polarity product), which extends the by-product of Remark 10.3 from eight to nine members and replaces the earlier eight-member argument of that remark. Check 6 added. Its first version hung because a partner and its mirror image always collide with each other; the hung run was stopped with nothing written, the construction replaced, and the final run at 22:22:43Z produced the receipt. The mirror-image fact is now stated in Section 8.
- 2026-10-06T22:26:35Z: derivation freeze. Evidence files, `shasum -a 256` in `braid-program/evidence/`:

```
d8dbd90d3515f6a6925f859fb232a3a3f71d9b590d5e81da4bae1acb02fdf67b  weber-binding-sphere-gc-lib.mjs
8ed0b50df9e1ca3391dab880ca5e7381e278277171ca479b6ad5bf6817e18642  weber-binding-sphere-gc-checks.mjs
076214c075c2f815b5b738de094519fb81b65e9ec54a79f4e9233a7a0990f1d1  weber-binding-sphere-gc-checks.json
```

- 2026-10-06T22:26:35Z: document hash before the freeze entry above was appended: 3ceb51afeb6825b39a84c782ebdd96cdda4944a92a043e1724c7aad77101db03. The lane reports to the Principal Investigator and stops; nothing is left running.
- 2026-10-06T22:29:05Z: the freeze entry of 22:26:35Z is superseded before any report was sent. Reason: the next-order (identity (II)) defect on the constructed coincident pairs, which the launch asked to be tested, had not been computed; it was added to check 3(b), the script was rerun at 22:27:11Z (all earlier numbers unchanged), and the check 3 paragraph and the run list of Section 13 were updated accordingly. No statement or proof changed. Final evidence hashes, `shasum -a 256` in `braid-program/evidence/`:

```
d8dbd90d3515f6a6925f859fb232a3a3f71d9b590d5e81da4bae1acb02fdf67b  weber-binding-sphere-gc-lib.mjs
506ced6003390df00b3f7a19b4f729386bbaa5e72a569e3fcd7a954faf754198  weber-binding-sphere-gc-checks.mjs
c1be7b4a086b3c7b4d1b8d4769be2d0ca45b67c4ec95f1878d3f964ba4d3ea72  weber-binding-sphere-gc-checks.json
```

- 2026-10-06T22:29:05Z: final derivation freeze. Document hash before this superseding entry was appended: 635f29c818c935902d6f89f51d8b23a03910ec8f565d5169579a4fafe326ad5c. The lane reports to the Principal Investigator and stops; nothing is left running.
- 2026-10-06T22:33Z: Principal Investigator's extension assignment received after the report of the 22:29:05Z freeze: carry the method to the uniform-circle class, append below a marker, leave the frozen text unchanged. The frozen text above the marker "Extension (after the 22:29:05Z freeze)" is byte-identical to the frozen version up to the start of the run record (checked by hash of that prefix before and after the insertion).
- 2026-10-06T22:34Z to 22:40Z: derivation. Proposals (1) and (2) verified (Lemmas 16.1 to 16.3); the consequences of (3) verified, with the ruling statement confirmed at simple zeros only (Section 16.5); non-constant perfect squares without collision found to exist for equal radii, exactly the mirror pairs (Lemma 16.7), and excluded from solutions by a pole argument (Lemma 16.8); for unequal radii about non-parallel axes the question is open except for odd-sum commensurate ratios (Lemma 16.6a), and is carried as hypothesis (H). The count of (4) closes for six under (H): the case {2,2,2} left by counting alone is excluded because the two members of a diametral pair have opposite top coefficients (Step 5 of Theorem 16.9).
- 2026-10-06T22:40:46Z and 22:42:34Z: extension check script run twice as listed in Section 16.7; a first expectation of a pole of order three for a mirror pair was wrong (measured order two, because the chord vanishes with the separation) and was corrected in the derivation before anything was written here.
- 2026-10-06T22:47:37Z: final run of the extension checks with check E5 added for Lemma 16.6a (100 commensurate pairs at ratios 2:1, 3:2, 4:1, 3:1, 5:3: top coefficient against (a_i a_j / 2)(1 - n_i.n_j) to 7.4e-12, higher harmonics below 4.0e-11 of it); checks E1 to E4 unchanged; receipt `startedUTC` 22:47:41, `finishedUTC` 22:47:51.
- 2026-10-06T22:48:48Z: extension freeze. Evidence files of the extension, `shasum -a 256` in `braid-program/evidence/` (the three files of the 22:29:05Z freeze are unchanged):

```
52fc9139c4856a1d30224a04204868f24ee66de5bf2b05335ea76ee2348f231d  weber-binding-sphere-gc-ext-checks.mjs
9ada4b1289c44fcb06a1f34a0729daf7cdb4381b2bfb1756b3c2b9a70f1c9ed1  weber-binding-sphere-gc-ext-checks.json
```

- 2026-10-06T22:48:48Z: document hash before this extension-freeze entry was appended: fc936706a6ec20bf25935ef61653f22d1b6da79dd6edf8f1f651a554f9b41fa1. Nothing is left running.
- 2026-10-06T22:50Z: Principal Investigator's assignment received after the report of the extension freeze: shrink or close the residual set of Theorem 16.9 in a new Section 17, Sections 1 to 16 unchanged (checked by hash of the text preceding Section 17 before and after insertion; Section 17 is placed after Section 16 and before this run record).
- 2026-10-06T22:51Z to 23:01Z: derivation. The coefficient comparison of Lemma 17.1 shows the two-variable polynomial is never a square for non-parallel axes, which is the stronger alternative named in the assignment; with the tangency argument of Lemma 17.2 (proposal Step 1, verified with a divisibility argument in place of "invariant component") the irrational case closes without Ritt's theorem and without a margin hypothesis; proposal Step 2 is not needed. For 3:1 the five coefficient equations were reduced by hand to one polynomial condition; a scratch solve at 22:53Z had already located the single solution and shown that it collides.
- 2026-10-06T22:56:14Z to 23:03:24Z: residual-set check script run four times as listed in Section 17.6 (one stopped in the symbolic step, three complete); known case first in every run.
- 2026-10-06T23:03:48Z: freeze of Section 17. Evidence files of this section, `shasum -a 256` in `braid-program/evidence/` (all earlier evidence files unchanged):

```
0b464cada824936cf00800a188bb8a760364da49af0a7cdfb6ea07555c6dcca9  weber-binding-sphere-gc-res-checks.py
0a72381e34557a1a03ad779c07e83ca64177f9cc5b7199560cce62e855a66204  weber-binding-sphere-gc-res-checks.json
```

- 2026-10-06T23:03:48Z: document hash before this freeze entry was appended: b59c716f886ec6cf77b692ed6f98d233920cbe408a07dd635eb6e2eef56e1597. No process of this lane is running.
- 2026-10-06T23:05Z: Principal Investigator's assignment received after the report of the Section 17 freeze: a Section 18 with (A) the response to the independent review of Sections 1 to 14 and (B) an attempt on the remaining residual set; Sections 1 to 17 unchanged (checked by hash of the text preceding Section 18 before and after insertion).
- 2026-10-06T23:05Z to 23:11Z: Part A: all four corrections and the strengthening accepted after checking the argument; the great-circle theorem's range becomes N <= 9 for any non-zero real polarities. Part B: the sparsity argument closes every coprime odd ratio with smaller term at least three in general (Lemma 18.1, reduction to Lemma 17.1); for ratios r:1 the symmetry of the root together with the three-term recurrence of the Taylor coefficients gives the two conditions (P1) and (P2), which are incompatible for every odd r >= 5 (Lemma 18.2). Hypothesis (H') is therefore discharged and the uniform-circle statement is unconditional (Theorem 18.3).
- 2026-10-06T23:08:24Z and 23:10:42Z: check script of Section 18 run twice as listed in Section 18.3; known case first.
- 2026-10-06T23:12:42Z: freeze of Section 18. Evidence files of this section, `shasum -a 256` in `braid-program/evidence/` (all earlier evidence files unchanged):

```
4682e6fc04abd9e19f0b220134a199a57eb9a1e7a83a3fd94dd93eaf68d8db62  weber-binding-sphere-gc-res2-checks.py
dd88acea852eaf693b377c72e622f0d21ab2ca7627fcb4e19bc36fad24365a6a  weber-binding-sphere-gc-res2-checks.json
```

- 2026-10-06T23:12:42Z: document hash before this freeze entry was appended: 5ffe7ba1971b7dd4854497d937216c59408bd36215cf408d4d72065538400a48. No process of this lane is running.
- 2026-10-06T23:30:25Z: Section 19 added before this run record at the Principal Investigator's relay of the independent review of Sections 16 to 18: five remarks accepted, the name "the uniform-circle theorem" adopted for Theorem 18.3 of this document. Sections 1 to 18 unchanged (hash of the text preceding Section 19, before and after insertion: 9f87d8d49ad24634). No evidence file changed. Document hash before this entry was appended: 0c0618fd591699b2ff926a132ae922f7ef032fd26317abd5e0f6b822d8c3f881.
- 2026-10-06T23:33Z to 2026-10-06T23:43:23Z: Section 20 added before this run record at the Principal Investigator's assignment: the finite-harmonic lemma (proposed by the Principal Investigator, checked and completed here), its corollary and the consequence for the collocation instrument. Sections 1 to 19 unchanged (hash of the text preceding Section 20, before and after insertion: ab75af4749fb6b28). Check script run four times as listed in Section 20.3. Evidence files, `shasum -a 256` in `braid-program/evidence/` (all earlier evidence files unchanged):

```
c03837330fa612cd549c5f5b2f356a9f30a8cebb97608fca85fc4bc736764248  weber-binding-sphere-gc-fh-checks.py
80eb4b2d9bba1b1b5591d52a26157b535d9cf018de24ce8a762030d35abe77c9  weber-binding-sphere-gc-fh-checks.json
```

- 2026-10-06T23:43:23Z: freeze of Section 20. Document hash before this entry was appended: b6f6f2b5ba74f85841a2ed85d8f00dd65f3fa0284059712ed4ee371897c74a81. No process of this lane is running.
- 2026-10-06T23:49:06Z: correction to Section 20 before the report was sent: its claim block had omitted the ten finals at M = 4 that were still descending (defects between 1e-12 and 1e-9) and had said that no final with small defect is far from a circle, which the receipt does not support for those ten; the block now states them and that they were not followed to convergence. The heading time was corrected. A fifth run that tried to follow them was moved to the background by the tool's time limit and killed at 23:49Z; the script was restored to the frozen bytes (hash checked) and the receipt is that of the 23:40:19Z run. The lemma's proof does not depend on the numerical test. Document hash before this entry was appended: 4e71b53c9c40da3b4a1a2228c6aab446ecec373df94d407740a3fa5a0e1e8a3f. No process of this lane is running.
- 2026-10-07T23:44:46Z: Section 21 added by the Principal Investigator at the operator's request, after this lane had closed: notes E6 (scope, with the reviewer's shrinking-residual estimate corrected by a measurement), E7 and the second reading's presentation point on Lemma 18.1. Sections 1 to 20 unchanged; SHA-256 of the text preceding the run-record heading before the insertion: 1cda1f7726ac98d689af0a5270c450045eaf05dacf6259dc56bc9b64dd45c0a2.
