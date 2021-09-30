const router = require('express').Router();
const { Collection } = require('../../models');

// route to test the connections by querying the collection table
router.get("/", async (req, res) => {
  try {
    const collectionData = await Collection.findAll();
    res.status(200).json(collectionData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;