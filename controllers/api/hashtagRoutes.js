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

//POST route for a new Niche
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
// router.delete('/:id', async (req, res) => {
//   try {
//     const nicheData = await Niche.destroy({
//       where: {
//         niche_id: req.params.id,
//         // user_id: req.session.user_id,
//       },
//     });

//     if (!nicheData) {
//       res.status(404).json({ message: 'No niche found with this id!' });
//       return;
//     }

//     res.status(200).json(nicheData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
module.exports = router;