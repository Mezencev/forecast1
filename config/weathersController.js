const request = require('request-promise-native');

async function getWeather(req, res) {
  try {
    const { city } = req.query;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.KEY}`;

    const weather = await request({ url, json: true });
    if (weather.main === undefined) return res.render('index', { weather, error: 'Cannot find weather stats.' });

    const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}! ${weather.weather[0].main}`;
    return res.render('index', { weather: weatherText, error: null });
  } catch (error) {
    return console.log(error);
    return res.render('index', { weather: null, error });
  }
}

module.exports = {
  getWeather,
};
