import React from 'react'
import Header from '../components/Header/Header'
import Steps from '../components/Steps/Steps'
import Description from '../components/Description/Description'
import Testimmonials from '../components/Testimonials/Testimmonials'
import GenrateBtn from '../components/GenerateBtn/GenrateBtn'

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimmonials/>
        <GenrateBtn/>
    </div>
  )
}

export default Home