const { default: mongoose, model } = require("mongoose");

const {Schema}= mongoose

const placeSchema = new Schema({
    owner:{type:Schema.Types.ObjectId,ref:'User'},
    title : String,
    address : String,
    photos :[String],
    description: String,
    perks:[String],
    extraInfo: String,
    chenkIn:Number,
    chenkOut:Number,
    maxGuests:Number

});

const placeModel = mongoose.model('Place' , placeSchema)

module.exports = placeModel