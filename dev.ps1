$ErrorActionPreference = "Stop"

$repoRoot = $PSScriptRoot
$backend = Join-Path $repoRoot "backend"
$frontend = Join-Path $repoRoot "frontend"

if (!(Test-Path (Join-Path $backend ".venv"))) {
  Write-Host "Backend venv not found. Create it with: cd backend; python -m venv .venv"
}

Write-Host "Starting backend..."
Start-Process powershell "-NoExit -Command `"cd '$backend'; if (Test-Path .\.venv\Scripts\Activate.ps1) { . .\.venv\Scripts\Activate.ps1 }; uvicorn app.main:app --reload --port 8000`""

Write-Host "Starting frontend..."
Start-Process powershell "-NoExit -Command `"cd '$frontend'; npm run dev`""
