// Changelog do app Soaken.
// Edite este arquivo para publicar novas versões — a página /changelog é gerada a partir daqui.
// type: 'new' (novo recurso) | 'improved' (melhoria) | 'fixed' (correção)

export type ChangeType = 'new' | 'improved' | 'fixed';

export interface ChangeItem {
  type: ChangeType;
  pt: string;
  en: string;
}

export interface Release {
  version: string;
  date: string; // ex.: '01 Jul 2026' — edite com a data real
  latest?: boolean;
  changes: ChangeItem[];
}

export const CHANGELOG: Release[] = [
  {
    version: '0.1.2',
    date: '—',
    latest: true,
    changes: [
      { type: 'improved', pt: 'Melhorias de desempenho na captura de áudio do sistema.', en: 'Performance improvements in system audio capture.' },
      { type: 'fixed', pt: 'Correções gerais de estabilidade.', en: 'General stability fixes.' },
    ],
  },
  {
    version: '0.1.1',
    date: '—',
    changes: [
      { type: 'improved', pt: 'Ajustes na transcrição ao vivo.', en: 'Live transcription tweaks.' },
      { type: 'fixed', pt: 'Correção de bugs reportados na primeira versão.', en: 'Fixed bugs reported in the first release.' },
    ],
  },
  {
    version: '0.1.0',
    date: '—',
    changes: [
      { type: 'new', pt: 'Primeira versão pública do Soaken para Windows.', en: 'First public release of Soaken for Windows.' },
      { type: 'new', pt: 'Barra flutuante com captura de áudio, transcrição ao vivo e treino de pronúncia.', en: 'Floating bar with audio capture, live transcription and pronunciation practice.' },
    ],
  },
];
