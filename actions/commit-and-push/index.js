const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');

async function run() {
  try {

    const email = core.getInput('email');
    const user = core.getInput('user');
    const commitMessage = core.getInput('commitMessage') || 'Automated commit';

    core.info(`Using email: ${email}`);
    core.info(`Using username: ${user}`);
    core.info(`Commit message: ${commitMessage}`);

    execSync(`git config --global user.email "${email}"`, { stdio: 'inherit' });
    execSync(`git config --global user.name "${user}"`, { stdio: 'inherit' });

    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });

    core.info('Git commit and push completed successfully!');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

// Запуск основной функции
run();