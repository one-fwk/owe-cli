export interface BaseContext {
  entryModule?: string;
  main: string;
  outputFile: string;
}

export interface PopupContext extends BaseContext {
  index?: string;
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
  CONTENT_SCRIPT = 'contentScript',
  POPUP = 'popup',
}
