import { useQuery } from '@tanstack/react-query'
import { fetchWeather } from '../apis/weather'

export function useWeather(city: string) {
  return useQuery(['weather', city], () => fetchWeather(city), {
    staleTime: 3600000,
  })
}
