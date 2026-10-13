# Local Setup (Windows 10/11, VS Code, PowerShell)

## Prerequisites

| Tool | Version used | Check command |
|---|---|---|
| Windows | 11 | `[System.Environment]::OSVersion.Version` |
| Windows PowerShell | 5.1 | `$PSVersionTable.PSVersion` |
| Git | 2.55 | `git --version` |
| Node.js (LTS) | 24.x | `node --version` |
| npm | 11.x | `npm --version` |
| Docker Desktop | 29.x | `docker --version` |
| Docker Compose | v5.x | `docker compose version` |
| VS Code | 1.141 | `code --version` |

Docker Desktop must be running (`docker info` should show a Server section).

## Get the code

```powershell
git clone https://github.com/YOUR_USERNAME/streamsphere.git
Set-Location streamsphere
Copy-Item .env.example .env
```

Edit `.env` and replace every `CHANGE_ME` value. Never commit `.env`.

## Run the app

Instructions are added as each phase is completed.