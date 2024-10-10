#!/bin/bash

# Prompt for new Git repository URL
read -p "Enter the new Git repository URL: " new_git_repo_url

# Prompt for new Git repository main branch with a default value of "main"
read -p "Enter the new Git repository main branch (default: main): " new_git_repo_main_branch
new_git_repo_main_branch=${new_git_repo_main_branch:-main}

# Recap the changes
echo ""
echo "You are about to make the following changes:"
echo "New Git repository URL: $new_git_repo_url"
echo "New Git repository main branch: $new_git_repo_main_branch"
echo ""
read -p ">>>>> Do you want to continue? (y/N): " confirm
confirm=${confirm:-N}

# Check if the user wants to continue
if [[ $confirm != "y" && $confirm != "Y" && $confirm != "YES" && $confirm != "yes" ]]; then
  echo "Aborting the script."
  exit 1
fi

# Get the latest commit hash from the current branch
latest_commit=$(git rev-parse HEAD)

# Create a new commit from the latest commit tree and reset the current branch to that commit
new_commit=$(git commit-tree "$latest_commit^{tree}" -m "feat: initial commit")
git reset --hard "$new_commit"

# Set the new remote URL
git remote set-url origin "$new_git_repo_url"

# Add the upstream remote
git remote add upstream "$new_git_repo_url"

# Push to the new main branch
git push origin "$new_git_repo_main_branch"
git push --all
