# Greek Letter Match Marin Accent Audition Provenance

Status: **review complete; neutral international English is the human-selected accent direction; every file remains review-only and no production or app route is changed by this record**.

Open [review.html](review.html) for the listening matrix. The four condition labels describe requested rendering instructions only. They do not identify the built-in voice with a demographic group, imitate or reference a person, rank cultures, or establish that a generated rendition represents every speaker of an English variety.

## Human selection

On 2026-08-11, the user selected the neutral international English condition as the preferred accent direction after listening to the four-condition audition. General American English, Indian English, and British English were not selected for this purpose. This is a comparative human preference, not a technical measurement, cultural ranking, demographic claim, or acceptance of a full-alphabet replacement. The separately approved 24-letter baseline Marin set remains unchanged and 24/24 human-approved. Generating a 24-letter neutral-international set requires a separate explicit decision.

## Constant generation and processing contract

- Generation date: 2026-08-11.
- Generation system: [OpenAI Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create).
- Model: pinned snapshot `gpt-4o-mini-tts-2025-12-15`.
- Built-in voice: `marin`; no custom, cloned, imitative, demographic, or person-referential voice was requested.
- Speed: `1.0` for every request.
- Raw response: uncompressed WAV.
- Browser-review output: PCM signed 16-bit little-endian, 24 kHz, mono, 384 kbit/s WAV.
- Processing: `ffmpeg` `loudnorm=I=-23:TP=-3:LRA=7:linear=true`, retaining 24 kHz mono PCM. No lossy transcode, upsampling, time stretching, limiter, dynamics processing, or post-synthesis cadence editing was used.
- Initial review volume: `0.8` for every player on the comparison page.
- Credential handling: the configured API credential was read from the environment and was not written to the request record or media files.

The exact shared instruction was:

`Use a warm, clear, gentle, non-harsh educational delivery with natural intonation and strong articulation. Speak only the requested Greek letter name. Do not sing, whisper, dramatize, imitate or reference any person, repeat the word, or add any other sound.`

The final input and letter instruction are identical across all four conditions:

| Letter | Visible target | Exact input | Exact letter-specific instruction |
| --- | --- | --- | --- |
| Eta | connected `AY-tuh` | `Eta` | `Say Eta as one naturally connected two-syllable word: AY-tuh, /ˈeɪtə/. The first syllable is the long-A sound in day, /eɪ/, never the long-I sound in eye, /aɪ/. Join AY directly to tuh with ordinary smooth timing. Do not pause or break between syllables, do not use a spelling-out cadence, and do not draw out the first syllable. Use normal conversational pacing.` |
| Mu | `MYOO`, like *mew* | `Mew` | `Pronounce Mu as MYOO, like the word mew, with a clear initial M consonant.` |
| Nu | `NOO`, like *new* | `New` | `Pronounce Nu as ordinary American English NOO, like the word new. Keep it short and plain; do not draw out the vowel or add a Y glide.` |
| Xi | `ZYE`, rhyming with *eye* | `Zai` | `Pronounce the Greek letter Xi as ZYE, rhyming with eye, in one syllable.` |
| Upsilon | `OOP-sih-lon` | `Upsilon` | `Pronounce Upsilon as OOP-sih-lon, stressing the first syllable.` |
| Phi | `FYE`, rhyming with *pie* | `Fye` | `Pronounce Phi as FYE, rhyming with pie; do not say fee.` |
| Chi | `KYE`, rhyming with *sky* | `Kai` | `Pronounce Chi as KYE, rhyming with sky.` |
| Psi | `SYE`, like *sigh* | `Sigh` | `Pronounce Psi as SYE, like the word sigh, with a silent P.` |

Chi initially used the canonical spelling `Chi`, matching the full Marin packet, but two bounded attempts in every condition locally screened as *she/chee* rather than the approved KYE target. Those raw and browser WAVs are retained under `rejected/{raw,browser}/{condition}/chi-v{1,2}.wav`. The final comparison uses the constant phonetic input `Kai` in all four conditions; the accent/style instruction remains the only variable between the four final Chi files.

| Condition | v1 raw / browser SHA-256 | v2 raw / browser SHA-256 |
| --- | --- | --- |
| General American | `88bbea4c244aa7a6d6f5b9d4bb7da3af8dd8dd8b63d9bed1f549111c53edfa3a` / `2250adb0e2b06e84b4e57d72dcbc7867630c7ece179deddbef340efe67e75e16` | `8fbaa3c6ae99d6891a247576405fc085cc089af660062bce4e6be1b7849ce098` / `cb7d263aec1d0eef08df54446a61699e9fea26ef0fb4b626ae93df760438235f` |
| Indian English | `f66388fd4d16c38e4d5db2e78f9ff79a58e63a8d132c1f63ceab1ec485f22d62` / `2fef15a28e0d8d94cb72993ddf5100f564c9f3ce43b766e43950b49447ff625c` | `dce5ca38ae7b1023d10255bd13dc26ffc2bbbec30b1a26aa717e632a0bf12cab` / `47ec8f70167062a2be5896322134a1cc08dd00a85b4ee1492f83af01182d5c79` |
| British English | `a120ad546dd0f6930981117ec68e556b0cd30ed10253b03182e156f76e4da51a` / `966b8f7a5c1598b3ac6bdf4fdb13ba102831b331299ac28827839a69d18fea03` | `8b71d39d8c4bbf26f624473f3feace2870707bab51899733fbc26a147a3498f2` / `e2d94e3e0a5686a7f8c1a25f1ef10a8c9a7eca4fc30a1356c99fa38ff03d7d4c` |
| Neutral international | `74ee569e0fd656b74ec8986196af166f48c47a3a6bc615871b6c16ea0a4ab08f` / `65bc563e6b40df8546e77a9664eed37e4ffe09e0cf6dbbe9df9ed36be5365e48` | `f27797664361515ee7ad15670b06363dfbf053ef78e70394bf17706e371597e9` / `ba7c2a3c4bdb47a887f98ac8aeff57244a3eb44cdaa0b458cb0d7b6e83d45e1e` |

## Variable accent/style instruction

Exactly one of these sentences was appended to the same shared and letter-specific instructions:

| Condition | Directory | Exact variable instruction |
| --- | --- | --- |
| General American English | `general-american` | `Render the word in restrained, clear General American English. Favor intelligibility and careful enunciation; avoid caricature, exaggeration, or any imitation of a person.` |
| Indian English | `indian-english` | `Render the word in restrained, clear Indian English. Favor intelligibility and careful enunciation; avoid caricature, exaggeration, or any imitation of a person.` |
| British English | `british-english` | `Render the word in restrained, clear British English. Favor intelligibility and careful enunciation; avoid caricature, exaggeration, or any imitation of a person.` |
| Neutral international English | `neutral-international` | `Render the word in restrained, neutral international English intended for broad intelligibility. Favor careful enunciation; avoid stylization, caricature, exaggeration, or any imitation of a person.` |

## Technical and pronunciation screening

All 32 final browser WAVs decode as PCM signed 16-bit little-endian at 24 kHz mono and 384 kbit/s. Durations span 0.800–2.500 seconds, integrated loudness spans -23.12 to -22.95 LUFS, and sample peaks span -12.50 to -3.01 dBFS.

At a 30 ms minimum, `-35 dB` silence screening found only four short internal low-level intervals: General American Upsilon 48.5 ms, Indian English Eta 31.3 ms, Indian English Upsilon 37.9 ms, and neutral international Upsilon 59.7 ms. At `-40 dB`, only the neutral international Upsilon interval remains, at 57.2 ms. No Eta condition contains a large inter-syllable gap comparable to rejected Eta v3's approximately 0.34-second pause.

The local on-device recognition screen returned the following primary text. Expected homophone spellings are retained rather than rewritten. General American Eta returned no transcript in two bounded attempts; this is an inconclusive screen, not evidence of silence or mispronunciation. Final Chi uses `Kai` and screens as `Kai` in three conditions; neutral international returns the homophone `Hi` with `Kai` among alternatives.

| Letter | General American | Indian English | British English | Neutral international |
| --- | --- | --- | --- | --- |
| Eta | no transcript | `Eta.` | `Eta.` | `Ada.` |
| Mu | `Mew.` | `Meal.`; `Mew.` among alternatives | `Mew.` | `Mew.` |
| Nu | `New.` | `New.` | `New.` | `New.` |
| Xi | `Zai.` | `Zai.` | `Zai.` | `Zai.` |
| Upsilon | `Upsilon.` | `Upsilon.` | `Upsilon.` | `Upsilon.` |
| Phi | `Fie.` | `Fie.` | `Fi.`; *bye/five* among alternatives | `Fie.` |
| Chi | `Kai.` | `Kai.` | `Kai.` | `Hi.`; `Kai.` among alternatives |
| Psi | `Sigh.` | `Sigh.` | `Sigh.` | `Sigh.` |

This screen supports pronunciation plausibility and catches gross target failures; it cannot establish naturalness, accent quality, cultural representativeness, or acceptance. Human listening is the authority for this audition.

## Final file manifest and SHA-256

Each row identifies `raw/{condition}/{letter}.wav` and `browser/{condition}/{letter}.wav`.

| Condition | Letter | Duration | Loudness | Peak | Raw WAV SHA-256 | Browser WAV SHA-256 |
| --- | --- | ---: | ---: | ---: | --- | --- |
| general-american | eta | 1.050 s | -22.95 LUFS | -8.05 dBFS | `578c8bcd1dc1561b258a45379e679a40d43cc4b21f47d37cf55783c9e136ebf2` | `e06a39e6c9925d054c819979cbb1c77f8711660405b14c2e7d8b688a98b60b3e` |
| general-american | mu | 0.850 s | -23.05 LUFS | -11.33 dBFS | `af3b4261e69bff8d9c69cfe28d84136da51e6127e242c349f0fcb0c59f555741` | `68dac13cb79213581dcdf49b6997c6aaea0cfb3b25f0800e81c0158898ab7fe8` |
| general-american | nu | 1.000 s | -23.01 LUFS | -9.32 dBFS | `c00d7d8ab2ec8ce0726278e268f9055d75cb14fe14f1c6301700baa4daed913e` | `0d1074252ac5dc5e10b72bc18a508fe0f9e0dcef626cb03e6b1cd0dd7b7c9500` |
| general-american | xi | 0.850 s | -23.02 LUFS | -4.30 dBFS | `825ac8bcf211245c9c0a0454ce05080344b499db972291fd6c377bbe2dc2012d` | `a6ee07b32cbb0a42d4e36274bcfbed3cc3967890f8752d06b81e55d7e39b0b95` |
| general-american | upsilon | 1.600 s | -23.04 LUFS | -9.23 dBFS | `ebf14e1060499596764d56268e17dc7fe532760956b59000875b04cbfd4e0f0c` | `e557e0274710f8079862274730b28246f76dea7a46b25ce9cf0336a5dd277a70` |
| general-american | phi | 1.300 s | -23.00 LUFS | -7.86 dBFS | `74ce7e3f5e11be681b3eb304248e1660512067d7c220bfeaccf7e35b23cf30de` | `89e3729a9fa75f3168d9fbabf734cfed6ab814ebf392d320fbc701661de0b8c7` |
| general-american | chi | 0.950 s | -22.99 LUFS | -7.11 dBFS | `7e3acbee9c2620b614acdfc2c9c0669132e052ded6efb34e2ec51a41c320488a` | `2ab3e834e63fd5c7f08bce0431563d83f9f144dfe352e97551c4e1d0d9309396` |
| general-american | psi | 1.250 s | -23.01 LUFS | -7.11 dBFS | `e7423fac06cc7525cff8ce386bd2552d8c8dd4808549b9dad27a6523e5024160` | `47b5029085178886aadcaa8d0767ccbd2e175962e768cbe344a10c23d4736014` |
| indian-english | eta | 1.050 s | -23.01 LUFS | -8.93 dBFS | `6061b722fbf19de6d5cdeea698682788e4928edee3ab02152899968d2834a318` | `7200eba364e6b61d66aafb1b0479a492a7495f585b62e171009630862c91f66b` |
| indian-english | mu | 0.950 s | -22.99 LUFS | -10.75 dBFS | `e9c8d125eb72e44dc4c3b14553095d363e669e2df51c3572b2bb18cb9d1465c6` | `f4e3edb91c7ff7ff2b72999f3ea8357aeb3d1f4021db8804c38ccc9e95778cf7` |
| indian-english | nu | 1.100 s | -23.03 LUFS | -9.56 dBFS | `c5bf6922a3c23377e04e865b3b78662aa4b91e46cdecf4e9015f1e80f61a7a18` | `ed5d207f32fde03e3a00bc6f6458606a1408bb954da6c67c225529e0e6a97cbd` |
| indian-english | xi | 1.000 s | -23.01 LUFS | -8.30 dBFS | `333af66dc97bfdfc5b5e4009156fb7b12e85a8cd188637f71e43a7e22ead8b30` | `5f44255635be1bda105aa6cc0e19f2c65f40ac3d5776d2a56a14f62ddc0a58af` |
| indian-english | upsilon | 1.250 s | -23.00 LUFS | -6.36 dBFS | `0e4e09a1b0f68357f67acec782e7c9f475a51f92023072293f66b356644986d5` | `3a345f473988324465e0b3527617dabdd233d4ac633cb4a6974bc7266c0c4785` |
| indian-english | phi | 0.800 s | -23.09 LUFS | -3.01 dBFS | `43161a431fc4b861b17b73f12e1b657c128aba1a710d14630d018f66e633b88a` | `994ce1c0b1ebf38b5c4baab0360bb13d2dcddb6effe0f9b81216ed6a1a6a8096` |
| indian-english | chi | 1.200 s | -23.00 LUFS | -7.63 dBFS | `c7cc0413f5812aa3ea6faefca2d3281a7cd34e739be9907cc11d16446ba2dd50` | `e806fbb409723aec766e260adf8dd4aebe851e428dd54187311f1fffec1063a2` |
| indian-english | psi | 1.250 s | -23.01 LUFS | -6.88 dBFS | `65404b98fafb05e6a519c24e9a14f2113424c5095f6151a8dc7e8c63af9c81a8` | `6aef71ef9f396745cd414ca1cbf966df4935fb08542f3cc7f7408aecfdd52bc9` |
| british-english | eta | 1.000 s | -23.02 LUFS | -6.79 dBFS | `4af5d284d1ff3df773951fbb261829c9095220cb1bcfb58402a03adb21d2fea6` | `e9fd4cc20a432eca4fcdb927caac8a84254b5956ee9a1515b664720396e89285` |
| british-english | mu | 2.500 s | -23.04 LUFS | -12.25 dBFS | `c12c02ede9dbfa0635c753e991bcfd076f2852f7ea9a9e8e4360a633da2e4bec` | `c422f5d73c43d6deb8a3515234e8d331d02727cb6221f7a2b78f7bf853faaa56` |
| british-english | nu | 1.000 s | -23.00 LUFS | -11.37 dBFS | `ea601c72ab8112728cf8da98d7fd083f5508936036bbedc74b7bd8909e7d9ee7` | `e9ffd05f3b9ad00205f8dbebec2997e7399d12583cec2d3e8e7bf4ed5f6f94a1` |
| british-english | xi | 1.200 s | -23.06 LUFS | -7.50 dBFS | `cf8b43fa0567e46111a3091a51e08cc5c133e22df80af94570cc975e8138173b` | `a2259f7f56503a2e9cf6051b61139533d90e6815946be80cb0b942f5e0638bd5` |
| british-english | upsilon | 1.450 s | -23.02 LUFS | -5.48 dBFS | `6db6bb3cc7bc66182b1730646a8738440d5fd70f3549f90c9c7a3ac543b01854` | `027618c4408ee568a037dd906f42aaa4deed3105ea7634fac2a5844179587137` |
| british-english | phi | 1.550 s | -23.00 LUFS | -3.59 dBFS | `f43ddacd22ab521dd7a173bb62c93e8896361a2a5d649d57b435861ef4d4375f` | `a54ff67fb64f219fe42e3699aaf1f1304e35555e9a3f297511c586cd64ec7e5f` |
| british-english | chi | 0.900 s | -23.03 LUFS | -7.82 dBFS | `242bc518aeeb80895fdad8d70d92d29e8fbb20ff08bf64fe6e05b02b135bc706` | `f951eccaed61b61b7558d20481288c7e22045daaee375fa7520340728a882a09` |
| british-english | psi | 1.250 s | -23.03 LUFS | -7.30 dBFS | `f56c62b88ab31d95189ec53b331a33e45b3c5e1669da9a4dee51edb6055f3937` | `32d10fd73b084396637366394737241fa05cdc645f1fb9e55aae63977f3a7168` |
| neutral-international | eta | 0.800 s | -22.99 LUFS | -7.88 dBFS | `5aed2a552dde63f5eb930fd948347393688ffad1d7c0f76ace849d0601785bb7` | `2e16a261d818b36701215c447941940098e954da76ad2791c6fa3f0b772ddf35` |
| neutral-international | mu | 1.150 s | -22.97 LUFS | -10.54 dBFS | `509caa141b41741152e8328fc431f5a558b82a3bfbe08674ad7292bbef595915` | `51d7812b376b81e131ee9514619d17fe296b9af029a4f97ed8c19d502876f1cf` |
| neutral-international | nu | 0.800 s | -23.00 LUFS | -12.50 dBFS | `f7105c5ccb639b03edae109876018502d587d5120f6a2ee6e91bbe1e9345c6ab` | `a91751280d3dd990cd2e4945372d0c67c096c9cb6338b0366e92c893cb3bebe6` |
| neutral-international | xi | 0.850 s | -22.98 LUFS | -4.64 dBFS | `0e81c977cc269b0e32aa454c2463a61221db99c43a31e012198a528a85d6efb7` | `0b47d08387acb2b407a80087859b4fca12e5e9225814eeb25e5f64fe7583f5f4` |
| neutral-international | upsilon | 1.200 s | -23.04 LUFS | -3.03 dBFS | `f99dc762c698c4ec543bd212c176bc13b67506c5df40dbe0be608f8697e233f7` | `51607cfff803d526abc7f8b8e42d8bb348281637a6c84c1a020f9e98a03b525b` |
| neutral-international | phi | 0.900 s | -22.99 LUFS | -5.12 dBFS | `32765043519bf2cc52e5a06de73c6e6b71adb2ea19e13d877814e3065517c1d9` | `de00d45e371ab2f2db54f0da227ab1ab85c8c3c302dbcbb59025d1f52e06948b` |
| neutral-international | chi | 1.000 s | -23.00 LUFS | -7.24 dBFS | `65f16eea278843935db840ac06eee25f0432b618d7960ceb370ea0edbe95a13a` | `5fe085238b0c0bb458db2255e27d8d4f55ba10a8a8f375dc8615ea8a52c82341` |
| neutral-international | psi | 1.200 s | -23.12 LUFS | -8.57 dBFS | `8e0d2fac4acbda3fa4bbb607d1f3c25cced3f10e121565c5fa99dfba2e11d5c3` | `b0e743f8ee5d19dc4c3fb1df9461fa8a4615d1ad820a1220ddb67eb935049368` |

This packet establishes request inputs, retained media, processing, checksums, screening results, and the stated human selection of neutral international English as the preferred direction. It does not establish individual acceptance of a new full-alphabet set, cultural representativeness, production suitability, or a legal or academic claim, and it does not modify the already approved 24-letter Marin packet or any active recording or source-use record.
