import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        categoryID: {
            type: String,
            required: true,
        },
        categoryName: {
            type: String,
            required: true,
        },
        categoryIcon: {
            type: String,
            required: true,
        },
        categoryColor: {
            type: String,
            required: true,
        },
        categoryType: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("categories", CategorySchema);

export default Category;
