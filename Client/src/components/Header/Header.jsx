import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion" 
import {useAppContext} from '../../context/userAuth'

const Header = () => {
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
      className="felx flex-column justify-center text-center my-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </motion.div>

      <motion.h1
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] text-center mx-auto mt-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 80 }}
        viewport={{ once: true }}
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds.
      </motion.h1>

      <motion.p
        className="text-center mt-5 mx-auto max-w-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
      >
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>

      <motion.button
        onClick={onClickHandler}
        className="bg-black mx-auto sm:text-lg w-auto text-white mt-8 px-12 py-2.5 rounded-full flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
      >
        Generate images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>

      <motion.div
        className="flex flex-wrap justify-center mt-16 gap-3"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 1,
              staggerChildren: 0.15,
            },
          },
        }}
        viewport={{ once: true }}
      >
        {Array(6)
          .fill("")
          .map((item, index) => (
            <motion.img
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              key={index}
              width={70}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            />
          ))}
      </motion.div>

      <motion.p
        className="mt-2 text-neutral-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        viewport={{ once: true }}
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
}

export default Header;
