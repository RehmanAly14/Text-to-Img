import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import razorpay from "razorpay"
import transactionModel from "../models/transactionModel.js";
 const registerUser = async(req,res)=>{
    try{
        const {name,email,password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({sucess:false, message:'Missing Details'})
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'User already exists with this email',
          });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const userData={
            name,email,password:hashedPassword
        }
        const newUser = new UserModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
              name: user.name,
              email: user.email,
            },
          });

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})

    }
}



 const loginUser = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res
              .status(400)
              .json({
                success: false,
                message: "User not found with this email",
              });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.status(200).json({
              success: true,
              message: "User logged in successfully",
              token,
              user: {
                name: user.name,
              },
            });

        }else{
            return res.status(400).json({success:false, message:'Invalid Email or Password'})
        }
       

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:'Internal Server Error'})
    }
}

const userCredits = async (req,res)=>{
    try{
        const userId = req.userId;

        const user = await UserModel.findById(userId);
        res.status(200).json({ success: true, credits: user.creditBalance, user:{name: user.name} });
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})


    }
}
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.json({ success: false, message: "Invalid Plan" });
    }

    date = Date.now();
    const transactionData = { userId, plan, amount, credits, date };
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100, // paise
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    return res.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return res.json({ success: false, message: error.message });
  }
};


const verifyRazorpay = async(req,res)=>{
  try {
    const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if(orderInfo.status === 'paid'){
      const transaction = await transactionModel.findById(orderInfo.receipt);
      if(transaction.payment){
        return res.json({success:false,message:"Payment failed"})
      }
      const userData = await UserModel.findById(transaction.userId);
     const creditBalance= userData.creditBalance + transactionData.credits;
     await UserModel.findByIdAndUpdate(userData._id,{creditBalance})
     await transactionModel.findByIdAndUpdate(transaction._id,{payment:true})
     res.json({success:true,message:"Credit Added Successfully"})
     
      
    }else{
      res.json({success:false,message:'Payment Failed'})
    }
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}
    


export { registerUser, loginUser ,userCredits,paymentRazorpay,verifyRazorpay};