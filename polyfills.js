// Prisma uses the process global so we need to enable ithttps://github.com/evanw/esbuild/issues/1374#issuecomment-861801905
export var process = {
  env: new Proxy(
    {},
    {
      get: () => '',
    },
  ),
}
