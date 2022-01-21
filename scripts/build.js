const path = require('path')
const { build, analyzeMetafile } = require('esbuild')
const alias = require('esbuild-plugin-alias')

async function buildWorker() {
  try {
    const result = await build({
      bundle: true,
      sourcemap: true,
      metafile: true,
      // Uncomment this to reduce bundle size
      // minify: true,
      treeShaking: true,
      format: 'esm',
      target: 'esnext',
      entryPoints: [path.join(__dirname, '../src', 'index.ts')],
      outdir: path.join(__dirname, '../dist'),
      outExtension: { '.js': '.mjs' },
      define: {
        'process.env.NODE_ENV': `"${process.env.NODE_ENV ?? 'development'}"`,
        // need to stub this out or the runtime will throw an exception
        'process.env.DATABASE_URL': `""`,
      },
      plugins: [
        alias({
          '@prisma/client': require.resolve('@prisma/client'),
        }),
      ],
      // inject: ['./processEnvShim.js'],
    })

    const bundleSizeAnalysis = await analyzeMetafile(result.metafile, {
      color: true,
    })
    console.log(bundleSizeAnalysis)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  }
}

buildWorker()
