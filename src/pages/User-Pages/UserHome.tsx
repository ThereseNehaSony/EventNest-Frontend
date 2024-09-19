import React from 'react'
import HeroSection from '../../components/Home/HeroSection'
import EventSlider from '../../components/events/eventSlider'
//import EventSearchFilter from '../../components/Home/Filter'
function UserHome() {
  return (
    <div>
      <HeroSection />
      {/* <EventSearchFilter /> */}
      <EventSlider />
    </div>
  )
}

export default UserHome
