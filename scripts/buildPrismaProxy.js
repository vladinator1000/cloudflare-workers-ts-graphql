const path = require('path')
const { build } = require('esbuild')
const alias = require('esbuild-plugin-alias')
const { wrapWithQuotes } = require('./buildUtils')

async function buildWorker() {
  try {
    const result = await build({
      bundle: true,
      sourcemap: true,
      platform: 'node',
      treeShaking: true,
      target: 'esnext',
      entryPoints: [path.join(__dirname, '../src', 'prisma/prismaDevProxy.ts')],
      outdir: path.join(__dirname, '../dist'),
      define: {
        ENVIRONMENT: wrapWithQuotes(process.env.ENVIRONMENT || 'development'),
      },
      plugins: [
        alias({
          '@prisma/client': require.resolve('@prisma/client'),
        }),
      ],
    })
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

buildWorker()
