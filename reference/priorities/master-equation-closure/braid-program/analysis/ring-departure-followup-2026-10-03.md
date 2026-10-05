# Validated ring departure: endpoint and continuation limitation

Date: 2026-10-03. Assignment: Validated ring departure, Jack K. Hale lens, stable agent `/root/ring_axial`. **Scenario: unchanged Master Equation, $K=c_f=1$ numerically, complete ordinary positive-delay census including self.** This freezes the endpoint observations and bounded outcome of the follow-up. The $|q|\le0.006$ theorem remains subject to its separate review; no larger proof is launched while that review is pending.

## 1. Outcome

The original tiny analytic domain has been enlarged substantially: the [first enlarged-domain theorem](ring-departure-followup-tail-domain-2026-10-03.md) is accepted by its [independently constructed adjudication](ring-departure-followup-domain-independent-adjudication-2026-10-03.md), and the [degree-twenty coefficient intervals](ring-departure-followup-centered-domain-2026-10-03.md#3-direct-derivative-and-tail-proof) are separately accepted by the [coefficient review](ring-departure-followup-coefficient20-independent-adjudication-2026-10-03.md). The further [polynomial-centered theorem](ring-departure-followup-centered-domain-2026-10-03.md) supplies the provisional larger domain $|q|\le0.006$, a factor $6\times10^{10}$ over the old $10^{-13}$ radius, with a complete eight-hit chart. Its independent mathematical review is the remaining acceptance gate for the new endpoint observations below.

**Derived conditional on that larger theorem, with outward measured endpoint enclosures:** the negative fast branch contracts and slows; the positive branch expands and speeds up. Both remain above wake speed, all eight hits per receiver remain ordinary, and the radial motion has no turn or return anywhere inside this window. No fold, wake-speed event, collision, neighboring-rung transfer or dispersal has been established. The endpoint is regular; the identified obstruction is insufficient continuation bounds beyond it, rather than an intrinsic halt of the equation.

The [new observable instrument](../../../../../scripts/braid-program/ring_departure_followup_observables_20261003.py) uses only the interval polynomial and its omitted-tail bounds inside the admitted larger domain. It does not evaluate an uncertified trajectory at $|q|=0.007$ or $0.008$.

## 2. Enclosed endpoint observables

The displayed endpoints are conservative outward decimal envelopes of the binary interval receipt. Radius and speed refer to the instantaneous common planar history. The angular rate is instantaneous; it is not an allowed frequency of a different exact periodic rung.

| Quantity | Negative branch, $q=-0.006$ | Positive branch, $q=0.006$ |
| --- | --- | --- |
| Radius | $[0.9693302,0.9693316]$ | $[0.9813170,0.9813184]$ |
| Speed | $[1.79170,1.79196]$ | $[1.84772,1.84797]$ |
| Radius times speed | $[1.73675,1.73700]$ | $[1.81320,1.81345]$ |
| Oriented angular bookkeeping per member | $[1.73493,1.73518]$ | $[1.81247,1.81272]$ |
| Instantaneous angular rate | $[1.84645,1.84672]$ | $[1.88214,1.88240]$ |
| Radial velocity | $[-0.08209,-0.08184]$ | $[0.05217,0.05241]$ |

**Measured interval formulas and domain:** let $Y=(R+p_1,p_2)$ be the rotating position and $V=\lambda\mathcal Ep+\Omega JY$ its rotating physical velocity. The instrument encloses $r=|Y|$, $v=|V|$, $rv$, $\ell=Y_1V_2-Y_2V_1$, $\omega_{\rm inst}=\ell/r^2$, and $\dot r=\lambda Y\cdot\mathcal Ep/r$, with position and Euler remainder boxes supplied by the centered theorem. Here $J(Y_1,Y_2)=(-Y_2,Y_1)$. The branch has radial motion, so $rv$ differs from the oriented angular bookkeeping $\ell$; they coincide on the exact circular reference. Neither is assumed conserved and no primitive mass factor is introduced.

For $0<|q|\le0.006$, the complete coefficient proof gives a stronger direction statement:

$$
7.01306<\frac{\dot r(q)}{q}<13.88323.
$$

**Derived from outward polynomial and tail bounds:** since the omitted series starts at degree 21, its position remainder divided by $q$ is bounded by the position tail divided by $0.006$, and its first Euler remainder divided by $q$ by the first-Euler tail divided by $0.006$. The instrument evaluates the two resulting polynomial quotients on the entire interval $[-0.006,0.006]$, including their removable limits at zero, and encloses the displayed strict positive range. Thus the negative branch is strictly inward and the positive branch strictly outward as $|q|$ grows. This rules out a radial turn or return within the chart, not after it. The accepted mode selects $q(T)=q(0)e^{\lambda T}$; it is an ancient complete history, not an endpoint impulse.

The elapsed normalized time from $|q|=10^{-13}$ to $|q|=0.006$ lies in $[2.3284502468566848,2.3284502468566850]$, by the same instrument's outward $\log(0.006/10^{-13})/\lambda$ evaluation. Symbolically multiply this time by $K/c_f^3$, radii by $K/c_f^2$, speeds and radial velocities by $c_f$, angular rates by $c_f^3/K$, and both radius-times-speed and angular bookkeeping by $K/c_f$. No physical value of $K$ is inferred.

## 3. Quantified sufficient-bound obstruction

**Measured failure of specified sufficient estimates:** the frozen centered-domain instrument retains the following larger-domain candidates. They are estimates of analytic-ball conditions, not actual histories at those amplitudes.

| Candidate radius | Fixed parameters | Failed condition |
| --- | --- | --- |
| $0.007$ | Outer squared-gap scale $1.7$, residual scale $1.2$, perturbation ball $\zeta=0.00003$, delay error ball $s=0.0006$ | Row 7 image cap $0.0006167838\ldots>s$; the chosen twice-initial-radius tail ball has contraction cap $0.5646263\ldots>1/2$. |
| $0.008$ | Outer squared-gap scale $1.5$, residual scale $1.1$, perturbation ball $\zeta=0.0001$, delay error ball $s=0.0015$ | Row 6 and 7 image caps $0.0016581506\ldots$ and $0.0020223695\ldots>s$; tail norm cap $0.0001389814\ldots>\zeta$ and contraction cap $1.8308146\ldots>1$. |

The $0.007$ delay map itself still has a contraction cap below one; its image estimate exceeds the particular chosen ball. Likewise its tail contraction cap below one may permit a different ball. This makes the limitation explicit and repairable: it is not an exclusion theorem at $q=0.007$. At $q=0.008$ more than one sufficient condition fails, including the chosen derivative/inverse contraction estimate, but those upper-cap failures still do not prove that the exact delay map or exact nonlinear dynamics fails.

The ordinary endpoint admits no intrinsic halt verdict: the centered real chart has $|D|>0.12565$, speed $>1.69268$ and separation $>0.95717$ throughout the current domain. A decisive later event therefore needs a new complete-history continuation argument beyond this endpoint. A suspected fold from a larger point polynomial remains an unvalidated suggestion until both its history and its complete causal chart are enclosed. No branch selection, root removal, cap or event rule is introduced to cross such a suspected boundary.

## 4. Frozen instruments and receipts

Before the endpoint target, the new observable instrument passes an exact unit circle with $R=1$, $\Omega=2$; a static exponential displacement $Y=(2.1,0)$, $\mathcal EY=(0.1,0)$; and an independently known binomial Euler identity. These controls establish the formula path before its target. The larger convergence and census premises are inherited from their declared theorem and separate review, not certified anew by these controls.

| Item | SHA-256 |
| --- | --- |
| Observable instrument | `d0dc32dc8873091e5e1a5147b1bc8159f67a0d73a485d944b1d7c68becaf8a62` |
| Observable known receipt | `1518eae953fc1bd3d8187d7eab62e785f1418c2a5792b942176c951e6a04b713` |
| Observable target receipt | `42ba966ec0ee5e3c88584456d56b71a938997ab041370686f079f770a36f5a86` |
| Frozen $0.007$ sufficient candidate | `4f67733ea969f026a4bade682dd9c6f0817769343e9af1f937d877d4da4d121c` |
| Frozen $0.008$ sufficient candidate | `dda3a6debf944217a875ab51dc1868e2f86e9c3c6d9a300c7ec01f8dde9fbedd` |

Observable receipts live under `.local-data/ring-followup/departure/observables/`; the failed candidates remain under `centered-domain/`. Their exact binary fields are authoritative. The centered subject/instrument hashes and all input identities are recorded in the linked theorem and the observable target. Its successful $0.006$ majorant run `760d875a-d739-4be7-8e67-c51f25aadb55` finished in 4.660 wall seconds; the failed sufficient candidates' operationally successful runs `1135effe-0c6c-4c0c-8a07-c3b27c319dbc` and `6f5c3443-5356-41aa-ad47-d1a832357de4` finished in 4.739 and 5.023 seconds. All three exited zero with closed process groups by their leases because they completed their declared inequality tests; exit zero does not mean a larger-domain certificate passed. No owned computation is intentionally left running for this assignment.

**Falsifiers:** failed independent review of the larger domain; an incorrect normalization or coefficient enclosure; incorrect treatment of the exact omitted tail; an observable or quotient formula with a missing rotation/Euler term; or an independently enclosed history in the stated window violating these endpoint or radial-direction intervals overturns the corresponding claim. Look in the binary observable target and the separate centered-domain adjudication. Neither failed sufficient bounds nor an unenclosed polynomial at larger amplitude can establish an intrinsic EOM obstruction.

## 5. Recommended next action

1. **Close the independent $0.006$ review first — recommended.** It is the new acceptance premise for the endpoint table and must remain separate from this subject.
2. **Then repair the explicit $0.007$ image/tail balls — recommended bounded continuation.** A slightly wider delay-error ball and a tail ball suited to contraction below one may close the quantified gap; recompute outward conditions and the full real chart with known controls first.
3. **For a decisive event, use a delay-polynomial derivative preconditioner or successively recentered history charts — recommended after the bounded repair.** It should reduce the remaining near-fold divisor loss and enclose a complete history up to a genuine event. Do not promote a point-polynomial fold or a sufficient-bound failure into a physical stopping rule.
