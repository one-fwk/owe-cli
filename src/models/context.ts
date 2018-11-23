export interface BaseContext {
  uuid?: string;
  entryModule?: string;
  main: string;
  outputFile: string;
}

export interface PopupContext extends BaseContext {
  index?: string;
  outputHtml?: string;
}

export interface ContentScriptContext extends BaseContext {
  allFrames?: boolean;
  matches?: string[];
}

export interface BackgroundContext extends BaseContext {}

export interface Contexts {
  popup?: PopupContext;
  contentScripts?: ContentScriptContext[];
  background?: BackgroundContext;
}

export enum Context {
  BACKGROUND = 'background',
  CONTENT_SCRIPTS = 'contentScripts',
  POPUP = 'popup',
}
