const newsData = require('./http');
const c = require('./gimp');
var fs = require('fs');
var Twit = require('twit')
const userNames = require('./tweetUserNames');

var T = new Twit({
  consumer_key: 'yLH1Li9uTufm5I6KxSjlFLo0M',
  consumer_secret: '49K6KXmp2YPNWCi1ZHdTI4srVUeTDWFd70DINfNFWmiMbL3DmP',
  access_token: '789069851180437504-1j6J3OVLQVbUsWIzvu4TiuiuFoROUYy',
  access_token_secret: 'z7iBHnVatLaXUjEOvpbrdkI0pMOFp5JzTEsCpMB3ApuHe',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
});


// T.get('trends/place', { id: 2282863, count: 5 }, function (err, data, response) {
//   let trends = [];

//   console.log(data[0].trends.length);
//   data[0].trends.forEach((trend, i) => {
//     if(trend.promoted_content !== null || i > 5) {
//       return;
//     };

//     trends.push(decodeURIComponent(trend.query))
//   });


//   // fs.writeFile('trends.txt', trends, function (err) {
//   //   if (err) throw err;
//   //   console.log('Saved!');
//   // });
//   console.log(trends);
// });



// return;
newsData.getNewsData(function (res) {
    let data = JSON.parse(res);
    console.log('--------------article---------------');
    console.log(data);

    let articles = data.articles;

    // if (!articles && articles.length > 0) {
    //   return;
    // }


  for (let i = 0; i < articles.length; i++) {
  // for (let i = 0; i < 2; i++) {
      let article = articles[i];
      // console.log(article);
      c.create(article.title, article.urlToImage);
    }
});

