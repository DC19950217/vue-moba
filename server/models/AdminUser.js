const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String,
        select: false,
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
    identity: {
        type: String,
        // required: true
    },
    loginDate: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    },


})
module.exports = mongoose.model("AdminUser", schema)