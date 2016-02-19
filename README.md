Get Animated WebP Info
======================

## Lib

You should install [webpmux](https://developers.google.com/speed/webp/docs/webpmux)

## Usage

```javascript
const webpInfo = require('animated-webp-info');

var webpinfo = webpInfo('./test/test.webp', (err, result) => {
    if (err) return console.warn(err);
    console.log(result);
});
```

You would get webp info like:

```json
{
  "width": 480,
  "height": 480,
  "webp": {
    "featuresPresent": "animation",
    "bgColor": "0xFFFFFFFF",
    "loopCount": 0,
    "frames": [
      {
        "No": 1,
        "width": 480,
        "height": 480,
        "alpha": "no",
        "x_offset": 0,
        "y_offset": 0,
        "duration": 150,
        "dispose": "none",
        "blend": "yes",
        "image_size": 168478
      },
      {
        "No": 2,
        "width": 480,
        "height": 480,
        "alpha": "no",
        "x_offset": 0,
        "y_offset": 0,
        "duration": 150,
        "dispose": "none",
        "blend": "yes",
        "image_size": 170004
      },
      {
        "No": 3,
        "width": 480,
        "height": 480,
        "alpha": "no",
        "x_offset": 0,
        "y_offset": 0,
        "duration": 150,
        "dispose": "none",
        "blend": "yes",
        "image_size": 155276
      },
      {
        "No": 4,
        "width": 480,
        "height": 480,
        "alpha": "no",
        "x_offset": 0,
        "y_offset": 0,
        "duration": 150,
        "dispose": "none",
        "blend": "yes",
        "image_size": 170004
      }
    ],
    "duration": 150
  }
}
```