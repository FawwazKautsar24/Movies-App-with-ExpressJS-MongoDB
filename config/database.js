const mongoose = require('mongoose');
// const mongoDB = 'mongodb://localhost/First_App';
const mongoDB = 'mongodb+srv://FirstAppDB2:IniPassNya@firstappdb.iikaan2.mongodb.net/?retryWrites=true&w=majority';

mongoose
    .connect(
        mongoDB,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB Connected!"));

mongoose.Promise = global.Promise;

module.exports = mongoose;
