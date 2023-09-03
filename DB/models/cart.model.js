import mongoose, {
    Types
} from "mongoose";

const cartSchema = mongoose.Schema({
    // name: String,
    // quantity: Number,
    // client: Number,
    // {
    //     type :mongoose.SchemaTypes.ObjectId,
    //     ref:"user"

    // }
    user: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "user"
    },
    products: [{
        product: {
            type: Types.ObjectId,
            require: true,
            ref: "product"
        },
        qty: {
            type: Number,
            default: 1
        },
        totalAmmount: {
            type: Number
        }
    }],
    totalAmmount: {
        type: Number
    }

})

cartSchema.pre("findOne", function () {
    this.populate([{
        path: "user",
        select:"name email -_id"
    }])
})

export const cartModel = mongoose.model('cart', cartSchema)