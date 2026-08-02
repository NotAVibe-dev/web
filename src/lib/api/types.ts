// notavibe — product API types.
// The shared vocabulary between the frontend (this repo, `web`) and the backend
// (`app` or `crm` — TBD). Mirrors SPEC.md's data model (§12) at the surface the
// UI needs; kept intentionally small. When the backend repo is chosen these
// become the contract both sides implement.

export type HealthSignal = 'release' | 'maintainers' | 'responsiveness' | 'adoption' | 'funding';

export interface HealthBreakdown {
  // §5.2 — five signals, each 0–100. No single roll-up "score" is shown as a rating.
  release: number;
  maintainers: number;
  responsiveness: number;
  adoption: number;
  funding: number;
}

export interface Project {
  slug: string;
  name: string;
  ecosystem: string;          // npm | pypi | cargo | …
  summary: string;
  claimed: boolean;           // §4.2 unclaimed-generated vs claimed
  verified: boolean;          // §8.6 verification indicator
  health: HealthBreakdown;
  tags: string[];
  maintainerHandles: string[];
}

export interface Maintainer {
  handle: string;
  displayName: string;
  bio: string;
  verified: boolean;
  projectSlugs: string[];
}

// --- Dashboard payloads (authenticated) ------------------------------------
export interface MaintainerDashboard {
  handle: string;
  primaryKpi: { label: string; value: string; delta: string };  // §9.4
  projects: Array<Pick<Project, 'slug' | 'name' | 'health' | 'claimed'>>;
  openContests: number;
}

export interface BackerDashboard {
  handle: string;
  lists: Array<{ id: string; name: string; count: number }>;     // §9.7
  interestRegistered: number;                                     // §9.8
  stackScanned: boolean;                                          // §5.11
}

export interface AdminOverview {
  queues: Array<{ name: string; group: 'Adjudication' | 'Catalog' | 'Integrity' | 'Platform'; pending: number }>; // §11
}

export type Role = 'maintainer' | 'backer' | 'admin';
