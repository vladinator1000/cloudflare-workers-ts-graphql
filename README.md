Everything you need to have a functional back end with Cloudflare Workers.

## 🔋 Getting Started

Prerequisites:

- Follow step [#6 from the Prisma Cloudflare docs](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#6-create-repository-and-push-to-github)
- [follow step #7](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-cloudflare-workers#7-importing-your-project-into-the-prisma-data-platform) from the Prisma docs
- Create or edit your `.env` file in the project root, changing `DATABASE_URL` to point to your Prisma data proxy account (connection string found in the Prisma proxy service https://cloud.prisma.io)
- `npm install`
- `npm run codegen`

```bash
npm start
```

### Overview

- 🔥 [Benzene GraphQL](https://benzene.vercel.app/) fast, minimal (4kB) and runtime-agnostic GraphQL support
- 🔨 [esbuild](https://esbuild.github.io/) for fast builds, configured in [scripts/build.js](./scripts/build.js)
- 🔎 [TypeScript](https://www.typescriptlang.org/) support
- 💾 [Prisma](https://www.prisma.io) database client support with a proxy that lets you talk to a local database
