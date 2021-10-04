const router = require('express').Router();
const { User } = require('../../models');

// route to test the connections by querying the user table
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({attributes: ["username"]});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// this route is to return a single user's data from the user table, and uses the user_id of the session
router.get("/currentUser", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// this will create a new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(req.body);

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// this will handle the login, and the query comes from the /public/js/login.js. The route here is /api/users/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: `Incorrect email or password, please try again` });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: `Incorrect email or password, please try again` });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!'});
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log(req.session.logged_in);
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
