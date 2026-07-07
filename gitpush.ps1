param(
    [Parameter(Mandatory = $false)]
    [string]$CommitMessage = "Automated commit",
    [Parameter(Mandatory = $false)]
    [string]$GITHUB_REPOSITORY
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

Write-Host "Checking if github repository is set..."
if (-not (git remote get-url origin)) {
    Write-Error "No remote repository is set. Please set a remote repository before pushing."
    Write-Host "Setting the remote repository to 'origin'..."
    gh repo create $GITHUB_REPOSITORY --public --source=. --remote=origin --push
    exit 1
}

Write-Host "Checking repository status..."
git status

$gitignorePath = ".gitignore"

if (-not (Test-Path $gitignorePath)) {
    New-Item -ItemType File -Path $gitignorePath -Force | Out-Null
}

$gitignoreContent = Get-Content $gitignorePath -ErrorAction SilentlyContinue

if ($gitignoreContent -notcontains ".env") {
    Add-Content -Path $gitignorePath -Value "`n# Environment variables`n.env"
    Write-Host "Added .env to .gitignore."
}
else {
    Write-Host ".env is already ignored."
}

# If .env was previously tracked, stop tracking it while keeping the local file
git rm --cached .env 2>$null

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