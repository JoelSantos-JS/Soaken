# Changelog

All notable changes to **Soaken** are recorded here.

Format based on Keep a Changelog; the project follows Semantic Versioning.

Categories: **Added** (new), **Changed** (behavior change),
**Fixed** (bug), **Removed**.

---

## [0.1.17] — 2026-09-28

### Note
- **An update about what you see and what you hear.** The caption now builds word by word instead
  of dumping blocks, and the card's audio stopped lying about its own accuracy.

### Added
- **Live translation of the caption.** The caption can show the translation while the speech is
  happening, without creating cards or spending analysis.

### Changed
- **The caption builds as the person speaks.** Text used to arrive in blocks: fifteen words showed
  up at once, with pauses in between. Now it comes in at the pace of whoever is talking, in a
  single queue that carries the provisional guess through to the final sentence — confirming what
  was said doesn't restart your reading or dump the whole sentence at once.
  - It works on **any provider**. Where the service delivers text in pieces (Gemini, OpenAI `gpt-4o-transcribe`), it already arrives that way; where it doesn't (Groq's Whisper), the presentation does the work. It costs no extra requests.
  - The text no longer depends on an animation to be readable — in an unfocused window, words could stay invisible forever.
- **The card tells you when it doesn't know.** When the recognizer returns no per-word timing, the
  app has to estimate where each sentence starts — and it did that **silently**, playing an
  approximate clip as if it were exact. Now it warns you: *"Sync not verified"*, and you choose
  between the approximate cut or the full clip.
- **Sturdier Pro backup.**
  - Per-word marks are preserved in both response formats from the gateway.
  - Pro reserves local capacity for previews, sending finals to the backup when it is available and falling back to the local key on a refusal or a response without marks.
  - Retries now count in the request meter, which used to underestimate quota usage.

### Fixed
- **The audio clock was two seconds off.** When a clip ended in silence, Groq's timestamps could be
  read as if they belonged to the audio without the acoustic context — and the whole sentence
  landed in the wrong place. Now the provider's contract decides, instead of a guess based on the
  end of the last word.
  - Measured on a real capture after the fix: **92% of sentences within 150 ms** of the right spot, with a median deviation of **zero**. The same measurement on an old session gives 5% — the difference is the fix, not the method.
- **A sentence repeated in the same clip.** When a clip said the same sentence twice, both cards
  played the same piece — the bottom one played the top one's audio. Each card now searches from
  where the previous one ended.
- **The Loop cut and the selection of words and snippets** stopped going wrong on repeated sentences.
- **The end of a snippet's playback is no longer delayed.**

### Note
- **Old sessions** saved without information about where the marks came from get the "sync not
  verified" warning. The original audio is still available.

---

## [0.1.16] — 2026-09-23

### Note
- **An update about precision.** The Tutor card's audio now plays exactly the sentence it shows.
  Everything here was measured with a looping video and a bench of our own, before and after.

### Fixed
- **The card's audio now matches its sentence.** This was the most annoying defect: you clicked a
  sentence in the Tutor and heard a different piece of the video — or the whole clip from the
  start. There were **four** causes in the same chain, and all of them fell. Chopped-up sentences
  dropped from **31% to 21%**, and each card's audio is its own sentence.
  - The echo trim between utterances used two criteria that disagreed (a word on one side, a millisecond on the other). One word was left without a timestamp, and that threw away the **real** marks of all the others: **33% of clips** had an invented cut. Now it's **0%**.
  - Abbreviations like "U.S." were read as the end of a sentence, splitting a card in two.
  - Long sentences were released halfway when they hit the size limit.
  - The audio tail used to give the recognizer context wasn't discounted from the marks, and the clock ran backwards by up to 1.9 s in the middle of the clip. That fell to 0.6 s.
- **Audio vanished from older cards.** In a long session, the first cards lost the Original, Loop
  and Snippet buttons. The file was always saved; the card just didn't know how to find it.
- **Editing the API key broke the card** in Settings: the field and the Save button fell outside
  the border, on top of the card below.
- **A service-down error** now becomes a message in plain language, not "503".

### Changed
- **Transcription picks by what matters.** The app now asks "does this model return per-word
  timing?" instead of looking at the provider's name. That closed a silent hole: GPT-4o Transcribe
  doesn't return it either, and nobody noticed — the card simply lost its cut. The picker's labels
  now say which models have no per-word timing, and Groq/Whisper comes first, which is the
  recommended one.
- **Update notice, with you choosing when.** The new version used to install by itself when you
  closed the app, and the only warning was a Windows notification that disappears on its own. Now a
  banner on Home shows the downloaded version and stays there until you decide: **Restart now** or
  later. Dismissing doesn't cancel it — it still installs on close.
- **Pro subscribers: transcription no longer stalls at the limit.** When your key hits the
  requests-per-minute ceiling, transcription is served by a Soaken key on the server. You lose no
  sentences and you don't wait. If that route is full too, everything returns to normal behaviour —
  never an error on screen.

---

## [0.1.15] — 2026-09-22

### Note
- **The biggest update so far: 121 changes since 0.1.14.** The whole app has a new look, the live
  transcript stopped losing speech, and three features that didn't exist have arrived.

### Added
- **Composer — write in your language, send it in theirs.** A window where you type in your own
  language and the text comes out in the language you pick, with two readings: the natural one and
  the more careful one. It works **inside another app** — on WhatsApp, Instagram, Facebook: type in
  the field, press `Ctrl+Alt+E` and your text is replaced in place, no copy and paste.
- **Speech chunks.** A tab of its own where the AI pulls out the pieces natives say as one ("I'm on
  my way", "I guess so") and you practise each one. This is what makes a sentence sound natural
  instead of assembled word by word.
- **Gap — work it out by ear.** The app hides a word in the sentence and plays the audio. You work
  it out by listening, not by reading.
- **"You've seen this word in…"** When you play the example for a word you met before, you hear the
  **real voice from the original scene**, not a synthetic voice reading the text.

### Changed
- **The whole app, redesigned in the Deep Soak look.** Home, Sessions, Review, Settings, Chunks,
  Guide, Tutor Board, Life RPG, the floating bar and the dock.
  - **Settings** is no longer a list of 11 sections in one long scroll: it is now **five groups with search**. And it went back to being a tab inside Home — it had become a separate window, an app inside the app.
  - **The dock** got a minimize button, a width that fits its content, and the see-through background is gone.
  - Transcript words now **arrive with motion** instead of blinking onto the screen.
- **You choose what the transcript line shows:** the original, both languages, or just the translation.
- **The side translation arrives in 1.5 s** instead of 5 s.
- **The Review deck is now about SPEECH.** Single words are out; sentences and expressions come
  first. Reviewing means practising how people speak, not memorising vocabulary.
  - The old cards were not deleted — they simply stopped being served.
- **Karaoke synced to the real audio timing**, not to a rule of thumb. The word lights up at the
  right moment.
- **Life RPG feels alive.**
  - Varied scenes and an NPC that really converses — it used to solve the problem for you.
  - Voices drawn at random per character.
  - Scene briefing: where you are, what you came to do and who you're going to talk to.
  - The model was chosen by measurement, not by hunch.
- **Many voices per language**, in a picker that fits the window.
- **Failover from Groq to Gemini** when a provider goes down.
- **Usage and cost: one clear number**, and only for whoever pays the bill.
- **Technical errors became messages for humans.** Instead of `Groq 429: {"error":{"message"...}}`,
  a sentence that explains what happened — and **in the app's language**: English users were
  reading Portuguese.
- **Teacher — live mode** is temporarily marked **"Coming soon"** while it is reworked.

### Fixed
- **A sentence split by a pause is one sentence again.** When the video paused mid-speech, it broke
  into two loose pieces. Now it comes back as a single sentence — with its audio attached.
- **Pausing the video mid-sentence no longer erases what was said.**
- **Hesitation is no longer read as the end of speech.** The cut was at 600 ms; anyone who hesitated
  had the sentence cut in half, and the model invented the rest.
- **Narration ends where the sentence ends.** Documentaries don't pause a second between sentences.
- **Session glossary:** an English word inside speech in another language stops being "translated"
  by mistake.
- **Chinese in one script.** The same documentary came out sometimes as `说`, sometimes as `說`.
- **Auto Practice waits for the whole turn** before suggesting. It used to answer in the middle of
  the other person's sentence.
- **Auto Practice redoes its suggestion** when the person keeps talking.
- **The filter stopped swallowing real Chinese speech** — legitimate sentences were being discarded
  as noise.
- **Your voice choice survives an update** — it used to quietly fall back to the default.
- **Pronunciation practice stopped recording through a filter** built to hide speech flaws. You
  hear what you actually said.
- **GPT-5 models unlocked.** OpenAI's new generation only exists on an API the app didn't speak —
  which is why `GPT-5.4` showed up in the list and failed when picked. It now works in translation,
  analysis, Teacher and RPG.
- **The cost meter understands the new dialect** and no longer reads zero on the pricier models.
- **Your Google profile picture** shows up in the app.
- **Cloud backup stopped dying silently** when the token expired with the app open.
- **Audio is guaranteed on disk before syncing.**
- **A 4.3 MB file was re-read and reprocessed on every call.** Not anymore.
- **The interface froze at the end of a session** reading audio that wasn't even going to be uploaded.

### Note
- **Measured against human subtitles:** 73% of sentences come out **identical**, with a 96% average
  accuracy.
- **Behind the scenes** — nothing you can see, but it's what holds the rest up.
  - Tests that only passed because of the order they ran in were fixed; leaking between tests became impossible.
  - A packaging test makes sure every external dependency travels inside the installer.
  - Free trial: isolation locked by contract, a second provider (Deepgram) and quotas that hold up under load.
  - An isolated base for **Jev Search**, still disconnected from the product.
  - The Premium gateway was switched off: it returned canned text instead of real speech.
  - A measurement baseline was created (benchmarks, evaluations, resource usage) to optimise with numbers instead of impressions.
- **When installing:** the installer is **not digitally signed yet**. Windows will show a SmartScreen
  warning — click **"More info" → "Run anyway"**. The certificate is on the roadmap. Anyone who
  already has Soaken installed gets this version **automatically**.

---

## [0.1.9] — 2026-07-22

### Fixed
- **AI works again for everyone (Gemini).** The `*-latest` models the app offers started
  pointing to Gemini's 3.x generation, which rejects the old configuration — and **every**
  AI call (RPG, analysis, drills, transcription) failed with a 400 error. The configuration
  now adapts to the model, and a smoke test against the real API joins the release ritual so
  this class of breakage never slips through again.
- **Logging out no longer closes the app.** Logout used to bring the whole program down
  instead of returning to the login screen.
- **Updates reopen the app by themselves.** They installed on close and never came back
  ("it opened and vanished"); now they install silently and relaunch. Clicking the
  notification also applies the update right away.
- **Opening animation unfrozen.** Windows wrongly marked the transparent splash window as
  "occluded" and paused rendering — the animation was born frozen on its first frame.
- **Going Pro shows up without re-logging.** A plan changed on the server only arrived on the
  next login; the app now revalidates the account on launch and every window updates on its own.

---

## [0.1.8] — 2026-07-22

### Fixed
- **The Analysis button on the floating bar now matches Home.** For a Pro account without the
  minimum history (10 sessions or 7 days) it **disappeared** from the bar; now it shows up and
  clicking it tells you **how much is left**, just like Home. Free accounts still see the lock
  with the upsell.

---

## [0.1.7] — 2026-07-22

### Added
- **Life RPG — practice the correction.** The **"You could say"** card gained a **practice**
  button: you record yourself repeating the corrected sentence and it compares **word by word**
  against the right form, showing your score and what was missing or extra. Reading the
  correction becomes training the correction.

### Fixed
- **Auto-update repaired.** The app required updates to be digitally signed — and we don't have
  a code certificate yet — so **every** update was downloaded and silently rejected. The
  requirement is off until the certificate exists; from this version on the app updates itself
  again.

---

## [0.1.6] — 2026-07-22

### Added
- **Life RPG** *(in development — restricted)* — everyday scenes you solve by **speaking**: an
  NPC answers you, corrects you in character, and the **world remembers** what you did (who
  already knows you, what was left unresolved) in the next scene. The option shows in the menu
  for everyone, but it still **only opens for allowed accounts**; anyone without access sees a
  notice explaining why, instead of a button that does nothing.
- **Life RPG — truly simple English.** Lines now stay within the **~5000 most common** English
  words: short sentences, everyday words, no literary terms. A learner has to understand in
  order to answer — and someone who doesn't understand stops speaking.
- **Life RPG — 16 scenarios** (up from 2), across three tracks: **everyday** (shop, doctor,
  neighbor, airport, renting, support, first day, taxi), **fantasy** (a gate that only opens
  for those who speak the truth, a bored dragon, a king who forgot who he is) and **dark** (a
  hearing, an unfair accusation, a friend who lied) — the last ones push you to argue more.
- **Life RPG — free mode (hands-free).** A button turns on continuous listening: you speak and,
  when you pause, the app sends it by itself — no button to hold. Made for Bluetooth mics and
  headsets. After the character replies, it goes back to listening automatically. A voice
  detector decides when you're done (it ignores short pauses between words and doesn't trigger
  on a click or a cough).
- **Life RPG — the correction that shows on screen.** When your sentence has a mistake,
  **"You could say"** now appears right below it, with the sentence rewritten in simple
  English — without the character stopping the scene to lecture. Before, broken English went by
  with no visible correction at all.
- **Life RPG — characters enter and leave the scene.** When someone is mentioned and could
  plausibly be there — "a witness saw you", "I'll get my manager" — that person now **walks in
  and speaks**, and you answer them directly; then they **leave** ("wait outside") and the
  scene returns to whoever stayed. Works in any scenario, not just one.
- **Life RPG — conversations no longer stall.** The character stopped echoing your words back
  ("so you were home cooking...") and a scene that starts going in circles is **forced to an
  outcome** — you convince them and walk free, or you don't and the door closes — instead of an
  eternal "we'll look into it later".
- **Life RPG — more than one character in the scene.** A new character can join mid-conversation,
  introducing themselves, **each with a different voice** — and the voice **matches the
  character's gender** (a man sounds male, a woman female, a non-human neutral), with their own
  color on screen. Three at most, and nobody loses the thread. A manager the clerk calls over, a
  witness, a friend taking sides — the second voice exists to raise the pressure and make you
  speak more.
- **Life RPG — the characters have humor.** Dry sarcasm, always about the situation and never
  about the player's English. The correction still comes before the joke.
- **Credits page** (CREDITS.md) — ideas that became product now carry a name.
  **Sessions** and **segments** are **Hunji**'s ideas.

### Changed
- **Local voice with automatic fallback** — on startup the app now **measures how long the local
  voice takes to synthesize** and, if the machine can't keep up, switches to the network voice.
  On older processors (without AVX2/VNNI) the local voice could take **~40s per sentence**; over
  the network, ~1s. This applies app-wide — on the Tutor Board the cache hid the problem, but
  every new word paid the wait. The measurement runs **once per machine** and is stored:
  repeating it on every launch cost seconds of CPU competing with the opening screen.
- **The Analysis button no longer disappears.** On a Pro account without enough history it
  vanished, which is indistinguishable from a broken app. Now it stays visible and **clicking it
  explains the wait**: how many sessions and days are left, and that **whichever comes first
  unlocks it**.

### Fixed
- **Life RPG with new Gemini models (3.x).** Picking a 3.x model broke the RPG (HTTP 400, "only
  works in thinking mode") because we forced reasoning off, which only 2.5 accepts. The
  reasoning config now follows the model's generation — 3.x models use dynamic reasoning and a
  higher output ceiling. More capable models make for far more creative, surprising scenes.
- **Google login stuck on "please wait".** Closing the browser tab without finishing left the
  screen stuck for up to **10 minutes** (the OAuth timeout), because giving up in the browser
  doesn't tell the app. There's now a **"Cancel Google login"** that frees it instantly — and
  giving up stopped being treated as an error: the screen just returns to normal, no red message.
- **Life RPG — the microphone recorded the NPC itself.** Pressing to speak now **cuts their
  speech immediately**; before, their voice came out of the speaker, went into the microphone,
  and the transcription came back wrong.
- **Life RPG — short utterances got lost.** Releasing the button before the microphone finished
  opening turned the turn into silent nothing, with no audio and no warning.
- **Life RPG — the character's line was cut mid-sentence.** An abbreviation period ("Mr.",
  "Dr.") counted as the end of a sentence, so the 3-sentence limit tripped early and the line
  ended at "...you say? Mr." — taking with it the question that handed the turn back to you.
- **Life RPG — the window stayed in Portuguese** even with the app in English. The whole screen
  now follows the app language.

---

## [0.1.5] — 2026-07-15

### Added
- **Permanent sessions** — what you capture is **no longer lost when you close the app**. Every
  sentence is written to disk immediately (power-loss safe), **together with the original
  audio** from the video.
  - **Reopen an old session** from Home or the Sessions tab: the sentences return to the Tutor
    Board just as they were, with the audio ready to play.
  - The audio lives **on disk, not in memory** — a 2-hour lecture doesn't weigh the app down.
    It's only read when you press play on that sentence.
  - The **30 most recent sessions** are kept; older ones roll off by themselves.
- **Sessions tab on Home** — all your sessions in one place: **search by title**, **filter by
  language**, grouping by **show**, sentence previews and **Reopen** / **Delete** shortcuts.
- **The sound of each tone** (Chinese) — in the tone legend, clicking a tone **plays the classic
  example** (妈 mā / 麻 má / 马 mǎ / 骂 mà / 吗 ma) with a native Mandarin voice. The **pinyin**
  now shows in the legend and a sound icon signals it's playable.
- **Settings as a Home tab** — the gear (Dock, floating bar, Ctrl+Alt+S) opens Settings *inside
  Home*, without opening another window.
- **Review**: **karaoke** (the audio lights the sentence up word by word), an **"Analyze"
  button** (inline AI analysis: vocabulary + tip + translation), a **responsive** window and
  rounded corners.
- **Voice speed** with a **− / +** stepper (goes up and down directly; before it only cycled).
- **Onboarding**: a mini-tutorial on getting the (free) key + a "First run" chapter in the guide.
- **Guide**: a **"View the guide on the site"** button (opens soaken.com.br/guia in the browser).
- **Floating bar**: the level meter shows the **source** (🔊 PC vs 🎤 Microphone) and a **second
  microphone meter** alongside the PC one.
- **Cloned voice (foundation)**: a **calibration** card (record a 6–30s sample) in Settings; the
  model download goes to the **D: drive**. (Engine still coming.)
- **Free × Pro**: account entitlement (Supabase `app_metadata.plan`) + gating of Pro features
  (Tutor, AI summary, cloned voice, multi-language SRS) with a **PRO** badge + upsell.

### Changed
- **Listen responds instantly** — the button says **"Opening…"** as soon as you click, instead of
  seeming frozen while Windows opens the audio capture. Show detection moved out of the way and
  now runs in the background (saves up to half a second before listening starts).
- **Reopening a big session is now instant** — a 1000-sentence lecture shows the first card in
  **~0.3s** (it used to freeze for ~6s); the rest streams in silently in the background.
- **Closing Home or the Tutor Board** now **hides** the window (preserving context/session)
  instead of shutting everything down.
- **More accurate transcription via context**: the analysis fixes obvious ASR slips using the
  neighboring sentences (e.g. Korean number+counter `시`/`일`) before translating.
- **WordDrill**: pre-warms the TTS of the words to fix (plays instantly, no wait).
- **Free × Pro**: **basic analysis** and **pronunciation** are **free**; free SRS up to
  **3 languages**.
- **Build**: publisher **"Joel Santos"**; **Electron Fuses** (anti-tampering / harder to
  reverse-engineer); releases published on the **public `Soaken`** repo (lets the code stay
  private).

### Fixed
- **The app in English showed parts in Portuguese** — the Tutor Board (and other screens) had
  Portuguese hard-coded as the default, against the app's rule (follow the PC language; anything
  other than Portuguese gets English). Anyone installing with the PC in English saw the
  **initial setup in Portuguese**.
- **Broken accents in titles** of sessions and shows (*Cora�ao da F�nix* → **Coração da Fênix**).
  New captures come out right; titles already saved with the bug need to be renamed by hand
  (⋯ menu → set show).
- **A reopened session received the new sentences** — reopening an old session and pressing
  Listen mixed both into the same screen. A new capture now **starts a clean board**. (On disk
  each session was always written to its own folder — no old session was corrupted.)
- **A reopened session's audio kept playing** after pressing Stop.
- **The ⋯ menu and delete dialog** rendered transparent on the Sessions tab.
- **Capture leak**: accumulated instances/processes held the mic/screen even with the button OFF.
- **Review**: square corners (now rounded like the other windows).

---

## [0.1.4] — 2026-07-03

### Added
- **New AI providers** (idea #4):
  - **OpenRouter** — one key unlocks hundreds of models from many providers.
  - **Custom endpoint** (OpenAI-compatible) — point it at your own server: vLLM, LocalAI, self-hosted.
  - Model selection for OpenRouter and Custom (base URL + model name).
- **Redesigned provider cards**: per-provider icon and color, a **Connected / Not connected**
  badge, and clearer *Get key* / *Test* shortcuts.
- **Per-account plan detection** (only where the provider exposes it): on **OpenRouter** the card
  shows **Free** (free tier) or the account's **remaining balance** (e.g. `$4.20`), read from
  `/auth/key`.

### Changed
- **The English flag** is now the **US** one 🇺🇸 (was 🇬🇧).
- **The "Free" badge** is now more honest: it stays on **Groq** (usable with no card) and shows
  on **OpenRouter** only when the account is actually on the free tier. **Removed from Gemini** —
  its key may be on a paid project and we can't tell from the account.

### Fixed
- **Intonation (pitch) chart**: audio was recorded as WebM, which the browser sometimes can't
  decode → the chart failed ("couldn't read the audio"). We now capture **raw mic PCM** and build
  a WAV that always decodes — the **"You"** curve shows reliably, with the **native TTS** voice
  as the comparison reference.
- **The listen button in vocabulary** is now **always visible** (previously it only appeared on hover).

---

## [0.1.3] — 2026-07-02

### Added
- **Categorize sessions by show** (idea #1): the Dashboard history groups sessions by **show**,
  in a collapsible accordion with episode counts.
  - **Automatic show detection** via Windows **SMTC** (*now playing*) — pulls the show name
    (e.g. *The Mentalist*), identical across episodes → groups on its own.
  - **Episode name** from the window title (e.g. *His Red Right Hand*) becomes the session label.
  - **Automatic episode linking** and **show from the MAJORITY of phrases** (handles switching tabs mid-session).
  - **Manual categorization** (🏷️) to set/fix the show or topic of any session.
  - Generic labels are rejected (e.g. Netflix hides the show → falls into "Other" + manual tag).
- **Session summary** (idea #2): an AI-made card (key phrases, vocabulary, grammar, practice
  focus), generated on demand (✨ button) and cached.
- **Feature guide**: its own window (opens from the Dock "?" and from Settings) explaining every
  feature AND every setting — with beginner-friendly descriptions.
- **Analyze** marked as a **Premium** feature (lock + gold styling).
- AI-curated vocabulary now enters **Review** (SRS) — not just full sentences.
- **Docs**: `IDEIAS_NOVAS.md`, `PLANO_VOZ_CLONE_CHATTERBOX.md`, `FEEDBACK_AMIGA.md`, `CHANGELOG.md`.

### Changed
- **Streaming tutor**: the question appears as it's generated and the tutor **starts speaking as
  soon as the question ends** (without waiting for the feedback) — much faster delivery.
- **Dashboard updates live** when you record/edit a session (no need to reopen).
- **X (Home) minimizes to the tray** and the guide joins the workspace (hides/returns with it).
- Settings descriptions rewritten for a non-technical user (app language, your language, audio
  source, microphone, voice/TTS, etc.).
- Floating bar: larger drag area; rebalanced button layout (labels no longer get cut off).

### Fixed
- **High CPU**: the level meter re-rendered the bar ~12×/s even in silence → now only when it
  changes bands (silence = zero re-renders).
- **Pronunciation comparison chart**: the recording is re-encoded to **WAV** → pitch always
  decodes (no more "Couldn't read this audio"); chip labels are legible.
- **Dock** no longer clips the icons (width adjusted to fit the "?").
- **Memory-leak** audit: no leaks; idle memory stable.

---

## [0.1.2] — 2026-06-30

### Added
- **Loop with word sync** (karaoke): the word highlight follows the repetitions.
- **Full UI in Korean and Chinese** (340 keys), including the **system tray** menu.
- **Rounded corners** on the Home, Settings and Tutor Board windows.
- **Voice preview** in Settings: hear the voice as you pick it (with cache pre-warming).
- **Language selector** in the pronunciation test (test English even with a Korean target, etc.).
- **"Drill this session's mistakes"**: a pronunciation drill with the words missed in the session.

### Changed
- **The X button** (Home) now **minimizes to the tray** instead of quitting the app (restore from the tray).
- **TTS voice speed** adjusted from 0.96 → **0.90** (clearer model speech, same pitch).

### Fixed
- `speakVariant` routed Kokoro voices to Edge (network) → it hung; now it uses the local worker.
- Improved contrast on the dark screens (pronunciation comparison / word drill).
- Loop no longer slows down on its own (it respects the chosen speed).

---

## [0.1.1] — 2026-06-27

### Added
- **Per-account data isolation** (each user gets their own local storage).
- **Cloud backup** (Supabase): phrases and sessions come back when you log in on another PC.
- **Google login** (OAuth via loopback).
- **Local voice (Kokoro) bundled** in the installer — opens offline, no download or key.

### Fixed
- Various audio-capture and UX tweaks based on testing feedback.

---

## [0.1.0] — 2026-06-23

### Added
- **Splash** screen + app icon.
- **Live transcription** during capture.
- **Native pronunciation** (Forvo + Wikimedia) and a **per-session pronunciation profile**.

---

## Before 0.1.0

### Note
- **2026-06-16** — Renamed to **Soaken**; rebrand + pronunciation suite + voice-clone foundation +
  full pt/en i18n.
- **2026-06-04** — Redesigned tutor UI + audio-sync fixes.
- **2026-06-02** — Per-language decks, sentence SRS, pronunciation drill and comparator.
- **2026-06-01** — Initial commit: PROFESSOR, a language tutor (Electron).
