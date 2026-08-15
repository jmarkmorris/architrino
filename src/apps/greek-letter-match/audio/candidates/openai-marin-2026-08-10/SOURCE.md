# Greek Letter Match Full Marin Candidate Provenance

Status: **review-only; all 24 Marin clips are individually human-approved; no file is deployed by this record**.

Open [review.html](review.html) for the full Alpha-to-Omega listening route. The current production recordings and their source records remain active and unchanged.

## Generation and processing

- Generation date: 2026-08-10.
- Generation system: [OpenAI Speech API](https://developers.openai.com/api/reference/resources/audio/subresources/speech/methods/create).
- Model: `gpt-4o-mini-tts-2025-12-15`.
- Built-in voice: `marin`; no custom, cloned, imitative, demographic, or person-referential voice was requested.
- Speed: `1.0` for every request.
- Raw format: API-delivered uncompressed WAV, PCM signed 16-bit little-endian, 24 kHz, mono, 384 kbit/s.
- Browser-review format: uncompressed WAV with the same PCM/sample-rate/channel properties after linear-only normalization to approximately `-23 LUFS`.
- Processing: `ffmpeg` `loudnorm=I=-23:TP=-3:LRA=7:linear=true`, retaining 24 kHz mono PCM. No lossy transcode, upsampling, time stretching, peak limiting, or dynamics processing was used.
- Credential handling: the configured API credential was read from the environment and was not written to any request record or media file.

The shared instruction was:

`Use a warm, clear, gentle, non-harsh educational delivery with natural intonation and strong articulation. Speak only the requested Greek letter name. Do not sing, whisper, dramatize, imitate any person, repeat the word, or add any other sound.`

Delta, Nu, and Phi are byte-for-byte copies of the selected Marin voice-audition raw and browser WAVs. The other 21 letters were generated for this full-set review. The final requests used these exact inputs and letter-specific instructions:

| Letter | Proposed target | Exact input | Letter-specific instruction |
| --- | --- | --- | --- |
| Alpha | `AL-fuh` | `Alpha` | `Pronounce Alpha as AL-fuh, stressing the first syllable.` |
| Beta | `BAY-tuh` | `Beta` | `Pronounce Beta as BAY-tuh, stressing the first syllable.` |
| Gamma | `GAM-uh` | `Gamma` | `Pronounce Gamma as GAM-uh, stressing the first syllable.` |
| Delta | `DEL-tuh` | `Delta` | `Pronounce Delta as DEL-tuh, stressing the first syllable.` |
| Epsilon | `EP-sih-lon` | `Epsilon` | `Pronounce Epsilon as EP-sih-lon, stressing the first syllable; do not add any sound before the initial E.` |
| Zeta | `ZAY-tuh` | `Zay-tuh` | `Pronounce the Greek letter Zeta as ZAY-tuh, stressing the first syllable.` |
| Eta | connected `AY-tuh` | `Eta` | `Say Eta as one naturally connected two-syllable word: AY-tuh, /ˈeɪtə/. The first syllable is the long-A sound in day, /eɪ/, never the long-I sound in eye, /aɪ/. Join AY directly to tuh with ordinary smooth timing. Do not pause or break between syllables, do not use a spelling-out cadence, and do not draw out the first syllable. Use normal conversational pacing.` |
| Theta | `THAY-tuh` | `Thay-tuh` | `Pronounce the Greek letter Theta as THAY-tuh, stressing the first syllable.` |
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
| Chi | `KYE`, rhyming with *sky* | `Chi` | `Pronounce Chi as KYE, rhyming with sky.` |
| Psi | `SYE`, like *sigh* | `Sigh` | `Pronounce Psi as SYE, like the word sigh, with a silent P.` |
| Omega | `oh-MAY-guh` | `Omega` | `Pronounce Omega as oh-MAY-guh, stressing the middle syllable.` |

Generation retries were bounded and preserved where useful. Initial Zeta, Eta, Theta, Xi, and Tau raw responses were retained under `rejected/raw/` after the local recognition screen did not support the requested respelling. A second Xi attempt is also retained there. Human review rejected full-set Eta v2 because it sounded like `EYE-tuh`; its raw input is retained as `rejected/raw/eta-v2.wav`. Human review then rejected Eta v3 because its correct vowel was separated by an unnatural inter-syllable pause; the exact raw and browser-reviewed v3 files are retained as `rejected/raw/eta-v3.wav` and `rejected/browser/eta-v3.wav`. Eta v4 uses the canonical input `Eta` and the connected-word instruction above. An initial Pi response to the input `Pie` was effectively silent and was discarded before the successful `Pi` request; it was never routed or presented for review.

## Human review decisions

- The user accepted Alpha, Beta, Gamma, Delta, Epsilon, Zeta, Theta, Iota, Kappa, Lambda, Mu, Nu, Xi, Omicron, Pi, Rho, Sigma, Tau, Upsilon, Phi, Chi, Psi, and Omega in the full listening pass on 2026-08-10. These are the 23 clips other than Eta.
- Xi is accepted specifically as `ZYE` for the current American-English default. English dictionary variants exist, so this pronunciation remains revisable; it was not regenerated in the Eta correction pass.
- Eta v2 is rejected because it sounded like `EYE-tuh`. Eta v3 is rejected because it sounded like `AY ... tuh`, with an approximately 0.34-second measured internal silence. The user accepted Eta v4 on 2026-08-11 as a smoothly connected `AY-tuh`, completing individual human approval of the 24-letter Marin review set.
- These decisions do not deploy a clip or change the current production recordings or source records.

## Technical QA

Every final browser file is uncompressed PCM WAV at 24 kHz mono. Integrated loudness spans `-23.08` to `-22.96 LUFS`; peaks span `-12.06` to `-4.09 dBFS`. The verification pass reported linear normalization for every file.

| Letter | Duration | Loudness | Peak | Local on-device transcript |
| --- | ---: | ---: | ---: | --- |
| Alpha | 0.750 s | -23.02 LUFS | -6.81 dBFS | `Alpha.` |
| Beta | 0.750 s | -23.03 LUFS | -7.17 dBFS | `Beta.` |
| Gamma | 2.100 s | -23.00 LUFS | -6.51 dBFS | `Gamma.` |
| Delta | 0.850 s | -23.00 LUFS | -4.09 dBFS | `Delta.` |
| Epsilon | 1.400 s | -23.03 LUFS | -7.62 dBFS | `Epsilon.` |
| Zeta | 1.000 s | -23.04 LUFS | -9.19 dBFS | `Zeta.` |
| Eta | 0.800 s | -23.00 LUFS | -7.56 dBFS | `Ada.`; alternatives include `Aida.` |
| Theta | 1.350 s | -23.01 LUFS | -8.89 dBFS | `Theta.` |
| Iota | 1.250 s | -23.02 LUFS | -6.66 dBFS | `Iota.` |
| Kappa | 2.000 s | -23.00 LUFS | -4.53 dBFS | `Kappa.` |
| Lambda | 0.900 s | -23.01 LUFS | -10.11 dBFS | `Lambda.` |
| Mu | 0.750 s | -22.96 LUFS | -10.43 dBFS | `Me.`; alternatives include `Mu.` and `Mew.` |
| Nu | 0.750 s | -23.03 LUFS | -9.55 dBFS | `New.` |
| Xi | 1.350 s | -23.02 LUFS | -6.67 dBFS | `Zai.`; alternatives include `Zye.` |
| Omicron | 1.750 s | -23.01 LUFS | -5.45 dBFS | `Omicron.` |
| Pi | 0.950 s | -23.00 LUFS | -4.48 dBFS | `Pie.` |
| Rho | 1.050 s | -23.02 LUFS | -7.61 dBFS | `Row.` |
| Sigma | 1.400 s | -23.03 LUFS | -12.06 dBFS | `Sigma.` |
| Tau | 1.000 s | -22.98 LUFS | -8.04 dBFS | `Tao.`; alternatives include `Tau.` |
| Upsilon | 1.700 s | -23.05 LUFS | -9.47 dBFS | `Oopsilon.` |
| Phi | 0.750 s | -23.01 LUFS | -6.22 dBFS | `Fi.`; alternatives include `Fie.` |
| Chi | 2.150 s | -23.00 LUFS | -6.52 dBFS | `Kai.` |
| Psi | 2.150 s | -23.08 LUFS | -8.41 dBFS | `Sigh.` |
| Omega | 1.500 s | -23.04 LUFS | -9.47 dBFS | `Omega.` |

The local transcript is a recognition screen, not human acceptance. Homophones and respellings can appear differently in text, and the screen cannot establish naturalness, warmth, dialect preference, or exact vowel quality. Eta v4's `Ada.` screen supports a connected long-A word rather than `EYE-tuh`, but human listening remains decisive.

At both `-35 dB` and `-40 dB` silence thresholds with a 30 ms minimum, Eta v4 has only leading and trailing silence: the continuous voiced word runs from approximately 0.112 to 0.437 seconds. No internal silence is detected. Under the same measurement, rejected Eta v3 contains an approximately 0.34-second internal silence between its voiced regions. No speed change, time stretching, limiter, dynamics processing, or post-synthesis gap editing was applied.

## SHA-256

| Letter | Raw WAV | Browser-review WAV |
| --- | --- | --- |
| Alpha | `2a4ac778f00f3452696f1a6a6cbad53893818a22771e68c2ced1b5d729ec6069` | `d0d666484100682d4f86067557b1e223c93999e860499c90391884b346fcf1e9` |
| Beta | `887721f88316bafa4f83a1dac2c60e22c5c4c1459550e6d7a9f9491bb5ca6d06` | `08460b635e33b7d2e74a7e66a43e336c6aa2ee2208cc7e5c5b2cc0cb3c27969f` |
| Gamma | `e43e6f19177236c77ed6344dc98fce7aec24bde7987101ef64eda66b6326a8a1` | `fa819ce332b23a05373fc9d4d1a430c37e9d5cf4455bc68a9c042ecb0be80257` |
| Delta | `b7df03eb65803eb1622f598fa3e4394b31eed006dcca2be9724e0270a3c47fb1` | `1b268dd0cdcc3f2dc5e7a274b3b8ddc170bbf41933a64f59957a5e60b6f6da55` |
| Epsilon | `b137174810654fc9dff76af22cf5f6f88ebafefcc77946ab3d844529405f1cee` | `6bd96b4eb60fdd5173fcb19a258a2ed8471a7c75ac1166f6711b0f240fbfd055` |
| Zeta | `7024ba05843902165a7f240c8181de6bef8046c0c414c3d1afeb3b8af43e754c` | `6d2fca1090522ebe9d3b6d72afe4ee33c922de63bf3e48cced7045078a10f3c8` |
| Eta | `445a1872b8507b9d728b89670cedef3fbe81d2c4a0eaf98b59b7ea8f19f61db6` | `dff1f267185a6636107a569540cc91c0be5d5d3c948fccc8e7d5ce37fb1ead3a` |
| Theta | `8deeb46d37690078ca7ee2226d5064d11561452cfc619ca0e2510f938098a71c` | `fef6c03b37ffe4acb2f9c6c8e04f4cd0ed3ba6ef803c01c94010e85af81598ab` |
| Iota | `3fe1b77b2ce029f1f775fd49ee24e5fe33dfd6a74000aca3b00402bc6c2348ad` | `03a488281f4fae5dc0a4d8f1c165d079cac8345e3c9b2433e3ba07b355efccdb` |
| Kappa | `1bb60038b10143545063e26a268b2824758f0a23ffb756e5d22b885ce79d00cd` | `4b39e250dee33cf3f3177182876dbc4b159a647acca56f27aa53473b89a34f68` |
| Lambda | `d1aa78bb1065ea6b57cfca1532b972e4b611108e485c446b3c231f5d9ef8688a` | `f385e871ecd9e9b0b4250e2745fc8764ce614395e85afa86bf976fff58d2084a` |
| Mu | `a56f245a9df36f8abcf89cfd6e92aeebaf7cc682e40aff02b979f6637292e793` | `0162d39b8c58e3be3c26538de11b0d94cb91bb0e081b51a8d4bf13737c8a5b5b` |
| Nu | `c5932e642ff1bddb39876c15adf0593c2130646d778885bd72bb3f5deddc7cba` | `07af696a28078901c2f5259e0a28e119df5f66f2f29f9cca34189ad3a7eae136` |
| Xi | `0c26a71c55807176677d187e010ccf5c8964f1f73e4bcea1f10f2017ea7b13b9` | `624a559250f1b27b9895a4828d81877a782d7b07007f35ef6a5926dfc4c0d093` |
| Omicron | `1322a8c8a614605ef9b43f7c0a673cdd2452a0b57736ada9d73d4b264a65b264` | `21cbcf53c514ef6880a3686948d0d7a4867a740e1990657548a38012e3c7b41a` |
| Pi | `eb35c877d050d1e63e255b260bc8e685cc17d9697a1131b27ad8fd31ef998e4e` | `199afe68652ccd7c622892561afbb2b2fd6adf706cbf15808c7a6699271ef0be` |
| Rho | `aa16f917851563427e593f8e31dc981cc0fa4b01cb3a8906964e9988cc215f65` | `68a27027881c75a06a410ff55a11df76bd646cd010a4d2fef0f71b0bf510be46` |
| Sigma | `a782197ca603864ff4267045159c5e1f4bbc3cae51bf15edd0686f368c066282` | `6a9f764917aa4104bda74fb157e215531059963a1956160dd57b12109f2cbe6b` |
| Tau | `394731683d4e80e136cb038951adb717782dd1b7676e8b2da9658e6e67456859` | `8072ff6774c923d9a33472f11ed547aa50bba07d5eec085feff95610f109ab46` |
| Upsilon | `32e6613f5ef30f56ecaaa377e087e80a518c56ae0f8a8a8cfcd91b4f8d85dce8` | `6356acf193c1374d37f6b9afb4d127f3fe455d81ca23d89d25a600c8f279eae9` |
| Phi | `36d1db745798988a3e1e52f9d43a2df91aa1e70f8f65700ccabb0b05f71243a0` | `0557c3a89b00a601203304aaa581a9890c66c4e4391e466bd41559fd4ded22ee` |
| Chi | `c4a10e050c700b7cb71a3f9fc577133d4a5ab37cb0f0d09cd55a9cca051e16b0` | `08b101f2f74569ddd30382a94345f0c4c3d11d4820c9258898c4ce7244e2a1e6` |
| Psi | `14a3f7c625483059bfffd44fde9e637ec4bcb1a943cc606f6bcd60e5bedcb2d9` | `92be5af7150af1184d85a945b31e45a48eac06b631399c29839c025bbfc8e423` |
| Omega | `d9b2fa25cd25ea31cce81c7bf3f511e4b6e2676044175d620905418c485f779b` | `350d9f1e230875114fb953b70fe2282e931b511c85519556ca4cf700bb68c493` |

This provenance record establishes generation inputs, retained files, technical checks, and the stated human review decisions. It does not deploy any recording, replace current app audio, remove historical source-use evidence, or make a legal determination.
