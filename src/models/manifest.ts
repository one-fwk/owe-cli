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
  contentSecurityPolicy?: string;
  versionName?: string;
}

export interface EdgeManifest {}

export interface BrowserManifest extends FirefoxManifest, ChromeManifest, EdgeManifest {}

export interface Manifest extends BrowserManifest {
  name: string;
  author: string;
  version: string;
  defaultLocale: string;
  permissions?: string[];
  description?: string;
  chrome?: ChromeManifest;
  firefox?: FirefoxManifest;
  edge?: EdgeManifest;
}