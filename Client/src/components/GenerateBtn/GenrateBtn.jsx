import React from 'react';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';
import {useAppContext} from '../../context/userAuth'
import {useNavigate} from 'react-router-dom';

const GenrateBtn = () => {
  const navigate = useNavigate();

   const {user,setShowLogin} = useAppContext();
  
    const onClickHandler =()=>{
      if(user){
        navigate('/result')
      }else{
        setShowLogin(true)
      
      }
    }
  return (
    <motion.div
      className="pb-16 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.h1
        className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        See the magic. Try now
      </motion.h1>

      <motion.button
        onClick={onClickHandler}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Generate Images
        <img src={assets.star_group} alt="" className="h-6" />
      </motion.button>
    </motion.div>
  );
};

export default GenrateBtn;
