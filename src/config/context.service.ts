import { Injectable } from '@one/core';

import { WorkspaceService } from '../workspace';
import {
  BackgroundContext,
  ContentScriptContext,
  PopupContext,
  Context,
} from '../models';

@Injectable()
export class ContextService {
  constructor(private readonly workspace: WorkspaceService) {}

  public get(context: Context) {
    return <any>this.workspace.project.contexts[context];
  }

  public getContentScripts(): ContentScriptContext[] {
    return this.get(Context.CONTENT_SCRIPTS);
  }

  public getPopup(): PopupContext {
    return this.get(Context.POPUP);
  }

  public getBackground(): BackgroundContext {
    return this.get(Context.BACKGROUND);
  }
}