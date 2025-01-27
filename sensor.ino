#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>

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
    float dhtTemp = dht.readHumidity();
    int vocValue = analogRead(pins[Voc_PIN]);
    int gasValue = analogRead(pins[Mics_PIN]);
    int moistureValue = analogRead(pins[Capacitive_PIN]);

    Serial.print(vocValue);
    Serial.print(",");
    Serial.print(gasValue);
    Serial.print(",");
    Serial.print(moistureValue);
    Serial.print(",");
    Serial.println(dhtTemp);


    
 
    delay(1000);
}
