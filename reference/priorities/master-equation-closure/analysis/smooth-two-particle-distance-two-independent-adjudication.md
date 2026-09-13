# Independent adjudication of distance-two continuation and overlapping arrivals

## Disposition and evidence boundary

The [distance-two continuation theorem](smooth-two-particle-distance-two-continuation.md) is accepted for its unchanged complete supplied past, fixed eight-source block prescription and $0<g=G/\ell\le16$. Independent analytical reconstruction found no required mathematical correction. It supports continuation through $T=113\ell/128$, including all distance-two exits and the overlapping distance-$\sqrt5\ell$ entries. Exactly 76 environmental histories are nonconstant; the two targets remain stationary and separated by $\ell$.

The fresh-context reviewer did not author the subject and worked read-only. The coordinator captured the reconstruction and accepted its supported claims here. The reviewer neither ran nor used the subject's arithmetic checker as proof. All mathematical findings below have claim grade **derived**, conditional on the stated input and the accepted stationary cubic estimate and 32 earlier responses from the [second-shell adjudication](smooth-two-particle-second-shell-independent-adjudication.md). Those dependencies are not independently re-adjudicated here. File preservation is a separate measured claim.

| Claim | Disposition |
| --- | --- |
| Same smooth input, active ranges greater than $7/5$, coefficient below $1/6400$ | Accepted |
| Continuation to $113\ell/128$ at every $0<g\le16$ | Accepted |
| 100 entered ordered pairs, 24 double receivers, 76 environmental labels | Accepted |
| 52 complete and 48 unfinished receptions, with unavoidable shell overlap | Accepted |
| 44 new nonconstant histories: 28 fifth-order and 16 sixth-order first responses | Accepted, including transverse signs |
| Stationary targets and stationary complementary environment | Accepted |
| Complete cross-root census, no positive self roots, original history class and smooth joins | Accepted for this continuation |
| Every received emission precedes release | Accepted |
| Uniqueness under the same block sum, complete past and stated bounded comparison class | Accepted within that scope |
| Arbitrary-history invariance, unrestricted uniqueness, contact, genericity or global existence | Not established |

## 1. Independent range and acceleration comparison

Use $c_f=1$, anchors $\ell i$ for integer labels $i$, polarities $\sigma_i=(-1)^{i_1+i_2+i_3}$, changed labels $E=\{0,e_1\}$ and displacement direction $\mathbf e=(0,0,1)$. The supplied past displacement at either changed label is $\varepsilon\ell\mathbf e\psi(8(s/\ell+5/4))$, with $\varepsilon=2^{-16}$ and $\psi(v)=v(1-v^2)^4$ inside $[-1,1]$, zero outside. Every other past is stationary. For $u=s/\ell+11/8$,

$$
2^{-16}(-1+8u)\big[1-(-1+8u)^2\big]^4
=(-1+8u)u^4(1-4u)^4=p(u).
$$

This exact identity confirms the unchanged input, with support $u\in[0,1/4]$ and vanishing endpoint jets through third order. The extrema of $\psi'(v)=(1-v^2)^3(1-9v^2)$ give $|\psi'|\le1$, hence $|p'|\le\nu=1/8192$. The accepted input acceleration bound is $3/(8\ell)$ and jerk bound $27/(2\ell^2)$.

Let $t=T/\ell$, $\mathbf y_i(t)=(\mathbf X_i(\ell t)-\ell i)/\ell$, $b=1/1024$ and $H=113/128$. Distance-one support is inactive throughout the receiver ball after release because $-1/8+b<0$. Every possibly nonzero correction has anchor distance at least $\sqrt2$. Both its actual range and its kernel-subtraction segment exceed $7/5$, since

$$
b+\varepsilon=65/65536<1/100,
\qquad 7/5+1/100=141/100<\sqrt2.
$$

Write $\mathbf a=\mathbf k+\mathbf y$, where $\mathbf k=i-j$, and evaluate $p$ at the unique supplied-past root $t+11/8-u=\|\mathbf a-p(u)\mathbf e\|$. For $\mathbf K(\mathbf x)=\mathbf x/\|\mathbf x\|^3$ and transmitter denominator $D=1-\mathbf n\cdot p'(u)\mathbf e$, exact subtraction is

$$
\mathbf Q=
\frac{\mathbf K(\mathbf a-p\mathbf e)-\mathbf K(\mathbf a)}D
+\mathbf K(\mathbf a)\left(\frac1D-1\right).
$$

The segment bounds $\|D\mathbf K\|\le2(5/7)^3$, $\|\mathbf K\|\le(5/7)^2$ and $D\ge1-\nu$ yield

$$
\|\mathbf Q\|\le Q_*=
\frac{2\varepsilon(5/7)^3+\nu(5/7)^2}{1-\nu}
=\frac{825}{11238052}<\frac1{13500}.
$$

The fixed block sum supplies the accepted background estimate $\|\mathbf S(\mathbf y)\|\le C_b\|\mathbf y\|^3$, where $C_b=1309/(1-b)^5<1400$. A separate rational comparison then proves

$$
C_bb^3+2Q_*<\frac{1400}{1024^3}+\frac1{6750}
<\frac1{750000}+\frac1{6750}<\frac1{6400}.
$$

This reconstruction does not depend on the subject's arithmetic instrument. An active distance-one row, failed segment floor or omitted stationary subtraction would defeat the estimate. The canonical transmitter-weighted acceleration, rather than receiver playback, is retained throughout.

## 2. Continuation and derivative control

The exact receiver equation is $\mathbf y_i''=g[\mathbf S(\mathbf y_i)+\sum_{j\in E\setminus\{i\}}\sigma_i\sigma_j\mathbf Q_{i-j}(t,\mathbf y_i)]$. It has at most two corrections. At source time zero the delay residual is at most $H-(1-b)<0$, while its slope toward the remote past is at least $1-\nu$. Thus the root used to define each correction is unique and lies in the supplied past.

Integration from zero release displacement and velocity gives

$$
\|\mathbf y_i''\|<g/6400,\quad
\|\mathbf y_i'\|\le gt/6400,\quad
\|\mathbf y_i\|\le gt^2/12800.
$$

At $g=16$ and $t=H$, the displacement bound is $12769/13107200$, strictly less than $b=12800/13107200$, with margin $31/13107200$. Velocity is bounded by $113/51200<1/400$ and acceleration by $1/400$. Positive ranges and transmitter denominators supply a smooth open domain around the proof ball. The strict first-exit contradiction and bounded velocity give classical continuation through $H$ of the finite receiver system.

For the receiver-position derivative, put $\mathbf R=\mathbf k+\mathbf y-p\mathbf e$, $\mathbf n=\mathbf R/\|\mathbf R\|$ and $\mathbf W=p'\mathbf e$. Implicit differentiation gives

$$
u_{\mathbf y}=-\frac{\mathbf n^{\mathsf T}}D,
\qquad
\mathbf R_{\mathbf y}=I+\frac{\mathbf W\mathbf n^{\mathsf T}}D.
$$

Consequently $\|\mathbf R_{\mathbf y}\|\le(1-\nu)^{-1}$ and $\|D_{\mathbf y}\|\le(\nu+3/8)/(1-\nu)$ for $r>1$. Differentiating both correction terms yields

$$
\|D_{\mathbf y}\mathbf Q\|
\le\frac2{(1-\nu)^2}+\frac{\nu+3/8}{(1-\nu)^3}+2<5.
$$

Inactive distance-one corrections vanish identically, so their smaller ranges do not enter this bound. The background derivative obeys $3C_bb^2<1/256$, using $C_b\le1309\cdot1024/1019<4096/3$. Therefore $11g$ is a valid uniform receiver-acceleration Lipschitz bound.

For time differentiation, with $\mathbf v=\mathbf y_i'$ and $\mathbf A=p''\mathbf e$,

$$
u'=\frac{1-\mathbf n\cdot\mathbf v}{D},\quad
\mathbf R'=\mathbf v-\mathbf W u',\quad
\mathbf n'=\frac{(I-\mathbf n\mathbf n^{\mathsf T})\mathbf R'}r,
\quad D'=-\mathbf W\cdot\mathbf n'-\mathbf n\cdot\mathbf A\,u'.
$$

The source-acceleration term is essential and present. The conservative bounds in the subject give $\|\mathbf Q'\|<34/63+2112/3969+1/2<2$, including the stationary subtraction derivative. Two corrections and the background imply $\|\mathbf y_i'''\|<5g\le80$. Endpoint flatness makes acceleration and jerk continuous. A positive stationary interval after release supplies compatibility with the stationary end of the supplied past. No failed source jet is concealed by counting endpoints alone.

## 3. Moving endpoints and exhaustive census

For a receiving pair, the entry and exit residuals are $F^a=t+11/8-\|\mathbf k+\mathbf y_i(t)\|$ and $F^b=t+9/8-\|\mathbf k+\mathbf y_i(t)\|$. Their derivatives are at least $399/400$ and deviations from their anchor residuals are at most $b$. Each endpoint within the interval is therefore unique and lies within $b$ of its anchor time. Since $u'>0$, the support is traversed once, in order.

The independent rational shell comparisons are

$$
\begin{gathered}
7/8+b=897/1024<904/1024=H,\\
\sqrt5<2311/1024,\quad \sqrt5>2057/1024,\\
\sqrt6>2313/1024,\qquad \sqrt5<1151/512.
\end{gathered}
$$

These respectively establish complete distance-two reception, started and unfinished distance-$\sqrt5$ reception, exclusion of distance-$\sqrt6$ and every larger distance, and the strict overlap inequality $\sqrt5-11/8+b<7/8-b$. Even the latest distance-$\sqrt5$ entry precedes the earliest distance-two exit. Earlier shells are complete by this horizon.

The integer shells of squared radius $2,3,4,5$ contain 12, 8, 6 and 24 points. Both sources therefore produce 100 entered ordered pairs. For a double receiver let $m=\|i\|^2$, $n=\|i-e_1\|^2$; then $i_1=(m-n+1)/2$ and $i_2^2+i_3^2=m-i_1^2$. The exhaustive nonempty intersections are

| $(m,n)$ | $i_1$ | $i_2^2+i_3^2$ | Labels |
| --- | ---: | ---: | ---: |
| $(2,3)$ | $0$ | $2$ | $4$ |
| $(3,2)$ | $1$ | $2$ | $4$ |
| $(2,5)$ | $-1$ | $1$ | $4$ |
| $(5,2)$ | $2$ | $1$ | $4$ |
| $(4,5)$ | $0$ | $4$ | $4$ |
| $(5,4)$ | $1$ | $4$ | $4$ |

Equal-parity pairs give a noninteger first coordinate; the remaining odd-parity cases $(3,4)$ and $(4,3)$ require two integer squares summing to three and are empty. Hence there are 24 double receivers, 76 distinct environmental labels, 52 completed pairs and 48 unfinished pairs. Both targets lie outside the set.

All 12 distance-two receivers are new. Of the 48 distance-$\sqrt5$ pairs, eight reach earlier distance-$\sqrt2$ receivers and eight reach distance-two receivers, leaving 32 new labels. Equal distance to the two centers is impossible, excluding simultaneous first-source cancellation at a new label. A missing integer intersection or failed timing inequality would falsify the corresponding count.

## 4. Independent first-response coefficients

A new receiver stays at its anchor until its exact first onset $t_d=d-11/8$; its other changed-source correction is inactive near that onset. Set $\theta=t-t_d>0$, $\mathbf k=i-j$, $d=\|\mathbf k\|$ and $\sigma=\sigma_i\sigma_j=(-1)^{d^2}$. The root and pulse expansions give

$$
p(u)=-u^4+O(u^5),\quad p'(u)=-4u^3+O(u^4),\quad
u=\theta+O(\theta^4).
$$

For $k_3\ne0$, the denominator is $D=1+4k_3u^3/d+O(u^4)$, so

$$
\mathbf Q(t_d+\theta,0)=-\frac{4\mathbf k k_3}{d^4}\theta^3+O(\theta^4),
\qquad
\mathbf y_i(t_d+\theta)=-\frac{\sigma g\mathbf k k_3}{5d^4}\theta^5+O_g(\theta^6).
$$

The zero-data integral equation and receiver Lipschitz bound first give $\mathbf y_i=O_g(\theta^5)$, so feedback cannot change the leading cubic acceleration. The two integrations supply $\int_0^\theta(\theta-s)s^3\,ds=\theta^5/20$.

For $k_3=0$, $n_3=-p/r=O(u^4)$, and the denominator correction starts only at order seven. The leading term is the kernel displacement:

$$
-p(u)D\mathbf K(\mathbf k)\mathbf e
=\frac{\mathbf e}{d^3}u^4+O(u^5),
\qquad
\mathbf y_i(t_d+\theta)=\frac{\sigma g\mathbf e}{30d^3}\theta^6+O_g(\theta^7).
$$

Here the integral equation first gives $\mathbf y_i=O_g(\theta^6)$. The transverse coefficients are explicitly $+g\mathbf e/240$ for $d=2$ and $-g\mathbf e/(150\sqrt5)$ for $d=\sqrt5$. The signs arise from the positive polarity product at squared distance four and negative product at squared distance five.

The distance-two set contains four cases with $k_3\ne0$ and eight transverse cases. Each distance-$\sqrt5$ source shell has eight transverse vectors; removing two already reached at distance two and two already reached at distance $\sqrt2$ leaves four new transverse receivers per source. Thus its 32 new labels comprise 24 fifth-order and eight sixth-order responses. Altogether the 44 new histories have 28 fifth-order and 16 sixth-order nonzero leading displacements. Combined with the accepted 32 earlier nonconstant histories and the stationary complement, this proves exactly 76. An opposite coefficient, omitted other-source onset or a vanishing displayed coefficient at $g>0$ would defeat this argument.

## 5. Complete evolved roots, class and bounded uniqueness

The joined complete histories have displacement below $b\ell$ and speed at most $1/400$. For any cross channel and earlier emission,

$$
r_{ij}(T,s)\ge\ell\|i-j\|-2b\ell\ge511\ell/512.
$$

Source Lipschitz continuity makes the delay residual $f(\tau)=\tau-\|\mathbf X_i(T)-\mathbf X_j(T-\tau)\|$ increase by at least $399/400$ times every delay increment. It starts negative and eventually becomes positive, proving exactly one cross root on the whole positive-delay domain. Its delay exceeds $w=\ell/256$, so the original half-width tube lies in positive delay; range, transmitter and complement floors follow with complement gap at least $399w/400>w/4$.

Self residuals satisfy $f_{ii,T}(\tau)\ge399\tau/400$, excluding all positive self roots. The normalized near-diagonal floor exceeds $1/4$ and the ordinary complement for $\tau\ge2w$ exceeds $w/4$. The exact diagonal is still excluded. Every retained cross root satisfies

$$
s=T-r\le(113/128-511/512)\ell=-59\ell/512<0.
$$

Thus the constructed receiver equations are the full EOM: environmental futures are solved while their new emissions have not arrived. Under the same fixed block prescription, a competitor with the identical complete past, displacement at most $b\ell$ and speed at most $1/4$ has the same range and negative-emission bound, residual slope at least $3/4$, and no positive self roots. Every label satisfies the same receiver ODE. Ordinary finite-dimensional uniqueness applies separately to each label, including the stationary complement; no infinite-dimensional uniqueness theorem is needed on this interval.

The complete acceleration and jerk bounds $3/(8\ell)$ and $80/\ell^2$ are below the [original history-class](population-history-class.md) ceilings $256/\ell$ and $65536/\ell^2$. Displacement and speed retain both original envelopes and the speed ceiling. Equal-time separation exceeds $511\ell/512>\ell/8$, and the original anchor-cube volume argument retains the density constants. Together with the root conditions and $C^3$ joins this preserves the class at every cut through $H\ell$.

A root violating the global monotonicity bounds, a received nonnegative emission, or a failed original ceiling under these estimates would falsify the corresponding conclusion. A different supplied past, summation prescription, coupling range or comparison domain changes the hypotheses. The theorem does not establish eventual target motion, contact, genericity, arbitrary-history invariance or global evolution.

## Preservation and integration record

The reviewer ran shasum -a 256 -c before and after review on .tmp/smooth-two-particle-distance-two/subject.sha256 and frozen-inputs.sha256, covering the subject and nine scientific inputs; all entries passed. The subject remained 9e06c7c8e8ff166521be5d44aa1d231223380f882483937284c373c005ea3090. The coordinator repeats those scoped preservation checks. A changed manifest entry overturns that measured preservation claim.

The subject remains frozen with its submitted-review wording as provenance. This adjudication and the live strategy carry acceptance. The reviewer recommended two explanatory clarifications, without identifying a mathematical defect: state the same fixed block prescription directly in bounded uniqueness, and explain the finite system as a product of independent receiver equations until generated emissions arrive. Both are explicit in the manuscript integration. The reviewer wrote no files and ran no generator, simulation or subject checker. Document and arithmetic validation records remain in the work log, separate from mathematical acceptance.
