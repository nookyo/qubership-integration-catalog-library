const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GITHUB_TOKEN is not provided');
    }

    const eventName = core.getInput('event_name', { required: true });
    const payload = JSON.parse(core.getInput('payload', { required: false }) || '{}');

    const octokit = github.getOctokit(token);

    const { owner, repo } = github.context.repo;

    const response = await octokit.rest.repos.createDispatchEvent({
      owner,
      repo,
      event_type: eventName,
      payload: payload,
    });

    core.setOutput('status', response.status);
    console.log(`Custom event "${eventName}" triggered with status:`, response.status);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
