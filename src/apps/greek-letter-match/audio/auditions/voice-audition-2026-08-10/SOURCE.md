# Greek Letter Match Voice Audition Provenance

Status: **review-only voice audition; Marin selected as the voice direction; not routed into the app**.

This packet compares three authorized OpenAI built-in voices on exactly Delta, Nu, and Phi. The user selected `marin` as the voice direction on 2026-08-10; the resulting [full 24-letter Marin review set](../../candidates/openai-marin-2026-08-10/REVIEW.md) now awaits individual listening decisions. This packet does not replace or modify the current deployed audio, the existing Coral review candidates, the `Coral review` app option, or the active source-use disclosure.

## Diagnostic Finding

The perceived graininess is not attributable to the Greek Letter Match browser code alone.

- The original Coral API responses are AAC-LC at 24 kHz mono and approximately 64–69 kbit/s. They are already lossy before repository processing, so the retained evidence cannot separate synthesis texture from the API's first AAC encode.
- The existing Coral review files preserve duration to within 0.001 second, so the pipeline did not time-stretch the words. Their 44.1 kHz sample rate is an upsample of a 24 kHz source and cannot restore source detail.
- Existing review processing applies linear loudness gain to reach about `-20 LUFS`, boosting the raw clips by approximately 1.8–10.8 dB, then performs a second AAC encode at approximately 114–122 kbit/s mono. No measured clip peaks or contains invalid samples. The gain can make existing synthetic or compression texture more audible, and the second lossy encode can add texture, but neither creates the voice's intonation or the long Nu vowel.
- The app uses an ordinary browser `Audio` object without equalization, rate change, pitch processing, or an `AudioContext`. A Nu file fetched through the local app server had the same SHA-256 digest as the repository file. The browser therefore receives the recorded bytes unchanged; device and speaker response can still affect what a listener hears.

Plainly: the voice model and its first delivered audio are the primary place to improve naturalness and intonation. The old conversion path is a plausible secondary contributor to graininess because it amplifies and recompresses an already compressed source. The browser path is not supported as the cause.

## Audition Generation

- Generation date: 2026-08-10.
- Generation system: [OpenAI Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create).
- Model: `gpt-4o-mini-tts-2025-12-15`.
- Built-in voices: `marin`, `cedar`, and `shimmer`; no custom, cloned, imitative, demographic, or person-referential voice was requested.
- Speed: `1.0` for every request.
- Raw response format: uncompressed WAV, PCM signed 16-bit little-endian, 24 kHz, mono, 384 kbit/s.
- Browser-review format: uncompressed WAV with the same PCM/sample-rate/channel properties after linear-only loudness normalization to approximately `-23 LUFS`. No lossy recoding, upsampling, time stretching, peak limiting, or dynamics processing was used.
- Credential handling: the configured API credential was read from the environment and was not written to any request, record, or media file.

Official OpenAI documentation lists all three as built-in voices and recommends `marin` or `cedar` for best quality. That recommendation motivated their inclusion but does not predict the user's preference or guarantee a quality outcome.

The shared production instruction was:

`Use a warm, clear, gentle, non-harsh educational delivery with natural intonation and strong articulation. Speak only the requested Greek letter name. Do not sing, whisper, dramatize, imitate any person, repeat the word, or add any other sound.`

| Letter | Target | Exact input | Letter-specific instruction |
| --- | --- | --- | --- |
| Delta | `DEL-tuh` | `Delta` | `Pronounce Delta as DEL-tuh, stressing the first syllable.` |
| Nu | ordinary American-English `NOO`, like *new* | `New` | `Pronounce Nu as ordinary American English NOO, like the word new. Keep it short and plain; do not draw out the vowel or add a Y glide.` |
| Phi | `FYE`, rhyming with *pie* | `Fye` | `Pronounce Phi as FYE, rhyming with pie; do not say fee.` |

## Technical QA

Every browser-review file is uncompressed PCM WAV at 24 kHz mono. Integrated loudness spans `-23.04` to `-22.98 LUFS`; measured peaks span `-9.55` to `-3.69 dBFS`. Normalization was linear for every file.

| Voice | Letter | Duration | Loudness | Peak | Local on-device transcript |
| --- | --- | ---: | ---: | ---: | --- |
| `marin` | Delta | 0.850 s | -23.00 LUFS | -4.09 dBFS | `Delta.` |
| `marin` | Nu | 0.750 s | -23.03 LUFS | -9.55 dBFS | `New.` |
| `marin` | Phi | 0.750 s | -23.01 LUFS | -6.22 dBFS | `Fi.`; alternatives include `Fie.` |
| `cedar` | Delta | 1.000 s | -22.98 LUFS | -3.69 dBFS | `Delta.` |
| `cedar` | Nu | 1.200 s | -23.00 LUFS | -9.07 dBFS | `New.`; alternatives include `No.` |
| `cedar` | Phi | 1.500 s | -22.98 LUFS | -5.75 dBFS | `Fi.`; alternatives include `Phi.` |
| `shimmer` | Delta | 1.000 s | -23.04 LUFS | -5.60 dBFS | `Delta.` |
| `shimmer` | Nu | 0.800 s | -23.00 LUFS | -8.41 dBFS | `New.` |
| `shimmer` | Phi | 1.700 s | -23.01 LUFS | -9.52 dBFS | `Fi.`; alternatives include `Fie.` |

The on-device transcript is a diagnostic screen, not human listening approval. It cannot establish naturalness, warmth, graininess, or exact vowel quality.

## SHA-256

| Voice | Letter | Raw WAV | Browser-review WAV |
| --- | --- | --- | --- |
| `marin` | Delta | `b7df03eb65803eb1622f598fa3e4394b31eed006dcca2be9724e0270a3c47fb1` | `1b268dd0cdcc3f2dc5e7a274b3b8ddc170bbf41933a64f59957a5e60b6f6da55` |
| `marin` | Nu | `c5932e642ff1bddb39876c15adf0593c2130646d778885bd72bb3f5deddc7cba` | `07af696a28078901c2f5259e0a28e119df5f66f2f29f9cca34189ad3a7eae136` |
| `marin` | Phi | `36d1db745798988a3e1e52f9d43a2df91aa1e70f8f65700ccabb0b05f71243a0` | `0557c3a89b00a601203304aaa581a9890c66c4e4391e466bd41559fd4ded22ee` |
| `cedar` | Delta | `75a5f59788ca250f9e365cc05dff9046ac6da6b64a26bed5cac7b7432d03858d` | `d97f162345d2db931dd1c14cac7c06e727ce8a30ddaf6bffcd29080fe22f1956` |
| `cedar` | Nu | `d84684efb42915367a66a9a4d023a0fd919019698216547713c843c70bc17d96` | `c7651453a3f4e21af5df1c574f576af5c0f0ca5942c0f8f7c449489c795f3ba9` |
| `cedar` | Phi | `48e43ee512c58349cbf151408dd8caa1d8817bdf054b6d0fbb0809ce25c74016` | `f1ccf97766126cfd67429864a1097f61b769a271defb41c3d6b6c759606998c0` |
| `shimmer` | Delta | `9f51819b8a834661de1a3bd5e2bc1be92afb5a5597ad6602c5d829f56bfff083` | `09e3ab33e4228120cfe1d195463fe1a9f1b71f6842d3c50426b1394305b512e9` |
| `shimmer` | Nu | `a790dcc85ebf242a086a8eafed36e3de4afa9d15da01494d28cfbb829aeee7db` | `36f22b193e48088d1a21fd476686e3be3ff3cbd3048335f4db65be11ef909885` |
| `shimmer` | Phi | `3aa2d794b06a71953b925f2cef91e1a15f93698d07118f848c5674e2c61c5921` | `c124ce947b40e101e09988e9305a7f1dd4b4537ed5173ec1303262a12643d513` |

This packet records generation, technical checks, and the human selection of Marin as the voice direction. It does not accept any individual replacement clip, establish legal status, or change any active audio source.
