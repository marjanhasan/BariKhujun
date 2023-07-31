const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    bedrooms: Number,
    bathrooms: Number,
    size: String,
    picture: String,
    available: Boolean,
    rent: Number,
    phone: Number,
    description: String,
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const House = mongoose.model("Houses", houseSchema);

module.exports = House;