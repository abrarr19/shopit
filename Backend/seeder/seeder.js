import mongoose from "mongoose";
import products from "./data.js"
import Product from "../models/Product.js";


const seedProduct= async()=> {

    try {
        await mongoose.connect("mongodb://localhost:27017/ecom")
        await Product.deleteMany();
        console.log("all products deleted")

        await Product.insertMany(products);
        console.log("all products added")
        process.exit()
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

seedProduct();