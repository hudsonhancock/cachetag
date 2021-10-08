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

router.get("/:keyword", async (req, res) => {
	try {
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
				let newTag = [];
				noEmpties.forEach((tag) => {
					if (tag.charAt(tag.length-1) == "X") {
						newTag.push(tag.slice(0, -1));
					} else { newTag.push(tag)};
				});
				
				//relatedHashtags = noEmpties = noEmpties.map((i) => "#" + i);
				console.log(newTag);
			}
		);
		res.status(200).json(newTag);
	} catch (err) {
		res.status(400).json(err);
	}
});
module.exports = router;
