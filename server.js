const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const rp = require('request-promise');
const cheerio = require('cheerio');
 

// + Keyword that will be used to find tags that are included on posts with the tag you set as keyword 
let keyWord = "gold";


// + The instagram URL to scrape hashtags from
let URL = `https://www.instagram.com/explore/tags/${keyWord}/`


// + Uses request-promise to fetch the HTML from the instagram website
rp(URL)
    .then((html) => {

        // + Call the scrapeHashtags function, passing in the HTML we just scraped. scrapeHashtags(html) will find all of the hashtags on the instagram page, then add them to a matches array and return that
        let hashtags = scrapeHashtags(html);

        // + Remove all of the duplicates from the scraped hashtags returned from scrapeHashtags(html)
        hashtags = removeDuplicates(hashtags);
        hashtags = hashtags.map(ele => "#" + ele);
        // let regExVar = new RegExp(keyWord);
        filteredTags = hashtags.filter(str => str.match(keyWord));
        console.log(hashtags);
        console.log(filteredTags);
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


app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
