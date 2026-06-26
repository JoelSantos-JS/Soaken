'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { translations } from './translations';

type Lang = 'pt' | 'en';

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'pt',
  setLang: () => {},
  t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt');

  useEffect(() => {
    // 1) Escolha manual salva sempre vence.
    const saved = localStorage.getItem('soaken_lang') as Lang | null;
    if (saved === 'pt' || saved === 'en') {
      setLangState(saved);
      document.documentElement.lang = saved;
      return;
    }
    // 2) Sem escolha: detecta pelo idioma do navegador.
    //    Brasil/português (pt-*) abre em PT; qualquer outro abre em EN.
    const nav = navigator.languages?.[0] || navigator.language || 'en';
    const detected: Lang = nav.toLowerCase().startsWith('pt') ? 'pt' : 'en';
    setLangState(detected);
    document.documentElement.lang = detected;
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('soaken_lang', l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((k: string) => translations[lang]?.[k] ?? k, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
