#include "Led.h"

void Led::initDevice(){
  pinMode(LED_PIN,OUTPUT);
}

void Led::turnOn(){
  digitalWrite(LED_PIN, HIGH);
}

void Led::turnOff(){
  digitalWrite(LED_PIN, LOW);
}

void Led::blinking(){
  if (led_state == LOW) {
    led_state = HIGH;
  } else {
    led_state = LOW;
  }
  digitalWrite(LED_PIN, led_state);
}
