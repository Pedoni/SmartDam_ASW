#ifndef __LED__
#define __LED__

#define LED_PIN 2 //D4 in ESP

#include <Arduino.h>

class Led {
public:
  void initDevice();
  void turnOn();
  void turnOff();
  void blinking();
private:
  int led_state = LOW;
};

#endif
