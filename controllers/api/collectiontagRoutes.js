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

// route to add a new entry to the hashtag_niche table
router.post("/", async (req, res) => {
  try {
    const collectiontagData = await CollectionTag.create({
      collection_id: req.body.collection_id,
      hash_tag_id: req.body.hashtag_id
        });
    res.status(200).json(collectiontagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const collectiontagData = await CollectionTag.destroy({
      where: {
        hashtag_id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!collectiontagData) {
      res.status(404).json({ message: 'No niche found with this id!' });
      return;
    }

    res.status(200).json(collectiontagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;