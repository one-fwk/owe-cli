import { BrowserTarget } from './browser-target';
import { ProjectType } from './project-type';
import { CustomManifest } from './manifest';
import { Contexts } from './context';

export interface Project {
  sourceRoot: string;
  outputPath: string;
  tsConfig: string;
  projectType: ProjectType;
  browserTargets: BrowserTarget[];
  contexts: Contexts;
  manifest: CustomManifest;
}

export interface Workspace {
  defaultProject?: string;
  projects: {
    [projectName: string]: Project;
  }
}