#include "HTTPCommunicator.h"

void HTTPCommunicator::initComm(){
  WiFi.begin(ssidName, pwd);
  while (WiFi.status() != WL_CONNECTED) {  
    delay(500);
  }
}

bool HTTPCommunicator::checkConnection(){
  return WiFi.status()== WL_CONNECTED;
}

int HTTPCommunicator::sendState(int state, String place){
  HTTPClient http;
  http.begin(address + "/api/data");  
  http.addHeader("Content-Type", "application/json"); 
  String msg = String("{ \"state\": ") + String(state) + ", \"place\": \"" + place +"\" }";
  int retCode = http.POST(msg);
  http.end();
  return retCode;
}

int HTTPCommunicator::sendValues(float value, String place){
  HTTPClient http;    
  http.begin(address + "/api/data");      
  http.addHeader("Content-Type", "application/json");     
  String msg = String("{ \"value\": ") + String(value) + ", \"place\": \"" + place +"\" }";
  int retCode = http.POST(msg);   
  http.end();  
  return retCode;
}
