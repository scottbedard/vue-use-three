const assert = require('assert');
const fs = require('fs-extra');
const path = require('path');
const { selectVersion } = require('./select_version');
const { updateImport } = require('./import');

const srcDir = path.resolve(__dirname, '../src');

async function backupApi(targetVersion) {
  try {
    await fs.copyFile(
      path.join(srcDir, 'api.ts'),
      path.join(srcDir, 'api.backup.ts'),
    );

    fs
      .readdirSync(path.resolve(__dirname, '../src/components'))
      .forEach(async(name) => {
        await fs.copyFile(
          path.join(srcDir, 'components', name, 'index.ts'),
          path.join(srcDir, 'components', name, 'index.backup.ts'),
        );
      });
  } catch (e) {}
}

async function restoreApi(targetVersion) {
  try {
    await fs.copyFile(
      path.join(srcDir, 'api.backup.ts'),
      path.join(srcDir, 'api.ts'),
    );

    await fs.remove(
      path.join(srcDir, 'api.backup.ts'),
    );
  } catch (e) {}
}

async function switchApi(targetVersion, pkgVersion) {
  assert([2, 3].includes(targetVersion));

  await fs.copyFile(
    path.join(srcDir, `api.${targetVersion}.ts`),
    path.join(srcDir, 'api.ts'),
  );

  await updateImport(pkgVersion);
}

async function cli() {
  const version = await selectVersion();

  if (version) {
    console.log(`Switch api to ${version}.x`);
    await switchApi(version);
  }
}

module.exports = {
  backupApi,
  restoreApi,
  switchApi,
};

if (require.main === module) {
  cli();
}
