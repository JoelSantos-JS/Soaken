# Changelog

## [0.1.4] — 2026-07-03

### Added
- **New AI providers** (idea #4):
  - **OpenRouter** — one key unlocks hundreds of models from many providers.
  - **Custom endpoint** (OpenAI-compatible) — point it at your own server: vLLM, LocalAI, self-hosted.
  - Model selection for OpenRouter and Custom (base URL + model name).
- **Redesigned provider cards**: per-provider icon and color, a **Connected / Not connected** badge, and clearer Get key / Test shortcuts.
- **Per-account plan detection** (only where the provider exposes it): on **OpenRouter** the card shows **Free** (free tier) or the account’s **remaining balance** (e.g. $4.20), read from /auth/key.

### Changed
- **The English flag** is now the **US** one 🇺🇸 (was 🇬🇧).
- **The "Free" badge** is now more honest: it stays on **Groq** (usable with no card) and shows on **OpenRouter** only when the account is actually on the free tier. **Removed from Gemini** — its key may be on a paid project and we can’t tell from the account.

### Fixed
- **Intonation (pitch) chart**: audio was recorded as WebM, which the browser sometimes can’t decode → the chart failed ("couldn’t read the audio"). We now capture **raw mic PCM** and build a WAV that always decodes — the **"You"** curve shows reliably, with the **native TTS** voice as the comparison reference.
- **The listen button in vocabulary** is now **always visible** (previously it only appeared on hover).

## [0.1.3] — 2026-07-02

### Added
- **Categorize sessions by show** (idea #1): the Dashboard history groups sessions by **show**, in a collapsible accordion with episode counts.
  - **Automatic show detection** via Windows **SMTC** (now playing) — pulls the show name (e.g. The Mentalist), identical across episodes → groups on its own.
  - **Episode name** from the window title (e.g. His Red Right Hand) becomes the session label.
  - **Automatic episode linking** and **show from the MAJORITY of phrases** (handles switching tabs mid-session).
  - **Manual categorization** (🏷️) to set/fix the show or topic of any session.
  - Generic labels are rejected (e.g. Netflix hides the show → falls into "Other" + manual tag).
- **Session summary** (idea #2): an AI-made card (key phrases, vocabulary, grammar, practice focus), generated on demand (✨ button) and cached.
- **Feature guide**: its own window (opens from the Dock "?" and from Settings) explaining every feature AND every setting — with beginner-friendly descriptions.
- **Analyze** marked as a **Premium** feature (lock + gold styling).
- AI-curated vocabulary now enters **Review** (SRS) — not just full sentences.
- **Docs**: IDEIAS_NOVAS.md, PLANO_VOZ_CLONE_CHATTERBOX.md, FEEDBACK_AMIGA.md, CHANGELOG.md.

### Changed
- **Streaming tutor**: the question appears as it’s generated and the tutor **starts speaking as soon as the question ends** (without waiting for the feedback) — much faster delivery.
- **Dashboard updates live** when you record/edit a session (no need to reopen).
- **X (Home) minimizes to the tray** and the guide joins the workspace (hides/returns with it).
- Settings descriptions rewritten for a non-technical user (app language, your language, audio source, microphone, voice/TTS, etc.).
- Floating bar: larger drag area; rebalanced button layout (labels no longer get cut off).

### Fixed
- **High CPU**: the level meter re-rendered the bar ~12×/s even in silence → now only when it changes bands (silence = zero re-renders).
- **Pronunciation comparison chart**: the recording is re-encoded to **WAV** → pitch always decodes (no more "Couldn’t read this audio"); chip labels are legible.
- **Dock** no longer clips the icons (width adjusted to fit the "?").
- **Memory-leak** audit: no leaks; idle memory stable.

## [0.1.2] — 2026-06-30

### Added
- **Loop with word sync** (karaoke): the word highlight follows the repetitions.
- **Full UI in Korean and Chinese** (340 keys), including the **system tray** menu.
- **Rounded corners** on the Home, Settings and Tutor Board windows.
- **Voice preview** in Settings: hear the voice as you pick it (with cache pre-warming).
- **Language selector** in the pronunciation test (test English even with a Korean target, etc.).
- **"Drill this session’s mistakes"**: a pronunciation drill with the words missed in the session.

### Changed
- **The X button** (Home) now **minimizes to the tray** instead of quitting the app (restore from the tray).
- **TTS voice speed** adjusted from 0.96 → **0.90** (clearer model speech, same pitch).

### Fixed
- speakVariant routed Kokoro voices to Edge (network) → it hung; now it uses the local worker.
- Improved contrast on the dark screens (pronunciation comparison / word drill).
- Loop no longer slows down on its own (it respects the chosen speed).

## [0.1.1] — 2026-06-27

### Added
- **Per-account data isolation** (each user gets their own local storage).
- **Cloud backup** (Supabase): phrases and sessions come back when you log in on another PC.
- **Google login** (OAuth via loopback).
- **Local voice (Kokoro) bundled** in the installer — opens offline, no download or key.

### Fixed
- Various audio-capture and UX tweaks based on testing feedback.

## [0.1.0] — 2026-06-23

### Added
- **Splash** screen + app icon.
- **Live transcription** during capture.
- **Native pronunciation** (Forvo + Wikimedia) and a **per-session pronunciation profile**.

## Before 0.1.0

### Note
- **2026-06-16** — Renamed to **Soaken**; rebrand + pronunciation suite + voice-clone foundation + full pt/en i18n.
- **2026-06-04** — Redesigned tutor UI + audio-sync fixes.
- **2026-06-02** — Per-language decks, sentence SRS, pronunciation drill and comparator.
- **2026-06-01** — Initial commit: PROFESSOR, a language tutor (Electron).
