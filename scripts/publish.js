const assert = require('assert');
const consola = require('consola');
const exec = require('child_process').execSync;
const path = require('path');
const { buildFor } = require('./build');
const { selectVersion } = require('./select_version');

const distDir = path.resolve(__dirname, '..', 'dist');

async function publishFor(targetVueVersion) {
  assert([2, 3].includes(targetVueVersion));

  await buildFor(targetVueVersion, async(targetVersion, packageVersion) => {
    consola.info(`Publish for Vue ${targetVueVersion}.x`);

    if (targetVueVersion === 3) {
      exec('npm publish --access public --tag next', { stdio: 'inherit', cwd: distDir });
      exec(`npm dist-tag add vue-use-three@${packageVersion} vue3`, { stdio: 'inherit', cwd: distDir });
    }

    if (targetVueVersion === 2) {
      exec('npm publish --access public', { stdio: 'inherit', cwd: distDir });
      exec(`npm dist-tag add vue-use-three@${packageVersion} vue2`, { stdio: 'inherit', cwd: distDir });
    }

    consola.success(`Published vue-use-three for Vue ${targetVueVersion}.x`);
  });
}

async function publishAll() {
  await publishFor(2);
  await publishFor(3);
}

async function cli() {
  try {
    const version = await selectVersion();

    if (version) {
      await publishFor(version);
    } else if (version === 0) {
      await publishAll();
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = {
  publishFor,
};

if (require.main === module) {
  cli();
}
