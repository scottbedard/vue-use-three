const path = require('path');
const fs = require('fs-extra');

const pkgPath = path.resolve(__dirname, '../package.json');
const srcDir = path.resolve(__dirname, '../src');

async function getVersion() {
  const rawPkg = await fs.readFile(pkgPath);
  return JSON.parse(rawPkg).version;
}

async function updateImport(pkgVersion) {
  let content = `export const version = '${pkgVersion || await getVersion()}';\n\n`;

  const compositions = fs
    .readdirSync(path.resolve(__dirname, '../src/compositions'))
    .filter(f => f.startsWith('use'))
    .sort();

  content += compositions.map(f => `export * from './compositions/${f}';\n`).join('');

  fs.writeFileSync(path.join(srcDir, 'index.ts'), content);
}

module.exports = {
  updateImport,
};

if (require.main === module) {
  updateImport();
}
