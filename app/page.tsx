'use client';
import React from 'react';
import Spectrograph from '../components/Spectrograph';
import Camera1 from '../components/Cam1';
import Camera2 from '../components/Cam2';
import Camera3 from '../components/Cam3';
import Camera4 from '../components/Cam4';
import Sensor1 from '../components/Sensor1';
import Sensor2 from '../components/Sensor2';
import Sensor3 from '../components/Sensor3';
import Sensor4 from '../components/Sensor4';
import Sensor5 from '../components/Sensor5';
import Sensor1Graph from '../components/Sensor1Graph';
import Sensor2Graph from '../components/Sensor2Graph';
import Sensor3Graph from '../components/Sensor3Graph';
import Sensor4Graph from '../components/Sensor4Graph';
import Sensor5Graph from '../components/Sensor5Graph';

const DashboardPage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-between p-4">
      {/* Life Sciences Section */}
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="relative">
          <Camera1 />
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            Cam 1
          </span>
        </div>
        <div className="relative">
          <Camera2 />
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            Cam 2
          </span>
        </div>
        <div className="relative">
          <Camera3 />
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            Cam 3
          </span>
        </div>
        <div className="relative">
          <Camera4 />
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
            Cam 4
          </span>
        </div>
      </div>
      
      {/* Sensor and Spectroscopy Section */}
      <div className="grid grid-cols-2 gap-4 w-full mt-8">
        {/* Sensors */}
        <div className="bg-gray-1000 rounded p-4">
          <h2 className="text-lg font-bold mb-4">Sensors</h2>
          <Sensor1 />
          <Sensor2 />
          <Sensor3 />
          <Sensor4 />
          {/*<Sensor5 />*/}
        </div>
        {/* Spectroscopy */}
        <div className="bg-gray-1000 rounded p-4">
          <h2 className="text-lg font-bold mb-4">Spectroscopy</h2>
          <Spectrograph />
        </div>
      </div>

      {/* Sensor Graphs Section */}
      <div className="w-full mt-8">
        <div className="flex space-x-4">
          <Sensor1Graph />
          <Sensor2Graph />
        </div>
        <div className="flex space-x-4">
          <Sensor3Graph />
          <Sensor4Graph />
        </div>
        <div className="mt-4">
          {/*<Sensor5Graph />*/}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
