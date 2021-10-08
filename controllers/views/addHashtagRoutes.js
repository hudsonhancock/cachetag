const router = require("express").Router();
const rp = require("request-promise");
const cheerio = require("cheerio");
const request = require("request");
//displays the addHashtag Page
router.get("/", async (req, res) => {
	try {
		res.render("addHashtag");
	} catch (err) {
		res.status(500).json(err);
	}
});

const topNiches = [
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

router.get("/:keyword", async (req, res) => {
	try {
		// let keyword = req.params.keyword;

		// const scrapeHashtags = (html) => {
		// 	var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
		// 	var matches = [];
		// 	var match;
		// 	while ((match = regex.exec(html))) {
		// 		matches.push(match[1]);
		// 	}
		// 	return matches;
		// };

		// const removeDuplicates = (arr) => {
		// 	let newArr = [];

		// 	arr.map((ele) => {
		// 		if (newArr.indexOf(ele) == -1) {
		// 			newArr.push(ele);
		// 		}
		// 	});
		// 	return newArr;
		// };

		let hashtags;
		let keyword = req.params.keyword;
		await request(
			{
				method: "GET",
				url: `https://www.tagsfinder.com/en-us/ajax/?hashtag=${keyword}&limit=10&country=us&custom=&type=live`,
			},
			(err, res, body) => {
				if (err) return console.error(err);
				let $ = cheerio.load(body);
				let h1El = $(".tag");
				let wordsArray = h1El.text().split("#");
				let noEmpties = wordsArray.filter((e) => e);
				noEmpties.forEach((tag) => {
					if (splitTag.includes("X")) {
						// let tagArr = tag.split("");
						// let noX = tagArr.pop();
						// let tagArr
						newTag = tag.substring(0, tag.length - 1);
					}
				});
				let noExes = noEmpties.filter((e) => e);
				relatedHashtags = noEmpties = noEmpties.map((i) => "#" + i);
				console.log(relatedHashtags);
			}
		);

		// let URL = `https://www.tagsfinder.com/en-us/ajax/?hashtag=${keyword}&limit=10&country=us&custom=&type=live`;
		// rp(URL)
		//   .then(html =>
		//     {
		//       hashtags = scrapeHashtags(html);
		//       return hashtags;
		//     })
		// 	.then((html) => {
		// 		// + Call the scrapeHashtags function, passing in the HTML we just scraped. scrapeHashtags(html) will find all of the hashtags on the instagram page, then add them to a matches array and return that
		// 		// + Remove all of the duplicates from the scraped hashtags returned from scrapeHashtags(html)
		// 		hashtags = removeDuplicates(hashtags);
		// 		// hashtags = hashtags.map(tag => tag);
		// 		// hashtags = hashtags.map((ele) => "#" + ele);
		// 		// searchResults.hashtags = hashtags;
		// 		// hashtagObjs.push(categoryObj);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});

		// res.json(hashtags);
	} catch (err) {
		res.status(400).json(err);
	}
});
module.exports = router;
