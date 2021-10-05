const router = require("express").Router();
const { Niche, HashTag } = require('../../models');
const request = require("request");
const cheerio = require("cheerio")
// const rp = require("request-promise");

router.get("/", async (req, res) => {
      try {
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
                        const hashtagArr = topHashtags.map((text) => {
                            return {
                                text: text,
                                popularity: 91
                            };
                        });
                        console.log(hashtagArr);
                        // console.log(topHashtags);
                        exportedHashtags = wordsArray.filter((e) => e);

                        console.log(exportedHashtags);
                        return topHashtags;
                  }
            )
            res.json(exportedHashtags);
    }
    catch{

    }});

    module.exports = router;
    