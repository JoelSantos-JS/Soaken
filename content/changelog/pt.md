# Changelog

## [0.1.4] — 2026-07-03

### Adicionado
- **Novos provedores de IA** (ideia #4):
  - **OpenRouter** — uma chave dá acesso a centenas de modelos de vários provedores.
  - **Endpoint Custom** (OpenAI-compatível) — aponte pro seu próprio servidor: vLLM, LocalAI, self-hosted.
  - Seleção de modelo pro OpenRouter e pro Custom (URL base + nome do modelo).
- **Cards de provedor redesenhados**: ícone e cor por provedor, selo **Conectado / Não conectado**, e atalhos Get key / Testar mais claros.
- **Detecção de plano por conta** (só onde o provedor expõe): no **OpenRouter** o card mostra **Grátis** (free tier) ou o **saldo restante** da conta (ex.: $4.20), lido de /auth/key.

### Alterado
- **Bandeira do inglês** agora é a dos **EUA** 🇺🇸 (antes 🇬🇧).
- **Selo "Grátis"** ficou mais honesto: continua no **Groq** (dá pra usar sem cartão) e aparece no **OpenRouter** só quando a conta está de fato no free tier. **Removido do Gemini** — a chave dele pode estar num projeto pago e não dá pra afirmar isso pela conta.

### Corrigido
- **Gráfico de entonação (pitch)**: o áudio era gravado em WebM, que o navegador às vezes não decodifica → o gráfico falhava ("não foi possível ler o áudio"). Agora capturamos o **PCM cru do microfone** e geramos um WAV que decodifica sempre — a curva **"Você"** aparece de forma confiável, com a voz **TTS nativa** como referência.
- **Botão de ouvir no vocabulário** agora fica **sempre visível** (antes só aparecia ao passar o mouse).

## [0.1.3] — 2026-07-02

### Adicionado
- **Categorizar sessões por série** (ideia #1): o histórico do Dashboard agrupa as sessões por **série**, em accordion recolhível com contagem de episódios.
  - **Detecção automática da série** pelo **SMTC** do Windows (now playing) — traz o nome da série (ex.: The Mentalist), igual em todos os episódios → agrupa sozinho.
  - **Nome do episódio** vindo do título da janela (ex.: His Red Right Hand) vira o rótulo da sessão.
  - **Ligação automática de episódios** e **série da MAIORIA das frases** (cobre troca de aba no meio).
  - **Categorização manual** (🏷️) pra definir/corrigir a série ou tópico de qualquer sessão.
  - Rejeição de rótulos genéricos (ex.: Netflix esconde o show → cai em "Outras" + tag manual).
- **Resumo da sessão** (ideia #2): cartão feito por IA (frases-chave, vocabulário, gramática, foco de prática), gerado sob demanda (botão ✨) e cacheado.
- **Guia de funcionalidades**: janela própria (abre pelo "?" do Dock e pelas Configurações) explicando cada recurso E cada configuração — com descrições didáticas pra quem usa pela 1ª vez.
- **Analisar** marcado como recurso **Premium** (cadeado + visual dourado).
- Vocabulário curado pela IA agora entra na **Revisão** (SRS) — não só as frases inteiras.
- **Docs**: IDEIAS_NOVAS.md, PLANO_VOZ_CLONE_CHATTERBOX.md, FEEDBACK_AMIGA.md, CHANGELOG.md.

### Alterado
- **Professor com streaming**: a pergunta aparece conforme é gerada e o professor **começa a falar assim que a pergunta fecha** (sem esperar o feedback) — entrega bem mais rápida.
- **Dashboard atualiza ao vivo** ao gravar/editar uma sessão (sem reabrir).
- **X (Home) minimiza pra bandeja** e o guia entra no workspace (some/volta junto).
- Descrições das Configurações reescritas pra um usuário leigo (idioma do app, seu idioma, fonte de áudio, microfone, voz/TTS, etc.).
- Barra flutuante: área de arrasto maior; layout dos botões rebalanceado (nomes não cortam mais).

### Corrigido
- **CPU alta**: o medidor de nível re-renderizava a barra ~12×/s mesmo em silêncio → agora só quando muda de faixa (silêncio = zero re-render).
- **Gráfico de comparação de pronúncia**: a gravação é re-encodada pra **WAV** → o pitch decodifica sempre (fim do "Couldn’t read this audio"); nomes dos chips legíveis.
- **Dock** não corta mais os ícones (largura ajustada p/ caber o "?").
- Auditoria de **memory leak**: nenhum vazamento; memória idle estável.

## [0.1.2] — 2026-06-30

### Adicionado
- **Loop com sincronização de palavras** (karaokê): o destaque das palavras acompanha as repetições.
- **UI completa em coreano e chinês** (340 chaves), incluindo o menu da **bandeja do sistema**.
- **Cantos arredondados** nas janelas Home, Configurações e Tutor Board.
- **Preview de voz** nas Configurações: ouça a voz ao selecioná-la (com pré-aquecimento de cache).
- **Seletor de idioma** no teste de pronúncia (testar inglês mesmo com alvo coreano, etc.).
- **"Treinar os erros desta sessão"**: drill de pronúncia com as palavras erradas na sessão.

### Alterado
- **Botão X** (Home) agora **minimiza para a bandeja** em vez de encerrar o app (restaura pela bandeja).
- **Velocidade da voz TTS** ajustada de 0.96 → **0.90** (fala-modelo mais clara, sem mudar o tom).

### Corrigido
- speakVariant roteava vozes Kokoro para o Edge (rede) → travava; agora usa o worker local.
- Contraste das telas escuras (comparação de pronúncia / drill de palavras) melhorado.
- Loop deixou de reduzir a velocidade sozinho (respeita a velocidade escolhida).

## [0.1.1] — 2026-06-27

### Adicionado
- **Isolamento de dados por conta** (cada usuário com seu próprio armazenamento local).
- **Backup na nuvem** (Supabase): frases e sessões voltam ao logar em outro PC.
- **Login com Google** (OAuth via loopback).
- **Voz local (Kokoro) embutida** no instalador — abre offline, sem download nem chave.

### Corrigido
- Diversos ajustes de captura de áudio e UX a partir do feedback de testes.

## [0.1.0] — 2026-06-23

### Adicionado
- **Splash** de abertura + ícone do app.
- **Transcrição ao vivo** durante a captura.
- **Pronúncia nativa** (Forvo + Wikimedia) e **perfil de pronúncia por sessão**.

## Anterior a 0.1.0

### Nota
- **2026-06-16** — Renomeado para **Soaken**; rebrand + suíte de pronúncia + base de voice-clone + i18n completo pt/en.
- **2026-06-04** — UI do tutor redesenhada + correções de sincronização de áudio.
- **2026-06-02** — Decks por idioma, SRS de frases, drill de pronúncia e comparador.
- **2026-06-01** — Commit inicial: PROFESSOR, tutor de idiomas (Electron).
