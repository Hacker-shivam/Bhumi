import React from 'react'
import Navbar from '../components/Navbar'
import ServiceBanner from '../components/ServiceBanner'
import Footer from '../components/Footer'
import Services from '../components/Services'
import Weather from './Weather'

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-green-500 to-yellow-400'>
      <Navbar />
      <ServiceBanner />
      <Services />
      <Footer />
    </div>
  )
}

export default Home
