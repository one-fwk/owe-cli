export const createMainTemplate = (entryPath: string, entryModule: string, hmr?: boolean) => `
  import { OneFactory } from '@one/core'; 
  
  // Should . be an absolute path??
  import { ${entryModule} } from './${entryPath}';
  
  (async () => {
    const app = new OneFactory(${entryModule});
    await app.start();
    
    // Should it be module.hot.accept?
    ${hmr ? `module.hot.dispose(() => app.destroy());` : ''}
  });
`;