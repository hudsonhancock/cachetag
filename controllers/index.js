const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

const loginRoutes = require("./views/loginRoutes");
const profileRoutes = require("./views/profileRoutes");

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// this uses the file profileRoutes.js to handle queries pointed at /profile
router.use("/profile", profileRoutes);

// this uses the file loginRoutes.js for all queries pointed at /login
router.use("/login", loginRoutes);

module.exports = router;
