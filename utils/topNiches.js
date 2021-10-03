const cheerio = require("cheerio");
const request = require("request");
var exportedHashtags = [];
let topHashtags = [];
request(
      {
            method: "GET",
            url: "https://top-hashtags.com/instagram/",
      },
      (err, res, body) => {
            if (err) return console.error(err);

            let $ = cheerio.load(body);

            let h1El = $(".i-tag");
            let wordsArray = h1El.text().split("#");
            let noEmpties = wordsArray.filter((e) => e);
            topHashtags = (noEmpties = noEmpties.map((i) => "#" + i));
            // console.log(topHashtags);
            exportedHashtags = wordsArray.filter((e) => e);
            module.exports.arr = [];
            module.exports.arr.push(...topHashtags);
      }
)

// const scrapeHashtags = (html) => {
//             var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
//             var matches = [];
//             var match;
//             while ((match = regex.exec(html))) {
//               matches.push(match[1]);
//             }
//             return matches;
//           };

// getTags = () =>{
//       const URL = 'https://top-hashtags.com/instagram/';
//       rp(URL)
//       .then(response => {
//             let tags = scrapeHashtags(response);
//             console.log(tags);
//       })
//       .catch(error => {
//             console.log(err);
//       })
// }
