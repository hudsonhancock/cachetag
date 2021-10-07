const router = require('express').Router();
const { HashTag, Collection, Niche } = require('../../models');

// route to test the connections by querying the hashtag table
router.get("/", async (req, res) => {
  try {
    const hashtagData = await HashTag.findAll();
    res.status(200).json(hashtagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST route for a new hashtag, somebody sends a fetch POST request to localhost:3001/api/hashtags/
// TODO: Add a connection to niche's on creation of hashtag
router.post('/', async (req, res) => {
  try {
    console.log(`REQUEST BODY RECEIVED BY /api/hashtag/`);
    console.log(req.body);
    const newHashtag = await HashTag.create({
      text: req.body.hashtag
    });
    //console.log(req.body.hashtag);
    const nicheData = await Collection.findOne( {
      where: { niche_id: req.body.niche_id },
    });

    //console.log(nicheData)
    res.status(200).json({newHashtag, nicheData});
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