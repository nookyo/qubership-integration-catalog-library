import os
import sys
import requests

def check_tag_exists(repo, tag_name, token):
    url = f"https://api.github.com/repos/{repo}/git/refs/tags/{tag_name}"
    headers = {"Authorization": f"token {token}"}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return True
    elif response.status_code == 404:
        return False
    else:
        print(f"Error: {response.status_code} - {response.text}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python tag_checker.py <tag_name>")
        sys.exit(1)

    tag_name = sys.argv[1]
    repo = os.getenv("GITHUB_REPOSITORY")
    token = os.getenv("GITHUB_TOKEN")

    if not repo or not token:
        print("Error: GITHUB_REPOSITORY or GITHUB_TOKEN environment variables are not set.")
        sys.exit(1)

    exists = check_tag_exists(repo, tag_name, token)
    print(f"::set-output name=exists::{str(exists).lower()}")
