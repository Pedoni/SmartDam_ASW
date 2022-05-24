#include "Sonar.h"
#include "Led.h"
#include "HTTPCommunicator.h"

#define ECHO 4 //D2 in ESP
#define TRIG 5 //D1 in ESP

#define NORMAL 0
#define PRE 1
#define ALARM 2

#define D1 1.00
#define D2 0.40

#define freq1 10000
#define freq2 5000

#define led_interval 200

Sonar* son;
Led* led;
HTTPCommunicator* com;

int state;
unsigned long previousMillisLed = 0;
unsigned long previousMillisData = 0;

void setup() {
  com = new HTTPCommunicator();
  com->initComm();
  son = new Sonar(ECHO, TRIG);
  son->initDevice();
  led = new Led();
  led->initDevice();
  state = NORMAL;
}

void loop() { 
 if (com->checkConnection()){   
   float value = son->getDistance();
   if(value > D1){
     if(state!=NORMAL){
       state = NORMAL;
       com->sendState(state, "home");
     }
     led->turnOff();
   } else if(value <= D1 && value > D2){
     if(state!=PRE){
       state = PRE;
       com->sendState(state, "home");
     }
     unsigned long currentMillis = millis();
     if (currentMillis - previousMillisLed >= led_interval) {
       previousMillisLed = currentMillis;
       led->blinking();
     }     
   } else {
     if(state!=ALARM){
       state = ALARM;
       com->sendState(state, "home");
       led->turnOn();
     }
   }
   if(state!=NORMAL){
     unsigned long currentMillis = millis();
     int interval;
     if(state==PRE){
       interval = 10000;
     } else {
       interval = 5000;
     }
     if (currentMillis - previousMillisData >= interval) {
       previousMillisData = currentMillis;
       com->sendValues(value, "home");
     }
   }
 }
 
}
