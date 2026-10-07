# Independent review of the first-half-turn superfield sector

## Review scope and known-first arithmetic record

The subject is [the first-half-turn tangential exclusion and ordinary superfield sector](overnight2-c-superfield-phase-sector.md). This review reconstructs the sign and causal-root arguments independently from the selected logarithmic law, with $K_{\log}=c_f=1$, unit persistent polarities, unchanged transmitter weighting and complete circular histories. Source inspection identifies the claim under review; the review does not use a subject implementation as an oracle.

Before checking target constants, the separately authored [exact-arithmetic instrument](../evidence/overnight2-c-superfield-independent-check.py) passed its known controls with `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-superfield-independent-check.py --stage known`. The controls returned exact $1/3+1/6=1/2$, $(3/2-1/2)^2=1$, and $1/10-1/4=-3/20$. Its source SHA-256 is `4a257d8ca5134891a1ae222bddb9111ae88c58ca3480150b1043d7d2e1e49622`, and the receipt is `.local-data/master-equation-closure/overnight2-c/review-superfield-known.json`. No target constants had been run through this instrument when this record was written.

The exact arithmetic checks rational bounds only. The signs of the trigonometric functions, calculus argument, root census and scope separation require the analytic reconstruction below. The elementary inequality $3<\pi$ is used separately; it is not claimed as output from rational arithmetic.

## Verdict

**Derived and independently reconstructed:** the tangential sign exclusion holds on the everywhere-ordinary subset of the stated general phase region. Separately, the concrete closed box is everywhere ordinary and has exactly thirty directed partner roots and six positive-delay self roots. All thirty-six tangential contributions are strictly positive, so no path in that box satisfies the exact circular acceleration equation. No defect requiring a correction of the frozen subject was found.

By `shasum -a 256` on the frozen subject, the reviewed digest is `c54916488668544525a3e5c963505371ffd87f84893ac4b772ca6ec3b1804ff8`. The source was read with `cat`; the derivations and independent arithmetic below establish the review. This conclusion neither excludes arbitrary phases/speeds nor gives a continuation rule at a singular root. The word ordinary means that every admitted positive-delay root is simple, with nonzero source factor; it is not inferred from a numerical root list.

## Independent sign reconstruction

At reception time zero put a positive receiver on the positive radial axis with radius $a$. The source radius is $b$, and $\epsilon=\phi_b-\phi_a$ is the chosen real difference of positive-endpoint phases. Write $\eta=\omega\tau-\epsilon$ for a positive delay $\tau$. A same-polarity source has emission angle $-\eta$ and polarity product $+1$; an opposite source has angle $\pi-\eta$ and polarity product $-1$. The logarithmic tangential component is therefore, in both cases,

$$
A_t=-q_iq_j\frac{b\sin\theta}{\tau^2|D|}=\frac{b\sin\eta}{\tau^2|D|}.
$$

At any causal root the delayed chord joins circles of radii $a,b$, so $|a-b|\le\tau\le a+b$, independently of speed or number of roots. Thus the interpair assumptions $|\epsilon|<\omega|a-b|$ and $\omega(a+b)+|\epsilon|<\pi$ force $0<\eta<\pi$. In a same-pair antipodal or self channel, $\epsilon=0$, and $0<\eta\le2\omega a<\pi$. Every ordinary admitted row consequently has $A_t>0$, including positive self roots and roots whose factor might be negative before taking the absolute value.

Every partner channel starts at a positive simultaneous distance. Its continuous distance-minus-delay function is positive at delay zero and nonpositive at $a+b$, so it has a positive root. Under the strict angle conditions the endpoint cannot be the maximum chord root: the same-polarity maximum requires $\eta=\pi$, and the opposite-polarity maximum requires $\eta=0$ modulo $2\pi$. Hence roots occur strictly inside the positive-delay interval. On the everywhere-ordinary subset all these roots enter the sum, and their positive tangential contributions already prevent the zero tangential acceleration of circular motion.

The number of roots is finite: each squared gap is a nonidentically-zero analytic function on a neighborhood of the compact interval $[0,a+b]$. An accumulation of zeros would force it to vanish identically, which the displayed quadratic/trigonometric form does not. The same-time self endpoint is excluded by the selected law; no infinite accumulation of positive self roots occurs there. This is sufficient for the general sign theorem, which does not assert that the full phase region contains no multiple roots. A configuration with a singular root is outside the equation domain used in that theorem, not a configuration whose singular row has been silently discarded.

## Concrete closed box and complete delay interval

The reviewed box is $r_1=1$, $r_2\in[23/20,6/5]$, $r_3\in[13/10,27/20]$, $\omega\in[21/20,27/25]$ and $\phi_2,\phi_3\in[-1/100,1/100]$, with $\phi_1=0$. Minimum speed exceeds one by $1/20$; maximum speed is $729/500$. Every distinct-radius gap is at least $1/10$, while $|\epsilon|\le1/50$. The strict lower-angle condition has margin at least $17/200$. For every channel, including a self channel,

$$
\omega(a+b)+|\epsilon|\le\frac{367}{125}=3-\frac8{125}<\pi.
$$

All delays lie in $[0,L]$ with $L=a+b\le27/10$, so this finite interval covers the entire infinite past for each channel. Define the squared gaps

$$
G_+(\tau)=\tau^2-(a-b)^2-4ab\sin^2((\omega\tau-\epsilon)/2),
$$

$$
G_-(\tau)=\tau^2-a^2-b^2-2ab\cos(\omega\tau-\epsilon).
$$

The plus sign designates same polarity, including self, and the minus sign designates opposite polarity. Positive zeros of either squared gap are exactly causal roots: both the delay and distance are nonnegative, so squaring introduces no extra positive root. Differentiating $G=\tau^2-r(\tau)^2$ at a root gives $G'=2\tau(1-n\cdot V_b)=2\tau D$. A nonzero positive derivative therefore proves both simplicity and positive source factor.

### Excluding the initial interval

For $0\le\tau\le1/2$, $|\eta|\le14/25$ and $|\eta/2|\le7/25$. For $0\le x\le7/25$, Taylor's lower bound $\sin x\ge x-x^3/6\ge0$ and oddness give

$$
\sin^2x\ge x^2(1-x^2/6)^2\ge x^2\left(1-\frac{(7/25)^2}{6}\right)^2\ge\frac{97}{100}x^2.
$$

The multiplied expression has equality at $x=0$; the coefficient itself is strictly larger than $97/100$. The coefficient margin is the exact positive rational $14194/3515625$.

In a same-polarity interpair channel, $ab\ge23/20$ and $(97/100)ab>1$. Thus

$$
G_+(\tau)\le\tau^2-(a-b)^2-(\omega\tau-\epsilon)^2.
$$

The maximum over all real $\tau$ of $\tau^2-(\omega\tau-\epsilon)^2$ is $\epsilon^2/(\omega^2-1)$, found by completing the square; this remains an upper bound on the nonnegative initial interval even if its maximizer is elsewhere. Hence

$$
G_+(\tau)\le\frac{(1/50)^2}{(21/20)^2-1}-(1/10)^2=-\frac1{164}<0.
$$

For self, $a=b$, $\epsilon=0$, so

$$
G_+(\tau)\le\tau^2\left(1-\frac{97}{100}a^2\omega^2\right)\le-\frac{2777}{40000}\tau^2<0\qquad(0<\tau\le1/2).
$$

This explicitly excludes a hidden positive self root near the same-time endpoint. For opposite polarity, $\cos\eta\ge1-(14/25)^2/2=527/625>0$. With $a,b\ge1$ and $\tau^2\le1/4$, one gets $G_-(\tau)<1/4-2<0$. No channel has an initial positive root.

### Exactly one later root and positive factor

On $1/2\le\tau\le L$, the angular interval is

$$
\frac{101}{200}\le\eta\le\frac{367}{125}<\pi.
$$

Therefore $\sin\eta>0$. The same-polarity derivatives are

$$
G_+'=2\tau-2\omega ab\sin\eta,\qquad G_+''=2-2\omega^2ab\cos\eta,\qquad G_+'''=2\omega^3ab\sin\eta>0.
$$

At $\tau=1/2$, the angle lies in $[101/200,14/25]$, where sine is increasing. Using $ab\ge1$, the initial derivative satisfies

$$
G_+'(1/2)\le1-\frac{21}{10}\left(\frac{101}{200}-\frac{(101/200)^3}{6}\right)=-\frac{2467893}{160000000}<0.
$$

At $L$, using $\sin\eta\le1$, $L\ge2$ and $ab\le(27/20)^2$ gives

$$
G_+'(L)\ge2(L-\omega ab)\ge2\left(2-\frac{27}{25}\left(\frac{27}{20}\right)^2\right)=\frac{317}{5000}>0.
$$

Since $G_+''$ strictly increases, $G_+'$ either increases throughout or decreases and then increases; an everywhere-decreasing alternative is ruled out by these endpoint signs. Starting negative and ending positive, $G_+'$ has exactly one zero. Thus $G_+$ decreases to one minimum and then increases. It starts strictly negative by the initial-interval estimate, and

$$
G_+(L)=2ab(1+\cos\eta(L))>0.
$$

It crosses zero exactly once on the increasing part. Its derivative at that root is strictly positive because the minimum value is negative. This applies equally to each same-polarity partner channel and each self channel.

For opposite polarity, $G_-'=2\tau+2\omega ab\sin\eta>0$ throughout the later interval. It starts negative and ends at $G_-(L)=2ab(1-\cos\eta(L))>0$. Hence it has exactly one positive root, again with positive derivative and positive factor.

Every one of the six receivers has five partner channels and one self channel, each with exactly one positive root. The complete directed count is therefore thirty partner roots plus six self roots, all at delays greater than $1/2$ and all ordinary. The six same-time self endpoints are not admitted. No source channel or later delay interval remains unexamined.

The positive roots depend continuously on the parameters by the implicit-function theorem because $G'>0$; uniqueness makes the local branches agree across the closed box. Compactness of the parameter box and the finite channel set then imply a uniform positive factor margin. This is an existence argument for that margin, not a numerical value. Rotation covariance transfers the sign and census from reception time zero to every reception time on the complete histories. The negative receivers are covered by simultaneous half-turn inversion, which preserves the polarity products and local radial/tangential components.

## Independent arithmetic results and evidence limits

After the recorded known-case pass, `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-superfield-independent-check.py --stage target` returned `passed: true` for all eleven rational margins. The local receipt is `.local-data/master-equation-closure/overnight2-c/review-superfield-exact.json`. The instrument imports only standard-library modules and does not import the subject or an earlier calculation. Its exact results include:

| Bound | Positive exact margin |
| --- | --- |
| Minimum speed above one | $1/20$ |
| Phase difference below frequency times radial gap | $17/200$ |
| Full-delay angle below three | $8/125$ |
| Squared sine coefficient above $97/100$ | $14194/3515625$ |
| Interpair product coefficient above one | $231/2000$ |
| Initial interpair gap below zero | $1/164$ |
| Initial self quadratic coefficient below zero | $2777/40000$ |
| Initial cosine lower bound | $527/625$ |
| Later angle above zero | $101/200$ |
| Initial same-polarity derivative below zero | $2467893/160000000$ |
| Terminal same-polarity derivative above zero | $317/5000$ |

These are measured exact-arithmetic outputs; the preceding derivations explain why each inequality applies to every parameter point. No root sampling, trajectory integration or stability computation was performed. The analytic root census is the independent reference, rather than agreement with a saved subject root list. This review created only its assigned report, separately authored arithmetic checker and locally retained review-prefixed receipts; no subject, previous review, main report or shared owner was changed.

The general theorem remains restricted to configurations whose admitted roots are all ordinary. Only the displayed concrete closed box has been proved everywhere ordinary here. All tangential rows are positive, but no numerical positive lower bound for their sum is asserted. The result is an exact nonexistence statement for circular balance in that box; it says nothing about released motion, stability, an arbitrary superfield phase arrangement, or physical acceptance of the logarithmic law.

Falsifiers are an admitted root outside the complete delay interval; a failed chord-to-angle bound; a sign error between polarity and the tangential component; a failed initial-interval inequality; failure of the derivative monotonicity argument; a second positive root; a zero source factor at a claimed crossing; an omitted positive self root; or an exact circular balance in the certified box. The equations and rational margins above identify where each could be checked. A source digest change requires renewed scope comparison rather than automatic transfer of this adjudication.

The recommended parent integration is to record the general ordinary-subset sign theorem and the concrete everywhere-ordinary exclusion as two separately graded results, linked to this reconstruction and its exact-arithmetic receipt.
