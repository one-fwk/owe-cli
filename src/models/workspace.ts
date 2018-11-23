import { BrowserTarget } from './browser-target';
import { ProjectType } from './project-type';
import { Manifest } from './manifest';
import { Contexts } from './context';

export interface Project {
  sourceRoot: string;
  outputPath: string;
  tsConfig: string;
  projectType: ProjectType;
  browserTargets: BrowserTarget[];
  contexts: Contexts;
  manifest: Manifest;
}

export interface Workspace {
  defaultProject?: string;
  projects: {
    [projectName: string]: Project;
  }
}