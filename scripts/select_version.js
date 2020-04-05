async function selectVersion() {
  let version = -1;

  if (process.argv[2] === 'all') {
    return 0;
  }

  if (process.argv[2]) {
    version = +process.argv[2].slice(0, 1);
  }

  if (!version) {
    const inquirer = require('inquirer');

    const result = await inquirer.prompt([
      {
        choices: ['2.x', '3.x'],
        message: 'Target Vue Api Version',
        name: 'switch',
        type: 'list',
      },
    ]);

    if (result.switch) {
      version = +result.switch.slice(0, 1);
    }
  }

  return version;
}

module.exports = {
  selectVersion,
};
