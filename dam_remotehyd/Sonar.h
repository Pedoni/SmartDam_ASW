#ifndef __SONAR__
#define __SONAR__
#include <Arduino.h>

class Sonar {

public:
    Sonar(int echo, int trig);
    void initDevice();
    float getDistance();
private:
	int echo;
	int trig;
};

#endif
