const router = require('express').Router();
const { CollectionTag } = require('../../models');

// route to test the connections by querying the niche table
router.get("/", async (req, res) => {
  try {
    const collectiontagData = await CollectionTag.findAll();
    res.status(200).json(collectiontagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;