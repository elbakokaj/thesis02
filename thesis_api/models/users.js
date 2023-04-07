const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    yearOfEnrollment: {
        type: Date,
        required: false,
    },
    consultationHours: {
        type: String,
        required: false
    },
    course: {
        type: String,
        require: false
    }
})
const Users = mongoose.model('User', userSchema);
module.exports = Users;