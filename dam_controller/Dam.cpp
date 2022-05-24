#include "Dam.h"

void Dam::init(int pin){
  myservo.attach(pin);
}

void Dam::setOpening(int val){
  val = map(val, 0, 100, 0, 180);
  myservo.write(val);
}
