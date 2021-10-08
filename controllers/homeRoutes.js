const router = require("express").Router();
const {Niche, Collection, User} = require("../models");
const request = require("request");
const cheerio = require("cheerio");

// request wrapped in a promise so that it is given time to finish running
// it is currently specific to instagram.com because of they way they format their returns being different from the other site we scrape
function doRequest(urlKey) {
	return new Promise( (resolve, reject) => {
		request(
			{
				method: "GET",
				url: urlKey,
			},
			(err, res, body) => {
				if (err) return reject(err);
				let $ = cheerio.load(body);
				let h1El = $(".i-tag");
				let wordsArray = h1El.text().split("#");
				const exportedHashtags = wordsArray.filter((e) => e);
				const hashtagArr = exportedHashtags.map((text) => {
					return {
						text,
					};
				});
				resolve(hashtagArr)
			}
		);
	});
};


router.get("/", async (req, res) => {
	try {
		let niches = ["Please login or register to save hashtags"];
		let URL = "https://top-hashtags.com/instagram/";
		const hashtagArr = await doRequest(URL);

 		if(req.session.logged_in){
		const xnicheData = await User.findAll( {
			where: { user_id: req.session.user_id },
			attributes: {
		  	exclude: ["password"],
			},
			include: [{ model: Niche, through: {attributes: []}, }]
	    });
	
	    // serialize the nicheData so that we can work on it
	
	    const xniche = xnicheData.map((nicheCol) => nicheCol.get({ plain: true }));
	    //console.log("This is xNiche after serialization: " + JSON.stringify(xniche, null, 2));
	
	    const yniche = xniche[0];
	    niches = yniche.niches;
	
	    //console.log("This is yniche: " + JSON.stringify(yniche, null, 2));
	    //console.log("This is niches: " + JSON.stringify(niches, null, 2));
		}
		res.render(
			"homepage",
			{
				hashtagArr,
				niches
			}
		)// + ------------------END OF POPULATE DROPDOWN FUNCTIONALITY ------------------------------
		// console.log(niches);

	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
