import { Test, TestingModule } from '@one/testing';

import { mockWorkspaceProject } from '../../mocking';
import { WebpackConfigService } from '../webpack-config.service';
import { WebpackConfigModule } from '../webpack-config.module';

describe('WebpackConfigService', () => {
  let module: TestingModule;
  let config: any;
  let setProject: any;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [WebpackConfigModule],
    }).compile();

    config = module.get(WebpackConfigService);
    setProject = mockWorkspaceProject(module);
  });

  describe('createBackgroundEntry', () => {
    beforeEach(() => {
      setProject({
        contexts: {
          background: {
            entry: 'background/app.background.module#AppBackgroundModule',
            outputFile: 'background',
          },
        },
      });
    });

    describe('development', () => {
      it('should add webpack-plugin-serve/client as entry', () => {
        config.createBackgroundEntry();

        expect(config.config.entry).toMatchObject([
          {
            background: [
              expect.any(String),
              'webpack-plugin-serve/client',
            ],
          },
        ]);
      });
    });

    describe('production', () => {
      beforeEach(() => {
        config.config.mode = 'production';
      });

      it('should only contain background entry hash', () => {
        config.createBackgroundEntry();

        expect(config.config.entry).toMatchObject([
          {
            background: expect.any(String),
          },
        ]);
      });
    });
  });

  describe('create', () => {

  });
});