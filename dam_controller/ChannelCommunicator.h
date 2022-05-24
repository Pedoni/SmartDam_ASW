#ifndef __CHANNELCOMMUNICATOR__
#define __CHANNELCOMMUNICATOR__

#include <Arduino.h>
#include "SoftwareSerial.h"

#define RX_PIN 2  // to be connected to TX of the BT module
#define TX_PIN 3  // to be connected to RX of the BT module

class ChannelCommunicator {
public:
  void init();
  String readMsg();
};

#endif
