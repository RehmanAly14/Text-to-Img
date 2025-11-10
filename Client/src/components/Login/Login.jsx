import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/userAuth';
import { motion } from 'framer-motion';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login');
  const { setShowLogin,backendUrl,setToken,setUser} = useAppContext();

  const [name,setName]=useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try {
      if(state ==='Login'){
       const {data} = await axios.post(backendUrl + '/api/user/login',{
          email,password
        })
        if(data.success){
          setToken(data.token)
          setUser(data.user);
          localStorage.setItem('token',data.token)
          setShowLogin(false)
          toast.success('User Logged in Successfully');
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl + '/api/user/register',{
          name,
          email,password
        })
        if(data.success){
          setToken(data.token)
          setUser(data.user);
          localStorage.setItem('token',data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop:blur-sm bg-black/30 flex justify-center items-center"
    >
      <motion.form
       onSubmit={onSubmitHandler}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-10 rounded-xl text-slate-500 w-[90%] max-w-md"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state === "Login" ? "Login" : "Sign Up"}
        </h1>
        <p className="text-sm text-center">
          Welcome back! Please sign in to continue
        </p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
            <img width={30} src={assets.profile_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
              className="outline-none"
            />
          </div>
        )}

        <div className="border  px-6 py-2 flex items-center gap-2 mt-4 rounded-full">
          <img src={assets.email_icon} alt="" />
          <input
             onChange={(e) => setEmail(e.target.value)}
             value={email}
            type="email"
            placeholder="Enter email"
            required
            className="outline-none"
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 mt-5 rounded-full">
          <img src={assets.lock_icon} alt="" />
          <input
             onChange={(e) => setPassword(e.target.value)}
             value={password}
            type="password"
            placeholder="Password"
            required
            className="outline-none"
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forget Password
        </p>

        <button className="rounded-full w-full text-white py-2 bg-blue-600">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don&apos;t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("SignUp")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </motion.div>
  );
};

export default Login;
