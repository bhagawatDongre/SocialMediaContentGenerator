var Jimp = require('jimp');
var md5 = require('md5');
let rawBackground = 'bBackground.png';
let waterMark = 'logo.png';
let intermediateImage = 'active/image.jpg';
// let outputImage = 'export/image1.jpg';

const IMAGE_WIDTH = 512;
const IMAGE_HEIGHT = 512;
const WATERMARK_OPACITY = 0.5;

module.exports.create = function (text = '...', Imageurl) {

  let textConfig = {
    text: "143s",
    maxWidth: IMAGE_WIDTH - 100,
    maxHeight: IMAGE_HEIGHT,
    placementX: 50,
    placementY: 100
  };
  
  textConfig.text = text;
  // console.log(text)
  // console.log('----------------')

  // escaped string isuue
  let outputImageName = md5(text);
  let outputImage = 'export/'+ outputImageName + '.jpg'
  let waterMark2 = Imageurl;

  Jimp.read(rawBackground)
    .then(tpl => (tpl.clone().write(intermediateImage)))
    .then(() => (Jimp.read(intermediateImage)))
    .then(tpl => (
      Jimp.read(waterMark).then(logoTpl => {
        logoTpl.resize(IMAGE_WIDTH, IMAGE_HEIGHT);
        logoTpl.opacity(WATERMARK_OPACITY)
        tpl.resize(IMAGE_WIDTH, Jimp.AUTO);
        return tpl.composite(logoTpl, 0, 0, [Jimp.BLEND_OVERLAY, 0.2, 0.2]);
      })
    ))
    .then(tpl => (
      Jimp.read(Imageurl).then(w => {
        w.resize(IMAGE_WIDTH, IMAGE_HEIGHT);
        w.opacity(WATERMARK_OPACITY)
        // tpl.resize(IMAGE_WIDTH, IMAGE_HEIGHT);

        return tpl.composite(w, 0, 0, [Jimp.BLEND_OVERLAY, 0.2, 0.2]);
      }).catch((err)=>{ 
        console.log('cannot read article image')
        console.log(err)
        return tpl;
      })
    ))
    .then(tpl => (
      Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => ([tpl, font]))
    ))
    .then(data => (
      Jimp.read(rawBackground).then(bg => {
        tpl = data[0];
        font = data[1];

        let textHeight = Jimp.measureTextHeight(font, textConfig.text, textConfig.maxHeight);

        let textBottom = IMAGE_HEIGHT - textHeight - (IMAGE_HEIGHT * 0.1);

        bg.resize(textConfig.maxWidth + 20, textHeight + 50);
        bg.opacity(0.7)
        // tpl.resize(IMAGE_WIDTH, Jimp.AUTO);
        return [tpl.composite(bg, textConfig.placementX -10 , textBottom - 10, [Jimp.EDGE_CROP, 0.2, 0.2]), font];
      })
    ))
    .then(data => {

      tpl = data[0];
      font = data[1];

      let textHeight = Jimp.measureTextHeight(font, textConfig.text, textConfig.maxHeight);

      let textBottom = IMAGE_HEIGHT - textHeight - (IMAGE_HEIGHT * 0.1);

      return tpl.print(font, textConfig.placementX, textBottom, {
        text: textConfig.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, textConfig.maxWidth, textConfig.maxHeight);
    })

    //export image
    .then(tpl => (tpl.quality(100).write(outputImage)))

    //log exported filename
    .then(tpl => {
      console.log('exported file: ' + outputImage);
    })

    //catch errors
    .catch(err => {
      console.error(err);
    });
};
