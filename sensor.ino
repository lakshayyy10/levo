#include <Wire.h>
#include <Adafruit_Sensor.h>
const int pins[4] = {A0, A1, A2, 3};
#define Voc_PIN 0
#define Mics_PIN 1
#define Capacitive_PIN 2
#define DHT_PIN 3

DHT dht(pins[DHT_PIN], DHT11);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float dhtTemp = dht.readTemperature(); 
  int vocValue = analogRead(pins[Voc_PIN]);
  int gasValue = analogRead(pins[Mics_PIN]);
  int moistureValue = analogRead(pins[Capacitive_PIN]);

  // Send data as binary bytes
  Serial.write((uint8_t*)&vocValue, sizeof(vocValue));
  Serial.write((uint8_t*)&gasValue, sizeof(gasValue));
  Serial.write((uint8_t*)&moistureValue, sizeof(moistureValue));
  Serial.write((uint8_t*)&dhtTemp, sizeof(dhtTemp));

  delay(1000);
}

