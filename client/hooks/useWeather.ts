import { useQuery } from '@tanstack/react-query'
import { fetchWeather } from '../apis/weather'

export function useWeather(city: string) {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    staleTime: 3600000,
  })
}
