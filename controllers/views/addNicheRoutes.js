const router = require("express").Router();
const { Niche, User } = require('../../models');

//displays the addNiche Page
router.get('/', async (req, res) => {
  try {
    const nicheData = await User.findAll( {
      where: { user_id: req.session.user_id },
      attributes: {
        exclude: ["password"],
      },
      include: [{ model: Niche, through: {attributes: []}, }]
    });
    // serialize the collectionData so that we can work on it

    const niche = nicheData.map((nicheCol) => nicheCol.get({ plain: true }));
    //console.log("This is xNiche after serialization: " + JSON.stringify(xniche, null, 2));

    const xniche = niche[0];
    const niches = xniche.niches;

    //console.log("This is xniche: " + JSON.stringify(xniche, null, 2));
    //console.log("This is niches: " + JSON.stringify(niches, null, 2));

    // Serialize data so the template can read it
    
    console.log(niches);
    res.render(
      "addNiche",
      { 
        niches, 
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;