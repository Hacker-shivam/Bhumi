import React from 'react'
import Navbar from '../components/Navbar'
import ServiceBanner from '../components/ServiceBanner'
import Footer from '../components/Footer'
import Services from '../components/ServicesCard'
import Weather from './Weather'
import Banner from '../components/Banner'
import Dashboard from '../components/Dashboard'
import Detail from '../components/Detail'

const Home = () => {
  
  return (
    <div className='bg-gradient-to-r from-green-500 to-yellow-400'>
      <Navbar />
      <ServiceBanner />
      <Services />
      <Dashboard />
      <Detail />
      <Footer />
    </div>
  )
}

export default Home
