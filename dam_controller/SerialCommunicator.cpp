#include "SerialCommunicator.h"

void SerialCommunicator::init(){
  Serial.begin(9600);
  while (!Serial){}
}

String SerialCommunicator::readState(){
  if(Serial.available() > 0){
    String val = Serial.readStringUntil('\n');
    if(val=="NORMAL" || val =="PRE" || val=="ALARM"){
      return val;
    } else {
      return readPerc(val);
    }
  }
  return "-1";
}

String SerialCommunicator::readPerc(String val){
  if(val=="0" || val=="20" || val=="40" || val=="60" || val=="80" || val=="100"){
    return val;
  }
  return "-1";
}

void SerialCommunicator::writeMsg(String msg){
  Serial.println(msg);
}
  
/*if(state == FINISH_EXPERIMENT && Serial.available() > 0){
String content = Serial.readStringUntil('\n');
if (content == "ok"){
  state = START;
  Serial.println("Correct restart of system");
  Serial.println("1");
  Serial.println(state);
}else{
  Serial.println("Error, \"ok\" is non recognized");
}
}else if(Serial.available() > 0){ //clear out the serial buffer
while (Serial.available() > 0) {
  char t =  Serial.read();
}
}*/
