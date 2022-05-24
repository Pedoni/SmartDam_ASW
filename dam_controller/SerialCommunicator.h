#ifndef __SERIALCOMMUNICATOR__
#define __SERIALCOMMUNICATOR__

#include <Arduino.h>

class SerialCommunicator {
public:
  void init();
  String readState();
  String readPerc(String val);
  void writeMsg(String msg);
};

#endif
