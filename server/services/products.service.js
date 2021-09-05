const { Product } = require('../models/product');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status');
//const { productsService } = require('.');
const mongoose = require('mongoose');
const addProduct = async(body) => {
    try{
        const product = new Product({
            ...body
        })
        await product.save(); //save and return to controller
        return product;
    }catch(error){
        throw(error)
    }

}


const getProductById = async(_id) => {
    try{
        const product = await Product.findById(_id);
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product not found');
        return product;
    }catch(error){
        throw(error)
    }

}

//not necessary
const updateProductById = async(_id) => {
    try{
        const product = await Product.findOneAndUpdate(
            {_id},
            {"$set": body},
            {new : true});
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product not found');
        return product;
    }catch(error){
        throw(error)
    }

}

const deleteProductById = async(_id) => {
    try{
        const product = await Product.findByIdAndRemove(_id);
        if(!product) throw new ApiError(httpStatus.NOT_FOUND,'Product not found');
        return product;
    }catch(error){
        throw(error)
    }

}

const allProducts = async(req) => {
    try {
        const products = await Product
        .find({})
        .sort([
            [req.query.sortBy,req.query.order]
        ])
        //example = key:sortBy value:price  

        return products
    } catch(error) {
        throw error
    }
}

const paginateProducts = async(req) => {
    try {


        let aggQueryArray = [];


        //push new obj, match with sth, provide what we're searching for //search according to title
        if(req.body.keywords && req.body.keywords !=''){
            const re = new RegExp(`${req.body.keywords}`,'gi');  //not case sensitive
            aggQueryArray.push({
                $match:{ title:{ $regex:re }}
            });
        }


        if(req.body.description && req.body.description != '' ){
            const re = new RegExp(`${req.body.description}`, 'gi');
            aggQueryArray.push({
                $match: { description: { $regex: re }}
            });
        }

        if(req.body.price && req.body.price.length > 0){
            aggQueryArray.push({
                $match:{ price: { $in: req.body.price }}
            });
        }

         //// add populate
         aggQueryArray.push(
            { $lookup:
                {
                    from: "title",
                    localField: "",
                    foreignField:"_id",
                    as: "title"
                }
            },
            { $unwind: '$title'}
        )    

        let aggQuery = Product.aggregate(aggQueryArray);
        const options = {
            page:req.body.page,
            limit:9,
            sort:{price:'desc'}
        };
        const products = await Product.aggregatePaginate(aggQuery,options)
            return products;
        } catch(error) {
            throw error
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    allProducts,
    paginateProducts
}