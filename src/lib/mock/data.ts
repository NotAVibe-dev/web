// notavibe — mock catalog data.
// Stand-in for the backend so the frontend runs before app/crm exists. Small,
// illustrative, and clearly fictional (SPEC truthfulness rule). Replace by
// setting PUBLIC_API_BASE_URL — no UI code changes.

import type {
  Project, Maintainer, MaintainerDashboard, BackerDashboard, AdminOverview,
} from '../api/types';

export const projects: Project[] = [
  {
    slug: 'ripgrid',
    name: 'ripgrid',
    ecosystem: 'cargo',
    summary: 'A grid-aware line search that streams matches as you type. Used deep in build pipelines.',
    claimed: true,
    verified: true,
    health: { release: 88, maintainers: 42, responsiveness: 76, adoption: 94, funding: 21 },
    tags: ['cli', 'search', 'rust'],
    maintainerHandles: ['ana-reyes'],
  },
  {
    slug: 'lumen-ui',
    name: 'lumen-ui',
    ecosystem: 'npm',
    summary: 'Headless components with a warm-dark default theme. 2M weekly downloads, one maintainer.',
    claimed: false,
    verified: false,
    health: { release: 61, maintainers: 18, responsiveness: 40, adoption: 89, funding: 8 },
    tags: ['ui', 'react', 'headless'],
    maintainerHandles: [],
  },
  {
    slug: 'pgqueue',
    name: 'pgqueue',
    ecosystem: 'pypi',
    summary: 'A durable job queue on top of Postgres. No broker, no Redis, just SKIP LOCKED.',
    claimed: true,
    verified: true,
    health: { release: 79, maintainers: 55, responsiveness: 83, adoption: 67, funding: 34 },
    tags: ['postgres', 'jobs', 'python'],
    maintainerHandles: ['ana-reyes', 'devs-collective'],
  },
];

export const maintainers: Maintainer[] = [
  {
    handle: 'ana-reyes',
    displayName: 'Ana Reyes',
    bio: 'Systems tinkerer. Maintains ripgrid and co-maintains pgqueue on nights and weekends.',
    verified: true,
    projectSlugs: ['ripgrid', 'pgqueue'],
  },
  {
    handle: 'devs-collective',
    displayName: 'Devs Collective',
    bio: 'A small group keeping infrastructure libraries alive.',
    verified: false,
    projectSlugs: ['pgqueue'],
  },
];

export const maintainerDashboard: MaintainerDashboard = {
  handle: 'ana-reyes',
  primaryKpi: { label: 'Discovery reach (30d)', value: '12,480', delta: '+18%' },
  projects: projects
    .filter((p) => p.maintainerHandles.includes('ana-reyes'))
    .map(({ slug, name, health, claimed }) => ({ slug, name, health, claimed })),
  openContests: 1,
};

export const backerDashboard: BackerDashboard = {
  handle: 'raj',
  lists: [
    { id: 'l1', name: 'My stack', count: 12 },
    { id: 'l2', name: 'Watching', count: 4 },
  ],
  interestRegistered: 3,
  stackScanned: true,
};

export const adminOverview: AdminOverview = {
  queues: [
    { name: 'Claim contest queue', group: 'Adjudication', pending: 2 },
    { name: 'Catalog ingestion', group: 'Catalog', pending: 0 },
    { name: 'Sybil detection', group: 'Integrity', pending: 5 },
    { name: 'Demand signals', group: 'Platform', pending: 1 },
  ],
};
