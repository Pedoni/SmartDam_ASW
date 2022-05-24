#ifndef __HTTPCOMMUNICATOR__
#define __HTTPCOMMUNICATOR__

#include <Arduino.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>

class HTTPCommunicator {
public:
  void initComm();
  bool checkConnection();
  int sendState(int state, String place);
  int sendValues(float value, String place);
private:
  /* wifi network name */
  String ssidName = "FASTWEB-B65DFD";
  /* WPA2 PSK password */
  String pwd = "89N6H6FN68";
  /* service IP address */ 
  String address = "http://192.168.1.126:8080";
};

#endif
