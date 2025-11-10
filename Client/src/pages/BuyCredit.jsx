import React from 'react'
import { assets, plans } from '../assets/assets.js'
import { useAppContext } from '../context/userAuth.jsx'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
const BuyCredit = () => {
  const { user,backendUrl,loadCreditData,token,setShowLogin } = useAppContext();
  const navigate = useNavigate();

  const initPay = async (order)=>{
    const options ={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits payment', 
      order_id: order.id,
      receipt:order.receipt,
      handler: async(response)=>{
        try {
          const {data} = await axios.post(backendUrl + '/api/user/verify-razor',{response},{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          if(data.success){
            loadCreditData();
            navigate('/');
            toast.success("Credits purchased successfully");
          }
          
        } catch (error) {
          toast.error(error.message)
          
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();

  }


  const payment =async(planId)=>{
    try {
      if(!user){
        setShowLogin(true);
      }
     const {data}= await axios.post(backendUrl + '/api/user/pay-razor',{planId},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(data.success){
        initPay(data.order);
      }
      
    } catch (error) {
      toast.error(error.message);
      
    }
  }

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>

      <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">
        Choose the Plan
      </h1>

      {user && (
        <p className="mb-6 text-gray-600 text-sm">
          Logged in as: <span className="font-medium">{user.name}</span>
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((items, idx) => (
          <motion.div
            key={idx}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-800 hover:scale-105 transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 mb-1 font-semibold">{items.id}</p>
            <p className="text-sm">{items.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium"> ${items.price} </span> /{" "}
              {items.credits} credits
            </p>

            <button
            onClick={()=>payment(items.id)}
             className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52">
              {user ? "Buy Now" : "Sign In to Buy"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BuyCredit
