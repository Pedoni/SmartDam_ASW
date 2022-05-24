#include <Arduino.h>
#include "Sonar.h"

const float vs = 331.5 + 0.6*20;

Sonar::Sonar(int echo, int trig){
      this->echo = echo;
      this->trig = trig;
}

float Sonar::getDistance(){
    digitalWrite(trig,LOW);
    delayMicroseconds(5);
    digitalWrite(trig,HIGH);
    delayMicroseconds(10);
    digitalWrite(trig,LOW);

  	/* ricevi l’eco */
   float tUS = pulseIn(echo, HIGH);
   float t = tUS / 1000.0 / 1000.0 / 2;
   float d = t*vs;
   Serial.println(echo);
   Serial.println(trig);
   return d;
}

void Sonar::initDevice(){
  pinMode(echo, INPUT);
  pinMode(trig, OUTPUT);
  delay(10000);
  Serial.println("Sonar pronto");
}
