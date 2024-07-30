import React from 'react';

interface StatsBoxProps {
  title: string;
  value: number;
  bgColor: string;
}

const StatsBox: React.FC<StatsBoxProps> = ({ title, value, bgColor }) => {
  return (
    <div className={`p-5 rounded-lg shadow-md text-white ${bgColor} max-w-xs`}>
      <h2 className=" text-center text-xl font-semibold">{title}</h2>
      <p className=" text-center text-2xl mt-2">{value}</p>
    </div>
  );
};

export default StatsBox;
