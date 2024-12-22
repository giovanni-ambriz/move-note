import { useQuery } from '@tanstack/react-query'

interface Article {
  headline: string
  url: string
}

export function useWellbeingArticles() {
  return useQuery<Article[], Error>({
    queryKey: ['wellbeingArticles'],
    queryFn: async () => {
      const res = await fetch('/api/v1/wellbeing-articles')
      const data = await res.json()

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
