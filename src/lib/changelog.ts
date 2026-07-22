// Changelog do app Soaken — agora escrito em Markdown (Keep a Changelog).
//
// Edite o conteúdo em: content/changelog/pt.md  e  content/changelog/en.md
// (abra no Typora — front-matter não é usado; a versão/data vêm do cabeçalho ##).
//
// Formato de cada arquivo:
//   ## [0.1.4] — 2026-07-03        → release com versão + data (a 1ª vira "latest")
//   ## Anterior a 0.1.0            → release só com título (sem versão)
//   ### Adicionado | Alterado | Corrigido | Removido | Nota   → categoria do grupo
//   - item                        → linha do changelog (use **negrito**)
//     - subitem                   → subitem (indentado com 2 espaços)
//
// Os dois arquivos (pt/en) precisam ter a MESMA estrutura (mesmo nº de releases,
// grupos, itens e subitens, na mesma ordem). O parser valida e falha com erro
// claro se houver descompasso — assim um idioma nunca fica fora de sincronia.

import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { Category, Release } from './changelog-types';

export type { Category, I18nText, ChangeLine, ChangeGroup, Release } from './changelog-types';

// Cabeçalhos de categoria aceitos (PT e EN), mapeados para a chave interna.
const CATEGORY_BY_HEADING: Record<string, Category> = {
  added: 'added', adicionado: 'added',
  changed: 'changed', alterado: 'changed',
  fixed: 'fixed', corrigido: 'fixed',
  removed: 'removed', removido: 'removed',
  note: 'note', nota: 'note',
};

// Estrutura intermediária: um idioma cru (strings simples, sem i18n).
interface RawItem { text: string; sub?: string[] }
interface RawGroup { category: Category; items: RawItem[] }
interface RawRelease { version?: string; date?: string; title?: string; groups: RawGroup[] }

function parseLang(md: string, lang: string): RawRelease[] {
  const releases: RawRelease[] = [];
  let rel: RawRelease | null = null;
  let group: RawGroup | null = null;
  let item: RawItem | null = null;
  // Continuação de linha: um item escrito à mão quebra em várias linhas indentadas
  // ("- Texto longo…\n  que continua aqui."). Precisamos saber se a última coisa
  // adicionada foi o item ou um subitem, para emendar no lugar certo.
  let lastWasSub = false;

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, '');

    if (line.startsWith('### ')) {
      const label = line.slice(4).trim().toLowerCase();
      const category = CATEGORY_BY_HEADING[label];
      if (!category) throw new Error(`changelog ${lang}: categoria desconhecida "${line.slice(4).trim()}"`);
      if (!rel) throw new Error(`changelog ${lang}: categoria "${label}" antes de qualquer release`);
      group = { category, items: [] };
      rel.groups.push(group);
      item = null;
      continue;
    }

    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim();
      const m = heading.match(/^\[([^\]]+)\]\s*(?:[—–-]\s*(.+))?$/);
      rel = m
        ? { version: m[1].trim(), date: m[2]?.trim() || undefined, groups: [] }
        : { title: heading, groups: [] };
      releases.push(rel);
      group = null;
      item = null;
      continue;
    }

    const sub = line.match(/^\s+-\s+(.+)$/);
    if (sub) {
      if (!item) throw new Error(`changelog ${lang}: subitem sem item pai → "${sub[1]}"`);
      (item.sub ??= []).push(sub[1].trim());
      lastWasSub = true;
      continue;
    }

    const top = line.match(/^-\s+(.+)$/);
    if (top) {
      if (!group) throw new Error(`changelog ${lang}: item sem categoria (###) → "${top[1]}"`);
      item = { text: top[1].trim() };
      group.items.push(item);
      lastWasSub = false;
      continue;
    }

    // Linha INDENTADA sem "-": continuação do bullet anterior (texto quebrado à mão,
    // como o Typora exporta com hard wrap). Emenda com espaço no item ou no último sub.
    const cont = line.match(/^\s+(\S.*)$/);
    if (cont && item) {
      if (lastWasSub && item.sub?.length) item.sub[item.sub.length - 1] += ` ${cont[1].trim()}`;
      else item.text += ` ${cont[1].trim()}`;
      continue;
    }
    // linhas em branco, "# Changelog", "---" e prosa de introdução (coluna 0) são ignoradas
  }

  return releases;
}

function mismatch(what: string, where: string, a: number, b: number): never {
  throw new Error(`changelog: descompasso de ${what} em ${where} (pt=${a}, en=${b}). Alinhe pt.md e en.md.`);
}

function merge(pt: RawRelease[], en: RawRelease[]): Release[] {
  if (pt.length !== en.length) mismatch('releases', 'raiz', pt.length, en.length);

  return pt.map((rp, ri): Release => {
    const re = en[ri];
    const where = rp.version ?? rp.title ?? `#${ri}`;
    if (rp.groups.length !== re.groups.length) mismatch('grupos', where, rp.groups.length, re.groups.length);

    const rel: Release = { groups: [] };
    if (rp.version) {
      rel.version = rp.version;
      if (rp.date) rel.date = rp.date;
    } else {
      rel.title = { pt: rp.title!, en: re.title! };
    }

    rel.groups = rp.groups.map((gp, gi) => {
      const ge = re.groups[gi];
      if (gp.category !== ge.category) {
        throw new Error(`changelog: categorias divergentes em ${where} grupo ${gi} (pt=${gp.category}, en=${ge.category}).`);
      }
      if (gp.items.length !== ge.items.length) mismatch('itens', `${where} › ${gp.category}`, gp.items.length, ge.items.length);

      return {
        category: gp.category,
        items: gp.items.map((ip, ii) => {
          const ie = ge.items[ii];
          const item: Release['groups'][number]['items'][number] = { text: { pt: ip.text, en: ie.text } };
          if (ip.sub || ie.sub) {
            const ptSub = ip.sub ?? [];
            const enSub = ie.sub ?? [];
            if (ptSub.length !== enSub.length) mismatch('subitens', `${where} › ${gp.category} › item ${ii}`, ptSub.length, enSub.length);
            item.sub = ptSub.map((sp, si) => ({ pt: sp, en: enSub[si] }));
          }
          return item;
        }),
      };
    });

    return rel;
  });
}

let cache: Release[] | null = null;

/** Lê content/changelog/{pt,en}.md e devolve o changelog mesclado (newest-first). */
export function getChangelog(): Release[] {
  if (cache) return cache;
  const dir = path.join(process.cwd(), 'content', 'changelog');
  const pt = parseLang(readFileSync(path.join(dir, 'pt.md'), 'utf8'), 'pt');
  const en = parseLang(readFileSync(path.join(dir, 'en.md'), 'utf8'), 'en');
  const releases = merge(pt, en);
  const latest = releases.find((r) => r.version);
  if (latest) latest.latest = true;
  cache = releases;
  return releases;
}
