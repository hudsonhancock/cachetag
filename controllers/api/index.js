const router = require('express').Router();
const userRoutes = require('./userRoutes');
const nicheRoutes = require("./nicheRoutes");

const collectionRoutes = require("./collectionRoutes");
const hashtagRoutes = require("./hashtagRoutes");
const hashtagnicheRoutes = require("./hashtagnicheRoutes");
const collectiontagRoutes = require("./collectiontagRoutes");

router.use('/users', userRoutes);
router.use('/niches', nicheRoutes);
router.use("/hashtags", hashtagRoutes);
router.use("/user_hashtag", hashtagnicheRoutes); 
router.use("/collectiontags", collectiontagRoutes);

module.exports = router;
