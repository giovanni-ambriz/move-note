import { useWeather } from '../hooks/useWeather';

export default function Weather() {
  const { data, isLoading, isError } = useWeather('Wanaka')

  if (isLoading) return <p>Loading weather...</p>;
  if (isError) return <p>Error fetching weather</p>;

  const temp = data?.data[0]?.temp;
  const weatherDescription = data?.data[0]?.weather?.description;
  const weatherIcon = `https://www.weatherbit.io/static/img/icons/${data?.data[0]?.weather?.icon}.png`;

  return (
    <div className="weather-widget">
      <img src={weatherIcon} alt={weatherDescription} className="weather-icon" />
      <p>{temp}°C</p>
      <p>{weatherDescription}</p>
    </div>
  );
};


