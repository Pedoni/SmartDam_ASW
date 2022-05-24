package com.example.smartdamapp.btlib;

public interface ExtendedRunnable extends Runnable {
    void write(byte[] bytes);
    void cancel();
}
