import React from 'react'
import Hero from '../home/Hero'
import Trendings from '../home/Trendings'
import HomeCreators from '../home/HomeCreators'
import Pagination from '../home/Pagination'
function Home() {
  return (
    <div>
      <Hero/>
      <Trendings/>
      <Pagination/>
      <HomeCreators/>
      
    </div>
  )
}

export default Home