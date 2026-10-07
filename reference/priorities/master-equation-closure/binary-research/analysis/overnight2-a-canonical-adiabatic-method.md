# A bounded action and phase calculation for the literal canonical entry

**Analytical-method proposal.** The local seventh-order response has an independently checked error. The next task is to use it in a cancellation-preserving comparison, not to produce more response coefficients. This protocol tests a polynomial corrected eccentricity account and a phase relation. Their purpose is to locate the first possible asymptotic radial opening for the original nominal history, with release and nonmirror errors retained separately. No action variable here is a physical energy or a new interaction law.

The exact scenario remains the canonical opposite-polarity nominal pair and its complete history from the [current A account](overnight2-a-followup-and-research-2026-10-07.md), with $c_f=1$. The nominal future is planar by its already accepted source-identity and uniqueness argument. Its spatial neighborhood is not assumed planar. This method's first target is the nominal member only; any later spatial phase statement requires its own normal-frame estimate.

## Exact polar identities and the finite response polynomial

Use $P=hp$, $Q=h^2/r$, $\alpha=\epsilon/h$. Write $a=r^2A_r$ and $b=r^2A_t$. At a regular receiving state the exact identities are

$$
h_\theta=\frac{hb}{Q},\qquad
P_\theta=\frac{Pb}{Q}+Q+a,\qquad
Q_\theta=2b-P.
\tag{1}
$$

For $c=e/h$, cancellation of its tangential angular-denominator term gives the useful exact vector identity

$$
c_\theta=\frac{Q+1}{hQ}b\,n-\frac{1+a}{h}t.
\tag{2}
$$

At finite radius $Q>0$. Each printed tangential response coefficient is divisible by $Q$, so its finite polynomial extends analytically to $Q=0$ as an auxiliary expression. Such an extension does not define a physical state at infinite separation or continue the actual path through an event.

Let $a_7,b_7$ be the independently matched degree-seven response and put $B=b_7/(\alpha Q)$. Then the auxiliary polynomial equations are $h_\theta=\epsilon B$, $P_\theta=\alpha PB+Q+a_7$, $Q_\theta=2\alpha QB-P$. They are used to construct exact algebraic identities with a retained residual. They are not assigned as a replacement physical equation.

## Homological construction

Set $x=Q-1$, $y=P$, and $E=x^2+y^2$. The zero-parameter differential operator is

$$
\mathcal L_0=-y\partial_x+x\partial_y.
$$

It generates a unit rotation of $(x,y)$, which is an algebraic control. Seek a corrected account

$$
\mathcal I_N=\frac1{h^2}\sum_{j=0}^N\alpha^jJ_j(P,Q),
\qquad J_0=P^2+(Q-1)^2.
\tag{3}
$$

Its derivative can be expanded exactly in $\alpha$, using (1) and $h_\theta=\epsilon B$. If $B_i$ is the coefficient of $\alpha^i$ in $B$, and $V_i=(PB_{i-1}+a_i,2QB_{i-1})$, the coefficient at order $n$ is

$$
\mathcal L_0J_n+
\sum_{i=1}^n V_i\cdot\nabla J_{n-i}
-\sum_{i=0}^{n-1}(n-i+1)B_iJ_{n-1-i}.
\tag{4}
$$

Absent coefficients are zero. The last term differentiates both $h^{-2}$ and $\alpha^{n-1-i}$. Omitting either contribution would change the secular account.

For exact polynomial inversion put $u=x+iy$, $v=x-iy$. Then $\mathcal L_0(u^av^b)=i(a-b)u^av^b$. Divide each nonzero-frequency monomial by its eigenvalue; retain the $a=b$ terms as a polynomial in $E=uv$. A free mean polynomial added to $J_{n-1}$ changes the mean order-$n$ residual by

$$
(2E\partial_E-(n+1))\phi(E).
\tag{5}
$$

Thus a monomial $E^k$ with $2k\ne n+1$ can be removed by a mean correction. A term with $2k=n+1$ is resonant and must be retained explicitly, not divided by zero or declared absent. Its eventual integral can be bounded using the actual small corrected seed and finite angular range; whether that bound is useful is part of the investigation.

At first order (4) is canceled by the independent hand expression

$$
J_1=-2P(Q+1).
$$

Indeed $\mathcal L_0[-2y(x+2)]=-2(x^2-y^2+2x)$, the negative of the order-one residual of $E/h^2$. This control is fixed before any higher-order target. Central zero-parameter invariance of $E$, complex monomial inversion, conjugate reality and this first-order cancellation form the known tests.

## Phase relation and scope

The first two response orders also suggest a separately checkable approximate phase relation

$$
\Theta_2=\theta-\frac h\epsilon
-\frac\epsilon h\left(Q-1+\frac13\right)
-\frac{2\epsilon^2P}{3h^2}.
\tag{6}
$$

Direct differentiation cancels the order-one and order-two terms; the remaining polynomial and actual errors must be bounded before using (6). A bound on the corrected account controls amplitude, while a phase relation controls the angular location where that amplitude permits $Q$ to approach zero. Neither alone selects a physical fate. A tangential opening with $P=0$ and a transverse outward opening with $P>0$ remain distinct possibilities until the literal preparation is enclosed.

The first bounded target constructs (3) through order six, retains every resonant coefficient and prints the exact finite-polynomial residual. It must pass the known controls first. Use a new companion under `overnight2-a-`, the shared venv, one CPU group, a 90-second internal budget, 120-second outer supervisor deadline, 512 MiB resident-memory bound and 1 MiB output bound. A small exact polynomial pilot is sufficient; no trajectory, radius endpoint or larger resource budget is selected by this protocol. Original receipts are retained.

Independent derivation must check the recurrence, polynomial coefficients and retained resonances before target use. Subsequent proof obligations are the complete original release contribution, the actual two-clock forcing, explicit bounds on the residual polynomial and homogeneous/phase sensitivity, and a separately checked literal-token evaluation. Failure of any obligation stops that transfer. A useful obstruction is the first exact inequality that remains too loose, not merely an unclassified failure of a long numerical orbit.

**Known-first receipt, 06:25:43 UTC.** The [exact polynomial instrument](../evidence/overnight2-a-canonical-adiabatic.py), SHA-256 `69bff0a0ca954f10c373848311543e1b2ea6bc75ccc942579fcc36db750f05e8`, passed all six declared controls before the order-six target. The retained receipt is `.local-data/master-equation-closure/overnight2-a/canonical-adiabatic-known.json`, with its progress log. Supervisor lease `9c0d5104-1dc3-467b-960e-a851142f06a0` completed with closed process group; the instrument measured 0.0563 seconds and 61,964,288 bytes peak resident memory. This records algebraic controls, not independent acceptance of the higher-order target.
