const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            lowercase: true,
            required: true,
        },
        lastName: {
            type: String,
            lowercase: true,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password should be 8 characters or more."],
        },
        userImg: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const User = model("user", UserSchema);

module.exports = User;
