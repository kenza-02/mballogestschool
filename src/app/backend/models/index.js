const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.classes = require("./classe.model.js")(mongoose);
db.inscriptions = require("./inscription.model.js")(mongoose);

module.exports = db;
