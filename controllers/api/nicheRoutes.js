const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Niche, User } = require('../../models');

// route to get the user's niches
router.get("/", async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {attributes: {exclude: ["password"]}});

    const xnicheData = await User.findAll( {
      where: { user_id: req.session.user_id },
      attributes: {
        exclude: ["password"],
      },
      include: [{ model: Niche, through: {attributes: []}, }]
    });
    // serialize the collectionData so that we can work on it

    const xniche = xnicheData.map((nicheCol) => nicheCol.get({ plain: true }));
    //console.log("This is xNiche after serialization: " + JSON.stringify(xniche, null, 2));

    const yniche = xniche[0];
    const niches = yniche.niches;

    console.log("This is yniche: " + JSON.stringify(yniche, null, 2));
    //console.log("This is niches: " + JSON.stringify(niches, null, 2));

    const user = userData.get({ plain: true });
    console.log("This is user: "+ niches);
    res.render("profile", {
       ...user,
       niches,
       logged_in: true, 
     }
    );
  } catch (err) {
    res.status(500).json("Message: Failure inside the profileRoutes.js");
  }
});

router.get("/names", async (req, res) => {
  try {
    const nicheData = await Niche.findAll();
    res.status(200).json(nicheData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST route for a new Niche
//TODO: Figure out how to post new niche into user's niches
router.post('/', async (req, res) => {
  try {
    const newNiche = await Niche.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newNiche);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE a niche
router.delete('/:id', async (req, res) => {
  try {
    const nicheData = await Niche.destroy({
      where: {
        niche_id: req.params.id,
        // user_id: req.session.user_id,
      },
    });

    if (!nicheData) {
      res.status(404).json({ message: 'No niche found with this id!' });
      return;
    }

    res.status(200).json(nicheData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;