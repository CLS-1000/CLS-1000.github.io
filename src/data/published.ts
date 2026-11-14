// What Notitia Civica has published, read at build time.
//
// Articles come from the newsroom's public export (web_public/src/data/articles.json),
// which only ever holds stories that passed model verification and a person's sign-off.
// If the fetch fails, the build uses the snapshot committed beside this file, so a
// network hiccup never breaks a deploy. The workflow rebuilds daily to pick up new stories.

import snapshot from './newsroom-snapshot.json';

export const NC_BASE = 'https://cls-1000.github.io/notitia-civica-ux';
const FEED =
  'https://raw.githubusercontent.com/CLS-1000/notitia-civica-newsroom/master/web_public/src/data/articles.json';

export type Article = {
  slug: string;
  status: 'published' | 'retracted';
  section: string;
  badge_type: string;
  headline: string;
  deck: string;
  published_at: string;
};

function isArticle(a: any): a is Article {
  return a && typeof a.slug === 'string' && typeof a.headline === 'string' && typeof a.published_at === 'string';
}

export async function loadArticles(): Promise<{ articles: Article[]; live: boolean }> {
  try {
    const res = await fetch(FEED, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('feed is not a list');
    const articles = data.filter(isArticle);
    return { articles: sortNewest(articles), live: true };
  } catch (err) {
    console.warn(`[published] newsroom feed unavailable (${err}); using the committed snapshot`);
    return { articles: sortNewest((snapshot as any[]).filter(isArticle)), live: false };
  }
}

const sortNewest = (a: Article[]) => [...a].sort((x, y) => Date.parse(y.published_at) - Date.parse(x.published_at));

export const articleUrl = (a: Article) => `${NC_BASE}/citizens-cognisance/${a.slug}/`;

// "washington_civic" -> "Washington civic"
export const sectionLabel = (s: string) => {
  const t = (s || '').replace(/_/g, ' ').trim();
  return t ? t[0].toUpperCase() + t.slice(1) : 'Notitia Civica';
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles' });

// Standing publications: these pages live on the Notitia Civica site.
export const standing = [
  {
    kicker: 'Civic Intelligence Brief · OR-001',
    title: 'Oregon’s Veto Field',
    body: 'Oregon’s legislative data marked one bill as vetoed since 2007. Governors vetoed 27. The field was corrected the day after it was reported.',
    href: `${NC_BASE}/published/civic-intelligence-brief_OR-001_2026-10-06.html`,
    date: '2026-10-06',
  },
  {
    kicker: 'Oregon Legislature · 2025R1',
    title: 'Oregon Legislature, Verified',
    body: 'Every bill in Oregon’s 2025 regular session, in plain language, with a record anyone can check.',
    href: `${NC_BASE}/oregon/2025R1/`,
  },
  {
    kicker: 'Tracker',
    title: 'Oregon Civic Tracker',
    body: 'Oregon measures covered in verified reporting, with links to each OLIS docket.',
    href: `${NC_BASE}/oregon-civic-tracker/`,
  },
];

export const trust = [
  { title: 'Methodology', body: 'How sources are collected, drafts tested and sign-off proven.', href: `${NC_BASE}/trust/methodology/` },
  { title: 'Corrections', body: 'Every correction and retraction, kept in public.', href: `${NC_BASE}/trust/corrections/` },
  { title: 'Ownership', body: 'Who owns and publishes Notitia Civica.', href: `${NC_BASE}/trust/ownership/` },
];
