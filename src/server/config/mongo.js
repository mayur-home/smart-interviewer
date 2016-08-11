var mongoose = require('mongoose');

//mongoose.connect('mongodb://172.24.132.139:27017/test');
mongoose.connect('mongodb://localhost:27017/test');

module.exports = mongoose;
