import { BrowserTarget } from './browser-targets';

export interface Project {
  browserTargets: BrowserTarget[];
}

export interface OweConfig {
  projects: {
    [projectName: string]: Project;
  }
}