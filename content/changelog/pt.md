# Changelog

Todas as mudanças relevantes do **Soaken** ficam registradas aqui.

Formato baseado em Keep a Changelog; o projeto segue Versionamento Semântico.

Categorias: **Adicionado** (novo), **Alterado** (mudança de comportamento),
**Corrigido** (bug), **Removido**.

---

## [0.1.9] — 2026-07-22

### Corrigido
- **IA voltou a funcionar para todo mundo (Gemini).** Os modelos `*-latest` que o app oferece
  passaram a apontar para a geração 3.x do Gemini, que rejeita a configuração antiga — e **toda**
  chamada de IA (RPG, análise, treino, transcrição) falhava com erro 400. A configuração agora se
  adapta ao modelo, e um teste de fumaça contra a API real entra no ritual de release para essa
  classe de quebra não passar de novo.
- **Sair da conta não fecha mais o app.** O logout derrubava o programa inteiro em vez de voltar
  para a tela de login.
- **Atualização reabre o app sozinha.** Instalava no fechamento e não voltava ("apareceu de abrir
  e sumiu"); agora instala silencioso e reabre. Clicar na notificação também aplica na hora.
- **Animação de abertura descongelada.** O Windows marcava a janela transparente do splash como
  "oculta" por engano e pausava a renderização — a animação nascia congelada no primeiro quadro.
- **Virar Pro aparece sem relogar.** O plano mudado no servidor só chegava no próximo login; agora
  o app revalida a conta ao abrir e as janelas atualizam sozinhas.

---

## [0.1.8] — 2026-07-22

### Corrigido
- **Botão Análise na barra flutuante alinhado com o Início.** Para conta Pro sem o histórico mínimo
  (10 sessões ou 7 dias) ele **sumia** da barra; agora aparece e o clique mostra **quanto falta**,
  igual ao Início. Conta free continua vendo o cadeado com o upsell.

---

## [0.1.7] — 2026-07-22

### Adicionado
- **Life RPG — praticar a correção.** O card **"Você poderia dizer"** ganhou um botão **praticar**:
  você grava repetindo a frase corrigida e ele compara **palavra por palavra** com a forma certa,
  mostrando a nota e o que faltou ou sobrou. Ler a correção vira treinar a correção.

### Corrigido
- **Atualização automática consertada.** O app exigia que as atualizações viessem assinadas
  digitalmente — sem termos certificado de código ainda — então **toda** atualização era baixada e
  rejeitada em silêncio. A exigência sai até o certificado existir; desta versão em diante o app
  se atualiza sozinho de novo.

---

## [0.1.6] — 2026-07-22

### Adicionado
- **Life RPG** *(em desenvolvimento — restrito)* — cenas do dia a dia que você resolve **falando**:
  um NPC te responde, corrige em personagem e o **mundo lembra** do que você fez (quem já te
  conhece, o que ficou pendente) na próxima cena. A opção aparece no menu para todo mundo, mas
  ainda **só abre nas contas liberadas**; quem não tem acesso vê um aviso explicando o motivo, em
  vez de um botão que não faz nada.
- **Life RPG — inglês simples de verdade.** As falas agora ficam dentro das **~5000 palavras mais
  comuns** do inglês: frase curta, palavra do dia a dia, sem termo literário. Quem está aprendendo
  precisa entender para conseguir responder — e quem não entende, para de falar.
- **Life RPG — 16 cenários** (eram 2), em três trilhas: **cotidiano** (loja, médico, vizinho,
  aeroporto, aluguel, suporte, primeiro dia, táxi), **fantasia** (um portão que só abre para quem
  fala a verdade, um dragão entediado, um rei que esqueceu quem é) e **dark** (uma audiência, uma
  acusação injusta, um amigo que mentiu) — estas últimas forçam a pessoa a argumentar mais.
- **Life RPG — modo livre (mãos-livres).** Um botão liga a escuta contínua: você fala e, quando faz
  uma pausa, o app envia sozinho — sem segurar botão. Pensado para mic Bluetooth/headset. Depois que
  o personagem responde, ele volta a te ouvir automaticamente. Um detector de voz decide quando você
  terminou (ignora pausas curtas entre palavras e não dispara com clique ou tosse).
- **Life RPG — a correção que aparece na tela.** Quando a sua frase tem erro, agora aparece
  **"Você poderia dizer"** logo abaixo dela, com a frase reescrita em inglês simples — sem o
  personagem parar a cena para dar aula. Antes o inglês torto passava sem nenhuma correção visível.
- **Life RPG — personagens entram e saem da cena.** Quando alguém é mencionado e poderia estar ali
  — "uma testemunha te viu", "vou chamar meu gerente" — agora essa pessoa **entra e fala**, e você
  responde a ela de frente; depois ela **sai** ("espera lá fora") e a cena volta a quem ficou. Vale
  para qualquer cenário, não só um.
- **Life RPG — conversas não empacam mais.** O personagem parou de repetir suas palavras de volta
  ("então você estava em casa fazendo comida...") e a cena, quando começa a andar em círculos, é
  **forçada a um desfecho** — você convence e é liberado, ou não e a porta se fecha — em vez de ficar
  no eterno "vamos checar isso depois".
- **Life RPG — mais de um personagem na cena.** Um novo personagem pode entrar no meio da conversa,
  se apresentando, **cada um com uma voz diferente** — e a voz **casa com o gênero** do personagem
  (homem soa masculino, mulher feminino, não-humano neutro), com uma cor própria na tela. Máximo de
  3, e ninguém perde o fio da conversa. Um gerente que o balconista chama, uma testemunha, um amigo que
  toma partido — a segunda voz existe para aumentar a pressão e fazer você falar mais.
- **Life RPG — os personagens têm humor.** Sarcasmo seco, sempre sobre a situação e nunca sobre o
  inglês de quem joga. A correção continua vindo na frente da piada.
- **Página de créditos** (CREDITS.md) — ideias que viraram produto agora têm nome.
  As **sessões** e os **trechos** são ideia da **Hunji**.

### Alterado
- **Voz local com desvio automático** — no início o app agora **mede quanto tempo a voz local leva
  para sintetizar** e, se a máquina não der conta, passa a usar a voz por rede. Em processadores
  mais antigos (sem AVX2/VNNI) a voz local chegava a levar **~40s por frase**; pela rede, ~1s.
  Vale para o app inteiro — no Tutor Board o cache escondia o problema, mas cada palavra nova
  pagava a espera. A medição roda **uma vez só por máquina** e fica guardada: repeti-la a cada
  início custava segundos de processador competindo com a tela de abertura.
- **O botão Análise não some mais.** Numa conta Pro sem histórico suficiente ele desaparecia, o que
  é indistinguível de um app quebrado. Agora ele fica visível e **o clique explica a espera**:
  quantas sessões e quantos dias faltam, e que **o que vier primeiro já libera**.

### Corrigido
- **Life RPG com modelos Gemini novos (3.x).** Escolher um modelo 3.x quebrava o RPG (HTTP 400,
  "only works in thinking mode") porque forçávamos o modo de raciocínio desligado, que só o 2.5
  aceita. Agora a config de raciocínio segue a versão do modelo — os 3.x usam raciocínio dinâmico
  e um teto de saída maior. Modelos mais capazes rendem cenas muito mais criativas e surpreendentes.
- **Login com Google travado em "aguarde".** Fechar a aba do navegador sem concluir deixava a tela
  presa por até **10 minutos** (o tempo limite do OAuth), porque desistir no navegador não avisa o
  app. Agora aparece um **"Cancelar login com Google"** que libera na hora — e desistir deixou de
  ser tratado como erro: a tela apenas volta ao normal, sem mensagem vermelha.
- **Life RPG — o microfone gravava o próprio NPC.** Apertar para falar agora **corta a fala dele na
  hora**; antes a voz saía pelo alto-falante, entrava pelo microfone e a transcrição vinha errada.
- **Life RPG — falas curtas se perdiam.** Soltar o botão antes do microfone terminar de abrir fazia
  o turno virar um nada silencioso, sem áudio e sem aviso.
- **Life RPG — a fala do personagem era cortada no meio.** Um ponto de abreviação ("Mr.", "Dr.")
  contava como fim de frase, então o limite de 3 frases estourava cedo e a fala terminava em
  "...you say? Mr." — levando junto a pergunta que devolvia a palavra ao usuário.
- **Life RPG — a janela ficava em português** mesmo com o app em inglês. Toda a tela passou a
  seguir o idioma do app.

---

## [0.1.5] — 2026-07-15

### Adicionado
- **Sessões permanentes** — o que você captura **não se perde mais ao fechar o app**. Cada frase é
  gravada no disco na hora (à prova de queda de energia), **junto com o áudio original** do vídeo.
  - **Reabrir uma sessão antiga** pelo Início ou pela aba Sessões: as frases voltam pro Tutor Board
    do jeito que estavam, com o áudio pronto pra tocar.
  - O áudio fica **em disco, não na memória** — uma palestra de 2h não pesa no app. Ele só é lido
    quando você aperta o play daquela frase.
  - As **30 sessões mais recentes** ficam guardadas; as mais antigas saem sozinhas.
- **Aba Sessões no Início** — todas as suas sessões num lugar só: **busca por título**, **filtro por
  idioma**, agrupamento por **série**, prévia das frases e atalhos de **Reabrir** / **Excluir**.
- **Som de cada tom** (chinês) — na legenda de tons, clicar em um tom **toca o exemplo clássico**
  (妈 mā / 麻 má / 马 mǎ / 骂 mà / 吗 ma) com voz nativa de mandarim. O **pinyin** agora aparece na
  legenda e um ícone de som mostra que dá pra ouvir.
- **Configurações como aba no Início** — a engrenagem (Dock, barra flutuante, Ctrl+Alt+S) abre as
  Configurações *dentro do Início*, sem abrir outra janela.
- **Review (Revisão)**: **karaokê** (o áudio acende a frase palavra por palavra), **botão "Analisar"**
  (análise da IA inline: vocabulário + dica + tradução), janela **responsiva** e cantos arredondados.
- **Velocidade da voz** com stepper **− / +** (sobe e desce direto, antes só ciclava).
- **Onboarding**: mini-tutorial de como pegar a chave (grátis) + capítulo "Primeiro acesso" no guia.
- **Guia**: botão **"Ver o guia no site"** (abre soaken.com.br/guia no navegador).
- **Barra flutuante**: medidor de nível mostra a **fonte** (🔊 PC vs 🎤 Microfone) e um **2º medidor
  do microfone** em paralelo ao do PC.
- **Voz clonada (base)**: card de **calibração** (gravar amostra 6–30s) nas Configurações; download
  do modelo vai pro **disco D:**. (Motor ainda em breve.)
- **Free × Pro**: entitlement pela conta (Supabase `app_metadata.plan`) + gating de recursos Pro
  (Professor, resumo por IA, voz clonada, SRS multi-idioma) com selo **PRO** + upsell.

### Alterado
- **Escutar responde na hora** — o botão avisa **"Abrindo…"** assim que você clica, em vez de parecer
  travado enquanto o Windows abre a captura de áudio. A detecção da série saiu do caminho e agora roda
  em segundo plano (economiza até meio segundo até começar a escutar).
- **Reabrir uma sessão grande ficou instantâneo** — uma palestra de 1000 frases mostra o primeiro card
  em **~0,3s** (antes travava ~6s); o resto entra sozinho em segundo plano, sem prender a tela.
- **Fechar o Início ou o Tutor Board** agora **esconde** a janela (preserva o contexto/sessão),
  em vez de fechar tudo junto.
- **Transcrição mais precisa por contexto**: a análise corrige deslizes óbvios do ASR usando as
  frases vizinhas (ex.: número+contador coreano `시`/`일`) antes de traduzir.
- **WordDrill**: pré-aquece o TTS das palavras a corrigir (toca na hora, sem espera).
- **Free × Pro**: **análise básica** e **pronúncia** são **free**; SRS free até **3 idiomas**.
- **Build**: publisher **"Joel Santos"**; **Electron Fuses** (anti-adulteração / dificulta engenharia
  reversa); releases publicadas no repo **público `Soaken`** (permite o código ficar privado).

### Corrigido
- **App em inglês mostrava partes em português** — o Tutor Board (e as outras telas) tinham o português
  cravado como padrão, contrariando a regra do app (segue o idioma do PC; fora o português, inglês).
  Quem instalava com o PC em inglês via o **setup inicial em português**.
- **Acentos quebrados nos títulos** de sessão e série (*Cora�ao da F�nix* → **Coração da Fênix**).
  Capturas novas vêm certas; títulos já salvos com o erro precisam ser renomeados na mão (menu ⋯ →
  definir série).
- **Sessão reaberta recebia as frases novas** — reabrir uma sessão antiga e apertar Escutar misturava
  as duas na mesma tela. Agora a captura nova **começa um board limpo**. (No disco cada sessão sempre
  foi gravada na sua própria pasta — nenhuma sessão antiga foi corrompida.)
- **Áudio da sessão reaberta continuava tocando** depois de apertar Parar.
- **Menu ⋯ e caixa de exclusão** apareciam transparentes na aba Sessões.
- **Vazamento de captura**: instâncias/processos acumulados seguravam mic/tela mesmo com o botão OFF.
- **Review**: cantos retos (agora arredondados como as outras janelas).

---

## [0.1.4] — 2026-07-03

### Adicionado
- **Novos provedores de IA** (ideia #4):
  - **OpenRouter** — uma chave dá acesso a centenas de modelos de vários provedores.
  - **Endpoint Custom** (OpenAI-compatível) — aponte pro seu próprio servidor: vLLM, LocalAI, self-hosted.
  - Seleção de modelo pro OpenRouter e pro Custom (URL base + nome do modelo).
- **Cards de provedor redesenhados**: ícone e cor por provedor, selo **Conectado / Não conectado**,
  e atalhos *Get key* / *Testar* mais claros.
- **Detecção de plano por conta** (só onde o provedor expõe): no **OpenRouter** o card mostra
  **Grátis** (free tier) ou o **saldo restante** da conta (ex.: `$4.20`), lido de `/auth/key`.

### Alterado
- **Bandeira do inglês** agora é a dos **EUA** 🇺🇸 (antes 🇬🇧).
- **Selo "Grátis"** ficou mais honesto: continua no **Groq** (dá pra usar sem cartão) e aparece no
  **OpenRouter** só quando a conta está de fato no free tier. **Removido do Gemini** — a chave dele
  pode estar num projeto pago e não dá pra afirmar isso pela conta.

### Corrigido
- **Gráfico de entonação (pitch)**: o áudio era gravado em WebM, que o navegador às vezes não
  decodifica → o gráfico falhava ("não foi possível ler o áudio"). Agora capturamos o **PCM cru do
  microfone** e geramos um WAV que decodifica sempre — a curva **"Você"** aparece de forma confiável,
  com a voz **TTS nativa** como referência de comparação.
- **Botão de ouvir no vocabulário** agora fica **sempre visível** (antes só aparecia ao passar o mouse).

---

## [0.1.3] — 2026-07-02

### Adicionado
- **Categorizar sessões por série** (ideia #1): o histórico do Dashboard agrupa as sessões por
  **série**, em accordion recolhível com contagem de episódios.
  - **Detecção automática da série** pelo **SMTC** do Windows (*now playing*) — traz o nome da série
    (ex.: *The Mentalist*), igual em todos os episódios → agrupa sozinho.
  - **Nome do episódio** vindo do título da janela (ex.: *His Red Right Hand*) vira o rótulo da sessão.
  - **Ligação automática de episódios** e **série da MAIORIA das frases** (cobre troca de aba no meio).
  - **Categorização manual** (🏷️) pra definir/corrigir a série ou tópico de qualquer sessão.
  - Rejeição de rótulos genéricos (ex.: Netflix esconde o show → cai em "Outras" + tag manual).
- **Resumo da sessão** (ideia #2): cartão feito por IA (frases-chave, vocabulário, gramática, foco de
  prática), gerado sob demanda (botão ✨) e cacheado.
- **Guia de funcionalidades**: janela própria (abre pelo "?" do Dock e pelas Configurações) explicando
  cada recurso E cada configuração — com descrições didáticas pra quem usa pela 1ª vez.
- **Analisar** marcado como recurso **Premium** (cadeado + visual dourado).
- Vocabulário curado pela IA agora entra na **Revisão** (SRS) — não só as frases inteiras.
- **Docs**: `IDEIAS_NOVAS.md`, `PLANO_VOZ_CLONE_CHATTERBOX.md`, `FEEDBACK_AMIGA.md`, `CHANGELOG.md`.

### Alterado
- **Professor com streaming**: a pergunta aparece conforme é gerada e o professor **começa a falar
  assim que a pergunta fecha** (sem esperar o feedback) — entrega bem mais rápida.
- **Dashboard atualiza ao vivo** ao gravar/editar uma sessão (sem reabrir).
- **X (Home) minimiza pra bandeja** e o guia entra no workspace (some/volta junto).
- Descrições das Configurações reescritas pra um usuário leigo (idioma do app, seu idioma, fonte de
  áudio, microfone, voz/TTS, etc.).
- Barra flutuante: área de arrasto maior; layout dos botões rebalanceado (nomes não cortam mais).

### Corrigido
- **CPU alta**: o medidor de nível re-renderizava a barra ~12×/s mesmo em silêncio → agora só quando
  muda de faixa (silêncio = zero re-render).
- **Gráfico de comparação de pronúncia**: a gravação é re-encodada pra **WAV** → o pitch decodifica
  sempre (fim do "Couldn't read this audio"); nomes dos chips legíveis.
- **Dock** não corta mais os ícones (largura ajustada p/ caber o "?").
- Auditoria de **memory leak**: nenhum vazamento; memória idle estável.

---

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
- `speakVariant` roteava vozes Kokoro para o Edge (rede) → travava; agora usa o worker local.
- Contraste das telas escuras (comparação de pronúncia / drill de palavras) melhorado.
- Loop deixou de reduzir a velocidade sozinho (respeita a velocidade escolhida).

---

## [0.1.1] — 2026-06-27

### Adicionado
- **Isolamento de dados por conta** (cada usuário com seu próprio armazenamento local).
- **Backup na nuvem** (Supabase): frases e sessões voltam ao logar em outro PC.
- **Login com Google** (OAuth via loopback).
- **Voz local (Kokoro) embutida** no instalador — abre offline, sem download nem chave.

### Corrigido
- Diversos ajustes de captura de áudio e UX a partir do feedback de testes.

---

## [0.1.0] — 2026-06-23

### Adicionado
- **Splash** de abertura + ícone do app.
- **Transcrição ao vivo** durante a captura.
- **Pronúncia nativa** (Forvo + Wikimedia) e **perfil de pronúncia por sessão**.

---

## Anterior a 0.1.0

### Nota
- **2026-06-16** — Renomeado para **Soaken**; rebrand + suíte de pronúncia + base de voice-clone +
  i18n completo pt/en.
- **2026-06-04** — UI do tutor redesenhada + correções de sincronização de áudio.
- **2026-06-02** — Decks por idioma, SRS de frases, drill de pronúncia e comparador.
- **2026-06-01** — Commit inicial: PROFESSOR, tutor de idiomas (Electron).
