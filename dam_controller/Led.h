#ifndef __LED__
#define __LED__

#define LED_PIN 7

#include <Arduino.h>

class Led {
public:
  void init();
  void turnOn();
  void turnOff();
  void blinking();
private:
  int led_state = LOW;
};

#endif
