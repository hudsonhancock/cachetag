const router = require("express").Router();
const {Niche, Collection, User} = require("../models");
const request = require("request");
const cheerio = require("cheerio");
// const rp = require("request-promise");

// function topTags() {
// 	request(
// 		{
// 			method: "GET",
// 			url: "https://top-hashtags.com/instagram/",
// 		},
// 		(err, res, body) => {
// 			if (err) return console.error(err);

// 			let $ = cheerio.load(body);

// 			let h1El = $(".i-tag");
// 			// Takes the string that is all of the words with their hashtags all as one string and makes it an array of words
// 			let wordsArray = h1El.text().split("#");
// 			// Takes out all of the empty strings from the array
// 			let noEmpties = wordsArray.filter((e) => e);
// 			// Adds the hashtag symbol back to all of the words in the array
// 			var topHashtags = (noEmpties = noEmpties.map((i) => "#" + i));
// 			// console.log(topHashtags);
// 			console.log(topHashtags);
// 			return topHashtags;
// 		}
// 	);
// }




router.get("/", async (req, res) => {
	try {
		let niches = ["Please login or register to save hashtags"];
			await request(
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
				hashtagArr = exportedHashtags.map((text) => {
					return {
						text,
					};
				});
				// console.log(hashtagArr); 
				return hashtagArr;
			}
		);
		// console.log(hashtagArr); 


		// + ------------ BEGINNING OF FUNCTIONALITY TO POPULATE DROPDOWN MENU -----------------
		// if(req.session.user_id){
		// const userCollections = Collection.findAll({
		// 	attributes: ["user_id"],
		// 	where: { 
		// 		user_id: req.session.user_id
		// 	}
		// });
		// if(userCollections){
		// console.log(userCollections);
		// // const hashtags = hashtagArr.map((tag) => tag.get({plain: true}));
		// }else{
		// 	console.log(`NO USER_ID FOUND`)
		// }
 if(req.session.logged_in){
	const xnicheData = await User.findAll( {
		where: { user_id: req.session.user_id },
		attributes: {
		  exclude: ["password"],
		},
		include: [{ model: Niche, through: {attributes: []}, }]
	    });
	
	    // serialize the collectionData so that we can work on it
	
	    const xniche = xnicheData.map((nicheCol) => nicheCol.get({ plain: true }));
	    //console.log("This is xNiche after serialization: " + JSON.stringify(xniche, null, 2));
	
	    const yniche = xniche[0];
	    niches = yniche.niches;
	
	    console.log("This is yniche: " + JSON.stringify(yniche, null, 2));
	    console.log("This is niches: " + JSON.stringify(niches, null, 2));
	
}
res.render(
	"homepage",
	{
		hashtagArr,
		niches
	}
)	    // + ------------------END OF POPULATE DROPDOWN FUNCTIONALITY ------------------------------
		// console.log(niches);

	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
