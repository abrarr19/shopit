import CatchAsyncErrors from "../Middlewares/CatchAsyncErrors.js"
import Product from "../models/Product.js"
import APIFilter from "../utils/apiFilters.js"
import errorHandler from "../utils/errorHandler.js"



export const getProducts=CatchAsyncErrors (async(req,res) =>{

    const apiFilter= new APIFilter(Product, req.query).search().filter()
     const resPerPage=4
    let product= await apiFilter.query
    let filteredProductsCounts=product.length

    apiFilter.pagination(resPerPage)
    product= await apiFilter.query.clone()

    

    res.status(200).json({
        resPerPage,
        filteredProductsCounts,
        message: "all products",
        product,
    })
})

//create products api/v1/admin/products
export const newProduct=async(req,res) =>{

    const product= await Product.create(req.body)

    res.status(200).json({

        product,
    })
}


//get product deatils of a single product ap1/v1/products/id

export const getProductdetails=CatchAsyncErrors (async(req,res,next) =>{

    const product= await Product.findById(req?.params?.id)

    if(!product){

        return next(new errorHandler("product not found",400))
    }



    res.status(200).json({

        message: "product found is",
        product,
    })
})


//update product deatils of a single product ap1/v1/products/id
export const updateProduct=CatchAsyncErrors(async(req,res) =>{

    let product= await Product.findById(req?.params?.id)

    if(!product){
       res.status(404).json({
        error:"no products found ",
       })
    }
     

    product = await Product.findByIdAndUpdate(req?.params?.id,req.body,{new:true})
   
    res.status(200).json({

        message: "product updated",
        product,
    })
})

//delete product deatils of a single product ap1/v1/products/id
export const deleteProduct=CatchAsyncErrors(async(req,res,next) =>{

    const product= await Product.findById(req?.params?.id)

    if(!product){
      return next(new errorHandler("product not found",404))
    }
     

  await product.deleteOne();

   
    res.status(200).json({

        message: "product deleted",
        product,
    })
}
)