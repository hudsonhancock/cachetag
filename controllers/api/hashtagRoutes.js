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

//POST route for a new hashtag
// TODO: Add a connection to niche's on creation of hashtag
router.post('/', async (req, res) => {
  try {
    const newHashtag = await HashTag.create({
      ...req.body
      // user_id: req.session.user_id,
    });

    
    res.status(200).json(newHashtag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE a niche
router.delete('/:id', async (req, res) => {
  try {
    const hashtagData = await HashTag.destroy({
      where: {
        hashtag_id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!hashtagData) {
      res.status(404).json({ message: 'No hashtag found with this id!' });
      return;
    }

    res.status(200).json(hashtagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;