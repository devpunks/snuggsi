class Weather {

  constructor (latitude, longitude) {
  }

  locate (latitude, longitude) {

    const api = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?'

    + 'lat='    + latitude
    + '&lon='   + longitude
    + '&appid=' + this.key
    + '&units=imperial'

    return fetch (api)
      .then (response => response.json ())
  }

  static get api () {
  }

  get key () // from openweathermap.org
    { return '62b74592e7bde09ede21693bce86460a' }

}

