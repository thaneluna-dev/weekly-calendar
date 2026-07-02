param(
    [Parameter(Mandatory = $false)]
    [string]$CommitMessage = "Automated commit"
)

# Verify Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or is not in the system PATH."
    exit 1
}

# Verify this is a Git repository
if (-not (Test-Path ".git")) {
    Write-Error "The specified folder is not a Git repository."
    exit 1
}

Write-Host "Checking repository status..."
git status

# Stage all changes
Write-Host "`nAdding changes..."
git add .

# Check if there is anything to commit
git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host "No changes to commit."
    exit 0
}

# Commit
Write-Host "`nCommitting changes..."
git commit -m $CommitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Error "Commit failed."
    exit 1
}

# Determine current branch
$branch = git rev-parse --abbrev-ref HEAD

Write-Host "`nPushing to origin/$branch..."
git push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nPush completed successfully!"
}
else {
    Write-Error "Push failed."
    exit 1
}