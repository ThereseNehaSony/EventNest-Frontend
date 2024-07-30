import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import EventSlider from '../../components/events/eventSlider'

function Events() {
  
    return (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 p-4 ml-64">
            <EventSlider />
            
          </div>
        </div>
      );
}

export default Events
