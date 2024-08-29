// useWellbeingArticles.ts
import { useQuery } from '@tanstack/react-query'
import { fetchWellbeingArticles } from '../apis/wellbeingArticles'

interface Article {
  headline: string
  url: string
}

export function useWellbeingArticles() {
  return useQuery<Article[], Error>({
    queryKey: ['wellbeingArticles'],
    queryFn: async () => {
      const data = await fetchWellbeingArticles()

      const canonicalLinks =
        data.mainEntityOfPage.find(
          (item: any) => item.name === 'canonicallinks',
        )?.mainEntityOfPage || []

      const secondaryCanonicalLinks =
        data.mainEntityOfPage.find(
          (item: any) => item.name === 'secondarycanonicallinks',
        )?.mainEntityOfPage || []

      return [...canonicalLinks, ...secondaryCanonicalLinks].map(
        (item: any) => ({
          headline: item.headline,
          url: item.url,
        }),
      )
    },
  })
}
