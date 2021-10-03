const { User } = require("../models");

const userData = [
  {
    username: "theRibbon",
    name: "Mobius One",
    email: "mobius1@isaf.mil",
    password: "battlefieldreaper",
  },
  {
    username: "DemonLord",
    name: "Cypher",
    email: "lucrewarrior@ustio.gov",
    password: "knightsoldiermerc",
  },
  {
    username: "One-Winged Pixy",
    name: "Larry Foulke",
    email: "no.borders@uofd.edu",
    password: "worldwithnoboundaries",
  },
  {
    username: "Edge",
    name: "Kei Nagase",
    email: "Kei.Nagase@OFAF.mil",
    password: "bluedove",
  },
  {
    username: "Blaze",
    name: "Wardog 1",
    email: "wardog@OFAF.mil",
    password: "ghostofrazgriz",
  },
  {
    username: "Southern Cross",
    name: "Gryphus 1",
    email: "gryphus.one@fraaf.mil",
    password: "nemesisx",
  },
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});
/* individualHooks must be set to true inside bulkCreate
  This is because bulkCreate inserts directly into a table, and ignores the hooks that are in the model
  This is a problem here, because bcrypt requires that the passwords be hashed.
  If the individualHooks were not set, then the passwords would be inserted directly into the table and the bcrypt 
  method that compares the password in a table with the password that was entered by a User, would fail*/

module.exports = seedUsers;
