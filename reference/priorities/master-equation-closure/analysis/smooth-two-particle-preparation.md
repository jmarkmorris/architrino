# Preparation of the smooth two-target population control

## Result and scope

The exact supplied complete past of the smooth two-target control does not satisfy the unforced Master Equation before release. Two separate contradictions establish this result. First, the prescribed target pulse departs from an exactly stationary complete past even though the regular equation has the unique stationary continuation. Second, the pulse reaches environmental architrinos before release and gives them nonzero acceleration, while their supplied histories keep them stationary.

These contradictions concern the preparation of the input. They do not invalidate the accepted evolution beginning at release, because that initial-history problem explicitly supplies the earlier trajectories as data and imposes the equation on the future. The distinction matters physically: an admissible delayed input with a well-defined future is not yet a demonstrated history of a closed population obeying the same equation at all earlier times.

Claim grade: derived, provisional pending independent assessment. The derivations below retain the identical pulse, infinite alternating lattice, original eight-source block sum, normalized wake speed $c_f=1$ and full coupling range $0<g=G/\ell\le16$. No forcing law, additional primitive, regulator, replacement history class or preparation mechanism is adopted. The independently accepted continuation and separation results remain at their recorded fixed-input scopes.

## 1. The complete input and the equation being tested

There is one architrino at every anchor $\ell i$, where $i\in\mathbb Z^3$ and $\ell>0$. Its polarity is $\sigma_i=(-1)^{i_1+i_2+i_3}$, and $G=\kappa q_0^2>0$. The targets are the adjacent labels $E=\{0,e_1\}$. Use dimensionless time $t=T/\ell$ and displacement $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\ell i)/\ell$. The physical acceleration is $\mathbf y_i''(t)/\ell$.

The supplied histories through release at $t=0$ are

$$
\mathbf y_i(t)=
\begin{cases}
p(t-a)e_3,&i\in E,\\
0,&i\notin E,
\end{cases}
\qquad
a=-\frac{11}{8},
$$

where

$$
p(v)=
\begin{cases}
(-1+8v)v^4(1-4v)^4,&0<v<1/4,\\
0,&v\notin(0,1/4).
\end{cases}
$$

The two target pulses are identical and point along the third coordinate. Every environmental complete past is stationary. Before $t=a$ the whole population is stationary, and the pulse ends at $b=-9/8$. Its endpoint derivatives through third order vanish. These are the unchanged histories in the [accepted generated-feedback input](smooth-two-particle-generated-feedback-continuation.md#1-unchanged-input-and-the-new-causal-step), whose complete bounds include $\|\mathbf y_i\|\le\varepsilon=2^{-16}$ and speed at most $\nu=1/8192<1$.

For these complete pasts the [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), expressed in dimensionless variables, is

$$
\mathbf y_i''(t)=\mathcal A_i[\mathbf y](t),
\qquad
\mathcal A_i[\mathbf y](t)
=g\sum_{j\ne i}^{\mathrm{blocks}}
\sigma_i\sigma_j\frac{\mathbf K(\mathbf R_{ij})}{D_{ij}},
\qquad \mathbf K(\mathbf R)=\frac{\mathbf R}{\|\mathbf R\|^3},
$$

where the unique source time $s=s_{ij}(t)<t$ solves

$$
t-s=\|\mathbf R_{ij}\|,
\qquad
\mathbf R_{ij}=i-j+\mathbf y_i(t)-\mathbf y_j(s),
\qquad
D_{ij}=1-\frac{\mathbf R_{ij}}{\|\mathbf R_{ij}\|}\cdot\mathbf y_j'(s)>0.
$$

The source sum uses the original blocks $\{2n+\epsilon:\epsilon\in\{0,1\}^3\}$. The positive denominator follows from the complete speed bound. Every distinct-label channel has exactly one positive-delay root: the delay-minus-range residual increases at least at rate $1-\nu$, starts negative, and becomes positive toward the remote past. Self residuals obey $f_{ii,t}(\tau)\ge(1-\nu)\tau>0$, so there are no positive-delay self rows. The exact zero-delay diagonal remains unevaluated. Thus the preparation contradictions below do not arise from missing roots or from assigning a value at a singular root.

Define the dimensionless acceleration mismatch by

$$
\mathcal R_i(t)=\mathbf y_i''(t)-\mathcal A_i[\mathbf y](t).
$$

The corresponding physical mismatch is $\mathcal R_i/\ell$. A nonzero value disproves the assertion that this supplied history obeys the unforced equation at that event. It does not disprove the equation's ability to evolve other histories.

## 2. A target cannot initiate the prescribed pulse from the stationary past

During the entire prescribed pulse, write $t=a+v$ with $0\le v\le1/4$. Every distinct-label range is at least $1-2\varepsilon>1/4$. Therefore every source time in the target equation satisfies

$$
s=t-r\le a+\frac14-(1-2\varepsilon)<a.
$$

All received source positions and velocities consequently belong to the exactly stationary part of the supplied complete past. No disturbance emitted after pulse onset has had time to reach either target. The target's own positive-delay channel is empty by the complete speed bound.

The exact target equation reduces to the stationary-source receiver equation

$$
\mathbf y_i''(a+v)=g\mathbf S(\mathbf y_i(a+v)),
\qquad
\mathbf S(\mathbf y)
=\sum_{j\ne i}^{\mathrm{blocks}}
\sigma_i\sigma_j\mathbf K(i-j+\mathbf y),
\qquad i\in E.
$$

The accepted stationary-sum result makes $\mathbf S$ independent of the anchor label, locally continuously differentiable, and zero at $\mathbf y=0$. The [cubic displacement estimate](smooth-two-particle-pulse-continuation.md#2-the-stationary-reference-has-a-cubic-displacement-bound) also gives

$$
\|\mathbf S(\mathbf y)\|\le1400\|\mathbf y\|^3
\qquad\text{for }\|\mathbf y\|\le1/256.
$$

At onset the prescribed target has $\mathbf y_i(a)=\mathbf y_i'(a)=0$. The ordinary differential equation $\mathbf y''=g\mathbf S(\mathbf y)$ has the zero solution and local uniqueness at these data. Any regular solution with these data therefore remains zero on a positive interval after $a$. The supplied pulse instead has $p(v)<0$ for every $0<v<1/8$. It cannot be that unforced continuation.

This argument uses the verified stationary equilibrium and a regular receiver equation. It does not assume that a nonequilibrium configuration has zero acceleration, and it does not infer a universal uniqueness statement on singular or unrestricted infinite-history domains. For the exact supplied control, the known delay floor makes the reduction valid on the whole pulse interval.

### 2.1. A uniform quantitative mismatch at onset

The contradiction can be bounded without relying only on uniqueness. Direct differentiation of the exact pulse gives

$$
p''(v)=-12v^2(1-4v)^2C(v),
\qquad
C(v)=1-32v+288v^2-768v^3.
$$

For $0<v\le1/128$, one has $C(v)\ge1-32v\ge3/4$ because $288v^2-768v^3=96v^2(3-8v)>0$. Also $(1-4v)^2\ge(31/32)^2$, and

$$
12\cdot\frac34\left(\frac{31}{32}\right)^2
=\frac{8649}{1024}>8.
$$

Consequently $p''(v)<-8v^2$. On the same interval $|p(v)|\le v^4$, so for every $0<g\le16$,

$$
\|g\mathbf S(p(v)e_3)\|
\le22400v^{12}<v^2,
$$

where the last comparison follows from $22400<128^{10}$. The third component of the prescribed-minus-EOM mismatch therefore obeys

$$
\mathcal R_{i,3}(a+v)
=p''(v)-gS_3(p(v)e_3)<-7v^2,
\qquad i\in E,\quad 0<v\le1/128.
$$

In particular, at $T=\ell(-11/8+1/128)$ the physical third-component mismatch is less than $-7/(16384\ell)$. This is a nonzero residual of the unchanged law on the prescribed path, uniformly across the full accepted coupling interval. The pulse acceleration is second order in its onset offset, while the available stationary-background acceleration on the prescribed displacement is at most twelfth order; neither cancellation nor a delayed partner pulse can remove the mismatch there.

## 3. The stationary environmental past also violates the equation

The target contradiction already settles failure of an unforced preparation. A separate environmental event shows why imposing the target motion alone would not produce the exact supplied complete past.

Choose the environmental receiver $i=e_2=(0,1,0)$ and the exciting target source $j=0$. The receiver is stationary by the supplied history. Its polarity is negative and the source polarity is positive, so their product is $-1$. At pulse emission offset $v_*=1/16$, the exact target position and velocity are

$$
p_*=-\frac{81}{2^{25}},
\qquad
p_*'=-\frac{135}{2^{21}}.
$$

Let

$$
r_* =\sqrt{1+p_*^2},
\qquad
D_* =1+\frac{p_*p_*'}{r_*},
\qquad
t_*=-\frac{21}{16}+r_*.
$$

The emission time is $a+v_*=-21/16$. The source-to-receiver vector is $e_2-p_*e_3$, so $t_*-(a+v_*)=r_*$ is exactly the causal equation. The complete-root monotonicity established above makes this the unique source root, and the displayed $D_*$ is its canonical transmitter factor. Since $1<r_*<9/8$, the reception satisfies $-5/16<t_*<-3/16<0$: it occurs before release.

The other changed source, $e_1$, is at anchor distance $\sqrt2$ from this receiver. Its pulse does not begin reception until $\sqrt2-11/8>0$, by the monotone endpoint map and the zero pulse displacement at its endpoint. At $t_*$ that source therefore supplies its stationary row. Every other source is stationary. Subtracting the stationary row from source zero before using the zero stationary block sum gives the exact environmental acceleration

$$
\mathcal A_{e_2}[\mathbf y](t_*)
=-g\left[\frac{e_2-p_*e_3}{r_*^3D_*}-e_2\right].
$$

Its third component is

$$
\mathcal A_{e_2,3}[\mathbf y](t_*)
=\frac{gp_*}{r_*^3D_*}<0.
$$

The supplied environmental acceleration is zero. Thus its mismatch is positive and explicitly nonzero:

$$
\mathcal R_{e_2,3}(t_*)
=\frac{81g}{2^{25}r_*^3D_*}
>\frac{81g}{2^{26}}
>\frac g{2^{20}}.
$$

For the first strict inequality, the inherited pulse bounds imply $r_*<9/8$ and $D_*<9/8$, whence $r_*^3D_*<(9/8)^4=6561/4096<2$. The final inequality is $81>64$. Dividing by $\ell$ gives the physical acceleration mismatch. The bound is positive for every $g>0$, including all $0<g\le16$.

This residual does not result from omitting the infinite population. Its stationary contribution was retained and cancelled under the accepted block prescription; exactly one changing old source row remains at this event. Nor does it replace the environmental future by an approximation: it tests the environmental past that the control explicitly prescribes.

## 4. Smooth release and a lawful earlier preparation are different requirements

The [release adjudication](finite-perturbation-release-independent-adjudication.md) accepts the fixed histories as input for evolution beginning at $T=0$, including the exact acceleration and jerk matches needed for a globally $C^3$ join there. That statement imposes the EOM to the right of the release cut. It does not require that the supplied history obeyed the EOM to the left of the cut.

For this particular input, the distinction can be checked directly. All labels are at their anchors with zero derivatives at release. The old pulse at anchor distance one was received on $[-3/8,-1/8]$, entirely before zero. The next possible distance is $\sqrt2$, whose entry time is $\alpha=\sqrt2-11/8>0$. Consequently every source row sampled at release is stationary, the prescribed stationary block sum is zero, and its reception-time derivative is zero. The left acceleration and jerk are also zero. The cut matches are exact, even though the earlier mismatches proved above are nonzero.

Moving the starting cut back to pulse onset does not repair preparation. At $t=a$, the pulse's position and derivatives through third order are zero, so its instantaneous acceleration and jerk agree with the stationary equation at that single event. Those boundary equalities are necessary smooth-joining conditions; they do not permit an arbitrary right-hand trajectory. The unique regular unforced continuation of the stationary past remains stationary and differs from the prescribed pulse immediately afterwards.

More generally, any proposed preparation that retains an exactly stationary complete past up to a finite cut and then asks the same locally unique regular equation to produce this pulse spontaneously meets the same obstruction. The restricted local evolution result applies on the fixed lattice with its regular stationary sum and complete positive range and speed margins. This does not exclude a nonstationary history extending into the earlier past, or establish a uniqueness theorem beyond those regular assumptions. It excludes the exact compactly started disturbance from the exact stationary input used here.

## 5. What an added acceleration term would and would not mean

For a supplied history one can always write the identity

$$
\mathbf y_i''=\mathcal A_i[\mathbf y]+\mathcal R_i.
$$

Reading $\mathcal R_i/\ell$ as a hypothetical imposed acceleration would make that history satisfy an augmented equation by definition. It supplies no Architrino mechanism: the term is calculated from the trajectory one wished to impose. It is not an independently derived interaction, a conserved account, or a new physical law adopted in this analysis.

The environmental residual proves that imposing an acceleration only on the two targets would not retain the exact stationary environmental past. At least the receiver $e_2$ also requires a compensating nonzero input at the displayed event. Otherwise that receiver must move under the unchanged equation, and the resulting complete history differs from the supplied control.

The possible residual support before release is nevertheless finite for this exact input. Before pulse onset every row and trajectory is stationary. During the target pulse, only the two target trajectories have imposed displacement. Before $t=0$, changing pulse emissions can reach only receivers at anchor distance one from either target; all distance-$\sqrt2$ entries occur after zero. The two sets of six nearest neighbors have opposite lattice parity and are disjoint; together they contain both targets and ten environmental labels. Hence any such bookkeeping inputs before release are confined to those twelve labels. This support bound is not a preparation mechanism or a proof that a physically closed arrangement can supply those inputs.

If additional architrinos were proposed as an actual preparation apparatus, they would belong to the population and their trajectories would have to enter the same causal-root sums. Their contributions could not be represented merely by naming the residual. At least some of the presently stationary complete histories would change, and the full earlier coupled motion would need to be solved. Keeping the existing complete past exactly while claiming that an unrecorded apparatus generated it would conflict with the equation's dependence on the recorded history.

## 6. Consequences for a self-consistent preparation problem

A self-consistent preparation would specify an earlier admissible complete history, evolve every participating architrino with the unchanged Master Equation, and retain the resulting environmental response together with the target histories. It would need compatible starting data, the declared population sum, complete causal roots, regularity and continuation control. These are mathematical requirements on that preparation; they do not select a particular new input.

The exact control analyzed here cannot be recovered as an unforced complete history, because Sections 2 and 3 give explicit violations on its prescribed past. A different EOM-generated history might reach the same target positions and velocities at release, but those instantaneous data do not determine the same delayed future. Earlier environmental motion and emitted wakes remain part of the state sampled by subsequent causal roots. Existence of such an alternative preparation, and its relation to the accepted target separation, remain unproved.

The accepted control therefore retains a precise use: it demonstrates regular future evolution and a finite interval of separation for one specified admissible history input. It does not demonstrate that the stationary universe can create that input unaided, that only two imposed target motions physically suffice to prepare it, or that its separation behavior persists for a differently prepared history. The present result narrows that interpretation without changing the accepted input or its future proofs.

## Development, evidence and falsifiers

The operator explicitly requested examination of the preparation assumption. This analysis was authored as a bounded development task; it is not an independent adjudication. The scientific inputs are the canonical acceleration law, original population-history class, accepted release and next-feedback adjudications, and the first-response, pulse and generated-feedback subjects. Their initial byte identities were recorded with `shasum -a 256` in `.tmp/mec-008-signed-error/preparation/frozen-inputs.sha256`. No accepted subject, reference, canonical file or shared tracker is an edit target.

The displayed proofs use exact causal geometry, the accepted stationary-sum regularity and cubic bound, ordinary receiver uniqueness, and explicit evaluation of the unchanged pulse. Supplementary exact arithmetic checks and their preservation receipts are retained in the same scratch directory. They establish only the indicated algebraic comparisons and byte preservation, not independent mathematical acceptance or physical preparation.

Claim grade: measured for the following bounded checks. The author-created `arithmetic.mjs` first passed signed fraction operations, powers, reversed-order rejection, and evaluation and two derivatives of the known polynomial $1+2v+3v^2$ at $v=1/2$; the `known.txt` result was recorded and read before target use. Its `target` mode then passed the exact pulse values and displayed rational comparisons, as recorded in `arithmetic.txt`. The instrument uses BigInt fractions and is supplementary author verification. After the derivation, `shasum -a 256 -c` passed all seven entries in the scientific-input manifest, with the result retained in `input-preservation.txt`. A changed manifest entry or failed exact arithmetic assertion overturns the corresponding measured claim.

Checkable falsifiers are: a received source time during the pulse that is not earlier than $a$ despite the stated complete displacement bound; a missing positive root or self root contradicting the complete subunit-speed residual estimate; failure of the accepted stationary-sum hypotheses; a regular solution of $\mathbf y''=g\mathbf S(\mathbf y)$ departing from zero initial data despite local Lipschitz regularity; an error in the pulse derivative, rational values or residual signs; or an additional changing source row at the specified environmental event. A changed earlier history, population summation prescription or acceleration law defines another problem and does not refute these claims about the fixed control.
