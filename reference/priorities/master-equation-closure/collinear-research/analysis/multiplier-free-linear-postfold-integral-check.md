# Independent integral check of the postfold linear history

This audit checks the resolved outgoing history of the selected multiplier-free linear causal equation, with $c_f=1$, $a=0.5$ and $k=0.2862286103053385$. It uses the unchanged source-time integration oracle and polynomial-sector range service from the earlier fold audit. The new subject and this instrument are separate: the expectation is the supplied velocity increment, and the acceleration integral is reconstructed from causal source clocks. Neither an accumulated subject integral nor subject event labels supply the reference.

## Root geometry and checking method

For the reflected pair $X_1(T)=x(T)$ and $X_2(T)=-x(T)$, define the arrival clocks $P(T)=T+x(T)$ and $Q(T)=T-x(T)$. The four channel equations are $P(S)=Q(T)$ and $Q(S)=P(T)$ for partner reception, and $P(S)=P(T)$ and $Q(S)=Q(T)$ for self reception. Only strictly earlier source times $S<T$ are admitted; the zero-delay diagonal is excluded. The channel signs for acceleration are respectively negative, positive, negative and positive. Every simple source root retains its absolute clock-derivative denominator.

The independently authored wrapper `scripts/collinear-research/linear-postfold-independent-integral.py` opens and freezes the supplied NPZ bytes before analysis, reads only its `t,x,v` arrays, and constructs cubic Hermite position and clock polynomials. It locates first birth from the downward change of sign of $P'$, third contact from the third zero of position, the inherited partner fold from $Q(T)=P(T_c)$, and the upward speed crossing from the next zero of $P'$. It also searches for stationary-past entry at $P(T)=-a$. All polynomial sectors and all derivative extrema are retained in the complete census.

On the strict $v<-1$ postfold branch, recent $P$ clocks decrease and recent $Q$ clocks increase. The corresponding source ranges cannot supply additional earlier roots. The instrument checks these polynomial conditions and receiver/source clock separation before truncating the integration source past at third contact. This reduction is a geometric exclusion of rootless sectors, not a change to the causal law. The full polynomial history remains the source of independent census probes. The frozen source-time oracle cancels the source Jacobian by changing the variable of integration; it retains its absolute weight and all admitted orientations.

The integral window begins $0.002$ beyond the fold, where the previous independently checked event window already supplies overlap, and ends $10^{-4}$ before the upward speed crossing. Independent receiver reconstruction is refined across three sampling levels and two Gaussian quadrature orders, with quadratic spacing toward the nearly stationary receiver clock at its right endpoint. A passing residual is numerical agreement on these supplied polynomials; it is not a continuous enclosure of the exact held-release trajectory or an event continuation certificate.

## Known controls before the target

The wrapper runs the unchanged unequal-curvature fold, receiver mapping/range reduction and held-static controls before each target. Its additional exact control places both sources on the held past and uses an accelerated receiver with $v<-1$. The two causal roots have negative-distance partner and self channels; their integrated sum over a unit interval is exactly $-k$. The new wrapper returned that value with absolute error $3.33\times10^{-16}$ at both Gaussian orders eight and sixteen before opening any target history. The known receipt is under `.local-data/collinear-research/linear-postfold-independent/`.

## Evidence boundary

The completed h4096 incoming check locates upward crossing at $T=16.166574319124784$ using the polynomial derivative, without reading the subject's event scalars. It finds no preparation threshold $P=0.5$ or $P=-0.5$ before that event. At 43 full-sector probes from just beyond the fold to the crossing's left neighborhood, the complete ledger is one negative-distance partner and one negative-displacement self root. Polynomial velocity extrema confirm the decreasing-$P$/increasing-$Q$ source chart through the incoming segment; exact birth/endpoints retain their equality limits.

| Receiver samples | h4096 velocity increment minus order-sixteen integral | h8192 velocity increment minus order-sixteen integral |
| --- | ---: | ---: |
| 121 | $-1.1324\times10^{-8}$ | $-1.1346\times10^{-8}$ |
| 241 | $-1.5562\times10^{-9}$ | $-1.5883\times10^{-9}$ |
| 481 | $-9.6520\times10^{-10}$ | $-9.8326\times10^{-10}$ |

The interval is $[13.10202207347135,16.166474319124784]$. Its supplied velocity increment is 1.096789043256826, and the finest complete acceleration integral is 1.0967890442220214. The partner contribution is +4.490097028289965 and self contribution -3.393307984067943; neither is omitted. Positive-distance channels have no admitted roots by the independent census and clock-range conditions. The Gaussian order-eight versus order-sixteen difference decreases from $2.34\times10^{-8}$ on the coarse receiver reconstruction to $7.97\times10^{-12}$ and $1.35\times10^{-13}$ on the finer two. These are measured numerical agreements, not rigorous trajectory-error bounds. The watched foreground run completed with exit zero in 190.506 seconds, with advancing ten-second heartbeat requests. Its receipt is `.local-data/collinear-research/linear-postfold-independent/resolved-h4096-q1e-06-tol1e-12-step0.01-independent.json`.

The completed h8192 audit independently locates the event at $T=16.16657431666812$, again finds neither held-source threshold and gives the same complete census at all 43 probes. Its interval is $[13.102022039885298,16.166474316668122]$, supplied velocity increment 1.0967890054427367 and finest complete integral 1.0967890064259977. The latter separates into partner +4.490097034411145 and self -3.393308027985147, with no positive-distance roots. The finest quadrature-order difference is $1.29\times10^{-12}$. The watched foreground run completed with exit zero in 369.811 seconds and advancing heartbeat requests; its separate `h8192` receipt names a unique known-control receipt obtained before target use. Both source histories give residual magnitude below $10^{-9}$ at the finest tested reconstruction. This agreement remains a numerical polynomial-history check, not a uniform accuracy bound at the exact event.

The checked interval starts in the previous fold audit's overlap and excludes the last $10^{-4}$ before the upward crossing. The subject's regular incoming localization supplies the measured event endpoint, while the independent analytical theorem supplies its local mechanism and continuation alternatives. No outgoing history is executed by this audit, and no exact selected-release enclosure follows from the residual.

The subject reaches an upward speed crossing before the stationary-past threshold. The [independent postfold theorem](multiplier-free-linear-postfold-independent-check.md) owns the event compatibility and multiplicity analysis; the held-past theorem remains conditional and is not applied to this trajectory. A missed root, failed exact control, source-clock inversion error, inconsistent polarity or an integral residual that fails reconstruction refinement would overturn acceptance of the supplied incoming continuation. Inspect the byte-frozen input, complete census, source-sector ranges and retained quadrature receipts.

Reproduce both checks with the executable shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-postfold-independent-integral.py --history .local-data/collinear-research/linear-postfold-continuation/resolved-h4096-q1e-06-tol1e-12-step0.01.npz
"${AAA_VENV:-../.venv}/bin/python" scripts/collinear-research/linear-postfold-independent-integral.py --history .local-data/collinear-research/linear-postfold-continuation/resolved-h8192-q1e-06-tol1e-12-step0.01.npz
```

The first receipt retains its original `postfold-known.json`; later invocations use timestamped unique known-receipt paths. All previously used integration and range services remain unchanged. The new wrapper only redirects known-control output storage. Both target jobs are complete; no compute remains active for this audit.
