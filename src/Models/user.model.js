const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        birthdate: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        post_code: {
            type: Number,
            required: true,
        },
        preferred_store: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        member: {
            type: Boolean,
            default: false,
        },
        profilePic: {
            type: String,
            required: false,
            default: "https://i.postimg.cc/MTw0t80t/pngegg-1.png",
        },
        confirmed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
) 

module.exports = mongoose.model("user", userSchema);