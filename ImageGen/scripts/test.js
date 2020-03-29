// var Crawler = require("crawler");


// var c = new Crawler({
//   maxConnections: 10,
//   // This will be called for each crawled page
//   callback: function (error, res, done) {
//     if (error) {
//       console.log(error);
//     } else {
//       var $ = res.$;
//       // $ is Cheerio by default
//       //a lean implementation of core jQuery designed specifically for the server
//       console.log($(".brand-table-list h2 span").text());
//     }
//     done();
//   }
// });


// // Queue just one URL, with default callback
// c.queue('https://www.socialbakers.com/statistics/twitter/profiles/india/entertainment');



// var a = "Narendra Modi (@narendramodi)Amitabh Bachchan (@SrBachchan)Shah Rukh Khan (@iamsrk)Salman Khan (@BeingSalmanKhan)Akshay Kumar (@akshaykumar)Virat Kohli (@imVkohli)PMO India (@PMOIndia)Sachin Tendulkar (@sachin_rt)Hrithik Roshan (@iHrithik)Malti (@deepikapadukone)"


// var a = "KATY PERRY(@katyperry) Justin Bieber(@justinbieber) Rihanna(@rihanna) Taylor Swift(@taylorswift13) Cristiano Ronaldo(@Cristiano) Lady Gaga(@ladygaga) Ellen DeGeneres(@TheEllenShow) Ariana Grande(@ArianaGrande) Justin Timberlake(@jtimberlake) Kim Kardashian West(@KimKardashian)"

// var a =  "Cricbuzz(@cricbuzz) रोहित सरदाना(@sardanarohit) Rajat Sharma(@RajatSharmaLive) Vivekh actor(@Actor_Vivek) Sambit Patra(@sambitswaraj) atlee(@Atlee_dir) Rithvik Dhanjani(@rithvik_RD) Stumbler Videos(@StumblerVideos) MissMalini(@MissMalini) Sadhguru(@SadhguruJV)"

// var a =  "All India Bakchod(@AllIndiaBakchod) Dharma Productions(@DharmaMovies) Yash Raj Films(@yrf) Atul Khatri(@one_by_two) Bhuvan Bam(@Bhuvan_Bam) Sunburn Festival(@SunburnFestival) TSeries(@TSeries) East India Comedy(@EastIndiaComedy) Bigg Boss(@BiggBoss) Sony Music South(@SonyMusicSouth)"


// var r = a.match(/\(([^)]+)\)/g);


// var m = {}
// r.forEach((u) => {
//   m[u] = u;
// });

// console.log(m);