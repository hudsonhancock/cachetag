const router = require("express").Router();

//displays the User's Hashtags Page
router.get('/', async (req, res) => {
    try {
      res.render('profile_hashtags'); 
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;