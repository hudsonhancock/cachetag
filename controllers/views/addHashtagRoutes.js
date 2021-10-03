const router = require("express").Router();
//displays the addHashtag Page
router.get('/', async (req, res) => {
    try {
      res.render('addHashtag'); 
    } catch (err) {
      res.status(500).json(err);
    }
  
  });
  
  module.exports = router;