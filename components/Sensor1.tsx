"use client"
import { useEffect, useState } from 'react';

const Sensor1 = () => {
  const [sensor1, setSensor1] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8786");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse incoming message as JSON
        if (data.type === "sensor1") {
          setSensor1(parseInt(data.value, 10));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: '37px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {sensor1 !== null ? (
        <p>Sensor 1: <strong>{sensor1}</strong></p>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default Sensor1;
