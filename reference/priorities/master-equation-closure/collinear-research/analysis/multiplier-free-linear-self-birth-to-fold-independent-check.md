# Independent self-source evolution from birth to the partner fold

The self-source coordinate gives the corrected complete evolution after the first negative wake-speed crossing. Under a smooth complete incoming history, the local self-birth theorem extends to a finite subsequent contact: before contact both admitted acceleration contributions are negative, so the initially right-hand label keeps moving inward faster than wake speed. At contact two additional partner roots emerge with zero individual limiting acceleration. Their emission times lie before contact; they are not supplied by an invented postcontact history. Continuation from contact to the inherited partner fold is justified in the same root class when the stated monotonicity and regularity conditions hold. A sufficient explicit bound for that monotonicity is given below.

These are **derived conditional results**. This report was developed without consulting the forthcoming parent implementation or results. Its sources are the [selected complete linear law](multiplier-free-linear-delayed-comparison.md#preparation-and-complete-law), [local self-birth theorem](multiplier-free-linear-independent-check.md#local-coupled-continuation-through-a-transversal-self-birth), and [coupled inherited-fold theorem](multiplier-free-linear-partner-fold-independent-check.md). The prescribed held preparation, signed linear numerator, absolute transmitter weights, all admitted partner/self roots and $c_f=1$ remain selected. No new response or event law is introduced.

## Exact affine control and correction of the earlier contact coefficient

First check the local arrival calculation on a history with an already known exact answer. Set a contact time $T_3$, take $x(t)=v_c(t-T_3)$ on a neighborhood, and fix $v_c\neq\pm1$. For a partner root, let $\tau=T-S>0$, $\sigma=\operatorname{sgn}(d)$ and $d=x(T)+x(S)$. Direct substitution, before using this result on a nonaffine path, gives

$$
d=2x(T)-v_c\tau,\qquad \tau=\sigma d,\qquad
d_\sigma=\frac{2x(T)}{1+\sigma v_c},\qquad
\tau_\sigma=\frac{2\sigma x(T)}{1+\sigma v_c}.
$$

Substituting these values back into $d=x(T)+x(T-\tau)$ verifies the arrival identity exactly. Admission requires $\sigma d_\sigma>0$; an algebraic solution with the wrong sign is not a causal root. The exact row acceleration is

$$
A_{p,\sigma}=-\frac{2kx(T)}{(1+\sigma v_c)|1+\sigma v_c|}.
$$

For $-1<v_c<0$, incoming $x>0$ admits only $\sigma=+1$, giving $-2kx/(1+v_c)^2$; outgoing $x<0$ admits only $\sigma=-1$, giving $-2kx/(1-v_c)^2$. Both tend to zero at contact, but their first-order coefficients differ. The earlier independent report incorrectly used $d=2x/(1-\operatorname{sgn}(x)v_c)$ and the acceleration coefficient $-2kx/(1-v_c^2)$. Those formulas were incorrect. This affine substitution identifies the sign error and corrects the coefficient; zero limiting acceleration and regular subcritical passage remain valid. The correction must be carried into current consumers without altering protected historical evidence.

For $v_c<-1$, neither local affine partner root is admitted on the incoming side $x>0$. On the outgoing side $x<0$, both are admitted. Their source offsets are exactly

$$
S_\sigma-T_3=\frac{1-\sigma v_c}{1+\sigma v_c}(T-T_3)<0\quad(T>T_3).
$$

Both roots therefore sample the already known precontact path. Their acceleration sum is

$$
A_{p,+}+A_{p,-}=2kx\left[(1+v_c)^{-2}-(1-v_c)^{-2}\right],
$$

which is negative for $x<0$ and $v_c<-1$. The positive-distance row accelerates inward, the negative-distance row brakes; their leading local sum is inward. This is a known affine geometric control, not an affine solution of the full delayed equation. Older partner and self roots are outside that local control and are included in the actual evolution.

## Self-source coordinate and full equation

Let the first negative wake-speed crossing be $t_c$, with $x_c=x(t_c)>0$, and assume the complete earlier history has $|v|<1$, a smooth left acceleration $-B<0$, and the regular surviving partner root required by the local self-birth theorem. Write $P(S)=S+x(S)$, $Q(S)=S-x(S)$, $P_c=P(t_c)$. The prebirth source map $P$ is strictly increasing. The postbirth branch has $v<-1$, so $P$ decreases and $Q$ increases.

The unique negative-displacement self root is $S_s=t_c-q$, $q>0$, determined by $P(T)=P(t_c-q)$. Define

$$
p(q)=1+v(t_c-q)>0,\qquad w=-(1+v(T))>0,\qquad y=w^2,\qquad x(T)=P(t_c-q)-T.
$$

Differentiating the exact self-arrival relation gives $T_q=p/w$. Since $w_T=-A_{\rm total}$, the complete dynamics are

$$
T_q=\frac{p(q)}{\sqrt y},\qquad y_q=-2p(q)A_{\rm total},\qquad v=-1-\sqrt y.
$$

The self contribution is exactly

$$
A_s=-k\frac{T-t_c+q}{p(q)}.
$$

The partner contribution is the sum over every admitted partner source, not merely the oldest root:

$$
A_{\rm total}=-k\sum_{\sigma=\pm1}\sum_{S\in\mathcal C_{p,\sigma}(T)}\frac{x(T)+x(S)}{|1+\sigma v(S)|}-k\frac{T-t_c+q}{p(q)}.
$$

Each root in that sum must satisfy $S<T$, $\sigma[x(T)+x(S)]>0$, and $P(S)=Q(T)$ for $\sigma=+1$ or $Q(S)=P(T)$ for $\sigma=-1$. The held tail is retained. The equation above is an exact coordinate change, not a reduced physical response or a speed cap.

For stable startup, set $z=(T-t_c)/q$, $W=w/q$, $L(q)=p(q)/q$, and let $H$ be the signed inward partner magnitude, so $A_p=-H$. In logarithmic source time $\eta=\log q$, the exact equations are

$$
z_\eta=\frac{L(q)}W-z,\qquad
W_\eta=\frac{H(T,x)L(q)+k(z+1)}W-W.
$$

At birth $L(0)=B$, $H(t_c,x_c)=B$. The unique finite-trace startup has $z_0=B/W_0$, $W_0^2=B^2+k(z_0+1)$, and right acceleration magnitude $b=W_0^2/B$. The existing contraction proof selects this solution; a freely chosen small-$q$ state does not automatically select the exact branch. A numerical launch at $q_0>0$ must record how its asymptotic startup error is controlled or refined.

## Complete root census before contact and finite contact result

Before contact $x>0$, hence $Q(T)<P(T)<P_c$. The increasing prebirth $P$ supplies exactly one positive-distance partner root. The decreasing postbirth sector has $P(S)>P(T)>Q(T)$ for $t_c<S<T$ and supplies none. Since the complete $Q$ is increasing and $P(T)>Q(T)$, there is no negative-distance partner root. There is exactly one self root on the prebirth increasing $P$ sector; the postbirth decreasing sector supplies only the excluded current diagonal, and increasing $Q$ supplies no earlier self root. The ledger is therefore one partner and one self root, with no root exclusion.

Both rows are negative: the partner distance is positive, while the self displacement is negative. Consequently $v'<0$ and $v<-1$ persists before contact. Position decreases faster than unit speed. If the exact postbirth solution starts at $x_c>0$, a finite contact satisfies $T_3-t_c\leq x_c$.

To justify this finite-contact claim rather than extrapolating a monotone numerical prefix, exclude a competing breakdown. Away from the initial birth neighborhood, $P(T)$ decreases by a positive amount below $P_c$, and $Q(T)<P(T)$ keeps the partner source away from the critical source $t_c$. The self source also lies a positive distance before $t_c$. While $0\leq x\leq x_c$ and $t_c\leq T\leq t_c+x_c$, their target clock values remain bounded. The complete held prebirth history then places both emission times in compact source intervals where their denominators are positive and bounded away from zero. Their delays and signed linear numerators are bounded. No additional root family is admitted by the preceding census. The acceleration is consequently bounded on compact intervals after the startup, and the regular equation continues until contact. This gives a finite contact with finite $v_c<-1$, conditional on the given exact first-birth history, rather than a numerical stopping inference.

At contact the self relation gives $T_3=P(t_c-q_3)<P_c$. Hence the contact occurs strictly before the inherited partner-fold clock level is reached. The old partner and self roots remain regular there. Their acceleration generally has a finite nonzero sum; zero limiting acceleration applies to the two newborn rows, not the entire supersonic contact ledger.

## Contact births and local coupled passage

For a nonaffine twice differentiable path with $v_c<-1$, the affine control gives the leading terms

$$
d_\sigma=\frac{2x(T)}{1+\sigma v_c}+o(|T-T_3|),\qquad
S_\sigma-T_3=\frac{1-\sigma v_c}{1+\sigma v_c}(T-T_3)+o(|T-T_3|).
$$

There are two new partner roots immediately after contact, both emitted before $T_3$. Their nonzero source denominators tend to $|1\pm v_c|$, their distances tend to zero, and their acceleration contributions tend to zero. The total acceleration joins continuously to the sum of the surviving old partner and self rows. No kick, prescribed reversal or residence interval is required.

For a short outgoing interval, the precontact source maps have nonzero slopes $1\pm v_c$ near contact. Their inverse maps determine the two new roots as locally Lipschitz functions of current receiver time and position. Their signed linear numerators vanish at the contact boundary. Extending those new contributions by zero on the incoming side gives locally Lipschitz terms because their magnitude is proportional to the distance from contact, with source denominators bounded away from zero. The surviving rows are regular. Integral contraction therefore gives a unique short coupled continuation using the already determined precontact source history. Its velocity stays below $-1$, so it enters $x<0$ without a prescription. Exactly at contact the zero-delay boundary roots are not admitted; the row counts describe the one-sided open intervals.

The ledger thus changes from one partner and one self root to three partner roots and one self root. These are two positive-distance partner roots on the increasing prebirth and decreasing postbirth $P$ sectors, one negative-distance partner root on increasing $Q$, and the prebirth self root. The newborn positive-distance branch later pairs with the old positive-distance branch at the inherited maximum; the negative-distance branch survives that fold.

## Source availability from contact to the inherited fold

If the outgoing branch keeps $v<-1$, then $P(T)<P(T_3)=T_3<Q(T)$. On the newly evolved interval $S>T_3$, $P(S)\leq T_3$ and $Q(S)\geq T_3$. The cross-map inequalities exclude both partner directions there, and the strict monotonicities exclude nontrivial self roots. All admitted emission times therefore belong to the known history through $T_3$. The source history must include the actually evolved birth-to-contact segment: using only the original prebirth history would omit the newborn partner branch.

Until $Q=P_c$, the two positive partner roots lie on either side of $t_c$ and before $T_3$; the negative partner root also lies before $T_3$; the self root remains before $t_c$. Away from the inherited maximum, these are regular source inverses. This is a complete method-of-steps continuation on a fixed, already determined history, with a four-root ledger. At $Q=P_c$ the two positive partner roots meet the piecewise-quadratic source maximum. The inherited-fold theorem then supplies the unique locally integrable transition to one partner and one self root, provided its regular-root and transversality hypotheses hold.

The assumption $v<-1$ through this interval must be checked rather than inherited merely from the earlier inward leg. The negative-distance partner row is positive, so the total acceleration has no automatic global negative sign from polarity alone.

A sufficient explicit certificate is available. Put $\Delta=P_c-T_3>0$. On the candidate tube $T_3\leq Q\leq P_c$ with $v<-1$, $Q'>2$ gives $T-T_3\leq\Delta/2$, while $-\Delta\leq x<0$. Since $P(T)$ decreases, its negative-partner target lies in $[T_3-\Delta,T_3]$. Let $S_{\min}=Q_{\rm past}^{-1}(T_3-\Delta)$ and let $m_Q>0$ be a lower bound for the precontact derivative $Q'_{\rm past}$ on the corresponding source interval through $T_3$. These quantities use the complete known past, including the held tail. The positive row satisfies

$$
0<A_{p,-}\leq M:=\frac{k(T_3+\Delta/2-S_{\min})}{m_Q}.
$$

Every other admitted row is negative. Thus $v'\leq M$. If

$$
v_c+M\Delta/2<-1,
$$

the branch cannot first reach $v=-1$ before $Q=P_c$: integrating the upper bound would contradict that equality. This is a bootstrap certificate for the desired monotone source class. It is sufficient, not necessary. Given it and the complete source regularity/gaps, ordinary continuation reaches the inherited fold in finite reception time and the coupled fold theorem applies. If this bound fails, the conclusion is unresolved; no cap or physical obstruction follows. A direct tighter analytical bound may replace this coarse sufficient estimate.

## Independent validation obligations and current grade

The affine substitution above is the first known-case control of the contact signs and coefficients. The existing self-birth contraction and unequal-curvature fold theorem are independent analytical references. A numerical subject should additionally pass its actual source-clock root enumeration on known monotone, two-root and held-tail cases before target use; verify the self identity $P(T)=P(t_c-q)$ and its differentiated equations; account for the contact birth of both new partner rows; and compare integrated acceleration with velocity change using a separately authored instrument.

Finite-$q$ startup error, interpolation across the acceleration jump at birth, source roots inside the evolved birth-to-contact segment, inactive source-sector gaps and the change of coordinate at the fold each carry separate evidence obligations. Step or startup refinement is numerical consistency, not a certified enclosure. One smooth source interpolation cell does not establish the exact unequal traces $B,b$. A finite trajectory computed from an approximate incoming prefix cannot certify the exact stationary release merely because its local event equations are correct.

| Interval/event | Derived geometry under stated hypotheses | Remaining application burden |
| --- | --- | --- |
| First birth to next contact | Complete one-partner/one-self evolution; inward acceleration; finite transverse supersonic contact before inherited fold | Exact first-birth incoming history and startup provenance |
| Contact | Two partner births with zero individual limiting acceleration; continuous total acceleration; unique short coupled passage | Complete old-root census and regular source neighborhoods |
| Contact to inherited fold | Complete three-partner/one-self method-of-steps equation; all sources before contact; finite fold approach if monotonicity certificate holds | Check $v<-1$ or the sufficient bound and all regular/inactive-sector margins |
| Inherited fold | Conditional unique coupled three-to-one partner transition with continuous velocity | Actual full-history hypotheses and unequal source-curvature application |

No forthcoming parent numerical result was used to fill an application gap. Falsifiers are explicit: an admitted local affine root with the wrong derived displacement sign; a missing newborn partner row after supersonic contact; an admitted postcontact source despite strict monotonicity and the cross-map gaps; a precontact breakdown with the given compact regular-root bounds; or failure of the $v<-1$ bootstrap while its verified sufficient inequality holds. Inspect all four clock families and complete source histories. A violated hypothesis limits application; it does not establish a new no-go.

Only this new report was written. Existing proofs, scripts, receipts and shared summaries were preserved; the parent coordinator was notified of the earlier contact-coefficient error for owning-scope repair. Source targets were checked by filesystem existence and whitespace by scoped `git diff --check`; those checks do not validate the mathematics.

## Supplied-history startup when interpolation traces differ

Subsequent implementation review identified a numerical distinction that the exact incoming-history theorem does not have: the supplied source interpolant can have left curvature $B_L=-x''(t_c-)>0$ different from the independently evaluated surviving partner magnitude $A_0=-A_p(t_c,x_c)>0$. A true incoming solution of the selected self-free law has $B_L=A_0$. Approximate prefix data need not have exact derivative consistency, and that mismatch must be exposed rather than silently called zero.

For this supplied history, the self-root geometry still gives $p(q)=B_Lq+O(q^2)$ and a future right acceleration trace $-b$ gives $S-t_c\sim-\sqrt{b/B_L}(T-t_c)$. The self row therefore tends to $-k(1/B_L+1/\sqrt{B_Lb})$. The correct right compatibility equation and logarithmic-coordinate fixed point are

$$
b=A_0+\frac{k}{B_L}+\frac{k}{\sqrt{B_Lb}},\qquad W_0^2=B_Lb=A_0B_L+k(z_0+1),\qquad z_0=\frac{B_L}{W_0}.
$$

This equation has a unique positive solution by the same increasing-left/decreasing-right argument. It exceeds $A_0+k/B_L$, but need not exceed $B_L$ for arbitrary inconsistent source data. Its Jacobian remains $\left(\begin{smallmatrix}-1&-B_L/W_0^2\\ k/W_0&-2\end{smallmatrix}\right)$, with negative trace and positive determinant, so the existing regular-singular contraction mechanism still selects a bounded supplied-history continuation. The two-sided source-fold coefficient uses $B_L,b$ for that supplied history; it does not identify them with exact selected-release traces.

Using the equality-case formula with $B_L$ substituted for both coefficients would start the numerical log system away from its actual limiting fixed point when $A_0\neq B_L$. Using both measured coefficients corrects that startup while preserving the full law. The exact-history theorem and its equal coefficients remain unchanged; no interpolation residual establishes failure of the selected physical equation.

An asymptotic source extension below a finite $q_0$ remains a separate approximation. With $T=t_c+z_0q$ and $w=W_0q$ there, $p(q)=B_Lq+O(q^2)$ gives $T_q-p/w=O(q)$ and corresponding local source-state consistency errors of order $q^2$. The bounded log-coordinate solution differs from its limiting fixed point by $O(q)$, so initializing at that fixed point at $q_0>0$ incurs $O(q_0)$ rescaled startup error. These statements are asymptotic grades under the stated source smoothness; actual error bounds or numerical convergence must be recorded separately. They do not certify the exact stationary release.
