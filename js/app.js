
const proxy = 'https://cors-anywhere.herokuapp.com/';
const KEY = '034114a19341cc0d8cead3296c91ba28/';

  let success = ({ coords }) => {
    let myPosition = coords.latitude + ',' + coords.longitude;
    let URI = `https://api.darksky.net/forecast/`;

    let getInfo = (data) => {
      // página principal
      $('.box').html(`<h1>${data.currently.temperature}°F</h1>
      <p><b>Wind: </b>${data.currently.windSpeed}m/s</p>
      <p><b>Humidity: </b>${data.currently.humidity}</p>
      <p><b>UV Index: </b>${data.currently.uvIndex}</p>
      <p><b>Pressure: </b>${data.currently.pressure}</p>
      <a id="week" href="#">Week prediction</a>
      `);

      // background with unsplash
      let url = 'https://source.unsplash.com/800x600/?';
      $('body').css({"background": "url('"+ url + data.currently.icon + "')", "background-repeat": "no-repeat", "background-size": "cover"});

      // Event for prediction
      $('#week').click(() => {
        console.log(data.daily.data[0]);
        $('.box').html('');
        $('.box').html(`<h1>Prediction</h1>
      <p><b>Tomorrow: </b>${data.daily.data[0].apparentTemperatureMin}°F - ${data.daily.data[0].apparentTemperatureMax}°F</p>
      <a id="back" href="#">Back</a>
      `);
      })
    }

    $.ajax({
      url: proxy + URI + KEY + myPosition,
      success: getInfo
    })
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }
