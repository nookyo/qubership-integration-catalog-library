const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    // Get the input parameter: tag
    const tag = core.getInput('tag', { required: true });
    core.info(`Checking for the presence of tag: ${tag}`);

    // Create GitHub API client
    const token = core.getInput('github-token', { required: false }) || process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);

    // Retrieve the list of tags
    const { data: tags } = await octokit.rest.repos.listTags({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
    });

    // Check if the specified tag exists
    const tagExists = tags.some((t) => t.name === tag);

    core.info(`Tag ${tagExists ? 'found' : 'not found'}`);
    core.setOutput('exists', tagExists); // Set the output

    // Exit successfully
    process.exit(0);
  } catch (error) {
    core.setFailed(`Error: ${error.message}`);
  }
})();
