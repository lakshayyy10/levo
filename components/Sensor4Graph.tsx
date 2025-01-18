import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Sensor4Graph = () => {
  const [dataPoints, setDataPoints] = useState<Array<{time: string, value: number}>>([]);
  
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8786");
    
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "sensor4") {
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
    <div className="bg-gray-1000 rounded-lg shadow-md p-4" style={{width:'800px'}}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">temp</h2>
      </div>
      <div style={{ height: '400px', width: '700px' }}>
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

export default Sensor4Graph;

