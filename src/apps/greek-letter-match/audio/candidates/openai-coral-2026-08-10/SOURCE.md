# Greek Letter Match Original-Audio Candidates

Status: **unreviewed candidates; available through a temporary review mode, not deployed as the default**.

These seven files are newly generated pronunciation candidates for human listening review. They do not replace the active files in the parent audio directory. The app loads the existing recordings documented in [the active source record](../../SOURCE.md) by default and uses these candidates only when a user explicitly selects the temporary `Coral review` option. Do not move these files into the active directory or change the active source-use disclosure until all seven candidates receive human listening approval.

## Temporary App Review Route

Open **It's Greek to Me!**, find **Pronunciation audio** under **Game setup**, and choose **Coral review**. The app then uses these unreviewed candidates only for Delta, Epsilon, Mu, Nu, Sigma, Tau, and Phi; every other letter continues to use its current recording. Choose **Current** to return to the default audio. This review route does not accept, deploy, or replace any recording.

## Generation Provenance

- Generation date: 2026-08-10.
- Generation system: [OpenAI Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create).
- Model: `gpt-4o-mini-tts-2025-12-15`.
- Voice: `coral`, an OpenAI built-in voice; no custom, cloned, or imitative voice was used.
- API response format: AAC-LC in ADTS, 24 kHz, mono.
- Review-file transform: FFmpeg resampling and AAC encoding to M4A, 44.1 kHz, mono, nominal 128 kbit/s, with loudness normalization targeting `-20 LUFS`, `-3 dBTP`, and `7 LU LRA`.
- Credential handling: the API credential was read from the configured environment and was not written to this record or any media file.

The shared delivery instruction was: `Use a clear, neutral educational delivery with consistent pace and level. Do not add an introduction or any extra words.`

| File | Displayed letter | Target pronunciation | Exact API input | Pronunciation instruction |
| --- | --- | --- | --- | --- |
| [delta.m4a](delta.m4a) | Δ δ — Delta | `DEL-tuh` | `Delta` | `Speak only the single Greek letter name. Pronounce it DEL-tuh. Stress the first syllable.` |
| [epsilon.m4a](epsilon.m4a) | Ε ε — Epsilon | `EP-sih-lon` | `Epsilon` | `Speak only the single Greek letter name. Pronounce it EP-sih-lon. Stress the first syllable; do not add any sound before the initial E.` |
| [mu.m4a](mu.m4a) | Μ μ — Mu | `MYOO`, like *mew* | `Mew` | `Speak only the word Mew, with a clear initial M consonant. This is the target pronunciation of the Greek letter Mu: MYOO.` |
| [nu.m4a](nu.m4a) | Ν ν — Nu | `NOO` | `Nu` | `Speak only the single Greek letter name. Pronounce it NOO, with no Y glide.` |
| [sigma.m4a](sigma.m4a) | Σ σ/ς — Sigma | `SIG-muh` | `Sigma` | `Speak only the single Greek letter name. Pronounce it SIG-muh. Stress the first syllable.` |
| [tau.m4a](tau.m4a) | Τ τ — Tau | `TOW`, rhyming with *cow* | `Tau` | `Speak only the single Greek letter name. Pronounce it TOW, rhyming with cow.` |
| [phi.m4a](phi.m4a) | Φ φ — Phi | `FYE`, rhyming with *pie* | `Phi` | `Speak only the single Greek letter name. Pronounce it FYE, rhyming with pie; do not say fee.` |

The `Mu` candidate uses the phonetic API input `Mew` deliberately. The first `Mu` generation used `Mu`, but local transcription resolved it as *New*. That failed the automated pronunciation screen and was discarded before this review set was recorded.

## Technical QA

All seven review files decode as AAC-LC in M4A, 44.1 kHz, mono. Integrated loudness is within `0.10 LU` across the set. Apple SpeechAnalyzer ran locally and on-device as a pronunciation screen; its transcript is a diagnostic, not human listening approval.

| File | Duration | Integrated loudness | True peak | Local transcript |
| --- | ---: | ---: | ---: | --- |
| `delta.m4a` | 1.024 s | -19.97 LUFS | -2.15 dBTP | `Delta.` |
| `epsilon.m4a` | 1.152 s | -20.04 LUFS | -3.97 dBTP | `Epsilon.` |
| `mu.m4a` | 1.706 s | -20.00 LUFS | -8.99 dBTP | `Mew.` |
| `nu.m4a` | 1.322 s | -20.04 LUFS | -6.43 dBTP | `New.` |
| `sigma.m4a` | 1.749 s | -20.07 LUFS | -7.15 dBTP | `Sigma.` |
| `tau.m4a` | 1.664 s | -20.04 LUFS | -3.29 dBTP | `Tao.`; alternatives included `Tau.` and `Tow.` |
| `phi.m4a` | 0.981 s | -20.03 LUFS | -4.72 dBTP | `Fie!` |

## SHA-256

The first digest is the raw API AAC response retained only in the generation session; the second is the repository review M4A.

| File | Raw AAC | Review M4A |
| --- | --- | --- |
| `delta` | `b2685487008c464043ecc91ce6dc5619481767bfcb36b21d29e6cfdf060a903e` | `1b209cb9c7851b8452d89065887ab1ee81b048af174a60dd29f8a2052be3f6cf` |
| `epsilon` | `219163f9264c1e0b1d366a1ab24989875c104548eda7531ed4e10782f60274bf` | `a56af5c2f4d84842fab5ed491f7462383527738a2fe559c6167333feeba4903c` |
| `mu` | `cfbd0d956b7aed39a728e8b43d332159d4eafeba94b20a09e6dafbffa2fbc58e` | `5ee74d394317e9863903d773e54db88c905f4c9e63ffe2b35d42cd9437e67f10` |
| `nu` | `c156bac7c7f43d012f8d7ff80ed9ee0b09f65265b85e7242c891d1b308a5ff0e` | `4b43aa919103cde1d85323f3e495ec91fe7e9bc8a4a93a97f8635605ac200178` |
| `sigma` | `706c7c85b27d9bc58ff5b8763a04bac9e2ae6287854812403f3364fbe3f75c0f` | `ebb0aa40ad85ded891a541e31d944dedcf5a10531eea8b12e9281ed0feec5331` |
| `tau` | `2be3d402ee530d679057ad6b8da575e08966d274ed40585cea884612479b1eb9` | `71cb4de20d855a2bac6ee585f30869801d9fbe3e2b27800bef6cf2cb9e5027f0` |
| `phi` | `27bb8773fd4c699e646a27a34f705a8ace19bc94abc79ef29d5c134d4a127825` | `b05a71a623f8199a793015bdae870b37e4a06e630b534b07f78aca3a29d95c2e` |

This provenance record documents how the candidates were generated and transformed. It is not a legal finding about copyright status, provider terms, or the superseded third-party recordings.
