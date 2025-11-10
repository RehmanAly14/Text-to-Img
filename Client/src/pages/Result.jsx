import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import {useAppContext} from '../context/userAuth'
const Result = () => {
  const [img, setImg] = useState(assets.sample_img_1)
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const {generateImg} = useAppContext()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if(input){
      const image = await generateImg(input)
      if(image){
        setIsImgLoaded(true)
        setImg(image)
      }
    }
    setLoading(false)
    setInput("");
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[80vh] justify-center items-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='relative'>
          <img src={img} alt="" className='max-w-sm rounded ' />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>

        <p className={!loading ? 'hidden' : ''}>Loading.....</p>
      </motion.div>

      {!isImgLoaded &&
        <motion.div
          className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input onChange={e => setInput(e.target.value)}
            value={input} type="text" placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color' />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full '>Generate</button>
        </motion.div>
      }

      {isImgLoaded &&
        <motion.div
          className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <p className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer' onClick={() => { setIsImgLoaded(false) }}>Generate Another</p>
          <a className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer' href={img} download>Download</a>
        </motion.div>
      }
    </form>
  )
}

export default Result
