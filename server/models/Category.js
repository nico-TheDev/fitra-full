import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("categories", CategorySchema);

export default Category;
