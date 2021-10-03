const router = require("express").Router();
//displays the Register Page
router.get('/', async (req, res) => {
    try {
      res.render('register'); 
    } catch (err) {
      res.status(500).json(err);
    }
  
  });
  
  module.exports = router;