var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name cant be empty'
    },
    email: {
        type:String,
        required: 'Email cant be empty'
    },
    password: {
        type: String,
        required: 'password cant be empty'
    }
});
module.exports = mongoose.model('USER', UserSchema);
