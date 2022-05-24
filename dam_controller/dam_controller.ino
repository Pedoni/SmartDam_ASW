#include <Wire.h>
#include "SerialCommunicator.h"
#include "ChannelCommunicator.h"
#include "Dam.h"
#include "Led.h"

#define NORMAL 0
#define PRE 1
#define ALARM 2
#define led_interval 200
#define print_interval 3000

bool manual = false;

int state = NORMAL;
int percDam = 0;
unsigned long previousMillisLed = 0;
unsigned long previousMillisPrint = 0;

SerialCommunicator* sc = new SerialCommunicator();
ChannelCommunicator* cc = new ChannelCommunicator();
Dam* dam = new Dam();
Led* led = new Led();

void setup() {
  led->init();
  sc->init();
  cc->init();
  dam->init(9);
}

void loop() {
  if(state==ALARM){
    if(manual){
      led->turnOn();
    } else {
      unsigned long currentMillis = millis();
      if (currentMillis - previousMillisLed >= led_interval) {
        previousMillisLed = currentMillis;
        led->blinking();
      }    
    }
  } else {
    led->turnOff();
  }
  //prendo le info su stato e percentuale di apertura dalla seriale
  String tmp = sc->readState();
  if(tmp=="NORMAL" || tmp=="PRE" || tmp=="ALARM"){
    if(tmp=="NORMAL"){
        state = NORMAL;
        percDam = 0;
        dam->setOpening(0);
        manual = false;
    } else if(tmp=="PRE"){
        state = PRE;
        percDam = 0;
        dam->setOpening(0);
        manual = false;
    } else {
        state = ALARM;
    }
  } else {
    if(tmp!="-1" && !manual){
      percDam = tmp.toInt();
      dam->setOpening(tmp.toInt());
    }
  }

  //mettere bluetooth
  String btmsg = cc->readMsg();
  btmsg.replace("\n", "");
  if(btmsg!="-1"){
    sc->writeMsg(btmsg);
    sc->writeMsg(String(btmsg.length()));
    if(btmsg=="0 0"){
      manual = false;
      sc->writeMsg("auto");
    } else if(btmsg=="0 1" && state==ALARM){
      manual = true;
      sc->writeMsg("manual");
    } else if(btmsg=="1 0" && manual || btmsg=="1 20" && manual || 
    btmsg=="1 40" && manual || btmsg=="1 60" && manual || btmsg=="1 80" && manual || btmsg=="1 100" && manual){
      if(state==ALARM){
        String v = btmsg.substring(2);
        percDam = v.toInt();
        dam->setOpening(v.toInt());
        sc->writeMsg(v);
      }
    }
  }
  
  if(!manual && state==ALARM){
    dam->setOpening(percDam);
  }

  unsigned long currentMillisP = millis();
  if (currentMillisP - previousMillisPrint >= print_interval) {
    previousMillisPrint = currentMillisP;
    sc->writeMsg("Stato = " + String(state) + " , percentuale = " + String(percDam));
  }    
}
