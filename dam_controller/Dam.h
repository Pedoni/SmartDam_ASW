#ifndef __DAM__
#define __DAM__

#include <Arduino.h>
#include <Servo.h>

class Dam {
public:
  void init(int pin);
  void setOpening(int val);
private:
  Servo myservo;
};

#endif
