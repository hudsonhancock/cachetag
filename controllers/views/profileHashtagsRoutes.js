const router = require("express").Router();
const { User, Niche, Collection, HashTagNiche, HashTag } = require("../../models");
const withAuth = require("../../utils/auth");

//displays the User's Hashtags Page for the required niche
router.get('/:nicheID', withAuth, async (req, res) => {
    try {
      // get the niche_id through collection including user where user_id matches
      /* const nicheData = await Niche.findAll( {
        include: [{ 
          model: User, 
          where: {user_id: req.session.user_id},
          attributes: [],
          through: {attributes: ["collection_id"]}, }]
      }); */
      // using the nicheID, find all matches from the hashtag_niche table, and get the hashtags
      const hashtagData = await HashTag.findAll({
        include: [{
          model: Niche,
          where: {niche_id: req.params.nicheID},
          attributes: [],
          through: {attributes:[]}
        }]
      });
      const hashtags = hashtagData.map((hashCol) => hashCol.get({ plain: true }));
      //console.log("This is raw hashtagData: " + hashtagData);
      //console.log.JSON.stringify(hashtagData);
      //const hashtags = hashtagData.get({ plain: true });
      //console.log(hashtags);
      // serialize the nicheData so that it can be passed to the handlebars template
      //console.log("This is nicheID: " + req.params.nicheID);
      const nicheData = await Niche.findByPk(req.params.nicheID);
      const niche = nicheData.get({ plain: true });
      console.log("This is niche data: " + niche);
      //console.log(nicheData);
      res.render('savedHashtags', {
        ...niche,
        hashtags
      }); 
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;