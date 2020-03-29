const https = require('https')
var fs = require('fs');

module.exports.getNewsData = function (callback) {
  const options = {
    hostname: 'newsapi.org',
    port: 443,
    path: '/v2/top-headlines?country=in&category=entertainment&apiKey={API_KEY}',
    method: 'GET',
    query: {
      category: 'entertainment',
      apiKey: '{API_KEY}'
    },
    headers: {
      'Content-Type': 'Application/Json'
    },
    search: '?country=in&category=entertainment&apiKey={API_KEY}'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    var str = ''
    res.on('data', function (chunk) {
      str += chunk;
    });

    res.on('end', function () {
      callback(str);
    });
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end();
}
