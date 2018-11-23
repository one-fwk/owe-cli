import { ManifestPlugin } from '../manifest-plugin.service';

describe('ManifestPlugin', () => {
  describe('snakerizeManifest', () => {
    let manifestPlugin: any;

    beforeEach(() => {
      manifestPlugin = new ManifestPlugin({} as any);

      (<any>manifestPlugin).snakerizeKeys = [
        'defaultLocale',
        {
          chrome: [
            'contentSecurityPolicy',
            'versionName',
            {
              nestedProperty: ['versionControl'],
            },
          ],
        },
      ];
    });

    it('should snakerize properties correctly', () => {
      const manifest = {
        defaultLocale: '',
        chrome: {
          contentSecurityPolicy: '',
          versionName: '',
          omnibox: {
            keyword: '',
          },
          nestedProperty: {
            versionControl: '',
          },
        },
      } as any;

      manifestPlugin.snakerizeManifest(manifest);

      expect(manifest).toMatchObject({
        default_locale: '',
        chrome: {
          content_security_policy: '',
          version_name: '',
          omnibox: {
            keyword: '',
          },
          nestedProperty: {
            version_control: '',
          },
        },
      });
    });
  });
});