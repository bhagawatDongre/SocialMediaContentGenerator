const newsData = require('./http');
const c = require('./gimp');
var fs = require('fs');
var Twit = require('twit')
const userNames = require('./tweetUserNames');

var T = new Twit({
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
