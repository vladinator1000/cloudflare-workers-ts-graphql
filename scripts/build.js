const path = require('path')
const { build, analyzeMetafile } = require('esbuild')
const alias = require('esbuild-plugin-alias')
const { wrapWithQuotes } = require('./buildUtils')

async function buildWorker() {
  try {
    const result = await build({
      bundle: true,
      sourcemap: true,
      metafile: true,
      // Uncomment to reduce bundle size
      // minify: true,
      treeShaking: true,
      format: 'esm',
      target: 'esnext',
      entryPoints: [path.join(__dirname, '../src', 'index.ts')],
      outdir: path.join(__dirname, '../dist'),
      outExtension: { '.js': '.mjs' },
      define: {
        ENVIRONMENT: wrapWithQuotes(process.env.ENVIRONMENT || 'development'),
      },
      plugins: [
        alias({
          '@prisma/client': require.resolve('@prisma/client'),
        }),
      ],
      inject: ['./polyfills.js'],
    })

    // Uncomment to see what takes up space in the bundle
    // const bundleSizeAnalysis = await analyzeMetafile(result.metafile, {
    //   color: true,
    // })
    // console.log(bundleSizeAnalysis)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

buildWorker()
