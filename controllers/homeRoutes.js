const router = require("express").Router();

const rp = require("request-promise");

// + Array holding hardcoded version of the top tags for the main page to display when a user visits our website
const topHashtags = [
  "Health",
  "Fitness",
  "Beauty",
  "Fashion",
  "Lifestyle",
  "Business",
  "Animals",
  "Food",
  "Traveling",
  "Parenting",
  "DIY",
];
var hashtagObjs =[];


router.get("/", async (req, res) => {
	try {
		// + The AJAX URL of the hashtag   source that we use to gather related hashtags
		// let URL = `https://www.tagsfinder.com/en-us/ajax/?hashtag=${keyWord}&limit=10&country=us&custom=&type=live`
  			// + Call the scrapeHashtags function to find all of the hashtags on the instagram website.
        const scrapeHashtags = (html) => {
          var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
          var matches = [];
          var match;
          while ((match = regex.exec(html))) {
            matches.push(match[1]);
          }
          return matches;
        };
        const removeDuplicates = (arr) => {
          let newArr = [];
  
          arr.map((ele) => {
            if (newArr.indexOf(ele) == -1) {
              newArr.push(ele);
            }
          });
          return newArr;
        };
  
		for(i = 0; i < topHashtags.length; i++){
      let niche = topHashtags[i];
      let URL = `https://www.tagsfinder.com/en-us/ajax/?hashtag=${niche}&limit=10&country=us&custom=&type=live`;
			rp(URL)
				.then((html) => {
					// + Call the scrapeHashtags function, passing in the HTML we just scraped. scrapeHashtags(html) will find all of the hashtags on the instagram page, then add them to a matches array and return that
					let hashtags = scrapeHashtags(html);
          let categoryObj = {
            niche,
            hashtags: []
          }
					// + Remove all of the duplicates from the scraped hashtags returned from scrapeHashtags(html)
					hashtags = removeDuplicates(hashtags);
					hashtags = hashtags.map((ele) => "#" + ele);

          categoryObj.hashtags = hashtags;
          hashtagObjs.push(categoryObj);
					return hashtagObjs;
				})
				.catch((err) => {
					console.log(err);
				});
		  }
      console.log(hashtagObjs);

		// + Uses request-promise to fetch the HTML from the instagram website
		res.render(
			"homepage",
      { hashtagObjs }
			// , {
			//   projects,
			//   logged_in: req.session.logged_in
			// }
		);
	} catch (err) {
		res.status(500).json(err);
	}

}
)



module.exports = router;
