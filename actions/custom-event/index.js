const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Получение входных параметров
    const eventName = core.getInput('event_name', { required: true });
    const clientPayloadInput = core.getInput('client_payload', { required: false }) || '{}';

    // Проверка и парсинг client_payload
    let clientPayload;
    try {
      clientPayload = JSON.parse(clientPayloadInput);
    } catch (error) {
      throw new Error(`Invalid JSON for client_payload: ${clientPayloadInput}`);
    }

    core.info(`Event name: ${eventName}`);
    core.info(`Client Payload: ${JSON.stringify(clientPayload)}`);

    // Получение токена GitHub
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new Error('GitHub token is not provided. Make sure it is passed as an environment variable.');
    }

    // Создание клиента Octokit
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    // Вызов API для создания события
    const response = await octokit.rest.repos.createDispatchEvent({
      owner,
      repo,
      event_type: eventName,
      client_payload: clientPayload, // Используем корректный ключ
    });

    // Установка выходного параметра
    core.setOutput('status', response.status);
    core.info(`Custom event "${eventName}" triggered with status: ${response.status}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
