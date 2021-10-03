const router = require("express").Router();
const { User, Niche, Collection } = require("../../models");
// this brings in the auth helper function, that confirms if the user is logged in
const withAuth = require("../../utils/auth");

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        include: [
          {
            model: Collection,
            // TODO: Figure out how to get the name of niches to be included 
          },
        ]
      });

      // Serialize data so the template can read it
      // const niches = nicheData.map((niche) => niche.get({ plain: true }));
      const user = userData.get({ plain: true });

      res.render("profile", {
         ...user,
         logged_in: true, 
       }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;