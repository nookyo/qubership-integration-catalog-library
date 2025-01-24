const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {

    const name = core.getInput('name');
    const greeting = core.getInput('greeting');


    core.info(`Hello, ${name}!`);
    core.info(`My boy: ${greeting}`);


    const context = github.context;
    core.info(`Event: ${context.eventName}`);


    core.setOutput('done', `${name}`);
  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
}

run();