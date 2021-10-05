const router = require("express").Router();
const { Niche } = require('../../models');

//displays the addNiche Page
router.get('/', async (req, res) => {
  try {
  const nicheData = await Niche.findAll();

  // Serialize data so the template can read it
  const niches = nicheData.map((niche) => niche.get({ plain: true }));
    console.log(res.locals);
  res.render(
    "addNiche",
    { 
      niches,
      // logged_in: req.session.logged_in 
    }
  );
} catch (err) {
  res.status(500).json(err);
}
  });

  module.exports = router;