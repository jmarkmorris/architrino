### Invocation Modes

The external solver should support two input modes:

- structured JSON for full-fidelity solving, regression fixtures, and app integration;
- and a compact command-line shorthand for quick experiments and batch runs.

The compact shorthand should stay intentionally short. The intended shape is:

- `--r [Pe2u3dW+2h4h...]`
- `--i [h.W-.1:1@...]`
- `--I [h.W-.1:1@...]`
- `--p [Pe2u3dW+2h4h...]`

Here:

- `--r` supplies authored reactants;
- `--i` supplies optional or preferred authored center-lane intermediates or center assemblies that may be skipped if a better closure exists without them;
- `--I` supplies stronger authored center-lane intermediates or center assemblies that the solver should use if any closure exists that can account for them;
- and `--p` supplies authored products.

`--i` and `--I` may be used together in one solver call. In that case, `--I` is the stronger constraint layer and `--i` remains a weaker preference layer.

Those concise strings should be treated as a convenience syntax over the same normalized solver request, not as a second independent model.

The authored middle lane should constrain the solve just like authored reactants and products do, but it should not admit arbitrary assembly kinds. For v1, both `--i` and `--I` should be limited to explicitly supported center-assembly families rather than "anything the user can name."

Recommended initial `--i` / `--I` families:

- authored `W+`, `W-`, and `Z`;
- authored `Unbound Architrinos` ledgers;
- and authored `Noether core` forms that the active model already supports as center assemblies.

Recommended non-goal for v1:

- do not let `--i` or `--I` become a generic slot for arbitrary composites or arbitrary recruited source material;
- do not treat `Higgs Cluster` as a default middle-lane `--i` or `--I` family;
- instead, treat authored `Higgs Cluster` as a reactant-side input via `--r` when the user really wants it authored, or as a solver-recruited spacetime source when the active recruitment policy permits it.

The compact string should also allow optional benign separators between tokens so humans can make distinct assemblies easier to read. The parser should ignore `.`, `,`, and `_` when they appear between valid tokens.

Recommended human-facing separator:

| Separator | Status | Notes |
| --- | --- | --- |
| `.` | preferred | no shift key, shell-safe, visually light |
| `,` | allowed | also shell-safe and easy to scan |
| `_` | allowed | readable, but less pleasant to type |

Examples:

| Notation | Meaning |
| --- | --- |
| `Pe2v` | compact form with no separators |
| `P.e2.v` | same input with preferred separators |
| `P,e2,v` | same input with comma separators |
| `h2.W-.P` | distinct assemblies made easier to scan |
| `P.e.av` | proton, electron, anti-neutrino |
| `1:1@.P.e` | explicit `Unbound Architrinos` ledger plus proton and electron |

Example command, free neutron decay with an added `4h` reactant:

| Form | Command |
| --- | --- |
| compact | `solver --r N4h --p Peav` |
| separated | `solver --r N.4h --p P.e.av` |

Current compact notation:

| Notation    | Meaning                   | Notes                                                              | PDG API Notation |
| ----------- | ------------------------- | ------------------------------------------------------------------ | ---------------- |
| `d1` or `d` | down quark                | generation I may omit the `1`                                      | `d`              |
| `d2`        | strange quark             | generation II down-family                                          | `s`              |
| `d3`        | bottom quark              | generation III down-family                                         | `b`              |
| `e1` or `e` | electron                  | generation I may omit the `1`                                      | `e-`             |
| `e2`        | muon                      | generation II charged lepton                                       | `mu-`            |
| `e3`        | tau                       | generation III charged lepton                                      | `tau-`           |
| `h`         | Noether core              | base core symbol                                                   | `n/a`            |
| `h2`        | Bi Binary                 | reduced `Noether core` form                                        | `n/a`            |
| `h3`        | Uni Binary                | reduced `Noether core` form                                        | `n/a`            |
| `2h`        | photon                    | two-core photon shorthand                                          | `gamma`          |
| `4h`        | Higgs cluster             | four-core Higgs-cluster shorthand                                  | `n/a`            |
| `e:p@`      | `Unbound Architrinos` ledger | explicit electrino:positrino count, with both sides always present | `n/a`            |
| `N`         | neutron                   | aligns with existing `Pro Neutron` support                         | `n`              |
| `P`         | proton                    | aligns with existing `Pro Proton` support                          | `p`              |
| `u1` or `u` | up quark                  | generation I may omit the `1`                                      | `u`              |
| `u2`        | charm quark               | generation II up-family                                            | `c`              |
| `u3`        | top quark                 | generation III up-family                                           | `t`              |
| `v1` or `v` | neutrino                  | generation I may omit the `1`                                      | `nu_e`           |
| `v2`        | muon neutrino             | generation II neutrino                                             | `nu_mu`          |
| `v3`        | tau neutrino              | generation III neutrino                                            | `nu_tau`         |
| `W+`        | `W+` boson                | two-character token                                                | `W+`             |
| `W-`        | `W-` boson                | two-character token                                                | `W-`             |
| `Z`         | `Z` boson                 | direct match                                                       | `Z`              |

The `PDG API Notation` column is a naming bridge for API alignment only. It is not a claim of exact one-to-one ontology, especially for solver-only constructs such as `h`, `h2`, `h3`, and the `e:p@` ledger token.

Generation numbers should be interpreted as family indices for fermions:

| Family letter | Generation I | Generation II | Generation III |
| --- | --- | --- | --- |
| `e` | electron | muon | tau |
| `u` | up quark | charm quark | top quark |
| `d` | down quark | strange quark | bottom quark |
| `v` | neutrino | muon neutrino | tau neutrino |

Polarity should be handled with `a` only:

| Notation form | Meaning |
| --- | --- |
| `x` | pro form is implied |
| `ax` | anti form |

Examples:

| Notation | Meaning |
| --- | --- |
| `P` | pro proton |
| `aP` | anti proton |
| `N` | pro neutron |
| `aN` | anti neutron |
| `e` | pro electron |
| `ae` | anti electron |
| `e2` | pro muon |
| `ae2` | anti muon |
| `v` | pro neutrino |
| `av3` | anti tau neutrino |
| `h` | pro `Noether core` |
| `ah` | anti `Noether core` |

`Unbound Architrinos` are the exception to that polarity rule. They use explicit ledger tokens of the form `e:p@` with no anti form.

The `h` notation now has two different numeric roles, and both should stay explicit:

| Notation form | Meaning |
| --- | --- |
| `nh` | `n` whole `Noether cores` |
| `hn` | a reduced `Noether core` form |

Current intended `h` family examples:

| Notation | Meaning |
| --- | --- |
| `h` | tri-binary `Noether core` |
| `h2` | Bi Binary |
| `h3` | Uni Binary |
| `2h` | two `Noether cores`, currently used as photon shorthand |
| `4h` | four `Noether cores`, currently used as Higgs-cluster shorthand |

For now, `2h` and `4h` are the only committed whole-core aggregate tokens. The grammar should not treat arbitrary `nh` forms as generally valid unless that aggregate family is expanded deliberately in a later revision.

`Unbound Architrinos` should be written with an explicit electrino:positrino ledger:

| Notation | Meaning |
| --- | --- |
| `1:1@` | one electrino and one positrino |
| `227:120@` | `227` electrinos and `120` positrinos |
| `227:0@` | `227` electrinos and zero positrinos |
| `0:120@` | zero electrinos and `120` positrinos |

Both sides of the ledger should always be present. If one side is zero, the zero should still be written explicitly. The one excluded case is `0:0@`, which should be forbidden as a meaningless null ledger. That keeps the grammar single-reading and avoids special omission rules such as trying to infer whether `227@` means `227:0@`, `0:227@`, or something else.

The choice of `@` for `Unbound Architrinos` is now intentional rather than provisional. It works well at the shell level because it is safe in unquoted command-line arguments, but it also carries a useful visual and conceptual resonance. The symbol reads like a curling or spiraling enclosure, which fits the intuition that a free electrino and positrino meeting in isolation would tend toward a tighter orbital closure. At the same time, the historical bookkeeping meaning of the at sign ties neatly into the solver's conservation and provenance ledger: `@` already carries the feel of accounting, relation, and counted association. That makes it a rare symbol that is compact, typeable, shell-safe, visually suggestive, and semantically aligned with the solver's charge-routing and ledger language.

This direction is simpler for the intended audience because it avoids a large inventory of unrelated one-letter symbols. A small set of family letters plus generation indices covers the fermion families cleanly, while `h`, `2h`, `4h`, and explicit `e:p@` ledgers preserve the assembly-side intuition.

For the `W` bosons, the preferred notation is the explicit two-character form `W+` and `W-` rather than encoding charge through case. That keeps the shorthand physically legible and consistent with the authored labels already used in the app and docs. `W+` and `W-` should be treated as atomic two-character tokens. Anti weak-boson forms should remain forbidden in this grammar: `W+` and `W-` already stand in antiparticle relation to each other, and `Z` is self-conjugate, so `aW+`, `aW-`, and `aZ` should not be introduced. For v1, the boson-core convention is fixed: `W+` carries anti `Noether core` provenance and `W-` carries pro `Noether core` provenance.

### Compact Grammar

The compact notation should be treated as a small lexer-first language rather than as ad hoc string guessing.

Preferred lexer rule:

- strip or ignore benign separators first: `.`, `,`, `_`, and whitespace;
- then tokenize left to right;
- use longest-match tokenization whenever two token families share a prefix;
- and reject the whole string if any character sequence cannot be consumed as exactly one valid token.

Current token families:

| Token family | Form | Notes |
| --- | --- | --- |
| fermion | `a? [eudv] [123]?` | `1` may be omitted only for generation I |
| nucleon | `a? P` or `a? N` | anti allowed for nucleons |
| weak boson | `W+`, `W-`, `Z` | `W+` and `W-` are atomic two-character tokens |
| core form | `a? h`, `a? h2`, `a? h3` | anti allowed only on these `Noether core` forms |
| whole-core aggregate | `2h`, `4h` | only these two aggregate forms are currently valid |
| free-architrino ledger | `[0-9]+:[0-9]+@` | explicit electrino:positrino ledger, both sides required |

Equivalent EBNF-style sketch:

```text
reaction_arg   := token { separator* token }
separator      := "." | "," | "_" | whitespace
token          := fermion | nucleon | weak_boson | core_form | whole_core_aggregate | free_architrino_ledger
fermion        := anti? family generation?
anti           := "a"
family         := "e" | "u" | "d" | "v"
generation     := "1" | "2" | "3"
nucleon        := anti? ("P" | "N")
weak_boson     := "W+" | "W-" | "Z"
core_form      := anti? ("h" | "h2" | "h3")
whole_core_aggregate := "2h" | "4h"
free_architrino_ledger := count ":" count "@"
count          := digit { digit }
```

Interpretation rules:

- `a` binds only to the single token immediately following it;
- `a` is currently valid for fermions, nucleons, and `Noether core` forms `h`, `h2`, and `h3`;
- generation digits belong only to the fermion families `e`, `u`, `d`, and `v`;
- prefix counts belong only to aggregate whole-core forms such as `2h` and `4h`;
- `Unbound Architrinos` use a dedicated two-sided ledger token `e:p@`;
- separators are optional for any adjacent token sequence whose left-to-right longest-match tokenization remains unambiguous;
- and a number must not try to play both a prefix-count role and a suffix-generation or suffix-core-form role on the same token.

### Ambiguity Discipline

The parser itself is not the hard part. The important requirement is that a human and a machine should see the same segmentation without guesswork.

The current grammar should therefore aim for:

- one obvious reading for every valid string;
- no silent reinterpretation through parser cleverness;
- no special omission rules that make zero or missing counts context-dependent;
- and explicit rejection of token shapes that would otherwise admit multiple readings.

Current recommended conflict checks:

| Potential conflict          | Why it is risky                                                           | Recommended rule |
| --------------------------- | ------------------------------------------------------------------------- | ---------------- |
| `2h2`, `4h3`, `3h2`         | mixes prefix-count and suffix-core-form roles on one token                | forbid entirely  |
| `a2h`, `a4h`, `2ah`         | unclear whether anti applies to an aggregate or to a core token inside it | forbid entirely  |
| `aae`, `aav2`, `aah`        | stacked anti prefixes add no meaning and create parser noise              | forbid entirely  |
| `aW+`, `aW-`, `aZ`, `a1:1@` | anti is not currently defined for these families                          | forbid entirely  |
| `e0`, `e4`, `u9`, `v7`      | generation outside `1`, `2`, `3`                                          | forbid entirely  |
| `0h`                        | zero-count whole-core aggregate is not meaningful in the current grammar  | forbid entirely  |
| `3h`, `5h`, `12h`           | only `2h` and `4h` are currently committed aggregate tokens               | forbid entirely  |
| `0:0@`                      | null `Unbound Architrinos` ledger carries no usable content                  | forbid entirely  |
| `h23`, `u23`, `e12`         | visually suggests one token but leaves trailing digits ambiguous          | forbid entirely  |
| `@`, `2@`, `227@`           | omitted ledger side makes the free-architrino token ambiguous             | forbid entirely  |
| `:120@`, `227:@`            | omitted ledger side creates a special-case parse                          | forbid entirely  |
| `227:120@3`, `1:1@2`        | payload after `@` collides with the token boundary                        | forbid entirely  |

Operational lexer guidance:

- treat `W+` and `W-` as atomic two-character tokens;
- recognize `h2` and `h3` before bare `h`;
- recognize `2h` and `4h` as committed aggregate tokens before testing bare `h`;
- recognize `[digits]:[digits]@` as one `Unbound Architrinos` ledger token that ends at `@`;
- do not require separators around any token family when the surrounding token boundaries are already unambiguous under longest-match tokenization;
- and reject any `@` form that does not contain both explicit ledger sides before the trailing `@`.