import React from 'react';
// import banner from '../../assets/1649082499105.png';
// import img1 from'../../assets/event1.jpeg'
import { Link } from 'react-router-dom';


const banner ='/bg-1.jpg' ;
const img1 = '/bg-1.jpg'; 

interface CardProps {
  image: string;
  name: string;
}

const Card: React.FC<CardProps> = ({ image, name }) => {
  return (
    <div className="flex-1 p-4">
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="p-6 flex flex-col items-center"> 
        <h2 className="text-lg font-bold text-center">{name}</h2>
      </div>
    </div>
    </div>
  );
};

interface ThreeCardComponentProps {
    img1: string;
}

const ThreeCardComponent: React.FC<ThreeCardComponentProps> = ({ img1 }) => {
  return (
    <div className="flex justify-center mx-auto space-x-8 max-w-screen-lg">
      <Card image={img1} name="Music" />
      <Card image={img1} name="Performances" />
      <Card image={img1} name="Experiences" />
      
    </div>
  );
};

const EventHome: React.FC = () => {
  return (
    <div className="w-full">
      <img src={banner} className="w-full max-h-96 object-cover" alt="Banner" />
      <div className="text-center mt-4">
        <p className="text-4xl text-black-800 font-semibold">What can you host?</p>
        <br/>
        <p className="text-lg text-gray-800 mx-auto max-w-lg">"As the premier platform for event excellence,
          We provides comprehensive solutions from registration to event completion. 
          Discover the endless possibilities of what you can host with us."</p>
      </div>
      <br/>
      <ThreeCardComponent img1={img1} />
      <ThreeCardComponent img1={img1} />

      <div className="flex justify-center mt-8">
      <Link to="/host/login" className="block py-2 px-4 hover:text-gray-400">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >
          Add Your Show
        </button> </Link>
      </div>
      <br />
      <br />
      <div className="flex justify-center mt-8 text-4xl font-bold font-serif ">Bringing Your Events to </div>
      <div className="flex justify-center mt-8 text-4xl font-bold  font-serif">Live </div>
      <br />
      <br />
      <br />
    </div>
    
  );
};

export default EventHome
