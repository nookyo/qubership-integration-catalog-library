const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const eventName = core.getInput('event_name', { required: true });
    const payloadInput = core.getInput('payload', { required: false }) || '{}';
    const token = core.getInput('github-token') || process.env.GITHUB_TOKEN;

    if (!token) {
      throw new Error('GitHub token is not provided. Make sure to pass it via "github-token" input or GITHUB_TOKEN environment variable.');
    }

    core.info(`Event name: ${eventName}`);
    core.info(`Payload input: ${payloadInput}`);

    let payload;
    try {
      payload = JSON.parse(payloadInput);
    } catch (error) {
      throw new Error(`Invalid JSON payload: ${payloadInput}`);
    }

    core.info(`Parsed payload: ${JSON.stringify(payload)}`);

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    const response = await octokit.rest.repos.createDispatchEvent({
      owner,
      repo,
      event_type: eventName,
      client_payload: payload,
    });

    core.setOutput('status', response.status);
    core.info(`Custom event "${eventName}" triggered with status: ${response.status}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
