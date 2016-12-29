
const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.dbUrl, function (err) {
  if (err) {
      console.error('connect to %s error: ', config.dbUrl, err.message);
      process.exit(1);
  }
});
