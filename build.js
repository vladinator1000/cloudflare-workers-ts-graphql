const path = require('path')
const { build, analyzeMetafile } = require('esbuild')

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
      entryPoints: [path.join(__dirname, 'src', 'index.ts')],
      outdir: path.join(__dirname, 'dist'),
      outExtension: { '.js': '.mjs' },
      plugins: [],
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
