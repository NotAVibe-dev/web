// notavibe — product API client.
//
// Backend-agnostic ON PURPOSE. The product frontend lives here in `web`; the
// backend is `app` OR `crm` — decided later. This client talks to whatever
// serves the API at PUBLIC_API_BASE_URL. Until that exists, it returns mock
// data, so the whole UI runs today. Choosing the backend repo is then a config
// change (set the base URL), not a code change.
//
// Public discovery pages are SSR-load-bearing (SPEC §5.0a: AI crawlers run zero
// JS). For now dynamic routes prerender from mock via getStaticPaths(); they
// flip to real SSR once a backend + an Astro server adapter are chosen (an
// infra decision, deferred with the app-vs-crm call).

import type {
  Project, Maintainer, MaintainerDashboard, BackerDashboard, AdminOverview,
} from './types';
import * as mock from '../mock/data';

const BASE = import.meta.env.PUBLIC_API_BASE_URL ?? '';
const useMock = BASE === '';

async function get<T>(path: string, fallback: () => T): Promise<T> {
  if (useMock) return fallback();
  const res = await fetch(`${BASE}${path}`, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

// --- Public catalog --------------------------------------------------------
export const listProjects = () => get<Project[]>('/v1/projects', () => mock.projects);
export const getProject = (slug: string) =>
  get<Project | undefined>(`/v1/projects/${slug}`, () => mock.projects.find((p) => p.slug === slug));
export const getMaintainer = (handle: string) =>
  get<Maintainer | undefined>(`/v1/maintainers/${handle}`, () => mock.maintainers.find((m) => m.handle === handle));
export const searchProjects = (q: string) =>
  get<Project[]>(`/v1/search?q=${encodeURIComponent(q)}`, () =>
    mock.projects.filter((p) => (p.name + p.summary + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase())));

// --- Dashboards (authenticated; auth = GitHub App, wired when backend lands) -
export const getMaintainerDashboard = () =>
  get<MaintainerDashboard>('/v1/me/maintainer/dashboard', () => mock.maintainerDashboard);
export const getBackerDashboard = () =>
  get<BackerDashboard>('/v1/me/backer/dashboard', () => mock.backerDashboard);
export const getAdminOverview = () =>
  get<AdminOverview>('/v1/admin/overview', () => mock.adminOverview);
