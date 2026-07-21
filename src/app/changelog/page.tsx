import ChangelogView from '@/components/ChangelogView';
import { getChangelog } from '@/lib/changelog';

// Server Component: lê os .md (content/changelog) em build e passa o changelog
// já mesclado pro Client Component, que faz o toggle PT/EN ao vivo.
export default function ChangelogPage() {
  const releases = getChangelog();
  return <ChangelogView releases={releases} />;
}
