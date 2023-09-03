import express from "express"
import * as cartsController from './carts.controller.js'
import { authMiddleware } from "../../middleware/authentication.js";

const cartRouter = express.Router()

cartRouter.post('/addCart', authMiddleware,cartsController.addToCar)
// cartRouter.post('/updateItem',cartsController.updateCart)
cartRouter.get('/cart/:userID',cartsController.showcart)
cartRouter.post('/removeCart',authMiddleware,cartsController.removeCart)
// cartRouter.post('/cancelCart/:userID',cartsController.removeCart)





export default cartRouter

 