import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Sensor1Graph = () => {
  const [dataPoints, setDataPoints] = useState<Array<{time: string, value: number}>>([]);
  
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8786");
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "sensor1") {
          const newValue = parseInt(data.value, 10);
          
          setDataPoints(prevPoints => {
            const newPoint = {
              time: new Date().toLocaleTimeString(),
              value: newValue
            };
            
            const updatedPoints = [...prevPoints, newPoint].slice(-20);
            return updatedPoints;
          });
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };
    
    return () => socket.close();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Sensor 1 History</h2>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataPoints}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Sensor1Graph;
