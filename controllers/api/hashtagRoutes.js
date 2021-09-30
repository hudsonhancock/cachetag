const router = require('express').Router();
const { HashTag } = require('../../models');

// route to test the connections by querying the hashtag table
router.get("/", async (req, res) => {
  try {
    const hashtagData = await HashTag.findAll();
    res.status(200).json(hashtagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;