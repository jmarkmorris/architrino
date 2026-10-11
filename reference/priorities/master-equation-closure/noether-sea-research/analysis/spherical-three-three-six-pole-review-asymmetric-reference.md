# Independent asymmetric six-pole reference

**Derived; awaiting separate adjudication.** In the selected fourth pattern, only the positive-x member takes the cap direction. It is strictly slower than the other five members throughout physical $0<T\le1/10$. The five unchanged members retain equal speed histories on this stationary-source interval. All six actual motions exist through $T=1/10$, with thirty ordinary partner roots, no positive-delay self root and strictly inward support. The former transitive full-history symmetry is absent; equality of the five speeds here follows instead from the exact static-source reduction.

## Exact target and recovery provenance

Retain the [six-pole plan](spherical-three-three-six-pole-plan.md): $K=c_f=1,R=10$, positive-pole positrinos, opposite-pole electrinos, and initial speed $1/2$. Only $\mathbf d_{P_x}$ changes from common rotation to the cap direction. The complete direction table is

| Label | Initial unit position | Unit direction |
| --- | --- | --- |
| $P_x$ | $\mathbf e_x$ | $(\mathbf e_y+\mathbf e_z)/\sqrt2$ |
| $P_y$ | $\mathbf e_y$ | $(\mathbf e_z-\mathbf e_x)/\sqrt2$ |
| $P_z$ | $\mathbf e_z$ | $(\mathbf e_x-\mathbf e_y)/\sqrt2$ |
| $E_x$ | $-\mathbf e_x$ | $(\mathbf e_z-\mathbf e_y)/\sqrt2$ |
| $E_y$ | $-\mathbf e_y$ | $(\mathbf e_x-\mathbf e_z)/\sqrt2$ |
| $E_z$ | $-\mathbf e_z$ | $(\mathbf e_y-\mathbf e_x)/\sqrt2$ |

Initial velocities are half these directions. Every pair in the table has tangent dot product zero and direction norm one. In particular the opposite-x electrino retains its common-rotation direction; it is not changed to a cap direction.

For every label the entire supplied past is $\mathbf X_i(10s)=10[\mathbf n_i\cos\theta(s)+\mathbf d_i\sin\theta(s)]$, with $\theta=0$ for $s\le-1/4$ and $\theta=s(1+4s)^3/2$ thereafter through zero. Positive time is actual generated motion. Canonical all-root transmitter weighting and normal support only remain selected; initial speed is not controlled later.

Analytical input controls are $(\mathbf e_x,\mathbf e_y)$ as a unit tangent pair, the radial choice $(\mathbf e_x,\mathbf e_x)$ as a rejected negative control, $\theta'(0)=1/2$, and $\theta(-1/8)=-1/128$, $\theta'(-1/8)=-1/8$. The exact preparation has $-1/8\le\theta'\le1/2$ and is $C^2$ at its stationary seam. These checks precede the asymmetric target reasoning and do not require an instrument.

The earlier bundle returned only `dispatch already finalized`, exit 1, and no assignment was acted upon. Recovery dispatch `f9e0660f-244b-44ae-a7b7-a1405b42b00f` was then admitted untruncated at 2026-10-10 22:38:17.203 UTC. Its 2760-byte payload hash is `53091fc9349b4e727cdea596bc96cb4e3cd7feb89ff41003b27374ac6471d417`; payload verification passed and provider transport verification remained false. The plan's SHA-256 `b66ecf15b903624c2007228f8613df59f52d40ae83378c6beee1c269da4b8b43` matched by `shasum -a 256` before writing. No new asymmetric peer subject has been read. All earlier reports and the failed delivery record remain preserved.

## Independent kernel and actual source domain

Use the named prior [independent six-pole derivation](spherical-three-three-six-pole-review-reference.md) for the static signed-pair kernel and Jacobian, and the [separate derivative reconstruction](spherical-three-three-six-pole-review-adjudication.md) for support derivatives. Their formulas concern each receiver's old-pole field and do not require transitive symmetry of this new history.

At release, emissions are $s=-\sqrt2$ for four partners and $s=-2$ for the opposite partner. They are stationary roots. Complete preparation speed below one makes them unique over the whole past; a positive-delay self root contradicts path length. The correct omitted-self field is

$$
\mathbf A_i(\mathbf x)=\sum_{j\ne i}\sigma_i\sigma_j\frac{\mathbf x-10\mathbf n_j}{|\mathbf x-10\mathbf n_j|^3}.
$$

Define $\mathbf b_{P_a}=(\mathbf e_b+\mathbf e_c)/\sqrt2$ and $\mathbf b_{E_a}=-\mathbf b_{P_a}$. At each pole,

$$
\mathbf A_i(0)=-\mathbf n_i/400-\mathbf b_i/100,\qquad
\mathbf B_i(0)=-\mathbf b_i/100,\qquad \lambda_i(0)=-9/400.
$$

Here $\mathbf B_i$ is the tangent projection. The field is independent of the velocity directions because every arriving source is still stationary, not because delayed histories can generally be ignored.

Reclose the actual short interval for the fourth pattern. In scaled time $t=T/10\le1/100$, bootstrap $2/5<u_i<3/5$. Receiver displacement is below $3/500$ in unit-radius coordinates. Every other old pole is at distance greater than $697/500>1$, so its candidate emission obeys $s<-173/125<-1/4$. The full history, including every released bootstrap segment, has speed below $3/5$. Strict causal monotonicity admits exactly these thirty partner roots and no additional moving-history roots. The self-root path-length exclusion still holds. Transmitter factors are one and receiver factors exceed $2/5$; current pair separation is greater than $\sqrt2-3/250$.

The dimensionless field has norm below five, so the exact sphere equation gives $|\mathbf y_i''|<43/50$. Integration yields $1/2-43/5000<u_i<1/2+43/5000$, strictly improving the bootstrap. Smooth constrained continuation therefore reaches physical $T=1/10$. The preparation-arrival margin is greater than $567/500$ in scaled source time. No recent preparation has arrived on this interval. This is actual local continuation, not prescribed interpolation.

The same independently derived radial-field variation estimate applies because it used only this distance and speed domain. It gives

$$
-12173/500000<\lambda_i<-10327/500000,
$$

and hence $-1/40<\lambda_i<-1/50<0$ for every member through $T=1/10$. There is no support zero in this admitted interval.

## First nonzero speed and support splitting

For $P_x$, $\mathbf d=\mathbf b$. For the other five, $\mathbf d\cdot\mathbf b=0$. The prior independently derived static-field Jacobian and actual normal acceleration give the physical right derivatives

$$
u_{P_x}'(0)=-1/100,\qquad u_{P_x}''(0)=1/16000,
$$
$$
u_j'(0)=0,\qquad u_j''(0)=21/80000\quad(j\ne P_x).
$$

Therefore, for any unchanged member,

$$
u_{P_x}(T)-u_j(T)=-T/100-T^2/10000+O(T^3).
$$

The first speed split is first order, with negative coefficient $-1/100$. It is not a stability statement or a linearization about an equilibrium. The actual release tangent acceleration is nonzero.

Support derivatives also distinguish the changed member:

$$
\lambda_{P_x}'(0)=3/4000,\qquad \lambda_j'(0)=0,
$$
$$
\lambda_i''(0)=-63/3200000\quad\text{for every }i.
$$

Thus $\lambda_{P_x}-\lambda_j=3T/4000+O(T^3)$ locally. This is an initial support difference, not a proof of its sign throughout the whole short interval. All supports remain inward there by the separate uniform enclosure.

## Quantitative speed splitting throughout the interval

The strict speed split can be established over all $0<T\le1/10$ without an uncontrolled Taylor remainder. On the just-proved domain, physical source distances exceed ten, so

$$
|\mathbf A|<1/20,\qquad \|D\mathbf A\|<1/100,\qquad 2/5<u<3/5.
$$

Let $\widehat{\mathbf v}=\mathbf v/u$. With $\mathbf B$ the tangent projection and normal acceleration $-u^2\mathbf n/10$,

$$
\widehat{\mathbf v}'=\frac{(I-\widehat{\mathbf v}\widehat{\mathbf v}^{T})\mathbf B}{u}-\frac{u\mathbf n}{10},
$$

so $|\widehat{\mathbf v}'|<1/8+3/50=37/200$. Since $u'=\widehat{\mathbf v}\cdot\mathbf A$ and the source field is exactly static,

$$
|u''|\le|\widehat{\mathbf v}'||\mathbf A|+\|D\mathbf A\||\mathbf v|
<37/4000+3/500=61/4000.
$$

For $D_j=u_{P_x}-u_j$, $D_j(0)=0$, $D_j'(0)=-1/100$ and $|D_j''|<61/2000$. Twice integrating gives the explicit enclosure

$$
-T/100-61T^2/4000<D_j(T)<-T/100+61T^2/4000<0
\qquad(0<T\le1/10).
$$

The final inequality follows because $61T/4000\le61/40000<1/100$. This proves the changed member remains slower throughout the actual interval. It does not require proving monotonic speed for each of the other members. The cap member itself keeps negative speed derivative here, since $u_{P_x}'<-1/100+61T/4000<0$.

## Symmetry boundary and equality of the five unchanged members

A transitive full-history symmetry would preserve every canonical release speed derivative. The unique value $-1/100$ at $P_x$, versus zero at the other five labels, already rules out such transitivity.

More explicitly, an orthogonal pole permutation with optional global polarity reversal preserving this full input must fix the uniquely cap-directed $P_x$. Therefore it cannot globally reverse polarity, and its spatial action is a coordinate permutation fixing x. The only nontrivial possibility exchanges y and z. That map sends the required rotation direction at $P_y$ to the negative of the required direction at $P_z$, so it fails the full-history test. Within this natural orthogonal pole/label symmetry class, only the identity remains.

Nevertheless the five unchanged receivers have exactly their common-rotation initial data and the same omitted-self stationary fields as the original common-rotation case. The changed receiver has exactly the cap-case initial data and corresponding field. Decoupling here is justified only because every source emission is in the old stationary past. Ordinary uniqueness therefore identifies each unchanged member's actual trajectory with its original common-rotation trajectory, and $P_x$ with its original cap trajectory, on the admitted interval. The original common-rotation transitive symmetry makes the five unchanged scalar speed and support histories identical. Thus the fourth pattern exhibits one-versus-five scalar splitting even though its own full history has no transitive symmetry. No equality after differing moving histories arrive is inferred.

## Controls, grade and preservation boundary

The result is derived from exact canonical kernels and local continuation inequalities, not measured numerical evolution. No new scientific instrument, numerical solver, process lease, job or additional agent is used. The vector and nonzero scalar-history controls, old-pole root census, omitted-self kernel, and explicit derivative bound are retained mathematical references for a future independent implementation. They do not constitute a machine interval certificate.

Falsifiers are an incorrect direction in the table, a changed scalar preparation coefficient, missed root or unavailable stationary source, failed strict continuation margin, an omitted normal term in direction differentiation, wrong time/radius factor, or failure of the displayed speed-difference bound. A future transitive-symmetry claim must preserve both position and direction histories; pole geometry alone cannot supply it.

Only this new reviewer reference and authorized recovery diagnostics are written. Earlier files and failed-delivery evidence remain unchanged. Issued commands are terminal without a global-idle assertion. Costs are unprofiled, local preservation is not backup/restore verification, and no EOM capability claim is made. New exploration stops 23:26:02 UTC; hard closeout remains 23:41:02 UTC October 10. Next dependency is separate adjudication and a frozen comparison target from the coordinator; no successor is self-selected.
