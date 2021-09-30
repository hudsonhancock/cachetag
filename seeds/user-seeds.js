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

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
