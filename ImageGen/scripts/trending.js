const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Adjustments particular to this page to ensure we hit desktop breakpoint.
  page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 2 });

  await page.goto('https://trends24.in/india/', { waitUntil: 'networkidle2' });

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

    // console.log('1');

    if (!selector)
      throw Error('Please provide a selector.');

    const rect = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      if (!element)
        return null;
      const { x, y, width, height } = element.getBoundingClientRect();

      element.scrollIntoView();

      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      var div = document.createElement("div");
      div.innerText = '#TwitterTrends (' + new Date().getDate() +'-'+ months[new Date().getMonth()]  +')';
      div.style.height = '40px';
      div.style.padding = '5px';
      div.style.borderBottom = "2px solid #ddd";
      div.style.fontWeight = "900";

      element.prepend(div);

      element.style.width = "black";

      // element.style.backgroundColor = "black";
      // element.style.color = "white";

      // elm = document.querySelector('.trend-card a');

      // console.log(elm);

      // document.querySelector('.trend-card a').style.color = "white";

      return { left: x, top: y, width, height, id: element.id };
    }, selector);

    // console.log('2');

    if (!rect)
      throw Error(`Could not find element that matches selector: ${selector}.`);


    return await page.screenshot({
      path,
      omitBackground:true,
      quality:100,
      clip: {
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2 + 45
      }
    });
  }

  await screenshotDOMElement({
    path: 'tweet/trends_' + new Date().getDate() +'_'+ new Date().getTime() +'.jpeg',
    selector: '.trend-card .trend-card__list',
    padding: 0
  });

  browser.close();
})();