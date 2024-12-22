import { useQuery } from '@tanstack/react-query'
interface WeatherData {
  temperature: string
  city_name: string
  weather: {
    description: string
  }
}

export function useWeather(city: string) {
  return useQuery<WeatherData, Error>({
    queryKey: ['weather', city],
    queryFn: async () => {
      const res = await fetch(`/api/v1/weather?city=${city}`)

      if (!res.ok) {
        throw new Error('Failed to fetch weather data')
      }

      return res.json()
    },
  })
}
