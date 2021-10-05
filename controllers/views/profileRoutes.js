const router = require("express").Router();
const { User, Niche, Collection } = require("../../models");
// this brings in the auth helper function, that confirms if the user is logged in
const withAuth = require("../../utils/auth");

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {attributes: {exclude: ["password"]}});

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
      const niches = yniche.niches;

      console.log("This is yniche: " + JSON.stringify(yniche, null, 2));
      //console.log("This is niches: " + JSON.stringify(niches, null, 2));

      const user = userData.get({ plain: true });
      console.log("This is user: "+ niches);
      res.render("profile", {
         ...user,
         niches,
         logged_in: true, 
       }
      );
    } catch (err) {
      res.status(500).json("Message: Failure inside the profileRoutes.js");
    }
  });
  
module.exports = router;