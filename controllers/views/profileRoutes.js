const router = require("express").Router();
const { User } = require("../../models");
// this brings in the auth helper function, that confirms if the user is logged in
const withAuth = require("../../utils/auth");

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
      //   this tells the findByPk query to NOT pull the password, which could be a security concern
        attributes: { exclude: ['password'] },
        // this include could be used to attach the Collection row that's associated with this user and help to pass it to the handlebars page
        //   include: [{ model: Collection }],
       });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
         ...user,
         logged_in: true
       }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;