"use client"
import { useEffect, useState } from 'react';

const Sensor3 = () => {
  const [sensor3, setSensor3] = useState<number | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8786");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse incoming message as JSON
        if (data.type === "sensor3") {
          setSensor3(parseInt(data.value, 10));
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div style={{ padding: '37px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {sensor3 !== null ? (
        <p>Sensor 3: <strong>{sensor3}</strong></p>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default Sensor3;
