# Greek Letter Match production pronunciation audio

The active production set consists of 24 AI-generated English-language Greek-letter pronunciation WAVs. Each deployed file is byte-identical to the normalized browser file in the [full neutral-international review packet](candidates/openai-marin-neutral-international-2026-08-11/REVIEW.md); that packet's [`SOURCE.md`](candidates/openai-marin-neutral-international-2026-08-11/SOURCE.md) supplies the exact inputs, instructions, checksums, processing contract, and rejected-attempt evidence.

## Current production set

- Generation system: [OpenAI Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create).
- Model: pinned snapshot `gpt-4o-mini-tts-2025-12-15`.
- Voice and delivery: OpenAI's built-in `marin` voice with a restrained neutral international English accent/style instruction. Neutral international is an instruction applied to Marin, not a separate voice or a claim about a person's demographic identity.
- Generation date: 2026-08-11.
- Format: PCM signed 16-bit little-endian, 24 kHz, mono WAV after lossless, linear-only loudness normalization.
- Runtime scope: all 24 canonical Greek-letter names. Uppercase and lowercase forms share the same letter-name file; sigma's lowercase forms share `sigma.wav`.

These recordings are AI-generated speech, not human-authored recordings and not source evidence for factual, legal, or scientific claims. The built-in voice does not represent an independent legal person or academically accountable author.

The standalone media-license label remains pending an explicit choice between CC0, as a public-domain dedication where legally possible with a permissive fallback, and CC BY 4.0, for open reuse with attribution. The repository's MIT software license is not asserted as the license for these audio files. This record does not guarantee that copyright exists in the recordings or that either licensing approach has the same legal effect in every jurisdiction.

## Historical production sources (retired 2026-08-11)

Before the AI-generated production set was deployed, the game used 24 AAC-in-M4A recordings from the two source groups below. Their files were removed from the active runtime after all 24 new mappings and browser playback were verified. This history preserves the original license and source-use record; retirement is not a legal finding about the prior uses.

### Wikimedia Commons recordings

Seventeen source OGG recordings were retrieved from Wikimedia Commons and converted to AAC-in-M4A with FFmpeg for consistent playback in the former deployed game. The spoken content was not edited. The conversion was a format change, and the converted files retained the licenses listed below. Files derived from Creative Commons ShareAlike sources were redistributed under their respective source licenses.

| Letter | Source recording | Author | Source license | Source OGG SHA-1 |
| --- | --- | --- | --- | --- |
| alpha | [`En-us-alpha.ogg`](https://commons.wikimedia.org/wiki/File:En-us-alpha.ogg) | Dvortygirl | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | `7330c4a84eb0a34744da6372bc43cb88f0a044b8` |
| beta | [`En-us-beta.ogg`](https://commons.wikimedia.org/wiki/File:En-us-beta.ogg) | 0x0077BE | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `0a092fb3e914c45d9881d8bee17ec7ad00a8ed08` |
| chi | [`En-us-chi.ogg`](https://commons.wikimedia.org/wiki/File:En-us-chi.ogg) | Xnux, based on the source copyright claim | Public domain | `317b06f833e1b08d053d7a3535501d1a76de4ecd` |
| eta | [`En-us-eta.ogg`](https://commons.wikimedia.org/wiki/File:En-us-eta.ogg) | 0x0077BE | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `3e9c0c1d987f1ead237864950179b994d4ecaf8a` |
| gamma | [`En-us-gamma.ogg`](https://commons.wikimedia.org/wiki/File:En-us-gamma.ogg) | 0x0077BE | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `198271ebff9221b68edd7b387bcf56e718dbe427` |
| iota | [`En-us-iota.ogg`](https://commons.wikimedia.org/wiki/File:En-us-iota.ogg) | Dvortygirl, based on the source copyright claim | Public domain | `1a7db65c6f8523c2fd755cfaff9f3a67e0c9966d` |
| kappa | [`En-us-kappa.ogg`](https://commons.wikimedia.org/wiki/File:En-us-kappa.ogg) | Dvortygirl | Public domain | `df878e197a3b76e10836d6ffadeac1e80868197b` |
| lambda | [`En-us-lambda.ogg`](https://commons.wikimedia.org/wiki/File:En-us-lambda.ogg) | Dvortygirl | Public domain | `da384c03f04e72abbea81d7d0d79f3d4a9953db3` |
| omega | [`En-us-omega.ogg`](https://commons.wikimedia.org/wiki/File:En-us-omega.ogg) | 0x0077BE | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `c72cafeddf70c4c96767a07bb5fb0064c2c9a3b4` |
| omicron | [`En-us-omicron.ogg`](https://commons.wikimedia.org/wiki/File:En-us-omicron.ogg) | Dvortygirl | Public domain | `438ebd605924618c0f14d4421b23fec3fa9e4e39` |
| pi | [`En-us-pie.ogg`](https://commons.wikimedia.org/wiki/File:En-us-pie.ogg) | Dvortygirl, based on the source copyright claim | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | `cdfa1ffa9fa9c655dd85693550e0b2d3d1fbfc04` |
| psi | [`En-us-psi.ogg`](https://commons.wikimedia.org/wiki/File:En-us-psi.ogg) | Dvortygirl, based on the source copyright claim | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | `81bdc47e879ceae692a867cdc9b2412cda560b33` |
| rho | [`En-us-rho.ogg`](https://commons.wikimedia.org/wiki/File:En-us-rho.ogg) | Dvortygirl, based on the source copyright claim | Public domain | `798b864422204e3902b4ad4870e5010d7aceb9e0` |
| theta | [`En-us-theta.ogg`](https://commons.wikimedia.org/wiki/File:En-us-theta.ogg) | Dvortygirl, based on the source copyright claim | Public domain | `ca2beaab3afb41df3ac0df6e8d3dd95a20edf58d` |
| upsilon | [`En-us-upsilon.ogg`](https://commons.wikimedia.org/wiki/File:En-us-upsilon.ogg) | Paul2520 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | `e047ba080045760e9decd58d86d5670b290ffe72` |
| xi | [`En-us-xi.ogg`](https://commons.wikimedia.org/wiki/File:En-us-xi.ogg) | Dvortygirl, based on the source copyright claim | Public domain | `8426936043b1b14df632a192898a31a1ccd03256` |
| zeta | [`En-us-zeta.ogg`](https://commons.wikimedia.org/wiki/File:En-us-zeta.ogg) | 0x0077BE | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `cc8ee876c2735d8e33aba960bd984010a7dcc648` |

### GreekLetterLearner recordings

The remaining seven former production recordings were retrieved from [TechNolaByte/GreekLetterLearner](https://github.com/TechNolaByte/GreekLetterLearner/tree/main/audio) at source commit `12e95111206d10c7c145a95ec821a55cc01b1032`.

Only individual Greek-letter recordings were copied. The upstream game's effects, hints, alphabet recording, scripts, markup, and styles were not copied. The files were renamed from Greek-symbol filenames to ASCII letter names so their GitHub Pages URLs remain simple and stable. The upstream repository did not contain a license when these files were retrieved. For this limited, item-specific use, the project records a good-faith reliance on U.S. fair use rather than an open license or permission. This record states the project's basis for the use; it is not a legal determination, an open-source license, or permission for downstream reuse.

| Upstream filename | Former deployed filename |
| --- | --- |
| `δ.m4a` | `delta.m4a` |
| `ε.m4a` | `epsilon.m4a` |
| `μ.m4a` | `mu.m4a` |
| `ν.m4a` | `nu.m4a` |
| `σ (ς).m4a` | `sigma.m4a` |
| `τ.m4a` | `tau.m4a` |
| `φ.m4a` | `phi.m4a` |
