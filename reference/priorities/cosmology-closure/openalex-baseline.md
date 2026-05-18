# OpenAlex Baseline For Cosmology Closure

Queried on May 18, 2026. This baseline supports the deferred cosmology transfer-function pipeline and its direct comparison handles.

## Query Scope

- CMB and LambdaCDM parameter references.
- Supernova and BAO distance constraints.
- $H_0$ and $S_8$ tension references.
- CMB/large-scale-structure transfer-function codes.

## Review Set

| OpenAlex work | OA cites | Corpus use |
| --- | ---: | --- |
| [Planck 2018 results overview](https://openalex.org/W4288079944) | 13745 | Broad CMB/LambdaCDM benchmark anchor. |
| [Planck 2018 cosmological parameters](https://openalex.org/W3105678606) | 3702 | Parameter-level acceptance target for the pipeline. |
| [Riess supernova acceleration evidence](https://openalex.org/W2073832139) | 19351 | Late-time distance-redshift benchmark. |
| [Perlmutter high-redshift supernova sample](https://openalex.org/W3026499579) | 94 | Independent supernova-acceleration source in OpenAlex, despite low indexed count. |
| [Eisenstein BAO detection](https://openalex.org/W2162447676) | 4525 | BAO distance and structure benchmark. |
| [Riess local Hubble constant determination](https://openalex.org/W2339590713) | 1955 | $H_0$ tension input. |
| [CLASS transfer code](https://openalex.org/W2130038292) | 2271 | Transfer-function implementation comparator. |
| [DES Year 3 clustering and weak lensing](https://openalex.org/W3165898284) | 1096 | $S_8$ and growth/lensing benchmark. |

## Source Signals

- Planck, supernova, BAO, $H_0$, and weak-lensing sources define separate comparison handles. The cosmology workstream should not collapse them into one narrative "matches cosmology" claim.
- CLASS/CAMB-style references show that the mature deliverable is a transfer-function pipeline, not a qualitative ontology paragraph.
- $H_0$ and $S_8$ tensions should be treated as diagnostic splits in the effective observer variables, not as free tuning opportunities.

## Corpus Advancement Target

Use the sources to define the pipeline output vector

$$
\mathbf{y}_{\mathrm{cosmo}}
=
\left(
C_\ell^{TT,TE,EE},
D_A(z),
H(z),
f\sigma_8(z),
P(k,z),
Y_{\mathrm{BBN}}
\right),
$$

with an explicit map from Noether-Sea evolution, transport, and clock-rate comparison into each observer variable. The first practical review pass should assign one equation or missing interface to each component rather than expanding cosmology prose.

## Initial Linkages

- [strong-field-closure](../strong-field-closure/strong-field-closure.md): source/release history and strong-field medium loading.
- [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md): radiation and photon transport constraints.
- [validation-gates](../validation-gates/validation-gates.md): cosmology acceptance set inside the cross-sector intersection.
