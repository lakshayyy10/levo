"use client"
import { useEffect, useState } from 'react';

const Sensor2 = () => {
  const [sensor2, setSensor2] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8786");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse incoming message as JSON
        if (data.type === "sensor2") {
          setSensor2(parseInt(data.value, 10));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {sensor2 !== null ? (
        <p>Sensor 2: <strong>{sensor2}</strong></p>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default Sensor2;
