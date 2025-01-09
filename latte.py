import serial
import zmq
import time

arduino = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:5556") 

print("Arduino data")

while True:
    try:
        if arduino.in_waiting:
            line = arduino.readline().decode('utf-8').strip()
            if line:
                try:
                    socket.send_string(line)
                    print(f"Published: {line}")
                    
                except Exception as e:
                    print(f"Error sending data: {e}")
        time.sleep(0.01)
    except Exception as e:
        print(f"Unexpected error: {e}")
        time.sleep(1)
    except KeyboardInterrupt:
        print("\nExiting...")
        break


arduino.close()
socket.close()
context.term()
