const router = require("express").Router();
//displays the addNiche Page
router.get('/', async (req, res) => {
    try {
      res.render('addNiche'); 
    } catch (err) {
      res.status(500).json(err);
    }
  
  });

  module.exports = router;