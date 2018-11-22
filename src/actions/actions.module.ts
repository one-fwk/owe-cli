import { Module } from '@one/core';

import { ServeAction } from './serve.action.service';

@Module({
  exports: [
    ServeAction,
  ],
  providers: [
    ServeAction,
  ],
})
export class ActionsModule {}