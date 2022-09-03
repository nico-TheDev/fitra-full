const { model, Schema } = require("mongoose");

const CategorySchema = new Schema(
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

const Category = model("categories", CategorySchema);

module.exports = Category;