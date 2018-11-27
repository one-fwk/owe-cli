export interface Omnibox {
  keyword: string;
}

export interface Developer {
  name?: string;
  url?: string;
}

export interface MutualManifest {
  devtoolsPage?: string;
  homepageUrl?: string;
  omnibox?: Omnibox;
}

export interface FirefoxManifest extends MutualManifest {
  developer?: Developer;
}

export interface ChromeManifest extends MutualManifest {
  manifestVersion?: number;
  contentSecurityPolicy?: string;
  versionName?: string;
}

export interface EdgeManifest {}

export interface BrowserManifest extends FirefoxManifest, ChromeManifest, EdgeManifest {}

export interface BaseManifest {
  name: string;
  author: string;
  version: string;
  permissions?: string[];
  description?: string;
}

export interface BrowserAction {
  default_popup: string;
}

export interface Background {
  scripts: string[];
}

export interface ContentScript {
  matches?: string[];
  all_frames?: boolean;
  js?: string[];
}

export interface Manifest {
  default_locale?: string;
  browser_action?: BrowserAction;
  background?: Background;
  content_scripts?: ContentScript[];
}

export interface CustomManifest extends BaseManifest, BrowserManifest {
  defaultLocale?: string;
  chrome?: ChromeManifest;
  firefox?: FirefoxManifest;
  edge?: EdgeManifest;
}