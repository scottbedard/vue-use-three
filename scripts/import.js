const path = require('path');
const fs = require('fs-extra');

const pkgPath = path.resolve(__dirname, '../package.json');
const srcDir = path.resolve(__dirname, '../src/core');

async function getVersion () {
  const rawPkg = await fs.readFile(pkgPath);
  return JSON.parse(rawPkg).version;
}

async function updateImport () {
  const files = fs
    .readdirSync(srcDir)
    .filter(f => f.startsWith('use'))
    .sort();

  let content = '';
  content += `export const version = '${await getVersion()}'\n\n`;
  content += files.map(f => `export * from './${f}'\n`).join('');

  fs.writeFileSync(path.join(srcDir, 'index.ts'), content);
}

module.exports = {
  updateImport,
};

if (require.main === module)
  updateImport();