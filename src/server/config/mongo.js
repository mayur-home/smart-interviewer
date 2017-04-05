var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');
// mongoose.connect('mongodb://mayur:mayur@ds019956.mlab.com:19956/smart-interviewer-new');

module.exports = mongoose;
