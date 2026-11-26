// The CLS-1000 family, in the order a piece of public information travels through it.
// Copy follows "The CLS Family: Project Summaries": what each project is built to do, not its status.

export type Project = {
  slug: string;        // matches src/marks/<slug>.svg
  name: string;
  role: string;        // one-line job
  body: string;
  repo?: { label: string; href?: string };
  link?: { label: string; href: string };  // an internal page about the project
};

export type Stage = { key: string; title: string; note: string; projects: Project[] };

const gh = (r: string) => ({ label: `CLS-1000/${r}`, href: `https://github.com/CLS-1000/${r}` });

export const stages: Stage[] = [
  {
    key: 'method',
    title: 'Method',
    note: 'The rule every project inherits',
    projects: [
      {
        slug: 'cls',
        name: 'CLS',
        role: 'The Continuous Learning System',
        body: 'Every decision traces back to something observed in the world, and every result informs the next decision. CLS is a method and an architecture, built to run the same loop against any field that produces observations.',
        repo: { label: 'CLS-1000/cls_system · private' },
      },
    ],
  },
  {
    key: 'collect',
    title: 'Collect and triage',
    note: 'Read what the world publishes',
    projects: [
      {
        slug: 'osint',
        name: 'OSINT',
        role: 'Where the data comes from',
        body: 'Adapters for news and research feeds, congressional records, foreign-agent filings, court and state legislative records turn each source into one record format. Every claim is cross-checked against independent sources, and recurring narratives are traced to the sources amplifying them.',
      },
      {
        slug: 'spec-1',
        name: 'SPEC-1',
        role: 'The research engine',
        body: 'SPEC-1 reads more than a reporter can, discards what does not hold up, and writes a sourced first draft. Four gates decide what survives: credibility, substance, freshness and novelty. Every decision is logged, and a person decides what is published.',
        repo: gh('spec-1'),
      },
    ],
  },
  {
    key: 'local',
    title: 'Apply it locally',
    note: 'Portland and Oregon, from public records',
    projects: [
      {
        slug: 'pdx1',
        name: 'pdx1',
        role: 'Portland metro intelligence',
        body: 'The same discipline, applied to the bi-state Portland metro: campaign finance, legislative actions, economic-interest statements and civic infrastructure. It reports structure and timing, not motive, and officials appear as the seats they hold.',
        repo: gh('pdx-1i'),
      },
      {
        slug: 'proc_track',
        name: 'proc_track',
        role: 'Replaying the legislature',
        body: 'Could this bill legally have moved the way the record says? proc_track replays every Oregon measure step by step against chamber procedure, and stops to say why when a history cannot be explained.',
        repo: gh('proc_track'),
      },
    ],
  },
  {
    key: 'prove',
    title: 'Prove it',
    note: 'A record that cannot be quietly rewritten',
    projects: [
      {
        slug: 'gatepost',
        name: 'gatepost',
        role: 'Tamper-evident decision records',
        body: 'Each decision is written to a signed, append-only chain before the action it allows. Anyone can check the chain offline with one dependency-free file, so a finding can be proven without taking anyone’s word for it.',
        repo: gh('gatepost'),
      },
    ],
  },
  {
    key: 'publish',
    title: 'Publish',
    note: 'Where the work becomes public',
    projects: [
      {
        slug: 'notitia-civica',
        name: 'Notitia Civica',
        role: 'The publisher',
        body: 'A public-interest publication that turns public signals into civic and geopolitical reporting. Every piece states what happened, why it matters, what supports it, what is uncertain and what to watch next.',
        repo: gh('notitia-civica-ux'),
      },
      {
        slug: 'world-state-brief',
        name: 'World State Brief',
        role: 'The geopolitical column',
        body: 'A fixed format, so a reader always knows where to look: executive summary, priority developments, strategic assessment, watch list and the full source register.',
        link: { label: 'How the newsroom works', href: '/world-state-brief.html' },
      },
      {
        slug: 'citizen-cognisance',
        name: 'Citizen Cognisance',
        role: 'The public map',
        body: 'Portland’s civic life as a map of relationships between people, issues, entities and jurisdictions. Each point links back to the records behind it.',
      },
    ],
  },
];

export const switchboard: Project = {
  slug: 'switchboard',
  name: 'SWITCHBOARD',
  role: 'The command center',
  body: 'The operator’s console over the whole family: engines, trackers and the publisher seen at once. It is internal by design, and kept apart from every public page.',
  repo: gh('github'),
};

export const loop = [
  { term: 'Signal', def: 'A normalized observation, with its source attached.' },
  { term: 'Opportunity', def: 'A signal that clears an explicit threshold.' },
  { term: 'Experiment', def: 'A test with a hypothesis, success criteria and a stop rule.' },
  { term: 'Outcome', def: 'The measured result and its evidence.' },
  { term: 'Intelligence', def: 'The lesson, carried into the next cycle.' },
];

export const confidence = ['High confidence', 'Moderate confidence', 'Directional signal', 'Watch item'];
