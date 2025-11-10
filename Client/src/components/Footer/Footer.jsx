import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20 ">
      <img src={assets.logo} alt="" width={150} />

      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        Copyright @Rehman | All rights reserved.
      </p>

      <div className="flex gap-2.5">
        <Link to={'http://reh-portfolio.netlify.app'}>
        <img
         
          src={assets.Portfolio}
          alt=""
          width={25}
          className="hover:scale-105 duration-300 cursor-pointer"
        />
        </Link>
       <Link to={'www.linkedin.com/in/sherry-rehman-2a42aa355'}>
       <img
         src={assets.Linkedin}
          alt=""
          width={25}
          className="hover:scale-105 duration-300 cursor-pointer"/>
       </Link>
       <Link to={'https://www.instagram.com/rehmanaly_14?igsh=aXhueDl0aDhqOGIw'}>
       <img 
        src={assets.Instagram}
        alt="" width={25} 
        className="hover:scale-105 duration-300 cursor-pointer" /></Link>
      </div>
    </div>
  );
}

export default Footer