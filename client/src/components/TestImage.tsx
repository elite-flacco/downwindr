import React from 'react';
import joinTheRideImage from '@/assets/join-the-ride.png';

export default function TestImage() {
  return (
    <div className="p-4 border rounded">
      <h3>Testing Image Loading</h3>
      <div className="mt-4">
        <p>Direct Image Tag:</p>
        <img 
          src={joinTheRideImage} 
          alt="Join the Ride" 
          className="w-64 h-32 object-cover border"
        />
      </div>
      
      <div className="mt-4">
        <p>Div with Background Image:</p>
        <div 
          className="w-64 h-32 border"
          style={{
            backgroundImage: `url(${joinTheRideImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>
      
      <div className="mt-4">
        <p>Image URL Value: {joinTheRideImage}</p>
      </div>
    </div>
  );
}