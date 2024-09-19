const mongoose = require("mongoose");

const LimitSchema = new mongoose.Schema({
    total : {
        type: String,
        default : 400,
        required : true

    },
    doc : {
        type: String,
        default : 100,
        required : true
    },
    img : {
        type: String,
        default : 100,
        required : true
    },
    other : {
        type: String,
        default : 100,
        required : true
    },
    video : {
        type: String,
        default : 100,
        required : true
    },

});

const Limit = mongoose.model("Limitation", LimitSchema);

module.exports = Limit;
