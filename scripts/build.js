const consola = require('consola');
const exec = require('child_process').execSync;
const fs = require('fs-extra');
const path = require('path');
const { backupApi, restoreApi, switchApi } = require('./switch');
const { migrateComponents } = require('./migrate');
const { selectVersion } = require('./select_version');

const metaFiles = ['LICENSE'];
const rootDir = path.resolve(__dirname, '..');
const pkgDir = path.join(rootDir, 'package.json');

async function buildMetaFiles(targetVersion, pkgVersion) {
  const pkgDist = path.resolve(__dirname, '..', 'dist');

  for (const metaFile of metaFiles) {
    await fs.copyFile(path.join(rootDir, metaFile), path.join(pkgDist, metaFile));
  }

  await fs.copyFile(path.join(rootDir, 'README.md'), path.join(pkgDist, 'README.md'));

  const pkgJson = JSON.parse(JSON.stringify(require('../package.json')));
  pkgJson.version = pkgVersion;
  delete pkgJson.devDependencies;
  delete pkgJson.scripts;

  if (targetVersion === 2) {
    pkgJson.peerDependencies = {
      vue: '^2.6.0',
      '@vue/composition-api': '^0.5.0',
    };
  }

  if (targetVersion === 3) {
    pkgJson.peerDependencies = {
      vue: 'next',
    };
  }
  
  await fs.writeFile(path.join(pkgDist, 'package.json'), `${JSON.stringify(pkgJson, null, 2)}\n`);
}

async function buildFor(targetVersion, publishCallback) {
  if (![2, 3].includes(targetVersion)) {
    consola.error(`Invalid target version: ${targetVersion}`);
    return;
  }

  consola.log('');
  consola.info(`Build for Vue ${targetVersion}.x`);

  let err;
  const rawPkg = await fs.readFile(pkgDir);
  const pkg = JSON.parse(rawPkg);
  const pkgVersion = [targetVersion, ...pkg.version.split('.').slice(1)].join('.');

  consola.info(pkgVersion);

  await fs.writeFile(pkgDir, JSON.stringify(pkg, null, 2));
  await backupApi();
  await switchApi(targetVersion, pkgVersion);

  if (targetVersion === 3) {
    await migrateComponents();
  }

  try {
    consola.info('Clean up');
    exec('npm run clean', { stdio: 'inherit' });

    consola.info('Generate Declarations');
    exec('tsc --emitDeclarationOnly', { stdio: 'inherit' });

    consola.info('Rollup');
    exec('rollup -c', { stdio: 'inherit' });

    consola.success(`Build for Vue ${targetVersion}.x finished`);

    await buildMetaFiles(targetVersion, pkgVersion);

    if (publishCallback) {
      await publishCallback(targetVersion, pkgVersion);
    }
  } catch (e) {
    err = e;
  } finally {
    await fs.writeFile(pkgDir, rawPkg);
    await restoreApi();
  }
  if (err) {
    throw err;
  }
}

async function buildAll() {
  await buildFor(2);
  await buildFor(3);
}

async function cli() {
  try {
    const version = await selectVersion();

    if (version) {
      await buildFor(version);
    } else if (version === 0) {
      await buildAll();
    }
  } catch (e) {
    consola.error(e);
  }
}

module.exports = {
  buildFor,
};

if (require.main === module) {
  cli();
}
