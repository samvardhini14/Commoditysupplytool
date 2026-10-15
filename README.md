# Commodity Buying Tool (CBT)

Commodity Buying Tool is a React dashboard for monitoring commodity supply, forecast, finance, ownership, and plant data. It includes **Natasha**, a Business AI Insight assistant, and a Node.js API backed by SQLite.

**Author:** parthasarathy.j@tigernalytics.com

## Technology

- React and Vite for the dashboard
- Express for the application API and production web server
- SQLite via `sql.js` for local, file-based data storage
- Chart.js for dashboard charts
- GitHub Actions and Azure App Service deployment support

## Requirements

- Node.js 20 or later
- npm

## Run locally

Install dependencies:

```bash
npm install
```

Start the API server in one terminal:

```bash
npm run dev:server
```

Start Vite in another terminal:

```bash
npm run dev
```

Open the URL shown by Vite (normally `http://127.0.0.1:5173/`). Vite forwards `/api` requests to the API server on port `3000`.

Demo accounts:

- `admin` / `cst@123`
- `tiger` / `tiger@123`

## SQLite configuration

The API creates the database automatically on first start and seeds the demo accounts. By default, it is written to:

```text
data/cbt.sqlite
```

Copy `.env.example` to `.env` and set either option as needed:

```ini
PORT=3000
DATA_DIR=./data
# SQLITE_PATH=./data/cbt.sqlite
```

`SQLITE_PATH` takes precedence over `DATA_DIR`. Database files and `.env` are excluded from Git.

## Production

Create the production bundle and run the server:

```bash
npm run build
npm start
```

The server hosts the `dist` bundle, exposes `GET /api/health`, and handles login through `POST /api/auth/login`.

## Azure App Service

The GitHub Actions workflow in `.github/workflows/azure-webapps-node.yml` deploys the application to Azure App Service. Set these repository/environment values before deploying:

- `AZURE_WEBAPP_NAME` in the workflow environment
- `AZURE_WEBAPP_PUBLISH_PROFILE` as a GitHub Actions secret

The workflow sets `DATA_DIR=/home/data` so the SQLite file survives application restarts. Keep the application to one App Service instance while using SQLite; move to a managed database before scaling out.

## Natasha assistant

Natasha is the Business AI Insight assistant shown in the dashboard. Her compact wand illustration is bundled at `public/natasha-wand.png` and is included automatically in production builds.
