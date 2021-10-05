const router = require("express").Router();
const {Niche} = require("../models");
const request = require("request");
const cheerio = require("cheerio");
// const rp = require("request-promise");

function topTags() {
	request(
		{
			method: "GET",
			url: "https://top-hashtags.com/instagram/",
		},
		(err, res, body) => {
			if (err) return console.error(err);

			let $ = cheerio.load(body);

			let h1El = $(".i-tag");
			// Takes the string that is all of the words with their hashtags all as one string and makes it an array of words
			let wordsArray = h1El.text().split("#");
			// Takes out all of the empty strings from the array
			let noEmpties = wordsArray.filter((e) => e);
			// Adds the hashtag symbol back to all of the words in the array
			var topHashtags = (noEmpties = noEmpties.map((i) => "#" + i));
			// console.log(topHashtags);
			console.log(topHashtags);
			return topHashtags;
		}
	);
}

//LUKE'S AMAZING CODE!!! DO NOT TOUCH!!

// + Array holding hardcoded version of the top tags for the main page to display when a user visits our website
// const topNiches = [
//   "Health",
//   "Fitness",
//   "Beauty",
//   "Fashion",
//   "Lifestyle",
//   "Business",
//   "Animals",
//   "Food",
//   "Traveling",
//   "Parenting",
//   "DIY",
// ];
// var hashtagObjs =[];

//this gets the hashtags related to the topNiches above
// router.get('/', async (req, res) => {
//   try {
//     const scrapeHashtags = (html) => {
//       var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
//       var matches = [];
//       var match;
//       while ((match = regex.exec(html))) {
//         matches.push(match[1]);
//       }
//       return matches;
//     };
//     const removeDuplicates = (arr) => {
//       let newArr = [];

//       arr.map((ele) => {
//         if (newArr.indexOf(ele) == -1) {
//           newArr.push(ele);
//         }
//       });
//       return newArr;
//     };

// for(i = 0; i < topNiches.length; i++){
//   let niche = topNiches[i];
//   let URL = `https://www.tagsfinder.com/en-us/ajax/?hashtag=${niche}&limit=10&country=us&custom=&type=live`;
//   rp(URL)
//     .then((html) => {
//       // + Call the scrapeHashtags function, passing in the HTML we just scraped. scrapeHashtags(html) will find all of the hashtags on the instagram page, then add them to a matches array and return that
//       let hashtags = scrapeHashtags(html);
//       let categoryObj = {
//         niche,
//         hashtags: []
//       }
//       // + Remove all of the duplicates from the scraped hashtags returned from scrapeHashtags(html)
//       hashtags = removeDuplicates(hashtags);
//       hashtags = hashtags.map((ele) => "#" + ele);

//       categoryObj.hashtags = hashtags;
//       hashtagObjs.push(categoryObj);
//       return hashtagObjs;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }
//   console.log(hashtagObjs);
//   return hashtagObjs;
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

//This displays the niches in the niches database
router.get("/", async (req, res) => {
	try {
		const nicheData = await Niche.findAll();
		// Serialize data so the template can read it
		const niches = nicheData.map((niche) => niche.get({plain: true}));

		res.render(
			"homepage",
			{
				niches,
				logged_in: req.session.logged_in
			}
			// , {
			//   projects,
			//   logged_in: req.session.logged_in
			// }
		);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/top-tags", async (req, res) => {
	try {
		request(
			{
				method: "GET",
				url: "https://top-hashtags.com/instagram/",
			},
			(err, res, body) => {
				if (err) return console.error(err);
				let $ = cheerio.load(body);
				let hashtagEl = $(".i-tag");
				let wordsArray = hashtagEl.text().split("#");
				// let noEmpties = wordsArray.filter((e) => e);
				let noEmpties = wordsArray.filter((element) => element.length < 20 && element.length > 4);
				topHashtags = noEmpties = noEmpties.map((i) => "#" + i);
				// console.log(topHashtags);
				exportedHashtags = wordsArray.filter((e) => e);
				const hashtagArr = topHashtags.map((text) => {
					return {
						text,
						popularity: 91,
					};
				});
				// console.log(exportedHashtags);
				return topHashtags;
			}
		);
		console.log(exportedHashtags);
		res.json(exportedHashtags);
	} catch {}
});

module.exports = router;
