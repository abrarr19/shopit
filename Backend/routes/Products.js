import express from "express"
import { deleteProduct, getProductdetails, getProducts, newProduct, updateProduct } from "../Controllers/ProductControllers.js"
import { authorizedRole, isAuthenticatedUser } from "../Middlewares/auth.js";


const router =express.Router()

router.route("/products").get(isAuthenticatedUser,getProducts);
router.route("/admin/products").post(newProduct)
router.route("/products/:id").get(getProductdetails)
router.route("/products/:id").put(updateProduct)
router.route("/products/:id").delete(deleteProduct)


 export default router;

