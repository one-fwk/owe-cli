import { Module } from '@one/core';

import { EntryModulePlugin } from './entry-module-plugin.service';
import { ManifestPlugin } from './manifest-plugin.service';

@Module({
  providers: [
    EntryModulePlugin,
    ManifestPlugin,
  ],
  exports: [
    EntryModulePlugin,
    ManifestPlugin,
  ],
})
export class PluginsModule {}