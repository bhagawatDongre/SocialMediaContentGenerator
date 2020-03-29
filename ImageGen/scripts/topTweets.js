const puppeteer = require('puppeteer');
var Twit = require('twit')
const userNames = require('./tweetUserNames');


var T = new Twit({
});

async function screenShot(url = '') {

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome-stable',
    headless: true
  });

  const page = await browser.newPage();
  // Adjustments particular to this page to ensure we hit desktop breakpoint.
  page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 1 });

  await page.goto(url, { waitUntil: 'load', timeout: 0 });

  /**
   * Takes a screenshot of a DOM element on the page, with optional padding.
   *
   * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
   * @return {!Promise<!Buffer>}
   */
  async function screenshotDOMElement(opts = {}) {
    const padding = 'padding' in opts ? opts.padding : 0;
    const path = 'path' in opts ? opts.path : null;
    const selector = opts.selector;

    if (!selector)
      throw Error('Please provide a selector.');

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element)
        return null;
      const { x, y, width, height } = element.getBoundingClientRect();

      // element.scrollIntoView();

      // element.style.height = '500px';

      // element.style.width = '100%';

      return { left: x, top: y, width, height, id: element.id };
    }, selector);


    if (!rect)
      throw Error(`Could not find element that matches selector: ${selector}.`);


    console.log(`${url} :DONE`);

    await page.setViewport({ width: 1000, height: Math.round(rect.height + padding * 2), deviceScaleFactor: 1 });

    return await page.screenshot({
      path,
      omitBackground: true,
      quality: 100,
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2
      }
    });
  }

  await screenshotDOMElement({
    path: 'tweet/top_tweets_' + new Date().getDate() + '_' + new Date().getTime() + '.jpeg',
    selector: '.tweet.permalink-tweet',
    padding: 0
  });

  browser.close();
};


for (var user in userNames.userNames) {
  let screen_name = userNames.userNames[user];
  try {
    handleUserResponse(screen_name);
  } catch (err) {
    console.log(`${user} Failed`)
  }
};

function handleUserResponse(screen_name) {
  console.log(screen_name);

  T.get('statuses/user_timeline', { screen_name: screen_name, count: 1, include_rts: 1, exclude_replies: 1 }, function (err, data, response) {
    // check for tweet in last 24 hour
    data.forEach(tweet => {
      try {
        var tweetDate = new Date(tweet.created_at);
        var timeStamp = Math.round(new Date().getTime() / 1000);
        var timeStampYesterday = timeStamp - (24 * 3600);

        var is24 = tweetDate >= new Date(timeStampYesterday * 1000).getTime();

        if (is24) {
          console.log(`Creating : ${tweet.id_str}`);
          screenShot(`https://twitter.com/RajeevMasand/status/${tweet.id_str}`);
        } else {
          console.log(`Skiped : ${tweet.id_str}`);
        }
      } catch (err) {
        console.log(`${screen_name} : failed ${err}`)
      }
    });

    console.log('-----------------');

  });
}

// var Twit = require('twit')
// const userNames = require('./tweetUserNames');
// const puppeteer = require('puppeteer');

// var T = new Twit({
// });


// T.get('statuses/user_timeline', { screen_name: 'RajeevMasand', count: 5 }, function (err, data, response) {
//   console.log('1');
//   screenShot('https://twitter.com/RajeevMasand/status/1216635536506441729');
// });


// // T.get('statuses/show/:id', { id: 1216763979067904000, count: 5 }, function (err, data, response) {
// //   console.log(data);
// // })


// async function screenShot(url = '') {

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   // Adjustments particular to this page to ensure we hit desktop breakpoint.
//   page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 2 });

//   await page.goto(url, { waitUntil: 'networkidle2' });

//   /**
//    * Takes a screenshot of a DOM element on the page, with optional padding.
//    *
//    * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
//    * @return {!Promise<!Buffer>}
//    */
//   async function screenshotDOMElement(opts = {}) {
//     const padding = 'padding' in opts ? opts.padding : 0;
//     const path = 'path' in opts ? opts.path : null;
//     const selector = opts.selector;

//     await page.screenshot({ path: path });
//     return;
//   }

//   await screenshotDOMElement({
//     path: 'tweet/tweet_' + new Date().getDate() + '_' + new Date().getTime() + '.jpeg',
//     selector: '[role="article"]',
//     padding: 0
//   });

//   browser.close();
// };