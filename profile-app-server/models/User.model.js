const { Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {
         type: String,
         required: true,
         unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    campus: {
        type: String,
        enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "México", "Sao Paulo", "Lisbon", "Remote"]
    },
    course: {
        type: String,
        enum: ["Web Dev", "UX/UI", "Data Analytics","Cyber Security"]
    },
    image: {
        type: String,
    }
})

module.exports = model("User", UserSchema);