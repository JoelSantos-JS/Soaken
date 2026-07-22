# Changelog

All notable changes to **Soaken** are recorded here.

Format based on Keep a Changelog; the project follows Semantic Versioning.

Categories: **Added** (new), **Changed** (behavior change),
**Fixed** (bug), **Removed**.

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
