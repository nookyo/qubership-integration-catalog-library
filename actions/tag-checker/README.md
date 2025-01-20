# GitHub Action: Check Tag

This GitHub Action checks whether a specified tag exists in a repository.

## Inputs

| Name           | Description                       | Required | Default |
|----------------|-----------------------------------|----------|---------|
| `tag`          | The tag name to check.           | Yes      | None    |
| `github-token` | GitHub Token for authentication. | No       | None    |

## Outputs

| Name    | Description                       |
|---------|-----------------------------------|
| `exists` | `true` if the tag exists, `false` otherwise. |

## Usage

Below is an example of how to use this action in a GitHub Actions workflow:

```yaml
name: Check Tag Workflow

on:
  push:
    branches:
      - main

jobs:
  check-tag:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Check if tag exists
        uses: ./actions/tag-checker
        with:
          tag: 'v1.0.0'
          github-token: ${{ secrets.GITHUB_TOKEN }}
        
      - name: Output result
        run: echo "Tag exists: ${{ steps.check-tag.outputs.exists }}"
