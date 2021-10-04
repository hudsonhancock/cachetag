const router = require("express").Router();
const { User, Niche, Collection } = require("../../models");
// this brings in the auth helper function, that confirms if the user is logged in
const withAuth = require("../../utils/auth");

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // This grabs the userData from the user table by sending a fetch GET request to the user API
      const userData = await fetch('/api/users/currentUser', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }); 
      // this will use fetch to send a GET request to the collection API
      // inside the collectionRoutes.js file is a route that catches the GET, and runs a query to respond with all of the niche_id's associated with the user_id
      const collectionData = await fetch("/api/collections/currentUser", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      // serialize the collectionData so that we can work on it
      const collections = collectionData.map((collectionRow) => collectionRow.get({ plain: true}));
      
      // because the queries send back results as an object with the column name: niche_id pairs, we need to strip out the column name from the array
      // use a for each loop to get an array of just the niche_ids
      let nicheIDs = [];
      for (const [column, value] of collections) {
        nicheIDs.push(value);
      };
      console.log(nicheIDs);
      // this will use fetch to send a GET request to the niche API
      // inside the nicheRoutes.js file is a route that grabs the niche_id that is sent, uses it to craft a query
      // the response are the niche names

      // Find the logged in user based on the session ID
      //const userData = await Collection.findAll({
        //where: {
          //user_id: req.session.user_id,
        //}
        // include: [
        //   {
        //     model: User,
        //     // TODO: Figure out how to get the name of niches to be included 
        //   },
        // ]
      

      // Serialize data so the template can read it
      //const niches = nicheData.map((niche) => niche.get({ plain: true }));
      const user = userData.get({ plain: true });

      res.render("profile", {
         ...user,
         ...niches,
         logged_in: true, 
       }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;