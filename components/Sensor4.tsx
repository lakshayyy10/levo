"use client"
import { useEffect, useState } from 'react';
const Sensor4 = () => {
  const [sensor4, setSensor4] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8786");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse incoming message as JSON
        if (data.type === "sensor4") {
          setSensor4(parseInt(data.value, 10));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: '30px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {sensor4 !== null ? (
        <p>Sensor 4: <strong>{sensor4}</strong></p>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default Sensor4;
