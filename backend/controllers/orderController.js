
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');

// Create order  - /api/v1/order
exports.createOrder = async (req, res, next) => {
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0));
    console.log(amount, 'amount');
    const status = "pending";
    
    const order = await orderModel.create({ cartItems, amount, status });
   console.log(cartItems)

    // Updating product stock and sold count
    cartItems.forEach(async (item)=>{
        const product = await productModel.findById(item.product._id);
        product.stock = product.stock - item.qty;
        await product.save();
    });
   
    for (const item of cartItems){
        await productModel.findByIdAndUpdate(item.product._id,{
            $inc:{
                stock:-item.qty,
                sold: item.qty
            }
        })
    }
    res.json({
        sucess: true,
        order: "order success"
    })
}