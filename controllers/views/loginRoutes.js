/* this route is both a test of making homeRoutes.js more modular, and the route for rendering the login page
*/
const router = require("express").Router();

router.get("/", (req, res) => {
	// If the user is already logged in, redirect the request to another route
	if (req.session.logged_in) {
		res.redirect("/profile");
		return;
	}

	res.render("login");
});

module.exports = router;