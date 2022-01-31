A worker template with a local development experience that lets you write _real-world_ back ends with dignity.

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
. start.sh
```

To run the unit tests (in a separate terminal)

```bash
npm test
```

To run the integration tests

```bash
npm run itest
```

## Database migrations

1. Change [./src/prisma/schema.prisma](./src/prisma/schema.prisma)
2. Create a migration (it will prompt you for a name)

```sh
npm run db-migrate-dev
```

3. Restart the worker and the Prisma proxy in a new terminal

```sh
. restart.sh
```

The Prisma proxy needs to be restarted because it generates a different database clients in the same folder as the worker. This means that if you generated both Prisma clients on the same file system at the same time, either the proxy or the worker won't work, because they both write to `node_modules/@prisma/client`.

In order to avoid this conflict, the Prisma proxy lives in a Docker container with a separate file system.

## Prerequisites for production

1. Create a new repo based on the template
1. Get a database connection string from a database service provider, or host your own. It should look something like this `postgresql://johndoe:password@host:port/mydb?schema=public`
1. Add a `MIGRATE_DATABASE_URL` secret [in your GitHub repo](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) to point to your Prisma data proxy account
1. Create a Prisma Proxy, following step [#6 from the Prisma Cloudflare docs](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#6-create-repository-and-push-to-github)
1. [Follow step #7](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#7-importing-your-project-into-the-prisma-data-platform) from the Prisma docs
1. Add a `DATABASE_URL` secret to your GitHub repo using the connection string from the Prisma proxy
1. Create a [Cloudflare API token](https://developers.cloudflare.com/api/tokens/create) and a GitHub secret called `CLOUDFLARE_API_TOKEN`,
