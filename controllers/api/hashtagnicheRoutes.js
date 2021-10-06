const router = require('express').Router();
const { HashTagNiche } = require('../../models');

// route to test the connections by querying the niche table
router.get("/", async (req, res) => {
  try {
    const hashtagnicheData = await HashTagNiche.findAll();
    res.status(200).json(hashtagnicheData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: delete route to delete a user's hashtags 

module.exports = router;