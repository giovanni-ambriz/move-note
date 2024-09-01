import request from 'superagent'

const API_KEY = '08820eb151024c9f984b7e4e1428c9bf'
const BASE_URL = 'https://api.weatherbit.io/v2.0/current'

export async function fetchWeather(city: string) {
  try {
    const response = await request
      .get(BASE_URL)
      .query({ city, apikey: API_KEY })
    return response.body
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw error
  }
}
