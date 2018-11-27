process.argv = [
  ...process.argv,
  'serve',
  'appwriter',
  'chrome',
  '--cwd',
  __dirname,
];

require('../bin/owe');