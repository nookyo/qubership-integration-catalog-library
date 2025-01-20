# Custom Event Action

This  Action triggers a custom `repository_dispatch` event in the repository.

## Inputs

| Name            | Description                                         | Required | Default |
|-----------------|-----------------------------------------------------|----------|---------|
| `event_name`    | The name of the custom event to trigger.            | Yes      | None    |
| `client_payload`| Optional JSON payload to send with the event.       | No       | `{}`    |
| `GITHUB_TOKEN`  | GitHub Token for authentication.                   | Yes      | None    |

## Outputs

| Name     | Description                        |
|----------|------------------------------------|
| `status` | HTTP status code of the request.   |

## Usage

Below is an example of how to use this action in a GitHub Actions workflow:

```yaml
name: Trigger Custom Event Action Workflow

on:
  workflow_dispatch:

jobs:
  trigger-event:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger custom event
        uses: netcracker/qubership-workflow-hub/actions/custom-event@main
        with:
          event_name: "my-custom-event"
          client_payload: '{"key": "value"}'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN}}  

