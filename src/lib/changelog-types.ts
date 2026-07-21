// Tipos do changelog. Ficam separados do parser (que usa fs) para poderem ser
// importados tanto pelo Server Component quanto pelo Client Component.

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
