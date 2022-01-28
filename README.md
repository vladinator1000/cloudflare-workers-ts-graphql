A real-world worker template with a local development experience that lets you write _big back ends_ with dignity.

## Overview

- 🔥 [Benzene GraphQL](https://benzene.vercel.app/) fast, minimal (4kB) and runtime-agnostic GraphQL support
- 🔨 [esbuild](https://esbuild.github.io/) for fast builds, configured in [scripts/build.js](./scripts/build.js)
- 🔎 [TypeScript](https://www.typescriptlang.org/) support
- 💾 [Prisma](https://www.prisma.io) database client support with a proxy that lets you talk to a local database
- 📦 GitHub actions that automate testing, data migrations and deployment for production

## Get started

1. Create a repo from the template
1. Clone your new repo
1. Make sure you have [Docker](https://docs.docker.com/engine/install/) installed

```bash
docker compose up
```

## Prerequisites for production

1. Create a new repo based on the template
1. Get a database connection string from a database service provider, or host your own. It should look something like this `postgresql://johndoe:password@host:port/mydb?schema=public`
1. Add a `MIGRATE_DATABASE_URL` secret [in your GitHub repo](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to point to your Prisma data proxy account
1. Create a Prisma Proxy, following step [#6 from the Prisma Cloudflare docs](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#6-create-repository-and-push-to-github)
1. [Follow step #7](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#7-importing-your-project-into-the-prisma-data-platform) from the Prisma docs
1. Add a `DATABASE_URL` secret to your GitHub repo using the connection string from the Prisma proxy
1. Create a [Cloudflare API token](https://developers.cloudflare.com/api/tokens/create) and a GitHub secret called `CLOUDFLARE_API_TOKEN`,
