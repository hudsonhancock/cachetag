const router = require('express').Router();
const { Niche } = require('../../models');

// route to test the connections by querying the niche table
router.get("/", async (req, res) => {
  try {
    const nicheData = await Niche.findAll();
    res.status(200).json(nicheData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;