# Independent adjudication of smooth-control preparation

## Disposition and evidence boundary

**Accept the preparation result at its stated fixed-input scope.** The frozen [preparation subject](smooth-two-particle-preparation.md), SHA-256 `7ea24183390f966dabdd0ec8dc953dddbbaf9ce4c101eccd1443d45b883051d2`, correctly proves that the supplied smooth two-target complete past does not solve the unchanged unforced Master Equation before release. Its target mismatch and its separate environmental mismatch are exact nonzero residuals of that equation on the prescribed paths. Independent reconstruction found no required mathematical correction.

Claim grade: derived, conditional on the accepted complete input, canonical transmitter-weighted acceleration and stationary block-field regularity and cubic bound. The proof preserves $c_f=1$, the alternating unit-spaced lattice in dimensionless coordinates, the original eight-source block sum and the entire domain $0<g=G/\ell\le16$. The accepted forward evolution remains a theorem for prescribed complete pasts; preparation failure does not invalidate that initial-history problem or transfer its conclusions to another preparation.

The reviewer wrote an independent reconstruction before reading the subject, retained at `.tmp/mec-008-signed-error/independent-review/preparation-review.md`. That reconstruction proved a target residual below $-4v^2$ on $0<v\le1/64$ and exact nonzero early residuals at all ten nearest environmental labels. The subsequent frozen-subject review independently checked the author's stronger target inequality on the narrower interval and its explicit environmental event. The author's arithmetic and the separate signed-error contributors' instruments were not read or used as evidence. The independent reference is the direct algebra and causal geometry below.

| Claim | Disposition |
| --- | --- |
| Exactly the accepted pulse and complete history are tested | Accepted |
| One root per cross channel, no positive self roots and positive transmitter denominators on that history | Accepted at the stated complete-history scope |
| Target pulse is incompatible with unforced departure from the exact stationary past | Accepted within the regular uniqueness domain |
| Target third-component mismatch below $-7v^2$ for $0<v\le1/128$ | Accepted uniformly for $0<g\le16$ |
| Explicit negative-time environmental EOM acceleration and positive mismatch at $e_2$ | Accepted, including the displayed lower bound |
| Exact release acceleration and jerk matching can coexist with earlier mismatch | Accepted |
| Possible imposed-residual support confined to twelve labels before release | Accepted for this exact supplied history |
| Imposing target acceleration alone would retain the stationary environment | Rejected by the environmental residual; the subject makes no such claim |
| A lawful alternative preparation or its later separation behavior has been constructed | Not established |
| New actual forward separation sign beyond the accepted interval follows from preparation analysis | Not established |

No forcing mechanism, regulator, replacement population class or new primitive is accepted by this adjudication. The subject's hypothetical added acceleration is explicitly an identity defined from the mismatch, with no independent physical mechanism asserted.

## 1. Complete-history roots and the target source cutoff

Write $a=-11/8$, $t=T/\ell$ and $v=t-a$. The supplied target displacement is $p(v)e_3$, where $p(v)=(-1+8v)v^4(1-4v)^4$ on $0<v<1/4$ and zero elsewhere. The two target labels are $0,e_1$; all other supplied paths are stationary. Thus every path is stationary before $a$, and the pulse ends at $-9/8$. The supplied displacement bound is $\varepsilon=2^{-16}$ and the speed bound is $\nu=1/8192$.

For fixed reception time and positive delay, the complete-past Lipschitz bound implies

$$
f_{ij,t}(\tau_2)-f_{ij,t}(\tau_1)
\ge(1-\nu)(\tau_2-\tau_1)
\qquad(\tau_2>\tau_1),
$$

where $f=\tau-\|i-j+\mathbf y_i(t)-\mathbf y_j(t-\tau)\|$. Every cross residual starts negative because the range is at least $1-2\varepsilon$, and becomes positive toward the remote past because the supplied displacements are bounded. Hence there is exactly one positive cross root. At that root the transmitter denominator is at least $1-\nu>0$. A self residual is at least $(1-\nu)\tau$, so there is no positive-delay self row. The exact zero-delay diagonal is not assigned an acceleration.

At either target throughout the entire supplied pulse, $0\le v\le1/4$, every cross emission satisfies

$$
s=t-r\le a+1/4-(1-2\varepsilon)<a.
$$

Thus every received source is sampled on its stationary segment. The self channel is empty. The target's EOM acceleration on the prescribed path is therefore exactly $g\mathbf S(p(v)e_3)$, with $\mathbf S$ the same stationary block sum and its own source omitted. The moving receiver remains part of this expression; the argument does not discard its displacement or assume equilibrium away from the anchor.

The accepted sum has $\mathbf S(0)=0$ and is locally continuously differentiable. Its receiver ODE $\mathbf y''=g\mathbf S(\mathbf y)$ has a locally unique solution from zero position and velocity. The stationary path solves those data. The supplied pulse is negative for every $0<v<1/8$ and therefore cannot be that unforced continuation. This uniqueness use is restricted to the regular receiver domain justified by the delay floor; it asserts no unrestricted uniqueness for singular infinite-history evolutions.

## 2. Reconstruction of the quantitative target mismatch

The exact pulse derivative is

$$
p''(v)=-12v^2(1-4v)^2\left(1-32v+288v^2-768v^3\right).
$$

For $0<v\le1/128$, the last factor is at least $3/4$, since its last two terms equal $96v^2(3-8v)>0$. Also $1-4v\ge31/32$. It follows that

$$
p''(v)\le-\frac{8649}{1024}v^2<-8v^2,
\qquad \frac{8649}{1024}=9\left(\frac{31}{32}\right)^2.
$$

On the same interval $|p(v)|\le v^4<1/256$, so the accepted cubic stationary estimate supplies

$$
\|g\mathbf S(p(v)e_3)\|\le16\cdot1400v^{12}=22400v^{12}<v^2.
$$

The final strict inequality follows directly from $22400<128^{10}$ and $v\le1/128$. Writing $\mathcal R_i=\mathbf y_i''-\mathcal A_i[\mathbf y]$, its third component therefore satisfies

$$
\mathcal R_{i,3}(a+v)
=p''(v)-gS_3(p(v)e_3)<-7v^2,
\qquad i\in\{0,e_1\}.
$$

Dividing by $\ell$ gives the physical acceleration mismatch. At $v=1/128$, the displayed value below $-7/(16384\ell)$ follows because $128^2=16384$. This is a strict, uniform inequality across the full accepted coupling interval. The second-order prescribed acceleration cannot equal an EOM contribution bounded at twelfth order on that displacement.

The initial independent reconstruction reached the same contradiction on the larger interval $0<v\le1/64$ with the weaker residual $<-4v^2$. The frozen subject narrows the interval and increases the margin; its stronger statement is supported by the calculation above and does not rely on extending the broader-interval estimate.

## 3. Exact environmental mismatch before release

At $i=e_2$, the source $0$ has opposite polarity. For emission offset $v_*=1/16$, direct substitution gives

$$
p_*=-\frac12\left(\frac1{16}\right)^4\left(\frac34\right)^4
=-\frac{81}{2^{25}},
$$

$$
p_*'=-4\left(\frac1{16}\right)^3\left(\frac34\right)^3\left(\frac58\right)\left(\frac14\right)
=-\frac{135}{2^{21}}.
$$

The receiver is at its prescribed anchor. Consequently the exact range, transmitter factor and reception time are

$$
r_*=(1+p_*^2)^{1/2},
\qquad D_*=1+\frac{p_*p_*'}{r_*},
\qquad t_*=-21/16+r_*.
$$

Both $p_*$ and $p_*'$ are negative, so $D_*>1$. The accepted bounds give $1<r_*<9/8$ and $D_*<1+\nu<9/8$. Therefore $-5/16<t_*<-3/16<0$. The displayed emission/reception pair satisfies the causal equation exactly, and complete-root monotonicity makes that source root unique.

The receiver's distance to the other target is $\sqrt2$. Its old pulse first arrives at $\sqrt2-11/8>0$, because the endpoint displacement is zero and the arrival map has positive derivative. That target supplies a stationary row at $t_*$. Every other source is stationary as well. The full stationary block contribution cancels, leaving the exact source-zero correction

$$
\mathcal A_{e_2}(t_*)
=-g\left[\frac{e_2-p_*e_3}{r_*^3D_*}-e_2\right].
$$

Its third component is $gp_*/(r_*^3D_*)<0$. Since the prescribed environmental acceleration is zero, its mismatch is

$$
\mathcal R_{e_2,3}(t_*)
=\frac{81g}{2^{25}r_*^3D_*}
>\frac{81g}{2^{26}}
>\frac g{2^{20}}.
$$

The first inequality uses $r_*^3D_*<(9/8)^4=6561/4096<2$; the second uses $81>64$. All inequalities are strict for every $g>0$. The source polarity, stationary subtraction and sign of the third component are each retained. This proves the mismatch on the original complete history, without simulating a different preparation.

The earlier independent reconstruction also identifies the complete nearest environmental set. Each target has five environmental unit neighbors after the other target is excluded. The two sets have opposite lattice parity and are disjoint, giving ten labels. Their old-pulse supports are exactly $[-3/8,-1/8]$ by monotone endpoint arrival. Four have vertical source offset $\pm e_3$ and six are transverse. At a sufficiently early positive emission offset, $p,p'<0$: the four vertical EOM third accelerations are positive, and the six transverse third accelerations are negative. This independently corroborates the subject's narrower conclusion that at least $e_2$ cannot remain stationary if only the two target paths are imposed.

## 4. Release matching, finite residual support and interpretation

At release all supplied labels are at their anchors with zero velocity, acceleration and jerk. Every old unit-distance pulse finished reception at $-1/8$, while the next possible lattice distance, $\sqrt2$, has a positive entry time. The received source rows at zero and their time derivatives are therefore stationary. The block sum and its reception-time derivative vanish. This reproduces the accepted acceleration and jerk matching at the release cut.

Those equalities concern a join at one cut. They do not impose the EOM on the entire supplied left history. Likewise the pulse's zero jets at $a$ match the stationary equation at that event but do not make its nonzero right-hand path a solution. The quantitative residual and local uniqueness establish that distinction directly.

The subject's pre-release support bound also holds. Before pulse onset the supplied paths and all rows are stationary. During the imposed target pulse, a mismatch can occur at the two targets because their receiver positions and accelerations change. At stationary environmental receivers, an old pulse arriving before zero must come from a target at unit anchor distance; all larger distances are at least $\sqrt2$ and begin reception after zero. The two six-neighbor sets have opposite parity, are disjoint and contain both targets. Thus all possible mismatch labels before release lie in their twelve-label union. This is a support statement about the exact supplied paths, not a mechanism that realizes those paths.

The identity $\mathbf y_i''=\mathcal A_i[\mathbf y]+\mathcal R_i$ merely defines an added acceleration from its desired trajectory. It supplies no independent interaction, conserved account or preparation apparatus. The environmental mismatch proves that imposing only the target motions would require environmental evolution, changing the complete past. Any apparatus represented by further nonstationary architrino paths would have to be included in the same causal sums; it would define a different preparation problem.

The exact prescribed history is therefore excluded as a fully unforced preparation under the unchanged regular equation. A different coherent preparation with the same instantaneous release positions and velocities is neither constructed nor ruled out by this proof. Its retained earlier histories can alter later causal-root values, so its forward behavior cannot be identified with the accepted fixed-input evolution from instantaneous data alone. The subject preserves this limit and makes no new claim about the ongoing signed-error investigation.

## 5. Verification, preservation and falsifiers

Claim grade: measured for the file checks in this paragraph. At review entry, `shasum -a 256 -c .tmp/mec-008-signed-error/preparation/subject-review.sha256` passed the frozen subject. The same command on the author's `preparation/frozen-inputs.sha256` passed all seven scientific inputs; the reviewer's separate `independent-review/preparation-inputs.sha256` passed its six accepted inputs. After this adjudication was written, all entries in all three manifests passed again; the receipts are retained in `.tmp/mec-008-signed-error/independent-review/` as `preparation-final-subject.txt`, `preparation-final-author-inputs.txt` and `preparation-final-reviewer-inputs.txt`. These checks concern the exact listed bytes, not every file in the concurrently edited repository. `git diff --no-index --check /dev/null reference/priorities/master-equation-closure/analysis/smooth-two-particle-preparation-independent-adjudication.md` emitted no whitespace diagnostic and returned 1 for the new-file difference.

The subject was read in full. The author-created arithmetic and its receipts were not used to establish mathematical acceptance. All new rational values and signs were reconstructed explicitly above, using direct polynomial factor evaluation and integer inequalities; no new in-session computational checker was needed. The accepted stationary-sum, root and forward-evolution dependencies are consumed at their recorded scopes, rather than recertified for arbitrary histories.

The reviewer wrote this adjudication as the only durable file, alongside the assigned independent-review scratch material and preservation receipts. No preparation subject, accepted reference, manuscript, shared tracker, generator or EOM solver file was edited, and no Git publication operation was performed. The subject and input manifest checks provide the measured preservation scope. The initial independent reconstruction remains separate from this frozen-subject assessment.

Falsifiers are explicit: a cross emission during the supplied pulse at or after $a$ would defeat the source cutoff; a missed cross root or positive self root under the complete subunit bound would defeat the root reduction; a failure of the accepted stationary cubic bound or a different exact pulse derivative would defeat the target estimate; a zero or opposite environmental residual in the displayed exact row would defeat that contradiction; an additional changing source at $t_*<0$ would defeat its one-row reduction; and a nonzero residual outside the twelve-label union before release would defeat the support bound. An autonomous solution with the identical past departing from stationary data within the stated locally unique receiver domain would contradict the uniqueness claim. Changes to history, summation rule or dynamical law require a different assessment.

The accepted consequence is preparation failure for this exact supplied complete past, together with preservation of its conditional forward-theorem interpretation. Construction and assessment of a different self-consistent preparation remain open.
