import {
  defaultShouldDehydrateQuery,
  environmentManager,
  QueryClient,
} from '@tanstack/react-query'

const { isServer } = environmentManager

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
  if (isServer()) {
    // Server: Always make a new query client
    return makeQueryClient()
  }

  // Browser: make a new query client if we don't have one already
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}
