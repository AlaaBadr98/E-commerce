import {
    cartModel
} from "../../../DB/models/cart.model.js"

import jwt from "jsonwebtoken"

const showcart = async (req, res) => {
    const {
        userID
    } = req.params
    let cartItem = await cartModel.findOne({
        user: userID
    })
    if (cartItem) {
        res.json({
            message: "success",
            cartItem
        })
    } else {
        res.json({
            message: "No cart valid"
        })
    }
}

const addToCar = async (req, res) => {
    const {productId, qty} = req.body
    const {_id} = req.user
    const cart = await cartModel.findOne({user: _id})

    let index
    cart.products.forEach((el, i) => {
        if (el.product.toHexString() === productId) {
            index = i
        }
    });
    console.log(index);
    
    if (index || index == 0) {
        if (qty > 0) {
            cart.products[index].qty = qty
        } else if (qty == 0){ 
         cart.products.splice(index, 1)  // to delete the card 
        }else {
            cart.products[index].qty++
        }
    } else {
        if (qty) {
            cart.products.push({
                product: productId,
                qty
            })
        }else {
            cart.products.push({
                product: productId
            })
        }
    }
    await cart.save()
    // await cartModel.insertMany({name , quantity , client})
    res.json({
        message: "success",
        cart
    })
}

const removeCart = async (req, res) => {
    const {_id} = req.user
    const cart = await cartModel.findOne({user: _id})
    console.log(cart.products);
    cart.products=[];
    cart.save()
    
    res.json({message: "success",cart})
}






export {
    showcart,
    addToCar,
    removeCart

}