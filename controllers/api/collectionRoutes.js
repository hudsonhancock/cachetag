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

router.get("/currentUser", async (req, res) => {
  try {
    /* This route receives an empty GET request, and runs a the findAll query on the Collection model
     As the Collection model is a form of shorthand for the collection table and how its columns are structured, 
     this query with its WHERE variable will search the collection table WHERE the user_id is equal to the req.sessions.user_id
     The mysql query looks like: SELECT niche_id FROM collection WHERE user_id = req.session.user_id
     the resulting data is sent back as a response */
    const collectionData = await Collection.findAll({
      where: {user_id: req.session.user_id},
      attributes: [niche_id]
    });
    res.status(200).json(collectionData);
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;