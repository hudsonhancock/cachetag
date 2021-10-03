const router = require("express").Router();
const { Niche } = require('../models');
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


//Adds niches to the Niche's database 
router.post('/', async (req, res) => {
  try {
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
  //creates a newNiche in the database using the data we got back from the API
    const newNiche = await Niche.create({
      ...res.hashtagObjs.niche,
      // user_id: req.session.user_id,
    });

    res.status(200).json(newNiche);
  } catch (err) {
    res.status(400).json(err);
  }
});

//This gets the most popular niches along with related hashtags from API
router.get("/", async (req, res) => {
  try {
    const nicheData = await Niche.findAll();

    // Serialize data so the template can read it
    const niches = nicheData.map((niche) => niche.get({ plain: true }));

    res.render(
			"homepage",
      { niches }
			// , {
			//   projects,
			//   logged_in: req.session.logged_in
			// }
		);
	} catch (err) {
		res.status(500).json(err);
	}
}); 

module.exports = router;
