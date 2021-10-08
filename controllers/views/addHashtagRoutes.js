const router = require("express").Router();
const rp = require("request-promise");
const cheerio = require("cheerio");
const request = require("request");
const { User, Niche, Collection } = require("../../models");

// request has to be in its own promisifed wrapper, so that it can be forced to wait before the rest of the code executes
// solution found here: https://stackoverflow.com/questions/38428027/why-await-is-not-working-for-node-request-module
function doRequest(urlKey) {
	return new Promise( (resolve, reject) => {
		let newTags = [];
		request(
			{
				method: "GET",
				url: urlKey,
			},
			(err, res, body) => {
				if (err) return reject(err);
				let $ = cheerio.load(body);
				let h1El = $(".tag");
				let wordsArray = h1El.text().split("#");
				let noEmpties = wordsArray.filter((e) => e);
				noEmpties.forEach((tag) => {
					if (tag.charAt(tag.length-1) == "X") {
						newTags.push(tag.slice(0, -1));
					} else { newTags.push(tag)};
				});
				console.log("from inside the request" + newTags);
				resolve(newTags)
			}
		);
	});
};

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
		const URL = `https://www.tagsfinder.com/en-us/ajax/?hashtag=${keyword}&limit=10&country=us&custom=&type=live`;
		console.log(URL);

		let hashtags = await doRequest(URL);
		
		const nicheData = await User.findAll( {
			where: { user_id: req.session.user_id },
			attributes: {
			  exclude: ["password"],
			},
			include: [{ model: Niche, through: {attributes: []}, }]
		  });
		// serialize the nicheData so that we can work on it
		const xniche = nicheData.map((nicheCol) => nicheCol.get({ plain: true }));
		//console.log("This is xNiche after serialization: " + JSON.stringify(xniche, null, 2));
	
		const yniche = xniche[0];
		const niches = yniche.niches;
		//console.log("This is yniche: " + JSON.stringify(yniche, null, 2));
		//console.log(niches);
		//console.log(hashtags);
		// hashtags = ["test1", "test2", "test3"];
		res.render("addHashtag", {
			hashtags,
			niches,
		});
	} catch (err) {
		res.status(400).json(err);
	}
});
module.exports = router;
