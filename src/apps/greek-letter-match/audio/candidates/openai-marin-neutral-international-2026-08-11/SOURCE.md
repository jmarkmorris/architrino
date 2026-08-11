# Full Marin Neutral-International Pronunciation Provenance

Status: **complete 24-letter set; selected for production deployment after technical, pronunciation, and browser QA**.

This set uses the OpenAI built-in `marin` voice with a neutral international English accent/style instruction. Neutral international is not a separate voice, cloned identity, or demographic claim. All speech is AI-generated.

## Generation and processing contract

- Generation date: 2026-08-11.
- Generation system: [OpenAI Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create).
- Model: pinned snapshot `gpt-4o-mini-tts-2025-12-15`.
- Built-in voice: `marin`.
- Speed: `1.0`.
- Raw response: uncompressed WAV.
- Review/production candidate format: PCM signed 16-bit little-endian, 24 kHz, mono, 384 kbit/s WAV.
- Processing: `ffmpeg` `loudnorm=I=-23:TP=-3:LRA=7:linear=true`, retaining 24 kHz mono PCM. No lossy transcode, upsampling, time stretching, limiter, dynamics processing, or post-synthesis cadence editing was used.
- Credential handling: the API credential was read from the environment and was not persisted.
- Media-license label: pending explicit operator choice between CC0, as a public-domain dedication where legally possible with a permissive fallback, and CC BY 4.0, for open reuse with attribution. The repository MIT software license is not asserted as the standalone audio-media license. This record does not guarantee copyrightability or legal effect in every jurisdiction.

The exact shared instruction was:

`Use a warm, clear, gentle, non-harsh educational delivery with natural intonation and strong articulation. Speak only the requested Greek letter name. Do not sing, whisper, dramatize, imitate or reference any person, repeat the word, or add any other sound.`

The exact accent/style instruction was:

`Render the word in restrained, neutral international English intended for broad intelligibility. Favor careful enunciation; avoid stylization, caricature, exaggeration, or any imitation of a person.`

## Inputs and targets

| Letter | Target | Exact input | Letter-specific instruction |
| --- | --- | --- | --- |
| Alpha | `AL-fuh` | `Alpha` | `Pronounce Alpha as AL-fuh, stressing the first syllable.` |
| Beta | `BAY-tuh` | `Beta` | `Pronounce Beta as BAY-tuh, stressing the first syllable.` |
| Gamma | `GAM-uh` | `Gamma` | `Pronounce Gamma as one naturally connected two-syllable word: GAM-uh, stressing GAM. Keep ordinary smooth timing with no pause between syllables.` |
| Delta | `DEL-tuh` | `Delta` | `Pronounce Delta as DEL-tuh, stressing the first syllable.` |
| Epsilon | `EP-sih-lon` | `Epsilon` | `Pronounce Epsilon as EP-sih-lon, stressing the first syllable; do not add any sound before the initial E.` |
| Zeta | `ZAY-tuh` | `Zay-tuh` | `Pronounce the Greek letter Zeta as ZAY-tuh, stressing the first syllable.` |
| Eta | connected `AY-tuh` | `Eta` | `Say Eta as one naturally connected two-syllable word: AY-tuh, /ˈeɪtə/. The first syllable is the long-A sound in day, /eɪ/, never the long-I sound in eye, /aɪ/. Join AY directly to tuh with ordinary smooth timing. Do not pause or break between syllables, do not use a spelling-out cadence, and do not draw out the first syllable. Use normal conversational pacing.` |
| Theta | `THAY-tuh` | `Thay-tuh` | `Pronounce the Greek letter Theta as one naturally connected two-syllable word: THAY-tuh, stressing THAY. Keep ordinary smooth timing with no pause between syllables.` |
| Iota | `eye-OH-tuh` | `Iota` | `Pronounce Iota as eye-OH-tuh, stressing the middle syllable.` |
| Kappa | `KAP-uh` | `Kappa` | `Pronounce Kappa as KAP-uh, stressing the first syllable.` |
| Lambda | `LAM-duh` | `Lambda` | `Pronounce Lambda as LAM-duh, stressing the first syllable.` |
| Mu | `MYOO`, like *mew* | `Mew` | `Pronounce Mu as MYOO, like the word mew, with a clear initial M consonant.` |
| Nu | `NOO`, like *new* | `New` | `Pronounce Nu as ordinary American English NOO, like the word new. Keep it short and plain; do not draw out the vowel or add a Y glide.` |
| Xi | `ZYE`, rhyming with *eye* | `Zai` | `Pronounce the Greek letter Xi as ZYE, rhyming with eye, in one syllable.` |
| Omicron | `OM-ih-kron` | `Omicron` | `Pronounce Omicron as OM-ih-kron, stressing the first syllable.` |
| Pi | `PIE` | `Pi` | `Pronounce Pi as PIE, rhyming with sky.` |
| Rho | `ROH` | `Rho` | `Pronounce Rho as ROH, rhyming with go.` |
| Sigma | `SIG-muh` | `Sigma` | `Pronounce Sigma as SIG-muh, stressing the first syllable.` |
| Tau | `TOW`, rhyming with *cow* | `Taow` | `Pronounce the Greek letter Tau as TOW, rhyming with cow.` |
| Upsilon | `OOP-sih-lon` | `Upsilon` | `Pronounce Upsilon as OOP-sih-lon, stressing the first syllable.` |
| Phi | `FYE`, rhyming with *pie* | `Fye` | `Pronounce Phi as FYE, rhyming with pie; do not say fee.` |
| Chi | `KYE`, rhyming with *sky* | `Kai` | `Pronounce Chi as KYE, rhyming with sky.` |
| Psi | `SYE`, like *sigh* | `Sigh` | `Pronounce Psi as SYE, like the word sigh, with a silent P.` |
| Omega | `oh-MAY-guh` | `Omega` | `Pronounce Omega as oh-MAY-guh, stressing the middle syllable.` |

Eta, Mu, Nu, Xi, Upsilon, Phi, Chi, and Psi are byte-identical raw and browser WAV copies of the selected neutral-international audition files. Chi therefore preserves the corrected constant phonetic input `Kai`. The other 16 were generated for this packet.

Gamma v1 was technically valid but returned no local transcript in two bounded attempts. Theta v1 contained an approximately 0.32-second internal low-level gap. Both were rejected and retained as `rejected/{raw,browser}/{gamma-v1,theta-v1}.wav`. Gamma v2 locally screens as `Gamma.`; Theta v2 screens as `Theta.` and reduces the internal interval to approximately 45 ms. Rejected SHA-256 pairs, raw/browser: Gamma v1 `2a2f0f9d94fc43e41183891133a40ee8e6c0b8246d7bb9bd918f68775c6a465c` / `ea0278068859cc3f80e58dad4eb1cefb4a90563d9b50032afdaa9810b73d7913`; Theta v1 `1f54312ef5260317f2e1b525a6d669ccee6e2886362f56f59e3d439ac2fa943e` / `3211dab147a81c6b1025253703274c1bce0b7df5e5bd60b77445fa89a23b9dbb`.

## QA summary

All 24 final browser WAVs decode as PCM signed 16-bit little-endian at 24 kHz mono and 384 kbit/s. Durations span 0.750–2.250 seconds, integrated loudness spans -23.12 to -22.97 LUFS, and peaks span -12.50 to -3.03 dBFS. No material internal cadence gap remains; all measured final intervals are 71 ms or shorter. Local recognition supports the intended words or expected homophone spellings for every final clip. This is a diagnostic screen, not a claim about cultural representativeness or human identity.

## Final manifest

| Letter | Duration | Loudness | Peak | Raw SHA-256 | Browser/production SHA-256 |
| --- | ---: | ---: | ---: | --- | --- |
| alpha | 1.000 s | -22.97 LUFS | -5.93 dBFS | `9111e3048609880b5805e38cb02c28667123e943ff0b96c5a67d1e351d90ba6a` | `77a06e3b6fb7761ef7b9d6e2e4e85e4ddba5cee74e2669458255de7650ada354` |
| beta | 0.750 s | -22.98 LUFS | -6.34 dBFS | `b7a4a87d23855098c1534e67bba5dc321ffaa486c922f47598ae6044e2d1d30b` | `8f1ad4ddd09bb9d630f52ba1d808721d457bb27dad9547a651fe9a7a3ca9d343` |
| gamma | 1.800 s | -22.99 LUFS | -7.40 dBFS | `d6cc25d1f1cde01ca4bc4a23503eee75ecc769020d046c2e4a2234569d113408` | `d0dcea6cac2cd48bcfd433b03539a749868c701be9c0519bf25ae90266e66951` |
| delta | 0.850 s | -23.02 LUFS | -5.04 dBFS | `1b6728d24ba7440cbcdce7b551df15d3f94894766c87cff2736a040c6c753633` | `ef7b2bd3d9292552bedfb32038873dc9abda33dc1fedbb22627ae952b309234b` |
| epsilon | 1.600 s | -23.08 LUFS | -4.15 dBFS | `44f6ada18c85940f7387421eb4e7d14d8ba831c0c8dc65d94bc82df0efb1f2fc` | `520103fe7c65b0db3d8d1aed6f0e90dbc0a84a93c2be24108400abc7911bd890` |
| zeta | 0.750 s | -23.01 LUFS | -10.16 dBFS | `4dd50651aee7e05260060f39fd3358acfb7adb1c07829a422b075fe611af6a15` | `5f310305362a53ea76e37b8cd9783001ba9a97c9c86095d92b12043def64741b` |
| eta | 0.800 s | -22.99 LUFS | -7.88 dBFS | `5aed2a552dde63f5eb930fd948347393688ffad1d7c0f76ace849d0601785bb7` | `2e16a261d818b36701215c447941940098e954da76ad2791c6fa3f0b772ddf35` |
| theta | 1.450 s | -22.98 LUFS | -8.00 dBFS | `93f0534bbb8c2851eb6c4d0d12a74d989fd0be0bcc209f8c45e90ba635f8d082` | `3a38be86d84038b441432f3673e1290ade553914562bf59d2025c5565843f18c` |
| iota | 1.100 s | -22.99 LUFS | -7.69 dBFS | `807fd7d3ddefdcb276cf7ae1d7d5fc57d22b5c98c7dc770aca50084e4ba58a01` | `4e782ee59fb2a8ca9d6b37913bf66a22f74886d579548621cc6d0a63092764fb` |
| kappa | 1.150 s | -23.00 LUFS | -5.74 dBFS | `68704d460bca8eca60c9f54eb674f550e6121e9f241bdf2447b67ea5c0f618be` | `1e6d20b7e6eb1643222c1c5136a8d37fb8f52e06e610dc2b494ab57adfb4905e` |
| lambda | 2.250 s | -23.00 LUFS | -7.60 dBFS | `80c53472db39cc3cbd26fec1e9d0b971e7d892848c59fb2adbbf26fb262fdd51` | `31e8a3a4145e257f73d8fc7586ddca0ef7869c9b2c1b8d853c1b2328f3dfc553` |
| mu | 1.150 s | -22.97 LUFS | -10.54 dBFS | `509caa141b41741152e8328fc431f5a558b82a3bfbe08674ad7292bbef595915` | `51d7812b376b81e131ee9514619d17fe296b9af029a4f97ed8c19d502876f1cf` |
| nu | 0.800 s | -23.00 LUFS | -12.50 dBFS | `f7105c5ccb639b03edae109876018502d587d5120f6a2ee6e91bbe1e9345c6ab` | `a91751280d3dd990cd2e4945372d0c67c096c9cb6338b0366e92c893cb3bebe6` |
| xi | 0.850 s | -22.98 LUFS | -4.64 dBFS | `0e81c977cc269b0e32aa454c2463a61221db99c43a31e012198a528a85d6efb7` | `0b47d08387acb2b407a80087859b4fca12e5e9225814eeb25e5f64fe7583f5f4` |
| omicron | 1.100 s | -23.04 LUFS | -5.56 dBFS | `26fdc06e8f6cfc0cc84d4413f6c72d160167059d770a5c5b67bd7cf000be5915` | `dfed75a8ae3eb127cfcdd7a118a25d9f0f1473694e92fc75a0364764f8484bcb` |
| pi | 0.950 s | -22.98 LUFS | -7.91 dBFS | `8f0439bfb3cd89565283564c93974e8ee17a5454bfa5a3013b81ae50c6d8e9e8` | `1afeb45a2a12383668a53be4b56ee5ae8118d80e0526cce1b52da8a83ecf9e1d` |
| rho | 1.350 s | -23.01 LUFS | -8.43 dBFS | `f6a201f5d4066877b159b7552edd4c8b44a267d7f870c273f7dee57ed6dfab4c` | `bb49b8a70ab0872fcd2278974f15254bd14e2bceab865a0a9cb94d837fff31b7` |
| sigma | 1.250 s | -23.03 LUFS | -7.07 dBFS | `9a102f7455a8bb64db62aed8127f593f06acb874d35440cf0baa57e58a9c0d6c` | `32cfa343b2dd40fb4b52cae156740f52c8d9d982ac57c860c7642033742a270b` |
| tau | 1.250 s | -23.04 LUFS | -8.82 dBFS | `c96d15c8c8ec45a4ae1241678e4a9ccc7352c978dd093b6b94c1fe1dc66e1dfa` | `431457a0fc408318a0ce9ca44ecf067cbbee1d3e9a9bdc3a63848ed73cb6bbbf` |
| upsilon | 1.200 s | -23.04 LUFS | -3.03 dBFS | `f99dc762c698c4ec543bd212c176bc13b67506c5df40dbe0be608f8697e233f7` | `51607cfff803d526abc7f8b8e42d8bb348281637a6c84c1a020f9e98a03b525b` |
| phi | 0.900 s | -22.99 LUFS | -5.12 dBFS | `32765043519bf2cc52e5a06de73c6e6b71adb2ea19e13d877814e3065517c1d9` | `de00d45e371ab2f2db54f0da227ab1ab85c8c3c302dbcbb59025d1f52e06948b` |
| chi | 1.000 s | -23.00 LUFS | -7.24 dBFS | `65f16eea278843935db840ac06eee25f0432b618d7960ceb370ea0edbe95a13a` | `5fe085238b0c0bb458db2255e27d8d4f55ba10a8a8f375dc8615ea8a52c82341` |
| psi | 1.200 s | -23.12 LUFS | -8.57 dBFS | `8e0d2fac4acbda3fa4bbb607d1f3c25cced3f10e121565c5fa99dfba2e11d5c3` | `b0e743f8ee5d19dc4c3fb1df9461fa8a4615d1ad820a1220ddb67eb935049368` |
| omega | 1.100 s | -23.00 LUFS | -7.61 dBFS | `10f0dd414d01269d294dc792f9917551a0645aeb8ddbe40be3ae38be661c8bdd` | `eeed255eb3a82e82f056acd56e666fba8ab707fcf1997b2027087a2a2bfa7281` |

This record establishes generation, processing, screening, and file identity. AI output and model-training provenance are not source evidence for factual, legal, or scientific claims.
