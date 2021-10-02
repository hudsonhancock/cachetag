const router = require('express').Router();
// const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const rp = require('request-promise');
// const cheerio = require('cheerio');
 

// + Keyword that will be used to find tags that are included on posts with the tag you set as keyword 
let keyWord = "Health & Fitness";

// + The instagram URL to scrape hashtags from with Regex
// let URL = `https://www.instagram.com/explore/tags/${keyWord}/`

// + Array holding hardcoded version of the top tags for the main page to display when a user visits our website
const topHashtags = ["Health", "Fitness", "Beauty", "Fashion", "Lifestyle", "Business", "Animals", "Food", "Traveling", "Parenting", "DIY"];

// + The AJAX URL of the hashtag source that we use to gather related hashtags
let URL = `https://www.tagsfinder.com/en-us/ajax/?hashtag=${keyWord}&limit=10&country=us&custom=&type=live`

// + Uses request-promise to fetch the HTML from the instagram website
rp(URL)
    .then((html) => {

        // + Call the scrapeHashtags function, passing in the HTML we just scraped. scrapeHashtags(html) will find all of the hashtags on the instagram page, then add them to a matches array and return that
        let hashtags = scrapeHashtags(html);

        // + Remove all of the duplicates from the scraped hashtags returned from scrapeHashtags(html)
        hashtags = removeDuplicates(hashtags);
        hashtags = hashtags.map(ele => "#" + ele);
        // let regExVar = new RegExp(keyWord);
        // filteredTags = hashtags.filter(str => str.match(keyWord));
        console.log(hashtags);
        return hashtags;
      })
    .catch((err) => {
        console.log(err);
    });
 
// + Call the scrapeHashtags function to find all of the hashtags on the instagram website. 
const scrapeHashtags = (html) => {  
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;
 
    while ((match = regex.exec(html))) {
        matches.push(match[1]);
    }
 
    return matches;
}
 
const removeDuplicates = (arr) => {
    let newArr = [];
 
    arr.map(ele => {
        if (newArr.indexOf(ele) == -1){
            newArr.push(ele)
        }
    })
     
    return newArr;
}
    // Get all projects and JOIN with user data
    // const projectData = await Project.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage'
    // , { 
    //   projects, 
    //   logged_in: req.session.logged_in 
    // }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    // const projectData = await Project.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });

    // const project = projectData.get({ plain: true });

    res.render('project' 
    // ,{
    //   ...project,
    //   logged_in: req.session.logged_in
    // }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    // const userData = await User.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Project }],
    // });

    const user = userData.get({ plain: true });

    res.render('profile'
    // , {
    //   ...user,
    //   logged_in: true
    // }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
