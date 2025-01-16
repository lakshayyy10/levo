import zmq
import time
import random
import cv2
import base64
import numpy as np
from io import BytesIO
import matplotlib.pyplot as plt
import csv
from datetime import datetime
context = zmq.Context()
socket = context.socket(zmq.PUB)
socket.bind("tcp://*:5555")

sub_socket = context.socket(zmq.SUB)
sub_socket.connect("tcp://127.0.0.1:5556")
sub_socket.setsockopt_string(zmq.SUBSCRIBE, "")

#path = "1.png"
#frame10 = cv2.imread(path)
camera = cv2.VideoCapture(0)
#camera1_url = "http://192.168.70.9:PORT/cam1"
#cam1 = cv2.videoCapture(camera1_url)
#cam1 = cv2.VideoCapture(2)
#camera2_url = "http://192.168.70.9:PORT/cam2"
#cam2 = cv2.videoCapture(camera2_url)

#camera3_url = "http://192.168.70.9:PORT/cam3"
#cam3 = cv2.videoCapture(camera3_url)

#camera4_url = "http://192.168.70.9:PORT/cam4"
#cam4 = cv2.videoCapture(camera4_url)

'''
 def genspec(frame):
    try:
        plt.close('all')
        grayscale = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        spectrum = np.sum(grayscale, axis=0)
        spectrum = spectrum / np.max(spectrum)
        plt.figure(figsize=(10, 5), dpi=100)
        plt.plot(spectrum, color="cyan", linewidth=2)
        plt.title("Spectroscopy Data", fontsize=15)
        plt.xlabel("Pixel Column", fontsize=12)
        plt.ylabel("Normalized Intensity", fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.tight_layout()
        buf = BytesIO()
        plt.savefig(buf, format="png", bbox_inches='tight')
        buf.seek(0)
        plt.close()
        img_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")
        return img_base64
    except Exception as e:
        print(f"Error generating spectroscopy image: {e}")
        return None
'''
csv_filename = f"sensor_data_{datetime.now().strftime('%H%M%S')}.csv"
with open(csv_filename, 'w', newline='') as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(['Timestamp', 'Sensor1', 'Sensor2', 'Sensor3', 'Sensor4', 'Sensor5'])

pullsensor = zmq.Poller()
pullsensor.register(sub_socket, zmq.POLLIN)

while True:
    try:
        # Camera frames
        ret, frame1 = camera.read()
        if ret:
            _, buffer = cv2.imencode('.jpg', frame1)
            frame1_encoded = base64.b64encode(buffer).decode('utf-8')
            socket.send_string(f"camera1 {frame1_encoded}")

        #ret, frame2 = cam1.read()
        if ret:
            _, buffer = cv2.imencode('.jpg', frame1)
            frame2_encoded = base64.b64encode(buffer).decode('utf-8')
            socket.send_string(f"camera2 {frame2_encoded}")

        #ret, frame3 = camera.read()
        if ret:
            _, buffer = cv2.imencode('.jpg', frame1)
            frame3_encoded = base64.b64encode(buffer).decode('utf-8')
            socket.send_string(f"camera3 {frame3_encoded}")

        #ret, frame4 = camera.read()
        if ret:
            _, buffer = cv2.imencode('.jpg', frame1)
            frame4_encoded = base64.b64encode(buffer).decode('utf-8')
            socket.send_string(f"camera4 {frame4_encoded}")

        """
        sensor1 = random.randint(0, 60)
        print(f"Publishing sensor1: {sensor1}")
        socket.send_string(f"sensor1 {sensor1}")

        sensor2 = random.randint(0, 60)
        print(f"Publishing sensor2: {sensor2}")
        socket.send_string(f"sensor2 {sensor2}")

        sensor3 = random.randint(0, 60)
        print(f"Publishing sensor3: {sensor3}")
        socket.send_string(f"sensor3 {sensor3}")

        sensor4 = random.randint(0, 60)
        print(f"Publishing sensor4: {sensor4}")
        socket.send_string(f"sensor4 {sensor4}")

        sensor5 = random.randint(0, 60)
        print(f"Publishing sensor5: {sensor5}")
        socket.send_string(f"sensor5 {sensor5}")

        sensor6 = random.randint(0, 60)
        print(f"Publishing sensor6: {sensor6}")
        socket.send_string(f"sensor5 {sensor6}")



        """

        
        socks = dict(pullsensor.poll(10))
        if sub_socket in socks and socks[sub_socket] == zmq.POLLIN:
            message = sub_socket.recv_string()
            try:
                sensor_values = [float(x) for x in message.split(',')]
                current_time = datetime.now().strftime('%H:%M:%S')
                with open(csv_filename, 'a', newline='') as csvfile:
                    csv_writer = csv.writer(csvfile)
                    csv_writer.writerow([current_time] + sensor_values)
                for i, value in enumerate(sensor_values, 1):
                    print(f"Received and publishing sensor{i}: {value}")
                    socket.send_string(f"sensor{i} {value}")
                    
            except ValueError as e:
                print(f"Error parsing sensor data: {e}")






        '''       
        socks = dict(pull.poll(10))
        if receiver_socket in socks and socks[receiver_socket] == zmq.POLLIN:
            try:
                request = receiver_socket.recv_string()
                print(f"Receiving {request}")

                if request == "REQUEST_SPECTROSCOPY":
                    print("Wait for spectroscopy...")

                    if ret:
                        spectroscopy_img = genspec(frame1)

                        if spectroscopy_img:
                            receiver_socket.send_string(spectroscopy_img)
                            print("Sent spectroscopy image")
                            socket.send_string(f"spectroscopy {spectroscopy_img}")
                            print("Also sent to PUB socket")
                        else:
                            receiver_socket.send_string("ERROR")
                            print("Failed to generate spectroscopy image")
                    else:
                        receiver_socket.send_string("ERROR")
                        print("No frame captured for spectroscopy")
                else:
                    receiver_socket.send_string("ERROR: Unknown request")
                    print(f"Unknown request: {request}")
            except zmq.ZMQError as e:
                print(f"ZMQ Error in request handling: {e}")
        '''
        time.sleep(0.01)

    except Exception as e:
        print(f"Unexpected error in main loop: {e}")
        time.sleep(1)  # Pause briefly on error

