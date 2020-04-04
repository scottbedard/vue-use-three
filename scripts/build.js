const consola = require('consola');
const fs = require('fs-extra');
const path = require('path');
const { backupApi, restoreApi, switchApi } = require('./switch');
const { selectVersion } = require('./select_version');

const rootDir = path.resolve(__dirname, '..');
const pkgDir = path.join(rootDir, 'package.json');

async function buildFor(targetVersion, publishCallback) {
  if (![2, 3].includes(targetVersion)) {
    consola.error(`Invalid target version: ${targetVersion}`);
    return;
  }

  consola.log('');
  consola.info(`Build for Vue ${targetVersion}.x`);

  let err
  const rawPkg = await fs.readFile(pkgDir);
  const pkg = JSON.parse(rawPkg);
  const pkgVersion = [targetVersion, ...pkg.version.split('.').slice(1)].join('.');

  consola.info(pkgVersion);

  await fs.writeFile(pkgDir, JSON.stringify(pkg, null, 2));
  await backupApi();
  await switchApi(targetVersion, pkgVersion);
}

async function buildAll() {
  await buildFor(2);
  await buildFor(3);
}

async function cli() {
  try {
    const version = await selectVersion();

    if (version)
      await buildFor(version)
    else if (version === 0)
      await buildAll()
  } catch (e) {
    consola.error(e);
  }
}

if (require.main === module)
  cli();