const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');

function run() {
  try {

    const email = core.getInput('email') || 'tech@qubership.com';
    const user = core.getInput('user') || 'tech';
    const commitMessage = core.getInput('commitMessage') || 'Update pom.xml';

    execSync(`git config --global user.email "${email}"`, { stdio: 'inherit' });
    execSync(`git config --global user.name "${user}"`, { stdio: 'inherit' });
    execSync(`git add .`, { stdio: 'inherit' });
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    execSync(`git push`, { stdio: 'inherit' });

    core.info(`Commit and push done!`);

  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();