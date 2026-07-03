// Changelog do app Soaken.
// Edite este arquivo para publicar novas versões — a página /changelog é gerada a partir daqui.
// Formato inspirado em Keep a Changelog. Use **negrito** dentro dos textos.
// Categorias: 'added' (Adicionado) | 'changed' (Alterado) | 'fixed' (Corrigido) | 'removed' (Removido) | 'note'

export type Category = 'added' | 'changed' | 'fixed' | 'removed' | 'note';

export interface I18nText {
  pt: string;
  en: string;
}

export interface ChangeLine {
  text: I18nText;
  sub?: I18nText[];
}

export interface ChangeGroup {
  category: Category;
  items: ChangeLine[];
}

export interface Release {
  version?: string; // ex.: '0.1.4'
  title?: I18nText; // sobrescreve o cabeçalho (ex.: "Anterior a 0.1.0")
  date?: string; // ex.: '2026-07-03'
  latest?: boolean;
  groups: ChangeGroup[];
}

export const CHANGELOG: Release[] = [
  {
    version: '0.1.4',
    date: '2026-07-03',
    latest: true,
    groups: [
      {
        category: 'added',
        items: [
          {
            text: {
              pt: '**Novos provedores de IA** (ideia #4):',
              en: '**New AI providers** (idea #4):',
            },
            sub: [
              {
                pt: '**OpenRouter** — uma chave dá acesso a centenas de modelos de vários provedores.',
                en: '**OpenRouter** — one key unlocks hundreds of models from many providers.',
              },
              {
                pt: '**Endpoint Custom** (OpenAI-compatível) — aponte pro seu próprio servidor: vLLM, LocalAI, self-hosted.',
                en: '**Custom endpoint** (OpenAI-compatible) — point it at your own server: vLLM, LocalAI, self-hosted.',
              },
              {
                pt: 'Seleção de modelo pro OpenRouter e pro Custom (URL base + nome do modelo).',
                en: 'Model selection for OpenRouter and Custom (base URL + model name).',
              },
            ],
          },
          {
            text: {
              pt: '**Cards de provedor redesenhados**: ícone e cor por provedor, selo **Conectado / Não conectado**, e atalhos Get key / Testar mais claros.',
              en: '**Redesigned provider cards**: per-provider icon and color, a **Connected / Not connected** badge, and clearer Get key / Test shortcuts.',
            },
          },
          {
            text: {
              pt: '**Detecção de plano por conta** (só onde o provedor expõe): no **OpenRouter** o card mostra **Grátis** (free tier) ou o **saldo restante** da conta (ex.: $4.20), lido de /auth/key.',
              en: '**Per-account plan detection** (only where the provider exposes it): on **OpenRouter** the card shows **Free** (free tier) or the account’s **remaining balance** (e.g. $4.20), read from /auth/key.',
            },
          },
        ],
      },
      {
        category: 'changed',
        items: [
          {
            text: {
              pt: '**Bandeira do inglês** agora é a dos **EUA** 🇺🇸 (antes 🇬🇧).',
              en: '**The English flag** is now the **US** one 🇺🇸 (was 🇬🇧).',
            },
          },
          {
            text: {
              pt: '**Selo "Grátis"** ficou mais honesto: continua no **Groq** (dá pra usar sem cartão) e aparece no **OpenRouter** só quando a conta está de fato no free tier. **Removido do Gemini** — a chave dele pode estar num projeto pago e não dá pra afirmar isso pela conta.',
              en: '**The "Free" badge** is now more honest: it stays on **Groq** (usable with no card) and shows on **OpenRouter** only when the account is actually on the free tier. **Removed from Gemini** — its key may be on a paid project and we can’t tell from the account.',
            },
          },
        ],
      },
      {
        category: 'fixed',
        items: [
          {
            text: {
              pt: '**Gráfico de entonação (pitch)**: o áudio era gravado em WebM, que o navegador às vezes não decodifica → o gráfico falhava ("não foi possível ler o áudio"). Agora capturamos o **PCM cru do microfone** e geramos um WAV que decodifica sempre — a curva **"Você"** aparece de forma confiável, com a voz **TTS nativa** como referência.',
              en: '**Intonation (pitch) chart**: audio was recorded as WebM, which the browser sometimes can’t decode → the chart failed ("couldn’t read the audio"). We now capture **raw mic PCM** and build a WAV that always decodes — the **"You"** curve shows reliably, with the **native TTS** voice as the comparison reference.',
            },
          },
          {
            text: {
              pt: '**Botão de ouvir no vocabulário** agora fica **sempre visível** (antes só aparecia ao passar o mouse).',
              en: '**The listen button in vocabulary** is now **always visible** (previously it only appeared on hover).',
            },
          },
        ],
      },
    ],
  },
  {
    version: '0.1.3',
    date: '2026-07-02',
    groups: [
      {
        category: 'added',
        items: [
          {
            text: {
              pt: '**Categorizar sessões por série** (ideia #1): o histórico do Dashboard agrupa as sessões por **série**, em accordion recolhível com contagem de episódios.',
              en: '**Categorize sessions by show** (idea #1): the Dashboard history groups sessions by **show**, in a collapsible accordion with episode counts.',
            },
            sub: [
              {
                pt: '**Detecção automática da série** pelo **SMTC** do Windows (now playing) — traz o nome da série (ex.: The Mentalist), igual em todos os episódios → agrupa sozinho.',
                en: '**Automatic show detection** via Windows **SMTC** (now playing) — pulls the show name (e.g. The Mentalist), identical across episodes → groups on its own.',
              },
              {
                pt: '**Nome do episódio** vindo do título da janela (ex.: His Red Right Hand) vira o rótulo da sessão.',
                en: '**Episode name** from the window title (e.g. His Red Right Hand) becomes the session label.',
              },
              {
                pt: '**Ligação automática de episódios** e **série da MAIORIA das frases** (cobre troca de aba no meio).',
                en: '**Automatic episode linking** and **show from the MAJORITY of phrases** (handles switching tabs mid-session).',
              },
              {
                pt: '**Categorização manual** (🏷️) pra definir/corrigir a série ou tópico de qualquer sessão.',
                en: '**Manual categorization** (🏷️) to set/fix the show or topic of any session.',
              },
              {
                pt: 'Rejeição de rótulos genéricos (ex.: Netflix esconde o show → cai em "Outras" + tag manual).',
                en: 'Generic labels are rejected (e.g. Netflix hides the show → falls into "Other" + manual tag).',
              },
            ],
          },
          {
            text: {
              pt: '**Resumo da sessão** (ideia #2): cartão feito por IA (frases-chave, vocabulário, gramática, foco de prática), gerado sob demanda (botão ✨) e cacheado.',
              en: '**Session summary** (idea #2): an AI-made card (key phrases, vocabulary, grammar, practice focus), generated on demand (✨ button) and cached.',
            },
          },
          {
            text: {
              pt: '**Guia de funcionalidades**: janela própria (abre pelo "?" do Dock e pelas Configurações) explicando cada recurso E cada configuração — com descrições didáticas pra quem usa pela 1ª vez.',
              en: '**Feature guide**: its own window (opens from the Dock "?" and from Settings) explaining every feature AND every setting — with beginner-friendly descriptions.',
            },
          },
          {
            text: {
              pt: '**Analisar** marcado como recurso **Premium** (cadeado + visual dourado).',
              en: '**Analyze** marked as a **Premium** feature (lock + gold styling).',
            },
          },
          {
            text: {
              pt: 'Vocabulário curado pela IA agora entra na **Revisão** (SRS) — não só as frases inteiras.',
              en: 'AI-curated vocabulary now enters **Review** (SRS) — not just full sentences.',
            },
          },
          {
            text: {
              pt: '**Docs**: IDEIAS_NOVAS.md, PLANO_VOZ_CLONE_CHATTERBOX.md, FEEDBACK_AMIGA.md, CHANGELOG.md.',
              en: '**Docs**: IDEIAS_NOVAS.md, PLANO_VOZ_CLONE_CHATTERBOX.md, FEEDBACK_AMIGA.md, CHANGELOG.md.',
            },
          },
        ],
      },
      {
        category: 'changed',
        items: [
          {
            text: {
              pt: '**Professor com streaming**: a pergunta aparece conforme é gerada e o professor **começa a falar assim que a pergunta fecha** (sem esperar o feedback) — entrega bem mais rápida.',
              en: '**Streaming tutor**: the question appears as it’s generated and the tutor **starts speaking as soon as the question ends** (without waiting for the feedback) — much faster delivery.',
            },
          },
          {
            text: {
              pt: '**Dashboard atualiza ao vivo** ao gravar/editar uma sessão (sem reabrir).',
              en: '**Dashboard updates live** when you record/edit a session (no need to reopen).',
            },
          },
          {
            text: {
              pt: '**X (Home) minimiza pra bandeja** e o guia entra no workspace (some/volta junto).',
              en: '**X (Home) minimizes to the tray** and the guide joins the workspace (hides/returns with it).',
            },
          },
          {
            text: {
              pt: 'Descrições das Configurações reescritas pra um usuário leigo (idioma do app, seu idioma, fonte de áudio, microfone, voz/TTS, etc.).',
              en: 'Settings descriptions rewritten for a non-technical user (app language, your language, audio source, microphone, voice/TTS, etc.).',
            },
          },
          {
            text: {
              pt: 'Barra flutuante: área de arrasto maior; layout dos botões rebalanceado (nomes não cortam mais).',
              en: 'Floating bar: larger drag area; rebalanced button layout (labels no longer get cut off).',
            },
          },
        ],
      },
      {
        category: 'fixed',
        items: [
          {
            text: {
              pt: '**CPU alta**: o medidor de nível re-renderizava a barra ~12×/s mesmo em silêncio → agora só quando muda de faixa (silêncio = zero re-render).',
              en: '**High CPU**: the level meter re-rendered the bar ~12×/s even in silence → now only when it changes bands (silence = zero re-renders).',
            },
          },
          {
            text: {
              pt: '**Gráfico de comparação de pronúncia**: a gravação é re-encodada pra **WAV** → o pitch decodifica sempre (fim do "Couldn’t read this audio"); nomes dos chips legíveis.',
              en: '**Pronunciation comparison chart**: the recording is re-encoded to **WAV** → pitch always decodes (no more "Couldn’t read this audio"); chip labels are legible.',
            },
          },
          {
            text: {
              pt: '**Dock** não corta mais os ícones (largura ajustada p/ caber o "?").',
              en: '**Dock** no longer clips the icons (width adjusted to fit the "?").',
            },
          },
          {
            text: {
              pt: 'Auditoria de **memory leak**: nenhum vazamento; memória idle estável.',
              en: '**Memory-leak** audit: no leaks; idle memory stable.',
            },
          },
        ],
      },
    ],
  },
  {
    version: '0.1.2',
    date: '2026-06-30',
    groups: [
      {
        category: 'added',
        items: [
          {
            text: {
              pt: '**Loop com sincronização de palavras** (karaokê): o destaque das palavras acompanha as repetições.',
              en: '**Loop with word sync** (karaoke): the word highlight follows the repetitions.',
            },
          },
          {
            text: {
              pt: '**UI completa em coreano e chinês** (340 chaves), incluindo o menu da **bandeja do sistema**.',
              en: '**Full UI in Korean and Chinese** (340 keys), including the **system tray** menu.',
            },
          },
          {
            text: {
              pt: '**Cantos arredondados** nas janelas Home, Configurações e Tutor Board.',
              en: '**Rounded corners** on the Home, Settings and Tutor Board windows.',
            },
          },
          {
            text: {
              pt: '**Preview de voz** nas Configurações: ouça a voz ao selecioná-la (com pré-aquecimento de cache).',
              en: '**Voice preview** in Settings: hear the voice as you pick it (with cache pre-warming).',
            },
          },
          {
            text: {
              pt: '**Seletor de idioma** no teste de pronúncia (testar inglês mesmo com alvo coreano, etc.).',
              en: '**Language selector** in the pronunciation test (test English even with a Korean target, etc.).',
            },
          },
          {
            text: {
              pt: '**"Treinar os erros desta sessão"**: drill de pronúncia com as palavras erradas na sessão.',
              en: '**"Drill this session’s mistakes"**: a pronunciation drill with the words missed in the session.',
            },
          },
        ],
      },
      {
        category: 'changed',
        items: [
          {
            text: {
              pt: '**Botão X** (Home) agora **minimiza para a bandeja** em vez de encerrar o app (restaura pela bandeja).',
              en: '**The X button** (Home) now **minimizes to the tray** instead of quitting the app (restore from the tray).',
            },
          },
          {
            text: {
              pt: '**Velocidade da voz TTS** ajustada de 0.96 → **0.90** (fala-modelo mais clara, sem mudar o tom).',
              en: '**TTS voice speed** adjusted from 0.96 → **0.90** (clearer model speech, same pitch).',
            },
          },
        ],
      },
      {
        category: 'fixed',
        items: [
          {
            text: {
              pt: 'speakVariant roteava vozes Kokoro para o Edge (rede) → travava; agora usa o worker local.',
              en: 'speakVariant routed Kokoro voices to Edge (network) → it hung; now it uses the local worker.',
            },
          },
          {
            text: {
              pt: 'Contraste das telas escuras (comparação de pronúncia / drill de palavras) melhorado.',
              en: 'Improved contrast on the dark screens (pronunciation comparison / word drill).',
            },
          },
          {
            text: {
              pt: 'Loop deixou de reduzir a velocidade sozinho (respeita a velocidade escolhida).',
              en: 'Loop no longer slows down on its own (it respects the chosen speed).',
            },
          },
        ],
      },
    ],
  },
  {
    version: '0.1.1',
    date: '2026-06-27',
    groups: [
      {
        category: 'added',
        items: [
          {
            text: {
              pt: '**Isolamento de dados por conta** (cada usuário com seu próprio armazenamento local).',
              en: '**Per-account data isolation** (each user gets their own local storage).',
            },
          },
          {
            text: {
              pt: '**Backup na nuvem** (Supabase): frases e sessões voltam ao logar em outro PC.',
              en: '**Cloud backup** (Supabase): phrases and sessions come back when you log in on another PC.',
            },
          },
          {
            text: {
              pt: '**Login com Google** (OAuth via loopback).',
              en: '**Google login** (OAuth via loopback).',
            },
          },
          {
            text: {
              pt: '**Voz local (Kokoro) embutida** no instalador — abre offline, sem download nem chave.',
              en: '**Local voice (Kokoro) bundled** in the installer — opens offline, no download or key.',
            },
          },
        ],
      },
      {
        category: 'fixed',
        items: [
          {
            text: {
              pt: 'Diversos ajustes de captura de áudio e UX a partir do feedback de testes.',
              en: 'Various audio-capture and UX tweaks based on testing feedback.',
            },
          },
        ],
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-06-23',
    groups: [
      {
        category: 'added',
        items: [
          {
            text: {
              pt: '**Splash** de abertura + ícone do app.',
              en: '**Splash** screen + app icon.',
            },
          },
          {
            text: {
              pt: '**Transcrição ao vivo** durante a captura.',
              en: '**Live transcription** during capture.',
            },
          },
          {
            text: {
              pt: '**Pronúncia nativa** (Forvo + Wikimedia) e **perfil de pronúncia por sessão**.',
              en: '**Native pronunciation** (Forvo + Wikimedia) and a **per-session pronunciation profile**.',
            },
          },
        ],
      },
    ],
  },
  {
    title: { pt: 'Anterior a 0.1.0', en: 'Before 0.1.0' },
    groups: [
      {
        category: 'note',
        items: [
          {
            text: {
              pt: '**2026-06-16** — Renomeado para **Soaken**; rebrand + suíte de pronúncia + base de voice-clone + i18n completo pt/en.',
              en: '**2026-06-16** — Renamed to **Soaken**; rebrand + pronunciation suite + voice-clone foundation + full pt/en i18n.',
            },
          },
          {
            text: {
              pt: '**2026-06-04** — UI do tutor redesenhada + correções de sincronização de áudio.',
              en: '**2026-06-04** — Redesigned tutor UI + audio-sync fixes.',
            },
          },
          {
            text: {
              pt: '**2026-06-02** — Decks por idioma, SRS de frases, drill de pronúncia e comparador.',
              en: '**2026-06-02** — Per-language decks, sentence SRS, pronunciation drill and comparator.',
            },
          },
          {
            text: {
              pt: '**2026-06-01** — Commit inicial: PROFESSOR, tutor de idiomas (Electron).',
              en: '**2026-06-01** — Initial commit: PROFESSOR, a language tutor (Electron).',
            },
          },
        ],
      },
    ],
  },
];
