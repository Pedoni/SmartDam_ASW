#include "ChannelCommunicator.h"

SoftwareSerial channel(RX_PIN, TX_PIN);

void ChannelCommunicator::init(){
  channel.begin(9600);
}

String ChannelCommunicator::readMsg(){
  if (channel.available()) {
    String msg = (String)channel.readStringUntil("\n");      
    return msg;
  }
  return "-1";
}
