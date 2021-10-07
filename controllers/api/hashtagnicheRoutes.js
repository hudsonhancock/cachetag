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

// route to add a new entry to the hashtag_niche table
router.post("/", async (req, res) => {
  try {
    const hashtagnicheData = await HashTagNiche.create({
      niche_id: req.body.niche_id,
      hashtag_id: req.body.hashtag_id
    });
    res.status(200).json(hashtagnicheData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: delete route to delete a user's hashtags
router.delete('/:id', async (req, res) => {
  try {
    const hashtagData = await HashTagNiche.destroy({
      where: {
        hashtag_id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!hashtagData) {
      res.status(404).json({ message: 'No niche found with this id!' });
      return;
    }

    res.status(200).json(hashtagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;