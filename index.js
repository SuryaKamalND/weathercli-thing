const city = process.argv[2];

if (!city) {
  console.log("Please provide a city name.");
  process.exit(1);
}

async function getWeather(city) {
  try {
    // Get coordinates
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
    );

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      console.log("City not found.");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];

    // Get weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    );

    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const code = weatherData.current_weather.weathercode;

    console.log(`Weather in ${name}: ${temp}°C, Code ${code}`);
  } catch (error) {
    console.log("Failed to fetch weather.");
  }
}

getWeather(city);
// update for PR
