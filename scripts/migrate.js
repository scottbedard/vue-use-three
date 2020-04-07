const consola = require('consola');
const fs = require('fs-extra');
const path = require('path');

const componentsDir = path.resolve(__dirname, '../src/components');

async function migrateComponents() {
  try {
    fs
      .readdirSync(componentsDir)
      .forEach(async(name) => {
        consola.info(`Migrating: ${name}`);
        const componentPath = path.join(componentsDir, name, 'index.ts');

        let src = fs
          .readFileSync(componentPath)
          .toString();
        
        // import h as a dependency
        src = src.replace(
          /import { ([A-Za-z,\ ]+) } from '\.\.\/\.\.\/api';/,
          (m, deps) => `import { ${ deps.split(',').map(s => s.trim()).concat('h').join(', ') } } from '../../api';`,
        );

        // remove h from render arguments
        src = src.replace(/render\(h.*\) {/, 'render() {');

        // call slot functions
        src = src.replace(
          /this\.\$slots\.([A-Za-z]+)/g,
          (m, slot) => `this.$slots.${slot}()`,
        );

        fs.writeFileSync(componentPath, src);
      });
  } catch (e) {}
}

module.exports = {
  migrateComponents,
};
