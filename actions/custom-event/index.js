const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {

    // Get the input parameter: tag
    const eventName = core.getInput('event_name', { required: true });
    const clientPayload = JSON.parse(core.getInput('client_payload', { required: false }) || '{}');

    core.info(`Event name: ${eventName}`);
    core.info(`Payload: ${payload}`);

    // Create GitHub API client
    //const token = core.getInput('github-token', { required: true });
    const token = process.env.GITHUB_TOKEN;;
    core.info(`token: ${token}`);
    
    const octokit = github.getOctokit(token);

    const { owner, repo } = github.context.repo;

    const response = await octokit.rest.repos.createDispatchEvent({
      owner,
      repo,
      event_type: eventName,
      client_payload : clientPayload,
    });

    core.setOutput('status', response.status);
    console.log(`Custom event "${eventName}" triggered with status:`, response.status);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
