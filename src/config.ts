// TODO: Make this typed and load environment variables into it
export const config = {
  environment: ENVIRONMENT ?? 'development',
  clientUrl: '',
  prismaDevProxyUrl: 'http://prisma:3333',
  gqlExplorerUrl: 'https://studio.apollographql.com/sandbox/explorer',
}
