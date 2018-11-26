import { ManifestPlugin } from '../manifest-plugin.service';

describe('ManifestPlugin', () => {
  let manifestPlugin: any;
  let manifest: any;

  beforeEach(() => {
    manifestPlugin = new (<any>ManifestPlugin)();
    manifestPlugin.workspace = {};
    manifest = {};
  });

  describe('applyManifestContexts', () => {
    it('should apply content scripts context', () => {
      manifestPlugin.workspace.project = {
        contexts: {
          contentScripts: [
            {
              outputFile: '',
              allFrames: true,
              matches: [],
            },
          ],
        }
      };

      manifestPlugin.applyManifestContexts(manifest);

      expect(manifest).toMatchObject({
        content_scripts: [
          {
            all_frames: true,
            matches: [],
            js: [''],
          }
        ],
      });
    });

    it('should apply background context', () => {
      manifestPlugin.workspace.project = {
        contexts: {
          background: {
            outputFile: '',
          },
        },
      };

      manifestPlugin.applyManifestContexts(manifest);

      expect(manifest).toMatchObject({
        background: {
          scripts: [''],
        },
      });
    });

    it('should apply popup context', () => {
      manifestPlugin.workspace.project = {
        contexts: {
          popup: {
            index: '',
            outputHtml: '',
          },
        }
      };

      manifestPlugin.applyManifestContexts(manifest);

      expect(manifest).toMatchObject({
        browser_action: {
          default_popup: '',
        },
      })
    });
  });
});