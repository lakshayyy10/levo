"use client"
import { useEffect, useState } from 'react';

const Sensor5 = () => {
  const [sensor5, setSensor5] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8786");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse incoming message as JSON
        if (data.type === "sensor5") {
          setSensor5(parseInt(data.value, 10));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {sensor5 !== null ? (
        <p>Sensor 5: <strong>{sensor5}</strong></p>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default Sensor5;
