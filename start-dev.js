const { execSync } = require('child_process');
const path = require('path');

process.chdir(path.join(__dirname));

const port = process.argv[2] || '3004';
execSync(`node node_modules/next/dist/bin/next dev --port ${port}`, {
  stdio: 'inherit',
  cwd: __dirname,
});
