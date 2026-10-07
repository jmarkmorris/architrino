# Closure of the independently certified E prefix

Claim grade: measured operational closure and exact serialization checks, supplementing the [accepted time-ten proof](authorized-cases-ten-hour-reference-e-time10-acceptance.md), SHA-256 `db0c3c682d70d1fb9270a80b8395f38fc2ac9151158bf9f6630760f1a254cac6`. The coordinator accepted that proof and instructed controlled stop of both exact owned leases. No proposed time-fifteen completion is asserted.

The owned supervisor stopped residual lease `6168ba99-13e7-41d4-992b-f43fdec45a28` at 08:11:59.876 UTC, after 4,623.498 seconds, by authenticated `stop --run-id` with reason `accepted_time10_prefix_complete`. Its target ended by SIGTERM, as expected for the frozen instrument without a cooperative signal handler. The lease reports `processGroupClosed: true` and zero stderr bytes. Its retained stream has no footer. This is a deliberately stopped immutable prefix, not an instrument failure or a completed full allocation.

The same supervisor stopped independent error lease `47cdc13e-e600-405c-9e70-42098d737a0e` at 08:12:04.677 UTC, after 4,314.826 seconds. The target's cooperative handler wrote its footer and exited zero; the lease reports `processGroupClosed: true` and zero stderr bytes. Both foreground sessions have returned. No reference process from these two runs remains active.

The known-tested [ledger](../evidence/authorized-cases-ten-hour-reference-e-prefix-ledger-v2.py) and [exact face binder](../evidence/authorized-cases-ten-hour-reference-e-face-binding.py) were rerun after both groups closed. Their final local receipts, under `.local-data/master-equation-closure/braid-program/authorized-cases-ten-hour/reference/`, are:

- `e-closed-ledger-v1.json`, SHA-256 `1cf6a93206c83cffef68268c5eaeaf38f28aeaacf227aeaaa9f005a7d87da104`;
- `e-closed-face-binding-v1.json`, SHA-256 `135e05b3ae205ea585b0e3ccebab6ecb7ec0ef2a0263b34fd665c8caa193dd0e`.

They bind 1,651 paired cells through exact face $2973260097251861/281474976710656$, approximately $10.563141818138394$. The complete residual file is 4,142,441 bytes with SHA-256 `08daab7094d0ae826f2e51c19d3dc6342f16b8021da60fa230e05a513eeb3dd4`. The complete error file, including its stopped footer, is 13,845,751 bytes with SHA-256 `5d581e1aac928c0bdbacce007866467fd6f45664c6144a813b5451a77d0755dc`. File hashes equal the ledger's complete-line prefix hashes, so neither retained file has an unaccounted partial final line.

The error footer records `failure: null`, 1,651 consumed cells and all 4,142,441 residual bytes with the same residual digest. The final ledger independently rehashes those consumed bytes and every individual residual line bound by an error row. The face binder again checks the original exact seed join, all four members' source knot faces, contiguous receiving indices and emitted face identity. These checks preserve the distinction between serialization provenance and the independently admitted mathematical recurrence.

Finally, direct `head -c` plus `shasum -a 256` checks of the earlier accepted 3,944,000-byte residual prefix and 13,099,570-byte error prefix reproduce the time-ten assessment's digests `4e8b9f34e393432b9c75753c20e6e105b65d45ad407cec9e671c82535dc7a744` and `fbb4aa5f13c09a950c2354e90428fecaf2c26f698079b94b4b538110272a531e`. The exact time-ten position bound is unchanged. Additional committed cells during review and shutdown do not strengthen the scientific claim made there. All earlier sources, failed controls, subject values and frozen reference versions remain preserved.
