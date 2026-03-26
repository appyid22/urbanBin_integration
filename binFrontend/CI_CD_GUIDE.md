# CI/CD Pipeline Documentation

## GitHub Actions Workflows

### 1. CI/CD Pipeline (`.github/workflows/ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`

**Jobs:**
- **Build**: Installs dependencies, lints, builds, and uploads artifacts
- **Deploy**: Deploys to GitHub Pages (only on `main` branch)

### 2. Docker Build (`.github/workflows/docker.yml`)

**Triggers:**
- Push to `main` branch
- Version tags (v*)

**Jobs:**
- Builds Docker image
- Pushes to Docker Hub

## Setup Instructions

### GitHub Pages Deployment

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / root
4. Save

### Docker Hub Deployment

Add secrets to GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Add secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token

### Environment Variables

For production deployment, set these in your hosting platform:
```
VITE_API_URL=https://your-api-domain.com/api
VITE_WS_URL=https://your-api-domain.com/ws
```

## Local Docker Testing

Build and run:
```bash
docker build -t smart-bin-management .
docker run -p 3000:80 smart-bin-management
```

Or use docker-compose:
```bash
docker-compose up
```

## Deployment Platforms

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### AWS S3 + CloudFront
Use GitHub Actions with AWS credentials

## Pipeline Status

Check pipeline status at:
`https://github.com/YOUR_USERNAME/smart-bin-management/actions`
