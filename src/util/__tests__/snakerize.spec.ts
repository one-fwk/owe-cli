import { snakerize } from '../snakerize';

describe('snakerize', () => {
  it('should snakerize all properties correctly', () => {
    const keys = [
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
    };

    snakerize(keys, manifest);

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