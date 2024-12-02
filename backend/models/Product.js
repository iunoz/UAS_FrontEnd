const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type:String, required:true , unique:true},
    price: { type:Number, required:true },
    category: { type:String, required:true },
    imageURL: { type:String, required:true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;