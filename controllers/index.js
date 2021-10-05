const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

const loginRoutes = require("./views/loginRoutes");
const profileRoutes = require("./views/profileRoutes");
const profileHashtagsRoutes = require("./views/profileHashtagsRoutes");
const registerRoutes = require("./views/registerRoutes");
const addNicheRoutes = require("./views/addNicheRoutes");
const addHashtagRoutes = require("./views/addHashtagRoutes");

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// this uses the file profileRoutes.js to handle queries pointed at /profile
router.use("/profile", profileRoutes);
router.use("/hashtags", profileHashtagsRoutes);


// this uses the file loginRoutes.js for all queries pointed at /login
router.use("/login", loginRoutes);

// this uses the file registerRoutes.js for all queries pointed at /register
router.use("/register", registerRoutes);

// this uses the file addHashtagRoutes.js for all queries pointed at /addHashtag
router.use("/addHashtag", addHashtagRoutes);

// this uses the file addNicheRoutes.js for all queries pointed at /addNiche
router.use("/addNiche", addNicheRoutes);

module.exports = router;
