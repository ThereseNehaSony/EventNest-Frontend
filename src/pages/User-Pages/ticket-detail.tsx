import React from 'react';
import TicketDetail from './TicketDetails';

const TicketPage: React.FC = () => {
  return (
    <div>
      <TicketDetail
        eventImage="/images/event.jpg" // Replace with your event image path
        eventName="Winter Gala"
        eventDate="December 20, 2023"
        eventTime="8:00 PM"
        location="Ballroom, NY"
        ticketType="VIP"
        amountPaid="$150"
        cancellationPolicy="Cancellation is allowed 24 hours before the event. A full refund will be provided."
      />
    </div>
  );
};

export default TicketPage;
