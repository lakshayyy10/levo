import zmq
import serial
import time

# Change serial port to Windows format
arduino = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)  # Change COM3 to match your port
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
    except serial.SerialException as e:
            print(f"Serial port error: {e}")
            time.sleep(1)
            try:
                arduino.close()
                arduino = serial.Serial('/dev/ttyUSB0', 9600, timeout=1)
            except:
                pass
    except KeyboardInterrupt:
        print("\nExiting...")
        break
    except Exception as e:
        print(f"Unexpected error: {e}")
        time.sleep(1)

arduino.close()
socket.close()
context.term()
