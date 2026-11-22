# Calisfy AI

Calisfy AI is a calisthenics training platform for building skills and tracking progress.

- **Live site:** [calisfy-ai.vercel.app](https://calisfy-ai.vercel.app/)
- **GitHub:** [rishabh-1617/calisfy-ai](https://github.com/rishabh-1617/calisfy-ai)

## Project structure

- `frontend/` — Next.js application deployed to Vercel
- `backend/` — FastAPI service
- `docker-compose.yml` — local multi-service configuration

## Run locally

### Frontend

Install Node.js 20 or newer, then:

```bash
cd frontend
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To check that the production build succeeds:

```bash
cd frontend
npm ci
npm run build
```

### Backend (optional)

Create and activate a virtual environment, install dependencies, and start the API:

```bash
cd backend
python -m venv .venv
```

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

On macOS or Linux:

```bash
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API health endpoint is [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health).

## GitHub-to-Vercel deployment pipeline

This repository includes a GitHub Actions workflow at `.github/workflows/ci.yml`. It installs the frontend dependencies and runs a production build on pull requests and pushes to `main`. Vercel handles preview and production deployments when the GitHub repository is connected to the Vercel project.

### One-time Vercel setup

1. In Vercel, open the project serving [calisfy-ai.vercel.app](https://calisfy-ai.vercel.app/) and connect it to `rishabh-1617/calisfy-ai` if it is not already connected.
2. Set **Root Directory** to `frontend`.
3. Keep the framework preset as **Next.js**. Use `npm run build` as the build command and `npm ci` as the install command, if Vercel asks for them.
4. Set the production branch to `main` and save the project settings.

No Vercel token or deployment secret is required in GitHub when using Vercel's Git integration. If the frontend later needs a hosted API, configure its public API URL in the Vercel project's environment variables and deploy again. The FastAPI backend is a separate service; deploying the frontend to Vercel does not deploy the backend.

To prevent unverified changes from being merged, enable a branch protection rule for `main` in GitHub and require the `Frontend CI / build` status check. The check becomes available after the workflow has run at least once.

### Everyday change workflow

1. Create a branch for your change:

   ```bash
   git switch -c feature/describe-your-change
   ```

2. Make and test your changes locally:

   ```bash
   cd frontend
   npm ci
   npm run build
   ```

3. Commit and push the branch:

   ```bash
   git add .
   git commit -m "Describe your change"
   git push -u origin feature/describe-your-change
   ```

4. Open a pull request to `main`. GitHub Actions checks that the frontend builds; Vercel creates a preview deployment for review.
5. After the checks pass and the pull request is merged to `main`, Vercel builds and deploys the production site. Check the Vercel deployment status, then verify the live site.

To update the production site directly, you can push a commit to `main`; the same build check runs and Vercel deploys it. Pull requests are recommended so changes can be checked in a preview before going live.

## CI checks

The GitHub Actions workflow runs on pull requests and pushes to `main`. To run its build check locally:

```bash
cd frontend
npm ci
npm run build
```
