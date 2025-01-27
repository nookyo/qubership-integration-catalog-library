const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require('child_process');

async function run() {
  try {

    const email = core.getInput('email') || 'tech@qubership.com';
    const user = core.getInput('user') || 'tech';
    const commitMessage = core.getInput('commitMessage') || 'Update pom.xml';

    exec(`git config --global user.email "${email}"`);
    exec(`git config --global user.name "${user}"`);
    exec(`git add .`);
    exec(`git commit -m "${commitMessage}"`);
    exec(`git push`);

  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();