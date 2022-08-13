const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://artforyourheart:Samison12@cluster0.qtthm.mongodb.net/artforyourheart?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
// mongodb+srv://artforyourheart:Samison12@cluster0.qtthm.mongodb.net/artforyourheart?retryWrites=true&w=majority